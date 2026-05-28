/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useMemo } from 'react';
import { Order, CartItem } from '../../types/types';
import { useDependencies } from '../../context/DependenciesContext';
import { TraceContext } from '../../domain/common/TraceContext';

export function useOrderLogic() {
  const { manageOrdersUseCase } = useDependencies();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isFetchingOrders, setIsFetchingOrders] = useState(false);


  const loadOrders = useCallback(async () => {
    setIsFetchingOrders(true);
    try {
      const data = await manageOrdersUseCase.getOrders();
      setOrders(data);
    } catch (err) {


      console.error('OrderLogic: Failed to fetch orders:', err);
    } finally {
      setIsFetchingOrders(false);
    }
  }, [manageOrdersUseCase]);

  const createOrder = useCallback(async (items: CartItem[], totalPrice: number, paymentMethod: string, shippingAddress: string, userPhone: string) => {
    const correlationId = crypto.randomUUID();
    TraceContext.setCorrelationId(correlationId);
    TraceContext.log(`[Trace: ${correlationId}] [UI] [createOrder] Initiating order creation request for total: $${totalPrice.toFixed(2)}`);
    try {
      const order = await manageOrdersUseCase.createOrder(items, totalPrice, paymentMethod, shippingAddress, userPhone);
      TraceContext.log(`[Trace: ${correlationId}] [UI] [createOrder] Order creation completed successfully. Order ID: ${order.id}`);
      return order;
    } catch (err) {
      TraceContext.error(`[Trace: ${correlationId}] [UI] [createOrder] Order creation request failed:`, err);
      throw err;
    } finally {
      TraceContext.clear();
    }
  }, [manageOrdersUseCase]);

  const updateShippingAddress = useCallback(async (orderId: string, newAddress: string) => {
    await manageOrdersUseCase.updateShippingAddress(orderId, newAddress);
  }, [manageOrdersUseCase]);

  const deleteOrder = useCallback(async (orderId: string) => {
    await manageOrdersUseCase.deleteOrder(orderId);
  }, [manageOrdersUseCase]);

  const upgradeGuestOrders = useCallback(async (userId: string) => {
    await manageOrdersUseCase.upgradeGuestOrders(userId);
  }, [manageOrdersUseCase]);

  const trackGuestOrder = useCallback(async (orderId: string, emailOrPhone: string) => {
    return await manageOrdersUseCase.trackGuestOrder(orderId, emailOrPhone);
  }, [manageOrdersUseCase]);

  return useMemo(() => ({
    orders,
    setOrders,
    isFetchingOrders,
    loadOrders,
    createOrder,
    updateShippingAddress,
    deleteOrder,
    upgradeGuestOrders,
    trackGuestOrder
  }), [
    orders, isFetchingOrders, loadOrders, createOrder, 
    updateShippingAddress, deleteOrder, upgradeGuestOrders, trackGuestOrder
  ]);
}


