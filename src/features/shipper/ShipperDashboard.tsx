import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Truck, LogOut, ArrowLeft, PackageCheck, MapPin,
  Loader2, CheckCircle, Clock, RefreshCw, TrendingUp, Package, Hash, Sun, Moon
} from 'lucide-react';
import { useShipper } from '../../context/ShipperContext';

import { useTheme } from '../../context/ThemeContext';
import { Button, Card, Badge } from '../../shared/ui';

interface ShipperDashboardProps {
  onBackToStore: () => void;
  onSignOut: () => void;
}

type StatPeriod = 'day' | 'week' | 'month' | 'year' | 'all';

function StatCard({
  label, value, sub, icon: Icon, iconBg, loading,
}: {
  label: string; value: string | number; sub?: string;
  icon: any; iconBg: string; loading: boolean;
}) {
  return (
    <Card padding="sm" className="flex flex-col gap-2 shadow-sm dark:shadow-none">
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
    </Card>
  );
}

export function ShipperDashboard({ onBackToStore, onSignOut }: ShipperDashboardProps) {
  const { theme, toggleTheme } = useTheme();
  const {
    readyOrders, isFetchingOrders, fetchReadyOrders, updateOrderStatus,
    shipperStats, isFetchingStats, fetchShipperStats,
  } = useShipper();


  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [statsPeriod, setStatsPeriod] = useState<StatPeriod>('all');

  useEffect(() => {
    fetchReadyOrders();
  }, [fetchReadyOrders]);

  useEffect(() => {
    fetchShipperStats(statsPeriod);
  }, [fetchShipperStats, statsPeriod]);

  const handleStatusChange = async (orderId: string, newStatus: 'shipped' | 'delivered') => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      fetchShipperStats(statsPeriod);
    } finally {
      setUpdatingId(null);
    }
  };

  const s = shipperStats;
  const loading = isFetchingStats;

  return (
    <div className="min-h-screen flex font-sans bg-gray-50 dark:bg-slate-950 transition-colors duration-500">
      {/* ── Sidebar (desktop) ── */}
      <aside
        className="hidden md:flex w-72 flex-col fixed h-full z-20 shadow-2xl overflow-y-auto bg-white dark:bg-[#0c1a2e]/95 dark:backdrop-blur-xl border-r border-gray-100 dark:border-white/5 transition-colors"
      >
        <div className="p-7 pb-5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-md opacity-60" />
              <div className="relative p-2.5 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl">
                <Truck className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tight leading-none transition-colors">Shipper</h1>
              <span className="text-xs font-bold text-blue-600 dark:text-cyan-400 tracking-widest uppercase transition-colors">Portal</span>
            </div>
          </div>
        </div>

        <div className="mx-4 mb-6 space-y-3">
          <div className="flex items-center justify-between mb-1 px-1">
            <p className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Delivery Stats</p>
            <div className="flex items-center gap-2">
              <select
                value={statsPeriod}
                onChange={e => setStatsPeriod(e.target.value as StatPeriod)}
                className="bg-transparent border-none text-xs text-gray-400 dark:text-slate-400 font-bold outline-none cursor-pointer hover:text-blue-600 dark:hover:text-white transition-colors"
              >
                <option value="day" className="text-slate-900">Today</option>
                <option value="week" className="text-slate-900">This Week</option>
                <option value="month" className="text-slate-900">This Month</option>
                <option value="year" className="text-slate-900">This Year</option>
                <option value="all" className="text-slate-900">All Time</option>
              </select>
              <button
                onClick={() => fetchShipperStats(statsPeriod)}
                disabled={loading}
                className="p-1 text-gray-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-slate-300 transition-colors disabled:opacity-40"
                title="Refresh stats"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Ready" value={s?.readyOrders ?? '—'} sub="awaiting pickup" icon={Clock} iconBg="bg-amber-500" loading={loading} />
            <StatCard label="Shipped" value={s?.shippedOrders ?? '—'} sub="in transit" icon={Truck} iconBg="bg-blue-500" loading={loading} />
            <StatCard label="Delivered" value={s?.deliveredOrders ?? '—'} sub="completed" icon={CheckCircle} iconBg="bg-emerald-500" loading={loading} />
            <StatCard label="Handled" value={s?.totalHandled ?? '—'} sub="total" icon={TrendingUp} iconBg="bg-cyan-500" loading={loading} />
          </div>

          {!loading && s && (
            <Card padding="sm" variant="glass" className="flex items-center justify-between mt-1 transition-colors">
              <div>
                <p className="text-[10px] text-gray-400 dark:text-slate-400 font-bold uppercase tracking-wide transition-colors">Active Queue</p>
                <p className="text-lg font-black text-gray-900 dark:text-white transition-colors">
                  {s.readyOrders}{' '}
                  <span className="text-gray-400 dark:text-slate-500 text-[10px] font-bold uppercase">waiting</span>
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Package className="w-4 h-4 text-amber-500" />
              </div>
            </Card>
          )}
        </div>

        <div className="mt-auto p-4 mx-4 mb-6 space-y-1.5 border-t border-gray-100 dark:border-white/10 pt-6 shrink-0 transition-colors">
          <Button variant="ghost" className="w-full justify-start" onClick={toggleTheme} leftIcon={theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}>
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>

          <Button variant="ghost" className="w-full justify-start" onClick={onBackToStore} leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Store
          </Button>

          <Button variant="ghost" className="w-full justify-start text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10" onClick={onSignOut} leftIcon={<LogOut className="w-4 h-4" />}>
            Sign Out
          </Button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 md:ml-72 min-h-screen flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden p-4 flex justify-between items-center sticky top-0 z-30 shadow-lg bg-white dark:bg-[#0c1a2e] border-b border-gray-100 dark:border-white/5 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-blue-500 rounded-xl"><Truck className="w-4 h-4 text-white" /></div>
            <span className="font-black text-base text-gray-900 dark:text-white transition-colors">Shipper Portal</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
            </Button>
            <Button size="sm" onClick={onBackToStore}>Exit</Button>
          </div>
        </header>

        {/* Page header */}
        <div className="px-4 md:px-8 pt-8 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Orders Ready for Delivery</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and update the status of ready and shipped orders.</p>
          </div>
          <Button
            variant="secondary"
            onClick={() => { fetchReadyOrders(); fetchShipperStats(statsPeriod); }}
            isLoading={isFetchingOrders || isFetchingStats}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Sync Data
          </Button>
        </div>

        {/* Order grid */}
        <main className="flex-1 px-4 md:px-8 pb-8">
          {isFetchingOrders ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Loading routes...</p>
            </div>
          ) : readyOrders.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="inline-flex p-4 bg-gray-50 rounded-full mb-4">
                <PackageCheck className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-xl font-black text-gray-900">All Caught Up!</h3>
              <p className="text-gray-500 mt-2 max-w-sm mx-auto">There are no orders waiting for delivery right now.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {readyOrders.map(order => (
                  <Card key={order.id} padding="none" layout className="flex flex-col shadow-sm hover:shadow-md transition-all">
                    <div className="p-5 flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-1">Order ID</span>
                          <span className="text-sm font-bold text-gray-900 dark:text-white font-mono bg-gray-50 dark:bg-slate-800 px-2 py-1 rounded-lg">
                            #{order.id.slice(0, 8)}
                          </span>
                        </div>
                        <Badge color={order.status === 'ready' ? 'amber' : 'sky'}>{order.status}</Badge>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2 text-gray-700 dark:text-gray-300">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span className="font-bold text-sm">Delivery Address</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-800 p-3 rounded-xl border border-gray-100 dark:border-slate-700">
                          {order.shipping_address}
                        </p>
                        {order.user_phone && (
                          <div className="mt-2 flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-3 py-2 rounded-xl border border-blue-100 dark:border-blue-900/50">
                            <Hash className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-black text-blue-700 dark:text-blue-300">{order.user_phone}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <span className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-2">
                          Items ({order.items.length})
                        </span>
                        <div className="space-y-2">
                          {order.items.map(item => (
                            <div key={item.id} className="flex items-center gap-3 text-sm">
                              <img src={item.image_url} alt={item.name} className="w-8 h-8 rounded-lg object-cover bg-gray-100 dark:bg-slate-800" />
                              <span className="flex-1 font-medium text-gray-700 dark:text-gray-300 truncate">{item.name}</span>
                              <span className="font-bold text-gray-900 dark:text-white">x{item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800 flex gap-2">
                      {order.status === 'ready' && (
                        <Button
                          className="flex-1"
                          onClick={() => handleStatusChange(order.id, 'shipped')}
                          isLoading={updatingId === order.id}
                          leftIcon={<Truck className="w-4 h-4" />}
                        >
                          Mark as Shipped
                        </Button>
                      )}
                      {order.status === 'shipped' && (
                        <Button
                          className="flex-1 bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20"
                          onClick={() => handleStatusChange(order.id, 'delivered')}
                          isLoading={updatingId === order.id}
                          leftIcon={<CheckCircle className="w-4 h-4" />}
                        >
                          Mark as Delivered
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </AnimatePresence>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
