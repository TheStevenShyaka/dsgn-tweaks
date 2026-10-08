// node_modules/.pnpm/preact@11.0.0/node_modules/preact/dist/preact.mjs
var n;
var t;
var i;
var r;
var u;
var f;
var o;
var e;
var l;
var c;
var a;
var s;
var h;
var p;
var v = {};
var y = [];
var w = /^m(i|n|o|s|text|space)$/;
var d = Array.isArray;
var _ = y.slice;
var g = Object.assign;
function b(n2) {
  n2 && n2.parentNode && n2.remove();
}
function k(n2, t3, i3) {
  var r3, u4, f3, o4 = {}, e3 = arguments.length;
  for (f3 in t3) "key" == f3 ? r3 = t3[f3] : "ref" == f3 && "function" != typeof n2 ? u4 = t3[f3] : o4[f3] = t3[f3];
  return e3 > 2 && (o4.children = e3 > 3 ? _.call(arguments, 2) : i3), M(n2, o4, r3, u4, null);
}
function M(i3, r3, u4, f3, o4) {
  var e3 = { type: i3, props: r3, key: u4, ref: f3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: o4 || ++t, __i: -1, __u: 0 };
  return !o4 && n.vnode && n.vnode(e3), e3;
}
function x(n2) {
  return n2.children;
}
function S(n2, t3) {
  this.props = n2, this.context = t3, this.__g = 0;
}
function C(n2, t3) {
  if (null == t3) return n2.__ ? C(n2.__, n2.__i + 1) : null;
  for (var i3; t3 < n2.__k.length; t3++) if ((i3 = n2.__k[t3]) && i3.__e) return i3.__e;
  return "function" != typeof n2.type || n2.props.__P ? null : C(n2);
}
function j(n2) {
  if ((n2 = n2.__) && n2.__c && !n2.props.__P) return n2.__e = null, n2.__k.some(function(t3) {
    return t3 && (n2.__e = t3.__e);
  }), j(n2);
}
function L(t3) {
  (8 & t3.__g || !(t3.__g |= 8) || !r.push(t3) || f++) && u == n.debounceRendering || ((u = n.debounceRendering) || queueMicrotask)(H);
}
function H() {
  var t3, i3, u4, e3, l3, c3, a3, s3, h3;
  try {
    for (i3 = 1; r.length; ) r.length > i3 && r.sort(o), t3 = r.shift(), i3 = r.length, 8 & t3.__g && (e3 = void 0, l3 = void 0, c3 = (l3 = (u4 = t3).__v).__e, a3 = [], s3 = [], (h3 = u4.__P) && ((e3 = g({ constructor: void 0 }, l3)).__v = l3.__v + 1, n.vnode && n.vnode(e3), z(h3, e3, l3, u4.__n, h3.namespaceURI, 32 & l3.__u ? [c3] : null, a3, c3 || C(l3), 32 & l3.__u, s3), e3.__v = l3.__v, e3.__.__k[e3.__i] = e3, D(a3, e3, s3), l3.__ = l3.__e = null, e3.__e != c3 && j(e3)));
  } finally {
    r.length = f = 0;
  }
}
function I(n2, t3, i3, r3, u4, f3, o4, e3, l3, c3, a3) {
  var s3, h3, p3, w4, d3, _3, g3 = r3.__k || y, b3 = t3.length;
  for (l3 = A(i3, t3, g3, l3, b3), s3 = 0; s3 < b3; s3++) null != (p3 = i3.__k[s3]) && (h3 = ~p3.__i && g3[p3.__i] || v, p3.__i = s3, _3 = z(n2, p3, h3, u4, f3, o4, e3, l3, c3, a3), w4 = p3.__e, p3.ref && (h3.ref != p3.ref || 8 & h3.__u) && (h3.ref != p3.ref && h3.ref && F(h3.ref, null, p3), a3.push(p3.ref, p3.__c || w4, p3)), d3 = d3 || w4, 4 & p3.__u ? (l3 = O(p3, l3, n2, !h3.__v), h3.__e && (h3.__e = null)) : "function" == typeof p3.type && void 0 !== _3 ? l3 = _3 : w4 && (l3 = w4.nextSibling), p3.__u &= -7);
  return i3.__e = d3, l3;
}
function A(n2, t3, i3, r3, u4) {
  var f3, o4, e3, l3, c3, a3, s3, h3, p3, v3, y3 = i3.length, w4 = y3, _3 = 0, g3 = false, b3 = n2.__k = Array(u4);
  for (f3 = 0; f3 < u4; f3++) null != (o4 = t3[f3]) && "boolean" != typeof o4 && "function" != typeof o4 ? ("object" != typeof o4 || o4.constructor == String ? o4 = b3[f3] = M(null, o4) : d(o4) ? o4 = b3[f3] = M(x, { children: o4 }) : void 0 === o4.constructor && o4.__b ? o4 = b3[f3] = M(o4.type, o4.props, o4.key, o4.ref, o4.__v) : b3[f3] = o4, l3 = f3 + _3, o4.__ = n2, o4.__b = n2.__b + 1, e3 = null, ~(c3 = o4.__i = T(o4, i3, l3, w4)) && (w4--, (e3 = i3[c3]) && (e3.__u |= 2)), e3 && e3.__v ? (o4.__u |= 2, c3 == l3 - 1 ? _3-- : c3 == l3 + 1 ? _3++ : c3 != l3 && (c3 > l3 ? _3-- : _3++, g3 = true)) : (~c3 || (u4 > y3 ? _3-- : u4 < y3 && _3++), "function" != typeof o4.type && (o4.__u |= 4))) : b3[f3] = null;
  if (g3) {
    for (a3 = [], s3 = [], f3 = 0; f3 < u4; f3++) if ((o4 = b3[f3]) && 2 & o4.__u) {
      for (h3 = 0, p3 = a3.length; h3 < p3; ) a3[v3 = h3 + p3 >> 1] < o4.__i ? h3 = v3 + 1 : p3 = v3;
      a3[h3] = o4.__i, s3[f3] = h3 + 1;
    }
    for (_3 = a3.length; f3--; ) s3[f3] && (s3[f3] == _3 ? _3-- : b3[f3].__u |= 4);
  }
  if (w4) for (f3 = 0; f3 < y3; f3++) !(e3 = i3[f3]) || 2 & e3.__u || (e3.__e == r3 && (r3 = C(e3)), G(e3, e3));
  return r3;
}
function O(n2, t3, i3, r3) {
  var u4, f3;
  if ("function" == typeof n2.type) {
    if (n2.props.__P) return t3;
    if (u4 = n2.__k) for (f3 = 0; f3 < u4.length; f3++) u4[f3] && (u4[f3].__ = n2, t3 = O(u4[f3], t3, i3, false));
    return t3;
  }
  for (t3 && !t3.parentNode && (t3 = C(n2)) && !t3.parentNode && (t3 = null), n2.__e != t3 && (!r3 && i3.moveBefore && n2.__e.parentNode ? i3.moveBefore(n2.__e, t3) : i3.insertBefore(n2.__e, t3 || null)), t3 = n2.__e; (t3 = t3 && t3.nextSibling) && 8 == t3.nodeType; ) ;
  return t3;
}
function P(n2, t3) {
  return t3 = t3 || [], null != n2 && "boolean" != typeof n2 && (d(n2) ? n2.some(function(n3) {
    P(n3, t3);
  }) : t3.push(n2)), t3;
}
function T(n2, t3, i3, r3) {
  var u4, f3, o4, e3 = n2.key, l3 = n2.type, c3 = t3[i3], a3 = c3 && !(2 & c3.__u);
  if (null === c3 && null == e3 || a3 && e3 == c3.key && l3 == c3.type) return i3;
  if (r3 > (a3 ? 1 : 0)) {
    for (u4 = i3 - 1, f3 = i3 + 1; u4 >= 0 || f3 < t3.length; ) if ((c3 = t3[o4 = u4 >= 0 ? u4-- : f3++]) && !(2 & c3.__u) && e3 == c3.key && l3 == c3.type) return o4;
  }
  return -1;
}
function q(n2, t3, i3) {
  null == i3 && (i3 = ""), "-" == t3[0] ? n2.setProperty(t3, i3) : n2[t3] = i3;
}
function N(n2, t3, i3, r3, u4) {
  var f3;
  n: if ("style" == t3) if ("string" == typeof i3) n2.style.cssText = i3;
  else {
    if ("string" == typeof r3 && (n2.style.cssText = r3 = ""), r3) for (t3 in r3) i3 && t3 in i3 || q(n2.style, t3, "");
    if (i3) for (t3 in i3) r3 && i3[t3] == r3[t3] || q(n2.style, t3, i3[t3]);
  }
  else if ("o" == t3[0] && "n" == t3[1]) f3 = t3 != (t3 = t3.replace(c, "$1")), (t3 = t3.slice(2))[0] < "a" && (t3 = t3.toLowerCase()), (n2.__e || (n2.__e = {}))[t3 + f3] = i3, i3 ? r3 ? i3[l] = r3[l] : (i3[l] = a, n2.addEventListener(t3, f3 ? h : s, f3)) : n2.removeEventListener(t3, f3 ? h : s, f3);
  else {
    if ("http://www.w3.org/2000/svg" == u4) t3 = t3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if ("width" != t3 && "height" != t3 && "href" != t3 && "list" != t3 && "form" != t3 && "tabIndex" != t3 && "download" != t3 && "rowSpan" != t3 && "colSpan" != t3 && "role" != t3 && "popover" != t3 && t3 in n2) try {
      n2[t3] = null == i3 ? "" : i3;
      break n;
    } catch (n3) {
    }
    "function" == typeof i3 || (null == i3 || false === i3 && "-" != t3[4] ? n2.removeAttribute(t3) : n2.setAttribute(t3, "popover" == t3 && 1 == i3 ? "" : i3));
  }
}
function V(t3) {
  return function(i3) {
    if (this.__e) {
      var r3 = this.__e[i3.type + t3];
      if (null == i3[e]) i3[e] = a++;
      else if (i3[e] < r3[l]) return;
      return r3(n.event ? n.event(i3) : i3);
    }
  };
}
function z(t3, i3, r3, u4, f3, o4, e3, l3, c3, a3) {
  var s3, h3, p3, v3, w4, _3, k3, m3, M2, $3, j3, L2, H3, A3, O2, P4, T4, q3, N2, V3, z4 = i3.type;
  if (void 0 !== i3.constructor) return null;
  if (128 & r3.__u && (c3 = 32 & r3.__u, s3 = r3.__c.__z)) {
    if (i3.__u |= c3, h3 = o4 = [], 8 == s3.nodeType) for (p3 = 1, v3 = s3.nextSibling; v3; v3 = v3.nextSibling) {
      if (8 == v3.nodeType) {
        if (v3.data.startsWith("$s")) p3++;
        else if (v3.data.startsWith("/$s") && !--p3) break;
      }
      o4.push(v3);
    }
    else o4.push(s3);
    l3 = o4[0];
  }
  (s3 = n.__b) && s3(i3);
  n: if ("function" == typeof z4) {
    w4 = e3.length;
    try {
      if ($3 = i3.props, j3 = (s3 = z4.prototype) && s3.render, L2 = (s3 = z4.contextType) && u4[s3.__c], H3 = s3 ? L2 ? L2.props.value : s3.__ : u4, r3.__c ? 2 & (_3 = i3.__c = r3.__c).__g && (_3.__g |= 1) : (j3 ? i3.__c = _3 = new z4($3, H3) : (i3.__c = _3 = new S($3, H3), _3.constructor = z4, _3.render = J), L2 && L2.sub(_3), _3.state || (_3.state = {}), _3.__n = u4, _3.__g |= 8, _3.__h = [], _3.__k = []), j3 && (_3.__s || (_3.__s = _3.state), z4.getDerivedStateFromProps && (_3.__s == _3.state && (_3.__s = g({}, _3.__s)), g(_3.__s, z4.getDerivedStateFromProps($3, _3.__s)))), k3 = _3.props, m3 = _3.state, _3.__v = i3, r3.__c) {
        if (j3 && !z4.getDerivedStateFromProps && $3 !== k3 && _3.componentWillReceiveProps && _3.componentWillReceiveProps($3, H3), i3.__v == r3.__v && !(8 & _3.__g) || !(4 & _3.__g) && _3.shouldComponentUpdate && false === _3.shouldComponentUpdate($3, _3.__s, H3)) {
          i3.__v != r3.__v && (_3.props = $3, _3.state = _3.__s, _3.__g &= -9), i3.__e = r3.__e, i3.__k = r3.__k, i3.__k.some(function(n2) {
            n2 && (n2.__ = i3);
          }), y.push.apply(_3.__h, _3.__k), _3.__k = [], _3.__h.length && e3.push(_3), l3 = C(r3);
          break n;
        }
        _3.componentWillUpdate && _3.componentWillUpdate($3, _3.__s, H3), j3 && _3.componentDidUpdate && _3.__h.push(function() {
          _3.componentDidUpdate(k3, m3, M2);
        });
      } else j3 && !z4.getDerivedStateFromProps && _3.componentWillMount && _3.componentWillMount(), j3 && _3.componentDidMount && _3.__h.push(_3.componentDidMount);
      if (_3.context = H3, _3.props = $3, _3.__P = t3, _3.__g &= -5, A3 = n.__r, O2 = 0, j3) _3.state = _3.__s, _3.__g &= -9, A3 && A3(i3), s3 = _3.render(_3.props, _3.state, _3.context), y.push.apply(_3.__h, _3.__k), _3.__k = [];
      else do {
        _3.__g &= -9, A3 && A3(i3), s3 = _3.render(_3.props, _3.state, _3.context), _3.state = _3.__s;
      } while (8 & _3.__g && ++O2 < 25);
      _3.state = _3.__s, _3.getChildContext && (u4 = g({}, u4, _3.getChildContext())), j3 && r3.__c && _3.getSnapshotBeforeUpdate && (M2 = _3.getSnapshotBeforeUpdate(k3, m3)), P4 = s3 && s3.type === x && null == s3.key ? s3.props.children : s3, $3.__P && (s3 = l3, f3 = (t3 = $3.__P).namespaceURI, c3 = o4 = null, r3.props && r3.props.__P != t3 && (r3.__k.some(function(n2) {
        n2 && G(n2, n2);
      }), r3.__k = null), l3 = r3.__k ? C(r3, 0) : null), l3 = I(t3, d(P4) ? P4 : [P4], i3, r3, u4, f3, o4, e3, l3, c3, a3), $3.__P && (i3.__e = null, l3 = s3), i3.__u &= -161, 128 & r3.__u && (_3.__z = null), h3 && h3.some(b), _3.__h.length && e3.push(_3), 1 & _3.__g && (_3.__g &= -4);
    } catch (t4) {
      if (e3.length = w4, i3.__v = null, c3 || o4) if (t4.then) {
        if (T4 = 0, i3.__u |= c3 ? 160 : 128, o4) {
          for (N2 = 0; N2 < o4.length; N2++) if (V3 = o4[N2]) if (8 == V3.nodeType) {
            if (o4[N2] = null, V3.data.startsWith("$s")) T4++ || (q3 = V3);
            else if (V3.data.startsWith("/$s") && !--T4) {
              l3 = V3;
              break;
            }
          } else T4 && (o4[N2] = null);
        }
        if (!q3) {
          for (; l3 && 8 == l3.nodeType && l3.nextSibling; ) l3 = l3.nextSibling;
          o4 && (o4[o4.indexOf(l3)] = null), q3 = l3;
        }
        i3.__c.__z || (i3.__c.__z = q3), i3.__e = l3;
      } else o4 && o4.some(b);
      else i3.__e = r3.__e;
      i3.__k || (i3.__k = r3.__k || []), t4.then || B(i3), n.__e(t4, i3, r3);
    }
  } else l3 = i3.__e = E(r3.__e, i3, r3, u4, f3, o4, e3, c3, a3, t3);
  return (s3 = n.diffed) && s3(i3), 128 & i3.__u ? void 0 : l3;
}
function B(n2) {
  n2 && (n2.__c && (n2.__c.__g |= 4), n2.__k && n2.__k.some(B));
}
function D(t3, i3, r3) {
  for (var u4 = 0; u4 < r3.length; ) F(r3[u4++], r3[u4++], r3[u4++]);
  n.__c && n.__c(i3, t3), t3.some(function(i4) {
    try {
      t3 = i4.__h, i4.__h = [], t3.some(function(n2) {
        n2.call(i4);
      });
    } catch (t4) {
      n.__e(t4, i4.__v);
    }
  });
}
function E(t3, i3, r3, u4, f3, o4, e3, l3, c3, a3) {
  var s3, h3, p3, y3, g3, k3, m3, M2, $3, x4 = r3.props || v, S2 = i3.props, j3 = i3.type;
  if ("svg" == j3 ? f3 = "http://www.w3.org/2000/svg" : "math" == j3 ? f3 = "http://www.w3.org/1998/Math/MathML" : f3 || (f3 = "http://www.w3.org/1999/xhtml"), o4) {
    for (s3 = 0; s3 < o4.length; s3++) if ((g3 = o4[s3]) && (j3 ? g3.localName == j3 : 3 == g3.nodeType)) {
      t3 = g3, o4[s3] = null;
      break;
    }
  }
  if (!t3) {
    if (M2 = a3.ownerDocument || document, !j3) return M2.createTextNode(S2);
    t3 = M2.createElementNS(f3, j3, S2.is && S2), l3 && (n.__m && n.__m(i3, o4), l3 = false), o4 = null;
  }
  if (j3) {
    if (a3 = "template" == j3 ? t3.content : t3, o4 = "textarea" == j3 && null != S2.defaultValue ? null : o4 && _.call(a3.childNodes), !l3 && o4) for (x4 = {}, s3 = 0; s3 < t3.attributes.length; s3++) x4[(g3 = t3.attributes[s3]).name] = g3.value;
    for (s3 in x4) g3 = x4[s3], "dangerouslySetInnerHTML" == s3 ? p3 = g3 : "children" == s3 || s3 in S2 || "value" == s3 && "defaultValue" in S2 || "checked" == s3 && "defaultChecked" in S2 || N(t3, s3, null, g3, f3);
    for (s3 in $3 = 1 & r3.__u, S2) g3 = S2[s3], "children" == s3 ? y3 = g3 : "dangerouslySetInnerHTML" == s3 ? h3 = g3 : "value" == s3 ? k3 = g3 : "checked" == s3 ? m3 = g3 : l3 && "function" != typeof g3 || !(x4[s3] !== g3 || $3 && null != g3) || N(t3, s3, g3, x4[s3], f3);
    h3 ? (l3 || p3 && (h3.__html == p3.__html || h3.__html == t3.innerHTML) || (t3.innerHTML = h3.__html), i3.__k = []) : (p3 && (t3.textContent = ""), ("foreignObject" == j3 || "http://www.w3.org/1998/Math/MathML" == f3 && w.test(j3)) && (f3 = "http://www.w3.org/1999/xhtml"), I(a3, d(y3) ? y3 : [y3], i3, r3, u4, f3, o4, e3, o4 ? o4[0] : r3.__k && C(r3, 0), l3, c3), o4 && o4.some(b)), l3 && "textarea" != j3 || (s3 = "value", "progress" == j3 && null == k3 ? t3.removeAttribute(s3) : null == k3 || k3 === t3[s3] && ("progress" != j3 || k3) || N(t3, s3, k3, x4[s3], f3), s3 = "checked", null != m3 && m3 != t3[s3] && N(t3, s3, m3, x4[s3], f3));
  } else x4 === S2 || l3 && t3.data == S2 || (t3.data = S2);
  return t3;
}
function F(t3, i3, r3) {
  try {
    "function" == typeof t3 ? ("function" == typeof t3.__u && t3.__u(), ("function" != typeof t3.__u || i3) && (t3.__u = t3(i3))) : t3.current = i3;
  } catch (t4) {
    n.__e(t4, r3);
  }
}
function G(t3, i3, r3) {
  var u4, f3;
  if (n.unmount && n.unmount(t3), !(u4 = t3.ref) || u4.current && u4.current != t3.__e || F(u4, null, i3), u4 = t3.__c) {
    if (u4.componentWillUnmount) try {
      u4.componentWillUnmount();
    } catch (t4) {
      n.__e(t4, i3);
    }
    u4.__P = u4.__n = null;
  }
  if (u4 = t3.__k) for (f3 = 0; f3 < u4.length; f3++) u4[f3] && G(u4[f3], i3, "function" != typeof t3.type || r3 && !t3.props.__P);
  (u4 = t3.__e) && (r3 || b(u4), u4.__e && (u4.__e = null)), t3.__e = t3.__c = t3.__ = null;
}
function J(n2, t3, i3) {
  return this.constructor(n2, i3);
}
function K(t3, i3) {
  var r3, u4, f3, o4;
  n.__ && n.__(t3, i3), 9 == i3.nodeType && (i3 = i3.documentElement), u4 = (r3 = t3 && 32 & t3.__u) ? null : i3.__k, i3.__k = M(x, { children: [t3] }), f3 = [], o4 = [], z(i3, i3.__k, u4 || v, v, i3.namespaceURI, u4 ? null : i3.firstChild ? _.call(i3.childNodes) : null, f3, u4 ? u4.__e : i3.firstChild, r3, o4), D(f3, i3.__k, o4), i3.__k.props.children = null;
}
function R(n2) {
  function t3(n3) {
    var i3, r3;
    return this.getChildContext || (i3 = /* @__PURE__ */ new Set(), (r3 = {})[t3.__c] = this, this.getChildContext = function() {
      return r3;
    }, this.shouldComponentUpdate = function(n4) {
      this.props.value != n4.value && i3.forEach(function(n5) {
        n5.__g |= 4, L(n5);
      });
    }, this.sub = function(n4) {
      i3.add(n4);
      var t4 = n4.componentWillUnmount;
      n4.componentWillUnmount = function() {
        i3.delete(n4), t4 && t4.call(n4);
      };
    }), n3.children;
  }
  return t3.__c = "__cC" + p++, t3.__ = n2, t3.Provider = (t3.Consumer = function(n3, t4) {
    return n3.children(t4);
  }).contextType = t3, t3;
}
n = { __e: function(n2, t3, i3, r3) {
  for (var u4, o4, e3; t3 = t3.__; ) if ((u4 = t3.__c) && !(1 & u4.__g)) {
    u4.__g |= 4;
    try {
      if ((o4 = u4.constructor) && o4.getDerivedStateFromError && (u4.setState(o4.getDerivedStateFromError(n2)), e3 = 8 & u4.__g), u4.componentDidCatch && (u4.componentDidCatch(n2, r3 || {}), e3 = 8 & u4.__g), e3) return void (u4.__g |= 2);
    } catch (t4) {
      n2 = t4, e3 = 0;
    }
  }
  throw f = 0, n2;
} }, t = 0, i = function(n2) {
  return null != n2 && void 0 === n2.constructor;
}, S.prototype.setState = function(n2, t3) {
  var i3 = this.__s;
  i3 && i3 != this.state || (i3 = this.__s = g({}, this.state)), "function" == typeof n2 && (n2 = n2(g({}, i3), this.props)), n2 && (g(i3, n2), this.__v && (t3 && this.__k.push(t3), L(this)));
}, S.prototype.forceUpdate = function(n2) {
  this.__v && (this.__g |= 4, n2 && this.__h.push(n2), L(this));
}, S.prototype.render = x, r = [], f = 0, o = function(n2, t3) {
  return n2.__v.__b - t3.__v.__b;
}, e = /* @__PURE__ */ Symbol(), l = /* @__PURE__ */ Symbol(), c = /(PointerCapture)$|Capture$/i, a = 0, s = V(false), h = V(true), p = 0;

