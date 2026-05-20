import { useMemo, useState, useCallback } from 'react';
import { AppGateway, AppInitialData } from '../../application/bff/AppGateway';
import { LoadCatalogUseCase } from '../../application/use-cases/catalog/LoadCatalogUseCase';
import { ManageOrdersUseCase } from '../../application/use-cases/order/ManageOrdersUseCase';
import { productRepository, orderRepository } from '../../infrastructure/repositories';
import { browserStorageRepository } from '../../infrastructure/repositories/BrowserStorageRepository';
import { eventRepository } from '../../infrastructure/events/registry';
import { useAuth } from '../../context/AuthContext';

/**
 * Presentation Layer Adapter for the BFF Gateway.
 */
export function useAppGateway() {
  const { user } = useAuth();
  const [isAppLoading, setIsAppLoading] = useState(false);
  const [appData, setAppData] = useState<AppInitialData | null>(null);

  const gateway = useMemo(() => {
    const loadCatalog = new LoadCatalogUseCase(productRepository, browserStorageRepository);
    const manageOrders = new ManageOrdersUseCase(orderRepository, eventRepository);
    return new AppGateway(loadCatalog, manageOrders);
  }, []);

  const bootstrapApp = useCallback(async () => {
    setIsAppLoading(true);
    try {
      const data = await gateway.getInitialAppData(user?.id);
      setAppData(data);
      return data;
    } catch (err) {
      console.error("BFF Gateway: Failed to fetch initial data", err);
      throw err;
    } finally {
      setIsAppLoading(false);
    }
  }, [gateway, user?.id]);

  return {
    bootstrapApp,
    isAppLoading,
    appData,
    userContext: appData?.userContext,
    catalog: appData?.catalog
  };
}
