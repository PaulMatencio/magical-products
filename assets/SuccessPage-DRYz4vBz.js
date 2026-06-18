import { ac as f, r as a, j as e, m as u, H as p, L as k } from "./index-CGCy5nHt.js";
import { downloadInvoice as n } from "./invoiceGenerator-BAuWlHqH.js";
import { C as y } from "./circle-check-DEhHKYmJ.js";
import { A as j } from "./arrow-left-CKd8Zij-.js";
import { D as c } from "./download-lL-3ZsRp.js";
function _({ onHome: m, onHistory: x }) {
  var _a;
  const { orders: s, loadOrders: d } = f(), [t, g] = a.useState(null), [l, o] = a.useState(false);
  a.useEffect(() => {
    const r = sessionStorage.getItem("last_order_id");
    if (r && s.length > 0) {
      const i = s.find((h) => h.id === r);
      i && g(i);
    }
  }, [s]), a.useEffect(() => {
    sessionStorage.getItem("last_order_id") && !t && d();
  }, []);
  const b = async () => {
    if (t) {
      n(t);
      return;
    }
    o(true);
    try {
      await d(), sessionStorage.getItem("last_order_id") && setTimeout(() => {
        o(false);
      }, 1e3);
    } catch {
      o(false);
    }
  };
  return e.jsxs(u.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, className: "min-h-[70vh] flex flex-col items-center justify-center text-center px-4", children: [e.jsx("div", { className: "w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-2xl mb-8", children: e.jsx(y, { className: "w-12 h-12 text-white" }) }), e.jsx("h1", { className: "text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight transition-colors", children: "Magical Success!" }), e.jsx("p", { className: "text-xl text-gray-500 dark:text-gray-400 max-w-lg mx-auto font-medium mb-4 transition-colors", children: "Your order has been placed. You'll receive a confirmation sparkles shortly." }), sessionStorage.getItem("last_order_id") && e.jsxs("div", { className: "mb-12 bg-indigo-50 dark:bg-indigo-900/30 px-6 py-4 rounded-2xl border border-indigo-100 dark:border-indigo-800/50", children: [e.jsx("p", { className: "text-sm font-bold text-gray-500 dark:text-indigo-300 uppercase tracking-widest mb-1", children: "Your Tracking Number" }), e.jsxs("p", { className: "font-mono text-2xl font-black text-indigo-600 dark:text-indigo-400", children: ["#", (_a = sessionStorage.getItem("last_order_id")) == null ? void 0 : _a.slice(0, 8)] }), e.jsx("p", { className: "text-xs text-gray-400 mt-2 font-medium", children: "Save this number to track your order later." })] }), e.jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [e.jsxs("button", { onClick: m, className: "py-5 px-10 bg-gray-900 dark:bg-indigo-600 text-white rounded-[1rem] font-bold text-xl hover:bg-black dark:hover:bg-indigo-700 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3", children: [e.jsx(j, { className: "w-6 h-6" }), "Back to Store"] }), e.jsxs("button", { onClick: x, className: "py-5 px-10 bg-white dark:bg-slate-900 text-gray-900 dark:text-white border-2 border-gray-100 dark:border-slate-800 rounded-[1rem] font-bold text-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3", children: [e.jsx(p, { className: "w-6 h-6" }), "View History"] }), t && e.jsxs("button", { onClick: () => n(t), className: "py-5 px-10 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-2 border-emerald-100 dark:border-emerald-800/50 rounded-[1rem] font-bold text-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3", children: [e.jsx(c, { className: "w-6 h-6" }), "Invoice"] }), !t && sessionStorage.getItem("last_order_id") && e.jsxs("button", { onClick: b, disabled: l, className: "py-5 px-10 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-2 border-emerald-100 dark:border-emerald-800/50 rounded-[1rem] font-bold text-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50", children: [l ? e.jsx(k, { className: "w-6 h-6 animate-spin" }) : e.jsx(c, { className: "w-6 h-6" }), "Invoice"] })] })] });
}
export {
  _ as SuccessPage
};
