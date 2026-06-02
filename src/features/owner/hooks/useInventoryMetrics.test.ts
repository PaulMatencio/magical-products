import { describe, it, expect } from 'vitest';

// Let's write unit tests for the helper math and logic inside the inventory calculation
interface RawProduct {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  category_id: string;
  created_at: string;
}

interface RawCategory {
  id: string;
  name: string;
}

function processInventoryData(products: RawProduct[], categories: RawCategory[], lowStockThreshold = 10) {
  const categoryMap = new Map<string, string>();
  categories.forEach(c => categoryMap.set(c.id, c.name));

  let totalProducts = 0;
  let totalInventoryValue = 0;
  let totalItemsCount = 0;
  let lowStockCount = 0;
  let outOfStockCount = 0;

  const catStats = new Map<string, { value: number; itemCount: number; productCount: number }>();
  const alerts: any[] = [];

  products.forEach(p => {
    totalProducts++;
    const qty = p.quantity || 0;
    const price = Number(p.price || 0);
    const value = price * qty;

    totalInventoryValue += value;
    totalItemsCount += qty;

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
        suggestedReorder: 50
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
        suggestedReorder: Math.max(20, 50 - qty)
      });
    }

    const existing = catStats.get(p.category_id) || { value: 0, itemCount: 0, productCount: 0 };
    catStats.set(p.category_id, {
      value: existing.value + value,
      itemCount: existing.itemCount + qty,
      productCount: existing.productCount + 1
    });
  });

  const categoryBreakdown = categories.map(c => {
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

  return {
    metrics: {
      totalProducts,
      totalInventoryValue: Math.round(totalInventoryValue * 100) / 100,
      totalItemsCount,
      lowStockCount,
      outOfStockCount
    },
    categoryBreakdown,
    alerts: alerts.sort((a, b) => a.quantity - b.quantity)
  };
}

describe('Business Owner Inventory Intelligence Math', () => {
  it('should calculate correct summary totals and stock counts', () => {
    const products: RawProduct[] = [
      { id: '1', name: 'Plush Bear', sku: 'PB-01', price: 20, quantity: 15, category_id: 'cat-toys', created_at: '' },
      { id: '2', name: 'Robot Kit', sku: 'RK-02', price: 50, quantity: 5, category_id: 'cat-toys', created_at: '' },
      { id: '3', name: 'Dryer Balls', sku: 'DB-03', price: 15, quantity: 0, category_id: 'cat-home', created_at: '' }
    ];

    const categories: RawCategory[] = [
      { id: 'cat-toys', name: 'Toys' },
      { id: 'cat-home', name: 'Home' }
    ];

    const result = processInventoryData(products, categories, 10);

    // Totals:
    // Product 1: Value = 20 * 15 = 300, Qty = 15, Status = OK
    // Product 2: Value = 50 * 5 = 250, Qty = 5, Status = Low Stock
    // Product 3: Value = 15 * 0 = 0, Qty = 0, Status = Out of Stock
    // Total Value = 550.00
    // Total Items = 20
    // Low Stock = 1
    // Out of Stock = 1
    expect(result.metrics.totalProducts).toBe(3);
    expect(result.metrics.totalInventoryValue).toBe(550);
    expect(result.metrics.totalItemsCount).toBe(20);
    expect(result.metrics.lowStockCount).toBe(1);
    expect(result.metrics.outOfStockCount).toBe(1);

    // Category Breakdown:
    // Toys Value = 300 + 250 = 550 (100% of value)
    // Home Value = 0 (0% of value)
    const toysBreakdown = result.categoryBreakdown.find(c => c.id === 'cat-toys')!;
    const homeBreakdown = result.categoryBreakdown.find(c => c.id === 'cat-home')!;

    expect(toysBreakdown.value).toBe(550);
    expect(toysBreakdown.percentageOfValue).toBe(100);
    expect(toysBreakdown.productCount).toBe(2);

    expect(homeBreakdown.value).toBe(0);
    expect(homeBreakdown.percentageOfValue).toBe(0);
    expect(homeBreakdown.productCount).toBe(1);

    // Alerts check:
    expect(result.alerts).toHaveLength(2);
    expect(result.alerts[0].status).toBe('out_of_stock');
    expect(result.alerts[1].status).toBe('low_stock');
  });
});