// src/core/config.ts
var config = {};
var setConfig = (next) => {
  config = next;
};
var getConfig = () => config;
var themeAttribute = () => config.theme?.attribute ?? "data-theme";
var darkValue = () => config.theme?.dark ?? "dark";
function isDarkTheme() {
  const html = document.documentElement;
  return themeAttribute() === "class" ? html.classList.contains(darkValue()) : html.getAttribute(themeAttribute()) === darkValue();
}
function writeTheme(next) {
  const html = document.documentElement;
  if (themeAttribute() === "class") html.classList.toggle(darkValue(), next === "dark");
  else html.setAttribute(themeAttribute(), next === "dark" ? darkValue() : "light");
  const key = config.theme?.storageKey;
  if (!key) return;
  try {
    localStorage.setItem(key, next);
  } catch {
  }
}
function themeSelectors() {
  const attr = themeAttribute();
  const dark = darkValue();
  return attr === "class" ? { light: `:root:not(.${dark})`, dark: `:root.${dark}` } : { light: `:root:not([${attr}="${dark}"])`, dark: `:root[${attr}="${dark}"]` };
}

// src/core/store.ts
var EMPTY = {
  readme: "Written by dsgn-tweaks. Nothing here touches the source until Send: the agent then implements the sent batch and removes it from this file. See AGENTS.md in the dsgn-tweaks repo.",
  layout: {},
  sections: { order: [], hidden: [] },
  tokens: { light: {}, dark: {} },
  text: [],
  styles: [],
  messages: [],
  updatedAt: ""
};
var CHANNEL = "dsgn-tweaks";
var LOCAL_KEY = "dsgn-tweaks:state";
var POLL_MS = 2e3;
var DEFAULT_ENDPOINT = "/api/dsgn-tweaks";
function endpoint(extra = "") {
  const file = new URLSearchParams(window.location.search).get("designfile");
  const query = [file ? `file=${encodeURIComponent(file)}` : "", extra].filter(Boolean).join("&");
  return `${getConfig().endpoint ?? DEFAULT_ENDPOINT}${query ? `?${query}` : ""}`;
}
var state = EMPTY;
var status = "loading";
var local = false;
var listeners = /* @__PURE__ */ new Set();
var channel = null;
var timer;
var poll;
var started = false;
var synced = "";
function emit() {
  listeners.forEach((l3) => l3());
}
function subscribe(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
var getTweaks = () => state;
var getStatus = () => status;
var isLocal = () => local;
function normalise(raw) {
  const t3 = raw && typeof raw === "object" ? raw : {};
  const legacy = typeof t3.notes === "string" && t3.notes.trim() ? [{ id: "notes", text: t3.notes.trim(), at: t3.updatedAt ?? "" }] : [];
  delete t3.notes;
  return {
    ...EMPTY,
    ...t3,
    readme: EMPTY.readme,
    layout: { ...EMPTY.layout, ...t3.layout },
    sections: { ...EMPTY.sections, ...t3.sections },
    tokens: { light: { ...t3.tokens?.light }, dark: { ...t3.tokens?.dark } },
    text: Array.isArray(t3.text) ? t3.text : [],
    styles: Array.isArray(t3.styles) ? t3.styles : [],
    messages: Array.isArray(t3.messages) ? t3.messages : legacy
  };
}
function readLocal() {
  try {
    return normalise(JSON.parse(localStorage.getItem(LOCAL_KEY) ?? "{}"));
  } catch {
    return normalise({});
  }
}
function writeLocal() {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
  } catch {
  }
}
function goLocal() {
  local = true;
  state = readLocal();
  status = "local";
  emit();
}
function start(writer) {
  if (started) return;
  started = true;
  if (typeof BroadcastChannel !== "undefined") {
    channel = new BroadcastChannel(CHANNEL);
    channel.onmessage = (e3) => {
      state = normalise(e3.data);
      emit();
    };
  }
  if (getConfig().storage === "browser") return goLocal();
  const pull = (first) => fetch(endpoint(), { cache: "no-store" }).then((r3) => r3.ok ? r3.json() : Promise.reject(r3.status)).then((data) => {
    if (!first && (status === "saving" || !(String(data?.updatedAt ?? "") > synced))) return;
    state = normalise(data);
    synced = state.updatedAt;
    status = "saved";
    emit();
  }).catch(() => {
    if (!first) return;
    if (getConfig().storage === "server") {
      status = writer ? "error" : "saved";
      emit();
    } else goLocal();
  });
  pull(true).then(() => {
    if (!writer || local) return;
    poll = setInterval(() => document.visibilityState === "visible" && pull(false), POLL_MS);
    document.addEventListener("visibilitychange", () => document.visibilityState === "visible" && pull(false));
  });
}
function stop() {
  clearInterval(poll);
  clearTimeout(timer);
  channel?.close();
  channel = null;
  started = false;
}
function save() {
  if (local) return writeLocal();
  status = "saving";
  emit();
  clearTimeout(timer);
  timer = setTimeout(() => {
    const body = state;
    fetch(endpoint(), {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body, null, 2)
    }).then((r3) => {
      if (r3.ok) synced = body.updatedAt;
      status = r3.ok ? "saved" : "error";
      emit();
    }).catch(() => {
      status = "error";
      emit();
    });
  }, 350);
}
function update(fn) {
  state = { ...fn(state), updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
  emit();
  channel?.postMessage(state);
  save();
}
function download(snapshot) {
  const json = JSON.stringify(snapshot, null, 2);
  const a3 = document.createElement("a");
  a3.href = URL.createObjectURL(new Blob([json], { type: "application/json" }));
  a3.download = `dsgn-tweaks-${snapshot.sent?.at.replace(/[:.]/g, "-")}.json`;
  a3.click();
  setTimeout(() => URL.revokeObjectURL(a3.href), 1e3);
  navigator.clipboard?.writeText(json).catch(() => {
  });
}
async function send() {
  const at = (/* @__PURE__ */ new Date()).toISOString();
  const sent = { at, count: changeCount(state), fingerprint: fingerprint(state) };
  const snapshot = { ...state, sent };
  if (local) download(snapshot);
  else {
    const r3 = await fetch(endpoint("send=1"), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(snapshot, null, 2)
    });
    if (!r3.ok) throw new Error(`Send failed (${r3.status})`);
  }
  update((t3) => ({ ...t3, sent }));
}
var fingerprint = (t3) => JSON.stringify([t3.text, t3.styles, t3.tokens, t3.sections, t3.messages.map((m3) => m3.text)]);
var alreadySent = (t3) => !!t3.sent?.fingerprint && t3.sent.fingerprint === fingerprint(t3);
var isPending = (t3) => !!t3.sent && (!t3.reply || t3.reply.at < t3.sent.at);
function changeCount(t3) {
  return t3.messages.length + t3.text.length + t3.styles.reduce((n2, s3) => n2 + Object.keys(s3.props).length, 0) + Object.keys(t3.tokens.light).length + Object.keys(t3.tokens.dark).length + t3.sections.hidden.length + (t3.sections.order.length ? 1 : 0);
}

// node_modules/.pnpm/preact@11.0.0/node_modules/preact/hooks/dist/hooks.mjs
var t2;
var r2;
var u2;
var i2;
var o2 = Object.is;
var f2 = 0;
var c2 = [];
var e2 = [];
var a2 = n;
var v2 = a2.__b;
var l2 = a2.__r;
var m = a2.diffed;
var s2 = a2.__c;
var h2 = a2.unmount;
var p2 = a2.__;
function y2(n2, t3) {
  a2.__h && a2.__h(r2, n2, f2 || t3), f2 = 0;
  var u4 = r2.__H || (r2.__H = { __: [], __h: [] });
  return n2 >= u4.__.length && u4.__.push({}), u4.__[n2];
}
function d2(n2) {
  return f2 = 1, _2(G2, n2);
}
function _2(n2, u4, i3) {
  var f3 = y2(t2++, 2);
  if (f3.t = n2, !f3.__c && (f3.__ = [i3 ? i3(u4) : G2(void 0, u4), function(n3) {
    var t3 = f3.__N ? f3.__N[0] : f3.__[0], r3 = f3.t(t3, n3);
    o2(t3, r3) || (f3.__N = [r3, f3.__[1]], f3.__c.setState({}));
  }], f3.__c = r2, !r2.__f)) {
    r2.__f = true;
    var c3 = r2.shouldComponentUpdate;
    r2.shouldComponentUpdate = function(n3, t3, r3) {
      var u5 = this.__H;
      if (!u5) return true;
      var i4 = false, f4 = this.props != n3;
      if (u5.__.some(function(n4) {
        n4.__N && (i4 = true, o2(n4.__[0], n4.__N[0]) || (f4 = true));
      }), c3) {
        var e3 = c3.call(this, n3, t3, r3);
        return i4 ? e3 || f4 : e3;
      }
      return !i4 || f4;
    };
  }
  return f3.__;
}
function A2(n2, u4) {
  var i3 = y2(t2++, 3);
  !a2.__s && E2(i3.__H, u4) && (i3.__P = true, i3.__ = n2, i3.u = u4, r2.__H.__h.push(i3));
}
function F2(n2, u4) {
  var i3 = y2(t2++, 4);
  !a2.__s && E2(i3.__H, u4) && (i3.__P = false, i3.__ = n2, i3.u = u4, r2.__h.push(i3));
}
function T2(n2) {
  return f2 = 5, b2(function() {
    return { current: n2 };
  }, []);
}
function b2(n2, r3) {
  var u4 = y2(t2++, 7);
  return E2(u4.__H, r3) && (u4.__ = n2(), u4.__H = r3), u4.__;
}
function j2(n2, t3) {
  return f2 = 8, b2(function() {
    return n2;
  }, t3);
}
function w2(n2) {
  var u4 = r2.context[n2.__c], i3 = y2(t2++, 9);
  return i3.c = n2, u4 ? (null == i3.__ && (i3.__ = true, u4.sub(r2)), u4.props.value) : n2.__;
}
function g2() {
  var n2;
  do {
    for (; n2 = e2.shift(); ) try {
      C2(n2);
    } catch (t4) {
      a2.__e(t4, { __: (n2 = n2.__P) && n2.__v });
    }
    for (; n2 = c2.shift(); ) {
      var t3 = n2.__H;
      if (n2.__P && t3) try {
        t3.__h.some(C2), t3.__h.some(D2), t3.__h = [];
      } catch (r3) {
        t3.__h = [], a2.__e(r3, n2.__v);
      }
    }
  } while (e2.length);
}
a2.__b = function(n2) {
  r2 = null, v2 && v2(n2);
}, a2.__ = function(n2, t3) {
  n2 && t3.__k && t3.__k.__m && (n2.__m = t3.__k.__m), p2 && p2(n2, t3);
}, a2.__r = function(n2) {
  l2 && l2(n2), t2 = 0;
  var i3 = (r2 = n2.__c).__H;
  i3 && (u2 == r2 ? r2.__h = [] : (i3.__h.some(C2), i3.__h.some(D2), t2 = 0), i3.__h = [], i3.__.some(function(n3) {
    n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
  })), u2 = r2;
}, a2.diffed = function(n2) {
  m && m(n2);
  var t3 = n2.__c;
  t3 && t3.__H && (t3.__H.__h.length && B2(c2.push(t3)), t3.__H.__.some(function(n3) {
    n3.u && (n3.__H = n3.u);
  })), u2 = r2 = null;
}, a2.__c = function(n2, t3) {
  t3.some(function(n3) {
    try {
      n3.__h.some(C2), n3.__h = n3.__h.filter(function(n4) {
        return !n4.__ || D2(n4);
      });
    } catch (r3) {
      t3.some(function(n4) {
        n4.__h && (n4.__h = []);
      }), t3 = [], a2.__e(r3, n3.__v);
    }
  }), s2 && s2(n2, t3);
}, a2.unmount = function(n2) {
  h2 && h2(n2);
  var t3, r3, u4 = n2.__c;
  u4 && u4.__H && (u4.__H.__.some(function(u5) {
    try {
      if (u5.__P && u5.__c) {
        if (void 0 === r3) {
          for (r3 = n2.__; r3 && (!r3.__c || !r3.__c.__P); ) r3 = r3.__;
          r3 = r3 && r3.__c;
        }
        u5.__P = r3, B2(e2.push(u5));
      } else C2(u5);
    } catch (n3) {
      t3 = n3;
    }
  }), u4.__H = void 0, t3 && a2.__e(t3, u4.__v));
};
var k2 = "function" == typeof requestAnimationFrame;
function z2(n2) {
  var t3, r3 = function() {
    clearTimeout(u4), k2 && cancelAnimationFrame(t3), setTimeout(n2);
  }, u4 = setTimeout(r3, 35);
  k2 && (t3 = requestAnimationFrame(r3));
}
function B2(n2) {
  1 != n2 && i2 == a2.requestAnimationFrame || ((i2 = a2.requestAnimationFrame) || z2)(g2);
}
function C2(n2) {
  var t3 = r2, u4 = n2.__c;
  "function" == typeof u4 && (n2.__c = void 0, u4()), r2 = t3;
}
function D2(n2) {
  var t3 = r2;
  n2.__c = n2.__(), r2 = t3;
}
function E2(n2, t3) {
  return !n2 || n2.length != t3.length || t3.some(function(t4, r3) {
    return !o2(t4, n2[r3]);
  });
}
function G2(n2, t3) {
  return "function" == typeof t3 ? t3(n2) : t3;
}

