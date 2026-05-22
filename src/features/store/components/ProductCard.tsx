/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ProductCard – a single product card for use inside ItemList<Product>.
 * Extracted from ProductList so the list and the card are independent concerns.
 */

import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, Check, AlertTriangle } from "lucide-react";
import { Product } from "../../../types/types";
import { useTheme } from "../../../context/ThemeContext";
import appConfig from "../../../config/appConfig";

// Rotating accent colours per card index for visual variety
const ACCENT_PALETTES = [
  {
    bg: "from-violet-500/10 to-fuchsia-500/10",
    ring: "ring-violet-200",
    dot: "bg-violet-500",
    btnGrad: "from-violet-600 to-fuchsia-600",
    badge: "bg-violet-50 text-violet-600 border-violet-200/60",
  },
  {
    bg: "from-sky-500/10 to-cyan-500/10",
    ring: "ring-sky-200",
    dot: "bg-sky-500",
    btnGrad: "from-sky-600 to-cyan-600",
    badge: "bg-sky-50 text-sky-600 border-sky-200/60",
  },
  {
    bg: "from-amber-500/10 to-orange-500/10",
    ring: "ring-amber-200",
    dot: "bg-amber-500",
    btnGrad: "from-amber-600 to-orange-600",
    badge: "bg-amber-50 text-amber-600 border-amber-200/60",
  },
  {
    bg: "from-emerald-500/10 to-teal-500/10",
    ring: "ring-emerald-200",
    dot: "bg-emerald-500",
    btnGrad: "from-emerald-600 to-teal-600",
    badge: "bg-emerald-50 text-emerald-600 border-emerald-200/60",
  },
  {
    bg: "from-rose-500/10 to-pink-500/10",
    ring: "ring-rose-200",
    dot: "bg-rose-500",
    btnGrad: "from-rose-600 to-pink-600",
    badge: "bg-rose-50 text-rose-600 border-rose-200/60",
  },
  {
    bg: "from-indigo-500/10 to-blue-500/10",
    ring: "ring-indigo-200",
    dot: "bg-indigo-500",
    btnGrad: "from-indigo-600 to-blue-600",
    badge: "bg-indigo-50 text-indigo-600 border-indigo-200/60",
  },
];

export interface ProductCardProps {
  product: Product;
  /** 0-based position in the list — used for staggered entrance animation. */
  index: number;
  /** Whether the "added" success flash is currently active for this card. */
  isAdded: boolean;
  /** Called when the "Add to cart" button is pressed. */
  onAdd: (product: Product) => void;
  /** Called when the card image / body is clicked (navigate to detail view). */
  onProductClick: (product: Product) => void;
}

