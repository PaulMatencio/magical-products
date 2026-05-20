import { IShipperRepository, ShipperStats } from '../../../domain/repositories/IShipperRepository';
import { Order } from '../../../types/types';

export class ShipperUseCase {
  constructor(private shipperRepo: IShipperRepository) {}

  async checkShipperStatus(): Promise<boolean> {
    return await this.shipperRepo.checkIsShipper();
  }

  async getReadyOrders(): Promise<Order[]> {
    return await this.shipperRepo.fetchReadyOrders();
  }

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    await this.shipperRepo.updateOrderStatus(orderId, status);
  }

  async getShipperStats(period: 'day' | 'week' | 'month' | 'year' | 'all'): Promise<ShipperStats> {
    return await this.shipperRepo.fetchShipperStats(period);
  }
}
