import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { supabase } from '../../services/supabase';
import { Product, Category, Brand } from '../../types/types';

export class SupabaseProductRepository implements IProductRepository {
  async fetchCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      if (error.code === '42703') {
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('categories')
          .select('*')
          .order('name', { ascending: true });

        if (fallbackError) {
          console.error('ProductRepository: Error fetching categories with fallback:', fallbackError);
          return [];
        }
        return (fallbackData || []).map((cat: any) => ({
          ...cat,
          id: String(cat.id),
          name: cat.name,
          title: cat.title || cat.name,
          description: cat.description || '',
          parent_id: String(cat.parent_id),
        })) as Category[];
      }

      console.error('ProductRepository: Error fetching categories:', error);
      return [];
    }

    return (data || []).map((cat: any) => ({
      ...cat,
      id: String(cat.id),
      name: cat.name,
      title: cat.title || cat.name,
      description: cat.description || '',
      parentId: String(cat.parent_id),
    })) as Category[];
  }

  async fetchBrands(): Promise<Brand[]> {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('ProductRepository: Error fetching brands:', error);
      return [];
    }

    return (data || []).map((b: any) => ({
      id: String(b.id),
      name: b.name,
      website: b.website || '',
      created_at: b.created_at,
    })) as Brand[];
  }

  async fetchProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) throw error;
    if (!data) return [];

    return data.map(item => {
      return {
        id: String(item.id),
        name: item.name,
        title: item.title || item.name || 'Mysterious Products',
        description: item.description || '',
        // sku: item.sku || '',
        price: Number(item.price || 0),
        category: item.category || 'General',
        brand_id: item.brand_id,
        category_id: item.category_id,
        in_stock: item.in_stock !== undefined ? item.in_stock : (item.in_stock !== undefined ? item.in_stock : true),
        quantity: Number(item.quantity || 0),
        image_url: item.image_url || "https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?q=80&w=800&auto=format&fit=crop",
        barcode_id: item.barcode_id,
        digital_passport_url: item.metadata_url || item.digital_passport_url || '',
        attributes: item.metadata || item.attributes || {},
        discount_percentage: item.discount_percentage || 0,
        manufacturer: item.manufacturer || '',
        product_state: item.product_state || 'active',
        is_translated: !!item.is_translated
      };
    });
  }

  async updateInventory(id: string, newQuantity: number, newInStock: boolean): Promise<void> {
    const { data, error } = await supabase
      .from('products')
      .update({ quantity: newQuantity, in_stock: newInStock })
      .eq('id', id)
      .select();

    if (error) {
      console.error('ProductRepository: Update error:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      throw new Error(`Inventory update failed: Item ${id} not found.`);
    }
  }

  async getProductQuantity(id: string): Promise<number | null> {
    let { data, error } = await supabase.from('products').select('quantity').eq('id', id).maybeSingle();
    if (data) {
      return Number(data.quantity || 0);
    }
    return null;
  }



  // src/infrastructure/repositories/SupabaseToyRepository.ts

  async updateInventoryAtomic(id: string, amount: number): Promise<void> {
    const { error } = await supabase.rpc('decrement_product_stock', {
      target_product_id: id,
      amount: amount
    });

    if (error) {
      // If the check constraint (quantity >= 0) is violated, Supabase returns error 23514
      if (error.code === '23514') {
        throw new Error('This item just went out of stock!');
      }
      throw error;
    }
  }

  async getProductQuantities(ids: string[]): Promise<{ id: string; quantity: number }[]> {
    const { data, error } = await supabase
      .from('products')
      .select('id, quantity')
      .in('id', ids);

    if (error) throw error;
    return (data || []).map((item: any) => ({
      id: String(item.id),
      quantity: Number(item.quantity || 0)
    }));
  }

  async batchUpdateInventory(updates: { id: string; newQuantity: number; newInStock: boolean }[]): Promise<void> {
    // In Supabase, we can perform bulk updates but they are tricky with multiple filters.
    // For now, we use a loop but inside a SINGLE promise.all to run in parallel.
    // Ideally we would use a stored procedure for this to be truly atomic and efficient.

    await Promise.all(updates.map(u =>
      supabase
        .from('products')
        .update({ quantity: u.newQuantity, in_stock: u.newInStock })
        .eq('id', u.id)
    ));
  }
}








export const supabaseProductRepository = new SupabaseProductRepository();
