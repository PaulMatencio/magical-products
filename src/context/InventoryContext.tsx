import React, { createContext, useContext, ReactNode } from 'react';
import { Product, Category, Brand } from '../types/types';
import { useInventoryLogic } from '../presentation/hooks/useInventoryLogic';

interface InventoryContextType {
  storeProducts: Product[];
  categories: Category[];
  brands: Brand[];
  isLoading: boolean;
  isRefreshing: boolean;
  fetchError: string | null;
  isInitialized: React.MutableRefObject<boolean>;
  isRestoring: React.MutableRefObject<boolean>;
  storeRef: React.MutableRefObject<Product[]>;
  loadInventory: (isManualRefresh?: boolean, onCartRestored?: () => void) => Promise<void>;
  updateProductQuantityLocally: (id: string, newQuantity: number, newInStock: boolean) => void;
  syncInventoryDecrement: (id: string) => Promise<void>;
  syncInventoryIncrement: (id: string, amount: number) => Promise<void>;
  syncMultipleInventoryUpdates: (updates: { id: string, newQuantity: number, newInStock: boolean }[]) => Promise<void>;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export function InventoryProvider({ children }: { children: ReactNode }) {
  const inventory = useInventoryLogic();
  const storeRef = React.useRef<Product[]>([]);

  React.useEffect(() => {
    storeRef.current = inventory.storeProducts;
  }, [inventory.storeProducts]);

  const contextValue = React.useMemo(() => ({
    ...inventory,
    storeRef
  }), [inventory, storeRef]);

  return (
    <InventoryContext.Provider value={contextValue}>
      {children}
    </InventoryContext.Provider>
  );
}


export function useInventory() {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
}
