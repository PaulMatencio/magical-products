var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { c as zt, a2 as hr, a3 as Ft, a4 as Ze, a5 as Ln, R as F, b as $n, l as Mn, r as E, a as se, j as o, a6 as Le, f as qn, m as z, h as Hn, U as zn, J as Vn, Q as fr, A as St, a7 as Wn, L as Ae, k as Jn, v as we, y as $e, E as Bt, i as Kn, X as Vt, G as Et } from "./index-ts5D_OUl.js";
import { r as Xn, D as mr, f as Me, S as ot, c as Gn, t as Yn, n as Qn, a as Zn, b as es, d as ts, e as rs, g as ns, h as Nt, i as ss, j as as, P as xr, k as os, l as is, m as cs, o as ls, p as ds, q as Jr, Q as Kr, B as jt, T as us } from "./index-COwnIC_h.js";
import { A as ps } from "./arrow-left-DKlWvZqa.js";
import { H as hs } from "./hash-CAKY49D0.js";
import { C as et } from "./circle-check-CivjhFxm.js";
import { C as qe } from "./credit-card-BCiyUUxK.js";
import { S as fs } from "./shopping-cart-BmtWh3rL.js";
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ms = [["circle", { cx: "8", cy: "8", r: "6", key: "3yglwk" }], ["path", { d: "M18.09 10.37A6 6 0 1 1 10.34 18", key: "t5s6rm" }], ["path", { d: "M7 6h1v4", key: "1obek4" }], ["path", { d: "m16.71 13.88.7.71-2.82 2.82", key: "1rbuyh" }]], gr = zt("coins", ms);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const xs = [["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }], ["path", { d: "M12 18h.01", key: "mhygvu" }]], He = zt("smartphone", xs);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const gs = [["path", { d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1", key: "18etb6" }], ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]], yr = zt("wallet", gs);
function Xr(t2, e) {
  return function() {
    return t2.apply(e, arguments);
  };
}
const { toString: ys } = Object.prototype, { getPrototypeOf: ct } = Object, { iterator: lt, toStringTag: Gr } = Symbol, dt = /* @__PURE__ */ ((t2) => (e) => {
  const r = ys.call(e);
  return t2[r] || (t2[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), pe = (t2) => (t2 = t2.toLowerCase(), (e) => dt(e) === t2), ut = (t2) => (e) => typeof e === t2, { isArray: Se } = Array, Re = ut("undefined");
function Te(t2) {
  return t2 !== null && !Re(t2) && t2.constructor !== null && !Re(t2.constructor) && ae(t2.constructor.isBuffer) && t2.constructor.isBuffer(t2);
}
const Yr = pe("ArrayBuffer");
function bs(t2) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t2) : e = t2 && t2.buffer && Yr(t2.buffer), e;
}
const ws = ut("string"), ae = ut("function"), Qr = ut("number"), ze = (t2) => t2 !== null && typeof t2 == "object", vs = (t2) => t2 === true || t2 === false, tt = (t2) => {
  if (dt(t2) !== "object") return false;
  const e = ct(t2);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Gr in t2) && !(lt in t2);
}, ks = (t2) => {
  if (!ze(t2) || Te(t2)) return false;
  try {
    return Object.keys(t2).length === 0 && Object.getPrototypeOf(t2) === Object.prototype;
  } catch {
    return false;
  }
}, Ss = pe("Date"), Es = pe("File"), Ns = (t2) => !!(t2 && typeof t2.uri < "u"), js = (t2) => t2 && typeof t2.getParts < "u", Cs = pe("Blob"), _s = pe("FileList"), As = (t2) => ze(t2) && ae(t2.pipe);
function Rs() {
  return typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof Ft < "u" ? Ft : {};
}
const br = Rs(), wr = typeof br.FormData < "u" ? br.FormData : void 0, Os = (t2) => {
  if (!t2) return false;
  if (wr && t2 instanceof wr) return true;
  const e = ct(t2);
  if (!e || e === Object.prototype || !ae(t2.append)) return false;
  const r = dt(t2);
  return r === "formdata" || r === "object" && ae(t2.toString) && t2.toString() === "[object FormData]";
}, Ts = pe("URLSearchParams"), [Ps, Is, Fs, Bs] = ["ReadableStream", "Request", "Response", "Headers"].map(pe), Ds = (t2) => t2.trim ? t2.trim() : t2.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Ve(t2, e, { allOwnKeys: r = false } = {}) {
  if (t2 === null || typeof t2 > "u") return;
  let n, s;
  if (typeof t2 != "object" && (t2 = [t2]), Se(t2)) for (n = 0, s = t2.length; n < s; n++) e.call(null, t2[n], n, t2);
  else {
    if (Te(t2)) return;
    const a = r ? Object.getOwnPropertyNames(t2) : Object.keys(t2), i = a.length;
    let c;
    for (n = 0; n < i; n++) c = a[n], e.call(null, t2[c], c, t2);
  }
}
function Zr(t2, e) {
  if (Te(t2)) return null;
  e = e.toLowerCase();
  const r = Object.keys(t2);
  let n = r.length, s;
  for (; n-- > 0; ) if (s = r[n], e === s.toLowerCase()) return s;
  return null;
}
const ve = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : Ft, en = (t2) => !Re(t2) && t2 !== ve;
function Dt(...t2) {
  const { caseless: e, skipUndefined: r } = en(this) && this || {}, n = {}, s = (a, i) => {
    if (i === "__proto__" || i === "constructor" || i === "prototype") return;
    const c = e && typeof i == "string" && Zr(n, i) || i, u = Ut(n, c) ? n[c] : void 0;
    tt(u) && tt(a) ? n[c] = Dt(u, a) : tt(a) ? n[c] = Dt({}, a) : Se(a) ? n[c] = a.slice() : (!r || !Re(a)) && (n[c] = a);
  };
  for (let a = 0, i = t2.length; a < i; a++) {
    const c = t2[a];
    if (!c || Te(c) || (Ve(c, s), typeof c != "object" || Se(c))) continue;
    const u = Object.getOwnPropertySymbols(c);
    for (let l = 0; l < u.length; l++) {
      const p = u[l];
      Xs.call(c, p) && s(c[p], p);
    }
  }
  return n;
}
const Us = (t2, e, r, { allOwnKeys: n } = {}) => (Ve(e, (s, a) => {
  r && ae(s) ? Object.defineProperty(t2, a, { __proto__: null, value: Xr(s, r), writable: true, enumerable: true, configurable: true }) : Object.defineProperty(t2, a, { __proto__: null, value: s, writable: true, enumerable: true, configurable: true });
}, { allOwnKeys: n }), t2), Ls = (t2) => (t2.charCodeAt(0) === 65279 && (t2 = t2.slice(1)), t2), $s = (t2, e, r, n) => {
  t2.prototype = Object.create(e.prototype, n), Object.defineProperty(t2.prototype, "constructor", { __proto__: null, value: t2, writable: true, enumerable: false, configurable: true }), Object.defineProperty(t2, "super", { __proto__: null, value: e.prototype }), r && Object.assign(t2.prototype, r);
}, Ms = (t2, e, r, n) => {
  let s, a, i;
  const c = {};
  if (e = e || {}, t2 == null) return e;
  do {
    for (s = Object.getOwnPropertyNames(t2), a = s.length; a-- > 0; ) i = s[a], (!n || n(i, t2, e)) && !c[i] && (e[i] = t2[i], c[i] = true);
    t2 = r !== false && ct(t2);
  } while (t2 && (!r || r(t2, e)) && t2 !== Object.prototype);
  return e;
}, qs = (t2, e, r) => {
  t2 = String(t2), (r === void 0 || r > t2.length) && (r = t2.length), r -= e.length;
  const n = t2.indexOf(e, r);
  return n !== -1 && n === r;
}, Hs = (t2) => {
  if (!t2) return null;
  if (Se(t2)) return t2;
  let e = t2.length;
  if (!Qr(e)) return null;
  const r = new Array(e);
  for (; e-- > 0; ) r[e] = t2[e];
  return r;
}, zs = /* @__PURE__ */ ((t2) => (e) => t2 && e instanceof t2)(typeof Uint8Array < "u" && ct(Uint8Array)), Vs = (t2, e) => {
  const n = (t2 && t2[lt]).call(t2);
  let s;
  for (; (s = n.next()) && !s.done; ) {
    const a = s.value;
    e.call(t2, a[0], a[1]);
  }
}, Ws = (t2, e) => {
  let r;
  const n = [];
  for (; (r = t2.exec(e)) !== null; ) n.push(r);
  return n;
}, Js = pe("HTMLFormElement"), Ks = (t2) => t2.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(r, n, s) {
  return n.toUpperCase() + s;
}), Ut = (({ hasOwnProperty: t2 }) => (e, r) => t2.call(e, r))(Object.prototype), { propertyIsEnumerable: Xs } = Object.prototype, Gs = pe("RegExp"), tn = (t2, e) => {
  const r = Object.getOwnPropertyDescriptors(t2), n = {};
  Ve(r, (s, a) => {
    let i;
    (i = e(s, a, t2)) !== false && (n[a] = i || s);
  }), Object.defineProperties(t2, n);
}, Ys = (t2) => {
  tn(t2, (e, r) => {
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
}, Qs = (t2, e) => {
  const r = {}, n = (s) => {
    s.forEach((a) => {
      r[a] = true;
    });
  };
  return Se(t2) ? n(t2) : n(String(t2).split(e)), r;
}, Zs = () => {
}, ea = (t2, e) => t2 != null && Number.isFinite(t2 = +t2) ? t2 : e;
function ta(t2) {
  return !!(t2 && ae(t2.append) && t2[Gr] === "FormData" && t2[lt]);
}
const ra = (t2) => {
  const e = /* @__PURE__ */ new WeakSet(), r = (n) => {
    if (ze(n)) {
      if (e.has(n)) return;
      if (Te(n)) return n;
      if (!("toJSON" in n)) {
        e.add(n);
        const s = Se(n) ? [] : {};
        return Ve(n, (a, i) => {
          const c = r(a);
          !Re(c) && (s[i] = c);
        }), e.delete(n), s;
      }
    }
    return n;
  };
  return r(t2);
}, na = pe("AsyncFunction"), sa = (t2) => t2 && (ze(t2) || ae(t2)) && ae(t2.then) && ae(t2.catch), rn = ((t2, e) => t2 ? setImmediate : e ? ((r, n) => (ve.addEventListener("message", ({ source: s, data: a }) => {
  s === ve && a === r && n.length && n.shift()();
}, false), (s) => {
  n.push(s), ve.postMessage(r, "*");
}))(`axios@${Math.random()}`, []) : (r) => setTimeout(r))(typeof setImmediate == "function", ae(ve.postMessage)), aa = typeof queueMicrotask < "u" ? queueMicrotask.bind(ve) : typeof hr < "u" && hr.nextTick || rn, oa = (t2) => t2 != null && ae(t2[lt]), d = { isArray: Se, isArrayBuffer: Yr, isBuffer: Te, isFormData: Os, isArrayBufferView: bs, isString: ws, isNumber: Qr, isBoolean: vs, isObject: ze, isPlainObject: tt, isEmptyObject: ks, isReadableStream: Ps, isRequest: Is, isResponse: Fs, isHeaders: Bs, isUndefined: Re, isDate: Ss, isFile: Es, isReactNativeBlob: Ns, isReactNative: js, isBlob: Cs, isRegExp: Gs, isFunction: ae, isStream: As, isURLSearchParams: Ts, isTypedArray: zs, isFileList: _s, forEach: Ve, merge: Dt, extend: Us, trim: Ds, stripBOM: Ls, inherits: $s, toFlatObject: Ms, kindOf: dt, kindOfTest: pe, endsWith: qs, toArray: Hs, forEachEntry: Vs, matchAll: Ws, isHTMLForm: Js, hasOwnProperty: Ut, hasOwnProp: Ut, reduceDescriptors: tn, freezeMethods: Ys, toObjectSet: Qs, toCamelCase: Ks, noop: Zs, toFiniteNumber: ea, findKey: Zr, global: ve, isContextDefined: en, isSpecCompliantForm: ta, toJSONObject: ra, isAsyncFn: na, isThenable: sa, setImmediate: rn, asap: aa, isIterable: oa }, ia = d.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]), ca = (t2) => {
  const e = {};
  let r, n, s;
  return t2 && t2.split(`
`).forEach(function(i) {
    s = i.indexOf(":"), r = i.substring(0, s).trim().toLowerCase(), n = i.substring(s + 1).trim(), !(!r || e[r] && ia[r]) && (r === "set-cookie" ? e[r] ? e[r].push(n) : e[r] = [n] : e[r] = e[r] ? e[r] + ", " + n : n);
  }), e;
};
function la(t2) {
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
const da = new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+", "g"), ua = new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+", "g");
function Wt(t2, e) {
  return d.isArray(t2) ? t2.map((r) => Wt(r, e)) : la(String(t2).replace(e, ""));
}
const pa = (t2) => Wt(t2, da), ha = (t2) => Wt(t2, ua);
function nn(t2) {
  const e = /* @__PURE__ */ Object.create(null);
  return d.forEach(t2.toJSON(), (r, n) => {
    e[n] = ha(r);
  }), e;
}
const vr = Symbol("internals");
function Be(t2) {
  return t2 && String(t2).trim().toLowerCase();
}
function rt(t2) {
  return t2 === false || t2 == null ? t2 : d.isArray(t2) ? t2.map(rt) : pa(String(t2));
}
function fa(t2) {
  const e = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = r.exec(t2); ) e[n[1]] = n[2];
  return e;
}
const ma = (t2) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t2.trim());
function Ct(t2, e, r, n, s) {
  if (d.isFunction(n)) return n.call(this, e, r);
  if (s && (e = r), !!d.isString(e)) {
    if (d.isString(n)) return e.indexOf(n) !== -1;
    if (d.isRegExp(n)) return n.test(e);
  }
}
function xa(t2) {
  return t2.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, r, n) => r.toUpperCase() + n);
}
function ga(t2, e) {
  const r = d.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(t2, n + r, { __proto__: null, value: function(s, a, i) {
      return this[n].call(this, e, s, a, i);
    }, configurable: true });
  });
}
let te = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, r, n) {
    const s = this;
    function a(c, u, l) {
      const p = Be(u);
      if (!p) return;
      const m = d.findKey(s, p);
      (!m || s[m] === void 0 || l === true || l === void 0 && s[m] !== false) && (s[m || u] = rt(c));
    }
    const i = (c, u) => d.forEach(c, (l, p) => a(l, p, u));
    if (d.isPlainObject(e) || e instanceof this.constructor) i(e, r);
    else if (d.isString(e) && (e = e.trim()) && !ma(e)) i(ca(e), r);
    else if (d.isObject(e) && d.isIterable(e)) {
      let c = {}, u, l;
      for (const p of e) {
        if (!d.isArray(p)) throw new TypeError("Object iterator must return a key-value pair");
        c[l = p[0]] = (u = c[l]) ? d.isArray(u) ? [...u, p[1]] : [u, p[1]] : p[1];
      }
      i(c, r);
    } else e != null && a(r, e, n);
    return this;
  }
  get(e, r) {
    if (e = Be(e), e) {
      const n = d.findKey(this, e);
      if (n) {
        const s = this[n];
        if (!r) return s;
        if (r === true) return fa(s);
        if (d.isFunction(r)) return r.call(this, s, n);
        if (d.isRegExp(r)) return r.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, r) {
    if (e = Be(e), e) {
      const n = d.findKey(this, e);
      return !!(n && this[n] !== void 0 && (!r || Ct(this, this[n], n, r)));
    }
    return false;
  }
  delete(e, r) {
    const n = this;
    let s = false;
    function a(i) {
      if (i = Be(i), i) {
        const c = d.findKey(n, i);
        c && (!r || Ct(n, n[c], c, r)) && (delete n[c], s = true);
      }
    }
    return d.isArray(e) ? e.forEach(a) : a(e), s;
  }
  clear(e) {
    const r = Object.keys(this);
    let n = r.length, s = false;
    for (; n--; ) {
      const a = r[n];
      (!e || Ct(this, this[a], a, e, true)) && (delete this[a], s = true);
    }
    return s;
  }
  normalize(e) {
    const r = this, n = {};
    return d.forEach(this, (s, a) => {
      const i = d.findKey(n, a);
      if (i) {
        r[i] = rt(s), delete r[a];
        return;
      }
      const c = e ? xa(a) : String(a).trim();
      c !== a && delete r[a], r[c] = rt(s), n[c] = true;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const r = /* @__PURE__ */ Object.create(null);
    return d.forEach(this, (n, s) => {
      n != null && n !== false && (r[s] = e && d.isArray(n) ? n.join(", ") : n);
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
    const n = (this[vr] = this[vr] = { accessors: {} }).accessors, s = this.prototype;
    function a(i) {
      const c = Be(i);
      n[c] || (ga(s, i), n[c] = true);
    }
    return d.isArray(e) ? e.forEach(a) : a(e), this;
  }
};
te.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
d.reduceDescriptors(te.prototype, ({ value: t2 }, e) => {
  let r = e[0].toUpperCase() + e.slice(1);
  return { get: () => t2, set(n) {
    this[r] = n;
  } };
});
d.freezeMethods(te);
const ya = "[REDACTED ****]";
function ba(t2) {
  if (d.hasOwnProp(t2, "toJSON")) return true;
  let e = Object.getPrototypeOf(t2);
  for (; e && e !== Object.prototype; ) {
    if (d.hasOwnProp(e, "toJSON")) return true;
    e = Object.getPrototypeOf(e);
  }
  return false;
}
function wa(t2, e) {
  const r = new Set(e.map((a) => String(a).toLowerCase())), n = [], s = (a) => {
    if (a === null || typeof a != "object" || d.isBuffer(a)) return a;
    if (n.indexOf(a) !== -1) return;
    a instanceof te && (a = a.toJSON()), n.push(a);
    let i;
    if (d.isArray(a)) i = [], a.forEach((c, u) => {
      const l = s(c);
      d.isUndefined(l) || (i[u] = l);
    });
    else {
      if (!d.isPlainObject(a) && ba(a)) return n.pop(), a;
      i = /* @__PURE__ */ Object.create(null);
      for (const [c, u] of Object.entries(a)) {
        const l = r.has(c.toLowerCase()) ? ya : s(u);
        d.isUndefined(l) || (i[c] = l);
      }
    }
    return n.pop(), i;
  };
  return s(t2);
}
let v = class sn extends Error {
  static from(e, r, n, s, a, i) {
    const c = new sn(e.message, r || e.code, n, s, a);
    return c.cause = e, c.name = e.name, e.status != null && c.status == null && (c.status = e.status), i && Object.assign(c, i), c;
  }
  constructor(e, r, n, s, a) {
    super(e), Object.defineProperty(this, "message", { __proto__: null, value: e, enumerable: true, writable: true, configurable: true }), this.name = "AxiosError", this.isAxiosError = true, r && (this.code = r), n && (this.config = n), s && (this.request = s), a && (this.response = a, this.status = a.status);
  }
  toJSON() {
    const e = this.config, r = e && d.hasOwnProp(e, "redact") ? e.redact : void 0, n = d.isArray(r) && r.length > 0 ? wa(e, r) : d.toJSONObject(e);
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
const va = null;
function Lt(t2) {
  return d.isPlainObject(t2) || d.isArray(t2);
}
function an(t2) {
  return d.endsWith(t2, "[]") ? t2.slice(0, -2) : t2;
}
function _t(t2, e, r) {
  return t2 ? t2.concat(e).map(function(s, a) {
    return s = an(s), !r && a ? "[" + s + "]" : s;
  }).join(r ? "." : "") : e;
}
function ka(t2) {
  return d.isArray(t2) && !t2.some(Lt);
}
const Sa = d.toFlatObject(d, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function pt(t2, e, r) {
  if (!d.isObject(t2)) throw new TypeError("target must be an object");
  e = e || new FormData(), r = d.toFlatObject(r, { metaTokens: true, dots: false, indexes: false }, false, function(h, y) {
    return !d.isUndefined(y[h]);
  });
  const n = r.metaTokens, s = r.visitor || m, a = r.dots, i = r.indexes, c = r.Blob || typeof Blob < "u" && Blob, u = r.maxDepth === void 0 ? 100 : r.maxDepth, l = c && d.isSpecCompliantForm(e);
  if (!d.isFunction(s)) throw new TypeError("visitor must be a function");
  function p(x) {
    if (x === null) return "";
    if (d.isDate(x)) return x.toISOString();
    if (d.isBoolean(x)) return x.toString();
    if (!l && d.isBlob(x)) throw new v("Blob is not supported. Use a Buffer instead.");
    return d.isArrayBuffer(x) || d.isTypedArray(x) ? l && typeof Blob == "function" ? new Blob([x]) : Ze.from(x) : x;
  }
  function m(x, h, y) {
    let A = x;
    if (d.isReactNative(e) && d.isReactNativeBlob(x)) return e.append(_t(y, h, a), p(x)), false;
    if (x && !y && typeof x == "object") {
      if (d.endsWith(h, "{}")) h = n ? h : h.slice(0, -2), x = JSON.stringify(x);
      else if (d.isArray(x) && ka(x) || (d.isFileList(x) || d.endsWith(h, "[]")) && (A = d.toArray(x))) return h = an(h), A.forEach(function(N, O) {
        !(d.isUndefined(N) || N === null) && e.append(i === true ? _t([h], O, a) : i === null ? h : h + "[]", p(N));
      }), false;
    }
    return Lt(x) ? true : (e.append(_t(y, h, a), p(x)), false);
  }
  const b = [], g = Object.assign(Sa, { defaultVisitor: m, convertValue: p, isVisitable: Lt });
  function k(x, h, y = 0) {
    if (!d.isUndefined(x)) {
      if (y > u) throw new v("Object is too deeply nested (" + y + " levels). Max depth: " + u, v.ERR_FORM_DATA_DEPTH_EXCEEDED);
      if (b.indexOf(x) !== -1) throw new Error("Circular reference detected in " + h.join("."));
      b.push(x), d.forEach(x, function(_, N) {
        (!(d.isUndefined(_) || _ === null) && s.call(e, _, d.isString(N) ? N.trim() : N, h, g)) === true && k(_, h ? h.concat(N) : [N], y + 1);
      }), b.pop();
    }
  }
  if (!d.isObject(t2)) throw new TypeError("data must be an object");
  return k(t2), e;
}
function kr(t2) {
  const e = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+" };
  return encodeURIComponent(t2).replace(/[!'()~]|%20/g, function(n) {
    return e[n];
  });
}
function Jt(t2, e) {
  this._pairs = [], t2 && pt(t2, this, e);
}
const on = Jt.prototype;
on.append = function(e, r) {
  this._pairs.push([e, r]);
};
on.toString = function(e) {
  const r = e ? function(n) {
    return e.call(this, n, kr);
  } : kr;
  return this._pairs.map(function(s) {
    return r(s[0]) + "=" + r(s[1]);
  }, "").join("&");
};
function Ea(t2) {
  return encodeURIComponent(t2).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function cn(t2, e, r) {
  if (!e) return t2;
  const n = r && r.encode || Ea, s = d.isFunction(r) ? { serialize: r } : r, a = s && s.serialize;
  let i;
  if (a ? i = a(e, s) : i = d.isURLSearchParams(e) ? e.toString() : new Jt(e, s).toString(n), i) {
    const c = t2.indexOf("#");
    c !== -1 && (t2 = t2.slice(0, c)), t2 += (t2.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return t2;
}
class Sr {
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
    d.forEach(this.handlers, function(n) {
      n !== null && e(n);
    });
  }
}
const Kt = { silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false, legacyInterceptorReqResOrdering: true, advertiseZstdAcceptEncoding: false }, Na = typeof URLSearchParams < "u" ? URLSearchParams : Jt, ja = typeof FormData < "u" ? FormData : null, Ca = typeof Blob < "u" ? Blob : null, _a = { isBrowser: true, classes: { URLSearchParams: Na, FormData: ja, Blob: Ca }, protocols: ["http", "https", "file", "blob", "url", "data"] }, Xt = typeof window < "u" && typeof document < "u", $t = typeof navigator == "object" && navigator || void 0, Aa = Xt && (!$t || ["ReactNative", "NativeScript", "NS"].indexOf($t.product) < 0), Ra = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Oa = Xt && window.location.href || "http://localhost", Ta = Object.freeze(Object.defineProperty({ __proto__: null, hasBrowserEnv: Xt, hasStandardBrowserEnv: Aa, hasStandardBrowserWebWorkerEnv: Ra, navigator: $t, origin: Oa }, Symbol.toStringTag, { value: "Module" })), X = { ...Ta, ..._a };
function Pa(t2, e) {
  return pt(t2, new X.classes.URLSearchParams(), { visitor: function(r, n, s, a) {
    return X.isNode && d.isBuffer(r) ? (this.append(n, r.toString("base64")), false) : a.defaultVisitor.apply(this, arguments);
  }, ...e });
}
function Ia(t2) {
  return d.matchAll(/\w+|\[(\w*)]/g, t2).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function Fa(t2) {
  const e = {}, r = Object.keys(t2);
  let n;
  const s = r.length;
  let a;
  for (n = 0; n < s; n++) a = r[n], e[a] = t2[a];
  return e;
}
function ln(t2) {
  function e(r, n, s, a) {
    let i = r[a++];
    if (i === "__proto__") return true;
    const c = Number.isFinite(+i), u = a >= r.length;
    return i = !i && d.isArray(s) ? s.length : i, u ? (d.hasOwnProp(s, i) ? s[i] = d.isArray(s[i]) ? s[i].concat(n) : [s[i], n] : s[i] = n, !c) : ((!d.hasOwnProp(s, i) || !d.isObject(s[i])) && (s[i] = []), e(r, n, s[i], a) && d.isArray(s[i]) && (s[i] = Fa(s[i])), !c);
  }
  if (d.isFormData(t2) && d.isFunction(t2.entries)) {
    const r = {};
    return d.forEachEntry(t2, (n, s) => {
      e(Ia(n), s, r, 0);
    }), r;
  }
  return null;
}
const _e = (t2, e) => t2 != null && d.hasOwnProp(t2, e) ? t2[e] : void 0;
function Ba(t2, e, r) {
  if (d.isString(t2)) try {
    return (e || JSON.parse)(t2), d.trim(t2);
  } catch (n) {
    if (n.name !== "SyntaxError") throw n;
  }
  return (r || JSON.stringify)(t2);
}
const We = { transitional: Kt, adapter: ["xhr", "http", "fetch"], transformRequest: [function(e, r) {
  const n = r.getContentType() || "", s = n.indexOf("application/json") > -1, a = d.isObject(e);
  if (a && d.isHTMLForm(e) && (e = new FormData(e)), d.isFormData(e)) return s ? JSON.stringify(ln(e)) : e;
  if (d.isArrayBuffer(e) || d.isBuffer(e) || d.isStream(e) || d.isFile(e) || d.isBlob(e) || d.isReadableStream(e)) return e;
  if (d.isArrayBufferView(e)) return e.buffer;
  if (d.isURLSearchParams(e)) return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", false), e.toString();
  let c;
  if (a) {
    const u = _e(this, "formSerializer");
    if (n.indexOf("application/x-www-form-urlencoded") > -1) return Pa(e, u).toString();
    if ((c = d.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
      const l = _e(this, "env"), p = l && l.FormData;
      return pt(c ? { "files[]": e } : e, p && new p(), u);
    }
  }
  return a || s ? (r.setContentType("application/json", false), Ba(e)) : e;
}], transformResponse: [function(e) {
  const r = _e(this, "transitional") || We.transitional, n = r && r.forcedJSONParsing, s = _e(this, "responseType"), a = s === "json";
  if (d.isResponse(e) || d.isReadableStream(e)) return e;
  if (e && d.isString(e) && (n && !s || a)) {
    const c = !(r && r.silentJSONParsing) && a;
    try {
      return JSON.parse(e, _e(this, "parseReviver"));
    } catch (u) {
      if (c) throw u.name === "SyntaxError" ? v.from(u, v.ERR_BAD_RESPONSE, this, null, _e(this, "response")) : u;
    }
  }
  return e;
}], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, maxBodyLength: -1, env: { FormData: X.classes.FormData, Blob: X.classes.Blob }, validateStatus: function(e) {
  return e >= 200 && e < 300;
}, headers: { common: { Accept: "application/json, text/plain, */*", "Content-Type": void 0 } } };
d.forEach(["delete", "get", "head", "post", "put", "patch", "query"], (t2) => {
  We.headers[t2] = {};
});
function At(t2, e) {
  const r = this || We, n = e || r, s = te.from(n.headers);
  let a = n.data;
  return d.forEach(t2, function(c) {
    a = c.call(r, a, s.normalize(), e ? e.status : void 0);
  }), s.normalize(), a;
}
function dn(t2) {
  return !!(t2 && t2.__CANCEL__);
}
let Je = class extends v {
  constructor(e, r, n) {
    super(e ?? "canceled", v.ERR_CANCELED, r, n), this.name = "CanceledError", this.__CANCEL__ = true;
  }
};
function un(t2, e, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status) ? t2(r) : e(new v("Request failed with status code " + r.status, r.status >= 400 && r.status < 500 ? v.ERR_BAD_REQUEST : v.ERR_BAD_RESPONSE, r.config, r.request, r));
}
function Da(t2) {
  const e = /^([-+\w]{1,25}):(?:\/\/)?/.exec(t2);
  return e && e[1] || "";
}
function Ua(t2, e) {
  t2 = t2 || 10;
  const r = new Array(t2), n = new Array(t2);
  let s = 0, a = 0, i;
  return e = e !== void 0 ? e : 1e3, function(u) {
    const l = Date.now(), p = n[a];
    i || (i = l), r[s] = u, n[s] = l;
    let m = a, b = 0;
    for (; m !== s; ) b += r[m++], m = m % t2;
    if (s = (s + 1) % t2, s === a && (a = (a + 1) % t2), l - i < e) return;
    const g = p && l - p;
    return g ? Math.round(b * 1e3 / g) : void 0;
  };
}
function La(t2, e) {
  let r = 0, n = 1e3 / e, s, a;
  const i = (l, p = Date.now()) => {
    r = p, s = null, a && (clearTimeout(a), a = null), t2(...l);
  };
  return [(...l) => {
    const p = Date.now(), m = p - r;
    m >= n ? i(l, p) : (s = l, a || (a = setTimeout(() => {
      a = null, i(s);
    }, n - m)));
  }, () => s && i(s)];
}
const it = (t2, e, r = 3) => {
  let n = 0;
  const s = Ua(50, 250);
  return La((a) => {
    if (!a || typeof a.loaded != "number") return;
    const i = a.loaded, c = a.lengthComputable ? a.total : void 0, u = c != null ? Math.min(i, c) : i, l = Math.max(0, u - n), p = s(l);
    n = Math.max(n, u);
    const m = { loaded: u, total: c, progress: c ? u / c : void 0, bytes: l, rate: p || void 0, estimated: p && c ? (c - u) / p : void 0, event: a, lengthComputable: c != null, [e ? "download" : "upload"]: true };
    t2(m);
  }, r);
}, Er = (t2, e) => {
  const r = t2 != null;
  return [(n) => e[0]({ lengthComputable: r, total: t2, loaded: n }), e[1]];
}, Nr = (t2) => (...e) => d.asap(() => t2(...e)), $a = X.hasStandardBrowserEnv ? /* @__PURE__ */ ((t2, e) => (r) => (r = new URL(r, X.origin), t2.protocol === r.protocol && t2.host === r.host && (e || t2.port === r.port)))(new URL(X.origin), X.navigator && /(msie|trident)/i.test(X.navigator.userAgent)) : () => true, Ma = X.hasStandardBrowserEnv ? { write(t2, e, r, n, s, a, i) {
  if (typeof document > "u") return;
  const c = [`${t2}=${encodeURIComponent(e)}`];
  d.isNumber(r) && c.push(`expires=${new Date(r).toUTCString()}`), d.isString(n) && c.push(`path=${n}`), d.isString(s) && c.push(`domain=${s}`), a === true && c.push("secure"), d.isString(i) && c.push(`SameSite=${i}`), document.cookie = c.join("; ");
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
function qa(t2) {
  return typeof t2 != "string" ? false : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t2);
}
function Ha(t2, e) {
  return e ? t2.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : t2;
}
function pn(t2, e, r) {
  let n = !qa(e);
  return t2 && (n || r === false) ? Ha(t2, e) : e;
}
const jr = (t2) => t2 instanceof te ? { ...t2 } : t2;
function Ee(t2, e) {
  e = e || {};
  const r = /* @__PURE__ */ Object.create(null);
  Object.defineProperty(r, "hasOwnProperty", { __proto__: null, value: Object.prototype.hasOwnProperty, enumerable: false, writable: true, configurable: true });
  function n(l, p, m, b) {
    return d.isPlainObject(l) && d.isPlainObject(p) ? d.merge.call({ caseless: b }, l, p) : d.isPlainObject(p) ? d.merge({}, p) : d.isArray(p) ? p.slice() : p;
  }
  function s(l, p, m, b) {
    if (d.isUndefined(p)) {
      if (!d.isUndefined(l)) return n(void 0, l, m, b);
    } else return n(l, p, m, b);
  }
  function a(l, p) {
    if (!d.isUndefined(p)) return n(void 0, p);
  }
  function i(l, p) {
    if (d.isUndefined(p)) {
      if (!d.isUndefined(l)) return n(void 0, l);
    } else return n(void 0, p);
  }
  function c(l, p, m) {
    if (d.hasOwnProp(e, m)) return n(l, p);
    if (d.hasOwnProp(t2, m)) return n(void 0, l);
  }
  const u = { url: a, method: a, data: a, baseURL: i, transformRequest: i, transformResponse: i, paramsSerializer: i, timeout: i, timeoutMessage: i, withCredentials: i, withXSRFToken: i, adapter: i, responseType: i, xsrfCookieName: i, xsrfHeaderName: i, onUploadProgress: i, onDownloadProgress: i, decompress: i, maxContentLength: i, maxBodyLength: i, beforeRedirect: i, transport: i, httpAgent: i, httpsAgent: i, cancelToken: i, socketPath: i, allowedSocketPaths: i, responseEncoding: i, validateStatus: c, headers: (l, p, m) => s(jr(l), jr(p), m, true) };
  return d.forEach(Object.keys({ ...t2, ...e }), function(p) {
    if (p === "__proto__" || p === "constructor" || p === "prototype") return;
    const m = d.hasOwnProp(u, p) ? u[p] : s, b = d.hasOwnProp(t2, p) ? t2[p] : void 0, g = d.hasOwnProp(e, p) ? e[p] : void 0, k = m(b, g, p);
    d.isUndefined(k) && m !== c || (r[p] = k);
  }), r;
}
const za = ["content-type", "content-length"];
function Va(t2, e, r) {
  if (r !== "content-only") {
    t2.set(e);
    return;
  }
  Object.entries(e).forEach(([n, s]) => {
    za.includes(n.toLowerCase()) && t2.set(n, s);
  });
}
const Wa = (t2) => encodeURIComponent(t2).replace(/%([0-9A-F]{2})/gi, (e, r) => String.fromCharCode(parseInt(r, 16)));
function hn(t2) {
  const e = Ee({}, t2), r = (b) => d.hasOwnProp(e, b) ? e[b] : void 0, n = r("data");
  let s = r("withXSRFToken");
  const a = r("xsrfHeaderName"), i = r("xsrfCookieName");
  let c = r("headers");
  const u = r("auth"), l = r("baseURL"), p = r("allowAbsoluteUrls"), m = r("url");
  if (e.headers = c = te.from(c), e.url = cn(pn(l, m, p), r("params"), r("paramsSerializer")), u && c.set("Authorization", "Basic " + btoa((u.username || "") + ":" + (u.password ? Wa(u.password) : ""))), d.isFormData(n) && (X.hasStandardBrowserEnv || X.hasStandardBrowserWebWorkerEnv || d.isReactNative(n) ? c.setContentType(void 0) : d.isFunction(n.getHeaders) && Va(c, n.getHeaders(), r("formDataHeaderPolicy"))), X.hasStandardBrowserEnv && (d.isFunction(s) && (s = s(e)), s === true || s == null && $a(e.url))) {
    const g = a && i && Ma.read(i);
    g && c.set(a, g);
  }
  return e;
}
const Ja = typeof XMLHttpRequest < "u", Ka = Ja && function(t2) {
  return new Promise(function(r, n) {
    const s = hn(t2);
    let a = s.data;
    const i = te.from(s.headers).normalize();
    let { responseType: c, onUploadProgress: u, onDownloadProgress: l } = s, p, m, b, g, k;
    function x() {
      g && g(), k && k(), s.cancelToken && s.cancelToken.unsubscribe(p), s.signal && s.signal.removeEventListener("abort", p);
    }
    let h = new XMLHttpRequest();
    h.open(s.method.toUpperCase(), s.url, true), h.timeout = s.timeout;
    function y() {
      if (!h) return;
      const _ = te.from("getAllResponseHeaders" in h && h.getAllResponseHeaders()), O = { data: !c || c === "text" || c === "json" ? h.responseText : h.response, status: h.status, statusText: h.statusText, headers: _, config: t2, request: h };
      un(function(j) {
        r(j), x();
      }, function(j) {
        n(j), x();
      }, O), h = null;
    }
    "onloadend" in h ? h.onloadend = y : h.onreadystatechange = function() {
      !h || h.readyState !== 4 || h.status === 0 && !(h.responseURL && h.responseURL.startsWith("file:")) || setTimeout(y);
    }, h.onabort = function() {
      h && (n(new v("Request aborted", v.ECONNABORTED, t2, h)), x(), h = null);
    }, h.onerror = function(N) {
      const O = N && N.message ? N.message : "Network Error", I = new v(O, v.ERR_NETWORK, t2, h);
      I.event = N || null, n(I), x(), h = null;
    }, h.ontimeout = function() {
      let N = s.timeout ? "timeout of " + s.timeout + "ms exceeded" : "timeout exceeded";
      const O = s.transitional || Kt;
      s.timeoutErrorMessage && (N = s.timeoutErrorMessage), n(new v(N, O.clarifyTimeoutError ? v.ETIMEDOUT : v.ECONNABORTED, t2, h)), x(), h = null;
    }, a === void 0 && i.setContentType(null), "setRequestHeader" in h && d.forEach(nn(i), function(N, O) {
      h.setRequestHeader(O, N);
    }), d.isUndefined(s.withCredentials) || (h.withCredentials = !!s.withCredentials), c && c !== "json" && (h.responseType = s.responseType), l && ([b, k] = it(l, true), h.addEventListener("progress", b)), u && h.upload && ([m, g] = it(u), h.upload.addEventListener("progress", m), h.upload.addEventListener("loadend", g)), (s.cancelToken || s.signal) && (p = (_) => {
      h && (n(!_ || _.type ? new Je(null, t2, h) : _), h.abort(), x(), h = null);
    }, s.cancelToken && s.cancelToken.subscribe(p), s.signal && (s.signal.aborted ? p() : s.signal.addEventListener("abort", p)));
    const A = Da(s.url);
    if (A && !X.protocols.includes(A)) {
      n(new v("Unsupported protocol " + A + ":", v.ERR_BAD_REQUEST, t2));
      return;
    }
    h.send(a || null);
  });
}, Xa = (t2, e) => {
  if (t2 = t2 ? t2.filter(Boolean) : [], !e && !t2.length) return;
  const r = new AbortController();
  let n = false;
  const s = function(u) {
    if (!n) {
      n = true, i();
      const l = u instanceof Error ? u : this.reason;
      r.abort(l instanceof v ? l : new Je(l instanceof Error ? l.message : l));
    }
  };
  let a = e && setTimeout(() => {
    a = null, s(new v(`timeout of ${e}ms exceeded`, v.ETIMEDOUT));
  }, e);
  const i = () => {
    t2 && (a && clearTimeout(a), a = null, t2.forEach((u) => {
      u.unsubscribe ? u.unsubscribe(s) : u.removeEventListener("abort", s);
    }), t2 = null);
  };
  t2.forEach((u) => u.addEventListener("abort", s));
  const { signal: c } = r;
  return c.unsubscribe = () => d.asap(i), c;
}, Ga = function* (t2, e) {
  let r = t2.byteLength;
  if (r < e) {
    yield t2;
    return;
  }
  let n = 0, s;
  for (; n < r; ) s = n + e, yield t2.slice(n, s), n = s;
}, Ya = async function* (t2, e) {
  for await (const r of Qa(t2)) yield* Ga(r, e);
}, Qa = async function* (t2) {
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
}, Cr = (t2, e, r, n) => {
  const s = Ya(t2, e);
  let a = 0, i, c = (u) => {
    i || (i = true, n && n(u));
  };
  return new ReadableStream({ async pull(u) {
    try {
      const { done: l, value: p } = await s.next();
      if (l) {
        c(), u.close();
        return;
      }
      let m = p.byteLength;
      if (r) {
        let b = a += m;
        r(b);
      }
      u.enqueue(new Uint8Array(p));
    } catch (l) {
      throw c(l), l;
    }
  }, cancel(u) {
    return c(u), s.return();
  } }, { highWaterMark: 2 });
};
function Za(t2) {
  if (!t2 || typeof t2 != "string" || !t2.startsWith("data:")) return 0;
  const e = t2.indexOf(",");
  if (e < 0) return 0;
  const r = t2.slice(5, e), n = t2.slice(e + 1);
  if (/;base64/i.test(r)) {
    let i = n.length;
    const c = n.length;
    for (let g = 0; g < c; g++) if (n.charCodeAt(g) === 37 && g + 2 < c) {
      const k = n.charCodeAt(g + 1), x = n.charCodeAt(g + 2);
      (k >= 48 && k <= 57 || k >= 65 && k <= 70 || k >= 97 && k <= 102) && (x >= 48 && x <= 57 || x >= 65 && x <= 70 || x >= 97 && x <= 102) && (i -= 2, g += 2);
    }
    let u = 0, l = c - 1;
    const p = (g) => g >= 2 && n.charCodeAt(g - 2) === 37 && n.charCodeAt(g - 1) === 51 && (n.charCodeAt(g) === 68 || n.charCodeAt(g) === 100);
    l >= 0 && (n.charCodeAt(l) === 61 ? (u++, l--) : p(l) && (u++, l -= 3)), u === 1 && l >= 0 && (n.charCodeAt(l) === 61 || p(l)) && u++;
    const b = Math.floor(i / 4) * 3 - (u || 0);
    return b > 0 ? b : 0;
  }
  if (typeof Ze < "u" && typeof Ze.byteLength == "function") return Ze.byteLength(n, "utf8");
  let a = 0;
  for (let i = 0, c = n.length; i < c; i++) {
    const u = n.charCodeAt(i);
    if (u < 128) a += 1;
    else if (u < 2048) a += 2;
    else if (u >= 55296 && u <= 56319 && i + 1 < c) {
      const l = n.charCodeAt(i + 1);
      l >= 56320 && l <= 57343 ? (a += 4, i++) : a += 3;
    } else a += 3;
  }
  return a;
}
const Gt = "1.17.0", _r = 64 * 1024, { isFunction: Ke } = d, eo = (t2) => encodeURIComponent(t2).replace(/%([0-9A-F]{2})/gi, (e, r) => String.fromCharCode(parseInt(r, 16))), Ar = (t2) => {
  if (!d.isString(t2)) return t2;
  try {
    return decodeURIComponent(t2);
  } catch {
    return t2;
  }
}, Rr = (t2, ...e) => {
  try {
    return !!t2(...e);
  } catch {
    return false;
  }
}, to = (t2) => {
  const e = t2.indexOf("://");
  let r = t2;
  return e !== -1 && (r = r.slice(e + 3)), r.includes("@") || r.includes(":");
}, ro = (t2) => {
  const e = d.global !== void 0 && d.global !== null ? d.global : globalThis, { ReadableStream: r, TextEncoder: n } = e;
  t2 = d.merge.call({ skipUndefined: true }, { Request: e.Request, Response: e.Response }, t2);
  const { fetch: s, Request: a, Response: i } = t2, c = s ? Ke(s) : typeof fetch == "function", u = Ke(a), l = Ke(i);
  if (!c) return false;
  const p = c && Ke(r), m = c && (typeof n == "function" ? /* @__PURE__ */ ((y) => (A) => y.encode(A))(new n()) : async (y) => new Uint8Array(await new a(y).arrayBuffer())), b = u && p && Rr(() => {
    let y = false;
    const A = new a(X.origin, { body: new r(), method: "POST", get duplex() {
      return y = true, "half";
    } }), _ = A.headers.has("Content-Type");
    return A.body != null && A.body.cancel(), y && !_;
  }), g = l && p && Rr(() => d.isReadableStream(new i("").body)), k = { stream: g && ((y) => y.body) };
  c && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((y) => {
    !k[y] && (k[y] = (A, _) => {
      let N = A && A[y];
      if (N) return N.call(A);
      throw new v(`Response type '${y}' is not supported`, v.ERR_NOT_SUPPORT, _);
    });
  });
  const x = async (y) => {
    if (y == null) return 0;
    if (d.isBlob(y)) return y.size;
    if (d.isSpecCompliantForm(y)) return (await new a(X.origin, { method: "POST", body: y }).arrayBuffer()).byteLength;
    if (d.isArrayBufferView(y) || d.isArrayBuffer(y)) return y.byteLength;
    if (d.isURLSearchParams(y) && (y = y + ""), d.isString(y)) return (await m(y)).byteLength;
  }, h = async (y, A) => {
    const _ = d.toFiniteNumber(y.getContentLength());
    return _ ?? x(A);
  };
  return async (y) => {
    let { url: A, method: _, data: N, signal: O, cancelToken: I, timeout: j, onDownloadProgress: V, onUploadProgress: ye, responseType: oe, headers: D, withCredentials: me = "same-origin", fetchOptions: xe, maxContentLength: W, maxBodyLength: de } = hn(y);
    const J = d.isNumber(W) && W > -1, ce = d.isNumber(de) && de > -1, Ne = (P) => d.hasOwnProp(y, P) ? y[P] : void 0;
    let ge = s || fetch;
    oe = oe ? (oe + "").toLowerCase() : "text";
    let T = Xa([O, I && I.toAbortSignal()], j), G = null;
    const M = T && T.unsubscribe && (() => {
      T.unsubscribe();
    });
    let he;
    try {
      let P;
      const Y = Ne("auth");
      if (Y) {
        const C = Y.username || "", le = Y.password || "";
        P = { username: C, password: le };
      }
      if (to(A)) {
        const C = new URL(A, X.origin);
        if (!P && (C.username || C.password)) {
          const le = Ar(C.username), fe = Ar(C.password);
          P = { username: le, password: fe };
        }
        (C.username || C.password) && (C.username = "", C.password = "", A = C.href);
      }
      if (P && (D.delete("authorization"), D.set("Authorization", "Basic " + btoa(eo((P.username || "") + ":" + (P.password || ""))))), J && typeof A == "string" && A.startsWith("data:") && Za(A) > W) throw new v("maxContentLength size of " + W + " exceeded", v.ERR_BAD_RESPONSE, y, G);
      if (ce && _ !== "get" && _ !== "head") {
        const C = await h(D, N);
        if (typeof C == "number" && isFinite(C) && C > de) throw new v("Request body larger than maxBodyLength limit", v.ERR_BAD_REQUEST, y, G);
      }
      if (ye && b && _ !== "get" && _ !== "head" && (he = await h(D, N)) !== 0) {
        let C = new a(A, { method: "POST", body: N, duplex: "half" }), le;
        if (d.isFormData(N) && (le = C.headers.get("content-type")) && D.setContentType(le), C.body) {
          const [fe, je] = Er(he, it(Nr(ye)));
          N = Cr(C.body, _r, fe, je);
        }
      }
      d.isString(me) || (me = me ? "include" : "omit");
      const U = u && "credentials" in a.prototype;
      if (d.isFormData(N)) {
        const C = D.getContentType();
        C && /^multipart\/form-data/i.test(C) && !/boundary=/i.test(C) && D.delete("content-type");
      }
      D.set("User-Agent", "axios/" + Gt, false);
      const ie = { ...xe, signal: T, method: _.toUpperCase(), headers: nn(D.normalize()), body: N, duplex: "half", credentials: U ? me : void 0 };
      G = u && new a(A, ie);
      let ee = await (u ? ge(G, xe) : ge(A, ie));
      if (J) {
        const C = d.toFiniteNumber(ee.headers.get("content-length"));
        if (C != null && C > W) throw new v("maxContentLength size of " + W + " exceeded", v.ERR_BAD_RESPONSE, y, G);
      }
      const ue = g && (oe === "stream" || oe === "response");
      if (g && ee.body && (V || J || ue && M)) {
        const C = {};
        ["status", "statusText", "headers"].forEach((be) => {
          C[be] = ee[be];
        });
        const le = d.toFiniteNumber(ee.headers.get("content-length")), [fe, je] = V && Er(le, it(Nr(V), true)) || [];
        let Ce = 0;
        const mt = (be) => {
          if (J && (Ce = be, Ce > W)) throw new v("maxContentLength size of " + W + " exceeded", v.ERR_BAD_RESPONSE, y, G);
          fe && fe(be);
        };
        ee = new i(Cr(ee.body, _r, mt, () => {
          je && je(), M && M();
        }), C);
      }
      oe = oe || "text";
      let re = await k[d.findKey(k, oe) || "text"](ee, y);
      if (J && !g && !ue) {
        let C;
        if (re != null && (typeof re.byteLength == "number" ? C = re.byteLength : typeof re.size == "number" ? C = re.size : typeof re == "string" && (C = typeof n == "function" ? new n().encode(re).byteLength : re.length)), typeof C == "number" && C > W) throw new v("maxContentLength size of " + W + " exceeded", v.ERR_BAD_RESPONSE, y, G);
      }
      return !ue && M && M(), await new Promise((C, le) => {
        un(C, le, { data: re, headers: te.from(ee.headers), status: ee.status, statusText: ee.statusText, config: y, request: G });
      });
    } catch (P) {
      if (M && M(), T && T.aborted && T.reason instanceof v) {
        const Y = T.reason;
        throw Y.config = y, G && (Y.request = G), P !== Y && (Y.cause = P), Y;
      }
      throw P && P.name === "TypeError" && /Load failed|fetch/i.test(P.message) ? Object.assign(new v("Network Error", v.ERR_NETWORK, y, G, P && P.response), { cause: P.cause || P }) : v.from(P, P && P.code, y, G, P && P.response);
    }
  };
}, no = /* @__PURE__ */ new Map(), fn = (t2) => {
  let e = t2 && t2.env || {};
  const { fetch: r, Request: n, Response: s } = e, a = [n, s, r];
  let i = a.length, c = i, u, l, p = no;
  for (; c--; ) u = a[c], l = p.get(u), l === void 0 && p.set(u, l = c ? /* @__PURE__ */ new Map() : ro(e)), p = l;
  return l;
};
fn();
const Yt = { http: va, xhr: Ka, fetch: { get: fn } };
d.forEach(Yt, (t2, e) => {
  if (t2) {
    try {
      Object.defineProperty(t2, "name", { __proto__: null, value: e });
    } catch {
    }
    Object.defineProperty(t2, "adapterName", { __proto__: null, value: e });
  }
});
const Or = (t2) => `- ${t2}`, so = (t2) => d.isFunction(t2) || t2 === null || t2 === false;
function ao(t2, e) {
  t2 = d.isArray(t2) ? t2 : [t2];
  const { length: r } = t2;
  let n, s;
  const a = {};
  for (let i = 0; i < r; i++) {
    n = t2[i];
    let c;
    if (s = n, !so(n) && (s = Yt[(c = String(n)).toLowerCase()], s === void 0)) throw new v(`Unknown adapter '${c}'`);
    if (s && (d.isFunction(s) || (s = s.get(e)))) break;
    a[c || "#" + i] = s;
  }
  if (!s) {
    const i = Object.entries(a).map(([u, l]) => `adapter ${u} ` + (l === false ? "is not supported by the environment" : "is not available in the build"));
    let c = r ? i.length > 1 ? `since :
` + i.map(Or).join(`
`) : " " + Or(i[0]) : "as no adapter specified";
    throw new v("There is no suitable adapter to dispatch the request " + c, "ERR_NOT_SUPPORT");
  }
  return s;
}
const mn = { getAdapter: ao, adapters: Yt };
function Rt(t2) {
  if (t2.cancelToken && t2.cancelToken.throwIfRequested(), t2.signal && t2.signal.aborted) throw new Je(null, t2);
}
function Tr(t2) {
  return Rt(t2), t2.headers = te.from(t2.headers), t2.data = At.call(t2, t2.transformRequest), ["post", "put", "patch"].indexOf(t2.method) !== -1 && t2.headers.setContentType("application/x-www-form-urlencoded", false), mn.getAdapter(t2.adapter || We.adapter, t2)(t2).then(function(n) {
    Rt(t2), t2.response = n;
    try {
      n.data = At.call(t2, t2.transformResponse, n);
    } finally {
      delete t2.response;
    }
    return n.headers = te.from(n.headers), n;
  }, function(n) {
    if (!dn(n) && (Rt(t2), n && n.response)) {
      t2.response = n.response;
      try {
        n.response.data = At.call(t2, t2.transformResponse, n.response);
      } finally {
        delete t2.response;
      }
      n.response.headers = te.from(n.response.headers);
    }
    return Promise.reject(n);
  });
}
const ht = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t2, e) => {
  ht[t2] = function(n) {
    return typeof n === t2 || "a" + (e < 1 ? "n " : " ") + t2;
  };
});
const Pr = {};
ht.transitional = function(e, r, n) {
  function s(a, i) {
    return "[Axios v" + Gt + "] Transitional option '" + a + "'" + i + (n ? ". " + n : "");
  }
  return (a, i, c) => {
    if (e === false) throw new v(s(i, " has been removed" + (r ? " in " + r : "")), v.ERR_DEPRECATED);
    return r && !Pr[i] && (Pr[i] = true, console.warn(s(i, " has been deprecated since v" + r + " and will be removed in the near future"))), e ? e(a, i, c) : true;
  };
};
ht.spelling = function(e) {
  return (r, n) => (console.warn(`${n} is likely a misspelling of ${e}`), true);
};
function oo(t2, e, r) {
  if (typeof t2 != "object") throw new v("options must be an object", v.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(t2);
  let s = n.length;
  for (; s-- > 0; ) {
    const a = n[s], i = Object.prototype.hasOwnProperty.call(e, a) ? e[a] : void 0;
    if (i) {
      const c = t2[a], u = c === void 0 || i(c, a, t2);
      if (u !== true) throw new v("option " + a + " must be " + u, v.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== true) throw new v("Unknown option " + a, v.ERR_BAD_OPTION);
  }
}
const nt = { assertOptions: oo, validators: ht }, ne = nt.validators;
let ke = class {
  constructor(e) {
    this.defaults = e || {}, this.interceptors = { request: new Sr(), response: new Sr() };
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
`, i + 1), u = c === -1 ? "" : a.slice(c + 1);
            String(n.stack).endsWith(u) || (n.stack += `
` + a);
          }
        } catch {
        }
      }
      throw n;
    }
  }
  _request(e, r) {
    typeof e == "string" ? (r = r || {}, r.url = e) : r = e || {}, r = Ee(this.defaults, r);
    const { transitional: n, paramsSerializer: s, headers: a } = r;
    n !== void 0 && nt.assertOptions(n, { silentJSONParsing: ne.transitional(ne.boolean), forcedJSONParsing: ne.transitional(ne.boolean), clarifyTimeoutError: ne.transitional(ne.boolean), legacyInterceptorReqResOrdering: ne.transitional(ne.boolean), advertiseZstdAcceptEncoding: ne.transitional(ne.boolean) }, false), s != null && (d.isFunction(s) ? r.paramsSerializer = { serialize: s } : nt.assertOptions(s, { encode: ne.function, serialize: ne.function }, true)), r.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? r.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : r.allowAbsoluteUrls = true), nt.assertOptions(r, { baseUrl: ne.spelling("baseURL"), withXsrfToken: ne.spelling("withXSRFToken") }, true), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let i = a && d.merge(a.common, a[r.method]);
    a && d.forEach(["delete", "get", "head", "post", "put", "patch", "query", "common"], (k) => {
      delete a[k];
    }), r.headers = te.concat(i, a);
    const c = [];
    let u = true;
    this.interceptors.request.forEach(function(x) {
      if (typeof x.runWhen == "function" && x.runWhen(r) === false) return;
      u = u && x.synchronous;
      const h = r.transitional || Kt;
      h && h.legacyInterceptorReqResOrdering ? c.unshift(x.fulfilled, x.rejected) : c.push(x.fulfilled, x.rejected);
    });
    const l = [];
    this.interceptors.response.forEach(function(x) {
      l.push(x.fulfilled, x.rejected);
    });
    let p, m = 0, b;
    if (!u) {
      const k = [Tr.bind(this), void 0];
      for (k.unshift(...c), k.push(...l), b = k.length, p = Promise.resolve(r); m < b; ) p = p.then(k[m++], k[m++]);
      return p;
    }
    b = c.length;
    let g = r;
    for (; m < b; ) {
      const k = c[m++], x = c[m++];
      try {
        g = k(g);
      } catch (h) {
        x.call(this, h);
        break;
      }
    }
    try {
      p = Tr.call(this, g);
    } catch (k) {
      return Promise.reject(k);
    }
    for (m = 0, b = l.length; m < b; ) p = p.then(l[m++], l[m++]);
    return p;
  }
  getUri(e) {
    e = Ee(this.defaults, e);
    const r = pn(e.baseURL, e.url, e.allowAbsoluteUrls);
    return cn(r, e.params, e.paramsSerializer);
  }
};
d.forEach(["delete", "get", "head", "options"], function(e) {
  ke.prototype[e] = function(r, n) {
    return this.request(Ee(n || {}, { method: e, url: r, data: (n || {}).data }));
  };
});
d.forEach(["post", "put", "patch", "query"], function(e) {
  function r(n) {
    return function(a, i, c) {
      return this.request(Ee(c || {}, { method: e, headers: n ? { "Content-Type": "multipart/form-data" } : {}, url: a, data: i }));
    };
  }
  ke.prototype[e] = r(), e !== "query" && (ke.prototype[e + "Form"] = r(true));
});
let io = class xn {
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
      n.reason || (n.reason = new Je(a, i, c), r(n.reason));
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
    return { token: new xn(function(s) {
      e = s;
    }), cancel: e };
  }
};
function co(t2) {
  return function(r) {
    return t2.apply(null, r);
  };
}
function lo(t2) {
  return d.isObject(t2) && t2.isAxiosError === true;
}
const Mt = { Continue: 100, SwitchingProtocols: 101, Processing: 102, EarlyHints: 103, Ok: 200, Created: 201, Accepted: 202, NonAuthoritativeInformation: 203, NoContent: 204, ResetContent: 205, PartialContent: 206, MultiStatus: 207, AlreadyReported: 208, ImUsed: 226, MultipleChoices: 300, MovedPermanently: 301, Found: 302, SeeOther: 303, NotModified: 304, UseProxy: 305, Unused: 306, TemporaryRedirect: 307, PermanentRedirect: 308, BadRequest: 400, Unauthorized: 401, PaymentRequired: 402, Forbidden: 403, NotFound: 404, MethodNotAllowed: 405, NotAcceptable: 406, ProxyAuthenticationRequired: 407, RequestTimeout: 408, Conflict: 409, Gone: 410, LengthRequired: 411, PreconditionFailed: 412, PayloadTooLarge: 413, UriTooLong: 414, UnsupportedMediaType: 415, RangeNotSatisfiable: 416, ExpectationFailed: 417, ImATeapot: 418, MisdirectedRequest: 421, UnprocessableEntity: 422, Locked: 423, FailedDependency: 424, TooEarly: 425, UpgradeRequired: 426, PreconditionRequired: 428, TooManyRequests: 429, RequestHeaderFieldsTooLarge: 431, UnavailableForLegalReasons: 451, InternalServerError: 500, NotImplemented: 501, BadGateway: 502, ServiceUnavailable: 503, GatewayTimeout: 504, HttpVersionNotSupported: 505, VariantAlsoNegotiates: 506, InsufficientStorage: 507, LoopDetected: 508, NotExtended: 510, NetworkAuthenticationRequired: 511, WebServerIsDown: 521, ConnectionTimedOut: 522, OriginIsUnreachable: 523, TimeoutOccurred: 524, SslHandshakeFailed: 525, InvalidSslCertificate: 526 };
Object.entries(Mt).forEach(([t2, e]) => {
  Mt[e] = t2;
});
function gn(t2) {
  const e = new ke(t2), r = Xr(ke.prototype.request, e);
  return d.extend(r, ke.prototype, e, { allOwnKeys: true }), d.extend(r, e, null, { allOwnKeys: true }), r.create = function(s) {
    return gn(Ee(t2, s));
  }, r;
}
const L = gn(We);
L.Axios = ke;
L.CanceledError = Je;
L.CancelToken = io;
L.isCancel = dn;
L.VERSION = Gt;
L.toFormData = pt;
L.AxiosError = v;
L.Cancel = L.CanceledError;
L.all = function(e) {
  return Promise.all(e);
};
L.spread = co;
L.isAxiosError = lo;
L.mergeConfig = Ee;
L.AxiosHeaders = te;
L.formToJSON = (t2) => ln(d.isHTMLForm(t2) ? new FormData(t2) : t2);
L.getAdapter = mn.getAdapter;
L.HttpStatusCode = Mt;
L.default = L;
const { Axios: pi, AxiosError: hi, CanceledError: fi, isCancel: mi, CancelToken: xi, VERSION: gi, all: yi, Cancel: bi, isAxiosError: wi, spread: vi, toFormData: ki, AxiosHeaders: Si, HttpStatusCode: Ei, formToJSON: Ni, getAdapter: ji, mergeConfig: Ci, create: _i } = L;
var R = (t2) => L.isAxiosError(t2) ? t2.response ? JSON.stringify({ data: t2.response.data, headers: t2.response.headers, status: t2.response.status }) : t2.request && !(t2.request instanceof XMLHttpRequest) ? JSON.stringify(t2.request) : JSON.stringify({ code: t2.code, message: t2.message }) : JSON.stringify(t2), Ir = (t2) => {
  const e = t2.slice(0, xr), r = t2.includes(".") ? Me(t2.split(".")[1] || "") : t2.slice(xr);
  return { policyId: e, assetName: r };
};
function uo(t2) {
  const e = os(t2), r = e.body(), n = e.getId(), s = r.outputs(), a = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c) {
      const u = new is(cs(n), BigInt(i)), l = new ls(u, c), p = ds(l);
      a.push(p);
    }
  }
  return a;
}
function po(t2, e, r) {
  const n = /* @__PURE__ */ new Set(), s = [];
  if (!e && !r) return [];
  if (e) for (const i of e) Br(i, n, s);
  if (r) for (const i of r) {
    const c = uo(i);
    for (const u of c) Br(u, n, s);
  }
  return { blockfrost: s.map((i) => {
    const c = { txId: i.input.txHash, index: i.input.outputIndex }, u = ho(i), l = { address: i.output.address, value: u };
    return [c, l];
  }), maestro: s.map((i) => {
    const u = as(i).output().toCbor();
    return { tx_hash: i.input.txHash, index: i.input.outputIndex, txout_cbor: u };
  }), koios: s.map((i) => ({ transaction: { id: i.input.txHash }, index: i.input.outputIndex, address: i.output.address, value: Fr(i) })), ogmios: s.map((i) => ({ transaction: { id: i.input.txHash }, index: i.input.outputIndex, address: i.output.address, value: Fr(i) })) }[t2];
}
var ho = (t2) => {
  const e = {};
  return t2.output.amount.forEach(({ unit: r, quantity: n }) => {
    if (r === "lovelace") e.coins = Number(n);
    else {
      const { policyId: s, assetName: a } = Jr(r);
      e[s] || (e[s] = {}), e[s][a] = Number(n);
    }
  }), e;
}, Fr = (t2) => {
  const e = {};
  return t2.output.amount.forEach(({ unit: r, quantity: n }) => {
    if (r === "lovelace") e.ada = { lovelace: Number(n) };
    else {
      const { policyId: s, assetName: a } = Jr(r);
      e[s] || (e[s] = {}), e[s][a] = Number(n);
    }
  }), e;
}, Br = (t2, e, r) => {
  const n = `${t2.input.txHash}:${t2.input.outputIndex}`;
  e.has(n) || (e.add(n), r.push(t2));
};
function fo(t2) {
  const e = t2.map((r) => r.output.amount).reduce((r, n) => {
    for (const s of n) s && (r[s.unit] == null && (r[s.unit] = 0), s.unit in r && (r[s.unit] += parseFloat(s.quantity)));
    return r;
  }, {});
  return Object.fromEntries(Object.entries(e).map(([r, n]) => [r, n.toString()]));
}
var Xe = class S {
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
    if (!S.isValidHex(e)) throw new Error("Invalid asset: must be a hex string");
    const r = /* @__PURE__ */ new Map(), n = this.assetAddresses[e] || [];
    for (const s of n) r.set(s.address, BigInt(s.quantity));
    for (const [s, a] of Object.entries(this.utxos)) for (const i of a) {
      const c = i.output.amount.find((u) => u.unit === e);
      if (c) {
        const u = r.get(s) || BigInt(0);
        r.set(s, u + BigInt(c.quantity));
      }
    }
    return Array.from(r.entries()).filter(([s, a]) => a > BigInt(0)).map(([s, a]) => ({ address: s, quantity: a.toString() }));
  }
  async fetchAddressAssets(e) {
    if (!S.isValidAddress(e)) throw new Error("Invalid address: must be a valid Bech32 or Base58 address");
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
    if (r && !S.isIntegerString(String(r))) throw new Error("Invalid cursor: must be a string of digits");
    const { paginatedItems: s, nextCursor: a } = this.paginate(n, r);
    return { assets: s, next: a };
  }
  async fetchHandle(e) {
    try {
      const r = Me(e.replace("$", "")), n = `${ot[1]}000de140${r}`;
      return await this.fetchAssetMetadata(n);
    } catch (r) {
      throw R(r);
    }
  }
  async fetchHandleAddress(e) {
    var _a2;
    const r = Me(e.replace("$", "")), n = ot[1], a = (_a2 = (await this.fetchAssetAddresses(`${n}${r}`))[0]) == null ? void 0 : _a2.address;
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
    const r = JSON.parse(e), n = new S();
    return Object.entries(r.accounts || {}).forEach(([s, a]) => n.addAccount(s, a)), Object.entries(r.utxos || {}).forEach(([s, a]) => n.addUTxOs(a)), Object.entries(r.assetAddresses || {}).forEach(([s, a]) => n.addAssetAddresses(s, a)), Object.entries(r.assetMetadata || {}).forEach(([s, a]) => n.addAssetMetadata(s, a)), Object.entries(r.blocks || {}).forEach(([s, a]) => n.addBlock(a)), Object.entries(r.collections || {}).forEach(([s, a]) => n.addCollectionAssets(a)), Object.entries(r.protocolParameters || {}).forEach(([s, a]) => n.addProtocolParameters(a)), Object.entries(r.transactions || {}).forEach(([s, a]) => n.addTransaction(a)), n;
  }
  static isValidHex(e, r) {
    return r && e.length !== r ? false : /^[0-9a-fA-F]+$/.test(e);
  }
  static isValidAddress(e) {
    return S.isValidBech32Address(e) || S.isValidBase58(e);
  }
  static isValidBase58(e) {
    return !!/^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/.test(e);
  }
  static isValidBech32(e, r) {
    return e !== e.toLowerCase() && e !== e.toUpperCase() ? false : new RegExp(`^${r}1[02-9ac-hj-np-z]+$`, "i").test(e);
  }
  static isValidBech32Address(e) {
    return S.isValidBech32(e, "(addr|addr_test)");
  }
  static isValidBech32Pool(e) {
    return S.isValidBech32(e, "pool");
  }
  static isValidBech32VrfVk(e) {
    return S.isValidBech32(e, "vrf_vk");
  }
  static isIntegerString(e) {
    return /^\d+$/.test(e);
  }
  static isValidAssetOrLovelace(e) {
    return e === "lovelace" ? true : e.length < 56 ? false : S.isValidHex(e);
  }
  addAccount(e, r) {
    if (!S.isValidAddress(e)) throw new Error("Invalid address: must be a valid Bech32 or Base58 address");
    if (r.poolId && !S.isValidBech32Pool(r.poolId)) throw new Error("Invalid 'poolId': must be a valid Bech32 pool address");
    if (!S.isIntegerString(r.balance)) throw new Error("Invalid 'balance': must be a string of digits");
    if (!S.isIntegerString(r.rewards)) throw new Error("Invalid 'rewards': must be a string of digits");
    if (!S.isIntegerString(r.withdrawals)) throw new Error("Invalid 'withdrawals': must be a string of digits");
    this.accounts[e] = r;
  }
  addUTxOs(e) {
    if (!Array.isArray(e) || e.length === 0) throw new Error("Invalid utxos: must be a non-empty array");
    e.forEach((r, n) => {
      if (!Number.isInteger(r.input.outputIndex) || r.input.outputIndex < 0) throw new Error(`Invalid outputIndex for UTxO at index ${n}: must be a non-negative integer`);
      if (!S.isValidHex(r.input.txHash, 64)) throw new Error(`Invalid txHash for UTxO at index ${n}: must be a 64-character hexadecimal string`);
      if (!S.isValidAddress(r.output.address)) throw new Error(`Invalid address in output for UTxO at index ${n}: must be a valid Bech32 or Base58 address`);
      if (!Array.isArray(r.output.amount) || r.output.amount.length === 0) throw new Error(`Invalid amount for UTxO at index ${n}: must be a non-empty array of assets`);
      if (r.output.amount.forEach((s, a) => {
        if (!S.isValidAssetOrLovelace(s.unit)) throw new Error(`Invalid unit for asset at index ${a} in UTxO at index ${n}`);
        if (!S.isIntegerString(s.quantity)) throw new Error(`Invalid quantity for asset at index ${a} in UTxO at index ${n}: must be a string of digits`);
      }), r.output.dataHash && !S.isValidHex(r.output.dataHash, 64)) throw new Error(`Invalid dataHash for UTxO at index ${n}: must be a 64-character hexadecimal string or undefined`);
      if (r.output.plutusData && !S.isValidHex(r.output.plutusData)) throw new Error(`Invalid plutusData for UTxO at index ${n}: must be a hexadecimal string or undefined`);
      if (r.output.scriptRef && !S.isValidHex(r.output.scriptRef)) throw new Error(`Invalid scriptRef for UTxO at index ${n}: must be a hexadecimal string or undefined`);
      if (r.output.scriptHash && !S.isValidHex(r.output.scriptHash, 56)) throw new Error(`Invalid scriptHash for UTxO at index ${n}: must be a 56-character hexadecimal string or undefined`);
    });
    for (const r of e) this.utxos[r.output.address] || (this.utxos[r.output.address] = []), this.utxos[r.output.address].push(r);
  }
  addAssetAddresses(e, r) {
    if (!S.isValidHex(e)) throw new Error("Invalid asset: must be a hex string");
    if (r.length === 0) throw new Error("Invalid addresses: must be a non-empty array");
    r.forEach((n, s) => {
      if (!S.isValidAddress(n.address)) throw new Error(`Invalid 'address' field at index ${s}, should be bech32 string`);
      if (!S.isIntegerString(n.quantity)) throw new Error(`Invalid 'quantity' field at index ${s}, should be a string of digits`);
    }), this.assetAddresses[e] = r;
  }
  addAssetMetadata(e, r) {
    if (e.length < 56) throw new Error(`Invalid asset ${e}: must be a string longer than 56 characters`);
    if (!S.isValidHex(e)) throw new Error("Invalid asset: must be a hex string");
    if (typeof r != "object" || r === null) throw new Error("Invalid metadata object");
    this.assetMetadata[e] = r;
  }
  addCollectionAssets(e) {
    if (!Array.isArray(e) || e.length === 0) throw new Error("Invalid assets: must be a non-empty array");
    const r = {};
    e.forEach((n, s) => {
      if (n.unit.length < 56) throw new Error(`Invalid unit for asset at index ${s}: must be a string longer than 56 characters`);
      if (!S.isValidHex(n.unit)) throw new Error(`Invalid unit for asset at index ${s}: must be a hexadecimal string`);
      const a = n.unit.slice(0, 56);
      if (!S.isValidHex(a, 56)) throw new Error(`Invalid policyId in asset unit at index ${s}: must be a 56-character hexadecimal string`);
      if (!S.isIntegerString(n.quantity)) throw new Error(`Invalid quantity for asset at index ${s}: must be a string of digits`);
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
    if (!S.isIntegerString(e.minPoolCost)) throw new Error("Invalid 'minPoolCost': must be a string of digits");
    if (!S.isIntegerString(e.maxTxExMem)) throw new Error("Invalid 'maxTxExMem': must be a string of digits");
    if (!S.isIntegerString(e.maxTxExSteps)) throw new Error("Invalid 'maxTxExSteps': must be a string of digits");
    if (!S.isIntegerString(e.maxBlockExMem)) throw new Error("Invalid 'maxBlockExMem': must be a string of digits");
    if (!S.isIntegerString(e.maxBlockExSteps)) throw new Error("Invalid 'maxBlockExSteps': must be a string of digits");
    this.protocolParameters[e.epoch] = e;
  }
  addTransaction(e) {
    if (!S.isValidHex(e.hash, 64)) throw new Error("Invalid transaction hash: must be a 64-character hexadecimal string");
    if (!Number.isInteger(e.index) || e.index < 0) throw new Error("Invalid 'index': must be a non-negative integer");
    if (!S.isValidHex(e.block, 64)) throw new Error("Invalid 'block': must be a 64-character hexadecimal string");
    if (!S.isIntegerString(e.slot)) throw new Error("Invalid 'slot': must be a string of digits");
    if (!S.isIntegerString(e.fees)) throw new Error("Invalid 'fees': must be a string of digits");
    if (!Number.isInteger(e.size) || e.size <= 0) throw new Error("Invalid 'size': must be a positive integer");
    if (!/^-?\d+$/.test(e.deposit)) throw new Error("Invalid 'deposit': must be a string representing an integer (positive or negative)");
    if (e.invalidBefore !== "" && !S.isIntegerString(e.invalidBefore)) throw new Error("Invalid 'invalidBefore': must be a string of digits or empty string");
    if (e.invalidAfter !== "" && !S.isIntegerString(e.invalidAfter)) throw new Error("Invalid 'invalidAfter': must be a string of digits or empty string");
    this.transactions[e.hash] = e, this.addUTxOs(e.outputs);
  }
  addBlock(e) {
    if (!S.isValidHex(e.hash, 64)) throw new Error("Invalid block hash: must be a 64-character hexadecimal string");
    if (!Number.isInteger(e.time) || e.time < 0) throw new Error("Invalid 'time': must be a non-negative integer");
    if (!S.isIntegerString(e.slot)) throw new Error("Invalid 'slot': must be a string of digits");
    if (!Number.isInteger(e.epoch) || e.epoch < 0) throw new Error("Invalid 'epoch': must be a non-negative integer");
    if (!S.isIntegerString(e.epochSlot)) throw new Error("Invalid 'epochSlot': must be a string of digits");
    if (!S.isValidBech32Pool(e.slotLeader)) throw new Error("Invalid 'slotLeader': must be a bech32 string with pool prefix");
    if (!Number.isInteger(e.size) || e.size <= 0) throw new Error("Invalid 'size': must be a positive integer");
    if (!Number.isInteger(e.txCount) || e.txCount < 0) throw new Error("Invalid 'txCount': must be a non-negative integer");
    if (!S.isIntegerString(e.output)) throw new Error("Invalid 'output': must be a string of digits");
    if (!S.isValidHex(e.operationalCertificate, 64)) throw new Error("Invalid 'operationalCertificate': must be a 64-character hexadecimal string");
    if (!S.isValidHex(e.previousBlock, 64)) throw new Error("Invalid 'previousBlock': must be a 64-character hexadecimal string");
    if (!S.isValidBech32VrfVk(e.VRFKey)) throw new Error("Invalid 'VRFKey': must be a bech32 string with vrf_vk1 prefix");
    this.blocks[e.hash] = e;
  }
  addSerializedTransaction(e) {
    const r = es.fromCbor(ts(e)), n = Date.now(), s = rs(this.network ?? "mainnet", n), a = ns(this.network ?? "mainnet", n), i = this.slotToEpochSlot(BigInt(s)), c = Nt.randomBytes(32).toString("hex"), u = Nt.randomBytes(32).toString("hex"), l = Nt.randomBytes(32).toString("hex"), p = r.body().fee().toString(), m = r.body().outputs().reduce((N, O) => {
      const I = O.amount().coin();
      return N + I;
    }, 0n), b = r.body().ttl(), g = r.body().validityStartInterval(), k = r.body().hash(), x = { confirmations: 40, nextBlock: "undefined its a random block", hash: c, time: n, slot: s, epoch: a, epochSlot: i.toString(), fees: p, slotLeader: "pool1qv3x5x5x5x5x5x5x5x5x5x5x5x5x5x5", size: e.length / 2, txCount: 1, output: m.toString(), operationalCertificate: l, previousBlock: u, VRFKey: "vrf_vk1qv3x5x5x5x5x5x5x5x5x5x5x5x5x5" }, y = r.body().inputs().values().map((N) => {
      const O = N.transactionId(), I = Number(N.index()), j = Object.values(this.utxos).flat().find((V) => V.input.txHash === O && V.input.outputIndex === I);
      if (!j) throw new Error(`UTxO not found for transaction hash and output index: ${O} ${I}`);
      return j;
    });
    for (const N of Object.values(this.utxos)) for (const O of y) {
      const I = N.indexOf(O);
      I !== -1 && N.splice(I, 1);
    }
    const A = r.body().outputs().map((N, O) => this.mapOutputToUTxO(N, k, O)), _ = { inputs: y, hash: k, index: 0, block: c, slot: s.toString(), fees: p, size: e.length / 2, deposit: "0", invalidBefore: g ? g.toString() : "", invalidAfter: b ? b.toString() : "", outputs: A };
    this.addBlock(x), this.addTransaction(_);
  }
  slotToEpochSlot(e) {
    const r = ss[this.network ?? "mainnet"], n = BigInt(r.epochLength);
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
}, mo = class {
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
            const s = await this.fetchPlutusScriptCBOR(t2), a = Qn(s, "DoubleCBOR");
            n = { version: e.type.replace("plutus", ""), code: a };
          } else n = await this.fetchNativeScriptJSON(t2);
          return Zn(n).toCbor().toString();
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
    (e == null ? void 0 : e.enableCaching) && (this._enableCaching = true, this._offlineFetcher = e.offlineFetcher || new Xe(this._network));
  }
  async evaluateTx(t2, e, r) {
    const n = po("blockfrost", e, r), s = { cbor: t2, additionalUtxoSet: n };
    try {
      const a = { "Content-Type": "application/json" }, { status: i, data: c } = await this._axiosInstance.post("utils/txs/evaluate/utxos", s, { headers: a });
      if (i === 200 && c.result.EvaluationResult) {
        const u = { spend: "SPEND", mint: "MINT", certificate: "CERT", withdrawal: "REWARD" }, l = [];
        return Object.keys(c.result.EvaluationResult).forEach((p) => {
          const [m, b] = p.split(":"), { memory: g, steps: k } = c.result.EvaluationResult[p];
          l.push({ tag: u[m], index: Number(b), budget: { mem: g, steps: k } });
        }), l;
      }
      throw R(c);
    } catch (a) {
      throw R(a);
    }
  }
  async fetchAccountInfo(t2) {
    const e = t2.startsWith("addr") ? Xn(t2) : t2;
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
    return fo(e);
  }
  async fetchAddressTxs(t2, e = mr) {
    const r = [];
    try {
      const n = { ...mr, ...e };
      for (let s = 1; s <= n.maxPage; s++) {
        let { data: a, status: i } = await this._axiosInstance.get(`/addresses/${t2}/transactions?page=${s}&order=${n.order}`);
        if (i !== 200) throw R(a);
        if (a.length === 0) break;
        for (const c of a) {
          const l = { ...await this.fetchTxInfo(c.tx_hash), blockHeight: c.block_height, blockTime: c.block_time };
          r.push(l);
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
      const { data: c, status: u } = await this._axiosInstance.get(`${n}?page=${a}`);
      if (u === 200 || u == 202) return c.length > 0 ? s(a + 1, [...i, ...await Promise.all(c.map((l) => this.toUTxO(l, l.tx_hash)))]) : i;
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
      const { policyId: s, assetName: a } = Ir(t2), { data: i, status: c } = await this._axiosInstance.get(`assets/${s}${a}/addresses?page=${r}`);
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
      const { policyId: e, assetName: r } = Ir(t2), { data: n, status: s } = await this._axiosInstance.get(`assets/${e}${r}`);
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
      const e = Me(`${t2.replace("$", "")}`);
      return await this.fetchAssetMetadata(`${ot[1]}000de140${e}`);
    } catch (e) {
      throw R(e);
    }
  }
  async fetchHandleAddress(t2) {
    if (this._network !== "mainnet") throw new Error("Does not support fetching addresses by handle on non-mainnet networks.");
    try {
      const e = Me(t2.replace("$", "")), { data: r, status: n } = await this._axiosInstance.get(`assets/${ot[1]}${e}/addresses`);
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
      if (r === 200 || r == 202) return Gn({ coinsPerUtxoSize: e.coins_per_utxo_word, collateralPercent: e.collateral_percent, decentralisation: e.decentralisation_param, epoch: e.epoch, keyDeposit: e.key_deposit, maxBlockExMem: e.max_block_ex_mem, maxBlockExSteps: e.max_block_ex_steps, maxBlockHeaderSize: e.max_block_header_size, maxBlockSize: e.max_block_size, maxCollateralInputs: e.max_collateral_inputs, maxTxExMem: e.max_tx_ex_mem, maxTxExSteps: e.max_tx_ex_steps, maxTxSize: e.max_tx_size, maxValSize: e.max_val_size, minFeeA: e.min_fee_a, minFeeB: e.min_fee_b, minPoolCost: e.min_pool_cost, poolDeposit: e.pool_deposit, priceMem: e.price_mem, priceStep: e.price_step });
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
      const e = { "Content-Type": "application/cbor" }, { data: r, status: n } = await this._axiosInstance.post("tx/submit", this.submitTxToBytes ? Yn(t2) : t2, { headers: e });
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
    this._enableCaching = t2, t2 ? this._offlineFetcher = e || new Xe(this._network) : this._offlineFetcher = void 0;
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
      const r = Xe.fromJSON(t2);
      this._offlineFetcher = r;
    }
  }
  clearCache() {
    this._offlineFetcher && (this._offlineFetcher = new Xe(this._network));
  }
};
function st(t2) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? st = function(e) {
    return typeof e;
  } : st = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, st(t2);
}
var yn = "dahlia", xo = function(e) {
  return e === 3 ? "v3" : e;
}, bn = "https://js.stripe.com", go = "".concat(bn, "/").concat(yn, "/stripe.js"), yo = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/, bo = /^https:\/\/js\.stripe\.com\/(v3|[a-z]+)\/stripe\.js(\?.*)?$/;
var wo = function(e) {
  return yo.test(e) || bo.test(e);
}, vo = function() {
  for (var e = document.querySelectorAll('script[src^="'.concat(bn, '"]')), r = 0; r < e.length; r++) {
    var n = e[r];
    if (wo(n.src)) return n;
  }
  return null;
}, Dr = function(e) {
  var r = "", n = document.createElement("script");
  n.src = "".concat(go).concat(r);
  var s = document.head || document.body;
  if (!s) throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");
  return s.appendChild(n), n;
}, ko = function(e, r) {
  !e || !e._registerWrapper || e._registerWrapper({ name: "stripe-js", version: "9.7.0", startTime: r });
}, De = null, Ge = null, Ye = null, So = function(e) {
  return function(r) {
    e(new Error("Failed to load Stripe.js", { cause: r }));
  };
}, Eo = function(e, r) {
  return function() {
    window.Stripe ? e(window.Stripe) : r(new Error("Stripe.js not available"));
  };
}, No = function(e) {
  return De !== null ? De : (De = new Promise(function(r, n) {
    if (typeof window > "u" || typeof document > "u") {
      r(null);
      return;
    }
    if (window.Stripe) {
      r(window.Stripe);
      return;
    }
    try {
      var s = vo();
      if (!(s && e)) {
        if (!s) s = Dr(e);
        else if (s && Ye !== null && Ge !== null) {
          var a;
          s.removeEventListener("load", Ye), s.removeEventListener("error", Ge), (a = s.parentNode) === null || a === void 0 || a.removeChild(s), s = Dr(e);
        }
      }
      Ye = Eo(r, n), Ge = So(n), s.addEventListener("load", Ye), s.addEventListener("error", Ge);
    } catch (i) {
      n(i);
      return;
    }
  }), De.catch(function(r) {
    return De = null, Promise.reject(r);
  }));
}, jo = function(e, r, n) {
  if (e === null) return null;
  var s = r[0];
  if (typeof s != "string") throw new Error("Expected publishable key to be of type string, got type ".concat(st(s), " instead."));
  var a = s.match(/^pk_test/), i = xo(e.version), c = yn;
  a && i !== c && console.warn("Stripe.js@".concat(i, " was loaded on the page, but @stripe/stripe-js@").concat("9.7.0", " expected Stripe.js@").concat(c, ". This may result in unexpected behavior. For more information, see https://docs.stripe.com/sdks/stripejs-versioning"));
  var u = e.apply(void 0, r);
  return ko(u, n), u;
}, Ue, wn = false, vn = function() {
  return Ue || (Ue = No(null).catch(function(e) {
    return Ue = null, Promise.reject(e);
  }), Ue);
};
Promise.resolve().then(function() {
  return vn();
}).catch(function(t2) {
  wn || console.warn(t2);
});
var Co = function() {
  for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
  wn = true;
  var s = Date.now();
  return vn().then(function(a) {
    return jo(a, r, s);
  });
}, Ot = { exports: {} }, Tt, Ur;
function _o() {
  if (Ur) return Tt;
  Ur = 1;
  var t2 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Tt = t2, Tt;
}
var Pt, Lr;
function Ao() {
  if (Lr) return Pt;
  Lr = 1;
  var t2 = _o();
  function e() {
  }
  function r() {
  }
  return r.resetWarningCache = e, Pt = function() {
    function n(i, c, u, l, p, m) {
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
  }, Pt;
}
var $r;
function Ro() {
  return $r || ($r = 1, Ot.exports = Ao()()), Ot.exports;
}
var Oo = Ro();
const $ = Ln(Oo);
function Mr(t2, e) {
  var r = Object.keys(t2);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t2);
    e && (n = n.filter(function(s) {
      return Object.getOwnPropertyDescriptor(t2, s).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function qr(t2) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Mr(Object(r), true).forEach(function(n) {
      kn(t2, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t2, Object.getOwnPropertyDescriptors(r)) : Mr(Object(r)).forEach(function(n) {
      Object.defineProperty(t2, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return t2;
}
function at(t2) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? at = function(e) {
    return typeof e;
  } : at = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, at(t2);
}
function kn(t2, e, r) {
  return e in t2 ? Object.defineProperty(t2, e, { value: r, enumerable: true, configurable: true, writable: true }) : t2[e] = r, t2;
}
function To(t2, e) {
  if (t2 == null) return {};
  var r = {}, n = Object.keys(t2), s, a;
  for (a = 0; a < n.length; a++) s = n[a], !(e.indexOf(s) >= 0) && (r[s] = t2[s]);
  return r;
}
function Po(t2, e) {
  if (t2 == null) return {};
  var r = To(t2, e), n, s;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(t2);
    for (s = 0; s < a.length; s++) n = a[s], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(t2, n) && (r[n] = t2[n]);
  }
  return r;
}
function Sn(t2, e) {
  return Io(t2) || Fo(t2, e) || Bo(t2, e) || Do();
}
function Io(t2) {
  if (Array.isArray(t2)) return t2;
}
function Fo(t2, e) {
  var r = t2 && (typeof Symbol < "u" && t2[Symbol.iterator] || t2["@@iterator"]);
  if (r != null) {
    var n = [], s = true, a = false, i, c;
    try {
      for (r = r.call(t2); !(s = (i = r.next()).done) && (n.push(i.value), !(e && n.length === e)); s = true) ;
    } catch (u) {
      a = true, c = u;
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
function Bo(t2, e) {
  if (t2) {
    if (typeof t2 == "string") return Hr(t2, e);
    var r = Object.prototype.toString.call(t2).slice(8, -1);
    if (r === "Object" && t2.constructor && (r = t2.constructor.name), r === "Map" || r === "Set") return Array.from(t2);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return Hr(t2, e);
  }
}
function Hr(t2, e) {
  (e == null || e > t2.length) && (e = t2.length);
  for (var r = 0, n = new Array(e); r < e; r++) n[r] = t2[r];
  return n;
}
function Do() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Z = function(e, r, n) {
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
}, qt = function(e) {
  var r = F.useRef(e);
  return F.useEffect(function() {
    r.current = e;
  }, [e]), r.current;
}, Oe = function(e) {
  return e !== null && at(e) === "object";
}, Uo = function(e) {
  return Oe(e) && typeof e.then == "function";
}, Lo = function(e) {
  return Oe(e) && typeof e.elements == "function" && typeof e.createToken == "function" && typeof e.createPaymentMethod == "function" && typeof e.confirmCardPayment == "function";
}, zr = "[object Object]", $o = function t(e, r) {
  if (!Oe(e) || !Oe(r)) return e === r;
  var n = Array.isArray(e), s = Array.isArray(r);
  if (n !== s) return false;
  var a = Object.prototype.toString.call(e) === zr, i = Object.prototype.toString.call(r) === zr;
  if (a !== i) return false;
  if (!a && !n) return e === r;
  var c = Object.keys(e), u = Object.keys(r);
  if (c.length !== u.length) return false;
  for (var l = {}, p = 0; p < c.length; p += 1) l[c[p]] = true;
  for (var m = 0; m < u.length; m += 1) l[u[m]] = true;
  var b = Object.keys(l);
  if (b.length !== c.length) return false;
  var g = e, k = r, x = function(y) {
    return t(g[y], k[y]);
  };
  return b.every(x);
}, En = function(e, r, n) {
  return Oe(e) ? Object.keys(e).reduce(function(s, a) {
    var i = !Oe(r) || !$o(e[a], r[a]);
    return n.includes(a) ? (i && console.warn("Unsupported prop change: options.".concat(a, " is not a mutable property.")), s) : i ? qr(qr({}, s || {}), {}, kn({}, a, e[a])) : s;
  }, null) : null;
}, Nn = "Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.", Vr = function(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Nn;
  if (e === null || Lo(e)) return e;
  throw new Error(r);
}, Mo = function(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Nn;
  if (Uo(e)) return { tag: "async", stripePromise: Promise.resolve(e).then(function(s) {
    return Vr(s, r);
  }) };
  var n = Vr(e, r);
  return n === null ? { tag: "empty" } : { tag: "sync", stripe: n };
}, qo = function(e) {
  !e || !e._registerWrapper || !e.registerAppInfo || (e._registerWrapper({ name: "react-stripe-js", version: "6.5.0" }), e.registerAppInfo({ name: "react-stripe-js", version: "6.5.0", url: "https://stripe.com/docs/stripe-js/react" }));
}, ft = F.createContext(null);
ft.displayName = "ElementsContext";
var jn = function(e, r) {
  if (!e) throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(r, " in an <Elements> provider."));
  return e;
}, Cn = function(e) {
  var r = e.stripe, n = e.options, s = e.children, a = F.useMemo(function() {
    return Mo(r);
  }, [r]), i = F.useState(function() {
    return { stripe: a.tag === "sync" ? a.stripe : null, elements: a.tag === "sync" ? a.stripe.elements(n) : null };
  }), c = Sn(i, 2), u = c[0], l = c[1];
  F.useEffect(function() {
    var b = true, g = function(x) {
      l(function(h) {
        return h.stripe ? h : { stripe: x, elements: x.elements(n) };
      });
    };
    return a.tag === "async" && !u.stripe ? a.stripePromise.then(function(k) {
      k && b && g(k);
    }) : a.tag === "sync" && !u.stripe && g(a.stripe), function() {
      b = false;
    };
  }, [a, u, n]);
  var p = qt(r);
  F.useEffect(function() {
    p !== null && p !== r && console.warn("Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.");
  }, [p, r]);
  var m = qt(n);
  return F.useEffect(function() {
    if (u.elements) {
      var b = En(n, m, ["clientSecret", "fonts"]);
      b && u.elements.update(b);
    }
  }, [n, m, u.elements]), F.useEffect(function() {
    qo(u.stripe);
  }, [u.stripe]), F.createElement(ft.Provider, { value: u }, s);
};
Cn.propTypes = { stripe: $.any, options: $.object };
var Ho = function(e) {
  var r = F.useContext(ft);
  return jn(r, e);
}, zo = function() {
  var e = Ho("calls useElements()"), r = e.elements;
  return r;
};
$.func.isRequired;
var _n = F.createContext(null);
_n.displayName = "CheckoutContext";
var Ht = function(e) {
  var r = F.useContext(_n), n = F.useContext(ft);
  if (r) {
    if (n) throw new Error("You cannot wrap the part of your app that ".concat(e, " in both a checkout provider and <Elements> provider."));
    return r;
  } else return jn(n, e);
}, Vo = ["mode"], Wo = function(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}, q = function(e, r, n) {
  var s = "".concat(Wo(e), "Element"), a = function(l) {
    var p = l.id, m = l.className, b = l.options, g = b === void 0 ? {} : b, k = l.onBlur, x = l.onFocus, h = l.onReady, y = l.onChange, A = l.onEscape, _ = l.onClick, N = l.onLoadError, O = l.onLoaderStart, I = l.onNetworksChange, j = l.onConfirm, V = l.onCancel, ye = l.onShippingAddressChange, oe = l.onShippingRateChange, D = l.onSavedPaymentMethodRemove, me = l.onSavedPaymentMethodUpdate, xe = l.onAvailablePaymentMethodsChange, W = Ht("mounts <".concat(s, ">")), de = "elements" in W ? W.elements : null, J = "checkoutState" in W ? W.checkoutState : null, ce = (J == null ? void 0 : J.type) === "success" || (J == null ? void 0 : J.type) === "loading" ? J.sdk : null, Ne = F.useState(null), ge = Sn(Ne, 2), T = ge[0], G = ge[1], M = F.useRef(null), he = F.useRef(null);
    Z(T, "blur", k), Z(T, "focus", x), Z(T, "escape", A), Z(T, "click", _), Z(T, "loaderror", N), Z(T, "loaderstart", O), Z(T, "networkschange", I), Z(T, "confirm", j), Z(T, "cancel", V), Z(T, "shippingaddresschange", ye), Z(T, "shippingratechange", oe), Z(T, "savedpaymentmethodremove", D), Z(T, "savedpaymentmethodupdate", me), Z(T, "availablepaymentmethodschange", xe), Z(T, "change", y);
    var P;
    h && (e === "expressCheckout" ? P = h : P = function() {
      h(T);
    }), Z(T, "ready", P), F.useLayoutEffect(function() {
      if (M.current === null && he.current !== null && (de || ce)) {
        var U = null;
        if (ce) {
          var ie = ce, ee = ce;
          switch (e) {
            case "paymentForm":
              U = ee.createForm(g);
              break;
            case "payment":
              U = ie.createPaymentElement(g);
              break;
            case "address":
              if ("mode" in g) {
                var ue = g.mode, re = Po(g, Vo);
                if (ue === "shipping") U = ie.createShippingAddressElement(re);
                else if (ue === "billing") U = ie.createBillingAddressElement(re);
                else throw new Error("Invalid options.mode. mode must be 'billing' or 'shipping'.");
              } else throw new Error("You must supply options.mode. mode must be 'billing' or 'shipping'.");
              break;
            case "expressCheckout":
              U = ie.createExpressCheckoutElement(g);
              break;
            case "currencySelector":
              U = ce.createCurrencySelectorElement();
              break;
            case "taxId":
              U = ie.createTaxIdElement(g);
              break;
            case "contactDetails":
              U = ie.createContactDetailsElement();
              break;
            default:
              throw new Error("<".concat(s, "> is not supported inside a checkout provider. Use an <Elements> provider instead."));
          }
        } else de && (U = de.create(e, g));
        M.current = U, G(U), U && U.mount(he.current);
      }
    }, [de, ce, g]);
    var Y = qt(g);
    return F.useEffect(function() {
      if (M.current) {
        var U = En(g, Y, ["paymentRequest"]);
        U && "update" in M.current && M.current.update(U);
      }
    }, [g, Y]), F.useLayoutEffect(function() {
      return function() {
        if (M.current && typeof M.current.destroy == "function") try {
          M.current.destroy(), M.current = null;
        } catch {
        }
      };
    }, []), F.createElement("div", { id: p, className: m, ref: he });
  }, i = function(l) {
    Ht("mounts <".concat(s, ">"));
    var p = l.id, m = l.className;
    return F.createElement("div", { id: p, className: m });
  }, c = r ? i : a;
  return c.propTypes = { id: $.string, className: $.string, onChange: $.func, onBlur: $.func, onFocus: $.func, onReady: $.func, onEscape: $.func, onClick: $.func, onLoadError: $.func, onLoaderStart: $.func, onNetworksChange: $.func, onConfirm: $.func, onCancel: $.func, onShippingAddressChange: $.func, onShippingRateChange: $.func, onSavedPaymentMethodRemove: $.func, onSavedPaymentMethodUpdate: $.func, onAvailablePaymentMethodsChange: $.func, options: $.object }, c.displayName = s, c.__elementType = e, c;
}, H = typeof window > "u", Jo = F.createContext(null);
Jo.displayName = "EmbeddedCheckoutProviderContext";
var Ko = function() {
  var e = Ht("calls useStripe()"), r = e.stripe;
  return r;
};
q("auBankAccount", H);
q("card", H);
q("cardNumber", H);
q("cardExpiry", H);
q("cardCvc", H);
q("iban", H);
var Xo = q("payment", H);
q("expressCheckout", H);
q("paymentRequestButton", H);
q("linkAuthentication", H);
q("contactDetails", H);
q("address", H);
q("shippingAddress", H);
q("paymentMethodMessaging", H);
q("taxId", H);
q("issuingCardNumberDisplay", H);
q("issuingCardCvcDisplay", H);
q("issuingCardExpiryDisplay", H);
q("issuingCardPinDisplay", H);
q("issuingCardCopyButton", H);
const Go = Co(se.stripe.publishableKey), It = () => [{ id: "stripe", label: "Adyen (Card, Sofort)", icon: qe, color: "from-indigo-500 to-violet-600", shadow: "shadow-indigo-500/20" }, { id: "wero", label: "Wero (Instant)", icon: He, color: "from-purple-500 to-pink-500", shadow: "shadow-purple-500/20" }, { id: "paypal", label: "PayPal", icon: fs, color: "from-blue-500 to-cyan-500", shadow: "shadow-blue-500/20" }, { id: "crypto", label: "Crypto", icon: Kn, color: "from-amber-500 to-orange-500", shadow: "shadow-amber-500/20" }], Wr = [{ id: "metamask", name: "MetaMask", color: "bg-[#F6851B] text-white" }, { id: "coinbase", name: "Coinbase Wallet", color: "bg-[#0052FF] text-white" }, { id: "trust", name: "Trust Wallet", color: "bg-[#3375BB] text-white" }, { id: "phantom", name: "Phantom", color: "bg-[#AB9FF2] text-white" }, { id: "lace", name: "Lace (Cardano)", color: "bg-[#0033AD] text-white" }], Qe = { metamask: { symbol: "ETH", rate: 33e-5 }, coinbase: { symbol: "ETH", rate: 33e-5 }, trust: { symbol: "BNB", rate: 16e-4 }, phantom: { symbol: "SOL", rate: 66e-4 }, lace: { symbol: "ADA", rate: 2.22 } };
function Ai({ onBack: t2, onInitiateStripe: e, onInitiateWero: r, onComplete: n }) {
  var _a2;
  const { cart: s } = $n(), { user: a } = Mn(), i = E.useMemo(() => s.reduce((f, w) => {
    const K = w.discount_percentage && w.discount_percentage > 0 ? w.price * (1 - w.discount_percentage / 100) : w.price;
    return f + K * w.cart_quantity;
  }, 0), [s]), c = E.useMemo(() => s.reduce((f, w) => f + Number(w.cart_quantity || 0), 0), [s]), u = E.useMemo(() => {
    const f = se.paymentMethods || ["stripe", "adyen", "worldline", "paypal", "crypto"], w = It(), K = w.filter((Q) => f.includes(Q.id));
    return K.length > 0 ? K : w;
  }, []), [l, p] = E.useState(() => {
    var _a3;
    return ((_a3 = u[0]) == null ? void 0 : _a3.id) || "stripe";
  }), [m, b] = E.useState("phone"), [g, k] = E.useState(""), [x, h] = E.useState(false), [y, A] = E.useState(false), [_, N] = E.useState("idle"), [O, I] = E.useState(""), [j, V] = E.useState({ name: "", street: "", city: "", zip: "", phone: "", invoiceEmail: a && !a.is_anonymous && a.email || "", country: "" }), [ye, oe] = E.useState(false);
  E.useEffect(() => {
    a && !a.is_anonymous && (a.email && V((w) => w.invoiceEmail ? w : { ...w, invoiceEmail: a.email }), (async () => {
      try {
        if (se.databaseProvider === "supabase") {
          const { data: w, error: K } = await we.from("user_roles").select("name, street, city, zip, phone, country").eq("user_id", a.id || a.$id).maybeSingle();
          w && !K && (V((Q) => ({ ...Q, name: w.name || Q.name, street: w.street || Q.street, city: w.city || Q.city, zip: w.zip || Q.zip, phone: w.phone || Q.phone, country: w.country || Q.country })), (w.name || w.street || w.city || w.zip || w.phone || w.country) && oe(true));
        }
      } catch (w) {
        console.error("Failed to load saved address:", w);
      }
    })());
  }, [a]);
  const [D, me] = E.useState(null), [xe, W] = E.useState(null), [de, J] = E.useState(null), [ce, Ne] = E.useState(false), [ge, T] = E.useState(false), [G, M] = E.useState(false), [he, P] = E.useState(null), [Y, U] = E.useState(null), [ie, ee] = E.useState(false), [ue, re] = E.useState(false), [C, le] = E.useState(""), [fe, je] = E.useState(""), Ce = !!(j.name && j.street && j.city && j.zip && j.country && j.phone && (l !== "crypto" || D !== null) && (l !== "wero" || m === "qr" || m === "phone" && g.trim().length > 6) && (!ue || C && fe.length >= 6)), mt = async (f) => {
    if (f === "lace") {
      Ne(true);
      try {
        if (window.cardano && window.cardano.lace) {
          const K = await (await jt.enable("lace")).getChangeAddress();
          K ? (me("lace"), W(K), J(null)) : alert("Connected to Lace, but no change address found.");
        } else alert("Lace wallet extension not found. Please install Lace to continue.");
      } catch (w) {
        console.error("Failed to connect to Lace wallet:", w), alert(`Connection to Lace wallet was rejected or failed. Details: ${(w == null ? void 0 : w.info) || (w == null ? void 0 : w.message) || JSON.stringify(w)}`);
      } finally {
        Ne(false);
      }
    } else me(f), W("0x" + Math.random().toString(16).slice(2, 10) + "..." + Math.random().toString(16).slice(2, 6)), J(null);
  }, be = async () => {
    var _a3;
    if (D) {
      T(true);
      try {
        if (D === "lace") {
          const K = ((_a3 = (await (await jt.enable("lace")).getBalance()).find((B) => B.unit === "lovelace")) == null ? void 0 : _a3.quantity) || "0", Q = (Number(K) / 1e6).toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          J(`${Q} ADA`);
        } else setTimeout(() => {
          J(`1.25 ${Qe[D].symbol}`), T(false);
        }, 800);
      } catch (f) {
        console.error("Failed to check balance:", f);
      } finally {
        T(false);
      }
    }
  }, [Qt, An] = E.useState(null), [Zt, Rn] = E.useState(null), [Pe, On] = E.useState(null), [xt, er] = E.useState(false), [tr, rr] = E.useState(null), [nr, sr] = E.useState(null), [Ie, ar] = E.useState(null), [or, gt] = E.useState(null), [ir, yt] = E.useState(null), [cr, bt] = E.useState(null), [Fe, wt] = E.useState(null), [vt, lr] = E.useState(false), dr = E.useRef(false);
  E.useEffect(() => () => {
    if (dr.current) return;
    const f = Pe || Ie || Fe;
    f && (async () => {
      try {
        await we.rpc("cancel_order_with_inventory", { p_order_id: f });
      } catch (K) {
        console.error("Failed to cancel order on unmount:", K);
      }
    })();
  }, [Pe, Ie, Fe]);
  const Tn = async (f) => {
    var _a3;
    const w = `${j.name}
${j.street}
${j.city}, ${j.zip}
${j.country}`.trim();
    if (!w || !j.phone) return;
    if (ye && a && !a.is_anonymous) try {
      se.databaseProvider === "supabase" && await we.from("user_roles").update({ name: j.name, street: j.street, city: j.city, zip: j.zip, phone: j.phone, country: j.country, is_guest: false }).eq("user_id", a.id || a.$id);
    } catch (B) {
      console.error("Failed to save address to user_roles:", B);
    }
    const K = ue ? { email: C, password: fe } : void 0, Q = ((_a3 = j.invoiceEmail) == null ? void 0 : _a3.trim()) || void 0;
    if (l === "stripe") {
      er(true);
      try {
        const B = await e(w, j.phone, K, Q);
        se.activeFiatGateway === "adyen" && (rr(B.clientSecret), sr(B.paymentId), ar(B.orderId || null));
      } catch (B) {
        console.error("Failed to initiate Adyen payment:", B);
      } finally {
        er(false);
      }
    } else if (l === "wero" || l === "worldline") {
      lr(true);
      try {
        const B = await r(w, j.phone, g, m, K, Q);
        bt(B.paymentId), gt(B.qrCodeData), yt(B.redirectUrl), wt(B.orderId || null);
      } catch (B) {
        console.error("Failed to initiate Wero payment:", B);
      } finally {
        lr(false);
      }
    } else if (l === "crypto" && D === "lace") {
      M(true), U(null), ee(false);
      try {
        const B = await jt.enable("lace"), In = se.cryptoReceiverAddresses.lace, Fn = (i * Qe.lace.rate).toFixed(6), Bn = Math.round(Number(Fn) * 1e6).toString(), pr = new us({ initiator: B });
        pr.sendLovelace(In, Bn);
        const Dn = await pr.build(), Un = await B.signTx(Dn), kt = await B.submitTx(Un);
        P(kt), ee(true), new mo("preprodjz45ulPXDFrUvQJC54yYEKRAhJS0ZvZm").onTxConfirmed(kt, () => {
          n(l, w, j.phone, K, Q, void 0, void 0, { txHash: kt, customerAddress: xe || "", walletName: "lace" });
        });
      } catch (B) {
        console.error("Cardano payment transaction failed:", B), U((B == null ? void 0 : B.message) || (B == null ? void 0 : B.info) || JSON.stringify(B));
      } finally {
        M(false);
      }
    } else n(l, w, j.phone, K, Q, f);
  }, Pn = async () => {
    await Tn();
  }, ur = It().find((f) => f.id === l) || It()[0];
  return o.jsxs("div", { className: "min-h-screen bg-background transition-colors duration-500 overflow-x-hidden", children: [o.jsx("div", { className: "bg-card text-card-foreground border-b border-gray-100 dark:border-slate-800 sticky top-0 z-30 transition-colors", children: o.jsxs("div", { className: "max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center gap-3 sm:gap-4", children: [o.jsx("button", { onClick: t2, className: "p-2 sm:p-2.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-all text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white active:scale-95 shrink-0", children: o.jsx(ps, { className: "w-5 h-5" }) }), o.jsxs("div", { className: "flex-grow min-w-0", children: [o.jsx("h1", { className: "text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight truncate", children: "Checkout" }), o.jsxs("p", { className: "text-[10px] sm:text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-wide truncate", children: [c, " item", c !== 1 ? "s" : "", " in your order"] })] }), o.jsxs("div", { className: "flex items-center gap-1 sm:gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shrink-0", children: [o.jsx(Le, { className: "w-3 h-3 sm:w-3.5 sm:h-3.5" }), o.jsx("span", { className: "text-[9px] sm:text-[10px] font-bold uppercase tracking-widest hidden sm:inline", children: "Secure" })] })] }) }), o.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: [o.jsx("div", { className: "flex items-center justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8", children: ["Shipping", "Payment", "Confirm"].map((f, w) => o.jsxs("div", { className: "flex items-center gap-2", children: [o.jsxs("div", { className: `flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all ${w <= 1 ? "bg-gray-900 dark:bg-indigo-600 text-white" : "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-500"}`, children: [o.jsx("span", { className: "w-4 h-4 flex items-center justify-center text-[10px] rounded-full bg-white/20", children: w + 1 }), o.jsx("span", { className: "hidden sm:inline", children: f })] }), w < 2 && o.jsx(qn, { className: "w-4 h-4 text-gray-300" })] }, f)) }), o.jsxs("div", { className: "grid lg:grid-cols-12 gap-6 sm:gap-8 items-start", children: [o.jsxs("div", { className: "lg:col-span-7 space-y-6", children: [o.jsxs(z.section, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "bg-card text-card-foreground rounded-[1rem] border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm transition-colors", children: [o.jsxs("div", { className: "px-4 sm:px-7 py-4 sm:py-5 border-b border-gray-50 dark:border-slate-800 flex items-center gap-3", children: [o.jsx("div", { className: "p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl transition-colors", children: o.jsx(Hn, { className: "w-5 h-5" }) }), o.jsxs("div", { children: [o.jsx("h2", { className: "text-base font-extrabold text-gray-900 dark:text-white tracking-tight", children: "Shipping Address" }), o.jsx("p", { className: "text-[11px] font-medium text-gray-400 dark:text-gray-500", children: "Where should we deliver your order?" })] })] }), o.jsxs("div", { className: "p-4 sm:p-7 grid sm:grid-cols-2 gap-4 sm:gap-5", children: [o.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [o.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1", children: [o.jsx(zn, { className: "w-3 h-3" }), " Full Name"] }), o.jsx("input", { type: "text", value: j.name, onChange: (f) => V((w) => ({ ...w, name: f.target.value })), placeholder: "John Doe", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), o.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [o.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1", children: [o.jsx(Vn, { className: "w-3 h-3" }), " Street Address"] }), o.jsx("input", { type: "text", value: j.street, onChange: (f) => V((w) => ({ ...w, street: f.target.value })), placeholder: "123 Magic Avenue", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), o.jsxs("div", { className: "space-y-1.5", children: [o.jsx("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5", children: "City" }), o.jsx("input", { type: "text", value: j.city, onChange: (f) => V((w) => ({ ...w, city: f.target.value })), placeholder: "Magical Product town", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), o.jsxs("div", { className: "space-y-1.5", children: [o.jsx("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5", children: "ZIP Code" }), o.jsx("input", { type: "text", value: j.zip, onChange: (f) => V((w) => ({ ...w, zip: f.target.value })), placeholder: "12345", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), o.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [o.jsx("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5", children: "Country" }), o.jsxs("select", { value: j.country, onChange: (f) => V((w) => ({ ...w, country: f.target.value })), className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium text-gray-900 dark:text-white", children: [o.jsx("option", { value: "", children: "Select a country" }), o.jsx("option", { value: "FR", children: "France" }), o.jsx("option", { value: "DE", children: "Germany" }), o.jsx("option", { value: "BE", children: "Belgium" }), o.jsx("option", { value: "NL", children: "Netherlands" }), o.jsx("option", { value: "ES", children: "Spain" }), o.jsx("option", { value: "IT", children: "Italy" }), o.jsx("option", { value: "GB", children: "United Kingdom" }), o.jsx("option", { value: "US", children: "United States" })] })] }), o.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [o.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1", children: [o.jsx(hs, { className: "w-3 h-3" }), " Mobile or WhatsApp Number"] }), o.jsx("input", { type: "tel", value: j.phone, onChange: (f) => V((w) => ({ ...w, phone: f.target.value })), placeholder: "+1 (555) 000-0000", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), o.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [o.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1", children: [o.jsx(fr, { className: "w-3 h-3" }), " Email for Invoice ", o.jsx("span", { className: "text-gray-300 dark:text-gray-600 normal-case font-medium", children: "(optional)" })] }), o.jsx("input", { type: "email", value: j.invoiceEmail, onChange: (f) => V((w) => ({ ...w, invoiceEmail: f.target.value })), placeholder: "your@email.com", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), a && !a.is_anonymous && o.jsx("div", { className: "sm:col-span-2 pt-2", children: o.jsxs("label", { className: "flex items-center gap-3 p-4 bg-indigo-50/30 dark:bg-indigo-900/10 border border-indigo-100/50 dark:border-indigo-900/30 rounded-2xl cursor-pointer hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group", children: [o.jsxs("div", { className: "relative flex items-center justify-center mt-0.5", children: [o.jsx("input", { type: "checkbox", checked: ye, onChange: (f) => oe(f.target.checked), className: "peer appearance-none w-5 h-5 border-2 border-indigo-300 dark:border-indigo-700 rounded bg-white dark:bg-slate-800 checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" }), o.jsx(et, { className: "w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" })] }), o.jsxs("div", { children: [o.jsx("h4", { className: "text-xs font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors", children: "Save address for faster checkout later" }), o.jsx("p", { className: "text-[10px] text-gray-500 dark:text-gray-400 mt-0.5", children: "We will save your name, street, city, ZIP, country, and phone number to your profile." })] })] }) })] })] }), o.jsxs(z.section, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "bg-card text-card-foreground rounded-[1rem] border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm transition-colors", children: [o.jsxs("div", { className: "px-4 sm:px-7 py-4 sm:py-5 border-b border-gray-50 dark:border-slate-800 flex items-center gap-3", children: [o.jsx("div", { className: "p-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl transition-colors", children: o.jsx(qe, { className: "w-5 h-5" }) }), o.jsxs("div", { children: [o.jsx("h2", { className: "text-base font-extrabold text-gray-900 dark:text-white tracking-tight", children: "Payment Method" }), o.jsx("p", { className: "text-[11px] font-medium text-gray-400 dark:text-gray-500", children: "Choose how you'd like to pay" })] })] }), o.jsxs("div", { className: "p-4 sm:p-7", children: [o.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-5 sm:mb-6", children: u.map((f) => o.jsxs(z.button, { onClick: () => p(f.id), whileTap: { scale: 0.96 }, className: `relative flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 overflow-hidden ${l === f.id ? `border-transparent text-white shadow-lg ${f.shadow}` : "border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 text-gray-400 dark:text-gray-500 hover:border-gray-200 dark:hover:border-slate-600 hover:text-gray-600 dark:hover:text-gray-300"}`, children: [l === f.id && o.jsx(z.div, { layoutId: "payment-bg", className: `absolute inset-0 bg-gradient-to-br ${f.color}`, transition: { type: "spring", stiffness: 300, damping: 25 } }), o.jsx(f.icon, { className: "w-5 h-5 sm:w-6 sm:h-6 relative z-10" }), o.jsx("span", { className: "text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest relative z-10", children: f.label })] }, f.id)) }), o.jsxs(St, { mode: "wait", children: [l === "stripe" && o.jsx(z.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "space-y-4 overflow-hidden py-2", children: o.jsxs("div", { className: "p-4 bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl flex flex-col items-center text-center gap-3", children: [o.jsx(qe, { className: "w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-pulse" }), o.jsxs("div", { children: [o.jsx("p", { className: "text-sm font-bold text-gray-800 dark:text-gray-200", children: "Secure Stripe Checkout" }), o.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm", children: "Click 'Confirm Order' to proceed to the secure, encrypted Stripe-hosted checkout page." })] })] }) }, "stripe-fields"), l === "paypal" && o.jsx(z.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "overflow-hidden", children: o.jsx("div", { className: "p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 transition-colors text-center", children: o.jsx("p", { className: "text-sm font-semibold text-blue-700 dark:text-blue-300", children: "You'll be redirected to PayPal to complete payment." }) }) }, "paypal-info"), l === "crypto" && o.jsx(z.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "overflow-hidden", children: o.jsxs("div", { className: "p-4 sm:p-5 bg-gradient-to-b from-amber-50/50 to-amber-50 rounded-2xl border border-amber-200/60 flex flex-col gap-3 sm:gap-4", children: [o.jsxs("div", { className: "text-center", children: [o.jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-600 rounded-full mb-3", children: o.jsx(yr, { className: "w-6 h-6" }) }), o.jsx("h3", { className: "text-sm font-extrabold text-amber-900 tracking-tight", children: "Connect Web3 Wallet" }), o.jsx("p", { className: "text-[11px] font-medium text-amber-700/70 mt-1", children: "Select a wallet to proceed with crypto payment." })] }), o.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5", children: Wr.map((f) => o.jsxs("button", { onClick: () => mt(f.id), disabled: ce, className: `relative flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl font-bold text-[10px] sm:text-xs transition-all duration-200 ${D === f.id ? `${f.color} ring-2 ring-offset-2 ring-amber-400 shadow-md` : "bg-white text-gray-700 border border-amber-100 hover:border-amber-300 hover:bg-amber-50/50"} ${ce ? "opacity-50 cursor-not-allowed" : ""}`, children: [o.jsxs("span", { className: "truncate mr-2", children: [f.name, " ", ce && f.id === "lace" ? "(Connecting...)" : ""] }), D === f.id && o.jsx(et, { className: "w-4 h-4 shrink-0" })] }, f.id)) }), D && o.jsxs(z.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "mt-2 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-amber-200/50 text-center space-y-3", children: [o.jsxs("div", { children: [o.jsxs("p", { className: "text-xs font-semibold text-amber-800", children: ["Connected to ", (_a2 = Wr.find((f) => f.id === D)) == null ? void 0 : _a2.name] }), xe && o.jsx("p", { className: "text-[10px] font-mono text-amber-600/80 mt-1 bg-amber-100/50 block px-2 py-1 rounded break-all select-all", children: xe }), o.jsx("div", { className: "mt-3", children: de ? o.jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-lg border border-green-200/50", children: [o.jsx(gr, { className: "w-3.5 h-3.5" }), de] }) : o.jsxs("button", { onClick: be, disabled: ge, className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50", children: [o.jsx(gr, { className: "w-3.5 h-3.5" }), ge ? "Checking..." : "Check Balance"] }) })] }), o.jsxs("div", { className: "pt-3 border-t border-amber-200/50 text-left space-y-2", children: [o.jsx("p", { className: "text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-1", children: "Payment Details" }), o.jsxs("div", { className: "flex justify-between items-center bg-amber-50/80 px-3 py-2 rounded-lg", children: [o.jsx("span", { className: "text-xs font-medium text-amber-700", children: "Amount Due" }), o.jsxs("span", { className: "text-sm font-extrabold text-amber-900", children: [(i * Qe[D].rate).toFixed(4), " ", Qe[D].symbol] })] }), o.jsxs("div", { className: "bg-amber-50/80 px-3 py-2 rounded-lg space-y-1", children: [o.jsx("span", { className: "text-[10px] font-bold text-amber-700/70 uppercase tracking-wider", children: "Send to Address" }), o.jsx("p", { className: "text-xs font-mono text-amber-900 break-all select-all bg-white/50 p-1.5 rounded", children: se.cryptoReceiverAddresses[D] })] })] })] })] }) }, "crypto-info"), l === "wero" && o.jsx(z.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "overflow-hidden", children: o.jsxs("div", { className: "p-4 sm:p-5 bg-gradient-to-b from-purple-50/50 to-purple-50 rounded-2xl border border-purple-200/60 flex flex-col gap-3 sm:gap-4", children: [o.jsxs("div", { className: "text-center", children: [o.jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full mb-3 animate-pulse", children: o.jsx(He, { className: "w-6 h-6" }) }), o.jsx("h3", { className: "text-sm font-extrabold text-purple-900 tracking-tight", children: "Wero Instant Transfer" }), o.jsx("p", { className: "text-[11px] font-medium text-purple-700/70 mt-1", children: "Pay instantly and securely from your banking app." })] }), o.jsxs("div", { className: "flex gap-2 p-1 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-200/50", children: [o.jsx("button", { type: "button", onClick: () => b("phone"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${m === "phone" ? "bg-purple-600 text-white shadow-sm font-black" : "text-purple-600/70 hover:text-purple-700 hover:bg-purple-50/30"}`, children: "Phone Number" }), o.jsx("button", { type: "button", onClick: () => b("qr"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${m === "qr" ? "bg-purple-600 text-white shadow-sm font-black" : "text-purple-600/70 hover:text-purple-700 hover:bg-purple-50/30"}`, children: "QR Code" })] }), m === "phone" ? o.jsxs("div", { className: "space-y-1.5 text-left bg-white/40 p-3.5 rounded-xl border border-purple-200/30", children: [o.jsxs("label", { className: "text-[10px] font-bold text-purple-400 dark:text-purple-500 uppercase tracking-widest ml-0.5 flex items-center gap-1", children: [o.jsx(He, { className: "w-3 h-3" }), " Wero Registered Phone"] }), o.jsx("input", { type: "tel", value: g, onChange: (f) => k(f.target.value), placeholder: "+33 6 12 34 56 78", className: "w-full px-4 py-3 bg-white border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all text-sm font-medium text-gray-800" }), o.jsx("p", { className: "text-[9px] text-purple-600/60 font-semibold mt-1", children: "Ensure this phone number is registered with Wero in your bank app." })] }) : o.jsxs("div", { className: "p-4 bg-white/40 text-center rounded-xl border border-purple-200/30 space-y-1", children: [o.jsx(Kr, { className: "w-8 h-8 text-purple-600 mx-auto opacity-80" }), o.jsx("p", { className: "text-xs font-bold text-purple-900", children: "QR Code Checkout" }), o.jsx("p", { className: "text-[10px] text-purple-700/60 leading-relaxed", children: "A checkout QR code will generate for you to scan and authorize in your banking app." })] })] }) }, "wero-info")] })] })] })] }), o.jsx("div", { className: "lg:col-span-5 relative", children: o.jsxs(z.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.15 }, className: "sticky top-24 rounded-[1rem] overflow-hidden", children: [o.jsxs("div", { className: "bg-gradient-to-b from-gray-900 to-gray-950 text-white p-5 sm:p-7 relative", children: [o.jsx("div", { className: "absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" }), o.jsxs("div", { className: "flex items-center justify-between mb-6 relative", children: [o.jsx("h2", { className: "text-lg font-extrabold tracking-tight", children: "Order Summary" }), o.jsxs("span", { className: "text-[10px] font-bold text-white/40 uppercase tracking-widest bg-white/[0.06] px-2.5 py-1 rounded-full", children: [c, " item", c !== 1 ? "s" : ""] })] }), o.jsx("div", { className: "space-y-3 mb-6 max-h-[280px] overflow-y-auto pr-1 relative", style: { scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }, children: s.map((f, w) => o.jsxs(z.div, { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.2 + w * 0.05 }, className: "flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] transition-colors group", children: [o.jsx("div", { className: "w-11 h-11 rounded-lg overflow-hidden bg-white/[0.08] flex-shrink-0 flex items-center justify-center", children: o.jsx("img", { src: f.image_url, alt: f.title, className: "w-full h-full object-contain p-1", referrerPolicy: "no-referrer" }) }), o.jsxs("div", { className: "min-w-0 flex-grow", children: [o.jsx("h4", { className: "font-bold text-sm truncate text-white/90", children: f.title }), o.jsxs("p", { className: "text-[11px] text-white/30 font-medium tabular-nums", children: [f.cart_quantity, " \xD7 ", se.currency_symbol, (f.discount_percentage && f.discount_percentage > 0 ? f.price * (1 - f.discount_percentage / 100) : f.price).toFixed(2)] })] }), o.jsxs("div", { className: "font-bold text-sm tabular-nums text-white/70 group-hover:text-white transition-colors", children: [se.currency_symbol, (f.cart_quantity * (f.discount_percentage && f.discount_percentage > 0 ? f.price * (1 - f.discount_percentage / 100) : f.price)).toFixed(2)] })] }, f.id)) }), o.jsxs("div", { className: "space-y-2.5 pt-5 border-t border-white/[0.06]", children: [o.jsxs("div", { className: "flex justify-between text-sm", children: [o.jsx("span", { className: "text-white/40 font-medium", children: "Subtotal" }), o.jsxs("span", { className: "text-white/70 font-bold tabular-nums", children: [se.currency_symbol, i.toFixed(2)] })] }), o.jsxs("div", { className: "flex justify-between text-sm", children: [o.jsx("span", { className: "text-white/40 font-medium", children: "Shipping" }), o.jsx("span", { className: "text-emerald-400 font-bold text-xs bg-emerald-400/10 px-2 py-0.5 rounded-full uppercase tracking-widest", children: "Free" })] }), o.jsx("div", { className: "h-px bg-white/[0.06] my-1" }), o.jsxs("div", { className: "flex justify-between items-baseline pt-2", children: [o.jsx("span", { className: "font-extrabold text-white/60 text-sm", children: "Total" }), o.jsxs(z.span, { initial: { scale: 1.08 }, animate: { scale: 1 }, className: "text-xl sm:text-3xl font-black tabular-nums bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent", children: [se.currency_symbol, i.toFixed(2)] }, i)] })] })] }), (a == null ? void 0 : a.is_anonymous) && o.jsxs("div", { className: "p-5 bg-indigo-50/50 dark:bg-indigo-900/10 border-x border-gray-100 dark:border-slate-800 transition-colors", children: [o.jsxs("label", { className: "flex items-start gap-3 cursor-pointer group", children: [o.jsxs("div", { className: "relative flex items-center justify-center mt-0.5", children: [o.jsx("input", { type: "checkbox", checked: ue, onChange: (f) => re(f.target.checked), className: "peer appearance-none w-5 h-5 border-2 border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" }), o.jsx(et, { className: "w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" })] }), o.jsxs("div", { children: [o.jsx("h4", { className: "text-sm font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors", children: "Save my details for next time" }), o.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-0.5", children: "Create a permanent account to track your order and save preferences." })] })] }), o.jsx(St, { children: ue && o.jsxs(z.div, { initial: { opacity: 0, height: 0, marginTop: 0 }, animate: { opacity: 1, height: "auto", marginTop: 16 }, exit: { opacity: 0, height: 0, marginTop: 0 }, className: "space-y-3 overflow-hidden", children: [o.jsxs("div", { className: "space-y-1.5", children: [o.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-0.5 flex items-center gap-1", children: [o.jsx(fr, { className: "w-3 h-3" }), " Email"] }), o.jsx("input", { type: "email", value: C, onChange: (f) => le(f.target.value), placeholder: "your@email.com", className: "w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium" })] }), o.jsxs("div", { className: "space-y-1.5", children: [o.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-0.5 flex items-center gap-1", children: [o.jsx(Wn, { className: "w-3 h-3" }), " Password"] }), o.jsx("input", { type: "password", value: fe, onChange: (f) => je(f.target.value), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium" })] })] }) })] }), o.jsxs("div", { className: "p-4 sm:p-5 bg-card text-card-foreground border border-gray-100 dark:border-slate-800 border-t-0 rounded-b-[1rem] transition-colors", children: [o.jsx(z.button, { onClick: Pn, disabled: !Ce || xt || vt, whileTap: { scale: 0.97 }, className: `w-full py-4 rounded-2xl font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 ${Ce && !xt && !vt ? `bg-gradient-to-r ${ur.color} text-white shadow-lg ${ur.shadow} hover:brightness-110` : "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"}`, children: xt || vt ? o.jsxs(o.Fragment, { children: [o.jsx(Ae, { className: "w-4 h-4 animate-spin" }), "Initiating secure payment..."] }) : Ce ? o.jsxs(o.Fragment, { children: [o.jsx(Jn, { className: "w-4 h-4" }), "Confirm Order"] }) : o.jsxs(o.Fragment, { children: [o.jsx(Le, { className: "w-4 h-4" }), "Fill in all fields"] }) }), o.jsxs("p", { className: "text-center text-[10px] font-medium text-gray-400 mt-3 flex items-center justify-center gap-1", children: [o.jsx(Le, { className: "w-3 h-3" }), "256-bit encrypted \xB7 Secure checkout"] })] })] }) })] })] }), o.jsxs(St, { children: [Qt && Zt && o.jsx(Qo, { clientSecret: Qt, paymentId: Zt, totalAmount: i, shippingInfo: j, user: a, onClose: async () => {
    if (Pe) try {
      await we.rpc("cancel_order_with_inventory", { p_order_id: Pe }), console.log("Stripe order cancelled on modal close:", Pe);
    } catch (f) {
      console.error("Failed to cancel order on modal close:", f);
    }
    An(null), Rn(null), On(null);
  } }), tr && nr && o.jsx(Zo, { sessionData: tr, paymentId: nr, totalAmount: i, shippingInfo: j, user: a, onClose: async () => {
    if (Ie) try {
      await we.rpc("cancel_order_with_inventory", { p_order_id: Ie }), console.log("Adyen order cancelled on modal close:", Ie);
    } catch (f) {
      console.error("Failed to cancel order on modal close:", f);
    }
    rr(null), sr(null), ar(null);
  } }), cr && (or || ir) && o.jsx(ei, { paymentId: cr, qrCodeData: or || "", redirectUrl: ir || "", totalAmount: i, weroPhone: g, weroMode: m, onClose: async () => {
    if (Fe) try {
      await we.rpc("cancel_order_with_inventory", { p_order_id: Fe }), console.log("Wero order cancelled on modal close:", Fe);
    } catch (f) {
      console.error("Failed to cancel order on modal close:", f);
    }
    bt(null), gt(null), yt(null), wt(null);
  }, onSuccess: (f) => {
    dr.current = true, bt(null), gt(null), yt(null), wt(null), n(l, "", "", void 0, j.invoiceEmail, "succeeded", f);
  } }), (G || ie || Y) && o.jsx(z.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm", children: o.jsx(z.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "relative w-full max-w-md overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-center", children: Y ? o.jsxs("div", { className: "space-y-4", children: [o.jsx("div", { className: "mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600", children: o.jsx($e, { className: "w-6 h-6" }) }), o.jsx("h3", { className: "text-lg font-black text-slate-950 dark:text-white uppercase tracking-wider", children: "Transaction Failed" }), o.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-h-40 overflow-y-auto break-words font-mono bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800", children: Y }), o.jsx("div", { className: "pt-2", children: o.jsx("button", { onClick: () => U(null), className: "w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider transition-all", children: "Close" }) })] }) : o.jsxs("div", { className: "space-y-5 py-3", children: [o.jsxs("div", { className: "mx-auto relative flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600", children: [o.jsx(Ae, { className: "w-8 h-8 animate-spin text-amber-500" }), o.jsx(yr, { className: "absolute w-4 h-4 text-amber-600" })] }), o.jsxs("div", { children: [o.jsx("h3", { className: "text-base font-black text-slate-950 dark:text-white uppercase tracking-wider", children: ie ? "Confirming Blockchain Payment" : "Preparing Transaction" }), o.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed", children: ie ? "Waiting for the transaction to be mined into a block on Cardano Preproduction blockchain. This typically takes 10 to 20 seconds." : "Please approve and sign the payment request in your connected Lace wallet window." })] }), he && o.jsxs("div", { className: "p-3 bg-amber-50/50 dark:bg-amber-950/10 rounded-2xl border border-amber-200/50 dark:border-amber-900/30 space-y-1.5", children: [o.jsx("span", { className: "text-[9px] font-black uppercase tracking-wider text-amber-700/80", children: "Transaction Hash" }), o.jsx("p", { className: "text-[10px] font-mono text-slate-800 dark:text-slate-200 select-all truncate", children: he }), o.jsxs("a", { href: `https://preprod.cardanoscan.io/transaction/${he}`, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 hover:text-amber-700 transition-colors uppercase tracking-wider mt-1 animate-pulse", children: ["View on Cardanoscan ", o.jsx(Bt, { className: "w-3 h-3" })] })] })] }) }) })] })] });
}
function Yo({ clientSecret: t2, paymentId: e, totalAmount: r, shippingInfo: n, user: s, onClose: a }) {
  const i = Ko(), c = zo(), [u, l] = E.useState(false), [p, m] = E.useState(null), b = { layout: "accordion", fields: { billingDetails: { address: "auto", email: "auto", phone: "auto" } } }, g = (x) => {
    const h = x.replace(/\s+/g, "");
    return h.startsWith("+") ? h : h.startsWith("0") ? `+33${h.slice(1)}` : h;
  }, k = async (x) => {
    if (x.preventDefault(), !i || !c) return;
    l(true), m(null);
    const { error: h } = await i.confirmPayment({ elements: c, confirmParams: { return_url: `${window.location.origin}${window.location.pathname.endsWith("/") ? window.location.pathname : window.location.pathname + "/"}?payment_id=${e}`, payment_method_data: { billing_details: { name: n.name || void 0, email: n.invoiceEmail || (s == null ? void 0 : s.email) || void 0, phone: g(n.phone) || void 0, address: { line1: n.street || void 0, city: n.city || void 0, postal_code: n.zip || void 0, country: n.country || void 0 } } } } });
    h && (m(h.message || "An unexpected error occurred."), l(false));
  };
  return o.jsxs("form", { onSubmit: k, className: "space-y-4", children: [o.jsx(Xo, { options: b }), p && o.jsxs("div", { className: "p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-xl text-xs flex items-start gap-2", children: [o.jsx($e, { className: "w-4 h-4 shrink-0 mt-0.5" }), o.jsx("span", { children: p })] }), o.jsxs("div", { className: "flex gap-3 pt-2", children: [o.jsx("button", { type: "button", onClick: a, disabled: u, className: "flex-1 py-3 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-extrabold uppercase tracking-wider transition-colors disabled:opacity-50", children: "Cancel" }), o.jsx("button", { type: "submit", disabled: !i || u, className: "flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50", children: u ? o.jsxs(o.Fragment, { children: [o.jsx(Ae, { className: "w-4 h-4 animate-spin" }), "Processing..."] }) : o.jsxs(o.Fragment, { children: [o.jsx(Le, { className: "w-4 h-4" }), "Pay Now"] }) })] })] });
}
function Qo({ clientSecret: t2, paymentId: e, totalAmount: r, shippingInfo: n, user: s, onClose: a }) {
  const i = document.documentElement.classList.contains("dark"), c = (l) => {
    const p = l.replace(/\s+/g, "");
    return p.startsWith("+") ? p : p.startsWith("0") ? `+33${p.slice(1)}` : p;
  }, u = { clientSecret: t2, appearance: { theme: i ? "night" : "stripe", variables: { colorPrimary: "#4f46e5" } }, defaultValues: { billingDetails: { name: n.name || void 0, email: n.invoiceEmail || (s == null ? void 0 : s.email) || void 0, phone: c(n.phone) || void 0, address: { line1: n.street || void 0, city: n.city || void 0, postalCode: n.zip || void 0, country: n.country || void 0 } } } };
  return o.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto", children: o.jsxs(z.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6", children: [o.jsxs("div", { className: "flex items-center justify-between", children: [o.jsxs("div", { className: "flex items-center gap-2.5", children: [o.jsx("div", { className: "p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl", children: o.jsx(qe, { className: "w-5 h-5" }) }), o.jsxs("div", { children: [o.jsx("h3", { className: "text-base font-extrabold text-gray-900 dark:text-white", children: "Secure Checkout" }), o.jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: "Provide payment details to complete purchase" })] })] }), o.jsx("button", { onClick: a, className: "p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors", children: o.jsx(Vt, { className: "w-5 h-5" }) })] }), o.jsx(Cn, { stripe: Go, options: u, children: o.jsx(Yo, { clientSecret: t2, paymentId: e, totalAmount: r, shippingInfo: n, user: s, onClose: a }) })] }) });
}
function Zo({ sessionData: t2, paymentId: e, totalAmount: r, shippingInfo: n, user: s, onClose: a }) {
  const [i, c] = E.useState("card"), [u, l] = E.useState(""), [p, m] = E.useState(""), [b, g] = E.useState(""), [k, x] = E.useState(n.name || ""), [h, y] = E.useState(false), [A, _] = E.useState(null), N = (O) => {
    if (O.preventDefault(), i === "card") {
      if (u.replace(/\s/g, "").length < 16) {
        _("Please enter a valid card number.");
        return;
      }
      if (p.length < 5) {
        _("Please enter a valid expiry date (MM/YY).");
        return;
      }
      if (b.length < 3) {
        _("Please enter a valid CVV code.");
        return;
      }
    }
    _(null), y(true), setTimeout(() => {
      const I = `${window.location.origin}${window.location.pathname.endsWith("/") ? window.location.pathname : window.location.pathname + "/"}?payment_id=${e}`;
      window.location.href = I;
    }, 2e3);
  };
  return o.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto", children: o.jsxs(z.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6", children: [o.jsxs("div", { className: "flex items-center justify-between", children: [o.jsxs("div", { className: "flex items-center gap-2.5", children: [o.jsx("div", { className: "p-2 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-xl animate-pulse", children: o.jsx(Et, { className: "w-5 h-5" }) }), o.jsxs("div", { children: [o.jsxs("h3", { className: "text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2", children: ["Adyen Checkout ", o.jsx("span", { className: "text-[10px] px-1.5 py-0.5 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 rounded font-black tracking-wider uppercase", children: "Sandbox" })] }), o.jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: "Fast and secure global payments" })] })] }), o.jsx("button", { onClick: a, className: "p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors", children: o.jsx(Vt, { className: "w-5 h-5" }) })] }), o.jsxs("div", { className: "flex gap-2 p-1 bg-gray-50 dark:bg-slate-800/40 rounded-xl border border-gray-100 dark:border-slate-800", children: [o.jsx("button", { type: "button", onClick: () => c("card"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${i === "card" ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black" : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: "Credit Card" }), o.jsx("button", { type: "button", onClick: () => c("sofort"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${i === "sofort" ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black" : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: "Sofort" }), o.jsx("button", { type: "button", onClick: () => c("ideal"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${i === "ideal" ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black" : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: "iDEAL" })] }), o.jsxs("form", { onSubmit: N, className: "space-y-4", children: [i === "card" && o.jsxs("div", { className: "space-y-3.5", children: [o.jsxs("div", { children: [o.jsx("label", { className: "block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1", children: "Card Number" }), o.jsxs("div", { className: "relative", children: [o.jsx("input", { type: "text", placeholder: "4111 1111 1111 1111", maxLength: 19, value: u, onChange: (O) => {
    const I = O.target.value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim();
    l(I);
  }, className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none", required: true }), o.jsx(qe, { className: "absolute right-3.5 top-3 w-4 h-4 text-gray-400" })] })] }), o.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [o.jsxs("div", { children: [o.jsx("label", { className: "block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1", children: "Expiry Date" }), o.jsx("input", { type: "text", placeholder: "MM/YY", maxLength: 5, value: p, onChange: (O) => {
    const I = O.target.value.replace(/\D/g, "");
    I.length >= 2 ? m(`${I.slice(0, 2)}/${I.slice(2, 4)}`) : m(I);
  }, className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none", required: true })] }), o.jsxs("div", { children: [o.jsx("label", { className: "block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1", children: "Security Code (CVV)" }), o.jsx("input", { type: "password", placeholder: "123", maxLength: 4, value: b, onChange: (O) => g(O.target.value.replace(/\D/g, "")), className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none", required: true })] })] }), o.jsxs("div", { children: [o.jsx("label", { className: "block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1", children: "Cardholder Name" }), o.jsx("input", { type: "text", placeholder: "John Doe", value: k, onChange: (O) => x(O.target.value), className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none", required: true })] })] }), i === "sofort" && o.jsxs("div", { className: "p-5 text-center bg-gray-50 dark:bg-slate-800/20 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl space-y-2", children: [o.jsx(Et, { className: "w-8 h-8 text-indigo-500 mx-auto animate-bounce" }), o.jsx("h4", { className: "text-xs font-extrabold text-gray-800 dark:text-white", children: "Redirecting to Sofort Banking" }), o.jsx("p", { className: "text-[10px] text-gray-400 dark:text-gray-500", children: "You will be securely redirected to complete payment with your bank account." })] }), i === "ideal" && o.jsxs("div", { className: "p-5 text-center bg-gray-50 dark:bg-slate-800/20 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl space-y-2", children: [o.jsx(Et, { className: "w-8 h-8 text-emerald-500 mx-auto animate-bounce" }), o.jsx("h4", { className: "text-xs font-extrabold text-gray-800 dark:text-white", children: "Redirecting to iDEAL Sandbox" }), o.jsx("p", { className: "text-[10px] text-gray-400 dark:text-gray-500", children: "You will be securely redirected to select your Dutch bank and authorize payment." })] }), A && o.jsxs("div", { className: "p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 rounded-xl text-xs flex items-start gap-2", children: [o.jsx($e, { className: "w-4 h-4 shrink-0 mt-0.5" }), o.jsx("span", { children: A })] }), o.jsxs("div", { className: "flex gap-3 pt-2", children: [o.jsx("button", { type: "button", onClick: a, disabled: h, className: "flex-1 py-3 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-extrabold uppercase tracking-wider transition-colors disabled:opacity-50", children: "Cancel" }), o.jsx("button", { type: "submit", disabled: h, className: "flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50", children: h ? o.jsxs(o.Fragment, { children: [o.jsx(Ae, { className: "w-4 h-4 animate-spin" }), "Processing..."] }) : o.jsxs(o.Fragment, { children: [o.jsx(Le, { className: "w-4 h-4" }), "Pay ", se.currencySymbol, r.toFixed(2)] }) })] })] })] }) });
}
function ei({ paymentId: t2, qrCodeData: e, redirectUrl: r, totalAmount: n, weroPhone: s, weroMode: a, onClose: i, onSuccess: c }) {
  const [u, l] = E.useState(false), [p, m] = E.useState(null), b = async (k) => {
    l(true), m(null);
    try {
      const { data: x, error: h } = await we.functions.invoke("wero-checkout", { body: { action: "confirm", payment_id: t2, status: k } });
      if (h) throw new Error(h.message || "Failed to confirm Wero payment.");
      (x == null ? void 0 : x.status) === "succeeded" ? c(x.order_id) : (m(`Payment simulation completed with status: ${(x == null ? void 0 : x.status) || k}`), l(false), (k === "cancelled" || k === "failed") && setTimeout(() => {
        i();
      }, 1500));
    } catch (x) {
      console.error("Wero simulation error:", x), m(x.message || "Simulation request failed."), l(false);
    }
  }, g = r && r.includes("worldline-solutions.com");
  return o.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto", children: o.jsxs(z.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6", children: [o.jsxs("div", { className: "flex items-center justify-between", children: [o.jsxs("div", { className: "flex items-center gap-2.5", children: [o.jsx("div", { className: "p-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl animate-pulse", children: o.jsx(He, { className: "w-5 h-5" }) }), o.jsxs("div", { children: [o.jsxs("h3", { className: "text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2", children: ["Wero Transfer ", o.jsx("span", { className: "text-[10px] px-1.5 py-0.5 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded font-black tracking-wider uppercase", children: g ? "Preprod" : "Sandbox" })] }), o.jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: "Fast and secure account-to-account transfer" })] })] }), o.jsx("button", { onClick: () => b("cancelled"), disabled: u, className: "p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors disabled:opacity-50", children: o.jsx(Vt, { className: "w-5 h-5" }) })] }), a === "phone" ? o.jsxs("div", { className: "p-5 text-center bg-purple-50/50 dark:bg-purple-950/10 border border-dashed border-purple-200 dark:border-purple-900/50 rounded-2xl space-y-3", children: [o.jsx(He, { className: "w-10 h-10 text-purple-500 mx-auto animate-bounce" }), o.jsxs("div", { children: [o.jsx("h4", { className: "text-xs font-black text-gray-800 dark:text-white uppercase tracking-wider", children: "Pending Bank Authorization" }), o.jsxs("p", { className: "text-[10px] text-gray-500 dark:text-gray-400 mt-1", children: ["A transfer request for ", o.jsxs("span", { className: "font-extrabold text-purple-600 dark:text-purple-400", children: [se.currencySymbol, n.toFixed(2)] }), " has been sent to your Wero phone:"] }), o.jsx("p", { className: "text-sm font-mono font-bold text-purple-700 dark:text-purple-300 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-purple-100 dark:border-purple-900/50 inline-block mt-2 select-all", children: s })] }), g && o.jsx("div", { className: "pt-2", children: o.jsxs("a", { href: r, target: "_blank", rel: "noopener noreferrer", className: "w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-750 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all shadow-md hover:shadow-purple-500/25 flex items-center justify-center gap-1.5 group", children: [o.jsx("span", { children: "Proceed to Payment" }), o.jsx(Bt, { className: "w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })] }) }), o.jsx("p", { className: "text-[10px] text-gray-400 dark:text-gray-500 italic pt-1", children: "Please open your participating banking app to authorize the instant transfer request." })] }) : o.jsxs("div", { className: "p-5 text-center bg-purple-50/50 dark:bg-purple-950/10 border border-dashed border-purple-200 dark:border-purple-900/50 rounded-2xl flex flex-col items-center gap-3", children: [o.jsx("div", { className: "p-4 bg-white rounded-2xl shadow-md border border-purple-100", children: o.jsx(Kr, { className: "w-40 h-40 text-purple-900" }) }), o.jsxs("div", { children: [o.jsx("h4", { className: "text-xs font-black text-gray-800 dark:text-white uppercase tracking-wider", children: "Scan to Pay" }), o.jsxs("p", { className: "text-[10px] text-gray-500 dark:text-gray-400 mt-1", children: ["Scan this QR code with your banking app to instantly authorize a payment of ", o.jsxs("span", { className: "font-extrabold text-purple-600 dark:text-purple-400", children: [se.currencySymbol, n.toFixed(2)] }), "."] })] }), g && o.jsxs("a", { href: r, target: "_blank", rel: "noopener noreferrer", className: "w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-750 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all shadow-md hover:shadow-purple-500/25 flex items-center justify-center gap-1.5 group", children: [o.jsx("span", { children: "Proceed to Payment" }), o.jsx(Bt, { className: "w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })] })] }), p && o.jsxs("div", { className: "p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 rounded-xl text-xs flex items-start gap-2", children: [o.jsx($e, { className: "w-4 h-4 shrink-0 mt-0.5" }), o.jsx("span", { children: p })] }), o.jsxs("div", { className: "space-y-2.5", children: [o.jsx("p", { className: "text-[9px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest text-center", children: g ? "Verification & Control" : "Testing / Sandbox Controls" }), o.jsxs("div", { className: "grid grid-cols-2 gap-2.5", children: [o.jsx("button", { onClick: () => b("succeeded"), disabled: u, className: `py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50 ${g ? "bg-purple-600 hover:bg-purple-700 text-white hover:shadow-purple-500/20" : "bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-emerald-500/20"}`, children: u ? o.jsx(Ae, { className: "w-3.5 h-3.5 animate-spin" }) : o.jsxs(o.Fragment, { children: [o.jsx(et, { className: "w-3.5 h-3.5" }), g ? "Verify Payment" : "Simulate Success"] }) }), o.jsx("button", { onClick: () => b("failed"), disabled: u, className: "py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-rose-500/20 flex items-center justify-center gap-1.5 disabled:opacity-50", children: u ? o.jsx(Ae, { className: "w-3.5 h-3.5 animate-spin" }) : o.jsxs(o.Fragment, { children: [o.jsx($e, { className: "w-3.5 h-3.5" }), g ? "Check Failure" : "Simulate Failure"] }) })] }), o.jsx("button", { onClick: () => b("cancelled"), disabled: u, className: "w-full py-2.5 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors disabled:opacity-50", children: "Cancel Payment Request" })] })] }) });
}
export {
  Ai as Checkout
};
