import React, { createContext, useContext, ReactNode } from 'react';
import { useOperatorLogic as useOperatorLogicHook } from '../presentation/hooks/useOperatorLogic';

const OperatorContext = createContext<ReturnType<typeof useOperatorLogicHook> | undefined>(undefined);

export function OperatorProvider({ children }: { children: ReactNode }) {
  const operator = useOperatorLogicHook();
  
  return (
    <OperatorContext.Provider value={operator}>
      {children}
    </OperatorContext.Provider>
  );
}

export function useOperator() {
  const context = useContext(OperatorContext);
  if (context === undefined) {
    throw new Error('useOperator must be used within an OperatorProvider');
  }
  return context;
}
