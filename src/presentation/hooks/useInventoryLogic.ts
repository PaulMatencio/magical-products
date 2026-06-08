import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { Product, Category, Brand } from '../../types/types';
import appConfig from '../../config/appConfig';
import { supabase } from '../../services/supabase';
import { useDependencies } from '../../context/DependenciesContext';

/**
 * Custom hook for Inventory Logic.
 * This lives in the Presentation Layer (Interface Adapters).
 * It delegates complex logic to Application Use Cases,
 * and manages local state for the UI.
 */
export function useInventoryLogic() {
  const { loadCatalogUseCase, updateStockUseCase } = useDependencies();
  const [storeProducts, setStoreProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const isInitialized = useRef<boolean>(false);
  const hasRestored = useRef<boolean>(false);
  const isRestoring = useRef<boolean>(false);

  const loadInventory = useCallback(async (isManualRefresh = false, onCartRestored?: () => void) => {
    if (hasRestored.current && !isManualRefresh) return;

    const timeoutId = setTimeout(() => {
      setFetchError('Connection timeout: Magic is taking too long to appear.');
      setIsLoading(false);
      setIsRefreshing(false);
    }, appConfig.connectionTimeoutSeconds * 1000);

    try {
      if (isManualRefresh) setIsRefreshing(true);
      else setIsLoading(true);

      setFetchError(null);

      const result = await loadCatalogUseCase.execute(() => {
        if (onCartRestored) onCartRestored();
        hasRestored.current = true;
      });

      clearTimeout(timeoutId);

      setStoreProducts(result.products);
      setCategories(result.categories);
      setBrands(result.brands);

      if (result.products.length === 0) {
        setFetchError('The inventory table is currently empty.');
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error('InventoryLogic: Initialization error:', err);
      setFetchError(`System error: ${err.message || 'Failed to sync with store'}`);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
      isInitialized.current = true;
    }
  }, [loadCatalogUseCase]);

  const updateProductQuantityLocally = useCallback((id: string, newQuantity: number, newInStock: boolean, extraUpdates?: Partial<Product>) => {
    setStoreProducts(prev => prev.map(t =>
      t.id === id ? { ...t, quantity: newQuantity, in_stock: newInStock, ...extraUpdates } : t
    ));
  }, []);

  const syncInventoryUpdate = useCallback(async (id: string, newQuantity: number, newInStock: boolean) => {
    await updateStockUseCase.setStock(id, newQuantity, newInStock);
    updateProductQuantityLocally(id, newQuantity, newInStock);
  }, [updateStockUseCase, updateProductQuantityLocally]);

  const syncInventoryDecrement = useCallback(async (id: string) => {
    await updateStockUseCase.decrementStock(id, 1);
    const currentProduct = storeProducts.find(t => t.id === id);
    if (currentProduct) {
      const newQty = Math.max(0, currentProduct.quantity - 1);
      updateProductQuantityLocally(id, newQty, newQty > 0);
    }
  }, [updateStockUseCase, storeProducts, updateProductQuantityLocally]);

  const syncInventoryIncrement = useCallback(async (id: string, amount: number) => {
    const currentProduct = storeProducts.find(t => t.id === id);
    const currentQty = currentProduct ? currentProduct.quantity : 0;
    const safeAmount = Math.max(0, Math.min(amount, 100 - currentQty));

    if (safeAmount > 0) {
      await updateStockUseCase.incrementStock(id, safeAmount);
    }
    if (currentProduct) {
      updateProductQuantityLocally(id, currentQty + safeAmount, true);
    }
  }, [updateStockUseCase, storeProducts, updateProductQuantityLocally]);

  const syncMultipleInventoryUpdates = useCallback(async (updates: { id: string, newQuantity: number, newInStock: boolean }[]) => {
    try {
      await updateStockUseCase.batchUpdateStock(updates);

      setStoreProducts(prev => prev.map(t => {
        const update = updates.find(u => u.id === t.id);
        if (update) {
          return { ...t, quantity: update.newQuantity, in_stock: update.newInStock };
        }
        return t;
      }));
    } catch (err: any) {
      const failedIds = err.failures ? err.failures.map((f: any) => f.update.id) : updates.map(u => u.id);
      const successfulUpdates = updates.filter(u => !failedIds.includes(u.id));

      setStoreProducts(prev => prev.map(t => {
        const update = successfulUpdates.find(u => u.id === t.id);
        if (update) {
          return { ...t, quantity: update.newQuantity, in_stock: update.newInStock };
        }
        return t;
      }));

      throw err;
    }
  }, [updateStockUseCase]);

  // Real-time subscription: keep categories and brands in sync when admin adds/edits/deletes one
  useEffect(() => {
    if (appConfig.databaseProvider !== 'supabase') return;

    const categoriesChannel = supabase
      .channel('categories-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'categories' },
        async () => {
          // Re-fetch the full categories list on any change
          try {
            const { data, error } = await supabase
              .from('categories')
              .select('*')
              .order('name', { ascending: true });
            if (!error && data) {
              setCategories(
                data.map((c: any) => ({
                  id: c.id,
                  name: c.name,
                  title: c.title,
                  code: c.code,
                  parentId: c.parent_id ?? undefined,
                  parent_id: c.parent_id ?? undefined,
                  path: c.path,
                  created_at: c.created_at,
                }))
              );
            }
          } catch (err) {
            console.error('useInventoryLogic: failed to refresh categories:', err);
          }
        }
      )
      .subscribe();

    const brandsChannel = supabase
      .channel('brands-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'brands' },
        async () => {
          // Re-fetch the full brands list on any change
          try {
            const { data, error } = await supabase
              .from('brands')
              .select('*')
              .order('name', { ascending: true });
            if (!error && data) {
              setBrands(
                data.map((b: any) => ({
                  id: b.id,
                  name: b.name,
                  slug: b.slug,
                  description: b.description,
                  logo_url: b.logo_url,
                  website: b.website,
                  email: b.email,
                  phone: b.phone,
                  address: b.address,
                  is_manufacturer: b.is_manufacturer,
                  is_active: b.is_active,
                  metadata: b.metadata,
                  created_at: b.created_at,
                  updated_at: b.updated_at,
                }))
              );
            }
          } catch (err) {
            console.error('useInventoryLogic: failed to refresh brands:', err);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(categoriesChannel);
      supabase.removeChannel(brandsChannel);
    };
  }, []);

  return useMemo(() => ({
    storeProducts,
    categories,
    brands,
    isLoading,
    isRefreshing,
    fetchError,
    isInitialized,
    isRestoring,
    loadInventory,
    updateProductQuantityLocally,
    syncInventoryUpdate,
    syncInventoryDecrement,
    syncInventoryIncrement,
    syncMultipleInventoryUpdates
  }), [
    storeProducts, categories, brands, isLoading, isRefreshing, fetchError,
    loadInventory, updateProductQuantityLocally, syncInventoryUpdate,
    syncInventoryDecrement, syncInventoryIncrement, syncMultipleInventoryUpdates
  ]);
}


