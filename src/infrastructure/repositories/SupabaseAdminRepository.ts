/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase } from '../../services/supabase';
import { IAdminRepository, DashboardStats } from '../../domain/repositories/IAdminRepository';
import { Order, Product } from '../../types/types';
import { ipfsService } from '../../services/ipfsService';
import { GeminiAnalyzerService } from '../services/GeminiAnalyzerService';

class TranslationQueue {
  private static queue: Promise<any> = Promise.resolve();

  static enqueue(fn: () => Promise<any>): void {
    this.queue = this.queue.then(() => fn().catch(err => console.error("Translation queue error:", err)));
  }
}

export class SupabaseAdminRepository implements IAdminRepository {
  async checkIsAdmin(): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error || !data) return false;

    return data.role === 'admin';
  }


  async fetchAllOrders(): Promise<Order[]> {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Fetch payments to resolve provider_status for refunded/cancelled visibility check
    const { data: payments, error: paymentsErr } = await supabase
      .from('payments')
      .select('id, provider_status');

    if (paymentsErr) {
      console.error("SupabaseAdminRepository: Failed to load payments for status mapping:", paymentsErr);
    }

    const paymentMap = new Map<string, string>();
    if (payments) {
      payments.forEach(p => {
        paymentMap.set(p.id, p.provider_status);
      });
    }

    return (orders || []).map(order => {
      const items = (order.items || []).map((item: any) => {
        const orderedQty = item.cart_quantity !== undefined ? item.cart_quantity : item.quantity;
        return {
          id: item.id,
          name: item.name || item.title || '',
          price: Number(item.price || 0),
          quantity: Number(orderedQty) || 1,
          image_url: item.image_url || '',
          discount_percentage: item.discount_percentage ?? 0
        };
      });

      return {
        id: order.id,
        created_at: order.created_at,
        total_price: Number(order.total_price || 0),
        status: order.status || 'pending',
        payment_method: order.payment_method || 'Credit Card',
        shipping_address: order.shipping_address || order.address || 'No address provided',
        items,
        is_guest: order.is_guest,
        user_id: order.user_id || '',
        user_email: order.user_email || '',
        user_phone: order.user_phone,
        payment_id: order.payment_id,
        payment_status: order.payment_id ? paymentMap.get(order.payment_id) : null
      };
    });
  }

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    let updatePayload: any = { status };
    try {
      const { data: currentOrder } = await supabase
        .from('orders')
        .select('status_history, created_at, payment_id, payment_method')
        .eq('id', orderId)
        .maybeSingle();

      if (currentOrder) {
        const oldHistory = currentOrder.status_history || {};
        updatePayload.status_history = {
          ...oldHistory,
          pending: oldHistory.pending || currentOrder.created_at || new Date().toISOString(),
          [status]: new Date().toISOString()
        };

        // If status is 'refunded' and there is a payment linked, trigger the appropriate refund edge function (except crypto)
        if (status === 'refunded' && currentOrder.payment_id && currentOrder.payment_method !== 'crypto') {
          try {
            const isWero = currentOrder.payment_method === 'wero' || currentOrder.payment_method === 'worldline';
            const isAdyen = currentOrder.payment_method === 'adyen';
            const isDigitalEuro = currentOrder.payment_method === 'digital_euro';
            const functionName = isWero ? 'wero-refund' 
              : isAdyen ? 'adyen-refund' 
              : isDigitalEuro ? 'digital-euro-refund' 
              : 'stripe-refund';
            console.log(`Order ${orderId} marked as refunded. Invoking ${functionName} for payment ${currentOrder.payment_id}`);
            
            const { error: refundError } = await supabase.functions.invoke(functionName, {
              body: { payment_id: currentOrder.payment_id, reason: 'requested_by_customer' }
            });
            if (refundError) {
              console.warn("Manual refund invocation returned a warning:", refundError.message);
              throw new Error(refundError.message);
            } else {
              console.log(`${isWero ? 'Wero' : (isAdyen ? 'Adyen' : (isDigitalEuro ? 'Digital Euro' : 'Stripe'))} manual refund processed successfully.`);
            }
          } catch (refundErr: any) {
            console.error("Failed to process manual refund:", refundErr);
            throw new Error(`Refund failed: ${refundErr.message || refundErr}`);
          }
        }
      }
    } catch (e: any) {
      console.warn("SupabaseAdminRepository: error during status history or refund handling", e);
      if (e.message?.includes("Refund failed")) {
        throw e;
      }
    }

    const { data, error } = await supabase
      .from('orders')
      .update(updatePayload)
      .eq('id', orderId)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) {
      throw new Error("Update failed: Order not found or permission denied.");
    }
  }

  async addProduct(productData: Omit<Product, 'id'>): Promise<Product> {
    const { data: { session } } = await supabase.auth.getSession();
    console.log("SupabaseAdminRepository: Current session user:", session?.user?.email, "ID:", session?.user?.id);

    let categoryId = productData.category_id;
    let brandId = productData.brand_id;

    // Automatically resolve/add category by path if category name/path string is provided
    if (productData.category) {
      try {
        const { data: catId, error: catError } = await supabase
          .rpc('get_or_create_category_by_path', { p_path: productData.category });
        if (catError) {
          console.error("Supabase RPC failed for get_or_create_category_by_path:", catError);
        } else if (catId) {
          categoryId = catId;
        }
      } catch (err) {
        console.error("Failed to automatically get/create category:", err);
      }
    }

    // Automatically resolve/add brand by name if brand string is provided
    if (productData.brand) {
      try {
        const { data: bId, error: bError } = await supabase
          .rpc('get_or_create_brand', { p_name: productData.brand });
        if (bError) {
          console.error("Supabase RPC failed for get_or_create_brand:", bError);
        } else if (bId) {
          brandId = bId;
        }
      } catch (err) {
        console.error("Failed to automatically get/create brand:", err);
      }
    }

    const dbPayload = {
      name: productData.name,
      title: productData.title,
      description: productData.description,
      price: productData.price,
      category_id: categoryId,
      manufacturer: productData.manufacturer,
      brand_id: brandId,
      in_stock: productData.in_stock,
      quantity: productData.quantity,
      image_url: productData.image_url,
      barcode_id: productData.barcode_id,
      metadata_url: productData.digital_passport_url,
      metadata: productData.attributes,
      discount_percentage: productData.discount_percentage || 0,
      sku: productData.sku,
      product_state: productData.product_state || 'active'
    };

    const { data, error } = await supabase
      .from('products')
      .insert([dbPayload])
      .select()
      .single();

    if (error) throw error;

    // Trigger translation automatically in the background via sequential queue
    const geminiKey = localStorage.getItem('gemini_api_key') || (import.meta.env.VITE_GEMINI_API_KEY as string) || '';
    if (data.metadata_url) {
      const baseName = data.metadata?.baseName;
      TranslationQueue.enqueue(() => 
        this.translateProductAllLanguages(data.id, data.metadata_url, data.barcode_id, geminiKey, baseName)
      );
    }

    return {
      id: String(data.id),
      name: data.name,
      title: data.title,
      description: data.description,
      price: Number(data.price),
      category_id: data.category_id,
      manufacturer: data.manufacturer,
      brand_id: data.brand_id,
      in_stock: data.in_stock,
      quantity: Number(data.quantity),
      image_url: data.image_url,
      barcode_id: data.barcode_id,
      digital_passport_url: data.metadata_url,
      attributes: data.metadata,
      discount_percentage: data.discount_percentage,
      sku: data.sku,
      product_state: data.product_state || 'active'
    };
  }

  async updateProduct(productId: string, updates: Partial<Product>): Promise<Product> {
    const dbPayload: any = {};
    if (updates.name !== undefined) dbPayload.name = updates.name;
    if (updates.description !== undefined) dbPayload.description = updates.description;
    if (updates.price !== undefined) dbPayload.price = updates.price;
    if (updates.category_id !== undefined) dbPayload.category_id = updates.category_id;
    if (updates.manufacturer !== undefined) dbPayload.manufacturer = updates.manufacturer;
    if (updates.brand_id !== undefined) dbPayload.brand_id = updates.brand_id;
    if (updates.in_stock !== undefined) dbPayload.in_stock = updates.in_stock;
    if (updates.quantity !== undefined) dbPayload.quantity = updates.quantity;
    if (updates.image_url !== undefined) dbPayload.image_url = updates.image_url;
    if (updates.barcode_id !== undefined) dbPayload.barcode_id = updates.barcode_id;
    if (updates.digital_passport_url !== undefined) dbPayload.metadata_url = updates.digital_passport_url;
    if (updates.attributes !== undefined) dbPayload.metadata = updates.attributes;
    if (updates.discount_percentage !== undefined) dbPayload.discount_percentage = updates.discount_percentage;
    if (updates.sku !== undefined) dbPayload.sku = updates.sku;
    if (updates.product_state !== undefined) dbPayload.product_state = updates.product_state;

    const { data, error } = await supabase
      .from('products')
      .update(dbPayload)
      .eq('id', productId)
      .select()
      .single();

    if (error) throw error;

    // Trigger translation automatically in the background if the name, description, or metadata changed
    if (updates.digital_passport_url !== undefined || updates.name !== undefined || updates.description !== undefined) {
      const geminiKey = localStorage.getItem('gemini_api_key') || (import.meta.env.VITE_GEMINI_API_KEY as string) || '';
      if (data.metadata_url) {
        this.translateProductAllLanguages(data.id, data.metadata_url, data.barcode_id, geminiKey)
          .catch(err => console.error("Background product translation failed:", err));
      }
    }

    return {
      id: String(data.id),
      name: data.name,
      description: data.description,
      price: Number(data.price),
      category_id: data.category_id,
      brand_id: data.brand_id,
      in_stock: data.in_stock,
      quantity: Number(data.quantity),
      image_url: data.image_url,
      barcode_id: data.barcode_id,
      digital_passport_url: data.metadata_url,
      attributes: data.metadata,
      discount_percentage: data.discount_percentage,
      sku: data.sku,
      product_state: data.product_state || 'active'
    };
  }

  async deleteProduct(productId: string): Promise<void> {
    try {
      // 0. Update product state to "phasing_out" before deletion
      console.log('SupabaseAdminRepository: Setting product state to phasing_out for product:', productId);
      const { error: updateStateError } = await supabase
        .from('products')
        .update({ product_state: 'phasing_out' })
        .eq('id', productId);

      if (updateStateError) {
        console.error('SupabaseAdminRepository: Failed to set product_state to phasing_out:', updateStateError);
        throw updateStateError;
      }

      // 1. Fetch product details first to get IPFS references
      console.log('SupabaseAdminRepository: Fetching product details for deletion:', productId);
      const { data: product, error: fetchError } = await supabase
        .from('products')
        .select('image_url, barcode_id, metadata_url')
        .eq('id', productId)
        .single();

      if (fetchError || !product) {
        console.warn(`SupabaseAdminRepository: Product ${productId} not found for deletion.`, fetchError);
        // Continue with deletion even if metadata fetch fails
      }

      // 2. Unpin from IPFS
      const ipfsCleanup = [];

      // Unpin Image (barcode_id is the image CID by convention)
      if (product?.barcode_id) {
        ipfsCleanup.push(ipfsService.unpinFile(product.barcode_id));
      } else if (product?.image_url) {
        // Fallback: extract image CID from URL if barcode_id is not set
        const parts = product.image_url.split('/');
        const imageCid = parts[parts.length - 1];
        console.log(imageCid);
        if (imageCid && imageCid.startsWith('Qm')) {
          ipfsCleanup.push(ipfsService.unpinFile(imageCid));
        }
      }

      // Unpin Metadata JSON (extract CID from metadata_url)
      if (product?.metadata_url) {
        const parts = product.metadata_url.split('/');
        const metadataCid = parts[parts.length - 1];
        console.log(metadataCid);
        if (metadataCid && metadataCid.startsWith('Qm')) {
          ipfsCleanup.push(ipfsService.unpinFile(metadataCid));
        }
      }

      // Run cleanup and wait for completion
      const results = await Promise.allSettled(ipfsCleanup);

      // Check if any unpinning promise was rejected (failed)
      const failures = results.filter((r): r is PromiseRejectedResult => r.status === 'rejected');
      if (failures.length > 0) {
        const errorMsg = failures.map(f => f.reason?.message || f.reason).join(', ');
        throw new Error(`IPFS cleanup failed. Product was not deleted from database. Details: ${errorMsg}`);
      }

      // 3. Delete from Supabase
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (deleteError) throw deleteError;
    } catch (error) {
      console.error('SupabaseAdminRepository: Error in deleteProduct flow:', error);
      throw error;
    }
  }


  async fetchDashboardStats(period: 'day' | 'week' | 'month' | 'year' | 'all' = 'all'): Promise<DashboardStats> {
    let ordersQuery = supabase.from('orders').select('total_price, status, created_at');

    if (period !== 'all') {
      const now = new Date();
      let startDate = new Date();
      if (period === 'day') startDate.setDate(now.getDate() - 1);
      if (period === 'week') startDate.setDate(now.getDate() - 7);
      if (period === 'month') startDate.setMonth(now.getMonth() - 1);
      if (period === 'year') startDate.setFullYear(now.getFullYear() - 1);
      ordersQuery = ordersQuery.gte('created_at', startDate.toISOString());
    }

    const [ordersResult, productsResult] = await Promise.all([
      ordersQuery,
      supabase.from('products').select('quantity'),
    ]);

    const orders = ordersResult.data || [];
    const products = productsResult.data || [];

    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    return {
      totalOrders: orders.length,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      deliveredOrders: orders.filter(o => o.status === 'delivered').length,
      totalRevenue: orders.reduce((sum, o) => sum + Number(o.total_price || 0), 0),
      totalProducts: products.length,
      outOfStockProducts: products.filter(t => Number(t.quantity) === 0).length,
      recentOrdersLast7Days: orders.filter(o => new Date(o.created_at) >= sevenDaysAgo).length,
      cancelledOrders: orders.filter(o => o.status === 'cancelled').length,
      refundedOrders: orders.filter(o => o.status === 'refunded').length,
    };
  }

  async translateProductAllLanguages(
    productId: string,
    metadataUrl: string,
    imageCid: string,
    geminiKey: string,
    baseName?: string
  ): Promise<void> {
    if (!metadataUrl || !geminiKey) {
      throw new Error("Missing metadata URL or Gemini API key.");
    }

    // 1. Fetch original metadata from IPFS
    const res = await fetch(metadataUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch original metadata from IPFS (status: ${res.status})`);
    }
    const originalMetadata = await res.json();

    // Fetch original product database details as fallbacks if metadata is incomplete
    const { data: dbProduct } = await supabase
      .from('products')
      .select('name, title, description, metadata')
      .eq('id', productId)
      .single();

    const originalDescription = originalMetadata.description || 
                                originalMetadata.partial_metadata?.description || 
                                dbProduct?.description || 
                                '';

    const originalName = originalMetadata.name || 
                         originalMetadata.partial_metadata?.name || 
                         dbProduct?.title || 
                         dbProduct?.name || 
                         '';

    // Guarantee the description and name are present at both levels for Gemini
    if (!originalMetadata.description && originalDescription) {
      originalMetadata.description = originalDescription;
    }
    if (originalMetadata.partial_metadata) {
      if (!originalMetadata.partial_metadata.description && originalDescription) {
        originalMetadata.partial_metadata.description = originalDescription;
      }
      if (!originalMetadata.partial_metadata.name && originalName) {
        originalMetadata.partial_metadata.name = originalName;
      }
    }
    if (!originalMetadata.name && originalName) {
      originalMetadata.name = originalName;
    }

    // 2. Fetch active languages
    const { data: langs, error: langsError } = await supabase
      .from('languages')
      .select('*')
      .eq('is_active', true);

    if (langsError) {
      throw new Error(`Failed to fetch active languages: ${langsError.message}`);
    }
    if (!langs || langs.length === 0) {
      return;
    }

    const geminiService = new GeminiAnalyzerService();

    const targetLangs = langs.filter(lang => !lang.is_default && lang.code !== 'en');

    const errors: string[] = [];

    await Promise.allSettled(
      targetLangs.map(async (lang) => {
        try {
          console.log(`Translating product ${productId} to ${lang.code}...`);

          // 3. Translate metadata via Gemini
          const translatedMeta = await geminiService.translateConsolidatedMetadata(
            originalMetadata,
            lang.code,
            geminiKey
          );

          // Validate translated metadata before proceeding to upload
          const validationError = this._validateTranslatedMetadata(originalMetadata, translatedMeta);
          if (validationError) {
            throw new Error(`Translated metadata is not well-formed: ${validationError}`);
          }

          // 4. Upload translated metadata JSON to IPFS
          const metaBlob = new Blob(
            [JSON.stringify(translatedMeta, null, 2)],
            { type: 'application/json' }
          );
          
          const resolvedBaseName = baseName || dbProduct?.metadata?.baseName || originalName.toLowerCase().replace(/ /g, '_');
          const finalFileName = baseName || dbProduct?.metadata?.baseName
            ? `${resolvedBaseName}-consolidated-${lang.code}.json`
            : `${resolvedBaseName}_${lang.code}.json`;

          const uploadResult = await ipfsService.uploadFile(metaBlob, {
            fileName: finalFileName,
            metadata: { 
              type: 'product-metadata-translation', 
              productId, 
              lang: lang.code,
              originalCid: imageCid
            }
          });

          // Build IPFS Gateway URL
          const gateway = import.meta.env.VITE_IPFS_GATEWAY_URL || 'https://gateway.pinata.cloud';
          const translatedMetadataUrl = `${gateway.replace(/\/$/, '')}/ipfs/${uploadResult.cid}`;

          // 5. Insert / Update the translation record in the database
          const { error: upsertError } = await supabase
            .from('product_translations')
            .upsert({
              product_id: productId,
              language_id: lang.id,
              name: translatedMeta.name || originalName || '',
              description: translatedMeta.description || 
                           translatedMeta.partial_metadata?.description || 
                           originalDescription || 
                           '',
              metadata_url: translatedMetadataUrl
            }, {
              onConflict: 'product_id,language_id'
            });

          if (upsertError) {
            throw new Error(`Database save error: ${upsertError.message}`);
          }

          console.log(`Successfully translated and saved product ${productId} for language ${lang.code}`);
        } catch (langErr: any) {
          console.error(`Error translating product to language ${lang.code}:`, langErr);
          errors.push(`${lang.code.toUpperCase()}: ${langErr.message || langErr}`);
        }
      })
    );

    if (errors.length > 0) {
      throw new Error(`Translation completed with errors: ${errors.join(', ')}`);
    }

    // 6. Update products table to flag the product as translated
    const { error: updateFlagError } = await supabase
      .from('products')
      .update({ is_translated: true })
      .eq('id', productId);

    if (updateFlagError) {
      console.warn(`Failed to update is_translated flag for product ${productId}:`, updateFlagError.message);
    }
  }

  async translateProduct(productId: string): Promise<void> {
    const { data, error } = await supabase
      .from('products')
      .select('metadata_url, barcode_id, metadata')
      .eq('id', productId)
      .single();

    if (error || !data) {
      throw new Error(error?.message || "Product not found");
    }

    const geminiKey = localStorage.getItem('gemini_api_key') || (import.meta.env.VITE_GEMINI_API_KEY as string) || '';
    if (!geminiKey) {
      throw new Error("Gemini API key is required. Please set it in the settings panel.");
    }

    const baseName = data.metadata?.baseName;
    return new Promise<void>((resolve, reject) => {
      TranslationQueue.enqueue(async () => {
        try {
          await this.translateProductAllLanguages(productId, data.metadata_url, data.barcode_id, geminiKey, baseName);
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  private _validateTranslatedMetadata(original: any, translated: any): string | null {
    if (!translated) {
      return "Translated metadata is null or undefined.";
    }
    if (!translated.name || translated.name.trim() === '') {
      return "Translated product name is missing or empty.";
    }
    if (!translated.partial_metadata) {
      return "Translated partial_metadata wrapper is missing.";
    }

    const sections = [
      'durability_data',
      'repairability_data',
      'manufacturing_data',
      'lifecycle_data',
      'nutritional_info'
    ] as const;

    const origPartial = original.partial_metadata || {};
    const transPartial = translated.partial_metadata;

    for (const sec of sections) {
      const origSec = origPartial[sec];
      if (origSec && typeof origSec === 'object') {
        const transSec = transPartial[sec];
        if (!transSec || typeof transSec !== 'object') {
          return `Translated metadata section "${sec}" is missing or not an object.`;
        }

        // Check all keys in this section
        for (const key of Object.keys(origSec)) {
          const origVal = (origSec as any)[key];
          const transVal = (transSec as any)[key];

          // If the original value has content, the translated value MUST also have content
          if (origVal !== undefined && origVal !== null && String(origVal).trim() !== '') {
            if (transVal === undefined || transVal === null || String(transVal).trim() === '') {
              return `Translated metadata field "${sec}.${key}" is missing or empty.`;
            }
          }
        }
      }
    }

    return null;
  }
}

export const supabaseAdminRepository = new SupabaseAdminRepository();
