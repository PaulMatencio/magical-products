import React, { createContext, useContext, ReactNode } from 'react';
import { useShipperLogic as useShipperLogicHook } from '../presentation/hooks/useShipperLogic';

const ShipperContext = createContext<ReturnType<typeof useShipperLogicHook> | undefined>(undefined);

export function ShipperProvider({ children }: { children: ReactNode }) {
  const shipper = useShipperLogicHook();
  
  return (
    <ShipperContext.Provider value={shipper}>
      {children}
    </ShipperContext.Provider>
  );
}

export function useShipper() {
  const context = useContext(ShipperContext);
  if (context === undefined) {
    throw new Error('useShipper must be used within a ShipperProvider');
  }
  return context;
}
