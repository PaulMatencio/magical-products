/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase } from "../../services/supabase";
import { Order, CartItem } from "../../types/types";

import { IOrderRepository } from "../../domain/repositories/IOrderRepository";
import { IDomainEvent } from "../../domain/common/DomainEvents";
import { Phone } from "lucide-react";


const LOCAL_ORDERS_KEY = 'product_catalogue_orders';

export class SupabaseOrderRepository implements IOrderRepository {

  async fetchOrders(): Promise<Order[]> {
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user ?? null;

    if (!user) {
      console.warn('OrderRepository: No session user found during fetch');
    }

    // Try to sync any local orders first
    try {
      await this.syncOrders();
    } catch (syncErr) {
      console.warn('OrderRepository: Sync failed, continuing with fetch', syncErr);
    }

    let remoteOrders: Order[] = [];

    // Get local orders
    const localOrdersStr = localStorage.getItem(LOCAL_ORDERS_KEY);
    const localOrders: any[] = localOrdersStr ? JSON.parse(localOrdersStr) : [];

    try {
      let shouldQuery = true;
      let query = supabase
        .from('orders')
        .select('*');

      if (user) {
        query = query.eq('user_id', user.id);
      } else {
        const localIds = localOrders.map(o => o.id).filter(id => typeof id === 'string' && !id.startsWith('local-'));
        if (localIds.length > 0) {
          query = query.in('id', localIds);
        } else {
          shouldQuery = false;
        }
      }

      if (shouldQuery) {
        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) {
          console.error('OrderService: Supabase fetch error:', error);
          if (error.code === '42703') {
            console.error('OrderService: Missing "userId" column in "orders" table. Run SQL: "ALTER TABLE orders ADD COLUMN userId UUID REFERENCES auth.users(id);"');
          }
          throw error;
        }

        if (data) {
          remoteOrders = data.map(order => ({
            id: order.id,
            created_at: order.created_at,
            total_price: Number(order.total_price || 0),
            status: order.status || 'pending',
            payment_method: order.payment_method || 'Credit Card',
            shipping_address: order.shipping_address || order.address || 'No address provided',
            items: order.items || [],
            is_guest: order.is_guest,
            user_phone: order.user_phone,
            user_id: order.user_id || '',
            user_email: order.user_email || ''
          }));
        }
      }
    } catch (err) {
      console.warn('OrderService: Remote fetch failed', err);
    }

