import './i18n';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { InventoryProvider } from './context/InventoryContext.tsx';
import { CartProvider } from './context/CartContext.tsx';
import { NavigationProvider } from './context/NavigationContext.tsx';
import { AdminProvider } from './context/AdminContext.tsx';
import { ShipperProvider } from './context/ShipperContext.tsx';
import { OperatorProvider } from './context/OperatorContext.tsx';
import { initEventHandlers } from './infrastructure/events';
import { DependenciesProvider } from './context/DependenciesContext.tsx';

// Initialize Domain Event Handlers
initEventHandlers();

// Automatically reload the page if a user has an old version of the site cached
// and tries to dynamically load a chunk that was deleted during a recent deployment.
window.addEventListener('vite:preloadError', (event) => {
  console.warn('Vite preload error detected. Reloading page to fetch latest chunks...', event);
  window.location.reload();
});

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <DependenciesProvider>
      <ThemeProvider>
        <AdminProvider>
          <ShipperProvider>
            <OperatorProvider>
              <AuthProvider>
                <InventoryProvider>
                  <NavigationProvider>
                    <CartProvider>
                      <App />
                    </CartProvider>
                  </NavigationProvider>
                </InventoryProvider>
              </AuthProvider>
            </OperatorProvider>
          </ShipperProvider>
        </AdminProvider>
      </ThemeProvider>
    </DependenciesProvider>
  </StrictMode>
);
