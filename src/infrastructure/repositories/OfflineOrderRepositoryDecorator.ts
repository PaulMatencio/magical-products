import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { CartItem } from '../../types/types';
import { Order as OrderAggregate } from '../../domain/entities/Order';
import { IDomainEvent } from '../../domain/common/DomainEvents';
import { supabase } from '../../services/supabase';

const LOCAL_ORDERS_KEY = 'product_catalogue_orders';

export class OfflineOrderRepositoryDecorator implements IOrderRepository {
  constructor(private remoteRepo: IOrderRepository) {}

  private getLocalOrdersRaw(): any[] {
    const localOrdersStr = localStorage.getItem(LOCAL_ORDERS_KEY);
    return localOrdersStr ? JSON.parse(localOrdersStr) : [];
  }

  private setLocalOrdersRaw(orders: any[]): void {
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(orders));
  }

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
      raw.status_history || undefined,
      raw.payment_id
    );
  }

  private toRaw(order: OrderAggregate): any {
    return {
      id: order.id,
      created_at: order.createdAt.toISOString(),
      total_price: order.totalPrice.value,
      status: order.status,
      payment_method: order.paymentMethod,
      shipping_address: order.shippingAddress,
      items: order.items,
      is_guest: order.isGuest,
      user_phone: order.userPhone?.value || order.userPhone,
      user_id: order.userId || '',
      user_email: order.userEmail || '',
      status_history: order.statusHistory,
      payment_id: order.paymentId || null
    };
  }

  async fetchOrders(): Promise<OrderAggregate[]> {
    // Try to sync any local orders first
    try {
      await this.syncOrders();
    } catch (syncErr) {
      console.warn('OfflineOrderRepoDecorator: Sync failed, continuing with fetch', syncErr);
    }

    let remoteOrders: OrderAggregate[] = [];
    const localOrdersRaw = this.getLocalOrdersRaw();

    try {
      remoteOrders = await this.remoteRepo.fetchOrders();
    } catch (err) {
      console.warn('OfflineOrderRepoDecorator: Remote fetch failed, using local fallback', err);
    }

    const remoteRaws = remoteOrders.map(o => this.toRaw(o));
    const remoteIds = new Set(remoteRaws.map(o => o.id));

    // Update local cache status if it differs from remote
    let localChanged = false;
    const updatedLocal = localOrdersRaw.map(lo => {
      const remote = remoteRaws.find(ro => ro.id === lo.id);
      if (remote && remote.status !== lo.status) {
        localChanged = true;
        return { ...lo, status: remote.status };
      }
      return lo;
    });

    if (localChanged) {
      this.setLocalOrdersRaw(updatedLocal);
    }

    // Merge: prioritize remote but keep unsynced local-only ones
    const combinedRaw: any[] = [...remoteRaws];
    localOrdersRaw.forEach(lo => {
      const is_local = typeof lo.id === 'string' && lo.id.startsWith('local-');
      if (is_local && !remoteIds.has(lo.id)) {
        combinedRaw.push(lo);
      }
    });

    // Cleanup local storage: remove orders that were synced but are now gone from remote
    const syncedIdsInLocal = localOrdersRaw.filter(lo => typeof lo.id === 'string' && !lo.id.startsWith('local-')).map(lo => lo.id);
    const missingSyncedIds = syncedIdsInLocal.filter(id => !remoteIds.has(id));

    if (missingSyncedIds.length > 0) {
      console.log('OfflineOrderRepoDecorator: Cleaning up deleted remote orders from local storage', missingSyncedIds);
      const filteredLocal = localOrdersRaw.filter(lo => !missingSyncedIds.includes(lo.id));
      this.setLocalOrdersRaw(filteredLocal);
    }

    const aggregates = combinedRaw.map(raw => this.toDomain(raw));
    return aggregates.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createOrder(
    items: CartItem[],
    totalPrice: number,
    paymentMethod: string,
    shippingAddress: string,
    userPhone?: string,
    paymentId?: string
  ): Promise<OrderAggregate> {
    let orderAggregate: OrderAggregate;
    let rawOrder: any;

    try {
      orderAggregate = await this.remoteRepo.createOrder(items, totalPrice, paymentMethod, shippingAddress, userPhone, paymentId);
      rawOrder = this.toRaw(orderAggregate);
    } catch (err) {
      console.warn('OfflineOrderRepoDecorator: Remote insertion failed, creating local-only order', err);
      
      const { data: { user } } = await supabase.auth.getUser();
      rawOrder = {
        id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        created_at: new Date().toISOString(),
        total_price: totalPrice,
        status: 'pending',
        payment_method: paymentMethod,
        shipping_address: shippingAddress,
        user_phone: userPhone,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.cart_quantity,
          image_url: item.image_url,
          discount_percentage: item.discount_percentage || 0
        })),
        is_guest: user?.is_anonymous ?? false,
        user_id: user?.id || '',
        user_email: user?.email || '',
        payment_id: paymentId || null
      };
      orderAggregate = this.toDomain(rawOrder);
    }

    // Always mirror to local storage
    const localOrders = this.getLocalOrdersRaw();
    this.setLocalOrdersRaw([rawOrder, ...localOrders]);

    return orderAggregate;
  }

  async createOrderWithEvents(
    items: CartItem[],
    totalPrice: number,
    paymentMethod: string,
    shippingAddress: string,
    events: IDomainEvent[],
    userPhone?: string,
    paymentId?: string
  ): Promise<OrderAggregate> {
    let orderAggregate: OrderAggregate;
    let rawOrder: any;

    try {
      orderAggregate = await this.remoteRepo.createOrderWithEvents(items, totalPrice, paymentMethod, shippingAddress, events, userPhone, paymentId);
      rawOrder = this.toRaw(orderAggregate);
    } catch (err) {
      console.warn('OfflineOrderRepoDecorator: Remote insertion with events failed, creating local-only order', err);
      
      const { data: { user } } = await supabase.auth.getUser();
      rawOrder = {
        id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        created_at: new Date().toISOString(),
        total_price: totalPrice,
        status: 'pending',
        payment_method: paymentMethod,
        shipping_address: shippingAddress,
        user_phone: userPhone,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.cart_quantity,
          image_url: item.image_url,
          discount_percentage: item.discount_percentage || 0
        })),
        is_guest: user?.is_anonymous ?? false,
        user_id: user?.id || '',
        user_email: user?.email || '',
        payment_id: paymentId || null
      };
      orderAggregate = this.toDomain(rawOrder);
    }

    // Always mirror to local storage
    const localOrders = this.getLocalOrdersRaw();
    this.setLocalOrdersRaw([rawOrder, ...localOrders]);

    return orderAggregate;
  }

  async updateShippingAddress(orderId: string, newAddress: string): Promise<void> {
    try {
      if (!orderId.startsWith('local-')) {
        await this.remoteRepo.updateShippingAddress(orderId, newAddress);
      }
    } catch (err) {
      console.warn('OfflineOrderRepoDecorator: Remote update failed, focusing on local', err);
    }

    // Always update local storage
    const localOrders = this.getLocalOrdersRaw();
    const updated = localOrders.map(order =>
      order.id === orderId ? { ...order, shipping_address: newAddress } : order
    );
    this.setLocalOrdersRaw(updated);
  }

  async deleteOrder(orderId: string): Promise<void> {
    try {
      if (!orderId.startsWith('local-')) {
        await this.remoteRepo.deleteOrder(orderId);
      }
    } catch (err) {
      console.warn('OfflineOrderRepoDecorator: Remote cancellation failed', err);
      throw err; // Re-throw so UI can display it
    }

    // Always update local storage
    const localOrders = this.getLocalOrdersRaw();
    const updated = localOrders.map(order =>
      order.id === orderId 
        ? { 
            ...order, 
            status: 'cancelled',
            status_history: {
              ...(order.status_history || {}),
              cancelled: new Date().toISOString()
            }
          } 
        : order
    );
    this.setLocalOrdersRaw(updated);
  }

  async syncOrders(): Promise<void> {
    const localOrders = this.getLocalOrdersRaw();
    const syncableOrders = localOrders.filter(order => String(order.id).startsWith('local-'));

    if (syncableOrders.length === 0) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    for (const order of syncableOrders) {
      try {
        const remoteOrder = await this.remoteRepo.createOrder(
          order.items.map((i: any) => ({ ...i, cart_quantity: i.quantity })),
          order.total_price,
          order.payment_method,
          order.shipping_address,
          order.user_phone
        );

        // Replace local order with remote order in storage
        const currentLocal = this.getLocalOrdersRaw();
        const updatedLocal = currentLocal.map((lo: any) =>
          lo.id === order.id
            ? this.toRaw(remoteOrder)
            : lo
        );
        this.setLocalOrdersRaw(updatedLocal);
        console.log(`OfflineOrderRepoDecorator: Successfully synced local order ${order.id} to remote ${remoteOrder.id}`);
      } catch (err) {
        console.warn(`OfflineOrderRepoDecorator: Individual sync failed for order ${order.id}`, err);
      }
    }
  }

  async upgradeGuestOrders(userId: string): Promise<void> {
    try {
      await this.remoteRepo.upgradeGuestOrders(userId);
    } catch (err) {
      console.warn('OfflineOrderRepoDecorator: Failed to upgrade guest orders', err);
    }
  }

  async trackGuestOrder(orderId: string, emailOrPhone: string): Promise<OrderAggregate | null> {
    try {
      const order = await this.remoteRepo.trackGuestOrder(orderId, emailOrPhone);
      if (order) return order;
    } catch (err) {
      console.warn('OfflineOrderRepoDecorator: Remote tracking failed', err);
    }

    // Fallback to local storage
    const localOrders = this.getLocalOrdersRaw();
    const cleanOrderId = orderId.replace(/^#/, '').trim();
    const cleanContact = emailOrPhone.trim().replace(/\s+/g, '');

    const data = localOrders.find(o => o.id === cleanOrderId || o.id.startsWith(cleanOrderId));
    if (!data) return null;

    const normalizeContact = (s: string | undefined | null) => (s || '').replace(/[\s\-\(\)\+]/g, '').toLowerCase();
    const dbEmail = normalizeContact(data.user_email);
    const dbPhone = normalizeContact(data.user_phone);
    const inputContact = normalizeContact(cleanContact);

    if (dbEmail !== inputContact && dbPhone !== inputContact) {
      return null;
    }

    return this.toDomain(data);
  }
}
