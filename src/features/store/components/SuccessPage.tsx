/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle2, ArrowLeft, History, Download, Loader2 } from "lucide-react";
import { downloadInvoice } from "../../../utils/invoiceGenerator";
import { useOrderLogic } from "../../../presentation/hooks/useOrderLogic";
import { Order } from "../../../types/types";

interface SuccessPageProps {
  onHome: () => void;
  onHistory: () => void;
}

export function SuccessPage({ onHome, onHistory }: SuccessPageProps) {
  const { orders, loadOrders } = useOrderLogic();
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [loadingInvoice, setLoadingInvoice] = useState(false);

  // Attempt to resolve the last order from sessionStorage + loaded orders
  useEffect(() => {
    const lastOrderId = sessionStorage.getItem('last_order_id');
    if (lastOrderId && orders.length > 0) {
      const matched = orders.find(o => o.id === lastOrderId);
      if (matched) setLastOrder(matched);
    }
  }, [orders]);

  // Trigger an order load if we don't have the order data yet
  useEffect(() => {
    const lastOrderId = sessionStorage.getItem('last_order_id');
    if (lastOrderId && !lastOrder) {
      loadOrders();
    }
  }, []);

  const handleDownloadInvoice = async () => {
    if (lastOrder) {
      downloadInvoice(lastOrder);
      return;
    }

    // If we don't have the order yet, try loading
    setLoadingInvoice(true);
    try {
      await loadOrders();
      const lastOrderId = sessionStorage.getItem('last_order_id');
      if (lastOrderId) {
        // Orders may have been refreshed — check from the hook
        // Since state updates are async, we give it a moment
        setTimeout(() => {
          setLoadingInvoice(false);
        }, 1000);
      }
    } catch {
      setLoadingInvoice(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4"
    >
      <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-2xl mb-8">
        <CheckCircle2 className="w-12 h-12 text-white" />
      </div>
      <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight transition-colors">Magical Success!</h1>
      <p className="text-xl text-gray-500 dark:text-gray-400 max-w-lg mx-auto font-medium mb-4 transition-colors">
        Your order has been placed. You'll receive a confirmation sparkles shortly.
      </p>
      
      {sessionStorage.getItem('last_order_id') && (
        <div className="mb-12 bg-indigo-50 dark:bg-indigo-900/30 px-6 py-4 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
          <p className="text-sm font-bold text-gray-500 dark:text-indigo-300 uppercase tracking-widest mb-1">Your Tracking Number</p>
          <p className="font-mono text-2xl font-black text-indigo-600 dark:text-indigo-400">
            #{sessionStorage.getItem('last_order_id')?.slice(0, 8)}
          </p>
          <p className="text-xs text-gray-400 mt-2 font-medium">Save this number to track your order later.</p>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={onHome}
          className="py-5 px-10 bg-gray-900 dark:bg-indigo-600 text-white rounded-[2rem] font-bold text-xl hover:bg-black dark:hover:bg-indigo-700 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
        >
          <ArrowLeft className="w-6 h-6" />
          Back to Store
        </button>
        
        <button 
          onClick={onHistory}
          className="py-5 px-10 bg-white dark:bg-slate-900 text-gray-900 dark:text-white border-2 border-gray-100 dark:border-slate-800 rounded-[2rem] font-bold text-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
        >
          <History className="w-6 h-6" />
          View History
        </button>

        {lastOrder && (
          <button 
            onClick={() => downloadInvoice(lastOrder)}
            className="py-5 px-10 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-2 border-emerald-100 dark:border-emerald-800/50 rounded-[2rem] font-bold text-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
          >
            <Download className="w-6 h-6" />
            Invoice
          </button>
        )}

        {!lastOrder && sessionStorage.getItem('last_order_id') && (
          <button 
            onClick={handleDownloadInvoice}
            disabled={loadingInvoice}
            className="py-5 px-10 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-2 border-emerald-100 dark:border-emerald-800/50 rounded-[2rem] font-bold text-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loadingInvoice ? <Loader2 className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
            Invoice
          </button>
        )}
      </div>
    </motion.div>
  );
}
