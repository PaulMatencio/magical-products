/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Package, ShoppingBag, ArrowLeft, LogOut, ShieldCheck,
  ChevronRight, TrendingUp, AlertCircle, Clock, CheckCircle, Loader2, RefreshCw, Sun, Moon, Store, Database, XCircle
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAdmin } from '../../context/AdminContext';
import { useNavigation } from '../../context/NavigationContext';

import { InventoryManager } from './InventoryManager';
import { OrderManager } from './OrderManager';
import { RetailerManager } from './RetailerManager';

interface AdminDashboardProps {
  onBackToStore: () => void;
  onSignOut: () => void;
}

type TabId = 'inventory' | 'orders' | 'retailer';

const TABS = [
  { id: 'inventory' as TabId, label: 'Inventory',       icon: Package,     gradient: 'from-indigo-500 to-violet-600' },
  { id: 'orders'    as TabId, label: 'Global Orders',   icon: ShoppingBag, gradient: 'from-violet-500 to-pink-500' },
  { id: 'retailer'  as TabId, label: 'Retailer Profile', icon: Store,       gradient: 'from-emerald-500 to-teal-600' },
];

function StatCard({ label, value, sub, icon: Icon, iconBg, loading }: {
  label: string; value: string | number; sub?: string;
  icon: any; iconBg: string; loading: boolean;
}) {
  return (
    <div className="bg-card text-card-foreground border border-gray-100 dark:border-white/10 rounded-2xl p-4 flex flex-col gap-2 transition-colors shadow-sm dark:shadow-none">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400 dark:text-slate-400 font-bold uppercase tracking-wide transition-colors">{label}</p>
        <div className={`p-1.5 rounded-lg ${iconBg}`}>
          <Icon className="w-3.5 h-3.5 text-white" />
        </div>
      </div>
      {loading ? (
        <div className="h-7 w-12 bg-gray-100 dark:bg-white/10 rounded animate-pulse" />
      ) : (
        <p className="text-2xl font-black text-gray-900 dark:text-white leading-none transition-colors">{value}</p>
      )}
      {sub && <p className="text-xs font-medium text-gray-400 dark:text-slate-500 transition-colors">{sub}</p>}
    </div>
  );
}

