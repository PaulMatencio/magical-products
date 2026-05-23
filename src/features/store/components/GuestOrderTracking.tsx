import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Package, MapPin, CreditCard, ChevronRight, AlertCircle, Loader2, ArrowLeft, AlertTriangle, Check, X, Trash2, Clock, CheckCircle, Truck, RefreshCw, Download, Mail } from 'lucide-react';
import { useOrderLogic } from '../../../presentation/hooks/useOrderLogic';
import { Order } from '../../../types/types';
import { useNavigation } from '../../../context/NavigationContext';
import { toast } from 'sonner';
import { downloadInvoice, sendInvoiceToEmail } from '../../../utils/invoiceGenerator';

const STATUS_CONFIG: Record<string, { icon: any; label: string; bg: string; text: string; dot: string; step: number }> = {
  pending: { icon: Clock, label: "Pending", bg: "bg-amber-50", text: "text-amber-600", dot: "bg-amber-400", step: 1 },
  accepted: { icon: CheckCircle, label: "Accepted", bg: "bg-sky-50", text: "text-sky-600", dot: "bg-sky-400", step: 2 },
  ready: { icon: Package, label: "Ready", bg: "bg-indigo-50", text: "text-indigo-600", dot: "bg-indigo-400", step: 3 },
  shipped: { icon: Truck, label: "Shipped", bg: "bg-violet-50", text: "text-violet-600", dot: "bg-violet-400", step: 4 },
  delivered: { icon: CheckCircle, label: "Delivered", bg: "bg-emerald-50", text: "text-emerald-600", dot: "bg-emerald-400", step: 5 },
  cancelled: { icon: X, label: "Cancelled", bg: "bg-rose-50", text: "text-rose-600", dot: "bg-rose-400", step: 0 },
  refunded: { icon: RefreshCw, label: "Refunded", bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-400", step: 0 },
};

const ALL_STEPS = ["pending", "accepted", "ready", "shipped", "delivered"];

export function GuestOrderTracking() {
  const { navigateTo } = useNavigation();
  const { trackGuestOrder, deleteOrder } = useOrderLogic();

  const [orderId, setOrderId] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState<Order | null>(null);

  const [isCancelling, setIsCancelling] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [invoiceEmail, setInvoiceEmail] = useState('');

  const handleCancel = async () => {
    if (!order) return;
    setIsCancelling(true);
    try {
      // 1. Call deleteOrder (which invokes the atomic backend transaction)
      await deleteOrder(order.id);

      // 2. Clear UI
      toast.success("Order cancelled successfully!");
      setOrder(null);
      setConfirmCancel(false);
      setOrderId('');
      setEmailOrPhone('');
    } catch (err: any) {
      console.error("Cancellation failed:", err);
      toast.error(`Failed to cancel order: ${err.message || 'Permission denied. You must be in the original session to cancel.'}`);
    } finally {
      setIsCancelling(false);
    }
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim() || !emailOrPhone.trim()) return;

    setIsLoading(true);
    setError('');
    setOrder(null);

    try {
      // Remove all whitespaces from the phone input to ensure robust matching
      const cleanedIdentifier = emailOrPhone.trim().replace(/\s+/g, '');
      const foundOrder = await trackGuestOrder(orderId.trim(), cleanedIdentifier);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setError("We couldn't find an order matching those details. Please check and try again.");
      }
    } catch (err) {
      setError("Something went wrong while searching for your order.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30';
      case 'shipped': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/30';
      case 'ready': return 'text-amber-600 bg-amber-50 dark:bg-amber-900/30';
      case 'accepted': return 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30';
      case 'cancelled': return 'text-rose-600 bg-rose-50 dark:bg-rose-900/30';
      case 'refunded': return 'text-gray-500 bg-gray-50 dark:bg-slate-800/50';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-500 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold mb-10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <div className="inline-flex p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-3xl mb-6">
            <Search className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
            Track Your Order
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
            Enter your Order ID and the Email or Phone Number used during checkout.
          </p>
        </div>

        <div className="bg-card text-card-foreground rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-800 p-8 md:p-12 mb-12 transition-colors">
          <form onSubmit={handleTrack} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Order ID</label>
                <input
                  type="text"
                  value={orderId}
                  onChange={e => setOrderId(e.target.value)}
                  placeholder="e.g. ord_123456789"
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Email or Phone</label>
                <input
                  type="text"
                  value={emailOrPhone}
                  onChange={e => setEmailOrPhone(e.target.value)}
                  placeholder="john@example.com or +15551234"
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600"
                  required
                />
              </div>
            </div>

            {/* Optional email for invoice */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                Email for Invoice <span className="text-gray-300 dark:text-gray-600 normal-case font-medium">(optional)</span>
              </label>
              <input
                type="email"
                value={invoiceEmail}
                onChange={e => setInvoiceEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-3 p-4 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-2xl font-bold text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p>{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isLoading || !orderId.trim() || !emailOrPhone.trim()}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-extrabold uppercase tracking-wider hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  Track Order
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>

        <AnimatePresence>
          {order && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card text-card-foreground rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors"
            >
              <div className="p-8 md:p-10 border-b border-gray-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white">Order Details</h2>
                  <p className="text-gray-400 dark:text-gray-500 font-medium text-sm mt-1">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleTrack as any}
                    disabled={isLoading}
                    className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all border border-gray-100 dark:border-slate-700 hover:border-indigo-100 dark:hover:border-indigo-800/50"
                    title="Refresh status"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  </button>
                  <div className={`px-4 py-2 rounded-xl font-bold uppercase tracking-widest text-sm inline-flex items-center gap-2 w-fit ${getStatusColor(order.status)}`}>
                    <Package className="w-4 h-4" />
                    {order.status}
                  </div>
                </div>
              </div>

              {/* ── Progress Tracker ── */}
              {order.status !== 'cancelled' && order.status !== 'refunded' && (
                <div className="px-8 md:px-10 py-6 bg-gray-50/50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    {ALL_STEPS.map((step, i) => {
                      const conf = STATUS_CONFIG[step] || STATUS_CONFIG.pending;
                      const currentStep = STATUS_CONFIG[order.status]?.step || 1;
                      const isActive = i < currentStep;
                      const isCurrent = i === currentStep - 1;
                      return (
                        <div key={step} className="flex items-center flex-1">
                          <div className="flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full transition-all duration-500 ${isCurrent
                              ? `${conf.dot} ring-4 ring-opacity-20 ring-current scale-125`
                              : isActive
                                ? conf.dot
                                : "bg-gray-200 dark:bg-slate-700"
                              }`} />
                            <span className={`text-[8px] font-bold uppercase tracking-wider mt-2 hidden sm:block ${isActive ? "text-gray-600 dark:text-gray-300" : "text-gray-300 dark:text-gray-600"
                              }`}>
                              {conf.label}
                            </span>
                          </div>
                          {i < ALL_STEPS.length - 1 && (
                            <div className={`flex-1 h-[2px] mx-2 rounded-full transition-colors duration-500 ${i < currentStep - 1 ? "bg-indigo-200 dark:bg-indigo-900" : "bg-gray-200 dark:bg-slate-800"
                              }`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="p-8 md:p-10 grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Shipping To
                    </h3>
                    <p className="text-gray-900 dark:text-white font-medium whitespace-pre-line bg-gray-50 dark:bg-slate-800 p-4 rounded-2xl">
                      {order.shipping_address}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <CreditCard className="w-4 h-4" /> Payment Method
                    </h3>
                    <p className="text-gray-900 dark:text-white font-medium capitalize bg-gray-50 dark:bg-slate-800 px-4 py-3 rounded-2xl inline-block">
                      {order.payment_method}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Items Summary</h3>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-slate-800 rounded-xl overflow-hidden shrink-0 flex items-center justify-center border border-gray-100 dark:border-slate-700">
                          <img src={item.image_url} alt={item.name} className="w-full h-full object-contain p-2" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate">{item.name}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-gray-900 dark:text-white tabular-nums">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="font-bold text-gray-500 dark:text-gray-400">Total</span>
                    <span className="text-2xl font-black text-gray-900 dark:text-white tabular-nums">${order.total_price.toFixed(2)}</span>
                  </div>

                  {/* ── Invoice Actions ── */}
                  <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      onClick={() => downloadInvoice(order)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-sm font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors border border-indigo-100 dark:border-indigo-800/50"
                    >
                      <Download className="w-4 h-4" />
                      Download Invoice
                    </button>
                    {invoiceEmail.trim() && (
                      <button
                        onClick={() => sendInvoiceToEmail(order, invoiceEmail.trim())}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-sm font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors border border-emerald-100 dark:border-emerald-800/50"
                      >
                        <Mail className="w-4 h-4" />
                        Send to {invoiceEmail.trim()}
                      </button>
                    )}
                  </div>

                  {order.status === 'pending' && (
                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800">
                      <AnimatePresence mode="wait">
                        {confirmCancel ? (
                          <motion.div
                            key="confirm"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex flex-col sm:flex-row items-center gap-3 bg-rose-50 dark:bg-rose-900/20 p-4 rounded-2xl border border-rose-100 dark:border-rose-900/50"
                          >
                            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm w-full sm:w-auto">
                              <AlertTriangle className="w-5 h-5 shrink-0" />
                              <span>Are you sure you want to cancel?</span>
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
                              <button
                                onClick={handleCancel}
                                disabled={isCancelling}
                                className="flex-1 sm:flex-none px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-rose-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                              >
                                {isCancelling ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                Yes, Cancel
                              </button>
                              <button
                                onClick={() => setConfirmCancel(false)}
                                disabled={isCancelling}
                                className="flex-1 sm:flex-none px-4 py-2 bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 rounded-xl text-xs font-bold uppercase tracking-wider border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                              >
                                No, Keep It
                              </button>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.button
                            key="cancel-btn"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setConfirmCancel(true)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all text-sm font-bold uppercase tracking-widest border border-transparent hover:border-rose-100 dark:hover:border-rose-900/50"
                          >
                            <Trash2 className="w-4 h-4" />
                            Cancel Order
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
