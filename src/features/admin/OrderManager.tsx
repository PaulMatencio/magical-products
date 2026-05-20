/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, Fragment } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAdmin } from '../../context/AdminContext';
import {
  Loader2, Package, Clock, CheckCircle, Truck, Filter, Calendar,
  ChevronDown, ChevronUp, MapPin, CreditCard, ShoppingBag, ArrowUpDown,
  TrendingUp, RefreshCw, Hash, Sun, Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Order } from '../../types/types';

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS = {
  pending: { label: 'Pending', bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-900/30', dot: 'bg-amber-400', icon: Clock },
  accepted: { label: 'Accepted', bg: 'bg-sky-50 dark:bg-sky-900/20', text: 'text-sky-700 dark:text-sky-400', border: 'border-sky-200 dark:border-sky-900/30', dot: 'bg-sky-500', icon: CheckCircle },
  ready: { label: 'Ready', bg: 'bg-indigo-50 dark:bg-indigo-900/20', text: 'text-indigo-700 dark:text-indigo-400', border: 'border-indigo-200 dark:border-indigo-900/30', dot: 'bg-indigo-500', icon: Package },
  shipped: { label: 'Shipped', bg: 'bg-violet-50 dark:bg-violet-900/20', text: 'text-violet-700 dark:text-violet-400', border: 'border-violet-200 dark:border-violet-900/30', dot: 'bg-violet-500', icon: Truck },
  delivered: { label: 'Delivered', bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-900/30', dot: 'bg-emerald-500', icon: CheckCircle },
} as const;

type StatusKey = keyof typeof STATUS;

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS[status as StatusKey] ?? STATUS.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase border ${cfg.bg} ${cfg.text} ${cfg.border} transition-colors`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

// ── Sort helper ───────────────────────────────────────────────────────────────
function SortTh({ label, field, current, dir, onToggle }: {
  label: string; field: string; current: string; dir: 'asc' | 'desc'; onToggle: () => void;
}) {
  const active = current === field;
  return (
    <th
      className={`px-6 py-4 cursor-pointer select-none transition-colors ${active ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-300'}`}
      onClick={onToggle}
    >
      <div className="flex items-center gap-1.5 font-black text-[10px] uppercase tracking-widest">
        {label}
        <ArrowUpDown className={`w-3 h-3 transition-opacity ${active ? 'opacity-100' : 'opacity-40'}`} />
        {active && <span className="text-xs leading-none">{dir === 'asc' ? '↑' : '↓'}</span>}
      </div>
    </th>
  );
}

export function OrderManager() {
  const { theme } = useTheme();
  const { adminOrders: allOrders, isFetchingAdminOrders: isFetchingOrders, fetchAllOrders, updateOrderStatus } = useAdmin();


  const [filterStatus, setFilterStatus] = useState<StatusKey | 'all'>('all');
  const [sortField, setSortField] = useState<keyof Order>('created_at');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => { fetchAllOrders(); }, [fetchAllOrders]);

  const handleStatusUpdate = async (id: string, s: Order['status']) => {

    setUpdatingId(id);
    await updateOrderStatus(id, s);
    setUpdatingId(null);
  };

  const toggleSort = (f: keyof Order) => {
    if (sortField === f) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortField(f); setSortDir('desc'); }
  };

  const filtered = (allOrders || [])
    .filter(o => filterStatus === 'all' || o.status === filterStatus)
    .sort((a, b) => {
      const va = a[sortField];
      const vb = b[sortField];
      if (va === undefined || vb === undefined) return 0;
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

  const stats = {
    total: (allOrders || []).length,
    pending: (allOrders || []).filter(o => o.status === 'pending').length,
    ready: (allOrders || []).filter(o => o.status === 'ready').length,
    delivered: (allOrders || []).filter(o => o.status === 'delivered').length,
  };

  if (isFetchingOrders && allOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium transition-colors">Loading global orders…</p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

      {/* ── Header & Stats ── */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-pink-600 dark:from-violet-400 dark:to-pink-400">
            Order Management
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 transition-colors">Track and fulfill customer orders globally.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            { label: 'All', value: stats.total, icon: ShoppingBag, color: 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400' },
            { label: 'Pending', value: stats.pending, icon: Clock, color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
            { label: 'Ready', value: stats.ready, icon: Package, color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' },
            { label: 'Done', value: stats.delivered, icon: CheckCircle, color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' },
          ].map(s => (
            <div key={s.label} className={`${s.color} px-4 py-2.5 rounded-2xl flex items-center gap-3 border border-transparent transition-colors`}>
              <s.icon className="w-4 h-4 opacity-70" />
              <div className="flex flex-col leading-none">
                <span className="text-lg font-black">{s.value}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Filters & Main Table ── */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">

        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 dark:border-slate-800 bg-gray-50/40 dark:bg-slate-800/20 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0 w-full md:w-auto">
            <Filter className="w-4 h-4 text-gray-400 dark:text-slate-500 shrink-0" />
            {(['all', ...Object.keys(STATUS)] as const).map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s as StatusKey | 'all')}

                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${filterStatus === s ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/20' : 'text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            onClick={() => fetchAllOrders()}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetchingOrders ? 'animate-spin' : ''}`} />
            Sync Data
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 dark:bg-slate-800/40 border-b border-gray-100 dark:border-slate-800 transition-colors">
                <th className="w-12 px-6 py-4"></th>
                <SortTh label="Order ID" field="id" current={sortField} dir={sortDir} onToggle={() => toggleSort('id')} />
                <SortTh label="Date" field="created_at" current={sortField} dir={sortDir} onToggle={() => toggleSort('created_at')} />
                <SortTh label="User" field="user_id" current={sortField} dir={sortDir} onToggle={() => toggleSort('user_id')} />
                <SortTh label="Total" field="total_price" current={sortField} dir={sortDir} onToggle={() => toggleSort('total_price')} />
                <SortTh label="Status" field="status" current={sortField} dir={sortDir} onToggle={() => toggleSort('status')} />
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <AnimatePresence mode="popLayout">
              {filtered.map((order) => {
                const isExpanded = expandedId === order.id;
                return (
                  <motion.tbody
                    key={order.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`border-b border-gray-50 dark:border-slate-800 transition-colors ${isExpanded ? 'bg-indigo-50/30 dark:bg-indigo-900/5' : ''}`}
                  >
                    <tr
                      className="group hover:bg-indigo-50/20 dark:hover:bg-indigo-900/10 transition-colors cursor-pointer"
                      onClick={() => setExpandedId(isExpanded ? null : order.id)}
                    >
                      <td className="px-6 py-4">
                        <div className={`p-1 rounded-lg transition-colors ${isExpanded ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400' : 'text-gray-300 dark:text-slate-600'}`}>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-800 px-2 py-1 rounded-lg transition-colors">#{order.id.slice(0, 8)}</span>
                          {updatingId === order.id && <Loader2 className="w-3 h-3 text-indigo-500 animate-spin" />}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-slate-400 transition-colors">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 opacity-40" />
                          {new Date(order.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-slate-400 transition-colors truncate max-w-[120px]">
                        {order.user_email || order.user_id.slice(0, 12)}...
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-black text-gray-900 dark:text-white text-sm transition-colors">${(order.total_price || 0).toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          {/* Context-aware action button */}
                          {order.status === 'pending' && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleStatusUpdate(order.id, 'accepted'); }}
                              className="px-3 py-1.5 bg-sky-500 text-white text-[10px] font-black uppercase rounded-lg hover:bg-sky-600 transition-all active:scale-95"
                            >
                              Accept
                            </button>
                          )}
                          {order.status === 'accepted' && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleStatusUpdate(order.id, 'ready'); }}
                              className="px-3 py-1.5 bg-indigo-500 text-white text-[10px] font-black uppercase rounded-lg hover:bg-indigo-600 transition-all active:scale-95"
                            >
                              Ready
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* ── Expanded Content ── */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="bg-gray-50/50 dark:bg-slate-800/20 transition-colors"
                        >
                          <td colSpan={7} className="px-12 py-8">
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="grid grid-cols-1 lg:grid-cols-2 gap-10 overflow-hidden"
                            >
                              {/* Left: Items */}
                              <div>
                                <div className="flex items-center gap-2 mb-4">
                                  <ShoppingBag className="w-4 h-4 text-indigo-500" />
                                  <h4 className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Items in this order</h4>
                                </div>
                                <div className="space-y-3">
                                  {order.items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-gray-100 dark:border-slate-800 transition-colors">
                                      <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-slate-800 overflow-hidden shrink-0 transition-colors">
                                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-sm font-bold text-gray-900 dark:text-white transition-colors">{item.name}</p>
                                        <p className="text-xs text-gray-400 dark:text-slate-500 transition-colors">Unit: ${item.price.toFixed(2)}</p>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-sm font-black text-indigo-600 dark:text-indigo-400 transition-colors">x{item.quantity}</p>
                                        <p className="text-xs font-bold text-gray-900 dark:text-white transition-colors">${(item.price * item.quantity).toFixed(2)}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Right: Delivery & Details */}
                              <div className="space-y-6">
                                <div>
                                  <div className="flex items-center gap-2 mb-4">
                                    <MapPin className="w-4 h-4 text-rose-500" />
                                    <h4 className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Delivery Address</h4>
                                  </div>
                                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
                                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed transition-colors">
                                      {order.shipping_address || 'No address provided.'}
                                    </p>
                                    {order.user_phone && (
                                      <div className="mt-3 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-xs transition-colors">
                                        <Hash className="w-3.5 h-3.5" />
                                        {order.user_phone}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-4 rounded-2xl border border-indigo-100/50 dark:border-indigo-900/30 transition-colors">
                                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1 transition-colors">
                                      <CreditCard className="w-3.5 h-3.5" />
                                      <span className="text-[10px] font-black uppercase tracking-wider">Payment Method</span>
                                    </div>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white transition-colors">{order.payment_method || 'Stripe'}</p>
                                  </div>
                                  <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-4 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30 transition-colors">
                                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1 transition-colors">
                                      <TrendingUp className="w-3.5 h-3.5" />
                                      <span className="text-[10px] font-black uppercase tracking-wider">Revenue Share</span>
                                    </div>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white transition-colors">${((order.total_price || 0) * 0.85).toFixed(2)}</p>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </motion.tbody>
                );
              })}
            </AnimatePresence>
          </table>

          {filtered.length === 0 && (
            <div className="py-20 flex flex-col items-center gap-3 text-gray-400 dark:text-slate-500 transition-colors">
              <ShoppingBag className="w-12 h-12 text-gray-200 dark:text-slate-800 transition-colors" />
              <p className="font-black text-gray-500 dark:text-slate-400 uppercase tracking-widest transition-colors">No orders found</p>
              <p className="text-xs">Adjust your status filter or sync with the server.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50/40 dark:bg-slate-800/20 border-t border-gray-100 dark:border-slate-800 text-[10px] text-gray-400 dark:text-slate-500 font-black uppercase tracking-wider transition-colors">
          Displaying <span className="text-indigo-600 dark:text-indigo-400 font-black">{filtered.length}</span> orders
        </div>
      </div>
    </motion.div>
  );
}
