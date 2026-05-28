/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useMemo, useRef } from 'react';
import { DashboardStats } from '../../domain/repositories/IAdminRepository';
import { Order, Product } from '../../types/types';
import { useDependencies } from '../../context/DependenciesContext';

export function useAdminLogic() {
  const { adminUseCase } = useDependencies();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState<boolean>(true);

  const [adminOrders, setAdminOrders] = useState<Order[]>([]);
  const [isFetchingAdminOrders, setIsFetchingAdminOrders] = useState(false);

  const [isMutatingInventory, setIsMutatingInventory] = useState(false);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [isFetchingStats, setIsFetchingStats] = useState(false);

  const isCheckingAdminRef = useRef(false);
  const checkAdminStatus = useCallback(async () => {
    if (isCheckingAdminRef.current) return false;
    isCheckingAdminRef.current = true;
    setIsCheckingAdmin(true);
    try {
      const status = await adminUseCase.checkAdminStatus();
      setIsAdmin(status);
      return status;
    } catch (err) {
      console.error("useAdminLogic: Failed to check admin status:", err);
      setIsAdmin(false);
      return false;
    } finally {
      setIsCheckingAdmin(false);
      isCheckingAdminRef.current = false;
    }
  }, [adminUseCase]);

  const isFetchingOrdersRef = useRef(false);
  const fetchAllOrders = useCallback(async () => {
    if (isFetchingOrdersRef.current) return;
    isFetchingOrdersRef.current = true;
    setIsFetchingAdminOrders(true);
    try {
      const data = await adminUseCase.getAllOrders();
      setAdminOrders(data);
    } catch (err) {
      console.error("useAdminLogic: Failed to fetch all orders:", err);
    } finally {
      setIsFetchingAdminOrders(false);
      isFetchingOrdersRef.current = false;
    }
  }, [adminUseCase]);

  const isFetchingStatsRef = useRef(false);
  const fetchDashboardStats = useCallback(async (period: 'day' | 'week' | 'month' | 'year' | 'all' = 'all') => {
    if (isFetchingStatsRef.current) return;
    isFetchingStatsRef.current = true;
    setIsFetchingStats(true);
    try {
      const stats = await adminUseCase.getDashboardStats(period);
      setDashboardStats(stats);
    } catch (err) {
      console.error('useAdminLogic: Failed to fetch dashboard stats:', err);
    } finally {
      setIsFetchingStats(false);
      isFetchingStatsRef.current = false;
    }
  }, [adminUseCase]);

  const updateOrderStatus = useCallback(async (orderId: string, status: Order['status']) => {
    try {
      await adminUseCase.updateOrderStatus(orderId, status);
      setAdminOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    } catch (err) {
      console.error("useAdminLogic: Failed to update order status:", err);
      throw err;
    }
  }, [adminUseCase]);

  const addNewProduct = useCallback(async (productData: Omit<Product, 'id'>) => {
    setIsMutatingInventory(true);
    try {
      const newProduct = await adminUseCase.addProduct(productData);
      return newProduct;
    } catch (err) {
      console.error("useAdminLogic: Failed to add product:", err);
      throw err;
    } finally {
      setIsMutatingInventory(false);
    }
  }, [adminUseCase]);

  const updateExistingProduct = useCallback(async (productId: string, updates: Partial<Product>) => {
    setIsMutatingInventory(true);
    try {
      const updatedProduct = await adminUseCase.updateProduct(productId, updates);
      return updatedProduct;
    } catch (err) {
      console.error("useAdminLogic: Failed to update product:", err);
      throw err;
    } finally {
      setIsMutatingInventory(false);
    }
  }, [adminUseCase]);

  const removeProduct = useCallback(async (productId: string) => {
    setIsMutatingInventory(true);
    try {
      await adminUseCase.deleteProduct(productId);
    } catch (err) {
      console.error("useAdminLogic: Failed to delete product:", err);
      throw err;
    } finally {
      setIsMutatingInventory(false);
    }
  }, [adminUseCase]);

  const translateProduct = useCallback(async (productId: string) => {
    setIsMutatingInventory(true);
    try {
      await adminUseCase.translateProduct(productId);
    } catch (err) {
      console.error("useAdminLogic: Failed to translate product:", err);
      throw err;
    } finally {
      setIsMutatingInventory(false);
    }
  }, [adminUseCase]);

  const clearAdminStatus = useCallback(() => {
    setIsAdmin(false);
    setAdminOrders([]);
    setDashboardStats(null);
  }, []);

  const value = useMemo(() => ({
    isAdmin,
    isCheckingAdmin,
    checkAdminStatus,
    clearAdminStatus,

    adminOrders,
    isFetchingAdminOrders,
    fetchAllOrders,
    updateOrderStatus,

    isMutatingInventory,
    addNewProduct,
    updateExistingProduct,
    removeProduct,
    translateProduct,

    dashboardStats,
    isFetchingStats,
    fetchDashboardStats,
  }), [
    isAdmin, isCheckingAdmin, checkAdminStatus, clearAdminStatus,
    adminOrders, isFetchingAdminOrders, fetchAllOrders, updateOrderStatus,
    isMutatingInventory, addNewProduct, updateExistingProduct, removeProduct, translateProduct,
    dashboardStats, isFetchingStats, fetchDashboardStats
  ]);

  return value;

}


