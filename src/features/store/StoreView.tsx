import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingCart, History, LogOut, ShieldCheck, Truck,
  Key, Sparkles, Sun, Moon, Menu, X, RefreshCcw, Loader2, XCircle, Search, Percent, Home, Package, UserPlus, ChevronRight, Layers, User
} from "lucide-react";
import { CategorySidebar, CategoryTree } from './components/CategorySidebar';
import { AccountModal } from '../../components/AccountModal';

// Contexts
import { useAuth } from '../../context/AuthContext';
import { useInventory } from '../../context/InventoryContext';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '../../context/NavigationContext';

// Components
import { ProductList } from './components/ProductList';
import { ProductDetails } from './components/ProductDetails';
import { Product, Category } from '../../types/types';


const getCategoryDescendants = (categoryId: string, categories: Category[]): string[] => {
  const ids: string[] = [categoryId];
  const queue: string[] = [categoryId];

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    const children = categories.filter(c => c.parentId === currentId || c.parent_id === currentId);
    for (const child of children) {
      if (!ids.includes(child.id)) {
        ids.push(child.id);
        queue.push(child.id);
      }
    }
  }
  return ids;
};

export function StoreView({
  onSignOut,
  setIsRecovering,
  setIsUpgrading,
  realtimeError,
  setRealtimeError,
  showRealtimeFix,
  setShowRealtimeFix
}: {
  onSignOut: () => void,
  setIsRecovering: (v: boolean) => void,
  setIsUpgrading: (v: boolean) => void,
  realtimeError: string | null,
  setRealtimeError: (v: string | null) => void,
  showRealtimeFix: boolean,
  setShowRealtimeFix: (v: boolean) => void
}) {
  const { user, isAdmin, isShipper } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { navigateTo } = useNavigation();
  const { storeProducts, categories, brands, isLoading, fetchError, loadInventory } = useInventory();
  const { cartCount, setIsCartOpen } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string | "All">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [brandSearchTerm, setBrandSearchTerm] = useState("");
  const [showOnlyDiscounted, setShowOnlyDiscounted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  // Compute category path for breadcrumbs
  const selectedCategoryPath = React.useMemo(() => {
    if (selectedCategory === "All") return [];
    const path: Category[] = [];
    let currentId: string | undefined = selectedCategory;
    const visited = new Set<string>();

    while (currentId && !visited.has(currentId)) {
      visited.add(currentId);
      const category = categories.find(c => c.id === currentId);
      if (!category) break;
      path.unshift(category);
      currentId = category.parentId || category.parent_id;
    }
    return path;
  }, [selectedCategory, categories]);

  // Root categories (top-level)
  const rootCategories = React.useMemo(() => {
    return categories.filter(cat => !cat.parentId || cat.parentId === 'null' || !cat.parent_id || cat.parent_id === 'null');
  }, [categories]);

  // Subcategories of the currently active category (or its parent root category)
  const subCategories = React.useMemo(() => {
    if (selectedCategory === "All") return [];
    const current = categories.find(c => c.id === selectedCategory);
    if (!current) return [];

    const isRootCat = !current.parentId || current.parentId === 'null' || !current.parent_id || current.parent_id === 'null';
    const rootId = isRootCat ? current.id : (current.parentId || current.parent_id);

    return categories.filter(c => c.parentId === rootId || c.parent_id === rootId);
  }, [selectedCategory, categories]);


  if (selectedProduct) {
    return (
      <ProductDetails
        product={storeProducts.find(t => t.id === selectedProduct.id) || selectedProduct}
        onBack={() => setSelectedProduct(null)}
        onCategorySelect={(categoryId) => {
          setSelectedCategory(categoryId);
          setSelectedProduct(null);
        }}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-10 px-3 sm:px-6">
      {/* Header & Category Logic */}
      <header className="mb-6 sm:mb-10 text-center relative">
        <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 -mx-3 sm:-mx-4 px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between mb-6 sm:mb-8 transition-colors">
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 sm:hidden hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigateTo('landing')}>
              <div className="p-1.5 bg-indigo-600 rounded-lg"><Sparkles className="w-4 h-4 text-white" /></div>
              <span className="text-base sm:text-lg font-black text-gray-900 dark:text-white tracking-tight">Tots & Trends</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button onClick={toggleTheme} className="p-2 sm:p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-all">{theme === 'light' ? <Moon className="w-4.5 h-4.5 sm:w-5 sm:h-5" /> : <Sun className="w-4.5 h-4.5 sm:w-5 sm:h-5" />}</button>
            <div className="hidden sm:flex items-center gap-1.5">
              {isAdmin && <button onClick={() => navigateTo("admin_dashboard")} className="p-2.5 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all"><ShieldCheck className="w-5.5 h-5.5" /></button>}
              {isShipper && <button onClick={() => navigateTo("shipper_dashboard")} className="p-2.5 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all"><Truck className="w-5.5 h-5.5" /></button>}
              {!user?.is_anonymous && <button onClick={() => setIsRecovering(true)} className="p-2.5 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all"><Key className="w-5.5 h-5.5" /></button>}
              <button onClick={() => navigateTo('history')} className="p-2.5 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-xl transition-all"><History className="w-5.5 h-5.5" /></button>
              {/* Account button — shows for registered (non-anonymous) users */}
              {user && !user.is_anonymous && (
                <button
                  onClick={() => setIsAccountModalOpen(true)}
                  title={user.email ?? 'My Account'}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl transition-all border border-indigo-100 dark:border-indigo-800 group"
                >
                  <User className="w-4 h-4" />
                  <span className="text-xs font-black max-w-[80px] truncate hidden lg:block">{user.email?.split('@')[0]}</span>
                </button>
              )}
              <button onClick={onSignOut} className="p-2.5 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl transition-all"><LogOut className="w-5.5 h-5.5" /></button>
            </div>
            <button onClick={() => setIsCartOpen(true)} className="relative p-2 sm:p-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl shadow-lg shadow-gray-900/20 active:scale-95 transition-all">
              <ShoppingCart className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" />
              {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-indigo-500 text-white text-[9px] font-black flex items-center justify-center rounded-full ring-2 ring-white dark:ring-slate-950">{cartCount}</span>}
            </button>
          </div>
        </div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight md:text-5xl">The Collection</motion.h1>
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-lg text-gray-400 dark:text-gray-500 max-w-2xl mx-auto font-medium px-2">Discover our unique selection of products for people of all ages.</p>

        {/* Mobile: active category pill + trigger button (hidden on lg+) */}
        <div className="mt-4 flex items-center gap-2 lg:hidden">
          <button
            id="mobile-category-trigger"
            onClick={() => setIsCategorySheetOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm text-xs font-black uppercase tracking-widest text-gray-600 dark:text-gray-300 hover:border-indigo-400 hover:text-indigo-600 transition-all active:scale-95"
          >
            <Layers className="w-4 h-4 text-indigo-500" />
            Browse
          </button>
          {selectedCategory !== 'All' && (
            <div className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white rounded-2xl text-xs font-bold shadow-md shadow-indigo-500/20 max-w-[60vw] truncate">
              <span className="truncate">
                {selectedCategoryPath.map(c => c.title || c.name).join(' › ')}
              </span>
              <button onClick={() => setSelectedCategory('All')} className="shrink-0 ml-1 hover:opacity-70 transition-opacity">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="mt-4 sm:mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-center gap-3 md:gap-4 px-2 sm:px-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl sm:rounded-2xl text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all dark:text-white"
            />
          </div>

          <div className="relative flex-1 group">
            <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Search brands..."
              value={brandSearchTerm}
              onChange={(e) => setBrandSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl sm:rounded-2xl text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all dark:text-white"
            />
          </div>

          {/* Unified Sale filter for both mobile and desktop */}
          <button
            onClick={() => setShowOnlyDiscounted(!showOnlyDiscounted)}
            className={`shrink-0 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${showOnlyDiscounted
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
              : "bg-white dark:bg-slate-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-slate-700 hover:border-indigo-400"
              }`}
          >
            <Percent className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${showOnlyDiscounted ? "text-white" : "text-indigo-500"}`} />
            <span>On Sale</span>
          </button>
        </div>
      </header>

      {/* Two-column layout: sidebar + products */}
      <div className="flex gap-6 items-start">
        <CategorySidebar
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <main className="flex-1 min-w-0">
        {selectedCategory !== "All" && selectedCategoryPath.length > 0 && (
          <nav className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-gray-400 dark:text-gray-500 mb-6 bg-gray-50 dark:bg-slate-800/40 px-4 py-2.5 rounded-xl border border-gray-100 dark:border-slate-800/60 w-fit transition-colors">
            <button
              onClick={() => setSelectedCategory("All")}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>All Categories</span>
            </button>
            {selectedCategoryPath.map((cat, idx) => {
              const isLast = idx === selectedCategoryPath.length - 1;
              return (
                <React.Fragment key={cat.id}>
                  <ChevronRight className="w-3 h-3 text-gray-300 dark:text-slate-700" />
                  {isLast ? (
                    <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">
                      {cat.title || cat.name}
                    </span>
                  ) : (
                    <button
                      onClick={() => setSelectedCategory(cat.id)}
                      className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {cat.title || cat.name}
                    </button>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <p className="text-gray-500 font-medium uppercase tracking-widest text-xs">Bringing the magic...</p>
          </div>
        ) : fetchError ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white rounded-[2rem] border border-red-50 shadow-sm">
            <XCircle className="w-10 h-10 text-red-500 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">Communication Failure</h3>
            <p className="text-gray-500 text-sm mb-4">{fetchError}</p>
            <button onClick={() => window.location.reload()} className="px-6 py-2 bg-gray-900 text-white rounded-xl font-bold">Retry Connection</button>
          </div>
        ) : (
          <ProductList
            products={storeProducts.filter(t => {
              const allowedCategoryIds = selectedCategory === "All"
                ? []
                : getCategoryDescendants(selectedCategory, categories);
              const matchesCategory = selectedCategory === "All" || allowedCategoryIds.includes(t.category_id);
              const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.description.toLowerCase().includes(searchTerm.toLowerCase());
              const matchesDiscount = !showOnlyDiscounted || (t.discount_percentage ?? 0) > 0;
              const productBrand = t.brand_id ? brands.find(b => b.id === t.brand_id) : null;
              const matchesBrand = !brandSearchTerm || 
                (productBrand && productBrand.name.toLowerCase().includes(brandSearchTerm.toLowerCase()));
              return matchesCategory && matchesSearch && matchesDiscount && matchesBrand;
            })}
            onProductClick={setSelectedProduct}
          />
        )}
        </main>
      </div>

      <footer className="mt-10 sm:mt-16 text-center text-gray-400 text-xs sm:text-sm pb-4">
        <p>© 2026 Tots & Trends. All rights reserved.</p>
      </footer>

      {/* Mobile Menu Sidebar (Simplified for brevity, but functional) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70]" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-xs bg-white dark:bg-slate-900 shadow-2xl z-[80] flex flex-col">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-600 rounded-lg"><Sparkles className="w-4 h-4 text-white" /></div>
                  <span className="text-lg font-black text-gray-900 dark:text-white tracking-tight">Tots & Trends</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-grow p-4 space-y-1 overflow-y-auto">
                <button onClick={() => { navigateTo('landing'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-700 dark:text-gray-200 font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-2xl transition-all">
                  <Home className="w-5 h-5 text-gray-400 dark:text-slate-500" /> Home
                </button>
                <button onClick={() => { navigateTo('store'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3.5 text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl transition-all">
                  <Package className="w-5 h-5" /> Store
                </button>
                <button onClick={() => { navigateTo('history'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-700 dark:text-gray-200 font-bold hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-2xl transition-all">
                  <History className="w-5 h-5 text-gray-400 dark:text-slate-500" /> My Orders
                </button>
                {!user?.is_anonymous && (
                  <button
                    onClick={() => { setIsRecovering(true); setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-700 dark:text-gray-200 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-all"
                  >
                    <Key className="w-5 h-5 text-gray-400 dark:text-slate-500" /> Recovery Key
                  </button>
                )}
                {/* My Account — registered users only */}
                {user && !user.is_anonymous && (
                  <button
                    onClick={() => { setIsAccountModalOpen(true); setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-indigo-600 dark:text-indigo-400 font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-2xl transition-all border border-indigo-100 dark:border-indigo-800"
                  >
                    <User className="w-5 h-5" />
                    <div className="text-left">
                      <span className="block text-sm">My Account</span>
                      <span className="block text-[9px] font-medium text-indigo-400 uppercase tracking-widest mt-0.5 truncate max-w-[160px]">{user.email}</span>
                    </div>
                  </button>
                )}

                {/* Upgrade Account Section for Guests */}
                {user?.is_anonymous && (
                  <div className="pt-2 pb-2 px-4">
                    <p className="text-[9px] font-black text-indigo-400 dark:text-indigo-500 uppercase tracking-[0.2em] mb-2">Guest Mode</p>
                    <button onClick={() => { setIsUpgrading(true); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-between px-4 py-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-bold rounded-2xl transition-all border border-indigo-100 dark:border-indigo-800">
                      <div className="flex items-center gap-3">
                        <UserPlus className="w-5 h-5" />
                        <div className="text-left">
                          <span className="block text-sm">Save Account</span>
                          <span className="block text-[9px] font-medium text-indigo-400 dark:text-indigo-500 uppercase tracking-widest mt-0.5">Keep Order History</span>
                        </div>
                      </div>
                    </button>
                  </div>
                )}

                {/* Admin/Shipper Section */}
                {(isAdmin || isShipper) && (
                  <>
                    <div className="pt-4 pb-2 px-4">
                      <p className="text-[9px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-[0.2em]">Management</p>
                    </div>
                    {isAdmin && (
                      <button onClick={() => { navigateTo('admin_dashboard'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-700 dark:text-gray-200 font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-2xl transition-all">
                        <ShieldCheck className="w-5 h-5 text-indigo-500" /> Admin Panel
                      </button>
                    )}
                    {isShipper && (
                      <button onClick={() => { navigateTo('shipper_dashboard'); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-700 dark:text-gray-200 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-all">
                        <Truck className="w-5 h-5 text-blue-500" /> Shipper Panel
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-gray-100 dark:border-slate-800 space-y-2">
                <button onClick={() => { loadInventory(true); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-all">
                  <RefreshCcw className="w-3.5 h-3.5" /> Refresh Store
                </button>
                <button onClick={() => { onSignOut(); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-rose-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all">
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Mobile Category Left Sheet ── */}
      <AnimatePresence>
        {isCategorySheetOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCategorySheetOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] lg:hidden"
            />
            {/* Sheet */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed top-0 bottom-0 left-0 w-[80vw] max-w-xs z-[100] lg:hidden bg-white dark:bg-slate-900 rounded-r-3xl shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-black text-gray-900 dark:text-white tracking-tight">Browse Categories</span>
                </div>
                <button
                  onClick={() => setIsCategorySheetOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Scrollable tree */}
              <div className="overflow-y-auto flex-1 px-3 py-3">
                <CategoryTree
                  categories={categories}
                  selected={selectedCategory}
                  onSelect={(id) => {
                    setSelectedCategory(id);
                    setIsCategorySheetOpen(false);
                  }}
                />
              </div>

              {/* Footer action */}
              <div className="px-4 py-3 border-t border-gray-100 dark:border-slate-800 shrink-0">
                <button
                  onClick={() => { setSelectedCategory('All'); setIsCategorySheetOpen(false); }}
                  className="w-full py-3 rounded-2xl text-xs font-black uppercase tracking-widest bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all"
                >
                  Clear — Show All Products
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Account Modal */}
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        userId={user?.id}
        userEmail={user?.email}
        isAdmin={isAdmin}
        isShipper={isShipper}
        onNavigate={navigateTo}
        onSignOut={onSignOut}
        onRecoveryKey={!user?.is_anonymous ? () => setIsRecovering(true) : undefined}
      />
    </div>
  );
}
