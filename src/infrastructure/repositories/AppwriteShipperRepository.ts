import { Query } from 'appwrite';
import { IShipperRepository, ShipperStats } from '../../domain/repositories/IShipperRepository';
import { databases } from '../../services/appwrite';
import { supabase } from '../../services/supabase';
import appConfig from '../../config/appConfig';
import { Order } from '../../types/types';

export class AppwriteShipperRepository implements IShipperRepository {
  private databaseId = appConfig.appwrite.databaseId;
  private ordersCollection = appConfig.appwrite.collections.orders;

  async checkIsShipper(): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();

      return data?.role === 'shipper';
    } catch (e) {
      return false;
    }
  }

  async fetchReadyOrders(): Promise<Order[]> {
    try {
      const response = await databases.listDocuments(
        this.databaseId,
        this.ordersCollection,
        [
          Query.equal('status', ['ready', 'shipped']),
          Query.orderAsc('$createdAt')
        ]
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
      console.error('AppwriteShipperRepository: Error fetching ready orders:', error);
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
      console.error('AppwriteShipperRepository: Error updating order status:', error);
      throw error;
    }
  }

  async fetchShipperStats(period: 'day' | 'week' | 'month' | 'year' | 'all'): Promise<ShipperStats> {
    try {
      const queries = [];
      if (period !== 'all') {
        const d = new Date();
        if (period === 'day') d.setHours(0, 0, 0, 0);
        else if (period === 'week') d.setDate(d.getDate() - d.getDay()), d.setHours(0, 0, 0, 0);
        else if (period === 'month') d.setDate(1), d.setHours(0, 0, 0, 0);
        else if (period === 'year') d.setMonth(0, 1), d.setHours(0, 0, 0, 0);
        queries.push(Query.greaterThanEqual('$createdAt', d.toISOString()));
      }

      const response = await databases.listDocuments(this.databaseId, this.ordersCollection, queries);
      const orders = response.documents;

      const shippedOrders = orders.filter(o => o.status === 'shipped').length;
      const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
      const readyOrders = orders.filter(o => o.status === 'ready').length;

      return {
        shippedOrders,
        deliveredOrders,
        readyOrders,
        totalHandled: shippedOrders + deliveredOrders,
      };
    } catch (error) {
      console.error('AppwriteShipperRepository: Error fetching shipper stats:', error);
      throw error;
    }
  }
}

export const appwriteShipperRepository = new AppwriteShipperRepository();
