import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ViewState } from '../types/types';

interface NavigationContextType {
  view: ViewState;
  setView: (view: ViewState) => void;
  navigateTo: (view: ViewState) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<ViewState>('landing');

  const navigateTo = React.useCallback((newView: ViewState) => {
    setView(currentView => {
      if (currentView === newView) return currentView;
      return newView;
    });
    window.scrollTo(0, 0);
  }, []);

  const value = React.useMemo(() => ({
    view,
    setView,
    navigateTo
  }), [view, navigateTo]);

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}


export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
