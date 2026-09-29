function Ge(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function ai(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Jn(e) {
  let t, n, r;
  e.length !== 2 ? (t = Ge, n = (o, c) => Ge(e(o), c), r = (o, c) => e(o) - c) : (t = e === Ge || e === ai ? e : si, n = e, r = e);
  function i(o, c, l = 0, d = o.length) {
    if (l < d) {
      if (t(c, c) !== 0) return d;
      do {
        const h = l + d >>> 1;
        n(o[h], c) < 0 ? l = h + 1 : d = h;
      } while (l < d);
    }
    return l;
  }
  function a(o, c, l = 0, d = o.length) {
    if (l < d) {
      if (t(c, c) !== 0) return d;
      do {
        const h = l + d >>> 1;
        n(o[h], c) <= 0 ? l = h + 1 : d = h;
      } while (l < d);
    }
    return l;
  }
  function s(o, c, l = 0, d = o.length) {
    const h = i(o, c, l, d - 1);
    return h > l && r(o[h - 1], c) > -r(o[h], c) ? h - 1 : h;
  }
  return { left: i, center: s, right: a };
}
function si() {
  return 0;
}
function oi(e) {
  return e === null ? NaN : +e;
}
const li = Jn(Ge), ci = li.right;
Jn(oi).center;
const di = Math.sqrt(50), hi = Math.sqrt(10), ui = Math.sqrt(2);
function nt(e, t, n) {
  const r = (t - e) / Math.max(0, n), i = Math.floor(Math.log10(r)), a = r / Math.pow(10, i), s = a >= di ? 10 : a >= hi ? 5 : a >= ui ? 2 : 1;
  let o, c, l;
  return i < 0 ? (l = Math.pow(10, -i) / s, o = Math.round(e * l), c = Math.round(t * l), o / l < e && ++o, c / l > t && --c, l = -l) : (l = Math.pow(10, i) * s, o = Math.round(e / l), c = Math.round(t / l), o * l < e && ++o, c * l > t && --c), c < o && 0.5 <= n && n < 2 ? nt(e, t, n * 2) : [o, c, l];
}
function pi(e, t, n) {
  if (t = +t, e = +e, n = +n, !(n > 0)) return [];
  if (e === t) return [e];
  const r = t < e, [i, a, s] = r ? nt(t, e, n) : nt(e, t, n);
  if (!(a >= i)) return [];
  const o = a - i + 1, c = new Array(o);
  if (r)
    if (s < 0) for (let l = 0; l < o; ++l) c[l] = (a - l) / -s;
    else for (let l = 0; l < o; ++l) c[l] = (a - l) * s;
  else if (s < 0) for (let l = 0; l < o; ++l) c[l] = (i + l) / -s;
  else for (let l = 0; l < o; ++l) c[l] = (i + l) * s;
  return c;
}
function Mt(e, t, n) {
  return t = +t, e = +e, n = +n, nt(e, t, n)[2];
}
function mi(e, t, n) {
  t = +t, e = +e, n = +n;
  const r = t < e, i = r ? Mt(t, e, n) : Mt(e, t, n);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
var fi = { value: () => {
} };
function Zn() {
  for (var e = 0, t = arguments.length, n = {}, r; e < t; ++e) {
    if (!(r = arguments[e] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new je(n);
}
function je(e) {
  this._ = e;
}
function gi(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
je.prototype = Zn.prototype = {
  constructor: je,
  on: function(e, t) {
    var n = this._, r = gi(e + "", n), i, a = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++a < s; ) if ((i = (e = r[a]).type) && (i = bi(n[i], e.name))) return i;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++a < s; )
      if (i = (e = r[a]).type) n[i] = fn(n[i], e.name, t);
      else if (t == null) for (i in n) n[i] = fn(n[i], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new je(e);
  },
  call: function(e, t) {
    if ((i = arguments.length - 2) > 0) for (var n = new Array(i), r = 0, i, a; r < i; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (a = this._[e], r = 0, i = a.length; r < i; ++r) a[r].value.apply(t, n);
  },
  apply: function(e, t, n) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var r = this._[e], i = 0, a = r.length; i < a; ++i) r[i].value.apply(t, n);
  }
};
function bi(e, t) {
  for (var n = 0, r = e.length, i; n < r; ++n)
    if ((i = e[n]).name === t)
      return i.value;
}
function fn(e, t, n) {
  for (var r = 0, i = e.length; r < i; ++r)
    if (e[r].name === t) {
      e[r] = fi, e = e.slice(0, r).concat(e.slice(r + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var Et = "http://www.w3.org/1999/xhtml";
const gn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Et,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function gt(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), gn.hasOwnProperty(t) ? { space: gn[t], local: e } : e;
}
function vi(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === Et && t.documentElement.namespaceURI === Et ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function yi(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Qn(e) {
  var t = gt(e);
  return (t.local ? yi : vi)(t);
}
function _i() {
}
function Ut(e) {
  return e == null ? _i : function() {
    return this.querySelector(e);
  };
}
function wi(e) {
  typeof e != "function" && (e = Ut(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = t[i], s = a.length, o = r[i] = new Array(s), c, l, d = 0; d < s; ++d)
      (c = a[d]) && (l = e.call(c, c.__data__, d, a)) && ("__data__" in c && (l.__data__ = c.__data__), o[d] = l);
  return new q(r, this._parents);
}
function xi(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function $i() {
  return [];
}
function er(e) {
  return e == null ? $i : function() {
    return this.querySelectorAll(e);
  };
}
function ki(e) {
  return function() {
    return xi(e.apply(this, arguments));
  };
}
function Si(e) {
  typeof e == "function" ? e = ki(e) : e = er(e);
  for (var t = this._groups, n = t.length, r = [], i = [], a = 0; a < n; ++a)
    for (var s = t[a], o = s.length, c, l = 0; l < o; ++l)
      (c = s[l]) && (r.push(e.call(c, c.__data__, l, s)), i.push(c));
  return new q(r, i);
}
function tr(e) {
  return function() {
    return this.matches(e);
  };
}
function nr(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Ai = Array.prototype.find;
function Mi(e) {
  return function() {
    return Ai.call(this.children, e);
  };
}
function Ei() {
  return this.firstElementChild;
}
function Ii(e) {
  return this.select(e == null ? Ei : Mi(typeof e == "function" ? e : nr(e)));
}
var Ci = Array.prototype.filter;
function Ri() {
  return Array.from(this.children);
}
function Ni(e) {
  return function() {
    return Ci.call(this.children, e);
  };
}
function Ti(e) {
  return this.selectAll(e == null ? Ri : Ni(typeof e == "function" ? e : nr(e)));
}
function Pi(e) {
  typeof e != "function" && (e = tr(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = t[i], s = a.length, o = r[i] = [], c, l = 0; l < s; ++l)
      (c = a[l]) && e.call(c, c.__data__, l, a) && o.push(c);
  return new q(r, this._parents);
}
function rr(e) {
  return new Array(e.length);
}
function qi() {
  return new q(this._enter || this._groups.map(rr), this._parents);
}
function rt(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
rt.prototype = {
  constructor: rt,
  appendChild: function(e) {
    return this._parent.insertBefore(e, this._next);
  },
  insertBefore: function(e, t) {
    return this._parent.insertBefore(e, t);
  },
  querySelector: function(e) {
    return this._parent.querySelector(e);
  },
  querySelectorAll: function(e) {
    return this._parent.querySelectorAll(e);
  }
};
function Oi(e) {
  return function() {
    return e;
  };
}
function zi(e, t, n, r, i, a) {
  for (var s = 0, o, c = t.length, l = a.length; s < l; ++s)
    (o = t[s]) ? (o.__data__ = a[s], r[s] = o) : n[s] = new rt(e, a[s]);
  for (; s < c; ++s)
    (o = t[s]) && (i[s] = o);
}
function Li(e, t, n, r, i, a, s) {
  var o, c, l = /* @__PURE__ */ new Map(), d = t.length, h = a.length, p = new Array(d), u;
  for (o = 0; o < d; ++o)
    (c = t[o]) && (p[o] = u = s.call(c, c.__data__, o, t) + "", l.has(u) ? i[o] = c : l.set(u, c));
  for (o = 0; o < h; ++o)
    u = s.call(e, a[o], o, a) + "", (c = l.get(u)) ? (r[o] = c, c.__data__ = a[o], l.delete(u)) : n[o] = new rt(e, a[o]);
  for (o = 0; o < d; ++o)
    (c = t[o]) && l.get(p[o]) === c && (i[o] = c);
}
function Di(e) {
  return e.__data__;
}
function Hi(e, t) {
  if (!arguments.length) return Array.from(this, Di);
  var n = t ? Li : zi, r = this._parents, i = this._groups;
  typeof e != "function" && (e = Oi(e));
  for (var a = i.length, s = new Array(a), o = new Array(a), c = new Array(a), l = 0; l < a; ++l) {
    var d = r[l], h = i[l], p = h.length, u = Fi(e.call(d, d && d.__data__, l, r)), f = u.length, g = o[l] = new Array(f), k = s[l] = new Array(f), M = c[l] = new Array(p);
    n(d, h, g, k, M, u, t);
    for (var F = 0, W = 0, z, ye; F < f; ++F)
      if (z = g[F]) {
        for (F >= W && (W = F + 1); !(ye = k[W]) && ++W < f; ) ;
        z._next = ye || null;
      }
  }
  return s = new q(s, r), s._enter = o, s._exit = c, s;
}
function Fi(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Ui() {
  return new q(this._exit || this._groups.map(rr), this._parents);
}
function Bi(e, t, n) {
  var r = this.enter(), i = this, a = this.exit();
  return typeof e == "function" ? (r = e(r), r && (r = r.selection())) : r = r.append(e + ""), t != null && (i = t(i), i && (i = i.selection())), n == null ? a.remove() : n(a), r && i ? r.merge(i).order() : i;
}
function Vi(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, r = t._groups, i = n.length, a = r.length, s = Math.min(i, a), o = new Array(i), c = 0; c < s; ++c)
    for (var l = n[c], d = r[c], h = l.length, p = o[c] = new Array(h), u, f = 0; f < h; ++f)
      (u = l[f] || d[f]) && (p[f] = u);
  for (; c < i; ++c)
    o[c] = n[c];
  return new q(o, this._parents);
}
function Ki() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var r = e[t], i = r.length - 1, a = r[i], s; --i >= 0; )
      (s = r[i]) && (a && s.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(s, a), a = s);
  return this;
}
function Xi(e) {
  e || (e = Wi);
  function t(h, p) {
    return h && p ? e(h.__data__, p.__data__) : !h - !p;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), a = 0; a < r; ++a) {
    for (var s = n[a], o = s.length, c = i[a] = new Array(o), l, d = 0; d < o; ++d)
      (l = s[d]) && (c[d] = l);
    c.sort(t);
  }
  return new q(i, this._parents).order();
}
function Wi(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Yi() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Gi() {
  return Array.from(this);
}
function ji() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], i = 0, a = r.length; i < a; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function Ji() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Zi() {
  return !this.node();
}
function Qi(e) {
  for (var t = this._groups, n = 0, r = t.length; n < r; ++n)
    for (var i = t[n], a = 0, s = i.length, o; a < s; ++a)
      (o = i[a]) && e.call(o, o.__data__, a, i);
  return this;
}
function ea(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function ta(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function na(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function ra(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function ia(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function aa(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function sa(e, t) {
  var n = gt(e);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((t == null ? n.local ? ta : ea : typeof t == "function" ? n.local ? aa : ia : n.local ? ra : na)(n, t));
}
function ir(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function oa(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function la(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function ca(e, t, n) {
  return function() {
    var r = t.apply(this, arguments);
    r == null ? this.style.removeProperty(e) : this.style.setProperty(e, r, n);
  };
}
function da(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? oa : typeof t == "function" ? ca : la)(e, t, n ?? "")) : ue(this.node(), e);
}
function ue(e, t) {
  return e.style.getPropertyValue(t) || ir(e).getComputedStyle(e, null).getPropertyValue(t);
}
function ha(e) {
  return function() {
    delete this[e];
  };
}
function ua(e, t) {
  return function() {
    this[e] = t;
  };
}
function pa(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function ma(e, t) {
  return arguments.length > 1 ? this.each((t == null ? ha : typeof t == "function" ? pa : ua)(e, t)) : this.node()[e];
}
function ar(e) {
  return e.trim().split(/^|\s+/);
}
function Bt(e) {
  return e.classList || new sr(e);
}
function sr(e) {
  this._node = e, this._names = ar(e.getAttribute("class") || "");
}
sr.prototype = {
  add: function(e) {
    var t = this._names.indexOf(e);
    t < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(e) {
    var t = this._names.indexOf(e);
    t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(e) {
    return this._names.indexOf(e) >= 0;
  }
};
function or(e, t) {
  for (var n = Bt(e), r = -1, i = t.length; ++r < i; ) n.add(t[r]);
}
function lr(e, t) {
  for (var n = Bt(e), r = -1, i = t.length; ++r < i; ) n.remove(t[r]);
}
function fa(e) {
  return function() {
    or(this, e);
  };
}
function ga(e) {
  return function() {
    lr(this, e);
  };
}
function ba(e, t) {
  return function() {
    (t.apply(this, arguments) ? or : lr)(this, e);
  };
}
function va(e, t) {
  var n = ar(e + "");
  if (arguments.length < 2) {
    for (var r = Bt(this.node()), i = -1, a = n.length; ++i < a; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? ba : t ? fa : ga)(n, t));
}
function ya() {
  this.textContent = "";
}
function _a(e) {
  return function() {
    this.textContent = e;
  };
}
function wa(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function xa(e) {
  return arguments.length ? this.each(e == null ? ya : (typeof e == "function" ? wa : _a)(e)) : this.node().textContent;
}
function $a() {
  this.innerHTML = "";
}
function ka(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Sa(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Aa(e) {
  return arguments.length ? this.each(e == null ? $a : (typeof e == "function" ? Sa : ka)(e)) : this.node().innerHTML;
}
function Ma() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Ea() {
  return this.each(Ma);
}
function Ia() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ca() {
  return this.each(Ia);
}
function Ra(e) {
  var t = typeof e == "function" ? e : Qn(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Na() {
  return null;
}
function Ta(e, t) {
  var n = typeof e == "function" ? e : Qn(e), r = t == null ? Na : typeof t == "function" ? t : Ut(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function Pa() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function qa() {
  return this.each(Pa);
}
function Oa() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function za() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function La(e) {
  return this.select(e ? za : Oa);
}
function Da(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Ha(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Fa(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", r = t.indexOf(".");
    return r >= 0 && (n = t.slice(r + 1), t = t.slice(0, r)), { type: t, name: n };
  });
}
function Ua(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, r = -1, i = t.length, a; n < i; ++n)
        a = t[n], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++r] = a;
      ++r ? t.length = r : delete this.__on;
    }
  };
}
function Ba(e, t, n) {
  return function() {
    var r = this.__on, i, a = Ha(t);
    if (r) {
      for (var s = 0, o = r.length; s < o; ++s)
        if ((i = r[s]).type === e.type && i.name === e.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = a, i.options = n), i.value = t;
          return;
        }
    }
    this.addEventListener(e.type, a, n), i = { type: e.type, name: e.name, value: t, listener: a, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function Va(e, t, n) {
  var r = Fa(e + ""), i, a = r.length, s;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var c = 0, l = o.length, d; c < l; ++c)
        for (i = 0, d = o[c]; i < a; ++i)
          if ((s = r[i]).type === d.type && s.name === d.name)
            return d.value;
    }
    return;
  }
  for (o = t ? Ba : Ua, i = 0; i < a; ++i) this.each(o(r[i], t, n));
  return this;
}
function cr(e, t, n) {
  var r = ir(e), i = r.CustomEvent;
  typeof i == "function" ? i = new i(t, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(t, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(t, !1, !1)), e.dispatchEvent(i);
}
function Ka(e, t) {
  return function() {
    return cr(this, e, t);
  };
}
function Xa(e, t) {
  return function() {
    return cr(this, e, t.apply(this, arguments));
  };
}
function Wa(e, t) {
  return this.each((typeof t == "function" ? Xa : Ka)(e, t));
}
function* Ya() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var r = e[t], i = 0, a = r.length, s; i < a; ++i)
      (s = r[i]) && (yield s);
}
var Ga = [null];
function q(e, t) {
  this._groups = e, this._parents = t;
}
function ze() {
  return new q([[document.documentElement]], Ga);
}
function ja() {
  return this;
}
q.prototype = ze.prototype = {
  constructor: q,
  select: wi,
  selectAll: Si,
  selectChild: Ii,
  selectChildren: Ti,
  filter: Pi,
  data: Hi,
  enter: qi,
  exit: Ui,
  join: Bi,
  merge: Vi,
  selection: ja,
  order: Ki,
  sort: Xi,
  call: Yi,
  nodes: Gi,
  node: ji,
  size: Ji,
  empty: Zi,
  each: Qi,
  attr: sa,
  style: da,
  property: ma,
  classed: va,
  text: xa,
  html: Aa,
  raise: Ea,
  lower: Ca,
  append: Ra,
  insert: Ta,
  remove: qa,
  clone: La,
  datum: Da,
  on: Va,
  dispatch: Wa,
  [Symbol.iterator]: Ya
};
function Vt(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function dr(e, t) {
  var n = Object.create(e.prototype);
  for (var r in t) n[r] = t[r];
  return n;
}
function Le() {
}
var Ie = 0.7, it = 1 / Ie, ce = "\\s*([+-]?\\d+)\\s*", Ce = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", D = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Ja = /^#([0-9a-f]{3,8})$/, Za = new RegExp(`^rgb\\(${ce},${ce},${ce}\\)$`), Qa = new RegExp(`^rgb\\(${D},${D},${D}\\)$`), es = new RegExp(`^rgba\\(${ce},${ce},${ce},${Ce}\\)$`), ts = new RegExp(`^rgba\\(${D},${D},${D},${Ce}\\)$`), ns = new RegExp(`^hsl\\(${Ce},${D},${D}\\)$`), rs = new RegExp(`^hsla\\(${Ce},${D},${D},${Ce}\\)$`), bn = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Vt(Le, ne, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: vn,
  // Deprecated! Use color.formatHex.
  formatHex: vn,
  formatHex8: is,
  formatHsl: as,
  formatRgb: yn,
  toString: yn
});
function vn() {
  return this.rgb().formatHex();
}
function is() {
  return this.rgb().formatHex8();
}
function as() {
  return hr(this).formatHsl();
}
function yn() {
  return this.rgb().formatRgb();
}
function ne(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = Ja.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? _n(t) : n === 3 ? new E(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Be(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Be(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Za.exec(e)) ? new E(t[1], t[2], t[3], 1) : (t = Qa.exec(e)) ? new E(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = es.exec(e)) ? Be(t[1], t[2], t[3], t[4]) : (t = ts.exec(e)) ? Be(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = ns.exec(e)) ? $n(t[1], t[2] / 100, t[3] / 100, 1) : (t = rs.exec(e)) ? $n(t[1], t[2] / 100, t[3] / 100, t[4]) : bn.hasOwnProperty(e) ? _n(bn[e]) : e === "transparent" ? new E(NaN, NaN, NaN, 0) : null;
}
function _n(e) {
  return new E(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Be(e, t, n, r) {
  return r <= 0 && (e = t = n = NaN), new E(e, t, n, r);
}
function ss(e) {
  return e instanceof Le || (e = ne(e)), e ? (e = e.rgb(), new E(e.r, e.g, e.b, e.opacity)) : new E();
}
function It(e, t, n, r) {
  return arguments.length === 1 ? ss(e) : new E(e, t, n, r ?? 1);
}
function E(e, t, n, r) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +r;
}
Vt(E, It, dr(Le, {
  brighter(e) {
    return e = e == null ? it : Math.pow(it, e), new E(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ie : Math.pow(Ie, e), new E(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new E(te(this.r), te(this.g), te(this.b), at(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: wn,
  // Deprecated! Use color.formatHex.
  formatHex: wn,
  formatHex8: os,
  formatRgb: xn,
  toString: xn
}));
function wn() {
  return `#${Q(this.r)}${Q(this.g)}${Q(this.b)}`;
}
function os() {
  return `#${Q(this.r)}${Q(this.g)}${Q(this.b)}${Q((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function xn() {
  const e = at(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${te(this.r)}, ${te(this.g)}, ${te(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function at(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function te(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Q(e) {
  return e = te(e), (e < 16 ? "0" : "") + e.toString(16);
}
function $n(e, t, n, r) {
  return r <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new P(e, t, n, r);
}
function hr(e) {
  if (e instanceof P) return new P(e.h, e.s, e.l, e.opacity);
  if (e instanceof Le || (e = ne(e)), !e) return new P();
  if (e instanceof P) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.min(t, n, r), a = Math.max(t, n, r), s = NaN, o = a - i, c = (a + i) / 2;
  return o ? (t === a ? s = (n - r) / o + (n < r) * 6 : n === a ? s = (r - t) / o + 2 : s = (t - n) / o + 4, o /= c < 0.5 ? a + i : 2 - a - i, s *= 60) : o = c > 0 && c < 1 ? 0 : s, new P(s, o, c, e.opacity);
}
function ls(e, t, n, r) {
  return arguments.length === 1 ? hr(e) : new P(e, t, n, r ?? 1);
}
function P(e, t, n, r) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +r;
}
Vt(P, ls, dr(Le, {
  brighter(e) {
    return e = e == null ? it : Math.pow(it, e), new P(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ie : Math.pow(Ie, e), new P(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * t, i = 2 * n - r;
    return new E(
      $t(e >= 240 ? e - 240 : e + 120, i, r),
      $t(e, i, r),
      $t(e < 120 ? e + 240 : e - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new P(kn(this.h), Ve(this.s), Ve(this.l), at(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = at(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${kn(this.h)}, ${Ve(this.s) * 100}%, ${Ve(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function kn(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Ve(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function $t(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const Kt = (e) => () => e;
function cs(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function ds(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(r) {
    return Math.pow(e + r * t, n);
  };
}
function hs(e) {
  return (e = +e) == 1 ? ur : function(t, n) {
    return n - t ? ds(t, n, e) : Kt(isNaN(t) ? n : t);
  };
}
function ur(e, t) {
  var n = t - e;
  return n ? cs(e, n) : Kt(isNaN(e) ? t : e);
}
const st = (function e(t) {
  var n = hs(t);
  function r(i, a) {
    var s = n((i = It(i)).r, (a = It(a)).r), o = n(i.g, a.g), c = n(i.b, a.b), l = ur(i.opacity, a.opacity);
    return function(d) {
      return i.r = s(d), i.g = o(d), i.b = c(d), i.opacity = l(d), i + "";
    };
  }
  return r.gamma = e, r;
})(1);
function us(e, t) {
  t || (t = []);
  var n = e ? Math.min(t.length, e.length) : 0, r = t.slice(), i;
  return function(a) {
    for (i = 0; i < n; ++i) r[i] = e[i] * (1 - a) + t[i] * a;
    return r;
  };
}
function ps(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function ms(e, t) {
  var n = t ? t.length : 0, r = e ? Math.min(n, e.length) : 0, i = new Array(r), a = new Array(n), s;
  for (s = 0; s < r; ++s) i[s] = Xt(e[s], t[s]);
  for (; s < n; ++s) a[s] = t[s];
  return function(o) {
    for (s = 0; s < r; ++s) a[s] = i[s](o);
    return a;
  };
}
function fs(e, t) {
  var n = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(r) {
    return n.setTime(e * (1 - r) + t * r), n;
  };
}
function T(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
function gs(e, t) {
  var n = {}, r = {}, i;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (i in t)
    i in e ? n[i] = Xt(e[i], t[i]) : r[i] = t[i];
  return function(a) {
    for (i in n) r[i] = n[i](a);
    return r;
  };
}
var Ct = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, kt = new RegExp(Ct.source, "g");
function bs(e) {
  return function() {
    return e;
  };
}
function vs(e) {
  return function(t) {
    return e(t) + "";
  };
}
function pr(e, t) {
  var n = Ct.lastIndex = kt.lastIndex = 0, r, i, a, s = -1, o = [], c = [];
  for (e = e + "", t = t + ""; (r = Ct.exec(e)) && (i = kt.exec(t)); )
    (a = i.index) > n && (a = t.slice(n, a), o[s] ? o[s] += a : o[++s] = a), (r = r[0]) === (i = i[0]) ? o[s] ? o[s] += i : o[++s] = i : (o[++s] = null, c.push({ i: s, x: T(r, i) })), n = kt.lastIndex;
  return n < t.length && (a = t.slice(n), o[s] ? o[s] += a : o[++s] = a), o.length < 2 ? c[0] ? vs(c[0].x) : bs(t) : (t = c.length, function(l) {
    for (var d = 0, h; d < t; ++d) o[(h = c[d]).i] = h.x(l);
    return o.join("");
  });
}
function Xt(e, t) {
  var n = typeof t, r;
  return t == null || n === "boolean" ? Kt(t) : (n === "number" ? T : n === "string" ? (r = ne(t)) ? (t = r, st) : pr : t instanceof ne ? st : t instanceof Date ? fs : ps(t) ? us : Array.isArray(t) ? ms : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? gs : T)(e, t);
}
function ys(e, t) {
  return e = +e, t = +t, function(n) {
    return Math.round(e * (1 - n) + t * n);
  };
}
var Sn = 180 / Math.PI, Rt = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function mr(e, t, n, r, i, a) {
  var s, o, c;
  return (s = Math.sqrt(e * e + t * t)) && (e /= s, t /= s), (c = e * n + t * r) && (n -= e * c, r -= t * c), (o = Math.sqrt(n * n + r * r)) && (n /= o, r /= o, c /= o), e * r < t * n && (e = -e, t = -t, c = -c, s = -s), {
    translateX: i,
    translateY: a,
    rotate: Math.atan2(t, e) * Sn,
    skewX: Math.atan(c) * Sn,
    scaleX: s,
    scaleY: o
  };
}
var Ke;
function _s(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Rt : mr(t.a, t.b, t.c, t.d, t.e, t.f);
}
function ws(e) {
  return e == null || (Ke || (Ke = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ke.setAttribute("transform", e), !(e = Ke.transform.baseVal.consolidate())) ? Rt : (e = e.matrix, mr(e.a, e.b, e.c, e.d, e.e, e.f));
}
function fr(e, t, n, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function a(l, d, h, p, u, f) {
    if (l !== h || d !== p) {
      var g = u.push("translate(", null, t, null, n);
      f.push({ i: g - 4, x: T(l, h) }, { i: g - 2, x: T(d, p) });
    } else (h || p) && u.push("translate(" + h + t + p + n);
  }
  function s(l, d, h, p) {
    l !== d ? (l - d > 180 ? d += 360 : d - l > 180 && (l += 360), p.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: T(l, d) })) : d && h.push(i(h) + "rotate(" + d + r);
  }
  function o(l, d, h, p) {
    l !== d ? p.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: T(l, d) }) : d && h.push(i(h) + "skewX(" + d + r);
  }
  function c(l, d, h, p, u, f) {
    if (l !== h || d !== p) {
      var g = u.push(i(u) + "scale(", null, ",", null, ")");
      f.push({ i: g - 4, x: T(l, h) }, { i: g - 2, x: T(d, p) });
    } else (h !== 1 || p !== 1) && u.push(i(u) + "scale(" + h + "," + p + ")");
  }
  return function(l, d) {
    var h = [], p = [];
    return l = e(l), d = e(d), a(l.translateX, l.translateY, d.translateX, d.translateY, h, p), s(l.rotate, d.rotate, h, p), o(l.skewX, d.skewX, h, p), c(l.scaleX, l.scaleY, d.scaleX, d.scaleY, h, p), l = d = null, function(u) {
      for (var f = -1, g = p.length, k; ++f < g; ) h[(k = p[f]).i] = k.x(u);
      return h.join("");
    };
  };
}
var xs = fr(_s, "px, ", "px)", "deg)"), $s = fr(ws, ", ", ")", ")"), pe = 0, xe = 0, _e = 0, gr = 1e3, ot, $e, lt = 0, re = 0, bt = 0, Re = typeof performance == "object" && performance.now ? performance : Date, br = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Wt() {
  return re || (br(ks), re = Re.now() + bt);
}
function ks() {
  re = 0;
}
function ct() {
  this._call = this._time = this._next = null;
}
ct.prototype = vr.prototype = {
  constructor: ct,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? Wt() : +n) + (t == null ? 0 : +t), !this._next && $e !== this && ($e ? $e._next = this : ot = this, $e = this), this._call = e, this._time = n, Nt();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Nt());
  }
};
function vr(e, t, n) {
  var r = new ct();
  return r.restart(e, t, n), r;
}
function Ss() {
  Wt(), ++pe;
  for (var e = ot, t; e; )
    (t = re - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --pe;
}
function An() {
  re = (lt = Re.now()) + bt, pe = xe = 0;
  try {
    Ss();
  } finally {
    pe = 0, Ms(), re = 0;
  }
}
function As() {
  var e = Re.now(), t = e - lt;
  t > gr && (bt -= t, lt = e);
}
function Ms() {
  for (var e, t = ot, n, r = 1 / 0; t; )
    t._call ? (r > t._time && (r = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : ot = n);
  $e = e, Nt(r);
}
function Nt(e) {
  if (!pe) {
    xe && (xe = clearTimeout(xe));
    var t = e - re;
    t > 24 ? (e < 1 / 0 && (xe = setTimeout(An, e - Re.now() - bt)), _e && (_e = clearInterval(_e))) : (_e || (lt = Re.now(), _e = setInterval(As, gr)), pe = 1, br(An));
  }
}
function Mn(e, t, n) {
  var r = new ct();
  return t = t == null ? 0 : +t, r.restart((i) => {
    r.stop(), e(i + t);
  }, t, n), r;
}
var Es = Zn("start", "end", "cancel", "interrupt"), Is = [], yr = 0, En = 1, Tt = 2, Je = 3, In = 4, Pt = 5, Ze = 6;
function vt(e, t, n, r, i, a) {
  var s = e.__transition;
  if (!s) e.__transition = {};
  else if (n in s) return;
  Cs(e, n, {
    name: t,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Es,
    tween: Is,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: yr
  });
}
function Yt(e, t) {
  var n = O(e, t);
  if (n.state > yr) throw new Error("too late; already scheduled");
  return n;
}
function H(e, t) {
  var n = O(e, t);
  if (n.state > Je) throw new Error("too late; already running");
  return n;
}
function O(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function Cs(e, t, n) {
  var r = e.__transition, i;
  r[t] = n, n.timer = vr(a, 0, n.time);
  function a(l) {
    n.state = En, n.timer.restart(s, n.delay, n.time), n.delay <= l && s(l - n.delay);
  }
  function s(l) {
    var d, h, p, u;
    if (n.state !== En) return c();
    for (d in r)
      if (u = r[d], u.name === n.name) {
        if (u.state === Je) return Mn(s);
        u.state === In ? (u.state = Ze, u.timer.stop(), u.on.call("interrupt", e, e.__data__, u.index, u.group), delete r[d]) : +d < t && (u.state = Ze, u.timer.stop(), u.on.call("cancel", e, e.__data__, u.index, u.group), delete r[d]);
      }
    if (Mn(function() {
      n.state === Je && (n.state = In, n.timer.restart(o, n.delay, n.time), o(l));
    }), n.state = Tt, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Tt) {
      for (n.state = Je, i = new Array(p = n.tween.length), d = 0, h = -1; d < p; ++d)
        (u = n.tween[d].value.call(e, e.__data__, n.index, n.group)) && (i[++h] = u);
      i.length = h + 1;
    }
  }
  function o(l) {
    for (var d = l < n.duration ? n.ease.call(null, l / n.duration) : (n.timer.restart(c), n.state = Pt, 1), h = -1, p = i.length; ++h < p; )
      i[h].call(e, d);
    n.state === Pt && (n.on.call("end", e, e.__data__, n.index, n.group), c());
  }
  function c() {
    n.state = Ze, n.timer.stop(), delete r[t];
    for (var l in r) return;
    delete e.__transition;
  }
}
function Rs(e, t) {
  var n = e.__transition, r, i, a = !0, s;
  if (n) {
    t = t == null ? null : t + "";
    for (s in n) {
      if ((r = n[s]).name !== t) {
        a = !1;
        continue;
      }
      i = r.state > Tt && r.state < Pt, r.state = Ze, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", e, e.__data__, r.index, r.group), delete n[s];
    }
    a && delete e.__transition;
  }
}
function Ns(e) {
  return this.each(function() {
    Rs(this, e);
  });
}
function Ts(e, t) {
  var n, r;
  return function() {
    var i = H(this, e), a = i.tween;
    if (a !== n) {
      r = n = a;
      for (var s = 0, o = r.length; s < o; ++s)
        if (r[s].name === t) {
          r = r.slice(), r.splice(s, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Ps(e, t, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var a = H(this, e), s = a.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var o = { name: t, value: n }, c = 0, l = i.length; c < l; ++c)
        if (i[c].name === t) {
          i[c] = o;
          break;
        }
      c === l && i.push(o);
    }
    a.tween = i;
  };
}
function qs(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var r = O(this.node(), n).tween, i = 0, a = r.length, s; i < a; ++i)
      if ((s = r[i]).name === e)
        return s.value;
    return null;
  }
  return this.each((t == null ? Ts : Ps)(n, e, t));
}
function Gt(e, t, n) {
  var r = e._id;
  return e.each(function() {
    var i = H(this, r);
    (i.value || (i.value = {}))[t] = n.apply(this, arguments);
  }), function(i) {
    return O(i, r).value[t];
  };
}
function _r(e, t) {
  var n;
  return (typeof t == "number" ? T : t instanceof ne ? st : (n = ne(t)) ? (t = n, st) : pr)(e, t);
}
function Os(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function zs(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Ls(e, t, n) {
  var r, i = n + "", a;
  return function() {
    var s = this.getAttribute(e);
    return s === i ? null : s === r ? a : a = t(r = s, n);
  };
}
function Ds(e, t, n) {
  var r, i = n + "", a;
  return function() {
    var s = this.getAttributeNS(e.space, e.local);
    return s === i ? null : s === r ? a : a = t(r = s, n);
  };
}
function Hs(e, t, n) {
  var r, i, a;
  return function() {
    var s, o = n(this), c;
    return o == null ? void this.removeAttribute(e) : (s = this.getAttribute(e), c = o + "", s === c ? null : s === r && c === i ? a : (i = c, a = t(r = s, o)));
  };
}
function Fs(e, t, n) {
  var r, i, a;
  return function() {
    var s, o = n(this), c;
    return o == null ? void this.removeAttributeNS(e.space, e.local) : (s = this.getAttributeNS(e.space, e.local), c = o + "", s === c ? null : s === r && c === i ? a : (i = c, a = t(r = s, o)));
  };
}
function Us(e, t) {
  var n = gt(e), r = n === "transform" ? $s : _r;
  return this.attrTween(e, typeof t == "function" ? (n.local ? Fs : Hs)(n, r, Gt(this, "attr." + e, t)) : t == null ? (n.local ? zs : Os)(n) : (n.local ? Ds : Ls)(n, r, t));
}
function Bs(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function Vs(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function Ks(e, t) {
  var n, r;
  function i() {
    var a = t.apply(this, arguments);
    return a !== r && (n = (r = a) && Vs(e, a)), n;
  }
  return i._value = t, i;
}
function Xs(e, t) {
  var n, r;
  function i() {
    var a = t.apply(this, arguments);
    return a !== r && (n = (r = a) && Bs(e, a)), n;
  }
  return i._value = t, i;
}
function Ws(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var r = gt(e);
  return this.tween(n, (r.local ? Ks : Xs)(r, t));
}
function Ys(e, t) {
  return function() {
    Yt(this, e).delay = +t.apply(this, arguments);
  };
}
function Gs(e, t) {
  return t = +t, function() {
    Yt(this, e).delay = t;
  };
}
function js(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Ys : Gs)(t, e)) : O(this.node(), t).delay;
}
function Js(e, t) {
  return function() {
    H(this, e).duration = +t.apply(this, arguments);
  };
}
function Zs(e, t) {
  return t = +t, function() {
    H(this, e).duration = t;
  };
}
function Qs(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Js : Zs)(t, e)) : O(this.node(), t).duration;
}
function eo(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    H(this, e).ease = t;
  };
}
function to(e) {
  var t = this._id;
  return arguments.length ? this.each(eo(t, e)) : O(this.node(), t).ease;
}
function no(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    H(this, e).ease = n;
  };
}
function ro(e) {
  if (typeof e != "function") throw new Error();
  return this.each(no(this._id, e));
}
function io(e) {
  typeof e != "function" && (e = tr(e));
  for (var t = this._groups, n = t.length, r = new Array(n), i = 0; i < n; ++i)
    for (var a = t[i], s = a.length, o = r[i] = [], c, l = 0; l < s; ++l)
      (c = a[l]) && e.call(c, c.__data__, l, a) && o.push(c);
  return new K(r, this._parents, this._name, this._id);
}
function ao(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, r = t.length, i = n.length, a = Math.min(r, i), s = new Array(r), o = 0; o < a; ++o)
    for (var c = t[o], l = n[o], d = c.length, h = s[o] = new Array(d), p, u = 0; u < d; ++u)
      (p = c[u] || l[u]) && (h[u] = p);
  for (; o < r; ++o)
    s[o] = t[o];
  return new K(s, this._parents, this._name, this._id);
}
function so(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function oo(e, t, n) {
  var r, i, a = so(t) ? Yt : H;
  return function() {
    var s = a(this, e), o = s.on;
    o !== r && (i = (r = o).copy()).on(t, n), s.on = i;
  };
}
function lo(e, t) {
  var n = this._id;
  return arguments.length < 2 ? O(this.node(), n).on.on(e) : this.each(oo(n, e, t));
}
function co(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function ho() {
  return this.on("end.remove", co(this._id));
}
function uo(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Ut(e));
  for (var r = this._groups, i = r.length, a = new Array(i), s = 0; s < i; ++s)
    for (var o = r[s], c = o.length, l = a[s] = new Array(c), d, h, p = 0; p < c; ++p)
      (d = o[p]) && (h = e.call(d, d.__data__, p, o)) && ("__data__" in d && (h.__data__ = d.__data__), l[p] = h, vt(l[p], t, n, p, l, O(d, n)));
  return new K(a, this._parents, t, n);
}
function po(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = er(e));
  for (var r = this._groups, i = r.length, a = [], s = [], o = 0; o < i; ++o)
    for (var c = r[o], l = c.length, d, h = 0; h < l; ++h)
      if (d = c[h]) {
        for (var p = e.call(d, d.__data__, h, c), u, f = O(d, n), g = 0, k = p.length; g < k; ++g)
          (u = p[g]) && vt(u, t, n, g, p, f);
        a.push(p), s.push(d);
      }
  return new K(a, s, t, n);
}
var mo = ze.prototype.constructor;
function fo() {
  return new mo(this._groups, this._parents);
}
function go(e, t) {
  var n, r, i;
  return function() {
    var a = ue(this, e), s = (this.style.removeProperty(e), ue(this, e));
    return a === s ? null : a === n && s === r ? i : i = t(n = a, r = s);
  };
}
function wr(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function bo(e, t, n) {
  var r, i = n + "", a;
  return function() {
    var s = ue(this, e);
    return s === i ? null : s === r ? a : a = t(r = s, n);
  };
}
function vo(e, t, n) {
  var r, i, a;
  return function() {
    var s = ue(this, e), o = n(this), c = o + "";
    return o == null && (c = o = (this.style.removeProperty(e), ue(this, e))), s === c ? null : s === r && c === i ? a : (i = c, a = t(r = s, o));
  };
}
function yo(e, t) {
  var n, r, i, a = "style." + t, s = "end." + a, o;
  return function() {
    var c = H(this, e), l = c.on, d = c.value[a] == null ? o || (o = wr(t)) : void 0;
    (l !== n || i !== d) && (r = (n = l).copy()).on(s, i = d), c.on = r;
  };
}
function _o(e, t, n) {
  var r = (e += "") == "transform" ? xs : _r;
  return t == null ? this.styleTween(e, go(e, r)).on("end.style." + e, wr(e)) : typeof t == "function" ? this.styleTween(e, vo(e, r, Gt(this, "style." + e, t))).each(yo(this._id, e)) : this.styleTween(e, bo(e, r, t), n).on("end.style." + e, null);
}
function wo(e, t, n) {
  return function(r) {
    this.style.setProperty(e, t.call(this, r), n);
  };
}
function xo(e, t, n) {
  var r, i;
  function a() {
    var s = t.apply(this, arguments);
    return s !== i && (r = (i = s) && wo(e, s, n)), r;
  }
  return a._value = t, a;
}
function $o(e, t, n) {
  var r = "style." + (e += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (t == null) return this.tween(r, null);
  if (typeof t != "function") throw new Error();
  return this.tween(r, xo(e, t, n ?? ""));
}
function ko(e) {
  return function() {
    this.textContent = e;
  };
}
function So(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Ao(e) {
  return this.tween("text", typeof e == "function" ? So(Gt(this, "text", e)) : ko(e == null ? "" : e + ""));
}
function Mo(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Eo(e) {
  var t, n;
  function r() {
    var i = e.apply(this, arguments);
    return i !== n && (t = (n = i) && Mo(i)), t;
  }
  return r._value = e, r;
}
function Io(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Eo(e));
}
function Co() {
  for (var e = this._name, t = this._id, n = xr(), r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var s = r[a], o = s.length, c, l = 0; l < o; ++l)
      if (c = s[l]) {
        var d = O(c, t);
        vt(c, e, n, l, s, {
          time: d.time + d.delay + d.duration,
          delay: 0,
          duration: d.duration,
          ease: d.ease
        });
      }
  return new K(r, this._parents, e, n);
}
function Ro() {
  var e, t, n = this, r = n._id, i = n.size();
  return new Promise(function(a, s) {
    var o = { value: s }, c = { value: function() {
      --i === 0 && a();
    } };
    n.each(function() {
      var l = H(this, r), d = l.on;
      d !== e && (t = (e = d).copy(), t._.cancel.push(o), t._.interrupt.push(o), t._.end.push(c)), l.on = t;
    }), i === 0 && a();
  });
}
var No = 0;
function K(e, t, n, r) {
  this._groups = e, this._parents = t, this._name = n, this._id = r;
}
function xr() {
  return ++No;
}
var B = ze.prototype;
K.prototype = {
  constructor: K,
  select: uo,
  selectAll: po,
  selectChild: B.selectChild,
  selectChildren: B.selectChildren,
  filter: io,
  merge: ao,
  selection: fo,
  transition: Co,
  call: B.call,
  nodes: B.nodes,
  node: B.node,
  size: B.size,
  empty: B.empty,
  each: B.each,
  on: lo,
  attr: Us,
  attrTween: Ws,
  style: _o,
  styleTween: $o,
  text: Ao,
  textTween: Io,
  remove: ho,
  tween: qs,
  delay: js,
  duration: Qs,
  ease: to,
  easeVarying: ro,
  end: Ro,
  [Symbol.iterator]: B[Symbol.iterator]
};
function To(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Po = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: To
};
function qo(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function Oo(e) {
  var t, n;
  e instanceof K ? (t = e._id, e = e._name) : (t = xr(), (n = Po).time = Wt(), e = e == null ? null : e + "");
  for (var r = this._groups, i = r.length, a = 0; a < i; ++a)
    for (var s = r[a], o = s.length, c, l = 0; l < o; ++l)
      (c = s[l]) && vt(c, e, t, l, s, n || qo(c, t));
  return new K(r, this._parents, e, t);
}
ze.prototype.interrupt = Ns;
ze.prototype.transition = Oo;
function zo(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function dt(e, t) {
  if (!isFinite(e) || e === 0) return null;
  var n = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"), r = e.slice(0, n);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +e.slice(n + 1)
  ];
}
function me(e) {
  return e = dt(Math.abs(e)), e ? e[1] : NaN;
}
function Lo(e, t) {
  return function(n, r) {
    for (var i = n.length, a = [], s = 0, o = e[0], c = 0; i > 0 && o > 0 && (c + o + 1 > r && (o = Math.max(1, r - c)), a.push(n.substring(i -= o, i + o)), !((c += o + 1) > r)); )
      o = e[s = (s + 1) % e.length];
    return a.reverse().join(t);
  };
}
function Do(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(n) {
      return e[+n];
    });
  };
}
var Ho = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function ht(e) {
  if (!(t = Ho.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new jt({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10]
  });
}
ht.prototype = jt.prototype;
function jt(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
jt.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function Fo(e) {
  e: for (var t = e.length, n = 1, r = -1, i; n < t; ++n)
    switch (e[n]) {
      case ".":
        r = i = n;
        break;
      case "0":
        r === 0 && (r = n), i = n;
        break;
      default:
        if (!+e[n]) break e;
        r > 0 && (r = 0);
        break;
    }
  return r > 0 ? e.slice(0, r) + e.slice(i + 1) : e;
}
var ut;
function Uo(e, t) {
  var n = dt(e, t);
  if (!n) return ut = void 0, e.toPrecision(t);
  var r = n[0], i = n[1], a = i - (ut = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, s = r.length;
  return a === s ? r : a > s ? r + new Array(a - s + 1).join("0") : a > 0 ? r.slice(0, a) + "." + r.slice(a) : "0." + new Array(1 - a).join("0") + dt(e, Math.max(0, t + a - 1))[0];
}
function Cn(e, t) {
  var n = dt(e, t);
  if (!n) return e + "";
  var r = n[0], i = n[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const Rn = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: zo,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => Cn(e * 100, t),
  r: Cn,
  s: Uo,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16)
};
function Nn(e) {
  return e;
}
var Tn = Array.prototype.map, Pn = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function Bo(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? Nn : Lo(Tn.call(e.grouping, Number), e.thousands + ""), n = e.currency === void 0 ? "" : e.currency[0] + "", r = e.currency === void 0 ? "" : e.currency[1] + "", i = e.decimal === void 0 ? "." : e.decimal + "", a = e.numerals === void 0 ? Nn : Do(Tn.call(e.numerals, String)), s = e.percent === void 0 ? "%" : e.percent + "", o = e.minus === void 0 ? "−" : e.minus + "", c = e.nan === void 0 ? "NaN" : e.nan + "";
  function l(h, p) {
    h = ht(h);
    var u = h.fill, f = h.align, g = h.sign, k = h.symbol, M = h.zero, F = h.width, W = h.comma, z = h.precision, ye = h.trim, C = h.type;
    C === "n" ? (W = !0, C = "g") : Rn[C] || (z === void 0 && (z = 12), ye = !0, C = "g"), (M || u === "0" && f === "=") && (M = !0, u = "0", f = "=");
    var ni = (p && p.prefix !== void 0 ? p.prefix : "") + (k === "$" ? n : k === "#" && /[boxX]/.test(C) ? "0" + C.toLowerCase() : ""), ri = (k === "$" ? r : /[%p]/.test(C) ? s : "") + (p && p.suffix !== void 0 ? p.suffix : ""), un = Rn[C], ii = /[defgprs%]/.test(C);
    z = z === void 0 ? 6 : /[gprs]/.test(C) ? Math.max(1, Math.min(21, z)) : Math.max(0, Math.min(20, z));
    function pn(v) {
      var J = ni, R = ri, ae, mn, He;
      if (C === "c")
        R = un(v) + R, v = "";
      else {
        v = +v;
        var Fe = v < 0 || 1 / v < 0;
        if (v = isNaN(v) ? c : un(Math.abs(v), z), ye && (v = Fo(v)), Fe && +v == 0 && g !== "+" && (Fe = !1), J = (Fe ? g === "(" ? g : o : g === "-" || g === "(" ? "" : g) + J, R = (C === "s" && !isNaN(v) && ut !== void 0 ? Pn[8 + ut / 3] : "") + R + (Fe && g === "(" ? ")" : ""), ii) {
          for (ae = -1, mn = v.length; ++ae < mn; )
            if (He = v.charCodeAt(ae), 48 > He || He > 57) {
              R = (He === 46 ? i + v.slice(ae + 1) : v.slice(ae)) + R, v = v.slice(0, ae);
              break;
            }
        }
      }
      W && !M && (v = t(v, 1 / 0));
      var Ue = J.length + v.length + R.length, U = Ue < F ? new Array(F - Ue + 1).join(u) : "";
      switch (W && M && (v = t(U + v, U.length ? F - R.length : 1 / 0), U = ""), f) {
        case "<":
          v = J + v + R + U;
          break;
        case "=":
          v = J + U + v + R;
          break;
        case "^":
          v = U.slice(0, Ue = U.length >> 1) + J + v + R + U.slice(Ue);
          break;
        default:
          v = U + J + v + R;
          break;
      }
      return a(v);
    }
    return pn.toString = function() {
      return h + "";
    }, pn;
  }
  function d(h, p) {
    var u = Math.max(-8, Math.min(8, Math.floor(me(p) / 3))) * 3, f = Math.pow(10, -u), g = l((h = ht(h), h.type = "f", h), { suffix: Pn[8 + u / 3] });
    return function(k) {
      return g(f * k);
    };
  }
  return {
    format: l,
    formatPrefix: d
  };
}
var Xe, $r, kr;
Vo({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function Vo(e) {
  return Xe = Bo(e), $r = Xe.format, kr = Xe.formatPrefix, Xe;
}
function Ko(e) {
  return Math.max(0, -me(Math.abs(e)));
}
function Xo(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(me(t) / 3))) * 3 - me(Math.abs(e)));
}
function Wo(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, me(t) - me(e)) + 1;
}
function Sr(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(e);
      break;
    default:
      this.range(t).domain(e);
      break;
  }
  return this;
}
function Yo(e) {
  return function() {
    return e;
  };
}
function Go(e) {
  return +e;
}
var qn = [0, 1];
function L(e) {
  return e;
}
function qt(e, t) {
  return (t -= e = +e) ? function(n) {
    return (n - e) / t;
  } : Yo(isNaN(t) ? NaN : 0.5);
}
function jo(e, t) {
  var n;
  return e > t && (n = e, e = t, t = n), function(r) {
    return Math.max(e, Math.min(t, r));
  };
}
function Jo(e, t, n) {
  var r = e[0], i = e[1], a = t[0], s = t[1];
  return i < r ? (r = qt(i, r), a = n(s, a)) : (r = qt(r, i), a = n(a, s)), function(o) {
    return a(r(o));
  };
}
function Zo(e, t, n) {
  var r = Math.min(e.length, t.length) - 1, i = new Array(r), a = new Array(r), s = -1;
  for (e[r] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++s < r; )
    i[s] = qt(e[s], e[s + 1]), a[s] = n(t[s], t[s + 1]);
  return function(o) {
    var c = ci(e, o, 1, r) - 1;
    return a[c](i[c](o));
  };
}
function Ar(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function Mr() {
  var e = qn, t = qn, n = Xt, r, i, a, s = L, o, c, l;
  function d() {
    var p = Math.min(e.length, t.length);
    return s !== L && (s = jo(e[0], e[p - 1])), o = p > 2 ? Zo : Jo, c = l = null, h;
  }
  function h(p) {
    return p == null || isNaN(p = +p) ? a : (c || (c = o(e.map(r), t, n)))(r(s(p)));
  }
  return h.invert = function(p) {
    return s(i((l || (l = o(t, e.map(r), T)))(p)));
  }, h.domain = function(p) {
    return arguments.length ? (e = Array.from(p, Go), d()) : e.slice();
  }, h.range = function(p) {
    return arguments.length ? (t = Array.from(p), d()) : t.slice();
  }, h.rangeRound = function(p) {
    return t = Array.from(p), n = ys, d();
  }, h.clamp = function(p) {
    return arguments.length ? (s = p ? !0 : L, d()) : s !== L;
  }, h.interpolate = function(p) {
    return arguments.length ? (n = p, d()) : n;
  }, h.unknown = function(p) {
    return arguments.length ? (a = p, h) : a;
  }, function(p, u) {
    return r = p, i = u, d();
  };
}
function Qo() {
  return Mr()(L, L);
}
function el(e, t, n, r) {
  var i = mi(e, t, n), a;
  switch (r = ht(r ?? ",f"), r.type) {
    case "s": {
      var s = Math.max(Math.abs(e), Math.abs(t));
      return r.precision == null && !isNaN(a = Xo(i, s)) && (r.precision = a), kr(r, s);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(a = Wo(i, Math.max(Math.abs(e), Math.abs(t)))) && (r.precision = a - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(a = Ko(i)) && (r.precision = a - (r.type === "%") * 2);
      break;
    }
  }
  return $r(r);
}
function Er(e) {
  var t = e.domain;
  return e.ticks = function(n) {
    var r = t();
    return pi(r[0], r[r.length - 1], n ?? 10);
  }, e.tickFormat = function(n, r) {
    var i = t();
    return el(i[0], i[i.length - 1], n ?? 10, r);
  }, e.nice = function(n) {
    n == null && (n = 10);
    var r = t(), i = 0, a = r.length - 1, s = r[i], o = r[a], c, l, d = 10;
    for (o < s && (l = s, s = o, o = l, l = i, i = a, a = l); d-- > 0; ) {
      if (l = Mt(s, o, n), l === c)
        return r[i] = s, r[a] = o, t(r);
      if (l > 0)
        s = Math.floor(s / l) * l, o = Math.ceil(o / l) * l;
      else if (l < 0)
        s = Math.ceil(s * l) / l, o = Math.floor(o * l) / l;
      else
        break;
      c = l;
    }
    return e;
  }, e;
}
function Ir() {
  var e = Qo();
  return e.copy = function() {
    return Ar(e, Ir());
  }, Sr.apply(e, arguments), Er(e);
}
function On(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function tl(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function nl(e) {
  return e < 0 ? -e * e : e * e;
}
function rl(e) {
  var t = e(L, L), n = 1;
  function r() {
    return n === 1 ? e(L, L) : n === 0.5 ? e(tl, nl) : e(On(n), On(1 / n));
  }
  return t.exponent = function(i) {
    return arguments.length ? (n = +i, r()) : n;
  }, Er(t);
}
function Cr() {
  var e = rl(Mr());
  return e.copy = function() {
    return Ar(e, Cr()).exponent(e.exponent());
  }, Sr.apply(e, arguments), e;
}
function il() {
  return Cr.apply(null, arguments).exponent(0.5);
}
function ke(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
ke.prototype = {
  constructor: ke,
  scale: function(e) {
    return e === 1 ? this : new ke(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new ke(this.k, this.x + this.k * e, this.y + this.k * t);
  },
  apply: function(e) {
    return [e[0] * this.k + this.x, e[1] * this.k + this.y];
  },
  applyX: function(e) {
    return e * this.k + this.x;
  },
  applyY: function(e) {
    return e * this.k + this.y;
  },
  invert: function(e) {
    return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
  },
  invertX: function(e) {
    return (e - this.x) / this.k;
  },
  invertY: function(e) {
    return (e - this.y) / this.k;
  },
  rescaleX: function(e) {
    return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
  },
  rescaleY: function(e) {
    return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
ke.prototype;
const Qe = globalThis, Jt = Qe.ShadowRoot && (Qe.ShadyCSS === void 0 || Qe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Zt = /* @__PURE__ */ Symbol(), zn = /* @__PURE__ */ new WeakMap();
let Rr = class {
  constructor(t, n, r) {
    if (this._$cssResult$ = !0, r !== Zt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (Jt && t === void 0) {
      const r = n !== void 0 && n.length === 1;
      r && (t = zn.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && zn.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const al = (e) => new Rr(typeof e == "string" ? e : e + "", void 0, Zt), sl = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((r, i, a) => r + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[a + 1], e[0]);
  return new Rr(n, e, Zt);
}, ol = (e, t) => {
  if (Jt) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const r = document.createElement("style"), i = Qe.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = n.cssText, e.appendChild(r);
  }
}, Ln = Jt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const r of t.cssRules) n += r.cssText;
  return al(n);
})(e) : e;
const { is: ll, defineProperty: cl, getOwnPropertyDescriptor: dl, getOwnPropertyNames: hl, getOwnPropertySymbols: ul, getPrototypeOf: pl } = Object, yt = globalThis, Dn = yt.trustedTypes, ml = Dn ? Dn.emptyScript : "", fl = yt.reactiveElementPolyfillSupport, Ae = (e, t) => e, pt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ml : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let n = e;
  switch (t) {
    case Boolean:
      n = e !== null;
      break;
    case Number:
      n = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(e);
      } catch {
        n = null;
      }
  }
  return n;
} }, Qt = (e, t) => !ll(e, t), Hn = { attribute: !0, type: String, converter: pt, reflect: !1, useDefault: !1, hasChanged: Qt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), yt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let oe = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = Hn) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(t, r, n);
      i !== void 0 && cl(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, n, r) {
    const { get: i, set: a } = dl(this.prototype, t) ?? { get() {
      return this[n];
    }, set(s) {
      this[n] = s;
    } };
    return { get: i, set(s) {
      const o = i?.call(this);
      a?.call(this, s), this.requestUpdate(t, o, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Hn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ae("elementProperties"))) return;
    const t = pl(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ae("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ae("properties"))) {
      const n = this.properties, r = [...hl(n), ...ul(n)];
      for (const i of r) this.createProperty(i, n[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const n = litPropertyMetadata.get(t);
      if (n !== void 0) for (const [r, i] of n) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, r] of this.elementProperties) {
      const i = this._$Eu(n, r);
      i !== void 0 && this._$Eh.set(i, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const n = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const i of r) n.unshift(Ln(i));
    } else t !== void 0 && n.push(Ln(t));
    return n;
  }
  static _$Eu(t, n) {
    const r = n.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const r of n.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ol(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, n, r) {
    this._$AK(t, r);
  }
  _$ET(t, n) {
    const r = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, r);
    if (i !== void 0 && r.reflect === !0) {
      const a = (r.converter?.toAttribute !== void 0 ? r.converter : pt).toAttribute(n, r.type);
      this._$Em = t, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(t, n) {
    const r = this.constructor, i = r._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = r.getPropertyOptions(i), s = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : pt;
      this._$Em = i;
      const o = s.fromAttribute(n, a.type);
      this[i] = o ?? this._$Ej?.get(i) ?? o, this._$Em = null;
    }
  }
  requestUpdate(t, n, r, i = !1, a) {
    if (t !== void 0) {
      const s = this.constructor;
      if (i === !1 && (a = this[t]), r ??= s.getPropertyOptions(t), !((r.hasChanged ?? Qt)(a, n) || r.useDefault && r.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(s._$Eu(t, r)))) return;
      this.C(t, n, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, n, { useDefault: r, reflect: i, wrapped: a }, s) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, s ?? n ?? this[t]), a !== !0 || s !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (n = void 0), this._$AL.set(t, n)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, a] of this._$Ep) this[i] = a;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [i, a] of r) {
        const { wrapped: s } = a, o = this[i];
        s !== !0 || this._$AL.has(i) || o === void 0 || this.C(i, void 0, a, o);
      }
    }
    let t = !1;
    const n = this._$AL;
    try {
      t = this.shouldUpdate(n), t ? (this.willUpdate(n), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(n)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(n);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((n) => n.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((n) => this._$ET(n, this[n])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
oe.elementStyles = [], oe.shadowRootOptions = { mode: "open" }, oe[Ae("elementProperties")] = /* @__PURE__ */ new Map(), oe[Ae("finalized")] = /* @__PURE__ */ new Map(), fl?.({ ReactiveElement: oe }), (yt.reactiveElementVersions ??= []).push("2.1.2");
const en = globalThis, Fn = (e) => e, mt = en.trustedTypes, Un = mt ? mt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Nr = "$lit$", G = `lit$${Math.random().toFixed(9).slice(2)}$`, Tr = "?" + G, gl = `<${Tr}>`, ie = document, Ne = () => ie.createComment(""), Te = (e) => e === null || typeof e != "object" && typeof e != "function", tn = Array.isArray, bl = (e) => tn(e) || typeof e?.[Symbol.iterator] == "function", St = `[ 	
\f\r]`, we = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Bn = /-->/g, Vn = />/g, Z = RegExp(`>|${St}(?:([^\\s"'>=/]+)(${St}*=${St}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Kn = /'/g, Xn = /"/g, Pr = /^(?:script|style|textarea|title)$/i, qr = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), m = qr(1), Wn = qr(2), fe = /* @__PURE__ */ Symbol.for("lit-noChange"), _ = /* @__PURE__ */ Symbol.for("lit-nothing"), Yn = /* @__PURE__ */ new WeakMap(), ee = ie.createTreeWalker(ie, 129);
function Or(e, t) {
  if (!tn(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Un !== void 0 ? Un.createHTML(t) : t;
}
const vl = (e, t) => {
  const n = e.length - 1, r = [];
  let i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = we;
  for (let o = 0; o < n; o++) {
    const c = e[o];
    let l, d, h = -1, p = 0;
    for (; p < c.length && (s.lastIndex = p, d = s.exec(c), d !== null); ) p = s.lastIndex, s === we ? d[1] === "!--" ? s = Bn : d[1] !== void 0 ? s = Vn : d[2] !== void 0 ? (Pr.test(d[2]) && (i = RegExp("</" + d[2], "g")), s = Z) : d[3] !== void 0 && (s = Z) : s === Z ? d[0] === ">" ? (s = i ?? we, h = -1) : d[1] === void 0 ? h = -2 : (h = s.lastIndex - d[2].length, l = d[1], s = d[3] === void 0 ? Z : d[3] === '"' ? Xn : Kn) : s === Xn || s === Kn ? s = Z : s === Bn || s === Vn ? s = we : (s = Z, i = void 0);
    const u = s === Z && e[o + 1].startsWith("/>") ? " " : "";
    a += s === we ? c + gl : h >= 0 ? (r.push(l), c.slice(0, h) + Nr + c.slice(h) + G + u) : c + G + (h === -2 ? o : u);
  }
  return [Or(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class Pe {
  constructor({ strings: t, _$litType$: n }, r) {
    let i;
    this.parts = [];
    let a = 0, s = 0;
    const o = t.length - 1, c = this.parts, [l, d] = vl(t, n);
    if (this.el = Pe.createElement(l, r), ee.currentNode = this.el.content, n === 2 || n === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = ee.nextNode()) !== null && c.length < o; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(Nr)) {
          const p = d[s++], u = i.getAttribute(h).split(G), f = /([.?@])?(.*)/.exec(p);
          c.push({ type: 1, index: a, name: f[2], strings: u, ctor: f[1] === "." ? _l : f[1] === "?" ? wl : f[1] === "@" ? xl : _t }), i.removeAttribute(h);
        } else h.startsWith(G) && (c.push({ type: 6, index: a }), i.removeAttribute(h));
        if (Pr.test(i.tagName)) {
          const h = i.textContent.split(G), p = h.length - 1;
          if (p > 0) {
            i.textContent = mt ? mt.emptyScript : "";
            for (let u = 0; u < p; u++) i.append(h[u], Ne()), ee.nextNode(), c.push({ type: 2, index: ++a });
            i.append(h[p], Ne());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Tr) c.push({ type: 2, index: a });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(G, h + 1)) !== -1; ) c.push({ type: 7, index: a }), h += G.length - 1;
      }
      a++;
    }
  }
  static createElement(t, n) {
    const r = ie.createElement("template");
    return r.innerHTML = t, r;
  }
}
function ge(e, t, n = e, r) {
  if (t === fe) return t;
  let i = r !== void 0 ? n._$Co?.[r] : n._$Cl;
  const a = Te(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r !== void 0 ? (n._$Co ??= [])[r] = i : n._$Cl = i), i !== void 0 && (t = ge(e, i._$AS(e, t.values), i, r)), t;
}
class yl {
  constructor(t, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: n }, parts: r } = this._$AD, i = (t?.creationScope ?? ie).importNode(n, !0);
    ee.currentNode = i;
    let a = ee.nextNode(), s = 0, o = 0, c = r[0];
    for (; c !== void 0; ) {
      if (s === c.index) {
        let l;
        c.type === 2 ? l = new De(a, a.nextSibling, this, t) : c.type === 1 ? l = new c.ctor(a, c.name, c.strings, this, t) : c.type === 6 && (l = new $l(a, this, t)), this._$AV.push(l), c = r[++o];
      }
      s !== c?.index && (a = ee.nextNode(), s++);
    }
    return ee.currentNode = ie, i;
  }
  p(t) {
    let n = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, n), n += r.strings.length - 2) : r._$AI(t[n])), n++;
  }
}
class De {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, n, r, i) {
    this.type = 2, this._$AH = _, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = r, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && t?.nodeType === 11 && (t = n.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, n = this) {
    t = ge(this, t, n), Te(t) ? t === _ || t == null || t === "" ? (this._$AH !== _ && this._$AR(), this._$AH = _) : t !== this._$AH && t !== fe && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : bl(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== _ && Te(this._$AH) ? this._$AA.nextSibling.data = t : this.T(ie.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: n, _$litType$: r } = t, i = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = Pe.createElement(Or(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === i) this._$AH.p(n);
    else {
      const a = new yl(i, this), s = a.u(this.options);
      a.p(n), this.T(s), this._$AH = a;
    }
  }
  _$AC(t) {
    let n = Yn.get(t.strings);
    return n === void 0 && Yn.set(t.strings, n = new Pe(t)), n;
  }
  k(t) {
    tn(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let r, i = 0;
    for (const a of t) i === n.length ? n.push(r = new De(this.O(Ne()), this.O(Ne()), this, this.options)) : r = n[i], r._$AI(a), i++;
    i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); t !== this._$AB; ) {
      const r = Fn(t).nextSibling;
      Fn(t).remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class _t {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, n, r, i, a) {
    this.type = 1, this._$AH = _, this._$AN = void 0, this.element = t, this.name = n, this._$AM = i, this.options = a, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = _;
  }
  _$AI(t, n = this, r, i) {
    const a = this.strings;
    let s = !1;
    if (a === void 0) t = ge(this, t, n, 0), s = !Te(t) || t !== this._$AH && t !== fe, s && (this._$AH = t);
    else {
      const o = t;
      let c, l;
      for (t = a[0], c = 0; c < a.length - 1; c++) l = ge(this, o[r + c], n, c), l === fe && (l = this._$AH[c]), s ||= !Te(l) || l !== this._$AH[c], l === _ ? t = _ : t !== _ && (t += (l ?? "") + a[c + 1]), this._$AH[c] = l;
    }
    s && !i && this.j(t);
  }
  j(t) {
    t === _ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class _l extends _t {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === _ ? void 0 : t;
  }
}
class wl extends _t {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== _);
  }
}
class xl extends _t {
  constructor(t, n, r, i, a) {
    super(t, n, r, i, a), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = ge(this, t, n, 0) ?? _) === fe) return;
    const r = this._$AH, i = t === _ && r !== _ || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, a = t !== _ && (r === _ || i);
    i && this.element.removeEventListener(this.name, this, r), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class $l {
  constructor(t, n, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ge(this, t);
  }
}
const kl = en.litHtmlPolyfillSupport;
kl?.(Pe, De), (en.litHtmlVersions ??= []).push("3.3.3");
const Sl = (e, t, n) => {
  const r = n?.renderBefore ?? t;
  let i = r._$litPart$;
  if (i === void 0) {
    const a = n?.renderBefore ?? null;
    r._$litPart$ = i = new De(t.insertBefore(Ne(), a), a, void 0, n ?? {});
  }
  return i._$AI(e), i;
};
const nn = globalThis;
class Me extends oe {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Sl(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return fe;
  }
}
Me._$litElement$ = !0, Me.finalized = !0, nn.litElementHydrateSupport?.({ LitElement: Me });
const Al = nn.litElementPolyfillSupport;
Al?.({ LitElement: Me });
(nn.litElementVersions ??= []).push("4.2.2");
const Ml = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
const El = { attribute: !0, type: String, converter: pt, reflect: !1, hasChanged: Qt }, Il = (e = El, t, n) => {
  const { kind: r, metadata: i } = n;
  let a = globalThis.litPropertyMetadata.get(i);
  if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
    const { name: s } = n;
    return { set(o) {
      const c = t.get.call(this);
      t.set.call(this, o), this.requestUpdate(s, c, e, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(s, void 0, e, o), o;
    } };
  }
  if (r === "setter") {
    const { name: s } = n;
    return function(o) {
      const c = this[s];
      t.call(this, o), this.requestUpdate(s, c, e, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function ve(e) {
  return (t, n) => typeof n == "object" ? Il(e, t, n) : ((r, i, a) => {
    const s = i.hasOwnProperty(a);
    return i.constructor.createProperty(a, r), s ? Object.getOwnPropertyDescriptor(i, a) : void 0;
  })(e, t, n);
}
function A(e) {
  return ve({ ...e, state: !0, attribute: !1 });
}
class I extends Error {
}
function Cl(e, t) {
  if (!e || typeof e != "object" || !e.manifest)
    throw new I("Replay manifest is missing.");
  const n = e.manifest.schema_version;
  if (n === 0)
    throw new I(
      "Schema v0 is audit-only and cannot be losslessly migrated to v1."
    );
  if (n !== 1)
    throw new I(
      `Unsupported replay schema version: ${String(n)}.`
    );
  const r = [
    "timeline",
    "runs",
    "sector_snapshots",
    "sector_flows",
    "events",
    "representative_agents",
    "aggregate_series",
    "distribution_series",
    "scenario_pairing"
  ];
  for (const l of r)
    if (!(l in e))
      throw new I(`Replay table is missing: ${l}.`);
  const i = e.manifest.months;
  if (!Array.isArray(i) || e.timeline.length !== i.length || e.timeline.some(
    (l, d) => l.index !== d || l.month !== i[d]
  ))
    throw new I("Replay timeline is not aligned.");
  if (e.runs.map((l) => l.regime).join(",") !== "nominal,indexed")
    throw new I(
      "Replay must contain aligned nominal and indexed runs."
    );
  const a = e.runs[0], s = e.runs[1], o = e.scenario_pairing;
  if (!o || o.nominal_run_id !== a.run_id || o.indexed_run_id !== s.run_id || o.shared_seed !== e.manifest.seed || o.shared_initialization !== !0 || o.shared_shock_path !== !0 || !Array.isArray(o.shared_random_streams) || o.shared_random_streams.length === 0 || typeof o.structural_difference != "string" || o.structural_difference.length === 0)
    throw new I("Replay pairing metadata is invalid.");
  if (typeof t == "number" && t > e.manifest.maximum_uncompressed_bytes)
    throw new I(
      "Replay exceeds its declared payload-size limit."
    );
  for (const l of e.representative_agents)
    if (typeof l.matched_household_id != "string" || l.track.length !== i.length || l.track.some((d, h) => d.month !== i[h]))
      throw new I(
        "Representative track alignment or counterpart ID is invalid."
      );
  const c = /* @__PURE__ */ new Map();
  for (const l of e.aggregate_series) {
    const d = l.name, h = c.get(d);
    if (h && (h.unit !== l.unit || h.nominal_status !== l.nominal_status))
      throw new I(
        "Paired aggregate series units are not aligned."
      );
    if (l.points.length !== i.length || l.points.some((p, u) => p.month !== i[u]))
      throw new I(
        "Paired aggregate series timeline is not aligned."
      );
    c.set(d, l);
  }
  for (const [l, d, h] of [
    ["bank_equity", "banks", "equity_isk"],
    ["mortgage_principal", "households", "liabilities_isk"]
  ])
    for (const p of e.aggregate_series.filter((u) => u.name === l))
      for (const u of p.points) {
        const f = e.sector_snapshots.find((g) => g.regime === p.regime && g.month === u.month && g.sector === d);
        if (!f || f[h] !== u.value)
          throw new I("Sector stocks do not reconcile with aggregate outputs. Regenerate the replay with opening ledger balances.");
      }
  return e;
}
class j extends Error {
  constructor(t, n, r) {
    super(n, r), this.name = "ReplayLoadError", this.kind = t;
  }
}
async function Rl(e) {
  const t = new Uint8Array(await e.arrayBuffer());
  if (!(t[0] === 31 && t[1] === 139)) return t;
  if (typeof DecompressionStream > "u")
    throw new j(
      "decode",
      "This browser cannot decompress the published replay. Use the static summary instead."
    );
  try {
    const r = new Blob([t]).stream().pipeThrough(new DecompressionStream("gzip"));
    return new Uint8Array(await new Response(r).arrayBuffer());
  } catch (r) {
    throw new j(
      "decode",
      "The replay could not be decompressed.",
      { cause: r }
    );
  }
}
async function zr(e, t = {}) {
  const n = t.fetcher ?? fetch;
  let r;
  try {
    const s = {
      headers: { Accept: "application/json, application/gzip" }
    };
    t.signal !== void 0 && (s.signal = t.signal), r = await n(e, s);
  } catch (s) {
    throw s instanceof DOMException && s.name === "AbortError" ? s : new j("network", "The replay could not be reached.", {
      cause: s
    });
  }
  if (!r.ok)
    throw new j(
      "network",
      `The replay request failed with status ${r.status}.`
    );
  const i = await Rl(r);
  let a;
  try {
    a = JSON.parse(new TextDecoder().decode(i));
  } catch (s) {
    throw new j("decode", "The replay is not valid JSON.", {
      cause: s
    });
  }
  try {
    return Cl(a, i.byteLength);
  } catch (s) {
    throw s instanceof I ? new j("compatibility", s.message, {
      cause: s
    }) : s;
  }
}
const V = {
  households: "Households",
  firms: "Firms and shops",
  banks: "Banks",
  government: "Government",
  central_bank: "Central bank",
  foreign: "Foreign sector and harbor"
}, Gn = {
  wages: "Wages",
  consumption: "Consumption",
  imports: "Imports",
  interest: "Interest",
  principal_payment: "Principal payment",
  bank_dividend: "Bank dividend"
};
function w(e, t) {
  return e === null ? "Not available" : t === "ISK" ? `${new Intl.NumberFormat("en-IS").format(e)} ISK` : t === "basis_points" ? `${(e / 100).toFixed(2)}%` : t === "index" ? (e / 1e3).toFixed(3) : t === "households" ? `${new Intl.NumberFormat("en-IS").format(e)} households` : t === "physical_units" ? `${new Intl.NumberFormat("en-IS").format(e)} units` : new Intl.NumberFormat("en-IS").format(e);
}
function We(e, t, n) {
  return e.find(t)?.month ?? n;
}
function Lr(e, t) {
  const n = e.manifest.months[0], r = We(
    e.events,
    (d) => d.regime === t && d.event_type === "FX_SHOCK",
    n
  ), i = We(
    e.sector_flows,
    (d) => d.regime === t && d.flow_type === "imports" && d.month >= r,
    r
  ), a = e.aggregate_series.find(
    (d) => d.regime === t && d.name === "cpi_level"
  ), s = a?.points[0]?.value, o = a?.points.find(
    (d) => d.month >= r && d.value !== null && s !== null && d.value !== s
  )?.month ?? r, c = We(
    e.events,
    (d) => d.regime === t && d.event_type === "CPI_REVALUATION",
    o
  ), l = We(
    e.events,
    (d) => d.regime === t && ["ARREARS", "DEFAULT", "POLICY_RATE_CHANGE"].includes(d.event_type),
    c
  );
  return [
    {
      id: "orientation",
      title: "The economic circuit",
      month: n,
      summary: "Households, firms, banks, policy institutions, and the foreign sector exchange recorded flows each month.",
      trace: "Sector snapshots and ledger-linked flows in the published replay.",
      focus: []
    },
    {
      id: "shock",
      title: "The exchange-rate shock",
      month: r,
      summary: "The configured depreciation changes the recorded exchange-rate and import-price paths.",
      trace: "FX_SHOCK event and exchange-rate series.",
      focus: ["foreign"]
    },
    {
      id: "imports",
      title: "Imported inputs cost more",
      month: i,
      summary: "Firms pay the foreign sector for imported inputs at the shocked price path.",
      trace: "Imports flow with its source ledger entry.",
      focus: ["foreign", "firms"]
    },
    {
      id: "prices",
      title: "Firm prices move the CPI",
      month: o,
      summary: "Recorded transactions at firms' adjusted prices raise the consumer price index.",
      trace: "CPI level and monthly inflation series.",
      focus: ["firms", "households"]
    },
    {
      id: "debt",
      title: "The price index rewrites debt",
      month: c,
      summary: t === "indexed" ? "Lagged CPI growth is posted to indexed mortgage principal on both household and bank balance sheets." : "This nominal run records no CPI principal revaluation; debt changes through payments and rate resets.",
      trace: t === "indexed" ? "CPI_REVALUATION event and mirrored mortgage positions." : "Mortgage principal series and settlement flows.",
      focus: ["households", "banks"]
    },
    {
      id: "feedback",
      title: "Households and banks respond",
      month: l,
      summary: "Debt service, arrears, defaults, consumption, bank equity, and later policy decisions record the feedback.",
      trace: "Typed events, household tracks, and aggregate series.",
      focus: ["households", "banks", "central_bank"]
    }
  ];
}
function Dr(e, t, n, r) {
  const i = e.aggregate_series.find(
    (a) => a.regime === t && a.name === n
  );
  return i ? {
    value: i.points.find((a) => a.month === r)?.value ?? null,
    unit: i.unit
  } : null;
}
const jn = [
  { name: "cpi_level", label: "CPI" },
  { name: "policy_rate", label: "Policy rate" },
  { name: "mortgage_principal", label: "Mortgage principal" },
  { name: "debt_service", label: "Debt service" },
  { name: "consumption", label: "Consumption" },
  { name: "defaults", label: "Defaults" },
  { name: "bank_equity", label: "Bank equity" }
];
function ft(e, t) {
  const n = e.aggregate_series.find(
    (a) => a.regime === "nominal" && a.name === t
  ), r = e.aggregate_series.find(
    (a) => a.regime === "indexed" && a.name === t
  );
  if (!n || !r || n.unit !== r.unit) return null;
  const i = new Map(
    r.points.map((a) => [a.month, a.value])
  );
  return {
    name: t,
    unit: n.unit,
    points: n.points.map((a) => {
      const s = i.get(a.month) ?? null;
      return {
        month: a.month,
        nominal: a.value,
        indexed: s,
        difference: a.value === null || s === null ? null : s - a.value
      };
    })
  };
}
function Hr(e, t, n, r) {
  const i = e.distribution_series.filter(
    (s) => s.month === t && s.dimension === n
  ), a = new Map(
    i.filter((s) => s.regime === "nominal").map((s) => [s.cohort, s[r]])
  );
  return i.filter((s) => s.regime === "indexed").filter((s) => a.has(s.cohort)).map((s) => ({
    cohort: s.cohort,
    nominal: a.get(s.cohort),
    indexed: s[r],
    difference: s[r] - a.get(s.cohort)
  })).sort((s, o) => s.cohort.localeCompare(o.cohort));
}
function Nl(e, t, n) {
  const r = e.representative_agents.find(
    (o) => o.regime === t && o.household_id === n
  );
  if (!r) return null;
  const i = t === "nominal" ? "indexed" : "nominal", a = e.representative_agents.find(
    (o) => o.regime === i && o.household_id === r.matched_household_id && o.matched_household_id === r.household_id
  );
  if (a)
    return {
      kind: "individual",
      cohort: r.cohort,
      nominalId: t === "nominal" ? r.household_id : a.household_id,
      indexedId: t === "indexed" ? r.household_id : a.household_id
    };
  const s = e.representative_agents.find(
    (o) => o.regime === i && o.cohort === r.cohort
  );
  return {
    kind: "cohort",
    cohort: r.cohort,
    nominalId: t === "nominal" ? r.household_id : s?.household_id ?? null,
    indexedId: t === "indexed" ? r.household_id : s?.household_id ?? null
  };
}
class Tl extends EventTarget {
  #e = [];
  #t = 0;
  #n = null;
  get months() {
    return this.#e;
  }
  get monthIndex() {
    return this.#t;
  }
  get month() {
    return this.#e[this.#t] ?? null;
  }
  get selection() {
    return this.#n;
  }
  configure(t, n) {
    this.#e = [...t];
    const r = n === void 0 ? -1 : this.#e.indexOf(n);
    this.#t = r >= 0 ? r : 0, this.#n = null, this.#r("configure");
  }
  setMonthIndex(t) {
    if (this.#e.length === 0) return;
    const n = Math.max(
      0,
      Math.min(Math.trunc(t), this.#e.length - 1)
    );
    n !== this.#t && (this.#t = n, this.#r("month"));
  }
  select(t) {
    this.#n?.kind === t?.kind && this.#n?.id === t?.id || (this.#n = t, this.#r("selection"));
  }
  #r(t) {
    this.dispatchEvent(new CustomEvent("change", { detail: { reason: t } }));
  }
}
class rn extends Error {
  constructor(t, n) {
    super(n), this.name = "LaboratoryError", this.code = t;
  }
}
async function an(e, t, n) {
  const r = await n(e, t), i = await r.json().catch(() => null);
  if (!r.ok)
    throw new rn(
      i?.error?.code ?? `http_${r.status}`,
      i?.error?.message ?? `The experiment service returned ${r.status}.`
    );
  return i;
}
async function Pl(e, t, n = {}) {
  const r = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(t)
  };
  return n.signal !== void 0 && (r.signal = n.signal), an(
    `${e.replace(/\/$/, "")}/experiments`,
    r,
    n.fetcher ?? fetch
  );
}
async function ql(e, t = {}) {
  const n = t.fetcher ?? fetch;
  for (; ; ) {
    const r = {};
    t.signal !== void 0 && (r.signal = t.signal);
    const i = await an(
      e,
      r,
      n
    );
    if (t.onProgress?.(i), i.status === "completed") return i;
    if (i.status === "failed" || i.status === "cancelled")
      throw new rn(
        i.failure?.code ?? i.status,
        i.failure?.message ?? `The custom experiment was ${i.status}.`
      );
    await new Promise((a, s) => {
      const o = window.setTimeout(a, t.intervalMs ?? 750);
      t.signal?.addEventListener(
        "abort",
        () => {
          window.clearTimeout(o), s(new DOMException("Aborted", "AbortError"));
        },
        { once: !0 }
      );
    });
  }
}
async function Ol(e, t = {}) {
  await an(e, { method: "DELETE" }, t.fetcher ?? fetch);
}
const Ot = {
  ABM: [
    "Agent-based model",
    "A simulation of different households, firms, and institutions following rules and interacting; their actions produce aggregate outcomes."
  ],
  CPI: [
    "Consumer Price Index",
    "A measure of consumer prices. Here it is computed from simulated purchases, not observed Icelandic prices."
  ],
  FX: [
    "Foreign exchange",
    "The exchange rate is krónur per foreign-currency unit. A rise makes imported inputs more expensive in this model."
  ],
  ISK: [
    "Icelandic króna",
    "The currency unit. Monetary results are nominal whole krónur, not inflation-adjusted purchasing power."
  ],
  LTV: [
    "Loan-to-value",
    "Mortgage balance divided by property value. A higher ratio means more debt relative to collateral."
  ],
  DSTI: [
    "Debt-service-to-income",
    "Debt payments divided by income. A higher ratio means more current income is needed for debt service."
  ],
  SFC: [
    "Stock-flow consistency",
    "Assets, liabilities, and flows reconcile across agents. Each financial asset has a matching liability."
  ],
  IRF: [
    "Impulse response function",
    "A path after a shock relative to a no-shock counterfactual. The displayed indexed-minus-nominal comparison is not an impulse response."
  ],
  principal: [
    "Principal",
    "The outstanding loan balance before future interest. Indexation can increase it even while payments are made."
  ],
  revaluation: [
    "Revaluation",
    "A change in the value of an asset and its matching liability without a cash transfer. Indexation rewrites the mortgage balance."
  ],
  indexation: [
    "Price indexation",
    "A contract rule that changes a nominal amount with a price index after a specified lag."
  ]
};
function zl() {
  return m`<details class="reader-glossary">
    <summary>Glossary — words used in this model</summary>
    <p>
      Focus, hover, or tap a term to read its definition. Tap again to close it.
    </p>
    <div>
      ${Object.entries(Ot).map(
    ([e, [t, n]]) => m` <div class="glossary-entry">
            <div>
              <details
                @pointerenter=${(r) => {
      r.pointerType === "mouse" && (r.currentTarget.open = !0);
    }}
                @focusin=${(r) => {
      r.target.matches(":focus-visible") && (r.currentTarget.open = !0);
    }}
              >
                <summary aria-describedby=${`definition-${e}`}>
                  <abbr>${e}</abbr> — ${t}
                </summary>
                <p id=${`definition-${e}`}>${n}</p>
              </details>
            </div>
          </div>`
  )}
    </div>
  </details>`;
}
const zt = {
  cpi_level: "Consumer Price Index (CPI): simulated transaction prices, shown on an index with a base of 100. A rise means the same goods cost more; it is a price level, not an inflation rate.",
  policy_rate: "Annual policy rate, shown as a percentage. A higher rate can raise later loan coupons under the declared reset rule; it is separate from principal revaluation.",
  mortgage_principal: "Outstanding mortgage stock in nominal whole Icelandic krónur (ISK). A larger balance means more debt remains; defaults and payments also change it.",
  debt_service: "Mortgage payments settled during this month, in nominal whole Icelandic krónur (ISK). Lower payments need not mean lower lifetime debt or better welfare.",
  consumption: "Household expenditure during this month, in nominal whole Icelandic krónur (ISK). A rise may reflect prices or quantities; it is not a direct measure of welfare.",
  defaults: "Households defaulting during this month. A larger count signals more recorded credit distress under the model's default rule.",
  bank_equity: "Bank assets minus liabilities at month end, in nominal whole Icelandic krónur (ISK). Revaluations, defaults, and distributed interest all affect this stock."
};
function Y(e, t) {
  const n = `term-${t}-${e}`, r = (i, a) => {
    const s = i;
    s.setAttribute("aria-expanded", String(a)), s.nextElementSibling.hidden = !a;
  };
  return m`<span
    class="inline-term"
    @pointerleave=${(i) => {
    const a = i.currentTarget.querySelector("button");
    i.pointerType === "mouse" && !a.dataset.pinned && !a.matches(":focus-visible") && r(a, !1);
  }}
    ><button
      type="button"
      aria-describedby=${n}
      aria-expanded="false"
      @pointerenter=${(i) => {
    i.pointerType === "mouse" && r(i.currentTarget, !0);
  }}
      @focus=${(i) => {
    i.currentTarget.matches(":focus-visible") && r(i.currentTarget, !0);
  }}
      @blur=${(i) => {
    delete i.currentTarget.dataset.pinned, r(i.currentTarget, !1);
  }}
      @click=${(i) => {
    const a = i.currentTarget;
    a.dataset.pinned ? (delete a.dataset.pinned, r(a, !1)) : (a.dataset.pinned = "true", r(a, !0));
  }}
      @keydown=${(i) => {
    i.key === "Escape" && (delete i.currentTarget.dataset.pinned, r(i.currentTarget, !1), i.stopPropagation());
  }}
    >
      <abbr>${e}</abbr></button
    ><span id=${n} class="term-definition" role="tooltip" hidden
      >${Ot[e][0]}: ${Ot[e][1]}</span
    ></span
  >`;
}
const Fr = {
  article: "Start here: read the question, evidence, and conclusion at your own pace.",
  story: "Follow guided scenes through the recorded shock and its consequences.",
  explore: "Choose a month, then inspect a sector or an actual household.",
  compare: "Read both contract regimes at the same month and compare exact values.",
  laboratory: "Choose bounded parameters and ask the server to run a new experiment."
};
function Ll() {
  return m`<section
    class="reader-intro"
    aria-labelledby="reader-intro-title"
  >
    <h2 id="reader-intro-title">When inflation changes the debt itself</h2>
    <p>
      Ecodeling is an educational agent-based model (${Y("ABM", "intro")}):
      synthetic households, firms, and banks interact under explicit rules. We
      ask how mortgage price indexation changes <em>when</em> an
      imported-inflation shock reaches payments and <em>where</em> it appears on
      balance sheets.
    </p>
    <p>
      These are simulated results, not observations or forecasts of Iceland. The
      paired runs start from the same population and random seed and receive the
      same shock. Nominal loans price expected inflation into their coupon;
      indexed loans instead add realized price changes to principal after a lag,
      with a different coupon and rate pass-through.
    </p>
    <p>
      Look for the gap between cash paid now and debt left later. Begin with
      Article, then open the evidence in Story, Explore, or Compare.
    </p>
    <details class="reading-guide">
      <summary>How to read this model</summary>
      <p>
        The six sectors are households (work and spend), firms (hire and sell),
        banks (hold loans and deposits), government, the central bank (sets the
        policy rate), and the foreign sector (supplies imports). Government and
        central-bank balance-sheet values are unavailable, not zero.
      </p>
      <p>
        Stocks are balances at month end: debt, deposits, and equity. Flows are
        amounts during a month: wages, purchases, and payments. A revaluation
        changes a balance without moving cash. The scene uses stable sector
        shapes for stocks and moving or static lines for recorded flows.
      </p>
      <p>
        One shared clock controls all views. A shock marker locates the recorded
        external change. Nominal trajectories are solid; indexed trajectories
        are dashed. Compare the same month to avoid confusing the passage of
        time with the contract difference. Positive differences mean indexed
        exceeds the nominal baseline.
      </p>
      <p>
        Monetary values use nominal whole Icelandic krónur
        (${Y("ISK", "guide")}). The Consumer Price Index
        (${Y("CPI", "guide")}) chart uses a base of 100; raw replay indices
        use 100,000. Rates display percentages; the replay records basis points,
        with 100 basis points equal to one percentage point.
      </p>
      <p>
        Stock-flow consistency (${Y("SFC", "guide")}) means each financial
        asset has a matching liability. Loan-to-value (${Y("LTV", "guide")})
        describes debt relative to housing value; debt-service-to-income
        (${Y("DSTI", "guide")}) describes the current payment burden. Foreign
        exchange (${Y("FX", "guide")}) describes currency conversion. An
        impulse response function (${Y("IRF", "guide")}) compares a shock
        with its own no-shock counterfactual; this reader's paired difference
        compares contract regimes.
      </p>
    </details>
    <p class="reader-limits">
      Interpretation: this is a mechanism experiment, not a policy verdict.
      Simplified housing, firms, expectations, default recovery, and bank
      payouts limit what can be concluded. Results depend on the chosen rules
      and seed.
    </p>
  </section>`;
}
function Dl(e) {
  const t = e.manifest.months[0], n = e.manifest.months.at(-1);
  return [
    "cpi_level",
    "mortgage_principal",
    "debt_service",
    "consumption",
    "defaults",
    "bank_equity"
  ].flatMap((r) => {
    const i = ft(e, r);
    return i ? [t, n].map((a) => ({
      metric: r,
      unit: i.unit,
      ...i.points.find((s) => s.month === a)
    })) : [];
  });
}
function se(e, t) {
  return t === "index" && e !== null ? `${w(e, t)} index (base 100)` : w(e, t);
}
function At(e) {
  return e === null ? "unavailable" : e > 0 ? "higher" : e < 0 ? "lower" : "equal";
}
function Hl(e, t, n, r) {
  const i = e.manifest.months[0], a = e.manifest.months.at(-1), s = e.events.find(
    (u) => u.regime === "indexed" && ["FX_SHOCK", "FOREIGN_PRICE_SHOCK"].includes(u.event_type)
  ), o = e.events.find(
    (u) => u.regime === "indexed" && u.event_type === "CPI_REVALUATION"
  ), c = o ? e.manifest.months[e.manifest.months.indexOf(o.month) - 1] : void 0, l = Dl(e), d = (u, f) => m`<button type="button" @click=${() => n(f)}>${u}</button>`, h = (u, f) => {
    const g = ft(e, u), k = g?.points.find((M) => M.month === f);
    return !k || !g ? m`<p>Recorded ${u} unavailable.</p>` : m`<div
      class="article-evidence"
      data-metric=${u}
      data-month=${f}
    >
      <p>${zt[u]} Recorded simulated result at ${f}.</p>
      <dl class="evidence-values">
        <div>
          <dt>Nominal baseline</dt>
          <dd data-value="nominal">${se(k.nominal, g.unit)}</dd>
        </div>
        <div>
          <dt>Indexed</dt>
          <dd data-value="indexed">${se(k.indexed, g.unit)}</dd>
        </div>
        <div>
          <dt>Indexed − nominal (${At(k.difference)})</dt>
          <dd data-value="difference">
            ${se(k.difference, g.unit)}
          </dd>
        </div>
      </dl>
      <small
        >Source: aggregate_series / ${u} / ${f};
        ${e.manifest.bundle_id}</small
      >
      ${d("Compare this result", { mode: "compare", month: f, metric: u })}
    </div>`;
  }, p = (u) => {
    const f = ft(e, u);
    return f ? m`<figure>
          ${r(f.points, f.unit, t, u)}
          <figcaption>
            ${zt[u]} Interval ${i} to ${a}; cursor
            ${t}. Source: aggregate_series / ${u}. Solid nominal
            baseline; dashed indexed.
          </figcaption>
          ${h(u, t)}
        </figure>` : _;
  };
  return m`<article class="reader-article" aria-label="Evidence walkthrough">
    <section id="article-question">
      <h2>The research question</h2>
      <p>
        Inflation changes what money buys. An indexed mortgage also lets it
        rewrite the debt contract. Does a smaller cash payment today coexist
        with a larger balance later? Following payments alone cannot answer that
        question.
      </p>
    </section>
    <section id="article-setup">
      <h2>The experimental setup</h2>
      <p>
        Assumption: index contracts, not people. Both runs use the same
        initialized population and shock path. Nominal coupons include expected
        inflation compensation and an inflation risk premium; indexed coupons
        combine a real rate and spreads with later principal indexation. The
        comparison therefore changes the documented contract structure, not just
        the label on an identical interest rate.
      </p>
      <p>
        Replay interval: ${i} to ${a}. Seed: ${e.manifest.seed}.
        Structural difference:
        ${e.scenario_pairing.structural_difference.replaceAll("_", " ")}.
        Named streams and common initialization are checked when loading this
        replay.
      </p>
      ${d("View in Story", { mode: "story", month: i })}
    </section>
    <section id="article-shock">
      <h2>The imported-inflation shock</h2>
      <p>
        Assumption: the foreign path changes outside the domestic economy. Firms
        buy imported inputs and adjust prices from their costs; the model then
        measures prices from actual simulated purchases.
      </p>
      ${s ? m`<p class="article-event" data-event=${s.id}>
              Recorded simulated event: ${s.event_type.replaceAll("_", " ")}
              at ${s.month}, ${w(s.amount, s.unit)}.
              Source: ${s.source_id}. The timeline shock marker identifies
              this same month.
            </p>
            <ol class="article-timeline" aria-label="Recorded shock timeline">
              <li>Replay begins ${i}</li>
              <li class="shock-marker">Shock ${s.month}</li>
              <li>Replay ends ${a}</li>
            </ol>
            ${d("View shock in Story", {
    mode: "story",
    month: s.month,
    event: s.id,
    sector: "foreign"
  })}` : m`<p>No external shock event is recorded in this replay.</p>`}
    </section>
    <section id="article-prices">
      <h2>Firm prices and the consumer price response</h2>
      <p>
        Mechanism: more costly inputs can move firms' target prices, but prices
        adjust gradually. The recorded price index summarizes transactions,
        rather than imposing an inflation path on households.
      </p>
      ${p("cpi_level")}
    </section>
    <section id="article-mortgages">
      <h2>Mortgage balances diverge</h2>
      <p>
        Mechanism: lagged prices change indexed principal before settlement. The
        borrower owes more and the bank holds a larger claim. This revaluation
        itself transfers no cash. The month-end view below also includes
        payments and any defaults; its before/after difference is not the
        isolated revaluation.
      </p>
      ${o ? m`<p class="article-event" data-event=${o.id}>
              Recorded first indexed revaluation: ${o.month};
              ${w(o.amount, o.unit)}. Source:
              ${o.source_id}.
            </p>
            <div
              class="table-scroll"
              tabindex="0"
              role="region"
              aria-label="Mortgage balance-sheet comparison"
            >
              <table>
                <caption>
                  Balance-sheet before/after: indexed month-end stocks, nominal
                  whole Icelandic krónur (ISK). Source: sector_snapshots.
                </caption>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Before: ${c ?? "unavailable"}</th>
                    <th>After: ${o.month}</th>
                  </tr>
                </thead>
                <tbody>
                  ${[
    [
      "households",
      "liabilities_isk",
      "Household liabilities"
    ],
    [
      "banks",
      "financial_assets_isk",
      "Bank financial assets"
    ]
  ].map(
    ([u, f, g]) => m`<tr>
                        <th>${g}</th>
                        ${[c, o.month].map(
      (k) => m`<td
                              data-stock=${`${u}:${f}:${k}`}
                            >
                              ${w(
        e.sector_snapshots.find(
          (M) => M.regime === "indexed" && M.sector === u && M.month === k
        )?.[f] ?? null,
        "ISK"
      )}
                            </td>`
    )}
                      </tr>`
  )}
                </tbody>
              </table>
            </div>
            ${d("Inspect revaluation in Explore", {
    mode: "explore",
    month: o.month,
    regime: "indexed",
    sector: "banks",
    event: o.id
  })}` : m`<p>No indexed revaluation is recorded.</p>`}
      ${p("mortgage_principal")}
    </section>
    <section id="article-households">
      <h2>Household cash and bank effects</h2>
      <p>
        Interpretation: a lower payment can leave more cash available today. It
        does not establish lower lifetime cost. Default write-downs can reduce
        nominal principal, so the final principal gap is not all accumulated
        indexation.
      </p>
      ${p("debt_service")}${h("consumption", a)}${h(
    "defaults",
    a
  )}${h("bank_equity", a)}
    </section>
    <section id="article-distribution">
      <h2>Who experiences the difference?</h2>
      <p>
        Recorded simulated results: totals by initial income quintile at
        ${t}, in nominal whole Icelandic krónur (ISK). These are
        declared groups, not five illustrative people. Higher consumption
        expenditure does not distinguish higher prices from more goods.
      </p>
      <div
        class="table-scroll"
        tabindex="0"
        role="region"
        aria-label="Consumption by income cohort"
      >
        <table>
          <caption>
            Consumption by income cohort. Nominal baseline; difference is
            indexed − nominal. Source: distribution_series / income_quintile /
            ${t}.
          </caption>
          <thead>
            <tr>
              <th>Cohort</th>
              <th>Nominal</th>
              <th>Indexed</th>
              <th>Difference</th>
            </tr>
          </thead>
          <tbody>
            ${Hr(
    e,
    t,
    "income_quintile",
    "consumption_isk"
  ).map(
    (u) => m`<tr data-cohort=${u.cohort}>
                  <th>${u.cohort}</th>
                  <td>${w(u.nominal, "ISK")}</td>
                  <td>${w(u.indexed, "ISK")}</td>
                  <td>${w(u.difference, "ISK")}</td>
                </tr>`
  )}
          </tbody>
        </table>
      </div>
      <p>
        Representatives below are actual recorded households selected by
        declared cohort. Their histories are not cohort averages. “High LTV”
        means a high loan-to-value ratio.
      </p>
      ${e.representative_agents.filter((u) => u.regime === "indexed").map(
    (u) => d(`Inspect household: ${u.cohort.replaceAll("_", " ")}`, {
      mode: "explore",
      month: t,
      regime: "indexed",
      agent: u.household_id
    })
  )}
    </section>
    <section id="article-conclusion">
      <h2>Interpretation, limitations, and conclusion</h2>
      <p>
        Recorded simulated results: the table collects the opening and closing
        evidence for this paired run. Every difference is indexed minus the
        nominal baseline; negative means lower, positive means higher. Monetary
        values are nominal whole Icelandic krónur (ISK).
      </p>
      <div
        class="table-scroll"
        tabindex="0"
        role="region"
        aria-label="Opening and closing results"
      >
        <table>
          <caption>
            Opening versus closing paired results. Source: aggregate_series;
            ${e.manifest.bundle_id}.
          </caption>
          <thead>
            <tr>
              <th>Metric / month</th>
              <th>Nominal</th>
              <th>Indexed</th>
              <th>Difference</th>
            </tr>
          </thead>
          <tbody>
            ${l.map(
    (u) => m`<tr data-claim=${`${u.metric}:${u.month}`}>
                  <th>${u.metric.replaceAll("_", " ")} / ${u.month}</th>
                  <td>${se(u.nominal, u.unit)}</td>
                  <td>${se(u.indexed, u.unit)}</td>
                  <td>${se(u.difference, u.unit)}</td>
                </tr>`
  )}
          </tbody>
        </table>
      </div>
      <p>
        In this run, indexed opening debt service is
        ${At(
    l.find((u) => u.metric === "debt_service" && u.month === i)?.difference ?? null
  )}
        than nominal; indexed closing principal is
        ${At(
    l.find(
      (u) => u.metric === "mortgage_principal" && u.month === a
    )?.difference ?? null
  )}.
        The cash-flow distinction is present at ${i};
        ${o ? `the first recorded indexed principal revaluation arrives at ${o.month}` : "no indexed principal revaluation is recorded"}.
        Final consumption, defaults, and bank equity above show why a mortgage
        calculator alone misses the wider response.
      </p>
      <p>
        Interpretation: contract design shifts the timing and location of
        exposure. A smaller early cash burden can coexist with more debt later.
        This conditional comparison does not identify real-world causal effects,
        rank household welfare, or show that either regime is preferable.
      </p>
      <p>
        Limitations: one generic good; stylized firms and expectations;
        initialized housing values without a housing market; no refinancing,
        prepayment, or demographics; zero-recovery defaults; bank interest
        returned to households; unavailable government and central-bank balance
        sheets. A short path with one seed is not a measure of uncertainty or
        long-run persistence.
      </p>
      <p>
        Next experiment: repeat across seeds and contract lags, then investigate
        wage indexation as a possible household hedge and wage-price feedback.
        Wage indexation is a research direction, not a result established here.
      </p>
      ${d("Compare closing results", {
    mode: "compare",
    month: a,
    metric: "mortgage_principal"
  })}
    </section>
    <p class="article-source">
      Replay provenance: ${e.manifest.bundle_id}; model
      ${e.manifest.model_version}; source commit
      ${e.manifest.git_commit}. Run configurations:
      ${e.runs.map((u) => `${u.regime}: ${u.configuration_hash}`).join("; ")}.
      Analytical outputs and ledger records remain authoritative.
    </p>
  </article>`;
}
var Fl = Object.defineProperty, Ul = Object.getOwnPropertyDescriptor, Ur = (e) => {
  throw TypeError(e);
}, $ = (e, t, n, r) => {
  for (var i = r > 1 ? void 0 : r ? Ul(t, n) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (i = (r ? s(t, n, i) : s(i)) || i);
  return r && i && Fl(t, n, i), i;
}, sn = (e, t, n) => t.has(e) || Ur("Cannot " + n), S = (e, t, n) => (sn(e, t, "read from private field"), n ? n.call(e) : t.get(e)), N = (e, t, n) => t.has(e) ? Ur("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), X = (e, t, n, r) => (sn(e, t, "write to private field"), t.set(e, n), n), y = (e, t, n) => (sn(e, t, "access private method"), n), Ee, de, be, qe, Oe, le, he, Se, et, tt, b, wt, Lt, Dt, Br, Vr, on, xt, ln, Kr, Xr, Wr, Yr, cn, Gr, jr, Jr, Zr, Qr, ei, Ht, dn, Ft, ti;
const hn = [
  "households",
  "firms",
  "banks",
  "government",
  "central_bank",
  "foreign"
], Ye = {
  households: [16, 58],
  firms: [46, 25],
  banks: [47, 76],
  government: [72, 25],
  central_bank: [73, 76],
  foreign: [84, 50]
}, Bl = [
  ["cpi_level", "CPI"],
  ["monthly_inflation", "Monthly inflation"],
  ["mortgage_principal", "Mortgage principal"],
  ["consumption", "Consumption"]
];
let x = class extends Me {
  constructor() {
    super(), N(this, b), this.src = "", this.initialMonth = "", this.staticMode = !1, this.apiBase = "", this.status = "empty", this.replay = null, this.message = "", this.revision = 0, this.reducedMotion = !1, this.mode = "article", this.initialMode = "", N(this, Ee, 0), this.playing = !1, this.speed = 1, this.storyIndex = 0, this.activeRegime = "indexed", this.comparisonView = "split", this.selectedMetric = "cpi_level", this.cohortDimension = "income_quintile", this.cohortMeasure = "consumption_isk", this.cameraSector = "households", this.visible = !0, this.laboratoryStatus = "idle", this.laboratoryProgress = 0, this.laboratoryMessage = "", this.customReplay = !1, this.replayState = new Tl(), N(this, de, null), N(this, be), N(this, qe, ""), N(this, Oe), N(this, le), N(this, he, null), N(this, Se), N(this, et, (e) => {
      this.reducedMotion = e.matches;
    }), N(this, tt, (e) => {
      if (!(this.status !== "ready" || this.mode === "article" || e.composedPath()[0] !== this)) {
        if (e.key === "ArrowLeft")
          this.setMonth(this.replayState.monthIndex - 1);
        else if (e.key === "ArrowRight")
          this.setMonth(this.replayState.monthIndex + 1);
        else if (e.key === "Home") this.setMonth(0);
        else if (e.key === "End")
          this.setMonth(this.replayState.months.length - 1);
        else if (e.key === " ")
          this.playing ? this.pause() : this.play();
        else return;
        e.preventDefault();
      }
    }), N(this, ln, (e) => {
      const t = y(this, b, on).call(this);
      let n = t.indexOf(this.mode);
      if (e.key === "ArrowRight") n = (n + 1) % t.length;
      else if (e.key === "ArrowLeft")
        n = (n + t.length - 1) % t.length;
      else if (e.key === "Home") n = 0;
      else if (e.key === "End") n = t.length - 1;
      else return;
      e.preventDefault(), e.stopPropagation(), y(this, b, xt).call(this, t[n]), this.updateComplete.then(
        () => this.renderRoot.querySelector(`#tab-${t[n]}`)?.focus()
      );
    }), this.replayState.addEventListener("change", (e) => {
      this.revision += 1;
      const t = e.detail.reason;
      t === "month" && this.replayState.month !== null && this.dispatchEvent(
        new CustomEvent(
          "ecodeling-month-change",
          {
            bubbles: !0,
            composed: !0,
            detail: {
              index: this.replayState.monthIndex,
              month: this.replayState.month
            }
          }
        )
      ), t === "selection" && this.dispatchEvent(
        new CustomEvent(
          "ecodeling-selection-change",
          {
            bubbles: !0,
            composed: !0,
            detail: this.replayState.selection
          }
        )
      );
    });
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      const e = this.initialMode || new URL(location.href).searchParams.get("ecodeling-mode") || sessionStorage.getItem(
        `ecodeling-mode:${location.pathname}:${this.id || this.src}`
      );
      e && Object.hasOwn(Fr, e) && (e !== "laboratory" || this.apiBase.trim()) && (this.mode = e);
    } catch {
    }
    this.setAttribute("role", "region"), this.setAttribute("aria-label", "Ecodeling economic replay"), this.hasAttribute("tabindex") || (this.tabIndex = 0), typeof window.matchMedia == "function" && (X(this, le, window.matchMedia("(prefers-reduced-motion: reduce)")), this.reducedMotion = S(this, le).matches, S(this, le).addEventListener("change", S(this, et))), typeof IntersectionObserver < "u" && (X(this, Se, new IntersectionObserver(([e]) => {
      this.visible = e?.isIntersecting ?? !0, y(this, b, Lt).call(this);
    })), S(this, Se).observe(this)), this.addEventListener("keydown", S(this, tt));
  }
  disconnectedCallback() {
    S(this, Oe)?.abort(), S(this, be)?.abort(), y(this, b, wt).call(this), S(this, Se)?.disconnect(), S(this, le)?.removeEventListener("change", S(this, et)), this.removeEventListener("keydown", S(this, tt)), super.disconnectedCallback();
  }
  updated(e) {
    e.has("src") && y(this, b, Dt).call(this), (e.has("playing") || e.has("speed") || e.has("staticMode") || e.has("reducedMotion")) && y(this, b, Lt).call(this);
  }
  async reload() {
    await y(this, b, Dt).call(this);
  }
  setMonth(e) {
    this.replayState.setMonthIndex(e), e >= this.replayState.months.length - 1 && (this.playing = !1);
  }
  select(e) {
    e?.kind === "sector" && hn.includes(e.id) && (this.cameraSector = e.id), this.replayState.select(e);
  }
  play() {
    this.mode === "article" || this.staticMode || this.replayState.months.length === 0 || (this.replayState.monthIndex >= this.replayState.months.length - 1 && this.setMonth(0), this.playing = !0);
  }
  pause() {
    this.playing = !1;
  }
  restart() {
    this.pause(), this.setMonth(0);
  }
  render() {
    return this.revision, m`
      <div
        class="frame"
        data-status=${this.status}
        data-motion=${this.reducedMotion || this.staticMode ? "reduced" : "normal"}
        aria-labelledby="experience-title"
        aria-busy=${this.status === "loading" ? "true" : "false"}
      >
        <div class="masthead">
          <div>
            <p class="eyebrow">Ecodeling replay</p>
            <h1 id="experience-title">
              Follow an inflation shock through the economy
            </h1>
          </div>
          <p class="principle">
            Recorded simulation results. No economics runs in this browser.
          </p>
        </div>
        ${Ll()} ${zl()} ${y(this, b, Br).call(this)}
      </div>
    `;
  }
};
Ee = /* @__PURE__ */ new WeakMap();
de = /* @__PURE__ */ new WeakMap();
be = /* @__PURE__ */ new WeakMap();
qe = /* @__PURE__ */ new WeakMap();
Oe = /* @__PURE__ */ new WeakMap();
le = /* @__PURE__ */ new WeakMap();
he = /* @__PURE__ */ new WeakMap();
Se = /* @__PURE__ */ new WeakMap();
et = /* @__PURE__ */ new WeakMap();
tt = /* @__PURE__ */ new WeakMap();
b = /* @__PURE__ */ new WeakSet();
wt = function() {
  S(this, he) !== null && window.clearInterval(S(this, he)), X(this, he, null);
};
Lt = function() {
  if (y(this, b, wt).call(this), !this.playing || !this.visible || this.staticMode) return;
  const e = (this.reducedMotion ? 1400 : 900) / this.speed;
  X(this, he, window.setInterval(() => {
    const t = this.replayState.monthIndex + 1;
    if (t >= this.replayState.months.length) {
      this.pause();
      return;
    }
    this.setMonth(t);
  }, e));
};
Dt = async function() {
  if (S(this, Oe)?.abort(), y(this, b, wt).call(this), this.replay = null, this.message = "", this.playing = !1, this.src.trim() === "") {
    this.status = "empty";
    return;
  }
  const e = new AbortController();
  X(this, Oe, e), this.status = "loading";
  try {
    const t = await zr(this.src, { signal: e.signal });
    if (e.signal.aborted) return;
    this.replay = t, X(this, de, t), this.customReplay = !1, this.replayState.configure(
      t.manifest.months,
      this.initialMonth || void 0
    ), this.activeRegime = t.runs.some((n) => n.regime === "indexed") ? "indexed" : t.runs[0]?.regime ?? "nominal", this.status = "ready", this.dispatchEvent(
      new CustomEvent("ecodeling-ready", {
        bubbles: !0,
        composed: !0,
        detail: {
          bundleId: t.manifest.bundle_id,
          months: t.manifest.months.length
        }
      })
    );
  } catch (t) {
    if (t instanceof DOMException && t.name === "AbortError") return;
    const n = t instanceof j ? t : new j("decode", "The replay could not be prepared.", {
      cause: t
    });
    this.status = "error", this.message = n.message, this.dispatchEvent(
      new CustomEvent("ecodeling-error", {
        bubbles: !0,
        composed: !0,
        detail: { kind: n.kind, message: n.message }
      })
    );
  }
};
Br = function() {
  return this.status === "loading" ? m`<section class="state" aria-live="polite">
        <span class="seed" aria-hidden="true"></span>
        <div>
          <h2>Loading replay</h2>
          <p>Reading and validating the published result bundle.</p>
        </div>
      </section>` : this.status === "error" ? m`<section class="state error" role="alert">
        <div>
          <h2>Replay unavailable</h2>
          <p>${this.message}</p>
          <button type="button" @click=${() => {
    this.reload();
  }}>
            Try again
          </button>
        </div>
        <slot name="fallback"
          ><p class="fallback">
            A static summary can be supplied in the fallback slot.
          </p></slot
        >
      </section>` : this.status === "empty" || this.replay === null ? m`<section class="state empty">
        <div>
          <h2>Replay not loaded</h2>
          <p>
            Set the <code>src</code> attribute to a validated replay v1 bundle.
          </p>
        </div>
        <slot name="fallback"></slot>
      </section>` : y(this, b, Vr).call(this, this.replay);
};
Vr = function(e) {
  const t = e.manifest.months.length - 1, n = Ir().domain([0, Math.max(t, 1)]).range([0, 100])(this.replayState.monthIndex), r = this.replayState.month ?? e.manifest.months[0], i = e.timeline[this.replayState.monthIndex], a = Lr(e, this.activeRegime), s = a[this.storyIndex] ?? a[0];
  return m`
      <section class="ready">
        <div
          class="mode-tabs"
          role="tablist"
          aria-label="Experience mode"
          @keydown=${S(this, ln)}
        >
          ${y(this, b, on).call(this).map(
    (o) => m`<button
                type="button"
                role="tab"
                id=${`tab-${o}`}
                aria-controls="mode-panel"
                aria-selected=${this.mode === o ? "true" : "false"}
                tabindex=${this.mode === o ? "0" : "-1"}
                class=${this.mode === o ? "active" : ""}
                @click=${() => y(this, b, xt).call(this, o)}
              >
                ${o[0].toUpperCase() + o.slice(1)}
              </button>`
  )}
        </div>
        <p class="mode-description">
          ${Fr[this.mode]}
          ${this.reducedMotion || this.staticMode ? "Reduced motion" : "Motion on"}
        </p>
        <div
          id="mode-panel"
          role="tabpanel"
          aria-labelledby=${`tab-${this.mode}`}
          tabindex="0"
        >
          ${this.mode === "article" ? m`<div
                class="article-scroll"
                tabindex="0"
                role="region"
                aria-label="Scrollable article"
              >
                ${this.customReplay ? m`<p>
                        Custom experiment results. Restore the canonical replay
                        to read the published experiment.
                      </p>
                      <button @click=${() => y(this, b, cn).call(this)}>
                        Restore canonical replay
                      </button>` : _}
                ${Hl(
    e,
    r,
    (o) => y(this, b, Kr).call(this, o),
    (o, c, l, d) => y(this, b, dn).call(this, o, c, l, d)
  )}
              </div>` : m`
                <div class="month-ribbon">
                  <div class="month-copy">
                    <span>Simulation month</span><strong>${r}</strong>
                  </div>
                  <div class="timeline-wrap">
                    <input
                      aria-label="Simulation month"
                      type="range"
                      min="0"
                      max=${t}
                      .value=${String(this.replayState.monthIndex)}
                      @input=${(o) => this.setMonth(
    Number(
      o.currentTarget.value
    )
  )}
                      style=${`--progress: ${n}%`}
                    />
                    <div class="range-labels" aria-hidden="true">
                      <span>${e.manifest.months[0]}</span
                      ><span>${e.manifest.months[t]}</span>
                    </div>
                  </div>
                  <div class="playback-controls" aria-label="Playback controls">
                    <button type="button" @click=${() => this.restart()}>
                      Restart
                    </button>
                    <button
                      type="button"
                      class="primary"
                      ?disabled=${this.staticMode}
                      @click=${() => this.playing ? this.pause() : this.play()}
                    >
                      ${this.playing ? "Pause" : "Play"}
                    </button>
                    <label
                      >Speed<select
                        aria-label="Playback speed"
                        .value=${String(this.speed)}
                        @change=${(o) => this.speed = Number(
    o.currentTarget.value
  )}
                      >
                        <option value="0.5">0.5×</option>
                        <option value="1">1×</option>
                        <option value="2">2×</option>
                      </select></label
                    >
                  </div>
                </div>

                <div class="marker-row" aria-label="Timeline markers">
                  ${e.timeline.map(
    (o) => o.shock || o.policy_decision ? m`<button
                          type="button"
                          @click=${() => this.setMonth(o.index)}
                          title=${`${o.month}: ${o.shock ? "shock" : "policy decision"}`}
                        >
                          <span>${o.shock ? "Shock" : "Policy"}</span
                          ><small>${o.month}</small>
                        </button>` : _
  )}
                  ${!i?.shock && !i?.policy_decision ? m`<span class="quiet-marker"
                        >No event marker this month</span
                      >` : _}
                </div>

                ${this.mode === "laboratory" ? y(this, b, Gr).call(this) : this.mode === "compare" ? y(this, b, ei).call(this, e, r) : m`${this.mode === "story" ? y(this, b, jr).call(this, a, s) : _}
                        <div class="shell-grid">
                          ${y(this, b, Jr).call(this, e, r, s)}
                          ${y(this, b, Zr).call(this, e, r)}
                        </div>
                        ${y(this, b, Qr).call(this, e, r)}`}
              `}
        </div>
        ${y(this, b, ti).call(this, e)}
      </section>
    `;
};
on = function() {
  return [
    "article",
    "story",
    "explore",
    "compare",
    ...this.apiBase.trim() ? ["laboratory"] : []
  ];
};
xt = function(e) {
  this.mode === "article" && X(this, Ee, this.renderRoot.querySelector(".article-scroll")?.scrollTop ?? S(this, Ee)), this.mode = e, e === "article" && this.pause();
  try {
    sessionStorage.setItem(
      `ecodeling-mode:${location.pathname}:${this.id || this.src}`,
      e
    );
  } catch {
  }
  this.updateComplete.then(() => {
    const t = this.renderRoot.querySelector(".article-scroll");
    e === "article" && t && (t.scrollTop = S(this, Ee));
  });
};
ln = /* @__PURE__ */ new WeakMap();
Kr = function(e) {
  if (this.pause(), this.setMonth(this.replayState.months.indexOf(e.month)), e.metric && (this.selectedMetric = e.metric), e.regime && (this.activeRegime = e.regime), e.sector && (this.cameraSector = e.sector, this.select({ kind: "sector", id: e.sector })), e.agent && this.select({ kind: "agent", id: e.agent }), e.event && !e.sector && this.select({ kind: "event", id: e.event }), e.mode === "story" && this.replay) {
    const n = Lr(this.replay, this.activeRegime).findIndex((r) => r.month === e.month);
    this.storyIndex = Math.max(0, n);
  }
  y(this, b, xt).call(this, e.mode), this.updateComplete.then(
    () => this.renderRoot.querySelector("#mode-panel")?.focus()
  );
};
Xr = function(e) {
  const t = new FormData(e), n = (r) => Number(t.get(r));
  return {
    months: n("months"),
    seed: n("seed"),
    households: n("households"),
    firms: n("firms"),
    indexation_lag_months: n("indexation_lag_months"),
    shock_kind: String(
      t.get("shock_kind")
    ),
    shock_month: n("shock_month"),
    shock_magnitude_bps: n("shock_magnitude_bps"),
    shock_persistence: String(
      t.get("shock_persistence")
    ),
    import_share_bps: n("import_share_bps"),
    price_adjustment_bps: n("price_adjustment_bps")
  };
};
Wr = async function(e) {
  e.preventDefault(), S(this, be)?.abort();
  const t = new AbortController();
  X(this, be, t), this.laboratoryStatus = "submitting", this.laboratoryProgress = 0, this.laboratoryMessage = "Validating the public parameter set.";
  try {
    const n = await Pl(
      this.apiBase,
      y(this, b, Xr).call(this, e.currentTarget),
      { signal: t.signal }
    );
    X(this, qe, n.links.status), this.laboratoryStatus = n.status === "completed" ? "running" : "queued", this.laboratoryMessage = n.cached ? "Loading the immutable cached result." : "The experiment is in the bounded worker queue.";
    const r = await ql(n.links.status, {
      signal: t.signal,
      onProgress: (a) => {
        this.laboratoryStatus = a.status === "queued" ? "queued" : "running", this.laboratoryProgress = a.progress_percent, this.laboratoryMessage = a.status === "queued" ? "Waiting for a worker process." : "Python is running the paired simulation and replay checks.";
      }
    }), i = await zr(r.result_url ?? n.links.result, {
      signal: t.signal
    });
    this.replay = i, this.replayState.configure(i.manifest.months), this.customReplay = !0, this.laboratoryStatus = "completed", this.laboratoryProgress = 100, this.laboratoryMessage = `Loaded ${i.manifest.bundle_id}. Reproducibility metadata is shown below.`;
  } catch (n) {
    if (n instanceof DOMException && n.name === "AbortError") return;
    this.laboratoryStatus = "failed", this.laboratoryMessage = n instanceof rn || n instanceof Error ? n.message : "The custom experiment failed.";
  }
};
Yr = async function() {
  if (S(this, qe) !== "")
    try {
      await Ol(S(this, qe)), S(this, be)?.abort(), this.laboratoryStatus = "idle", this.laboratoryMessage = "The queued experiment was cancelled safely.";
    } catch (e) {
      this.laboratoryMessage = e instanceof Error ? `${e.message} The canonical replay is still available.` : "The job could not be cancelled safely.";
    }
};
cn = function() {
  S(this, de) !== null && (this.replay = S(this, de), this.replayState.configure(
    S(this, de).manifest.months,
    this.initialMonth || void 0
  ), this.customReplay = !1, this.laboratoryStatus = "idle", this.laboratoryMessage = "Restored the published canonical replay.");
};
Gr = function() {
  const e = ["submitting", "queued", "running"].includes(
    this.laboratoryStatus
  );
  return m`<section class="laboratory" aria-labelledby="laboratory-title">
      <div class="compare-heading">
        <div>
          <p class="eyebrow">Bounded public experiment</p>
          <h2 id="laboratory-title">Laboratory</h2>
        </div>
        <p>
          Runs execute in isolated Python workers. The browser only receives a
          validated replay.
        </p>
      </div>
      <form
        @submit=${(t) => {
    y(this, b, Wr).call(this, t);
  }}
      >
        <label
          >Months<input
            name="months"
            type="number"
            min="6"
            max="60"
            value="18"
            required
        /></label>
        <label
          >Seed<input name="seed" type="number" min="0" value="1010" required
        /></label>
        <label
          >Households<input
            name="households"
            type="number"
            min="10"
            max="250"
            value="20"
            required
        /></label>
        <label
          >Firms<input
            name="firms"
            type="number"
            min="2"
            max="50"
            value="4"
            required
        /></label>
        <label
          >Indexation lag (months)<input
            name="indexation_lag_months"
            type="number"
            min="0"
            max="24"
            value="1"
            required
        /></label>
        <label
          >Shock
          <select name="shock_kind">
            <option value="fx_depreciation">FX depreciation</option>
            <option value="foreign_price_increase">
              Foreign-price increase
            </option>
          </select>
        </label>
        <label
          >Shock month<input
            name="shock_month"
            type="number"
            min="1"
            max="59"
            value="3"
            required
        /></label>
        <label
          >Shock magnitude (basis points)<input
            name="shock_magnitude_bps"
            type="number"
            min="-5000"
            max="5000"
            value="1000"
            required
        /></label>
        <label
          >Persistence
          <select name="shock_persistence">
            <option value="permanent">Permanent</option>
            <option value="one_off">One month</option>
          </select>
        </label>
        <label
          >Import share (basis points)<input
            name="import_share_bps"
            type="number"
            min="0"
            max="7500"
            value="2500"
            required
        /></label>
        <label
          >Price adjustment (basis points)<input
            name="price_adjustment_bps"
            type="number"
            min="100"
            max="10000"
            value="2500"
            required
        /></label>
        <div class="laboratory-actions">
          <button class="primary" type="submit" ?disabled=${e}>
            ${this.laboratoryStatus === "failed" ? "Retry experiment" : "Run experiment"}
          </button>
          ${e ? m`<button
                type="button"
                @click=${() => {
    y(this, b, Yr).call(this);
  }}
              >
                Cancel if queued
              </button>` : _}
          ${this.customReplay ? m`<button
                type="button"
                @click=${() => y(this, b, cn).call(this)}
              >
                Restore canonical replay
              </button>` : _}
        </div>
      </form>
      <div class="laboratory-status" role="status" aria-live="polite">
        <strong>${this.laboratoryStatus}</strong>
        <progress max="100" .value=${this.laboratoryProgress}></progress>
        <span
          >${this.laboratoryMessage || "Choose bounded parameters; the canonical replay remains untouched until a result validates."}</span
        >
      </div>
    </section>`;
};
jr = function(e, t) {
  return m`<section class="story-panel" aria-labelledby="story-title">
      <div class="story-copy">
        <p class="eyebrow">Scene ${this.storyIndex + 1} of ${e.length}</p>
        <h2 id="story-title">${t.title}</h2>
        <p>${t.summary}</p>
        <small>Replay trace: ${t.trace}</small>
      </div>
      <ol>
        ${e.map(
    (n, r) => m`<li>
              <button
                type="button"
                class=${r === this.storyIndex ? "active" : ""}
                aria-current=${r === this.storyIndex ? "step" : _}
                @click=${() => {
      this.storyIndex = r, this.setMonth(
        this.replayState.months.indexOf(n.month)
      );
    }}
              >
                <span>${r + 1}</span>${n.title}<small
                  >${n.month}</small
                >
              </button>
            </li>`
  )}
      </ol>
    </section>`;
};
Jr = function(e, t, n) {
  const r = e.sector_flows.filter(
    (o) => o.regime === this.activeRegime && o.month === t
  ), i = Math.max(...r.map((o) => o.amount_isk), 1), a = il().domain([0, i]).range([0.8, 2.4]), s = new Set(this.mode === "story" ? n.focus : []);
  return m`<section class="stage" aria-labelledby="stage-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow">${this.activeRegime} economy</p>
          <h2 id="stage-title">Recorded economic circuit</h2>
        </div>
        <div class="regime-toggle" aria-label="Run selection">
          ${e.runs.map(
    (o) => m`<button
                type="button"
                aria-pressed=${o.regime === this.activeRegime ? "true" : "false"}
                @click=${() => {
      this.activeRegime = o.regime, this.select({ kind: "run", id: o.run_id });
    }}
              >
                ${o.regime === "nominal" ? "Nominal" : "Indexed"}
              </button>`
  )}
        </div>
      </div>
      <div class="circuit-wrap">
        <svg
          class="flow-layer"
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          role="img"
          aria-label=${`${r.length} recorded aggregate flows in ${t}`}
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="3"
              markerHeight="3"
              markerUnits="userSpaceOnUse"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#d8a955"></path>
            </marker>
          </defs>
          ${r.map((o) => {
    const [c, l] = Ye[o.source_sector], [d, h] = Ye[o.target_sector], p = `${Gn[o.flow_type]}: ${w(
      o.amount_isk,
      "ISK"
    )}; ${V[o.source_sector]} to ${V[o.target_sector]}; ledger entry ${o.ledger_entry_id}`;
    return Wn`<g class="flow">
              <line
                x1=${c}
                y1=${l}
                x2=${d}
                y2=${h}
                style=${`stroke:#d8a955;stroke-width:${a(o.amount_isk)}px;opacity:.72`}
                marker-end="url(#arrow)"
                ><title>${p}</title></line
              >
              ${!this.reducedMotion && !this.staticMode ? Wn`<circle r="1.25">
                    <title>${p}</title>
                    <animateMotion
                      dur=${`${3 / this.speed}s`}
                      repeatCount="indefinite"
                      path=${`M ${c} ${l} L ${d} ${h}`}
                    ></animateMotion>
                  </circle>` : _}
            </g>`;
  })}
        </svg>
        <div class="sector-field">
          ${hn.map((o) => {
    const c = e.sector_snapshots.find(
      (d) => d.regime === this.activeRegime && d.month === t && d.sector === o
    ), l = this.replayState.selection?.kind === "sector" && this.replayState.selection.id === o;
    return m`<button
              type="button"
              class=${`sector ${o.replace("_", "-")} ${s.has(o) ? "focused" : ""}`}
              style=${`--x:${Ye[o][0]}%;--y:${Ye[o][1]}%`}
              aria-pressed=${l ? "true" : "false"}
              @click=${() => this.select({ kind: "sector", id: o })}
              title=${`${V[o]}. Equity: ${w(
      c?.equity_isk ?? null,
      "ISK"
    )}`}
            >
              <span aria-hidden="true"></span
              ><strong>${V[o]}</strong
              ><small
                >${c?.equity_isk === null || c === void 0 ? "Stock not modeled" : w(c.equity_isk, "ISK") + " equity"}</small
              >
            </button>`;
  })}
          <div class="cpi-orbit" title="Consumer price index">
            <span>CPI</span
            ><strong
              >${w(
    Dr(e, this.activeRegime, "cpi_level", t)?.value ?? null,
    "index"
  )}</strong
            >
          </div>
        </div>
      </div>
      <details class="flow-table">
        <summary>Exact flows for ${t}</summary>
        <table>
          <thead>
            <tr>
              <th>Flow</th>
              <th>Route</th>
              <th>Amount</th>
              <th>Ledger entry</th>
            </tr>
          </thead>
          <tbody>
            ${r.map(
    (o) => m`<tr>
                  <td>${Gn[o.flow_type]}</td>
                  <td>
                    ${V[o.source_sector]} →
                    ${V[o.target_sector]}
                  </td>
                  <td>${w(o.amount_isk, "ISK")}</td>
                  <td><code>${o.ledger_entry_id}</code></td>
                </tr>`
  )}
          </tbody>
        </table>
      </details>
    </section>`;
};
Zr = function(e, t) {
  const n = e.events.filter(
    (c) => c.regime === this.activeRegime && c.month === t
  ), r = this.replayState.selection?.kind === "sector" ? this.replayState.selection.id : null, i = e.representative_agents.filter(
    (c) => c.regime === this.activeRegime
  ), a = this.replayState.selection?.kind === "agent" ? i.find(
    (c) => c.household_id === this.replayState.selection?.id
  ) : void 0, s = a?.track.find((c) => c.month === t), o = r ? e.sector_snapshots.find(
    (c) => c.regime === this.activeRegime && c.month === t && c.sector === r
  ) : void 0;
  return m`<section class="inspector" aria-labelledby="inspector-title">
      <p class="eyebrow">Inspect ${t}</p>
      <h2 id="inspector-title">Exact recorded values</h2>
      <p>
        Stocks are month-end balances in nominal whole Icelandic krónur (ISK);
        income, consumption, payments, and revaluation cover this month. A
        larger liability means more owed; equity is assets minus liabilities.
        Unavailable is not zero. Baseline: the selected ${this.activeRegime} run
        at ${t}.
      </p>
      ${r && o ? m`<div class="inspection-card">
            <h3>${V[r]}</h3>
            <dl>
              <div>
                <dt>Financial assets</dt>
                <dd>${w(o.financial_assets_isk, "ISK")}</dd>
              </div>
              <div>
                <dt>Liabilities</dt>
                <dd>${w(o.liabilities_isk, "ISK")}</dd>
              </div>
              <div>
                <dt>Equity</dt>
                <dd>${w(o.equity_isk, "ISK")}</dd>
              </div>
              <div>
                <dt>Inventory</dt>
                <dd>
                  ${w(o.inventory_units, "physical_units")}
                </dd>
              </div>
            </dl>
          </div>` : _}
      ${a && s ? m`<div class="inspection-card">
            <h3>${a.cohort.replaceAll("_", " ")}</h3>
            <p><code>${a.household_id}</code></p>
            <dl>
              <div>
                <dt>Income</dt>
                <dd>${w(s.wage_income_isk, "ISK")}</dd>
              </div>
              <div>
                <dt>Consumption</dt>
                <dd>${w(s.consumption_isk, "ISK")}</dd>
              </div>
              <div>
                <dt>Mortgage</dt>
                <dd>${w(s.mortgage_principal_isk, "ISK")}</dd>
              </div>
              <div>
                <dt>Revaluation</dt>
                <dd>${w(s.mortgage_revaluation_isk, "ISK")}</dd>
              </div>
            </dl>
          </div>` : _}
      ${!r && !a ? m`<p class="instruction">
            Select a sector or representative household. Values remain tied to
            this replay month.
          </p>` : _}
      <h3>Representative households</h3>
      <div class="agent-list">
        ${i.map(
    (c) => m`<button
              type="button"
              aria-pressed=${a?.household_id === c.household_id ? "true" : "false"}
              @click=${() => this.select({ kind: "agent", id: c.household_id })}
            >
              <span>${c.cohort.replaceAll("_", " ")}</span
              ><small>${c.household_id}</small>
            </button>`
  )}
      </div>
      <h3>Events this month</h3>
      <p>
        Recorded changes and their source IDs. A revaluation changes a balance
        without transferring cash; event order alone does not establish
        causality.
      </p>
      ${n.length === 0 ? m`<p>No typed event is recorded this month.</p>` : m`<ul class="event-list">
            ${n.map(
    (c) => m`<li>
                  <button
                    type="button"
                    @click=${() => this.select({ kind: "event", id: c.id })}
                  >
                    <strong>${c.event_type.replaceAll("_", " ")}</strong
                    ><span>${w(c.amount, c.unit)}</span
                    ><small>Source: ${c.source_id}</small>
                  </button>
                </li>`
  )}
          </ul>`}
    </section>`;
};
Qr = function(e, t) {
  return m`<section class="metric-strip" aria-label="Recorded indicators">
      ${Bl.map(([n, r]) => {
    const i = Dr(e, this.activeRegime, n, t);
    return m`<div>
          <span>${r}</span
          ><strong
            >${w(i?.value ?? null, i?.unit ?? null)}</strong
          ><small>${this.activeRegime}, ${t}</small>
        </div>`;
  })}
    </section>`;
};
ei = function(e, t) {
  const n = ft(e, this.selectedMetric), r = n?.points[this.replayState.monthIndex], i = [
    ...new Set(e.distribution_series.map((l) => l.dimension))
  ], a = Hr(
    e,
    t,
    this.cohortDimension,
    this.cohortMeasure
  ), s = this.replayState.selection?.kind === "agent" ? this.replayState.selection.id : null, o = s ? e.representative_agents.find(
    (l) => l.household_id === s
  ) : void 0, c = o ? Nl(
    e,
    o.regime,
    o.household_id
  ) : null;
  return m`<section class="comparison" aria-labelledby="compare-title">
      <div class="compare-heading">
        <div>
          <p class="eyebrow">Paired experiment</p>
          <h2 id="compare-title">One clock, two contract structures</h2>
          <p>
            Indexed minus nominal differences use the nominal run as the
            baseline. Both runs share seed
            ${e.scenario_pairing.shared_seed} and the recorded shock path.
          </p>
        </div>
        <div class="view-toggle" aria-label="Comparison view">
          ${["nominal", "split", "indexed"].map(
    (l) => m`<button
                type="button"
                aria-pressed=${this.comparisonView === l ? "true" : "false"}
                @click=${() => {
      this.comparisonView = l, l !== "split" && (this.activeRegime = l);
    }}
              >
                ${l === "split" ? "Split screen" : l === "nominal" ? "Nominal" : "Indexed"}
              </button>`
  )}
        </div>
      </div>

      <div class=${`paired-scenes ${this.comparisonView}`}>
        ${this.comparisonView !== "indexed" ? y(this, b, Ht).call(this, e, "nominal", t) : _}
        ${this.comparisonView !== "nominal" ? y(this, b, Ht).call(this, e, "indexed", t) : _}
      </div>

      <section class="chart-panel" aria-labelledby="chart-title">
        <p>${zt[this.selectedMetric]}</p>
        <div class="chart-heading">
          <div>
            <p class="eyebrow">Synchronized analytical chart</p>
            <h3 id="chart-title">
              ${jn.find(
    (l) => l.name === this.selectedMetric
  )?.label}
            </h3>
          </div>
          <label
            >Metric<select
              aria-label="Comparison metric"
              .value=${this.selectedMetric}
              @change=${(l) => this.selectedMetric = l.currentTarget.value}
            >
              ${jn.map(
    (l) => m`<option
                    value=${l.name}
                    .selected=${l.name === this.selectedMetric}
                  >
                    ${l.label}
                  </option>`
  )}
            </select></label
          >
        </div>
        ${n ? m`${y(this, b, dn).call(this, n.points, n.unit, t)}
              <div class="difference-readout" aria-live="polite">
                <div>
                  <span>Nominal</span
                  ><strong
                    >${w(r?.nominal ?? null, n.unit)}</strong
                  >
                </div>
                <div>
                  <span>Indexed</span
                  ><strong
                    >${w(r?.indexed ?? null, n.unit)}</strong
                  >
                </div>
                <div class="difference">
                  <span>Indexed − nominal</span
                  ><strong
                    >${y(this, b, Ft).call(this, r?.difference ?? null, n.unit)}</strong
                  ><small>Nominal baseline, ${t}</small>
                </div>
              </div>` : m`<p>This paired metric is not available in the replay.</p>`}
      </section>

      <div class="comparison-detail-grid">
        <section class="cohort-panel" aria-labelledby="cohort-title">
          <div class="chart-heading">
            <div>
              <p class="eyebrow">Declared cohort comparison</p>
              <h3 id="cohort-title">Distribution at ${t}</h3>
            </div>
            <div class="cohort-controls">
              <label
                >Cohort dimension<select
                  aria-label="Cohort dimension"
                  .value=${this.cohortDimension}
                  @change=${(l) => this.cohortDimension = l.currentTarget.value}
                >
                  ${i.map(
    (l) => m`<option
                        value=${l}
                        .selected=${l === this.cohortDimension}
                      >
                        ${l.replaceAll("_", " ")}
                      </option>`
  )}
                </select></label
              >
              <label
                >Measure<select
                  aria-label="Cohort measure"
                  .value=${this.cohortMeasure}
                  @change=${(l) => this.cohortMeasure = l.currentTarget.value}
                >
                  <option value="consumption_isk">Consumption</option>
                  <option value="mortgage_principal_isk">
                    Mortgage principal
                  </option>
                  <option value="debt_service_isk">Debt service</option>
                  <option value="net_worth_isk">Net worth</option>
                  <option value="defaults">Defaults</option>
                </select></label
              >
            </div>
          </div>
          <div class="cohort-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Cohort</th>
                  <th>Nominal</th>
                  <th>Indexed</th>
                  <th>Indexed − nominal</th>
                </tr>
              </thead>
              <tbody>
                ${a.map(
    (l) => m`<tr>
                      <td>${l.cohort.replaceAll("_", " ")}</td>
                      <td>
                        ${w(
      l.nominal,
      this.cohortMeasure === "defaults" ? "households" : "ISK"
    )}
                      </td>
                      <td>
                        ${w(
      l.indexed,
      this.cohortMeasure === "defaults" ? "households" : "ISK"
    )}
                      </td>
                      <td>
                        ${y(this, b, Ft).call(this, l.difference, this.cohortMeasure === "defaults" ? "households" : "ISK")}
                      </td>
                    </tr>`
  )}
              </tbody>
            </table>
          </div>
          <p class="baseline-note">
            Values are recorded cohort totals; differences use nominal as the
            baseline. Units are
            ${this.cohortMeasure === "defaults" ? "households" : "nominal whole ISK"}.
          </p>
        </section>

        <section class="matching-panel" aria-labelledby="matching-title">
          <p class="eyebrow">Representative correspondence</p>
          <h3 id="matching-title">Identity check</h3>
          <p>
            Select a nominal representative to verify whether the same simulated
            household exists in both runs.
          </p>
          <div class="agent-list">
            ${e.representative_agents.filter((l) => l.regime === "nominal").map(
    (l) => m`<button
                    type="button"
                    aria-pressed=${s === l.household_id ? "true" : "false"}
                    @click=${() => this.select({ kind: "agent", id: l.household_id })}
                  >
                    <span>${l.cohort.replaceAll("_", " ")}</span>
                    <small>${l.household_id}</small>
                  </button>`
  )}
          </div>
          ${c ? m`<div class="match-result" role="status">
                <strong
                  >${c.kind === "individual" ? "Matched individual" : "Cohort comparison only"}</strong
                >
                <p>
                  ${c.kind === "individual" ? `Stable identity ${c.nominalId} is present in both regimes.` : `The identities do not correspond. Comparing the declared ${c.cohort.replaceAll("_", " ")} cohort instead.`}
                </p>
              </div>` : _}
        </section>
      </div>
    </section>`;
};
Ht = function(e, t, n) {
  const r = e.runs.find((i) => i.regime === t);
  return m`<article
      class=${`run-panel ${t}`}
      aria-label=${`${t} economy at ${n}`}
    >
      <div class="run-heading">
        <div>
          <span>${t === "nominal" ? "Nominal" : "Indexed"}</span>
          <strong>${n}</strong>
        </div>
        <small>${r.run_id}</small>
      </div>
      <p class="camera-label">
        Shared camera: ${V[this.cameraSector]}
      </p>
      <div class="sector-comparison" aria-label="Shared sector camera">
        ${hn.map((i) => {
    const a = e.sector_snapshots.find(
      (s) => s.regime === t && s.month === n && s.sector === i
    );
    return m`<button
            type="button"
            aria-pressed=${this.cameraSector === i ? "true" : "false"}
            @click=${() => {
      this.cameraSector = i, this.select({ kind: "sector", id: i });
    }}
          >
            <span>${V[i]}</span>
            <strong>${w(a?.equity_isk ?? null, "ISK")}</strong>
            <small>equity</small>
          </button>`;
  })}
      </div>
    </article>`;
};
dn = function(e, t, n, r = this.selectedMetric) {
  const i = e.flatMap(
    (d) => [d.nominal, d.indexed].filter(
      (h) => h !== null
    )
  ), a = i.length > 0 ? Math.min(...i) : 0, o = (i.length > 0 ? Math.max(...i) : 1) - a || 1, c = (d) => {
    let h = !1;
    return e.map((p, u) => {
      const f = p[d];
      if (f === null)
        return h = !1, "";
      const g = 6 + u / Math.max(e.length - 1, 1) * 88, k = 90 - (f - a) / o * 76, M = h ? "L" : "M";
      return h = !0, `${M}${g.toFixed(2)},${k.toFixed(2)}`;
    }).join(" ");
  }, l = 6 + this.replayState.monthIndex / Math.max(e.length - 1, 1) * 88;
  return m`<div class="paired-chart">
      <svg
        viewBox="0 0 100 100"
        role="img"
        aria-label=${`Nominal and indexed ${r} across ${e.length} aligned months; current month ${n}`}
        preserveAspectRatio="none"
      >
        <line class="chart-axis" x1="6" y1="90" x2="94" y2="90"></line>
        <line class="chart-axis" x1="6" y1="14" x2="6" y2="90"></line>
        <path class="nominal-line" d=${c("nominal")}></path>
        <path class="indexed-line" d=${c("indexed")}></path>
        <line
          class="shared-cursor"
          x1=${l}
          x2=${l}
          y1="10"
          y2="94"
        ></line>
      </svg>
      <div class="chart-legend">
        <span class="nominal-key">Nominal — solid</span>
        <span class="indexed-key">Indexed — dashed</span>
        <span>${t}</span>
      </div>
    </div>`;
};
Ft = function(e, t) {
  return e === null ? "Not available" : e === 0 ? w(0, t) : `${e > 0 ? "+" : "−"}${w(Math.abs(e), t)}`;
};
ti = function(e) {
  return m`<details class="provenance">
      <summary>Replay provenance — ${e.manifest.scenario_id}</summary>
      <dl>
        <div>
          <dt>Bundle</dt>
          <dd>${e.manifest.bundle_id}</dd>
        </div>
        <div>
          <dt>Model</dt>
          <dd>${e.manifest.model_version}</dd>
        </div>
        <div>
          <dt>Seed</dt>
          <dd>${e.manifest.seed}</dd>
        </div>
        <div>
          <dt>Commit</dt>
          <dd><code>${e.manifest.git_commit}</code></dd>
        </div>
      </dl>
    </details>`;
};
x.styles = sl`
    .inline-term {
      position: relative;
      display: inline;
    }
    .inline-term button {
      color: var(--ec-fg);
      background: transparent;
      border: 0;
      border-bottom: 1px dotted var(--ec-signal);
      border-radius: 0;
      padding: 0.1rem 0.2rem;
      cursor: help;
      font: inherit;
    }
    .term-definition {
      display: block;
      border: 1px solid var(--ec-rule);
      background: var(--ec-panel);
      padding: 0.75rem;
      color: var(--ec-fg);
      max-width: 70ch;
      font-size: 0.9rem;
    }
    .term-definition[hidden] {
      display: none;
    }
    .reader-intro,
    .reader-glossary,
    .mode-description {
      padding: 1rem clamp(1rem, 3vw, 2rem);
    }
    .reader-intro p,
    .reading-guide,
    .reader-limits {
      max-width: 76ch;
      line-height: 1.75;
    }
    .reader-intro h2 {
      font-size: clamp(1.3rem, 3vw, 2rem);
    }
    summary {
      cursor: pointer;
      padding: 0.7rem 0;
    }
    .reader-glossary {
      border-block: 1px solid var(--ec-rule);
    }
    .reader-glossary dl {
      margin: 0;
    }
    .glossary-entry {
      border-top: 1px solid var(--ec-rule);
    }
    .glossary-entry p {
      max-width: 76ch;
      line-height: 1.7;
    }
    .mode-description {
      margin: 0;
      border-bottom: 1px solid var(--ec-rule);
    }
    .article-scroll {
      max-height: 78vh;
      overflow: auto;
      overscroll-behavior: contain;
      scrollbar-gutter: stable;
    }
    .reader-article {
      max-width: 82ch;
      margin-inline: auto;
      padding: clamp(1rem, 3vw, 2rem);
      line-height: 1.8;
    }
    .reader-article section {
      padding-block: 1.5rem;
      border-bottom: 1px solid var(--ec-rule);
    }
    .reader-article h2 {
      line-height: 1.35;
      font-size: clamp(1.3rem, 2vw, 1.7rem);
    }
    .reader-article figure {
      margin: 1.5rem 0;
    }
    .reader-article figcaption,
    .reader-article small {
      display: block;
      font-size: 0.85rem;
      overflow-wrap: anywhere;
    }
    .reader-article button {
      color: var(--ec-fg);
      background: var(--ec-panel);
      border: 1px solid var(--ec-rule);
      border-radius: 0;
      padding: 0.7rem;
      min-height: 44px;
      margin: 0.5rem 0.5rem 0.5rem 0;
      white-space: normal;
      text-align: left;
    }
    .stage {
      align-self: start;
    }
    .article-timeline {
      padding-left: 1.5rem;
      border-left: 1px solid var(--ec-rule);
    }
    .shock-marker {
      color: var(--ec-signal);
      font-weight: 700;
    }
    .article-evidence {
      border-top: 1px solid var(--ec-rule);
      margin-top: 1rem;
    }
    .evidence-values {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
    .evidence-values dd {
      margin: 0;
      font-weight: 700;
    }
    .table-scroll {
      overflow-x: auto;
    }
    .reader-article table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.85rem;
    }
    .reader-article td,
    .reader-article th {
      padding: 0.6rem;
      border-bottom: 1px solid var(--ec-rule);
      text-align: left;
    }
    .article-source {
      overflow-wrap: anywhere;
    }
    @media print {
      .article-scroll {
        max-height: none;
        overflow: visible;
      }
    }
    :host {
      --ec-bg: var(--bg, #121316);
      --ec-fg: var(--fg, #e7e5df);
      --ec-muted: var(--muted, #8e9199);
      --ec-rule: var(--rule, #2b2e34);
      --ec-signal: var(--accent, #d8a955);
      --ec-panel: color-mix(in srgb, var(--ec-fg) 5%, var(--ec-bg));
      --ec-panel-strong: color-mix(in srgb, var(--ec-fg) 9%, var(--ec-bg));
      --sand: var(--ec-bg);
      --oat: var(--ec-panel-strong);
      --sage: var(--ec-panel);
      --clay: var(--ec-panel-strong);
      --terracotta: var(--ec-signal);
      --ochre: var(--ec-signal);
      --moss: var(--ec-fg);
      --moss-dark: var(--ec-fg);
      --ink: var(--ec-fg);
      display: block;
      color: var(--ec-fg);
      font-family:
        "JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas,
        monospace;
      font-variant-numeric: tabular-nums;
      container-type: inline-size;
      outline-color: var(--ec-signal);
    }
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }
    button,
    select,
    input {
      font: inherit;
    }
    button {
      color: inherit;
      cursor: pointer;
    }
    button:focus-visible,
    input:focus-visible,
    select:focus-visible,
    summary:focus-visible {
      outline: 0.22rem solid var(--terracotta);
      outline-offset: 0.2rem;
    }
    .frame {
      position: relative;
      overflow: hidden;
      min-height: 38rem;
      padding: clamp(1rem, 3.5cqi, 3.5rem);
      border-radius: 0;
      background: var(--ec-bg);
      isolation: isolate;
    }
    .frame::before {
      display: none;
    }
    .masthead {
      display: grid;
      grid-template-columns: minmax(0, 2fr) minmax(15rem, 1fr);
      gap: 2rem;
      align-items: end;
      margin-bottom: clamp(1.5rem, 4cqi, 3.5rem);
    }
    h1,
    h2,
    h3,
    p {
      margin-top: 0;
    }
    h1 {
      max-width: 30ch;
      margin-bottom: 0;
      font-size: clamp(1.5rem, 3.5cqi, 2.75rem);
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.08;
    }
    h2 {
      margin-bottom: 0.5rem;
      font-size: clamp(1.25rem, 2.6cqi, 2rem);
      line-height: 1.05;
    }
    h3 {
      margin: 1.4rem 0 0.65rem;
      font-size: 1rem;
    }
    .eyebrow {
      margin-bottom: 0.65rem;
      color: var(--terracotta);
      font-size: 0.75rem;
      font-weight: 750;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    .principle {
      max-width: 27rem;
      margin-bottom: 0;
      padding-left: 1rem;
      border-left: 1px solid var(--ec-signal);
      line-height: 1.5;
    }
    .state {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      gap: 1.5rem;
      align-items: center;
      min-height: 14rem;
      padding: clamp(1.25rem, 4cqi, 3rem);
      border-radius: 2rem;
      background: var(--oat);
    }
    .state p {
      margin-bottom: 0;
      line-height: 1.5;
    }
    .seed {
      width: 3rem;
      aspect-ratio: 1;
      border-radius: 65% 35% 60% 40%;
      background: var(--moss);
      animation: breathe 1.8s ease-in-out infinite alternate;
    }
    .state.error {
      grid-template-columns: minmax(0, 1fr) minmax(12rem, 0.6fr);
      background: var(--clay);
    }
    .state button,
    .primary {
      min-height: 2.7rem;
      padding: 0.6rem 1rem;
      border: 0;
      border-radius: 1rem;
      color: var(--sand);
      background: var(--moss);
      font-weight: 700;
    }
    .fallback {
      padding: 1rem;
      border-radius: 1rem;
      background: var(--oat);
    }
    code {
      overflow-wrap: anywhere;
      font-family: inherit;
      font-variant-numeric: tabular-nums;
    }
    .mode-tabs {
      display: flex;
      gap: 0.4rem;
      align-items: center;
      margin-bottom: 0.6rem;
    }
    .mode-tabs button,
    .regime-toggle button {
      min-height: 2.65rem;
      padding: 0.55rem 1rem;
      border: 1px solid var(--moss);
      border-radius: 1rem;
      background: transparent;
      font-weight: 700;
    }
    .mode-tabs button.active,
    .regime-toggle button[aria-pressed="true"] {
      color: var(--sand);
      background: var(--moss);
    }
    .mode-tabs > span {
      margin-left: auto;
      padding: 0.45rem 0.7rem;
      border-radius: 1rem;
      background: var(--sage);
      font-size: 0.75rem;
      font-weight: 700;
    }
    .month-ribbon {
      display: grid;
      grid-template-columns: minmax(8rem, auto) minmax(12rem, 1fr) auto;
      gap: clamp(1rem, 3cqi, 2.5rem);
      align-items: center;
      padding: 1rem 1.25rem;
      border-radius: 1.5rem;
      color: var(--sand);
      background: var(--moss);
    }
    .month-copy span {
      display: block;
      color: var(--oat);
      font-size: 0.7rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .month-copy strong {
      font-size: clamp(1.35rem, 3cqi, 2.2rem);
      font-variant-numeric: tabular-nums;
    }
    input[type="range"] {
      width: 100%;
      accent-color: var(--terracotta);
      cursor: pointer;
    }
    .range-labels {
      display: flex;
      justify-content: space-between;
      color: var(--oat);
      font-size: 0.7rem;
      font-variant-numeric: tabular-nums;
    }
    .playback-controls {
      display: flex;
      gap: 0.4rem;
      align-items: center;
    }
    .playback-controls button {
      min-height: 2.55rem;
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--sand);
      border-radius: 0.85rem;
      color: var(--sand);
      background: transparent;
    }
    .playback-controls button:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }
    .playback-controls .primary {
      color: var(--moss);
      background: var(--sand);
    }
    .playback-controls label {
      display: grid;
      gap: 0.1rem;
      color: var(--oat);
      font-size: 0.66rem;
    }
    .playback-controls select {
      min-height: 2rem;
      border: 0;
      border-radius: 0.65rem;
      color: var(--moss);
      background: var(--sand);
    }
    .marker-row {
      display: flex;
      gap: 0.45rem;
      min-height: 3.2rem;
      padding: 0.55rem 1rem;
      overflow-x: auto;
    }
    .marker-row button {
      display: grid;
      flex: 0 0 auto;
      padding: 0.35rem 0.7rem;
      border: 0;
      border-radius: 1rem;
      background: var(--oat);
      text-align: left;
    }
    .marker-row small,
    .quiet-marker {
      font-size: 0.7rem;
    }
    .quiet-marker {
      align-self: center;
    }
    .story-panel {
      display: grid;
      grid-template-columns: minmax(16rem, 0.7fr) minmax(0, 1.3fr);
      gap: 1rem;
      margin-bottom: 1rem;
      padding: clamp(1.2rem, 3cqi, 2rem);
      border-radius: 2rem;
      background: var(--clay);
    }
    .story-copy p {
      max-width: 42rem;
      margin-bottom: 0.7rem;
      line-height: 1.45;
    }
    .story-copy small {
      display: block;
      max-width: 38rem;
    }
    .story-panel ol {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.5rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .story-panel li button {
      display: grid;
      grid-template-columns: 1.5rem 1fr;
      gap: 0.15rem 0.45rem;
      align-items: center;
      width: 100%;
      min-height: 4.6rem;
      padding: 0.6rem;
      border: 1px solid var(--moss);
      border-radius: 1.1rem;
      background: var(--sand);
      text-align: left;
      line-height: 1.05;
    }
    .story-panel li button > span {
      display: grid;
      place-items: center;
      width: 1.5rem;
      aspect-ratio: 1;
      border-radius: 50%;
      color: var(--sand);
      background: var(--moss);
    }
    .story-panel li button small {
      grid-column: 2;
    }
    .story-panel li button.active {
      box-shadow: inset 0 0 0 0.18rem var(--moss);
      transform: translateY(-0.15rem);
    }
    .shell-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.75fr) minmax(18rem, 0.65fr);
      gap: 1rem;
    }
    .stage,
    .inspector,
    .provenance {
      min-width: 0;
      padding: clamp(1.2rem, 3cqi, 2rem);
      border-radius: 2rem;
    }
    .stage {
      background: var(--sage);
    }
    .inspector {
      background: var(--oat);
    }
    .section-heading {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      align-items: start;
    }
    .regime-toggle {
      display: flex;
      gap: 0.35rem;
    }
    .circuit-wrap {
      position: relative;
      min-height: clamp(30rem, 54cqi, 48rem);
      margin-top: 1rem;
      overflow: hidden;
      border-radius: 1.7rem;
      background: var(--sand);
    }
    .flow-layer,
    .sector-field {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }
    .flow-layer {
      z-index: 1;
      overflow: visible;
      pointer-events: none;
    }
    .flow-layer line {
      stroke-linecap: round;
    }
    .flow-layer circle {
      fill: var(--ochre);
      stroke: var(--moss);
      stroke-width: 0.35;
    }
    .sector-field {
      z-index: 2;
      pointer-events: none;
    }
    .sector {
      position: absolute;
      left: var(--x);
      top: var(--y);
      display: grid;
      justify-items: center;
      width: clamp(7rem, 15cqi, 11rem);
      padding: 0.45rem;
      border: 0;
      border-radius: 1.4rem;
      background: transparent;
      text-align: center;
      transform: translate(-50%, -50%);
      pointer-events: auto;
    }
    .sector > span {
      display: block;
      width: clamp(3.3rem, 7cqi, 5.5rem);
      aspect-ratio: 1;
      margin-bottom: 0.35rem;
      border: 0.28rem solid var(--sand);
      background: var(--moss);
      box-shadow: 0 0.35rem 0 color-mix(in srgb, var(--moss) 30%, transparent);
      transition: transform 400ms ease;
    }
    .sector:hover > span,
    .sector.focused > span,
    .sector[aria-pressed="true"] > span {
      transform: scale(1.13);
    }
    .sector.focused {
      background: var(--oat);
      animation: breathe 1.8s ease-in-out infinite alternate;
    }
    .sector strong {
      font-size: clamp(0.75rem, 1.5cqi, 1rem);
    }
    .sector small {
      max-width: 13ch;
      font-size: 0.65rem;
      line-height: 1.15;
    }
    .sector.households > span {
      border-radius: 70% 30% 55% 45%;
    }
    .sector.firms > span {
      border-radius: 22% 22% 42% 42%;
      background: var(--terracotta);
    }
    .sector.banks > span {
      border-radius: 45% 45% 25% 25%;
      background: var(--clay);
    }
    .sector.government > span {
      border-radius: 1.4rem 1.4rem 0.45rem 0.45rem;
      background: var(--ochre);
    }
    .sector.central-bank > span {
      border: 0.55rem solid var(--moss);
      border-radius: 50%;
      background: transparent;
      box-shadow: none;
    }
    .sector.foreign > span {
      border-radius: 35% 65% 60% 40%;
      background: var(--terracotta);
      transform: rotate(-12deg);
    }
    .sector.foreign:hover > span,
    .sector.foreign.focused > span {
      transform: rotate(-12deg) scale(1.13);
    }
    .cpi-orbit {
      position: absolute;
      z-index: 3;
      left: 49%;
      top: 50%;
      display: grid;
      place-items: center;
      width: clamp(5rem, 10cqi, 7rem);
      aspect-ratio: 1;
      border: 0.45rem solid var(--ochre);
      border-radius: 50%;
      background: var(--sand);
      transform: translate(-50%, -50%);
    }
    .cpi-orbit span {
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 0.08em;
    }
    .cpi-orbit strong {
      font-size: clamp(1rem, 2.2cqi, 1.5rem);
    }
    .flow-table {
      margin-top: 1rem;
    }
    summary {
      cursor: pointer;
      font-weight: 750;
    }
    table {
      width: 100%;
      margin-top: 0.75rem;
      border-collapse: collapse;
      font-size: 0.75rem;
    }
    th,
    td {
      padding: 0.45rem;
      border-bottom: 1px solid var(--moss);
      text-align: left;
      vertical-align: top;
    }
    .instruction {
      line-height: 1.45;
    }
    .inspection-card {
      padding: 0.9rem;
      border-radius: 1.2rem;
      background: var(--sand);
    }
    .inspection-card h3 {
      margin-top: 0;
      text-transform: capitalize;
    }
    dl {
      margin: 0.7rem 0;
    }
    dl div {
      display: grid;
      grid-template-columns: minmax(6rem, 0.8fr) minmax(0, 1fr);
      gap: 0.6rem;
      padding: 0.4rem 0;
      border-bottom: 1px solid var(--clay);
    }
    dt {
      font-size: 0.74rem;
      font-weight: 750;
    }
    dd {
      min-width: 0;
      margin: 0;
      overflow-wrap: anywhere;
      font-size: 0.78rem;
      font-variant-numeric: tabular-nums;
    }
    .agent-list {
      display: grid;
      gap: 0.35rem;
    }
    .agent-list button,
    .event-list button {
      display: grid;
      gap: 0.15rem;
      width: 100%;
      padding: 0.55rem 0.65rem;
      border: 1px solid var(--moss);
      border-radius: 0.9rem;
      background: transparent;
      text-align: left;
      text-transform: capitalize;
    }
    .agent-list button[aria-pressed="true"] {
      color: var(--sand);
      background: var(--moss);
    }
    .agent-list small,
    .event-list small {
      overflow-wrap: anywhere;
      font-size: 0.65rem;
      text-transform: none;
    }
    .event-list {
      display: grid;
      gap: 0.4rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .event-list button {
      background: var(--sand);
    }
    .metric-strip {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 0.7rem;
      margin-top: 1rem;
    }
    .metric-strip > div {
      display: grid;
      gap: 0.2rem;
      min-width: 0;
      padding: 1rem;
      border-radius: 1.35rem;
      background: var(--clay);
    }
    .metric-strip span,
    .metric-strip small {
      font-size: 0.7rem;
    }
    .metric-strip strong {
      overflow-wrap: anywhere;
      font-size: clamp(1rem, 2cqi, 1.5rem);
      font-variant-numeric: tabular-nums;
    }
    .comparison {
      display: grid;
      gap: 1rem;
    }
    .compare-heading,
    .chart-heading,
    .run-heading {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      align-items: start;
    }
    .compare-heading {
      padding: clamp(1.2rem, 3cqi, 2rem);
      border-radius: 2rem;
      background: var(--clay);
    }
    .compare-heading p:not(.eyebrow) {
      max-width: 48rem;
      margin-bottom: 0;
      line-height: 1.45;
    }
    .laboratory {
      display: grid;
      gap: 1rem;
      padding: clamp(1rem, 2.5cqi, 1.7rem);
      border: 1px solid var(--line);
      border-radius: 2rem;
      background: var(--oat);
    }
    .laboratory form {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
      gap: 0.75rem;
    }
    .laboratory label {
      display: grid;
      gap: 0.3rem;
      color: var(--moss-dark);
      font-size: 0.78rem;
      font-weight: 700;
    }
    .laboratory input,
    .laboratory select {
      min-width: 0;
      padding: 0.65rem;
      border: 1px solid var(--line);
      border-radius: 0.7rem;
      background: var(--sand);
      color: var(--ink);
      font: inherit;
      font-variant-numeric: tabular-nums;
    }
    .laboratory-actions,
    .laboratory-status {
      grid-column: 1 / -1;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.65rem;
    }
    .laboratory-status {
      padding: 0.8rem;
      border-radius: 0.8rem;
      background: var(--sage);
    }
    .laboratory-status strong {
      text-transform: capitalize;
    }
    .laboratory-status progress {
      width: min(14rem, 100%);
      accent-color: var(--clay);
    }
    .view-toggle {
      display: flex;
      flex: 0 0 auto;
      gap: 0.35rem;
    }
    .view-toggle button {
      min-height: 2.65rem;
      padding: 0.55rem 0.85rem;
      border: 1px solid var(--moss);
      border-radius: 1rem;
      background: var(--sand);
      font-weight: 700;
    }
    .view-toggle button[aria-pressed="true"] {
      color: var(--sand);
      background: var(--moss);
    }
    .paired-scenes {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }
    .paired-scenes.nominal,
    .paired-scenes.indexed {
      grid-template-columns: 1fr;
    }
    .run-panel,
    .chart-panel,
    .cohort-panel,
    .matching-panel {
      min-width: 0;
      padding: clamp(1rem, 2.5cqi, 1.7rem);
      border-radius: 2rem;
    }
    .run-panel.nominal {
      background: var(--sage);
    }
    .run-panel.indexed {
      background: var(--oat);
    }
    .run-heading > div {
      display: grid;
    }
    .run-heading span {
      font-size: 0.72rem;
      font-weight: 750;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .run-heading strong {
      font-size: clamp(1.45rem, 3cqi, 2.25rem);
      font-variant-numeric: tabular-nums;
    }
    .run-heading small {
      max-width: 18rem;
      overflow-wrap: anywhere;
      text-align: right;
    }
    .camera-label {
      margin: 0.8rem 0 0.45rem;
      font-size: 0.75rem;
      font-weight: 700;
    }
    .sector-comparison {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.45rem;
    }
    .sector-comparison button {
      display: grid;
      gap: 0.25rem;
      min-width: 0;
      min-height: 6rem;
      padding: 0.65rem;
      border: 1px solid var(--moss);
      border-radius: 1.2rem;
      background: var(--sand);
      text-align: left;
    }
    .sector-comparison button[aria-pressed="true"] {
      box-shadow: inset 0 0 0 0.2rem var(--moss);
      transform: scale(1.02);
    }
    .sector-comparison span,
    .sector-comparison small {
      font-size: 0.68rem;
    }
    .sector-comparison strong {
      overflow-wrap: anywhere;
      font-size: clamp(0.78rem, 1.4cqi, 1rem);
      font-variant-numeric: tabular-nums;
    }
    .chart-panel {
      background: var(--sage);
    }
    .chart-heading label,
    .cohort-controls label {
      display: grid;
      gap: 0.2rem;
      font-size: 0.7rem;
      font-weight: 700;
    }
    .chart-heading select,
    .cohort-controls select {
      min-height: 2.5rem;
      padding: 0.35rem 0.55rem;
      border: 1px solid var(--moss);
      border-radius: 0.85rem;
      color: var(--moss);
      background: var(--sand);
    }
    .paired-chart {
      margin-top: 0.8rem;
      padding: 0.6rem;
      border-radius: 1.5rem;
      background: var(--sand);
    }
    .paired-chart svg {
      display: block;
      width: 100%;
      height: clamp(12rem, 26cqi, 21rem);
      overflow: visible;
    }
    .paired-chart path,
    .paired-chart line {
      vector-effect: non-scaling-stroke;
    }
    .chart-axis {
      stroke: var(--moss);
      stroke-width: 1;
      opacity: 0.45;
    }
    .nominal-line,
    .indexed-line {
      fill: none;
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .nominal-line {
      stroke: var(--moss);
    }
    .indexed-line {
      stroke: var(--terracotta);
      stroke-dasharray: 8 5;
    }
    .shared-cursor {
      stroke: var(--ochre);
      stroke-width: 3;
    }
    .chart-legend {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem 1rem;
      padding: 0.4rem 0.3rem 0;
      font-size: 0.72rem;
      font-weight: 700;
    }
    .chart-legend span:last-child {
      margin-left: auto;
    }
    .difference-readout {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.55rem;
      margin-top: 0.65rem;
    }
    .difference-readout > div {
      display: grid;
      gap: 0.15rem;
      padding: 0.75rem;
      border-radius: 1rem;
      background: var(--sand);
    }
    .difference-readout .difference {
      background: var(--oat);
    }
    .difference-readout span,
    .difference-readout small {
      font-size: 0.68rem;
    }
    .difference-readout strong {
      overflow-wrap: anywhere;
      font-size: clamp(1rem, 2cqi, 1.45rem);
      font-variant-numeric: tabular-nums;
    }
    .comparison-detail-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.5fr) minmax(16rem, 0.5fr);
      gap: 1rem;
    }
    .cohort-panel {
      background: var(--clay);
    }
    .matching-panel {
      background: var(--oat);
    }
    .cohort-controls {
      display: flex;
      flex-wrap: wrap;
      gap: 0.55rem;
    }
    .cohort-table-wrap {
      overflow-x: auto;
    }
    .cohort-table-wrap td:not(:first-child) {
      font-variant-numeric: tabular-nums;
    }
    .cohort-table-wrap td:first-child {
      text-transform: capitalize;
    }
    .baseline-note,
    .matching-panel > p:not(.eyebrow),
    .match-result p {
      margin: 0.75rem 0 0;
      font-size: 0.78rem;
      line-height: 1.4;
    }
    .match-result {
      margin-top: 0.75rem;
      padding: 0.8rem;
      border-radius: 1rem;
      background: var(--sand);
    }
    .provenance {
      margin-top: 1rem;
      background: var(--oat);
    }

    /* Industrial host integration: flat ruled panels and one signal color. */
    .frame
      :is(
        button,
        select,
        input,
        .state,
        .fallback,
        .month-ribbon,
        .marker-row button,
        .story-panel,
        .story-panel li button,
        .story-panel li button > span,
        .stage,
        .inspector,
        .provenance,
        .circuit-wrap,
        .sector,
        .sector > span,
        .cpi-orbit,
        .inspection-card,
        .agent-list button,
        .event-list button,
        .metric-strip > div,
        .compare-heading,
        .laboratory,
        .laboratory-status,
        .run-panel,
        .chart-panel,
        .cohort-panel,
        .matching-panel,
        .sector-comparison button,
        .paired-chart,
        .difference-readout > div,
        .match-result
      ) {
      border-radius: 0;
      box-shadow: none;
    }
    .mode-tabs button,
    .regime-toggle button,
    .view-toggle button,
    .playback-controls button,
    .story-panel li button,
    .agent-list button,
    .event-list button,
    .sector-comparison button,
    .chart-heading select,
    .cohort-controls select,
    .laboratory input,
    .laboratory select {
      border-color: var(--ec-rule);
      color: var(--ec-fg);
      background: var(--ec-bg);
    }
    .mode-tabs button.active,
    .regime-toggle button[aria-pressed="true"],
    .view-toggle button[aria-pressed="true"],
    .agent-list button[aria-pressed="true"] {
      border-color: var(--ec-signal);
      color: var(--ec-bg);
      background: var(--ec-signal);
    }
    .mode-tabs > span {
      border: 1px solid var(--ec-rule);
      border-radius: 0;
      color: var(--ec-muted);
      background: transparent;
    }
    .month-ribbon {
      border: 1px solid var(--ec-rule);
      color: var(--ec-fg);
      background: var(--ec-panel);
    }
    .month-copy span,
    .range-labels,
    .playback-controls label {
      color: var(--ec-muted);
    }
    .month-copy strong,
    .metric-strip strong,
    .difference-readout strong,
    .run-heading strong {
      color: var(--ec-signal);
    }
    .playback-controls button {
      border-color: var(--ec-rule);
      color: var(--ec-fg);
    }
    .playback-controls .primary {
      border-color: var(--ec-signal);
      color: var(--ec-bg);
      background: var(--ec-signal);
    }
    .playback-controls select {
      border: 1px solid var(--ec-rule);
      color: var(--ec-fg);
      background: var(--ec-bg);
    }
    .marker-row {
      border-inline: 1px solid var(--ec-rule);
      border-bottom: 1px solid var(--ec-rule);
    }
    .marker-row button {
      border: 1px solid var(--ec-rule);
      color: var(--ec-muted);
      background: var(--ec-bg);
    }
    .story-panel,
    .stage,
    .inspector,
    .compare-heading,
    .laboratory,
    .run-panel,
    .chart-panel,
    .cohort-panel,
    .matching-panel,
    .provenance,
    .metric-strip > div {
      border: 1px solid var(--ec-rule);
      background: var(--ec-panel);
    }
    .story-panel li button.active,
    .sector-comparison button[aria-pressed="true"] {
      border-color: var(--ec-signal);
      box-shadow: inset 3px 0 0 var(--ec-signal);
      transform: none;
    }
    .story-panel li button > span {
      border: 1px solid var(--ec-rule);
      color: var(--ec-muted);
      background: var(--ec-bg);
    }
    .story-panel li button.active > span {
      border-color: var(--ec-signal);
      color: var(--ec-signal);
    }
    .circuit-wrap,
    .paired-chart,
    .inspection-card,
    .event-list button,
    .difference-readout > div,
    .match-result {
      border: 1px solid var(--ec-rule);
      background: var(--ec-bg);
    }
    .sector {
      background: transparent;
      animation: none;
    }
    .sector > span,
    .sector.firms > span,
    .sector.banks > span,
    .sector.government > span,
    .sector.central-bank > span,
    .sector.foreign > span {
      border: 1px solid var(--ec-rule);
      border-radius: 0;
      background: var(--ec-panel-strong);
      box-shadow: none;
      transform: none;
    }
    .sector:hover > span,
    .sector.focused > span,
    .sector[aria-pressed="true"] > span,
    .sector.foreign:hover > span,
    .sector.foreign.focused > span {
      border-color: var(--ec-signal);
      transform: none;
    }
    .sector.focused {
      color: var(--ec-signal);
      background: transparent;
    }
    .cpi-orbit {
      border: 1px solid var(--ec-signal);
      border-radius: 0;
      color: var(--ec-signal);
      background: var(--ec-bg);
    }
    th,
    td,
    dl div {
      border-color: var(--ec-rule);
    }
    .chart-axis {
      stroke: var(--ec-rule);
      opacity: 1;
    }
    .nominal-line {
      stroke: var(--ec-fg);
    }
    .indexed-line,
    .shared-cursor {
      stroke: var(--ec-signal);
    }
    :is(small, .instruction, .quiet-marker, .baseline-note) {
      color: var(--ec-muted);
    }
    @keyframes breathe {
      to {
        transform: scale(1.04) rotate(2deg);
      }
    }
    @container (max-width: 800px) {
      .masthead,
      .shell-grid,
      .story-panel,
      .comparison-detail-grid {
        grid-template-columns: 1fr;
      }
      .month-ribbon {
        grid-template-columns: 1fr;
      }
      .story-panel ol {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .metric-strip {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .circuit-wrap {
        min-height: 34rem;
      }
    }
    @container (max-width: 480px) {
      .frame {
        padding: 0.75rem;
      }
      .masthead {
        margin-bottom: 1.5rem;
      }
      h1 {
        font-size: clamp(1.35rem, 8cqi, 2.2rem);
      }
      .mode-tabs {
        flex-wrap: wrap;
      }
      .mode-tabs > span {
        margin-left: 0;
      }
      .playback-controls {
        flex-wrap: wrap;
      }
      .compare-heading,
      .chart-heading,
      .run-heading {
        display: grid;
      }
      .view-toggle {
        flex-wrap: wrap;
      }
      .paired-scenes,
      .difference-readout {
        grid-template-columns: 1fr;
      }
      .sector-comparison {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .run-heading small {
        text-align: left;
      }
      .story-panel ol,
      .metric-strip {
        grid-template-columns: 1fr;
      }
      .section-heading {
        display: grid;
      }
      .circuit-wrap {
        min-height: 39rem;
      }
      .sector {
        width: 6.2rem;
      }
      .sector small {
        display: none;
      }
      .cpi-orbit {
        left: 50%;
      }
      .state,
      .state.error {
        grid-template-columns: 1fr;
      }
      .flow-table {
        overflow-x: auto;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        scroll-behavior: auto !important;
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001ms !important;
      }
    }
    [data-motion="reduced"] .seed,
    [data-motion="reduced"] .sector.focused {
      animation: none;
    }
  `;
$([
  ve({ type: String })
], x.prototype, "src", 2);
$([
  ve({ type: String, attribute: "initial-month" })
], x.prototype, "initialMonth", 2);
$([
  ve({ type: Boolean, attribute: "static" })
], x.prototype, "staticMode", 2);
$([
  ve({ type: String, attribute: "api-base" })
], x.prototype, "apiBase", 2);
$([
  A()
], x.prototype, "status", 2);
$([
  A()
], x.prototype, "replay", 2);
$([
  A()
], x.prototype, "message", 2);
$([
  A()
], x.prototype, "revision", 2);
$([
  A()
], x.prototype, "reducedMotion", 2);
$([
  A()
], x.prototype, "mode", 2);
$([
  ve({ type: String, attribute: "initial-mode" })
], x.prototype, "initialMode", 2);
$([
  A()
], x.prototype, "playing", 2);
$([
  A()
], x.prototype, "speed", 2);
$([
  A()
], x.prototype, "storyIndex", 2);
$([
  A()
], x.prototype, "activeRegime", 2);
$([
  A()
], x.prototype, "comparisonView", 2);
$([
  A()
], x.prototype, "selectedMetric", 2);
$([
  A()
], x.prototype, "cohortDimension", 2);
$([
  A()
], x.prototype, "cohortMeasure", 2);
$([
  A()
], x.prototype, "cameraSector", 2);
$([
  A()
], x.prototype, "visible", 2);
$([
  A()
], x.prototype, "laboratoryStatus", 2);
$([
  A()
], x.prototype, "laboratoryProgress", 2);
$([
  A()
], x.prototype, "laboratoryMessage", 2);
$([
  A()
], x.prototype, "customReplay", 2);
x = $([
  Ml("ecodeling-experience")
], x);
export {
  x as EcodelingExperience,
  j as ReplayLoadError,
  Tl as ReplayState,
  zr as loadReplay
};
