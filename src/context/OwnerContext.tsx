import React, { createContext, useContext, ReactNode } from 'react';
import { useOwnerLogic as useOwnerLogicHook } from '../presentation/hooks/useOwnerLogic';

const OwnerContext = createContext<ReturnType<typeof useOwnerLogicHook> | undefined>(undefined);

export function OwnerProvider({ children }: { children: ReactNode }) {
  const owner = useOwnerLogicHook();
  
  return (
    <OwnerContext.Provider value={owner}>
      {children}
    </OwnerContext.Provider>
  );
}

export function useOwner() {
  const context = useContext(OwnerContext);
  if (context === undefined) {
    throw new Error('useOwner must be used within an OwnerProvider');
  }
  return context;
}
