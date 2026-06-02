import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BarChart3, LogOut, ArrowLeft, Sun, Moon,
  DollarSign, Users, Package, Truck, RotateCcw,
  Headphones, Megaphone, Shield, AlertTriangle, LayoutDashboard
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../../shared/ui';
import { SalesRevenuePanel } from './components/SalesRevenuePanel';
import { InventoryStockPanel } from './components/InventoryStockPanel';
import { TrafficConversionPanel } from './components/TrafficConversionPanel';
import { ExecutivePanel } from './components/ExecutivePanel';
import { FulfillmentShippingPanel } from './components/FulfillmentShippingPanel';
import { ReturnsRefundsPanel } from './components/ReturnsRefundsPanel';
import { PaymentFraudPanel } from './components/PaymentFraudPanel';
import { CustomerServicePanel } from './components/CustomerServicePanel';
import { MarketingPanel } from './components/MarketingPanel';
import { OperationsPanel } from './components/OperationsPanel';

interface OwnerDashboardProps {
  onBackToStore: () => void;
  onSignOut: () => void;
}

/**
 * 10 metric categories for the Business Owner dashboard.
 * Each category will be implemented with specific KPIs and visualizations.
 */
const CATEGORIES = [
  { id: 'executive',       label: 'Executive',           icon: LayoutDashboard, color: 'from-violet-500 to-purple-600', accent: 'violet' },
  { id: 'sales_revenue',   label: 'Sales & Revenue',     icon: DollarSign,      color: 'from-emerald-500 to-green-600', accent: 'emerald' },
  { id: 'traffic',         label: 'Traffic & Conversion', icon: Users,          color: 'from-blue-500 to-cyan-600',     accent: 'blue' },
  { id: 'inventory',       label: 'Inventory & Stock',    icon: Package,        color: 'from-amber-500 to-orange-600',  accent: 'amber' },
  { id: 'fulfillment',     label: 'Fulfillment & Shipping', icon: Truck,       color: 'from-sky-500 to-blue-600',      accent: 'sky' },
  { id: 'returns',         label: 'Returns & Refunds',    icon: RotateCcw,      color: 'from-rose-500 to-pink-600',     accent: 'rose' },
  { id: 'customer',        label: 'Customer Service',     icon: Headphones,     color: 'from-teal-500 to-cyan-600',     accent: 'teal' },
  { id: 'marketing',       label: 'Marketing & ROI',      icon: Megaphone,      color: 'from-fuchsia-500 to-purple-600', accent: 'fuchsia' },
  { id: 'payment_fraud',   label: 'Payment & Fraud',      icon: Shield,         color: 'from-indigo-500 to-blue-600',   accent: 'indigo' },
  { id: 'operations',      label: 'Operations',           icon: AlertTriangle,  color: 'from-orange-500 to-red-600',    accent: 'orange' },
] as const;

type CategoryId = typeof CATEGORIES[number]['id'];

/**
 * Panel component for each metric category.
 */
function CategoryPanel({ 
  category, 
  timeframe, 
  onNavigateToTab 
}: { 
  category: typeof CATEGORIES[number]; 
  timeframe: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'; 
  onNavigateToTab: (tabId: CategoryId) => void;
}) {
  const Icon = category.icon;

  if (category.id === 'executive') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <ExecutivePanel period={timeframe} onNavigateToTab={onNavigateToTab} />
      </motion.div>
    );
  }

  if (category.id === 'sales_revenue') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <SalesRevenuePanel period={timeframe} />
      </motion.div>
    );
  }

  if (category.id === 'inventory') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <InventoryStockPanel />
      </motion.div>
    );
  }

  if (category.id === 'traffic') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <TrafficConversionPanel period={timeframe} />
      </motion.div>
    );
  }

  if (category.id === 'fulfillment') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <FulfillmentShippingPanel period={timeframe} />
      </motion.div>
    );
  }

  if (category.id === 'returns') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <ReturnsRefundsPanel period={timeframe} />
      </motion.div>
    );
  }

  if (category.id === 'payment_fraud') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <PaymentFraudPanel period={timeframe} />
      </motion.div>
    );
  }

  if (category.id === 'customer') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <CustomerServicePanel period={timeframe} />
      </motion.div>
    );
  }

  if (category.id === 'marketing') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <MarketingPanel period={timeframe} />
      </motion.div>
    );
  }

  if (category.id === 'operations') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <OperationsPanel period={timeframe} />
      </motion.div>
    );
  }

  const fallbackCategory = category as any;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="space-y-6"
    >
      {/* Category Header */}
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-2xl bg-gradient-to-br ${fallbackCategory.color} shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
            {fallbackCategory.label}
          </h3>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">
            Key metrics and templates will be configured here.
          </p>
        </div>
      </div>

      {/* Placeholder Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="relative overflow-hidden bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-[1rem] p-5 transition-colors group hover:border-gray-200 dark:hover:border-white/10"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-3 w-20 bg-gray-100 dark:bg-white/5 rounded-full animate-pulse" />
              <div className="h-6 w-6 bg-gray-50 dark:bg-white/5 rounded-lg animate-pulse" />
            </div>
            <div className="h-8 w-24 bg-gray-100 dark:bg-white/5 rounded-lg animate-pulse mb-2" />
            <div className="h-2.5 w-16 bg-gray-50 dark:bg-white/5 rounded-full animate-pulse" />
            {/* Decorative gradient line */}
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${fallbackCategory.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
          </div>
        ))}
      </div>

      {/* Placeholder Chart Area */}
      <div className="bg-white dark:bg-slate-900/60 border border-gray-100 dark:border-white/5 rounded-[1rem] p-6 transition-colors">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-4 w-32 bg-gray-100 dark:bg-white/5 rounded-lg animate-pulse mb-2" />
            <div className="h-3 w-48 bg-gray-50 dark:bg-white/5 rounded-full animate-pulse" />
          </div>
          <div className="flex gap-2">
            {['D', 'W', 'M', 'Q', 'Y'].map(p => (
              <div key={p} className="px-3 py-1.5 bg-gray-50 dark:bg-white/5 rounded-lg text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase">
                {p}
              </div>
            ))}
          </div>
        </div>
        <div className="h-48 flex items-end justify-between gap-2 px-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 bg-gradient-to-t ${fallbackCategory.color} rounded-t-lg opacity-20 animate-pulse`}
              style={{
                height: `${Math.max(15, Math.random() * 100)}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-3 px-4">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
            <span key={m} className="text-[9px] font-bold text-gray-300 dark:text-slate-600 uppercase">{m}</span>
          ))}
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-gray-50 dark:bg-slate-900/40 border border-dashed border-gray-200 dark:border-white/10 rounded-[1rem] p-8 text-center transition-colors">
        <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${fallbackCategory.color} mb-4 shadow-lg`}>
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <h4 className="text-base font-black text-gray-700 dark:text-slate-300 mb-1">
          Metrics Coming Soon
        </h4>
        <p className="text-sm text-gray-500 dark:text-slate-500 max-w-md mx-auto">
          Detailed KPIs, charts, and templates for <strong>{fallbackCategory.label}</strong> will be
          implemented in the next phase. The data pipeline and visualization components
          are ready to be wired up.
        </p>
      </div>
    </motion.div>
  );
}


