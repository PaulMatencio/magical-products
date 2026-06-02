import { describe, it, expect } from 'vitest';

interface RawProduct {
  id: string;
  price: number;
  quantity: number;
}

interface RawOrder {
  id: string;
  created_at: string;
  total_price: number;
  items: { price: number; discount_percentage?: number; cart_quantity?: number; quantity?: number }[];
}

function processExecutiveData(products: RawProduct[], orders: RawOrder[], totalSessions: number) {
  let totalRevenue = 0;
  let totalOrders = orders.length;

  orders.forEach(o => {
    const items = o.items || [];
    items.forEach(item => {
      const qty = item.cart_quantity ?? item.quantity ?? 1;
      const price = Number(item.price || 0);
      const disc = Number(item.discount_percentage || 0);
      totalRevenue += price * (1 - disc / 100) * qty;
    });
  });

  const aov = totalOrders > 0 ? Math.round((totalRevenue / totalOrders) * 100) / 100 : 0;

  let catalogSize = products.length;
  let inventoryValuation = 0;
  let lowStockCount = 0;
  let outOfStockCount = 0;

  products.forEach(p => {
    const qty = p.quantity || 0;
    inventoryValuation += Number(p.price || 0) * qty;
    if (qty === 0) {
      outOfStockCount++;
    } else if (qty <= 10) {
      lowStockCount++;
    }
  });

  const conversionRate = totalSessions > 0 ? Math.round((totalOrders / totalSessions) * 1000) / 10 : 0;

  const criticalAlerts: any[] = [];
  if (outOfStockCount > 0) {
    criticalAlerts.push({ type: 'stock', severity: 'high' });
  }
  if (lowStockCount > 0) {
    criticalAlerts.push({ type: 'stock', severity: 'medium' });
  }

  return {
    metrics: {
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      totalOrders,
      aov,
      totalSessions,
      conversionRate,
      catalogSize,
      inventoryValuation: Math.round(inventoryValuation * 100) / 100,
      criticalAlertsCount: criticalAlerts.length
    }
  };
}

describe('Business Owner Executive Metrics Math', () => {
  it('should compute combined global dashboard metrics correctly', () => {
    const products: RawProduct[] = [
      { id: 'p1', price: 10, quantity: 20 }, // value = 200
      { id: 'p2', price: 25, quantity: 0 },  // value = 0, out of stock
      { id: 'p3', price: 100, quantity: 3 }  // value = 300, low stock
    ];

    const orders: RawOrder[] = [
      { 
        id: 'ord1', 
        created_at: '', 
        total_price: 150, 
        items: [
          { price: 50, discount_percentage: 10, cart_quantity: 2 }, // 45 * 2 = 90
          { price: 60, discount_percentage: 0, cart_quantity: 1 }   // 60 * 1 = 60
        ] // revenue = 150
      }
    ];

    const totalSessions = 50;

    const result = processExecutiveData(products, orders, totalSessions);

    // Assertions:
    // Revenue: 150
    // Orders count: 1
    // AOV: 150
    // Sessions: 50
    // Conversion: 1 / 50 = 2%
    // Catalog size: 3
    // Valuation: 500
    // Alerts: 2 (1 out of stock, 1 low stock)
    expect(result.metrics.totalRevenue).toBe(150);
    expect(result.metrics.totalOrders).toBe(1);
    expect(result.metrics.aov).toBe(150);
    expect(result.metrics.conversionRate).toBe(2);
    expect(result.metrics.catalogSize).toBe(3);
    expect(result.metrics.inventoryValuation).toBe(500);
    expect(result.metrics.criticalAlertsCount).toBe(2);
  });
});
