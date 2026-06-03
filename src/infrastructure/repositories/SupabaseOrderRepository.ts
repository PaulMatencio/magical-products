/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase } from "../../services/supabase";
import { CartItem } from "../../types/types";
import { Order as OrderAggregate } from "../../domain/entities/Order";
import { IOrderRepository } from "../../domain/repositories/IOrderRepository";
import { IDomainEvent } from "../../domain/common/DomainEvents";

export class SupabaseOrderRepository implements IOrderRepository {

  private toDomain(raw: any): OrderAggregate {
    return OrderAggregate.reconstruct(
      raw.id,
      raw.items || [],
      Number(raw.total_price || 0),
      raw.status || 'pending',
      raw.shipping_address || raw.address || 'No address provided',
      raw.payment_method || 'Credit Card',
      !!raw.is_guest,
      raw.created_at ? new Date(raw.created_at) : new Date(),
      raw.user_phone,
      raw.user_id || '',
      raw.user_email || '',
      raw.status_history || undefined,
      raw.payment_id
    );
  }

  async fetchOrders(): Promise<OrderAggregate[]> {
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user ?? null;
    if (!user) return [];

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('OrderService: Supabase fetch error:', error);
      throw error;
    }

    return (data || []).map(raw => this.toDomain(raw));
  }

  async createOrder(
    items: CartItem[],
    totalPrice: number,
    paymentMethod: string,
    shippingAddress: string,
    userPhone?: string,
    paymentId?: string
  ): Promise<OrderAggregate> {
    const orderItems = items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.cart_quantity,
      image_url: item.image_url,
      discount_percentage: item.discount_percentage || 0
    }));

    const { data: { user } } = await supabase.auth.getUser();

    const newOrderBase: any = {
      total_price: totalPrice,
      status: 'pending',
      payment_method: paymentMethod,
      shipping_address: shippingAddress,
      user_phone: userPhone,
      items: orderItems,
      is_guest: user?.is_anonymous ?? false
    };

    if (user) {
      newOrderBase.user_id = user.id;
      newOrderBase.user_email = user.email;
    }

    if (paymentId) {
      newOrderBase.payment_id = paymentId;
    }

    const { data, error } = await supabase
      .from('orders')
      .insert([newOrderBase])
      .select()
      .single();

    if (error) throw error;

    return this.toDomain(data);
  }

  async createOrderWithEvents(
    items: CartItem[],
    total_price: number,
    payment_method: string,
    shipping_address: string,
    events: IDomainEvent[],
    user_phone?: string,
    payment_id?: string
  ): Promise<OrderAggregate> {
    const { data: { user } } = await supabase.auth.getUser();
    const primaryEvent = events[0];

    if (!primaryEvent) {
      return this.createOrder(items, total_price, payment_method, shipping_address, user_phone, payment_id);
    }

    // Map items to DTO
    const orderItems = items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.cart_quantity,
      image_url: item.image_url,
      discount_percentage: item.discount_percentage || 0
    }));

    // Call the transactional RPC
    const { data, error } = await supabase.rpc('create_order_with_outbox', {
      p_items: orderItems,
      p_total_price: total_price,
      p_payment_method: payment_method,
      p_shipping_address: shipping_address,
      p_user_phone: user_phone || null,
      p_user_email: user?.email || null,
      p_user_id: user?.id || null,
      p_event_type: primaryEvent.constructor.name,
      p_event_payload: JSON.parse(JSON.stringify(primaryEvent)),
      p_payment_id: payment_id || null
    });

    if (error) {
      console.warn("[TransactionalRepo] RPC failed, falling back.", error);
      throw error;
    }

    if (payment_id && data && data.id && !data.payment_id) {
      try {
        await supabase
          .from('orders')
          .update({ payment_id })
          .eq('id', data.id);
        data.payment_id = payment_id;
      } catch (err) {
        console.warn("Failed to set payment_id on order via update", err);
      }
    }

    return this.toDomain(data);
  }

  async updateShippingAddress(orderId: string, newAddress: string): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .update({ shipping_address: newAddress })
      .eq('id', orderId);

    if (error) throw error;
  }

  async deleteOrder(orderId: string): Promise<void> {
    // 1. Fetch order details before cancelling to see status, payment_id & payment_method
    const { data: order } = await supabase
      .from('orders')
      .select('payment_id, status, payment_method')
      .eq('id', orderId)
      .maybeSingle();

    // 2. Cancel order in database and restore inventory
    const { error } = await supabase.rpc('cancel_order_with_inventory', {
      p_order_id: orderId
    });

    if (error) {
      throw new Error(error.message || 'Failed to cancel order.');
    }

    // 3. Trigger refund if order was cancelled while pending and has a payment linked
    if (order && order.status === 'pending' && order.payment_id) {
      try {
        const isWero = order.payment_method === 'wero';
        const functionName = isWero ? 'wero-refund' : 'stripe-refund';
        console.log(`Order ${orderId} cancelled while pending. Invoking ${functionName} for payment ${order.payment_id}`);
        const { error: refundError } = await supabase.functions.invoke(functionName, {
          body: { payment_id: order.payment_id, reason: 'requested_by_customer' }
        });
        if (refundError) {
          console.warn(`${functionName} invocation returned a warning:`, refundError.message);
        } else {
          console.log(`${isWero ? 'Wero' : 'Stripe'} refund processed successfully.`);
        }
      } catch (refundErr) {
        console.error("Failed to process automatic refund:", refundErr);
      }
    }
  }

  async upgradeGuestOrders(userId: string): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .update({ is_guest: false })
      .eq('user_id', userId);

    if (error) {
      console.warn("OrderRepository: Failed to upgrade guest orders", (error as Error).message);
    }
  }

  async trackGuestOrder(orderId: string, emailOrPhone: string): Promise<OrderAggregate | null> {
    const cleanOrderId = orderId.replace(/^#/, '').trim();
    const cleanContact = emailOrPhone.trim().replace(/\s+/g, '');
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    let data = null;

    // Direct search by exact UUID
    if (uuidRegex.test(cleanOrderId)) {
      const result = await supabase
        .from('orders')
        .select('*')
        .eq('id', cleanOrderId);
      data = result.data?.[0] || null;
    }

    // Direct search by contact details
    if (!data) {
      const candidates = new Set<string>();
      candidates.add(cleanContact);
      candidates.add(cleanContact.replace(/^\+/, ''));
      if (/^\d+$/.test(cleanContact)) {
        candidates.add('+' + cleanContact);
      }
      
      const filterParts: string[] = [];
      candidates.forEach(cand => {
        filterParts.push(`user_email.eq.${cand}`);
        filterParts.push(`user_phone.eq.${cand}`);
      });

      if (filterParts.length > 0) {
        const result = await supabase
          .from('orders')
          .select('*')
          .or(filterParts.join(','));

        if (!result.error && result.data) {
          data = result.data.find(o => o.id.startsWith(cleanOrderId)) || null;
        }
      }
    }

    if (!data) return null;

    // Contact Verification
    const normalizeContact = (s: string | undefined | null) => (s || '').replace(/[\s\-\(\)\+]/g, '').toLowerCase();
    const dbEmail = normalizeContact(data.user_email);
    const dbPhone = normalizeContact(data.user_phone);
    const inputContact = normalizeContact(cleanContact);

    if (dbEmail !== inputContact && dbPhone !== inputContact) {
      return null;
    }

    return this.toDomain(data);
  }

  // Pure remote repository does not handle synchronizations
  async syncOrders(): Promise<void> {}
}

export const supabaseOrderRepository = new SupabaseOrderRepository();
