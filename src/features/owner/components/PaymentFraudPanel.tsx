import React, { useState } from 'react';
import { 
  Shield, DollarSign, AlertOctagon, CheckCircle2, XCircle, 
  RefreshCw, TrendingUp, Search, Key, ShieldAlert
} from 'lucide-react';
import { usePaymentFraudMetrics } from '../hooks/usePaymentFraudMetrics';
import { Button } from '../../../shared/ui';

interface PaymentFraudPanelProps {
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
}

export function PaymentFraudPanel({ period }: PaymentFraudPanelProps) {
  const { isLoading, error, data, refetch } = usePaymentFraudMetrics(period);
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
        <Shield className="w-12 h-12 text-rose-500 mx-auto mb-4 animate-bounce" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Error Loading Security Data</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">{error || 'An unexpected error occurred.'}</p>
        <Button onClick={refetch} leftIcon={<RefreshCw className="w-4 h-4" />}>Try Again</Button>
      </div>
    );
  }

  const { metrics, paymentMethods, alerts, timeline } = data;

  const successRate = metrics.successfulCount > 0 
    ? Math.round((metrics.successfulCount / (metrics.successfulCount + metrics.failedCount)) * 1000) / 10
    : 100;

  const filteredAlerts = alerts.filter(a => 
    a.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.reason.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chartHeight = 150;
  const paddingX = 40;
  const paddingY = 20;

  const maxSuccess = Math.max(...timeline.map(p => p.successfulVal), 10);

  return (
    <div className="space-y-6">
      
      {/* ── Summary Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Processed Volume */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Processed Volume</span>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
              <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              ${metrics.totalProcessedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h3>
            <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 uppercase">
              {metrics.successfulCount} successful checkouts
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Card 2: Success Rate */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Success Rate</span>
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{successRate}%</h3>
            <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 mt-1 uppercase">
              {metrics.failedCount} transaction failures
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Card 3: Card Disputes */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Disputes</span>
            <div className={`p-2 ${metrics.disputeCount > 0 ? 'bg-rose-50 dark:bg-rose-500/10 animate-pulse' : 'bg-gray-50 dark:bg-white/5'} rounded-xl`}>
              <AlertOctagon className={`w-5 h-5 ${metrics.disputeCount > 0 ? 'text-rose-600' : 'text-gray-400'}`} />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              {metrics.disputeCount} Active
            </h3>
            <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">Chargeback rate within compliance limit</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Card 4: Stripe Radar risk score */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Radar Risk Score</span>
            <div className="p-2 bg-violet-50 dark:bg-violet-500/10 rounded-xl">
              <Shield className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{metrics.avgRiskScore} / 100</h3>
            <p className="text-[10px] font-bold text-violet-600 dark:text-violet-400 mt-1 uppercase">Low fraud probability average</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* ── Main Details Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3 width): Radar & Dispute Alerts Console */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Radar & Disputes Console</h4>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Stripe Radar checks requiring review or dispute action.</p>
            </div>
            
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Filter alerts..."
                className="w-full sm:w-48 pl-8 pr-3 py-1.5 bg-gray-50 dark:bg-slate-950/60 border border-gray-200 dark:border-white/5 rounded-lg text-xs font-bold focus:outline-none focus:border-violet-500 dark:text-white"
              />
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
            </div>
          </div>

          <div className="flex-1 overflow-x-auto">
            {filteredAlerts.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-slate-950/20 border border-dashed border-gray-100 dark:border-white/5 rounded-xl">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-xs font-bold text-gray-400 dark:text-slate-500">No warnings or active disputes found.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse min-w-[550px]">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-white/5 text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                    <th className="pb-3 pr-2">Alert ID / Order</th>
                    <th className="pb-3 px-2">Risk Score</th>
                    <th className="pb-3 px-2">Alert Detail</th>
                    <th className="pb-3 px-2">Status</th>
                    <th className="pb-3 pl-2 text-right">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                  {filteredAlerts.map(item => (
                    <tr key={item.id} className="text-xs group hover:bg-gray-50/40 dark:hover:bg-white/2">
                      <td className="py-3.5 pr-2 font-bold text-gray-900 dark:text-white">
                        <span className="font-mono text-[10px] text-gray-400 dark:text-slate-500">
                          {item.id.toUpperCase()}
                        </span>
                        <div className="text-[9px] font-bold text-gray-400 mt-0.5">
                          Order: #{item.orderId.slice(0, 8)}
                        </div>
                      </td>
                      <td className="py-3.5 px-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black font-mono border ${
                          item.riskScore >= 75 
                            ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' 
                            : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                        }`}>
                          Score: {item.riskScore}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-gray-700 dark:text-slate-300 font-bold max-w-[180px] truncate">
                        {item.reason}
                      </td>
                      <td className="py-3.5 px-2">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border ${
                          item.status === 'disputed' 
                            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' 
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3.5 pl-2 text-right font-mono font-bold text-gray-900 dark:text-white">
                        ${item.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Column (1/3 width): Payment Methods & Transaction Timeline */}
        <div className="space-y-6">
          
          {/* Payment Method Share */}
          <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-violet-50 dark:bg-violet-500/10 rounded-lg">
                <Key className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Payment Methods</h4>
                <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-0.5">Top payment gateway options share</p>
              </div>
            </div>

            <div className="space-y-4">
              {paymentMethods.map((pm, i) => {
                const colors = ['bg-emerald-500', 'bg-blue-500', 'bg-violet-500', 'bg-amber-500'];
                const activeColor = colors[i % colors.length];

                return (
                  <div key={pm.method} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-gray-800 dark:text-slate-300">{pm.method}</span>
                      <span className="text-gray-500 dark:text-slate-400 font-mono text-[10px]">
                        {pm.count} checkouts ({pm.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-50 dark:bg-slate-950/60 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${activeColor} rounded-full transition-all duration-1000`} 
                        style={{ width: `${pm.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SVG volume comparison timeline */}
          <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-sky-50 dark:bg-sky-500/10 rounded-lg">
                <TrendingUp className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              </div>
              <div>
                <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Transaction Timeline</h4>
                <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-0.5">Successful vs Failed payment volume</p>
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

                {/* Double Bars */}
                {timeline.map((point, index) => {
                  const x = paddingX + index * 40 + 8;
                  const successH = (point.successfulVal / maxSuccess) * (chartHeight - paddingY * 2);
                  const failedH = (point.failedVal / maxSuccess) * (chartHeight - paddingY * 2);

                  return (
                    <g key={index}>
                      {/* Success Bar (Left) */}
                      <rect
                        x={x}
                        y={chartHeight - paddingY - successH}
                        width={8}
                        height={Math.max(1, successH)}
                        rx={1.5}
                        className="fill-emerald-500"
                      />
                      {/* Failed Bar (Right) */}
                      <rect
                        x={x + 10}
                        y={chartHeight - paddingY - failedH}
                        width={8}
                        height={Math.max(1, failedH)}
                        rx={1.5}
                        className="fill-rose-500"
                      />
                    </g>
                  );
                })}
              </svg>

              <div className="flex justify-between items-center mt-3 text-[8px] font-black uppercase text-gray-400">
                <div className="flex gap-2">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Success</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-rose-500 rounded-full" /> Failed</span>
                </div>
                <span>Interval: {period}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
