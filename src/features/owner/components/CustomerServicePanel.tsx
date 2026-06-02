import React, { useState } from 'react';
import { 
  Headphones, Heart, Clock, MessageSquare, Search,
  RefreshCw, TrendingUp, AlertCircle, ShieldAlert
} from 'lucide-react';
import { useCustomerServiceMetrics } from '../hooks/useCustomerServiceMetrics';
import { Button } from '../../../shared/ui';

interface CustomerServicePanelProps {
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
}

export function CustomerServicePanel({ period }: CustomerServicePanelProps) {
  const { isLoading, error, data, refetch } = useCustomerServiceMetrics(period);
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
        <Headphones className="w-12 h-12 text-rose-500 mx-auto mb-4 animate-bounce" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Error Loading Support Data</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">{error || 'An unexpected error occurred.'}</p>
        <Button onClick={refetch} leftIcon={<RefreshCw className="w-4 h-4" />}>Try Again</Button>
      </div>
    );
  }

  const { metrics, channels, tickets, timeline } = data;

  const filteredTickets = tickets.filter(t => 
    t.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chartHeight = 150;
  const paddingX = 40;
  const paddingY = 20;

  const maxVolume = Math.max(...timeline.map(p => Math.max(p.created, p.resolved)), 2);

  return (
    <div className="space-y-6">
      
      {/* ── Summary Stats Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CSAT Score Card */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Satisfaction Score</span>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
              <Heart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{metrics.csat}%</h3>
            <p className="text-[10px] font-bold text-emerald-600 mt-1 uppercase">Positive feedback rating</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Avg Response Minutes Card */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Response SLA</span>
            <div className="p-2 bg-violet-50 dark:bg-violet-500/10 rounded-xl">
              <Clock className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{metrics.avgResponseMinutes} Mins</h3>
            <p className="text-[10px] font-bold text-violet-600 mt-1 uppercase">Mean first response SLA</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Open Tickets Card */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Active Tickets</span>
            <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-xl">
              <MessageSquare className="w-5 h-5 text-amber-600 dark:text-amber-400 animate-pulse" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{metrics.openCount} Open</h3>
            <p className="text-[10px] font-bold text-amber-600 mt-1 uppercase">Assigned to client representatives</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Total Tickets Card */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Conversations</span>
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
              <Headphones className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{metrics.totalTickets} Cases</h3>
            <p className="text-[10px] font-bold text-blue-600 mt-1 uppercase">
              {metrics.resolvedCount} completed cases
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* ── Main Details Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3 width): Ticket Console */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Active Inquiries Desk</h4>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Direct support queries from store clients.</p>
            </div>
            
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Filter tickets..."
                className="w-full sm:w-48 pl-8 pr-3 py-1.5 bg-gray-50 dark:bg-slate-950/60 border border-gray-200 dark:border-white/5 rounded-lg text-xs font-bold focus:outline-none focus:border-violet-500 dark:text-white"
              />
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
            </div>
          </div>

          <div className="flex-1 overflow-x-auto">
            {filteredTickets.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-slate-950/20 border border-dashed border-gray-100 dark:border-white/5 rounded-xl">
                <Headphones className="w-8 h-8 text-gray-300 dark:text-slate-700 mx-auto mb-2" />
                <p className="text-xs font-bold text-gray-400 dark:text-slate-500">No support tickets found.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse min-w-[550px]">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-white/5 text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                    <th className="pb-3 pr-2">Ticket ID</th>
                    <th className="pb-3 px-2">Priority</th>
                    <th className="pb-3 px-2">Subject / Inquirer</th>
                    <th className="pb-3 px-2">Status</th>
                    <th className="pb-3 pl-2 text-right">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                  {filteredTickets.map(ticket => (
                    <tr key={ticket.id} className="text-xs group hover:bg-gray-50/40 dark:hover:bg-white/2">
                      <td className="py-3.5 pr-2 font-bold text-gray-900 dark:text-white">
                        <span className="font-mono text-[10px] text-gray-400 dark:text-slate-500">
                          {ticket.id}
                        </span>
                      </td>
                      <td className="py-3.5 px-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${
                          ticket.priority === 'high' 
                            ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' 
                            : ticket.priority === 'medium'
                            ? 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                            : 'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-slate-400 border-gray-200 dark:border-white/5'
                        }`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="py-3.5 px-2">
                        <div className="font-bold text-gray-800 dark:text-slate-300 max-w-[200px] truncate">
                          {ticket.subject}
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5 truncate max-w-[200px]">
                          From: {ticket.email}
                        </div>
                      </td>
                      <td className="py-3.5 px-2">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border ${
                          ticket.status === 'resolved' 
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                        }`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="py-3.5 pl-2 text-right text-gray-500 font-bold">
                        {ticket.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Column (1/3 width): Channels & SLA Volume Chart */}
        <div className="space-y-6">
          
          {/* Channel Share */}
          <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-violet-50 dark:bg-violet-500/10 rounded-lg">
                <MessageSquare className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Support Channels</h4>
                <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-0.5">Primary inbound channel weights</p>
              </div>
            </div>

            <div className="space-y-4">
              {channels.map((ch, i) => {
                const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500'];
                const activeColor = colors[i % colors.length];

                return (
                  <div key={ch.channel} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-gray-800 dark:text-slate-300">{ch.channel}</span>
                      <span className="text-gray-500 dark:text-slate-400 font-mono text-[10px]">
                        {ch.count} ({ch.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-50 dark:bg-slate-950/60 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${activeColor} rounded-full transition-all duration-1000`} 
                        style={{ width: `${ch.percentage}%` }}
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
                <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Case Processing Rate</h4>
                <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-0.5">Created vs. Resolved support cases</p>
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
                  const createdH = (point.created / maxVolume) * (chartHeight - paddingY * 2);
                  const resolvedH = (point.resolved / maxVolume) * (chartHeight - paddingY * 2);

                  return (
                    <g key={index}>
                      {/* Created Bar (Left) */}
                      <rect
                        x={x}
                        y={chartHeight - paddingY - createdH}
                        width={8}
                        height={Math.max(1, createdH)}
                        rx={1.5}
                        className="fill-blue-400"
                      />
                      {/* Resolved Bar (Right) */}
                      <rect
                        x={x + 10}
                        y={chartHeight - paddingY - resolvedH}
                        width={8}
                        height={Math.max(1, resolvedH)}
                        rx={1.5}
                        className="fill-emerald-400"
                      />
                    </g>
                  );
                })}
              </svg>

              <div className="flex justify-between items-center mt-3 text-[8px] font-black uppercase text-gray-400">
                <div className="flex gap-2">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> Inbound</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> Closed</span>
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
