/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInventory } from '../../context/InventoryContext';
import { useAdmin } from '../../context/AdminContext';
import { toast } from 'sonner';

import { Loader2, Plus, Edit2, Trash2, Search, Package, Tag, AlertTriangle, RefreshCw, Layers, Home, ChevronRight } from 'lucide-react';
import { Product, Category } from '../../types/types';
import { ProductFormView } from '../admin/ProductFormView';
import { CategoryTree } from '../store/components/CategorySidebar';

const STOCK_BADGE: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  high: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-700 dark:text-emerald-400', dot: 'bg-emerald-500', label: 'In Stock' },
  low: { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-400', dot: 'bg-amber-400', label: 'Low Stock' },
  out: { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-700 dark:text-red-400', dot: 'bg-red-500', label: 'Out of Stock' },
};

function getStockStatus(qty: number) {
  if (qty === 0) return STOCK_BADGE.out;
  if (qty <= 3) return STOCK_BADGE.low;
  return STOCK_BADGE.high;
}

const getCategoryDescendants = (categoryId: string, categories: Category[]): string[] => {
  const ids: string[] = [categoryId];
  const queue: string[] = [categoryId];

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    const children = categories.filter(c => c.parent_id === currentId);
    for (const child of children) {
      if (!ids.includes(child.id)) {
        ids.push(child.id);
        queue.push(child.id);
      }
    }
  }
  return ids;
};

