import { useState, useCallback, useMemo, useRef } from 'react';
import { IShipperRepository, ShipperStats } from '../../domain/repositories/IShipperRepository';
import { shipperRepository } from '../../infrastructure/repositories';
import { Order } from '../../types/types';
import { ShipperUseCase } from '../../application/use-cases/shipper/ShipperUseCase';

export function useShipperLogic(repo: IShipperRepository = shipperRepository) {
  const [isShipper, setIsShipper] = useState<boolean>(false);
  const [isCheckingShipper, setIsCheckingShipper] = useState<boolean>(true);

  const [readyOrders, setReadyOrders] = useState<Order[]>([]);
  const [isFetchingOrders, setIsFetchingOrders] = useState(false);

  const [shipperStats, setShipperStats] = useState<ShipperStats | null>(null);
  const [isFetchingStats, setIsFetchingStats] = useState(false);

  const shipperUseCase = useMemo(() => new ShipperUseCase(repo), [repo]);

  const isCheckingShipperRef = useRef(false);
  const checkShipperStatus = useCallback(async () => {
    if (isCheckingShipperRef.current) return false;
    isCheckingShipperRef.current = true;
    setIsCheckingShipper(true);
    try {
      const status = await shipperUseCase.checkShipperStatus();
      setIsShipper(status);
      return status;
    } catch (err) {
      console.error("useShipperLogic: Failed to check shipper status:", err);
      setIsShipper(false);
      return false;
    } finally {
      setIsCheckingShipper(false);
      isCheckingShipperRef.current = false;
    }
  }, [shipperUseCase]);

  const fetchReadyOrders = useCallback(async () => {
    setIsFetchingOrders(true);
    try {
      const data = await shipperUseCase.getReadyOrders();
      setReadyOrders(data);
    } catch (err) {
      console.error("useShipperLogic: Failed to fetch ready orders:", err);
    } finally {
      setIsFetchingOrders(false);
    }
  }, [shipperUseCase]);

  const updateOrderStatus = useCallback(async (orderId: string, status: Order['status']) => {
    try {
      await shipperUseCase.updateOrderStatus(orderId, status);
      setReadyOrders(prev => {
        if (status === 'delivered') {
          return prev.filter(o => o.id !== orderId);
        }
        return prev.map(o => o.id === orderId ? { ...o, status } : o);
      });
    } catch (err) {
      console.error("useShipperLogic: Failed to update order status:", err);
      throw err;
    }
  }, [shipperUseCase]);

  const fetchShipperStats = useCallback(async (period: 'day' | 'week' | 'month' | 'year' | 'all') => {
    setIsFetchingStats(true);
    try {
      const data = await shipperUseCase.getShipperStats(period);
      setShipperStats(data);
    } catch (err) {
      console.error("useShipperLogic: Failed to fetch shipper stats:", err);
    } finally {
      setIsFetchingStats(false);
    }
  }, [shipperUseCase]);

  const clearShipperStatus = useCallback(() => {
    setIsShipper(false);
    setReadyOrders([]);
    setShipperStats(null);
  }, []);

  return useMemo(() => ({
    isShipper,
    isCheckingShipper,
    checkShipperStatus,
    clearShipperStatus,
    readyOrders,
    isFetchingOrders,
    fetchReadyOrders,
    updateOrderStatus,
    shipperStats,
    isFetchingStats,
    fetchShipperStats,
  }), [
    isShipper, isCheckingShipper, checkShipperStatus, clearShipperStatus,
    readyOrders, isFetchingOrders, fetchReadyOrders,
    updateOrderStatus, shipperStats, isFetchingStats, fetchShipperStats
  ]);
}


