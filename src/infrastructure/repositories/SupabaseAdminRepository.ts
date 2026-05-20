/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase } from '../../services/supabase';
import { IAdminRepository, DashboardStats } from '../../domain/repositories/IAdminRepository';
import { Order, Product } from '../../types/types';
import { ipfsService } from '../../services/ipfsService';

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
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(order => ({
      id: order.id,
      created_at: order.created_at,
      total_price: Number(order.total_price || 0),
      status: order.status || 'pending',
      payment_method: order.payment_method || 'Credit Card',
      shipping_address: order.shipping_address || order.address || 'No address provided',
      items: order.items || [],
      isGuest: order.isGuest,
      user_id: order.user_id || '',
      user_email: order.user_email || '',
      user_phone: order.user_phone
    }));

  }

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) throw error;
  }

  async addProduct(productData: Omit<Product, 'id'>): Promise<Product> {
    const { data: { session } } = await supabase.auth.getSession();
    console.log("SupabaseAdminRepository: Current session user:", session?.user?.email, "ID:", session?.user?.id);

    const dbPayload = {
      name: productData.name,
      title: productData.title,
      description: productData.description,
      price: productData.price,
      category_id: productData.category_id,
      manufacturer: productData.manufacturer,
      brand_id: productData.brand_id,
      in_stock: productData.in_stock,
      quantity: productData.quantity,
      image_url: productData.image_url,
      barcode_id: productData.barcode_id,
      metadata_url: productData.digital_passport_url,
      metadata: productData.attributes,
      discount_percentage: productData.discount_percentage || 0,
      sku: productData.sku
    };

    const { data, error } = await supabase
      .from('products')
      .insert([dbPayload])
      .select()
      .single();

    if (error) throw error;

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
      sku: data.sku
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

    const { data, error } = await supabase
      .from('products')
      .update(dbPayload)
      .eq('id', productId)
      .select()
      .single();

    if (error) throw error;

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
      sku: data.sku
    };
  }

  async deleteProduct(productId: string): Promise<void> {
    try {
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

      // Unpin Metadata (barcode_id is the Metadata CID)
      if (product?.barcode_id) {
        ipfsCleanup.push(ipfsService.unpinFile(product.barcode_id));
      }

      // Unpin Image (extract from URL)
      if (product?.image_url) {
        const parts = product.image_url.split('/');
        const imageCid = parts[parts.length - 1];
        if (imageCid && imageCid.startsWith('Qm')) {
          ipfsCleanup.push(ipfsService.unpinFile(imageCid));
        }
      }

      // Run cleanup (we don't wait for completion to speed up UI response, or do we? 
      // Better to wait to ensure we don't have orphan pins if the user deletes many.
      // But unpinning can be slow. Let's wait for now.)
      await Promise.allSettled(ipfsCleanup);

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
    };
  }
}

export const supabaseAdminRepository = new SupabaseAdminRepository();
