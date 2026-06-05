var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { c as Yt, a2 as kr, a3 as qt, a4 as tt, a5 as Zn, R as F, a as J, r as S, b as es, l as ts, j as o, a6 as $e, f as rs, m as W, h as ns, U as ss, J as as, Q as Sr, A as At, a7 as os, L as Ae, k as is, v as ye, y as Me, E as Ht, i as cs, X as Qt, G as Rt } from "./index-BxPEZ9rT.js";
import { r as ls, D as Er, f as qe, S as ct, c as ds, t as us, n as ps, a as hs, b as fs, d as ms, e as xs, g as gs, h as Ot, i as ys, j as bs, P as Nr, k as ws, l as vs, m as ks, o as Ss, p as Es, q as rn, Q as nn, B as Tt, T as Ns } from "./index-B_cgxkGd.js";
import { A as js } from "./arrow-left-_rv7_lUG.js";
import { H as Cs } from "./hash-O4L7bSFR.js";
import { C as rt } from "./circle-check-Cmci_Dec.js";
import { C as He } from "./credit-card-2Kcm0aY6.js";
import { S as _s } from "./shopping-cart-D--ylWl1.js";
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const As = [["circle", { cx: "8", cy: "8", r: "6", key: "3yglwk" }], ["path", { d: "M18.09 10.37A6 6 0 1 1 10.34 18", key: "t5s6rm" }], ["path", { d: "M7 6h1v4", key: "1obek4" }], ["path", { d: "m16.71 13.88.7.71-2.82 2.82", key: "1rbuyh" }]], jr = Yt("coins", As);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Rs = [["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }], ["path", { d: "M12 18h.01", key: "mhygvu" }]], ze = Yt("smartphone", Rs);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Os = [["path", { d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1", key: "18etb6" }], ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]], Cr = Yt("wallet", Os);
function sn(t2, e) {
  return function() {
    return t2.apply(e, arguments);
  };
}
const { toString: Ts } = Object.prototype, { getPrototypeOf: dt } = Object, { iterator: ut, toStringTag: an } = Symbol, pt = /* @__PURE__ */ ((t2) => (e) => {
  const r = Ts.call(e);
  return t2[r] || (t2[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), ue = (t2) => (t2 = t2.toLowerCase(), (e) => pt(e) === t2), ht = (t2) => (e) => typeof e === t2, { isArray: Ne } = Array, Re = ht("undefined");
function Te(t2) {
  return t2 !== null && !Re(t2) && t2.constructor !== null && !Re(t2.constructor) && ae(t2.constructor.isBuffer) && t2.constructor.isBuffer(t2);
}
const on = ue("ArrayBuffer");
function Ps(t2) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t2) : e = t2 && t2.buffer && on(t2.buffer), e;
}
const Is = ht("string"), ae = ht("function"), cn = ht("number"), Ve = (t2) => t2 !== null && typeof t2 == "object", Fs = (t2) => t2 === true || t2 === false, nt = (t2) => {
  if (pt(t2) !== "object") return false;
  const e = dt(t2);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(an in t2) && !(ut in t2);
}, Bs = (t2) => {
  if (!Ve(t2) || Te(t2)) return false;
  try {
    return Object.keys(t2).length === 0 && Object.getPrototypeOf(t2) === Object.prototype;
  } catch {
    return false;
  }
}, Ds = ue("Date"), Us = ue("File"), Ls = (t2) => !!(t2 && typeof t2.uri < "u"), $s = (t2) => t2 && typeof t2.getParts < "u", Ms = ue("Blob"), qs = ue("FileList"), Hs = (t2) => Ve(t2) && ae(t2.pipe);
function zs() {
  return typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof qt < "u" ? qt : {};
}
const _r = zs(), Ar = typeof _r.FormData < "u" ? _r.FormData : void 0, Vs = (t2) => {
  if (!t2) return false;
  if (Ar && t2 instanceof Ar) return true;
  const e = dt(t2);
  if (!e || e === Object.prototype || !ae(t2.append)) return false;
  const r = pt(t2);
  return r === "formdata" || r === "object" && ae(t2.toString) && t2.toString() === "[object FormData]";
}, Ws = ue("URLSearchParams"), [Js, Ks, Xs, Gs] = ["ReadableStream", "Request", "Response", "Headers"].map(ue), Ys = (t2) => t2.trim ? t2.trim() : t2.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function We(t2, e, { allOwnKeys: r = false } = {}) {
  if (t2 === null || typeof t2 > "u") return;
  let n, s;
  if (typeof t2 != "object" && (t2 = [t2]), Ne(t2)) for (n = 0, s = t2.length; n < s; n++) e.call(null, t2[n], n, t2);
  else {
    if (Te(t2)) return;
    const a = r ? Object.getOwnPropertyNames(t2) : Object.keys(t2), i = a.length;
    let c;
    for (n = 0; n < i; n++) c = a[n], e.call(null, t2[c], c, t2);
  }
}
function ln(t2, e) {
  if (Te(t2)) return null;
  e = e.toLowerCase();
  const r = Object.keys(t2);
  let n = r.length, s;
  for (; n-- > 0; ) if (s = r[n], e === s.toLowerCase()) return s;
  return null;
}
const Se = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : qt, dn = (t2) => !Re(t2) && t2 !== Se;
function zt(...t2) {
  const { caseless: e, skipUndefined: r } = dn(this) && this || {}, n = {}, s = (a, i) => {
    if (i === "__proto__" || i === "constructor" || i === "prototype") return;
    const c = e && typeof i == "string" && ln(n, i) || i, d = Vt(n, c) ? n[c] : void 0;
    nt(d) && nt(a) ? n[c] = zt(d, a) : nt(a) ? n[c] = zt({}, a) : Ne(a) ? n[c] = a.slice() : (!r || !Re(a)) && (n[c] = a);
  };
  for (let a = 0, i = t2.length; a < i; a++) {
    const c = t2[a];
    if (!c || Te(c) || (We(c, s), typeof c != "object" || Ne(c))) continue;
    const d = Object.getOwnPropertySymbols(c);
    for (let u = 0; u < d.length; u++) {
      const p = d[u];
      la.call(c, p) && s(c[p], p);
    }
  }
  return n;
}
const Qs = (t2, e, r, { allOwnKeys: n } = {}) => (We(e, (s, a) => {
  r && ae(s) ? Object.defineProperty(t2, a, { __proto__: null, value: sn(s, r), writable: true, enumerable: true, configurable: true }) : Object.defineProperty(t2, a, { __proto__: null, value: s, writable: true, enumerable: true, configurable: true });
}, { allOwnKeys: n }), t2), Zs = (t2) => (t2.charCodeAt(0) === 65279 && (t2 = t2.slice(1)), t2), ea = (t2, e, r, n) => {
  t2.prototype = Object.create(e.prototype, n), Object.defineProperty(t2.prototype, "constructor", { __proto__: null, value: t2, writable: true, enumerable: false, configurable: true }), Object.defineProperty(t2, "super", { __proto__: null, value: e.prototype }), r && Object.assign(t2.prototype, r);
}, ta = (t2, e, r, n) => {
  let s, a, i;
  const c = {};
  if (e = e || {}, t2 == null) return e;
  do {
    for (s = Object.getOwnPropertyNames(t2), a = s.length; a-- > 0; ) i = s[a], (!n || n(i, t2, e)) && !c[i] && (e[i] = t2[i], c[i] = true);
    t2 = r !== false && dt(t2);
  } while (t2 && (!r || r(t2, e)) && t2 !== Object.prototype);
  return e;
}, ra = (t2, e, r) => {
  t2 = String(t2), (r === void 0 || r > t2.length) && (r = t2.length), r -= e.length;
  const n = t2.indexOf(e, r);
  return n !== -1 && n === r;
}, na = (t2) => {
  if (!t2) return null;
  if (Ne(t2)) return t2;
  let e = t2.length;
  if (!cn(e)) return null;
  const r = new Array(e);
  for (; e-- > 0; ) r[e] = t2[e];
  return r;
}, sa = /* @__PURE__ */ ((t2) => (e) => t2 && e instanceof t2)(typeof Uint8Array < "u" && dt(Uint8Array)), aa = (t2, e) => {
  const n = (t2 && t2[ut]).call(t2);
  let s;
  for (; (s = n.next()) && !s.done; ) {
    const a = s.value;
    e.call(t2, a[0], a[1]);
  }
}, oa = (t2, e) => {
  let r;
  const n = [];
  for (; (r = t2.exec(e)) !== null; ) n.push(r);
  return n;
}, ia = ue("HTMLFormElement"), ca = (t2) => t2.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(r, n, s) {
  return n.toUpperCase() + s;
}), Vt = (({ hasOwnProperty: t2 }) => (e, r) => t2.call(e, r))(Object.prototype), { propertyIsEnumerable: la } = Object.prototype, da = ue("RegExp"), un = (t2, e) => {
  const r = Object.getOwnPropertyDescriptors(t2), n = {};
  We(r, (s, a) => {
    let i;
    (i = e(s, a, t2)) !== false && (n[a] = i || s);
  }), Object.defineProperties(t2, n);
}, ua = (t2) => {
  un(t2, (e, r) => {
    if (ae(t2) && ["arguments", "caller", "callee"].includes(r)) return false;
    const n = t2[r];
    if (ae(n)) {
      if (e.enumerable = false, "writable" in e) {
        e.writable = false;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, pa = (t2, e) => {
  const r = {}, n = (s) => {
    s.forEach((a) => {
      r[a] = true;
    });
  };
  return Ne(t2) ? n(t2) : n(String(t2).split(e)), r;
}, ha = () => {
}, fa = (t2, e) => t2 != null && Number.isFinite(t2 = +t2) ? t2 : e;
function ma(t2) {
  return !!(t2 && ae(t2.append) && t2[an] === "FormData" && t2[ut]);
}
const xa = (t2) => {
  const e = /* @__PURE__ */ new WeakSet(), r = (n) => {
    if (Ve(n)) {
      if (e.has(n)) return;
      if (Te(n)) return n;
      if (!("toJSON" in n)) {
        e.add(n);
        const s = Ne(n) ? [] : {};
        return We(n, (a, i) => {
          const c = r(a);
          !Re(c) && (s[i] = c);
        }), e.delete(n), s;
      }
    }
    return n;
  };
  return r(t2);
}, ga = ue("AsyncFunction"), ya = (t2) => t2 && (Ve(t2) || ae(t2)) && ae(t2.then) && ae(t2.catch), pn = ((t2, e) => t2 ? setImmediate : e ? ((r, n) => (Se.addEventListener("message", ({ source: s, data: a }) => {
  s === Se && a === r && n.length && n.shift()();
}, false), (s) => {
  n.push(s), Se.postMessage(r, "*");
}))(`axios@${Math.random()}`, []) : (r) => setTimeout(r))(typeof setImmediate == "function", ae(Se.postMessage)), ba = typeof queueMicrotask < "u" ? queueMicrotask.bind(Se) : typeof kr < "u" && kr.nextTick || pn, wa = (t2) => t2 != null && ae(t2[ut]), l = { isArray: Ne, isArrayBuffer: on, isBuffer: Te, isFormData: Vs, isArrayBufferView: Ps, isString: Is, isNumber: cn, isBoolean: Fs, isObject: Ve, isPlainObject: nt, isEmptyObject: Bs, isReadableStream: Js, isRequest: Ks, isResponse: Xs, isHeaders: Gs, isUndefined: Re, isDate: Ds, isFile: Us, isReactNativeBlob: Ls, isReactNative: $s, isBlob: Ms, isRegExp: da, isFunction: ae, isStream: Hs, isURLSearchParams: Ws, isTypedArray: sa, isFileList: qs, forEach: We, merge: zt, extend: Qs, trim: Ys, stripBOM: Zs, inherits: ea, toFlatObject: ta, kindOf: pt, kindOfTest: ue, endsWith: ra, toArray: na, forEachEntry: aa, matchAll: oa, isHTMLForm: ia, hasOwnProperty: Vt, hasOwnProp: Vt, reduceDescriptors: un, freezeMethods: ua, toObjectSet: pa, toCamelCase: ca, noop: ha, toFiniteNumber: fa, findKey: ln, global: Se, isContextDefined: dn, isSpecCompliantForm: ma, toJSONObject: xa, isAsyncFn: ga, isThenable: ya, setImmediate: pn, asap: ba, isIterable: wa }, va = l.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]), ka = (t2) => {
  const e = {};
  let r, n, s;
  return t2 && t2.split(`
`).forEach(function(i) {
    s = i.indexOf(":"), r = i.substring(0, s).trim().toLowerCase(), n = i.substring(s + 1).trim(), !(!r || e[r] && va[r]) && (r === "set-cookie" ? e[r] ? e[r].push(n) : e[r] = [n] : e[r] = e[r] ? e[r] + ", " + n : n);
  }), e;
};
function Sa(t2) {
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
const Ea = new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+", "g"), Na = new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+", "g");
function Zt(t2, e) {
  return l.isArray(t2) ? t2.map((r) => Zt(r, e)) : Sa(String(t2).replace(e, ""));
}
const ja = (t2) => Zt(t2, Ea), Ca = (t2) => Zt(t2, Na);
function hn(t2) {
  const e = /* @__PURE__ */ Object.create(null);
  return l.forEach(t2.toJSON(), (r, n) => {
    e[n] = Ca(r);
  }), e;
}
const Rr = Symbol("internals");
function De(t2) {
  return t2 && String(t2).trim().toLowerCase();
}
function st(t2) {
  return t2 === false || t2 == null ? t2 : l.isArray(t2) ? t2.map(st) : ja(String(t2));
}
function _a(t2) {
  const e = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(t2); ) e[n[1]] = n[2];
  return e;
}
const Aa = (t2) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t2.trim());
function Pt(t2, e, r, n, s) {
  if (l.isFunction(n)) return n.call(this, e, r);
  if (s && (e = r), !!l.isString(e)) {
    if (l.isString(n)) return e.indexOf(n) !== -1;
    if (l.isRegExp(n)) return n.test(e);
  }
}
function Ra(t2) {
  return t2.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, r, n) => r.toUpperCase() + n);
}
function Oa(t2, e) {
  const r = l.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(t2, n + r, { __proto__: null, value: function(s, a, i) {
      return this[n].call(this, e, s, a, i);
    }, configurable: true });
  });
}
let re = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, r, n) {
    const s = this;
    function a(c, d, u) {
      const p = De(d);
      if (!p) return;
      const m = l.findKey(s, p);
      (!m || s[m] === void 0 || u === true || u === void 0 && s[m] !== false) && (s[m || d] = st(c));
    }
    const i = (c, d) => l.forEach(c, (u, p) => a(u, p, d));
    if (l.isPlainObject(e) || e instanceof this.constructor) i(e, r);
    else if (l.isString(e) && (e = e.trim()) && !Aa(e)) i(ka(e), r);
    else if (l.isObject(e) && l.isIterable(e)) {
      let c = {}, d, u;
      for (const p of e) {
        if (!l.isArray(p)) throw new TypeError("Object iterator must return a key-value pair");
        c[u = p[0]] = (d = c[u]) ? l.isArray(d) ? [...d, p[1]] : [d, p[1]] : p[1];
      }
      i(c, r);
    } else e != null && a(r, e, n);
    return this;
  }
  get(e, r) {
    if (e = De(e), e) {
      const n = l.findKey(this, e);
      if (n) {
        const s = this[n];
        if (!r) return s;
        if (r === true) return _a(s);
        if (l.isFunction(r)) return r.call(this, s, n);
        if (l.isRegExp(r)) return r.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, r) {
    if (e = De(e), e) {
      const n = l.findKey(this, e);
      return !!(n && this[n] !== void 0 && (!r || Pt(this, this[n], n, r)));
    }
    return false;
  }
  delete(e, r) {
    const n = this;
    let s = false;
    function a(i) {
      if (i = De(i), i) {
        const c = l.findKey(n, i);
        c && (!r || Pt(n, n[c], c, r)) && (delete n[c], s = true);
      }
    }
    return l.isArray(e) ? e.forEach(a) : a(e), s;
  }
  clear(e) {
    const r = Object.keys(this);
    let n = r.length, s = false;
    for (; n--; ) {
      const a = r[n];
      (!e || Pt(this, this[a], a, e, true)) && (delete this[a], s = true);
    }
    return s;
  }
  normalize(e) {
    const r = this, n = {};
    return l.forEach(this, (s, a) => {
      const i = l.findKey(n, a);
      if (i) {
        r[i] = st(s), delete r[a];
        return;
      }
      const c = e ? Ra(a) : String(a).trim();
      c !== a && delete r[a], r[c] = st(s), n[c] = true;
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
    const n = (this[Rr] = this[Rr] = { accessors: {} }).accessors, s = this.prototype;
    function a(i) {
      const c = De(i);
      n[c] || (Oa(s, i), n[c] = true);
    }
    return l.isArray(e) ? e.forEach(a) : a(e), this;
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
const Ta = "[REDACTED ****]";
function Pa(t2) {
  if (l.hasOwnProp(t2, "toJSON")) return true;
  let e = Object.getPrototypeOf(t2);
  for (; e && e !== Object.prototype; ) {
    if (l.hasOwnProp(e, "toJSON")) return true;
    e = Object.getPrototypeOf(e);
  }
  return false;
}
function Ia(t2, e) {
  const r = new Set(e.map((a) => String(a).toLowerCase())), n = [], s = (a) => {
    if (a === null || typeof a != "object" || l.isBuffer(a)) return a;
    if (n.indexOf(a) !== -1) return;
    a instanceof re && (a = a.toJSON()), n.push(a);
    let i;
    if (l.isArray(a)) i = [], a.forEach((c, d) => {
      const u = s(c);
      l.isUndefined(u) || (i[d] = u);
    });
    else {
      if (!l.isPlainObject(a) && Pa(a)) return n.pop(), a;
      i = /* @__PURE__ */ Object.create(null);
      for (const [c, d] of Object.entries(a)) {
        const u = r.has(c.toLowerCase()) ? Ta : s(d);
        l.isUndefined(u) || (i[c] = u);
      }
    }
    return n.pop(), i;
  };
  return s(t2);
}
let v = class fn extends Error {
  static from(e, r, n, s, a, i) {
    const c = new fn(e.message, r || e.code, n, s, a);
    return c.cause = e, c.name = e.name, e.status != null && c.status == null && (c.status = e.status), i && Object.assign(c, i), c;
  }
  constructor(e, r, n, s, a) {
    super(e), Object.defineProperty(this, "message", { __proto__: null, value: e, enumerable: true, writable: true, configurable: true }), this.name = "AxiosError", this.isAxiosError = true, r && (this.code = r), n && (this.config = n), s && (this.request = s), a && (this.response = a, this.status = a.status);
  }
  toJSON() {
    const e = this.config, r = e && l.hasOwnProp(e, "redact") ? e.redact : void 0, n = l.isArray(r) && r.length > 0 ? Ia(e, r) : l.toJSONObject(e);
    return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: n, code: this.code, status: this.status };
  }
};
v.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
v.ERR_BAD_OPTION = "ERR_BAD_OPTION";
v.ECONNABORTED = "ECONNABORTED";
v.ETIMEDOUT = "ETIMEDOUT";
v.ECONNREFUSED = "ECONNREFUSED";
v.ERR_NETWORK = "ERR_NETWORK";
v.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
v.ERR_DEPRECATED = "ERR_DEPRECATED";
v.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
v.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
v.ERR_CANCELED = "ERR_CANCELED";
v.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
v.ERR_INVALID_URL = "ERR_INVALID_URL";
v.ERR_FORM_DATA_DEPTH_EXCEEDED = "ERR_FORM_DATA_DEPTH_EXCEEDED";
const Fa = null;
function Wt(t2) {
  return l.isPlainObject(t2) || l.isArray(t2);
}
function mn(t2) {
  return l.endsWith(t2, "[]") ? t2.slice(0, -2) : t2;
}
function It(t2, e, r) {
  return t2 ? t2.concat(e).map(function(s, a) {
    return s = mn(s), !r && a ? "[" + s + "]" : s;
  }).join(r ? "." : "") : e;
}
function Ba(t2) {
  return l.isArray(t2) && !t2.some(Wt);
}
const Da = l.toFlatObject(l, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function ft(t2, e, r) {
  if (!l.isObject(t2)) throw new TypeError("target must be an object");
  e = e || new FormData(), r = l.toFlatObject(r, { metaTokens: true, dots: false, indexes: false }, false, function(f, y) {
    return !l.isUndefined(y[f]);
  });
  const n = r.metaTokens, s = r.visitor || m, a = r.dots, i = r.indexes, c = r.Blob || typeof Blob < "u" && Blob, d = r.maxDepth === void 0 ? 100 : r.maxDepth, u = c && l.isSpecCompliantForm(e);
  if (!l.isFunction(s)) throw new TypeError("visitor must be a function");
  function p(h) {
    if (h === null) return "";
    if (l.isDate(h)) return h.toISOString();
    if (l.isBoolean(h)) return h.toString();
    if (!u && l.isBlob(h)) throw new v("Blob is not supported. Use a Buffer instead.");
    return l.isArrayBuffer(h) || l.isTypedArray(h) ? u && typeof Blob == "function" ? new Blob([h]) : tt.from(h) : h;
  }
  function m(h, f, y) {
    let _ = h;
    if (l.isReactNative(e) && l.isReactNativeBlob(h)) return e.append(It(y, f, a), p(h)), false;
    if (h && !y && typeof h == "object") {
      if (l.endsWith(f, "{}")) f = n ? f : f.slice(0, -2), h = JSON.stringify(h);
      else if (l.isArray(h) && Ba(h) || (l.isFileList(h) || l.endsWith(f, "[]")) && (_ = l.toArray(h))) return f = mn(f), _.forEach(function(N, O) {
        !(l.isUndefined(N) || N === null) && e.append(i === true ? It([f], O, a) : i === null ? f : f + "[]", p(N));
      }), false;
    }
    return Wt(h) ? true : (e.append(It(y, f, a), p(h)), false);
  }
  const b = [], g = Object.assign(Da, { defaultVisitor: m, convertValue: p, isVisitable: Wt });
  function k(h, f, y = 0) {
    if (!l.isUndefined(h)) {
      if (y > d) throw new v("Object is too deeply nested (" + y + " levels). Max depth: " + d, v.ERR_FORM_DATA_DEPTH_EXCEEDED);
      if (b.indexOf(h) !== -1) throw new Error("Circular reference detected in " + f.join("."));
      b.push(h), l.forEach(h, function(j, N) {
        (!(l.isUndefined(j) || j === null) && s.call(e, j, l.isString(N) ? N.trim() : N, f, g)) === true && k(j, f ? f.concat(N) : [N], y + 1);
      }), b.pop();
    }
  }
  if (!l.isObject(t2)) throw new TypeError("data must be an object");
  return k(t2), e;
}
function Or(t2) {
  const e = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+" };
  return encodeURIComponent(t2).replace(/[!'()~]|%20/g, function(n) {
    return e[n];
  });
}
function er(t2, e) {
  this._pairs = [], t2 && ft(t2, this, e);
}
const xn = er.prototype;
xn.append = function(e, r) {
  this._pairs.push([e, r]);
};
xn.toString = function(e) {
  const r = e ? function(n) {
    return e.call(this, n, Or);
  } : Or;
  return this._pairs.map(function(s) {
    return r(s[0]) + "=" + r(s[1]);
  }, "").join("&");
};
function Ua(t2) {
  return encodeURIComponent(t2).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function gn(t2, e, r) {
  if (!e) return t2;
  const n = r && r.encode || Ua, s = l.isFunction(r) ? { serialize: r } : r, a = s && s.serialize;
  let i;
  if (a ? i = a(e, s) : i = l.isURLSearchParams(e) ? e.toString() : new er(e, s).toString(n), i) {
    const c = t2.indexOf("#");
    c !== -1 && (t2 = t2.slice(0, c)), t2 += (t2.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return t2;
}
class Tr {
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
const tr = { silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false, legacyInterceptorReqResOrdering: true, advertiseZstdAcceptEncoding: false }, La = typeof URLSearchParams < "u" ? URLSearchParams : er, $a = typeof FormData < "u" ? FormData : null, Ma = typeof Blob < "u" ? Blob : null, qa = { isBrowser: true, classes: { URLSearchParams: La, FormData: $a, Blob: Ma }, protocols: ["http", "https", "file", "blob", "url", "data"] }, rr = typeof window < "u" && typeof document < "u", Jt = typeof navigator == "object" && navigator || void 0, Ha = rr && (!Jt || ["ReactNative", "NativeScript", "NS"].indexOf(Jt.product) < 0), za = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Va = rr && window.location.href || "http://localhost", Wa = Object.freeze(Object.defineProperty({ __proto__: null, hasBrowserEnv: rr, hasStandardBrowserEnv: Ha, hasStandardBrowserWebWorkerEnv: za, navigator: Jt, origin: Va }, Symbol.toStringTag, { value: "Module" })), X = { ...Wa, ...qa };
function Ja(t2, e) {
  return ft(t2, new X.classes.URLSearchParams(), { visitor: function(r, n, s, a) {
    return X.isNode && l.isBuffer(r) ? (this.append(n, r.toString("base64")), false) : a.defaultVisitor.apply(this, arguments);
  }, ...e });
}
function Ka(t2) {
  return l.matchAll(/\w+|\[(\w*)]/g, t2).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function Xa(t2) {
  const e = {}, r = Object.keys(t2);
  let n;
  const s = r.length;
  let a;
  for (n = 0; n < s; n++) a = r[n], e[a] = t2[a];
  return e;
}
function yn(t2) {
  function e(r, n, s, a) {
    let i = r[a++];
    if (i === "__proto__") return true;
    const c = Number.isFinite(+i), d = a >= r.length;
    return i = !i && l.isArray(s) ? s.length : i, d ? (l.hasOwnProp(s, i) ? s[i] = l.isArray(s[i]) ? s[i].concat(n) : [s[i], n] : s[i] = n, !c) : ((!l.hasOwnProp(s, i) || !l.isObject(s[i])) && (s[i] = []), e(r, n, s[i], a) && l.isArray(s[i]) && (s[i] = Xa(s[i])), !c);
  }
  if (l.isFormData(t2) && l.isFunction(t2.entries)) {
    const r = {};
    return l.forEachEntry(t2, (n, s) => {
      e(Ka(n), s, r, 0);
    }), r;
  }
  return null;
}
const _e = (t2, e) => t2 != null && l.hasOwnProp(t2, e) ? t2[e] : void 0;
function Ga(t2, e, r) {
  if (l.isString(t2)) try {
    return (e || JSON.parse)(t2), l.trim(t2);
  } catch (n) {
    if (n.name !== "SyntaxError") throw n;
  }
  return (r || JSON.stringify)(t2);
}
const Je = { transitional: tr, adapter: ["xhr", "http", "fetch"], transformRequest: [function(e, r) {
  const n = r.getContentType() || "", s = n.indexOf("application/json") > -1, a = l.isObject(e);
  if (a && l.isHTMLForm(e) && (e = new FormData(e)), l.isFormData(e)) return s ? JSON.stringify(yn(e)) : e;
  if (l.isArrayBuffer(e) || l.isBuffer(e) || l.isStream(e) || l.isFile(e) || l.isBlob(e) || l.isReadableStream(e)) return e;
  if (l.isArrayBufferView(e)) return e.buffer;
  if (l.isURLSearchParams(e)) return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", false), e.toString();
  let c;
  if (a) {
    const d = _e(this, "formSerializer");
    if (n.indexOf("application/x-www-form-urlencoded") > -1) return Ja(e, d).toString();
    if ((c = l.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
      const u = _e(this, "env"), p = u && u.FormData;
      return ft(c ? { "files[]": e } : e, p && new p(), d);
    }
  }
  return a || s ? (r.setContentType("application/json", false), Ga(e)) : e;
}], transformResponse: [function(e) {
  const r = _e(this, "transitional") || Je.transitional, n = r && r.forcedJSONParsing, s = _e(this, "responseType"), a = s === "json";
  if (l.isResponse(e) || l.isReadableStream(e)) return e;
  if (e && l.isString(e) && (n && !s || a)) {
    const c = !(r && r.silentJSONParsing) && a;
    try {
      return JSON.parse(e, _e(this, "parseReviver"));
    } catch (d) {
      if (c) throw d.name === "SyntaxError" ? v.from(d, v.ERR_BAD_RESPONSE, this, null, _e(this, "response")) : d;
    }
  }
  return e;
}], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, maxBodyLength: -1, env: { FormData: X.classes.FormData, Blob: X.classes.Blob }, validateStatus: function(e) {
  return e >= 200 && e < 300;
}, headers: { common: { Accept: "application/json, text/plain, */*", "Content-Type": void 0 } } };
l.forEach(["delete", "get", "head", "post", "put", "patch", "query"], (t2) => {
  Je.headers[t2] = {};
});
function Ft(t2, e) {
  const r = this || Je, n = e || r, s = re.from(n.headers);
  let a = n.data;
  return l.forEach(t2, function(c) {
    a = c.call(r, a, s.normalize(), e ? e.status : void 0);
  }), s.normalize(), a;
}
function bn(t2) {
  return !!(t2 && t2.__CANCEL__);
}
let Ke = class extends v {
  constructor(e, r, n) {
    super(e ?? "canceled", v.ERR_CANCELED, r, n), this.name = "CanceledError", this.__CANCEL__ = true;
  }
};
function wn(t2, e, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? t2(r) : e(new v("Request failed with status code " + r.status, r.status >= 400 && r.status < 500 ? v.ERR_BAD_REQUEST : v.ERR_BAD_RESPONSE, r.config, r.request, r));
}
function Ya(t2) {
  const e = /^([-+\w]{1,25}):(?:\/\/)?/.exec(t2);
  return e && e[1] || "";
}
function Qa(t2, e) {
  t2 = t2 || 10;
  const r = new Array(t2), n = new Array(t2);
  let s = 0, a = 0, i;
  return e = e !== void 0 ? e : 1e3, function(d) {
    const u = Date.now(), p = n[a];
    i || (i = u), r[s] = d, n[s] = u;
    let m = a, b = 0;
    for (; m !== s; ) b += r[m++], m = m % t2;
    if (s = (s + 1) % t2, s === a && (a = (a + 1) % t2), u - i < e) return;
    const g = p && u - p;
    return g ? Math.round(b * 1e3 / g) : void 0;
  };
}
function Za(t2, e) {
  let r = 0, n = 1e3 / e, s, a;
  const i = (u, p = Date.now()) => {
    r = p, s = null, a && (clearTimeout(a), a = null), t2(...u);
  };
  return [(...u) => {
    const p = Date.now(), m = p - r;
    m >= n ? i(u, p) : (s = u, a || (a = setTimeout(() => {
      a = null, i(s);
    }, n - m)));
  }, () => s && i(s)];
}
const lt = (t2, e, r = 3) => {
  let n = 0;
  const s = Qa(50, 250);
  return Za((a) => {
    if (!a || typeof a.loaded != "number") return;
    const i = a.loaded, c = a.lengthComputable ? a.total : void 0, d = c != null ? Math.min(i, c) : i, u = Math.max(0, d - n), p = s(u);
    n = Math.max(n, d);
    const m = { loaded: d, total: c, progress: c ? d / c : void 0, bytes: u, rate: p || void 0, estimated: p && c ? (c - d) / p : void 0, event: a, lengthComputable: c != null, [e ? "download" : "upload"]: true };
    t2(m);
  }, r);
}, Pr = (t2, e) => {
  const r = t2 != null;
  return [(n) => e[0]({ lengthComputable: r, total: t2, loaded: n }), e[1]];
}, Ir = (t2) => (...e) => l.asap(() => t2(...e)), eo = X.hasStandardBrowserEnv ? /* @__PURE__ */ ((t2, e) => (r) => (r = new URL(r, X.origin), t2.protocol === r.protocol && t2.host === r.host && (e || t2.port === r.port)))(new URL(X.origin), X.navigator && /(msie|trident)/i.test(X.navigator.userAgent)) : () => true, to = X.hasStandardBrowserEnv ? { write(t2, e, r, n, s, a, i) {
  if (typeof document > "u") return;
  const c = [`${t2}=${encodeURIComponent(e)}`];
  l.isNumber(r) && c.push(`expires=${new Date(r).toUTCString()}`), l.isString(n) && c.push(`path=${n}`), l.isString(s) && c.push(`domain=${s}`), a === true && c.push("secure"), l.isString(i) && c.push(`SameSite=${i}`), document.cookie = c.join("; ");
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
function ro(t2) {
  return typeof t2 != "string" ? false : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t2);
}
function no(t2, e) {
  return e ? t2.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : t2;
}
function vn(t2, e, r) {
  let n = !ro(e);
  return t2 && (n || r === false) ? no(t2, e) : e;
}
const Fr = (t2) => t2 instanceof re ? { ...t2 } : t2;
function je(t2, e) {
  e = e || {};
  const r = /* @__PURE__ */ Object.create(null);
  Object.defineProperty(r, "hasOwnProperty", { __proto__: null, value: Object.prototype.hasOwnProperty, enumerable: false, writable: true, configurable: true });
  function n(u, p, m, b) {
    return l.isPlainObject(u) && l.isPlainObject(p) ? l.merge.call({ caseless: b }, u, p) : l.isPlainObject(p) ? l.merge({}, p) : l.isArray(p) ? p.slice() : p;
  }
  function s(u, p, m, b) {
    if (l.isUndefined(p)) {
      if (!l.isUndefined(u)) return n(void 0, u, m, b);
    } else return n(u, p, m, b);
  }
  function a(u, p) {
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
  const d = { url: a, method: a, data: a, baseURL: i, transformRequest: i, transformResponse: i, paramsSerializer: i, timeout: i, timeoutMessage: i, withCredentials: i, withXSRFToken: i, adapter: i, responseType: i, xsrfCookieName: i, xsrfHeaderName: i, onUploadProgress: i, onDownloadProgress: i, decompress: i, maxContentLength: i, maxBodyLength: i, beforeRedirect: i, transport: i, httpAgent: i, httpsAgent: i, cancelToken: i, socketPath: i, allowedSocketPaths: i, responseEncoding: i, validateStatus: c, headers: (u, p, m) => s(Fr(u), Fr(p), m, true) };
  return l.forEach(Object.keys({ ...t2, ...e }), function(p) {
    if (p === "__proto__" || p === "constructor" || p === "prototype") return;
    const m = l.hasOwnProp(d, p) ? d[p] : s, b = l.hasOwnProp(t2, p) ? t2[p] : void 0, g = l.hasOwnProp(e, p) ? e[p] : void 0, k = m(b, g, p);
    l.isUndefined(k) && m !== c || (r[p] = k);
  }), r;
}
const so = ["content-type", "content-length"];
function ao(t2, e, r) {
  if (r !== "content-only") {
    t2.set(e);
    return;
  }
  Object.entries(e).forEach(([n, s]) => {
    so.includes(n.toLowerCase()) && t2.set(n, s);
  });
}
const oo = (t2) => encodeURIComponent(t2).replace(/%([0-9A-F]{2})/gi, (e, r) => String.fromCharCode(parseInt(r, 16)));
function kn(t2) {
  const e = je({}, t2), r = (b) => l.hasOwnProp(e, b) ? e[b] : void 0, n = r("data");
  let s = r("withXSRFToken");
  const a = r("xsrfHeaderName"), i = r("xsrfCookieName");
  let c = r("headers");
  const d = r("auth"), u = r("baseURL"), p = r("allowAbsoluteUrls"), m = r("url");
  if (e.headers = c = re.from(c), e.url = gn(vn(u, m, p), r("params"), r("paramsSerializer")), d && c.set("Authorization", "Basic " + btoa((d.username || "") + ":" + (d.password ? oo(d.password) : ""))), l.isFormData(n) && (X.hasStandardBrowserEnv || X.hasStandardBrowserWebWorkerEnv || l.isReactNative(n) ? c.setContentType(void 0) : l.isFunction(n.getHeaders) && ao(c, n.getHeaders(), r("formDataHeaderPolicy"))), X.hasStandardBrowserEnv && (l.isFunction(s) && (s = s(e)), s === true || s == null && eo(e.url))) {
    const g = a && i && to.read(i);
    g && c.set(a, g);
  }
  return e;
}
const io = typeof XMLHttpRequest < "u", co = io && function(t2) {
  return new Promise(function(r, n) {
    const s = kn(t2);
    let a = s.data;
    const i = re.from(s.headers).normalize();
    let { responseType: c, onUploadProgress: d, onDownloadProgress: u } = s, p, m, b, g, k;
    function h() {
      g && g(), k && k(), s.cancelToken && s.cancelToken.unsubscribe(p), s.signal && s.signal.removeEventListener("abort", p);
    }
    let f = new XMLHttpRequest();
    f.open(s.method.toUpperCase(), s.url, true), f.timeout = s.timeout;
    function y() {
      if (!f) return;
      const j = re.from("getAllResponseHeaders" in f && f.getAllResponseHeaders()), O = { data: !c || c === "text" || c === "json" ? f.responseText : f.response, status: f.status, statusText: f.statusText, headers: j, config: t2, request: f };
      wn(function(ie) {
        r(ie), h();
      }, function(ie) {
        n(ie), h();
      }, O), f = null;
    }
    "onloadend" in f ? f.onloadend = y : f.onreadystatechange = function() {
      !f || f.readyState !== 4 || f.status === 0 && !(f.responseURL && f.responseURL.startsWith("file:")) || setTimeout(y);
    }, f.onabort = function() {
      f && (n(new v("Request aborted", v.ECONNABORTED, t2, f)), h(), f = null);
    }, f.onerror = function(N) {
      const O = N && N.message ? N.message : "Network Error", I = new v(O, v.ERR_NETWORK, t2, f);
      I.event = N || null, n(I), h(), f = null;
    }, f.ontimeout = function() {
      let N = s.timeout ? "timeout of " + s.timeout + "ms exceeded" : "timeout exceeded";
      const O = s.transitional || tr;
      s.timeoutErrorMessage && (N = s.timeoutErrorMessage), n(new v(N, O.clarifyTimeoutError ? v.ETIMEDOUT : v.ECONNABORTED, t2, f)), h(), f = null;
    }, a === void 0 && i.setContentType(null), "setRequestHeader" in f && l.forEach(hn(i), function(N, O) {
      f.setRequestHeader(O, N);
    }), l.isUndefined(s.withCredentials) || (f.withCredentials = !!s.withCredentials), c && c !== "json" && (f.responseType = s.responseType), u && ([b, k] = lt(u, true), f.addEventListener("progress", b)), d && f.upload && ([m, g] = lt(d), f.upload.addEventListener("progress", m), f.upload.addEventListener("loadend", g)), (s.cancelToken || s.signal) && (p = (j) => {
      f && (n(!j || j.type ? new Ke(null, t2, f) : j), f.abort(), h(), f = null);
    }, s.cancelToken && s.cancelToken.subscribe(p), s.signal && (s.signal.aborted ? p() : s.signal.addEventListener("abort", p)));
    const _ = Ya(s.url);
    if (_ && !X.protocols.includes(_)) {
      n(new v("Unsupported protocol " + _ + ":", v.ERR_BAD_REQUEST, t2));
      return;
    }
    f.send(a || null);
  });
}, lo = (t2, e) => {
  if (t2 = t2 ? t2.filter(Boolean) : [], !e && !t2.length) return;
  const r = new AbortController();
  let n = false;
  const s = function(d) {
    if (!n) {
      n = true, i();
      const u = d instanceof Error ? d : this.reason;
      r.abort(u instanceof v ? u : new Ke(u instanceof Error ? u.message : u));
    }
  };
  let a = e && setTimeout(() => {
    a = null, s(new v(`timeout of ${e}ms exceeded`, v.ETIMEDOUT));
  }, e);
  const i = () => {
    t2 && (a && clearTimeout(a), a = null, t2.forEach((d) => {
      d.unsubscribe ? d.unsubscribe(s) : d.removeEventListener("abort", s);
    }), t2 = null);
  };
  t2.forEach((d) => d.addEventListener("abort", s));
  const { signal: c } = r;
  return c.unsubscribe = () => l.asap(i), c;
}, uo = function* (t2, e) {
  let r = t2.byteLength;
  if (r < e) {
    yield t2;
    return;
  }
  let n = 0, s;
  for (; n < r; ) s = n + e, yield t2.slice(n, s), n = s;
}, po = async function* (t2, e) {
  for await (const r of ho(t2)) yield* uo(r, e);
}, ho = async function* (t2) {
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
}, Br = (t2, e, r, n) => {
  const s = po(t2, e);
  let a = 0, i, c = (d) => {
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
        let b = a += m;
        r(b);
      }
      d.enqueue(new Uint8Array(p));
    } catch (u) {
      throw c(u), u;
    }
  }, cancel(d) {
    return c(d), s.return();
  } }, { highWaterMark: 2 });
};
function fo(t2) {
  if (!t2 || typeof t2 != "string" || !t2.startsWith("data:")) return 0;
  const e = t2.indexOf(",");
  if (e < 0) return 0;
  const r = t2.slice(5, e), n = t2.slice(e + 1);
  if (/;base64/i.test(r)) {
    let i = n.length;
    const c = n.length;
    for (let g = 0; g < c; g++) if (n.charCodeAt(g) === 37 && g + 2 < c) {
      const k = n.charCodeAt(g + 1), h = n.charCodeAt(g + 2);
      (k >= 48 && k <= 57 || k >= 65 && k <= 70 || k >= 97 && k <= 102) && (h >= 48 && h <= 57 || h >= 65 && h <= 70 || h >= 97 && h <= 102) && (i -= 2, g += 2);
    }
    let d = 0, u = c - 1;
    const p = (g) => g >= 2 && n.charCodeAt(g - 2) === 37 && n.charCodeAt(g - 1) === 51 && (n.charCodeAt(g) === 68 || n.charCodeAt(g) === 100);
    u >= 0 && (n.charCodeAt(u) === 61 ? (d++, u--) : p(u) && (d++, u -= 3)), d === 1 && u >= 0 && (n.charCodeAt(u) === 61 || p(u)) && d++;
    const b = Math.floor(i / 4) * 3 - (d || 0);
    return b > 0 ? b : 0;
  }
  if (typeof tt < "u" && typeof tt.byteLength == "function") return tt.byteLength(n, "utf8");
  let a = 0;
  for (let i = 0, c = n.length; i < c; i++) {
    const d = n.charCodeAt(i);
    if (d < 128) a += 1;
    else if (d < 2048) a += 2;
    else if (d >= 55296 && d <= 56319 && i + 1 < c) {
      const u = n.charCodeAt(i + 1);
      u >= 56320 && u <= 57343 ? (a += 4, i++) : a += 3;
    } else a += 3;
  }
  return a;
}
const nr = "1.17.0", Dr = 64 * 1024, { isFunction: Ye } = l, mo = (t2) => encodeURIComponent(t2).replace(/%([0-9A-F]{2})/gi, (e, r) => String.fromCharCode(parseInt(r, 16))), Ur = (t2) => {
  if (!l.isString(t2)) return t2;
  try {
    return decodeURIComponent(t2);
  } catch {
    return t2;
  }
}, Lr = (t2, ...e) => {
  try {
    return !!t2(...e);
  } catch {
    return false;
  }
}, xo = (t2) => {
  const e = t2.indexOf("://");
  let r = t2;
  return e !== -1 && (r = r.slice(e + 3)), r.includes("@") || r.includes(":");
}, go = (t2) => {
  const e = l.global !== void 0 && l.global !== null ? l.global : globalThis, { ReadableStream: r, TextEncoder: n } = e;
  t2 = l.merge.call({ skipUndefined: true }, { Request: e.Request, Response: e.Response }, t2);
  const { fetch: s, Request: a, Response: i } = t2, c = s ? Ye(s) : typeof fetch == "function", d = Ye(a), u = Ye(i);
  if (!c) return false;
  const p = c && Ye(r), m = c && (typeof n == "function" ? /* @__PURE__ */ ((y) => (_) => y.encode(_))(new n()) : async (y) => new Uint8Array(await new a(y).arrayBuffer())), b = d && p && Lr(() => {
    let y = false;
    const _ = new a(X.origin, { body: new r(), method: "POST", get duplex() {
      return y = true, "half";
    } }), j = _.headers.has("Content-Type");
    return _.body != null && _.body.cancel(), y && !j;
  }), g = u && p && Lr(() => l.isReadableStream(new i("").body)), k = { stream: g && ((y) => y.body) };
  c && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((y) => {
    !k[y] && (k[y] = (_, j) => {
      let N = _ && _[y];
      if (N) return N.call(_);
      throw new v(`Response type '${y}' is not supported`, v.ERR_NOT_SUPPORT, j);
    });
  });
  const h = async (y) => {
    if (y == null) return 0;
    if (l.isBlob(y)) return y.size;
    if (l.isSpecCompliantForm(y)) return (await new a(X.origin, { method: "POST", body: y }).arrayBuffer()).byteLength;
    if (l.isArrayBufferView(y) || l.isArrayBuffer(y)) return y.byteLength;
    if (l.isURLSearchParams(y) && (y = y + ""), l.isString(y)) return (await m(y)).byteLength;
  }, f = async (y, _) => {
    const j = l.toFiniteNumber(y.getContentLength());
    return j ?? h(_);
  };
  return async (y) => {
    let { url: _, method: j, data: N, signal: O, cancelToken: I, timeout: ie, onDownloadProgress: ge, onUploadProgress: Pe, responseType: ce, headers: oe, withCredentials: ve = "same-origin", fetchOptions: A, maxContentLength: B, maxBodyLength: le } = kn(y);
    const G = l.isNumber(B) && B > -1, q = l.isNumber(le) && le > -1, Ce = (T) => l.hasOwnProp(y, T) ? y[T] : void 0;
    let pe = s || fetch;
    ce = ce ? (ce + "").toLowerCase() : "text";
    let P = lo([O, I && I.toAbortSignal()], ie), K = null;
    const $ = P && P.unsubscribe && (() => {
      P.unsubscribe();
    });
    let he;
    try {
      let T;
      const Z = Ce("auth");
      if (Z) {
        const C = Z.username || "", ee = Z.password || "";
        T = { username: C, password: ee };
      }
      if (xo(_)) {
        const C = new URL(_, X.origin);
        if (!T && (C.username || C.password)) {
          const ee = Ur(C.username), me = Ur(C.password);
          T = { username: ee, password: me };
        }
        (C.username || C.password) && (C.username = "", C.password = "", _ = C.href);
      }
      if (T && (oe.delete("authorization"), oe.set("Authorization", "Basic " + btoa(mo((T.username || "") + ":" + (T.password || ""))))), G && typeof _ == "string" && _.startsWith("data:") && fo(_) > B) throw new v("maxContentLength size of " + B + " exceeded", v.ERR_BAD_RESPONSE, y, K);
      if (q && j !== "get" && j !== "head") {
        const C = await f(oe, N);
        if (typeof C == "number" && isFinite(C) && C > le) throw new v("Request body larger than maxBodyLength limit", v.ERR_BAD_REQUEST, y, K);
      }
      if (Pe && b && j !== "get" && j !== "head" && (he = await f(oe, N)) !== 0) {
        let C = new a(_, { method: "POST", body: N, duplex: "half" }), ee;
        if (l.isFormData(N) && (ee = C.headers.get("content-type")) && oe.setContentType(ee), C.body) {
          const [me, be] = Pr(he, lt(Ir(Pe)));
          N = Br(C.body, Dr, me, be);
        }
      }
      l.isString(ve) || (ve = ve ? "include" : "omit");
      const U = d && "credentials" in a.prototype;
      if (l.isFormData(N)) {
        const C = oe.getContentType();
        C && /^multipart\/form-data/i.test(C) && !/boundary=/i.test(C) && oe.delete("content-type");
      }
      oe.set("User-Agent", "axios/" + nr, false);
      const de = { ...A, signal: P, method: j.toUpperCase(), headers: hn(oe.normalize()), body: N, duplex: "half", credentials: U ? ve : void 0 };
      K = d && new a(_, de);
      let Y = await (d ? pe(K, A) : pe(_, de));
      if (G) {
        const C = l.toFiniteNumber(Y.headers.get("content-length"));
        if (C != null && C > B) throw new v("maxContentLength size of " + B + " exceeded", v.ERR_BAD_RESPONSE, y, K);
      }
      const fe = g && (ce === "stream" || ce === "response");
      if (g && Y.body && (ge || G || fe && $)) {
        const C = {};
        ["status", "statusText", "headers"].forEach((xe) => {
          C[xe] = Y[xe];
        });
        const ee = l.toFiniteNumber(Y.headers.get("content-length")), [me, be] = ge && Pr(ee, lt(Ir(ge), true)) || [];
        let we = 0;
        const gt = (xe) => {
          if (G && (we = xe, we > B)) throw new v("maxContentLength size of " + B + " exceeded", v.ERR_BAD_RESPONSE, y, K);
          me && me(xe);
        };
        Y = new i(Br(Y.body, Dr, gt, () => {
          be && be(), $ && $();
        }), C);
      }
      ce = ce || "text";
      let ne = await k[l.findKey(k, ce) || "text"](Y, y);
      if (G && !g && !fe) {
        let C;
        if (ne != null && (typeof ne.byteLength == "number" ? C = ne.byteLength : typeof ne.size == "number" ? C = ne.size : typeof ne == "string" && (C = typeof n == "function" ? new n().encode(ne).byteLength : ne.length)), typeof C == "number" && C > B) throw new v("maxContentLength size of " + B + " exceeded", v.ERR_BAD_RESPONSE, y, K);
      }
      return !fe && $ && $(), await new Promise((C, ee) => {
        wn(C, ee, { data: ne, headers: re.from(Y.headers), status: Y.status, statusText: Y.statusText, config: y, request: K });
      });
    } catch (T) {
      if ($ && $(), P && P.aborted && P.reason instanceof v) {
        const Z = P.reason;
        throw Z.config = y, K && (Z.request = K), T !== Z && (Z.cause = T), Z;
      }
      throw T && T.name === "TypeError" && /Load failed|fetch/i.test(T.message) ? Object.assign(new v("Network Error", v.ERR_NETWORK, y, K, T && T.response), { cause: T.cause || T }) : v.from(T, T && T.code, y, K, T && T.response);
    }
  };
}, yo = /* @__PURE__ */ new Map(), Sn = (t2) => {
  let e = t2 && t2.env || {};
  const { fetch: r, Request: n, Response: s } = e, a = [n, s, r];
  let i = a.length, c = i, d, u, p = yo;
  for (; c--; ) d = a[c], u = p.get(d), u === void 0 && p.set(d, u = c ? /* @__PURE__ */ new Map() : go(e)), p = u;
  return u;
};
Sn();
const sr = { http: Fa, xhr: co, fetch: { get: Sn } };
l.forEach(sr, (t2, e) => {
  if (t2) {
    try {
      Object.defineProperty(t2, "name", { __proto__: null, value: e });
    } catch {
    }
    Object.defineProperty(t2, "adapterName", { __proto__: null, value: e });
  }
});
const $r = (t2) => `- ${t2}`, bo = (t2) => l.isFunction(t2) || t2 === null || t2 === false;
function wo(t2, e) {
  t2 = l.isArray(t2) ? t2 : [t2];
  const { length: r } = t2;
  let n, s;
  const a = {};
  for (let i = 0; i < r; i++) {
    n = t2[i];
    let c;
    if (s = n, !bo(n) && (s = sr[(c = String(n)).toLowerCase()], s === void 0)) throw new v(`Unknown adapter '${c}'`);
    if (s && (l.isFunction(s) || (s = s.get(e)))) break;
    a[c || "#" + i] = s;
  }
  if (!s) {
    const i = Object.entries(a).map(([d, u]) => `adapter ${d} ` + (u === false ? "is not supported by the environment" : "is not available in the build"));
    let c = r ? i.length > 1 ? `since :
` + i.map($r).join(`
`) : " " + $r(i[0]) : "as no adapter specified";
    throw new v("There is no suitable adapter to dispatch the request " + c, "ERR_NOT_SUPPORT");
  }
  return s;
}
const En = { getAdapter: wo, adapters: sr };
function Bt(t2) {
  if (t2.cancelToken && t2.cancelToken.throwIfRequested(), t2.signal && t2.signal.aborted) throw new Ke(null, t2);
}
function Mr(t2) {
  return Bt(t2), t2.headers = re.from(t2.headers), t2.data = Ft.call(t2, t2.transformRequest), ["post", "put", "patch"].indexOf(t2.method) !== -1 && t2.headers.setContentType("application/x-www-form-urlencoded", false), En.getAdapter(t2.adapter || Je.adapter, t2)(t2).then(function(n) {
    Bt(t2), t2.response = n;
    try {
      n.data = Ft.call(t2, t2.transformResponse, n);
    } finally {
      delete t2.response;
    }
    return n.headers = re.from(n.headers), n;
  }, function(n) {
    if (!bn(n) && (Bt(t2), n && n.response)) {
      t2.response = n.response;
      try {
        n.response.data = Ft.call(t2, t2.transformResponse, n.response);
      } finally {
        delete t2.response;
      }
      n.response.headers = re.from(n.response.headers);
    }
    return Promise.reject(n);
  });
}
const mt = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t2, e) => {
  mt[t2] = function(n) {
    return typeof n === t2 || "a" + (e < 1 ? "n " : " ") + t2;
  };
});
const qr = {};
mt.transitional = function(e, r, n) {
  function s(a, i) {
    return "[Axios v" + nr + "] Transitional option '" + a + "'" + i + (n ? ". " + n : "");
  }
  return (a, i, c) => {
    if (e === false) throw new v(s(i, " has been removed" + (r ? " in " + r : "")), v.ERR_DEPRECATED);
    return r && !qr[i] && (qr[i] = true, console.warn(s(i, " has been deprecated since v" + r + " and will be removed in the near future"))), e ? e(a, i, c) : true;
  };
};
mt.spelling = function(e) {
  return (r, n) => (console.warn(`${n} is likely a misspelling of ${e}`), true);
};
function vo(t2, e, r) {
  if (typeof t2 != "object") throw new v("options must be an object", v.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(t2);
  let s = n.length;
  for (; s-- > 0; ) {
    const a = n[s], i = Object.prototype.hasOwnProperty.call(e, a) ? e[a] : void 0;
    if (i) {
      const c = t2[a], d = c === void 0 || i(c, a, t2);
      if (d !== true) throw new v("option " + a + " must be " + d, v.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== true) throw new v("Unknown option " + a, v.ERR_BAD_OPTION);
  }
}
const at = { assertOptions: vo, validators: mt }, se = at.validators;
let Ee = class {
  constructor(e) {
    this.defaults = e || {}, this.interceptors = { request: new Tr(), response: new Tr() };
  }
  async request(e, r) {
    try {
      return await this._request(e, r);
    } catch (n) {
      if (n instanceof Error) {
        let s = {};
        Error.captureStackTrace ? Error.captureStackTrace(s) : s = new Error();
        const a = (() => {
          if (!s.stack) return "";
          const i = s.stack.indexOf(`
`);
          return i === -1 ? "" : s.stack.slice(i + 1);
        })();
        try {
          if (!n.stack) n.stack = a;
          else if (a) {
            const i = a.indexOf(`
`), c = i === -1 ? -1 : a.indexOf(`
`, i + 1), d = c === -1 ? "" : a.slice(c + 1);
            String(n.stack).endsWith(d) || (n.stack += `
` + a);
          }
        } catch {
        }
      }
      throw n;
    }
  }
  _request(e, r) {
    typeof e == "string" ? (r = r || {}, r.url = e) : r = e || {}, r = je(this.defaults, r);
    const { transitional: n, paramsSerializer: s, headers: a } = r;
    n !== void 0 && at.assertOptions(n, { silentJSONParsing: se.transitional(se.boolean), forcedJSONParsing: se.transitional(se.boolean), clarifyTimeoutError: se.transitional(se.boolean), legacyInterceptorReqResOrdering: se.transitional(se.boolean), advertiseZstdAcceptEncoding: se.transitional(se.boolean) }, false), s != null && (l.isFunction(s) ? r.paramsSerializer = { serialize: s } : at.assertOptions(s, { encode: se.function, serialize: se.function }, true)), r.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? r.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : r.allowAbsoluteUrls = true), at.assertOptions(r, { baseUrl: se.spelling("baseURL"), withXsrfToken: se.spelling("withXSRFToken") }, true), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let i = a && l.merge(a.common, a[r.method]);
    a && l.forEach(["delete", "get", "head", "post", "put", "patch", "query", "common"], (k) => {
      delete a[k];
    }), r.headers = re.concat(i, a);
    const c = [];
    let d = true;
    this.interceptors.request.forEach(function(h) {
      if (typeof h.runWhen == "function" && h.runWhen(r) === false) return;
      d = d && h.synchronous;
      const f = r.transitional || tr;
      f && f.legacyInterceptorReqResOrdering ? c.unshift(h.fulfilled, h.rejected) : c.push(h.fulfilled, h.rejected);
    });
    const u = [];
    this.interceptors.response.forEach(function(h) {
      u.push(h.fulfilled, h.rejected);
    });
    let p, m = 0, b;
    if (!d) {
      const k = [Mr.bind(this), void 0];
      for (k.unshift(...c), k.push(...u), b = k.length, p = Promise.resolve(r); m < b; ) p = p.then(k[m++], k[m++]);
      return p;
    }
    b = c.length;
    let g = r;
    for (; m < b; ) {
      const k = c[m++], h = c[m++];
      try {
        g = k(g);
      } catch (f) {
        h.call(this, f);
        break;
      }
    }
    try {
      p = Mr.call(this, g);
    } catch (k) {
      return Promise.reject(k);
    }
    for (m = 0, b = u.length; m < b; ) p = p.then(u[m++], u[m++]);
    return p;
  }
  getUri(e) {
    e = je(this.defaults, e);
    const r = vn(e.baseURL, e.url, e.allowAbsoluteUrls);
    return gn(r, e.params, e.paramsSerializer);
  }
};
l.forEach(["delete", "get", "head", "options"], function(e) {
  Ee.prototype[e] = function(r, n) {
    return this.request(je(n || {}, { method: e, url: r, data: (n || {}).data }));
  };
});
l.forEach(["post", "put", "patch", "query"], function(e) {
  function r(n) {
    return function(a, i, c) {
      return this.request(je(c || {}, { method: e, headers: n ? { "Content-Type": "multipart/form-data" } : {}, url: a, data: i }));
    };
  }
  Ee.prototype[e] = r(), e !== "query" && (Ee.prototype[e + "Form"] = r(true));
});
let ko = class Nn {
  constructor(e) {
    if (typeof e != "function") throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function(a) {
      r = a;
    });
    const n = this;
    this.promise.then((s) => {
      if (!n._listeners) return;
      let a = n._listeners.length;
      for (; a-- > 0; ) n._listeners[a](s);
      n._listeners = null;
    }), this.promise.then = (s) => {
      let a;
      const i = new Promise((c) => {
        n.subscribe(c), a = c;
      }).then(s);
      return i.cancel = function() {
        n.unsubscribe(a);
      }, i;
    }, e(function(a, i, c) {
      n.reason || (n.reason = new Ke(a, i, c), r(n.reason));
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
    return { token: new Nn(function(s) {
      e = s;
    }), cancel: e };
  }
};
function So(t2) {
  return function(r) {
    return t2.apply(null, r);
  };
}
function Eo(t2) {
  return l.isObject(t2) && t2.isAxiosError === true;
}
const Kt = { Continue: 100, SwitchingProtocols: 101, Processing: 102, EarlyHints: 103, Ok: 200, Created: 201, Accepted: 202, NonAuthoritativeInformation: 203, NoContent: 204, ResetContent: 205, PartialContent: 206, MultiStatus: 207, AlreadyReported: 208, ImUsed: 226, MultipleChoices: 300, MovedPermanently: 301, Found: 302, SeeOther: 303, NotModified: 304, UseProxy: 305, Unused: 306, TemporaryRedirect: 307, PermanentRedirect: 308, BadRequest: 400, Unauthorized: 401, PaymentRequired: 402, Forbidden: 403, NotFound: 404, MethodNotAllowed: 405, NotAcceptable: 406, ProxyAuthenticationRequired: 407, RequestTimeout: 408, Conflict: 409, Gone: 410, LengthRequired: 411, PreconditionFailed: 412, PayloadTooLarge: 413, UriTooLong: 414, UnsupportedMediaType: 415, RangeNotSatisfiable: 416, ExpectationFailed: 417, ImATeapot: 418, MisdirectedRequest: 421, UnprocessableEntity: 422, Locked: 423, FailedDependency: 424, TooEarly: 425, UpgradeRequired: 426, PreconditionRequired: 428, TooManyRequests: 429, RequestHeaderFieldsTooLarge: 431, UnavailableForLegalReasons: 451, InternalServerError: 500, NotImplemented: 501, BadGateway: 502, ServiceUnavailable: 503, GatewayTimeout: 504, HttpVersionNotSupported: 505, VariantAlsoNegotiates: 506, InsufficientStorage: 507, LoopDetected: 508, NotExtended: 510, NetworkAuthenticationRequired: 511, WebServerIsDown: 521, ConnectionTimedOut: 522, OriginIsUnreachable: 523, TimeoutOccurred: 524, SslHandshakeFailed: 525, InvalidSslCertificate: 526 };
Object.entries(Kt).forEach(([t2, e]) => {
  Kt[e] = t2;
});
function jn(t2) {
  const e = new Ee(t2), r = sn(Ee.prototype.request, e);
  return l.extend(r, Ee.prototype, e, { allOwnKeys: true }), l.extend(r, e, null, { allOwnKeys: true }), r.create = function(s) {
    return jn(je(t2, s));
  }, r;
}
const L = jn(Je);
L.Axios = Ee;
L.CanceledError = Ke;
L.CancelToken = ko;
L.isCancel = bn;
L.VERSION = nr;
L.toFormData = ft;
L.AxiosError = v;
L.Cancel = L.CanceledError;
L.all = function(e) {
  return Promise.all(e);
};
L.spread = So;
L.isAxiosError = Eo;
L.mergeConfig = je;
L.AxiosHeaders = re;
L.formToJSON = (t2) => yn(l.isHTMLForm(t2) ? new FormData(t2) : t2);
L.getAdapter = En.getAdapter;
L.HttpStatusCode = Kt;
L.default = L;
const { Axios: Ci, AxiosError: _i, CanceledError: Ai, isCancel: Ri, CancelToken: Oi, VERSION: Ti, all: Pi, Cancel: Ii, isAxiosError: Fi, spread: Bi, toFormData: Di, AxiosHeaders: Ui, HttpStatusCode: Li, formToJSON: $i, getAdapter: Mi, mergeConfig: qi, create: Hi } = L;
var R = (t2) => L.isAxiosError(t2) ? t2.response ? JSON.stringify({ data: t2.response.data, headers: t2.response.headers, status: t2.response.status }) : t2.request && !(t2.request instanceof XMLHttpRequest) ? JSON.stringify(t2.request) : JSON.stringify({ code: t2.code, message: t2.message }) : JSON.stringify(t2), Hr = (t2) => {
  const e = t2.slice(0, Nr), r = t2.includes(".") ? qe(t2.split(".")[1] || "") : t2.slice(Nr);
  return { policyId: e, assetName: r };
};
function No(t2) {
  const e = ws(t2), r = e.body(), n = e.getId(), s = r.outputs(), a = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c) {
      const d = new vs(ks(n), BigInt(i)), u = new Ss(d, c), p = Es(u);
      a.push(p);
    }
  }
  return a;
}
function jo(t2, e, r) {
  const n = /* @__PURE__ */ new Set(), s = [];
  if (!e && !r) return [];
  if (e) for (const i of e) Vr(i, n, s);
  if (r) for (const i of r) {
    const c = No(i);
    for (const d of c) Vr(d, n, s);
  }
  return { blockfrost: s.map((i) => {
    const c = { txId: i.input.txHash, index: i.input.outputIndex }, d = Co(i), u = { address: i.output.address, value: d };
    return [c, u];
  }), maestro: s.map((i) => {
    const d = bs(i).output().toCbor();
    return { tx_hash: i.input.txHash, index: i.input.outputIndex, txout_cbor: d };
  }), koios: s.map((i) => ({ transaction: { id: i.input.txHash }, index: i.input.outputIndex, address: i.output.address, value: zr(i) })), ogmios: s.map((i) => ({ transaction: { id: i.input.txHash }, index: i.input.outputIndex, address: i.output.address, value: zr(i) })) }[t2];
}
var Co = (t2) => {
  const e = {};
  return t2.output.amount.forEach(({ unit: r, quantity: n }) => {
    if (r === "lovelace") e.coins = Number(n);
    else {
      const { policyId: s, assetName: a } = rn(r);
      e[s] || (e[s] = {}), e[s][a] = Number(n);
    }
  }), e;
}, zr = (t2) => {
  const e = {};
  return t2.output.amount.forEach(({ unit: r, quantity: n }) => {
    if (r === "lovelace") e.ada = { lovelace: Number(n) };
    else {
      const { policyId: s, assetName: a } = rn(r);
      e[s] || (e[s] = {}), e[s][a] = Number(n);
    }
  }), e;
}, Vr = (t2, e, r) => {
  const n = `${t2.input.txHash}:${t2.input.outputIndex}`;
  e.has(n) || (e.add(n), r.push(t2));
};
function _o(t2) {
  const e = t2.map((r) => r.output.amount).reduce((r, n) => {
    for (const s of n) s && (r[s.unit] == null && (r[s.unit] = 0), s.unit in r && (r[s.unit] += parseFloat(s.quantity)));
    return r;
  }, {});
  return Object.fromEntries(Object.entries(e).map(([r, n]) => [r, n.toString()]));
}
var Qe = class E {
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
    const s = r != null ? parseInt(String(r), 10) : 0, a = e.slice(s, s + n), i = s + n < e.length ? s + n : void 0;
    return { paginatedItems: a, nextCursor: i };
  }
  async fetchAccountInfo(e) {
    const r = this.accounts[e];
    if (!r) throw new Error(`Account not found: ${e}`);
    return r;
  }
  async fetchAddressUTxOs(e, r) {
    const n = this.utxos[e] || [];
    return r ? n.filter((s) => s.output.amount.some((a) => a.unit === r)) : n;
  }
  fetchAddressTxs(e, r) {
    throw new Error("Method not implemented.");
  }
  async fetchAssetAddresses(e) {
    if (!E.isValidHex(e)) throw new Error("Invalid asset: must be a hex string");
    const r = /* @__PURE__ */ new Map(), n = this.assetAddresses[e] || [];
    for (const s of n) r.set(s.address, BigInt(s.quantity));
    for (const [s, a] of Object.entries(this.utxos)) for (const i of a) {
      const c = i.output.amount.find((d) => d.unit === e);
      if (c) {
        const d = r.get(s) || BigInt(0);
        r.set(s, d + BigInt(c.quantity));
      }
    }
    return Array.from(r.entries()).filter(([s, a]) => a > BigInt(0)).map(([s, a]) => ({ address: s, quantity: a.toString() }));
  }
  async fetchAddressAssets(e) {
    if (!E.isValidAddress(e)) throw new Error("Invalid address: must be a valid Bech32 or Base58 address");
    const r = /* @__PURE__ */ new Map(), n = this.utxos[e] || [];
    for (const s of n) for (const a of s.output.amount) {
      const i = r.get(a.unit) || BigInt(0);
      r.set(a.unit, i + BigInt(a.quantity));
    }
    for (const [s, a] of Object.entries(this.assetAddresses)) {
      const i = a.find((c) => c.address === e);
      if (i) {
        const c = r.get(s) || BigInt(0);
        r.set(s, c + BigInt(i.quantity));
      }
    }
    return Array.from(r.entries()).map(([s, a]) => ({ unit: s, quantity: a.toString() }));
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
    if (r && !E.isIntegerString(String(r))) throw new Error("Invalid cursor: must be a string of digits");
    const { paginatedItems: s, nextCursor: a } = this.paginate(n, r);
    return { assets: s, next: a };
  }
  async fetchHandle(e) {
    try {
      const r = qe(e.replace("$", "")), n = `${ct[1]}000de140${r}`;
      return await this.fetchAssetMetadata(n);
    } catch (r) {
      throw R(r);
    }
  }
  async fetchHandleAddress(e) {
    var _a2;
    const r = qe(e.replace("$", "")), n = ct[1], a = (_a2 = (await this.fetchAssetAddresses(`${n}${r}`))[0]) == null ? void 0 : _a2.address;
    if (!a) throw new Error(`No addresses found for handle: ${e}`);
    return a;
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
    const r = JSON.parse(e), n = new E();
    return Object.entries(r.accounts || {}).forEach(([s, a]) => n.addAccount(s, a)), Object.entries(r.utxos || {}).forEach(([s, a]) => n.addUTxOs(a)), Object.entries(r.assetAddresses || {}).forEach(([s, a]) => n.addAssetAddresses(s, a)), Object.entries(r.assetMetadata || {}).forEach(([s, a]) => n.addAssetMetadata(s, a)), Object.entries(r.blocks || {}).forEach(([s, a]) => n.addBlock(a)), Object.entries(r.collections || {}).forEach(([s, a]) => n.addCollectionAssets(a)), Object.entries(r.protocolParameters || {}).forEach(([s, a]) => n.addProtocolParameters(a)), Object.entries(r.transactions || {}).forEach(([s, a]) => n.addTransaction(a)), n;
  }
  static isValidHex(e, r) {
    return r && e.length !== r ? false : /^[0-9a-fA-F]+$/.test(e);
  }
  static isValidAddress(e) {
    return E.isValidBech32Address(e) || E.isValidBase58(e);
  }
  static isValidBase58(e) {
    return !!/^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/.test(e);
  }
  static isValidBech32(e, r) {
    return e !== e.toLowerCase() && e !== e.toUpperCase() ? false : new RegExp(`^${r}1[02-9ac-hj-np-z]+$`, "i").test(e);
  }
  static isValidBech32Address(e) {
    return E.isValidBech32(e, "(addr|addr_test)");
  }
  static isValidBech32Pool(e) {
    return E.isValidBech32(e, "pool");
  }
  static isValidBech32VrfVk(e) {
    return E.isValidBech32(e, "vrf_vk");
  }
  static isIntegerString(e) {
    return /^\d+$/.test(e);
  }
  static isValidAssetOrLovelace(e) {
    return e === "lovelace" ? true : e.length < 56 ? false : E.isValidHex(e);
  }
  addAccount(e, r) {
    if (!E.isValidAddress(e)) throw new Error("Invalid address: must be a valid Bech32 or Base58 address");
    if (r.poolId && !E.isValidBech32Pool(r.poolId)) throw new Error("Invalid 'poolId': must be a valid Bech32 pool address");
    if (!E.isIntegerString(r.balance)) throw new Error("Invalid 'balance': must be a string of digits");
    if (!E.isIntegerString(r.rewards)) throw new Error("Invalid 'rewards': must be a string of digits");
    if (!E.isIntegerString(r.withdrawals)) throw new Error("Invalid 'withdrawals': must be a string of digits");
    this.accounts[e] = r;
  }
  addUTxOs(e) {
    if (!Array.isArray(e) || e.length === 0) throw new Error("Invalid utxos: must be a non-empty array");
    e.forEach((r, n) => {
      if (!Number.isInteger(r.input.outputIndex) || r.input.outputIndex < 0) throw new Error(`Invalid outputIndex for UTxO at index ${n}: must be a non-negative integer`);
      if (!E.isValidHex(r.input.txHash, 64)) throw new Error(`Invalid txHash for UTxO at index ${n}: must be a 64-character hexadecimal string`);
      if (!E.isValidAddress(r.output.address)) throw new Error(`Invalid address in output for UTxO at index ${n}: must be a valid Bech32 or Base58 address`);
      if (!Array.isArray(r.output.amount) || r.output.amount.length === 0) throw new Error(`Invalid amount for UTxO at index ${n}: must be a non-empty array of assets`);
      if (r.output.amount.forEach((s, a) => {
        if (!E.isValidAssetOrLovelace(s.unit)) throw new Error(`Invalid unit for asset at index ${a} in UTxO at index ${n}`);
        if (!E.isIntegerString(s.quantity)) throw new Error(`Invalid quantity for asset at index ${a} in UTxO at index ${n}: must be a string of digits`);
      }), r.output.dataHash && !E.isValidHex(r.output.dataHash, 64)) throw new Error(`Invalid dataHash for UTxO at index ${n}: must be a 64-character hexadecimal string or undefined`);
      if (r.output.plutusData && !E.isValidHex(r.output.plutusData)) throw new Error(`Invalid plutusData for UTxO at index ${n}: must be a hexadecimal string or undefined`);
      if (r.output.scriptRef && !E.isValidHex(r.output.scriptRef)) throw new Error(`Invalid scriptRef for UTxO at index ${n}: must be a hexadecimal string or undefined`);
      if (r.output.scriptHash && !E.isValidHex(r.output.scriptHash, 56)) throw new Error(`Invalid scriptHash for UTxO at index ${n}: must be a 56-character hexadecimal string or undefined`);
    });
    for (const r of e) this.utxos[r.output.address] || (this.utxos[r.output.address] = []), this.utxos[r.output.address].push(r);
  }
  addAssetAddresses(e, r) {
    if (!E.isValidHex(e)) throw new Error("Invalid asset: must be a hex string");
    if (r.length === 0) throw new Error("Invalid addresses: must be a non-empty array");
    r.forEach((n, s) => {
      if (!E.isValidAddress(n.address)) throw new Error(`Invalid 'address' field at index ${s}, should be bech32 string`);
      if (!E.isIntegerString(n.quantity)) throw new Error(`Invalid 'quantity' field at index ${s}, should be a string of digits`);
    }), this.assetAddresses[e] = r;
  }
  addAssetMetadata(e, r) {
    if (e.length < 56) throw new Error(`Invalid asset ${e}: must be a string longer than 56 characters`);
    if (!E.isValidHex(e)) throw new Error("Invalid asset: must be a hex string");
    if (typeof r != "object" || r === null) throw new Error("Invalid metadata object");
    this.assetMetadata[e] = r;
  }
  addCollectionAssets(e) {
    if (!Array.isArray(e) || e.length === 0) throw new Error("Invalid assets: must be a non-empty array");
    const r = {};
    e.forEach((n, s) => {
      if (n.unit.length < 56) throw new Error(`Invalid unit for asset at index ${s}: must be a string longer than 56 characters`);
      if (!E.isValidHex(n.unit)) throw new Error(`Invalid unit for asset at index ${s}: must be a hexadecimal string`);
      const a = n.unit.slice(0, 56);
      if (!E.isValidHex(a, 56)) throw new Error(`Invalid policyId in asset unit at index ${s}: must be a 56-character hexadecimal string`);
      if (!E.isIntegerString(n.quantity)) throw new Error(`Invalid quantity for asset at index ${s}: must be a string of digits`);
      r[a] || (r[a] = []), r[a].push(n);
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
    if (!E.isIntegerString(e.minPoolCost)) throw new Error("Invalid 'minPoolCost': must be a string of digits");
    if (!E.isIntegerString(e.maxTxExMem)) throw new Error("Invalid 'maxTxExMem': must be a string of digits");
    if (!E.isIntegerString(e.maxTxExSteps)) throw new Error("Invalid 'maxTxExSteps': must be a string of digits");
    if (!E.isIntegerString(e.maxBlockExMem)) throw new Error("Invalid 'maxBlockExMem': must be a string of digits");
    if (!E.isIntegerString(e.maxBlockExSteps)) throw new Error("Invalid 'maxBlockExSteps': must be a string of digits");
    this.protocolParameters[e.epoch] = e;
  }
  addTransaction(e) {
    if (!E.isValidHex(e.hash, 64)) throw new Error("Invalid transaction hash: must be a 64-character hexadecimal string");
    if (!Number.isInteger(e.index) || e.index < 0) throw new Error("Invalid 'index': must be a non-negative integer");
    if (!E.isValidHex(e.block, 64)) throw new Error("Invalid 'block': must be a 64-character hexadecimal string");
    if (!E.isIntegerString(e.slot)) throw new Error("Invalid 'slot': must be a string of digits");
    if (!E.isIntegerString(e.fees)) throw new Error("Invalid 'fees': must be a string of digits");
    if (!Number.isInteger(e.size) || e.size <= 0) throw new Error("Invalid 'size': must be a positive integer");
    if (!/^-?\d+$/.test(e.deposit)) throw new Error("Invalid 'deposit': must be a string representing an integer (positive or negative)");
    if (e.invalidBefore !== "" && !E.isIntegerString(e.invalidBefore)) throw new Error("Invalid 'invalidBefore': must be a string of digits or empty string");
    if (e.invalidAfter !== "" && !E.isIntegerString(e.invalidAfter)) throw new Error("Invalid 'invalidAfter': must be a string of digits or empty string");
    this.transactions[e.hash] = e, this.addUTxOs(e.outputs);
  }
  addBlock(e) {
    if (!E.isValidHex(e.hash, 64)) throw new Error("Invalid block hash: must be a 64-character hexadecimal string");
    if (!Number.isInteger(e.time) || e.time < 0) throw new Error("Invalid 'time': must be a non-negative integer");
    if (!E.isIntegerString(e.slot)) throw new Error("Invalid 'slot': must be a string of digits");
    if (!Number.isInteger(e.epoch) || e.epoch < 0) throw new Error("Invalid 'epoch': must be a non-negative integer");
    if (!E.isIntegerString(e.epochSlot)) throw new Error("Invalid 'epochSlot': must be a string of digits");
    if (!E.isValidBech32Pool(e.slotLeader)) throw new Error("Invalid 'slotLeader': must be a bech32 string with pool prefix");
    if (!Number.isInteger(e.size) || e.size <= 0) throw new Error("Invalid 'size': must be a positive integer");
    if (!Number.isInteger(e.txCount) || e.txCount < 0) throw new Error("Invalid 'txCount': must be a non-negative integer");
    if (!E.isIntegerString(e.output)) throw new Error("Invalid 'output': must be a string of digits");
    if (!E.isValidHex(e.operationalCertificate, 64)) throw new Error("Invalid 'operationalCertificate': must be a 64-character hexadecimal string");
    if (!E.isValidHex(e.previousBlock, 64)) throw new Error("Invalid 'previousBlock': must be a 64-character hexadecimal string");
    if (!E.isValidBech32VrfVk(e.VRFKey)) throw new Error("Invalid 'VRFKey': must be a bech32 string with vrf_vk1 prefix");
    this.blocks[e.hash] = e;
  }
  addSerializedTransaction(e) {
    const r = fs.fromCbor(ms(e)), n = Date.now(), s = xs(this.network ?? "mainnet", n), a = gs(this.network ?? "mainnet", n), i = this.slotToEpochSlot(BigInt(s)), c = Ot.randomBytes(32).toString("hex"), d = Ot.randomBytes(32).toString("hex"), u = Ot.randomBytes(32).toString("hex"), p = r.body().fee().toString(), m = r.body().outputs().reduce((N, O) => {
      const I = O.amount().coin();
      return N + I;
    }, 0n), b = r.body().ttl(), g = r.body().validityStartInterval(), k = r.body().hash(), h = { confirmations: 40, nextBlock: "undefined its a random block", hash: c, time: n, slot: s, epoch: a, epochSlot: i.toString(), fees: p, slotLeader: "pool1qv3x5x5x5x5x5x5x5x5x5x5x5x5x5x5", size: e.length / 2, txCount: 1, output: m.toString(), operationalCertificate: u, previousBlock: d, VRFKey: "vrf_vk1qv3x5x5x5x5x5x5x5x5x5x5x5x5x5" }, y = r.body().inputs().values().map((N) => {
      const O = N.transactionId(), I = Number(N.index()), ie = Object.values(this.utxos).flat().find((ge) => ge.input.txHash === O && ge.input.outputIndex === I);
      if (!ie) throw new Error(`UTxO not found for transaction hash and output index: ${O} ${I}`);
      return ie;
    });
    for (const N of Object.values(this.utxos)) for (const O of y) {
      const I = N.indexOf(O);
      I !== -1 && N.splice(I, 1);
    }
    const _ = r.body().outputs().map((N, O) => this.mapOutputToUTxO(N, k, O)), j = { inputs: y, hash: k, index: 0, block: c, slot: s.toString(), fees: p, size: e.length / 2, deposit: "0", invalidBefore: g ? g.toString() : "", invalidAfter: b ? b.toString() : "", outputs: _ };
    this.addBlock(h), this.addTransaction(j);
  }
  slotToEpochSlot(e) {
    const r = ys[this.network ?? "mainnet"], n = BigInt(r.epochLength);
    return e % n;
  }
  mapOutputToUTxO(e, r, n) {
    var _a2, _b, _c, _d, _e2;
    return { input: { txHash: r, outputIndex: n }, output: { address: e.address().toBech32(), amount: this.mapValueToAsset(e.amount()), dataHash: (_a2 = e.datum()) == null ? void 0 : _a2.asDataHash(), plutusData: (_c = (_b = e.datum()) == null ? void 0 : _b.asInlineData()) == null ? void 0 : _c.toCbor(), scriptRef: (_d = e.scriptRef()) == null ? void 0 : _d.toCbor(), scriptHash: (_e2 = e.scriptRef()) == null ? void 0 : _e2.hash() } };
  }
  mapValueToAsset(e) {
    const r = [], n = e.multiasset();
    if (n) for (const [s, a] of n) {
      const i = { unit: s, quantity: a.toString() };
      r.push(i);
    }
    else {
      const s = e.coin().toString();
      r.push({ unit: "lovelace", quantity: s });
    }
    return r;
  }
}, Ao = class {
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
            const s = await this.fetchPlutusScriptCBOR(t2), a = ps(s, "DoubleCBOR");
            n = { version: e.type.replace("plutus", ""), code: a };
          } else n = await this.fetchNativeScriptJSON(t2);
          return hs(n).toCbor().toString();
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
    (e == null ? void 0 : e.enableCaching) && (this._enableCaching = true, this._offlineFetcher = e.offlineFetcher || new Qe(this._network));
  }
  async evaluateTx(t2, e, r) {
    const n = jo("blockfrost", e, r), s = { cbor: t2, additionalUtxoSet: n };
    try {
      const a = { "Content-Type": "application/json" }, { status: i, data: c } = await this._axiosInstance.post("utils/txs/evaluate/utxos", s, { headers: a });
      if (i === 200 && c.result.EvaluationResult) {
        const d = { spend: "SPEND", mint: "MINT", certificate: "CERT", withdrawal: "REWARD" }, u = [];
        return Object.keys(c.result.EvaluationResult).forEach((p) => {
          const [m, b] = p.split(":"), { memory: g, steps: k } = c.result.EvaluationResult[p];
          u.push({ tag: d[m], index: Number(b), budget: { mem: g, steps: k } });
        }), u;
      }
      throw R(c);
    } catch (a) {
      throw R(a);
    }
  }
  async fetchAccountInfo(t2) {
    const e = t2.startsWith("addr") ? ls(t2) : t2;
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
    return _o(e);
  }
  async fetchAddressTxs(t2, e = Er) {
    const r = [];
    try {
      const n = { ...Er, ...e };
      for (let s = 1; s <= n.maxPage; s++) {
        let { data: a, status: i } = await this._axiosInstance.get(`/addresses/${t2}/transactions?page=${s}&order=${n.order}`);
        if (i !== 200) throw R(a);
        if (a.length === 0) break;
        for (const c of a) {
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
      const a = await this._offlineFetcher.fetchAddressUTxOs(t2, e);
      if (a.length > 0) return a;
    } catch {
    }
    const r = e !== void 0 ? `/${e}` : "", n = `addresses/${t2}/utxos` + r, s = async (a = 1, i = []) => {
      const { data: c, status: d } = await this._axiosInstance.get(`${n}?page=${a}`);
      if (d === 200 || d == 202) return c.length > 0 ? s(a + 1, [...i, ...await Promise.all(c.map((u) => this.toUTxO(u, u.tx_hash)))]) : i;
      throw R(c);
    };
    try {
      const a = await s();
      if (this._enableCaching && this._offlineFetcher && a.length > 0) try {
        this._offlineFetcher.addUTxOs(a);
      } catch (i) {
        console.warn("Failed to cache UTXOs:", i);
      }
      return a;
    } catch {
      return [];
    }
  }
  async fetchAssetAddresses(t2) {
    const e = async (r = 1, n = []) => {
      const { policyId: s, assetName: a } = Hr(t2), { data: i, status: c } = await this._axiosInstance.get(`assets/${s}${a}/addresses?page=${r}`);
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
      const { policyId: e, assetName: r } = Hr(t2), { data: n, status: s } = await this._axiosInstance.get(`assets/${e}${r}`);
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
      const e = qe(`${t2.replace("$", "")}`);
      return await this.fetchAssetMetadata(`${ct[1]}000de140${e}`);
    } catch (e) {
      throw R(e);
    }
  }
  async fetchHandleAddress(t2) {
    if (this._network !== "mainnet") throw new Error("Does not support fetching addresses by handle on non-mainnet networks.");
    try {
      const e = qe(t2.replace("$", "")), { data: r, status: n } = await this._axiosInstance.get(`assets/${ct[1]}${e}/addresses`);
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
      if (r === 200 || r == 202) return ds({ coinsPerUtxoSize: e.coins_per_utxo_word, collateralPercent: e.collateral_percent, decentralisation: e.decentralisation_param, epoch: e.epoch, keyDeposit: e.key_deposit, maxBlockExMem: e.max_block_ex_mem, maxBlockExSteps: e.max_block_ex_steps, maxBlockHeaderSize: e.max_block_header_size, maxBlockSize: e.max_block_size, maxCollateralInputs: e.max_collateral_inputs, maxTxExMem: e.max_tx_ex_mem, maxTxExSteps: e.max_tx_ex_steps, maxTxSize: e.max_tx_size, maxValSize: e.max_val_size, minFeeA: e.min_fee_a, minFeeB: e.min_fee_b, minPoolCost: e.min_pool_cost, poolDeposit: e.pool_deposit, priceMem: e.price_mem, priceStep: e.price_step });
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
        const s = r.outputs, a = [];
        s.forEach((c) => {
          a.push(this.toUTxO(c, t2));
        });
        const i = await Promise.all(a);
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
      n >= r && clearInterval(s), this.fetchTxInfo(t2).then((a) => {
        this.fetchBlockInfo(a.block).then((i) => {
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
      const e = { "Content-Type": "application/cbor" }, { data: r, status: n } = await this._axiosInstance.post("tx/submit", this.submitTxToBytes ? us(t2) : t2, { headers: e });
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
    this._enableCaching = t2, t2 ? this._offlineFetcher = e || new Qe(this._network) : this._offlineFetcher = void 0;
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
      const r = Qe.fromJSON(t2);
      this._offlineFetcher = r;
    }
  }
  clearCache() {
    this._offlineFetcher && (this._offlineFetcher = new Qe(this._network));
  }
};
function ot(t2) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? ot = function(e) {
    return typeof e;
  } : ot = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, ot(t2);
}
var Cn = "dahlia", Ro = function(e) {
  return e === 3 ? "v3" : e;
}, _n = "https://js.stripe.com", Oo = "".concat(_n, "/").concat(Cn, "/stripe.js"), To = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/, Po = /^https:\/\/js\.stripe\.com\/(v3|[a-z]+)\/stripe\.js(\?.*)?$/;
var Io = function(e) {
  return To.test(e) || Po.test(e);
}, Fo = function() {
  for (var e = document.querySelectorAll('script[src^="'.concat(_n, '"]')), r = 0; r < e.length; r++) {
    var n = e[r];
    if (Io(n.src)) return n;
  }
  return null;
}, Wr = function(e) {
  var r = "", n = document.createElement("script");
  n.src = "".concat(Oo).concat(r);
  var s = document.head || document.body;
  if (!s) throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");
  return s.appendChild(n), n;
}, Bo = function(e, r) {
  !e || !e._registerWrapper || e._registerWrapper({ name: "stripe-js", version: "9.7.0", startTime: r });
}, Ue = null, Ze = null, et = null, Do = function(e) {
  return function(r) {
    e(new Error("Failed to load Stripe.js", { cause: r }));
  };
}, Uo = function(e, r) {
  return function() {
    window.Stripe ? e(window.Stripe) : r(new Error("Stripe.js not available"));
  };
}, Lo = function(e) {
  return Ue !== null ? Ue : (Ue = new Promise(function(r, n) {
    if (typeof window > "u" || typeof document > "u") {
      r(null);
      return;
    }
    if (window.Stripe) {
      r(window.Stripe);
      return;
    }
    try {
      var s = Fo();
      if (!(s && e)) {
        if (!s) s = Wr(e);
        else if (s && et !== null && Ze !== null) {
          var a;
          s.removeEventListener("load", et), s.removeEventListener("error", Ze), (a = s.parentNode) === null || a === void 0 || a.removeChild(s), s = Wr(e);
        }
      }
      et = Uo(r, n), Ze = Do(n), s.addEventListener("load", et), s.addEventListener("error", Ze);
    } catch (i) {
      n(i);
      return;
    }
  }), Ue.catch(function(r) {
    return Ue = null, Promise.reject(r);
  }));
}, $o = function(e, r, n) {
  if (e === null) return null;
  var s = r[0];
  if (typeof s != "string") throw new Error("Expected publishable key to be of type string, got type ".concat(ot(s), " instead."));
  var a = s.match(/^pk_test/), i = Ro(e.version), c = Cn;
  a && i !== c && console.warn("Stripe.js@".concat(i, " was loaded on the page, but @stripe/stripe-js@").concat("9.7.0", " expected Stripe.js@").concat(c, ". This may result in unexpected behavior. For more information, see https://docs.stripe.com/sdks/stripejs-versioning"));
  var d = e.apply(void 0, r);
  return Bo(d, n), d;
}, Le, An = false, Rn = function() {
  return Le || (Le = Lo(null).catch(function(e) {
    return Le = null, Promise.reject(e);
  }), Le);
};
Promise.resolve().then(function() {
  return Rn();
}).catch(function(t2) {
  An || console.warn(t2);
});
var Mo = function() {
  for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
  An = true;
  var s = Date.now();
  return Rn().then(function(a) {
    return $o(a, r, s);
  });
}, Dt = { exports: {} }, Ut, Jr;
function qo() {
  if (Jr) return Ut;
  Jr = 1;
  var t2 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Ut = t2, Ut;
}
var Lt, Kr;
function Ho() {
  if (Kr) return Lt;
  Kr = 1;
  var t2 = qo();
  function e() {
  }
  function r() {
  }
  return r.resetWarningCache = e, Lt = function() {
    function n(i, c, d, u, p, m) {
      if (m !== t2) {
        var b = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
        throw b.name = "Invariant Violation", b;
      }
    }
    n.isRequired = n;
    function s() {
      return n;
    }
    var a = { array: n, bigint: n, bool: n, func: n, number: n, object: n, string: n, symbol: n, any: n, arrayOf: s, element: n, elementType: n, instanceOf: s, node: n, objectOf: s, oneOf: s, oneOfType: s, shape: s, exact: s, checkPropTypes: r, resetWarningCache: e };
    return a.PropTypes = a, a;
  }, Lt;
}
var Xr;
function zo() {
  return Xr || (Xr = 1, Dt.exports = Ho()()), Dt.exports;
}
var Vo = zo();
const M = Zn(Vo);
function Gr(t2, e) {
  var r = Object.keys(t2);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t2);
    e && (n = n.filter(function(s) {
      return Object.getOwnPropertyDescriptor(t2, s).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Yr(t2) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Gr(Object(r), true).forEach(function(n) {
      On(t2, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(r)) : Gr(Object(r)).forEach(function(n) {
      Object.defineProperty(t2, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t2;
}
function it(t2) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? it = function(e) {
    return typeof e;
  } : it = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, it(t2);
}
function On(t2, e, r) {
  return e in t2 ? Object.defineProperty(t2, e, { value: r, enumerable: true, configurable: true, writable: true }) : t2[e] = r, t2;
}
function Wo(t2, e) {
  if (t2 == null) return {};
  var r = {}, n = Object.keys(t2), s, a;
  for (a = 0; a < n.length; a++) s = n[a], !(e.indexOf(s) >= 0) && (r[s] = t2[s]);
  return r;
}
function Jo(t2, e) {
  if (t2 == null) return {};
  var r = Wo(t2, e), n, s;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(t2);
    for (s = 0; s < a.length; s++) n = a[s], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t2, n) && (r[n] = t2[n]);
  }
  return r;
}
function Tn(t2, e) {
  return Ko(t2) || Xo(t2, e) || Go(t2, e) || Yo();
}
function Ko(t2) {
  if (Array.isArray(t2)) return t2;
}
function Xo(t2, e) {
  var r = t2 && (typeof Symbol < "u" && t2[Symbol.iterator] || t2["@@iterator"]);
  if (r != null) {
    var n = [], s = true, a = false, i, c;
    try {
      for (r = r.call(t2); !(s = (i = r.next()).done) && (n.push(i.value), !(e && n.length === e)); s = true) ;
    } catch (d) {
      a = true, c = d;
    } finally {
      try {
        !s && r.return != null && r.return();
      } finally {
        if (a) throw c;
      }
    }
    return n;
  }
}
function Go(t2, e) {
  if (t2) {
    if (typeof t2 == "string") return Qr(t2, e);
    var r = Object.prototype.toString.call(t2).slice(8, -1);
    if (r === "Object" && t2.constructor && (r = t2.constructor.name), r === "Map" || r === "Set") return Array.from(t2);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Qr(t2, e);
  }
}
function Qr(t2, e) {
  (e == null || e > t2.length) && (e = t2.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t2[r];
  return n;
}
function Yo() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Q = function(e, r, n) {
  var s = !!n, a = F.useRef(n);
  F.useEffect(function() {
    a.current = n;
  }, [n]), F.useEffect(function() {
    if (!s || !e) return function() {
    };
    var i = function() {
      if (a.current) return a.current.apply(a, arguments);
    };
    return e.on(r, i), function() {
      e.off(r, i);
    };
  }, [s, r, e, a]);
}, Xt = function(e) {
  var r = F.useRef(e);
  return F.useEffect(function() {
    r.current = e;
  }, [e]), r.current;
}, Oe = function(e) {
  return e !== null && it(e) === "object";
}, Qo = function(e) {
  return Oe(e) && typeof e.then == "function";
}, Zo = function(e) {
  return Oe(e) && typeof e.elements == "function" && typeof e.createToken == "function" && typeof e.createPaymentMethod == "function" && typeof e.confirmCardPayment == "function";
}, Zr = "[object Object]", ei = function t(e, r) {
  if (!Oe(e) || !Oe(r)) return e === r;
  var n = Array.isArray(e), s = Array.isArray(r);
  if (n !== s) return false;
  var a = Object.prototype.toString.call(e) === Zr, i = Object.prototype.toString.call(r) === Zr;
  if (a !== i) return false;
  if (!a && !n) return e === r;
  var c = Object.keys(e), d = Object.keys(r);
  if (c.length !== d.length) return false;
  for (var u = {}, p = 0; p < c.length; p += 1) u[c[p]] = true;
  for (var m = 0; m < d.length; m += 1) u[d[m]] = true;
  var b = Object.keys(u);
  if (b.length !== c.length) return false;
  var g = e, k = r, h = function(y) {
    return t(g[y], k[y]);
  };
  return b.every(h);
}, Pn = function(e, r, n) {
  return Oe(e) ? Object.keys(e).reduce(function(s, a) {
    var i = !Oe(r) || !ei(e[a], r[a]);
    return n.includes(a) ? (i && console.warn("Unsupported prop change: options.".concat(a, " is not a mutable property.")), s) : i ? Yr(Yr({}, s || {}), {}, On({}, a, e[a])) : s;
  }, null) : null;
}, In = "Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.", en = function(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : In;
  if (e === null || Zo(e)) return e;
  throw new Error(r);
}, ti = function(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : In;
  if (Qo(e)) return { tag: "async", stripePromise: Promise.resolve(e).then(function(s) {
    return en(s, r);
  }) };
  var n = en(e, r);
  return n === null ? { tag: "empty" } : { tag: "sync", stripe: n };
}, ri = function(e) {
  !e || !e._registerWrapper || !e.registerAppInfo || (e._registerWrapper({ name: "react-stripe-js", version: "6.5.0" }), e.registerAppInfo({ name: "react-stripe-js", version: "6.5.0", url: "https://stripe.com/docs/stripe-js/react" }));
}, xt = F.createContext(null);
xt.displayName = "ElementsContext";
var Fn = function(e, r) {
  if (!e) throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(r, " in an <Elements> provider."));
  return e;
}, Bn = function(e) {
  var r = e.stripe, n = e.options, s = e.children, a = F.useMemo(function() {
    return ti(r);
  }, [r]), i = F.useState(function() {
    return { stripe: a.tag === "sync" ? a.stripe : null, elements: a.tag === "sync" ? a.stripe.elements(n) : null };
  }), c = Tn(i, 2), d = c[0], u = c[1];
  F.useEffect(function() {
    var b = true, g = function(h) {
      u(function(f) {
        return f.stripe ? f : { stripe: h, elements: h.elements(n) };
      });
    };
    return a.tag === "async" && !d.stripe ? a.stripePromise.then(function(k) {
      k && b && g(k);
    }) : a.tag === "sync" && !d.stripe && g(a.stripe), function() {
      b = false;
    };
  }, [a, d, n]);
  var p = Xt(r);
  F.useEffect(function() {
    p !== null && p !== r && console.warn("Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.");
  }, [p, r]);
  var m = Xt(n);
  return F.useEffect(function() {
    if (d.elements) {
      var b = Pn(n, m, ["clientSecret", "fonts"]);
      b && d.elements.update(b);
    }
  }, [n, m, d.elements]), F.useEffect(function() {
    ri(d.stripe);
  }, [d.stripe]), F.createElement(xt.Provider, { value: d }, s);
};
Bn.propTypes = { stripe: M.any, options: M.object };
var ni = function(e) {
  var r = F.useContext(xt);
  return Fn(r, e);
}, si = function() {
  var e = ni("calls useElements()"), r = e.elements;
  return r;
};
M.func.isRequired;
var Dn = F.createContext(null);
Dn.displayName = "CheckoutContext";
var Gt = function(e) {
  var r = F.useContext(Dn), n = F.useContext(xt);
  if (r) {
    if (n) throw new Error("You cannot wrap the part of your app that ".concat(e, " in both a checkout provider and <Elements> provider."));
    return r;
  } else return Fn(n, e);
}, ai = ["mode"], oi = function(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}, H = function(e, r, n) {
  var s = "".concat(oi(e), "Element"), a = function(u) {
    var p = u.id, m = u.className, b = u.options, g = b === void 0 ? {} : b, k = u.onBlur, h = u.onFocus, f = u.onReady, y = u.onChange, _ = u.onEscape, j = u.onClick, N = u.onLoadError, O = u.onLoaderStart, I = u.onNetworksChange, ie = u.onConfirm, ge = u.onCancel, Pe = u.onShippingAddressChange, ce = u.onShippingRateChange, oe = u.onSavedPaymentMethodRemove, ve = u.onSavedPaymentMethodUpdate, A = u.onAvailablePaymentMethodsChange, B = Gt("mounts <".concat(s, ">")), le = "elements" in B ? B.elements : null, G = "checkoutState" in B ? B.checkoutState : null, q = (G == null ? void 0 : G.type) === "success" || (G == null ? void 0 : G.type) === "loading" ? G.sdk : null, Ce = F.useState(null), pe = Tn(Ce, 2), P = pe[0], K = pe[1], $ = F.useRef(null), he = F.useRef(null);
    Q(P, "blur", k), Q(P, "focus", h), Q(P, "escape", _), Q(P, "click", j), Q(P, "loaderror", N), Q(P, "loaderstart", O), Q(P, "networkschange", I), Q(P, "confirm", ie), Q(P, "cancel", ge), Q(P, "shippingaddresschange", Pe), Q(P, "shippingratechange", ce), Q(P, "savedpaymentmethodremove", oe), Q(P, "savedpaymentmethodupdate", ve), Q(P, "availablepaymentmethodschange", A), Q(P, "change", y);
    var T;
    f && (e === "expressCheckout" ? T = f : T = function() {
      f(P);
    }), Q(P, "ready", T), F.useLayoutEffect(function() {
      if ($.current === null && he.current !== null && (le || q)) {
        var U = null;
        if (q) {
          var de = q, Y = q;
          switch (e) {
            case "paymentForm":
              U = Y.createForm(g);
              break;
            case "payment":
              U = de.createPaymentElement(g);
              break;
            case "address":
              if ("mode" in g) {
                var fe = g.mode, ne = Jo(g, ai);
                if (fe === "shipping") U = de.createShippingAddressElement(ne);
                else if (fe === "billing") U = de.createBillingAddressElement(ne);
                else throw new Error("Invalid options.mode. mode must be 'billing' or 'shipping'.");
              } else throw new Error("You must supply options.mode. mode must be 'billing' or 'shipping'.");
              break;
            case "expressCheckout":
              U = de.createExpressCheckoutElement(g);
              break;
            case "currencySelector":
              U = q.createCurrencySelectorElement();
              break;
            case "taxId":
              U = de.createTaxIdElement(g);
              break;
            case "contactDetails":
              U = de.createContactDetailsElement();
              break;
            default:
              throw new Error("<".concat(s, "> is not supported inside a checkout provider. Use an <Elements> provider instead."));
          }
        } else le && (U = le.create(e, g));
        $.current = U, K(U), U && U.mount(he.current);
      }
    }, [le, q, g]);
    var Z = Xt(g);
    return F.useEffect(function() {
      if ($.current) {
        var U = Pn(g, Z, ["paymentRequest"]);
        U && "update" in $.current && $.current.update(U);
      }
    }, [g, Z]), F.useLayoutEffect(function() {
      return function() {
        if ($.current && typeof $.current.destroy == "function") try {
          $.current.destroy(), $.current = null;
        } catch {
        }
      };
    }, []), F.createElement("div", { id: p, className: m, ref: he });
  }, i = function(u) {
    Gt("mounts <".concat(s, ">"));
    var p = u.id, m = u.className;
    return F.createElement("div", { id: p, className: m });
  }, c = r ? i : a;
  return c.propTypes = { id: M.string, className: M.string, onChange: M.func, onBlur: M.func, onFocus: M.func, onReady: M.func, onEscape: M.func, onClick: M.func, onLoadError: M.func, onLoaderStart: M.func, onNetworksChange: M.func, onConfirm: M.func, onCancel: M.func, onShippingAddressChange: M.func, onShippingRateChange: M.func, onSavedPaymentMethodRemove: M.func, onSavedPaymentMethodUpdate: M.func, onAvailablePaymentMethodsChange: M.func, options: M.object }, c.displayName = s, c.__elementType = e, c;
}, z = typeof window > "u", ii = F.createContext(null);
ii.displayName = "EmbeddedCheckoutProviderContext";
var ci = function() {
  var e = Gt("calls useStripe()"), r = e.stripe;
  return r;
};
H("auBankAccount", z);
H("card", z);
H("cardNumber", z);
H("cardExpiry", z);
H("cardCvc", z);
H("iban", z);
var li = H("payment", z);
H("expressCheckout", z);
H("paymentRequestButton", z);
H("linkAuthentication", z);
H("contactDetails", z);
H("address", z);
H("shippingAddress", z);
H("paymentMethodMessaging", z);
H("taxId", z);
H("issuingCardNumberDisplay", z);
H("issuingCardCvcDisplay", z);
H("issuingCardExpiryDisplay", z);
H("issuingCardPinDisplay", z);
H("issuingCardCopyButton", z);
/**
* @license
* SPDX-License-Identifier: Apache-2.0
*/
async function di() {
  const t2 = J.diaBaseApiUrl;
  try {
    const [e, r] = await Promise.all([fetch(`${t2}/quotation/ADA`).then((a) => {
      if (!a.ok) throw new Error(`ADA fetch failed: ${a.status}`);
      return a.json();
    }), fetch(`${t2}/quotation/EURC`).then((a) => {
      if (!a.ok) throw new Error(`EURC fetch failed: ${a.status}`);
      return a.json();
    })]), n = e == null ? void 0 : e.Price, s = r == null ? void 0 : r.Price;
    if (n && s) {
      const a = s / n;
      return console.log(`[cryptoService] Live ADA rate: 1 EUR = ${a.toFixed(6)} ADA`), a;
    }
    throw new Error("Missing Price in DIA API response");
  } catch (e) {
    return console.error("[cryptoService] Failed to fetch live DIA ADA rate, falling back to 2.22:", e), 2.22;
  }
}
const ui = Mo(J.stripe.publishableKey), $t = () => [{ id: "stripe", label: "Adyen (Card, Sofort)", icon: He, color: "from-indigo-500 to-violet-600", shadow: "shadow-indigo-500/20" }, { id: "wero", label: "Wero (Instant)", icon: ze, color: "from-purple-500 to-pink-500", shadow: "shadow-purple-500/20" }, { id: "paypal", label: "PayPal", icon: _s, color: "from-blue-500 to-cyan-500", shadow: "shadow-blue-500/20" }, { id: "crypto", label: "Crypto", icon: cs, color: "from-amber-500 to-orange-500", shadow: "shadow-amber-500/20" }], tn = [{ id: "metamask", name: "MetaMask", color: "bg-[#F6851B] text-white" }, { id: "coinbase", name: "Coinbase Wallet", color: "bg-[#0052FF] text-white" }, { id: "trust", name: "Trust Wallet", color: "bg-[#3375BB] text-white" }, { id: "phantom", name: "Phantom", color: "bg-[#AB9FF2] text-white" }, { id: "lace", name: "Lace (Cardano)", color: "bg-[#0033AD] text-white" }], Mt = { metamask: { symbol: "ETH", rate: 33e-5 }, coinbase: { symbol: "ETH", rate: 33e-5 }, trust: { symbol: "BNB", rate: 16e-4 }, phantom: { symbol: "SOL", rate: 66e-4 }, lace: { symbol: "ADA", rate: 2.22 } };
function zi({ onBack: t2, onInitiateStripe: e, onInitiateWero: r, onInitiateCrypto: n, onComplete: s }) {
  var _a2, _b;
  const [a, i] = S.useState(2.22), [c, d] = S.useState(false);
  S.useEffect(() => {
    let x = true;
    async function w() {
      d(true);
      const V = await di();
      x && (i(V), d(false));
    }
    return w(), () => {
      x = false;
    };
  }, []);
  const u = (x) => {
    var _a3;
    return x === "lace" ? a : ((_a3 = Mt[x]) == null ? void 0 : _a3.rate) || 1;
  }, { cart: p } = es(), { user: m } = ts(), b = S.useMemo(() => p.reduce((x, w) => {
    const V = w.discount_percentage && w.discount_percentage > 0 ? w.price * (1 - w.discount_percentage / 100) : w.price;
    return x + V * w.cart_quantity;
  }, 0), [p]), g = S.useMemo(() => p.reduce((x, w) => x + Number(w.cart_quantity || 0), 0), [p]), k = S.useMemo(() => {
    const x = J.paymentMethods || ["stripe", "adyen", "worldline", "paypal", "crypto"], w = $t(), V = w.filter((te) => x.includes(te.id));
    return V.length > 0 ? V : w;
  }, []), [h, f] = S.useState(() => {
    var _a3;
    return ((_a3 = k[0]) == null ? void 0 : _a3.id) || "stripe";
  }), [y, _] = S.useState("phone"), [j, N] = S.useState(""), [O, I] = S.useState(false), [ie, ge] = S.useState(false), [Pe, ce] = S.useState("idle"), [oe, ve] = S.useState(""), [A, B] = S.useState({ name: "", street: "", city: "", zip: "", phone: "", invoiceEmail: m && !m.is_anonymous && m.email || "", country: "" }), [le, G] = S.useState(false);
  S.useEffect(() => {
    m && !m.is_anonymous && (m.email && B((w) => w.invoiceEmail ? w : { ...w, invoiceEmail: m.email }), (async () => {
      try {
        if (J.databaseProvider === "supabase") {
          const { data: w, error: V } = await ye.from("user_roles").select("name, street, city, zip, phone, country").eq("user_id", m.id || m.$id).maybeSingle();
          w && !V && (B((te) => ({ ...te, name: w.name || te.name, street: w.street || te.street, city: w.city || te.city, zip: w.zip || te.zip, phone: w.phone || te.phone, country: w.country || te.country })), (w.name || w.street || w.city || w.zip || w.phone || w.country) && G(true));
        }
      } catch (w) {
        console.error("Failed to load saved address:", w);
      }
    })());
  }, [m]);
  const [q, Ce] = S.useState(null), [pe, P] = S.useState(null), [K, $] = S.useState(null), [he, T] = S.useState(false), [Z, U] = S.useState(false), [de, Y] = S.useState(false), [fe, ne] = S.useState(null), [C, ee] = S.useState(null), [me, be] = S.useState(false), [we, gt] = S.useState(false), [xe, Un] = S.useState(""), [Xe, Ln] = S.useState(""), yt = !!(A.name && A.street && A.city && A.zip && A.country && A.phone && (h !== "crypto" || q !== null) && (h !== "wero" || y === "qr" || y === "phone" && j.trim().length > 6) && (!we || xe && Xe.length >= 6)), $n = async (x) => {
    if (x === "lace") {
      T(true);
      try {
        if (window.cardano && window.cardano.lace) {
          const V = await (await Tt.enable("lace")).getChangeAddress();
          V ? (Ce("lace"), P(V), $(null)) : alert("Connected to Lace, but no change address found.");
        } else alert("Lace wallet extension not found. Please install Lace to continue.");
      } catch (w) {
        console.error("Failed to connect to Lace wallet:", w), alert(`Connection to Lace wallet was rejected or failed. Details: ${(w == null ? void 0 : w.info) || (w == null ? void 0 : w.message) || JSON.stringify(w)}`);
      } finally {
        T(false);
      }
    } else Ce(x), P("0x" + Math.random().toString(16).slice(2, 10) + "..." + Math.random().toString(16).slice(2, 6)), $(null);
  }, Mn = async () => {
    var _a3;
    if (q) {
      U(true);
      try {
        if (q === "lace") {
          const V = ((_a3 = (await (await Tt.enable("lace")).getBalance()).find((D) => D.unit === "lovelace")) == null ? void 0 : _a3.quantity) || "0", te = (Number(V) / 1e6).toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          $(`${te} ADA`);
        } else setTimeout(() => {
          $(`1.25 ${Mt[q].symbol}`), U(false);
        }, 800);
      } catch (x) {
        console.error("Failed to check balance:", x);
      } finally {
        U(false);
      }
    }
  }, [ar, qn] = S.useState(null), [or, Hn] = S.useState(null), [Ie, zn] = S.useState(null), [bt, ir] = S.useState(false), [cr, lr] = S.useState(null), [dr, ur] = S.useState(null), [Fe, pr] = S.useState(null), [hr, wt] = S.useState(null), [fr, vt] = S.useState(null), [mr, kt] = S.useState(null), [Be, St] = S.useState(null), [Et, xr] = S.useState(false), Nt = S.useRef(false);
  S.useEffect(() => () => {
    if (Nt.current) return;
    const x = Ie || Fe || Be;
    x && (async () => {
      try {
        await ye.rpc("cancel_order_with_inventory", { p_order_id: x });
      } catch (V) {
        console.error("Failed to cancel order on unmount:", V);
      }
    })();
  }, [Ie, Fe, Be]);
  const Vn = async (x) => {
    var _a3, _b2;
    const w = `${A.name}
${A.street}
${A.city}, ${A.zip}
${A.country}`.trim();
    if (!w || !A.phone) return;
    if (le && m && !m.is_anonymous) try {
      J.databaseProvider === "supabase" && await ye.from("user_roles").update({ name: A.name, street: A.street, city: A.city, zip: A.zip, phone: A.phone, country: A.country, is_guest: false }).eq("user_id", m.id || m.$id);
    } catch (D) {
      console.error("Failed to save address to user_roles:", D);
    }
    const V = we ? { email: xe, password: Xe } : void 0, te = ((_a3 = A.invoiceEmail) == null ? void 0 : _a3.trim()) || void 0;
    if (h === "stripe") {
      ir(true);
      try {
        const D = await e(w, A.phone, V, te);
        J.activeFiatGateway === "adyen" && (lr(D.clientSecret), ur(D.paymentId), pr(D.orderId || null));
      } catch (D) {
        console.error("Failed to initiate Adyen payment:", D);
      } finally {
        ir(false);
      }
    } else if (h === "wero" || h === "worldline") {
      xr(true);
      try {
        const D = await r(w, A.phone, j, y, V, te);
        kt(D.paymentId), wt(D.qrCodeData), vt(D.redirectUrl), St(D.orderId || null);
      } catch (D) {
        console.error("Failed to initiate Wero payment:", D);
      } finally {
        xr(false);
      }
    } else if (h === "crypto" && q === "lace") {
      Y(true), ee(null), be(false);
      try {
        const D = await Tt.enable("lace"), Jn = J.cryptoReceiverAddresses.lace, jt = u("lace"), Ct = (b * jt).toFixed(6), Kn = Math.round(Number(Ct) * 1e6).toString(), yr = new Ns({ initiator: D });
        yr.sendLovelace(Jn, Kn);
        const Xn = await yr.build(), Gn = await D.signTx(Xn), Ge = await D.submitTx(Gn);
        ne(Ge), be(true);
        const br = we ? { email: xe, password: Xe } : void 0, wr = ((_b2 = A.invoiceEmail) == null ? void 0 : _b2.trim()) || void 0, ke = await n(w, A.phone, { txHash: Ge, customerAddress: pe || "", walletName: "lace", adaAmount: Ct, rateUsed: jt }, br, wr);
        let vr = false;
        const Yn = (J.cryptoPaymentTimeoutMinutes || 3) * 60 * 1e3, Qn = setTimeout(async () => {
          if (vr = true, be(false), Y(false), ee(`Crypto payment confirmation timed out after ${J.cryptoPaymentTimeoutMinutes || 3} minutes.`), ke.paymentId && J.databaseProvider === "supabase") try {
            await ye.from("payments").update({ provider_status: "expired", completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", ke.paymentId), console.log("Crypto payment marked as expired in DB:", ke.paymentId);
          } catch (_t) {
            console.error("Failed to update payment to expired:", _t);
          }
          if (ke.orderId && J.databaseProvider === "supabase") try {
            await ye.rpc("cancel_order_with_inventory", { p_order_id: ke.orderId }), console.log("Crypto order cancelled on timeout:", ke.orderId);
          } catch (_t) {
            console.error("Failed to cancel crypto order on timeout:", _t);
          }
        }, Yn);
        new Ao("preprodjz45ulPXDFrUvQJC54yYEKRAhJS0ZvZm").onTxConfirmed(Ge, () => {
          vr || (clearTimeout(Qn), Nt.current = true, s(h, w, A.phone, br, wr, void 0, void 0, { txHash: Ge, customerAddress: pe || "", walletName: "lace", adaAmount: Ct, rateUsed: jt, paymentId: ke.paymentId }));
        });
      } catch (D) {
        console.error("Cardano payment transaction failed:", D), ee((D == null ? void 0 : D.message) || (D == null ? void 0 : D.info) || JSON.stringify(D));
      } finally {
        Y(false);
      }
    } else s(h, w, A.phone, V, te, x);
  }, Wn = async () => {
    await Vn();
  }, gr = $t().find((x) => x.id === h) || $t()[0];
  return o.jsxs("div", { className: "min-h-screen bg-background transition-colors duration-500 overflow-x-hidden", children: [o.jsx("div", { className: "bg-card text-card-foreground border-b border-gray-100 dark:border-slate-800 sticky top-0 z-30 transition-colors", children: o.jsxs("div", { className: "max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center gap-3 sm:gap-4", children: [o.jsx("button", { onClick: t2, className: "p-2 sm:p-2.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-all text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white active:scale-95 shrink-0", children: o.jsx(js, { className: "w-5 h-5" }) }), o.jsxs("div", { className: "flex-grow min-w-0", children: [o.jsx("h1", { className: "text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight truncate", children: "Checkout" }), o.jsxs("p", { className: "text-[10px] sm:text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-wide truncate", children: [g, " item", g !== 1 ? "s" : "", " in your order"] })] }), o.jsxs("div", { className: "flex items-center gap-1 sm:gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shrink-0", children: [o.jsx($e, { className: "w-3 h-3 sm:w-3.5 sm:h-3.5" }), o.jsx("span", { className: "text-[9px] sm:text-[10px] font-bold uppercase tracking-widest hidden sm:inline", children: "Secure" })] })] }) }), o.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: [o.jsx("div", { className: "flex items-center justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8", children: ["Shipping", "Payment", "Confirm"].map((x, w) => o.jsxs("div", { className: "flex items-center gap-2", children: [o.jsxs("div", { className: `flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all ${w <= 1 ? "bg-gray-900 dark:bg-indigo-600 text-white" : "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-500"}`, children: [o.jsx("span", { className: "w-4 h-4 flex items-center justify-center text-[10px] rounded-full bg-white/20", children: w + 1 }), o.jsx("span", { className: "hidden sm:inline", children: x })] }), w < 2 && o.jsx(rs, { className: "w-4 h-4 text-gray-300" })] }, x)) }), o.jsxs("div", { className: "grid lg:grid-cols-12 gap-6 sm:gap-8 items-start", children: [o.jsxs("div", { className: "lg:col-span-7 space-y-6", children: [o.jsxs(W.section, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "bg-card text-card-foreground rounded-[1rem] border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm transition-colors", children: [o.jsxs("div", { className: "px-4 sm:px-7 py-4 sm:py-5 border-b border-gray-50 dark:border-slate-800 flex items-center gap-3", children: [o.jsx("div", { className: "p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl transition-colors", children: o.jsx(ns, { className: "w-5 h-5" }) }), o.jsxs("div", { children: [o.jsx("h2", { className: "text-base font-extrabold text-gray-900 dark:text-white tracking-tight", children: "Shipping Address" }), o.jsx("p", { className: "text-[11px] font-medium text-gray-400 dark:text-gray-500", children: "Where should we deliver your order?" })] })] }), o.jsxs("div", { className: "p-4 sm:p-7 grid sm:grid-cols-2 gap-4 sm:gap-5", children: [o.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [o.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1", children: [o.jsx(ss, { className: "w-3 h-3" }), " Full Name"] }), o.jsx("input", { type: "text", value: A.name, onChange: (x) => B((w) => ({ ...w, name: x.target.value })), placeholder: "John Doe", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), o.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [o.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1", children: [o.jsx(as, { className: "w-3 h-3" }), " Street Address"] }), o.jsx("input", { type: "text", value: A.street, onChange: (x) => B((w) => ({ ...w, street: x.target.value })), placeholder: "123 Magic Avenue", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), o.jsxs("div", { className: "space-y-1.5", children: [o.jsx("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5", children: "City" }), o.jsx("input", { type: "text", value: A.city, onChange: (x) => B((w) => ({ ...w, city: x.target.value })), placeholder: "Magical Product town", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), o.jsxs("div", { className: "space-y-1.5", children: [o.jsx("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5", children: "ZIP Code" }), o.jsx("input", { type: "text", value: A.zip, onChange: (x) => B((w) => ({ ...w, zip: x.target.value })), placeholder: "12345", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), o.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [o.jsx("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5", children: "Country" }), o.jsxs("select", { value: A.country, onChange: (x) => B((w) => ({ ...w, country: x.target.value })), className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium text-gray-900 dark:text-white", children: [o.jsx("option", { value: "", children: "Select a country" }), o.jsx("option", { value: "FR", children: "France" }), o.jsx("option", { value: "DE", children: "Germany" }), o.jsx("option", { value: "BE", children: "Belgium" }), o.jsx("option", { value: "NL", children: "Netherlands" }), o.jsx("option", { value: "ES", children: "Spain" }), o.jsx("option", { value: "IT", children: "Italy" }), o.jsx("option", { value: "GB", children: "United Kingdom" }), o.jsx("option", { value: "US", children: "United States" })] })] }), o.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [o.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1", children: [o.jsx(Cs, { className: "w-3 h-3" }), " Mobile or WhatsApp Number"] }), o.jsx("input", { type: "tel", value: A.phone, onChange: (x) => B((w) => ({ ...w, phone: x.target.value })), placeholder: "+1 (555) 000-0000", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), o.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [o.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1", children: [o.jsx(Sr, { className: "w-3 h-3" }), " Email for Invoice ", o.jsx("span", { className: "text-gray-300 dark:text-gray-600 normal-case font-medium", children: "(optional)" })] }), o.jsx("input", { type: "email", value: A.invoiceEmail, onChange: (x) => B((w) => ({ ...w, invoiceEmail: x.target.value })), placeholder: "your@email.com", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), m && !m.is_anonymous && o.jsx("div", { className: "sm:col-span-2 pt-2", children: o.jsxs("label", { className: "flex items-center gap-3 p-4 bg-indigo-50/30 dark:bg-indigo-900/10 border border-indigo-100/50 dark:border-indigo-900/30 rounded-2xl cursor-pointer hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group", children: [o.jsxs("div", { className: "relative flex items-center justify-center mt-0.5", children: [o.jsx("input", { type: "checkbox", checked: le, onChange: (x) => G(x.target.checked), className: "peer appearance-none w-5 h-5 border-2 border-indigo-300 dark:border-indigo-700 rounded bg-white dark:bg-slate-800 checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" }), o.jsx(rt, { className: "w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" })] }), o.jsxs("div", { children: [o.jsx("h4", { className: "text-xs font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors", children: "Save address for faster checkout later" }), o.jsx("p", { className: "text-[10px] text-gray-500 dark:text-gray-400 mt-0.5", children: "We will save your name, street, city, ZIP, country, and phone number to your profile." })] })] }) })] })] }), o.jsxs(W.section, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "bg-card text-card-foreground rounded-[1rem] border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm transition-colors", children: [o.jsxs("div", { className: "px-4 sm:px-7 py-4 sm:py-5 border-b border-gray-50 dark:border-slate-800 flex items-center gap-3", children: [o.jsx("div", { className: "p-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl transition-colors", children: o.jsx(He, { className: "w-5 h-5" }) }), o.jsxs("div", { children: [o.jsx("h2", { className: "text-base font-extrabold text-gray-900 dark:text-white tracking-tight", children: "Payment Method" }), o.jsx("p", { className: "text-[11px] font-medium text-gray-400 dark:text-gray-500", children: "Choose how you'd like to pay" })] })] }), o.jsxs("div", { className: "p-4 sm:p-7", children: [o.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-5 sm:mb-6", children: k.map((x) => o.jsxs(W.button, { onClick: () => f(x.id), whileTap: { scale: 0.96 }, className: `relative flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 overflow-hidden ${h === x.id ? `border-transparent text-white shadow-lg ${x.shadow}` : "border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 text-gray-400 dark:text-gray-500 hover:border-gray-200 dark:hover:border-slate-600 hover:text-gray-600 dark:hover:text-gray-300"}`, children: [h === x.id && o.jsx(W.div, { layoutId: "payment-bg", className: `absolute inset-0 bg-gradient-to-br ${x.color}`, transition: { type: "spring", stiffness: 300, damping: 25 } }), o.jsx(x.icon, { className: "w-5 h-5 sm:w-6 sm:h-6 relative z-10" }), o.jsx("span", { className: "text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest relative z-10", children: x.label })] }, x.id)) }), o.jsxs(At, { mode: "wait", children: [h === "stripe" && o.jsx(W.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "space-y-4 overflow-hidden py-2", children: o.jsxs("div", { className: "p-4 bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl flex flex-col items-center text-center gap-3", children: [o.jsx(He, { className: "w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-pulse" }), o.jsxs("div", { children: [o.jsx("p", { className: "text-sm font-bold text-gray-800 dark:text-gray-200", children: "Secure Stripe Checkout" }), o.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm", children: "Click 'Confirm Order' to proceed to the secure, encrypted Stripe-hosted checkout page." })] })] }) }, "stripe-fields"), h === "paypal" && o.jsx(W.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "overflow-hidden", children: o.jsx("div", { className: "p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 transition-colors text-center", children: o.jsx("p", { className: "text-sm font-semibold text-blue-700 dark:text-blue-300", children: "You'll be redirected to PayPal to complete payment." }) }) }, "paypal-info"), h === "crypto" && o.jsx(W.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "overflow-hidden", children: o.jsxs("div", { className: "p-4 sm:p-5 bg-gradient-to-b from-amber-50/50 to-amber-50 rounded-2xl border border-amber-200/60 flex flex-col gap-3 sm:gap-4", children: [o.jsxs("div", { className: "text-center", children: [o.jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-600 rounded-full mb-3", children: o.jsx(Cr, { className: "w-6 h-6" }) }), o.jsx("h3", { className: "text-sm font-extrabold text-amber-900 tracking-tight", children: "Connect Web3 Wallet" }), o.jsx("p", { className: "text-[11px] font-medium text-amber-700/70 mt-1", children: "Select a wallet to proceed with crypto payment." })] }), o.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5", children: tn.map((x) => o.jsxs("button", { onClick: () => $n(x.id), disabled: he, className: `relative flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl font-bold text-[10px] sm:text-xs transition-all duration-200 ${q === x.id ? `${x.color} ring-2 ring-offset-2 ring-amber-400 shadow-md` : "bg-white text-gray-700 border border-amber-100 hover:border-amber-300 hover:bg-amber-50/50"} ${he ? "opacity-50 cursor-not-allowed" : ""}`, children: [o.jsxs("span", { className: "truncate mr-2", children: [x.name, " ", he && x.id === "lace" ? "(Connecting...)" : ""] }), q === x.id && o.jsx(rt, { className: "w-4 h-4 shrink-0" })] }, x.id)) }), q && o.jsxs(W.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "mt-2 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-amber-200/50 text-center space-y-3", children: [o.jsxs("div", { children: [o.jsxs("p", { className: "text-xs font-semibold text-amber-800", children: ["Connected to ", (_a2 = tn.find((x) => x.id === q)) == null ? void 0 : _a2.name] }), pe && o.jsx("p", { className: "text-[10px] font-mono text-amber-600/80 mt-1 bg-amber-100/50 block px-2 py-1 rounded break-all select-all", children: pe }), o.jsx("div", { className: "mt-3", children: K ? o.jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-lg border border-green-200/50", children: [o.jsx(jr, { className: "w-3.5 h-3.5" }), K] }) : o.jsxs("button", { onClick: Mn, disabled: Z, className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50", children: [o.jsx(jr, { className: "w-3.5 h-3.5" }), Z ? "Checking..." : "Check Balance"] }) })] }), o.jsxs("div", { className: "pt-3 border-t border-amber-200/50 text-left space-y-2", children: [o.jsx("p", { className: "text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-1", children: "Payment Details" }), o.jsxs("div", { className: "flex justify-between items-center bg-amber-50/80 px-3 py-2 rounded-lg", children: [o.jsx("span", { className: "text-xs font-medium text-amber-700", children: "Amount Due" }), o.jsxs("span", { className: "text-sm font-extrabold text-amber-900", children: [(b * u(q)).toFixed(4), " ", ((_b = Mt[q]) == null ? void 0 : _b.symbol) || "ADA"] })] }), o.jsxs("div", { className: "bg-amber-50/80 px-3 py-2 rounded-lg space-y-1", children: [o.jsx("span", { className: "text-[10px] font-bold text-amber-700/70 uppercase tracking-wider", children: "Send to Address" }), o.jsx("p", { className: "text-xs font-mono text-amber-900 break-all select-all bg-white/50 p-1.5 rounded", children: J.cryptoReceiverAddresses[q] })] })] })] })] }) }, "crypto-info"), h === "wero" && o.jsx(W.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "overflow-hidden", children: o.jsxs("div", { className: "p-4 sm:p-5 bg-gradient-to-b from-purple-50/50 to-purple-50 rounded-2xl border border-purple-200/60 flex flex-col gap-3 sm:gap-4", children: [o.jsxs("div", { className: "text-center", children: [o.jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full mb-3 animate-pulse", children: o.jsx(ze, { className: "w-6 h-6" }) }), o.jsx("h3", { className: "text-sm font-extrabold text-purple-900 tracking-tight", children: "Wero Instant Transfer" }), o.jsx("p", { className: "text-[11px] font-medium text-purple-700/70 mt-1", children: "Pay instantly and securely from your banking app." })] }), o.jsxs("div", { className: "flex gap-2 p-1 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-200/50", children: [o.jsx("button", { type: "button", onClick: () => _("phone"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${y === "phone" ? "bg-purple-600 text-white shadow-sm font-black" : "text-purple-600/70 hover:text-purple-700 hover:bg-purple-50/30"}`, children: "Phone Number" }), o.jsx("button", { type: "button", onClick: () => _("qr"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${y === "qr" ? "bg-purple-600 text-white shadow-sm font-black" : "text-purple-600/70 hover:text-purple-700 hover:bg-purple-50/30"}`, children: "QR Code" })] }), y === "phone" ? o.jsxs("div", { className: "space-y-1.5 text-left bg-white/40 p-3.5 rounded-xl border border-purple-200/30", children: [o.jsxs("label", { className: "text-[10px] font-bold text-purple-400 dark:text-purple-500 uppercase tracking-widest ml-0.5 flex items-center gap-1", children: [o.jsx(ze, { className: "w-3 h-3" }), " Wero Registered Phone"] }), o.jsx("input", { type: "tel", value: j, onChange: (x) => N(x.target.value), placeholder: "+33 6 12 34 56 78", className: "w-full px-4 py-3 bg-white border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all text-sm font-medium text-gray-800" }), o.jsx("p", { className: "text-[9px] text-purple-600/60 font-semibold mt-1", children: "Ensure this phone number is registered with Wero in your bank app." })] }) : o.jsxs("div", { className: "p-4 bg-white/40 text-center rounded-xl border border-purple-200/30 space-y-1", children: [o.jsx(nn, { className: "w-8 h-8 text-purple-600 mx-auto opacity-80" }), o.jsx("p", { className: "text-xs font-bold text-purple-900", children: "QR Code Checkout" }), o.jsx("p", { className: "text-[10px] text-purple-700/60 leading-relaxed", children: "A checkout QR code will generate for you to scan and authorize in your banking app." })] })] }) }, "wero-info")] })] })] })] }), o.jsx("div", { className: "lg:col-span-5 relative", children: o.jsxs(W.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.15 }, className: "sticky top-24 rounded-[1rem] overflow-hidden", children: [o.jsxs("div", { className: "bg-gradient-to-b from-gray-900 to-gray-950 text-white p-5 sm:p-7 relative", children: [o.jsx("div", { className: "absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" }), o.jsxs("div", { className: "flex items-center justify-between mb-6 relative", children: [o.jsx("h2", { className: "text-lg font-extrabold tracking-tight", children: "Order Summary" }), o.jsxs("span", { className: "text-[10px] font-bold text-white/40 uppercase tracking-widest bg-white/[0.06] px-2.5 py-1 rounded-full", children: [g, " item", g !== 1 ? "s" : ""] })] }), o.jsx("div", { className: "space-y-3 mb-6 max-h-[280px] overflow-y-auto pr-1 relative", style: { scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }, children: p.map((x, w) => o.jsxs(W.div, { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.2 + w * 0.05 }, className: "flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] transition-colors group", children: [o.jsx("div", { className: "w-11 h-11 rounded-lg overflow-hidden bg-white/[0.08] flex-shrink-0 flex items-center justify-center", children: o.jsx("img", { src: x.image_url, alt: x.title, className: "w-full h-full object-contain p-1", referrerPolicy: "no-referrer" }) }), o.jsxs("div", { className: "min-w-0 flex-grow", children: [o.jsx("h4", { className: "font-bold text-sm truncate text-white/90", children: x.title }), o.jsxs("p", { className: "text-[11px] text-white/30 font-medium tabular-nums", children: [x.cart_quantity, " \xD7 ", J.currency_symbol, (x.discount_percentage && x.discount_percentage > 0 ? x.price * (1 - x.discount_percentage / 100) : x.price).toFixed(2)] })] }), o.jsxs("div", { className: "font-bold text-sm tabular-nums text-white/70 group-hover:text-white transition-colors", children: [J.currency_symbol, (x.cart_quantity * (x.discount_percentage && x.discount_percentage > 0 ? x.price * (1 - x.discount_percentage / 100) : x.price)).toFixed(2)] })] }, x.id)) }), o.jsxs("div", { className: "space-y-2.5 pt-5 border-t border-white/[0.06]", children: [o.jsxs("div", { className: "flex justify-between text-sm", children: [o.jsx("span", { className: "text-white/40 font-medium", children: "Subtotal" }), o.jsxs("span", { className: "text-white/70 font-bold tabular-nums", children: [J.currency_symbol, b.toFixed(2)] })] }), o.jsxs("div", { className: "flex justify-between text-sm", children: [o.jsx("span", { className: "text-white/40 font-medium", children: "Shipping" }), o.jsx("span", { className: "text-emerald-400 font-bold text-xs bg-emerald-400/10 px-2 py-0.5 rounded-full uppercase tracking-widest", children: "Free" })] }), o.jsx("div", { className: "h-px bg-white/[0.06] my-1" }), o.jsxs("div", { className: "flex justify-between items-baseline pt-2", children: [o.jsx("span", { className: "font-extrabold text-white/60 text-sm", children: "Total" }), o.jsxs(W.span, { initial: { scale: 1.08 }, animate: { scale: 1 }, className: "text-xl sm:text-3xl font-black tabular-nums bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent", children: [J.currency_symbol, b.toFixed(2)] }, b)] })] })] }), (m == null ? void 0 : m.is_anonymous) && o.jsxs("div", { className: "p-5 bg-indigo-50/50 dark:bg-indigo-900/10 border-x border-gray-100 dark:border-slate-800 transition-colors", children: [o.jsxs("label", { className: "flex items-start gap-3 cursor-pointer group", children: [o.jsxs("div", { className: "relative flex items-center justify-center mt-0.5", children: [o.jsx("input", { type: "checkbox", checked: we, onChange: (x) => gt(x.target.checked), className: "peer appearance-none w-5 h-5 border-2 border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" }), o.jsx(rt, { className: "w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" })] }), o.jsxs("div", { children: [o.jsx("h4", { className: "text-sm font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors", children: "Save my details for next time" }), o.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-0.5", children: "Create a permanent account to track your order and save preferences." })] })] }), o.jsx(At, { children: we && o.jsxs(W.div, { initial: { opacity: 0, height: 0, marginTop: 0 }, animate: { opacity: 1, height: "auto", marginTop: 16 }, exit: { opacity: 0, height: 0, marginTop: 0 }, className: "space-y-3 overflow-hidden", children: [o.jsxs("div", { className: "space-y-1.5", children: [o.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-0.5 flex items-center gap-1", children: [o.jsx(Sr, { className: "w-3 h-3" }), " Email"] }), o.jsx("input", { type: "email", value: xe, onChange: (x) => Un(x.target.value), placeholder: "your@email.com", className: "w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium" })] }), o.jsxs("div", { className: "space-y-1.5", children: [o.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-0.5 flex items-center gap-1", children: [o.jsx(os, { className: "w-3 h-3" }), " Password"] }), o.jsx("input", { type: "password", value: Xe, onChange: (x) => Ln(x.target.value), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium" })] })] }) })] }), o.jsxs("div", { className: "p-4 sm:p-5 bg-card text-card-foreground border border-gray-100 dark:border-slate-800 border-t-0 rounded-b-[1rem] transition-colors", children: [o.jsx(W.button, { onClick: Wn, disabled: !yt || bt || Et, whileTap: { scale: 0.97 }, className: `w-full py-4 rounded-2xl font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 ${yt && !bt && !Et ? `bg-gradient-to-r ${gr.color} text-white shadow-lg ${gr.shadow} hover:brightness-110` : "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"}`, children: bt || Et ? o.jsxs(o.Fragment, { children: [o.jsx(Ae, { className: "w-4 h-4 animate-spin" }), "Initiating secure payment..."] }) : yt ? o.jsxs(o.Fragment, { children: [o.jsx(is, { className: "w-4 h-4" }), "Confirm Order"] }) : o.jsxs(o.Fragment, { children: [o.jsx($e, { className: "w-4 h-4" }), "Fill in all fields"] }) }), o.jsxs("p", { className: "text-center text-[10px] font-medium text-gray-400 mt-3 flex items-center justify-center gap-1", children: [o.jsx($e, { className: "w-3 h-3" }), "256-bit encrypted \xB7 Secure checkout"] })] })] }) })] })] }), o.jsxs(At, { children: [ar && or && o.jsx(hi, { clientSecret: ar, paymentId: or, totalAmount: b, shippingInfo: A, user: m, onClose: async () => {
    if (Ie) try {
      await ye.rpc("cancel_order_with_inventory", { p_order_id: Ie }), console.log("Stripe order cancelled on modal close:", Ie);
    } catch (x) {
      console.error("Failed to cancel order on modal close:", x);
    }
    qn(null), Hn(null), zn(null);
  } }), cr && dr && o.jsx(fi, { sessionData: cr, paymentId: dr, totalAmount: b, shippingInfo: A, user: m, onClose: async () => {
    if (Fe) try {
      await ye.rpc("cancel_order_with_inventory", { p_order_id: Fe }), console.log("Adyen order cancelled on modal close:", Fe);
    } catch (x) {
      console.error("Failed to cancel order on modal close:", x);
    }
    lr(null), ur(null), pr(null);
  } }), mr && (hr || fr) && o.jsx(mi, { paymentId: mr, qrCodeData: hr || "", redirectUrl: fr || "", totalAmount: b, weroPhone: j, weroMode: y, onClose: async () => {
    if (Be) try {
      await ye.rpc("cancel_order_with_inventory", { p_order_id: Be }), console.log("Wero order cancelled on modal close:", Be);
    } catch (x) {
      console.error("Failed to cancel order on modal close:", x);
    }
    kt(null), wt(null), vt(null), St(null);
  }, onSuccess: (x) => {
    Nt.current = true, kt(null), wt(null), vt(null), St(null), s(h, "", "", void 0, A.invoiceEmail, "succeeded", x);
  } }), (de || me || C) && o.jsx(W.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm", children: o.jsx(W.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "relative w-full max-w-md overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-center", children: C ? o.jsxs("div", { className: "space-y-4", children: [o.jsx("div", { className: "mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600", children: o.jsx(Me, { className: "w-6 h-6" }) }), o.jsx("h3", { className: "text-lg font-black text-slate-950 dark:text-white uppercase tracking-wider", children: "Transaction Failed" }), o.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-h-40 overflow-y-auto break-words font-mono bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800", children: C }), o.jsx("div", { className: "pt-2", children: o.jsx("button", { onClick: () => ee(null), className: "w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider transition-all", children: "Close" }) })] }) : o.jsxs("div", { className: "space-y-5 py-3", children: [o.jsxs("div", { className: "mx-auto relative flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600", children: [o.jsx(Ae, { className: "w-8 h-8 animate-spin text-amber-500" }), o.jsx(Cr, { className: "absolute w-4 h-4 text-amber-600" })] }), o.jsxs("div", { children: [o.jsx("h3", { className: "text-base font-black text-slate-950 dark:text-white uppercase tracking-wider", children: me ? "Confirming Blockchain Payment" : "Preparing Transaction" }), o.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed", children: me ? "Waiting for the transaction to be mined into a block on Cardano Preproduction blockchain. This typically takes 10 to 20 seconds." : "Please approve and sign the payment request in your connected Lace wallet window." })] }), fe && o.jsxs("div", { className: "p-3 bg-amber-50/50 dark:bg-amber-950/10 rounded-2xl border border-amber-200/50 dark:border-amber-900/30 space-y-1.5", children: [o.jsx("span", { className: "text-[9px] font-black uppercase tracking-wider text-amber-700/80", children: "Transaction Hash" }), o.jsx("p", { className: "text-[10px] font-mono text-slate-800 dark:text-slate-200 select-all truncate", children: fe }), o.jsxs("a", { href: `https://preprod.cardanoscan.io/transaction/${fe}`, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 hover:text-amber-700 transition-colors uppercase tracking-wider mt-1 animate-pulse", children: ["View on Cardanoscan ", o.jsx(Ht, { className: "w-3 h-3" })] })] })] }) }) })] })] });
}
function pi({ clientSecret: t2, paymentId: e, totalAmount: r, shippingInfo: n, user: s, onClose: a }) {
  const i = ci(), c = si(), [d, u] = S.useState(false), [p, m] = S.useState(null), b = { layout: "accordion", fields: { billingDetails: { address: "auto", email: "auto", phone: "auto" } } }, g = (h) => {
    const f = h.replace(/\s+/g, "");
    return f.startsWith("+") ? f : f.startsWith("0") ? `+33${f.slice(1)}` : f;
  }, k = async (h) => {
    if (h.preventDefault(), !i || !c) return;
    u(true), m(null);
    const { error: f } = await i.confirmPayment({ elements: c, confirmParams: { return_url: `${window.location.origin}${window.location.pathname.endsWith("/") ? window.location.pathname : window.location.pathname + "/"}?payment_id=${e}`, payment_method_data: { billing_details: { name: n.name || void 0, email: n.invoiceEmail || (s == null ? void 0 : s.email) || void 0, phone: g(n.phone) || void 0, address: { line1: n.street || void 0, city: n.city || void 0, postal_code: n.zip || void 0, country: n.country || void 0 } } } } });
    f && (m(f.message || "An unexpected error occurred."), u(false));
  };
  return o.jsxs("form", { onSubmit: k, className: "space-y-4", children: [o.jsx(li, { options: b }), p && o.jsxs("div", { className: "p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-xl text-xs flex items-start gap-2", children: [o.jsx(Me, { className: "w-4 h-4 shrink-0 mt-0.5" }), o.jsx("span", { children: p })] }), o.jsxs("div", { className: "flex gap-3 pt-2", children: [o.jsx("button", { type: "button", onClick: a, disabled: d, className: "flex-1 py-3 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-extrabold uppercase tracking-wider transition-colors disabled:opacity-50", children: "Cancel" }), o.jsx("button", { type: "submit", disabled: !i || d, className: "flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50", children: d ? o.jsxs(o.Fragment, { children: [o.jsx(Ae, { className: "w-4 h-4 animate-spin" }), "Processing..."] }) : o.jsxs(o.Fragment, { children: [o.jsx($e, { className: "w-4 h-4" }), "Pay Now"] }) })] })] });
}
function hi({ clientSecret: t2, paymentId: e, totalAmount: r, shippingInfo: n, user: s, onClose: a }) {
  const i = document.documentElement.classList.contains("dark"), c = (u) => {
    const p = u.replace(/\s+/g, "");
    return p.startsWith("+") ? p : p.startsWith("0") ? `+33${p.slice(1)}` : p;
  }, d = { clientSecret: t2, appearance: { theme: i ? "night" : "stripe", variables: { colorPrimary: "#4f46e5" } }, defaultValues: { billingDetails: { name: n.name || void 0, email: n.invoiceEmail || (s == null ? void 0 : s.email) || void 0, phone: c(n.phone) || void 0, address: { line1: n.street || void 0, city: n.city || void 0, postalCode: n.zip || void 0, country: n.country || void 0 } } } };
  return o.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto", children: o.jsxs(W.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6", children: [o.jsxs("div", { className: "flex items-center justify-between", children: [o.jsxs("div", { className: "flex items-center gap-2.5", children: [o.jsx("div", { className: "p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl", children: o.jsx(He, { className: "w-5 h-5" }) }), o.jsxs("div", { children: [o.jsx("h3", { className: "text-base font-extrabold text-gray-900 dark:text-white", children: "Secure Checkout" }), o.jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: "Provide payment details to complete purchase" })] })] }), o.jsx("button", { onClick: a, className: "p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors", children: o.jsx(Qt, { className: "w-5 h-5" }) })] }), o.jsx(Bn, { stripe: ui, options: d, children: o.jsx(pi, { clientSecret: t2, paymentId: e, totalAmount: r, shippingInfo: n, user: s, onClose: a }) })] }) });
}
function fi({ sessionData: t2, paymentId: e, totalAmount: r, shippingInfo: n, user: s, onClose: a }) {
  const [i, c] = S.useState("card"), [d, u] = S.useState(""), [p, m] = S.useState(""), [b, g] = S.useState(""), [k, h] = S.useState(n.name || ""), [f, y] = S.useState(false), [_, j] = S.useState(null), N = (O) => {
    if (O.preventDefault(), i === "card") {
      if (d.replace(/\s/g, "").length < 16) {
        j("Please enter a valid card number.");
        return;
      }
      if (p.length < 5) {
        j("Please enter a valid expiry date (MM/YY).");
        return;
      }
      if (b.length < 3) {
        j("Please enter a valid CVV code.");
        return;
      }
    }
    j(null), y(true), setTimeout(() => {
      const I = `${window.location.origin}${window.location.pathname.endsWith("/") ? window.location.pathname : window.location.pathname + "/"}?payment_id=${e}`;
      window.location.href = I;
    }, 2e3);
  };
  return o.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto", children: o.jsxs(W.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6", children: [o.jsxs("div", { className: "flex items-center justify-between", children: [o.jsxs("div", { className: "flex items-center gap-2.5", children: [o.jsx("div", { className: "p-2 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-xl animate-pulse", children: o.jsx(Rt, { className: "w-5 h-5" }) }), o.jsxs("div", { children: [o.jsxs("h3", { className: "text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2", children: ["Adyen Checkout ", o.jsx("span", { className: "text-[10px] px-1.5 py-0.5 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 rounded font-black tracking-wider uppercase", children: "Sandbox" })] }), o.jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: "Fast and secure global payments" })] })] }), o.jsx("button", { onClick: a, className: "p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors", children: o.jsx(Qt, { className: "w-5 h-5" }) })] }), o.jsxs("div", { className: "flex gap-2 p-1 bg-gray-50 dark:bg-slate-800/40 rounded-xl border border-gray-100 dark:border-slate-800", children: [o.jsx("button", { type: "button", onClick: () => c("card"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${i === "card" ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black" : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: "Credit Card" }), o.jsx("button", { type: "button", onClick: () => c("sofort"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${i === "sofort" ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black" : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: "Sofort" }), o.jsx("button", { type: "button", onClick: () => c("ideal"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${i === "ideal" ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black" : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: "iDEAL" })] }), o.jsxs("form", { onSubmit: N, className: "space-y-4", children: [i === "card" && o.jsxs("div", { className: "space-y-3.5", children: [o.jsxs("div", { children: [o.jsx("label", { className: "block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1", children: "Card Number" }), o.jsxs("div", { className: "relative", children: [o.jsx("input", { type: "text", placeholder: "4111 1111 1111 1111", maxLength: 19, value: d, onChange: (O) => {
    const I = O.target.value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim();
    u(I);
  }, className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none", required: true }), o.jsx(He, { className: "absolute right-3.5 top-3 w-4 h-4 text-gray-400" })] })] }), o.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [o.jsxs("div", { children: [o.jsx("label", { className: "block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1", children: "Expiry Date" }), o.jsx("input", { type: "text", placeholder: "MM/YY", maxLength: 5, value: p, onChange: (O) => {
    const I = O.target.value.replace(/\D/g, "");
    I.length >= 2 ? m(`${I.slice(0, 2)}/${I.slice(2, 4)}`) : m(I);
  }, className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none", required: true })] }), o.jsxs("div", { children: [o.jsx("label", { className: "block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1", children: "Security Code (CVV)" }), o.jsx("input", { type: "password", placeholder: "123", maxLength: 4, value: b, onChange: (O) => g(O.target.value.replace(/\D/g, "")), className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none", required: true })] })] }), o.jsxs("div", { children: [o.jsx("label", { className: "block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1", children: "Cardholder Name" }), o.jsx("input", { type: "text", placeholder: "John Doe", value: k, onChange: (O) => h(O.target.value), className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none", required: true })] })] }), i === "sofort" && o.jsxs("div", { className: "p-5 text-center bg-gray-50 dark:bg-slate-800/20 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl space-y-2", children: [o.jsx(Rt, { className: "w-8 h-8 text-indigo-500 mx-auto animate-bounce" }), o.jsx("h4", { className: "text-xs font-extrabold text-gray-800 dark:text-white", children: "Redirecting to Sofort Banking" }), o.jsx("p", { className: "text-[10px] text-gray-400 dark:text-gray-500", children: "You will be securely redirected to complete payment with your bank account." })] }), i === "ideal" && o.jsxs("div", { className: "p-5 text-center bg-gray-50 dark:bg-slate-800/20 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl space-y-2", children: [o.jsx(Rt, { className: "w-8 h-8 text-emerald-500 mx-auto animate-bounce" }), o.jsx("h4", { className: "text-xs font-extrabold text-gray-800 dark:text-white", children: "Redirecting to iDEAL Sandbox" }), o.jsx("p", { className: "text-[10px] text-gray-400 dark:text-gray-500", children: "You will be securely redirected to select your Dutch bank and authorize payment." })] }), _ && o.jsxs("div", { className: "p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 rounded-xl text-xs flex items-start gap-2", children: [o.jsx(Me, { className: "w-4 h-4 shrink-0 mt-0.5" }), o.jsx("span", { children: _ })] }), o.jsxs("div", { className: "flex gap-3 pt-2", children: [o.jsx("button", { type: "button", onClick: a, disabled: f, className: "flex-1 py-3 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-extrabold uppercase tracking-wider transition-colors disabled:opacity-50", children: "Cancel" }), o.jsx("button", { type: "submit", disabled: f, className: "flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50", children: f ? o.jsxs(o.Fragment, { children: [o.jsx(Ae, { className: "w-4 h-4 animate-spin" }), "Processing..."] }) : o.jsxs(o.Fragment, { children: [o.jsx($e, { className: "w-4 h-4" }), "Pay ", J.currencySymbol, r.toFixed(2)] }) })] })] })] }) });
}
function mi({ paymentId: t2, qrCodeData: e, redirectUrl: r, totalAmount: n, weroPhone: s, weroMode: a, onClose: i, onSuccess: c }) {
  const [d, u] = S.useState(false), [p, m] = S.useState(null), b = async (k) => {
    u(true), m(null);
    try {
      const { data: h, error: f } = await ye.functions.invoke("wero-checkout", { body: { action: "confirm", payment_id: t2, status: k } });
      if (f) throw new Error(f.message || "Failed to confirm Wero payment.");
      (h == null ? void 0 : h.status) === "succeeded" ? c(h.order_id) : (m(`Payment simulation completed with status: ${(h == null ? void 0 : h.status) || k}`), u(false), (k === "cancelled" || k === "failed") && setTimeout(() => {
        i();
      }, 1500));
    } catch (h) {
      console.error("Wero simulation error:", h), m(h.message || "Simulation request failed."), u(false);
    }
  }, g = r && r.includes("worldline-solutions.com");
  return o.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto", children: o.jsxs(W.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6", children: [o.jsxs("div", { className: "flex items-center justify-between", children: [o.jsxs("div", { className: "flex items-center gap-2.5", children: [o.jsx("div", { className: "p-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl animate-pulse", children: o.jsx(ze, { className: "w-5 h-5" }) }), o.jsxs("div", { children: [o.jsxs("h3", { className: "text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2", children: ["Wero Transfer ", o.jsx("span", { className: "text-[10px] px-1.5 py-0.5 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded font-black tracking-wider uppercase", children: g ? "Preprod" : "Sandbox" })] }), o.jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: "Fast and secure account-to-account transfer" })] })] }), o.jsx("button", { onClick: () => b("cancelled"), disabled: d, className: "p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors disabled:opacity-50", children: o.jsx(Qt, { className: "w-5 h-5" }) })] }), a === "phone" ? o.jsxs("div", { className: "p-5 text-center bg-purple-50/50 dark:bg-purple-950/10 border border-dashed border-purple-200 dark:border-purple-900/50 rounded-2xl space-y-3", children: [o.jsx(ze, { className: "w-10 h-10 text-purple-500 mx-auto animate-bounce" }), o.jsxs("div", { children: [o.jsx("h4", { className: "text-xs font-black text-gray-800 dark:text-white uppercase tracking-wider", children: "Pending Bank Authorization" }), o.jsxs("p", { className: "text-[10px] text-gray-500 dark:text-gray-400 mt-1", children: ["A transfer request for ", o.jsxs("span", { className: "font-extrabold text-purple-600 dark:text-purple-400", children: [J.currencySymbol, n.toFixed(2)] }), " has been sent to your Wero phone:"] }), o.jsx("p", { className: "text-sm font-mono font-bold text-purple-700 dark:text-purple-300 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-purple-100 dark:border-purple-900/50 inline-block mt-2 select-all", children: s })] }), g && o.jsx("div", { className: "pt-2", children: o.jsxs("a", { href: r, target: "_blank", rel: "noopener noreferrer", className: "w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-750 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all shadow-md hover:shadow-purple-500/25 flex items-center justify-center gap-1.5 group", children: [o.jsx("span", { children: "Proceed to Payment" }), o.jsx(Ht, { className: "w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })] }) }), o.jsx("p", { className: "text-[10px] text-gray-400 dark:text-gray-500 italic pt-1", children: "Please open your participating banking app to authorize the instant transfer request." })] }) : o.jsxs("div", { className: "p-5 text-center bg-purple-50/50 dark:bg-purple-950/10 border border-dashed border-purple-200 dark:border-purple-900/50 rounded-2xl flex flex-col items-center gap-3", children: [o.jsx("div", { className: "p-4 bg-white rounded-2xl shadow-md border border-purple-100", children: o.jsx(nn, { className: "w-40 h-40 text-purple-900" }) }), o.jsxs("div", { children: [o.jsx("h4", { className: "text-xs font-black text-gray-800 dark:text-white uppercase tracking-wider", children: "Scan to Pay" }), o.jsxs("p", { className: "text-[10px] text-gray-500 dark:text-gray-400 mt-1", children: ["Scan this QR code with your banking app to instantly authorize a payment of ", o.jsxs("span", { className: "font-extrabold text-purple-600 dark:text-purple-400", children: [J.currencySymbol, n.toFixed(2)] }), "."] })] }), g && o.jsxs("a", { href: r, target: "_blank", rel: "noopener noreferrer", className: "w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-750 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all shadow-md hover:shadow-purple-500/25 flex items-center justify-center gap-1.5 group", children: [o.jsx("span", { children: "Proceed to Payment" }), o.jsx(Ht, { className: "w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })] })] }), p && o.jsxs("div", { className: "p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 rounded-xl text-xs flex items-start gap-2", children: [o.jsx(Me, { className: "w-4 h-4 shrink-0 mt-0.5" }), o.jsx("span", { children: p })] }), o.jsxs("div", { className: "space-y-2.5", children: [o.jsx("p", { className: "text-[9px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest text-center", children: g ? "Verification & Control" : "Testing / Sandbox Controls" }), o.jsxs("div", { className: "grid grid-cols-2 gap-2.5", children: [o.jsx("button", { onClick: () => b("succeeded"), disabled: d, className: `py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50 ${g ? "bg-purple-600 hover:bg-purple-700 text-white hover:shadow-purple-500/20" : "bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-emerald-500/20"}`, children: d ? o.jsx(Ae, { className: "w-3.5 h-3.5 animate-spin" }) : o.jsxs(o.Fragment, { children: [o.jsx(rt, { className: "w-3.5 h-3.5" }), g ? "Verify Payment" : "Simulate Success"] }) }), o.jsx("button", { onClick: () => b("failed"), disabled: d, className: "py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-rose-500/20 flex items-center justify-center gap-1.5 disabled:opacity-50", children: d ? o.jsx(Ae, { className: "w-3.5 h-3.5 animate-spin" }) : o.jsxs(o.Fragment, { children: [o.jsx(Me, { className: "w-3.5 h-3.5" }), g ? "Check Failure" : "Simulate Failure"] }) })] }), o.jsx("button", { onClick: () => b("cancelled"), disabled: d, className: "w-full py-2.5 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors disabled:opacity-50", children: "Cancel Payment Request" })] })] }) });
}
export {
  zi as Checkout
};
