/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useMemo } from 'react';
import { Order, CartItem } from '../../types/types';
import { useDependencies } from '../../context/DependenciesContext';

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
    return await manageOrdersUseCase.createOrder(items, totalPrice, paymentMethod, shippingAddress, userPhone);
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


