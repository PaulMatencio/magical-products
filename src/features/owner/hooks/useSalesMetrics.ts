import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../../../services/supabase';

// ── Types ────────────────────────────────────────────────────────────────────

export type SalesPeriod = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';

export interface CoreMetrics {
  grossRevenue: number;
  netRevenue: number;
  orderCount: number;
  aov: number;
}

export interface TimeSlice {
  label: string;
  revenue: number;
  orders: number;
  aov: number;
}

export interface Comparison {
  label: string;
  metrics: CoreMetrics;
  revenueChange: number;
  ordersChange: number;
  aovChange: number;
}

export interface RankedItem {
  name: string;
  revenue: number;
  quantity: number;
  pct: number;
}

export interface CategorySlice {
  name: string;
  revenue: number;
  orders: number;
  pct: number;
}

export interface SalesData {
  current: CoreMetrics;
  comparisons: Comparison[];
  timeSeries: TimeSlice[];
  timeSeriesLabel: string;
  trend: TimeSlice[];
  trendLabel: string;
  topProducts: RankedItem[];
  categoryBreakdown: CategorySlice[];
}

// ── Date Helpers ─────────────────────────────────────────────────────────────

function startOfDay(d: Date): Date {
  const r = new Date(d);
  r.setHours(0, 0, 0, 0);
  return r;
}

