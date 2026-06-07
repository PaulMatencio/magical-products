import { c as X, d as je, w as _e, r as d, a0 as Q, x as w, e as ve, j as e, L as G, k as ue } from "./index-Bxd8u6PR.js";
import { B as P } from "./Button-hYb26hjx.js";
import { C as J } from "./Card-CiIiIG98.js";
import { A as ke } from "./arrow-left-x2VDvNI0.js";
import { U as ge, S as fe } from "./upload-Dg4i73wH.js";
import { D as me } from "./download-Dsglc39c.js";
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const we = [["path", { d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z", key: "18u6gg" }], ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]], Ne = X("camera", we);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ce = [["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }], ["path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2", key: "116196" }]], Ie = X("clipboard", Ce);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Se = [["path", { d: "M16 16h6", key: "100bgy" }], ["path", { d: "M19 13v6", key: "85cyf1" }], ["path", { d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14", key: "e7tb2h" }], ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }], ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }], ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }]], De = X("package-plus", Se);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ae = [["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]], ze = X("square", Ae);
function Le() {
  const { categories: x, brands: n } = je(), { generateInitialProductDataUseCase: m, geminiAnalyzerService: p } = _e(), [y, S] = d.useState(() => localStorage.getItem("gemini_api_key") || ""), [K, W] = d.useState(false), [Y, $] = d.useState(false), r = d.useRef(null), z = d.useRef(null), L = d.useRef(null), D = d.useRef(null), [O, F] = d.useState("idle"), [j, M] = d.useState(null), [i, T] = d.useState(""), [_, C] = d.useState(() => m.createInitialDraft(x, n)), [A, E] = d.useState(null), [Z, B] = d.useState(false), [ee, H] = d.useState(null), R = d.useCallback(async (l, o) => {
    if (l) {
      B(true), E(null), H(null);
      try {
        const g = await fetch(`https://world.openfoodfacts.org/api/v0/product/${l}.json`);
        let u = o || m.createInitialDraft(x, n);
        if (u.sku = l, !g.ok) {
          C(u);
          return;
        }
        const t = await g.json();
        if (t.status === 1 && t.product) {
          const s = t.product, N = s.image_front_url || s.image_url;
          if (N && E(N), H({ name: s.product_name || "", brand: s.brands || "" }), s.product_name && (u.name = s.product_name), s.brands && (u.brand = s.brands.split(",")[0].trim()), (s.manufacturer || s.brand_owner) && (u.manufacturer = s.manufacturer || s.brand_owner), s.ingredients_text) {
            u.ingredients = s.ingredients_text;
            const b = s.ingredients_text.split(",").map((I) => I.trim()).filter((I) => I && I.length > 2);
            b.length > 0 && (u.mainIngredients = b.slice(0, 3).join(", "));
          }
          if (s.labels && (u.certifications = s.labels.split(",").map((b) => b.trim()).join(", ")), s.allergens_from_ingredients || s.allergens) {
            const b = s.allergens_from_ingredients || s.allergens;
            u.allergens = b.split(",").map((I) => I.replace(/^[a-z]{2}:/, "").trim()).filter(Boolean).join(", ");
          }
          const f = s.nutriments;
          if (f) {
            const b = f["energy-kcal"] || f["energy-kcal_100g"];
            b !== void 0 && (u.calories = String(b));
            const I = f.fat || f.fat_100g;
            I !== void 0 && (u.totalFat = `${I}g`);
            const ie = f["saturated-fat"] || f["saturated-fat_100g"];
            ie !== void 0 && (u.saturatedFat = `${ie}g`);
            const le = f.carbohydrates || f.carbohydrates_100g;
            le !== void 0 && (u.carbohydrates = `${le}g`);
            const oe = f.sugars || f.sugars_100g;
            oe !== void 0 && (u.sugars = `${oe}g`);
            const ce = f.proteins || f.proteins_100g;
            ce !== void 0 && (u.protein = `${ce}g`);
            const de = f.sodium || f.sodium_100g;
            de !== void 0 && (u.sodium = `${Math.round(de * 1e3)}mg`);
          }
          const re = y || void 0 || "", ye = (Q.language || "en").split("-")[0];
          if (re && (u.name || u.ingredients || u.certifications)) try {
            const b = await p.translateDraft(u, ye, re);
            b && (u = { ...u, ...b });
          } catch (b) {
            console.error("Translation of fetched barcode failed:", b), w.error("Translation of fetched barcode failed: " + b);
          }
        }
        C(u);
      } catch (g) {
        console.error("Barcode lookup failed:", g), w.error("Barcode lookup failed: " + g), o && C(o);
      } finally {
        B(false);
      }
    }
  }, [y, n, x, m, p]), ae = d.useCallback(async () => {
    if (!A) return;
    const l = _.name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") || "product", o = i || _.sku || "", g = o ? `_${o}` : "", u = `${l}${g}.jpg`;
    try {
      const s = await (await fetch(A)).blob(), N = URL.createObjectURL(s), f = document.createElement("a");
      f.href = N, f.download = u, document.body.appendChild(f), f.click(), document.body.removeChild(f), URL.revokeObjectURL(N), w.success("Product image downloaded");
    } catch (t) {
      console.error("Image download failed:", t), window.open(A, "_blank"), w.info("Opened image in a new tab for saving.");
    }
  }, [A, _.name, _.sku, i]);
  d.useEffect(() => {
    const l = m.createInitialDraft(x, n);
    C((o) => ({ ...o, category: o.category || l.category, brand: o.brand || l.brand }));
  }, [n, x, m]);
  const v = d.useCallback(() => {
    var _a;
    L.current && (cancelAnimationFrame(L.current), L.current = null), (_a = z.current) == null ? void 0 : _a.getTracks().forEach((l) => l.stop()), z.current = null, r.current && (r.current.srcObject = null), F((l) => l === "scanning" || l === "starting" ? "idle" : l);
  }, []);
  d.useEffect(() => v, [v]);
  const V = d.useCallback((l) => {
    const o = l.trim();
    if (!o) return;
    T(o);
    const g = m.applyScannedValue(_, o);
    w.success("Barcode captured"), R(o, g);
  }, [m, R, _]), q = d.useCallback(async () => {
    var _a, _b;
    if (!(!D.current || !r.current)) {
      try {
        if (r.current.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          const o = (_b = (_a = await D.current.detect(r.current)) == null ? void 0 : _a[0]) == null ? void 0 : _b.rawValue;
          if (o) {
            V(o), v();
            return;
          }
        }
      } catch (l) {
        M(l.message || "Scanner failed."), F("error"), v();
        return;
      }
      L.current = requestAnimationFrame(q);
    }
  }, [V, v]), te = d.useCallback(async () => {
    M(null);
    try {
      if (F("starting"), "BarcodeDetector" in window) {
        const o = window.BarcodeDetector;
        D.current = new o({ formats: ["ean_13", "ean_8", "upc_a", "upc_e", "code_128", "code_39", "qr_code"] });
      } else D.current = null;
      const l = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
      if (z.current = l, !r.current) return;
      r.current.srcObject = l, await r.current.play(), F("scanning"), D.current && (L.current = requestAnimationFrame(q));
    } catch (l) {
      M(l.message || "Camera access failed."), F("error"), v();
    }
  }, [q, v]), ne = d.useCallback((l, o) => {
    C((g) => ({ ...g, [l]: o }));
  }, []), U = d.useMemo(() => m.generate(i, _), [_, m, i]), a = d.useMemo(() => m.serialize(U), [m, U]), h = d.useCallback(async () => {
    a && (await navigator.clipboard.writeText(a), w.success("Initial product JSON copied"));
  }, [a]), k = d.useCallback(() => {
    if (!a || !U) return;
    const l = new Blob([a], { type: "application/json" }), o = URL.createObjectURL(l), g = document.createElement("a");
    g.href = o, g.download = m.getDownloadFileName(U), document.body.appendChild(g), g.click(), document.body.removeChild(g), URL.revokeObjectURL(o);
  }, [m, U, a]), be = d.useCallback((l) => {
    localStorage.setItem("gemini_api_key", l), S(l);
  }, []), xe = d.useCallback(async (l, o) => {
    const g = y || void 0 || "";
    if (!(!g || !(o.name || o.description || o.ingredients || o.lifeSpan || o.origin))) {
      $(true);
      try {
        const t = await p.translateDraft(o, l, g);
        t && (C((s) => ({ ...s, ...t })), w.success(`Form data translated to ${l.toUpperCase()}`));
      } catch (t) {
        console.error("Translation failed:", t), w.error(`Failed to translate form data: ${t.message || t}`);
      } finally {
        $(false);
      }
    }
  }, [y, p]), se = d.useCallback(async (l, o = false) => {
    var _a, _b, _c, _d, _e2, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B;
    const g = y || void 0 || "";
    if (!g) {
      w.error("Please configure your Gemini API Key first.");
      return;
    }
    W(true), o && (T(""), E(null), H(null));
    try {
      const u = (Q.language || "en").split("-")[0], t = await p.analyzePackaging(l, g, o ? "" : i);
      let s = o ? m.createInitialDraft(x, n) : { ..._ };
      if (t.name && (s.name = t.name), t.category && (s.category = t.category), t.description && (s.description = t.description), t.brand && (s.brand = t.brand), t.manufacturer && (s.manufacturer = t.manufacturer), ((_a = t.attributes) == null ? void 0 : _a.color) && (s.color = t.attributes.color), ((_b = t.attributes) == null ? void 0 : _b.size) && (s.size = t.attributes.size), ((_c = t.attributes) == null ? void 0 : _c.material) && (s.material = t.attributes.material), ((_d = t.attributes) == null ? void 0 : _d.weight) && (s.weight = t.attributes.weight), ((_e2 = t.attributes) == null ? void 0 : _e2.sku) && (s.sku = t.attributes.sku), ((_g = (_f = t.attributes) == null ? void 0 : _f.dimensions) == null ? void 0 : _g.length) !== void 0 && (s.dimensionLength = String(t.attributes.dimensions.length)), ((_i = (_h = t.attributes) == null ? void 0 : _h.dimensions) == null ? void 0 : _i.width) !== void 0 && (s.dimensionWidth = String(t.attributes.dimensions.width)), ((_k = (_j = t.attributes) == null ? void 0 : _j.dimensions) == null ? void 0 : _k.height) !== void 0 && (s.dimensionHeight = String(t.attributes.dimensions.height)), ((_m = (_l = t.attributes) == null ? void 0 : _l.dimensions) == null ? void 0 : _m.unit) && (s.dimensionUnit = t.attributes.dimensions.unit), ((_n = t.durability_data) == null ? void 0 : _n.life_span) && (s.lifeSpan = t.durability_data.life_span), ((_o = t.durability_data) == null ? void 0 : _o.reliability) && (s.reliability = t.durability_data.reliability), ((_p = t.durability_data) == null ? void 0 : _p.reusability) && (s.reusability = t.durability_data.reusability), ((_q = t.durability_data) == null ? void 0 : _q.refurbishment) && (s.refurbishment = t.durability_data.refurbishment), ((_r = t.durability_data) == null ? void 0 : _r.recycled_content) && (s.recycledContent = t.durability_data.recycled_content), ((_s = t.repairability_data) == null ? void 0 : _s.ease_of_repair) && (s.easeOfRepair = t.repairability_data.ease_of_repair), ((_t = t.repairability_data) == null ? void 0 : _t.spare_parts) && (s.spareParts = t.repairability_data.spare_parts), ((_u = t.repairability_data) == null ? void 0 : _u.maintenance_manual) && (s.maintenanceManual = t.repairability_data.maintenance_manual), ((_v = t.manufacturing_data) == null ? void 0 : _v.origin) && (s.origin = t.manufacturing_data.origin), ((_w = t.manufacturing_data) == null ? void 0 : _w.material_composition) && (s.materialComposition = t.manufacturing_data.material_composition), ((_x = t.manufacturing_data) == null ? void 0 : _x.substance_of_concern) && (s.substanceOfConcern = t.manufacturing_data.substance_of_concern), ((_y = t.lifecycle_data) == null ? void 0 : _y.carbon_footprint) && (s.carbonFootprint = t.lifecycle_data.carbon_footprint), ((_z = t.lifecycle_data) == null ? void 0 : _z.environmental_footprint) && (s.environmentalFootprint = t.lifecycle_data.environmental_footprint), ((_A = t.lifecycle_data) == null ? void 0 : _A.water_usage) && (s.waterUsage = t.lifecycle_data.water_usage), t.nutritional_info && (t.nutritional_info.calories !== void 0 && (s.calories = String(t.nutritional_info.calories)), t.nutritional_info.total_fat && (s.totalFat = t.nutritional_info.total_fat), t.nutritional_info.saturated_fat && (s.saturatedFat = t.nutritional_info.saturated_fat), t.nutritional_info.carbohydrates && (s.carbohydrates = t.nutritional_info.carbohydrates), t.nutritional_info.sugars && (s.sugars = t.nutritional_info.sugars), t.nutritional_info.protein && (s.protein = t.nutritional_info.protein), t.nutritional_info.sodium && (s.sodium = t.nutritional_info.sodium), Array.isArray(t.nutritional_info.ingredients) && (s.ingredients = t.nutritional_info.ingredients.join(", ")), Array.isArray(t.nutritional_info.allergens) && (s.allergens = t.nutritional_info.allergens.join(", ")), Array.isArray(t.nutritional_info.main_ingredients) && (s.mainIngredients = t.nutritional_info.main_ingredients.join(", ")), Array.isArray(t.nutritional_info.certifications) && (s.certifications = t.nutritional_info.certifications.join(", "))), g && (s.name || s.description || s.ingredients)) try {
        const N = await p.translateDraft(s, u, g);
        N && (s = { ...s, ...N });
      } catch (N) {
        console.error("Auto-translation of analyzed image failed:", N);
      }
      ((_B = t.attributes) == null ? void 0 : _B.sku) ? (T(t.attributes.sku), await R(t.attributes.sku, s)) : C(s), w.success("Product image analyzed successfully with Gemini!");
    } catch (u) {
      w.error(`Gemini Analysis failed: ${u.message || u}`);
    } finally {
      W(false);
    }
  }, [y, p, i, R, _, x, n]), he = d.useCallback(async () => {
    if (!r.current) return;
    const l = document.createElement("canvas");
    l.width = r.current.videoWidth || 1280, l.height = r.current.videoHeight || 720;
    const o = l.getContext("2d");
    if (!o) return;
    o.drawImage(r.current, 0, 0, l.width, l.height);
    const g = l.toDataURL("image/jpeg", 0.85);
    v(), await se(g);
  }, [se, v]);
  return { brands: n, categories: x, copyJson: h, downloadJson: k, error: j, form: _, jsonText: a, scannerLabel: O === "scanning" ? "Scanning" : O === "starting" ? "Starting" : O === "unsupported" ? "Manual Entry" : "Camera", scannedCode: i, setScannedCode: T, startCamera: te, status: O, stopCamera: v, updateForm: ne, applyScannedValue: V, videoRef: r, apiKey: y, saveApiKey: be, isAnalyzing: K, isTranslating: Y, translateFormToLanguage: xe, analyzeImage: se, captureAndAnalyze: he, isNativeSupported: "BarcodeDetector" in window, internetImageUrl: A, isFetchingInternetImage: Z, internetProductInfo: ee, downloadProductImage: ae };
}
function $e({ onBack: x }) {
  const { t: n } = ve("scanner"), [m, p] = d.useState(false), { applyScannedValue: y, brands: S, categories: K, copyJson: W, downloadJson: Y, error: $, form: r, jsonText: z, scannerLabel: L, scannedCode: D, setScannedCode: O, startCamera: F, status: j, stopCamera: M, updateForm: i, videoRef: T, apiKey: _, saveApiKey: C, isAnalyzing: A, isTranslating: E, translateFormToLanguage: Z, analyzeImage: B, captureAndAnalyze: ee, isNativeSupported: H, internetImageUrl: R, isFetchingInternetImage: ae, internetProductInfo: v, downloadProductImage: V } = Le(), q = (a) => {
    a.preventDefault(), a.stopPropagation();
  }, te = (a) => {
    a.preventDefault(), a.stopPropagation(), p(true);
  }, ne = (a) => {
    a.preventDefault(), a.stopPropagation(), p(false);
  }, U = (a) => {
    var _a;
    a.preventDefault(), a.stopPropagation(), p(false);
    const h = (_a = a.dataTransfer.files) == null ? void 0 : _a[0];
    if (h && h.type.startsWith("image/")) {
      const k = new FileReader();
      k.onloadend = () => {
        typeof k.result == "string" && B(k.result, true);
      }, k.readAsDataURL(h);
    }
  };
  return e.jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100", children: [e.jsx("header", { className: "sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-gray-100 dark:border-slate-800", children: e.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3", children: [e.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [e.jsx(P, { variant: "ghost", size: "sm", onClick: x, leftIcon: e.jsx(ke, { className: "w-4 h-4" }), children: n("header.back") }), e.jsxs("div", { className: "min-w-0", children: [e.jsx("h1", { className: "text-lg sm:text-xl font-black tracking-tight truncate", children: n("header.title") }), e.jsx("p", { className: "text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest", children: L })] })] }), e.jsxs("div", { className: "flex items-center gap-2", children: [E && e.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-indigo-500 font-semibold animate-pulse mr-1", children: [e.jsx(G, { className: "w-3.5 h-3.5 animate-spin" }), e.jsx("span", { className: "hidden sm:inline", children: "Translating..." })] }), e.jsxs("select", { value: Q.language, disabled: E, onChange: async (a) => {
    const h = a.target.value;
    await Q.changeLanguage(h), Z(h, r);
  }, className: "px-2 py-1.5 text-xs font-bold rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50", children: [e.jsx("option", { value: "en", children: "EN" }), e.jsx("option", { value: "es", children: "ES" }), e.jsx("option", { value: "fr", children: "FR" })] }), e.jsx(P, { variant: j === "scanning" || j === "starting" ? "danger" : "primary", size: "sm", onClick: j === "scanning" || j === "starting" ? M : F, leftIcon: j === "starting" ? e.jsx(G, { className: "w-4 h-4 animate-spin" }) : j === "scanning" ? e.jsx(ze, { className: "w-4 h-4" }) : e.jsx(Ne, { className: "w-4 h-4" }), children: n(j === "scanning" || j === "starting" ? "camera.stop_button" : "camera.scan_button") })] })] }) }), e.jsxs("main", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6", children: [e.jsx(J, { className: "bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-100/50 dark:border-indigo-900/30", children: e.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [e.jsxs("div", { className: "flex items-center gap-3", children: [e.jsx("div", { className: "p-2 bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400", children: e.jsx(ue, { className: "w-5 h-5 animate-pulse" }) }), e.jsxs("div", { children: [e.jsx("h3", { className: "text-sm font-bold", children: n("api_key.title") }), e.jsx("p", { className: "text-xs text-gray-500 dark:text-slate-400", children: n("api_key.description") })] })] }), e.jsx("div", { className: "flex items-center gap-2 w-full sm:w-auto", children: e.jsx("input", { type: "password", value: _, onChange: (a) => C(a.target.value), placeholder: n("api_key.placeholder"), className: "w-full sm:w-64 px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20" }) })] }) }), e.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-5", children: [e.jsxs("section", { className: "space-y-5", children: [e.jsxs(J, { padding: "none", className: "overflow-hidden relative", children: [e.jsxs("div", { className: "relative aspect-[4/3] bg-slate-950 flex items-center justify-center", onDragOver: q, onDragEnter: te, onDragLeave: ne, onDrop: U, children: [m && e.jsxs("div", { className: "absolute inset-0 bg-indigo-600/35 backdrop-blur-sm z-40 flex flex-col items-center justify-center gap-3 text-white border-4 border-dashed border-indigo-400 m-2 rounded-2xl animate-pulse", children: [e.jsx(ge, { className: "w-12 h-12 text-indigo-200" }), e.jsx("span", { className: "text-sm font-black tracking-widest uppercase", children: n("camera.drag_drop") })] }), e.jsx("video", { ref: T, muted: true, playsInline: true, className: "absolute inset-0 w-full h-full object-cover" }), j !== "scanning" && j !== "starting" && e.jsxs("div", { className: "relative z-10 flex flex-col items-center gap-3 text-slate-400", children: [e.jsx(fe, { className: "w-14 h-14" }), e.jsx("span", { className: "text-xs font-black uppercase tracking-widest", children: n("camera.idle") })] }), A && e.jsxs("div", { className: "absolute inset-0 bg-slate-950/80 z-30 flex flex-col items-center justify-center gap-3 text-white", children: [e.jsx(G, { className: "w-10 h-10 animate-spin text-indigo-400" }), e.jsx("span", { className: "text-xs font-bold tracking-widest uppercase", children: n("camera.analyzing") })] }), e.jsx("div", { className: "absolute inset-x-8 top-1/2 h-px bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" }), e.jsx("div", { className: "absolute inset-6 border-2 border-white/60 rounded-2xl pointer-events-none" })] }), e.jsxs("div", { className: "p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between", children: [e.jsx("div", { className: "flex gap-2 w-full sm:w-auto", children: e.jsx(P, { variant: "primary", size: "sm", disabled: j !== "scanning" || A, onClick: ee, className: "flex-1 sm:flex-none", leftIcon: e.jsx(ue, { className: "w-4 h-4" }), children: n("camera.snap_analyze") }) }), e.jsx("div", { className: "w-full sm:w-auto", children: e.jsxs("label", { className: "flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-gray-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-xl cursor-pointer text-xs font-bold text-gray-500 dark:text-slate-400 transition-colors w-full", children: [e.jsx(ge, { className: "w-4 h-4" }), n("camera.upload_photo"), e.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (a) => {
    var _a;
    const h = (_a = a.target.files) == null ? void 0 : _a[0];
    if (h) {
      const k = new FileReader();
      k.onloadend = () => {
        typeof k.result == "string" && B(k.result, true);
      }, k.readAsDataURL(h);
    }
  } })] }) })] })] }), e.jsxs(J, { className: "space-y-4", children: [e.jsxs("div", { children: [e.jsx("label", { className: "block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2", children: n("manual_entry.barcode_label") }), e.jsxs("div", { className: "flex gap-2", children: [e.jsx("input", { value: D, onChange: (a) => O(a.target.value), className: "flex-1 min-w-0 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono text-sm", placeholder: n("manual_entry.placeholder") }), e.jsx(P, { variant: "secondary", onClick: () => y(D), leftIcon: e.jsx(fe, { className: "w-4 h-4" }), children: n("manual_entry.apply") })] })] }), ae && e.jsxs("div", { className: "flex items-center gap-2 py-3 justify-center text-xs font-bold text-gray-500 dark:text-slate-400", children: [e.jsx(G, { className: "w-4 h-4 animate-spin text-indigo-500" }), e.jsx("span", { children: n("lookup.searching") })] }), R && e.jsxs("div", { className: "border border-gray-100 dark:border-slate-800 rounded-xl p-4 bg-gray-50/50 dark:bg-slate-900/30 space-y-3", children: [e.jsxs("div", { className: "flex items-center justify-between", children: [e.jsx("span", { className: "text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400", children: n("lookup.found") }), e.jsx(P, { variant: "secondary", size: "sm", onClick: V, leftIcon: e.jsx(me, { className: "w-3.5 h-3.5" }), children: n("lookup.download_image") })] }), e.jsxs("div", { className: "flex gap-3 items-center", children: [e.jsx("div", { className: "w-16 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-800 bg-white flex items-center justify-center shrink-0", children: e.jsx("img", { src: R, alt: "Internet Product Lookup", className: "max-w-full max-h-full object-contain" }) }), e.jsxs("div", { className: "min-w-0", children: [e.jsx("p", { className: "text-xs font-bold truncate text-gray-900 dark:text-white", children: (v == null ? void 0 : v.name) || n("lookup.unknown") }), e.jsxs("p", { className: "text-[10px] font-semibold text-gray-500 dark:text-slate-400", children: [n("lookup.brand_label"), ": ", (v == null ? void 0 : v.brand) || "N/A"] })] })] })] }), !H && e.jsx("p", { className: "text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900 rounded-xl p-3", children: n("camera.unsupported_warning") }), $ && e.jsx("p", { className: "text-sm font-medium text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900 rounded-xl p-3", children: $ })] })] }), e.jsxs("section", { className: "space-y-5", children: [e.jsxs(J, { className: "space-y-4", children: [e.jsxs("div", { className: "flex items-center gap-2", children: [e.jsx(De, { className: "w-5 h-5 text-indigo-600 dark:text-indigo-400" }), e.jsx("h2", { className: "text-base font-black", children: n("sections.initial_data") })] }), e.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [e.jsx(c, { label: n("fields.name"), value: r.name, onChange: (a) => i("name", a), required: true }), e.jsx(c, { label: n("fields.sku"), value: r.sku, onChange: (a) => i("sku", a) }), e.jsxs(pe, { label: n("fields.category"), value: r.category, onChange: (a) => i("category", a), required: true, children: [e.jsx("option", { value: "", children: n("fields.select_category") }), r.category && !K.some((a) => (a.path || a.name) === r.category) && e.jsx("option", { value: r.category, children: r.category }), K.map((a) => {
    const h = a.path || a.name;
    return e.jsx("option", { value: h, children: h }, a.id);
  })] }), e.jsxs(pe, { label: n("fields.brand"), value: r.brand, onChange: (a) => i("brand", a), children: [e.jsx("option", { value: "", children: n("fields.select_brand") }), r.brand && !S.some((a) => a.name === r.brand) && e.jsx("option", { value: r.brand, children: r.brand }), S.map((a) => e.jsx("option", { value: a.name, children: a.name }, a.id))] }), e.jsx(c, { label: n("fields.color"), value: r.color, onChange: (a) => i("color", a) }), e.jsx(c, { label: n("fields.size"), value: r.size, onChange: (a) => i("size", a) }), e.jsx(c, { label: n("fields.material"), value: r.material, onChange: (a) => i("material", a) }), e.jsx(c, { label: n("fields.weight"), value: r.weight, onChange: (a) => i("weight", a) }), e.jsx(c, { label: n("fields.length"), type: "number", value: r.dimensionLength, onChange: (a) => i("dimensionLength", a) }), e.jsx(c, { label: n("fields.width"), type: "number", value: r.dimensionWidth, onChange: (a) => i("dimensionWidth", a) }), e.jsx(c, { label: n("fields.height"), type: "number", value: r.dimensionHeight, onChange: (a) => i("dimensionHeight", a) }), e.jsx(c, { label: n("fields.dimension_unit"), value: r.dimensionUnit, onChange: (a) => i("dimensionUnit", a) })] }), e.jsxs("div", { children: [e.jsxs("label", { className: "block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2", children: [n("fields.description"), " *"] }), e.jsx("textarea", { value: r.description, onChange: (a) => i("description", a.target.value), rows: 3, className: "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm resize-none" })] }), e.jsxs("div", { className: "border-t border-gray-100 dark:border-slate-800 pt-4 space-y-4", children: [e.jsx("h3", { className: "text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400", children: n("sections.nutritional") }), e.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [e.jsx(c, { label: n("fields.calories"), type: "number", value: r.calories, onChange: (a) => i("calories", a) }), e.jsx(c, { label: n("fields.total_fat"), value: r.totalFat, onChange: (a) => i("totalFat", a) }), e.jsx(c, { label: n("fields.saturated_fat"), value: r.saturatedFat, onChange: (a) => i("saturatedFat", a) }), e.jsx(c, { label: n("fields.carbohydrates"), value: r.carbohydrates, onChange: (a) => i("carbohydrates", a) }), e.jsx(c, { label: n("fields.sugars"), value: r.sugars, onChange: (a) => i("sugars", a) }), e.jsx(c, { label: n("fields.protein"), value: r.protein, onChange: (a) => i("protein", a) }), e.jsx(c, { label: n("fields.sodium"), value: r.sodium, onChange: (a) => i("sodium", a) }), e.jsx(c, { label: n("fields.ingredients"), value: r.ingredients, onChange: (a) => i("ingredients", a) }), e.jsx(c, { label: n("fields.allergens"), value: r.allergens, onChange: (a) => i("allergens", a) }), e.jsx(c, { label: n("fields.main_ingredients"), value: r.mainIngredients, onChange: (a) => i("mainIngredients", a) }), e.jsx(c, { label: n("fields.certifications"), value: r.certifications, onChange: (a) => i("certifications", a) })] })] }), e.jsxs("div", { className: "border-t border-gray-100 dark:border-slate-800 pt-4 space-y-4", children: [e.jsx("h3", { className: "text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400", children: n("sections.sustainability") }), e.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [e.jsx(c, { label: n("fields.life_span"), value: r.lifeSpan, onChange: (a) => i("lifeSpan", a) }), e.jsx(c, { label: n("fields.reliability"), value: r.reliability, onChange: (a) => i("reliability", a) }), e.jsx(c, { label: n("fields.reusability"), value: r.reusability, onChange: (a) => i("reusability", a) }), e.jsx(c, { label: n("fields.refurbishment"), value: r.refurbishment, onChange: (a) => i("refurbishment", a) }), e.jsx(c, { label: n("fields.recycled_content"), value: r.recycledContent, onChange: (a) => i("recycledContent", a) }), e.jsx(c, { label: n("fields.ease_of_repair"), value: r.easeOfRepair, onChange: (a) => i("easeOfRepair", a) }), e.jsx(c, { label: n("fields.spare_parts"), value: r.spareParts, onChange: (a) => i("spareParts", a) }), e.jsx(c, { label: n("fields.maintenance_manual"), value: r.maintenanceManual, onChange: (a) => i("maintenanceManual", a) }), e.jsx(c, { label: n("fields.origin"), value: r.origin, onChange: (a) => i("origin", a) }), e.jsx(c, { label: n("fields.material_composition"), value: r.materialComposition, onChange: (a) => i("materialComposition", a) }), e.jsx(c, { label: n("fields.substance_of_concern"), value: r.substanceOfConcern, onChange: (a) => i("substanceOfConcern", a) }), e.jsx(c, { label: n("fields.carbon_footprint"), value: r.carbonFootprint, onChange: (a) => i("carbonFootprint", a) }), e.jsx(c, { label: n("fields.environmental_footprint"), value: r.environmentalFootprint, onChange: (a) => i("environmentalFootprint", a) }), e.jsx(c, { label: n("fields.water_usage"), value: r.waterUsage, onChange: (a) => i("waterUsage", a) })] })] })] }), e.jsxs(J, { className: "space-y-4", children: [e.jsxs("div", { className: "flex items-center justify-between gap-3", children: [e.jsx("h2", { className: "text-base font-black", children: n("output.title") }), e.jsxs("div", { className: "flex gap-2", children: [e.jsx(P, { size: "sm", variant: "secondary", disabled: !z, onClick: W, leftIcon: e.jsx(Ie, { className: "w-4 h-4" }), children: n("output.copy") }), e.jsx(P, { size: "sm", disabled: !z, onClick: Y, leftIcon: e.jsx(me, { className: "w-4 h-4" }), children: n("output.download") })] })] }), e.jsx("textarea", { readOnly: true, value: z || "Complete the required fields to generate InitialProductData JSON.", rows: 16, className: "w-full rounded-xl bg-slate-950 text-slate-100 p-4 font-mono text-xs leading-relaxed resize-y outline-none" })] })] })] })] })] });
}
function c({ label: x, value: n, onChange: m, type: p = "text", required: y = false }) {
  return e.jsxs("label", { className: "block", children: [e.jsxs("span", { className: "block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2", children: [x, y ? " *" : ""] }), e.jsx("input", { type: p, value: n, onChange: (S) => m(S.target.value), className: "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm" })] });
}
function pe({ label: x, value: n, onChange: m, required: p = false, children: y }) {
  return e.jsxs("label", { className: "block", children: [e.jsxs("span", { className: "block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2", children: [x, p ? " *" : ""] }), e.jsx("select", { value: n, onChange: (S) => m(S.target.value), className: "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm", children: y })] });
}
export {
  $e as BarcodeProductScanner
};
