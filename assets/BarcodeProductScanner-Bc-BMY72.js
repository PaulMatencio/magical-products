import { c as G, d as ye, w as je, r as d, a0 as Z, x as k, e as ve, j as e, L as K, k as de } from "./index-BxPEZ9rT.js";
import { B as P } from "./Button-CsT0WCwK.js";
import { C as V } from "./Card-Dx3ytvDe.js";
import { A as _e } from "./arrow-left-_rv7_lUG.js";
import { U as ue, S as ge } from "./upload-Cr91LjIi.js";
import { D as me } from "./download-5nas_mFn.js";
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ke = [["path", { d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z", key: "18u6gg" }], ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]], we = G("camera", ke);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ne = [["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }], ["path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2", key: "116196" }]], Ce = G("clipboard", Ne);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ie = [["path", { d: "M16 16h6", key: "100bgy" }], ["path", { d: "M19 13v6", key: "85cyf1" }], ["path", { d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14", key: "e7tb2h" }], ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }], ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }], ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }]], Se = G("package-plus", Ie);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ae = [["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]], De = G("square", Ae);
function ze() {
  const { categories: v, brands: n } = ye(), { generateInitialProductDataUseCase: g, geminiAnalyzerService: p } = je(), [h, C] = d.useState(() => localStorage.getItem("gemini_api_key") || ""), [q, J] = d.useState(false), [X, O] = d.useState(false), r = d.useRef(null), z = d.useRef(null), L = d.useRef(null), I = d.useRef(null), [B, F] = d.useState("idle"), [y, T] = d.useState(null), [i, E] = d.useState(""), [w, S] = d.useState(() => g.createInitialDraft(v, n)), [A, $] = d.useState(null), [Y, M] = d.useState(false), [ee, Q] = d.useState(null), R = d.useCallback(async (l) => {
    if (l) {
      M(true), $(null), Q(null);
      try {
        const o = await fetch(`https://world.openfoodfacts.org/api/v0/product/${l}.json`);
        if (!o.ok) return;
        const u = await o.json();
        if (u.status === 1 && u.product) {
          const t = u.product, x = t.image_front_url || t.image_url;
          x && $(x), Q({ name: t.product_name || "", brand: t.brands || "" });
          let s = g.createInitialDraft(v, n);
          if (s.sku = l, t.product_name && (s.name = t.product_name), t.brands && (s.brand = t.brands.split(",")[0].trim()), (t.manufacturer || t.brand_owner) && (s.manufacturer = t.manufacturer || t.brand_owner), t.ingredients_text) {
            s.ingredients = t.ingredients_text;
            const f = t.ingredients_text.split(",").map((N) => N.trim()).filter((N) => N && N.length > 2);
            f.length > 0 && (s.mainIngredients = f.slice(0, 3).join(", "));
          }
          if (t.labels && (s.certifications = t.labels.split(",").map((f) => f.trim()).join(", ")), t.allergens_from_ingredients || t.allergens) {
            const f = t.allergens_from_ingredients || t.allergens;
            s.allergens = f.split(",").map((N) => N.replace(/^[a-z]{2}:/, "").trim()).filter(Boolean).join(", ");
          }
          const m = t.nutriments;
          if (m) {
            const f = m["energy-kcal"] || m["energy-kcal_100g"];
            f !== void 0 && (s.calories = String(f));
            const N = m.fat || m.fat_100g;
            N !== void 0 && (s.totalFat = `${N}g`);
            const re = m["saturated-fat"] || m["saturated-fat_100g"];
            re !== void 0 && (s.saturatedFat = `${re}g`);
            const ie = m.carbohydrates || m.carbohydrates_100g;
            ie !== void 0 && (s.carbohydrates = `${ie}g`);
            const le = m.sugars || m.sugars_100g;
            le !== void 0 && (s.sugars = `${le}g`);
            const oe = m.proteins || m.proteins_100g;
            oe !== void 0 && (s.protein = `${oe}g`);
            const ce = m.sodium || m.sodium_100g;
            ce !== void 0 && (s.sodium = `${Math.round(ce * 1e3)}mg`);
          }
          const D = h || "AIzaSyAjNobHoW98aWLQBmoZNcFjAdCQIyvgBv8", he = (Z.language || "en").split("-")[0];
          if (D && (s.name || s.ingredients || s.certifications)) try {
            const f = await p.translateDraft(s, he, D);
            f && (s = { ...s, ...f });
          } catch (f) {
            console.error("Translation of fetched barcode failed:", f), k.error("Translation of fetched barcode failed: " + f);
          }
          S(s);
        }
      } catch (o) {
        console.error("Barcode lookup failed:", o), k.error("Barcode lookup failed: " + o);
      } finally {
        M(false);
      }
    }
  }, [h, n, v, g, p]), ae = d.useCallback(async () => {
    if (!A) return;
    const l = w.name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") || "product", o = i || w.sku || "", u = o ? `_${o}` : "", t = `${l}${u}.jpg`;
    try {
      const s = await (await fetch(A)).blob(), m = URL.createObjectURL(s), D = document.createElement("a");
      D.href = m, D.download = t, document.body.appendChild(D), D.click(), document.body.removeChild(D), URL.revokeObjectURL(m), k.success("Product image downloaded");
    } catch (x) {
      console.error("Image download failed:", x), window.open(A, "_blank"), k.info("Opened image in a new tab for saving.");
    }
  }, [A, w.name, w.sku, i]);
  d.useEffect(() => {
    const l = g.createInitialDraft(v, n);
    S((o) => ({ ...o, category: o.category || l.category, brand: o.brand || l.brand }));
  }, [n, v, g]);
  const j = d.useCallback(() => {
    var _a;
    L.current && (cancelAnimationFrame(L.current), L.current = null), (_a = z.current) == null ? void 0 : _a.getTracks().forEach((l) => l.stop()), z.current = null, r.current && (r.current.srcObject = null), F((l) => l === "scanning" || l === "starting" ? "idle" : l);
  }, []);
  d.useEffect(() => j, [j]);
  const H = d.useCallback((l) => {
    const o = l.trim();
    o && (E(o), S((u) => g.applyScannedValue(u, o)), k.success("Barcode captured"), R(o));
  }, [g, R]), W = d.useCallback(async () => {
    var _a, _b;
    if (!(!I.current || !r.current)) {
      try {
        if (r.current.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          const o = (_b = (_a = await I.current.detect(r.current)) == null ? void 0 : _a[0]) == null ? void 0 : _b.rawValue;
          if (o) {
            H(o), j();
            return;
          }
        }
      } catch (l) {
        T(l.message || "Scanner failed."), F("error"), j();
        return;
      }
      L.current = requestAnimationFrame(W);
    }
  }, [H, j]), te = d.useCallback(async () => {
    T(null);
    try {
      if (F("starting"), "BarcodeDetector" in window) {
        const o = window.BarcodeDetector;
        I.current = new o({ formats: ["ean_13", "ean_8", "upc_a", "upc_e", "code_128", "code_39", "qr_code"] });
      } else I.current = null;
      const l = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
      if (z.current = l, !r.current) return;
      r.current.srcObject = l, await r.current.play(), F("scanning"), I.current && (L.current = requestAnimationFrame(W));
    } catch (l) {
      T(l.message || "Camera access failed."), F("error"), j();
    }
  }, [W, j]), ne = d.useCallback((l, o) => {
    S((u) => ({ ...u, [l]: o }));
  }, []), U = d.useMemo(() => g.generate(i, w), [w, g, i]), a = d.useMemo(() => g.serialize(U), [g, U]), b = d.useCallback(async () => {
    a && (await navigator.clipboard.writeText(a), k.success("Initial product JSON copied"));
  }, [a]), _ = d.useCallback(() => {
    if (!a || !U) return;
    const l = new Blob([a], { type: "application/json" }), o = URL.createObjectURL(l), u = document.createElement("a");
    u.href = o, u.download = g.getDownloadFileName(U), document.body.appendChild(u), u.click(), document.body.removeChild(u), URL.revokeObjectURL(o);
  }, [g, U, a]), pe = d.useCallback((l) => {
    localStorage.setItem("gemini_api_key", l), C(l);
  }, []), be = d.useCallback(async (l, o) => {
    const u = h || "AIzaSyAjNobHoW98aWLQBmoZNcFjAdCQIyvgBv8";
    if (o.name || o.description || o.ingredients || o.lifeSpan || o.origin) {
      O(true);
      try {
        const x = await p.translateDraft(o, l, u);
        x && (S((s) => ({ ...s, ...x })), k.success(`Form data translated to ${l.toUpperCase()}`));
      } catch (x) {
        console.error("Translation failed:", x), k.error(`Failed to translate form data: ${x.message || x}`);
      } finally {
        O(false);
      }
    }
  }, [h, p]), se = d.useCallback(async (l) => {
    const o = h || "AIzaSyAjNobHoW98aWLQBmoZNcFjAdCQIyvgBv8";
    J(true);
    try {
      const u = (Z.language || "en").split("-")[0], t = await p.analyzePackaging(l, o, i);
      S((x) => {
        var _a, _b, _c, _d, _e2, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A;
        const s = { ...x };
        return t.name && (s.name = t.name), t.category && (s.category = t.category), t.description && (s.description = t.description), t.brand && (s.brand = t.brand), t.manufacturer && (s.manufacturer = t.manufacturer), ((_a = t.attributes) == null ? void 0 : _a.color) && (s.color = t.attributes.color), ((_b = t.attributes) == null ? void 0 : _b.size) && (s.size = t.attributes.size), ((_c = t.attributes) == null ? void 0 : _c.material) && (s.material = t.attributes.material), ((_d = t.attributes) == null ? void 0 : _d.weight) && (s.weight = t.attributes.weight), ((_e2 = t.attributes) == null ? void 0 : _e2.sku) && (s.sku = t.attributes.sku, E(t.attributes.sku), R(t.attributes.sku)), ((_g = (_f = t.attributes) == null ? void 0 : _f.dimensions) == null ? void 0 : _g.length) !== void 0 && (s.dimensionLength = String(t.attributes.dimensions.length)), ((_i = (_h = t.attributes) == null ? void 0 : _h.dimensions) == null ? void 0 : _i.width) !== void 0 && (s.dimensionWidth = String(t.attributes.dimensions.width)), ((_k = (_j = t.attributes) == null ? void 0 : _j.dimensions) == null ? void 0 : _k.height) !== void 0 && (s.dimensionHeight = String(t.attributes.dimensions.height)), ((_m = (_l = t.attributes) == null ? void 0 : _l.dimensions) == null ? void 0 : _m.unit) && (s.dimensionUnit = t.attributes.dimensions.unit), ((_n = t.durability_data) == null ? void 0 : _n.life_span) && (s.lifeSpan = t.durability_data.life_span), ((_o = t.durability_data) == null ? void 0 : _o.reliability) && (s.reliability = t.durability_data.reliability), ((_p = t.durability_data) == null ? void 0 : _p.reusability) && (s.reusability = t.durability_data.reusability), ((_q = t.durability_data) == null ? void 0 : _q.refurbishment) && (s.refurbishment = t.durability_data.refurbishment), ((_r = t.durability_data) == null ? void 0 : _r.recycled_content) && (s.recycledContent = t.durability_data.recycled_content), ((_s = t.repairability_data) == null ? void 0 : _s.ease_of_repair) && (s.easeOfRepair = t.repairability_data.ease_of_repair), ((_t = t.repairability_data) == null ? void 0 : _t.spare_parts) && (s.spareParts = t.repairability_data.spare_parts), ((_u = t.repairability_data) == null ? void 0 : _u.maintenance_manual) && (s.maintenanceManual = t.repairability_data.maintenance_manual), ((_v = t.manufacturing_data) == null ? void 0 : _v.origin) && (s.origin = t.manufacturing_data.origin), ((_w = t.manufacturing_data) == null ? void 0 : _w.material_composition) && (s.materialComposition = t.manufacturing_data.material_composition), ((_x = t.manufacturing_data) == null ? void 0 : _x.substance_of_concern) && (s.substanceOfConcern = t.manufacturing_data.substance_of_concern), ((_y = t.lifecycle_data) == null ? void 0 : _y.carbon_footprint) && (s.carbonFootprint = t.lifecycle_data.carbon_footprint), ((_z = t.lifecycle_data) == null ? void 0 : _z.environmental_footprint) && (s.environmentalFootprint = t.lifecycle_data.environmental_footprint), ((_A = t.lifecycle_data) == null ? void 0 : _A.water_usage) && (s.waterUsage = t.lifecycle_data.water_usage), t.nutritional_info && (t.nutritional_info.calories !== void 0 && (s.calories = String(t.nutritional_info.calories)), t.nutritional_info.total_fat && (s.totalFat = t.nutritional_info.total_fat), t.nutritional_info.saturated_fat && (s.saturatedFat = t.nutritional_info.saturated_fat), t.nutritional_info.carbohydrates && (s.carbohydrates = t.nutritional_info.carbohydrates), t.nutritional_info.sugars && (s.sugars = t.nutritional_info.sugars), t.nutritional_info.protein && (s.protein = t.nutritional_info.protein), t.nutritional_info.sodium && (s.sodium = t.nutritional_info.sodium), Array.isArray(t.nutritional_info.ingredients) && (s.ingredients = t.nutritional_info.ingredients.join(", ")), Array.isArray(t.nutritional_info.allergens) && (s.allergens = t.nutritional_info.allergens.join(", ")), Array.isArray(t.nutritional_info.main_ingredients) && (s.mainIngredients = t.nutritional_info.main_ingredients.join(", ")), Array.isArray(t.nutritional_info.certifications) && (s.certifications = t.nutritional_info.certifications.join(", "))), s;
      }), k.success("Product image analyzed successfully with Gemini!");
    } catch (u) {
      k.error(`Gemini Analysis failed: ${u.message || u}`);
    } finally {
      J(false);
    }
  }, [h, p, i, R]), xe = d.useCallback(async () => {
    if (!r.current) return;
    const l = document.createElement("canvas");
    l.width = r.current.videoWidth || 1280, l.height = r.current.videoHeight || 720;
    const o = l.getContext("2d");
    if (!o) return;
    o.drawImage(r.current, 0, 0, l.width, l.height);
    const u = l.toDataURL("image/jpeg", 0.85);
    j(), await se(u);
  }, [se, j]);
  return { brands: n, categories: v, copyJson: b, downloadJson: _, error: y, form: w, jsonText: a, scannerLabel: B === "scanning" ? "Scanning" : B === "starting" ? "Starting" : B === "unsupported" ? "Manual Entry" : "Camera", scannedCode: i, setScannedCode: E, startCamera: te, status: B, stopCamera: j, updateForm: ne, applyScannedValue: H, videoRef: r, apiKey: h, saveApiKey: pe, isAnalyzing: q, isTranslating: X, translateFormToLanguage: be, analyzeImage: se, captureAndAnalyze: xe, isNativeSupported: "BarcodeDetector" in window, internetImageUrl: A, isFetchingInternetImage: Y, internetProductInfo: ee, downloadProductImage: ae };
}
function Te({ onBack: v }) {
  const { t: n } = ve("scanner"), [g, p] = d.useState(false), { applyScannedValue: h, brands: C, categories: q, copyJson: J, downloadJson: X, error: O, form: r, jsonText: z, scannerLabel: L, scannedCode: I, setScannedCode: B, startCamera: F, status: y, stopCamera: T, updateForm: i, videoRef: E, apiKey: w, saveApiKey: S, isAnalyzing: A, isTranslating: $, translateFormToLanguage: Y, analyzeImage: M, captureAndAnalyze: ee, isNativeSupported: Q, internetImageUrl: R, isFetchingInternetImage: ae, internetProductInfo: j, downloadProductImage: H } = ze(), W = (a) => {
    a.preventDefault(), a.stopPropagation();
  }, te = (a) => {
    a.preventDefault(), a.stopPropagation(), p(true);
  }, ne = (a) => {
    a.preventDefault(), a.stopPropagation(), p(false);
  }, U = (a) => {
    var _a;
    a.preventDefault(), a.stopPropagation(), p(false);
    const b = (_a = a.dataTransfer.files) == null ? void 0 : _a[0];
    if (b && b.type.startsWith("image/")) {
      const _ = new FileReader();
      _.onloadend = () => {
        typeof _.result == "string" && M(_.result);
      }, _.readAsDataURL(b);
    }
  };
  return e.jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100", children: [e.jsx("header", { className: "sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-gray-100 dark:border-slate-800", children: e.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3", children: [e.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [e.jsx(P, { variant: "ghost", size: "sm", onClick: v, leftIcon: e.jsx(_e, { className: "w-4 h-4" }), children: n("header.back") }), e.jsxs("div", { className: "min-w-0", children: [e.jsx("h1", { className: "text-lg sm:text-xl font-black tracking-tight truncate", children: n("header.title") }), e.jsx("p", { className: "text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest", children: L })] })] }), e.jsxs("div", { className: "flex items-center gap-2", children: [$ && e.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-indigo-500 font-semibold animate-pulse mr-1", children: [e.jsx(K, { className: "w-3.5 h-3.5 animate-spin" }), e.jsx("span", { className: "hidden sm:inline", children: "Translating..." })] }), e.jsxs("select", { value: Z.language, disabled: $, onChange: async (a) => {
    const b = a.target.value;
    await Z.changeLanguage(b), Y(b, r);
  }, className: "px-2 py-1.5 text-xs font-bold rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50", children: [e.jsx("option", { value: "en", children: "EN" }), e.jsx("option", { value: "es", children: "ES" }), e.jsx("option", { value: "fr", children: "FR" })] }), e.jsx(P, { variant: y === "scanning" || y === "starting" ? "danger" : "primary", size: "sm", onClick: y === "scanning" || y === "starting" ? T : F, leftIcon: y === "starting" ? e.jsx(K, { className: "w-4 h-4 animate-spin" }) : y === "scanning" ? e.jsx(De, { className: "w-4 h-4" }) : e.jsx(we, { className: "w-4 h-4" }), children: n(y === "scanning" || y === "starting" ? "camera.stop_button" : "camera.scan_button") })] })] }) }), e.jsxs("main", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6", children: [e.jsx(V, { className: "bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-100/50 dark:border-indigo-900/30", children: e.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [e.jsxs("div", { className: "flex items-center gap-3", children: [e.jsx("div", { className: "p-2 bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400", children: e.jsx(de, { className: "w-5 h-5 animate-pulse" }) }), e.jsxs("div", { children: [e.jsx("h3", { className: "text-sm font-bold", children: n("api_key.title") }), e.jsx("p", { className: "text-xs text-gray-500 dark:text-slate-400", children: n("api_key.description") })] })] }), e.jsx("div", { className: "flex items-center gap-2 w-full sm:w-auto", children: e.jsx("input", { type: "password", value: w, onChange: (a) => S(a.target.value), placeholder: n("api_key.placeholder"), className: "w-full sm:w-64 px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20" }) })] }) }), e.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-5", children: [e.jsxs("section", { className: "space-y-5", children: [e.jsxs(V, { padding: "none", className: "overflow-hidden relative", children: [e.jsxs("div", { className: "relative aspect-[4/3] bg-slate-950 flex items-center justify-center", onDragOver: W, onDragEnter: te, onDragLeave: ne, onDrop: U, children: [g && e.jsxs("div", { className: "absolute inset-0 bg-indigo-600/35 backdrop-blur-sm z-40 flex flex-col items-center justify-center gap-3 text-white border-4 border-dashed border-indigo-400 m-2 rounded-2xl animate-pulse", children: [e.jsx(ue, { className: "w-12 h-12 text-indigo-200" }), e.jsx("span", { className: "text-sm font-black tracking-widest uppercase", children: n("camera.drag_drop") })] }), e.jsx("video", { ref: E, muted: true, playsInline: true, className: "absolute inset-0 w-full h-full object-cover" }), y !== "scanning" && y !== "starting" && e.jsxs("div", { className: "relative z-10 flex flex-col items-center gap-3 text-slate-400", children: [e.jsx(ge, { className: "w-14 h-14" }), e.jsx("span", { className: "text-xs font-black uppercase tracking-widest", children: n("camera.idle") })] }), A && e.jsxs("div", { className: "absolute inset-0 bg-slate-950/80 z-30 flex flex-col items-center justify-center gap-3 text-white", children: [e.jsx(K, { className: "w-10 h-10 animate-spin text-indigo-400" }), e.jsx("span", { className: "text-xs font-bold tracking-widest uppercase", children: n("camera.analyzing") })] }), e.jsx("div", { className: "absolute inset-x-8 top-1/2 h-px bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" }), e.jsx("div", { className: "absolute inset-6 border-2 border-white/60 rounded-2xl pointer-events-none" })] }), e.jsxs("div", { className: "p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between", children: [e.jsx("div", { className: "flex gap-2 w-full sm:w-auto", children: e.jsx(P, { variant: "primary", size: "sm", disabled: y !== "scanning" || A, onClick: ee, className: "flex-1 sm:flex-none", leftIcon: e.jsx(de, { className: "w-4 h-4" }), children: n("camera.snap_analyze") }) }), e.jsx("div", { className: "w-full sm:w-auto", children: e.jsxs("label", { className: "flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-gray-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-xl cursor-pointer text-xs font-bold text-gray-500 dark:text-slate-400 transition-colors w-full", children: [e.jsx(ue, { className: "w-4 h-4" }), n("camera.upload_photo"), e.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (a) => {
    var _a;
    const b = (_a = a.target.files) == null ? void 0 : _a[0];
    if (b) {
      const _ = new FileReader();
      _.onloadend = () => {
        typeof _.result == "string" && M(_.result);
      }, _.readAsDataURL(b);
    }
  } })] }) })] })] }), e.jsxs(V, { className: "space-y-4", children: [e.jsxs("div", { children: [e.jsx("label", { className: "block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2", children: n("manual_entry.barcode_label") }), e.jsxs("div", { className: "flex gap-2", children: [e.jsx("input", { value: I, onChange: (a) => B(a.target.value), className: "flex-1 min-w-0 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono text-sm", placeholder: n("manual_entry.placeholder") }), e.jsx(P, { variant: "secondary", onClick: () => h(I), leftIcon: e.jsx(ge, { className: "w-4 h-4" }), children: n("manual_entry.apply") })] })] }), ae && e.jsxs("div", { className: "flex items-center gap-2 py-3 justify-center text-xs font-bold text-gray-500 dark:text-slate-400", children: [e.jsx(K, { className: "w-4 h-4 animate-spin text-indigo-500" }), e.jsx("span", { children: n("lookup.searching") })] }), R && e.jsxs("div", { className: "border border-gray-100 dark:border-slate-800 rounded-xl p-4 bg-gray-50/50 dark:bg-slate-900/30 space-y-3", children: [e.jsxs("div", { className: "flex items-center justify-between", children: [e.jsx("span", { className: "text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400", children: n("lookup.found") }), e.jsx(P, { variant: "secondary", size: "sm", onClick: H, leftIcon: e.jsx(me, { className: "w-3.5 h-3.5" }), children: n("lookup.download_image") })] }), e.jsxs("div", { className: "flex gap-3 items-center", children: [e.jsx("div", { className: "w-16 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-800 bg-white flex items-center justify-center shrink-0", children: e.jsx("img", { src: R, alt: "Internet Product Lookup", className: "max-w-full max-h-full object-contain" }) }), e.jsxs("div", { className: "min-w-0", children: [e.jsx("p", { className: "text-xs font-bold truncate text-gray-900 dark:text-white", children: (j == null ? void 0 : j.name) || n("lookup.unknown") }), e.jsxs("p", { className: "text-[10px] font-semibold text-gray-500 dark:text-slate-400", children: [n("lookup.brand_label"), ": ", (j == null ? void 0 : j.brand) || "N/A"] })] })] })] }), !Q && e.jsx("p", { className: "text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900 rounded-xl p-3", children: n("camera.unsupported_warning") }), O && e.jsx("p", { className: "text-sm font-medium text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900 rounded-xl p-3", children: O })] })] }), e.jsxs("section", { className: "space-y-5", children: [e.jsxs(V, { className: "space-y-4", children: [e.jsxs("div", { className: "flex items-center gap-2", children: [e.jsx(Se, { className: "w-5 h-5 text-indigo-600 dark:text-indigo-400" }), e.jsx("h2", { className: "text-base font-black", children: n("sections.initial_data") })] }), e.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [e.jsx(c, { label: n("fields.name"), value: r.name, onChange: (a) => i("name", a), required: true }), e.jsx(c, { label: n("fields.sku"), value: r.sku, onChange: (a) => i("sku", a) }), e.jsxs(fe, { label: n("fields.category"), value: r.category, onChange: (a) => i("category", a), required: true, children: [e.jsx("option", { value: "", children: n("fields.select_category") }), r.category && !q.some((a) => (a.path || a.name) === r.category) && e.jsx("option", { value: r.category, children: r.category }), q.map((a) => {
    const b = a.path || a.name;
    return e.jsx("option", { value: b, children: b }, a.id);
  })] }), e.jsxs(fe, { label: n("fields.brand"), value: r.brand, onChange: (a) => i("brand", a), children: [e.jsx("option", { value: "", children: n("fields.select_brand") }), r.brand && !C.some((a) => a.name === r.brand) && e.jsx("option", { value: r.brand, children: r.brand }), C.map((a) => e.jsx("option", { value: a.name, children: a.name }, a.id))] }), e.jsx(c, { label: n("fields.color"), value: r.color, onChange: (a) => i("color", a) }), e.jsx(c, { label: n("fields.size"), value: r.size, onChange: (a) => i("size", a) }), e.jsx(c, { label: n("fields.material"), value: r.material, onChange: (a) => i("material", a) }), e.jsx(c, { label: n("fields.weight"), value: r.weight, onChange: (a) => i("weight", a) }), e.jsx(c, { label: n("fields.length"), type: "number", value: r.dimensionLength, onChange: (a) => i("dimensionLength", a) }), e.jsx(c, { label: n("fields.width"), type: "number", value: r.dimensionWidth, onChange: (a) => i("dimensionWidth", a) }), e.jsx(c, { label: n("fields.height"), type: "number", value: r.dimensionHeight, onChange: (a) => i("dimensionHeight", a) }), e.jsx(c, { label: n("fields.dimension_unit"), value: r.dimensionUnit, onChange: (a) => i("dimensionUnit", a) })] }), e.jsxs("div", { children: [e.jsxs("label", { className: "block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2", children: [n("fields.description"), " *"] }), e.jsx("textarea", { value: r.description, onChange: (a) => i("description", a.target.value), rows: 3, className: "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm resize-none" })] }), e.jsxs("div", { className: "border-t border-gray-100 dark:border-slate-800 pt-4 space-y-4", children: [e.jsx("h3", { className: "text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400", children: n("sections.nutritional") }), e.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [e.jsx(c, { label: n("fields.calories"), type: "number", value: r.calories, onChange: (a) => i("calories", a) }), e.jsx(c, { label: n("fields.total_fat"), value: r.totalFat, onChange: (a) => i("totalFat", a) }), e.jsx(c, { label: n("fields.saturated_fat"), value: r.saturatedFat, onChange: (a) => i("saturatedFat", a) }), e.jsx(c, { label: n("fields.carbohydrates"), value: r.carbohydrates, onChange: (a) => i("carbohydrates", a) }), e.jsx(c, { label: n("fields.sugars"), value: r.sugars, onChange: (a) => i("sugars", a) }), e.jsx(c, { label: n("fields.protein"), value: r.protein, onChange: (a) => i("protein", a) }), e.jsx(c, { label: n("fields.sodium"), value: r.sodium, onChange: (a) => i("sodium", a) }), e.jsx(c, { label: n("fields.ingredients"), value: r.ingredients, onChange: (a) => i("ingredients", a) }), e.jsx(c, { label: n("fields.allergens"), value: r.allergens, onChange: (a) => i("allergens", a) }), e.jsx(c, { label: n("fields.main_ingredients"), value: r.mainIngredients, onChange: (a) => i("mainIngredients", a) }), e.jsx(c, { label: n("fields.certifications"), value: r.certifications, onChange: (a) => i("certifications", a) })] })] }), e.jsxs("div", { className: "border-t border-gray-100 dark:border-slate-800 pt-4 space-y-4", children: [e.jsx("h3", { className: "text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400", children: n("sections.sustainability") }), e.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [e.jsx(c, { label: n("fields.life_span"), value: r.lifeSpan, onChange: (a) => i("lifeSpan", a) }), e.jsx(c, { label: n("fields.reliability"), value: r.reliability, onChange: (a) => i("reliability", a) }), e.jsx(c, { label: n("fields.reusability"), value: r.reusability, onChange: (a) => i("reusability", a) }), e.jsx(c, { label: n("fields.refurbishment"), value: r.refurbishment, onChange: (a) => i("refurbishment", a) }), e.jsx(c, { label: n("fields.recycled_content"), value: r.recycledContent, onChange: (a) => i("recycledContent", a) }), e.jsx(c, { label: n("fields.ease_of_repair"), value: r.easeOfRepair, onChange: (a) => i("easeOfRepair", a) }), e.jsx(c, { label: n("fields.spare_parts"), value: r.spareParts, onChange: (a) => i("spareParts", a) }), e.jsx(c, { label: n("fields.maintenance_manual"), value: r.maintenanceManual, onChange: (a) => i("maintenanceManual", a) }), e.jsx(c, { label: n("fields.origin"), value: r.origin, onChange: (a) => i("origin", a) }), e.jsx(c, { label: n("fields.material_composition"), value: r.materialComposition, onChange: (a) => i("materialComposition", a) }), e.jsx(c, { label: n("fields.substance_of_concern"), value: r.substanceOfConcern, onChange: (a) => i("substanceOfConcern", a) }), e.jsx(c, { label: n("fields.carbon_footprint"), value: r.carbonFootprint, onChange: (a) => i("carbonFootprint", a) }), e.jsx(c, { label: n("fields.environmental_footprint"), value: r.environmentalFootprint, onChange: (a) => i("environmentalFootprint", a) }), e.jsx(c, { label: n("fields.water_usage"), value: r.waterUsage, onChange: (a) => i("waterUsage", a) })] })] })] }), e.jsxs(V, { className: "space-y-4", children: [e.jsxs("div", { className: "flex items-center justify-between gap-3", children: [e.jsx("h2", { className: "text-base font-black", children: n("output.title") }), e.jsxs("div", { className: "flex gap-2", children: [e.jsx(P, { size: "sm", variant: "secondary", disabled: !z, onClick: J, leftIcon: e.jsx(Ce, { className: "w-4 h-4" }), children: n("output.copy") }), e.jsx(P, { size: "sm", disabled: !z, onClick: X, leftIcon: e.jsx(me, { className: "w-4 h-4" }), children: n("output.download") })] })] }), e.jsx("textarea", { readOnly: true, value: z || "Complete the required fields to generate InitialProductData JSON.", rows: 16, className: "w-full rounded-xl bg-slate-950 text-slate-100 p-4 font-mono text-xs leading-relaxed resize-y outline-none" })] })] })] })] })] });
}
function c({ label: v, value: n, onChange: g, type: p = "text", required: h = false }) {
  return e.jsxs("label", { className: "block", children: [e.jsxs("span", { className: "block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2", children: [v, h ? " *" : ""] }), e.jsx("input", { type: p, value: n, onChange: (C) => g(C.target.value), className: "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm" })] });
}
function fe({ label: v, value: n, onChange: g, required: p = false, children: h }) {
  return e.jsxs("label", { className: "block", children: [e.jsxs("span", { className: "block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2", children: [v, p ? " *" : ""] }), e.jsx("select", { value: n, onChange: (C) => g(C.target.value), className: "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm", children: h })] });
}
export {
  Te as BarcodeProductScanner
};