export function AdminDashboard({ onBackToStore, onSignOut }: AdminDashboardProps) {
  const { theme, toggleTheme } = useTheme();
  const { navigateTo } = useNavigation();
  const { dashboardStats, isFetchingStats, fetchDashboardStats } = useAdmin();

  const [activeTab, setActiveTab] = useState<TabId>('inventory');
  const [statsPeriod, setStatsPeriod] = useState<'day' | 'week' | 'month' | 'year' | 'all'>('all');

  useEffect(() => {
    fetchDashboardStats(statsPeriod);
  }, [fetchDashboardStats, statsPeriod]);

  const s = dashboardStats;
  const loading = isFetchingStats;

  return (
    <div className="min-h-screen flex bg-background transition-colors duration-500">
      {/* ── Sidebar (desktop) ── */}
      <aside className="hidden md:flex flex-col w-72 fixed inset-y-0 bg-card text-card-foreground border-r border-gray-100 dark:border-white/5 z-40 transition-colors shadow-2xl overflow-y-auto">

        {/* Logo */}
        <div className="p-7 pb-5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 rounded-2xl blur-md opacity-60" />
              <div className="relative p-2.5 bg-gradient-to-br from-indigo-400 to-violet-600 rounded-2xl">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight leading-none">Admin</h1>
              <span className="text-xs font-bold text-indigo-400 tracking-widest uppercase">Dashboard</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mx-4 mb-6 space-y-3">
          <div className="flex items-center justify-between mb-1 px-1">
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Live Stats</p>
            <div className="flex items-center gap-2">
              <select
                value={statsPeriod}
                onChange={e => setStatsPeriod(e.target.value as any)}
                className="bg-transparent border-none text-xs text-slate-400 font-bold outline-none cursor-pointer hover:text-white transition-colors"
              >
                <option value="day" className="text-slate-900">Today</option>
                <option value="week" className="text-slate-900">This Week</option>
                <option value="month" className="text-slate-900">This Month</option>
                <option value="year" className="text-slate-900">This Year</option>
                <option value="all" className="text-slate-900">All Time</option>
              </select>
              <button
                onClick={() => fetchDashboardStats(statsPeriod)}
                disabled={loading}
                className="p-1 text-slate-500 hover:text-slate-300 transition-colors disabled:opacity-40"
                title="Refresh stats"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Total Orders" value={s?.totalOrders ?? '—'} sub="all time" icon={ShoppingBag} iconBg="bg-indigo-500" loading={loading} />
            <StatCard label="Revenue" value={s ? `$${s.totalRevenue.toFixed(0)}` : '—'} sub="all orders" icon={TrendingUp} iconBg="bg-violet-500" loading={loading} />
            <StatCard label="Pending" value={s?.pendingOrders ?? '—'} sub="need action" icon={Clock} iconBg="bg-amber-500" loading={loading} />
            <StatCard label="Delivered" value={s?.deliveredOrders ?? '—'} sub="completed" icon={CheckCircle} iconBg="bg-emerald-500" loading={loading} />
            <StatCard label="Cancelled" value={s?.cancelledOrders ?? '—'} sub="voided" icon={XCircle} iconBg="bg-rose-600" loading={loading} />
            <StatCard label="Refunded" value={s?.refundedOrders ?? '—'} sub="returned" icon={RefreshCw} iconBg="bg-slate-500" loading={loading} />
            <StatCard label="Products" value={s?.totalProducts ?? '—'} sub="in catalog" icon={Package} iconBg="bg-sky-500" loading={loading} />
            <StatCard label="Out of Stock" value={s?.outOfStockProducts ?? '—'} sub="need restock" icon={AlertCircle} iconBg="bg-rose-500" loading={loading} />
          </div>

          {/* Recent orders badge */}
          {!loading && s && (
            <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-4 py-3 mt-1">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">Last 7 Days</p>
                <p className="text-lg font-black text-white">{s.recentOrdersLast7Days} <span className="text-slate-400 text-xs font-medium">new orders</span></p>
              </div>
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
              </div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 space-y-1.5">
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest px-3 mb-3">Navigation</p>
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${isActive ? 'text-white shadow-lg shadow-indigo-900/50' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                style={isActive ? { background: `linear-gradient(135deg, ${tab.id === 'inventory' ? '#4f46e5, #7c3aed' : '#7c3aed, #db2777'})` } : {}}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </div>
                {isActive && <ChevronRight className="w-4 h-4 opacity-70" />}
              </button>
            );
          })}
        </nav>


      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 md:ml-72 min-h-screen flex flex-col">

        {/* Mobile Header */}
        <div className="md:hidden p-4 flex justify-between items-center sticky top-0 z-30 shadow-lg bg-white dark:bg-[#0f0c29] border-b border-gray-100 dark:border-white/5 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-indigo-500 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-base text-gray-900 dark:text-white transition-colors">Admin Panel</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('operator_dashboard')}
              className="p-2 rounded-xl text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
              title="Bulk Upload"
            >
              <Database className="w-4.5 h-4.5" />
            </button>
            {activeTab !== 'inventory' && (
              <>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-xl text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
                >
                  {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
                </button>
                <button onClick={onBackToStore} className="text-[10px] font-black uppercase tracking-widest px-3 py-2 bg-indigo-50 dark:bg-white/10 text-indigo-600 dark:text-white rounded-xl hover:bg-indigo-100 dark:hover:bg-white/20 transition-all">
                  Exit
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Stats Strip */}
        <div className="md:hidden px-4 pt-4 pb-4 bg-white dark:bg-[#0f0c29] border-b border-gray-100 dark:border-white/5 transition-colors">
          <div className="flex justify-between items-center mb-3 px-1">
            <p className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Performance</p>
            <select
              value={statsPeriod}
              onChange={e => setStatsPeriod(e.target.value as any)}
              className="bg-gray-50 dark:bg-white/10 border border-gray-100 dark:border-white/10 text-[10px] font-bold text-gray-600 dark:text-white rounded-lg outline-none cursor-pointer px-2 py-1"
            >
              <option value="day" className="text-slate-900">Today</option>
              <option value="week" className="text-slate-900">This Week</option>
              <option value="month" className="text-slate-900">This Month</option>
              <option value="year" className="text-slate-900">This Year</option>
              <option value="all" className="text-slate-900">All Time</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Orders', value: s?.totalOrders ?? '—' },
              { label: 'Pending', value: s?.pendingOrders ?? '—' },
              { label: 'Revenue', value: s ? `$${s.totalRevenue.toFixed(0)}` : '—' },
            ].map(item => (
              <div key={item.label} className="bg-gray-50 dark:bg-white/10 border border-gray-100 dark:border-white/10 rounded-xl p-3 text-center transition-colors">
                {loading ? <div className="h-5 w-8 mx-auto bg-gray-200 dark:bg-white/20 rounded animate-pulse mb-1" /> : (
                  <p className="text-lg font-black text-gray-900 dark:text-white transition-colors">{item.value}</p>
                )}
                <p className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase transition-colors">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Tab Bar */}
        <div className="md:hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-gray-100 dark:border-slate-800 flex sticky top-[60px] z-20 transition-colors">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-black border-b-2 transition-colors ${isActive ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-400'}`}>
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Top Bar (desktop) */}
        {activeTab !== 'inventory' && (
          <div className="hidden md:flex items-center justify-end px-8 py-4 bg-white/40 dark:bg-slate-900/40 border-b border-gray-100 dark:border-white/5 transition-colors gap-3 shrink-0">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center p-2.5 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/80 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-2xl font-bold transition-all active:scale-95 shadow-sm cursor-pointer"
              title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
              ) : (
                <Sun className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              )}
            </button>
            <button
              onClick={onBackToStore}
              className="flex items-center justify-center p-2.5 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/80 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-2xl font-bold transition-all active:scale-95 shadow-sm cursor-pointer"
              title="Back to Store"
              aria-label="Back to Store"
            >
              <ArrowLeft className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
            </button>
            <button
              onClick={onSignOut}
              className="flex items-center justify-center p-2.5 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/30 border border-red-100 dark:border-red-950 text-red-600 dark:text-red-400 rounded-2xl font-bold transition-all active:scale-95 shadow-sm cursor-pointer"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Content */}
        <main className="flex-1 px-4 md:px-8 pb-8">
          <AnimatePresence mode="wait">
            {TABS.map(tab =>
              activeTab === tab.id ? (
                <motion.div key={tab.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                  {tab.id === 'inventory' && <InventoryManager onBackToStore={onBackToStore} onSignOut={onSignOut} />}
                  {tab.id === 'orders'    && <OrderManager />}
                  {tab.id === 'retailer'  && <RetailerManager />}
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
