import { x as k, a as v, s as B } from "./index-CrzUCYrH.js";
class u {
  constructor(o = 0, i = "Network Error") {
    this.status = o, this.text = i;
  }
}
const E = () => {
  if (!(typeof localStorage > "u")) return { get: (t) => Promise.resolve(localStorage.getItem(t)), set: (t, o) => Promise.resolve(localStorage.setItem(t, o)), remove: (t) => Promise.resolve(localStorage.removeItem(t)) };
}, s = { origin: "https://api.emailjs.com", blockHeadless: false, storageProvider: E() }, _ = (t) => t ? typeof t == "string" ? { publicKey: t } : t.toString() === "[object Object]" ? t : {} : {}, V = (t, o = "https://api.emailjs.com") => {
  if (!t) return;
  const i = _(t);
  s.publicKey = i.publicKey, s.blockHeadless = i.blockHeadless, s.storageProvider = i.storageProvider, s.blockList = i.blockList, s.limitRate = i.limitRate, s.origin = i.origin || o;
}, S = async (t, o, i = {}) => {
  const n = await fetch(s.origin + t, { method: "POST", headers: i, body: o }), e = await n.text(), a = new u(n.status, e);
  if (n.ok) return a;
  throw a;
}, P = (t, o, i) => {
  if (!t || typeof t != "string") throw "The public key is required. Visit https://dashboard.emailjs.com/admin/account";
  if (!o || typeof o != "string") throw "The service ID is required. Visit https://dashboard.emailjs.com/admin";
  if (!i || typeof i != "string") throw "The template ID is required. Visit https://dashboard.emailjs.com/admin/templates";
}, O = (t) => {
  if (t && t.toString() !== "[object Object]") throw "The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/";
}, L = (t) => t.webdriver || !t.languages || t.languages.length === 0, j = () => new u(451, "Unavailable For Headless Browser"), K = (t, o) => {
  if (!Array.isArray(t)) throw "The BlockList list has to be an array";
  if (typeof o != "string") throw "The BlockList watchVariable has to be a string";
}, A = (t) => {
  var _a;
  return !((_a = t.list) == null ? void 0 : _a.length) || !t.watchVariable;
}, M = (t, o) => t instanceof FormData ? t.get(o) : t[o], R = (t, o) => {
  if (A(t)) return false;
  K(t.list, t.watchVariable);
  const i = M(o, t.watchVariable);
  return typeof i != "string" ? false : t.list.includes(i);
}, I = () => new u(403, "Forbidden"), J = (t, o) => {
  if (typeof t != "number" || t < 0) throw "The LimitRate throttle has to be a positive number";
  if (o && typeof o != "string") throw "The LimitRate ID has to be a non-empty string";
}, Q = async (t, o, i) => {
  const n = Number(await i.get(t) || 0);
  return o - Date.now() + n;
}, D = async (t, o, i) => {
  if (!o.throttle || !i) return false;
  J(o.throttle, o.id);
  const n = o.id || t;
  return await Q(n, o.throttle, i) > 0 ? true : (await i.set(n, Date.now().toString()), false);
}, H = () => new u(429, "Too Many Requests"), W = async (t, o, i, n) => {
  const e = _(n), a = e.publicKey || s.publicKey, c = e.blockHeadless || s.blockHeadless, l = e.storageProvider || s.storageProvider, d = { ...s.blockList, ...e.blockList }, g = { ...s.limitRate, ...e.limitRate };
  return c && L(navigator) ? Promise.reject(j()) : (P(a, t, o), O(i), i && R(d, i) ? Promise.reject(I()) : await D(location.pathname, g, l) ? Promise.reject(H()) : S("/api/v1.0/email/send", JSON.stringify({ lib_version: "4.4.1", user_id: a, service_id: t, template_id: o, template_params: i }), { "Content-type": "application/json" }));
}, Y = (t) => {
  if (!t || t.nodeName !== "FORM") throw "The 3rd parameter is expected to be the HTML form element or the style selector of the form";
}, G = (t) => typeof t == "string" ? document.querySelector(t) : t, X = async (t, o, i, n) => {
  const e = _(n), a = e.publicKey || s.publicKey, c = e.blockHeadless || s.blockHeadless, l = s.storageProvider || e.storageProvider, d = { ...s.blockList, ...e.blockList }, g = { ...s.limitRate, ...e.limitRate };
  if (c && L(navigator)) return Promise.reject(j());
  const m = G(i);
  P(a, t, o), Y(m);
  const p = new FormData(m);
  return R(d, p) ? Promise.reject(I()) : await D(location.pathname, g, l) ? Promise.reject(H()) : (p.append("lib_version", "4.4.1"), p.append("service_id", t), p.append("template_id", o), p.append("user_id", a), S("/api/v1.0/email/send-form", p));
}, Z = { init: V, send: W, sendForm: X, EmailJSResponseStatus: u };
function w(t) {
  return t.id.slice(0, 8).toLowerCase();
}
async function F(t) {
  var _a, _b;
  const o = new Date(t.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }), i = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }), n = v.currency_symbol, e = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  let a = null, c = "";
  if (t.payment_id) try {
    const { data: r } = await B.from("payments").select("*").eq("id", t.payment_id).maybeSingle();
    if (r && (a = r, r.provider === "crypto" || r.payment_type === "crypto")) {
      const x = (f) => {
        switch (f == null ? void 0 : f.toUpperCase()) {
          case "ETH":
          case "BNB":
            return 18;
          case "SOL":
            return 9;
          case "BTC":
            return 8;
          case "ADA":
          case "USDC":
          case "EURC":
            return 6;
          default:
            return 2;
        }
      }, b = (f, $) => {
        if (f == null) return "";
        const y = x($), T = f / Math.pow(10, y);
        return y === 2 ? T.toFixed(2) : Number(T.toFixed(y)).toString();
      }, h = r.amount_paid !== null && r.amount_paid !== 0 ? r.amount_paid : r.amount_requested;
      c = b(h, r.requested_currency);
    }
  } catch (r) {
    console.warn("Failed to fetch payment details for invoice:", r);
  }
  const l = (r) => String(r ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;"), d = (r) => `${n}${r.toFixed(2)}`, g = w(t), m = ((_b = (_a = t.user_email) == null ? void 0 : _a.split("@")[0]) == null ? void 0 : _b.replace(/[._-]+/g, " ")) || "Valued Customer", p = l(m), N = l(t.shipping_address || "Not provided").replace(/\n/g, "<br />"), z = { pending: "background-color: #fff7ed; color: #c2410c; border-color: #fed7aa;", accepted: "background-color: #eff6ff; color: #1d4ed8; border-color: #bfdbfe;", ready: "background-color: #eef2ff; color: #4338ca; border-color: #c7d2fe;", shipped: "background-color: #f5f3ff; color: #6d28d9; border-color: #ddd6fe;", delivered: "background-color: #ecfdf5; color: #047857; border-color: #a7f3d0;" }, q = z[t.status] || z.pending, U = t.items.map((r, x) => {
    const b = r.discount_percentage !== void 0 && r.discount_percentage > 0, h = b ? r.price * (1 - r.discount_percentage / 100) : r.price, f = h * r.quantity, $ = r.image_url ? `<img src="${l(r.image_url)}" alt="${l(r.name)}" width="44" height="44" style="display: block; width: 44px; height: 44px; object-fit: cover; border-radius: 10px; border: 1px solid #e5e7eb;" />` : `<div style="width: 44px; height: 44px; border-radius: 10px; background-color: #f1f5f9; border: 1px solid #e5e7eb; text-align: center; line-height: 44px; color: #94a3b8; font-weight: 800; font-size: 11px;">${x + 1}</div>`, y = b ? `<span style="text-decoration: line-through; color: #94a3b8; margin-right: 6px; font-size: 11px; font-family: ${e};">${d(r.price)}</span><span style="color: #dc2626; font-weight: 800; font-family: ${e};">${d(h)}</span>` : d(r.price);
    return `
      <tr style="background-color: ${x % 2 === 0 ? "#ffffff" : "#f8fafc"};">
        <td style="padding: 16px 14px; border-bottom: 1px solid #e5e7eb; vertical-align: middle;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
            <tr>
              <td style="padding-right: 12px; vertical-align: middle;">${$}</td>
              <td style="vertical-align: middle;">
                <div style="font-weight: 800; color: #111827; font-size: 14px; line-height: 1.35; font-family: ${e};">${l(r.name)}</div>
                ${b ? `<div style="margin-top: 5px;"><span style="display: inline-block; font-size: 10px; background-color: #fee2e2; color: #b91c1c; padding: 3px 7px; border-radius: 999px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.4px; font-family: ${e};">-${r.discount_percentage}% off</span></div>` : ""}
              </td>
            </tr>
          </table>
        </td>
        <td style="padding: 16px 14px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #475569; font-weight: 800; font-family: ${e};">${r.quantity}</td>
        <td style="padding: 16px 14px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #475569; font-family: ${e};">${y}</td>
        <td style="padding: 16px 14px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 900; color: #111827; font-family: ${e};">${d(f)}</td>
      </tr>
    `;
  }).join("");
  return `
  <div class="invoice-container" style="max-width: 760px; margin: 24px auto; background-color: #ffffff; border-radius: 22px; box-shadow: 0 18px 50px rgba(15, 23, 42, 0.10); overflow: hidden; border: 1px solid #e5e7eb; font-family: ${e}; color: #334155; text-align: left;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 34px 36px; background-color: #111827; color: #ffffff;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="vertical-align: top;">
                <div style="font-size: 13px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: #a5b4fc; font-family: ${e};">Magical Products</div>
                <h1 style="font-size: 34px; line-height: 1.05; font-weight: 900; margin: 8px 0 0; color: #ffffff; font-family: ${e};">Invoice</h1>
              </td>
              <td style="vertical-align: top; text-align: right;">
                <div style="display: inline-block; border: 1px solid rgba(255,255,255,0.20); border-radius: 14px; padding: 12px 14px; background-color: rgba(255,255,255,0.08);">
                  <div style="font-size: 10px; font-weight: 900; letter-spacing: 1.4px; text-transform: uppercase; color: #cbd5e1; font-family: ${e};">Amount Due</div>
                  <div style="font-size: 28px; font-weight: 900; color: #ffffff; margin-top: 3px; font-family: ${e};">
                    ${d(t.total_price)}
                    ${c ? `<span style="font-size: 14px; font-weight: 700; color: #a5b4fc; display: block; margin-top: 2px;">(${c} ${a.requested_currency})</span>` : ""}
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding: 28px 36px 18px; background-color: #ffffff;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="width: 25%; padding: 0 10px 12px 0; vertical-align: top;">
                <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.4px; color: #94a3b8; font-family: ${e};">Invoice No.</div>
                <div style="font-size: 15px; font-weight: 900; color: #111827; margin-top: 5px; font-family: ${e};">#${g}</div>
              </td>
              <td style="width: 25%; padding: 0 10px 12px 0; vertical-align: top;">
                <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.4px; color: #94a3b8; font-family: ${e};">Date</div>
                <div style="font-size: 15px; font-weight: 800; color: #111827; margin-top: 5px; font-family: ${e};">${o}</div>
              </td>
              <td style="width: 25%; padding: 0 10px 12px 0; vertical-align: top;">
                <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.4px; color: #94a3b8; font-family: ${e};">Payment</div>
                <div style="font-size: 15px; font-weight: 800; color: #111827; margin-top: 5px; text-transform: capitalize; font-family: ${e};">
                  ${c ? `Crypto (${a.requested_currency})` : l(t.payment_method)}
                </div>
                ${c ? `<div style="font-size: 11px; font-weight: 700; color: #4f46e5; margin-top: 2px; font-family: ${e};">${c} ${a.requested_currency}</div>` : ""}
                ${t.payment_id ? `<div style="font-size: 9px; color: #64748b; margin-top: 4px; font-family: ${e}; word-break: break-all; line-height: 1.2;">ID: ${l(t.payment_id)}</div>` : ""}
              </td>
              <td style="width: 25%; padding: 0 0 12px 0; vertical-align: top;">
                <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.4px; color: #94a3b8; font-family: ${e};">Status</div>
                <div style="margin-top: 5px;"><span style="display: inline-block; padding: 5px 11px; border-radius: 999px; border: 1px solid; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.7px; font-family: ${e}; ${q}">${l(t.status)}</span></div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding: 0 36px 28px; background-color: #ffffff;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="width: 50%; vertical-align: top; padding: 18px; background-color: #f8fafc; border: 1px solid #e5e7eb; border-radius: 16px;">
                <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.4px; color: #64748b; font-family: ${e};">Bill To</div>
                <div style="font-size: 16px; font-weight: 900; color: #111827; margin-top: 8px; text-transform: capitalize; font-family: ${e};">${p}</div>
                ${t.user_email ? `<div style="font-size: 13px; font-weight: 700; color: #475569; margin-top: 6px; font-family: ${e};">${l(t.user_email)}</div>` : ""}
                ${t.user_phone ? `<div style="font-size: 13px; font-weight: 700; color: #475569; margin-top: 4px; font-family: ${e};">${l(t.user_phone)}</div>` : ""}
              </td>
              <td style="width: 18px;">&nbsp;</td>
              <td style="width: 50%; vertical-align: top; padding: 18px; background-color: #f8fafc; border: 1px solid #e5e7eb; border-radius: 16px;">
                <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.4px; color: #64748b; font-family: ${e};">Ship To</div>
                <div style="font-size: 14px; font-weight: 800; color: #111827; line-height: 1.55; margin-top: 8px; font-family: ${e};">${N}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding: 0 36px 30px; background-color: #ffffff;">
          <div style="font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.6px; color: #64748b; margin-bottom: 12px; font-family: ${e};">Order Items</div>
          <table style="width: 100%; border-collapse: separate; border-spacing: 0; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">
        <thead>
          <tr style="background-color: #f1f5f9;">
            <th style="padding: 12px 14px; text-align: left; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.3px; color: #64748b; border-bottom: 1px solid #e5e7eb; font-family: ${e};">Item</th>
            <th style="padding: 12px 14px; text-align: center; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.3px; color: #64748b; border-bottom: 1px solid #e5e7eb; font-family: ${e};">Qty</th>
            <th style="padding: 12px 14px; text-align: right; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.3px; color: #64748b; border-bottom: 1px solid #e5e7eb; font-family: ${e};">Price</th>
            <th style="padding: 12px 14px; text-align: right; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.3px; color: #64748b; border-bottom: 1px solid #e5e7eb; font-family: ${e};">Total</th>
          </tr>
        </thead>
        <tbody>
          ${U}
        </tbody>
      </table>
        </td>
      </tr>

      <tr>
        <td style="padding: 0 36px 34px; background-color: #ffffff;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="vertical-align: top; color: #64748b; font-size: 12px; line-height: 1.6; padding-right: 18px; font-family: ${e};">
                <strong style="display: block; color: #111827; font-size: 13px; margin-bottom: 4px;">Thank you for shopping with us.</strong>
                This invoice was generated on ${i}. Keep it for your records.
              </td>
              <td style="width: 260px; vertical-align: top;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; background-color: #111827; border-radius: 16px;">
                  <tr>
                    <td style="padding: 18px 20px;">
                      <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px; color: #cbd5e1; font-family: ${e};">Total Paid</div>
                      <div style="font-size: 32px; line-height: 1.1; font-weight: 900; color: #ffffff; margin-top: 6px; font-family: ${e};">${d(t.total_price)}</div>
                      ${c ? `<div style="font-size: 14px; font-weight: 800; color: #a5b4fc; margin-top: 6px; font-family: ${e};">(${c} ${a.requested_currency})</div>` : ""}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
  `;
}
async function C(t) {
  const o = await F(t);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice #${w(t)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    body { margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', sans-serif; }
    @media print {
      body { background-color: #ffffff; }
      .invoice-container { box-shadow: none !important; margin: 0 !important; border-radius: 0 !important; border: none !important; }
    }
  </style>
</head>
<body>
  ${o}
</body>
</html>`;
}
async function tt(t) {
  const o = w(t), i = await C(t), n = new Blob([i], { type: "text/html" }), e = URL.createObjectURL(n), a = document.createElement("a");
  a.href = e, a.download = `invoice-${o}.html`, document.body.appendChild(a), a.click(), document.body.removeChild(a), URL.revokeObjectURL(e), k.success("Invoice downloaded!", { duration: 2e3 });
}
async function ot(t, o) {
  var _a;
  const i = await F(t), n = w(t), e = await C(t), c = `data:text/html;base64,${btoa(unescape(encodeURIComponent(e)))}`, l = { user_email: o, order_id: n, customer_name: ((_a = t.user_email) == null ? void 0 : _a.split("@")[0]) || "Valued Customer", html: i, invoice_html: i, invoice_file: c };
  try {
    const d = await Z.send(v.emailjs.serviceId, v.emailjs.templateId, l, v.emailjs.publicKey);
    console.log("Email sent!", d), k.success(`Invoice sent to ${o}!`, { duration: 4e3 });
  } catch (d) {
    console.error("EmailJS error:", d), k.error("Failed to send email. Invoice downloaded instead."), await tt(t);
  }
}
export {
  tt as downloadInvoice,
  F as generateInvoiceFragment,
  C as generateInvoiceHTML,
  ot as sendInvoiceToEmail
};
