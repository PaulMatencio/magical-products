import React, { createContext, useContext, ReactNode } from 'react';
import { useAdminLogic as useAdminLogicHook } from '../presentation/hooks/useAdminLogic';

const AdminContext = createContext<ReturnType<typeof useAdminLogicHook> | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const admin = useAdminLogicHook();
  
  return (
    <AdminContext.Provider value={admin}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