function endOfDay(d: Date): Date {
  const r = new Date(d);
  r.setHours(23, 59, 59, 999);
  return r;
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function addMonths(d: Date, n: number): Date {
  const r = new Date(d);
  r.setMonth(r.getMonth() + n);
  return r;
}

function startOfWeek(d: Date): Date {
  const r = startOfDay(new Date(d));
  const day = r.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Monday = start
  r.setDate(r.getDate() + diff);
  return r;
}

function startOfMonth(d: Date): Date {
  const r = new Date(d);
  r.setDate(1);
  r.setHours(0, 0, 0, 0);
  return r;
}

function startOfQuarter(d: Date): Date {
  const r = new Date(d);
  const q = Math.floor(r.getMonth() / 3);
  r.setMonth(q * 3);
  r.setDate(1);
  r.setHours(0, 0, 0, 0);
  return r;
}

function startOfYear(d: Date): Date {
  const r = new Date(d);
  r.setMonth(0);
  r.setDate(1);
  r.setHours(0, 0, 0, 0);
  return r;
}

function formatShortDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

function formatMonthYear(d: Date): string {
  return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// ── Metric Computation ───────────────────────────────────────────────────────

const VALID_STATUSES = ['pending', 'accepted', 'ready', 'shipped', 'delivered'];

interface RawOrder {
  id: string;
  created_at: string;
  total_price: number;
  status: string;
  items: any[];
}

function computeMetrics(orders: RawOrder[]): CoreMetrics {
  let gross = 0;
  let net = 0;
  for (const o of orders) {
    const items = o.items || [];
    for (const item of items) {
      const qty = item.cart_quantity ?? item.quantity ?? 1;
      const price = Number(item.price || 0);
      const disc = Number(item.discount_percentage || 0);
      gross += price * qty;
      net += price * (1 - disc / 100) * qty;
    }
  }
  const count = orders.length;
  return {
    grossRevenue: Math.round(gross * 100) / 100,
    netRevenue: Math.round(net * 100) / 100,
    orderCount: count,
    aov: count > 0 ? Math.round((net / count) * 100) / 100 : 0,
  };
}

function pctChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

function filterByRange(orders: RawOrder[], from: Date, to: Date): RawOrder[] {
  const fromMs = from.getTime();
  const toMs = to.getTime();
  return orders.filter(o => {
    const t = new Date(o.created_at).getTime();
    return t >= fromMs && t <= toMs;
  });
}

// ── Product & Category Breakdown ─────────────────────────────────────────────

function computeProductBreakdown(orders: RawOrder[]): RankedItem[] {
  const map = new Map<string, { revenue: number; quantity: number }>();
  for (const o of orders) {
    for (const item of (o.items || [])) {
      const name = item.name || 'Unknown';
      const qty = item.cart_quantity ?? item.quantity ?? 1;
      const price = Number(item.price || 0);
      const disc = Number(item.discount_percentage || 0);
      const rev = price * (1 - disc / 100) * qty;
      const existing = map.get(name) || { revenue: 0, quantity: 0 };
      map.set(name, { revenue: existing.revenue + rev, quantity: existing.quantity + qty });
    }
  }
  const total = Array.from(map.values()).reduce((s, v) => s + v.revenue, 0);
  return Array.from(map.entries())
    .map(([name, v]) => ({
      name,
      revenue: Math.round(v.revenue * 100) / 100,
      quantity: v.quantity,
      pct: total > 0 ? Math.round((v.revenue / total) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);
}

function computeCategoryBreakdown(
  orders: RawOrder[],
  productCategoryMap: Map<string, string>
): CategorySlice[] {
  const map = new Map<string, { revenue: number; orderIds: Set<string> }>();
  for (const o of orders) {
    for (const item of (o.items || [])) {
      const catName = productCategoryMap.get(item.id) || 'Uncategorized';
      const qty = item.cart_quantity ?? item.quantity ?? 1;
      const price = Number(item.price || 0);
      const disc = Number(item.discount_percentage || 0);
      const rev = price * (1 - disc / 100) * qty;
      const existing = map.get(catName) || { revenue: 0, orderIds: new Set() };
      existing.revenue += rev;
      existing.orderIds.add(o.id);
      map.set(catName, existing);
    }
  }
  const total = Array.from(map.values()).reduce((s, v) => s + v.revenue, 0);
  return Array.from(map.entries())
    .map(([name, v]) => ({
      name,
      revenue: Math.round(v.revenue * 100) / 100,
      orders: v.orderIds.size,
      pct: total > 0 ? Math.round((v.revenue / total) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.revenue - a.revenue);
}

// ── Period-specific Computations ─────────────────────────────────────────────

function computeDaily(orders: RawOrder[], productCategoryMap: Map<string, string>): SalesData {
  const now = new Date();
  const todayStart = startOfDay(now);
  const todayEnd = endOfDay(now);
  const yesterdayStart = startOfDay(addDays(now, -1));
  const yesterdayEnd = endOfDay(addDays(now, -1));
  const sameLastWeekStart = startOfDay(addDays(now, -7));
  const sameLastWeekEnd = endOfDay(addDays(now, -7));
  const sameLastMonthStart = startOfDay(addMonths(now, -1));
  const sameLastMonthEnd = endOfDay(addMonths(now, -1));

  const todayOrders = filterByRange(orders, todayStart, todayEnd);
  const yesterdayOrders = filterByRange(orders, yesterdayStart, yesterdayEnd);
  const lastWeekOrders = filterByRange(orders, sameLastWeekStart, sameLastWeekEnd);
  const lastMonthOrders = filterByRange(orders, sameLastMonthStart, sameLastMonthEnd);

  const current = computeMetrics(todayOrders);
  const prevMetrics = computeMetrics(yesterdayOrders);
  const lwMetrics = computeMetrics(lastWeekOrders);
  const lmMetrics = computeMetrics(lastMonthOrders);

  // Hourly breakdown
  const hourly: TimeSlice[] = Array.from({ length: 24 }, (_, h) => {
    const hourOrders = todayOrders.filter(o => new Date(o.created_at).getHours() === h);
    const m = computeMetrics(hourOrders);
    return { label: `${h.toString().padStart(2, '0')}:00`, revenue: m.netRevenue, orders: m.orderCount, aov: m.aov };
  });

  return {
    current,
    comparisons: [
      {
        label: 'vs Yesterday',
        metrics: prevMetrics,
        revenueChange: pctChange(current.netRevenue, prevMetrics.netRevenue),
        ordersChange: pctChange(current.orderCount, prevMetrics.orderCount),
        aovChange: pctChange(current.aov, prevMetrics.aov),
      },
      {
        label: 'vs Same day last week',
        metrics: lwMetrics,
        revenueChange: pctChange(current.netRevenue, lwMetrics.netRevenue),
        ordersChange: pctChange(current.orderCount, lwMetrics.orderCount),
        aovChange: pctChange(current.aov, lwMetrics.aov),
      },
      {
        label: 'vs Same day last month',
        metrics: lmMetrics,
        revenueChange: pctChange(current.netRevenue, lmMetrics.netRevenue),
        ordersChange: pctChange(current.orderCount, lmMetrics.orderCount),
        aovChange: pctChange(current.aov, lmMetrics.aov),
      },
    ],
    timeSeries: hourly,
    timeSeriesLabel: 'Orders by Hour (Today)',
    trend: [], // No trend for daily
    trendLabel: '',
    topProducts: computeProductBreakdown(todayOrders),
    categoryBreakdown: computeCategoryBreakdown(todayOrders, productCategoryMap),
  };
}

function computeWeekly(orders: RawOrder[], productCategoryMap: Map<string, string>): SalesData {
  const now = new Date();
  const thisWeekStart = startOfWeek(now);
  const thisWeekEnd = endOfDay(now);
  const lastWeekStart = addDays(thisWeekStart, -7);
  const lastWeekEnd = addDays(thisWeekStart, -1);

  const thisWeekOrders = filterByRange(orders, thisWeekStart, thisWeekEnd);
  const lastWeekOrders = filterByRange(orders, lastWeekStart, endOfDay(lastWeekEnd));

  const current = computeMetrics(thisWeekOrders);
  const prevMetrics = computeMetrics(lastWeekOrders);

  // Daily breakdown of this week
  const dailyBreakdown: TimeSlice[] = Array.from({ length: 7 }, (_, i) => {
    const dayStart = startOfDay(addDays(thisWeekStart, i));
    const dayEnd = endOfDay(dayStart);
    const dayOrders = filterByRange(orders, dayStart, dayEnd);
    const m = computeMetrics(dayOrders);
    return { label: DAY_NAMES[i], revenue: m.netRevenue, orders: m.orderCount, aov: m.aov };
  });

  // Weekly trend (last 4 weeks)
  const trend: TimeSlice[] = Array.from({ length: 4 }, (_, i) => {
    const weekIdx = 3 - i; // oldest first
    const wStart = addDays(thisWeekStart, -(weekIdx * 7));
    const wEnd = weekIdx === 0 ? thisWeekEnd : endOfDay(addDays(wStart, 6));
    const wOrders = filterByRange(orders, wStart, wEnd);
    const m = computeMetrics(wOrders);
    const label = `W${formatShortDate(wStart)}`;
    return { label, revenue: m.netRevenue, orders: m.orderCount, aov: m.aov };
  });

  return {
    current,
    comparisons: [
      {
        label: 'vs Previous week',
        metrics: prevMetrics,
        revenueChange: pctChange(current.netRevenue, prevMetrics.netRevenue),
        ordersChange: pctChange(current.orderCount, prevMetrics.orderCount),
        aovChange: pctChange(current.aov, prevMetrics.aov),
      },
    ],
    timeSeries: dailyBreakdown,
    timeSeriesLabel: 'Daily Breakdown (This Week)',
    trend,
    trendLabel: 'Weekly Trends (Last 4 Weeks)',
    topProducts: computeProductBreakdown(thisWeekOrders),
    categoryBreakdown: computeCategoryBreakdown(thisWeekOrders, productCategoryMap),
  };
}

function computeMonthly(orders: RawOrder[], productCategoryMap: Map<string, string>): SalesData {
  const now = new Date();
  const thisMonthStart = startOfMonth(now);
  const thisMonthEnd = endOfDay(now);
  const sameMonthLastYear = new Date(now.getFullYear() - 1, now.getMonth(), 1);
  const sameMonthLastYearEnd = endOfDay(new Date(now.getFullYear() - 1, now.getMonth() + 1, 0));

  const thisMonthOrders = filterByRange(orders, thisMonthStart, thisMonthEnd);
  const lastYearOrders = filterByRange(orders, sameMonthLastYear, sameMonthLastYearEnd);

  const current = computeMetrics(thisMonthOrders);
  const lyMetrics = computeMetrics(lastYearOrders);

  // Weekly breakdown of this month
  const weeklyBreakdown: TimeSlice[] = [];
  let wStart = new Date(thisMonthStart);
  let weekNum = 1;
  while (wStart < thisMonthEnd) {
    const wEnd = endOfDay(addDays(wStart, 6) < thisMonthEnd ? addDays(wStart, 6) : new Date(thisMonthEnd));
    const wOrders = filterByRange(orders, wStart, wEnd);
    const m = computeMetrics(wOrders);
    weeklyBreakdown.push({ label: `W${weekNum}`, revenue: m.netRevenue, orders: m.orderCount, aov: m.aov });
    wStart = addDays(wStart, 7);
    weekNum++;
  }

  // Monthly trend (last 6 months, oldest first)
  const trend: TimeSlice[] = Array.from({ length: 6 }, (_, i) => {
    const monthIdx = 5 - i; // oldest first
    const mStart = startOfMonth(addMonths(now, -monthIdx));
    const mEnd = monthIdx === 0 ? thisMonthEnd : endOfDay(new Date(mStart.getFullYear(), mStart.getMonth() + 1, 0));
    const mOrders = filterByRange(orders, mStart, mEnd);
    const m = computeMetrics(mOrders);
    return { label: formatMonthYear(mStart), revenue: m.netRevenue, orders: m.orderCount, aov: m.aov };
  });

  return {
    current,
    comparisons: [
      {
        label: `vs ${formatMonthYear(sameMonthLastYear)}`,
        metrics: lyMetrics,
        revenueChange: pctChange(current.netRevenue, lyMetrics.netRevenue),
        ordersChange: pctChange(current.orderCount, lyMetrics.orderCount),
        aovChange: pctChange(current.aov, lyMetrics.aov),
      },
    ],
    timeSeries: weeklyBreakdown,
    timeSeriesLabel: 'Weekly Breakdown (This Month)',
    trend,
    trendLabel: 'Monthly Trends (Last 6 Months)',
    topProducts: computeProductBreakdown(thisMonthOrders),
    categoryBreakdown: computeCategoryBreakdown(thisMonthOrders, productCategoryMap),
  };
}

function computeQuarterly(orders: RawOrder[], productCategoryMap: Map<string, string>): SalesData {
  const now = new Date();
  const thisQuarterStart = startOfQuarter(now);
  const thisQuarterEnd = endOfDay(now);
  const prevQuarterStart = addMonths(thisQuarterStart, -3);
  const prevQuarterEnd = endOfDay(addDays(thisQuarterStart, -1));

  const thisQuarterOrders = filterByRange(orders, thisQuarterStart, thisQuarterEnd);
  const prevQuarterOrders = filterByRange(orders, prevQuarterStart, prevQuarterEnd);

  const current = computeMetrics(thisQuarterOrders);
  const prevMetrics = computeMetrics(prevQuarterOrders);

  // Monthly breakdown of this quarter
  const monthlyBreakdown: TimeSlice[] = Array.from({ length: 3 }, (_, i) => {
    const mStart = startOfMonth(addMonths(thisQuarterStart, i));
    const mEnd = endOfDay(new Date(mStart.getFullYear(), mStart.getMonth() + 1, 0));
    const mOrders = filterByRange(orders, mStart, mStart > thisQuarterEnd ? thisQuarterEnd : mEnd);
    const m = computeMetrics(mOrders);
    return {
      label: mStart.toLocaleDateString('en-US', { month: 'short' }),
      revenue: m.netRevenue,
      orders: m.orderCount,
      aov: m.aov
    };
  });

  // Quarterly trend (last 4 quarters, oldest first)
  const trend: TimeSlice[] = Array.from({ length: 4 }, (_, i) => {
    const qIdx = 3 - i;
    const qStart = startOfQuarter(addMonths(thisQuarterStart, -(qIdx * 3)));
    const qEnd = qIdx === 0 ? thisQuarterEnd : endOfDay(new Date(qStart.getFullYear(), qStart.getMonth() + 3, 0));
    const qOrders = filterByRange(orders, qStart, qEnd);
    const m = computeMetrics(qOrders);
    const qLabel = `Q${Math.floor(qStart.getMonth() / 3) + 1} ${qStart.getFullYear()}`;
    return { label: qLabel, revenue: m.netRevenue, orders: m.orderCount, aov: m.aov };
  });

  return {
    current,
    comparisons: [
      {
        label: 'vs Previous Quarter',
        metrics: prevMetrics,
        revenueChange: pctChange(current.netRevenue, prevMetrics.netRevenue),
        ordersChange: pctChange(current.orderCount, prevMetrics.orderCount),
        aovChange: pctChange(current.aov, prevMetrics.aov),
      },
    ],
    timeSeries: monthlyBreakdown,
    timeSeriesLabel: 'Monthly Breakdown (This Quarter)',
    trend,
    trendLabel: 'Quarterly Trends (Last 4 Quarters)',
    topProducts: computeProductBreakdown(thisQuarterOrders),
    categoryBreakdown: computeCategoryBreakdown(thisQuarterOrders, productCategoryMap),
  };
}

function computeYearly(orders: RawOrder[], productCategoryMap: Map<string, string>): SalesData {
  const now = new Date();
  const thisYearStart = startOfYear(now);
  const thisYearEnd = endOfDay(now);
  const prevYearStart = startOfYear(new Date(now.getFullYear() - 1, 0, 1));
  const prevYearEnd = endOfDay(new Date(now.getFullYear() - 1, 11, 31));

  const thisYearOrders = filterByRange(orders, thisYearStart, thisYearEnd);
  const prevYearOrders = filterByRange(orders, prevYearStart, prevYearEnd);

  const current = computeMetrics(thisYearOrders);
  const prevMetrics = computeMetrics(prevYearOrders);

  // Monthly breakdown of this year (Jan to Dec)
  const monthlyBreakdown: TimeSlice[] = Array.from({ length: 12 }, (_, i) => {
    const mStart = new Date(thisYearStart.getFullYear(), i, 1);
    const mEnd = endOfDay(new Date(thisYearStart.getFullYear(), i + 1, 0));
    const mOrders = filterByRange(orders, mStart, mStart > thisYearEnd ? thisYearEnd : mEnd);
    const m = computeMetrics(mOrders);
    return {
      label: mStart.toLocaleDateString('en-US', { month: 'short' }),
      revenue: m.netRevenue,
      orders: m.orderCount,
      aov: m.aov
    };
  });

  // Yearly trend (last 3 years, oldest first)
  const trend: TimeSlice[] = Array.from({ length: 3 }, (_, i) => {
    const yIdx = 2 - i;
    const yStart = startOfYear(new Date(now.getFullYear() - yIdx, 0, 1));
    const yEnd = yIdx === 0 ? thisYearEnd : endOfDay(new Date(yStart.getFullYear(), 11, 31));
    const yOrders = filterByRange(orders, yStart, yEnd);
    const m = computeMetrics(yOrders);
    return { label: `${yStart.getFullYear()}`, revenue: m.netRevenue, orders: m.orderCount, aov: m.aov };
  });

  return {
    current,
    comparisons: [
      {
        label: 'vs Previous Year',
        metrics: prevMetrics,
        revenueChange: pctChange(current.netRevenue, prevMetrics.netRevenue),
        ordersChange: pctChange(current.orderCount, prevMetrics.orderCount),
        aovChange: pctChange(current.aov, prevMetrics.aov),
      },
    ],
    timeSeries: monthlyBreakdown,
    timeSeriesLabel: 'Monthly Breakdown (This Year)',
    trend,
    trendLabel: 'Yearly Trends (Last 3 Years)',
    topProducts: computeProductBreakdown(thisYearOrders),
    categoryBreakdown: computeCategoryBreakdown(thisYearOrders, productCategoryMap),
  };
}

// ── Main Hook ────────────────────────────────────────────────────────────────

export function useSalesMetrics(period: SalesPeriod) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allOrders, setAllOrders] = useState<RawOrder[]>([]);
  const [productCategoryMap, setProductCategoryMap] = useState<Map<string, string>>(new Map());
  const [hasFetched, setHasFetched] = useState(false);

  // Fetch all data once
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch orders from last 25 months (for previous year comparison)
      const cutoff = addMonths(new Date(), -25);

      const { data: orders, error: ordersErr } = await supabase
        .from('orders')
        .select('id, created_at, total_price, status, items')
        .in('status', VALID_STATUSES)
        .gte('created_at', cutoff.toISOString())
        .order('created_at', { ascending: false });

      if (ordersErr) throw new Error(ordersErr.message);

      // Fetch product→category mapping
      const { data: products, error: prodErr } = await supabase
        .from('products')
        .select('id, category_id');

      const { data: categories, error: catErr } = await supabase
        .from('categories')
        .select('id, name');

      if (prodErr) console.warn('Could not load products for category mapping:', prodErr);
      if (catErr) console.warn('Could not load categories:', catErr);

      // Build productId→categoryName map
      const catNameMap = new Map<string, string>();
      (categories || []).forEach(c => catNameMap.set(c.id, c.name));

      const pcMap = new Map<string, string>();
      (products || []).forEach(p => {
        pcMap.set(p.id, catNameMap.get(p.category_id) || 'Uncategorized');
      });

      setAllOrders(orders || []);
      setProductCategoryMap(pcMap);
      setHasFetched(true);
    } catch (err: any) {
      console.error('useSalesMetrics: fetch error:', err);
      setError(err.message || 'Failed to load sales data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Compute metrics based on period
  const data = useMemo<SalesData | null>(() => {
    if (!hasFetched || allOrders.length === 0) return null;
    switch (period) {
      case 'daily': return computeDaily(allOrders, productCategoryMap);
      case 'weekly': return computeWeekly(allOrders, productCategoryMap);
      case 'monthly': return computeMonthly(allOrders, productCategoryMap);
      case 'quarterly': return computeQuarterly(allOrders, productCategoryMap);
      case 'yearly': return computeYearly(allOrders, productCategoryMap);
    }
  }, [period, allOrders, productCategoryMap, hasFetched]);

  return { isLoading, error, data, refetch: fetchData };
}
