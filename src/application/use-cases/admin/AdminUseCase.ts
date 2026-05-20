import { IAdminRepository, DashboardStats } from '../../../domain/repositories/IAdminRepository';
import { Order, Product } from '../../../types/types';

export class AdminUseCase {
  constructor(private adminRepo: IAdminRepository) { }

  async checkAdminStatus(): Promise<boolean> {
    return await this.adminRepo.checkIsAdmin();
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.adminRepo.fetchAllOrders();
  }

  async getDashboardStats(period: 'day' | 'week' | 'month' | 'year' | 'all' = 'all'): Promise<DashboardStats> {
    return await this.adminRepo.fetchDashboardStats(period);
  }

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    await this.adminRepo.updateOrderStatus(orderId, status);
  }

  async addProduct(productData: Omit<Product, 'id'>): Promise<Product> {
    return await this.adminRepo.addProduct(productData);
  }

  async updateProduct(productId: string, updates: Partial<Product>): Promise<Product> {
    return await this.adminRepo.updateProduct(productId, updates);
  }

  async deleteProduct(productId: string): Promise<void> {
    await this.adminRepo.deleteProduct(productId);
  }
}
