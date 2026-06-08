import { ID, Query } from 'appwrite';
import { IAdminRepository, DashboardStats } from '../../domain/repositories/IAdminRepository';
import { databases } from '../../services/appwrite';
import { supabase } from '../../services/supabase';
import appConfig from '../../config/appConfig';
import { Order, Product } from '../../types/types';

export class AppwriteAdminRepository implements IAdminRepository {
  private databaseId = appConfig.appwrite.databaseId;
  private ordersCollection = appConfig.appwrite.collections.orders;
  private productsCollection = appConfig.appwrite.collections.products;

  async checkIsAdmin(): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();

      return data?.role === 'admin';
    } catch (e) {
      return false;
    }
  }

  async fetchAllOrders(): Promise<Order[]> {
    try {
      const response = await databases.listDocuments(
        this.databaseId,
        this.ordersCollection,
        [Query.orderDesc('$createdAt')]
      );

      return response.documents.map((doc: any) => ({
        id: doc.$id,
        created_at: doc.$createdAt,
        total_price: Number(doc.total_price || 0),
        status: doc.status || 'pending',
        payment_method: doc.payment_method || 'Credit Card',
        shipping_address: doc.shipping_address || 'No address provided',
        items: typeof doc.items === 'string' ? JSON.parse(doc.items) : (doc.items || []),
        is_guest: doc.is_guest,
        user_id: doc.user_id || '',
        user_email: doc.user_email || '',
        user_phone: doc.user_phone
      }));
    } catch (error) {
      console.error('AppwriteAdminRepository: Error fetching all orders:', error);
      throw error;
    }
  }

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    try {
      await databases.updateDocument(
        this.databaseId,
        this.ordersCollection,
        orderId,
        { status }
      );
    } catch (error) {
      console.error('AppwriteAdminRepository: Error updating order status:', error);
      throw error;
    }
  }

  async addProduct(productData: Omit<Product, 'id'>): Promise<Product> {
    const payload = {
      name: productData.name,
      title: productData.title,
      description: productData.description,
      price: productData.price,
      category_id: productData.category_id,
      in_stock: productData.in_stock,
      quantity: productData.quantity,
      image_url: productData.image_url,
      barcode_id: productData.barcode_id,
      digital_passport_url: productData.digital_passport_url,
      attributes: productData.attributes,
      discount_percentage: productData.discount_percentage,
      product_state: productData.product_state || 'active'
    };

    try {
      const doc = await databases.createDocument(
        this.databaseId,
        this.productsCollection,
        ID.unique(),
        payload
      );

      console.log('AppwriteAdminRepository: Successfully created product with ID:', doc.$id);

      return {
        id: doc.$id,
        name: doc.name,
        title: doc.title,
        description: doc.description,
        price: Number(doc.price),
        category_id: doc.category_id,
        in_stock: doc.in_stock,
        quantity: Number(doc.quantity),
        image_url: doc.image_url,
        barcode_id: doc.barcode_id,
        digital_passport_url: doc.digital_passport_url || '',
        attributes: doc.attributes || '',
        discount_percentage: doc.discount_percentage,
        product_state: doc.product_state || 'active'
      };
    } catch (error: any) {
      console.error('AppwriteAdminRepository: Error adding product.', {
        error,
        message: error.message,
        code: error.code,
        payload
      });

      if (error.code === 409) {
        throw new Error(`Conflict: A product with this ID or a unique attribute (like Barcode) already exists in Appwrite. Details: ${error.message}`);
      }
      throw error;
    }
  }

  async updateProduct(productId: string, updates: Partial<Product>): Promise<Product> {
    try {
      const doc = await databases.updateDocument(
        this.databaseId,
        this.productsCollection,
        productId,
        updates
      );

      return {
        id: doc.$id,
        name: doc.name,
        title: doc.title,
        description: doc.description,
        price: doc.price,
        category_id: doc.category_id,
        in_stock: doc.in_stock,
        quantity: doc.quantity,
        image_url: doc.image_url,
        barcode_id: doc.barcode_id,
        digital_passport_url: doc.digital_passport_url || '',
        attributes: doc.attributes || '',
        discount_percentage: doc.discount_percentage,
        product_state: doc.product_state || 'active'
      };
    } catch (error) {
      console.error('AppwriteAdminRepository: Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    try {
      // 0. Update product state to "phasing_out" before deletion
      console.log('AppwriteAdminRepository: Setting product state to phasing_out for product:', productId);
      await databases.updateDocument(
        this.databaseId,
        this.productsCollection,
        productId,
        { product_state: 'phasing_out' }
      );

      // 1. Then delete the document
      await databases.deleteDocument(
        this.databaseId,
        this.productsCollection,
        productId
      );
    } catch (error) {
      console.error('AppwriteAdminRepository: Error deleting product:', error);
      throw error;
    }
  }



  async translateProduct(productId: string): Promise<void> {
    // No-op for Appwrite repository as we are using Supabase for translations
  }

  async fetchDashboardStats(period: 'day' | 'week' | 'month' | 'year' | 'all' = 'all'): Promise<DashboardStats> {
    try {
      const queries = [];
      if (period !== 'all') {
        const now = new Date();
        let startDate = new Date();
        if (period === 'day') startDate.setDate(now.getDate() - 1);
        if (period === 'week') startDate.setDate(now.getDate() - 7);
        if (period === 'month') startDate.setMonth(now.getMonth() - 1);
        if (period === 'year') startDate.setFullYear(now.getFullYear() - 1);
        queries.push(Query.greaterThanEqual('$createdAt', startDate.toISOString()));
      }

      const [ordersRes, productsRes] = await Promise.all([
        databases.listDocuments(this.databaseId, this.ordersCollection, queries),
        databases.listDocuments(this.databaseId, this.productsCollection)
      ]);

      const orders = ordersRes.documents;
      const products = productsRes.documents;

      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      return {
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => o.status === 'pending').length,
        deliveredOrders: orders.filter(o => o.status === 'delivered').length,
        totalRevenue: orders.reduce((sum, o) => sum + Number(o.total_price || 0), 0),
        totalProducts: products.length,
        outOfStockProducts: products.filter(t => Number(t.quantity) === 0).length,
        recentOrdersLast7Days: orders.filter(o => new Date(o.$createdAt) >= sevenDaysAgo).length,
        cancelledOrders: orders.filter(o => o.status === 'cancelled').length,
        refundedOrders: orders.filter(o => o.status === 'refunded').length,
      };
    } catch (error) {
      console.error('AppwriteAdminRepository: Error fetching stats:', error);
      throw error;
    }
  }

  async getOrCreateCategoryByPath(path: string): Promise<string> {
    throw new Error('Not implemented for Appwrite');
  }

  async getOrCreateBrand(name: string): Promise<string> {
    throw new Error('Not implemented for Appwrite');
  }
}

export const appwriteAdminRepository = new AppwriteAdminRepository();
