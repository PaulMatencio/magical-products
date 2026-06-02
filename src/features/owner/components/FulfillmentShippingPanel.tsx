import React, { useState } from 'react';
import { 
  Truck, Clock, Compass, Box, AlertTriangle, 
  RefreshCw, TrendingUp, Search, Mail, MapPin, ArrowRight
} from 'lucide-react';
import { useFulfillmentMetrics } from '../hooks/useFulfillmentMetrics';
import { Button } from '../../../shared/ui';

interface FulfillmentShippingPanelProps {
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
}

export function FulfillmentShippingPanel({ period }: FulfillmentShippingPanelProps) {
  const { isLoading, error, data, refetch } = useFulfillmentMetrics(period);
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
        <Truck className="w-12 h-12 text-rose-500 mx-auto mb-4 animate-bounce" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Error Loading Shipping Data</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">{error || 'An unexpected error occurred.'}</p>
        <Button onClick={refetch} leftIcon={<RefreshCw className="w-4 h-4" />}>Try Again</Button>
      </div>
    );
  }

  const { metrics, carriers, shipments, timeline } = data;

  const filteredShipments = shipments.filter(s => 
    s.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.address.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.carrier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chartHeight = 150;
  const paddingX = 40;
  const paddingY = 20;
  const maxVolume = Math.max(...timeline.map(p => Math.max(p.fulfilled, p.received)), 2);

  return (
    <div className="space-y-6">
      
      {/* ── Metric Summary Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Prep Time Card */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Prepare Duration</span>
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{metrics.avgProcessingHours} Hrs</h3>
            <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 mt-1 uppercase">Avg. pending to ready transition</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Transit Time Card */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Transit Duration</span>
            <div className="p-2 bg-violet-50 dark:bg-violet-500/10 rounded-xl">
              <Truck className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{metrics.avgDeliveryHours} Hrs</h3>
            <p className="text-[10px] font-bold text-violet-600 dark:text-violet-400 mt-1 uppercase">Avg. shipped to delivery time</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Pending Fulfillment Card */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Fulfillment Queue</span>
            <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-xl">
              <Box className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              {metrics.pendingCount + metrics.readyCount} Orders
            </h3>
            <p className="text-[10px] font-bold text-amber-600 mt-1 uppercase">
              {metrics.pendingCount} pending, {metrics.readyCount} ready to pack
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Delivered Card */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Delivered Orders</span>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
              <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{metrics.deliveredCount}</h3>
            <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 uppercase">Successful final drop-offs</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* ── Main Details Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3 width): Active Shipments & Tracker */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Active Shipments Console</h4>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Real-time status tracking for shipments in transit.</p>
            </div>
            
            {/* Search filter */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Filter shipments..."
                className="w-full sm:w-48 pl-8 pr-3 py-1.5 bg-gray-50 dark:bg-slate-950/60 border border-gray-200 dark:border-white/5 rounded-lg text-xs font-bold focus:outline-none focus:border-violet-500 dark:text-white"
              />
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-gray-400" />
            </div>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-x-auto">
            {filteredShipments.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-slate-950/20 border border-dashed border-gray-100 dark:border-white/5 rounded-xl">
                <Truck className="w-8 h-8 text-gray-300 dark:text-slate-700 mx-auto mb-2" />
                <p className="text-xs font-bold text-gray-400 dark:text-slate-500">No active shipments in transit.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-white/5 text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                    <th className="pb-3 pr-2">Order ID</th>
                    <th className="pb-3 px-2">Carrier & Route</th>
                    <th className="pb-3 px-2">Items</th>
                    <th className="pb-3 px-2">Status</th>
                    <th className="pb-3 pl-2 text-right">Last Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                  {filteredShipments.map(shipment => (
                    <tr key={shipment.id} className="text-xs group hover:bg-gray-50/40 dark:hover:bg-white/2">
                      <td className="py-3.5 pr-2 font-bold text-gray-900 dark:text-white">
                        <span className="font-mono text-[10px] text-gray-400 dark:text-slate-500">
                          #{shipment.id.slice(0, 8)}
                        </span>
                        <div className="text-[10px] font-bold text-gray-400 mt-0.5 flex items-center gap-1">
                          <Mail className="w-3 h-3 text-gray-300" />
                          <span className="line-clamp-1">{shipment.email}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-2">
                        <div className="font-bold text-gray-800 dark:text-slate-300">{shipment.carrier}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-0.5">
                          <MapPin className="w-3 h-3 text-gray-300 shrink-0" />
                          <span className="line-clamp-1 max-w-[200px]">{shipment.address}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-2 font-bold text-gray-600 dark:text-slate-400">
                        {shipment.itemsCount} Units
                      </td>
                      <td className="py-3.5 px-2">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border ${
                          shipment.status === 'shipped' 
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' 
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                        }`}>
                          {shipment.status}
                        </span>
                      </td>
                      <td className="py-3.5 pl-2 text-right text-gray-500 font-bold">
                        {shipment.lastUpdated}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Column (1/3 width): Carrier Share & Shipping Volume Timeline */}
        <div className="space-y-6">
          
          {/* Carrier Allocation Card */}
          <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-violet-50 dark:bg-violet-500/10 rounded-lg">
                <Truck className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Carrier Share</h4>
                <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-0.5">Top logistics partners usage</p>
              </div>
            </div>

            <div className="space-y-4">
              {carriers.map((car, i) => {
                const colors = ['bg-blue-500', 'bg-violet-500', 'bg-amber-500', 'bg-emerald-500'];
                const activeColor = colors[i % colors.length];

                return (
                  <div key={car.carrier} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-gray-800 dark:text-slate-300">{car.carrier}</span>
                      <span className="text-gray-500 dark:text-slate-400 font-mono text-[10px]">
                        {car.count} Orders ({car.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-50 dark:bg-slate-950/60 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${activeColor} rounded-full transition-all duration-1000`} 
                        style={{ width: `${car.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SVG volume timeline */}
          <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-sky-50 dark:bg-sky-500/10 rounded-lg">
                <TrendingUp className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              </div>
              <div>
                <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Fulfillment Activity</h4>
                <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-0.5">Received vs. Fulfilled volume</p>
              </div>
            </div>

            {/* Custom SVG Double Bar Chart */}
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
                  const receivedH = (point.received / maxVolume) * (chartHeight - paddingY * 2);
                  const fulfilledH = (point.fulfilled / maxVolume) * (chartHeight - paddingY * 2);

                  return (
                    <g key={index}>
                      {/* Received Bar (Left) */}
                      <rect
                        x={x}
                        y={chartHeight - paddingY - receivedH}
                        width={8}
                        height={Math.max(1, receivedH)}
                        rx={1.5}
                        className="fill-blue-400"
                      />
                      {/* Fulfilled Bar (Right) */}
                      <rect
                        x={x + 10}
                        y={chartHeight - paddingY - fulfilledH}
                        width={8}
                        height={Math.max(1, fulfilledH)}
                        rx={1.5}
                        className="fill-emerald-400"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Legend & Labels */}
              <div className="flex justify-between items-center mt-3 text-[8px] font-black uppercase text-gray-400">
                <div className="flex gap-2">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> Recd</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> Fulfd</span>
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
