import React, { createContext, useContext, useState, useEffect, useRef, ReactNode, useCallback, useMemo } from 'react';

import { CartItem, Product } from '../types/types';
import { useInventory } from './InventoryContext';
import { useAuth } from './AuthContext';
import { useNavigation } from './NavigationContext';
import { toast } from 'sonner';
import appConfig from '../config/appConfig';
import { useInactivityTimer } from '../presentation/hooks/useInactivityTimer';
import { supabase } from '../services/supabase';

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  isCartOpen: boolean;
  saveForLater: boolean;
  setIsCartOpen: (open: boolean) => void;
  setSaveForLater: (save: boolean) => void;
  addToCart: (product: Product) => Promise<void>;
  updateQuantity: (id: string, delta: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  emptyCart: () => Promise<void>;
  clearCart: () => void;
  isCheckingOut: React.MutableRefObject<boolean>;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  isSigningOutRef: React.MutableRefObject<boolean>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, isAuthLoading } = useAuth();
  const { navigateTo } = useNavigation();
  const { storeRef, syncInventoryDecrement, syncInventoryIncrement, syncMultipleInventoryUpdates } = useInventory();

  useInactivityTimer(user);

  const [saveForLater, setSaveForLater] = useState(() => {
    return localStorage.getItem('saveForLater') === 'true';
  });

  const getDeviceId = () => {
    let deviceId = localStorage.getItem('device_id');
    if (!deviceId) {
      deviceId = 'dev_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('device_id', deviceId);
    }
    return deviceId;
  };

  const getCartKey = () => {
    return user && !user.is_anonymous ? `product_cart_${user.id}` : `product_cart_${getDeviceId()}`;
  };

  const [cart, setCart] = useState<CartItem[]>(() => {
    // Determine target key first
    const userId = localStorage.getItem('product_cart_active_user');
    const targetKey = userId ? `product_cart_${userId}` : `product_cart_${getDeviceId()}`;

    const saved = localStorage.getItem(targetKey) || localStorage.getItem('product_cart');
    const parsed = saved ? JSON.parse(saved) : [];
    if (Array.isArray(parsed)) {
      return parsed.map((item: any) => ({
        ...item,
        cart_quantity: Number(item.cart_quantity) || 1
      }));
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<CartItem[]>(cart);
  const isCheckingOut = useRef(false);
  const isSigningOutRef = useRef(false);
  
  const [cartLoadedForUserId, setCartLoadedForUserId] = useState<string | undefined>(() => {
    const userId = localStorage.getItem('product_cart_active_user');
    return userId || undefined;
  });

  const cartCount = cart.reduce((sum, item) => sum + Number(item.cart_quantity || 0), 0);

  // Handle user login cart merging
  useEffect(() => {
    const currentUserId = user && !user.is_anonymous ? user.id : undefined;

    const loadAndMerge = async () => {
      if (user && !user.is_anonymous) {
        localStorage.setItem('product_cart_active_user', user.id);
        localStorage.setItem('last_activity_timestamp', Date.now().toString());

        const deviceCartStr = localStorage.getItem(`product_cart_${getDeviceId()}`);
        
        // Fetch cart and save_for_later flag from database
        let dbCart: CartItem[] = [];
        let dbSaveForLater = false;
        try {
          const { data, error } = await supabase
            .from('user_carts')
            .select('items, save_for_later')
            .eq('user_id', user.id)
            .maybeSingle();

          if (!error && data) {
            if (Array.isArray(data.items)) {
              dbCart = data.items.map((item: any) => ({
                ...item,
                cart_quantity: Number(item.cart_quantity) || 1
              }));
            }
            dbSaveForLater = data.save_for_later !== undefined ? !!data.save_for_later : false;
          }
        } catch (dbErr) {
          console.error('CartContext: Error fetching cart from db:', dbErr);
        }

        // Fallback to localStorage if dbCart is empty
        let userCart: CartItem[] = dbCart;
        if (userCart.length === 0) {
          const userCartStr = localStorage.getItem(`product_cart_${user.id}`);
          userCart = (userCartStr ? JSON.parse(userCartStr) : []).map((item: any) => ({
            ...item,
            cart_quantity: Number(item.cart_quantity) || 1
          }));
        }

        setSaveForLater(dbSaveForLater);
        localStorage.setItem('saveForLater', String(dbSaveForLater));

        const deviceCart: CartItem[] = (deviceCartStr ? JSON.parse(deviceCartStr) : []).map((item: any) => ({
          ...item,
          cart_quantity: Number(item.cart_quantity) || 1
        }));

        if (deviceCart.length > 0) {
          // Merge guest cart into user cart
          const merged = userCart.map(item => ({ ...item, cart_quantity: Number(item.cart_quantity) }));
          deviceCart.forEach(gItem => {
            const existing = merged.find(uItem => uItem.id === gItem.id);
            if (existing) {
              existing.cart_quantity = Number(existing.cart_quantity) + Number(gItem.cart_quantity);
            } else {
              merged.push({ ...gItem, cart_quantity: Number(gItem.cart_quantity) });
            }
          });

          setCart(merged);
          localStorage.removeItem(`product_cart_${getDeviceId()}`);
          localStorage.removeItem('product_cart'); // clear legacy

          // Sync merged cart to db
          try {
            await supabase
              .from('user_carts')
              .upsert({ 
                user_id: user.id, 
                items: merged, 
                save_for_later: dbSaveForLater, 
                updated_at: new Date().toISOString() 
              });
          } catch (dbErr) {
            console.error('CartContext: Error syncing merged cart to db:', dbErr);
          }
        } else {
          setCart(userCart);
        }
      } else {
        localStorage.removeItem('product_cart_active_user');
        const deviceCartStr = localStorage.getItem(`product_cart_${getDeviceId()}`);
        const deviceCart = (deviceCartStr ? JSON.parse(deviceCartStr) : []).map((item: any) => ({
          ...item,
          cart_quantity: Number(item.cart_quantity) || 1
        }));
        setCart(deviceCart);
      }

      // Keep track of the loaded user ID state to prevent sync race conditions
      setCartLoadedForUserId(currentUserId);
    };

    loadAndMerge();
  }, [user?.id, user?.is_anonymous]);

  // Sync cartRef & persistence
  useEffect(() => {
    const currentUserId = user && !user.is_anonymous ? user.id : undefined;
    // Skip sync if the loaded cart user ID doesn't match the current user ID
    if (cartLoadedForUserId !== currentUserId) {
      return;
    }

    cartRef.current = cart;

    const isAnonymous = !user || user.is_anonymous;
    const shouldSave = localStorage.getItem('saveForLater') === 'true';

    if (isAnonymous || shouldSave || !isSigningOutRef.current) {
      if (isSigningOutRef.current && cart.length === 0) {
        isSigningOutRef.current = false;
        return;
      }
      isSigningOutRef.current = false;

      // Save to the appropriate key locally
      localStorage.setItem(getCartKey(), JSON.stringify(cart));

      // Save to database if user is authenticated
      if (user && !user.is_anonymous) {
        const syncToDb = async () => {
          try {
            await supabase
              .from('user_carts')
              .upsert({ 
                user_id: user.id, 
                items: cart, 
                save_for_later: saveForLater,
                updated_at: new Date().toISOString() 
              });
          } catch (dbErr) {
            console.error('CartContext: Error persisting cart to db:', dbErr);
          }
        };
        syncToDb();
      }

    } else if (isSigningOutRef.current) {
      localStorage.removeItem(getCartKey());
      isSigningOutRef.current = false;
    }
  }, [cart, cartLoadedForUserId, user?.id, user?.is_anonymous, saveForLater]);

  useEffect(() => {
    localStorage.setItem('saveForLater', String(saveForLater));
  }, [saveForLater]);

  const addToCart = useCallback(async (product: Product) => {
    // Block completely unauthenticated users
    if (!user && !isAuthLoading) {
      toast.error('Please sign in or start as a guest to add items to your cart.', {
        duration: 4000,
        style: { background: '#fee2e2', color: '#991b1b', borderColor: '#fca5a5' },
      });
      navigateTo('auth');
      return;
    }

    const storeItem = storeRef.current.find(t => t.id === product.id);
    if (!storeItem || storeItem.quantity <= 0) return;

    try {
      await syncInventoryDecrement(product.id);
      toast.success('Item added to cart!', {
        duration: 2000,
        style: { background: '#dcfce7', color: '#065f46', borderColor: '#a7f3d0' },
      });
      setCart(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing) {
          return prev.map(item =>
            item.id === product.id ? { ...item, cart_quantity: item.cart_quantity + 1 } : item
          );
        }
        return [...prev, { ...product, cart_quantity: 1 }];
      });
      if (cart.length === 0) setIsCartOpen(true);
    } catch (error: any) {
      console.error('CartContext: Failed to add to cart:', error);
      toast.error(`System Error: ${error.message || 'Unable to add to cart'}`);
    }
  }, [cart.length, syncInventoryDecrement, storeRef, user, isAuthLoading, navigateTo]);

  const updateQuantity = useCallback(async (id: string, delta: number) => {
    if (!user && !isAuthLoading) {
      toast.error('Please sign in or start as a guest to modify your cart.', {
        duration: 4000,
        style: { background: '#fee2e2', color: '#991b1b', borderColor: '#fca5a5' },
      });
      navigateTo('auth');
      return;
    }

    const storeItem = storeRef.current.find(t => t.id === id);
    if (!storeItem) return;
    if (delta > 0 && storeItem.quantity <= 0) return;

    try {
      if (delta > 0) await syncInventoryDecrement(id);
      else await syncInventoryIncrement(id, Math.abs(delta));

      setCart(prev => prev.map(item =>
        item.id === id ? { ...item, cart_quantity: Math.max(1, item.cart_quantity + delta) } : item
      ));
      toast.success('Quantity updated!');
    } catch (error: any) {
      console.error('CartContext: Failed to update quantity:', error);
      toast.error(`Failed to update quantity: ${error.message || 'System error'}.`, {
        duration: 4000,
        style: { background: '#fee2e2', color: '#991b1b', borderColor: '#fca5a5' },
      });
    }
  }, [syncInventoryDecrement, syncInventoryIncrement, storeRef, user, isAuthLoading, navigateTo]);

  const removeFromCart = useCallback(async (id: string) => {
    const cartItem = cart.find(item => item.id === id);
    if (!cartItem) return;
    try {
      await syncInventoryIncrement(id, cartItem.cart_quantity);
      setCart(prev => prev.filter(item => item.id !== id));
      toast.success('Item removed from cart!');
    } catch (error: any) {
      console.error('CartContext: Failed to remove item:', error);
      toast.error(`Failed to remove item: ${error.message || 'System error'}.`, {
        duration: 4000,
        style: { background: '#fee2e2', color: '#991b1b', borderColor: '#fca5a5' },
      });
    }
  }, [cart, syncInventoryIncrement]);

  const emptyCart = useCallback(async () => {
    if (cartRef.current.length === 0) return;
    try {
      const updates = cartRef.current.map(item => ({
        id: item.id,
        quantity: item.cart_quantity
      }));

      const results = await Promise.allSettled(
        updates.map(u => syncInventoryIncrement(u.id, u.quantity))
      );

      const failures = results
        .map((r, i) => r.status === 'rejected' ? { update: updates[i], reason: r.reason } : null)
        .filter((f): f is { update: typeof updates[0], reason: any } => f !== null);

      if (failures.length > 0) {
        const failedIds = failures.map(f => f.update.id);
        
        // Remove the successful items from the cart, leaving only the failed ones
        setCart(prev => prev.filter(item => failedIds.includes(item.id)));
        
        const messages = failures.map(f => f.reason.message || f.reason).join(', ');
        toast.error(`Some items could not be returned to inventory: ${messages}. The remaining items were successfully cleared.`, {
          duration: 5000,
          style: { background: '#fee2e2', color: '#991b1b', borderColor: '#fca5a5' }
        });
      } else {
        setCart([]);
        localStorage.removeItem(getCartKey());
        localStorage.removeItem('product_cart');
        toast.success('Cart emptied!');
      }
    } catch (err: any) {
      console.error('CartContext: Failed to empty cart:', err);
      toast.error(`Failed to empty cart: ${err.message || 'System error'}.`, {
        duration: 5000,
        style: { background: '#fee2e2', color: '#991b1b', borderColor: '#fca5a5' }
      });
    }
  }, [syncInventoryIncrement, user?.id, user?.is_anonymous]);


  // Cart Inactivity logic from App.tsx
  useEffect(() => {
    const CART_TIMEOUT = appConfig.cartInactivityTimeoutMinutes * 60 * 1000;
    if (CART_TIMEOUT <= 0) return;

    const checkInactivity = () => {
      const lastActivityStr = localStorage.getItem('last_activity_timestamp');
      const lastActivity = lastActivityStr ? parseInt(lastActivityStr, 10) : Date.now();
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivity;

      if (!isCheckingOut.current && timeSinceLastActivity >= CART_TIMEOUT && cartRef.current.length > 0) {
        console.log(`CartContext: ${appConfig.cartInactivityTimeoutMinutes}m inactivity. Emptying cart.`);
        toast.warning(`Cart timeout! Emptying cart after ${appConfig.cartInactivityTimeoutMinutes} minutes.`);
        emptyCart();
      }
    };

    const interval = setInterval(checkInactivity, appConfig.inactivityCheckIntervalSeconds * 1000);
    return () => clearInterval(interval);
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem(getCartKey());
    localStorage.removeItem('product_cart');
  }, [user?.id, user?.is_anonymous]);

  const value = useMemo(() => ({
    cart,
    cartCount,
    isCartOpen,
    saveForLater,
    setIsCartOpen,
    setSaveForLater,
    addToCart,
    updateQuantity,
    removeFromCart,
    emptyCart,
    clearCart,
    isCheckingOut,
    setCart,
    isSigningOutRef
  }), [
    cart, cartCount, isCartOpen, saveForLater, setIsCartOpen, setSaveForLater,
    addToCart, updateQuantity, removeFromCart, emptyCart, clearCart, isCheckingOut, setCart, isSigningOutRef
  ]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );

}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
