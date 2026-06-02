import React, { useState } from 'react';
import { 
  Package, DollarSign, AlertTriangle, AlertOctagon, 
  RefreshCw, TrendingUp, Search, Layers, ShoppingBag, ArrowRight
} from 'lucide-react';
import { useInventoryMetrics } from '../hooks/useInventoryMetrics';
import { Button } from '../../../shared/ui';

export function InventoryStockPanel() {
  const { isLoading, error, data, refetch } = useInventoryMetrics(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [reorderStatus, setReorderStatus] = useState<Record<string, 'idle' | 'ordered'>>({});

  const handleMockReorder = (productId: string) => {
    setReorderStatus(prev => ({ ...prev, [productId]: 'ordered' }));
    setTimeout(() => {
      // Simulate ordering success
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Metric Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 animate-pulse">
              <div className="flex items-center justify-between mb-3">
                <div className="h-4 w-20 bg-gray-200 dark:bg-white/10 rounded" />
                <div className="h-8 w-8 bg-gray-200 dark:bg-white/10 rounded-full" />
              </div>
              <div className="h-8 w-28 bg-gray-200 dark:bg-white/10 rounded mb-2" />
              <div className="h-3 w-16 bg-gray-200 dark:bg-white/10 rounded" />
            </div>
          ))}
        </div>
        {/* Main Grid Skeleton */}
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
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Error Loading Stock Data</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">{error || 'An unexpected error occurred.'}</p>
        <Button onClick={refetch} leftIcon={<RefreshCw className="w-4 h-4" />}>Try Again</Button>
      </div>
    );
  }

  const { metrics, categoryBreakdown, alerts, recentAdditions } = data;

  const filteredAlerts = alerts.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.sku.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* ── Metric Summary Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Products */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Total SKUs</span>
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
              <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{metrics.totalProducts}</h3>
            <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-1 uppercase">Active Products Cataloged</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Card 2: Total Valuation */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Inventory Value</span>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
              <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              ${metrics.totalInventoryValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h3>
            <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 uppercase">
              {metrics.totalItemsCount.toLocaleString()} total units in stock
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Card 3: Low Stock Warnings */}
        <div className={`relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Low Stock Items</span>
            <div className={`p-2 ${metrics.lowStockCount > 0 ? 'bg-amber-50 dark:bg-amber-500/10' : 'bg-gray-50 dark:bg-white/5'} rounded-xl`}>
              <AlertTriangle className={`w-5 h-5 ${metrics.lowStockCount > 0 ? 'text-amber-600 dark:text-amber-400 animate-pulse' : 'text-gray-400'}`} />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{metrics.lowStockCount}</h3>
            <p className={`text-[10px] font-bold mt-1 uppercase ${metrics.lowStockCount > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-gray-400 dark:text-slate-500'}`}>
              {metrics.lowStockCount > 0 ? 'Needs reordering soon' : 'All items sufficiently stocked'}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Card 4: Out of Stock */}
        <div className={`relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Out of Stock</span>
            <div className={`p-2 ${metrics.outOfStockCount > 0 ? 'bg-rose-50 dark:bg-rose-500/10' : 'bg-gray-50 dark:bg-white/5'} rounded-xl`}>
              <AlertOctagon className={`w-5 h-5 ${metrics.outOfStockCount > 0 ? 'text-rose-600 dark:text-rose-400 animate-bounce' : 'text-gray-400'}`} />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{metrics.outOfStockCount}</h3>
            <p className={`text-[10px] font-bold mt-1 uppercase ${metrics.outOfStockCount > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-gray-400 dark:text-slate-500'}`}>
              {metrics.outOfStockCount > 0 ? 'Urgent action required' : 'No critical outages'}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* ── Main Details Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3 width): Reorder Planner & Alerts List */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Stock Alerts & Reorder Recommender</h4>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Automatic purchase recommendations based on stock level depletion.</p>
            </div>
            
            {/* Search filter */}
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

          {/* Table Container */}
          <div className="flex-1 overflow-x-auto">
            {filteredAlerts.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-slate-950/20 border border-dashed border-gray-100 dark:border-white/5 rounded-xl">
                <ShoppingBag className="w-8 h-8 text-gray-300 dark:text-slate-700 mx-auto mb-2" />
                <p className="text-xs font-bold text-gray-400 dark:text-slate-500">No stock alerts found matching filters.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-white/5 text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                    <th className="pb-3 pr-2">Product</th>
                    <th className="pb-3 px-2">SKU / Category</th>
                    <th className="pb-3 px-2">Stock Level</th>
                    <th className="pb-3 px-2">Recommended PO</th>
                    <th className="pb-3 px-2 text-right">Est. Cost</th>
                    <th className="pb-3 pl-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                  {filteredAlerts.map(alert => {
                    const status = alert.status === 'out_of_stock' ? 'Out' : 'Low';
                    const isOrdered = reorderStatus[alert.id] === 'ordered';
                    const estCost = alert.suggestedReorder * alert.price;
                    
                    return (
                      <tr key={alert.id} className="text-xs group hover:bg-gray-50/40 dark:hover:bg-white/2">
                        <td className="py-3.5 pr-2 font-bold text-gray-900 dark:text-white">
                          <span className="line-clamp-1">{alert.name}</span>
                        </td>
                        <td className="py-3.5 px-2">
                          <div className="font-mono text-[10px] text-gray-500 dark:text-slate-400">{alert.sku}</div>
                          <div className="text-[10px] font-bold text-gray-400 mt-0.5">{alert.categoryName}</div>
                        </td>
                        <td className="py-3.5 px-2">
                          <div className="flex items-center gap-1.5">
                            <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                              alert.status === 'out_of_stock' ? 'bg-rose-500 animate-ping' : 'bg-amber-500 animate-pulse'
                            }`} />
                            <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                              alert.status === 'out_of_stock' 
                                ? 'bg-rose-500/10 text-rose-500' 
                                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                            }`}>
                              {alert.quantity} Units ({status})
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-2 font-bold text-gray-800 dark:text-slate-300">
                          +{alert.suggestedReorder} units
                        </td>
                        <td className="py-3.5 px-2 font-mono font-bold text-gray-900 dark:text-white text-right">
                          ${estCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="py-3.5 pl-2 text-right">
                          <Button
                            size="sm"
                            variant={isOrdered ? 'secondary' : 'primary'}
                            onClick={() => handleMockReorder(alert.id)}
                            disabled={isOrdered}
                          >
                            {isOrdered ? 'PO Raised' : 'Reorder'}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Column (1/3 width): Category Valuation Share & Recent restocks */}
        <div className="space-y-6">
          
          {/* Category Valuation Breakdown */}
          <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-violet-50 dark:bg-violet-500/10 rounded-lg">
                <Layers className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Stock by Category</h4>
                <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-0.5">Asset allocation percentages</p>
              </div>
            </div>

            {/* Slices list */}
            <div className="space-y-4">
              {categoryBreakdown.map((cat, i) => {
                const colors = [
                  'bg-violet-500', 'bg-emerald-500', 'bg-blue-500', 
                  'bg-amber-500', 'bg-rose-500', 'bg-pink-500', 
                  'bg-cyan-500', 'bg-indigo-500'
                ];
                const activeColor = colors[i % colors.length];

                return (
                  <div key={cat.id} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-gray-800 dark:text-slate-300">{cat.name}</span>
                      <span className="text-gray-500 dark:text-slate-400 font-mono text-[10px]">
                        ${cat.value.toLocaleString()} ({cat.percentageOfValue}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-50 dark:bg-slate-950/60 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${activeColor} rounded-full transition-all duration-1000`} 
                        style={{ width: `${cat.percentageOfValue}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[9px] text-gray-400 dark:text-slate-500 font-bold">
                      <span>{cat.productCount} SKUs</span>
                      <span>{cat.itemCount} items</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recently Added Inventory */}
          <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-sky-50 dark:bg-sky-500/10 rounded-lg">
                <TrendingUp className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              </div>
              <div>
                <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight">Recent Additions</h4>
                <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 mt-0.5">Newly introduced product cataloging</p>
              </div>
            </div>

            <div className="space-y-3.5">
              {recentAdditions.map(item => (
                <div key={item.id} className="flex justify-between items-start text-xs border-b border-gray-50 dark:border-white/2 pb-3 last:border-0 last:pb-0">
                  <div className="max-w-[70%]">
                    <p className="font-bold text-gray-800 dark:text-slate-200 line-clamp-1">{item.name}</p>
                    <p className="text-[10px] text-gray-400 dark:text-slate-500 font-mono mt-0.5">
                      Added: {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-gray-900 dark:text-white">${Number(item.price).toFixed(2)}</span>
                    <span className="block text-[9px] font-bold text-gray-500 dark:text-slate-400 mt-0.5">Qty: {item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
