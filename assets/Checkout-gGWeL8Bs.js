var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { c as bt, a2 as Tr, a3 as tr, a4 as dt, a5 as ls, R as F, a as H, r as S, b as ds, l as us, j as a, a6 as qe, f as ps, m as $, h as hs, U as fs, J as ms, Q as Pr, A as qt, a7 as xs, L as Ne, k as gs, v as ee, y as ze, E as rr, i as ys, X as wt, G as Ht } from "./index-C_bgkIEz.js";
import { r as bs, D as Ir, f as Ve, S as xt, c as ws, t as vs, n as ks, a as Ss, b as Es, d as Ns, e as js, g as Cs, h as zt, i as _s, j as As, P as Dr, k as Rs, l as Os, m as Ts, o as Ps, p as Is, q as hn, Q as fn, B as Vt, T as Ds } from "./index-sUDqHzQI.js";
import { A as Fs } from "./arrow-left-BbcxIVvv.js";
import { H as Bs } from "./hash-BPLuu6xN.js";
import { C as He } from "./circle-check-DqITQJMd.js";
import { C as We } from "./credit-card-DtApMY0C.js";
import { S as Us } from "./shopping-cart-BC2IbkJr.js";
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ls = [["circle", { cx: "8", cy: "8", r: "6", key: "3yglwk" }], ["path", { d: "M18.09 10.37A6 6 0 1 1 10.34 18", key: "t5s6rm" }], ["path", { d: "M7 6h1v4", key: "1obek4" }], ["path", { d: "m16.71 13.88.7.71-2.82 2.82", key: "1rbuyh" }]], Fr = bt("coins", Ls);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const $s = [["path", { d: "M10 18v-7", key: "wt116b" }], ["path", { d: "M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z", key: "1m329m" }], ["path", { d: "M14 18v-7", key: "vav6t3" }], ["path", { d: "M18 18v-7", key: "aexdmj" }], ["path", { d: "M3 22h18", key: "8prr45" }], ["path", { d: "M6 18v-7", key: "1ivflk" }]], gt = bt("landmark", $s);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ms = [["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }], ["path", { d: "M12 18h.01", key: "mhygvu" }]], Je = bt("smartphone", Ms);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const qs = [["path", { d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1", key: "18etb6" }], ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]], Br = bt("wallet", qs);
function mn(t2, e) {
  return function() {
    return t2.apply(e, arguments);
  };
}
const { toString: Hs } = Object.prototype, { getPrototypeOf: vt } = Object, { iterator: kt, toStringTag: xn } = Symbol, St = /* @__PURE__ */ ((t2) => (e) => {
  const r = Hs.call(e);
  return t2[r] || (t2[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), fe = (t2) => (t2 = t2.toLowerCase(), (e) => St(e) === t2), Et = (t2) => (e) => typeof e === t2, { isArray: je } = Array, Re = Et("undefined");
function Te(t2) {
  return t2 !== null && !Re(t2) && t2.constructor !== null && !Re(t2.constructor) && oe(t2.constructor.isBuffer) && t2.constructor.isBuffer(t2);
}
const gn = fe("ArrayBuffer");
function zs(t2) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t2) : e = t2 && t2.buffer && gn(t2.buffer), e;
}
const Vs = Et("string"), oe = Et("function"), yn = Et("number"), Ke = (t2) => t2 !== null && typeof t2 == "object", Ws = (t2) => t2 === true || t2 === false, ut = (t2) => {
  if (St(t2) !== "object") return false;
  const e = vt(t2);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(xn in t2) && !(kt in t2);
}, Js = (t2) => {
  if (!Ke(t2) || Te(t2)) return false;
  try {
    return Object.keys(t2).length === 0 && Object.getPrototypeOf(t2) === Object.prototype;
  } catch {
    return false;
  }
}, Ks = fe("Date"), Xs = fe("File"), Gs = (t2) => !!(t2 && typeof t2.uri < "u"), Ys = (t2) => t2 && typeof t2.getParts < "u", Qs = fe("Blob"), Zs = fe("FileList"), ea = (t2) => Ke(t2) && oe(t2.pipe);
function ta() {
  return typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof tr < "u" ? tr : {};
}
const Ur = ta(), Lr = typeof Ur.FormData < "u" ? Ur.FormData : void 0, ra = (t2) => {
  if (!t2) return false;
  if (Lr && t2 instanceof Lr) return true;
  const e = vt(t2);
  if (!e || e === Object.prototype || !oe(t2.append)) return false;
  const r = St(t2);
  return r === "formdata" || r === "object" && oe(t2.toString) && t2.toString() === "[object FormData]";
}, na = fe("URLSearchParams"), [sa, aa, oa, ia] = ["ReadableStream", "Request", "Response", "Headers"].map(fe), ca = (t2) => t2.trim ? t2.trim() : t2.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Xe(t2, e, { allOwnKeys: r = false } = {}) {
  if (t2 === null || typeof t2 > "u") return;
  let n, s;
  if (typeof t2 != "object" && (t2 = [t2]), je(t2)) for (n = 0, s = t2.length; n < s; n++) e.call(null, t2[n], n, t2);
  else {
    if (Te(t2)) return;
    const o = r ? Object.getOwnPropertyNames(t2) : Object.keys(t2), i = o.length;
    let c;
    for (n = 0; n < i; n++) c = o[n], e.call(null, t2[c], c, t2);
  }
}
function bn(t2, e) {
  if (Te(t2)) return null;
  e = e.toLowerCase();
  const r = Object.keys(t2);
  let n = r.length, s;
  for (; n-- > 0; ) if (s = r[n], e === s.toLowerCase()) return s;
  return null;
}
const Se = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : tr, wn = (t2) => !Re(t2) && t2 !== Se;
function nr(...t2) {
  const { caseless: e, skipUndefined: r } = wn(this) && this || {}, n = {}, s = (o, i) => {
    if (i === "__proto__" || i === "constructor" || i === "prototype") return;
    const c = e && typeof i == "string" && bn(n, i) || i, d = sr(n, c) ? n[c] : void 0;
    ut(d) && ut(o) ? n[c] = nr(d, o) : ut(o) ? n[c] = nr({}, o) : je(o) ? n[c] = o.slice() : (!r || !Re(o)) && (n[c] = o);
  };
  for (let o = 0, i = t2.length; o < i; o++) {
    const c = t2[o];
    if (!c || Te(c) || (Xe(c, s), typeof c != "object" || je(c))) continue;
    const d = Object.getOwnPropertySymbols(c);
    for (let u = 0; u < d.length; u++) {
      const p = d[u];
      wa.call(c, p) && s(c[p], p);
    }
  }
  return n;
}
const la = (t2, e, r, { allOwnKeys: n } = {}) => (Xe(e, (s, o) => {
  r && oe(s) ? Object.defineProperty(t2, o, { __proto__: null, value: mn(s, r), writable: true, enumerable: true, configurable: true }) : Object.defineProperty(t2, o, { __proto__: null, value: s, writable: true, enumerable: true, configurable: true });
}, { allOwnKeys: n }), t2), da = (t2) => (t2.charCodeAt(0) === 65279 && (t2 = t2.slice(1)), t2), ua = (t2, e, r, n) => {
  t2.prototype = Object.create(e.prototype, n), Object.defineProperty(t2.prototype, "constructor", { __proto__: null, value: t2, writable: true, enumerable: false, configurable: true }), Object.defineProperty(t2, "super", { __proto__: null, value: e.prototype }), r && Object.assign(t2.prototype, r);
}, pa = (t2, e, r, n) => {
  let s, o, i;
  const c = {};
  if (e = e || {}, t2 == null) return e;
  do {
    for (s = Object.getOwnPropertyNames(t2), o = s.length; o-- > 0; ) i = s[o], (!n || n(i, t2, e)) && !c[i] && (e[i] = t2[i], c[i] = true);
    t2 = r !== false && vt(t2);
  } while (t2 && (!r || r(t2, e)) && t2 !== Object.prototype);
  return e;
}, ha = (t2, e, r) => {
  t2 = String(t2), (r === void 0 || r > t2.length) && (r = t2.length), r -= e.length;
  const n = t2.indexOf(e, r);
  return n !== -1 && n === r;
}, fa = (t2) => {
  if (!t2) return null;
  if (je(t2)) return t2;
  let e = t2.length;
  if (!yn(e)) return null;
  const r = new Array(e);
  for (; e-- > 0; ) r[e] = t2[e];
  return r;
}, ma = /* @__PURE__ */ ((t2) => (e) => t2 && e instanceof t2)(typeof Uint8Array < "u" && vt(Uint8Array)), xa = (t2, e) => {
  const n = (t2 && t2[kt]).call(t2);
  let s;
  for (; (s = n.next()) && !s.done; ) {
    const o = s.value;
    e.call(t2, o[0], o[1]);
  }
}, ga = (t2, e) => {
  let r;
  const n = [];
  for (; (r = t2.exec(e)) !== null; ) n.push(r);
  return n;
}, ya = fe("HTMLFormElement"), ba = (t2) => t2.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(r, n, s) {
  return n.toUpperCase() + s;
}), sr = (({ hasOwnProperty: t2 }) => (e, r) => t2.call(e, r))(Object.prototype), { propertyIsEnumerable: wa } = Object.prototype, va = fe("RegExp"), vn = (t2, e) => {
  const r = Object.getOwnPropertyDescriptors(t2), n = {};
  Xe(r, (s, o) => {
    let i;
    (i = e(s, o, t2)) !== false && (n[o] = i || s);
  }), Object.defineProperties(t2, n);
}, ka = (t2) => {
  vn(t2, (e, r) => {
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
}, Sa = (t2, e) => {
  const r = {}, n = (s) => {
    s.forEach((o) => {
      r[o] = true;
    });
  };
  return je(t2) ? n(t2) : n(String(t2).split(e)), r;
}, Ea = () => {
}, Na = (t2, e) => t2 != null && Number.isFinite(t2 = +t2) ? t2 : e;
function ja(t2) {
  return !!(t2 && oe(t2.append) && t2[xn] === "FormData" && t2[kt]);
}
const Ca = (t2) => {
  const e = /* @__PURE__ */ new WeakSet(), r = (n) => {
    if (Ke(n)) {
      if (e.has(n)) return;
      if (Te(n)) return n;
      if (!("toJSON" in n)) {
        e.add(n);
        const s = je(n) ? [] : {};
        return Xe(n, (o, i) => {
          const c = r(o);
          !Re(c) && (s[i] = c);
        }), e.delete(n), s;
      }
    }
    return n;
  };
  return r(t2);
}, _a = fe("AsyncFunction"), Aa = (t2) => t2 && (Ke(t2) || oe(t2)) && oe(t2.then) && oe(t2.catch), kn = ((t2, e) => t2 ? setImmediate : e ? ((r, n) => (Se.addEventListener("message", ({ source: s, data: o }) => {
  s === Se && o === r && n.length && n.shift()();
}, false), (s) => {
  n.push(s), Se.postMessage(r, "*");
}))(`axios@${Math.random()}`, []) : (r) => setTimeout(r))(typeof setImmediate == "function", oe(Se.postMessage)), Ra = typeof queueMicrotask < "u" ? queueMicrotask.bind(Se) : typeof Tr < "u" && Tr.nextTick || kn, Oa = (t2) => t2 != null && oe(t2[kt]), l = { isArray: je, isArrayBuffer: gn, isBuffer: Te, isFormData: ra, isArrayBufferView: zs, isString: Vs, isNumber: yn, isBoolean: Ws, isObject: Ke, isPlainObject: ut, isEmptyObject: Js, isReadableStream: sa, isRequest: aa, isResponse: oa, isHeaders: ia, isUndefined: Re, isDate: Ks, isFile: Xs, isReactNativeBlob: Gs, isReactNative: Ys, isBlob: Qs, isRegExp: va, isFunction: oe, isStream: ea, isURLSearchParams: na, isTypedArray: ma, isFileList: Zs, forEach: Xe, merge: nr, extend: la, trim: ca, stripBOM: da, inherits: ua, toFlatObject: pa, kindOf: St, kindOfTest: fe, endsWith: ha, toArray: fa, forEachEntry: xa, matchAll: ga, isHTMLForm: ya, hasOwnProperty: sr, hasOwnProp: sr, reduceDescriptors: vn, freezeMethods: ka, toObjectSet: Sa, toCamelCase: ba, noop: Ea, toFiniteNumber: Na, findKey: bn, global: Se, isContextDefined: wn, isSpecCompliantForm: ja, toJSONObject: Ca, isAsyncFn: _a, isThenable: Aa, setImmediate: kn, asap: Ra, isIterable: Oa }, Ta = l.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]), Pa = (t2) => {
  const e = {};
  let r, n, s;
  return t2 && t2.split(`
`).forEach(function(i) {
    s = i.indexOf(":"), r = i.substring(0, s).trim().toLowerCase(), n = i.substring(s + 1).trim(), !(!r || e[r] && Ta[r]) && (r === "set-cookie" ? e[r] ? e[r].push(n) : e[r] = [n] : e[r] = e[r] ? e[r] + ", " + n : n);
  }), e;
};
function Ia(t2) {
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
const Da = new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+", "g"), Fa = new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+", "g");
function dr(t2, e) {
  return l.isArray(t2) ? t2.map((r) => dr(r, e)) : Ia(String(t2).replace(e, ""));
}
const Ba = (t2) => dr(t2, Da), Ua = (t2) => dr(t2, Fa);
function Sn(t2) {
  const e = /* @__PURE__ */ Object.create(null);
  return l.forEach(t2.toJSON(), (r, n) => {
    e[n] = Ua(r);
  }), e;
}
const $r = Symbol("internals");
function Le(t2) {
  return t2 && String(t2).trim().toLowerCase();
}
function pt(t2) {
  return t2 === false || t2 == null ? t2 : l.isArray(t2) ? t2.map(pt) : Ba(String(t2));
}
function La(t2) {
  const e = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(t2); ) e[n[1]] = n[2];
  return e;
}
const $a = (t2) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t2.trim());
function Wt(t2, e, r, n, s) {
  if (l.isFunction(n)) return n.call(this, e, r);
  if (s && (e = r), !!l.isString(e)) {
    if (l.isString(n)) return e.indexOf(n) !== -1;
    if (l.isRegExp(n)) return n.test(e);
  }
}
function Ma(t2) {
  return t2.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, r, n) => r.toUpperCase() + n);
}
function qa(t2, e) {
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
      const p = Le(d);
      if (!p) return;
      const m = l.findKey(s, p);
      (!m || s[m] === void 0 || u === true || u === void 0 && s[m] !== false) && (s[m || d] = pt(c));
    }
    const i = (c, d) => l.forEach(c, (u, p) => o(u, p, d));
    if (l.isPlainObject(e) || e instanceof this.constructor) i(e, r);
    else if (l.isString(e) && (e = e.trim()) && !$a(e)) i(Pa(e), r);
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
    if (e = Le(e), e) {
      const n = l.findKey(this, e);
      if (n) {
        const s = this[n];
        if (!r) return s;
        if (r === true) return La(s);
        if (l.isFunction(r)) return r.call(this, s, n);
        if (l.isRegExp(r)) return r.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, r) {
    if (e = Le(e), e) {
      const n = l.findKey(this, e);
      return !!(n && this[n] !== void 0 && (!r || Wt(this, this[n], n, r)));
    }
    return false;
  }
  delete(e, r) {
    const n = this;
    let s = false;
    function o(i) {
      if (i = Le(i), i) {
        const c = l.findKey(n, i);
        c && (!r || Wt(n, n[c], c, r)) && (delete n[c], s = true);
      }
    }
    return l.isArray(e) ? e.forEach(o) : o(e), s;
  }
  clear(e) {
    const r = Object.keys(this);
    let n = r.length, s = false;
    for (; n--; ) {
      const o = r[n];
      (!e || Wt(this, this[o], o, e, true)) && (delete this[o], s = true);
    }
    return s;
  }
  normalize(e) {
    const r = this, n = {};
    return l.forEach(this, (s, o) => {
      const i = l.findKey(n, o);
      if (i) {
        r[i] = pt(s), delete r[o];
        return;
      }
      const c = e ? Ma(o) : String(o).trim();
      c !== o && delete r[o], r[c] = pt(s), n[c] = true;
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
    const n = (this[$r] = this[$r] = { accessors: {} }).accessors, s = this.prototype;
    function o(i) {
      const c = Le(i);
      n[c] || (qa(s, i), n[c] = true);
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
const Ha = "[REDACTED ****]";
function za(t2) {
  if (l.hasOwnProp(t2, "toJSON")) return true;
  let e = Object.getPrototypeOf(t2);
  for (; e && e !== Object.prototype; ) {
    if (l.hasOwnProp(e, "toJSON")) return true;
    e = Object.getPrototypeOf(e);
  }
  return false;
}
function Va(t2, e) {
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
      if (!l.isPlainObject(o) && za(o)) return n.pop(), o;
      i = /* @__PURE__ */ Object.create(null);
      for (const [c, d] of Object.entries(o)) {
        const u = r.has(c.toLowerCase()) ? Ha : s(d);
        l.isUndefined(u) || (i[c] = u);
      }
    }
    return n.pop(), i;
  };
  return s(t2);
}
let v = class En extends Error {
  static from(e, r, n, s, o, i) {
    const c = new En(e.message, r || e.code, n, s, o);
    return c.cause = e, c.name = e.name, e.status != null && c.status == null && (c.status = e.status), i && Object.assign(c, i), c;
  }
  constructor(e, r, n, s, o) {
    super(e), Object.defineProperty(this, "message", { __proto__: null, value: e, enumerable: true, writable: true, configurable: true }), this.name = "AxiosError", this.isAxiosError = true, r && (this.code = r), n && (this.config = n), s && (this.request = s), o && (this.response = o, this.status = o.status);
  }
  toJSON() {
    const e = this.config, r = e && l.hasOwnProp(e, "redact") ? e.redact : void 0, n = l.isArray(r) && r.length > 0 ? Va(e, r) : l.toJSONObject(e);
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
const Wa = null;
function ar(t2) {
  return l.isPlainObject(t2) || l.isArray(t2);
}
function Nn(t2) {
  return l.endsWith(t2, "[]") ? t2.slice(0, -2) : t2;
}
function Jt(t2, e, r) {
  return t2 ? t2.concat(e).map(function(s, o) {
    return s = Nn(s), !r && o ? "[" + s + "]" : s;
  }).join(r ? "." : "") : e;
}
function Ja(t2) {
  return l.isArray(t2) && !t2.some(ar);
}
const Ka = l.toFlatObject(l, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function Nt(t2, e, r) {
  if (!l.isObject(t2)) throw new TypeError("target must be an object");
  e = e || new FormData(), r = l.toFlatObject(r, { metaTokens: true, dots: false, indexes: false }, false, function(h, b) {
    return !l.isUndefined(b[h]);
  });
  const n = r.metaTokens, s = r.visitor || m, o = r.dots, i = r.indexes, c = r.Blob || typeof Blob < "u" && Blob, d = r.maxDepth === void 0 ? 100 : r.maxDepth, u = c && l.isSpecCompliantForm(e);
  if (!l.isFunction(s)) throw new TypeError("visitor must be a function");
  function p(g) {
    if (g === null) return "";
    if (l.isDate(g)) return g.toISOString();
    if (l.isBoolean(g)) return g.toString();
    if (!u && l.isBlob(g)) throw new v("Blob is not supported. Use a Buffer instead.");
    return l.isArrayBuffer(g) || l.isTypedArray(g) ? u && typeof Blob == "function" ? new Blob([g]) : dt.from(g) : g;
  }
  function m(g, h, b) {
    let C = g;
    if (l.isReactNative(e) && l.isReactNativeBlob(g)) return e.append(Jt(b, h, o), p(g)), false;
    if (g && !b && typeof g == "object") {
      if (l.endsWith(h, "{}")) h = n ? h : h.slice(0, -2), g = JSON.stringify(g);
      else if (l.isArray(g) && Ja(g) || (l.isFileList(g) || l.endsWith(h, "[]")) && (C = l.toArray(g))) return h = Nn(h), C.forEach(function(N, O) {
        !(l.isUndefined(N) || N === null) && e.append(i === true ? Jt([h], O, o) : i === null ? h : h + "[]", p(N));
      }), false;
    }
    return ar(g) ? true : (e.append(Jt(b, h, o), p(g)), false);
  }
  const x = [], y = Object.assign(Ka, { defaultVisitor: m, convertValue: p, isVisitable: ar });
  function k(g, h, b = 0) {
    if (!l.isUndefined(g)) {
      if (b > d) throw new v("Object is too deeply nested (" + b + " levels). Max depth: " + d, v.ERR_FORM_DATA_DEPTH_EXCEEDED);
      if (x.indexOf(g) !== -1) throw new Error("Circular reference detected in " + h.join("."));
      x.push(g), l.forEach(g, function(_, N) {
        (!(l.isUndefined(_) || _ === null) && s.call(e, _, l.isString(N) ? N.trim() : N, h, y)) === true && k(_, h ? h.concat(N) : [N], b + 1);
      }), x.pop();
    }
  }
  if (!l.isObject(t2)) throw new TypeError("data must be an object");
  return k(t2), e;
}
function Mr(t2) {
  const e = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+" };
  return encodeURIComponent(t2).replace(/[!'()~]|%20/g, function(n) {
    return e[n];
  });
}
function ur(t2, e) {
  this._pairs = [], t2 && Nt(t2, this, e);
}
const jn = ur.prototype;
jn.append = function(e, r) {
  this._pairs.push([e, r]);
};
jn.toString = function(e) {
  const r = e ? function(n) {
    return e.call(this, n, Mr);
  } : Mr;
  return this._pairs.map(function(s) {
    return r(s[0]) + "=" + r(s[1]);
  }, "").join("&");
};
function Xa(t2) {
  return encodeURIComponent(t2).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function Cn(t2, e, r) {
  if (!e) return t2;
  const n = r && r.encode || Xa, s = l.isFunction(r) ? { serialize: r } : r, o = s && s.serialize;
  let i;
  if (o ? i = o(e, s) : i = l.isURLSearchParams(e) ? e.toString() : new ur(e, s).toString(n), i) {
    const c = t2.indexOf("#");
    c !== -1 && (t2 = t2.slice(0, c)), t2 += (t2.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return t2;
}
class qr {
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
const pr = { silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false, legacyInterceptorReqResOrdering: true, advertiseZstdAcceptEncoding: false }, Ga = typeof URLSearchParams < "u" ? URLSearchParams : ur, Ya = typeof FormData < "u" ? FormData : null, Qa = typeof Blob < "u" ? Blob : null, Za = { isBrowser: true, classes: { URLSearchParams: Ga, FormData: Ya, Blob: Qa }, protocols: ["http", "https", "file", "blob", "url", "data"] }, hr = typeof window < "u" && typeof document < "u", or = typeof navigator == "object" && navigator || void 0, eo = hr && (!or || ["ReactNative", "NativeScript", "NS"].indexOf(or.product) < 0), to = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function", ro = hr && window.location.href || "http://localhost", no = Object.freeze(Object.defineProperty({ __proto__: null, hasBrowserEnv: hr, hasStandardBrowserEnv: eo, hasStandardBrowserWebWorkerEnv: to, navigator: or, origin: ro }, Symbol.toStringTag, { value: "Module" })), K = { ...no, ...Za };
function so(t2, e) {
  return Nt(t2, new K.classes.URLSearchParams(), { visitor: function(r, n, s, o) {
    return K.isNode && l.isBuffer(r) ? (this.append(n, r.toString("base64")), false) : o.defaultVisitor.apply(this, arguments);
  }, ...e });
}
function ao(t2) {
  return l.matchAll(/\w+|\[(\w*)]/g, t2).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function oo(t2) {
  const e = {}, r = Object.keys(t2);
  let n;
  const s = r.length;
  let o;
  for (n = 0; n < s; n++) o = r[n], e[o] = t2[o];
  return e;
}
function _n(t2) {
  function e(r, n, s, o) {
    let i = r[o++];
    if (i === "__proto__") return true;
    const c = Number.isFinite(+i), d = o >= r.length;
    return i = !i && l.isArray(s) ? s.length : i, d ? (l.hasOwnProp(s, i) ? s[i] = l.isArray(s[i]) ? s[i].concat(n) : [s[i], n] : s[i] = n, !c) : ((!l.hasOwnProp(s, i) || !l.isObject(s[i])) && (s[i] = []), e(r, n, s[i], o) && l.isArray(s[i]) && (s[i] = oo(s[i])), !c);
  }
  if (l.isFormData(t2) && l.isFunction(t2.entries)) {
    const r = {};
    return l.forEachEntry(t2, (n, s) => {
      e(ao(n), s, r, 0);
    }), r;
  }
  return null;
}
const Ae = (t2, e) => t2 != null && l.hasOwnProp(t2, e) ? t2[e] : void 0;
function io(t2, e, r) {
  if (l.isString(t2)) try {
    return (e || JSON.parse)(t2), l.trim(t2);
  } catch (n) {
    if (n.name !== "SyntaxError") throw n;
  }
  return (r || JSON.stringify)(t2);
}
const Ge = { transitional: pr, adapter: ["xhr", "http", "fetch"], transformRequest: [function(e, r) {
  const n = r.getContentType() || "", s = n.indexOf("application/json") > -1, o = l.isObject(e);
  if (o && l.isHTMLForm(e) && (e = new FormData(e)), l.isFormData(e)) return s ? JSON.stringify(_n(e)) : e;
  if (l.isArrayBuffer(e) || l.isBuffer(e) || l.isStream(e) || l.isFile(e) || l.isBlob(e) || l.isReadableStream(e)) return e;
  if (l.isArrayBufferView(e)) return e.buffer;
  if (l.isURLSearchParams(e)) return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", false), e.toString();
  let c;
  if (o) {
    const d = Ae(this, "formSerializer");
    if (n.indexOf("application/x-www-form-urlencoded") > -1) return so(e, d).toString();
    if ((c = l.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
      const u = Ae(this, "env"), p = u && u.FormData;
      return Nt(c ? { "files[]": e } : e, p && new p(), d);
    }
  }
  return o || s ? (r.setContentType("application/json", false), io(e)) : e;
}], transformResponse: [function(e) {
  const r = Ae(this, "transitional") || Ge.transitional, n = r && r.forcedJSONParsing, s = Ae(this, "responseType"), o = s === "json";
  if (l.isResponse(e) || l.isReadableStream(e)) return e;
  if (e && l.isString(e) && (n && !s || o)) {
    const c = !(r && r.silentJSONParsing) && o;
    try {
      return JSON.parse(e, Ae(this, "parseReviver"));
    } catch (d) {
      if (c) throw d.name === "SyntaxError" ? v.from(d, v.ERR_BAD_RESPONSE, this, null, Ae(this, "response")) : d;
    }
  }
  return e;
}], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, maxBodyLength: -1, env: { FormData: K.classes.FormData, Blob: K.classes.Blob }, validateStatus: function(e) {
  return e >= 200 && e < 300;
}, headers: { common: { Accept: "application/json, text/plain, */*", "Content-Type": void 0 } } };
l.forEach(["delete", "get", "head", "post", "put", "patch", "query"], (t2) => {
  Ge.headers[t2] = {};
});
function Kt(t2, e) {
  const r = this || Ge, n = e || r, s = re.from(n.headers);
  let o = n.data;
  return l.forEach(t2, function(c) {
    o = c.call(r, o, s.normalize(), e ? e.status : void 0);
  }), s.normalize(), o;
}
function An(t2) {
  return !!(t2 && t2.__CANCEL__);
}
let Ye = class extends v {
  constructor(e, r, n) {
    super(e ?? "canceled", v.ERR_CANCELED, r, n), this.name = "CanceledError", this.__CANCEL__ = true;
  }
};
function Rn(t2, e, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? t2(r) : e(new v("Request failed with status code " + r.status, r.status >= 400 && r.status < 500 ? v.ERR_BAD_REQUEST : v.ERR_BAD_RESPONSE, r.config, r.request, r));
}
function co(t2) {
  const e = /^([-+\w]{1,25}):(?:\/\/)?/.exec(t2);
  return e && e[1] || "";
}
function lo(t2, e) {
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
function uo(t2, e) {
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
const yt = (t2, e, r = 3) => {
  let n = 0;
  const s = lo(50, 250);
  return uo((o) => {
    if (!o || typeof o.loaded != "number") return;
    const i = o.loaded, c = o.lengthComputable ? o.total : void 0, d = c != null ? Math.min(i, c) : i, u = Math.max(0, d - n), p = s(u);
    n = Math.max(n, d);
    const m = { loaded: d, total: c, progress: c ? d / c : void 0, bytes: u, rate: p || void 0, estimated: p && c ? (c - d) / p : void 0, event: o, lengthComputable: c != null, [e ? "download" : "upload"]: true };
    t2(m);
  }, r);
}, Hr = (t2, e) => {
  const r = t2 != null;
  return [(n) => e[0]({ lengthComputable: r, total: t2, loaded: n }), e[1]];
}, zr = (t2) => (...e) => l.asap(() => t2(...e)), po = K.hasStandardBrowserEnv ? /* @__PURE__ */ ((t2, e) => (r) => (r = new URL(r, K.origin), t2.protocol === r.protocol && t2.host === r.host && (e || t2.port === r.port)))(new URL(K.origin), K.navigator && /(msie|trident)/i.test(K.navigator.userAgent)) : () => true, ho = K.hasStandardBrowserEnv ? { write(t2, e, r, n, s, o, i) {
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
function fo(t2) {
  return typeof t2 != "string" ? false : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t2);
}
function mo(t2, e) {
  return e ? t2.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : t2;
}
function On(t2, e, r) {
  let n = !fo(e);
  return t2 && (n || r === false) ? mo(t2, e) : e;
}
const Vr = (t2) => t2 instanceof re ? { ...t2 } : t2;
function Ce(t2, e) {
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
  const d = { url: o, method: o, data: o, baseURL: i, transformRequest: i, transformResponse: i, paramsSerializer: i, timeout: i, timeoutMessage: i, withCredentials: i, withXSRFToken: i, adapter: i, responseType: i, xsrfCookieName: i, xsrfHeaderName: i, onUploadProgress: i, onDownloadProgress: i, decompress: i, maxContentLength: i, maxBodyLength: i, beforeRedirect: i, transport: i, httpAgent: i, httpsAgent: i, cancelToken: i, socketPath: i, allowedSocketPaths: i, responseEncoding: i, validateStatus: c, headers: (u, p, m) => s(Vr(u), Vr(p), m, true) };
  return l.forEach(Object.keys({ ...t2, ...e }), function(p) {
    if (p === "__proto__" || p === "constructor" || p === "prototype") return;
    const m = l.hasOwnProp(d, p) ? d[p] : s, x = l.hasOwnProp(t2, p) ? t2[p] : void 0, y = l.hasOwnProp(e, p) ? e[p] : void 0, k = m(x, y, p);
    l.isUndefined(k) && m !== c || (r[p] = k);
  }), r;
}
const xo = ["content-type", "content-length"];
function go(t2, e, r) {
  if (r !== "content-only") {
    t2.set(e);
    return;
  }
  Object.entries(e).forEach(([n, s]) => {
    xo.includes(n.toLowerCase()) && t2.set(n, s);
  });
}
const yo = (t2) => encodeURIComponent(t2).replace(/%([0-9A-F]{2})/gi, (e, r) => String.fromCharCode(parseInt(r, 16)));
function Tn(t2) {
  const e = Ce({}, t2), r = (x) => l.hasOwnProp(e, x) ? e[x] : void 0, n = r("data");
  let s = r("withXSRFToken");
  const o = r("xsrfHeaderName"), i = r("xsrfCookieName");
  let c = r("headers");
  const d = r("auth"), u = r("baseURL"), p = r("allowAbsoluteUrls"), m = r("url");
  if (e.headers = c = re.from(c), e.url = Cn(On(u, m, p), r("params"), r("paramsSerializer")), d && c.set("Authorization", "Basic " + btoa((d.username || "") + ":" + (d.password ? yo(d.password) : ""))), l.isFormData(n) && (K.hasStandardBrowserEnv || K.hasStandardBrowserWebWorkerEnv || l.isReactNative(n) ? c.setContentType(void 0) : l.isFunction(n.getHeaders) && go(c, n.getHeaders(), r("formDataHeaderPolicy"))), K.hasStandardBrowserEnv && (l.isFunction(s) && (s = s(e)), s === true || s == null && po(e.url))) {
    const y = o && i && ho.read(i);
    y && c.set(o, y);
  }
  return e;
}
const bo = typeof XMLHttpRequest < "u", wo = bo && function(t2) {
  return new Promise(function(r, n) {
    const s = Tn(t2);
    let o = s.data;
    const i = re.from(s.headers).normalize();
    let { responseType: c, onUploadProgress: d, onDownloadProgress: u } = s, p, m, x, y, k;
    function g() {
      y && y(), k && k(), s.cancelToken && s.cancelToken.unsubscribe(p), s.signal && s.signal.removeEventListener("abort", p);
    }
    let h = new XMLHttpRequest();
    h.open(s.method.toUpperCase(), s.url, true), h.timeout = s.timeout;
    function b() {
      if (!h) return;
      const _ = re.from("getAllResponseHeaders" in h && h.getAllResponseHeaders()), O = { data: !c || c === "text" || c === "json" ? h.responseText : h.response, status: h.status, statusText: h.statusText, headers: _, config: t2, request: h };
      Rn(function(le) {
        r(le), g();
      }, function(le) {
        n(le), g();
      }, O), h = null;
    }
    "onloadend" in h ? h.onloadend = b : h.onreadystatechange = function() {
      !h || h.readyState !== 4 || h.status === 0 && !(h.responseURL && h.responseURL.startsWith("file:")) || setTimeout(b);
    }, h.onabort = function() {
      h && (n(new v("Request aborted", v.ECONNABORTED, t2, h)), g(), h = null);
    }, h.onerror = function(N) {
      const O = N && N.message ? N.message : "Network Error", D = new v(O, v.ERR_NETWORK, t2, h);
      D.event = N || null, n(D), g(), h = null;
    }, h.ontimeout = function() {
      let N = s.timeout ? "timeout of " + s.timeout + "ms exceeded" : "timeout exceeded";
      const O = s.transitional || pr;
      s.timeoutErrorMessage && (N = s.timeoutErrorMessage), n(new v(N, O.clarifyTimeoutError ? v.ETIMEDOUT : v.ECONNABORTED, t2, h)), g(), h = null;
    }, o === void 0 && i.setContentType(null), "setRequestHeader" in h && l.forEach(Sn(i), function(N, O) {
      h.setRequestHeader(O, N);
    }), l.isUndefined(s.withCredentials) || (h.withCredentials = !!s.withCredentials), c && c !== "json" && (h.responseType = s.responseType), u && ([x, k] = yt(u, true), h.addEventListener("progress", x)), d && h.upload && ([m, y] = yt(d), h.upload.addEventListener("progress", m), h.upload.addEventListener("loadend", y)), (s.cancelToken || s.signal) && (p = (_) => {
      h && (n(!_ || _.type ? new Ye(null, t2, h) : _), h.abort(), g(), h = null);
    }, s.cancelToken && s.cancelToken.subscribe(p), s.signal && (s.signal.aborted ? p() : s.signal.addEventListener("abort", p)));
    const C = co(s.url);
    if (C && !K.protocols.includes(C)) {
      n(new v("Unsupported protocol " + C + ":", v.ERR_BAD_REQUEST, t2));
      return;
    }
    h.send(o || null);
  });
}, vo = (t2, e) => {
  if (t2 = t2 ? t2.filter(Boolean) : [], !e && !t2.length) return;
  const r = new AbortController();
  let n = false;
  const s = function(d) {
    if (!n) {
      n = true, i();
      const u = d instanceof Error ? d : this.reason;
      r.abort(u instanceof v ? u : new Ye(u instanceof Error ? u.message : u));
    }
  };
  let o = e && setTimeout(() => {
    o = null, s(new v(`timeout of ${e}ms exceeded`, v.ETIMEDOUT));
  }, e);
  const i = () => {
    t2 && (o && clearTimeout(o), o = null, t2.forEach((d) => {
      d.unsubscribe ? d.unsubscribe(s) : d.removeEventListener("abort", s);
    }), t2 = null);
  };
  t2.forEach((d) => d.addEventListener("abort", s));
  const { signal: c } = r;
  return c.unsubscribe = () => l.asap(i), c;
}, ko = function* (t2, e) {
  let r = t2.byteLength;
  if (r < e) {
    yield t2;
    return;
  }
  let n = 0, s;
  for (; n < r; ) s = n + e, yield t2.slice(n, s), n = s;
}, So = async function* (t2, e) {
  for await (const r of Eo(t2)) yield* ko(r, e);
}, Eo = async function* (t2) {
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
}, Wr = (t2, e, r, n) => {
  const s = So(t2, e);
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
function No(t2) {
  if (!t2 || typeof t2 != "string" || !t2.startsWith("data:")) return 0;
  const e = t2.indexOf(",");
  if (e < 0) return 0;
  const r = t2.slice(5, e), n = t2.slice(e + 1);
  if (/;base64/i.test(r)) {
    let i = n.length;
    const c = n.length;
    for (let y = 0; y < c; y++) if (n.charCodeAt(y) === 37 && y + 2 < c) {
      const k = n.charCodeAt(y + 1), g = n.charCodeAt(y + 2);
      (k >= 48 && k <= 57 || k >= 65 && k <= 70 || k >= 97 && k <= 102) && (g >= 48 && g <= 57 || g >= 65 && g <= 70 || g >= 97 && g <= 102) && (i -= 2, y += 2);
    }
    let d = 0, u = c - 1;
    const p = (y) => y >= 2 && n.charCodeAt(y - 2) === 37 && n.charCodeAt(y - 1) === 51 && (n.charCodeAt(y) === 68 || n.charCodeAt(y) === 100);
    u >= 0 && (n.charCodeAt(u) === 61 ? (d++, u--) : p(u) && (d++, u -= 3)), d === 1 && u >= 0 && (n.charCodeAt(u) === 61 || p(u)) && d++;
    const x = Math.floor(i / 4) * 3 - (d || 0);
    return x > 0 ? x : 0;
  }
  if (typeof dt < "u" && typeof dt.byteLength == "function") return dt.byteLength(n, "utf8");
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
const fr = "1.17.0", Jr = 64 * 1024, { isFunction: ot } = l, jo = (t2) => encodeURIComponent(t2).replace(/%([0-9A-F]{2})/gi, (e, r) => String.fromCharCode(parseInt(r, 16))), Kr = (t2) => {
  if (!l.isString(t2)) return t2;
  try {
    return decodeURIComponent(t2);
  } catch {
    return t2;
  }
}, Xr = (t2, ...e) => {
  try {
    return !!t2(...e);
  } catch {
    return false;
  }
}, Co = (t2) => {
  const e = t2.indexOf("://");
  let r = t2;
  return e !== -1 && (r = r.slice(e + 3)), r.includes("@") || r.includes(":");
}, _o = (t2) => {
  const e = l.global !== void 0 && l.global !== null ? l.global : globalThis, { ReadableStream: r, TextEncoder: n } = e;
  t2 = l.merge.call({ skipUndefined: true }, { Request: e.Request, Response: e.Response }, t2);
  const { fetch: s, Request: o, Response: i } = t2, c = s ? ot(s) : typeof fetch == "function", d = ot(o), u = ot(i);
  if (!c) return false;
  const p = c && ot(r), m = c && (typeof n == "function" ? /* @__PURE__ */ ((b) => (C) => b.encode(C))(new n()) : async (b) => new Uint8Array(await new o(b).arrayBuffer())), x = d && p && Xr(() => {
    let b = false;
    const C = new o(K.origin, { body: new r(), method: "POST", get duplex() {
      return b = true, "half";
    } }), _ = C.headers.has("Content-Type");
    return C.body != null && C.body.cancel(), b && !_;
  }), y = u && p && Xr(() => l.isReadableStream(new i("").body)), k = { stream: y && ((b) => b.body) };
  c && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((b) => {
    !k[b] && (k[b] = (C, _) => {
      let N = C && C[b];
      if (N) return N.call(C);
      throw new v(`Response type '${b}' is not supported`, v.ERR_NOT_SUPPORT, _);
    });
  });
  const g = async (b) => {
    if (b == null) return 0;
    if (l.isBlob(b)) return b.size;
    if (l.isSpecCompliantForm(b)) return (await new o(K.origin, { method: "POST", body: b }).arrayBuffer()).byteLength;
    if (l.isArrayBufferView(b) || l.isArrayBuffer(b)) return b.byteLength;
    if (l.isURLSearchParams(b) && (b = b + ""), l.isString(b)) return (await m(b)).byteLength;
  }, h = async (b, C) => {
    const _ = l.toFiniteNumber(b.getContentLength());
    return _ ?? g(C);
  };
  return async (b) => {
    let { url: C, method: _, data: N, signal: O, cancelToken: D, timeout: le, onDownloadProgress: xe, onUploadProgress: Pe, responseType: de, headers: ce, withCredentials: be = "same-origin", fetchOptions: Ie, maxContentLength: E, maxBodyLength: W } = Tn(b);
    const X = l.isNumber(E) && E > -1, ue = l.isNumber(W) && W > -1, G = (T) => l.hasOwnProp(b, T) ? b[T] : void 0;
    let ge = s || fetch;
    de = de ? (de + "").toLowerCase() : "text";
    let P = vo([O, D && D.toAbortSignal()], le), J = null;
    const M = P && P.unsubscribe && (() => {
      P.unsubscribe();
    });
    let pe;
    try {
      let T;
      const te = G("auth");
      if (te) {
        const A = te.username || "", se = te.password || "";
        T = { username: A, password: se };
      }
      if (Co(C)) {
        const A = new URL(C, K.origin);
        if (!T && (A.username || A.password)) {
          const se = Kr(A.username), he = Kr(A.password);
          T = { username: se, password: he };
        }
        (A.username || A.password) && (A.username = "", A.password = "", C = A.href);
      }
      if (T && (ce.delete("authorization"), ce.set("Authorization", "Basic " + btoa(jo((T.username || "") + ":" + (T.password || ""))))), X && typeof C == "string" && C.startsWith("data:") && No(C) > E) throw new v("maxContentLength size of " + E + " exceeded", v.ERR_BAD_RESPONSE, b, J);
      if (ue && _ !== "get" && _ !== "head") {
        const A = await h(ce, N);
        if (typeof A == "number" && isFinite(A) && A > W) throw new v("Request body larger than maxBodyLength limit", v.ERR_BAD_REQUEST, b, J);
      }
      if (Pe && x && _ !== "get" && _ !== "head" && (pe = await h(ce, N)) !== 0) {
        let A = new o(C, { method: "POST", body: N, duplex: "half" }), se;
        if (l.isFormData(N) && (se = A.headers.get("content-type")) && ce.setContentType(se), A.body) {
          const [he, ye] = Hr(pe, yt(zr(Pe)));
          N = Wr(A.body, Jr, he, ye);
        }
      }
      l.isString(be) || (be = be ? "include" : "omit");
      const B = d && "credentials" in o.prototype;
      if (l.isFormData(N)) {
        const A = ce.getContentType();
        A && /^multipart\/form-data/i.test(A) && !/boundary=/i.test(A) && ce.delete("content-type");
      }
      ce.set("User-Agent", "axios/" + fr, false);
      const ie = { ...Ie, signal: P, method: _.toUpperCase(), headers: Sn(ce.normalize()), body: N, duplex: "half", credentials: B ? be : void 0 };
      J = d && new o(C, ie);
      let ne = await (d ? ge(J, Ie) : ge(C, ie));
      if (X) {
        const A = l.toFiniteNumber(ne.headers.get("content-length"));
        if (A != null && A > E) throw new v("maxContentLength size of " + E + " exceeded", v.ERR_BAD_RESPONSE, b, J);
      }
      const me = y && (de === "stream" || de === "response");
      if (y && ne.body && (xe || X || me && M)) {
        const A = {};
        ["status", "statusText", "headers"].forEach((ve) => {
          A[ve] = ne[ve];
        });
        const se = l.toFiniteNumber(ne.headers.get("content-length")), [he, ye] = xe && Hr(se, yt(zr(xe), true)) || [];
        let _e = 0;
        const we = (ve) => {
          if (X && (_e = ve, _e > E)) throw new v("maxContentLength size of " + E + " exceeded", v.ERR_BAD_RESPONSE, b, J);
          he && he(ve);
        };
        ne = new i(Wr(ne.body, Jr, we, () => {
          ye && ye(), M && M();
        }), A);
      }
      de = de || "text";
      let Y = await k[l.findKey(k, de) || "text"](ne, b);
      if (X && !y && !me) {
        let A;
        if (Y != null && (typeof Y.byteLength == "number" ? A = Y.byteLength : typeof Y.size == "number" ? A = Y.size : typeof Y == "string" && (A = typeof n == "function" ? new n().encode(Y).byteLength : Y.length)), typeof A == "number" && A > E) throw new v("maxContentLength size of " + E + " exceeded", v.ERR_BAD_RESPONSE, b, J);
      }
      return !me && M && M(), await new Promise((A, se) => {
        Rn(A, se, { data: Y, headers: re.from(ne.headers), status: ne.status, statusText: ne.statusText, config: b, request: J });
      });
    } catch (T) {
      if (M && M(), P && P.aborted && P.reason instanceof v) {
        const te = P.reason;
        throw te.config = b, J && (te.request = J), T !== te && (te.cause = T), te;
      }
      throw T && T.name === "TypeError" && /Load failed|fetch/i.test(T.message) ? Object.assign(new v("Network Error", v.ERR_NETWORK, b, J, T && T.response), { cause: T.cause || T }) : v.from(T, T && T.code, b, J, T && T.response);
    }
  };
}, Ao = /* @__PURE__ */ new Map(), Pn = (t2) => {
  let e = t2 && t2.env || {};
  const { fetch: r, Request: n, Response: s } = e, o = [n, s, r];
  let i = o.length, c = i, d, u, p = Ao;
  for (; c--; ) d = o[c], u = p.get(d), u === void 0 && p.set(d, u = c ? /* @__PURE__ */ new Map() : _o(e)), p = u;
  return u;
};
Pn();
const mr = { http: Wa, xhr: wo, fetch: { get: Pn } };
l.forEach(mr, (t2, e) => {
  if (t2) {
    try {
      Object.defineProperty(t2, "name", { __proto__: null, value: e });
    } catch {
    }
    Object.defineProperty(t2, "adapterName", { __proto__: null, value: e });
  }
});
const Gr = (t2) => `- ${t2}`, Ro = (t2) => l.isFunction(t2) || t2 === null || t2 === false;
function Oo(t2, e) {
  t2 = l.isArray(t2) ? t2 : [t2];
  const { length: r } = t2;
  let n, s;
  const o = {};
  for (let i = 0; i < r; i++) {
    n = t2[i];
    let c;
    if (s = n, !Ro(n) && (s = mr[(c = String(n)).toLowerCase()], s === void 0)) throw new v(`Unknown adapter '${c}'`);
    if (s && (l.isFunction(s) || (s = s.get(e)))) break;
    o[c || "#" + i] = s;
  }
  if (!s) {
    const i = Object.entries(o).map(([d, u]) => `adapter ${d} ` + (u === false ? "is not supported by the environment" : "is not available in the build"));
    let c = r ? i.length > 1 ? `since :
` + i.map(Gr).join(`
`) : " " + Gr(i[0]) : "as no adapter specified";
    throw new v("There is no suitable adapter to dispatch the request " + c, "ERR_NOT_SUPPORT");
  }
  return s;
}
const In = { getAdapter: Oo, adapters: mr };
function Xt(t2) {
  if (t2.cancelToken && t2.cancelToken.throwIfRequested(), t2.signal && t2.signal.aborted) throw new Ye(null, t2);
}
function Yr(t2) {
  return Xt(t2), t2.headers = re.from(t2.headers), t2.data = Kt.call(t2, t2.transformRequest), ["post", "put", "patch"].indexOf(t2.method) !== -1 && t2.headers.setContentType("application/x-www-form-urlencoded", false), In.getAdapter(t2.adapter || Ge.adapter, t2)(t2).then(function(n) {
    Xt(t2), t2.response = n;
    try {
      n.data = Kt.call(t2, t2.transformResponse, n);
    } finally {
      delete t2.response;
    }
    return n.headers = re.from(n.headers), n;
  }, function(n) {
    if (!An(n) && (Xt(t2), n && n.response)) {
      t2.response = n.response;
      try {
        n.response.data = Kt.call(t2, t2.transformResponse, n.response);
      } finally {
        delete t2.response;
      }
      n.response.headers = re.from(n.response.headers);
    }
    return Promise.reject(n);
  });
}
const jt = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t2, e) => {
  jt[t2] = function(n) {
    return typeof n === t2 || "a" + (e < 1 ? "n " : " ") + t2;
  };
});
const Qr = {};
jt.transitional = function(e, r, n) {
  function s(o, i) {
    return "[Axios v" + fr + "] Transitional option '" + o + "'" + i + (n ? ". " + n : "");
  }
  return (o, i, c) => {
    if (e === false) throw new v(s(i, " has been removed" + (r ? " in " + r : "")), v.ERR_DEPRECATED);
    return r && !Qr[i] && (Qr[i] = true, console.warn(s(i, " has been deprecated since v" + r + " and will be removed in the near future"))), e ? e(o, i, c) : true;
  };
};
jt.spelling = function(e) {
  return (r, n) => (console.warn(`${n} is likely a misspelling of ${e}`), true);
};
function To(t2, e, r) {
  if (typeof t2 != "object") throw new v("options must be an object", v.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(t2);
  let s = n.length;
  for (; s-- > 0; ) {
    const o = n[s], i = Object.prototype.hasOwnProperty.call(e, o) ? e[o] : void 0;
    if (i) {
      const c = t2[o], d = c === void 0 || i(c, o, t2);
      if (d !== true) throw new v("option " + o + " must be " + d, v.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== true) throw new v("Unknown option " + o, v.ERR_BAD_OPTION);
  }
}
const ht = { assertOptions: To, validators: jt }, ae = ht.validators;
let Ee = class {
  constructor(e) {
    this.defaults = e || {}, this.interceptors = { request: new qr(), response: new qr() };
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
    typeof e == "string" ? (r = r || {}, r.url = e) : r = e || {}, r = Ce(this.defaults, r);
    const { transitional: n, paramsSerializer: s, headers: o } = r;
    n !== void 0 && ht.assertOptions(n, { silentJSONParsing: ae.transitional(ae.boolean), forcedJSONParsing: ae.transitional(ae.boolean), clarifyTimeoutError: ae.transitional(ae.boolean), legacyInterceptorReqResOrdering: ae.transitional(ae.boolean), advertiseZstdAcceptEncoding: ae.transitional(ae.boolean) }, false), s != null && (l.isFunction(s) ? r.paramsSerializer = { serialize: s } : ht.assertOptions(s, { encode: ae.function, serialize: ae.function }, true)), r.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? r.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : r.allowAbsoluteUrls = true), ht.assertOptions(r, { baseUrl: ae.spelling("baseURL"), withXsrfToken: ae.spelling("withXSRFToken") }, true), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let i = o && l.merge(o.common, o[r.method]);
    o && l.forEach(["delete", "get", "head", "post", "put", "patch", "query", "common"], (k) => {
      delete o[k];
    }), r.headers = re.concat(i, o);
    const c = [];
    let d = true;
    this.interceptors.request.forEach(function(g) {
      if (typeof g.runWhen == "function" && g.runWhen(r) === false) return;
      d = d && g.synchronous;
      const h = r.transitional || pr;
      h && h.legacyInterceptorReqResOrdering ? c.unshift(g.fulfilled, g.rejected) : c.push(g.fulfilled, g.rejected);
    });
    const u = [];
    this.interceptors.response.forEach(function(g) {
      u.push(g.fulfilled, g.rejected);
    });
    let p, m = 0, x;
    if (!d) {
      const k = [Yr.bind(this), void 0];
      for (k.unshift(...c), k.push(...u), x = k.length, p = Promise.resolve(r); m < x; ) p = p.then(k[m++], k[m++]);
      return p;
    }
    x = c.length;
    let y = r;
    for (; m < x; ) {
      const k = c[m++], g = c[m++];
      try {
        y = k(y);
      } catch (h) {
        g.call(this, h);
        break;
      }
    }
    try {
      p = Yr.call(this, y);
    } catch (k) {
      return Promise.reject(k);
    }
    for (m = 0, x = u.length; m < x; ) p = p.then(u[m++], u[m++]);
    return p;
  }
  getUri(e) {
    e = Ce(this.defaults, e);
    const r = On(e.baseURL, e.url, e.allowAbsoluteUrls);
    return Cn(r, e.params, e.paramsSerializer);
  }
};
l.forEach(["delete", "get", "head", "options"], function(e) {
  Ee.prototype[e] = function(r, n) {
    return this.request(Ce(n || {}, { method: e, url: r, data: (n || {}).data }));
  };
});
l.forEach(["post", "put", "patch", "query"], function(e) {
  function r(n) {
    return function(o, i, c) {
      return this.request(Ce(c || {}, { method: e, headers: n ? { "Content-Type": "multipart/form-data" } : {}, url: o, data: i }));
    };
  }
  Ee.prototype[e] = r(), e !== "query" && (Ee.prototype[e + "Form"] = r(true));
});
let Po = class Dn {
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
      n.reason || (n.reason = new Ye(o, i, c), r(n.reason));
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
    return { token: new Dn(function(s) {
      e = s;
    }), cancel: e };
  }
};
function Io(t2) {
  return function(r) {
    return t2.apply(null, r);
  };
}
function Do(t2) {
  return l.isObject(t2) && t2.isAxiosError === true;
}
const ir = { Continue: 100, SwitchingProtocols: 101, Processing: 102, EarlyHints: 103, Ok: 200, Created: 201, Accepted: 202, NonAuthoritativeInformation: 203, NoContent: 204, ResetContent: 205, PartialContent: 206, MultiStatus: 207, AlreadyReported: 208, ImUsed: 226, MultipleChoices: 300, MovedPermanently: 301, Found: 302, SeeOther: 303, NotModified: 304, UseProxy: 305, Unused: 306, TemporaryRedirect: 307, PermanentRedirect: 308, BadRequest: 400, Unauthorized: 401, PaymentRequired: 402, Forbidden: 403, NotFound: 404, MethodNotAllowed: 405, NotAcceptable: 406, ProxyAuthenticationRequired: 407, RequestTimeout: 408, Conflict: 409, Gone: 410, LengthRequired: 411, PreconditionFailed: 412, PayloadTooLarge: 413, UriTooLong: 414, UnsupportedMediaType: 415, RangeNotSatisfiable: 416, ExpectationFailed: 417, ImATeapot: 418, MisdirectedRequest: 421, UnprocessableEntity: 422, Locked: 423, FailedDependency: 424, TooEarly: 425, UpgradeRequired: 426, PreconditionRequired: 428, TooManyRequests: 429, RequestHeaderFieldsTooLarge: 431, UnavailableForLegalReasons: 451, InternalServerError: 500, NotImplemented: 501, BadGateway: 502, ServiceUnavailable: 503, GatewayTimeout: 504, HttpVersionNotSupported: 505, VariantAlsoNegotiates: 506, InsufficientStorage: 507, LoopDetected: 508, NotExtended: 510, NetworkAuthenticationRequired: 511, WebServerIsDown: 521, ConnectionTimedOut: 522, OriginIsUnreachable: 523, TimeoutOccurred: 524, SslHandshakeFailed: 525, InvalidSslCertificate: 526 };
Object.entries(ir).forEach(([t2, e]) => {
  ir[e] = t2;
});
function Fn(t2) {
  const e = new Ee(t2), r = mn(Ee.prototype.request, e);
  return l.extend(r, Ee.prototype, e, { allOwnKeys: true }), l.extend(r, e, null, { allOwnKeys: true }), r.create = function(s) {
    return Fn(Ce(t2, s));
  }, r;
}
const U = Fn(Ge);
U.Axios = Ee;
U.CanceledError = Ye;
U.CancelToken = Po;
U.isCancel = An;
U.VERSION = fr;
U.toFormData = Nt;
U.AxiosError = v;
U.Cancel = U.CanceledError;
U.all = function(e) {
  return Promise.all(e);
};
U.spread = Io;
U.isAxiosError = Do;
U.mergeConfig = Ce;
U.AxiosHeaders = re;
U.formToJSON = (t2) => _n(l.isHTMLForm(t2) ? new FormData(t2) : t2);
U.getAdapter = In.getAdapter;
U.HttpStatusCode = ir;
U.default = U;
const { Axios: Li, AxiosError: $i, CanceledError: Mi, isCancel: qi, CancelToken: Hi, VERSION: zi, all: Vi, Cancel: Wi, isAxiosError: Ji, spread: Ki, toFormData: Xi, AxiosHeaders: Gi, HttpStatusCode: Yi, formToJSON: Qi, getAdapter: Zi, mergeConfig: ec, create: tc } = U;
var R = (t2) => U.isAxiosError(t2) ? t2.response ? JSON.stringify({ data: t2.response.data, headers: t2.response.headers, status: t2.response.status }) : t2.request && !(t2.request instanceof XMLHttpRequest) ? JSON.stringify(t2.request) : JSON.stringify({ code: t2.code, message: t2.message }) : JSON.stringify(t2), Zr = (t2) => {
  const e = t2.slice(0, Dr), r = t2.includes(".") ? Ve(t2.split(".")[1] || "") : t2.slice(Dr);
  return { policyId: e, assetName: r };
};
function Fo(t2) {
  const e = Rs(t2), r = e.body(), n = e.getId(), s = r.outputs(), o = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c) {
      const d = new Os(Ts(n), BigInt(i)), u = new Ps(d, c), p = Is(u);
      o.push(p);
    }
  }
  return o;
}
function Bo(t2, e, r) {
  const n = /* @__PURE__ */ new Set(), s = [];
  if (!e && !r) return [];
  if (e) for (const i of e) tn(i, n, s);
  if (r) for (const i of r) {
    const c = Fo(i);
    for (const d of c) tn(d, n, s);
  }
  return { blockfrost: s.map((i) => {
    const c = { txId: i.input.txHash, index: i.input.outputIndex }, d = Uo(i), u = { address: i.output.address, value: d };
    return [c, u];
  }), maestro: s.map((i) => {
    const d = As(i).output().toCbor();
    return { tx_hash: i.input.txHash, index: i.input.outputIndex, txout_cbor: d };
  }), koios: s.map((i) => ({ transaction: { id: i.input.txHash }, index: i.input.outputIndex, address: i.output.address, value: en(i) })), ogmios: s.map((i) => ({ transaction: { id: i.input.txHash }, index: i.input.outputIndex, address: i.output.address, value: en(i) })) }[t2];
}
var Uo = (t2) => {
  const e = {};
  return t2.output.amount.forEach(({ unit: r, quantity: n }) => {
    if (r === "lovelace") e.coins = Number(n);
    else {
      const { policyId: s, assetName: o } = hn(r);
      e[s] || (e[s] = {}), e[s][o] = Number(n);
    }
  }), e;
}, en = (t2) => {
  const e = {};
  return t2.output.amount.forEach(({ unit: r, quantity: n }) => {
    if (r === "lovelace") e.ada = { lovelace: Number(n) };
    else {
      const { policyId: s, assetName: o } = hn(r);
      e[s] || (e[s] = {}), e[s][o] = Number(n);
    }
  }), e;
}, tn = (t2, e, r) => {
  const n = `${t2.input.txHash}:${t2.input.outputIndex}`;
  e.has(n) || (e.add(n), r.push(t2));
};
function Lo(t2) {
  const e = t2.map((r) => r.output.amount).reduce((r, n) => {
    for (const s of n) s && (r[s.unit] == null && (r[s.unit] = 0), s.unit in r && (r[s.unit] += parseFloat(s.quantity)));
    return r;
  }, {});
  return Object.fromEntries(Object.entries(e).map(([r, n]) => [r, n.toString()]));
}
var it = class j {
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
      const r = Ve(e.replace("$", "")), n = `${xt[1]}000de140${r}`;
      return await this.fetchAssetMetadata(n);
    } catch (r) {
      throw R(r);
    }
  }
  async fetchHandleAddress(e) {
    var _a2;
    const r = Ve(e.replace("$", "")), n = xt[1], o = (_a2 = (await this.fetchAssetAddresses(`${n}${r}`))[0]) == null ? void 0 : _a2.address;
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
    const r = Es.fromCbor(Ns(e)), n = Date.now(), s = js(this.network ?? "mainnet", n), o = Cs(this.network ?? "mainnet", n), i = this.slotToEpochSlot(BigInt(s)), c = zt.randomBytes(32).toString("hex"), d = zt.randomBytes(32).toString("hex"), u = zt.randomBytes(32).toString("hex"), p = r.body().fee().toString(), m = r.body().outputs().reduce((N, O) => {
      const D = O.amount().coin();
      return N + D;
    }, 0n), x = r.body().ttl(), y = r.body().validityStartInterval(), k = r.body().hash(), g = { confirmations: 40, nextBlock: "undefined its a random block", hash: c, time: n, slot: s, epoch: o, epochSlot: i.toString(), fees: p, slotLeader: "pool1qv3x5x5x5x5x5x5x5x5x5x5x5x5x5x5", size: e.length / 2, txCount: 1, output: m.toString(), operationalCertificate: u, previousBlock: d, VRFKey: "vrf_vk1qv3x5x5x5x5x5x5x5x5x5x5x5x5x5" }, b = r.body().inputs().values().map((N) => {
      const O = N.transactionId(), D = Number(N.index()), le = Object.values(this.utxos).flat().find((xe) => xe.input.txHash === O && xe.input.outputIndex === D);
      if (!le) throw new Error(`UTxO not found for transaction hash and output index: ${O} ${D}`);
      return le;
    });
    for (const N of Object.values(this.utxos)) for (const O of b) {
      const D = N.indexOf(O);
      D !== -1 && N.splice(D, 1);
    }
    const C = r.body().outputs().map((N, O) => this.mapOutputToUTxO(N, k, O)), _ = { inputs: b, hash: k, index: 0, block: c, slot: s.toString(), fees: p, size: e.length / 2, deposit: "0", invalidBefore: y ? y.toString() : "", invalidAfter: x ? x.toString() : "", outputs: C };
    this.addBlock(g), this.addTransaction(_);
  }
  slotToEpochSlot(e) {
    const r = _s[this.network ?? "mainnet"], n = BigInt(r.epochLength);
    return e % n;
  }
  mapOutputToUTxO(e, r, n) {
    var _a2, _b, _c, _d, _e;
    return { input: { txHash: r, outputIndex: n }, output: { address: e.address().toBech32(), amount: this.mapValueToAsset(e.amount()), dataHash: (_a2 = e.datum()) == null ? void 0 : _a2.asDataHash(), plutusData: (_c = (_b = e.datum()) == null ? void 0 : _b.asInlineData()) == null ? void 0 : _c.toCbor(), scriptRef: (_d = e.scriptRef()) == null ? void 0 : _d.toCbor(), scriptHash: (_e = e.scriptRef()) == null ? void 0 : _e.hash() } };
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
}, $o = class {
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
            const s = await this.fetchPlutusScriptCBOR(t2), o = ks(s, "DoubleCBOR");
            n = { version: e.type.replace("plutus", ""), code: o };
          } else n = await this.fetchNativeScriptJSON(t2);
          return Ss(n).toCbor().toString();
        }
        throw R(e);
      }
    });
    __publicField(this, "toUTxO", async (t2, e) => ({ input: { outputIndex: t2.output_index, txHash: e }, output: { address: t2.address, amount: t2.amount, dataHash: t2.data_hash ?? void 0, plutusData: t2.inline_datum ?? void 0, scriptRef: t2.reference_script_hash ? await this.resolveScriptRef(t2.reference_script_hash) : void 0, scriptHash: t2.reference_script_hash } }));
    let e;
    if (typeof t2[0] == "string" && (t2[0].startsWith("http") || t2[0].startsWith("/"))) this._axiosInstance = U.create({ baseURL: t2[0] }), this._network = "mainnet", e = t2[1];
    else {
      const r = t2[0], n = r.slice(0, 7);
      this._axiosInstance = U.create({ baseURL: `https://cardano-${n}.blockfrost.io/api/v${t2[1] ?? 0}`, headers: { project_id: r } }), this._network = n, e = t2[2];
    }
    (e == null ? void 0 : e.enableCaching) && (this._enableCaching = true, this._offlineFetcher = e.offlineFetcher || new it(this._network));
  }
  async evaluateTx(t2, e, r) {
    const n = Bo("blockfrost", e, r), s = { cbor: t2, additionalUtxoSet: n };
    try {
      const o = { "Content-Type": "application/json" }, { status: i, data: c } = await this._axiosInstance.post("utils/txs/evaluate/utxos", s, { headers: o });
      if (i === 200 && c.result.EvaluationResult) {
        const d = { spend: "SPEND", mint: "MINT", certificate: "CERT", withdrawal: "REWARD" }, u = [];
        return Object.keys(c.result.EvaluationResult).forEach((p) => {
          const [m, x] = p.split(":"), { memory: y, steps: k } = c.result.EvaluationResult[p];
          u.push({ tag: d[m], index: Number(x), budget: { mem: y, steps: k } });
        }), u;
      }
      throw R(c);
    } catch (o) {
      throw R(o);
    }
  }
  async fetchAccountInfo(t2) {
    const e = t2.startsWith("addr") ? bs(t2) : t2;
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
    return Lo(e);
  }
  async fetchAddressTxs(t2, e = Ir) {
    const r = [];
    try {
      const n = { ...Ir, ...e };
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
      const { policyId: s, assetName: o } = Zr(t2), { data: i, status: c } = await this._axiosInstance.get(`assets/${s}${o}/addresses?page=${r}`);
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
      const { policyId: e, assetName: r } = Zr(t2), { data: n, status: s } = await this._axiosInstance.get(`assets/${e}${r}`);
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
      const e = Ve(`${t2.replace("$", "")}`);
      return await this.fetchAssetMetadata(`${xt[1]}000de140${e}`);
    } catch (e) {
      throw R(e);
    }
  }
  async fetchHandleAddress(t2) {
    if (this._network !== "mainnet") throw new Error("Does not support fetching addresses by handle on non-mainnet networks.");
    try {
      const e = Ve(t2.replace("$", "")), { data: r, status: n } = await this._axiosInstance.get(`assets/${xt[1]}${e}/addresses`);
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
      if (r === 200 || r == 202) return ws({ coinsPerUtxoSize: e.coins_per_utxo_word, collateralPercent: e.collateral_percent, decentralisation: e.decentralisation_param, epoch: e.epoch, keyDeposit: e.key_deposit, maxBlockExMem: e.max_block_ex_mem, maxBlockExSteps: e.max_block_ex_steps, maxBlockHeaderSize: e.max_block_header_size, maxBlockSize: e.max_block_size, maxCollateralInputs: e.max_collateral_inputs, maxTxExMem: e.max_tx_ex_mem, maxTxExSteps: e.max_tx_ex_steps, maxTxSize: e.max_tx_size, maxValSize: e.max_val_size, minFeeA: e.min_fee_a, minFeeB: e.min_fee_b, minPoolCost: e.min_pool_cost, poolDeposit: e.pool_deposit, priceMem: e.price_mem, priceStep: e.price_step });
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
      const e = { "Content-Type": "application/cbor" }, { data: r, status: n } = await this._axiosInstance.post("tx/submit", this.submitTxToBytes ? vs(t2) : t2, { headers: e });
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
    this._enableCaching = t2, t2 ? this._offlineFetcher = e || new it(this._network) : this._offlineFetcher = void 0;
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
      const r = it.fromJSON(t2);
      this._offlineFetcher = r;
    }
  }
  clearCache() {
    this._offlineFetcher && (this._offlineFetcher = new it(this._network));
  }
};
function ft(t2) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? ft = function(e) {
    return typeof e;
  } : ft = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, ft(t2);
}
var Bn = "dahlia", Mo = function(e) {
  return e === 3 ? "v3" : e;
}, Un = "https://js.stripe.com", qo = "".concat(Un, "/").concat(Bn, "/stripe.js"), Ho = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/, zo = /^https:\/\/js\.stripe\.com\/(v3|[a-z]+)\/stripe\.js(\?.*)?$/;
var Vo = function(e) {
  return Ho.test(e) || zo.test(e);
}, Wo = function() {
  for (var e = document.querySelectorAll('script[src^="'.concat(Un, '"]')), r = 0; r < e.length; r++) {
    var n = e[r];
    if (Vo(n.src)) return n;
  }
  return null;
}, rn = function(e) {
  var r = "", n = document.createElement("script");
  n.src = "".concat(qo).concat(r);
  var s = document.head || document.body;
  if (!s) throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");
  return s.appendChild(n), n;
}, Jo = function(e, r) {
  !e || !e._registerWrapper || e._registerWrapper({ name: "stripe-js", version: "9.7.0", startTime: r });
}, $e = null, ct = null, lt = null, Ko = function(e) {
  return function(r) {
    e(new Error("Failed to load Stripe.js", { cause: r }));
  };
}, Xo = function(e, r) {
  return function() {
    window.Stripe ? e(window.Stripe) : r(new Error("Stripe.js not available"));
  };
}, Go = function(e) {
  return $e !== null ? $e : ($e = new Promise(function(r, n) {
    if (typeof window > "u" || typeof document > "u") {
      r(null);
      return;
    }
    if (window.Stripe) {
      r(window.Stripe);
      return;
    }
    try {
      var s = Wo();
      if (!(s && e)) {
        if (!s) s = rn(e);
        else if (s && lt !== null && ct !== null) {
          var o;
          s.removeEventListener("load", lt), s.removeEventListener("error", ct), (o = s.parentNode) === null || o === void 0 || o.removeChild(s), s = rn(e);
        }
      }
      lt = Xo(r, n), ct = Ko(n), s.addEventListener("load", lt), s.addEventListener("error", ct);
    } catch (i) {
      n(i);
      return;
    }
  }), $e.catch(function(r) {
    return $e = null, Promise.reject(r);
  }));
}, Yo = function(e, r, n) {
  if (e === null) return null;
  var s = r[0];
  if (typeof s != "string") throw new Error("Expected publishable key to be of type string, got type ".concat(ft(s), " instead."));
  var o = s.match(/^pk_test/), i = Mo(e.version), c = Bn;
  o && i !== c && console.warn("Stripe.js@".concat(i, " was loaded on the page, but @stripe/stripe-js@").concat("9.7.0", " expected Stripe.js@").concat(c, ". This may result in unexpected behavior. For more information, see https://docs.stripe.com/sdks/stripejs-versioning"));
  var d = e.apply(void 0, r);
  return Jo(d, n), d;
}, Me, Ln = false, $n = function() {
  return Me || (Me = Go(null).catch(function(e) {
    return Me = null, Promise.reject(e);
  }), Me);
};
Promise.resolve().then(function() {
  return $n();
}).catch(function(t2) {
  Ln || console.warn(t2);
});
var Qo = function() {
  for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
  Ln = true;
  var s = Date.now();
  return $n().then(function(o) {
    return Yo(o, r, s);
  });
}, Gt = { exports: {} }, Yt, nn;
function Zo() {
  if (nn) return Yt;
  nn = 1;
  var t2 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Yt = t2, Yt;
}
var Qt, sn;
function ei() {
  if (sn) return Qt;
  sn = 1;
  var t2 = Zo();
  function e() {
  }
  function r() {
  }
  return r.resetWarningCache = e, Qt = function() {
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
  }, Qt;
}
var an;
function ti() {
  return an || (an = 1, Gt.exports = ei()()), Gt.exports;
}
var ri = ti();
const L = ls(ri);
function on(t2, e) {
  var r = Object.keys(t2);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t2);
    e && (n = n.filter(function(s) {
      return Object.getOwnPropertyDescriptor(t2, s).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function cn(t2) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? on(Object(r), true).forEach(function(n) {
      Mn(t2, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(r)) : on(Object(r)).forEach(function(n) {
      Object.defineProperty(t2, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t2;
}
function mt(t2) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? mt = function(e) {
    return typeof e;
  } : mt = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, mt(t2);
}
function Mn(t2, e, r) {
  return e in t2 ? Object.defineProperty(t2, e, { value: r, enumerable: true, configurable: true, writable: true }) : t2[e] = r, t2;
}
function ni(t2, e) {
  if (t2 == null) return {};
  var r = {}, n = Object.keys(t2), s, o;
  for (o = 0; o < n.length; o++) s = n[o], !(e.indexOf(s) >= 0) && (r[s] = t2[s]);
  return r;
}
function si(t2, e) {
  if (t2 == null) return {};
  var r = ni(t2, e), n, s;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t2);
    for (s = 0; s < o.length; s++) n = o[s], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t2, n) && (r[n] = t2[n]);
  }
  return r;
}
function qn(t2, e) {
  return ai(t2) || oi(t2, e) || ii(t2, e) || ci();
}
function ai(t2) {
  if (Array.isArray(t2)) return t2;
}
function oi(t2, e) {
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
function ii(t2, e) {
  if (t2) {
    if (typeof t2 == "string") return ln(t2, e);
    var r = Object.prototype.toString.call(t2).slice(8, -1);
    if (r === "Object" && t2.constructor && (r = t2.constructor.name), r === "Map" || r === "Set") return Array.from(t2);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return ln(t2, e);
  }
}
function ln(t2, e) {
  (e == null || e > t2.length) && (e = t2.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t2[r];
  return n;
}
function ci() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Z = function(e, r, n) {
  var s = !!n, o = F.useRef(n);
  F.useEffect(function() {
    o.current = n;
  }, [n]), F.useEffect(function() {
    if (!s || !e) return function() {
    };
    var i = function() {
      if (o.current) return o.current.apply(o, arguments);
    };
    return e.on(r, i), function() {
      e.off(r, i);
    };
  }, [s, r, e, o]);
}, cr = function(e) {
  var r = F.useRef(e);
  return F.useEffect(function() {
    r.current = e;
  }, [e]), r.current;
}, Oe = function(e) {
  return e !== null && mt(e) === "object";
}, li = function(e) {
  return Oe(e) && typeof e.then == "function";
}, di = function(e) {
  return Oe(e) && typeof e.elements == "function" && typeof e.createToken == "function" && typeof e.createPaymentMethod == "function" && typeof e.confirmCardPayment == "function";
}, dn = "[object Object]", ui = function t(e, r) {
  if (!Oe(e) || !Oe(r)) return e === r;
  var n = Array.isArray(e), s = Array.isArray(r);
  if (n !== s) return false;
  var o = Object.prototype.toString.call(e) === dn, i = Object.prototype.toString.call(r) === dn;
  if (o !== i) return false;
  if (!o && !n) return e === r;
  var c = Object.keys(e), d = Object.keys(r);
  if (c.length !== d.length) return false;
  for (var u = {}, p = 0; p < c.length; p += 1) u[c[p]] = true;
  for (var m = 0; m < d.length; m += 1) u[d[m]] = true;
  var x = Object.keys(u);
  if (x.length !== c.length) return false;
  var y = e, k = r, g = function(b) {
    return t(y[b], k[b]);
  };
  return x.every(g);
}, Hn = function(e, r, n) {
  return Oe(e) ? Object.keys(e).reduce(function(s, o) {
    var i = !Oe(r) || !ui(e[o], r[o]);
    return n.includes(o) ? (i && console.warn("Unsupported prop change: options.".concat(o, " is not a mutable property.")), s) : i ? cn(cn({}, s || {}), {}, Mn({}, o, e[o])) : s;
  }, null) : null;
}, zn = "Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.", un = function(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : zn;
  if (e === null || di(e)) return e;
  throw new Error(r);
}, pi = function(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : zn;
  if (li(e)) return { tag: "async", stripePromise: Promise.resolve(e).then(function(s) {
    return un(s, r);
  }) };
  var n = un(e, r);
  return n === null ? { tag: "empty" } : { tag: "sync", stripe: n };
}, hi = function(e) {
  !e || !e._registerWrapper || !e.registerAppInfo || (e._registerWrapper({ name: "react-stripe-js", version: "6.5.0" }), e.registerAppInfo({ name: "react-stripe-js", version: "6.5.0", url: "https://stripe.com/docs/stripe-js/react" }));
}, Ct = F.createContext(null);
Ct.displayName = "ElementsContext";
var Vn = function(e, r) {
  if (!e) throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(r, " in an <Elements> provider."));
  return e;
}, Wn = function(e) {
  var r = e.stripe, n = e.options, s = e.children, o = F.useMemo(function() {
    return pi(r);
  }, [r]), i = F.useState(function() {
    return { stripe: o.tag === "sync" ? o.stripe : null, elements: o.tag === "sync" ? o.stripe.elements(n) : null };
  }), c = qn(i, 2), d = c[0], u = c[1];
  F.useEffect(function() {
    var x = true, y = function(g) {
      u(function(h) {
        return h.stripe ? h : { stripe: g, elements: g.elements(n) };
      });
    };
    return o.tag === "async" && !d.stripe ? o.stripePromise.then(function(k) {
      k && x && y(k);
    }) : o.tag === "sync" && !d.stripe && y(o.stripe), function() {
      x = false;
    };
  }, [o, d, n]);
  var p = cr(r);
  F.useEffect(function() {
    p !== null && p !== r && console.warn("Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.");
  }, [p, r]);
  var m = cr(n);
  return F.useEffect(function() {
    if (d.elements) {
      var x = Hn(n, m, ["clientSecret", "fonts"]);
      x && d.elements.update(x);
    }
  }, [n, m, d.elements]), F.useEffect(function() {
    hi(d.stripe);
  }, [d.stripe]), F.createElement(Ct.Provider, { value: d }, s);
};
Wn.propTypes = { stripe: L.any, options: L.object };
var fi = function(e) {
  var r = F.useContext(Ct);
  return Vn(r, e);
}, mi = function() {
  var e = fi("calls useElements()"), r = e.elements;
  return r;
};
L.func.isRequired;
var Jn = F.createContext(null);
Jn.displayName = "CheckoutContext";
var lr = function(e) {
  var r = F.useContext(Jn), n = F.useContext(Ct);
  if (r) {
    if (n) throw new Error("You cannot wrap the part of your app that ".concat(e, " in both a checkout provider and <Elements> provider."));
    return r;
  } else return Vn(n, e);
}, xi = ["mode"], gi = function(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}, z = function(e, r, n) {
  var s = "".concat(gi(e), "Element"), o = function(u) {
    var p = u.id, m = u.className, x = u.options, y = x === void 0 ? {} : x, k = u.onBlur, g = u.onFocus, h = u.onReady, b = u.onChange, C = u.onEscape, _ = u.onClick, N = u.onLoadError, O = u.onLoaderStart, D = u.onNetworksChange, le = u.onConfirm, xe = u.onCancel, Pe = u.onShippingAddressChange, de = u.onShippingRateChange, ce = u.onSavedPaymentMethodRemove, be = u.onSavedPaymentMethodUpdate, Ie = u.onAvailablePaymentMethodsChange, E = lr("mounts <".concat(s, ">")), W = "elements" in E ? E.elements : null, X = "checkoutState" in E ? E.checkoutState : null, ue = (X == null ? void 0 : X.type) === "success" || (X == null ? void 0 : X.type) === "loading" ? X.sdk : null, G = F.useState(null), ge = qn(G, 2), P = ge[0], J = ge[1], M = F.useRef(null), pe = F.useRef(null);
    Z(P, "blur", k), Z(P, "focus", g), Z(P, "escape", C), Z(P, "click", _), Z(P, "loaderror", N), Z(P, "loaderstart", O), Z(P, "networkschange", D), Z(P, "confirm", le), Z(P, "cancel", xe), Z(P, "shippingaddresschange", Pe), Z(P, "shippingratechange", de), Z(P, "savedpaymentmethodremove", ce), Z(P, "savedpaymentmethodupdate", be), Z(P, "availablepaymentmethodschange", Ie), Z(P, "change", b);
    var T;
    h && (e === "expressCheckout" ? T = h : T = function() {
      h(P);
    }), Z(P, "ready", T), F.useLayoutEffect(function() {
      if (M.current === null && pe.current !== null && (W || ue)) {
        var B = null;
        if (ue) {
          var ie = ue, ne = ue;
          switch (e) {
            case "paymentForm":
              B = ne.createForm(y);
              break;
            case "payment":
              B = ie.createPaymentElement(y);
              break;
            case "address":
              if ("mode" in y) {
                var me = y.mode, Y = si(y, xi);
                if (me === "shipping") B = ie.createShippingAddressElement(Y);
                else if (me === "billing") B = ie.createBillingAddressElement(Y);
                else throw new Error("Invalid options.mode. mode must be 'billing' or 'shipping'.");
              } else throw new Error("You must supply options.mode. mode must be 'billing' or 'shipping'.");
              break;
            case "expressCheckout":
              B = ie.createExpressCheckoutElement(y);
              break;
            case "currencySelector":
              B = ue.createCurrencySelectorElement();
              break;
            case "taxId":
              B = ie.createTaxIdElement(y);
              break;
            case "contactDetails":
              B = ie.createContactDetailsElement();
              break;
            default:
              throw new Error("<".concat(s, "> is not supported inside a checkout provider. Use an <Elements> provider instead."));
          }
        } else W && (B = W.create(e, y));
        M.current = B, J(B), B && B.mount(pe.current);
      }
    }, [W, ue, y]);
    var te = cr(y);
    return F.useEffect(function() {
      if (M.current) {
        var B = Hn(y, te, ["paymentRequest"]);
        B && "update" in M.current && M.current.update(B);
      }
    }, [y, te]), F.useLayoutEffect(function() {
      return function() {
        if (M.current && typeof M.current.destroy == "function") try {
          M.current.destroy(), M.current = null;
        } catch {
        }
      };
    }, []), F.createElement("div", { id: p, className: m, ref: pe });
  }, i = function(u) {
    lr("mounts <".concat(s, ">"));
    var p = u.id, m = u.className;
    return F.createElement("div", { id: p, className: m });
  }, c = r ? i : o;
  return c.propTypes = { id: L.string, className: L.string, onChange: L.func, onBlur: L.func, onFocus: L.func, onReady: L.func, onEscape: L.func, onClick: L.func, onLoadError: L.func, onLoaderStart: L.func, onNetworksChange: L.func, onConfirm: L.func, onCancel: L.func, onShippingAddressChange: L.func, onShippingRateChange: L.func, onSavedPaymentMethodRemove: L.func, onSavedPaymentMethodUpdate: L.func, onAvailablePaymentMethodsChange: L.func, options: L.object }, c.displayName = s, c.__elementType = e, c;
}, V = typeof window > "u", yi = F.createContext(null);
yi.displayName = "EmbeddedCheckoutProviderContext";
var bi = function() {
  var e = lr("calls useStripe()"), r = e.stripe;
  return r;
};
z("auBankAccount", V);
z("card", V);
z("cardNumber", V);
z("cardExpiry", V);
z("cardCvc", V);
z("iban", V);
var wi = z("payment", V);
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
async function vi() {
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
const ki = Qo(H.stripe.publishableKey), Zt = () => [{ id: "stripe", label: "Adyen (Card, Sofort)", icon: We, color: "from-indigo-500 to-violet-600", shadow: "shadow-indigo-500/20" }, { id: "wero", label: "Wero (Instant)", icon: Je, color: "from-purple-500 to-pink-500", shadow: "shadow-purple-500/20" }, { id: "digital_euro", label: "Digital Euro", icon: gt, color: "from-cyan-500 to-blue-600", shadow: "shadow-cyan-500/20" }, { id: "paypal", label: "PayPal", icon: Us, color: "from-blue-500 to-cyan-500", shadow: "shadow-blue-500/20" }, { id: "crypto", label: "Crypto", icon: ys, color: "from-amber-500 to-orange-500", shadow: "shadow-amber-500/20" }], pn = [{ id: "metamask", name: "MetaMask", color: "bg-[#F6851B] text-white" }, { id: "coinbase", name: "Coinbase Wallet", color: "bg-[#0052FF] text-white" }, { id: "trust", name: "Trust Wallet", color: "bg-[#3375BB] text-white" }, { id: "phantom", name: "Phantom", color: "bg-[#AB9FF2] text-white" }, { id: "lace", name: "Lace (Cardano)", color: "bg-[#0033AD] text-white" }], er = { metamask: { symbol: "ETH", rate: 33e-5 }, coinbase: { symbol: "ETH", rate: 33e-5 }, trust: { symbol: "BNB", rate: 16e-4 }, phantom: { symbol: "SOL", rate: 66e-4 }, lace: { symbol: "ADA", rate: 2.22 } };
function rc({ onBack: t2, onInitiateStripe: e, onInitiateWero: r, onInitiateDigitalEuro: n, onInitiateCrypto: s, onComplete: o }) {
  var _a2, _b;
  const [i, c] = S.useState(2.22), [d, u] = S.useState(false);
  S.useEffect(() => {
    let f = true;
    async function w() {
      u(true);
      const q = await vi();
      f && (c(q), u(false));
    }
    return w(), () => {
      f = false;
    };
  }, []);
  const p = (f) => {
    var _a3;
    return f === "lace" ? i : ((_a3 = er[f]) == null ? void 0 : _a3.rate) || 1;
  }, { cart: m } = ds(), { user: x } = us(), y = S.useMemo(() => m.reduce((f, w) => {
    const q = w.discount_percentage && w.discount_percentage > 0 ? w.price * (1 - w.discount_percentage / 100) : w.price;
    return f + q * w.cart_quantity;
  }, 0), [m]), k = S.useMemo(() => m.reduce((f, w) => f + Number(w.cart_quantity || 0), 0), [m]), g = S.useMemo(() => {
    const f = H.paymentMethods || ["stripe", "adyen", "digital_euro", "worldline", "paypal", "crypto"], w = Zt(), q = w.filter((Q) => f.includes(Q.id));
    return q.length > 0 ? q : w;
  }, []), [h, b] = S.useState(() => {
    var _a3;
    return ((_a3 = g[0]) == null ? void 0 : _a3.id) || "stripe";
  }), [C, _] = S.useState("phone"), [N, O] = S.useState(""), [D, le] = S.useState(false), [xe, Pe] = S.useState(false), [de, ce] = S.useState("idle"), [be, Ie] = S.useState(""), [E, W] = S.useState({ name: "", street: "", city: "", zip: "", phone: "", invoiceEmail: x && !x.is_anonymous && x.email || "", country: "" }), [X, ue] = S.useState(false);
  S.useEffect(() => {
    x && !x.is_anonymous && (x.email && W((w) => w.invoiceEmail ? w : { ...w, invoiceEmail: x.email }), (async () => {
      try {
        if (H.databaseProvider === "supabase") {
          const { data: w, error: q } = await ee.from("user_roles").select("name, street, city, zip, phone, country").eq("user_id", x.id || x.$id).maybeSingle();
          w && !q && (W((Q) => ({ ...Q, name: w.name || Q.name, street: w.street || Q.street, city: w.city || Q.city, zip: w.zip || Q.zip, phone: w.phone || Q.phone, country: w.country || Q.country })), (w.name || w.street || w.city || w.zip || w.phone || w.country) && ue(true));
        }
      } catch (w) {
        console.error("Failed to load saved address:", w);
      }
    })());
  }, [x]);
  const [G, ge] = S.useState(null), [P, J] = S.useState(null), [M, pe] = S.useState(null), [T, te] = S.useState(false), [B, ie] = S.useState(false), [ne, me] = S.useState(false), [Y, A] = S.useState(null), [se, he] = S.useState(null), [ye, _e] = S.useState(false), [we, ve] = S.useState(false), [Qe, Kn] = S.useState(""), [Ze, Xn] = S.useState(""), _t = !!(E.name && E.street && E.city && E.zip && E.country && E.phone && (h !== "crypto" || G !== null) && (h !== "wero" || C === "qr" || C === "phone" && N.trim().length > 6) && (!we || Qe && Ze.length >= 6)), Gn = async (f) => {
    if (f === "lace") {
      te(true);
      try {
        if (window.cardano && window.cardano.lace) {
          const q = await (await Vt.enable("lace")).getChangeAddress();
          q ? (ge("lace"), J(q), pe(null)) : alert("Connected to Lace, but no change address found.");
        } else alert("Lace wallet extension not found. Please install Lace to continue.");
      } catch (w) {
        console.error("Failed to connect to Lace wallet:", w), alert(`Connection to Lace wallet was rejected or failed. Details: ${(w == null ? void 0 : w.info) || (w == null ? void 0 : w.message) || JSON.stringify(w)}`);
      } finally {
        te(false);
      }
    } else ge(f), J("0x" + Math.random().toString(16).slice(2, 10) + "..." + Math.random().toString(16).slice(2, 6)), pe(null);
  }, Yn = async () => {
    var _a3;
    if (G) {
      ie(true);
      try {
        if (G === "lace") {
          const q = ((_a3 = (await (await Vt.enable("lace")).getBalance()).find((I) => I.unit === "lovelace")) == null ? void 0 : _a3.quantity) || "0", Q = (Number(q) / 1e6).toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          pe(`${Q} ADA`);
        } else setTimeout(() => {
          pe(`1.25 ${er[G].symbol}`), ie(false);
        }, 800);
      } catch (f) {
        console.error("Failed to check balance:", f);
      } finally {
        ie(false);
      }
    }
  }, [xr, Qn] = S.useState(null), [et, Zn] = S.useState(null), [De, es] = S.useState(null), [At, gr] = S.useState(false), [yr, br] = S.useState(null), [tt, wr] = S.useState(null), [Fe, vr] = S.useState(null), [kr, Rt] = S.useState(null), [Sr, Ot] = S.useState(null), [rt, Tt] = S.useState(null), [Be, Pt] = S.useState(null), [It, Er] = S.useState(false), [nt, Dt] = S.useState(null), [Nr, Ft] = S.useState(null), [Ue, Bt] = S.useState(null), [Ut, jr] = S.useState(false), st = S.useRef(false);
  S.useEffect(() => () => {
    if (st.current) return;
    const f = De || Fe || Be || Ue;
    f && (async () => {
      try {
        await ee.rpc("cancel_order_with_inventory", { p_order_id: f });
      } catch (q) {
        console.error("Failed to cancel order on unmount:", q);
      }
    })();
  }, [De, Fe, Be, Ue]);
  const ts = async (f) => {
    var _a3, _b2;
    const w = `${E.name}
${E.street}
${E.city}, ${E.zip}
${E.country}`.trim();
    if (!w || !E.phone) return;
    if (X && x && !x.is_anonymous) try {
      H.databaseProvider === "supabase" && await ee.from("user_roles").update({ name: E.name, street: E.street, city: E.city, zip: E.zip, phone: E.phone, country: E.country, is_guest: false }).eq("user_id", x.id || x.$id);
    } catch (I) {
      console.error("Failed to save address to user_roles:", I);
    }
    const q = we ? { email: Qe, password: Ze } : void 0, Q = ((_a3 = E.invoiceEmail) == null ? void 0 : _a3.trim()) || void 0;
    if (h === "stripe") {
      gr(true);
      try {
        const I = await e(w, E.phone, q, Q);
        H.activeFiatGateway === "adyen" && (br(I.clientSecret), wr(I.paymentId), vr(I.orderId || null));
      } catch (I) {
        console.error("Failed to initiate Adyen payment:", I);
      } finally {
        gr(false);
      }
    } else if (h === "wero" || h === "worldline") {
      Er(true);
      try {
        const I = await r(w, E.phone, N, C, q, Q);
        Tt(I.paymentId), Rt(I.qrCodeData), Ot(I.redirectUrl), Pt(I.orderId || null);
      } catch (I) {
        console.error("Failed to initiate Wero payment:", I);
      } finally {
        Er(false);
      }
    } else if (h === "digital_euro") {
      jr(true);
      try {
        const I = await n(w, E.phone, q, Q);
        Dt(I.paymentId), Ft(I.redirectUrl), Bt(I.orderId || null);
      } catch (I) {
        console.error("Failed to initiate Digital Euro payment:", I);
      } finally {
        jr(false);
      }
    } else if (h === "crypto" && G === "lace") {
      me(true), he(null), _e(false);
      try {
        const I = await Vt.enable("lace"), ns = H.cryptoReceiverAddresses.lace, Lt = p("lace"), $t = (y * Lt).toFixed(6), ss = Math.round(Number($t) * 1e6).toString(), _r = new Ds({ initiator: I });
        _r.sendLovelace(ns, ss);
        const as = await _r.build(), os = await I.signTx(as), at = await I.submitTx(os);
        A(at), _e(true);
        const Ar = we ? { email: Qe, password: Ze } : void 0, Rr = ((_b2 = E.invoiceEmail) == null ? void 0 : _b2.trim()) || void 0, ke = await s(w, E.phone, { txHash: at, customerAddress: P || "", walletName: "lace", adaAmount: $t, rateUsed: Lt }, Ar, Rr);
        let Or = false;
        const is = (H.cryptoPaymentTimeoutMinutes || 3) * 60 * 1e3, cs = setTimeout(async () => {
          if (Or = true, _e(false), me(false), he(`Crypto payment confirmation timed out after ${H.cryptoPaymentTimeoutMinutes || 3} minutes.`), ke.paymentId && H.databaseProvider === "supabase") try {
            await ee.from("payments").update({ provider_status: "expired", completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", ke.paymentId), console.log("Crypto payment marked as expired in DB:", ke.paymentId);
          } catch (Mt) {
            console.error("Failed to update payment to expired:", Mt);
          }
          if (ke.orderId && H.databaseProvider === "supabase") try {
            await ee.rpc("cancel_order_with_inventory", { p_order_id: ke.orderId }), console.log("Crypto order cancelled on timeout:", ke.orderId);
          } catch (Mt) {
            console.error("Failed to cancel crypto order on timeout:", Mt);
          }
        }, is);
        new $o("preprodjz45ulPXDFrUvQJC54yYEKRAhJS0ZvZm").onTxConfirmed(at, () => {
          Or || (clearTimeout(cs), st.current = true, o(h, w, E.phone, Ar, Rr, void 0, void 0, { txHash: at, customerAddress: P || "", walletName: "lace", adaAmount: $t, rateUsed: Lt, paymentId: ke.paymentId }));
        });
      } catch (I) {
        console.error("Cardano payment transaction failed:", I), he((I == null ? void 0 : I.message) || (I == null ? void 0 : I.info) || JSON.stringify(I));
      } finally {
        me(false);
      }
    } else o(h, w, E.phone, q, Q, f);
  }, rs = async () => {
    await ts();
  }, Cr = Zt().find((f) => f.id === h) || Zt()[0];
  return a.jsxs("div", { className: "min-h-screen bg-background transition-colors duration-500 overflow-x-hidden", children: [a.jsx("div", { className: "bg-card text-card-foreground border-b border-gray-100 dark:border-slate-800 sticky top-0 z-30 transition-colors", children: a.jsxs("div", { className: "max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center gap-3 sm:gap-4", children: [a.jsx("button", { onClick: t2, className: "p-2 sm:p-2.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-all text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white active:scale-95 shrink-0", children: a.jsx(Fs, { className: "w-5 h-5" }) }), a.jsxs("div", { className: "flex-grow min-w-0", children: [a.jsx("h1", { className: "text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight truncate", children: "Checkout" }), a.jsxs("p", { className: "text-[10px] sm:text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-wide truncate", children: [k, " item", k !== 1 ? "s" : "", " in your order"] })] }), a.jsxs("div", { className: "flex items-center gap-1 sm:gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shrink-0", children: [a.jsx(qe, { className: "w-3 h-3 sm:w-3.5 sm:h-3.5" }), a.jsx("span", { className: "text-[9px] sm:text-[10px] font-bold uppercase tracking-widest hidden sm:inline", children: "Secure" })] })] }) }), a.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: [a.jsx("div", { className: "flex items-center justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8", children: ["Shipping", "Payment", "Confirm"].map((f, w) => a.jsxs("div", { className: "flex items-center gap-2", children: [a.jsxs("div", { className: `flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all ${w <= 1 ? "bg-gray-900 dark:bg-indigo-600 text-white" : "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-500"}`, children: [a.jsx("span", { className: "w-4 h-4 flex items-center justify-center text-[10px] rounded-full bg-white/20", children: w + 1 }), a.jsx("span", { className: "hidden sm:inline", children: f })] }), w < 2 && a.jsx(ps, { className: "w-4 h-4 text-gray-300" })] }, f)) }), a.jsxs("div", { className: "grid lg:grid-cols-12 gap-6 sm:gap-8 items-start", children: [a.jsxs("div", { className: "lg:col-span-7 space-y-6", children: [a.jsxs($.section, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "bg-card text-card-foreground rounded-[1rem] border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm transition-colors", children: [a.jsxs("div", { className: "px-4 sm:px-7 py-4 sm:py-5 border-b border-gray-50 dark:border-slate-800 flex items-center gap-3", children: [a.jsx("div", { className: "p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl transition-colors", children: a.jsx(hs, { className: "w-5 h-5" }) }), a.jsxs("div", { children: [a.jsx("h2", { className: "text-base font-extrabold text-gray-900 dark:text-white tracking-tight", children: "Shipping Address" }), a.jsx("p", { className: "text-[11px] font-medium text-gray-400 dark:text-gray-500", children: "Where should we deliver your order?" })] })] }), a.jsxs("div", { className: "p-4 sm:p-7 grid sm:grid-cols-2 gap-4 sm:gap-5", children: [a.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [a.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1", children: [a.jsx(fs, { className: "w-3 h-3" }), " Full Name"] }), a.jsx("input", { type: "text", value: E.name, onChange: (f) => W((w) => ({ ...w, name: f.target.value })), placeholder: "John Doe", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), a.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [a.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1", children: [a.jsx(ms, { className: "w-3 h-3" }), " Street Address"] }), a.jsx("input", { type: "text", value: E.street, onChange: (f) => W((w) => ({ ...w, street: f.target.value })), placeholder: "123 Magic Avenue", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), a.jsxs("div", { className: "space-y-1.5", children: [a.jsx("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5", children: "City" }), a.jsx("input", { type: "text", value: E.city, onChange: (f) => W((w) => ({ ...w, city: f.target.value })), placeholder: "Magical Product town", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), a.jsxs("div", { className: "space-y-1.5", children: [a.jsx("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5", children: "ZIP Code" }), a.jsx("input", { type: "text", value: E.zip, onChange: (f) => W((w) => ({ ...w, zip: f.target.value })), placeholder: "12345", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), a.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [a.jsx("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5", children: "Country" }), a.jsxs("select", { value: E.country, onChange: (f) => W((w) => ({ ...w, country: f.target.value })), className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium text-gray-900 dark:text-white", children: [a.jsx("option", { value: "", children: "Select a country" }), a.jsx("option", { value: "FR", children: "France" }), a.jsx("option", { value: "DE", children: "Germany" }), a.jsx("option", { value: "BE", children: "Belgium" }), a.jsx("option", { value: "NL", children: "Netherlands" }), a.jsx("option", { value: "ES", children: "Spain" }), a.jsx("option", { value: "IT", children: "Italy" }), a.jsx("option", { value: "GB", children: "United Kingdom" }), a.jsx("option", { value: "US", children: "United States" })] })] }), a.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [a.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1", children: [a.jsx(Bs, { className: "w-3 h-3" }), " Mobile or WhatsApp Number"] }), a.jsx("input", { type: "tel", value: E.phone, onChange: (f) => W((w) => ({ ...w, phone: f.target.value })), placeholder: "+1 (555) 000-0000", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), a.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [a.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1", children: [a.jsx(Pr, { className: "w-3 h-3" }), " Email for Invoice ", a.jsx("span", { className: "text-gray-300 dark:text-gray-600 normal-case font-medium", children: "(optional)" })] }), a.jsx("input", { type: "email", value: E.invoiceEmail, onChange: (f) => W((w) => ({ ...w, invoiceEmail: f.target.value })), placeholder: "your@email.com", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), x && !x.is_anonymous && a.jsx("div", { className: "sm:col-span-2 pt-2", children: a.jsxs("label", { className: "flex items-center gap-3 p-4 bg-indigo-50/30 dark:bg-indigo-900/10 border border-indigo-100/50 dark:border-indigo-900/30 rounded-2xl cursor-pointer hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group", children: [a.jsxs("div", { className: "relative flex items-center justify-center mt-0.5", children: [a.jsx("input", { type: "checkbox", checked: X, onChange: (f) => ue(f.target.checked), className: "peer appearance-none w-5 h-5 border-2 border-indigo-300 dark:border-indigo-700 rounded bg-white dark:bg-slate-800 checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" }), a.jsx(He, { className: "w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" })] }), a.jsxs("div", { children: [a.jsx("h4", { className: "text-xs font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors", children: "Save address for faster checkout later" }), a.jsx("p", { className: "text-[10px] text-gray-500 dark:text-gray-400 mt-0.5", children: "We will save your name, street, city, ZIP, country, and phone number to your profile." })] })] }) })] })] }), a.jsxs($.section, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "bg-card text-card-foreground rounded-[1rem] border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm transition-colors", children: [a.jsxs("div", { className: "px-4 sm:px-7 py-4 sm:py-5 border-b border-gray-50 dark:border-slate-800 flex items-center gap-3", children: [a.jsx("div", { className: "p-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl transition-colors", children: a.jsx(We, { className: "w-5 h-5" }) }), a.jsxs("div", { children: [a.jsx("h2", { className: "text-base font-extrabold text-gray-900 dark:text-white tracking-tight", children: "Payment Method" }), a.jsx("p", { className: "text-[11px] font-medium text-gray-400 dark:text-gray-500", children: "Choose how you'd like to pay" })] })] }), a.jsxs("div", { className: "p-4 sm:p-7", children: [a.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-5 sm:mb-6", children: g.map((f) => a.jsxs($.button, { onClick: () => b(f.id), whileTap: { scale: 0.96 }, className: `relative flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 overflow-hidden ${h === f.id ? `border-transparent text-white shadow-lg ${f.shadow}` : "border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 text-gray-400 dark:text-gray-500 hover:border-gray-200 dark:hover:border-slate-600 hover:text-gray-600 dark:hover:text-gray-300"}`, children: [h === f.id && a.jsx($.div, { layoutId: "payment-bg", className: `absolute inset-0 bg-gradient-to-br ${f.color}`, transition: { type: "spring", stiffness: 300, damping: 25 } }), a.jsx(f.icon, { className: "w-5 h-5 sm:w-6 sm:h-6 relative z-10" }), a.jsx("span", { className: "text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest relative z-10", children: f.label })] }, f.id)) }), a.jsxs(qt, { mode: "wait", children: [h === "stripe" && a.jsx($.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "space-y-4 overflow-hidden py-2", children: a.jsxs("div", { className: "p-4 bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl flex flex-col items-center text-center gap-3", children: [a.jsx(We, { className: "w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-pulse" }), a.jsxs("div", { children: [a.jsx("p", { className: "text-sm font-bold text-gray-800 dark:text-gray-200", children: "Secure Adyen Checkout" }), a.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm", children: "Click 'Confirm Order' to proceed to the secure, encrypted Adyen checkout page." })] })] }) }, "stripe-fields"), h === "paypal" && a.jsx($.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "overflow-hidden", children: a.jsx("div", { className: "p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 transition-colors text-center", children: a.jsx("p", { className: "text-sm font-semibold text-blue-700 dark:text-blue-300", children: "You'll be redirected to PayPal to complete payment." }) }) }, "paypal-info"), h === "crypto" && a.jsx($.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "overflow-hidden", children: a.jsxs("div", { className: "p-4 sm:p-5 bg-gradient-to-b from-amber-50/50 to-amber-50 rounded-2xl border border-amber-200/60 flex flex-col gap-3 sm:gap-4", children: [a.jsxs("div", { className: "text-center", children: [a.jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-600 rounded-full mb-3", children: a.jsx(Br, { className: "w-6 h-6" }) }), a.jsx("h3", { className: "text-sm font-extrabold text-amber-900 tracking-tight", children: "Connect Web3 Wallet" }), a.jsx("p", { className: "text-[11px] font-medium text-amber-700/70 mt-1", children: "Select a wallet to proceed with crypto payment." })] }), a.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5", children: pn.map((f) => a.jsxs("button", { onClick: () => Gn(f.id), disabled: T, className: `relative flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl font-bold text-[10px] sm:text-xs transition-all duration-200 ${G === f.id ? `${f.color} ring-2 ring-offset-2 ring-amber-400 shadow-md` : "bg-white text-gray-700 border border-amber-100 hover:border-amber-300 hover:bg-amber-50/50"} ${T ? "opacity-50 cursor-not-allowed" : ""}`, children: [a.jsxs("span", { className: "truncate mr-2", children: [f.name, " ", T && f.id === "lace" ? "(Connecting...)" : ""] }), G === f.id && a.jsx(He, { className: "w-4 h-4 shrink-0" })] }, f.id)) }), G && a.jsxs($.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "mt-2 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-amber-200/50 text-center space-y-3", children: [a.jsxs("div", { children: [a.jsxs("p", { className: "text-xs font-semibold text-amber-800", children: ["Connected to ", (_a2 = pn.find((f) => f.id === G)) == null ? void 0 : _a2.name] }), P && a.jsx("p", { className: "text-[10px] font-mono text-amber-600/80 mt-1 bg-amber-100/50 block px-2 py-1 rounded break-all select-all", children: P }), a.jsx("div", { className: "mt-3", children: M ? a.jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-lg border border-green-200/50", children: [a.jsx(Fr, { className: "w-3.5 h-3.5" }), M] }) : a.jsxs("button", { onClick: Yn, disabled: B, className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50", children: [a.jsx(Fr, { className: "w-3.5 h-3.5" }), B ? "Checking..." : "Check Balance"] }) })] }), a.jsxs("div", { className: "pt-3 border-t border-amber-200/50 text-left space-y-2", children: [a.jsx("p", { className: "text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-1", children: "Payment Details" }), a.jsxs("div", { className: "flex justify-between items-center bg-amber-50/80 px-3 py-2 rounded-lg", children: [a.jsx("span", { className: "text-xs font-medium text-amber-700", children: "Amount Due" }), a.jsxs("span", { className: "text-sm font-extrabold text-amber-900", children: [(y * p(G)).toFixed(4), " ", ((_b = er[G]) == null ? void 0 : _b.symbol) || "ADA"] })] }), a.jsxs("div", { className: "bg-amber-50/80 px-3 py-2 rounded-lg space-y-1", children: [a.jsx("span", { className: "text-[10px] font-bold text-amber-700/70 uppercase tracking-wider", children: "Send to Address" }), a.jsx("p", { className: "text-xs font-mono text-amber-900 break-all select-all bg-white/50 p-1.5 rounded", children: H.cryptoReceiverAddresses[G] })] })] })] })] }) }, "crypto-info"), h === "wero" && a.jsx($.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "overflow-hidden", children: a.jsxs("div", { className: "p-4 sm:p-5 bg-gradient-to-b from-purple-50/50 to-purple-50 rounded-2xl border border-purple-200/60 flex flex-col gap-3 sm:gap-4", children: [a.jsxs("div", { className: "text-center", children: [a.jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full mb-3 animate-pulse", children: a.jsx(Je, { className: "w-6 h-6" }) }), a.jsx("h3", { className: "text-sm font-extrabold text-purple-900 tracking-tight", children: "Wero Instant Transfer" }), a.jsx("p", { className: "text-[11px] font-medium text-purple-700/70 mt-1", children: "Pay instantly and securely from your banking app." })] }), a.jsxs("div", { className: "flex gap-2 p-1 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-200/50", children: [a.jsx("button", { type: "button", onClick: () => _("phone"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${C === "phone" ? "bg-purple-600 text-white shadow-sm font-black" : "text-purple-600/70 hover:text-purple-700 hover:bg-purple-50/30"}`, children: "Phone Number" }), a.jsx("button", { type: "button", onClick: () => _("qr"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${C === "qr" ? "bg-purple-600 text-white shadow-sm font-black" : "text-purple-600/70 hover:text-purple-700 hover:bg-purple-50/30"}`, children: "QR Code" })] }), C === "phone" ? a.jsxs("div", { className: "space-y-1.5 text-left bg-white/40 p-3.5 rounded-xl border border-purple-200/30", children: [a.jsxs("label", { className: "text-[10px] font-bold text-purple-400 dark:text-purple-500 uppercase tracking-widest ml-0.5 flex items-center gap-1", children: [a.jsx(Je, { className: "w-3 h-3" }), " Wero Registered Phone"] }), a.jsx("input", { type: "tel", value: N, onChange: (f) => O(f.target.value), placeholder: "+33 6 12 34 56 78", className: "w-full px-4 py-3 bg-white border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all text-sm font-medium text-gray-800" }), a.jsx("p", { className: "text-[9px] text-purple-600/60 font-semibold mt-1", children: "Ensure this phone number is registered with Wero in your bank app." })] }) : a.jsxs("div", { className: "p-4 bg-white/40 text-center rounded-xl border border-purple-200/30 space-y-1", children: [a.jsx(fn, { className: "w-8 h-8 text-purple-600 mx-auto opacity-80" }), a.jsx("p", { className: "text-xs font-bold text-purple-900", children: "QR Code Checkout" }), a.jsx("p", { className: "text-[10px] text-purple-700/60 leading-relaxed", children: "A checkout QR code will generate for you to scan and authorize in your banking app." })] })] }) }, "wero-info"), h === "digital_euro" && a.jsx($.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "overflow-hidden", children: a.jsxs("div", { className: "p-4 sm:p-5 bg-gradient-to-b from-cyan-50/60 to-blue-50 rounded-2xl border border-cyan-200/70 flex flex-col gap-3 sm:gap-4", children: [a.jsxs("div", { className: "text-center", children: [a.jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 bg-cyan-100 text-cyan-700 rounded-full mb-3", children: a.jsx(gt, { className: "w-6 h-6" }) }), a.jsx("h3", { className: "text-sm font-extrabold text-cyan-950 tracking-tight", children: "Digital Euro Sandbox" }), a.jsx("p", { className: "text-[11px] font-medium text-cyan-800/70 mt-1", children: "Simulates a future PSP-hosted Digital Euro authorization flow for testing checkout plumbing." })] }), a.jsxs("div", { className: "grid grid-cols-2 gap-2 text-left", children: [a.jsxs("div", { className: "bg-white/60 border border-cyan-100 rounded-xl p-3", children: [a.jsx("p", { className: "text-[9px] font-black uppercase tracking-wider text-cyan-500", children: "Currency" }), a.jsx("p", { className: "text-sm font-extrabold text-cyan-950 mt-0.5", children: "EUR" })] }), a.jsxs("div", { className: "bg-white/60 border border-cyan-100 rounded-xl p-3", children: [a.jsx("p", { className: "text-[9px] font-black uppercase tracking-wider text-cyan-500", children: "Mode" }), a.jsx("p", { className: "text-sm font-extrabold text-cyan-950 mt-0.5", children: "Sandbox" })] })] })] }) }, "digital-euro-info")] })] })] })] }), a.jsx("div", { className: "lg:col-span-5 relative", children: a.jsxs($.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.15 }, className: "sticky top-24 rounded-[1rem] overflow-hidden", children: [a.jsxs("div", { className: "bg-gradient-to-b from-gray-900 to-gray-950 text-white p-5 sm:p-7 relative", children: [a.jsx("div", { className: "absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" }), a.jsxs("div", { className: "flex items-center justify-between mb-6 relative", children: [a.jsx("h2", { className: "text-lg font-extrabold tracking-tight", children: "Order Summary" }), a.jsxs("span", { className: "text-[10px] font-bold text-white/40 uppercase tracking-widest bg-white/[0.06] px-2.5 py-1 rounded-full", children: [k, " item", k !== 1 ? "s" : ""] })] }), a.jsx("div", { className: "space-y-3 mb-6 max-h-[280px] overflow-y-auto pr-1 relative", style: { scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }, children: m.map((f, w) => a.jsxs($.div, { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.2 + w * 0.05 }, className: "flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] transition-colors group", children: [a.jsx("div", { className: "w-11 h-11 rounded-lg overflow-hidden bg-white/[0.08] flex-shrink-0 flex items-center justify-center", children: a.jsx("img", { src: f.image_url, alt: f.title, className: "w-full h-full object-contain p-1", referrerPolicy: "no-referrer" }) }), a.jsxs("div", { className: "min-w-0 flex-grow", children: [a.jsx("h4", { className: "font-bold text-sm truncate text-white/90", children: f.title }), a.jsxs("p", { className: "text-[11px] text-white/30 font-medium tabular-nums", children: [f.cart_quantity, " \xD7 ", H.currency_symbol, (f.discount_percentage && f.discount_percentage > 0 ? f.price * (1 - f.discount_percentage / 100) : f.price).toFixed(2)] })] }), a.jsxs("div", { className: "font-bold text-sm tabular-nums text-white/70 group-hover:text-white transition-colors", children: [H.currency_symbol, (f.cart_quantity * (f.discount_percentage && f.discount_percentage > 0 ? f.price * (1 - f.discount_percentage / 100) : f.price)).toFixed(2)] })] }, f.id)) }), a.jsxs("div", { className: "space-y-2.5 pt-5 border-t border-white/[0.06]", children: [a.jsxs("div", { className: "flex justify-between text-sm", children: [a.jsx("span", { className: "text-white/40 font-medium", children: "Subtotal" }), a.jsxs("span", { className: "text-white/70 font-bold tabular-nums", children: [H.currency_symbol, y.toFixed(2)] })] }), a.jsxs("div", { className: "flex justify-between text-sm", children: [a.jsx("span", { className: "text-white/40 font-medium", children: "Shipping" }), a.jsx("span", { className: "text-emerald-400 font-bold text-xs bg-emerald-400/10 px-2 py-0.5 rounded-full uppercase tracking-widest", children: "Free" })] }), a.jsx("div", { className: "h-px bg-white/[0.06] my-1" }), a.jsxs("div", { className: "flex justify-between items-baseline pt-2", children: [a.jsx("span", { className: "font-extrabold text-white/60 text-sm", children: "Total" }), a.jsxs($.span, { initial: { scale: 1.08 }, animate: { scale: 1 }, className: "text-xl sm:text-3xl font-black tabular-nums bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent", children: [H.currency_symbol, y.toFixed(2)] }, y)] })] })] }), (x == null ? void 0 : x.is_anonymous) && a.jsxs("div", { className: "p-5 bg-indigo-50/50 dark:bg-indigo-900/10 border-x border-gray-100 dark:border-slate-800 transition-colors", children: [a.jsxs("label", { className: "flex items-start gap-3 cursor-pointer group", children: [a.jsxs("div", { className: "relative flex items-center justify-center mt-0.5", children: [a.jsx("input", { type: "checkbox", checked: we, onChange: (f) => ve(f.target.checked), className: "peer appearance-none w-5 h-5 border-2 border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" }), a.jsx(He, { className: "w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" })] }), a.jsxs("div", { children: [a.jsx("h4", { className: "text-sm font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors", children: "Save my details for next time" }), a.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-0.5", children: "Create a permanent account to track your order and save preferences." })] })] }), a.jsx(qt, { children: we && a.jsxs($.div, { initial: { opacity: 0, height: 0, marginTop: 0 }, animate: { opacity: 1, height: "auto", marginTop: 16 }, exit: { opacity: 0, height: 0, marginTop: 0 }, className: "space-y-3 overflow-hidden", children: [a.jsxs("div", { className: "space-y-1.5", children: [a.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-0.5 flex items-center gap-1", children: [a.jsx(Pr, { className: "w-3 h-3" }), " Email"] }), a.jsx("input", { type: "email", value: Qe, onChange: (f) => Kn(f.target.value), placeholder: "your@email.com", className: "w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium" })] }), a.jsxs("div", { className: "space-y-1.5", children: [a.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-0.5 flex items-center gap-1", children: [a.jsx(xs, { className: "w-3 h-3" }), " Password"] }), a.jsx("input", { type: "password", value: Ze, onChange: (f) => Xn(f.target.value), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium" })] })] }) })] }), a.jsxs("div", { className: "p-4 sm:p-5 bg-card text-card-foreground border border-gray-100 dark:border-slate-800 border-t-0 rounded-b-[1rem] transition-colors", children: [a.jsx($.button, { onClick: rs, disabled: !_t || At || It || Ut, whileTap: { scale: 0.97 }, className: `w-full py-4 rounded-2xl font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 ${_t && !At && !It && !Ut ? `bg-gradient-to-r ${Cr.color} text-white shadow-lg ${Cr.shadow} hover:brightness-110` : "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"}`, children: At || It || Ut ? a.jsxs(a.Fragment, { children: [a.jsx(Ne, { className: "w-4 h-4 animate-spin" }), "Initiating secure payment..."] }) : _t ? a.jsxs(a.Fragment, { children: [a.jsx(gs, { className: "w-4 h-4" }), "Confirm Order"] }) : a.jsxs(a.Fragment, { children: [a.jsx(qe, { className: "w-4 h-4" }), "Fill in all fields"] }) }), a.jsxs("p", { className: "text-center text-[10px] font-medium text-gray-400 mt-3 flex items-center justify-center gap-1", children: [a.jsx(qe, { className: "w-3 h-3" }), "256-bit encrypted \xB7 Secure checkout"] })] })] }) })] })] }), a.jsxs(qt, { children: [xr && et && a.jsx(Ei, { clientSecret: xr, paymentId: et, totalAmount: y, shippingInfo: E, user: x, onClose: async () => {
    if (De) try {
      await ee.rpc("cancel_order_with_inventory", { p_order_id: De }), console.log("Stripe order cancelled on modal close:", De);
    } catch (f) {
      console.error("Failed to cancel order on modal close:", f);
    }
    if (et) try {
      await ee.from("payments").update({ provider_status: "cancelled", completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", et);
    } catch (f) {
      console.error("Failed to mark Stripe payment as cancelled:", f);
    }
    Qn(null), Zn(null), es(null);
  } }), yr && tt && a.jsx(Ni, { sessionData: yr, paymentId: tt, totalAmount: y, shippingInfo: E, user: x, onClose: async () => {
    if (Fe) try {
      await ee.rpc("cancel_order_with_inventory", { p_order_id: Fe }), console.log("Adyen order cancelled on modal close:", Fe);
    } catch (f) {
      console.error("Failed to cancel order on modal close:", f);
    }
    if (tt) try {
      await ee.from("payments").update({ provider_status: "cancelled", completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", tt);
    } catch (f) {
      console.error("Failed to mark Adyen payment as cancelled:", f);
    }
    br(null), wr(null), vr(null);
  } }), rt && (kr || Sr) && a.jsx(Ci, { paymentId: rt, qrCodeData: kr || "", redirectUrl: Sr || "", totalAmount: y, weroPhone: N, weroMode: C, onClose: async () => {
    if (Be) try {
      await ee.rpc("cancel_order_with_inventory", { p_order_id: Be }), console.log("Wero order cancelled on modal close:", Be);
    } catch (f) {
      console.error("Failed to cancel order on modal close:", f);
    }
    if (rt) try {
      await ee.from("payments").update({ provider_status: "cancelled", completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", rt);
    } catch (f) {
      console.error("Failed to mark Wero payment as cancelled:", f);
    }
    Tt(null), Rt(null), Ot(null), Pt(null);
  }, onSuccess: (f) => {
    st.current = true, Tt(null), Rt(null), Ot(null), Pt(null), o(h, "", "", void 0, E.invoiceEmail, "succeeded", f);
  } }), nt && Nr && a.jsx(ji, { paymentId: nt, redirectUrl: Nr, totalAmount: y, onClose: async () => {
    if (Ue) try {
      await ee.rpc("cancel_order_with_inventory", { p_order_id: Ue }), console.log("Digital Euro order cancelled on modal close:", Ue);
    } catch (f) {
      console.error("Failed to cancel Digital Euro order on modal close:", f);
    }
    if (nt) try {
      await ee.from("payments").update({ provider_status: "cancelled", completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", nt);
    } catch (f) {
      console.error("Failed to mark Digital Euro payment as cancelled:", f);
    }
    Dt(null), Ft(null), Bt(null);
  }, onSuccess: (f) => {
    st.current = true, Dt(null), Ft(null), Bt(null), o("digital_euro", "", "", void 0, E.invoiceEmail, "succeeded", f);
  } }), (ne || ye || se) && a.jsx($.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm", children: a.jsx($.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "relative w-full max-w-md overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-center", children: se ? a.jsxs("div", { className: "space-y-4", children: [a.jsx("div", { className: "mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600", children: a.jsx(ze, { className: "w-6 h-6" }) }), a.jsx("h3", { className: "text-lg font-black text-slate-950 dark:text-white uppercase tracking-wider", children: "Transaction Failed" }), a.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-h-40 overflow-y-auto break-words font-mono bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800", children: se }), a.jsx("div", { className: "pt-2", children: a.jsx("button", { onClick: () => he(null), className: "w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider transition-all", children: "Close" }) })] }) : a.jsxs("div", { className: "space-y-5 py-3", children: [a.jsxs("div", { className: "mx-auto relative flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600", children: [a.jsx(Ne, { className: "w-8 h-8 animate-spin text-amber-500" }), a.jsx(Br, { className: "absolute w-4 h-4 text-amber-600" })] }), a.jsxs("div", { children: [a.jsx("h3", { className: "text-base font-black text-slate-950 dark:text-white uppercase tracking-wider", children: ye ? "Confirming Blockchain Payment" : "Preparing Transaction" }), a.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed", children: ye ? "Waiting for the transaction to be mined into a block on Cardano Preproduction blockchain. This typically takes 10 to 20 seconds." : "Please approve and sign the payment request in your connected Lace wallet window." })] }), Y && a.jsxs("div", { className: "p-3 bg-amber-50/50 dark:bg-amber-950/10 rounded-2xl border border-amber-200/50 dark:border-amber-900/30 space-y-1.5", children: [a.jsx("span", { className: "text-[9px] font-black uppercase tracking-wider text-amber-700/80", children: "Transaction Hash" }), a.jsx("p", { className: "text-[10px] font-mono text-slate-800 dark:text-slate-200 select-all truncate", children: Y }), a.jsxs("a", { href: `https://preprod.cardanoscan.io/transaction/${Y}`, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 hover:text-amber-700 transition-colors uppercase tracking-wider mt-1 animate-pulse", children: ["View on Cardanoscan ", a.jsx(rr, { className: "w-3 h-3" })] })] })] }) }) })] })] });
}
function Si({ clientSecret: t2, paymentId: e, totalAmount: r, shippingInfo: n, user: s, onClose: o }) {
  const i = bi(), c = mi(), [d, u] = S.useState(false), [p, m] = S.useState(null), x = { layout: "accordion", fields: { billingDetails: { address: "auto", email: "auto", phone: "auto" } } }, y = (g) => {
    const h = g.replace(/\s+/g, "");
    return h.startsWith("+") ? h : h.startsWith("0") ? `+33${h.slice(1)}` : h;
  }, k = async (g) => {
    if (g.preventDefault(), !i || !c) return;
    u(true), m(null);
    const { error: h } = await i.confirmPayment({ elements: c, confirmParams: { return_url: `${window.location.origin}${window.location.pathname.endsWith("/") ? window.location.pathname : window.location.pathname + "/"}?payment_id=${e}`, payment_method_data: { billing_details: { name: n.name || void 0, email: n.invoiceEmail || (s == null ? void 0 : s.email) || void 0, phone: y(n.phone) || void 0, address: { line1: n.street || void 0, city: n.city || void 0, postal_code: n.zip || void 0, country: n.country || void 0 } } } } });
    if (h) {
      m(h.message || "An unexpected error occurred."), u(false);
      try {
        await ee.from("payments").update({ provider_status: "failed", completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", e);
      } catch (b) {
        console.error("Failed to mark Stripe payment as failed in DB:", b);
      }
    }
  };
  return a.jsxs("form", { onSubmit: k, className: "space-y-4", children: [a.jsx(wi, { options: x }), p && a.jsxs("div", { className: "p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-xl text-xs flex items-start gap-2", children: [a.jsx(ze, { className: "w-4 h-4 shrink-0 mt-0.5" }), a.jsx("span", { children: p })] }), a.jsxs("div", { className: "flex gap-3 pt-2", children: [a.jsx("button", { type: "button", onClick: o, disabled: d, className: "flex-1 py-3 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-extrabold uppercase tracking-wider transition-colors disabled:opacity-50", children: "Cancel" }), a.jsx("button", { type: "submit", disabled: !i || d, className: "flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50", children: d ? a.jsxs(a.Fragment, { children: [a.jsx(Ne, { className: "w-4 h-4 animate-spin" }), "Processing..."] }) : a.jsxs(a.Fragment, { children: [a.jsx(qe, { className: "w-4 h-4" }), "Pay Now"] }) })] })] });
}
function Ei({ clientSecret: t2, paymentId: e, totalAmount: r, shippingInfo: n, user: s, onClose: o }) {
  const i = document.documentElement.classList.contains("dark"), c = (u) => {
    const p = u.replace(/\s+/g, "");
    return p.startsWith("+") ? p : p.startsWith("0") ? `+33${p.slice(1)}` : p;
  }, d = { clientSecret: t2, appearance: { theme: i ? "night" : "stripe", variables: { colorPrimary: "#4f46e5" } }, defaultValues: { billingDetails: { name: n.name || void 0, email: n.invoiceEmail || (s == null ? void 0 : s.email) || void 0, phone: c(n.phone) || void 0, address: { line1: n.street || void 0, city: n.city || void 0, postalCode: n.zip || void 0, country: n.country || void 0 } } } };
  return a.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto", children: a.jsxs($.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsxs("div", { className: "flex items-center gap-2.5", children: [a.jsx("div", { className: "p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl", children: a.jsx(We, { className: "w-5 h-5" }) }), a.jsxs("div", { children: [a.jsx("h3", { className: "text-base font-extrabold text-gray-900 dark:text-white", children: "Secure Checkout" }), a.jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: "Provide payment details to complete purchase" })] })] }), a.jsx("button", { onClick: o, className: "p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors", children: a.jsx(wt, { className: "w-5 h-5" }) })] }), a.jsx(Wn, { stripe: ki, options: d, children: a.jsx(Si, { clientSecret: t2, paymentId: e, totalAmount: r, shippingInfo: n, user: s, onClose: o }) })] }) });
}
function Ni({ sessionData: t2, paymentId: e, totalAmount: r, shippingInfo: n, user: s, onClose: o }) {
  const [i, c] = S.useState("card"), [d, u] = S.useState(""), [p, m] = S.useState(""), [x, y] = S.useState(""), [k, g] = S.useState(n.name || ""), [h, b] = S.useState(false), [C, _] = S.useState(null), N = (O) => {
    if (O.preventDefault(), i === "card") {
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
    _(null), b(true), setTimeout(() => {
      const D = `${window.location.origin}${window.location.pathname.endsWith("/") ? window.location.pathname : window.location.pathname + "/"}?payment_id=${e}`;
      window.location.href = D;
    }, 2e3);
  };
  return a.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto", children: a.jsxs($.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsxs("div", { className: "flex items-center gap-2.5", children: [a.jsx("div", { className: "p-2 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-xl animate-pulse", children: a.jsx(Ht, { className: "w-5 h-5" }) }), a.jsxs("div", { children: [a.jsxs("h3", { className: "text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2", children: ["Adyen Checkout ", a.jsx("span", { className: "text-[10px] px-1.5 py-0.5 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 rounded font-black tracking-wider uppercase", children: "Sandbox" })] }), a.jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: "Fast and secure global payments" })] })] }), a.jsx("button", { onClick: o, className: "p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors", children: a.jsx(wt, { className: "w-5 h-5" }) })] }), a.jsxs("div", { className: "flex gap-2 p-1 bg-gray-50 dark:bg-slate-800/40 rounded-xl border border-gray-100 dark:border-slate-800", children: [a.jsx("button", { type: "button", onClick: () => c("card"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${i === "card" ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black" : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: "Credit Card" }), a.jsx("button", { type: "button", onClick: () => c("sofort"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${i === "sofort" ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black" : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: "Sofort" }), a.jsx("button", { type: "button", onClick: () => c("ideal"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${i === "ideal" ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black" : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: "iDEAL" })] }), a.jsxs("form", { onSubmit: N, className: "space-y-4", children: [i === "card" && a.jsxs("div", { className: "space-y-3.5", children: [a.jsxs("div", { children: [a.jsx("label", { className: "block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1", children: "Card Number" }), a.jsxs("div", { className: "relative", children: [a.jsx("input", { type: "text", placeholder: "4111 1111 1111 1111", maxLength: 19, value: d, onChange: (O) => {
    const D = O.target.value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim();
    u(D);
  }, className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none", required: true }), a.jsx(We, { className: "absolute right-3.5 top-3 w-4 h-4 text-gray-400" })] })] }), a.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [a.jsxs("div", { children: [a.jsx("label", { className: "block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1", children: "Expiry Date" }), a.jsx("input", { type: "text", placeholder: "MM/YY", maxLength: 5, value: p, onChange: (O) => {
    const D = O.target.value.replace(/\D/g, "");
    D.length >= 2 ? m(`${D.slice(0, 2)}/${D.slice(2, 4)}`) : m(D);
  }, className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none", required: true })] }), a.jsxs("div", { children: [a.jsx("label", { className: "block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1", children: "Security Code (CVV)" }), a.jsx("input", { type: "password", placeholder: "123", maxLength: 4, value: x, onChange: (O) => y(O.target.value.replace(/\D/g, "")), className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none", required: true })] })] }), a.jsxs("div", { children: [a.jsx("label", { className: "block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1", children: "Cardholder Name" }), a.jsx("input", { type: "text", placeholder: "John Doe", value: k, onChange: (O) => g(O.target.value), className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none", required: true })] })] }), i === "sofort" && a.jsxs("div", { className: "p-5 text-center bg-gray-50 dark:bg-slate-800/20 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl space-y-2", children: [a.jsx(Ht, { className: "w-8 h-8 text-indigo-500 mx-auto animate-bounce" }), a.jsx("h4", { className: "text-xs font-extrabold text-gray-800 dark:text-white", children: "Redirecting to Sofort Banking" }), a.jsx("p", { className: "text-[10px] text-gray-400 dark:text-gray-500", children: "You will be securely redirected to complete payment with your bank account." })] }), i === "ideal" && a.jsxs("div", { className: "p-5 text-center bg-gray-50 dark:bg-slate-800/20 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl space-y-2", children: [a.jsx(Ht, { className: "w-8 h-8 text-emerald-500 mx-auto animate-bounce" }), a.jsx("h4", { className: "text-xs font-extrabold text-gray-800 dark:text-white", children: "Redirecting to iDEAL Sandbox" }), a.jsx("p", { className: "text-[10px] text-gray-400 dark:text-gray-500", children: "You will be securely redirected to select your Dutch bank and authorize payment." })] }), C && a.jsxs("div", { className: "p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 rounded-xl text-xs flex items-start gap-2", children: [a.jsx(ze, { className: "w-4 h-4 shrink-0 mt-0.5" }), a.jsx("span", { children: C })] }), a.jsxs("div", { className: "flex gap-3 pt-2", children: [a.jsx("button", { type: "button", onClick: o, disabled: h, className: "flex-1 py-3 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-extrabold uppercase tracking-wider transition-colors disabled:opacity-50", children: "Cancel" }), a.jsx("button", { type: "submit", disabled: h, className: "flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50", children: h ? a.jsxs(a.Fragment, { children: [a.jsx(Ne, { className: "w-4 h-4 animate-spin" }), "Processing..."] }) : a.jsxs(a.Fragment, { children: [a.jsx(qe, { className: "w-4 h-4" }), "Pay ", H.currencySymbol, r.toFixed(2)] }) })] })] })] }) });
}
function ji({ paymentId: t2, redirectUrl: e, totalAmount: r, onClose: n, onSuccess: s }) {
  const [o, i] = S.useState(false), [c, d] = S.useState(null), u = async (p) => {
    i(true), d(null);
    try {
      const { data: m, error: x } = await ee.functions.invoke("digital-euro-checkout", { body: { action: "confirm", payment_id: t2, status: p } });
      if (x) throw new Error(x.message || "Failed to confirm Digital Euro payment.");
      (m == null ? void 0 : m.status) === "succeeded" ? s(m.order_id) : (d(`Payment simulation completed with status: ${(m == null ? void 0 : m.status) || p}`), i(false), setTimeout(() => {
        n();
      }, 1500));
    } catch (m) {
      console.error("Digital Euro simulation error:", m), d(m.message || "Simulation request failed."), i(false);
    }
  };
  return a.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto", children: a.jsxs($.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsxs("div", { className: "flex items-center gap-2.5", children: [a.jsx("div", { className: "p-2 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-xl", children: a.jsx(gt, { className: "w-5 h-5" }) }), a.jsxs("div", { children: [a.jsxs("h3", { className: "text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2", children: ["Digital Euro ", a.jsx("span", { className: "text-[10px] px-1.5 py-0.5 bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 rounded font-black tracking-wider uppercase", children: "Sandbox" })] }), a.jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: "Simulated PSP authorization" })] })] }), a.jsx("button", { onClick: () => u("cancelled"), disabled: o, className: "p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors disabled:opacity-50", children: a.jsx(wt, { className: "w-5 h-5" }) })] }), a.jsxs("div", { className: "p-5 text-center bg-cyan-50/60 dark:bg-cyan-950/10 border border-dashed border-cyan-200 dark:border-cyan-900/50 rounded-2xl space-y-3", children: [a.jsx(gt, { className: "w-10 h-10 text-cyan-600 mx-auto" }), a.jsxs("div", { children: [a.jsx("h4", { className: "text-xs font-black text-gray-800 dark:text-white uppercase tracking-wider", children: "Awaiting Digital Euro Authorization" }), a.jsxs("p", { className: "text-[10px] text-gray-500 dark:text-gray-400 mt-1", children: ["A sandbox payment request for ", a.jsxs("span", { className: "font-extrabold text-cyan-700 dark:text-cyan-300", children: [H.currencySymbol, r.toFixed(2)] }), " is ready for simulated customer approval."] })] }), a.jsx("p", { className: "text-[10px] font-mono text-cyan-700 dark:text-cyan-300 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-cyan-100 dark:border-cyan-900/50 break-all select-all", children: e })] }), c && a.jsx("div", { className: "p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl text-xs font-bold text-amber-700 dark:text-amber-300 text-center", children: c }), a.jsxs("div", { className: "space-y-2", children: [a.jsxs("button", { onClick: () => u("succeeded"), disabled: o, className: "w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all disabled:opacity-60 flex items-center justify-center gap-2", children: [o ? a.jsx(Ne, { className: "w-4 h-4 animate-spin" }) : a.jsx(He, { className: "w-4 h-4" }), "Simulate Approval"] }), a.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [a.jsx("button", { onClick: () => u("failed"), disabled: o, className: "py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-300 text-[10px] font-black uppercase tracking-wider hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors disabled:opacity-50", children: "Simulate Failure" }), a.jsx("button", { onClick: () => u("cancelled"), disabled: o, className: "py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-300 text-[10px] font-black uppercase tracking-wider hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50", children: "Cancel" })] })] })] }) });
}
function Ci({ paymentId: t2, qrCodeData: e, redirectUrl: r, totalAmount: n, weroPhone: s, weroMode: o, onClose: i, onSuccess: c }) {
  const [d, u] = S.useState(false), [p, m] = S.useState(null), x = async (k) => {
    u(true), m(null);
    try {
      const { data: g, error: h } = await ee.functions.invoke("wero-checkout", { body: { action: "confirm", payment_id: t2, status: k } });
      if (h) throw new Error(h.message || "Failed to confirm Wero payment.");
      (g == null ? void 0 : g.status) === "succeeded" ? c(g.order_id) : (m(`Payment simulation completed with status: ${(g == null ? void 0 : g.status) || k}`), u(false), (k === "cancelled" || k === "failed") && setTimeout(() => {
        i();
      }, 1500));
    } catch (g) {
      console.error("Wero simulation error:", g), m(g.message || "Simulation request failed."), u(false);
    }
  }, y = r && r.includes("worldline-solutions.com");
  return a.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto", children: a.jsxs($.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6", children: [a.jsxs("div", { className: "flex items-center justify-between", children: [a.jsxs("div", { className: "flex items-center gap-2.5", children: [a.jsx("div", { className: "p-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl animate-pulse", children: a.jsx(Je, { className: "w-5 h-5" }) }), a.jsxs("div", { children: [a.jsxs("h3", { className: "text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2", children: ["Wero Transfer ", a.jsx("span", { className: "text-[10px] px-1.5 py-0.5 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded font-black tracking-wider uppercase", children: y ? "Preprod" : "Sandbox" })] }), a.jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: "Fast and secure account-to-account transfer" })] })] }), a.jsx("button", { onClick: () => x("cancelled"), disabled: d, className: "p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors disabled:opacity-50", children: a.jsx(wt, { className: "w-5 h-5" }) })] }), o === "phone" ? a.jsxs("div", { className: "p-5 text-center bg-purple-50/50 dark:bg-purple-950/10 border border-dashed border-purple-200 dark:border-purple-900/50 rounded-2xl space-y-3", children: [a.jsx(Je, { className: "w-10 h-10 text-purple-500 mx-auto animate-bounce" }), a.jsxs("div", { children: [a.jsx("h4", { className: "text-xs font-black text-gray-800 dark:text-white uppercase tracking-wider", children: "Pending Bank Authorization" }), a.jsxs("p", { className: "text-[10px] text-gray-500 dark:text-gray-400 mt-1", children: ["A transfer request for ", a.jsxs("span", { className: "font-extrabold text-purple-600 dark:text-purple-400", children: [H.currencySymbol, n.toFixed(2)] }), " has been sent to your Wero phone:"] }), a.jsx("p", { className: "text-sm font-mono font-bold text-purple-700 dark:text-purple-300 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-purple-100 dark:border-purple-900/50 inline-block mt-2 select-all", children: s })] }), y && a.jsx("div", { className: "pt-2", children: a.jsxs("a", { href: r, target: "_blank", rel: "noopener noreferrer", className: "w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-750 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all shadow-md hover:shadow-purple-500/25 flex items-center justify-center gap-1.5 group", children: [a.jsx("span", { children: "Proceed to Payment" }), a.jsx(rr, { className: "w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })] }) }), a.jsx("p", { className: "text-[10px] text-gray-400 dark:text-gray-500 italic pt-1", children: "Please open your participating banking app to authorize the instant transfer request." })] }) : a.jsxs("div", { className: "p-5 text-center bg-purple-50/50 dark:bg-purple-950/10 border border-dashed border-purple-200 dark:border-purple-900/50 rounded-2xl flex flex-col items-center gap-3", children: [a.jsx("div", { className: "p-4 bg-white rounded-2xl shadow-md border border-purple-100", children: a.jsx(fn, { className: "w-40 h-40 text-purple-900" }) }), a.jsxs("div", { children: [a.jsx("h4", { className: "text-xs font-black text-gray-800 dark:text-white uppercase tracking-wider", children: "Scan to Pay" }), a.jsxs("p", { className: "text-[10px] text-gray-500 dark:text-gray-400 mt-1", children: ["Scan this QR code with your banking app to instantly authorize a payment of ", a.jsxs("span", { className: "font-extrabold text-purple-600 dark:text-purple-400", children: [H.currencySymbol, n.toFixed(2)] }), "."] })] }), y && a.jsxs("a", { href: r, target: "_blank", rel: "noopener noreferrer", className: "w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-750 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all shadow-md hover:shadow-purple-500/25 flex items-center justify-center gap-1.5 group", children: [a.jsx("span", { children: "Proceed to Payment" }), a.jsx(rr, { className: "w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })] })] }), p && a.jsxs("div", { className: "p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 rounded-xl text-xs flex items-start gap-2", children: [a.jsx(ze, { className: "w-4 h-4 shrink-0 mt-0.5" }), a.jsx("span", { children: p })] }), a.jsxs("div", { className: "space-y-2.5", children: [a.jsx("p", { className: "text-[9px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest text-center", children: y ? "Verification & Control" : "Testing / Sandbox Controls" }), a.jsxs("div", { className: "grid grid-cols-2 gap-2.5", children: [a.jsx("button", { onClick: () => x("succeeded"), disabled: d, className: `py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50 ${y ? "bg-purple-600 hover:bg-purple-700 text-white hover:shadow-purple-500/20" : "bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-emerald-500/20"}`, children: d ? a.jsx(Ne, { className: "w-3.5 h-3.5 animate-spin" }) : a.jsxs(a.Fragment, { children: [a.jsx(He, { className: "w-3.5 h-3.5" }), y ? "Verify Payment" : "Simulate Success"] }) }), a.jsx("button", { onClick: () => x("failed"), disabled: d, className: "py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-rose-500/20 flex items-center justify-center gap-1.5 disabled:opacity-50", children: d ? a.jsx(Ne, { className: "w-3.5 h-3.5 animate-spin" }) : a.jsxs(a.Fragment, { children: [a.jsx(ze, { className: "w-3.5 h-3.5" }), y ? "Check Failure" : "Simulate Failure"] }) })] }), a.jsx("button", { onClick: () => x("cancelled"), disabled: d, className: "w-full py-2.5 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors disabled:opacity-50", children: "Cancel Payment Request" })] })] }) });
}
export {
  rc as Checkout
};
