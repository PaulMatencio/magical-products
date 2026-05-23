import { useState, useCallback } from 'react';
import { AppInitialData } from '../../application/bff/AppGateway';
import { useAuth } from '../../context/AuthContext';
import { useDependencies } from '../../context/DependenciesContext';

/**
 * Presentation Layer Adapter for the BFF Gateway.
 */
export function useAppGateway() {
  const { user } = useAuth();
  const [isAppLoading, setIsAppLoading] = useState(false);
  const [appData, setAppData] = useState<AppInitialData | null>(null);
  const { appGateway } = useDependencies();

  const bootstrapApp = useCallback(async () => {
    setIsAppLoading(true);
    try {
      const data = await appGateway.getInitialAppData(user?.id);
      setAppData(data);
      return data;
    } catch (err) {
      console.error("BFF Gateway: Failed to fetch initial data", err);
      throw err;
    } finally {
      setIsAppLoading(false);
    }
  }, [appGateway, user?.id]);

  return {
    bootstrapApp,
    isAppLoading,
    appData,
    userContext: appData?.userContext,
    catalog: appData?.catalog
  };
}
