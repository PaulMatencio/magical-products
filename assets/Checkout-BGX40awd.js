var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { c as wt, a2 as Pr, a3 as rr, a4 as ut, a5 as ds, R as B, a as H, r as S, b as us, l as ps, j as a, a6 as He, f as hs, m as M, h as fs, U as ms, J as xs, Q as Ir, A as Ht, a7 as gs, L as je, k as ys, v as ee, x as be, y as Ve, E as nr, i as bs, X as vt, G as zt } from "./index-CHFneo8t.js";
import { r as ws, D as Dr, f as We, S as gt, c as vs, t as ks, n as Ss, a as Es, b as Ns, d as js, e as Cs, g as _s, h as Vt, i as As, j as Rs, P as Fr, k as Os, l as Ts, m as Ps, o as Is, p as Ds, q as fn, Q as mn, B as Wt, T as Fs } from "./index-DYGeCivq.js";
import { A as Bs } from "./arrow-left-Cr31RcIO.js";
import { H as Us } from "./hash-DjLO0n6v.js";
import { C as ze } from "./circle-check-QUJXD6nf.js";
import { C as Je } from "./credit-card-eC_mexBJ.js";
import { S as Ls } from "./shopping-cart-BcW04o9P.js";
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const $s = [["circle", { cx: "8", cy: "8", r: "6", key: "3yglwk" }], ["path", { d: "M18.09 10.37A6 6 0 1 1 10.34 18", key: "t5s6rm" }], ["path", { d: "M7 6h1v4", key: "1obek4" }], ["path", { d: "m16.71 13.88.7.71-2.82 2.82", key: "1rbuyh" }]], Br = wt("coins", $s);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ms = [["path", { d: "M10 18v-7", key: "wt116b" }], ["path", { d: "M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z", key: "1m329m" }], ["path", { d: "M14 18v-7", key: "vav6t3" }], ["path", { d: "M18 18v-7", key: "aexdmj" }], ["path", { d: "M3 22h18", key: "8prr45" }], ["path", { d: "M6 18v-7", key: "1ivflk" }]], yt = wt("landmark", Ms);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const qs = [["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }], ["path", { d: "M12 18h.01", key: "mhygvu" }]], Ke = wt("smartphone", qs);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Hs = [["path", { d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1", key: "18etb6" }], ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]], Ur = wt("wallet", Hs);
function xn(t2, e) {
  return function() {
    return t2.apply(e, arguments);
  };
}
const { toString: zs } = Object.prototype, { getPrototypeOf: kt } = Object, { iterator: St, toStringTag: gn } = Symbol, Et = /* @__PURE__ */ ((t2) => (e) => {
  const r = zs.call(e);
  return t2[r] || (t2[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), fe = (t2) => (t2 = t2.toLowerCase(), (e) => Et(e) === t2), Nt = (t2) => (e) => typeof e === t2, { isArray: Ce } = Array, Oe = Nt("undefined");
function Pe(t2) {
  return t2 !== null && !Oe(t2) && t2.constructor !== null && !Oe(t2.constructor) && oe(t2.constructor.isBuffer) && t2.constructor.isBuffer(t2);
}
const yn = fe("ArrayBuffer");
function Vs(t2) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t2) : e = t2 && t2.buffer && yn(t2.buffer), e;
}
const Ws = Nt("string"), oe = Nt("function"), bn = Nt("number"), Xe = (t2) => t2 !== null && typeof t2 == "object", Js = (t2) => t2 === true || t2 === false, pt = (t2) => {
  if (Et(t2) !== "object") return false;
  const e = kt(t2);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(gn in t2) && !(St in t2);
}, Ks = (t2) => {
  if (!Xe(t2) || Pe(t2)) return false;
  try {
    return Object.keys(t2).length === 0 && Object.getPrototypeOf(t2) === Object.prototype;
  } catch {
    return false;
  }
}, Xs = fe("Date"), Gs = fe("File"), Ys = (t2) => !!(t2 && typeof t2.uri < "u"), Qs = (t2) => t2 && typeof t2.getParts < "u", Zs = fe("Blob"), ea = fe("FileList"), ta = (t2) => Xe(t2) && oe(t2.pipe);
function ra() {
  return typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof rr < "u" ? rr : {};
}
const Lr = ra(), $r = typeof Lr.FormData < "u" ? Lr.FormData : void 0, na = (t2) => {
  if (!t2) return false;
  if ($r && t2 instanceof $r) return true;
  const e = kt(t2);
  if (!e || e === Object.prototype || !oe(t2.append)) return false;
  const r = Et(t2);
  return r === "formdata" || r === "object" && oe(t2.toString) && t2.toString() === "[object FormData]";
}, sa = fe("URLSearchParams"), [aa, oa, ia, ca] = ["ReadableStream", "Request", "Response", "Headers"].map(fe), la = (t2) => t2.trim ? t2.trim() : t2.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Ge(t2, e, { allOwnKeys: r = false } = {}) {
  if (t2 === null || typeof t2 > "u") return;
  let n, s;
  if (typeof t2 != "object" && (t2 = [t2]), Ce(t2)) for (n = 0, s = t2.length; n < s; n++) e.call(null, t2[n], n, t2);
  else {
    if (Pe(t2)) return;
    const o = r ? Object.getOwnPropertyNames(t2) : Object.keys(t2), i = o.length;
    let c;
    for (n = 0; n < i; n++) c = o[n], e.call(null, t2[c], c, t2);
  }
}
function wn(t2, e) {
  if (Pe(t2)) return null;
  e = e.toLowerCase();
  const r = Object.keys(t2);
  let n = r.length, s;
  for (; n-- > 0; ) if (s = r[n], e === s.toLowerCase()) return s;
  return null;
}
const Ee = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : rr, vn = (t2) => !Oe(t2) && t2 !== Ee;
function sr(...t2) {
  const { caseless: e, skipUndefined: r } = vn(this) && this || {}, n = {}, s = (o, i) => {
    if (i === "__proto__" || i === "constructor" || i === "prototype") return;
    const c = e && typeof i == "string" && wn(n, i) || i, d = ar(n, c) ? n[c] : void 0;
    pt(d) && pt(o) ? n[c] = sr(d, o) : pt(o) ? n[c] = sr({}, o) : Ce(o) ? n[c] = o.slice() : (!r || !Oe(o)) && (n[c] = o);
  };
  for (let o = 0, i = t2.length; o < i; o++) {
    const c = t2[o];
    if (!c || Pe(c) || (Ge(c, s), typeof c != "object" || Ce(c))) continue;
    const d = Object.getOwnPropertySymbols(c);
    for (let u = 0; u < d.length; u++) {
      const p = d[u];
      va.call(c, p) && s(c[p], p);
    }
  }
  return n;
}
const da = (t2, e, r, { allOwnKeys: n } = {}) => (Ge(e, (s, o) => {
  r && oe(s) ? Object.defineProperty(t2, o, { __proto__: null, value: xn(s, r), writable: true, enumerable: true, configurable: true }) : Object.defineProperty(t2, o, { __proto__: null, value: s, writable: true, enumerable: true, configurable: true });
}, { allOwnKeys: n }), t2), ua = (t2) => (t2.charCodeAt(0) === 65279 && (t2 = t2.slice(1)), t2), pa = (t2, e, r, n) => {
  t2.prototype = Object.create(e.prototype, n), Object.defineProperty(t2.prototype, "constructor", { __proto__: null, value: t2, writable: true, enumerable: false, configurable: true }), Object.defineProperty(t2, "super", { __proto__: null, value: e.prototype }), r && Object.assign(t2.prototype, r);
}, ha = (t2, e, r, n) => {
  let s, o, i;
  const c = {};
  if (e = e || {}, t2 == null) return e;
  do {
    for (s = Object.getOwnPropertyNames(t2), o = s.length; o-- > 0; ) i = s[o], (!n || n(i, t2, e)) && !c[i] && (e[i] = t2[i], c[i] = true);
    t2 = r !== false && kt(t2);
  } while (t2 && (!r || r(t2, e)) && t2 !== Object.prototype);
  return e;
}, fa = (t2, e, r) => {
  t2 = String(t2), (r === void 0 || r > t2.length) && (r = t2.length), r -= e.length;
  const n = t2.indexOf(e, r);
  return n !== -1 && n === r;
}, ma = (t2) => {
  if (!t2) return null;
  if (Ce(t2)) return t2;
  let e = t2.length;
  if (!bn(e)) return null;
  const r = new Array(e);
  for (; e-- > 0; ) r[e] = t2[e];
  return r;
}, xa = /* @__PURE__ */ ((t2) => (e) => t2 && e instanceof t2)(typeof Uint8Array < "u" && kt(Uint8Array)), ga = (t2, e) => {
  const n = (t2 && t2[St]).call(t2);
  let s;
  for (; (s = n.next()) && !s.done; ) {
    const o = s.value;
    e.call(t2, o[0], o[1]);
  }
}, ya = (t2, e) => {
  let r;
  const n = [];
  for (; (r = t2.exec(e)) !== null; ) n.push(r);
  return n;
}, ba = fe("HTMLFormElement"), wa = (t2) => t2.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(r, n, s) {
  return n.toUpperCase() + s;
}), ar = (({ hasOwnProperty: t2 }) => (e, r) => t2.call(e, r))(Object.prototype), { propertyIsEnumerable: va } = Object.prototype, ka = fe("RegExp"), kn = (t2, e) => {
  const r = Object.getOwnPropertyDescriptors(t2), n = {};
  Ge(r, (s, o) => {
    let i;
    (i = e(s, o, t2)) !== false && (n[o] = i || s);
  }), Object.defineProperties(t2, n);
}, Sa = (t2) => {
  kn(t2, (e, r) => {
    if (oe(t2) && ["arguments", "caller", "callee"].includes(r)) return false;
    const n = t2[r];
    if (oe(n)) {
      if (e.enumerable = false, "writable" in e) {
        e.writable = false;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, Ea = (t2, e) => {
  const r = {}, n = (s) => {
    s.forEach((o) => {
      r[o] = true;
    });
  };
  return Ce(t2) ? n(t2) : n(String(t2).split(e)), r;
}, Na = () => {
}, ja = (t2, e) => t2 != null && Number.isFinite(t2 = +t2) ? t2 : e;
function Ca(t2) {
  return !!(t2 && oe(t2.append) && t2[gn] === "FormData" && t2[St]);
}
const _a = (t2) => {
  const e = /* @__PURE__ */ new WeakSet(), r = (n) => {
    if (Xe(n)) {
      if (e.has(n)) return;
      if (Pe(n)) return n;
      if (!("toJSON" in n)) {
        e.add(n);
        const s = Ce(n) ? [] : {};
        return Ge(n, (o, i) => {
          const c = r(o);
          !Oe(c) && (s[i] = c);
        }), e.delete(n), s;
      }
    }
    return n;
  };
  return r(t2);
}, Aa = fe("AsyncFunction"), Ra = (t2) => t2 && (Xe(t2) || oe(t2)) && oe(t2.then) && oe(t2.catch), Sn = ((t2, e) => t2 ? setImmediate : e ? ((r, n) => (Ee.addEventListener("message", ({ source: s, data: o }) => {
  s === Ee && o === r && n.length && n.shift()();
}, false), (s) => {
  n.push(s), Ee.postMessage(r, "*");
}))(`axios@${Math.random()}`, []) : (r) => setTimeout(r))(typeof setImmediate == "function", oe(Ee.postMessage)), Oa = typeof queueMicrotask < "u" ? queueMicrotask.bind(Ee) : typeof Pr < "u" && Pr.nextTick || Sn, Ta = (t2) => t2 != null && oe(t2[St]), l = { isArray: Ce, isArrayBuffer: yn, isBuffer: Pe, isFormData: na, isArrayBufferView: Vs, isString: Ws, isNumber: bn, isBoolean: Js, isObject: Xe, isPlainObject: pt, isEmptyObject: Ks, isReadableStream: aa, isRequest: oa, isResponse: ia, isHeaders: ca, isUndefined: Oe, isDate: Xs, isFile: Gs, isReactNativeBlob: Ys, isReactNative: Qs, isBlob: Zs, isRegExp: ka, isFunction: oe, isStream: ta, isURLSearchParams: sa, isTypedArray: xa, isFileList: ea, forEach: Ge, merge: sr, extend: da, trim: la, stripBOM: ua, inherits: pa, toFlatObject: ha, kindOf: Et, kindOfTest: fe, endsWith: fa, toArray: ma, forEachEntry: ga, matchAll: ya, isHTMLForm: ba, hasOwnProperty: ar, hasOwnProp: ar, reduceDescriptors: kn, freezeMethods: Sa, toObjectSet: Ea, toCamelCase: wa, noop: Na, toFiniteNumber: ja, findKey: wn, global: Ee, isContextDefined: vn, isSpecCompliantForm: Ca, toJSONObject: _a, isAsyncFn: Aa, isThenable: Ra, setImmediate: Sn, asap: Oa, isIterable: Ta }, Pa = l.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]), Ia = (t2) => {
  const e = {};
  let r, n, s;
  return t2 && t2.split(`
`).forEach(function(i) {
    s = i.indexOf(":"), r = i.substring(0, s).trim().toLowerCase(), n = i.substring(s + 1).trim(), !(!r || e[r] && Pa[r]) && (r === "set-cookie" ? e[r] ? e[r].push(n) : e[r] = [n] : e[r] = e[r] ? e[r] + ", " + n : n);
  }), e;
};
function Da(t2) {
  let e = 0, r = t2.length;
  for (; e < r; ) {
    const n = t2.charCodeAt(e);
    if (n !== 9 && n !== 32) break;
    e += 1;
  }
  for (; r > e; ) {
    const n = t2.charCodeAt(r - 1);
    if (n !== 9 && n !== 32) break;
    r -= 1;
  }
  return e === 0 && r === t2.length ? t2 : t2.slice(e, r);
}
const Fa = new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+", "g"), Ba = new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+", "g");
function ur(t2, e) {
  return l.isArray(t2) ? t2.map((r) => ur(r, e)) : Da(String(t2).replace(e, ""));
}
const Ua = (t2) => ur(t2, Fa), La = (t2) => ur(t2, Ba);
function En(t2) {
  const e = /* @__PURE__ */ Object.create(null);
  return l.forEach(t2.toJSON(), (r, n) => {
    e[n] = La(r);
  }), e;
}
const Mr = Symbol("internals");
function $e(t2) {
  return t2 && String(t2).trim().toLowerCase();
}
function ht(t2) {
  return t2 === false || t2 == null ? t2 : l.isArray(t2) ? t2.map(ht) : Ua(String(t2));
}
function $a(t2) {
  const e = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(t2); ) e[n[1]] = n[2];
  return e;
}
const Ma = (t2) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t2.trim());
function Jt(t2, e, r, n, s) {
  if (l.isFunction(n)) return n.call(this, e, r);
  if (s && (e = r), !!l.isString(e)) {
    if (l.isString(n)) return e.indexOf(n) !== -1;
    if (l.isRegExp(n)) return n.test(e);
  }
}
function qa(t2) {
  return t2.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, r, n) => r.toUpperCase() + n);
}
function Ha(t2, e) {
  const r = l.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(t2, n + r, { __proto__: null, value: function(s, o, i) {
      return this[n].call(this, e, s, o, i);
    }, configurable: true });
  });
}
let re = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, r, n) {
    const s = this;
    function o(c, d, u) {
      const p = $e(d);
      if (!p) return;
      const m = l.findKey(s, p);
      (!m || s[m] === void 0 || u === true || u === void 0 && s[m] !== false) && (s[m || d] = ht(c));
    }
    const i = (c, d) => l.forEach(c, (u, p) => o(u, p, d));
    if (l.isPlainObject(e) || e instanceof this.constructor) i(e, r);
    else if (l.isString(e) && (e = e.trim()) && !Ma(e)) i(Ia(e), r);
    else if (l.isObject(e) && l.isIterable(e)) {
      let c = {}, d, u;
      for (const p of e) {
        if (!l.isArray(p)) throw new TypeError("Object iterator must return a key-value pair");
        c[u = p[0]] = (d = c[u]) ? l.isArray(d) ? [...d, p[1]] : [d, p[1]] : p[1];
      }
      i(c, r);
    } else e != null && o(r, e, n);
    return this;
  }
  get(e, r) {
    if (e = $e(e), e) {
      const n = l.findKey(this, e);
      if (n) {
        const s = this[n];
        if (!r) return s;
        if (r === true) return $a(s);
        if (l.isFunction(r)) return r.call(this, s, n);
        if (l.isRegExp(r)) return r.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, r) {
    if (e = $e(e), e) {
      const n = l.findKey(this, e);
      return !!(n && this[n] !== void 0 && (!r || Jt(this, this[n], n, r)));
    }
    return false;
  }
  delete(e, r) {
    const n = this;
    let s = false;
    function o(i) {
      if (i = $e(i), i) {
        const c = l.findKey(n, i);
        c && (!r || Jt(n, n[c], c, r)) && (delete n[c], s = true);
      }
    }
    return l.isArray(e) ? e.forEach(o) : o(e), s;
  }
  clear(e) {
    const r = Object.keys(this);
    let n = r.length, s = false;
    for (; n--; ) {
      const o = r[n];
      (!e || Jt(this, this[o], o, e, true)) && (delete this[o], s = true);
    }
    return s;
  }
  normalize(e) {
    const r = this, n = {};
    return l.forEach(this, (s, o) => {
      const i = l.findKey(n, o);
      if (i) {
        r[i] = ht(s), delete r[o];
        return;
      }
      const c = e ? qa(o) : String(o).trim();
      c !== o && delete r[o], r[c] = ht(s), n[c] = true;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const r = /* @__PURE__ */ Object.create(null);
    return l.forEach(this, (n, s) => {
      n != null && n !== false && (r[s] = e && l.isArray(n) ? n.join(", ") : n);
    }), r;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, r]) => e + ": " + r).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...r) {
    const n = new this(e);
    return r.forEach((s) => n.set(s)), n;
  }
  static accessor(e) {
    const n = (this[Mr] = this[Mr] = { accessors: {} }).accessors, s = this.prototype;
    function o(i) {
      const c = $e(i);
      n[c] || (Ha(s, i), n[c] = true);
    }
    return l.isArray(e) ? e.forEach(o) : o(e), this;
  }
};
re.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
l.reduceDescriptors(re.prototype, ({ value: t2 }, e) => {
  let r = e[0].toUpperCase() + e.slice(1);
  return { get: () => t2, set(n) {
    this[r] = n;
  } };
});
l.freezeMethods(re);
const za = "[REDACTED ****]";
function Va(t2) {
  if (l.hasOwnProp(t2, "toJSON")) return true;
  let e = Object.getPrototypeOf(t2);
  for (; e && e !== Object.prototype; ) {
    if (l.hasOwnProp(e, "toJSON")) return true;
    e = Object.getPrototypeOf(e);
  }
  return false;
}
function Wa(t2, e) {
  const r = new Set(e.map((o) => String(o).toLowerCase())), n = [], s = (o) => {
    if (o === null || typeof o != "object" || l.isBuffer(o)) return o;
    if (n.indexOf(o) !== -1) return;
    o instanceof re && (o = o.toJSON()), n.push(o);
    let i;
    if (l.isArray(o)) i = [], o.forEach((c, d) => {
      const u = s(c);
      l.isUndefined(u) || (i[d] = u);
    });
    else {
      if (!l.isPlainObject(o) && Va(o)) return n.pop(), o;
      i = /* @__PURE__ */ Object.create(null);
      for (const [c, d] of Object.entries(o)) {
        const u = r.has(c.toLowerCase()) ? za : s(d);
        l.isUndefined(u) || (i[c] = u);
      }
    }
    return n.pop(), i;
  };
  return s(t2);
}
let k = class Nn extends Error {
  static from(e, r, n, s, o, i) {
    const c = new Nn(e.message, r || e.code, n, s, o);
    return c.cause = e, c.name = e.name, e.status != null && c.status == null && (c.status = e.status), i && Object.assign(c, i), c;
  }
  constructor(e, r, n, s, o) {
    super(e), Object.defineProperty(this, "message", { __proto__: null, value: e, enumerable: true, writable: true, configurable: true }), this.name = "AxiosError", this.isAxiosError = true, r && (this.code = r), n && (this.config = n), s && (this.request = s), o && (this.response = o, this.status = o.status);
  }
  toJSON() {
    const e = this.config, r = e && l.hasOwnProp(e, "redact") ? e.redact : void 0, n = l.isArray(r) && r.length > 0 ? Wa(e, r) : l.toJSONObject(e);
    return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: n, code: this.code, status: this.status };
  }
};
k.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
k.ERR_BAD_OPTION = "ERR_BAD_OPTION";
k.ECONNABORTED = "ECONNABORTED";
k.ETIMEDOUT = "ETIMEDOUT";
k.ECONNREFUSED = "ECONNREFUSED";
k.ERR_NETWORK = "ERR_NETWORK";
k.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
k.ERR_DEPRECATED = "ERR_DEPRECATED";
k.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
k.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
k.ERR_CANCELED = "ERR_CANCELED";
k.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
k.ERR_INVALID_URL = "ERR_INVALID_URL";
k.ERR_FORM_DATA_DEPTH_EXCEEDED = "ERR_FORM_DATA_DEPTH_EXCEEDED";
const Ja = null;
function or(t2) {
  return l.isPlainObject(t2) || l.isArray(t2);
}
function jn(t2) {
  return l.endsWith(t2, "[]") ? t2.slice(0, -2) : t2;
}
function Kt(t2, e, r) {
  return t2 ? t2.concat(e).map(function(s, o) {
    return s = jn(s), !r && o ? "[" + s + "]" : s;
  }).join(r ? "." : "") : e;
}
function Ka(t2) {
  return l.isArray(t2) && !t2.some(or);
}
const Xa = l.toFlatObject(l, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function jt(t2, e, r) {
  if (!l.isObject(t2)) throw new TypeError("target must be an object");
  e = e || new FormData(), r = l.toFlatObject(r, { metaTokens: true, dots: false, indexes: false }, false, function(h, w) {
    return !l.isUndefined(w[h]);
  });
  const n = r.metaTokens, s = r.visitor || m, o = r.dots, i = r.indexes, c = r.Blob || typeof Blob < "u" && Blob, d = r.maxDepth === void 0 ? 100 : r.maxDepth, u = c && l.isSpecCompliantForm(e);
  if (!l.isFunction(s)) throw new TypeError("visitor must be a function");
  function p(g) {
    if (g === null) return "";
    if (l.isDate(g)) return g.toISOString();
    if (l.isBoolean(g)) return g.toString();
    if (!u && l.isBlob(g)) throw new k("Blob is not supported. Use a Buffer instead.");
    return l.isArrayBuffer(g) || l.isTypedArray(g) ? u && typeof Blob == "function" ? new Blob([g]) : ut.from(g) : g;
  }
  function m(g, h, w) {
    let C = g;
    if (l.isReactNative(e) && l.isReactNativeBlob(g)) return e.append(Kt(w, h, o), p(g)), false;
    if (g && !w && typeof g == "object") {
      if (l.endsWith(h, "{}")) h = n ? h : h.slice(0, -2), g = JSON.stringify(g);
      else if (l.isArray(g) && Ka(g) || (l.isFileList(g) || l.endsWith(h, "[]")) && (C = l.toArray(g))) return h = jn(h), C.forEach(function(N, T) {
        !(l.isUndefined(N) || N === null) && e.append(i === true ? Kt([h], T, o) : i === null ? h : h + "[]", p(N));
      }), false;
    }
    return or(g) ? true : (e.append(Kt(w, h, o), p(g)), false);
  }
  const x = [], y = Object.assign(Xa, { defaultVisitor: m, convertValue: p, isVisitable: or });
  function v(g, h, w = 0) {
    if (!l.isUndefined(g)) {
      if (w > d) throw new k("Object is too deeply nested (" + w + " levels). Max depth: " + d, k.ERR_FORM_DATA_DEPTH_EXCEEDED);
      if (x.indexOf(g) !== -1) throw new Error("Circular reference detected in " + h.join("."));
      x.push(g), l.forEach(g, function(_, N) {
        (!(l.isUndefined(_) || _ === null) && s.call(e, _, l.isString(N) ? N.trim() : N, h, y)) === true && v(_, h ? h.concat(N) : [N], w + 1);
      }), x.pop();
    }
  }
  if (!l.isObject(t2)) throw new TypeError("data must be an object");
  return v(t2), e;
}
function qr(t2) {
  const e = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+" };
  return encodeURIComponent(t2).replace(/[!'()~]|%20/g, function(n) {
    return e[n];
  });
}
function pr(t2, e) {
  this._pairs = [], t2 && jt(t2, this, e);
}
const Cn = pr.prototype;
Cn.append = function(e, r) {
  this._pairs.push([e, r]);
};
Cn.toString = function(e) {
  const r = e ? function(n) {
    return e.call(this, n, qr);
  } : qr;
  return this._pairs.map(function(s) {
    return r(s[0]) + "=" + r(s[1]);
  }, "").join("&");
};
function Ga(t2) {
  return encodeURIComponent(t2).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function _n(t2, e, r) {
  if (!e) return t2;
  const n = r && r.encode || Ga, s = l.isFunction(r) ? { serialize: r } : r, o = s && s.serialize;
  let i;
  if (o ? i = o(e, s) : i = l.isURLSearchParams(e) ? e.toString() : new pr(e, s).toString(n), i) {
    const c = t2.indexOf("#");
    c !== -1 && (t2 = t2.slice(0, c)), t2 += (t2.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return t2;
}
class Hr {
  constructor() {
    this.handlers = [];
  }
  use(e, r, n) {
    return this.handlers.push({ fulfilled: e, rejected: r, synchronous: n ? n.synchronous : false, runWhen: n ? n.runWhen : null }), this.handlers.length - 1;
  }
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(e) {
    l.forEach(this.handlers, function(n) {
      n !== null && e(n);
    });
  }
}
const hr = { silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false, legacyInterceptorReqResOrdering: true, advertiseZstdAcceptEncoding: false }, Ya = typeof URLSearchParams < "u" ? URLSearchParams : pr, Qa = typeof FormData < "u" ? FormData : null, Za = typeof Blob < "u" ? Blob : null, eo = { isBrowser: true, classes: { URLSearchParams: Ya, FormData: Qa, Blob: Za }, protocols: ["http", "https", "file", "blob", "url", "data"] }, fr = typeof window < "u" && typeof document < "u", ir = typeof navigator == "object" && navigator || void 0, to = fr && (!ir || ["ReactNative", "NativeScript", "NS"].indexOf(ir.product) < 0), ro = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function", no = fr && window.location.href || "http://localhost", so = Object.freeze(Object.defineProperty({ __proto__: null, hasBrowserEnv: fr, hasStandardBrowserEnv: to, hasStandardBrowserWebWorkerEnv: ro, navigator: ir, origin: no }, Symbol.toStringTag, { value: "Module" })), K = { ...so, ...eo };
function ao(t2, e) {
  return jt(t2, new K.classes.URLSearchParams(), { visitor: function(r, n, s, o) {
    return K.isNode && l.isBuffer(r) ? (this.append(n, r.toString("base64")), false) : o.defaultVisitor.apply(this, arguments);
  }, ...e });
}
function oo(t2) {
  return l.matchAll(/\w+|\[(\w*)]/g, t2).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function io(t2) {
  const e = {}, r = Object.keys(t2);
  let n;
  const s = r.length;
  let o;
  for (n = 0; n < s; n++) o = r[n], e[o] = t2[o];
  return e;
}
function An(t2) {
  function e(r, n, s, o) {
    let i = r[o++];
    if (i === "__proto__") return true;
    const c = Number.isFinite(+i), d = o >= r.length;
    return i = !i && l.isArray(s) ? s.length : i, d ? (l.hasOwnProp(s, i) ? s[i] = l.isArray(s[i]) ? s[i].concat(n) : [s[i], n] : s[i] = n, !c) : ((!l.hasOwnProp(s, i) || !l.isObject(s[i])) && (s[i] = []), e(r, n, s[i], o) && l.isArray(s[i]) && (s[i] = io(s[i])), !c);
  }
  if (l.isFormData(t2) && l.isFunction(t2.entries)) {
    const r = {};
    return l.forEachEntry(t2, (n, s) => {
      e(oo(n), s, r, 0);
    }), r;
  }
  return null;
}
const Re = (t2, e) => t2 != null && l.hasOwnProp(t2, e) ? t2[e] : void 0;
function co(t2, e, r) {
  if (l.isString(t2)) try {
    return (e || JSON.parse)(t2), l.trim(t2);
  } catch (n) {
    if (n.name !== "SyntaxError") throw n;
  }
  return (r || JSON.stringify)(t2);
}
const Ye = { transitional: hr, adapter: ["xhr", "http", "fetch"], transformRequest: [function(e, r) {
  const n = r.getContentType() || "", s = n.indexOf("application/json") > -1, o = l.isObject(e);
  if (o && l.isHTMLForm(e) && (e = new FormData(e)), l.isFormData(e)) return s ? JSON.stringify(An(e)) : e;
  if (l.isArrayBuffer(e) || l.isBuffer(e) || l.isStream(e) || l.isFile(e) || l.isBlob(e) || l.isReadableStream(e)) return e;
  if (l.isArrayBufferView(e)) return e.buffer;
  if (l.isURLSearchParams(e)) return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", false), e.toString();
  let c;
  if (o) {
    const d = Re(this, "formSerializer");
    if (n.indexOf("application/x-www-form-urlencoded") > -1) return ao(e, d).toString();
    if ((c = l.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
      const u = Re(this, "env"), p = u && u.FormData;
      return jt(c ? { "files[]": e } : e, p && new p(), d);
    }
  }
  return o || s ? (r.setContentType("application/json", false), co(e)) : e;
}], transformResponse: [function(e) {
  const r = Re(this, "transitional") || Ye.transitional, n = r && r.forcedJSONParsing, s = Re(this, "responseType"), o = s === "json";
  if (l.isResponse(e) || l.isReadableStream(e)) return e;
  if (e && l.isString(e) && (n && !s || o)) {
    const c = !(r && r.silentJSONParsing) && o;
    try {
      return JSON.parse(e, Re(this, "parseReviver"));
    } catch (d) {
      if (c) throw d.name === "SyntaxError" ? k.from(d, k.ERR_BAD_RESPONSE, this, null, Re(this, "response")) : d;
    }
  }
  return e;
}], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, maxBodyLength: -1, env: { FormData: K.classes.FormData, Blob: K.classes.Blob }, validateStatus: function(e) {
  return e >= 200 && e < 300;
}, headers: { common: { Accept: "application/json, text/plain, */*", "Content-Type": void 0 } } };
l.forEach(["delete", "get", "head", "post", "put", "patch", "query"], (t2) => {
  Ye.headers[t2] = {};
});
function Xt(t2, e) {
  const r = this || Ye, n = e || r, s = re.from(n.headers);
  let o = n.data;
  return l.forEach(t2, function(c) {
    o = c.call(r, o, s.normalize(), e ? e.status : void 0);
  }), s.normalize(), o;
}
function Rn(t2) {
  return !!(t2 && t2.__CANCEL__);
}
let Qe = class extends k {
  constructor(e, r, n) {
    super(e ?? "canceled", k.ERR_CANCELED, r, n), this.name = "CanceledError", this.__CANCEL__ = true;
  }
};
function On(t2, e, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? t2(r) : e(new k("Request failed with status code " + r.status, r.status >= 400 && r.status < 500 ? k.ERR_BAD_REQUEST : k.ERR_BAD_RESPONSE, r.config, r.request, r));
}
function lo(t2) {
  const e = /^([-+\w]{1,25}):(?:\/\/)?/.exec(t2);
  return e && e[1] || "";
}
function uo(t2, e) {
  t2 = t2 || 10;
  const r = new Array(t2), n = new Array(t2);
  let s = 0, o = 0, i;
  return e = e !== void 0 ? e : 1e3, function(d) {
    const u = Date.now(), p = n[o];
    i || (i = u), r[s] = d, n[s] = u;
    let m = o, x = 0;
    for (; m !== s; ) x += r[m++], m = m % t2;
    if (s = (s + 1) % t2, s === o && (o = (o + 1) % t2), u - i < e) return;
    const y = p && u - p;
    return y ? Math.round(x * 1e3 / y) : void 0;
  };
}
function po(t2, e) {
  let r = 0, n = 1e3 / e, s, o;
  const i = (u, p = Date.now()) => {
    r = p, s = null, o && (clearTimeout(o), o = null), t2(...u);
  };
  return [(...u) => {
    const p = Date.now(), m = p - r;
    m >= n ? i(u, p) : (s = u, o || (o = setTimeout(() => {
      o = null, i(s);
    }, n - m)));
  }, () => s && i(s)];
}
const bt = (t2, e, r = 3) => {
  let n = 0;
  const s = uo(50, 250);
  return po((o) => {
    if (!o || typeof o.loaded != "number") return;
    const i = o.loaded, c = o.lengthComputable ? o.total : void 0, d = c != null ? Math.min(i, c) : i, u = Math.max(0, d - n), p = s(u);
    n = Math.max(n, d);
    const m = { loaded: d, total: c, progress: c ? d / c : void 0, bytes: u, rate: p || void 0, estimated: p && c ? (c - d) / p : void 0, event: o, lengthComputable: c != null, [e ? "download" : "upload"]: true };
    t2(m);
  }, r);
}, zr = (t2, e) => {
  const r = t2 != null;
  return [(n) => e[0]({ lengthComputable: r, total: t2, loaded: n }), e[1]];
}, Vr = (t2) => (...e) => l.asap(() => t2(...e)), ho = K.hasStandardBrowserEnv ? /* @__PURE__ */ ((t2, e) => (r) => (r = new URL(r, K.origin), t2.protocol === r.protocol && t2.host === r.host && (e || t2.port === r.port)))(new URL(K.origin), K.navigator && /(msie|trident)/i.test(K.navigator.userAgent)) : () => true, fo = K.hasStandardBrowserEnv ? { write(t2, e, r, n, s, o, i) {
  if (typeof document > "u") return;
  const c = [`${t2}=${encodeURIComponent(e)}`];
  l.isNumber(r) && c.push(`expires=${new Date(r).toUTCString()}`), l.isString(n) && c.push(`path=${n}`), l.isString(s) && c.push(`domain=${s}`), o === true && c.push("secure"), l.isString(i) && c.push(`SameSite=${i}`), document.cookie = c.join("; ");
}, read(t2) {
  if (typeof document > "u") return null;
  const e = document.cookie.split(";");
  for (let r = 0; r < e.length; r++) {
    const n = e[r].replace(/^\s+/, ""), s = n.indexOf("=");
    if (s !== -1 && n.slice(0, s) === t2) return decodeURIComponent(n.slice(s + 1));
  }
  return null;
}, remove(t2) {
  this.write(t2, "", Date.now() - 864e5, "/");
} } : { write() {
}, read() {
  return null;
}, remove() {
} };
function mo(t2) {
  return typeof t2 != "string" ? false : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t2);
}
function xo(t2, e) {
  return e ? t2.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : t2;
}
function Tn(t2, e, r) {
  let n = !mo(e);
  return t2 && (n || r === false) ? xo(t2, e) : e;
}
const Wr = (t2) => t2 instanceof re ? { ...t2 } : t2;
function _e(t2, e) {
  e = e || {};
  const r = /* @__PURE__ */ Object.create(null);
  Object.defineProperty(r, "hasOwnProperty", { __proto__: null, value: Object.prototype.hasOwnProperty, enumerable: false, writable: true, configurable: true });
  function n(u, p, m, x) {
    return l.isPlainObject(u) && l.isPlainObject(p) ? l.merge.call({ caseless: x }, u, p) : l.isPlainObject(p) ? l.merge({}, p) : l.isArray(p) ? p.slice() : p;
  }
  function s(u, p, m, x) {
    if (l.isUndefined(p)) {
      if (!l.isUndefined(u)) return n(void 0, u, m, x);
    } else return n(u, p, m, x);
  }
  function o(u, p) {
    if (!l.isUndefined(p)) return n(void 0, p);
  }
  function i(u, p) {
    if (l.isUndefined(p)) {
      if (!l.isUndefined(u)) return n(void 0, u);
    } else return n(void 0, p);
  }
  function c(u, p, m) {
    if (l.hasOwnProp(e, m)) return n(u, p);
    if (l.hasOwnProp(t2, m)) return n(void 0, u);
  }
  const d = { url: o, method: o, data: o, baseURL: i, transformRequest: i, transformResponse: i, paramsSerializer: i, timeout: i, timeoutMessage: i, withCredentials: i, withXSRFToken: i, adapter: i, responseType: i, xsrfCookieName: i, xsrfHeaderName: i, onUploadProgress: i, onDownloadProgress: i, decompress: i, maxContentLength: i, maxBodyLength: i, beforeRedirect: i, transport: i, httpAgent: i, httpsAgent: i, cancelToken: i, socketPath: i, allowedSocketPaths: i, responseEncoding: i, validateStatus: c, headers: (u, p, m) => s(Wr(u), Wr(p), m, true) };
  return l.forEach(Object.keys({ ...t2, ...e }), function(p) {
    if (p === "__proto__" || p === "constructor" || p === "prototype") return;
    const m = l.hasOwnProp(d, p) ? d[p] : s, x = l.hasOwnProp(t2, p) ? t2[p] : void 0, y = l.hasOwnProp(e, p) ? e[p] : void 0, v = m(x, y, p);
    l.isUndefined(v) && m !== c || (r[p] = v);
  }), r;
}
const go = ["content-type", "content-length"];
function yo(t2, e, r) {
  if (r !== "content-only") {
    t2.set(e);
    return;
  }
  Object.entries(e).forEach(([n, s]) => {
    go.includes(n.toLowerCase()) && t2.set(n, s);
  });
}
const bo = (t2) => encodeURIComponent(t2).replace(/%([0-9A-F]{2})/gi, (e, r) => String.fromCharCode(parseInt(r, 16)));
function Pn(t2) {
  const e = _e({}, t2), r = (x) => l.hasOwnProp(e, x) ? e[x] : void 0, n = r("data");
  let s = r("withXSRFToken");
  const o = r("xsrfHeaderName"), i = r("xsrfCookieName");
  let c = r("headers");
  const d = r("auth"), u = r("baseURL"), p = r("allowAbsoluteUrls"), m = r("url");
  if (e.headers = c = re.from(c), e.url = _n(Tn(u, m, p), r("params"), r("paramsSerializer")), d && c.set("Authorization", "Basic " + btoa((d.username || "") + ":" + (d.password ? bo(d.password) : ""))), l.isFormData(n) && (K.hasStandardBrowserEnv || K.hasStandardBrowserWebWorkerEnv || l.isReactNative(n) ? c.setContentType(void 0) : l.isFunction(n.getHeaders) && yo(c, n.getHeaders(), r("formDataHeaderPolicy"))), K.hasStandardBrowserEnv && (l.isFunction(s) && (s = s(e)), s === true || s == null && ho(e.url))) {
    const y = o && i && fo.read(i);
    y && c.set(o, y);
  }
  return e;
}
const wo = typeof XMLHttpRequest < "u", vo = wo && function(t2) {
  return new Promise(function(r, n) {
    const s = Pn(t2);
    let o = s.data;
    const i = re.from(s.headers).normalize();
    let { responseType: c, onUploadProgress: d, onDownloadProgress: u } = s, p, m, x, y, v;
    function g() {
      y && y(), v && v(), s.cancelToken && s.cancelToken.unsubscribe(p), s.signal && s.signal.removeEventListener("abort", p);
    }
    let h = new XMLHttpRequest();
    h.open(s.method.toUpperCase(), s.url, true), h.timeout = s.timeout;
    function w() {
      if (!h) return;
      const _ = re.from("getAllResponseHeaders" in h && h.getAllResponseHeaders()), T = { data: !c || c === "text" || c === "json" ? h.responseText : h.response, status: h.status, statusText: h.statusText, headers: _, config: t2, request: h };
      On(function(le) {
        r(le), g();
      }, function(le) {
        n(le), g();
      }, T), h = null;
    }
    "onloadend" in h ? h.onloadend = w : h.onreadystatechange = function() {
      !h || h.readyState !== 4 || h.status === 0 && !(h.responseURL && h.responseURL.startsWith("file:")) || setTimeout(w);
    }, h.onabort = function() {
      h && (n(new k("Request aborted", k.ECONNABORTED, t2, h)), g(), h = null);
    }, h.onerror = function(N) {
      const T = N && N.message ? N.message : "Network Error", F = new k(T, k.ERR_NETWORK, t2, h);
      F.event = N || null, n(F), g(), h = null;
    }, h.ontimeout = function() {
      let N = s.timeout ? "timeout of " + s.timeout + "ms exceeded" : "timeout exceeded";
      const T = s.transitional || hr;
      s.timeoutErrorMessage && (N = s.timeoutErrorMessage), n(new k(N, T.clarifyTimeoutError ? k.ETIMEDOUT : k.ECONNABORTED, t2, h)), g(), h = null;
    }, o === void 0 && i.setContentType(null), "setRequestHeader" in h && l.forEach(En(i), function(N, T) {
      h.setRequestHeader(T, N);
    }), l.isUndefined(s.withCredentials) || (h.withCredentials = !!s.withCredentials), c && c !== "json" && (h.responseType = s.responseType), u && ([x, v] = bt(u, true), h.addEventListener("progress", x)), d && h.upload && ([m, y] = bt(d), h.upload.addEventListener("progress", m), h.upload.addEventListener("loadend", y)), (s.cancelToken || s.signal) && (p = (_) => {
      h && (n(!_ || _.type ? new Qe(null, t2, h) : _), h.abort(), g(), h = null);
    }, s.cancelToken && s.cancelToken.subscribe(p), s.signal && (s.signal.aborted ? p() : s.signal.addEventListener("abort", p)));
    const C = lo(s.url);
    if (C && !K.protocols.includes(C)) {
      n(new k("Unsupported protocol " + C + ":", k.ERR_BAD_REQUEST, t2));
      return;
    }
    h.send(o || null);
  });
}, ko = (t2, e) => {
  if (t2 = t2 ? t2.filter(Boolean) : [], !e && !t2.length) return;
  const r = new AbortController();
  let n = false;
  const s = function(d) {
    if (!n) {
      n = true, i();
      const u = d instanceof Error ? d : this.reason;
      r.abort(u instanceof k ? u : new Qe(u instanceof Error ? u.message : u));
    }
  };
  let o = e && setTimeout(() => {
    o = null, s(new k(`timeout of ${e}ms exceeded`, k.ETIMEDOUT));
  }, e);
  const i = () => {
    t2 && (o && clearTimeout(o), o = null, t2.forEach((d) => {
      d.unsubscribe ? d.unsubscribe(s) : d.removeEventListener("abort", s);
    }), t2 = null);
  };
  t2.forEach((d) => d.addEventListener("abort", s));
  const { signal: c } = r;
  return c.unsubscribe = () => l.asap(i), c;
}, So = function* (t2, e) {
  let r = t2.byteLength;
  if (r < e) {
    yield t2;
    return;
  }
  let n = 0, s;
  for (; n < r; ) s = n + e, yield t2.slice(n, s), n = s;
}, Eo = async function* (t2, e) {
  for await (const r of No(t2)) yield* So(r, e);
}, No = async function* (t2) {
  if (t2[Symbol.asyncIterator]) {
    yield* t2;
    return;
  }
  const e = t2.getReader();
  try {
    for (; ; ) {
      const { done: r, value: n } = await e.read();
      if (r) break;
      yield n;
    }
  } finally {
    await e.cancel();
  }
}, Jr = (t2, e, r, n) => {
  const s = Eo(t2, e);
  let o = 0, i, c = (d) => {
    i || (i = true, n && n(d));
  };
  return new ReadableStream({ async pull(d) {
    try {
      const { done: u, value: p } = await s.next();
      if (u) {
        c(), d.close();
        return;
      }
      let m = p.byteLength;
      if (r) {
        let x = o += m;
        r(x);
      }
      d.enqueue(new Uint8Array(p));
    } catch (u) {
      throw c(u), u;
    }
  }, cancel(d) {
    return c(d), s.return();
  } }, { highWaterMark: 2 });
};
function jo(t2) {
  if (!t2 || typeof t2 != "string" || !t2.startsWith("data:")) return 0;
  const e = t2.indexOf(",");
  if (e < 0) return 0;
  const r = t2.slice(5, e), n = t2.slice(e + 1);
  if (/;base64/i.test(r)) {
    let i = n.length;
    const c = n.length;
    for (let y = 0; y < c; y++) if (n.charCodeAt(y) === 37 && y + 2 < c) {
      const v = n.charCodeAt(y + 1), g = n.charCodeAt(y + 2);
      (v >= 48 && v <= 57 || v >= 65 && v <= 70 || v >= 97 && v <= 102) && (g >= 48 && g <= 57 || g >= 65 && g <= 70 || g >= 97 && g <= 102) && (i -= 2, y += 2);
    }
    let d = 0, u = c - 1;
    const p = (y) => y >= 2 && n.charCodeAt(y - 2) === 37 && n.charCodeAt(y - 1) === 51 && (n.charCodeAt(y) === 68 || n.charCodeAt(y) === 100);
    u >= 0 && (n.charCodeAt(u) === 61 ? (d++, u--) : p(u) && (d++, u -= 3)), d === 1 && u >= 0 && (n.charCodeAt(u) === 61 || p(u)) && d++;
    const x = Math.floor(i / 4) * 3 - (d || 0);
    return x > 0 ? x : 0;
  }
  if (typeof ut < "u" && typeof ut.byteLength == "function") return ut.byteLength(n, "utf8");
  let o = 0;
  for (let i = 0, c = n.length; i < c; i++) {
    const d = n.charCodeAt(i);
    if (d < 128) o += 1;
    else if (d < 2048) o += 2;
    else if (d >= 55296 && d <= 56319 && i + 1 < c) {
      const u = n.charCodeAt(i + 1);
      u >= 56320 && u <= 57343 ? (o += 4, i++) : o += 3;
    } else o += 3;
  }
  return o;
}
const mr = "1.17.0", Kr = 64 * 1024, { isFunction: it } = l, Co = (t2) => encodeURIComponent(t2).replace(/%([0-9A-F]{2})/gi, (e, r) => String.fromCharCode(parseInt(r, 16))), Xr = (t2) => {
  if (!l.isString(t2)) return t2;
  try {
    return decodeURIComponent(t2);
  } catch {
    return t2;
  }
}, Gr = (t2, ...e) => {
  try {
    return !!t2(...e);
  } catch {
    return false;
  }
}, _o = (t2) => {
  const e = t2.indexOf("://");
  let r = t2;
  return e !== -1 && (r = r.slice(e + 3)), r.includes("@") || r.includes(":");
}, Ao = (t2) => {
  const e = l.global !== void 0 && l.global !== null ? l.global : globalThis, { ReadableStream: r, TextEncoder: n } = e;
  t2 = l.merge.call({ skipUndefined: true }, { Request: e.Request, Response: e.Response }, t2);
  const { fetch: s, Request: o, Response: i } = t2, c = s ? it(s) : typeof fetch == "function", d = it(o), u = it(i);
  if (!c) return false;
  const p = c && it(r), m = c && (typeof n == "function" ? /* @__PURE__ */ ((w) => (C) => w.encode(C))(new n()) : async (w) => new Uint8Array(await new o(w).arrayBuffer())), x = d && p && Gr(() => {
    let w = false;
    const C = new o(K.origin, { body: new r(), method: "POST", get duplex() {
      return w = true, "half";
    } }), _ = C.headers.has("Content-Type");
    return C.body != null && C.body.cancel(), w && !_;
  }), y = u && p && Gr(() => l.isReadableStream(new i("").body)), v = { stream: y && ((w) => w.body) };
  c && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((w) => {
    !v[w] && (v[w] = (C, _) => {
      let N = C && C[w];
      if (N) return N.call(C);
      throw new k(`Response type '${w}' is not supported`, k.ERR_NOT_SUPPORT, _);
    });
  });
  const g = async (w) => {
    if (w == null) return 0;
    if (l.isBlob(w)) return w.size;
    if (l.isSpecCompliantForm(w)) return (await new o(K.origin, { method: "POST", body: w }).arrayBuffer()).byteLength;
    if (l.isArrayBufferView(w) || l.isArrayBuffer(w)) return w.byteLength;
    if (l.isURLSearchParams(w) && (w = w + ""), l.isString(w)) return (await m(w)).byteLength;
  }, h = async (w, C) => {
    const _ = l.toFiniteNumber(w.getContentLength());
    return _ ?? g(C);
  };
  return async (w) => {
    let { url: C, method: _, data: N, signal: T, cancelToken: F, timeout: le, onDownloadProgress: xe, onUploadProgress: Ie, responseType: de, headers: ce, withCredentials: we = "same-origin", fetchOptions: De, maxContentLength: E, maxBodyLength: W } = Pn(w);
    const X = l.isNumber(E) && E > -1, ue = l.isNumber(W) && W > -1, G = (P) => l.hasOwnProp(w, P) ? w[P] : void 0;
    let ge = s || fetch;
    de = de ? (de + "").toLowerCase() : "text";
    let I = ko([T, F && F.toAbortSignal()], le), J = null;
    const q = I && I.unsubscribe && (() => {
      I.unsubscribe();
    });
    let pe;
    try {
      let P;
      const te = G("auth");
      if (te) {
        const A = te.username || "", se = te.password || "";
        P = { username: A, password: se };
      }
      if (_o(C)) {
        const A = new URL(C, K.origin);
        if (!P && (A.username || A.password)) {
          const se = Xr(A.username), he = Xr(A.password);
          P = { username: se, password: he };
        }
        (A.username || A.password) && (A.username = "", A.password = "", C = A.href);
      }
      if (P && (ce.delete("authorization"), ce.set("Authorization", "Basic " + btoa(Co((P.username || "") + ":" + (P.password || ""))))), X && typeof C == "string" && C.startsWith("data:") && jo(C) > E) throw new k("maxContentLength size of " + E + " exceeded", k.ERR_BAD_RESPONSE, w, J);
      if (ue && _ !== "get" && _ !== "head") {
        const A = await h(ce, N);
        if (typeof A == "number" && isFinite(A) && A > W) throw new k("Request body larger than maxBodyLength limit", k.ERR_BAD_REQUEST, w, J);
      }
      if (Ie && x && _ !== "get" && _ !== "head" && (pe = await h(ce, N)) !== 0) {
        let A = new o(C, { method: "POST", body: N, duplex: "half" }), se;
        if (l.isFormData(N) && (se = A.headers.get("content-type")) && ce.setContentType(se), A.body) {
          const [he, ye] = zr(pe, bt(Vr(Ie)));
          N = Jr(A.body, Kr, he, ye);
        }
      }
      l.isString(we) || (we = we ? "include" : "omit");
      const U = d && "credentials" in o.prototype;
      if (l.isFormData(N)) {
        const A = ce.getContentType();
        A && /^multipart\/form-data/i.test(A) && !/boundary=/i.test(A) && ce.delete("content-type");
      }
      ce.set("User-Agent", "axios/" + mr, false);
      const ie = { ...De, signal: I, method: _.toUpperCase(), headers: En(ce.normalize()), body: N, duplex: "half", credentials: U ? we : void 0 };
      J = d && new o(C, ie);
      let ne = await (d ? ge(J, De) : ge(C, ie));
      if (X) {
        const A = l.toFiniteNumber(ne.headers.get("content-length"));
        if (A != null && A > E) throw new k("maxContentLength size of " + E + " exceeded", k.ERR_BAD_RESPONSE, w, J);
      }
      const me = y && (de === "stream" || de === "response");
      if (y && ne.body && (xe || X || me && q)) {
        const A = {};
        ["status", "statusText", "headers"].forEach((ke) => {
          A[ke] = ne[ke];
        });
        const se = l.toFiniteNumber(ne.headers.get("content-length")), [he, ye] = xe && zr(se, bt(Vr(xe), true)) || [];
        let Ae = 0;
        const ve = (ke) => {
          if (X && (Ae = ke, Ae > E)) throw new k("maxContentLength size of " + E + " exceeded", k.ERR_BAD_RESPONSE, w, J);
          he && he(ke);
        };
        ne = new i(Jr(ne.body, Kr, ve, () => {
          ye && ye(), q && q();
        }), A);
      }
      de = de || "text";
      let Y = await v[l.findKey(v, de) || "text"](ne, w);
      if (X && !y && !me) {
        let A;
        if (Y != null && (typeof Y.byteLength == "number" ? A = Y.byteLength : typeof Y.size == "number" ? A = Y.size : typeof Y == "string" && (A = typeof n == "function" ? new n().encode(Y).byteLength : Y.length)), typeof A == "number" && A > E) throw new k("maxContentLength size of " + E + " exceeded", k.ERR_BAD_RESPONSE, w, J);
      }
      return !me && q && q(), await new Promise((A, se) => {
        On(A, se, { data: Y, headers: re.from(ne.headers), status: ne.status, statusText: ne.statusText, config: w, request: J });
      });
    } catch (P) {
      if (q && q(), I && I.aborted && I.reason instanceof k) {
        const te = I.reason;
        throw te.config = w, J && (te.request = J), P !== te && (te.cause = P), te;
      }
      throw P && P.name === "TypeError" && /Load failed|fetch/i.test(P.message) ? Object.assign(new k("Network Error", k.ERR_NETWORK, w, J, P && P.response), { cause: P.cause || P }) : k.from(P, P && P.code, w, J, P && P.response);
    }
  };
}, Ro = /* @__PURE__ */ new Map(), In = (t2) => {
  let e = t2 && t2.env || {};
  const { fetch: r, Request: n, Response: s } = e, o = [n, s, r];
  let i = o.length, c = i, d, u, p = Ro;
  for (; c--; ) d = o[c], u = p.get(d), u === void 0 && p.set(d, u = c ? /* @__PURE__ */ new Map() : Ao(e)), p = u;
  return u;
};
In();
const xr = { http: Ja, xhr: vo, fetch: { get: In } };
l.forEach(xr, (t2, e) => {
  if (t2) {
    try {
      Object.defineProperty(t2, "name", { __proto__: null, value: e });
    } catch {
    }
    Object.defineProperty(t2, "adapterName", { __proto__: null, value: e });
  }
});
const Yr = (t2) => `- ${t2}`, Oo = (t2) => l.isFunction(t2) || t2 === null || t2 === false;
function To(t2, e) {
  t2 = l.isArray(t2) ? t2 : [t2];
  const { length: r } = t2;
  let n, s;
  const o = {};
  for (let i = 0; i < r; i++) {
    n = t2[i];
    let c;
    if (s = n, !Oo(n) && (s = xr[(c = String(n)).toLowerCase()], s === void 0)) throw new k(`Unknown adapter '${c}'`);
    if (s && (l.isFunction(s) || (s = s.get(e)))) break;
    o[c || "#" + i] = s;
  }
  if (!s) {
    const i = Object.entries(o).map(([d, u]) => `adapter ${d} ` + (u === false ? "is not supported by the environment" : "is not available in the build"));
    let c = r ? i.length > 1 ? `since :
` + i.map(Yr).join(`
`) : " " + Yr(i[0]) : "as no adapter specified";
    throw new k("There is no suitable adapter to dispatch the request " + c, "ERR_NOT_SUPPORT");
  }
  return s;
}
const Dn = { getAdapter: To, adapters: xr };
function Gt(t2) {
  if (t2.cancelToken && t2.cancelToken.throwIfRequested(), t2.signal && t2.signal.aborted) throw new Qe(null, t2);
}
function Qr(t2) {
  return Gt(t2), t2.headers = re.from(t2.headers), t2.data = Xt.call(t2, t2.transformRequest), ["post", "put", "patch"].indexOf(t2.method) !== -1 && t2.headers.setContentType("application/x-www-form-urlencoded", false), Dn.getAdapter(t2.adapter || Ye.adapter, t2)(t2).then(function(n) {
    Gt(t2), t2.response = n;
    try {
      n.data = Xt.call(t2, t2.transformResponse, n);
    } finally {
      delete t2.response;
    }
    return n.headers = re.from(n.headers), n;
  }, function(n) {
    if (!Rn(n) && (Gt(t2), n && n.response)) {
      t2.response = n.response;
      try {
        n.response.data = Xt.call(t2, t2.transformResponse, n.response);
      } finally {
        delete t2.response;
      }
      n.response.headers = re.from(n.response.headers);
    }
    return Promise.reject(n);
  });
}
const Ct = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t2, e) => {
  Ct[t2] = function(n) {
    return typeof n === t2 || "a" + (e < 1 ? "n " : " ") + t2;
  };
});
const Zr = {};
Ct.transitional = function(e, r, n) {
  function s(o, i) {
    return "[Axios v" + mr + "] Transitional option '" + o + "'" + i + (n ? ". " + n : "");
  }
  return (o, i, c) => {
    if (e === false) throw new k(s(i, " has been removed" + (r ? " in " + r : "")), k.ERR_DEPRECATED);
    return r && !Zr[i] && (Zr[i] = true, console.warn(s(i, " has been deprecated since v" + r + " and will be removed in the near future"))), e ? e(o, i, c) : true;
  };
};
Ct.spelling = function(e) {
  return (r, n) => (console.warn(`${n} is likely a misspelling of ${e}`), true);
};
function Po(t2, e, r) {
  if (typeof t2 != "object") throw new k("options must be an object", k.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(t2);
  let s = n.length;
  for (; s-- > 0; ) {
    const o = n[s], i = Object.prototype.hasOwnProperty.call(e, o) ? e[o] : void 0;
    if (i) {
      const c = t2[o], d = c === void 0 || i(c, o, t2);
      if (d !== true) throw new k("option " + o + " must be " + d, k.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== true) throw new k("Unknown option " + o, k.ERR_BAD_OPTION);
  }
}
const ft = { assertOptions: Po, validators: Ct }, ae = ft.validators;
let Ne = class {
  constructor(e) {
    this.defaults = e || {}, this.interceptors = { request: new Hr(), response: new Hr() };
  }
  async request(e, r) {
    try {
      return await this._request(e, r);
    } catch (n) {
      if (n instanceof Error) {
        let s = {};
        Error.captureStackTrace ? Error.captureStackTrace(s) : s = new Error();
        const o = (() => {
          if (!s.stack) return "";
          const i = s.stack.indexOf(`
`);
          return i === -1 ? "" : s.stack.slice(i + 1);
        })();
        try {
          if (!n.stack) n.stack = o;
          else if (o) {
            const i = o.indexOf(`
`), c = i === -1 ? -1 : o.indexOf(`
`, i + 1), d = c === -1 ? "" : o.slice(c + 1);
            String(n.stack).endsWith(d) || (n.stack += `
` + o);
          }
        } catch {
        }
      }
      throw n;
    }
  }
  _request(e, r) {
    typeof e == "string" ? (r = r || {}, r.url = e) : r = e || {}, r = _e(this.defaults, r);
    const { transitional: n, paramsSerializer: s, headers: o } = r;
    n !== void 0 && ft.assertOptions(n, { silentJSONParsing: ae.transitional(ae.boolean), forcedJSONParsing: ae.transitional(ae.boolean), clarifyTimeoutError: ae.transitional(ae.boolean), legacyInterceptorReqResOrdering: ae.transitional(ae.boolean), advertiseZstdAcceptEncoding: ae.transitional(ae.boolean) }, false), s != null && (l.isFunction(s) ? r.paramsSerializer = { serialize: s } : ft.assertOptions(s, { encode: ae.function, serialize: ae.function }, true)), r.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? r.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : r.allowAbsoluteUrls = true), ft.assertOptions(r, { baseUrl: ae.spelling("baseURL"), withXsrfToken: ae.spelling("withXSRFToken") }, true), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let i = o && l.merge(o.common, o[r.method]);
    o && l.forEach(["delete", "get", "head", "post", "put", "patch", "query", "common"], (v) => {
      delete o[v];
    }), r.headers = re.concat(i, o);
    const c = [];
    let d = true;
    this.interceptors.request.forEach(function(g) {
      if (typeof g.runWhen == "function" && g.runWhen(r) === false) return;
      d = d && g.synchronous;
      const h = r.transitional || hr;
      h && h.legacyInterceptorReqResOrdering ? c.unshift(g.fulfilled, g.rejected) : c.push(g.fulfilled, g.rejected);
    });
    const u = [];
    this.interceptors.response.forEach(function(g) {
      u.push(g.fulfilled, g.rejected);
    });
    let p, m = 0, x;
    if (!d) {
      const v = [Qr.bind(this), void 0];
      for (v.unshift(...c), v.push(...u), x = v.length, p = Promise.resolve(r); m < x; ) p = p.then(v[m++], v[m++]);
      return p;
    }
    x = c.length;
    let y = r;
    for (; m < x; ) {
      const v = c[m++], g = c[m++];
      try {
        y = v(y);
      } catch (h) {
        g.call(this, h);
        break;
      }
    }
    try {
      p = Qr.call(this, y);
    } catch (v) {
      return Promise.reject(v);
    }
    for (m = 0, x = u.length; m < x; ) p = p.then(u[m++], u[m++]);
    return p;
  }
  getUri(e) {
    e = _e(this.defaults, e);
    const r = Tn(e.baseURL, e.url, e.allowAbsoluteUrls);
    return _n(r, e.params, e.paramsSerializer);
  }
};
l.forEach(["delete", "get", "head", "options"], function(e) {
  Ne.prototype[e] = function(r, n) {
    return this.request(_e(n || {}, { method: e, url: r, data: (n || {}).data }));
  };
});
l.forEach(["post", "put", "patch", "query"], function(e) {
  function r(n) {
    return function(o, i, c) {
      return this.request(_e(c || {}, { method: e, headers: n ? { "Content-Type": "multipart/form-data" } : {}, url: o, data: i }));
    };
  }
  Ne.prototype[e] = r(), e !== "query" && (Ne.prototype[e + "Form"] = r(true));
});
let Io = class Fn {
  constructor(e) {
    if (typeof e != "function") throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function(o) {
      r = o;
    });
    const n = this;
    this.promise.then((s) => {
      if (!n._listeners) return;
      let o = n._listeners.length;
      for (; o-- > 0; ) n._listeners[o](s);
      n._listeners = null;
    }), this.promise.then = (s) => {
      let o;
      const i = new Promise((c) => {
        n.subscribe(c), o = c;
      }).then(s);
      return i.cancel = function() {
        n.unsubscribe(o);
      }, i;
    }, e(function(o, i, c) {
      n.reason || (n.reason = new Qe(o, i, c), r(n.reason));
    });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : this._listeners = [e];
  }
  unsubscribe(e) {
    if (!this._listeners) return;
    const r = this._listeners.indexOf(e);
    r !== -1 && this._listeners.splice(r, 1);
  }
  toAbortSignal() {
    const e = new AbortController(), r = (n) => {
      e.abort(n);
    };
    return this.subscribe(r), e.signal.unsubscribe = () => this.unsubscribe(r), e.signal;
  }
  static source() {
    let e;
    return { token: new Fn(function(s) {
      e = s;
    }), cancel: e };
  }
};
function Do(t2) {
  return function(r) {
    return t2.apply(null, r);
  };
}
function Fo(t2) {
  return l.isObject(t2) && t2.isAxiosError === true;
}
const cr = { Continue: 100, SwitchingProtocols: 101, Processing: 102, EarlyHints: 103, Ok: 200, Created: 201, Accepted: 202, NonAuthoritativeInformation: 203, NoContent: 204, ResetContent: 205, PartialContent: 206, MultiStatus: 207, AlreadyReported: 208, ImUsed: 226, MultipleChoices: 300, MovedPermanently: 301, Found: 302, SeeOther: 303, NotModified: 304, UseProxy: 305, Unused: 306, TemporaryRedirect: 307, PermanentRedirect: 308, BadRequest: 400, Unauthorized: 401, PaymentRequired: 402, Forbidden: 403, NotFound: 404, MethodNotAllowed: 405, NotAcceptable: 406, ProxyAuthenticationRequired: 407, RequestTimeout: 408, Conflict: 409, Gone: 410, LengthRequired: 411, PreconditionFailed: 412, PayloadTooLarge: 413, UriTooLong: 414, UnsupportedMediaType: 415, RangeNotSatisfiable: 416, ExpectationFailed: 417, ImATeapot: 418, MisdirectedRequest: 421, UnprocessableEntity: 422, Locked: 423, FailedDependency: 424, TooEarly: 425, UpgradeRequired: 426, PreconditionRequired: 428, TooManyRequests: 429, RequestHeaderFieldsTooLarge: 431, UnavailableForLegalReasons: 451, InternalServerError: 500, NotImplemented: 501, BadGateway: 502, ServiceUnavailable: 503, GatewayTimeout: 504, HttpVersionNotSupported: 505, VariantAlsoNegotiates: 506, InsufficientStorage: 507, LoopDetected: 508, NotExtended: 510, NetworkAuthenticationRequired: 511, WebServerIsDown: 521, ConnectionTimedOut: 522, OriginIsUnreachable: 523, TimeoutOccurred: 524, SslHandshakeFailed: 525, InvalidSslCertificate: 526 };
Object.entries(cr).forEach(([t2, e]) => {
  cr[e] = t2;
});
function Bn(t2) {
  const e = new Ne(t2), r = xn(Ne.prototype.request, e);
  return l.extend(r, Ne.prototype, e, { allOwnKeys: true }), l.extend(r, e, null, { allOwnKeys: true }), r.create = function(s) {
    return Bn(_e(t2, s));
  }, r;
}
const L = Bn(Ye);
L.Axios = Ne;
L.CanceledError = Qe;
L.CancelToken = Io;
L.isCancel = Rn;
L.VERSION = mr;
L.toFormData = jt;
L.AxiosError = k;
L.Cancel = L.CanceledError;
L.all = function(e) {
  return Promise.all(e);
};
L.spread = Do;
L.isAxiosError = Fo;
L.mergeConfig = _e;
L.AxiosHeaders = re;
L.formToJSON = (t2) => An(l.isHTMLForm(t2) ? new FormData(t2) : t2);
L.getAdapter = Dn.getAdapter;
L.HttpStatusCode = cr;
L.default = L;
const { Axios: $i, AxiosError: Mi, CanceledError: qi, isCancel: Hi, CancelToken: zi, VERSION: Vi, all: Wi, Cancel: Ji, isAxiosError: Ki, spread: Xi, toFormData: Gi, AxiosHeaders: Yi, HttpStatusCode: Qi, formToJSON: Zi, getAdapter: ec, mergeConfig: tc, create: rc } = L;
var R = (t2) => L.isAxiosError(t2) ? t2.response ? JSON.stringify({ data: t2.response.data, headers: t2.response.headers, status: t2.response.status }) : t2.request && !(t2.request instanceof XMLHttpRequest) ? JSON.stringify(t2.request) : JSON.stringify({ code: t2.code, message: t2.message }) : JSON.stringify(t2), en = (t2) => {
  const e = t2.slice(0, Fr), r = t2.includes(".") ? We(t2.split(".")[1] || "") : t2.slice(Fr);
  return { policyId: e, assetName: r };
};
function Bo(t2) {
  const e = Os(t2), r = e.body(), n = e.getId(), s = r.outputs(), o = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c) {
      const d = new Ts(Ps(n), BigInt(i)), u = new Is(d, c), p = Ds(u);
      o.push(p);
    }
  }
  return o;
}
function Uo(t2, e, r) {
  const n = /* @__PURE__ */ new Set(), s = [];
  if (!e && !r) return [];
  if (e) for (const i of e) rn(i, n, s);
  if (r) for (const i of r) {
    const c = Bo(i);
    for (const d of c) rn(d, n, s);
  }
  return { blockfrost: s.map((i) => {
    const c = { txId: i.input.txHash, index: i.input.outputIndex }, d = Lo(i), u = { address: i.output.address, value: d };
    return [c, u];
  }), maestro: s.map((i) => {
    const d = Rs(i).output().toCbor();
    return { tx_hash: i.input.txHash, index: i.input.outputIndex, txout_cbor: d };
  }), koios: s.map((i) => ({ transaction: { id: i.input.txHash }, index: i.input.outputIndex, address: i.output.address, value: tn(i) })), ogmios: s.map((i) => ({ transaction: { id: i.input.txHash }, index: i.input.outputIndex, address: i.output.address, value: tn(i) })) }[t2];
}
var Lo = (t2) => {
  const e = {};
  return t2.output.amount.forEach(({ unit: r, quantity: n }) => {
    if (r === "lovelace") e.coins = Number(n);
    else {
      const { policyId: s, assetName: o } = fn(r);
      e[s] || (e[s] = {}), e[s][o] = Number(n);
    }
  }), e;
}, tn = (t2) => {
  const e = {};
  return t2.output.amount.forEach(({ unit: r, quantity: n }) => {
    if (r === "lovelace") e.ada = { lovelace: Number(n) };
    else {
      const { policyId: s, assetName: o } = fn(r);
      e[s] || (e[s] = {}), e[s][o] = Number(n);
    }
  }), e;
}, rn = (t2, e, r) => {
  const n = `${t2.input.txHash}:${t2.input.outputIndex}`;
  e.has(n) || (e.add(n), r.push(t2));
};
function $o(t2) {
  const e = t2.map((r) => r.output.amount).reduce((r, n) => {
    for (const s of n) s && (r[s.unit] == null && (r[s.unit] = 0), s.unit in r && (r[s.unit] += parseFloat(s.quantity)));
    return r;
  }, {});
  return Object.fromEntries(Object.entries(e).map(([r, n]) => [r, n.toString()]));
}
var ct = class j {
  constructor(e) {
    __publicField(this, "accounts", {});
    __publicField(this, "utxos", {});
    __publicField(this, "assetAddresses", {});
    __publicField(this, "assetMetadata", {});
    __publicField(this, "blocks", {});
    __publicField(this, "collections", {});
    __publicField(this, "protocolParameters", {});
    __publicField(this, "transactions", {});
    this.network = e;
  }
  paginate(e, r, n = 20) {
    const s = r != null ? parseInt(String(r), 10) : 0, o = e.slice(s, s + n), i = s + n < e.length ? s + n : void 0;
    return { paginatedItems: o, nextCursor: i };
  }
  async fetchAccountInfo(e) {
    const r = this.accounts[e];
    if (!r) throw new Error(`Account not found: ${e}`);
    return r;
  }
  async fetchAddressUTxOs(e, r) {
    const n = this.utxos[e] || [];
    return r ? n.filter((s) => s.output.amount.some((o) => o.unit === r)) : n;
  }
  fetchAddressTxs(e, r) {
    throw new Error("Method not implemented.");
  }
  async fetchAssetAddresses(e) {
    if (!j.isValidHex(e)) throw new Error("Invalid asset: must be a hex string");
    const r = /* @__PURE__ */ new Map(), n = this.assetAddresses[e] || [];
    for (const s of n) r.set(s.address, BigInt(s.quantity));
    for (const [s, o] of Object.entries(this.utxos)) for (const i of o) {
      const c = i.output.amount.find((d) => d.unit === e);
      if (c) {
        const d = r.get(s) || BigInt(0);
        r.set(s, d + BigInt(c.quantity));
      }
    }
    return Array.from(r.entries()).filter(([s, o]) => o > BigInt(0)).map(([s, o]) => ({ address: s, quantity: o.toString() }));
  }
  async fetchAddressAssets(e) {
    if (!j.isValidAddress(e)) throw new Error("Invalid address: must be a valid Bech32 or Base58 address");
    const r = /* @__PURE__ */ new Map(), n = this.utxos[e] || [];
    for (const s of n) for (const o of s.output.amount) {
      const i = r.get(o.unit) || BigInt(0);
      r.set(o.unit, i + BigInt(o.quantity));
    }
    for (const [s, o] of Object.entries(this.assetAddresses)) {
      const i = o.find((c) => c.address === e);
      if (i) {
        const c = r.get(s) || BigInt(0);
        r.set(s, c + BigInt(i.quantity));
      }
    }
    return Array.from(r.entries()).map(([s, o]) => ({ unit: s, quantity: o.toString() }));
  }
  async fetchAssetMetadata(e) {
    const r = this.assetMetadata[e];
    if (!r) throw new Error(`Asset metadata not found: ${e}`);
    return r;
  }
  async fetchBlockInfo(e) {
    const r = this.blocks[e];
    if (!r) throw new Error(`Block not found: ${e}`);
    return r;
  }
  async fetchCollectionAssets(e, r) {
    const n = this.collections[e];
    if (!n) throw new Error(`Collection not found: ${e}`);
    if (r && !j.isIntegerString(String(r))) throw new Error("Invalid cursor: must be a string of digits");
    const { paginatedItems: s, nextCursor: o } = this.paginate(n, r);
    return { assets: s, next: o };
  }
  async fetchHandle(e) {
    try {
      const r = We(e.replace("$", "")), n = `${gt[1]}000de140${r}`;
      return await this.fetchAssetMetadata(n);
    } catch (r) {
      throw R(r);
    }
  }
  async fetchHandleAddress(e) {
    var _a2;
    const r = We(e.replace("$", "")), n = gt[1], o = (_a2 = (await this.fetchAssetAddresses(`${n}${r}`))[0]) == null ? void 0 : _a2.address;
    if (!o) throw new Error(`No addresses found for handle: ${e}`);
    return o;
  }
  async fetchProtocolParameters(e) {
    if (!e) {
      const n = Math.max(...Object.keys(this.protocolParameters).map(Number));
      return this.protocolParameters[n];
    }
    const r = this.protocolParameters[e];
    if (!r) throw new Error(`Protocol parameters not found for epoch: ${e}`);
    return r;
  }
  async fetchCostModels(e) {
    throw new Error("Method not implemented.");
  }
  async fetchTxInfo(e) {
    const r = this.transactions[e];
    if (!r) throw new Error(`Transaction not found: ${e}`);
    return r;
  }
  async fetchUTxOs(e) {
    const r = Object.values(this.utxos).flat().filter((n) => n.input.txHash === e);
    if (!r.length) throw new Error(`No UTxOs found for transaction hash: ${e}`);
    return r;
  }
  async fetchGovernanceProposal(e, r) {
    throw new Error("Method not implemented");
  }
  async get(e) {
    throw new Error("Method not implemented in OfflineFetcher.");
  }
  toJSON() {
    return JSON.stringify({ accounts: this.accounts, utxos: this.utxos, assetAddresses: this.assetAddresses, assetMetadata: this.assetMetadata, blocks: this.blocks, collections: this.collections, protocolParameters: this.protocolParameters, transactions: this.transactions });
  }
  static fromJSON(e) {
    const r = JSON.parse(e), n = new j();
    return Object.entries(r.accounts || {}).forEach(([s, o]) => n.addAccount(s, o)), Object.entries(r.utxos || {}).forEach(([s, o]) => n.addUTxOs(o)), Object.entries(r.assetAddresses || {}).forEach(([s, o]) => n.addAssetAddresses(s, o)), Object.entries(r.assetMetadata || {}).forEach(([s, o]) => n.addAssetMetadata(s, o)), Object.entries(r.blocks || {}).forEach(([s, o]) => n.addBlock(o)), Object.entries(r.collections || {}).forEach(([s, o]) => n.addCollectionAssets(o)), Object.entries(r.protocolParameters || {}).forEach(([s, o]) => n.addProtocolParameters(o)), Object.entries(r.transactions || {}).forEach(([s, o]) => n.addTransaction(o)), n;
  }
  static isValidHex(e, r) {
    return r && e.length !== r ? false : /^[0-9a-fA-F]+$/.test(e);
  }
  static isValidAddress(e) {
    return j.isValidBech32Address(e) || j.isValidBase58(e);
  }
  static isValidBase58(e) {
    return !!/^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/.test(e);
  }
  static isValidBech32(e, r) {
    return e !== e.toLowerCase() && e !== e.toUpperCase() ? false : new RegExp(`^${r}1[02-9ac-hj-np-z]+$`, "i").test(e);
  }
  static isValidBech32Address(e) {
    return j.isValidBech32(e, "(addr|addr_test)");
  }
  static isValidBech32Pool(e) {
    return j.isValidBech32(e, "pool");
  }
  static isValidBech32VrfVk(e) {
    return j.isValidBech32(e, "vrf_vk");
  }
  static isIntegerString(e) {
    return /^\d+$/.test(e);
  }
  static isValidAssetOrLovelace(e) {
    return e === "lovelace" ? true : e.length < 56 ? false : j.isValidHex(e);
  }
  addAccount(e, r) {
    if (!j.isValidAddress(e)) throw new Error("Invalid address: must be a valid Bech32 or Base58 address");
    if (r.poolId && !j.isValidBech32Pool(r.poolId)) throw new Error("Invalid 'poolId': must be a valid Bech32 pool address");
    if (!j.isIntegerString(r.balance)) throw new Error("Invalid 'balance': must be a string of digits");
    if (!j.isIntegerString(r.rewards)) throw new Error("Invalid 'rewards': must be a string of digits");
    if (!j.isIntegerString(r.withdrawals)) throw new Error("Invalid 'withdrawals': must be a string of digits");
    this.accounts[e] = r;
  }
  addUTxOs(e) {
    if (!Array.isArray(e) || e.length === 0) throw new Error("Invalid utxos: must be a non-empty array");
    e.forEach((r, n) => {
      if (!Number.isInteger(r.input.outputIndex) || r.input.outputIndex < 0) throw new Error(`Invalid outputIndex for UTxO at index ${n}: must be a non-negative integer`);
      if (!j.isValidHex(r.input.txHash, 64)) throw new Error(`Invalid txHash for UTxO at index ${n}: must be a 64-character hexadecimal string`);
      if (!j.isValidAddress(r.output.address)) throw new Error(`Invalid address in output for UTxO at index ${n}: must be a valid Bech32 or Base58 address`);
      if (!Array.isArray(r.output.amount) || r.output.amount.length === 0) throw new Error(`Invalid amount for UTxO at index ${n}: must be a non-empty array of assets`);
      if (r.output.amount.forEach((s, o) => {
        if (!j.isValidAssetOrLovelace(s.unit)) throw new Error(`Invalid unit for asset at index ${o} in UTxO at index ${n}`);
        if (!j.isIntegerString(s.quantity)) throw new Error(`Invalid quantity for asset at index ${o} in UTxO at index ${n}: must be a string of digits`);
      }), r.output.dataHash && !j.isValidHex(r.output.dataHash, 64)) throw new Error(`Invalid dataHash for UTxO at index ${n}: must be a 64-character hexadecimal string or undefined`);
      if (r.output.plutusData && !j.isValidHex(r.output.plutusData)) throw new Error(`Invalid plutusData for UTxO at index ${n}: must be a hexadecimal string or undefined`);
      if (r.output.scriptRef && !j.isValidHex(r.output.scriptRef)) throw new Error(`Invalid scriptRef for UTxO at index ${n}: must be a hexadecimal string or undefined`);
      if (r.output.scriptHash && !j.isValidHex(r.output.scriptHash, 56)) throw new Error(`Invalid scriptHash for UTxO at index ${n}: must be a 56-character hexadecimal string or undefined`);
    });
    for (const r of e) this.utxos[r.output.address] || (this.utxos[r.output.address] = []), this.utxos[r.output.address].push(r);
  }
  addAssetAddresses(e, r) {
    if (!j.isValidHex(e)) throw new Error("Invalid asset: must be a hex string");
    if (r.length === 0) throw new Error("Invalid addresses: must be a non-empty array");
    r.forEach((n, s) => {
      if (!j.isValidAddress(n.address)) throw new Error(`Invalid 'address' field at index ${s}, should be bech32 string`);
      if (!j.isIntegerString(n.quantity)) throw new Error(`Invalid 'quantity' field at index ${s}, should be a string of digits`);
    }), this.assetAddresses[e] = r;
  }
  addAssetMetadata(e, r) {
    if (e.length < 56) throw new Error(`Invalid asset ${e}: must be a string longer than 56 characters`);
    if (!j.isValidHex(e)) throw new Error("Invalid asset: must be a hex string");
    if (typeof r != "object" || r === null) throw new Error("Invalid metadata object");
    this.assetMetadata[e] = r;
  }
  addCollectionAssets(e) {
    if (!Array.isArray(e) || e.length === 0) throw new Error("Invalid assets: must be a non-empty array");
    const r = {};
    e.forEach((n, s) => {
      if (n.unit.length < 56) throw new Error(`Invalid unit for asset at index ${s}: must be a string longer than 56 characters`);
      if (!j.isValidHex(n.unit)) throw new Error(`Invalid unit for asset at index ${s}: must be a hexadecimal string`);
      const o = n.unit.slice(0, 56);
      if (!j.isValidHex(o, 56)) throw new Error(`Invalid policyId in asset unit at index ${s}: must be a 56-character hexadecimal string`);
      if (!j.isIntegerString(n.quantity)) throw new Error(`Invalid quantity for asset at index ${s}: must be a string of digits`);
      r[o] || (r[o] = []), r[o].push(n);
    });
    for (const [n, s] of Object.entries(r)) this.collections[n] || (this.collections[n] = []), this.collections[n] = this.collections[n].concat(s);
  }
  addProtocolParameters(e) {
    if (e.epoch < 0 || !Number.isInteger(e.epoch)) throw new Error("Invalid epoch: must be a non-negative integer");
    if (e.minFeeA < 0 || !Number.isInteger(e.minFeeA)) throw new Error("Invalid 'minFeeA': must be a non-negative integer");
    if (e.minFeeB < 0 || !Number.isInteger(e.minFeeB)) throw new Error("Invalid 'minFeeB': must be a non-negative integer");
    if (e.maxBlockSize <= 0 || !Number.isInteger(e.maxBlockSize)) throw new Error("Invalid 'maxBlockSize': must be a positive integer");
    if (e.maxTxSize <= 0 || !Number.isInteger(e.maxTxSize)) throw new Error("Invalid 'maxTxSize': must be a positive integer");
    if (e.maxBlockHeaderSize <= 0 || !Number.isInteger(e.maxBlockHeaderSize)) throw new Error("Invalid 'maxBlockHeaderSize': must be a positive integer");
    if (e.keyDeposit < 0 || !Number.isInteger(e.keyDeposit)) throw new Error("Invalid 'keyDeposit': must be a non-negative integer");
    if (e.poolDeposit < 0 || !Number.isInteger(e.poolDeposit)) throw new Error("Invalid 'poolDeposit': must be a non-negative integer");
    if (e.decentralisation < 0 || e.decentralisation > 1) throw new Error("Invalid 'decentralisation': must be between 0 and 1");
    if (e.priceMem < 0) throw new Error("Invalid 'priceMem': must be non-negative");
    if (e.priceStep < 0) throw new Error("Invalid 'priceStep': must be non-negative");
    if (e.maxValSize < 0 || !Number.isInteger(e.maxValSize)) throw new Error("Invalid 'maxValSize': must be a non-negative integer");
    if (e.collateralPercent < 0) throw new Error("Invalid 'collateralPercent': must be a non-negative integer");
    if (e.maxCollateralInputs < 0 || !Number.isInteger(e.maxCollateralInputs)) throw new Error("Invalid 'maxCollateralInputs': must be a non-negative integer");
    if (e.coinsPerUtxoSize < 0) throw new Error("Invalid 'coinsPerUtxoSize': must be non-negative");
    if (e.minFeeRefScriptCostPerByte < 0) throw new Error("Invalid 'minFeeRefScriptCostPerByte': must be non-negative");
    if (!j.isIntegerString(e.minPoolCost)) throw new Error("Invalid 'minPoolCost': must be a string of digits");
    if (!j.isIntegerString(e.maxTxExMem)) throw new Error("Invalid 'maxTxExMem': must be a string of digits");
    if (!j.isIntegerString(e.maxTxExSteps)) throw new Error("Invalid 'maxTxExSteps': must be a string of digits");
    if (!j.isIntegerString(e.maxBlockExMem)) throw new Error("Invalid 'maxBlockExMem': must be a string of digits");
    if (!j.isIntegerString(e.maxBlockExSteps)) throw new Error("Invalid 'maxBlockExSteps': must be a string of digits");
    this.protocolParameters[e.epoch] = e;
  }
  addTransaction(e) {
    if (!j.isValidHex(e.hash, 64)) throw new Error("Invalid transaction hash: must be a 64-character hexadecimal string");
    if (!Number.isInteger(e.index) || e.index < 0) throw new Error("Invalid 'index': must be a non-negative integer");
    if (!j.isValidHex(e.block, 64)) throw new Error("Invalid 'block': must be a 64-character hexadecimal string");
    if (!j.isIntegerString(e.slot)) throw new Error("Invalid 'slot': must be a string of digits");
    if (!j.isIntegerString(e.fees)) throw new Error("Invalid 'fees': must be a string of digits");
    if (!Number.isInteger(e.size) || e.size <= 0) throw new Error("Invalid 'size': must be a positive integer");
    if (!/^-?\d+$/.test(e.deposit)) throw new Error("Invalid 'deposit': must be a string representing an integer (positive or negative)");
    if (e.invalidBefore !== "" && !j.isIntegerString(e.invalidBefore)) throw new Error("Invalid 'invalidBefore': must be a string of digits or empty string");
    if (e.invalidAfter !== "" && !j.isIntegerString(e.invalidAfter)) throw new Error("Invalid 'invalidAfter': must be a string of digits or empty string");
    this.transactions[e.hash] = e, this.addUTxOs(e.outputs);
  }
  addBlock(e) {
    if (!j.isValidHex(e.hash, 64)) throw new Error("Invalid block hash: must be a 64-character hexadecimal string");
    if (!Number.isInteger(e.time) || e.time < 0) throw new Error("Invalid 'time': must be a non-negative integer");
    if (!j.isIntegerString(e.slot)) throw new Error("Invalid 'slot': must be a string of digits");
    if (!Number.isInteger(e.epoch) || e.epoch < 0) throw new Error("Invalid 'epoch': must be a non-negative integer");
    if (!j.isIntegerString(e.epochSlot)) throw new Error("Invalid 'epochSlot': must be a string of digits");
    if (!j.isValidBech32Pool(e.slotLeader)) throw new Error("Invalid 'slotLeader': must be a bech32 string with pool prefix");
    if (!Number.isInteger(e.size) || e.size <= 0) throw new Error("Invalid 'size': must be a positive integer");
    if (!Number.isInteger(e.txCount) || e.txCount < 0) throw new Error("Invalid 'txCount': must be a non-negative integer");
    if (!j.isIntegerString(e.output)) throw new Error("Invalid 'output': must be a string of digits");
    if (!j.isValidHex(e.operationalCertificate, 64)) throw new Error("Invalid 'operationalCertificate': must be a 64-character hexadecimal string");
    if (!j.isValidHex(e.previousBlock, 64)) throw new Error("Invalid 'previousBlock': must be a 64-character hexadecimal string");
    if (!j.isValidBech32VrfVk(e.VRFKey)) throw new Error("Invalid 'VRFKey': must be a bech32 string with vrf_vk1 prefix");
    this.blocks[e.hash] = e;
  }
  addSerializedTransaction(e) {
    const r = Ns.fromCbor(js(e)), n = Date.now(), s = Cs(this.network ?? "mainnet", n), o = _s(this.network ?? "mainnet", n), i = this.slotToEpochSlot(BigInt(s)), c = Vt.randomBytes(32).toString("hex"), d = Vt.randomBytes(32).toString("hex"), u = Vt.randomBytes(32).toString("hex"), p = r.body().fee().toString(), m = r.body().outputs().reduce((N, T) => {
      const F = T.amount().coin();
      return N + F;
    }, 0n), x = r.body().ttl(), y = r.body().validityStartInterval(), v = r.body().hash(), g = { confirmations: 40, nextBlock: "undefined its a random block", hash: c, time: n, slot: s, epoch: o, epochSlot: i.toString(), fees: p, slotLeader: "pool1qv3x5x5x5x5x5x5x5x5x5x5x5x5x5x5", size: e.length / 2, txCount: 1, output: m.toString(), operationalCertificate: u, previousBlock: d, VRFKey: "vrf_vk1qv3x5x5x5x5x5x5x5x5x5x5x5x5x5" }, w = r.body().inputs().values().map((N) => {
      const T = N.transactionId(), F = Number(N.index()), le = Object.values(this.utxos).flat().find((xe) => xe.input.txHash === T && xe.input.outputIndex === F);
      if (!le) throw new Error(`UTxO not found for transaction hash and output index: ${T} ${F}`);
      return le;
    });
    for (const N of Object.values(this.utxos)) for (const T of w) {
      const F = N.indexOf(T);
      F !== -1 && N.splice(F, 1);
    }
    const C = r.body().outputs().map((N, T) => this.mapOutputToUTxO(N, v, T)), _ = { inputs: w, hash: v, index: 0, block: c, slot: s.toString(), fees: p, size: e.length / 2, deposit: "0", invalidBefore: y ? y.toString() : "", invalidAfter: x ? x.toString() : "", outputs: C };
    this.addBlock(g), this.addTransaction(_);
  }
  slotToEpochSlot(e) {
    const r = As[this.network ?? "mainnet"], n = BigInt(r.epochLength);
    return e % n;
  }
  mapOutputToUTxO(e, r, n) {
    var _a2, _b, _c, _d, _e2;
    return { input: { txHash: r, outputIndex: n }, output: { address: e.address().toBech32(), amount: this.mapValueToAsset(e.amount()), dataHash: (_a2 = e.datum()) == null ? void 0 : _a2.asDataHash(), plutusData: (_c = (_b = e.datum()) == null ? void 0 : _b.asInlineData()) == null ? void 0 : _c.toCbor(), scriptRef: (_d = e.scriptRef()) == null ? void 0 : _d.toCbor(), scriptHash: (_e2 = e.scriptRef()) == null ? void 0 : _e2.hash() } };
  }
  mapValueToAsset(e) {
    const r = [], n = e.multiasset();
    if (n) for (const [s, o] of n) {
      const i = { unit: s, quantity: o.toString() };
      r.push(i);
    }
    else {
      const s = e.coin().toString();
      r.push({ unit: "lovelace", quantity: s });
    }
    return r;
  }
}, Mo = class {
  constructor(...t2) {
    __publicField(this, "_axiosInstance");
    __publicField(this, "_network");
    __publicField(this, "submitTxToBytes", true);
    __publicField(this, "_offlineFetcher");
    __publicField(this, "_enableCaching", false);
    __publicField(this, "resolveScriptRef", async (t2) => {
      if (t2) {
        const { data: e, status: r } = await this._axiosInstance.get(`scripts/${t2}`);
        if (r === 200 || r == 202) {
          let n;
          if (e.type.startsWith("plutus")) {
            const s = await this.fetchPlutusScriptCBOR(t2), o = Ss(s, "DoubleCBOR");
            n = { version: e.type.replace("plutus", ""), code: o };
          } else n = await this.fetchNativeScriptJSON(t2);
          return Es(n).toCbor().toString();
        }
        throw R(e);
      }
    });
    __publicField(this, "toUTxO", async (t2, e) => ({ input: { outputIndex: t2.output_index, txHash: e }, output: { address: t2.address, amount: t2.amount, dataHash: t2.data_hash ?? void 0, plutusData: t2.inline_datum ?? void 0, scriptRef: t2.reference_script_hash ? await this.resolveScriptRef(t2.reference_script_hash) : void 0, scriptHash: t2.reference_script_hash } }));
    let e;
    if (typeof t2[0] == "string" && (t2[0].startsWith("http") || t2[0].startsWith("/"))) this._axiosInstance = L.create({ baseURL: t2[0] }), this._network = "mainnet", e = t2[1];
    else {
      const r = t2[0], n = r.slice(0, 7);
      this._axiosInstance = L.create({ baseURL: `https://cardano-${n}.blockfrost.io/api/v${t2[1] ?? 0}`, headers: { project_id: r } }), this._network = n, e = t2[2];
    }
    (e == null ? void 0 : e.enableCaching) && (this._enableCaching = true, this._offlineFetcher = e.offlineFetcher || new ct(this._network));
  }
  async evaluateTx(t2, e, r) {
    const n = Uo("blockfrost", e, r), s = { cbor: t2, additionalUtxoSet: n };
    try {
      const o = { "Content-Type": "application/json" }, { status: i, data: c } = await this._axiosInstance.post("utils/txs/evaluate/utxos", s, { headers: o });
      if (i === 200 && c.result.EvaluationResult) {
        const d = { spend: "SPEND", mint: "MINT", certificate: "CERT", withdrawal: "REWARD" }, u = [];
        return Object.keys(c.result.EvaluationResult).forEach((p) => {
          const [m, x] = p.split(":"), { memory: y, steps: v } = c.result.EvaluationResult[p];
          u.push({ tag: d[m], index: Number(x), budget: { mem: y, steps: v } });
        }), u;
      }
      throw R(c);
    } catch (o) {
      throw R(o);
    }
  }
  async fetchAccountInfo(t2) {
    const e = t2.startsWith("addr") ? ws(t2) : t2;
    try {
      const { data: r, status: n } = await this._axiosInstance.get(`accounts/${e}`);
      if (n === 200 || n == 202) return { poolId: r.pool_id, active: r.active || r.active_epoch !== null, balance: r.controlled_amount, rewards: r.withdrawable_amount, withdrawals: r.withdrawals_sum };
      throw R(r);
    } catch (r) {
      throw R(r);
    }
  }
  async fetchAddressAssets(t2) {
    const e = await this.fetchAddressUTxOs(t2);
    return $o(e);
  }
  async fetchAddressTxs(t2, e = Dr) {
    const r = [];
    try {
      const n = { ...Dr, ...e };
      for (let s = 1; s <= n.maxPage; s++) {
        let { data: o, status: i } = await this._axiosInstance.get(`/addresses/${t2}/transactions?page=${s}&order=${n.order}`);
        if (i !== 200) throw R(o);
        if (o.length === 0) break;
        for (const c of o) {
          const u = { ...await this.fetchTxInfo(c.tx_hash), blockHeight: c.block_height, blockTime: c.block_time };
          r.push(u);
        }
      }
      return r;
    } catch (n) {
      throw R(n);
    }
  }
  async fetchAddressTransactions(t2) {
    return await this.fetchAddressTxs(t2);
  }
  async fetchAddressUTxOs(t2, e) {
    if (this._enableCaching && this._offlineFetcher) try {
      const o = await this._offlineFetcher.fetchAddressUTxOs(t2, e);
      if (o.length > 0) return o;
    } catch {
    }
    const r = e !== void 0 ? `/${e}` : "", n = `addresses/${t2}/utxos` + r, s = async (o = 1, i = []) => {
      const { data: c, status: d } = await this._axiosInstance.get(`${n}?page=${o}`);
      if (d === 200 || d == 202) return c.length > 0 ? s(o + 1, [...i, ...await Promise.all(c.map((u) => this.toUTxO(u, u.tx_hash)))]) : i;
      throw R(c);
    };
    try {
      const o = await s();
      if (this._enableCaching && this._offlineFetcher && o.length > 0) try {
        this._offlineFetcher.addUTxOs(o);
      } catch (i) {
        console.warn("Failed to cache UTXOs:", i);
      }
      return o;
    } catch {
      return [];
    }
  }
  async fetchAssetAddresses(t2) {
    const e = async (r = 1, n = []) => {
      const { policyId: s, assetName: o } = en(t2), { data: i, status: c } = await this._axiosInstance.get(`assets/${s}${o}/addresses?page=${r}`);
      if (c === 200 || c == 202) return i.length > 0 ? e(r + 1, [...n, ...i]) : n;
      throw R(i);
    };
    try {
      return await e();
    } catch {
      return [];
    }
  }
  async fetchAssetMetadata(t2) {
    try {
      const { policyId: e, assetName: r } = en(t2), { data: n, status: s } = await this._axiosInstance.get(`assets/${e}${r}`);
      if (s === 200 || s == 202) return { ...n.onchain_metadata, fingerprint: n.fingerprint, totalSupply: n.quantity, mintingTxHash: n.initial_mint_tx_hash, mintCount: n.mint_or_burn_count };
      throw R(n);
    } catch (e) {
      throw R(e);
    }
  }
  async fetchLatestBlock() {
    try {
      const { data: t2, status: e } = await this._axiosInstance.get("blocks/latest");
      if (e === 200 || e == 202) return { confirmations: t2.confirmations, epoch: t2.epoch, epochSlot: t2.epoch_slot.toString(), fees: t2.fees, hash: t2.hash, nextBlock: t2.next_block ?? "", operationalCertificate: t2.op_cert, output: t2.output ?? "0", previousBlock: t2.previous_block, size: t2.size, slot: t2.slot.toString(), slotLeader: t2.slot_leader ?? "", time: t2.time, txCount: t2.tx_count, VRFKey: t2.block_vrf };
      throw R(t2);
    } catch (t2) {
      throw R(t2);
    }
  }
  async fetchBlockInfo(t2) {
    try {
      const { data: e, status: r } = await this._axiosInstance.get(`blocks/${t2}`);
      if (r === 200 || r == 202) return { confirmations: e.confirmations, epoch: e.epoch, epochSlot: e.epoch_slot.toString(), fees: e.fees, hash: e.hash, nextBlock: e.next_block ?? "", operationalCertificate: e.op_cert, output: e.output ?? "0", previousBlock: e.previous_block, size: e.size, slot: e.slot.toString(), slotLeader: e.slot_leader ?? "", time: e.time, txCount: e.tx_count, VRFKey: e.block_vrf };
      throw R(e);
    } catch (e) {
      throw R(e);
    }
  }
  async fetchCollectionAssets(t2, e = 1) {
    try {
      const { data: r, status: n } = await this._axiosInstance.get(`assets/policy/${t2}?page=${e}`);
      if (n === 200 || n == 202) return { assets: r.map((s) => ({ unit: s.asset, quantity: s.quantity })), next: r.length === 100 ? e + 1 : null };
      throw R(r);
    } catch {
      return { assets: [], next: null };
    }
  }
  async fetchHandle(t2) {
    if (this._network !== "mainnet") throw new Error("Does not support fetching addresses by handle on non-mainnet networks.");
    try {
      const e = We(`${t2.replace("$", "")}`);
      return await this.fetchAssetMetadata(`${gt[1]}000de140${e}`);
    } catch (e) {
      throw R(e);
    }
  }
  async fetchHandleAddress(t2) {
    if (this._network !== "mainnet") throw new Error("Does not support fetching addresses by handle on non-mainnet networks.");
    try {
      const e = We(t2.replace("$", "")), { data: r, status: n } = await this._axiosInstance.get(`assets/${gt[1]}${e}/addresses`);
      if (n === 200 || n == 202) return r[0].address;
      throw R(r);
    } catch (e) {
      throw R(e);
    }
  }
  async fetchCostModels(t2) {
    if (t2) try {
      const { data: e, status: r } = await this._axiosInstance.get(`/epochs/${t2}/parameters`);
      if (r === 200) return [e.cost_models_raw.PlutusV1, e.cost_models_raw.PlutusV2, e.cost_models_raw.PlutusV3];
    } catch (e) {
      throw R(e);
    }
    else {
      const { data: e, status: r } = await this._axiosInstance.get("/epochs/latest/parameters");
      if (r === 200) return [e.cost_models_raw.PlutusV1, e.cost_models_raw.PlutusV2, e.cost_models_raw.PlutusV3];
    }
    throw new Error("Cost models are not available from Blockfrost API.");
  }
  async fetchProtocolParameters(t2 = Number.NaN) {
    try {
      const { data: e, status: r } = await this._axiosInstance.get(`epochs/${isNaN(t2) ? "latest" : t2}/parameters`);
      if (r === 200 || r == 202) return vs({ coinsPerUtxoSize: e.coins_per_utxo_word, collateralPercent: e.collateral_percent, decentralisation: e.decentralisation_param, epoch: e.epoch, keyDeposit: e.key_deposit, maxBlockExMem: e.max_block_ex_mem, maxBlockExSteps: e.max_block_ex_steps, maxBlockHeaderSize: e.max_block_header_size, maxBlockSize: e.max_block_size, maxCollateralInputs: e.max_collateral_inputs, maxTxExMem: e.max_tx_ex_mem, maxTxExSteps: e.max_tx_ex_steps, maxTxSize: e.max_tx_size, maxValSize: e.max_val_size, minFeeA: e.min_fee_a, minFeeB: e.min_fee_b, minPoolCost: e.min_pool_cost, poolDeposit: e.pool_deposit, priceMem: e.price_mem, priceStep: e.price_step });
      throw R(e);
    } catch (e) {
      throw R(e);
    }
  }
  async fetchTxInfo(t2) {
    try {
      const { data: e, status: r } = await this._axiosInstance.get(`txs/${t2}`);
      if (r === 200 || r == 202) {
        const { data: n, status: s } = await this._axiosInstance.get(`/txs/${e.hash}/utxos`);
        if (s !== 200) throw R(n);
        return { block: e.block, deposit: e.deposit, fees: e.fees, hash: e.hash, index: e.index, invalidAfter: e.invalid_hereafter ?? "", invalidBefore: e.invalid_before ?? "", slot: e.slot.toString(), size: e.size, inputs: n.inputs, outputs: n.outputs };
      }
      throw R(e);
    } catch (e) {
      throw R(e);
    }
  }
  async fetchUTxOs(t2, e) {
    try {
      const { data: r, status: n } = await this._axiosInstance.get(`txs/${t2}/utxos`);
      if (n === 200 || n == 202) {
        const s = r.outputs, o = [];
        s.forEach((c) => {
          o.push(this.toUTxO(c, t2));
        });
        const i = await Promise.all(o);
        return e !== void 0 ? i.filter((c) => c.input.outputIndex === e) : i;
      }
      throw R(r);
    } catch (r) {
      throw R(r);
    }
  }
  async fetchGovernanceProposal(t2, e) {
    try {
      const { data: r, status: n } = await this._axiosInstance.get(`governance/proposals/${t2}/${e}`);
      if (n === 200 || n == 202) return { txHash: r.tx_hash, certIndex: r.cert_index, governanceType: r.governance_type, deposit: r.deposit, returnAddress: r.return_address, governanceDescription: r.governance_description, ratifiedEpoch: r.ratified_epoch, enactedEpoch: r.enacted_epoch, droppedEpoch: r.dropped_epoch, expiredEpoch: r.expired_epoch, expiration: r.expiration, metadata: (await this._axiosInstance.get(`governance/proposals/${t2}/${e}/metadata`)).data };
      throw R(r);
    } catch (r) {
      throw R(r);
    }
  }
  async get(t2) {
    try {
      const { data: e, status: r } = await this._axiosInstance.get(t2);
      if (r === 200 || r == 202) return e;
      throw R(e);
    } catch (e) {
      throw R(e);
    }
  }
  async post(t2, e, r = { "Content-Type": "application/json" }) {
    try {
      const { data: n, status: s } = await this._axiosInstance.post(t2, e, { headers: r });
      if (s === 200 || s == 202) return n;
      throw R(n);
    } catch (n) {
      throw R(n);
    }
  }
  onTxConfirmed(t2, e, r = 100) {
    let n = 0;
    const s = setInterval(() => {
      n >= r && clearInterval(s), this.fetchTxInfo(t2).then((o) => {
        this.fetchBlockInfo(o.block).then((i) => {
          (i == null ? void 0 : i.confirmations) > 0 && (clearInterval(s), e());
        }).catch(() => {
          n += 1;
        });
      }).catch(() => {
        n += 1;
      });
    }, 5e3);
  }
  setSubmitTxToBytes(t2) {
    this.submitTxToBytes = t2;
  }
  async submitTx(t2) {
    try {
      const e = { "Content-Type": "application/cbor" }, { data: r, status: n } = await this._axiosInstance.post("tx/submit", this.submitTxToBytes ? ks(t2) : t2, { headers: e });
      if (n === 200 || n == 202) {
        if (this._enableCaching && this._offlineFetcher) try {
          this._offlineFetcher.addSerializedTransaction(t2);
        } catch (s) {
          console.warn("Failed to cache submitted transaction:", s);
        }
        return r;
      }
      throw R(r);
    } catch (e) {
      throw R(e);
    }
  }
  async fetchPlutusScriptCBOR(t2) {
    const { data: e, status: r } = await this._axiosInstance.get(`scripts/${t2}/cbor`);
    if (r === 200 || r == 202) return e.cbor;
    throw R(e);
  }
  async fetchNativeScriptJSON(t2) {
    const { data: e, status: r } = await this._axiosInstance.get(`scripts/${t2}/json`);
    if (r === 200 || r == 202) return e.json;
    throw R(e);
  }
  setCaching(t2, e) {
    this._enableCaching = t2, t2 ? this._offlineFetcher = e || new ct(this._network) : this._offlineFetcher = void 0;
  }
  getOfflineFetcher() {
    return this._offlineFetcher;
  }
  isCachingEnabled() {
    return this._enableCaching;
  }
  exportCache() {
    return this._offlineFetcher ? this._offlineFetcher.toJSON() : null;
  }
  importCache(t2, e = true) {
    if (e && !this._enableCaching && this.setCaching(true), this._offlineFetcher) {
      const r = ct.fromJSON(t2);
      this._offlineFetcher = r;
    }
  }
  clearCache() {
    this._offlineFetcher && (this._offlineFetcher = new ct(this._network));
  }
};
function mt(t2) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? mt = function(e) {
    return typeof e;
  } : mt = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, mt(t2);
}
var Un = "dahlia", qo = function(e) {
  return e === 3 ? "v3" : e;
}, Ln = "https://js.stripe.com", Ho = "".concat(Ln, "/").concat(Un, "/stripe.js"), zo = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/, Vo = /^https:\/\/js\.stripe\.com\/(v3|[a-z]+)\/stripe\.js(\?.*)?$/;
var Wo = function(e) {
  return zo.test(e) || Vo.test(e);
}, Jo = function() {
  for (var e = document.querySelectorAll('script[src^="'.concat(Ln, '"]')), r = 0; r < e.length; r++) {
    var n = e[r];
    if (Wo(n.src)) return n;
  }
  return null;
}, nn = function(e) {
  var r = "", n = document.createElement("script");
  n.src = "".concat(Ho).concat(r);
  var s = document.head || document.body;
  if (!s) throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");
  return s.appendChild(n), n;
}, Ko = function(e, r) {
  !e || !e._registerWrapper || e._registerWrapper({ name: "stripe-js", version: "9.7.0", startTime: r });
}, Me = null, lt = null, dt = null, Xo = function(e) {
  return function(r) {
    e(new Error("Failed to load Stripe.js", { cause: r }));
  };
}, Go = function(e, r) {
  return function() {
    window.Stripe ? e(window.Stripe) : r(new Error("Stripe.js not available"));
  };
}, Yo = function(e) {
  return Me !== null ? Me : (Me = new Promise(function(r, n) {
    if (typeof window > "u" || typeof document > "u") {
      r(null);
      return;
    }
    if (window.Stripe) {
      r(window.Stripe);
      return;
    }
    try {
      var s = Jo();
      if (!(s && e)) {
        if (!s) s = nn(e);
        else if (s && dt !== null && lt !== null) {
          var o;
          s.removeEventListener("load", dt), s.removeEventListener("error", lt), (o = s.parentNode) === null || o === void 0 || o.removeChild(s), s = nn(e);
        }
      }
      dt = Go(r, n), lt = Xo(n), s.addEventListener("load", dt), s.addEventListener("error", lt);
    } catch (i) {
      n(i);
      return;
    }
  }), Me.catch(function(r) {
    return Me = null, Promise.reject(r);
  }));
}, Qo = function(e, r, n) {
  if (e === null) return null;
  var s = r[0];
  if (typeof s != "string") throw new Error("Expected publishable key to be of type string, got type ".concat(mt(s), " instead."));
  var o = s.match(/^pk_test/), i = qo(e.version), c = Un;
  o && i !== c && console.warn("Stripe.js@".concat(i, " was loaded on the page, but @stripe/stripe-js@").concat("9.7.0", " expected Stripe.js@").concat(c, ". This may result in unexpected behavior. For more information, see https://docs.stripe.com/sdks/stripejs-versioning"));
  var d = e.apply(void 0, r);
  return Ko(d, n), d;
}, qe, $n = false, Mn = function() {
  return qe || (qe = Yo(null).catch(function(e) {
    return qe = null, Promise.reject(e);
  }), qe);
};
Promise.resolve().then(function() {
  return Mn();
}).catch(function(t2) {
  $n || console.warn(t2);
});
var Zo = function() {
  for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
  $n = true;
  var s = Date.now();
  return Mn().then(function(o) {
    return Qo(o, r, s);
  });
}, Yt = { exports: {} }, Qt, sn;
function ei() {
  if (sn) return Qt;
  sn = 1;
  var t2 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Qt = t2, Qt;
}
var Zt, an;
function ti() {
  if (an) return Zt;
  an = 1;
  var t2 = ei();
  function e() {
  }
  function r() {
  }
  return r.resetWarningCache = e, Zt = function() {
    function n(i, c, d, u, p, m) {
      if (m !== t2) {
        var x = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
        throw x.name = "Invariant Violation", x;
      }
    }
    n.isRequired = n;
    function s() {
      return n;
    }
    var o = { array: n, bigint: n, bool: n, func: n, number: n, object: n, string: n, symbol: n, any: n, arrayOf: s, element: n, elementType: n, instanceOf: s, node: n, objectOf: s, oneOf: s, oneOfType: s, shape: s, exact: s, checkPropTypes: r, resetWarningCache: e };
    return o.PropTypes = o, o;
  }, Zt;
}
var on;
function ri() {
  return on || (on = 1, Yt.exports = ti()()), Yt.exports;
}
var ni = ri();
const $ = ds(ni);
function cn(t2, e) {
  var r = Object.keys(t2);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t2);
    e && (n = n.filter(function(s) {
      return Object.getOwnPropertyDescriptor(t2, s).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ln(t2) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? cn(Object(r), true).forEach(function(n) {
      qn(t2, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(r)) : cn(Object(r)).forEach(function(n) {
      Object.defineProperty(t2, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t2;
}
function xt(t2) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? xt = function(e) {
    return typeof e;
  } : xt = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, xt(t2);
}
function qn(t2, e, r) {
  return e in t2 ? Object.defineProperty(t2, e, { value: r, enumerable: true, configurable: true, writable: true }) : t2[e] = r, t2;
}
function si(t2, e) {
  if (t2 == null) return {};
  var r = {}, n = Object.keys(t2), s, o;
  for (o = 0; o < n.length; o++) s = n[o], !(e.indexOf(s) >= 0) && (r[s] = t2[s]);
  return r;
}
function ai(t2, e) {
  if (t2 == null) return {};
  var r = si(t2, e), n, s;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t2);
    for (s = 0; s < o.length; s++) n = o[s], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t2, n) && (r[n] = t2[n]);
  }
  return r;
}
function Hn(t2, e) {
  return oi(t2) || ii(t2, e) || ci(t2, e) || li();
}
function oi(t2) {
  if (Array.isArray(t2)) return t2;
}
function ii(t2, e) {
  var r = t2 && (typeof Symbol < "u" && t2[Symbol.iterator] || t2["@@iterator"]);
  if (r != null) {
    var n = [], s = true, o = false, i, c;
    try {
      for (r = r.call(t2); !(s = (i = r.next()).done) && (n.push(i.value), !(e && n.length === e)); s = true) ;
    } catch (d) {
      o = true, c = d;
    } finally {
      try {
        !s && r.return != null && r.return();
      } finally {
        if (o) throw c;
      }
    }
    return n;
  }
}
function ci(t2, e) {
  if (t2) {
    if (typeof t2 == "string") return dn(t2, e);
    var r = Object.prototype.toString.call(t2).slice(8, -1);
    if (r === "Object" && t2.constructor && (r = t2.constructor.name), r === "Map" || r === "Set") return Array.from(t2);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return dn(t2, e);
  }
}
function dn(t2, e) {
  (e == null || e > t2.length) && (e = t2.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t2[r];
  return n;
}
function li() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Z = function(e, r, n) {
  var s = !!n, o = B.useRef(n);
  B.useEffect(function() {
    o.current = n;
  }, [n]), B.useEffect(function() {
    if (!s || !e) return function() {
    };
    var i = function() {
      if (o.current) return o.current.apply(o, arguments);
    };
    return e.on(r, i), function() {
      e.off(r, i);
    };
  }, [s, r, e, o]);
}, lr = function(e) {
  var r = B.useRef(e);
  return B.useEffect(function() {
    r.current = e;
  }, [e]), r.current;
}, Te = function(e) {
  return e !== null && xt(e) === "object";
}, di = function(e) {
  return Te(e) && typeof e.then == "function";
}, ui = function(e) {
  return Te(e) && typeof e.elements == "function" && typeof e.createToken == "function" && typeof e.createPaymentMethod == "function" && typeof e.confirmCardPayment == "function";
}, un = "[object Object]", pi = function t(e, r) {
  if (!Te(e) || !Te(r)) return e === r;
  var n = Array.isArray(e), s = Array.isArray(r);
  if (n !== s) return false;
  var o = Object.prototype.toString.call(e) === un, i = Object.prototype.toString.call(r) === un;
  if (o !== i) return false;
  if (!o && !n) return e === r;
  var c = Object.keys(e), d = Object.keys(r);
  if (c.length !== d.length) return false;
  for (var u = {}, p = 0; p < c.length; p += 1) u[c[p]] = true;
  for (var m = 0; m < d.length; m += 1) u[d[m]] = true;
  var x = Object.keys(u);
  if (x.length !== c.length) return false;
  var y = e, v = r, g = function(w) {
    return t(y[w], v[w]);
  };
  return x.every(g);
}, zn = function(e, r, n) {
  return Te(e) ? Object.keys(e).reduce(function(s, o) {
    var i = !Te(r) || !pi(e[o], r[o]);
    return n.includes(o) ? (i && console.warn("Unsupported prop change: options.".concat(o, " is not a mutable property.")), s) : i ? ln(ln({}, s || {}), {}, qn({}, o, e[o])) : s;
  }, null) : null;
}, Vn = "Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.", pn = function(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vn;
  if (e === null || ui(e)) return e;
  throw new Error(r);
}, hi = function(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Vn;
  if (di(e)) return { tag: "async", stripePromise: Promise.resolve(e).then(function(s) {
    return pn(s, r);
  }) };
  var n = pn(e, r);
  return n === null ? { tag: "empty" } : { tag: "sync", stripe: n };
}, fi = function(e) {
  !e || !e._registerWrapper || !e.registerAppInfo || (e._registerWrapper({ name: "react-stripe-js", version: "6.5.0" }), e.registerAppInfo({ name: "react-stripe-js", version: "6.5.0", url: "https://stripe.com/docs/stripe-js/react" }));
}, _t = B.createContext(null);
_t.displayName = "ElementsContext";
var Wn = function(e, r) {
  if (!e) throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(r, " in an <Elements> provider."));
  return e;
}, Jn = function(e) {
  var r = e.stripe, n = e.options, s = e.children, o = B.useMemo(function() {
    return hi(r);
  }, [r]), i = B.useState(function() {
    return { stripe: o.tag === "sync" ? o.stripe : null, elements: o.tag === "sync" ? o.stripe.elements(n) : null };
  }), c = Hn(i, 2), d = c[0], u = c[1];
  B.useEffect(function() {
    var x = true, y = function(g) {
      u(function(h) {
        return h.stripe ? h : { stripe: g, elements: g.elements(n) };
      });
    };
    return o.tag === "async" && !d.stripe ? o.stripePromise.then(function(v) {
      v && x && y(v);
    }) : o.tag === "sync" && !d.stripe && y(o.stripe), function() {
      x = false;
    };
  }, [o, d, n]);
  var p = lr(r);
  B.useEffect(function() {
    p !== null && p !== r && console.warn("Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.");
  }, [p, r]);
  var m = lr(n);
  return B.useEffect(function() {
    if (d.elements) {
      var x = zn(n, m, ["clientSecret", "fonts"]);
      x && d.elements.update(x);
    }
  }, [n, m, d.elements]), B.useEffect(function() {
    fi(d.stripe);
  }, [d.stripe]), B.createElement(_t.Provider, { value: d }, s);
};
Jn.propTypes = { stripe: $.any, options: $.object };
var mi = function(e) {
  var r = B.useContext(_t);
  return Wn(r, e);
}, xi = function() {
  var e = mi("calls useElements()"), r = e.elements;
  return r;
};
$.func.isRequired;
var Kn = B.createContext(null);
Kn.displayName = "CheckoutContext";
var dr = function(e) {
  var r = B.useContext(Kn), n = B.useContext(_t);
  if (r) {
    if (n) throw new Error("You cannot wrap the part of your app that ".concat(e, " in both a checkout provider and <Elements> provider."));
    return r;
  } else return Wn(n, e);
}, gi = ["mode"], yi = function(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}, z = function(e, r, n) {
  var s = "".concat(yi(e), "Element"), o = function(u) {
    var p = u.id, m = u.className, x = u.options, y = x === void 0 ? {} : x, v = u.onBlur, g = u.onFocus, h = u.onReady, w = u.onChange, C = u.onEscape, _ = u.onClick, N = u.onLoadError, T = u.onLoaderStart, F = u.onNetworksChange, le = u.onConfirm, xe = u.onCancel, Ie = u.onShippingAddressChange, de = u.onShippingRateChange, ce = u.onSavedPaymentMethodRemove, we = u.onSavedPaymentMethodUpdate, De = u.onAvailablePaymentMethodsChange, E = dr("mounts <".concat(s, ">")), W = "elements" in E ? E.elements : null, X = "checkoutState" in E ? E.checkoutState : null, ue = (X == null ? void 0 : X.type) === "success" || (X == null ? void 0 : X.type) === "loading" ? X.sdk : null, G = B.useState(null), ge = Hn(G, 2), I = ge[0], J = ge[1], q = B.useRef(null), pe = B.useRef(null);
    Z(I, "blur", v), Z(I, "focus", g), Z(I, "escape", C), Z(I, "click", _), Z(I, "loaderror", N), Z(I, "loaderstart", T), Z(I, "networkschange", F), Z(I, "confirm", le), Z(I, "cancel", xe), Z(I, "shippingaddresschange", Ie), Z(I, "shippingratechange", de), Z(I, "savedpaymentmethodremove", ce), Z(I, "savedpaymentmethodupdate", we), Z(I, "availablepaymentmethodschange", De), Z(I, "change", w);
    var P;
    h && (e === "expressCheckout" ? P = h : P = function() {
      h(I);
    }), Z(I, "ready", P), B.useLayoutEffect(function() {
      if (q.current === null && pe.current !== null && (W || ue)) {
        var U = null;
        if (ue) {
          var ie = ue, ne = ue;
          switch (e) {
            case "paymentForm":
              U = ne.createForm(y);
              break;
            case "payment":
              U = ie.createPaymentElement(y);
              break;
            case "address":
              if ("mode" in y) {
                var me = y.mode, Y = ai(y, gi);
                if (me === "shipping") U = ie.createShippingAddressElement(Y);
                else if (me === "billing") U = ie.createBillingAddressElement(Y);
                else throw new Error("Invalid options.mode. mode must be 'billing' or 'shipping'.");
              } else throw new Error("You must supply options.mode. mode must be 'billing' or 'shipping'.");
              break;
            case "expressCheckout":
              U = ie.createExpressCheckoutElement(y);
              break;
            case "currencySelector":
              U = ue.createCurrencySelectorElement();
              break;
            case "taxId":
              U = ie.createTaxIdElement(y);
              break;
            case "contactDetails":
              U = ie.createContactDetailsElement();
              break;
            default:
              throw new Error("<".concat(s, "> is not supported inside a checkout provider. Use an <Elements> provider instead."));
          }
        } else W && (U = W.create(e, y));
        q.current = U, J(U), U && U.mount(pe.current);
      }
    }, [W, ue, y]);
    var te = lr(y);
    return B.useEffect(function() {
      if (q.current) {
        var U = zn(y, te, ["paymentRequest"]);
        U && "update" in q.current && q.current.update(U);
      }
    }, [y, te]), B.useLayoutEffect(function() {
      return function() {
        if (q.current && typeof q.current.destroy == "function") try {
          q.current.destroy(), q.current = null;
        } catch {
        }
      };
    }, []), B.createElement("div", { id: p, className: m, ref: pe });
  }, i = function(u) {
    dr("mounts <".concat(s, ">"));
    var p = u.id, m = u.className;
    return B.createElement("div", { id: p, className: m });
  }, c = r ? i : o;
  return c.propTypes = { id: $.string, className: $.string, onChange: $.func, onBlur: $.func, onFocus: $.func, onReady: $.func, onEscape: $.func, onClick: $.func, onLoadError: $.func, onLoaderStart: $.func, onNetworksChange: $.func, onConfirm: $.func, onCancel: $.func, onShippingAddressChange: $.func, onShippingRateChange: $.func, onSavedPaymentMethodRemove: $.func, onSavedPaymentMethodUpdate: $.func, onAvailablePaymentMethodsChange: $.func, options: $.object }, c.displayName = s, c.__elementType = e, c;
}, V = typeof window > "u", bi = B.createContext(null);
bi.displayName = "EmbeddedCheckoutProviderContext";
var wi = function() {
  var e = dr("calls useStripe()"), r = e.stripe;
  return r;
};
z("auBankAccount", V);
z("card", V);
z("cardNumber", V);
z("cardExpiry", V);
z("cardCvc", V);
z("iban", V);
var vi = z("payment", V);
z("expressCheckout", V);
z("paymentRequestButton", V);
z("linkAuthentication", V);
z("contactDetails", V);
z("address", V);
z("shippingAddress", V);
z("paymentMethodMessaging", V);
z("taxId", V);
z("issuingCardNumberDisplay", V);
z("issuingCardCvcDisplay", V);
z("issuingCardExpiryDisplay", V);
z("issuingCardPinDisplay", V);
z("issuingCardCopyButton", V);
/**
* @license
* SPDX-License-Identifier: Apache-2.0
*/
async function ki() {
  const t2 = H.diaBaseApiUrl;
  try {
    const [e, r] = await Promise.all([fetch(`${t2}/quotation/ADA`).then((o) => {
      if (!o.ok) throw new Error(`ADA fetch failed: ${o.status}`);
      return o.json();
    }), fetch(`${t2}/quotation/EURC`).then((o) => {
      if (!o.ok) throw new Error(`EURC fetch failed: ${o.status}`);
      return o.json();
    })]), n = e == null ? void 0 : e.Price, s = r == null ? void 0 : r.Price;
    if (n && s) {
      const o = s / n;
      return console.log(`[cryptoService] Live ADA rate: 1 EUR = ${o.toFixed(6)} ADA`), o;
    }
    throw new Error("Missing Price in DIA API response");
  } catch (e) {
    return console.error("[cryptoService] Failed to fetch live DIA ADA rate, falling back to 2.22:", e), 2.22;
  }
}
const Si = Zo(H.stripe.publishableKey), er = () => [{ id: "stripe", label: "Adyen (Card, Sofort)", icon: Je, color: "from-indigo-500 to-violet-600", shadow: "shadow-indigo-500/20" }, { id: "wero", label: "Wero (Instant)", icon: Ke, color: "from-purple-500 to-pink-500", shadow: "shadow-purple-500/20" }, { id: "digital_euro", label: "Digital Euro", icon: yt, color: "from-cyan-500 to-blue-600", shadow: "shadow-cyan-500/20" }, { id: "paypal", label: "PayPal", icon: Ls, color: "from-blue-500 to-cyan-500", shadow: "shadow-blue-500/20" }, { id: "crypto", label: "Crypto", icon: bs, color: "from-amber-500 to-orange-500", shadow: "shadow-amber-500/20" }], hn = [{ id: "metamask", name: "MetaMask", color: "bg-[#F6851B] text-white" }, { id: "coinbase", name: "Coinbase Wallet", color: "bg-[#0052FF] text-white" }, { id: "trust", name: "Trust Wallet", color: "bg-[#3375BB] text-white" }, { id: "phantom", name: "Phantom", color: "bg-[#AB9FF2] text-white" }, { id: "lace", name: "Lace (Cardano)", color: "bg-[#0033AD] text-white" }], tr = { metamask: { symbol: "ETH", rate: 33e-5 }, coinbase: { symbol: "ETH", rate: 33e-5 }, trust: { symbol: "BNB", rate: 16e-4 }, phantom: { symbol: "SOL", rate: 66e-4 }, lace: { symbol: "ADA", rate: 2.22 } };
function nc({ onBack: t2, onInitiateStripe: e, onInitiateWero: r, onInitiateDigitalEuro: n, onInitiateCrypto: s, onComplete: o }) {
  var _a2, _b;
  const [i, c] = S.useState(2.22), [d, u] = S.useState(false);
  S.useEffect(() => {
    let f = true;
    async function b() {
      u(true);
      const O = await ki();
      f && (c(O), u(false));
    }
    return b(), () => {
      f = false;
    };
  }, []);
  const p = (f) => {
    var _a3;
    return f === "lace" ? i : ((_a3 = tr[f]) == null ? void 0 : _a3.rate) || 1;
  }, { cart: m } = us(), { user: x } = ps(), y = S.useMemo(() => m.reduce((f, b) => {
    const O = b.discount_percentage && b.discount_percentage > 0 ? b.price * (1 - b.discount_percentage / 100) : b.price;
    return f + O * b.cart_quantity;
  }, 0), [m]), v = S.useMemo(() => m.reduce((f, b) => f + Number(b.cart_quantity || 0), 0), [m]), g = S.useMemo(() => {
    const f = H.paymentMethods || ["stripe", "adyen", "digital_euro", "worldline", "paypal", "crypto"], b = er(), O = b.filter((Q) => f.includes(Q.id));
    return O.length > 0 ? O : b;
  }, []), [h, w] = S.useState(() => {
    var _a3;
    return ((_a3 = g[0]) == null ? void 0 : _a3.id) || "stripe";
  }), [C, _] = S.useState("phone"), [N, T] = S.useState(""), [F, le] = S.useState(false), [xe, Ie] = S.useState(false), [de, ce] = S.useState("idle"), [we, De] = S.useState(""), [E, W] = S.useState({ name: "", street: "", city: "", zip: "", phone: "", invoiceEmail: x && !x.is_anonymous && x.email || "", country: "" }), [X, ue] = S.useState(false);
  S.useEffect(() => {
    x && !x.is_anonymous && (x.email && W((b) => b.invoiceEmail ? b : { ...b, invoiceEmail: x.email }), (async () => {
      try {
        if (H.databaseProvider === "supabase") {
          const { data: b, error: O } = await ee.from("user_roles").select("name, street, city, zip, phone, country").eq("user_id", x.id || x.$id).maybeSingle();
          b && !O && (W((Q) => ({ ...Q, name: b.name || Q.name, street: b.street || Q.street, city: b.city || Q.city, zip: b.zip || Q.zip, phone: b.phone || Q.phone, country: b.country || Q.country })), (b.name || b.street || b.city || b.zip || b.phone || b.country) && ue(true));
        }
      } catch (b) {
        console.error("Failed to load saved address:", b);
      }
    })());
  }, [x]);
  const [G, ge] = S.useState(null), [I, J] = S.useState(null), [q, pe] = S.useState(null), [P, te] = S.useState(false), [U, ie] = S.useState(false), [ne, me] = S.useState(false), [Y, A] = S.useState(null), [se, he] = S.useState(null), [ye, Ae] = S.useState(false), [ve, ke] = S.useState(false), [Ze, Xn] = S.useState(""), [et, Gn] = S.useState(""), At = !!(E.name && E.street && E.city && E.zip && E.country && E.phone && (h !== "crypto" || G !== null) && (h !== "wero" || C === "qr" || C === "phone" && N.trim().length > 6) && (!ve || Ze && et.length >= 6)), Yn = async (f) => {
    if (f === "lace") {
      te(true);
      try {
        if (window.cardano && window.cardano.lace) {
          const O = await (await Wt.enable("lace")).getChangeAddress();
          O ? (ge("lace"), J(O), pe(null)) : alert("Connected to Lace, but no change address found.");
        } else alert("Lace wallet extension not found. Please install Lace to continue.");
      } catch (b) {
        console.error("Failed to connect to Lace wallet:", b), alert(`Connection to Lace wallet was rejected or failed. Details: ${(b == null ? void 0 : b.info) || (b == null ? void 0 : b.message) || JSON.stringify(b)}`);
      } finally {
        te(false);
      }
    } else ge(f), J("0x" + Math.random().toString(16).slice(2, 10) + "..." + Math.random().toString(16).slice(2, 6)), pe(null);
  }, Qn = async () => {
    var _a3;
    if (G) {
      ie(true);
      try {
        if (G === "lace") {
          const O = ((_a3 = (await (await Wt.enable("lace")).getBalance()).find((D) => D.unit === "lovelace")) == null ? void 0 : _a3.quantity) || "0", Q = (Number(O) / 1e6).toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          pe(`${Q} ADA`);
        } else setTimeout(() => {
          pe(`1.25 ${tr[G].symbol}`), ie(false);
        }, 800);
      } catch (f) {
        console.error("Failed to check balance:", f);
      } finally {
        ie(false);
      }
    }
  }, [gr, Zn] = S.useState(null), [tt, es] = S.useState(null), [Fe, ts] = S.useState(null), [Rt, yr] = S.useState(false), [br, wr] = S.useState(null), [rt, vr] = S.useState(null), [Be, kr] = S.useState(null), [Sr, Ot] = S.useState(null), [Er, Tt] = S.useState(null), [nt, Pt] = S.useState(null), [Ue, It] = S.useState(null), [Dt, Nr] = S.useState(false), [st, Ft] = S.useState(null), [jr, Bt] = S.useState(null), [Le, Ut] = S.useState(null), [Lt, Cr] = S.useState(false), at = S.useRef(false);
  S.useEffect(() => () => {
    if (at.current) return;
    const f = Fe || Be || Ue || Le;
    f && (async () => {
      try {
        await ee.rpc("cancel_order_with_inventory", { p_order_id: f });
      } catch (O) {
        console.error("Failed to cancel order on unmount:", O);
      }
    })();
  }, [Fe, Be, Ue, Le]);
  const rs = async (f) => {
    var _a3, _b2;
    const b = `${E.name}
${E.street}
${E.city}, ${E.zip}
${E.country}`.trim();
    if (!b || !E.phone) return;
    if (X && x && !x.is_anonymous) try {
      H.databaseProvider === "supabase" && await ee.from("user_roles").update({ name: E.name, street: E.street, city: E.city, zip: E.zip, phone: E.phone, country: E.country, is_guest: false }).eq("user_id", x.id || x.$id);
    } catch (D) {
      console.error("Failed to save address to user_roles:", D);
    }
    const O = ve ? { email: Ze, password: et } : void 0, Q = ((_a3 = E.invoiceEmail) == null ? void 0 : _a3.trim()) || void 0;
    if (h === "stripe") {
      yr(true);
      try {
        const D = await e(b, E.phone, O, Q);
        H.activeFiatGateway === "adyen" && (wr(D.clientSecret), vr(D.paymentId), kr(D.orderId || null));
      } catch (D) {
        console.error("Failed to initiate Adyen payment:", D);
      } finally {
        yr(false);
      }
    } else if (h === "wero" || h === "worldline") {
      Nr(true);
      try {
        const D = await r(b, E.phone, N, C, O, Q);
        Pt(D.paymentId), Ot(D.qrCodeData), Tt(D.redirectUrl), It(D.orderId || null);
      } catch (D) {
        console.error("Failed to initiate Wero payment:", D);
      } finally {
        Nr(false);
      }
    } else if (h === "digital_euro") {
      Cr(true);
      try {
        const D = await n(b, E.phone, O, Q);
        Ft(D.paymentId), Bt(D.redirectUrl), Ut(D.orderId || null);
      } catch (D) {
        console.error("Failed to initiate Digital Euro payment:", D);
      } finally {
        Cr(false);
      }
    } else if (h === "crypto" && G === "lace") {
      me(true), he(null), Ae(false);
      try {
        const D = await Wt.enable("lace"), ss = H.cryptoReceiverAddresses.lace, $t = p("lace"), Mt = (y * $t).toFixed(6), as = Math.round(Number(Mt) * 1e6).toString(), Ar = new Fs({ initiator: D });
        Ar.sendLovelace(ss, as);
        const os = await Ar.build(), is = await D.signTx(os), ot = await D.submitTx(is);
        A(ot), Ae(true);
        const Rr = ve ? { email: Ze, password: et } : void 0, Or = ((_b2 = E.invoiceEmail) == null ? void 0 : _b2.trim()) || void 0, Se = await s(b, E.phone, { txHash: ot, customerAddress: I || "", walletName: "lace", adaAmount: Mt, rateUsed: $t }, Rr, Or);
        let Tr = false;
        const cs = (H.cryptoPaymentTimeoutMinutes || 3) * 60 * 1e3, ls = setTimeout(async () => {
          if (Tr = true, Ae(false), me(false), he(`Crypto payment confirmation timed out after ${H.cryptoPaymentTimeoutMinutes || 3} minutes.`), Se.paymentId && H.databaseProvider === "supabase") try {
            await ee.from("payments").update({ provider_status: "expired", completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", Se.paymentId), console.log("Crypto payment marked as expired in DB:", Se.paymentId);
          } catch (qt) {
            console.error("Failed to update payment to expired:", qt);
          }
          if (Se.orderId && H.databaseProvider === "supabase") try {
            await ee.rpc("cancel_order_with_inventory", { p_order_id: Se.orderId }), console.log("Crypto order cancelled on timeout:", Se.orderId);
          } catch (qt) {
            console.error("Failed to cancel crypto order on timeout:", qt);
          }
        }, cs);
        new Mo("preprodjz45ulPXDFrUvQJC54yYEKRAhJS0ZvZm").onTxConfirmed(ot, () => {
          Tr || (clearTimeout(ls), at.current = true, o(h, b, E.phone, Rr, Or, void 0, void 0, { txHash: ot, customerAddress: I || "", walletName: "lace", adaAmount: Mt, rateUsed: $t, paymentId: Se.paymentId }));
        });
      } catch (D) {
        console.error("Cardano payment transaction failed:", D), he((D == null ? void 0 : D.message) || (D == null ? void 0 : D.info) || JSON.stringify(D));
      } finally {
        me(false);
      }
    } else o(h, b, E.phone, O, Q, f);
  }, ns = async () => {
    await rs();
  }, _r = er().find((f) => f.id === h) || er()[0];
  return a.jsxs("div", { className: "min-h-screen bg-background transition-colors duration-500 overflow-x-hidden", children: [a.jsx("div", { className: "bg-card text-card-foreground border-b border-gray-100 dark:border-slate-800 sticky top-0 z-30 transition-colors", children: a.jsxs("div", { className: "max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center gap-3 sm:gap-4", children: [a.jsx("button", { onClick: t2, className: "p-2 sm:p-2.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-all text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white active:scale-95 shrink-0", children: a.jsx(Bs, { className: "w-5 h-5" }) }), a.jsxs("div", { className: "flex-grow min-w-0", children: [a.jsx("h1", { className: "text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight truncate", children: "Checkout" }), a.jsxs("p", { className: "text-[10px] sm:text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-wide truncate", children: [v, " item", v !== 1 ? "s" : "", " in your order"] })] }), a.jsxs("div", { className: "flex items-center gap-1 sm:gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shrink-0", children: [a.jsx(He, { className: "w-3 h-3 sm:w-3.5 sm:h-3.5" }), a.jsx("span", { className: "text-[9px] sm:text-[10px] font-bold uppercase tracking-widest hidden sm:inline", children: "Secure" })] })] }) }), a.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: [a.jsx("div", { className: "flex items-center justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8", children: ["Shipping", "Payment", "Confirm"].map((f, b) => a.jsxs("div", { className: "flex items-center gap-2", children: [a.jsxs("div", { className: `flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all ${b <= 1 ? "bg-gray-900 dark:bg-indigo-600 text-white" : "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-500"}`, children: [a.jsx("span", { className: "w-4 h-4 flex items-center justify-center text-[10px] rounded-full bg-white/20", children: b + 1 }), a.jsx("span", { className: "hidden sm:inline", children: f })] }), b < 2 && a.jsx(hs, { className: "w-4 h-4 text-gray-300" })] }, f)) }), a.jsxs("div", { className: "grid lg:grid-cols-12 gap-6 sm:gap-8 items-start", children: [a.jsxs("div", { className: "lg:col-span-7 space-y-6", children: [a.jsxs(M.section, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "bg-card text-card-foreground rounded-[1rem] border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm transition-colors", children: [a.jsxs("div", { className: "px-4 sm:px-7 py-4 sm:py-5 border-b border-gray-50 dark:border-slate-800 flex items-center gap-3", children: [a.jsx("div", { className: "p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl transition-colors", children: a.jsx(fs, { className: "w-5 h-5" }) }), a.jsxs("div", { children: [a.jsx("h2", { className: "text-base font-extrabold text-gray-900 dark:text-white tracking-tight", children: "Shipping Address" }), a.jsx("p", { className: "text-[11px] font-medium text-gray-400 dark:text-gray-500", children: "Where should we deliver your order?" })] })] }), a.jsxs("div", { className: "p-4 sm:p-7 grid sm:grid-cols-2 gap-4 sm:gap-5", children: [a.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [a.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1", children: [a.jsx(ms, { className: "w-3 h-3" }), " Full Name"] }), a.jsx("input", { type: "text", value: E.name, onChange: (f) => W((b) => ({ ...b, name: f.target.value })), placeholder: "John Doe", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), a.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [a.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1", children: [a.jsx(xs, { className: "w-3 h-3" }), " Street Address"] }), a.jsx("input", { type: "text", value: E.street, onChange: (f) => W((b) => ({ ...b, street: f.target.value })), placeholder: "123 Magic Avenue", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), a.jsxs("div", { className: "space-y-1.5", children: [a.jsx("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5", children: "City" }), a.jsx("input", { type: "text", value: E.city, onChange: (f) => W((b) => ({ ...b, city: f.target.value })), placeholder: "Magical Product town", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), a.jsxs("div", { className: "space-y-1.5", children: [a.jsx("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5", children: "ZIP Code" }), a.jsx("input", { type: "text", value: E.zip, onChange: (f) => W((b) => ({ ...b, zip: f.target.value })), placeholder: "12345", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), a.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [a.jsx("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5", children: "Country" }), a.jsxs("select", { value: E.country, onChange: (f) => W((b) => ({ ...b, country: f.target.value })), className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium text-gray-900 dark:text-white", children: [a.jsx("option", { value: "", children: "Select a country" }), a.jsx("option", { value: "FR", children: "France" }), a.jsx("option", { value: "DE", children: "Germany" }), a.jsx("option", { value: "BE", children: "Belgium" }), a.jsx("option", { value: "NL", children: "Netherlands" }), a.jsx("option", { value: "ES", children: "Spain" }), a.jsx("option", { value: "IT", children: "Italy" }), a.jsx("option", { value: "GB", children: "United Kingdom" }), a.jsx("option", { value: "US", children: "United States" })] })] }), a.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [a.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1", children: [a.jsx(Us, { className: "w-3 h-3" }), " Mobile or WhatsApp Number"] }), a.jsx("input", { type: "tel", value: E.phone, onChange: (f) => W((b) => ({ ...b, phone: f.target.value })), placeholder: "+1 (555) 000-0000", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), a.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [a.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1", children: [a.jsx(Ir, { className: "w-3 h-3" }), " Email for Invoice ", a.jsx("span", { className: "text-gray-300 dark:text-gray-600 normal-case font-medium", children: "(optional)" })] }), a.jsx("input", { type: "email", value: E.invoiceEmail, onChange: (f) => W((b) => ({ ...b, invoiceEmail: f.target.value })), placeholder: "your@email.com", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), x && !x.is_anonymous && a.jsx("div", { className: "sm:col-span-2 pt-2", children: a.jsxs("label", { className: "flex items-center gap-3 p-4 bg-indigo-50/30 dark:bg-indigo-900/10 border border-indigo-100/50 dark:border-indigo-900/30 rounded-2xl cursor-pointer hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group", children: [a.jsxs("div", { className: "relative flex items-center justify-center mt-0.5", children: [a.jsx("input", { type: "checkbox", checked: X, onChange: (f) => ue(f.target.checked), className: "peer appearance-none w-5 h-5 border-2 border-indigo-300 dark:border-indigo-700 rounded bg-white dark:bg-slate-800 checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" }), a.jsx(ze, { className: "w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" })] }), a.jsxs("div", { children: [a.jsx("h4", { className: "text-xs font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors", children: "Save address for faster checkout later" }), a.jsx("p", { className: "text-[10px] text-gray-500 dark:text-gray-400 mt-0.5", children: "We will save your name, street, city, ZIP, country, and phone number to your profile." })] })] }) })] })] }), a.jsxs(M.section, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "bg-card text-card-foreground rounded-[1rem] border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm transition-colors", children: [a.jsxs("div", { className: "px-4 sm:px-7 py-4 sm:py-5 border-b border-gray-50 dark:border-slate-800 flex items-center gap-3", children: [a.jsx("div", { className: "p-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl transition-colors", children: a.jsx(Je, { className: "w-5 h-5" }) }), a.jsxs("div", { children: [a.jsx("h2", { className: "text-base font-extrabold text-gray-900 dark:text-white tracking-tight", children: "Payment Method" }), a.jsx("p", { className: "text-[11px] font-medium text-gray-400 dark:text-gray-500", children: "Choose how you'd like to pay" })] })] }), a.jsxs("div", { className: "p-4 sm:p-7", children: [a.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-5 sm:mb-6", children: g.map((f) => a.jsxs(M.button, { onClick: () => w(f.id), whileTap: { scale: 0.96 }, className: `relative flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 overflow-hidden ${h === f.id ? `border-transparent text-white shadow-lg ${f.shadow}` : "border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 text-gray-400 dark:text-gray-500 hover:border-gray-200 dark:hover:border-slate-600 hover:text-gray-600 dark:hover:text-gray-300"}`, children: [h === f.id && a.jsx(M.div, { layoutId: "payment-bg", className: `absolute inset-0 bg-gradient-to-br ${f.color}`, transition: { type: "spring", stiffness: 300, damping: 25 } }), a.jsx(f.icon, { className: "w-5 h-5 sm:w-6 sm:h-6 relative z-10" }), a.jsx("span", { className: "text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest relative z-10", children: f.label })] }, f.id)) }), a.jsxs(Ht, { mode: "wait", children: [h === "stripe" && a.jsx(M.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "space-y-4 overflow-hidden py-2", children: a.jsxs("div", { className: "p-4 bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl flex flex-col items-center text-center gap-3", children: [a.jsx(Je, { className: "w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-pulse" }), a.jsxs("div", { children: [a.jsx("p", { className: "text-sm font-bold text-gray-800 dark:text-gray-200", children: "Secure Adyen Checkout" }), a.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm", children: "Click 'Confirm Order' to proceed to the secure, encrypted Adyen checkout page." })] })] }) }, "stripe-fields"), h === "paypal" && a.jsx(M.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "overflow-hidden", children: a.jsx("div", { className: "p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 transition-colors text-center", children: a.jsx("p", { className: "text-sm font-semibold text-blue-700 dark:text-blue-300", children: "You'll be redirected to PayPal to complete payment." }) }) }, "paypal-info"), h === "crypto" && a.jsx(M.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "overflow-hidden", children: a.jsxs("div", { className: "p-4 sm:p-5 bg-gradient-to-b from-amber-50/50 to-amber-50 rounded-2xl border border-amber-200/60 flex flex-col gap-3 sm:gap-4", children: [a.jsxs("div", { className: "text-center", children: [a.jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-600 rounded-full mb-3", children: a.jsx(Ur, { className: "w-6 h-6" }) }), a.jsx("h3", { className: "text-sm font-extrabold text-amber-900 tracking-tight", children: "Connect Web3 Wallet" }), a.jsx("p", { className: "text-[11px] font-medium text-amber-700/70 mt-1", children: "Select a wallet to proceed with crypto payment." })] }), a.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5", children: hn.map((f) => a.jsxs("button", { onClick: () => Yn(f.id), disabled: P, className: `relative flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl font-bold text-[10px] sm:text-xs transition-all duration-200 ${G === f.id ? `${f.color} ring-2 ring-offset-2 ring-amber-400 shadow-md` : "bg-white text-gray-700 border border-amber-100 hover:border-amber-300 hover:bg-amber-50/50"} ${P ? "opacity-50 cursor-not-allowed" : ""}`, children: [a.jsxs("span", { className: "truncate mr-2", children: [f.name, " ", P && f.id === "lace" ? "(Connecting...)" : ""] }), G === f.id && a.jsx(ze, { className: "w-4 h-4 shrink-0" })] }, f.id)) }), G && a.jsxs(M.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "mt-2 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-amber-200/50 text-center space-y-3", children: [a.jsxs("div", { children: [a.jsxs("p", { className: "text-xs font-semibold text-amber-800", children: ["Connected to ", (_a2 = hn.find((f) => f.id === G)) == null ? void 0 : _a2.name] }), I && a.jsx("p", { className: "text-[10px] font-mono text-amber-600/80 mt-1 bg-amber-100/50 block px-2 py-1 rounded break-all select-all", children: I }), a.jsx("div", { className: "mt-3", children: q ? a.jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-lg border border-green-200/50", children: [a.jsx(Br, { className: "w-3.5 h-3.5" }), q] }) : a.jsxs("button", { onClick: Qn, disabled: U, className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50", children: [a.jsx(Br, { className: "w-3.5 h-3.5" }), U ? "Checking..." : "Check Balance"] }) })] }), a.jsxs("div", { className: "pt-3 border-t border-amber-200/50 text-left space-y-2", children: [a.jsx("p", { className: "text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-1", children: "Payment Details" }), a.jsxs("div", { className: "flex justify-between items-center bg-amber-50/80 px-3 py-2 rounded-lg", children: [a.jsx("span", { className: "text-xs font-medium text-amber-700", children: "Amount Due" }), a.jsxs("span", { className: "text-sm font-extrabold text-amber-900", children: [(y * p(G)).toFixed(4), " ", ((_b = tr[G]) == null ? void 0 : _b.symbol) || "ADA"] })] }), a.jsxs("div", { className: "bg-amber-50/80 px-3 py-2 rounded-lg space-y-1", children: [a.jsx("span", { className: "text-[10px] font-bold text-amber-700/70 uppercase tracking-wider", children: "Send to Address" }), a.jsx("p", { className: "text-xs font-mono text-amber-900 break-all select-all bg-white/50 p-1.5 rounded", children: H.cryptoReceiverAddresses[G] })] })] })] })] }) }, "crypto-info"), h === "wero" && a.jsx(M.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "overflow-hidden", children: a.jsxs("div", { className: "p-4 sm:p-5 bg-gradient-to-b from-purple-50/50 to-purple-50 rounded-2xl border border-purple-200/60 flex flex-col gap-3 sm:gap-4", children: [a.jsxs("div", { className: "text-center", children: [a.jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full mb-3 animate-pulse", children: a.jsx(Ke, { className: "w-6 h-6" }) }), a.jsx("h3", { className: "text-sm font-extrabold text-purple-900 tracking-tight", children: "Wero Instant Transfer" }), a.jsx("p", { className: "text-[11px] font-medium text-purple-700/70 mt-1", children: "Pay instantly and securely from your banking app." })] }), a.jsxs("div", { className: "flex gap-2 p-1 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-200/50", children: [a.jsx("button", { type: "button", onClick: () => _("phone"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${C === "phone" ? "bg-purple-600 text-white shadow-sm font-black" : "text-purple-600/70 hover:text-purple-700 hover:bg-purple-50/30"}`, children: "Phone Number" }), a.jsx("button", { type: "button", onClick: () => _("qr"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${C === "qr" ? "bg-purple-600 text-white shadow-sm font-black" : "text-purple-600/70 hover:text-purple-700 hover:bg-purple-50/30"}`, children: "QR Code" })] }), C === "phone" ? a.jsxs("div", { className: "space-y-1.5 text-left bg-white/40 p-3.5 rounded-xl border border-purple-200/30", children: [a.jsxs("label", { className: "text-[10px] font-bold text-purple-400 dark:text-purple-500 uppercase tracking-widest ml-0.5 flex items-center gap-1", children: [a.jsx(Ke, { className: "w-3 h-3" }), " Wero Registered Phone"] }), a.jsx("input", { type: "tel", value: N, onChange: (f) => T(f.target.value), placeholder: "+33 6 12 34 56 78", className: "w-full px-4 py-3 bg-white border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all text-sm font-medium text-gray-800" }), a.jsx("p", { className: "text-[9px] text-purple-600/60 font-semibold mt-1", children: "Ensure this phone number is registered with Wero in your bank app." })] }) : a.jsxs("div", { className: "p-4 bg-white/40 text-center rounded-xl border border-purple-200/30 space-y-1", children: [a.jsx(mn, { className: "w-8 h-8 text-purple-600 mx-auto opacity-80" }), a.jsx("p", { className: "text-xs font-bold text-purple-900", children: "QR Code Checkout" }), a.jsx("p", { className: "text-[10px] text-purple-700/60 leading-relaxed", children: "A checkout QR code will generate for you to scan and authorize in your banking app." })] })] }) }, "wero-info"), h === "digital_euro" && a.jsx(M.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "overflow-hidden", children: a.jsxs("div", { className: "p-4 sm:p-5 bg-gradient-to-b from-cyan-50/60 to-blue-50 rounded-2xl border border-cyan-200/70 flex flex-col gap-3 sm:gap-4", children: [a.jsxs("div", { className: "text-center", children: [a.jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 bg-cyan-100 text-cyan-700 rounded-full mb-3", children: a.jsx(yt, { className: "w-6 h-6" }) }), a.jsx("h3", { className: "text-sm font-extrabold text-cyan-950 tracking-tight", children: "Digital Euro Sandbox" }), a.jsx("p", { className: "text-[11px] font-medium text-cyan-800/70 mt-1", children: "Simulates a future PSP-hosted Digital Euro authorization flow for testing checkout plumbing." })] }), a.jsxs("div", { className: "grid grid-cols-2 gap-2 text-left", children: [a.jsxs("div", { className: "bg-white/60 border border-cyan-100 rounded-xl p-3", children: [a.jsx("p", { className: "text-[9px] font-black uppercase tracking-wider text-cyan-500", children: "Currency" }), a.jsx("p", { className: "text-sm font-extrabold text-cyan-950 mt-0.5", children: "EUR" })] }), a.jsxs("div", { className: "bg-white/60 border border-cyan-100 rounded-xl p-3", children: [a.jsx("p", { className: "text-[9px] font-black uppercase tracking-wider text-cyan-500", children: "Mode" }), a.jsx("p", { className: "text-sm font-extrabold text-cyan-950 mt-0.5", children: "Sandbox" })] })] })] }) }, "digital-euro-info")] })] })] })] }), a.jsx("div", { className: "lg:col-span-5 relative", children: a.jsxs(M.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.15 }, className: "sticky top-24 rounded-[1rem] overflow-hidden", children: [a.jsxs("div", { className: "bg-gradient-to-b from-gray-900 to-gray-950 text-white p-5 sm:p-7 relative", children: [a.jsx("div", { className: "absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" }), a.jsxs("div", { className: "flex items-center justify-between mb-6 relative", children: [a.jsx("h2", { className: "text-lg font-extrabold tracking-tight", children: "Order Summary" }), a.jsxs("span", { className: "text-[10px] font-bold text-white/40 uppercase tracking-widest bg-white/[0.06] px-2.5 py-1 rounded-full", children: [v, " item", v !== 1 ? "s" : ""] })] }), a.jsx("div", { className: "space-y-3 mb-6 max-h-[280px] overflow-y-auto pr-1 relative", style: { scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }, children: m.map((f, b) => a.jsxs(M.div, { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.2 + b * 0.05 }, className: "flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] transition-colors group", children: [a.jsx("div", { className: "w-11 h-11 rounded-lg overflow-hidden bg-white/[0.08] flex-shrink-0 flex items-center justify-center", children: a.jsx("img", { src: f.image_url, alt: f.title, className: "w-full h-full object-contain p-1", referrerPolicy: "no-referrer" }) }), a.jsxs("div", { className: "min-w-0 flex-grow", children: [a.jsx("h4", { className: "font-bold text-sm truncate text-white/90", children: f.title }), a.jsxs("p", { className: "text-[11px] text-white/30 font-medium tabular-nums", children: [f.cart_quantity, " \xD7 ", H.currency_symbol, (f.discount_percentage && f.discount_percentage > 0 ? f.price * (1 - f.discount_percentage / 100) : f.price).toFixed(2)] })] }), a.jsxs("div", { className: "font-bold text-sm tabular-nums text-white/70 group-hover:text-white transition-colors", children: [H.currency_symbol, (f.cart_quantity * (f.discount_percentage && f.discount_percentage > 0 ? f.price * (1 - f.discount_percentage / 100) : f.price)).toFixed(2)] })] }, f.id)) }), a.jsxs("div", { className: "space-y-2.5 pt-5 border-t border-white/[0.06]", children: [a.jsxs("div", { className: "flex justify-between text-sm", children: [a.jsx("span", { className: "text-white/40 font-medium", children: "Subtotal" }), a.jsxs("span", { className: "text-white/70 font-bold tabular-nums", children: [H.currency_symbol, y.toFixed(2)] })] }), a.jsxs("div", { className: "flex justify-between text-sm", children: [a.jsx("span", { className: "text-white/40 font-medium", children: "Shipping" }), a.jsx("span", { className: "text-emerald-400 font-bold text-xs bg-emerald-400/10 px-2 py-0.5 rounded-full uppercase tracking-widest", children: "Free" })] }), a.jsx("div", { className: "h-px bg-white/[0.06] my-1" }), a.jsxs("div", { className: "flex justify-between items-baseline pt-2", children: [a.jsx("span", { className: "font-extrabold text-white/60 text-sm", children: "Total" }), a.jsxs(M.span, { initial: { scale: 1.08 }, animate: { scale: 1 }, className: "text-xl sm:text-3xl font-black tabular-nums bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent", children: [H.currency_symbol, y.toFixed(2)] }, y)] })] })] }), (x == null ? void 0 : x.is_anonymous) && a.jsxs("div", { className: "p-5 bg-indigo-50/50 dark:bg-indigo-900/10 border-x border-gray-100 dark:border-slate-800 transition-colors", children: [a.jsxs("label", { className: "flex items-start gap-3 cursor-pointer group", children: [a.jsxs("div", { className: "relative flex items-center justify-center mt-0.5", children: [a.jsx("input", { type: "checkbox", checked: ve, onChange: (f) => ke(f.target.checked), className: "peer appearance-none w-5 h-5 border-2 border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" }), a.jsx(ze, { className: "w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" })] }), a.jsxs("div", { children: [a.jsx("h4", { className: "text-sm font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors", children: "Save my details for next time" }), a.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-0.5", children: "Create a permanent account to track your order and save preferences." })] })] }), a.jsx(Ht, { children: ve && a.jsxs(M.div, { initial: { opacity: 0, height: 0, marginTop: 0 }, animate: { opacity: 1, height: "auto", marginTop: 16 }, exit: { opacity: 0, height: 0, marginTop: 0 }, className: "space-y-3 overflow-hidden", children: [a.jsxs("div", { className: "space-y-1.5", children: [a.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-0.5 flex items-center gap-1", children: [a.jsx(Ir, { className: "w-3 h-3" }), " Email"] }), a.jsx("input", { type: "email", value: Ze, onChange: (f) => Xn(f.target.value), placeholder: "your@email.com", className: "w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium" })] }), a.jsxs("div", { className: "space-y-1.5", children: [a.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-0.5 flex items-center gap-1", children: [a.jsx(gs, { className: "w-3 h-3" }), " Password"] }), a.jsx("input", { type: "password", value: et, onChange: (f) => Gn(f.target.value), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium" })] })] }) })] }), a.jsxs("div", { className: "p-4 sm:p-5 bg-card text-card-foreground border border-gray-100 dark:border-slate-800 border-t-0 rounded-b-[1rem] transition-colors", children: [a.jsx(M.button, { onClick: ns, disabled: !At || Rt || Dt || Lt, whileTap: { scale: 0.97 }, className: `w-full py-4 rounded-2xl font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 ${At && !Rt && !Dt && !Lt ? `bg-gradient-to-r ${_r.color} text-white shadow-lg ${_r.shadow} hover:brightness-110` : "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"}`, children: Rt || Dt || Lt ? a.jsxs(a.Fragment, { children: [a.jsx(je, { className: "w-4 h-4 animate-spin" }), "Initiating secure payment..."] }) : At ? a.jsxs(a.Fragment, { children: [a.jsx(ys, { className: "w-4 h-4" }), "Confirm Order"] }) : a.jsxs(a.Fragment, { children: [a.jsx(He, { className: "w-4 h-4" }), "Fill in all fields"] }) }), a.jsxs("p", { className: "text-center text-[10px] font-medium text-gray-400 mt-3 flex items-center justify-center gap-1", children: [a.jsx(He, { className: "w-3 h-3" }), "256-bit encrypted \xB7 Secure checkout"] })] })] }) })] })] }), a.jsxs(Ht, { children: [gr && tt && a.jsx(Ni, { clientSecret: gr, paymentId: tt, totalAmount: y, shippingInfo: E, user: x, onClose: async (f) => {
    if (Fe) try {
      await ee.rpc("cancel_order_with_inventory", { p_order_id: Fe }), console.log("Stripe order cancelled on modal close:", Fe);
    } catch (O) {
      console.error("Failed to cancel order on modal close:", O);
    }
    const b = f || "cancelled";
    if (tt) try {
      await ee.from("payments").update({ provider_status: b, completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", tt);
    } catch (O) {
      console.error("Failed to mark Stripe payment as cancelled:", O);
    }
    b === "failed" ? be.error("Stripe payment failed.") : be.error("Stripe payment was cancelled."), Zn(null), es(null), ts(null);
  } }), br && rt && a.jsx(ji, { sessionData: br, paymentId: rt, totalAmount: y, shippingInfo: E, user: x, onClose: async (f) => {
    if (Be) try {
      await ee.rpc("cancel_order_with_inventory", { p_order_id: Be }), console.log("Adyen order cancelled on modal close:", Be);
    } catch (O) {
      console.error("Failed to cancel order on modal close:", O);
    }
    const b = f || "cancelled";
    if (rt) try {
      await ee.from("payments").update({ provider_status: b, completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", rt);
    } catch (O) {
      console.error("Failed to mark Adyen payment as cancelled:", O);
    }
    b === "failed" ? be.error("Adyen payment failed.") : be.error("Adyen payment was cancelled."), wr(null), vr(null), kr(null);
  } }), nt && (Sr || Er) && a.jsx(_i, { paymentId: nt, qrCodeData: Sr || "", redirectUrl: Er || "", totalAmount: y, weroPhone: N, weroMode: C, onClose: async (f) => {
    if (Ue) try {
      await ee.rpc("cancel_order_with_inventory", { p_order_id: Ue }), console.log("Wero order cancelled on modal close:", Ue);
    } catch (O) {
      console.error("Failed to cancel order on modal close:", O);
    }
    const b = f || "cancelled";
    if (nt) try {
      await ee.from("payments").update({ provider_status: b, completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", nt);
    } catch (O) {
      console.error("Failed to mark Wero payment as cancelled:", O);
    }
    b === "failed" ? be.error("Wero payment failed.") : be.error("Wero payment was cancelled."), Pt(null), Ot(null), Tt(null), It(null);
  }, onSuccess: (f) => {
    at.current = true, Pt(null), Ot(null), Tt(null), It(null), o(h, "", "", void 0, E.invoiceEmail, "succeeded", f);
  } }), st && jr && a.jsx(Ci, { paymentId: st, redirectUrl: jr, totalAmount: y, onClose: async (f) => {
    if (Le) try {
      await ee.rpc("cancel_order_with_inventory", { p_order_id: Le }), console.log("Digital Euro order cancelled on modal close:", Le);
    } catch (O) {
      console.error("Failed to cancel Digital Euro order on modal close:", O);
    }
    const b = f || "cancelled";
    if (st) try {
      await ee.from("payments").update({ provider_status: b, completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", st);
    } catch (O) {
      console.error("Failed to mark Digital Euro payment as cancelled:", O);
    }
    b === "failed" ? be.error("Digital Euro payment failed.") : be.error("Digital Euro payment was cancelled."), Ft(null), Bt(null), Ut(null);
  }, onSuccess: (f) => {
    at.current = true, Ft(null), Bt(null), Ut(null), o("digital_euro", "", "", void 0, E.invoiceEmail, "succeeded", f);
  } }), (ne || ye || se) && a.jsx(M.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm", children: a.jsx(M.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "relative w-full max-w-md overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-center", children: se ? a.jsxs("div", { className: "space-y-4", children: [a.jsx("div", { className: "mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600", children: a.jsx(Ve, { className: "w-6 h-6" }) }), a.jsx("h3", { className: "text-lg font-black text-slate-950 dark:text-white uppercase tracking-wider", children: "Transaction Failed" }), a.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-h-40 overflow-y-auto break-words font-mono bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800", children: se }), a.jsx("div", { className: "pt-2", children: a.jsx("button", { onClick: () => he(null), className: "w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider transition-all", children: "Close" }) })] }) : a.jsxs("div", { className: "space-y-5 py-3", children: [a.jsxs("div", { className: "mx-auto relative flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600", children: [a.jsx(je, { className: "w-8 h-8 animate-spin text-amber-500" }), a.jsx(Ur, { className: "absolute w-4 h-4 text-amber-600" })] }), a.jsxs("div", { children: [a.jsx("h3", { className: "text-base font-black text-slate-950 dark:text-white uppercase tracking-wider", children: ye ? "Confirming Blockchain Payment" : "Preparing Transaction" }), a.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed", children: ye ? "Waiting for the transaction to be mined into a block on Cardano Preproduction blockchain. This typically takes 10 to 20 seconds." : "Please approve and sign the payment request in your connected Lace wallet window." })] }), Y && a.jsxs("div", { className: "p-3 bg-amber-50/50 dark:bg-amber-950/10 rounded-2xl border border-amber-200/50 dark:border-amber-900/30 space-y-1.5", children: [a.jsx("span", { className: "text-[9px] font-black uppercase tracking-wider text-amber-700/80", children: "Transaction Hash" }), a.jsx("p", { className: "text-[10px] font-mono text-slate-800 dark:text-slate-200 select-all truncate", children: Y }), a.jsxs("a", { href: `https://preprod.cardanoscan.io/transaction/${Y}`, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 hover:text-amber-700 transition-colors uppercase tracking-wider mt-1 animate-pulse", children: ["View on Cardanoscan ", a.jsx(nr, { className: "w-3 h-3" })] })] })] }) }) })] })] });
}
function Ei({ clientSecret: t2, paymentId: e, totalAmount: r, shippingInfo: n, user: s, onClose: o }) {
  const i = wi(), c = xi(), [d, u] = S.useState(false), [p, m] = S.useState(null), x = { layout: "accordion", fields: { billingDetails: { address: "auto", email: "auto", phone: "auto" } } }, y = (g) => {
    const h = g.replace(/\s+/g, "");
    return h.startsWith("+") ? h : h.startsWith("0") ? `+33${h.slice(1)}` : h;
  }, v = async (g) => {
    if (g.preventDefault(), !i || !c) return;
    u(true), m(null);
    const { error: h } = await i.confirmPayment({ elements: c, confirmParams: { return_url: `${window.location.origin}${window.location.pathname.endsWith("/") ? window.location.pathname : window.location.pathname + "/"}?payment_id=${e}`, payment_method_data: { billing_details: { name: n.name || void 0, email: n.invoiceEmail || (s == null ? void 0 : s.email) || void 0, phone: y(n.phone) || void 0, address: { line1: n.street || void 0, city: n.city || void 0, postal_code: n.zip || void 0, country: n.country || void 0 } } } } });
    if (h) {
      m(h.message || "An unexpected error occurred."), u(false);
      try {
        await ee.from("payments").update({ provider_status: "failed", completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", e);
      } catch (w) {
        console.error("Failed to mark Stripe payment as failed in DB:", w);
      }
    }
  };
  return a.jsxs("form", { onSubmit: v, className: "space-y-4", children: [a.jsx(vi, { options: x }), p && a.jsxs("div", { className: "p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-xl text-xs flex items-start gap-2", children: [a.jsx(Ve, { className: "w-4 h-4 shrink-0 mt-0.5" }), a.jsx("span", { children: p })] }), a.jsxs("div", { className: "flex gap-3 pt-2", children: [a.jsx("button", { type: "button", onClick: o, disabled: d, className: "flex-1 py-3 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-extrabold uppercase tracking-wider transition-colors disabled:opacity-50", children: "Cancel" }), a.jsx("button", { type: "submit", disabled: !i || d, className: "flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50", children: d ? a.jsxs(a.Fragment, { children: [a.jsx(je, { className: "w-4 h-4 animate-spin" }), "Processing..."] }) : a.jsxs(a.Fragment, { children: [a.jsx(He, { className: "w-4 h-4" }), "Pay Now"] }) })] })] });
}
function Ni({ clientSecret: t2, paymentId: e, totalAmount: r, shippingInfo: n, user: s, onClose: o }) {
  const i = document.documentElement.classList.contains("dark"), c = (u) => {
    const p = u.replace(/\s+/g, "");
    return p.startsWith("+") ? p : p.startsWith("0") ? `+33${p.slice(1)}` : p;
  }, d = { clientSecret: t2, appearance: { theme: i ? "night" : "stripe", variables: { colorPrimary: "#4f46e5" } }, defaultValues: { billingDetails: { name: n.name || void 0, email: n.invoiceEmail || (s == null ? void 0 : s.email) || void 0, phone: c(n.phone) || void 0, address: { line1: n.street || void 0, city: n.city || void 0, postalCode: n.zip || void 0, country: n.country || void 0 } } } };
  return a.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto", children: a.jsxs(M.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsxs("div", { className: "flex items-center gap-2.5", children: [a.jsx("div", { className: "p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl", children: a.jsx(Je, { className: "w-5 h-5" }) }), a.jsxs("div", { children: [a.jsx("h3", { className: "text-base font-extrabold text-gray-900 dark:text-white", children: "Secure Checkout" }), a.jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: "Provide payment details to complete purchase" })] })] }), a.jsx("button", { onClick: () => o(), className: "p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors", children: a.jsx(vt, { className: "w-5 h-5" }) })] }), a.jsx(Jn, { stripe: Si, options: d, children: a.jsx(Ei, { clientSecret: t2, paymentId: e, totalAmount: r, shippingInfo: n, user: s, onClose: o }) })] }) });
}
function ji({ sessionData: t2, paymentId: e, totalAmount: r, shippingInfo: n, user: s, onClose: o }) {
  const [i, c] = S.useState("card"), [d, u] = S.useState(""), [p, m] = S.useState(""), [x, y] = S.useState(""), [v, g] = S.useState(n.name || ""), [h, w] = S.useState(false), [C, _] = S.useState(null), N = (T) => {
    if (T.preventDefault(), i === "card") {
      if (d.replace(/\s/g, "").length < 16) {
        _("Please enter a valid card number.");
        return;
      }
      if (p.length < 5) {
        _("Please enter a valid expiry date (MM/YY).");
        return;
      }
      if (x.length < 3) {
        _("Please enter a valid CVV code.");
        return;
      }
    }
    _(null), w(true), setTimeout(() => {
      const F = `${window.location.origin}${window.location.pathname.endsWith("/") ? window.location.pathname : window.location.pathname + "/"}?payment_id=${e}`;
      window.location.href = F;
    }, 2e3);
  };
  return a.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto", children: a.jsxs(M.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsxs("div", { className: "flex items-center gap-2.5", children: [a.jsx("div", { className: "p-2 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-xl animate-pulse", children: a.jsx(zt, { className: "w-5 h-5" }) }), a.jsxs("div", { children: [a.jsxs("h3", { className: "text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2", children: ["Adyen Checkout ", a.jsx("span", { className: "text-[10px] px-1.5 py-0.5 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 rounded font-black tracking-wider uppercase", children: "Sandbox" })] }), a.jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: "Fast and secure global payments" })] })] }), a.jsx("button", { onClick: () => o(), className: "p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors", children: a.jsx(vt, { className: "w-5 h-5" }) })] }), a.jsxs("div", { className: "flex gap-2 p-1 bg-gray-50 dark:bg-slate-800/40 rounded-xl border border-gray-100 dark:border-slate-800", children: [a.jsx("button", { type: "button", onClick: () => c("card"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${i === "card" ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black" : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: "Credit Card" }), a.jsx("button", { type: "button", onClick: () => c("sofort"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${i === "sofort" ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black" : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: "Sofort" }), a.jsx("button", { type: "button", onClick: () => c("ideal"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${i === "ideal" ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black" : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: "iDEAL" })] }), a.jsxs("form", { onSubmit: N, className: "space-y-4", children: [i === "card" && a.jsxs("div", { className: "space-y-3.5", children: [a.jsxs("div", { children: [a.jsx("label", { className: "block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1", children: "Card Number" }), a.jsxs("div", { className: "relative", children: [a.jsx("input", { type: "text", placeholder: "4111 1111 1111 1111", maxLength: 19, value: d, onChange: (T) => {
    const F = T.target.value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim();
    u(F);
  }, className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none", required: true }), a.jsx(Je, { className: "absolute right-3.5 top-3 w-4 h-4 text-gray-400" })] })] }), a.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [a.jsxs("div", { children: [a.jsx("label", { className: "block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1", children: "Expiry Date" }), a.jsx("input", { type: "text", placeholder: "MM/YY", maxLength: 5, value: p, onChange: (T) => {
    const F = T.target.value.replace(/\D/g, "");
    F.length >= 2 ? m(`${F.slice(0, 2)}/${F.slice(2, 4)}`) : m(F);
  }, className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none", required: true })] }), a.jsxs("div", { children: [a.jsx("label", { className: "block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1", children: "Security Code (CVV)" }), a.jsx("input", { type: "password", placeholder: "123", maxLength: 4, value: x, onChange: (T) => y(T.target.value.replace(/\D/g, "")), className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none", required: true })] })] }), a.jsxs("div", { children: [a.jsx("label", { className: "block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1", children: "Cardholder Name" }), a.jsx("input", { type: "text", placeholder: "John Doe", value: v, onChange: (T) => g(T.target.value), className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none", required: true })] })] }), i === "sofort" && a.jsxs("div", { className: "p-5 text-center bg-gray-50 dark:bg-slate-800/20 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl space-y-2", children: [a.jsx(zt, { className: "w-8 h-8 text-indigo-500 mx-auto animate-bounce" }), a.jsx("h4", { className: "text-xs font-extrabold text-gray-800 dark:text-white", children: "Redirecting to Sofort Banking" }), a.jsx("p", { className: "text-[10px] text-gray-400 dark:text-gray-500", children: "You will be securely redirected to complete payment with your bank account." })] }), i === "ideal" && a.jsxs("div", { className: "p-5 text-center bg-gray-50 dark:bg-slate-800/20 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl space-y-2", children: [a.jsx(zt, { className: "w-8 h-8 text-emerald-500 mx-auto animate-bounce" }), a.jsx("h4", { className: "text-xs font-extrabold text-gray-800 dark:text-white", children: "Redirecting to iDEAL Sandbox" }), a.jsx("p", { className: "text-[10px] text-gray-400 dark:text-gray-500", children: "You will be securely redirected to select your Dutch bank and authorize payment." })] }), C && a.jsxs("div", { className: "p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 rounded-xl text-xs flex items-start gap-2", children: [a.jsx(Ve, { className: "w-4 h-4 shrink-0 mt-0.5" }), a.jsx("span", { children: C })] }), a.jsxs("div", { className: "flex gap-3 pt-2", children: [a.jsx("button", { type: "button", onClick: () => o(), disabled: h, className: "flex-1 py-3 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-extrabold uppercase tracking-wider transition-colors disabled:opacity-50", children: "Cancel" }), a.jsx("button", { type: "submit", disabled: h, className: "flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50", children: h ? a.jsxs(a.Fragment, { children: [a.jsx(je, { className: "w-4 h-4 animate-spin" }), "Processing..."] }) : a.jsxs(a.Fragment, { children: [a.jsx(He, { className: "w-4 h-4" }), "Pay ", H.currencySymbol, r.toFixed(2)] }) })] })] })] }) });
}
function Ci({ paymentId: t2, redirectUrl: e, totalAmount: r, onClose: n, onSuccess: s }) {
  const [o, i] = S.useState(false), [c, d] = S.useState(null), u = async (p) => {
    i(true), d(null);
    try {
      const { data: m, error: x } = await ee.functions.invoke("digital-euro-checkout", { body: { action: "confirm", payment_id: t2, status: p } });
      if (x) throw new Error(x.message || "Failed to confirm Digital Euro payment.");
      if ((m == null ? void 0 : m.status) === "succeeded") s(m.order_id);
      else {
        const y = (m == null ? void 0 : m.status) === "failed" ? "failed" : "cancelled";
        d(`Payment simulation completed with status: ${(m == null ? void 0 : m.status) || p}`), i(false), setTimeout(() => {
          n(y);
        }, 1500);
      }
    } catch (m) {
      console.error("Digital Euro simulation error:", m), d(m.message || "Simulation request failed."), i(false);
    }
  };
  return a.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto", children: a.jsxs(M.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsxs("div", { className: "flex items-center gap-2.5", children: [a.jsx("div", { className: "p-2 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-xl", children: a.jsx(yt, { className: "w-5 h-5" }) }), a.jsxs("div", { children: [a.jsxs("h3", { className: "text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2", children: ["Digital Euro ", a.jsx("span", { className: "text-[10px] px-1.5 py-0.5 bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 rounded font-black tracking-wider uppercase", children: "Sandbox" })] }), a.jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: "Simulated PSP authorization" })] })] }), a.jsx("button", { onClick: () => u("cancelled"), disabled: o, className: "p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors disabled:opacity-50", children: a.jsx(vt, { className: "w-5 h-5" }) })] }), a.jsxs("div", { className: "p-5 text-center bg-cyan-50/60 dark:bg-cyan-950/10 border border-dashed border-cyan-200 dark:border-cyan-900/50 rounded-2xl space-y-3", children: [a.jsx(yt, { className: "w-10 h-10 text-cyan-600 mx-auto" }), a.jsxs("div", { children: [a.jsx("h4", { className: "text-xs font-black text-gray-800 dark:text-white uppercase tracking-wider", children: "Awaiting Digital Euro Authorization" }), a.jsxs("p", { className: "text-[10px] text-gray-500 dark:text-gray-400 mt-1", children: ["A sandbox payment request for ", a.jsxs("span", { className: "font-extrabold text-cyan-700 dark:text-cyan-300", children: [H.currencySymbol, r.toFixed(2)] }), " is ready for simulated customer approval."] })] }), a.jsx("p", { className: "text-[10px] font-mono text-cyan-700 dark:text-cyan-300 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-cyan-100 dark:border-cyan-900/50 break-all select-all", children: e })] }), c && a.jsx("div", { className: "p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl text-xs font-bold text-amber-700 dark:text-amber-300 text-center", children: c }), a.jsxs("div", { className: "space-y-2", children: [a.jsxs("button", { onClick: () => u("succeeded"), disabled: o, className: "w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all disabled:opacity-60 flex items-center justify-center gap-2", children: [o ? a.jsx(je, { className: "w-4 h-4 animate-spin" }) : a.jsx(ze, { className: "w-4 h-4" }), "Simulate Approval"] }), a.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [a.jsx("button", { onClick: () => u("failed"), disabled: o, className: "py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-300 text-[10px] font-black uppercase tracking-wider hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors disabled:opacity-50", children: "Simulate Failure" }), a.jsx("button", { onClick: () => u("cancelled"), disabled: o, className: "py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-300 text-[10px] font-black uppercase tracking-wider hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50", children: "Cancel" })] })] })] }) });
}
function _i({ paymentId: t2, qrCodeData: e, redirectUrl: r, totalAmount: n, weroPhone: s, weroMode: o, onClose: i, onSuccess: c }) {
  const [d, u] = S.useState(false), [p, m] = S.useState(null), x = async (v) => {
    u(true), m(null);
    try {
      const { data: g, error: h } = await ee.functions.invoke("wero-checkout", { body: { action: "confirm", payment_id: t2, status: v } });
      if (h) throw new Error(h.message || "Failed to confirm Wero payment.");
      (g == null ? void 0 : g.status) === "succeeded" ? c(g.order_id) : (m(`Payment simulation completed with status: ${(g == null ? void 0 : g.status) || v}`), u(false), (v === "cancelled" || v === "failed") && setTimeout(() => {
        i(v);
      }, 1500));
    } catch (g) {
      console.error("Wero simulation error:", g), m(g.message || "Simulation request failed."), u(false);
    }
  }, y = r && r.includes("worldline-solutions.com");
  return a.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto", children: a.jsxs(M.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsxs("div", { className: "flex items-center gap-2.5", children: [a.jsx("div", { className: "p-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl animate-pulse", children: a.jsx(Ke, { className: "w-5 h-5" }) }), a.jsxs("div", { children: [a.jsxs("h3", { className: "text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2", children: ["Wero Transfer ", a.jsx("span", { className: "text-[10px] px-1.5 py-0.5 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded font-black tracking-wider uppercase", children: y ? "Preprod" : "Sandbox" })] }), a.jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: "Fast and secure account-to-account transfer" })] })] }), a.jsx("button", { onClick: () => x("cancelled"), disabled: d, className: "p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors disabled:opacity-50", children: a.jsx(vt, { className: "w-5 h-5" }) })] }), o === "phone" ? a.jsxs("div", { className: "p-5 text-center bg-purple-50/50 dark:bg-purple-950/10 border border-dashed border-purple-200 dark:border-purple-900/50 rounded-2xl space-y-3", children: [a.jsx(Ke, { className: "w-10 h-10 text-purple-500 mx-auto animate-bounce" }), a.jsxs("div", { children: [a.jsx("h4", { className: "text-xs font-black text-gray-800 dark:text-white uppercase tracking-wider", children: "Pending Bank Authorization" }), a.jsxs("p", { className: "text-[10px] text-gray-500 dark:text-gray-400 mt-1", children: ["A transfer request for ", a.jsxs("span", { className: "font-extrabold text-purple-600 dark:text-purple-400", children: [H.currencySymbol, n.toFixed(2)] }), " has been sent to your Wero phone:"] }), a.jsx("p", { className: "text-sm font-mono font-bold text-purple-700 dark:text-purple-300 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-purple-100 dark:border-purple-900/50 inline-block mt-2 select-all", children: s })] }), y && a.jsx("div", { className: "pt-2", children: a.jsxs("a", { href: r, target: "_blank", rel: "noopener noreferrer", className: "w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-750 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all shadow-md hover:shadow-purple-500/25 flex items-center justify-center gap-1.5 group", children: [a.jsx("span", { children: "Proceed to Payment" }), a.jsx(nr, { className: "w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })] }) }), a.jsx("p", { className: "text-[10px] text-gray-400 dark:text-gray-500 italic pt-1", children: "Please open your participating banking app to authorize the instant transfer request." })] }) : a.jsxs("div", { className: "p-5 text-center bg-purple-50/50 dark:bg-purple-950/10 border border-dashed border-purple-200 dark:border-purple-900/50 rounded-2xl flex flex-col items-center gap-3", children: [a.jsx("div", { className: "p-4 bg-white rounded-2xl shadow-md border border-purple-100", children: a.jsx(mn, { className: "w-40 h-40 text-purple-900" }) }), a.jsxs("div", { children: [a.jsx("h4", { className: "text-xs font-black text-gray-800 dark:text-white uppercase tracking-wider", children: "Scan to Pay" }), a.jsxs("p", { className: "text-[10px] text-gray-500 dark:text-gray-400 mt-1", children: ["Scan this QR code with your banking app to instantly authorize a payment of ", a.jsxs("span", { className: "font-extrabold text-purple-600 dark:text-purple-400", children: [H.currencySymbol, n.toFixed(2)] }), "."] })] }), y && a.jsxs("a", { href: r, target: "_blank", rel: "noopener noreferrer", className: "w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-750 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all shadow-md hover:shadow-purple-500/25 flex items-center justify-center gap-1.5 group", children: [a.jsx("span", { children: "Proceed to Payment" }), a.jsx(nr, { className: "w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })] })] }), p && a.jsxs("div", { className: "p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 rounded-xl text-xs flex items-start gap-2", children: [a.jsx(Ve, { className: "w-4 h-4 shrink-0 mt-0.5" }), a.jsx("span", { children: p })] }), a.jsxs("div", { className: "space-y-2.5", children: [a.jsx("p", { className: "text-[9px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest text-center", children: y ? "Verification & Control" : "Testing / Sandbox Controls" }), a.jsxs("div", { className: "grid grid-cols-2 gap-2.5", children: [a.jsx("button", { onClick: () => x("succeeded"), disabled: d, className: `py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50 ${y ? "bg-purple-600 hover:bg-purple-700 text-white hover:shadow-purple-500/20" : "bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-emerald-500/20"}`, children: d ? a.jsx(je, { className: "w-3.5 h-3.5 animate-spin" }) : a.jsxs(a.Fragment, { children: [a.jsx(ze, { className: "w-3.5 h-3.5" }), y ? "Verify Payment" : "Simulate Success"] }) }), a.jsx("button", { onClick: () => x("failed"), disabled: d, className: "py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-rose-500/20 flex items-center justify-center gap-1.5 disabled:opacity-50", children: d ? a.jsx(je, { className: "w-3.5 h-3.5 animate-spin" }) : a.jsxs(a.Fragment, { children: [a.jsx(Ve, { className: "w-3.5 h-3.5" }), y ? "Check Failure" : "Simulate Failure"] }) })] }), a.jsx("button", { onClick: () => x("cancelled"), disabled: d, className: "w-full py-2.5 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors disabled:opacity-50", children: "Cancel Payment Request" })] })] }) });
}
export {
  nc as Checkout
};
