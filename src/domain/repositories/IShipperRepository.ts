import { Order } from '../../types/types';

export interface ShipperStats {
  shippedOrders: number;
  deliveredOrders: number;
  readyOrders: number;
  totalHandled: number;
}

export interface IShipperRepository {
  checkIsShipper(): Promise<boolean>;
  fetchReadyOrders(): Promise<Order[]>;
  updateOrderStatus(orderId: string, status: Order['status']): Promise<void>;
  fetchShipperStats(period: 'day' | 'week' | 'month' | 'year' | 'all'): Promise<ShipperStats>;
}
