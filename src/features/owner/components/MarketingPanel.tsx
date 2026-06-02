import React, { useState } from 'react';
import { 
  Megaphone, DollarSign, Target, Percent, Search,
  RefreshCw, TrendingUp, HelpCircle, ArrowUpRight
} from 'lucide-react';
import { useMarketingMetrics } from '../hooks/useMarketingMetrics';
import { Button } from '../../../shared/ui';

interface MarketingPanelProps {
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
}

export function MarketingPanel({ period }: MarketingPanelProps) {
  const { isLoading, error, data, refetch } = useMarketingMetrics(period);
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
        <Megaphone className="w-12 h-12 text-rose-500 mx-auto mb-4 animate-bounce" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Error Loading Marketing Data</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">{error || 'An unexpected error occurred.'}</p>
        <Button onClick={refetch} leftIcon={<RefreshCw className="w-4 h-4" />}>Try Again</Button>
      </div>
    );
  }

  const { metrics, campaigns, timeline } = data;

  const filteredCampaigns = campaigns.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chartHeight = 150;
  const paddingX = 40;
  const paddingY = 20;

  const maxRevenueVal = Math.max(...timeline.map(p => p.revenue), 10);

  return (
    <div className="space-y-6">
      
      {/* ── Summary Stats Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Spend */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Total Ad Spend</span>
            <div className="p-2 bg-rose-50 dark:bg-rose-500/10 rounded-xl">
              <DollarSign className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              ${metrics.totalSpend.toLocaleString('en-US')}
            </h3>
            <p className="text-[10px] font-bold text-rose-600 mt-1 uppercase">Paid channels budget allocation</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* ROAS Multiplier */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Return on Spend</span>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
              <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{metrics.roas}x ROAS</h3>
            <p className="text-[10px] font-bold text-emerald-600 mt-1 uppercase">Advertising effectiveness ratio</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Customer Acquisition Cost (CAC) */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Acquisition Cost</span>
            <div className="p-2 bg-violet-50 dark:bg-violet-500/10 rounded-xl">
              <Percent className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">${metrics.cac.toFixed(2)}</h3>
            <p className="text-[10px] font-bold text-violet-600 mt-1 uppercase">Blended CAC parameter</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Ad Conversion Purchases */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Ad Purchases</span>
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
              <Megaphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              {metrics.purchasesFromAds} Orders
            </h3>
            <p className="text-[10px] font-bold text-blue-600 mt-1 uppercase">Purchases traced to ad attribution</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* ── Main details grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Campaigns Table */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Marketing Campaign Ledger</h4>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">ROI tracking across individual channels & ad copy variations.</p>
            </div>
            
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Filter campaigns..."
                className="w-full sm:w-48 pl-8 pr-3 py-1.5 bg-gray-50 dark:bg-slate-950/60 border border-gray-200 dark:border-white/5 rounded-lg text-xs font-bold focus:outline-none focus:border-violet-500 dark:text-white"
              />
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
            </div>
          </div>

          <div className="flex-1 overflow-x-auto">
            {filteredCampaigns.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-slate-950/20 border border-dashed border-gray-100 dark:border-white/5 rounded-xl">
                <Megaphone className="w-8 h-8 text-gray-300 dark:text-slate-700 mx-auto mb-2" />
                <p className="text-xs font-bold text-gray-400 dark:text-slate-500">No campaigns found matching filter terms.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse min-w-[550px]">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-white/5 text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                    <th className="pb-3 pr-2">Campaign Name</th>
                    <th className="pb-3 px-2">Status</th>
                    <th className="pb-3 px-2">Spend</th>
                    <th className="pb-3 px-2">Ad Revenue</th>
                    <th className="pb-3 pl-2 text-right">ROAS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                  {filteredCampaigns.map(c => (
                    <tr key={c.id} className="text-xs group hover:bg-gray-50/40 dark:hover:bg-white/2">
                      <td className="py-3.5 pr-2 font-bold text-gray-900 dark:text-white">
                        {c.name}
                      </td>
                      <td className="py-3.5 px-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${
                          c.status === 'active' 
                            ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
                            : c.status === 'paused'
                            ? 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                            : 'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-slate-400 border-gray-200 dark:border-white/5'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 font-mono text-gray-700 dark:text-slate-300 font-bold">
                        ${c.spend.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-2 font-mono text-gray-700 dark:text-slate-300 font-bold">
                        ${c.revenue.toLocaleString()}
                      </td>
                      <td className="py-3.5 pl-2 text-right font-mono font-black text-gray-900 dark:text-white">
                        {c.roas}x
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Column: ROI Graph timeline */}
        <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-rose-50 dark:bg-rose-500/10 rounded-lg">
                <TrendingUp className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Marketing ROI Trend</h4>
                <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-0.5">Dual lines mapping spend vs ad return</p>
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

                {/* Spend trend line (rose) */}
                {(() => {
                  const points = timeline.map((p, index) => {
                    const x = paddingX + index * 40 + 10;
                    const y = chartHeight - paddingY - ((p.spend / maxRevenueVal) * (chartHeight - paddingY * 2));
                    return { x, y };
                  });

                  const pathD = points.reduce((d, p, index) => {
                    return index === 0 ? `M ${p.x} ${p.y}` : `${d} L ${p.x} ${p.y}`;
                  }, '');

                  return (
                    <path d={pathD} fill="none" className="stroke-rose-400" strokeWidth={1.5} strokeDasharray="3 3" />
                  );
                })()}

                {/* Revenue trend line (emerald) */}
                {(() => {
                  const points = timeline.map((p, index) => {
                    const x = paddingX + index * 40 + 10;
                    const y = chartHeight - paddingY - ((p.revenue / maxRevenueVal) * (chartHeight - paddingY * 2));
                    return { x, y };
                  });

                  const pathD = points.reduce((d, p, index) => {
                    return index === 0 ? `M ${p.x} ${p.y}` : `${d} L ${p.x} ${p.y}`;
                  }, '');

                  return (
                    <>
                      <path d={pathD} fill="none" className="stroke-emerald-500" strokeWidth={2} />
                      {points.map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r={3} className="fill-emerald-500 stroke-white dark:stroke-slate-900" strokeWidth={1} />
                      ))}
                    </>
                  );
                })()}
              </svg>

              <div className="flex justify-between items-center mt-3 text-[8px] font-black uppercase text-gray-400">
                <div className="flex gap-2.5">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-rose-400 rounded-full" /> Ad Spend</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Ad Revenue</span>
                </div>
                <span>Interval: {period}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-slate-950/20 rounded-xl p-3 text-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Optimizations Tip</p>
            <p className="text-xs text-gray-600 dark:text-slate-400 mt-1">
              Google Ads active campaign achieves {metrics.roas}x ROAS. We recommend increasing daily ad-spend by 15% to capture seasonal searches.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
