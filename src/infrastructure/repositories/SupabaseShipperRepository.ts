import { supabase } from '../../services/supabase';
import { IShipperRepository, ShipperStats } from '../../domain/repositories/IShipperRepository';
import { Order } from '../../types/types';

export class SupabaseShipperRepository implements IShipperRepository {
  async checkIsShipper(): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error || !data) return false;
    return data.role === 'shipper';
  }

  async fetchReadyOrders(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .in('status', ['ready', 'shipped'])
      .order('created_at', { ascending: true });

    if (error) throw error;

    return (data || []).map(order => ({
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

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);

    if (error) throw error;
  }

  async fetchShipperStats(period: 'day' | 'week' | 'month' | 'year' | 'all'): Promise<ShipperStats> {
    // Compute start-of-period ISO timestamp
    let since: string | null = null;
    if (period !== 'all') {
      const d = new Date();
      if (period === 'day') {
        d.setHours(0, 0, 0, 0);
      } else if (period === 'week') {
        d.setDate(d.getDate() - d.getDay()); // roll back to Sunday
        d.setHours(0, 0, 0, 0);
      } else if (period === 'month') {
        d.setDate(1);
        d.setHours(0, 0, 0, 0);
      } else if (period === 'year') {
        d.setMonth(0, 1);
        d.setHours(0, 0, 0, 0);
      }
      since = d.toISOString();
    }

    const fetchCount = async (status: string): Promise<number> => {
      let q = supabase
        .from('orders')
        .select('id', { count: 'exact', head: true })
        .eq('status', status);
      if (since) q = q.gte('created_at', since);
      const { count, error } = await q;
      if (error) throw error;
      return count ?? 0;
    };

    const [shippedOrders, deliveredOrders, readyOrders] = await Promise.all([
      fetchCount('shipped'),
      fetchCount('delivered'),
      fetchCount('ready'),
    ]);

    return {
      shippedOrders,
      deliveredOrders,
      readyOrders,
      totalHandled: shippedOrders + deliveredOrders,
    };
  }
}

export const supabaseShipperRepository = new SupabaseShipperRepository();
