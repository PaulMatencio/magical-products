import { IDomainEvent } from '../../domain/common/DomainEvents';
import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { Order, CartItem } from '../../types/types';
import { databases } from '../../services/appwrite';
import { supabase } from '../../services/supabase';
import appConfig from '../../config/appConfig';
import { ID, Query } from 'appwrite';

const LOCAL_ORDERS_KEY = 'product_catalogue_orders';

export class AppwriteOrderRepository implements IOrderRepository {
  private databaseId = appConfig.appwrite.databaseId;
  private ordersCollection = appConfig.appwrite.collections.orders;

  async fetchOrders(): Promise<Order[]> {
    let user;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      user = session?.user ?? null;
    } catch (err) {
      // Not logged in
    }

    try {
      await this.syncOrders();
    } catch (syncErr) {
      console.warn('OrderRepository: Sync failed', syncErr);
    }

    let remoteOrders: Order[] = [];

    // Get local orders
    const localOrdersStr = localStorage.getItem(LOCAL_ORDERS_KEY);
    const localOrders: any[] = localOrdersStr ? JSON.parse(localOrdersStr) : [];

    try {
      const queries = [Query.orderDesc('$createdAt')];
      let shouldQuery = true;

      if (user) {
        queries.push(Query.equal('user_id', user.id));
      } else {
        const localIds = localOrders.map(o => o.id).filter(id => typeof id === 'string' && !id.startsWith('local-'));
        if (localIds.length > 0) {
          queries.push(Query.equal('$id', localIds));
        } else {
          shouldQuery = false;
        }
      }

      if (shouldQuery) {
        const response = await databases.listDocuments(
          this.databaseId,
          this.ordersCollection,
          queries
        );

        remoteOrders = response.documents.map((doc: any) => ({
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
          user_phone: doc.user_phone || ''
        }));
      }
    } catch (err) {
      console.warn('OrderService: Remote fetch failed', err);
    }

    const combined: Order[] = [...remoteOrders];
    const remoteIds = new Set(remoteOrders.map(o => o.id));

    let localChanged = false;
    const updatedLocal = localOrders.map(lo => {
      const remote = remoteOrders.find(ro => ro.id === lo.id);
      if (remote && remote.status !== lo.status) {
        localChanged = true;
        return { ...lo, status: remote.status };
      }
      return lo;
    });

