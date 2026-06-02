import React, { useState } from 'react';
import { 
  RotateCcw, DollarSign, Calendar, Clock, AlertTriangle, 
  RefreshCw, TrendingDown, ArrowRight, Percent, Search
} from 'lucide-react';
import { useRefundMetrics } from '../hooks/useRefundMetrics';
import { Button } from '../../../shared/ui';

interface ReturnsRefundsPanelProps {
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
}

export function ReturnsRefundsPanel({ period }: ReturnsRefundsPanelProps) {
  const { isLoading, error, data, refetch } = useRefundMetrics(period);
  const [searchTerm, setSearchTerm] = useState('');

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
        <RotateCcw className="w-12 h-12 text-rose-500 mx-auto mb-4 animate-bounce" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Error Loading Refund Data</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">{error || 'An unexpected error occurred.'}</p>
        <Button onClick={refetch} leftIcon={<RefreshCw className="w-4 h-4" />}>Try Again</Button>
      </div>
    );
  }

  const { metrics, reasons, refunds, timeline } = data;

  const filteredRefunds = refunds.filter(r => 
    r.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.reason.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chartHeight = 150;
  const paddingX = 40;
  const paddingY = 20;
  const maxAmount = Math.max(...timeline.map(p => p.amount), 10);

  return (
    <div className="space-y-6">
      
      {/* ── Summary Stats Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Refunded */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Total Refunded</span>
            <div className="p-2 bg-rose-50 dark:bg-rose-500/10 rounded-xl">
              <DollarSign className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              ${metrics.totalRefundedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h3>
            <p className="text-[10px] font-bold text-rose-600 dark:text-rose-400 mt-1 uppercase">
              {metrics.comparisons.amountChange}% vs previous {period}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Metric 2: Refund Count */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Refund Actions</span>
            <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-xl">
              <RotateCcw className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              {metrics.totalRefundsCount} Cases
            </h3>
            <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 mt-1 uppercase">
              {metrics.comparisons.countChange}% reduction in returns
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Metric 3: Return/Refund Rate */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Refund Rate</span>
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
              <Percent className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{metrics.refundRate}%</h3>
            <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 mt-1 uppercase">Of total completed sales</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Metric 4: Avg Resolution Days */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Resolution Cycle</span>
            <div className="p-2 bg-violet-50 dark:bg-violet-500/10 rounded-xl">
              <Clock className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{metrics.avgResolutionDays} Days</h3>
            <p className="text-[10px] font-bold text-violet-600 dark:text-violet-400 mt-1 uppercase">Mean duration from claim to close</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* ── Main Layout columns ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3 width): Refunds Ledger */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Returns & Refunds Ledger</h4>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Audit log of processing, requested and completed refunds.</p>
            </div>
            
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Filter refunds..."
                className="w-full sm:w-48 pl-8 pr-3 py-1.5 bg-gray-50 dark:bg-slate-950/60 border border-gray-200 dark:border-white/5 rounded-lg text-xs font-bold focus:outline-none focus:border-violet-500 dark:text-white"
              />
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
            </div>
          </div>

          <div className="flex-1 overflow-x-auto">
            {filteredRefunds.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-slate-950/20 border border-dashed border-gray-100 dark:border-white/5 rounded-xl">
                <RotateCcw className="w-8 h-8 text-gray-300 dark:text-slate-700 mx-auto mb-2" />
                <p className="text-xs font-bold text-gray-400 dark:text-slate-500">No refunds recorded matching search criteria.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse min-w-[550px]">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-white/5 text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                    <th className="pb-3 pr-2">Refund ID</th>
                    <th className="pb-3 px-2">Reason</th>
                    <th className="pb-3 px-2">Status</th>
                    <th className="pb-3 px-2">Date Requested</th>
                    <th className="pb-3 pl-2 text-right">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                  {filteredRefunds.map(refund => (
                    <tr key={refund.id} className="text-xs group hover:bg-gray-50/40 dark:hover:bg-white/2">
                      <td className="py-3.5 pr-2 font-bold text-gray-900 dark:text-white">
                        <span className="font-mono text-[10px] text-gray-400 dark:text-slate-500">
                          #{refund.id.slice(0, 8)}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-gray-700 dark:text-slate-300 font-bold">
                        {refund.reason}
                      </td>
                      <td className="py-3.5 px-2">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border ${
                          refund.status === 'succeeded' 
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                        }`}>
                          {refund.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-gray-500 dark:text-slate-400">
                        {refund.createdAt}
                      </td>
                      <td className="py-3.5 pl-2 text-right font-mono font-bold text-gray-900 dark:text-white">
                        ${refund.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Column (1/3 width): Reasons & Trend Timeline */}
        <div className="space-y-6">
          
          {/* Reason Allocation Card */}
          <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-rose-50 dark:bg-rose-500/10 rounded-lg">
                <RotateCcw className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Return Reasons</h4>
                <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-0.5">Primary claim reasons analysis</p>
              </div>
            </div>

            <div className="space-y-4">
              {reasons.map((item, i) => {
                const colors = ['bg-rose-500', 'bg-orange-500', 'bg-blue-500', 'bg-gray-400'];
                const activeColor = colors[i % colors.length];

                return (
                  <div key={item.reason} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-gray-800 dark:text-slate-300">{item.reason}</span>
                      <span className="text-gray-500 dark:text-slate-400 font-mono text-[10px]">
                        {item.count} claims ({item.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-50 dark:bg-slate-950/60 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${activeColor} rounded-full transition-all duration-1000`} 
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Refund Trend chart */}
          <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-violet-50 dark:bg-violet-500/10 rounded-lg">
                <DollarSign className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Refund Volume Trend</h4>
                <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-0.5">Refund valuation output timeline</p>
              </div>
            </div>

            <div className="relative">
              <svg 
                className="w-full overflow-visible" 
                height={chartHeight}
                viewBox={`0 0 ${timeline.length * 40 + paddingX * 2} ${chartHeight}`}
                preserveAspectRatio="none"
              >
                {/* Grid lines */}
                {[0, 0.5, 1].map((ratio, index) => {
                  const y = paddingY + (chartHeight - paddingY * 2) * ratio;
                  return (
                    <line
                      key={index}
                      x1={paddingX}
                      y1={y}
                      x2={timeline.length * 40 + paddingX}
                      y2={y}
                      className="stroke-gray-100 dark:stroke-white/5"
                      strokeWidth={1}
                    />
                  );
                })}

                {/* Trend line */}
                {(() => {
                  const points = timeline.map((p, index) => {
                    const x = paddingX + index * 40 + 10;
                    const y = chartHeight - paddingY - ((p.amount / maxAmount) * (chartHeight - paddingY * 2));
                    return { x, y };
                  });

                  const pathD = points.reduce((d, p, index) => {
                    return index === 0 ? `M ${p.x} ${p.y}` : `${d} L ${p.x} ${p.y}`;
                  }, '');

                  return (
                    <>
                      <path d={pathD} fill="none" className="stroke-rose-500" strokeWidth={2} strokeLinecap="round" />
                      {points.map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r={3} className="fill-rose-500 stroke-white dark:stroke-slate-900" strokeWidth={1} />
                      ))}
                    </>
                  );
                })()}
              </svg>

              <div className="flex justify-between mt-2 px-6">
                {timeline.map((p, i) => (
                  <span key={i} className="text-[8px] font-black text-gray-400 uppercase tracking-wider">
                    {p.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
