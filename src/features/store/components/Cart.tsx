/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, X, Trash2, Minus, Plus, ArrowRight, Package } from "lucide-react";
import { CartItem, Product } from "../../../types/types";
import appConfig from "../../../config/appConfig";
import { useTheme } from "../../../context/ThemeContext";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { useInventory } from "../../../context/InventoryContext";


interface CartProps {
  onCheckout: () => void;
}

export function Cart({ onCheckout }: CartProps) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { storeRef } = useInventory();
  const {
    cart, isCartOpen: isOpen, setIsCartOpen, saveForLater, setSaveForLater,
    updateQuantity: onUpdateQuantity, removeFromCart: onRemove, emptyCart: onClear
  } = useCart();

  const onClose = () => setIsCartOpen(false);
  const onToggleSaveForLater = (val: boolean) => setSaveForLater(val);
  const isAnonymous = user?.is_anonymous;

  const subtotal = useMemo(() => cart.reduce((sum, item) => {
    const effectivePrice = item.discount_percentage && item.discount_percentage > 0
      ? item.price * (1 - item.discount_percentage / 100)
      : item.price;
    return sum + (effectivePrice * item.cart_quantity);
  }, 0), [cart]);

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.cart_quantity, 0), [cart]);


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 pointer-events-auto"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-gray-50 dark:bg-slate-950 shadow-2xl z-[60] flex flex-col pointer-events-auto transition-colors duration-500"
          >
            {/* ── Header ── */}
            <div className="px-6 py-5 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between transition-colors">
              <div className="flex items-center gap-3">
                <div className="relative p-2.5 bg-gray-900 dark:bg-indigo-600 text-white rounded-xl transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-indigo-500 dark:bg-pink-500 text-white text-[10px] font-black flex items-center justify-center rounded-full ring-2 ring-white dark:ring-slate-900 transition-colors"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight transition-colors">Your Cart</h2>
                  <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 tracking-widest uppercase transition-colors">
                    {cart.length === 0 ? "Empty" : `${cart.length} item${cart.length !== 1 ? 's' : ''}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {cart.length > 0 && (
                  <button
                    onClick={onClear}
                    className="text-[10px] font-black uppercase tracking-widest text-rose-500 hover:text-rose-600 px-3 py-2 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* ── Cart Items ── */}
            <div className="flex-grow overflow-y-auto px-4 py-6 space-y-3">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 px-8">
                  <div className="relative">
                    <div className="w-28 h-28 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
                      <Package className="w-12 h-12 text-gray-300 dark:text-slate-700 transition-colors" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center border border-indigo-100 dark:border-indigo-800 transition-colors">
                      <ShoppingCart className="w-5 h-5 text-indigo-400 dark:text-indigo-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 dark:text-white text-xl transition-colors">Your cart is empty</h3>
                    <p className="text-sm text-gray-400 dark:text-slate-500 mt-2 leading-relaxed transition-colors">Browse the catalogue and add<br />some magic to your collection!</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-8 py-3.5 bg-gray-900 dark:bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black dark:hover:bg-indigo-700 transition-all active:scale-[0.97] shadow-lg shadow-gray-900/10 dark:shadow-indigo-900/20"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <>
                  <AnimatePresence mode="popLayout">
                    {cart.map((item) => {
                      const storeItem = storeRef.current.find(t => t.id === item.id);
                      const availableStock = storeItem ? storeItem.quantity : 0;

                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95, x: 20 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex gap-4">
                            {/* Thumbnail */}
                            <div className="w-20 h-20 rounded-xl bg-gray-50 dark:bg-slate-800 flex-shrink-0 overflow-hidden flex items-center justify-center transition-colors">
                              <img
                                src={item.image_url}
                                alt={item.name}
                                className="w-full h-full object-contain p-2 drop-shadow-md"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            {/* Details */}
                            <div className="flex-grow flex flex-col min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h4 className="font-bold text-gray-900 dark:text-white text-sm leading-snug line-clamp-2 transition-colors">
                                  {item.title}
                                </h4>
                                <button
                                  onClick={() => onRemove(item.id)}
                                  className="p-1.5 text-gray-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all flex-shrink-0"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>

                              <div className="flex items-center justify-between mt-auto">
                                {/* Quantity Stepper */}
                                <div className="flex flex-col gap-1.5">
                                  <div className="flex items-center bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 overflow-hidden w-fit transition-colors">
                                    <button
                                      onClick={() => onUpdateQuantity(item.id, -1)}
                                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                                      disabled={item.cart_quantity <= 1}
                                    >
                                      <Minus className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                                    </button>
                                    <motion.span
                                      key={item.cart_quantity}
                                      initial={{ scale: 1.3, color: "#6366f1" }}
                                      animate={{ scale: 1, color: theme === 'dark' ? '#f8fafc' : '#111827' }}
                                      className="w-8 text-center text-xs font-black tabular-nums select-none transition-colors"
                                    >
                                      {item.cart_quantity}
                                    </motion.span>
                                    <button
                                      onClick={() => onUpdateQuantity(item.id, 1)}
                                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                                      disabled={availableStock <= 0}
                                      title={availableStock <= 0 ? "No more stock available" : "Add more"}
                                    >
                                      <Plus className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                                    </button>
                                  </div>
                                  <div className="flex items-center gap-1.5 pl-1">
                                    <div className={`w-1.5 h-1.5 rounded-full ${availableStock > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                                    <span className={`text-[10px] font-black uppercase tracking-tighter ${availableStock > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                                      {availableStock > 0 ? `${availableStock} in stock` : 'Out of stock'}
                                    </span>
                                  </div>
                                </div>

                                {/* Line Total */}
                                <div className="text-right">
                                  <p className="text-sm font-black text-gray-900 dark:text-white tabular-nums transition-colors">
                                    {appConfig.currency_symbol}{((item.discount_percentage && item.discount_percentage > 0
                                      ? item.price * (1 - item.discount_percentage / 100)
                                      : item.price) * item.cart_quantity).toFixed(2)}
                                  </p>
                                  <p className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase transition-colors">
                                    {item.discount_percentage && item.discount_percentage > 0 ? (
                                      <span className="flex flex-col">
                                        <span className="line-through text-[8px] opacity-50">{appConfig.currency_symbol}{item.price.toFixed(2)}</span>
                                        <span className="text-rose-500">-{item.discount_percentage}% OFF</span>
                                        <span>{appConfig.currency_symbol}{(item.price * (1 - item.discount_percentage / 100)).toFixed(2)} ea</span>
                                      </span>
                                    ) : (
                                      `${appConfig.currency_symbol}${item.price.toFixed(2)} ea`
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {/* Save for Later Toggle - Only for registered users */}
                  {isAnonymous === false && (
                    <div className="pt-3">
                      <label className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl cursor-pointer hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group">
                        <div className="relative flex items-center flex-shrink-0">
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={saveForLater}
                            onChange={(e) => onToggleSaveForLater(e.target.checked)}
                          />
                          <div className="w-10 h-6 bg-gray-200 dark:bg-slate-700 peer-checked:bg-indigo-500 rounded-full transition-colors duration-300" />
                          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300 peer-checked:translate-x-[18px]" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h5 className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-widest transition-colors">Save cart for later</h5>
                          <p className="text-[11px] text-gray-400 dark:text-slate-500 font-medium transition-colors leading-tight mt-0.5">Your cart will be kept for {appConfig.cartInactivityTimeoutMinutes}m of inactivity.</p>
                        </div>
                      </label>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* ── Footer / Checkout ── */}
            <div className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 p-6 space-y-5 transition-colors">
              {cart.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                    <span className="text-gray-400 dark:text-slate-500 transition-colors">Subtotal</span>
                    <span className="text-gray-900 dark:text-white tabular-nums transition-colors">{appConfig.currency_symbol}{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                    <span className="text-gray-400 dark:text-slate-500 transition-colors">Shipping</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-black bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full transition-colors">FREE</span>
                  </div>
                  <div className="h-px bg-gray-100 dark:bg-slate-800 my-2 transition-colors" />
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest transition-colors">Total</span>
                    <div className="text-right">
                      <motion.span
                        key={subtotal}
                        initial={{ scale: 1.05, color: "#6366f1" }}
                        animate={{ scale: 1, color: theme === 'dark' ? '#f8fafc' : '#111827' }}
                        className="text-2xl font-black text-gray-900 dark:text-white tabular-nums transition-colors"
                      >
                        {appConfig.currency_symbol}{subtotal.toFixed(2)}
                      </motion.span>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={onCheckout}
                disabled={cart.length === 0}
                className="w-full py-4 px-6 bg-gray-900 dark:bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-gray-900/10 dark:shadow-indigo-900/20 active:scale-[0.98] disabled:bg-gray-100 dark:disabled:bg-slate-800 disabled:text-gray-400 dark:disabled:text-slate-600 disabled:shadow-none disabled:cursor-not-allowed group/checkout hover:bg-black dark:hover:bg-indigo-700 hover:shadow-xl"
              >
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {cart.length === 0 ? "Empty Cart" : "Checkout Now"}
                </span>
                {cart.length > 0 && (
                  <ArrowRight className="w-5 h-5 group-hover/checkout:translate-x-1 transition-transform" />
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
