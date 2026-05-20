/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Order, CartItem } from '../../types/types';
import { IDomainEvent } from '../common/DomainEvents';

export interface IOrderRepository {
  fetchOrders(): Promise<Order[]>;
  createOrder(items: CartItem[], totalPrice: number, paymentMethod: string, shippingAddress: string, userPhone?: string): Promise<Order>;
  
  /**
   * Transactionally creates an order and saves associated domain events to the outbox.
   */
  createOrderWithEvents(
    items: CartItem[], 
    totalPrice: number, 
    paymentMethod: string, 
    shippingAddress: string, 
    events: IDomainEvent[],
    userPhone?: string
  ): Promise<Order>;

  updateShippingAddress(orderId: string, newAddress: string): Promise<void>;

  deleteOrder(orderId: string): Promise<void>;
  syncOrders(): Promise<void>;
  upgradeGuestOrders(userId: string): Promise<void>;
  trackGuestOrder(orderId: string, emailOrPhone: string): Promise<Order | null>;
}
