import { c as ht, a2 as sa, R as E, a as S, r as c, b as na, l as oa, j as e, a3 as He, f as ia, m as F, h as la, U as ca, B as da, z as mr, A as Wt, a4 as ua, L as he, k as pa, s as _, x as de, y as Ve, E as Vt, i as ma, X as gt, G as Ut, a5 as xa } from "./index-DUEKzuf5.js";
import { Q as Pr, B as qt, M as ha } from "./index-CxPtvJsf.js";
import { A as ga } from "./arrow-left-C3A6Fpxd.js";
import { H as ya } from "./hash-feqM98Z9.js";
import { C as ze } from "./circle-check-CELVo2nT.js";
import { C as Je } from "./credit-card-xFQ1QFn_.js";
import { S as fa } from "./shopping-cart-D1FlLT_T.js";
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ba = [["circle", { cx: "8", cy: "8", r: "6", key: "3yglwk" }], ["path", { d: "M18.09 10.37A6 6 0 1 1 10.34 18", key: "t5s6rm" }], ["path", { d: "M7 6h1v4", key: "1obek4" }], ["path", { d: "m16.71 13.88.7.71-2.82 2.82", key: "1rbuyh" }]], xr = ht("coins", ba);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const va = [["path", { d: "M10 18v-7", key: "wt116b" }], ["path", { d: "M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z", key: "1m329m" }], ["path", { d: "M14 18v-7", key: "vav6t3" }], ["path", { d: "M18 18v-7", key: "aexdmj" }], ["path", { d: "M3 22h18", key: "8prr45" }], ["path", { d: "M6 18v-7", key: "1ivflk" }]], xt = ht("landmark", va);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const wa = [["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }], ["path", { d: "M12 18h.01", key: "mhygvu" }]], Ye = ht("smartphone", wa);
/**
* @license lucide-react v0.546.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ka = [["path", { d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1", key: "18etb6" }], ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]], hr = ht("wallet", ka);
function pt(s2) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? pt = function(t) {
    return typeof t;
  } : pt = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, pt(s2);
}
var Ar = "dahlia", ja = function(t) {
  return t === 3 ? "v3" : t;
}, _r = "https://js.stripe.com", Na = "".concat(_r, "/").concat(Ar, "/stripe.js"), Sa = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/, Ca = /^https:\/\/js\.stripe\.com\/(v3|[a-z]+)\/stripe\.js(\?.*)?$/;
var Ea = function(t) {
  return Sa.test(t) || Ca.test(t);
}, Pa = function() {
  for (var t = document.querySelectorAll('script[src^="'.concat(_r, '"]')), a = 0; a < t.length; a++) {
    var n = t[a];
    if (Ea(n.src)) return n;
  }
  return null;
}, gr = function(t) {
  var a = "", n = document.createElement("script");
  n.src = "".concat(Na).concat(a);
  var i = document.head || document.body;
  if (!i) throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");
  return i.appendChild(n), n;
}, Aa = function(t, a) {
  !t || !t._registerWrapper || t._registerWrapper({ name: "stripe-js", version: "9.7.0", startTime: a });
}, qe = null, dt = null, ut = null, _a = function(t) {
  return function(a) {
    t(new Error("Failed to load Stripe.js", { cause: a }));
  };
}, Ta = function(t, a) {
  return function() {
    window.Stripe ? t(window.Stripe) : a(new Error("Stripe.js not available"));
  };
}, Ra = function(t) {
  return qe !== null ? qe : (qe = new Promise(function(a, n) {
    if (typeof window > "u" || typeof document > "u") {
      a(null);
      return;
    }
    if (window.Stripe) {
      a(window.Stripe);
      return;
    }
    try {
      var i = Pa();
      if (!(i && t)) {
        if (!i) i = gr(t);
        else if (i && ut !== null && dt !== null) {
          var l;
          i.removeEventListener("load", ut), i.removeEventListener("error", dt), (l = i.parentNode) === null || l === void 0 || l.removeChild(i), i = gr(t);
        }
      }
      ut = Ta(a, n), dt = _a(n), i.addEventListener("load", ut), i.addEventListener("error", dt);
    } catch (h) {
      n(h);
      return;
    }
  }), qe.catch(function(a) {
    return qe = null, Promise.reject(a);
  }));
}, Da = function(t, a, n) {
  if (t === null) return null;
  var i = a[0];
  if (typeof i != "string") throw new Error("Expected publishable key to be of type string, got type ".concat(pt(i), " instead."));
  var l = i.match(/^pk_test/), h = ja(t.version), p = Ar;
  l && h !== p && console.warn("Stripe.js@".concat(h, " was loaded on the page, but @stripe/stripe-js@").concat("9.7.0", " expected Stripe.js@").concat(p, ". This may result in unexpected behavior. For more information, see https://docs.stripe.com/sdks/stripejs-versioning"));
  var g = t.apply(void 0, a);
  return Aa(g, n), g;
}, Le, Tr = false, Rr = function() {
  return Le || (Le = Ra(null).catch(function(t) {
    return Le = null, Promise.reject(t);
  }), Le);
};
Promise.resolve().then(function() {
  return Rr();
}).catch(function(s2) {
  Tr || console.warn(s2);
});
var Ma = function() {
  for (var t = arguments.length, a = new Array(t), n = 0; n < t; n++) a[n] = arguments[n];
  Tr = true;
  var i = Date.now();
  return Rr().then(function(l) {
    return Da(l, a, i);
  });
}, Lt = { exports: {} }, Bt, yr;
function Fa() {
  if (yr) return Bt;
  yr = 1;
  var s2 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Bt = s2, Bt;
}
var Ht, fr;
function Oa() {
  if (fr) return Ht;
  fr = 1;
  var s2 = Fa();
  function t() {
  }
  function a() {
  }
  return a.resetWarningCache = t, Ht = function() {
    function n(h, p, g, m, v, w) {
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
  }, Ht;
}
var br;
function $a() {
  return br || (br = 1, Lt.exports = Oa()()), Lt.exports;
}
var Ia = $a();
const M = sa(Ia);
function vr(s2, t) {
  var a = Object.keys(s2);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(s2);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(s2, i).enumerable;
    })), a.push.apply(a, n);
  }
  return a;
}
function wr(s2) {
  for (var t = 1; t < arguments.length; t++) {
    var a = arguments[t] != null ? arguments[t] : {};
    t % 2 ? vr(Object(a), true).forEach(function(n) {
      Dr(s2, n, a[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(s2, Object.getOwnPropertyDescriptors(a)) : vr(Object(a)).forEach(function(n) {
      Object.defineProperty(s2, n, Object.getOwnPropertyDescriptor(a, n));
    });
  }
  return s2;
}
function mt(s2) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? mt = function(t) {
    return typeof t;
  } : mt = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, mt(s2);
}
function Dr(s2, t, a) {
  return t in s2 ? Object.defineProperty(s2, t, { value: a, enumerable: true, configurable: true, writable: true }) : s2[t] = a, s2;
}
function Wa(s2, t) {
  if (s2 == null) return {};
  var a = {}, n = Object.keys(s2), i, l;
  for (l = 0; l < n.length; l++) i = n[l], !(t.indexOf(i) >= 0) && (a[i] = s2[i]);
  return a;
}
function Ua(s2, t) {
  if (s2 == null) return {};
  var a = Wa(s2, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(s2);
    for (i = 0; i < l.length; i++) n = l[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(s2, n) && (a[n] = s2[n]);
  }
  return a;
}
function Mr(s2, t) {
  return qa(s2) || La(s2, t) || Ba(s2, t) || Ha();
}
function qa(s2) {
  if (Array.isArray(s2)) return s2;
}
function La(s2, t) {
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
function Ba(s2, t) {
  if (s2) {
    if (typeof s2 == "string") return kr(s2, t);
    var a = Object.prototype.toString.call(s2).slice(8, -1);
    if (a === "Object" && s2.constructor && (a = s2.constructor.name), a === "Map" || a === "Set") return Array.from(s2);
    if (a === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)) return kr(s2, t);
  }
}
function kr(s2, t) {
  (t == null || t > s2.length) && (t = s2.length);
  for (var a = 0, n = new Array(t); a < t; a++) n[a] = s2[a];
  return n;
}
function Ha() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var q = function(t, a, n) {
  var i = !!n, l = E.useRef(n);
  E.useEffect(function() {
    l.current = n;
  }, [n]), E.useEffect(function() {
    if (!i || !t) return function() {
    };
    var h = function() {
      if (l.current) return l.current.apply(l, arguments);
    };
    return t.on(a, h), function() {
      t.off(a, h);
    };
  }, [i, a, t, l]);
}, Jt = function(t) {
  var a = E.useRef(t);
  return E.useEffect(function() {
    a.current = t;
  }, [t]), a.current;
}, Se = function(t) {
  return t !== null && mt(t) === "object";
}, za = function(t) {
  return Se(t) && typeof t.then == "function";
}, Va = function(t) {
  return Se(t) && typeof t.elements == "function" && typeof t.createToken == "function" && typeof t.createPaymentMethod == "function" && typeof t.confirmCardPayment == "function";
}, jr = "[object Object]", Ja = function s(t, a) {
  if (!Se(t) || !Se(a)) return t === a;
  var n = Array.isArray(t), i = Array.isArray(a);
  if (n !== i) return false;
  var l = Object.prototype.toString.call(t) === jr, h = Object.prototype.toString.call(a) === jr;
  if (l !== h) return false;
  if (!l && !n) return t === a;
  var p = Object.keys(t), g = Object.keys(a);
  if (p.length !== g.length) return false;
  for (var m = {}, v = 0; v < p.length; v += 1) m[p[v]] = true;
  for (var w = 0; w < g.length; w += 1) m[g[w]] = true;
  var f = Object.keys(m);
  if (f.length !== p.length) return false;
  var b = t, I = a, T = function(B) {
    return s(b[B], I[B]);
  };
  return f.every(T);
}, Fr = function(t, a, n) {
  return Se(t) ? Object.keys(t).reduce(function(i, l) {
    var h = !Se(a) || !Ja(t[l], a[l]);
    return n.includes(l) ? (h && console.warn("Unsupported prop change: options.".concat(l, " is not a mutable property.")), i) : h ? wr(wr({}, i || {}), {}, Dr({}, l, t[l])) : i;
  }, null) : null;
}, Or = "Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.", Nr = function(t) {
  var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Or;
  if (t === null || Va(t)) return t;
  throw new Error(a);
}, Ya = function(t) {
  var a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Or;
  if (za(t)) return { tag: "async", stripePromise: Promise.resolve(t).then(function(i) {
    return Nr(i, a);
  }) };
  var n = Nr(t, a);
  return n === null ? { tag: "empty" } : { tag: "sync", stripe: n };
}, Ga = function(t) {
  !t || !t._registerWrapper || !t.registerAppInfo || (t._registerWrapper({ name: "react-stripe-js", version: "6.5.0" }), t.registerAppInfo({ name: "react-stripe-js", version: "6.5.0", url: "https://stripe.com/docs/stripe-js/react" }));
}, yt = E.createContext(null);
yt.displayName = "ElementsContext";
var $r = function(t, a) {
  if (!t) throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(a, " in an <Elements> provider."));
  return t;
}, Ir = function(t) {
  var a = t.stripe, n = t.options, i = t.children, l = E.useMemo(function() {
    return Ya(a);
  }, [a]), h = E.useState(function() {
    return { stripe: l.tag === "sync" ? l.stripe : null, elements: l.tag === "sync" ? l.stripe.elements(n) : null };
  }), p = Mr(h, 2), g = p[0], m = p[1];
  E.useEffect(function() {
    var f = true, b = function(T) {
      m(function(N) {
        return N.stripe ? N : { stripe: T, elements: T.elements(n) };
      });
    };
    return l.tag === "async" && !g.stripe ? l.stripePromise.then(function(I) {
      I && f && b(I);
    }) : l.tag === "sync" && !g.stripe && b(l.stripe), function() {
      f = false;
    };
  }, [l, g, n]);
  var v = Jt(a);
  E.useEffect(function() {
    v !== null && v !== a && console.warn("Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.");
  }, [v, a]);
  var w = Jt(n);
  return E.useEffect(function() {
    if (g.elements) {
      var f = Fr(n, w, ["clientSecret", "fonts"]);
      f && g.elements.update(f);
    }
  }, [n, w, g.elements]), E.useEffect(function() {
    Ga(g.stripe);
  }, [g.stripe]), E.createElement(yt.Provider, { value: g }, i);
};
Ir.propTypes = { stripe: M.any, options: M.object };
var Ka = function(t) {
  var a = E.useContext(yt);
  return $r(a, t);
}, Qa = function() {
  var t = Ka("calls useElements()"), a = t.elements;
  return a;
};
M.func.isRequired;
var Wr = E.createContext(null);
Wr.displayName = "CheckoutContext";
var Yt = function(t) {
  var a = E.useContext(Wr), n = E.useContext(yt);
  if (a) {
    if (n) throw new Error("You cannot wrap the part of your app that ".concat(t, " in both a checkout provider and <Elements> provider."));
    return a;
  } else return $r(n, t);
}, Xa = ["mode"], Za = function(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}, O = function(t, a, n) {
  var i = "".concat(Za(t), "Element"), l = function(m) {
    var v = m.id, w = m.className, f = m.options, b = f === void 0 ? {} : f, I = m.onBlur, T = m.onFocus, N = m.onReady, B = m.onChange, A = m.onEscape, R = m.onClick, ie = m.onLoadError, H = m.onLoaderStart, k = m.onNetworksChange, ft = m.onConfirm, ae = m.onCancel, Ge = m.onShippingAddressChange, ge = m.onShippingRateChange, bt = m.onSavedPaymentMethodRemove, Gt = m.onSavedPaymentMethodUpdate, Kt = m.onAvailablePaymentMethodsChange, Ce = Yt("mounts <".concat(i, ">")), Ee = "elements" in Ce ? Ce.elements : null, le = "checkoutState" in Ce ? Ce.checkoutState : null, ue = (le == null ? void 0 : le.type) === "success" || (le == null ? void 0 : le.type) === "loading" ? le.sdk : null, Qt = E.useState(null), vt = Mr(Qt, 2), d = vt[0], K = vt[1], G = E.useRef(null), ye = E.useRef(null);
    q(d, "blur", I), q(d, "focus", T), q(d, "escape", A), q(d, "click", R), q(d, "loaderror", ie), q(d, "loaderstart", H), q(d, "networkschange", k), q(d, "confirm", ft), q(d, "cancel", ae), q(d, "shippingaddresschange", Ge), q(d, "shippingratechange", ge), q(d, "savedpaymentmethodremove", bt), q(d, "savedpaymentmethodupdate", Gt), q(d, "availablepaymentmethodschange", Kt), q(d, "change", B);
    var u;
    N && (t === "expressCheckout" ? u = N : u = function() {
      N(d);
    }), q(d, "ready", u), E.useLayoutEffect(function() {
      if (G.current === null && ye.current !== null && (Ee || ue)) {
        var j = null;
        if (ue) {
          var X = ue, Ke = ue;
          switch (t) {
            case "paymentForm":
              j = Ke.createForm(b);
              break;
            case "payment":
              j = X.createPaymentElement(b);
              break;
            case "address":
              if ("mode" in b) {
                var Z = b.mode, be = Ua(b, Xa);
                if (Z === "shipping") j = X.createShippingAddressElement(be);
                else if (Z === "billing") j = X.createBillingAddressElement(be);
                else throw new Error("Invalid options.mode. mode must be 'billing' or 'shipping'.");
              } else throw new Error("You must supply options.mode. mode must be 'billing' or 'shipping'.");
              break;
            case "expressCheckout":
              j = X.createExpressCheckoutElement(b);
              break;
            case "currencySelector":
              j = ue.createCurrencySelectorElement();
              break;
            case "taxId":
              j = X.createTaxIdElement(b);
              break;
            case "contactDetails":
              j = X.createContactDetailsElement();
              break;
            default:
              throw new Error("<".concat(i, "> is not supported inside a checkout provider. Use an <Elements> provider instead."));
          }
        } else Ee && (j = Ee.create(t, b));
        G.current = j, K(j), j && j.mount(ye.current);
      }
    }, [Ee, ue, b]);
    var fe = Jt(b);
    return E.useEffect(function() {
      if (G.current) {
        var j = Fr(b, fe, ["paymentRequest"]);
        j && "update" in G.current && G.current.update(j);
      }
    }, [b, fe]), E.useLayoutEffect(function() {
      return function() {
        if (G.current && typeof G.current.destroy == "function") try {
          G.current.destroy(), G.current = null;
        } catch {
        }
      };
    }, []), E.createElement("div", { id: v, className: w, ref: ye });
  }, h = function(m) {
    Yt("mounts <".concat(i, ">"));
    var v = m.id, w = m.className;
    return E.createElement("div", { id: v, className: w });
  }, p = a ? h : l;
  return p.propTypes = { id: M.string, className: M.string, onChange: M.func, onBlur: M.func, onFocus: M.func, onReady: M.func, onEscape: M.func, onClick: M.func, onLoadError: M.func, onLoaderStart: M.func, onNetworksChange: M.func, onConfirm: M.func, onCancel: M.func, onShippingAddressChange: M.func, onShippingRateChange: M.func, onSavedPaymentMethodRemove: M.func, onSavedPaymentMethodUpdate: M.func, onAvailablePaymentMethodsChange: M.func, options: M.object }, p.displayName = i, p.__elementType = t, p;
}, $ = typeof window > "u", es = E.createContext(null);
es.displayName = "EmbeddedCheckoutProviderContext";
var ts = function() {
  var t = Yt("calls useStripe()"), a = t.stripe;
  return a;
};
O("auBankAccount", $);
O("card", $);
O("cardNumber", $);
O("cardExpiry", $);
O("cardCvc", $);
O("iban", $);
var rs = O("payment", $);
O("expressCheckout", $);
O("paymentRequestButton", $);
O("linkAuthentication", $);
O("contactDetails", $);
O("address", $);
O("shippingAddress", $);
O("paymentMethodMessaging", $);
O("taxId", $);
O("issuingCardNumberDisplay", $);
O("issuingCardCvcDisplay", $);
O("issuingCardExpiryDisplay", $);
O("issuingCardPinDisplay", $);
O("issuingCardCopyButton", $);
/**
* @license
* SPDX-License-Identifier: Apache-2.0
*/
async function as() {
  const s2 = S.diaBaseApiUrl;
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
const ss = Ma(S.stripe.publishableKey), zt = () => [{ id: "stripe", label: "Adyen (Card, Sofort)", icon: Je, color: "from-indigo-500 to-violet-600", shadow: "shadow-indigo-500/20" }, { id: "wero", label: "Wero (Instant)", icon: Ye, color: "from-purple-500 to-pink-500", shadow: "shadow-purple-500/20" }, { id: "digital_euro", label: "Digital Euro", icon: xt, color: "from-cyan-500 to-blue-600", shadow: "shadow-cyan-500/20" }, { id: "paypal", label: "PayPal", icon: fa, color: "from-blue-500 to-cyan-500", shadow: "shadow-blue-500/20" }, { id: "crypto", label: "Crypto", icon: ma, color: "from-amber-500 to-orange-500", shadow: "shadow-amber-500/20" }], J = (s2) => s2 ? ["lace", "eternl"].includes(s2) : false, Sr = async (s2) => {
  if (s2 && typeof s2 == "object") {
    if (s2 instanceof xa) try {
      const t = await s2.context.json();
      if (t && t.error) return t.error;
    } catch (t) {
      console.warn("Failed to parse error response context as JSON:", t);
    }
    return s2.message || String(s2);
  }
  return String(s2);
}, Cr = [{ id: "metamask", name: "MetaMask", color: "bg-[#F6851B] text-white" }, { id: "coinbase", name: "Coinbase Wallet", color: "bg-[#0052FF] text-white" }, { id: "trust", name: "Trust Wallet", color: "bg-[#3375BB] text-white" }, { id: "phantom", name: "Phantom", color: "bg-[#AB9FF2] text-white" }, { id: "lace", name: "Lace (Cardano)", color: "bg-[#0033AD] text-white" }, { id: "eternl", name: "Eternl (Cardano)", color: "bg-[#FF6600] text-white" }], Be = { metamask: { symbol: "ETH", rate: 33e-5 }, coinbase: { symbol: "ETH", rate: 33e-5 }, trust: { symbol: "BNB", rate: 16e-4 }, phantom: { symbol: "SOL", rate: 66e-4 }, lace: { symbol: "ADA", rate: 2.22 }, eternl: { symbol: "ADA", rate: 2.22 } }, Er = { USDC: { symbol: "USDC", decimals: 6, addresses: { mainnet: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", sepolia: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238" } }, EURC: { symbol: "EURC", decimals: 6, addresses: { mainnet: "0x1aBaEA1f7C830F115f3590b685c7d537f20e7af8", sepolia: "0x08216865A1CDd02929fa757274092557451B38d8" } } };
function ys({ onBack: s2, onInitiateStripe: t, onInitiateWero: a, onInitiateDigitalEuro: n, onInitiateCrypto: i, onComplete: l }) {
  var _a2, _b;
  const [h, p] = c.useState(2.22), [g, m] = c.useState(66e-5), [v, w] = c.useState(1.08), [f, b] = c.useState("ETH"), [I, T] = c.useState(false);
  c.useEffect(() => {
    let r = true;
    async function o() {
      T(true);
      try {
        const x = await as();
        r && (p(x.adaRate), m(x.ethRate), w(x.usdcRate));
      } catch (x) {
        console.error("Failed to load live rates:", x);
      } finally {
        r && T(false);
      }
    }
    return o(), () => {
      r = false;
    };
  }, []);
  const N = (r) => {
    var _a3;
    if (J(r)) return h;
    if (r === "metamask" || r === "coinbase" || r === "trust") {
      if (f === "ETH") return g;
      if (f === "USDC") return v;
      if (f === "EURC") return 1;
    }
    return ((_a3 = Be[r]) == null ? void 0 : _a3.rate) || 1;
  }, { cart: B } = na(), { user: A } = oa(), R = c.useMemo(() => B.reduce((r, o) => {
    const x = o.discount_percentage && o.discount_percentage > 0 ? o.price * (1 - o.discount_percentage / 100) : o.price;
    return r + x * o.cart_quantity;
  }, 0), [B]), ie = c.useMemo(() => B.reduce((r, o) => r + Number(o.cart_quantity || 0), 0), [B]), H = c.useMemo(() => {
    const r = S.paymentMethods || ["stripe", "adyen", "digital_euro", "worldline", "paypal", "crypto"], o = zt(), x = o.filter((C) => r.includes(C.id));
    return x.length > 0 ? x : o;
  }, []), [k, ft] = c.useState(() => {
    var _a3;
    return ((_a3 = H[0]) == null ? void 0 : _a3.id) || "stripe";
  }), [ae, Ge] = c.useState("phone"), [ge, bt] = c.useState(""), [Gt, Kt] = c.useState(false), [Ce, Ee] = c.useState(false), [le, ue] = c.useState("idle"), [Qt, vt] = c.useState(""), [d, K] = c.useState({ name: "", street: "", city: "", zip: "", phone: "", invoiceEmail: A && !A.is_anonymous && A.email || "", country: "" }), [G, ye] = c.useState(false);
  c.useEffect(() => {
    A && !A.is_anonymous && (A.email && K((o) => o.invoiceEmail ? o : { ...o, invoiceEmail: A.email }), (async () => {
      try {
        if (S.databaseProvider === "supabase") {
          const { data: o, error: x } = await _.from("user_roles").select("name, street, city, zip, phone, country").eq("user_id", A.id || A.$id).maybeSingle();
          o && !x && (K((C) => ({ ...C, name: o.name || C.name, street: o.street || C.street, city: o.city || C.city, zip: o.zip || C.zip, phone: o.phone || C.phone, country: o.country || C.country })), (o.name || o.street || o.city || o.zip || o.phone || o.country) && ye(true));
        }
      } catch (o) {
        console.error("Failed to load saved address:", o);
      }
    })());
  }, [A]);
  const [u, fe] = c.useState(null), [j, X] = c.useState(null), [Ke, Z] = c.useState(null), [be, Pe] = c.useState(false), [Xt, wt] = c.useState(false), [Ur, Ae] = c.useState(false), [ve, kt] = c.useState(null), [jt, _e] = c.useState(null), [Qe, we] = c.useState(false), [Xe, qr] = c.useState(null), [Nt, Lr] = c.useState(null), Ze = c.useRef(null), [ke, Br] = c.useState(false), [Te, Hr] = c.useState(""), [Re, zr] = c.useState(""), St = !!(d.name && d.street && d.city && d.zip && d.country && d.phone && (k !== "crypto" || u !== null) && (k !== "wero" || ae === "qr" || ae === "phone" && ge.trim().length > 6) && (!ke || Te && Re.length >= 6)), Vr = async (r) => {
    if (J(r)) {
      Pe(true);
      try {
        const o = window.cardano;
        if (o && o[r]) {
          const C = await (await qt.enable(r)).getChangeAddress();
          C ? (fe(r), X(C), Z(null)) : alert(`Connected to ${r}, but no change address found.`);
        } else alert(`${r} wallet extension not found. Please install ${r} to continue.`);
      } catch (o) {
        console.error(`Failed to connect to ${r} wallet:`, o), alert(`Connection to ${r} wallet was rejected or failed. Details: ${(o == null ? void 0 : o.info) || (o == null ? void 0 : o.message) || JSON.stringify(o)}`);
      } finally {
        Pe(false);
      }
    } else if (r === "metamask" || r === "coinbase" || r === "trust") {
      Pe(true);
      try {
        const o = window.ethereum;
        if (!o) {
          alert(`${r === "metamask" ? "MetaMask" : r === "coinbase" ? "Coinbase Wallet" : "Trust Wallet"} extension not found. Please install the extension to continue.`), Pe(false);
          return;
        }
        let x = o;
        o.providers && Array.isArray(o.providers) && (r === "metamask" ? x = o.providers.find((y) => y.isMetaMask) || o : r === "coinbase" ? x = o.providers.find((y) => y.isCoinbaseWallet) || o : r === "trust" && (x = o.providers.find((y) => y.isTrust) || o));
        const C = await x.request({ method: "eth_requestAccounts" });
        if (C && C.length > 0) {
          fe(r), X(C[0]), Z(null);
          try {
            const y = await x.request({ method: "eth_chainId" });
            qr(y);
          } catch (y) {
            console.warn("Failed to get EVM chain ID during connect:", y);
          }
        } else alert("No EVM accounts found.");
      } catch (o) {
        console.error(`Failed to connect to ${r} wallet:`, o), alert(`Connection to ${r} wallet was rejected or failed. Details: ${(o == null ? void 0 : o.message) || JSON.stringify(o)}`);
      } finally {
        Pe(false);
      }
    } else fe(r), X("0x" + Math.random().toString(16).slice(2, 10) + "..." + Math.random().toString(16).slice(2, 6)), Z(null);
  }, Jr = async () => {
    var _a3;
    if (u) {
      wt(true);
      try {
        if (J(u)) {
          const x = ((_a3 = (await (await qt.enable(u)).getBalance()).find((y) => y.unit === "lovelace")) == null ? void 0 : _a3.quantity) || "0", C = (Number(x) / 1e6).toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          Z(`${C} ADA`);
        } else if (u === "metamask" || u === "coinbase" || u === "trust") {
          const r = window.ethereum;
          if (r) {
            let o = r;
            r.providers && Array.isArray(r.providers) && (u === "metamask" ? o = r.providers.find((ee) => ee.isMetaMask) || r : u === "coinbase" ? o = r.providers.find((ee) => ee.isCoinbaseWallet) || r : u === "trust" && (o = r.providers.find((ee) => ee.isTrust) || r));
            const x = await o.request({ method: "eth_getBalance", params: [j, "latest"] }), y = (parseInt(x, 16) / 1e18).toFixed(4);
            Z(`${y} ${Be[u].symbol}`);
          } else Z(`0.0000 ${Be[u].symbol}`);
        } else setTimeout(() => {
          Z(`1.25 ${Be[u].symbol}`), wt(false);
        }, 800);
      } catch (r) {
        console.error("Failed to check balance:", r);
      } finally {
        wt(false);
      }
    }
  }, [Zt, Yr] = c.useState(null), [et, Gr] = c.useState(null), [De, Kr] = c.useState(null), [Ct, er] = c.useState(false), [tr, rr] = c.useState(null), [tt, ar] = c.useState(null), [Me, sr] = c.useState(null), [nr, Et] = c.useState(null), [or, Pt] = c.useState(null), [rt, At] = c.useState(null), [Fe, _t] = c.useState(null), [Tt, ir] = c.useState(false), [at, Rt] = c.useState(null), [lr, Dt] = c.useState(null), [Oe, Mt] = c.useState(null), [Ft, cr] = c.useState(false), pe = c.useRef(false);
  c.useEffect(() => () => {
    if (pe.current) return;
    const r = De || Me || Fe || Oe;
    r && (async () => {
      try {
        await _.rpc("cancel_order_with_inventory", { p_order_id: r });
      } catch (x) {
        console.error("Failed to cancel order on unmount:", x);
      }
    })();
  }, [De, Me, Fe, Oe]);
  const Qr = async (r) => {
    var _a3, _b2;
    const o = `${d.name}
${d.street}
${d.city}, ${d.zip}
${d.country}`.trim();
    if (!o || !d.phone) return;
    if (G && A && !A.is_anonymous) try {
      S.databaseProvider === "supabase" && await _.from("user_roles").update({ name: d.name, street: d.street, city: d.city, zip: d.zip, phone: d.phone, country: d.country, is_guest: false }).eq("user_id", A.id || A.$id);
    } catch (y) {
      console.error("Failed to save address to user_roles:", y);
    }
    const x = ke ? { email: Te, password: Re } : void 0, C = ((_a3 = d.invoiceEmail) == null ? void 0 : _a3.trim()) || void 0;
    if (k === "stripe") {
      er(true);
      try {
        const y = await t(o, d.phone, x, C);
        S.activeFiatGateway === "adyen" && (rr(y.clientSecret), ar(y.paymentId), sr(y.orderId || null));
      } catch (y) {
        console.error("Failed to initiate Adyen payment:", y);
      } finally {
        er(false);
      }
    } else if (k === "wero" || k === "worldline") {
      ir(true);
      try {
        const y = await a(o, d.phone, ge, ae, x, C);
        At(y.paymentId), Et(y.qrCodeData), Pt(y.redirectUrl), _t(y.orderId || null);
      } catch (y) {
        console.error("Failed to initiate Wero payment:", y);
      } finally {
        ir(false);
      }
    } else if (k === "digital_euro") {
      cr(true);
      try {
        const y = await n(o, d.phone, x, C);
        Rt(y.paymentId), Dt(y.redirectUrl), Mt(y.orderId || null);
      } catch (y) {
        console.error("Failed to initiate Digital Euro payment:", y);
      } finally {
        cr(false);
      }
    } else if (k === "crypto" && (J(u) || u === "metamask" || u === "coinbase" || u === "trust")) {
      Ae(true), _e(null), we(false);
      const y = N(u), ee = ke ? { email: Te, password: Re } : void 0, st = ((_b2 = d.invoiceEmail) == null ? void 0 : _b2.trim()) || void 0;
      try {
        const me = J(u), ea = me ? "ADA" : f, ta = me || f === "ETH" ? 6 : 2, $e = await i(o, d.phone, { txHash: "", customerAddress: j || "", walletName: u, adaAmount: (R * y).toFixed(ta), rateUsed: y, coinSymbol: ea }, ee, st), Q = $e.paymentId;
        Lr(Q);
        const { data: ur, error: Ot } = await _.functions.invoke("cardano-x402-checkout", { body: { payment_id: Q } });
        if (Ot || !ur) {
          const W = Ot ? await Sr(Ot) : "Failed to retrieve x402 payment requirements from Edge function.";
          throw new Error(W);
        }
        const { amount: Ie, asset: nt, payTo: $t } = ur.requirements;
        if (J(u)) {
          const W = await qt.enable(u), te = await W.getUtxos();
          console.log("DEBUG [Cardano UTxOs]:", JSON.stringify(te, null, 2));
          const re = await W.getBalance();
          console.log("DEBUG [Cardano Balance]:", JSON.stringify(re, null, 2));
          const ce = await W.getChangeAddress();
          console.log("DEBUG [Cardano Change Address]:", ce);
          const se = new ha(), ne = BigInt(Ie), je = nt === "lovelace" ? ne < 1000000n ? 1000000n : ne : 1000000n, xe = BigInt(S.x402CardanoNetworkFeeLovelace || 2e5), P = je + xe;
          let D = 0n;
          const z = [], Y = [...te].sort((U, Ne) => {
            var _a4, _b3;
            const Ue = BigInt(((_a4 = U.output.amount.find((It) => It.unit === "lovelace")) == null ? void 0 : _a4.quantity) || "0"), aa = BigInt(((_b3 = Ne.output.amount.find((It) => It.unit === "lovelace")) == null ? void 0 : _b3.quantity) || "0");
            return Ue < aa ? 1 : -1;
          });
          for (const U of Y) {
            const Ne = U.output.amount.find((Ue) => Ue.unit === "lovelace");
            if (Ne && (z.push(U), D += BigInt(Ne.quantity), D >= P)) break;
          }
          if (D < P) throw new Error(`Insufficient funds in wallet. Required: ${(Number(P) / 1e6).toFixed(2)} ADA, Available: ${(Number(D) / 1e6).toFixed(2)} ADA`);
          for (const U of z) se.txIn(U.input.txHash, U.input.outputIndex, U.output.amount, U.output.address);
          nt === "lovelace" ? se.txOut($t, [{ unit: "lovelace", quantity: je.toString() }]) : se.txOut($t, [{ unit: "lovelace", quantity: je.toString() }, { unit: nt, quantity: Ie }]);
          const L = D - je - xe;
          L > 0n && se.txOut(ce, [{ unit: "lovelace", quantity: L.toString() }]), se.setFee(xe.toString());
          const V = se.completeUnbalancedSync(), oe = await W.signTx(V), { data: ot, error: it } = await _.functions.invoke("cardano-x402-checkout", { body: { action: "submit_tx", txHex: oe } });
          if (it || !(ot == null ? void 0 : ot.success)) {
            const U = it ? await Sr(it) : "Failed to submit transaction via x402 edge function.";
            throw new Error(U);
          }
          const We = ot.txHash;
          kt(We), we(true);
          let lt = false, ct = false;
          const ra = (S.cryptoPaymentTimeoutMinutes || 3) * 60 * 1e3, pr = setTimeout(async () => {
            if (ct = true, we(false), Ae(false), _e(`Crypto payment confirmation timed out after ${S.cryptoPaymentTimeoutMinutes || 3} minutes.`), Q && S.databaseProvider === "supabase") try {
              await _.from("payments").update({ provider_status: "expired", completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", Q);
            } catch (U) {
              console.error("Failed to mark payment as expired:", U);
            }
            if ($e.orderId && S.databaseProvider === "supabase") try {
              await _.rpc("cancel_order_with_inventory", { p_order_id: $e.orderId });
            } catch (U) {
              console.error("Failed to cancel order on timeout:", U);
            }
          }, ra);
          for (Ze.current = pr; !lt && !ct; ) {
            const { data: U, error: Ne } = await _.functions.invoke("cardano-x402-checkout", { body: { action: "confirm", payment_id: Q, txHash: We } });
            if (!Ne && (U == null ? void 0 : U.status) === "succeeded") {
              lt = true, clearTimeout(pr), pe.current = true, l(k, o, d.phone, ee, st, void 0, void 0, { txHash: We, customerAddress: j || "", walletName: u || "lace", adaAmount: (Number(Ie) / 1e6).toString(), rateUsed: y, paymentId: Q });
              break;
            }
            await new Promise((Ue) => setTimeout(Ue, 5e3));
          }
        } else {
          const W = window.ethereum;
          if (!W) throw new Error("No EVM wallet extension detected.");
          let te = W;
          W.providers && Array.isArray(W.providers) && (u === "metamask" ? te = W.providers.find((P) => P.isMetaMask) || W : u === "coinbase" ? te = W.providers.find((P) => P.isCoinbaseWallet) || W : u === "trust" && (te = W.providers.find((P) => P.isTrust) || W));
          let re = "", ce = "", se = false;
          try {
            console.log("Fetching cross-chain swap details from DLN API...");
            let P = "", D = 18;
            if (f === "ETH") P = "0x0000000000000000000000000000000000000000", D = 18;
            else {
              const V = Xe === "0x1", oe = Er[f];
              P = V ? oe.addresses.mainnet : oe.addresses.sepolia, D = oe.decimals;
            }
            const z = new URLSearchParams({ srcChainId: Xe === "0x1" ? "1" : "11155111", srcChainTokenIn: P, srcChainTokenInAmount: Math.round(R * y * Math.pow(10, D)).toString(), dstChainId: "cardano", dstChainTokenOut: nt === "lovelace" ? "ADA" : "USDM", dstChainTokenOutRecipient: $t, dstChainTokenOutAmount: Ie }), Y = await fetch(`https://api.dln.trade/v1.0/dln/order/create-tx?${z}`);
            if (!Y.ok) throw new Error(`DLN API status: ${Y.status}`);
            const L = await Y.json();
            if (!L.tx) throw new Error("No transaction details in DLN response.");
            console.log("Sending cross-chain bridge transaction via MetaMask..."), re = await te.request({ method: "eth_sendTransaction", params: [{ from: j, to: L.tx.to, data: L.tx.data, value: L.tx.value || "0x0" }] }), se = true;
          } catch (P) {
            console.warn("Failed to create cross-chain swap, falling back to direct native/ERC20 EVM payment:", P);
            const D = S.cryptoReceiverAddresses[u];
            if (!D) throw new Error(`Receiver address not configured for wallet: ${u}`);
            if (f === "ETH") {
              const z = R * y, V = "0x" + Math.round(z * Math.pow(10, 18)).toString(16);
              re = await te.request({ method: "eth_sendTransaction", params: [{ from: j, to: D, value: V }] });
            } else {
              const z = Xe === "0x1", Y = Er[f], L = z ? Y.addresses.mainnet : Y.addresses.sepolia, V = R * y, oe = BigInt(Math.round(V * Math.pow(10, Y.decimals))), ot = "a9059cbb", We = (D.startsWith("0x") ? D.slice(2) : D).padStart(64, "0"), lt = oe.toString(16).padStart(64, "0"), ct = "0x" + ot + We + lt;
              re = await te.request({ method: "eth_sendTransaction", params: [{ from: j, to: L, data: ct, value: "0x0" }] });
            }
          }
          if (!re) throw new Error("Transaction was rejected or failed to generate hash.");
          kt(re), we(true);
          let ne = false;
          const je = (S.cryptoPaymentTimeoutMinutes || 3) * 60 * 1e3, xe = setTimeout(async () => {
            if (ne = true, we(false), Ae(false), _e(`Crypto payment confirmation timed out after ${S.cryptoPaymentTimeoutMinutes || 3} minutes.`), Q && S.databaseProvider === "supabase") try {
              await _.from("payments").update({ provider_status: "expired", completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", Q);
            } catch (P) {
              console.error("Failed to update expired payment:", P);
            }
            if ($e.orderId && S.databaseProvider === "supabase") try {
              await _.rpc("cancel_order_with_inventory", { p_order_id: $e.orderId });
            } catch (P) {
              console.error("Failed to cancel order on timeout:", P);
            }
          }, je);
          if (Ze.current = xe, se) {
            let P = 0;
            const D = 60;
            for (; P < D && !ne; ) {
              const L = await fetch(`https://api.dln.trade/v1.0/dln/order/status?txHash=${re}`);
              if (L.ok) {
                const V = await L.json();
                if (V.dstTxHash) {
                  ce = V.dstTxHash, kt(ce);
                  break;
                }
              }
              P++, await new Promise((V) => setTimeout(V, 5e3));
            }
            if (!ce && !ne) throw new Error("Bridge timed out waiting to submit transaction to Cardano.");
            let z = false, Y = 0;
            for (; !z && Y < 30 && !ne; ) {
              const { data: L, error: V } = await _.functions.invoke("cardano-x402-checkout", { body: { action: "confirm", payment_id: Q, txHash: ce } });
              if (!V && (L == null ? void 0 : L.status) === "succeeded") {
                z = true, clearTimeout(xe), pe.current = true, l(k, o, d.phone, ee, st, void 0, void 0, { txHash: ce, customerAddress: j || "", walletName: u, adaAmount: (Number(Ie) / 1e6).toString(), rateUsed: y, paymentId: Q });
                break;
              }
              Y++, await new Promise((oe) => setTimeout(oe, 5e3));
            }
            if (!z && !ne) throw new Error("Cardano verification on-chain timed out.");
          } else {
            let P = false;
            for (; !P && !ne; ) {
              const D = await te.request({ method: "eth_getTransactionReceipt", params: [re] });
              if (D) if (D.status === "0x1" || D.status === 1 || D.status === true) {
                P = true, clearTimeout(xe), pe.current = true, l(k, o, d.phone, ee, st, void 0, void 0, { txHash: re, customerAddress: j || "", walletName: u, adaAmount: (R * y).toFixed(f === "ETH" ? 6 : 2), rateUsed: y, paymentId: Q, coinSymbol: f });
                break;
              } else throw new Error("EVM transaction failed or reverted.");
              await new Promise((z) => setTimeout(z, 5e3));
            }
          }
        }
      } catch (me) {
        console.error("Crypto payment failed:", me), _e((me == null ? void 0 : me.message) || (me == null ? void 0 : me.info) || JSON.stringify(me));
      } finally {
        Ae(false);
      }
    } else l(k, o, d.phone, x, C, r);
  }, Xr = async () => {
    await Qr();
  }, Zr = async () => {
    var _a3;
    Ze.current && clearTimeout(Ze.current), Ae(false), we(false), pe.current = true;
    const r = ve || `tx_mock_${Math.random().toString(36).substring(2, 11)}`, o = N(u || "lace"), x = (R * o).toFixed(6);
    if (Nt && S.databaseProvider === "supabase") try {
      await _.from("payments").update({ provider_status: "succeeded", completed_at: (/* @__PURE__ */ new Date()).toISOString(), amount_paid: Math.round(R * 100), provider_payment_id: r }).eq("id", Nt);
    } catch (C) {
      console.error("Failed to update payment status to succeeded in simulation:", C);
    }
    l(k, `${d.name}
${d.street}
${d.city}, ${d.zip}
${d.country}`.trim(), d.phone, ke ? { email: Te, password: Re } : void 0, ((_a3 = d.invoiceEmail) == null ? void 0 : _a3.trim()) || void 0, void 0, void 0, { txHash: r, customerAddress: j || "0xMockCustomerAddress", walletName: u || "lace", adaAmount: x, rateUsed: o, paymentId: Nt || void 0 });
  }, dr = zt().find((r) => r.id === k) || zt()[0];
  return e.jsxs("div", { className: "min-h-screen bg-background transition-colors duration-500 overflow-x-hidden", children: [e.jsx("div", { className: "bg-card text-card-foreground border-b border-gray-100 dark:border-slate-800 sticky top-0 z-30 transition-colors", children: e.jsxs("div", { className: "max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center gap-3 sm:gap-4", children: [e.jsx("button", { onClick: s2, className: "p-2 sm:p-2.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-all text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white active:scale-95 shrink-0", children: e.jsx(ga, { className: "w-5 h-5" }) }), e.jsxs("div", { className: "flex-grow min-w-0", children: [e.jsx("h1", { className: "text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight truncate", children: "Checkout" }), e.jsxs("p", { className: "text-[10px] sm:text-xs font-semibold text-gray-400 dark:text-gray-500 tracking-wide truncate", children: [ie, " item", ie !== 1 ? "s" : "", " in your order"] })] }), e.jsxs("div", { className: "flex items-center gap-1 sm:gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shrink-0", children: [e.jsx(He, { className: "w-3 h-3 sm:w-3.5 sm:h-3.5" }), e.jsx("span", { className: "text-[9px] sm:text-[10px] font-bold uppercase tracking-widest hidden sm:inline", children: "Secure" })] })] }) }), e.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: [e.jsx("div", { className: "flex items-center justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8", children: ["Shipping", "Payment", "Confirm"].map((r, o) => e.jsxs("div", { className: "flex items-center gap-2", children: [e.jsxs("div", { className: `flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all ${o <= 1 ? "bg-gray-900 dark:bg-indigo-600 text-white" : "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-500"}`, children: [e.jsx("span", { className: "w-4 h-4 flex items-center justify-center text-[10px] rounded-full bg-white/20", children: o + 1 }), e.jsx("span", { className: "hidden sm:inline", children: r })] }), o < 2 && e.jsx(ia, { className: "w-4 h-4 text-gray-300" })] }, r)) }), e.jsxs("div", { className: "grid lg:grid-cols-12 gap-6 sm:gap-8 items-start", children: [e.jsxs("div", { className: "lg:col-span-7 space-y-6", children: [e.jsxs(F.section, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "bg-card text-card-foreground rounded-[1rem] border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm transition-colors", children: [e.jsxs("div", { className: "px-4 sm:px-7 py-4 sm:py-5 border-b border-gray-50 dark:border-slate-800 flex items-center gap-3", children: [e.jsx("div", { className: "p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl transition-colors", children: e.jsx(la, { className: "w-5 h-5" }) }), e.jsxs("div", { children: [e.jsx("h2", { className: "text-base font-extrabold text-gray-900 dark:text-white tracking-tight", children: "Shipping Address" }), e.jsx("p", { className: "text-[11px] font-medium text-gray-400 dark:text-gray-500", children: "Where should we deliver your order?" })] })] }), e.jsxs("div", { className: "p-4 sm:p-7 grid sm:grid-cols-2 gap-4 sm:gap-5", children: [e.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [e.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1", children: [e.jsx(ca, { className: "w-3 h-3" }), " Full Name"] }), e.jsx("input", { type: "text", value: d.name, onChange: (r) => K((o) => ({ ...o, name: r.target.value })), placeholder: "John Doe", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), e.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [e.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1", children: [e.jsx(da, { className: "w-3 h-3" }), " Street Address"] }), e.jsx("input", { type: "text", value: d.street, onChange: (r) => K((o) => ({ ...o, street: r.target.value })), placeholder: "123 Magic Avenue", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), e.jsxs("div", { className: "space-y-1.5", children: [e.jsx("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5", children: "City" }), e.jsx("input", { type: "text", value: d.city, onChange: (r) => K((o) => ({ ...o, city: r.target.value })), placeholder: "Magical Product town", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), e.jsxs("div", { className: "space-y-1.5", children: [e.jsx("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5", children: "ZIP Code" }), e.jsx("input", { type: "text", value: d.zip, onChange: (r) => K((o) => ({ ...o, zip: r.target.value })), placeholder: "12345", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), e.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [e.jsx("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5", children: "Country" }), e.jsxs("select", { value: d.country, onChange: (r) => K((o) => ({ ...o, country: r.target.value })), className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium text-gray-900 dark:text-white", children: [e.jsx("option", { value: "", children: "Select a country" }), e.jsx("option", { value: "FR", children: "France" }), e.jsx("option", { value: "DE", children: "Germany" }), e.jsx("option", { value: "BE", children: "Belgium" }), e.jsx("option", { value: "NL", children: "Netherlands" }), e.jsx("option", { value: "ES", children: "Spain" }), e.jsx("option", { value: "IT", children: "Italy" }), e.jsx("option", { value: "GB", children: "United Kingdom" }), e.jsx("option", { value: "US", children: "United States" })] })] }), e.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [e.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1", children: [e.jsx(ya, { className: "w-3 h-3" }), " Mobile or WhatsApp Number"] }), e.jsx("input", { type: "tel", value: d.phone, onChange: (r) => K((o) => ({ ...o, phone: r.target.value })), placeholder: "+1 (555) 000-0000", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), e.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [e.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.12em] ml-0.5 flex items-center gap-1", children: [e.jsx(mr, { className: "w-3 h-3" }), " Email for Invoice ", e.jsx("span", { className: "text-gray-300 dark:text-gray-600 normal-case font-medium", children: "(optional)" })] }), e.jsx("input", { type: "email", value: d.invoiceEmail, onChange: (r) => K((o) => ({ ...o, invoiceEmail: r.target.value })), placeholder: "your@email.com", className: "w-full px-4 py-3 bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600 text-gray-900 dark:text-white" })] }), A && !A.is_anonymous && e.jsx("div", { className: "sm:col-span-2 pt-2", children: e.jsxs("label", { className: "flex items-center gap-3 p-4 bg-indigo-50/30 dark:bg-indigo-900/10 border border-indigo-100/50 dark:border-indigo-900/30 rounded-2xl cursor-pointer hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group", children: [e.jsxs("div", { className: "relative flex items-center justify-center mt-0.5", children: [e.jsx("input", { type: "checkbox", checked: G, onChange: (r) => ye(r.target.checked), className: "peer appearance-none w-5 h-5 border-2 border-indigo-300 dark:border-indigo-700 rounded bg-white dark:bg-slate-800 checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" }), e.jsx(ze, { className: "w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" })] }), e.jsxs("div", { children: [e.jsx("h4", { className: "text-xs font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors", children: "Save address for faster checkout later" }), e.jsx("p", { className: "text-[10px] text-gray-500 dark:text-gray-400 mt-0.5", children: "We will save your name, street, city, ZIP, country, and phone number to your profile." })] })] }) })] })] }), e.jsxs(F.section, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "bg-card text-card-foreground rounded-[1rem] border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm transition-colors", children: [e.jsxs("div", { className: "px-4 sm:px-7 py-4 sm:py-5 border-b border-gray-50 dark:border-slate-800 flex items-center gap-3", children: [e.jsx("div", { className: "p-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl transition-colors", children: e.jsx(Je, { className: "w-5 h-5" }) }), e.jsxs("div", { children: [e.jsx("h2", { className: "text-base font-extrabold text-gray-900 dark:text-white tracking-tight", children: "Payment Method" }), e.jsx("p", { className: "text-[11px] font-medium text-gray-400 dark:text-gray-500", children: "Choose how you'd like to pay" })] })] }), e.jsxs("div", { className: "p-4 sm:p-7", children: [e.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-5 sm:mb-6", children: H.map((r) => e.jsxs(F.button, { onClick: () => ft(r.id), whileTap: { scale: 0.96 }, className: `relative flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 overflow-hidden ${k === r.id ? `border-transparent text-white shadow-lg ${r.shadow}` : "border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 text-gray-400 dark:text-gray-500 hover:border-gray-200 dark:hover:border-slate-600 hover:text-gray-600 dark:hover:text-gray-300"}`, children: [k === r.id && e.jsx(F.div, { layoutId: "payment-bg", className: `absolute inset-0 bg-gradient-to-br ${r.color}`, transition: { type: "spring", stiffness: 300, damping: 25 } }), e.jsx(r.icon, { className: "w-5 h-5 sm:w-6 sm:h-6 relative z-10" }), e.jsx("span", { className: "text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest relative z-10", children: r.label })] }, r.id)) }), e.jsxs(Wt, { mode: "wait", children: [k === "stripe" && e.jsx(F.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "space-y-4 overflow-hidden py-2", children: e.jsxs("div", { className: "p-4 bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl flex flex-col items-center text-center gap-3", children: [e.jsx(Je, { className: "w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-pulse" }), e.jsxs("div", { children: [e.jsx("p", { className: "text-sm font-bold text-gray-800 dark:text-gray-200", children: "Secure Adyen Checkout" }), e.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm", children: "Click 'Confirm Order' to proceed to the secure, encrypted Adyen checkout page." })] })] }) }, "stripe-fields"), k === "paypal" && e.jsx(F.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "overflow-hidden", children: e.jsx("div", { className: "p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 transition-colors text-center", children: e.jsx("p", { className: "text-sm font-semibold text-blue-700 dark:text-blue-300", children: "You'll be redirected to PayPal to complete payment." }) }) }, "paypal-info"), k === "crypto" && e.jsx(F.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "overflow-hidden", children: e.jsxs("div", { className: "p-4 sm:p-5 bg-gradient-to-b from-amber-50/50 to-amber-50 rounded-2xl border border-amber-200/60 flex flex-col gap-3 sm:gap-4", children: [e.jsxs("div", { className: "text-center", children: [e.jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-600 rounded-full mb-3", children: e.jsx(hr, { className: "w-6 h-6" }) }), e.jsx("h3", { className: "text-sm font-extrabold text-amber-900 tracking-tight", children: "Connect Web3 Wallet" }), e.jsx("p", { className: "text-[11px] font-medium text-amber-700/70 mt-1", children: "Select a wallet to proceed with crypto payment." })] }), e.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5", children: Cr.map((r) => e.jsxs("button", { onClick: () => Vr(r.id), disabled: be, className: `relative flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl font-bold text-[10px] sm:text-xs transition-all duration-200 ${u === r.id ? `${r.color} ring-2 ring-offset-2 ring-amber-400 shadow-md` : "bg-white text-gray-700 border border-amber-100 hover:border-amber-300 hover:bg-amber-50/50"} ${be ? "opacity-50 cursor-not-allowed" : ""}`, children: [e.jsxs("span", { className: "truncate mr-2", children: [r.name, " ", be && r.id === "lace" ? "(Connecting...)" : ""] }), u === r.id && e.jsx(ze, { className: "w-4 h-4 shrink-0" })] }, r.id)) }), u && e.jsxs(F.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "mt-2 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-amber-200/50 text-center space-y-3", children: [e.jsxs("div", { children: [e.jsxs("p", { className: "text-xs font-semibold text-amber-800", children: ["Connected to ", (_a2 = Cr.find((r) => r.id === u)) == null ? void 0 : _a2.name] }), j && e.jsx("p", { className: "text-[10px] font-mono text-amber-600/80 mt-1 bg-amber-100/50 block px-2 py-1 rounded break-all select-all", children: j }), e.jsx("div", { className: "mt-3", children: Ke ? e.jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-lg border border-green-200/50", children: [e.jsx(xr, { className: "w-3.5 h-3.5" }), Ke] }) : e.jsxs("button", { onClick: Jr, disabled: Xt, className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50", children: [e.jsx(xr, { className: "w-3.5 h-3.5" }), Xt ? "Checking..." : "Check Balance"] }) })] }), !J(u) && e.jsxs("div", { className: "mt-4 text-left space-y-1.5 border-t border-amber-200/30 pt-3", children: [e.jsx("label", { className: "text-[10px] font-bold text-amber-700/70 uppercase tracking-wider block", children: "Pay With Token" }), e.jsx("div", { className: "grid grid-cols-3 gap-2", children: ["ETH", "USDC", "EURC"].map((r) => e.jsx("button", { onClick: () => b(r), className: `px-2 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wide transition-all duration-150 border ${f === r ? "bg-amber-600 text-white border-amber-700 shadow-sm" : "bg-white text-gray-700 border-amber-200/50 hover:bg-amber-50"}`, children: r }, r)) })] }), e.jsxs("div", { className: "pt-3 border-t border-amber-200/50 text-left space-y-2", children: [e.jsx("p", { className: "text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-1", children: "Payment Details" }), e.jsxs("div", { className: "flex justify-between items-center bg-amber-50/80 px-3 py-2 rounded-lg", children: [e.jsx("span", { className: "text-xs font-medium text-amber-700", children: "Amount Due" }), e.jsxs("span", { className: "text-sm font-extrabold text-amber-900", children: [(R * N(u)).toFixed(J(u) || f === "ETH" ? 4 : 2), " ", J(u) ? ((_b = Be[u]) == null ? void 0 : _b.symbol) || "ADA" : f] })] }), e.jsxs("div", { className: "bg-amber-50/80 px-3 py-2 rounded-lg space-y-1", children: [e.jsx("span", { className: "text-[10px] font-bold text-amber-700/70 uppercase tracking-wider", children: "Send to Address" }), e.jsx("p", { className: "text-xs font-mono text-amber-900 break-all select-all bg-white/50 p-1.5 rounded", children: J(u) ? S.cryptoReceiverAddresses.lace : S.cryptoReceiverAddresses[u] })] })] })] })] }) }, "crypto-info"), k === "wero" && e.jsx(F.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "overflow-hidden", children: e.jsxs("div", { className: "p-4 sm:p-5 bg-gradient-to-b from-purple-50/50 to-purple-50 rounded-2xl border border-purple-200/60 flex flex-col gap-3 sm:gap-4", children: [e.jsxs("div", { className: "text-center", children: [e.jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full mb-3 animate-pulse", children: e.jsx(Ye, { className: "w-6 h-6" }) }), e.jsx("h3", { className: "text-sm font-extrabold text-purple-900 tracking-tight", children: "Wero Instant Transfer" }), e.jsx("p", { className: "text-[11px] font-medium text-purple-700/70 mt-1", children: "Pay instantly and securely from your banking app." })] }), e.jsxs("div", { className: "flex gap-2 p-1 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-200/50", children: [e.jsx("button", { type: "button", onClick: () => Ge("phone"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${ae === "phone" ? "bg-purple-600 text-white shadow-sm font-black" : "text-purple-600/70 hover:text-purple-700 hover:bg-purple-50/30"}`, children: "Phone Number" }), e.jsx("button", { type: "button", onClick: () => Ge("qr"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${ae === "qr" ? "bg-purple-600 text-white shadow-sm font-black" : "text-purple-600/70 hover:text-purple-700 hover:bg-purple-50/30"}`, children: "QR Code" })] }), ae === "phone" ? e.jsxs("div", { className: "space-y-1.5 text-left bg-white/40 p-3.5 rounded-xl border border-purple-200/30", children: [e.jsxs("label", { className: "text-[10px] font-bold text-purple-400 dark:text-purple-500 uppercase tracking-widest ml-0.5 flex items-center gap-1", children: [e.jsx(Ye, { className: "w-3 h-3" }), " Wero Registered Phone"] }), e.jsx("input", { type: "tel", value: ge, onChange: (r) => bt(r.target.value), placeholder: "+33 6 12 34 56 78", className: "w-full px-4 py-3 bg-white border border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all text-sm font-medium text-gray-800" }), e.jsx("p", { className: "text-[9px] text-purple-600/60 font-semibold mt-1", children: "Ensure this phone number is registered with Wero in your bank app." })] }) : e.jsxs("div", { className: "p-4 bg-white/40 text-center rounded-xl border border-purple-200/30 space-y-1", children: [e.jsx(Pr, { className: "w-8 h-8 text-purple-600 mx-auto opacity-80" }), e.jsx("p", { className: "text-xs font-bold text-purple-900", children: "QR Code Checkout" }), e.jsx("p", { className: "text-[10px] text-purple-700/60 leading-relaxed", children: "A checkout QR code will generate for you to scan and authorize in your banking app." })] })] }) }, "wero-info"), k === "digital_euro" && e.jsx(F.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "overflow-hidden", children: e.jsxs("div", { className: "p-4 sm:p-5 bg-gradient-to-b from-cyan-50/60 to-blue-50 rounded-2xl border border-cyan-200/70 flex flex-col gap-3 sm:gap-4", children: [e.jsxs("div", { className: "text-center", children: [e.jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 bg-cyan-100 text-cyan-700 rounded-full mb-3", children: e.jsx(xt, { className: "w-6 h-6" }) }), e.jsx("h3", { className: "text-sm font-extrabold text-cyan-950 tracking-tight", children: "Digital Euro Sandbox" }), e.jsx("p", { className: "text-[11px] font-medium text-cyan-800/70 mt-1", children: "Simulates a future PSP-hosted Digital Euro authorization flow for testing checkout plumbing." })] }), e.jsxs("div", { className: "grid grid-cols-2 gap-2 text-left", children: [e.jsxs("div", { className: "bg-white/60 border border-cyan-100 rounded-xl p-3", children: [e.jsx("p", { className: "text-[9px] font-black uppercase tracking-wider text-cyan-500", children: "Currency" }), e.jsx("p", { className: "text-sm font-extrabold text-cyan-950 mt-0.5", children: "EUR" })] }), e.jsxs("div", { className: "bg-white/60 border border-cyan-100 rounded-xl p-3", children: [e.jsx("p", { className: "text-[9px] font-black uppercase tracking-wider text-cyan-500", children: "Mode" }), e.jsx("p", { className: "text-sm font-extrabold text-cyan-950 mt-0.5", children: "Sandbox" })] })] })] }) }, "digital-euro-info")] })] })] })] }), e.jsx("div", { className: "lg:col-span-5 relative", children: e.jsxs(F.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.15 }, className: "sticky top-24 rounded-[1rem] overflow-hidden", children: [e.jsxs("div", { className: "bg-gradient-to-b from-gray-900 to-gray-950 text-white p-5 sm:p-7 relative", children: [e.jsx("div", { className: "absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" }), e.jsxs("div", { className: "flex items-center justify-between mb-6 relative", children: [e.jsx("h2", { className: "text-lg font-extrabold tracking-tight", children: "Order Summary" }), e.jsxs("span", { className: "text-[10px] font-bold text-white/40 uppercase tracking-widest bg-white/[0.06] px-2.5 py-1 rounded-full", children: [ie, " item", ie !== 1 ? "s" : ""] })] }), e.jsx("div", { className: "space-y-3 mb-6 max-h-[280px] overflow-y-auto pr-1 relative", style: { scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }, children: B.map((r, o) => e.jsxs(F.div, { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.2 + o * 0.05 }, className: "flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] transition-colors group", children: [e.jsx("div", { className: "w-11 h-11 rounded-lg overflow-hidden bg-white/[0.08] flex-shrink-0 flex items-center justify-center", children: e.jsx("img", { src: r.image_url, alt: r.title, className: "w-full h-full object-contain p-1", referrerPolicy: "no-referrer" }) }), e.jsxs("div", { className: "min-w-0 flex-grow", children: [e.jsx("h4", { className: "font-bold text-sm truncate text-white/90", children: r.title }), e.jsxs("p", { className: "text-[11px] text-white/30 font-medium tabular-nums", children: [r.cart_quantity, " \xD7 ", S.currency_symbol, (r.discount_percentage && r.discount_percentage > 0 ? r.price * (1 - r.discount_percentage / 100) : r.price).toFixed(2)] })] }), e.jsxs("div", { className: "font-bold text-sm tabular-nums text-white/70 group-hover:text-white transition-colors", children: [S.currency_symbol, (r.cart_quantity * (r.discount_percentage && r.discount_percentage > 0 ? r.price * (1 - r.discount_percentage / 100) : r.price)).toFixed(2)] })] }, r.id)) }), e.jsxs("div", { className: "space-y-2.5 pt-5 border-t border-white/[0.06]", children: [e.jsxs("div", { className: "flex justify-between text-sm", children: [e.jsx("span", { className: "text-white/40 font-medium", children: "Subtotal" }), e.jsxs("span", { className: "text-white/70 font-bold tabular-nums", children: [S.currency_symbol, R.toFixed(2)] })] }), e.jsxs("div", { className: "flex justify-between text-sm", children: [e.jsx("span", { className: "text-white/40 font-medium", children: "Shipping" }), e.jsx("span", { className: "text-emerald-400 font-bold text-xs bg-emerald-400/10 px-2 py-0.5 rounded-full uppercase tracking-widest", children: "Free" })] }), e.jsx("div", { className: "h-px bg-white/[0.06] my-1" }), e.jsxs("div", { className: "flex justify-between items-baseline pt-2", children: [e.jsx("span", { className: "font-extrabold text-white/60 text-sm", children: "Total" }), e.jsxs(F.span, { initial: { scale: 1.08 }, animate: { scale: 1 }, className: "text-xl sm:text-3xl font-black tabular-nums bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent", children: [S.currency_symbol, R.toFixed(2)] }, R)] })] })] }), (A == null ? void 0 : A.is_anonymous) && e.jsxs("div", { className: "p-5 bg-indigo-50/50 dark:bg-indigo-900/10 border-x border-gray-100 dark:border-slate-800 transition-colors", children: [e.jsxs("label", { className: "flex items-start gap-3 cursor-pointer group", children: [e.jsxs("div", { className: "relative flex items-center justify-center mt-0.5", children: [e.jsx("input", { type: "checkbox", checked: ke, onChange: (r) => Br(r.target.checked), className: "peer appearance-none w-5 h-5 border-2 border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" }), e.jsx(ze, { className: "w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" })] }), e.jsxs("div", { children: [e.jsx("h4", { className: "text-sm font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors", children: "Save my details for next time" }), e.jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-0.5", children: "Create a permanent account to track your order and save preferences." })] })] }), e.jsx(Wt, { children: ke && e.jsxs(F.div, { initial: { opacity: 0, height: 0, marginTop: 0 }, animate: { opacity: 1, height: "auto", marginTop: 16 }, exit: { opacity: 0, height: 0, marginTop: 0 }, className: "space-y-3 overflow-hidden", children: [e.jsxs("div", { className: "space-y-1.5", children: [e.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-0.5 flex items-center gap-1", children: [e.jsx(mr, { className: "w-3 h-3" }), " Email"] }), e.jsx("input", { type: "email", value: Te, onChange: (r) => Hr(r.target.value), placeholder: "your@email.com", className: "w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium" })] }), e.jsxs("div", { className: "space-y-1.5", children: [e.jsxs("label", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-0.5 flex items-center gap-1", children: [e.jsx(ua, { className: "w-3 h-3" }), " Password"] }), e.jsx("input", { type: "password", value: Re, onChange: (r) => zr(r.target.value), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium" })] })] }) })] }), e.jsxs("div", { className: "p-4 sm:p-5 bg-card text-card-foreground border border-gray-100 dark:border-slate-800 border-t-0 rounded-b-[1rem] transition-colors", children: [e.jsx(F.button, { onClick: Xr, disabled: !St || Ct || Tt || Ft, whileTap: { scale: 0.97 }, className: `w-full py-4 rounded-2xl font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 ${St && !Ct && !Tt && !Ft ? `bg-gradient-to-r ${dr.color} text-white shadow-lg ${dr.shadow} hover:brightness-110` : "bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"}`, children: Ct || Tt || Ft ? e.jsxs(e.Fragment, { children: [e.jsx(he, { className: "w-4 h-4 animate-spin" }), "Initiating secure payment..."] }) : St ? e.jsxs(e.Fragment, { children: [e.jsx(pa, { className: "w-4 h-4" }), "Confirm Order"] }) : e.jsxs(e.Fragment, { children: [e.jsx(He, { className: "w-4 h-4" }), "Fill in all fields"] }) }), e.jsxs("p", { className: "text-center text-[10px] font-medium text-gray-400 mt-3 flex items-center justify-center gap-1", children: [e.jsx(He, { className: "w-3 h-3" }), "256-bit encrypted \xB7 Secure checkout"] })] })] }) })] })] }), e.jsxs(Wt, { children: [Zt && et && e.jsx(os, { clientSecret: Zt, paymentId: et, totalAmount: R, shippingInfo: d, user: A, onClose: async (r) => {
    if (De) try {
      await _.rpc("cancel_order_with_inventory", { p_order_id: De }), console.log("Stripe order cancelled on modal close:", De);
    } catch (x) {
      console.error("Failed to cancel order on modal close:", x);
    }
    const o = r || "cancelled";
    if (et) try {
      await _.from("payments").update({ provider_status: o, completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", et);
    } catch (x) {
      console.error("Failed to mark Stripe payment as cancelled:", x);
    }
    o === "failed" ? de.error("Stripe payment failed.") : de.error("Stripe payment was cancelled."), Yr(null), Gr(null), Kr(null);
  } }), tr && tt && e.jsx(is, { sessionData: tr, paymentId: tt, totalAmount: R, shippingInfo: d, user: A, onClose: async (r) => {
    if (Me) try {
      await _.rpc("cancel_order_with_inventory", { p_order_id: Me }), console.log("Adyen order cancelled on modal close:", Me);
    } catch (x) {
      console.error("Failed to cancel order on modal close:", x);
    }
    const o = r || "cancelled";
    if (tt) try {
      await _.from("payments").update({ provider_status: o, completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", tt);
    } catch (x) {
      console.error("Failed to mark Adyen payment as cancelled:", x);
    }
    o === "failed" ? de.error("Adyen payment failed.") : de.error("Adyen payment was cancelled."), rr(null), ar(null), sr(null);
  } }), rt && (nr || or) && e.jsx(cs, { paymentId: rt, qrCodeData: nr || "", redirectUrl: or || "", totalAmount: R, weroPhone: ge, weroMode: ae, onClose: async (r) => {
    if (Fe) try {
      await _.rpc("cancel_order_with_inventory", { p_order_id: Fe }), console.log("Wero order cancelled on modal close:", Fe);
    } catch (x) {
      console.error("Failed to cancel order on modal close:", x);
    }
    const o = r || "cancelled";
    if (rt) try {
      await _.from("payments").update({ provider_status: o, completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", rt);
    } catch (x) {
      console.error("Failed to mark Wero payment as cancelled:", x);
    }
    o === "failed" ? de.error("Wero payment failed.") : de.error("Wero payment was cancelled."), At(null), Et(null), Pt(null), _t(null);
  }, onSuccess: (r) => {
    pe.current = true, At(null), Et(null), Pt(null), _t(null), l(k, "", "", void 0, d.invoiceEmail, "succeeded", r);
  } }), at && lr && e.jsx(ls, { paymentId: at, redirectUrl: lr, totalAmount: R, onClose: async (r) => {
    if (Oe) try {
      await _.rpc("cancel_order_with_inventory", { p_order_id: Oe }), console.log("Digital Euro order cancelled on modal close:", Oe);
    } catch (x) {
      console.error("Failed to cancel Digital Euro order on modal close:", x);
    }
    const o = r || "cancelled";
    if (at) try {
      await _.from("payments").update({ provider_status: o, completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", at);
    } catch (x) {
      console.error("Failed to mark Digital Euro payment as cancelled:", x);
    }
    o === "failed" ? de.error("Digital Euro payment failed.") : de.error("Digital Euro payment was cancelled."), Rt(null), Dt(null), Mt(null);
  }, onSuccess: (r) => {
    pe.current = true, Rt(null), Dt(null), Mt(null), l("digital_euro", "", "", void 0, d.invoiceEmail, "succeeded", r);
  } }), (Ur || Qe || jt) && e.jsx(F.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm", children: e.jsx(F.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "relative w-full max-w-md overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-center", children: jt ? e.jsxs("div", { className: "space-y-4", children: [e.jsx("div", { className: "mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600", children: e.jsx(Ve, { className: "w-6 h-6" }) }), e.jsx("h3", { className: "text-lg font-black text-slate-950 dark:text-white uppercase tracking-wider", children: "Transaction Failed" }), e.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-h-40 overflow-y-auto break-words font-mono bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800", children: jt }), e.jsx("div", { className: "pt-2", children: e.jsx("button", { onClick: () => _e(null), className: "w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider transition-all", children: "Close" }) })] }) : e.jsxs("div", { className: "space-y-5 py-3", children: [e.jsxs("div", { className: "mx-auto relative flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600", children: [e.jsx(he, { className: "w-8 h-8 animate-spin text-amber-500" }), e.jsx(hr, { className: "absolute w-4 h-4 text-amber-600" })] }), e.jsxs("div", { children: [e.jsx("h3", { className: "text-base font-black text-slate-950 dark:text-white uppercase tracking-wider", children: Qe ? "Confirming Blockchain Payment" : "Preparing Transaction" }), e.jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed", children: Qe ? `Waiting for the transaction to be mined into a block on the ${J(u) ? "Cardano Preproduction" : "Ethereum/EVM"} network. This typically takes 10 to 20 seconds.` : `Please approve and sign the payment request in your connected ${J(u) ? u === "eternl" ? "Eternl" : "Lace" : u === "metamask" ? "MetaMask" : u === "coinbase" ? "Coinbase Wallet" : u === "trust" ? "Trust Wallet" : "wallet"} window.` })] }), ve && e.jsxs("div", { className: "p-3 bg-amber-50/50 dark:bg-amber-950/10 rounded-2xl border border-amber-200/50 dark:border-amber-900/30 space-y-1.5", children: [e.jsx("span", { className: "text-[9px] font-black uppercase tracking-wider text-amber-700/80", children: "Transaction Hash" }), e.jsx("p", { className: "text-[10px] font-mono text-slate-800 dark:text-slate-200 select-all truncate", children: ve }), e.jsxs("a", { href: J(u) ? `https://preprod.cardanoscan.io/transaction/${ve}` : Xe === "0x1" ? `https://etherscan.io/tx/${ve}` : `https://sepolia.etherscan.io/tx/${ve}`, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 hover:text-amber-700 transition-colors uppercase tracking-wider mt-1 animate-pulse", children: ["View on ", J(u) ? "Cardanoscan" : "Etherscan", " ", e.jsx(Vt, { className: "w-3 h-3" })] })] }), Qe && e.jsx("button", { onClick: Zr, className: "w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20", children: "Simulate Settlement (Sandbox Bypass)" })] }) }) })] })] });
}
function ns({ clientSecret: s2, paymentId: t, totalAmount: a, shippingInfo: n, user: i, onClose: l }) {
  const h = ts(), p = Qa(), [g, m] = c.useState(false), [v, w] = c.useState(null), f = { layout: "accordion", fields: { billingDetails: { address: "auto", email: "auto", phone: "auto" } } }, b = (T) => {
    const N = T.replace(/\s+/g, "");
    return N.startsWith("+") ? N : N.startsWith("0") ? `+33${N.slice(1)}` : N;
  }, I = async (T) => {
    if (T.preventDefault(), !h || !p) return;
    m(true), w(null);
    const { error: N } = await h.confirmPayment({ elements: p, confirmParams: { return_url: `${window.location.origin}${window.location.pathname.endsWith("/") ? window.location.pathname : window.location.pathname + "/"}?payment_id=${t}`, payment_method_data: { billing_details: { name: n.name || void 0, email: n.invoiceEmail || (i == null ? void 0 : i.email) || void 0, phone: b(n.phone) || void 0, address: { line1: n.street || void 0, city: n.city || void 0, postal_code: n.zip || void 0, country: n.country || void 0 } } } } });
    if (N) {
      w(N.message || "An unexpected error occurred."), m(false);
      try {
        await _.from("payments").update({ provider_status: "failed", completed_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", t);
      } catch (B) {
        console.error("Failed to mark Stripe payment as failed in DB:", B);
      }
    }
  };
  return e.jsxs("form", { onSubmit: I, className: "space-y-4", children: [e.jsx(rs, { options: f }), v && e.jsxs("div", { className: "p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-xl text-xs flex items-start gap-2", children: [e.jsx(Ve, { className: "w-4 h-4 shrink-0 mt-0.5" }), e.jsx("span", { children: v })] }), e.jsxs("div", { className: "flex gap-3 pt-2", children: [e.jsx("button", { type: "button", onClick: l, disabled: g, className: "flex-1 py-3 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-extrabold uppercase tracking-wider transition-colors disabled:opacity-50", children: "Cancel" }), e.jsx("button", { type: "submit", disabled: !h || g, className: "flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50", children: g ? e.jsxs(e.Fragment, { children: [e.jsx(he, { className: "w-4 h-4 animate-spin" }), "Processing..."] }) : e.jsxs(e.Fragment, { children: [e.jsx(He, { className: "w-4 h-4" }), "Pay Now"] }) })] })] });
}
function os({ clientSecret: s2, paymentId: t, totalAmount: a, shippingInfo: n, user: i, onClose: l }) {
  const h = document.documentElement.classList.contains("dark"), p = (m) => {
    const v = m.replace(/\s+/g, "");
    return v.startsWith("+") ? v : v.startsWith("0") ? `+33${v.slice(1)}` : v;
  }, g = { clientSecret: s2, appearance: { theme: h ? "night" : "stripe", variables: { colorPrimary: "#4f46e5" } }, defaultValues: { billingDetails: { name: n.name || void 0, email: n.invoiceEmail || (i == null ? void 0 : i.email) || void 0, phone: p(n.phone) || void 0, address: { line1: n.street || void 0, city: n.city || void 0, postalCode: n.zip || void 0, country: n.country || void 0 } } } };
  return e.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto", children: e.jsxs(F.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6", children: [e.jsxs("div", { className: "flex items-center justify-between", children: [e.jsxs("div", { className: "flex items-center gap-2.5", children: [e.jsx("div", { className: "p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl", children: e.jsx(Je, { className: "w-5 h-5" }) }), e.jsxs("div", { children: [e.jsx("h3", { className: "text-base font-extrabold text-gray-900 dark:text-white", children: "Secure Checkout" }), e.jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: "Provide payment details to complete purchase" })] })] }), e.jsx("button", { onClick: () => l(), className: "p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors", children: e.jsx(gt, { className: "w-5 h-5" }) })] }), e.jsx(Ir, { stripe: ss, options: g, children: e.jsx(ns, { clientSecret: s2, paymentId: t, totalAmount: a, shippingInfo: n, user: i, onClose: l }) })] }) });
}
function is({ sessionData: s2, paymentId: t, totalAmount: a, shippingInfo: n, user: i, onClose: l }) {
  const [h, p] = c.useState("card"), [g, m] = c.useState(""), [v, w] = c.useState(""), [f, b] = c.useState(""), [I, T] = c.useState(n.name || ""), [N, B] = c.useState(false), [A, R] = c.useState(null), ie = (H) => {
    if (H.preventDefault(), h === "card") {
      if (g.replace(/\s/g, "").length < 16) {
        R("Please enter a valid card number.");
        return;
      }
      if (v.length < 5) {
        R("Please enter a valid expiry date (MM/YY).");
        return;
      }
      if (f.length < 3) {
        R("Please enter a valid CVV code.");
        return;
      }
    }
    R(null), B(true), setTimeout(() => {
      const k = `${window.location.origin}${window.location.pathname.endsWith("/") ? window.location.pathname : window.location.pathname + "/"}?payment_id=${t}`;
      window.location.href = k;
    }, 2e3);
  };
  return e.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto", children: e.jsxs(F.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6", children: [e.jsxs("div", { className: "flex items-center justify-between", children: [e.jsxs("div", { className: "flex items-center gap-2.5", children: [e.jsx("div", { className: "p-2 bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-xl animate-pulse", children: e.jsx(Ut, { className: "w-5 h-5" }) }), e.jsxs("div", { children: [e.jsxs("h3", { className: "text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2", children: ["Adyen Checkout ", e.jsx("span", { className: "text-[10px] px-1.5 py-0.5 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 rounded font-black tracking-wider uppercase", children: "Sandbox" })] }), e.jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: "Fast and secure global payments" })] })] }), e.jsx("button", { onClick: () => l(), className: "p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors", children: e.jsx(gt, { className: "w-5 h-5" }) })] }), e.jsxs("div", { className: "flex gap-2 p-1 bg-gray-50 dark:bg-slate-800/40 rounded-xl border border-gray-100 dark:border-slate-800", children: [e.jsx("button", { type: "button", onClick: () => p("card"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${h === "card" ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black" : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: "Credit Card" }), e.jsx("button", { type: "button", onClick: () => p("sofort"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${h === "sofort" ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black" : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: "Sofort" }), e.jsx("button", { type: "button", onClick: () => p("ideal"), className: `flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all ${h === "ideal" ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm font-black" : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`, children: "iDEAL" })] }), e.jsxs("form", { onSubmit: ie, className: "space-y-4", children: [h === "card" && e.jsxs("div", { className: "space-y-3.5", children: [e.jsxs("div", { children: [e.jsx("label", { className: "block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1", children: "Card Number" }), e.jsxs("div", { className: "relative", children: [e.jsx("input", { type: "text", placeholder: "4111 1111 1111 1111", maxLength: 19, value: g, onChange: (H) => {
    const k = H.target.value.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim();
    m(k);
  }, className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none", required: true }), e.jsx(Je, { className: "absolute right-3.5 top-3 w-4 h-4 text-gray-400" })] })] }), e.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [e.jsxs("div", { children: [e.jsx("label", { className: "block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1", children: "Expiry Date" }), e.jsx("input", { type: "text", placeholder: "MM/YY", maxLength: 5, value: v, onChange: (H) => {
    const k = H.target.value.replace(/\D/g, "");
    k.length >= 2 ? w(`${k.slice(0, 2)}/${k.slice(2, 4)}`) : w(k);
  }, className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none", required: true })] }), e.jsxs("div", { children: [e.jsx("label", { className: "block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1", children: "Security Code (CVV)" }), e.jsx("input", { type: "password", placeholder: "123", maxLength: 4, value: f, onChange: (H) => b(H.target.value.replace(/\D/g, "")), className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none", required: true })] })] }), e.jsxs("div", { children: [e.jsx("label", { className: "block text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-1", children: "Cardholder Name" }), e.jsx("input", { type: "text", placeholder: "John Doe", value: I, onChange: (H) => T(H.target.value), className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-800 dark:text-white rounded-xl text-sm transition-all outline-none", required: true })] })] }), h === "sofort" && e.jsxs("div", { className: "p-5 text-center bg-gray-50 dark:bg-slate-800/20 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl space-y-2", children: [e.jsx(Ut, { className: "w-8 h-8 text-indigo-500 mx-auto animate-bounce" }), e.jsx("h4", { className: "text-xs font-extrabold text-gray-800 dark:text-white", children: "Redirecting to Sofort Banking" }), e.jsx("p", { className: "text-[10px] text-gray-400 dark:text-gray-500", children: "You will be securely redirected to complete payment with your bank account." })] }), h === "ideal" && e.jsxs("div", { className: "p-5 text-center bg-gray-50 dark:bg-slate-800/20 border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl space-y-2", children: [e.jsx(Ut, { className: "w-8 h-8 text-emerald-500 mx-auto animate-bounce" }), e.jsx("h4", { className: "text-xs font-extrabold text-gray-800 dark:text-white", children: "Redirecting to iDEAL Sandbox" }), e.jsx("p", { className: "text-[10px] text-gray-400 dark:text-gray-500", children: "You will be securely redirected to select your Dutch bank and authorize payment." })] }), A && e.jsxs("div", { className: "p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 rounded-xl text-xs flex items-start gap-2", children: [e.jsx(Ve, { className: "w-4 h-4 shrink-0 mt-0.5" }), e.jsx("span", { children: A })] }), e.jsxs("div", { className: "flex gap-3 pt-2", children: [e.jsx("button", { type: "button", onClick: () => l(), disabled: N, className: "flex-1 py-3 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-extrabold uppercase tracking-wider transition-colors disabled:opacity-50", children: "Cancel" }), e.jsx("button", { type: "submit", disabled: N, className: "flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50", children: N ? e.jsxs(e.Fragment, { children: [e.jsx(he, { className: "w-4 h-4 animate-spin" }), "Processing..."] }) : e.jsxs(e.Fragment, { children: [e.jsx(He, { className: "w-4 h-4" }), "Pay ", S.currencySymbol, a.toFixed(2)] }) })] })] })] }) });
}
function ls({ paymentId: s2, redirectUrl: t, totalAmount: a, onClose: n, onSuccess: i }) {
  const [l, h] = c.useState(false), [p, g] = c.useState(null), m = async (v) => {
    h(true), g(null);
    try {
      const { data: w, error: f } = await _.functions.invoke("digital-euro-checkout", { body: { action: "confirm", payment_id: s2, status: v } });
      if (f) throw new Error(f.message || "Failed to confirm Digital Euro payment.");
      if ((w == null ? void 0 : w.status) === "succeeded") i(w.order_id);
      else {
        const b = (w == null ? void 0 : w.status) === "failed" ? "failed" : "cancelled";
        g(`Payment simulation completed with status: ${(w == null ? void 0 : w.status) || v}`), h(false), setTimeout(() => {
          n(b);
        }, 1500);
      }
    } catch (w) {
      console.error("Digital Euro simulation error:", w), g(w.message || "Simulation request failed."), h(false);
    }
  };
  return e.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto", children: e.jsxs(F.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6", children: [e.jsxs("div", { className: "flex items-center justify-between", children: [e.jsxs("div", { className: "flex items-center gap-2.5", children: [e.jsx("div", { className: "p-2 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-xl", children: e.jsx(xt, { className: "w-5 h-5" }) }), e.jsxs("div", { children: [e.jsxs("h3", { className: "text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2", children: ["Digital Euro ", e.jsx("span", { className: "text-[10px] px-1.5 py-0.5 bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 rounded font-black tracking-wider uppercase", children: "Sandbox" })] }), e.jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: "Simulated PSP authorization" })] })] }), e.jsx("button", { onClick: () => m("cancelled"), disabled: l, className: "p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors disabled:opacity-50", children: e.jsx(gt, { className: "w-5 h-5" }) })] }), e.jsxs("div", { className: "p-5 text-center bg-cyan-50/60 dark:bg-cyan-950/10 border border-dashed border-cyan-200 dark:border-cyan-900/50 rounded-2xl space-y-3", children: [e.jsx(xt, { className: "w-10 h-10 text-cyan-600 mx-auto" }), e.jsxs("div", { children: [e.jsx("h4", { className: "text-xs font-black text-gray-800 dark:text-white uppercase tracking-wider", children: "Awaiting Digital Euro Authorization" }), e.jsxs("p", { className: "text-[10px] text-gray-500 dark:text-gray-400 mt-1", children: ["A sandbox payment request for ", e.jsxs("span", { className: "font-extrabold text-cyan-700 dark:text-cyan-300", children: [S.currencySymbol, a.toFixed(2)] }), " is ready for simulated customer approval."] })] }), e.jsx("p", { className: "text-[10px] font-mono text-cyan-700 dark:text-cyan-300 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-cyan-100 dark:border-cyan-900/50 break-all select-all", children: t })] }), p && e.jsx("div", { className: "p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl text-xs font-bold text-amber-700 dark:text-amber-300 text-center", children: p }), e.jsxs("div", { className: "space-y-2", children: [e.jsxs("button", { onClick: () => m("succeeded"), disabled: l, className: "w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all disabled:opacity-60 flex items-center justify-center gap-2", children: [l ? e.jsx(he, { className: "w-4 h-4 animate-spin" }) : e.jsx(ze, { className: "w-4 h-4" }), "Simulate Approval"] }), e.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [e.jsx("button", { onClick: () => m("failed"), disabled: l, className: "py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-300 text-[10px] font-black uppercase tracking-wider hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors disabled:opacity-50", children: "Simulate Failure" }), e.jsx("button", { onClick: () => m("cancelled"), disabled: l, className: "py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-300 text-[10px] font-black uppercase tracking-wider hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50", children: "Cancel" })] })] })] }) });
}
function cs({ paymentId: s2, qrCodeData: t, redirectUrl: a, totalAmount: n, weroPhone: i, weroMode: l, onClose: h, onSuccess: p }) {
  const [g, m] = c.useState(false), [v, w] = c.useState(null), f = async (I) => {
    m(true), w(null);
    try {
      const { data: T, error: N } = await _.functions.invoke("wero-checkout", { body: { action: "confirm", payment_id: s2, status: I } });
      if (N) throw new Error(N.message || "Failed to confirm Wero payment.");
      (T == null ? void 0 : T.status) === "succeeded" ? p(T.order_id) : (w(`Payment simulation completed with status: ${(T == null ? void 0 : T.status) || I}`), m(false), (I === "cancelled" || I === "failed") && setTimeout(() => {
        h(I);
      }, 1500));
    } catch (T) {
      console.error("Wero simulation error:", T), w(T.message || "Simulation request failed."), m(false);
    }
  }, b = a && a.includes("worldline-solutions.com");
  return e.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto", children: e.jsxs(F.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: "w-full max-w-md bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6", children: [e.jsxs("div", { className: "flex items-center justify-between", children: [e.jsxs("div", { className: "flex items-center gap-2.5", children: [e.jsx("div", { className: "p-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl animate-pulse", children: e.jsx(Ye, { className: "w-5 h-5" }) }), e.jsxs("div", { children: [e.jsxs("h3", { className: "text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2", children: ["Wero Transfer ", e.jsx("span", { className: "text-[10px] px-1.5 py-0.5 bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded font-black tracking-wider uppercase", children: b ? "Preprod" : "Sandbox" })] }), e.jsx("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: "Fast and secure account-to-account transfer" })] })] }), e.jsx("button", { onClick: () => f("cancelled"), disabled: g, className: "p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-xl transition-colors disabled:opacity-50", children: e.jsx(gt, { className: "w-5 h-5" }) })] }), l === "phone" ? e.jsxs("div", { className: "p-5 text-center bg-purple-50/50 dark:bg-purple-950/10 border border-dashed border-purple-200 dark:border-purple-900/50 rounded-2xl space-y-3", children: [e.jsx(Ye, { className: "w-10 h-10 text-purple-500 mx-auto animate-bounce" }), e.jsxs("div", { children: [e.jsx("h4", { className: "text-xs font-black text-gray-800 dark:text-white uppercase tracking-wider", children: "Pending Bank Authorization" }), e.jsxs("p", { className: "text-[10px] text-gray-500 dark:text-gray-400 mt-1", children: ["A transfer request for ", e.jsxs("span", { className: "font-extrabold text-purple-600 dark:text-purple-400", children: [S.currencySymbol, n.toFixed(2)] }), " has been sent to your Wero phone:"] }), e.jsx("p", { className: "text-sm font-mono font-bold text-purple-700 dark:text-purple-300 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-purple-100 dark:border-purple-900/50 inline-block mt-2 select-all", children: i })] }), b && e.jsx("div", { className: "pt-2", children: e.jsxs("a", { href: a, target: "_blank", rel: "noopener noreferrer", className: "w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-750 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all shadow-md hover:shadow-purple-500/25 flex items-center justify-center gap-1.5 group", children: [e.jsx("span", { children: "Proceed to Payment" }), e.jsx(Vt, { className: "w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })] }) }), e.jsx("p", { className: "text-[10px] text-gray-400 dark:text-gray-500 italic pt-1", children: "Please open your participating banking app to authorize the instant transfer request." })] }) : e.jsxs("div", { className: "p-5 text-center bg-purple-50/50 dark:bg-purple-950/10 border border-dashed border-purple-200 dark:border-purple-900/50 rounded-2xl flex flex-col items-center gap-3", children: [e.jsx("div", { className: "p-4 bg-white rounded-2xl shadow-md border border-purple-100", children: e.jsx(Pr, { className: "w-40 h-40 text-purple-900" }) }), e.jsxs("div", { children: [e.jsx("h4", { className: "text-xs font-black text-gray-800 dark:text-white uppercase tracking-wider", children: "Scan to Pay" }), e.jsxs("p", { className: "text-[10px] text-gray-500 dark:text-gray-400 mt-1", children: ["Scan this QR code with your banking app to instantly authorize a payment of ", e.jsxs("span", { className: "font-extrabold text-purple-600 dark:text-purple-400", children: [S.currencySymbol, n.toFixed(2)] }), "."] })] }), b && e.jsxs("a", { href: a, target: "_blank", rel: "noopener noreferrer", className: "w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-750 text-white rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all shadow-md hover:shadow-purple-500/25 flex items-center justify-center gap-1.5 group", children: [e.jsx("span", { children: "Proceed to Payment" }), e.jsx(Vt, { className: "w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })] })] }), v && e.jsxs("div", { className: "p-3 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 rounded-xl text-xs flex items-start gap-2", children: [e.jsx(Ve, { className: "w-4 h-4 shrink-0 mt-0.5" }), e.jsx("span", { children: v })] }), e.jsxs("div", { className: "space-y-2.5", children: [e.jsx("p", { className: "text-[9px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest text-center", children: b ? "Verification & Control" : "Testing / Sandbox Controls" }), e.jsxs("div", { className: "grid grid-cols-2 gap-2.5", children: [e.jsx("button", { onClick: () => f("succeeded"), disabled: g, className: `py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50 ${b ? "bg-purple-600 hover:bg-purple-700 text-white hover:shadow-purple-500/20" : "bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-emerald-500/20"}`, children: g ? e.jsx(he, { className: "w-3.5 h-3.5 animate-spin" }) : e.jsxs(e.Fragment, { children: [e.jsx(ze, { className: "w-3.5 h-3.5" }), b ? "Verify Payment" : "Simulate Success"] }) }), e.jsx("button", { onClick: () => f("failed"), disabled: g, className: "py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-rose-500/20 flex items-center justify-center gap-1.5 disabled:opacity-50", children: g ? e.jsx(he, { className: "w-3.5 h-3.5 animate-spin" }) : e.jsxs(e.Fragment, { children: [e.jsx(Ve, { className: "w-3.5 h-3.5" }), b ? "Check Failure" : "Simulate Failure"] }) })] }), e.jsx("button", { onClick: () => f("cancelled"), disabled: g, className: "w-full py-2.5 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-colors disabled:opacity-50", children: "Cancel Payment Request" })] })] }) });
}
export {
  ys as Checkout
};
