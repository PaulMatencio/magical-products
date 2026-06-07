import { c as X, d as je, w as _e, r as d, a0 as Q, x as w, e as ve, j as e, L as G, k as ue } from "./index-CHFneo8t.js";
import { B as U } from "./Button-BMZXrnHO.js";
import { C as q } from "./Card-DJ6h8u7m.js";
import { A as ke } from "./arrow-left-Cr31RcIO.js";
import { U as ge, S as fe } from "./upload-CsVXQwWS.js";
import { D as me } from "./download-DhRQBW6a.js";
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
  const { categories: v, brands: n } = je(), { generateInitialProductDataUseCase: m, geminiAnalyzerService: p } = _e(), [h, I] = d.useState(() => localStorage.getItem("gemini_api_key") || ""), [J, K] = d.useState(false), [Y, O] = d.useState(false), s = d.useRef(null), A = d.useRef(null), z = d.useRef(null), S = d.useRef(null), [P, L] = d.useState("idle"), [y, T] = d.useState(null), [i, E] = d.useState(""), [j, N] = d.useState(() => m.createInitialDraft(v, n)), [D, $] = d.useState(null), [Z, M] = d.useState(false), [ee, W] = d.useState(null), F = d.useCallback(async (l, o) => {
    if (l) {
      M(true), $(null), W(null);
      try {
        const g = await fetch(`https://world.openfoodfacts.org/api/v0/product/${l}.json`);
        let t = o || m.createInitialDraft(v, n);
        if (t.sku = l, !g.ok) {
          N(t);
          return;
        }
        const r = await g.json();
        if (r.status === 1 && r.product) {
          const u = r.product, V = u.image_front_url || u.image_url;
          if (V && $(V), W({ name: u.product_name || "", brand: u.brands || "" }), u.product_name && (t.name = u.product_name), u.brands && (t.brand = u.brands.split(",")[0].trim()), (u.manufacturer || u.brand_owner) && (t.manufacturer = u.manufacturer || u.brand_owner), u.ingredients_text) {
            t.ingredients = u.ingredients_text;
            const b = u.ingredients_text.split(",").map((C) => C.trim()).filter((C) => C && C.length > 2);
            b.length > 0 && (t.mainIngredients = b.slice(0, 3).join(", "));
          }
          if (u.labels && (t.certifications = u.labels.split(",").map((b) => b.trim()).join(", ")), u.allergens_from_ingredients || u.allergens) {
            const b = u.allergens_from_ingredients || u.allergens;
            t.allergens = b.split(",").map((C) => C.replace(/^[a-z]{2}:/, "").trim()).filter(Boolean).join(", ");
          }
          const f = u.nutriments;
          if (f) {
            const b = f["energy-kcal"] || f["energy-kcal_100g"];
            b !== void 0 && (t.calories = String(b));
            const C = f.fat || f.fat_100g;
            C !== void 0 && (t.totalFat = `${C}g`);
            const ie = f["saturated-fat"] || f["saturated-fat_100g"];
            ie !== void 0 && (t.saturatedFat = `${ie}g`);
            const le = f.carbohydrates || f.carbohydrates_100g;
            le !== void 0 && (t.carbohydrates = `${le}g`);
            const oe = f.sugars || f.sugars_100g;
            oe !== void 0 && (t.sugars = `${oe}g`);
            const ce = f.proteins || f.proteins_100g;
            ce !== void 0 && (t.protein = `${ce}g`);
            const de = f.sodium || f.sodium_100g;
            de !== void 0 && (t.sodium = `${Math.round(de * 1e3)}mg`);
          }
          const re = h || void 0 || "", ye = (Q.language || "en").split("-")[0];
          if (re && (t.name || t.ingredients || t.certifications)) try {
            const b = await p.translateDraft(t, ye, re);
            b && (t = { ...t, ...b });
          } catch (b) {
            console.error("Translation of fetched barcode failed:", b), w.error("Translation of fetched barcode failed: " + b);
          }
        }
        N(t);
      } catch (g) {
        console.error("Barcode lookup failed:", g), w.error("Barcode lookup failed: " + g), o && N(o);
      } finally {
        M(false);
      }
    }
  }, [h, n, v, m, p]), ae = d.useCallback(async () => {
    if (!D) return;
    const l = j.name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") || "product", o = i || j.sku || "", g = o ? `_${o}` : "", t = `${l}${g}.jpg`;
    try {
      const u = await (await fetch(D)).blob(), V = URL.createObjectURL(u), f = document.createElement("a");
      f.href = V, f.download = t, document.body.appendChild(f), f.click(), document.body.removeChild(f), URL.revokeObjectURL(V), w.success("Product image downloaded");
    } catch (r) {
      console.error("Image download failed:", r), window.open(D, "_blank"), w.info("Opened image in a new tab for saving.");
    }
  }, [D, j.name, j.sku, i]);
  d.useEffect(() => {
    const l = m.createInitialDraft(v, n);
    N((o) => ({ ...o, category: o.category || l.category, brand: o.brand || l.brand }));
  }, [n, v, m]);
  const _ = d.useCallback(() => {
    var _a;
    z.current && (cancelAnimationFrame(z.current), z.current = null), (_a = A.current) == null ? void 0 : _a.getTracks().forEach((l) => l.stop()), A.current = null, s.current && (s.current.srcObject = null), L((l) => l === "scanning" || l === "starting" ? "idle" : l);
  }, []);
  d.useEffect(() => _, [_]);
  const B = d.useCallback((l) => {
    const o = l.trim();
    if (!o) return;
    E(o);
    const g = m.applyScannedValue(j, o);
    w.success("Barcode captured"), F(o, g);
  }, [m, F, j]), H = d.useCallback(async () => {
    var _a, _b;
    if (!(!S.current || !s.current)) {
      try {
        if (s.current.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          const o = (_b = (_a = await S.current.detect(s.current)) == null ? void 0 : _a[0]) == null ? void 0 : _b.rawValue;
          if (o) {
            B(o), _();
            return;
          }
        }
      } catch (l) {
        T(l.message || "Scanner failed."), L("error"), _();
        return;
      }
      z.current = requestAnimationFrame(H);
    }
  }, [B, _]), te = d.useCallback(async () => {
    T(null);
    try {
      if (L("starting"), "BarcodeDetector" in window) {
        const o = window.BarcodeDetector;
        S.current = new o({ formats: ["ean_13", "ean_8", "upc_a", "upc_e", "code_128", "code_39", "qr_code"] });
      } else S.current = null;
      const l = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
      if (A.current = l, !s.current) return;
      s.current.srcObject = l, await s.current.play(), L("scanning"), S.current && (z.current = requestAnimationFrame(H));
    } catch (l) {
      T(l.message || "Camera access failed."), L("error"), _();
    }
  }, [H, _]), ne = d.useCallback((l, o) => {
    N((g) => ({ ...g, [l]: o }));
  }, []), R = d.useMemo(() => m.generate(i, j), [j, m, i]), a = d.useMemo(() => m.serialize(R), [m, R]), x = d.useCallback(async () => {
    a && (await navigator.clipboard.writeText(a), w.success("Initial product JSON copied"));
  }, [a]), k = d.useCallback(() => {
    if (!a || !R) return;
    const l = new Blob([a], { type: "application/json" }), o = URL.createObjectURL(l), g = document.createElement("a");
    g.href = o, g.download = m.getDownloadFileName(R), document.body.appendChild(g), g.click(), document.body.removeChild(g), URL.revokeObjectURL(o);
  }, [m, R, a]), be = d.useCallback((l) => {
    localStorage.setItem("gemini_api_key", l), I(l);
  }, []), xe = d.useCallback(async (l, o) => {
    const g = h || void 0 || "";
    if (!(!g || !(o.name || o.description || o.ingredients || o.lifeSpan || o.origin))) {
      O(true);
      try {
        const r = await p.translateDraft(o, l, g);
        r && (N((u) => ({ ...u, ...r })), w.success(`Form data translated to ${l.toUpperCase()}`));
      } catch (r) {
        console.error("Translation failed:", r), w.error(`Failed to translate form data: ${r.message || r}`);
      } finally {
        O(false);
      }
    }
  }, [h, p]), se = d.useCallback(async (l) => {
    var _a, _b, _c, _d, _e2, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B;
    const o = h || void 0 || "";
    if (!o) {
      w.error("Please configure your Gemini API Key first.");
      return;
    }
    K(true);
    try {
      const g = (Q.language || "en").split("-")[0], t = await p.analyzePackaging(l, o, i);
      let r = { ...j };
      if (t.name && (r.name = t.name), t.category && (r.category = t.category), t.description && (r.description = t.description), t.brand && (r.brand = t.brand), t.manufacturer && (r.manufacturer = t.manufacturer), ((_a = t.attributes) == null ? void 0 : _a.color) && (r.color = t.attributes.color), ((_b = t.attributes) == null ? void 0 : _b.size) && (r.size = t.attributes.size), ((_c = t.attributes) == null ? void 0 : _c.material) && (r.material = t.attributes.material), ((_d = t.attributes) == null ? void 0 : _d.weight) && (r.weight = t.attributes.weight), ((_e2 = t.attributes) == null ? void 0 : _e2.sku) && (r.sku = t.attributes.sku), ((_g = (_f = t.attributes) == null ? void 0 : _f.dimensions) == null ? void 0 : _g.length) !== void 0 && (r.dimensionLength = String(t.attributes.dimensions.length)), ((_i = (_h = t.attributes) == null ? void 0 : _h.dimensions) == null ? void 0 : _i.width) !== void 0 && (r.dimensionWidth = String(t.attributes.dimensions.width)), ((_k = (_j = t.attributes) == null ? void 0 : _j.dimensions) == null ? void 0 : _k.height) !== void 0 && (r.dimensionHeight = String(t.attributes.dimensions.height)), ((_m = (_l = t.attributes) == null ? void 0 : _l.dimensions) == null ? void 0 : _m.unit) && (r.dimensionUnit = t.attributes.dimensions.unit), ((_n = t.durability_data) == null ? void 0 : _n.life_span) && (r.lifeSpan = t.durability_data.life_span), ((_o = t.durability_data) == null ? void 0 : _o.reliability) && (r.reliability = t.durability_data.reliability), ((_p = t.durability_data) == null ? void 0 : _p.reusability) && (r.reusability = t.durability_data.reusability), ((_q = t.durability_data) == null ? void 0 : _q.refurbishment) && (r.refurbishment = t.durability_data.refurbishment), ((_r = t.durability_data) == null ? void 0 : _r.recycled_content) && (r.recycledContent = t.durability_data.recycled_content), ((_s = t.repairability_data) == null ? void 0 : _s.ease_of_repair) && (r.easeOfRepair = t.repairability_data.ease_of_repair), ((_t = t.repairability_data) == null ? void 0 : _t.spare_parts) && (r.spareParts = t.repairability_data.spare_parts), ((_u = t.repairability_data) == null ? void 0 : _u.maintenance_manual) && (r.maintenanceManual = t.repairability_data.maintenance_manual), ((_v = t.manufacturing_data) == null ? void 0 : _v.origin) && (r.origin = t.manufacturing_data.origin), ((_w = t.manufacturing_data) == null ? void 0 : _w.material_composition) && (r.materialComposition = t.manufacturing_data.material_composition), ((_x = t.manufacturing_data) == null ? void 0 : _x.substance_of_concern) && (r.substanceOfConcern = t.manufacturing_data.substance_of_concern), ((_y = t.lifecycle_data) == null ? void 0 : _y.carbon_footprint) && (r.carbonFootprint = t.lifecycle_data.carbon_footprint), ((_z = t.lifecycle_data) == null ? void 0 : _z.environmental_footprint) && (r.environmentalFootprint = t.lifecycle_data.environmental_footprint), ((_A = t.lifecycle_data) == null ? void 0 : _A.water_usage) && (r.waterUsage = t.lifecycle_data.water_usage), t.nutritional_info && (t.nutritional_info.calories !== void 0 && (r.calories = String(t.nutritional_info.calories)), t.nutritional_info.total_fat && (r.totalFat = t.nutritional_info.total_fat), t.nutritional_info.saturated_fat && (r.saturatedFat = t.nutritional_info.saturated_fat), t.nutritional_info.carbohydrates && (r.carbohydrates = t.nutritional_info.carbohydrates), t.nutritional_info.sugars && (r.sugars = t.nutritional_info.sugars), t.nutritional_info.protein && (r.protein = t.nutritional_info.protein), t.nutritional_info.sodium && (r.sodium = t.nutritional_info.sodium), Array.isArray(t.nutritional_info.ingredients) && (r.ingredients = t.nutritional_info.ingredients.join(", ")), Array.isArray(t.nutritional_info.allergens) && (r.allergens = t.nutritional_info.allergens.join(", ")), Array.isArray(t.nutritional_info.main_ingredients) && (r.mainIngredients = t.nutritional_info.main_ingredients.join(", ")), Array.isArray(t.nutritional_info.certifications) && (r.certifications = t.nutritional_info.certifications.join(", "))), o && (r.name || r.description || r.ingredients)) try {
        const u = await p.translateDraft(r, g, o);
        u && (r = { ...r, ...u });
      } catch (u) {
        console.error("Auto-translation of analyzed image failed:", u);
      }
      ((_B = t.attributes) == null ? void 0 : _B.sku) ? (E(t.attributes.sku), await F(t.attributes.sku, r)) : N(r), w.success("Product image analyzed successfully with Gemini!");
    } catch (g) {
      w.error(`Gemini Analysis failed: ${g.message || g}`);
    } finally {
      K(false);
    }
  }, [h, p, i, F, j]), he = d.useCallback(async () => {
    if (!s.current) return;
    const l = document.createElement("canvas");
    l.width = s.current.videoWidth || 1280, l.height = s.current.videoHeight || 720;
    const o = l.getContext("2d");
    if (!o) return;
    o.drawImage(s.current, 0, 0, l.width, l.height);
    const g = l.toDataURL("image/jpeg", 0.85);
    _(), await se(g);
  }, [se, _]);
  return { brands: n, categories: v, copyJson: x, downloadJson: k, error: y, form: j, jsonText: a, scannerLabel: P === "scanning" ? "Scanning" : P === "starting" ? "Starting" : P === "unsupported" ? "Manual Entry" : "Camera", scannedCode: i, setScannedCode: E, startCamera: te, status: P, stopCamera: _, updateForm: ne, applyScannedValue: B, videoRef: s, apiKey: h, saveApiKey: be, isAnalyzing: J, isTranslating: Y, translateFormToLanguage: xe, analyzeImage: se, captureAndAnalyze: he, isNativeSupported: "BarcodeDetector" in window, internetImageUrl: D, isFetchingInternetImage: Z, internetProductInfo: ee, downloadProductImage: ae };
}
function $e({ onBack: v }) {
  const { t: n } = ve("scanner"), [m, p] = d.useState(false), { applyScannedValue: h, brands: I, categories: J, copyJson: K, downloadJson: Y, error: O, form: s, jsonText: A, scannerLabel: z, scannedCode: S, setScannedCode: P, startCamera: L, status: y, stopCamera: T, updateForm: i, videoRef: E, apiKey: j, saveApiKey: N, isAnalyzing: D, isTranslating: $, translateFormToLanguage: Z, analyzeImage: M, captureAndAnalyze: ee, isNativeSupported: W, internetImageUrl: F, isFetchingInternetImage: ae, internetProductInfo: _, downloadProductImage: B } = Le(), H = (a) => {
    a.preventDefault(), a.stopPropagation();
  }, te = (a) => {
    a.preventDefault(), a.stopPropagation(), p(true);
  }, ne = (a) => {
    a.preventDefault(), a.stopPropagation(), p(false);
  }, R = (a) => {
    var _a;
    a.preventDefault(), a.stopPropagation(), p(false);
    const x = (_a = a.dataTransfer.files) == null ? void 0 : _a[0];
    if (x && x.type.startsWith("image/")) {
      const k = new FileReader();
      k.onloadend = () => {
        typeof k.result == "string" && M(k.result);
      }, k.readAsDataURL(x);
    }
  };
  return e.jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100", children: [e.jsx("header", { className: "sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-gray-100 dark:border-slate-800", children: e.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3", children: [e.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [e.jsx(U, { variant: "ghost", size: "sm", onClick: v, leftIcon: e.jsx(ke, { className: "w-4 h-4" }), children: n("header.back") }), e.jsxs("div", { className: "min-w-0", children: [e.jsx("h1", { className: "text-lg sm:text-xl font-black tracking-tight truncate", children: n("header.title") }), e.jsx("p", { className: "text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest", children: z })] })] }), e.jsxs("div", { className: "flex items-center gap-2", children: [$ && e.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-indigo-500 font-semibold animate-pulse mr-1", children: [e.jsx(G, { className: "w-3.5 h-3.5 animate-spin" }), e.jsx("span", { className: "hidden sm:inline", children: "Translating..." })] }), e.jsxs("select", { value: Q.language, disabled: $, onChange: async (a) => {
    const x = a.target.value;
    await Q.changeLanguage(x), Z(x, s);
  }, className: "px-2 py-1.5 text-xs font-bold rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50", children: [e.jsx("option", { value: "en", children: "EN" }), e.jsx("option", { value: "es", children: "ES" }), e.jsx("option", { value: "fr", children: "FR" })] }), e.jsx(U, { variant: y === "scanning" || y === "starting" ? "danger" : "primary", size: "sm", onClick: y === "scanning" || y === "starting" ? T : L, leftIcon: y === "starting" ? e.jsx(G, { className: "w-4 h-4 animate-spin" }) : y === "scanning" ? e.jsx(ze, { className: "w-4 h-4" }) : e.jsx(Ne, { className: "w-4 h-4" }), children: n(y === "scanning" || y === "starting" ? "camera.stop_button" : "camera.scan_button") })] })] }) }), e.jsxs("main", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6", children: [e.jsx(q, { className: "bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-100/50 dark:border-indigo-900/30", children: e.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [e.jsxs("div", { className: "flex items-center gap-3", children: [e.jsx("div", { className: "p-2 bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400", children: e.jsx(ue, { className: "w-5 h-5 animate-pulse" }) }), e.jsxs("div", { children: [e.jsx("h3", { className: "text-sm font-bold", children: n("api_key.title") }), e.jsx("p", { className: "text-xs text-gray-500 dark:text-slate-400", children: n("api_key.description") })] })] }), e.jsx("div", { className: "flex items-center gap-2 w-full sm:w-auto", children: e.jsx("input", { type: "password", value: j, onChange: (a) => N(a.target.value), placeholder: n("api_key.placeholder"), className: "w-full sm:w-64 px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20" }) })] }) }), e.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-5", children: [e.jsxs("section", { className: "space-y-5", children: [e.jsxs(q, { padding: "none", className: "overflow-hidden relative", children: [e.jsxs("div", { className: "relative aspect-[4/3] bg-slate-950 flex items-center justify-center", onDragOver: H, onDragEnter: te, onDragLeave: ne, onDrop: R, children: [m && e.jsxs("div", { className: "absolute inset-0 bg-indigo-600/35 backdrop-blur-sm z-40 flex flex-col items-center justify-center gap-3 text-white border-4 border-dashed border-indigo-400 m-2 rounded-2xl animate-pulse", children: [e.jsx(ge, { className: "w-12 h-12 text-indigo-200" }), e.jsx("span", { className: "text-sm font-black tracking-widest uppercase", children: n("camera.drag_drop") })] }), e.jsx("video", { ref: E, muted: true, playsInline: true, className: "absolute inset-0 w-full h-full object-cover" }), y !== "scanning" && y !== "starting" && e.jsxs("div", { className: "relative z-10 flex flex-col items-center gap-3 text-slate-400", children: [e.jsx(fe, { className: "w-14 h-14" }), e.jsx("span", { className: "text-xs font-black uppercase tracking-widest", children: n("camera.idle") })] }), D && e.jsxs("div", { className: "absolute inset-0 bg-slate-950/80 z-30 flex flex-col items-center justify-center gap-3 text-white", children: [e.jsx(G, { className: "w-10 h-10 animate-spin text-indigo-400" }), e.jsx("span", { className: "text-xs font-bold tracking-widest uppercase", children: n("camera.analyzing") })] }), e.jsx("div", { className: "absolute inset-x-8 top-1/2 h-px bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" }), e.jsx("div", { className: "absolute inset-6 border-2 border-white/60 rounded-2xl pointer-events-none" })] }), e.jsxs("div", { className: "p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between", children: [e.jsx("div", { className: "flex gap-2 w-full sm:w-auto", children: e.jsx(U, { variant: "primary", size: "sm", disabled: y !== "scanning" || D, onClick: ee, className: "flex-1 sm:flex-none", leftIcon: e.jsx(ue, { className: "w-4 h-4" }), children: n("camera.snap_analyze") }) }), e.jsx("div", { className: "w-full sm:w-auto", children: e.jsxs("label", { className: "flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-gray-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-xl cursor-pointer text-xs font-bold text-gray-500 dark:text-slate-400 transition-colors w-full", children: [e.jsx(ge, { className: "w-4 h-4" }), n("camera.upload_photo"), e.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (a) => {
    var _a;
    const x = (_a = a.target.files) == null ? void 0 : _a[0];
    if (x) {
      const k = new FileReader();
      k.onloadend = () => {
        typeof k.result == "string" && M(k.result);
      }, k.readAsDataURL(x);
    }
  } })] }) })] })] }), e.jsxs(q, { className: "space-y-4", children: [e.jsxs("div", { children: [e.jsx("label", { className: "block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2", children: n("manual_entry.barcode_label") }), e.jsxs("div", { className: "flex gap-2", children: [e.jsx("input", { value: S, onChange: (a) => P(a.target.value), className: "flex-1 min-w-0 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono text-sm", placeholder: n("manual_entry.placeholder") }), e.jsx(U, { variant: "secondary", onClick: () => h(S), leftIcon: e.jsx(fe, { className: "w-4 h-4" }), children: n("manual_entry.apply") })] })] }), ae && e.jsxs("div", { className: "flex items-center gap-2 py-3 justify-center text-xs font-bold text-gray-500 dark:text-slate-400", children: [e.jsx(G, { className: "w-4 h-4 animate-spin text-indigo-500" }), e.jsx("span", { children: n("lookup.searching") })] }), F && e.jsxs("div", { className: "border border-gray-100 dark:border-slate-800 rounded-xl p-4 bg-gray-50/50 dark:bg-slate-900/30 space-y-3", children: [e.jsxs("div", { className: "flex items-center justify-between", children: [e.jsx("span", { className: "text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400", children: n("lookup.found") }), e.jsx(U, { variant: "secondary", size: "sm", onClick: B, leftIcon: e.jsx(me, { className: "w-3.5 h-3.5" }), children: n("lookup.download_image") })] }), e.jsxs("div", { className: "flex gap-3 items-center", children: [e.jsx("div", { className: "w-16 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-800 bg-white flex items-center justify-center shrink-0", children: e.jsx("img", { src: F, alt: "Internet Product Lookup", className: "max-w-full max-h-full object-contain" }) }), e.jsxs("div", { className: "min-w-0", children: [e.jsx("p", { className: "text-xs font-bold truncate text-gray-900 dark:text-white", children: (_ == null ? void 0 : _.name) || n("lookup.unknown") }), e.jsxs("p", { className: "text-[10px] font-semibold text-gray-500 dark:text-slate-400", children: [n("lookup.brand_label"), ": ", (_ == null ? void 0 : _.brand) || "N/A"] })] })] })] }), !W && e.jsx("p", { className: "text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900 rounded-xl p-3", children: n("camera.unsupported_warning") }), O && e.jsx("p", { className: "text-sm font-medium text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900 rounded-xl p-3", children: O })] })] }), e.jsxs("section", { className: "space-y-5", children: [e.jsxs(q, { className: "space-y-4", children: [e.jsxs("div", { className: "flex items-center gap-2", children: [e.jsx(De, { className: "w-5 h-5 text-indigo-600 dark:text-indigo-400" }), e.jsx("h2", { className: "text-base font-black", children: n("sections.initial_data") })] }), e.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [e.jsx(c, { label: n("fields.name"), value: s.name, onChange: (a) => i("name", a), required: true }), e.jsx(c, { label: n("fields.sku"), value: s.sku, onChange: (a) => i("sku", a) }), e.jsxs(pe, { label: n("fields.category"), value: s.category, onChange: (a) => i("category", a), required: true, children: [e.jsx("option", { value: "", children: n("fields.select_category") }), s.category && !J.some((a) => (a.path || a.name) === s.category) && e.jsx("option", { value: s.category, children: s.category }), J.map((a) => {
    const x = a.path || a.name;
    return e.jsx("option", { value: x, children: x }, a.id);
  })] }), e.jsxs(pe, { label: n("fields.brand"), value: s.brand, onChange: (a) => i("brand", a), children: [e.jsx("option", { value: "", children: n("fields.select_brand") }), s.brand && !I.some((a) => a.name === s.brand) && e.jsx("option", { value: s.brand, children: s.brand }), I.map((a) => e.jsx("option", { value: a.name, children: a.name }, a.id))] }), e.jsx(c, { label: n("fields.color"), value: s.color, onChange: (a) => i("color", a) }), e.jsx(c, { label: n("fields.size"), value: s.size, onChange: (a) => i("size", a) }), e.jsx(c, { label: n("fields.material"), value: s.material, onChange: (a) => i("material", a) }), e.jsx(c, { label: n("fields.weight"), value: s.weight, onChange: (a) => i("weight", a) }), e.jsx(c, { label: n("fields.length"), type: "number", value: s.dimensionLength, onChange: (a) => i("dimensionLength", a) }), e.jsx(c, { label: n("fields.width"), type: "number", value: s.dimensionWidth, onChange: (a) => i("dimensionWidth", a) }), e.jsx(c, { label: n("fields.height"), type: "number", value: s.dimensionHeight, onChange: (a) => i("dimensionHeight", a) }), e.jsx(c, { label: n("fields.dimension_unit"), value: s.dimensionUnit, onChange: (a) => i("dimensionUnit", a) })] }), e.jsxs("div", { children: [e.jsxs("label", { className: "block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2", children: [n("fields.description"), " *"] }), e.jsx("textarea", { value: s.description, onChange: (a) => i("description", a.target.value), rows: 3, className: "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm resize-none" })] }), e.jsxs("div", { className: "border-t border-gray-100 dark:border-slate-800 pt-4 space-y-4", children: [e.jsx("h3", { className: "text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400", children: n("sections.nutritional") }), e.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [e.jsx(c, { label: n("fields.calories"), type: "number", value: s.calories, onChange: (a) => i("calories", a) }), e.jsx(c, { label: n("fields.total_fat"), value: s.totalFat, onChange: (a) => i("totalFat", a) }), e.jsx(c, { label: n("fields.saturated_fat"), value: s.saturatedFat, onChange: (a) => i("saturatedFat", a) }), e.jsx(c, { label: n("fields.carbohydrates"), value: s.carbohydrates, onChange: (a) => i("carbohydrates", a) }), e.jsx(c, { label: n("fields.sugars"), value: s.sugars, onChange: (a) => i("sugars", a) }), e.jsx(c, { label: n("fields.protein"), value: s.protein, onChange: (a) => i("protein", a) }), e.jsx(c, { label: n("fields.sodium"), value: s.sodium, onChange: (a) => i("sodium", a) }), e.jsx(c, { label: n("fields.ingredients"), value: s.ingredients, onChange: (a) => i("ingredients", a) }), e.jsx(c, { label: n("fields.allergens"), value: s.allergens, onChange: (a) => i("allergens", a) }), e.jsx(c, { label: n("fields.main_ingredients"), value: s.mainIngredients, onChange: (a) => i("mainIngredients", a) }), e.jsx(c, { label: n("fields.certifications"), value: s.certifications, onChange: (a) => i("certifications", a) })] })] }), e.jsxs("div", { className: "border-t border-gray-100 dark:border-slate-800 pt-4 space-y-4", children: [e.jsx("h3", { className: "text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400", children: n("sections.sustainability") }), e.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [e.jsx(c, { label: n("fields.life_span"), value: s.lifeSpan, onChange: (a) => i("lifeSpan", a) }), e.jsx(c, { label: n("fields.reliability"), value: s.reliability, onChange: (a) => i("reliability", a) }), e.jsx(c, { label: n("fields.reusability"), value: s.reusability, onChange: (a) => i("reusability", a) }), e.jsx(c, { label: n("fields.refurbishment"), value: s.refurbishment, onChange: (a) => i("refurbishment", a) }), e.jsx(c, { label: n("fields.recycled_content"), value: s.recycledContent, onChange: (a) => i("recycledContent", a) }), e.jsx(c, { label: n("fields.ease_of_repair"), value: s.easeOfRepair, onChange: (a) => i("easeOfRepair", a) }), e.jsx(c, { label: n("fields.spare_parts"), value: s.spareParts, onChange: (a) => i("spareParts", a) }), e.jsx(c, { label: n("fields.maintenance_manual"), value: s.maintenanceManual, onChange: (a) => i("maintenanceManual", a) }), e.jsx(c, { label: n("fields.origin"), value: s.origin, onChange: (a) => i("origin", a) }), e.jsx(c, { label: n("fields.material_composition"), value: s.materialComposition, onChange: (a) => i("materialComposition", a) }), e.jsx(c, { label: n("fields.substance_of_concern"), value: s.substanceOfConcern, onChange: (a) => i("substanceOfConcern", a) }), e.jsx(c, { label: n("fields.carbon_footprint"), value: s.carbonFootprint, onChange: (a) => i("carbonFootprint", a) }), e.jsx(c, { label: n("fields.environmental_footprint"), value: s.environmentalFootprint, onChange: (a) => i("environmentalFootprint", a) }), e.jsx(c, { label: n("fields.water_usage"), value: s.waterUsage, onChange: (a) => i("waterUsage", a) })] })] })] }), e.jsxs(q, { className: "space-y-4", children: [e.jsxs("div", { className: "flex items-center justify-between gap-3", children: [e.jsx("h2", { className: "text-base font-black", children: n("output.title") }), e.jsxs("div", { className: "flex gap-2", children: [e.jsx(U, { size: "sm", variant: "secondary", disabled: !A, onClick: K, leftIcon: e.jsx(Ie, { className: "w-4 h-4" }), children: n("output.copy") }), e.jsx(U, { size: "sm", disabled: !A, onClick: Y, leftIcon: e.jsx(me, { className: "w-4 h-4" }), children: n("output.download") })] })] }), e.jsx("textarea", { readOnly: true, value: A || "Complete the required fields to generate InitialProductData JSON.", rows: 16, className: "w-full rounded-xl bg-slate-950 text-slate-100 p-4 font-mono text-xs leading-relaxed resize-y outline-none" })] })] })] })] })] });
}
function c({ label: v, value: n, onChange: m, type: p = "text", required: h = false }) {
  return e.jsxs("label", { className: "block", children: [e.jsxs("span", { className: "block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2", children: [v, h ? " *" : ""] }), e.jsx("input", { type: p, value: n, onChange: (I) => m(I.target.value), className: "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm" })] });
}
function pe({ label: v, value: n, onChange: m, required: p = false, children: h }) {
  return e.jsxs("label", { className: "block", children: [e.jsxs("span", { className: "block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2", children: [v, p ? " *" : ""] }), e.jsx("select", { value: n, onChange: (I) => m(I.target.value), className: "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm", children: h })] });
}
export {
  $e as BarcodeProductScanner
};
