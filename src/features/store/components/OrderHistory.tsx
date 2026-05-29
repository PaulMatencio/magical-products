/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Clock,
  Package,
  Truck,
  CheckCircle,
  CreditCard,
  MapPin,
  Edit2,
  Check,
  Trash2,
  Loader2,
  Bell,
  BellOff,
  ShoppingBag,
  X,
  AlertTriangle,
  Hash,
  Download,
  ReceiptText,
  RefreshCw,
  Phone,
  CalendarDays,
} from "lucide-react";
import { Order } from "../../../types/types";
import { notificationService } from "../../../services/notificationService";
import { downloadInvoice } from "../../../utils/invoiceGenerator";
import appConfig from "../../../config/appConfig";
import { fetchCancellationPolicy } from "../../../services/settingsService";

interface OrderHistoryProps {
  orders: Order[];
  onBack: () => void;
  onUpdateOrders: () => void;
  updateShippingAddress: (orderId: string, newAddress: string) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;
}

const STATUS_CONFIG: Record<string, {
  icon: any;
  label: string;
  bg: string;
  text: string;
  border: string;
  dot: string;
  step: number;
}> = {
  pending: { icon: Clock, label: "Pending", bg: "bg-amber-50 dark:bg-amber-950/30", text: "text-amber-700 dark:text-amber-300", border: "border-amber-100 dark:border-amber-900/60", dot: "bg-amber-400", step: 1 },
  accepted: { icon: CheckCircle, label: "Accepted", bg: "bg-sky-50 dark:bg-sky-950/30", text: "text-sky-700 dark:text-sky-300", border: "border-sky-100 dark:border-sky-900/60", dot: "bg-sky-400", step: 2 },
  ready: { icon: Package, label: "Ready", bg: "bg-indigo-50 dark:bg-indigo-950/30", text: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-100 dark:border-indigo-900/60", dot: "bg-indigo-400", step: 3 },
  shipped: { icon: Truck, label: "Shipped", bg: "bg-violet-50 dark:bg-violet-950/30", text: "text-violet-700 dark:text-violet-300", border: "border-violet-100 dark:border-violet-900/60", dot: "bg-violet-400", step: 4 },
  delivered: { icon: CheckCircle, label: "Delivered", bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-100 dark:border-emerald-900/60", dot: "bg-emerald-400", step: 5 },
  cancelled: { icon: X, label: "Cancelled", bg: "bg-rose-50 dark:bg-rose-950/30", text: "text-rose-700 dark:text-rose-300", border: "border-rose-100 dark:border-rose-900/60", dot: "bg-rose-400", step: 0 },
  refunded: { icon: RefreshCw, label: "Refunded", bg: "bg-slate-100 dark:bg-slate-800/50", text: "text-slate-600 dark:text-slate-400", border: "border-slate-200 dark:border-slate-700", dot: "bg-slate-400", step: 0 },
};

const ALL_STEPS = ["pending", "accepted", "ready", "shipped", "delivered"];

function getStepTimestamp(createdAt: string, stepIndex: number, currentStep: number, statusHistory?: Record<string, string>) {
  const stepKeys = ["pending", "accepted", "ready", "shipped", "delivered"];
  const stepKey = stepKeys[stepIndex];
  if (statusHistory && statusHistory[stepKey]) {
    return new Date(statusHistory[stepKey]);
  }

  const createdDate = new Date(createdAt);
  if (stepIndex > currentStep - 1) return null;

  // Offsets to simulate event times:
  // Step 0 (pending): +0 mins
  // Step 1 (accepted): +15 mins
  // Step 2 (ready): +45 mins
  // Step 3 (shipped): +2 hours
  // Step 4 (delivered): +4 hours
  const offsets = [
    0, // pending
    15 * 60 * 1000, // accepted (+15 mins)
    45 * 60 * 1000, // ready (+45 mins)
    120 * 60 * 1000, // shipped (+2 hours)
    240 * 60 * 1000 // delivered (+4 hours)
  ];
  
  const stepTime = new Date(createdDate.getTime() + offsets[stepIndex]);
  const now = new Date();
  return stepTime > now ? now : stepTime;
}

function formatOrderId(orderId: string) {
  return orderId.slice(0, 8).toLowerCase();
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatMoney(value: number) {
  return `${appConfig.currency_symbol}${value.toFixed(2)}`;
}

export function OrderHistory({ orders, onBack, onUpdateOrders, updateShippingAddress, deleteOrder }: OrderHistoryProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newAddress, setNewAddress] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCancelling, setIsCancelling] = useState<string | null>(null);
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);
  const [policyText, setPolicyText] = useState("");
  const [loadingPolicyId, setLoadingPolicyId] = useState<string | null>(null);

  const handleInitiateCancel = async (orderId: string) => {
    setLoadingPolicyId(orderId);
    try {
      const policy = await fetchCancellationPolicy();
      setPolicyText(policy);
      setConfirmCancelId(orderId);
    } catch (err) {
      console.error("Failed to load cancellation policy:", err);
    } finally {
      setLoadingPolicyId(null);
    }
  };

  const summary = useMemo(() => {
    const active = orders.filter(order => ["pending", "accepted", "ready", "shipped"].includes(order.status)).length;
    const delivered = orders.filter(order => order.status === "delivered").length;
    const cancelled = orders.filter(order => order.status === "cancelled").length;
    const refunded = orders.filter(order => order.status === "refunded").length;
    const total = orders.filter(order => order.status !== "cancelled" && order.status !== "refunded").reduce((sum, order) => sum + order.total_price, 0);

    return { active, delivered, cancelled, refunded, total };
  }, [orders]);

  const startEditing = (order: Order) => {
    setEditingId(order.id);
    setNewAddress(order.shipping_address);
  };

  const saveAddress = async (orderId: string) => {
    setIsUpdating(true);
    try {
      await updateShippingAddress(orderId, newAddress);
      onUpdateOrders();
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update address:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = async (order: Order) => {
    setIsCancelling(order.id);
    try {
      await deleteOrder(order.id);
      onUpdateOrders();
      setConfirmCancelId(null);
    } catch (err: any) {
      console.error("OrderHistory: Cancellation failed:", err);
      alert(`Failed to cancel order: ${err.message || "Unknown error"}.`);
    } finally {
      setIsCancelling(null);
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      <div className="sticky top-0 z-30 border-b border-slate-200/70 dark:border-slate-800 bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-black text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 active:scale-[0.98] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Store
          </button>

          <div className="flex items-center gap-2">
            {Notification.permission === "denied" && (
              <div className="hidden sm:flex items-center gap-1.5 text-rose-600 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/30 px-2.5 py-1.5 rounded-xl border border-rose-100 dark:border-rose-900/60">
                <BellOff className="w-3.5 h-3.5" />
                <span className="text-[10px] font-black uppercase tracking-wider">Blocked</span>
              </div>
            )}
            <button
              onClick={() => {
                notificationService.sendNotification("Test Ready!", "Notifications are working correctly.");
                if (Notification.permission !== "granted") {
                  alert(`Notification status: ${Notification.permission}. \n\n1. Please open the app in a NEW TAB.\n2. Click the lock icon in the address bar.\n3. Enable/Allow Notifications.`);
                }
              }}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-card text-card-foreground hover:text-indigo-600 dark:hover:text-indigo-300 transition-all text-xs font-black uppercase tracking-wider"
              title="Test notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Test</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <section className="mb-8 rounded-[1rem] overflow-hidden border border-slate-200 dark:border-slate-800 bg-card text-card-foreground shadow-sm">
          <div className="p-6 sm:p-8 bg-slate-950 text-white">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-black uppercase tracking-widest text-indigo-100 mb-5">
                  <ReceiptText className="w-4 h-4" />
                  Account
                </div>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Order History</h1>
                <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl">
                  Review purchases, track fulfillment, update eligible shipping details, and download invoices.
                </p>
              </div>

              <button
                onClick={onUpdateOrders}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white text-slate-950 font-black text-sm hover:bg-indigo-50 active:scale-[0.98] transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 divide-x divide-y sm:divide-y-0 divide-slate-100 dark:divide-slate-800">
            {[
              { label: "Orders", value: orders.length, icon: ShoppingBag },
              { label: "Active", value: summary.active, icon: Truck },
              { label: "Delivered", value: summary.delivered, icon: CheckCircle },
              { label: "Cancelled", value: summary.cancelled, icon: X },
              { label: "Refunded", value: summary.refunded, icon: RefreshCw },
              { label: "Spent", value: formatMoney(summary.total), icon: CreditCard },
            ].map(stat => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                    <Icon className="w-4 h-4" />
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <p className="mt-2 text-xl sm:text-2xl font-black text-slate-950 dark:text-white tabular-nums">{stat.value}</p>
                </div>
              );
            })}
          </div>
        </section>

        {orders.length === 0 ? (
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[1rem] border border-dashed border-slate-300 dark:border-slate-800 bg-card text-card-foreground px-6 py-16 text-center"
          >
            <div className="mx-auto mb-6 w-20 h-20 rounded-[1rem] bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <ShoppingBag className="w-9 h-9 text-slate-400" />
            </div>
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">No orders yet</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Once you make a purchase, status updates and invoices will appear here.
            </p>
            <button
              onClick={onBack}
              className="mt-8 px-6 py-3 bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-sm font-black rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Start Shopping
            </button>
          </motion.section>
        ) : (
          <div className="grid gap-6 sm:gap-8">
            {orders.map((order, orderIndex) => {
              const canEdit = order.status === "pending" || order.status === "accepted";
              const statusConf = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
              const StatusIcon = statusConf.icon;
              const currentStep = statusConf.step;

              return (
                <motion.article
                  key={order.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: orderIndex * 0.04 }}
                  className="overflow-hidden rounded-[1rem] border border-slate-200 dark:border-slate-800 bg-card text-card-foreground shadow-sm hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-black/20 transition-all duration-300"
                >
                  <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                      <div className="flex items-start gap-4 min-w-0">
                        <div className={`w-12 h-12 rounded-2xl ${statusConf.bg} ${statusConf.text} border ${statusConf.border} flex items-center justify-center shrink-0`}>
                          <StatusIcon className="w-6 h-6" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="font-mono text-lg font-black text-slate-950 dark:text-white">#{formatOrderId(order.id)}</h2>
                            {order.is_guest && (
                              <span className="px-2 py-1 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border border-amber-100 dark:border-amber-900/60 text-[9px] font-black uppercase tracking-widest">
                                Guest
                              </span>
                            )}
                          </div>
                          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                            <span className="inline-flex items-center gap-1.5">
                              <CalendarDays className="w-3.5 h-3.5" />
                              {formatDate(order.created_at)}
                            </span>
                            <span className="inline-flex items-center gap-1.5 capitalize">
                              <CreditCard className="w-3.5 h-3.5" />
                              {order.payment_method}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap lg:justify-end items-center gap-3">
                        <span className={`inline-flex items-center gap-2 px-3 py-2 rounded-2xl border ${statusConf.bg} ${statusConf.text} ${statusConf.border} text-[10px] font-black uppercase tracking-widest`}>
                          <span className={`w-2 h-2 rounded-full ${statusConf.dot}`} />
                          {statusConf.label}
                        </span>
                        <div className="px-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-right">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total</p>
                          <p className="text-xl font-black text-slate-950 dark:text-white tabular-nums">{formatMoney(order.total_price)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {(order.status === 'cancelled' || order.status === 'refunded') ? (
                    <div className="px-5 sm:px-6 py-4 bg-rose-500/10 dark:bg-rose-950/20 border-b border-rose-100 dark:border-rose-900/30 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 text-xs font-black uppercase tracking-wider">
                        {order.status === 'cancelled' ? <X className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
                        Order {order.status}
                      </div>
                      {(() => {
                        const cancelTime = order.status_history?.[order.status] 
                          ? new Date(order.status_history[order.status]) 
                          : new Date(new Date(order.created_at).getTime() + 10 * 60 * 1000); // simulated fallback (+10 min)
                        return (
                          <p className="text-[10px] sm:text-xs font-black text-rose-600 dark:text-rose-400 tabular-nums">
                            {order.status === 'cancelled' ? 'Cancelled' : 'Refunded'} on {cancelTime.toLocaleDateString("en-US", { month: "short", day: "numeric" })} at {cancelTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                          </p>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="px-5 sm:px-6 py-5 bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800">
                      <div className="grid grid-cols-5 gap-2">
                        {ALL_STEPS.map((step, i) => {
                          const conf = STATUS_CONFIG[step];
                          const isComplete = i < currentStep;
                          const isCurrent = i === currentStep - 1;
                          return (
                            <div key={step} className="min-w-0">
                              <div className={`h-2 rounded-full transition-colors ${isComplete ? conf.dot : "bg-slate-200 dark:bg-slate-800"}`} />
                              <p className={`mt-2 truncate text-[9px] sm:text-[10px] font-black uppercase tracking-wider ${isCurrent ? conf.text : isComplete ? "text-slate-600 dark:text-slate-300" : "text-slate-300 dark:text-slate-700"}`}>
                                {conf.label}
                              </p>
                              {(() => {
                                const stepTime = getStepTimestamp(order.created_at, i, currentStep, order.status_history);
                                if (!stepTime) return null;
                                return (
                                  <p className="text-[8px] sm:text-[9px] text-slate-400 dark:text-slate-500 mt-0.5 font-bold leading-tight tabular-nums">
                                    {stepTime.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                    <span className="hidden sm:inline"> at </span>
                                    <span className="sm:hidden"><br/></span>
                                    {stepTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                                  </p>
                                );
                              })()}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="p-5 sm:p-6 grid lg:grid-cols-[1fr_360px] gap-6">
                    <div className="space-y-5 min-w-0">
                      <section className="rounded-[1rem] border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-4">
                        <div className="flex justify-between items-start gap-3 mb-3">
                          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <MapPin className="w-3.5 h-3.5" />
                            Shipping
                          </div>
                          {editingId !== order.id && (
                            <button
                              onClick={() => startEditing(order)}
                              disabled={!canEdit}
                              title={!canEdit ? "Address cannot be changed once the order is ready" : "Edit shipping address"}
                              className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-colors ${canEdit ? "text-indigo-600 dark:text-indigo-300 hover:text-indigo-700" : "text-slate-300 dark:text-slate-700 cursor-not-allowed"}`}
                            >
                              <Edit2 className="w-3 h-3" />
                              Edit
                            </button>
                          )}
                        </div>

                        <AnimatePresence mode="wait">
                          {editingId === order.id ? (
                            <motion.div
                              key="edit"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="space-y-3"
                            >
                              <textarea
                                value={newAddress}
                                onChange={(e) => setNewAddress(e.target.value)}
                                placeholder="Enter your shipping address..."
                                className="w-full p-3 bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all resize-none font-medium"
                                rows={3}
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => saveAddress(order.id)}
                                  disabled={isUpdating || !newAddress.trim()}
                                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-colors disabled:opacity-50"
                                >
                                  {isUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                                  {isUpdating ? "Saving" : "Save"}
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="px-4 py-2 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div key="display" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              <p className={`text-sm whitespace-pre-wrap leading-relaxed ${order.shipping_address === "No address provided" ? "text-slate-400 italic" : "text-slate-700 dark:text-slate-200 font-bold"}`}>
                                {order.shipping_address || "No address provided"}
                              </p>
                              {order.user_phone && (
                                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs font-black text-slate-800 dark:text-slate-100">
                                  <Phone className="w-3.5 h-3.5 text-indigo-500" />
                                  {order.user_phone}
                                </div>
                              )}
                              {!canEdit && (
                                <p className="mt-3 text-[10px] text-slate-400 italic">Address locked because this order is {order.status}.</p>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </section>

                      <section className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Items</h3>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{order.items.length} total</span>
                        </div>

                        <div className="grid gap-2">
                          {order.items.map((item) => {
                            const hasDiscount = item.discount_percentage !== undefined && item.discount_percentage > 0;
                            const finalPrice = hasDiscount ? item.price * (1 - item.discount_percentage / 100) : item.price;

                            return (
                              <div key={item.id} className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950/40">
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 overflow-hidden flex-shrink-0 flex items-center justify-center border border-slate-100 dark:border-slate-800">
                                  <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="w-full h-full object-contain p-1.5"
                                  // referrerpolicy="no-referrer"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-black text-sm text-slate-950 dark:text-white truncate">{item.name}</h4>
                                  <p className="text-xs text-slate-400 font-bold tabular-nums">
                                    {item.quantity} x{" "}
                                    {hasDiscount ? (
                                      <>
                                        <span className="line-through text-slate-300 dark:text-slate-600 mr-1.5">
                                          {formatMoney(item.price)}
                                        </span>
                                        <span className="text-rose-600 dark:text-rose-300 font-black mr-1.5">
                                          {formatMoney(finalPrice)}
                                        </span>
                                        <span className="text-[9px] bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-300 px-1.5 py-0.5 rounded-full font-black uppercase">
                                          -{item.discount_percentage}%
                                        </span>
                                      </>
                                    ) : (
                                      formatMoney(item.price)
                                    )}
                                  </p>
                                </div>
                                <div className="font-black text-sm text-slate-950 dark:text-white tabular-nums">
                                  {formatMoney(finalPrice * item.quantity)}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    </div>

                    <aside className="space-y-3">
                      <div className="rounded-[1rem] border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Actions</p>
                        <div className="grid gap-2">
                          <button
                            onClick={() => downloadInvoice(order)}
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all text-xs font-black uppercase tracking-widest"
                            title="Download invoice"
                          >
                            <Download className="w-4 h-4" />
                            Invoice
                          </button>

                          {appConfig.cancellation.allowedStatuses.includes(order.status) && (
                            <AnimatePresence mode="wait">
                              {confirmCancelId === order.id ? (
                                <motion.div
                                  key="confirm"
                                  initial={{ opacity: 0, scale: 0.98 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.98 }}
                                  className="rounded-2xl border border-rose-100 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/30 p-4 flex flex-col gap-3"
                                >
                                  <div className="text-xs text-rose-800 dark:text-rose-200 font-bold border-b border-rose-100 dark:border-rose-900/20 pb-2">
                                    <span className="uppercase tracking-widest text-[9px] text-rose-500 block mb-1">Cancellation Policy:</span>
                                    <p className="leading-relaxed font-medium">{policyText}</p>
                                  </div>
                                  <div className="flex items-start gap-2 text-rose-700 dark:text-rose-300">
                                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                                    <p className="text-xs font-bold font-sans">Are you sure you want to cancel this order?</p>
                                  </div>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleCancel(order)}
                                      disabled={isCancelling === order.id}
                                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-rose-700 transition-colors disabled:opacity-50"
                                    >
                                      {isCancelling === order.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                                      Yes, Cancel
                                    </button>
                                    <button
                                      onClick={() => setConfirmCancelId(null)}
                                      disabled={isCancelling === order.id}
                                      className="px-4 py-2 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all disabled:opacity-50 text-[10px] font-black uppercase tracking-wider"
                                    >
                                      No
                                    </button>
                                  </div>
                                </motion.div>
                              ) : (
                                <motion.button
                                  key="cancel-btn"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  disabled={loadingPolicyId === order.id}
                                  onClick={() => handleInitiateCancel(order.id)}
                                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-rose-100 dark:border-rose-900/60 text-rose-600 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all text-xs font-black uppercase tracking-widest disabled:opacity-50"
                                >
                                  {loadingPolicyId === order.id ? (
                                    <>
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                      Loading Policy...
                                    </>
                                  ) : (
                                    <>
                                      <Trash2 className="w-4 h-4" />
                                      Cancel Order
                                    </>
                                  )}
                                </motion.button>
                              )}
                            </AnimatePresence>
                          )}
                        </div>
                      </div>

                      <div className="rounded-[1rem] bg-slate-950 text-white p-4">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Order Total</span>
                          <Hash className="w-4 h-4 text-slate-500" />
                        </div>
                        <p className="mt-2 text-3xl font-black tabular-nums">{formatMoney(order.total_price)}</p>
                      </div>
                    </aside>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
