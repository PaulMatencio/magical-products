/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, Fragment } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAdmin } from '../../context/AdminContext';
import { toast } from 'sonner';
import { BrowserWallet, Transaction } from '@meshsdk/core';
import {
  Loader2, Package, Clock, CheckCircle, Truck, Filter, Calendar,
  ChevronDown, ChevronUp, MapPin, CreditCard, ShoppingBag, ArrowUpDown,
  TrendingUp, RefreshCw, Hash, Sun, Moon, X, Activity, AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Order } from '../../types/types';
import { supabase } from '../../services/supabase';
import { fetchLiveAdaRate } from '../../services/cryptoService';

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS = {
  pending: { label: 'Pending', bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-900/30', dot: 'bg-amber-400', icon: Clock },
  accepted: { label: 'Accepted', bg: 'bg-sky-50 dark:bg-sky-900/20', text: 'text-sky-700 dark:text-sky-400', border: 'border-sky-200 dark:border-sky-900/30', dot: 'bg-sky-500', icon: CheckCircle },
  ready: { label: 'Ready', bg: 'bg-indigo-50 dark:bg-indigo-900/20', text: 'text-indigo-700 dark:text-indigo-400', border: 'border-indigo-200 dark:border-indigo-900/30', dot: 'bg-indigo-500', icon: Package },
  shipped: { label: 'Shipped', bg: 'bg-violet-50 dark:bg-violet-900/20', text: 'text-violet-700 dark:text-violet-400', border: 'border-violet-200 dark:border-violet-900/30', dot: 'bg-violet-500', icon: Truck },
  delivered: { label: 'Delivered', bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-900/30', dot: 'bg-emerald-500', icon: CheckCircle },
  cancelled: { label: 'Cancelled', bg: 'bg-rose-50 dark:bg-rose-900/20', text: 'text-rose-700 dark:text-rose-400', border: 'border-rose-200 dark:border-rose-900/30', dot: 'bg-rose-500', icon: X },
  refunded: { label: 'Refunded', bg: 'bg-slate-100 dark:bg-slate-800/20', text: 'text-slate-600 dark:text-slate-400', border: 'border-slate-200 dark:border-slate-700', dot: 'bg-slate-500', icon: RefreshCw },
} as const;

type StatusKey = keyof typeof STATUS;

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS[status as StatusKey] ?? STATUS.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase border ${cfg.bg} ${cfg.text} ${cfg.border} transition-colors`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

// ── Sort helper ───────────────────────────────────────────────────────────────
function SortTh({ label, field, current, dir, onToggle }: {
  label: string; field: string; current: string; dir: 'asc' | 'desc'; onToggle: () => void;
}) {
  const active = current === field;
  return (
    <th
      className={`px-6 py-4 cursor-pointer select-none transition-colors ${active ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-300'}`}
      onClick={onToggle}
    >
      <div className="flex items-center gap-1.5 font-black text-[10px] uppercase tracking-widest">
        {label}
        <ArrowUpDown className={`w-3 h-3 transition-opacity ${active ? 'opacity-100' : 'opacity-40'}`} />
        {active && <span className="text-xs leading-none">{dir === 'asc' ? '↑' : '↓'}</span>}
      </div>
    </th>
  );
}

export function OrderManager() {
  const { theme } = useTheme();
  const { adminOrders: allOrders, isFetchingAdminOrders: isFetchingOrders, fetchAllOrders, updateOrderStatus } = useAdmin();


  const [filterStatus, setFilterStatus] = useState<StatusKey | 'all'>('all');
  const [sortField, setSortField] = useState<keyof Order>('created_at');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [paymentEvents, setPaymentEvents] = useState<any[]>([]);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const [isAdminRefundConnecting, setIsAdminRefundConnecting] = useState(false);
  const [adminRefundWalletAddress, setAdminRefundWalletAddress] = useState<string | null>(null);
  const [isAdminRefundProcessing, setIsAdminRefundProcessing] = useState(false);
  const [adminRefundTxHash, setAdminRefundTxHash] = useState<string | null>(null);
  const [adminRefundError, setAdminRefundError] = useState<string | null>(null);

  const handleAdminWalletConnect = async () => {
    setIsAdminRefundConnecting(true);
    try {
      if (window.cardano && window.cardano.lace) {
        const wallet = await BrowserWallet.enable("lace");
        const changeAddr = await wallet.getChangeAddress();
        if (changeAddr) {
          setAdminRefundWalletAddress(changeAddr);
          toast.success("Merchant wallet connected successfully!");
        } else {
          toast.error("Connected to wallet, but found no change address.");
        }
      } else {
        toast.error("Lace wallet extension not found. Please install Lace.");
      }
    } catch (err: any) {
      console.error("Failed to connect merchant wallet:", err);
      toast.error(err?.message || "Failed to connect wallet.");
    } finally {
      setIsAdminRefundConnecting(false);
    }
  };

  const handleCardanoAdminRefund = async (payment: any, orderId: string) => {
    const customerAddress = payment.metadata?.customer_wallet_address;
    if (!customerAddress) {
      toast.error("No customer wallet address found in payment details.");
      return;
    }

    setIsAdminRefundProcessing(true);
    setAdminRefundError(null);
    setAdminRefundTxHash(null);

    try {
      const wallet = await BrowserWallet.enable("lace");
      
      let refundAda: number;
      if (payment.metadata?.crypto_ada_amount) {
        refundAda = Number(payment.metadata.crypto_ada_amount);
      } else {
        const rate = await fetchLiveAdaRate();
        refundAda = (payment.amount_requested / 100) * rate;
      }
      const refundLovelace = Math.round(refundAda * 1_000_000).toString();

      const tx = new Transaction({ initiator: wallet });
      tx.sendLovelace(customerAddress, refundLovelace);

      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);

      setAdminRefundTxHash(txHash);
      toast.success("Refund transaction submitted successfully!");

      const updatedMetadata = {
        ...payment.metadata,
        refund_tx_hash: txHash,
        refunded_at: new Date().toISOString()
      };

      const { error: paymentErr } = await supabase
        .from('payments')
        .update({
          provider_status: 'refunded',
          metadata: updatedMetadata
        })
        .eq('id', payment.id);

      if (paymentErr) {
        console.error("Failed to update payment record status:", paymentErr);
      }

      await updateOrderStatus(orderId, 'refunded');
      setPaymentDetails((prev: any) => ({
        ...prev,
        provider_status: 'refunded',
        metadata: updatedMetadata
      }));
      fetchAllOrders();

    } catch (err: any) {
      console.error("Cardano refund failed:", err);
      setAdminRefundError(err?.message || err?.info || JSON.stringify(err));
    } finally {
      setIsAdminRefundProcessing(false);
    }
  };

  const handlePaymentFollowUp = async (paymentId: string) => {
    setSelectedPaymentId(paymentId);
    setIsLoadingPayment(true);
    setPaymentError(null);
    setPaymentDetails(null);
    setPaymentEvents([]);
    try {
      const { data: payment, error: paymentErr } = await supabase
        .from('payments')
        .select('*')
        .eq('id', paymentId)
        .maybeSingle();

      if (paymentErr) throw paymentErr;
      if (!payment) {
        setPaymentError("Payment record not found.");
        return;
      }
      setPaymentDetails(payment);

      const { data: events, error: eventsErr } = await supabase
        .from('payment_events')
        .select('*')
        .eq('payment_id', paymentId)
        .order('created_at', { ascending: true });

      if (eventsErr) {
        console.warn("Could not load payment events:", eventsErr);
      } else {
        setPaymentEvents(events || []);
      }
    } catch (err: any) {
      console.error("Error following up payment:", err);
      setPaymentError(err.message || "Failed to load payment details.");
    } finally {
      setIsLoadingPayment(false);
    }
  };

  useEffect(() => { fetchAllOrders(); }, [fetchAllOrders]);

  const handleStatusUpdate = async (id: string, s: Order['status']) => {
    setUpdatingId(id);
    try {
      await updateOrderStatus(id, s);
      toast.success(`Order status updated to ${s}.`);
    } catch (err: any) {
      toast.error(err.message || `Failed to update order status.`);
    } finally {
      setUpdatingId(null);
    }
  };

  const toggleSort = (f: keyof Order) => {
    if (sortField === f) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortField(f); setSortDir('desc'); }
  };

  const filtered = (allOrders || [])
    .filter(o => filterStatus === 'all' || o.status === filterStatus)
    .sort((a, b) => {
      const va = a[sortField];
      const vb = b[sortField];
      if (va === undefined || vb === undefined) return 0;
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

  const stats = {
    total: (allOrders || []).length,
    pending: (allOrders || []).filter(o => o.status === 'pending').length,
    ready: (allOrders || []).filter(o => o.status === 'ready').length,
    delivered: (allOrders || []).filter(o => o.status === 'delivered').length,
  };

  if (isFetchingOrders && allOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium transition-colors">Loading global orders…</p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

      {/* ── Header & Stats ── */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-pink-600 dark:from-violet-400 dark:to-pink-400">
            Order Management
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 transition-colors">Track and fulfill customer orders globally.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            { label: 'All', value: stats.total, icon: ShoppingBag, color: 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400' },
            { label: 'Pending', value: stats.pending, icon: Clock, color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
            { label: 'Ready', value: stats.ready, icon: Package, color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' },
            { label: 'Done', value: stats.delivered, icon: CheckCircle, color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' },
          ].map(s => (
            <div key={s.label} className={`${s.color} px-4 py-2.5 rounded-2xl flex items-center gap-3 border border-transparent transition-colors`}>
              <s.icon className="w-4 h-4 opacity-70" />
              <div className="flex flex-col leading-none">
                <span className="text-lg font-black">{s.value}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Filters & Main Table ── */}
      <div className="bg-white dark:bg-slate-900 rounded-[1rem] border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">

        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 dark:border-slate-800 bg-gray-50/40 dark:bg-slate-800/20 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0 w-full md:w-auto">
            <Filter className="w-4 h-4 text-gray-400 dark:text-slate-500 shrink-0" />
            {(['all', ...Object.keys(STATUS)] as const).map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s as StatusKey | 'all')}

                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${filterStatus === s ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/20' : 'text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            onClick={() => fetchAllOrders()}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetchingOrders ? 'animate-spin' : ''}`} />
            Sync Data
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 dark:bg-slate-800/40 border-b border-gray-100 dark:border-slate-800 transition-colors">
                <th className="w-12 px-6 py-4"></th>
                <SortTh label="Order ID" field="id" current={sortField} dir={sortDir} onToggle={() => toggleSort('id')} />
                <SortTh label="Date" field="created_at" current={sortField} dir={sortDir} onToggle={() => toggleSort('created_at')} />
                <SortTh label="User" field="user_id" current={sortField} dir={sortDir} onToggle={() => toggleSort('user_id')} />
                <SortTh label="Total" field="total_price" current={sortField} dir={sortDir} onToggle={() => toggleSort('total_price')} />
                <SortTh label="Status" field="status" current={sortField} dir={sortDir} onToggle={() => toggleSort('status')} />
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <AnimatePresence mode="popLayout">
              {filtered.map((order) => {
                const isExpanded = expandedId === order.id;
                return (
                  <motion.tbody
                    key={order.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`border-b border-gray-50 dark:border-slate-800 transition-colors ${isExpanded ? 'bg-indigo-50/30 dark:bg-indigo-900/5' : ''}`}
                  >
                    <tr
                      className="group hover:bg-indigo-50/20 dark:hover:bg-indigo-900/10 transition-colors cursor-pointer"
                      onClick={() => setExpandedId(isExpanded ? null : order.id)}
                    >
                      <td className="px-6 py-4">
                        <div className={`p-1 rounded-lg transition-colors ${isExpanded ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400' : 'text-gray-300 dark:text-slate-600'}`}>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-800 px-2 py-1 rounded-lg transition-colors">#{order.id.slice(0, 8)}</span>
                          {updatingId === order.id && <Loader2 className="w-3 h-3 text-indigo-500 animate-spin" />}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-slate-400 transition-colors">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 opacity-40" />
                          {new Date(order.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-slate-400 transition-colors truncate max-w-[120px]">
                        {order.user_email || order.user_id.slice(0, 12)}...
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-black text-gray-900 dark:text-white text-sm transition-colors">${(order.total_price || 0).toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          {/* Context-aware action button */}
                          {order.status === 'pending' && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleStatusUpdate(order.id, 'accepted'); }}
                              className="px-3 py-1.5 bg-sky-500 text-white text-[10px] font-black uppercase rounded-lg hover:bg-sky-600 transition-all active:scale-95"
                            >
                              Accept
                            </button>
                          )}
                          {order.status === 'accepted' && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleStatusUpdate(order.id, 'ready'); }}
                              className="px-3 py-1.5 bg-indigo-500 text-white text-[10px] font-black uppercase rounded-lg hover:bg-indigo-600 transition-all active:scale-95"
                            >
                              Ready
                            </button>
                          )}
                          {order.status === 'cancelled' && order.payment_status && ['succeeded', 'completed'].includes(order.payment_status) && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (order.payment_method === 'crypto' && order.payment_id) {
                                  handlePaymentFollowUp(order.payment_id);
                                  toast.info("Please process the Cardano refund inside the follow-up panel.");
                                } else {
                                  handleStatusUpdate(order.id, 'refunded');
                                }
                              }}
                              className="px-3 py-1.5 bg-emerald-500 text-white text-[10px] font-black uppercase rounded-lg hover:bg-emerald-600 transition-all active:scale-95"
                            >
                              Refund
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* ── Expanded Content ── */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="bg-gray-50/50 dark:bg-slate-800/20 transition-colors"
                        >
                          <td colSpan={7} className="px-12 py-8">
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="grid grid-cols-1 lg:grid-cols-2 gap-10 overflow-hidden"
                            >
                              {/* Left: Items */}
                              <div>
                                <div className="flex items-center gap-2 mb-4">
                                  <ShoppingBag className="w-4 h-4 text-indigo-500" />
                                  <h4 className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Items in this order</h4>
                                </div>
                                <div className="space-y-3">
                                  {order.items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-gray-100 dark:border-slate-800 transition-colors">
                                      <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-slate-800 overflow-hidden shrink-0 transition-colors">
                                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-sm font-bold text-gray-900 dark:text-white transition-colors">{item.name}</p>
                                        <p className="text-xs text-gray-400 dark:text-slate-500 transition-colors">Unit: ${item.price.toFixed(2)}</p>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-sm font-black text-indigo-600 dark:text-indigo-400 transition-colors">x{item.quantity}</p>
                                        <p className="text-xs font-bold text-gray-900 dark:text-white transition-colors">${(item.price * item.quantity).toFixed(2)}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Right: Delivery & Details */}
                              <div className="space-y-6">
                                <div>
                                  <div className="flex items-center gap-2 mb-4">
                                    <MapPin className="w-4 h-4 text-rose-500" />
                                    <h4 className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Delivery Address</h4>
                                  </div>
                                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
                                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed transition-colors">
                                      {order.shipping_address || 'No address provided.'}
                                    </p>
                                    {order.user_phone && (
                                      <div className="mt-3 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-xs transition-colors">
                                        <Hash className="w-3.5 h-3.5" />
                                        {order.user_phone}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div className="bg-indigo-50/50 dark:bg-indigo-900/10 p-4 rounded-2xl border border-indigo-100/50 dark:border-indigo-900/30 transition-colors">
                                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1 transition-colors">
                                      <CreditCard className="w-3.5 h-3.5" />
                                      <span className="text-[10px] font-black uppercase tracking-wider">Payment Method</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                      <p className="text-sm font-bold text-gray-900 dark:text-white transition-colors capitalize">{order.payment_method || 'Stripe'}</p>
                                      {order.payment_id && (
                                        <button
                                          onClick={(e) => { e.stopPropagation(); handlePaymentFollowUp(order.payment_id!); }}
                                          className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-[9px] font-black uppercase tracking-wider rounded-lg transition-all"
                                        >
                                          Follow Up
                                        </button>
                                      )}
                                    </div>
                                    {order.payment_id && (
                                      <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-2 select-all">
                                        ID: {order.payment_id}
                                      </p>
                                    )}
                                  </div>
                                  <div className="bg-emerald-50/50 dark:bg-emerald-900/10 p-4 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30 transition-colors">
                                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1 transition-colors">
                                      <TrendingUp className="w-3.5 h-3.5" />
                                      <span className="text-[10px] font-black uppercase tracking-wider">Revenue Share</span>
                                    </div>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white transition-colors">${((order.total_price || 0) * 0.85).toFixed(2)}</p>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </motion.tbody>
                );
              })}
            </AnimatePresence>
          </table>

          {filtered.length === 0 && (
            <div className="py-20 flex flex-col items-center gap-3 text-gray-400 dark:text-slate-500 transition-colors">
              <ShoppingBag className="w-12 h-12 text-gray-200 dark:text-slate-800 transition-colors" />
              <p className="font-black text-gray-500 dark:text-slate-400 uppercase tracking-widest transition-colors">No orders found</p>
              <p className="text-xs">Adjust your status filter or sync with the server.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50/40 dark:bg-slate-800/20 border-t border-gray-100 dark:border-slate-800 text-[10px] text-gray-400 dark:text-slate-500 font-black uppercase tracking-wider transition-colors">
          Displaying <span className="text-indigo-600 dark:text-indigo-400 font-black">{filtered.length}</span> orders
        </div>
      </div>

      {/* Admin Payment Follow-up Modal */}
      <AnimatePresence>
        {selectedPaymentId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-left"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-950 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Activity className="w-5 h-5 text-indigo-500" />
                    Payment Follow-up & Audit Trail
                  </h3>
                  <p className="text-[10px] font-mono text-slate-400 mt-1 select-all">{selectedPaymentId}</p>
                </div>
                <button
                  onClick={() => setSelectedPaymentId(null)}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-650 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="max-h-[60vh] overflow-y-auto pr-1 space-y-5">
                {isLoadingPayment ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                    <p className="text-xs font-bold text-slate-500 mt-4">Loading secure transaction audit logs...</p>
                  </div>
                ) : paymentError ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <AlertTriangle className="w-12 h-12 text-rose-500 mb-3" />
                    <p className="text-sm font-bold text-rose-600 dark:text-rose-400">{paymentError}</p>
                    <button
                      onClick={() => handlePaymentFollowUp(selectedPaymentId)}
                      className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-750 dark:text-slate-300 rounded-xl text-xs font-bold transition-all"
                    >
                      Try Again
                    </button>
                  </div>
                ) : paymentDetails ? (
                  <div className="space-y-5">
                    {/* Status & Amount Overview */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-center">
                        <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">Status</p>
                        <span className={`inline-block mt-2 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                          paymentDetails.provider_status === 'succeeded' || paymentDetails.provider_status === 'completed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900/60'
                            : paymentDetails.provider_status === 'pending'
                            ? 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900/60'
                            : 'bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-900/60'
                        }`}>
                          {paymentDetails.provider_status}
                        </span>
                      </div>

                      <div className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-center">
                        <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">Total Requested</p>
                        <p className="text-sm font-black text-slate-900 dark:text-white mt-2">
                          {((paymentDetails.amount_requested || 0) / 100).toFixed(2)} {paymentDetails.requested_currency}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-center">
                        <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">Total Paid</p>
                        <p className={`text-sm font-black mt-2 ${
                          paymentDetails.amount_paid && paymentDetails.amount_paid >= paymentDetails.amount_requested
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-rose-500'
                        }`}>
                          {paymentDetails.amount_paid ? `${(paymentDetails.amount_paid / 100).toFixed(2)} ${paymentDetails.requested_currency}` : '0.00'}
                        </p>
                      </div>
                    </div>

                    {/* Basic Meta Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/10">
                        <span className="text-[9px] font-bold text-slate-400 uppercase">Provider</span>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 capitalize">{paymentDetails.provider}</p>
                      </div>
                      <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/10">
                        <span className="text-[9px] font-bold text-slate-400 uppercase">Provider Transaction ID</span>
                        <p className="text-xs font-mono text-slate-850 dark:text-slate-200 mt-0.5 select-all">{paymentDetails.provider_payment_id}</p>
                      </div>
                    </div>

                    {/* Cardano Admin Refund Section */}
                    {paymentDetails.provider === 'crypto' && (
                      <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <RefreshCw className="w-3.5 h-3.5 text-amber-500" />
                          Cardano (Preprod) Admin Refund Panel
                        </h4>
                        
                        <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/10 border border-amber-100/50 dark:border-amber-900/30 space-y-3">
                          <div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase">Customer Refund Address</span>
                            <p className="text-xs font-mono text-slate-800 dark:text-slate-200 mt-0.5 select-all break-all bg-slate-50 dark:bg-slate-905 p-2 rounded-lg">
                              {paymentDetails.metadata?.customer_wallet_address || 'Not recorded'}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-[9px] font-bold text-slate-400 uppercase">Refund Value</span>
                              <p className="text-xs font-black text-slate-800 dark:text-slate-200 mt-0.5">
                                {paymentDetails.metadata?.crypto_ada_amount 
                                  ? `${Number(paymentDetails.metadata.crypto_ada_amount).toFixed(4)} ADA`
                                  : `${(((paymentDetails.amount_requested || 0) / 100) * 2.22).toFixed(4)} ADA (Estimate)`
                                }
                              </p>
                            </div>
                            <div>
                              <span className="text-[9px] font-bold text-slate-400 uppercase">Wallet Connection Status</span>
                              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                                {adminRefundWalletAddress 
                                  ? `Connected (${adminRefundWalletAddress.slice(0, 8)}...${adminRefundWalletAddress.slice(-6)})`
                                  : 'Not Connected'}
                              </p>
                            </div>
                          </div>

                          {/* Action Controls */}
                          {paymentDetails.provider_status === 'refunded' ? (
                            <div className="pt-2 text-xs font-bold text-emerald-650 dark:text-emerald-450 space-y-2">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-500" /> This Cardano payment has been refunded!
                              </div>
                              {paymentDetails.metadata?.refund_tx_hash && (
                                <a
                                  href={`https://preprod.cardanoscan.io/transaction/${paymentDetails.metadata.refund_tx_hash}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-[10px] text-amber-600 hover:text-amber-700 transition-colors uppercase tracking-wider font-black"
                                >
                                  View Refund on Cardanoscan &rarr;
                                </a>
                              )}
                            </div>
                          ) : (
                            <div className="pt-2 space-y-3">
                              {!adminRefundWalletAddress ? (
                                <button
                                  onClick={handleAdminWalletConnect}
                                  disabled={isAdminRefundConnecting}
                                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                                >
                                  {isAdminRefundConnecting ? (
                                    <>
                                      <Loader2 className="w-4 h-4 animate-spin" /> Connecting...
                                    </>
                                  ) : (
                                    <>
                                      <Activity className="w-4 h-4" /> Connect Merchant Wallet (Lace)
                                    </>
                                  )}
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    const matchingOrder = allOrders.find(o => o.payment_id === paymentDetails.id);
                                    if (matchingOrder) {
                                      handleCardanoAdminRefund(paymentDetails, matchingOrder.id);
                                    } else {
                                      toast.error("Could not find matching order ID for refund.");
                                    }
                                  }}
                                  disabled={isAdminRefundProcessing}
                                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                                >
                                  {isAdminRefundProcessing ? (
                                    <>
                                      <Loader2 className="w-4 h-4 animate-spin" /> Processing Cardano Refund...
                                    </>
                                  ) : (
                                    <>
                                      <RefreshCw className="w-4 h-4 animate-spin" /> Sign & Send Refund Transaction
                                    </>
                                  )}
                                </button>
                              )}

                              {adminRefundError && (
                                <p className="text-[10px] text-rose-500 dark:text-rose-450 font-mono bg-rose-50 dark:bg-rose-950/20 p-2.5 rounded-xl border border-rose-100 dark:border-rose-900/30">
                                  {adminRefundError}
                                </p>
                              )}

                              {adminRefundTxHash && (
                                <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/30 space-y-1">
                                  <span className="text-[9px] font-bold text-emerald-600 uppercase">Refund Tx Hash</span>
                                  <p className="text-[10px] font-mono text-slate-800 dark:text-slate-200 select-all truncate">
                                    {adminRefundTxHash}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Timeline of events */}
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                      <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-indigo-500" />
                        Replication Event Timeline
                      </h4>

                      {paymentEvents.length === 0 ? (
                        <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/10 border border-amber-100/50 dark:border-amber-900/30 text-xs text-amber-700 dark:text-amber-300">
                          No direct audit events logged in `payment_events` yet. The current provider status was set via API.
                        </div>
                      ) : (
                        <div className="relative pl-6 border-l-2 border-slate-100 dark:border-slate-800 space-y-6">
                          {paymentEvents.map((evt, idx) => (
                            <div key={evt.id || idx} className="relative">
                              {/* Dot */}
                              <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-indigo-600 ring-4 ring-white dark:ring-slate-900 flex items-center justify-center">
                                <span className="w-1 h-1 rounded-full bg-white" />
                              </div>
                              
                              <div className="bg-slate-50 dark:bg-slate-950/40 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">{evt.event_type}</span>
                                  <span className="text-[9px] font-medium text-slate-400">{new Date(evt.created_at).toLocaleString()}</span>
                                </div>
                                {evt.old_status && evt.new_status && (
                                  <p className="text-[10px] text-slate-500 mt-1">
                                    Transition: <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">{evt.old_status}</span> &rarr; <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-1 py-0.5 rounded">{evt.new_status}</span>
                                  </p>
                                )}
                                {evt.payload && Object.keys(evt.payload).length > 0 && (
                                  <div className="mt-2 text-[9px] font-mono text-slate-450 dark:text-slate-400 bg-white dark:bg-slate-950 p-2 rounded-xl border border-slate-100/50 dark:border-slate-800 max-h-24 overflow-y-auto">
                                    <pre className="whitespace-pre-wrap">{JSON.stringify(evt.payload, null, 2)}</pre>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-end border-t border-slate-100 dark:border-slate-800 pt-4">
                <button
                  onClick={() => setSelectedPaymentId(null)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
