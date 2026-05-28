/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Order, Product } from '../../types/types';

export interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
  totalRevenue: number;
  totalProducts: number;
  outOfStockProducts: number;
  recentOrdersLast7Days: number;
  cancelledOrders: number;
  refundedOrders: number;
}

export interface IAdminRepository {
  /** Check if the current user is an admin */
  checkIsAdmin(): Promise<boolean>;

  /** Fetch all orders from all users */
  fetchAllOrders(): Promise<Order[]>;

  /** Update the status of an order */
  updateOrderStatus(orderId: string, status: Order['status']): Promise<void>;

  /** Add a completely new product to the inventory */
  addProduct(product: Omit<Product, 'id'>): Promise<Product>;

  /** Update details of an existing product */
  updateProduct(productId: string, updates: Partial<Product>): Promise<Product>;

  /** Delete a product from inventory */
  deleteProduct(productId: string): Promise<void>;

  /** Translate an existing product into all active languages */
  translateProduct(productId: string): Promise<void>;

  /** Fetch aggregated stats for the dashboard */
  fetchDashboardStats(period?: 'day' | 'week' | 'month' | 'year' | 'all'): Promise<DashboardStats>;
}
