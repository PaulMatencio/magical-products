import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../services/supabase';

export interface InventoryCoreMetrics {
  totalProducts: number;
  totalInventoryValue: number;
  totalItemsCount: number;
  lowStockCount: number;
  outOfStockCount: number;
}

export interface InventoryCategorySlice {
  id: string;
  name: string;
  value: number;
  itemCount: number;
  productCount: number;
  percentageOfValue: number;
}

export interface StockAlert {
  id: string;
  name: string;
  quantity: number;
  price: number;
  categoryName: string;
  status: 'out_of_stock' | 'low_stock';
  suggestedReorder: number;
  sku: string;
}

export interface InventoryData {
  metrics: InventoryCoreMetrics;
  categoryBreakdown: InventoryCategorySlice[];
  alerts: StockAlert[];
  recentAdditions: { id: string; name: string; quantity: number; price: number; created_at: string }[];
}

export function useInventoryMetrics(lowStockThreshold = 10) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<InventoryData | null>(null);

  const fetchInventoryData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Fetch products
      const { data: products, error: prodErr } = await supabase
        .from('products')
        .select('id, name, sku, price, quantity, category_id, created_at, in_stock')
        .order('created_at', { ascending: false });

      if (prodErr) throw new Error(prodErr.message);

      // 2. Fetch categories
      const { data: categories, error: catErr } = await supabase
        .from('categories')
        .select('id, name');

      if (catErr) throw new Error(catErr.message);

      const categoryMap = new Map<string, string>();
      (categories || []).forEach(c => categoryMap.set(c.id, c.name));

      // 3. Compute Metrics
      let totalProducts = 0;
      let totalInventoryValue = 0;
      let totalItemsCount = 0;
      let lowStockCount = 0;
      let outOfStockCount = 0;

      const catStats = new Map<string, { value: number; itemCount: number; productCount: number }>();
      const alerts: StockAlert[] = [];
      const recentAdditions: any[] = [];

      (products || []).forEach(p => {
        totalProducts++;
        const qty = p.quantity || 0;
        const price = Number(p.price || 0);
        const value = price * qty;

        totalInventoryValue += value;
        totalItemsCount += qty;

        // Alerts classification
        const catName = categoryMap.get(p.category_id) || 'Uncategorized';
        if (qty === 0) {
          outOfStockCount++;
          alerts.push({
            id: p.id,
            name: p.name,
            quantity: qty,
            price,
            categoryName: catName,
            status: 'out_of_stock',
            suggestedReorder: 50,
            sku: p.sku || 'N/A'
          });
        } else if (qty <= lowStockThreshold) {
          lowStockCount++;
          alerts.push({
            id: p.id,
            name: p.name,
            quantity: qty,
            price,
            categoryName: catName,
            status: 'low_stock',
            suggestedReorder: Math.max(20, 50 - qty),
            sku: p.sku || 'N/A'
          });
        }

        // Category breakdown aggregation
        const existing = catStats.get(p.category_id) || { value: 0, itemCount: 0, productCount: 0 };
        catStats.set(p.category_id, {
          value: existing.value + value,
          itemCount: existing.itemCount + qty,
          productCount: existing.productCount + 1
        });

        // Recent additions tracker (last 5 added)
        if (recentAdditions.length < 5) {
          recentAdditions.push({
            id: p.id,
            name: p.name,
            quantity: qty,
            price,
            created_at: p.created_at
          });
        }
      });

      // Format category breakdown slices
      const categoryBreakdown: InventoryCategorySlice[] = (categories || []).map(c => {
        const stats = catStats.get(c.id) || { value: 0, itemCount: 0, productCount: 0 };
        return {
          id: c.id,
          name: c.name,
          value: Math.round(stats.value * 100) / 100,
          itemCount: stats.itemCount,
          productCount: stats.productCount,
          percentageOfValue: totalInventoryValue > 0 ? Math.round((stats.value / totalInventoryValue) * 1000) / 10 : 0
        };
      }).sort((a, b) => b.value - a.value);

      setData({
        metrics: {
          totalProducts,
          totalInventoryValue: Math.round(totalInventoryValue * 100) / 100,
          totalItemsCount,
          lowStockCount,
          outOfStockCount
        },
        categoryBreakdown,
        alerts: alerts.sort((a, b) => a.quantity - b.quantity), // show out of stock first
        recentAdditions
      });
    } catch (err: any) {
      console.error('useInventoryMetrics error:', err);
      setError(err.message || 'Failed to fetch inventory intelligence');
    } finally {
      setIsLoading(false);
    }
  }, [lowStockThreshold]);

  useEffect(() => {
    fetchInventoryData();
  }, [fetchInventoryData]);

  return { isLoading, error, data, refetch: fetchInventoryData };
}
