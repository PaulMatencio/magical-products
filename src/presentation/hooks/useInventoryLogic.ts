import { useState, useRef, useCallback, useMemo } from 'react';
import { Product, Category, Brand } from '../../types/types';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { productRepository } from '../../infrastructure/repositories';
import appConfig from '../../config/appConfig';
import { LoadCatalogUseCase } from '../../application/use-cases/catalog/LoadCatalogUseCase';
import { UpdateStockUseCase } from '../../application/use-cases/catalog/UpdateStockUseCase';

/**
 * Custom hook for Inventory Logic.
 * This lives in the Presentation Layer (Interface Adapters).
 * It delegates complex logic to Application Use Cases,
 * and manages local state for the UI.
 */
export function useInventoryLogic(repo: IProductRepository = productRepository) {
  const [storeProducts, setStoreProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const isInitialized = useRef<boolean>(false);
  const hasRestored = useRef<boolean>(false);
  const isRestoring = useRef<boolean>(false);

  // Instantiate Use Cases
  const loadCatalogUseCase = useMemo(() => new LoadCatalogUseCase(repo), [repo]);
  const updateStockUseCase = useMemo(() => new UpdateStockUseCase(repo), [repo]);

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

  const updateProductQuantityLocally = useCallback((id: string, newQuantity: number, newInStock: boolean) => {
    setStoreProducts(prev => prev.map(t =>
      t.id === id ? { ...t, quantity: newQuantity, in_stock: newInStock } : t
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
    await updateStockUseCase.incrementStock(id, amount);
    const currentProduct = storeProducts.find(t => t.id === id);
    if (currentProduct) {
      updateProductQuantityLocally(id, currentProduct.quantity + amount, true);
    }
  }, [updateStockUseCase, storeProducts, updateProductQuantityLocally]);

  const syncMultipleInventoryUpdates = useCallback(async (updates: { id: string, newQuantity: number, newInStock: boolean }[]) => {
    await updateStockUseCase.batchUpdateStock(updates);

    setStoreProducts(prev => prev.map(t => {
      const update = updates.find(u => u.id === t.id);
      if (update) {
        return { ...t, quantity: update.newQuantity, in_stock: update.newInStock };
      }
      return t;
    }));
  }, [updateStockUseCase]);

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


