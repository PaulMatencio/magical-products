import React, { useState } from 'react';
import { 
  AlertTriangle, Shield, Cpu, Clock, Search,
  RefreshCw, TrendingUp, ShieldAlert, Heart
} from 'lucide-react';
import { useOperationsMetrics } from '../hooks/useOperationsMetrics';
import { Button } from '../../../shared/ui';

interface OperationsPanelProps {
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
}

export function OperationsPanel({ period }: OperationsPanelProps) {
  const { isLoading, error, data, refetch } = useOperationsMetrics(period);
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
        <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-4 animate-bounce" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Error Loading Operations Data</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">{error || 'An unexpected error occurred.'}</p>
        <Button onClick={refetch} leftIcon={<RefreshCw className="w-4 h-4" />}>Try Again</Button>
      </div>
    );
  }

  const { metrics, logs, timeline } = data;

  const filteredLogs = logs.filter(l => 
    l.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.component.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chartHeight = 150;
  const paddingX = 40;
  const paddingY = 20;

  const maxVal = Math.max(...timeline.map(p => Math.max(p.errors, p.blocks)), 2);

  return (
    <div className="space-y-6">
      
      {/* ── Summary Stats Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* System Uptime */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Uptime SLA</span>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
              <Heart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{metrics.uptimePercentage}%</h3>
            <p className="text-[10px] font-bold text-emerald-600 mt-1 uppercase">Storefront status check</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* hCaptcha Block Rate */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Bot Challenge</span>
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{metrics.hCaptchaBlockRate}%</h3>
            <p className="text-[10px] font-bold text-blue-600 mt-1 uppercase">hCaptcha challenges blocked</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Stripe Radar Block Count */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Radar Blocks</span>
            <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-xl">
              <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              {metrics.stripeRadarBlockCount} Blocks
            </h3>
            <p className="text-[10px] font-bold text-amber-600 mt-1 uppercase">Cardholders verification blocks</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Database processing Logs */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Event Exceptions</span>
            <div className="p-2 bg-violet-50 dark:bg-violet-500/10 rounded-xl">
              <Cpu className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              {metrics.errorLogsCount} Alerts
            </h3>
            <p className="text-[10px] font-bold text-violet-600 mt-1 uppercase">Database processing exceptions</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* ── Main details layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Exceptions Ledger */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">System Exceptions Ledger</h4>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Audit log of system events, API blocks and background retries.</p>
            </div>
            
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Filter logs..."
                className="w-full sm:w-48 pl-8 pr-3 py-1.5 bg-gray-50 dark:bg-slate-950/60 border border-gray-200 dark:border-white/5 rounded-lg text-xs font-bold focus:outline-none focus:border-violet-500 dark:text-white"
              />
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
            </div>
          </div>

          <div className="flex-1 overflow-x-auto">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-slate-950/20 border border-dashed border-gray-100 dark:border-white/5 rounded-xl">
                <Heart className="w-8 h-8 text-emerald-500 mx-auto mb-2 animate-pulse" />
                <p className="text-xs font-bold text-gray-400 dark:text-slate-500">All storefront nodes are operating healthy.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse min-w-[550px]">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-white/5 text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                    <th className="pb-3 pr-2">Log ID</th>
                    <th className="pb-3 px-2">Severity</th>
                    <th className="pb-3 px-2">Source Component / Message</th>
                    <th className="pb-3 pl-2 text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                  {filteredLogs.map(log => (
                    <tr key={log.id} className="text-xs group hover:bg-gray-50/40 dark:hover:bg-white/2">
                      <td className="py-3.5 pr-2 font-bold text-gray-900 dark:text-white font-mono">
                        {log.id}
                      </td>
                      <td className="py-3.5 px-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${
                          log.severity === 'critical' 
                            ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' 
                            : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                        }`}>
                          {log.severity}
                        </span>
                      </td>
                      <td className="py-3.5 px-2">
                        <div className="font-bold text-gray-800 dark:text-slate-300">
                          {log.component}
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">
                          {log.message}
                        </div>
                      </td>
                      <td className="py-3.5 pl-2 text-right text-gray-500 font-bold">
                        {log.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Column: Alert timeline double line graph */}
        <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-violet-50 dark:bg-violet-500/10 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Security & Exception Trend</h4>
              <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-0.5">Dual timeline of bot blocks vs system errors</p>
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

              {/* Errors trend line (rose) */}
              {(() => {
                const points = timeline.map((p, index) => {
                  const x = paddingX + index * 40 + 10;
                  const y = chartHeight - paddingY - ((p.errors / maxVal) * (chartHeight - paddingY * 2));
                  return { x, y };
                });

                const pathD = points.reduce((d, p, index) => {
                  return index === 0 ? `M ${p.x} ${p.y}` : `${d} L ${p.x} ${p.y}`;
                }, '');

                return (
                  <>
                    <path d={pathD} fill="none" className="stroke-rose-500" strokeWidth={1.5} />
                    {points.map((p, i) => (
                      <circle key={i} cx={p.x} cy={p.y} r={3} className="fill-rose-500 stroke-white dark:stroke-slate-900" strokeWidth={1} />
                    ))}
                  </>
                );
              })()}

              {/* Blocks trend line (blue) */}
              {(() => {
                const points = timeline.map((p, index) => {
                  const x = paddingX + index * 40 + 10;
                  const y = chartHeight - paddingY - ((p.blocks / maxVal) * (chartHeight - paddingY * 2));
                  return { x, y };
                });

                const pathD = points.reduce((d, p, index) => {
                  return index === 0 ? `M ${p.x} ${p.y}` : `${d} L ${p.x} ${p.y}`;
                }, '');

                return (
                  <path d={pathD} fill="none" className="stroke-blue-400" strokeWidth={1.5} strokeDasharray="3 3" />
                );
              })()}
            </svg>

            <div className="flex justify-between items-center mt-3 text-[8px] font-black uppercase text-gray-400">
              <div className="flex gap-2.5">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-rose-500 rounded-full" /> Errors</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> Bot Blocks</span>
              </div>
              <span>Interval: {period}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
