function Kt(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Xr(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Ln(t) {
  let e, n, r;
  t.length !== 2 ? (e = Kt, n = (o, c) => Kt(t(o), c), r = (o, c) => t(o) - c) : (e = t === Kt || t === Xr ? t : Kr, n = t, r = t);
  function i(o, c, l = 0, u = o.length) {
    if (l < u) {
      if (e(c, c) !== 0) return u;
      do {
        const h = l + u >>> 1;
        n(o[h], c) < 0 ? l = h + 1 : u = h;
      } while (l < u);
    }
    return l;
  }
  function s(o, c, l = 0, u = o.length) {
    if (l < u) {
      if (e(c, c) !== 0) return u;
      do {
        const h = l + u >>> 1;
        n(o[h], c) <= 0 ? l = h + 1 : u = h;
      } while (l < u);
    }
    return l;
  }
  function a(o, c, l = 0, u = o.length) {
    const h = i(o, c, l, u - 1);
    return h > l && r(o[h - 1], c) > -r(o[h], c) ? h - 1 : h;
  }
  return { left: i, center: a, right: s };
}
function Kr() {
  return 0;
}
function Wr(t) {
  return t === null ? NaN : +t;
}
const Yr = Ln(Kt), Gr = Yr.right;
Ln(Wr).center;
const Jr = Math.sqrt(50), Zr = Math.sqrt(10), Qr = Math.sqrt(2);
function jt(t, e, n) {
  const r = (e - t) / Math.max(0, n), i = Math.floor(Math.log10(r)), s = r / Math.pow(10, i), a = s >= Jr ? 10 : s >= Zr ? 5 : s >= Qr ? 2 : 1;
  let o, c, l;
  return i < 0 ? (l = Math.pow(10, -i) / a, o = Math.round(t * l), c = Math.round(e * l), o / l < t && ++o, c / l > e && --c, l = -l) : (l = Math.pow(10, i) * a, o = Math.round(t / l), c = Math.round(e / l), o * l < t && ++o, c * l > e && --c), c < o && 0.5 <= n && n < 2 ? jt(t, e, n * 2) : [o, c, l];
}
function jr(t, e, n) {
  if (e = +e, t = +t, n = +n, !(n > 0)) return [];
  if (t === e) return [t];
  const r = e < t, [i, s, a] = r ? jt(e, t, n) : jt(t, e, n);
  if (!(s >= i)) return [];
  const o = s - i + 1, c = new Array(o);
  if (r)
    if (a < 0) for (let l = 0; l < o; ++l) c[l] = (s - l) / -a;
    else for (let l = 0; l < o; ++l) c[l] = (s - l) * a;
  else if (a < 0) for (let l = 0; l < o; ++l) c[l] = (i + l) / -a;
  else for (let l = 0; l < o; ++l) c[l] = (i + l) * a;
  return c;
}
function we(t, e, n) {
  return e = +e, t = +t, n = +n, jt(t, e, n)[2];
}
function ti(t, e, n) {
  e = +e, t = +t, n = +n;
  const r = e < t, i = r ? we(e, t, n) : we(t, e, n);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
var ei = { value: () => {
} };
function Dn() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new Wt(n);
}
function Wt(t) {
  this._ = t;
}
function ni(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
Wt.prototype = Dn.prototype = {
  constructor: Wt,
  on: function(t, e) {
    var n = this._, r = ni(t + "", n), i, s = -1, a = r.length;
    if (arguments.length < 2) {
      for (; ++s < a; ) if ((i = (t = r[s]).type) && (i = ri(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++s < a; )
      if (i = (t = r[s]).type) n[i] = en(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = en(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new Wt(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0) for (var n = new Array(i), r = 0, i, s; r < i; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (s = this._[t], r = 0, i = s.length; r < i; ++r) s[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, s = r.length; i < s; ++i) r[i].value.apply(e, n);
  }
};
function ri(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function en(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = ei, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var xe = "http://www.w3.org/1999/xhtml";
const nn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xe,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function de(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), nn.hasOwnProperty(e) ? { space: nn[e], local: t } : t;
}
function ii(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === xe && e.documentElement.namespaceURI === xe ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function si(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Hn(t) {
  var e = de(t);
  return (e.local ? si : ii)(e);
}
function ai() {
}
function Te(t) {
  return t == null ? ai : function() {
    return this.querySelector(t);
  };
}
function oi(t) {
  typeof t != "function" && (t = Te(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], a = s.length, o = r[i] = new Array(a), c, l, u = 0; u < a; ++u)
      (c = s[u]) && (l = t.call(c, c.__data__, u, s)) && ("__data__" in c && (l.__data__ = c.__data__), o[u] = l);
  return new P(r, this._parents);
}
function li(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function ci() {
  return [];
}
function Un(t) {
  return t == null ? ci : function() {
    return this.querySelectorAll(t);
  };
}
function ui(t) {
  return function() {
    return li(t.apply(this, arguments));
  };
}
function hi(t) {
  typeof t == "function" ? t = ui(t) : t = Un(t);
  for (var e = this._groups, n = e.length, r = [], i = [], s = 0; s < n; ++s)
    for (var a = e[s], o = a.length, c, l = 0; l < o; ++l)
      (c = a[l]) && (r.push(t.call(c, c.__data__, l, a)), i.push(c));
  return new P(r, i);
}
function Fn(t) {
  return function() {
    return this.matches(t);
  };
}
function Bn(t) {
  return function(e) {
    return e.matches(t);
  };
}
var di = Array.prototype.find;
function fi(t) {
  return function() {
    return di.call(this.children, t);
  };
}
function pi() {
  return this.firstElementChild;
}
function mi(t) {
  return this.select(t == null ? pi : fi(typeof t == "function" ? t : Bn(t)));
}
var gi = Array.prototype.filter;
function yi() {
  return Array.from(this.children);
}
function vi(t) {
  return function() {
    return gi.call(this.children, t);
  };
}
function bi(t) {
  return this.selectAll(t == null ? yi : vi(typeof t == "function" ? t : Bn(t)));
}
function _i(t) {
  typeof t != "function" && (t = Fn(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], a = s.length, o = r[i] = [], c, l = 0; l < a; ++l)
      (c = s[l]) && t.call(c, c.__data__, l, s) && o.push(c);
  return new P(r, this._parents);
}
function Vn(t) {
  return new Array(t.length);
}
function wi() {
  return new P(this._enter || this._groups.map(Vn), this._parents);
}
function te(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
te.prototype = {
  constructor: te,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function xi(t) {
  return function() {
    return t;
  };
}
function $i(t, e, n, r, i, s) {
  for (var a = 0, o, c = e.length, l = s.length; a < l; ++a)
    (o = e[a]) ? (o.__data__ = s[a], r[a] = o) : n[a] = new te(t, s[a]);
  for (; a < c; ++a)
    (o = e[a]) && (i[a] = o);
}
function ki(t, e, n, r, i, s, a) {
  var o, c, l = /* @__PURE__ */ new Map(), u = e.length, h = s.length, d = new Array(u), f;
  for (o = 0; o < u; ++o)
    (c = e[o]) && (d[o] = f = a.call(c, c.__data__, o, e) + "", l.has(f) ? i[o] = c : l.set(f, c));
  for (o = 0; o < h; ++o)
    f = a.call(t, s[o], o, s) + "", (c = l.get(f)) ? (r[o] = c, c.__data__ = s[o], l.delete(f)) : n[o] = new te(t, s[o]);
  for (o = 0; o < u; ++o)
    (c = e[o]) && l.get(d[o]) === c && (i[o] = c);
}
function Si(t) {
  return t.__data__;
}
function Ai(t, e) {
  if (!arguments.length) return Array.from(this, Si);
  var n = e ? ki : $i, r = this._parents, i = this._groups;
  typeof t != "function" && (t = xi(t));
  for (var s = i.length, a = new Array(s), o = new Array(s), c = new Array(s), l = 0; l < s; ++l) {
    var u = r[l], h = i[l], d = h.length, f = Mi(t.call(u, u && u.__data__, l, r)), g = f.length, v = o[l] = new Array(g), A = a[l] = new Array(g), rt = c[l] = new Array(d);
    n(u, h, v, A, rt, f, e);
    for (var H = 0, X = 0, q, gt; H < g; ++H)
      if (q = v[H]) {
        for (H >= X && (X = H + 1); !(gt = A[X]) && ++X < g; ) ;
        q._next = gt || null;
      }
  }
  return a = new P(a, r), a._enter = o, a._exit = c, a;
}
function Mi(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function Ei() {
  return new P(this._exit || this._groups.map(Vn), this._parents);
}
function Ci(t, e, n) {
  var r = this.enter(), i = this, s = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? s.remove() : n(s), r && i ? r.merge(i).order() : i;
}
function Ni(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, s = r.length, a = Math.min(i, s), o = new Array(i), c = 0; c < a; ++c)
    for (var l = n[c], u = r[c], h = l.length, d = o[c] = new Array(h), f, g = 0; g < h; ++g)
      (f = l[g] || u[g]) && (d[g] = f);
  for (; c < i; ++c)
    o[c] = n[c];
  return new P(o, this._parents);
}
function Ri() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, s = r[i], a; --i >= 0; )
      (a = r[i]) && (s && a.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(a, s), s = a);
  return this;
}
function Ii(t) {
  t || (t = Pi);
  function e(h, d) {
    return h && d ? t(h.__data__, d.__data__) : !h - !d;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), s = 0; s < r; ++s) {
    for (var a = n[s], o = a.length, c = i[s] = new Array(o), l, u = 0; u < o; ++u)
      (l = a[u]) && (c[u] = l);
    c.sort(e);
  }
  return new P(i, this._parents).order();
}
function Pi(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Ti() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function qi() {
  return Array.from(this);
}
function Oi() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length; i < s; ++i) {
      var a = r[i];
      if (a) return a;
    }
  return null;
}
function zi() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function Li() {
  return !this.node();
}
function Di(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], s = 0, a = i.length, o; s < a; ++s)
      (o = i[s]) && t.call(o, o.__data__, s, i);
  return this;
}
function Hi(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Ui(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Fi(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Bi(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Vi(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Xi(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Ki(t, e) {
  var n = de(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Ui : Hi : typeof e == "function" ? n.local ? Xi : Vi : n.local ? Bi : Fi)(n, e));
}
function Xn(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Wi(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Yi(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Gi(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function Ji(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Wi : typeof e == "function" ? Gi : Yi)(t, e, n ?? "")) : ut(this.node(), t);
}
function ut(t, e) {
  return t.style.getPropertyValue(e) || Xn(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Zi(t) {
  return function() {
    delete this[t];
  };
}
function Qi(t, e) {
  return function() {
    this[t] = e;
  };
}
function ji(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function ts(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Zi : typeof e == "function" ? ji : Qi)(t, e)) : this.node()[t];
}
function Kn(t) {
  return t.trim().split(/^|\s+/);
}
function qe(t) {
  return t.classList || new Wn(t);
}
function Wn(t) {
  this._node = t, this._names = Kn(t.getAttribute("class") || "");
}
Wn.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function Yn(t, e) {
  for (var n = qe(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function Gn(t, e) {
  for (var n = qe(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function es(t) {
  return function() {
    Yn(this, t);
  };
}
function ns(t) {
  return function() {
    Gn(this, t);
  };
}
function rs(t, e) {
  return function() {
    (e.apply(this, arguments) ? Yn : Gn)(this, t);
  };
}
function is(t, e) {
  var n = Kn(t + "");
  if (arguments.length < 2) {
    for (var r = qe(this.node()), i = -1, s = n.length; ++i < s; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? rs : e ? es : ns)(n, e));
}
function ss() {
  this.textContent = "";
}
function as(t) {
  return function() {
    this.textContent = t;
  };
}
function os(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function ls(t) {
  return arguments.length ? this.each(t == null ? ss : (typeof t == "function" ? os : as)(t)) : this.node().textContent;
}
function cs() {
  this.innerHTML = "";
}
function us(t) {
  return function() {
    this.innerHTML = t;
  };
}
function hs(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function ds(t) {
  return arguments.length ? this.each(t == null ? cs : (typeof t == "function" ? hs : us)(t)) : this.node().innerHTML;
}
function fs() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function ps() {
  return this.each(fs);
}
function ms() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function gs() {
  return this.each(ms);
}
function ys(t) {
  var e = typeof t == "function" ? t : Hn(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function vs() {
  return null;
}
function bs(t, e) {
  var n = typeof t == "function" ? t : Hn(t), r = e == null ? vs : typeof e == "function" ? e : Te(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function _s() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function ws() {
  return this.each(_s);
}
function xs() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function $s() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function ks(t) {
  return this.select(t ? $s : xs);
}
function Ss(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function As(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function Ms(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function Es(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, s; n < i; ++n)
        s = e[n], (!t.type || s.type === t.type) && s.name === t.name ? this.removeEventListener(s.type, s.listener, s.options) : e[++r] = s;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function Cs(t, e, n) {
  return function() {
    var r = this.__on, i, s = As(e);
    if (r) {
      for (var a = 0, o = r.length; a < o; ++a)
        if ((i = r[a]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = s, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, s, n), i = { type: t.type, name: t.name, value: e, listener: s, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function Ns(t, e, n) {
  var r = Ms(t + ""), i, s = r.length, a;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var c = 0, l = o.length, u; c < l; ++c)
        for (i = 0, u = o[c]; i < s; ++i)
          if ((a = r[i]).type === u.type && a.name === u.name)
            return u.value;
    }
    return;
  }
  for (o = e ? Cs : Es, i = 0; i < s; ++i) this.each(o(r[i], e, n));
  return this;
}
function Jn(t, e, n) {
  var r = Xn(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function Rs(t, e) {
  return function() {
    return Jn(this, t, e);
  };
}
function Is(t, e) {
  return function() {
    return Jn(this, t, e.apply(this, arguments));
  };
}
function Ps(t, e) {
  return this.each((typeof e == "function" ? Is : Rs)(t, e));
}
function* Ts() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, s = r.length, a; i < s; ++i)
      (a = r[i]) && (yield a);
}
var qs = [null];
function P(t, e) {
  this._groups = t, this._parents = e;
}
function Pt() {
  return new P([[document.documentElement]], qs);
}
function Os() {
  return this;
}
P.prototype = Pt.prototype = {
  constructor: P,
  select: oi,
  selectAll: hi,
  selectChild: mi,
  selectChildren: bi,
  filter: _i,
  data: Ai,
  enter: wi,
  exit: Ei,
  join: Ci,
  merge: Ni,
  selection: Os,
  order: Ri,
  sort: Ii,
  call: Ti,
  nodes: qi,
  node: Oi,
  size: zi,
  empty: Li,
  each: Di,
  attr: Ki,
  style: Ji,
  property: ts,
  classed: is,
  text: ls,
  html: ds,
  raise: ps,
  lower: gs,
  append: ys,
  insert: bs,
  remove: ws,
  clone: ks,
  datum: Ss,
  on: Ns,
  dispatch: Ps,
  [Symbol.iterator]: Ts
};
function Oe(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function Zn(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function Tt() {
}
var St = 0.7, ee = 1 / St, ot = "\\s*([+-]?\\d+)\\s*", At = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", L = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", zs = /^#([0-9a-f]{3,8})$/, Ls = new RegExp(`^rgb\\(${ot},${ot},${ot}\\)$`), Ds = new RegExp(`^rgb\\(${L},${L},${L}\\)$`), Hs = new RegExp(`^rgba\\(${ot},${ot},${ot},${At}\\)$`), Us = new RegExp(`^rgba\\(${L},${L},${L},${At}\\)$`), Fs = new RegExp(`^hsl\\(${At},${L},${L}\\)$`), Bs = new RegExp(`^hsla\\(${At},${L},${L},${At}\\)$`), rn = {
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
Oe(Tt, tt, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: sn,
  // Deprecated! Use color.formatHex.
  formatHex: sn,
  formatHex8: Vs,
  formatHsl: Xs,
  formatRgb: an,
  toString: an
});
function sn() {
  return this.rgb().formatHex();
}
function Vs() {
  return this.rgb().formatHex8();
}
function Xs() {
  return Qn(this).formatHsl();
}
function an() {
  return this.rgb().formatRgb();
}
function tt(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = zs.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? on(e) : n === 3 ? new M(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? Ht(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? Ht(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Ls.exec(t)) ? new M(e[1], e[2], e[3], 1) : (e = Ds.exec(t)) ? new M(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Hs.exec(t)) ? Ht(e[1], e[2], e[3], e[4]) : (e = Us.exec(t)) ? Ht(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Fs.exec(t)) ? un(e[1], e[2] / 100, e[3] / 100, 1) : (e = Bs.exec(t)) ? un(e[1], e[2] / 100, e[3] / 100, e[4]) : rn.hasOwnProperty(t) ? on(rn[t]) : t === "transparent" ? new M(NaN, NaN, NaN, 0) : null;
}
function on(t) {
  return new M(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function Ht(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new M(t, e, n, r);
}
function Ks(t) {
  return t instanceof Tt || (t = tt(t)), t ? (t = t.rgb(), new M(t.r, t.g, t.b, t.opacity)) : new M();
}
function $e(t, e, n, r) {
  return arguments.length === 1 ? Ks(t) : new M(t, e, n, r ?? 1);
}
function M(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
Oe(M, $e, Zn(Tt, {
  brighter(t) {
    return t = t == null ? ee : Math.pow(ee, t), new M(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? St : Math.pow(St, t), new M(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new M(j(this.r), j(this.g), j(this.b), ne(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: ln,
  // Deprecated! Use color.formatHex.
  formatHex: ln,
  formatHex8: Ws,
  formatRgb: cn,
  toString: cn
}));
function ln() {
  return `#${Z(this.r)}${Z(this.g)}${Z(this.b)}`;
}
function Ws() {
  return `#${Z(this.r)}${Z(this.g)}${Z(this.b)}${Z((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function cn() {
  const t = ne(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${j(this.r)}, ${j(this.g)}, ${j(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function ne(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function j(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function Z(t) {
  return t = j(t), (t < 16 ? "0" : "") + t.toString(16);
}
function un(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new I(t, e, n, r);
}
function Qn(t) {
  if (t instanceof I) return new I(t.h, t.s, t.l, t.opacity);
  if (t instanceof Tt || (t = tt(t)), !t) return new I();
  if (t instanceof I) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), s = Math.max(e, n, r), a = NaN, o = s - i, c = (s + i) / 2;
  return o ? (e === s ? a = (n - r) / o + (n < r) * 6 : n === s ? a = (r - e) / o + 2 : a = (e - n) / o + 4, o /= c < 0.5 ? s + i : 2 - s - i, a *= 60) : o = c > 0 && c < 1 ? 0 : a, new I(a, o, c, t.opacity);
}
function Ys(t, e, n, r) {
  return arguments.length === 1 ? Qn(t) : new I(t, e, n, r ?? 1);
}
function I(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
Oe(I, Ys, Zn(Tt, {
  brighter(t) {
    return t = t == null ? ee : Math.pow(ee, t), new I(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? St : Math.pow(St, t), new I(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new M(
      ve(t >= 240 ? t - 240 : t + 120, i, r),
      ve(t, i, r),
      ve(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new I(hn(this.h), Ut(this.s), Ut(this.l), ne(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = ne(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${hn(this.h)}, ${Ut(this.s) * 100}%, ${Ut(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function hn(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function Ut(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function ve(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
const ze = (t) => () => t;
function Gs(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function Js(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function Zs(t) {
  return (t = +t) == 1 ? jn : function(e, n) {
    return n - e ? Js(e, n, t) : ze(isNaN(e) ? n : e);
  };
}
function jn(t, e) {
  var n = e - t;
  return n ? Gs(t, n) : ze(isNaN(t) ? e : t);
}
const re = (function t(e) {
  var n = Zs(e);
  function r(i, s) {
    var a = n((i = $e(i)).r, (s = $e(s)).r), o = n(i.g, s.g), c = n(i.b, s.b), l = jn(i.opacity, s.opacity);
    return function(u) {
      return i.r = a(u), i.g = o(u), i.b = c(u), i.opacity = l(u), i + "";
    };
  }
  return r.gamma = t, r;
})(1);
function Qs(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(s) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - s) + e[i] * s;
    return r;
  };
}
function js(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function ta(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), s = new Array(n), a;
  for (a = 0; a < r; ++a) i[a] = Le(t[a], e[a]);
  for (; a < n; ++a) s[a] = e[a];
  return function(o) {
    for (a = 0; a < r; ++a) s[a] = i[a](o);
    return s;
  };
}
function ea(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function R(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function na(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = Le(t[i], e[i]) : r[i] = e[i];
  return function(s) {
    for (i in n) r[i] = n[i](s);
    return r;
  };
}
var ke = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, be = new RegExp(ke.source, "g");
function ra(t) {
  return function() {
    return t;
  };
}
function ia(t) {
  return function(e) {
    return t(e) + "";
  };
}
function tr(t, e) {
  var n = ke.lastIndex = be.lastIndex = 0, r, i, s, a = -1, o = [], c = [];
  for (t = t + "", e = e + ""; (r = ke.exec(t)) && (i = be.exec(e)); )
    (s = i.index) > n && (s = e.slice(n, s), o[a] ? o[a] += s : o[++a] = s), (r = r[0]) === (i = i[0]) ? o[a] ? o[a] += i : o[++a] = i : (o[++a] = null, c.push({ i: a, x: R(r, i) })), n = be.lastIndex;
  return n < e.length && (s = e.slice(n), o[a] ? o[a] += s : o[++a] = s), o.length < 2 ? c[0] ? ia(c[0].x) : ra(e) : (e = c.length, function(l) {
    for (var u = 0, h; u < e; ++u) o[(h = c[u]).i] = h.x(l);
    return o.join("");
  });
}
function Le(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? ze(e) : (n === "number" ? R : n === "string" ? (r = tt(e)) ? (e = r, re) : tr : e instanceof tt ? re : e instanceof Date ? ea : js(e) ? Qs : Array.isArray(e) ? ta : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? na : R)(t, e);
}
function sa(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var dn = 180 / Math.PI, Se = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function er(t, e, n, r, i, s) {
  var a, o, c;
  return (a = Math.sqrt(t * t + e * e)) && (t /= a, e /= a), (c = t * n + e * r) && (n -= t * c, r -= e * c), (o = Math.sqrt(n * n + r * r)) && (n /= o, r /= o, c /= o), t * r < e * n && (t = -t, e = -e, c = -c, a = -a), {
    translateX: i,
    translateY: s,
    rotate: Math.atan2(e, t) * dn,
    skewX: Math.atan(c) * dn,
    scaleX: a,
    scaleY: o
  };
}
var Ft;
function aa(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Se : er(e.a, e.b, e.c, e.d, e.e, e.f);
}
function oa(t) {
  return t == null || (Ft || (Ft = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ft.setAttribute("transform", t), !(t = Ft.transform.baseVal.consolidate())) ? Se : (t = t.matrix, er(t.a, t.b, t.c, t.d, t.e, t.f));
}
function nr(t, e, n, r) {
  function i(l) {
    return l.length ? l.pop() + " " : "";
  }
  function s(l, u, h, d, f, g) {
    if (l !== h || u !== d) {
      var v = f.push("translate(", null, e, null, n);
      g.push({ i: v - 4, x: R(l, h) }, { i: v - 2, x: R(u, d) });
    } else (h || d) && f.push("translate(" + h + e + d + n);
  }
  function a(l, u, h, d) {
    l !== u ? (l - u > 180 ? u += 360 : u - l > 180 && (l += 360), d.push({ i: h.push(i(h) + "rotate(", null, r) - 2, x: R(l, u) })) : u && h.push(i(h) + "rotate(" + u + r);
  }
  function o(l, u, h, d) {
    l !== u ? d.push({ i: h.push(i(h) + "skewX(", null, r) - 2, x: R(l, u) }) : u && h.push(i(h) + "skewX(" + u + r);
  }
  function c(l, u, h, d, f, g) {
    if (l !== h || u !== d) {
      var v = f.push(i(f) + "scale(", null, ",", null, ")");
      g.push({ i: v - 4, x: R(l, h) }, { i: v - 2, x: R(u, d) });
    } else (h !== 1 || d !== 1) && f.push(i(f) + "scale(" + h + "," + d + ")");
  }
  return function(l, u) {
    var h = [], d = [];
    return l = t(l), u = t(u), s(l.translateX, l.translateY, u.translateX, u.translateY, h, d), a(l.rotate, u.rotate, h, d), o(l.skewX, u.skewX, h, d), c(l.scaleX, l.scaleY, u.scaleX, u.scaleY, h, d), l = u = null, function(f) {
      for (var g = -1, v = d.length, A; ++g < v; ) h[(A = d[g]).i] = A.x(f);
      return h.join("");
    };
  };
}
var la = nr(aa, "px, ", "px)", "deg)"), ca = nr(oa, ", ", ")", ")"), ht = 0, bt = 0, yt = 0, rr = 1e3, ie, _t, se = 0, et = 0, fe = 0, Mt = typeof performance == "object" && performance.now ? performance : Date, ir = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function De() {
  return et || (ir(ua), et = Mt.now() + fe);
}
function ua() {
  et = 0;
}
function ae() {
  this._call = this._time = this._next = null;
}
ae.prototype = sr.prototype = {
  constructor: ae,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? De() : +n) + (e == null ? 0 : +e), !this._next && _t !== this && (_t ? _t._next = this : ie = this, _t = this), this._call = t, this._time = n, Ae();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ae());
  }
};
function sr(t, e, n) {
  var r = new ae();
  return r.restart(t, e, n), r;
}
function ha() {
  De(), ++ht;
  for (var t = ie, e; t; )
    (e = et - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --ht;
}
function fn() {
  et = (se = Mt.now()) + fe, ht = bt = 0;
  try {
    ha();
  } finally {
    ht = 0, fa(), et = 0;
  }
}
function da() {
  var t = Mt.now(), e = t - se;
  e > rr && (fe -= e, se = t);
}
function fa() {
  for (var t, e = ie, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : ie = n);
  _t = t, Ae(r);
}
function Ae(t) {
  if (!ht) {
    bt && (bt = clearTimeout(bt));
    var e = t - et;
    e > 24 ? (t < 1 / 0 && (bt = setTimeout(fn, t - Mt.now() - fe)), yt && (yt = clearInterval(yt))) : (yt || (se = Mt.now(), yt = setInterval(da, rr)), ht = 1, ir(fn));
  }
}
function pn(t, e, n) {
  var r = new ae();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var pa = Dn("start", "end", "cancel", "interrupt"), ma = [], ar = 0, mn = 1, Me = 2, Yt = 3, gn = 4, Ee = 5, Gt = 6;
function pe(t, e, n, r, i, s) {
  var a = t.__transition;
  if (!a) t.__transition = {};
  else if (n in a) return;
  ga(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: pa,
    tween: ma,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: ar
  });
}
function He(t, e) {
  var n = T(t, e);
  if (n.state > ar) throw new Error("too late; already scheduled");
  return n;
}
function D(t, e) {
  var n = T(t, e);
  if (n.state > Yt) throw new Error("too late; already running");
  return n;
}
function T(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function ga(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = sr(s, 0, n.time);
  function s(l) {
    n.state = mn, n.timer.restart(a, n.delay, n.time), n.delay <= l && a(l - n.delay);
  }
  function a(l) {
    var u, h, d, f;
    if (n.state !== mn) return c();
    for (u in r)
      if (f = r[u], f.name === n.name) {
        if (f.state === Yt) return pn(a);
        f.state === gn ? (f.state = Gt, f.timer.stop(), f.on.call("interrupt", t, t.__data__, f.index, f.group), delete r[u]) : +u < e && (f.state = Gt, f.timer.stop(), f.on.call("cancel", t, t.__data__, f.index, f.group), delete r[u]);
      }
    if (pn(function() {
      n.state === Yt && (n.state = gn, n.timer.restart(o, n.delay, n.time), o(l));
    }), n.state = Me, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Me) {
      for (n.state = Yt, i = new Array(d = n.tween.length), u = 0, h = -1; u < d; ++u)
        (f = n.tween[u].value.call(t, t.__data__, n.index, n.group)) && (i[++h] = f);
      i.length = h + 1;
    }
  }
  function o(l) {
    for (var u = l < n.duration ? n.ease.call(null, l / n.duration) : (n.timer.restart(c), n.state = Ee, 1), h = -1, d = i.length; ++h < d; )
      i[h].call(t, u);
    n.state === Ee && (n.on.call("end", t, t.__data__, n.index, n.group), c());
  }
  function c() {
    n.state = Gt, n.timer.stop(), delete r[e];
    for (var l in r) return;
    delete t.__transition;
  }
}
function ya(t, e) {
  var n = t.__transition, r, i, s = !0, a;
  if (n) {
    e = e == null ? null : e + "";
    for (a in n) {
      if ((r = n[a]).name !== e) {
        s = !1;
        continue;
      }
      i = r.state > Me && r.state < Ee, r.state = Gt, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[a];
    }
    s && delete t.__transition;
  }
}
function va(t) {
  return this.each(function() {
    ya(this, t);
  });
}
function ba(t, e) {
  var n, r;
  return function() {
    var i = D(this, t), s = i.tween;
    if (s !== n) {
      r = n = s;
      for (var a = 0, o = r.length; a < o; ++a)
        if (r[a].name === e) {
          r = r.slice(), r.splice(a, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function _a(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var s = D(this, t), a = s.tween;
    if (a !== r) {
      i = (r = a).slice();
      for (var o = { name: e, value: n }, c = 0, l = i.length; c < l; ++c)
        if (i[c].name === e) {
          i[c] = o;
          break;
        }
      c === l && i.push(o);
    }
    s.tween = i;
  };
}
function wa(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = T(this.node(), n).tween, i = 0, s = r.length, a; i < s; ++i)
      if ((a = r[i]).name === t)
        return a.value;
    return null;
  }
  return this.each((e == null ? ba : _a)(n, t, e));
}
function Ue(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = D(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return T(i, r).value[e];
  };
}
function or(t, e) {
  var n;
  return (typeof e == "number" ? R : e instanceof tt ? re : (n = tt(e)) ? (e = n, re) : tr)(t, e);
}
function xa(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function $a(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function ka(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var a = this.getAttribute(t);
    return a === i ? null : a === r ? s : s = e(r = a, n);
  };
}
function Sa(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var a = this.getAttributeNS(t.space, t.local);
    return a === i ? null : a === r ? s : s = e(r = a, n);
  };
}
function Aa(t, e, n) {
  var r, i, s;
  return function() {
    var a, o = n(this), c;
    return o == null ? void this.removeAttribute(t) : (a = this.getAttribute(t), c = o + "", a === c ? null : a === r && c === i ? s : (i = c, s = e(r = a, o)));
  };
}
function Ma(t, e, n) {
  var r, i, s;
  return function() {
    var a, o = n(this), c;
    return o == null ? void this.removeAttributeNS(t.space, t.local) : (a = this.getAttributeNS(t.space, t.local), c = o + "", a === c ? null : a === r && c === i ? s : (i = c, s = e(r = a, o)));
  };
}
function Ea(t, e) {
  var n = de(t), r = n === "transform" ? ca : or;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Ma : Aa)(n, r, Ue(this, "attr." + t, e)) : e == null ? (n.local ? $a : xa)(n) : (n.local ? Sa : ka)(n, r, e));
}
function Ca(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Na(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Ra(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && Na(t, s)), n;
  }
  return i._value = e, i;
}
function Ia(t, e) {
  var n, r;
  function i() {
    var s = e.apply(this, arguments);
    return s !== r && (n = (r = s) && Ca(t, s)), n;
  }
  return i._value = e, i;
}
function Pa(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = de(t);
  return this.tween(n, (r.local ? Ra : Ia)(r, e));
}
function Ta(t, e) {
  return function() {
    He(this, t).delay = +e.apply(this, arguments);
  };
}
function qa(t, e) {
  return e = +e, function() {
    He(this, t).delay = e;
  };
}
function Oa(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? Ta : qa)(e, t)) : T(this.node(), e).delay;
}
function za(t, e) {
  return function() {
    D(this, t).duration = +e.apply(this, arguments);
  };
}
function La(t, e) {
  return e = +e, function() {
    D(this, t).duration = e;
  };
}
function Da(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? za : La)(e, t)) : T(this.node(), e).duration;
}
function Ha(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    D(this, t).ease = e;
  };
}
function Ua(t) {
  var e = this._id;
  return arguments.length ? this.each(Ha(e, t)) : T(this.node(), e).ease;
}
function Fa(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    D(this, t).ease = n;
  };
}
function Ba(t) {
  if (typeof t != "function") throw new Error();
  return this.each(Fa(this._id, t));
}
function Va(t) {
  typeof t != "function" && (t = Fn(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var s = e[i], a = s.length, o = r[i] = [], c, l = 0; l < a; ++l)
      (c = s[l]) && t.call(c, c.__data__, l, s) && o.push(c);
  return new V(r, this._parents, this._name, this._id);
}
function Xa(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, s = Math.min(r, i), a = new Array(r), o = 0; o < s; ++o)
    for (var c = e[o], l = n[o], u = c.length, h = a[o] = new Array(u), d, f = 0; f < u; ++f)
      (d = c[f] || l[f]) && (h[f] = d);
  for (; o < r; ++o)
    a[o] = e[o];
  return new V(a, this._parents, this._name, this._id);
}
function Ka(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function Wa(t, e, n) {
  var r, i, s = Ka(e) ? He : D;
  return function() {
    var a = s(this, t), o = a.on;
    o !== r && (i = (r = o).copy()).on(e, n), a.on = i;
  };
}
function Ya(t, e) {
  var n = this._id;
  return arguments.length < 2 ? T(this.node(), n).on.on(t) : this.each(Wa(n, t, e));
}
function Ga(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function Ja() {
  return this.on("end.remove", Ga(this._id));
}
function Za(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Te(t));
  for (var r = this._groups, i = r.length, s = new Array(i), a = 0; a < i; ++a)
    for (var o = r[a], c = o.length, l = s[a] = new Array(c), u, h, d = 0; d < c; ++d)
      (u = o[d]) && (h = t.call(u, u.__data__, d, o)) && ("__data__" in u && (h.__data__ = u.__data__), l[d] = h, pe(l[d], e, n, d, l, T(u, n)));
  return new V(s, this._parents, e, n);
}
function Qa(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = Un(t));
  for (var r = this._groups, i = r.length, s = [], a = [], o = 0; o < i; ++o)
    for (var c = r[o], l = c.length, u, h = 0; h < l; ++h)
      if (u = c[h]) {
        for (var d = t.call(u, u.__data__, h, c), f, g = T(u, n), v = 0, A = d.length; v < A; ++v)
          (f = d[v]) && pe(f, e, n, v, d, g);
        s.push(d), a.push(u);
      }
  return new V(s, a, e, n);
}
var ja = Pt.prototype.constructor;
function to() {
  return new ja(this._groups, this._parents);
}
function eo(t, e) {
  var n, r, i;
  return function() {
    var s = ut(this, t), a = (this.style.removeProperty(t), ut(this, t));
    return s === a ? null : s === n && a === r ? i : i = e(n = s, r = a);
  };
}
function lr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function no(t, e, n) {
  var r, i = n + "", s;
  return function() {
    var a = ut(this, t);
    return a === i ? null : a === r ? s : s = e(r = a, n);
  };
}
function ro(t, e, n) {
  var r, i, s;
  return function() {
    var a = ut(this, t), o = n(this), c = o + "";
    return o == null && (c = o = (this.style.removeProperty(t), ut(this, t))), a === c ? null : a === r && c === i ? s : (i = c, s = e(r = a, o));
  };
}
function io(t, e) {
  var n, r, i, s = "style." + e, a = "end." + s, o;
  return function() {
    var c = D(this, t), l = c.on, u = c.value[s] == null ? o || (o = lr(e)) : void 0;
    (l !== n || i !== u) && (r = (n = l).copy()).on(a, i = u), c.on = r;
  };
}
function so(t, e, n) {
  var r = (t += "") == "transform" ? la : or;
  return e == null ? this.styleTween(t, eo(t, r)).on("end.style." + t, lr(t)) : typeof e == "function" ? this.styleTween(t, ro(t, r, Ue(this, "style." + t, e))).each(io(this._id, t)) : this.styleTween(t, no(t, r, e), n).on("end.style." + t, null);
}
function ao(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function oo(t, e, n) {
  var r, i;
  function s() {
    var a = e.apply(this, arguments);
    return a !== i && (r = (i = a) && ao(t, a, n)), r;
  }
  return s._value = e, s;
}
function lo(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, oo(t, e, n ?? ""));
}
function co(t) {
  return function() {
    this.textContent = t;
  };
}
function uo(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function ho(t) {
  return this.tween("text", typeof t == "function" ? uo(Ue(this, "text", t)) : co(t == null ? "" : t + ""));
}
function fo(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function po(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && fo(i)), e;
  }
  return r._value = t, r;
}
function mo(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, po(t));
}
function go() {
  for (var t = this._name, e = this._id, n = cr(), r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var a = r[s], o = a.length, c, l = 0; l < o; ++l)
      if (c = a[l]) {
        var u = T(c, e);
        pe(c, t, n, l, a, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease
        });
      }
  return new V(r, this._parents, t, n);
}
function yo() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(s, a) {
    var o = { value: a }, c = { value: function() {
      --i === 0 && s();
    } };
    n.each(function() {
      var l = D(this, r), u = l.on;
      u !== t && (e = (t = u).copy(), e._.cancel.push(o), e._.interrupt.push(o), e._.end.push(c)), l.on = e;
    }), i === 0 && s();
  });
}
var vo = 0;
function V(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function cr() {
  return ++vo;
}
var F = Pt.prototype;
V.prototype = {
  constructor: V,
  select: Za,
  selectAll: Qa,
  selectChild: F.selectChild,
  selectChildren: F.selectChildren,
  filter: Va,
  merge: Xa,
  selection: to,
  transition: go,
  call: F.call,
  nodes: F.nodes,
  node: F.node,
  size: F.size,
  empty: F.empty,
  each: F.each,
  on: Ya,
  attr: Ea,
  attrTween: Pa,
  style: so,
  styleTween: lo,
  text: ho,
  textTween: mo,
  remove: Ja,
  tween: wa,
  delay: Oa,
  duration: Da,
  ease: Ua,
  easeVarying: Ba,
  end: yo,
  [Symbol.iterator]: F[Symbol.iterator]
};
function bo(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var _o = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: bo
};
function wo(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function xo(t) {
  var e, n;
  t instanceof V ? (e = t._id, t = t._name) : (e = cr(), (n = _o).time = De(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, s = 0; s < i; ++s)
    for (var a = r[s], o = a.length, c, l = 0; l < o; ++l)
      (c = a[l]) && pe(c, t, e, l, a, n || wo(c, e));
  return new V(r, this._parents, t, e);
}
Pt.prototype.interrupt = va;
Pt.prototype.transition = xo;
function $o(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function oe(t, e) {
  if (!isFinite(t) || t === 0) return null;
  var n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e"), r = t.slice(0, n);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +t.slice(n + 1)
  ];
}
function dt(t) {
  return t = oe(Math.abs(t)), t ? t[1] : NaN;
}
function ko(t, e) {
  return function(n, r) {
    for (var i = n.length, s = [], a = 0, o = t[0], c = 0; i > 0 && o > 0 && (c + o + 1 > r && (o = Math.max(1, r - c)), s.push(n.substring(i -= o, i + o)), !((c += o + 1) > r)); )
      o = t[a = (a + 1) % t.length];
    return s.reverse().join(e);
  };
}
function So(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var Ao = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function le(t) {
  if (!(e = Ao.exec(t))) throw new Error("invalid format: " + t);
  var e;
  return new Fe({
    fill: e[1],
    align: e[2],
    sign: e[3],
    symbol: e[4],
    zero: e[5],
    width: e[6],
    comma: e[7],
    precision: e[8] && e[8].slice(1),
    trim: e[9],
    type: e[10]
  });
}
le.prototype = Fe.prototype;
function Fe(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
Fe.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function Mo(t) {
  t: for (var e = t.length, n = 1, r = -1, i; n < e; ++n)
    switch (t[n]) {
      case ".":
        r = i = n;
        break;
      case "0":
        r === 0 && (r = n), i = n;
        break;
      default:
        if (!+t[n]) break t;
        r > 0 && (r = 0);
        break;
    }
  return r > 0 ? t.slice(0, r) + t.slice(i + 1) : t;
}
var ce;
function Eo(t, e) {
  var n = oe(t, e);
  if (!n) return ce = void 0, t.toPrecision(e);
  var r = n[0], i = n[1], s = i - (ce = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, a = r.length;
  return s === a ? r : s > a ? r + new Array(s - a + 1).join("0") : s > 0 ? r.slice(0, s) + "." + r.slice(s) : "0." + new Array(1 - s).join("0") + oe(t, Math.max(0, e + s - 1))[0];
}
function yn(t, e) {
  var n = oe(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const vn = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: $o,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => yn(t * 100, e),
  r: yn,
  s: Eo,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function bn(t) {
  return t;
}
var _n = Array.prototype.map, wn = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function Co(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? bn : ko(_n.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", r = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", s = t.numerals === void 0 ? bn : So(_n.call(t.numerals, String)), a = t.percent === void 0 ? "%" : t.percent + "", o = t.minus === void 0 ? "−" : t.minus + "", c = t.nan === void 0 ? "NaN" : t.nan + "";
  function l(h, d) {
    h = le(h);
    var f = h.fill, g = h.align, v = h.sign, A = h.symbol, rt = h.zero, H = h.width, X = h.comma, q = h.precision, gt = h.trim, E = h.type;
    E === "n" ? (X = !0, E = "g") : vn[E] || (q === void 0 && (q = 12), gt = !0, E = "g"), (rt || f === "0" && g === "=") && (rt = !0, f = "0", g = "=");
    var Fr = (d && d.prefix !== void 0 ? d.prefix : "") + (A === "$" ? n : A === "#" && /[boxX]/.test(E) ? "0" + E.toLowerCase() : ""), Br = (A === "$" ? r : /[%p]/.test(E) ? a : "") + (d && d.suffix !== void 0 ? d.suffix : ""), Qe = vn[E], Vr = /[defgprs%]/.test(E);
    q = q === void 0 ? 6 : /[gprs]/.test(E) ? Math.max(1, Math.min(21, q)) : Math.max(0, Math.min(20, q));
    function je(m) {
      var G = Fr, C = Br, it, tn, zt;
      if (E === "c")
        C = Qe(m) + C, m = "";
      else {
        m = +m;
        var Lt = m < 0 || 1 / m < 0;
        if (m = isNaN(m) ? c : Qe(Math.abs(m), q), gt && (m = Mo(m)), Lt && +m == 0 && v !== "+" && (Lt = !1), G = (Lt ? v === "(" ? v : o : v === "-" || v === "(" ? "" : v) + G, C = (E === "s" && !isNaN(m) && ce !== void 0 ? wn[8 + ce / 3] : "") + C + (Lt && v === "(" ? ")" : ""), Vr) {
          for (it = -1, tn = m.length; ++it < tn; )
            if (zt = m.charCodeAt(it), 48 > zt || zt > 57) {
              C = (zt === 46 ? i + m.slice(it + 1) : m.slice(it)) + C, m = m.slice(0, it);
              break;
            }
        }
      }
      X && !rt && (m = e(m, 1 / 0));
      var Dt = G.length + m.length + C.length, U = Dt < H ? new Array(H - Dt + 1).join(f) : "";
      switch (X && rt && (m = e(U + m, U.length ? H - C.length : 1 / 0), U = ""), g) {
        case "<":
          m = G + m + C + U;
          break;
        case "=":
          m = G + U + m + C;
          break;
        case "^":
          m = U.slice(0, Dt = U.length >> 1) + G + m + C + U.slice(Dt);
          break;
        default:
          m = U + G + m + C;
          break;
      }
      return s(m);
    }
    return je.toString = function() {
      return h + "";
    }, je;
  }
  function u(h, d) {
    var f = Math.max(-8, Math.min(8, Math.floor(dt(d) / 3))) * 3, g = Math.pow(10, -f), v = l((h = le(h), h.type = "f", h), { suffix: wn[8 + f / 3] });
    return function(A) {
      return v(g * A);
    };
  }
  return {
    format: l,
    formatPrefix: u
  };
}
var Bt, ur, hr;
No({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function No(t) {
  return Bt = Co(t), ur = Bt.format, hr = Bt.formatPrefix, Bt;
}
function Ro(t) {
  return Math.max(0, -dt(Math.abs(t)));
}
function Io(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(dt(e) / 3))) * 3 - dt(Math.abs(t)));
}
function Po(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, dt(e) - dt(t)) + 1;
}
function dr(t, e) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(t);
      break;
    default:
      this.range(e).domain(t);
      break;
  }
  return this;
}
function To(t) {
  return function() {
    return t;
  };
}
function qo(t) {
  return +t;
}
var xn = [0, 1];
function z(t) {
  return t;
}
function Ce(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : To(isNaN(e) ? NaN : 0.5);
}
function Oo(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(r) {
    return Math.max(t, Math.min(e, r));
  };
}
function zo(t, e, n) {
  var r = t[0], i = t[1], s = e[0], a = e[1];
  return i < r ? (r = Ce(i, r), s = n(a, s)) : (r = Ce(r, i), s = n(s, a)), function(o) {
    return s(r(o));
  };
}
function Lo(t, e, n) {
  var r = Math.min(t.length, e.length) - 1, i = new Array(r), s = new Array(r), a = -1;
  for (t[r] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++a < r; )
    i[a] = Ce(t[a], t[a + 1]), s[a] = n(e[a], e[a + 1]);
  return function(o) {
    var c = Gr(t, o, 1, r) - 1;
    return s[c](i[c](o));
  };
}
function fr(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function pr() {
  var t = xn, e = xn, n = Le, r, i, s, a = z, o, c, l;
  function u() {
    var d = Math.min(t.length, e.length);
    return a !== z && (a = Oo(t[0], t[d - 1])), o = d > 2 ? Lo : zo, c = l = null, h;
  }
  function h(d) {
    return d == null || isNaN(d = +d) ? s : (c || (c = o(t.map(r), e, n)))(r(a(d)));
  }
  return h.invert = function(d) {
    return a(i((l || (l = o(e, t.map(r), R)))(d)));
  }, h.domain = function(d) {
    return arguments.length ? (t = Array.from(d, qo), u()) : t.slice();
  }, h.range = function(d) {
    return arguments.length ? (e = Array.from(d), u()) : e.slice();
  }, h.rangeRound = function(d) {
    return e = Array.from(d), n = sa, u();
  }, h.clamp = function(d) {
    return arguments.length ? (a = d ? !0 : z, u()) : a !== z;
  }, h.interpolate = function(d) {
    return arguments.length ? (n = d, u()) : n;
  }, h.unknown = function(d) {
    return arguments.length ? (s = d, h) : s;
  }, function(d, f) {
    return r = d, i = f, u();
  };
}
function Do() {
  return pr()(z, z);
}
function Ho(t, e, n, r) {
  var i = ti(t, e, n), s;
  switch (r = le(r ?? ",f"), r.type) {
    case "s": {
      var a = Math.max(Math.abs(t), Math.abs(e));
      return r.precision == null && !isNaN(s = Io(i, a)) && (r.precision = s), hr(r, a);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(s = Po(i, Math.max(Math.abs(t), Math.abs(e)))) && (r.precision = s - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(s = Ro(i)) && (r.precision = s - (r.type === "%") * 2);
      break;
    }
  }
  return ur(r);
}
function mr(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var r = e();
    return jr(r[0], r[r.length - 1], n ?? 10);
  }, t.tickFormat = function(n, r) {
    var i = e();
    return Ho(i[0], i[i.length - 1], n ?? 10, r);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var r = e(), i = 0, s = r.length - 1, a = r[i], o = r[s], c, l, u = 10;
    for (o < a && (l = a, a = o, o = l, l = i, i = s, s = l); u-- > 0; ) {
      if (l = we(a, o, n), l === c)
        return r[i] = a, r[s] = o, e(r);
      if (l > 0)
        a = Math.floor(a / l) * l, o = Math.ceil(o / l) * l;
      else if (l < 0)
        a = Math.ceil(a * l) / l, o = Math.floor(o * l) / l;
      else
        break;
      c = l;
    }
    return t;
  }, t;
}
function gr() {
  var t = Do();
  return t.copy = function() {
    return fr(t, gr());
  }, dr.apply(t, arguments), mr(t);
}
function $n(t) {
  return function(e) {
    return e < 0 ? -Math.pow(-e, t) : Math.pow(e, t);
  };
}
function Uo(t) {
  return t < 0 ? -Math.sqrt(-t) : Math.sqrt(t);
}
function Fo(t) {
  return t < 0 ? -t * t : t * t;
}
function Bo(t) {
  var e = t(z, z), n = 1;
  function r() {
    return n === 1 ? t(z, z) : n === 0.5 ? t(Uo, Fo) : t($n(n), $n(1 / n));
  }
  return e.exponent = function(i) {
    return arguments.length ? (n = +i, r()) : n;
  }, mr(e);
}
function yr() {
  var t = Bo(pr());
  return t.copy = function() {
    return fr(t, yr()).exponent(t.exponent());
  }, dr.apply(t, arguments), t;
}
function Vo() {
  return yr.apply(null, arguments).exponent(0.5);
}
function wt(t, e, n) {
  this.k = t, this.x = e, this.y = n;
}
wt.prototype = {
  constructor: wt,
  scale: function(t) {
    return t === 1 ? this : new wt(this.k * t, this.x, this.y);
  },
  translate: function(t, e) {
    return t === 0 & e === 0 ? this : new wt(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function(t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function(t) {
    return t * this.k + this.x;
  },
  applyY: function(t) {
    return t * this.k + this.y;
  },
  invert: function(t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function(t) {
    return (t - this.x) / this.k;
  },
  invertY: function(t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function(t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function(t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
wt.prototype;
const Jt = globalThis, Be = Jt.ShadowRoot && (Jt.ShadyCSS === void 0 || Jt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ve = /* @__PURE__ */ Symbol(), kn = /* @__PURE__ */ new WeakMap();
let vr = class {
  constructor(e, n, r) {
    if (this._$cssResult$ = !0, r !== Ve) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = n;
  }
  get styleSheet() {
    let e = this.o;
    const n = this.t;
    if (Be && e === void 0) {
      const r = n !== void 0 && n.length === 1;
      r && (e = kn.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && kn.set(n, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Xo = (t) => new vr(typeof t == "string" ? t : t + "", void 0, Ve), Ko = (t, ...e) => {
  const n = t.length === 1 ? t[0] : e.reduce((r, i, s) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + t[s + 1], t[0]);
  return new vr(n, t, Ve);
}, Wo = (t, e) => {
  if (Be) t.adoptedStyleSheets = e.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of e) {
    const r = document.createElement("style"), i = Jt.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = n.cssText, t.appendChild(r);
  }
}, Sn = Be ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let n = "";
  for (const r of e.cssRules) n += r.cssText;
  return Xo(n);
})(t) : t;
const { is: Yo, defineProperty: Go, getOwnPropertyDescriptor: Jo, getOwnPropertyNames: Zo, getOwnPropertySymbols: Qo, getPrototypeOf: jo } = Object, me = globalThis, An = me.trustedTypes, tl = An ? An.emptyScript : "", el = me.reactiveElementPolyfillSupport, $t = (t, e) => t, ue = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? tl : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let n = t;
  switch (e) {
    case Boolean:
      n = t !== null;
      break;
    case Number:
      n = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(t);
      } catch {
        n = null;
      }
  }
  return n;
} }, Xe = (t, e) => !Yo(t, e), Mn = { attribute: !0, type: String, converter: ue, reflect: !1, useDefault: !1, hasChanged: Xe };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), me.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let st = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, n = Mn) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(e, n), !n.noAccessor) {
      const r = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(e, r, n);
      i !== void 0 && Go(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, n, r) {
    const { get: i, set: s } = Jo(this.prototype, e) ?? { get() {
      return this[n];
    }, set(a) {
      this[n] = a;
    } };
    return { get: i, set(a) {
      const o = i?.call(this);
      s?.call(this, a), this.requestUpdate(e, o, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Mn;
  }
  static _$Ei() {
    if (this.hasOwnProperty($t("elementProperties"))) return;
    const e = jo(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty($t("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty($t("properties"))) {
      const n = this.properties, r = [...Zo(n), ...Qo(n)];
      for (const i of r) this.createProperty(i, n[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const n = litPropertyMetadata.get(e);
      if (n !== void 0) for (const [r, i] of n) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, r] of this.elementProperties) {
      const i = this._$Eu(n, r);
      i !== void 0 && this._$Eh.set(i, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const n = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const i of r) n.unshift(Sn(i));
    } else e !== void 0 && n.push(Sn(e));
    return n;
  }
  static _$Eu(e, n) {
    const r = n.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const r of n.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Wo(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, n, r) {
    this._$AK(e, r);
  }
  _$ET(e, n) {
    const r = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, r);
    if (i !== void 0 && r.reflect === !0) {
      const s = (r.converter?.toAttribute !== void 0 ? r.converter : ue).toAttribute(n, r.type);
      this._$Em = e, s == null ? this.removeAttribute(i) : this.setAttribute(i, s), this._$Em = null;
    }
  }
  _$AK(e, n) {
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const s = r.getPropertyOptions(i), a = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : ue;
      this._$Em = i;
      const o = a.fromAttribute(n, s.type);
      this[i] = o ?? this._$Ej?.get(i) ?? o, this._$Em = null;
    }
  }
  requestUpdate(e, n, r, i = !1, s) {
    if (e !== void 0) {
      const a = this.constructor;
      if (i === !1 && (s = this[e]), r ??= a.getPropertyOptions(e), !((r.hasChanged ?? Xe)(s, n) || r.useDefault && r.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, r)))) return;
      this.C(e, n, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, n, { useDefault: r, reflect: i, wrapped: s }, a) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? n ?? this[e]), s !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (n = void 0), this._$AL.set(e, n)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, s] of this._$Ep) this[i] = s;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [i, s] of r) {
        const { wrapped: a } = s, o = this[i];
        a !== !0 || this._$AL.has(i) || o === void 0 || this.C(i, void 0, s, o);
      }
    }
    let e = !1;
    const n = this._$AL;
    try {
      e = this.shouldUpdate(n), e ? (this.willUpdate(n), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(n)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
    }
    e && this._$AE(n);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((n) => n.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((n) => this._$ET(n, this[n])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
st.elementStyles = [], st.shadowRootOptions = { mode: "open" }, st[$t("elementProperties")] = /* @__PURE__ */ new Map(), st[$t("finalized")] = /* @__PURE__ */ new Map(), el?.({ ReactiveElement: st }), (me.reactiveElementVersions ??= []).push("2.1.2");
const Ke = globalThis, En = (t) => t, he = Ke.trustedTypes, Cn = he ? he.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, br = "$lit$", K = `lit$${Math.random().toFixed(9).slice(2)}$`, _r = "?" + K, nl = `<${_r}>`, nt = document, Et = () => nt.createComment(""), Ct = (t) => t === null || typeof t != "object" && typeof t != "function", We = Array.isArray, rl = (t) => We(t) || typeof t?.[Symbol.iterator] == "function", _e = `[ 	
\f\r]`, vt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Nn = /-->/g, Rn = />/g, J = RegExp(`>|${_e}(?:([^\\s"'>=/]+)(${_e}*=${_e}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), In = /'/g, Pn = /"/g, wr = /^(?:script|style|textarea|title)$/i, xr = (t) => (e, ...n) => ({ _$litType$: t, strings: e, values: n }), p = xr(1), Tn = xr(2), ft = /* @__PURE__ */ Symbol.for("lit-noChange"), y = /* @__PURE__ */ Symbol.for("lit-nothing"), qn = /* @__PURE__ */ new WeakMap(), Q = nt.createTreeWalker(nt, 129);
function $r(t, e) {
  if (!We(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Cn !== void 0 ? Cn.createHTML(e) : e;
}
const il = (t, e) => {
  const n = t.length - 1, r = [];
  let i, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = vt;
  for (let o = 0; o < n; o++) {
    const c = t[o];
    let l, u, h = -1, d = 0;
    for (; d < c.length && (a.lastIndex = d, u = a.exec(c), u !== null); ) d = a.lastIndex, a === vt ? u[1] === "!--" ? a = Nn : u[1] !== void 0 ? a = Rn : u[2] !== void 0 ? (wr.test(u[2]) && (i = RegExp("</" + u[2], "g")), a = J) : u[3] !== void 0 && (a = J) : a === J ? u[0] === ">" ? (a = i ?? vt, h = -1) : u[1] === void 0 ? h = -2 : (h = a.lastIndex - u[2].length, l = u[1], a = u[3] === void 0 ? J : u[3] === '"' ? Pn : In) : a === Pn || a === In ? a = J : a === Nn || a === Rn ? a = vt : (a = J, i = void 0);
    const f = a === J && t[o + 1].startsWith("/>") ? " " : "";
    s += a === vt ? c + nl : h >= 0 ? (r.push(l), c.slice(0, h) + br + c.slice(h) + K + f) : c + K + (h === -2 ? o : f);
  }
  return [$r(t, s + (t[n] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class Nt {
  constructor({ strings: e, _$litType$: n }, r) {
    let i;
    this.parts = [];
    let s = 0, a = 0;
    const o = e.length - 1, c = this.parts, [l, u] = il(e, n);
    if (this.el = Nt.createElement(l, r), Q.currentNode = this.el.content, n === 2 || n === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = Q.nextNode()) !== null && c.length < o; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(br)) {
          const d = u[a++], f = i.getAttribute(h).split(K), g = /([.?@])?(.*)/.exec(d);
          c.push({ type: 1, index: s, name: g[2], strings: f, ctor: g[1] === "." ? al : g[1] === "?" ? ol : g[1] === "@" ? ll : ge }), i.removeAttribute(h);
        } else h.startsWith(K) && (c.push({ type: 6, index: s }), i.removeAttribute(h));
        if (wr.test(i.tagName)) {
          const h = i.textContent.split(K), d = h.length - 1;
          if (d > 0) {
            i.textContent = he ? he.emptyScript : "";
            for (let f = 0; f < d; f++) i.append(h[f], Et()), Q.nextNode(), c.push({ type: 2, index: ++s });
            i.append(h[d], Et());
          }
        }
      } else if (i.nodeType === 8) if (i.data === _r) c.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(K, h + 1)) !== -1; ) c.push({ type: 7, index: s }), h += K.length - 1;
      }
      s++;
    }
  }
  static createElement(e, n) {
    const r = nt.createElement("template");
    return r.innerHTML = e, r;
  }
}
function pt(t, e, n = t, r) {
  if (e === ft) return e;
  let i = r !== void 0 ? n._$Co?.[r] : n._$Cl;
  const s = Ct(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== s && (i?._$AO?.(!1), s === void 0 ? i = void 0 : (i = new s(t), i._$AT(t, n, r)), r !== void 0 ? (n._$Co ??= [])[r] = i : n._$Cl = i), i !== void 0 && (e = pt(t, i._$AS(t, e.values), i, r)), e;
}
class sl {
  constructor(e, n) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: n }, parts: r } = this._$AD, i = (e?.creationScope ?? nt).importNode(n, !0);
    Q.currentNode = i;
    let s = Q.nextNode(), a = 0, o = 0, c = r[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let l;
        c.type === 2 ? l = new qt(s, s.nextSibling, this, e) : c.type === 1 ? l = new c.ctor(s, c.name, c.strings, this, e) : c.type === 6 && (l = new cl(s, this, e)), this._$AV.push(l), c = r[++o];
      }
      a !== c?.index && (s = Q.nextNode(), a++);
    }
    return Q.currentNode = nt, i;
  }
  p(e) {
    let n = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, n), n += r.strings.length - 2) : r._$AI(e[n])), n++;
  }
}
class qt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, n, r, i) {
    this.type = 2, this._$AH = y, this._$AN = void 0, this._$AA = e, this._$AB = n, this._$AM = r, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && e?.nodeType === 11 && (e = n.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, n = this) {
    e = pt(this, e, n), Ct(e) ? e === y || e == null || e === "" ? (this._$AH !== y && this._$AR(), this._$AH = y) : e !== this._$AH && e !== ft && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : rl(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== y && Ct(this._$AH) ? this._$AA.nextSibling.data = e : this.T(nt.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: n, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = Nt.createElement($r(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === i) this._$AH.p(n);
    else {
      const s = new sl(i, this), a = s.u(this.options);
      s.p(n), this.T(a), this._$AH = s;
    }
  }
  _$AC(e) {
    let n = qn.get(e.strings);
    return n === void 0 && qn.set(e.strings, n = new Nt(e)), n;
  }
  k(e) {
    We(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let r, i = 0;
    for (const s of e) i === n.length ? n.push(r = new qt(this.O(Et()), this.O(Et()), this, this.options)) : r = n[i], r._$AI(s), i++;
    i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
  }
  _$AR(e = this._$AA.nextSibling, n) {
    for (this._$AP?.(!1, !0, n); e !== this._$AB; ) {
      const r = En(e).nextSibling;
      En(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class ge {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, n, r, i, s) {
    this.type = 1, this._$AH = y, this._$AN = void 0, this.element = e, this.name = n, this._$AM = i, this.options = s, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = y;
  }
  _$AI(e, n = this, r, i) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) e = pt(this, e, n, 0), a = !Ct(e) || e !== this._$AH && e !== ft, a && (this._$AH = e);
    else {
      const o = e;
      let c, l;
      for (e = s[0], c = 0; c < s.length - 1; c++) l = pt(this, o[r + c], n, c), l === ft && (l = this._$AH[c]), a ||= !Ct(l) || l !== this._$AH[c], l === y ? e = y : e !== y && (e += (l ?? "") + s[c + 1]), this._$AH[c] = l;
    }
    a && !i && this.j(e);
  }
  j(e) {
    e === y ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class al extends ge {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === y ? void 0 : e;
  }
}
class ol extends ge {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== y);
  }
}
class ll extends ge {
  constructor(e, n, r, i, s) {
    super(e, n, r, i, s), this.type = 5;
  }
  _$AI(e, n = this) {
    if ((e = pt(this, e, n, 0) ?? y) === ft) return;
    const r = this._$AH, i = e === y && r !== y || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, s = e !== y && (r === y || i);
    i && this.element.removeEventListener(this.name, this, r), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class cl {
  constructor(e, n, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    pt(this, e);
  }
}
const ul = Ke.litHtmlPolyfillSupport;
ul?.(Nt, qt), (Ke.litHtmlVersions ??= []).push("3.3.3");
const hl = (t, e, n) => {
  const r = n?.renderBefore ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const s = n?.renderBefore ?? null;
    r._$litPart$ = i = new qt(e.insertBefore(Et(), s), s, void 0, n ?? {});
  }
  return i._$AI(t), i;
};
const Ye = globalThis;
class kt extends st {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = hl(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ft;
  }
}
kt._$litElement$ = !0, kt.finalized = !0, Ye.litElementHydrateSupport?.({ LitElement: kt });
const dl = Ye.litElementPolyfillSupport;
dl?.({ LitElement: kt });
(Ye.litElementVersions ??= []).push("4.2.2");
const fl = (t) => (e, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
const pl = { attribute: !0, type: String, converter: ue, reflect: !1, hasChanged: Xe }, ml = (t = pl, e, n) => {
  const { kind: r, metadata: i } = n;
  let s = globalThis.litPropertyMetadata.get(i);
  if (s === void 0 && globalThis.litPropertyMetadata.set(i, s = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), s.set(n.name, t), r === "accessor") {
    const { name: a } = n;
    return { set(o) {
      const c = e.get.call(this);
      e.set.call(this, o), this.requestUpdate(a, c, t, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(a, void 0, t, o), o;
    } };
  }
  if (r === "setter") {
    const { name: a } = n;
    return function(o) {
      const c = this[a];
      e.call(this, o), this.requestUpdate(a, c, t, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function Ot(t) {
  return (e, n) => typeof n == "object" ? ml(t, e, n) : ((r, i, s) => {
    const a = i.hasOwnProperty(s);
    return i.constructor.createProperty(s, r), a ? Object.getOwnPropertyDescriptor(i, s) : void 0;
  })(t, e, n);
}
function S(t) {
  return Ot({ ...t, state: !0, attribute: !1 });
}
class N extends Error {
}
function gl(t, e) {
  if (!t || typeof t != "object" || !t.manifest)
    throw new N("Replay manifest is missing.");
  const n = t.manifest.schema_version;
  if (n === 0)
    throw new N(
      "Schema v0 is audit-only and cannot be losslessly migrated to v1."
    );
  if (n !== 1)
    throw new N(
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
    if (!(l in t))
      throw new N(`Replay table is missing: ${l}.`);
  const i = t.manifest.months;
  if (!Array.isArray(i) || t.timeline.length !== i.length || t.timeline.some(
    (l, u) => l.index !== u || l.month !== i[u]
  ))
    throw new N("Replay timeline is not aligned.");
  if (t.runs.map((l) => l.regime).join(",") !== "nominal,indexed")
    throw new N(
      "Replay must contain aligned nominal and indexed runs."
    );
  const s = t.runs[0], a = t.runs[1], o = t.scenario_pairing;
  if (!o || o.nominal_run_id !== s.run_id || o.indexed_run_id !== a.run_id || o.shared_seed !== t.manifest.seed || o.shared_initialization !== !0 || o.shared_shock_path !== !0 || !Array.isArray(o.shared_random_streams) || o.shared_random_streams.length === 0 || typeof o.structural_difference != "string" || o.structural_difference.length === 0)
    throw new N("Replay pairing metadata is invalid.");
  if (typeof e == "number" && e > t.manifest.maximum_uncompressed_bytes)
    throw new N(
      "Replay exceeds its declared payload-size limit."
    );
  for (const l of t.representative_agents)
    if (typeof l.matched_household_id != "string" || l.track.length !== i.length || l.track.some((u, h) => u.month !== i[h]))
      throw new N(
        "Representative track alignment or counterpart ID is invalid."
      );
  const c = /* @__PURE__ */ new Map();
  for (const l of t.aggregate_series) {
    const u = l.name, h = c.get(u);
    if (h && (h.unit !== l.unit || h.nominal_status !== l.nominal_status))
      throw new N(
        "Paired aggregate series units are not aligned."
      );
    if (l.points.length !== i.length || l.points.some((d, f) => d.month !== i[f]))
      throw new N(
        "Paired aggregate series timeline is not aligned."
      );
    c.set(u, l);
  }
  return t;
}
class W extends Error {
  constructor(e, n, r) {
    super(n, r), this.name = "ReplayLoadError", this.kind = e;
  }
}
async function yl(t) {
  const e = new Uint8Array(await t.arrayBuffer());
  if (!(e[0] === 31 && e[1] === 139)) return e;
  if (typeof DecompressionStream > "u")
    throw new W(
      "decode",
      "This browser cannot decompress the published replay. Use the static summary instead."
    );
  try {
    const r = new Blob([e]).stream().pipeThrough(new DecompressionStream("gzip"));
    return new Uint8Array(await new Response(r).arrayBuffer());
  } catch (r) {
    throw new W(
      "decode",
      "The replay could not be decompressed.",
      { cause: r }
    );
  }
}
async function kr(t, e = {}) {
  const n = e.fetcher ?? fetch;
  let r;
  try {
    const a = {
      headers: { Accept: "application/json, application/gzip" }
    };
    e.signal !== void 0 && (a.signal = e.signal), r = await n(t, a);
  } catch (a) {
    throw a instanceof DOMException && a.name === "AbortError" ? a : new W("network", "The replay could not be reached.", {
      cause: a
    });
  }
  if (!r.ok)
    throw new W(
      "network",
      `The replay request failed with status ${r.status}.`
    );
  const i = await yl(r);
  let s;
  try {
    s = JSON.parse(new TextDecoder().decode(i));
  } catch (a) {
    throw new W("decode", "The replay is not valid JSON.", {
      cause: a
    });
  }
  try {
    return gl(s, i.byteLength);
  } catch (a) {
    throw a instanceof N ? new W("compatibility", a.message, {
      cause: a
    }) : a;
  }
}
const B = {
  households: "Households",
  firms: "Firms and shops",
  banks: "Banks",
  government: "Government",
  central_bank: "Central bank",
  foreign: "Foreign sector and harbor"
}, On = {
  wages: "Wages",
  consumption: "Consumption",
  imports: "Imports",
  interest: "Interest",
  principal_payment: "Principal payment",
  bank_dividend: "Bank dividend"
};
function $(t, e) {
  return t === null ? "Not available" : e === "ISK" ? `${new Intl.NumberFormat("en-IS").format(t)} ISK` : e === "basis_points" ? `${(t / 100).toFixed(2)}%` : e === "index" ? (t / 1e3).toFixed(3) : e === "households" ? `${new Intl.NumberFormat("en-IS").format(t)} households` : e === "physical_units" ? `${new Intl.NumberFormat("en-IS").format(t)} units` : new Intl.NumberFormat("en-IS").format(t);
}
function Vt(t, e, n) {
  return t.find(e)?.month ?? n;
}
function vl(t, e) {
  const n = t.manifest.months[0], r = Vt(
    t.events,
    (u) => u.regime === e && u.event_type === "FX_SHOCK",
    n
  ), i = Vt(
    t.sector_flows,
    (u) => u.regime === e && u.flow_type === "imports" && u.month >= r,
    r
  ), s = t.aggregate_series.find(
    (u) => u.regime === e && u.name === "cpi_level"
  ), a = s?.points[0]?.value, o = s?.points.find(
    (u) => u.month >= r && u.value !== null && a !== null && u.value !== a
  )?.month ?? r, c = Vt(
    t.events,
    (u) => u.regime === e && u.event_type === "CPI_REVALUATION",
    o
  ), l = Vt(
    t.events,
    (u) => u.regime === e && ["ARREARS", "DEFAULT", "POLICY_RATE_CHANGE"].includes(u.event_type),
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
      summary: e === "indexed" ? "Lagged CPI growth is posted to indexed mortgage principal on both household and bank balance sheets." : "This nominal run records no CPI principal revaluation; debt changes through payments and rate resets.",
      trace: e === "indexed" ? "CPI_REVALUATION event and mirrored mortgage positions." : "Mortgage principal series and settlement flows.",
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
function Sr(t, e, n, r) {
  const i = t.aggregate_series.find(
    (s) => s.regime === e && s.name === n
  );
  return i ? {
    value: i.points.find((s) => s.month === r)?.value ?? null,
    unit: i.unit
  } : null;
}
const zn = [
  { name: "cpi_level", label: "CPI" },
  { name: "policy_rate", label: "Policy rate" },
  { name: "mortgage_principal", label: "Mortgage principal" },
  { name: "debt_service", label: "Debt service" },
  { name: "consumption", label: "Consumption" },
  { name: "defaults", label: "Defaults" },
  { name: "bank_equity", label: "Bank equity" }
];
function bl(t, e) {
  const n = t.aggregate_series.find(
    (s) => s.regime === "nominal" && s.name === e
  ), r = t.aggregate_series.find(
    (s) => s.regime === "indexed" && s.name === e
  );
  if (!n || !r || n.unit !== r.unit) return null;
  const i = new Map(
    r.points.map((s) => [s.month, s.value])
  );
  return {
    name: e,
    unit: n.unit,
    points: n.points.map((s) => {
      const a = i.get(s.month) ?? null;
      return {
        month: s.month,
        nominal: s.value,
        indexed: a,
        difference: s.value === null || a === null ? null : a - s.value
      };
    })
  };
}
function _l(t, e, n, r) {
  const i = t.distribution_series.filter(
    (a) => a.month === e && a.dimension === n
  ), s = new Map(
    i.filter((a) => a.regime === "nominal").map((a) => [a.cohort, a[r]])
  );
  return i.filter((a) => a.regime === "indexed").filter((a) => s.has(a.cohort)).map((a) => ({
    cohort: a.cohort,
    nominal: s.get(a.cohort),
    indexed: a[r],
    difference: a[r] - s.get(a.cohort)
  })).sort((a, o) => a.cohort.localeCompare(o.cohort));
}
function wl(t, e, n) {
  const r = t.representative_agents.find(
    (o) => o.regime === e && o.household_id === n
  );
  if (!r) return null;
  const i = e === "nominal" ? "indexed" : "nominal", s = t.representative_agents.find(
    (o) => o.regime === i && o.household_id === r.matched_household_id && o.matched_household_id === r.household_id
  );
  if (s)
    return {
      kind: "individual",
      cohort: r.cohort,
      nominalId: e === "nominal" ? r.household_id : s.household_id,
      indexedId: e === "indexed" ? r.household_id : s.household_id
    };
  const a = t.representative_agents.find(
    (o) => o.regime === i && o.cohort === r.cohort
  );
  return {
    kind: "cohort",
    cohort: r.cohort,
    nominalId: e === "nominal" ? r.household_id : a?.household_id ?? null,
    indexedId: e === "indexed" ? r.household_id : a?.household_id ?? null
  };
}
class xl extends EventTarget {
  #t = [];
  #e = 0;
  #n = null;
  get months() {
    return this.#t;
  }
  get monthIndex() {
    return this.#e;
  }
  get month() {
    return this.#t[this.#e] ?? null;
  }
  get selection() {
    return this.#n;
  }
  configure(e, n) {
    this.#t = [...e];
    const r = n === void 0 ? -1 : this.#t.indexOf(n);
    this.#e = r >= 0 ? r : 0, this.#n = null, this.#r("configure");
  }
  setMonthIndex(e) {
    if (this.#t.length === 0) return;
    const n = Math.max(
      0,
      Math.min(Math.trunc(e), this.#t.length - 1)
    );
    n !== this.#e && (this.#e = n, this.#r("month"));
  }
  select(e) {
    this.#n?.kind === e?.kind && this.#n?.id === e?.id || (this.#n = e, this.#r("selection"));
  }
  #r(e) {
    this.dispatchEvent(new CustomEvent("change", { detail: { reason: e } }));
  }
}
class Ge extends Error {
  constructor(e, n) {
    super(n), this.name = "LaboratoryError", this.code = e;
  }
}
async function Je(t, e, n) {
  const r = await n(t, e), i = await r.json().catch(() => null);
  if (!r.ok)
    throw new Ge(
      i?.error?.code ?? `http_${r.status}`,
      i?.error?.message ?? `The experiment service returned ${r.status}.`
    );
  return i;
}
async function $l(t, e, n = {}) {
  const r = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(e)
  };
  return n.signal !== void 0 && (r.signal = n.signal), Je(
    `${t.replace(/\/$/, "")}/experiments`,
    r,
    n.fetcher ?? fetch
  );
}
async function kl(t, e = {}) {
  const n = e.fetcher ?? fetch;
  for (; ; ) {
    const r = {};
    e.signal !== void 0 && (r.signal = e.signal);
    const i = await Je(
      t,
      r,
      n
    );
    if (e.onProgress?.(i), i.status === "completed") return i;
    if (i.status === "failed" || i.status === "cancelled")
      throw new Ge(
        i.failure?.code ?? i.status,
        i.failure?.message ?? `The custom experiment was ${i.status}.`
      );
    await new Promise((s, a) => {
      const o = window.setTimeout(s, e.intervalMs ?? 750);
      e.signal?.addEventListener(
        "abort",
        () => {
          window.clearTimeout(o), a(new DOMException("Aborted", "AbortError"));
        },
        { once: !0 }
      );
    });
  }
}
async function Sl(t, e = {}) {
  await Je(t, { method: "DELETE" }, e.fetcher ?? fetch);
}
var Al = Object.defineProperty, Ml = Object.getOwnPropertyDescriptor, Ar = (t) => {
  throw TypeError(t);
}, x = (t, e, n, r) => {
  for (var i = r > 1 ? void 0 : r ? Ml(e, n) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (i = (r ? a(e, n, i) : a(i)) || i);
  return r && i && Al(e, n, i), i;
}, Ze = (t, e, n) => e.has(t) || Ar("Cannot " + n), k = (t, e, n) => (Ze(t, e, "read from private field"), n ? n.call(t) : e.get(t)), O = (t, e, n) => e.has(t) ? Ar("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, n), Y = (t, e, n, r) => (Ze(t, e, "write to private field"), e.set(t, n), n), w = (t, e, n) => (Ze(t, e, "access private method"), n), lt, mt, Rt, It, at, ct, xt, Zt, Qt, b, ye, Ne, Re, Mr, Er, Cr, Nr, Rr, Ir, Pr, Tr, qr, Or, zr, Lr, Ie, Dr, Pe, Hr;
const Ur = [
  "households",
  "firms",
  "banks",
  "government",
  "central_bank",
  "foreign"
], Xt = {
  households: [16, 58],
  firms: [46, 25],
  banks: [47, 76],
  government: [72, 25],
  central_bank: [73, 76],
  foreign: [84, 50]
}, El = [
  ["cpi_level", "CPI"],
  ["monthly_inflation", "Monthly inflation"],
  ["mortgage_principal", "Mortgage principal"],
  ["consumption", "Consumption"]
];
let _ = class extends kt {
  constructor() {
    super(), O(this, b), this.src = "", this.initialMonth = "", this.staticMode = !1, this.apiBase = "", this.status = "empty", this.replay = null, this.message = "", this.revision = 0, this.reducedMotion = !1, this.mode = "story", this.playing = !1, this.speed = 1, this.storyIndex = 0, this.activeRegime = "indexed", this.comparisonView = "split", this.selectedMetric = "cpi_level", this.cohortDimension = "income_quintile", this.cohortMeasure = "consumption_isk", this.cameraSector = "households", this.visible = !0, this.laboratoryStatus = "idle", this.laboratoryProgress = 0, this.laboratoryMessage = "", this.customReplay = !1, this.replayState = new xl(), O(this, lt, null), O(this, mt), O(this, Rt, ""), O(this, It), O(this, at), O(this, ct, null), O(this, xt), O(this, Zt, (t) => {
      this.reducedMotion = t.matches;
    }), O(this, Qt, (t) => {
      if (this.status === "ready") {
        if (t.key === "ArrowLeft")
          this.setMonth(this.replayState.monthIndex - 1);
        else if (t.key === "ArrowRight")
          this.setMonth(this.replayState.monthIndex + 1);
        else if (t.key === "Home") this.setMonth(0);
        else if (t.key === "End")
          this.setMonth(this.replayState.months.length - 1);
        else if (t.key === " ")
          this.playing ? this.pause() : this.play();
        else return;
        t.preventDefault();
      }
    }), this.replayState.addEventListener("change", (t) => {
      this.revision += 1;
      const e = t.detail.reason;
      e === "month" && this.replayState.month !== null && this.dispatchEvent(
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
      ), e === "selection" && this.dispatchEvent(
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
    super.connectedCallback(), this.setAttribute("role", "region"), this.setAttribute("aria-label", "Ecodeling economic replay"), this.hasAttribute("tabindex") || (this.tabIndex = 0), typeof window.matchMedia == "function" && (Y(this, at, window.matchMedia("(prefers-reduced-motion: reduce)")), this.reducedMotion = k(this, at).matches, k(this, at).addEventListener("change", k(this, Zt))), typeof IntersectionObserver < "u" && (Y(this, xt, new IntersectionObserver(([t]) => {
      this.visible = t?.isIntersecting ?? !0, w(this, b, Ne).call(this);
    })), k(this, xt).observe(this)), this.addEventListener("keydown", k(this, Qt));
  }
  disconnectedCallback() {
    k(this, It)?.abort(), k(this, mt)?.abort(), w(this, b, ye).call(this), k(this, xt)?.disconnect(), k(this, at)?.removeEventListener("change", k(this, Zt)), this.removeEventListener("keydown", k(this, Qt)), super.disconnectedCallback();
  }
  updated(t) {
    t.has("src") && w(this, b, Re).call(this), (t.has("playing") || t.has("speed") || t.has("staticMode") || t.has("reducedMotion")) && w(this, b, Ne).call(this);
  }
  async reload() {
    await w(this, b, Re).call(this);
  }
  setMonth(t) {
    this.replayState.setMonthIndex(t), t >= this.replayState.months.length - 1 && (this.playing = !1);
  }
  select(t) {
    this.replayState.select(t);
  }
  play() {
    this.staticMode || this.replayState.months.length === 0 || (this.replayState.monthIndex >= this.replayState.months.length - 1 && this.setMonth(0), this.playing = !0);
  }
  pause() {
    this.playing = !1;
  }
  restart() {
    this.pause(), this.setMonth(0);
  }
  render() {
    return this.revision, p`
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
        ${w(this, b, Mr).call(this)}
      </div>
    `;
  }
};
lt = /* @__PURE__ */ new WeakMap();
mt = /* @__PURE__ */ new WeakMap();
Rt = /* @__PURE__ */ new WeakMap();
It = /* @__PURE__ */ new WeakMap();
at = /* @__PURE__ */ new WeakMap();
ct = /* @__PURE__ */ new WeakMap();
xt = /* @__PURE__ */ new WeakMap();
Zt = /* @__PURE__ */ new WeakMap();
Qt = /* @__PURE__ */ new WeakMap();
b = /* @__PURE__ */ new WeakSet();
ye = function() {
  k(this, ct) !== null && window.clearInterval(k(this, ct)), Y(this, ct, null);
};
Ne = function() {
  if (w(this, b, ye).call(this), !this.playing || !this.visible || this.staticMode) return;
  const t = (this.reducedMotion ? 1400 : 900) / this.speed;
  Y(this, ct, window.setInterval(() => {
    const e = this.replayState.monthIndex + 1;
    if (e >= this.replayState.months.length) {
      this.pause();
      return;
    }
    this.setMonth(e);
  }, t));
};
Re = async function() {
  if (k(this, It)?.abort(), w(this, b, ye).call(this), this.replay = null, this.message = "", this.playing = !1, this.src.trim() === "") {
    this.status = "empty";
    return;
  }
  const t = new AbortController();
  Y(this, It, t), this.status = "loading";
  try {
    const e = await kr(this.src, { signal: t.signal });
    if (t.signal.aborted) return;
    this.replay = e, Y(this, lt, e), this.customReplay = !1, this.replayState.configure(
      e.manifest.months,
      this.initialMonth || void 0
    ), this.activeRegime = e.runs.some((n) => n.regime === "indexed") ? "indexed" : e.runs[0]?.regime ?? "nominal", this.status = "ready", this.dispatchEvent(
      new CustomEvent("ecodeling-ready", {
        bubbles: !0,
        composed: !0,
        detail: {
          bundleId: e.manifest.bundle_id,
          months: e.manifest.months.length
        }
      })
    );
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") return;
    const n = e instanceof W ? e : new W("decode", "The replay could not be prepared.", {
      cause: e
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
Mr = function() {
  return this.status === "loading" ? p`<section class="state" aria-live="polite">
        <span class="seed" aria-hidden="true"></span>
        <div>
          <h2>Loading replay</h2>
          <p>Reading and validating the published result bundle.</p>
        </div>
      </section>` : this.status === "error" ? p`<section class="state error" role="alert">
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
      </section>` : this.status === "empty" || this.replay === null ? p`<section class="state empty">
        <div>
          <h2>Replay not loaded</h2>
          <p>
            Set the <code>src</code> attribute to a validated replay v1 bundle.
          </p>
        </div>
        <slot name="fallback"></slot>
      </section>` : w(this, b, Er).call(this, this.replay);
};
Er = function(t) {
  const e = t.manifest.months.length - 1, n = gr().domain([0, Math.max(e, 1)]).range([0, 100])(this.replayState.monthIndex), r = this.replayState.month ?? t.manifest.months[0], i = t.timeline[this.replayState.monthIndex], s = vl(t, this.activeRegime), a = s[this.storyIndex] ?? s[0];
  return p`
      <section class="ready">
        <nav class="mode-tabs" aria-label="Experience mode">
          ${[
    "story",
    "explore",
    "compare",
    ...this.apiBase.trim() === "" ? [] : ["laboratory"]
  ].map(
    (o) => p`<button
                type="button"
                class=${this.mode === o ? "active" : ""}
                aria-current=${this.mode === o ? "page" : y}
                @click=${() => this.mode = o}
              >
                ${o === "story" ? "Story" : o === "explore" ? "Explore" : o === "compare" ? "Compare" : "Laboratory"}
              </button>`
  )}
          <span
            >${this.reducedMotion || this.staticMode ? "Reduced motion" : "Motion on"}</span
          >
        </nav>

        <div class="month-ribbon">
          <div class="month-copy">
            <span>Simulation month</span><strong>${r}</strong>
          </div>
          <div class="timeline-wrap">
            <input
              aria-label="Simulation month"
              type="range"
              min="0"
              max=${e}
              .value=${String(this.replayState.monthIndex)}
              @input=${(o) => this.setMonth(
    Number(o.currentTarget.value)
  )}
              style=${`--progress: ${n}%`}
            />
            <div class="range-labels" aria-hidden="true">
              <span>${t.manifest.months[0]}</span
              ><span>${t.manifest.months[e]}</span>
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
          ${t.timeline.map(
    (o) => o.shock || o.policy_decision ? p`<button
                  type="button"
                  @click=${() => this.setMonth(o.index)}
                  title=${`${o.month}: ${o.shock ? "shock" : "policy decision"}`}
                >
                  <span>${o.shock ? "Shock" : "Policy"}</span
                  ><small>${o.month}</small>
                </button>` : y
  )}
          ${!i?.shock && !i?.policy_decision ? p`<span class="quiet-marker">No event marker this month</span>` : y}
        </div>

        ${this.mode === "laboratory" ? w(this, b, Pr).call(this) : this.mode === "compare" ? w(this, b, Lr).call(this, t, r) : p`${this.mode === "story" ? w(this, b, Tr).call(this, s, a) : y}
                <div class="shell-grid">
                  ${w(this, b, qr).call(this, t, r, a)}
                  ${w(this, b, Or).call(this, t, r)}
                </div>
                ${w(this, b, zr).call(this, t, r)}`}
        ${w(this, b, Hr).call(this, t)}
      </section>
    `;
};
Cr = function(t) {
  const e = new FormData(t), n = (r) => Number(e.get(r));
  return {
    months: n("months"),
    seed: n("seed"),
    households: n("households"),
    firms: n("firms"),
    indexation_lag_months: n("indexation_lag_months"),
    shock_kind: String(
      e.get("shock_kind")
    ),
    shock_month: n("shock_month"),
    shock_magnitude_bps: n("shock_magnitude_bps"),
    shock_persistence: String(
      e.get("shock_persistence")
    ),
    import_share_bps: n("import_share_bps"),
    price_adjustment_bps: n("price_adjustment_bps")
  };
};
Nr = async function(t) {
  t.preventDefault(), k(this, mt)?.abort();
  const e = new AbortController();
  Y(this, mt, e), this.laboratoryStatus = "submitting", this.laboratoryProgress = 0, this.laboratoryMessage = "Validating the public parameter set.";
  try {
    const n = await $l(
      this.apiBase,
      w(this, b, Cr).call(this, t.currentTarget),
      { signal: e.signal }
    );
    Y(this, Rt, n.links.status), this.laboratoryStatus = n.status === "completed" ? "running" : "queued", this.laboratoryMessage = n.cached ? "Loading the immutable cached result." : "The experiment is in the bounded worker queue.";
    const r = await kl(n.links.status, {
      signal: e.signal,
      onProgress: (s) => {
        this.laboratoryStatus = s.status === "queued" ? "queued" : "running", this.laboratoryProgress = s.progress_percent, this.laboratoryMessage = s.status === "queued" ? "Waiting for a worker process." : "Python is running the paired simulation and replay checks.";
      }
    }), i = await kr(r.result_url ?? n.links.result, {
      signal: e.signal
    });
    this.replay = i, this.replayState.configure(i.manifest.months), this.customReplay = !0, this.laboratoryStatus = "completed", this.laboratoryProgress = 100, this.laboratoryMessage = `Loaded ${i.manifest.bundle_id}. Reproducibility metadata is shown below.`;
  } catch (n) {
    if (n instanceof DOMException && n.name === "AbortError") return;
    this.laboratoryStatus = "failed", this.laboratoryMessage = n instanceof Ge || n instanceof Error ? n.message : "The custom experiment failed.";
  }
};
Rr = async function() {
  if (k(this, Rt) !== "")
    try {
      await Sl(k(this, Rt)), k(this, mt)?.abort(), this.laboratoryStatus = "idle", this.laboratoryMessage = "The queued experiment was cancelled safely.";
    } catch (t) {
      this.laboratoryMessage = t instanceof Error ? `${t.message} The canonical replay is still available.` : "The job could not be cancelled safely.";
    }
};
Ir = function() {
  k(this, lt) !== null && (this.replay = k(this, lt), this.replayState.configure(
    k(this, lt).manifest.months,
    this.initialMonth || void 0
  ), this.customReplay = !1, this.laboratoryStatus = "idle", this.laboratoryMessage = "Restored the published canonical replay.");
};
Pr = function() {
  const t = ["submitting", "queued", "running"].includes(
    this.laboratoryStatus
  );
  return p`<section class="laboratory" aria-labelledby="laboratory-title">
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
        @submit=${(e) => {
    w(this, b, Nr).call(this, e);
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
          <button class="primary" type="submit" ?disabled=${t}>
            ${this.laboratoryStatus === "failed" ? "Retry experiment" : "Run experiment"}
          </button>
          ${t ? p`<button
                type="button"
                @click=${() => {
    w(this, b, Rr).call(this);
  }}
              >
                Cancel if queued
              </button>` : y}
          ${this.customReplay ? p`<button
                type="button"
                @click=${() => w(this, b, Ir).call(this)}
              >
                Restore canonical replay
              </button>` : y}
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
Tr = function(t, e) {
  return p`<section class="story-panel" aria-labelledby="story-title">
      <div class="story-copy">
        <p class="eyebrow">Scene ${this.storyIndex + 1} of ${t.length}</p>
        <h2 id="story-title">${e.title}</h2>
        <p>${e.summary}</p>
        <small>Replay trace: ${e.trace}</small>
      </div>
      <ol>
        ${t.map(
    (n, r) => p`<li>
              <button
                type="button"
                class=${r === this.storyIndex ? "active" : ""}
                aria-current=${r === this.storyIndex ? "step" : y}
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
qr = function(t, e, n) {
  const r = t.sector_flows.filter(
    (o) => o.regime === this.activeRegime && o.month === e
  ), i = Math.max(...r.map((o) => o.amount_isk), 1), s = Vo().domain([0, i]).range([0.8, 2.4]), a = new Set(this.mode === "story" ? n.focus : []);
  return p`<section class="stage" aria-labelledby="stage-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow">${this.activeRegime} economy</p>
          <h2 id="stage-title">Recorded economic circuit</h2>
        </div>
        <div class="regime-toggle" aria-label="Run selection">
          ${t.runs.map(
    (o) => p`<button
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
          aria-label=${`${r.length} recorded aggregate flows in ${e}`}
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
    const [c, l] = Xt[o.source_sector], [u, h] = Xt[o.target_sector], d = `${On[o.flow_type]}: ${$(
      o.amount_isk,
      "ISK"
    )}; ${B[o.source_sector]} to ${B[o.target_sector]}; ledger entry ${o.ledger_entry_id}`;
    return Tn`<g class="flow">
              <line
                x1=${c}
                y1=${l}
                x2=${u}
                y2=${h}
                style=${`stroke:#d8a955;stroke-width:${s(o.amount_isk)}px;opacity:.72`}
                marker-end="url(#arrow)"
                ><title>${d}</title></line
              >
              ${!this.reducedMotion && !this.staticMode ? Tn`<circle r="1.25">
                    <title>${d}</title>
                    <animateMotion
                      dur=${`${3 / this.speed}s`}
                      repeatCount="indefinite"
                      path=${`M ${c} ${l} L ${u} ${h}`}
                    ></animateMotion>
                  </circle>` : y}
            </g>`;
  })}
        </svg>
        <div class="sector-field">
          ${Ur.map((o) => {
    const c = t.sector_snapshots.find(
      (u) => u.regime === this.activeRegime && u.month === e && u.sector === o
    ), l = this.replayState.selection?.kind === "sector" && this.replayState.selection.id === o;
    return p`<button
              type="button"
              class=${`sector ${o.replace("_", "-")} ${a.has(o) ? "focused" : ""}`}
              style=${`--x:${Xt[o][0]}%;--y:${Xt[o][1]}%`}
              aria-pressed=${l ? "true" : "false"}
              @click=${() => this.select({ kind: "sector", id: o })}
              title=${`${B[o]}. Equity: ${$(
      c?.equity_isk ?? null,
      "ISK"
    )}`}
            >
              <span aria-hidden="true"></span
              ><strong>${B[o]}</strong
              ><small
                >${c?.equity_isk === null || c === void 0 ? "Stock not modeled" : $(c.equity_isk, "ISK") + " equity"}</small
              >
            </button>`;
  })}
          <div class="cpi-orbit" title="Consumer price index">
            <span>CPI</span
            ><strong
              >${$(
    Sr(t, this.activeRegime, "cpi_level", e)?.value ?? null,
    "index"
  )}</strong
            >
          </div>
        </div>
      </div>
      <details class="flow-table">
        <summary>Exact flows for ${e}</summary>
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
    (o) => p`<tr>
                  <td>${On[o.flow_type]}</td>
                  <td>
                    ${B[o.source_sector]} →
                    ${B[o.target_sector]}
                  </td>
                  <td>${$(o.amount_isk, "ISK")}</td>
                  <td><code>${o.ledger_entry_id}</code></td>
                </tr>`
  )}
          </tbody>
        </table>
      </details>
    </section>`;
};
Or = function(t, e) {
  const n = t.events.filter(
    (c) => c.regime === this.activeRegime && c.month === e
  ), r = this.replayState.selection?.kind === "sector" ? this.replayState.selection.id : null, i = t.representative_agents.filter(
    (c) => c.regime === this.activeRegime
  ), s = this.replayState.selection?.kind === "agent" ? i.find(
    (c) => c.household_id === this.replayState.selection?.id
  ) : void 0, a = s?.track.find((c) => c.month === e), o = r ? t.sector_snapshots.find(
    (c) => c.regime === this.activeRegime && c.month === e && c.sector === r
  ) : void 0;
  return p`<section class="inspector" aria-labelledby="inspector-title">
      <p class="eyebrow">Inspect ${e}</p>
      <h2 id="inspector-title">Exact recorded values</h2>
      ${r && o ? p`<div class="inspection-card">
            <h3>${B[r]}</h3>
            <dl>
              <div>
                <dt>Financial assets</dt>
                <dd>${$(o.financial_assets_isk, "ISK")}</dd>
              </div>
              <div>
                <dt>Liabilities</dt>
                <dd>${$(o.liabilities_isk, "ISK")}</dd>
              </div>
              <div>
                <dt>Equity</dt>
                <dd>${$(o.equity_isk, "ISK")}</dd>
              </div>
              <div>
                <dt>Inventory</dt>
                <dd>
                  ${$(o.inventory_units, "physical_units")}
                </dd>
              </div>
            </dl>
          </div>` : y}
      ${s && a ? p`<div class="inspection-card">
            <h3>${s.cohort.replaceAll("_", " ")}</h3>
            <p><code>${s.household_id}</code></p>
            <dl>
              <div>
                <dt>Income</dt>
                <dd>${$(a.wage_income_isk, "ISK")}</dd>
              </div>
              <div>
                <dt>Consumption</dt>
                <dd>${$(a.consumption_isk, "ISK")}</dd>
              </div>
              <div>
                <dt>Mortgage</dt>
                <dd>${$(a.mortgage_principal_isk, "ISK")}</dd>
              </div>
              <div>
                <dt>Revaluation</dt>
                <dd>${$(a.mortgage_revaluation_isk, "ISK")}</dd>
              </div>
            </dl>
          </div>` : y}
      ${!r && !s ? p`<p class="instruction">
            Select a sector or representative household. Values remain tied to
            this replay month.
          </p>` : y}
      <h3>Representative households</h3>
      <div class="agent-list">
        ${i.map(
    (c) => p`<button
              type="button"
              aria-pressed=${s?.household_id === c.household_id ? "true" : "false"}
              @click=${() => this.select({ kind: "agent", id: c.household_id })}
            >
              <span>${c.cohort.replaceAll("_", " ")}</span
              ><small>${c.household_id}</small>
            </button>`
  )}
      </div>
      <h3>Events this month</h3>
      ${n.length === 0 ? p`<p>No typed event is recorded this month.</p>` : p`<ul class="event-list">
            ${n.map(
    (c) => p`<li>
                  <button
                    type="button"
                    @click=${() => this.select({ kind: "event", id: c.id })}
                  >
                    <strong>${c.event_type.replaceAll("_", " ")}</strong
                    ><span>${$(c.amount, c.unit)}</span
                    ><small>Source: ${c.source_id}</small>
                  </button>
                </li>`
  )}
          </ul>`}
    </section>`;
};
zr = function(t, e) {
  return p`<section class="metric-strip" aria-label="Recorded indicators">
      ${El.map(([n, r]) => {
    const i = Sr(t, this.activeRegime, n, e);
    return p`<div>
          <span>${r}</span
          ><strong
            >${$(i?.value ?? null, i?.unit ?? null)}</strong
          ><small>${this.activeRegime}, ${e}</small>
        </div>`;
  })}
    </section>`;
};
Lr = function(t, e) {
  const n = bl(t, this.selectedMetric), r = n?.points[this.replayState.monthIndex], i = [
    ...new Set(t.distribution_series.map((l) => l.dimension))
  ], s = _l(
    t,
    e,
    this.cohortDimension,
    this.cohortMeasure
  ), a = this.replayState.selection?.kind === "agent" ? this.replayState.selection.id : null, o = a ? t.representative_agents.find(
    (l) => l.household_id === a
  ) : void 0, c = o ? wl(
    t,
    o.regime,
    o.household_id
  ) : null;
  return p`<section class="comparison" aria-labelledby="compare-title">
      <div class="compare-heading">
        <div>
          <p class="eyebrow">Paired experiment</p>
          <h2 id="compare-title">One clock, two contract structures</h2>
          <p>
            Indexed minus nominal differences use the nominal run as the
            baseline. Both runs share seed
            ${t.scenario_pairing.shared_seed} and the recorded shock path.
          </p>
        </div>
        <div class="view-toggle" aria-label="Comparison view">
          ${["nominal", "split", "indexed"].map(
    (l) => p`<button
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
        ${this.comparisonView !== "indexed" ? w(this, b, Ie).call(this, t, "nominal", e) : y}
        ${this.comparisonView !== "nominal" ? w(this, b, Ie).call(this, t, "indexed", e) : y}
      </div>

      <section class="chart-panel" aria-labelledby="chart-title">
        <div class="chart-heading">
          <div>
            <p class="eyebrow">Synchronized analytical chart</p>
            <h3 id="chart-title">
              ${zn.find(
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
              ${zn.map(
    (l) => p`<option value=${l.name}>${l.label}</option>`
  )}
            </select></label
          >
        </div>
        ${n ? p`${w(this, b, Dr).call(this, n.points, n.unit, e)}
              <div class="difference-readout" aria-live="polite">
                <div>
                  <span>Nominal</span
                  ><strong
                    >${$(r?.nominal ?? null, n.unit)}</strong
                  >
                </div>
                <div>
                  <span>Indexed</span
                  ><strong
                    >${$(r?.indexed ?? null, n.unit)}</strong
                  >
                </div>
                <div class="difference">
                  <span>Indexed − nominal</span
                  ><strong
                    >${w(this, b, Pe).call(this, r?.difference ?? null, n.unit)}</strong
                  ><small>Nominal baseline, ${e}</small>
                </div>
              </div>` : p`<p>This paired metric is not available in the replay.</p>`}
      </section>

      <div class="comparison-detail-grid">
        <section class="cohort-panel" aria-labelledby="cohort-title">
          <div class="chart-heading">
            <div>
              <p class="eyebrow">Declared cohort comparison</p>
              <h3 id="cohort-title">Distribution at ${e}</h3>
            </div>
            <div class="cohort-controls">
              <label
                >Cohort dimension<select
                  aria-label="Cohort dimension"
                  .value=${this.cohortDimension}
                  @change=${(l) => this.cohortDimension = l.currentTarget.value}
                >
                  ${i.map(
    (l) => p`<option value=${l}>
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
                ${s.map(
    (l) => p`<tr>
                      <td>${l.cohort.replaceAll("_", " ")}</td>
                      <td>
                        ${$(
      l.nominal,
      this.cohortMeasure === "defaults" ? "households" : "ISK"
    )}
                      </td>
                      <td>
                        ${$(
      l.indexed,
      this.cohortMeasure === "defaults" ? "households" : "ISK"
    )}
                      </td>
                      <td>
                        ${w(this, b, Pe).call(this, l.difference, this.cohortMeasure === "defaults" ? "households" : "ISK")}
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
            ${t.representative_agents.filter((l) => l.regime === "nominal").map(
    (l) => p`<button
                    type="button"
                    aria-pressed=${a === l.household_id ? "true" : "false"}
                    @click=${() => this.select({ kind: "agent", id: l.household_id })}
                  >
                    <span>${l.cohort.replaceAll("_", " ")}</span>
                    <small>${l.household_id}</small>
                  </button>`
  )}
          </div>
          ${c ? p`<div class="match-result" role="status">
                <strong
                  >${c.kind === "individual" ? "Matched individual" : "Cohort comparison only"}</strong
                >
                <p>
                  ${c.kind === "individual" ? `Stable identity ${c.nominalId} is present in both regimes.` : `The identities do not correspond. Comparing the declared ${c.cohort.replaceAll("_", " ")} cohort instead.`}
                </p>
              </div>` : y}
        </section>
      </div>
    </section>`;
};
Ie = function(t, e, n) {
  const r = t.runs.find((i) => i.regime === e);
  return p`<article
      class=${`run-panel ${e}`}
      aria-label=${`${e} economy at ${n}`}
    >
      <div class="run-heading">
        <div>
          <span>${e === "nominal" ? "Nominal" : "Indexed"}</span>
          <strong>${n}</strong>
        </div>
        <small>${r.run_id}</small>
      </div>
      <p class="camera-label">
        Shared camera: ${B[this.cameraSector]}
      </p>
      <div class="sector-comparison" aria-label="Shared sector camera">
        ${Ur.map((i) => {
    const s = t.sector_snapshots.find(
      (a) => a.regime === e && a.month === n && a.sector === i
    );
    return p`<button
            type="button"
            aria-pressed=${this.cameraSector === i ? "true" : "false"}
            @click=${() => {
      this.cameraSector = i, this.select({ kind: "sector", id: i });
    }}
          >
            <span>${B[i]}</span>
            <strong>${$(s?.equity_isk ?? null, "ISK")}</strong>
            <small>equity</small>
          </button>`;
  })}
      </div>
    </article>`;
};
Dr = function(t, e, n) {
  const r = t.flatMap(
    (l) => [l.nominal, l.indexed].filter(
      (u) => u !== null
    )
  ), i = r.length > 0 ? Math.min(...r) : 0, a = (r.length > 0 ? Math.max(...r) : 1) - i || 1, o = (l) => {
    let u = !1;
    return t.map((h, d) => {
      const f = h[l];
      if (f === null)
        return u = !1, "";
      const g = 6 + d / Math.max(t.length - 1, 1) * 88, v = 90 - (f - i) / a * 76, A = u ? "L" : "M";
      return u = !0, `${A}${g.toFixed(2)},${v.toFixed(2)}`;
    }).join(" ");
  }, c = 6 + this.replayState.monthIndex / Math.max(t.length - 1, 1) * 88;
  return p`<div class="paired-chart">
      <svg
        viewBox="0 0 100 100"
        role="img"
        aria-label=${`Nominal and indexed ${this.selectedMetric} across ${t.length} aligned months; current month ${n}`}
        preserveAspectRatio="none"
      >
        <line class="chart-axis" x1="6" y1="90" x2="94" y2="90"></line>
        <line class="chart-axis" x1="6" y1="14" x2="6" y2="90"></line>
        <path class="nominal-line" d=${o("nominal")}></path>
        <path class="indexed-line" d=${o("indexed")}></path>
        <line
          class="shared-cursor"
          x1=${c}
          x2=${c}
          y1="10"
          y2="94"
        ></line>
      </svg>
      <div class="chart-legend">
        <span class="nominal-key">Nominal — solid</span>
        <span class="indexed-key">Indexed — dashed</span>
        <span>${e}</span>
      </div>
    </div>`;
};
Pe = function(t, e) {
  return t === null ? "Not available" : t === 0 ? $(0, e) : `${t > 0 ? "+" : "−"}${$(Math.abs(t), e)}`;
};
Hr = function(t) {
  return p`<details class="provenance">
      <summary>Replay provenance — ${t.manifest.scenario_id}</summary>
      <dl>
        <div>
          <dt>Bundle</dt>
          <dd>${t.manifest.bundle_id}</dd>
        </div>
        <div>
          <dt>Model</dt>
          <dd>${t.manifest.model_version}</dd>
        </div>
        <div>
          <dt>Seed</dt>
          <dd>${t.manifest.seed}</dd>
        </div>
        <div>
          <dt>Commit</dt>
          <dd><code>${t.manifest.git_commit}</code></dd>
        </div>
      </dl>
    </details>`;
};
_.styles = Ko`
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
x([
  Ot({ type: String })
], _.prototype, "src", 2);
x([
  Ot({ type: String, attribute: "initial-month" })
], _.prototype, "initialMonth", 2);
x([
  Ot({ type: Boolean, attribute: "static" })
], _.prototype, "staticMode", 2);
x([
  Ot({ type: String, attribute: "api-base" })
], _.prototype, "apiBase", 2);
x([
  S()
], _.prototype, "status", 2);
x([
  S()
], _.prototype, "replay", 2);
x([
  S()
], _.prototype, "message", 2);
x([
  S()
], _.prototype, "revision", 2);
x([
  S()
], _.prototype, "reducedMotion", 2);
x([
  S()
], _.prototype, "mode", 2);
x([
  S()
], _.prototype, "playing", 2);
x([
  S()
], _.prototype, "speed", 2);
x([
  S()
], _.prototype, "storyIndex", 2);
x([
  S()
], _.prototype, "activeRegime", 2);
x([
  S()
], _.prototype, "comparisonView", 2);
x([
  S()
], _.prototype, "selectedMetric", 2);
x([
  S()
], _.prototype, "cohortDimension", 2);
x([
  S()
], _.prototype, "cohortMeasure", 2);
x([
  S()
], _.prototype, "cameraSector", 2);
x([
  S()
], _.prototype, "visible", 2);
x([
  S()
], _.prototype, "laboratoryStatus", 2);
x([
  S()
], _.prototype, "laboratoryProgress", 2);
x([
  S()
], _.prototype, "laboratoryMessage", 2);
x([
  S()
], _.prototype, "customReplay", 2);
_ = x([
  fl("ecodeling-experience")
], _);
export {
  _ as EcodelingExperience,
  W as ReplayLoadError,
  xl as ReplayState,
  kr as loadReplay
};
