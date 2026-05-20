/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ShoppingCart, Check, Star, ShieldCheck, Truck, Sparkles, X, Leaf, Loader2, Database, AlertTriangle, ChevronRight, Home } from "lucide-react";
import { Product, PartialMetadata, Category } from "../../../types/types";
import appConfig from "../../../config/appConfig";
import { QRCodeSVG } from "qrcode.react";

import { useCart } from "../../../context/CartContext";
import { useInventory } from "../../../context/InventoryContext";

function MetadataSection({ title, icon, color, data }: { title: string, icon: React.ReactNode, color: string, data?: any }) {
  if (!data) return null;

  const colorClasses: Record<string, string> = {
    indigo: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800",
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800",
    violet: "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border-violet-100 dark:border-violet-800",
    emerald: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800",
  };

  return (
    <div className={`p-6 rounded-[2rem] border ${colorClasses[color] || colorClasses.indigo} transition-all`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-white dark:bg-black/20 rounded-xl shadow-sm">
          {icon}
        </div>
        <h4 className="font-black uppercase tracking-widest text-xs">{title}</h4>
      </div>
      <div className="space-y-3">
        {Object.entries(data).map(([key, value]) => {
          if (!value || typeof value !== 'string') return null;
          return (
            <div key={key} className="flex flex-col">
              <span className="text-[10px] font-black uppercase opacity-50 tracking-tighter mb-0.5">
                {key.replace(/_/g, ' ')}
              </span>
              <span className="text-sm font-bold leading-tight">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}


interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onCategorySelect?: (categoryId: string) => void;
}

export function ProductDetails({ product, onBack, onCategorySelect }: ProductDetailsProps) {
  const { addToCart: onAddToCart } = useCart();
  const { categories } = useInventory();
  const [isAdded, setIsAdded] = useState(false);
  const [showMetadataUrl, setShowMetadataUrl] = useState(false);
  const [metadata, setMetadata] = useState<PartialMetadata | null>(null);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);

  // Compute hierarchical breadcrumbs from current category to root
  const breadcrumbs = useMemo(() => {
    const path: Category[] = [];
    let currentId = product.category_id;
    const visited = new Set<string>();

    while (currentId && !visited.has(currentId)) {
      visited.add(currentId);
      const category = categories.find(c => c.id === currentId);
      if (!category) break;
      path.unshift(category);
      currentId = category.parentId || category.parent_id || "";
    }
    return path;
  }, [product.category_id, categories]);

  useEffect(() => {
    if (showMetadataUrl && !metadata && product.digital_passport_url) {
      setIsLoadingMetadata(true);
      fetch(product.digital_passport_url)
        .then(res => res.json())
        .then(data => {
          const actualMetadata = data.partial_metadata || data.metadata || data;
          setMetadata(actualMetadata);
        })
        .catch(err => console.error("Error fetching metadata:", err))
        .finally(() => setIsLoadingMetadata(false));
    }
  }, [showMetadataUrl, metadata, product.digital_passport_url]);

  const handleAdd = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), appConfig.addToCartFlashMs);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        {/* ── Breadcrumb Navigation ── */}
        <nav className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 mb-8 bg-white dark:bg-slate-900 px-6 py-4 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Store</span>
          </button>

          {breadcrumbs.map((cat) => (
            <React.Fragment key={cat.id}>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300 dark:text-slate-700" />
              <button
                onClick={() => onCategorySelect?.(cat.id)}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {cat.title || cat.name}
              </button>
            </React.Fragment>
          ))}

          <ChevronRight className="w-3.5 h-3.5 text-gray-300 dark:text-slate-700" />
          <span className="text-gray-900 dark:text-white font-extrabold truncate max-w-[200px]">
            {product.title}
          </span>
        </nav>

        <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl shadow-indigo-100/20 dark:shadow-black/40 border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors duration-500">
          <div className="grid lg:grid-cols-2 gap-0">

            {/* ── Image Section ── */}
            <div className="relative p-8 lg:p-16 bg-gradient-to-br from-gray-50 to-indigo-50/30 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center min-h-[400px] transition-colors">
              {/* Background decorative blob */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/40 dark:bg-slate-800/20 blur-3xl rounded-full" />
              </div>

              <motion.img
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                src={product.image_url}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="relative z-10 w-full max-w-md object-contain drop-shadow-2xl"
              />

              {/* Badges */}
              <div className="absolute top-8 left-8 flex flex-col gap-2 z-20">
                {!product.in_stock && (
                  <div className="px-4 py-1.5 bg-rose-500 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg shadow-rose-500/30">
                    Out of Stock
                  </div>
                )}
                {product.in_stock && product.quantity < 5 && (
                  <div className="px-4 py-1.5 bg-amber-500 text-white text-xs font-black uppercase tracking-widest rounded-full shadow-lg shadow-amber-500/30">
                    Only {product.quantity} left
                  </div>
                )}
              </div>
            </div>

            {/* ── Details Section ── */}
            <div className="p-8 lg:p-16 flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 mb-4"
              >
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">(4.9/5 Reviews)</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-4 transition-colors"
              >
                {product.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-6 mb-8"
              >
                {product.discount_percentage && product.discount_percentage > 0 ? (
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-gray-400 line-through">
                      {appConfig.currency_symbol}{product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
                        {appConfig.currency_symbol}{(product.price * (1 - product.discount_percentage / 100)).toFixed(2)}
                      </span>
                      <span className="px-3 py-1 bg-rose-500 text-white text-[10px] font-black uppercase rounded-lg shadow-lg shadow-rose-500/20">
                        -{product.discount_percentage}% OFF
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
                    {appConfig.currency_symbol}{product.price.toFixed(2)}
                  </span>
                )}

                <div className="w-px h-12 bg-gray-100 dark:border-slate-800" />

                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${product.in_stock ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                    <span className={`text-sm font-black uppercase tracking-wider ${product.in_stock ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {product.in_stock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-gray-400 pl-4 uppercase tracking-widest">
                    {product.quantity} units available
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-6 mb-10"
              >
                <div className="flex-grow">
                  <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed transition-colors">
                    {product.description || "A wonderful, magical product that guarantees hours of entertainment and smiles."}
                  </p>
                </div>

                {product.digital_passport_url && (
                  <button
                    onClick={() => setShowMetadataUrl(true)}
                    className="shrink-0 p-3 bg-white dark:bg-slate-800 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-400 transition-all group relative"
                  >
                    <QRCodeSVG value={product.digital_passport_url} size={80} level="H" />
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-[10px] font-black rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
                      SCAN FOR PRODUCT INFO
                    </div>
                  </button>
                )}
              </motion.div>

              {/* Action Area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6 mt-auto"
              >
                <button
                  onClick={handleAdd}
                  disabled={!product.in_stock}
                  className={`w-full py-5 rounded-2xl font-black text-lg uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-300 ${!product.in_stock
                    ? "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    : isAdded
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-[0.98]"
                      : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/25 dark:shadow-indigo-500/10 hover:shadow-indigo-500/40 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]"
                    }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-6 h-6" />
                      Added to Cart
                    </>
                  ) : !product.in_stock ? (
                    "Out of Stock"
                  ) : (
                    <>
                      <ShoppingCart className="w-6 h-6" />
                      Add to Cart
                    </>
                  )}
                </button>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100 dark:border-slate-800 transition-colors">
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-600 dark:text-gray-400 transition-colors">
                    <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl transition-colors">
                      <Truck className="w-5 h-5" />
                    </div>
                    Free Shipping
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-gray-600 dark:text-gray-400 transition-colors">
                    <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl transition-colors">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    Secure Payment
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Metadata Modal ── */}
      <AnimatePresence>
        {showMetadataUrl && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowMetadataUrl(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden border border-white/10"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/30">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-600 rounded-2xl text-white shadow-lg shadow-emerald-600/20">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">Product DNA</h3>
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mt-0.5">Transparency & Sustainability Data</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowMetadataUrl(false)}
                  className="p-3 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-2xl transition-colors text-gray-400 dark:text-slate-500 hover:text-gray-900 dark:hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 lg:p-12 overflow-y-auto max-h-[70vh]">
                {isLoadingMetadata ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                    <p className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">Fetching IPFS Records...</p>
                  </div>
                ) : metadata ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Durability */}
                    <MetadataSection
                      title="Durability & Life Span"
                      icon={<ShieldCheck className="w-5 h-5" />}
                      color="indigo"
                      data={metadata.durability_data}
                    />
                    {/* Repairability */}
                    <MetadataSection
                      title="Repairability"
                      icon={<Truck className="w-5 h-5" />}
                      color="blue"
                      data={metadata.repairability_data}
                    />
                    {/* Manufacturing */}
                    <MetadataSection
                      title="Manufacturing"
                      icon={<Database className="w-5 h-5" />}
                      color="violet"
                      data={metadata.manufacturing_data}
                    />
                    {/* Life Cycle */}
                    <MetadataSection
                      title="Lifecycle Impact"
                      icon={<Leaf className="w-5 h-5" />}
                      color="emerald"
                      data={metadata.lifecycle_data}
                    />
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto mb-4" />
                    <p className="text-gray-500 font-bold">Could not load sustainability data.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
