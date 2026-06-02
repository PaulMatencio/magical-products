import React, { useState } from 'react';
import { 
  DollarSign, ShoppingCart, Percent, Package, AlertTriangle, 
  ArrowUpRight, Users, Play, RefreshCw, BarChart2, ShieldCheck, Zap
} from 'lucide-react';
import { useExecutiveMetrics } from '../hooks/useExecutiveMetrics';
import { Button } from '../../../shared/ui';

interface ExecutivePanelProps {
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  onNavigateToTab: (tabId: any) => void;
}

export function ExecutivePanel({ period, onNavigateToTab }: ExecutivePanelProps) {
  const { isLoading, error, data, refetch } = useExecutiveMetrics(period);
  const [hoveredPoint, setHoveredPoint] = useState<any>(null);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 animate-pulse h-28" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
          <div className="lg:col-span-2 bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 h-96" />
          <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 h-96" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 text-center max-w-lg mx-auto mt-8">
        <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-4 animate-bounce" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Error Loading Executive Data</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">{error || 'An unexpected error occurred.'}</p>
        <Button onClick={refetch} leftIcon={<RefreshCw className="w-4 h-4" />}>Try Again</Button>
      </div>
    );
  }

  const { metrics, recentSales, criticalAlerts, combinedTimeline } = data;

  const chartHeight = 160;
  const paddingX = 40;
  const paddingY = 20;

  const maxRevenue = Math.max(...combinedTimeline.map(p => p.revenue), 10);
  const maxSessions = Math.max(...combinedTimeline.map(p => p.sessions), 1);

  return (
    <div className="space-y-6">
      
      {/* ── Summary Stats Sheet ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Revenue */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Total Sales</span>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
              <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              ${metrics.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 uppercase">
              {metrics.totalOrders} Completed Orders (AOV: ${metrics.aov})
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Metric 2: Conversion Rate */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Conversion Rate</span>
            <div className="p-2 bg-violet-50 dark:bg-violet-500/10 rounded-xl">
              <Percent className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{metrics.conversionRate}%</h3>
            <p className="text-[10px] font-bold text-violet-600 dark:text-violet-400 mt-1 uppercase">
              Across {metrics.totalSessions.toLocaleString()} unique visits
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Metric 3: Inventory Value */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Asset Value</span>
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
              <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              ${metrics.inventoryValuation.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h3>
            <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 mt-1 uppercase">
              Distributed over {metrics.catalogSize} SKUs
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Metric 4: System Alerts */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">System Health</span>
            <div className={`p-2 ${metrics.criticalAlertsCount > 0 ? 'bg-amber-50 dark:bg-amber-500/10' : 'bg-emerald-50 dark:bg-emerald-500/10'} rounded-xl`}>
              {metrics.criticalAlertsCount > 0 ? (
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 animate-pulse" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              )}
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              {metrics.criticalAlertsCount > 0 ? `${metrics.criticalAlertsCount} Alerts` : 'Optimal'}
            </h3>
            <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-1 uppercase">
              {metrics.criticalAlertsCount > 0 ? 'Review action ledger' : 'Security & databases verified'}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* ── Combined Sales and Sessions Chart ── */}
      <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-violet-50 dark:bg-violet-500/10 rounded-lg">
              <BarChart2 className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Sales & Sessions Combined Trend</h4>
              <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-0.5">Correlation between store traffic and net orders</p>
            </div>
          </div>

          <div className="flex gap-4 text-[10px] font-black uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-violet-500 rounded" />
              <span className="text-gray-600 dark:text-slate-400">Revenue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-blue-400 rounded-full" />
              <span className="text-gray-600 dark:text-slate-400">Traffic</span>
            </div>
          </div>
        </div>

        {/* Combined SVG Area */}
        <div className="relative">
          <svg 
            className="w-full overflow-visible" 
            height={chartHeight}
            viewBox={`0 0 ${combinedTimeline.length * 60 + paddingX * 2} ${chartHeight}`}
            preserveAspectRatio="none"
          >
            {/* Grid background */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
              const y = paddingY + (chartHeight - paddingY * 2) * ratio;
              return (
                <line
                  key={index}
                  x1={paddingX}
                  y1={y}
                  x2={combinedTimeline.length * 60 + paddingX}
                  y2={y}
                  className="stroke-gray-100 dark:stroke-white/5"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />
              );
            })}

            {/* Render bars for sessions (Traffic) */}
            {combinedTimeline.map((p, index) => {
              const x = paddingX + index * 60 + 20;
              const barHeight = ((p.sessions / maxSessions) * (chartHeight - paddingY * 2));
              const y = chartHeight - paddingY - barHeight;

              return (
                <rect
                  key={'bar-' + index}
                  x={x}
                  y={y}
                  width={14}
                  height={Math.max(2, barHeight)}
                  rx={3}
                  className="fill-blue-400/35 hover:fill-blue-400 transition-colors cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(p)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              );
            })}

            {/* Render line for Revenue */}
            {(() => {
              const points = combinedTimeline.map((p, index) => {
                const x = paddingX + index * 60 + 27; // center of bar
                const y = chartHeight - paddingY - ((p.revenue / maxRevenue) * (chartHeight - paddingY * 2));
                return { x, y, ...p };
              });

              const pathD = points.reduce((d, p, index) => {
                return index === 0 ? `M ${p.x} ${p.y}` : `${d} L ${p.x} ${p.y}`;
              }, '');

              return (
                <>
                  <path d={pathD} fill="none" className="stroke-violet-600 dark:stroke-violet-500" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                  {points.map((p, index) => (
                    <circle
                      key={'dot-' + index}
                      cx={p.x}
                      cy={p.y}
                      r={4}
                      className="fill-violet-600 stroke-white dark:stroke-slate-900 cursor-pointer"
                      strokeWidth={1.5}
                      onMouseEnter={() => setHoveredPoint(p)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  ))}
                </>
              );
            })()}
          </svg>

          {/* Hover popup overlay */}
          {hoveredPoint && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900/90 text-white rounded-lg text-[9px] font-black uppercase tracking-widest flex gap-3 shadow-lg z-10">
              <span>{hoveredPoint.label}</span>
              <span>Visits: {hoveredPoint.sessions}</span>
              <span>Revenue: ${hoveredPoint.revenue.toFixed(2)}</span>
            </div>
          )}

          {/* Labels */}
          <div className="flex justify-between mt-2 px-10">
            {combinedTimeline.map((p, i) => (
              <span key={i} className="text-[8px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-widest">
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Double Column Details Section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Action Items & Operations Alerts */}
        <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-amber-50 dark:bg-amber-500/10 rounded-lg">
              <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400 animate-pulse" />
            </div>
            <div>
              <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Executive Tasklist</h4>
              <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-0.5">Critical operations requiring owner review</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {criticalAlerts.length === 0 ? (
              <div className="flex items-center gap-3 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
                No outstanding issues. Store operation metrics optimal.
              </div>
            ) : (
              criticalAlerts.map((alert, i) => (
                <div 
                  key={i} 
                  className={`flex items-center justify-between gap-4 p-4 border rounded-xl transition-all ${
                    alert.severity === 'high' 
                      ? 'bg-rose-500/5 border-rose-500/10 text-rose-800 dark:text-rose-400' 
                      : 'bg-amber-500/5 border-amber-500/10 text-amber-800 dark:text-amber-400'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`w-5 h-5 mt-0.5 shrink-0 ${alert.severity === 'high' ? 'text-rose-500' : 'text-amber-500'}`} />
                    <div>
                      <p className="text-xs font-bold">{alert.message}</p>
                      <span className="text-[9px] uppercase tracking-wider opacity-60">Operations Exception</span>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    variant={alert.severity === 'high' ? 'primary' : 'secondary'}
                    onClick={() => onNavigateToTab('inventory')}
                  >
                    {alert.actionLabel}
                  </Button>
                </div>
              ))
            )}
            
            {/* Added Standard compliance checks */}
            <div className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-slate-950/20 border border-gray-100 dark:border-white/5 rounded-xl text-xs font-bold text-gray-700 dark:text-slate-300">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-xs">hCaptcha Protection Active</p>
                  <span className="text-[9px] text-gray-400 uppercase tracking-wider mt-0.5">Spam & Bot prevention validated</span>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">Secured</span>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Sales Ledger */}
        <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                <ShoppingCart className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Recent Sales Ledger</h4>
                <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-0.5">Most recent checkout transactions</p>
              </div>
            </div>
            <Button size="sm" variant="ghost" onClick={() => onNavigateToTab('sales_revenue')}>View All</Button>
          </div>

          <div className="overflow-x-auto">
            {recentSales.length === 0 ? (
              <div className="text-center py-8 text-xs font-bold text-gray-400 dark:text-slate-500">
                No orders registered in selected period.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-50 dark:border-white/5 text-[9px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                    <th className="pb-2.5">Order ID</th>
                    <th className="pb-2.5">Date</th>
                    <th className="pb-2.5 text-center">Items</th>
                    <th className="pb-2.5 text-right">Net Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-white/2">
                  {recentSales.map(sale => (
                    <tr key={sale.id} className="text-xs group hover:bg-gray-50/50 dark:hover:bg-white/2">
                      <td className="py-3 font-bold text-gray-900 dark:text-white">
                        <span className="font-mono text-[10px] text-gray-400 dark:text-slate-500 group-hover:text-violet-600 transition-colors">
                          #{sale.id.slice(0, 8)}
                        </span>
                      </td>
                      <td className="py-3 text-gray-500 dark:text-slate-400">{sale.date}</td>
                      <td className="py-3 text-center text-gray-600 dark:text-slate-400 font-bold">{sale.itemsCount}</td>
                      <td className="py-3 text-right font-mono font-bold text-gray-900 dark:text-white">
                        ${sale.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