// node_modules/.pnpm/preact@11.0.0/node_modules/preact/compat/dist/compat.mjs
var w3 = Object.assign;
var x3 = /^(-|f[lo].*[^se]$|g.{5,}[^ps]$|z|o[pr]|(W.{5})?[lL]i.*(t|mp)$|an|(bo|s).{4}Im|sca|m.{6}[ds]|ta|c.*[st]$|wido|ini)/;
var V2;
var T3;
var W2;
var P3 = /* @__PURE__ */ Symbol.for("react.element");
var $2 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(?!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
var z3 = /[A-Z0-9]/g;
var H2 = typeof document < "u";
var Z = /* @__PURE__ */ X(function(n2, t3, e3) {
  var r3 = n.__s || T3 ? (e3 || t3)() : t3(), o4 = d2({ t: { __: r3, u: t3 } }), i3 = o4[0].t, f3 = o4[1];
  return F2(function() {
    i3.__ = r3, i3.u = t3, B3(i3) && f3({ t: i3 });
  }, [n2, r3, t3]), A2(function() {
    return B3(i3) && f3({ t: i3 }), n2(function() {
      B3(i3) && f3({ t: i3 });
    });
  }, [n2]), r3;
});
function B3(n2) {
  try {
    return !Object.is(n2.__, n2.u());
  } catch (n3) {
    return true;
  }
}
var Y = function(n2) {
  return /fil|che|rad/.test(n2);
};
S.prototype.isReactComponent = true, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(n2) {
  Object.defineProperty(S.prototype, n2, { configurable: true, get: function() {
    return this["UNSAFE_" + n2];
  }, set: function(t3) {
    Object.defineProperty(this, n2, { configurable: true, writable: true, value: t3 });
  } });
});
var J2 = n.event;
n.event = function(n2) {
  return J2 && (n2 = J2(n2)), n2.persist = function() {
  }, n2.isPropagationStopped = function() {
    return this.cancelBubble;
  }, n2.isDefaultPrevented = function() {
    return this.defaultPrevented;
  }, n2.nativeEvent = n2;
};
var K2 = { configurable: true, get: function() {
  return this.class;
} };
var Q2 = n.vnode;
function X(n2) {
  if (!W2) {
    W2 = true;
    var t3 = n.__r;
    n.__r = function(n3) {
      t3 && t3(n3), 32 & n3.__u && (T3 = n3), V2 = n3.__c;
    };
    var e3 = n.diffed;
    n.diffed = function(n3) {
      e3 && e3(n3), V2 = null, T3 == n3 && (T3 = null);
    };
  }
  return n2;
}
n.vnode = function(t3) {
  if ("string" == typeof t3.type) !(function(t4) {
    var e4 = t4.props, r4 = t4.type, u4 = {}, o4 = -1 == r4.indexOf("-");
    for (var i3 in e4) {
      var f3 = e4[i3];
      if (!("value" == i3 && "defaultValue" in e4 && null == f3 || H2 && "children" == i3 && "noscript" == r4 || "class" == i3 || "className" == i3)) {
        if ("style" == i3 && "object" == typeof f3) {
          var c3 = void 0;
          for (var a3 in f3) "number" != typeof f3[a3] || x3.test(a3) || (c3 || (c3 = f3 = w3({}, f3)), f3[a3] += "px");
        } else if ("defaultValue" == i3 && "value" in e4 && null == e4.value) i3 = "value";
        else if ("download" == i3 && true === f3) f3 = "";
        else if ("translate" == i3 && "no" === f3) f3 = false;
        else if ("o" == i3[0] && "n" == i3[1]) {
          var l3 = i3.toLowerCase();
          "ondoubleclick" == l3 ? i3 = "ondblclick" : "onchange" != l3 || "input" != r4 && "textarea" != r4 || Y(e4.type) ? "onfocus" == l3 ? i3 = "onfocusin" : "onblur" == l3 && (i3 = "onfocusout") : l3 = i3 = "oninput", "oninput" == l3 && u4[i3 = l3] && (i3 = "oninputCapture");
        } else o4 && $2.test(i3) ? i3 = i3.replace(z3, "-$&").toLowerCase() : null === f3 && (f3 = void 0);
        u4[i3] = f3;
      }
    }
    "select" == r4 && (u4.multiple && Array.isArray(u4.value) && (u4.value = P(e4.children).forEach(function(n2) {
      n2.props.selected = -1 != u4.value.indexOf(n2.props.value);
    })), null != u4.defaultValue && (u4.value = P(e4.children).forEach(function(n2) {
      n2.props.selected = u4.multiple ? -1 != u4.defaultValue.indexOf(n2.props.value) : u4.defaultValue == n2.props.value;
    }))), e4.class && !e4.className ? (u4.class = e4.class, Object.defineProperty(u4, "className", K2)) : e4.className && (u4.class = u4.className = e4.className), t4.props = u4;
  })(t3);
  else if ("function" == typeof t3.type && ("ref" in t3.props && "prototype" in t3.type && t3.type.prototype.render && (t3.ref = t3.props.ref, delete t3.props.ref), t3.type.defaultProps)) {
    var e3 = w3({}, t3.props);
    for (var r3 in t3.type.defaultProps) void 0 === e3[r3] && (e3[r3] = t3.type.defaultProps[r3]);
    t3.props = e3;
  }
  t3.ref && !("ref" in t3.props) && Object.defineProperty(t3.props, "ref", { value: t3.ref, configurable: true, writable: true }), t3.$$typeof = P3, Q2 && Q2(t3);
};

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/shared/src/utils/mergeClasses.mjs
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/shared/src/utils/toKebabCase.mjs
var toKebabCase = (string) => string?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/shared/src/utils/toLucideIconData.mjs
function toLucideIconData(iconName, iconNode, aliases = []) {
  if (iconNode == null) {
    throw new Error("[lucide]: iconNode is required when icon name is used");
  }
  return {
    name: toKebabCase(iconName),
    size: 24,
    node: iconNode,
    ...aliases.length > 0 ? { aliases } : {}
  };
}

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/shared/src/utils/toCamelCase.mjs
var toCamelCase = (string) => {
  let out = "";
  let upperNext = false;
  for (const ch of string) {
    if (ch === "-" || ch === "_" || ch <= " ") {
      upperNext = out.length > 0;
      continue;
    }
    if (out.length === 0) {
      out += ch.toLowerCase();
    } else {
      out += upperNext ? ch.toUpperCase() : ch;
    }
    upperNext = false;
  }
  return out;
};

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/shared/src/utils/toPascalCase.mjs
var toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/shared/src/build/defaultAttributes.mjs
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/shared/src/build/buildLucideIconNode.mjs
function isDefined(value) {
  return value !== null && value !== void 0;
}
function buildLucideIconNode(icon, params = {}) {
  const attributeNames = params.attributeNames ?? {};
  const getAttributeName = (attributeName) => attributeNames[attributeName] ?? attributeName;
  const viewBoxWidth = icon.size ?? icon.width ?? defaultAttributes["width"];
  const viewBoxHeight = icon.size ?? icon.height ?? defaultAttributes["height"];
  const aliasClassNames = icon.aliases?.filter((alias) => typeof alias === "string" && alias.trim() !== "").map((alias) => `lucide-${alias}`) ?? [];
  const iconClassNames = [...icon.name ? [`lucide-${icon.name}`] : [], ...aliasClassNames];
  const classNamesFromClassName = params.className?.split(" ").filter(Boolean) ?? [];
  const className = params.includeDefaultClasses === false ? mergeClasses(...classNamesFromClassName) : mergeClasses("lucide", ...iconClassNames, ...classNamesFromClassName);
  const calculatedStrokeWidth = params.absoluteStrokeWidth ? Number(params.strokeWidth ?? defaultAttributes["stroke-width"]) * Number(icon.size ?? icon.width ?? defaultAttributes["width"]) / Number(params.size ?? params.width ?? defaultAttributes["width"]) : params.strokeWidth ?? defaultAttributes["stroke-width"];
  const attributes = {
    ...Object.entries(defaultAttributes).reduce((attrs, [attrName, value]) => {
      attrs[getAttributeName(attrName)] = value;
      return attrs;
    }, {}),
    ..."color" in params && params.color && {
      [getAttributeName("stroke")]: params.color
    },
    ..."size" in params && isDefined(params.size) && {
      [getAttributeName("width")]: params.size,
      [getAttributeName("height")]: params.size
    },
    ..."width" in params && isDefined(params.width) && {
      [getAttributeName("width")]: params.width
    },
    ..."height" in params && isDefined(params.height) && {
      [getAttributeName("height")]: params.height
    },
    [getAttributeName("stroke-width")]: calculatedStrokeWidth,
    ...className && {
      [getAttributeName("class")]: className
    },
    [getAttributeName("viewBox")]: `0 0 ${viewBoxWidth} ${viewBoxHeight}`,
    ...params.hasA11yProp === false ? {
      [getAttributeName("aria-hidden")]: "true"
    } : {},
    ..."attributes" in params && params.attributes
  };
  return [
    "svg",
    attributes,
    icon.node.map((child) => {
      const [name, attrs, children] = child;
      const nextAttrs = params.nonScalingStroke ? { [getAttributeName("vector-effect")]: "non-scaling-stroke", ...attrs } : attrs;
      return children ? [name, nextAttrs, children] : [name, nextAttrs];
    })
  ];
}

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/shared/src/utils/hasA11yProp.mjs
var hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/context.mjs
var LucideContext = R({
  size: 24,
  color: "currentColor",
  strokeWidth: 2,
  absoluteStrokeWidth: false,
  nonScalingStroke: false,
  class: ""
});
var useLucideContext = () => w2(LucideContext);

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/Icon.mjs
var Icon = ({
  color,
  size,
  width,
  height,
  strokeWidth,
  absoluteStrokeWidth,
  nonScalingStroke,
  children,
  iconNode = [],
  icon = {
    node: iconNode,
    aliases: [],
    size: 24
  },
  class: classes = "",
  ...rest
}) => {
  const {
    size: contextSize = 24,
    strokeWidth: contextStrokeWidth = 2,
    absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
    nonScalingStroke: contextNonScalingStroke = false,
    color: contextColor = "currentColor",
    class: contextClass = ""
  } = useLucideContext() ?? {};
  const [name, svgAttributes, builtIconNode = []] = buildLucideIconNode(icon, {
    color: color ?? contextColor,
    width: width ?? size ?? contextSize,
    height: height ?? size ?? contextSize,
    strokeWidth: strokeWidth ?? contextStrokeWidth,
    absoluteStrokeWidth: absoluteStrokeWidth ?? contextAbsoluteStrokeWidth,
    nonScalingStroke: nonScalingStroke ?? contextNonScalingStroke,
    className: mergeClasses(contextClass, classes),
    hasA11yProp: Boolean(children) || hasA11yProp(rest),
    attributes: rest
  });
  return k(name, { ...svgAttributes }, [
    ...builtIconNode.map(([tag, attrs]) => k(tag, attrs)),
    ...P(children)
  ]);
};

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/createLucideIcon.mjs
function createLucideIcon(iconDataOrName, iconNode, aliases = []) {
  const iconData = typeof iconDataOrName === "string" ? toLucideIconData(iconDataOrName, iconNode, aliases) : iconDataOrName;
  const Component = ({ class: classes = "", className = "", children, ...props }) => k(
    Icon,
    {
      ...props,
      icon: iconData,
      class: mergeClasses(classes, className)
    },
    children
  );
  if (iconData.name) {
    Component.displayName = toPascalCase(iconData.name);
  }
  return Component;
}

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/icons/check.mjs
var __iconData = {
  name: "check",
  size: 24,
  node: [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]
};
__iconData.node;
var Check = createLucideIcon(__iconData);

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/icons/chevron-down.mjs
var __iconData2 = {
  name: "chevron-down",
  size: 24,
  node: [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]
};
__iconData2.node;
var ChevronDown = createLucideIcon(__iconData2);

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/icons/chevron-up.mjs
var __iconData3 = {
  name: "chevron-up",
  size: 24,
  node: [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]]
};
__iconData3.node;
var ChevronUp = createLucideIcon(__iconData3);

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/icons/copy.mjs
var __iconData4 = {
  name: "copy",
  size: 24,
  node: [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ]
};
__iconData4.node;
var Copy = createLucideIcon(__iconData4);

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/icons/corner-left-up.mjs
var __iconData5 = {
  name: "corner-left-up",
  size: 24,
  node: [
    ["path", { d: "M14 9 9 4 4 9", key: "1af5af" }],
    ["path", { d: "M20 20h-7a4 4 0 0 1-4-4V4", key: "1blwi3" }]
  ]
};
__iconData5.node;
var CornerLeftUp = createLucideIcon(__iconData5);

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/icons/eye-off.mjs
var __iconData6 = {
  name: "eye-off",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
        key: "ct8e1f"
      }
    ],
    ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
    [
      "path",
      {
        d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
        key: "13bj9a"
      }
    ],
    ["path", { d: "m2 2 20 20", key: "1ooewy" }]
  ]
};
__iconData6.node;
var EyeOff = createLucideIcon(__iconData6);

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/icons/eye.mjs
var __iconData7 = {
  name: "eye",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
        key: "1nclc0"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
  ]
};
__iconData7.node;
var Eye = createLucideIcon(__iconData7);

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/icons/grid-3x3.mjs
var __iconData8 = {
  name: "grid-3x3",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M3 9h18", key: "1pudct" }],
    ["path", { d: "M3 15h18", key: "5xshup" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "M15 3v18", key: "14nvp0" }]
  ],
  aliases: ["grid", "grid-3-x-3"]
};
__iconData8.node;
var Grid3x3 = createLucideIcon(__iconData8);

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/icons/loader-circle.mjs
var __iconData9 = {
  name: "loader-circle",
  size: 24,
  node: [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]],
  aliases: ["loader-2"]
};
__iconData9.node;
var LoaderCircle = createLucideIcon(__iconData9);

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/icons/moon.mjs
var __iconData10 = {
  name: "moon",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
        key: "kfwtm"
      }
    ]
  ]
};
__iconData10.node;
var Moon = createLucideIcon(__iconData10);

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/icons/mouse-pointer-2.mjs
var __iconData11 = {
  name: "mouse-pointer-2",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z",
        key: "edeuup"
      }
    ]
  ]
};
__iconData11.node;
var MousePointer2 = createLucideIcon(__iconData11);

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/icons/panel-left.mjs
var __iconData12 = {
  name: "panel-left",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }]
  ],
  aliases: ["sidebar"]
};
__iconData12.node;
var PanelLeft = createLucideIcon(__iconData12);

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/icons/panel-right.mjs
var __iconData13 = {
  name: "panel-right",
  size: 24,
  node: [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M15 3v18", key: "14nvp0" }]
  ]
};
__iconData13.node;
var PanelRight = createLucideIcon(__iconData13);

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/icons/pen-tool.mjs
var __iconData14 = {
  name: "pen-tool",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z",
        key: "nt11vn"
      }
    ],
    [
      "path",
      {
        d: "m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18",
        key: "15qc1e"
      }
    ],
    ["path", { d: "m2.3 2.3 7.286 7.286", key: "1wuzzi" }],
    ["circle", { cx: "11", cy: "11", r: "2", key: "xmgehs" }]
  ]
};
__iconData14.node;
var PenTool = createLucideIcon(__iconData14);

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/icons/rotate-ccw.mjs
var __iconData15 = {
  name: "rotate-ccw",
  size: 24,
  node: [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ]
};
__iconData15.node;
var RotateCcw = createLucideIcon(__iconData15);

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/icons/send.mjs
var __iconData16 = {
  name: "send",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
        key: "1ffxy3"
      }
    ],
    ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
  ]
};
__iconData16.node;
var Send = createLucideIcon(__iconData16);

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/icons/square-dashed.mjs
var __iconData17 = {
  name: "square-dashed",
  size: 24,
  node: [
    ["path", { d: "M5 3a2 2 0 0 0-2 2", key: "y57alp" }],
    ["path", { d: "M19 3a2 2 0 0 1 2 2", key: "18rm91" }],
    ["path", { d: "M21 19a2 2 0 0 1-2 2", key: "1j7049" }],
    ["path", { d: "M5 21a2 2 0 0 1-2-2", key: "sbafld" }],
    ["path", { d: "M9 3h1", key: "1yesri" }],
    ["path", { d: "M9 21h1", key: "15o7lz" }],
    ["path", { d: "M14 3h1", key: "1ec4yj" }],
    ["path", { d: "M14 21h1", key: "v9vybs" }],
    ["path", { d: "M3 9v1", key: "1r0deq" }],
    ["path", { d: "M21 9v1", key: "mxsmne" }],
    ["path", { d: "M3 14v1", key: "vnatye" }],
    ["path", { d: "M21 14v1", key: "169vum" }]
  ],
  aliases: ["box-select"]
};
__iconData17.node;
var SquareDashed = createLucideIcon(__iconData17);

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/icons/sun.mjs
var __iconData18 = {
  name: "sun",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
    ["path", { d: "M12 2v2", key: "tus03m" }],
    ["path", { d: "M12 20v2", key: "1lh1kg" }],
    ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
    ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
    ["path", { d: "M2 12h2", key: "1t8f8n" }],
    ["path", { d: "M20 12h2", key: "1q8mjw" }],
    ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
    ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
  ]
};
__iconData18.node;
var Sun = createLucideIcon(__iconData18);

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/icons/type.mjs
var __iconData19 = {
  name: "type",
  size: 24,
  node: [
    ["path", { d: "M12 4v16", key: "1654pz" }],
    ["path", { d: "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2", key: "e0r10z" }],
    ["path", { d: "M9 20h6", key: "s66wpe" }]
  ]
};
__iconData19.node;
var Type = createLucideIcon(__iconData19);