export function ProductCard({
  product,
  index,
  isAdded,
  onAdd,
  onProductClick,
}: ProductCardProps) {
  const { theme } = useTheme();
  const palette = ACCENT_PALETTES[index % ACCENT_PALETTES.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.06,
        type: "spring",
        stiffness: 120,
        damping: 14,
      }}
      id={`product-item-${product.id}`}
      className="group relative flex flex-col rounded-[1.75rem] sm:rounded-[2.5rem] bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 overflow-hidden transition-all duration-700 ease-out hover:-translate-y-2"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}
      whileHover={{
        boxShadow:
          theme === "dark"
            ? "0 30px 60px rgba(0,0,0,0.4)"
            : "0 30px 60px rgba(0,0,0,0.12)",
      }}
    >
      {/* ── Image Area ── */}
      <div
        className={`relative w-full h-52 sm:h-60 bg-gradient-to-b from-gray-50/50 to-white dark:from-slate-800/50 dark:to-slate-900 flex items-center justify-center overflow-hidden transition-colors`}
      >
        {/* Category Aura */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${palette.bg} opacity-40 group-hover:opacity-60 transition-opacity duration-700`}
        />

        {/* Floating Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/60 dark:bg-slate-800/40 blur-3xl rounded-full group-hover:scale-150 transition-all duration-1000" />

        {/* Clickable image area with tilt effect */}
        <button
          onClick={() => onProductClick(product)}
          className="w-full h-full relative z-10 flex items-center justify-center p-5 sm:p-8 cursor-pointer focus:outline-none"
        >
          <motion.img
            src={product.image_url}
            alt={product.name}
            referrerPolicy="no-referrer"
            whileHover={{ scale: 1.15, rotate: 5, y: -10 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="h-full max-h-full w-auto max-w-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] filter group-hover:brightness-105 transition-all duration-500"
          />
        </button>

        <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-20">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-xl border shadow-lg transition-colors ${product.in_stock
                ? "bg-emerald-50/80 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200/30 dark:border-emerald-800/50"
                : "bg-rose-50/80 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border-rose-200/30 dark:border-rose-800/50"
              }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${product.in_stock ? "bg-emerald-500 animate-pulse" : "bg-rose-400"}`}
            />
            {product.in_stock ? "In Stock" : "Sold Out"}
          </div>
        </div>

        {/* Quantity - Bottom Right */}
        <AnimatePresence>
          {product.quantity > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 z-20 flex items-center gap-1.5 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md text-gray-900 dark:text-white text-[10px] font-black px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full uppercase tracking-widest shadow-xl border border-white/50 dark:border-slate-800/50 transition-colors"
            >
              {product.quantity} units
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Content Area ── */}
      <div className="flex flex-col flex-grow p-4 sm:p-6 pt-3 sm:pt-5">
        <h3 className="font-black text-gray-900 dark:text-white text-base sm:text-lg leading-tight mb-1.5 sm:mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
          {product.title}
        </h3>

        <div className="flex items-center gap-2 mb-3 sm:mb-6">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-[10px] font-black">
                ★
              </span>
            ))}
          </div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            New Arrival
          </span>
        </div>

        {/* Price + Add button */}
        <div className="mt-auto flex items-center justify-between gap-3 sm:gap-4">
          {/* Price box — amber/orange for discounted, palette gradient for full price */}
          {product.discount_percentage && product.discount_percentage > 0 ? (
            <div className="flex flex-col items-start px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl sm:rounded-2xl shadow-lg shadow-amber-500/30 min-w-[80px] sm:min-w-[100px] relative">
              {/* Sale spark */}
              <span className="absolute -top-2 -right-2 text-[8px] font-black bg-rose-500 text-white px-1.5 py-0.5 rounded-full uppercase tracking-widest shadow-md">
                -{product.discount_percentage}%
              </span>
              <span className="text-[10px] font-black text-white/60 line-through mr-0.5">
                {appConfig.currency_symbol}{product.price.toFixed(2)}
              </span>
              <span className="text-lg sm:text-xl font-black text-white tabular-nums tracking-tighter">
                {appConfig.currency_symbol}
                {(product.price * (1 - product.discount_percentage / 100)).toFixed(2)}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-start px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-slate-700 to-slate-900 rounded-xl sm:rounded-2xl shadow-lg shadow-slate-900/20 min-w-[80px] sm:min-w-[100px]">
              <span className="text-xs font-black text-white/70 mr-0.5">
                {appConfig.currency_symbol}
              </span>
              <span className="text-lg sm:text-xl font-black text-white tabular-nums tracking-tighter">
                {product.price.toFixed(2)}
              </span>
            </div>
          )}

          <motion.button
            onClick={() => onAdd(product)}
            id={`add-to-cart-${product.id}`}
            disabled={!product.in_stock}
            whileTap={{ scale: 0.9 }}
            className={`relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl sm:rounded-2xl transition-all duration-500 overflow-hidden
              ${product.in_stock
                ? `bg-gray-900 text-white shadow-xl hover:bg-indigo-600 hover:rotate-12`
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
          >
            <AnimatePresence>
              {isAdded ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-emerald-500 flex items-center justify-center z-20"
                >
                  <Check className="w-6 h-6 text-white" strokeWidth={3} />
                </motion.div>
              ) : (
                <ShoppingCart className="w-5 h-5" />
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