    if (localChanged) {
      localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(updatedLocal));
    }

    localOrders.forEach(lo => {
      if (typeof lo.id === 'string' && lo.id.startsWith('local-') && !remoteIds.has(lo.id)) {
        combined.push(lo);
      }
    });

    return combined.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  async createOrder(items: CartItem[], totalPrice: number, paymentMethod: string, shippingAddress: string, userPhone?: string): Promise<Order> {
    const orderItems = items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.cart_quantity,
      image_url: item.image_url,
      discount_percentage: item.discount_percentage || 0
    }));

    let user;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      user = session?.user ?? null;
    } catch (err) { }

    const newOrderBase: any = {
      total_price: totalPrice,
      status: 'pending',
      payment_method: paymentMethod,
      shipping_address: shippingAddress,
      user_phone: userPhone,
      items: JSON.stringify(orderItems), // Appwrite needs strings for JSON data
      is_guest: user?.is_anonymous ?? false,
      user_id: user?.id || '',
      user_email: user?.email || ''
    };

    let orderToReturn: Order;
    try {
      const manualId = Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
      const response = await databases.createDocument(
        this.databaseId,
        this.ordersCollection,
        manualId,
        newOrderBase
      );

      orderToReturn = {
        id: response.$id,
        created_at: response.$createdAt,
        total_price: totalPrice,
        status: 'pending',
        payment_method: paymentMethod,
        shipping_address: shippingAddress,
        items: orderItems,
        is_guest: response.is_guest,
        user_id: response.user_id,
        user_email: response.user_email,
        user_phone: response.user_phone
      };
    } catch (err) {
      console.warn('OrderService: Appwrite insertion failed, creating local order', err);
      orderToReturn = {
        id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        created_at: new Date().toISOString(),
        ...newOrderBase,
        items: orderItems,
        total_price: totalPrice
      };
    }

    const localOrdersStr = localStorage.getItem(LOCAL_ORDERS_KEY);
    const localOrders: Order[] = localOrdersStr ? JSON.parse(localOrdersStr) : [];
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify([orderToReturn, ...localOrders]));

    return orderToReturn;
  }

  async createOrderWithEvents(items: CartItem[], totalPrice: number, paymentMethod: string, shippingAddress: string, events: IDomainEvent[], userPhone?: string): Promise<Order> {
    // Appwrite doesn't support transactional multi-collection writes in the client SDK like Supabase RPC.
    // We fall back to sequential creation.
    return this.createOrder(items, totalPrice, paymentMethod, shippingAddress, userPhone);
  }

  async updateShippingAddress(orderId: string, newAddress: string): Promise<void> {
    if (!orderId.startsWith('local-')) {
      try {
        await databases.updateDocument(this.databaseId, this.ordersCollection, orderId, {
          shipping_address: newAddress
        });
      } catch (err) {
        console.warn('OrderService: Remote update failed', err);
      }
    }

    const localOrdersStr = localStorage.getItem(LOCAL_ORDERS_KEY);
    if (localOrdersStr) {
      const localOrders: Order[] = JSON.parse(localOrdersStr);
      const updated = localOrders.map(o => o.id === orderId ? { ...o, shipping_address: newAddress } : o);
      localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(updated));
    }
  }

  async deleteOrder(orderId: string): Promise<void> {
    if (!orderId.startsWith('local-')) {
      await databases.updateDocument(this.databaseId, this.ordersCollection, orderId, {
        status: 'cancelled'
      });
    }

    const localOrdersStr = localStorage.getItem(LOCAL_ORDERS_KEY);
    if (localOrdersStr) {
      const localOrders: Order[] = JSON.parse(localOrdersStr);
      const updated = localOrders.map(o => o.id === orderId ? { ...o, status: 'cancelled' as const } : o);
      localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(updated));
    }
  }

  async syncOrders(): Promise<void> {
    const localOrdersStr = localStorage.getItem(LOCAL_ORDERS_KEY);
    if (!localOrdersStr) return;

    const localOrders: Order[] = JSON.parse(localOrdersStr);
    const syncable = localOrders.filter(o => String(o.id).startsWith('local-'));
    if (syncable.length === 0) return;

    let user;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      user = session?.user ?? null;
    } catch (e) { }

    if (!user) {
      console.log('OrderService: No authenticated user session, skipping local order sync.');
      return;
    }

    for (const order of syncable) {
      try {
        const payload = {
          total_price: order.total_price,
          status: order.status,
          payment_method: order.payment_method,
          shipping_address: order.shipping_address,
          items: JSON.stringify(order.items),
          user_phone: order.user_phone,
          is_guest: user?.is_anonymous ?? false,
          user_id: user?.id || ''
        };

        const manualId = Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
        const response = await databases.createDocument(this.databaseId, this.ordersCollection, manualId, payload);

        // Update local storage ID
        const currentLocal: Order[] = JSON.parse(localStorage.getItem(LOCAL_ORDERS_KEY) || '[]');
        const updated = currentLocal.map(lo => lo.id === order.id ? { ...lo, id: response.$id, created_at: response.$createdAt } : lo);
        localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(updated));
      } catch (err) {
        console.warn('Sync failed for order', order.id, err);
      }
    }
  }

  async upgradeGuestOrders(userId: string): Promise<void> {
    // This would typically be a server-side task or a series of updates.
    // For now, we find all guest orders for this user and update them.
    try {
      const response = await databases.listDocuments(this.databaseId, this.ordersCollection, [
        Query.equal('user_id', userId),
        Query.equal('is_guest', true)
      ]);

      await Promise.all(response.documents.map(doc =>
        databases.updateDocument(this.databaseId, this.ordersCollection, doc.$id, { is_guest: false })
      ));
    } catch (err) {
      console.warn('OrderRepository: Failed to upgrade guest orders', err);
    }
  }

  async trackGuestOrder(orderId: string, emailOrPhone: string): Promise<Order | null> {
    try {
      const doc = await databases.getDocument(this.databaseId, this.ordersCollection, orderId);
      if (doc && (doc.user_email === emailOrPhone || doc.user_phone === emailOrPhone)) {
        return {
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
          user_phone: doc.user_phone || ''
        };
      }
      return null;
    } catch (err) {
      console.warn('OrderRepository: trackGuestOrder failed', err);
      return null;
    }
  }
}

export const appwriteOrderRepository = new AppwriteOrderRepository();
