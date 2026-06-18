import { c as se, d as Fe, w as De, r as g, a0 as re, x as h, e as Ue, j as e, L as Y, k as be } from "./index-CGCy5nHt.js";
import { B as D } from "./Button-Djf6fDta.js";
import { C as Z } from "./Card-CAPOPLfZ.js";
import { A as ze } from "./arrow-left-CKd8Zij-.js";
import { U as je } from "./upload-BnXAakVT.js";
import { S as ke } from "./scan-line-zlecMbTd.js";
import { D as pe } from "./download-lL-3ZsRp.js";
import { S as Le } from "./search-907NCxm8.js";
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Re = [["path", { d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z", key: "18u6gg" }], ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]], Ee = se("camera", Re);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Oe = [["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }], ["path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2", key: "116196" }]], $e = se("clipboard", Oe);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const He = [["path", { d: "M16 16h6", key: "100bgy" }], ["path", { d: "M19 13v6", key: "85cyf1" }], ["path", { d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14", key: "e7tb2h" }], ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }], ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }], ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }]], Te = se("package-plus", He);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Me = [["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]], Be = se("square", Me);
function We() {
  const { categories: y, brands: i } = Fe(), { generateInitialProductDataUseCase: p, geminiAnalyzerService: x } = De(), [w, U] = g.useState(() => localStorage.getItem("gemini_api_key") || ""), [ee, ae] = g.useState(false), [oe, V] = g.useState(false), [s, B] = g.useState(false), j = g.useRef(null), L = g.useRef(null), R = g.useRef(null), E = g.useRef(null), [_, O] = g.useState("idle"), [u, G] = g.useState(null), [v, W] = g.useState(""), [b, I] = g.useState(() => p.createInitialDraft(y, i)), [$, J] = g.useState(null), [le, te] = g.useState(false), [H, K] = g.useState(null), [A, ne] = g.useState(null), [T, ce] = g.useState(""), [z, de] = g.useState(""), q = g.useCallback(async (l, c) => {
    if (l) {
      te(true), J(null), K(null);
      try {
        const m = await fetch(`https://world.openfoodfacts.org/api/v0/product/${l}.json`);
        let d = c || p.createInitialDraft(y, i);
        if (d.sku = l, !m.ok) {
          I(d);
          return;
        }
        const n = await m.json();
        if (n.status === 1 && n.product) {
          const a = n.product, o = a.image_front_url || a.image_url;
          if (o && J(o), K({ name: a.product_name || "", brand: a.brands || "" }), a.product_name && (d.name = a.product_name), a.brands && (d.brand = a.brands.split(",")[0].trim()), (a.manufacturer || a.brand_owner) && (d.manufacturer = a.manufacturer || a.brand_owner), a.ingredients_text) {
            d.ingredients = a.ingredients_text;
            const k = a.ingredients_text.split(",").map((F) => F.trim()).filter((F) => F && F.length > 2);
            k.length > 0 && (d.mainIngredients = k.slice(0, 3).join(", "));
          }
          if (a.labels && (d.certifications = a.labels.split(",").map((k) => k.trim()).join(", ")), a.allergens_from_ingredients || a.allergens) {
            const k = a.allergens_from_ingredients || a.allergens;
            d.allergens = k.split(",").map((F) => F.replace(/^[a-z]{2}:/, "").trim()).filter(Boolean).join(", ");
          }
          const r = a.nutriments;
          if (r) {
            const k = r["energy-kcal"] || r["energy-kcal_100g"];
            k !== void 0 && (d.calories = String(k));
            const F = r.fat || r.fat_100g;
            F !== void 0 && (d.totalFat = `${F}g`);
            const he = r["saturated-fat"] || r["saturated-fat_100g"];
            he !== void 0 && (d.saturatedFat = `${he}g`);
            const xe = r.carbohydrates || r.carbohydrates_100g;
            xe !== void 0 && (d.carbohydrates = `${xe}g`);
            const ye = r.sugars || r.sugars_100g;
            ye !== void 0 && (d.sugars = `${ye}g`);
            const _e = r.proteins || r.proteins_100g;
            _e !== void 0 && (d.protein = `${_e}g`);
            const we = r.sodium || r.sodium_100g;
            we !== void 0 && (d.sodium = `${Math.round(we * 1e3)}mg`);
          }
          const P = w || "" || "", ie = (re.language || "en").split("-")[0];
          if (P && (d.name || d.ingredients || d.certifications)) try {
            const k = await x.translateDraft(d, ie, P);
            k && (d = { ...d, ...k });
          } catch (k) {
            console.error("Translation of fetched barcode failed:", k), h.error("Translation of fetched barcode failed: " + k);
          }
        }
        I(d);
      } catch (m) {
        console.error("Barcode lookup failed:", m), h.error("Barcode lookup failed: " + m), c && I(c);
      } finally {
        te(false);
      }
    }
  }, [w, i, y, p, x]), ue = g.useCallback(async () => {
    if (!$) return;
    const l = b.name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") || "product", c = v || b.sku || "", m = c ? `_${c}` : "", d = `${l}${m}.jpg`;
    try {
      const a = await (await fetch($)).blob();
      if ("showSaveFilePicker" in window) try {
        const ie = await (await window.showSaveFilePicker({ suggestedName: d, types: [{ description: "JPEG Images", accept: { "image/jpeg": [".jpg", ".jpeg"] } }] })).createWritable();
        await ie.write(a), await ie.close(), h.success("Product image saved successfully");
        return;
      } catch (P) {
        if (P.name === "AbortError") return;
        console.warn("File System Access API failed, falling back to standard download:", P);
      }
      const o = URL.createObjectURL(a), r = document.createElement("a");
      r.href = o, r.download = d, document.body.appendChild(r), r.click(), document.body.removeChild(r), URL.revokeObjectURL(o), h.success("Product image downloaded to default folder");
    } catch (n) {
      console.error("Image download failed:", n), window.open($, "_blank"), h.info("Opened image in a new tab for saving.");
    }
  }, [$, b.name, b.sku, v]);
  g.useEffect(() => {
    const l = p.createInitialDraft(y, i);
    I((c) => ({ ...c, category: c.category || l.category, brand: c.brand || l.brand }));
  }, [i, y, p]);
  const C = g.useCallback(() => {
    var _a;
    R.current && (cancelAnimationFrame(R.current), R.current = null), (_a = L.current) == null ? void 0 : _a.getTracks().forEach((l) => l.stop()), L.current = null, j.current && (j.current.srcObject = null), O((l) => l === "scanning" || l === "starting" ? "idle" : l);
  }, []);
  g.useEffect(() => C, [C]);
  const Q = g.useCallback((l) => {
    const c = l.trim();
    if (!c) return;
    W(c);
    const m = p.applyScannedValue(b, c);
    h.success("Barcode captured"), q(c, m);
  }, [p, q, b]), X = g.useCallback(async () => {
    var _a, _b;
    if (!(!E.current || !j.current)) {
      try {
        if (j.current.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
          const c = (_b = (_a = await E.current.detect(j.current)) == null ? void 0 : _a[0]) == null ? void 0 : _b.rawValue;
          if (c) {
            Q(c), C();
            return;
          }
        }
      } catch (l) {
        G(l.message || "Scanner failed."), O("error"), C();
        return;
      }
      R.current = requestAnimationFrame(X);
    }
  }, [Q, C]), ge = g.useCallback(async () => {
    G(null), ne(null);
    try {
      if (O("starting"), "BarcodeDetector" in window) {
        const c = window.BarcodeDetector;
        E.current = new c({ formats: ["ean_13", "ean_8", "upc_a", "upc_e", "code_128", "code_39", "qr_code"] });
      } else E.current = null;
      const l = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
      if (L.current = l, !j.current) return;
      j.current.srcObject = l, await j.current.play(), O("scanning"), E.current && (R.current = requestAnimationFrame(X));
    } catch (l) {
      G(l.message || "Camera access failed."), O("error"), C();
    }
  }, [X, C]), fe = g.useCallback((l, c) => {
    I((m) => ({ ...m, [l]: c }));
  }, []), M = g.useMemo(() => p.generate(v, b), [b, p, v]), t = g.useMemo(() => p.serialize(M), [p, M]), N = g.useCallback(async () => {
    t && (await navigator.clipboard.writeText(t), h.success("Initial product JSON copied"));
  }, [t]), S = g.useCallback(async () => {
    if (!t || !M) return;
    const l = p.getDownloadFileName(M);
    if ("showSaveFilePicker" in window) try {
      const a = await (await window.showSaveFilePicker({ suggestedName: l, types: [{ description: "JSON Product Data", accept: { "application/json": [".json"] } }] })).createWritable();
      await a.write(t), await a.close(), h.success("Product JSON saved successfully");
      return;
    } catch (n) {
      if (n.name === "AbortError") return;
      console.warn("File System Access API failed, falling back to standard download:", n);
    }
    const c = new Blob([t], { type: "application/json" }), m = URL.createObjectURL(c), d = document.createElement("a");
    d.href = m, d.download = l, document.body.appendChild(d), d.click(), document.body.removeChild(d), URL.revokeObjectURL(m), h.success("Product JSON downloaded to default folder");
  }, [p, M, t]), Ne = g.useCallback((l) => {
    localStorage.setItem("gemini_api_key", l), U(l);
  }, []), Ce = g.useCallback(async (l, c) => {
    const m = w || "" || "";
    if (!(!m || !(c.name || c.description || c.ingredients || c.lifeSpan || c.origin))) {
      V(true);
      try {
        const n = await x.translateDraft(c, l, m);
        n && (I((a) => ({ ...a, ...n })), h.success(`Form data translated to ${l.toUpperCase()}`));
      } catch (n) {
        console.error("Translation failed:", n), h.error(`Failed to translate form data: ${n.message || n}`);
      } finally {
        V(false);
      }
    }
  }, [w, x]), me = g.useCallback(async (l, c = false) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B;
    const m = w || "" || "";
    if (!m) {
      h.error("Please configure your Gemini API Key first.");
      return;
    }
    ae(true), ne(l), c && (W(""), J(null), K(null));
    try {
      const d = (re.language || "en").split("-")[0], n = await x.analyzePackaging(l, m, c ? "" : v);
      let a = c ? p.createInitialDraft(y, i) : { ...b };
      if (n.name && (a.name = n.name), n.category && (a.category = n.category), n.description && (a.description = n.description), n.brand && (a.brand = n.brand), n.manufacturer && (a.manufacturer = n.manufacturer), ((_a = n.attributes) == null ? void 0 : _a.color) && (a.color = n.attributes.color), ((_b = n.attributes) == null ? void 0 : _b.size) && (a.size = n.attributes.size), ((_c = n.attributes) == null ? void 0 : _c.material) && (a.material = n.attributes.material), ((_d = n.attributes) == null ? void 0 : _d.weight) && (a.weight = n.attributes.weight), ((_e = n.attributes) == null ? void 0 : _e.sku) && (a.sku = n.attributes.sku), ((_g = (_f = n.attributes) == null ? void 0 : _f.dimensions) == null ? void 0 : _g.length) !== void 0 && (a.dimensionLength = String(n.attributes.dimensions.length)), ((_i = (_h = n.attributes) == null ? void 0 : _h.dimensions) == null ? void 0 : _i.width) !== void 0 && (a.dimensionWidth = String(n.attributes.dimensions.width)), ((_k = (_j = n.attributes) == null ? void 0 : _j.dimensions) == null ? void 0 : _k.height) !== void 0 && (a.dimensionHeight = String(n.attributes.dimensions.height)), ((_m = (_l = n.attributes) == null ? void 0 : _l.dimensions) == null ? void 0 : _m.unit) && (a.dimensionUnit = n.attributes.dimensions.unit), ((_n = n.durability_data) == null ? void 0 : _n.life_span) && (a.lifeSpan = n.durability_data.life_span), ((_o = n.durability_data) == null ? void 0 : _o.reliability) && (a.reliability = n.durability_data.reliability), ((_p = n.durability_data) == null ? void 0 : _p.reusability) && (a.reusability = n.durability_data.reusability), ((_q = n.durability_data) == null ? void 0 : _q.refurbishment) && (a.refurbishment = n.durability_data.refurbishment), ((_r = n.durability_data) == null ? void 0 : _r.recycled_content) && (a.recycledContent = n.durability_data.recycled_content), ((_s = n.repairability_data) == null ? void 0 : _s.ease_of_repair) && (a.easeOfRepair = n.repairability_data.ease_of_repair), ((_t = n.repairability_data) == null ? void 0 : _t.spare_parts) && (a.spareParts = n.repairability_data.spare_parts), ((_u = n.repairability_data) == null ? void 0 : _u.maintenance_manual) && (a.maintenanceManual = n.repairability_data.maintenance_manual), ((_v = n.manufacturing_data) == null ? void 0 : _v.origin) && (a.origin = n.manufacturing_data.origin), ((_w = n.manufacturing_data) == null ? void 0 : _w.material_composition) && (a.materialComposition = n.manufacturing_data.material_composition), ((_x = n.manufacturing_data) == null ? void 0 : _x.substance_of_concern) && (a.substanceOfConcern = n.manufacturing_data.substance_of_concern), ((_y = n.lifecycle_data) == null ? void 0 : _y.carbon_footprint) && (a.carbonFootprint = n.lifecycle_data.carbon_footprint), ((_z = n.lifecycle_data) == null ? void 0 : _z.environmental_footprint) && (a.environmentalFootprint = n.lifecycle_data.environmental_footprint), ((_A = n.lifecycle_data) == null ? void 0 : _A.water_usage) && (a.waterUsage = n.lifecycle_data.water_usage), n.nutritional_info && (n.nutritional_info.calories !== void 0 && (a.calories = String(n.nutritional_info.calories)), n.nutritional_info.total_fat && (a.totalFat = n.nutritional_info.total_fat), n.nutritional_info.saturated_fat && (a.saturatedFat = n.nutritional_info.saturated_fat), n.nutritional_info.carbohydrates && (a.carbohydrates = n.nutritional_info.carbohydrates), n.nutritional_info.sugars && (a.sugars = n.nutritional_info.sugars), n.nutritional_info.protein && (a.protein = n.nutritional_info.protein), n.nutritional_info.sodium && (a.sodium = n.nutritional_info.sodium), Array.isArray(n.nutritional_info.ingredients) && (a.ingredients = n.nutritional_info.ingredients.join(", ")), Array.isArray(n.nutritional_info.allergens) && (a.allergens = n.nutritional_info.allergens.join(", ")), Array.isArray(n.nutritional_info.main_ingredients) && (a.mainIngredients = n.nutritional_info.main_ingredients.join(", ")), Array.isArray(n.nutritional_info.certifications) && (a.certifications = n.nutritional_info.certifications.join(", "))), m && (a.name || a.description || a.ingredients)) try {
        const o = await x.translateDraft(a, d, m);
        o && (a = { ...a, ...o });
      } catch (o) {
        console.error("Auto-translation of analyzed image failed:", o);
      }
      ((_B = n.attributes) == null ? void 0 : _B.sku) ? (W(n.attributes.sku), await q(n.attributes.sku, a)) : I(a), h.success("Product image analyzed successfully with Gemini!");
    } catch (d) {
      h.error(`Gemini Analysis failed: ${d.message || d}`);
    } finally {
      ae(false);
    }
  }, [w, x, v, q, b, y, i]), Ie = g.useCallback(async () => {
    if (!j.current) return;
    const l = document.createElement("canvas");
    l.width = j.current.videoWidth || 1280, l.height = j.current.videoHeight || 720;
    const c = l.getContext("2d");
    if (!c) return;
    c.drawImage(j.current, 0, 0, l.width, l.height);
    const m = l.toDataURL("image/jpeg", 0.85);
    C(), await me(m);
  }, [me, C]), Se = _ === "scanning" ? "Scanning" : _ === "starting" ? "Starting" : _ === "unsupported" ? "Manual Entry" : "Camera", Ae = g.useCallback(async () => {
    if (!A) return;
    const l = b.name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") || "product", c = v || b.sku || "", m = c ? `_${c}` : "", d = `${l}${m}_uploaded.jpg`;
    try {
      const a = await (await fetch(A)).blob();
      if ("showSaveFilePicker" in window) try {
        const P = await (await window.showSaveFilePicker({ suggestedName: d, types: [{ description: "JPEG Images", accept: { "image/jpeg": [".jpg", ".jpeg"] } }] })).createWritable();
        await P.write(a), await P.close(), h.success("Uploaded photo saved successfully");
        return;
      } catch (r) {
        if (r.name === "AbortError") return;
        console.warn("File System Access API failed, falling back to standard download:", r);
      }
      const o = document.createElement("a");
      o.href = A, o.download = d, document.body.appendChild(o), o.click(), document.body.removeChild(o), h.success("Uploaded photo saved to default folder");
    } catch (n) {
      console.error("Failed to convert base64 image for download:", n);
      const a = document.createElement("a");
      a.href = A, a.download = d, document.body.appendChild(a), a.click(), document.body.removeChild(a), h.success("Uploaded photo saved");
    }
  }, [A, b.name, b.sku, v]), Pe = g.useCallback(async () => {
    const l = w || "" || "";
    if (!l) {
      h.error("Please configure your Gemini API Key first.");
      return;
    }
    if (!b.sku && !b.name && !v && !T && !z) {
      h.error("Please enter a barcode, product name, or brand hint to enrich with AI.");
      return;
    }
    B(true);
    try {
      const m = p.createInitialDraft(y, i).brand, d = T || (b.brand !== m ? b.brand : "") || (H == null ? void 0 : H.brand) || "", n = z || b.name || (H == null ? void 0 : H.name) || "", a = await x.generateProductDataFromText(n, d, b.sku || v || "", l);
      I((o) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A;
        const r = { ...o };
        return a.name && (r.name = a.name), a.category && (r.category = a.category), a.description && (r.description = a.description), a.brand && (r.brand = a.brand), a.manufacturer && (r.manufacturer = a.manufacturer), ((_a = a.attributes) == null ? void 0 : _a.color) && !o.color && (r.color = a.attributes.color), ((_b = a.attributes) == null ? void 0 : _b.size) && !o.size && (r.size = a.attributes.size), ((_c = a.attributes) == null ? void 0 : _c.material) && !o.material && (r.material = a.attributes.material), ((_d = a.attributes) == null ? void 0 : _d.weight) && !o.weight && (r.weight = a.attributes.weight), ((_e = a.attributes) == null ? void 0 : _e.sku) && !o.sku && (r.sku = a.attributes.sku), ((_g = (_f = a.attributes) == null ? void 0 : _f.dimensions) == null ? void 0 : _g.length) !== void 0 && (!o.dimensionLength || o.dimensionLength === "0") && (r.dimensionLength = String(a.attributes.dimensions.length)), ((_i = (_h = a.attributes) == null ? void 0 : _h.dimensions) == null ? void 0 : _i.width) !== void 0 && (!o.dimensionWidth || o.dimensionWidth === "0") && (r.dimensionWidth = String(a.attributes.dimensions.width)), ((_k = (_j = a.attributes) == null ? void 0 : _j.dimensions) == null ? void 0 : _k.height) !== void 0 && (!o.dimensionHeight || o.dimensionHeight === "0") && (r.dimensionHeight = String(a.attributes.dimensions.height)), ((_m = (_l = a.attributes) == null ? void 0 : _l.dimensions) == null ? void 0 : _m.unit) && !o.dimensionUnit && (r.dimensionUnit = a.attributes.dimensions.unit), ((_n = a.durability_data) == null ? void 0 : _n.life_span) && !o.lifeSpan && (r.lifeSpan = a.durability_data.life_span), ((_o = a.durability_data) == null ? void 0 : _o.reliability) && !o.reliability && (r.reliability = a.durability_data.reliability), ((_p = a.durability_data) == null ? void 0 : _p.reusability) && !o.reusability && (r.reusability = a.durability_data.reusability), ((_q = a.durability_data) == null ? void 0 : _q.refurbishment) && !o.refurbishment && (r.refurbishment = a.durability_data.refurbishment), ((_r = a.durability_data) == null ? void 0 : _r.recycled_content) && !o.recycledContent && (r.recycledContent = a.durability_data.recycled_content), ((_s = a.repairability_data) == null ? void 0 : _s.ease_of_repair) && !o.easeOfRepair && (r.easeOfRepair = a.repairability_data.ease_of_repair), ((_t = a.repairability_data) == null ? void 0 : _t.spare_parts) && !o.spareParts && (r.spareParts = a.repairability_data.spare_parts), ((_u = a.repairability_data) == null ? void 0 : _u.maintenance_manual) && !o.maintenanceManual && (r.maintenanceManual = a.repairability_data.maintenance_manual), ((_v = a.manufacturing_data) == null ? void 0 : _v.origin) && !o.origin && (r.origin = a.manufacturing_data.origin), ((_w = a.manufacturing_data) == null ? void 0 : _w.material_composition) && !o.materialComposition && (r.materialComposition = a.manufacturing_data.material_composition), ((_x = a.manufacturing_data) == null ? void 0 : _x.substance_of_concern) && !o.substanceOfConcern && (r.substanceOfConcern = a.manufacturing_data.substance_of_concern), ((_y = a.lifecycle_data) == null ? void 0 : _y.carbon_footprint) && !o.carbonFootprint && (r.carbonFootprint = a.lifecycle_data.carbon_footprint), ((_z = a.lifecycle_data) == null ? void 0 : _z.environmental_footprint) && !o.environmentalFootprint && (r.environmentalFootprint = a.lifecycle_data.environmental_footprint), ((_A = a.lifecycle_data) == null ? void 0 : _A.water_usage) && !o.waterUsage && (r.waterUsage = a.lifecycle_data.water_usage), a.nutritional_info && (a.nutritional_info.calories !== void 0 && !o.calories && (r.calories = String(a.nutritional_info.calories)), a.nutritional_info.total_fat && !o.totalFat && (r.totalFat = a.nutritional_info.total_fat), a.nutritional_info.saturated_fat && !o.saturatedFat && (r.saturatedFat = a.nutritional_info.saturated_fat), a.nutritional_info.carbohydrates && !o.carbohydrates && (r.carbohydrates = a.nutritional_info.carbohydrates), a.nutritional_info.sugars && !o.sugars && (r.sugars = a.nutritional_info.sugars), a.nutritional_info.protein && !o.protein && (r.protein = a.nutritional_info.protein), a.nutritional_info.sodium && !o.sodium && (r.sodium = a.nutritional_info.sodium), Array.isArray(a.nutritional_info.ingredients) && !o.ingredients && (r.ingredients = a.nutritional_info.ingredients.join(", ")), Array.isArray(a.nutritional_info.allergens) && !o.allergens && (r.allergens = a.nutritional_info.allergens.join(", ")), Array.isArray(a.nutritional_info.main_ingredients) && !o.mainIngredients && (r.mainIngredients = a.nutritional_info.main_ingredients.join(", ")), Array.isArray(a.nutritional_info.certifications) && !o.certifications && (r.certifications = a.nutritional_info.certifications.join(", "))), r;
      }), h.success("Product data successfully enriched with AI!");
    } catch (c) {
      h.error(`AI Enrichment failed: ${c.message || c}`);
    } finally {
      B(false);
    }
  }, [w, b, v, H, x, T, z, y, i, p]);
  return { brands: i, categories: y, copyJson: N, downloadJson: S, error: u, form: b, jsonText: t, scannerLabel: Se, scannedCode: v, setScannedCode: W, startCamera: ge, status: _, stopCamera: C, updateForm: fe, applyScannedValue: Q, videoRef: j, apiKey: w, saveApiKey: Ne, isAnalyzing: ee, isTranslating: oe, isEnriching: s, enrichWithAI: Pe, translateFormToLanguage: Ce, analyzeImage: me, captureAndAnalyze: Ie, isNativeSupported: "BarcodeDetector" in window, internetImageUrl: $, isFetchingInternetImage: le, internetProductInfo: H, downloadProductImage: ue, uploadedImageUrl: A, downloadUploadedImage: Ae, brandHint: T, setBrandHint: ce, nameHint: z, setNameHint: de };
}
function Ze({ onBack: y }) {
  const { t: i } = Ue("scanner"), [p, x] = g.useState(false), { applyScannedValue: w, brands: U, categories: ee, copyJson: ae, downloadJson: oe, error: V, form: s, jsonText: B, scannerLabel: j, scannedCode: L, setScannedCode: R, startCamera: E, status: _, stopCamera: O, updateForm: u, videoRef: G, apiKey: v, saveApiKey: W, isAnalyzing: b, isTranslating: I, translateFormToLanguage: $, analyzeImage: J, captureAndAnalyze: le, isNativeSupported: te, internetImageUrl: H, isFetchingInternetImage: K, internetProductInfo: A, downloadProductImage: ne, uploadedImageUrl: T, downloadUploadedImage: ce, isEnriching: z, enrichWithAI: de, brandHint: q, setBrandHint: ue, nameHint: C, setNameHint: Q } = We(), X = (t) => {
    t.preventDefault(), t.stopPropagation();
  }, ge = (t) => {
    t.preventDefault(), t.stopPropagation(), x(true);
  }, fe = (t) => {
    t.preventDefault(), t.stopPropagation(), x(false);
  }, M = (t) => {
    var _a;
    t.preventDefault(), t.stopPropagation(), x(false);
    const N = (_a = t.dataTransfer.files) == null ? void 0 : _a[0];
    if (N && N.type.startsWith("image/")) {
      const S = new FileReader();
      S.onloadend = () => {
        typeof S.result == "string" && J(S.result, true);
      }, S.readAsDataURL(N);
    }
  };
  return e.jsxs("div", { className: "min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100", children: [e.jsx("header", { className: "sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-gray-100 dark:border-slate-800", children: e.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3", children: [e.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [e.jsx(D, { variant: "ghost", size: "sm", onClick: y, leftIcon: e.jsx(ze, { className: "w-4 h-4" }), children: i("header.back") }), e.jsxs("div", { className: "min-w-0", children: [e.jsx("h1", { className: "text-lg sm:text-xl font-black tracking-tight truncate", children: i("header.title") }), e.jsx("p", { className: "text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest", children: j })] })] }), e.jsxs("div", { className: "flex items-center gap-2", children: [I && e.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-indigo-500 font-semibold animate-pulse mr-1", children: [e.jsx(Y, { className: "w-3.5 h-3.5 animate-spin" }), e.jsx("span", { className: "hidden sm:inline", children: "Translating..." })] }), e.jsxs("select", { value: re.language, disabled: I, onChange: async (t) => {
    const N = t.target.value;
    await re.changeLanguage(N), $(N, s);
  }, className: "px-2 py-1.5 text-xs font-bold rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50", children: [e.jsx("option", { value: "en", children: "EN" }), e.jsx("option", { value: "es", children: "ES" }), e.jsx("option", { value: "fr", children: "FR" })] }), e.jsx(D, { variant: _ === "scanning" || _ === "starting" ? "danger" : "primary", size: "sm", onClick: _ === "scanning" || _ === "starting" ? O : E, leftIcon: _ === "starting" ? e.jsx(Y, { className: "w-4 h-4 animate-spin" }) : _ === "scanning" ? e.jsx(Be, { className: "w-4 h-4" }) : e.jsx(Ee, { className: "w-4 h-4" }), children: i(_ === "scanning" || _ === "starting" ? "camera.stop_button" : "camera.scan_button") })] })] }) }), e.jsxs("main", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6", children: [e.jsx(Z, { className: "bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-100/50 dark:border-indigo-900/30", children: e.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", children: [e.jsxs("div", { className: "flex items-center gap-3", children: [e.jsx("div", { className: "p-2 bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400", children: e.jsx(be, { className: "w-5 h-5 animate-pulse" }) }), e.jsxs("div", { children: [e.jsx("h3", { className: "text-sm font-bold", children: i("api_key.title") }), e.jsx("p", { className: "text-xs text-gray-500 dark:text-slate-400", children: i("api_key.description") })] })] }), e.jsx("div", { className: "flex items-center gap-2 w-full sm:w-auto", children: e.jsx("input", { type: "password", value: v, onChange: (t) => W(t.target.value), placeholder: i("api_key.placeholder"), className: "w-full sm:w-64 px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20" }) })] }) }), e.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-5", children: [e.jsxs("section", { className: "space-y-5", children: [e.jsxs(Z, { padding: "none", className: "overflow-hidden relative", children: [e.jsxs("div", { className: "relative aspect-[4/3] bg-slate-950 flex items-center justify-center", onDragOver: X, onDragEnter: ge, onDragLeave: fe, onDrop: M, children: [p && e.jsxs("div", { className: "absolute inset-0 bg-indigo-600/35 backdrop-blur-sm z-40 flex flex-col items-center justify-center gap-3 text-white border-4 border-dashed border-indigo-400 m-2 rounded-2xl animate-pulse", children: [e.jsx(je, { className: "w-12 h-12 text-indigo-200" }), e.jsx("span", { className: "text-sm font-black tracking-widest uppercase", children: i("camera.drag_drop") })] }), e.jsx("video", { ref: G, muted: true, playsInline: true, className: "absolute inset-0 w-full h-full object-cover" }), _ !== "scanning" && _ !== "starting" && e.jsxs("div", { className: "relative z-10 flex flex-col items-center gap-3 text-slate-400", children: [e.jsx(ke, { className: "w-14 h-14" }), e.jsx("span", { className: "text-xs font-black uppercase tracking-widest", children: i("camera.idle") })] }), b && e.jsxs("div", { className: "absolute inset-0 bg-slate-950/80 z-30 flex flex-col items-center justify-center gap-3 text-white", children: [e.jsx(Y, { className: "w-10 h-10 animate-spin text-indigo-400" }), e.jsx("span", { className: "text-xs font-bold tracking-widest uppercase", children: i("camera.analyzing") })] }), e.jsx("div", { className: "absolute inset-x-8 top-1/2 h-px bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" }), e.jsx("div", { className: "absolute inset-6 border-2 border-white/60 rounded-2xl pointer-events-none" })] }), e.jsxs("div", { className: "p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between", children: [e.jsx("div", { className: "flex gap-2 w-full sm:w-auto", children: e.jsx(D, { variant: "primary", size: "sm", disabled: _ !== "scanning" || b, onClick: le, className: "flex-1 sm:flex-none", leftIcon: e.jsx(be, { className: "w-4 h-4" }), children: i("camera.snap_analyze") }) }), e.jsx("div", { className: "w-full sm:w-auto", children: e.jsxs("label", { className: "flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-gray-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-xl cursor-pointer text-xs font-bold text-gray-500 dark:text-slate-400 transition-colors w-full", children: [e.jsx(je, { className: "w-4 h-4" }), i("camera.upload_photo"), e.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (t) => {
    var _a;
    const N = (_a = t.target.files) == null ? void 0 : _a[0];
    if (N) {
      const S = new FileReader();
      S.onloadend = () => {
        typeof S.result == "string" && J(S.result, true);
      }, S.readAsDataURL(N);
    }
  } })] }) })] })] }), e.jsxs(Z, { className: "space-y-4", children: [e.jsxs("div", { children: [e.jsx("label", { className: "block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2", children: i("manual_entry.barcode_label") }), e.jsxs("div", { className: "flex gap-2", children: [e.jsx("input", { value: L, onChange: (t) => R(t.target.value), className: "flex-1 min-w-0 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono text-sm", placeholder: i("manual_entry.placeholder") }), e.jsx(D, { variant: "secondary", onClick: () => w(L), leftIcon: e.jsx(ke, { className: "w-4 h-4" }), children: i("manual_entry.apply") })] })] }), e.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [e.jsxs("div", { children: [e.jsx("label", { className: "block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-1.5", children: "Brand Hint (Optional)" }), e.jsx("input", { value: q, onChange: (t) => ue(t.target.value), className: "w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 text-xs text-gray-900 dark:text-gray-100", placeholder: "e.g. O-Med" })] }), e.jsxs("div", { children: [e.jsx("label", { className: "block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-1.5", children: "Product Name Hint (Optional)" }), e.jsx("input", { value: C, onChange: (t) => Q(t.target.value), className: "w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 text-xs text-gray-900 dark:text-gray-100", placeholder: "e.g. Olive oil" })] })] }), (L || s.name) && e.jsx("div", { className: "pt-1", children: e.jsx(D, { variant: "primary", className: "w-full justify-center bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold text-xs tracking-wider uppercase py-2.5 rounded-xl shadow-lg transition-all", disabled: z, onClick: de, leftIcon: z ? e.jsx(Y, { className: "w-4 h-4 animate-spin text-white" }) : e.jsx(be, { className: "w-4 h-4 text-white" }), children: z ? "Enriching with AI Concierge..." : "Auto-fill / Enrich with AI Concierge" }) }), K && e.jsxs("div", { className: "flex items-center gap-2 py-3 justify-center text-xs font-bold text-gray-500 dark:text-slate-400", children: [e.jsx(Y, { className: "w-4 h-4 animate-spin text-indigo-500" }), e.jsx("span", { children: i("lookup.searching") })] }), H ? e.jsxs("div", { className: "border border-gray-100 dark:border-slate-800 rounded-xl p-4 bg-gray-50/50 dark:bg-slate-900/30 space-y-3", children: [e.jsxs("div", { className: "flex items-center justify-between", children: [e.jsx("span", { className: "text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400", children: i("lookup.found") }), e.jsx(D, { variant: "secondary", size: "sm", onClick: ne, leftIcon: e.jsx(pe, { className: "w-3.5 h-3.5" }), children: i("lookup.download_image") })] }), e.jsxs("div", { className: "flex gap-3 items-center", children: [e.jsx("div", { className: "w-16 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-800 bg-white flex items-center justify-center shrink-0", children: e.jsx("img", { src: H, alt: "Internet Product Lookup", className: "max-w-full max-h-full object-contain" }) }), e.jsxs("div", { className: "min-w-0", children: [e.jsx("p", { className: "text-xs font-bold truncate text-gray-900 dark:text-white", children: (A == null ? void 0 : A.name) || i("lookup.unknown") }), e.jsxs("p", { className: "text-[10px] font-semibold text-gray-500 dark:text-slate-400", children: [i("lookup.brand_label"), ": ", (A == null ? void 0 : A.brand) || "N/A"] })] })] })] }) : e.jsxs("div", { className: "border border-dashed border-gray-200 dark:border-slate-800 rounded-xl p-4 bg-gray-50/30 dark:bg-slate-900/10 space-y-3", children: [e.jsxs("div", { className: "flex items-center justify-between gap-2", children: [e.jsx("span", { className: "text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500", children: "Product Image Source" }), s.name && e.jsxs("a", { href: `https://www.google.com/search?tbm=isch&q=${encodeURIComponent((s.brand ? s.brand + " " : "") + s.name)}`, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors", children: [e.jsx(Le, { className: "w-3 h-3" }), "Search on Google Images"] })] }), T ? e.jsxs("div", { className: "flex gap-3 items-center", children: [e.jsx("div", { className: "w-16 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-800 bg-white flex items-center justify-center shrink-0", children: e.jsx("img", { src: T, alt: "Local Upload Preview", className: "max-w-full max-h-full object-contain" }) }), e.jsxs("div", { className: "min-w-0 flex-1", children: [e.jsx("p", { className: "text-xs font-bold truncate text-gray-900 dark:text-white", children: "Using Uploaded Photo" }), e.jsx("p", { className: "text-[10px] font-semibold text-gray-500 dark:text-slate-400", children: "This image was captured/uploaded locally." })] }), e.jsx(D, { variant: "secondary", size: "sm", onClick: ce, leftIcon: e.jsx(pe, { className: "w-3 h-3" }), children: "Save" })] }) : e.jsxs("p", { className: "text-xs text-gray-400 dark:text-slate-500 italic", children: ["No image found online. ", s.name ? "Use Google Images to search for this product." : "Upload an image or scan a barcode to see a preview."] })] }), !te && e.jsx("p", { className: "text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900 rounded-xl p-3", children: i("camera.unsupported_warning") }), V && e.jsx("p", { className: "text-sm font-medium text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900 rounded-xl p-3", children: V })] })] }), e.jsxs("section", { className: "space-y-5", children: [e.jsxs(Z, { className: "space-y-4", children: [e.jsxs("div", { className: "flex items-center gap-2", children: [e.jsx(Te, { className: "w-5 h-5 text-indigo-600 dark:text-indigo-400" }), e.jsx("h2", { className: "text-base font-black", children: i("sections.initial_data") })] }), e.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [e.jsx(f, { label: i("fields.name"), value: s.name, onChange: (t) => u("name", t), required: true }), e.jsx(f, { label: i("fields.sku"), value: s.sku, onChange: (t) => u("sku", t) }), e.jsxs(ve, { label: i("fields.category"), value: s.category, onChange: (t) => u("category", t), required: true, children: [e.jsx("option", { value: "", children: i("fields.select_category") }), s.category && !ee.some((t) => (t.path || t.name) === s.category) && e.jsx("option", { value: s.category, children: s.category }), ee.map((t) => {
    const N = t.path || t.name;
    return e.jsx("option", { value: N, children: N }, t.id);
  })] }), e.jsxs(ve, { label: i("fields.brand"), value: s.brand, onChange: (t) => u("brand", t), children: [e.jsx("option", { value: "", children: i("fields.select_brand") }), s.brand && !U.some((t) => t.name === s.brand) && e.jsx("option", { value: s.brand, children: s.brand }), U.map((t) => e.jsx("option", { value: t.name, children: t.name }, t.id))] }), e.jsx(f, { label: i("fields.color"), value: s.color, onChange: (t) => u("color", t) }), e.jsx(f, { label: i("fields.size"), value: s.size, onChange: (t) => u("size", t) }), e.jsx(f, { label: i("fields.material"), value: s.material, onChange: (t) => u("material", t) }), e.jsx(f, { label: i("fields.weight"), value: s.weight, onChange: (t) => u("weight", t) }), e.jsx(f, { label: i("fields.length"), type: "number", value: s.dimensionLength, onChange: (t) => u("dimensionLength", t) }), e.jsx(f, { label: i("fields.width"), type: "number", value: s.dimensionWidth, onChange: (t) => u("dimensionWidth", t) }), e.jsx(f, { label: i("fields.height"), type: "number", value: s.dimensionHeight, onChange: (t) => u("dimensionHeight", t) }), e.jsx(f, { label: i("fields.dimension_unit"), value: s.dimensionUnit, onChange: (t) => u("dimensionUnit", t) })] }), e.jsxs("div", { children: [e.jsxs("label", { className: "block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2", children: [i("fields.description"), " *"] }), e.jsx("textarea", { value: s.description, onChange: (t) => u("description", t.target.value), rows: 3, className: "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm resize-none" })] }), e.jsxs("div", { className: "border-t border-gray-100 dark:border-slate-800 pt-4 space-y-4", children: [e.jsx("h3", { className: "text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400", children: i("sections.nutritional") }), e.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [e.jsx(f, { label: i("fields.calories"), type: "number", value: s.calories, onChange: (t) => u("calories", t) }), e.jsx(f, { label: i("fields.total_fat"), value: s.totalFat, onChange: (t) => u("totalFat", t) }), e.jsx(f, { label: i("fields.saturated_fat"), value: s.saturatedFat, onChange: (t) => u("saturatedFat", t) }), e.jsx(f, { label: i("fields.carbohydrates"), value: s.carbohydrates, onChange: (t) => u("carbohydrates", t) }), e.jsx(f, { label: i("fields.sugars"), value: s.sugars, onChange: (t) => u("sugars", t) }), e.jsx(f, { label: i("fields.protein"), value: s.protein, onChange: (t) => u("protein", t) }), e.jsx(f, { label: i("fields.sodium"), value: s.sodium, onChange: (t) => u("sodium", t) }), e.jsx(f, { label: i("fields.ingredients"), value: s.ingredients, onChange: (t) => u("ingredients", t) }), e.jsx(f, { label: i("fields.allergens"), value: s.allergens, onChange: (t) => u("allergens", t) }), e.jsx(f, { label: i("fields.main_ingredients"), value: s.mainIngredients, onChange: (t) => u("mainIngredients", t) }), e.jsx(f, { label: i("fields.certifications"), value: s.certifications, onChange: (t) => u("certifications", t) })] })] }), e.jsxs("div", { className: "border-t border-gray-100 dark:border-slate-800 pt-4 space-y-4", children: [e.jsx("h3", { className: "text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400", children: i("sections.sustainability") }), e.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [e.jsx(f, { label: i("fields.life_span"), value: s.lifeSpan, onChange: (t) => u("lifeSpan", t) }), e.jsx(f, { label: i("fields.reliability"), value: s.reliability, onChange: (t) => u("reliability", t) }), e.jsx(f, { label: i("fields.reusability"), value: s.reusability, onChange: (t) => u("reusability", t) }), e.jsx(f, { label: i("fields.refurbishment"), value: s.refurbishment, onChange: (t) => u("refurbishment", t) }), e.jsx(f, { label: i("fields.recycled_content"), value: s.recycledContent, onChange: (t) => u("recycledContent", t) }), e.jsx(f, { label: i("fields.ease_of_repair"), value: s.easeOfRepair, onChange: (t) => u("easeOfRepair", t) }), e.jsx(f, { label: i("fields.spare_parts"), value: s.spareParts, onChange: (t) => u("spareParts", t) }), e.jsx(f, { label: i("fields.maintenance_manual"), value: s.maintenanceManual, onChange: (t) => u("maintenanceManual", t) }), e.jsx(f, { label: i("fields.origin"), value: s.origin, onChange: (t) => u("origin", t) }), e.jsx(f, { label: i("fields.material_composition"), value: s.materialComposition, onChange: (t) => u("materialComposition", t) }), e.jsx(f, { label: i("fields.substance_of_concern"), value: s.substanceOfConcern, onChange: (t) => u("substanceOfConcern", t) }), e.jsx(f, { label: i("fields.carbon_footprint"), value: s.carbonFootprint, onChange: (t) => u("carbonFootprint", t) }), e.jsx(f, { label: i("fields.environmental_footprint"), value: s.environmentalFootprint, onChange: (t) => u("environmentalFootprint", t) }), e.jsx(f, { label: i("fields.water_usage"), value: s.waterUsage, onChange: (t) => u("waterUsage", t) })] })] })] }), e.jsxs(Z, { className: "space-y-4", children: [e.jsxs("div", { className: "flex items-center justify-between gap-3", children: [e.jsx("h2", { className: "text-base font-black", children: i("output.title") }), e.jsxs("div", { className: "flex gap-2", children: [e.jsx(D, { size: "sm", variant: "secondary", disabled: !B, onClick: ae, leftIcon: e.jsx($e, { className: "w-4 h-4" }), children: i("output.copy") }), e.jsx(D, { size: "sm", disabled: !B, onClick: oe, leftIcon: e.jsx(pe, { className: "w-4 h-4" }), children: i("output.download") })] })] }), e.jsx("textarea", { readOnly: true, value: B || "Complete the required fields to generate InitialProductData JSON.", rows: 16, className: "w-full rounded-xl bg-slate-950 text-slate-100 p-4 font-mono text-xs leading-relaxed resize-y outline-none" })] })] })] })] })] });
}
function f({ label: y, value: i, onChange: p, type: x = "text", required: w = false }) {
  return e.jsxs("label", { className: "block", children: [e.jsxs("span", { className: "block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2", children: [y, w ? " *" : ""] }), e.jsx("input", { type: x, value: i, onChange: (U) => p(U.target.value), className: "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm" })] });
}
function ve({ label: y, value: i, onChange: p, required: x = false, children: w }) {
  return e.jsxs("label", { className: "block", children: [e.jsxs("span", { className: "block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2", children: [y, x ? " *" : ""] }), e.jsx("select", { value: i, onChange: (U) => p(U.target.value), className: "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm", children: w })] });
}
export {
  Ze as BarcodeProductScanner
};
