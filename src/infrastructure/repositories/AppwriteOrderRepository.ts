import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { CartItem } from '../../types/types';
import { Order as OrderAggregate } from '../../domain/entities/Order';
import { databases } from '../../services/appwrite';
import { supabase } from '../../services/supabase';
import appConfig from '../../config/appConfig';
import { Query } from 'appwrite';
import { IDomainEvent } from '../../domain/common/DomainEvents';

export class AppwriteOrderRepository implements IOrderRepository {
  private databaseId = appConfig.appwrite.databaseId;
  private ordersCollection = appConfig.appwrite.collections.orders;

  private toDomain(raw: any): OrderAggregate {
    return OrderAggregate.reconstruct(
      raw.id,
      raw.items || [],
      Number(raw.total_price || 0),
      raw.status || 'pending',
      raw.shipping_address || 'No address provided',
      raw.payment_method || 'Credit Card',
      !!raw.is_guest,
      raw.created_at ? new Date(raw.created_at) : new Date(),
      raw.user_phone,
      raw.user_id || '',
      raw.user_email || '',
      raw.status_history || undefined
    );
  }

  async fetchOrders(): Promise<OrderAggregate[]> {
    let user = null;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      user = session?.user ?? null;
    } catch (err) {
      // Not logged in
    }

    if (!user) return [];

    const response = await databases.listDocuments(
      this.databaseId,
      this.ordersCollection,
      [Query.equal('user_id', user.id), Query.orderDesc('$createdAt')]
    );

    return response.documents.map((doc: any) => this.toDomain({
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

  async createOrder(items: CartItem[], totalPrice: number, paymentMethod: string, shippingAddress: string, userPhone?: string): Promise<OrderAggregate> {
    const orderItems = items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.cart_quantity,
      image_url: item.image_url,
      discount_percentage: item.discount_percentage || 0
    }));

    let user = null;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      user = session?.user ?? null;
    } catch (err) {}

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

    const manualId = Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
    const response = await databases.createDocument(
      this.databaseId,
      this.ordersCollection,
      manualId,
      newOrderBase
    );

    return this.toDomain({
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
    });
  }

  async createOrderWithEvents(items: CartItem[], totalPrice: number, paymentMethod: string, shippingAddress: string, events: IDomainEvent[], userPhone?: string): Promise<OrderAggregate> {
    return this.createOrder(items, totalPrice, paymentMethod, shippingAddress, userPhone);
  }

  async updateShippingAddress(orderId: string, newAddress: string): Promise<void> {
    await databases.updateDocument(this.databaseId, this.ordersCollection, orderId, {
      shipping_address: newAddress
    });
  }

  async deleteOrder(orderId: string): Promise<void> {
    await databases.updateDocument(this.databaseId, this.ordersCollection, orderId, {
      status: 'cancelled'
    });
  }

  async upgradeGuestOrders(userId: string): Promise<void> {
    const response = await databases.listDocuments(this.databaseId, this.ordersCollection, [
      Query.equal('user_id', userId),
      Query.equal('is_guest', true)
    ]);

    await Promise.all(response.documents.map(doc =>
      databases.updateDocument(this.databaseId, this.ordersCollection, doc.$id, { is_guest: false })
    ));
  }

  async trackGuestOrder(orderId: string, emailOrPhone: string): Promise<OrderAggregate | null> {
    const doc = await databases.getDocument(this.databaseId, this.ordersCollection, orderId);
    if (doc && (doc.user_email === emailOrPhone || doc.user_phone === emailOrPhone)) {
      return this.toDomain({
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
      });
    }
    return null;
  }

  async syncOrders(): Promise<void> {}
}

export const appwriteOrderRepository = new AppwriteOrderRepository();