// node_modules/.pnpm/lucide-preact@1.52.0_preact@11.0.0/node_modules/lucide-preact/dist/esm/icons/x.mjs
var __iconData20 = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
__iconData20.node;
var X2 = createLucideIcon(__iconData20);

// src/core/location.ts
var EVENT = "dsgn-tweaks:location";
var patched = false;
function patchHistory() {
  if (patched) return;
  patched = true;
  for (const method of ["pushState", "replaceState"]) {
    const original = history[method];
    history[method] = function(...args) {
      const result = original.apply(this, args);
      window.dispatchEvent(new Event(EVENT));
      return result;
    };
  }
}
function subscribeLocation(listener) {
  patchHistory();
  window.addEventListener("popstate", listener);
  window.addEventListener(EVENT, listener);
  return () => {
    window.removeEventListener("popstate", listener);
    window.removeEventListener(EVENT, listener);
  };
}
var getSearch = () => window.location.search;
function navigate(url) {
  const viaRouter = getConfig().navigate;
  if (viaRouter) viaRouter(url);
  else window.location.assign(url);
}

// src/core/engine.ts
var EDGE_LABELS = { header: "Header", footer: "Footer" };
var editing = false;
var isEditing = () => editing;
var setEditing = (on) => {
  editing = on;
};
var norm = (s3) => s3.replace(/\s+/g, " ").trim();
function isDesignUi(node) {
  const el = node && (node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement);
  return !!el?.closest("[data-design-ui]");
}
var designRoot = () => document.querySelector("[data-design-root]") ?? document.querySelector("main");
function sectionKey(el) {
  const index = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
  return el.getAttribute("data-design-section") || el.id || `section-${index + 1}`;
}
var words = (key) => key.replace(/[-_]+/g, " ").replace(/^\w/, (c3) => c3.toUpperCase());
function sectionLabelOf(el, key) {
  const own = el.getAttribute("data-design-label");
  if (own) return own;
  if (el.getAttribute("data-design-section") || el.id) return words(key);
  const heading = el.querySelector("h1, h2, h3")?.textContent?.replace(/\s+/g, " ").trim();
  return heading ? heading.slice(0, 32) : words(key);
}
function edges(root) {
  const outside = (el) => !root?.contains(el);
  const header = Array.from(document.querySelectorAll("header")).find(outside) ?? null;
  const footer = Array.from(document.querySelectorAll("footer")).filter(outside).pop() ?? null;
  return { header, footer };
}
function listSections() {
  return Array.from(designRoot()?.children ?? []).filter((el) => !el.closest("[data-design-ui]")).map((el) => {
    const key = sectionKey(el);
    return { key, label: sectionLabelOf(el, key) };
  });
}
function sectionLabel(key) {
  return EDGE_LABELS[key] ?? listSections().find((s3) => s3.key === key)?.label ?? key;
}
function scopes() {
  const root = designRoot();
  const { header, footer } = edges(root);
  const out = [];
  if (header) out.push({ key: "header", root: header });
  for (const el of Array.from(root?.children ?? [])) out.push({ key: sectionKey(el), root: el });
  if (footer) out.push({ key: "footer", root: footer });
  return out;
}
function scopeOf(node) {
  return scopes().find((s3) => s3.root.contains(node)) ?? null;
}
var rootFor = (key) => scopes().find((s3) => s3.key === key)?.root ?? null;
function layoutFor(scope) {
  const exploration = getConfig().explorations?.find((e3) => (e3.section ?? e3.param) === scope);
  if (!exploration) return void 0;
  const params = new URLSearchParams(window.location.search);
  return `${exploration.param}:${params.get(exploration.param) ?? exploration.options[0]?.id ?? ""}`;
}
var touched = /* @__PURE__ */ new Set();
var scanned = false;
var origOf = (n2) => n2.__designOrig ?? n2.data;
function forget(n2) {
  touched.delete(n2);
  delete n2.__designOrig;
  delete n2.__designApplied;
}
function rescan() {
  scanned = true;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const n2 = walker.currentNode;
    if (n2.__designOrig !== void 0) touched.add(n2);
  }
}
function textNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n2) => {
      const p3 = n2.parentElement;
      if (!p3 || p3.closest("script, style, [data-design-ui], [data-design-editing]")) return NodeFilter.FILTER_REJECT;
      return origOf(n2).trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  const out = [];
  while (walker.nextNode()) out.push(walker.currentNode);
  return out;
}
function locateText(node) {
  const scope = scopeOf(node);
  if (!scope) return null;
  const original = norm(origOf(node));
  let nth = 0;
  for (const n2 of textNodes(scope.root)) {
    if (n2 === node) break;
    if (norm(origOf(n2)) === original) nth++;
  }
  return { scope: scope.key, original, nth, tag: node.parentElement?.tagName.toLowerCase() ?? "", layout: layoutFor(scope.key) };
}
var withValue = (raw, value) => `${raw.match(/^\s*/)?.[0] ?? ""}${value}${raw.match(/\s*$/)?.[0] ?? ""}`;
function setRaw(n2, raw) {
  if (n2.data !== raw) n2.data = raw;
}
function applyText(edits) {
  if (!scanned) rescan();
  for (const n2 of touched) if (!n2.isConnected || n2.data !== n2.__designApplied) forget(n2);
  const desired = /* @__PURE__ */ new Map();
  const byScope = /* @__PURE__ */ new Map();
  for (const e3 of edits) byScope.set(e3.scope, [...byScope.get(e3.scope) ?? [], e3]);
  for (const [scope, list] of byScope) {
    const root = rootFor(scope);
    if (!root) continue;
    const nodes = textNodes(root);
    const layout = layoutFor(scope);
    for (const e3 of list) {
      const matches = nodes.filter((n2) => norm(origOf(n2)) === e3.original);
      const target = !e3.layout || e3.layout === layout ? matches[e3.nth] : matches.length === 1 ? matches[0] : void 0;
      if (target) desired.set(target, e3.value);
    }
  }
  for (const n2 of touched) {
    if (desired.has(n2)) continue;
    setRaw(n2, origOf(n2));
    forget(n2);
  }
  for (const [n2, value] of desired) {
    n2.__designOrig ??= n2.data;
    const raw = withValue(n2.__designOrig, value);
    setRaw(n2, raw);
    n2.__designApplied = raw;
    touched.add(n2);
  }
}
function textNodeAt(x4, y3) {
  const doc = document;
  const node = doc.caretPositionFromPoint?.(x4, y3)?.offsetNode ?? doc.caretRangeFromPoint?.(x4, y3)?.startContainer;
  if (!node || node.nodeType !== Node.TEXT_NODE || !node.data.trim() || isDesignUi(node)) return null;
  if (!scopeOf(node)) return null;
  const range = document.createRange();
  range.selectNodeContents(node);
  const hit = Array.from(range.getClientRects()).some((r3) => x4 >= r3.left - 2 && x4 <= r3.right + 2 && y3 >= r3.top - 2 && y3 <= r3.bottom + 2);
  return hit ? node : null;
}
function textRect(node) {
  const range = document.createRange();
  range.selectNodeContents(node);
  return range.getBoundingClientRect();
}
function editInline(node, done) {
  const parent = node.parentNode;
  if (!parent) return;
  const raw = node.data;
  const span = document.createElement("span");
  span.setAttribute("data-design-editing", "");
  span.textContent = raw;
  try {
    span.contentEditable = "plaintext-only";
  } catch {
    span.contentEditable = "true";
  }
  Object.assign(span.style, {
    outline: "1.5px solid #0d99ff",
    outlineOffset: "2px",
    borderRadius: "1px",
    userSelect: "text",
    webkitUserSelect: "text",
    cursor: "text",
    caretColor: "#0d99ff"
  });
  editing = true;
  node.data = "";
  parent.insertBefore(span, node);
  span.focus();
  const range = document.createRange();
  range.selectNodeContents(span);
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);
  let finished = false;
  const finish = (commit) => {
    if (finished) return;
    finished = true;
    const value = norm(span.textContent ?? "");
    span.remove();
    node.data = raw;
    editing = false;
    done(commit && value ? value : null);
  };
  span.addEventListener("keydown", (e3) => {
    e3.stopPropagation();
    if (e3.key === "Enter") {
      e3.preventDefault();
      finish(true);
    } else if (e3.key === "Escape") {
      e3.preventDefault();
      finish(false);
    }
  });
  span.addEventListener("keyup", (e3) => e3.stopPropagation());
  span.addEventListener("blur", () => finish(true));
}
function pathOf(root, el) {
  const steps = [];
  let cur = el;
  while (cur !== root && cur.parentElement) {
    steps.unshift({ i: Array.from(cur.parentElement.children).indexOf(cur), tag: cur.tagName.toLowerCase() });
    cur = cur.parentElement;
  }
  return steps;
}
function resolvePath(root, path) {
  let cur = root;
  for (const s3 of path) {
    const next = cur.children[s3.i];
    if (!next || next.tagName.toLowerCase() !== s3.tag) return null;
    cur = next;
  }
  return cur;
}
function locateElement(el) {
  const scope = scopeOf(el);
  if (!scope) return null;
  return { scope: scope.key, path: pathOf(scope.root, el), layout: layoutFor(scope.key) };
}
var samePlace = (a3, b3) => a3.scope === b3.scope && a3.layout === b3.layout && JSON.stringify(a3.path) === JSON.stringify(b3.path);
var styled = /* @__PURE__ */ new Map();
var prior = /* @__PURE__ */ new WeakMap();
function applyStyles(edits) {
  const desired = /* @__PURE__ */ new Map();
  for (const e3 of edits) {
    if (e3.layout && e3.layout !== layoutFor(e3.scope)) continue;
    const root = rootFor(e3.scope);
    const el = root && resolvePath(root, e3.path);
    if (el?.style) desired.set(el, { ...desired.get(el), ...e3.props });
  }
  for (const [el, props] of styled) {
    const want = desired.get(el);
    for (const p3 of props) {
      if (want && p3 in want) continue;
      const before = prior.get(el)?.[p3];
      if (before) el.style.setProperty(p3, before);
      else el.style.removeProperty(p3);
    }
    if (!want || !el.isConnected) styled.delete(el);
  }
  for (const [el, props] of desired) {
    const before = prior.get(el) ?? {};
    for (const [p3, v3] of Object.entries(props)) {
      if (!(p3 in before)) before[p3] = el.style.getPropertyValue(p3);
      el.style.setProperty(p3, v3);
    }
    prior.set(el, before);
    styled.set(el, new Set(Object.keys(props)));
  }
}
function applySections({ order, hidden }) {
  const root = designRoot();
  if (root) {
    root.style.display = order.length ? "flex" : "";
    root.style.flexDirection = order.length ? "column" : "";
    for (const kid of Array.from(root.children)) {
      if (kid.closest("[data-design-ui]")) continue;
      const key = sectionKey(kid);
      const at = order.indexOf(key);
      kid.style.order = order.length ? String(at < 0 ? 99 : at) : "";
      kid.style.display = hidden.includes(key) ? "none" : "";
    }
  }
  const { header, footer } = edges(root);
  if (header) header.style.display = hidden.includes("header") ? "none" : "";
  if (footer) footer.style.display = hidden.includes("footer") ? "none" : "";
}
var SAFE = /^[#\w\s(),.%-]+$/;
function applyTokens(tokens) {
  const block = (selector, values) => {
    const decls = Object.entries(values).filter(([, v3]) => SAFE.test(v3)).flatMap(([k3, v3]) => {
      const aliases = getConfig().tokens?.find((t3) => t3.key === k3)?.aliases ?? [];
      return [k3, ...aliases].map((name) => `--color-${name}:${v3};`);
    });
    return decls.length ? `${selector}{${decls.join("")}}` : "";
  };
  let el = document.getElementById("dsgn-tweaks-tokens");
  if (!el) {
    el = document.createElement("style");
    el.id = "dsgn-tweaks-tokens";
    document.head.appendChild(el);
  }
  const { light, dark } = themeSelectors();
  el.textContent = block(light, tokens.light) + block(dark, tokens.dark);
}
function applyAll(t3) {
  if (editing) return;
  applyTokens(t3.tokens);
  applySections(t3.sections);
  applyText(t3.text);
  applyStyles(t3.styles);
}
function writeText(node, raw) {
  node.data = raw;
}
var isDark = isDarkTheme;
var setTheme = writeTheme;
function pageStyle(css) {
  let el = document.getElementById("dsgn-tweaks-page");
  if (!el) {
    el = document.createElement("style");
    el.id = "dsgn-tweaks-page";
    document.head.appendChild(el);
  }
  el.textContent = css;
  return () => el.remove();
}

// node_modules/.pnpm/preact@11.0.0/node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var o3 = 0;
function u3(t3, e3, n2, f3, u4, i3) {
  e3 || (e3 = {});
  var a3, c3, l3 = e3;
  if ("ref" in l3 && "function" != typeof t3) for (c3 in l3 = {}, e3) "ref" == c3 ? a3 = e3[c3] : l3[c3] = e3[c3];
  var p3 = { type: t3, props: l3, key: n2, ref: a3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --o3, __i: -1, __u: 0 };
  return (u4 || i3) && (p3.__source = u4, p3.__self = i3), n.vnode && n.vnode(p3), p3;
}

// src/panel/Panel.tsx
var VIEWPORTS = [0, 390, 768, 1024, 1280, 1440];
var OPEN_KEY = "dsgn-tweaks-open";
var BLUE = "#0d99ff";
var uid = () => Math.random().toString(36).slice(2, 10);
function useSearch() {
  const search = Z(subscribeLocation, getSearch);
  return new URLSearchParams(search);
}
var subscribeResize = (cb) => {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
};
var subscribeTheme = (cb) => {
  const o4 = new MutationObserver(cb);
  o4.observe(document.documentElement, { attributes: true, attributeFilter: [themeAttribute()] });
  return () => o4.disconnect();
};
var cn = (...parts) => parts.filter(Boolean).join(" ");
var agent = () => getConfig().agentName ?? "Claude";
function breakpoint(w4) {
  return w4 >= 1536 ? "2xl" : w4 >= 1280 ? "xl" : w4 >= 1024 ? "lg" : w4 >= 768 ? "md" : w4 >= 640 ? "sm" : "base";
}
function describe(el) {
  const text = norm(el.textContent ?? "").slice(0, 36);
  return `${el.tagName.toLowerCase()}${text ? ` \xB7 \u201C${text}${text.length === 36 ? "\u2026" : ""}\u201D` : ""}`;
}
function App({ framed }) {
  const tweaks = Z(subscribe, getTweaks);
  useEngine(tweaks, framed);
  if (framed) return null;
  return /* @__PURE__ */ u3(DesignPanel, { tweaks });
}
function useEngine(tweaks, framed) {
  const latest = T2(tweaks);
  A2(() => {
    start(!framed);
  }, [framed]);
  A2(() => {
    latest.current = tweaks;
    applyAll(tweaks);
  }, [tweaks]);
  A2(() => {
    let frame = 0;
    const observer = new MutationObserver((records) => {
      if (isEditing() || records.every((r3) => isDesignUi(r3.target))) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => applyAll(latest.current));
    });
    observer.observe(document.body, { subtree: true, childList: true, characterData: true });
    const onStorage = (e3) => {
      if (framed && e3.key && e3.key === getConfig().theme?.storageKey) setTheme(e3.newValue === "dark" ? "dark" : "light");
    };
    window.addEventListener("storage", onStorage);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("storage", onStorage);
    };
  }, [framed]);
}
function DesignPanel({ tweaks }) {
  const params = useSearch();
  const pathname = window.location.pathname;
  const status2 = Z(subscribe, getStatus);
  const width = Z(subscribeResize, () => window.innerWidth, () => 0);
  const [open, setOpenState] = d2(() => {
    try {
      return localStorage.getItem(OPEN_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [tab, setTab] = d2("layout");
  const [mode, setMode] = d2(null);
  const [grid, setGrid] = d2(false);
  const [outline, setOutline] = d2(false);
  const [viewport, setViewport] = d2(0);
  const [side, setSide] = d2("right");
  const [selected, setSelectedState] = d2(null);
  const [svgEdit, setSvgEdit] = d2(null);
  const hoverBox = T2(null);
  const selBox = T2(null);
  const setOpen = j2((next) => {
    setOpenState(next);
    if (!next) setMode(null);
    try {
      localStorage.setItem(OPEN_KEY, next ? "1" : "0");
    } catch {
    }
  }, []);
  const select = j2((el) => {
    setSelectedState((s3) => el ? { el, n: (s3?.n ?? 0) + 1 } : null);
    if (el) setTab("element");
  }, []);
  const pickLayout = j2(
    (key, id, fallback) => {
      const next = new URLSearchParams(params.toString());
      if (id === fallback) next.delete(key);
      else next.set(key, id);
      const query = next.toString();
      navigate(`${pathname}${query ? `?${query}` : ""}#${key}`);
      document.getElementById(key)?.scrollIntoView({ block: "start" });
      update((t3) => ({ ...t3, layout: { ...t3.layout, [key]: id } }));
    },
    [params, pathname]
  );
  const restored = T2(false);
  A2(() => {
    if (status2 !== "saved" && status2 !== "local" || restored.current) return;
    restored.current = true;
    const t3 = getTweaks();
    const next = new URLSearchParams(params.toString());
    let changed = false;
    for (const { param: key, options } of getConfig().explorations ?? []) {
      const fallback = options[0]?.id;
      if (!fallback) continue;
      const fromUrl = params.get(key);
      if (fromUrl && fromUrl !== t3.layout[key]) update((s3) => ({ ...s3, layout: { ...s3.layout, [key]: fromUrl } }));
      if (!fromUrl && t3.layout[key] && t3.layout[key] !== fallback) {
        next.set(key, t3.layout[key]);
        changed = true;
      }
    }
    if (changed) navigate(`${pathname}?${next.toString()}`);
  }, [status2, params, pathname]);
  const commitText = j2((loc, value) => {
    if (value === null) return;
    update((t3) => {
      const same = (e3) => e3.scope === loc.scope && e3.original === loc.original && e3.nth === loc.nth && e3.layout === loc.layout;
      const rest = t3.text.filter((e3) => !same(e3));
      return { ...t3, text: value === loc.original ? rest : [...rest, { id: uid(), ...loc, value }] };
    });
  }, []);
  const startTextEdit = j2(
    (node) => {
      const loc = locateText(node);
      if (!loc) return;
      if (node.parentElement instanceof SVGElement) {
        const r3 = textRect(node);
        setEditing(true);
        setSvgEdit({ node, loc, raw: node.data, left: r3.left, top: r3.bottom + 6 });
        return;
      }
      editInline(node, (value) => commitText(loc, value));
    },
    [commitText]
  );
  const finishSvgEdit = (value) => {
    if (!svgEdit) return;
    writeText(svgEdit.node, svgEdit.raw);
    setEditing(false);
    setSvgEdit(null);
    commitText(svgEdit.loc, value ? norm(value) : null);
  };
  A2(() => {
    if (!mode) return;
    const root = document.documentElement;
    root.dataset.designMode = mode;
    const show = (r3, label = "") => {
      const box = hoverBox.current;
      if (!box) return;
      box.style.display = r3 ? "block" : "none";
      if (!r3) return;
      Object.assign(box.style, { left: `${r3.left}px`, top: `${r3.top}px`, width: `${r3.width}px`, height: `${r3.height}px` });
      box.dataset.label = label;
    };
    const elementAt = (x4, y3) => {
      const el = document.elementFromPoint(x4, y3);
      return el && !isDesignUi(el) && scopeOf(el) ? el : null;
    };
    const onMove = (e3) => {
      if (isEditing()) return show(null);
      if (mode === "text") {
        const n2 = textNodeAt(e3.clientX, e3.clientY);
        show(n2 ? textRect(n2) : null, "Click to edit");
      } else {
        const el = elementAt(e3.clientX, e3.clientY);
        show(el?.getBoundingClientRect() ?? null, el ? describe(el) : "");
      }
    };
    const onClick = (e3) => {
      const target = e3.target;
      if (isDesignUi(target)) return;
      e3.preventDefault();
      e3.stopPropagation();
      if (isEditing() || target.closest?.("[data-design-editing]")) return;
      if (mode === "text") {
        const n2 = textNodeAt(e3.clientX, e3.clientY);
        if (n2) {
          show(null);
          startTextEdit(n2);
        }
      } else {
        const el = elementAt(e3.clientX, e3.clientY);
        if (el) select(el);
      }
    };
    const onScroll = () => show(null);
    window.addEventListener("pointermove", onMove, true);
    window.addEventListener("click", onClick, true);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      window.removeEventListener("pointermove", onMove, true);
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("scroll", onScroll, true);
      delete root.dataset.designMode;
      show(null);
    };
  }, [mode, select, startTextEdit]);
  A2(() => {
    if (!selected) return;
    let frame = 0;
    const tick = () => {
      const box = selBox.current;
      if (!selected.el.isConnected) return select(null);
      if (box) {
        const r3 = selected.el.getBoundingClientRect();
        Object.assign(box.style, { left: `${r3.left}px`, top: `${r3.top}px`, width: `${r3.width}px`, height: `${r3.height}px` });
      }
      frame = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(frame);
  }, [selected, select]);
  A2(() => {
    const root = document.documentElement;
    if (outline) root.dataset.designOutline = "";
    else delete root.dataset.designOutline;
  }, [outline]);
  A2(() => {
    const onKey = (e3) => {
      const target = e3.composedPath()[0] ?? e3.target;
      if (isEditing() || target.closest?.("input, textarea, select, [contenteditable]")) return;
      if (e3.altKey && e3.code === "KeyD") {
        e3.preventDefault();
        setOpen(!open);
        return;
      }
      if (!open || e3.metaKey || e3.ctrlKey || e3.altKey) return;
      const toggles = {
        KeyT: () => setMode((m3) => m3 === "text" ? null : "text"),
        KeyI: () => setMode((m3) => m3 === "inspect" ? null : "inspect"),
        KeyG: () => setGrid((g3) => !g3),
        KeyO: () => setOutline((o4) => !o4),
        Escape: () => {
          if (viewport) setViewport(0);
          else if (mode) setMode(null);
          else select(null);
        }
      };
      const run = toggles[e3.code] ?? (e3.key === "Escape" ? toggles.Escape : void 0);
      if (run) {
        e3.preventDefault();
        run();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, mode, viewport, setOpen, select]);
  A2(
    () => pageStyle(`
        html[data-design-outline] body *:not(dsgn-tweaks-root){outline:1px solid ${BLUE}55!important;outline-offset:-1px}
        html[data-design-mode="text"] body *:not(dsgn-tweaks-root){cursor:text!important}
        html[data-design-mode="inspect"] body *:not(dsgn-tweaks-root){cursor:crosshair!important}
      `),
    []
  );
  const count = changeCount(tweaks);
  const previewQuery = new URLSearchParams(params.toString());
  previewQuery.set("design", "frame");
  const scale = viewport ? Math.min(1, (width - 48) / viewport) : 1;
  return /* @__PURE__ */ u3("div", { "data-design-ui": true, className: "font-sans text-[12px] text-[#e6e6e6] antialiased", children: [
    /* @__PURE__ */ u3(
      "div",
      {
        ref: hoverBox,
        className: "pointer-events-none fixed z-[2147483640] hidden rounded-[2px] border border-dashed border-[#0d99ff] bg-[#0d99ff]/[0.06] after:absolute after:-top-5 after:left-0 after:whitespace-nowrap after:rounded-[2px] after:bg-[#0d99ff] after:px-1.5 after:py-0.5 after:font-mono after:text-[10px] after:leading-none after:text-white after:content-[attr(data-label)]"
      }
    ),
    selected && !viewport && /* @__PURE__ */ u3("div", { ref: selBox, className: "pointer-events-none fixed z-[2147483641] rounded-[2px] border-[1.5px] border-[#0d99ff]" }),
    /* @__PURE__ */ u3("datalist", { id: "design-token-colors", children: tokenSuggestions().map((t3) => /* @__PURE__ */ u3("option", { value: t3 }, t3)) }),
    grid && /* @__PURE__ */ u3(GridOverlay, {}),
    viewport > 0 && /* @__PURE__ */ u3("div", { className: "pointer-events-auto fixed inset-0 z-[2147483630] flex flex-col items-center overflow-hidden bg-[#0b0b0b]/85 pt-6 backdrop-blur-sm", children: [
      /* @__PURE__ */ u3("p", { className: "mb-3 font-mono text-[11px] text-white/60", children: [
        viewport,
        "px",
        scale < 1 ? ` \xB7 shown at ${Math.round(scale * 100)}%` : "",
        " \xB7 edits sync live \xB7 Esc to close"
      ] }),
      /* @__PURE__ */ u3("div", { style: { width: viewport * scale, height: `calc(100vh - 64px)` }, children: /* @__PURE__ */ u3(
        "iframe",
        {
          title: `Preview at ${viewport}px`,
          src: `${pathname}?${previewQuery.toString()}`,
          style: { width: viewport, height: `calc((100vh - 64px) / ${scale})`, transform: `scale(${scale})`, transformOrigin: "0 0" },
          className: "rounded-[6px] bg-white shadow-[0_24px_80px_#000a]"
        }
      ) })
    ] }),
    svgEdit && /* @__PURE__ */ u3(
      "input",
      {
        ref: (el) => {
          if (el && !el.dataset.ready) {
            el.dataset.ready = "1";
            el.value = norm(svgEdit.raw);
            el.focus();
          }
        },
        onInput: (e3) => {
          writeText(svgEdit.node, withValue(svgEdit.raw, e3.currentTarget.value));
        },
        onBlur: (e3) => finishSvgEdit(e3.currentTarget.value),
        onKeyDown: (e3) => {
          if (e3.key === "Enter") e3.currentTarget.blur();
          if (e3.key === "Escape") finishSvgEdit(null);
        },
        style: { left: svgEdit.left, top: svgEdit.top },
        className: "pointer-events-auto fixed z-[2147483645] h-8 w-64 rounded-[4px] border border-[#0d99ff] bg-[#1e1e1e] px-2 text-[13px] text-white shadow-lg outline-none"
      }
    ),
    !open ? /* @__PURE__ */ u3(
      "button",
      {
        type: "button",
        onClick: () => setOpen(true),
        title: "Design panel (\u2325D)",
        className: cn(
          "pointer-events-auto fixed bottom-4 z-[2147483646] flex h-9 items-center gap-2 rounded-full bg-[#1e1e1e] pl-3 pr-3.5 font-medium shadow-[0_8px_24px_#0005] ring-1 ring-white/10 hover:bg-[#2a2a2a]",
          side === "right" ? "right-4" : "left-4"
        ),
        children: [
          /* @__PURE__ */ u3(PenTool, { className: "size-3.5", style: { color: BLUE }, "aria-hidden": true }),
          "Design",
          count > 0 && /* @__PURE__ */ u3("span", { className: "rounded-full bg-[#0d99ff] px-1.5 text-[10px] font-semibold text-white", children: count })
        ]
      }
    ) : /* @__PURE__ */ u3(
      "aside",
      {
        "aria-label": "Design panel",
        className: cn(
          "pointer-events-auto fixed bottom-3 top-3 z-[2147483646] flex w-[320px] max-w-[calc(100vw-24px)] flex-col overflow-hidden rounded-[8px] bg-[#1e1e1e] shadow-[0_16px_48px_#0007] ring-1 ring-white/10",
          side === "right" ? "right-3" : "left-3"
        ),
        children: [
          /* @__PURE__ */ u3("header", { className: "flex items-center gap-2 border-b border-white/10 px-3 py-2.5", children: [
            /* @__PURE__ */ u3(PenTool, { className: "size-3.5", style: { color: BLUE }, "aria-hidden": true }),
            /* @__PURE__ */ u3("span", { className: "font-semibold", children: "Design" }),
            /* @__PURE__ */ u3("span", { className: "font-mono text-[10px] text-white/40", children: [
              width,
              "px \xB7 ",
              breakpoint(width)
            ] }),
            /* @__PURE__ */ u3("span", { className: "ml-auto" }),
            /* @__PURE__ */ u3(IconButton, { label: side === "right" ? "Dock left" : "Dock right", onClick: () => setSide(side === "right" ? "left" : "right"), children: side === "right" ? /* @__PURE__ */ u3(PanelLeft, {}) : /* @__PURE__ */ u3(PanelRight, {}) }),
            /* @__PURE__ */ u3(IconButton, { label: "Close (\u2325D)", onClick: () => setOpen(false), children: /* @__PURE__ */ u3(X2, {}) })
          ] }),
          /* @__PURE__ */ u3("div", { className: "flex items-center gap-1 border-b border-white/10 px-2 py-1.5", children: [
            /* @__PURE__ */ u3(Toggle, { on: mode === "text", label: "Edit text (T)", onClick: () => setMode(mode === "text" ? null : "text"), children: /* @__PURE__ */ u3(Type, {}) }),
            /* @__PURE__ */ u3(Toggle, { on: mode === "inspect", label: "Inspect (I)", onClick: () => setMode(mode === "inspect" ? null : "inspect"), children: /* @__PURE__ */ u3(MousePointer2, {}) }),
            /* @__PURE__ */ u3("span", { className: "mx-1 h-4 w-px bg-white/10" }),
            /* @__PURE__ */ u3(Toggle, { on: grid, label: "Column grid (G)", onClick: () => setGrid(!grid), children: /* @__PURE__ */ u3(Grid3x3, {}) }),
            /* @__PURE__ */ u3(Toggle, { on: outline, label: "Outline boxes (O)", onClick: () => setOutline(!outline), children: /* @__PURE__ */ u3(SquareDashed, {}) }),
            /* @__PURE__ */ u3(
              "select",
              {
                "aria-label": "Preview width",
                value: viewport,
                onChange: (e3) => {
                  setMode(null);
                  setViewport(Number(e3.currentTarget.value));
                },
                className: "ml-auto h-7 rounded-[4px] bg-white/5 px-1.5 text-[11px] text-white/80 outline-none hover:bg-white/10",
                children: VIEWPORTS.map((v3) => /* @__PURE__ */ u3("option", { value: v3, children: v3 ? `Preview ${v3}` : "This window" }, v3))
              }
            )
          ] }),
          mode && /* @__PURE__ */ u3("p", { className: "border-b border-white/10 bg-[#0d99ff]/10 px-3 py-2 text-[11px] text-[#9fd3ff]", children: mode === "text" ? "Click any text on the page to edit it. Enter saves, Esc cancels." : "Click anything on the page to inspect it. Esc stops." }),
          /* @__PURE__ */ u3("nav", { className: "grid grid-cols-4 border-b border-white/10 text-[11px]", children: ["layout", "element", "theme", "changes"].map((t3) => /* @__PURE__ */ u3(
            "button",
            {
              type: "button",
              onClick: () => setTab(t3),
              className: cn("h-8 capitalize transition-colors", tab === t3 ? "text-white shadow-[inset_0_-2px_0_#0d99ff]" : "text-white/50 hover:text-white/80"),
              children: [
                t3,
                t3 === "changes" && count > 0 && /* @__PURE__ */ u3("span", { className: "ml-1 text-[#0d99ff]", children: count })
              ]
            },
            t3
          )) }),
          /* @__PURE__ */ u3("div", { className: "min-h-0 flex-1 overflow-y-auto", children: [
            tab === "layout" && /* @__PURE__ */ u3(LayoutTab, { tweaks, params, onPick: pickLayout }),
            tab === "element" && (selected ? /* @__PURE__ */ u3(ElementTab, { el: selected.el, tweaks, width, onSelect: select }, selected.n) : /* @__PURE__ */ u3(Empty, { children: [
              "Turn on ",
              /* @__PURE__ */ u3("b", { className: "text-white", children: "Inspect" }),
              " (I) and click anything on the page to change its type, spacing, size or colour."
            ] })),
            tab === "theme" && /* @__PURE__ */ u3(ThemeTab, { tweaks }),
            tab === "changes" && /* @__PURE__ */ u3(ChangesTab, { tweaks })
          ] }),
          /* @__PURE__ */ u3(SendBar, { tweaks, status: status2 })
        ]
      }
    )
  ] });
}
function LayoutTab({
  tweaks,
  params,
  onPick
}) {
  const rows = [...getConfig().explorations ?? []];
  const SECTIONS = listSections().map((s3) => s3.key);
  const { order, hidden } = tweaks.sections;
  const current2 = order.length ? [...order.filter((k3) => SECTIONS.includes(k3)), ...SECTIONS.filter((k3) => !order.includes(k3))] : [...SECTIONS];
  const setSections = (next) => update((t3) => {
    const merged = { ...t3.sections, ...next };
    if (merged.order.join() === SECTIONS.join()) merged.order = [];
    return { ...t3, sections: merged };
  });
  const move = (i3, by) => {
    const next = [...current2];
    [next[i3], next[i3 + by]] = [next[i3 + by], next[i3]];
    setSections({ order: next });
  };
  const toggle = (key) => setSections({ hidden: hidden.includes(key) ? hidden.filter((k3) => k3 !== key) : [...hidden, key] });
  return /* @__PURE__ */ u3(x, { children: [
    rows.map((row) => {
      const active = params.get(row.param) ?? row.options[0]?.id;
      return /* @__PURE__ */ u3(Group, { title: `${row.label} layout`, children: /* @__PURE__ */ u3("div", { className: "grid gap-0.5", children: row.options.map((o4, i3) => /* @__PURE__ */ u3(
        "button",
        {
          type: "button",
          onClick: () => onPick(row.param, o4.id, row.options[0].id),
          className: cn(
            "flex h-7 items-center gap-2 rounded-[4px] px-2 text-left transition-colors",
            active === o4.id ? "bg-[#0d99ff]/15 text-white" : "text-white/70 hover:bg-white/5"
          ),
          children: [
            /* @__PURE__ */ u3("span", { className: cn("font-mono text-[10px]", active === o4.id ? "text-[#0d99ff]" : "text-white/35"), children: i3 + 1 }),
            o4.label,
            i3 === 0 && /* @__PURE__ */ u3("span", { className: "ml-auto text-[10px] text-white/35", children: "on site" })
          ]
        },
        o4.id
      )) }) }, row.param);
    }),
    /* @__PURE__ */ u3(
      Group,
      {
        title: "Sections",
        action: (order.length > 0 || hidden.length > 0) && /* @__PURE__ */ u3(IconButton, { label: "Reset order and visibility", onClick: () => setSections({ order: [], hidden: [] }), children: /* @__PURE__ */ u3(RotateCcw, {}) }),
        children: /* @__PURE__ */ u3("ul", { className: "grid gap-0.5", children: ["header", ...current2, "footer"].map((key) => {
          const i3 = current2.indexOf(key);
          const fixed = i3 < 0;
          const off = hidden.includes(key);
          return /* @__PURE__ */ u3("li", { className: "group flex h-7 items-center gap-1 rounded-[4px] px-2 hover:bg-white/5", children: [
            /* @__PURE__ */ u3("span", { className: cn("flex-1", off ? "text-white/30 line-through" : "text-white/80"), children: sectionLabel(key) }),
            !fixed && /* @__PURE__ */ u3(x, { children: [
              /* @__PURE__ */ u3(IconButton, { label: "Move up", disabled: i3 === 0, onClick: () => move(i3, -1), children: /* @__PURE__ */ u3(ChevronUp, {}) }),
              /* @__PURE__ */ u3(IconButton, { label: "Move down", disabled: i3 === current2.length - 1, onClick: () => move(i3, 1), children: /* @__PURE__ */ u3(ChevronDown, {}) })
            ] }),
            /* @__PURE__ */ u3(IconButton, { label: off ? "Show" : "Hide", onClick: () => toggle(key), children: off ? /* @__PURE__ */ u3(EyeOff, {}) : /* @__PURE__ */ u3(Eye, {}) })
          ] }, key);
        }) })
      }
    ),
    /* @__PURE__ */ u3(Group, { title: "Shortcuts", children: /* @__PURE__ */ u3("dl", { className: "grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-white/60", children: [
      ["\u2325D", "Open or close this panel"],
      ["T", "Edit text"],
      ["I", "Inspect an element"],
      ["G / O", "Column grid / outlines"],
      ["Esc", "Leave a mode or preview"],
      ["\u2191 \u2193", "Nudge a value (\u21E7 for \xD710)"]
    ].map(([k3, v3]) => /* @__PURE__ */ u3("div", { className: "contents", children: [
      /* @__PURE__ */ u3("dt", { className: "font-mono text-white/80", children: k3 }),
      /* @__PURE__ */ u3("dd", { children: v3 })
    ] }, k3)) }) })
  ] });
}
var fontOptions = () => [
  { value: "var(--font-sans)", label: "Sans" },
  { value: "var(--font-mono)", label: "Mono" },
  ...getConfig().fonts ?? []
];
var WEIGHTS = ["300", "400", "500", "600", "700", "800"].map((w4) => ({ value: w4, label: w4 }));
var opts = (...v3) => v3.map((x4) => ({ value: x4, label: x4 }));
function ElementTab({ el, tweaks, width, onSelect }) {
  const place = locateElement(el);
  if (!place) return /* @__PURE__ */ u3(Empty, { children: "This element is outside the landing page sections." });
  const edit = tweaks.styles.find((s3) => samePlace(s3, place));
  const computed = getComputedStyle(el);
  const className = el.getAttribute("class") ?? "";
  const set = (prop, raw) => {
    const v3 = raw.trim();
    update((t3) => {
      const existing = t3.styles.find((s3) => samePlace(s3, place));
      const props = { ...existing?.props };
      if (v3) props[prop] = v3;
      else delete props[prop];
      const rest = t3.styles.filter((s3) => !samePlace(s3, place));
      if (!Object.keys(props).length) return { ...t3, styles: rest };
      const next = {
        id: existing?.id ?? uid(),
        ...place,
        tag: el.tagName.toLowerCase(),
        className,
        label: describe(el),
        viewport: width,
        props
      };
      return { ...t3, styles: [...rest, next] };
    });
  };
  const field = (prop) => ({ prop, value: edit?.props[prop], computed: computed.getPropertyValue(prop), onSet: set });
  const parent = el.parentElement && scopeOf(el.parentElement) ? el.parentElement : null;
  return /* @__PURE__ */ u3(x, { children: [
    /* @__PURE__ */ u3("div", { className: "border-b border-white/10 px-3 py-3", children: [
      /* @__PURE__ */ u3("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ u3("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ u3("p", { className: "truncate font-medium text-white", children: describe(el) }),
          /* @__PURE__ */ u3("p", { className: "mt-0.5 text-[11px] text-white/45", children: [
            sectionLabel(place.scope),
            place.layout ? ` \xB7 ${place.layout.split(":")[1]} layout` : "",
            " \xB7 edits made at ",
            width,
            "px (",
            breakpoint(width),
            ")"
          ] })
        ] }),
        /* @__PURE__ */ u3(IconButton, { label: "Select parent", disabled: !parent, onClick: () => parent && onSelect(parent), children: /* @__PURE__ */ u3(CornerLeftUp, {}) }),
        edit && /* @__PURE__ */ u3(IconButton, { label: "Clear this element's changes", onClick: () => update((t3) => ({ ...t3, styles: t3.styles.filter((s3) => s3.id !== edit.id) })), children: /* @__PURE__ */ u3(RotateCcw, {}) }),
        /* @__PURE__ */ u3(IconButton, { label: "Deselect", onClick: () => onSelect(null), children: /* @__PURE__ */ u3(X2, {}) })
      ] }),
      className && /* @__PURE__ */ u3("p", { className: "mt-2 line-clamp-3 break-all rounded-[4px] bg-black/30 px-2 py-1.5 font-mono text-[10px] leading-relaxed text-white/50", title: className, children: className })
    ] }),
    /* @__PURE__ */ u3(Group, { title: "Type", children: /* @__PURE__ */ u3("div", { className: "grid grid-cols-2 gap-1.5", children: [
      /* @__PURE__ */ u3(SelectField, { label: "Font", ...field("font-family"), options: fontOptions(), wide: true }),
      /* @__PURE__ */ u3(TextField, { label: "Size", ...field("font-size") }),
      /* @__PURE__ */ u3(SelectField, { label: "Weight", ...field("font-weight"), options: WEIGHTS }),
      /* @__PURE__ */ u3(TextField, { label: "Line height", ...field("line-height") }),
      /* @__PURE__ */ u3(TextField, { label: "Tracking", ...field("letter-spacing") }),
      /* @__PURE__ */ u3(ColorField, { label: "Colour", ...field("color") }),
      /* @__PURE__ */ u3(SelectField, { label: "Align", ...field("text-align"), options: opts("left", "center", "right", "justify") }),
      /* @__PURE__ */ u3(SelectField, { label: "Case", ...field("text-transform"), options: opts("none", "uppercase", "lowercase", "capitalize") }),
      /* @__PURE__ */ u3(TextField, { label: "Max width", ...field("max-width") })
    ] }) }),
    /* @__PURE__ */ u3(Group, { title: "Layout", children: /* @__PURE__ */ u3("div", { className: "grid grid-cols-2 gap-1.5", children: [
      /* @__PURE__ */ u3(SelectField, { label: "Display", ...field("display"), options: opts("block", "flex", "grid", "inline", "inline-block", "inline-flex", "none") }),
      /* @__PURE__ */ u3(SelectField, { label: "Direction", ...field("flex-direction"), options: opts("row", "column", "row-reverse", "column-reverse") }),
      /* @__PURE__ */ u3(SelectField, { label: "Justify", ...field("justify-content"), options: opts("flex-start", "center", "flex-end", "space-between") }),
      /* @__PURE__ */ u3(SelectField, { label: "Align items", ...field("align-items"), options: opts("stretch", "flex-start", "center", "flex-end", "baseline") }),
      /* @__PURE__ */ u3(TextField, { label: "Gap", ...field("gap") }),
      /* @__PURE__ */ u3(TextField, { label: "Columns", ...field("grid-template-columns") }),
      /* @__PURE__ */ u3(TextField, { label: "Width", ...field("width") }),
      /* @__PURE__ */ u3(TextField, { label: "Height", ...field("height") })
    ] }) }),
    /* @__PURE__ */ u3(Group, { title: "Spacing", children: [
      /* @__PURE__ */ u3(Sides, { label: "Padding", base: "padding", field }),
      /* @__PURE__ */ u3("div", { className: "h-2" }),
      /* @__PURE__ */ u3(Sides, { label: "Margin", base: "margin", field })
    ] }),
    /* @__PURE__ */ u3(Group, { title: "Fill and shape", children: /* @__PURE__ */ u3("div", { className: "grid grid-cols-2 gap-1.5", children: [
      /* @__PURE__ */ u3(ColorField, { label: "Background", ...field("background-color"), wide: true }),
      /* @__PURE__ */ u3(ColorField, { label: "Border colour", ...field("border-color"), wide: true }),
      /* @__PURE__ */ u3(TextField, { label: "Border width", ...field("border-width") }),
      /* @__PURE__ */ u3(TextField, { label: "Radius", ...field("border-radius") }),
      /* @__PURE__ */ u3(TextField, { label: "Opacity", ...field("opacity") })
    ] }) })
  ] });
}
function ThemeTab({ tweaks }) {
  const dark = Z(subscribeTheme, isDark, () => false);
  const theme = dark ? "dark" : "light";
  const values = tweaks.tokens[theme];
  const setTheme2 = (next) => setTheme(next);
  const tokens = getConfig().tokens ?? [];
  const setToken = (key, v3) => update((t3) => {
    const next = { ...t3.tokens[theme] };
    if (v3.trim()) next[key] = v3.trim();
    else delete next[key];
    return { ...t3, tokens: { ...t3.tokens, [theme]: next } };
  });
  return /* @__PURE__ */ u3(x, { children: [
    /* @__PURE__ */ u3(Group, { title: "Theme", children: /* @__PURE__ */ u3("div", { className: "grid grid-cols-2 gap-1 rounded-[6px] bg-black/30 p-1", children: ["light", "dark"].map((t3) => /* @__PURE__ */ u3(
      "button",
      {
        type: "button",
        onClick: () => setTheme2(t3),
        className: cn("flex h-7 items-center justify-center gap-1.5 rounded-[4px] capitalize", theme === t3 ? "bg-white/10 text-white" : "text-white/50 hover:text-white/80"),
        children: [
          t3 === "light" ? /* @__PURE__ */ u3(Sun, { className: "size-3.5" }) : /* @__PURE__ */ u3(Moon, { className: "size-3.5" }),
          t3
        ]
      },
      t3
    )) }) }),
    /* @__PURE__ */ u3(Group, { title: `Colour tokens \xB7 ${theme}`, children: [
      /* @__PURE__ */ u3("div", { className: "grid gap-1.5", children: [
        tokens.length === 0 && /* @__PURE__ */ u3("p", { className: "text-white/45", children: "No tokens configured. Pass `tokens` in the DesignTweaks config." }),
        tokens.map((tok) => /* @__PURE__ */ u3(
          ColorField,
          {
            label: tok.label,
            prop: tok.key,
            value: values[tok.key],
            computed: (theme === "dark" ? tok.dark : void 0) ?? tok.light,
            onSet: setToken,
            wide: true
          },
          `${theme}-${tok.key}`
        ))
      ] }),
      /* @__PURE__ */ u3("p", { className: "mt-3 text-[11px] leading-relaxed text-white/45", children: "Each theme keeps its own values. Hex with alpha works (#0a0a0a14)." })
    ] })
  ] });
}
function ChangesTab({ tweaks }) {
  const [copied, setCopied] = d2(false);
  const tokenRows = ["light", "dark"].flatMap(
    (theme) => Object.entries(tweaks.tokens[theme]).map(([key, value]) => ({ theme, key, value }))
  );
  const empty = changeCount(tweaks) - tweaks.messages.length === 0;
  return /* @__PURE__ */ u3(x, { children: [
    /* @__PURE__ */ u3(AgentStatus, { tweaks }),
    /* @__PURE__ */ u3(Messages, { tweaks }),
    empty && /* @__PURE__ */ u3(Empty, { children: "No changes yet. Edit text, inspect an element or change a token and it shows up here." }),
    tweaks.text.length > 0 && /* @__PURE__ */ u3(Group, { title: `Text \xB7 ${tweaks.text.length}`, children: /* @__PURE__ */ u3("ul", { className: "grid gap-1", children: tweaks.text.map((e3) => /* @__PURE__ */ u3(
      Change,
      {
        meta: `${sectionLabel(e3.scope)} \xB7 ${e3.tag}${e3.layout ? ` \xB7 ${e3.layout.split(":")[1]}` : ""}`,
        onRevert: () => update((t3) => ({ ...t3, text: t3.text.filter((x4) => x4.id !== e3.id) })),
        children: [
          /* @__PURE__ */ u3("span", { className: "text-white/40 line-through", children: e3.original }),
          /* @__PURE__ */ u3("span", { className: "text-white", children: e3.value })
        ]
      },
      e3.id
    )) }) }),
    tweaks.styles.length > 0 && /* @__PURE__ */ u3(Group, { title: `Styles \xB7 ${tweaks.styles.length}`, children: /* @__PURE__ */ u3("ul", { className: "grid gap-1", children: tweaks.styles.map((e3) => /* @__PURE__ */ u3(
      Change,
      {
        meta: `${sectionLabel(e3.scope)} \xB7 at ${e3.viewport}px${e3.layout ? ` \xB7 ${e3.layout.split(":")[1]}` : ""}`,
        onRevert: () => update((t3) => ({ ...t3, styles: t3.styles.filter((x4) => x4.id !== e3.id) })),
        children: [
          /* @__PURE__ */ u3("span", { className: "text-white", children: e3.label }),
          /* @__PURE__ */ u3("span", { className: "font-mono text-[10px] text-white/55", children: Object.entries(e3.props).map(([k3, v3]) => `${k3}: ${v3}`).join("; ") })
        ]
      },
      e3.id
    )) }) }),
    tokenRows.length > 0 && /* @__PURE__ */ u3(Group, { title: `Tokens \xB7 ${tokenRows.length}`, children: /* @__PURE__ */ u3("ul", { className: "grid gap-1", children: tokenRows.map(({ theme, key, value }) => /* @__PURE__ */ u3(
      Change,
      {
        meta: `${theme} theme`,
        onRevert: () => update((t3) => {
          const next = { ...t3.tokens[theme] };
          delete next[key];
          return { ...t3, tokens: { ...t3.tokens, [theme]: next } };
        }),
        children: /* @__PURE__ */ u3("span", { className: "flex items-center gap-2 text-white", children: [
          /* @__PURE__ */ u3("span", { className: "size-3 rounded-[2px] ring-1 ring-white/20", style: { background: value } }),
          key,
          ": ",
          /* @__PURE__ */ u3("span", { className: "font-mono", children: value })
        ] })
      },
      `${theme}-${key}`
    )) }) }),
    (tweaks.sections.order.length > 0 || tweaks.sections.hidden.length > 0) && /* @__PURE__ */ u3(Group, { title: "Sections", children: /* @__PURE__ */ u3("ul", { className: "grid gap-1", children: /* @__PURE__ */ u3(Change, { meta: "Order and visibility", onRevert: () => update((t3) => ({ ...t3, sections: { order: [], hidden: [] } })), children: [
      tweaks.sections.order.length > 0 && /* @__PURE__ */ u3("span", { className: "text-white", children: [
        "Order: ",
        tweaks.sections.order.map((k3) => sectionLabel(k3)).join(" \u2192 ")
      ] }),
      tweaks.sections.hidden.length > 0 && /* @__PURE__ */ u3("span", { className: "text-white", children: [
        "Hidden: ",
        tweaks.sections.hidden.map((k3) => sectionLabel(k3)).join(", ")
      ] })
    ] }) }) }),
    /* @__PURE__ */ u3(Group, { title: "Batch", children: /* @__PURE__ */ u3("div", { className: "flex gap-1.5", children: [
      /* @__PURE__ */ u3(
        "button",
        {
          type: "button",
          onClick: () => {
            navigator.clipboard.writeText(JSON.stringify(tweaks, null, 2)).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            });
          },
          className: "flex h-7 items-center gap-1.5 rounded-[4px] bg-white/5 px-2.5 text-white/80 hover:bg-white/10",
          children: [
            /* @__PURE__ */ u3(Copy, { className: "size-3.5" }),
            copied ? "Copied" : "Copy JSON"
          ]
        }
      ),
      /* @__PURE__ */ u3(
        "button",
        {
          type: "button",
          disabled: empty,
          onClick: () => {
            if (window.confirm("Discard every design change and message?"))
              update((t3) => ({ ...EMPTY, layout: t3.layout, sent: t3.sent, reply: t3.reply }));
          },
          className: "ml-auto flex h-7 items-center gap-1.5 rounded-[4px] px-2.5 text-red-300/80 hover:bg-red-400/10 disabled:opacity-30",
          children: [
            /* @__PURE__ */ u3(RotateCcw, { className: "size-3.5" }),
            "Reset all"
          ]
        }
      )
    ] }) })
  ] });
}
var clock = (iso) => new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
function Messages({ tweaks }) {
  const [draft, setDraft] = d2("");
  const queue = (value) => {
    const text = value.trim();
    if (!text) return;
    update((t3) => ({ ...t3, messages: [...t3.messages, { id: uid(), text, at: (/* @__PURE__ */ new Date()).toISOString() }] }));
    setDraft("");
  };
  return /* @__PURE__ */ u3(Group, { title: `Messages to ${agent()}${tweaks.messages.length ? ` \xB7 ${tweaks.messages.length}` : ""}`, children: [
    tweaks.messages.length > 0 && /* @__PURE__ */ u3("ul", { className: "mb-2 grid gap-1", children: tweaks.messages.map((m3) => /* @__PURE__ */ u3("li", { className: "flex items-start gap-2 rounded-[4px] bg-[#0d99ff]/10 px-2 py-1.5", children: [
      /* @__PURE__ */ u3("p", { className: "min-w-0 flex-1 whitespace-pre-wrap break-words text-white", children: m3.text }),
      /* @__PURE__ */ u3(IconButton, { label: "Remove message", onClick: () => update((t3) => ({ ...t3, messages: t3.messages.filter((x4) => x4.id !== m3.id) })), children: /* @__PURE__ */ u3(X2, {}) })
    ] }, m3.id)) }),
    /* @__PURE__ */ u3(
      "textarea",
      {
        value: draft,
        onInput: (e3) => setDraft(e3.currentTarget.value),
        onKeyDown: (e3) => {
          if (e3.key === "Enter" && !e3.shiftKey && !e3.isComposing) {
            e3.preventDefault();
            queue(e3.currentTarget.value);
          }
        },
        rows: 2,
        placeholder: "Anything the panel can't express: swap this photo, rename a section\u2026",
        className: "w-full resize-y rounded-[4px] bg-black/30 px-2 py-1.5 text-[12px] leading-relaxed text-white placeholder:text-white/30 outline-none ring-1 ring-white/10 focus:ring-[#0d99ff]"
      }
    ),
    /* @__PURE__ */ u3("p", { className: "mt-1 text-[10px] text-white/35", children: "Enter adds it to the queue \xB7 Shift+Enter for a new line" })
  ] });
}
function AgentStatus({ tweaks }) {
  if (isLocal() && tweaks.sent && alreadySent(tweaks))
    return /* @__PURE__ */ u3("div", { className: "flex items-center gap-2 border-b border-white/10 bg-[#0d99ff]/10 px-3 py-2.5 text-[11px] text-[#9fd3ff]", children: [
      /* @__PURE__ */ u3(Check, { className: "size-3.5 shrink-0" }),
      "Downloaded ",
      tweaks.sent.count,
      " change",
      tweaks.sent.count === 1 ? "" : "s",
      " at ",
      clock(tweaks.sent.at),
      " (also copied). Hand the file to ",
      agent(),
      "."
    ] });
  if (isPending(tweaks) && tweaks.sent && !isLocal())
    return /* @__PURE__ */ u3("div", { className: "flex items-center gap-2 border-b border-white/10 bg-amber-300/10 px-3 py-2.5 text-[11px] text-amber-100", children: [
      /* @__PURE__ */ u3(LoaderCircle, { className: "size-3.5 shrink-0 animate-spin" }),
      "Sent ",
      tweaks.sent.count,
      " change",
      tweaks.sent.count === 1 ? "" : "s",
      " at ",
      clock(tweaks.sent.at),
      ". ",
      agent(),
      " is implementing them."
    ] });
  if (!tweaks.reply) return null;
  return /* @__PURE__ */ u3("div", { className: "flex items-start gap-2 border-b border-white/10 bg-emerald-400/10 px-3 py-2.5 text-[11px] text-emerald-50", children: [
    /* @__PURE__ */ u3(Check, { className: "mt-0.5 size-3.5 shrink-0 text-emerald-300" }),
    /* @__PURE__ */ u3("p", { className: "min-w-0 flex-1 whitespace-pre-wrap leading-relaxed", children: [
      /* @__PURE__ */ u3("span", { className: "text-emerald-300", children: [
        agent(),
        " \xB7 ",
        clock(tweaks.reply.at)
      ] }),
      "\n",
      tweaks.reply.text
    ] }),
    /* @__PURE__ */ u3(IconButton, { label: "Dismiss", onClick: () => update((t3) => ({ ...t3, reply: void 0 })), children: /* @__PURE__ */ u3(X2, {}) })
  ] });
}
function SendBar({ tweaks, status: status2 }) {
  const [busy, setBusy] = d2(false);
  const [failed, setFailed] = d2(false);
  const count = changeCount(tweaks);
  const local2 = status2 === "local";
  const pending = !local2 && isPending(tweaks);
  const waiting = (pending || local2) && alreadySent(tweaks);
  const ready = status2 === "saved" || local2;
  const send2 = () => {
    setBusy(true);
    setFailed(false);
    send().catch(() => setFailed(true)).finally(() => setBusy(false));
  };
  const line = failed ? "Couldn't send. Is the dev server running?" : status2 === "error" ? "Can't save. Is the dev server running?" : pending && tweaks.sent ? `Sent at ${clock(tweaks.sent.at)} \xB7 ${agent()} is on it` : status2 === "saving" ? "Saving\u2026" : status2 === "loading" ? "Loading\u2026" : local2 ? "No dev server: saved in this browser, Send downloads the batch" : "Changes show here only, until you send them";
  return /* @__PURE__ */ u3("footer", { className: "grid gap-2 border-t border-white/10 px-3 py-2.5", children: [
    /* @__PURE__ */ u3(
      "button",
      {
        type: "button",
        disabled: !count || busy || waiting || !ready,
        onClick: send2,
        className: "flex h-8 items-center justify-center gap-2 rounded-[4px] bg-[#0d99ff] text-[12px] font-semibold text-white transition-colors hover:bg-[#0a85e0] disabled:bg-white/10 disabled:text-white/35",
        children: [
          busy ? /* @__PURE__ */ u3(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ u3(Send, { className: "size-3.5" }),
          busy ? "Sending\u2026" : waiting ? local2 ? "Downloaded \xB7 change something to send again" : `Sent, waiting for ${agent()}` : count ? local2 ? `Download ${count} change${count === 1 ? "" : "s"} for ${agent()}` : `${pending ? "Send again with new changes" : `Send ${count} change${count === 1 ? "" : "s"} to ${agent()}`}` : "Nothing to send yet"
        ]
      }
    ),
    /* @__PURE__ */ u3("p", { className: "flex items-center gap-2 text-[11px] text-white/50", children: [
      /* @__PURE__ */ u3(
        "span",
        {
          className: cn(
            "size-1.5 shrink-0 rounded-full",
            failed || status2 === "error" ? "bg-red-400" : local2 ? "bg-sky-400" : pending || status2 !== "saved" ? "bg-amber-300" : "bg-emerald-400"
          )
        }
      ),
      line
    ] })
  ] });
}
function FieldShell({ label, set, wide, onReset, children }) {
  return /* @__PURE__ */ u3("div", { className: cn("grid gap-1", wide && "col-span-2"), children: [
    /* @__PURE__ */ u3("span", { className: "flex h-3.5 items-center gap-1 text-[10px] text-white/45", children: [
      set && /* @__PURE__ */ u3("span", { className: "size-1.5 rounded-full bg-[#0d99ff]" }),
      label,
      set && /* @__PURE__ */ u3("button", { type: "button", onClick: onReset, className: "ml-auto text-white/40 hover:text-white", title: "Reset", children: "reset" })
    ] }),
    children
  ] });
}
var inputClass = "h-7 w-full min-w-0 rounded-[4px] bg-black/30 px-2 text-[12px] text-white placeholder:text-white/35 outline-none ring-1 ring-white/5 hover:ring-white/15 focus:ring-[#0d99ff]";
function nudge(value, dir, big) {
  const m3 = value.trim().match(/^(-?\d*\.?\d+)([a-z%]*)$/i);
  if (!m3) return null;
  const unit = m3[2];
  const step = unit === "em" || unit === "rem" ? 0.01 : unit === "" ? 0.05 : 1;
  const next = Number(m3[1]) + dir * step * (big ? 10 : 1);
  return `${Math.round(next * 1e3) / 1e3}${unit}`;
}
function TextField({ label, prop, value, computed, onSet, wide, list }) {
  const [draft, setDraft] = d2(null);
  const commit = () => {
    if (draft !== null && draft !== (value ?? "")) onSet(prop, draft);
    setDraft(null);
  };
  return /* @__PURE__ */ u3(FieldShell, { label, set: value !== void 0, wide, onReset: () => onSet(prop, ""), children: /* @__PURE__ */ u3(
    "input",
    {
      value: draft ?? value ?? "",
      placeholder: computed,
      list,
      onInput: (e3) => setDraft(e3.currentTarget.value),
      onBlur: commit,
      onKeyDown: (e3) => {
        if (e3.key === "Enter") commit();
        if (e3.key === "Escape") setDraft(null);
        if (e3.key === "ArrowUp" || e3.key === "ArrowDown") {
          const next = nudge(draft ?? value ?? computed, e3.key === "ArrowUp" ? 1 : -1, e3.shiftKey);
          if (next) {
            e3.preventDefault();
            setDraft(null);
            onSet(prop, next);
          }
        }
      },
      className: inputClass
    }
  ) });
}
function SelectField({ label, prop, value, computed, onSet, options, wide }) {
  const shown = prop === "font-family" ? computed.split(",")[0].replace(/["']/g, "").trim() : computed;
  return /* @__PURE__ */ u3(FieldShell, { label, set: value !== void 0, wide, onReset: () => onSet(prop, ""), children: /* @__PURE__ */ u3("select", { value: value ?? "", onChange: (e3) => onSet(prop, e3.currentTarget.value), className: cn(inputClass, "px-1.5"), children: [
    /* @__PURE__ */ u3("option", { value: "", children: shown || "auto" }),
    options.map((o4) => /* @__PURE__ */ u3("option", { value: o4.value, children: o4.label }, o4.value))
  ] }) });
}
var tokenSuggestions = () => [...(getConfig().tokens ?? []).map((t3) => `var(--color-${t3.key})`), "currentColor", "transparent"];
var canvas = null;
function toHex(color) {
  canvas ??= document.createElement("canvas").getContext("2d");
  if (!canvas) return "#000000";
  canvas.fillStyle = "#000000";
  canvas.fillStyle = color;
  const out = canvas.fillStyle;
  if (out.startsWith("#")) return out;
  const m3 = out.match(/\d+(\.\d+)?/g);
  return m3 ? `#${m3.slice(0, 3).map((n2) => Math.round(Number(n2)).toString(16).padStart(2, "0")).join("")}` : "#000000";
}
function ColorField(props) {
  const { prop, value, computed, onSet } = props;
  const resolved = value?.startsWith("#") ? value : computed;
  return /* @__PURE__ */ u3("div", { className: cn("flex items-end gap-1.5", props.wide && "col-span-2"), children: [
    /* @__PURE__ */ u3("label", { className: "relative mb-0 size-7 shrink-0 cursor-pointer overflow-hidden rounded-[4px] ring-1 ring-white/15", style: { background: value ?? computed }, children: [
      /* @__PURE__ */ u3("span", { className: "sr-only", children: [
        "Pick ",
        props.label
      ] }),
      /* @__PURE__ */ u3("input", { type: "color", value: toHex(resolved), onInput: (e3) => onSet(prop, e3.currentTarget.value), className: "absolute inset-0 cursor-pointer opacity-0" })
    ] }),
    /* @__PURE__ */ u3("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ u3(TextField, { ...props, wide: false, list: "design-token-colors" }) })
  ] });
}
function Sides({ label, base, field }) {
  return /* @__PURE__ */ u3("div", { children: [
    /* @__PURE__ */ u3("p", { className: "mb-1 text-[10px] text-white/45", children: label }),
    /* @__PURE__ */ u3("div", { className: "grid grid-cols-4 gap-1.5", children: ["top", "right", "bottom", "left"].map((s3) => /* @__PURE__ */ u3(TextField, { label: s3[0].toUpperCase() + s3.slice(1), ...field(`${base}-${s3}`) }, s3)) })
  ] });
}
function Group({ title, action, children }) {
  return /* @__PURE__ */ u3("section", { className: "border-b border-white/10 px-3 py-3", children: [
    /* @__PURE__ */ u3("div", { className: "mb-2 flex h-5 items-center", children: [
      /* @__PURE__ */ u3("h3", { className: "text-[11px] font-semibold text-white/90", children: title }),
      /* @__PURE__ */ u3("span", { className: "ml-auto", children: action })
    ] }),
    children
  ] });
}
function Change({ meta, onRevert, children }) {
  return /* @__PURE__ */ u3("li", { className: "group flex items-start gap-2 rounded-[4px] bg-black/20 px-2 py-1.5", children: [
    /* @__PURE__ */ u3("div", { className: "grid min-w-0 flex-1 gap-0.5 break-words", children: [
      /* @__PURE__ */ u3("span", { className: "text-[10px] text-white/40", children: meta }),
      children
    ] }),
    /* @__PURE__ */ u3(IconButton, { label: "Revert", onClick: onRevert, children: /* @__PURE__ */ u3(RotateCcw, {}) })
  ] });
}
function Empty({ children }) {
  return /* @__PURE__ */ u3("p", { className: "px-3 py-6 text-center text-[12px] leading-relaxed text-white/50", children });
}
function IconButton({ label, onClick, disabled, children }) {
  return /* @__PURE__ */ u3(
    "button",
    {
      type: "button",
      title: label,
      "aria-label": label,
      disabled,
      onClick,
      className: "grid size-6 shrink-0 place-items-center rounded-[4px] text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-25 [&_svg]:size-3.5",
      children
    }
  );
}
function Toggle({ on, label, onClick, children }) {
  return /* @__PURE__ */ u3(
    "button",
    {
      type: "button",
      title: label,
      "aria-label": label,
      "aria-pressed": on,
      onClick,
      className: cn(
        "grid size-7 place-items-center rounded-[4px] transition-colors [&_svg]:size-4",
        on ? "bg-[#0d99ff] text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
      ),
      children
    }
  );
}
function GridOverlay() {
  return /* @__PURE__ */ u3("div", { "aria-hidden": true, className: "pointer-events-none fixed inset-0 z-[2147483620]", children: /* @__PURE__ */ u3("div", { className: "mx-auto grid h-full max-w-[1200px] grid-cols-4 gap-4 border-x border-[#ff3b30]/30 px-6 sm:grid-cols-8 sm:px-8 lg:grid-cols-12 lg:gap-6", children: Array.from({ length: 12 }, (_3, i3) => /* @__PURE__ */ u3("div", { className: cn("bg-[#ff3b30]/[0.06] ring-1 ring-inset ring-[#ff3b30]/15", i3 >= 4 && "hidden sm:block", i3 >= 8 && "sm:hidden lg:block") }, i3)) }) });
}

// src/panel/panel.generated.css
var panel_generated_default = '/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */\n@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-border-style:solid;--tw-leading:initial;--tw-font-weight:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-outline-style:solid;--tw-backdrop-blur:initial;--tw-backdrop-brightness:initial;--tw-backdrop-contrast:initial;--tw-backdrop-grayscale:initial;--tw-backdrop-hue-rotate:initial;--tw-backdrop-invert:initial;--tw-backdrop-opacity:initial;--tw-backdrop-saturate:initial;--tw-backdrop-sepia:initial;--tw-content:""}}}@layer theme{:root,:host{--font-sans:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--color-red-300:oklch(80.8% .114 19.571);--color-red-400:oklch(70.4% .191 22.216);--color-amber-100:oklch(96.2% .059 95.617);--color-amber-300:oklch(87.9% .169 91.605);--color-emerald-50:oklch(97.9% .021 166.113);--color-emerald-300:oklch(84.5% .143 164.978);--color-emerald-400:oklch(76.5% .177 163.223);--color-sky-400:oklch(74.6% .16 232.661);--color-black:#000;--color-white:#fff;--spacing:.25rem;--font-weight-medium:500;--font-weight-semibold:600;--leading-relaxed:1.625;--animate-spin:spin 1s linear infinite;--blur-sm:8px;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring:where(:not(iframe)){outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.pointer-events-auto{pointer-events:auto}.pointer-events-none{pointer-events:none}.sr-only{clip-path:inset(50%);white-space:nowrap;border-width:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.inset-0{inset:0}.top-3{top:calc(var(--spacing) * 3)}.right-3{right:calc(var(--spacing) * 3)}.right-4{right:calc(var(--spacing) * 4)}.bottom-3{bottom:calc(var(--spacing) * 3)}.bottom-4{bottom:calc(var(--spacing) * 4)}.left-3{left:calc(var(--spacing) * 3)}.left-4{left:calc(var(--spacing) * 4)}.z-\\[2147483620\\]{z-index:2147483620}.z-\\[2147483630\\]{z-index:2147483630}.z-\\[2147483640\\]{z-index:2147483640}.z-\\[2147483641\\]{z-index:2147483641}.z-\\[2147483645\\]{z-index:2147483645}.z-\\[2147483646\\]{z-index:2147483646}.col-span-2{grid-column:span 2/span 2}.mx-1{margin-inline:var(--spacing)}.mx-auto{margin-inline:auto}.mt-0\\.5{margin-top:calc(var(--spacing) * .5)}.mt-1{margin-top:var(--spacing)}.mt-2{margin-top:calc(var(--spacing) * 2)}.mt-3{margin-top:calc(var(--spacing) * 3)}.mb-0{margin-bottom:0}.mb-1{margin-bottom:var(--spacing)}.mb-2{margin-bottom:calc(var(--spacing) * 2)}.mb-3{margin-bottom:calc(var(--spacing) * 3)}.ml-1{margin-left:var(--spacing)}.ml-auto{margin-left:auto}.line-clamp-3{-webkit-line-clamp:3;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.block{display:block}.contents{display:contents}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline{display:inline}.inline-block{display:inline-block}.inline-flex{display:inline-flex}.size-1\\.5{width:calc(var(--spacing) * 1.5);height:calc(var(--spacing) * 1.5)}.size-3{width:calc(var(--spacing) * 3);height:calc(var(--spacing) * 3)}.size-3\\.5{width:calc(var(--spacing) * 3.5);height:calc(var(--spacing) * 3.5)}.size-6{width:calc(var(--spacing) * 6);height:calc(var(--spacing) * 6)}.size-7{width:calc(var(--spacing) * 7);height:calc(var(--spacing) * 7)}.h-2{height:calc(var(--spacing) * 2)}.h-3\\.5{height:calc(var(--spacing) * 3.5)}.h-4{height:calc(var(--spacing) * 4)}.h-5{height:calc(var(--spacing) * 5)}.h-7{height:calc(var(--spacing) * 7)}.h-8{height:calc(var(--spacing) * 8)}.h-9{height:calc(var(--spacing) * 9)}.h-full{height:100%}.min-h-0{min-height:0}.w-64{width:calc(var(--spacing) * 64)}.w-\\[320px\\]{width:320px}.w-full{width:100%}.w-px{width:1px}.max-w-\\[1200px\\]{max-width:1200px}.max-w-\\[calc\\(100vw-24px\\)\\]{max-width:calc(100vw - 24px)}.min-w-0{min-width:0}.flex-1{flex:1}.shrink-0{flex-shrink:0}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.animate-spin{animation:var(--animate-spin)}.cursor-pointer{cursor:pointer}.resize{resize:both}.resize-y{resize:vertical}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.grid-cols-\\[auto_1fr\\]{grid-template-columns:auto 1fr}.flex-col{flex-direction:column}.place-items-center{place-items:center}.items-center{align-items:center}.items-end{align-items:flex-end}.items-start{align-items:flex-start}.justify-center{justify-content:center}.gap-0\\.5{gap:calc(var(--spacing) * .5)}.gap-1{gap:var(--spacing)}.gap-1\\.5{gap:calc(var(--spacing) * 1.5)}.gap-2{gap:calc(var(--spacing) * 2)}.gap-4{gap:calc(var(--spacing) * 4)}.gap-x-3{column-gap:calc(var(--spacing) * 3)}.gap-y-1{row-gap:var(--spacing)}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.rounded-\\[2px\\]{border-radius:2px}.rounded-\\[4px\\]{border-radius:4px}.rounded-\\[6px\\]{border-radius:6px}.rounded-\\[8px\\]{border-radius:8px}.rounded-full{border-radius:3.40282e38px}.border{border-style:var(--tw-border-style);border-width:1px}.border-\\[1\\.5px\\]{border-style:var(--tw-border-style);border-width:1.5px}.border-x{border-inline-style:var(--tw-border-style);border-inline-width:1px}.border-t{border-top-style:var(--tw-border-style);border-top-width:1px}.border-b{border-bottom-style:var(--tw-border-style);border-bottom-width:1px}.border-dashed{--tw-border-style:dashed;border-style:dashed}.border-\\[\\#0d99ff\\]{border-color:#0d99ff}.border-\\[\\#ff3b30\\]\\/30{border-color:oklab(65.4215% .203696 .111332/.3)}.border-white\\/10{border-color:#ffffff1a}@supports (color:color-mix(in lab, red, red)){.border-white\\/10{border-color:color-mix(in oklab, var(--color-white) 10%, transparent)}}.bg-\\[\\#0b0b0b\\]\\/85{background-color:oklab(14.9577% -1.49012e-8 7.45058e-9/.85)}.bg-\\[\\#0d99ff\\]{background-color:#0d99ff}.bg-\\[\\#0d99ff\\]\\/10{background-color:oklab(66.9841% -.0648249 -.170866/.1)}.bg-\\[\\#0d99ff\\]\\/15{background-color:oklab(66.9841% -.0648249 -.170866/.15)}.bg-\\[\\#0d99ff\\]\\/\\[0\\.06\\]{background-color:oklab(66.9841% -.0648249 -.170866/.06)}.bg-\\[\\#1e1e1e\\]{background-color:#1e1e1e}.bg-\\[\\#ff3b30\\]\\/\\[0\\.06\\]{background-color:oklab(65.4215% .203696 .111332/.06)}.bg-amber-300{background-color:var(--color-amber-300)}.bg-amber-300\\/10{background-color:#ffd2361a}@supports (color:color-mix(in lab, red, red)){.bg-amber-300\\/10{background-color:color-mix(in oklab, var(--color-amber-300) 10%, transparent)}}.bg-black\\/20{background-color:#0003}@supports (color:color-mix(in lab, red, red)){.bg-black\\/20{background-color:color-mix(in oklab, var(--color-black) 20%, transparent)}}.bg-black\\/30{background-color:#0000004d}@supports (color:color-mix(in lab, red, red)){.bg-black\\/30{background-color:color-mix(in oklab, var(--color-black) 30%, transparent)}}.bg-emerald-400{background-color:var(--color-emerald-400)}.bg-emerald-400\\/10{background-color:#00d2941a}@supports (color:color-mix(in lab, red, red)){.bg-emerald-400\\/10{background-color:color-mix(in oklab, var(--color-emerald-400) 10%, transparent)}}.bg-red-400{background-color:var(--color-red-400)}.bg-sky-400{background-color:var(--color-sky-400)}.bg-white{background-color:var(--color-white)}.bg-white\\/5{background-color:#ffffff0d}@supports (color:color-mix(in lab, red, red)){.bg-white\\/5{background-color:color-mix(in oklab, var(--color-white) 5%, transparent)}}.bg-white\\/10{background-color:#ffffff1a}@supports (color:color-mix(in lab, red, red)){.bg-white\\/10{background-color:color-mix(in oklab, var(--color-white) 10%, transparent)}}.p-1{padding:var(--spacing)}.px-1\\.5{padding-inline:calc(var(--spacing) * 1.5)}.px-2{padding-inline:calc(var(--spacing) * 2)}.px-2\\.5{padding-inline:calc(var(--spacing) * 2.5)}.px-3{padding-inline:calc(var(--spacing) * 3)}.px-6{padding-inline:calc(var(--spacing) * 6)}.py-1\\.5{padding-block:calc(var(--spacing) * 1.5)}.py-2{padding-block:calc(var(--spacing) * 2)}.py-2\\.5{padding-block:calc(var(--spacing) * 2.5)}.py-3{padding-block:calc(var(--spacing) * 3)}.py-6{padding-block:calc(var(--spacing) * 6)}.pt-6{padding-top:calc(var(--spacing) * 6)}.pr-3\\.5{padding-right:calc(var(--spacing) * 3.5)}.pl-3{padding-left:calc(var(--spacing) * 3)}.text-center{text-align:center}.text-left{text-align:left}.font-mono{font-family:var(--font-mono)}.font-sans{font-family:var(--font-sans)}.text-\\[10px\\]{font-size:10px}.text-\\[11px\\]{font-size:11px}.text-\\[12px\\]{font-size:12px}.text-\\[13px\\]{font-size:13px}.leading-relaxed{--tw-leading:var(--leading-relaxed);line-height:var(--leading-relaxed)}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.break-words{overflow-wrap:break-word}.break-all{word-break:break-all}.whitespace-pre-wrap{white-space:pre-wrap}.text-\\[\\#0d99ff\\]{color:#0d99ff}.text-\\[\\#9fd3ff\\]{color:#9fd3ff}.text-\\[\\#e6e6e6\\]{color:#e6e6e6}.text-amber-100{color:var(--color-amber-100)}.text-emerald-50{color:var(--color-emerald-50)}.text-emerald-300{color:var(--color-emerald-300)}.text-red-300\\/80{color:#ffa3a3cc}@supports (color:color-mix(in lab, red, red)){.text-red-300\\/80{color:color-mix(in oklab, var(--color-red-300) 80%, transparent)}}.text-white{color:var(--color-white)}.text-white\\/30{color:#ffffff4d}@supports (color:color-mix(in lab, red, red)){.text-white\\/30{color:color-mix(in oklab, var(--color-white) 30%, transparent)}}.text-white\\/35{color:#ffffff59}@supports (color:color-mix(in lab, red, red)){.text-white\\/35{color:color-mix(in oklab, var(--color-white) 35%, transparent)}}.text-white\\/40{color:#fff6}@supports (color:color-mix(in lab, red, red)){.text-white\\/40{color:color-mix(in oklab, var(--color-white) 40%, transparent)}}.text-white\\/45{color:#ffffff73}@supports (color:color-mix(in lab, red, red)){.text-white\\/45{color:color-mix(in oklab, var(--color-white) 45%, transparent)}}.text-white\\/50{color:#ffffff80}@supports (color:color-mix(in lab, red, red)){.text-white\\/50{color:color-mix(in oklab, var(--color-white) 50%, transparent)}}.text-white\\/55{color:#ffffff8c}@supports (color:color-mix(in lab, red, red)){.text-white\\/55{color:color-mix(in oklab, var(--color-white) 55%, transparent)}}.text-white\\/60{color:#fff9}@supports (color:color-mix(in lab, red, red)){.text-white\\/60{color:color-mix(in oklab, var(--color-white) 60%, transparent)}}.text-white\\/70{color:#ffffffb3}@supports (color:color-mix(in lab, red, red)){.text-white\\/70{color:color-mix(in oklab, var(--color-white) 70%, transparent)}}.text-white\\/80{color:#fffc}@supports (color:color-mix(in lab, red, red)){.text-white\\/80{color:color-mix(in oklab, var(--color-white) 80%, transparent)}}.text-white\\/90{color:#ffffffe6}@supports (color:color-mix(in lab, red, red)){.text-white\\/90{color:color-mix(in oklab, var(--color-white) 90%, transparent)}}.capitalize{text-transform:capitalize}.lowercase{text-transform:lowercase}.uppercase{text-transform:uppercase}.line-through{text-decoration-line:line-through}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.opacity-0{opacity:0}.shadow{--tw-shadow:0 1px 3px 0 var(--tw-shadow-color,#0000001a), 0 1px 2px -1px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-\\[0_8px_24px_\\#0005\\]{--tw-shadow:0 8px 24px var(--tw-shadow-color,#0005);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-\\[0_16px_48px_\\#0007\\]{--tw-shadow:0 16px 48px var(--tw-shadow-color,#0007);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-\\[0_24px_80px_\\#000a\\]{--tw-shadow:0 24px 80px var(--tw-shadow-color,#000a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-\\[inset_0_-2px_0_\\#0d99ff\\]{--tw-shadow:inset 0 -2px 0 var(--tw-shadow-color,#0d99ff);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.shadow-lg{--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring-1{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring-\\[\\#ff3b30\\]\\/15{--tw-ring-color:oklab(65.4215% .203696 .111332/.15)}.ring-white\\/5{--tw-ring-color:#ffffff0d}@supports (color:color-mix(in lab, red, red)){.ring-white\\/5{--tw-ring-color:color-mix(in oklab, var(--color-white) 5%, transparent)}}.ring-white\\/10{--tw-ring-color:#ffffff1a}@supports (color:color-mix(in lab, red, red)){.ring-white\\/10{--tw-ring-color:color-mix(in oklab, var(--color-white) 10%, transparent)}}.ring-white\\/15{--tw-ring-color:#ffffff26}@supports (color:color-mix(in lab, red, red)){.ring-white\\/15{--tw-ring-color:color-mix(in oklab, var(--color-white) 15%, transparent)}}.ring-white\\/20{--tw-ring-color:#fff3}@supports (color:color-mix(in lab, red, red)){.ring-white\\/20{--tw-ring-color:color-mix(in oklab, var(--color-white) 20%, transparent)}}.outline{outline-style:var(--tw-outline-style);outline-width:1px}.backdrop-blur-sm{--tw-backdrop-blur:blur(var(--blur-sm));-webkit-backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);backdrop-filter:var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,)}.transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.outline-none{--tw-outline-style:none;outline-style:none}.ring-inset{--tw-ring-inset:inset}.placeholder\\:text-white\\/30::placeholder{color:#ffffff4d}@supports (color:color-mix(in lab, red, red)){.placeholder\\:text-white\\/30::placeholder{color:color-mix(in oklab, var(--color-white) 30%, transparent)}}.placeholder\\:text-white\\/35::placeholder{color:#ffffff59}@supports (color:color-mix(in lab, red, red)){.placeholder\\:text-white\\/35::placeholder{color:color-mix(in oklab, var(--color-white) 35%, transparent)}}.after\\:absolute:after{content:var(--tw-content);position:absolute}.after\\:-top-5:after{content:var(--tw-content);top:calc(var(--spacing) * -5)}.after\\:left-0:after{content:var(--tw-content);left:0}.after\\:rounded-\\[2px\\]:after{content:var(--tw-content);border-radius:2px}.after\\:bg-\\[\\#0d99ff\\]:after{content:var(--tw-content);background-color:#0d99ff}.after\\:px-1\\.5:after{content:var(--tw-content);padding-inline:calc(var(--spacing) * 1.5)}.after\\:py-0\\.5:after{content:var(--tw-content);padding-block:calc(var(--spacing) * .5)}.after\\:font-mono:after{content:var(--tw-content);font-family:var(--font-mono)}.after\\:text-\\[10px\\]:after{content:var(--tw-content);font-size:10px}.after\\:leading-none:after{content:var(--tw-content);--tw-leading:1;line-height:1}.after\\:whitespace-nowrap:after{content:var(--tw-content);white-space:nowrap}.after\\:text-white:after{content:var(--tw-content);color:var(--color-white)}.after\\:content-\\[attr\\(data-label\\)\\]:after{--tw-content:attr(data-label);content:var(--tw-content)}@media (hover:hover){.hover\\:bg-\\[\\#0a85e0\\]:hover{background-color:#0a85e0}.hover\\:bg-\\[\\#2a2a2a\\]:hover{background-color:#2a2a2a}.hover\\:bg-red-400\\/10:hover{background-color:#ff65681a}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-red-400\\/10:hover{background-color:color-mix(in oklab, var(--color-red-400) 10%, transparent)}}.hover\\:bg-white\\/5:hover{background-color:#ffffff0d}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-white\\/5:hover{background-color:color-mix(in oklab, var(--color-white) 5%, transparent)}}.hover\\:bg-white\\/10:hover{background-color:#ffffff1a}@supports (color:color-mix(in lab, red, red)){.hover\\:bg-white\\/10:hover{background-color:color-mix(in oklab, var(--color-white) 10%, transparent)}}.hover\\:text-white:hover{color:var(--color-white)}.hover\\:text-white\\/80:hover{color:#fffc}@supports (color:color-mix(in lab, red, red)){.hover\\:text-white\\/80:hover{color:color-mix(in oklab, var(--color-white) 80%, transparent)}}.hover\\:ring-white\\/15:hover{--tw-ring-color:#ffffff26}@supports (color:color-mix(in lab, red, red)){.hover\\:ring-white\\/15:hover{--tw-ring-color:color-mix(in oklab, var(--color-white) 15%, transparent)}}}.focus\\:ring-\\[\\#0d99ff\\]:focus{--tw-ring-color:#0d99ff}.disabled\\:pointer-events-none:disabled{pointer-events:none}.disabled\\:bg-white\\/10:disabled{background-color:#ffffff1a}@supports (color:color-mix(in lab, red, red)){.disabled\\:bg-white\\/10:disabled{background-color:color-mix(in oklab, var(--color-white) 10%, transparent)}}.disabled\\:text-white\\/35:disabled{color:#ffffff59}@supports (color:color-mix(in lab, red, red)){.disabled\\:text-white\\/35:disabled{color:color-mix(in oklab, var(--color-white) 35%, transparent)}}.disabled\\:opacity-25:disabled{opacity:.25}.disabled\\:opacity-30:disabled{opacity:.3}@media (min-width:40rem){.sm\\:block{display:block}.sm\\:hidden{display:none}.sm\\:grid-cols-8{grid-template-columns:repeat(8,minmax(0,1fr))}.sm\\:px-8{padding-inline:calc(var(--spacing) * 8)}}@media (min-width:64rem){.lg\\:block{display:block}.lg\\:grid-cols-12{grid-template-columns:repeat(12,minmax(0,1fr))}.lg\\:gap-6{gap:calc(var(--spacing) * 6)}}.\\[\\&_svg\\]\\:size-3\\.5 svg{width:calc(var(--spacing) * 3.5);height:calc(var(--spacing) * 3.5)}.\\[\\&_svg\\]\\:size-4 svg{width:calc(var(--spacing) * 4);height:calc(var(--spacing) * 4)}}:host{all:initial}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-backdrop-blur{syntax:"*";inherits:false}@property --tw-backdrop-brightness{syntax:"*";inherits:false}@property --tw-backdrop-contrast{syntax:"*";inherits:false}@property --tw-backdrop-grayscale{syntax:"*";inherits:false}@property --tw-backdrop-hue-rotate{syntax:"*";inherits:false}@property --tw-backdrop-invert{syntax:"*";inherits:false}@property --tw-backdrop-opacity{syntax:"*";inherits:false}@property --tw-backdrop-saturate{syntax:"*";inherits:false}@property --tw-backdrop-sepia{syntax:"*";inherits:false}@property --tw-content{syntax:"*";inherits:false;initial-value:""}@keyframes spin{to{transform:rotate(360deg)}}';

// src/index.ts
var current = null;
function registerProperties() {
  if (document.getElementById("dsgn-tweaks-properties")) return;
  const rules = panel_generated_default.match(/@property[^{]+\{[^}]*\}/g) ?? [];
  const style = document.createElement("style");
  style.id = "dsgn-tweaks-properties";
  style.textContent = rules.join("\n");
  document.head.appendChild(style);
}
function init(config2 = {}) {
  if (typeof window === "undefined") return { destroy() {
  } };
  current?.destroy();
  setConfig(config2);
  const framed = new URLSearchParams(window.location.search).get("design") === "frame";
  const host = document.createElement("dsgn-tweaks-root");
  host.setAttribute("data-design-ui", "");
  host.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:2147483600;";
  const shadow = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = panel_generated_default;
  const mount = document.createElement("div");
  shadow.append(style, mount);
  registerProperties();
  document.body.appendChild(host);
  start(!framed);
  K(k(App, { framed }), mount);
  const instance = {
    destroy() {
      K(null, mount);
      host.remove();
      stop();
      if (current === instance) current = null;
    }
  };
  current = instance;
  return instance;
}
export {
  init
};
/*! Bundled license information:

lucide-preact/dist/esm/shared/src/utils/mergeClasses.mjs:
lucide-preact/dist/esm/shared/src/utils/toKebabCase.mjs:
lucide-preact/dist/esm/shared/src/utils/toLucideIconData.mjs:
lucide-preact/dist/esm/shared/src/utils/toCamelCase.mjs:
lucide-preact/dist/esm/shared/src/utils/toPascalCase.mjs:
lucide-preact/dist/esm/shared/src/build/defaultAttributes.mjs:
lucide-preact/dist/esm/shared/src/build/buildLucideIconNode.mjs:
lucide-preact/dist/esm/shared/src/utils/hasA11yProp.mjs:
lucide-preact/dist/esm/context.mjs:
lucide-preact/dist/esm/Icon.mjs:
lucide-preact/dist/esm/createLucideIcon.mjs:
lucide-preact/dist/esm/icons/check.mjs:
lucide-preact/dist/esm/icons/chevron-down.mjs:
lucide-preact/dist/esm/icons/chevron-up.mjs:
lucide-preact/dist/esm/icons/copy.mjs:
lucide-preact/dist/esm/icons/corner-left-up.mjs:
lucide-preact/dist/esm/icons/eye-off.mjs:
lucide-preact/dist/esm/icons/eye.mjs:
lucide-preact/dist/esm/icons/grid-3x3.mjs:
lucide-preact/dist/esm/icons/loader-circle.mjs:
lucide-preact/dist/esm/icons/moon.mjs:
lucide-preact/dist/esm/icons/mouse-pointer-2.mjs:
lucide-preact/dist/esm/icons/panel-left.mjs:
lucide-preact/dist/esm/icons/panel-right.mjs:
lucide-preact/dist/esm/icons/pen-tool.mjs:
lucide-preact/dist/esm/icons/rotate-ccw.mjs:
lucide-preact/dist/esm/icons/send.mjs:
lucide-preact/dist/esm/icons/square-dashed.mjs:
lucide-preact/dist/esm/icons/sun.mjs:
lucide-preact/dist/esm/icons/type.mjs:
lucide-preact/dist/esm/icons/x.mjs:
lucide-preact/dist/esm/lucide-preact.mjs:
  (**
   * @license lucide-preact v1.52.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
