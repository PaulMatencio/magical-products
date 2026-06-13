import { c as gt, a2 as da, R as S, a as j, r as d, b as ua, l as pa, j as e, a3 as Ye, f as ma, m as O, h as xa, U as ha, B as ga, z as vr, A as Lt, a4 as ya, L as be, k as fa, s as T, x as me, y as Ke, E as Kt, i as ba, X as yt, G as Ht, a5 as va } from "./index-7V38TSDi.js";
import { Q as Fr, B as zt, M as wa } from "./index-CZUip6dd.js";
import { A as ka } from "./arrow-left-D7-U9T8b.js";
import { H as ja } from "./hash-CGNAbk2j.js";
import { C as Ge } from "./circle-check-Bzg2zFmt.js";
import { C as Qe } from "./credit-card-BV7ZXrZb.js";
import { S as Na } from "./shopping-cart-DXzQPc_x.js";
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Sa = [["circle", { cx: "8", cy: "8", r: "6", key: "3yglwk" }], ["path", { d: "M18.09 10.37A6 6 0 1 1 10.34 18", key: "t5s6rm" }], ["path", { d: "M7 6h1v4", key: "1obek4" }], ["path", { d: "m16.71 13.88.7.71-2.82 2.82", key: "1rbuyh" }]], wr = gt("coins", Sa);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ca = [["path", { d: "M10 18v-7", key: "wt116b" }], ["path", { d: "M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z", key: "1m329m" }], ["path", { d: "M14 18v-7", key: "vav6t3" }], ["path", { d: "M18 18v-7", key: "aexdmj" }], ["path", { d: "M3 22h18", key: "8prr45" }], ["path", { d: "M6 18v-7", key: "1ivflk" }]], ht = gt("landmark", Ca);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ea = [["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }], ["path", { d: "M12 18h.01", key: "mhygvu" }]], Xe = gt("smartphone", Ea);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Pa = [["path", { d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1", key: "18etb6" }], ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]], kr = gt("wallet", Pa);
function mt(s2) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? mt = function(t) {
    return typeof t;
  } : mt = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, mt(s2);
}
var Or = "dahlia", Aa = function(t) {
  return t === 3 ? "v3" : t;
}, $r = "https://js.stripe.com", _a = "".concat($r, "/").concat(Or, "/stripe.js"), Ta = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/, Ra = /^https:\/\/js\.stripe\.com\/(v3|[a-z]+)\/stripe\.js(\?.*)?$/;
var Da = function(t) {
  return Ta.test(t) || Ra.test(t);
}, Ma = function() {
  for (var t = document.querySelectorAll('script[src^="'.concat($r, '"]')), a = 0; a < t.length; a++) {
    var n = t[a];
    if (Da(n.src)) return n;
  }
  return null;
}, jr = function(t) {
  var a = "", n = document.createElement("script");
  n.src = "".concat(_a).concat(a);
  var i = document.head || document.body;
  if (!i) throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");
  return i.appendChild(n), n;
}, Fa = function(t, a) {
  !t || !t._registerWrapper || t._registerWrapper({ name: "stripe-js", version: "9.7.0", startTime: a });
}, Ve = null, dt = null, ut = null, Oa = function(t) {
  return function(a) {
    t(new Error("Failed to load Stripe.js", { cause: a }));
  };
}, $a = function(t, a) {
  return function() {
    window.Stripe ? t(window.Stripe) : a(new Error("Stripe.js not available"));
  };
}, Ia = function(t) {
  return Ve !== null ? Ve : (Ve = new Promise(function(a, n) {
    if (typeof window > "u" || typeof document > "u") {
      a(null);
      return;
    }
    if (window.Stripe) {
      a(window.Stripe);
      return;
    }
    try {
      var i = Ma();
      if (!(i && t)) {
        if (!i) i = jr(t);
        else if (i && ut !== null && dt !== null) {
          var l;
          i.removeEventListener("load", ut), i.removeEventListener("error", dt), (l = i.parentNode) === null || l === void 0 || l.removeChild(i), i = jr(t);
        }
      }
      ut = $a(a, n), dt = Oa(n), i.addEventListener("load", ut), i.addEventListener("error", dt);
    } catch (h) {
      n(h);
      return;
    }
  }), Ve.catch(function(a) {
    return Ve = null, Promise.reject(a);
  }));
}, Wa = function(t, a, n) {
  if (t === null) return null;
  var i = a[0];
  if (typeof i != "string") throw new Error("Expected publishable key to be of type string, got type ".concat(mt(i), " instead."));
  var l = i.match(/^pk_test/), h = Aa(t.version), p = Or;
  l && h !== p && console.warn("Stripe.js@".concat(h, " was loaded on the page, but @stripe/stripe-js@").concat("9.7.0", " expected Stripe.js@").concat(p, ". This may result in unexpected behavior. For more information, see https://docs.stripe.com/sdks/stripejs-versioning"));
  var g = t.apply(void 0, a);
  return Fa(g, n), g;
}, Je, Ir = false, Wr = function() {
  return Je || (Je = Ia(null).catch(function(t) {
    return Je = null, Promise.reject(t);
  }), Je);
};
Promise.resolve().then(function() {
  return Wr();
}).catch(function(s2) {
  Ir || console.warn(s2);
});
var Ua = function() {
  for (var t = arguments.length, a = new Array(t), n = 0; n < t; n++) a[n] = arguments[n];
  Ir = true;
  var i = Date.now();
  return Wr().then(function(l) {
    return Wa(l, a, i);
  });
}, Vt = { exports: {} }, Jt, Nr;
function qa() {
  if (Nr) return Jt;
  Nr = 1;
  var s2 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Jt = s2, Jt;
}
var Yt, Sr;
function Ba() {
  if (Sr) return Yt;
  Sr = 1;
  var s2 = qa();
  function t() {
  }
  function a() {
  }
  return a.resetWarningCache = t, Yt = function() {
    function n(h, p, g, m, b, w) {
      if (w !== s2) {
        var f = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
        throw f.name = "Invariant Violation", f;
      }
    }
    n.isRequired = n;
    function i() {
      return n;
    }
    var l = { array: n, bigint: n, bool: n, func: n, number: n, object: n, string: n, symbol: n, any: n, arrayOf: i, element: n, elementType: n, instanceOf: i, node: n, objectOf: i, oneOf: i, oneOfType: i, shape: i, exact: i, checkPropTypes: a, resetWarningCache: t };
    return l.PropTypes = l, l;
  }, Yt;
}
var Cr;
function La() {
  return Cr || (Cr = 1, Vt.exports = Ba()()), Vt.exports;
}
var Ha = La();
const D = da(Ha);
function Er(s2, t) {
  var a = Object.keys(s2);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(s2);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(s2, i).enumerable;
    })), a.push.apply(a, n);
  }
  return a;
}
function Pr(s2) {
  for (var t = 1; t < arguments.length; t++) {
    var a = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Er(Object(a), true).forEach(function(n) {
      Ur(s2, n, a[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(s2, Object.getOwnPropertyDescriptors(a)) : Er(Object(a)).forEach(function(n) {
      Object.defineProperty(s2, n, Object.getOwnPropertyDescriptor(a, n));
    });
  }
  return s2;
}
function xt(s2) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? xt = function(t) {
    return typeof t;
  } : xt = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, xt(s2);
}
function Ur(s2, t, a) {
  return t in s2 ? Object.defineProperty(s2, t, { value: a, enumerable: true, configurable: true, writable: true }) : s2[t] = a, s2;
}
function za(s2, t) {
  if (s2 == null) return {};
  var a = {}, n = Object.keys(s2), i, l;
  for (l = 0; l < n.length; l++) i = n[l], !(t.indexOf(i) >= 0) && (a[i] = s2[i]);
  return a;
}
function Va(s2, t) {
  if (s2 == null) return {};
  var a = za(s2, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(s2);
    for (i = 0; i < l.length; i++) n = l[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(s2, n) && (a[n] = s2[n]);
  }
  return a;
}
function qr(s2, t) {
  return Ja(s2) || Ya(s2, t) || Ga(s2, t) || Ka();
}
function Ja(s2) {
  if (Array.isArray(s2)) return s2;
}
function Ya(s2, t) {
  var a = s2 && (typeof Symbol < "u" && s2[Symbol.iterator] || s2["@@iterator"]);
  if (a != null) {
    var n = [], i = true, l = false, h, p;
    try {
      for (a = a.call(s2); !(i = (h = a.next()).done) && (n.push(h.value), !(t && n.length === t)); i = true) ;
    } catch (g) {
      l = true, p = g;
    } finally {
      try {
        !i && a.return != null && a.return();
      } finally {
        if (l) throw p;
      }
    }
    return n;
  }
}
function Ga(s2, t) {
  if (s2) {
    if (typeof s2 == "string") return Ar(s2, t);
    var a = Object.prototype.toString.call(s2).slice(8, -1);
    if (a === "Object" && s2.constructor && (a = s2.constructor.name), a === "Map" || a === "Set") return Array.from(s2);
    if (a === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)) return Ar(s2, t);
  }
}
function Ar(s2, t) {
  (t == null || t > s2.length) && (t = s2.length);
  for (var a = 0, n = new Array(t); a < t; a++) n[a] = s2[a];
  return n;
}
function Ka() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var L = function(t, a, n) {
  var i = !!n, l = S.useRef(n);
  S.useEffect(function() {
    l.current = n;
  }, [n]), S.useEffect(function() {
    if (!i || !t) return function() {
    };
    var h = function() {
      if (l.current) return l.current.apply(l, arguments);
    };
    return t.on(a, h), function() {
      t.off(a, h);
    };
  }, [i, a, t, l]);
}, Qt = function(t) {
  var a = S.useRef(t);
  return S.useEffect(function() {
    a.current = t;
  }, [t]), a.current;
}, Pe = function(t) {
  return t !== null && xt(t) === "object";
}, Qa = function(t) {
  return Pe(t) && typeof t.then == "function";
}, Xa = function(t) {
  return Pe(t) && typeof t.elements == "function" && typeof t.createToken == "function" && typeof t.createPaymentMethod == "function" && typeof t.confirmCardPayment == "function";
}, _r = "[object Object]", Za = function s(t, a) {
  if (!Pe(t) || !Pe(a)) return t === a;
  var n = Array.isArray(t), i = Array.isArray(a);
  if (n !== i) return false;
  var l = Object.prototype.toString.call(t) === _r, h = Object.prototype.toString.call(a) === _r;
  if (l !== h) return false;
  if (!l && !n) return t === a;
  var p = Object.keys(t), g = Object.keys(a);
  if (p.length !== g.length) return false;
  for (var m = {}, b = 0; b < p.length; b += 1) m[p[b]] = true;
  for (var w = 0; w < g.length; w += 1) m[g[w]] = true;
  var f = Object.keys(m);
  if (f.length !== p.length) return false;
  var v = t, C = a, M = function(Z) {
    return s(v[Z], C[Z]);
  };
  return f.every(M);
}, Br = function(t, a, n) {
  return Pe(t) ? Object.keys(t).reduce(function(i, l) {
    var h = !Pe(a) || !Za(t[l], a[l]);
    return n.includes(l) ? (h && console.warn("Unsupported prop change: options.".concat(l, " is not a mutable property.")), i) : h ? Pr(Pr({}, i || {}), {}, Ur({}, l, t[l])) : i;
  }, null) : null;
}, Lr = "Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.", Tr = function(t) {
  var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Lr;
  if (t === null || Xa(t)) return t;
  throw new Error(a);
}, es = function(t) {
  var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Lr;
  if (Qa(t)) return { tag: "async", stripePromise: Promise.resolve(t).then(function(i) {
    return Tr(i, a);
  }) };
  var n = Tr(t, a);
  return n === null ? { tag: "empty" } : { tag: "sync", stripe: n };
}, ts = function(t) {
  !t || !t._registerWrapper || !t.registerAppInfo || (t._registerWrapper({ name: "react-stripe-js", version: "6.5.0" }), t.registerAppInfo({ name: "react-stripe-js", version: "6.5.0", url: "https://stripe.com/docs/stripe-js/react" }));
}, ft = S.createContext(null);
ft.displayName = "ElementsContext";
var Hr = function(t, a) {
  if (!t) throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(a, " in an <Elements> provider."));
  return t;
}, zr = function(t) {
  var a = t.stripe, n = t.options, i = t.children, l = S.useMemo(function() {
    return es(a);
  }, [a]), h = S.useState(function() {
    return { stripe: l.tag === "sync" ? l.stripe : null, elements: l.tag === "sync" ? l.stripe.elements(n) : null };
  }), p = qr(h, 2), g = p[0], m = p[1];
  S.useEffect(function() {
    var f = true, v = function(M) {
      m(function(P) {
        return P.stripe ? P : { stripe: M, elements: M.elements(n) };
      });
    };
    return l.tag === "async" && !g.stripe ? l.stripePromise.then(function(C) {
      C && f && v(C);
    }) : l.tag === "sync" && !g.stripe && v(l.stripe), function() {
      f = false;
    };
  }, [l, g, n]);
  var b = Qt(a);
  S.useEffect(function() {
    b !== null && b !== a && console.warn("Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.");
  }, [b, a]);
  var w = Qt(n);
  return S.useEffect(function() {
    if (g.elements) {
      var f = Br(n, w, ["clientSecret", "fonts"]);
      f && g.elements.update(f);
    }
  }, [n, w, g.elements]), S.useEffect(function() {
    ts(g.stripe);
  }, [g.stripe]), S.createElement(ft.Provider, { value: g }, i);
};
zr.propTypes = { stripe: D.any, options: D.object };
var rs = function(t) {
  var a = S.useContext(ft);
  return Hr(a, t);
}, as = function() {
  var t = rs("calls useElements()"), a = t.elements;
  return a;
};
D.func.isRequired;
var Vr = S.createContext(null);
Vr.displayName = "CheckoutContext";
var Xt = function(t) {
  var a = S.useContext(Vr), n = S.useContext(ft);
  if (a) {
    if (n) throw new Error("You cannot wrap the part of your app that ".concat(t, " in both a checkout provider and <Elements> provider."));
    return a;
  } else return Hr(n, t);
}, ss = ["mode"], ns = function(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}, $ = function(t, a, n) {
  var i = "".concat(ns(t), "Element"), l = function(m) {
    var b = m.id, w = m.className, f = m.options, v = f === void 0 ? {} : f, C = m.onBlur, M = m.onFocus, P = m.onReady, Z = m.onChange, de = m.onEscape, Q = m.onClick, A = m.onLoadError, N = m.onLoaderStart, H = m.onNetworksChange, Ze = m.onConfirm, _ = m.onCancel, bt = m.onShippingAddressChange, ie = m.onShippingRateChange, et = m.onSavedPaymentMethodRemove, ve = m.onSavedPaymentMethodUpdate, vt = m.onAvailablePaymentMethodsChange, Ae = Xt("mounts <".concat(i, ">")), _e = "elements" in Ae ? Ae.elements : null, ue = "checkoutState" in Ae ? Ae.checkoutState : null, xe = (ue == null ? void 0 : ue.type) === "success" || (ue == null ? void 0 : ue.type) === "loading" ? ue.sdk : null, Zt = S.useState(null), wt = qr(Zt, 2), W = wt[0], er = wt[1], u = S.useRef(null), G = S.useRef(null);
    L(W, "blur", C), L(W, "focus", M), L(W, "escape", de), L(W, "click", Q), L(W, "loaderror", A), L(W, "loaderstart", N), L(W, "networkschange", H), L(W, "confirm", Ze), L(W, "cancel", _), L(W, "shippingaddresschange", bt), L(W, "shippingratechange", ie), L(W, "savedpaymentmethodremove", et), L(W, "savedpaymentmethodupdate", ve), L(W, "availablepaymentmethodschange", vt), L(W, "change", Z);
    var we;
    P && (t === "expressCheckout" ? we = P : we = function() {
      P(W);
    }), L(W, "ready", we), S.useLayoutEffect(function() {
      if (u.current === null && G.current !== null && (_e || xe)) {
        var c = null;
        if (xe) {
          var re = xe, K = xe;
          switch (t) {
            case "paymentForm":
              c = K.createForm(v);
              break;
            case "payment":
              c = re.createPaymentElement(v);
              break;
            case "address":
              if ("mode" in v) {
                var ke = v.mode, Re = Va(v, ss);
                if (ke === "shipping") c = re.createShippingAddressElement(Re);
                else if (ke === "billing") c = re.createBillingAddressElement(Re);
                else throw new Error("Invalid options.mode. mode must be 'billing' or 'shipping'.");
              } else throw new Error("You must supply options.mode. mode must be 'billing' or 'shipping'.");
              break;
            case "expressCheckout":
              c = re.createExpressCheckoutElement(v);
              break;
            case "currencySelector":
              c = xe.createCurrencySelectorElement();
              break;
            case "taxId":
              c = re.createTaxIdElement(v);
              break;
            case "contactDetails":
              c = re.createContactDetailsElement();
              break;
            default:
              throw new Error("<".concat(i, "> is not supported inside a checkout provider. Use an <Elements> provider instead."));
          }
        } else _e && (c = _e.create(t, v));
        u.current = c, er(c), c && c.mount(G.current);
      }
    }, [_e, xe, v]);
    var Te = Qt(v);
    return S.useEffect(function() {
      if (u.current) {
        var c = Br(v, Te, ["paymentRequest"]);
        c && "update" in u.current && u.current.update(c);
      }
    }, [v, Te]), S.useLayoutEffect(function() {
      return function() {
        if (u.current && typeof u.current.destroy == "function") try {
          u.current.destroy(), u.current = null;
        } catch {
        }
      };
    }, []), S.createElement("div", { id: b, className: w, ref: G });
  }, h = function(m) {
    Xt("mounts <".concat(i, ">"));
    var b = m.id, w = m.className;
    return S.createElement("div", { id: b, className: w });
  }, p = a ? h : l;
  return p.propTypes = { id: D.string, className: D.string, onChange: D.func, onBlur: D.func, onFocus: D.func, onReady: D.func, onEscape: D.func, onClick: D.func, onLoadError: D.func, onLoaderStart: D.func, onNetworksChange: D.func, onConfirm: D.func, onCancel: D.func, onShippingAddressChange: D.func, onShippingRateChange: D.func, onSavedPaymentMethodRemove: D.func, onSavedPaymentMethodUpdate: D.func, onAvailablePaymentMethodsChange: D.func, options: D.object }, p.displayName = i, p.__elementType = t, p;
}, I = typeof window > "u", os = S.createContext(null);
os.displayName = "EmbeddedCheckoutProviderContext";
var is = function() {
  var t = Xt("calls useStripe()"), a = t.stripe;
  return a;
};
$("auBankAccount", I);
$("card", I);
$("cardNumber", I);
$("cardExpiry", I);
$("cardCvc", I);
$("iban", I);
var ls = $("payment", I);
$("expressCheckout", I);
$("paymentRequestButton", I);
$("linkAuthentication", I);
$("contactDetails", I);
$("address", I);
$("shippingAddress", I);
$("paymentMethodMessaging", I);
$("taxId", I);
$("issuingCardNumberDisplay", I);
$("issuingCardCvcDisplay", I);
$("issuingCardExpiryDisplay", I);
$("issuingCardPinDisplay", I);
$("issuingCardCopyButton", I);
/**
* @license
* SPDX-License-Identifier: Apache-2.0
*/
async function cs() {
  const s2 = j.diaBaseApiUrl;
  try {
    const [t, a, n] = await Promise.all([fetch(`${s2}/quotation/ADA`).then((p) => {
      if (!p.ok) throw new Error(`ADA fetch failed: ${p.status}`);
      return p.json();
    }), fetch(`${s2}/quotation/ETH`).then((p) => {
      if (!p.ok) throw new Error(`ETH fetch failed: ${p.status}`);
      return p.json();
    }), fetch(`${s2}/quotation/EURC`).then((p) => {
      if (!p.ok) throw new Error(`EURC fetch failed: ${p.status}`);
      return p.json();
    })]), i = t == null ? void 0 : t.Price, l = a == null ? void 0 : a.Price, h = n == null ? void 0 : n.Price;
    if (i && l && h) {
      const p = h / i, g = h / l, m = h;
      return console.log("[cryptoService] Live Rates:"), console.log(` - 1 EUR = ${p.toFixed(6)} ADA`), console.log(` - 1 EUR = ${g.toFixed(8)} ETH`), console.log(` - 1 EUR = ${m.toFixed(4)} USDC`), { adaRate: p, ethRate: g, usdcRate: m };
    }
    throw new Error("Missing Price in DIA API responses");
  } catch (t) {
    return console.error("[cryptoService] Failed to fetch live DIA rates, using defaults:", t), { adaRate: 2.22, ethRate: 66e-5, usdcRate: 1.08 };
  }
}
const ds = Ua(j.stripe.publishableKey), Gt = () => [{ id: "stripe", label: "Adyen (Card, Sofort)", icon: Qe, color: "from-indigo-500 to-violet-600", shadow: "shadow-indigo-500/20" }, { id: "wero", label: "Wero (Instant)", icon: Xe, color: "from-purple-500 to-pink-500", shadow: "shadow-purple-500/20" }, { id: "digital_euro", label: "Digital Euro", icon: ht, color: "from-cyan-500 to-blue-600", shadow: "shadow-cyan-500/20" }, { id: "paypal", label: "PayPal", icon: Na, color: "from-blue-500 to-cyan-500", shadow: "shadow-blue-500/20" }, { id: "crypto", label: "Crypto", icon: ba, color: "from-amber-500 to-orange-500", shadow: "shadow-amber-500/20" }], V = (s2) => s2 ? ["lace", "eternl"].includes(s2) : false, Rr = async (s2) => {
  if (s2 && typeof s2 == "object") {
    if (s2 instanceof va) try {
      const t = await s2.context.json();
      if (t && t.error) return t.error;
    } catch (t) {
      console.warn("Failed to parse error response context as JSON:", t);
    }
    return s2.message || String(s2);
  }
  return String(s2);
}, Dr = [{ id: "metamask", name: "MetaMask", color: "bg-[#F6851B] text-white" }, { id: "coinbase", name: "Coinbase Wallet", color: "bg-[#0052FF] text-white" }, { id: "trust", name: "Trust Wallet", color: "bg-[#3375BB] text-white" }, { id: "phantom", name: "Phantom", color: "bg-[#AB9FF2] text-white" }, { id: "lace", name: "Lace (Cardano)", color: "bg-[#0033AD] text-white" }, { id: "eternl", name: "Eternl (Cardano)", color: "bg-[#FF6600] text-white" }], pt = { metamask: { symbol: "ETH", rate: 33e-5 }, coinbase: { symbol: "ETH", rate: 33e-5 }, trust: { symbol: "BNB", rate: 16e-4 }, phantom: { symbol: "SOL", rate: 66e-4 }, lace: { symbol: "ADA", rate: 2.22 }, eternl: { symbol: "ADA", rate: 2.22 } }, Mr = { USDC: { symbol: "USDC", decimals: 6, addresses: { mainnet: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", sepolia: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238" } }, EURC: { symbol: "EURC", decimals: 6, addresses: { mainnet: "0x1aBaEA1f7C830F115f3590b685c7d537f20e7af8", sepolia: "0x08216865A1CDd02929fa757274092557451B38d8" } } };
function js({ onBack: s2, onInitiateStripe: t, onInitiateWero: a, onInitiateDigitalEuro: n, onInitiateCrypto: i, onComplete: l }) {
  var _a2;
  const [h, p] = d.useState(2.22), [g, m] = d.useState(66e-5), [b, w] = d.useState(1.08), [f, v] = d.useState("ETH"), [C, M] = d.useState("ADA"), [P, Z] = d.useState(false);
  d.useEffect(() => {
    let r = true;
    async function o() {
      Z(true);
      try {
        const x = await cs();
        r && (p(x.adaRate), m(x.ethRate), w(x.usdcRate));
      } catch (x) {
        console.error("Failed to load live rates:", x);
      } finally {
        r && Z(false);
      }
    }
    return o(), () => {
      r = false;
    };
  }, []), d.useEffect(() => {
    le(null);
  }, [C]);
  const de = (r) => {
    var _a3;
    if (V(r)) return C === "ADA" ? h : b;
    if (r === "metamask" || r === "coinbase" || r === "trust") {
      if (f === "ETH") return g;
      if (f === "USDC") return b;
      if (f === "EURC") return 1;
    }
    return ((_a3 = pt[r]) == null ? void 0 : _a3.rate) || 1;
  }, { cart: Q } = ua(), { user: A } = pa(), N = d.useMemo(() => Q.reduce((r, o) => {
    const x = o.discount_percentage && o.discount_percentage > 0 ? o.price * (1 - o.discount_percentage / 100) : o.price;
    return r + x * o.cart_quantity;
  }, 0), [Q]), H = d.useMemo(() => Q.reduce((r, o) => r + Number(o.cart_quantity || 0), 0), [Q]), Ze = d.useMemo(() => {
    const r = j.paymentMethods || ["stripe", "adyen", "digital_euro", "worldline", "paypal", "crypto"], o = Gt(), x = o.filter((k) => r.includes(k.id));
    return x.length > 0 ? x : o;
  }, []), [_, bt] = d.useState(() => {
    var _a3;
    return ((_a3 = Ze[0]) == null ? void 0 : _a3.id) || "stripe";
  }), [ie, et] = d.useState("phone"), [ve, vt] = d.useState(""), [Ae, _e] = d.useState(false), [ue, xe] = d.useState(false), [Zt, wt] = d.useState("idle"), [W, er] = d.useState(""), [u, G] = d.useState({ name: "", street: "", city: "", zip: "", phone: "", invoiceEmail: A && !A.is_anonymous && A.email || "", country: "" }), [we, Te] = d.useState(false);
  d.useEffect(() => {
    A && !A.is_anonymous && (A.email && G((o) => o.invoiceEmail ? o : { ...o, invoiceEmail: A.email }), (async () => {
      try {
        if (j.databaseProvider === "supabase") {
          const { data: o, error: x } = await T.from("user_roles").select("name, street, city, zip, phone, country").eq("user_id", A.id || A.$id).maybeSingle();
          o && !x && (G((k) => ({ ...k, name: o.name || k.name, street: o.street || k.street, city: o.city || k.city, zip: o.zip || k.zip, phone: o.phone || k.phone, country: o.country || k.country })), (o.name || o.street || o.city || o.zip || o.phone || o.country) && Te(true));
        }
      } catch (o) {
        console.error("Failed to load saved address:", o);
      }
    })());
  }, [A]);
  const [c, re] = d.useState(null), [K, ke] = d.useState(null), [Re, le] = d.useState(null), [kt, De] = d.useState(false), [tr, jt] = d.useState(false), [Jr, Me] = d.useState(false), [je, Nt] = d.useState(null), [St, Fe] = d.useState(null), [tt, Ne] = d.useState(false), [rt, Yr] = d.useState(null), [Ct, Gr] = d.useState(null), at = d.useRef(null), [Se, Kr] = d.useState(false), [Oe, Qr] = d.useState(""), [$e, Xr] = d.useState(""), Et = !!(u.name && u.street && u.city && u.zip && u.country && u.phone && (_ !== "crypto" || c !== null) && (_ !== "wero" || ie === "qr" || ie === "phone" && ve.trim().length > 6) && (!Se || Oe && $e.length >= 6)), Zr = async (r) => {
    if (V(r)) {
      De(true);
      try {
        const o = window.cardano;
        if (o && o[r]) {
          const k = await (await zt.enable(r)).getChangeAddress();
          k ? (re(r), ke(k), le(null)) : alert(`Connected to ${r}, but no change address found.`);
        } else alert(`${r} wallet extension not found. Please install ${r} to continue.`);
      } catch (o) {
        console.error(`Failed to connect to ${r} wallet:`, o), alert(`Connection to ${r} wallet was rejected or failed. Details: ${(o == null ? void 0 : o.info) || (o == null ? void 0 : o.message) || JSON.stringify(o)}`);
      } finally {
        De(false);
      }
    } else if (r === "metamask" || r === "coinbase" || r === "trust") {
      De(true);
      try {
        const o = window.ethereum;
        if (!o) {
          alert(`${r === "metamask" ? "MetaMask" : r === "coinbase" ? "Coinbase Wallet" : "Trust Wallet"} extension not found. Please install the extension to continue.`), De(false);
          return;
        }
        let x = o;
        o.providers && Array.isArray(o.providers) && (r === "metamask" ? x = o.providers.find((y) => y.isMetaMask) || o : r === "coinbase" ? x = o.providers.find((y) => y.isCoinbaseWallet) || o : r === "trust" && (x = o.providers.find((y) => y.isTrust) || o));
        const k = await x.request({ method: "eth_requestAccounts" });
        if (k && k.length > 0) {
          re(r), ke(k[0]), le(null);
          try {
            const y = await x.request({ method: "eth_chainId" });
            Yr(y);
          } catch (y) {
            console.warn("Failed to get EVM chain ID during connect:", y);
          }
        } else alert("No EVM accounts found.");
      } catch (o) {
        console.error(`Failed to connect to ${r} wallet:`, o), alert(`Connection to ${r} wallet was rejected or failed. Details: ${(o == null ? void 0 : o.message) || JSON.stringify(o)}`);
      } finally {
        De(false);
      }
    } else re(r), ke("0x" + Math.random().toString(16).slice(2, 10) + "..." + Math.random().toString(16).slice(2, 6)), le(null);
  }, ea = async () => {
    var _a3, _b;
    if (c) {
      jt(true);
      try {
        if (V(c)) {
          const o = await (await zt.enable(c)).getBalance();
          if (C === "ADA") {
            const x = ((_a3 = o.find((y) => y.unit === "lovelace")) == null ? void 0 : _a3.quantity) || "0", k = (Number(x) / 1e6).toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            le(`${k} ADA`);
          } else {
            const x = j.cardanoUsdmPolicyAsset || "c4868454a43be0a4f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f5f55553444d", k = ((_b = o.find((X) => X.unit === x)) == null ? void 0 : _b.quantity) || "0", y = (Number(k) / 1e6).toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            le(`${y} USDM`);
          }
        } else if (c === "metamask" || c === "coinbase" || c === "trust") {
          const r = window.ethereum;
          if (r) {
            let o = r;
            r.providers && Array.isArray(r.providers) && (c === "metamask" ? o = r.providers.find((X) => X.isMetaMask) || r : c === "coinbase" ? o = r.providers.find((X) => X.isCoinbaseWallet) || r : c === "trust" && (o = r.providers.find((X) => X.isTrust) || r));
            const x = await o.request({ method: "eth_getBalance", params: [K, "latest"] }), y = (parseInt(x, 16) / 1e18).toFixed(4);
            le(`${y} ${pt[c].symbol}`);
          } else le(`0.0000 ${pt[c].symbol}`);
        } else setTimeout(() => {
          le(`1.25 ${pt[c].symbol}`), jt(false);
        }, 800);
      } catch (r) {
        console.error("Failed to check balance:", r);
      } finally {
        jt(false);
      }
    }
  }, [rr, ta] = d.useState(null), [st, ra] = d.useState(null), [Ie, aa] = d.useState(null), [Pt, ar] = d.useState(false), [sr, nr] = d.useState(null), [nt, or] = d.useState(null), [We, ir] = d.useState(null), [lr, At] = d.useState(null), [cr, _t] = d.useState(null), [ot, Tt] = d.useState(null), [Ue, Rt] = d.useState(null), [Dt, dr] = d.useState(false), [it, Mt] = d.useState(null), [ur, Ft] = d.useState(null), [qe, Ot] = d.useState(null), [$t, pr] = d.useState(false), he = d.useRef(false);
  d.useEffect(() => () => {
    if (he.current) return;
    const r = Ie || We || Ue || qe;
    r && (async () => {
      try {
        await T.rpc("cancel_order_with_inventory", { p_order_id: r });
      } catch (x) {
        console.error("Failed to cancel order on unmount:", x);
      }
    })();
  }, [Ie, We, Ue, qe]);
  const sa = async (r) => {
    var _a3, _b;
    const o = `${u.name}
${u.street}
${u.city}, ${u.zip}
${u.country}`.trim();
    if (!o || !u.phone) return;
    if (we && A && !A.is_anonymous) try {
      j.databaseProvider === "supabase" && await T.from("user_roles").update({ name: u.name, street: u.street, city: u.city, zip: u.zip, phone: u.phone, country: u.country, is_guest: false }).eq("user_id", A.id || A.$id);
    } catch (y) {
      console.error("Failed to save address to user_roles:", y);
    }
    const x = Se ? { email: Oe, password: $e } : void 0, k = ((_a3 = u.invoiceEmail) == null ? void 0 : _a3.trim()) || void 0;
    if (_ === "stripe") {
      ar(true);
      try {
        const y = await t(o, u.phone, x, k);
        j.activeFiatGateway === "adyen" && (nr(y.clientSecret), or(y.paymentId), ir(y.orderId || null));
      } catch (y) {
        console.error("Failed to initiate Adyen payment:", y);
      } finally {
        ar(false);
      }
    } else if (_ === "wero" || _ === "worldline") {
      dr(true);
      try {
        const y = await a(o, u.phone, ve, ie, x, k);
        Tt(y.paymentId), At(y.qrCodeData), _t(y.redirectUrl), Rt(y.orderId || null);
      } catch (y) {
        console.error("Failed to initiate Wero payment:", y);
      } finally {
        dr(false);
      }
    } else if (_ === "digital_euro") {
      pr(true);
      try {
        const y = await n(o, u.phone, x, k);
        Mt(y.paymentId), Ft(y.redirectUrl), Ot(y.orderId || null);
      } catch (y) {
        console.error("Failed to initiate Digital Euro payment:", y);
      } finally {
        pr(false);
      }
    } else if (_ === "crypto" && (V(c) || c === "metamask" || c === "coinbase" || c === "trust")) {
      Me(true), Fe(null), Ne(false);
      const y = de(c), X = Se ? { email: Oe, password: $e } : void 0, lt = ((_b = u.invoiceEmail) == null ? void 0 : _b.trim()) || void 0;
      try {
        const ge = V(c), ia = ge ? C : f, la = ge || f === "ETH" ? 6 : 2, Be = await i(o, u.phone, { txHash: "", customerAddress: K || "", walletName: c, adaAmount: (N * y).toFixed(la), rateUsed: y, coinSymbol: ia }, X, lt), ee = Be.paymentId;
        Gr(ee);
        const { data: xr, error: It } = await T.functions.invoke("cardano-x402-checkout", { body: { payment_id: ee } });
        if (It || !xr) {
          const q = It ? await Rr(It) : "Failed to retrieve x402 payment requirements from Edge function.";
          throw new Error(q);
        }
        const { amount: Le, asset: J, payTo: Wt } = xr.requirements;
        if (V(c)) {
          const q = await zt.enable(c), ae = await q.getUtxos();
          console.log("DEBUG [Cardano UTxOs]:", JSON.stringify(ae, null, 2));
          const se = await q.getBalance();
          console.log("DEBUG [Cardano Balance]:", JSON.stringify(se, null, 2));
          const ce = await q.getChangeAddress();
          console.log("DEBUG [Cardano Change Address]:", ce);
          const ne = new wa(), oe = BigInt(Le), Ce = J === "lovelace" ? oe < 1000000n ? 1000000n : oe : 1000000n, ye = BigInt(j.x402CardanoNetworkFeeLovelace || 2e5), E = Ce + ye, R = J === "lovelace" ? 0n : oe;
          let B = 0n, U = 0n;
          const z = [], Y = [...ae].sort((F, fe) => {
            var _a4, _b2, _c, _d;
            if (J !== "lovelace") {
              const Ee = BigInt(((_a4 = F.output.amount.find((Bt) => Bt.unit === J)) == null ? void 0 : _a4.quantity) || "0"), br = BigInt(((_b2 = fe.output.amount.find((Bt) => Bt.unit === J)) == null ? void 0 : _b2.quantity) || "0");
              if (Ee !== br) return Ee < br ? 1 : -1;
            }
            const pe = BigInt(((_c = F.output.amount.find((Ee) => Ee.unit === "lovelace")) == null ? void 0 : _c.quantity) || "0"), qt = BigInt(((_d = fe.output.amount.find((Ee) => Ee.unit === "lovelace")) == null ? void 0 : _d.quantity) || "0");
            return pe < qt ? 1 : -1;
          });
          for (const F of Y) {
            const fe = F.output.amount.find((pe) => pe.unit === "lovelace");
            if (fe) {
              if (z.push(F), B += BigInt(fe.quantity), J !== "lovelace") {
                const pe = F.output.amount.find((qt) => qt.unit === J);
                pe && (U += BigInt(pe.quantity));
              }
              if (B >= E && (J === "lovelace" || U >= R)) break;
            }
          }
          if (B < E) throw new Error(`Insufficient ADA in wallet. Required: ${(Number(E) / 1e6).toFixed(2)} ADA, Available: ${(Number(B) / 1e6).toFixed(2)} ADA`);
          if (J !== "lovelace" && U < R) throw new Error(`Insufficient USDM in wallet. Required: ${(Number(R) / 1e6).toFixed(2)} USDM, Available: ${(Number(U) / 1e6).toFixed(2)} USDM`);
          for (const F of z) ne.txIn(F.input.txHash, F.input.outputIndex, F.output.amount, F.output.address);
          J === "lovelace" ? ne.txOut(Wt, [{ unit: "lovelace", quantity: Ce.toString() }]) : ne.txOut(Wt, [{ unit: "lovelace", quantity: Ce.toString() }, { unit: J, quantity: Le }]);
          const te = B - Ce - ye;
          if (te > 0n) if (J !== "lovelace" && U > R) {
            const F = U - R;
            ne.txOut(ce, [{ unit: "lovelace", quantity: te.toString() }, { unit: J, quantity: F.toString() }]);
          } else ne.txOut(ce, [{ unit: "lovelace", quantity: te.toString() }]);
          ne.setFee(ye.toString());
          const Ut = ne.completeUnbalancedSync(), hr = await q.signTx(Ut), { data: ct, error: He } = await T.functions.invoke("cardano-x402-checkout", { body: { action: "submit_tx", txHex: hr } });
          if (He || !(ct == null ? void 0 : ct.success)) {
            const F = He ? await Rr(He) : "Failed to submit transaction via x402 edge function.";
            throw new Error(F);
          }
          const ze = ct.txHash;
          Nt(ze), Ne(true);
          let gr = false, yr = false;
          const ca = (j.cryptoPaymentTimeoutMinutes || 3) * 60 * 1e3, fr = setTimeout(async () => {
            if (yr = true, Ne(false), Me(false), Fe(`Crypto payment confirmation timed out after ${j.cryptoPaymentTimeoutMinutes || 3} minutes.`), ee && j.databaseProvider === "supabase") try {
              await T.from("payments").update({ provider_status: "expired", completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", ee);
            } catch (F) {
              console.error("Failed to mark payment as expired:", F);
            }
            if (Be.orderId && j.databaseProvider === "supabase") try {
              await T.rpc("cancel_order_with_inventory", { p_order_id: Be.orderId });
            } catch (F) {
              console.error("Failed to cancel order on timeout:", F);
            }
          }, ca);
          for (at.current = fr; !gr && !yr; ) {
            const { data: F, error: fe } = await T.functions.invoke("cardano-x402-checkout", { body: { action: "confirm", payment_id: ee, txHash: ze } });
            if (!fe && (F == null ? void 0 : F.status) === "succeeded") {
              gr = true, clearTimeout(fr), he.current = true, l(_, o, u.phone, X, lt, void 0, void 0, { txHash: ze, customerAddress: K || "", walletName: c || "lace", adaAmount: (Number(Le) / 1e6).toString(), rateUsed: y, paymentId: ee });
              break;
            }
            await new Promise((pe) => setTimeout(pe, 5e3));
          }
        } else {
          const q = window.ethereum;
          if (!q) throw new Error("No EVM wallet extension detected.");
          let ae = q;
          q.providers && Array.isArray(q.providers) && (c === "metamask" ? ae = q.providers.find((E) => E.isMetaMask) || q : c === "coinbase" ? ae = q.providers.find((E) => E.isCoinbaseWallet) || q : c === "trust" && (ae = q.providers.find((E) => E.isTrust) || q));
          let se = "", ce = "", ne = false;
          try {
            console.log("Fetching cross-chain swap details from DLN API...");
            let E = "", R = 18;
            if (f === "ETH") E = "0x0000000000000000000000000000000000000000", R = 18;
            else {
              const Y = rt === "0x1", te = Mr[f];
              E = Y ? te.addresses.mainnet : te.addresses.sepolia, R = te.decimals;
            }
            const B = new URLSearchParams({ srcChainId: rt === "0x1" ? "1" : "11155111", srcChainTokenIn: E, srcChainTokenInAmount: Math.round(N * y * Math.pow(10, R)).toString(), dstChainId: "cardano", dstChainTokenOut: J === "lovelace" ? "ADA" : "USDM", dstChainTokenOutRecipient: Wt, dstChainTokenOutAmount: Le }), U = await fetch(`https://api.dln.trade/v1.0/dln/order/create-tx?${B}`);
            if (!U.ok) throw new Error(`DLN API status: ${U.status}`);
            const z = await U.json();
            if (!z.tx) throw new Error("No transaction details in DLN response.");
            console.log("Sending cross-chain bridge transaction via MetaMask..."), se = await ae.request({ method: "eth_sendTransaction", params: [{ from: K, to: z.tx.to, data: z.tx.data, value: z.tx.value || "0x0" }] }), ne = true;
          } catch (E) {
            console.warn("Failed to create cross-chain swap, falling back to direct native/ERC20 EVM payment:", E);
            const R = j.cryptoReceiverAddresses[c];
            if (!R) throw new Error(`Receiver address not configured for wallet: ${c}`);
            if (f === "ETH") {
              const B = N * y, Y = "0x" + Math.round(B * Math.pow(10, 18)).toString(16);
              se = await ae.request({ method: "eth_sendTransaction", params: [{ from: K, to: R, value: Y }] });
            } else {
              const B = rt === "0x1", U = Mr[f], z = B ? U.addresses.mainnet : U.addresses.sepolia, Y = N * y, te = BigInt(Math.round(Y * Math.pow(10, U.decimals))), Ut = "a9059cbb", ct = (R.startsWith("0x") ? R.slice(2) : R).padStart(64, "0"), He = te.toString(16).padStart(64, "0"), ze = "0x" + Ut + ct + He;
              se = await ae.request({ method: "eth_sendTransaction", params: [{ from: K, to: z, data: ze, value: "0x0" }] });
            }
          }
          if (!se) throw new Error("Transaction was rejected or failed to generate hash.");
          Nt(se), Ne(true);
          let oe = false;
          const Ce = (j.cryptoPaymentTimeoutMinutes || 3) * 60 * 1e3, ye = setTimeout(async () => {
            if (oe = true, Ne(false), Me(false), Fe(`Crypto payment confirmation timed out after ${j.cryptoPaymentTimeoutMinutes || 3} minutes.`), ee && j.databaseProvider === "supabase") try {
              await T.from("payments").update({ provider_status: "expired", completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", ee);
            } catch (E) {
              console.error("Failed to update expired payment:", E);
            }
            if (Be.orderId && j.databaseProvider === "supabase") try {
              await T.rpc("cancel_order_with_inventory", { p_order_id: Be.orderId });
            } catch (E) {
              console.error("Failed to cancel order on timeout:", E);
            }
          }, Ce);
          if (at.current = ye, ne) {
            let E = 0;
            const R = 60;
            for (; E < R && !oe; ) {
              const z = await fetch(`https://api.dln.trade/v1.0/dln/order/status?txHash=${se}`);
              if (z.ok) {
                const Y = await z.json();
                if (Y.dstTxHash) {
                  ce = Y.dstTxHash, Nt(ce);
                  break;
                }
              }
              E++, await new Promise((Y) => setTimeout(Y, 5e3));
            }
            if (!ce && !oe) throw new Error("Bridge timed out waiting to submit transaction to Cardano.");
            let B = false, U = 0;
            for (; !B && U < 30 && !oe; ) {
              const { data: z, error: Y } = await T.functions.invoke("cardano-x402-checkout", { body: { action: "confirm", payment_id: ee, txHash: ce } });
              if (!Y && (z == null ? void 0 : z.status) === "succeeded") {
                B = true, clearTimeout(ye), he.current = true, l(_, o, u.phone, X, lt, void 0, void 0, { txHash: ce, customerAddress: K || "", walletName: c, adaAmount: (Number(Le) / 1e6).toString(), rateUsed: y, paymentId: ee });
                break;
              }
              U++, await new Promise((te) => setTimeout(te, 5e3));
            }
            if (!B && !oe) throw new Error("Cardano verification on-chain timed out.");
          } else {
            let E = false;
            for (; !E && !oe; ) {
              const R = await ae.request({ method: "eth_getTransactionReceipt", params: [se] });
              if (R) if (R.status === "0x1" || R.status === 1 || R.status === true) {
                E = true, clearTimeout(ye), he.current = true, l(_, o, u.phone, X, lt, void 0, void 0, { txHash: se, customerAddress: K || "", walletName: c, adaAmount: (N * y).toFixed(f === "ETH" ? 6 : 2), rateUsed: y, paymentId: ee, coinSymbol: f });
                break;
              } else throw new Error("EVM transaction failed or reverted.");
              await new Promise((B) => setTimeout(B, 5e3));
            }
          }
        }
      } catch (ge) {
        console.error("Crypto payment failed:", ge), Fe((ge == null ? void 0 : ge.message) || (ge == null ? void 0 : ge.info) || JSON.stringify(ge));
      } finally {
        Me(false);
      }
    } else l(_, o, u.phone, x, k, r);
  }, na = async () => {
    await sa();
  }, oa = async () => {
    var _a3;
    at.current && clearTimeout(at.current), Me(false), Ne(false), he.current = true;
    const r = je || `tx_mock_${Math.random().toString(36).substring(2, 11)}`, o = de(c || "lace"), x = (N * o).toFixed(6);
    if (Ct && j.databaseProvider === "supabase") try {
      await T.from("payments").update({ provider_status: "succeeded", completed_at: (/* @__PURE__ */ new Date()).toISOString(), amount_paid: Math.round(N * 100), provider_payment_id: r }).eq("id", Ct);
    } catch (k) {
      console.error("Failed to update payment status to succeeded in simulation:", k);
    }
    l(_, `${u.name}
${u.street}
${u.city}, ${u.zip}
${u.country}`.trim(), u.phone, Se ? { email: Oe, password: $e } : void 0, ((_a3 = u.invoiceEmail) == null ? void 0 : _a3.trim()) || void 0, void 0, void 0, { txHash: r, customerAddress: K || "0xMockCustomerAddress", walletName: c || "lace", adaAmount: x, rateUsed: o, paymentId: Ct || void 0 });
  }, mr = Gt().find((r) => r.id === _) || Gt()[0];
  return e.jsxs("div", { className: "min-h-screen bg-background transition-colors duration-500 overflow-x-hidden", children: [e.jsx("div", { className: "bg-card text-card-foreground border-b border-gray-100 dark:border-slate-800 sticky top-0 z-30 transition-colors", children: e.jsxs("div", { className: "max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center gap-3 sm:gap-4", children: [e.jsx("button", { onClick: s2, className: "p-2 sm:p-2.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-all text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white active:scale-95 shrink-0", children: e.jsx(ka, { className: "w-5 h-5" }) }), e.jsxs("div", { className: "flex-grow min-w-0", children: [e.jsx("h1", { className: "text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight truncate", children: "Checkout" }), e.jsxs("p", { className: "text-[10px] sm:text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-wide truncate", children: [H, " item", H !== 1 ? "s" : "", " in your order"] })] }), e.jsxs("div", { className: "flex items-center gap-1 sm:gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shrink-0", children: [e.jsx(Ye, { className: "w-3 h-3 sm:w-3.5 sm:h-3.5" }), e.jsx("span", { className: "text-[9px] sm:text-[10px] font-bold uppercase tracking-widest hidden sm:inline", children: "Secure" })] })] }) }), e.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: [e.jsx("div", { className: "flex items-center justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8", children: ["Shipping", "Payment", "Confirm"].map((r, o) => e.jsxs("div", { className: "flex items-center gap-2", children: [e.jsxs("div", { className: `flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all ${o <= 1 ? "bg-gray-900 dark:bg-indigo-600 text-white" : "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-500"}`, children: [e.jsx("span", { className: "w-4 h-4 flex items-center justify-center text-[10px] rounded-full bg-white/20", children: o + 1 }), e.jsx("span", { className: "hidden sm:inline", children: r })] }), o < 2 && e.jsx(ma, { className: "w-4 h-4 text-gray-300" })] }, r)) }), e.jsxs("div", { className: "grid lg:grid-cols-12 gap-6 sm:gap-8 items-start", children: [e.jsxs("div", { className: "lg:col-span-7 space-y-6", children: [e.jsxs(O.section, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "bg-card text-card-foreground rounded-[1rem] border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm transition-colors", children: [e.jsxs("div", { className: "px-4 sm:px-7 py-4 sm:py-5 border-b border-gray-50 dark:border-slate-800 flex items-center gap-3", children: [e.jsx("div", { className: "p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl transition-colors", children: e.jsx(xa, { className: "w-5 h-5" }) }), e.jsxs("div", { children: [e.jsx("h2", { className: "text-base font-extrabold text-gray-900 dark:text-white tracking-tight", children: "Shipping Address" }), e.jsx("p", { className: "text-[11px] font-medium text-gray-400 dark:text-gray-500", children: "Where should we deliver your order?" })] })] }), e.jsxs("div", { className: "p-4 sm:p-7 grid sm:grid-cols-2 gap-4 sm:gap-5", children: [e.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [e.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1", children: [e.jsx(ha, { className: "w-3 h-3" }), " Full Name"] }), e.jsx("input", { type: "text", value: u.name, onChange: (r) => G((o) => ({ ...o, name: r.target.value })), placeholder: "John Doe", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), e.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [e.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1", children: [e.jsx(ga, { className: "w-3 h-3" }), " Street Address"] }), e.jsx("input", { type: "text", value: u.street, onChange: (r) => G((o) => ({ ...o, street: r.target.value })), placeholder: "123 Magic Avenue", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), e.jsxs("div", { className: "space-y-1.5", children: [e.jsx("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5", children: "City" }), e.jsx("input", { type: "text", value: u.city, onChange: (r) => G((o) => ({ ...o, city: r.target.value })), placeholder: "Magical Product town", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), e.jsxs("div", { className: "space-y-1.5", children: [e.jsx("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5", children: "ZIP Code" }), e.jsx("input", { type: "text", value: u.zip, onChange: (r) => G((o) => ({ ...o, zip: r.target.value })), placeholder: "12345", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), e.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [e.jsx("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5", children: "Country" }), e.jsxs("select", { value: u.country, onChange: (r) => G((o) => ({ ...o, country: r.target.value })), className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium text-gray-900 dark:text-white", children: [e.jsx("option", { value: "", children: "Select a country" }), e.jsx("option", { value: "FR", children: "France" }), e.jsx("option", { value: "DE", children: "Germany" }), e.jsx("option", { value: "BE", children: "Belgium" }), e.jsx("option", { value: "NL", children: "Netherlands" }), e.jsx("option", { value: "ES", children: "Spain" }), e.jsx("option", { value: "IT", children: "Italy" }), e.jsx("option", { value: "GB", children: "United Kingdom" }), e.jsx("option", { value: "US", children: "United States" })] })] }), e.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [e.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1", children: [e.jsx(ja, { className: "w-3 h-3" }), " Mobile or WhatsApp Number"] }), e.jsx("input", { type: "tel", value: u.phone, onChange: (r) => G((o) => ({ ...o, phone: r.target.value })), placeholder: "+1 (555) 000-0000", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), e.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [e.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1", children: [e.jsx(vr, { className: "w-3 h-3" }), " Email for Invoice ", e.jsx("span", { className: "text-gray-300 dark:text-gray-600 normal-case font-medium", children: "(optional)" })] }), e.jsx("input", { type: "email", value: u.invoiceEmail, onChange: (r) => G((o) => ({ ...o, invoiceEmail: r.target.value })), placeholder: "your@email.com", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), A && !A.is_anonymous && e.jsx("div", { className: "sm:col-span-2 pt-2", children: e.jsxs("label", { className: "flex items-center gap-3 p-4 bg-indigo-50/30 dark:bg-indigo-900/10 border border-indigo-100/50 dark:border-indigo-900/30 rounded-2xl cursor-pointer hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group", children: [e.jsxs("div", { className: "relative flex items-center justify-center mt-0.5", children: [e.jsx("input", { type: "checkbox", checked: we, onChange: (r) => Te(r.target.checked), className: "peer appearance-none w-5 h-5 border-2 border-indigo-300 dark:border-indigo-700 rounded bg-white dark:bg-slate-800 checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" }), e.jsx(Ge, { className: "w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" })] }), e.jsxs("div", { children: [e.jsx("h4", { className: "text-xs font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors", children: "Save address for faster checkout later" }), e.jsx("p", { className: "text-[10px] text-gray-500 dark:text-gray-400 mt-0.5", children: "We will save your name, street, city, ZIP, country, and phone number to your profile." })] })] }) })] })] }), e.jsxs(O.section, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "bg-card text-card-foreground rounded-[1rem] border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm transition-colors", children: [e.jsxs("div", { className: "px-4 sm:px-7 py-4 sm:py-5 border-b border-gray-50 dark:border-slate-800 flex items-center gap-3", children: [e.jsx("div", { className: "p-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl transition-colors", children: e.jsx(Qe, { className: "w-5 h-5" }) }), e.jsxs("div", { children: [e.jsx("h2", { className: "text-base font-extrabold text-gray-900 dark:text-white tracking-tight", children: "Payment Method" }), e.jsx("p", { className: "text-[11px] font-medium text-gray-400 dark:text-gray-500", children: "Choose how you'd like to pay" })] })] }), e.jsxs("div", { className: "p-4 sm:p-7", children: [e.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-5 sm:mb-6", children: Ze.map((r) => e.jsxs(O.button, { onClick: () => bt(r.id), whileTap: { scale: 0.96 }, className: `relative flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 overflow-hidden ${_ === r.id ? `border-transparent text-white shadow-lg ${r.shadow}` : "border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 text-gray-400 dark:text-gray-500 hover:border-gray-200 dark:hover:border-slate-600 hover:text-gray-600 dark:hover:text-gray-300"}`, children: [_ === r.id && e.jsx(O.div, { layoutId: "payment-bg", className: `absolute inset-0 bg-gradient-to-br ${r.color}`, transition: { type: "spring", stiffness: 300, damping: 25 } }), e.jsx(r.icon, { className: "w-5 h-5 sm:w-6 sm:h-6 relative z-10" }), e.jsx("span", { className: "text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest relative z-10", children: r.label })] }, r.id)) }), e.jsxs(Lt, { mode: "wait", children: [_ === "stripe" && e.jsx(O.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "space-y-4 overflow-hidden py-2", children: e.jsxs("div", { className: "p-4 bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl flex flex-col items-center text-center gap-3", children: [e.jsx(Qe, { className: "w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-pulse" }), e.jsxs("div", { children: [e.jsx("p", { className: "text-sm font-bold text-gray-800 dark:text-gray-200", children: "Secure Adyen Checkout" }), e.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm", children: "Click 'Confirm Order' to proceed to the secure, encrypted Adyen checkout page." })] })] }) }, "stripe-fields"), _ === "paypal" && e.jsx(O.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "overflow-hidden", children: e.jsx("div", { className: "p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 transition-colors text-center", children: e.jsx("p", { className: "text-sm font-semibold text-blue-700 dark:text-blue-300", children: "You'll be redirected to PayPal to complete payment." }) }) }, "paypal-info"), _ === "crypto" && e.jsx(O.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "overflow-hidden", children: e.jsxs("div", { className: "p-4 sm:p-5 bg-gradient-to-b from-amber-50/50 to-amber-50 rounded-2xl border border-amber-200/60 flex flex-col gap-3 sm:gap-4", children: [e.jsxs("div", { className: "text-center", children: [e.jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-600 rounded-full mb-3", children: e.jsx(kr, { className: "w-6 h-6" }) }), e.jsx("h3", { className: "text-sm font-extrabold text-amber-900 tracking-tight", children: "Connect Web3 Wallet" }), e.jsx("p", { className: "text-[11px] font-medium text-amber-700/70 mt-1", children: "Select a wallet to proceed with crypto payment." })] }), e.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5", children: Dr.map((r) => e.jsxs("button", { onClick: () => Zr(r.id), disabled: kt, className: `relative flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl font-bold text-[10px] sm:text-xs transition-all duration-200 ${c === r.id ? `${r.color} ring-2 ring-offset-2 ring-amber-400 shadow-md` : "bg-white text-gray-700 border border-amber-100 hover:border-amber-300 hover:bg-amber-50/50"} ${kt ? "opacity-50 cursor-not-allowed" : ""}`, children: [e.jsxs("span", { className: "truncate mr-2", children: [r.name, " ", kt && r.id === "lace" ? "(Connecting...)" : ""] }), c === r.id && e.jsx(Ge, { className: "w-4 h-4 shrink-0" })] }, r.id)) }), c && e.jsxs(O.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "mt-2 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-amber-200/50 text-center space-y-3", children: [e.jsxs("div", { children: [e.jsxs("p", { className: "text-xs font-semibold text-amber-800", children: ["Connected to ", (_a2 = Dr.find((r) => r.id === c)) == null ? void 0 : _a2.name] }), K && e.jsx("p", { className: "text-[10px] font-mono text-amber-600/80 mt-1 bg-amber-100/50 block px-2 py-1 rounded break-all select-all", children: K }), e.jsx("div", { className: "mt-3", children: Re ? e.jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-lg border border-green-200/50", children: [e.jsx(wr, { className: "w-3.5 h-3.5" }), Re] }) : e.jsxs("button", { onClick: ea, disabled: tr, className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50", children: [e.jsx(wr, { className: "w-3.5 h-3.5" }), tr ? "Checking..." : "Check Balance"] }) })] }), V(c) && e.jsxs("div", { className: "mt-4 text-left space-y-1.5 border-t border-amber-200/30 pt-3", children: [e.jsx("label", { className: "text-[10px] font-bold text-amber-700/70 uppercase tracking-wider block", children: "Pay With Token" }), e.jsx("div", { className: "grid grid-cols-2 gap-2", children: ["ADA", "USDM"].map((r) => e.jsx("button", { onClick: () => M(r), className: `px-2 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wide transition-all duration-150 border ${C === r ? "bg-amber-600 text-white border-amber-700 shadow-sm" : "bg-white text-gray-700 border-amber-200/50 hover:bg-amber-50"}`, children: r }, r)) })] }), !V(c) && e.jsxs("div", { className: "mt-4 text-left space-y-1.5 border-t border-amber-200/30 pt-3", children: [e.jsx("label", { className: "text-[10px] font-bold text-amber-700/70 uppercase tracking-wider block", children: "Pay With Token" }), e.jsx("div", { className: "grid grid-cols-3 gap-2", children: ["ETH", "USDC", "EURC"].map((r) => e.jsx("button", { onClick: () => v(r), className: `px-2 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wide transition-all duration-150 border ${f === r ? "bg-amber-600 text-white border-amber-700 shadow-sm" : "bg-white text-gray-700 border-amber-200/50 hover:bg-amber-50"}`, children: r }, r)) })] }), e.jsxs("div", { className: "pt-3 border-t border-amber-200/50 text-left space-y-2", children: [e.jsx("p", { className: "text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-1", children: "Payment Details" }), e.jsxs("div", { className: "flex justify-between items-center bg-amber-50/80 px-3 py-2 rounded-lg", children: [e.jsx("span", { className: "text-xs font-medium text-amber-700", children: "Amount Due" }), e.jsxs("span", { className: "text-sm font-extrabold text-amber-900", children: [(N * de(c)).toFixed(V(c) ? C === "ADA" ? 4 : 2 : f === "ETH" ? 4 : 2), " ", V(c) ? C : f] })] }), e.jsxs("div", { className: "bg-amber-50/80 px-3 py-2 rounded-lg space-y-1", children: [e.jsx("span", { className: "text-[10px] font-bold text-amber-700/70 uppercase tracking-wider", children: "Send to Address" }), e.jsx("p", { className: "text-xs font-mono text-amber-900 break-all select-all bg-white/50 p-1.5 rounded", children: V(c) ? j.cryptoReceiverAddresses.lace : j.cryptoReceiverAddresses[c] })] })] })] })] }) }, "crypto-info"), _ === "wero" && e.jsx(O.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "overflow-hidden", children: e.jsxs("div", { className: "p-4 sm:p-5 bg-gradient-to-b from-purple-50/50 to-purple-50 rounded-2xl border border-purple-200/60 flex flex-col gap-3 sm:gap-4", children: [e.jsxs("div", { className: "text-center", children: [e.jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full mb-3 animate-pulse", children: e.jsx(Xe, { className: "w-6 h-6" }) }), e.jsx("h3", { className: "text-sm font-extrabold text-purple-900 tracking-tight", children: "Wero Instant Transfer" }), e.jsx("p", { className: "text-[11px] font-medium text-purple-700/70 mt-1", children: "Pay instantly and securely from your banking app." })] }), e.jsxs("div", { className: "flex gap-2 p-1 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-200/50", children: [e.jsx("button", { type: "button", onClick: () => et("phone"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${ie === "phone" ? "bg-purple-600 text-white shadow-sm font-black" : "text-purple-600/70 hover:text-purple-700 hover:bg-purple-50/30"}`, children: "Phone Number" }), e.jsx("button", { type: "button", onClick: () => et("qr"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${ie === "qr" ? "bg-purple-600 text-white shadow-sm font-black" : "text-purple-600/70 hover:text-purple-700 hover:bg-purple-50/30"}`, children: "QR Code" })] }), ie === "phone" ? e.jsxs("div", { className: "space-y-1.5 text-left bg-white/40 p-3.5 rounded-xl border border-purple-200/30", children: [e.jsxs("label", { className: "text-[10px] font-bold text-purple-400 dark:text-purple-500 uppercase tracking-widest ml-0.5 flex items-center gap-1", children: [e.jsx(Xe, { className: "w-3 h-3" }), " Wero Registered Phone"] }), e.jsx("input", { type: "tel", value: ve, onChange: (r) => vt(r.target.value), placeholder: "+33 6 12 34 56 78", className: "w-full px-4 py-3 bg-white border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all text-sm font-medium text-gray-800" }), e.jsx("p", { className: "text-[9px] text-purple-600/60 font-semibold mt-1", children: "Ensure this phone number is registered with Wero in your bank app." })] }) : e.jsxs("div", { className: "p-4 bg-white/40 text-center rounded-xl border border-purple-200/30 space-y-1", children: [e.jsx(Fr, { className: "w-8 h-8 text-purple-600 mx-auto opacity-80" }), e.jsx("p", { className: "text-xs font-bold text-purple-900", children: "QR Code Checkout" }), e.jsx("p", { className: "text-[10px] text-purple-700/60 leading-relaxed", children: "A checkout QR code will generate for you to scan and authorize in your banking app." })] })] }) }, "wero-info"), _ === "digital_euro" && e.jsx(O.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "overflow-hidden", children: e.jsxs("div", { className: "p-4 sm:p-5 bg-gradient-to-b from-cyan-50/60 to-blue-50 rounded-2xl border border-cyan-200/70 flex flex-col gap-3 sm:gap-4", children: [e.jsxs("div", { className: "text-center", children: [e.jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 bg-cyan-100 text-cyan-700 rounded-full mb-3", children: e.jsx(ht, { className: "w-6 h-6" }) }), e.jsx("h3", { className: "text-sm font-extrabold text-cyan-950 tracking-tight", children: "Digital Euro Sandbox" }), e.jsx("p", { className: "text-[11px] font-medium text-cyan-800/70 mt-1", children: "Simulates a future PSP-hosted Digital Euro authorization flow for testing checkout plumbing." })] }), e.jsxs("div", { className: "grid grid-cols-2 gap-2 text-left", children: [e.jsxs("div", { className: "bg-white/60 border border-cyan-100 rounded-xl p-3", children: [e.jsx("p", { className: "text-[9px] font-black uppercase tracking-wider text-cyan-500", children: "Currency" }), e.jsx("p", { className: "text-sm font-extrabold text-cyan-950 mt-0.5", children: "EUR" })] }), e.jsxs("div", { className: "bg-white/60 border border-cyan-100 rounded-xl p-3", children: [e.jsx("p", { className: "text-[9px] font-black uppercase tracking-wider text-cyan-500", children: "Mode" }), e.jsx("p", { className: "text-sm font-extrabold text-cyan-950 mt-0.5", children: "Sandbox" })] })] })] }) }, "digital-euro-info")] })] })] })] }), e.jsx("div", { className: "lg:col-span-5 relative", children: e.jsxs(O.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.15 }, className: "sticky top-24 rounded-[1rem] overflow-hidden", children: [e.jsxs("div", { className: "bg-gradient-to-b from-gray-900 to-gray-950 text-white p-5 sm:p-7 relative", children: [e.jsx("div", { className: "absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" }), e.jsxs("div", { className: "flex items-center justify-between mb-6 relative", children: [e.jsx("h2", { className: "text-lg font-extrabold tracking-tight", children: "Order Summary" }), e.jsxs("span", { className: "text-[10px] font-bold text-white/40 uppercase tracking-widest bg-white/[0.06] px-2.5 py-1 rounded-full", children: [H, " item", H !== 1 ? "s" : ""] })] }), e.jsx("div", { className: "space-y-3 mb-6 max-h-[280px] overflow-y-auto pr-1 relative", style: { scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }, children: Q.map((r, o) => e.jsxs(O.div, { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.2 + o * 0.05 }, className: "flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] transition-colors group", children: [e.jsx("div", { className: "w-11 h-11 rounded-lg overflow-hidden bg-white/[0.08] flex-shrink-0 flex items-center justify-center", children: e.jsx("img", { src: r.image_url, alt: r.title, className: "w-full h-full object-contain p-1", referrerPolicy: "no-referrer" }) }), e.jsxs("div", { className: "min-w-0 flex-grow", children: [e.jsx("h4", { className: "font-bold text-sm truncate text-white/90", children: r.title }), e.jsxs("p", { className: "text-[11px] text-white/30 font-medium tabular-nums", children: [r.cart_quantity, " \xD7 ", j.currency_symbol, (r.discount_percentage && r.discount_percentage > 0 ? r.price * (1 - r.discount_percentage / 100) : r.price).toFixed(2)] })] }), e.jsxs("div", { className: "font-bold text-sm tabular-nums text-white/70 group-hover:text-white transition-colors", children: [j.currency_symbol, (r.cart_quantity * (r.discount_percentage && r.discount_percentage > 0 ? r.price * (1 - r.discount_percentage / 100) : r.price)).toFixed(2)] })] }, r.id)) }), e.jsxs("div", { className: "space-y-2.5 pt-5 border-t border-white/[0.06]", children: [e.jsxs("div", { className: "flex justify-between text-sm", children: [e.jsx("span", { className: "text-white/40 font-medium", children: "Subtotal" }), e.jsxs("span", { className: "text-white/70 font-bold tabular-nums", children: [j.currency_symbol, N.toFixed(2)] })] }), e.jsxs("div", { className: "flex justify-between text-sm", children: [e.jsx("span", { className: "text-white/40 font-medium", children: "Shipping" }), e.jsx("span", { className: "text-emerald-400 font-bold text-xs bg-emerald-400/10 px-2 py-0.5 rounded-full uppercase tracking-widest", children: "Free" })] }), e.jsx("div", { className: "h-px bg-white/[0.06] my-1" }), e.jsxs("div", { className: "flex justify-between items-baseline pt-2", children: [e.jsx("span", { className: "font-extrabold text-white/60 text-sm", children: "Total" }), e.jsxs(O.span, { initial: { scale: 1.08 }, animate: { scale: 1 }, className: "text-xl sm:text-3xl font-black tabular-nums bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent", children: [j.currency_symbol, N.toFixed(2)] }, N)] })] })] }), (A == null ? void 0 : A.is_anonymous) && e.jsxs("div", { className: "p-5 bg-indigo-50/50 dark:bg-indigo-900/10 border-x border-gray-100 dark:border-slate-800 transition-colors", children: [e.jsxs("label", { className: "flex items-start gap-3 cursor-pointer group", children: [e.jsxs("div", { className: "relative flex items-center justify-center mt-0.5", children: [e.jsx("input", { type: "checkbox", checked: Se, onChange: (r) => Kr(r.target.checked), className: "peer appearance-none w-5 h-5 border-2 border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" }), e.jsx(Ge, { className: "w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" })] }), e.jsxs("div", { children: [e.jsx("h4", { className: "text-sm font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors", children: "Save my details for next time" }), e.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-0.5", children: "Create a permanent account to track your order and save preferences." })] })] }), e.jsx(Lt, { children: Se && e.jsxs(O.div, { initial: { opacity: 0, height: 0, marginTop: 0 }, animate: { opacity: 1, height: "auto", marginTop: 16 }, exit: { opacity: 0, height: 0, marginTop: 0 }, className: "space-y-3 overflow-hidden", children: [e.jsxs("div", { className: "space-y-1.5", children: [e.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-0.5 flex items-center gap-1", children: [e.jsx(vr, { className: "w-3 h-3" }), " Email"] }), e.jsx("input", { type: "email", value: Oe, onChange: (r) => Qr(r.target.value), placeholder: "your@email.com", className: "w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium" })] }), e.jsxs("div", { className: "space-y-1.5", children: [e.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-0.5 flex items-center gap-1", children: [e.jsx(ya, { className: "w-3 h-3" }), " Password"] }), e.jsx("input", { type: "password", value: $e, onChange: (r) => Xr(r.target.value), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium" })] })] }) })] }), e.jsxs("div", { className: "p-4 sm:p-5 bg-card text-card-foreground border border-gray-100 dark:border-slate-800 border-t-0 rounded-b-[1rem] transition-colors", children: [e.jsx(O.button, { onClick: na, disabled: !Et || Pt || Dt || $t, whileTap: { scale: 0.97 }, className: `w-full py-4 rounded-2xl font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 ${Et && !Pt && !Dt && !$t ? `bg-gradient-to-r ${mr.color} text-white shadow-lg ${mr.shadow} hover:brightness-110` : "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"}`, children: Pt || Dt || $t ? e.jsxs(e.Fragment, { children: [e.jsx(be, { className: "w-4 h-4 animate-spin" }), "Initiating secure payment..."] }) : Et ? e.jsxs(e.Fragment, { children: [e.jsx(fa, { className: "w-4 h-4" }), "Confirm Order"] }) : e.jsxs(e.Fragment, { children: [e.jsx(Ye, { className: "w-4 h-4" }), "Fill in all fields"] }) }), e.jsxs("p", { className: "text-center text-[10px] font-medium text-gray-400 mt-3 flex items-center justify-center gap-1", children: [e.jsx(Ye, { className: "w-3 h-3" }), "256-bit encrypted \xB7 Secure checkout"] })] })] }) })] })] }), e.jsxs(Lt, { children: [rr && st && e.jsx(ps, { clientSecret: rr, paymentId: st, totalAmount: N, shippingInfo: u, user: A, onClose: async (r) => {
    if (Ie) try {
      await T.rpc("cancel_order_with_inventory", { p_order_id: Ie }), console.log("Stripe order cancelled on modal close:", Ie);
    } catch (x) {
      console.error("Failed to cancel order on modal close:", x);
    }
    const o = r || "cancelled";
    if (st) try {
      await T.from("payments").update({ provider_status: o, completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", st);
    } catch (x) {
      console.error("Failed to mark Stripe payment as cancelled:", x);
    }
    o === "failed" ? me.error("Stripe payment failed.") : me.error("Stripe payment was cancelled."), ta(null), ra(null), aa(null);
  } }), sr && nt && e.jsx(ms, { sessionData: sr, paymentId: nt, totalAmount: N, shippingInfo: u, user: A, onClose: async (r) => {
    if (We) try {
      await T.rpc("cancel_order_with_inventory", { p_order_id: We }), console.log("Adyen order cancelled on modal close:", We);
    } catch (x) {
      console.error("Failed to cancel order on modal close:", x);
    }
    const o = r || "cancelled";
    if (nt) try {
      await T.from("payments").update({ provider_status: o, completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", nt);
    } catch (x) {
      console.error("Failed to mark Adyen payment as cancelled:", x);
    }
    o === "failed" ? me.error("Adyen payment failed.") : me.error("Adyen payment was cancelled."), nr(null), or(null), ir(null);
  } }), ot && (lr || cr) && e.jsx(hs, { paymentId: ot, qrCodeData: lr || "", redirectUrl: cr || "", totalAmount: N, weroPhone: ve, weroMode: ie, onClose: async (r) => {
    if (Ue) try {
      await T.rpc("cancel_order_with_inventory", { p_order_id: Ue }), console.log("Wero order cancelled on modal close:", Ue);
    } catch (x) {
      console.error("Failed to cancel order on modal close:", x);
    }
    const o = r || "cancelled";
    if (ot) try {
      await T.from("payments").update({ provider_status: o, completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", ot);
    } catch (x) {
      console.error("Failed to mark Wero payment as cancelled:", x);
    }
    o === "failed" ? me.error("Wero payment failed.") : me.error("Wero payment was cancelled."), Tt(null), At(null), _t(null), Rt(null);
  }, onSuccess: (r) => {
    he.current = true, Tt(null), At(null), _t(null), Rt(null), l(_, "", "", void 0, u.invoiceEmail, "succeeded", r);
  } }), it && ur && e.jsx(xs, { paymentId: it, redirectUrl: ur, totalAmount: N, onClose: async (r) => {
    if (qe) try {
      await T.rpc("cancel_order_with_inventory", { p_order_id: qe }), console.log("Digital Euro order cancelled on modal close:", qe);
    } catch (x) {
      console.error("Failed to cancel Digital Euro order on modal close:", x);
    }
    const o = r || "cancelled";
    if (it) try {
      await T.from("payments").update({ provider_status: o, completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", it);
    } catch (x) {
      console.error("Failed to mark Digital Euro payment as cancelled:", x);
    }
    o === "failed" ? me.error("Digital Euro payment failed.") : me.error("Digital Euro payment was cancelled."), Mt(null), Ft(null), Ot(null);
  }, onSuccess: (r) => {
    he.current = true, Mt(null), Ft(null), Ot(null), l("digital_euro", "", "", void 0, u.invoiceEmail, "succeeded", r);
  } }), (Jr || tt || St) && e.jsx(O.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm", children: e.jsx(O.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "relative w-full max-w-md overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-center", children: St ? e.jsxs("div", { className: "space-y-4", children: [e.jsx("div", { className: "mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600", children: e.jsx(Ke, { className: "w-6 h-6" }) }), e.jsx("h3", { className: "text-lg font-black text-slate-950 dark:text-white uppercase tracking-wider", children: "Transaction Failed" }), e.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-h-40 overflow-y-auto break-words font-mono bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800", children: St }), e.jsx("div", { className: "pt-2", children: e.jsx("button", { onClick: () => Fe(null), className: "w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider transition-all", children: "Close" }) })] }) : e.jsxs("div", { className: "space-y-5 py-3", children: [e.jsxs("div", { className: "mx-auto relative flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600", children: [e.jsx(be, { className: "w-8 h-8 animate-spin text-amber-500" }), e.jsx(kr, { className: "absolute w-4 h-4 text-amber-600" })] }), e.jsxs("div", { children: [e.jsx("h3", { className: "text-base font-black text-slate-950 dark:text-white uppercase tracking-wider", children: tt ? "Confirming Blockchain Payment" : "Preparing Transaction" }), e.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed", children: tt ? `Waiting for the transaction to be mined into a block on the ${V(c) ? "Cardano Preproduction" : "Ethereum/EVM"} network. This typically takes 10 to 20 seconds.` : `Please approve and sign the payment request in your connected ${V(c) ? c === "eternl" ? "Eternl" : "Lace" : c === "metamask" ? "MetaMask" : c === "coinbase" ? "Coinbase Wallet" : c === "trust" ? "Trust Wallet" : "wallet"} window.` })] }), je && e.jsxs("div", { className: "p-3 bg-amber-50/50 dark:bg-amber-950/10 rounded-2xl border border-amber-200/50 dark:border-amber-900/30 space-y-1.5", children: [e.jsx("span", { className: "text-[9px] font-black uppercase tracking-wider text-amber-700/80", children: "Transaction Hash" }), e.jsx("p", { className: "text-[10px] font-mono text-slate-800 dark:text-slate-200 select-all truncate", children: je }), e.jsxs("a", { href: V(c) ? `https://preprod.cardanoscan.io/transaction/${je}` : rt === "0x1" ? `https://etherscan.io/tx/${je}` : `https://sepolia.etherscan.io/tx/${je}`, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 hover:text-amber-700 transition-colors uppercase tracking-wider mt-1 animate-pulse", children: ["View on ", V(c) ? "Cardanoscan" : "Etherscan", " ", e.jsx(Kt, { className: "w-3 h-3" })] })] }), tt && e.jsx("button", { onClick: oa, className: "w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20", children: "Simulate Settlement (Sandbox Bypass)" })] }) }) })] })] });
}
function us({ clientSecret: s2, paymentId: t, totalAmount: a, shippingInfo: n, user: i, onClose: l }) {
  const h = is(), p = as(), [g, m] = d.useState(false), [b, w] = d.useState(null), f = { layout: "accordion", fields: { billingDetails: { address: "auto", email: "auto", phone: "auto" } } }, v = (M) => {
    const P = M.replace(/\s+/g, "");
    return P.startsWith("+") ? P : P.startsWith("0") ? `+33${P.slice(1)}` : P;
  }, C = async (M) => {
    if (M.preventDefault(), !h || !p) return;
    m(true), w(null);
    const { error: P } = await h.confirmPayment({ elements: p, confirmParams: { return_url: `${window.location.origin}${window.location.pathname.endsWith("/") ? window.location.pathname : window.location.pathname + "/"}?payment_id=${t}`, payment_method_data: { billing_details: { name: n.name || void 0, email: n.invoiceEmail || (i == null ? void 0 : i.email) || void 0, phone: v(n.phone) || void 0, address: { line1: n.street || void 0, city: n.city || void 0, postal_code: n.zip || void 0, country: n.country || void 0 } } } } });
    if (P) {
      w(P.message || "An unexpected error occurred."), m(false);
      try {
        await T.from("payments").update({ provider_status: "failed", completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", t);
      } catch (Z) {
        console.error("Failed to mark Stripe payment as failed in DB:", Z);
      }
    }
  };
  return e.jsxs("form", { onSubmit: C, className: "space-y-4", children: [e.jsx(ls, { options: f }), b && e.jsxs("div", { className: "p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-xl text-xs flex items-start gap-2", children: [e.jsx(Ke, { className: "w-4 h-4 shrink-0 mt-0.5" }), e.jsx("span", { children: b })] }), e.jsxs("div", { className: "flex gap-3 pt-2", children: [e.jsx("button", { type: "button", onClick: l, disabled: g, className: "flex-1 py-3 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-extrabold uppercase tracking-wider transition-colors disabled:opacity-50", children: "Cancel" }), e.jsx("button", { type: "submit", disabled: !h || g, className: "flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50", children: g ? e.jsxs(e.Fragment, { children: [e.jsx(be, { className: "w-4 h-4 animate-spin" }), "Processing..."] }) : e.jsxs(e.Fragment, { children: [e.jsx(Ye, { className: "w-4 h-4" }), "Pay Now"] }) })] })] });
}
function ps({ clientSecret: s2, paymentId: t, totalAmount: a, shippingInfo: n, user: i, onClose: l }) {
  const h = document.documentElement.classList.contains("dark"), p = (m) => {
    const b = m.replace(/\s+/g, "");
    return b.startsWith("+") ? b : b.startsWith("0") ? `+33${b.slice(1)}` : b;
  }, g = { clientSecret: s2, appearance: { theme: h ? "night" : "stripe", variables: { colorPrimary: "#4f46e5" } }, defaultValues: { billingDetails: { name: n.name || void 0, email: n.invoiceEmail || (i == null ? void 0 : i.email) || void 0, phone: p(n.phone) || void 0, address: { line1: n.street || void 0, city: n.city || void 0, postalCode: n.zip || void 0, country: n.country || void 0 } } } };
  return e.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto", children: e.jsxs(O.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6", children: [e.jsxs("div", { className: "flex items-center justify-between", children: [e.jsxs("div", { className: "flex items-center gap-2.5", children: [e.jsx("div", { className: "p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl", children: e.jsx(Qe, { className: "w-5 h-5" }) }), e.jsxs("div", { children: [e.jsx("h3", { className: "text-base font-extrabold text-gray-900 dark:text-white", children: "Secure Checkout" }), e.jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: "Provide payment details to complete purchase" })] })] }), e.jsx("button", { onClick: () => l(), className: "p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors", children: e.jsx(yt, { className: "w-5 h-5" }) })] }), e.jsx(zr, { stripe: ds, options: g, children: e.jsx(us, { clientSecret: s2, paymentId: t, totalAmount: a, shippingInfo: n, user: i, onClose: l }) })] }) });
}
function ms({ sessionData: s2, paymentId: t, totalAmount: a, shippingInfo: n, user: i, onClose: l }) {
  const [h, p] = d.useState("card"), [g, m] = d.useState(""), [b, w] = d.useState(""), [f, v] = d.useState(""), [C, M] = d.useState(n.name || ""), [P, Z] = d.useState(false), [de, Q] = d.useState(null), A = (N) => {
    if (N.preventDefault(), h === "card") {
      if (g.replace(/\s/g, "").length < 16) {
        Q("Please enter a valid card number.");
        return;
      }
      if (b.length < 5) {
        Q("Please enter a valid expiry date (MM/YY).");
        return;
      }
      if (f.length < 3) {
        Q("Please enter a valid CVV code.");
        return;
      }
    }
    Q(null), Z(true), setTimeout(() => {
      const H = `${window.location.origin}${window.location.pathname.endsWith("/") ? window.location.pathname : window.location.pathname + "/"}?payment_id=${t}`;
      window.location.href = H;
    }, 2e3);
  };
  return e.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto", children: e.jsxs(O.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6", children: [e.jsxs("div", { className: "flex items-center justify-between", children: [e.jsxs("div", { className: "flex items-center gap-2.5", children: [e.jsx("div", { className: "p-2 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-xl animate-pulse", children: e.jsx(Ht, { className: "w-5 h-5" }) }), e.jsxs("div", { children: [e.jsxs("h3", { className: "text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2", children: ["Adyen Checkout ", e.jsx("span", { className: "text-[10px] px-1.5 py-0.5 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 rounded font-black tracking-wider uppercase", children: "Sandbox" })] }), e.jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: "Fast and secure global payments" })] })] }), e.jsx("button", { onClick: () => l(), className: "p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors", children: e.jsx(yt, { className: "w-5 h-5" }) })] }), e.jsxs("div", { className: "flex gap-2 p-1 bg-gray-50 dark:bg-slate-800/40 rounded-xl border border-gray-100 dark:border-slate-800", children: [e.jsx("button", { type: "button", onClick: () => p("card"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${h === "card" ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black" : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: "Credit Card" }), e.jsx("button", { type: "button", onClick: () => p("sofort"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${h === "sofort" ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black" : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: "Sofort" }), e.jsx("button", { type: "button", onClick: () => p("ideal"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${h === "ideal" ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black" : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: "iDEAL" })] }), e.jsxs("form", { onSubmit: A, className: "space-y-4", children: [h === "card" && e.jsxs("div", { className: "space-y-3.5", children: [e.jsxs("div", { children: [e.jsx("label", { className: "block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1", children: "Card Number" }), e.jsxs("div", { className: "relative", children: [e.jsx("input", { type: "text", placeholder: "4111 1111 1111 1111", maxLength: 19, value: g, onChange: (N) => {
    const H = N.target.value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim();
    m(H);
  }, className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none", required: true }), e.jsx(Qe, { className: "absolute right-3.5 top-3 w-4 h-4 text-gray-400" })] })] }), e.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [e.jsxs("div", { children: [e.jsx("label", { className: "block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1", children: "Expiry Date" }), e.jsx("input", { type: "text", placeholder: "MM/YY", maxLength: 5, value: b, onChange: (N) => {
    const H = N.target.value.replace(/\D/g, "");
    H.length >= 2 ? w(`${H.slice(0, 2)}/${H.slice(2, 4)}`) : w(H);
  }, className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none", required: true })] }), e.jsxs("div", { children: [e.jsx("label", { className: "block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1", children: "Security Code (CVV)" }), e.jsx("input", { type: "password", placeholder: "123", maxLength: 4, value: f, onChange: (N) => v(N.target.value.replace(/\D/g, "")), className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none", required: true })] })] }), e.jsxs("div", { children: [e.jsx("label", { className: "block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1", children: "Cardholder Name" }), e.jsx("input", { type: "text", placeholder: "John Doe", value: C, onChange: (N) => M(N.target.value), className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none", required: true })] })] }), h === "sofort" && e.jsxs("div", { className: "p-5 text-center bg-gray-50 dark:bg-slate-800/20 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl space-y-2", children: [e.jsx(Ht, { className: "w-8 h-8 text-indigo-500 mx-auto animate-bounce" }), e.jsx("h4", { className: "text-xs font-extrabold text-gray-800 dark:text-white", children: "Redirecting to Sofort Banking" }), e.jsx("p", { className: "text-[10px] text-gray-400 dark:text-gray-500", children: "You will be securely redirected to complete payment with your bank account." })] }), h === "ideal" && e.jsxs("div", { className: "p-5 text-center bg-gray-50 dark:bg-slate-800/20 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl space-y-2", children: [e.jsx(Ht, { className: "w-8 h-8 text-emerald-500 mx-auto animate-bounce" }), e.jsx("h4", { className: "text-xs font-extrabold text-gray-800 dark:text-white", children: "Redirecting to iDEAL Sandbox" }), e.jsx("p", { className: "text-[10px] text-gray-400 dark:text-gray-500", children: "You will be securely redirected to select your Dutch bank and authorize payment." })] }), de && e.jsxs("div", { className: "p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 rounded-xl text-xs flex items-start gap-2", children: [e.jsx(Ke, { className: "w-4 h-4 shrink-0 mt-0.5" }), e.jsx("span", { children: de })] }), e.jsxs("div", { className: "flex gap-3 pt-2", children: [e.jsx("button", { type: "button", onClick: () => l(), disabled: P, className: "flex-1 py-3 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-extrabold uppercase tracking-wider transition-colors disabled:opacity-50", children: "Cancel" }), e.jsx("button", { type: "submit", disabled: P, className: "flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50", children: P ? e.jsxs(e.Fragment, { children: [e.jsx(be, { className: "w-4 h-4 animate-spin" }), "Processing..."] }) : e.jsxs(e.Fragment, { children: [e.jsx(Ye, { className: "w-4 h-4" }), "Pay ", j.currencySymbol, a.toFixed(2)] }) })] })] })] }) });
}
function xs({ paymentId: s2, redirectUrl: t, totalAmount: a, onClose: n, onSuccess: i }) {
  const [l, h] = d.useState(false), [p, g] = d.useState(null), m = async (b) => {
    h(true), g(null);
    try {
      const { data: w, error: f } = await T.functions.invoke("digital-euro-checkout", { body: { action: "confirm", payment_id: s2, status: b } });
      if (f) throw new Error(f.message || "Failed to confirm Digital Euro payment.");
      if ((w == null ? void 0 : w.status) === "succeeded") i(w.order_id);
      else {
        const v = (w == null ? void 0 : w.status) === "failed" ? "failed" : "cancelled";
        g(`Payment simulation completed with status: ${(w == null ? void 0 : w.status) || b}`), h(false), setTimeout(() => {
          n(v);
        }, 1500);
      }
    } catch (w) {
      console.error("Digital Euro simulation error:", w), g(w.message || "Simulation request failed."), h(false);
    }
  };
  return e.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto", children: e.jsxs(O.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6", children: [e.jsxs("div", { className: "flex items-center justify-between", children: [e.jsxs("div", { className: "flex items-center gap-2.5", children: [e.jsx("div", { className: "p-2 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-xl", children: e.jsx(ht, { className: "w-5 h-5" }) }), e.jsxs("div", { children: [e.jsxs("h3", { className: "text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2", children: ["Digital Euro ", e.jsx("span", { className: "text-[10px] px-1.5 py-0.5 bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 rounded font-black tracking-wider uppercase", children: "Sandbox" })] }), e.jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: "Simulated PSP authorization" })] })] }), e.jsx("button", { onClick: () => m("cancelled"), disabled: l, className: "p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors disabled:opacity-50", children: e.jsx(yt, { className: "w-5 h-5" }) })] }), e.jsxs("div", { className: "p-5 text-center bg-cyan-50/60 dark:bg-cyan-950/10 border border-dashed border-cyan-200 dark:border-cyan-900/50 rounded-2xl space-y-3", children: [e.jsx(ht, { className: "w-10 h-10 text-cyan-600 mx-auto" }), e.jsxs("div", { children: [e.jsx("h4", { className: "text-xs font-black text-gray-800 dark:text-white uppercase tracking-wider", children: "Awaiting Digital Euro Authorization" }), e.jsxs("p", { className: "text-[10px] text-gray-500 dark:text-gray-400 mt-1", children: ["A sandbox payment request for ", e.jsxs("span", { className: "font-extrabold text-cyan-700 dark:text-cyan-300", children: [j.currencySymbol, a.toFixed(2)] }), " is ready for simulated customer approval."] })] }), e.jsx("p", { className: "text-[10px] font-mono text-cyan-700 dark:text-cyan-300 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-cyan-100 dark:border-cyan-900/50 break-all select-all", children: t })] }), p && e.jsx("div", { className: "p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl text-xs font-bold text-amber-700 dark:text-amber-300 text-center", children: p }), e.jsxs("div", { className: "space-y-2", children: [e.jsxs("button", { onClick: () => m("succeeded"), disabled: l, className: "w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all disabled:opacity-60 flex items-center justify-center gap-2", children: [l ? e.jsx(be, { className: "w-4 h-4 animate-spin" }) : e.jsx(Ge, { className: "w-4 h-4" }), "Simulate Approval"] }), e.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [e.jsx("button", { onClick: () => m("failed"), disabled: l, className: "py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-300 text-[10px] font-black uppercase tracking-wider hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors disabled:opacity-50", children: "Simulate Failure" }), e.jsx("button", { onClick: () => m("cancelled"), disabled: l, className: "py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-300 text-[10px] font-black uppercase tracking-wider hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50", children: "Cancel" })] })] })] }) });
}
function hs({ paymentId: s2, qrCodeData: t, redirectUrl: a, totalAmount: n, weroPhone: i, weroMode: l, onClose: h, onSuccess: p }) {
  const [g, m] = d.useState(false), [b, w] = d.useState(null), f = async (C) => {
    m(true), w(null);
    try {
      const { data: M, error: P } = await T.functions.invoke("wero-checkout", { body: { action: "confirm", payment_id: s2, status: C } });
      if (P) throw new Error(P.message || "Failed to confirm Wero payment.");
      (M == null ? void 0 : M.status) === "succeeded" ? p(M.order_id) : (w(`Payment simulation completed with status: ${(M == null ? void 0 : M.status) || C}`), m(false), (C === "cancelled" || C === "failed") && setTimeout(() => {
        h(C);
      }, 1500));
    } catch (M) {
      console.error("Wero simulation error:", M), w(M.message || "Simulation request failed."), m(false);
    }
  }, v = a && a.includes("worldline-solutions.com");
  return e.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto", children: e.jsxs(O.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6", children: [e.jsxs("div", { className: "flex items-center justify-between", children: [e.jsxs("div", { className: "flex items-center gap-2.5", children: [e.jsx("div", { className: "p-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl animate-pulse", children: e.jsx(Xe, { className: "w-5 h-5" }) }), e.jsxs("div", { children: [e.jsxs("h3", { className: "text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2", children: ["Wero Transfer ", e.jsx("span", { className: "text-[10px] px-1.5 py-0.5 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded font-black tracking-wider uppercase", children: v ? "Preprod" : "Sandbox" })] }), e.jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: "Fast and secure account-to-account transfer" })] })] }), e.jsx("button", { onClick: () => f("cancelled"), disabled: g, className: "p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors disabled:opacity-50", children: e.jsx(yt, { className: "w-5 h-5" }) })] }), l === "phone" ? e.jsxs("div", { className: "p-5 text-center bg-purple-50/50 dark:bg-purple-950/10 border border-dashed border-purple-200 dark:border-purple-900/50 rounded-2xl space-y-3", children: [e.jsx(Xe, { className: "w-10 h-10 text-purple-500 mx-auto animate-bounce" }), e.jsxs("div", { children: [e.jsx("h4", { className: "text-xs font-black text-gray-800 dark:text-white uppercase tracking-wider", children: "Pending Bank Authorization" }), e.jsxs("p", { className: "text-[10px] text-gray-500 dark:text-gray-400 mt-1", children: ["A transfer request for ", e.jsxs("span", { className: "font-extrabold text-purple-600 dark:text-purple-400", children: [j.currencySymbol, n.toFixed(2)] }), " has been sent to your Wero phone:"] }), e.jsx("p", { className: "text-sm font-mono font-bold text-purple-700 dark:text-purple-300 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-purple-100 dark:border-purple-900/50 inline-block mt-2 select-all", children: i })] }), v && e.jsx("div", { className: "pt-2", children: e.jsxs("a", { href: a, target: "_blank", rel: "noopener noreferrer", className: "w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-750 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all shadow-md hover:shadow-purple-500/25 flex items-center justify-center gap-1.5 group", children: [e.jsx("span", { children: "Proceed to Payment" }), e.jsx(Kt, { className: "w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })] }) }), e.jsx("p", { className: "text-[10px] text-gray-400 dark:text-gray-500 italic pt-1", children: "Please open your participating banking app to authorize the instant transfer request." })] }) : e.jsxs("div", { className: "p-5 text-center bg-purple-50/50 dark:bg-purple-950/10 border border-dashed border-purple-200 dark:border-purple-900/50 rounded-2xl flex flex-col items-center gap-3", children: [e.jsx("div", { className: "p-4 bg-white rounded-2xl shadow-md border border-purple-100", children: e.jsx(Fr, { className: "w-40 h-40 text-purple-900" }) }), e.jsxs("div", { children: [e.jsx("h4", { className: "text-xs font-black text-gray-800 dark:text-white uppercase tracking-wider", children: "Scan to Pay" }), e.jsxs("p", { className: "text-[10px] text-gray-500 dark:text-gray-400 mt-1", children: ["Scan this QR code with your banking app to instantly authorize a payment of ", e.jsxs("span", { className: "font-extrabold text-purple-600 dark:text-purple-400", children: [j.currencySymbol, n.toFixed(2)] }), "."] })] }), v && e.jsxs("a", { href: a, target: "_blank", rel: "noopener noreferrer", className: "w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-750 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all shadow-md hover:shadow-purple-500/25 flex items-center justify-center gap-1.5 group", children: [e.jsx("span", { children: "Proceed to Payment" }), e.jsx(Kt, { className: "w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })] })] }), b && e.jsxs("div", { className: "p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 rounded-xl text-xs flex items-start gap-2", children: [e.jsx(Ke, { className: "w-4 h-4 shrink-0 mt-0.5" }), e.jsx("span", { children: b })] }), e.jsxs("div", { className: "space-y-2.5", children: [e.jsx("p", { className: "text-[9px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest text-center", children: v ? "Verification & Control" : "Testing / Sandbox Controls" }), e.jsxs("div", { className: "grid grid-cols-2 gap-2.5", children: [e.jsx("button", { onClick: () => f("succeeded"), disabled: g, className: `py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50 ${v ? "bg-purple-600 hover:bg-purple-700 text-white hover:shadow-purple-500/20" : "bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-emerald-500/20"}`, children: g ? e.jsx(be, { className: "w-3.5 h-3.5 animate-spin" }) : e.jsxs(e.Fragment, { children: [e.jsx(Ge, { className: "w-3.5 h-3.5" }), v ? "Verify Payment" : "Simulate Success"] }) }), e.jsx("button", { onClick: () => f("failed"), disabled: g, className: "py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-rose-500/20 flex items-center justify-center gap-1.5 disabled:opacity-50", children: g ? e.jsx(be, { className: "w-3.5 h-3.5 animate-spin" }) : e.jsxs(e.Fragment, { children: [e.jsx(Ke, { className: "w-3.5 h-3.5" }), v ? "Check Failure" : "Simulate Failure"] }) })] }), e.jsx("button", { onClick: () => f("cancelled"), disabled: g, className: "w-full py-2.5 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors disabled:opacity-50", children: "Cancel Payment Request" })] })] }) });
}
export {
  js as Checkout
};
