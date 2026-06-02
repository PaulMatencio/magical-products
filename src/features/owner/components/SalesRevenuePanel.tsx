import React, { useState } from 'react';
import { useSalesMetrics, SalesPeriod, SalesData } from '../hooks/useSalesMetrics';
import { 
  TrendingUp, TrendingDown, DollarSign, ShoppingBag, 
  Percent, ArrowRight, Loader2, Calendar, RefreshCw 
} from 'lucide-react';
import { motion } from 'motion/react';

interface SalesRevenuePanelProps {
  period: SalesPeriod;
}

export function SalesRevenuePanel({ period }: SalesRevenuePanelProps) {
  const { isLoading, error, data, refetch } = useSalesMetrics(period);
  const [hoveredSlice, setHoveredSlice] = useState<any | null>(null);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <Loader2 className="w-10 h-10 text-violet-500 animate-spin" />
        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest animate-pulse">
          Computing Sales Intelligence...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/50 rounded-2xl">
        <h4 className="text-lg font-black text-rose-800 dark:text-rose-400">Failed to load sales intelligence</h4>
        <p className="text-sm text-rose-600 dark:text-rose-500 mt-2">{error}</p>
        <button
          onClick={refetch}
          className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-rose-700 transition-all active:scale-95"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-12 text-center bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl">
        <h4 className="text-lg font-black text-gray-700 dark:text-slate-400">No Sales Recorded</h4>
        <p className="text-sm text-gray-500 mt-2">There is no transaction history available for the selected period.</p>
      </div>
    );
  }

  const { current, comparisons, timeSeries, timeSeriesLabel, trend, trendLabel, topProducts, categoryBreakdown } = data;

  // Formatting helpers
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatPercent = (val: number) => {
    const sign = val > 0 ? '+' : '';
    return `${sign}${val}%`;
  };

  // Safe max values for scaling SVG charts
  const maxRevenue = Math.max(...timeSeries.map(s => s.revenue), 10);
  const maxOrders = Math.max(...timeSeries.map(s => s.orders), 1);

  const maxTrendRevenue = trend.length > 0 ? Math.max(...trend.map(s => s.revenue), 10) : 10;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Sync Button & Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-slate-500">
          <Calendar className="w-3.5 h-3.5" />
          <span>Report Period: <strong className="text-gray-600 dark:text-slate-400 capitalize">{period}</strong></span>
        </div>
        <button 
          onClick={refetch}
          className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-600 dark:text-slate-400 text-xs font-bold rounded-lg transition-all active:scale-95"
        >
          <RefreshCw className="w-3 h-3" />
          Refresh
        </button>
      </div>

      {/* ── 1. Core KPIs Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Gross Revenue */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-[1rem] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Gross Revenue</span>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
              <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white leading-none">
            {formatCurrency(current.grossRevenue)}
          </h3>
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-2 font-bold uppercase tracking-wide">
            Total checkout volume before discount
          </p>
        </div>

        {/* Net Revenue */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-[1rem] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Net Revenue</span>
            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl">
              <DollarSign className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white leading-none">
            {formatCurrency(current.netRevenue)}
          </h3>
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-2 font-bold uppercase tracking-wide">
            Actual earnings after product discounts
          </p>
        </div>

        {/* Total Orders */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-[1rem] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Total Orders</span>
            <div className="p-2 bg-violet-50 dark:bg-violet-500/10 rounded-xl">
              <ShoppingBag className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white leading-none">
            {current.orderCount}
          </h3>
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-2 font-bold uppercase tracking-wide">
            Number of successful orders
          </p>
        </div>

        {/* Average Order Value */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-[1rem] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Avg Order Value (AOV)</span>
            <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-xl">
              <Percent className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white leading-none">
            {formatCurrency(current.aov)}
          </h3>
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-2 font-bold uppercase tracking-wide">
            Average transaction amount (net)
          </p>
        </div>
      </div>

      {/* ── 2. Comparisons Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {comparisons.map((comp, idx) => {
          const revPositive = comp.revenueChange >= 0;
          return (
            <div key={idx} className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-[1rem] p-5 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-wider block mb-3">
                  {comp.label}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-black uppercase ${
                  revPositive 
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                }`}>
                  {revPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {formatPercent(comp.revenueChange)}
                </span>
              </div>
              <div className="space-y-2 mt-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-gray-400 dark:text-slate-500">Previous Revenue:</span>
                  <span className="font-black text-gray-700 dark:text-slate-300">{formatCurrency(comp.metrics.netRevenue)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-gray-400 dark:text-slate-500">Previous Orders:</span>
                  <span className="font-black text-gray-700 dark:text-slate-300">
                    {comp.metrics.orderCount}{' '}
                    <span className={`text-[9px] font-bold ${comp.ordersChange >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      ({formatPercent(comp.ordersChange)})
                    </span>
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-gray-400 dark:text-slate-500">Previous AOV:</span>
                  <span className="font-black text-gray-700 dark:text-slate-300">
                    {formatCurrency(comp.metrics.aov)}{' '}
                    <span className={`text-[9px] font-bold ${comp.aovChange >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      ({formatPercent(comp.aovChange)})
                    </span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 3. Chart Section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main TimeSeries Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-[1rem] p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">
                {timeSeriesLabel}
              </h4>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
                Hover over bars to inspect revenue breakdown
              </p>
            </div>
            {hoveredSlice && (
              <div className="text-right">
                <span className="text-[10px] font-black text-violet-500 uppercase tracking-widest block leading-none">
                  {hoveredSlice.label}
                </span>
                <span className="text-sm font-black text-gray-900 dark:text-white mt-1 block">
                  {formatCurrency(hoveredSlice.revenue)} | {hoveredSlice.orders} {hoveredSlice.orders === 1 ? 'order' : 'orders'}
                </span>
              </div>
            )}
          </div>

          {/* SVG Custom Premium Chart */}
          <div className="relative h-64 w-full flex items-end">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#c084fc" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {timeSeries.map((slice, idx) => {
                const step = 100 / timeSeries.length;
                const barWidth = step * 0.7;
                const x = idx * step + step * 0.15;
                const barHeight = maxRevenue > 0 ? (slice.revenue / maxRevenue) * 80 : 0;
                const y = 90 - barHeight;

                return (
                  <rect
                    key={idx}
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill="url(#barGrad)"
                    rx="1"
                    className="cursor-pointer hover:fill-violet-400 transition-all duration-200"
                    onMouseEnter={() => setHoveredSlice(slice)}
                    onMouseLeave={() => setHoveredSlice(null)}
                  />
                );
              })}
              {/* Baseline */}
              <line x1="0" y1="90" x2="100" y2="90" stroke="#e2e8f0" strokeWidth="0.5" className="dark:stroke-slate-800" />
            </svg>
          </div>

          {/* X Axis Labels */}
          <div className="flex justify-between mt-3 text-[9px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-wider px-2">
            {timeSeries.filter((_, i) => {
              if (period === 'daily') return i % 4 === 0;
              return true;
            }).map((slice, idx) => (
              <span key={idx}>{slice.label}</span>
            ))}
          </div>
        </div>

        {/* ── Trend / Secondary Chart ── */}
        <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-[1rem] p-6 shadow-sm">
          <div className="mb-6">
            <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">
              {trend.length > 0 ? trendLabel : 'Information'}
            </h4>
            <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
              {trend.length > 0 ? 'Performance trend comparison' : 'Trend data starts from subsequent cycles'}
            </p>
          </div>

          {trend.length > 0 ? (
            <div className="space-y-6">
              <div className="relative h-36 w-full flex items-end">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="100" y2="20" stroke="#f1f5f9" strokeWidth="0.5" className="dark:stroke-slate-900" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#f1f5f9" strokeWidth="0.5" className="dark:stroke-slate-900" />
                  <line x1="0" y1="80" x2="100" y2="80" stroke="#f1f5f9" strokeWidth="0.5" className="dark:stroke-slate-900" />

                  {/* Draw Sparkline Path */}
                  {(() => {
                    const step = 100 / (trend.length - 1);
                    const points = trend.map((slice, idx) => {
                      const x = idx * step;
                      const y = 90 - (maxTrendRevenue > 0 ? (slice.revenue / maxTrendRevenue) * 80 : 0);
                      return `${x},${y}`;
                    }).join(' ');
                    return (
                      <>
                        <polyline
                          fill="none"
                          stroke="#a78bfa"
                          strokeWidth="2.5"
                          points={points}
                        />
                        {/* Dots */}
                        {trend.map((slice, idx) => {
                          const x = idx * step;
                          const y = 90 - (maxTrendRevenue > 0 ? (slice.revenue / maxTrendRevenue) * 80 : 0);
                          return (
                            <circle
                              key={idx}
                              cx={x}
                              cy={y}
                              r="3"
                              className="fill-violet-600 dark:fill-violet-400 stroke-white dark:stroke-slate-950 stroke-2"
                            />
                          );
                        })}
                      </>
                    );
                  })()}
                </svg>
              </div>

              <div className="flex justify-between text-[9px] font-black text-gray-400 dark:text-slate-500 uppercase px-1">
                {trend.map((t, idx) => (
                  <span key={idx}>{t.label}</span>
                ))}
              </div>

              {/* Summary stat */}
              {trend.length > 1 && (
                <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 dark:text-slate-500">Period growth rate:</span>
                  {(() => {
                    const first = trend[0].revenue;
                    const last = trend[trend.length - 1].revenue;
                    const diff = first === 0 ? (last > 0 ? 100 : 0) : Math.round(((last - first) / first) * 100);
                    const isGrowth = diff >= 0;
                    return (
                      <span className={`text-xs font-black uppercase inline-flex items-center gap-1 ${
                        isGrowth ? 'text-emerald-500' : 'text-rose-500'
                      }`}>
                        {isGrowth ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        {formatPercent(diff)}
                      </span>
                    );
                  })()}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 border border-dashed border-gray-100 dark:border-white/5 rounded-xl">
              <span className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest text-center max-w-[200px]">
                Weekly trends are compiled when Daily report is closed
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── 4. Breakdown Grids (Products & Categories) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Products */}
        <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-[1rem] p-6 shadow-sm">
          <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-6">
            Revenue by Product (Top 10)
          </h4>
          {topProducts.length === 0 ? (
            <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider py-8 text-center">
              No products sold during this period.
            </p>
          ) : (
            <div className="space-y-4">
              {topProducts.map((prod, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-gray-700 dark:text-slate-300 truncate max-w-[240px]">
                      {idx + 1}. {prod.name}
                    </span>
                    <span className="font-black text-gray-900 dark:text-white shrink-0">
                      {formatCurrency(prod.revenue)}{' '}
                      <span className="text-[10px] text-gray-400 dark:text-slate-500 font-bold">
                        (x{prod.quantity})
                      </span>
                    </span>
                  </div>
                  {/* Share Progress bar */}
                  <div className="h-1.5 w-full bg-gray-50 dark:bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                      style={{ width: `${prod.pct}%` }}
                    />
                  </div>
                  <div className="flex justify-end text-[9px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                    {prod.pct}% revenue share
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category Breakdown */}
        <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-[1rem] p-6 shadow-sm">
          <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-6">
            Revenue by Category
          </h4>
          {categoryBreakdown.length === 0 ? (
            <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider py-8 text-center">
              No products mapped to categories.
            </p>
          ) : (
            <div className="space-y-4">
              {categoryBreakdown.map((cat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-gray-700 dark:text-slate-300 truncate">
                      {cat.name}
                    </span>
                    <span className="font-black text-gray-900 dark:text-white shrink-0">
                      {formatCurrency(cat.revenue)}{' '}
                      <span className="text-[10px] text-gray-400 dark:text-slate-500 font-bold">
                        ({cat.orders} {cat.orders === 1 ? 'order' : 'orders'})
                      </span>
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1.5 w-full bg-gray-50 dark:bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                      style={{ width: `${cat.pct}%` }}
                    />
                  </div>
                  <div className="flex justify-end text-[9px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                    {cat.pct}% revenue share
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