export function OwnerDashboard({ onBackToStore, onSignOut }: OwnerDashboardProps) {
  const { theme, toggleTheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<CategoryId>('executive');
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'>('daily');

  const currentCategory = CATEGORIES.find(c => c.id === activeCategory)!;

  return (
    <div className="min-h-screen flex font-sans bg-gray-50 dark:bg-slate-950 transition-colors duration-500">
      {/* ── Sidebar (desktop) ── */}
      <aside
        className="hidden lg:flex w-72 flex-col fixed h-full z-20 shadow-2xl overflow-y-auto bg-white dark:bg-[#0c1a2e]/95 dark:backdrop-blur-xl border-r border-gray-100 dark:border-white/5 transition-colors"
      >
        {/* Logo */}
        <div className="p-7 pb-5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-violet-500 rounded-2xl blur-md opacity-60" />
              <div className="relative p-2.5 bg-gradient-to-br from-violet-400 to-purple-600 rounded-2xl">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900 dark:text-white tracking-tight leading-none transition-colors">Business</h1>
              <span className="text-xs font-bold text-violet-600 dark:text-violet-400 tracking-widest uppercase transition-colors">Intelligence</span>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <nav className="flex-1 px-3 pb-4 space-y-0.5 overflow-y-auto">
          <p className="px-3 pt-2 pb-3 text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest transition-colors">
            Report Categories
          </p>
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-bold transition-all duration-200 group ${
                  isActive
                    ? 'bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 shadow-sm'
                    : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${
                  isActive
                    ? `bg-gradient-to-br ${cat.color} shadow-sm`
                    : 'bg-gray-100 dark:bg-white/5 group-hover:bg-gray-200 dark:group-hover:bg-white/10'
                }`}>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-400 dark:text-slate-500 group-hover:text-gray-600 dark:group-hover:text-slate-300'}`} />
                </div>
                <span className="truncate">{cat.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="owner-nav-indicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="mt-auto p-4 mx-3 mb-4 space-y-1.5 border-t border-gray-100 dark:border-white/10 pt-6 shrink-0 transition-colors">
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
      <div className="flex-1 lg:ml-72 min-h-screen flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden p-4 flex justify-between items-center sticky top-0 z-30 shadow-lg bg-white dark:bg-[#0c1a2e] border-b border-gray-100 dark:border-white/5 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-base text-gray-900 dark:text-white transition-colors">Business Intelligence</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
            </Button>
            <Button size="sm" onClick={onBackToStore}>Exit</Button>
          </div>
        </header>

        {/* Mobile Category Tabs (horizontal scroll) */}
        <div className="lg:hidden overflow-x-auto scrollbar-none border-b border-gray-100 dark:border-white/5 bg-white dark:bg-[#0c1a2e]/80 sticky top-[57px] z-20">
          <div className="flex gap-1 p-2 min-w-max">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300'
                      : 'text-gray-400 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Page Content */}
        <div className="px-4 lg:px-8 pt-8 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                {currentCategory.label}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                Monitor performance, spot issues and optimize your business operations.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {['daily', 'weekly', 'monthly', 'quarterly', 'yearly'].map(period => {
                const isActive = timeframe === period;
                return (
                  <button
                    key={period}
                    onClick={() => setTimeframe(period as any)}
                    className={`px-3 py-1.5 border rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                        : 'bg-white dark:bg-slate-900/60 border-gray-100 dark:border-white/5 text-gray-500 dark:text-slate-400 hover:border-violet-300 dark:hover:border-violet-500/30 hover:text-violet-600 dark:hover:text-violet-400'
                    }`}
                  >
                    {period}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Panel */}
          <AnimatePresence mode="wait">
            <CategoryPanel 
              key={activeCategory} 
              category={currentCategory} 
              timeframe={timeframe} 
              onNavigateToTab={setActiveCategory}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