export function InventoryManager() {
  const { storeProducts, categories, brands, isLoading, isRefreshing, loadInventory } = useInventory();

  const { isMutatingInventory, addNewProduct, updateExistingProduct, removeProduct } = useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | 'All'>('All');
  const [filterMode, setFilterMode] = useState<'All' | 'Discounted' | 'Free'>('All');
  const [filterProductState, setFilterProductState] = useState<'All' | 'active' | 'phasing_out' | 'discontinued'>('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Compute category path for breadcrumbs
  const selectedCategoryPath = useMemo(() => {
    if (selectedCategory === 'All') return [];
    const path: Category[] = [];
    let currentId: string | undefined = selectedCategory;
    const visited = new Set<string>();

    while (currentId && !visited.has(currentId)) {
      visited.add(currentId);
      const category = categories.find(c => c.id === currentId);
      if (!category) break;
      path.unshift(category);
      currentId = category.parent_id;
    }
    return path;
  }, [selectedCategory, categories]);

  const handleSaveProduct = async (productData: Partial<Product>) => {
    try {
      if (editingProduct) {
        await updateExistingProduct(editingProduct.id, productData);
      } else {
        // Ensure we don't pass an existing ID when adding a new product
        const { id, ...newProductData } = productData as any;
        await addNewProduct(newProductData as Omit<Product, 'id'>);
      }
      await loadInventory(true);
      if (editingProduct) {
        setIsFormOpen(false);
        setEditingProduct(null);
      }
    } catch (err) {
      console.error("InventoryManager: Save failed", err);
      // Keep form open so user can see error or try again
      throw err;
    }
  };

  const openEditForm = (product: Product) => { setEditingProduct(product); setIsFormOpen(true); };
  const openAddForm = () => { setEditingProduct(null); setIsFormOpen(true); };

  const handleDeleteProduct = async (product: Product) => {
    if (window.confirm(`Delete "${product.title}"? This cannot be undone.`)) {
      try {
        await removeProduct(product.id);
        toast.success(`"${product.title}" was deleted successfully.`);
        loadInventory(true);
      } catch (err: any) {
        console.error("InventoryManager: Deletion failed", err);
        toast.error(err.message || 'Failed to delete product.');
      }
    }
  };

  // Removed redundant useEffect that was causing fetch loops. 
  // loadInventory is now called at the root AppRouter level.


  const filteredProducts = storeProducts.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());

    const allowedCategoryIds = selectedCategory === 'All'
      ? []
      : getCategoryDescendants(selectedCategory, categories);
    const matchesCategory = selectedCategory === 'All' || allowedCategoryIds.includes(t.category_id);

    let matchesFilterMode = true;
    if (filterMode === 'Discounted') {
      matchesFilterMode = (t.discount_percentage ?? 0) > 0;
    } else if (filterMode === 'Free') {
      matchesFilterMode = t.price === 0;
    }

    const matchesProductState = filterProductState === 'All' || (t.product_state || 'active') === filterProductState;

    return matchesSearch && matchesCategory && matchesFilterMode && matchesProductState;
  });

  // ── stats strip ──────────────────────────────────────────────
  const totalItems = filteredProducts.length;
  const outOfStock = filteredProducts.filter(t => t.quantity === 0).length;
  const lowStock = filteredProducts.filter(t => t.quantity > 0 && t.quantity <= 3).length;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium transition-colors">Loading inventory…</p>
      </div>
    );
  }

  if (isFormOpen) {
    return (
      <ProductFormView
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveProduct}
        initialData={editingProduct}
        categories={categories}
        brands={brands}
        isMutating={isMutatingInventory}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
            Inventory
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 transition-colors">Manage your product catalog and stock levels.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => loadInventory(true)}
            disabled={isRefreshing}
            className="flex items-center justify-center p-3 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/80 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-2xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            title="Refresh Inventory"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin text-indigo-500 dark:text-indigo-400' : ''}`} />
          </button>
          <button
            onClick={openAddForm}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-indigo-300/40 dark:shadow-indigo-900/20"
          >
            <Plus className="w-5 h-5" />
            Add New Product
          </button>
        </div>
      </div>

      {/* ── Stats Strip ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Products', value: totalItems, color: 'bg-indigo-50/50 dark:bg-indigo-900/10', border: 'border-indigo-100 dark:border-indigo-900/30', icon: Package, iconColor: 'text-indigo-500 dark:text-indigo-400' },
          { label: 'Low Stock', value: lowStock, color: 'bg-amber-50/50 dark:bg-amber-900/10', border: 'border-amber-100 dark:border-amber-900/30', icon: AlertTriangle, iconColor: 'text-amber-500 dark:text-amber-400' },
          { label: 'Out of Stock', value: outOfStock, color: 'bg-red-50/50 dark:bg-red-900/10', border: 'border-red-100 dark:border-red-900/30', icon: Tag, iconColor: 'text-red-500 dark:text-red-400' },
        ].map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`${stat.color} rounded-2xl border ${stat.border} p-4 flex items-center gap-4 transition-colors`}>
              <div className="shrink-0 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm transition-colors">
                <Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900 dark:text-white transition-colors">{stat.value}</p>
                <p className="text-[10px] text-gray-400 dark:text-slate-500 font-black uppercase tracking-wider transition-colors">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Main Layout (Left: Table, Right: Category Panel) ── */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left: Table Card */}
        <div className="flex-1 min-w-0 w-full bg-white dark:bg-slate-900 rounded-[1rem] border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">

          {/* Breadcrumbs for active category */}
          {selectedCategory !== 'All' && selectedCategoryPath.length > 0 && (
            <div className="px-5 py-2.5 bg-gray-50/50 dark:bg-slate-800/10 border-b border-gray-100 dark:border-slate-800 flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-gray-400 dark:text-slate-500 transition-colors">
              <button
                onClick={() => setSelectedCategory('All')}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1"
              >
                <Home className="w-3 h-3" />
                <span>All Categories</span>
              </button>
              {selectedCategoryPath.map((cat, idx) => {
                const isLast = idx === selectedCategoryPath.length - 1;
                return (
                  <React.Fragment key={cat.id}>
                    <ChevronRight className="w-2.5 h-2.5 text-gray-300 dark:text-slate-700" />
                    {isLast ? (
                      <span className="text-indigo-650 dark:text-indigo-400 font-extrabold">
                        {cat.name}
                      </span>
                    ) : (
                      <button
                        onClick={() => setSelectedCategory(cat.id)}
                        className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {cat.name}
                      </button>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}

          {/* Toolbar */}
          <div className="p-5 border-b border-gray-100 dark:border-slate-800 bg-gray-50/40 dark:bg-slate-800/20 flex flex-col sm:flex-row gap-3 transition-colors">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Search by title…"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 transition-all text-sm text-gray-900 dark:text-white"
              />
            </div>

            <select
              value={filterMode}
              onChange={e => setFilterMode(e.target.value as any)}
              className="sm:w-44 px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 transition-all text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
            >
              <option value="All">All Pricing</option>
              <option value="Discounted">Discounted</option>
              <option value="Free">Free Items</option>
            </select>

            <select
              value={filterProductState}
              onChange={e => setFilterProductState(e.target.value as any)}
              className="sm:w-44 px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 transition-all text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
            >
              <option value="All">All States</option>
              <option value="active">Active</option>
              <option value="phasing_out">Phasing Out</option>
              <option value="discontinued">Discontinued</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 dark:bg-slate-800/40 text-gray-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-gray-100 dark:border-slate-800 transition-colors">
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">State</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredProducts.map((product, i) => {
                    const stock = getStockStatus(product.quantity);
                    const catLabel = categories.find(c => c.id === product.category_id)?.name
                      || 'General';
                    return (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="group border-b border-gray-50 dark:border-slate-800 hover:bg-indigo-50/20 dark:hover:bg-indigo-900/10 transition-colors"
                      >
                        {/* Product */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="relative w-14 h-14 rounded-2xl bg-gray-100 dark:bg-slate-800 overflow-hidden shrink-0 shadow-sm group-hover:shadow-md transition-all">
                              <img src={product.image_url} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-gray-900 dark:text-white text-sm leading-snug truncate transition-colors">{product.title}</div>
                              {product.description && (
                                <div className="text-[10px] font-medium text-gray-400 dark:text-slate-500 mt-0.5 line-clamp-1 max-w-[180px] transition-colors">{product.description}</div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 text-[10px] font-black uppercase rounded-full border border-violet-100 dark:border-violet-900/30 transition-colors">
                            <Tag className="w-3 h-3" />
                            {catLabel}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="px-6 py-4">
                          <span className="font-black text-gray-900 dark:text-white text-sm transition-colors">${product.price.toFixed(2)}</span>
                        </td>

                        {/* Stock */}
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase border border-transparent ${stock.bg} ${stock.text} transition-colors`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${stock.dot}`} />
                            {product.quantity} — {stock.label}
                          </div>
                        </td>

                        {/* State */}
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase rounded-full border transition-colors ${(product.product_state || 'active') === 'active'
                            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30'
                            : (product.product_state || 'active') === 'phasing_out'
                              ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900/30'
                              : 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-900/30'
                            }`}>
                            {product.product_state === 'phasing_out' ? 'Phasing Out' : (product.product_state || 'active')}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2 md:opacity-0 group-hover:opacity-100 transition-all">
                            <button
                              onClick={() => openEditForm(product)}
                              title="Edit Product"
                              className="p-2 text-gray-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product)}
                              title="Delete Product"
                              className="p-2 text-gray-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all disabled:opacity-25 disabled:hover:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>

            {filteredProducts.length === 0 && (
              <div className="py-20 flex flex-col items-center gap-3 text-gray-400 dark:text-slate-500 transition-colors">
                <Package className="w-12 h-12 text-gray-200 dark:text-slate-800" />
                <p className="font-black text-gray-500 dark:text-slate-400 uppercase tracking-widest">No products found</p>
                <p className="text-xs">Try adjusting your search or category filter.</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50/40 dark:bg-slate-800/20 border-t border-gray-100 dark:border-slate-800 text-[10px] text-gray-400 dark:text-slate-500 font-black uppercase tracking-wider transition-colors">
            Showing <span className="text-gray-700 dark:text-gray-300 font-black">{filteredProducts.length}</span> of <span className="text-gray-700 dark:text-gray-300 font-black">{storeProducts.length}</span> products
          </div>
        </div>

        {/* Right: Category Sidebar */}
        <aside className="w-full lg:w-56 shrink-0 sticky top-[20px] self-start max-h-[calc(100vh-90px)] overflow-y-auto z-10">
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-3 shadow-sm transition-colors">
            <div className="flex items-center justify-between px-2 py-1.5 mb-2 border-b border-gray-50 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500">Categories</span>
              </div>
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:opacity-80 transition-opacity"
                >
                  Clear
                </button>
              )}
            </div>
            <CategoryTree
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
