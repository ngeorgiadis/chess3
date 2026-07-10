function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
var hasRequiredReact_production_min;
function requireReact_production_min() {
  if (hasRequiredReact_production_min) return react_production_min;
  hasRequiredReact_production_min = 1;
  var l = /* @__PURE__ */ Symbol.for("react.element"), n = /* @__PURE__ */ Symbol.for("react.portal"), p = /* @__PURE__ */ Symbol.for("react.fragment"), q = /* @__PURE__ */ Symbol.for("react.strict_mode"), r = /* @__PURE__ */ Symbol.for("react.profiler"), t = /* @__PURE__ */ Symbol.for("react.provider"), u = /* @__PURE__ */ Symbol.for("react.context"), v = /* @__PURE__ */ Symbol.for("react.forward_ref"), w = /* @__PURE__ */ Symbol.for("react.suspense"), x = /* @__PURE__ */ Symbol.for("react.memo"), y = /* @__PURE__ */ Symbol.for("react.lazy"), z = Symbol.iterator;
  function A(a) {
    if (null === a || "object" !== typeof a) return null;
    a = z && a[z] || a["@@iterator"];
    return "function" === typeof a ? a : null;
  }
  var B = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, C = Object.assign, D = {};
  function E(a, b, e) {
    this.props = a;
    this.context = b;
    this.refs = D;
    this.updater = e || B;
  }
  E.prototype.isReactComponent = {};
  E.prototype.setState = function(a, b) {
    if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, a, b, "setState");
  };
  E.prototype.forceUpdate = function(a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
  };
  function F() {
  }
  F.prototype = E.prototype;
  function G(a, b, e) {
    this.props = a;
    this.context = b;
    this.refs = D;
    this.updater = e || B;
  }
  var H = G.prototype = new F();
  H.constructor = G;
  C(H, E.prototype);
  H.isPureReactComponent = true;
  var I = Array.isArray, J = Object.prototype.hasOwnProperty, K = { current: null }, L = { key: true, ref: true, __self: true, __source: true };
  function M(a, b, e) {
    var d, c = {}, k = null, h = null;
    if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
    var g = arguments.length - 2;
    if (1 === g) c.children = e;
    else if (1 < g) {
      for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
      c.children = f;
    }
    if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
    return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current };
  }
  function N(a, b) {
    return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
  }
  function O(a) {
    return "object" === typeof a && null !== a && a.$$typeof === l;
  }
  function escape(a) {
    var b = { "=": "=0", ":": "=2" };
    return "$" + a.replace(/[=:]/g, function(a2) {
      return b[a2];
    });
  }
  var P = /\/+/g;
  function Q(a, b) {
    return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
  }
  function R(a, b, e, d, c) {
    var k = typeof a;
    if ("undefined" === k || "boolean" === k) a = null;
    var h = false;
    if (null === a) h = true;
    else switch (k) {
      case "string":
      case "number":
        h = true;
        break;
      case "object":
        switch (a.$$typeof) {
          case l:
          case n:
            h = true;
        }
    }
    if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a2) {
      return a2;
    })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
    h = 0;
    d = "" === d ? "." : d + ":";
    if (I(a)) for (var g = 0; g < a.length; g++) {
      k = a[g];
      var f = d + Q(k, g);
      h += R(k, b, e, f, c);
    }
    else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done; ) k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
    else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
    return h;
  }
  function S(a, b, e) {
    if (null == a) return a;
    var d = [], c = 0;
    R(a, d, "", "", function(a2) {
      return b.call(e, a2, c++);
    });
    return d;
  }
  function T(a) {
    if (-1 === a._status) {
      var b = a._result;
      b = b();
      b.then(function(b2) {
        if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
      }, function(b2) {
        if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
      });
      -1 === a._status && (a._status = 0, a._result = b);
    }
    if (1 === a._status) return a._result.default;
    throw a._result;
  }
  var U = { current: null }, V = { transition: null }, W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
  function X() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  react_production_min.Children = { map: S, forEach: function(a, b, e) {
    S(a, function() {
      b.apply(this, arguments);
    }, e);
  }, count: function(a) {
    var b = 0;
    S(a, function() {
      b++;
    });
    return b;
  }, toArray: function(a) {
    return S(a, function(a2) {
      return a2;
    }) || [];
  }, only: function(a) {
    if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
    return a;
  } };
  react_production_min.Component = E;
  react_production_min.Fragment = p;
  react_production_min.Profiler = r;
  react_production_min.PureComponent = G;
  react_production_min.StrictMode = q;
  react_production_min.Suspense = w;
  react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
  react_production_min.act = X;
  react_production_min.cloneElement = function(a, b, e) {
    if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
    var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
    if (null != b) {
      void 0 !== b.ref && (k = b.ref, h = K.current);
      void 0 !== b.key && (c = "" + b.key);
      if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
      for (f in b) J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
    }
    var f = arguments.length - 2;
    if (1 === f) d.children = e;
    else if (1 < f) {
      g = Array(f);
      for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
      d.children = g;
    }
    return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
  };
  react_production_min.createContext = function(a) {
    a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
    a.Provider = { $$typeof: t, _context: a };
    return a.Consumer = a;
  };
  react_production_min.createElement = M;
  react_production_min.createFactory = function(a) {
    var b = M.bind(null, a);
    b.type = a;
    return b;
  };
  react_production_min.createRef = function() {
    return { current: null };
  };
  react_production_min.forwardRef = function(a) {
    return { $$typeof: v, render: a };
  };
  react_production_min.isValidElement = O;
  react_production_min.lazy = function(a) {
    return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
  };
  react_production_min.memo = function(a, b) {
    return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
  };
  react_production_min.startTransition = function(a) {
    var b = V.transition;
    V.transition = {};
    try {
      a();
    } finally {
      V.transition = b;
    }
  };
  react_production_min.unstable_act = X;
  react_production_min.useCallback = function(a, b) {
    return U.current.useCallback(a, b);
  };
  react_production_min.useContext = function(a) {
    return U.current.useContext(a);
  };
  react_production_min.useDebugValue = function() {
  };
  react_production_min.useDeferredValue = function(a) {
    return U.current.useDeferredValue(a);
  };
  react_production_min.useEffect = function(a, b) {
    return U.current.useEffect(a, b);
  };
  react_production_min.useId = function() {
    return U.current.useId();
  };
  react_production_min.useImperativeHandle = function(a, b, e) {
    return U.current.useImperativeHandle(a, b, e);
  };
  react_production_min.useInsertionEffect = function(a, b) {
    return U.current.useInsertionEffect(a, b);
  };
  react_production_min.useLayoutEffect = function(a, b) {
    return U.current.useLayoutEffect(a, b);
  };
  react_production_min.useMemo = function(a, b) {
    return U.current.useMemo(a, b);
  };
  react_production_min.useReducer = function(a, b, e) {
    return U.current.useReducer(a, b, e);
  };
  react_production_min.useRef = function(a) {
    return U.current.useRef(a);
  };
  react_production_min.useState = function(a) {
    return U.current.useState(a);
  };
  react_production_min.useSyncExternalStore = function(a, b, e) {
    return U.current.useSyncExternalStore(a, b, e);
  };
  react_production_min.useTransition = function() {
    return U.current.useTransition();
  };
  react_production_min.version = "18.3.1";
  return react_production_min;
}
var hasRequiredReact;
function requireReact() {
  if (hasRequiredReact) return react.exports;
  hasRequiredReact = 1;
  {
    react.exports = requireReact_production_min();
  }
  return react.exports;
}
var hasRequiredReactJsxRuntime_production_min;
function requireReactJsxRuntime_production_min() {
  if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
  hasRequiredReactJsxRuntime_production_min = 1;
  var f = requireReact(), k = /* @__PURE__ */ Symbol.for("react.element"), l = /* @__PURE__ */ Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
  function q(c, a, g) {
    var b, d = {}, e = null, h = null;
    void 0 !== g && (e = "" + g);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (h = a.ref);
    for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
    return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
  }
  reactJsxRuntime_production_min.Fragment = l;
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  return reactJsxRuntime_production_min;
}
var hasRequiredJsxRuntime;
function requireJsxRuntime() {
  if (hasRequiredJsxRuntime) return jsxRuntime.exports;
  hasRequiredJsxRuntime = 1;
  {
    jsxRuntime.exports = requireReactJsxRuntime_production_min();
  }
  return jsxRuntime.exports;
}
var jsxRuntimeExports = requireJsxRuntime();
var reactExports = requireReact();
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
var client = {};
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
var hasRequiredScheduler_production_min;
function requireScheduler_production_min() {
  if (hasRequiredScheduler_production_min) return scheduler_production_min;
  hasRequiredScheduler_production_min = 1;
  (function(exports) {
    function f(a, b) {
      var c = a.length;
      a.push(b);
      a: for (; 0 < c; ) {
        var d = c - 1 >>> 1, e = a[d];
        if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
        else break a;
      }
    }
    function h(a) {
      return 0 === a.length ? null : a[0];
    }
    function k(a) {
      if (0 === a.length) return null;
      var b = a[0], c = a.pop();
      if (c !== b) {
        a[0] = c;
        a: for (var d = 0, e = a.length, w = e >>> 1; d < w; ) {
          var m = 2 * (d + 1) - 1, C = a[m], n = m + 1, x = a[n];
          if (0 > g(C, c)) n < e && 0 > g(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, a[m] = c, d = m);
          else if (n < e && 0 > g(x, c)) a[d] = x, a[n] = c, d = n;
          else break a;
        }
      }
      return b;
    }
    function g(a, b) {
      var c = a.sortIndex - b.sortIndex;
      return 0 !== c ? c : a.id - b.id;
    }
    if ("object" === typeof performance && "function" === typeof performance.now) {
      var l = performance;
      exports.unstable_now = function() {
        return l.now();
      };
    } else {
      var p = Date, q = p.now();
      exports.unstable_now = function() {
        return p.now() - q;
      };
    }
    var r = [], t = [], u = 1, v = null, y = 3, z = false, A = false, B = false, D = "function" === typeof setTimeout ? setTimeout : null, E = "function" === typeof clearTimeout ? clearTimeout : null, F = "undefined" !== typeof setImmediate ? setImmediate : null;
    "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function G(a) {
      for (var b = h(t); null !== b; ) {
        if (null === b.callback) k(t);
        else if (b.startTime <= a) k(t), b.sortIndex = b.expirationTime, f(r, b);
        else break;
        b = h(t);
      }
    }
    function H(a) {
      B = false;
      G(a);
      if (!A) if (null !== h(r)) A = true, I(J);
      else {
        var b = h(t);
        null !== b && K(H, b.startTime - a);
      }
    }
    function J(a, b) {
      A = false;
      B && (B = false, E(L), L = -1);
      z = true;
      var c = y;
      try {
        G(b);
        for (v = h(r); null !== v && (!(v.expirationTime > b) || a && !M()); ) {
          var d = v.callback;
          if ("function" === typeof d) {
            v.callback = null;
            y = v.priorityLevel;
            var e = d(v.expirationTime <= b);
            b = exports.unstable_now();
            "function" === typeof e ? v.callback = e : v === h(r) && k(r);
            G(b);
          } else k(r);
          v = h(r);
        }
        if (null !== v) var w = true;
        else {
          var m = h(t);
          null !== m && K(H, m.startTime - b);
          w = false;
        }
        return w;
      } finally {
        v = null, y = c, z = false;
      }
    }
    var N = false, O = null, L = -1, P = 5, Q = -1;
    function M() {
      return exports.unstable_now() - Q < P ? false : true;
    }
    function R() {
      if (null !== O) {
        var a = exports.unstable_now();
        Q = a;
        var b = true;
        try {
          b = O(true, a);
        } finally {
          b ? S() : (N = false, O = null);
        }
      } else N = false;
    }
    var S;
    if ("function" === typeof F) S = function() {
      F(R);
    };
    else if ("undefined" !== typeof MessageChannel) {
      var T = new MessageChannel(), U = T.port2;
      T.port1.onmessage = R;
      S = function() {
        U.postMessage(null);
      };
    } else S = function() {
      D(R, 0);
    };
    function I(a) {
      O = a;
      N || (N = true, S());
    }
    function K(a, b) {
      L = D(function() {
        a(exports.unstable_now());
      }, b);
    }
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(a) {
      a.callback = null;
    };
    exports.unstable_continueExecution = function() {
      A || z || (A = true, I(J));
    };
    exports.unstable_forceFrameRate = function(a) {
      0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1e3 / a) : 5;
    };
    exports.unstable_getCurrentPriorityLevel = function() {
      return y;
    };
    exports.unstable_getFirstCallbackNode = function() {
      return h(r);
    };
    exports.unstable_next = function(a) {
      switch (y) {
        case 1:
        case 2:
        case 3:
          var b = 3;
          break;
        default:
          b = y;
      }
      var c = y;
      y = b;
      try {
        return a();
      } finally {
        y = c;
      }
    };
    exports.unstable_pauseExecution = function() {
    };
    exports.unstable_requestPaint = function() {
    };
    exports.unstable_runWithPriority = function(a, b) {
      switch (a) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          a = 3;
      }
      var c = y;
      y = a;
      try {
        return b();
      } finally {
        y = c;
      }
    };
    exports.unstable_scheduleCallback = function(a, b, c) {
      var d = exports.unstable_now();
      "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
      switch (a) {
        case 1:
          var e = -1;
          break;
        case 2:
          e = 250;
          break;
        case 5:
          e = 1073741823;
          break;
        case 4:
          e = 1e4;
          break;
        default:
          e = 5e3;
      }
      e = c + e;
      a = { id: u++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
      c > d ? (a.sortIndex = c, f(t, a), null === h(r) && a === h(t) && (B ? (E(L), L = -1) : B = true, K(H, c - d))) : (a.sortIndex = e, f(r, a), A || z || (A = true, I(J)));
      return a;
    };
    exports.unstable_shouldYield = M;
    exports.unstable_wrapCallback = function(a) {
      var b = y;
      return function() {
        var c = y;
        y = b;
        try {
          return a.apply(this, arguments);
        } finally {
          y = c;
        }
      };
    };
  })(scheduler_production_min);
  return scheduler_production_min;
}
var hasRequiredScheduler;
function requireScheduler() {
  if (hasRequiredScheduler) return scheduler.exports;
  hasRequiredScheduler = 1;
  {
    scheduler.exports = requireScheduler_production_min();
  }
  return scheduler.exports;
}
var hasRequiredReactDom_production_min;
function requireReactDom_production_min() {
  if (hasRequiredReactDom_production_min) return reactDom_production_min;
  hasRequiredReactDom_production_min = 1;
  var aa = requireReact(), ca = requireScheduler();
  function p(a) {
    for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
    return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var da = /* @__PURE__ */ new Set(), ea = {};
  function fa(a, b) {
    ha(a, b);
    ha(a + "Capture", b);
  }
  function ha(a, b) {
    ea[a] = b;
    for (a = 0; a < b.length; a++) da.add(b[a]);
  }
  var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
  function oa(a) {
    if (ja.call(ma, a)) return true;
    if (ja.call(la, a)) return false;
    if (ka.test(a)) return ma[a] = true;
    la[a] = true;
    return false;
  }
  function pa(a, b, c, d) {
    if (null !== c && 0 === c.type) return false;
    switch (typeof b) {
      case "function":
      case "symbol":
        return true;
      case "boolean":
        if (d) return false;
        if (null !== c) return !c.acceptsBooleans;
        a = a.toLowerCase().slice(0, 5);
        return "data-" !== a && "aria-" !== a;
      default:
        return false;
    }
  }
  function qa(a, b, c, d) {
    if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
    if (d) return false;
    if (null !== c) switch (c.type) {
      case 3:
        return !b;
      case 4:
        return false === b;
      case 5:
        return isNaN(b);
      case 6:
        return isNaN(b) || 1 > b;
    }
    return false;
  }
  function v(a, b, c, d, e, f, g) {
    this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
    this.attributeName = d;
    this.attributeNamespace = e;
    this.mustUseProperty = c;
    this.propertyName = a;
    this.type = b;
    this.sanitizeURL = f;
    this.removeEmptyString = g;
  }
  var z = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
    z[a] = new v(a, 0, false, a, null, false, false);
  });
  [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
    var b = a[0];
    z[b] = new v(b, 1, false, a[1], null, false, false);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
    z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
  });
  ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
    z[a] = new v(a, 2, false, a, null, false, false);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
    z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
  });
  ["checked", "multiple", "muted", "selected"].forEach(function(a) {
    z[a] = new v(a, 3, true, a, null, false, false);
  });
  ["capture", "download"].forEach(function(a) {
    z[a] = new v(a, 4, false, a, null, false, false);
  });
  ["cols", "rows", "size", "span"].forEach(function(a) {
    z[a] = new v(a, 6, false, a, null, false, false);
  });
  ["rowSpan", "start"].forEach(function(a) {
    z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
  });
  var ra = /[\-:]([a-z])/g;
  function sa(a) {
    return a[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
    var b = a.replace(
      ra,
      sa
    );
    z[b] = new v(b, 1, false, a, null, false, false);
  });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
    var b = a.replace(ra, sa);
    z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
  });
  ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
    var b = a.replace(ra, sa);
    z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
  });
  ["tabIndex", "crossOrigin"].forEach(function(a) {
    z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
  });
  z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
  ["src", "href", "action", "formAction"].forEach(function(a) {
    z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
  });
  function ta(a, b, c, d) {
    var e = z.hasOwnProperty(b) ? z[b] : null;
    if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
  }
  var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = /* @__PURE__ */ Symbol.for("react.element"), wa = /* @__PURE__ */ Symbol.for("react.portal"), ya = /* @__PURE__ */ Symbol.for("react.fragment"), za = /* @__PURE__ */ Symbol.for("react.strict_mode"), Aa = /* @__PURE__ */ Symbol.for("react.profiler"), Ba = /* @__PURE__ */ Symbol.for("react.provider"), Ca = /* @__PURE__ */ Symbol.for("react.context"), Da = /* @__PURE__ */ Symbol.for("react.forward_ref"), Ea = /* @__PURE__ */ Symbol.for("react.suspense"), Fa = /* @__PURE__ */ Symbol.for("react.suspense_list"), Ga = /* @__PURE__ */ Symbol.for("react.memo"), Ha = /* @__PURE__ */ Symbol.for("react.lazy");
  var Ia = /* @__PURE__ */ Symbol.for("react.offscreen");
  var Ja = Symbol.iterator;
  function Ka(a) {
    if (null === a || "object" !== typeof a) return null;
    a = Ja && a[Ja] || a["@@iterator"];
    return "function" === typeof a ? a : null;
  }
  var A = Object.assign, La;
  function Ma(a) {
    if (void 0 === La) try {
      throw Error();
    } catch (c) {
      var b = c.stack.trim().match(/\n( *(at )?)/);
      La = b && b[1] || "";
    }
    return "\n" + La + a;
  }
  var Na = false;
  function Oa(a, b) {
    if (!a || Na) return "";
    Na = true;
    var c = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (b) if (b = function() {
        throw Error();
      }, Object.defineProperty(b.prototype, "props", { set: function() {
        throw Error();
      } }), "object" === typeof Reflect && Reflect.construct) {
        try {
          Reflect.construct(b, []);
        } catch (l) {
          var d = l;
        }
        Reflect.construct(a, [], b);
      } else {
        try {
          b.call();
        } catch (l) {
          d = l;
        }
        a.call(b.prototype);
      }
      else {
        try {
          throw Error();
        } catch (l) {
          d = l;
        }
        a();
      }
    } catch (l) {
      if (l && d && "string" === typeof l.stack) {
        for (var e = l.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; ) h--;
        for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f[h]) {
          if (1 !== g || 1 !== h) {
            do
              if (g--, h--, 0 > h || e[g] !== f[h]) {
                var k = "\n" + e[g].replace(" at new ", " at ");
                a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
                return k;
              }
            while (1 <= g && 0 <= h);
          }
          break;
        }
      }
    } finally {
      Na = false, Error.prepareStackTrace = c;
    }
    return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
  }
  function Pa(a) {
    switch (a.tag) {
      case 5:
        return Ma(a.type);
      case 16:
        return Ma("Lazy");
      case 13:
        return Ma("Suspense");
      case 19:
        return Ma("SuspenseList");
      case 0:
      case 2:
      case 15:
        return a = Oa(a.type, false), a;
      case 11:
        return a = Oa(a.type.render, false), a;
      case 1:
        return a = Oa(a.type, true), a;
      default:
        return "";
    }
  }
  function Qa(a) {
    if (null == a) return null;
    if ("function" === typeof a) return a.displayName || a.name || null;
    if ("string" === typeof a) return a;
    switch (a) {
      case ya:
        return "Fragment";
      case wa:
        return "Portal";
      case Aa:
        return "Profiler";
      case za:
        return "StrictMode";
      case Ea:
        return "Suspense";
      case Fa:
        return "SuspenseList";
    }
    if ("object" === typeof a) switch (a.$$typeof) {
      case Ca:
        return (a.displayName || "Context") + ".Consumer";
      case Ba:
        return (a._context.displayName || "Context") + ".Provider";
      case Da:
        var b = a.render;
        a = a.displayName;
        a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
        return a;
      case Ga:
        return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
      case Ha:
        b = a._payload;
        a = a._init;
        try {
          return Qa(a(b));
        } catch (c) {
        }
    }
    return null;
  }
  function Ra(a) {
    var b = a.type;
    switch (a.tag) {
      case 24:
        return "Cache";
      case 9:
        return (b.displayName || "Context") + ".Consumer";
      case 10:
        return (b._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return b;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Qa(b);
      case 8:
        return b === za ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if ("function" === typeof b) return b.displayName || b.name || null;
        if ("string" === typeof b) return b;
    }
    return null;
  }
  function Sa(a) {
    switch (typeof a) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return a;
      case "object":
        return a;
      default:
        return "";
    }
  }
  function Ta(a) {
    var b = a.type;
    return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
  }
  function Ua(a) {
    var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
    if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
      var e = c.get, f = c.set;
      Object.defineProperty(a, b, { configurable: true, get: function() {
        return e.call(this);
      }, set: function(a2) {
        d = "" + a2;
        f.call(this, a2);
      } });
      Object.defineProperty(a, b, { enumerable: c.enumerable });
      return { getValue: function() {
        return d;
      }, setValue: function(a2) {
        d = "" + a2;
      }, stopTracking: function() {
        a._valueTracker = null;
        delete a[b];
      } };
    }
  }
  function Va(a) {
    a._valueTracker || (a._valueTracker = Ua(a));
  }
  function Wa(a) {
    if (!a) return false;
    var b = a._valueTracker;
    if (!b) return true;
    var c = b.getValue();
    var d = "";
    a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
    a = d;
    return a !== c ? (b.setValue(a), true) : false;
  }
  function Xa(a) {
    a = a || ("undefined" !== typeof document ? document : void 0);
    if ("undefined" === typeof a) return null;
    try {
      return a.activeElement || a.body;
    } catch (b) {
      return a.body;
    }
  }
  function Ya(a, b) {
    var c = b.checked;
    return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
  }
  function Za(a, b) {
    var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
    c = Sa(null != b.value ? b.value : c);
    a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
  }
  function ab(a, b) {
    b = b.checked;
    null != b && ta(a, "checked", b, false);
  }
  function bb(a, b) {
    ab(a, b);
    var c = Sa(b.value), d = b.type;
    if (null != c) if ("number" === d) {
      if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
    } else a.value !== "" + c && (a.value = "" + c);
    else if ("submit" === d || "reset" === d) {
      a.removeAttribute("value");
      return;
    }
    b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
    null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
  }
  function db(a, b, c) {
    if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
      var d = b.type;
      if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
      b = "" + a._wrapperState.initialValue;
      c || b === a.value || (a.value = b);
      a.defaultValue = b;
    }
    c = a.name;
    "" !== c && (a.name = "");
    a.defaultChecked = !!a._wrapperState.initialChecked;
    "" !== c && (a.name = c);
  }
  function cb(a, b, c) {
    if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
  }
  var eb = Array.isArray;
  function fb(a, b, c, d) {
    a = a.options;
    if (b) {
      b = {};
      for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
      for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
    } else {
      c = "" + Sa(c);
      b = null;
      for (e = 0; e < a.length; e++) {
        if (a[e].value === c) {
          a[e].selected = true;
          d && (a[e].defaultSelected = true);
          return;
        }
        null !== b || a[e].disabled || (b = a[e]);
      }
      null !== b && (b.selected = true);
    }
  }
  function gb(a, b) {
    if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
    return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
  }
  function hb(a, b) {
    var c = b.value;
    if (null == c) {
      c = b.children;
      b = b.defaultValue;
      if (null != c) {
        if (null != b) throw Error(p(92));
        if (eb(c)) {
          if (1 < c.length) throw Error(p(93));
          c = c[0];
        }
        b = c;
      }
      null == b && (b = "");
      c = b;
    }
    a._wrapperState = { initialValue: Sa(c) };
  }
  function ib(a, b) {
    var c = Sa(b.value), d = Sa(b.defaultValue);
    null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
    null != d && (a.defaultValue = "" + d);
  }
  function jb(a) {
    var b = a.textContent;
    b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
  }
  function kb(a) {
    switch (a) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function lb(a, b) {
    return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
  }
  var mb, nb = (function(a) {
    return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
      MSApp.execUnsafeLocalFunction(function() {
        return a(b, c, d, e);
      });
    } : a;
  })(function(a, b) {
    if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
    else {
      mb = mb || document.createElement("div");
      mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
      for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
      for (; b.firstChild; ) a.appendChild(b.firstChild);
    }
  });
  function ob(a, b) {
    if (b) {
      var c = a.firstChild;
      if (c && c === a.lastChild && 3 === c.nodeType) {
        c.nodeValue = b;
        return;
      }
    }
    a.textContent = b;
  }
  var pb = {
    animationIterationCount: true,
    aspectRatio: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridArea: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true
  }, qb = ["Webkit", "ms", "Moz", "O"];
  Object.keys(pb).forEach(function(a) {
    qb.forEach(function(b) {
      b = b + a.charAt(0).toUpperCase() + a.substring(1);
      pb[b] = pb[a];
    });
  });
  function rb(a, b, c) {
    return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
  }
  function sb(a, b) {
    a = a.style;
    for (var c in b) if (b.hasOwnProperty(c)) {
      var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
      "float" === c && (c = "cssFloat");
      d ? a.setProperty(c, e) : a[c] = e;
    }
  }
  var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
  function ub(a, b) {
    if (b) {
      if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
      if (null != b.dangerouslySetInnerHTML) {
        if (null != b.children) throw Error(p(60));
        if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
      }
      if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
    }
  }
  function vb(a, b) {
    if (-1 === a.indexOf("-")) return "string" === typeof b.is;
    switch (a) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var wb = null;
  function xb(a) {
    a = a.target || a.srcElement || window;
    a.correspondingUseElement && (a = a.correspondingUseElement);
    return 3 === a.nodeType ? a.parentNode : a;
  }
  var yb = null, zb = null, Ab = null;
  function Bb(a) {
    if (a = Cb(a)) {
      if ("function" !== typeof yb) throw Error(p(280));
      var b = a.stateNode;
      b && (b = Db(b), yb(a.stateNode, a.type, b));
    }
  }
  function Eb(a) {
    zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
  }
  function Fb() {
    if (zb) {
      var a = zb, b = Ab;
      Ab = zb = null;
      Bb(a);
      if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
    }
  }
  function Gb(a, b) {
    return a(b);
  }
  function Hb() {
  }
  var Ib = false;
  function Jb(a, b, c) {
    if (Ib) return a(b, c);
    Ib = true;
    try {
      return Gb(a, b, c);
    } finally {
      if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
    }
  }
  function Kb(a, b) {
    var c = a.stateNode;
    if (null === c) return null;
    var d = Db(c);
    if (null === d) return null;
    c = d[b];
    a: switch (b) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
        a = !d;
        break a;
      default:
        a = false;
    }
    if (a) return null;
    if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
    return c;
  }
  var Lb = false;
  if (ia) try {
    var Mb = {};
    Object.defineProperty(Mb, "passive", { get: function() {
      Lb = true;
    } });
    window.addEventListener("test", Mb, Mb);
    window.removeEventListener("test", Mb, Mb);
  } catch (a) {
    Lb = false;
  }
  function Nb(a, b, c, d, e, f, g, h, k) {
    var l = Array.prototype.slice.call(arguments, 3);
    try {
      b.apply(c, l);
    } catch (m) {
      this.onError(m);
    }
  }
  var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
    Ob = true;
    Pb = a;
  } };
  function Tb(a, b, c, d, e, f, g, h, k) {
    Ob = false;
    Pb = null;
    Nb.apply(Sb, arguments);
  }
  function Ub(a, b, c, d, e, f, g, h, k) {
    Tb.apply(this, arguments);
    if (Ob) {
      if (Ob) {
        var l = Pb;
        Ob = false;
        Pb = null;
      } else throw Error(p(198));
      Qb || (Qb = true, Rb = l);
    }
  }
  function Vb(a) {
    var b = a, c = a;
    if (a.alternate) for (; b.return; ) b = b.return;
    else {
      a = b;
      do
        b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
      while (a);
    }
    return 3 === b.tag ? c : null;
  }
  function Wb(a) {
    if (13 === a.tag) {
      var b = a.memoizedState;
      null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
      if (null !== b) return b.dehydrated;
    }
    return null;
  }
  function Xb(a) {
    if (Vb(a) !== a) throw Error(p(188));
  }
  function Yb(a) {
    var b = a.alternate;
    if (!b) {
      b = Vb(a);
      if (null === b) throw Error(p(188));
      return b !== a ? null : a;
    }
    for (var c = a, d = b; ; ) {
      var e = c.return;
      if (null === e) break;
      var f = e.alternate;
      if (null === f) {
        d = e.return;
        if (null !== d) {
          c = d;
          continue;
        }
        break;
      }
      if (e.child === f.child) {
        for (f = e.child; f; ) {
          if (f === c) return Xb(e), a;
          if (f === d) return Xb(e), b;
          f = f.sibling;
        }
        throw Error(p(188));
      }
      if (c.return !== d.return) c = e, d = f;
      else {
        for (var g = false, h = e.child; h; ) {
          if (h === c) {
            g = true;
            c = e;
            d = f;
            break;
          }
          if (h === d) {
            g = true;
            d = e;
            c = f;
            break;
          }
          h = h.sibling;
        }
        if (!g) {
          for (h = f.child; h; ) {
            if (h === c) {
              g = true;
              c = f;
              d = e;
              break;
            }
            if (h === d) {
              g = true;
              d = f;
              c = e;
              break;
            }
            h = h.sibling;
          }
          if (!g) throw Error(p(189));
        }
      }
      if (c.alternate !== d) throw Error(p(190));
    }
    if (3 !== c.tag) throw Error(p(188));
    return c.stateNode.current === c ? a : b;
  }
  function Zb(a) {
    a = Yb(a);
    return null !== a ? $b(a) : null;
  }
  function $b(a) {
    if (5 === a.tag || 6 === a.tag) return a;
    for (a = a.child; null !== a; ) {
      var b = $b(a);
      if (null !== b) return b;
      a = a.sibling;
    }
    return null;
  }
  var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
  function mc(a) {
    if (lc && "function" === typeof lc.onCommitFiberRoot) try {
      lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
    } catch (b) {
    }
  }
  var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
  function nc(a) {
    a >>>= 0;
    return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
  }
  var rc = 64, sc = 4194304;
  function tc(a) {
    switch (a & -a) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return a & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return a & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return a;
    }
  }
  function uc(a, b) {
    var c = a.pendingLanes;
    if (0 === c) return 0;
    var d = 0, e = a.suspendedLanes, f = a.pingedLanes, g = c & 268435455;
    if (0 !== g) {
      var h = g & ~e;
      0 !== h ? d = tc(h) : (f &= g, 0 !== f && (d = tc(f)));
    } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f && (d = tc(f));
    if (0 === d) return 0;
    if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240))) return b;
    0 !== (d & 4) && (d |= c & 16);
    b = a.entangledLanes;
    if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
    return d;
  }
  function vc(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 4:
        return b + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return b + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function wc(a, b) {
    for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f; ) {
      var g = 31 - oc(f), h = 1 << g, k = e[g];
      if (-1 === k) {
        if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
      } else k <= b && (a.expiredLanes |= h);
      f &= ~h;
    }
  }
  function xc(a) {
    a = a.pendingLanes & -1073741825;
    return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
  }
  function yc() {
    var a = rc;
    rc <<= 1;
    0 === (rc & 4194240) && (rc = 64);
    return a;
  }
  function zc(a) {
    for (var b = [], c = 0; 31 > c; c++) b.push(a);
    return b;
  }
  function Ac(a, b, c) {
    a.pendingLanes |= b;
    536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
    a = a.eventTimes;
    b = 31 - oc(b);
    a[b] = c;
  }
  function Bc(a, b) {
    var c = a.pendingLanes & ~b;
    a.pendingLanes = b;
    a.suspendedLanes = 0;
    a.pingedLanes = 0;
    a.expiredLanes &= b;
    a.mutableReadLanes &= b;
    a.entangledLanes &= b;
    b = a.entanglements;
    var d = a.eventTimes;
    for (a = a.expirationTimes; 0 < c; ) {
      var e = 31 - oc(c), f = 1 << e;
      b[e] = 0;
      d[e] = -1;
      a[e] = -1;
      c &= ~f;
    }
  }
  function Cc(a, b) {
    var c = a.entangledLanes |= b;
    for (a = a.entanglements; c; ) {
      var d = 31 - oc(c), e = 1 << d;
      e & b | a[d] & b && (a[d] |= b);
      c &= ~e;
    }
  }
  var C = 0;
  function Dc(a) {
    a &= -a;
    return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
  }
  var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Sc(a, b) {
    switch (a) {
      case "focusin":
      case "focusout":
        Lc = null;
        break;
      case "dragenter":
      case "dragleave":
        Mc = null;
        break;
      case "mouseover":
      case "mouseout":
        Nc = null;
        break;
      case "pointerover":
      case "pointerout":
        Oc.delete(b.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Pc.delete(b.pointerId);
    }
  }
  function Tc(a, b, c, d, e, f) {
    if (null === a || a.nativeEvent !== f) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
    a.eventSystemFlags |= d;
    b = a.targetContainers;
    null !== e && -1 === b.indexOf(e) && b.push(e);
    return a;
  }
  function Uc(a, b, c, d, e) {
    switch (b) {
      case "focusin":
        return Lc = Tc(Lc, a, b, c, d, e), true;
      case "dragenter":
        return Mc = Tc(Mc, a, b, c, d, e), true;
      case "mouseover":
        return Nc = Tc(Nc, a, b, c, d, e), true;
      case "pointerover":
        var f = e.pointerId;
        Oc.set(f, Tc(Oc.get(f) || null, a, b, c, d, e));
        return true;
      case "gotpointercapture":
        return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a, b, c, d, e)), true;
    }
    return false;
  }
  function Vc(a) {
    var b = Wc(a.target);
    if (null !== b) {
      var c = Vb(b);
      if (null !== c) {
        if (b = c.tag, 13 === b) {
          if (b = Wb(c), null !== b) {
            a.blockedOn = b;
            Ic(a.priority, function() {
              Gc(c);
            });
            return;
          }
        } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
          a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
          return;
        }
      }
    }
    a.blockedOn = null;
  }
  function Xc(a) {
    if (null !== a.blockedOn) return false;
    for (var b = a.targetContainers; 0 < b.length; ) {
      var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
      if (null === c) {
        c = a.nativeEvent;
        var d = new c.constructor(c.type, c);
        wb = d;
        c.target.dispatchEvent(d);
        wb = null;
      } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
      b.shift();
    }
    return true;
  }
  function Zc(a, b, c) {
    Xc(a) && c.delete(b);
  }
  function $c() {
    Jc = false;
    null !== Lc && Xc(Lc) && (Lc = null);
    null !== Mc && Xc(Mc) && (Mc = null);
    null !== Nc && Xc(Nc) && (Nc = null);
    Oc.forEach(Zc);
    Pc.forEach(Zc);
  }
  function ad(a, b) {
    a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
  }
  function bd(a) {
    function b(b2) {
      return ad(b2, a);
    }
    if (0 < Kc.length) {
      ad(Kc[0], a);
      for (var c = 1; c < Kc.length; c++) {
        var d = Kc[c];
        d.blockedOn === a && (d.blockedOn = null);
      }
    }
    null !== Lc && ad(Lc, a);
    null !== Mc && ad(Mc, a);
    null !== Nc && ad(Nc, a);
    Oc.forEach(b);
    Pc.forEach(b);
    for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
    for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
  }
  var cd = ua.ReactCurrentBatchConfig, dd = true;
  function ed(a, b, c, d) {
    var e = C, f = cd.transition;
    cd.transition = null;
    try {
      C = 1, fd(a, b, c, d);
    } finally {
      C = e, cd.transition = f;
    }
  }
  function gd(a, b, c, d) {
    var e = C, f = cd.transition;
    cd.transition = null;
    try {
      C = 4, fd(a, b, c, d);
    } finally {
      C = e, cd.transition = f;
    }
  }
  function fd(a, b, c, d) {
    if (dd) {
      var e = Yc(a, b, c, d);
      if (null === e) hd(a, b, d, id, c), Sc(a, d);
      else if (Uc(e, a, b, c, d)) d.stopPropagation();
      else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
        for (; null !== e; ) {
          var f = Cb(e);
          null !== f && Ec(f);
          f = Yc(a, b, c, d);
          null === f && hd(a, b, d, id, c);
          if (f === e) break;
          e = f;
        }
        null !== e && d.stopPropagation();
      } else hd(a, b, d, null, c);
    }
  }
  var id = null;
  function Yc(a, b, c, d) {
    id = null;
    a = xb(d);
    a = Wc(a);
    if (null !== a) if (b = Vb(a), null === b) a = null;
    else if (c = b.tag, 13 === c) {
      a = Wb(b);
      if (null !== a) return a;
      a = null;
    } else if (3 === c) {
      if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
      a = null;
    } else b !== a && (a = null);
    id = a;
    return null;
  }
  function jd(a) {
    switch (a) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (ec()) {
          case fc:
            return 1;
          case gc:
            return 4;
          case hc:
          case ic:
            return 16;
          case jc:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var kd = null, ld = null, md = null;
  function nd() {
    if (md) return md;
    var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
    for (a = 0; a < c && b[a] === e[a]; a++) ;
    var g = c - a;
    for (d = 1; d <= g && b[c - d] === e[f - d]; d++) ;
    return md = e.slice(a, 1 < d ? 1 - d : void 0);
  }
  function od(a) {
    var b = a.keyCode;
    "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
    10 === a && (a = 13);
    return 32 <= a || 13 === a ? a : 0;
  }
  function pd() {
    return true;
  }
  function qd() {
    return false;
  }
  function rd(a) {
    function b(b2, d, e, f, g) {
      this._reactName = b2;
      this._targetInst = e;
      this.type = d;
      this.nativeEvent = f;
      this.target = g;
      this.currentTarget = null;
      for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f) : f[c]);
      this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : false === f.returnValue) ? pd : qd;
      this.isPropagationStopped = qd;
      return this;
    }
    A(b.prototype, { preventDefault: function() {
      this.defaultPrevented = true;
      var a2 = this.nativeEvent;
      a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
    }, stopPropagation: function() {
      var a2 = this.nativeEvent;
      a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
    }, persist: function() {
    }, isPersistent: pd });
    return b;
  }
  var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
    return a.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
    return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
  }, movementX: function(a) {
    if ("movementX" in a) return a.movementX;
    a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
    return wd;
  }, movementY: function(a) {
    return "movementY" in a ? a.movementY : xd;
  } }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a) {
    return "clipboardData" in a ? a.clipboardData : window.clipboardData;
  } }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Nd = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Pd(a) {
    var b = this.nativeEvent;
    return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
  }
  function zd() {
    return Pd;
  }
  var Qd = A({}, ud, { key: function(a) {
    if (a.key) {
      var b = Md[a.key] || a.key;
      if ("Unidentified" !== b) return b;
    }
    return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
    return "keypress" === a.type ? od(a) : 0;
  }, keyCode: function(a) {
    return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  }, which: function(a) {
    return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  } }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
    deltaX: function(a) {
      return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
    },
    deltaY: function(a) {
      return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
  ia && "documentMode" in document && (be = document.documentMode);
  var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
  function ge(a, b) {
    switch (a) {
      case "keyup":
        return -1 !== $d.indexOf(b.keyCode);
      case "keydown":
        return 229 !== b.keyCode;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function he(a) {
    a = a.detail;
    return "object" === typeof a && "data" in a ? a.data : null;
  }
  var ie = false;
  function je(a, b) {
    switch (a) {
      case "compositionend":
        return he(b);
      case "keypress":
        if (32 !== b.which) return null;
        fe = true;
        return ee;
      case "textInput":
        return a = b.data, a === ee && fe ? null : a;
      default:
        return null;
    }
  }
  function ke(a, b) {
    if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
    switch (a) {
      case "paste":
        return null;
      case "keypress":
        if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
          if (b.char && 1 < b.char.length) return b.char;
          if (b.which) return String.fromCharCode(b.which);
        }
        return null;
      case "compositionend":
        return de && "ko" !== b.locale ? null : b.data;
      default:
        return null;
    }
  }
  var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function me(a) {
    var b = a && a.nodeName && a.nodeName.toLowerCase();
    return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
  }
  function ne(a, b, c, d) {
    Eb(d);
    b = oe(b, "onChange");
    0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
  }
  var pe = null, qe = null;
  function re(a) {
    se(a, 0);
  }
  function te(a) {
    var b = ue(a);
    if (Wa(b)) return a;
  }
  function ve(a, b) {
    if ("change" === a) return b;
  }
  var we = false;
  if (ia) {
    var xe;
    if (ia) {
      var ye = "oninput" in document;
      if (!ye) {
        var ze = document.createElement("div");
        ze.setAttribute("oninput", "return;");
        ye = "function" === typeof ze.oninput;
      }
      xe = ye;
    } else xe = false;
    we = xe && (!document.documentMode || 9 < document.documentMode);
  }
  function Ae() {
    pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
  }
  function Be(a) {
    if ("value" === a.propertyName && te(qe)) {
      var b = [];
      ne(b, qe, a, xb(a));
      Jb(re, b);
    }
  }
  function Ce(a, b, c) {
    "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
  }
  function De(a) {
    if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
  }
  function Ee(a, b) {
    if ("click" === a) return te(b);
  }
  function Fe(a, b) {
    if ("input" === a || "change" === a) return te(b);
  }
  function Ge(a, b) {
    return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
  }
  var He = "function" === typeof Object.is ? Object.is : Ge;
  function Ie(a, b) {
    if (He(a, b)) return true;
    if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
    var c = Object.keys(a), d = Object.keys(b);
    if (c.length !== d.length) return false;
    for (d = 0; d < c.length; d++) {
      var e = c[d];
      if (!ja.call(b, e) || !He(a[e], b[e])) return false;
    }
    return true;
  }
  function Je(a) {
    for (; a && a.firstChild; ) a = a.firstChild;
    return a;
  }
  function Ke(a, b) {
    var c = Je(a);
    a = 0;
    for (var d; c; ) {
      if (3 === c.nodeType) {
        d = a + c.textContent.length;
        if (a <= b && d >= b) return { node: c, offset: b - a };
        a = d;
      }
      a: {
        for (; c; ) {
          if (c.nextSibling) {
            c = c.nextSibling;
            break a;
          }
          c = c.parentNode;
        }
        c = void 0;
      }
      c = Je(c);
    }
  }
  function Le(a, b) {
    return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
  }
  function Me() {
    for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
      try {
        var c = "string" === typeof b.contentWindow.location.href;
      } catch (d) {
        c = false;
      }
      if (c) a = b.contentWindow;
      else break;
      b = Xa(a.document);
    }
    return b;
  }
  function Ne(a) {
    var b = a && a.nodeName && a.nodeName.toLowerCase();
    return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
  }
  function Oe(a) {
    var b = Me(), c = a.focusedElem, d = a.selectionRange;
    if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
      if (null !== d && Ne(c)) {
        if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
        else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
          a = a.getSelection();
          var e = c.textContent.length, f = Math.min(d.start, e);
          d = void 0 === d.end ? f : Math.min(d.end, e);
          !a.extend && f > d && (e = d, d = f, f = e);
          e = Ke(c, f);
          var g = Ke(
            c,
            d
          );
          e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
        }
      }
      b = [];
      for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
      "function" === typeof c.focus && c.focus();
      for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
    }
  }
  var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
  function Ue(a, b, c) {
    var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
    Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
  }
  function Ve(a, b) {
    var c = {};
    c[a.toLowerCase()] = b.toLowerCase();
    c["Webkit" + a] = "webkit" + b;
    c["Moz" + a] = "moz" + b;
    return c;
  }
  var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
  ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
  function Ze(a) {
    if (Xe[a]) return Xe[a];
    if (!We[a]) return a;
    var b = We[a], c;
    for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
    return a;
  }
  var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function ff(a, b) {
    df.set(a, b);
    fa(b, [a]);
  }
  for (var gf = 0; gf < ef.length; gf++) {
    var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
    ff(jf, "on" + kf);
  }
  ff($e, "onAnimationEnd");
  ff(af, "onAnimationIteration");
  ff(bf, "onAnimationStart");
  ff("dblclick", "onDoubleClick");
  ff("focusin", "onFocus");
  ff("focusout", "onBlur");
  ff(cf, "onTransitionEnd");
  ha("onMouseEnter", ["mouseout", "mouseover"]);
  ha("onMouseLeave", ["mouseout", "mouseover"]);
  ha("onPointerEnter", ["pointerout", "pointerover"]);
  ha("onPointerLeave", ["pointerout", "pointerover"]);
  fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
  fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
  fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
  fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
  fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
  fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
  function nf(a, b, c) {
    var d = a.type || "unknown-event";
    a.currentTarget = c;
    Ub(d, b, void 0, a);
    a.currentTarget = null;
  }
  function se(a, b) {
    b = 0 !== (b & 4);
    for (var c = 0; c < a.length; c++) {
      var d = a[c], e = d.event;
      d = d.listeners;
      a: {
        var f = void 0;
        if (b) for (var g = d.length - 1; 0 <= g; g--) {
          var h = d[g], k = h.instance, l = h.currentTarget;
          h = h.listener;
          if (k !== f && e.isPropagationStopped()) break a;
          nf(e, h, l);
          f = k;
        }
        else for (g = 0; g < d.length; g++) {
          h = d[g];
          k = h.instance;
          l = h.currentTarget;
          h = h.listener;
          if (k !== f && e.isPropagationStopped()) break a;
          nf(e, h, l);
          f = k;
        }
      }
    }
    if (Qb) throw a = Rb, Qb = false, Rb = null, a;
  }
  function D(a, b) {
    var c = b[of];
    void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
    var d = a + "__bubble";
    c.has(d) || (pf(b, a, 2, false), c.add(d));
  }
  function qf(a, b, c) {
    var d = 0;
    b && (d |= 4);
    pf(c, a, d, b);
  }
  var rf = "_reactListening" + Math.random().toString(36).slice(2);
  function sf(a) {
    if (!a[rf]) {
      a[rf] = true;
      da.forEach(function(b2) {
        "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
      });
      var b = 9 === a.nodeType ? a : a.ownerDocument;
      null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
    }
  }
  function pf(a, b, c, d) {
    switch (jd(b)) {
      case 1:
        var e = ed;
        break;
      case 4:
        e = gd;
        break;
      default:
        e = fd;
    }
    c = e.bind(null, b, c, a);
    e = void 0;
    !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
    d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
  }
  function hd(a, b, c, d, e) {
    var f = d;
    if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
      if (null === d) return;
      var g = d.tag;
      if (3 === g || 4 === g) {
        var h = d.stateNode.containerInfo;
        if (h === e || 8 === h.nodeType && h.parentNode === e) break;
        if (4 === g) for (g = d.return; null !== g; ) {
          var k = g.tag;
          if (3 === k || 4 === k) {
            if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e) return;
          }
          g = g.return;
        }
        for (; null !== h; ) {
          g = Wc(h);
          if (null === g) return;
          k = g.tag;
          if (5 === k || 6 === k) {
            d = f = g;
            continue a;
          }
          h = h.parentNode;
        }
      }
      d = d.return;
    }
    Jb(function() {
      var d2 = f, e2 = xb(c), g2 = [];
      a: {
        var h2 = df.get(a);
        if (void 0 !== h2) {
          var k2 = td, n = a;
          switch (a) {
            case "keypress":
              if (0 === od(c)) break a;
            case "keydown":
            case "keyup":
              k2 = Rd;
              break;
            case "focusin":
              n = "focus";
              k2 = Fd;
              break;
            case "focusout":
              n = "blur";
              k2 = Fd;
              break;
            case "beforeblur":
            case "afterblur":
              k2 = Fd;
              break;
            case "click":
              if (2 === c.button) break a;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              k2 = Bd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              k2 = Dd;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              k2 = Vd;
              break;
            case $e:
            case af:
            case bf:
              k2 = Hd;
              break;
            case cf:
              k2 = Xd;
              break;
            case "scroll":
              k2 = vd;
              break;
            case "wheel":
              k2 = Zd;
              break;
            case "copy":
            case "cut":
            case "paste":
              k2 = Jd;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              k2 = Td;
          }
          var t = 0 !== (b & 4), J = !t && "scroll" === a, x = t ? null !== h2 ? h2 + "Capture" : null : h2;
          t = [];
          for (var w = d2, u; null !== w; ) {
            u = w;
            var F = u.stateNode;
            5 === u.tag && null !== F && (u = F, null !== x && (F = Kb(w, x), null != F && t.push(tf(w, F, u))));
            if (J) break;
            w = w.return;
          }
          0 < t.length && (h2 = new k2(h2, n, null, c, e2), g2.push({ event: h2, listeners: t }));
        }
      }
      if (0 === (b & 7)) {
        a: {
          h2 = "mouseover" === a || "pointerover" === a;
          k2 = "mouseout" === a || "pointerout" === a;
          if (h2 && c !== wb && (n = c.relatedTarget || c.fromElement) && (Wc(n) || n[uf])) break a;
          if (k2 || h2) {
            h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
            if (k2) {
              if (n = c.relatedTarget || c.toElement, k2 = d2, n = n ? Wc(n) : null, null !== n && (J = Vb(n), n !== J || 5 !== n.tag && 6 !== n.tag)) n = null;
            } else k2 = null, n = d2;
            if (k2 !== n) {
              t = Bd;
              F = "onMouseLeave";
              x = "onMouseEnter";
              w = "mouse";
              if ("pointerout" === a || "pointerover" === a) t = Td, F = "onPointerLeave", x = "onPointerEnter", w = "pointer";
              J = null == k2 ? h2 : ue(k2);
              u = null == n ? h2 : ue(n);
              h2 = new t(F, w + "leave", k2, c, e2);
              h2.target = J;
              h2.relatedTarget = u;
              F = null;
              Wc(e2) === d2 && (t = new t(x, w + "enter", n, c, e2), t.target = u, t.relatedTarget = J, F = t);
              J = F;
              if (k2 && n) b: {
                t = k2;
                x = n;
                w = 0;
                for (u = t; u; u = vf(u)) w++;
                u = 0;
                for (F = x; F; F = vf(F)) u++;
                for (; 0 < w - u; ) t = vf(t), w--;
                for (; 0 < u - w; ) x = vf(x), u--;
                for (; w--; ) {
                  if (t === x || null !== x && t === x.alternate) break b;
                  t = vf(t);
                  x = vf(x);
                }
                t = null;
              }
              else t = null;
              null !== k2 && wf(g2, h2, k2, t, false);
              null !== n && null !== J && wf(g2, J, n, t, true);
            }
          }
        }
        a: {
          h2 = d2 ? ue(d2) : window;
          k2 = h2.nodeName && h2.nodeName.toLowerCase();
          if ("select" === k2 || "input" === k2 && "file" === h2.type) var na = ve;
          else if (me(h2)) if (we) na = Fe;
          else {
            na = De;
            var xa = Ce;
          }
          else (k2 = h2.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
          if (na && (na = na(a, d2))) {
            ne(g2, na, c, e2);
            break a;
          }
          xa && xa(a, h2, d2);
          "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
        }
        xa = d2 ? ue(d2) : window;
        switch (a) {
          case "focusin":
            if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
            break;
          case "focusout":
            Se = Re = Qe = null;
            break;
          case "mousedown":
            Te = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Te = false;
            Ue(g2, c, e2);
            break;
          case "selectionchange":
            if (Pe) break;
          case "keydown":
          case "keyup":
            Ue(g2, c, e2);
        }
        var $a;
        if (ae) b: {
          switch (a) {
            case "compositionstart":
              var ba = "onCompositionStart";
              break b;
            case "compositionend":
              ba = "onCompositionEnd";
              break b;
            case "compositionupdate":
              ba = "onCompositionUpdate";
              break b;
          }
          ba = void 0;
        }
        else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
        ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
        if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
      }
      se(g2, b);
    });
  }
  function tf(a, b, c) {
    return { instance: a, listener: b, currentTarget: c };
  }
  function oe(a, b) {
    for (var c = b + "Capture", d = []; null !== a; ) {
      var e = a, f = e.stateNode;
      5 === e.tag && null !== f && (e = f, f = Kb(a, c), null != f && d.unshift(tf(a, f, e)), f = Kb(a, b), null != f && d.push(tf(a, f, e)));
      a = a.return;
    }
    return d;
  }
  function vf(a) {
    if (null === a) return null;
    do
      a = a.return;
    while (a && 5 !== a.tag);
    return a ? a : null;
  }
  function wf(a, b, c, d, e) {
    for (var f = b._reactName, g = []; null !== c && c !== d; ) {
      var h = c, k = h.alternate, l = h.stateNode;
      if (null !== k && k === d) break;
      5 === h.tag && null !== l && (h = l, e ? (k = Kb(c, f), null != k && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f), null != k && g.push(tf(c, k, h))));
      c = c.return;
    }
    0 !== g.length && a.push({ event: b, listeners: g });
  }
  var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
  function zf(a) {
    return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
  }
  function Af(a, b, c) {
    b = zf(b);
    if (zf(a) !== b && c) throw Error(p(425));
  }
  function Bf() {
  }
  var Cf = null, Df = null;
  function Ef(a, b) {
    return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
  }
  var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
    return Hf.resolve(null).then(a).catch(If);
  } : Ff;
  function If(a) {
    setTimeout(function() {
      throw a;
    });
  }
  function Kf(a, b) {
    var c = b, d = 0;
    do {
      var e = c.nextSibling;
      a.removeChild(c);
      if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
        if (0 === d) {
          a.removeChild(e);
          bd(b);
          return;
        }
        d--;
      } else "$" !== c && "$?" !== c && "$!" !== c || d++;
      c = e;
    } while (c);
    bd(b);
  }
  function Lf(a) {
    for (; null != a; a = a.nextSibling) {
      var b = a.nodeType;
      if (1 === b || 3 === b) break;
      if (8 === b) {
        b = a.data;
        if ("$" === b || "$!" === b || "$?" === b) break;
        if ("/$" === b) return null;
      }
    }
    return a;
  }
  function Mf(a) {
    a = a.previousSibling;
    for (var b = 0; a; ) {
      if (8 === a.nodeType) {
        var c = a.data;
        if ("$" === c || "$!" === c || "$?" === c) {
          if (0 === b) return a;
          b--;
        } else "/$" === c && b++;
      }
      a = a.previousSibling;
    }
    return null;
  }
  var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
  function Wc(a) {
    var b = a[Of];
    if (b) return b;
    for (var c = a.parentNode; c; ) {
      if (b = c[uf] || c[Of]) {
        c = b.alternate;
        if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
          if (c = a[Of]) return c;
          a = Mf(a);
        }
        return b;
      }
      a = c;
      c = a.parentNode;
    }
    return null;
  }
  function Cb(a) {
    a = a[Of] || a[uf];
    return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
  }
  function ue(a) {
    if (5 === a.tag || 6 === a.tag) return a.stateNode;
    throw Error(p(33));
  }
  function Db(a) {
    return a[Pf] || null;
  }
  var Sf = [], Tf = -1;
  function Uf(a) {
    return { current: a };
  }
  function E(a) {
    0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
  }
  function G(a, b) {
    Tf++;
    Sf[Tf] = a.current;
    a.current = b;
  }
  var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
  function Yf(a, b) {
    var c = a.type.contextTypes;
    if (!c) return Vf;
    var d = a.stateNode;
    if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
    var e = {}, f;
    for (f in c) e[f] = b[f];
    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
    return e;
  }
  function Zf(a) {
    a = a.childContextTypes;
    return null !== a && void 0 !== a;
  }
  function $f() {
    E(Wf);
    E(H);
  }
  function ag(a, b, c) {
    if (H.current !== Vf) throw Error(p(168));
    G(H, b);
    G(Wf, c);
  }
  function bg(a, b, c) {
    var d = a.stateNode;
    b = b.childContextTypes;
    if ("function" !== typeof d.getChildContext) return c;
    d = d.getChildContext();
    for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
    return A({}, c, d);
  }
  function cg(a) {
    a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
    Xf = H.current;
    G(H, a);
    G(Wf, Wf.current);
    return true;
  }
  function dg(a, b, c) {
    var d = a.stateNode;
    if (!d) throw Error(p(169));
    c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
    G(Wf, c);
  }
  var eg = null, fg = false, gg = false;
  function hg(a) {
    null === eg ? eg = [a] : eg.push(a);
  }
  function ig(a) {
    fg = true;
    hg(a);
  }
  function jg() {
    if (!gg && null !== eg) {
      gg = true;
      var a = 0, b = C;
      try {
        var c = eg;
        for (C = 1; a < c.length; a++) {
          var d = c[a];
          do
            d = d(true);
          while (null !== d);
        }
        eg = null;
        fg = false;
      } catch (e) {
        throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
      } finally {
        C = b, gg = false;
      }
    }
    return null;
  }
  var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
  function tg(a, b) {
    kg[lg++] = ng;
    kg[lg++] = mg;
    mg = a;
    ng = b;
  }
  function ug(a, b, c) {
    og[pg++] = rg;
    og[pg++] = sg;
    og[pg++] = qg;
    qg = a;
    var d = rg;
    a = sg;
    var e = 32 - oc(d) - 1;
    d &= ~(1 << e);
    c += 1;
    var f = 32 - oc(b) + e;
    if (30 < f) {
      var g = e - e % 5;
      f = (d & (1 << g) - 1).toString(32);
      d >>= g;
      e -= g;
      rg = 1 << 32 - oc(b) + e | c << e | d;
      sg = f + a;
    } else rg = 1 << f | c << e | d, sg = a;
  }
  function vg(a) {
    null !== a.return && (tg(a, 1), ug(a, 1, 0));
  }
  function wg(a) {
    for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
    for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
  }
  var xg = null, yg = null, I = false, zg = null;
  function Ag(a, b) {
    var c = Bg(5, null, null, 0);
    c.elementType = "DELETED";
    c.stateNode = b;
    c.return = a;
    b = a.deletions;
    null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
  }
  function Cg(a, b) {
    switch (a.tag) {
      case 5:
        var c = a.type;
        b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
        return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
      case 6:
        return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
      case 13:
        return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
      default:
        return false;
    }
  }
  function Dg(a) {
    return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
  }
  function Eg(a) {
    if (I) {
      var b = yg;
      if (b) {
        var c = b;
        if (!Cg(a, b)) {
          if (Dg(a)) throw Error(p(418));
          b = Lf(c.nextSibling);
          var d = xg;
          b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
        }
      } else {
        if (Dg(a)) throw Error(p(418));
        a.flags = a.flags & -4097 | 2;
        I = false;
        xg = a;
      }
    }
  }
  function Fg(a) {
    for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
    xg = a;
  }
  function Gg(a) {
    if (a !== xg) return false;
    if (!I) return Fg(a), I = true, false;
    var b;
    (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
    if (b && (b = yg)) {
      if (Dg(a)) throw Hg(), Error(p(418));
      for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
    }
    Fg(a);
    if (13 === a.tag) {
      a = a.memoizedState;
      a = null !== a ? a.dehydrated : null;
      if (!a) throw Error(p(317));
      a: {
        a = a.nextSibling;
        for (b = 0; a; ) {
          if (8 === a.nodeType) {
            var c = a.data;
            if ("/$" === c) {
              if (0 === b) {
                yg = Lf(a.nextSibling);
                break a;
              }
              b--;
            } else "$" !== c && "$!" !== c && "$?" !== c || b++;
          }
          a = a.nextSibling;
        }
        yg = null;
      }
    } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
    return true;
  }
  function Hg() {
    for (var a = yg; a; ) a = Lf(a.nextSibling);
  }
  function Ig() {
    yg = xg = null;
    I = false;
  }
  function Jg(a) {
    null === zg ? zg = [a] : zg.push(a);
  }
  var Kg = ua.ReactCurrentBatchConfig;
  function Lg(a, b, c) {
    a = c.ref;
    if (null !== a && "function" !== typeof a && "object" !== typeof a) {
      if (c._owner) {
        c = c._owner;
        if (c) {
          if (1 !== c.tag) throw Error(p(309));
          var d = c.stateNode;
        }
        if (!d) throw Error(p(147, a));
        var e = d, f = "" + a;
        if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f) return b.ref;
        b = function(a2) {
          var b2 = e.refs;
          null === a2 ? delete b2[f] : b2[f] = a2;
        };
        b._stringRef = f;
        return b;
      }
      if ("string" !== typeof a) throw Error(p(284));
      if (!c._owner) throw Error(p(290, a));
    }
    return a;
  }
  function Mg(a, b) {
    a = Object.prototype.toString.call(b);
    throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
  }
  function Ng(a) {
    var b = a._init;
    return b(a._payload);
  }
  function Og(a) {
    function b(b2, c2) {
      if (a) {
        var d2 = b2.deletions;
        null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
      }
    }
    function c(c2, d2) {
      if (!a) return null;
      for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
      return null;
    }
    function d(a2, b2) {
      for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
      return a2;
    }
    function e(a2, b2) {
      a2 = Pg(a2, b2);
      a2.index = 0;
      a2.sibling = null;
      return a2;
    }
    function f(b2, c2, d2) {
      b2.index = d2;
      if (!a) return b2.flags |= 1048576, c2;
      d2 = b2.alternate;
      if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
      b2.flags |= 2;
      return c2;
    }
    function g(b2) {
      a && null === b2.alternate && (b2.flags |= 2);
      return b2;
    }
    function h(a2, b2, c2, d2) {
      if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
      b2 = e(b2, c2);
      b2.return = a2;
      return b2;
    }
    function k(a2, b2, c2, d2) {
      var f2 = c2.type;
      if (f2 === ya) return m(a2, b2, c2.props.children, d2, c2.key);
      if (null !== b2 && (b2.elementType === f2 || "object" === typeof f2 && null !== f2 && f2.$$typeof === Ha && Ng(f2) === b2.type)) return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
      d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
      d2.ref = Lg(a2, b2, c2);
      d2.return = a2;
      return d2;
    }
    function l(a2, b2, c2, d2) {
      if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
      b2 = e(b2, c2.children || []);
      b2.return = a2;
      return b2;
    }
    function m(a2, b2, c2, d2, f2) {
      if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f2), b2.return = a2, b2;
      b2 = e(b2, c2);
      b2.return = a2;
      return b2;
    }
    function q(a2, b2, c2) {
      if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
      if ("object" === typeof b2 && null !== b2) {
        switch (b2.$$typeof) {
          case va:
            return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
          case wa:
            return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
          case Ha:
            var d2 = b2._init;
            return q(a2, d2(b2._payload), c2);
        }
        if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
        Mg(a2, b2);
      }
      return null;
    }
    function r(a2, b2, c2, d2) {
      var e2 = null !== b2 ? b2.key : null;
      if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
      if ("object" === typeof c2 && null !== c2) {
        switch (c2.$$typeof) {
          case va:
            return c2.key === e2 ? k(a2, b2, c2, d2) : null;
          case wa:
            return c2.key === e2 ? l(a2, b2, c2, d2) : null;
          case Ha:
            return e2 = c2._init, r(
              a2,
              b2,
              e2(c2._payload),
              d2
            );
        }
        if (eb(c2) || Ka(c2)) return null !== e2 ? null : m(a2, b2, c2, d2, null);
        Mg(a2, c2);
      }
      return null;
    }
    function y(a2, b2, c2, d2, e2) {
      if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
      if ("object" === typeof d2 && null !== d2) {
        switch (d2.$$typeof) {
          case va:
            return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k(b2, a2, d2, e2);
          case wa:
            return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l(b2, a2, d2, e2);
          case Ha:
            var f2 = d2._init;
            return y(a2, b2, c2, f2(d2._payload), e2);
        }
        if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m(b2, a2, d2, e2, null);
        Mg(b2, d2);
      }
      return null;
    }
    function n(e2, g2, h2, k2) {
      for (var l2 = null, m2 = null, u = g2, w = g2 = 0, x = null; null !== u && w < h2.length; w++) {
        u.index > w ? (x = u, u = null) : x = u.sibling;
        var n2 = r(e2, u, h2[w], k2);
        if (null === n2) {
          null === u && (u = x);
          break;
        }
        a && u && null === n2.alternate && b(e2, u);
        g2 = f(n2, g2, w);
        null === m2 ? l2 = n2 : m2.sibling = n2;
        m2 = n2;
        u = x;
      }
      if (w === h2.length) return c(e2, u), I && tg(e2, w), l2;
      if (null === u) {
        for (; w < h2.length; w++) u = q(e2, h2[w], k2), null !== u && (g2 = f(u, g2, w), null === m2 ? l2 = u : m2.sibling = u, m2 = u);
        I && tg(e2, w);
        return l2;
      }
      for (u = d(e2, u); w < h2.length; w++) x = y(u, e2, w, h2[w], k2), null !== x && (a && null !== x.alternate && u.delete(null === x.key ? w : x.key), g2 = f(x, g2, w), null === m2 ? l2 = x : m2.sibling = x, m2 = x);
      a && u.forEach(function(a2) {
        return b(e2, a2);
      });
      I && tg(e2, w);
      return l2;
    }
    function t(e2, g2, h2, k2) {
      var l2 = Ka(h2);
      if ("function" !== typeof l2) throw Error(p(150));
      h2 = l2.call(h2);
      if (null == h2) throw Error(p(151));
      for (var u = l2 = null, m2 = g2, w = g2 = 0, x = null, n2 = h2.next(); null !== m2 && !n2.done; w++, n2 = h2.next()) {
        m2.index > w ? (x = m2, m2 = null) : x = m2.sibling;
        var t2 = r(e2, m2, n2.value, k2);
        if (null === t2) {
          null === m2 && (m2 = x);
          break;
        }
        a && m2 && null === t2.alternate && b(e2, m2);
        g2 = f(t2, g2, w);
        null === u ? l2 = t2 : u.sibling = t2;
        u = t2;
        m2 = x;
      }
      if (n2.done) return c(
        e2,
        m2
      ), I && tg(e2, w), l2;
      if (null === m2) {
        for (; !n2.done; w++, n2 = h2.next()) n2 = q(e2, n2.value, k2), null !== n2 && (g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
        I && tg(e2, w);
        return l2;
      }
      for (m2 = d(e2, m2); !n2.done; w++, n2 = h2.next()) n2 = y(m2, e2, w, n2.value, k2), null !== n2 && (a && null !== n2.alternate && m2.delete(null === n2.key ? w : n2.key), g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
      a && m2.forEach(function(a2) {
        return b(e2, a2);
      });
      I && tg(e2, w);
      return l2;
    }
    function J(a2, d2, f2, h2) {
      "object" === typeof f2 && null !== f2 && f2.type === ya && null === f2.key && (f2 = f2.props.children);
      if ("object" === typeof f2 && null !== f2) {
        switch (f2.$$typeof) {
          case va:
            a: {
              for (var k2 = f2.key, l2 = d2; null !== l2; ) {
                if (l2.key === k2) {
                  k2 = f2.type;
                  if (k2 === ya) {
                    if (7 === l2.tag) {
                      c(a2, l2.sibling);
                      d2 = e(l2, f2.props.children);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    }
                  } else if (l2.elementType === k2 || "object" === typeof k2 && null !== k2 && k2.$$typeof === Ha && Ng(k2) === l2.type) {
                    c(a2, l2.sibling);
                    d2 = e(l2, f2.props);
                    d2.ref = Lg(a2, l2, f2);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  }
                  c(a2, l2);
                  break;
                } else b(a2, l2);
                l2 = l2.sibling;
              }
              f2.type === ya ? (d2 = Tg(f2.props.children, a2.mode, h2, f2.key), d2.return = a2, a2 = d2) : (h2 = Rg(f2.type, f2.key, f2.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f2), h2.return = a2, a2 = h2);
            }
            return g(a2);
          case wa:
            a: {
              for (l2 = f2.key; null !== d2; ) {
                if (d2.key === l2) if (4 === d2.tag && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                  c(a2, d2.sibling);
                  d2 = e(d2, f2.children || []);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                } else {
                  c(a2, d2);
                  break;
                }
                else b(a2, d2);
                d2 = d2.sibling;
              }
              d2 = Sg(f2, a2.mode, h2);
              d2.return = a2;
              a2 = d2;
            }
            return g(a2);
          case Ha:
            return l2 = f2._init, J(a2, d2, l2(f2._payload), h2);
        }
        if (eb(f2)) return n(a2, d2, f2, h2);
        if (Ka(f2)) return t(a2, d2, f2, h2);
        Mg(a2, f2);
      }
      return "string" === typeof f2 && "" !== f2 || "number" === typeof f2 ? (f2 = "" + f2, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
    }
    return J;
  }
  var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
  function $g() {
    Zg = Yg = Xg = null;
  }
  function ah(a) {
    var b = Wg.current;
    E(Wg);
    a._currentValue = b;
  }
  function bh(a, b, c) {
    for (; null !== a; ) {
      var d = a.alternate;
      (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
      if (a === c) break;
      a = a.return;
    }
  }
  function ch(a, b) {
    Xg = a;
    Zg = Yg = null;
    a = a.dependencies;
    null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
  }
  function eh(a) {
    var b = a._currentValue;
    if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
      if (null === Xg) throw Error(p(308));
      Yg = a;
      Xg.dependencies = { lanes: 0, firstContext: a };
    } else Yg = Yg.next = a;
    return b;
  }
  var fh = null;
  function gh(a) {
    null === fh ? fh = [a] : fh.push(a);
  }
  function hh(a, b, c, d) {
    var e = b.interleaved;
    null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
    b.interleaved = c;
    return ih(a, d);
  }
  function ih(a, b) {
    a.lanes |= b;
    var c = a.alternate;
    null !== c && (c.lanes |= b);
    c = a;
    for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
    return 3 === c.tag ? c.stateNode : null;
  }
  var jh = false;
  function kh(a) {
    a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function lh(a, b) {
    a = a.updateQueue;
    b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
  }
  function mh(a, b) {
    return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
  }
  function nh(a, b, c) {
    var d = a.updateQueue;
    if (null === d) return null;
    d = d.shared;
    if (0 !== (K & 2)) {
      var e = d.pending;
      null === e ? b.next = b : (b.next = e.next, e.next = b);
      d.pending = b;
      return ih(a, c);
    }
    e = d.interleaved;
    null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
    d.interleaved = b;
    return ih(a, c);
  }
  function oh(a, b, c) {
    b = b.updateQueue;
    if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
      var d = b.lanes;
      d &= a.pendingLanes;
      c |= d;
      b.lanes = c;
      Cc(a, c);
    }
  }
  function ph(a, b) {
    var c = a.updateQueue, d = a.alternate;
    if (null !== d && (d = d.updateQueue, c === d)) {
      var e = null, f = null;
      c = c.firstBaseUpdate;
      if (null !== c) {
        do {
          var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
          null === f ? e = f = g : f = f.next = g;
          c = c.next;
        } while (null !== c);
        null === f ? e = f = b : f = f.next = b;
      } else e = f = b;
      c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects };
      a.updateQueue = c;
      return;
    }
    a = c.lastBaseUpdate;
    null === a ? c.firstBaseUpdate = b : a.next = b;
    c.lastBaseUpdate = b;
  }
  function qh(a, b, c, d) {
    var e = a.updateQueue;
    jh = false;
    var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
    if (null !== h) {
      e.shared.pending = null;
      var k = h, l = k.next;
      k.next = null;
      null === g ? f = l : g.next = l;
      g = k;
      var m = a.alternate;
      null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));
    }
    if (null !== f) {
      var q = e.baseState;
      g = 0;
      m = l = k = null;
      h = f;
      do {
        var r = h.lane, y = h.eventTime;
        if ((d & r) === r) {
          null !== m && (m = m.next = {
            eventTime: y,
            lane: 0,
            tag: h.tag,
            payload: h.payload,
            callback: h.callback,
            next: null
          });
          a: {
            var n = a, t = h;
            r = b;
            y = c;
            switch (t.tag) {
              case 1:
                n = t.payload;
                if ("function" === typeof n) {
                  q = n.call(y, q, r);
                  break a;
                }
                q = n;
                break a;
              case 3:
                n.flags = n.flags & -65537 | 128;
              case 0:
                n = t.payload;
                r = "function" === typeof n ? n.call(y, q, r) : n;
                if (null === r || void 0 === r) break a;
                q = A({}, q, r);
                break a;
              case 2:
                jh = true;
            }
          }
          null !== h.callback && 0 !== h.lane && (a.flags |= 64, r = e.effects, null === r ? e.effects = [h] : r.push(h));
        } else y = { eventTime: y, lane: r, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m ? (l = m = y, k = q) : m = m.next = y, g |= r;
        h = h.next;
        if (null === h) if (h = e.shared.pending, null === h) break;
        else r = h, h = r.next, r.next = null, e.lastBaseUpdate = r, e.shared.pending = null;
      } while (1);
      null === m && (k = q);
      e.baseState = k;
      e.firstBaseUpdate = l;
      e.lastBaseUpdate = m;
      b = e.shared.interleaved;
      if (null !== b) {
        e = b;
        do
          g |= e.lane, e = e.next;
        while (e !== b);
      } else null === f && (e.shared.lanes = 0);
      rh |= g;
      a.lanes = g;
      a.memoizedState = q;
    }
  }
  function sh(a, b, c) {
    a = b.effects;
    b.effects = null;
    if (null !== a) for (b = 0; b < a.length; b++) {
      var d = a[b], e = d.callback;
      if (null !== e) {
        d.callback = null;
        d = c;
        if ("function" !== typeof e) throw Error(p(191, e));
        e.call(d);
      }
    }
  }
  var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
  function xh(a) {
    if (a === th) throw Error(p(174));
    return a;
  }
  function yh(a, b) {
    G(wh, b);
    G(vh, a);
    G(uh, th);
    a = b.nodeType;
    switch (a) {
      case 9:
      case 11:
        b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
        break;
      default:
        a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
    }
    E(uh);
    G(uh, b);
  }
  function zh() {
    E(uh);
    E(vh);
    E(wh);
  }
  function Ah(a) {
    xh(wh.current);
    var b = xh(uh.current);
    var c = lb(b, a.type);
    b !== c && (G(vh, a), G(uh, c));
  }
  function Bh(a) {
    vh.current === a && (E(uh), E(vh));
  }
  var L = Uf(0);
  function Ch(a) {
    for (var b = a; null !== b; ) {
      if (13 === b.tag) {
        var c = b.memoizedState;
        if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
      } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
        if (0 !== (b.flags & 128)) return b;
      } else if (null !== b.child) {
        b.child.return = b;
        b = b.child;
        continue;
      }
      if (b === a) break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a) return null;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
    return null;
  }
  var Dh = [];
  function Eh() {
    for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
    Dh.length = 0;
  }
  var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
  function P() {
    throw Error(p(321));
  }
  function Mh(a, b) {
    if (null === b) return false;
    for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
    return true;
  }
  function Nh(a, b, c, d, e, f) {
    Hh = f;
    M = b;
    b.memoizedState = null;
    b.updateQueue = null;
    b.lanes = 0;
    Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
    a = c(d, e);
    if (Jh) {
      f = 0;
      do {
        Jh = false;
        Kh = 0;
        if (25 <= f) throw Error(p(301));
        f += 1;
        O = N = null;
        b.updateQueue = null;
        Fh.current = Qh;
        a = c(d, e);
      } while (Jh);
    }
    Fh.current = Rh;
    b = null !== N && null !== N.next;
    Hh = 0;
    O = N = M = null;
    Ih = false;
    if (b) throw Error(p(300));
    return a;
  }
  function Sh() {
    var a = 0 !== Kh;
    Kh = 0;
    return a;
  }
  function Th() {
    var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    null === O ? M.memoizedState = O = a : O = O.next = a;
    return O;
  }
  function Uh() {
    if (null === N) {
      var a = M.alternate;
      a = null !== a ? a.memoizedState : null;
    } else a = N.next;
    var b = null === O ? M.memoizedState : O.next;
    if (null !== b) O = b, N = a;
    else {
      if (null === a) throw Error(p(310));
      N = a;
      a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
      null === O ? M.memoizedState = O = a : O = O.next = a;
    }
    return O;
  }
  function Vh(a, b) {
    return "function" === typeof b ? b(a) : b;
  }
  function Wh(a) {
    var b = Uh(), c = b.queue;
    if (null === c) throw Error(p(311));
    c.lastRenderedReducer = a;
    var d = N, e = d.baseQueue, f = c.pending;
    if (null !== f) {
      if (null !== e) {
        var g = e.next;
        e.next = f.next;
        f.next = g;
      }
      d.baseQueue = e = f;
      c.pending = null;
    }
    if (null !== e) {
      f = e.next;
      d = d.baseState;
      var h = g = null, k = null, l = f;
      do {
        var m = l.lane;
        if ((Hh & m) === m) null !== k && (k = k.next = { lane: 0, action: l.action, hasEagerState: l.hasEagerState, eagerState: l.eagerState, next: null }), d = l.hasEagerState ? l.eagerState : a(d, l.action);
        else {
          var q = {
            lane: m,
            action: l.action,
            hasEagerState: l.hasEagerState,
            eagerState: l.eagerState,
            next: null
          };
          null === k ? (h = k = q, g = d) : k = k.next = q;
          M.lanes |= m;
          rh |= m;
        }
        l = l.next;
      } while (null !== l && l !== f);
      null === k ? g = d : k.next = h;
      He(d, b.memoizedState) || (dh = true);
      b.memoizedState = d;
      b.baseState = g;
      b.baseQueue = k;
      c.lastRenderedState = d;
    }
    a = c.interleaved;
    if (null !== a) {
      e = a;
      do
        f = e.lane, M.lanes |= f, rh |= f, e = e.next;
      while (e !== a);
    } else null === e && (c.lanes = 0);
    return [b.memoizedState, c.dispatch];
  }
  function Xh(a) {
    var b = Uh(), c = b.queue;
    if (null === c) throw Error(p(311));
    c.lastRenderedReducer = a;
    var d = c.dispatch, e = c.pending, f = b.memoizedState;
    if (null !== e) {
      c.pending = null;
      var g = e = e.next;
      do
        f = a(f, g.action), g = g.next;
      while (g !== e);
      He(f, b.memoizedState) || (dh = true);
      b.memoizedState = f;
      null === b.baseQueue && (b.baseState = f);
      c.lastRenderedState = f;
    }
    return [f, d];
  }
  function Yh() {
  }
  function Zh(a, b) {
    var c = M, d = Uh(), e = b(), f = !He(d.memoizedState, e);
    f && (d.memoizedState = e, dh = true);
    d = d.queue;
    $h(ai.bind(null, c, d, a), [a]);
    if (d.getSnapshot !== b || f || null !== O && O.memoizedState.tag & 1) {
      c.flags |= 2048;
      bi(9, ci.bind(null, c, d, e, b), void 0, null);
      if (null === Q) throw Error(p(349));
      0 !== (Hh & 30) || di(c, b, e);
    }
    return e;
  }
  function di(a, b, c) {
    a.flags |= 16384;
    a = { getSnapshot: b, value: c };
    b = M.updateQueue;
    null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
  }
  function ci(a, b, c, d) {
    b.value = c;
    b.getSnapshot = d;
    ei(b) && fi(a);
  }
  function ai(a, b, c) {
    return c(function() {
      ei(b) && fi(a);
    });
  }
  function ei(a) {
    var b = a.getSnapshot;
    a = a.value;
    try {
      var c = b();
      return !He(a, c);
    } catch (d) {
      return true;
    }
  }
  function fi(a) {
    var b = ih(a, 1);
    null !== b && gi(b, a, 1, -1);
  }
  function hi(a) {
    var b = Th();
    "function" === typeof a && (a = a());
    b.memoizedState = b.baseState = a;
    a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
    b.queue = a;
    a = a.dispatch = ii.bind(null, M, a);
    return [b.memoizedState, a];
  }
  function bi(a, b, c, d) {
    a = { tag: a, create: b, destroy: c, deps: d, next: null };
    b = M.updateQueue;
    null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
    return a;
  }
  function ji() {
    return Uh().memoizedState;
  }
  function ki(a, b, c, d) {
    var e = Th();
    M.flags |= a;
    e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
  }
  function li(a, b, c, d) {
    var e = Uh();
    d = void 0 === d ? null : d;
    var f = void 0;
    if (null !== N) {
      var g = N.memoizedState;
      f = g.destroy;
      if (null !== d && Mh(d, g.deps)) {
        e.memoizedState = bi(b, c, f, d);
        return;
      }
    }
    M.flags |= a;
    e.memoizedState = bi(1 | b, c, f, d);
  }
  function mi(a, b) {
    return ki(8390656, 8, a, b);
  }
  function $h(a, b) {
    return li(2048, 8, a, b);
  }
  function ni(a, b) {
    return li(4, 2, a, b);
  }
  function oi(a, b) {
    return li(4, 4, a, b);
  }
  function pi(a, b) {
    if ("function" === typeof b) return a = a(), b(a), function() {
      b(null);
    };
    if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
      b.current = null;
    };
  }
  function qi(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return li(4, 4, pi.bind(null, b, a), c);
  }
  function ri() {
  }
  function si(a, b) {
    var c = Uh();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Mh(b, d[1])) return d[0];
    c.memoizedState = [a, b];
    return a;
  }
  function ti(a, b) {
    var c = Uh();
    b = void 0 === b ? null : b;
    var d = c.memoizedState;
    if (null !== d && null !== b && Mh(b, d[1])) return d[0];
    a = a();
    c.memoizedState = [a, b];
    return a;
  }
  function ui(a, b, c) {
    if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
    He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
    return b;
  }
  function vi(a, b) {
    var c = C;
    C = 0 !== c && 4 > c ? c : 4;
    a(true);
    var d = Gh.transition;
    Gh.transition = {};
    try {
      a(false), b();
    } finally {
      C = c, Gh.transition = d;
    }
  }
  function wi() {
    return Uh().memoizedState;
  }
  function xi(a, b, c) {
    var d = yi(a);
    c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
    if (zi(a)) Ai(b, c);
    else if (c = hh(a, b, c, d), null !== c) {
      var e = R();
      gi(c, a, d, e);
      Bi(c, b, d);
    }
  }
  function ii(a, b, c) {
    var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
    if (zi(a)) Ai(b, e);
    else {
      var f = a.alternate;
      if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f)) try {
        var g = b.lastRenderedState, h = f(g, c);
        e.hasEagerState = true;
        e.eagerState = h;
        if (He(h, g)) {
          var k = b.interleaved;
          null === k ? (e.next = e, gh(b)) : (e.next = k.next, k.next = e);
          b.interleaved = e;
          return;
        }
      } catch (l) {
      } finally {
      }
      c = hh(a, b, e, d);
      null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
    }
  }
  function zi(a) {
    var b = a.alternate;
    return a === M || null !== b && b === M;
  }
  function Ai(a, b) {
    Jh = Ih = true;
    var c = a.pending;
    null === c ? b.next = b : (b.next = c.next, c.next = b);
    a.pending = b;
  }
  function Bi(a, b, c) {
    if (0 !== (c & 4194240)) {
      var d = b.lanes;
      d &= a.pendingLanes;
      c |= d;
      b.lanes = c;
      Cc(a, c);
    }
  }
  var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a, b) {
    Th().memoizedState = [a, void 0 === b ? null : b];
    return a;
  }, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return ki(
      4194308,
      4,
      pi.bind(null, b, a),
      c
    );
  }, useLayoutEffect: function(a, b) {
    return ki(4194308, 4, a, b);
  }, useInsertionEffect: function(a, b) {
    return ki(4, 2, a, b);
  }, useMemo: function(a, b) {
    var c = Th();
    b = void 0 === b ? null : b;
    a = a();
    c.memoizedState = [a, b];
    return a;
  }, useReducer: function(a, b, c) {
    var d = Th();
    b = void 0 !== c ? c(b) : b;
    d.memoizedState = d.baseState = b;
    a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
    d.queue = a;
    a = a.dispatch = xi.bind(null, M, a);
    return [d.memoizedState, a];
  }, useRef: function(a) {
    var b = Th();
    a = { current: a };
    return b.memoizedState = a;
  }, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
    return Th().memoizedState = a;
  }, useTransition: function() {
    var a = hi(false), b = a[0];
    a = vi.bind(null, a[1]);
    Th().memoizedState = a;
    return [b, a];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(a, b, c) {
    var d = M, e = Th();
    if (I) {
      if (void 0 === c) throw Error(p(407));
      c = c();
    } else {
      c = b();
      if (null === Q) throw Error(p(349));
      0 !== (Hh & 30) || di(d, b, c);
    }
    e.memoizedState = c;
    var f = { value: c, getSnapshot: b };
    e.queue = f;
    mi(ai.bind(
      null,
      d,
      f,
      a
    ), [a]);
    d.flags |= 2048;
    bi(9, ci.bind(null, d, f, c, b), void 0, null);
    return c;
  }, useId: function() {
    var a = Th(), b = Q.identifierPrefix;
    if (I) {
      var c = sg;
      var d = rg;
      c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
      b = ":" + b + "R" + c;
      c = Kh++;
      0 < c && (b += "H" + c.toString(32));
      b += ":";
    } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
    return a.memoizedState = b;
  }, unstable_isNewReconciler: false }, Ph = {
    readContext: eh,
    useCallback: si,
    useContext: eh,
    useEffect: $h,
    useImperativeHandle: qi,
    useInsertionEffect: ni,
    useLayoutEffect: oi,
    useMemo: ti,
    useReducer: Wh,
    useRef: ji,
    useState: function() {
      return Wh(Vh);
    },
    useDebugValue: ri,
    useDeferredValue: function(a) {
      var b = Uh();
      return ui(b, N.memoizedState, a);
    },
    useTransition: function() {
      var a = Wh(Vh)[0], b = Uh().memoizedState;
      return [a, b];
    },
    useMutableSource: Yh,
    useSyncExternalStore: Zh,
    useId: wi,
    unstable_isNewReconciler: false
  }, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
    return Xh(Vh);
  }, useDebugValue: ri, useDeferredValue: function(a) {
    var b = Uh();
    return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
  }, useTransition: function() {
    var a = Xh(Vh)[0], b = Uh().memoizedState;
    return [a, b];
  }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
  function Ci(a, b) {
    if (a && a.defaultProps) {
      b = A({}, b);
      a = a.defaultProps;
      for (var c in a) void 0 === b[c] && (b[c] = a[c]);
      return b;
    }
    return b;
  }
  function Di(a, b, c, d) {
    b = a.memoizedState;
    c = c(d, b);
    c = null === c || void 0 === c ? b : A({}, b, c);
    a.memoizedState = c;
    0 === a.lanes && (a.updateQueue.baseState = c);
  }
  var Ei = { isMounted: function(a) {
    return (a = a._reactInternals) ? Vb(a) === a : false;
  }, enqueueSetState: function(a, b, c) {
    a = a._reactInternals;
    var d = R(), e = yi(a), f = mh(d, e);
    f.payload = b;
    void 0 !== c && null !== c && (f.callback = c);
    b = nh(a, f, e);
    null !== b && (gi(b, a, e, d), oh(b, a, e));
  }, enqueueReplaceState: function(a, b, c) {
    a = a._reactInternals;
    var d = R(), e = yi(a), f = mh(d, e);
    f.tag = 1;
    f.payload = b;
    void 0 !== c && null !== c && (f.callback = c);
    b = nh(a, f, e);
    null !== b && (gi(b, a, e, d), oh(b, a, e));
  }, enqueueForceUpdate: function(a, b) {
    a = a._reactInternals;
    var c = R(), d = yi(a), e = mh(c, d);
    e.tag = 2;
    void 0 !== b && null !== b && (e.callback = b);
    b = nh(a, e, d);
    null !== b && (gi(b, a, d, c), oh(b, a, d));
  } };
  function Fi(a, b, c, d, e, f, g) {
    a = a.stateNode;
    return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f) : true;
  }
  function Gi(a, b, c) {
    var d = false, e = Vf;
    var f = b.contextType;
    "object" === typeof f && null !== f ? f = eh(f) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
    b = new b(c, f);
    a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
    b.updater = Ei;
    a.stateNode = b;
    b._reactInternals = a;
    d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
    return b;
  }
  function Hi(a, b, c, d) {
    a = b.state;
    "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
    "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
    b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
  }
  function Ii(a, b, c, d) {
    var e = a.stateNode;
    e.props = c;
    e.state = a.memoizedState;
    e.refs = {};
    kh(a);
    var f = b.contextType;
    "object" === typeof f && null !== f ? e.context = eh(f) : (f = Zf(b) ? Xf : H.current, e.context = Yf(a, f));
    e.state = a.memoizedState;
    f = b.getDerivedStateFromProps;
    "function" === typeof f && (Di(a, b, f, c), e.state = a.memoizedState);
    "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
    "function" === typeof e.componentDidMount && (a.flags |= 4194308);
  }
  function Ji(a, b) {
    try {
      var c = "", d = b;
      do
        c += Pa(d), d = d.return;
      while (d);
      var e = c;
    } catch (f) {
      e = "\nError generating stack: " + f.message + "\n" + f.stack;
    }
    return { value: a, source: b, stack: e, digest: null };
  }
  function Ki(a, b, c) {
    return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
  }
  function Li(a, b) {
    try {
      console.error(b.value);
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  var Mi = "function" === typeof WeakMap ? WeakMap : Map;
  function Ni(a, b, c) {
    c = mh(-1, c);
    c.tag = 3;
    c.payload = { element: null };
    var d = b.value;
    c.callback = function() {
      Oi || (Oi = true, Pi = d);
      Li(a, b);
    };
    return c;
  }
  function Qi(a, b, c) {
    c = mh(-1, c);
    c.tag = 3;
    var d = a.type.getDerivedStateFromError;
    if ("function" === typeof d) {
      var e = b.value;
      c.payload = function() {
        return d(e);
      };
      c.callback = function() {
        Li(a, b);
      };
    }
    var f = a.stateNode;
    null !== f && "function" === typeof f.componentDidCatch && (c.callback = function() {
      Li(a, b);
      "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
      var c2 = b.stack;
      this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
    });
    return c;
  }
  function Si(a, b, c) {
    var d = a.pingCache;
    if (null === d) {
      d = a.pingCache = new Mi();
      var e = /* @__PURE__ */ new Set();
      d.set(b, e);
    } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
    e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
  }
  function Ui(a) {
    do {
      var b;
      if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
      if (b) return a;
      a = a.return;
    } while (null !== a);
    return null;
  }
  function Vi(a, b, c, d, e) {
    if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
    a.flags |= 65536;
    a.lanes = e;
    return a;
  }
  var Wi = ua.ReactCurrentOwner, dh = false;
  function Xi(a, b, c, d) {
    b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
  }
  function Yi(a, b, c, d, e) {
    c = c.render;
    var f = b.ref;
    ch(b, e);
    d = Nh(a, b, c, d, f, e);
    c = Sh();
    if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
    I && c && vg(b);
    b.flags |= 1;
    Xi(a, b, d, e);
    return b.child;
  }
  function $i(a, b, c, d, e) {
    if (null === a) {
      var f = c.type;
      if ("function" === typeof f && !aj(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f, bj(a, b, f, d, e);
      a = Rg(c.type, null, d, b, b.mode, e);
      a.ref = b.ref;
      a.return = b;
      return b.child = a;
    }
    f = a.child;
    if (0 === (a.lanes & e)) {
      var g = f.memoizedProps;
      c = c.compare;
      c = null !== c ? c : Ie;
      if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
    }
    b.flags |= 1;
    a = Pg(f, d);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  function bj(a, b, c, d, e) {
    if (null !== a) {
      var f = a.memoizedProps;
      if (Ie(f, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
      else return b.lanes = a.lanes, Zi(a, b, e);
    }
    return cj(a, b, c, d, e);
  }
  function dj(a, b, c) {
    var d = b.pendingProps, e = d.children, f = null !== a ? a.memoizedState : null;
    if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
    else {
      if (0 === (c & 1073741824)) return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
      b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
      d = null !== f ? f.baseLanes : c;
      G(ej, fj);
      fj |= d;
    }
    else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
    Xi(a, b, e, c);
    return b.child;
  }
  function gj(a, b) {
    var c = b.ref;
    if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
  }
  function cj(a, b, c, d, e) {
    var f = Zf(c) ? Xf : H.current;
    f = Yf(b, f);
    ch(b, e);
    c = Nh(a, b, c, d, f, e);
    d = Sh();
    if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
    I && d && vg(b);
    b.flags |= 1;
    Xi(a, b, c, e);
    return b.child;
  }
  function hj(a, b, c, d, e) {
    if (Zf(c)) {
      var f = true;
      cg(b);
    } else f = false;
    ch(b, e);
    if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
    else if (null === a) {
      var g = b.stateNode, h = b.memoizedProps;
      g.props = h;
      var k = g.context, l = c.contextType;
      "object" === typeof l && null !== l ? l = eh(l) : (l = Zf(c) ? Xf : H.current, l = Yf(b, l));
      var m = c.getDerivedStateFromProps, q = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
      q || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Hi(b, g, d, l);
      jh = false;
      var r = b.memoizedState;
      g.state = r;
      qh(b, d, g, e);
      k = b.memoizedState;
      h !== d || r !== k || Wf.current || jh ? ("function" === typeof m && (Di(b, c, m, d), k = b.memoizedState), (h = jh || Fi(b, c, h, d, r, k, l)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
    } else {
      g = b.stateNode;
      lh(a, b);
      h = b.memoizedProps;
      l = b.type === b.elementType ? h : Ci(b.type, h);
      g.props = l;
      q = b.pendingProps;
      r = g.context;
      k = c.contextType;
      "object" === typeof k && null !== k ? k = eh(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
      var y = c.getDerivedStateFromProps;
      (m = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q || r !== k) && Hi(b, g, d, k);
      jh = false;
      r = b.memoizedState;
      g.state = r;
      qh(b, d, g, e);
      var n = b.memoizedState;
      h !== q || r !== n || Wf.current || jh ? ("function" === typeof y && (Di(b, c, y, d), n = b.memoizedState), (l = jh || Fi(b, c, l, d, r, n, k) || false) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n), g.props = d, g.state = n, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), d = false);
    }
    return jj(a, b, c, d, f, e);
  }
  function jj(a, b, c, d, e, f) {
    gj(a, b);
    var g = 0 !== (b.flags & 128);
    if (!d && !g) return e && dg(b, c, false), Zi(a, b, f);
    d = b.stateNode;
    Wi.current = b;
    var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
    b.flags |= 1;
    null !== a && g ? (b.child = Ug(b, a.child, null, f), b.child = Ug(b, null, h, f)) : Xi(a, b, h, f);
    b.memoizedState = d.state;
    e && dg(b, c, true);
    return b.child;
  }
  function kj(a) {
    var b = a.stateNode;
    b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
    yh(a, b.containerInfo);
  }
  function lj(a, b, c, d, e) {
    Ig();
    Jg(e);
    b.flags |= 256;
    Xi(a, b, c, d);
    return b.child;
  }
  var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
  function nj(a) {
    return { baseLanes: a, cachePool: null, transitions: null };
  }
  function oj(a, b, c) {
    var d = b.pendingProps, e = L.current, f = false, g = 0 !== (b.flags & 128), h;
    (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
    if (h) f = true, b.flags &= -129;
    else if (null === a || null !== a.memoizedState) e |= 1;
    G(L, e & 1);
    if (null === a) {
      Eg(b);
      a = b.memoizedState;
      if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
      g = d.children;
      a = d.fallback;
      return f ? (d = b.mode, f = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = pj(g, d, 0, null), a = Tg(a, d, c, null), f.return = b, a.return = b, f.sibling = a, b.child = f, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
    }
    e = a.memoizedState;
    if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
    if (f) {
      f = d.fallback;
      g = b.mode;
      e = a.child;
      h = e.sibling;
      var k = { mode: "hidden", children: d.children };
      0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = Pg(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
      null !== h ? f = Pg(h, f) : (f = Tg(f, g, c, null), f.flags |= 2);
      f.return = b;
      d.return = b;
      d.sibling = f;
      b.child = d;
      d = f;
      f = b.child;
      g = a.child.memoizedState;
      g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
      f.memoizedState = g;
      f.childLanes = a.childLanes & ~c;
      b.memoizedState = mj;
      return d;
    }
    f = a.child;
    a = f.sibling;
    d = Pg(f, { mode: "visible", children: d.children });
    0 === (b.mode & 1) && (d.lanes = c);
    d.return = b;
    d.sibling = null;
    null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
    b.child = d;
    b.memoizedState = null;
    return d;
  }
  function qj(a, b) {
    b = pj({ mode: "visible", children: b }, a.mode, 0, null);
    b.return = a;
    return a.child = b;
  }
  function sj(a, b, c, d) {
    null !== d && Jg(d);
    Ug(b, a.child, null, c);
    a = qj(b, b.pendingProps.children);
    a.flags |= 2;
    b.memoizedState = null;
    return a;
  }
  function rj(a, b, c, d, e, f, g) {
    if (c) {
      if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
      if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
      f = d.fallback;
      e = b.mode;
      d = pj({ mode: "visible", children: d.children }, e, 0, null);
      f = Tg(f, e, g, null);
      f.flags |= 2;
      d.return = b;
      f.return = b;
      d.sibling = f;
      b.child = d;
      0 !== (b.mode & 1) && Ug(b, a.child, null, g);
      b.child.memoizedState = nj(g);
      b.memoizedState = mj;
      return f;
    }
    if (0 === (b.mode & 1)) return sj(a, b, g, null);
    if ("$!" === e.data) {
      d = e.nextSibling && e.nextSibling.dataset;
      if (d) var h = d.dgst;
      d = h;
      f = Error(p(419));
      d = Ki(f, d, void 0);
      return sj(a, b, g, d);
    }
    h = 0 !== (g & a.childLanes);
    if (dh || h) {
      d = Q;
      if (null !== d) {
        switch (g & -g) {
          case 4:
            e = 2;
            break;
          case 16:
            e = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            e = 32;
            break;
          case 536870912:
            e = 268435456;
            break;
          default:
            e = 0;
        }
        e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
        0 !== e && e !== f.retryLane && (f.retryLane = e, ih(a, e), gi(d, a, e, -1));
      }
      tj();
      d = Ki(Error(p(421)));
      return sj(a, b, g, d);
    }
    if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
    a = f.treeContext;
    yg = Lf(e.nextSibling);
    xg = b;
    I = true;
    zg = null;
    null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
    b = qj(b, d.children);
    b.flags |= 4096;
    return b;
  }
  function vj(a, b, c) {
    a.lanes |= b;
    var d = a.alternate;
    null !== d && (d.lanes |= b);
    bh(a.return, b, c);
  }
  function wj(a, b, c, d, e) {
    var f = a.memoizedState;
    null === f ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);
  }
  function xj(a, b, c) {
    var d = b.pendingProps, e = d.revealOrder, f = d.tail;
    Xi(a, b, d.children, c);
    d = L.current;
    if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
    else {
      if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
        if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
        else if (19 === a.tag) vj(a, c, b);
        else if (null !== a.child) {
          a.child.return = a;
          a = a.child;
          continue;
        }
        if (a === b) break a;
        for (; null === a.sibling; ) {
          if (null === a.return || a.return === b) break a;
          a = a.return;
        }
        a.sibling.return = a.return;
        a = a.sibling;
      }
      d &= 1;
    }
    G(L, d);
    if (0 === (b.mode & 1)) b.memoizedState = null;
    else switch (e) {
      case "forwards":
        c = b.child;
        for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
        c = e;
        null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
        wj(b, false, e, c, f);
        break;
      case "backwards":
        c = null;
        e = b.child;
        for (b.child = null; null !== e; ) {
          a = e.alternate;
          if (null !== a && null === Ch(a)) {
            b.child = e;
            break;
          }
          a = e.sibling;
          e.sibling = c;
          c = e;
          e = a;
        }
        wj(b, true, c, null, f);
        break;
      case "together":
        wj(b, false, null, null, void 0);
        break;
      default:
        b.memoizedState = null;
    }
    return b.child;
  }
  function ij(a, b) {
    0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
  }
  function Zi(a, b, c) {
    null !== a && (b.dependencies = a.dependencies);
    rh |= b.lanes;
    if (0 === (c & b.childLanes)) return null;
    if (null !== a && b.child !== a.child) throw Error(p(153));
    if (null !== b.child) {
      a = b.child;
      c = Pg(a, a.pendingProps);
      b.child = c;
      for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
      c.sibling = null;
    }
    return b.child;
  }
  function yj(a, b, c) {
    switch (b.tag) {
      case 3:
        kj(b);
        Ig();
        break;
      case 5:
        Ah(b);
        break;
      case 1:
        Zf(b.type) && cg(b);
        break;
      case 4:
        yh(b, b.stateNode.containerInfo);
        break;
      case 10:
        var d = b.type._context, e = b.memoizedProps.value;
        G(Wg, d._currentValue);
        d._currentValue = e;
        break;
      case 13:
        d = b.memoizedState;
        if (null !== d) {
          if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
          if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
          G(L, L.current & 1);
          a = Zi(a, b, c);
          return null !== a ? a.sibling : null;
        }
        G(L, L.current & 1);
        break;
      case 19:
        d = 0 !== (c & b.childLanes);
        if (0 !== (a.flags & 128)) {
          if (d) return xj(a, b, c);
          b.flags |= 128;
        }
        e = b.memoizedState;
        null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
        G(L, L.current);
        if (d) break;
        else return null;
      case 22:
      case 23:
        return b.lanes = 0, dj(a, b, c);
    }
    return Zi(a, b, c);
  }
  var zj, Aj, Bj, Cj;
  zj = function(a, b) {
    for (var c = b.child; null !== c; ) {
      if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
      else if (4 !== c.tag && null !== c.child) {
        c.child.return = c;
        c = c.child;
        continue;
      }
      if (c === b) break;
      for (; null === c.sibling; ) {
        if (null === c.return || c.return === b) return;
        c = c.return;
      }
      c.sibling.return = c.return;
      c = c.sibling;
    }
  };
  Aj = function() {
  };
  Bj = function(a, b, c, d) {
    var e = a.memoizedProps;
    if (e !== d) {
      a = b.stateNode;
      xh(uh.current);
      var f = null;
      switch (c) {
        case "input":
          e = Ya(a, e);
          d = Ya(a, d);
          f = [];
          break;
        case "select":
          e = A({}, e, { value: void 0 });
          d = A({}, d, { value: void 0 });
          f = [];
          break;
        case "textarea":
          e = gb(a, e);
          d = gb(a, d);
          f = [];
          break;
        default:
          "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
      }
      ub(c, d);
      var g;
      c = null;
      for (l in e) if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l]) if ("style" === l) {
        var h = e[l];
        for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
      } else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
      for (l in d) {
        var k = d[l];
        h = null != e ? e[l] : void 0;
        if (d.hasOwnProperty(l) && k !== h && (null != k || null != h)) if ("style" === l) if (h) {
          for (g in h) !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
          for (g in k) k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
        } else c || (f || (f = []), f.push(
          l,
          c
        )), c = k;
        else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D("scroll", a), f || h === k || (f = [])) : (f = f || []).push(l, k));
      }
      c && (f = f || []).push("style", c);
      var l = f;
      if (b.updateQueue = l) b.flags |= 4;
    }
  };
  Cj = function(a, b, c, d) {
    c !== d && (b.flags |= 4);
  };
  function Dj(a, b) {
    if (!I) switch (a.tailMode) {
      case "hidden":
        b = a.tail;
        for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
        null === c ? a.tail = null : c.sibling = null;
        break;
      case "collapsed":
        c = a.tail;
        for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
        null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
    }
  }
  function S(a) {
    var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
    if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
    else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
    a.subtreeFlags |= d;
    a.childLanes = c;
    return b;
  }
  function Ej(a, b, c) {
    var d = b.pendingProps;
    wg(b);
    switch (b.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return S(b), null;
      case 1:
        return Zf(b.type) && $f(), S(b), null;
      case 3:
        d = b.stateNode;
        zh();
        E(Wf);
        E(H);
        Eh();
        d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
        if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
        Aj(a, b);
        S(b);
        return null;
      case 5:
        Bh(b);
        var e = xh(wh.current);
        c = b.type;
        if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
        else {
          if (!d) {
            if (null === b.stateNode) throw Error(p(166));
            S(b);
            return null;
          }
          a = xh(uh.current);
          if (Gg(b)) {
            d = b.stateNode;
            c = b.type;
            var f = b.memoizedProps;
            d[Of] = b;
            d[Pf] = f;
            a = 0 !== (b.mode & 1);
            switch (c) {
              case "dialog":
                D("cancel", d);
                D("close", d);
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", d);
                break;
              case "video":
              case "audio":
                for (e = 0; e < lf.length; e++) D(lf[e], d);
                break;
              case "source":
                D("error", d);
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  d
                );
                D("load", d);
                break;
              case "details":
                D("toggle", d);
                break;
              case "input":
                Za(d, f);
                D("invalid", d);
                break;
              case "select":
                d._wrapperState = { wasMultiple: !!f.multiple };
                D("invalid", d);
                break;
              case "textarea":
                hb(d, f), D("invalid", d);
            }
            ub(c, f);
            e = null;
            for (var g in f) if (f.hasOwnProperty(g)) {
              var h = f[g];
              "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f.suppressHydrationWarning && Af(
                d.textContent,
                h,
                a
              ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
            }
            switch (c) {
              case "input":
                Va(d);
                db(d, f, true);
                break;
              case "textarea":
                Va(d);
                jb(d);
                break;
              case "select":
              case "option":
                break;
              default:
                "function" === typeof f.onClick && (d.onclick = Bf);
            }
            d = e;
            b.updateQueue = d;
            null !== d && (b.flags |= 4);
          } else {
            g = 9 === e.nodeType ? e : e.ownerDocument;
            "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
            "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
            a[Of] = b;
            a[Pf] = d;
            zj(a, b, false, false);
            b.stateNode = a;
            a: {
              g = vb(c, d);
              switch (c) {
                case "dialog":
                  D("cancel", a);
                  D("close", a);
                  e = d;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  D("load", a);
                  e = d;
                  break;
                case "video":
                case "audio":
                  for (e = 0; e < lf.length; e++) D(lf[e], a);
                  e = d;
                  break;
                case "source":
                  D("error", a);
                  e = d;
                  break;
                case "img":
                case "image":
                case "link":
                  D(
                    "error",
                    a
                  );
                  D("load", a);
                  e = d;
                  break;
                case "details":
                  D("toggle", a);
                  e = d;
                  break;
                case "input":
                  Za(a, d);
                  e = Ya(a, d);
                  D("invalid", a);
                  break;
                case "option":
                  e = d;
                  break;
                case "select":
                  a._wrapperState = { wasMultiple: !!d.multiple };
                  e = A({}, d, { value: void 0 });
                  D("invalid", a);
                  break;
                case "textarea":
                  hb(a, d);
                  e = gb(a, d);
                  D("invalid", a);
                  break;
                default:
                  e = d;
              }
              ub(c, e);
              h = e;
              for (f in h) if (h.hasOwnProperty(f)) {
                var k = h[f];
                "style" === f ? sb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && nb(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && ob(a, k) : "number" === typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ea.hasOwnProperty(f) ? null != k && "onScroll" === f && D("scroll", a) : null != k && ta(a, f, k, g));
              }
              switch (c) {
                case "input":
                  Va(a);
                  db(a, d, false);
                  break;
                case "textarea":
                  Va(a);
                  jb(a);
                  break;
                case "option":
                  null != d.value && a.setAttribute("value", "" + Sa(d.value));
                  break;
                case "select":
                  a.multiple = !!d.multiple;
                  f = d.value;
                  null != f ? fb(a, !!d.multiple, f, false) : null != d.defaultValue && fb(
                    a,
                    !!d.multiple,
                    d.defaultValue,
                    true
                  );
                  break;
                default:
                  "function" === typeof e.onClick && (a.onclick = Bf);
              }
              switch (c) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  d = !!d.autoFocus;
                  break a;
                case "img":
                  d = true;
                  break a;
                default:
                  d = false;
              }
            }
            d && (b.flags |= 4);
          }
          null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
        }
        S(b);
        return null;
      case 6:
        if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
        else {
          if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
          c = xh(wh.current);
          xh(uh.current);
          if (Gg(b)) {
            d = b.stateNode;
            c = b.memoizedProps;
            d[Of] = b;
            if (f = d.nodeValue !== c) {
              if (a = xg, null !== a) switch (a.tag) {
                case 3:
                  Af(d.nodeValue, c, 0 !== (a.mode & 1));
                  break;
                case 5:
                  true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
              }
            }
            f && (b.flags |= 4);
          } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
        }
        S(b);
        return null;
      case 13:
        E(L);
        d = b.memoizedState;
        if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
          if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f = false;
          else if (f = Gg(b), null !== d && null !== d.dehydrated) {
            if (null === a) {
              if (!f) throw Error(p(318));
              f = b.memoizedState;
              f = null !== f ? f.dehydrated : null;
              if (!f) throw Error(p(317));
              f[Of] = b;
            } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
            S(b);
            f = false;
          } else null !== zg && (Fj(zg), zg = null), f = true;
          if (!f) return b.flags & 65536 ? b : null;
        }
        if (0 !== (b.flags & 128)) return b.lanes = c, b;
        d = null !== d;
        d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
        null !== b.updateQueue && (b.flags |= 4);
        S(b);
        return null;
      case 4:
        return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
      case 10:
        return ah(b.type._context), S(b), null;
      case 17:
        return Zf(b.type) && $f(), S(b), null;
      case 19:
        E(L);
        f = b.memoizedState;
        if (null === f) return S(b), null;
        d = 0 !== (b.flags & 128);
        g = f.rendering;
        if (null === g) if (d) Dj(f, false);
        else {
          if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
            g = Ch(a);
            if (null !== g) {
              b.flags |= 128;
              Dj(f, false);
              d = g.updateQueue;
              null !== d && (b.updateQueue = d, b.flags |= 4);
              b.subtreeFlags = 0;
              d = c;
              for (c = b.child; null !== c; ) f = c, a = d, f.flags &= 14680066, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
              G(L, L.current & 1 | 2);
              return b.child;
            }
            a = a.sibling;
          }
          null !== f.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
        }
        else {
          if (!d) if (a = Ch(g), null !== a) {
            if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f, true), null === f.tail && "hidden" === f.tailMode && !g.alternate && !I) return S(b), null;
          } else 2 * B() - f.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
          f.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f.last, null !== c ? c.sibling = g : b.child = g, f.last = g);
        }
        if (null !== f.tail) return b = f.tail, f.rendering = b, f.tail = b.sibling, f.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
        S(b);
        return null;
      case 22:
      case 23:
        return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(p(156, b.tag));
  }
  function Ij(a, b) {
    wg(b);
    switch (b.tag) {
      case 1:
        return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
      case 3:
        return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
      case 5:
        return Bh(b), null;
      case 13:
        E(L);
        a = b.memoizedState;
        if (null !== a && null !== a.dehydrated) {
          if (null === b.alternate) throw Error(p(340));
          Ig();
        }
        a = b.flags;
        return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
      case 19:
        return E(L), null;
      case 4:
        return zh(), null;
      case 10:
        return ah(b.type._context), null;
      case 22:
      case 23:
        return Hj(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Jj = false, U = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
  function Lj(a, b) {
    var c = a.ref;
    if (null !== c) if ("function" === typeof c) try {
      c(null);
    } catch (d) {
      W(a, b, d);
    }
    else c.current = null;
  }
  function Mj(a, b, c) {
    try {
      c();
    } catch (d) {
      W(a, b, d);
    }
  }
  var Nj = false;
  function Oj(a, b) {
    Cf = dd;
    a = Me();
    if (Ne(a)) {
      if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
      else a: {
        c = (c = a.ownerDocument) && c.defaultView || window;
        var d = c.getSelection && c.getSelection();
        if (d && 0 !== d.rangeCount) {
          c = d.anchorNode;
          var e = d.anchorOffset, f = d.focusNode;
          d = d.focusOffset;
          try {
            c.nodeType, f.nodeType;
          } catch (F) {
            c = null;
            break a;
          }
          var g = 0, h = -1, k = -1, l = 0, m = 0, q = a, r = null;
          b: for (; ; ) {
            for (var y; ; ) {
              q !== c || 0 !== e && 3 !== q.nodeType || (h = g + e);
              q !== f || 0 !== d && 3 !== q.nodeType || (k = g + d);
              3 === q.nodeType && (g += q.nodeValue.length);
              if (null === (y = q.firstChild)) break;
              r = q;
              q = y;
            }
            for (; ; ) {
              if (q === a) break b;
              r === c && ++l === e && (h = g);
              r === f && ++m === d && (k = g);
              if (null !== (y = q.nextSibling)) break;
              q = r;
              r = q.parentNode;
            }
            q = y;
          }
          c = -1 === h || -1 === k ? null : { start: h, end: k };
        } else c = null;
      }
      c = c || { start: 0, end: 0 };
    } else c = null;
    Df = { focusedElem: a, selectionRange: c };
    dd = false;
    for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
    else for (; null !== V; ) {
      b = V;
      try {
        var n = b.alternate;
        if (0 !== (b.flags & 1024)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (null !== n) {
              var t = n.memoizedProps, J = n.memoizedState, x = b.stateNode, w = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t : Ci(b.type, t), J);
              x.__reactInternalSnapshotBeforeUpdate = w;
            }
            break;
          case 3:
            var u = b.stateNode.containerInfo;
            1 === u.nodeType ? u.textContent = "" : 9 === u.nodeType && u.documentElement && u.removeChild(u.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(p(163));
        }
      } catch (F) {
        W(b, b.return, F);
      }
      a = b.sibling;
      if (null !== a) {
        a.return = b.return;
        V = a;
        break;
      }
      V = b.return;
    }
    n = Nj;
    Nj = false;
    return n;
  }
  function Pj(a, b, c) {
    var d = b.updateQueue;
    d = null !== d ? d.lastEffect : null;
    if (null !== d) {
      var e = d = d.next;
      do {
        if ((e.tag & a) === a) {
          var f = e.destroy;
          e.destroy = void 0;
          void 0 !== f && Mj(b, c, f);
        }
        e = e.next;
      } while (e !== d);
    }
  }
  function Qj(a, b) {
    b = b.updateQueue;
    b = null !== b ? b.lastEffect : null;
    if (null !== b) {
      var c = b = b.next;
      do {
        if ((c.tag & a) === a) {
          var d = c.create;
          c.destroy = d();
        }
        c = c.next;
      } while (c !== b);
    }
  }
  function Rj(a) {
    var b = a.ref;
    if (null !== b) {
      var c = a.stateNode;
      switch (a.tag) {
        case 5:
          a = c;
          break;
        default:
          a = c;
      }
      "function" === typeof b ? b(a) : b.current = a;
    }
  }
  function Sj(a) {
    var b = a.alternate;
    null !== b && (a.alternate = null, Sj(b));
    a.child = null;
    a.deletions = null;
    a.sibling = null;
    5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
    a.stateNode = null;
    a.return = null;
    a.dependencies = null;
    a.memoizedProps = null;
    a.memoizedState = null;
    a.pendingProps = null;
    a.stateNode = null;
    a.updateQueue = null;
  }
  function Tj(a) {
    return 5 === a.tag || 3 === a.tag || 4 === a.tag;
  }
  function Uj(a) {
    a: for (; ; ) {
      for (; null === a.sibling; ) {
        if (null === a.return || Tj(a.return)) return null;
        a = a.return;
      }
      a.sibling.return = a.return;
      for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
        if (a.flags & 2) continue a;
        if (null === a.child || 4 === a.tag) continue a;
        else a.child.return = a, a = a.child;
      }
      if (!(a.flags & 2)) return a.stateNode;
    }
  }
  function Vj(a, b, c) {
    var d = a.tag;
    if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
    else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
  }
  function Wj(a, b, c) {
    var d = a.tag;
    if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
    else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
  }
  var X = null, Xj = false;
  function Yj(a, b, c) {
    for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
  }
  function Zj(a, b, c) {
    if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
      lc.onCommitFiberUnmount(kc, c);
    } catch (h) {
    }
    switch (c.tag) {
      case 5:
        U || Lj(c, b);
      case 6:
        var d = X, e = Xj;
        X = null;
        Yj(a, b, c);
        X = d;
        Xj = e;
        null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
        break;
      case 18:
        null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
        break;
      case 4:
        d = X;
        e = Xj;
        X = c.stateNode.containerInfo;
        Xj = true;
        Yj(a, b, c);
        X = d;
        Xj = e;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
          e = d = d.next;
          do {
            var f = e, g = f.destroy;
            f = f.tag;
            void 0 !== g && (0 !== (f & 2) ? Mj(c, b, g) : 0 !== (f & 4) && Mj(c, b, g));
            e = e.next;
          } while (e !== d);
        }
        Yj(a, b, c);
        break;
      case 1:
        if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
          d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
        } catch (h) {
          W(c, b, h);
        }
        Yj(a, b, c);
        break;
      case 21:
        Yj(a, b, c);
        break;
      case 22:
        c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
        break;
      default:
        Yj(a, b, c);
    }
  }
  function ak(a) {
    var b = a.updateQueue;
    if (null !== b) {
      a.updateQueue = null;
      var c = a.stateNode;
      null === c && (c = a.stateNode = new Kj());
      b.forEach(function(b2) {
        var d = bk.bind(null, a, b2);
        c.has(b2) || (c.add(b2), b2.then(d, d));
      });
    }
  }
  function ck(a, b) {
    var c = b.deletions;
    if (null !== c) for (var d = 0; d < c.length; d++) {
      var e = c[d];
      try {
        var f = a, g = b, h = g;
        a: for (; null !== h; ) {
          switch (h.tag) {
            case 5:
              X = h.stateNode;
              Xj = false;
              break a;
            case 3:
              X = h.stateNode.containerInfo;
              Xj = true;
              break a;
            case 4:
              X = h.stateNode.containerInfo;
              Xj = true;
              break a;
          }
          h = h.return;
        }
        if (null === X) throw Error(p(160));
        Zj(f, g, e);
        X = null;
        Xj = false;
        var k = e.alternate;
        null !== k && (k.return = null);
        e.return = null;
      } catch (l) {
        W(e, b, l);
      }
    }
    if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
  }
  function dk(a, b) {
    var c = a.alternate, d = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ck(b, a);
        ek(a);
        if (d & 4) {
          try {
            Pj(3, a, a.return), Qj(3, a);
          } catch (t) {
            W(a, a.return, t);
          }
          try {
            Pj(5, a, a.return);
          } catch (t) {
            W(a, a.return, t);
          }
        }
        break;
      case 1:
        ck(b, a);
        ek(a);
        d & 512 && null !== c && Lj(c, c.return);
        break;
      case 5:
        ck(b, a);
        ek(a);
        d & 512 && null !== c && Lj(c, c.return);
        if (a.flags & 32) {
          var e = a.stateNode;
          try {
            ob(e, "");
          } catch (t) {
            W(a, a.return, t);
          }
        }
        if (d & 4 && (e = a.stateNode, null != e)) {
          var f = a.memoizedProps, g = null !== c ? c.memoizedProps : f, h = a.type, k = a.updateQueue;
          a.updateQueue = null;
          if (null !== k) try {
            "input" === h && "radio" === f.type && null != f.name && ab(e, f);
            vb(h, g);
            var l = vb(h, f);
            for (g = 0; g < k.length; g += 2) {
              var m = k[g], q = k[g + 1];
              "style" === m ? sb(e, q) : "dangerouslySetInnerHTML" === m ? nb(e, q) : "children" === m ? ob(e, q) : ta(e, m, q, l);
            }
            switch (h) {
              case "input":
                bb(e, f);
                break;
              case "textarea":
                ib(e, f);
                break;
              case "select":
                var r = e._wrapperState.wasMultiple;
                e._wrapperState.wasMultiple = !!f.multiple;
                var y = f.value;
                null != y ? fb(e, !!f.multiple, y, false) : r !== !!f.multiple && (null != f.defaultValue ? fb(
                  e,
                  !!f.multiple,
                  f.defaultValue,
                  true
                ) : fb(e, !!f.multiple, f.multiple ? [] : "", false));
            }
            e[Pf] = f;
          } catch (t) {
            W(a, a.return, t);
          }
        }
        break;
      case 6:
        ck(b, a);
        ek(a);
        if (d & 4) {
          if (null === a.stateNode) throw Error(p(162));
          e = a.stateNode;
          f = a.memoizedProps;
          try {
            e.nodeValue = f;
          } catch (t) {
            W(a, a.return, t);
          }
        }
        break;
      case 3:
        ck(b, a);
        ek(a);
        if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
          bd(b.containerInfo);
        } catch (t) {
          W(a, a.return, t);
        }
        break;
      case 4:
        ck(b, a);
        ek(a);
        break;
      case 13:
        ck(b, a);
        ek(a);
        e = a.child;
        e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
        d & 4 && ak(a);
        break;
      case 22:
        m = null !== c && null !== c.memoizedState;
        a.mode & 1 ? (U = (l = U) || m, ck(b, a), U = l) : ck(b, a);
        ek(a);
        if (d & 8192) {
          l = null !== a.memoizedState;
          if ((a.stateNode.isHidden = l) && !m && 0 !== (a.mode & 1)) for (V = a, m = a.child; null !== m; ) {
            for (q = V = m; null !== V; ) {
              r = V;
              y = r.child;
              switch (r.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Pj(4, r, r.return);
                  break;
                case 1:
                  Lj(r, r.return);
                  var n = r.stateNode;
                  if ("function" === typeof n.componentWillUnmount) {
                    d = r;
                    c = r.return;
                    try {
                      b = d, n.props = b.memoizedProps, n.state = b.memoizedState, n.componentWillUnmount();
                    } catch (t) {
                      W(d, c, t);
                    }
                  }
                  break;
                case 5:
                  Lj(r, r.return);
                  break;
                case 22:
                  if (null !== r.memoizedState) {
                    gk(q);
                    continue;
                  }
              }
              null !== y ? (y.return = r, V = y) : gk(q);
            }
            m = m.sibling;
          }
          a: for (m = null, q = a; ; ) {
            if (5 === q.tag) {
              if (null === m) {
                m = q;
                try {
                  e = q.stateNode, l ? (f = e.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
                } catch (t) {
                  W(a, a.return, t);
                }
              }
            } else if (6 === q.tag) {
              if (null === m) try {
                q.stateNode.nodeValue = l ? "" : q.memoizedProps;
              } catch (t) {
                W(a, a.return, t);
              }
            } else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a) && null !== q.child) {
              q.child.return = q;
              q = q.child;
              continue;
            }
            if (q === a) break a;
            for (; null === q.sibling; ) {
              if (null === q.return || q.return === a) break a;
              m === q && (m = null);
              q = q.return;
            }
            m === q && (m = null);
            q.sibling.return = q.return;
            q = q.sibling;
          }
        }
        break;
      case 19:
        ck(b, a);
        ek(a);
        d & 4 && ak(a);
        break;
      case 21:
        break;
      default:
        ck(
          b,
          a
        ), ek(a);
    }
  }
  function ek(a) {
    var b = a.flags;
    if (b & 2) {
      try {
        a: {
          for (var c = a.return; null !== c; ) {
            if (Tj(c)) {
              var d = c;
              break a;
            }
            c = c.return;
          }
          throw Error(p(160));
        }
        switch (d.tag) {
          case 5:
            var e = d.stateNode;
            d.flags & 32 && (ob(e, ""), d.flags &= -33);
            var f = Uj(a);
            Wj(a, f, e);
            break;
          case 3:
          case 4:
            var g = d.stateNode.containerInfo, h = Uj(a);
            Vj(a, h, g);
            break;
          default:
            throw Error(p(161));
        }
      } catch (k) {
        W(a, a.return, k);
      }
      a.flags &= -3;
    }
    b & 4096 && (a.flags &= -4097);
  }
  function hk(a, b, c) {
    V = a;
    ik(a);
  }
  function ik(a, b, c) {
    for (var d = 0 !== (a.mode & 1); null !== V; ) {
      var e = V, f = e.child;
      if (22 === e.tag && d) {
        var g = null !== e.memoizedState || Jj;
        if (!g) {
          var h = e.alternate, k = null !== h && null !== h.memoizedState || U;
          h = Jj;
          var l = U;
          Jj = g;
          if ((U = k) && !l) for (V = e; null !== V; ) g = V, k = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k ? (k.return = g, V = k) : jk(e);
          for (; null !== f; ) V = f, ik(f), f = f.sibling;
          V = e;
          Jj = h;
          U = l;
        }
        kk(a);
      } else 0 !== (e.subtreeFlags & 8772) && null !== f ? (f.return = e, V = f) : kk(a);
    }
  }
  function kk(a) {
    for (; null !== V; ) {
      var b = V;
      if (0 !== (b.flags & 8772)) {
        var c = b.alternate;
        try {
          if (0 !== (b.flags & 8772)) switch (b.tag) {
            case 0:
            case 11:
            case 15:
              U || Qj(5, b);
              break;
            case 1:
              var d = b.stateNode;
              if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
              else {
                var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
                d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
              }
              var f = b.updateQueue;
              null !== f && sh(b, f, d);
              break;
            case 3:
              var g = b.updateQueue;
              if (null !== g) {
                c = null;
                if (null !== b.child) switch (b.child.tag) {
                  case 5:
                    c = b.child.stateNode;
                    break;
                  case 1:
                    c = b.child.stateNode;
                }
                sh(b, g, c);
              }
              break;
            case 5:
              var h = b.stateNode;
              if (null === c && b.flags & 4) {
                c = h;
                var k = b.memoizedProps;
                switch (b.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    k.autoFocus && c.focus();
                    break;
                  case "img":
                    k.src && (c.src = k.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (null === b.memoizedState) {
                var l = b.alternate;
                if (null !== l) {
                  var m = l.memoizedState;
                  if (null !== m) {
                    var q = m.dehydrated;
                    null !== q && bd(q);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(p(163));
          }
          U || b.flags & 512 && Rj(b);
        } catch (r) {
          W(b, b.return, r);
        }
      }
      if (b === a) {
        V = null;
        break;
      }
      c = b.sibling;
      if (null !== c) {
        c.return = b.return;
        V = c;
        break;
      }
      V = b.return;
    }
  }
  function gk(a) {
    for (; null !== V; ) {
      var b = V;
      if (b === a) {
        V = null;
        break;
      }
      var c = b.sibling;
      if (null !== c) {
        c.return = b.return;
        V = c;
        break;
      }
      V = b.return;
    }
  }
  function jk(a) {
    for (; null !== V; ) {
      var b = V;
      try {
        switch (b.tag) {
          case 0:
          case 11:
          case 15:
            var c = b.return;
            try {
              Qj(4, b);
            } catch (k) {
              W(b, c, k);
            }
            break;
          case 1:
            var d = b.stateNode;
            if ("function" === typeof d.componentDidMount) {
              var e = b.return;
              try {
                d.componentDidMount();
              } catch (k) {
                W(b, e, k);
              }
            }
            var f = b.return;
            try {
              Rj(b);
            } catch (k) {
              W(b, f, k);
            }
            break;
          case 5:
            var g = b.return;
            try {
              Rj(b);
            } catch (k) {
              W(b, g, k);
            }
        }
      } catch (k) {
        W(b, b.return, k);
      }
      if (b === a) {
        V = null;
        break;
      }
      var h = b.sibling;
      if (null !== h) {
        h.return = b.return;
        V = h;
        break;
      }
      V = b.return;
    }
  }
  var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q = null, Y = null, Z = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
  function R() {
    return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
  }
  function yi(a) {
    if (0 === (a.mode & 1)) return 1;
    if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
    if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
    a = C;
    if (0 !== a) return a;
    a = window.event;
    a = void 0 === a ? 16 : jd(a.type);
    return a;
  }
  function gi(a, b, c, d) {
    if (50 < yk) throw yk = 0, zk = null, Error(p(185));
    Ac(a, c, d);
    if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
  }
  function Dk(a, b) {
    var c = a.callbackNode;
    wc(a, b);
    var d = uc(a, a === Q ? Z : 0);
    if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
    else if (b = d & -d, a.callbackPriority !== b) {
      null != c && bc(c);
      if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
        0 === (K & 6) && jg();
      }), c = null;
      else {
        switch (Dc(d)) {
          case 1:
            c = fc;
            break;
          case 4:
            c = gc;
            break;
          case 16:
            c = hc;
            break;
          case 536870912:
            c = jc;
            break;
          default:
            c = hc;
        }
        c = Fk(c, Gk.bind(null, a));
      }
      a.callbackPriority = b;
      a.callbackNode = c;
    }
  }
  function Gk(a, b) {
    Ak = -1;
    Bk = 0;
    if (0 !== (K & 6)) throw Error(p(327));
    var c = a.callbackNode;
    if (Hk() && a.callbackNode !== c) return null;
    var d = uc(a, a === Q ? Z : 0);
    if (0 === d) return null;
    if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
    else {
      b = d;
      var e = K;
      K |= 2;
      var f = Jk();
      if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
      do
        try {
          Lk();
          break;
        } catch (h) {
          Mk(a, h);
        }
      while (1);
      $g();
      mk.current = f;
      K = e;
      null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
    }
    if (0 !== b) {
      2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
      if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
      if (6 === b) Ck(a, d);
      else {
        e = a.current.alternate;
        if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f = xc(a), 0 !== f && (d = f, b = Nk(a, f))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
        a.finishedWork = e;
        a.finishedLanes = d;
        switch (b) {
          case 0:
          case 1:
            throw Error(p(345));
          case 2:
            Pk(a, tk, uk);
            break;
          case 3:
            Ck(a, d);
            if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
              if (0 !== uc(a, 0)) break;
              e = a.suspendedLanes;
              if ((e & d) !== d) {
                R();
                a.pingedLanes |= a.suspendedLanes & e;
                break;
              }
              a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
              break;
            }
            Pk(a, tk, uk);
            break;
          case 4:
            Ck(a, d);
            if ((d & 4194240) === d) break;
            b = a.eventTimes;
            for (e = -1; 0 < d; ) {
              var g = 31 - oc(d);
              f = 1 << g;
              g = b[g];
              g > e && (e = g);
              d &= ~f;
            }
            d = e;
            d = B() - d;
            d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
            if (10 < d) {
              a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
              break;
            }
            Pk(a, tk, uk);
            break;
          case 5:
            Pk(a, tk, uk);
            break;
          default:
            throw Error(p(329));
        }
      }
    }
    Dk(a, B());
    return a.callbackNode === c ? Gk.bind(null, a) : null;
  }
  function Nk(a, b) {
    var c = sk;
    a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
    a = Ik(a, b);
    2 !== a && (b = tk, tk = c, null !== b && Fj(b));
    return a;
  }
  function Fj(a) {
    null === tk ? tk = a : tk.push.apply(tk, a);
  }
  function Ok(a) {
    for (var b = a; ; ) {
      if (b.flags & 16384) {
        var c = b.updateQueue;
        if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
          var e = c[d], f = e.getSnapshot;
          e = e.value;
          try {
            if (!He(f(), e)) return false;
          } catch (g) {
            return false;
          }
        }
      }
      c = b.child;
      if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
      else {
        if (b === a) break;
        for (; null === b.sibling; ) {
          if (null === b.return || b.return === a) return true;
          b = b.return;
        }
        b.sibling.return = b.return;
        b = b.sibling;
      }
    }
    return true;
  }
  function Ck(a, b) {
    b &= ~rk;
    b &= ~qk;
    a.suspendedLanes |= b;
    a.pingedLanes &= ~b;
    for (a = a.expirationTimes; 0 < b; ) {
      var c = 31 - oc(b), d = 1 << c;
      a[c] = -1;
      b &= ~d;
    }
  }
  function Ek(a) {
    if (0 !== (K & 6)) throw Error(p(327));
    Hk();
    var b = uc(a, 0);
    if (0 === (b & 1)) return Dk(a, B()), null;
    var c = Ik(a, b);
    if (0 !== a.tag && 2 === c) {
      var d = xc(a);
      0 !== d && (b = d, c = Nk(a, d));
    }
    if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
    if (6 === c) throw Error(p(345));
    a.finishedWork = a.current.alternate;
    a.finishedLanes = b;
    Pk(a, tk, uk);
    Dk(a, B());
    return null;
  }
  function Qk(a, b) {
    var c = K;
    K |= 1;
    try {
      return a(b);
    } finally {
      K = c, 0 === K && (Gj = B() + 500, fg && jg());
    }
  }
  function Rk(a) {
    null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
    var b = K;
    K |= 1;
    var c = ok.transition, d = C;
    try {
      if (ok.transition = null, C = 1, a) return a();
    } finally {
      C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
    }
  }
  function Hj() {
    fj = ej.current;
    E(ej);
  }
  function Kk(a, b) {
    a.finishedWork = null;
    a.finishedLanes = 0;
    var c = a.timeoutHandle;
    -1 !== c && (a.timeoutHandle = -1, Gf(c));
    if (null !== Y) for (c = Y.return; null !== c; ) {
      var d = c;
      wg(d);
      switch (d.tag) {
        case 1:
          d = d.type.childContextTypes;
          null !== d && void 0 !== d && $f();
          break;
        case 3:
          zh();
          E(Wf);
          E(H);
          Eh();
          break;
        case 5:
          Bh(d);
          break;
        case 4:
          zh();
          break;
        case 13:
          E(L);
          break;
        case 19:
          E(L);
          break;
        case 10:
          ah(d.type._context);
          break;
        case 22:
        case 23:
          Hj();
      }
      c = c.return;
    }
    Q = a;
    Y = a = Pg(a.current, null);
    Z = fj = b;
    T = 0;
    pk = null;
    rk = qk = rh = 0;
    tk = sk = null;
    if (null !== fh) {
      for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
        c.interleaved = null;
        var e = d.next, f = c.pending;
        if (null !== f) {
          var g = f.next;
          f.next = e;
          d.next = g;
        }
        c.pending = d;
      }
      fh = null;
    }
    return a;
  }
  function Mk(a, b) {
    do {
      var c = Y;
      try {
        $g();
        Fh.current = Rh;
        if (Ih) {
          for (var d = M.memoizedState; null !== d; ) {
            var e = d.queue;
            null !== e && (e.pending = null);
            d = d.next;
          }
          Ih = false;
        }
        Hh = 0;
        O = N = M = null;
        Jh = false;
        Kh = 0;
        nk.current = null;
        if (null === c || null === c.return) {
          T = 1;
          pk = b;
          Y = null;
          break;
        }
        a: {
          var f = a, g = c.return, h = c, k = b;
          b = Z;
          h.flags |= 32768;
          if (null !== k && "object" === typeof k && "function" === typeof k.then) {
            var l = k, m = h, q = m.tag;
            if (0 === (m.mode & 1) && (0 === q || 11 === q || 15 === q)) {
              var r = m.alternate;
              r ? (m.updateQueue = r.updateQueue, m.memoizedState = r.memoizedState, m.lanes = r.lanes) : (m.updateQueue = null, m.memoizedState = null);
            }
            var y = Ui(g);
            if (null !== y) {
              y.flags &= -257;
              Vi(y, g, h, f, b);
              y.mode & 1 && Si(f, l, b);
              b = y;
              k = l;
              var n = b.updateQueue;
              if (null === n) {
                var t = /* @__PURE__ */ new Set();
                t.add(k);
                b.updateQueue = t;
              } else n.add(k);
              break a;
            } else {
              if (0 === (b & 1)) {
                Si(f, l, b);
                tj();
                break a;
              }
              k = Error(p(426));
            }
          } else if (I && h.mode & 1) {
            var J = Ui(g);
            if (null !== J) {
              0 === (J.flags & 65536) && (J.flags |= 256);
              Vi(J, g, h, f, b);
              Jg(Ji(k, h));
              break a;
            }
          }
          f = k = Ji(k, h);
          4 !== T && (T = 2);
          null === sk ? sk = [f] : sk.push(f);
          f = g;
          do {
            switch (f.tag) {
              case 3:
                f.flags |= 65536;
                b &= -b;
                f.lanes |= b;
                var x = Ni(f, k, b);
                ph(f, x);
                break a;
              case 1:
                h = k;
                var w = f.type, u = f.stateNode;
                if (0 === (f.flags & 128) && ("function" === typeof w.getDerivedStateFromError || null !== u && "function" === typeof u.componentDidCatch && (null === Ri || !Ri.has(u)))) {
                  f.flags |= 65536;
                  b &= -b;
                  f.lanes |= b;
                  var F = Qi(f, h, b);
                  ph(f, F);
                  break a;
                }
            }
            f = f.return;
          } while (null !== f);
        }
        Sk(c);
      } catch (na) {
        b = na;
        Y === c && null !== c && (Y = c = c.return);
        continue;
      }
      break;
    } while (1);
  }
  function Jk() {
    var a = mk.current;
    mk.current = Rh;
    return null === a ? Rh : a;
  }
  function tj() {
    if (0 === T || 3 === T || 2 === T) T = 4;
    null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
  }
  function Ik(a, b) {
    var c = K;
    K |= 2;
    var d = Jk();
    if (Q !== a || Z !== b) uk = null, Kk(a, b);
    do
      try {
        Tk();
        break;
      } catch (e) {
        Mk(a, e);
      }
    while (1);
    $g();
    K = c;
    mk.current = d;
    if (null !== Y) throw Error(p(261));
    Q = null;
    Z = 0;
    return T;
  }
  function Tk() {
    for (; null !== Y; ) Uk(Y);
  }
  function Lk() {
    for (; null !== Y && !cc(); ) Uk(Y);
  }
  function Uk(a) {
    var b = Vk(a.alternate, a, fj);
    a.memoizedProps = a.pendingProps;
    null === b ? Sk(a) : Y = b;
    nk.current = null;
  }
  function Sk(a) {
    var b = a;
    do {
      var c = b.alternate;
      a = b.return;
      if (0 === (b.flags & 32768)) {
        if (c = Ej(c, b, fj), null !== c) {
          Y = c;
          return;
        }
      } else {
        c = Ij(c, b);
        if (null !== c) {
          c.flags &= 32767;
          Y = c;
          return;
        }
        if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
        else {
          T = 6;
          Y = null;
          return;
        }
      }
      b = b.sibling;
      if (null !== b) {
        Y = b;
        return;
      }
      Y = b = a;
    } while (null !== b);
    0 === T && (T = 5);
  }
  function Pk(a, b, c) {
    var d = C, e = ok.transition;
    try {
      ok.transition = null, C = 1, Wk(a, b, c, d);
    } finally {
      ok.transition = e, C = d;
    }
    return null;
  }
  function Wk(a, b, c, d) {
    do
      Hk();
    while (null !== wk);
    if (0 !== (K & 6)) throw Error(p(327));
    c = a.finishedWork;
    var e = a.finishedLanes;
    if (null === c) return null;
    a.finishedWork = null;
    a.finishedLanes = 0;
    if (c === a.current) throw Error(p(177));
    a.callbackNode = null;
    a.callbackPriority = 0;
    var f = c.lanes | c.childLanes;
    Bc(a, f);
    a === Q && (Y = Q = null, Z = 0);
    0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
      Hk();
      return null;
    }));
    f = 0 !== (c.flags & 15990);
    if (0 !== (c.subtreeFlags & 15990) || f) {
      f = ok.transition;
      ok.transition = null;
      var g = C;
      C = 1;
      var h = K;
      K |= 4;
      nk.current = null;
      Oj(a, c);
      dk(c, a);
      Oe(Df);
      dd = !!Cf;
      Df = Cf = null;
      a.current = c;
      hk(c);
      dc();
      K = h;
      C = g;
      ok.transition = f;
    } else a.current = c;
    vk && (vk = false, wk = a, xk = e);
    f = a.pendingLanes;
    0 === f && (Ri = null);
    mc(c.stateNode);
    Dk(a, B());
    if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
    if (Oi) throw Oi = false, a = Pi, Pi = null, a;
    0 !== (xk & 1) && 0 !== a.tag && Hk();
    f = a.pendingLanes;
    0 !== (f & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
    jg();
    return null;
  }
  function Hk() {
    if (null !== wk) {
      var a = Dc(xk), b = ok.transition, c = C;
      try {
        ok.transition = null;
        C = 16 > a ? 16 : a;
        if (null === wk) var d = false;
        else {
          a = wk;
          wk = null;
          xk = 0;
          if (0 !== (K & 6)) throw Error(p(331));
          var e = K;
          K |= 4;
          for (V = a.current; null !== V; ) {
            var f = V, g = f.child;
            if (0 !== (V.flags & 16)) {
              var h = f.deletions;
              if (null !== h) {
                for (var k = 0; k < h.length; k++) {
                  var l = h[k];
                  for (V = l; null !== V; ) {
                    var m = V;
                    switch (m.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Pj(8, m, f);
                    }
                    var q = m.child;
                    if (null !== q) q.return = m, V = q;
                    else for (; null !== V; ) {
                      m = V;
                      var r = m.sibling, y = m.return;
                      Sj(m);
                      if (m === l) {
                        V = null;
                        break;
                      }
                      if (null !== r) {
                        r.return = y;
                        V = r;
                        break;
                      }
                      V = y;
                    }
                  }
                }
                var n = f.alternate;
                if (null !== n) {
                  var t = n.child;
                  if (null !== t) {
                    n.child = null;
                    do {
                      var J = t.sibling;
                      t.sibling = null;
                      t = J;
                    } while (null !== t);
                  }
                }
                V = f;
              }
            }
            if (0 !== (f.subtreeFlags & 2064) && null !== g) g.return = f, V = g;
            else b: for (; null !== V; ) {
              f = V;
              if (0 !== (f.flags & 2048)) switch (f.tag) {
                case 0:
                case 11:
                case 15:
                  Pj(9, f, f.return);
              }
              var x = f.sibling;
              if (null !== x) {
                x.return = f.return;
                V = x;
                break b;
              }
              V = f.return;
            }
          }
          var w = a.current;
          for (V = w; null !== V; ) {
            g = V;
            var u = g.child;
            if (0 !== (g.subtreeFlags & 2064) && null !== u) u.return = g, V = u;
            else b: for (g = w; null !== V; ) {
              h = V;
              if (0 !== (h.flags & 2048)) try {
                switch (h.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Qj(9, h);
                }
              } catch (na) {
                W(h, h.return, na);
              }
              if (h === g) {
                V = null;
                break b;
              }
              var F = h.sibling;
              if (null !== F) {
                F.return = h.return;
                V = F;
                break b;
              }
              V = h.return;
            }
          }
          K = e;
          jg();
          if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
            lc.onPostCommitFiberRoot(kc, a);
          } catch (na) {
          }
          d = true;
        }
        return d;
      } finally {
        C = c, ok.transition = b;
      }
    }
    return false;
  }
  function Xk(a, b, c) {
    b = Ji(c, b);
    b = Ni(a, b, 1);
    a = nh(a, b, 1);
    b = R();
    null !== a && (Ac(a, 1, b), Dk(a, b));
  }
  function W(a, b, c) {
    if (3 === a.tag) Xk(a, a, c);
    else for (; null !== b; ) {
      if (3 === b.tag) {
        Xk(b, a, c);
        break;
      } else if (1 === b.tag) {
        var d = b.stateNode;
        if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
          a = Ji(c, a);
          a = Qi(b, a, 1);
          b = nh(b, a, 1);
          a = R();
          null !== b && (Ac(b, 1, a), Dk(b, a));
          break;
        }
      }
      b = b.return;
    }
  }
  function Ti(a, b, c) {
    var d = a.pingCache;
    null !== d && d.delete(b);
    b = R();
    a.pingedLanes |= a.suspendedLanes & c;
    Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
    Dk(a, b);
  }
  function Yk(a, b) {
    0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
    var c = R();
    a = ih(a, b);
    null !== a && (Ac(a, b, c), Dk(a, c));
  }
  function uj(a) {
    var b = a.memoizedState, c = 0;
    null !== b && (c = b.retryLane);
    Yk(a, c);
  }
  function bk(a, b) {
    var c = 0;
    switch (a.tag) {
      case 13:
        var d = a.stateNode;
        var e = a.memoizedState;
        null !== e && (c = e.retryLane);
        break;
      case 19:
        d = a.stateNode;
        break;
      default:
        throw Error(p(314));
    }
    null !== d && d.delete(b);
    Yk(a, c);
  }
  var Vk;
  Vk = function(a, b, c) {
    if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
    else {
      if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
      dh = 0 !== (a.flags & 131072) ? true : false;
    }
    else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
    b.lanes = 0;
    switch (b.tag) {
      case 2:
        var d = b.type;
        ij(a, b);
        a = b.pendingProps;
        var e = Yf(b, H.current);
        ch(b, c);
        e = Nh(null, b, d, a, e, c);
        var f = Sh();
        b.flags |= 1;
        "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f = true, cg(b)) : f = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f, c)) : (b.tag = 0, I && f && vg(b), Xi(null, b, e, c), b = b.child);
        return b;
      case 16:
        d = b.elementType;
        a: {
          ij(a, b);
          a = b.pendingProps;
          e = d._init;
          d = e(d._payload);
          b.type = d;
          e = b.tag = Zk(d);
          a = Ci(d, a);
          switch (e) {
            case 0:
              b = cj(null, b, d, a, c);
              break a;
            case 1:
              b = hj(null, b, d, a, c);
              break a;
            case 11:
              b = Yi(null, b, d, a, c);
              break a;
            case 14:
              b = $i(null, b, d, Ci(d.type, a), c);
              break a;
          }
          throw Error(p(
            306,
            d,
            ""
          ));
        }
        return b;
      case 0:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
      case 1:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
      case 3:
        a: {
          kj(b);
          if (null === a) throw Error(p(387));
          d = b.pendingProps;
          f = b.memoizedState;
          e = f.element;
          lh(a, b);
          qh(b, d, null, c);
          var g = b.memoizedState;
          d = g.element;
          if (f.isDehydrated) if (f = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f, b.memoizedState = f, b.flags & 256) {
            e = Ji(Error(p(423)), b);
            b = lj(a, b, d, c, e);
            break a;
          } else if (d !== e) {
            e = Ji(Error(p(424)), b);
            b = lj(a, b, d, c, e);
            break a;
          } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
          else {
            Ig();
            if (d === e) {
              b = Zi(a, b, c);
              break a;
            }
            Xi(a, b, d, c);
          }
          b = b.child;
        }
        return b;
      case 5:
        return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f && Ef(d, f) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
      case 6:
        return null === a && Eg(b), null;
      case 13:
        return oj(a, b, c);
      case 4:
        return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
      case 11:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
      case 7:
        return Xi(a, b, b.pendingProps, c), b.child;
      case 8:
        return Xi(a, b, b.pendingProps.children, c), b.child;
      case 12:
        return Xi(a, b, b.pendingProps.children, c), b.child;
      case 10:
        a: {
          d = b.type._context;
          e = b.pendingProps;
          f = b.memoizedProps;
          g = e.value;
          G(Wg, d._currentValue);
          d._currentValue = g;
          if (null !== f) if (He(f.value, g)) {
            if (f.children === e.children && !Wf.current) {
              b = Zi(a, b, c);
              break a;
            }
          } else for (f = b.child, null !== f && (f.return = b); null !== f; ) {
            var h = f.dependencies;
            if (null !== h) {
              g = f.child;
              for (var k = h.firstContext; null !== k; ) {
                if (k.context === d) {
                  if (1 === f.tag) {
                    k = mh(-1, c & -c);
                    k.tag = 2;
                    var l = f.updateQueue;
                    if (null !== l) {
                      l = l.shared;
                      var m = l.pending;
                      null === m ? k.next = k : (k.next = m.next, m.next = k);
                      l.pending = k;
                    }
                  }
                  f.lanes |= c;
                  k = f.alternate;
                  null !== k && (k.lanes |= c);
                  bh(
                    f.return,
                    c,
                    b
                  );
                  h.lanes |= c;
                  break;
                }
                k = k.next;
              }
            } else if (10 === f.tag) g = f.type === b.type ? null : f.child;
            else if (18 === f.tag) {
              g = f.return;
              if (null === g) throw Error(p(341));
              g.lanes |= c;
              h = g.alternate;
              null !== h && (h.lanes |= c);
              bh(g, c, b);
              g = f.sibling;
            } else g = f.child;
            if (null !== g) g.return = f;
            else for (g = f; null !== g; ) {
              if (g === b) {
                g = null;
                break;
              }
              f = g.sibling;
              if (null !== f) {
                f.return = g.return;
                g = f;
                break;
              }
              g = g.return;
            }
            f = g;
          }
          Xi(a, b, e.children, c);
          b = b.child;
        }
        return b;
      case 9:
        return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
      case 14:
        return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
      case 15:
        return bj(a, b, b.type, b.pendingProps, c);
      case 17:
        return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
      case 19:
        return xj(a, b, c);
      case 22:
        return dj(a, b, c);
    }
    throw Error(p(156, b.tag));
  };
  function Fk(a, b) {
    return ac(a, b);
  }
  function $k(a, b, c, d) {
    this.tag = a;
    this.key = c;
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.ref = null;
    this.pendingProps = b;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = d;
    this.subtreeFlags = this.flags = 0;
    this.deletions = null;
    this.childLanes = this.lanes = 0;
    this.alternate = null;
  }
  function Bg(a, b, c, d) {
    return new $k(a, b, c, d);
  }
  function aj(a) {
    a = a.prototype;
    return !(!a || !a.isReactComponent);
  }
  function Zk(a) {
    if ("function" === typeof a) return aj(a) ? 1 : 0;
    if (void 0 !== a && null !== a) {
      a = a.$$typeof;
      if (a === Da) return 11;
      if (a === Ga) return 14;
    }
    return 2;
  }
  function Pg(a, b) {
    var c = a.alternate;
    null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
    c.flags = a.flags & 14680064;
    c.childLanes = a.childLanes;
    c.lanes = a.lanes;
    c.child = a.child;
    c.memoizedProps = a.memoizedProps;
    c.memoizedState = a.memoizedState;
    c.updateQueue = a.updateQueue;
    b = a.dependencies;
    c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
    c.sibling = a.sibling;
    c.index = a.index;
    c.ref = a.ref;
    return c;
  }
  function Rg(a, b, c, d, e, f) {
    var g = 2;
    d = a;
    if ("function" === typeof a) aj(a) && (g = 1);
    else if ("string" === typeof a) g = 5;
    else a: switch (a) {
      case ya:
        return Tg(c.children, e, f, b);
      case za:
        g = 8;
        e |= 8;
        break;
      case Aa:
        return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f, a;
      case Ea:
        return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f, a;
      case Fa:
        return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f, a;
      case Ia:
        return pj(c, e, f, b);
      default:
        if ("object" === typeof a && null !== a) switch (a.$$typeof) {
          case Ba:
            g = 10;
            break a;
          case Ca:
            g = 9;
            break a;
          case Da:
            g = 11;
            break a;
          case Ga:
            g = 14;
            break a;
          case Ha:
            g = 16;
            d = null;
            break a;
        }
        throw Error(p(130, null == a ? a : typeof a, ""));
    }
    b = Bg(g, c, b, e);
    b.elementType = a;
    b.type = d;
    b.lanes = f;
    return b;
  }
  function Tg(a, b, c, d) {
    a = Bg(7, a, d, b);
    a.lanes = c;
    return a;
  }
  function pj(a, b, c, d) {
    a = Bg(22, a, d, b);
    a.elementType = Ia;
    a.lanes = c;
    a.stateNode = { isHidden: false };
    return a;
  }
  function Qg(a, b, c) {
    a = Bg(6, a, null, b);
    a.lanes = c;
    return a;
  }
  function Sg(a, b, c) {
    b = Bg(4, null !== a.children ? a.children : [], a.key, b);
    b.lanes = c;
    b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
    return b;
  }
  function al(a, b, c, d, e) {
    this.tag = b;
    this.containerInfo = a;
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
    this.timeoutHandle = -1;
    this.callbackNode = this.pendingContext = this.context = null;
    this.callbackPriority = 0;
    this.eventTimes = zc(0);
    this.expirationTimes = zc(-1);
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
    this.entanglements = zc(0);
    this.identifierPrefix = d;
    this.onRecoverableError = e;
    this.mutableSourceEagerHydrationData = null;
  }
  function bl(a, b, c, d, e, f, g, h, k) {
    a = new al(a, b, c, h, k);
    1 === b ? (b = 1, true === f && (b |= 8)) : b = 0;
    f = Bg(3, null, null, b);
    a.current = f;
    f.stateNode = a;
    f.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
    kh(f);
    return a;
  }
  function cl(a, b, c) {
    var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
  }
  function dl(a) {
    if (!a) return Vf;
    a = a._reactInternals;
    a: {
      if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
      var b = a;
      do {
        switch (b.tag) {
          case 3:
            b = b.stateNode.context;
            break a;
          case 1:
            if (Zf(b.type)) {
              b = b.stateNode.__reactInternalMemoizedMergedChildContext;
              break a;
            }
        }
        b = b.return;
      } while (null !== b);
      throw Error(p(171));
    }
    if (1 === a.tag) {
      var c = a.type;
      if (Zf(c)) return bg(a, c, b);
    }
    return b;
  }
  function el(a, b, c, d, e, f, g, h, k) {
    a = bl(c, d, true, a, e, f, g, h, k);
    a.context = dl(null);
    c = a.current;
    d = R();
    e = yi(c);
    f = mh(d, e);
    f.callback = void 0 !== b && null !== b ? b : null;
    nh(c, f, e);
    a.current.lanes = e;
    Ac(a, e, d);
    Dk(a, d);
    return a;
  }
  function fl(a, b, c, d) {
    var e = b.current, f = R(), g = yi(e);
    c = dl(c);
    null === b.context ? b.context = c : b.pendingContext = c;
    b = mh(f, g);
    b.payload = { element: a };
    d = void 0 === d ? null : d;
    null !== d && (b.callback = d);
    a = nh(e, b, g);
    null !== a && (gi(a, e, g, f), oh(a, e, g));
    return g;
  }
  function gl(a) {
    a = a.current;
    if (!a.child) return null;
    switch (a.child.tag) {
      case 5:
        return a.child.stateNode;
      default:
        return a.child.stateNode;
    }
  }
  function hl(a, b) {
    a = a.memoizedState;
    if (null !== a && null !== a.dehydrated) {
      var c = a.retryLane;
      a.retryLane = 0 !== c && c < b ? c : b;
    }
  }
  function il(a, b) {
    hl(a, b);
    (a = a.alternate) && hl(a, b);
  }
  function jl() {
    return null;
  }
  var kl = "function" === typeof reportError ? reportError : function(a) {
    console.error(a);
  };
  function ll(a) {
    this._internalRoot = a;
  }
  ml.prototype.render = ll.prototype.render = function(a) {
    var b = this._internalRoot;
    if (null === b) throw Error(p(409));
    fl(a, b, null, null);
  };
  ml.prototype.unmount = ll.prototype.unmount = function() {
    var a = this._internalRoot;
    if (null !== a) {
      this._internalRoot = null;
      var b = a.containerInfo;
      Rk(function() {
        fl(null, a, null, null);
      });
      b[uf] = null;
    }
  };
  function ml(a) {
    this._internalRoot = a;
  }
  ml.prototype.unstable_scheduleHydration = function(a) {
    if (a) {
      var b = Hc();
      a = { blockedOn: null, target: a, priority: b };
      for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
      Qc.splice(c, 0, a);
      0 === c && Vc(a);
    }
  };
  function nl(a) {
    return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
  }
  function ol(a) {
    return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
  }
  function pl() {
  }
  function ql(a, b, c, d, e) {
    if (e) {
      if ("function" === typeof d) {
        var f = d;
        d = function() {
          var a2 = gl(g);
          f.call(a2);
        };
      }
      var g = el(b, d, a, 0, null, false, false, "", pl);
      a._reactRootContainer = g;
      a[uf] = g.current;
      sf(8 === a.nodeType ? a.parentNode : a);
      Rk();
      return g;
    }
    for (; e = a.lastChild; ) a.removeChild(e);
    if ("function" === typeof d) {
      var h = d;
      d = function() {
        var a2 = gl(k);
        h.call(a2);
      };
    }
    var k = bl(a, 0, false, null, null, false, false, "", pl);
    a._reactRootContainer = k;
    a[uf] = k.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Rk(function() {
      fl(b, k, c, d);
    });
    return k;
  }
  function rl(a, b, c, d, e) {
    var f = c._reactRootContainer;
    if (f) {
      var g = f;
      if ("function" === typeof e) {
        var h = e;
        e = function() {
          var a2 = gl(g);
          h.call(a2);
        };
      }
      fl(b, g, a, e);
    } else g = ql(c, b, a, e, d);
    return gl(g);
  }
  Ec = function(a) {
    switch (a.tag) {
      case 3:
        var b = a.stateNode;
        if (b.current.memoizedState.isDehydrated) {
          var c = tc(b.pendingLanes);
          0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
        }
        break;
      case 13:
        Rk(function() {
          var b2 = ih(a, 1);
          if (null !== b2) {
            var c2 = R();
            gi(b2, a, 1, c2);
          }
        }), il(a, 1);
    }
  };
  Fc = function(a) {
    if (13 === a.tag) {
      var b = ih(a, 134217728);
      if (null !== b) {
        var c = R();
        gi(b, a, 134217728, c);
      }
      il(a, 134217728);
    }
  };
  Gc = function(a) {
    if (13 === a.tag) {
      var b = yi(a), c = ih(a, b);
      if (null !== c) {
        var d = R();
        gi(c, a, b, d);
      }
      il(a, b);
    }
  };
  Hc = function() {
    return C;
  };
  Ic = function(a, b) {
    var c = C;
    try {
      return C = a, b();
    } finally {
      C = c;
    }
  };
  yb = function(a, b, c) {
    switch (b) {
      case "input":
        bb(a, c);
        b = c.name;
        if ("radio" === c.type && null != b) {
          for (c = a; c.parentNode; ) c = c.parentNode;
          c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
          for (b = 0; b < c.length; b++) {
            var d = c[b];
            if (d !== a && d.form === a.form) {
              var e = Db(d);
              if (!e) throw Error(p(90));
              Wa(d);
              bb(d, e);
            }
          }
        }
        break;
      case "textarea":
        ib(a, c);
        break;
      case "select":
        b = c.value, null != b && fb(a, !!c.multiple, b, false);
    }
  };
  Gb = Qk;
  Hb = Rk;
  var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
  var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
    a = Zb(a);
    return null === a ? null : a.stateNode;
  }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
    var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!vl.isDisabled && vl.supportsFiber) try {
      kc = vl.inject(ul), lc = vl;
    } catch (a) {
    }
  }
  reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
  reactDom_production_min.createPortal = function(a, b) {
    var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!nl(b)) throw Error(p(200));
    return cl(a, b, null, c);
  };
  reactDom_production_min.createRoot = function(a, b) {
    if (!nl(a)) throw Error(p(299));
    var c = false, d = "", e = kl;
    null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
    b = bl(a, 1, false, null, null, c, false, d, e);
    a[uf] = b.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    return new ll(b);
  };
  reactDom_production_min.findDOMNode = function(a) {
    if (null == a) return null;
    if (1 === a.nodeType) return a;
    var b = a._reactInternals;
    if (void 0 === b) {
      if ("function" === typeof a.render) throw Error(p(188));
      a = Object.keys(a).join(",");
      throw Error(p(268, a));
    }
    a = Zb(b);
    a = null === a ? null : a.stateNode;
    return a;
  };
  reactDom_production_min.flushSync = function(a) {
    return Rk(a);
  };
  reactDom_production_min.hydrate = function(a, b, c) {
    if (!ol(b)) throw Error(p(200));
    return rl(null, a, b, true, c);
  };
  reactDom_production_min.hydrateRoot = function(a, b, c) {
    if (!nl(a)) throw Error(p(405));
    var d = null != c && c.hydratedSources || null, e = false, f = "", g = kl;
    null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
    b = el(b, null, a, 1, null != c ? c : null, e, false, f, g);
    a[uf] = b.current;
    sf(a);
    if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
      c,
      e
    );
    return new ml(b);
  };
  reactDom_production_min.render = function(a, b, c) {
    if (!ol(b)) throw Error(p(200));
    return rl(null, a, b, false, c);
  };
  reactDom_production_min.unmountComponentAtNode = function(a) {
    if (!ol(a)) throw Error(p(40));
    return a._reactRootContainer ? (Rk(function() {
      rl(null, null, a, false, function() {
        a._reactRootContainer = null;
        a[uf] = null;
      });
    }), true) : false;
  };
  reactDom_production_min.unstable_batchedUpdates = Qk;
  reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
    if (!ol(c)) throw Error(p(200));
    if (null == a || void 0 === a._reactInternals) throw Error(p(38));
    return rl(a, b, c, false, d);
  };
  reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
  return reactDom_production_min;
}
var hasRequiredReactDom;
function requireReactDom() {
  if (hasRequiredReactDom) return reactDom.exports;
  hasRequiredReactDom = 1;
  function checkDCE() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
      return;
    }
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
    } catch (err) {
      console.error(err);
    }
  }
  {
    checkDCE();
    reactDom.exports = requireReactDom_production_min();
  }
  return reactDom.exports;
}
var hasRequiredClient;
function requireClient() {
  if (hasRequiredClient) return client;
  hasRequiredClient = 1;
  var m = requireReactDom();
  {
    client.createRoot = m.createRoot;
    client.hydrateRoot = m.hydrateRoot;
  }
  return client;
}
var clientExports = requireClient();
const createStoreImpl = (createState) => {
  let state;
  const listeners2 = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners2.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners2.add(listener);
    return () => listeners2.delete(listener);
  };
  const api2 = { setState, getState, getInitialState, subscribe };
  const initialState = state = createState(setState, getState, api2);
  return api2;
};
const createStore = ((createState) => createState ? createStoreImpl(createState) : createStoreImpl);
const identity = (arg) => arg;
function useStore$1(api2, selector = identity) {
  const slice = React.useSyncExternalStore(
    api2.subscribe,
    React.useCallback(() => selector(api2.getState()), [api2, selector]),
    React.useCallback(() => selector(api2.getInitialState()), [api2, selector])
  );
  React.useDebugValue(slice);
  return slice;
}
const createImpl = (createState) => {
  const api2 = createStore(createState);
  const useBoundStore = (selector) => useStore$1(api2, selector);
  Object.assign(useBoundStore, api2);
  return useBoundStore;
};
const create = ((createState) => createState ? createImpl(createState) : createImpl);
const raw = window.api;
const api = {
  settings: {
    get: () => raw["settings:get"](),
    set: (patch) => raw["settings:set"](patch)
  },
  identity: {
    backfill: () => raw["identity:backfill"]()
  },
  games: {
    list: (filters) => raw["games:list"](filters),
    get: (id) => raw["games:get"](id),
    moves: (id) => raw["games:moves"](id),
    delete: (id) => raw["games:delete"](id),
    exportPgn: (ids) => raw["games:exportPgn"](ids)
  },
  import: {
    detect: (text) => raw["import:detect"](text),
    previewPgn: (text) => raw["import:previewPgn"](text),
    chesscom: (args) => raw["import:chesscom"](args),
    lichess: (args) => raw["import:lichess"](args),
    lichessGame: (args) => raw["import:lichessGame"](args),
    pgn: (args) => raw["import:pgn"](args),
    pickPgnFile: () => raw["import:pickPgnFile"]()
  },
  engines: {
    list: () => raw["engines:list"](),
    add: (path) => raw["engines:add"](path),
    remove: (id) => raw["engines:remove"](id),
    verify: (id) => raw["engines:verify"](id),
    pickExecutable: () => raw["engines:pickExecutable"](),
    profiles: (engineId) => raw["engines:profiles"](engineId),
    saveProfile: (p) => raw["engines:saveProfile"](p)
  },
  eval: {
    setEnabled: (on) => raw["eval:setEnabled"](on),
    status: () => raw["eval:status"](),
    position: (fen) => raw["eval:position"](fen)
  },
  analysis: {
    queue: (gameIds, profileId) => raw["analysis:queue"]({ gameIds, profileId }),
    cancel: (jobId) => raw["analysis:cancel"](jobId),
    forGame: (gameId) => raw["analysis:forGame"](gameId),
    mistakes: (gameId) => raw["mistakes:forGame"](gameId)
  },
  jobs: {
    list: () => raw["jobs:list"]()
  },
  lessons: {
    list: () => raw["lessons:list"](),
    get: (idOrSlug) => raw["lessons:get"](idOrSlug),
    validate: (json) => raw["lessons:validate"](json),
    publish: (json) => raw["lessons:publish"](json),
    getProgress: (lessonId) => raw["lessons:progress:get"](lessonId),
    setProgress: (p) => raw["lessons:progress:set"](p),
    allProgress: () => raw["lessons:progress:all"]()
  },
  courses: {
    list: () => raw["courses:list"]()
  },
  exercises: {
    list: () => raw["exercises:list"](),
    due: () => raw["exercises:due"](),
    attempt: (id, correct) => raw["exercises:attempt"]({ id, correct }),
    fromMistake: (mistakeId) => raw["exercises:fromMistake"](mistakeId)
  },
  repertoire: {
    list: (color) => raw["repertoire:list"](color),
    add: (args) => raw["repertoire:add"](args),
    addLineFromGame: (gameId, uptoPly) => raw["repertoire:addLineFromGame"]({ gameId, uptoPly }),
    addOpeningLine: (args) => raw["repertoire:addOpeningLine"](args),
    due: () => raw["repertoire:due"](),
    attempt: (id, correct) => raw["repertoire:attempt"]({ id, correct }),
    setPriority: (id, priority) => raw["repertoire:setPriority"]({ id, priority }),
    delete: (id) => raw["repertoire:delete"](id)
  },
  plan: {
    today: () => raw["plan:today"]()
  },
  ai: {
    outline: (args) => raw["ai:outline"](args),
    generateLesson: (args) => raw["ai:generateLesson"](args)
  },
  onEvent: raw.onEvent
};
let ctx = null;
let enabled = true;
function setSoundEnabled(on) {
  enabled = on;
}
function getCtx() {
  if (!enabled) return null;
  if (!ctx) {
    const Ctor = window.AudioContext ?? window.webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}
function tone(freq, duration, startAt, type = "sine", gain = 0.08) {
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.value = gain;
  g.gain.setValueAtTime(gain, c.currentTime + startAt);
  g.gain.exponentialRampToValueAtTime(1e-3, c.currentTime + startAt + duration);
  osc.connect(g);
  g.connect(c.destination);
  osc.start(c.currentTime + startAt);
  osc.stop(c.currentTime + startAt + duration);
}
function playSound(kind) {
  if (!getCtx()) return;
  switch (kind) {
    case "move":
      tone(520, 0.05, 0);
      break;
    case "capture":
      tone(340, 0.07, 0, "triangle");
      break;
    case "check":
      tone(660, 0.08, 0, "square", 0.05);
      tone(880, 0.09, 0.06, "square", 0.05);
      break;
    case "correct":
      tone(523.25, 0.09, 0);
      tone(783.99, 0.14, 0.09);
      break;
    case "wrong":
      tone(220, 0.18, 0, "sawtooth", 0.06);
      break;
    case "complete":
      tone(523.25, 0.1, 0);
      tone(659.25, 0.1, 0.1);
      tone(783.99, 0.2, 0.2);
      break;
  }
}
const useStore = create((set, get) => ({
  route: { name: "today" },
  settings: null,
  jobs: [],
  importModalOpen: false,
  onboardingOpen: false,
  evalEnabled: false,
  evalError: null,
  evalUpdate: null,
  evalFen: null,
  navigate: (route) => set({ route }),
  setImportModalOpen: (open) => set({ importModalOpen: open }),
  setOnboardingOpen: (open) => set({ onboardingOpen: open }),
  refreshSettings: async () => {
    const settings = await api.settings.get();
    setSoundEnabled(settings.soundEnabled);
    set({ settings });
  },
  refreshJobs: async () => set({ jobs: await api.jobs.list() }),
  setEvalEnabled: async (on) => {
    try {
      const status = await api.eval.setEnabled(on);
      set({ evalEnabled: status.enabled, evalError: null, evalUpdate: on ? get().evalUpdate : null });
      const fen = get().evalFen;
      if (status.enabled && fen) void api.eval.position(fen);
    } catch (e) {
      set({ evalEnabled: false, evalError: e.message });
    }
  },
  reportEvalFen: (fen) => {
    if (fen === get().evalFen) return;
    set({ evalFen: fen });
    if (get().evalEnabled) void api.eval.position(fen);
  }
}));
let wired = false;
function wireEvents() {
  if (wired) return;
  wired = true;
  void useStore.getState().refreshSettings();
  void useStore.getState().refreshJobs();
  api.onEvent((event) => {
    if (event.type.startsWith("job:")) void useStore.getState().refreshJobs();
    if (event.type === "engine:eval") {
      const update = event.payload;
      if (update.fen === useStore.getState().evalFen) useStore.setState({ evalUpdate: update });
    }
    if (event.type === "engine:status") {
      const payload = event.payload;
      if (payload?.liveEvalError) {
        useStore.setState({ evalEnabled: false, evalError: payload.liveEvalError });
      }
    }
    for (const cb of listeners) cb(event);
  });
}
const listeners = /* @__PURE__ */ new Set();
function useAppEvent(types, callback) {
  reactExports.useEffect(() => {
    const cb = (e) => {
      if (types.includes(e.type)) callback();
    };
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  }, [types.join(","), callback]);
}
function useEvalTarget(fen) {
  const report = useStore((s) => s.reportEvalFen);
  reactExports.useEffect(() => {
    if (fen) report(fen);
  }, [fen, report]);
}
const NAV = [
  { route: { name: "today" }, label: "Today", icon: "☀" },
  { route: { name: "games" }, label: "Games", icon: "♟" },
  { route: { name: "openings" }, label: "Openings", icon: "⇶" },
  { route: { name: "lessons" }, label: "Lessons", icon: "📖" },
  { route: { name: "exercises" }, label: "Exercises", icon: "🧩" },
  { route: { name: "ai-studio" }, label: "AI Studio", icon: "✦" },
  { route: { name: "engines" }, label: "Engines", icon: "⚙" },
  { route: { name: "settings" }, label: "Settings", icon: "⚒" }
];
function whiteScore(update) {
  const best = update.multiPv[0];
  if (!best) return { cp: 0, label: "…" };
  const sign = update.sideToMove === "w" ? 1 : -1;
  if (best.score.type === "mate") {
    const mate = best.score.value * sign;
    return { cp: mate > 0 ? 1e4 : -1e4, label: `#${Math.abs(best.score.value)}${mate > 0 ? "" : " (Black)"}` };
  }
  const cp = best.score.value * sign;
  return { cp, label: (cp >= 0 ? "+" : "") + (cp / 100).toFixed(2) };
}
function pvText(pv) {
  return (pv.pvSan && pv.pvSan.length ? pv.pvSan : pv.pvUci).slice(1, 7).join(" ");
}
function EvalPanel() {
  const evalEnabled = useStore((s) => s.evalEnabled);
  const evalError = useStore((s) => s.evalError);
  const evalUpdate = useStore((s) => s.evalUpdate);
  const evalFen = useStore((s) => s.evalFen);
  const setEvalEnabled = useStore((s) => s.setEvalEnabled);
  const [busy, setBusy] = reactExports.useState(false);
  const toggle = async () => {
    setBusy(true);
    try {
      await setEvalEnabled(!evalEnabled);
    } finally {
      setBusy(false);
    }
  };
  const current = evalEnabled && evalUpdate && evalUpdate.fen === evalFen ? evalUpdate : null;
  const score = current ? whiteScore(current) : null;
  const whitePct2 = score ? 50 + 50 * (2 / (1 + Math.exp(-score.cp / 400)) - 1) : 50;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "eval-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { gap: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "switch", title: "Evaluate the currently visible board with your engine", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: evalEnabled, disabled: busy, onChange: () => void toggle() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "slider" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--text-dim)" }, children: "Live engine" }),
      current && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eval-score", style: { marginLeft: "auto" }, children: score.label })
    ] }),
    evalError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "var(--danger)", fontSize: 11 }, children: evalError }),
    evalEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eval-bar-outer", title: "White ↔ Black", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eval-bar-white", style: { width: `${whitePct2}%` } }) }),
      current ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        current.multiPv.slice(0, 2).map((pv) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "eval-line", title: pvText(pv), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: pv.moveSan ?? pv.moveUci }),
          " ",
          pvText(pv)
        ] }, pv.rank)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "var(--text-faint)", fontSize: 10.5 }, children: [
          "depth ",
          current.depth,
          " · ",
          current.engineName,
          current.final ? "" : " · thinking…"
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "var(--text-faint)", fontSize: 11 }, children: evalFen ? "evaluating…" : "open a board to evaluate" })
    ] })
  ] });
}
function Sidebar() {
  const route = useStore((s) => s.route);
  const navigate = useStore((s) => s.navigate);
  const setImportModalOpen = useStore((s) => s.setImportModalOpen);
  const jobs = useStore((s) => s.jobs);
  const settings = useStore((s) => s.settings);
  const [engineCount, setEngineCount] = reactExports.useState(null);
  const refreshEngines = () => {
    void api.engines.list().then((list) => setEngineCount(list.filter((e) => e.status === "available").length));
  };
  reactExports.useEffect(refreshEngines, []);
  useAppEvent(["engine:status"], refreshEngines);
  const activeJob = jobs.find((j) => j.status === "running");
  const pendingCount = jobs.filter((j) => j.status === "pending").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "sidebar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "logo", children: [
      "Chess Mentor ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Studio" })
    ] }),
    NAV.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: `nav-item ${route.name === item.route.name ? "active" : ""}`,
        onClick: () => navigate(item.route),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { width: 18, textAlign: "center" }, children: item.icon }),
          item.label
        ]
      },
      item.label
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "12px 6px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "primary", style: { width: "100%" }, onClick: () => setImportModalOpen(true), children: "+ Import games" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spacer" }),
    activeJob && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-line", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 3 }, children: [
        activeJob.type === "analyze-game" ? "Analyzing…" : "Importing…",
        pendingCount > 0 ? ` (+${pendingCount} queued)` : ""
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-outer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "progress-inner",
          style: {
            width: activeJob.progressTotal ? `${Math.round(activeJob.progressCurrent / activeJob.progressTotal * 100)}%` : "10%"
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", style: { marginTop: 5 }, onClick: () => void api.analysis.cancel(activeJob.id), children: "Cancel" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EvalPanel, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-line", children: [
      "Engine: ",
      engineCount === null ? "…" : engineCount > 0 ? `${engineCount} ready` : "none"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-line", children: [
      "AI: ",
      settings?.aiConfig.mode === "manual" ? "manual mode" : settings?.aiConfig.model || "configured"
    ] })
  ] });
}
function ResultSummary({
  result,
  alreadyQueued,
  onAnalyze,
  onViewGames
}) {
  const [analyzing, setAnalyzing] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `callout ${result.gamesImported > 0 ? "success" : "warn"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: result.gamesImported }),
    " games imported, ",
    /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: result.duplicatesSkipped }),
    " duplicates skipped",
    result.failed.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      ", ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: result.failed.length }),
      " failed",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { style: { margin: "6px 0 0", paddingLeft: 18 }, children: [
        result.failed.slice(0, 5).map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          f.sourceRef,
          ": ",
          f.reason
        ] }, i)),
        result.failed.length > 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "…and ",
          result.failed.length - 5,
          " more"
        ] })
      ] })
    ] }),
    result.createdGameIds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { marginTop: 10, flexWrap: "wrap" }, children: [
      !alreadyQueued && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "small primary",
          disabled: analyzing,
          onClick: () => {
            setAnalyzing(true);
            onAnalyze();
          },
          children: analyzing ? "Queuing…" : `Analyze ${result.createdGameIds.length} game${result.createdGameIds.length === 1 ? "" : "s"} now`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: onViewGames, children: "View games" })
    ] })
  ] });
}
function ImportModal() {
  const setOpen = useStore((s) => s.setImportModalOpen);
  const navigate = useStore((s) => s.navigate);
  const jobs = useStore((s) => s.jobs);
  const settings = useStore((s) => s.settings);
  const refreshSettings = useStore((s) => s.refreshSettings);
  const [tab, setTab] = reactExports.useState("username");
  const [platform, setPlatform] = reactExports.useState("chesscom");
  const [username, setUsername] = reactExports.useState(settings?.chesscomUsername ?? "");
  const [maxGames, setMaxGames] = reactExports.useState(100);
  const [fromMonth, setFromMonth] = reactExports.useState("");
  const [toMonth, setToMonth] = reactExports.useState("");
  const [timeClasses, setTimeClasses] = reactExports.useState(["rapid", "blitz"]);
  const [analyzeAfter, setAnalyzeAfter] = reactExports.useState(false);
  const [urlText, setUrlText] = reactExports.useState("");
  const [pgnText, setPgnText] = reactExports.useState("");
  const [pgnPreview, setPgnPreview] = reactExports.useState(null);
  const [watchedJobId, setWatchedJobId] = reactExports.useState(null);
  const [directResult, setDirectResult] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(false);
  const watchedJob = jobs.find((j) => j.id === watchedJobId) ?? null;
  const jobResult = watchedJob?.status === "completed" ? watchedJob.result : null;
  function toggleTimeClass(tc) {
    setTimeClasses((prev) => prev.includes(tc) ? prev.filter((x) => x !== tc) : [...prev, tc]);
  }
  async function run(fn) {
    setError(null);
    setDirectResult(null);
    setBusy(true);
    try {
      await fn();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  async function saveUsernameIfNeeded(p, name) {
    const key = p === "chesscom" ? "chesscomUsername" : "lichessUsername";
    if (settings?.[key] === name) return;
    await api.settings.set({ [key]: name });
    await refreshSettings();
    await api.identity.backfill();
  }
  const startUsernameImport = () => run(async () => {
    const name = username.trim();
    if (!name) throw new Error("Enter a username first.");
    await saveUsernameIfNeeded(platform, name);
    let job;
    if (platform === "chesscom") {
      job = await api.import.chesscom({
        username: name,
        maxGames,
        fromMonth: fromMonth || void 0,
        toMonth: toMonth || void 0,
        timeClasses: timeClasses.length ? timeClasses : void 0,
        analyzeAfterImport: analyzeAfter
      });
    } else {
      job = await api.import.lichess({
        username: name,
        max: maxGames,
        perfTypes: timeClasses.filter((t) => t !== "daily"),
        analyzeAfterImport: analyzeAfter
      });
    }
    setWatchedJobId(job.id);
  });
  const startUrlImport = () => run(async () => {
    const detected = await api.import.detect(urlText);
    switch (detected.kind) {
      case "chesscom-user": {
        await saveUsernameIfNeeded("chesscom", detected.username);
        const job = await api.import.chesscom({
          username: detected.username,
          maxGames,
          analyzeAfterImport: analyzeAfter
        });
        setWatchedJobId(job.id);
        break;
      }
      case "lichess-user": {
        await saveUsernameIfNeeded("lichess", detected.username);
        const job = await api.import.lichess({
          username: detected.username,
          max: maxGames,
          analyzeAfterImport: analyzeAfter
        });
        setWatchedJobId(job.id);
        break;
      }
      case "lichess-game": {
        const job = await api.import.lichessGame({
          gameId: detected.gameId,
          analyzeAfterImport: analyzeAfter
        });
        setWatchedJobId(job.id);
        break;
      }
      case "pgn": {
        const result = await api.import.pgn({
          pgn: detected.pgn,
          analyzeAfterImport: analyzeAfter
        });
        setDirectResult(result);
        break;
      }
      case "chesscom-game":
        throw new Error(
          "Single Chess.com game URLs cannot be fetched via the public API. Import the month via your username instead, or paste the PGN."
        );
      default:
        throw new Error("Could not recognize this URL. Supported: Chess.com/Lichess profiles and Lichess games.");
    }
  });
  const startPgnImport = () => run(async () => {
    if (!pgnText.trim()) throw new Error("Paste PGN text or drop a .pgn file first.");
    const result = await api.import.pgn({ pgn: pgnText, analyzeAfterImport: analyzeAfter });
    setDirectResult(result);
  });
  const pickFile = () => run(async () => {
    const path = await api.import.pickPgnFile();
    if (!path) return;
    const job = await api.import.pgn({ filePath: path, analyzeAfterImport: analyzeAfter });
    setWatchedJobId(job.id);
  });
  async function onDrop(e) {
    e.preventDefault();
    const file2 = e.dataTransfer.files[0];
    if (!file2) return;
    const text = await file2.text();
    setPgnText(text);
    const preview = await api.import.previewPgn(text);
    setPgnPreview(preview.games);
  }
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && !busy) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [busy, setOpen]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-backdrop", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Import games" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "row", style: { gap: 6, marginBottom: 10 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: analyzeAfter, onChange: (e) => setAnalyzeAfter(e.target.checked) }),
      "Analyze after import (requires a configured engine)"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: tab === "username" ? "active" : "", onClick: () => setTab("username"), children: "Username" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: tab === "url" ? "active" : "", onClick: () => setTab("url"), children: "URL / paste" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: tab === "pgn" ? "active" : "", onClick: () => setTab("pgn"), children: "PGN" })
    ] }),
    tab === "username" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", style: { width: 140 }, children: [
          "Platform",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: platform, onChange: (e) => setPlatform(e.target.value), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "chesscom", children: "Chess.com" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "lichess", children: "Lichess" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", style: { flex: 1 }, children: [
          "Username",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: username, onChange: (e) => setUsername(e.target.value), placeholder: "your-username" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", style: { width: 110 }, children: [
          "Max games",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              value: maxGames,
              min: 1,
              max: 2e3,
              onChange: (e) => setMaxGames(parseInt(e.target.value) || 100)
            }
          )
        ] })
      ] }),
      platform === "chesscom" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          "From month",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "month", value: fromMonth, onChange: (e) => setFromMonth(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
          "To month",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "month", value: toMonth, onChange: (e) => setToMonth(e.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "muted", children: "Time controls:" }),
        ["rapid", "blitz", "bullet", platform === "chesscom" ? "daily" : "classical"].map((tc) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "row", style: { gap: 4 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: timeClasses.includes(tc), onChange: () => toggleTimeClass(tc) }),
          tc
        ] }, tc))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted", children: [
        "Fetches ",
        platform === "chesscom" ? "monthly archives sequentially from the public Chess.com API" : "a streamed NDJSON export from the Lichess API",
        ". Only public, finished games are imported."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "primary", disabled: busy, onClick: () => void startUsernameImport(), children: "Start import" })
    ] }),
    tab === "url" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
        "Profile URL, game URL, or pasted PGN",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            rows: 4,
            value: urlText,
            onChange: (e) => setUrlText(e.target.value),
            placeholder: "https://www.chess.com/member/…  |  https://lichess.org/@/…  |  https://lichess.org/AbCdEfGh"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "primary", disabled: busy || !urlText.trim(), onClick: () => void startUrlImport(), children: "Detect and import" })
    ] }),
    tab === "pgn" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          rows: 8,
          value: pgnText,
          onChange: (e) => {
            setPgnText(e.target.value);
            setPgnPreview(null);
          },
          onDrop: (e) => void onDrop(e),
          onDragOver: (e) => e.preventDefault(),
          placeholder: 'Paste PGN here or drop a .pgn file onto this area…\n\n[Event "…"]'
        }
      ),
      pgnPreview !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted", children: [
        pgnPreview,
        " game(s) detected — confirm to import."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "primary", disabled: busy || !pgnText.trim(), onClick: () => void startPgnImport(), children: "Import pasted PGN" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: busy, onClick: () => void pickFile(), children: "Choose .pgn file…" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", style: { marginTop: 14 }, children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "callout error", children: error }),
      directResult && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ResultSummary,
        {
          result: directResult,
          alreadyQueued: analyzeAfter,
          onAnalyze: () => void api.analysis.queue(directResult.createdGameIds),
          onViewGames: () => {
            navigate({ name: "games" });
            setOpen(false);
          }
        }
      ),
      watchedJob && watchedJob.status === "running" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted", style: { marginBottom: 4 }, children: [
          watchedJob.progressLabel ?? "Working…",
          " (",
          watchedJob.progressCurrent,
          "/",
          watchedJob.progressTotal || "?",
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-outer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "progress-inner",
            style: {
              width: watchedJob.progressTotal ? `${watchedJob.progressCurrent / watchedJob.progressTotal * 100}%` : "15%"
            }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", style: { marginTop: 6 }, onClick: () => void api.analysis.cancel(watchedJob.id), children: "Cancel import" })
      ] }),
      jobResult && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ResultSummary,
        {
          result: jobResult,
          alreadyQueued: analyzeAfter,
          onAnalyze: () => void api.analysis.queue(jobResult.createdGameIds),
          onViewGames: () => {
            navigate({ name: "games" });
            setOpen(false);
          }
        }
      ),
      watchedJob?.status === "failed" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "callout error", children: watchedJob.error?.message ?? "Import failed." }),
      watchedJob?.status === "cancelled" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "callout warn", children: "Import cancelled." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", style: { justifyContent: "flex-end" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOpen(false), children: "Close" }) })
    ] })
  ] }) });
}
const ONBOARDING_DONE_KEY = "cms-onboarding-done";
function Onboarding() {
  const settings = useStore((s) => s.settings);
  const refreshSettings = useStore((s) => s.refreshSettings);
  const setOnboardingOpen = useStore((s) => s.setOnboardingOpen);
  const setImportModalOpen = useStore((s) => s.setImportModalOpen);
  const navigate = useStore((s) => s.navigate);
  const [step, setStep] = reactExports.useState("identity");
  const [chesscomUsername, setChesscomUsername] = reactExports.useState(settings?.chesscomUsername ?? "");
  const [lichessUsername, setLichessUsername] = reactExports.useState(settings?.lichessUsername ?? "");
  const [ratingCurrent, setRatingCurrent] = reactExports.useState(settings?.ratingCurrent ?? 1500);
  const [saving, setSaving] = reactExports.useState(false);
  function finish() {
    try {
      window.localStorage.setItem(ONBOARDING_DONE_KEY, "true");
    } catch {
    }
    setOnboardingOpen(false);
  }
  async function saveIdentity() {
    setSaving(true);
    try {
      await api.settings.set({
        chesscomUsername: chesscomUsername.trim(),
        lichessUsername: lichessUsername.trim(),
        ratingCurrent
      });
      await refreshSettings();
      if (chesscomUsername.trim() || lichessUsername.trim()) await api.identity.backfill();
      setStep("import");
    } finally {
      setSaving(false);
    }
  }
  const steps = ["identity", "import", "engine"];
  const stepIndex = steps.indexOf(step);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-backdrop", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal", style: { width: 520 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { justifyContent: "space-between", marginBottom: 4 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0 }, children: "Welcome to Chess Mentor Studio" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: finish, children: "Skip setup" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted", style: { marginBottom: 16 }, children: [
      "Step ",
      stepIndex + 1,
      " of ",
      steps.length
    ] }),
    step === "identity" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Tell us who you are so we can tell your games apart from your opponents' — this drives everything else (which side to review, whose mistakes to train)." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
        "Chess.com username",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: chesscomUsername,
            onChange: (e) => setChesscomUsername(e.target.value),
            placeholder: "your-username (optional)"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
        "Lichess username",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: lichessUsername,
            onChange: (e) => setLichessUsername(e.target.value),
            placeholder: "your-username (optional)"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", style: { width: 140 }, children: [
        "Current rating",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            value: ratingCurrent,
            onChange: (e) => setRatingCurrent(parseInt(e.target.value) || 1500)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", style: { justifyContent: "flex-end", marginTop: 8 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "primary", disabled: saving, onClick: () => void saveIdentity(), children: saving ? "Saving…" : "Continue" }) })
    ] }),
    step === "import" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Import your recent games from Chess.com or Lichess, or paste a PGN — this builds your training plan." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "primary",
            onClick: () => {
              setImportModalOpen(true);
              setStep("engine");
            },
            children: "Import my games…"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setStep("engine"), children: "Skip for now" })
      ] })
    ] }),
    step === "engine" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Add a local UCI engine (e.g. Stockfish, free at stockfishchess.org) so imported games can be analyzed for mistakes on this machine. Nothing is sent anywhere — analysis runs locally." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "primary",
            onClick: () => {
              navigate({ name: "engines" });
              finish();
            },
            children: "Set up an engine…"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: finish, children: "Skip for now" })
      ] })
    ] })
  ] }) });
}
const ACTION_LABELS = {
  tactics: "Tactics",
  opening: "Openings",
  endgame: "Endgames",
  calculation: "Calculation",
  strategy: "Strategy",
  "time-management": "Time management"
};
function planStorageKey(date) {
  return `cms-today-plan-${date}`;
}
function loadOrInitStoredTasks(plan) {
  const key = planStorageKey(plan.date);
  try {
    const raw2 = window.localStorage.getItem(key);
    if (raw2) {
      const stored = JSON.parse(raw2);
      const known = new Set(stored.map((t) => t.id));
      const merged = [...stored, ...plan.tasks.filter((t) => !known.has(t.id)).map((t) => ({ id: t.id, title: t.title }))];
      if (merged.length !== stored.length) window.localStorage.setItem(key, JSON.stringify(merged));
      return merged;
    }
  } catch {
  }
  const fresh = plan.tasks.map((t) => ({ id: t.id, title: t.title }));
  try {
    window.localStorage.setItem(key, JSON.stringify(fresh));
  } catch {
  }
  return fresh;
}
function StreakCalendar({ activeDays, streakDays }) {
  const active = reactExports.useMemo(() => new Set(activeDays), [activeDays]);
  const todayStr = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const days = reactExports.useMemo(() => {
    const out = [];
    for (let i = 27; i >= 0; i--) out.push(new Date(Date.now() - i * 864e5).toISOString().slice(0, 10));
    return out;
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", style: { gap: 3, flexWrap: "wrap" }, children: days.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        title: `${d}${active.has(d) ? " · trained" : ""}`,
        style: {
          width: 11,
          height: 11,
          borderRadius: 3,
          background: active.has(d) ? "var(--accent)" : "var(--bg-panel)",
          border: d === todayStr ? "1px solid var(--accent-strong)" : "1px solid var(--border)"
        }
      },
      d
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", style: { marginTop: 4 }, children: streakDays > 0 ? `${streakDays} day streak — keep it going` : "Train today to start a streak" })
  ] });
}
function Today() {
  const [plan, setPlan] = reactExports.useState(null);
  const [storedTasks, setStoredTasks] = reactExports.useState([]);
  const navigate = useStore((s) => s.navigate);
  const setImportModalOpen = useStore((s) => s.setImportModalOpen);
  const settings = useStore((s) => s.settings);
  const refresh = reactExports.useCallback(() => {
    void api.plan.today().then((p) => {
      setPlan(p);
      setStoredTasks(loadOrInitStoredTasks(p));
    });
  }, []);
  reactExports.useEffect(refresh, [refresh]);
  useAppEvent(["games:changed", "exercises:changed", "repertoire:changed", "lessons:changed", "job:completed"], refresh);
  function openTask(task) {
    switch (task.kind) {
      case "import":
        setImportModalOpen(true);
        break;
      case "setup-engine":
        navigate({ name: "engines" });
        break;
      case "exercises":
        navigate({ name: "exercises" });
        break;
      case "opening-review":
        navigate({ name: "openings" });
        break;
      case "game-review":
        if (task.targetId) navigate({ name: "review", gameId: task.targetId });
        else navigate({ name: "games" });
        break;
      case "lesson":
        if (task.targetId) navigate({ name: "lesson", lessonId: task.targetId });
        else navigate({ name: "lessons" });
        break;
    }
  }
  if (!plan) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", children: "Loading your plan…" });
  const firstTask = plan.tasks[0];
  const liveIds = new Set(plan.tasks.map((t) => t.id));
  const completedToday = storedTasks.filter((t) => !liveIds.has(t.id));
  const totalToday = storedTasks.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Today" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "subtitle", children: [
      plan.date,
      " · Weekly theme: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: plan.weeklyTheme })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { alignItems: "stretch", marginBottom: 16, flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { flex: 2, minWidth: 340 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { justifyContent: "space-between" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Today's training plan" }),
          totalToday > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge green", children: [
            completedToday.length,
            " of ",
            totalToday,
            " done"
          ] })
        ] }),
        plan.tasks.length === 0 && completedToday.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", children: "Nothing due right now. Import games or start a lesson to build your plan." }),
        plan.tasks.length === 0 && completedToday.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "callout success", style: { marginBottom: 10 }, children: "Today's plan is complete. Nice work — come back tomorrow, or keep training below." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", children: [
          completedToday.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", style: { justifyContent: "space-between", opacity: 0.55 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textDecoration: "line-through" }, children: [
            "✓ ",
            t.title
          ] }) }, t.id)),
          plan.tasks.map((task, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
                i + 1,
                ". ",
                task.title
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", children: task.detail })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: () => openTask(task), children: "Open" })
          ] }, task.id))
        ] }),
        firstTask && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "primary", style: { marginTop: 14 }, onClick: () => openTask(firstTask), children: "Start today's session" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { flex: 1, minWidth: 220 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { gap: 24 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-big", children: plan.streakDays }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", children: "day streak" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-big", children: [
              settings?.ratingCurrent ?? 1500,
              "→",
              settings?.ratingGoal ?? 1800
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", children: "rating goal" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 12 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(StreakCalendar, { activeDays: plan.activeDays, streakDays: plan.streakDays }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", style: { marginTop: 12, gap: 4 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted", children: [
            plan.dueExercises,
            " exercise",
            plan.dueExercises === 1 ? "" : "s",
            " due"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted", children: [
            plan.dueRepertoire,
            " opening move",
            plan.dueRepertoire === 1 ? "" : "s",
            " due"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted", children: [
            plan.unreviewedGames,
            " analyzed game",
            plan.unreviewedGames === 1 ? "" : "s",
            " to review"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Current weaknesses by impact" }),
      plan.weaknesses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", children: "No diagnosis yet. Import and analyze games — mistakes become your personal curriculum." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col", style: { gap: 6 }, children: plan.weaknesses.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "row clickable",
          style: { gap: 10, cursor: "pointer" },
          onClick: () => navigate({ name: "exercises", tag: w.tag }),
          title: `Practice ${ACTION_LABELS[w.tag] ?? w.tag} exercises`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge yellow", style: { flexShrink: 0 }, children: ACTION_LABELS[w.tag] ?? w.tag }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "muted", children: w.evidence })
          ]
        },
        w.tag
      )) })
    ] })
  ] });
}
function rootNode(comment) {
  return comment !== null ? { comment, variations: [] } : { variations: [] };
}
function node(move, suffix, nag, comment, variations) {
  const node2 = { move, variations };
  if (suffix) {
    node2.suffix = suffix;
  }
  if (nag) {
    node2.nag = nag;
  }
  if (comment !== null) {
    node2.comment = comment;
  }
  return node2;
}
function lineToTree(...nodes) {
  const [root, ...rest] = nodes;
  let parent = root;
  for (const child of rest) {
    if (child !== null) {
      parent.variations = [child, ...child.variations];
      child.variations = [];
      parent = child;
    }
  }
  return root;
}
function pgn(headers, game) {
  if (game.marker && game.marker.comment) {
    let node2 = game.root;
    while (true) {
      const next = node2.variations[0];
      if (!next) {
        node2.comment = game.marker.comment;
        break;
      }
      node2 = next;
    }
  }
  return {
    headers,
    root: game.root,
    result: (game.marker && game.marker.result) ?? void 0
  };
}
function peg$subclass(child, parent) {
  function C() {
    this.constructor = child;
  }
  C.prototype = parent.prototype;
  child.prototype = new C();
}
function peg$SyntaxError(message, expected, found, location) {
  var self = Error.call(this, message);
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(self, peg$SyntaxError.prototype);
  }
  self.expected = expected;
  self.found = found;
  self.location = location;
  self.name = "SyntaxError";
  return self;
}
peg$subclass(peg$SyntaxError, Error);
function peg$padEnd(str, targetLength, padString) {
  padString = padString || " ";
  if (str.length > targetLength) {
    return str;
  }
  targetLength -= str.length;
  padString += padString.repeat(targetLength);
  return str + padString.slice(0, targetLength);
}
peg$SyntaxError.prototype.format = function(sources) {
  var str = "Error: " + this.message;
  if (this.location) {
    var src = null;
    var k;
    for (k = 0; k < sources.length; k++) {
      if (sources[k].source === this.location.source) {
        src = sources[k].text.split(/\r\n|\n|\r/g);
        break;
      }
    }
    var s = this.location.start;
    var offset_s = this.location.source && typeof this.location.source.offset === "function" ? this.location.source.offset(s) : s;
    var loc = this.location.source + ":" + offset_s.line + ":" + offset_s.column;
    if (src) {
      var e = this.location.end;
      var filler = peg$padEnd("", offset_s.line.toString().length, " ");
      var line = src[s.line - 1];
      var last = s.line === e.line ? e.column : line.length + 1;
      var hatLen = last - s.column || 1;
      str += "\n --> " + loc + "\n" + filler + " |\n" + offset_s.line + " | " + line + "\n" + filler + " | " + peg$padEnd("", s.column - 1, " ") + peg$padEnd("", hatLen, "^");
    } else {
      str += "\n at " + loc;
    }
  }
  return str;
};
peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
    literal: function(expectation) {
      return '"' + literalEscape(expectation.text) + '"';
    },
    class: function(expectation) {
      var escapedParts = expectation.parts.map(function(part) {
        return Array.isArray(part) ? classEscape(part[0]) + "-" + classEscape(part[1]) : classEscape(part);
      });
      return "[" + (expectation.inverted ? "^" : "") + escapedParts.join("") + "]";
    },
    any: function() {
      return "any character";
    },
    end: function() {
      return "end of input";
    },
    other: function(expectation) {
      return expectation.description;
    }
  };
  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }
  function literalEscape(s) {
    return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
      return "\\x0" + hex(ch);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
      return "\\x" + hex(ch);
    });
  }
  function classEscape(s) {
    return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
      return "\\x0" + hex(ch);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
      return "\\x" + hex(ch);
    });
  }
  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }
  function describeExpected(expected2) {
    var descriptions = expected2.map(describeExpectation);
    var i, j;
    descriptions.sort();
    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }
    switch (descriptions.length) {
      case 1:
        return descriptions[0];
      case 2:
        return descriptions[0] + " or " + descriptions[1];
      default:
        return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
    }
  }
  function describeFound(found2) {
    return found2 ? '"' + literalEscape(found2) + '"' : "end of input";
  }
  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};
function peg$parse(input, options) {
  options = options !== void 0 ? options : {};
  var peg$FAILED = {};
  var peg$source = options.grammarSource;
  var peg$startRuleFunctions = { pgn: peg$parsepgn };
  var peg$startRuleFunction = peg$parsepgn;
  var peg$c0 = "[";
  var peg$c1 = '"';
  var peg$c2 = "]";
  var peg$c3 = ".";
  var peg$c4 = "O-O-O";
  var peg$c5 = "O-O";
  var peg$c6 = "0-0-0";
  var peg$c7 = "0-0";
  var peg$c8 = "$";
  var peg$c9 = "{";
  var peg$c10 = "}";
  var peg$c11 = ";";
  var peg$c12 = "(";
  var peg$c13 = ")";
  var peg$c14 = "1-0";
  var peg$c15 = "0-1";
  var peg$c16 = "1/2-1/2";
  var peg$c17 = "*";
  var peg$r0 = /^[a-zA-Z]/;
  var peg$r1 = /^[^"]/;
  var peg$r2 = /^[0-9]/;
  var peg$r3 = /^[.]/;
  var peg$r4 = /^[a-zA-Z1-8\-=]/;
  var peg$r5 = /^[+#]/;
  var peg$r6 = /^[!?]/;
  var peg$r7 = /^[^}]/;
  var peg$r8 = /^[^\r\n]/;
  var peg$r9 = /^[ \t\r\n]/;
  var peg$e0 = peg$otherExpectation("tag pair");
  var peg$e1 = peg$literalExpectation("[", false);
  var peg$e2 = peg$literalExpectation('"', false);
  var peg$e3 = peg$literalExpectation("]", false);
  var peg$e4 = peg$otherExpectation("tag name");
  var peg$e5 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false);
  var peg$e6 = peg$otherExpectation("tag value");
  var peg$e7 = peg$classExpectation(['"'], true, false);
  var peg$e8 = peg$otherExpectation("move number");
  var peg$e9 = peg$classExpectation([["0", "9"]], false, false);
  var peg$e10 = peg$literalExpectation(".", false);
  var peg$e11 = peg$classExpectation(["."], false, false);
  var peg$e12 = peg$otherExpectation("standard algebraic notation");
  var peg$e13 = peg$literalExpectation("O-O-O", false);
  var peg$e14 = peg$literalExpectation("O-O", false);
  var peg$e15 = peg$literalExpectation("0-0-0", false);
  var peg$e16 = peg$literalExpectation("0-0", false);
  var peg$e17 = peg$classExpectation([["a", "z"], ["A", "Z"], ["1", "8"], "-", "="], false, false);
  var peg$e18 = peg$classExpectation(["+", "#"], false, false);
  var peg$e19 = peg$otherExpectation("suffix annotation");
  var peg$e20 = peg$classExpectation(["!", "?"], false, false);
  var peg$e21 = peg$otherExpectation("NAG");
  var peg$e22 = peg$literalExpectation("$", false);
  var peg$e23 = peg$otherExpectation("brace comment");
  var peg$e24 = peg$literalExpectation("{", false);
  var peg$e25 = peg$classExpectation(["}"], true, false);
  var peg$e26 = peg$literalExpectation("}", false);
  var peg$e27 = peg$otherExpectation("rest of line comment");
  var peg$e28 = peg$literalExpectation(";", false);
  var peg$e29 = peg$classExpectation(["\r", "\n"], true, false);
  var peg$e30 = peg$otherExpectation("variation");
  var peg$e31 = peg$literalExpectation("(", false);
  var peg$e32 = peg$literalExpectation(")", false);
  var peg$e33 = peg$otherExpectation("game termination marker");
  var peg$e34 = peg$literalExpectation("1-0", false);
  var peg$e35 = peg$literalExpectation("0-1", false);
  var peg$e36 = peg$literalExpectation("1/2-1/2", false);
  var peg$e37 = peg$literalExpectation("*", false);
  var peg$e38 = peg$otherExpectation("whitespace");
  var peg$e39 = peg$classExpectation([" ", "	", "\r", "\n"], false, false);
  var peg$f0 = function(headers, game) {
    return pgn(headers, game);
  };
  var peg$f1 = function(tagPairs) {
    return Object.fromEntries(tagPairs);
  };
  var peg$f2 = function(tagName, tagValue) {
    return [tagName, tagValue];
  };
  var peg$f3 = function(root, marker) {
    return { root, marker };
  };
  var peg$f4 = function(comment, moves) {
    return lineToTree(rootNode(comment), ...moves.flat());
  };
  var peg$f5 = function(san, suffix, nag, comment, variations) {
    return node(san, suffix, nag, comment, variations);
  };
  var peg$f6 = function(nag) {
    return nag;
  };
  var peg$f7 = function(comment) {
    return comment.replace(/[\r\n]+/g, " ");
  };
  var peg$f8 = function(comment) {
    return comment.trim();
  };
  var peg$f9 = function(line) {
    return line;
  };
  var peg$f10 = function(result, comment) {
    return { result, comment };
  };
  var peg$currPos = options.peg$currPos | 0;
  var peg$posDetailsCache = [{ line: 1, column: 1 }];
  var peg$maxFailPos = peg$currPos;
  var peg$maxFailExpected = options.peg$maxFailExpected || [];
  var peg$silentFails = options.peg$silentFails | 0;
  var peg$result;
  if (options.startRule) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error(`Can't start parsing from rule "` + options.startRule + '".');
    }
    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }
  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text, ignoreCase };
  }
  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts, inverted, ignoreCase };
  }
  function peg$endExpectation() {
    return { type: "end" };
  }
  function peg$otherExpectation(description) {
    return { type: "other", description };
  }
  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos];
    var p;
    if (details) {
      return details;
    } else {
      if (pos >= peg$posDetailsCache.length) {
        p = peg$posDetailsCache.length - 1;
      } else {
        p = pos;
        while (!peg$posDetailsCache[--p]) {
        }
      }
      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };
      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }
        p++;
      }
      peg$posDetailsCache[pos] = details;
      return details;
    }
  }
  function peg$computeLocation(startPos, endPos, offset) {
    var startPosDetails = peg$computePosDetails(startPos);
    var endPosDetails = peg$computePosDetails(endPos);
    var res = {
      source: peg$source,
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
    return res;
  }
  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) {
      return;
    }
    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }
    peg$maxFailExpected.push(expected);
  }
  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }
  function peg$parsepgn() {
    var s0, s1, s2;
    s0 = peg$currPos;
    s1 = peg$parsetagPairSection();
    s2 = peg$parsemoveTextSection();
    s0 = peg$f0(s1, s2);
    return s0;
  }
  function peg$parsetagPairSection() {
    var s0, s1, s2;
    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parsetagPair();
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parsetagPair();
    }
    s2 = peg$parse_();
    s0 = peg$f1(s1);
    return s0;
  }
  function peg$parsetagPair() {
    var s0, s2, s4, s6, s7, s8, s10;
    peg$silentFails++;
    s0 = peg$currPos;
    peg$parse_();
    if (input.charCodeAt(peg$currPos) === 91) {
      s2 = peg$c0;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e1);
      }
    }
    if (s2 !== peg$FAILED) {
      peg$parse_();
      s4 = peg$parsetagName();
      if (s4 !== peg$FAILED) {
        peg$parse_();
        if (input.charCodeAt(peg$currPos) === 34) {
          s6 = peg$c1;
          peg$currPos++;
        } else {
          s6 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e2);
          }
        }
        if (s6 !== peg$FAILED) {
          s7 = peg$parsetagValue();
          if (input.charCodeAt(peg$currPos) === 34) {
            s8 = peg$c1;
            peg$currPos++;
          } else {
            s8 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e2);
            }
          }
          if (s8 !== peg$FAILED) {
            peg$parse_();
            if (input.charCodeAt(peg$currPos) === 93) {
              s10 = peg$c2;
              peg$currPos++;
            } else {
              s10 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e3);
              }
            }
            if (s10 !== peg$FAILED) {
              s0 = peg$f2(s4, s7);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      if (peg$silentFails === 0) {
        peg$fail(peg$e0);
      }
    }
    return s0;
  }
  function peg$parsetagName() {
    var s0, s1, s2;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    s2 = input.charAt(peg$currPos);
    if (peg$r0.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e5);
      }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = input.charAt(peg$currPos);
        if (peg$r0.test(s2)) {
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e5);
          }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e4);
      }
    }
    return s0;
  }
  function peg$parsetagValue() {
    var s0, s1, s2;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    s2 = input.charAt(peg$currPos);
    if (peg$r1.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e7);
      }
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = input.charAt(peg$currPos);
      if (peg$r1.test(s2)) {
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e7);
        }
      }
    }
    s0 = input.substring(s0, peg$currPos);
    peg$silentFails--;
    s1 = peg$FAILED;
    if (peg$silentFails === 0) {
      peg$fail(peg$e6);
    }
    return s0;
  }
  function peg$parsemoveTextSection() {
    var s0, s1, s3;
    s0 = peg$currPos;
    s1 = peg$parseline();
    peg$parse_();
    s3 = peg$parsegameTerminationMarker();
    if (s3 === peg$FAILED) {
      s3 = null;
    }
    peg$parse_();
    s0 = peg$f3(s1, s3);
    return s0;
  }
  function peg$parseline() {
    var s0, s1, s2, s3;
    s0 = peg$currPos;
    s1 = peg$parsecomment();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    s2 = [];
    s3 = peg$parsemove();
    while (s3 !== peg$FAILED) {
      s2.push(s3);
      s3 = peg$parsemove();
    }
    s0 = peg$f4(s1, s2);
    return s0;
  }
  function peg$parsemove() {
    var s0, s4, s5, s6, s7, s8, s9, s10;
    s0 = peg$currPos;
    peg$parse_();
    peg$parsemoveNumber();
    peg$parse_();
    s4 = peg$parsesan();
    if (s4 !== peg$FAILED) {
      s5 = peg$parsesuffixAnnotation();
      if (s5 === peg$FAILED) {
        s5 = null;
      }
      s6 = [];
      s7 = peg$parsenag();
      while (s7 !== peg$FAILED) {
        s6.push(s7);
        s7 = peg$parsenag();
      }
      s7 = peg$parse_();
      s8 = peg$parsecomment();
      if (s8 === peg$FAILED) {
        s8 = null;
      }
      s9 = [];
      s10 = peg$parsevariation();
      while (s10 !== peg$FAILED) {
        s9.push(s10);
        s10 = peg$parsevariation();
      }
      s0 = peg$f5(s4, s5, s6, s8, s9);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    return s0;
  }
  function peg$parsemoveNumber() {
    var s0, s1, s2, s3, s4, s5;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    s2 = input.charAt(peg$currPos);
    if (peg$r2.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e9);
      }
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = input.charAt(peg$currPos);
      if (peg$r2.test(s2)) {
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e9);
        }
      }
    }
    if (input.charCodeAt(peg$currPos) === 46) {
      s2 = peg$c3;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e10);
      }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parse_();
      s4 = [];
      s5 = input.charAt(peg$currPos);
      if (peg$r3.test(s5)) {
        peg$currPos++;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e11);
        }
      }
      while (s5 !== peg$FAILED) {
        s4.push(s5);
        s5 = input.charAt(peg$currPos);
        if (peg$r3.test(s5)) {
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e11);
          }
        }
      }
      s1 = [s1, s2, s3, s4];
      s0 = s1;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e8);
      }
    }
    return s0;
  }
  function peg$parsesan() {
    var s0, s1, s2, s3, s4, s5;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$currPos;
    if (input.substr(peg$currPos, 5) === peg$c4) {
      s2 = peg$c4;
      peg$currPos += 5;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e13);
      }
    }
    if (s2 === peg$FAILED) {
      if (input.substr(peg$currPos, 3) === peg$c5) {
        s2 = peg$c5;
        peg$currPos += 3;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e14);
        }
      }
      if (s2 === peg$FAILED) {
        if (input.substr(peg$currPos, 5) === peg$c6) {
          s2 = peg$c6;
          peg$currPos += 5;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e15);
          }
        }
        if (s2 === peg$FAILED) {
          if (input.substr(peg$currPos, 3) === peg$c7) {
            s2 = peg$c7;
            peg$currPos += 3;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e16);
            }
          }
          if (s2 === peg$FAILED) {
            s2 = peg$currPos;
            s3 = input.charAt(peg$currPos);
            if (peg$r0.test(s3)) {
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$e5);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = [];
              s5 = input.charAt(peg$currPos);
              if (peg$r4.test(s5)) {
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$e17);
                }
              }
              if (s5 !== peg$FAILED) {
                while (s5 !== peg$FAILED) {
                  s4.push(s5);
                  s5 = input.charAt(peg$currPos);
                  if (peg$r4.test(s5)) {
                    peg$currPos++;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$e17);
                    }
                  }
                }
              } else {
                s4 = peg$FAILED;
              }
              if (s4 !== peg$FAILED) {
                s3 = [s3, s4];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          }
        }
      }
    }
    if (s2 !== peg$FAILED) {
      s3 = input.charAt(peg$currPos);
      if (peg$r5.test(s3)) {
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e18);
        }
      }
      if (s3 === peg$FAILED) {
        s3 = null;
      }
      s2 = [s2, s3];
      s1 = s2;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e12);
      }
    }
    return s0;
  }
  function peg$parsesuffixAnnotation() {
    var s0, s1, s2;
    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    s2 = input.charAt(peg$currPos);
    if (peg$r6.test(s2)) {
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e20);
      }
    }
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      if (s1.length >= 2) {
        s2 = peg$FAILED;
      } else {
        s2 = input.charAt(peg$currPos);
        if (peg$r6.test(s2)) {
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e20);
          }
        }
      }
    }
    if (s1.length < 1) {
      peg$currPos = s0;
      s0 = peg$FAILED;
    } else {
      s0 = s1;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e19);
      }
    }
    return s0;
  }
  function peg$parsenag() {
    var s0, s2, s3, s4, s5;
    peg$silentFails++;
    s0 = peg$currPos;
    peg$parse_();
    if (input.charCodeAt(peg$currPos) === 36) {
      s2 = peg$c8;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e22);
      }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$currPos;
      s4 = [];
      s5 = input.charAt(peg$currPos);
      if (peg$r2.test(s5)) {
        peg$currPos++;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e9);
        }
      }
      if (s5 !== peg$FAILED) {
        while (s5 !== peg$FAILED) {
          s4.push(s5);
          s5 = input.charAt(peg$currPos);
          if (peg$r2.test(s5)) {
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e9);
            }
          }
        }
      } else {
        s4 = peg$FAILED;
      }
      if (s4 !== peg$FAILED) {
        s3 = input.substring(s3, peg$currPos);
      } else {
        s3 = s4;
      }
      if (s3 !== peg$FAILED) {
        s0 = peg$f6(s3);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      if (peg$silentFails === 0) {
        peg$fail(peg$e21);
      }
    }
    return s0;
  }
  function peg$parsecomment() {
    var s0;
    s0 = peg$parsebraceComment();
    if (s0 === peg$FAILED) {
      s0 = peg$parserestOfLineComment();
    }
    return s0;
  }
  function peg$parsebraceComment() {
    var s0, s1, s2, s3, s4;
    peg$silentFails++;
    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 123) {
      s1 = peg$c9;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e24);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = [];
      s4 = input.charAt(peg$currPos);
      if (peg$r7.test(s4)) {
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e25);
        }
      }
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = input.charAt(peg$currPos);
        if (peg$r7.test(s4)) {
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e25);
          }
        }
      }
      s2 = input.substring(s2, peg$currPos);
      if (input.charCodeAt(peg$currPos) === 125) {
        s3 = peg$c10;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e26);
        }
      }
      if (s3 !== peg$FAILED) {
        s0 = peg$f7(s2);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e23);
      }
    }
    return s0;
  }
  function peg$parserestOfLineComment() {
    var s0, s1, s2, s3, s4;
    peg$silentFails++;
    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 59) {
      s1 = peg$c11;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e28);
      }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = [];
      s4 = input.charAt(peg$currPos);
      if (peg$r8.test(s4)) {
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e29);
        }
      }
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = input.charAt(peg$currPos);
        if (peg$r8.test(s4)) {
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e29);
          }
        }
      }
      s2 = input.substring(s2, peg$currPos);
      s0 = peg$f8(s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e27);
      }
    }
    return s0;
  }
  function peg$parsevariation() {
    var s0, s2, s3, s5;
    peg$silentFails++;
    s0 = peg$currPos;
    peg$parse_();
    if (input.charCodeAt(peg$currPos) === 40) {
      s2 = peg$c12;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e31);
      }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parseline();
      if (s3 !== peg$FAILED) {
        peg$parse_();
        if (input.charCodeAt(peg$currPos) === 41) {
          s5 = peg$c13;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e32);
          }
        }
        if (s5 !== peg$FAILED) {
          s0 = peg$f9(s3);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      if (peg$silentFails === 0) {
        peg$fail(peg$e30);
      }
    }
    return s0;
  }
  function peg$parsegameTerminationMarker() {
    var s0, s1, s3;
    peg$silentFails++;
    s0 = peg$currPos;
    if (input.substr(peg$currPos, 3) === peg$c14) {
      s1 = peg$c14;
      peg$currPos += 3;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e34);
      }
    }
    if (s1 === peg$FAILED) {
      if (input.substr(peg$currPos, 3) === peg$c15) {
        s1 = peg$c15;
        peg$currPos += 3;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e35);
        }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 7) === peg$c16) {
          s1 = peg$c16;
          peg$currPos += 7;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$e36);
          }
        }
        if (s1 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 42) {
            s1 = peg$c17;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$e37);
            }
          }
        }
      }
    }
    if (s1 !== peg$FAILED) {
      peg$parse_();
      s3 = peg$parsecomment();
      if (s3 === peg$FAILED) {
        s3 = null;
      }
      s0 = peg$f10(s1, s3);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e33);
      }
    }
    return s0;
  }
  function peg$parse_() {
    var s0, s1;
    peg$silentFails++;
    s0 = [];
    s1 = input.charAt(peg$currPos);
    if (peg$r9.test(s1)) {
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) {
        peg$fail(peg$e39);
      }
    }
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      s1 = input.charAt(peg$currPos);
      if (peg$r9.test(s1)) {
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$e39);
        }
      }
    }
    peg$silentFails--;
    s1 = peg$FAILED;
    if (peg$silentFails === 0) {
      peg$fail(peg$e38);
    }
    return s0;
  }
  peg$result = peg$startRuleFunction();
  if (options.peg$library) {
    return (
      /** @type {any} */
      {
        peg$result,
        peg$currPos,
        peg$FAILED,
        peg$maxFailExpected,
        peg$maxFailPos
      }
    );
  }
  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }
    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}
const MASK64 = 0xffffffffffffffffn;
function rotl(x, k) {
  return (x << k | x >> 64n - k) & 0xffffffffffffffffn;
}
function wrappingMul(x, y) {
  return x * y & MASK64;
}
function xoroshiro128(state) {
  return function() {
    let s0 = BigInt(state & MASK64);
    let s1 = BigInt(state >> 64n & MASK64);
    const result = wrappingMul(rotl(wrappingMul(s0, 5n), 7n), 9n);
    s1 ^= s0;
    s0 = (rotl(s0, 24n) ^ s1 ^ s1 << 16n) & MASK64;
    s1 = rotl(s1, 37n);
    state = s1 << 64n | s0;
    return result;
  };
}
const rand = xoroshiro128(0xa187eb39cdcaed8f31c4b365b102e01en);
const PIECE_KEYS = Array.from({ length: 2 }, () => Array.from({ length: 6 }, () => Array.from({ length: 128 }, () => rand())));
const EP_KEYS = Array.from({ length: 8 }, () => rand());
const CASTLING_KEYS = Array.from({ length: 16 }, () => rand());
const SIDE_KEY = rand();
const WHITE = "w";
const BLACK = "b";
const PAWN = "p";
const KNIGHT = "n";
const BISHOP = "b";
const ROOK = "r";
const QUEEN = "q";
const KING = "k";
const DEFAULT_POSITION = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
class Move {
  color;
  from;
  to;
  piece;
  captured;
  promotion;
  /**
   * @deprecated This field is deprecated and will be removed in version 2.0.0.
   * Please use move descriptor functions instead: `isCapture`, `isPromotion`,
   * `isEnPassant`, `isKingsideCastle`, `isQueensideCastle`, `isCastle`, and
   * `isBigPawn`
   */
  flags;
  san;
  lan;
  before;
  after;
  constructor(chess, internal) {
    const { color, piece, from, to, flags, captured, promotion } = internal;
    const fromAlgebraic = algebraic(from);
    const toAlgebraic = algebraic(to);
    this.color = color;
    this.piece = piece;
    this.from = fromAlgebraic;
    this.to = toAlgebraic;
    this.san = chess["_moveToSan"](internal, chess["_moves"]({ legal: true }));
    this.lan = fromAlgebraic + toAlgebraic;
    this.before = chess.fen();
    chess["_makeMove"](internal);
    this.after = chess.fen();
    chess["_undoMove"]();
    this.flags = "";
    for (const flag in BITS) {
      if (BITS[flag] & flags) {
        this.flags += FLAGS[flag];
      }
    }
    if (captured) {
      this.captured = captured;
    }
    if (promotion) {
      this.promotion = promotion;
      this.lan += promotion;
    }
  }
  isCapture() {
    return this.flags.indexOf(FLAGS["CAPTURE"]) > -1;
  }
  isPromotion() {
    return this.flags.indexOf(FLAGS["PROMOTION"]) > -1;
  }
  isEnPassant() {
    return this.flags.indexOf(FLAGS["EP_CAPTURE"]) > -1;
  }
  isKingsideCastle() {
    return this.flags.indexOf(FLAGS["KSIDE_CASTLE"]) > -1;
  }
  isQueensideCastle() {
    return this.flags.indexOf(FLAGS["QSIDE_CASTLE"]) > -1;
  }
  isBigPawn() {
    return this.flags.indexOf(FLAGS["BIG_PAWN"]) > -1;
  }
}
const EMPTY = -1;
const FLAGS = {
  NORMAL: "n",
  CAPTURE: "c",
  BIG_PAWN: "b",
  EP_CAPTURE: "e",
  PROMOTION: "p",
  KSIDE_CASTLE: "k",
  QSIDE_CASTLE: "q",
  NULL_MOVE: "-"
};
const BITS = {
  NORMAL: 1,
  CAPTURE: 2,
  BIG_PAWN: 4,
  EP_CAPTURE: 8,
  PROMOTION: 16,
  KSIDE_CASTLE: 32,
  QSIDE_CASTLE: 64,
  NULL_MOVE: 128
};
const SEVEN_TAG_ROSTER = {
  Event: "?",
  Site: "?",
  Date: "????.??.??",
  Round: "?",
  White: "?",
  Black: "?",
  Result: "*"
};
const SUPLEMENTAL_TAGS = {
  WhiteTitle: null,
  BlackTitle: null,
  WhiteElo: null,
  BlackElo: null,
  WhiteUSCF: null,
  BlackUSCF: null,
  WhiteNA: null,
  BlackNA: null,
  WhiteType: null,
  BlackType: null,
  EventDate: null,
  EventSponsor: null,
  Section: null,
  Stage: null,
  Board: null,
  Opening: null,
  Variation: null,
  SubVariation: null,
  ECO: null,
  NIC: null,
  Time: null,
  UTCTime: null,
  UTCDate: null,
  TimeControl: null,
  SetUp: null,
  FEN: null,
  Termination: null,
  Annotator: null,
  Mode: null,
  PlyCount: null
};
const HEADER_TEMPLATE = {
  ...SEVEN_TAG_ROSTER,
  ...SUPLEMENTAL_TAGS
};
const Ox88 = {
  a8: 0,
  b8: 1,
  c8: 2,
  d8: 3,
  e8: 4,
  f8: 5,
  g8: 6,
  h8: 7,
  a7: 16,
  b7: 17,
  c7: 18,
  d7: 19,
  e7: 20,
  f7: 21,
  g7: 22,
  h7: 23,
  a6: 32,
  b6: 33,
  c6: 34,
  d6: 35,
  e6: 36,
  f6: 37,
  g6: 38,
  h6: 39,
  a5: 48,
  b5: 49,
  c5: 50,
  d5: 51,
  e5: 52,
  f5: 53,
  g5: 54,
  h5: 55,
  a4: 64,
  b4: 65,
  c4: 66,
  d4: 67,
  e4: 68,
  f4: 69,
  g4: 70,
  h4: 71,
  a3: 80,
  b3: 81,
  c3: 82,
  d3: 83,
  e3: 84,
  f3: 85,
  g3: 86,
  h3: 87,
  a2: 96,
  b2: 97,
  c2: 98,
  d2: 99,
  e2: 100,
  f2: 101,
  g2: 102,
  h2: 103,
  a1: 112,
  b1: 113,
  c1: 114,
  d1: 115,
  e1: 116,
  f1: 117,
  g1: 118,
  h1: 119
};
const PAWN_OFFSETS = {
  b: [16, 32, 17, 15],
  w: [-16, -32, -17, -15]
};
const PIECE_OFFSETS = {
  n: [-18, -33, -31, -14, 18, 33, 31, 14],
  b: [-17, -15, 17, 15],
  r: [-16, 1, 16, -1],
  q: [-17, -16, -15, 1, 17, 16, 15, -1],
  k: [-17, -16, -15, 1, 17, 16, 15, -1]
};
const ATTACKS = [
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  24,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  2,
  24,
  2,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  2,
  53,
  56,
  53,
  2,
  0,
  0,
  0,
  0,
  0,
  0,
  24,
  24,
  24,
  24,
  24,
  24,
  56,
  0,
  56,
  24,
  24,
  24,
  24,
  24,
  24,
  0,
  0,
  0,
  0,
  0,
  0,
  2,
  53,
  56,
  53,
  2,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  2,
  24,
  2,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  24,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  0,
  20,
  0,
  0,
  20,
  0,
  0,
  0,
  0,
  0,
  0,
  24,
  0,
  0,
  0,
  0,
  0,
  0,
  20
];
const RAYS = [
  17,
  0,
  0,
  0,
  0,
  0,
  0,
  16,
  0,
  0,
  0,
  0,
  0,
  0,
  15,
  0,
  0,
  17,
  0,
  0,
  0,
  0,
  0,
  16,
  0,
  0,
  0,
  0,
  0,
  15,
  0,
  0,
  0,
  0,
  17,
  0,
  0,
  0,
  0,
  16,
  0,
  0,
  0,
  0,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  17,
  0,
  0,
  0,
  16,
  0,
  0,
  0,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  17,
  0,
  0,
  16,
  0,
  0,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  17,
  0,
  16,
  0,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  17,
  16,
  15,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  -1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  -16,
  -17,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  0,
  -16,
  0,
  -17,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  0,
  0,
  -16,
  0,
  0,
  -17,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  0,
  0,
  0,
  -16,
  0,
  0,
  0,
  -17,
  0,
  0,
  0,
  0,
  0,
  0,
  -15,
  0,
  0,
  0,
  0,
  -16,
  0,
  0,
  0,
  0,
  -17,
  0,
  0,
  0,
  0,
  -15,
  0,
  0,
  0,
  0,
  0,
  -16,
  0,
  0,
  0,
  0,
  0,
  -17,
  0,
  0,
  -15,
  0,
  0,
  0,
  0,
  0,
  0,
  -16,
  0,
  0,
  0,
  0,
  0,
  0,
  -17
];
const PIECE_MASKS = { p: 1, n: 2, b: 4, r: 8, q: 16, k: 32 };
const SYMBOLS = "pnbrqkPNBRQK";
const PROMOTIONS = [KNIGHT, BISHOP, ROOK, QUEEN];
const RANK_1 = 7;
const RANK_2 = 6;
const RANK_7 = 1;
const RANK_8 = 0;
const SIDES = {
  [KING]: BITS.KSIDE_CASTLE,
  [QUEEN]: BITS.QSIDE_CASTLE
};
const ROOKS = {
  w: [
    { square: Ox88.a1, flag: BITS.QSIDE_CASTLE },
    { square: Ox88.h1, flag: BITS.KSIDE_CASTLE }
  ],
  b: [
    { square: Ox88.a8, flag: BITS.QSIDE_CASTLE },
    { square: Ox88.h8, flag: BITS.KSIDE_CASTLE }
  ]
};
const SECOND_RANK = { b: RANK_7, w: RANK_2 };
const SAN_NULLMOVE = "--";
function rank(square) {
  return square >> 4;
}
function file(square) {
  return square & 15;
}
function isDigit(c) {
  return "0123456789".indexOf(c) !== -1;
}
function algebraic(square) {
  const f = file(square);
  const r = rank(square);
  return "abcdefgh".substring(f, f + 1) + "87654321".substring(r, r + 1);
}
function swapColor(color) {
  return color === WHITE ? BLACK : WHITE;
}
function validateFen(fen) {
  const tokens = fen.split(/\s+/);
  if (tokens.length !== 6) {
    return {
      ok: false,
      error: "Invalid FEN: must contain six space-delimited fields"
    };
  }
  const moveNumber = parseInt(tokens[5], 10);
  if (isNaN(moveNumber) || moveNumber <= 0) {
    return {
      ok: false,
      error: "Invalid FEN: move number must be a positive integer"
    };
  }
  const halfMoves = parseInt(tokens[4], 10);
  if (isNaN(halfMoves) || halfMoves < 0) {
    return {
      ok: false,
      error: "Invalid FEN: half move counter number must be a non-negative integer"
    };
  }
  if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
    return { ok: false, error: "Invalid FEN: en-passant square is invalid" };
  }
  if (/[^kKqQ-]/.test(tokens[2])) {
    return { ok: false, error: "Invalid FEN: castling availability is invalid" };
  }
  if (!/^(w|b)$/.test(tokens[1])) {
    return { ok: false, error: "Invalid FEN: side-to-move is invalid" };
  }
  const rows = tokens[0].split("/");
  if (rows.length !== 8) {
    return {
      ok: false,
      error: "Invalid FEN: piece data does not contain 8 '/'-delimited rows"
    };
  }
  for (let i = 0; i < rows.length; i++) {
    let sumFields = 0;
    let previousWasNumber = false;
    for (let k = 0; k < rows[i].length; k++) {
      if (isDigit(rows[i][k])) {
        if (previousWasNumber) {
          return {
            ok: false,
            error: "Invalid FEN: piece data is invalid (consecutive number)"
          };
        }
        sumFields += parseInt(rows[i][k], 10);
        previousWasNumber = true;
      } else {
        if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
          return {
            ok: false,
            error: "Invalid FEN: piece data is invalid (invalid piece)"
          };
        }
        sumFields += 1;
        previousWasNumber = false;
      }
    }
    if (sumFields !== 8) {
      return {
        ok: false,
        error: "Invalid FEN: piece data is invalid (too many squares in rank)"
      };
    }
  }
  if (tokens[3][1] == "3" && tokens[1] == "w" || tokens[3][1] == "6" && tokens[1] == "b") {
    return { ok: false, error: "Invalid FEN: illegal en-passant square" };
  }
  const kings = [
    { color: "white", regex: /K/g },
    { color: "black", regex: /k/g }
  ];
  for (const { color, regex } of kings) {
    if (!regex.test(tokens[0])) {
      return { ok: false, error: `Invalid FEN: missing ${color} king` };
    }
    if ((tokens[0].match(regex) || []).length > 1) {
      return { ok: false, error: `Invalid FEN: too many ${color} kings` };
    }
  }
  if (Array.from(rows[0] + rows[7]).some((char) => char.toUpperCase() === "P")) {
    return {
      ok: false,
      error: "Invalid FEN: some pawns are on the edge rows"
    };
  }
  return { ok: true };
}
function getDisambiguator(move, moves) {
  const from = move.from;
  const to = move.to;
  const piece = move.piece;
  let ambiguities = 0;
  let sameRank = 0;
  let sameFile = 0;
  for (let i = 0, len = moves.length; i < len; i++) {
    const ambigFrom = moves[i].from;
    const ambigTo = moves[i].to;
    const ambigPiece = moves[i].piece;
    if (piece === ambigPiece && from !== ambigFrom && to === ambigTo) {
      ambiguities++;
      if (rank(from) === rank(ambigFrom)) {
        sameRank++;
      }
      if (file(from) === file(ambigFrom)) {
        sameFile++;
      }
    }
  }
  if (ambiguities > 0) {
    if (sameRank > 0 && sameFile > 0) {
      return algebraic(from);
    } else if (sameFile > 0) {
      return algebraic(from).charAt(1);
    } else {
      return algebraic(from).charAt(0);
    }
  }
  return "";
}
function addMove(moves, color, from, to, piece, captured = void 0, flags = BITS.NORMAL) {
  const r = rank(to);
  if (piece === PAWN && (r === RANK_1 || r === RANK_8)) {
    for (let i = 0; i < PROMOTIONS.length; i++) {
      const promotion = PROMOTIONS[i];
      moves.push({
        color,
        from,
        to,
        piece,
        captured,
        promotion,
        flags: flags | BITS.PROMOTION
      });
    }
  } else {
    moves.push({
      color,
      from,
      to,
      piece,
      captured,
      flags
    });
  }
}
function inferPieceType(san) {
  let pieceType = san.charAt(0);
  if (pieceType >= "a" && pieceType <= "h") {
    const matches = san.match(/[a-h]\d.*[a-h]\d/);
    if (matches) {
      return void 0;
    }
    return PAWN;
  }
  pieceType = pieceType.toLowerCase();
  if (pieceType === "o") {
    return KING;
  }
  return pieceType;
}
function strippedSan(move) {
  return move.replace(/=/, "").replace(/[+#]?[?!]*$/, "");
}
class Chess {
  _board = new Array(128);
  _turn = WHITE;
  _header = {};
  _kings = { w: EMPTY, b: EMPTY };
  _epSquare = -1;
  _halfMoves = 0;
  _moveNumber = 0;
  _history = [];
  _comments = {};
  _castling = { w: 0, b: 0 };
  _hash = 0n;
  // tracks number of times a position has been seen for repetition checking
  _positionCount = /* @__PURE__ */ new Map();
  constructor(fen = DEFAULT_POSITION, { skipValidation = false } = {}) {
    this.load(fen, { skipValidation });
  }
  clear({ preserveHeaders = false } = {}) {
    this._board = new Array(128);
    this._kings = { w: EMPTY, b: EMPTY };
    this._turn = WHITE;
    this._castling = { w: 0, b: 0 };
    this._epSquare = EMPTY;
    this._halfMoves = 0;
    this._moveNumber = 1;
    this._history = [];
    this._comments = {};
    this._header = preserveHeaders ? this._header : { ...HEADER_TEMPLATE };
    this._hash = this._computeHash();
    this._positionCount = /* @__PURE__ */ new Map();
    this._header["SetUp"] = null;
    this._header["FEN"] = null;
  }
  load(fen, { skipValidation = false, preserveHeaders = false } = {}) {
    let tokens = fen.split(/\s+/);
    if (tokens.length >= 2 && tokens.length < 6) {
      const adjustments = ["-", "-", "0", "1"];
      fen = tokens.concat(adjustments.slice(-(6 - tokens.length))).join(" ");
    }
    tokens = fen.split(/\s+/);
    if (!skipValidation) {
      const { ok, error } = validateFen(fen);
      if (!ok) {
        throw new Error(error);
      }
    }
    const position = tokens[0];
    let square = 0;
    this.clear({ preserveHeaders });
    for (let i = 0; i < position.length; i++) {
      const piece = position.charAt(i);
      if (piece === "/") {
        square += 8;
      } else if (isDigit(piece)) {
        square += parseInt(piece, 10);
      } else {
        const color = piece < "a" ? WHITE : BLACK;
        this._put({ type: piece.toLowerCase(), color }, algebraic(square));
        square++;
      }
    }
    this._turn = tokens[1];
    if (tokens[2].indexOf("K") > -1) {
      this._castling.w |= BITS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf("Q") > -1) {
      this._castling.w |= BITS.QSIDE_CASTLE;
    }
    if (tokens[2].indexOf("k") > -1) {
      this._castling.b |= BITS.KSIDE_CASTLE;
    }
    if (tokens[2].indexOf("q") > -1) {
      this._castling.b |= BITS.QSIDE_CASTLE;
    }
    this._epSquare = tokens[3] === "-" ? EMPTY : Ox88[tokens[3]];
    this._halfMoves = parseInt(tokens[4], 10);
    this._moveNumber = parseInt(tokens[5], 10);
    this._hash = this._computeHash();
    this._updateSetup(fen);
    this._incPositionCount();
  }
  fen({ forceEnpassantSquare = false } = {}) {
    let empty = 0;
    let fen = "";
    for (let i = Ox88.a8; i <= Ox88.h1; i++) {
      if (this._board[i]) {
        if (empty > 0) {
          fen += empty;
          empty = 0;
        }
        const { color, type: piece } = this._board[i];
        fen += color === WHITE ? piece.toUpperCase() : piece.toLowerCase();
      } else {
        empty++;
      }
      if (i + 1 & 136) {
        if (empty > 0) {
          fen += empty;
        }
        if (i !== Ox88.h1) {
          fen += "/";
        }
        empty = 0;
        i += 8;
      }
    }
    let castling = "";
    if (this._castling[WHITE] & BITS.KSIDE_CASTLE) {
      castling += "K";
    }
    if (this._castling[WHITE] & BITS.QSIDE_CASTLE) {
      castling += "Q";
    }
    if (this._castling[BLACK] & BITS.KSIDE_CASTLE) {
      castling += "k";
    }
    if (this._castling[BLACK] & BITS.QSIDE_CASTLE) {
      castling += "q";
    }
    castling = castling || "-";
    let epSquare = "-";
    if (this._epSquare !== EMPTY) {
      if (forceEnpassantSquare) {
        epSquare = algebraic(this._epSquare);
      } else {
        const bigPawnSquare = this._epSquare + (this._turn === WHITE ? 16 : -16);
        const squares = [bigPawnSquare + 1, bigPawnSquare - 1];
        for (const square of squares) {
          if (square & 136) {
            continue;
          }
          const color = this._turn;
          if (this._board[square]?.color === color && this._board[square]?.type === PAWN) {
            this._makeMove({
              color,
              from: square,
              to: this._epSquare,
              piece: PAWN,
              captured: PAWN,
              flags: BITS.EP_CAPTURE
            });
            const isLegal = !this._isKingAttacked(color);
            this._undoMove();
            if (isLegal) {
              epSquare = algebraic(this._epSquare);
              break;
            }
          }
        }
      }
    }
    return [
      fen,
      this._turn,
      castling,
      epSquare,
      this._halfMoves,
      this._moveNumber
    ].join(" ");
  }
  _pieceKey(i) {
    if (!this._board[i]) {
      return 0n;
    }
    const { color, type } = this._board[i];
    const colorIndex = {
      w: 0,
      b: 1
    }[color];
    const typeIndex = {
      p: 0,
      n: 1,
      b: 2,
      r: 3,
      q: 4,
      k: 5
    }[type];
    return PIECE_KEYS[colorIndex][typeIndex][i];
  }
  _epKey() {
    return this._epSquare === EMPTY ? 0n : EP_KEYS[this._epSquare & 7];
  }
  _castlingKey() {
    const index = this._castling.w >> 5 | this._castling.b >> 3;
    return CASTLING_KEYS[index];
  }
  _computeHash() {
    let hash = 0n;
    for (let i = Ox88.a8; i <= Ox88.h1; i++) {
      if (i & 136) {
        i += 7;
        continue;
      }
      if (this._board[i]) {
        hash ^= this._pieceKey(i);
      }
    }
    hash ^= this._epKey();
    hash ^= this._castlingKey();
    if (this._turn === "b") {
      hash ^= SIDE_KEY;
    }
    return hash;
  }
  /*
   * Called when the initial board setup is changed with put() or remove().
   * modifies the SetUp and FEN properties of the header object. If the FEN
   * is equal to the default position, the SetUp and FEN are deleted the setup
   * is only updated if history.length is zero, ie moves haven't been made.
   */
  _updateSetup(fen) {
    if (this._history.length > 0)
      return;
    if (fen !== DEFAULT_POSITION) {
      this._header["SetUp"] = "1";
      this._header["FEN"] = fen;
    } else {
      this._header["SetUp"] = null;
      this._header["FEN"] = null;
    }
  }
  reset() {
    this.load(DEFAULT_POSITION);
  }
  get(square) {
    return this._board[Ox88[square]];
  }
  findPiece(piece) {
    const squares = [];
    for (let i = Ox88.a8; i <= Ox88.h1; i++) {
      if (i & 136) {
        i += 7;
        continue;
      }
      if (!this._board[i] || this._board[i]?.color !== piece.color) {
        continue;
      }
      if (this._board[i].color === piece.color && this._board[i].type === piece.type) {
        squares.push(algebraic(i));
      }
    }
    return squares;
  }
  put({ type, color }, square) {
    if (this._put({ type, color }, square)) {
      this._updateCastlingRights();
      this._updateEnPassantSquare();
      this._updateSetup(this.fen());
      return true;
    }
    return false;
  }
  _set(sq, piece) {
    this._hash ^= this._pieceKey(sq);
    this._board[sq] = piece;
    this._hash ^= this._pieceKey(sq);
  }
  _put({ type, color }, square) {
    if (SYMBOLS.indexOf(type.toLowerCase()) === -1) {
      return false;
    }
    if (!(square in Ox88)) {
      return false;
    }
    const sq = Ox88[square];
    if (type == KING && !(this._kings[color] == EMPTY || this._kings[color] == sq)) {
      return false;
    }
    const currentPieceOnSquare = this._board[sq];
    if (currentPieceOnSquare && currentPieceOnSquare.type === KING) {
      this._kings[currentPieceOnSquare.color] = EMPTY;
    }
    this._set(sq, { type, color });
    if (type === KING) {
      this._kings[color] = sq;
    }
    return true;
  }
  _clear(sq) {
    this._hash ^= this._pieceKey(sq);
    delete this._board[sq];
  }
  remove(square) {
    const piece = this.get(square);
    this._clear(Ox88[square]);
    if (piece && piece.type === KING) {
      this._kings[piece.color] = EMPTY;
    }
    this._updateCastlingRights();
    this._updateEnPassantSquare();
    this._updateSetup(this.fen());
    return piece;
  }
  _updateCastlingRights() {
    this._hash ^= this._castlingKey();
    const whiteKingInPlace = this._board[Ox88.e1]?.type === KING && this._board[Ox88.e1]?.color === WHITE;
    const blackKingInPlace = this._board[Ox88.e8]?.type === KING && this._board[Ox88.e8]?.color === BLACK;
    if (!whiteKingInPlace || this._board[Ox88.a1]?.type !== ROOK || this._board[Ox88.a1]?.color !== WHITE) {
      this._castling.w &= -65;
    }
    if (!whiteKingInPlace || this._board[Ox88.h1]?.type !== ROOK || this._board[Ox88.h1]?.color !== WHITE) {
      this._castling.w &= -33;
    }
    if (!blackKingInPlace || this._board[Ox88.a8]?.type !== ROOK || this._board[Ox88.a8]?.color !== BLACK) {
      this._castling.b &= -65;
    }
    if (!blackKingInPlace || this._board[Ox88.h8]?.type !== ROOK || this._board[Ox88.h8]?.color !== BLACK) {
      this._castling.b &= -33;
    }
    this._hash ^= this._castlingKey();
  }
  _updateEnPassantSquare() {
    if (this._epSquare === EMPTY) {
      return;
    }
    const startSquare = this._epSquare + (this._turn === WHITE ? -16 : 16);
    const currentSquare = this._epSquare + (this._turn === WHITE ? 16 : -16);
    const attackers = [currentSquare + 1, currentSquare - 1];
    if (this._board[startSquare] !== null || this._board[this._epSquare] !== null || this._board[currentSquare]?.color !== swapColor(this._turn) || this._board[currentSquare]?.type !== PAWN) {
      this._hash ^= this._epKey();
      this._epSquare = EMPTY;
      return;
    }
    const canCapture = (square) => !(square & 136) && this._board[square]?.color === this._turn && this._board[square]?.type === PAWN;
    if (!attackers.some(canCapture)) {
      this._hash ^= this._epKey();
      this._epSquare = EMPTY;
    }
  }
  _attacked(color, square, verbose) {
    const attackers = [];
    for (let i = Ox88.a8; i <= Ox88.h1; i++) {
      if (i & 136) {
        i += 7;
        continue;
      }
      if (this._board[i] === void 0 || this._board[i].color !== color) {
        continue;
      }
      const piece = this._board[i];
      const difference = i - square;
      if (difference === 0) {
        continue;
      }
      const index = difference + 119;
      if (ATTACKS[index] & PIECE_MASKS[piece.type]) {
        if (piece.type === PAWN) {
          if (difference > 0 && piece.color === WHITE || difference <= 0 && piece.color === BLACK) {
            if (!verbose) {
              return true;
            } else {
              attackers.push(algebraic(i));
            }
          }
          continue;
        }
        if (piece.type === "n" || piece.type === "k") {
          if (!verbose) {
            return true;
          } else {
            attackers.push(algebraic(i));
            continue;
          }
        }
        const offset = RAYS[index];
        let j = i + offset;
        let blocked = false;
        while (j !== square) {
          if (this._board[j] != null) {
            blocked = true;
            break;
          }
          j += offset;
        }
        if (!blocked) {
          if (!verbose) {
            return true;
          } else {
            attackers.push(algebraic(i));
            continue;
          }
        }
      }
    }
    if (verbose) {
      return attackers;
    } else {
      return false;
    }
  }
  attackers(square, attackedBy) {
    if (!attackedBy) {
      return this._attacked(this._turn, Ox88[square], true);
    } else {
      return this._attacked(attackedBy, Ox88[square], true);
    }
  }
  _isKingAttacked(color) {
    const square = this._kings[color];
    return square === -1 ? false : this._attacked(swapColor(color), square);
  }
  hash() {
    return this._hash.toString(16);
  }
  isAttacked(square, attackedBy) {
    return this._attacked(attackedBy, Ox88[square]);
  }
  isCheck() {
    return this._isKingAttacked(this._turn);
  }
  inCheck() {
    return this.isCheck();
  }
  isCheckmate() {
    return this.isCheck() && this._moves().length === 0;
  }
  isStalemate() {
    return !this.isCheck() && this._moves().length === 0;
  }
  isInsufficientMaterial() {
    const pieces = {
      b: 0,
      n: 0,
      r: 0,
      q: 0,
      k: 0,
      p: 0
    };
    const bishops = [];
    let numPieces = 0;
    let squareColor = 0;
    for (let i = Ox88.a8; i <= Ox88.h1; i++) {
      squareColor = (squareColor + 1) % 2;
      if (i & 136) {
        i += 7;
        continue;
      }
      const piece = this._board[i];
      if (piece) {
        pieces[piece.type] = piece.type in pieces ? pieces[piece.type] + 1 : 1;
        if (piece.type === BISHOP) {
          bishops.push(squareColor);
        }
        numPieces++;
      }
    }
    if (numPieces === 2) {
      return true;
    } else if (
      // k vs. kn .... or .... k vs. kb
      numPieces === 3 && (pieces[BISHOP] === 1 || pieces[KNIGHT] === 1)
    ) {
      return true;
    } else if (numPieces === pieces[BISHOP] + 2) {
      let sum = 0;
      const len = bishops.length;
      for (let i = 0; i < len; i++) {
        sum += bishops[i];
      }
      if (sum === 0 || sum === len) {
        return true;
      }
    }
    return false;
  }
  isThreefoldRepetition() {
    return this._getPositionCount(this._hash) >= 3;
  }
  isDrawByFiftyMoves() {
    return this._halfMoves >= 100;
  }
  isDraw() {
    return this.isDrawByFiftyMoves() || this.isStalemate() || this.isInsufficientMaterial() || this.isThreefoldRepetition();
  }
  isGameOver() {
    return this.isCheckmate() || this.isDraw();
  }
  moves({ verbose = false, square = void 0, piece = void 0 } = {}) {
    const moves = this._moves({ square, piece });
    if (verbose) {
      return moves.map((move) => new Move(this, move));
    } else {
      return moves.map((move) => this._moveToSan(move, moves));
    }
  }
  _moves({ legal = true, piece = void 0, square = void 0 } = {}) {
    const forSquare = square ? square.toLowerCase() : void 0;
    const forPiece = piece?.toLowerCase();
    const moves = [];
    const us = this._turn;
    const them = swapColor(us);
    let firstSquare = Ox88.a8;
    let lastSquare = Ox88.h1;
    let singleSquare = false;
    if (forSquare) {
      if (!(forSquare in Ox88)) {
        return [];
      } else {
        firstSquare = lastSquare = Ox88[forSquare];
        singleSquare = true;
      }
    }
    for (let from = firstSquare; from <= lastSquare; from++) {
      if (from & 136) {
        from += 7;
        continue;
      }
      if (!this._board[from] || this._board[from].color === them) {
        continue;
      }
      const { type } = this._board[from];
      let to;
      if (type === PAWN) {
        if (forPiece && forPiece !== type)
          continue;
        to = from + PAWN_OFFSETS[us][0];
        if (!this._board[to]) {
          addMove(moves, us, from, to, PAWN);
          to = from + PAWN_OFFSETS[us][1];
          if (SECOND_RANK[us] === rank(from) && !this._board[to]) {
            addMove(moves, us, from, to, PAWN, void 0, BITS.BIG_PAWN);
          }
        }
        for (let j = 2; j < 4; j++) {
          to = from + PAWN_OFFSETS[us][j];
          if (to & 136)
            continue;
          if (this._board[to]?.color === them) {
            addMove(moves, us, from, to, PAWN, this._board[to].type, BITS.CAPTURE);
          } else if (to === this._epSquare) {
            addMove(moves, us, from, to, PAWN, PAWN, BITS.EP_CAPTURE);
          }
        }
      } else {
        if (forPiece && forPiece !== type)
          continue;
        for (let j = 0, len = PIECE_OFFSETS[type].length; j < len; j++) {
          const offset = PIECE_OFFSETS[type][j];
          to = from;
          while (true) {
            to += offset;
            if (to & 136)
              break;
            if (!this._board[to]) {
              addMove(moves, us, from, to, type);
            } else {
              if (this._board[to].color === us)
                break;
              addMove(moves, us, from, to, type, this._board[to].type, BITS.CAPTURE);
              break;
            }
            if (type === KNIGHT || type === KING)
              break;
          }
        }
      }
    }
    if (forPiece === void 0 || forPiece === KING) {
      if (!singleSquare || lastSquare === this._kings[us]) {
        if (this._castling[us] & BITS.KSIDE_CASTLE) {
          const castlingFrom = this._kings[us];
          const castlingTo = castlingFrom + 2;
          if (!this._board[castlingFrom + 1] && !this._board[castlingTo] && !this._attacked(them, this._kings[us]) && !this._attacked(them, castlingFrom + 1) && !this._attacked(them, castlingTo)) {
            addMove(moves, us, this._kings[us], castlingTo, KING, void 0, BITS.KSIDE_CASTLE);
          }
        }
        if (this._castling[us] & BITS.QSIDE_CASTLE) {
          const castlingFrom = this._kings[us];
          const castlingTo = castlingFrom - 2;
          if (!this._board[castlingFrom - 1] && !this._board[castlingFrom - 2] && !this._board[castlingFrom - 3] && !this._attacked(them, this._kings[us]) && !this._attacked(them, castlingFrom - 1) && !this._attacked(them, castlingTo)) {
            addMove(moves, us, this._kings[us], castlingTo, KING, void 0, BITS.QSIDE_CASTLE);
          }
        }
      }
    }
    if (!legal || this._kings[us] === -1) {
      return moves;
    }
    const legalMoves = [];
    for (let i = 0, len = moves.length; i < len; i++) {
      this._makeMove(moves[i]);
      if (!this._isKingAttacked(us)) {
        legalMoves.push(moves[i]);
      }
      this._undoMove();
    }
    return legalMoves;
  }
  move(move, { strict = false } = {}) {
    let moveObj = null;
    if (typeof move === "string") {
      moveObj = this._moveFromSan(move, strict);
    } else if (move === null) {
      moveObj = this._moveFromSan(SAN_NULLMOVE, strict);
    } else if (typeof move === "object") {
      const moves = this._moves();
      for (let i = 0, len = moves.length; i < len; i++) {
        if (move.from === algebraic(moves[i].from) && move.to === algebraic(moves[i].to) && (!("promotion" in moves[i]) || move.promotion === moves[i].promotion)) {
          moveObj = moves[i];
          break;
        }
      }
    }
    if (!moveObj) {
      if (typeof move === "string") {
        throw new Error(`Invalid move: ${move}`);
      } else {
        throw new Error(`Invalid move: ${JSON.stringify(move)}`);
      }
    }
    if (this.isCheck() && moveObj.flags & BITS.NULL_MOVE) {
      throw new Error("Null move not allowed when in check");
    }
    const prettyMove = new Move(this, moveObj);
    this._makeMove(moveObj);
    this._incPositionCount();
    return prettyMove;
  }
  _push(move) {
    this._history.push({
      move,
      kings: { b: this._kings.b, w: this._kings.w },
      turn: this._turn,
      castling: { b: this._castling.b, w: this._castling.w },
      epSquare: this._epSquare,
      halfMoves: this._halfMoves,
      moveNumber: this._moveNumber
    });
  }
  _movePiece(from, to) {
    this._hash ^= this._pieceKey(from);
    this._board[to] = this._board[from];
    delete this._board[from];
    this._hash ^= this._pieceKey(to);
  }
  _makeMove(move) {
    const us = this._turn;
    const them = swapColor(us);
    this._push(move);
    if (move.flags & BITS.NULL_MOVE) {
      if (us === BLACK) {
        this._moveNumber++;
      }
      this._halfMoves++;
      this._turn = them;
      this._epSquare = EMPTY;
      return;
    }
    this._hash ^= this._epKey();
    this._hash ^= this._castlingKey();
    if (move.captured) {
      this._hash ^= this._pieceKey(move.to);
    }
    this._movePiece(move.from, move.to);
    if (move.flags & BITS.EP_CAPTURE) {
      if (this._turn === BLACK) {
        this._clear(move.to - 16);
      } else {
        this._clear(move.to + 16);
      }
    }
    if (move.promotion) {
      this._clear(move.to);
      this._set(move.to, { type: move.promotion, color: us });
    }
    if (this._board[move.to].type === KING) {
      this._kings[us] = move.to;
      if (move.flags & BITS.KSIDE_CASTLE) {
        const castlingTo = move.to - 1;
        const castlingFrom = move.to + 1;
        this._movePiece(castlingFrom, castlingTo);
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        const castlingTo = move.to + 1;
        const castlingFrom = move.to - 2;
        this._movePiece(castlingFrom, castlingTo);
      }
      this._castling[us] = 0;
    }
    if (this._castling[us]) {
      for (let i = 0, len = ROOKS[us].length; i < len; i++) {
        if (move.from === ROOKS[us][i].square && this._castling[us] & ROOKS[us][i].flag) {
          this._castling[us] ^= ROOKS[us][i].flag;
          break;
        }
      }
    }
    if (this._castling[them]) {
      for (let i = 0, len = ROOKS[them].length; i < len; i++) {
        if (move.to === ROOKS[them][i].square && this._castling[them] & ROOKS[them][i].flag) {
          this._castling[them] ^= ROOKS[them][i].flag;
          break;
        }
      }
    }
    this._hash ^= this._castlingKey();
    if (move.flags & BITS.BIG_PAWN) {
      let epSquare;
      if (us === BLACK) {
        epSquare = move.to - 16;
      } else {
        epSquare = move.to + 16;
      }
      if (!(move.to - 1 & 136) && this._board[move.to - 1]?.type === PAWN && this._board[move.to - 1]?.color === them || !(move.to + 1 & 136) && this._board[move.to + 1]?.type === PAWN && this._board[move.to + 1]?.color === them) {
        this._epSquare = epSquare;
        this._hash ^= this._epKey();
      } else {
        this._epSquare = EMPTY;
      }
    } else {
      this._epSquare = EMPTY;
    }
    if (move.piece === PAWN) {
      this._halfMoves = 0;
    } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
      this._halfMoves = 0;
    } else {
      this._halfMoves++;
    }
    if (us === BLACK) {
      this._moveNumber++;
    }
    this._turn = them;
    this._hash ^= SIDE_KEY;
  }
  undo() {
    const hash = this._hash;
    const move = this._undoMove();
    if (move) {
      const prettyMove = new Move(this, move);
      this._decPositionCount(hash);
      return prettyMove;
    }
    return null;
  }
  _undoMove() {
    const old = this._history.pop();
    if (old === void 0) {
      return null;
    }
    this._hash ^= this._epKey();
    this._hash ^= this._castlingKey();
    const move = old.move;
    this._kings = old.kings;
    this._turn = old.turn;
    this._castling = old.castling;
    this._epSquare = old.epSquare;
    this._halfMoves = old.halfMoves;
    this._moveNumber = old.moveNumber;
    this._hash ^= this._epKey();
    this._hash ^= this._castlingKey();
    this._hash ^= SIDE_KEY;
    const us = this._turn;
    const them = swapColor(us);
    if (move.flags & BITS.NULL_MOVE) {
      return move;
    }
    this._movePiece(move.to, move.from);
    if (move.piece) {
      this._clear(move.from);
      this._set(move.from, { type: move.piece, color: us });
    }
    if (move.captured) {
      if (move.flags & BITS.EP_CAPTURE) {
        let index;
        if (us === BLACK) {
          index = move.to - 16;
        } else {
          index = move.to + 16;
        }
        this._set(index, { type: PAWN, color: them });
      } else {
        this._set(move.to, { type: move.captured, color: them });
      }
    }
    if (move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
      let castlingTo, castlingFrom;
      if (move.flags & BITS.KSIDE_CASTLE) {
        castlingTo = move.to + 1;
        castlingFrom = move.to - 1;
      } else {
        castlingTo = move.to - 2;
        castlingFrom = move.to + 1;
      }
      this._movePiece(castlingFrom, castlingTo);
    }
    return move;
  }
  pgn({ newline = "\n", maxWidth = 0 } = {}) {
    const result = [];
    let headerExists = false;
    for (const i in this._header) {
      const headerTag = this._header[i];
      if (headerTag)
        result.push(`[${i} "${this._header[i]}"]` + newline);
      headerExists = true;
    }
    if (headerExists && this._history.length) {
      result.push(newline);
    }
    const appendComment = (moveString2) => {
      const comment = this._comments[this.fen()];
      if (typeof comment !== "undefined") {
        const delimiter = moveString2.length > 0 ? " " : "";
        moveString2 = `${moveString2}${delimiter}{${comment}}`;
      }
      return moveString2;
    };
    const reversedHistory = [];
    while (this._history.length > 0) {
      reversedHistory.push(this._undoMove());
    }
    const moves = [];
    let moveString = "";
    if (reversedHistory.length === 0) {
      moves.push(appendComment(""));
    }
    while (reversedHistory.length > 0) {
      moveString = appendComment(moveString);
      const move = reversedHistory.pop();
      if (!move) {
        break;
      }
      if (!this._history.length && move.color === "b") {
        const prefix = `${this._moveNumber}. ...`;
        moveString = moveString ? `${moveString} ${prefix}` : prefix;
      } else if (move.color === "w") {
        if (moveString.length) {
          moves.push(moveString);
        }
        moveString = this._moveNumber + ".";
      }
      moveString = moveString + " " + this._moveToSan(move, this._moves({ legal: true }));
      this._makeMove(move);
    }
    if (moveString.length) {
      moves.push(appendComment(moveString));
    }
    moves.push(this._header.Result || "*");
    if (maxWidth === 0) {
      return result.join("") + moves.join(" ");
    }
    const strip = function() {
      if (result.length > 0 && result[result.length - 1] === " ") {
        result.pop();
        return true;
      }
      return false;
    };
    const wrapComment = function(width, move) {
      for (const token of move.split(" ")) {
        if (!token) {
          continue;
        }
        if (width + token.length > maxWidth) {
          while (strip()) {
            width--;
          }
          result.push(newline);
          width = 0;
        }
        result.push(token);
        width += token.length;
        result.push(" ");
        width++;
      }
      if (strip()) {
        width--;
      }
      return width;
    };
    let currentWidth = 0;
    for (let i = 0; i < moves.length; i++) {
      if (currentWidth + moves[i].length > maxWidth) {
        if (moves[i].includes("{")) {
          currentWidth = wrapComment(currentWidth, moves[i]);
          continue;
        }
      }
      if (currentWidth + moves[i].length > maxWidth && i !== 0) {
        if (result[result.length - 1] === " ") {
          result.pop();
        }
        result.push(newline);
        currentWidth = 0;
      } else if (i !== 0) {
        result.push(" ");
        currentWidth++;
      }
      result.push(moves[i]);
      currentWidth += moves[i].length;
    }
    return result.join("");
  }
  /**
   * @deprecated Use `setHeader` and `getHeaders` instead. This method will return null header tags (which is not what you want)
   */
  header(...args) {
    for (let i = 0; i < args.length; i += 2) {
      if (typeof args[i] === "string" && typeof args[i + 1] === "string") {
        this._header[args[i]] = args[i + 1];
      }
    }
    return this._header;
  }
  // TODO: value validation per spec
  setHeader(key, value) {
    this._header[key] = value ?? SEVEN_TAG_ROSTER[key] ?? null;
    return this.getHeaders();
  }
  removeHeader(key) {
    if (key in this._header) {
      this._header[key] = SEVEN_TAG_ROSTER[key] || null;
      return true;
    }
    return false;
  }
  // return only non-null headers (omit placemarker nulls)
  getHeaders() {
    const nonNullHeaders = {};
    for (const [key, value] of Object.entries(this._header)) {
      if (value !== null) {
        nonNullHeaders[key] = value;
      }
    }
    return nonNullHeaders;
  }
  loadPgn(pgn2, { strict = false, newlineChar = "\r?\n" } = {}) {
    if (newlineChar !== "\r?\n") {
      pgn2 = pgn2.replace(new RegExp(newlineChar, "g"), "\n");
    }
    const parsedPgn = peg$parse(pgn2);
    this.reset();
    const headers = parsedPgn.headers;
    let fen = "";
    for (const key in headers) {
      if (key.toLowerCase() === "fen") {
        fen = headers[key];
      }
      this.header(key, headers[key]);
    }
    if (!strict) {
      if (fen) {
        this.load(fen, { preserveHeaders: true });
      }
    } else {
      if (headers["SetUp"] === "1") {
        if (!("FEN" in headers)) {
          throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");
        }
        this.load(headers["FEN"], { preserveHeaders: true });
      }
    }
    let node2 = parsedPgn.root;
    while (node2) {
      if (node2.move) {
        const move = this._moveFromSan(node2.move, strict);
        if (move == null) {
          throw new Error(`Invalid move in PGN: ${node2.move}`);
        } else {
          this._makeMove(move);
          this._incPositionCount();
        }
      }
      if (node2.comment !== void 0) {
        this._comments[this.fen()] = node2.comment;
      }
      node2 = node2.variations[0];
    }
    const result = parsedPgn.result;
    if (result && Object.keys(this._header).length && this._header["Result"] !== result) {
      this.setHeader("Result", result);
    }
  }
  /*
   * Convert a move from 0x88 coordinates to Standard Algebraic Notation
   * (SAN)
   *
   * @param {boolean} strict Use the strict SAN parser. It will throw errors
   * on overly disambiguated moves (see below):
   *
   * r1bqkbnr/ppp2ppp/2n5/1B1pP3/4P3/8/PPPP2PP/RNBQK1NR b KQkq - 2 4
   * 4. ... Nge7 is overly disambiguated because the knight on c6 is pinned
   * 4. ... Ne7 is technically the valid SAN
   */
  _moveToSan(move, moves) {
    let output = "";
    if (move.flags & BITS.KSIDE_CASTLE) {
      output = "O-O";
    } else if (move.flags & BITS.QSIDE_CASTLE) {
      output = "O-O-O";
    } else if (move.flags & BITS.NULL_MOVE) {
      return SAN_NULLMOVE;
    } else {
      if (move.piece !== PAWN) {
        const disambiguator = getDisambiguator(move, moves);
        output += move.piece.toUpperCase() + disambiguator;
      }
      if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
        if (move.piece === PAWN) {
          output += algebraic(move.from)[0];
        }
        output += "x";
      }
      output += algebraic(move.to);
      if (move.promotion) {
        output += "=" + move.promotion.toUpperCase();
      }
    }
    this._makeMove(move);
    if (this.isCheck()) {
      if (this.isCheckmate()) {
        output += "#";
      } else {
        output += "+";
      }
    }
    this._undoMove();
    return output;
  }
  // convert a move from Standard Algebraic Notation (SAN) to 0x88 coordinates
  _moveFromSan(move, strict = false) {
    let cleanMove = strippedSan(move);
    if (!strict) {
      if (cleanMove === "0-0") {
        cleanMove = "O-O";
      } else if (cleanMove === "0-0-0") {
        cleanMove = "O-O-O";
      }
    }
    if (cleanMove == SAN_NULLMOVE) {
      const res = {
        color: this._turn,
        from: 0,
        to: 0,
        piece: "k",
        flags: BITS.NULL_MOVE
      };
      return res;
    }
    let pieceType = inferPieceType(cleanMove);
    let moves = this._moves({ legal: true, piece: pieceType });
    for (let i = 0, len = moves.length; i < len; i++) {
      if (cleanMove === strippedSan(this._moveToSan(moves[i], moves))) {
        return moves[i];
      }
    }
    if (strict) {
      return null;
    }
    let piece = void 0;
    let matches = void 0;
    let from = void 0;
    let to = void 0;
    let promotion = void 0;
    let overlyDisambiguated = false;
    matches = cleanMove.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/);
    if (matches) {
      piece = matches[1];
      from = matches[2];
      to = matches[3];
      promotion = matches[4];
      if (from.length == 1) {
        overlyDisambiguated = true;
      }
    } else {
      matches = cleanMove.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/);
      if (matches) {
        piece = matches[1];
        from = matches[2];
        to = matches[3];
        promotion = matches[4];
        if (from.length == 1) {
          overlyDisambiguated = true;
        }
      }
    }
    pieceType = inferPieceType(cleanMove);
    moves = this._moves({
      legal: true,
      piece: piece ? piece : pieceType
    });
    if (!to) {
      return null;
    }
    for (let i = 0, len = moves.length; i < len; i++) {
      if (!from) {
        if (cleanMove === strippedSan(this._moveToSan(moves[i], moves)).replace("x", "")) {
          return moves[i];
        }
      } else if ((!piece || piece.toLowerCase() == moves[i].piece) && Ox88[from] == moves[i].from && Ox88[to] == moves[i].to && (!promotion || promotion.toLowerCase() == moves[i].promotion)) {
        return moves[i];
      } else if (overlyDisambiguated) {
        const square = algebraic(moves[i].from);
        if ((!piece || piece.toLowerCase() == moves[i].piece) && Ox88[to] == moves[i].to && (from == square[0] || from == square[1]) && (!promotion || promotion.toLowerCase() == moves[i].promotion)) {
          return moves[i];
        }
      }
    }
    return null;
  }
  ascii() {
    let s = "   +------------------------+\n";
    for (let i = Ox88.a8; i <= Ox88.h1; i++) {
      if (file(i) === 0) {
        s += " " + "87654321"[rank(i)] + " |";
      }
      if (this._board[i]) {
        const piece = this._board[i].type;
        const color = this._board[i].color;
        const symbol = color === WHITE ? piece.toUpperCase() : piece.toLowerCase();
        s += " " + symbol + " ";
      } else {
        s += " . ";
      }
      if (i + 1 & 136) {
        s += "|\n";
        i += 8;
      }
    }
    s += "   +------------------------+\n";
    s += "     a  b  c  d  e  f  g  h";
    return s;
  }
  perft(depth) {
    const moves = this._moves({ legal: false });
    let nodes = 0;
    const color = this._turn;
    for (let i = 0, len = moves.length; i < len; i++) {
      this._makeMove(moves[i]);
      if (!this._isKingAttacked(color)) {
        if (depth - 1 > 0) {
          nodes += this.perft(depth - 1);
        } else {
          nodes++;
        }
      }
      this._undoMove();
    }
    return nodes;
  }
  setTurn(color) {
    if (this._turn == color) {
      return false;
    }
    this.move("--");
    return true;
  }
  turn() {
    return this._turn;
  }
  board() {
    const output = [];
    let row = [];
    for (let i = Ox88.a8; i <= Ox88.h1; i++) {
      if (this._board[i] == null) {
        row.push(null);
      } else {
        row.push({
          square: algebraic(i),
          type: this._board[i].type,
          color: this._board[i].color
        });
      }
      if (i + 1 & 136) {
        output.push(row);
        row = [];
        i += 8;
      }
    }
    return output;
  }
  squareColor(square) {
    if (square in Ox88) {
      const sq = Ox88[square];
      return (rank(sq) + file(sq)) % 2 === 0 ? "light" : "dark";
    }
    return null;
  }
  history({ verbose = false } = {}) {
    const reversedHistory = [];
    const moveHistory = [];
    while (this._history.length > 0) {
      reversedHistory.push(this._undoMove());
    }
    while (true) {
      const move = reversedHistory.pop();
      if (!move) {
        break;
      }
      if (verbose) {
        moveHistory.push(new Move(this, move));
      } else {
        moveHistory.push(this._moveToSan(move, this._moves()));
      }
      this._makeMove(move);
    }
    return moveHistory;
  }
  /*
   * Keeps track of position occurrence counts for the purpose of repetition
   * checking. Old positions are removed from the map if their counts are reduced to 0.
   */
  _getPositionCount(hash) {
    return this._positionCount.get(hash) ?? 0;
  }
  _incPositionCount() {
    this._positionCount.set(this._hash, (this._positionCount.get(this._hash) ?? 0) + 1);
  }
  _decPositionCount(hash) {
    const currentCount = this._positionCount.get(hash) ?? 0;
    if (currentCount === 1) {
      this._positionCount.delete(hash);
    } else {
      this._positionCount.set(hash, currentCount - 1);
    }
  }
  _pruneComments() {
    const reversedHistory = [];
    const currentComments = {};
    const copyComment = (fen) => {
      if (fen in this._comments) {
        currentComments[fen] = this._comments[fen];
      }
    };
    while (this._history.length > 0) {
      reversedHistory.push(this._undoMove());
    }
    copyComment(this.fen());
    while (true) {
      const move = reversedHistory.pop();
      if (!move) {
        break;
      }
      this._makeMove(move);
      copyComment(this.fen());
    }
    this._comments = currentComments;
  }
  getComment() {
    return this._comments[this.fen()];
  }
  setComment(comment) {
    this._comments[this.fen()] = comment.replace("{", "[").replace("}", "]");
  }
  /**
   * @deprecated Renamed to `removeComment` for consistency
   */
  deleteComment() {
    return this.removeComment();
  }
  removeComment() {
    const comment = this._comments[this.fen()];
    delete this._comments[this.fen()];
    return comment;
  }
  getComments() {
    this._pruneComments();
    return Object.keys(this._comments).map((fen) => {
      return { fen, comment: this._comments[fen] };
    });
  }
  /**
   * @deprecated Renamed to `removeComments` for consistency
   */
  deleteComments() {
    return this.removeComments();
  }
  removeComments() {
    this._pruneComments();
    return Object.keys(this._comments).map((fen) => {
      const comment = this._comments[fen];
      delete this._comments[fen];
      return { fen, comment };
    });
  }
  setCastlingRights(color, rights) {
    for (const side of [KING, QUEEN]) {
      if (rights[side] !== void 0) {
        if (rights[side]) {
          this._castling[color] |= SIDES[side];
        } else {
          this._castling[color] &= ~SIDES[side];
        }
      }
    }
    this._updateCastlingRights();
    const result = this.getCastlingRights(color);
    return (rights[KING] === void 0 || rights[KING] === result[KING]) && (rights[QUEEN] === void 0 || rights[QUEEN] === result[QUEEN]);
  }
  getCastlingRights(color) {
    return {
      [KING]: (this._castling[color] & SIDES[KING]) !== 0,
      [QUEEN]: (this._castling[color] & SIDES[QUEEN]) !== 0
    };
  }
  moveNumber() {
    return this._moveNumber;
  }
}
const FEN = {
  empty: "8/8/8/8/8/8/8/8"
};
class Position {
  constructor(fen = FEN.empty) {
    this.squares = new Array(64).fill(null);
    this.setFen(fen);
  }
  setFen(fen = FEN.empty) {
    const parts = fen.replace(/^\s*/, "").replace(/\s*$/, "").split(/\/|\s/);
    for (let part = 0; part < 8; part++) {
      const row = parts[7 - part].replace(/\d/g, (str) => {
        const numSpaces = parseInt(str);
        let ret = "";
        for (let i = 0; i < numSpaces; i++) {
          ret += "-";
        }
        return ret;
      });
      for (let c = 0; c < 8; c++) {
        const char = row.substring(c, c + 1);
        let piece = null;
        if (char !== "-") {
          if (char.toUpperCase() === char) {
            piece = `w${char.toLowerCase()}`;
          } else {
            piece = `b${char}`;
          }
        }
        this.squares[part * 8 + c] = piece;
      }
    }
  }
  getFen() {
    let parts = new Array(8).fill("");
    for (let part = 0; part < 8; part++) {
      let spaceCounter = 0;
      for (let i = 0; i < 8; i++) {
        const piece = this.squares[part * 8 + i];
        if (!piece) {
          spaceCounter++;
        } else {
          if (spaceCounter > 0) {
            parts[7 - part] += spaceCounter;
            spaceCounter = 0;
          }
          const color = piece.substring(0, 1);
          const name = piece.substring(1, 2);
          if (color === "w") {
            parts[7 - part] += name.toUpperCase();
          } else {
            parts[7 - part] += name;
          }
        }
      }
      if (spaceCounter > 0) {
        parts[7 - part] += spaceCounter;
        spaceCounter = 0;
      }
    }
    return parts.join("/");
  }
  getPieces(pieceColor = void 0, pieceType = void 0, sortBy = ["k", "q", "r", "b", "n", "p"]) {
    const pieces = [];
    const sort = (a, b) => {
      return sortBy.indexOf(a.name) - sortBy.indexOf(b.name);
    };
    for (let i = 0; i < 64; i++) {
      const piece = this.squares[i];
      if (piece) {
        const type = piece.charAt(1);
        const color = piece.charAt(0);
        const square = Position.indexToSquare(i);
        if (pieceType && pieceType !== type || pieceColor && pieceColor !== color) {
          continue;
        }
        pieces.push({
          name: type,
          // deprecated, use type
          type,
          color,
          position: square,
          // deprecated, use square
          square
        });
      }
    }
    if (sortBy) {
      pieces.sort(sort);
    }
    return pieces;
  }
  movePiece(squareFrom, squareTo) {
    if (!this.squares[Position.squareToIndex(squareFrom)]) {
      console.warn("no piece on", squareFrom);
      return;
    }
    this.squares[Position.squareToIndex(squareTo)] = this.squares[Position.squareToIndex(squareFrom)];
    this.squares[Position.squareToIndex(squareFrom)] = null;
  }
  setPiece(square, piece) {
    this.squares[Position.squareToIndex(square)] = piece;
  }
  getPiece(square) {
    return this.squares[Position.squareToIndex(square)];
  }
  static squareToIndex(square) {
    const coordinates = Position.squareToCoordinates(square);
    return coordinates[0] + coordinates[1] * 8;
  }
  static indexToSquare(index) {
    return this.coordinatesToSquare([Math.floor(index % 8), index / 8]);
  }
  static squareToCoordinates(square) {
    const file2 = square.charCodeAt(0) - 97;
    const rank2 = square.charCodeAt(1) - 49;
    return [file2, rank2];
  }
  static coordinatesToSquare(coordinates) {
    const file2 = String.fromCharCode(coordinates[0] + 97);
    const rank2 = String.fromCharCode(coordinates[1] + 49);
    return file2 + rank2;
  }
  toString() {
    return this.getFen();
  }
  clone() {
    const cloned = Object.create(Position.prototype);
    cloned.squares = this.squares.slice(0);
    return cloned;
  }
}
class ChessboardState {
  constructor() {
    this.position = new Position();
    this.orientation = void 0;
    this.inputWhiteEnabled = false;
    this.inputBlackEnabled = false;
    this.squareSelectEnabled = false;
    this.moveInputCallback = null;
    this.extensionPoints = {};
    this.moveInputProcess = Promise.resolve();
  }
  inputEnabled() {
    return this.inputWhiteEnabled || this.inputBlackEnabled;
  }
  invokeExtensionPoints(name, data = {}) {
    const extensionPoints = this.extensionPoints[name];
    const dataCloned = Object.assign({}, data);
    dataCloned.extensionPoint = name;
    let returnValue = true;
    if (extensionPoints) {
      for (const extensionPoint of extensionPoints) {
        if (extensionPoint(dataCloned) === false) {
          returnValue = false;
        }
      }
    }
    return returnValue;
  }
}
const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
class Svg {
  /**
   * create the Svg in the HTML DOM
   * @param containerElement
   * @returns {Element}
   */
  static createSvg(containerElement = void 0) {
    let svg = document.createElementNS(SVG_NAMESPACE, "svg");
    if (containerElement) {
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      containerElement.appendChild(svg);
    }
    return svg;
  }
  /**
   * Add an Element to an SVG DOM
   * @param parent
   * @param name
   * @param attributes
   * @returns {Element}
   */
  static addElement(parent, name, attributes = {}) {
    let element = document.createElementNS(SVG_NAMESPACE, name);
    if (name === "use") {
      attributes["xlink:href"] = attributes["href"];
    }
    for (let attribute in attributes) {
      if (attributes.hasOwnProperty(attribute)) {
        if (attribute.indexOf(":") !== -1) {
          const value = attribute.split(":");
          element.setAttributeNS("http://www.w3.org/1999/" + value[0], value[1], attributes[attribute]);
        } else {
          element.setAttribute(attribute, attributes[attribute]);
        }
      }
    }
    parent.appendChild(element);
    return element;
  }
  /**
   * Remove an element from an SVG DOM
   * @param element
   */
  static removeElement(element) {
    if (!element) {
      console.warn("removeElement, element is", element);
      return;
    }
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    } else {
      console.warn(element, "without parentNode");
    }
  }
}
const EXTENSION_POINT = {
  positionChanged: "positionChanged",
  // the positions of the pieces was changed
  boardChanged: "boardChanged",
  // the board (orientation) was changed
  moveInputToggled: "moveInputToggled",
  // move input was enabled or disabled
  moveInput: "moveInput",
  // move started, moving over a square, validating or canceled
  beforeRedrawBoard: "beforeRedrawBoard",
  // called before redrawing the board
  afterRedrawBoard: "afterRedrawBoard",
  // called after redrawing the board
  redrawBoard: "redrawBoard",
  // called after redrawing the board, DEPRECATED, use afterRedrawBoard 2023-09-18
  animation: "animation",
  // called on animation start, end, and on every animation frame
  destroy: "destroy"
  // called, before the board is destroyed
};
class Extension {
  constructor(chessboard) {
    this.chessboard = chessboard;
  }
  registerExtensionPoint(name, callback) {
    if (name === EXTENSION_POINT.redrawBoard) {
      console.warn("EXTENSION_POINT.redrawBoard is deprecated, use EXTENSION_POINT.afterRedrawBoard");
      name = EXTENSION_POINT.afterRedrawBoard;
    }
    if (!this.chessboard.state.extensionPoints[name]) {
      this.chessboard.state.extensionPoints[name] = [];
    }
    this.chessboard.state.extensionPoints[name].push(callback);
  }
  /** @deprecated 2023-05-18 */
  registerMethod(name, callback) {
    console.warn("registerMethod is deprecated, just add methods directly to the chessboard instance");
    if (!this.chessboard[name]) {
      this.chessboard[name] = (...args) => {
        return callback.apply(this, args);
      };
    } else {
      log.error("method", name, "already exists");
    }
  }
}
class Utils {
  static delegate(element, eventName, selector, handler) {
    const eventListener = function(event) {
      const match = event.target.closest(selector);
      if (match && this.contains(match)) {
        handler.call(match, event);
      }
    };
    element.addEventListener(eventName, eventListener);
    return {
      remove: function() {
        element.removeEventListener(eventName, eventListener);
      }
    };
  }
  static mergeObjects(target, source) {
    const isObject = (obj) => obj && typeof obj === "object";
    if (!isObject(target) || !isObject(source)) {
      return source;
    }
    for (const key of Object.keys(source)) {
      if (source[key] instanceof Object) {
        Object.assign(source[key], Utils.mergeObjects(target[key], source[key]));
      }
    }
    Object.assign(target || {}, source);
    return target;
  }
  static createDomElement(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstChild;
  }
  static createTask() {
    let resolve, reject;
    const promise = new Promise(function(_resolve, _reject) {
      resolve = _resolve;
      reject = _reject;
    });
    promise.resolve = resolve;
    promise.reject = reject;
    return promise;
  }
  static isAbsoluteUrl(url) {
    return url.indexOf("://") !== -1 || url.startsWith("/");
  }
}
const ANIMATION_EVENT_TYPE = {
  start: "start",
  frame: "frame",
  end: "end"
};
class PromiseQueue {
  constructor() {
    this.queue = [];
    this.workingOnPromise = false;
    this.stop = false;
  }
  async enqueue(promise) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        promise,
        resolve,
        reject
      });
      this.dequeue();
    });
  }
  dequeue() {
    if (this.workingOnPromise) {
      return;
    }
    if (this.stop) {
      this.queue = [];
      this.stop = false;
      return;
    }
    const entry = this.queue.shift();
    if (!entry) {
      return;
    }
    try {
      this.workingOnPromise = true;
      entry.promise().then((value) => {
        this.workingOnPromise = false;
        entry.resolve(value);
        this.dequeue();
      }).catch((err) => {
        this.workingOnPromise = false;
        entry.reject(err);
        this.dequeue();
      });
    } catch (err) {
      this.workingOnPromise = false;
      entry.reject(err);
      this.dequeue();
    }
    return true;
  }
  destroy() {
    this.stop = true;
  }
}
const CHANGE_TYPE = {
  move: 0,
  appear: 1,
  disappear: 2
};
class PositionsAnimation {
  constructor(view, fromPosition, toPosition, duration, callback) {
    this.view = view;
    if (fromPosition && toPosition) {
      this.animatedElements = this.createAnimation(fromPosition.squares, toPosition.squares);
      this.duration = duration;
      this.callback = callback;
      this.frameHandle = requestAnimationFrame(this.animationStep.bind(this));
    } else {
      console.error("fromPosition", fromPosition, "toPosition", toPosition);
    }
    this.view.positionsAnimationTask = Utils.createTask();
    this.view.chessboard.state.invokeExtensionPoints(EXTENSION_POINT.animation, {
      type: ANIMATION_EVENT_TYPE.start
    });
  }
  static seekChanges(fromSquares, toSquares) {
    const appearedList = [], disappearedList = [], changes = [];
    for (let i = 0; i < 64; i++) {
      const previousSquare = fromSquares[i];
      const newSquare = toSquares[i];
      if (newSquare !== previousSquare) {
        if (newSquare) {
          appearedList.push({ piece: newSquare, index: i });
        }
        if (previousSquare) {
          disappearedList.push({ piece: previousSquare, index: i });
        }
      }
    }
    appearedList.forEach((appeared) => {
      let shortestDistance = 8;
      let foundMoved = null;
      disappearedList.forEach((disappeared) => {
        if (appeared.piece === disappeared.piece) {
          const moveDistance = PositionsAnimation.squareDistance(appeared.index, disappeared.index);
          if (moveDistance < shortestDistance) {
            foundMoved = disappeared;
            shortestDistance = moveDistance;
          }
        }
      });
      if (foundMoved) {
        disappearedList.splice(disappearedList.indexOf(foundMoved), 1);
        changes.push({
          type: CHANGE_TYPE.move,
          piece: appeared.piece,
          atIndex: foundMoved.index,
          toIndex: appeared.index
        });
      } else {
        changes.push({ type: CHANGE_TYPE.appear, piece: appeared.piece, atIndex: appeared.index });
      }
    });
    disappearedList.forEach((disappeared) => {
      changes.push({ type: CHANGE_TYPE.disappear, piece: disappeared.piece, atIndex: disappeared.index });
    });
    return changes;
  }
  createAnimation(fromSquares, toSquares) {
    const changes = PositionsAnimation.seekChanges(fromSquares, toSquares);
    const animatedElements = [];
    changes.forEach((change) => {
      const animatedItem = {
        type: change.type
      };
      switch (change.type) {
        case CHANGE_TYPE.move:
          animatedItem.element = this.view.getPieceElement(Position.indexToSquare(change.atIndex));
          animatedItem.element.parentNode.appendChild(animatedItem.element);
          animatedItem.atPoint = this.view.indexToPoint(change.atIndex);
          animatedItem.toPoint = this.view.indexToPoint(change.toIndex);
          break;
        case CHANGE_TYPE.appear:
          animatedItem.element = this.view.drawPieceOnSquare(Position.indexToSquare(change.atIndex), change.piece);
          animatedItem.element.style.opacity = 0;
          break;
        case CHANGE_TYPE.disappear:
          animatedItem.element = this.view.getPieceElement(Position.indexToSquare(change.atIndex));
          break;
      }
      animatedElements.push(animatedItem);
    });
    return animatedElements;
  }
  animationStep(time) {
    if (!this.view || !this.view.chessboard.state) {
      return;
    }
    if (!this.startTime) {
      this.startTime = time;
    }
    const timeDiff = time - this.startTime;
    if (timeDiff <= this.duration) {
      this.frameHandle = requestAnimationFrame(this.animationStep.bind(this));
    } else {
      cancelAnimationFrame(this.frameHandle);
      this.animatedElements.forEach((animatedItem) => {
        if (animatedItem.type === CHANGE_TYPE.disappear) {
          Svg.removeElement(animatedItem.element);
        }
      });
      this.view.positionsAnimationTask.resolve();
      this.view.chessboard.state.invokeExtensionPoints(EXTENSION_POINT.animation, {
        type: ANIMATION_EVENT_TYPE.end
      });
      this.callback();
      return;
    }
    const t = Math.min(1, timeDiff / this.duration);
    let progress = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    if (isNaN(progress) || progress > 0.99) {
      progress = 1;
    }
    this.animatedElements.forEach((animatedItem) => {
      if (animatedItem.element) {
        switch (animatedItem.type) {
          case CHANGE_TYPE.move:
            animatedItem.element.transform.baseVal.removeItem(0);
            const transform = this.view.svg.createSVGTransform();
            transform.setTranslate(
              animatedItem.atPoint.x + (animatedItem.toPoint.x - animatedItem.atPoint.x) * progress,
              animatedItem.atPoint.y + (animatedItem.toPoint.y - animatedItem.atPoint.y) * progress
            );
            animatedItem.element.transform.baseVal.appendItem(transform);
            break;
          case CHANGE_TYPE.appear:
            animatedItem.element.style.opacity = Math.round(progress * 100) / 100;
            break;
          case CHANGE_TYPE.disappear:
            animatedItem.element.style.opacity = Math.round((1 - progress) * 100) / 100;
            break;
        }
      } else {
        console.warn("animatedItem has no element", animatedItem);
      }
    });
    this.view.chessboard.state.invokeExtensionPoints(EXTENSION_POINT.animation, {
      type: ANIMATION_EVENT_TYPE.frame,
      progress
    });
  }
  static squareDistance(index1, index2) {
    const file1 = index1 % 8;
    const rank1 = Math.floor(index1 / 8);
    const file2 = index2 % 8;
    const rank2 = Math.floor(index2 / 8);
    return Math.max(Math.abs(rank2 - rank1), Math.abs(file2 - file1));
  }
}
class PositionAnimationsQueue extends PromiseQueue {
  constructor(chessboard) {
    super();
    this.chessboard = chessboard;
  }
  async enqueuePositionChange(positionFrom, positionTo, animated) {
    if (positionFrom.getFen() === positionTo.getFen()) {
      return super.enqueue(() => Promise.resolve());
    } else {
      return super.enqueue(() => new Promise((resolve) => {
        let duration = animated ? this.chessboard.props.style.animationDuration : 0;
        if (this.queue.length > 0) {
          duration = duration / (1 + Math.pow(this.queue.length / 5, 2));
        }
        new PositionsAnimation(
          this.chessboard.view,
          positionFrom,
          positionTo,
          animated ? duration : 0,
          () => {
            if (this.chessboard.view) {
              this.chessboard.view.redrawPieces(positionTo.squares);
            }
            resolve();
          }
        );
      }));
    }
  }
  async enqueueTurnBoard(position, color, animated) {
    return super.enqueue(() => new Promise((resolve) => {
      const emptyPosition = new Position(FEN.empty);
      let duration = animated ? this.chessboard.props.style.animationDuration : 0;
      if (this.queue.length > 0) {
        duration = duration / (1 + Math.pow(this.queue.length / 5, 2));
      }
      new PositionsAnimation(
        this.chessboard.view,
        position,
        emptyPosition,
        animated ? duration : 0,
        () => {
          this.chessboard.state.orientation = color;
          this.chessboard.view.redrawBoard();
          this.chessboard.view.redrawPieces(emptyPosition.squares);
          new PositionsAnimation(
            this.chessboard.view,
            emptyPosition,
            position,
            animated ? duration : 0,
            () => {
              this.chessboard.view.redrawPieces(position.squares);
              resolve();
            }
          );
        }
      );
    }));
  }
}
const MOVE_INPUT_STATE = {
  waitForInputStart: "waitForInputStart",
  pieceClickedThreshold: "pieceClickedThreshold",
  clickTo: "clickTo",
  secondClickThreshold: "secondClickThreshold",
  dragTo: "dragTo",
  clickDragTo: "clickDragTo",
  moveDone: "moveDone",
  reset: "reset"
};
const MOVE_CANCELED_REASON = {
  secondClick: "secondClick",
  // clicked the same piece
  secondaryClick: "secondaryClick",
  // right click while moving
  movedOutOfBoard: "movedOutOfBoard",
  draggedBack: "draggedBack",
  // dragged to the start square
  clickedAnotherPiece: "clickedAnotherPiece"
  // of the same color
};
const DRAG_THRESHOLD = 4;
class VisualMoveInput {
  constructor(view) {
    this.view = view;
    this.chessboard = view.chessboard;
    this.moveInputState = null;
    this.fromSquare = null;
    this.toSquare = null;
    this.setMoveInputState(MOVE_INPUT_STATE.waitForInputStart);
  }
  moveInputStartedCallback(square) {
    const result = this.view.moveInputStartedCallback(square);
    if (result) {
      this.chessboard.state.moveInputProcess = Utils.createTask();
      this.chessboard.state.moveInputProcess.then((result2) => {
        if (this.moveInputState === MOVE_INPUT_STATE.waitForInputStart || this.moveInputState === MOVE_INPUT_STATE.moveDone) {
          this.view.moveInputFinishedCallback(this.fromSquare, this.toSquare, result2);
        }
      });
    }
    return result;
  }
  movingOverSquareCallback(fromSquare, toSquare) {
    this.view.movingOverSquareCallback(fromSquare, toSquare);
  }
  validateMoveInputCallback(fromSquare, toSquare) {
    const result = this.view.validateMoveInputCallback(fromSquare, toSquare);
    this.chessboard.state.moveInputProcess.resolve(result);
    return result;
  }
  moveInputCanceledCallback(fromSquare, toSquare, reason) {
    this.view.moveInputCanceledCallback(fromSquare, toSquare, reason);
    this.chessboard.state.moveInputProcess.resolve();
  }
  setMoveInputState(newState, params = void 0) {
    const prevState = this.moveInputState;
    this.moveInputState = newState;
    switch (newState) {
      case MOVE_INPUT_STATE.waitForInputStart:
        break;
      case MOVE_INPUT_STATE.pieceClickedThreshold:
        if (MOVE_INPUT_STATE.waitForInputStart !== prevState && MOVE_INPUT_STATE.clickTo !== prevState) {
          throw new Error("moveInputState");
        }
        if (this.pointerMoveListener) {
          removeEventListener(this.pointerMoveListener.type, this.pointerMoveListener);
          this.pointerMoveListener = null;
        }
        if (this.pointerUpListener) {
          removeEventListener(this.pointerUpListener.type, this.pointerUpListener);
          this.pointerUpListener = null;
        }
        this.fromSquare = params.square;
        this.toSquare = null;
        this.movedPiece = params.piece;
        this.startPoint = params.point;
        if (!this.pointerMoveListener && !this.pointerUpListener) {
          if (params.type === "mousedown") {
            this.pointerMoveListener = this.onPointerMove.bind(this);
            this.pointerMoveListener.type = "mousemove";
            addEventListener("mousemove", this.pointerMoveListener);
            this.pointerUpListener = this.onPointerUp.bind(this);
            this.pointerUpListener.type = "mouseup";
            addEventListener("mouseup", this.pointerUpListener);
          } else if (params.type === "touchstart") {
            this.pointerMoveListener = this.onPointerMove.bind(this);
            this.pointerMoveListener.type = "touchmove";
            addEventListener("touchmove", this.pointerMoveListener);
            this.pointerUpListener = this.onPointerUp.bind(this);
            this.pointerUpListener.type = "touchend";
            addEventListener("touchend", this.pointerUpListener);
          } else {
            throw Error("4b74af");
          }
          if (!this.contextMenuListener) {
            this.contextMenuListener = this.onContextMenu.bind(this);
            this.chessboard.view.svg.addEventListener("contextmenu", this.contextMenuListener);
          }
        } else {
          throw Error("94ad0c");
        }
        break;
      case MOVE_INPUT_STATE.clickTo:
        if (this.draggablePiece) {
          Svg.removeElement(this.draggablePiece);
          this.draggablePiece = null;
        }
        if (prevState === MOVE_INPUT_STATE.dragTo) {
          this.view.setPieceVisibility(params.square, true);
        }
        break;
      case MOVE_INPUT_STATE.secondClickThreshold:
        if (MOVE_INPUT_STATE.clickTo !== prevState) {
          throw new Error("moveInputState");
        }
        this.startPoint = params.point;
        break;
      case MOVE_INPUT_STATE.dragTo:
        if (MOVE_INPUT_STATE.pieceClickedThreshold !== prevState) {
          throw new Error("moveInputState");
        }
        if (this.view.chessboard.state.inputEnabled()) {
          this.view.setPieceVisibility(params.square, false);
          this.createDraggablePiece(params.piece);
        }
        break;
      case MOVE_INPUT_STATE.clickDragTo:
        if (MOVE_INPUT_STATE.secondClickThreshold !== prevState) {
          throw new Error("moveInputState");
        }
        if (this.view.chessboard.state.inputEnabled()) {
          this.view.setPieceVisibility(params.square, false);
          this.createDraggablePiece(params.piece);
        }
        break;
      case MOVE_INPUT_STATE.moveDone:
        if ([MOVE_INPUT_STATE.dragTo, MOVE_INPUT_STATE.clickTo, MOVE_INPUT_STATE.clickDragTo].indexOf(prevState) === -1) {
          throw new Error("moveInputState");
        }
        this.toSquare = params.square;
        if (this.toSquare && this.validateMoveInputCallback(this.fromSquare, this.toSquare)) {
          this.chessboard.movePiece(this.fromSquare, this.toSquare, prevState === MOVE_INPUT_STATE.clickTo).then(() => {
            if (prevState === MOVE_INPUT_STATE.clickTo) {
              this.view.setPieceVisibility(this.toSquare, true);
            }
            this.setMoveInputState(MOVE_INPUT_STATE.reset);
          });
        } else {
          this.view.setPieceVisibility(this.fromSquare, true);
          this.setMoveInputState(MOVE_INPUT_STATE.reset);
        }
        break;
      case MOVE_INPUT_STATE.reset:
        if (this.fromSquare && !this.toSquare && this.movedPiece) {
          this.chessboard.state.position.setPiece(this.fromSquare, this.movedPiece);
        }
        this.fromSquare = null;
        this.toSquare = null;
        this.movedPiece = null;
        if (this.draggablePiece) {
          Svg.removeElement(this.draggablePiece);
          this.draggablePiece = null;
        }
        if (this.pointerMoveListener) {
          removeEventListener(this.pointerMoveListener.type, this.pointerMoveListener);
          this.pointerMoveListener = null;
        }
        if (this.pointerUpListener) {
          removeEventListener(this.pointerUpListener.type, this.pointerUpListener);
          this.pointerUpListener = null;
        }
        if (this.contextMenuListener) {
          removeEventListener("contextmenu", this.contextMenuListener);
          this.contextMenuListener = null;
        }
        this.setMoveInputState(MOVE_INPUT_STATE.waitForInputStart);
        const hiddenPieces = this.view.piecesGroup.querySelectorAll("[visibility=hidden]");
        for (let i = 0; i < hiddenPieces.length; i++) {
          hiddenPieces[i].removeAttribute("visibility");
        }
        break;
      default:
        throw Error(`260b09: moveInputState ${newState}`);
    }
  }
  createDraggablePiece(pieceName) {
    if (this.draggablePiece) {
      throw Error("draggablePiece already exists");
    }
    this.draggablePiece = Svg.createSvg(document.body);
    this.draggablePiece.classList.add("cm-chessboard-draggable-piece");
    this.draggablePiece.setAttribute("width", this.view.squareWidth);
    this.draggablePiece.setAttribute("height", this.view.squareHeight);
    this.draggablePiece.setAttribute("style", "pointer-events: none");
    this.draggablePiece.name = pieceName;
    const spriteUrl = this.chessboard.props.assetsCache ? "" : this.view.getSpriteUrl();
    const piece = Svg.addElement(this.draggablePiece, "use", {
      href: `${spriteUrl}#${pieceName}`
    });
    const scaling = this.view.squareHeight / this.chessboard.props.style.pieces.tileSize;
    const transformScale = this.draggablePiece.createSVGTransform();
    transformScale.setScale(scaling, scaling);
    piece.transform.baseVal.appendItem(transformScale);
  }
  moveDraggablePiece(x, y) {
    this.draggablePiece.setAttribute(
      "style",
      `pointer-events: none; position: absolute; left: ${x - this.view.squareHeight / 2}px; top: ${y - this.view.squareHeight / 2}px`
    );
  }
  onPointerDown(e) {
    if (!(e.type === "mousedown" && e.button === 0 || e.type === "touchstart")) {
      return;
    }
    const square = e.target.getAttribute("data-square");
    if (!square) {
      return;
    }
    const pieceName = this.chessboard.getPiece(square);
    let color;
    if (pieceName) {
      color = pieceName ? pieceName.substring(0, 1) : null;
      if (color === "w" && this.chessboard.state.inputWhiteEnabled || color === "b" && this.chessboard.state.inputBlackEnabled) {
        e.preventDefault();
      }
    }
    if (this.moveInputState !== MOVE_INPUT_STATE.waitForInputStart || this.chessboard.state.inputWhiteEnabled && color === "w" || this.chessboard.state.inputBlackEnabled && color === "b") {
      let point;
      if (e.type === "mousedown") {
        point = { x: e.clientX, y: e.clientY };
      } else if (e.type === "touchstart") {
        point = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      if (this.moveInputState === MOVE_INPUT_STATE.waitForInputStart && pieceName && this.moveInputStartedCallback(square)) {
        this.setMoveInputState(MOVE_INPUT_STATE.pieceClickedThreshold, {
          square,
          piece: pieceName,
          point,
          type: e.type
        });
      } else if (this.moveInputState === MOVE_INPUT_STATE.clickTo) {
        if (square === this.fromSquare) {
          this.setMoveInputState(MOVE_INPUT_STATE.secondClickThreshold, {
            square,
            piece: pieceName,
            point,
            type: e.type
          });
        } else {
          const pieceName2 = this.chessboard.getPiece(square);
          const pieceColor = pieceName2 ? pieceName2.substring(0, 1) : null;
          const startPieceName = this.chessboard.getPiece(this.fromSquare);
          const startPieceColor = startPieceName ? startPieceName.substring(0, 1) : null;
          if (color && startPieceColor === pieceColor) {
            const result = this.validateMoveInputCallback(this.fromSquare, square);
            if (!result) {
              this.moveInputCanceledCallback(this.fromSquare, square, MOVE_CANCELED_REASON.clickedAnotherPiece);
              if (this.moveInputStartedCallback(square)) {
                this.setMoveInputState(MOVE_INPUT_STATE.pieceClickedThreshold, {
                  square,
                  piece: pieceName2,
                  point,
                  type: e.type
                });
              } else {
                this.setMoveInputState(MOVE_INPUT_STATE.reset);
              }
            }
          } else {
            this.setMoveInputState(MOVE_INPUT_STATE.moveDone, { square });
          }
        }
      }
    }
  }
  onPointerMove(e) {
    let pageX, pageY, clientX, clientY, target;
    if (e.type === "mousemove") {
      clientX = e.clientX;
      clientY = e.clientY;
      pageX = e.pageX;
      pageY = e.pageY;
      target = e.target;
    } else if (e.type === "touchmove") {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      pageX = e.touches[0].pageX;
      pageY = e.touches[0].pageY;
      target = document.elementFromPoint(clientX, clientY);
    }
    if (this.moveInputState === MOVE_INPUT_STATE.pieceClickedThreshold || this.moveInputState === MOVE_INPUT_STATE.secondClickThreshold) {
      if (Math.abs(this.startPoint.x - clientX) > DRAG_THRESHOLD || Math.abs(this.startPoint.y - clientY) > DRAG_THRESHOLD) {
        if (this.moveInputState === MOVE_INPUT_STATE.secondClickThreshold) {
          this.setMoveInputState(MOVE_INPUT_STATE.clickDragTo, {
            square: this.fromSquare,
            piece: this.movedPiece
          });
        } else {
          this.setMoveInputState(MOVE_INPUT_STATE.dragTo, { square: this.fromSquare, piece: this.movedPiece });
        }
        if (this.view.chessboard.state.inputEnabled()) {
          this.moveDraggablePiece(pageX, pageY);
        }
      }
    } else if (this.moveInputState === MOVE_INPUT_STATE.dragTo || this.moveInputState === MOVE_INPUT_STATE.clickDragTo || this.moveInputState === MOVE_INPUT_STATE.clickTo) {
      if (target && target.getAttribute && target.parentElement === this.view.boardGroup) {
        const square = target.getAttribute("data-square");
        if (square !== this.fromSquare && square !== this.toSquare) {
          this.toSquare = square;
          this.movingOverSquareCallback(this.fromSquare, this.toSquare);
        } else if (square === this.fromSquare && this.toSquare !== null) {
          this.toSquare = null;
          this.movingOverSquareCallback(this.fromSquare, null);
        }
      } else if (this.toSquare !== null) {
        this.toSquare = null;
        this.movingOverSquareCallback(this.fromSquare, null);
      }
      if (this.view.chessboard.state.inputEnabled() && (this.moveInputState === MOVE_INPUT_STATE.dragTo || this.moveInputState === MOVE_INPUT_STATE.clickDragTo)) {
        this.moveDraggablePiece(pageX, pageY);
      }
    }
  }
  onPointerUp(e) {
    let target;
    if (e.type === "mouseup") {
      target = e.target;
    } else if (e.type === "touchend") {
      target = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }
    if (target && target.getAttribute) {
      const square = target.getAttribute("data-square");
      if (square) {
        if (this.moveInputState === MOVE_INPUT_STATE.dragTo || this.moveInputState === MOVE_INPUT_STATE.clickDragTo) {
          if (this.fromSquare === square) {
            if (this.moveInputState === MOVE_INPUT_STATE.clickDragTo) {
              this.chessboard.state.position.setPiece(this.fromSquare, this.movedPiece);
              this.view.setPieceVisibility(this.fromSquare);
              this.moveInputCanceledCallback(square, null, MOVE_CANCELED_REASON.draggedBack);
              this.setMoveInputState(MOVE_INPUT_STATE.reset);
            } else {
              this.setMoveInputState(MOVE_INPUT_STATE.clickTo, { square });
            }
          } else {
            this.setMoveInputState(MOVE_INPUT_STATE.moveDone, { square });
          }
        } else if (this.moveInputState === MOVE_INPUT_STATE.pieceClickedThreshold) {
          this.setMoveInputState(MOVE_INPUT_STATE.clickTo, { square });
        } else if (this.moveInputState === MOVE_INPUT_STATE.secondClickThreshold) {
          this.setMoveInputState(MOVE_INPUT_STATE.reset);
          this.moveInputCanceledCallback(square, null, MOVE_CANCELED_REASON.secondClick);
        }
      } else {
        this.view.redrawPieces();
        const moveStartSquare = this.fromSquare;
        this.setMoveInputState(MOVE_INPUT_STATE.reset);
        this.moveInputCanceledCallback(moveStartSquare, null, MOVE_CANCELED_REASON.movedOutOfBoard);
      }
    } else {
      this.view.redrawPieces();
      this.setMoveInputState(MOVE_INPUT_STATE.reset);
    }
  }
  onContextMenu(e) {
    e.preventDefault();
    this.view.redrawPieces();
    this.setMoveInputState(MOVE_INPUT_STATE.reset);
    this.moveInputCanceledCallback(this.fromSquare, null, MOVE_CANCELED_REASON.secondaryClick);
  }
  isDragging() {
    return this.moveInputState === MOVE_INPUT_STATE.dragTo || this.moveInputState === MOVE_INPUT_STATE.clickDragTo;
  }
  destroy() {
    this.setMoveInputState(MOVE_INPUT_STATE.reset);
  }
}
const COLOR = {
  white: "w",
  black: "b"
};
const INPUT_EVENT_TYPE = {
  moveInputStarted: "moveInputStarted",
  movingOverSquare: "movingOverSquare",
  // while dragging or hover after click
  validateMoveInput: "validateMoveInput",
  moveInputCanceled: "moveInputCanceled",
  moveInputFinished: "moveInputFinished"
};
const POINTER_EVENTS = {
  pointerdown: "pointerdown"
};
const BORDER_TYPE = {
  none: "none",
  // no border
  thin: "thin",
  // thin border
  frame: "frame"
  // wide border with coordinates in it
};
class ChessboardView {
  constructor(chessboard) {
    this.chessboard = chessboard;
    this.visualMoveInput = new VisualMoveInput(this);
    if (chessboard.props.assetsCache) {
      this.cacheSpriteToDiv("cm-chessboard-sprite", this.getSpriteUrl());
    }
    this.container = document.createElement("div");
    this.chessboard.context.appendChild(this.container);
    if (chessboard.props.responsive) {
      if (typeof ResizeObserver !== "undefined") {
        this.resizeObserver = new ResizeObserver(() => {
          this.resizeTimeout = setTimeout(() => {
            this.resizeTimeout = null;
            this.handleResize();
          });
        });
        this.resizeObserver.observe(this.chessboard.context);
      } else {
        this.resizeListener = this.handleResize.bind(this);
        window.addEventListener("resize", this.resizeListener);
      }
    }
    this.positionsAnimationTask = Promise.resolve();
    this.pointerDownListener = this.pointerDownHandler.bind(this);
    this.container.addEventListener("mousedown", this.pointerDownListener);
    this.container.addEventListener("touchstart", this.pointerDownListener, { passive: false });
    this.createSvgAndGroups();
    this.handleResize();
  }
  pointerDownHandler(e) {
    this.visualMoveInput.onPointerDown(e);
  }
  destroy() {
    this.visualMoveInput.destroy();
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.chessboard.context);
    }
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = null;
    }
    if (this.resizeListener) {
      window.removeEventListener("resize", this.resizeListener);
    }
    this.chessboard.context.removeEventListener("mousedown", this.pointerDownListener);
    this.chessboard.context.removeEventListener("touchstart", this.pointerDownListener);
    Svg.removeElement(this.svg);
    this.container.remove();
  }
  // Sprite //
  cacheSpriteToDiv(wrapperId, url) {
    if (!document.getElementById(wrapperId)) {
      const wrapper = document.createElement("div");
      wrapper.style.transform = "scale(0)";
      wrapper.style.position = "absolute";
      wrapper.setAttribute("aria-hidden", "true");
      wrapper.id = wrapperId;
      document.body.appendChild(wrapper);
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.onload = function() {
        wrapper.insertAdjacentHTML("afterbegin", xhr.response);
      };
      xhr.send();
    }
  }
  createSvgAndGroups() {
    this.svg = Svg.createSvg(this.container);
    let cssClass = this.chessboard.props.style.cssClass ? this.chessboard.props.style.cssClass : "default";
    this.svg.setAttribute("class", "cm-chessboard border-type-" + this.chessboard.props.style.borderType + " " + cssClass);
    this.svg.setAttribute("role", "img");
    this.updateMetrics();
    this.boardGroup = Svg.addElement(this.svg, "g", { class: "board" });
    this.coordinatesGroup = Svg.addElement(this.svg, "g", { class: "coordinates", "aria-hidden": "true" });
    this.markersLayer = Svg.addElement(this.svg, "g", { class: "markers-layer" });
    this.piecesLayer = Svg.addElement(this.svg, "g", { class: "pieces-layer" });
    this.piecesGroup = Svg.addElement(this.piecesLayer, "g", { class: "pieces" });
    this.markersTopLayer = Svg.addElement(this.svg, "g", { class: "markers-top-layer" });
    this.interactiveTopLayer = Svg.addElement(this.svg, "g", { class: "interactive-top-layer" });
  }
  updateMetrics() {
    const piecesTileSize = this.chessboard.props.style.pieces.tileSize;
    this.width = this.container.clientWidth;
    this.height = this.container.clientWidth * (this.chessboard.props.style.aspectRatio || 1);
    if (this.chessboard.props.style.borderType === BORDER_TYPE.frame) {
      this.borderSize = this.width / 25;
    } else if (this.chessboard.props.style.borderType === BORDER_TYPE.thin) {
      this.borderSize = this.width / 320;
    } else {
      this.borderSize = 0;
    }
    this.innerWidth = this.width - 2 * this.borderSize;
    this.innerHeight = this.height - 2 * this.borderSize;
    this.squareWidth = this.innerWidth / 8;
    this.squareHeight = this.innerHeight / 8;
    this.scalingX = this.squareWidth / piecesTileSize;
    this.scalingY = this.squareHeight / piecesTileSize;
    this.pieceXTranslate = this.squareWidth / 2 - piecesTileSize * this.scalingY / 2;
  }
  handleResize() {
    if (!this.chessboard || !this.chessboard.state) {
      return;
    }
    this.container.style.width = this.chessboard.context.clientWidth + "px";
    this.container.style.height = this.chessboard.context.clientWidth * this.chessboard.props.style.aspectRatio + "px";
    if (this.container.clientWidth !== this.width || this.container.clientHeight !== this.height) {
      this.updateMetrics();
      this.redrawBoard();
      this.redrawPieces();
    }
    this.svg.setAttribute("width", "100%");
    this.svg.setAttribute("height", "100%");
  }
  redrawBoard() {
    this.chessboard.state.invokeExtensionPoints(EXTENSION_POINT.beforeRedrawBoard);
    this.redrawSquares();
    this.drawCoordinates();
    this.chessboard.state.invokeExtensionPoints(EXTENSION_POINT.afterRedrawBoard);
    this.visualizeInputState();
  }
  // Board //
  redrawSquares() {
    while (this.boardGroup.firstChild) {
      this.boardGroup.removeChild(this.boardGroup.lastChild);
    }
    let boardBorder = Svg.addElement(this.boardGroup, "rect", { width: this.width, height: this.height });
    boardBorder.setAttribute("class", "border");
    if (this.chessboard.props.style.borderType === BORDER_TYPE.frame) {
      const innerPos = this.borderSize;
      let borderInner = Svg.addElement(this.boardGroup, "rect", {
        x: innerPos,
        y: innerPos,
        width: this.width - innerPos * 2,
        height: this.height - innerPos * 2
      });
      borderInner.setAttribute("class", "border-inner");
    }
    for (let i = 0; i < 64; i++) {
      const index = this.chessboard.state.orientation === COLOR.white ? i : 63 - i;
      const squareColor = (9 * index & 8) === 0 ? "black" : "white";
      const fieldClass = `square ${squareColor}`;
      const point = this.squareToPoint(Position.indexToSquare(index));
      const squareRect = Svg.addElement(this.boardGroup, "rect", {
        x: point.x,
        y: point.y,
        width: this.squareWidth,
        height: this.squareHeight
      });
      squareRect.setAttribute("class", fieldClass);
      squareRect.setAttribute("data-square", Position.indexToSquare(index));
    }
  }
  drawCoordinates() {
    if (!this.chessboard.props.style.showCoordinates) {
      return;
    }
    while (this.coordinatesGroup.firstChild) {
      this.coordinatesGroup.removeChild(this.coordinatesGroup.lastChild);
    }
    const inline = this.chessboard.props.style.borderType !== BORDER_TYPE.frame;
    for (let file2 = 0; file2 < 8; file2++) {
      let x = this.borderSize + (17 + this.chessboard.props.style.pieces.tileSize * file2) * this.scalingX;
      let y = this.height - this.scalingY * 3.5;
      let cssClass = "coordinate file";
      if (inline) {
        x = x + this.scalingX * 15.5;
        cssClass += file2 % 2 ? " white" : " black";
      }
      const textElement = Svg.addElement(this.coordinatesGroup, "text", {
        class: cssClass,
        x,
        y,
        style: `font-size: ${this.scalingY * 10}px`
      });
      if (this.chessboard.state.orientation === COLOR.white) {
        textElement.textContent = String.fromCharCode(97 + file2);
      } else {
        textElement.textContent = String.fromCharCode(104 - file2);
      }
    }
    for (let rank2 = 0; rank2 < 8; rank2++) {
      let x = this.borderSize / 3.7;
      let y = this.borderSize + 25 * this.scalingY + rank2 * this.squareHeight;
      let cssClass = "coordinate rank";
      if (inline) {
        cssClass += rank2 % 2 ? " black" : " white";
        if (this.chessboard.props.style.borderType === BORDER_TYPE.frame) {
          x = x + this.scalingX * 10;
          y = y - this.scalingY * 15;
        } else {
          x = x + this.scalingX * 2;
          y = y - this.scalingY * 15;
        }
      }
      const textElement = Svg.addElement(this.coordinatesGroup, "text", {
        class: cssClass,
        x,
        y,
        style: `font-size: ${this.scalingY * 10}px`
      });
      if (this.chessboard.state.orientation === COLOR.white) {
        textElement.textContent = "" + (8 - rank2);
      } else {
        textElement.textContent = "" + (1 + rank2);
      }
    }
  }
  // Pieces //
  redrawPieces(squares = this.chessboard.state.position.squares) {
    const childNodes = Array.from(this.piecesGroup.childNodes);
    const isDragging = this.visualMoveInput.isDragging();
    for (let i = 0; i < 64; i++) {
      const pieceName = squares[i];
      if (pieceName) {
        const square = Position.indexToSquare(i);
        this.drawPieceOnSquare(square, pieceName, isDragging && square === this.visualMoveInput.fromSquare);
      }
    }
    for (const childNode of childNodes) {
      this.piecesGroup.removeChild(childNode);
    }
  }
  drawPiece(parentGroup, pieceName, point) {
    const pieceGroup = Svg.addElement(parentGroup, "g", {});
    pieceGroup.setAttribute("data-piece", pieceName);
    const transform = this.svg.createSVGTransform();
    transform.setTranslate(point.x, point.y);
    pieceGroup.transform.baseVal.appendItem(transform);
    const spriteUrl = this.chessboard.props.assetsCache ? "" : this.getSpriteUrl();
    const pieceUse = Svg.addElement(pieceGroup, "use", {
      href: `${spriteUrl}#${pieceName}`,
      class: "piece"
    });
    const transformScale = this.svg.createSVGTransform();
    transformScale.setScale(this.scalingY, this.scalingY);
    pieceUse.transform.baseVal.appendItem(transformScale);
    return pieceGroup;
  }
  drawPieceOnSquare(square, pieceName, hidden = false) {
    const pieceGroup = Svg.addElement(this.piecesGroup, "g", {});
    pieceGroup.setAttribute("data-piece", pieceName);
    pieceGroup.setAttribute("data-square", square);
    if (hidden) {
      pieceGroup.setAttribute("visibility", "hidden");
    }
    const point = this.squareToPoint(square);
    const transform = this.svg.createSVGTransform();
    transform.setTranslate(point.x, point.y);
    pieceGroup.transform.baseVal.appendItem(transform);
    const spriteUrl = this.chessboard.props.assetsCache ? "" : this.getSpriteUrl();
    const pieceUse = Svg.addElement(pieceGroup, "use", {
      href: `${spriteUrl}#${pieceName}`,
      class: "piece"
    });
    const transformTranslate = this.svg.createSVGTransform();
    transformTranslate.setTranslate(this.pieceXTranslate, 0);
    pieceUse.transform.baseVal.appendItem(transformTranslate);
    const transformScale = this.svg.createSVGTransform();
    transformScale.setScale(this.scalingY, this.scalingY);
    pieceUse.transform.baseVal.appendItem(transformScale);
    return pieceGroup;
  }
  setPieceVisibility(square, visible = true) {
    const piece = this.getPieceElement(square);
    if (piece) {
      if (visible) {
        piece.setAttribute("visibility", "visible");
      } else {
        piece.setAttribute("visibility", "hidden");
      }
    } else {
      console.warn("no piece on", square);
    }
  }
  getPieceElement(square) {
    if (!square || square.length < 2) {
      console.warn("invalid square", square);
      return null;
    }
    const piece = this.piecesGroup.querySelector(`g[data-square='${square}']`);
    if (!piece) {
      console.warn("no piece on", square);
      return null;
    }
    return piece;
  }
  // enable and disable move input //
  enableMoveInput(eventHandler, color = null) {
    if (this.chessboard.state.moveInputCallback) {
      throw Error("moveInput already enabled");
    }
    if (color === COLOR.white) {
      this.chessboard.state.inputWhiteEnabled = true;
    } else if (color === COLOR.black) {
      this.chessboard.state.inputBlackEnabled = true;
    } else {
      this.chessboard.state.inputWhiteEnabled = true;
      this.chessboard.state.inputBlackEnabled = true;
    }
    this.chessboard.state.moveInputCallback = eventHandler;
    this.chessboard.state.invokeExtensionPoints(EXTENSION_POINT.moveInputToggled, { enabled: true, color });
    this.visualizeInputState();
  }
  disableMoveInput() {
    this.chessboard.state.inputWhiteEnabled = false;
    this.chessboard.state.inputBlackEnabled = false;
    this.chessboard.state.moveInputCallback = null;
    this.chessboard.state.invokeExtensionPoints(EXTENSION_POINT.moveInputToggled, { enabled: false });
    this.visualizeInputState();
  }
  // callbacks //
  moveInputStartedCallback(square) {
    const data = {
      chessboard: this.chessboard,
      type: INPUT_EVENT_TYPE.moveInputStarted,
      square,
      /** square is deprecated, use squareFrom (2023-05-22) */
      squareFrom: square,
      piece: this.chessboard.getPiece(square)
    };
    if (this.chessboard.state.moveInputCallback) {
      data.moveInputCallbackResult = this.chessboard.state.moveInputCallback(data);
    }
    this.chessboard.state.invokeExtensionPoints(EXTENSION_POINT.moveInput, data);
    return data.moveInputCallbackResult;
  }
  movingOverSquareCallback(squareFrom, squareTo) {
    const data = {
      chessboard: this.chessboard,
      type: INPUT_EVENT_TYPE.movingOverSquare,
      squareFrom,
      squareTo,
      piece: this.chessboard.getPiece(squareFrom)
    };
    if (this.chessboard.state.moveInputCallback) {
      data.moveInputCallbackResult = this.chessboard.state.moveInputCallback(data);
    }
    this.chessboard.state.invokeExtensionPoints(EXTENSION_POINT.moveInput, data);
  }
  validateMoveInputCallback(squareFrom, squareTo) {
    const data = {
      chessboard: this.chessboard,
      type: INPUT_EVENT_TYPE.validateMoveInput,
      squareFrom,
      squareTo,
      piece: this.chessboard.getPiece(squareFrom)
    };
    if (this.chessboard.state.moveInputCallback) {
      data.moveInputCallbackResult = this.chessboard.state.moveInputCallback(data);
    }
    this.chessboard.state.invokeExtensionPoints(EXTENSION_POINT.moveInput, data);
    return data.moveInputCallbackResult;
  }
  moveInputCanceledCallback(squareFrom, squareTo, reason) {
    const data = {
      chessboard: this.chessboard,
      type: INPUT_EVENT_TYPE.moveInputCanceled,
      reason,
      squareFrom,
      squareTo
    };
    if (this.chessboard.state.moveInputCallback) {
      this.chessboard.state.moveInputCallback(data);
    }
    this.chessboard.state.invokeExtensionPoints(EXTENSION_POINT.moveInput, data);
  }
  moveInputFinishedCallback(squareFrom, squareTo, legalMove) {
    const data = {
      chessboard: this.chessboard,
      type: INPUT_EVENT_TYPE.moveInputFinished,
      squareFrom,
      squareTo,
      legalMove
    };
    if (this.chessboard.state.moveInputCallback) {
      this.chessboard.state.moveInputCallback(data);
    }
    this.chessboard.state.invokeExtensionPoints(EXTENSION_POINT.moveInput, data);
  }
  // Helpers //
  visualizeInputState() {
    if (this.chessboard.state) {
      if (this.chessboard.state.inputWhiteEnabled || this.chessboard.state.inputBlackEnabled) {
        this.boardGroup.setAttribute("class", "board input-enabled");
      } else {
        this.boardGroup.setAttribute("class", "board");
      }
    }
  }
  indexToPoint(index) {
    let x, y;
    if (this.chessboard.state.orientation === COLOR.white) {
      x = this.borderSize + index % 8 * this.squareWidth;
      y = this.borderSize + (7 - Math.floor(index / 8)) * this.squareHeight;
    } else {
      x = this.borderSize + (7 - index % 8) * this.squareWidth;
      y = this.borderSize + Math.floor(index / 8) * this.squareHeight;
    }
    return { x, y };
  }
  squareToPoint(square) {
    const index = Position.squareToIndex(square);
    return this.indexToPoint(index);
  }
  getSpriteUrl() {
    if (Utils.isAbsoluteUrl(this.chessboard.props.style.pieces.file)) {
      return this.chessboard.props.style.pieces.file;
    } else {
      return this.chessboard.props.assetsUrl + this.chessboard.props.style.pieces.file;
    }
  }
}
const PIECE = {
  wp: "wp",
  wb: "wb",
  wn: "wn",
  wr: "wr",
  wq: "wq",
  wk: "wk",
  bp: "bp",
  bb: "bb",
  bn: "bn",
  br: "br",
  bq: "bq",
  bk: "bk"
};
const PIECES_FILE_TYPE = {
  svgSprite: "svgSprite"
};
class Chessboard {
  constructor(context, props = {}) {
    if (!context) {
      throw new Error("container element is " + context);
    }
    this.context = context;
    this.id = (Math.random() + 1).toString(36).substring(2, 8);
    this.extensions = [];
    this.props = {
      position: FEN.empty,
      // set position as fen, use FEN.start or FEN.empty as shortcuts
      orientation: COLOR.white,
      // white on bottom
      responsive: true,
      // resize the board automatically to the size of the context element
      assetsUrl: "./assets/",
      // put all css and sprites in this folder, will be ignored for absolute urls of assets files
      assetsCache: true,
      // cache the sprites, deactivate if you want to use multiple pieces sets in one page
      style: {
        cssClass: "default",
        // set the css theme of the board, try "green", "blue" or "chess-club"
        showCoordinates: true,
        // show ranks and files
        borderType: BORDER_TYPE.none,
        // "thin" thin border, "frame" wide border with coordinates in it, "none" no border
        aspectRatio: 1,
        // height/width of the board
        pieces: {
          type: PIECES_FILE_TYPE.svgSprite,
          // pieces are in an SVG sprite, no other type supported for now
          file: "pieces/standard.svg",
          // the filename of the sprite in `assets/pieces/` or an absolute url like `https://…` or `/…`
          tileSize: 40
          // the tile size in the sprite
        },
        animationDuration: 300
        // pieces animation duration in milliseconds. Disable all animations with `0`
      },
      extensions: [
        /* {class: ExtensionClass, props: { ... }} */
      ]
      // add extensions here
    };
    Utils.mergeObjects(this.props, props);
    this.state = new ChessboardState();
    this.view = new ChessboardView(this);
    this.positionAnimationsQueue = new PositionAnimationsQueue(this);
    this.state.orientation = this.props.orientation;
    for (const extensionData of this.props.extensions) {
      this.addExtension(extensionData.class, extensionData.props);
    }
    this.view.redrawBoard();
    this.state.position = new Position(this.props.position);
    this.view.redrawPieces();
    this.state.invokeExtensionPoints(EXTENSION_POINT.positionChanged);
    this.initialized = Promise.resolve();
  }
  // API //
  async setPiece(square, piece, animated = false) {
    const positionFrom = this.state.position.clone();
    this.state.position.setPiece(square, piece);
    this.state.invokeExtensionPoints(EXTENSION_POINT.positionChanged);
    return this.positionAnimationsQueue.enqueuePositionChange(positionFrom, this.state.position.clone(), animated);
  }
  async movePiece(squareFrom, squareTo, animated = false) {
    const positionFrom = this.state.position.clone();
    this.state.position.movePiece(squareFrom, squareTo);
    this.state.invokeExtensionPoints(EXTENSION_POINT.positionChanged);
    return this.positionAnimationsQueue.enqueuePositionChange(positionFrom, this.state.position.clone(), animated);
  }
  async setPosition(fen, animated = false) {
    const positionFrom = this.state.position.clone();
    const positionTo = new Position(fen);
    if (positionFrom.getFen() !== positionTo.getFen()) {
      this.state.position.setFen(fen);
      this.state.invokeExtensionPoints(EXTENSION_POINT.positionChanged);
    }
    return this.positionAnimationsQueue.enqueuePositionChange(positionFrom, this.state.position.clone(), animated);
  }
  async setOrientation(color, animated = false) {
    const position = this.state.position.clone();
    if (this.boardTurning) {
      console.warn("setOrientation is only once in queue allowed");
      return;
    }
    this.boardTurning = true;
    return this.positionAnimationsQueue.enqueueTurnBoard(position, color, animated).then(() => {
      this.boardTurning = false;
      this.state.invokeExtensionPoints(EXTENSION_POINT.boardChanged);
    });
  }
  getPiece(square) {
    return this.state.position.getPiece(square);
  }
  getPosition() {
    return this.state.position.getFen();
  }
  getOrientation() {
    return this.state.orientation;
  }
  enableMoveInput(eventHandler, color = void 0) {
    this.view.enableMoveInput(eventHandler, color);
  }
  disableMoveInput() {
    this.view.disableMoveInput();
  }
  isMoveInputEnabled() {
    return this.state.inputWhiteEnabled || this.state.inputBlackEnabled;
  }
  enableSquareSelect(eventType = POINTER_EVENTS.pointerdown, eventHandler) {
    if (!this.squareSelectListener) {
      this.squareSelectListener = function(e) {
        const square = e.target.getAttribute("data-square");
        eventHandler({
          eventType: e.type,
          event: e,
          chessboard: this,
          square
        });
      };
    }
    this.context.addEventListener(eventType, this.squareSelectListener);
    this.state.squareSelectEnabled = true;
    this.view.visualizeInputState();
  }
  disableSquareSelect(eventType) {
    this.context.removeEventListener(eventType, this.squareSelectListener);
    this.squareSelectListener = void 0;
    this.state.squareSelectEnabled = false;
    this.view.visualizeInputState();
  }
  isSquareSelectEnabled() {
    return this.state.squareSelectEnabled;
  }
  addExtension(extensionClass, props) {
    if (this.getExtension(extensionClass)) {
      throw Error('extension "' + extensionClass.name + '" already added');
    }
    this.extensions.push(new extensionClass(this, props));
  }
  getExtension(extensionClass) {
    for (const extension of this.extensions) {
      if (extension instanceof extensionClass) {
        return extension;
      }
    }
    return null;
  }
  destroy() {
    this.state.invokeExtensionPoints(EXTENSION_POINT.destroy);
    this.positionAnimationsQueue.destroy();
    this.view.destroy();
    this.view = void 0;
    this.state = void 0;
  }
}
const MARKER_TYPE$1 = {
  frame: { class: "marker-frame", slice: "markerFrame" },
  framePrimary: { class: "marker-frame-primary", slice: "markerFrame" },
  frameDanger: { class: "marker-frame-danger", slice: "markerFrame" },
  circle: { class: "marker-circle", slice: "markerCircle" },
  circlePrimary: { class: "marker-circle-primary", slice: "markerCircle" },
  circleDanger: { class: "marker-circle-danger", slice: "markerCircle" },
  circleDangerFilled: { class: "marker-circle-danger-filled", slice: "markerCircleFilled" },
  square: { class: "marker-square", slice: "markerSquare" },
  dot: { class: "marker-dot", slice: "markerDot", position: "above" },
  bevel: { class: "marker-bevel", slice: "markerBevel" }
};
class Markers extends Extension {
  /** @constructor */
  constructor(chessboard, props = {}) {
    super(chessboard);
    this.registerExtensionPoint(EXTENSION_POINT.afterRedrawBoard, () => {
      this.onRedrawBoard();
    });
    this.registerExtensionPoint(EXTENSION_POINT.destroy, () => {
      this.onDestroy();
    });
    this.props = {
      autoMarkers: MARKER_TYPE$1.frame,
      // set to `null` to disable autoMarkers
      sprite: "extensions/markers/markers.svg"
      // the sprite file of the markers
    };
    Object.assign(this.props, props);
    if (chessboard.props.assetsCache) {
      chessboard.view.cacheSpriteToDiv("cm-chessboard-markers", this.getSpriteUrl());
    }
    chessboard.addMarker = this.addMarker.bind(this);
    chessboard.getMarkers = this.getMarkers.bind(this);
    chessboard.removeMarkers = this.removeMarkers.bind(this);
    chessboard.addLegalMovesMarkers = this.addLegalMovesMarkers.bind(this);
    chessboard.removeLegalMovesMarkers = this.removeLegalMovesMarkers.bind(this);
    this.markerGroupDown = Svg.addElement(chessboard.view.markersLayer, "g", { class: "markers" });
    this.markerGroupUp = Svg.addElement(chessboard.view.markersTopLayer, "g", { class: "markers" });
    this.markers = [];
    if (this.props.autoMarkers) {
      Object.assign(this.props.autoMarkers, this.props.autoMarkers);
      this.registerExtensionPoint(EXTENSION_POINT.moveInput, (event) => {
        this.drawAutoMarkers(event);
      });
    }
  }
  onDestroy() {
    this.markers.length = 0;
    if (this.markerGroupDown && this.markerGroupDown.parentNode) {
      this.markerGroupDown.parentNode.removeChild(this.markerGroupDown);
    }
    if (this.markerGroupUp && this.markerGroupUp.parentNode) {
      this.markerGroupUp.parentNode.removeChild(this.markerGroupUp);
    }
    delete this.chessboard.addMarker;
    delete this.chessboard.getMarkers;
    delete this.chessboard.removeMarkers;
    delete this.chessboard.addLegalMovesMarkers;
    delete this.chessboard.removeLegalMovesMarkers;
  }
  drawAutoMarkers(event) {
    if (event.type !== INPUT_EVENT_TYPE.moveInputFinished) {
      this.removeMarkers(this.props.autoMarkers);
    }
    if (event.type === INPUT_EVENT_TYPE.moveInputStarted && !event.moveInputCallbackResult) {
      return;
    }
    if (event.type === INPUT_EVENT_TYPE.moveInputStarted || event.type === INPUT_EVENT_TYPE.movingOverSquare) {
      if (event.squareFrom) {
        this.addMarker(this.props.autoMarkers, event.squareFrom);
      }
      if (event.squareTo) {
        this.addMarker(this.props.autoMarkers, event.squareTo);
      }
    }
  }
  onRedrawBoard() {
    while (this.markerGroupUp.firstChild) {
      this.markerGroupUp.removeChild(this.markerGroupUp.firstChild);
    }
    while (this.markerGroupDown.firstChild) {
      this.markerGroupDown.removeChild(this.markerGroupDown.firstChild);
    }
    this.markers.forEach(
      (marker) => {
        this.drawMarker(marker);
      }
    );
  }
  addLegalMovesMarkers(moves) {
    this.batchUpdate = true;
    try {
      for (const move of moves) {
        if (move.promotion && move.promotion !== "q") {
          continue;
        }
        if (this.chessboard.getPiece(move.to)) {
          this.chessboard.addMarker(MARKER_TYPE$1.bevel, move.to);
        } else {
          this.chessboard.addMarker(MARKER_TYPE$1.dot, move.to);
        }
      }
    } finally {
      this.batchUpdate = false;
      this.onRedrawBoard();
    }
  }
  removeLegalMovesMarkers() {
    this.batchUpdate = true;
    try {
      this.chessboard.removeMarkers(MARKER_TYPE$1.bevel);
      this.chessboard.removeMarkers(MARKER_TYPE$1.dot);
    } finally {
      this.batchUpdate = false;
      this.onRedrawBoard();
    }
  }
  drawMarker(marker) {
    let markerGroup;
    if (marker.type.position === "above") {
      markerGroup = Svg.addElement(this.markerGroupUp, "g");
    } else {
      markerGroup = Svg.addElement(this.markerGroupDown, "g");
    }
    markerGroup.setAttribute("data-square", marker.square);
    const point = this.chessboard.view.squareToPoint(marker.square);
    const transform = this.chessboard.view.svg.createSVGTransform();
    transform.setTranslate(point.x, point.y);
    markerGroup.transform.baseVal.appendItem(transform);
    const spriteUrl = this.chessboard.props.assetsCache ? "" : this.getSpriteUrl();
    const markerUse = Svg.addElement(
      markerGroup,
      "use",
      { href: `${spriteUrl}#${marker.type.slice}`, class: "marker " + marker.type.class }
    );
    const transformScale = this.chessboard.view.svg.createSVGTransform();
    transformScale.setScale(this.chessboard.view.scalingX, this.chessboard.view.scalingY);
    markerUse.transform.baseVal.appendItem(transformScale);
    return markerGroup;
  }
  addMarker(type, square) {
    if (typeof type === "string" || typeof square === "object") {
      console.error("changed the signature of `addMarker` to `(type, square)` with v5.1.x");
      return;
    }
    this.markers.push(new Marker(square, type));
    if (!this.batchUpdate) {
      this.onRedrawBoard();
    }
  }
  getMarkers(type = void 0, square = void 0) {
    if (typeof type === "string" || typeof square === "object") {
      console.error("changed the signature of `getMarkers` to `(type, square)` with v5.1.x");
      return;
    }
    let markersFound = [];
    this.markers.forEach((marker) => {
      if (marker.matches(square, type)) {
        markersFound.push(marker);
      }
    });
    return markersFound;
  }
  removeMarkers(type = void 0, square = void 0) {
    if (typeof type === "string" || typeof square === "object") {
      console.error("changed the signature of `removeMarkers` to `(type, square)` with v5.1.x");
      return;
    }
    this.markers = this.markers.filter((marker) => !marker.matches(square, type));
    if (!this.batchUpdate) {
      this.onRedrawBoard();
    }
  }
  getSpriteUrl() {
    if (Utils.isAbsoluteUrl(this.props.sprite)) {
      return this.props.sprite;
    } else {
      return this.chessboard.props.assetsUrl + this.props.sprite;
    }
  }
}
class Marker {
  constructor(square, type) {
    this.square = square;
    this.type = type;
  }
  matches(square = void 0, type = void 0) {
    if (!type && !square) {
      return true;
    } else if (!type) {
      if (square === this.square) {
        return true;
      }
    } else if (!square) {
      if (this.type === type) {
        return true;
      }
    } else if (this.type === type && square === this.square) {
      return true;
    }
    return false;
  }
}
const ARROW_TYPE$1 = {
  success: { class: "arrow-success" },
  warning: { class: "arrow-warning" },
  info: { class: "arrow-info" },
  danger: { class: "arrow-danger" }
};
class Arrows extends Extension {
  /** @constructor */
  constructor(chessboard, props = {}) {
    super(chessboard);
    this.registerExtensionPoint(EXTENSION_POINT.afterRedrawBoard, () => {
      this.onRedrawBoard();
    });
    this.registerExtensionPoint(EXTENSION_POINT.destroy, () => {
      this.onDestroy();
    });
    this.props = {
      sprite: "extensions/arrows/arrows.svg",
      slice: "arrowDefault",
      headSize: 7,
      offsetFrom: 0,
      offsetTo: 0.55
    };
    Object.assign(this.props, props);
    if (this.chessboard.props.assetsCache) {
      this.chessboard.view.cacheSpriteToDiv("cm-chessboard-arrows", this.getSpriteUrl());
    }
    chessboard.addArrow = this.addArrow.bind(this);
    chessboard.getArrows = this.getArrows.bind(this);
    chessboard.removeArrows = this.removeArrows.bind(this);
    this.arrowGroup = Svg.addElement(chessboard.view.markersTopLayer, "g", { class: "arrows" });
    this.instanceId = Math.random().toString(36).slice(2, 10);
    this.arrows = [];
  }
  onDestroy() {
    this.arrows.length = 0;
    if (this.arrowGroup && this.arrowGroup.parentNode) {
      this.arrowGroup.parentNode.removeChild(this.arrowGroup);
    }
    delete this.chessboard.addArrow;
    delete this.chessboard.getArrows;
    delete this.chessboard.removeArrows;
  }
  onRedrawBoard() {
    while (this.arrowGroup.firstChild) {
      this.arrowGroup.removeChild(this.arrowGroup.firstChild);
    }
    this.arrows.forEach((arrow) => {
      this.drawArrow(arrow);
    });
  }
  drawArrow(arrow) {
    const view = this.chessboard.view;
    const arrowsGroup = Svg.addElement(this.arrowGroup, "g");
    arrowsGroup.setAttribute("data-arrow", arrow.from + arrow.to);
    arrowsGroup.setAttribute("class", "arrow " + arrow.type.class);
    const ptFrom = view.squareToPoint(arrow.from);
    const ptTo = view.squareToPoint(arrow.to);
    const spriteUrl = this.chessboard.props.assetsCache ? "" : this.getSpriteUrl();
    const defs = Svg.addElement(arrowsGroup, "defs");
    const id = "arrow-" + this.instanceId + "-" + arrow.from + arrow.to;
    const marker = Svg.addElement(defs, "marker", {
      id,
      markerWidth: this.props.headSize,
      markerHeight: this.props.headSize,
      refX: 20,
      refY: 20,
      viewBox: "0 0 40 40",
      orient: "auto",
      class: "arrow-head"
    });
    Svg.addElement(marker, "use", {
      href: `${spriteUrl}#${this.props.slice}`
    });
    const cx1 = ptFrom.x + view.squareWidth / 2;
    const cy1 = ptFrom.y + view.squareHeight / 2;
    const cx2 = ptTo.x + view.squareWidth / 2;
    const cy2 = ptTo.y + view.squareHeight / 2;
    const dx = cx2 - cx1;
    const dy = cy2 - cy1;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const halfMin = Math.min(view.squareWidth, view.squareHeight) / 2;
    const clamp01 = (v) => Math.max(0, Math.min(1, v));
    const rFrom = halfMin * clamp01(this.props.offsetFrom);
    const rTo = halfMin * clamp01(this.props.offsetTo);
    const x1 = cx1 + ux * rFrom;
    const y1 = cy1 + uy * rFrom;
    const x2 = cx2 - ux * rTo;
    const y2 = cy2 - uy * rTo;
    const width = (view.scalingX + view.scalingY) / 2 * 8;
    let lineFill = Svg.addElement(arrowsGroup, "line");
    lineFill.setAttribute("x1", x1.toString());
    lineFill.setAttribute("x2", x2.toString());
    lineFill.setAttribute("y1", y1.toString());
    lineFill.setAttribute("y2", y2.toString());
    lineFill.setAttribute("class", "arrow-line");
    lineFill.setAttribute("marker-end", "url(#" + id + ")");
    lineFill.setAttribute("stroke-width", width + "px");
  }
  addArrow(type, from, to) {
    this.arrows.push(new Arrow(from, to, type));
    this.onRedrawBoard();
  }
  getArrows(type = void 0, from = void 0, to = void 0) {
    let arrows = [];
    this.arrows.forEach((arrow) => {
      if (arrow.matches(from, to, type)) {
        arrows.push(arrow);
      }
    });
    return arrows;
  }
  removeArrows(type = void 0, from = void 0, to = void 0) {
    this.arrows = this.arrows.filter((arrow) => !arrow.matches(from, to, type));
    this.onRedrawBoard();
  }
  getSpriteUrl() {
    if (Utils.isAbsoluteUrl(this.props.sprite)) {
      return this.props.sprite;
    } else {
      return this.chessboard.props.assetsUrl + this.props.sprite;
    }
  }
}
class Arrow {
  constructor(from, to, type) {
    this.from = from;
    this.to = to;
    this.type = type;
  }
  matches(from = void 0, to = void 0, type = void 0) {
    if (from && from !== this.from) {
      return false;
    }
    if (to && to !== this.to) {
      return false;
    }
    return !(type && type !== this.type);
  }
}
const DISPLAY_STATE = {
  hidden: "hidden",
  displayRequested: "displayRequested",
  shown: "shown"
};
const translations = {
  de: {
    choosePromotion: "Bauernumwandlung wählen",
    promotionDialogTitle: "Bauernumwandlung",
    pieces: { q: "Dame", r: "Turm", b: "Läufer", n: "Springer" },
    promoteTo: "Umwandeln in"
  },
  en: {
    choosePromotion: "Choose promotion piece",
    promotionDialogTitle: "Pawn promotion",
    pieces: { q: "Queen", r: "Rook", b: "Bishop", n: "Knight" },
    promoteTo: "Promote to"
  }
};
const PROMOTION_DIALOG_RESULT_TYPE = {
  pieceSelected: "pieceSelected",
  canceled: "canceled"
};
class PromotionDialog extends Extension {
  /** @constructor */
  constructor(chessboard, props = {}) {
    super(chessboard);
    this.props = {
      language: navigator.language.substring(0, 2).toLowerCase()
    };
    Object.assign(this.props, props);
    if (this.props.language !== "de" && this.props.language !== "en") {
      this.props.language = "en";
    }
    this.t = translations[this.props.language];
    this.pieceOrder = ["q", "r", "b", "n"];
    this.focusedIndex = 0;
    this.previouslyFocusedElement = null;
    this.registerExtensionPoint(EXTENSION_POINT.afterRedrawBoard, this.extensionPointRedrawBoard.bind(this));
    this.registerExtensionPoint(EXTENSION_POINT.destroy, this.destroy.bind(this));
    chessboard.showPromotionDialog = this.showPromotionDialog.bind(this);
    chessboard.isPromotionDialogShown = this.isPromotionDialogShown.bind(this);
    this.promotionDialogGroup = Svg.addElement(chessboard.view.interactiveTopLayer, "g", {
      class: "promotion-dialog-group",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": this.t.choosePromotion
    });
    this.liveRegion = document.createElement("div");
    this.liveRegion.setAttribute("aria-live", "polite");
    this.liveRegion.setAttribute("aria-atomic", "true");
    this.liveRegion.className = "cm-chessboard-promotion-live-region visually-hidden";
    this.liveRegion.style.cssText = "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;";
    chessboard.context.appendChild(this.liveRegion);
    this.state = {
      displayState: DISPLAY_STATE.hidden,
      callback: null,
      dialogParams: {
        square: null,
        color: null
      }
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  // public (chessboard.showPromotionDialog)
  showPromotionDialog(square, color, callback) {
    this.previouslyFocusedElement = document.activeElement;
    this.focusedIndex = 0;
    this.state.dialogParams.square = square;
    this.state.dialogParams.color = color;
    this.state.callback = callback;
    this.setDisplayState(DISPLAY_STATE.displayRequested);
    this.showTimeoutId = setTimeout(() => {
      this.showTimeoutId = null;
      if (!this.chessboard.view) return;
      this.chessboard.view.positionsAnimationTask.then(() => {
        if (this.state.displayState !== DISPLAY_STATE.displayRequested) return;
        this.setDisplayState(DISPLAY_STATE.shown);
        this.announce(this.t.choosePromotion + ": " + this.pieceOrder.map((p) => this.t.pieces[p]).join(", "));
      });
    });
  }
  // public (chessboard.isPromotionDialogShown)
  isPromotionDialogShown() {
    return this.state.displayState === DISPLAY_STATE.shown || this.state.displayState === DISPLAY_STATE.displayRequested;
  }
  // private
  extensionPointRedrawBoard() {
    this.redrawDialog();
  }
  drawPieceButton(piece, point, index) {
    const squareWidth = this.chessboard.view.squareWidth;
    const squareHeight = this.chessboard.view.squareHeight;
    const pieceType = piece.charAt(1);
    const pieceName = this.t.pieces[pieceType];
    const buttonGroup = Svg.addElement(this.promotionDialogGroup, "g", {
      class: "promotion-dialog-button-group",
      role: "button",
      tabindex: index === 0 ? "0" : "-1",
      "aria-label": pieceName,
      "data-piece": piece,
      "data-index": index
    });
    Svg.addElement(
      buttonGroup,
      "rect",
      {
        x: point.x,
        y: point.y,
        width: squareWidth,
        height: squareHeight,
        class: "promotion-dialog-button",
        "data-piece": piece
      }
    );
    this.chessboard.view.drawPiece(buttonGroup, piece, point);
  }
  redrawDialog() {
    while (this.promotionDialogGroup.firstChild) {
      this.promotionDialogGroup.removeChild(this.promotionDialogGroup.firstChild);
    }
    if (this.state.displayState === DISPLAY_STATE.shown) {
      const squareWidth = this.chessboard.view.squareWidth;
      const squareHeight = this.chessboard.view.squareHeight;
      const squareCenterPoint = this.chessboard.view.squareToPoint(this.state.dialogParams.square);
      squareCenterPoint.x = squareCenterPoint.x + squareWidth / 2;
      squareCenterPoint.y = squareCenterPoint.y + squareHeight / 2;
      this.turned = false;
      const rank2 = parseInt(this.state.dialogParams.square.charAt(1), 10);
      if (this.chessboard.getOrientation() === COLOR.white && rank2 < 5 || this.chessboard.getOrientation() === COLOR.black && rank2 >= 5) {
        this.turned = true;
      }
      const turned = this.turned;
      const offsetY = turned ? -4 * squareHeight : 0;
      const offsetX = squareCenterPoint.x + squareWidth > this.chessboard.view.width ? -squareWidth : 0;
      Svg.addElement(
        this.promotionDialogGroup,
        "rect",
        {
          x: squareCenterPoint.x + offsetX,
          y: squareCenterPoint.y + offsetY,
          width: squareWidth,
          height: squareHeight * 4,
          class: "promotion-dialog"
        }
      );
      const dialogParams = this.state.dialogParams;
      if (turned) {
        this.drawPieceButton(PIECE[dialogParams.color + "q"], {
          x: squareCenterPoint.x + offsetX,
          y: squareCenterPoint.y - squareHeight
        }, 0);
        this.drawPieceButton(PIECE[dialogParams.color + "r"], {
          x: squareCenterPoint.x + offsetX,
          y: squareCenterPoint.y - squareHeight * 2
        }, 1);
        this.drawPieceButton(PIECE[dialogParams.color + "b"], {
          x: squareCenterPoint.x + offsetX,
          y: squareCenterPoint.y - squareHeight * 3
        }, 2);
        this.drawPieceButton(PIECE[dialogParams.color + "n"], {
          x: squareCenterPoint.x + offsetX,
          y: squareCenterPoint.y - squareHeight * 4
        }, 3);
      } else {
        this.drawPieceButton(PIECE[dialogParams.color + "q"], {
          x: squareCenterPoint.x + offsetX,
          y: squareCenterPoint.y
        }, 0);
        this.drawPieceButton(PIECE[dialogParams.color + "r"], {
          x: squareCenterPoint.x + offsetX,
          y: squareCenterPoint.y + squareHeight
        }, 1);
        this.drawPieceButton(PIECE[dialogParams.color + "b"], {
          x: squareCenterPoint.x + offsetX,
          y: squareCenterPoint.y + squareHeight * 2
        }, 2);
        this.drawPieceButton(PIECE[dialogParams.color + "n"], {
          x: squareCenterPoint.x + offsetX,
          y: squareCenterPoint.y + squareHeight * 3
        }, 3);
      }
    }
  }
  promotionDialogOnClickPiece(event) {
    if (event.button !== 2) {
      let piece = event.target.dataset.piece;
      if (!piece && event.target.closest) {
        const buttonGroup = event.target.closest(".promotion-dialog-button-group");
        if (buttonGroup) {
          piece = buttonGroup.dataset.piece;
        }
      }
      if (piece) {
        this.selectPiece(piece);
      } else {
        this.promotionDialogOnCancel(event);
      }
    }
  }
  selectPiece(piece) {
    if (this.state.callback) {
      this.state.callback({
        type: PROMOTION_DIALOG_RESULT_TYPE.pieceSelected,
        square: this.state.dialogParams.square,
        piece
      });
    }
    this.setDisplayState(DISPLAY_STATE.hidden);
  }
  promotionDialogOnCancel(event) {
    if (this.state.displayState === DISPLAY_STATE.shown) {
      event.preventDefault();
      this.setDisplayState(DISPLAY_STATE.hidden);
      if (this.state.callback) {
        this.state.callback({ type: PROMOTION_DIALOG_RESULT_TYPE.canceled });
      }
    }
  }
  contextMenu(event) {
    event.preventDefault();
    this.setDisplayState(DISPLAY_STATE.hidden);
    if (this.state.callback) {
      this.state.callback({ type: PROMOTION_DIALOG_RESULT_TYPE.canceled });
    }
  }
  setDisplayState(displayState) {
    const prevState = this.state.displayState;
    this.state.displayState = displayState;
    if (displayState === DISPLAY_STATE.shown) {
      this.clickDelegate = Utils.delegate(
        this.chessboard.view.svg,
        "pointerdown",
        "*",
        this.promotionDialogOnClickPiece.bind(this)
      );
      this.contextMenuListener = this.contextMenu.bind(this);
      this.chessboard.view.svg.addEventListener("contextmenu", this.contextMenuListener);
      document.addEventListener("keydown", this.handleKeyDown);
    } else if (displayState === DISPLAY_STATE.hidden) {
      if (this.clickDelegate) {
        this.clickDelegate.remove();
        this.clickDelegate = null;
      }
      if (this.contextMenuListener && this.chessboard.view) {
        this.chessboard.view.svg.removeEventListener("contextmenu", this.contextMenuListener);
        this.contextMenuListener = null;
      }
      document.removeEventListener("keydown", this.handleKeyDown);
      if (prevState === DISPLAY_STATE.shown && this.previouslyFocusedElement && this.previouslyFocusedElement.focus) {
        this.previouslyFocusedElement.focus();
      }
    }
    this.redrawDialog();
    if (displayState === DISPLAY_STATE.shown) {
      this.focusTimeoutId = setTimeout(() => {
        this.focusTimeoutId = null;
        this.focusButton(0);
      }, 0);
    }
  }
  handleKeyDown(event) {
    if (this.state.displayState !== DISPLAY_STATE.shown) {
      return;
    }
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (this.turned) {
          this.focusedIndex = (this.focusedIndex - 1 + 4) % 4;
        } else {
          this.focusedIndex = (this.focusedIndex + 1) % 4;
        }
        this.focusButton(this.focusedIndex);
        break;
      case "ArrowRight":
        event.preventDefault();
        this.focusedIndex = (this.focusedIndex + 1) % 4;
        this.focusButton(this.focusedIndex);
        break;
      case "ArrowUp":
        event.preventDefault();
        if (this.turned) {
          this.focusedIndex = (this.focusedIndex + 1) % 4;
        } else {
          this.focusedIndex = (this.focusedIndex - 1 + 4) % 4;
        }
        this.focusButton(this.focusedIndex);
        break;
      case "ArrowLeft":
        event.preventDefault();
        this.focusedIndex = (this.focusedIndex - 1 + 4) % 4;
        this.focusButton(this.focusedIndex);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        const buttons = this.promotionDialogGroup.querySelectorAll(".promotion-dialog-button-group");
        if (buttons[this.focusedIndex]) {
          const piece = buttons[this.focusedIndex].dataset.piece;
          this.selectPiece(piece);
        }
        break;
      case "Escape":
        event.preventDefault();
        this.setDisplayState(DISPLAY_STATE.hidden);
        if (this.state.callback) {
          this.state.callback({ type: PROMOTION_DIALOG_RESULT_TYPE.canceled });
        }
        break;
      case "Tab":
        event.preventDefault();
        if (event.shiftKey) {
          this.focusedIndex = (this.focusedIndex - 1 + 4) % 4;
        } else {
          this.focusedIndex = (this.focusedIndex + 1) % 4;
        }
        this.focusButton(this.focusedIndex);
        break;
    }
  }
  focusButton(index) {
    const buttons = this.promotionDialogGroup.querySelectorAll(".promotion-dialog-button-group");
    buttons.forEach((btn, i) => {
      btn.setAttribute("tabindex", i === index ? "0" : "-1");
    });
    if (buttons[index]) {
      buttons[index].focus();
      const pieceType = this.pieceOrder[index];
      this.announce(this.t.pieces[pieceType]);
    }
  }
  announce(message) {
    if (!this.liveRegion) return;
    this.liveRegion.textContent = "";
    if (this.announceTimeoutId) {
      clearTimeout(this.announceTimeoutId);
    }
    this.announceTimeoutId = setTimeout(() => {
      this.announceTimeoutId = null;
      if (this.liveRegion) {
        this.liveRegion.textContent = message;
      }
    }, 50);
  }
  destroy() {
    if (this.state.displayState === DISPLAY_STATE.shown) {
      this.setDisplayState(DISPLAY_STATE.hidden);
    }
    if (this.showTimeoutId) {
      clearTimeout(this.showTimeoutId);
      this.showTimeoutId = null;
    }
    if (this.focusTimeoutId) {
      clearTimeout(this.focusTimeoutId);
      this.focusTimeoutId = null;
    }
    if (this.announceTimeoutId) {
      clearTimeout(this.announceTimeoutId);
      this.announceTimeoutId = null;
    }
    document.removeEventListener("keydown", this.handleKeyDown);
    if (this.liveRegion && this.liveRegion.parentNode) {
      this.liveRegion.parentNode.removeChild(this.liveRegion);
      this.liveRegion = null;
    }
    delete this.chessboard.showPromotionDialog;
    delete this.chessboard.isPromotionDialogShown;
  }
}
const ARROW_TYPE = {
  success: { class: "arrow-success" },
  warning: { class: "arrow-warning" },
  info: { class: "arrow-info" },
  danger: { class: "arrow-danger" }
};
const MARKER_TYPE = {
  success: { class: "marker-circle-success", slice: "markerCircle" },
  warning: { class: "marker-circle-warning", slice: "markerCircle" },
  info: { class: "marker-circle-info", slice: "markerCircle" },
  danger: { class: "marker-circle-danger", slice: "markerCircle" }
};
class RightClickAnnotator extends Extension {
  /** @constructor */
  constructor(chessboard, props = {}) {
    super(chessboard);
    this.props = props || {};
    if (!this.chessboard.getExtension(Arrows)) {
      this.chessboard.addExtension(Arrows);
    }
    if (!this.chessboard.getExtension(Markers)) {
      this.chessboard.addExtension(Markers);
    }
    this.onContextMenu = this.onContextMenu.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.dragStart = void 0;
    this.previewActiveTo = void 0;
    this.chessboard.context.addEventListener("contextmenu", this.onContextMenu);
    this.chessboard.context.addEventListener("mousedown", this.onMouseDown);
    this.chessboard.context.addEventListener("mousemove", this.onMouseMove);
    this.chessboard.context.addEventListener("mouseup", this.onMouseUp);
    this.chessboard.context.addEventListener("mouseleave", this.onMouseUp);
    this.registerExtensionPoint(EXTENSION_POINT.destroy, () => {
      this.chessboard.context.removeEventListener("contextmenu", this.onContextMenu);
      this.chessboard.context.removeEventListener("mousedown", this.onMouseDown);
      this.chessboard.context.removeEventListener("mousemove", this.onMouseMove);
      this.chessboard.context.removeEventListener("mouseup", this.onMouseUp);
      this.chessboard.context.removeEventListener("mouseleave", this.onMouseUp);
    });
    this.chessboard.getAnnotations = this.getAnnotations.bind(this.chessboard);
    this.chessboard.setAnnotations = this.setAnnotations.bind(this.chessboard);
  }
  getAnnotations() {
    return {
      arrows: this.chessboard.getArrows(),
      markers: this.chessboard.getMarkers()
    };
  }
  // Remove only the arrows/markers created by this extension, leaving annotations from other sources untouched.
  removeOwnArrows(from = void 0, to = void 0) {
    for (const arrowType of Object.values(ARROW_TYPE)) {
      this.chessboard.removeArrows(arrowType, from, to);
    }
  }
  removeOwnMarkers(square = void 0) {
    for (const markerType of Object.values(MARKER_TYPE)) {
      this.chessboard.removeMarkers(markerType, square);
    }
  }
  setAnnotations(annotations) {
    this.removeOwnArrows();
    this.removeOwnMarkers();
    if (annotations.arrows) {
      for (const arrow of annotations.arrows) {
        this.chessboard.addArrow(arrow.type, arrow.from, arrow.to);
      }
    }
    if (annotations.markers) {
      for (const marker of annotations.markers) {
        this.chessboard.addMarker(marker.type, marker.square);
      }
    }
  }
  onContextMenu(event) {
    event.preventDefault();
  }
  onMouseDown(event) {
    if (event.button !== 2) {
      return;
    }
    const square = this.findSquareFromEvent(event);
    if (!square) {
      return;
    }
    this.dragStart = {
      square,
      modifiers: {
        alt: event.altKey,
        shift: event.shiftKey || event.ctrlKey
      }
    };
  }
  onMouseUp(event) {
    this.removePreviewArrow();
    const start = this.dragStart;
    this.dragStart = void 0;
    if (!start || event.button !== 2) {
      return;
    }
    const endSquare = this.findSquareFromEvent(event) || start.square;
    const colorKey = this.modifiersToColorKey(start.modifiers);
    const { arrowType, circleType } = this.typesForColorKey(colorKey);
    if (start.square && endSquare && start.square !== endSquare) {
      const existing = this.chessboard.getArrows(arrowType, start.square, endSquare);
      if (existing && existing.length > 0) {
        this.chessboard.removeArrows(arrowType, start.square, endSquare);
      } else {
        this.removeOwnArrows(start.square, endSquare);
        this.chessboard.addArrow(arrowType, start.square, endSquare);
      }
    } else if (start.square) {
      const existingMarkers = this.chessboard.getMarkers(circleType, start.square);
      if (existingMarkers && existingMarkers.length > 0) {
        this.chessboard.removeMarkers(circleType, start.square);
      } else {
        this.removeOwnMarkers(start.square);
        this.chessboard.addMarker(circleType, start.square);
      }
    }
  }
  findSquareFromEvent(event) {
    const target = (
      /** @type {HTMLElement} */
      event.target
    );
    if (!target) return void 0;
    if (target.getAttribute && target.getAttribute("data-square")) {
      return target.getAttribute("data-square");
    }
    const el = target.closest && target.closest("[data-square]");
    return el ? el.getAttribute("data-square") : void 0;
  }
  onMouseMove(event) {
    if (!this.dragStart) {
      return;
    }
    const toSquare = this.findSquareFromEvent(event);
    if (!toSquare || toSquare === this.dragStart.square) {
      return;
    }
    if (this.previewActiveTo === toSquare) {
      return;
    }
    this.previewActiveTo = toSquare;
    const colorKey = this.modifiersToColorKey(this.dragStart.modifiers);
    const { arrowType } = this.typesForColorKey(colorKey);
    this.drawPreviewArrow(this.dragStart.square, toSquare, arrowType);
  }
  drawPreviewArrow(from, to, type) {
    if (!this.previewArrowType) {
      this.previewArrowType = { ...type };
    }
    this.chessboard.removeArrows(this.previewArrowType);
    this.chessboard.addArrow(this.previewArrowType, from, to);
  }
  removePreviewArrow() {
    if (this.previewArrowType) {
      this.chessboard.removeArrows(this.previewArrowType);
      this.previewArrowType = void 0;
    }
  }
  modifiersToColorKey(modifiers) {
    if (modifiers.shift && modifiers.alt) return "warning";
    if (modifiers.shift) return "danger";
    if (modifiers.alt) return "info";
    return "success";
  }
  typesForColorKey(colorKey) {
    switch (colorKey) {
      case "info":
        return { arrowType: ARROW_TYPE.info, circleType: MARKER_TYPE.info };
      case "danger":
        return { arrowType: ARROW_TYPE.danger, circleType: MARKER_TYPE.danger };
      case "warning":
        return { arrowType: ARROW_TYPE.warning, circleType: MARKER_TYPE.warning };
      case "success":
      default:
        return { arrowType: ARROW_TYPE.success, circleType: MARKER_TYPE.success };
    }
  }
}
const piecesStandardRaw = '<?xml version="1.0" encoding="UTF-8"?><!--\n\nLICENSE\n=======\n\nChess pieces\n~~~~~~~~~~~~\n\nThe chess pieces in this sprite are copies from Wikimedia Commons\nhttps://commons.wikimedia.org/wiki/Category:SVG_chess_pieces/Standard\n\nLicense: Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)\nhttps://creativecommons.org/licenses/by-sa/3.0/\n\nAuthors:\n- https://en.wikipedia.org/wiki/User:Cburnett\n- https://en.wikipedia.org/wiki/User:Rfc1394\n\nmodified by shaack (https://shaack.com) for the usage in cm-chessboard.\nhttps://github.com/shaack/cm-chessboard\n\n-->\n<svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg">\n    <title>cm-chessboard pieces and markers sprite</title>\n    <desc>Chess pieces and markers for the cm-chessboard (https://shaack.com/projekte/cm-chessboard/).</desc>\n\n    <g id="wk" stroke-linecap="round" stroke-linejoin="round" transform="translate(5.000000, 5.000000)" stroke="#000000"\n       stroke-width="1.5">\n        <line x1="15" y1="4.96764706" x2="15" y2="0" id="Shape"/>\n        <line x1="12.8571429" y1="1.76470588" x2="17.1428571" y2="1.76470588" id="Shape"/>\n        <path d="M17.5714286,7.5 C17.5714286,7.5 16.7142857,5.29411765 15,5.29411765 C13.2857143,5.29411765 12.4285714,7.5 12.4285714,7.5 C11.1428571,10.1470588 15,16.7647059 15,16.7647059 C15,16.7647059 18.8571429,10.1470588 17.5714286,7.5 Z"\n              id="Shape" fill="#FFFFFF"/>\n        <path d="M5.57142857,27.3529412 C10.2857143,30.4411765 18.8571429,30.4411765 23.5714286,27.3529412 L23.5714286,21.1764706 C23.5714286,21.1764706 31.2857143,17.2058824 28.7142857,11.9117647 C25.2857143,6.17647059 17.1428571,8.82352941 15,15.4411765 L15,18.5294118 L15,15.4411765 C12,8.82352941 3.85714286,6.17647059 1.28571429,11.9117647 C-1.28571429,17.2058824 5.57142857,20.7352941 5.57142857,20.7352941 L5.57142857,27.3529412 Z"\n              id="Shape" fill="#FFFFFF"/>\n        <path d="M5.57142857,21.1764706 C10.2857143,18.5294118 18.8571429,18.5294118 23.5714286,21.1764706" id="Shape"\n              fill-opacity="0" fill="#000000"/>\n        <path d="M5.57142857,24.2647059 C10.2857143,21.6176471 18.8571429,21.6176471 23.5714286,24.2647059" id="Shape"\n              fill-opacity="0" fill="#000000" stroke-linecap="square"/>\n        <path d="M5.57142857,27.3529412 C10.2857143,24.7058824 18.8571429,24.7058824 23.5714286,27.3529412" id="Shape"\n              fill-opacity="0" fill="#000000"/>\n    </g>\n    <g id="wq" stroke-linecap="round" stroke-linejoin="round" transform="translate(4.000000, 5.000000)" stroke="#000000"\n       stroke-width="1.5">\n        <path d="M3.45945946,6.2 C3.45945946,7.17833299 2.68503308,7.97142857 1.72972973,7.97142857 C0.774426379,7.97142857 0,7.17833299 0,6.2 C0,5.22166701 0.774426379,4.42857143 1.72972973,4.42857143 C2.68503308,4.42857143 3.45945946,5.22166701 3.45945946,6.2 Z"\n              id="Shape" fill="#FFFFFF"/>\n        <path d="M17.7297297,2.21428571 C17.7297297,3.1926187 16.9553034,3.98571429 16,3.98571429 C15.0446966,3.98571429 14.2702703,3.1926187 14.2702703,2.21428571 C14.2702703,1.23595273 15.0446966,0.442857143 16,0.442857143 C16.9553034,0.442857143 17.7297297,1.23595273 17.7297297,2.21428571 Z"\n              id="Shape" fill="#FFFFFF"/>\n        <path d="M32,6.2 C32,7.17833299 31.2255736,7.97142857 30.2702703,7.97142857 C29.3149669,7.97142857 28.5405405,7.17833299 28.5405405,6.2 C28.5405405,5.22166701 29.3149669,4.42857143 30.2702703,4.42857143 C31.2255736,4.42857143 32,5.22166701 32,6.2 Z"\n              id="Shape" fill="#FFFFFF"/>\n        <path d="M10.3783784,3.1 C10.3783784,4.07833299 9.603952,4.87142857 8.64864865,4.87142857 C7.6933453,4.87142857 6.91891892,4.07833299 6.91891892,3.1 C6.91891892,2.12166701 7.6933453,1.32857143 8.64864865,1.32857143 C9.603952,1.32857143 10.3783784,2.12166701 10.3783784,3.1 Z"\n              id="Shape" fill="#FFFFFF"/>\n        <path d="M25.0810811,3.54285714 C25.0810811,4.52119013 24.3066547,5.31428571 23.3513514,5.31428571 C22.396048,5.31428571 21.6216216,4.52119013 21.6216216,3.54285714 C21.6216216,2.56452416 22.396048,1.77142857 23.3513514,1.77142857 C24.3066547,1.77142857 25.0810811,2.56452416 25.0810811,3.54285714 Z"\n              id="Shape" fill="#FFFFFF"/>\n        <path d="M4.32432432,18.6 C11.6756757,17.2714286 22.4864865,17.2714286 27.6756757,18.6 L29.4054054,7.97142857 L23.3513514,17.7142857 L23.3513514,5.31428571 L18.5945946,17.2714286 L16,3.98571429 L13.4054054,17.2714286 L8.64864865,4.87142857 L8.64864865,17.7142857 L2.59459459,7.97142857 L4.32432432,18.6 Z"\n              id="Shape" fill="#FFFFFF"/>\n        <path d="M4.32432432,18.6 C4.32432432,20.3714286 5.62162162,20.3714286 6.48648649,22.1428571 C7.35135135,23.4714286 7.35135135,23.0285714 6.91891892,25.2428571 C5.62162162,26.1285714 5.62162162,27.4571429 5.62162162,27.4571429 C4.32432432,28.7857143 6.05405405,29.6714286 6.05405405,29.6714286 C11.6756757,30.5571429 20.3243243,30.5571429 25.9459459,29.6714286 C25.9459459,29.6714286 27.2432432,28.7857143 25.9459459,27.4571429 C25.9459459,27.4571429 26.3783784,26.1285714 25.0810811,25.2428571 C24.6486486,23.0285714 24.6486486,23.4714286 25.5135135,22.1428571 C26.3783784,20.3714286 27.6756757,20.3714286 27.6756757,18.6 C20.3243243,17.2714286 11.6756757,17.2714286 4.32432432,18.6 Z"\n              id="Shape" fill="#FFFFFF"/>\n        <path d="M6.48648649,22.1428571 C9.51351351,21.2571429 22.4864865,21.2571429 25.5135135,22.1428571" id="Shape"/>\n        <path d="M6.91891892,25.2428571 C12.1081081,24.3571429 19.8918919,24.3571429 25.0810811,25.2428571" id="Shape"/>\n    </g>\n    <g id="wb" stroke-linecap="round" stroke-linejoin="round" transform="translate(6.000000, 5.000000)" stroke="#000000"\n       stroke-width="1.5">\n        <g id="Group" fill="#FFFFFF">\n            <path d="M2.54545455,27.3529412 C5.42181818,26.4970588 11.1236364,27.7323529 14,25.5882353 C16.8763636,27.7323529 22.5781818,26.4970588 25.4545455,27.3529412 C25.4545455,27.3529412 26.8545455,27.8294118 28,29.1176471 C27.4230303,29.9735294 26.6,29.9911765 25.4545455,29.5588235 C22.5781818,28.7029412 16.8763636,29.9647059 14,28.6764706 C11.1236364,29.9647059 5.42181818,28.7029412 2.54545455,29.5588235 C1.39660606,29.9911765 0.574424242,29.9735294 0,29.1176471 C1.14884848,27.4058824 2.54545455,27.3529412 2.54545455,27.3529412 Z"\n                  id="Shape"/>\n            <path d="M7.63636364,23.8235294 C9.75757576,26.0294118 18.2424242,26.0294118 20.3636364,23.8235294 C20.7878788,22.5 20.3636364,22.0588235 20.3636364,22.0588235 C20.3636364,19.8529412 18.2424242,18.5294118 18.2424242,18.5294118 C22.9090909,17.2058824 23.3333333,8.38235294 14,4.85294118 C4.66666667,8.38235294 5.09090909,17.2058824 9.75757576,18.5294118 C9.75757576,18.5294118 7.63636364,19.8529412 7.63636364,22.0588235 C7.63636364,22.0588235 7.21212121,22.5 7.63636364,23.8235294 Z"\n                  id="Shape"/>\n            <path d="M16.1212121,2.64705882 C16.1212121,3.86533401 15.1715131,4.85294118 14,4.85294118 C12.8284869,4.85294118 11.8787879,3.86533401 11.8787879,2.64705882 C11.8787879,1.42878364 12.8284869,0.441176471 14,0.441176471 C15.1715131,0.441176471 16.1212121,1.42878364 16.1212121,2.64705882 Z"\n                  id="Shape"/>\n        </g>\n        <path d="M9.75757576,18.5294118 L18.2424242,18.5294118 M7.63636364,22.0588235 L20.3636364,22.0588235 M14,9.26470588 L14,13.6764706 M11.8787879,11.4705882 L16.1212121,11.4705882"\n              id="Shape"/>\n    </g>\n    <g id="wn" stroke-linecap="round" stroke-linejoin="round" transform="translate(6.000000, 6.000000)"\n       stroke="#000000">\n        <path d="M13.5757576,2.625 C22.4848485,3.5 27.5757576,9.625 27.1515152,28 L7.63636364,28 C7.63636364,20.125 16.1212121,22.3125 14.4242424,9.625"\n              id="Shape" stroke-width="1.5" fill="#FFFFFF"/>\n        <path d="M15.2727273,9.625 C15.5951515,12.17125 10.5636364,16.07375 8.48484848,17.5 C5.93939394,19.25 6.09212121,21.2975 4.24242424,21 C3.35830303,20.1775 5.43878788,18.34 4.24242424,18.375 C3.39393939,18.375 4.40363636,19.45125 3.39393939,20.125 C2.54545455,20.125 -0.00254545455,21 -1.90580876e-06,16.625 C-1.90580876e-06,14.875 5.09090909,6.125 5.09090909,6.125 C5.09090909,6.125 6.69454545,4.4625 6.78787879,3.0625 C6.16848485,2.19275 6.36363636,1.3125 6.36363636,0.4375 C7.21212121,-0.4375 8.90909091,2.625 8.90909091,2.625 L10.6060606,2.625 C10.6060606,2.625 11.2678788,0.882 12.7272727,0 C13.5757576,0 13.5757576,2.625 13.5757576,2.625"\n              id="Shape" stroke-width="1.5" fill="#FFFFFF"/>\n        <path d="M2.96969697,16.1875 C2.96969697,16.4291246 2.77975717,16.625 2.54545455,16.625 C2.31115192,16.625 2.12121212,16.4291246 2.12121212,16.1875 C2.12121212,15.9458754 2.31115192,15.75 2.54545455,15.75 C2.77975717,15.75 2.96969697,15.9458754 2.96969697,16.1875 Z"\n              id="Shape" stroke-width="1.5" fill="#000000"/>\n        <path d="M7.6363543,7.4375 C7.6363543,8.16235779 7.44641868,8.74997112 7.21212121,8.74997112 C6.97782375,8.74997112 6.78788812,8.16235779 6.78788812,7.4375 C6.78788812,6.71264221 6.97782375,6.12502888 7.21212121,6.12502888 C7.44641868,6.12502888 7.6363543,6.71264221 7.6363543,7.4375 L7.6363543,7.4375 Z"\n              id="Shape" stroke-width="1.499967" fill="#000000"\n              transform="translate(7.212121, 7.437500) rotate(30.000728) translate(-7.212121, -7.437500) "/>\n    </g>\n    <g id="wr" stroke-linecap="round" stroke-linejoin="round" transform="translate(9.000000, 8.000000)" stroke="#000000"\n       stroke-width="1.5">\n        <polygon id="Shape" fill="#FFFFFF" points="0 26 22 26 22 23.4 0 23.4"/>\n        <polygon id="Shape" fill="#FFFFFF"\n                 points="2.44444444 23.4 2.44444444 19.9333333 19.5555556 19.9333333 19.5555556 23.4"/>\n        <polyline id="Shape" fill="#FFFFFF"\n                  points="1.62962963 4.33333333 1.62962963 0 4.88888889 0 4.88888889 1.73333333 8.96296296 1.73333333 8.96296296 0 13.037037 0 13.037037 1.73333333 17.1111111 1.73333333 17.1111111 0 20.3703704 0 20.3703704 4.33333333"/>\n        <polyline id="Shape" fill="#FFFFFF"\n                  points="20.3703704 4.33333333 17.9259259 6.93333333 4.07407407 6.93333333 1.62962963 4.33333333"/>\n        <polyline id="Shape" fill="#FFFFFF"\n                  points="17.9259259 6.93333333 17.9259259 17.7666667 4.07407407 17.7666667 4.07407407 6.93333333"/>\n        <polyline id="Shape" fill="#FFFFFF"\n                  points="17.9259259 17.7666667 19.1481481 19.9333333 2.85185185 19.9333333 4.07407407 17.7666667"/>\n        <line x1="1.62962963" y1="4.33333333" x2="20.3703704" y2="4.33333333" id="Shape"/>\n    </g>\n    <g id="wp" transform="translate(10.000000, 9.000000)" fill="#FFFFFF" stroke="#000000" stroke-linecap="round"\n       stroke-width="1.5">\n        <path d="M10,0 C8.15833333,0 6.66666667,1.50129032 6.66666667,3.35483871 C6.66666667,4.10129032 6.90833333,4.78903226 7.31666667,5.35096774 C5.69166667,6.29032258 4.58333333,8.04322581 4.58333333,10.0645161 C4.58333333,11.7670968 5.36666667,13.2851613 6.59166667,14.2832258 C4.09166667,15.1722581 0.416666667,18.9380645 0.416666667,25.5806452 L19.5833333,25.5806452 C19.5833333,18.9380645 15.9083333,15.1722581 13.4083333,14.2832258 C14.6333333,13.2851613 15.4166667,11.7670968 15.4166667,10.0645161 C15.4166667,8.04322581 14.3083333,6.29032258 12.6833333,5.35096774 C13.0916667,4.78903226 13.3333333,4.10129032 13.3333333,3.35483871 C13.3333333,1.50129032 11.8416667,0 10,0 Z"\n              id="Shape"/>\n    </g>\n    <g id="bk" stroke-linecap="round" stroke-linejoin="round" transform="translate(5.000000, 5.000000)"\n       stroke-width="1.5">\n        <line x1="15" y1="4.96764706" x2="15" y2="0" id="Shape" stroke="#000000"/>\n        <path d="M15,16.7647059 C15,16.7647059 18.8571429,10.1470588 17.5714286,7.5 C17.5714286,7.5 16.7142857,5.29411765 15,5.29411765 C13.2857143,5.29411765 12.4285714,7.5 12.4285714,7.5 C11.1428571,10.1470588 15,16.7647059 15,16.7647059"\n              id="Shape" stroke="#000000" fill="#000000"/>\n        <path d="M5.57142857,27.3529412 C10.2857143,30.4411765 18.8571429,30.4411765 23.5714286,27.3529412 L23.5714286,21.1764706 C23.5714286,21.1764706 31.2857143,17.2058824 28.7142857,11.9117647 C25.2857143,6.17647059 17.1428571,8.82352941 15,15.4411765 L15,18.5294118 L15,15.4411765 C12,8.82352941 3.85714286,6.17647059 1.28571429,11.9117647 C-1.28571429,17.2058824 5.57142857,20.7352941 5.57142857,20.7352941 L5.57142857,27.3529412 Z"\n              id="Shape" stroke="#000000" fill="#000000"/>\n        <line x1="12.8571429" y1="1.76470588" x2="17.1428571" y2="1.76470588" id="Shape" stroke="#000000"/>\n        <path d="M23.1428571,20.7352941 C23.1428571,20.7352941 30.4285714,17.2058824 28.3114286,12.2205882 C24.9857143,7.05882353 17.1428571,10.5882353 15,16.3235294 L15.0085714,18.1764706 L15,16.3235294 C12.8571429,10.5882353 4.20514286,7.05882353 1.71171429,12.2205882 C-0.428571429,17.2058824 5.87142857,20.1617647 5.87142857,20.1617647"\n              id="Shape" stroke="#FFFFFF"/>\n        <path d="M5.57142857,21.1764706 C10.2857143,18.5294118 18.8571429,18.5294118 23.5714286,21.1764706 M5.57142857,24.2647059 C10.2857143,21.6176471 18.8571429,21.6176471 23.5714286,24.2647059 M5.57142857,27.3529412 C10.2857143,24.7058824 18.8571429,24.7058824 23.5714286,27.3529412"\n              id="Shape" stroke="#FFFFFF"/>\n    </g>\n    <g id="bq" stroke-linecap="round" stroke-linejoin="round" transform="translate(3.000000, 4.000000)">\n        <g id="Group" fill="#000000">\n            <ellipse id="Oval" cx="2.61538462" cy="6.22222222" rx="2.3974359" ry="2.44444444"/>\n            <ellipse id="Oval" cx="9.58974359" cy="3.55555556" rx="2.3974359" ry="2.44444444"/>\n            <ellipse id="Oval" cx="17" cy="2.66666667" rx="2.3974359" ry="2.44444444"/>\n            <ellipse id="Oval" cx="24.4102564" cy="3.55555556" rx="2.3974359" ry="2.44444444"/>\n            <ellipse id="Oval" cx="31.3846154" cy="6.22222222" rx="2.3974359" ry="2.44444444"/>\n        </g>\n        <path d="M5.23076923,18.6666667 C12.6410256,17.3333333 23.5384615,17.3333333 28.7692308,18.6666667 L30.9487179,7.55555556 L24.4102564,17.7777778 L24.1487179,5.24444444 L19.6153846,17.3333333 L17,4.44444444 L14.3846154,17.3333333 L9.85128205,5.24444444 L9.58974359,17.7777778 L3.05128205,7.55555556 L5.23076923,18.6666667 Z"\n              id="crown" stroke="#000000" stroke-width="1.5" fill="#000000"/>\n        <path d="M5.23076923,18.6666667 C5.23076923,20.4444444 6.53846154,20.4444444 7.41025641,22.2222222 C8.28205128,23.5555556 8.28205128,23.1111111 7.84615385,25.3333333 C6.53846154,26.2222222 6.53846154,27.5555556 6.53846154,27.5555556 C5.23076923,28.8888889 6.97435897,29.7777778 6.97435897,29.7777778 C12.6410256,30.6666667 21.3589744,30.6666667 27.025641,29.7777778 C27.025641,29.7777778 28.3333333,28.8888889 27.025641,27.5555556 C27.025641,27.5555556 27.4615385,26.2222222 26.1538462,25.3333333 C25.7179487,23.1111111 25.7179487,23.5555556 26.5897436,22.2222222 C27.4615385,20.4444444 28.7692308,20.4444444 28.7692308,18.6666667 C21.3589744,17.3333333 12.6410256,17.3333333 5.23076923,18.6666667 Z"\n              id="Shape" stroke="#000000" stroke-width="1.5" fill="#000000"/>\n        <path d="M6.97435897,29.7777778 C13.4672777,32.080866 20.5327223,32.080866 27.025641,29.7777778" id="Shape"\n              stroke="#000000" stroke-width="1.5"/>\n        <path d="M6.97435897,21.3333333 C13.4672777,19.0302452 20.5327223,19.0302452 27.025641,21.3333333" id="Shape"\n              stroke="#FFFFFF" stroke-width="1.5"/>\n        <line x1="8.28205128" y1="23.5555556" x2="25.7179487" y2="23.5555556" id="Shape" stroke="#FFFFFF"\n              stroke-width="1.5"/>\n        <path d="M7.41025641,26.2222222 C13.6372326,28.3241535 20.3627674,28.3241535 26.5897436,26.2222222" id="Shape"\n              stroke="#FFFFFF" stroke-width="1.5"/>\n        <path d="M6.53846154,28.8888889 C13.2948481,31.4031829 20.7051519,31.4031829 27.4615385,28.8888889" id="Shape"\n              stroke="#FFFFFF" stroke-width="1.5"/>\n    </g>\n    <g id="bb" stroke-linecap="round" stroke-linejoin="round" transform="translate(6.000000, 5.000000)"\n       stroke-width="1.5">\n        <g id="Group" fill="#000000" stroke="#000000">\n            <path d="M2.54545455,27.3529412 C5.42181818,26.4970588 11.1236364,27.7323529 14,25.5882353 C16.8763636,27.7323529 22.5781818,26.4970588 25.4545455,27.3529412 C25.4545455,27.3529412 26.8545455,27.8294118 28,29.1176471 C27.4230303,29.9735294 26.6,29.9911765 25.4545455,29.5588235 C22.5781818,28.7029412 16.8763636,29.9647059 14,28.6764706 C11.1236364,29.9647059 5.42181818,28.7029412 2.54545455,29.5588235 C1.39660606,29.9911765 0.574424242,29.9735294 0,29.1176471 C1.14884848,27.4058824 2.54545455,27.3529412 2.54545455,27.3529412 Z"\n                  id="Shape"/>\n            <path d="M7.63636364,23.8235294 C9.75757576,26.0294118 18.2424242,26.0294118 20.3636364,23.8235294 C20.7878788,22.5 20.3636364,22.0588235 20.3636364,22.0588235 C20.3636364,19.8529412 18.2424242,18.5294118 18.2424242,18.5294118 C22.9090909,17.2058824 23.3333333,8.38235294 14,4.85294118 C4.66666667,8.38235294 5.09090909,17.2058824 9.75757576,18.5294118 C9.75757576,18.5294118 7.63636364,19.8529412 7.63636364,22.0588235 C7.63636364,22.0588235 7.21212121,22.5 7.63636364,23.8235294 Z"\n                  id="Shape"/>\n            <path d="M16.1212121,2.64705882 C16.1212121,3.86533401 15.1715131,4.85294118 14,4.85294118 C12.8284869,4.85294118 11.8787879,3.86533401 11.8787879,2.64705882 C11.8787879,1.42878364 12.8284869,0.441176471 14,0.441176471 C15.1715131,0.441176471 16.1212121,1.42878364 16.1212121,2.64705882 Z"\n                  id="Shape"/>\n        </g>\n        <path d="M9.75757576,18.5294118 L18.2424242,18.5294118 M7.63636364,22.0588235 L20.3636364,22.0588235 M14,9.26470588 L14,13.6764706 M11.8787879,11.4705882 L16.1212121,11.4705882"\n              id="Shape" stroke="#FFFFFF"/>\n    </g>\n    <g id="bn" stroke-linecap="round" stroke-linejoin="round" transform="translate(6.000000, 6.000000)">\n        <path d="M13.5757576,2.63636364 C22.4848485,3.51515152 27.5757576,9.66666667 27.1515152,28.1212121 L7.63636364,28.1212121 C7.63636364,20.2121212 16.1212121,22.4090909 14.4242424,9.66666667"\n              id="Shape" stroke="#000000" stroke-width="1.5" fill="#000000"/>\n        <path d="M15.2727273,9.66666667 C15.5951515,12.2239394 10.5636364,16.1433333 8.48484848,17.5757576 C5.93939394,19.3333333 6.09212121,21.389697 4.24242424,21.0909091 C3.35830303,20.2648485 5.43878788,18.4193939 4.24242424,18.4545455 C3.39393939,18.4545455 4.40363636,19.5354545 3.39393939,20.2121212 C2.54545455,20.2121212 -0.00254545455,21.0909091 -1.90580876e-06,16.6969697 C-1.90580876e-06,14.9393939 5.09090909,6.15151515 5.09090909,6.15151515 C5.09090909,6.15151515 6.69454545,4.48181818 6.78787879,3.07575758 C6.16848485,2.20224242 6.36363636,1.31818182 6.36363636,0.439393939 C7.21212121,-0.439393939 8.90909091,2.63636364 8.90909091,2.63636364 L10.6060606,2.63636364 C10.6060606,2.63636364 11.2678788,0.885818182 12.7272727,0 C13.5757576,0 13.5757576,2.63636364 13.5757576,2.63636364"\n              id="Shape" stroke="#000000" stroke-width="1.5" fill="#000000"/>\n        <path d="M2.96969697,16.2575758 C2.96969697,16.5002463 2.77975717,16.6969697 2.54545455,16.6969697 C2.31115192,16.6969697 2.12121212,16.5002463 2.12121212,16.2575758 C2.12121212,16.0149052 2.31115192,15.8181818 2.54545455,15.8181818 C2.77975717,15.8181818 2.96969697,16.0149052 2.96969697,16.2575758 Z"\n              id="Shape" stroke="#FFFFFF" stroke-width="1.5" fill="#FFFFFF"/>\n        <path d="M7.6363543,7.46969697 C7.6363543,8.19769267 7.44641868,8.78784979 7.21212121,8.78784979 C6.97782375,8.78784979 6.78788812,8.19769267 6.78788812,7.46969697 C6.78788812,6.74170127 6.97782375,6.15154415 7.21212121,6.15154415 C7.44641868,6.15154415 7.6363543,6.74170127 7.6363543,7.46969697 L7.6363543,7.46969697 Z"\n              id="Shape" stroke="#FFFFFF" stroke-width="1.499967" fill="#FFFFFF"\n              transform="translate(7.212121, 7.469697) rotate(30.000728) translate(-7.212121, -7.469697) "/>\n        <path d="M15.7393939,2.98787879 L15.3575758,4.26212121 L15.7818182,4.39393939 C18.4545455,5.27272727 20.5757576,6.58212121 22.4848485,10.3257576 C24.3939394,14.0693939 25.2424242,19.3860606 24.8181818,28.1212121 L24.7757576,28.5606061 L26.6848485,28.5606061 L26.7272727,28.1212121 C27.1515152,19.2806061 25.9806061,13.3136364 23.969697,9.36787879 C21.9587879,5.42212121 19.0569697,3.53272727 16.1721212,3.07575758 L15.7393939,2.98787879 Z"\n              id="Shape" fill="#FFFFFF"/>\n    </g>\n    <g id="br" stroke-linecap="round" stroke-linejoin="round" transform="translate(9.000000, 8.000000)">\n        <polygon id="Shape" stroke="#000000" stroke-width="1.5" fill="#000000" points="0 26 22 26 22 23.4 0 23.4"/>\n        <polygon id="Shape" stroke="#000000" stroke-width="1.5" fill="#000000"\n                 points="2.85185185 19.9333333 4.07407407 17.7666667 17.9259259 17.7666667 19.1481481 19.9333333"/>\n        <polygon id="Shape" stroke="#000000" stroke-width="1.5" fill="#000000"\n                 points="2.44444444 23.4 2.44444444 19.9333333 19.5555556 19.9333333 19.5555556 23.4"/>\n        <polygon id="Shape" stroke="#000000" stroke-width="1.5" fill="#000000"\n                 points="4.07407407 17.7666667 4.07407407 6.5 17.9259259 6.5 17.9259259 17.7666667"/>\n        <polygon id="Shape" stroke="#000000" stroke-width="1.5" fill="#000000"\n                 points="4.07407407 6.5 1.62962963 4.33333333 20.3703704 4.33333333 17.9259259 6.5"/>\n        <polygon id="Shape" stroke="#000000" stroke-width="1.5" fill="#000000"\n                 points="1.62962963 4.33333333 1.62962963 0 4.88888889 0 4.88888889 1.73333333 8.96296296 1.73333333 8.96296296 0 13.037037 0 13.037037 1.73333333 17.1111111 1.73333333 17.1111111 0 20.3703704 0 20.3703704 4.33333333"/>\n        <polyline id="Shape" stroke="#FFFFFF"\n                  points="2.44444444 22.9666667 19.5555556 22.9666667 19.5555556 22.9666667"/>\n        <line x1="3.25925926" y1="19.5" x2="18.7407407" y2="19.5" id="Shape" stroke="#FFFFFF"/>\n        <line x1="4.07407407" y1="17.7666667" x2="17.9259259" y2="17.7666667" id="Shape" stroke="#FFFFFF"/>\n        <line x1="4.07407407" y1="6.5" x2="17.9259259" y2="6.5" id="Shape" stroke="#FFFFFF"/>\n        <line x1="1.62962963" y1="4.33333333" x2="20.3703704" y2="4.33333333" id="Shape" stroke="#FFFFFF"/>\n    </g>\n    <g id="bp" transform="translate(10.000000, 8.000000)" fill="#000000" stroke="#000000" stroke-linecap="round"\n       stroke-width="1.5">\n        <path d="M10,0 C8.15833333,0 6.66666667,1.50129032 6.66666667,3.35483871 C6.66666667,4.10129032 6.90833333,4.78903226 7.31666667,5.35096774 C5.69166667,6.29032258 4.58333333,8.04322581 4.58333333,10.0645161 C4.58333333,11.7670968 5.36666667,13.2851613 6.59166667,14.2832258 C4.09166667,15.1722581 0.416666667,18.9380645 0.416666667,25.5806452 L19.5833333,25.5806452 C19.5833333,18.9380645 15.9083333,15.1722581 13.4083333,14.2832258 C14.6333333,13.2851613 15.4166667,11.7670968 15.4166667,10.0645161 C15.4166667,8.04322581 14.3083333,6.29032258 12.6833333,5.35096774 C13.0916667,4.78903226 13.3333333,4.10129032 13.3333333,3.35483871 C13.3333333,1.50129032 11.8416667,0 10,0 Z"\n              id="Shape"/>\n    </g>\n</svg>\n';
const piecesStauntyRaw = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!--\nThe lila Staunty pieces set from\nhttps://github.com/ornicar/lila/tree/master/public/piece/staunty\nmodified by shaack (https://shaack.com) for the usage in cm-chessboard.\nhttps://github.com/shaack/cm-chessboard\n\nLicense: Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)\nhttps://creativecommons.org/licenses/by-nc-sa/4.0/\n\nSee also: https://github.com/ornicar/lila/blob/master/COPYING.md\n-->\n<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">\n    <title>cm-chessboard Staunty pieces and markers sprite</title>\n    <g id="wk" transform="matrix(0.78030303,0,0,0.78030303,0.99250091,1.3663636)">\n        <path d="m 27.67,15.225 v -3.544 h 4.44 V 7.252 H 27.175 V 3.36 H 22.81 v 3.893 h -4.934 v 4.43 h 4.44 v 3.543"\n              fill="#f0f0f0" stroke-linecap="round" stroke-width="1.2" stroke="#1e1e1e" id="path1542"/>\n        <rect x="20.299" y="14.215" width="9.3979998" height="2.7869999" ry="1.3940001" fill="#f0f0f0"\n              stroke-linejoin="round" stroke-width="1.2" stroke="#1e1e1e" id="rect1544"/>\n        <path d="m 26.416,14.215 c 0.725,0 1.308,0.621 1.308,1.393 0,0.773 -0.583,1.394 -1.308,1.394 h 1.974 c 0.724,0 1.308,-0.621 1.308,-1.393 0,-0.773 -0.584,-1.394 -1.308,-1.394 z"\n              opacity="0.15" id="path1546"/>\n        <path d="m 21.631,14.842 c -0.402,0 -0.725,0.345 -0.725,0.773 0,0.427 0.323,0.772 0.725,0.772 h 0.874 c -0.402,0 -0.725,-0.345 -0.725,-0.772 0,-0.428 0.323,-0.773 0.725,-0.773 z"\n              fill="#ffffff" id="path1548"/>\n        <path d="m 33.635,36.986 c 0,0 7.776,-13.318 6.613,-15.916 -1.164,-2.596 -8.48,-4.497 -15.248,-4.497 -6.768,0 -14.084,1.9 -15.248,4.497 -1.164,2.597 6.612,15.916 6.612,15.916 z"\n              fill="#f0f0f0" stroke-linecap="round" stroke-width="1.2" stroke="#1e1e1e" id="path1550"/>\n        <path d="m 24.996,16.576 c 15.938,2.622 12.573,9.354 6.64,22.543 l 2.028,-1.729 c 0,0 7.747,-13.723 6.584,-16.32 -1.545,-2.833 -7.503,-4.159 -15.252,-4.494 z"\n              opacity="0.15" id="path1552"/>\n        <path d="m 23.765,17.295 c -3.904,-0.184 -14.621,1.801 -13.503,5.017 0.817,3.727 2.754,7.244 4.508,10.504 C 9.083,22.481 8.828,19.042 23.765,17.295 Z M 23.391,3.997 23.375,7.309 h 0.546 l 0.016,-3.312 z m -4.931,3.87 -0.008,3.208 h 0.774 l 0.007,-3.208 z m 4.413,3.213 0.025,2.486 h 0.52 L 23.393,11.08 Z"\n              fill="#ffffff" id="path1554"/>\n        <path d="m 26.189,3.358 v 3.894 h 0.987 V 3.358 Z m 4.441,3.894 v 4.945 h 1.48 V 7.252 Z m -4.44,4.429 v 2.492 h 1.48 v -2.492 z"\n              opacity="0.15" id="path1556"/>\n        <path d="m 25,36.457 c 0,0 -9.13,0.048 -11.691,1.62 -1.727,1.06 -2.135,3.65 -1.9,6.323 h 27.182 c 0.235,-2.672 -0.172,-5.264 -1.9,-6.324 -2.56,-1.57 -11.69,-1.619 -11.69,-1.619 z"\n              fill="#f0f0f0" stroke-linejoin="round" stroke-width="1.2" stroke="#1e1e1e" id="path1558"/>\n        <path d="m 25,37.147 c 0,0 -8.712,-0.137 -11.624,1.666 -0.37,0.229 -0.7,0.84 -0.954,1.39 0.261,-0.331 0.503,-0.613 0.887,-0.849 2.56,-1.571 11.691,-1.62 11.691,-1.62 0,0 9.132,0.049 11.692,1.62 0.391,0.24 0.592,0.532 0.856,0.87 0.025,-0.076 -0.409,-1.158 -1.144,-1.596 C 33.648,37.136 25,37.148 25,37.148 Z"\n              fill="#ffffff" id="path1560"/>\n    </g>\n    <g id="wq" transform="matrix(0.81370661,0,0,0.81370661,0.1573347,-0.13679755)">\n        <path d="m 24.959,5.094 a 2.958,3.316 90 0 0 -3.316,2.958 2.958,3.316 90 0 0 3.316,2.959 2.958,3.316 90 0 0 3.316,-2.959 2.958,3.316 90 0 0 -3.316,-2.958 z"\n              fill="#f0f0f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" stroke="#1e1e1e"\n              id="path1856"/>\n        <path d="M 24.836,5.732 C 24.46,5.522 21.112,6.538 22.651,9.308 22.416,7.763 23.089,6.105 24.836,5.732 Z"\n              fill="#ffffff" id="path1858"/>\n        <path d="m 24.959,11.011 c -6.507,0 -9.595,5.884 -9.595,10.358 h 19.263 c 0,-4.474 -3.16,-10.358 -9.668,-10.358 z"\n              fill="#f0f0f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" stroke="#1e1e1e"\n              id="path1860"/>\n        <path d="m 18.161,14.977 c 1.042,-1.478 2.92,-3.22 6.84,-3.38 -0.31,0.277 -4.788,1.138 -6.84,3.38 z"\n              fill="#ffffff" id="path1862"/>\n        <path d="m 24.836,5.007 c 0,0 0.046,0.238 0,0 2.48,1.129 2.05,3.847 0.817,5.547 7.354,3.803 2.213,8.669 2.212,8.668 h 2.701 c 1.762,1.287 7.209,-2.741 -3.835,-8.67 3.528,-3.115 0.097,-5.606 -1.895,-5.546 z"\n              opacity="0.15" id="path1864"/>\n        <path d="m 25,15.225 c -1.971,0 -2.348,2.65 -4.137,2.86 -1.82,0.213 -3.381,-2.312 -5.25,-1.737 -1.495,0.46 -0.778,2.6 -1.805,3.175 -1.402,0.785 -3.185,-1.832 -5.29,-0.298 6.838,8.829 8.085,12.377 7.983,18.819 h 16.998 c -0.103,-6.443 1.144,-9.99 7.983,-18.82 -2.106,-1.533 -3.889,1.084 -5.29,0.3 -1.027,-0.576 -0.311,-2.716 -1.806,-3.176 -1.868,-0.575 -3.429,1.95 -5.25,1.736 -1.789,-0.21 -2.166,-2.86 -4.137,-2.86 z"\n              fill="#f0f0f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" stroke="#1e1e1e"\n              id="path1866"/>\n        <path d="m 9.895,19.34 c -0.136,-0.01 -0.331,0.056 -0.458,0.085 3.081,4.1 6.575,9.537 7.099,12.417 -1.407,-4.933 -3.267,-9.562 -6.14,-12.472 z"\n              fill="#ffffff" id="path1868"/>\n        <path d="M 39.974,18.735 C 30.489,28.738 30.05,36.72 23.033,38.045 h 10.476 c -0.103,-6.443 1.145,-9.99 7.983,-18.819 0,0 -0.688,-0.756 -1.518,-0.491 z"\n              opacity="0.15" id="path1870"/>\n        <path d="m 14.912,18.945 c 0.203,-0.088 1.184,-1.808 1.98,-1.95 -1.42,-0.346 -1.618,-0.046 -1.98,1.95 z m 7.599,-1.069 c 0.953,-0.847 1.633,-2.655 3.238,-1.845 -0.798,-0.23 -2.215,1.04 -3.238,1.845 z m 8.609,0.257 c 0.21,0.07 2.176,-1.642 2.862,-1.218 0,0 -1.43,1.12 -2.862,1.218 z"\n              fill="#ffffff" id="path1872"/>\n        <path d="m 25,36.457 c 0,0 -9.13,0.048 -11.691,1.62 -1.727,1.06 -2.135,3.65 -1.9,6.323 h 27.182 c 0.235,-2.672 -0.172,-5.264 -1.9,-6.324 -2.56,-1.571 -11.69,-1.62 -11.69,-1.62 z"\n              fill="#f0f0f0" stroke-linejoin="round" stroke-width="1.2" stroke="#1e1e1e" id="path1874"/>\n        <path d="m 25,37.147 c 0,0 -8.712,-0.137 -11.624,1.666 -0.37,0.229 -0.7,0.84 -0.954,1.39 0.261,-0.331 0.502,-0.613 0.887,-0.849 2.56,-1.571 11.691,-1.62 11.691,-1.62 0,0 9.132,0.049 11.692,1.62 0.391,0.24 0.593,0.532 0.856,0.87 0.026,-0.076 -0.409,-1.158 -1.144,-1.596 C 33.648,37.136 25,37.147 25,37.147 Z"\n              fill="#ffffff" id="path1876"/>\n    </g>\n    <g id="wb" transform="matrix(0.77573871,0,0,0.77573871,1.1065042,1.5417581)">\n        <path d="m 25,5.767 c -2.106,0 -3.812,0.879 -3.812,1.963 l 1.517,2.65 C 6.655,24.47 16.998,37.516 16.998,37.516 h 16.005 c 0,0 7.05,-8.672 0.763,-19.51 l -2.99,4.827 c -0.67,1.084 -1.962,1.49 -2.897,0.911 -0.935,-0.578 -1.147,-1.917 -0.477,-3 l 3.887,-6.277 a 35.382,35.382 0 0 0 -3.993,-4.086 l 1.517,-2.65 c 0,-1.085 -1.707,-1.964 -3.812,-1.964 z"\n              fill="#f0f0f0" stroke-linejoin="round" stroke-width="1.2" stroke="#1e1e1e" id="path1449"/>\n        <path d="m 25,5.767 c -0.816,0 -1.571,0.134 -2.191,0.358 4.338,0.848 4.976,1.12 2.56,4.351 l 3.246,3.567 c -3.657,8.24 -1.604,7.991 -1.604,7.991 0,0 0.696,-2.648 4.112,-7.768 A 35.696,35.696 0 0 0 27.296,10.38 L 28.812,7.73 C 28.812,6.646 27.106,5.767 25,5.767 Z m 8.765,12.238 -1.009,1.513 c 3.737,8.413 -4.134,17.997 -4.134,17.997 h 4.381 c 0.158,0.034 6.958,-8.844 0.762,-19.51 z"\n              opacity="0.15" id="path1451"/>\n        <path d="M 15.145,31.721 C 14.925,31.69 11.722,21.935 20.899,12.97 18.597,14.865 13.764,26.133 15.145,31.721 Z M 23.292,10.196 21.815,7.602 c 0,0 0.242,-0.722 1.78,-1.048 -1.726,1.35 -0.987,1.663 -0.303,3.642 z"\n              fill="#ffffff" id="path1453"/>\n        <path d="m 25,36.457 c 0,0 -9.13,0.048 -11.691,1.62 -1.727,1.06 -2.135,3.65 -1.9,6.323 h 27.182 c 0.235,-2.672 -0.172,-5.264 -1.9,-6.324 -2.56,-1.57 -11.69,-1.619 -11.69,-1.619 z"\n              fill="#f0f0f0" stroke-linejoin="round" stroke-width="1.2" stroke="#1e1e1e" id="path1455"/>\n        <path d="m 25,37.147 c 0,0 -8.712,-0.137 -11.624,1.666 -0.37,0.229 -0.7,0.84 -0.954,1.39 0.261,-0.331 0.502,-0.613 0.887,-0.85 C 15.869,37.784 25,37.736 25,37.736 c 0,0 9.132,0.048 11.692,1.619 0.391,0.24 0.592,0.532 0.856,0.87 0.026,-0.076 -0.409,-1.158 -1.144,-1.596 C 33.648,37.136 25,37.147 25,37.147 Z"\n              fill="#ffffff" id="path1457"/>\n    </g>\n    <g id="wn" transform="matrix(0.7833885,0,0,0.78330159,1.0320312,1.1996996)">\n        <path d="m 25.192,23.015 c -0.165,6.967 -11.758,5.219 -11.516,18.104 l 22.86,0.118 C 34.442,34.795 46.226,16.077 24.605,8.979 v 0 c 0,0 -2.438,-2.6 -5.965,-2.823 l 0.222,3.534 -4.558,4.582 c -2.63,3.145 -8.735,8.378 -7.751,9.611 3.115,5.304 6.33,4.432 6.33,4.432 4.242,-4.544 5.82,-2.09 12.31,-5.3 z"\n              fill="#f0f0f0" stroke="#1e1e1e" stroke-linejoin="round" stroke-width="1.2" id="path1668"/>\n        <path d="m 19.32,14.694 c -0.776,0.86 -0.69,1.116 -0.814,2.15 0.806,0.123 1.507,0.24 2.249,0.066 2.38,-1.262 0.075,-3.403 -1.435,-2.216 z"\n              opacity="0.35" id="path1670"/>\n        <path d="m 9.192,22.166 c -0.85,0.408 -0.999,0.96 -1.057,1.475 0.729,0.419 1.877,-0.125 2.041,-1.431 z"\n              opacity="0.3" id="path1672"/>\n        <path d="m 8.19,25.15 c 0,0 0.653,1.137 -1.101,-1.641 0.659,-1.977 8.263,-9.08 12.438,-13.534 L 19.343,6.889 c 0,0 1.069,1.69 1.248,3.468 C 16.2,14.747 8.37,21.19 7.767,23.57 c 0.023,0.674 0.24,1.028 0.423,1.58 z"\n              fill="#ffffff" id="path1674"/>\n        <path d="m 13.26,28.257 c 2.03,-3.337 8.391,-3.224 11.932,-5.242 0.323,0.102 0.13,1.37 0.24,1.23 0.847,-1.09 2.926,-3.28 0.868,-6.875 0.522,5.958 -13.718,5.591 -15.89,10.305 -0.2,0.436 2.182,0.793 2.85,0.582 z"\n              opacity="0.15" id="path1676"/>\n        <path d="M 25.8,23.781 C 24.787,29.594 16.255,29.898 14.812,36.422 17.645,30.016 25.574,30.708 25.8,23.781 Z"\n              fill="#ffffff" id="path1678"/>\n        <path d="m 18.64,6.156 c 0,0 3.051,0.738 4.904,3.982 20.5,7.154 7.642,27.937 5.789,31.073 l 7.203,0.026 C 34.55,37.994 46.084,15.64 24.606,8.98 22.83,7.91 21.837,6.37 18.64,6.155 Z"\n              opacity="0.15" id="path1680"/>\n        <path d="m 25,36.457 c 0,0 -9.13,0.048 -11.691,1.62 -1.727,1.06 -2.135,3.65 -1.9,6.323 h 27.182 c 0.235,-2.672 -0.172,-5.264 -1.9,-6.324 -2.56,-1.57 -11.69,-1.619 -11.69,-1.619 z"\n              fill="#f0f0f0" stroke="#1e1e1e" stroke-linejoin="round" stroke-width="1.2" id="path1682"/>\n        <path d="m 25,37.147 c 0,0 -8.712,-0.137 -11.624,1.666 -0.37,0.229 -0.7,0.84 -0.954,1.39 0.261,-0.331 0.503,-0.613 0.887,-0.849 C 15.87,37.783 25,37.734 25,37.734 c 0,0 9.132,0.049 11.692,1.62 0.391,0.24 0.592,0.532 0.856,0.87 0.026,-0.076 -0.409,-1.158 -1.144,-1.596 C 33.648,37.136 25,37.148 25,37.148 Z"\n              fill="#ffffff" id="path1684"/>\n    </g>\n    <g id="wr" transform="matrix(0.84246687,0,0,0.84246687,-1.0662673,-1.4610091)">\n        <path d="m 17.932,20.414 c 4.906,-0.74 9.579,-0.578 14.136,0 M 14.183,9.662 c -1.06,8.767 1.103,10.677 3.748,10.752 L 14.616,38.573 H 35.383 L 32.067,20.414 c 2.645,-0.074 4.808,-1.985 3.749,-10.752 l -3.608,-0.53 -1.073,3.644 -3.142,-0.1 -0.522,-3.754 h -4.945 l -0.52,3.754 -3.143,0.1 -1.073,-3.643 z"\n              fill="#f0f0f0" stroke-width="1.2" stroke="#1e1e1e" id="path1983"/>\n        <path d="m 17.932,20.414 c 6.828,0 13.118,0.408 14.948,16.572 l 2.319,0.386 -3.131,-16.428 C 32.036,20.636 25.98,19.121 17.932,20.414 Z"\n              opacity="0.15" id="path1985"/>\n        <path d="m 14.777,10.219 2.277,-0.286 c -1.914,0.312 -2.313,5.296 -2.313,5.296 -0.238,-0.177 -0.188,-4.903 0.036,-5.01 z M 25.276,9.55 c -1.648,0 -2.52,2.748 -2.52,2.748 l 0.338,-2.729 z m 7.395,0.266 0.934,0.118 c -0.785,0.5 -1.59,1.989 -1.59,1.989 z m -14.199,11.148 2.62,-0.293 c -2.62,0.293 -4.888,13.113 -4.888,13.113 z"\n              fill="#ffffff" id="path1987"/>\n        <path d="m 34.013,9.398 c 0.357,6.363 -1.95,10.603 -8.041,10.536 l 4.777,0.563 c 7.523,0.31 5.101,-10.806 5.068,-10.835 z"\n              opacity="0.15" id="path1989"/>\n        <path d="m 25,36.457 c 0,0 -9.13,0.048 -11.691,1.62 -1.727,1.06 -2.135,3.65 -1.9,6.323 h 27.182 c 0.235,-2.672 -0.172,-5.264 -1.9,-6.324 -2.56,-1.57 -11.69,-1.619 -11.69,-1.619 z"\n              fill="#f0f0f0" stroke-linejoin="round" stroke-width="1.2" stroke="#1e1e1e" id="path1991"/>\n        <path d="m 25,37.146 c 0,0 -8.712,-0.137 -11.624,1.666 -0.37,0.229 -0.7,0.84 -0.954,1.39 0.261,-0.331 0.503,-0.613 0.887,-0.849 C 15.87,37.782 25,37.733 25,37.733 c 0,0 9.132,0.049 11.692,1.62 0.391,0.24 0.592,0.532 0.856,0.87 0.025,-0.076 -0.409,-1.158 -1.144,-1.596 C 33.648,37.135 25,37.147 25,37.147 Z"\n              fill="#ffffff" id="path1993"/>\n    </g>\n    <g id="wp" transform="matrix(0.82029849,0,0,0.82029849,-0.5120331,-0.50721691)">\n        <path d="m 21.503,27.594 h 6.994 M 19,17.508 c 0,1.732 0.712,3.387 1.966,4.587 l -3.65,2.1 0.43,3.399 h 4.306 c -0.794,3.559 -2.755,7.33 -5.062,8.617 -2.307,1.287 -5.3,3.097 -4.843,8.189 h 25.706 c 0.457,-5.092 -2.535,-6.902 -4.842,-8.189 -2.307,-1.286 -4.268,-5.058 -5.062,-8.617 h 4.306 l 0.43,-3.4 -3.65,-2.099 a 6.352,6.352 0 0 0 1.966,-4.587 c 0,-3.367 -2.628,-5.912 -6,-5.912 -3.373,0 -6.002,2.545 -6.001,5.912 z"\n              fill="#f0f0f0" stroke-linejoin="round" stroke-width="1.2" stroke="#1e1e1e" id="path1775"/>\n        <path d="m 24.962,11.537 c 1.17,-0.459 9.527,5.906 0.647,10.773 l 4.512,2.1 -0.562,3.125 h 2.659 l 0.428,-3.399 -3.65,-2.1 c 1.253,-1.2 1.962,-2.58 1.964,-4.312 -0.468,-5.416 -5.998,-6.186 -5.998,-6.186 z m -2.949,15.998 c 4.503,7.934 9.47,9.994 13.074,9.965 L 32.972,36.153 C 30.897,34.663 28.24,31.295 27.91,27.535 Z"\n              opacity="0.15" id="path1777"/>\n        <path d="m 21.983,22.213 -1.647,2.347 -2.356,-0.014 4.013,-2.324 z m 2.324,-9.946 c -2.542,0.138 -5.73,3.173 -4.385,6.918 l 0.199,0.643 c -0.33,-3.489 2.127,-7.116 4.186,-7.561 z m -6.444,25.358 c -3.984,2.305 -5.117,6.14 -5.117,6.14 -0.01,0 -0.548,-4.175 3.956,-6.654 4.504,-2.479 4.822,-6.15 5.86,-8.893 -0.636,3.704 -0.715,7.102 -4.699,9.407 z"\n              fill="#ffffff" id="path1779"/>\n    </g>\n    <g id="bk" transform="matrix(0.78030303,0,0,0.78030303,0.4879357,1.3663636)">\n        <path d="m 27.67,15.225 v -3.544 h 4.44 V 7.252 H 27.175 V 3.36 H 22.81 v 3.893 h -4.934 v 4.43 h 4.44 v 3.543"\n              fill="#5f5955" stroke-linecap="round" stroke-width="1.2" stroke="#010101" id="path848"/>\n        <rect x="20.299" y="14.215" width="9.3979998" height="2.7869999" ry="1.3940001" fill="#5f5955"\n              stroke-linejoin="round" stroke-width="1.2" stroke="#010101" id="rect850"/>\n        <path d="m 26.416,14.215 c 0.725,0 1.308,0.621 1.308,1.393 0,0.773 -0.583,1.394 -1.308,1.394 h 1.974 c 0.724,0 1.308,-0.621 1.308,-1.393 0,-0.773 -0.584,-1.394 -1.308,-1.394 z"\n              opacity="0.18" id="path852"/>\n        <path d="m 21.631,14.842 c -0.402,0 -0.725,0.345 -0.725,0.773 0,0.427 0.323,0.772 0.725,0.772 h 0.874 c -0.402,0 -0.725,-0.345 -0.725,-0.772 0,-0.428 0.323,-0.773 0.725,-0.773 z"\n              fill="#ffffff" opacity="0.25" id="path854"/>\n        <path d="m 33.635,36.986 c 0,0 7.776,-13.318 6.613,-15.916 -1.164,-2.596 -8.48,-4.497 -15.248,-4.497 -6.768,0 -14.084,1.9 -15.248,4.497 -1.164,2.597 6.612,15.916 6.612,15.916 z"\n              fill="#5f5955" stroke-linecap="round" stroke-width="1.2" stroke="#010101" id="path856"/>\n        <path d="m 24.996,16.576 c 15.938,2.622 12.573,9.354 6.64,22.543 l 2.028,-1.729 c 0,0 7.747,-13.723 6.584,-16.32 -1.545,-2.833 -7.503,-4.159 -15.252,-4.494 z"\n              opacity="0.18" id="path858"/>\n        <path d="m 23.765,17.295 c -3.904,-0.184 -14.621,1.801 -13.503,5.017 0.817,3.727 2.754,7.244 4.508,10.504 C 9.083,22.481 8.828,19.042 23.765,17.295 Z M 23.391,3.997 23.375,7.309 h 0.546 l 0.016,-3.312 z m -4.931,3.87 -0.008,3.208 h 0.774 l 0.007,-3.208 z m 4.413,3.213 0.025,2.486 h 0.52 L 23.393,11.08 Z"\n              fill="#ffffff" opacity="0.25" id="path860"/>\n        <path d="m 26.189,3.358 v 3.894 h 0.987 V 3.358 Z m 4.441,3.894 v 4.945 h 1.48 V 7.252 Z m -4.44,4.429 v 2.492 h 1.48 v -2.492 z"\n              opacity="0.18" id="path862"/>\n        <path d="m 25,36.457 c 0,0 -9.13,0.048 -11.691,1.62 -1.727,1.06 -2.135,3.65 -1.9,6.323 h 27.182 c 0.235,-2.672 -0.172,-5.264 -1.9,-6.324 -2.56,-1.57 -11.69,-1.619 -11.69,-1.619 z"\n              fill="#5f5955" stroke-linejoin="round" stroke-width="1.2" stroke="#010101" id="path864"/>\n        <path d="m 25,37.147 c 0,0 -8.712,-0.137 -11.624,1.666 -0.37,0.229 -0.7,0.84 -0.954,1.39 0.261,-0.331 0.503,-0.613 0.887,-0.849 2.56,-1.571 11.691,-1.62 11.691,-1.62 0,0 9.132,0.049 11.692,1.62 0.391,0.24 0.592,0.532 0.856,0.87 0.025,-0.076 -0.409,-1.158 -1.144,-1.596 C 33.648,37.136 25,37.148 25,37.148 Z"\n              fill="#ffffff" opacity="0.25" id="path866"/>\n    </g>\n    <g id="bq" transform="matrix(0.81370661,0,0,0.81370661,-0.34679558,-0.13679747)">\n        <path d="m 24.959,5.094 a 2.958,3.316 90 0 0 -3.316,2.958 2.958,3.316 90 0 0 3.316,2.959 2.958,3.316 90 0 0 3.316,-2.959 2.958,3.316 90 0 0 -3.316,-2.958 z"\n              fill="#5f5955" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" stroke="#010101"\n              id="path1232"/>\n        <path d="M 24.836,5.732 C 24.46,5.522 21.112,6.538 22.651,9.308 22.416,7.763 23.089,6.105 24.836,5.732 Z"\n              fill="#ffffff" opacity="0.25" id="path1234"/>\n        <path d="m 24.959,11.011 c -6.507,0 -9.595,5.884 -9.595,10.358 h 19.263 c 0,-4.474 -3.16,-10.358 -9.668,-10.358 z"\n              fill="#5f5955" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" stroke="#010101"\n              id="path1236"/>\n        <path d="m 18.161,14.977 c 1.042,-1.478 2.92,-3.22 6.84,-3.38 -0.31,0.277 -4.788,1.138 -6.84,3.38 z"\n              fill="#ffffff" opacity="0.25" id="path1238"/>\n        <path d="m 24.836,5.007 c 0,0 0.046,0.238 0,0 2.48,1.129 2.05,3.847 0.817,5.547 7.354,3.803 2.213,8.669 2.212,8.668 h 2.701 c 1.762,1.287 7.209,-2.741 -3.835,-8.67 3.528,-3.115 0.097,-5.606 -1.895,-5.546 z"\n              opacity="0.18" id="path1240"/>\n        <path d="m 25,15.225 c -1.971,0 -2.348,2.65 -4.137,2.86 -1.82,0.213 -3.381,-2.312 -5.25,-1.737 -1.495,0.46 -0.778,2.6 -1.805,3.175 -1.402,0.785 -3.185,-1.832 -5.29,-0.298 6.838,8.829 8.085,12.377 7.983,18.819 h 16.998 c -0.103,-6.443 1.144,-9.99 7.983,-18.82 -2.106,-1.533 -3.889,1.084 -5.29,0.3 -1.027,-0.576 -0.311,-2.716 -1.806,-3.176 -1.868,-0.575 -3.429,1.95 -5.25,1.736 -1.789,-0.21 -2.166,-2.86 -4.137,-2.86 z"\n              fill="#5f5955" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" stroke="#010101"\n              id="path1242"/>\n        <path d="m 9.895,19.34 c -0.136,-0.01 -0.331,0.056 -0.458,0.085 3.081,4.1 6.575,9.537 7.099,12.417 -1.407,-4.933 -3.267,-9.562 -6.14,-12.472 z"\n              fill="#ffffff" opacity="0.25" id="path1244"/>\n        <path d="M 39.974,18.735 C 30.489,28.738 30.05,36.72 23.033,38.045 h 10.476 c -0.103,-6.443 1.145,-9.99 7.983,-18.819 0,0 -0.688,-0.756 -1.518,-0.491 z"\n              opacity="0.18" id="path1246"/>\n        <path d="m 14.912,18.945 c 0.203,-0.088 1.184,-1.808 1.98,-1.95 -1.42,-0.346 -1.618,-0.046 -1.98,1.95 z m 7.599,-1.069 c 0.953,-0.847 1.633,-2.655 3.238,-1.845 -0.798,-0.23 -2.215,1.04 -3.238,1.845 z m 8.609,0.257 c 0.21,0.07 2.176,-1.642 2.862,-1.218 0,0 -1.43,1.12 -2.862,1.218 z"\n              fill="#ffffff" opacity="0.25" id="path1248"/>\n        <path d="m 25,36.457 c 0,0 -9.13,0.048 -11.691,1.62 -1.727,1.06 -2.135,3.65 -1.9,6.323 h 27.182 c 0.235,-2.672 -0.172,-5.264 -1.9,-6.324 -2.56,-1.571 -11.69,-1.62 -11.69,-1.62 z"\n              fill="#5f5955" stroke-linejoin="round" stroke-width="1.2" stroke="#010101" id="path1250"/>\n        <path d="m 25,37.147 c 0,0 -8.712,-0.137 -11.624,1.666 -0.37,0.229 -0.7,0.84 -0.954,1.39 0.261,-0.331 0.502,-0.613 0.887,-0.849 2.56,-1.571 11.691,-1.62 11.691,-1.62 0,0 9.132,0.049 11.692,1.62 0.391,0.24 0.593,0.532 0.856,0.87 0.026,-0.076 -0.409,-1.158 -1.144,-1.596 C 33.648,37.136 25,37.147 25,37.147 Z"\n              fill="#ffffff" opacity="0.25" id="path1252"/>\n    </g>\n    <g id="bb" transform="matrix(0.20524753,0,0,0.20524753,-31.754618,-4.5982875)">\n        <path d="m 252.1347,51.711857 c -7.95969,0 -14.40756,3.322204 -14.40756,7.419212 l 5.73354,10.015748 C 182.79927,122.40036 221.89092,171.70808 221.89092,171.70808 h 60.49134 c 0,0 26.64567,-32.77606 2.88378,-73.738585 l -11.30079,18.243775 c -2.53228,4.09701 -7.41543,5.6315 -10.94929,3.44315 -3.53386,-2.18456 -4.33512,-7.24535 -1.80283,-11.33858 L 275.90415,84.593747 A 133.72725,133.72725 0 0 0 260.8125,69.150597 l 5.73354,-10.015748 c 0,-4.100788 -6.45165,-7.422992 -14.40756,-7.422992 z"\n              fill="#5f5955" stroke-linejoin="round" stroke-width="4.53543" stroke="#010101" id="path666"/>\n        <path d="m 252.1347,51.711857 c -3.08409,0 -5.93764,0.506456 -8.28094,1.353071 16.39559,3.205039 18.80692,4.23307 9.67559,16.444724 l 12.26834,13.481575 c -13.82173,31.143303 -6.06236,30.202203 -6.06236,30.202203 0,0 2.63055,-10.00819 15.54142,-29.359368 A 134.91402,134.91402 0 0 0 260.8125,69.146817 l 5.72976,-10.015748 c 0,-4.097008 -6.44787,-7.419212 -14.40756,-7.419212 z m 33.12756,46.253858 -3.81354,5.718425 c 14.12409,31.79717 -15.62457,68.02016 -15.62457,68.02016 h 16.55811 c 0.59716,0.1285 26.29795,-33.42614 2.88,-73.738585 z"\n              opacity="0.18" id="path668" style="stroke-width:3.77953"/>\n        <path d="m 214.88746,149.80572 c -0.8315,-0.11717 -12.93733,-36.98646 21.7474,-70.869926 -8.70048,7.162205 -26.96693,49.749926 -21.7474,70.869926 z M 245.67927,68.451384 240.0969,58.64729 c 0,0 0.91465,-2.728819 6.72756,-3.960945 -6.52346,5.102362 -3.73039,6.285354 -1.14519,13.765039 z"\n              fill="#ffffff" opacity="0.25" id="path670" style="stroke-width:3.77953"/>\n        <path d="m 252.1347,167.70556 c 0,0 -34.50709,0.18142 -44.18646,6.12283 -6.52724,4.0063 -8.06929,13.79528 -7.1811,23.89796 h 102.73512 c 0.88819,-10.0989 -0.65008,-19.89544 -7.1811,-23.90174 -9.67559,-5.93385 -44.18268,-6.11905 -44.18268,-6.11905 z"\n              fill="#5f5955" stroke-linejoin="round" stroke-width="4.53543" stroke="#010101" id="path672"/>\n        <path d="m 252.1347,170.31343 c 0,0 -32.92724,-0.51779 -43.93323,6.2967 -1.39842,0.86551 -2.64567,3.1748 -3.60567,5.25354 0.98646,-1.25102 1.89732,-2.31685 3.35244,-3.2126 9.67559,-5.93008 44.18646,-6.1115 44.18646,-6.1115 0,0 34.51465,0.18142 44.19024,6.11906 1.47779,0.90709 2.23748,2.01071 3.23527,3.28819 0.0983,-0.28725 -1.54582,-4.37669 -4.32378,-6.03213 -10.41638,-5.64283 -43.10173,-5.60126 -43.10173,-5.60126 z"\n              fill="#ffffff" opacity="0.25" id="path674" style="stroke-width:3.77953"/>\n    </g>\n    <g id="bn" transform="matrix(0.78338919,0,0,0.78338919,0.92902684,1.1976777)">\n        <path d="m 25.192,23.015 c -0.165,6.967 -11.758,5.219 -11.516,18.104 l 22.86,0.118 C 34.442,34.795 46.226,16.077 24.605,8.979 v 0 c 0,0 -2.438,-2.6 -5.965,-2.823 l 0.222,3.534 -4.558,4.582 c -2.63,3.145 -8.735,8.378 -7.751,9.611 3.115,5.304 6.33,4.432 6.33,4.432 4.242,-4.544 5.82,-2.09 12.31,-5.3 z"\n              fill="#5f5955" stroke="#010101" stroke-linejoin="round" stroke-width="1.2" id="path974"/>\n        <path d="m 19.32,14.694 c -0.776,0.86 -0.69,1.116 -0.814,2.15 0.806,0.123 1.507,0.24 2.249,0.066 2.38,-1.262 0.075,-3.403 -1.435,-2.216 z"\n              opacity="0.4" id="path976"/>\n        <path d="m 9.192,22.166 c -0.85,0.408 -0.999,0.96 -1.057,1.475 0.729,0.419 1.877,-0.125 2.041,-1.431 z"\n              opacity="0.35" id="path978"/>\n        <path d="m 8.19,25.15 c 0,0 0.653,1.137 -1.101,-1.641 0.659,-1.977 8.263,-9.08 12.438,-13.534 L 19.343,6.889 c 0,0 1.069,1.69 1.248,3.468 C 16.2,14.747 8.37,21.19 7.767,23.57 c 0.023,0.674 0.24,1.028 0.423,1.58 z"\n              fill="#ffffff" opacity="0.25" id="path980"/>\n        <path d="m 13.26,28.257 c 2.03,-3.337 8.391,-3.224 11.932,-5.242 0.323,0.102 0.13,1.37 0.24,1.23 0.847,-1.09 2.926,-3.28 0.868,-6.875 0.522,5.958 -13.718,5.591 -15.89,10.305 -0.2,0.436 2.182,0.793 2.85,0.582 z"\n              opacity="0.18" id="path982"/>\n        <path d="M 25.8,23.781 C 24.787,29.594 16.255,29.898 14.812,36.422 17.645,30.016 25.574,30.708 25.8,23.781 Z"\n              fill="#ffffff" opacity="0.25" id="path984"/>\n        <path d="m 18.64,6.156 c 0,0 3.051,0.738 4.904,3.982 20.5,7.154 7.642,27.937 5.789,31.073 l 7.203,0.026 C 34.55,37.994 46.084,15.64 24.606,8.98 22.83,7.91 21.837,6.37 18.64,6.155 Z"\n              opacity="0.18" id="path986"/>\n        <path d="m 25,36.457 c 0,0 -9.13,0.048 -11.691,1.62 -1.727,1.06 -2.135,3.65 -1.9,6.323 h 27.182 c 0.235,-2.672 -0.172,-5.264 -1.9,-6.324 -2.56,-1.57 -11.69,-1.619 -11.69,-1.619 z"\n              fill="#5f5955" stroke="#010101" stroke-linejoin="round" stroke-width="1.2" id="path988"/>\n        <path d="m 25,37.147 c 0,0 -8.712,-0.137 -11.624,1.666 -0.37,0.229 -0.7,0.84 -0.954,1.39 0.261,-0.331 0.503,-0.613 0.887,-0.849 C 15.87,37.783 25,37.734 25,37.734 c 0,0 9.132,0.049 11.692,1.62 0.391,0.24 0.592,0.532 0.856,0.87 0.026,-0.076 -0.409,-1.158 -1.144,-1.596 C 33.648,37.136 25,37.148 25,37.148 Z"\n              fill="#ffffff" opacity="0.25" id="path990"/>\n    </g>\n    <g id="br" transform="matrix(0.84246687,0,0,0.84246687,-1.1177673,-1.4608179)">\n        <path d="m 17.932,20.414 c 4.906,-0.74 9.579,-0.578 14.136,0 M 14.183,9.662 c -1.06,8.767 1.103,10.677 3.748,10.752 L 14.616,38.573 H 35.383 L 32.067,20.414 c 2.645,-0.074 4.808,-1.985 3.749,-10.752 l -3.608,-0.53 -1.073,3.644 -3.142,-0.1 -0.522,-3.754 h -4.945 l -0.52,3.754 -3.143,0.1 -1.073,-3.643 z"\n              fill="#5f5955" stroke-width="1.2" stroke="#010101" id="path1359"/>\n        <path d="m 17.932,20.414 c 6.828,0 13.118,0.408 14.948,16.572 l 2.319,0.386 -3.131,-16.428 C 32.036,20.636 25.98,19.121 17.932,20.414 Z"\n              opacity="0.18" id="path1361"/>\n        <path d="m 14.777,10.219 2.277,-0.286 c -1.914,0.312 -2.313,5.296 -2.313,5.296 -0.238,-0.177 -0.188,-4.903 0.036,-5.01 z M 25.276,9.55 c -1.648,0 -2.52,2.748 -2.52,2.748 l 0.338,-2.729 z m 7.395,0.266 0.934,0.118 c -0.785,0.5 -1.59,1.989 -1.59,1.989 z m -14.199,11.148 2.62,-0.293 c -2.62,0.293 -4.895,13.053 -4.906,13.113 z"\n              fill="#ffffff" opacity="0.25" id="path1363"/>\n        <path d="m 34.013,9.398 c 0.357,6.363 -1.95,10.603 -8.041,10.536 l 4.777,0.563 c 7.523,0.31 5.101,-10.806 5.068,-10.835 z"\n              opacity="0.18" id="path1365"/>\n        <path d="m 25,36.457 c 0,0 -9.13,0.048 -11.691,1.62 -1.727,1.06 -2.135,3.65 -1.9,6.323 h 27.182 c 0.235,-2.672 -0.172,-5.264 -1.9,-6.324 -2.56,-1.57 -11.69,-1.619 -11.69,-1.619 z"\n              fill="#5f5955" stroke-linejoin="round" stroke-width="1.2" stroke="#010101" id="path1367"/>\n        <path d="m 25,37.146 c 0,0 -8.712,-0.137 -11.624,1.666 -0.37,0.229 -0.7,0.84 -0.954,1.39 0.261,-0.331 0.503,-0.613 0.887,-0.849 C 15.87,37.782 25,37.733 25,37.733 c 0,0 9.132,0.049 11.692,1.62 0.391,0.24 0.592,0.532 0.856,0.87 0.025,-0.076 -0.409,-1.158 -1.144,-1.596 C 33.648,37.135 25,37.147 25,37.147 Z"\n              fill="#ffffff" opacity="0.25" id="path1369"/>\n    </g>\n    <g id="bp" transform="matrix(0.82029849,0,0,0.82029849,-0.5635331,-0.50702576)">\n        <path d="m 21.503,27.594 h 6.994 M 19,17.508 c 0,1.732 0.712,3.387 1.966,4.587 l -3.65,2.1 0.43,3.399 h 4.306 c -0.794,3.559 -2.755,7.33 -5.062,8.617 -2.307,1.287 -5.3,3.097 -4.843,8.189 h 25.706 c 0.457,-5.092 -2.535,-6.902 -4.842,-8.189 -2.307,-1.286 -4.268,-5.058 -5.062,-8.617 h 4.306 l 0.43,-3.4 -3.65,-2.099 a 6.352,6.352 0 0 0 1.966,-4.587 c 0,-3.367 -2.628,-5.912 -6,-5.912 -3.373,0 -6.002,2.545 -6.001,5.912 z"\n              fill="#5f5955" stroke-linejoin="round" stroke-width="1.2" stroke="#010101" id="path1131"/>\n        <path d="m 24.962,11.537 c 1.17,-0.459 9.527,5.906 0.647,10.773 l 4.512,2.1 -0.562,3.125 h 2.659 l 0.428,-3.399 -3.65,-2.1 c 1.253,-1.2 1.962,-2.58 1.964,-4.312 -0.468,-5.416 -5.998,-6.186 -5.998,-6.186 z m -2.949,15.998 c 4.503,7.934 9.47,9.994 13.074,9.965 L 32.972,36.153 C 30.897,34.663 28.24,31.295 27.91,27.535 Z"\n              opacity="0.18" id="path1133"/>\n        <path d="m 21.983,22.213 -1.647,2.347 -2.356,-0.014 4.013,-2.324 z m 2.324,-9.946 c -2.542,0.138 -5.73,3.173 -4.385,6.918 l 0.199,0.643 c -0.33,-3.489 2.127,-7.116 4.186,-7.561 z m -6.444,25.358 c -3.984,2.305 -5.117,6.14 -5.117,6.14 -0.01,0 -0.548,-4.175 3.956,-6.654 4.504,-2.479 4.822,-6.15 5.86,-8.893 -0.636,3.704 -0.715,7.102 -4.699,9.407 z"\n              fill="#ffffff" opacity="0.25" id="path1135"/>\n    </g>\n</svg>\n';
const markersRaw = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!--\nLicense: Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)\nhttps://creativecommons.org/licenses/by-sa/3.0/\n\nAuthor: shaack (https://shaack.com)\n-->\n\n<svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg">\n    <title>cm-chessboard markers</title>\n    <desc>Markers for cm-chessboard (https://shaack.com/projekte/cm-chessboard/)</desc>\n    <g id="markerFrame" transform="translate(2.000000, 2.000000)" fill="#000000" fill-opacity="0">\n        <path d="M2.66453526e-15,10.5882353 L2.66453526e-15,2.11764706 C2.66453526e-15,1.41176471 0.176470588,0.882352941 0.529411765,0.529411765 C0.882352941,0.176470588 1.41176471,-2.84217094e-14 2.11764706,-2.84217094e-14 L10.5882353,-2.84217094e-14" id="Path"/>\n        <path d="M25.4117647,36 L25.4117647,27.5294118 C25.4117647,26.8235294 25.5882353,26.2941176 25.9411765,25.9411765 C26.2941176,25.5882353 26.8235294,25.4117647 27.5294118,25.4117647 L36,25.4117647" id="Path" transform="translate(30.705882, 30.705882) rotate(-180.000000) translate(-30.705882, -30.705882) "/>\n        <path d="M0,36 L0,27.5294118 C0,26.8235294 0.176470588,26.2941176 0.529411765,25.9411765 C0.882352941,25.5882353 1.41176471,25.4117647 2.11764706,25.4117647 L10.5882353,25.4117647" id="Path" transform="translate(5.294118, 30.705882) rotate(-90.000000) translate(-5.294118, -30.705882) "/>\n        <path d="M25.4117647,10.5882353 L25.4117647,2.11764706 C25.4117647,1.41176471 25.5882353,0.882352941 25.9411765,0.529411765 C26.2941176,0.176470588 26.8235294,0 27.5294118,0 L36,0" id="Path" transform="translate(30.705882, 5.294118) rotate(-270.000000) translate(-30.705882, -5.294118) "/>\n    </g>\n    <g id="markerCircle" fill="#000000" fill-opacity="0">\n        <circle cx="20" cy="20" r="18"/>\n    </g>\n    <g id="markerCircleFilled">\n        <circle cx="20" cy="20" r="18"/>\n    </g>\n    <g id="markerDot">\n        <circle cx="20" cy="20" r="7"/>\n    </g>\n    <g id="markerBevel">\n        <path d="M-1.77635684e-15,8.8817842e-16 L9,8.8817842e-16 C7.43502116,0.842866191 5.49543951,2.27321471 3.86541703,3.91660579 C2.21006344,5.58553575 0.86967521,7.47275765 -1.77635684e-15,9 L-1.77635684e-15,8.8817842e-16 Z"/>\n        <path d="M30.9995741,0.000425886354 L40.0194705,0.000425886354 C38.4510319,0.843292078 36.5071624,2.2736406 34.8735365,3.91703168 C33.2145234,5.58596164 31.8711719,7.47318354 30.9995741,9.00042589 L30.9995741,0.000425886354 Z" transform="translate(35.509522, 4.500426) rotate(-270.000000) translate(-35.509522, -4.500426) "/>\n        <path d="M30.9995741,31.0004259 L40.0194705,31.0004259 C38.4510319,31.8432921 36.5071624,33.2736406 34.8735365,34.9170317 C33.2145234,36.5859616 31.8711719,38.4731835 30.9995741,40.0004259 L30.9995741,31.0004259 Z" transform="translate(35.509522, 35.500426) rotate(-180.000000) translate(-35.509522, -35.500426) "/>\n        <path d="M-0.000425886354,31.0004259 L9.01947047,31.0004259 C7.45103192,31.8432921 5.50716243,33.2736406 3.87353645,34.9170317 C2.21452335,36.5859616 0.87117192,38.4731835 -0.000425886354,40.0004259 L-0.000425886354,31.0004259 Z" transform="translate(4.509522, 35.500426) rotate(-90.000000) translate(-4.509522, -35.500426) "/>\n    </g>\n    <g id="markerSquare">\n        <rect x="0" y="0" width="40" height="40"/>\n    </g>\n</svg>\n';
const arrowsRaw = '<?xml version="1.0" encoding="UTF-8"?>\n<svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <title>arrows</title>\n    <g id="arrows" stroke="none" fill="none" fill-rule="evenodd" stroke-width="1">\n        <g id="cm-chessboard-arrowheads" transform="translate(5, 1)" fill="#000000">\n            <g id="arrowPointy" fill-rule="nonzero">\n                <path d="M13.5896955,18.4060262 L3.04774642,4.12789972 C2.71970374,3.68359527 2.81395252,3.05748421 3.25825697,2.72944153 C3.58591001,2.48752592 4.02754261,2.46849386 4.37479285,2.68132465 L29.6089137,18.1473987 C30.0797924,18.4360018 30.227556,19.0516834 29.9389529,19.5225621 C29.8565135,19.6570685 29.7434202,19.7701618 29.6089137,19.8526013 L4.37479285,35.3186754 C3.90391418,35.6072784 3.28823259,35.4595148 2.99962954,34.9886362 C2.78679874,34.6413859 2.80583081,34.1997533 3.04774642,33.8721003 L13.5896955,19.5939738 C13.850383,19.2408959 13.850383,18.7591041 13.5896955,18.4060262 Z" id="Path"></path>\n            </g>\n            <g id="arrowDefault" transform="translate(3, 0)" fill-rule="nonzero">\n                <path d="M13.6380471,11.3573439 L23.0265544,19.1369941 C23.4518122,19.4893778 23.5108883,20.1197808 23.1585046,20.5450386 C23.1090352,20.6047384 23.0527907,20.6584826 22.9909045,20.705188 L13.6023972,27.7906743 C13.1615654,28.1233691 12.5344983,28.0357067 12.2018035,27.594875 C12.0708444,27.4213498 12,27.2098744 12,26.9924778 L12,12.1273413 C12,11.5750565 12.4477153,11.1273413 13,11.1273413 C13.2329818,11.1273413 13.4586517,11.2086906 13.6380471,11.3573439 Z" id="Path"></path>\n            </g>\n        </g>\n    </g>\n</svg>';
const PIECE_SPRITES = { standard: piecesStandardRaw, staunty: piecesStauntyRaw };
function injectSprite(id, svgText, key) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("div");
    el.id = id;
    el.style.position = "absolute";
    el.style.transform = "scale(0)";
    el.setAttribute("aria-hidden", "true");
    document.body.appendChild(el);
  }
  if (el.dataset.key !== key) {
    el.innerHTML = svgText;
    el.dataset.key = key;
  }
}
function ensureSprites(pieceSet) {
  injectSprite("cm-chessboard-sprite", PIECE_SPRITES[pieceSet] ?? piecesStandardRaw, pieceSet);
  injectSprite("cm-chessboard-markers", markersRaw, "markers");
  injectSprite("cm-chessboard-arrows", arrowsRaw, "arrows");
}
const THEME_CSS_CLASS = {
  green: "green",
  brown: "chess-club",
  blue: "blue",
  gray: "black-and-white",
  classic: "default",
  contrast: "default-contrast"
};
const ENGINE_ARROW_TYPE = { class: "arrow-engine" };
const SEVERITY_MARKERS = {
  blunder: { class: "marker-frame-danger", slice: "markerFrame" },
  "missed-win": { class: "marker-frame-danger", slice: "markerFrame" },
  "missed-draw": { class: "marker-frame-danger", slice: "markerFrame" },
  mistake: { class: "marker-frame-warning", slice: "markerFrame" },
  inaccuracy: { class: "marker-frame-primary", slice: "markerFrame" }
};
const PROP_ARROW_TYPES = [ARROW_TYPE$1.success, ARROW_TYPE$1.warning, ARROW_TYPE$1.info, ARROW_TYPE$1.danger];
function arrowTypeOf(color) {
  switch (color) {
    case "green":
      return ARROW_TYPE$1.success;
    case "red":
      return ARROW_TYPE$1.danger;
    case "blue":
      return ARROW_TYPE$1.info;
    default:
      return ARROW_TYPE$1.warning;
  }
}
function Board({
  fen,
  orientation = "white",
  interactive = false,
  lastMove = null,
  lastMoveSeverity = null,
  markedSquares = [],
  arrows = [],
  showCoordinates = true,
  legalHints = true,
  onMove,
  maxWidth,
  evalTarget = true,
  allowFlip = true,
  themeOverride,
  pieceSetOverride
}) {
  const containerRef = reactExports.useRef(null);
  const [board, setBoard] = reactExports.useState(null);
  const [flipped, setFlipped] = reactExports.useState(false);
  const effOrientation = flipped ? orientation === "white" ? "black" : "white" : orientation;
  const settings = useStore((s) => s.settings);
  const theme = themeOverride ?? settings?.boardTheme ?? "green";
  const pieceSet = pieceSetOverride ?? settings?.pieceSet ?? "standard";
  const chess = reactExports.useMemo(() => {
    try {
      return new Chess(fen);
    } catch {
      return new Chess();
    }
  }, [fen]);
  const safeFen = chess.fen();
  useEvalTarget(evalTarget ? safeFen : null);
  const chessRef = reactExports.useRef(chess);
  chessRef.current = chess;
  const fenRef = reactExports.useRef(safeFen);
  fenRef.current = safeFen;
  const onMoveRef = reactExports.useRef(onMove);
  onMoveRef.current = onMove;
  const legalHintsRef = reactExports.useRef(legalHints);
  legalHintsRef.current = legalHints;
  const boardRef = reactExports.useRef(null);
  boardRef.current = board;
  reactExports.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    ensureSprites(pieceSet);
    const cb = new Chessboard(el, {
      position: fenRef.current,
      orientation: effOrientation === "black" ? "b" : "w",
      responsive: true,
      assetsUrl: "",
      assetsCache: true,
      style: {
        cssClass: THEME_CSS_CLASS[theme] ?? "green",
        showCoordinates,
        borderType: BORDER_TYPE.none,
        animationDuration: 200
      },
      extensions: [{ class: Markers }, { class: Arrows }, { class: PromotionDialog }, { class: RightClickAnnotator }]
    });
    setBoard(cb);
    return () => {
      setBoard(null);
      cb.destroy();
    };
  }, [theme, pieceSet, showCoordinates]);
  reactExports.useEffect(() => {
    if (board) void board.setPosition(safeFen, true);
  }, [board, safeFen]);
  reactExports.useEffect(() => {
    if (board && board.getOrientation() !== (effOrientation === "black" ? "b" : "w")) {
      void board.setOrientation(effOrientation === "black" ? "b" : "w", false);
    }
  }, [board, effOrientation]);
  const markedKey = markedSquares.join(",");
  reactExports.useEffect(() => {
    if (!board?.removeMarkers) return;
    board.removeMarkers(MARKER_TYPE$1.square);
    board.removeMarkers(MARKER_TYPE$1.circlePrimary);
    for (const t of Object.values(SEVERITY_MARKERS)) board.removeMarkers(t);
    if (lastMove) {
      board.addMarker?.(MARKER_TYPE$1.square, lastMove.from);
      board.addMarker?.(MARKER_TYPE$1.square, lastMove.to);
      const severityMarker = lastMoveSeverity ? SEVERITY_MARKERS[lastMoveSeverity] : null;
      if (severityMarker) {
        board.addMarker?.(severityMarker, lastMove.from);
        board.addMarker?.(severityMarker, lastMove.to);
      }
    }
    for (const sq of markedKey ? markedKey.split(",") : []) {
      board.addMarker?.(MARKER_TYPE$1.circlePrimary, sq);
    }
  }, [board, safeFen, lastMove, lastMoveSeverity, markedKey]);
  const arrowsKey = arrows.map((a) => `${a.from}${a.to}:${a.color ?? ""}`).join(" ");
  reactExports.useEffect(() => {
    if (!board?.removeArrows) return;
    for (const t of PROP_ARROW_TYPES) board.removeArrows(t);
    for (const a of arrows) board.addArrow?.(arrowTypeOf(a.color), a.from, a.to);
  }, [board, arrowsKey]);
  reactExports.useEffect(() => {
    if (!board?.removeArrows) return;
    for (const t of Object.values(ARROW_TYPE)) board.removeArrows(t);
    for (const t of Object.values(MARKER_TYPE)) board.removeMarkers?.(t);
  }, [board, safeFen]);
  const evalEnabled = useStore((s) => s.evalEnabled);
  const evalUpdate = useStore((s) => s.evalUpdate);
  const engineMove = evalTarget && evalEnabled && evalUpdate && evalUpdate.fen === safeFen ? evalUpdate.multiPv[0]?.moveUci ?? null : null;
  reactExports.useEffect(() => {
    if (!board?.removeArrows) return;
    board.removeArrows(ENGINE_ARROW_TYPE);
    if (engineMove && engineMove.length >= 4) {
      board.addArrow?.(ENGINE_ARROW_TYPE, engineMove.slice(0, 2), engineMove.slice(2, 4));
    }
  }, [board, engineMove]);
  reactExports.useEffect(() => {
    if (!board || !interactive) return;
    const syncToProp = () => {
      try {
        const b = boardRef.current;
        if (b) void b.setPosition(fenRef.current, false);
      } catch {
      }
    };
    const emitMove = (uci, san) => {
      onMoveRef.current?.(uci, san);
      window.setTimeout(syncToProp, 0);
    };
    board.enableMoveInput((event) => {
      const current = chessRef.current;
      switch (event.type) {
        case INPUT_EVENT_TYPE.moveInputStarted: {
          const from = event.squareFrom;
          const piece = current.get(from);
          if (!piece || piece.color !== current.turn()) return false;
          const moves = current.moves({ square: from, verbose: true });
          if (moves.length === 0) return false;
          if (legalHintsRef.current) event.chessboard.addLegalMovesMarkers?.(moves);
          return true;
        }
        case INPUT_EVENT_TYPE.validateMoveInput: {
          event.chessboard.removeLegalMovesMarkers?.();
          const from = event.squareFrom;
          const to = event.squareTo;
          const probe = new Chess(fenRef.current);
          let mv;
          try {
            mv = probe.move({ from, to, promotion: "q" });
          } catch {
            return false;
          }
          if (mv.promotion) {
            event.chessboard.showPromotionDialog?.(to, current.turn(), (result) => {
              if (result.type === PROMOTION_DIALOG_RESULT_TYPE.pieceSelected && result.piece) {
                const promo = result.piece.charAt(1);
                const probe2 = new Chess(fenRef.current);
                const mv2 = probe2.move({ from, to, promotion: promo });
                playSound(probe2.inCheck() ? "check" : mv2.captured ? "capture" : "move");
                emitMove(mv2.from + mv2.to + promo, mv2.san);
              } else {
                syncToProp();
              }
            });
            return true;
          }
          playSound(probe.inCheck() ? "check" : mv.captured ? "capture" : "move");
          emitMove(mv.from + mv.to, mv.san);
          return true;
        }
        case INPUT_EVENT_TYPE.moveInputCanceled:
        case INPUT_EVENT_TYPE.moveInputFinished:
          event.chessboard.removeLegalMovesMarkers?.();
          return void 0;
        default:
          return void 0;
      }
    });
    return () => {
      try {
        board.disableMoveInput();
      } catch {
      }
    };
  }, [board, interactive]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "board-wrap",
      style: maxWidth ? { maxWidth } : void 0,
      role: "group",
      "aria-label": `Chess board, ${chess.turn() === "w" ? "white" : "black"} to move`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, className: "cm-board-container" }),
        allowFlip && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "board-flip-btn",
            title: `Flip board (currently ${effOrientation} at the bottom)`,
            onClick: () => setFlipped((f) => !f),
            children: "⇵ Flip"
          }
        )
      ]
    }
  );
}
function resultBadge(game) {
  const r = game.result;
  let cls = "";
  let label = r ?? "?";
  if (r === "1/2-1/2") {
    cls = "yellow";
    label = "½–½";
  } else if (game.userColor === "white" && r === "1-0" || game.userColor === "black" && r === "0-1") {
    cls = "green";
    label = "Win";
  } else if (game.userColor === "white" && r === "0-1" || game.userColor === "black" && r === "1-0") {
    cls = "red";
    label = "Loss";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge ${cls}`, children: label });
}
const STATUS_BADGE = {
  none: { cls: "", label: "not analyzed" },
  queued: { cls: "blue", label: "queued" },
  running: { cls: "blue", label: "analyzing…" },
  done: { cls: "green", label: "analyzed" },
  failed: { cls: "red", label: "failed" }
};
function canAnalyze(g) {
  return !g.ongoing && (g.analysisStatus === "none" || g.analysisStatus === "failed");
}
function accuracyCell(g) {
  if (g.accuracyWhite == null && g.accuracyBlack == null) return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "muted", children: "—" });
  if (g.userColor === "white") return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mono", children: g.accuracyWhite?.toFixed(1) ?? "—" });
  if (g.userColor === "black") return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mono", children: g.accuracyBlack?.toFixed(1) ?? "—" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mono muted", children: [
    "W ",
    g.accuracyWhite?.toFixed(0) ?? "—",
    " / B ",
    g.accuracyBlack?.toFixed(0) ?? "—"
  ] });
}
function Games() {
  const navigate = useStore((s) => s.navigate);
  const setImportModalOpen = useStore((s) => s.setImportModalOpen);
  const [games, setGames] = reactExports.useState([]);
  const [filters, setFilters] = reactExports.useState({});
  const [selected, setSelected] = reactExports.useState(null);
  const [previewFen, setPreviewFen] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [checked, setChecked] = reactExports.useState(/* @__PURE__ */ new Set());
  const [bulkBusy, setBulkBusy] = reactExports.useState(false);
  const refresh = reactExports.useCallback(() => {
    void api.games.list(filters).then(setGames);
  }, [filters]);
  reactExports.useEffect(refresh, [refresh]);
  useAppEvent(["games:changed", "job:completed"], refresh);
  reactExports.useEffect(() => setChecked(/* @__PURE__ */ new Set()), [filters]);
  reactExports.useEffect(() => {
    setPreviewFen(null);
    if (!selected) return;
    void api.games.moves(selected.id).then((moves) => {
      setPreviewFen(moves.length ? moves[moves.length - 1].fenAfter : null);
    });
  }, [selected]);
  async function analyzeSelected(game) {
    setError(null);
    try {
      await api.analysis.queue([game.id]);
    } catch (e) {
      setError(e.message);
    }
  }
  const analyzable = games.filter(canAnalyze);
  const allChecked = analyzable.length > 0 && analyzable.every((g) => checked.has(g.id));
  function toggleSelectAll() {
    setChecked(allChecked ? /* @__PURE__ */ new Set() : new Set(analyzable.map((g) => g.id)));
  }
  function toggleOne(id) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  async function bulkAnalyze() {
    setError(null);
    setBulkBusy(true);
    try {
      await api.analysis.queue([...checked]);
      setChecked(/* @__PURE__ */ new Set());
    } catch (e) {
      setError(e.message);
    } finally {
      setBulkBusy(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Games" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "subtitle", children: "Your imported game library. Analyze games to turn mistakes into training." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { marginBottom: 12, flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          placeholder: "Search opponent / opening…",
          style: { width: 220 },
          value: filters.text ?? "",
          onChange: (e) => setFilters({ ...filters, text: e.target.value || void 0 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: filters.platform ?? "",
          onChange: (e) => setFilters({ ...filters, platform: e.target.value || void 0 }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All sources" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "chesscom", children: "Chess.com" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "lichess", children: "Lichess" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pgn-file", children: "PGN file" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pasted-pgn", children: "Pasted" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: filters.timeClass ?? "",
          onChange: (e) => setFilters({ ...filters, timeClass: e.target.value || void 0 }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All speeds" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "bullet", children: "Bullet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "blitz", children: "Blitz" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "rapid", children: "Rapid" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "classical", children: "Classical" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "daily", children: "Daily" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: filters.result ?? "",
          onChange: (e) => setFilters({ ...filters, result: e.target.value || void 0 }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All results" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "win", children: "Wins" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "loss", children: "Losses" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "draw", children: "Draws" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: filters.analyzed === void 0 ? "" : String(filters.analyzed),
          onChange: (e) => setFilters({ ...filters, analyzed: e.target.value === "" ? void 0 : e.target.value === "true" }),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Analyzed + not" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "true", children: "Analyzed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "false", children: "Not analyzed" })
          ]
        }
      )
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "callout error", style: { marginBottom: 10 }, children: error }),
    games.length > 0 && analyzable.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { marginBottom: 10, justifyContent: "space-between" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "row", style: { gap: 6 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: allChecked, onChange: toggleSelectAll }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "muted", children: [
          "Select all unanalyzed (",
          analyzable.length,
          ")"
        ] })
      ] }),
      checked.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small primary", disabled: bulkBusy, onClick: () => void bulkAnalyze(), children: bulkBusy ? "Queuing…" : `Analyze ${checked.size} selected` })
    ] }),
    games.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { textAlign: "center", padding: 40 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Import your games to build a personalized training plan." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "primary", onClick: () => setImportModalOpen(true), children: "Import games" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { alignItems: "flex-start" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, minWidth: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "White" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Black" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Result" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Speed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Opening" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Mistakes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Accuracy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Analysis" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", {})
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: games.map((g) => {
          const st = STATUS_BADGE[g.analysisStatus] ?? STATUS_BADGE.none;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: `clickable ${selected?.id === g.id ? "selected" : ""}`,
              onClick: () => setSelected(g),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { onClick: (e) => e.stopPropagation(), children: canAnalyze(g) && /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: checked.has(g.id), onChange: () => toggleOne(g.id) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "muted", children: (g.endedAt ?? g.importedAt).slice(0, 10) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
                  g.whiteName ?? "?",
                  " ",
                  g.whiteRating ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "muted", children: [
                    "(",
                    g.whiteRating,
                    ")"
                  ] }) : null
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
                  g.blackName ?? "?",
                  " ",
                  g.blackRating ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "muted", children: [
                    "(",
                    g.blackRating,
                    ")"
                  ] }) : null
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: resultBadge(g) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "muted", children: g.timeClass ?? "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "muted", children: g.openingName ?? g.ecoCode ?? "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: g.mistakeCount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge yellow", children: g.mistakeCount }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "muted", children: "—" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: accuracyCell(g) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge ${st.cls}`, children: st.label }),
                  g.ongoing && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge red", style: { marginLeft: 4 }, children: "ongoing" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", style: { gap: 4 }, children: g.analysisStatus === "done" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    className: "small primary",
                    onClick: (e) => {
                      e.stopPropagation();
                      navigate({ name: "review", gameId: g.id });
                    },
                    children: "Review"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    className: "small",
                    disabled: g.ongoing || g.analysisStatus === "queued" || g.analysisStatus === "running",
                    onClick: (e) => {
                      e.stopPropagation();
                      void analyzeSelected(g);
                    },
                    children: "Analyze"
                  }
                ) }) })
              ]
            },
            g.id
          );
        }) })
      ] }) }),
      selected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { width: 300, flexShrink: 0 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          selected.whiteName,
          " vs ",
          selected.blackName
        ] }),
        previewFen && /* @__PURE__ */ jsxRuntimeExports.jsx(Board, { fen: previewFen, maxWidth: 268, showCoordinates: false, evalTarget: false, allowFlip: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", style: { gap: 4, marginTop: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted", children: [
            selected.timeControl ?? "",
            " · ",
            selected.plyCount,
            " plies"
          ] }),
          selected.sourceGameUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted mono", style: { fontSize: 11, wordBreak: "break-all" }, children: selected.sourceGameUrl }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { marginTop: 6, flexWrap: "wrap" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: () => navigate({ name: "review", gameId: selected.id }), children: "Open review" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: () => void api.games.exportPgn([selected.id]), children: "Export PGN" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "small danger",
                onClick: () => {
                  if (!window.confirm(`Delete this game (${selected.whiteName} vs ${selected.blackName})? This also removes its analysis, mistakes, and exercises. This cannot be undone.`)) return;
                  void api.games.delete(selected.id).then(() => setSelected(null));
                },
                children: "Delete"
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
}
const SEVERITY_LABEL = {
  blunder: "Blunder",
  mistake: "Mistake",
  inaccuracy: "Inaccuracy",
  "missed-win": "Missed win",
  "missed-draw": "Missed draw"
};
const SEVERITY_GLYPH = {
  blunder: { glyph: "??", cls: "sev-blunder" },
  "missed-win": { glyph: "??", cls: "sev-blunder" },
  mistake: { glyph: "?", cls: "sev-mistake" },
  "missed-draw": { glyph: "?", cls: "sev-mistake" },
  inaccuracy: { glyph: "?!", cls: "sev-inaccuracy" }
};
function whiteCp(a) {
  const best = a.multiPv[0];
  if (!best) return 0;
  let cp = best.score.type === "mate" ? best.score.value > 0 ? 1e3 : -1e3 : best.score.value;
  if (a.sideToMove === "b") cp = -cp;
  return Math.max(-800, Math.min(800, cp));
}
function whitePct(a) {
  if (!a) return 50;
  const cp = whiteCp(a);
  return 50 + 50 * (2 / (1 + Math.exp(-cp / 400)) - 1);
}
function EvalGraph({
  analyses,
  mistakes,
  currentPly,
  onSelect
}) {
  const width = 800;
  const height = 140;
  const n = analyses.length;
  if (n < 2) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", children: "No evaluation data." });
  const yOf = (a) => height / 2 - whiteCp(a) / 800 * (height / 2 - 6);
  const xOf = (i) => i / (n - 1) * width;
  const points = analyses.map((a, i) => `${xOf(i).toFixed(1)},${yOf(a).toFixed(1)}`);
  const areaPoints = [`0,${height / 2}`, ...points, `${width},${height / 2}`].join(" ");
  const cursorX = xOf(currentPly);
  const dots = mistakes.map((m) => {
    const idx = analyses.findIndex((a) => a.ply === m.ply);
    if (idx < 0) return null;
    const sev = SEVERITY_GLYPH[m.severity];
    const color = sev.cls === "sev-blunder" ? "var(--danger)" : sev.cls === "sev-mistake" ? "var(--warn)" : "var(--info)";
    return { x: xOf(idx), y: yOf(analyses[idx]), color, m };
  }).filter((d) => d !== null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      className: "eval-graph",
      viewBox: `0 0 ${width} ${height}`,
      preserveAspectRatio: "none",
      onClick: (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const frac = (e.clientX - rect.left) / rect.width;
        onSelect(Math.round(frac * (n - 1)));
      },
      style: { cursor: "pointer" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: 0, y1: height / 2, x2: width, y2: height / 2, stroke: "var(--border)", strokeWidth: 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: areaPoints, fill: "var(--info)", opacity: 0.16, stroke: "none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: points.join(" "), fill: "none", stroke: "var(--info)", strokeWidth: 2 }),
        dots.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: d.x, cy: d.y, r: 4.5, fill: d.color, stroke: "var(--bg-raised)", strokeWidth: 1.5, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("title", { children: [
          "Move ",
          Math.ceil(d.m.ply / 2),
          " · ",
          SEVERITY_LABEL[d.m.severity]
        ] }) }, i)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: cursorX, y1: 0, x2: cursorX, y2: height, stroke: "var(--accent)", strokeWidth: 2 })
      ]
    }
  );
}
function AccuracySummary({ game, mistakes }) {
  if (game.accuracyWhite == null && game.accuracyBlack == null) return null;
  const counts = {};
  for (const m of mistakes) counts[m.severity] = (counts[m.severity] ?? 0) + 1;
  const summaryBits = [];
  if (counts.blunder || counts["missed-win"]) summaryBits.push(`${(counts.blunder ?? 0) + (counts["missed-win"] ?? 0)} blunder(s)`);
  if (counts.mistake || counts["missed-draw"]) summaryBits.push(`${(counts.mistake ?? 0) + (counts["missed-draw"] ?? 0)} mistake(s)`);
  if (counts.inaccuracy) summaryBits.push(`${counts.inaccuracy} inaccuracy(-ies)`);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", style: { marginBottom: 12 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "accuracy-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "accuracy-pill", children: game.accuracyWhite != null ? game.accuracyWhite.toFixed(1) : "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", children: "White accuracy" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "accuracy-pill", children: game.accuracyBlack != null ? game.accuracyBlack.toFixed(1) : "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", children: "Black accuracy" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", children: summaryBits.length > 0 ? summaryBits.join(" · ") : "No flagged mistakes" })
  ] }) });
}
function Review({ gameId }) {
  const navigate = useStore((s) => s.navigate);
  const [game, setGame] = reactExports.useState(null);
  const [moves, setMoves] = reactExports.useState([]);
  const [analyses, setAnalyses] = reactExports.useState([]);
  const [mistakes, setMistakes] = reactExports.useState([]);
  const [currentPly, setCurrentPly] = reactExports.useState(0);
  const [revealed, setRevealed] = reactExports.useState(false);
  const [notice, setNotice] = reactExports.useState(null);
  const [tryMode, setTryMode] = reactExports.useState(false);
  const [tryFeedback, setTryFeedback] = reactExports.useState(null);
  const [autoplay, setAutoplay] = reactExports.useState(false);
  reactExports.useEffect(() => {
    void api.games.get(gameId).then(setGame);
    void api.games.moves(gameId).then(setMoves);
    void api.analysis.forGame(gameId).then(setAnalyses);
    void api.analysis.mistakes(gameId).then(setMistakes);
  }, [gameId]);
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft") setCurrentPly((p) => Math.max(0, p - 1));
      if (e.key === "ArrowRight") setCurrentPly((p) => Math.min(moves.length, p + 1));
      if (e.key === "Home") setCurrentPly(0);
      if (e.key === "End") setCurrentPly(moves.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [moves.length]);
  reactExports.useEffect(() => {
    setRevealed(false);
    setTryMode(false);
    setTryFeedback(null);
  }, [currentPly]);
  reactExports.useEffect(() => {
    if (!autoplay) return;
    if (currentPly >= moves.length) {
      setAutoplay(false);
      return;
    }
    const t = setTimeout(() => setCurrentPly((p) => Math.min(moves.length, p + 1)), 900);
    return () => clearTimeout(t);
  }, [autoplay, currentPly, moves.length]);
  const mistakeByPly = reactExports.useMemo(() => new Map(mistakes.map((m) => [m.ply, m])), [mistakes]);
  const analysisByPly = reactExports.useMemo(() => new Map(analyses.map((a) => [a.ply, a])), [analyses]);
  if (!game) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", children: "Loading…" });
  const fen = currentPly === 0 ? moves[0]?.fenBefore ?? "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" : moves[currentPly - 1].fenAfter;
  const lastMove = currentPly > 0 ? { from: moves[currentPly - 1].uci.slice(0, 2), to: moves[currentPly - 1].uci.slice(2, 4) } : null;
  const orientation = game.userColor === "black" ? "black" : "white";
  const mistakeHere = mistakeByPly.get(currentPly);
  const upcomingMistake = mistakeByPly.get(currentPly + 1);
  const positionAnalysis = analysisByPly.get(currentPly);
  const bestHere = positionAnalysis?.multiPv[0];
  const playedNext = upcomingMistake && revealed ? moves[currentPly] : null;
  const boardArrows = playedNext ? [
    { from: playedNext.uci.slice(0, 2), to: playedNext.uci.slice(2, 4), color: "red" },
    ...upcomingMistake.betterMoveUci ? [
      {
        from: upcomingMistake.betterMoveUci.slice(0, 2),
        to: upcomingMistake.betterMoveUci.slice(2, 4),
        color: "green"
      }
    ] : []
  ] : [];
  function jumpToMistake(direction) {
    if (direction === 1) {
      const next = mistakes.find((m) => m.ply > currentPly);
      if (next) setCurrentPly(next.ply);
    } else {
      const prevMs = [...mistakes].reverse().find((m) => m.ply < currentPly);
      if (prevMs) setCurrentPly(prevMs.ply);
    }
  }
  function handleTryMove(uci, san) {
    if (!upcomingMistake) return;
    if (uci === upcomingMistake.betterMoveUci) {
      setTryFeedback(`✓ Correct — ${san} was the engine's top choice.`);
      setRevealed(true);
      setTryMode(false);
    } else {
      setTryFeedback(`${san} isn't the engine's top choice. Try again, or reveal what happened.`);
    }
  }
  async function createExercise(m) {
    try {
      await api.exercises.fromMistake(m.id);
      setNotice("Exercise created — it will appear in Exercises, due today.");
    } catch (e) {
      setNotice(e.message);
    }
  }
  async function addLineToRepertoire(uptoPly) {
    try {
      const nodes = await api.repertoire.addLineFromGame(gameId, uptoPly);
      setNotice(`Added ${nodes.length} of your moves to the ${orientation} repertoire.`);
    } catch (e) {
      setNotice(e.message);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { justifyContent: "space-between", marginBottom: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { children: [
          game.whiteName,
          " vs ",
          game.blackName,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "muted", style: { fontSize: 14 }, children: [
            game.result,
            " · ",
            game.timeClass ?? ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "subtitle", children: game.openingName ?? game.ecoCode ?? "" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({ name: "games" }), children: "← Games" })
    ] }),
    analyses.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "callout warn", style: { marginBottom: 12 }, children: "This game has no engine analysis yet. Queue it from the Games screen to see mistakes and coaching." }),
    analyses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(AccuracySummary, { game, mistakes }),
    notice && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "callout", style: { marginBottom: 12 }, children: notice }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { alignItems: "flex-start", gap: 16 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { width: 230, flexShrink: 0, maxHeight: 560, overflowY: "auto" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Moves" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "move-list", children: moves.map((m) => {
          const mk = mistakeByPly.get(m.ply);
          const before = analysisByPly.get(m.ply - 1);
          const isBest = !mk && before?.multiPv[0]?.moveUci === m.uci;
          const glyph = mk ? SEVERITY_GLYPH[mk.severity] : isBest ? { glyph: "✓", cls: "sev-best" } : null;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            m.color === "white" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "num", children: [
              m.moveNumber,
              "."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `mv ${currentPly === m.ply ? "current" : ""} ${mk ? mk.severity.replace("missed-win", "blunder").replace("missed-draw", "blunder") : ""}`,
                onClick: () => setCurrentPly(m.ply),
                title: mk ? SEVERITY_LABEL[mk.severity] : isBest ? "Best move" : void 0,
                children: [
                  m.san,
                  glyph && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `mv-glyph ${glyph.cls}`, children: glyph.glyph })
                ]
              }
            )
          ] }, m.ply);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: "0 1 520px", minWidth: 320 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { alignItems: "flex-start", gap: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "eval-bar-vert-outer",
              style: { height: "min(52vh, 480px)" },
              title: "Static eval from stored analysis (White ↔ Black)",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eval-bar-vert-white", style: { height: `${whitePct(positionAnalysis)}%` } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, minWidth: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Board,
            {
              fen,
              orientation,
              interactive: tryMode,
              onMove: tryMode ? handleTryMove : void 0,
              lastMove,
              lastMoveSeverity: mistakeHere?.severity ?? null,
              arrows: boardArrows,
              maxWidth: 500
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { marginTop: 8, justifyContent: "center", flexWrap: "wrap" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: () => setCurrentPly(0), children: "⏮" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: () => setCurrentPly(Math.max(0, currentPly - 1)), children: "◀" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "small",
              title: "Previous critical moment",
              disabled: !mistakes.some((m) => m.ply < currentPly),
              onClick: () => jumpToMistake(-1),
              children: "⏴!"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "muted", style: { minWidth: 90, textAlign: "center" }, children: [
            "Move ",
            currentPly,
            "/",
            moves.length
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "small",
              title: "Next critical moment",
              disabled: !mistakes.some((m) => m.ply > currentPly),
              onClick: () => jumpToMistake(1),
              children: "!⏵"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: () => setCurrentPly(Math.min(moves.length, currentPly + 1)), children: "▶" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: () => setCurrentPly(moves.length), children: "⏭" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `small ${autoplay ? "primary" : ""}`, onClick: () => setAutoplay((a) => !a), children: autoplay ? "⏸ Pause" : "▶ Autoplay" })
        ] }),
        analyses.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 8 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(EvalGraph, { analyses, mistakes, currentPly, onSelect: setCurrentPly }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", style: { flex: 1, minWidth: 260 }, children: [
        upcomingMistake && !revealed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Critical moment ahead" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            upcomingMistake.severity === "blunder" ? "This was the critical mistake in your game." : "You went wrong on the next move.",
            " ",
            "Before revealing: find your candidate moves. What is forcing? What changed after the last move?"
          ] }),
          tryFeedback && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `callout ${tryFeedback.startsWith("✓") ? "success" : "warn"}`, style: { marginBottom: 8 }, children: tryFeedback }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { flexWrap: "wrap" }, children: [
            !tryMode && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "primary", onClick: () => setTryMode(true), children: "Try it on the board" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setRevealed(true), children: "Compare with what happened" })
          ] })
        ] }),
        mistakeHere && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge ${mistakeHere.severity === "inaccuracy" ? "blue" : mistakeHere.severity === "mistake" ? "yellow" : "red"}`, children: SEVERITY_LABEL[mistakeHere.severity] }),
            " ",
            "Move ",
            Math.ceil(mistakeHere.ply / 2)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: mistakeHere.humanSummary }),
          mistakeHere.whyBad && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "muted", children: mistakeHere.whyBad }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted", style: { marginBottom: 8 }, children: [
            "Better: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "mono", children: mistakeHere.betterMoveSan ?? mistakeHere.betterMoveUci }),
            mistakeHere.evalLossCp != null && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              " · cost ≈ ",
              (mistakeHere.evalLossCp / 100).toFixed(1),
              " pawns"
            ] }),
            " · ",
            "confidence: ",
            mistakeHere.confidence
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { flexWrap: "wrap" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small primary", onClick: () => void createExercise(mistakeHere), children: "Create exercise" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: () => setCurrentPly(mistakeHere.ply - 1), children: "Go to position before" })
          ] })
        ] }),
        (revealed || mistakeHere || !upcomingMistake) && bestHere && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "What the engine saw" }),
          positionAnalysis.multiPv.slice(0, 3).map((pv) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted", style: { marginBottom: 4 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "mono", children: pv.moveSan ?? pv.moveUci }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mono", children: pv.score.type === "mate" ? `#${pv.score.value}` : (pv.score.value / 100).toFixed(2) }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 11 }, children: (pv.pvSan ?? pv.pvUci).slice(0, 6).join(" ") })
          ] }, pv.rank)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted", style: { fontSize: 11 }, children: [
            "depth ",
            positionAnalysis.depth ?? "?",
            " · engine is a verifier, not the teacher"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Turn this into training" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", style: { flexWrap: "wrap" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "small",
              disabled: currentPly === 0,
              onClick: () => void addLineToRepertoire(Math.min(currentPly, 20)),
              children: "Add opening line to repertoire"
            }
          ) })
        ] }),
        mistakes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { maxHeight: 240, overflowY: "auto" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
            "Critical moments (",
            mistakes.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col", style: { gap: 6 }, children: mistakes.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "row",
              style: { justifyContent: "space-between", cursor: "pointer" },
              onClick: () => setCurrentPly(m.ply),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Move ",
                  Math.ceil(m.ply / 2),
                  " ·",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge ${m.severity === "inaccuracy" ? "blue" : m.severity === "mistake" ? "yellow" : "red"}`, children: SEVERITY_LABEL[m.severity] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "muted mono", children: m.betterMoveSan })
              ]
            },
            m.id
          )) })
        ] })
      ] })
    ] })
  ] });
}
const OPENINGS = [
  {
    id: "italian-game",
    name: "Italian Game",
    eco: "C50",
    side: "white",
    summary: "Classical development: bishop to its most natural attacking square. Solid plans, open positions.",
    lines: [
      {
        name: "Giuoco Piano (main line)",
        san: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "c3", "Nf6", "d3", "d6", "O-O", "O-O"],
        note: "The quiet build-up: c3 prepares d4, castle early and expand slowly."
      },
      {
        name: "Giuoco Piano, center push",
        san: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "c3", "Nf6", "d4", "exd4", "cxd4", "Bb4+", "Bd2", "Bxd2+", "Nbxd2", "d5"],
        note: "The sharp central break — know the ...Bb4+ resource."
      },
      {
        name: "Two Knights Defense",
        san: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6", "d3", "Be7", "O-O", "O-O"],
        note: "Against 3...Nf6, the modern d3 keeps a stable center."
      }
    ]
  },
  {
    id: "ruy-lopez",
    name: "Ruy Lopez (Spanish)",
    eco: "C60",
    side: "white",
    summary: "The most principled fight for the center: pressure on c6 undermines e5.",
    lines: [
      {
        name: "Morphy Defense (main line)",
        san: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7", "Re1", "b5", "Bb3", "d6", "c3", "O-O"],
        note: "The tabiya of classical chess — both sides complete development before the fight starts."
      },
      {
        name: "Berlin Defense",
        san: ["e4", "e5", "Nf3", "Nc6", "Bb5", "Nf6", "O-O", "Nxe4", "d4", "Nd6", "Bxc6", "dxc6", "dxe5", "Nf5"],
        note: "Solid equalizing try for Black; the famous endgame structure."
      },
      {
        name: "Exchange Variation",
        san: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Bxc6", "dxc6", "O-O", "f6", "d4", "exd4", "Nxd4"],
        note: "White plays for the superior pawn structure in the endgame."
      }
    ]
  },
  {
    id: "scotch-game",
    name: "Scotch Game",
    eco: "C45",
    side: "white",
    summary: "Open the center immediately with d4. Direct piece play, fewer theory-heavy branches.",
    lines: [
      {
        name: "Main line",
        san: ["e4", "e5", "Nf3", "Nc6", "d4", "exd4", "Nxd4", "Nf6", "Nxc6", "bxc6", "e5", "Qe7", "Qe2", "Nd5", "c4"],
        note: "The Mieses variation — sharp play against the d5-knight."
      },
      {
        name: "Classical ...Bc5",
        san: ["e4", "e5", "Nf3", "Nc6", "d4", "exd4", "Nxd4", "Bc5", "Be3", "Qf6", "c3", "Nge7"],
        note: "Black targets d4; Be3 and c3 keep the knight anchored."
      }
    ]
  },
  {
    id: "sicilian-defense",
    name: "Sicilian Defense",
    eco: "B20",
    side: "black",
    summary: "The fighting reply to 1.e4: trade a wing pawn for the center and play for the win.",
    lines: [
      {
        name: "Najdorf Variation",
        san: ["e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4", "Nf6", "Nc3", "a6", "Be2", "e5", "Nb3", "Be7"],
        note: "...a6 keeps every option open; ...e5 grabs central space."
      },
      {
        name: "Dragon Variation",
        san: ["e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4", "Nf6", "Nc3", "g6", "Be3", "Bg7", "f3", "O-O"],
        note: "The long-diagonal bishop is the soul of the Dragon."
      },
      {
        name: "Classical Variation",
        san: ["e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4", "Nf6", "Nc3", "Nc6", "Be2", "e5", "Nb3", "Be7"],
        note: "Natural development first — a good first Sicilian."
      }
    ]
  },
  {
    id: "french-defense",
    name: "French Defense",
    eco: "C00",
    side: "black",
    summary: "Solid pawn chain, counterattack with ...c5 and ...f6. Accepts a cramped light-squared bishop.",
    lines: [
      {
        name: "Advance Variation",
        san: ["e4", "e6", "d4", "d5", "e5", "c5", "c3", "Nc6", "Nf3", "Qb6", "Be2", "cxd4", "cxd4", "Nh6"],
        note: "Attack the base of the chain: c5 and Qb6 hit d4/b2."
      },
      {
        name: "Winawer Variation",
        san: ["e4", "e6", "d4", "d5", "Nc3", "Bb4", "e5", "c5", "a3", "Bxc3+", "bxc3", "Ne7"],
        note: "Structural imbalance: Black gives the bishop pair for damaged white pawns."
      },
      {
        name: "Exchange Variation",
        san: ["e4", "e6", "d4", "d5", "exd5", "exd5", "Nf3", "Nf6", "Bd3", "Bd6", "O-O", "O-O"],
        note: "Symmetrical but not dead — develop actively and fight for e-file control."
      }
    ]
  },
  {
    id: "caro-kann",
    name: "Caro-Kann Defense",
    eco: "B10",
    side: "black",
    summary: "The solid ...d5 defense without locking in the c8-bishop. Great pawn structures.",
    lines: [
      {
        name: "Classical Variation",
        san: ["e4", "c6", "d4", "d5", "Nc3", "dxe4", "Nxe4", "Bf5", "Ng3", "Bg6", "h4", "h6", "Nf3", "Nd7"],
        note: "The bishop gets out before ...e6. Mind the h4-h5 space grab."
      },
      {
        name: "Advance Variation",
        san: ["e4", "c6", "d4", "d5", "e5", "Bf5", "Nf3", "e6", "Be2", "Nd7", "O-O", "Ne7"],
        note: "Same good bishop, French-like structure without the bad bishop."
      }
    ]
  },
  {
    id: "scandinavian",
    name: "Scandinavian Defense",
    eco: "B01",
    side: "black",
    summary: "Challenge e4 on move one. Easy to learn, clear plans — ideal first defense.",
    lines: [
      {
        name: "Main line ...Qa5",
        san: ["e4", "d5", "exd5", "Qxd5", "Nc3", "Qa5", "d4", "Nf6", "Nf3", "c6", "Bc4", "Bf5", "Bd2", "e6"],
        note: "The queen sits safely on a5; ...c6 gives her a retreat."
      },
      {
        name: "Modern ...Qd6",
        san: ["e4", "d5", "exd5", "Qxd5", "Nc3", "Qd6", "d4", "Nf6", "Nf3", "a6", "Be2", "Nc6"],
        note: "Flexible queen placement, often with ...g6 setups."
      }
    ]
  },
  {
    id: "queens-gambit",
    name: "Queen's Gambit",
    eco: "D30",
    side: "white",
    summary: "Offer the c-pawn to deflect Black from the center. The backbone of 1.d4 play.",
    lines: [
      {
        name: "QGD Orthodox",
        san: ["d4", "d5", "c4", "e6", "Nc3", "Nf6", "Bg5", "Be7", "e3", "O-O", "Nf3", "h6", "Bh4", "b6"],
        note: "Declined: Black keeps the center and unwinds slowly."
      },
      {
        name: "QGD Exchange",
        san: ["d4", "d5", "c4", "e6", "Nc3", "Nf6", "cxd5", "exd5", "Bg5", "c6", "e3", "Bf5"],
        note: "The minority-attack structure — b4-b5 comes later."
      },
      {
        name: "Queen’s Gambit Accepted",
        san: ["d4", "d5", "c4", "dxc4", "Nf3", "Nf6", "e3", "e6", "Bxc4", "c5", "O-O", "a6"],
        note: "Black returns the pawn for quick development and ...c5."
      }
    ]
  },
  {
    id: "slav-defense",
    name: "Slav Defense",
    eco: "D10",
    side: "black",
    summary: "Defend d5 with ...c6 and keep the c8-bishop free. Rock-solid against the Queen’s Gambit.",
    lines: [
      {
        name: "Main line",
        san: ["d4", "d5", "c4", "c6", "Nf3", "Nf6", "Nc3", "dxc4", "a4", "Bf5", "e3", "e6", "Bxc4", "Bb4"],
        note: "Take on c4 only after Nc3, then develop the bishop before ...e6."
      },
      {
        name: "Semi-Slav",
        san: ["d4", "d5", "c4", "c6", "Nf3", "Nf6", "Nc3", "e6", "e3", "Nbd7", "Bd3", "dxc4", "Bxc4", "b5"],
        note: "The Meran structure: ...dxc4 and ...b5 gain time on the bishop."
      }
    ]
  },
  {
    id: "london-system",
    name: "London System",
    eco: "D02",
    side: "white",
    summary: "A system, not a theory battle: Bf4, e3, c3 pyramid against almost anything.",
    lines: [
      {
        name: "Main setup vs ...d5",
        san: ["d4", "d5", "Bf4", "Nf6", "e3", "c5", "c3", "Nc6", "Nd2", "e6", "Ngf3", "Bd6", "Bg3", "O-O", "Bd3"],
        note: "The full pyramid; recapture on g3 keeps the structure intact."
      },
      {
        name: "vs King’s Indian setups",
        san: ["d4", "Nf6", "Bf4", "g6", "e3", "Bg7", "Nf3", "O-O", "Be2", "d6", "h3", "Nbd7", "O-O"],
        note: "Keep the dark-squared bishop safe with h3 before Black plays ...Nh5."
      }
    ]
  },
  {
    id: "kings-indian",
    name: "King's Indian Defense",
    eco: "E60",
    side: "black",
    summary: "Concede the center, then strike back with ...e5 or ...c5 and attack the king.",
    lines: [
      {
        name: "Classical main line",
        san: ["d4", "Nf6", "c4", "g6", "Nc3", "Bg7", "e4", "d6", "Nf3", "O-O", "Be2", "e5", "O-O", "Nc6", "d5", "Ne7"],
        note: "The famous race: Black attacks on the kingside, White on the queenside."
      },
      {
        name: "Fianchetto Variation",
        san: ["d4", "Nf6", "c4", "g6", "Nf3", "Bg7", "g3", "O-O", "Bg2", "d6", "O-O", "Nbd7", "Nc3", "e5"],
        note: "White’s calm setup — Black equalizes with the standard ...e5 break."
      }
    ]
  },
  {
    id: "nimzo-indian",
    name: "Nimzo-Indian Defense",
    eco: "E20",
    side: "black",
    summary: "Pin the knight, fight for e4, and play against doubled c-pawns. Strategically rich.",
    lines: [
      {
        name: "Rubinstein (4.e3)",
        san: ["d4", "Nf6", "c4", "e6", "Nc3", "Bb4", "e3", "O-O", "Bd3", "d5", "Nf3", "c5", "O-O", "Nc6"],
        note: "Both sides develop naturally; the central tension resolves later."
      },
      {
        name: "Classical (4.Qc2)",
        san: ["d4", "Nf6", "c4", "e6", "Nc3", "Bb4", "Qc2", "O-O", "a3", "Bxc3+", "Qxc3", "b6", "Bg5", "Bb7"],
        note: "White avoids doubled pawns at the cost of time; ...b6 and ...Bb7 hit e4."
      }
    ]
  },
  {
    id: "english-opening",
    name: "English Opening",
    eco: "A10",
    side: "white",
    summary: "Flank control of d5. Flexible move orders that can transpose almost anywhere.",
    lines: [
      {
        name: "Four Knights",
        san: ["c4", "e5", "Nc3", "Nf6", "Nf3", "Nc6", "g3", "d5", "cxd5", "Nxd5", "Bg2", "Nb6", "O-O", "Be7"],
        note: "A reversed Sicilian with an extra tempo — pressure on the long diagonal."
      },
      {
        name: "Symmetrical",
        san: ["c4", "c5", "Nc3", "Nc6", "g3", "g6", "Bg2", "Bg7", "Nf3", "Nf6", "O-O", "O-O", "d4", "cxd4", "Nxd4"],
        note: "The main tabiya of the Symmetrical English."
      }
    ]
  }
];
const PRIORITIES = ["must-know", "normal", "optional", "avoid", "experimental"];
function moveNumberOf(node2) {
  const parts = node2.fenBefore.split(" ");
  return parseInt(parts[5] ?? "1") || 1;
}
function fenAfterMove(fenBefore, uci) {
  const chess = new Chess(fenBefore);
  chess.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci.slice(4) || void 0 });
  return chess.fen();
}
function orderByLine(due, byId) {
  const meta = (n) => {
    let cur = n;
    let depth = 0;
    while (cur.parentId && byId.has(cur.parentId)) {
      cur = byId.get(cur.parentId);
      depth++;
    }
    return { root: cur.id, depth };
  };
  return [...due].sort((a, b) => {
    const ma = meta(a);
    const mb = meta(b);
    return ma.root.localeCompare(mb.root) || ma.depth - mb.depth;
  });
}
function Practice({ due, onDone }) {
  const [allNodes, setAllNodes] = reactExports.useState([]);
  const [idx, setIdx] = reactExports.useState(0);
  const [wrongTries, setWrongTries] = reactExports.useState(0);
  const [showHint, setShowHint] = reactExports.useState(false);
  const [feedback, setFeedback] = reactExports.useState(null);
  const [resultFen, setResultFen] = reactExports.useState(null);
  reactExports.useEffect(() => {
    void api.repertoire.list().then(setAllNodes);
  }, []);
  const byId = reactExports.useMemo(() => new Map(allNodes.map((n) => [n.id, n])), [allNodes]);
  const ordered = reactExports.useMemo(() => orderByLine(due, byId), [due, byId]);
  const node2 = ordered[idx];
  const opponentNode = reactExports.useMemo(() => {
    if (!node2?.parentId) return null;
    const parent = byId.get(node2.parentId);
    if (!parent) return null;
    const parentMover = parent.fenBefore.split(" ")[1];
    const userMover = node2.color === "white" ? "w" : "b";
    return parentMover !== userMover ? parent : null;
  }, [node2, byId]);
  if (!node2) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { textAlign: "center", padding: 30 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "All due lines reviewed. Nice work — recall scheduling updated." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "primary", onClick: onDone, children: "Back to repertoire" })
    ] });
  }
  const advance = () => {
    setIdx(idx + 1);
    setWrongTries(0);
    setShowHint(false);
    setFeedback(null);
    setResultFen(null);
  };
  function handleMove(uci, san) {
    if (uci === node2.moveUci) {
      void api.repertoire.attempt(node2.id, wrongTries === 0 && !showHint);
      setResultFen(fenAfterMove(node2.fenBefore, uci));
      setFeedback(`✓ ${san} is your repertoire move.${node2.comment ? " " + node2.comment : ""}`);
    } else {
      setWrongTries(wrongTries + 1);
      setFeedback(`${san} is not the line you chose to play here. ${wrongTries === 0 ? "Try once more." : ""}`);
      if (wrongTries >= 1) setShowHint(true);
    }
  }
  function reveal() {
    void api.repertoire.attempt(node2.id, false);
    setResultFen(fenAfterMove(node2.fenBefore, node2.moveUci));
    setFeedback(`The repertoire move is ${node2.moveSan}.`);
  }
  reactExports.useEffect(() => {
    if (!resultFen) return;
    const handler = (e) => {
      if (e.key === "Enter" || e.key === " ") advance();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [resultFen]);
  const lastMove = resultFen ? { from: node2.moveUci.slice(0, 2), to: node2.moveUci.slice(2, 4) } : opponentNode ? { from: opponentNode.moveUci.slice(0, 2), to: opponentNode.moveUci.slice(2, 4) } : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { alignItems: "flex-start", gap: 18 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: "0 1 480px", minWidth: 300 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Board,
      {
        fen: resultFen ?? node2.fenBefore,
        orientation: node2.color,
        interactive: !resultFen,
        onMove: handleMove,
        lastMove,
        arrows: showHint && !resultFen ? [{ from: node2.moveUci.slice(0, 2), to: node2.moveUci.slice(2, 4) }] : [],
        maxWidth: 480
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", style: { flex: 1 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted", children: [
        "Line ",
        idx + 1,
        " of ",
        ordered.length,
        " · playing as ",
        node2.color
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: opponentNode ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        "Opponent played ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "mono", children: opponentNode.moveSan }),
        " — play your repertoire move."
      ] }) : "Play your repertoire move in this position." }),
      feedback && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `callout ${feedback.startsWith("✓") ? "success" : "warn"}`, children: feedback }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        !showHint && !resultFen && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: () => setShowHint(true), children: "Hint" }),
        !resultFen && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: reveal, children: "Show move" }),
        resultFen && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small primary", onClick: advance, children: "Next →" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: onDone, children: "Stop practice" })
      ] })
    ] })
  ] });
}
function LineViewer({ opening, line }) {
  const [idx, setIdx] = reactExports.useState(0);
  const [notice, setNotice] = reactExports.useState(null);
  reactExports.useEffect(() => {
    setIdx(0);
    setNotice(null);
  }, [opening.id, line.name]);
  const { fen, lastMove } = reactExports.useMemo(() => {
    const chess = new Chess();
    let last = null;
    for (let i = 0; i < idx && i < line.san.length; i++) {
      const mv = chess.move(line.san[i]);
      last = { from: mv.from, to: mv.to };
    }
    return { fen: chess.fen(), lastMove: last };
  }, [line, idx]);
  const moveText = reactExports.useMemo(() => {
    const parts = [];
    line.san.forEach((san, i) => {
      if (i % 2 === 0) parts.push({ text: `${i / 2 + 1}.`, ply: null });
      parts.push({ text: san, ply: i + 1 });
    });
    return parts;
  }, [line]);
  async function addToRepertoire(color) {
    try {
      const nodes = await api.repertoire.addOpeningLine({
        color,
        sanMoves: line.san,
        openingName: opening.name,
        lineName: line.name,
        comment: line.note
      });
      setNotice(`Added ${nodes.length} of your moves to the ${color} repertoire — they are due for practice today.`);
    } catch (e) {
      setNotice(e.message);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { alignItems: "flex-start", gap: 18 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: "0 1 440px", minWidth: 300 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Board, { fen, lastMove, maxWidth: 440 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { marginTop: 8, justifyContent: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: () => setIdx(0), children: "⏮" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: () => setIdx(Math.max(0, idx - 1)), children: "◀" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "muted", style: { minWidth: 60, textAlign: "center" }, children: [
          idx,
          "/",
          line.san.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: () => setIdx(Math.min(line.san.length, idx + 1)), children: "▶" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: () => setIdx(line.san.length), children: "⏭" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", style: { flex: 1, minWidth: 240 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { margin: 0 }, children: [
        opening.name,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "muted", children: [
          "· ",
          line.name
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "move-list", children: moveText.map(
        (t, i) => t.ply === null ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "num", children: t.text }, i) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `mv ${t.ply === idx ? "current" : ""}`, onClick: () => setIdx(t.ply), children: t.text }, i)
      ) }),
      line.note && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "callout", children: line.note }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `small ${opening.side === "white" ? "primary" : ""}`,
            onClick: () => void addToRepertoire("white"),
            children: "Add to White repertoire"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `small ${opening.side === "black" ? "primary" : ""}`,
            onClick: () => void addToRepertoire("black"),
            children: "Add to Black repertoire"
          }
        )
      ] }),
      notice && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "callout success", children: notice })
    ] })
  ] });
}
function Library() {
  const [openingId, setOpeningId] = reactExports.useState(OPENINGS[0].id);
  const [lineIdx, setLineIdx] = reactExports.useState(0);
  const opening = OPENINGS.find((o) => o.id === openingId) ?? OPENINGS[0];
  const line = opening.lines[Math.min(lineIdx, opening.lines.length - 1)];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { alignItems: "flex-start", gap: 16 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", style: { width: 250, flexShrink: 0, maxHeight: 620, overflowY: "auto", padding: 10 }, children: OPENINGS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `nav-item ${o.id === openingId ? "active" : ""}`,
          onClick: () => {
            setOpeningId(o.id);
            setLineIdx(0);
          },
          title: o.summary,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { flex: 1 }, children: o.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "muted mono", style: { fontSize: 10.5 }, children: o.eco })
          ]
        }
      ),
      o.id === openingId && o.lines.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `nav-item ${i === lineIdx ? "active" : ""}`,
          style: { paddingLeft: 24, fontSize: 12.5 },
          onClick: () => setLineIdx(i),
          children: l.name
        },
        l.name
      ))
    ] }, o.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "muted", style: { marginTop: 0 }, children: opening.summary }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LineViewer, { opening, line })
    ] })
  ] });
}
function Openings() {
  const [tab, setTab] = reactExports.useState("repertoire");
  const [color, setColor] = reactExports.useState("white");
  const [nodes, setNodes] = reactExports.useState([]);
  const [selected, setSelected] = reactExports.useState(null);
  const [practice, setPractice] = reactExports.useState(null);
  const refresh = reactExports.useCallback(() => {
    void api.repertoire.list(color).then(setNodes);
  }, [color]);
  reactExports.useEffect(refresh, [refresh]);
  useAppEvent(["repertoire:changed"], refresh);
  const dueCount = reactExports.useMemo(
    () => nodes.filter(
      (n) => n.dueAt && n.dueAt <= (/* @__PURE__ */ new Date()).toISOString() && n.fenBefore.split(" ")[1] === (n.color === "white" ? "w" : "b")
    ).length,
    [nodes]
  );
  const groups = reactExports.useMemo(() => {
    const nowIso = (/* @__PURE__ */ new Date()).toISOString();
    const map = /* @__PURE__ */ new Map();
    for (const n of nodes) {
      const openingName = n.openingName ?? "Other lines";
      const key = `${openingName}|||${n.lineName ?? ""}`;
      if (!map.has(key)) map.set(key, { key, openingName, lineName: n.lineName, nodes: [], dueCount: 0 });
      const g = map.get(key);
      g.nodes.push(n);
      if (n.dueAt && n.dueAt <= nowIso && n.fenBefore.split(" ")[1] === (n.color === "white" ? "w" : "b")) {
        g.dueCount++;
      }
    }
    for (const g of map.values()) {
      g.nodes.sort((a, b) => moveNumberOf(a) - moveNumberOf(b) || a.fenBefore.localeCompare(b.fenBefore));
    }
    return [...map.values()].sort(
      (a, b) => a.openingName.localeCompare(b.openingName) || (a.lineName ?? "").localeCompare(b.lineName ?? "")
    );
  }, [nodes]);
  async function startPractice() {
    const due = await api.repertoire.due();
    setPractice(due.filter((n) => n.color === color));
  }
  async function practiceGroup(g) {
    const due = await api.repertoire.due();
    const ids = new Set(g.nodes.map((n) => n.id));
    setPractice(due.filter((n) => n.color === color && ids.has(n.id)));
  }
  const previewFenAfter = reactExports.useMemo(() => {
    if (!selected) return null;
    try {
      const chess = new Chess(selected.fenBefore);
      chess.move({
        from: selected.moveUci.slice(0, 2),
        to: selected.moveUci.slice(2, 4),
        promotion: selected.moveUci.slice(4) || void 0
      });
      return chess.fen();
    } catch {
      return selected.fenBefore;
    }
  }, [selected]);
  if (practice) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Opening practice" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "subtitle", children: "Repertoire recall — the app shows a position, you play your prepared move." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Practice,
        {
          due: practice,
          onDone: () => {
            setPractice(null);
            refresh();
          }
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Openings" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "subtitle", children: "Your repertoire, built from your own games, reviews, and the openings library. Lines are scheduled with spaced repetition." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: tab === "repertoire" ? "active" : "", onClick: () => setTab("repertoire"), children: "My repertoire" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: tab === "library" ? "active" : "", onClick: () => setTab("library"), children: "Openings library" })
    ] }),
    tab === "library" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Library, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { marginBottom: 14 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tabs", style: { marginBottom: 0, borderBottom: "none" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: color === "white" ? "active" : "", onClick: () => setColor("white"), children: "As White" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: color === "black" ? "active" : "", onClick: () => setColor("black"), children: "As Black" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spacer", style: { flex: 1 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "primary", disabled: dueCount === 0, onClick: () => void startPractice(), children: [
          "Practice due lines (",
          dueCount,
          ")"
        ] })
      ] }),
      groups.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { textAlign: "center", padding: 36 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "No repertoire lines yet for ",
          color,
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "muted", children: "Open a game review and click “Add opening line to repertoire”, or analyze games to find where you leave book." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { alignItems: "flex-start" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1, minWidth: 0 }, children: groups.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { marginBottom: 14 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { justifyContent: "space-between", marginBottom: 8 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { margin: 0 }, children: [
              g.openingName,
              g.lineName && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "muted", children: [
                " — ",
                g.lineName
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "small primary", disabled: g.dueCount === 0, onClick: () => void practiceGroup(g), children: [
              "Practice this line (",
              g.dueCount,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Move" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Your move" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Priority" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Due" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", {})
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: g.nodes.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: `clickable ${selected?.id === n.id ? "selected" : ""}`,
                onClick: () => setSelected(n),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "muted", children: [
                    moveNumberOf(n),
                    "."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "mono", children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: n.moveSan }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge ${n.status === "known" ? "green" : n.status === "lapsed" ? "red" : "blue"}`, children: n.status }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "select",
                    {
                      value: n.priority,
                      onClick: (e) => e.stopPropagation(),
                      onChange: (e) => void api.repertoire.setPriority(n.id, e.target.value),
                      children: PRIORITIES.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p, children: p }, p))
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "muted", children: n.dueAt ? n.dueAt.slice(0, 10) : "—" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      className: "small danger",
                      title: "Delete this move and everything after it in the line",
                      onClick: (e) => {
                        e.stopPropagation();
                        if (!window.confirm(`Remove ${n.moveSan} from your ${color} repertoire? Moves that follow it in this line are removed too.`)) return;
                        void api.repertoire.delete(n.id);
                      },
                      children: "✕"
                    }
                  ) })
                ]
              },
              n.id
            )) })
          ] })
        ] }, g.key)) }),
        selected && previewFenAfter && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { width: 300, flexShrink: 0, position: "sticky", top: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
            "After ",
            selected.moveSan
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Board,
            {
              fen: previewFenAfter,
              orientation: color,
              maxWidth: 268,
              showCoordinates: false,
              evalTarget: false,
              allowFlip: false
            }
          ),
          selected.comment && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "muted", children: selected.comment })
        ] })
      ] })
    ] })
  ] });
}
function Lessons() {
  const navigate = useStore((s) => s.navigate);
  const [lessons, setLessons] = reactExports.useState([]);
  const [courses, setCourses] = reactExports.useState([]);
  const [progress, setProgress] = reactExports.useState(/* @__PURE__ */ new Map());
  const refresh = reactExports.useCallback(() => {
    void api.lessons.list().then(setLessons);
    void api.courses.list().then(setCourses);
    void api.lessons.allProgress().then((all) => setProgress(new Map(all.map((p) => [p.lessonId, p]))));
  }, []);
  reactExports.useEffect(refresh, [refresh]);
  useAppEvent(["lessons:changed"], refresh);
  const lessonsById = new Map(lessons.map((l) => [l.id, l]));
  function statusBadge(lessonId) {
    const p = progress.get(lessonId);
    if (!p || p.status === "not-started") return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge", children: "new" });
    if (p.status === "completed") return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge green", children: "completed" });
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge blue", children: "in progress" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Lessons" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "subtitle", children: "Structured courses and lessons. Every lesson leads to moves on a board." }),
    courses.map((course) => {
      const cj = course.courseJson;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: cj.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "muted", children: cj.summary }),
        cj.modules.map((mod) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: mod.title }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "muted", children: [
            "— ",
            mod.summary
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col", style: { gap: 4, marginTop: 6 }, children: mod.lessonRefs.map((ref) => {
            const lesson = lessonsById.get(ref);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { justifyContent: "space-between" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: lesson ? "" : "muted", children: lesson ? lesson.title : `${ref} (not yet in library)` }),
              lesson ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "row", style: { gap: 8 }, children: [
                statusBadge(lesson.id),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small primary", onClick: () => navigate({ name: "lesson", lessonId: lesson.id }), children: "Study" })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge", children: "planned" })
            ] }, ref);
          }) })
        ] }, mod.id))
      ] }, course.id);
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Lesson library" }),
      lessons.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "muted", children: "No lessons yet. Generate one in AI Studio or import lesson JSON." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Rating band" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Minutes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Created by" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", {})
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: lessons.map((l) => {
          const lj = l.lessonJson;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: l.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "muted", children: [
              l.targetRatingMin,
              "–",
              l.targetRatingMax
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "muted", children: lj.estimatedMinutes }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "muted", children: l.createdBy }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: statusBadge(l.id) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small primary", onClick: () => navigate({ name: "lesson", lessonId: l.id }), children: "Study" }) })
          ] }, l.id);
        }) })
      ] })
    ] })
  ] });
}
function PuzzleBoard({
  fen,
  solution,
  prompt,
  hints = [],
  explanation,
  onComplete,
  maxWidth = 480
}) {
  const [position, setPosition] = reactExports.useState(fen);
  const [solutionIdx, setSolutionIdx] = reactExports.useState(0);
  const [status, setStatus] = reactExports.useState("solving");
  const [failedOnce, setFailedOnce] = reactExports.useState(false);
  const [hintsShown, setHintsShown] = reactExports.useState(0);
  const [lastMove, setLastMove] = reactExports.useState(null);
  const completedRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    setPosition(fen);
    setSolutionIdx(0);
    setStatus("solving");
    setFailedOnce(false);
    setHintsShown(0);
    setLastMove(null);
    completedRef.current = false;
  }, [fen, solution]);
  const orientation = reactExports.useMemo(() => {
    try {
      return new Chess(fen).turn() === "w" ? "white" : "black";
    } catch {
      return "white";
    }
  }, [fen]);
  function applyMove(pos, uci) {
    const chess = new Chess(pos);
    chess.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci.slice(4) || void 0 });
    setLastMove({ from: uci.slice(0, 2), to: uci.slice(2, 4) });
    return chess.fen();
  }
  function finish() {
    setStatus("solved");
    if (!completedRef.current) {
      completedRef.current = true;
      onComplete?.(!failedOnce && hintsShown === 0);
    }
  }
  function handleMove(uci) {
    if (status === "solved") return;
    const expected = solution[solutionIdx]?.moveUci;
    if (!expected) return;
    if (uci === expected) {
      let next = applyMove(position, uci);
      let idx = solutionIdx + 1;
      playSound("move");
      if (idx < solution.length) {
        const reply = solution[idx].moveUci;
        try {
          next = applyMove(next, reply);
          idx++;
        } catch {
          idx = solution.length;
        }
      }
      setPosition(next);
      setSolutionIdx(idx);
      setStatus("solving");
      if (idx >= solution.length) finish();
    } else {
      setFailedOnce(true);
      setStatus("wrong");
      playSound("wrong");
    }
  }
  function showSolution() {
    setFailedOnce(true);
    let pos = position;
    for (let i = solutionIdx; i < solution.length; i++) {
      try {
        pos = applyMove(pos, solution[i].moveUci);
      } catch {
        break;
      }
    }
    setPosition(pos);
    setSolutionIdx(solution.length);
    finish();
  }
  const sideLabel = orientation === "white" ? "White" : "Black";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { alignItems: "flex-start", gap: 18 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: `0 1 ${maxWidth}px`, minWidth: 300 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Board,
      {
        fen: position,
        orientation,
        interactive: status !== "solved",
        lastMove,
        onMove: handleMove,
        maxWidth
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", style: { flex: 1, minWidth: 220 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: prompt ?? `${sideLabel} to move. Find the best continuation.` }),
      status === "wrong" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "callout warn", children: [
        "Not this one — that move loses the thread. Take another look at forcing moves.",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { marginTop: 6 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: () => setStatus("solving"), children: "Try again" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: showSolution, children: "Show solution" })
        ] })
      ] }),
      status === "solving" && hintsShown < hints.length && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "small", style: { alignSelf: "flex-start" }, onClick: () => setHintsShown(hintsShown + 1), children: [
        "Hint (",
        hintsShown + 1,
        "/",
        hints.length,
        ")"
      ] }),
      hints.slice(0, hintsShown).map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "callout", children: h }, i)),
      status === "solved" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "callout success", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: failedOnce || hintsShown > 0 ? "Solved (with help)." : "Correct!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 4 }, children: [
          "Solution: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mono", children: solution.map((m) => m.moveSan ?? m.moveUci).join(" ") })
        ] }),
        explanation && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 6 }, children: explanation })
      ] })
    ] })
  ] });
}
function orientationOf(pos) {
  if (!pos.orientation || pos.orientation === "side-to-move") return pos.sideToMove;
  return pos.orientation;
}
function DemonstrationStep({ step, position }) {
  const [idx, setIdx] = reactExports.useState(0);
  const line = step.line ?? [];
  const { fen, lastMove, comment } = reactExports.useMemo(() => {
    const chess = new Chess(position.fen);
    let last = null;
    let cmt;
    for (let i = 0; i < idx && i < line.length; i++) {
      const uci = line[i].moveUci;
      try {
        chess.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci.slice(4) || void 0 });
        last = { from: uci.slice(0, 2), to: uci.slice(2, 4) };
        cmt = line[i].comment;
      } catch {
        break;
      }
    }
    return { fen: chess.fen(), lastMove: last, comment: cmt };
  }, [idx, line, position.fen]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { alignItems: "flex-start", gap: 18 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: "0 1 440px", minWidth: 300 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Board,
        {
          fen,
          orientation: orientationOf(position),
          lastMove,
          arrows: idx === 0 ? position.arrows : [],
          markedSquares: idx === 0 ? position.highlights?.map((h) => h.square) : [],
          maxWidth: 440
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { marginTop: 8, justifyContent: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: () => setIdx(0), children: "⏮" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: () => setIdx(Math.max(0, idx - 1)), children: "◀" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "muted", children: [
          idx,
          "/",
          line.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: () => setIdx(Math.min(line.length, idx + 1)), children: "▶" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", style: { flex: 1 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { whiteSpace: "pre-wrap" }, children: step.content }),
      line.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted mono", children: [
        "Line: ",
        line.map((m) => m.moveSan ?? m.moveUci).join(" ")
      ] }),
      comment && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "callout", children: comment })
    ] })
  ] });
}
function GuidedQuestionStep({ step }) {
  const [revealed, setRevealed] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { whiteSpace: "pre-wrap" }, children: step.content }),
    step.prompt && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "callout", children: step.prompt }),
    !revealed ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: { alignSelf: "flex-start" }, onClick: () => setRevealed(true), children: "Reveal answer" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "callout success", children: [
      step.expectedAnswer ?? step.solution?.explanation ?? "See the explanation in the next step.",
      step.feedback && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: 6 }, children: step.feedback })
    ] })
  ] });
}
function StepBody({
  step,
  position,
  onSolved
}) {
  switch (step.type) {
    case "move_input":
      if (position && step.solution) {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { whiteSpace: "pre-wrap" }, children: step.content }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PuzzleBoard,
            {
              fen: position.fen,
              solution: step.solution.moves,
              prompt: step.prompt,
              explanation: step.solution.explanation,
              onComplete: () => onSolved(),
              maxWidth: 440
            }
          )
        ] });
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: step.content });
    case "demonstration":
    case "model_game_segment":
      if (position) return /* @__PURE__ */ jsxRuntimeExports.jsx(DemonstrationStep, { step, position });
      return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { whiteSpace: "pre-wrap" }, children: step.content });
    case "guided_question":
    case "evaluation_choice":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(GuidedQuestionStep, { step });
    case "reflection":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { whiteSpace: "pre-wrap" }, children: step.content }),
        step.prompt && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "callout", children: step.prompt }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 4, placeholder: "Write your own rule or summary here…" })
      ] });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { alignItems: "flex-start", gap: 18 }, children: [
        position && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: "0 1 400px", minWidth: 280 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Board,
            {
              fen: position.fen,
              orientation: orientationOf(position),
              arrows: position.arrows,
              markedSquares: position.highlights?.map((h) => h.square),
              maxWidth: 400
            }
          ),
          position.highlights?.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted", style: { marginTop: 4 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "mono", children: h.square }),
            ": ",
            h.label
          ] }, h.square))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { whiteSpace: "pre-wrap" }, children: step.content }),
          step.prompt && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "callout", children: step.prompt })
        ] })
      ] });
  }
}
function LessonView({ lesson, completedStepIds = [], onStepComplete, onFinished }) {
  const [stepIdx, setStepIdx] = reactExports.useState(0);
  const [exerciseMode, setExerciseMode] = reactExports.useState(false);
  const [exerciseIdx, setExerciseIdx] = reactExports.useState(0);
  const positions = reactExports.useMemo(() => new Map(lesson.positions.map((p) => [p.id, p])), [lesson]);
  const steps = lesson.steps;
  const step = steps[stepIdx];
  const done = new Set(completedStepIds);
  function completeStep() {
    if (step && !done.has(step.id)) onStepComplete?.(step.id);
  }
  function next() {
    completeStep();
    if (stepIdx < steps.length - 1) setStepIdx(stepIdx + 1);
    else if (lesson.exercises.length > 0) setExerciseMode(true);
    else onFinished?.();
  }
  if (exerciseMode) {
    const ex = lesson.exercises[exerciseIdx];
    if (!ex) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Key takeaways" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: lesson.review.keyTakeaways.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Test yourself" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: lesson.review.selfTest.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "primary", onClick: () => onFinished?.(), children: "Finish lesson" })
      ] });
    }
    const pos = positions.get(ex.positionRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted", children: [
        "Exercise ",
        exerciseIdx + 1,
        " of ",
        lesson.exercises.length,
        " · ",
        ex.title,
        " · ",
        "★".repeat(ex.difficulty)
      ] }),
      pos ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        PuzzleBoard,
        {
          fen: pos.fen,
          solution: ex.solution.moves,
          prompt: ex.prompt,
          hints: ex.hints,
          explanation: ex.solution.remember ? `${ex.solution.explanation} Remember: ${ex.solution.remember}` : ex.solution.explanation,
          maxWidth: 440
        },
        ex.id
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "callout error", children: [
        "Missing position: ",
        ex.positionRef
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setExerciseIdx(exerciseIdx + 1), children: "Next →" }) })
    ] });
  }
  if (!step) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", children: "This lesson has no steps." });
  const position = step.positionRef ? positions.get(step.positionRef) ?? null : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { flexWrap: "wrap", gap: 4 }, children: [
      steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "small",
          style: {
            opacity: i === stepIdx ? 1 : 0.6,
            borderColor: done.has(s.id) ? "var(--accent)" : void 0
          },
          onClick: () => setStepIdx(i),
          title: s.title,
          children: i + 1
        },
        s.id
      )),
      lesson.exercises.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", style: { opacity: 0.6 }, onClick: () => setExerciseMode(true), children: "🧩 exercises" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted", style: { marginBottom: 4 }, children: [
        step.type.replace(/_/g, " "),
        " · step ",
        stepIdx + 1,
        " of ",
        steps.length
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { fontSize: 16 }, children: step.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StepBody, { step, position, onSolved: completeStep })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: stepIdx === 0, onClick: () => setStepIdx(stepIdx - 1), children: "← Back" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "primary", onClick: next, children: stepIdx < steps.length - 1 ? "Continue →" : lesson.exercises.length > 0 ? "Go to exercises →" : "Finish" })
    ] })
  ] });
}
function LessonPlayer({ lessonId }) {
  const navigate = useStore((s) => s.navigate);
  const [lesson, setLesson] = reactExports.useState(null);
  const [progress, setProgress] = reactExports.useState(null);
  reactExports.useEffect(() => {
    void api.lessons.get(lessonId).then(setLesson);
    void api.lessons.getProgress(lessonId).then(setProgress);
  }, [lessonId]);
  if (!lesson || !progress) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", children: "Loading lesson…" });
  const lj = lesson.lessonJson;
  function saveProgress(patch) {
    const next = { ...progress, ...patch };
    setProgress(next);
    void api.lessons.setProgress(next);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { justifyContent: "space-between" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: lj.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "subtitle", children: [
          lj.summary,
          " · ~",
          lj.estimatedMinutes,
          " min · rating ",
          lj.targetRating.min,
          "–",
          lj.targetRating.max
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({ name: "lessons" }), children: "← Lessons" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { marginBottom: 14 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Objectives" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { style: { margin: 0 }, children: lj.objectives.map((o, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: o }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      LessonView,
      {
        lesson: lj,
        completedStepIds: progress.completedStepIds,
        onStepComplete: (stepId) => {
          const ids = progress.completedStepIds.includes(stepId) ? progress.completedStepIds : [...progress.completedStepIds, stepId];
          saveProgress({
            completedStepIds: ids,
            status: "in-progress",
            lessonId
          });
        },
        onFinished: () => {
          saveProgress({ status: "completed", lessonId });
          navigate({ name: "lessons" });
        }
      }
    )
  ] });
}
function Exercises({ initialTag }) {
  const [all, setAll] = reactExports.useState([]);
  const [tagFilter, setTagFilter] = reactExports.useState(initialTag ?? null);
  const [session, setSession] = reactExports.useState(null);
  const [idx, setIdx] = reactExports.useState(0);
  const [solvedCount, setSolvedCount] = reactExports.useState(0);
  const [results, setResults] = reactExports.useState([]);
  const [attempted, setAttempted] = reactExports.useState(false);
  const refresh = reactExports.useCallback(() => {
    void api.exercises.list().then(setAll);
  }, []);
  reactExports.useEffect(refresh, [refresh]);
  useAppEvent(["exercises:changed"], refresh);
  const allTags = reactExports.useMemo(() => {
    const s = /* @__PURE__ */ new Set();
    for (const e of all) for (const t of e.tags) s.add(t);
    return [...s].sort();
  }, [all]);
  const filtered = reactExports.useMemo(() => tagFilter ? all.filter((e) => e.tags.includes(tagFilter)) : all, [all, tagFilter]);
  async function beginSession(items) {
    setSession(items);
    setIdx(0);
    setSolvedCount(0);
    setResults([]);
    setAttempted(false);
  }
  async function startSession() {
    const due = await api.exercises.due();
    const scoped = tagFilter ? due.filter((e) => e.tags.includes(tagFilter)) : due;
    await beginSession(scoped.slice(0, 10));
  }
  async function practiceAnyway() {
    const items = [...filtered].sort((a, b) => (a.dueAt ?? "").localeCompare(b.dueAt ?? "")).slice(0, 10);
    await beginSession(items);
  }
  function goToNext() {
    setIdx((i) => i + 1);
    setAttempted(false);
  }
  const sessionJustFinished = session !== null && idx >= session.length;
  reactExports.useEffect(() => {
    if (sessionJustFinished) playSound("complete");
  }, [sessionJustFinished]);
  if (session) {
    const current = session[idx];
    if (!current) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Exercises" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { textAlign: "center", padding: 36 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Session complete: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: solvedCount }),
            " of ",
            session.length,
            " solved on the first try."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", style: { justifyContent: "center", gap: 4, margin: "10px 0" }, children: results.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              title: r === "correct" ? "Solved first try" : "Missed or needed a hint",
              style: {
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: r === "correct" ? "var(--accent-strong)" : "var(--danger)"
              }
            },
            i
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "muted", children: "You solved positions you missed in real games. Scheduling updated." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "primary", onClick: () => setSession(null), children: "Done" })
        ] })
      ] });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Exercises" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "subtitle", children: [
        "Puzzle ",
        idx + 1,
        " of ",
        session.length,
        " · ",
        current.title
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", style: { gap: 4, marginBottom: 10 }, children: session.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          style: {
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: i < results.length ? results[i] === "correct" ? "var(--accent-strong)" : "var(--danger)" : i === idx ? "var(--info)" : "var(--border)"
          }
        },
        i
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PuzzleBoard,
        {
          fen: current.fen,
          solution: current.solution.moves,
          prompt: current.prompt,
          hints: current.hints,
          explanation: current.solution.explanation,
          onComplete: (firstTry) => {
            void api.exercises.attempt(current.id, firstTry);
            setAttempted(true);
            setResults((r) => [...r, firstTry ? "correct" : "missed"]);
            playSound(firstTry ? "correct" : "wrong");
            if (firstTry) setSolvedCount((c) => c + 1);
          }
        },
        current.id
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { marginTop: 14 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: !attempted, title: attempted ? void 0 : "Solve or reveal the solution first", onClick: goToNext, children: "Next puzzle →" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSession(null), children: "End session" })
      ] })
    ] });
  }
  const dueNow = filtered.filter((e) => e.dueAt && e.dueAt <= (/* @__PURE__ */ new Date()).toISOString());
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Exercises" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "subtitle", children: "Personalized puzzles generated from your own mistakes, scheduled by spaced repetition." }),
    allTags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { flexWrap: "wrap", marginBottom: 12, gap: 6 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "muted", children: "Focus:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `small ${tagFilter === null ? "primary" : ""}`, onClick: () => setTagFilter(null), children: "All" }),
      allTags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `small ${tagFilter === t ? "primary" : ""}`, onClick: () => setTagFilter(t), children: t.replace(/-/g, " ") }, t))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card", style: { marginBottom: 16 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { justifyContent: "space-between" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-big", children: dueNow.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted", children: [
          "due now",
          tagFilter ? ` · ${tagFilter.replace(/-/g, " ")}` : "",
          " · ",
          filtered.length,
          " total"
        ] })
      ] }),
      dueNow.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "primary", onClick: () => void startSession(), children: "Start session" }) : filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "primary", onClick: () => void practiceAnyway(), children: "Practice anyway" })
    ] }) }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { textAlign: "center", padding: 36 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "No exercises ",
        tagFilter ? `tagged “${tagFilter}”` : "yet",
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "muted", children: "Analyze your games — every classified mistake becomes a training position." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "data", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Tags" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Difficulty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Due" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", {})
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "clickable", onClick: () => void beginSession([e]), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: e.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "muted", children: e.type.replace(/_/g, " ") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: e.tags.slice(0, 3).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge", style: { marginRight: 4 }, children: t }, t)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "muted", children: "★".repeat(e.difficulty) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "muted", children: e.dueAt ? e.dueAt.slice(0, 10) : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: (ev) => {
          ev.stopPropagation();
          void beginSession([e]);
        }, children: "Solve" }) })
      ] }, e.id)) })
    ] })
  ] });
}
const RIGHTS_MODES = [
  { value: "user-owned", label: "I own this material" },
  { value: "licensed", label: "Licensed to me" },
  { value: "public-domain", label: "Public domain" },
  { value: "notes-only", label: "My own notes" },
  { value: "unknown", label: "Unknown / unsure" }
];
function ReportView({ report }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `badge ${report.schemaValid ? "green" : "red"}`, children: [
        "schema ",
        report.schemaValid ? "valid" : "invalid"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `badge ${report.chessValid ? "green" : "red"}`, children: [
        "chess ",
        report.chessValid ? "valid" : "invalid"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge ${report.engineVerified ? "green" : "yellow"}`, children: report.engineVerified ? "engine-verified" : "not engine-verified" })
    ] }),
    report.errors.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "callout error", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
        "[",
        e.code,
        "]"
      ] }),
      " ",
      e.path ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mono", children: [
        e.path,
        " — "
      ] }) : null,
      e.message
    ] }, `e${i}`)),
    report.warnings.map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "callout warn", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
        "[",
        w.code,
        "]"
      ] }),
      " ",
      w.message
    ] }, `w${i}`)),
    report.errors.length === 0 && report.warnings.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "callout success", children: "No issues found." })
  ] });
}
function AiStudio() {
  const settings = useStore((s) => s.settings);
  const navigate = useStore((s) => s.navigate);
  const [tab, setTab] = reactExports.useState("source");
  const [sourceText, setSourceText] = reactExports.useState("");
  const [goal, setGoal] = reactExports.useState("");
  const [rightsMode, setRightsMode] = reactExports.useState("notes-only");
  const [ratingMin, setRatingMin] = reactExports.useState(1300);
  const [ratingMax, setRatingMax] = reactExports.useState(1700);
  const [outline, setOutline] = reactExports.useState("");
  const [jsonText, setJsonText] = reactExports.useState("");
  const [report, setReport] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [published, setPublished] = reactExports.useState(false);
  const aiConfigured = settings != null && settings.aiConfig.mode !== "manual";
  async function run(label, fn) {
    setBusy(label);
    setError(null);
    setPublished(false);
    try {
      await fn();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(null);
    }
  }
  const makeOutline = () => run("outline", async () => {
    if (!sourceText.trim()) throw new Error("Paste source material or notes first.");
    const result = await api.ai.outline({
      sourceText,
      goal,
      rightsMode,
      targetRatingMin: ratingMin,
      targetRatingMax: ratingMax
    });
    setOutline(result);
    setTab("outline");
  });
  const generate = () => run("generate", async () => {
    if (!outline.trim()) throw new Error("Generate or write an outline first.");
    const result = await api.ai.generateLesson({
      sourceText,
      goal,
      rightsMode,
      targetRatingMin: ratingMin,
      targetRatingMax: ratingMax,
      outline
    });
    if (result.error) throw new Error(result.error);
    setJsonText(JSON.stringify(result.lessonJson, null, 2));
    setReport(result.report);
    setTab(result.report && result.report.schemaValid && result.report.chessValid ? "preview" : "validation");
  });
  const validate = () => run("validate", async () => {
    const parsed = JSON.parse(jsonText);
    const r = await api.lessons.validate(parsed);
    setReport(r);
    setTab("validation");
  });
  const publish = () => run("publish", async () => {
    const parsed = JSON.parse(jsonText);
    const { lesson, report: r } = await api.lessons.publish(parsed);
    setReport(r);
    if (!lesson) {
      setTab("validation");
      throw new Error("Lesson failed validation — fix the errors before publishing.");
    }
    setPublished(true);
  });
  let parsedForPreview = null;
  try {
    parsedForPreview = jsonText ? JSON.parse(jsonText) : null;
  } catch {
    parsedForPreview = null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "AI Lesson Studio" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "subtitle", children: "Transform authorized chess material into validated, interactive lessons. Nothing is sent to an AI provider unless you click generate." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "callout warn", style: { marginBottom: 12 }, children: "Use source material you are authorized to transform. Lessons must be original explanations and exercises — not copied chapters." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tabs", children: ["source", "outline", "json", "validation", "preview"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: tab === t ? "active" : "", onClick: () => setTab(t), children: t === "source" ? "1. Source" : t === "outline" ? "2. Outline" : t === "json" ? "3. JSON" : t === "validation" ? "4. Validation" : "5. Preview" }, t)) }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "callout error", style: { marginBottom: 10 }, children: error }),
    published && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "callout success", style: { marginBottom: 10 }, children: [
      "Lesson published to your library.",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: () => navigate({ name: "lessons" }), children: "Open Lessons" })
    ] }),
    tab === "source" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", style: { width: 240 }, children: [
          "Source rights",
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: rightsMode, onChange: (e) => setRightsMode(e.target.value), children: RIGHTS_MODES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r.value, children: r.label }, r.value)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", style: { width: 110 }, children: [
          "Rating min",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: ratingMin, onChange: (e) => setRatingMin(parseInt(e.target.value) || 1300) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", style: { width: 110 }, children: [
          "Rating max",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: ratingMax, onChange: (e) => setRatingMax(parseInt(e.target.value) || 1700) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
        "Goal (what should the lesson teach?)",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: goal,
            onChange: (e) => setGoal(e.target.value),
            placeholder: "e.g. Create a rook-pawn endgame lesson for a 1500 player"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
        "Source material: notes, text excerpt, PGN, or FEN list",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            rows: 14,
            value: sourceText,
            onChange: (e) => setSourceText(e.target.value),
            placeholder: "Paste your notes or authorized text here…"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "primary", disabled: !aiConfigured || busy !== null, onClick: () => void makeOutline(), children: busy === "outline" ? "Generating outline…" : "Generate outline →" }),
        !aiConfigured && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "muted", children: [
          "No AI provider configured —",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: () => navigate({ name: "settings" }), children: "configure" }),
          " ",
          "or write lesson JSON manually in tab 3."
        ] })
      ] })
    ] }),
    tab === "outline" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", children: "Review and edit the outline before generating the full lesson." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 18, value: outline, onChange: (e) => setOutline(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "primary", disabled: !aiConfigured || busy !== null, onClick: () => void generate(), children: busy === "generate" ? "Generating lesson…" : "Generate lesson JSON →" }) })
    ] }),
    tab === "json" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", children: "Lesson JSON (schema 1.0.0). You can write or edit it manually — manual mode needs no AI." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          rows: 22,
          value: jsonText,
          onChange: (e) => setJsonText(e.target.value),
          placeholder: '{"schemaVersion": "1.0.0", "id": "lesson-…", …}',
          spellCheck: false
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: !jsonText.trim() || busy !== null, onClick: () => void validate(), children: "Validate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "primary",
            disabled: !jsonText.trim() || busy !== null,
            onClick: () => void publish(),
            children: "Publish to library"
          }
        )
      ] })
    ] }),
    tab === "validation" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", children: [
      report ? /* @__PURE__ */ jsxRuntimeExports.jsx(ReportView, { report }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", children: "Run validation from the JSON tab first." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab("json"), children: "← Edit JSON" }),
        report && report.schemaValid && report.chessValid && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "primary", disabled: busy !== null, onClick: () => void publish(), children: "Publish to library" })
      ] })
    ] }),
    tab === "preview" && (parsedForPreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "callout", children: "Preview — exactly how the lesson player will render it." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LessonView, { lesson: parsedForPreview }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "primary", disabled: busy !== null, onClick: () => void publish(), children: "Publish to library" }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", children: "No valid lesson JSON to preview yet." }))
  ] });
}
function Engines() {
  const settings = useStore((s) => s.settings);
  const refreshSettings = useStore((s) => s.refreshSettings);
  const [engines, setEngines] = reactExports.useState([]);
  const [profiles, setProfiles] = reactExports.useState([]);
  const [busy, setBusy] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [pendingPath, setPendingPath] = reactExports.useState(null);
  const refresh = reactExports.useCallback(() => {
    void api.engines.list().then(setEngines);
    void api.engines.profiles().then(setProfiles);
  }, []);
  reactExports.useEffect(refresh, [refresh]);
  useAppEvent(["engine:status"], refresh);
  async function pick() {
    setError(null);
    const path = await api.engines.pickExecutable();
    if (path) setPendingPath(path);
  }
  async function confirmAdd() {
    if (!pendingPath) return;
    setBusy(true);
    setError(null);
    try {
      await api.engines.add(pendingPath);
      setPendingPath(null);
      refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  async function verify(id) {
    setBusy(true);
    setError(null);
    try {
      await api.engines.verify(id);
      refresh();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  async function setDefaultProfile(profileId) {
    await api.settings.set({ defaultProfileId: profileId });
    await refreshSettings();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Engines" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "subtitle", children: "Pluggable UCI engines run locally on your machine. Analysis is transparent: engine, depth, and time are always recorded." }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "callout error", style: { marginBottom: 10 }, children: error }),
    pendingPath && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "callout warn", style: { marginBottom: 12 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Security check:" }),
      " adding an engine runs a local executable on your computer. Only continue if you trust this file:",
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mono", style: { margin: "6px 0", wordBreak: "break-all" }, children: pendingPath }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "primary", disabled: busy, onClick: () => void confirmAdd(), children: busy ? "Verifying handshake…" : "Trust and add engine" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: busy, onClick: () => setPendingPath(null), children: "Cancel" })
      ] })
    ] }),
    engines.length === 0 && !pendingPath && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { textAlign: "center", padding: 36, marginBottom: 14 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Add a UCI engine to analyze games locally." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "muted", children: "Stockfish is free (stockfishchess.org). Download it, then point the app at the executable." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "primary", onClick: () => void pick(), children: "Add engine…" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-grid", children: engines.map((engine) => {
      const engineProfiles = profiles.filter((p) => p.engineId === engine.id);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { justifyContent: "space-between" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: engine.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `badge ${engine.status === "available" ? "green" : "red"}`, children: engine.status })
        ] }),
        engine.author && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted", children: [
          "by ",
          engine.author
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted mono", style: { fontSize: 11, wordBreak: "break-all", margin: "6px 0" }, children: engine.executablePath }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "muted", children: [
          "protocol: UCI · ",
          engine.detectedOptions.length,
          " options detected",
          engine.lastVerifiedAt && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            " · verified ",
            engine.lastVerifiedAt.slice(0, 10)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { style: { fontSize: 12.5 }, children: "Profiles" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col", style: { gap: 4, marginTop: 4 }, children: engineProfiles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              p.name,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "muted", style: { fontSize: 11 }, children: [
                p.limits.depth ? `depth ${p.limits.depth}` : "",
                p.limits.moveTimeMs ? `${p.limits.moveTimeMs}ms/move` : "",
                p.limits.multiPv ? ` · ${p.limits.multiPv} lines` : ""
              ] })
            ] }),
            settings?.defaultProfileId === p.id ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge green", children: "default" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: () => void setDefaultProfile(p.id), children: "Set default" })
          ] }, p.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { marginTop: 12 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", disabled: busy, onClick: () => void verify(engine.id), children: "Verify" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "small danger",
              onClick: () => {
                void api.engines.remove(engine.id).then(refresh);
              },
              children: "Remove"
            }
          )
        ] })
      ] }, engine.id);
    }) }),
    engines.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: { marginTop: 14 }, onClick: () => void pick(), children: "+ Add another engine" })
  ] });
}
const BOARD_THEMES = [
  { value: "green", label: "Green" },
  { value: "brown", label: "Brown (chess club)" },
  { value: "blue", label: "Blue" },
  { value: "gray", label: "Gray (black & white)" },
  { value: "classic", label: "Classic" },
  { value: "contrast", label: "High contrast" }
];
const PIECE_SETS = [
  { value: "standard", label: "Standard" },
  { value: "staunty", label: "Staunty" }
];
const PREVIEW_FEN = "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 6 5";
function Settings() {
  const settings = useStore((s) => s.settings);
  const refreshSettings = useStore((s) => s.refreshSettings);
  const setOnboardingOpen = useStore((s) => s.setOnboardingOpen);
  const [draft, setDraft] = reactExports.useState(null);
  const [saved, setSaved] = reactExports.useState(false);
  const [backfillNotice, setBackfillNotice] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (settings) setDraft(JSON.parse(JSON.stringify(settings)));
  }, [settings]);
  if (!draft) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", children: "Loading…" });
  async function save() {
    const identityChanged = draft.chesscomUsername !== settings?.chesscomUsername || draft.lichessUsername !== settings?.lichessUsername || draft.displayName !== settings?.displayName;
    await api.settings.set(draft);
    await refreshSettings();
    setSaved(true);
    setTimeout(() => setSaved(false), 2e3);
    if (identityChanged) {
      const result = await api.identity.backfill();
      if (result.updatedGames > 0) {
        setBackfillNotice(
          `Re-detected your side in ${result.updatedGames} game${result.updatedGames === 1 ? "" : "s"}` + (result.reclassifiedGames > 0 ? ` and refreshed mistakes for ${result.reclassifiedGames} of them.` : ".")
        );
      }
    }
  }
  function runSetupWizard() {
    try {
      window.localStorage.removeItem(ONBOARDING_DONE_KEY);
    } catch {
    }
    setOnboardingOpen(true);
  }
  const set = (key, value) => setDraft({ ...draft, [key]: value });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { maxWidth: 720 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Settings" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "subtitle", children: "Profile, platforms, AI provider, and privacy. Everything is stored locally." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { marginBottom: 14 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Profile and rating goal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", style: { flex: 1, minWidth: 180 }, children: [
          "Display name",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: draft.displayName, onChange: (e) => set("displayName", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", style: { width: 130 }, children: [
          "Current rating",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              value: draft.ratingCurrent,
              onChange: (e) => set("ratingCurrent", parseInt(e.target.value) || 1500)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", style: { width: 130 }, children: [
          "Goal rating",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              value: draft.ratingGoal,
              onChange: (e) => set("ratingGoal", parseInt(e.target.value) || 1800)
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { marginBottom: 14 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Appearance" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", style: { marginBottom: 8 }, children: "Board color scheme and chess pieces, used on every board in the app." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { alignItems: "flex-start", gap: 18 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", style: { flex: 1, minWidth: 200 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            "Board colors",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: draft.boardTheme,
                onChange: (e) => set("boardTheme", e.target.value),
                children: BOARD_THEMES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t.value, children: t.label }, t.value))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            "Piece set",
            /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: draft.pieceSet, onChange: (e) => set("pieceSet", e.target.value), children: PIECE_SETS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.value, children: p.label }, p.value)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", children: "The preview updates immediately; click “Save settings” to apply everywhere." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "row", style: { gap: 6, marginTop: 6 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: draft.soundEnabled,
                onChange: (e) => set("soundEnabled", e.target.checked)
              }
            ),
            "Sound effects (moves, puzzle feedback, session complete)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 240, flexShrink: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Board,
          {
            fen: PREVIEW_FEN,
            maxWidth: 240,
            showCoordinates: false,
            evalTarget: false,
            allowFlip: false,
            themeOverride: draft.boardTheme,
            pieceSetOverride: draft.pieceSet
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { marginBottom: 14 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Platforms" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", style: { marginBottom: 8 }, children: "Used to detect which side you played in imported games and to prefill imports." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", style: { flex: 1, minWidth: 180 }, children: [
          "Chess.com username",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: draft.chesscomUsername, onChange: (e) => set("chesscomUsername", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", style: { flex: 1, minWidth: 180 }, children: [
          "Lichess username",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: draft.lichessUsername, onChange: (e) => set("lichessUsername", e.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", style: { marginTop: 8 }, children: [
        "Contact for API User-Agent (recommended for large imports)",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: draft.userAgentContact,
            onChange: (e) => set("userAgentContact", e.target.value),
            placeholder: "you@example.com"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { marginBottom: 14 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "AI provider" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", style: { marginBottom: 8 }, children: "Optional. Your games and notes are only sent when you explicitly generate a lesson. Local-only mode: choose “Manual”." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", style: { width: 260 }, children: [
          "Mode",
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: draft.aiConfig.mode,
              onChange: (e) => set("aiConfig", { ...draft.aiConfig, mode: e.target.value }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "manual", children: "Manual (no AI)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "openai-compatible", children: "OpenAI-compatible API" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "local-http", children: "Local model (HTTP)" })
              ]
            }
          )
        ] }),
        draft.aiConfig.mode !== "manual" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", children: [
            "Base URL",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: draft.aiConfig.baseUrl,
                onChange: (e) => set("aiConfig", { ...draft.aiConfig, baseUrl: e.target.value }),
                placeholder: draft.aiConfig.mode === "local-http" ? "http://localhost:11434/v1" : "https://api.openai.com/v1"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { flexWrap: "wrap" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", style: { flex: 1, minWidth: 200 }, children: [
              "API key ",
              draft.aiConfig.mode === "local-http" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "muted", children: "(often not needed)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "password",
                  value: draft.aiConfig.apiKey,
                  onChange: (e) => set("aiConfig", { ...draft.aiConfig, apiKey: e.target.value })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "field", style: { flex: 1, minWidth: 200 }, children: [
              "Model",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: draft.aiConfig.model,
                  onChange: (e) => set("aiConfig", { ...draft.aiConfig, model: e.target.value }),
                  placeholder: "model name"
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { marginBottom: 14 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Privacy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "muted", style: { margin: 0, paddingLeft: 18 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "All games, analysis, and lessons live in a local SQLite database." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Network calls: Chess.com/Lichess public APIs during import, and your AI provider only on request." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Ongoing games are never queued for engine analysis." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { marginBottom: 14 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Setup" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "muted", style: { marginBottom: 8 }, children: "Re-run the first-time setup steps (identity, import, engine)." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "small", onClick: runSetupWizard, children: "Run setup wizard again" })
    ] }),
    backfillNotice && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "callout success", style: { marginBottom: 14 }, children: backfillNotice }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "primary", onClick: () => void save(), children: "Save settings" }),
      saved && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge green", children: "Saved" })
    ] })
  ] });
}
function App() {
  const route = useStore((s) => s.route);
  const importModalOpen = useStore((s) => s.importModalOpen);
  const onboardingOpen = useStore((s) => s.onboardingOpen);
  const setOnboardingOpen = useStore((s) => s.setOnboardingOpen);
  const settings = useStore((s) => s.settings);
  reactExports.useEffect(() => {
    if (!settings) return;
    let done = false;
    try {
      done = window.localStorage.getItem(ONBOARDING_DONE_KEY) === "true";
    } catch {
    }
    if (done || settings.chesscomUsername || settings.lichessUsername) return;
    void api.games.list({ limit: 1 }).then((games) => {
      if (games.length === 0) setOnboardingOpen(true);
    });
  }, [settings !== null]);
  let content;
  switch (route.name) {
    case "today":
      content = /* @__PURE__ */ jsxRuntimeExports.jsx(Today, {});
      break;
    case "games":
      content = /* @__PURE__ */ jsxRuntimeExports.jsx(Games, {});
      break;
    case "review":
      content = /* @__PURE__ */ jsxRuntimeExports.jsx(Review, { gameId: route.gameId });
      break;
    case "openings":
      content = /* @__PURE__ */ jsxRuntimeExports.jsx(Openings, {});
      break;
    case "lessons":
      content = /* @__PURE__ */ jsxRuntimeExports.jsx(Lessons, {});
      break;
    case "lesson":
      content = /* @__PURE__ */ jsxRuntimeExports.jsx(LessonPlayer, { lessonId: route.lessonId });
      break;
    case "exercises":
      content = /* @__PURE__ */ jsxRuntimeExports.jsx(Exercises, { initialTag: route.tag });
      break;
    case "ai-studio":
      content = /* @__PURE__ */ jsxRuntimeExports.jsx(AiStudio, {});
      break;
    case "engines":
      content = /* @__PURE__ */ jsxRuntimeExports.jsx(Engines, {});
      break;
    case "settings":
      content = /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, {});
      break;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "app-shell", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "main-content", children: content }),
    importModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(ImportModal, {}),
    onboardingOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(Onboarding, {})
  ] });
}
wireEvents();
clientExports.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