    // Merge: prioritize remote but keep local-only ones
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
      // Only keep local orders that haven't been synced (id starts with 'local-')
      // If it doesn't start with 'local-', it means it was already synced but is missing from remote
      // likely because it was deleted.
      const is_local = typeof lo.id === 'string' && lo.id.startsWith('local-');
      if (is_local && !remoteIds.has(lo.id)) {
        combined.push({
          id: lo.id,
          created_at: lo.created_at,
          total_price: Number(lo.total_price || 0),
          status: lo.status || 'pending',
          payment_method: lo.payment_method || 'Credit Card',
          shipping_address: lo.shipping_address || lo.address || 'No address provided',
          items: lo.items || [],
          is_guest: lo.is_guest,
          user_phone: lo.user_phone,
          user_id: lo.user_id || '',
          user_email: lo.user_email || ''
        });

      }
    });

    // Cleanup local storage: remove orders that were synced but are now gone from remote
    const syncedIdsInLocal = localOrders.filter(lo => typeof lo.id === 'string' && !lo.id.startsWith('local-')).map(lo => lo.id);
    const missingSyncedIds = syncedIdsInLocal.filter(id => !remoteIds.has(id));

    if (missingSyncedIds.length > 0) {
      console.log('OrderService: Cleaning up deleted remote orders from local storage', missingSyncedIds);
      const filteredLocal = localOrders.filter(lo => !missingSyncedIds.includes(lo.id));
      localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(filteredLocal));
    }

    // Sort by date descending
    return combined.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  async syncOrders(): Promise<void> {
    const localOrdersStr = localStorage.getItem(LOCAL_ORDERS_KEY);
    if (!localOrdersStr) return;

    let localOrders: Order[];
    try {
      localOrders = JSON.parse(localOrdersStr);
    } catch (e) {
      console.error('OrderService: Failed to parse local orders during sync', e);
      return;
    }

    const syncableOrders = localOrders.filter(order => String(order.id).startsWith('local-'));

    if (syncableOrders.length === 0) return;

    console.log(`OrderService: Attempting to sync ${syncableOrders.length} local orders to Supabase...`);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.log('OrderService: No authenticated user session, skipping local order sync.');
      return;
    }

    for (const order of syncableOrders) {
      try {
        const payload: any = {
          total_price: order.total_price,
          status: order.status,
          payment_method: order.payment_method,
          shipping_address: order.shipping_address,
          items: order.items,
          user_phone: order.user_phone,
          is_guest: user?.is_anonymous ?? false
        };

        if (user) {
          payload.user_id = user.id;
        }

        const { data, error } = await supabase
          .from('orders')
          .insert([payload])
          .select()
          .single();

        if (error) {
          if (error.code === '42703') {
            console.error('OrderService: Missing column in "orders" table. Ensure "user_id" (UUID) and "is_guest" (BOOLEAN) exist. \nSQL: "ALTER TABLE orders ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id), ADD COLUMN IF NOT EXISTS is_guest BOOLEAN DEFAULT FALSE;"');
            return;
          }
          if (error.code === '42P01') {
            console.error('OrderService: The "orders" table does not exist in Supabase yet. Please create it.');
            return;
          }
          if (error.code === '42501') {
            console.error('OrderService: Permission Denied (42501). You must grant SELECT/INSERT permissions to the "anon" role in Supabase or add RLS policies.');
            return;
          }
          throw error;
        }

        // Replace local order with remote order in storage
        const currentLocalStr = localStorage.getItem(LOCAL_ORDERS_KEY);
        if (currentLocalStr) {
          const currentLocal = JSON.parse(currentLocalStr);
          const updatedLocal = currentLocal.map((lo: Order) =>
            lo.id === order.id
              ? {
                ...lo,
                id: data.id,
                created_at: data.created_at
              }
              : lo
          );
          localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(updatedLocal));
        }
        console.log(`OrderService: Successfully synced local order ${order.id} to remote ${data.id}`);
      } catch (err) {
        console.warn(`OrderService: Individual sync failed for order ${order.id}`, err);
        // We continue with next orders even if one fails
      }
    }
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

    let orderToReturn: Order;

    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([newOrderBase])
        .select()
        .single();

      if (error) throw error;

      orderToReturn = {
        id: data.id,
        created_at: data.created_at,
        total_price: Number(data.total_price || 0),
        status: data.status || 'pending',
        payment_method: data.payment_method || 'Credit Card',
        shipping_address: data.shipping_address || shippingAddress,
        items: data.items || [],
        is_guest: data.is_guest,
        user_id: data.user_id || '',
        user_email: data.user_email || ''
      };

    } catch (err) {
      console.warn('OrderService: Supabase insertion failed, creating local-only order', err);
      orderToReturn = {
        id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        created_at: new Date().toISOString(),
        ...newOrderBase,
        status: 'pending' as const,
        total_price: totalPrice,
        shipping_address: shippingAddress,
        payment_method: paymentMethod
      };
    }

    // Always mirror to local storage
    const localOrdersStr = localStorage.getItem(LOCAL_ORDERS_KEY);
    const localOrders: Order[] = localOrdersStr ? JSON.parse(localOrdersStr) : [];
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify([orderToReturn, ...localOrders]));

    return orderToReturn;
  }

  async createOrderWithEvents(
    items: CartItem[],
    total_price: number,
    payment_method: string,
    shipping_address: string,
    events: IDomainEvent[],
    user_phone?: string
  ): Promise<Order> {
    const { data: { user } } = await supabase.auth.getUser();
    const primaryEvent = events[0];

    if (!primaryEvent) {
      return this.createOrder(items, total_price, payment_method, shipping_address, user_phone);
    }

    try {
      // 1. Map items to DTO
      const orderItems = items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.cart_quantity,
        image_url: item.image_url,
        discount_percentage: item.discount_percentage || 0
      }));

      // 2. Call the transactional RPC
      const { data, error } = await supabase.rpc('create_order_with_outbox', {
        p_items: orderItems,
        p_total_price: total_price,
        p_payment_method: payment_method,
        p_shipping_address: shipping_address,
        p_user_phone: user_phone || null,
        p_user_email: user?.email || null,
        p_user_id: user?.id || null,
        p_event_type: primaryEvent.constructor.name,
        p_event_payload: JSON.parse(JSON.stringify(primaryEvent))
      });

      if (error) {
        console.warn("[TransactionalRepo] RPC failed, falling back to sequential save.", error);
        return this.createOrder(items, total_price, payment_method, shipping_address, user_phone);
      }

      const orderToReturn: Order = {
        id: data.id,
        created_at: data.created_at,
        total_price: Number(data.total_price),
        status: data.status,
        payment_method: data.payment_method,
        shipping_address: data.shipping_address,
        items: orderItems,
        is_guest: user?.is_anonymous ?? false,
        user_phone: user_phone,
        user_id: user?.id || ''
      };

      // Sync local storage
      const localOrdersStr = localStorage.getItem(LOCAL_ORDERS_KEY);
      const localOrders: Order[] = localOrdersStr ? JSON.parse(localOrdersStr) : [];
      localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify([orderToReturn, ...localOrders]));

      return orderToReturn;
    } catch (err) {
      console.error("[TransactionalRepo] Error during RPC attempt:", err);
      return this.createOrder(items, total_price, payment_method, shipping_address, user_phone);
    }
  }


  async updateShippingAddress(orderId: string, newAddress: string): Promise<void> {
    try {
      if (!orderId.startsWith('local-')) {
        const { error } = await supabase
          .from('orders')
          .update({ shipping_address: newAddress })
          .eq('id', orderId);

        if (error) throw error;
      }
    } catch (err) {
      console.warn('OrderService: Remote update failed, focusing on local', err);
    }

    // Always update local storage
    const localOrdersStr = localStorage.getItem(LOCAL_ORDERS_KEY);
    if (localOrdersStr) {
      const localOrders: Order[] = JSON.parse(localOrdersStr);
      const updatedOrders = localOrders.map(order =>
        order.id === orderId ? { ...order, shipping_address: newAddress } : order
      );
      localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(updatedOrders));
    }
  }

  async deleteOrder(orderId: string): Promise<void> {
    try {
      if (!orderId.startsWith('local-')) {
        const { error, count } = await supabase
          .from('orders')
          .update({ status: 'cancelled' }, { count: 'exact' })
          .eq('id', orderId);

        if (error) throw error;

        // If the query succeeds but 0 rows are updated, it means RLS blocked it
        // or the order doesn't exist. We MUST throw so the frontend doesn't falsely
        // assume it worked and prematurely update localStorage or restore inventory.
        if (count === 0) {
          throw new Error('Permission denied. You must be in the original session to cancel this order.');
        }
      }
    } catch (err) {
      console.error('OrderService: Remote cancellation failed:', err);
      throw err; // Re-throw so UI can handle it
    }

    // Only update local storage if remote cancellation succeeded (or if it was a local-only order)
    const localOrdersStr = localStorage.getItem(LOCAL_ORDERS_KEY);
    if (localOrdersStr) {
      const localOrders: Order[] = JSON.parse(localOrdersStr);
      const updatedOrders = localOrders.map(order =>
        order.id === orderId ? { ...order, status: 'cancelled' as const } : order
      );
      localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(updatedOrders));
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

  async trackGuestOrder(orderId: string, emailOrPhone: string): Promise<Order | null> {
    try {
      const cleanOrderId = orderId.replace(/^#/, '').trim();
      const cleanContact = emailOrPhone.trim().replace(/\s+/g, '');
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      let data = null;
      let targetDbId = cleanOrderId;

      console.log(`TrackOrder: Searching for order="${cleanOrderId}", contact="${cleanContact}"`);

      // 1. Try to resolve short ID to full UUID using local storage
      if (cleanOrderId.length >= 8 && !uuidRegex.test(cleanOrderId) && !cleanOrderId.startsWith('local-')) {
        const localOrdersStr = localStorage.getItem(LOCAL_ORDERS_KEY);
        if (localOrdersStr) {
          const localOrders: any[] = JSON.parse(localOrdersStr);
          const matchedLocal = localOrders.find(o => o.id.startsWith(cleanOrderId));
          if (matchedLocal && uuidRegex.test(matchedLocal.id)) {
            targetDbId = matchedLocal.id;
            console.log(`TrackOrder: Resolved short ID to full UUID via localStorage: ${targetDbId}`);
          }
        }
      }

      // 2. Query DB with full UUID (exact match)
      if (uuidRegex.test(targetDbId)) {
        console.log(`TrackOrder: Querying DB with exact UUID: ${targetDbId}`);
        const result = await supabase
          .from('orders')
          .select('*')
          .eq('id', targetDbId);
        if (result.error) {
          console.warn('TrackOrder: DB exact query error:', result.error);
        }
        data = result.data?.[0] || null;
        if (data) console.log(`TrackOrder: Found order via exact UUID match`);
      }

      // 3. If short ID and DB didn't find it, try prefix search by contact
      if (!data && !uuidRegex.test(cleanOrderId) && cleanOrderId.length >= 8 && !cleanOrderId.startsWith('local-')) {
        console.log(`TrackOrder: Trying DB prefix search via contact: ${cleanContact}`);
        
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
            if (data) console.log(`TrackOrder: Found order via contact and JS prefix matching`);
          } else if (result.error) {
            console.warn('TrackOrder: DB contact search error:', result.error);
          }
        }
      }

      // 4. Fallback to local storage if not found in DB
      if (!data) {
        console.log(`TrackOrder: DB returned no results, checking localStorage...`);
        const localOrdersStr = localStorage.getItem(LOCAL_ORDERS_KEY);
        if (localOrdersStr) {
          const localOrders: any[] = JSON.parse(localOrdersStr);
          data = localOrders.find(o => o.id === cleanOrderId || o.id.startsWith(cleanOrderId));
          if (data) console.log(`TrackOrder: Found order in localStorage`);
        }
      }

      if (!data) {
        console.log(`TrackOrder: Order not found anywhere`);
        return null;
      }

      // 5. Verify contact — normalize both sides by stripping all non-alphanumeric chars for comparison
      const normalizeContact = (s: string | undefined | null) => (s || '').replace(/[\s\-\(\)\+]/g, '').toLowerCase();
      const dbEmail = normalizeContact(data.user_email);
      const dbPhone = normalizeContact(data.user_phone);
      const inputContact = normalizeContact(cleanContact);

      console.log(`TrackOrder: Verifying contact. Input="${inputContact}", DB email="${dbEmail}", DB phone="${dbPhone}"`);

      if (dbEmail !== inputContact && dbPhone !== inputContact) {
        console.log(`TrackOrder: Contact verification FAILED`);
        return null;
      }

      console.log(`TrackOrder: Contact verified, returning order`);
      return {
        id: data.id,
        created_at: data.created_at,
        total_price: Number(data.total_price || 0),
        status: data.status || 'pending',
        payment_method: data.payment_method || 'Credit Card',
        shipping_address: data.shipping_address || data.address || 'No address provided',
        items: data.items || [],
        is_guest: data.is_guest,
        user_phone: data.user_phone,
        user_id: data.user_id || '',
        user_email: data.user_email || ''
      };
    } catch (err) {
      console.error('OrderRepository: trackGuestOrder failed', err);
      return null;
    }
  }
}

export const supabaseOrderRepository = new SupabaseOrderRepository();
