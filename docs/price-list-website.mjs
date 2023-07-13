var Er = Object.defineProperty;
var Ar = (r, t, e) => t in r ? Er(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var _ = (r, t, e) => (Ar(r, typeof t != "symbol" ? t + "" : t, e), e);
(function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload"))
    return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]'))
    i(n);
  new MutationObserver((n) => {
    for (const o of n)
      if (o.type === "childList")
        for (const s of o.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && i(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(n) {
    const o = {};
    return n.integrity && (o.integrity = n.integrity), n.referrerpolicy && (o.referrerPolicy = n.referrerpolicy), n.crossorigin === "use-credentials" ? o.credentials = "include" : n.crossorigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o;
  }
  function i(n) {
    if (n.ep)
      return;
    n.ep = !0;
    const o = e(n);
    fetch(n.href, o);
  }
})();
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt = window, Gt = dt.ShadowRoot && (dt.ShadyCSS === void 0 || dt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Qt = Symbol(), ee = /* @__PURE__ */ new WeakMap();
class Ie {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Qt)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Gt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = ee.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ee.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const Cr = (r) => new Ie(typeof r == "string" ? r : r + "", void 0, Qt), Pr = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, n, o) => i + ((s) => {
    if (s._$cssResult$ === !0)
      return s.cssText;
    if (typeof s == "number")
      return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[o + 1], r[0]);
  return new Ie(e, r, Qt);
}, Rr = (r, t) => {
  Gt ? r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const i = document.createElement("style"), n = dt.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, r.appendChild(i);
  });
}, re = Gt ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return Cr(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Tt;
const mt = window, ie = mt.trustedTypes, xr = ie ? ie.emptyScript : "", ne = mt.reactiveElementPolyfillSupport, Nt = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? xr : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, Le = (r, t) => t !== r && (t == t || r == r), Ot = { attribute: !0, type: String, converter: Nt, reflect: !1, hasChanged: Le };
class M extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(t) {
    var e;
    (e = this.h) !== null && e !== void 0 || (this.h = []), this.h.push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((e, i) => {
      const n = this._$Ep(i, e);
      n !== void 0 && (this._$Ev.set(n, i), t.push(n));
    }), t;
  }
  static createProperty(t, e = Ot) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const i = typeof t == "symbol" ? Symbol() : "__" + t, n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && Object.defineProperty(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    return { get() {
      return this[e];
    }, set(n) {
      const o = this[t];
      this[e] = n, this.requestUpdate(t, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || Ot;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const e = this.properties, i = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const n of i)
        this.createProperty(n, e[n]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const n of i)
        e.unshift(re(n));
    } else
      t !== void 0 && e.push(re(t));
    return e;
  }
  static _$Ep(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  u() {
    var t;
    this._$E_ = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, i;
    ((e = this._$ES) !== null && e !== void 0 ? e : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((i = t.hostConnected) === null || i === void 0 || i.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return Rr(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$EO(t, e, i = Ot) {
    var n;
    const o = this.constructor._$Ep(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const s = (((n = i.converter) === null || n === void 0 ? void 0 : n.toAttribute) !== void 0 ? i.converter : Nt).toAttribute(e, i.type);
      this._$El = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$El = null;
    }
  }
  _$AK(t, e) {
    var i;
    const n = this.constructor, o = n._$Ev.get(t);
    if (o !== void 0 && this._$El !== o) {
      const s = n.getPropertyOptions(o), l = typeof s.converter == "function" ? { fromAttribute: s.converter } : ((i = s.converter) === null || i === void 0 ? void 0 : i.fromAttribute) !== void 0 ? s.converter : Nt;
      this._$El = o, this[o] = l.fromAttribute(e, s.type), this._$El = null;
    }
  }
  requestUpdate(t, e, i) {
    let n = !0;
    t !== void 0 && (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || Le)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, i))) : n = !1), !this.isUpdatePending && n && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((n, o) => this[o] = n), this._$Ei = void 0);
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (t = this._$ES) === null || t === void 0 || t.forEach((n) => {
        var o;
        return (o = n.hostUpdate) === null || o === void 0 ? void 0 : o.call(n);
      }), this.update(i)) : this._$Ek();
    } catch (n) {
      throw e = !1, this._$Ek(), n;
    }
    e && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((i) => {
      var n;
      return (n = i.hostUpdated) === null || n === void 0 ? void 0 : n.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 && (this._$EC.forEach((e, i) => this._$EO(i, this[i], e)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
M.finalized = !0, M.elementProperties = /* @__PURE__ */ new Map(), M.elementStyles = [], M.shadowRootOptions = { mode: "open" }, ne == null || ne({ ReactiveElement: M }), ((Tt = mt.reactiveElementVersions) !== null && Tt !== void 0 ? Tt : mt.reactiveElementVersions = []).push("1.4.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var It;
const gt = window, q = gt.trustedTypes, oe = q ? q.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, O = `lit$${(Math.random() + "").slice(9)}$`, ke = "?" + O, Tr = `<${ke}>`, H = document, tt = (r = "") => H.createComment(r), et = (r) => r === null || typeof r != "object" && typeof r != "function", Ue = Array.isArray, Or = (r) => Ue(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", X = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, se = /-->/g, ae = />/g, k = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ce = /'/g, le = /"/g, Fe = /^(?:script|style|textarea|title)$/i, Ir = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), f = Ir(1), D = Symbol.for("lit-noChange"), b = Symbol.for("lit-nothing"), ue = /* @__PURE__ */ new WeakMap(), Lr = (r, t, e) => {
  var i, n;
  const o = (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0 ? i : t;
  let s = o._$litPart$;
  if (s === void 0) {
    const l = (n = e == null ? void 0 : e.renderBefore) !== null && n !== void 0 ? n : null;
    o._$litPart$ = s = new ot(t.insertBefore(tt(), l), l, void 0, e != null ? e : {});
  }
  return s._$AI(r), s;
}, B = H.createTreeWalker(H, 129, null, !1), kr = (r, t) => {
  const e = r.length - 1, i = [];
  let n, o = t === 2 ? "<svg>" : "", s = X;
  for (let a = 0; a < e; a++) {
    const c = r[a];
    let d, h, u = -1, p = 0;
    for (; p < c.length && (s.lastIndex = p, h = s.exec(c), h !== null); )
      p = s.lastIndex, s === X ? h[1] === "!--" ? s = se : h[1] !== void 0 ? s = ae : h[2] !== void 0 ? (Fe.test(h[2]) && (n = RegExp("</" + h[2], "g")), s = k) : h[3] !== void 0 && (s = k) : s === k ? h[0] === ">" ? (s = n != null ? n : X, u = -1) : h[1] === void 0 ? u = -2 : (u = s.lastIndex - h[2].length, d = h[1], s = h[3] === void 0 ? k : h[3] === '"' ? le : ce) : s === le || s === ce ? s = k : s === se || s === ae ? s = X : (s = k, n = void 0);
    const w = s === k && r[a + 1].startsWith("/>") ? " " : "";
    o += s === X ? c + Tr : u >= 0 ? (i.push(d), c.slice(0, u) + "$lit$" + c.slice(u) + O + w) : c + O + (u === -2 ? (i.push(void 0), a) : w);
  }
  const l = o + (r[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(r) || !r.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [oe !== void 0 ? oe.createHTML(l) : l, i];
};
class rt {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let o = 0, s = 0;
    const l = t.length - 1, a = this.parts, [c, d] = kr(t, e);
    if (this.el = rt.createElement(c, i), B.currentNode = this.el.content, e === 2) {
      const h = this.el.content, u = h.firstChild;
      u.remove(), h.append(...u.childNodes);
    }
    for (; (n = B.nextNode()) !== null && a.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) {
          const h = [];
          for (const u of n.getAttributeNames())
            if (u.endsWith("$lit$") || u.startsWith(O)) {
              const p = d[s++];
              if (h.push(u), p !== void 0) {
                const w = n.getAttribute(p.toLowerCase() + "$lit$").split(O), g = /([.?@])?(.*)/.exec(p);
                a.push({ type: 1, index: o, name: g[2], strings: w, ctor: g[1] === "." ? Fr : g[1] === "?" ? Nr : g[1] === "@" ? Br : Ct });
              } else
                a.push({ type: 6, index: o });
            }
          for (const u of h)
            n.removeAttribute(u);
        }
        if (Fe.test(n.tagName)) {
          const h = n.textContent.split(O), u = h.length - 1;
          if (u > 0) {
            n.textContent = q ? q.emptyScript : "";
            for (let p = 0; p < u; p++)
              n.append(h[p], tt()), B.nextNode(), a.push({ type: 2, index: ++o });
            n.append(h[u], tt());
          }
        }
      } else if (n.nodeType === 8)
        if (n.data === ke)
          a.push({ type: 2, index: o });
        else {
          let h = -1;
          for (; (h = n.data.indexOf(O, h + 1)) !== -1; )
            a.push({ type: 7, index: o }), h += O.length - 1;
        }
      o++;
    }
  }
  static createElement(t, e) {
    const i = H.createElement("template");
    return i.innerHTML = t, i;
  }
}
function V(r, t, e = r, i) {
  var n, o, s, l;
  if (t === D)
    return t;
  let a = i !== void 0 ? (n = e._$Cl) === null || n === void 0 ? void 0 : n[i] : e._$Cu;
  const c = et(t) ? void 0 : t._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== c && ((o = a == null ? void 0 : a._$AO) === null || o === void 0 || o.call(a, !1), c === void 0 ? a = void 0 : (a = new c(r), a._$AT(r, e, i)), i !== void 0 ? ((s = (l = e)._$Cl) !== null && s !== void 0 ? s : l._$Cl = [])[i] = a : e._$Cu = a), a !== void 0 && (t = V(r, a._$AS(r, t.values), a, i)), t;
}
class Ur {
  constructor(t, e) {
    this.v = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t) {
    var e;
    const { el: { content: i }, parts: n } = this._$AD, o = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : H).importNode(i, !0);
    B.currentNode = o;
    let s = B.nextNode(), l = 0, a = 0, c = n[0];
    for (; c !== void 0; ) {
      if (l === c.index) {
        let d;
        c.type === 2 ? d = new ot(s, s.nextSibling, this, t) : c.type === 1 ? d = new c.ctor(s, c.name, c.strings, this, t) : c.type === 6 && (d = new jr(s, this, t)), this.v.push(d), c = n[++a];
      }
      l !== (c == null ? void 0 : c.index) && (s = B.nextNode(), l++);
    }
    return o;
  }
  m(t) {
    let e = 0;
    for (const i of this.v)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class ot {
  constructor(t, e, i, n) {
    var o;
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$C_ = (o = n == null ? void 0 : n.isConnected) === null || o === void 0 || o;
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && e !== void 0 ? e : this._$C_;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = V(this, t, e), et(t) ? t === b || t == null || t === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : t !== this._$AH && t !== D && this.$(t) : t._$litType$ !== void 0 ? this.T(t) : t.nodeType !== void 0 ? this.k(t) : Or(t) ? this.O(t) : this.$(t);
  }
  S(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  k(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  $(t) {
    this._$AH !== b && et(this._$AH) ? this._$AA.nextSibling.data = t : this.k(H.createTextNode(t)), this._$AH = t;
  }
  T(t) {
    var e;
    const { values: i, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = rt.createElement(n.h, this.options)), n);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === o)
      this._$AH.m(i);
    else {
      const s = new Ur(o, this), l = s.p(this.options);
      s.m(i), this.k(l), this._$AH = s;
    }
  }
  _$AC(t) {
    let e = ue.get(t.strings);
    return e === void 0 && ue.set(t.strings, e = new rt(t)), e;
  }
  O(t) {
    Ue(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const o of t)
      n === e.length ? e.push(i = new ot(this.S(tt()), this.S(tt()), this, this.options)) : i = e[n], i._$AI(o), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const n = t.nextSibling;
      t.remove(), t = n;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$C_ = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class Ct {
  constructor(t, e, i, n, o) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = b;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, i, n) {
    const o = this.strings;
    let s = !1;
    if (o === void 0)
      t = V(this, t, e, 0), s = !et(t) || t !== this._$AH && t !== D, s && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = o[0], a = 0; a < o.length - 1; a++)
        c = V(this, l[i + a], e, a), c === D && (c = this._$AH[a]), s || (s = !et(c) || c !== this._$AH[a]), c === b ? t = b : t !== b && (t += (c != null ? c : "") + o[a + 1]), this._$AH[a] = c;
    }
    s && !n && this.P(t);
  }
  P(t) {
    t === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class Fr extends Ct {
  constructor() {
    super(...arguments), this.type = 3;
  }
  P(t) {
    this.element[this.name] = t === b ? void 0 : t;
  }
}
const Mr = q ? q.emptyScript : "";
class Nr extends Ct {
  constructor() {
    super(...arguments), this.type = 4;
  }
  P(t) {
    t && t !== b ? this.element.setAttribute(this.name, Mr) : this.element.removeAttribute(this.name);
  }
}
class Br extends Ct {
  constructor(t, e, i, n, o) {
    super(t, e, i, n, o), this.type = 5;
  }
  _$AI(t, e = this) {
    var i;
    if ((t = (i = V(this, t, e, 0)) !== null && i !== void 0 ? i : b) === D)
      return;
    const n = this._$AH, o = t === b && n !== b || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== b && (n === b || o);
    o && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && i !== void 0 ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class jr {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    V(this, t);
  }
}
const de = gt.litHtmlPolyfillSupport;
de == null || de(rt, ot), ((It = gt.litHtmlVersions) !== null && It !== void 0 ? It : gt.litHtmlVersions = []).push("2.3.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Lt, kt;
class m extends M {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = i.firstChild), i;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Lr(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return D;
  }
}
m.finalized = !0, m._$litElement$ = !0, (Lt = globalThis.litElementHydrateSupport) === null || Lt === void 0 || Lt.call(globalThis, { LitElement: m });
const he = globalThis.litElementPolyfillSupport;
he == null || he({ LitElement: m });
((kt = globalThis.litElementVersions) !== null && kt !== void 0 ? kt : globalThis.litElementVersions = []).push("3.2.2");
function yt(r) {
  return r = r || [], Array.isArray(r) ? r : [r];
}
function A(r) {
  return `[Vaadin.Router] ${r}`;
}
function qr(r) {
  if (typeof r != "object")
    return String(r);
  const t = Object.prototype.toString.call(r).match(/ (.*)\]$/)[1];
  return t === "Object" || t === "Array" ? `${t} ${JSON.stringify(r)}` : t;
}
const _t = "module", bt = "nomodule", Bt = [_t, bt];
function pe(r) {
  if (!r.match(/.+\.[m]?js$/))
    throw new Error(
      A(`Unsupported type for bundle "${r}": .js or .mjs expected.`)
    );
}
function Me(r) {
  if (!r || !E(r.path))
    throw new Error(
      A('Expected route config to be an object with a "path" string property, or an array of such objects')
    );
  const t = r.bundle, e = ["component", "redirect", "bundle"];
  if (!F(r.action) && !Array.isArray(r.children) && !F(r.children) && !$t(t) && !e.some((i) => E(r[i])))
    throw new Error(
      A(
        `Expected route config "${r.path}" to include either "${e.join('", "')}" or "action" function but none found.`
      )
    );
  if (t)
    if (E(t))
      pe(t);
    else if (Bt.some((i) => i in t))
      Bt.forEach((i) => i in t && pe(t[i]));
    else
      throw new Error(
        A('Expected route bundle to include either "' + bt + '" or "' + _t + '" keys, or both')
      );
  r.redirect && ["bundle", "component"].forEach((i) => {
    i in r && console.warn(
      A(
        `Route config "${r.path}" has both "redirect" and "${i}" properties, and "redirect" will always override the latter. Did you mean to only use "${i}"?`
      )
    );
  });
}
function fe(r) {
  yt(r).forEach((t) => Me(t));
}
function ve(r, t) {
  let e = document.head.querySelector('script[src="' + r + '"][async]');
  return e || (e = document.createElement("script"), e.setAttribute("src", r), t === _t ? e.setAttribute("type", _t) : t === bt && e.setAttribute(bt, ""), e.async = !0), new Promise((i, n) => {
    e.onreadystatechange = e.onload = (o) => {
      e.__dynamicImportLoaded = !0, i(o);
    }, e.onerror = (o) => {
      e.parentNode && e.parentNode.removeChild(e), n(o);
    }, e.parentNode === null ? document.head.appendChild(e) : e.__dynamicImportLoaded && i();
  });
}
function Hr(r) {
  return E(r) ? ve(r) : Promise.race(
    Bt.filter((t) => t in r).map((t) => ve(r[t], t))
  );
}
function Z(r, t) {
  return !window.dispatchEvent(new CustomEvent(
    `vaadin-router-${r}`,
    { cancelable: r === "go", detail: t }
  ));
}
function $t(r) {
  return typeof r == "object" && !!r;
}
function F(r) {
  return typeof r == "function";
}
function E(r) {
  return typeof r == "string";
}
function Ne(r) {
  const t = new Error(A(`Page not found (${r.pathname})`));
  return t.context = r, t.code = 404, t;
}
const N = new class {
}();
function Dr(r) {
  const t = r.port, e = r.protocol, o = e === "http:" && t === "80" || e === "https:" && t === "443" ? r.hostname : r.host;
  return `${e}//${o}`;
}
function me(r) {
  if (r.defaultPrevented || r.button !== 0 || r.shiftKey || r.ctrlKey || r.altKey || r.metaKey)
    return;
  let t = r.target;
  const e = r.composedPath ? r.composedPath() : r.path || [];
  for (let l = 0; l < e.length; l++) {
    const a = e[l];
    if (a.nodeName && a.nodeName.toLowerCase() === "a") {
      t = a;
      break;
    }
  }
  for (; t && t.nodeName.toLowerCase() !== "a"; )
    t = t.parentNode;
  if (!t || t.nodeName.toLowerCase() !== "a" || t.target && t.target.toLowerCase() !== "_self" || t.hasAttribute("download") || t.hasAttribute("router-ignore") || t.pathname === window.location.pathname && t.hash !== "" || (t.origin || Dr(t)) !== window.location.origin)
    return;
  const { pathname: n, search: o, hash: s } = t;
  Z("go", { pathname: n, search: o, hash: s }) && (r.preventDefault(), r && r.type === "click" && window.scrollTo(0, 0));
}
const Vr = {
  activate() {
    window.document.addEventListener("click", me);
  },
  inactivate() {
    window.document.removeEventListener("click", me);
  }
}, zr = /Trident/.test(navigator.userAgent);
zr && !F(window.PopStateEvent) && (window.PopStateEvent = function(r, t) {
  t = t || {};
  var e = document.createEvent("Event");
  return e.initEvent(r, Boolean(t.bubbles), Boolean(t.cancelable)), e.state = t.state || null, e;
}, window.PopStateEvent.prototype = window.Event.prototype);
function ge(r) {
  if (r.state === "vaadin-router-ignore")
    return;
  const { pathname: t, search: e, hash: i } = window.location;
  Z("go", { pathname: t, search: e, hash: i });
}
const Gr = {
  activate() {
    window.addEventListener("popstate", ge);
  },
  inactivate() {
    window.removeEventListener("popstate", ge);
  }
};
var J = Ve, Qr = Kt, Kr = Xr, Jr = qe, Wr = De, Be = "/", je = "./", Yr = new RegExp([
  "(\\\\.)",
  "(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"
].join("|"), "g");
function Kt(r, t) {
  for (var e = [], i = 0, n = 0, o = "", s = t && t.delimiter || Be, l = t && t.delimiters || je, a = !1, c; (c = Yr.exec(r)) !== null; ) {
    var d = c[0], h = c[1], u = c.index;
    if (o += r.slice(n, u), n = u + d.length, h) {
      o += h[1], a = !0;
      continue;
    }
    var p = "", w = r[n], g = c[2], at = c[3], L = c[4], C = c[5];
    if (!a && o.length) {
      var xt = o.length - 1;
      l.indexOf(o[xt]) > -1 && (p = o[xt], o = o.slice(0, xt));
    }
    o && (e.push(o), o = "", a = !1);
    var $r = p !== "" && w !== void 0 && w !== p, wr = C === "+" || C === "*", Sr = C === "?" || C === "*", Zt = p || s, te = at || L;
    e.push({
      name: g || i++,
      prefix: p,
      delimiter: Zt,
      optional: Sr,
      repeat: wr,
      partial: $r,
      pattern: te ? Zr(te) : "[^" + T(Zt) + "]+?"
    });
  }
  return (o || n < r.length) && e.push(o + r.substr(n)), e;
}
function Xr(r, t) {
  return qe(Kt(r, t));
}
function qe(r) {
  for (var t = new Array(r.length), e = 0; e < r.length; e++)
    typeof r[e] == "object" && (t[e] = new RegExp("^(?:" + r[e].pattern + ")$"));
  return function(i, n) {
    for (var o = "", s = n && n.encode || encodeURIComponent, l = 0; l < r.length; l++) {
      var a = r[l];
      if (typeof a == "string") {
        o += a;
        continue;
      }
      var c = i ? i[a.name] : void 0, d;
      if (Array.isArray(c)) {
        if (!a.repeat)
          throw new TypeError('Expected "' + a.name + '" to not repeat, but got array');
        if (c.length === 0) {
          if (a.optional)
            continue;
          throw new TypeError('Expected "' + a.name + '" to not be empty');
        }
        for (var h = 0; h < c.length; h++) {
          if (d = s(c[h], a), !t[l].test(d))
            throw new TypeError('Expected all "' + a.name + '" to match "' + a.pattern + '"');
          o += (h === 0 ? a.prefix : a.delimiter) + d;
        }
        continue;
      }
      if (typeof c == "string" || typeof c == "number" || typeof c == "boolean") {
        if (d = s(String(c), a), !t[l].test(d))
          throw new TypeError('Expected "' + a.name + '" to match "' + a.pattern + '", but got "' + d + '"');
        o += a.prefix + d;
        continue;
      }
      if (a.optional) {
        a.partial && (o += a.prefix);
        continue;
      }
      throw new TypeError('Expected "' + a.name + '" to be ' + (a.repeat ? "an array" : "a string"));
    }
    return o;
  };
}
function T(r) {
  return r.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function Zr(r) {
  return r.replace(/([=!:$/()])/g, "\\$1");
}
function He(r) {
  return r && r.sensitive ? "" : "i";
}
function ti(r, t) {
  if (!t)
    return r;
  var e = r.source.match(/\((?!\?)/g);
  if (e)
    for (var i = 0; i < e.length; i++)
      t.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: !1,
        repeat: !1,
        partial: !1,
        pattern: null
      });
  return r;
}
function ei(r, t, e) {
  for (var i = [], n = 0; n < r.length; n++)
    i.push(Ve(r[n], t, e).source);
  return new RegExp("(?:" + i.join("|") + ")", He(e));
}
function ri(r, t, e) {
  return De(Kt(r, e), t, e);
}
function De(r, t, e) {
  e = e || {};
  for (var i = e.strict, n = e.start !== !1, o = e.end !== !1, s = T(e.delimiter || Be), l = e.delimiters || je, a = [].concat(e.endsWith || []).map(T).concat("$").join("|"), c = n ? "^" : "", d = r.length === 0, h = 0; h < r.length; h++) {
    var u = r[h];
    if (typeof u == "string")
      c += T(u), d = h === r.length - 1 && l.indexOf(u[u.length - 1]) > -1;
    else {
      var p = u.repeat ? "(?:" + u.pattern + ")(?:" + T(u.delimiter) + "(?:" + u.pattern + "))*" : u.pattern;
      t && t.push(u), u.optional ? u.partial ? c += T(u.prefix) + "(" + p + ")?" : c += "(?:" + T(u.prefix) + "(" + p + "))?" : c += T(u.prefix) + "(" + p + ")";
    }
  }
  return o ? (i || (c += "(?:" + s + ")?"), c += a === "$" ? "$" : "(?=" + a + ")") : (i || (c += "(?:" + s + "(?=" + a + "))?"), d || (c += "(?=" + s + "|" + a + ")")), new RegExp(c, He(e));
}
function Ve(r, t, e) {
  return r instanceof RegExp ? ti(r, t) : Array.isArray(r) ? ei(r, t, e) : ri(r, t, e);
}
J.parse = Qr;
J.compile = Kr;
J.tokensToFunction = Jr;
J.tokensToRegExp = Wr;
const { hasOwnProperty: ii } = Object.prototype, jt = /* @__PURE__ */ new Map();
jt.set("|false", {
  keys: [],
  pattern: /(?:)/
});
function ye(r) {
  try {
    return decodeURIComponent(r);
  } catch {
    return r;
  }
}
function ni(r, t, e, i, n) {
  e = !!e;
  const o = `${r}|${e}`;
  let s = jt.get(o);
  if (!s) {
    const c = [];
    s = {
      keys: c,
      pattern: J(r, c, {
        end: e,
        strict: r === ""
      })
    }, jt.set(o, s);
  }
  const l = s.pattern.exec(t);
  if (!l)
    return null;
  const a = Object.assign({}, n);
  for (let c = 1; c < l.length; c++) {
    const d = s.keys[c - 1], h = d.name, u = l[c];
    (u !== void 0 || !ii.call(a, h)) && (d.repeat ? a[h] = u ? u.split(d.delimiter).map(ye) : [] : a[h] = u && ye(u));
  }
  return {
    path: l[0],
    keys: (i || []).concat(s.keys),
    params: a
  };
}
function ze(r, t, e, i, n) {
  let o, s, l = 0, a = r.path || "";
  return a.charAt(0) === "/" && (e && (a = a.substr(1)), e = !0), {
    next(c) {
      if (r === c)
        return { done: !0 };
      const d = r.__children = r.__children || r.children;
      if (!o && (o = ni(a, t, !d, i, n), o))
        return {
          done: !1,
          value: {
            route: r,
            keys: o.keys,
            params: o.params,
            path: o.path
          }
        };
      if (o && d)
        for (; l < d.length; ) {
          if (!s) {
            const u = d[l];
            u.parent = r;
            let p = o.path.length;
            p > 0 && t.charAt(p) === "/" && (p += 1), s = ze(
              u,
              t.substr(p),
              e,
              o.keys,
              o.params
            );
          }
          const h = s.next(c);
          if (!h.done)
            return {
              done: !1,
              value: h.value
            };
          s = null, l++;
        }
      return { done: !0 };
    }
  };
}
function oi(r) {
  if (F(r.route.action))
    return r.route.action(r);
}
function si(r, t) {
  let e = t;
  for (; e; )
    if (e = e.parent, e === r)
      return !0;
  return !1;
}
function ai(r) {
  let t = `Path '${r.pathname}' is not properly resolved due to an error.`;
  const e = (r.route || {}).path;
  return e && (t += ` Resolution had failed on route: '${e}'`), t;
}
function ci(r, t) {
  const { route: e, path: i } = t;
  if (e && !e.__synthetic) {
    const n = { path: i, route: e };
    if (!r.chain)
      r.chain = [];
    else if (e.parent) {
      let o = r.chain.length;
      for (; o-- && r.chain[o].route && r.chain[o].route !== e.parent; )
        r.chain.pop();
    }
    r.chain.push(n);
  }
}
class it {
  constructor(t, e = {}) {
    if (Object(t) !== t)
      throw new TypeError("Invalid routes");
    this.baseUrl = e.baseUrl || "", this.errorHandler = e.errorHandler, this.resolveRoute = e.resolveRoute || oi, this.context = Object.assign({ resolver: this }, e.context), this.root = Array.isArray(t) ? { path: "", __children: t, parent: null, __synthetic: !0 } : t, this.root.parent = null;
  }
  getRoutes() {
    return [...this.root.__children];
  }
  setRoutes(t) {
    fe(t);
    const e = [...yt(t)];
    this.root.__children = e;
  }
  addRoutes(t) {
    return fe(t), this.root.__children.push(...yt(t)), this.getRoutes();
  }
  removeRoutes() {
    this.setRoutes([]);
  }
  resolve(t) {
    const e = Object.assign(
      {},
      this.context,
      E(t) ? { pathname: t } : t
    ), i = ze(
      this.root,
      this.__normalizePathname(e.pathname),
      this.baseUrl
    ), n = this.resolveRoute;
    let o = null, s = null, l = e;
    function a(c, d = o.value.route, h) {
      const u = h === null && o.value.route;
      return o = s || i.next(u), s = null, !c && (o.done || !si(d, o.value.route)) ? (s = o, Promise.resolve(N)) : o.done ? Promise.reject(Ne(e)) : (l = Object.assign(
        l ? { chain: l.chain ? l.chain.slice(0) : [] } : {},
        e,
        o.value
      ), ci(l, o.value), Promise.resolve(n(l)).then((p) => p != null && p !== N ? (l.result = p.result || p, l) : a(c, d, p)));
    }
    return e.next = a, Promise.resolve().then(() => a(!0, this.root)).catch((c) => {
      const d = ai(l);
      if (c ? console.warn(d) : c = new Error(d), c.context = c.context || l, c instanceof DOMException || (c.code = c.code || 500), this.errorHandler)
        return l.result = this.errorHandler(c), l;
      throw c;
    });
  }
  static __createUrl(t, e) {
    return new URL(t, e);
  }
  get __effectiveBaseUrl() {
    return this.baseUrl ? this.constructor.__createUrl(
      this.baseUrl,
      document.baseURI || document.URL
    ).href.replace(/[^\/]*$/, "") : "";
  }
  __normalizePathname(t) {
    if (!this.baseUrl)
      return t;
    const e = this.__effectiveBaseUrl, i = this.constructor.__createUrl(t, e).href;
    if (i.slice(0, e.length) === e)
      return i.slice(e.length);
  }
}
it.pathToRegexp = J;
const { pathToRegexp: _e } = it, be = /* @__PURE__ */ new Map();
function Ge(r, t, e) {
  const i = t.name || t.component;
  if (i && (r.has(i) ? r.get(i).push(t) : r.set(i, [t])), Array.isArray(e))
    for (let n = 0; n < e.length; n++) {
      const o = e[n];
      o.parent = t, Ge(r, o, o.__children || o.children);
    }
}
function $e(r, t) {
  const e = r.get(t);
  if (e && e.length > 1)
    throw new Error(
      `Duplicate route with name "${t}". Try seting unique 'name' route properties.`
    );
  return e && e[0];
}
function we(r) {
  let t = r.path;
  return t = Array.isArray(t) ? t[0] : t, t !== void 0 ? t : "";
}
function li(r, t = {}) {
  if (!(r instanceof it))
    throw new TypeError("An instance of Resolver is expected");
  const e = /* @__PURE__ */ new Map();
  return (i, n) => {
    let o = $e(e, i);
    if (!o && (e.clear(), Ge(e, r.root, r.root.__children), o = $e(e, i), !o))
      throw new Error(`Route "${i}" not found`);
    let s = be.get(o.fullPath);
    if (!s) {
      let a = we(o), c = o.parent;
      for (; c; ) {
        const p = we(c);
        p && (a = p.replace(/\/$/, "") + "/" + a.replace(/^\//, "")), c = c.parent;
      }
      const d = _e.parse(a), h = _e.tokensToFunction(d), u = /* @__PURE__ */ Object.create(null);
      for (let p = 0; p < d.length; p++)
        E(d[p]) || (u[d[p].name] = !0);
      s = { toPath: h, keys: u }, be.set(a, s), o.fullPath = a;
    }
    let l = s.toPath(n, t) || "/";
    if (t.stringifyQueryParams && n) {
      const a = {}, c = Object.keys(n);
      for (let h = 0; h < c.length; h++) {
        const u = c[h];
        s.keys[u] || (a[u] = n[u]);
      }
      const d = t.stringifyQueryParams(a);
      d && (l += d.charAt(0) === "?" ? d : `?${d}`);
    }
    return l;
  };
}
let Se = [];
function ui(r) {
  Se.forEach((t) => t.inactivate()), r.forEach((t) => t.activate()), Se = r;
}
const di = (r) => {
  const t = getComputedStyle(r).getPropertyValue("animation-name");
  return t && t !== "none";
}, hi = (r, t) => {
  const e = () => {
    r.removeEventListener("animationend", e), t();
  };
  r.addEventListener("animationend", e);
};
function Ee(r, t) {
  return r.classList.add(t), new Promise((e) => {
    if (di(r)) {
      const i = r.getBoundingClientRect(), n = `height: ${i.bottom - i.top}px; width: ${i.right - i.left}px`;
      r.setAttribute("style", `position: absolute; ${n}`), hi(r, () => {
        r.classList.remove(t), r.removeAttribute("style"), e();
      });
    } else
      r.classList.remove(t), e();
  });
}
const pi = 256;
function Ut(r) {
  return r != null;
}
function fi(r) {
  const t = Object.assign({}, r);
  return delete t.next, t;
}
function S({ pathname: r = "", search: t = "", hash: e = "", chain: i = [], params: n = {}, redirectFrom: o, resolver: s }, l) {
  const a = i.map((c) => c.route);
  return {
    baseUrl: s && s.baseUrl || "",
    pathname: r,
    search: t,
    hash: e,
    routes: a,
    route: l || a.length && a[a.length - 1] || null,
    params: n,
    redirectFrom: o,
    getUrl: (c = {}) => pt(
      y.pathToRegexp.compile(
        Qe(a)
      )(Object.assign({}, n, c)),
      s
    )
  };
}
function Ae(r, t) {
  const e = Object.assign({}, r.params);
  return {
    redirect: {
      pathname: t,
      from: r.pathname,
      params: e
    }
  };
}
function vi(r, t) {
  t.location = S(r);
  const e = r.chain.map((i) => i.route).indexOf(r.route);
  return r.chain[e].element = t, t;
}
function ht(r, t, e) {
  if (F(r))
    return r.apply(e, t);
}
function Ce(r, t, e) {
  return (i) => {
    if (i && (i.cancel || i.redirect))
      return i;
    if (e)
      return ht(e[r], t, e);
  };
}
function mi(r, t) {
  if (!Array.isArray(r) && !$t(r))
    throw new Error(
      A(
        `Incorrect "children" value for the route ${t.path}: expected array or object, but got ${r}`
      )
    );
  t.__children = [];
  const e = yt(r);
  for (let i = 0; i < e.length; i++)
    Me(e[i]), t.__children.push(e[i]);
}
function ct(r) {
  if (r && r.length) {
    const t = r[0].parentNode;
    for (let e = 0; e < r.length; e++)
      t.removeChild(r[e]);
  }
}
function pt(r, t) {
  const e = t.__effectiveBaseUrl;
  return e ? t.constructor.__createUrl(r.replace(/^\//, ""), e).pathname : r;
}
function Qe(r) {
  return r.map((t) => t.path).reduce((t, e) => e.length ? t.replace(/\/$/, "") + "/" + e.replace(/^\//, "") : t, "");
}
class y extends it {
  constructor(t, e) {
    const i = document.head.querySelector("base"), n = i && i.getAttribute("href");
    super([], Object.assign({
      baseUrl: n && it.__createUrl(n, document.URL).pathname.replace(/[^\/]*$/, "")
    }, e)), this.resolveRoute = (s) => this.__resolveRoute(s);
    const o = y.NavigationTrigger;
    y.setTriggers.apply(y, Object.keys(o).map((s) => o[s])), this.baseUrl, this.ready, this.ready = Promise.resolve(t), this.location, this.location = S({ resolver: this }), this.__lastStartedRenderId = 0, this.__navigationEventHandler = this.__onNavigationEvent.bind(this), this.setOutlet(t), this.subscribe(), this.__createdByRouter = /* @__PURE__ */ new WeakMap(), this.__addedByRouter = /* @__PURE__ */ new WeakMap();
  }
  __resolveRoute(t) {
    const e = t.route;
    let i = Promise.resolve();
    F(e.children) && (i = i.then(() => e.children(fi(t))).then((o) => {
      !Ut(o) && !F(e.children) && (o = e.children), mi(o, e);
    }));
    const n = {
      redirect: (o) => Ae(t, o),
      component: (o) => {
        const s = document.createElement(o);
        return this.__createdByRouter.set(s, !0), s;
      }
    };
    return i.then(() => {
      if (this.__isLatestRender(t))
        return ht(e.action, [t, n], e);
    }).then((o) => {
      if (Ut(o) && (o instanceof HTMLElement || o.redirect || o === N))
        return o;
      if (E(e.redirect))
        return n.redirect(e.redirect);
      if (e.bundle)
        return Hr(e.bundle).then(() => {
        }, () => {
          throw new Error(A(`Bundle not found: ${e.bundle}. Check if the file name is correct`));
        });
    }).then((o) => {
      if (Ut(o))
        return o;
      if (E(e.component))
        return n.component(e.component);
    });
  }
  setOutlet(t) {
    t && this.__ensureOutlet(t), this.__outlet = t;
  }
  getOutlet() {
    return this.__outlet;
  }
  setRoutes(t, e = !1) {
    return this.__previousContext = void 0, this.__urlForName = void 0, super.setRoutes(t), e || this.__onNavigationEvent(), this.ready;
  }
  render(t, e) {
    const i = ++this.__lastStartedRenderId, n = Object.assign(
      {
        search: "",
        hash: ""
      },
      E(t) ? { pathname: t } : t,
      {
        __renderId: i
      }
    );
    return this.ready = this.resolve(n).then((o) => this.__fullyResolveChain(o)).then((o) => {
      if (this.__isLatestRender(o)) {
        const s = this.__previousContext;
        if (o === s)
          return this.__updateBrowserHistory(s, !0), this.location;
        if (this.location = S(o), e && this.__updateBrowserHistory(o, i === 1), Z("location-changed", { router: this, location: this.location }), o.__skipAttach)
          return this.__copyUnchangedElements(o, s), this.__previousContext = o, this.location;
        this.__addAppearingContent(o, s);
        const l = this.__animateIfNeeded(o);
        return this.__runOnAfterEnterCallbacks(o), this.__runOnAfterLeaveCallbacks(o, s), l.then(() => {
          if (this.__isLatestRender(o))
            return this.__removeDisappearingContent(), this.__previousContext = o, this.location;
        });
      }
    }).catch((o) => {
      if (i === this.__lastStartedRenderId)
        throw e && this.__updateBrowserHistory(n), ct(this.__outlet && this.__outlet.children), this.location = S(Object.assign(n, { resolver: this })), Z("error", Object.assign({ router: this, error: o }, n)), o;
    }), this.ready;
  }
  __fullyResolveChain(t, e = t) {
    return this.__findComponentContextAfterAllRedirects(e).then((i) => {
      const o = i !== e ? i : t, l = pt(
        Qe(i.chain),
        i.resolver
      ) === i.pathname, a = (c, d = c.route, h) => c.next(void 0, d, h).then((u) => u === null || u === N ? l ? c : d.parent !== null ? a(c, d.parent, u) : u : u);
      return a(i).then((c) => {
        if (c === null || c === N)
          throw Ne(o);
        return c && c !== N && c !== i ? this.__fullyResolveChain(o, c) : this.__amendWithOnBeforeCallbacks(i);
      });
    });
  }
  __findComponentContextAfterAllRedirects(t) {
    const e = t.result;
    return e instanceof HTMLElement ? (vi(t, e), Promise.resolve(t)) : e.redirect ? this.__redirect(e.redirect, t.__redirectCount, t.__renderId).then((i) => this.__findComponentContextAfterAllRedirects(i)) : e instanceof Error ? Promise.reject(e) : Promise.reject(
      new Error(
        A(
          `Invalid route resolution result for path "${t.pathname}". Expected redirect object or HTML element, but got: "${qr(e)}". Double check the action return value for the route.`
        )
      )
    );
  }
  __amendWithOnBeforeCallbacks(t) {
    return this.__runOnBeforeCallbacks(t).then((e) => e === this.__previousContext || e === t ? e : this.__fullyResolveChain(e));
  }
  __runOnBeforeCallbacks(t) {
    const e = this.__previousContext || {}, i = e.chain || [], n = t.chain;
    let o = Promise.resolve();
    const s = () => ({ cancel: !0 }), l = (a) => Ae(t, a);
    if (t.__divergedChainIndex = 0, t.__skipAttach = !1, i.length) {
      for (let a = 0; a < Math.min(i.length, n.length) && !(i[a].route !== n[a].route || i[a].path !== n[a].path && i[a].element !== n[a].element || !this.__isReusableElement(i[a].element, n[a].element)); a = ++t.__divergedChainIndex)
        ;
      if (t.__skipAttach = n.length === i.length && t.__divergedChainIndex == n.length && this.__isReusableElement(t.result, e.result), t.__skipAttach) {
        for (let a = n.length - 1; a >= 0; a--)
          o = this.__runOnBeforeLeaveCallbacks(o, t, { prevent: s }, i[a]);
        for (let a = 0; a < n.length; a++)
          o = this.__runOnBeforeEnterCallbacks(o, t, { prevent: s, redirect: l }, n[a]), i[a].element.location = S(t, i[a].route);
      } else
        for (let a = i.length - 1; a >= t.__divergedChainIndex; a--)
          o = this.__runOnBeforeLeaveCallbacks(o, t, { prevent: s }, i[a]);
    }
    if (!t.__skipAttach)
      for (let a = 0; a < n.length; a++)
        a < t.__divergedChainIndex ? a < i.length && i[a].element && (i[a].element.location = S(t, i[a].route)) : (o = this.__runOnBeforeEnterCallbacks(o, t, { prevent: s, redirect: l }, n[a]), n[a].element && (n[a].element.location = S(t, n[a].route)));
    return o.then((a) => {
      if (a) {
        if (a.cancel)
          return this.__previousContext.__renderId = t.__renderId, this.__previousContext;
        if (a.redirect)
          return this.__redirect(a.redirect, t.__redirectCount, t.__renderId);
      }
      return t;
    });
  }
  __runOnBeforeLeaveCallbacks(t, e, i, n) {
    const o = S(e);
    return t.then((s) => {
      if (this.__isLatestRender(e))
        return Ce("onBeforeLeave", [o, i, this], n.element)(s);
    }).then((s) => {
      if (!(s || {}).redirect)
        return s;
    });
  }
  __runOnBeforeEnterCallbacks(t, e, i, n) {
    const o = S(e, n.route);
    return t.then((s) => {
      if (this.__isLatestRender(e))
        return Ce("onBeforeEnter", [o, i, this], n.element)(s);
    });
  }
  __isReusableElement(t, e) {
    return t && e ? this.__createdByRouter.get(t) && this.__createdByRouter.get(e) ? t.localName === e.localName : t === e : !1;
  }
  __isLatestRender(t) {
    return t.__renderId === this.__lastStartedRenderId;
  }
  __redirect(t, e, i) {
    if (e > pi)
      throw new Error(A(`Too many redirects when rendering ${t.from}`));
    return this.resolve({
      pathname: this.urlForPath(
        t.pathname,
        t.params
      ),
      redirectFrom: t.from,
      __redirectCount: (e || 0) + 1,
      __renderId: i
    });
  }
  __ensureOutlet(t = this.__outlet) {
    if (!(t instanceof Node))
      throw new TypeError(A(`Expected router outlet to be a valid DOM Node (but got ${t})`));
  }
  __updateBrowserHistory({ pathname: t, search: e = "", hash: i = "" }, n) {
    if (window.location.pathname !== t || window.location.search !== e || window.location.hash !== i) {
      const o = n ? "replaceState" : "pushState";
      window.history[o](null, document.title, t + e + i), window.dispatchEvent(new PopStateEvent("popstate", { state: "vaadin-router-ignore" }));
    }
  }
  __copyUnchangedElements(t, e) {
    let i = this.__outlet;
    for (let n = 0; n < t.__divergedChainIndex; n++) {
      const o = e && e.chain[n].element;
      if (o)
        if (o.parentNode === i)
          t.chain[n].element = o, i = o;
        else
          break;
    }
    return i;
  }
  __addAppearingContent(t, e) {
    this.__ensureOutlet(), this.__removeAppearingContent();
    const i = this.__copyUnchangedElements(t, e);
    this.__appearingContent = [], this.__disappearingContent = Array.from(i.children).filter(
      (o) => this.__addedByRouter.get(o) && o !== t.result
    );
    let n = i;
    for (let o = t.__divergedChainIndex; o < t.chain.length; o++) {
      const s = t.chain[o].element;
      s && (n.appendChild(s), this.__addedByRouter.set(s, !0), n === i && this.__appearingContent.push(s), n = s);
    }
  }
  __removeDisappearingContent() {
    this.__disappearingContent && ct(this.__disappearingContent), this.__disappearingContent = null, this.__appearingContent = null;
  }
  __removeAppearingContent() {
    this.__disappearingContent && this.__appearingContent && (ct(this.__appearingContent), this.__disappearingContent = null, this.__appearingContent = null);
  }
  __runOnAfterLeaveCallbacks(t, e) {
    if (!!e)
      for (let i = e.chain.length - 1; i >= t.__divergedChainIndex && this.__isLatestRender(t); i--) {
        const n = e.chain[i].element;
        if (!!n)
          try {
            const o = S(t);
            ht(
              n.onAfterLeave,
              [o, {}, e.resolver],
              n
            );
          } finally {
            this.__disappearingContent.indexOf(n) > -1 && ct(n.children);
          }
      }
  }
  __runOnAfterEnterCallbacks(t) {
    for (let e = t.__divergedChainIndex; e < t.chain.length && this.__isLatestRender(t); e++) {
      const i = t.chain[e].element || {}, n = S(t, t.chain[e].route);
      ht(
        i.onAfterEnter,
        [n, {}, t.resolver],
        i
      );
    }
  }
  __animateIfNeeded(t) {
    const e = (this.__disappearingContent || [])[0], i = (this.__appearingContent || [])[0], n = [], o = t.chain;
    let s;
    for (let l = o.length; l > 0; l--)
      if (o[l - 1].route.animate) {
        s = o[l - 1].route.animate;
        break;
      }
    if (e && i && s) {
      const l = $t(s) && s.leave || "leaving", a = $t(s) && s.enter || "entering";
      n.push(Ee(e, l)), n.push(Ee(i, a));
    }
    return Promise.all(n).then(() => t);
  }
  subscribe() {
    window.addEventListener("vaadin-router-go", this.__navigationEventHandler);
  }
  unsubscribe() {
    window.removeEventListener("vaadin-router-go", this.__navigationEventHandler);
  }
  __onNavigationEvent(t) {
    const { pathname: e, search: i, hash: n } = t ? t.detail : window.location;
    E(this.__normalizePathname(e)) && (t && t.preventDefault && t.preventDefault(), this.render({ pathname: e, search: i, hash: n }, !0));
  }
  static setTriggers(...t) {
    ui(t);
  }
  urlForName(t, e) {
    return this.__urlForName || (this.__urlForName = li(this)), pt(
      this.__urlForName(t, e),
      this
    );
  }
  urlForPath(t, e) {
    return pt(
      y.pathToRegexp.compile(t)(e),
      this
    );
  }
  static go(t) {
    const { pathname: e, search: i, hash: n } = E(t) ? this.__createUrl(t, "http://a") : t;
    return Z("go", { pathname: e, search: i, hash: n });
  }
}
const gi = /\/\*\*\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i, ft = window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients;
function yi() {
  function r() {
    return !0;
  }
  return Ke(r);
}
function _i() {
  try {
    return bi() ? !0 : $i() ? ft ? !wi() : !yi() : !1;
  } catch {
    return !1;
  }
}
function bi() {
  return localStorage.getItem("vaadin.developmentmode.force");
}
function $i() {
  return ["localhost", "127.0.0.1"].indexOf(window.location.hostname) >= 0;
}
function wi() {
  return !!(ft && Object.keys(ft).map((t) => ft[t]).filter((t) => t.productionMode).length > 0);
}
function Ke(r, t) {
  if (typeof r != "function")
    return;
  const e = gi.exec(r.toString());
  if (e)
    try {
      r = new Function(e[1]);
    } catch (i) {
      console.log("vaadin-development-mode-detector: uncommentAndRun() failed", i);
    }
  return r(t);
}
window.Vaadin = window.Vaadin || {};
const Pe = function(r, t) {
  if (window.Vaadin.developmentMode)
    return Ke(r, t);
};
window.Vaadin.developmentMode === void 0 && (window.Vaadin.developmentMode = _i());
function Si() {
}
const Ei = function() {
  if (typeof Pe == "function")
    return Pe(Si);
};
window.Vaadin = window.Vaadin || {};
window.Vaadin.registrations = window.Vaadin.registrations || [];
window.Vaadin.registrations.push({
  is: "@vaadin/router",
  version: "1.7.4"
});
Ei();
y.NavigationTrigger = { POPSTATE: Gr, CLICK: Vr };
const Ai = [
  { path: "/list", component: "shopping-cart-list" },
  { path: "/share/:list", component: "share-component" }
], Ci = [
  { path: "/", component: "home-browse" },
  { path: "/browse/", component: "home-browse" },
  { path: "/filter/:name", component: "view-filtered" },
  { path: "/shopping-cart/", children: Ai },
  { path: "/categories/:name", component: "categories-browse" },
  { path: "/favorites/", component: "favorites-browse" },
  { path: "/page-not-found/", component: "page-not-found" },
  { path: "(.*)", redirect: "/page-not-found/" }
];
class Pi extends m {
  constructor() {
    super();
  }
  firstUpdated() {
    const t = this.renderRoot.querySelector("#outlet");
    new y(t).setRoutes(Ci);
  }
  render() {
    return f`
      <div class="app-container">
        <navbar-component></navbar-component>
        <div id="outlet"></div>
        <mobile-menu></mobile-menu>
      </div>
    `;
  }
  createRenderRoot() {
    return this;
  }
}
customElements.define("app-root", Pi);
class Ri {
  constructor() {
    this.init();
  }
  init() {
    localStorage.getItem("ShoppingCart") || localStorage.setItem("ShoppingCart", "[]");
  }
  get() {
    const t = localStorage.getItem("ShoppingCart");
    return JSON.parse(t);
  }
  save(t) {
    localStorage.setItem("ShoppingCart", JSON.stringify(t));
  }
}
const xi = new Ri();
class Ti extends m {
  constructor() {
    super();
  }
  render() {
    return f`
      <div class="container-navbar">
        <div class="elements-navbar">
          <searchbox-component class="searchbox"></searchbox-component>
          <navbar-menu-component class="menu"></navbar-menu-component>
          <shoppingcart-component class="shoppingcart"></shoppingcart-component>
          <!-- <select-categories class='categories'></select-categories> -->
        </div>
      </div>
    `;
  }
  goToFavorites() {
    y.go("/favorites/");
  }
  createRenderRoot() {
    return this;
  }
}
customElements.define("navbar-component", Ti);
var qt = function(r, t) {
  return qt = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i)
      Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
  }, qt(r, t);
};
function R(r, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  qt(r, t);
  function e() {
    this.constructor = r;
  }
  r.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var wt = function() {
  return wt = Object.assign || function(t) {
    for (var e, i = 1, n = arguments.length; i < n; i++) {
      e = arguments[i];
      for (var o in e)
        Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    }
    return t;
  }, wt.apply(this, arguments);
};
function Oi(r, t) {
  var e = {};
  for (var i in r)
    Object.prototype.hasOwnProperty.call(r, i) && t.indexOf(i) < 0 && (e[i] = r[i]);
  if (r != null && typeof Object.getOwnPropertySymbols == "function")
    for (var n = 0, i = Object.getOwnPropertySymbols(r); n < i.length; n++)
      t.indexOf(i[n]) < 0 && Object.prototype.propertyIsEnumerable.call(r, i[n]) && (e[i[n]] = r[i[n]]);
  return e;
}
function Ii(r, t, e, i) {
  function n(o) {
    return o instanceof e ? o : new e(function(s) {
      s(o);
    });
  }
  return new (e || (e = Promise))(function(o, s) {
    function l(d) {
      try {
        c(i.next(d));
      } catch (h) {
        s(h);
      }
    }
    function a(d) {
      try {
        c(i.throw(d));
      } catch (h) {
        s(h);
      }
    }
    function c(d) {
      d.done ? o(d.value) : n(d.value).then(l, a);
    }
    c((i = i.apply(r, t || [])).next());
  });
}
function Je(r, t) {
  var e = { label: 0, sent: function() {
    if (o[0] & 1)
      throw o[1];
    return o[1];
  }, trys: [], ops: [] }, i, n, o, s;
  return s = { next: l(0), throw: l(1), return: l(2) }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function l(c) {
    return function(d) {
      return a([c, d]);
    };
  }
  function a(c) {
    if (i)
      throw new TypeError("Generator is already executing.");
    for (; e; )
      try {
        if (i = 1, n && (o = c[0] & 2 ? n.return : c[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) && !(o = o.call(n, c[1])).done)
          return o;
        switch (n = 0, o && (c = [c[0] & 2, o.value]), c[0]) {
          case 0:
          case 1:
            o = c;
            break;
          case 4:
            return e.label++, { value: c[1], done: !1 };
          case 5:
            e.label++, n = c[1], c = [0];
            continue;
          case 7:
            c = e.ops.pop(), e.trys.pop();
            continue;
          default:
            if (o = e.trys, !(o = o.length > 0 && o[o.length - 1]) && (c[0] === 6 || c[0] === 2)) {
              e = 0;
              continue;
            }
            if (c[0] === 3 && (!o || c[1] > o[0] && c[1] < o[3])) {
              e.label = c[1];
              break;
            }
            if (c[0] === 6 && e.label < o[1]) {
              e.label = o[1], o = c;
              break;
            }
            if (o && e.label < o[2]) {
              e.label = o[2], e.ops.push(c);
              break;
            }
            o[2] && e.ops.pop(), e.trys.pop();
            continue;
        }
        c = t.call(r, e);
      } catch (d) {
        c = [6, d], n = 0;
      } finally {
        i = o = 0;
      }
    if (c[0] & 5)
      throw c[1];
    return { value: c[0] ? c[1] : void 0, done: !0 };
  }
}
function z(r) {
  var t = typeof Symbol == "function" && Symbol.iterator, e = t && r[t], i = 0;
  if (e)
    return e.call(r);
  if (r && typeof r.length == "number")
    return {
      next: function() {
        return r && i >= r.length && (r = void 0), { value: r && r[i++], done: !r };
      }
    };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function G(r, t) {
  var e = typeof Symbol == "function" && r[Symbol.iterator];
  if (!e)
    return r;
  var i = e.call(r), n, o = [], s;
  try {
    for (; (t === void 0 || t-- > 0) && !(n = i.next()).done; )
      o.push(n.value);
  } catch (l) {
    s = { error: l };
  } finally {
    try {
      n && !n.done && (e = i.return) && e.call(i);
    } finally {
      if (s)
        throw s.error;
    }
  }
  return o;
}
function Q(r, t, e) {
  if (e || arguments.length === 2)
    for (var i = 0, n = t.length, o; i < n; i++)
      (o || !(i in t)) && (o || (o = Array.prototype.slice.call(t, 0, i)), o[i] = t[i]);
  return r.concat(o || Array.prototype.slice.call(t));
}
function j(r) {
  return this instanceof j ? (this.v = r, this) : new j(r);
}
function Li(r, t, e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var i = e.apply(r, t || []), n, o = [];
  return n = {}, s("next"), s("throw"), s("return"), n[Symbol.asyncIterator] = function() {
    return this;
  }, n;
  function s(u) {
    i[u] && (n[u] = function(p) {
      return new Promise(function(w, g) {
        o.push([u, p, w, g]) > 1 || l(u, p);
      });
    });
  }
  function l(u, p) {
    try {
      a(i[u](p));
    } catch (w) {
      h(o[0][3], w);
    }
  }
  function a(u) {
    u.value instanceof j ? Promise.resolve(u.value.v).then(c, d) : h(o[0][2], u);
  }
  function c(u) {
    l("next", u);
  }
  function d(u) {
    l("throw", u);
  }
  function h(u, p) {
    u(p), o.shift(), o.length && l(o[0][0], o[0][1]);
  }
}
function ki(r) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = r[Symbol.asyncIterator], e;
  return t ? t.call(r) : (r = typeof z == "function" ? z(r) : r[Symbol.iterator](), e = {}, i("next"), i("throw"), i("return"), e[Symbol.asyncIterator] = function() {
    return this;
  }, e);
  function i(o) {
    e[o] = r[o] && function(s) {
      return new Promise(function(l, a) {
        s = r[o](s), n(l, a, s.done, s.value);
      });
    };
  }
  function n(o, s, l, a) {
    Promise.resolve(a).then(function(c) {
      o({ value: c, done: l });
    }, s);
  }
}
function $(r) {
  return typeof r == "function";
}
function We(r) {
  var t = function(i) {
    Error.call(i), i.stack = new Error().stack;
  }, e = r(t);
  return e.prototype = Object.create(Error.prototype), e.prototype.constructor = e, e;
}
var Ft = We(function(r) {
  return function(e) {
    r(this), this.message = e ? e.length + ` errors occurred during unsubscription:
` + e.map(function(i, n) {
      return n + 1 + ") " + i.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = e;
  };
});
function St(r, t) {
  if (r) {
    var e = r.indexOf(t);
    0 <= e && r.splice(e, 1);
  }
}
var st = function() {
  function r(t) {
    this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return r.prototype.unsubscribe = function() {
    var t, e, i, n, o;
    if (!this.closed) {
      this.closed = !0;
      var s = this._parentage;
      if (s)
        if (this._parentage = null, Array.isArray(s))
          try {
            for (var l = z(s), a = l.next(); !a.done; a = l.next()) {
              var c = a.value;
              c.remove(this);
            }
          } catch (g) {
            t = { error: g };
          } finally {
            try {
              a && !a.done && (e = l.return) && e.call(l);
            } finally {
              if (t)
                throw t.error;
            }
          }
        else
          s.remove(this);
      var d = this.initialTeardown;
      if ($(d))
        try {
          d();
        } catch (g) {
          o = g instanceof Ft ? g.errors : [g];
        }
      var h = this._finalizers;
      if (h) {
        this._finalizers = null;
        try {
          for (var u = z(h), p = u.next(); !p.done; p = u.next()) {
            var w = p.value;
            try {
              Re(w);
            } catch (g) {
              o = o != null ? o : [], g instanceof Ft ? o = Q(Q([], G(o)), G(g.errors)) : o.push(g);
            }
          }
        } catch (g) {
          i = { error: g };
        } finally {
          try {
            p && !p.done && (n = u.return) && n.call(u);
          } finally {
            if (i)
              throw i.error;
          }
        }
      }
      if (o)
        throw new Ft(o);
    }
  }, r.prototype.add = function(t) {
    var e;
    if (t && t !== this)
      if (this.closed)
        Re(t);
      else {
        if (t instanceof r) {
          if (t.closed || t._hasParent(this))
            return;
          t._addParent(this);
        }
        (this._finalizers = (e = this._finalizers) !== null && e !== void 0 ? e : []).push(t);
      }
  }, r.prototype._hasParent = function(t) {
    var e = this._parentage;
    return e === t || Array.isArray(e) && e.includes(t);
  }, r.prototype._addParent = function(t) {
    var e = this._parentage;
    this._parentage = Array.isArray(e) ? (e.push(t), e) : e ? [e, t] : t;
  }, r.prototype._removeParent = function(t) {
    var e = this._parentage;
    e === t ? this._parentage = null : Array.isArray(e) && St(e, t);
  }, r.prototype.remove = function(t) {
    var e = this._finalizers;
    e && St(e, t), t instanceof r && t._removeParent(this);
  }, r.EMPTY = function() {
    var t = new r();
    return t.closed = !0, t;
  }(), r;
}(), Ye = st.EMPTY;
function Xe(r) {
  return r instanceof st || r && "closed" in r && $(r.remove) && $(r.add) && $(r.unsubscribe);
}
function Re(r) {
  $(r) ? r() : r.unsubscribe();
}
var Jt = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, Ht = {
  setTimeout: function(r, t) {
    for (var e = [], i = 2; i < arguments.length; i++)
      e[i - 2] = arguments[i];
    var n = Ht.delegate;
    return n != null && n.setTimeout ? n.setTimeout.apply(n, Q([r, t], G(e))) : setTimeout.apply(void 0, Q([r, t], G(e)));
  },
  clearTimeout: function(r) {
    var t = Ht.delegate;
    return ((t == null ? void 0 : t.clearTimeout) || clearTimeout)(r);
  },
  delegate: void 0
};
function Ze(r) {
  Ht.setTimeout(function() {
    throw r;
  });
}
function Dt() {
}
var lt = null;
function vt(r) {
  if (Jt.useDeprecatedSynchronousErrorHandling) {
    var t = !lt;
    if (t && (lt = { errorThrown: !1, error: null }), r(), t) {
      var e = lt, i = e.errorThrown, n = e.error;
      if (lt = null, i)
        throw n;
    }
  } else
    r();
}
var Wt = function(r) {
  R(t, r);
  function t(e) {
    var i = r.call(this) || this;
    return i.isStopped = !1, e ? (i.destination = e, Xe(e) && e.add(i)) : i.destination = Ni, i;
  }
  return t.create = function(e, i, n) {
    return new Vt(e, i, n);
  }, t.prototype.next = function(e) {
    this.isStopped || this._next(e);
  }, t.prototype.error = function(e) {
    this.isStopped || (this.isStopped = !0, this._error(e));
  }, t.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, t.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, r.prototype.unsubscribe.call(this), this.destination = null);
  }, t.prototype._next = function(e) {
    this.destination.next(e);
  }, t.prototype._error = function(e) {
    try {
      this.destination.error(e);
    } finally {
      this.unsubscribe();
    }
  }, t.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, t;
}(st), Ui = Function.prototype.bind;
function Mt(r, t) {
  return Ui.call(r, t);
}
var Fi = function() {
  function r(t) {
    this.partialObserver = t;
  }
  return r.prototype.next = function(t) {
    var e = this.partialObserver;
    if (e.next)
      try {
        e.next(t);
      } catch (i) {
        ut(i);
      }
  }, r.prototype.error = function(t) {
    var e = this.partialObserver;
    if (e.error)
      try {
        e.error(t);
      } catch (i) {
        ut(i);
      }
    else
      ut(t);
  }, r.prototype.complete = function() {
    var t = this.partialObserver;
    if (t.complete)
      try {
        t.complete();
      } catch (e) {
        ut(e);
      }
  }, r;
}(), Vt = function(r) {
  R(t, r);
  function t(e, i, n) {
    var o = r.call(this) || this, s;
    if ($(e) || !e)
      s = {
        next: e != null ? e : void 0,
        error: i != null ? i : void 0,
        complete: n != null ? n : void 0
      };
    else {
      var l;
      o && Jt.useDeprecatedNextContext ? (l = Object.create(e), l.unsubscribe = function() {
        return o.unsubscribe();
      }, s = {
        next: e.next && Mt(e.next, l),
        error: e.error && Mt(e.error, l),
        complete: e.complete && Mt(e.complete, l)
      }) : s = e;
    }
    return o.destination = new Fi(s), o;
  }
  return t;
}(Wt);
function ut(r) {
  Ze(r);
}
function Mi(r) {
  throw r;
}
var Ni = {
  closed: !0,
  next: Dt,
  error: Mi,
  complete: Dt
}, Yt = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function tr(r) {
  return r;
}
function Bi(r) {
  return r.length === 0 ? tr : r.length === 1 ? r[0] : function(e) {
    return r.reduce(function(i, n) {
      return n(i);
    }, e);
  };
}
var P = function() {
  function r(t) {
    t && (this._subscribe = t);
  }
  return r.prototype.lift = function(t) {
    var e = new r();
    return e.source = this, e.operator = t, e;
  }, r.prototype.subscribe = function(t, e, i) {
    var n = this, o = qi(t) ? t : new Vt(t, e, i);
    return vt(function() {
      var s = n, l = s.operator, a = s.source;
      o.add(l ? l.call(o, a) : a ? n._subscribe(o) : n._trySubscribe(o));
    }), o;
  }, r.prototype._trySubscribe = function(t) {
    try {
      return this._subscribe(t);
    } catch (e) {
      t.error(e);
    }
  }, r.prototype.forEach = function(t, e) {
    var i = this;
    return e = xe(e), new e(function(n, o) {
      var s = new Vt({
        next: function(l) {
          try {
            t(l);
          } catch (a) {
            o(a), s.unsubscribe();
          }
        },
        error: o,
        complete: n
      });
      i.subscribe(s);
    });
  }, r.prototype._subscribe = function(t) {
    var e;
    return (e = this.source) === null || e === void 0 ? void 0 : e.subscribe(t);
  }, r.prototype[Yt] = function() {
    return this;
  }, r.prototype.pipe = function() {
    for (var t = [], e = 0; e < arguments.length; e++)
      t[e] = arguments[e];
    return Bi(t)(this);
  }, r.prototype.toPromise = function(t) {
    var e = this;
    return t = xe(t), new t(function(i, n) {
      var o;
      e.subscribe(function(s) {
        return o = s;
      }, function(s) {
        return n(s);
      }, function() {
        return i(o);
      });
    });
  }, r.create = function(t) {
    return new r(t);
  }, r;
}();
function xe(r) {
  var t;
  return (t = r != null ? r : Jt.Promise) !== null && t !== void 0 ? t : Promise;
}
function ji(r) {
  return r && $(r.next) && $(r.error) && $(r.complete);
}
function qi(r) {
  return r && r instanceof Wt || ji(r) && Xe(r);
}
function Hi(r) {
  return $(r == null ? void 0 : r.lift);
}
function W(r) {
  return function(t) {
    if (Hi(t))
      return t.lift(function(e) {
        try {
          return r(e, this);
        } catch (i) {
          this.error(i);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function I(r, t, e, i, n) {
  return new Di(r, t, e, i, n);
}
var Di = function(r) {
  R(t, r);
  function t(e, i, n, o, s, l) {
    var a = r.call(this, e) || this;
    return a.onFinalize = s, a.shouldUnsubscribe = l, a._next = i ? function(c) {
      try {
        i(c);
      } catch (d) {
        e.error(d);
      }
    } : r.prototype._next, a._error = o ? function(c) {
      try {
        o(c);
      } catch (d) {
        e.error(d);
      } finally {
        this.unsubscribe();
      }
    } : r.prototype._error, a._complete = n ? function() {
      try {
        n();
      } catch (c) {
        e.error(c);
      } finally {
        this.unsubscribe();
      }
    } : r.prototype._complete, a;
  }
  return t.prototype.unsubscribe = function() {
    var e;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var i = this.closed;
      r.prototype.unsubscribe.call(this), !i && ((e = this.onFinalize) === null || e === void 0 || e.call(this));
    }
  }, t;
}(Wt), Vi = We(function(r) {
  return function() {
    r(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), Y = function(r) {
  R(t, r);
  function t() {
    var e = r.call(this) || this;
    return e.closed = !1, e.currentObservers = null, e.observers = [], e.isStopped = !1, e.hasError = !1, e.thrownError = null, e;
  }
  return t.prototype.lift = function(e) {
    var i = new Te(this, this);
    return i.operator = e, i;
  }, t.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new Vi();
  }, t.prototype.next = function(e) {
    var i = this;
    vt(function() {
      var n, o;
      if (i._throwIfClosed(), !i.isStopped) {
        i.currentObservers || (i.currentObservers = Array.from(i.observers));
        try {
          for (var s = z(i.currentObservers), l = s.next(); !l.done; l = s.next()) {
            var a = l.value;
            a.next(e);
          }
        } catch (c) {
          n = { error: c };
        } finally {
          try {
            l && !l.done && (o = s.return) && o.call(s);
          } finally {
            if (n)
              throw n.error;
          }
        }
      }
    });
  }, t.prototype.error = function(e) {
    var i = this;
    vt(function() {
      if (i._throwIfClosed(), !i.isStopped) {
        i.hasError = i.isStopped = !0, i.thrownError = e;
        for (var n = i.observers; n.length; )
          n.shift().error(e);
      }
    });
  }, t.prototype.complete = function() {
    var e = this;
    vt(function() {
      if (e._throwIfClosed(), !e.isStopped) {
        e.isStopped = !0;
        for (var i = e.observers; i.length; )
          i.shift().complete();
      }
    });
  }, t.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(t.prototype, "observed", {
    get: function() {
      var e;
      return ((e = this.observers) === null || e === void 0 ? void 0 : e.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype._trySubscribe = function(e) {
    return this._throwIfClosed(), r.prototype._trySubscribe.call(this, e);
  }, t.prototype._subscribe = function(e) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(e), this._innerSubscribe(e);
  }, t.prototype._innerSubscribe = function(e) {
    var i = this, n = this, o = n.hasError, s = n.isStopped, l = n.observers;
    return o || s ? Ye : (this.currentObservers = null, l.push(e), new st(function() {
      i.currentObservers = null, St(l, e);
    }));
  }, t.prototype._checkFinalizedStatuses = function(e) {
    var i = this, n = i.hasError, o = i.thrownError, s = i.isStopped;
    n ? e.error(o) : s && e.complete();
  }, t.prototype.asObservable = function() {
    var e = new P();
    return e.source = this, e;
  }, t.create = function(e, i) {
    return new Te(e, i);
  }, t;
}(P), Te = function(r) {
  R(t, r);
  function t(e, i) {
    var n = r.call(this) || this;
    return n.destination = e, n.source = i, n;
  }
  return t.prototype.next = function(e) {
    var i, n;
    (n = (i = this.destination) === null || i === void 0 ? void 0 : i.next) === null || n === void 0 || n.call(i, e);
  }, t.prototype.error = function(e) {
    var i, n;
    (n = (i = this.destination) === null || i === void 0 ? void 0 : i.error) === null || n === void 0 || n.call(i, e);
  }, t.prototype.complete = function() {
    var e, i;
    (i = (e = this.destination) === null || e === void 0 ? void 0 : e.complete) === null || i === void 0 || i.call(e);
  }, t.prototype._subscribe = function(e) {
    var i, n;
    return (n = (i = this.source) === null || i === void 0 ? void 0 : i.subscribe(e)) !== null && n !== void 0 ? n : Ye;
  }, t;
}(Y), U = function(r) {
  R(t, r);
  function t(e) {
    var i = r.call(this) || this;
    return i._value = e, i;
  }
  return Object.defineProperty(t.prototype, "value", {
    get: function() {
      return this.getValue();
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype._subscribe = function(e) {
    var i = r.prototype._subscribe.call(this, e);
    return !i.closed && e.next(this._value), i;
  }, t.prototype.getValue = function() {
    var e = this, i = e.hasError, n = e.thrownError, o = e._value;
    if (i)
      throw n;
    return this._throwIfClosed(), o;
  }, t.prototype.next = function(e) {
    r.prototype.next.call(this, this._value = e);
  }, t;
}(Y), er = {
  now: function() {
    return (er.delegate || Date).now();
  },
  delegate: void 0
}, zi = function(r) {
  R(t, r);
  function t(e, i) {
    return r.call(this) || this;
  }
  return t.prototype.schedule = function(e, i) {
    return this;
  }, t;
}(st), Et = {
  setInterval: function(r, t) {
    for (var e = [], i = 2; i < arguments.length; i++)
      e[i - 2] = arguments[i];
    var n = Et.delegate;
    return n != null && n.setInterval ? n.setInterval.apply(n, Q([r, t], G(e))) : setInterval.apply(void 0, Q([r, t], G(e)));
  },
  clearInterval: function(r) {
    var t = Et.delegate;
    return ((t == null ? void 0 : t.clearInterval) || clearInterval)(r);
  },
  delegate: void 0
}, Gi = function(r) {
  R(t, r);
  function t(e, i) {
    var n = r.call(this, e, i) || this;
    return n.scheduler = e, n.work = i, n.pending = !1, n;
  }
  return t.prototype.schedule = function(e, i) {
    var n;
    if (i === void 0 && (i = 0), this.closed)
      return this;
    this.state = e;
    var o = this.id, s = this.scheduler;
    return o != null && (this.id = this.recycleAsyncId(s, o, i)), this.pending = !0, this.delay = i, this.id = (n = this.id) !== null && n !== void 0 ? n : this.requestAsyncId(s, this.id, i), this;
  }, t.prototype.requestAsyncId = function(e, i, n) {
    return n === void 0 && (n = 0), Et.setInterval(e.flush.bind(e, this), n);
  }, t.prototype.recycleAsyncId = function(e, i, n) {
    if (n === void 0 && (n = 0), n != null && this.delay === n && this.pending === !1)
      return i;
    i != null && Et.clearInterval(i);
  }, t.prototype.execute = function(e, i) {
    if (this.closed)
      return new Error("executing a cancelled action");
    this.pending = !1;
    var n = this._execute(e, i);
    if (n)
      return n;
    this.pending === !1 && this.id != null && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
  }, t.prototype._execute = function(e, i) {
    var n = !1, o;
    try {
      this.work(e);
    } catch (s) {
      n = !0, o = s || new Error("Scheduled action threw falsy error");
    }
    if (n)
      return this.unsubscribe(), o;
  }, t.prototype.unsubscribe = function() {
    if (!this.closed) {
      var e = this, i = e.id, n = e.scheduler, o = n.actions;
      this.work = this.state = this.scheduler = null, this.pending = !1, St(o, this), i != null && (this.id = this.recycleAsyncId(n, i, null)), this.delay = null, r.prototype.unsubscribe.call(this);
    }
  }, t;
}(zi), Oe = function() {
  function r(t, e) {
    e === void 0 && (e = r.now), this.schedulerActionCtor = t, this.now = e;
  }
  return r.prototype.schedule = function(t, e, i) {
    return e === void 0 && (e = 0), new this.schedulerActionCtor(this, t).schedule(i, e);
  }, r.now = er.now, r;
}(), Qi = function(r) {
  R(t, r);
  function t(e, i) {
    i === void 0 && (i = Oe.now);
    var n = r.call(this, e, i) || this;
    return n.actions = [], n._active = !1, n;
  }
  return t.prototype.flush = function(e) {
    var i = this.actions;
    if (this._active) {
      i.push(e);
      return;
    }
    var n;
    this._active = !0;
    do
      if (n = e.execute(e.state, e.delay))
        break;
    while (e = i.shift());
    if (this._active = !1, n) {
      for (; e = i.shift(); )
        e.unsubscribe();
      throw n;
    }
  }, t;
}(Oe), Ki = new Qi(Gi), Ji = function(r) {
  return r && typeof r.length == "number" && typeof r != "function";
};
function Wi(r) {
  return $(r == null ? void 0 : r.then);
}
function Yi(r) {
  return $(r[Yt]);
}
function Xi(r) {
  return Symbol.asyncIterator && $(r == null ? void 0 : r[Symbol.asyncIterator]);
}
function Zi(r) {
  return new TypeError("You provided " + (r !== null && typeof r == "object" ? "an invalid object" : "'" + r + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function tn() {
  return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator;
}
var en = tn();
function rn(r) {
  return $(r == null ? void 0 : r[en]);
}
function nn(r) {
  return Li(this, arguments, function() {
    var e, i, n, o;
    return Je(this, function(s) {
      switch (s.label) {
        case 0:
          e = r.getReader(), s.label = 1;
        case 1:
          s.trys.push([1, , 9, 10]), s.label = 2;
        case 2:
          return [4, j(e.read())];
        case 3:
          return i = s.sent(), n = i.value, o = i.done, o ? [4, j(void 0)] : [3, 5];
        case 4:
          return [2, s.sent()];
        case 5:
          return [4, j(n)];
        case 6:
          return [4, s.sent()];
        case 7:
          return s.sent(), [3, 2];
        case 8:
          return [3, 10];
        case 9:
          return e.releaseLock(), [7];
        case 10:
          return [2];
      }
    });
  });
}
function on(r) {
  return $(r == null ? void 0 : r.getReader);
}
function Pt(r) {
  if (r instanceof P)
    return r;
  if (r != null) {
    if (Yi(r))
      return sn(r);
    if (Ji(r))
      return an(r);
    if (Wi(r))
      return cn(r);
    if (Xi(r))
      return rr(r);
    if (rn(r))
      return ln(r);
    if (on(r))
      return un(r);
  }
  throw Zi(r);
}
function sn(r) {
  return new P(function(t) {
    var e = r[Yt]();
    if ($(e.subscribe))
      return e.subscribe(t);
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function an(r) {
  return new P(function(t) {
    for (var e = 0; e < r.length && !t.closed; e++)
      t.next(r[e]);
    t.complete();
  });
}
function cn(r) {
  return new P(function(t) {
    r.then(function(e) {
      t.closed || (t.next(e), t.complete());
    }, function(e) {
      return t.error(e);
    }).then(null, Ze);
  });
}
function ln(r) {
  return new P(function(t) {
    var e, i;
    try {
      for (var n = z(r), o = n.next(); !o.done; o = n.next()) {
        var s = o.value;
        if (t.next(s), t.closed)
          return;
      }
    } catch (l) {
      e = { error: l };
    } finally {
      try {
        o && !o.done && (i = n.return) && i.call(n);
      } finally {
        if (e)
          throw e.error;
      }
    }
    t.complete();
  });
}
function rr(r) {
  return new P(function(t) {
    dn(r, t).catch(function(e) {
      return t.error(e);
    });
  });
}
function un(r) {
  return rr(nn(r));
}
function dn(r, t) {
  var e, i, n, o;
  return Ii(this, void 0, void 0, function() {
    var s, l;
    return Je(this, function(a) {
      switch (a.label) {
        case 0:
          a.trys.push([0, 5, 6, 11]), e = ki(r), a.label = 1;
        case 1:
          return [4, e.next()];
        case 2:
          if (i = a.sent(), !!i.done)
            return [3, 4];
          if (s = i.value, t.next(s), t.closed)
            return [2];
          a.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          return l = a.sent(), n = { error: l }, [3, 11];
        case 6:
          return a.trys.push([6, , 9, 10]), i && !i.done && (o = e.return) ? [4, o.call(e)] : [3, 8];
        case 7:
          a.sent(), a.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (n)
            throw n.error;
          return [7];
        case 10:
          return [7];
        case 11:
          return t.complete(), [2];
      }
    });
  });
}
function hn(r, t, e, i, n) {
  i === void 0 && (i = 0), n === void 0 && (n = !1);
  var o = t.schedule(function() {
    e(), n ? r.add(this.schedule(null, i)) : this.unsubscribe();
  }, i);
  if (r.add(o), !n)
    return o;
}
function nt(r, t) {
  return W(function(e, i) {
    var n = 0;
    e.subscribe(I(i, function(o) {
      i.next(r.call(t, o, n++));
    }));
  });
}
function pn(r, t, e, i, n, o, s, l) {
  var a = [], c = 0, d = 0, h = !1, u = function() {
    h && !a.length && !c && t.complete();
  }, p = function(g) {
    return c < i ? w(g) : a.push(g);
  }, w = function(g) {
    o && t.next(g), c++;
    var at = !1;
    Pt(e(g, d++)).subscribe(I(t, function(L) {
      n == null || n(L), o ? p(L) : t.next(L);
    }, function() {
      at = !0;
    }, void 0, function() {
      if (at)
        try {
          c--;
          for (var L = function() {
            var C = a.shift();
            s ? hn(t, s, function() {
              return w(C);
            }) : w(C);
          }; a.length && c < i; )
            L();
          u();
        } catch (C) {
          t.error(C);
        }
    }));
  };
  return r.subscribe(I(t, p, function() {
    h = !0, u();
  })), function() {
    l == null || l();
  };
}
function At(r, t, e) {
  return e === void 0 && (e = 1 / 0), $(t) ? At(function(i, n) {
    return nt(function(o, s) {
      return t(i, o, n, s);
    })(Pt(r(i, n)));
  }, e) : (typeof t == "number" && (e = t), W(function(i, n) {
    return pn(i, n, r, e);
  }));
}
function Xt(r, t) {
  return W(function(e, i) {
    var n = 0;
    e.subscribe(I(i, function(o) {
      return r.call(t, o, n++) && i.next(o);
    }));
  });
}
function ir(r, t) {
  return t === void 0 && (t = Ki), W(function(e, i) {
    var n = null, o = null, s = null, l = function() {
      if (n) {
        n.unsubscribe(), n = null;
        var c = o;
        o = null, i.next(c);
      }
    };
    function a() {
      var c = s + r, d = t.now();
      if (d < c) {
        n = this.schedule(void 0, c - d), i.add(n);
        return;
      }
      l();
    }
    e.subscribe(I(i, function(c) {
      o = c, s = t.now(), n || (n = t.schedule(a, r), i.add(n));
    }, function() {
      l(), i.complete();
    }, void 0, function() {
      o = n = null;
    }));
  });
}
function fn(r) {
  return W(function(t, e) {
    Pt(r).subscribe(I(e, function() {
      return e.complete();
    }, Dt)), !e.closed && t.subscribe(e);
  });
}
function v(r, t, e) {
  var i = $(r) || t || e ? { next: r, error: t, complete: e } : r;
  return i ? W(function(n, o) {
    var s;
    (s = i.subscribe) === null || s === void 0 || s.call(i);
    var l = !0;
    n.subscribe(I(o, function(a) {
      var c;
      (c = i.next) === null || c === void 0 || c.call(i, a), o.next(a);
    }, function() {
      var a;
      l = !1, (a = i.complete) === null || a === void 0 || a.call(i), o.complete();
    }, function(a) {
      var c;
      l = !1, (c = i.error) === null || c === void 0 || c.call(i, a), o.error(a);
    }, function() {
      var a, c;
      l && ((a = i.unsubscribe) === null || a === void 0 || a.call(i)), (c = i.finalize) === null || c === void 0 || c.call(i);
    }));
  }) : tr;
}
class vn {
  constructor() {
    this.localStorageSrv = xi, this.products = this.localStorageSrv.get() || [], this.list = new U(this.products), this.counter = new U(this.products.length), this.ammount = new U(0), this.calculateTotal();
  }
  process(t) {
    t.quantity > 0 && this.addProduct(t), t.quantity === 0 && this.removeProduct(t), this.counter.next(this.products.length), this.calculateTotal(), this.list.next(this.products), this.localStorageSrv.save(this.products);
  }
  addProduct(t) {
    const e = this.products.find((i) => i.id === t.id);
    e || this.products.push(t), e && this.modifyProductQuantity(t);
  }
  removeProduct(t) {
    this.products = this.products.filter((e) => e.id !== t.id);
  }
  modifyProductQuantity(t) {
    this.products.forEach((e) => {
      e.id === t.id && (e.quantity = t.quantity);
    });
  }
  calculateTotal() {
    let t = 0;
    this.products.forEach((e) => t += e.price * e.quantity), this.ammount.next(t.toFixed(2));
  }
  cleanProduct(t) {
    this.removeProduct(t), this.counter.next(this.products.length), this.calculateTotal(), this.list.next(this.products), this.localStorageSrv.save(this.products);
  }
  clean() {
    this.products = [], this.ammount.next(0), this.counter.next(0), this.list.next(this.products), this.localStorageSrv.save(this.products);
  }
  verifyDoExist(t) {
    const e = this.products.find((i) => t.id === i.id);
    return e ? e.quantity : 0;
  }
  getShareUrl() {
    let t = "";
    return this.products.forEach((e) => t += `${e.id}=${e.quantity}-`), t.slice(0, -1);
  }
}
const x = new vn();
class nr extends m {
  constructor() {
    super(), this.counter = 0, this.shoppingCartSrv = x;
  }
  firstUpdated() {
    this.shoppingCartSrv.counter.pipe(
      v((e) => this.counter = e),
      v(() => this.requestUpdate())
    ).subscribe();
  }
  render() {
    return f`
      <div class="shoppint-card-container">
        <div class="counter-card-container">
          <span class="card-counter">${this.counter}</span>
        </div>  

        <img
          class="img-card" 
          src="/src/assets/images/el_shopping-cart-sign.svg" 
          @click=${this.goToShoppingCart}
        >
      </div> 
    `;
  }
  goToShoppingCart() {
    y.go("/shopping-cart/list/");
  }
  createRenderRoot() {
    return this;
  }
}
_(nr, "properties", {});
customElements.define("shoppingcart-component", nr);
class mn extends m {
  constructor() {
    super();
    _(this, "showIconClear", !1);
    this.filter$ = new Y("").pipe(
      ir(300),
      nt(() => this.input.value),
      v((e) => this.verifyInput(e)),
      v((e) => e.length > 0 ? this.redirectFilter(e) : this.redirectHome())
    ), this.filter$.subscribe();
  }
  get input() {
    var e, i;
    return (i = (e = this.renderRoot) == null ? void 0 : e.querySelector(".search")) != null ? i : null;
  }
  firstUpdated() {
    const e = window.location.pathname;
    if (e.substring(1, 7) === "filter") {
      const n = e.replace("/filter/", "").replace(/%20/g, " ");
      this.input.value = n;
    }
  }
  render() {
    return f`
      <div class="boxContainer">
        <table class="elementsContainer">
          <tr>
            <td>
              <input 
                type="text" 
                placeholder="Busca tu producto" 
                class="search" 
                @keyup=${this.filterForKeyup}/>
            </td>
            <td></td>
            <td class="icon-container">
            
              ${this.showIconClear ? f`
                 <i 
               class="material-icons"
               class="icon-clear"
               @click=${this.clearInput}
               >
               cancel
               </i>
                ` : f`
                  <i
                class="material-icons" 
                @click=${this.filterForClick}
              >search</i>
                
                `}



              
            </td>
            <td>
             

            </td>
          </tr>
        </table>

      </div>

    `;
  }
  verifyInput(e) {
    e != "" && (this.showIconClear = !0, this.requestUpdate()), e == "" && (this.showIconClear = !1, this.requestUpdate());
  }
  clearInput() {
    this.input.value = "", this.verifyInput(""), this.redirectHome(), this.requestUpdate;
  }
  filterForKeyup() {
    this.filter$.next("");
  }
  filterForClick() {
    const e = this.input.value;
    e.length ? this.redirectFilter(e) : this.redirectHome();
  }
  redirectFilter(e) {
    y.go(`/filter/${e}`);
  }
  redirectHome() {
    y.go("/browse/");
  }
  createRenderRoot() {
    return this;
  }
}
customElements.define("searchbox-component", mn);
class gn extends m {
  constructor() {
    super(), this.menuList = [
      { title: "Inicio", route: "browse" },
      { title: "Favoritos", route: "favorites" }
    ];
  }
  render() {
    return f`
        <div class="navbar-menu-container">
            ${this.menuList.map((t) => f`
                    <div 
                        @click=${() => y.go(`/${t.route}/`)}
                        class="element"
                    >
                        ${t.title}
                    </div>
                `)}
        </div>
    `;
  }
  goToRoute() {
    y.go("/shopping-cart/list/");
  }
  createRenderRoot() {
    return this;
  }
}
customElements.define("navbar-menu-component", gn);
class yn {
  constructor() {
    this.currentPosition = new U();
  }
}
const or = new yn(), sr = [
  { name: "Alimentos basicos", icon: "\u{1F37D}\uFE0F", route: "alimentos-basicos" },
  { name: "Frutas y verduras", icon: "\u{1F955}", route: "frutas-y-verduras" },
  { name: "Bebidas y lacteos", icon: "\u2615", route: "bebidas-y-lacteos" },
  { name: "Salsas y aderezos", icon: "\u{1F957}", route: "salsas-y-aderezos" },
  { name: "Detergentes", icon: "\u{1F9FC}", route: "detergentes" },
  { name: "Cereales", icon: "\u{1F33D}", route: "cereales" },
  { name: "Dulces y snacks", icon: "\u{1F36A}", route: "dulces-y-snacks" }
];
class ar extends m {
  constructor() {
    super(), this.categoriesSrv = or, this.categoriesList = sr, this.selectTitle = this.selectTitleDefault = "Selecciona una Categor\xEDa", this.active = !1;
  }
  firstUpdated() {
    this.categoriesSrv.currentPosition.pipe(
      v((t) => {
        if (typeof t == "string") {
          const e = t[0].toUpperCase() + t.substring(1);
          this.selectTitle = e, this.requestUpdate();
          return;
        }
        this.leaveCategorieBrowse();
      })
    ).subscribe();
  }
  render() {
    return f`
      <div
        class='icon-categories-container ${this.active ? "active" : ""}'
        @click=${this.activeToggle}
      >

        <div class='select-btn'>
          <div class=''>${this.selectTitle}</div>
          <i class='material-icons'>expand_more</i>
        </div>

        <ul class='options'>
          ${this.categoriesList.map((t) => f`
              <category-component
                .category=${t}
                @categoryAction=${this.categoryAction}
              ></category-component>
            `)}
        </ul>

      </div>
    `;
  }
  activeToggle() {
    this.active = !this.active, this.requestUpdate();
  }
  categoryAction(t) {
    const e = t.detail;
    y.go(`/categories/${e.route}/`);
  }
  leaveCategorieBrowse() {
    this.selectTitle = this.selectTitleDefault, this.requestUpdate();
  }
  createRenderRoot() {
    return this;
  }
}
_(ar, "properties", {});
customElements.define("select-categories", ar);
class cr extends m {
  constructor() {
    super();
  }
  render() {
    return f`
      <div class='category-container'>
        <li class='option' @click=${this.selectCategory}>
          <i>${this.category.icon}</i>
          <span class='text'>${this.category.name}</span>
        </li>
      </div>
    `;
  }
  selectCategory() {
    const t = {
      detail: {
        name: this.category.name,
        route: this.category.route
      }
    };
    this.dispatchEvent(new CustomEvent("categoryAction", t));
  }
  createRenderRoot() {
    return this;
  }
}
_(cr, "properties", {
  category: { type: Object }
});
customElements.define("category-component", cr);
class _n extends m {
  constructor() {
    super(), this.counter = 0, this.shoppingCartSrv = x;
  }
  firstUpdated() {
    this.shoppingCartSrv.counter.pipe(
      v((e) => this.counter = e),
      v(() => this.requestUpdate())
    ).subscribe();
  }
  render() {
    return f`
            <div class="mobile-menu-container">
                <i 
                    class="material-icons" 
                    @click=${() => y.go("/browse/")}
                >home</i>

                <i 
                    class="material-icons" 
                    @click=${() => y.go("/favorites/")}
                >favorite</i>

                <mobile-menu-shopping 
                    counter=${this.counter} 
                    @click=${() => y.go("/shopping-cart/list/")}
                ></mobile-menu-shopping>
                
                <!--   -->
            </div>
        `;
  }
  createRenderRoot() {
    return this;
  }
}
customElements.define("mobile-menu", _n);
class lr extends m {
  constructor() {
    super(), this.counter = 0;
  }
  render() {
    return f`
            <div class="shopping-icon-container">
                <i class="material-icons" @click=${this.goToShoppingCart}>shopping_cart</i>
                <span class="cart-counter">${this.counter}</span>
            </div>
        `;
  }
  goToShoppingCart() {
    this.dispatchEvent(new CustomEvent("goToShopping"));
  }
  createRenderRoot() {
    return this;
  }
}
_(lr, "properties", {
  counter: { type: Number }
});
customElements.define("mobile-menu-shopping", lr);
function bn(r, t) {
  t === void 0 && (t = {});
  var e = t.selector, i = Oi(t, ["selector"]);
  return new P(function(n) {
    var o = new AbortController(), s = o.signal, l = !0, a = i.signal;
    if (a)
      if (a.aborted)
        o.abort();
      else {
        var c = function() {
          s.aborted || o.abort();
        };
        a.addEventListener("abort", c), n.add(function() {
          return a.removeEventListener("abort", c);
        });
      }
    var d = wt(wt({}, i), { signal: s }), h = function(u) {
      l = !1, n.error(u);
    };
    return fetch(r, d).then(function(u) {
      e ? Pt(e(u)).subscribe(I(n, void 0, function() {
        l = !1, n.complete();
      }, h)) : (l = !1, n.next(u), n.complete());
    }).catch(h), function() {
      l && o.abort();
    };
  });
}
class $n {
  constructor() {
    this.listProduct = new U([]), this.dolarValue = new U(1), this.divisa = 1, this.getListProductFromKana$().pipe(
      v((t) => this.listProduct.next(t))
    ).subscribe(), this.getDolarValue$().pipe(
      v((t) => this.dolarValue.next(t))
    ).subscribe();
  }
  getQuery(t) {
    const e = "https://kana.develop.cecosesola.imolko.net/graphql", n = {
      ...{
        operationName: null,
        variables: {}
      },
      query: t
    }, o = {
      method: "POST",
      body: JSON.stringify(n),
      headers: new Headers({ "content-type": "application/json" })
    };
    return bn(e, o).pipe(
      At((l) => l.json())
    );
  }
  getListProductFromKana$(t = 1e3) {
    const e = `
      query {
        currentPriceList{
          products(first: ${t}){
            edges{
              node{
                product{
                  id
                  name
                  images
                  presentation
                  departments {
                    description
                  }
                  pricePublished{
                    priceBase {
                      amount
                    }
                  }
                }
              }
            }
            pageInfo{
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor  
            }
          }
        }
      }`;
    return this.getQuery(e).pipe(
      nt((n) => n.data.currentPriceList.products.edges.map((o) => {
        const { pricePublished: s, ...l } = o.node.product;
        return {
          ...l,
          price: Number((s == null ? void 0 : s.priceBase.amount) * this.divisa)
        };
      }))
    );
  }
  getDolarValue$() {
    const t = `
      query{
        currentPriceList{
          officialRate{
            forSales{
              value
            }
          }
        }
      }`;
    return this.getQuery(t).pipe(
      nt((i) => i.data.currentPriceList.officialRate.forSales[1].value),
      v((i) => this.divisa = i)
    );
  }
}
const ur = new $n();
class wn {
  constructor() {
    _(this, "listProductCat", [
      {
        id: 1,
        name: "GALLETA MARIA PUIG",
        images: [
          "https://palospanasfoodmarket.com/wp-content/uploads/2018/04/galletas-maria-1.jpg"
        ],
        price: 10.86,
        category: "dulces y snacks"
      },
      {
        id: 2,
        name: "PASTA CORTA CAPRI CODITO",
        images: ["https://www.pastascapri.com/img/productos/imagenes/codito.png"],
        price: 11.5,
        category: "alimentos basicos"
      },
      {
        id: 3,
        name: "MAYONESA MAVESA 910gr",
        images: [
          "https://labatata.com.ve/1085-large_default/mayonesa-mavesa-910g.jpg"
        ],
        category: "salsas y aderezos",
        price: 36
      },
      {
        id: 4,
        name: "CAF\xC9 FLOR DE ARAUCA",
        images: [
          "https://compraenavi.com/web/image/product.template/4800/image/300x300?unique=3fd0aaa"
        ],
        category: "alimentos basicos",
        price: 20
      },
      {
        id: 5,
        name: "MARGARINA MAVESA 500G",
        images: [
          "https://cdn.shopify.com/s/files/1/0571/3788/9442/products/mantequilla-mavesa-500g-1.png?v=1660312385"
        ],
        category: "alimentos basicos",
        price: 19
      },
      {
        id: 6,
        name: "ARROZ PRIMOR 1KG",
        images: [
          "https://d2j6dbq0eux0bg.cloudfront.net/images/28254021/2715085634.jpg"
        ],
        category: "alimentos basicos",
        price: 13.1
      },
      {
        id: 7,
        name: "HARINA PAN NORMAL",
        images: [
          "https://lh3.googleusercontent.com/p-K-FfFnpv0kgdVT1kNxI_lludARFkD-VpAFOimS0gbiIA9JxOP78PkQlhOnD6Q8W2cU-vvRkdLG0vdfvni86ChSo0UlXImPVYPJ2uUfAX78WSSd"
        ],
        price: 14.45
      },
      {
        id: 8,
        name: "JABON EN POLVO LAS LLAVES",
        images: [
          "https://labatata.com.ve/2901-large_default/jabon-las-llaves-polvo-400k.jpg"
        ],
        category: "detergentes",
        price: 16.2
      },
      {
        id: 9,
        name: "GALLETA TIP-TOP MANI",
        images: ["https://gsi-food.com/wp-content/uploads/2017/01/gsi-tip-top-vainilla.jpg"],
        price: 8.5,
        category: "dulces y snacks"
      },
      {
        id: 10,
        name: "GALLETA CLUB SOCIAL",
        images: ["https://lh3.googleusercontent.com/3S-IQKdJvPtnTXPL0crHXH_pcpjm7H5hdubpN2skm2gGF1yt83bpCDKmpfmPcrQ4zawBpqo-gbSmjaKt9O2gCvPIBb4xgpOxdsqoYuVnqQrcrMU"],
        price: 16.5,
        category: "dulces y snacks"
      },
      {
        id: 11,
        name: "HARINA DO\xD1A EMILIA",
        images: ["https://inverloan.com/wp-content/uploads/2022/01/7592591000154-Harina-de-Maiz-Blanco-Dona-Emilia-1Kg.jpg"],
        category: "alimentos basicos",
        price: 12.5
      },
      {
        id: 12,
        name: "PASTA ESPECIAL LARGA",
        images: ["https://inversiones-valeria.quosmarket.com/wp-content/uploads/2021/08/10167.jpg"],
        category: "alimentos basicos",
        price: 13.5
      },
      {
        id: 13,
        name: "VINAGRE TIQUIRE",
        images: ["https://sambil.sigo.com.ve/images/thumbs/0004259_vinagre-tiquire-flores-1000-cc_450.jpeg"],
        price: 9.8,
        category: "salsas y aderezos"
      },
      {
        id: 14,
        name: "MEGA ARO",
        images: ["https://tucentralonline.com/Bello-Campo-43/wp-content/uploads/sites/19/2021/12/100743899.jpg"],
        price: 19.5,
        category: "cereales"
      },
      {
        id: 15,
        name: "FORORO VALLE HONDO",
        images: ["https://cerevenca.com/wp-content/uploads/2020/07/empaque-1024x1024.png"],
        category: "alimentos basicos",
        price: 6.5
      },
      {
        id: 16,
        name: "HUEVOS 1/2 CARTON",
        images: ["https://superfreshmarket.com.ve/wp-content/uploads/2021/02/medio-carton-Fresh.jpg"],
        category: "alimentos basicos",
        price: 25.3
      },
      {
        id: 17,
        name: "CARAOTAS PESADAS 1/2",
        images: ["https://labatata.com.ve/983-large_default/caraotas-arauquita-1k.jpg"],
        price: 8.9,
        category: "alimentos basicos"
      }
    ]);
    this.kanaSrv = ur, this.listProduct = [], this.limit = 0, this.paginationProducts$ = new U(this.listProduct), this.kanaSrv.listProduct.pipe(
      v((t) => this.listProduct = t),
      v(() => this.limit = this.listProduct.length),
      v(() => this.pagination(18)),
      v(() => console.log("Traer lo de kana", this.listProduct))
    ).subscribe();
  }
  pagination(t) {
    const e = this.listProduct.slice(0, t);
    this.paginationProducts$.next(e);
  }
  getProductById(t) {
    return this.listProduct.filter((i) => i.id === t)[0];
  }
  filterForName(t) {
    return this.listProduct.filter((i) => i.name.toLowerCase().includes(t.toLowerCase()));
  }
  getProductsForCategory(t) {
    return this.listProductCat.filter((i) => i.category == t);
  }
}
const Rt = new wn();
class Sn {
  constructor() {
    _(this, "newFavorite$", new Y());
    this.newFavorite$.pipe(
      v((t) => this.favoriteInteractive(t))
    ).subscribe(), this.initFavorites();
  }
  favoriteInteractive(t) {
    const e = this.getFavorites(), i = this.verifyProduct(t.id, e);
    if (!i)
      return this.addFavorite(t, e);
    if (i)
      return this.removeFavorite(t, e);
  }
  addFavorite(t, e) {
    return e.push(t), localStorage.setItem("Favorites", JSON.stringify(e)), !0;
  }
  removeFavorite(t, e) {
    const i = e.filter((o) => o.id !== t.id), n = JSON.stringify(i);
    return localStorage.setItem("Favorites", n), !1;
  }
  initFavorites() {
    localStorage.getItem("Favorites") || localStorage.setItem("Favorites", "[]");
  }
  verifyProduct(t) {
    return !!this.getFavorites().find((n) => n.id === t);
  }
  getFavorites() {
    const t = localStorage.getItem("Favorites");
    if (t)
      return JSON.parse(t);
  }
}
const K = new Sn();
class En extends m {
  constructor() {
    super(), this.productsMediator = Rt, this.favoriteSrv = K, this.shoppingCartSrv = x, this.listProduct = [], this.limit = 0, this.loader = !1;
  }
  render() {
    return f`
      <div class="container-home">
      ${this.loader ? f`
          <div class="container-cards">
            ${this.listProduct.map((t) => (t.style = this.favoriteSrv.verifyProduct(t.id), f`
                <product-card
                  counter=${this.getQuantity(t)}
                  @quantityChange=${this.productToShoppingCart}
                  .product=${t}
                  @productFavorite=${this.addProductToFavorites}
                >
                </product-card>
              `))}
          </div>` : f`<loader-component></loader-component>`}
      
      ${this.loader && this.listProduct.length < this.limit ? f`
          <div class="container-button">
            <button
              class="${this.activeButton ? "active" : ""}"
              @click="${this.incrementProducts}"
            >
              Ver más
            </button>
          </div>` : f``}
      </div>
      <footer-component></footer-component>
    `;
  }
  firstUpdated() {
    this.productsMediator.paginationProducts$.pipe(
      Xt((e) => e.length > 0),
      ir(200),
      v((e) => this.listProduct = e),
      v(() => this.limit = this.productsMediator.limit),
      v(() => this.loader = !0),
      v(() => this.requestUpdate())
    ).subscribe();
  }
  addProductToFavorites(t) {
    const e = t.detail.product;
    this.favoriteSrv.newFavorite$.next(e);
  }
  productToShoppingCart(t) {
    const e = t.detail.product;
    this.shoppingCartSrv.process(e);
  }
  incrementProducts() {
    this.productsMediator.pagination(this.listProduct.length + 8);
  }
  getQuantity(t) {
    return this.shoppingCartSrv.verifyDoExist(t);
  }
  createRenderRoot() {
    return this;
  }
}
customElements.define("home-browse", En);
class dr extends m {
  constructor() {
    super(), this.favoriteSrv = K, this.shoppingCartSrv = x, this.counter = 0, this.active = !1;
  }
  render() {
    return f`
      <div class="card-content">
        
        <div class="card-image">
          <img class="image" src="${this.product.images}" />
        </div>
          
        <div class="card-description">
          <p class="title">${this.product.name} ${this.product.presentation}</p>
          <p class="description">Bs. ${this.product.price.toFixed(2)}</p>
          
          <product-card-favorites-button
            class="favorite"
            .active=${this.product.style}
            @addProductToFavorites=${this.addProductToFavorites}>
          </product-card-favorites-button>
          
        </div>

        <product-card-button
          class="card-button"
          counter=${this.counter}
          @increment=${this.quantityChange}
          @decrement=${this.quantityChange}         
        ></product-card-button>

      </div>
    `;
  }
  addProductToFavorites(t) {
    const e = {
      detail: { product: this.product }
    };
    this.product.style = !this.product.style, this.requestUpdate(), this.dispatchEvent(new CustomEvent("productFavorite", e));
  }
  quantityChange(t) {
    const i = {
      detail: {
        product: {
          ...this.product,
          quantity: t.detail.quantity
        }
      }
    };
    this.dispatchEvent(new CustomEvent("quantityChange", i));
  }
  createRenderRoot() {
    return this;
  }
}
_(dr, "properties", {
  product: { type: Object },
  counter: { type: Number, Reflect: !0 },
  active: { type: Boolean }
});
customElements.define("product-card", dr);
class hr extends m {
  constructor() {
    super(), this.counter = 0;
  }
  render() {
    const t = this.counter === 0;
    return f`
      <div class="card-product-button-container">
        ${t ? f`
              <button 
                class="addButton" 
                @click=${this.increment}
              >
                Agregar
              </button>
            ` : f`
              <div class="button-container">\
                <button @click=${this.decrement}>-</button>
                <p>${this.counter}</p>
                <button @click=${this.increment}>+</button>
              </div>
            `}
      </div>
    `;
  }
  increment() {
    this.counter++;
    const e = {
      detail: { quantity: this.counter }
    };
    this.dispatchEvent(new CustomEvent("increment", e));
  }
  decrement() {
    this.counter--;
    const e = {
      detail: { quantity: this.counter }
    };
    this.dispatchEvent(new CustomEvent("decrement", e));
  }
  createRenderRoot() {
    return this;
  }
}
_(hr, "properties", {
  counter: {
    type: Number,
    Reflect: !0
  }
});
customElements.define("product-card-button", hr);
class pr extends m {
  constructor() {
    super(), this.active = !1;
  }
  render() {
    return f`
      <i 
        class='favorite-button material-icons ${this.active ? "active" : ""}'
        @click=${this.addProductToFavorites}
      >favorite
      </i>
    `;
  }
  addProductToFavorites() {
    this.dispatchEvent(new CustomEvent("addProductToFavorites"));
  }
  createRenderRoot() {
    return this;
  }
}
_(pr, "properties", {
  active: { type: Boolean }
});
customElements.define("product-card-favorites-button", pr);
class An extends m {
  constructor() {
    super(), this.productsMediator = Rt, this.favoriteSrv = K, this.shoppingCartSrv = x, this.listProduct = [], this.params = "", this.loader = !1;
  }
  render() {
    return f`
    <div class="content">
      ${this.loader ? f`
          <div class="container-cards-filtered">
            ${this.listProduct.length > 0 ? f`
                ${this.listProduct.map((t) => (t.style = this.favoriteSrv.verifyProduct(t.id), f`
                    <product-card
                      counter=${this.getQuantity(t)}
                      @quantityChange=${this.productToShoppingCart}
                      .product=${t}
                      @productFavorite=${this.addProductToFavorites}
                    >
                    </product-card>
                  `))}` : f`<div class="message">No hay productos que coincidan con tu búsqueda: <b>(${this.params})</b></div>`}  
          </div>` : f`
          <div class="loader-content">
            <loader-component></loader-component>
          </div>
        `}
      <footer-component></footer-component>
    </div>
    `;
  }
  async onBeforeEnter(t) {
    const e = t.params.name;
    this.params = e, this.productsMediator.paginationProducts$.pipe(
      Xt((n) => n.length > 0),
      nt(() => this.productsMediator.filterForName(e)),
      v((n) => this.listProduct = n),
      v(() => this.loader = !this.loader),
      v(() => this.requestUpdate())
    ).subscribe();
  }
  addProductToFavorites(t) {
    const e = t.detail.product;
    this.favoriteSrv.newFavorite$.next(e);
  }
  productToShoppingCart(t) {
    const e = t.detail.product;
    this.shoppingCartSrv.process(e);
  }
  getQuantity(t) {
    return this.shoppingCartSrv.verifyDoExist(t);
  }
  createRenderRoot() {
    return this;
  }
}
customElements.define("view-filtered", An);
class zt extends m {
  constructor() {
    super();
  }
  render() {
    return f`
            <div class="container">
                <picture>
                    <img src='/src/assets/images/zanahoria.svg'>
                </picture>
                <h1>P&aacute;gina no encontrada</h1>
                <button @click="${this.goBack}">Inicio</button>
            </div>
        `;
  }
  goBack() {
    y.go("/browse/");
  }
}
_(zt, "styles", Pr`
        * {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
            font-family: 'Roboto', sans-serif;
        }

        @keyframes rotateIn {
            from {
            transform: rotate( 0deg ) scale(0.2);
            opacity: 0;
            }
            to {
            transform: rotate( 360deg ) scale(1);
            opacity: 1;
            }
        }

        .container {
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

        picture {
            animation: rotateIn 0.5s ease-out;
            margin-bottom: 45px;
        }

        h1 {
            font-weight: 700;
            font-size: 48px;
        }

        h2 {
            font-weight: 400;
            font-size: 48px;
        }

        button {
            width: 177px;
            height: 39px;
            background: #F4A534;
            border: none;
            border-radius: 10px;
            line-height: 21px;
            text-align: center;
            font-size: 24px;
            font-weight: 500;
            height: 50px;
            width: 250px;
            cursor: pointer;
            margin-top: 70px;
            font-weight: 600;
        }

        button:hover {
            background: #ee9314;
        }
    `), _(zt, "properties", {});
customElements.define("page-not-found", zt);
class fr extends m {
  constructor() {
    super(), this.shoppingCartSrv = x, this.kanaSrv = ur, this.list = [], this.ammount = 0, this.dolarValue = 0, this.divisaValue = 0, this.shareUrl = "", this.componentDestroyed$ = new Y();
  }
  firstUpdated() {
    this.shoppingCartSrv.list.pipe(
      fn(this.componentDestroyed$),
      v((t) => this.list = t),
      At(() => this.shoppingCartSrv.ammount),
      v((t) => this.ammount = t),
      At(() => this.kanaSrv.dolarValue),
      v((t) => this.divisaValue = t),
      v((t) => t > 1 ? this.calculatePricesToUSD(t) : ""),
      v(() => this.requestUpdate())
    ).subscribe();
  }
  render() {
    return f`
      <div class="shopping-cart-header">
        <i class="material-icons" @click=${this.goBack}>arrow_back</i>
        <span>Mi Carrito</span>
      </div>
      <div class='shopping-cart-container'>
        
        <div class='shopping-cart-detail'>
          ${this.list.length > 0 ? this.list.map((t) => f`
                <shopping-cart-detail 
                  .product=${t}
                  divisaValue=${this.divisaValue}
                  @removeProduct=${this.removeProduct}
                  @quantityChange=${this.productToShoppingCart}
                >
                </shopping-cart-detail>`) : f`<h1 class="shopping-cart-empty">No hay productos en el carrito aún.</h1>`}
          ${this.list.length > 0 ? f`<a @click='${this.cleanList}'>Limpiar Lista</a>` : f``}
        </div>

        <div class='shopping-cart-summary'>
          <shopping-cart-summary 
            dolarValue=${this.dolarValue}
            ammount=${this.ammount}
          ></shopping-cart-summary>
          ${this.list.length > 0 ? f`
              <div class='shopping-cart-options'>
                <a 
                  @click=${this.shareList}
                  href="https://api.whatsapp.com/send?text=www.ceco-market.web.app/shopping-cart/share/${this.shareUrl}"
                  data-action="share/whatsapp/share"
                  target="_blank"
                >
                  Compartir
                </a>
              </div>
            ` : f``}
        </div>

      </div>
      <footer-component></footer-component>
    `;
  }
  calculatePricesToUSD() {
    this.dolarValue = this.ammount / this.divisaValue;
  }
  removeProduct(t) {
    const e = t.detail;
    this.shoppingCartSrv.cleanProduct(e);
  }
  productToShoppingCart(t) {
    const e = t.detail.product;
    this.shoppingCartSrv.process(e);
  }
  cleanList() {
    this.shoppingCartSrv.clean();
  }
  goBack() {
    y.go("/browse/");
  }
  shareList() {
    const t = this.shoppingCartSrv.getShareUrl();
    this.shareUrl = t, this.requestUpdate();
  }
  createRenderRoot() {
    return this;
  }
  disconnectedCallback() {
    this.componentDestroyed$.next(), this.componentDestroyed$.complete();
  }
}
_(fr, "properties", {
  list: { type: Array }
});
customElements.define("shopping-cart-list", fr);
class vr extends m {
  constructor() {
    super();
  }
  render() {
    return f`
            <div class="shopping-cart-detail-container">
                
                <div class="shopping-cart-description">
                    <img src=${this.product.images[0]}>
                    <div>
                        <h2>${this.product.name}</h2>
                        <h1>Bs. ${this.product.price.toFixed(2)}</h1>
                        <h3>$ ${this.divisaValue > 1 ? (this.product.price / this.divisaValue).toFixed(2) : "0.00"}</h3>
                    </div>
                </div>

                <div class="shopping-cart-quantity">
                    <h1 target="decrement" @click=${this.decrement}>-</h1>
                    <h1 target="quantity">${this.product.quantity}</h1>
                    <h1 target="increment" @click=${this.increment}>+</h1>
                </div>

                <div class="icon-container">
                    <i class="material-icons shopping-cart-icon" @click=${this.removeProduct}>delete</i>
                </div>

            </div>
        `;
  }
  increment() {
    this.product.quantity++, this.quantityChange(), this.requestUpdate();
  }
  decrement() {
    const t = this.product.quantity -= 1;
    t > 0 && this.quantityChange(), t === 0 && this.removeProduct(), this.requestUpdate();
  }
  quantityChange() {
    const t = {
      detail: {
        product: this.product
      }
    };
    this.dispatchEvent(new CustomEvent("quantityChange", t));
  }
  removeProduct() {
    const t = {
      detail: {
        ...this.product
      }
    };
    this.dispatchEvent(new CustomEvent("removeProduct", t));
  }
  createRenderRoot() {
    return this;
  }
}
_(vr, "properties", {
  product: { type: Object },
  divisaValue: { type: Number }
});
customElements.define("shopping-cart-detail", vr);
class mr extends m {
  constructor() {
    super(), this.ammount = 0, this.shoppingCartSrv = x;
  }
  render() {
    return f`
            <div class="shopping-cart-summary-container">
                <div class="summary-header">
                    <h1>Total Carrito</h1>
                </div>
                <div class="summary-body">
                    <img src="/src/assets/images/carrito.svg" >
                    <div class="summary-body_ammounts">
                        <div class="ammounts_bs">
                            <h1>Total</h1>
                            <h1>Bs. ${this.ammount}</h1>
                        </div>
                        <h1 class="ammounts_usd">$ ${this.dolarValue.toFixed(2)}</h1>
                    </div>
                </div>
                <div class="summary-footer">
                    El total no esta sujeto al impuesto IGTF, este valor será agregado dependiendo de su forma de pago
                </div>
            </div>
        `;
  }
  createRenderRoot() {
    return this;
  }
}
_(mr, "properties", {
  product: { type: Object },
  dolarValue: { type: Number },
  ammount: { type: Number }
});
customElements.define("shopping-cart-summary", mr);
class gr extends m {
  constructor() {
    super(), this.productsMediator = Rt, this.list = [], this.totalList = 0, this.params = [], this.loader = !1, this.componentDestroyed$ = new Y(), this.productsMediator.paginationProducts$.pipe(
      Xt((e) => e.length > 0),
      v(() => this.getProductsList()),
      v(() => this.loader = !this.loader),
      v(() => this.requestUpdate())
    ).subscribe();
  }
  async onBeforeEnter(t) {
    t.params.list.split("-").map((i) => i.split("=")).forEach(([i, n]) => {
      this.params.push({
        id: i,
        quantity: Number(n)
      });
    });
  }
  getProductsList() {
    let t = 0;
    this.params.forEach((e) => {
      const i = {
        ...this.productsMediator.getProductById(e.id),
        quantity: e.quantity,
        style: !1
      };
      this.list.push(i), t += i.price * i.quantity;
    }), this.totalList = t;
  }
  render() {
    return f`
      <div class="share-component-container">
        <div class="share-header">
          <i class="material-icons" @click=${this.goBack}>arrow_back</i>
          <span>Lista Compartida</span>
        </div>

        ${this.loader ? f`
            <div class="separator">
              <share-summary ammount=${this.totalList}></share-summary>

              <div class="shared-container">
                <div class="shared-elements">
                  ${this.list.map((t) => f`
                      <share-detail 
                        .product=${t}
                      ></share-detail>
                    `)}
                </div>
              </div>

            </div>` : f`<loader-component></loader-component>`}
      </div>
      <footer-component></footer-component>
    `;
  }
  createRenderRoot() {
    return this;
  }
  disconnectedCallback() {
    this.componentDestroyed$.next(), this.componentDestroyed$.complete();
  }
}
_(gr, "properties", {
  list: { type: Array }
});
customElements.define("share-component", gr);
class yr extends m {
  constructor() {
    super();
  }
  render() {
    return f`
        <ul class="list-product" @click=${this.checkProduct}>
            <li class="product ${this.product.style ? "checked" : ""}">
                <span class="checkbox">
                    <i class="material-icons check-icon">done</i>
                </span>
                <span class="product-text">
                    ${this.product.quantity}
                    &#215 ${this.product.name}
                    Precio: ${this.product.price.toFixed(2)}
                    = ${(this.product.price * this.product.quantity).toFixed(2)} Bs.
                </span>
            </li>
        </ul>
    `;
  }
  checkProduct() {
    this.product.style = !this.product.style, this.requestUpdate();
  }
  createRenderRoot() {
    return this;
  }
}
_(yr, "properties", {
  product: { type: Object }
});
customElements.define("share-detail", yr);
class _r extends m {
  constructor() {
    super();
  }
  render() {
    return f`
      <div class="share-summary-container">
        <div class="title">Total</div>
        <div class="ammount">Bs. ${this.ammount.toFixed(2)}</div>
      </div>
    `;
  }
  createRenderRoot() {
    return this;
  }
}
_(_r, "properties", {
  ammount: { type: Number }
});
customElements.define("share-summary", _r);
class Cn extends m {
  constructor() {
    super(), this.favoriteSrv = K, this.favoriteList = this.favoriteSrv.getFavorites(), this.shoppingCartSrv = x;
  }
  render() {
    return f`
      <div class="favorite-container">
        
        <div class="options">
          <i class="material-icons" @click=${this.goBack}>arrow_back</i>
          <span>Mis Favoritos</span>
        </div>

        <div class="products">
          ${this.favoriteList.map((t) => (t.style = this.favoriteSrv.verifyProduct(t.id), f` <product-card
              counter=${this.getQuantity(t)}
              @quantityChange=${this.productToShoppingCart}
              @productFavorite=${this.addProductToFavorites}
              .product="${t}"></product-card> `))}
        </div>

      </div>
      <footer-component></footer-component>
    `;
  }
  productToShoppingCart(t) {
    const e = t.detail.product;
    this.shoppingCartSrv.process(e);
  }
  addProductToFavorites(t) {
    let e = t.detail.product;
    this.favoriteSrv.favoriteInteractive(e);
    let i = K.getFavorites();
    this.favoriteList = i, this.requestUpdate();
  }
  getQuantity(t) {
    return this.shoppingCartSrv.verifyDoExist(t);
  }
  goBack() {
    y.go("/browse/");
  }
  createRenderRoot() {
    return this;
  }
}
customElements.define("favorites-browse", Cn);
class Pn extends m {
  constructor() {
    super(), this.productsMediator = Rt, this.categoriesSrv = or, this.shoppingCartSrv = x, this.favoriteSrv = K, this.productList = [], this.categoriesList = sr;
  }
  async onBeforeEnter(t) {
    const e = t.params.name.replace(/-/g, " ");
    this.productList = this.productsMediator.getProductsForCategory(e), this.categoriesSrv.currentPosition.next(e);
  }
  async onBeforeLeave() {
    this.categoriesSrv.currentPosition.next();
  }
  render() {
    return f`
      <div class="categories-container">

        <div class='categories-body'>
          <categories-list .categoriesList=${this.categoriesList}></categories-list>

          <div class="products">
            ${this.productList.length > 0 ? f`
                ${this.productList.map((t) => (t.style = this.favoriteSrv.verifyProduct(t.id), f`
                    <product-card
                      counter=${this.getQuantity(t)}
                      .product="${t}"
                      @quantityChange=${this.productToShoppingCart}
                      @productFavorite=${this.addProductToFavorites}
                    ></product-card>
                  `))}` : f`<div>No hay productos en esta categoría aún</div>`}
          </div>
        </div>

      </div>
    `;
  }
  productToShoppingCart(t) {
    const e = t.detail.product;
    this.shoppingCartSrv.process(e);
  }
  addProductToFavorites(t) {
    const e = t.detail.product;
    this.favoriteSrv.newFavorite$.next(e);
  }
  getQuantity(t) {
    return this.shoppingCartSrv.verifyDoExist(t);
  }
  createRenderRoot() {
    return this;
  }
}
customElements.define("categories-browse", Pn);
class br extends m {
  constructor() {
    super();
  }
  render() {
    return f`
      <div class="categories-list-container">
        <h1>Categorías</h1>
        <ul>
          ${this.categoriesList.map((t) => f`
            <li @click=${() => y.go(`/categories/${t.route}/`)}>
              <span>${t.icon}</span>
              ${t.name}
            </li>`)}
        </ul>
      </div>
    `;
  }
  createRenderRoot() {
    return this;
  }
}
_(br, "properties", {
  categoriesList: { type: Array }
});
customElements.define("categories-list", br);
class Rn extends m {
  constructor() {
    super();
  }
  firstUpdated() {
  }
  render() {
    return f`
      <div class="footer-container ">
        <div class="group-one">
          <div class="box" id="box-img">
            <figure>
              <a href="https://cecosesola.org/" target="_blank">
                <img
                  class="logo-cecosesola"
                  src="https://cecosesola.org/wp-content/uploads/2019/03/logo-cecosesola_1-removebg-preview.png"
                  alt="logo de cecosesola"
                />
              </a>
            </figure>
          </div>
          <div class="box">
            <!-- <h2 class="title-info-cecosesola">SOBRE NOSOTROS</h2> -->
            <p class="text-info-cecosesola">
              CECOSESOLA es una RED DE INTEGRACION con mas de 50 organizaciones
              comunitarias fundamentadas en la equidad, el apoyo y la
              responsabilidad.
            </p>
            <a
              class="link-page-cecosesola"
              href="https://cecosesola.org/"
              target="_blank"
            >
              <p id="link-page-cecosesola-text">
                ¡Visita nuestra pagina y Conocenos!
              </p>
            </a>
          </div>

          <div class="red-social">
            <h6 class="red-social-title" id="red-social-title">
              Redes Sociales:
            </h6>
            <div class="red-social-icons">
              <div class="red-social-icons--container">
                <a
                  id="social-icons"
                  href="https://www.facebook.com/RedCecosesola/"
                  target="_blank"
                  class="fa fa-facebook"
                ></a>
                <a
                  id="social-icons"
                  href="https://www.instagram.com/redcecosesola/"
                  target="_blank"
                  class="fa fa-instagram"
                ></a>
                <a
                  id="social-icons"
                  href="https://twitter.com/redcecosesola"
                  target="_blank"
                  class="fa fa-twitter"
                ></a>
                <a
                  id="social-icons"
                  href="https://www.youtube.com/channel/UC4Z6igtx966wHbfeumY9UwA"
                  target="_blank"
                  class="fa fa-youtube"
                ></a>
              </div>

              <figure>
                <a
                  id="form"
                  href="https://forms.gle/APaFDevGbqwiF8ts9"
                  target="_blank"
                  ><p id="text-form">Tu Opinion es importante , Evaluanos</p>
                  <div id="btn-form--container">
                    <button class="pulse">
                      <i
                        style="font-size: 40px; color: #f4a534 "
                        class="material-icons"
                        id="icon-form"
                        >arrow_circle_right</i
                      >
                    </button>
                  </div>
                </a>
              </figure>
            </div>
          </div>
        </div>

        <div class="group-two">
          <small
            >&copy;2023 <b>Cecosesola </b>-Todos los Derechos reservados.
          </small>
        </div>
      </div>
    `;
  }
  createRenderRoot() {
    return this;
  }
}
customElements.define("footer-component", Rn);
class xn extends m {
  constructor() {
    super();
  }
  render() {
    return f`
      <div class='container-loader'>
        <div class='loader'></div>
      </div>
    `;
  }
  createRenderRoot() {
    return this;
  }
}
customElements.define("loader-component", xn);
