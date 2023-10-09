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
    for (const s of n)
      if (s.type === "childList")
        for (const o of s.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && i(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function e(n) {
    const s = {};
    return n.integrity && (s.integrity = n.integrity), n.referrerpolicy && (s.referrerPolicy = n.referrerpolicy), n.crossorigin === "use-credentials" ? s.credentials = "include" : n.crossorigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin", s;
  }
  function i(n) {
    if (n.ep)
      return;
    n.ep = !0;
    const s = e(n);
    fetch(n.href, s);
  }
})();
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt = window, Gt = pt.ShadowRoot && (pt.ShadyCSS === void 0 || pt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Qt = Symbol(), ee = /* @__PURE__ */ new WeakMap();
class Oe {
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
const Pr = (r) => new Oe(typeof r == "string" ? r : r + "", void 0, Qt), Cr = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((i, n, s) => i + ((o) => {
    if (o._$cssResult$ === !0)
      return o.cssText;
    if (typeof o == "number")
      return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[s + 1], r[0]);
  return new Oe(e, r, Qt);
}, Rr = (r, t) => {
  Gt ? r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const i = document.createElement("style"), n = pt.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, r.appendChild(i);
  });
}, re = Gt ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return Pr(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Tt;
const yt = window, ie = yt.trustedTypes, xr = ie ? ie.emptyScript : "", ne = yt.reactiveElementPolyfillSupport, qt = { toAttribute(r, t) {
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
} }, Ie = (r, t) => t !== r && (t == t || r == r), Ot = { attribute: !0, type: String, converter: qt, reflect: !1, hasChanged: Ie };
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
      const s = this[t];
      this[e] = n, this.requestUpdate(t, s, i);
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
    const s = this.constructor._$Ep(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const o = (((n = i.converter) === null || n === void 0 ? void 0 : n.toAttribute) !== void 0 ? i.converter : qt).toAttribute(e, i.type);
      this._$El = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$El = null;
    }
  }
  _$AK(t, e) {
    var i;
    const n = this.constructor, s = n._$Ev.get(t);
    if (s !== void 0 && this._$El !== s) {
      const o = n.getPropertyOptions(s), l = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((i = o.converter) === null || i === void 0 ? void 0 : i.fromAttribute) !== void 0 ? o.converter : qt;
      this._$El = s, this[s] = l.fromAttribute(e, o.type), this._$El = null;
    }
  }
  requestUpdate(t, e, i) {
    let n = !0;
    t !== void 0 && (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || Ie)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, i))) : n = !1), !this.isUpdatePending && n && (this._$E_ = this._$Ej());
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
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((n, s) => this[s] = n), this._$Ei = void 0);
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (t = this._$ES) === null || t === void 0 || t.forEach((n) => {
        var s;
        return (s = n.hostUpdate) === null || s === void 0 ? void 0 : s.call(n);
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
M.finalized = !0, M.elementProperties = /* @__PURE__ */ new Map(), M.elementStyles = [], M.shadowRootOptions = { mode: "open" }, ne == null || ne({ ReactiveElement: M }), ((Tt = yt.reactiveElementVersions) !== null && Tt !== void 0 ? Tt : yt.reactiveElementVersions = []).push("1.4.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var It;
const _t = window, j = _t.trustedTypes, se = j ? j.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, T = `lit$${(Math.random() + "").slice(9)}$`, Ue = "?" + T, Lr = `<${Ue}>`, H = document, rt = (r = "") => H.createComment(r), it = (r) => r === null || typeof r != "object" && typeof r != "function", ke = Array.isArray, Tr = (r) => ke(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", tt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, oe = /-->/g, ae = />/g, U = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ce = /'/g, le = /"/g, Fe = /^(?:script|style|textarea|title)$/i, Or = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), p = Or(1), D = Symbol.for("lit-noChange"), b = Symbol.for("lit-nothing"), ue = /* @__PURE__ */ new WeakMap(), Ir = (r, t, e) => {
  var i, n;
  const s = (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0 ? i : t;
  let o = s._$litPart$;
  if (o === void 0) {
    const l = (n = e == null ? void 0 : e.renderBefore) !== null && n !== void 0 ? n : null;
    s._$litPart$ = o = new ot(t.insertBefore(rt(), l), l, void 0, e != null ? e : {});
  }
  return o._$AI(r), o;
}, q = H.createTreeWalker(H, 129, null, !1), Ur = (r, t) => {
  const e = r.length - 1, i = [];
  let n, s = t === 2 ? "<svg>" : "", o = tt;
  for (let a = 0; a < e; a++) {
    const c = r[a];
    let d, h, u = -1, f = 0;
    for (; f < c.length && (o.lastIndex = f, h = o.exec(c), h !== null); )
      f = o.lastIndex, o === tt ? h[1] === "!--" ? o = oe : h[1] !== void 0 ? o = ae : h[2] !== void 0 ? (Fe.test(h[2]) && (n = RegExp("</" + h[2], "g")), o = U) : h[3] !== void 0 && (o = U) : o === U ? h[0] === ">" ? (o = n != null ? n : tt, u = -1) : h[1] === void 0 ? u = -2 : (u = o.lastIndex - h[2].length, d = h[1], o = h[3] === void 0 ? U : h[3] === '"' ? le : ce) : o === le || o === ce ? o = U : o === oe || o === ae ? o = tt : (o = U, n = void 0);
    const $ = o === U && r[a + 1].startsWith("/>") ? " " : "";
    s += o === tt ? c + Lr : u >= 0 ? (i.push(d), c.slice(0, u) + "$lit$" + c.slice(u) + T + $) : c + T + (u === -2 ? (i.push(void 0), a) : $);
  }
  const l = s + (r[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(r) || !r.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [se !== void 0 ? se.createHTML(l) : l, i];
};
class nt {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let s = 0, o = 0;
    const l = t.length - 1, a = this.parts, [c, d] = Ur(t, e);
    if (this.el = nt.createElement(c, i), q.currentNode = this.el.content, e === 2) {
      const h = this.el.content, u = h.firstChild;
      u.remove(), h.append(...u.childNodes);
    }
    for (; (n = q.nextNode()) !== null && a.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) {
          const h = [];
          for (const u of n.getAttributeNames())
            if (u.endsWith("$lit$") || u.startsWith(T)) {
              const f = d[o++];
              if (h.push(u), f !== void 0) {
                const $ = n.getAttribute(f.toLowerCase() + "$lit$").split(T), g = /([.?@])?(.*)/.exec(f);
                a.push({ type: 1, index: s, name: g[2], strings: $, ctor: g[1] === "." ? Fr : g[1] === "?" ? Br : g[1] === "@" ? qr : Rt });
              } else
                a.push({ type: 6, index: s });
            }
          for (const u of h)
            n.removeAttribute(u);
        }
        if (Fe.test(n.tagName)) {
          const h = n.textContent.split(T), u = h.length - 1;
          if (u > 0) {
            n.textContent = j ? j.emptyScript : "";
            for (let f = 0; f < u; f++)
              n.append(h[f], rt()), q.nextNode(), a.push({ type: 2, index: ++s });
            n.append(h[u], rt());
          }
        }
      } else if (n.nodeType === 8)
        if (n.data === Ue)
          a.push({ type: 2, index: s });
        else {
          let h = -1;
          for (; (h = n.data.indexOf(T, h + 1)) !== -1; )
            a.push({ type: 7, index: s }), h += T.length - 1;
        }
      s++;
    }
  }
  static createElement(t, e) {
    const i = H.createElement("template");
    return i.innerHTML = t, i;
  }
}
function V(r, t, e = r, i) {
  var n, s, o, l;
  if (t === D)
    return t;
  let a = i !== void 0 ? (n = e._$Cl) === null || n === void 0 ? void 0 : n[i] : e._$Cu;
  const c = it(t) ? void 0 : t._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== c && ((s = a == null ? void 0 : a._$AO) === null || s === void 0 || s.call(a, !1), c === void 0 ? a = void 0 : (a = new c(r), a._$AT(r, e, i)), i !== void 0 ? ((o = (l = e)._$Cl) !== null && o !== void 0 ? o : l._$Cl = [])[i] = a : e._$Cu = a), a !== void 0 && (t = V(r, a._$AS(r, t.values), a, i)), t;
}
class kr {
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
    const { el: { content: i }, parts: n } = this._$AD, s = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : H).importNode(i, !0);
    q.currentNode = s;
    let o = q.nextNode(), l = 0, a = 0, c = n[0];
    for (; c !== void 0; ) {
      if (l === c.index) {
        let d;
        c.type === 2 ? d = new ot(o, o.nextSibling, this, t) : c.type === 1 ? d = new c.ctor(o, c.name, c.strings, this, t) : c.type === 6 && (d = new Nr(o, this, t)), this.v.push(d), c = n[++a];
      }
      l !== (c == null ? void 0 : c.index) && (o = q.nextNode(), l++);
    }
    return s;
  }
  m(t) {
    let e = 0;
    for (const i of this.v)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class ot {
  constructor(t, e, i, n) {
    var s;
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$C_ = (s = n == null ? void 0 : n.isConnected) === null || s === void 0 || s;
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
    t = V(this, t, e), it(t) ? t === b || t == null || t === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : t !== this._$AH && t !== D && this.$(t) : t._$litType$ !== void 0 ? this.T(t) : t.nodeType !== void 0 ? this.k(t) : Tr(t) ? this.O(t) : this.$(t);
  }
  S(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  k(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  $(t) {
    this._$AH !== b && it(this._$AH) ? this._$AA.nextSibling.data = t : this.k(H.createTextNode(t)), this._$AH = t;
  }
  T(t) {
    var e;
    const { values: i, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = nt.createElement(n.h, this.options)), n);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === s)
      this._$AH.m(i);
    else {
      const o = new kr(s, this), l = o.p(this.options);
      o.m(i), this.k(l), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ue.get(t.strings);
    return e === void 0 && ue.set(t.strings, e = new nt(t)), e;
  }
  O(t) {
    ke(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const s of t)
      n === e.length ? e.push(i = new ot(this.S(rt()), this.S(rt()), this, this.options)) : i = e[n], i._$AI(s), n++;
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
class Rt {
  constructor(t, e, i, n, s) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = b;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, i, n) {
    const s = this.strings;
    let o = !1;
    if (s === void 0)
      t = V(this, t, e, 0), o = !it(t) || t !== this._$AH && t !== D, o && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = s[0], a = 0; a < s.length - 1; a++)
        c = V(this, l[i + a], e, a), c === D && (c = this._$AH[a]), o || (o = !it(c) || c !== this._$AH[a]), c === b ? t = b : t !== b && (t += (c != null ? c : "") + s[a + 1]), this._$AH[a] = c;
    }
    o && !n && this.P(t);
  }
  P(t) {
    t === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class Fr extends Rt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  P(t) {
    this.element[this.name] = t === b ? void 0 : t;
  }
}
const Mr = j ? j.emptyScript : "";
class Br extends Rt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  P(t) {
    t && t !== b ? this.element.setAttribute(this.name, Mr) : this.element.removeAttribute(this.name);
  }
}
class qr extends Rt {
  constructor(t, e, i, n, s) {
    super(t, e, i, n, s), this.type = 5;
  }
  _$AI(t, e = this) {
    var i;
    if ((t = (i = V(this, t, e, 0)) !== null && i !== void 0 ? i : b) === D)
      return;
    const n = this._$AH, s = t === b && n !== b || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== b && (n === b || s);
    s && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && i !== void 0 ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Nr {
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
const de = _t.litHtmlPolyfillSupport;
de == null || de(nt, ot), ((It = _t.litHtmlVersions) !== null && It !== void 0 ? It : _t.litHtmlVersions = []).push("2.3.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Ut, kt;
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ir(e, this.renderRoot, this.renderOptions);
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
m.finalized = !0, m._$litElement$ = !0, (Ut = globalThis.litElementHydrateSupport) === null || Ut === void 0 || Ut.call(globalThis, { LitElement: m });
const he = globalThis.litElementPolyfillSupport;
he == null || he({ LitElement: m });
((kt = globalThis.litElementVersions) !== null && kt !== void 0 ? kt : globalThis.litElementVersions = []).push("3.2.2");
function bt(r) {
  return r = r || [], Array.isArray(r) ? r : [r];
}
function A(r) {
  return `[Vaadin.Router] ${r}`;
}
function jr(r) {
  if (typeof r != "object")
    return String(r);
  const t = Object.prototype.toString.call(r).match(/ (.*)\]$/)[1];
  return t === "Object" || t === "Array" ? `${t} ${JSON.stringify(r)}` : t;
}
const wt = "module", $t = "nomodule", Nt = [wt, $t];
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
  if (!F(r.action) && !Array.isArray(r.children) && !F(r.children) && !St(t) && !e.some((i) => E(r[i])))
    throw new Error(
      A(
        `Expected route config "${r.path}" to include either "${e.join('", "')}" or "action" function but none found.`
      )
    );
  if (t)
    if (E(t))
      pe(t);
    else if (Nt.some((i) => i in t))
      Nt.forEach((i) => i in t && pe(t[i]));
    else
      throw new Error(
        A('Expected route bundle to include either "' + $t + '" or "' + wt + '" keys, or both')
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
  bt(r).forEach((t) => Me(t));
}
function ve(r, t) {
  let e = document.head.querySelector('script[src="' + r + '"][async]');
  return e || (e = document.createElement("script"), e.setAttribute("src", r), t === wt ? e.setAttribute("type", wt) : t === $t && e.setAttribute($t, ""), e.async = !0), new Promise((i, n) => {
    e.onreadystatechange = e.onload = (s) => {
      e.__dynamicImportLoaded = !0, i(s);
    }, e.onerror = (s) => {
      e.parentNode && e.parentNode.removeChild(e), n(s);
    }, e.parentNode === null ? document.head.appendChild(e) : e.__dynamicImportLoaded && i();
  });
}
function Hr(r) {
  return E(r) ? ve(r) : Promise.race(
    Nt.filter((t) => t in r).map((t) => ve(r[t], t))
  );
}
function et(r, t) {
  return !window.dispatchEvent(new CustomEvent(
    `vaadin-router-${r}`,
    { cancelable: r === "go", detail: t }
  ));
}
function St(r) {
  return typeof r == "object" && !!r;
}
function F(r) {
  return typeof r == "function";
}
function E(r) {
  return typeof r == "string";
}
function Be(r) {
  const t = new Error(A(`Page not found (${r.pathname})`));
  return t.context = r, t.code = 404, t;
}
const B = new class {
}();
function Dr(r) {
  const t = r.port, e = r.protocol, s = e === "http:" && t === "80" || e === "https:" && t === "443" ? r.hostname : r.host;
  return `${e}//${s}`;
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
  const { pathname: n, search: s, hash: o } = t;
  et("go", { pathname: n, search: s, hash: o }) && (r.preventDefault(), r && r.type === "click" && window.scrollTo(0, 0));
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
  et("go", { pathname: t, search: e, hash: i });
}
const Kr = {
  activate() {
    window.addEventListener("popstate", ge);
  },
  inactivate() {
    window.removeEventListener("popstate", ge);
  }
};
var J = Ve, Gr = Wt, Qr = Xr, Wr = je, Jr = De, qe = "/", Ne = "./", Yr = new RegExp([
  "(\\\\.)",
  "(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"
].join("|"), "g");
function Wt(r, t) {
  for (var e = [], i = 0, n = 0, s = "", o = t && t.delimiter || qe, l = t && t.delimiters || Ne, a = !1, c; (c = Yr.exec(r)) !== null; ) {
    var d = c[0], h = c[1], u = c.index;
    if (s += r.slice(n, u), n = u + d.length, h) {
      s += h[1], a = !0;
      continue;
    }
    var f = "", $ = r[n], g = c[2], lt = c[3], I = c[4], P = c[5];
    if (!a && s.length) {
      var Lt = s.length - 1;
      l.indexOf(s[Lt]) > -1 && (f = s[Lt], s = s.slice(0, Lt));
    }
    s && (e.push(s), s = "", a = !1);
    var wr = f !== "" && $ !== void 0 && $ !== f, $r = P === "+" || P === "*", Sr = P === "?" || P === "*", Zt = f || o, te = lt || I;
    e.push({
      name: g || i++,
      prefix: f,
      delimiter: Zt,
      optional: Sr,
      repeat: $r,
      partial: wr,
      pattern: te ? Zr(te) : "[^" + L(Zt) + "]+?"
    });
  }
  return (s || n < r.length) && e.push(s + r.substr(n)), e;
}
function Xr(r, t) {
  return je(Wt(r, t));
}
function je(r) {
  for (var t = new Array(r.length), e = 0; e < r.length; e++)
    typeof r[e] == "object" && (t[e] = new RegExp("^(?:" + r[e].pattern + ")$"));
  return function(i, n) {
    for (var s = "", o = n && n.encode || encodeURIComponent, l = 0; l < r.length; l++) {
      var a = r[l];
      if (typeof a == "string") {
        s += a;
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
          if (d = o(c[h], a), !t[l].test(d))
            throw new TypeError('Expected all "' + a.name + '" to match "' + a.pattern + '"');
          s += (h === 0 ? a.prefix : a.delimiter) + d;
        }
        continue;
      }
      if (typeof c == "string" || typeof c == "number" || typeof c == "boolean") {
        if (d = o(String(c), a), !t[l].test(d))
          throw new TypeError('Expected "' + a.name + '" to match "' + a.pattern + '", but got "' + d + '"');
        s += a.prefix + d;
        continue;
      }
      if (a.optional) {
        a.partial && (s += a.prefix);
        continue;
      }
      throw new TypeError('Expected "' + a.name + '" to be ' + (a.repeat ? "an array" : "a string"));
    }
    return s;
  };
}
function L(r) {
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
  return De(Wt(r, e), t, e);
}
function De(r, t, e) {
  e = e || {};
  for (var i = e.strict, n = e.start !== !1, s = e.end !== !1, o = L(e.delimiter || qe), l = e.delimiters || Ne, a = [].concat(e.endsWith || []).map(L).concat("$").join("|"), c = n ? "^" : "", d = r.length === 0, h = 0; h < r.length; h++) {
    var u = r[h];
    if (typeof u == "string")
      c += L(u), d = h === r.length - 1 && l.indexOf(u[u.length - 1]) > -1;
    else {
      var f = u.repeat ? "(?:" + u.pattern + ")(?:" + L(u.delimiter) + "(?:" + u.pattern + "))*" : u.pattern;
      t && t.push(u), u.optional ? u.partial ? c += L(u.prefix) + "(" + f + ")?" : c += "(?:" + L(u.prefix) + "(" + f + "))?" : c += L(u.prefix) + "(" + f + ")";
    }
  }
  return s ? (i || (c += "(?:" + o + ")?"), c += a === "$" ? "$" : "(?=" + a + ")") : (i || (c += "(?:" + o + "(?=" + a + "))?"), d || (c += "(?=" + o + "|" + a + ")")), new RegExp(c, He(e));
}
function Ve(r, t, e) {
  return r instanceof RegExp ? ti(r, t) : Array.isArray(r) ? ei(r, t, e) : ri(r, t, e);
}
J.parse = Gr;
J.compile = Qr;
J.tokensToFunction = Wr;
J.tokensToRegExp = Jr;
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
  const s = `${r}|${e}`;
  let o = jt.get(s);
  if (!o) {
    const c = [];
    o = {
      keys: c,
      pattern: J(r, c, {
        end: e,
        strict: r === ""
      })
    }, jt.set(s, o);
  }
  const l = o.pattern.exec(t);
  if (!l)
    return null;
  const a = Object.assign({}, n);
  for (let c = 1; c < l.length; c++) {
    const d = o.keys[c - 1], h = d.name, u = l[c];
    (u !== void 0 || !ii.call(a, h)) && (d.repeat ? a[h] = u ? u.split(d.delimiter).map(ye) : [] : a[h] = u && ye(u));
  }
  return {
    path: l[0],
    keys: (i || []).concat(o.keys),
    params: a
  };
}
function ze(r, t, e, i, n) {
  let s, o, l = 0, a = r.path || "";
  return a.charAt(0) === "/" && (e && (a = a.substr(1)), e = !0), {
    next(c) {
      if (r === c)
        return { done: !0 };
      const d = r.__children = r.__children || r.children;
      if (!s && (s = ni(a, t, !d, i, n), s))
        return {
          done: !1,
          value: {
            route: r,
            keys: s.keys,
            params: s.params,
            path: s.path
          }
        };
      if (s && d)
        for (; l < d.length; ) {
          if (!o) {
            const u = d[l];
            u.parent = r;
            let f = s.path.length;
            f > 0 && t.charAt(f) === "/" && (f += 1), o = ze(
              u,
              t.substr(f),
              e,
              s.keys,
              s.params
            );
          }
          const h = o.next(c);
          if (!h.done)
            return {
              done: !1,
              value: h.value
            };
          o = null, l++;
        }
      return { done: !0 };
    }
  };
}
function si(r) {
  if (F(r.route.action))
    return r.route.action(r);
}
function oi(r, t) {
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
      let s = r.chain.length;
      for (; s-- && r.chain[s].route && r.chain[s].route !== e.parent; )
        r.chain.pop();
    }
    r.chain.push(n);
  }
}
class st {
  constructor(t, e = {}) {
    if (Object(t) !== t)
      throw new TypeError("Invalid routes");
    this.baseUrl = e.baseUrl || "", this.errorHandler = e.errorHandler, this.resolveRoute = e.resolveRoute || si, this.context = Object.assign({ resolver: this }, e.context), this.root = Array.isArray(t) ? { path: "", __children: t, parent: null, __synthetic: !0 } : t, this.root.parent = null;
  }
  getRoutes() {
    return [...this.root.__children];
  }
  setRoutes(t) {
    fe(t);
    const e = [...bt(t)];
    this.root.__children = e;
  }
  addRoutes(t) {
    return fe(t), this.root.__children.push(...bt(t)), this.getRoutes();
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
    let s = null, o = null, l = e;
    function a(c, d = s.value.route, h) {
      const u = h === null && s.value.route;
      return s = o || i.next(u), o = null, !c && (s.done || !oi(d, s.value.route)) ? (o = s, Promise.resolve(B)) : s.done ? Promise.reject(Be(e)) : (l = Object.assign(
        l ? { chain: l.chain ? l.chain.slice(0) : [] } : {},
        e,
        s.value
      ), ci(l, s.value), Promise.resolve(n(l)).then((f) => f != null && f !== B ? (l.result = f.result || f, l) : a(c, d, f)));
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
st.pathToRegexp = J;
const { pathToRegexp: _e } = st, be = /* @__PURE__ */ new Map();
function Ke(r, t, e) {
  const i = t.name || t.component;
  if (i && (r.has(i) ? r.get(i).push(t) : r.set(i, [t])), Array.isArray(e))
    for (let n = 0; n < e.length; n++) {
      const s = e[n];
      s.parent = t, Ke(r, s, s.__children || s.children);
    }
}
function we(r, t) {
  const e = r.get(t);
  if (e && e.length > 1)
    throw new Error(
      `Duplicate route with name "${t}". Try seting unique 'name' route properties.`
    );
  return e && e[0];
}
function $e(r) {
  let t = r.path;
  return t = Array.isArray(t) ? t[0] : t, t !== void 0 ? t : "";
}
function li(r, t = {}) {
  if (!(r instanceof st))
    throw new TypeError("An instance of Resolver is expected");
  const e = /* @__PURE__ */ new Map();
  return (i, n) => {
    let s = we(e, i);
    if (!s && (e.clear(), Ke(e, r.root, r.root.__children), s = we(e, i), !s))
      throw new Error(`Route "${i}" not found`);
    let o = be.get(s.fullPath);
    if (!o) {
      let a = $e(s), c = s.parent;
      for (; c; ) {
        const f = $e(c);
        f && (a = f.replace(/\/$/, "") + "/" + a.replace(/^\//, "")), c = c.parent;
      }
      const d = _e.parse(a), h = _e.tokensToFunction(d), u = /* @__PURE__ */ Object.create(null);
      for (let f = 0; f < d.length; f++)
        E(d[f]) || (u[d[f].name] = !0);
      o = { toPath: h, keys: u }, be.set(a, o), s.fullPath = a;
    }
    let l = o.toPath(n, t) || "/";
    if (t.stringifyQueryParams && n) {
      const a = {}, c = Object.keys(n);
      for (let h = 0; h < c.length; h++) {
        const u = c[h];
        o.keys[u] || (a[u] = n[u]);
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
function Ft(r) {
  return r != null;
}
function fi(r) {
  const t = Object.assign({}, r);
  return delete t.next, t;
}
function S({ pathname: r = "", search: t = "", hash: e = "", chain: i = [], params: n = {}, redirectFrom: s, resolver: o }, l) {
  const a = i.map((c) => c.route);
  return {
    baseUrl: o && o.baseUrl || "",
    pathname: r,
    search: t,
    hash: e,
    routes: a,
    route: l || a.length && a[a.length - 1] || null,
    params: n,
    redirectFrom: s,
    getUrl: (c = {}) => vt(
      y.pathToRegexp.compile(
        Ge(a)
      )(Object.assign({}, n, c)),
      o
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
function ft(r, t, e) {
  if (F(r))
    return r.apply(e, t);
}
function Pe(r, t, e) {
  return (i) => {
    if (i && (i.cancel || i.redirect))
      return i;
    if (e)
      return ft(e[r], t, e);
  };
}
function mi(r, t) {
  if (!Array.isArray(r) && !St(r))
    throw new Error(
      A(
        `Incorrect "children" value for the route ${t.path}: expected array or object, but got ${r}`
      )
    );
  t.__children = [];
  const e = bt(r);
  for (let i = 0; i < e.length; i++)
    Me(e[i]), t.__children.push(e[i]);
}
function ut(r) {
  if (r && r.length) {
    const t = r[0].parentNode;
    for (let e = 0; e < r.length; e++)
      t.removeChild(r[e]);
  }
}
function vt(r, t) {
  const e = t.__effectiveBaseUrl;
  return e ? t.constructor.__createUrl(r.replace(/^\//, ""), e).pathname : r;
}
function Ge(r) {
  return r.map((t) => t.path).reduce((t, e) => e.length ? t.replace(/\/$/, "") + "/" + e.replace(/^\//, "") : t, "");
}
class y extends st {
  constructor(t, e) {
    const i = document.head.querySelector("base"), n = i && i.getAttribute("href");
    super([], Object.assign({
      baseUrl: n && st.__createUrl(n, document.URL).pathname.replace(/[^\/]*$/, "")
    }, e)), this.resolveRoute = (o) => this.__resolveRoute(o);
    const s = y.NavigationTrigger;
    y.setTriggers.apply(y, Object.keys(s).map((o) => s[o])), this.baseUrl, this.ready, this.ready = Promise.resolve(t), this.location, this.location = S({ resolver: this }), this.__lastStartedRenderId = 0, this.__navigationEventHandler = this.__onNavigationEvent.bind(this), this.setOutlet(t), this.subscribe(), this.__createdByRouter = /* @__PURE__ */ new WeakMap(), this.__addedByRouter = /* @__PURE__ */ new WeakMap();
  }
  __resolveRoute(t) {
    const e = t.route;
    let i = Promise.resolve();
    F(e.children) && (i = i.then(() => e.children(fi(t))).then((s) => {
      !Ft(s) && !F(e.children) && (s = e.children), mi(s, e);
    }));
    const n = {
      redirect: (s) => Ae(t, s),
      component: (s) => {
        const o = document.createElement(s);
        return this.__createdByRouter.set(o, !0), o;
      }
    };
    return i.then(() => {
      if (this.__isLatestRender(t))
        return ft(e.action, [t, n], e);
    }).then((s) => {
      if (Ft(s) && (s instanceof HTMLElement || s.redirect || s === B))
        return s;
      if (E(e.redirect))
        return n.redirect(e.redirect);
      if (e.bundle)
        return Hr(e.bundle).then(() => {
        }, () => {
          throw new Error(A(`Bundle not found: ${e.bundle}. Check if the file name is correct`));
        });
    }).then((s) => {
      if (Ft(s))
        return s;
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
    return this.ready = this.resolve(n).then((s) => this.__fullyResolveChain(s)).then((s) => {
      if (this.__isLatestRender(s)) {
        const o = this.__previousContext;
        if (s === o)
          return this.__updateBrowserHistory(o, !0), this.location;
        if (this.location = S(s), e && this.__updateBrowserHistory(s, i === 1), et("location-changed", { router: this, location: this.location }), s.__skipAttach)
          return this.__copyUnchangedElements(s, o), this.__previousContext = s, this.location;
        this.__addAppearingContent(s, o);
        const l = this.__animateIfNeeded(s);
        return this.__runOnAfterEnterCallbacks(s), this.__runOnAfterLeaveCallbacks(s, o), l.then(() => {
          if (this.__isLatestRender(s))
            return this.__removeDisappearingContent(), this.__previousContext = s, this.location;
        });
      }
    }).catch((s) => {
      if (i === this.__lastStartedRenderId)
        throw e && this.__updateBrowserHistory(n), ut(this.__outlet && this.__outlet.children), this.location = S(Object.assign(n, { resolver: this })), et("error", Object.assign({ router: this, error: s }, n)), s;
    }), this.ready;
  }
  __fullyResolveChain(t, e = t) {
    return this.__findComponentContextAfterAllRedirects(e).then((i) => {
      const s = i !== e ? i : t, l = vt(
        Ge(i.chain),
        i.resolver
      ) === i.pathname, a = (c, d = c.route, h) => c.next(void 0, d, h).then((u) => u === null || u === B ? l ? c : d.parent !== null ? a(c, d.parent, u) : u : u);
      return a(i).then((c) => {
        if (c === null || c === B)
          throw Be(s);
        return c && c !== B && c !== i ? this.__fullyResolveChain(s, c) : this.__amendWithOnBeforeCallbacks(i);
      });
    });
  }
  __findComponentContextAfterAllRedirects(t) {
    const e = t.result;
    return e instanceof HTMLElement ? (vi(t, e), Promise.resolve(t)) : e.redirect ? this.__redirect(e.redirect, t.__redirectCount, t.__renderId).then((i) => this.__findComponentContextAfterAllRedirects(i)) : e instanceof Error ? Promise.reject(e) : Promise.reject(
      new Error(
        A(
          `Invalid route resolution result for path "${t.pathname}". Expected redirect object or HTML element, but got: "${jr(e)}". Double check the action return value for the route.`
        )
      )
    );
  }
  __amendWithOnBeforeCallbacks(t) {
    return this.__runOnBeforeCallbacks(t).then((e) => e === this.__previousContext || e === t ? e : this.__fullyResolveChain(e));
  }
  __runOnBeforeCallbacks(t) {
    const e = this.__previousContext || {}, i = e.chain || [], n = t.chain;
    let s = Promise.resolve();
    const o = () => ({ cancel: !0 }), l = (a) => Ae(t, a);
    if (t.__divergedChainIndex = 0, t.__skipAttach = !1, i.length) {
      for (let a = 0; a < Math.min(i.length, n.length) && !(i[a].route !== n[a].route || i[a].path !== n[a].path && i[a].element !== n[a].element || !this.__isReusableElement(i[a].element, n[a].element)); a = ++t.__divergedChainIndex)
        ;
      if (t.__skipAttach = n.length === i.length && t.__divergedChainIndex == n.length && this.__isReusableElement(t.result, e.result), t.__skipAttach) {
        for (let a = n.length - 1; a >= 0; a--)
          s = this.__runOnBeforeLeaveCallbacks(s, t, { prevent: o }, i[a]);
        for (let a = 0; a < n.length; a++)
          s = this.__runOnBeforeEnterCallbacks(s, t, { prevent: o, redirect: l }, n[a]), i[a].element.location = S(t, i[a].route);
      } else
        for (let a = i.length - 1; a >= t.__divergedChainIndex; a--)
          s = this.__runOnBeforeLeaveCallbacks(s, t, { prevent: o }, i[a]);
    }
    if (!t.__skipAttach)
      for (let a = 0; a < n.length; a++)
        a < t.__divergedChainIndex ? a < i.length && i[a].element && (i[a].element.location = S(t, i[a].route)) : (s = this.__runOnBeforeEnterCallbacks(s, t, { prevent: o, redirect: l }, n[a]), n[a].element && (n[a].element.location = S(t, n[a].route)));
    return s.then((a) => {
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
    const s = S(e);
    return t.then((o) => {
      if (this.__isLatestRender(e))
        return Pe("onBeforeLeave", [s, i, this], n.element)(o);
    }).then((o) => {
      if (!(o || {}).redirect)
        return o;
    });
  }
  __runOnBeforeEnterCallbacks(t, e, i, n) {
    const s = S(e, n.route);
    return t.then((o) => {
      if (this.__isLatestRender(e))
        return Pe("onBeforeEnter", [s, i, this], n.element)(o);
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
      const s = n ? "replaceState" : "pushState";
      window.history[s](null, document.title, t + e + i), window.dispatchEvent(new PopStateEvent("popstate", { state: "vaadin-router-ignore" }));
    }
  }
  __copyUnchangedElements(t, e) {
    let i = this.__outlet;
    for (let n = 0; n < t.__divergedChainIndex; n++) {
      const s = e && e.chain[n].element;
      if (s)
        if (s.parentNode === i)
          t.chain[n].element = s, i = s;
        else
          break;
    }
    return i;
  }
  __addAppearingContent(t, e) {
    this.__ensureOutlet(), this.__removeAppearingContent();
    const i = this.__copyUnchangedElements(t, e);
    this.__appearingContent = [], this.__disappearingContent = Array.from(i.children).filter(
      (s) => this.__addedByRouter.get(s) && s !== t.result
    );
    let n = i;
    for (let s = t.__divergedChainIndex; s < t.chain.length; s++) {
      const o = t.chain[s].element;
      o && (n.appendChild(o), this.__addedByRouter.set(o, !0), n === i && this.__appearingContent.push(o), n = o);
    }
  }
  __removeDisappearingContent() {
    this.__disappearingContent && ut(this.__disappearingContent), this.__disappearingContent = null, this.__appearingContent = null;
  }
  __removeAppearingContent() {
    this.__disappearingContent && this.__appearingContent && (ut(this.__appearingContent), this.__disappearingContent = null, this.__appearingContent = null);
  }
  __runOnAfterLeaveCallbacks(t, e) {
    if (!!e)
      for (let i = e.chain.length - 1; i >= t.__divergedChainIndex && this.__isLatestRender(t); i--) {
        const n = e.chain[i].element;
        if (!!n)
          try {
            const s = S(t);
            ft(
              n.onAfterLeave,
              [s, {}, e.resolver],
              n
            );
          } finally {
            this.__disappearingContent.indexOf(n) > -1 && ut(n.children);
          }
      }
  }
  __runOnAfterEnterCallbacks(t) {
    for (let e = t.__divergedChainIndex; e < t.chain.length && this.__isLatestRender(t); e++) {
      const i = t.chain[e].element || {}, n = S(t, t.chain[e].route);
      ft(
        i.onAfterEnter,
        [n, {}, t.resolver],
        i
      );
    }
  }
  __animateIfNeeded(t) {
    const e = (this.__disappearingContent || [])[0], i = (this.__appearingContent || [])[0], n = [], s = t.chain;
    let o;
    for (let l = s.length; l > 0; l--)
      if (s[l - 1].route.animate) {
        o = s[l - 1].route.animate;
        break;
      }
    if (e && i && o) {
      const l = St(o) && o.leave || "leaving", a = St(o) && o.enter || "entering";
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
    return this.__urlForName || (this.__urlForName = li(this)), vt(
      this.__urlForName(t, e),
      this
    );
  }
  urlForPath(t, e) {
    return vt(
      y.pathToRegexp.compile(t)(e),
      this
    );
  }
  static go(t) {
    const { pathname: e, search: i, hash: n } = E(t) ? this.__createUrl(t, "http://a") : t;
    return et("go", { pathname: e, search: i, hash: n });
  }
}
const gi = /\/\*\*\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i, mt = window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients;
function yi() {
  function r() {
    return !0;
  }
  return Qe(r);
}
function _i() {
  try {
    return bi() ? !0 : wi() ? mt ? !$i() : !yi() : !1;
  } catch {
    return !1;
  }
}
function bi() {
  return localStorage.getItem("vaadin.developmentmode.force");
}
function wi() {
  return ["localhost", "127.0.0.1"].indexOf(window.location.hostname) >= 0;
}
function $i() {
  return !!(mt && Object.keys(mt).map((t) => mt[t]).filter((t) => t.productionMode).length > 0);
}
function Qe(r, t) {
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
const Ce = function(r, t) {
  if (window.Vaadin.developmentMode)
    return Qe(r, t);
};
window.Vaadin.developmentMode === void 0 && (window.Vaadin.developmentMode = _i());
function Si() {
}
const Ei = function() {
  if (typeof Ce == "function")
    return Ce(Si);
};
window.Vaadin = window.Vaadin || {};
window.Vaadin.registrations = window.Vaadin.registrations || [];
window.Vaadin.registrations.push({
  is: "@vaadin/router",
  version: "1.7.4"
});
Ei();
y.NavigationTrigger = { POPSTATE: Kr, CLICK: Vr };
const Ai = [
  { path: "/list", component: "shopping-cart-list" },
  { path: "/share/:list", component: "share-component" }
], Pi = [
  { path: "/", component: "home-browse" },
  { path: "/browse/", component: "home-browse" },
  { path: "/filter/:name", component: "view-filtered" },
  { path: "/shopping-cart/", children: Ai },
  { path: "/categories/:name", component: "categories-browse" },
  { path: "/favorites/", component: "favorites-browse" },
  { path: "/page-not-found/", component: "page-not-found" },
  { path: "(.*)", redirect: "/page-not-found/" }
];
class Ci extends m {
  constructor() {
    super();
  }
  firstUpdated() {
    const t = this.renderRoot.querySelector("#outlet");
    new y(t).setRoutes(Pi);
  }
  render() {
    return p`
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
customElements.define("app-root", Ci);
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
class Li extends m {
  constructor() {
    super();
  }
  render() {
    return p`
      <div class="container-navbar">
        <div class="elements-navbar">
          <div class="nav-logo-container">
          <img class="nav-logo-feria"  src="https://i.ibb.co/ZxSGRqQ/Logo-feria-1.png">
          </div>
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
customElements.define("navbar-component", Li);
var Ht = function(r, t) {
  return Ht = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var n in i)
      Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
  }, Ht(r, t);
};
function R(r, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  Ht(r, t);
  function e() {
    this.constructor = r;
  }
  r.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
var Et = function() {
  return Et = Object.assign || function(t) {
    for (var e, i = 1, n = arguments.length; i < n; i++) {
      e = arguments[i];
      for (var s in e)
        Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
    }
    return t;
  }, Et.apply(this, arguments);
};
function Ti(r, t) {
  var e = {};
  for (var i in r)
    Object.prototype.hasOwnProperty.call(r, i) && t.indexOf(i) < 0 && (e[i] = r[i]);
  if (r != null && typeof Object.getOwnPropertySymbols == "function")
    for (var n = 0, i = Object.getOwnPropertySymbols(r); n < i.length; n++)
      t.indexOf(i[n]) < 0 && Object.prototype.propertyIsEnumerable.call(r, i[n]) && (e[i[n]] = r[i[n]]);
  return e;
}
function Oi(r, t, e, i) {
  function n(s) {
    return s instanceof e ? s : new e(function(o) {
      o(s);
    });
  }
  return new (e || (e = Promise))(function(s, o) {
    function l(d) {
      try {
        c(i.next(d));
      } catch (h) {
        o(h);
      }
    }
    function a(d) {
      try {
        c(i.throw(d));
      } catch (h) {
        o(h);
      }
    }
    function c(d) {
      d.done ? s(d.value) : n(d.value).then(l, a);
    }
    c((i = i.apply(r, t || [])).next());
  });
}
function We(r, t) {
  var e = { label: 0, sent: function() {
    if (s[0] & 1)
      throw s[1];
    return s[1];
  }, trys: [], ops: [] }, i, n, s, o;
  return o = { next: l(0), throw: l(1), return: l(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
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
        if (i = 1, n && (s = c[0] & 2 ? n.return : c[0] ? n.throw || ((s = n.return) && s.call(n), 0) : n.next) && !(s = s.call(n, c[1])).done)
          return s;
        switch (n = 0, s && (c = [c[0] & 2, s.value]), c[0]) {
          case 0:
          case 1:
            s = c;
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
            if (s = e.trys, !(s = s.length > 0 && s[s.length - 1]) && (c[0] === 6 || c[0] === 2)) {
              e = 0;
              continue;
            }
            if (c[0] === 3 && (!s || c[1] > s[0] && c[1] < s[3])) {
              e.label = c[1];
              break;
            }
            if (c[0] === 6 && e.label < s[1]) {
              e.label = s[1], s = c;
              break;
            }
            if (s && e.label < s[2]) {
              e.label = s[2], e.ops.push(c);
              break;
            }
            s[2] && e.ops.pop(), e.trys.pop();
            continue;
        }
        c = t.call(r, e);
      } catch (d) {
        c = [6, d], n = 0;
      } finally {
        i = s = 0;
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
function K(r, t) {
  var e = typeof Symbol == "function" && r[Symbol.iterator];
  if (!e)
    return r;
  var i = e.call(r), n, s = [], o;
  try {
    for (; (t === void 0 || t-- > 0) && !(n = i.next()).done; )
      s.push(n.value);
  } catch (l) {
    o = { error: l };
  } finally {
    try {
      n && !n.done && (e = i.return) && e.call(i);
    } finally {
      if (o)
        throw o.error;
    }
  }
  return s;
}
function G(r, t, e) {
  if (e || arguments.length === 2)
    for (var i = 0, n = t.length, s; i < n; i++)
      (s || !(i in t)) && (s || (s = Array.prototype.slice.call(t, 0, i)), s[i] = t[i]);
  return r.concat(s || Array.prototype.slice.call(t));
}
function N(r) {
  return this instanceof N ? (this.v = r, this) : new N(r);
}
function Ii(r, t, e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var i = e.apply(r, t || []), n, s = [];
  return n = {}, o("next"), o("throw"), o("return"), n[Symbol.asyncIterator] = function() {
    return this;
  }, n;
  function o(u) {
    i[u] && (n[u] = function(f) {
      return new Promise(function($, g) {
        s.push([u, f, $, g]) > 1 || l(u, f);
      });
    });
  }
  function l(u, f) {
    try {
      a(i[u](f));
    } catch ($) {
      h(s[0][3], $);
    }
  }
  function a(u) {
    u.value instanceof N ? Promise.resolve(u.value.v).then(c, d) : h(s[0][2], u);
  }
  function c(u) {
    l("next", u);
  }
  function d(u) {
    l("throw", u);
  }
  function h(u, f) {
    u(f), s.shift(), s.length && l(s[0][0], s[0][1]);
  }
}
function Ui(r) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = r[Symbol.asyncIterator], e;
  return t ? t.call(r) : (r = typeof z == "function" ? z(r) : r[Symbol.iterator](), e = {}, i("next"), i("throw"), i("return"), e[Symbol.asyncIterator] = function() {
    return this;
  }, e);
  function i(s) {
    e[s] = r[s] && function(o) {
      return new Promise(function(l, a) {
        o = r[s](o), n(l, a, o.done, o.value);
      });
    };
  }
  function n(s, o, l, a) {
    Promise.resolve(a).then(function(c) {
      s({ value: c, done: l });
    }, o);
  }
}
function w(r) {
  return typeof r == "function";
}
function Je(r) {
  var t = function(i) {
    Error.call(i), i.stack = new Error().stack;
  }, e = r(t);
  return e.prototype = Object.create(Error.prototype), e.prototype.constructor = e, e;
}
var Mt = Je(function(r) {
  return function(e) {
    r(this), this.message = e ? e.length + ` errors occurred during unsubscription:
` + e.map(function(i, n) {
      return n + 1 + ") " + i.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = e;
  };
});
function At(r, t) {
  if (r) {
    var e = r.indexOf(t);
    0 <= e && r.splice(e, 1);
  }
}
var at = function() {
  function r(t) {
    this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return r.prototype.unsubscribe = function() {
    var t, e, i, n, s;
    if (!this.closed) {
      this.closed = !0;
      var o = this._parentage;
      if (o)
        if (this._parentage = null, Array.isArray(o))
          try {
            for (var l = z(o), a = l.next(); !a.done; a = l.next()) {
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
          o.remove(this);
      var d = this.initialTeardown;
      if (w(d))
        try {
          d();
        } catch (g) {
          s = g instanceof Mt ? g.errors : [g];
        }
      var h = this._finalizers;
      if (h) {
        this._finalizers = null;
        try {
          for (var u = z(h), f = u.next(); !f.done; f = u.next()) {
            var $ = f.value;
            try {
              Re($);
            } catch (g) {
              s = s != null ? s : [], g instanceof Mt ? s = G(G([], K(s)), K(g.errors)) : s.push(g);
            }
          }
        } catch (g) {
          i = { error: g };
        } finally {
          try {
            f && !f.done && (n = u.return) && n.call(u);
          } finally {
            if (i)
              throw i.error;
          }
        }
      }
      if (s)
        throw new Mt(s);
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
    e === t ? this._parentage = null : Array.isArray(e) && At(e, t);
  }, r.prototype.remove = function(t) {
    var e = this._finalizers;
    e && At(e, t), t instanceof r && t._removeParent(this);
  }, r.EMPTY = function() {
    var t = new r();
    return t.closed = !0, t;
  }(), r;
}(), Ye = at.EMPTY;
function Xe(r) {
  return r instanceof at || r && "closed" in r && w(r.remove) && w(r.add) && w(r.unsubscribe);
}
function Re(r) {
  w(r) ? r() : r.unsubscribe();
}
var Jt = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1
}, Dt = {
  setTimeout: function(r, t) {
    for (var e = [], i = 2; i < arguments.length; i++)
      e[i - 2] = arguments[i];
    var n = Dt.delegate;
    return n != null && n.setTimeout ? n.setTimeout.apply(n, G([r, t], K(e))) : setTimeout.apply(void 0, G([r, t], K(e)));
  },
  clearTimeout: function(r) {
    var t = Dt.delegate;
    return ((t == null ? void 0 : t.clearTimeout) || clearTimeout)(r);
  },
  delegate: void 0
};
function Ze(r) {
  Dt.setTimeout(function() {
    throw r;
  });
}
function Vt() {
}
var dt = null;
function gt(r) {
  if (Jt.useDeprecatedSynchronousErrorHandling) {
    var t = !dt;
    if (t && (dt = { errorThrown: !1, error: null }), r(), t) {
      var e = dt, i = e.errorThrown, n = e.error;
      if (dt = null, i)
        throw n;
    }
  } else
    r();
}
var Yt = function(r) {
  R(t, r);
  function t(e) {
    var i = r.call(this) || this;
    return i.isStopped = !1, e ? (i.destination = e, Xe(e) && e.add(i)) : i.destination = Bi, i;
  }
  return t.create = function(e, i, n) {
    return new zt(e, i, n);
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
}(at), ki = Function.prototype.bind;
function Bt(r, t) {
  return ki.call(r, t);
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
        ht(i);
      }
  }, r.prototype.error = function(t) {
    var e = this.partialObserver;
    if (e.error)
      try {
        e.error(t);
      } catch (i) {
        ht(i);
      }
    else
      ht(t);
  }, r.prototype.complete = function() {
    var t = this.partialObserver;
    if (t.complete)
      try {
        t.complete();
      } catch (e) {
        ht(e);
      }
  }, r;
}(), zt = function(r) {
  R(t, r);
  function t(e, i, n) {
    var s = r.call(this) || this, o;
    if (w(e) || !e)
      o = {
        next: e != null ? e : void 0,
        error: i != null ? i : void 0,
        complete: n != null ? n : void 0
      };
    else {
      var l;
      s && Jt.useDeprecatedNextContext ? (l = Object.create(e), l.unsubscribe = function() {
        return s.unsubscribe();
      }, o = {
        next: e.next && Bt(e.next, l),
        error: e.error && Bt(e.error, l),
        complete: e.complete && Bt(e.complete, l)
      }) : o = e;
    }
    return s.destination = new Fi(o), s;
  }
  return t;
}(Yt);
function ht(r) {
  Ze(r);
}
function Mi(r) {
  throw r;
}
var Bi = {
  closed: !0,
  next: Vt,
  error: Mi,
  complete: Vt
}, Xt = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function tr(r) {
  return r;
}
function qi(r) {
  return r.length === 0 ? tr : r.length === 1 ? r[0] : function(e) {
    return r.reduce(function(i, n) {
      return n(i);
    }, e);
  };
}
var C = function() {
  function r(t) {
    t && (this._subscribe = t);
  }
  return r.prototype.lift = function(t) {
    var e = new r();
    return e.source = this, e.operator = t, e;
  }, r.prototype.subscribe = function(t, e, i) {
    var n = this, s = ji(t) ? t : new zt(t, e, i);
    return gt(function() {
      var o = n, l = o.operator, a = o.source;
      s.add(l ? l.call(s, a) : a ? n._subscribe(s) : n._trySubscribe(s));
    }), s;
  }, r.prototype._trySubscribe = function(t) {
    try {
      return this._subscribe(t);
    } catch (e) {
      t.error(e);
    }
  }, r.prototype.forEach = function(t, e) {
    var i = this;
    return e = xe(e), new e(function(n, s) {
      var o = new zt({
        next: function(l) {
          try {
            t(l);
          } catch (a) {
            s(a), o.unsubscribe();
          }
        },
        error: s,
        complete: n
      });
      i.subscribe(o);
    });
  }, r.prototype._subscribe = function(t) {
    var e;
    return (e = this.source) === null || e === void 0 ? void 0 : e.subscribe(t);
  }, r.prototype[Xt] = function() {
    return this;
  }, r.prototype.pipe = function() {
    for (var t = [], e = 0; e < arguments.length; e++)
      t[e] = arguments[e];
    return qi(t)(this);
  }, r.prototype.toPromise = function(t) {
    var e = this;
    return t = xe(t), new t(function(i, n) {
      var s;
      e.subscribe(function(o) {
        return s = o;
      }, function(o) {
        return n(o);
      }, function() {
        return i(s);
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
function Ni(r) {
  return r && w(r.next) && w(r.error) && w(r.complete);
}
function ji(r) {
  return r && r instanceof Yt || Ni(r) && Xe(r);
}
function Hi(r) {
  return w(r == null ? void 0 : r.lift);
}
function Y(r) {
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
function O(r, t, e, i, n) {
  return new Di(r, t, e, i, n);
}
var Di = function(r) {
  R(t, r);
  function t(e, i, n, s, o, l) {
    var a = r.call(this, e) || this;
    return a.onFinalize = o, a.shouldUnsubscribe = l, a._next = i ? function(c) {
      try {
        i(c);
      } catch (d) {
        e.error(d);
      }
    } : r.prototype._next, a._error = s ? function(c) {
      try {
        s(c);
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
}(Yt), Vi = Je(function(r) {
  return function() {
    r(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), X = function(r) {
  R(t, r);
  function t() {
    var e = r.call(this) || this;
    return e.closed = !1, e.currentObservers = null, e.observers = [], e.isStopped = !1, e.hasError = !1, e.thrownError = null, e;
  }
  return t.prototype.lift = function(e) {
    var i = new Le(this, this);
    return i.operator = e, i;
  }, t.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new Vi();
  }, t.prototype.next = function(e) {
    var i = this;
    gt(function() {
      var n, s;
      if (i._throwIfClosed(), !i.isStopped) {
        i.currentObservers || (i.currentObservers = Array.from(i.observers));
        try {
          for (var o = z(i.currentObservers), l = o.next(); !l.done; l = o.next()) {
            var a = l.value;
            a.next(e);
          }
        } catch (c) {
          n = { error: c };
        } finally {
          try {
            l && !l.done && (s = o.return) && s.call(o);
          } finally {
            if (n)
              throw n.error;
          }
        }
      }
    });
  }, t.prototype.error = function(e) {
    var i = this;
    gt(function() {
      if (i._throwIfClosed(), !i.isStopped) {
        i.hasError = i.isStopped = !0, i.thrownError = e;
        for (var n = i.observers; n.length; )
          n.shift().error(e);
      }
    });
  }, t.prototype.complete = function() {
    var e = this;
    gt(function() {
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
    var i = this, n = this, s = n.hasError, o = n.isStopped, l = n.observers;
    return s || o ? Ye : (this.currentObservers = null, l.push(e), new at(function() {
      i.currentObservers = null, At(l, e);
    }));
  }, t.prototype._checkFinalizedStatuses = function(e) {
    var i = this, n = i.hasError, s = i.thrownError, o = i.isStopped;
    n ? e.error(s) : o && e.complete();
  }, t.prototype.asObservable = function() {
    var e = new C();
    return e.source = this, e;
  }, t.create = function(e, i) {
    return new Le(e, i);
  }, t;
}(C), Le = function(r) {
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
}(X), k = function(r) {
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
    var e = this, i = e.hasError, n = e.thrownError, s = e._value;
    if (i)
      throw n;
    return this._throwIfClosed(), s;
  }, t.prototype.next = function(e) {
    r.prototype.next.call(this, this._value = e);
  }, t;
}(X), er = {
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
}(at), Pt = {
  setInterval: function(r, t) {
    for (var e = [], i = 2; i < arguments.length; i++)
      e[i - 2] = arguments[i];
    var n = Pt.delegate;
    return n != null && n.setInterval ? n.setInterval.apply(n, G([r, t], K(e))) : setInterval.apply(void 0, G([r, t], K(e)));
  },
  clearInterval: function(r) {
    var t = Pt.delegate;
    return ((t == null ? void 0 : t.clearInterval) || clearInterval)(r);
  },
  delegate: void 0
}, Ki = function(r) {
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
    var s = this.id, o = this.scheduler;
    return s != null && (this.id = this.recycleAsyncId(o, s, i)), this.pending = !0, this.delay = i, this.id = (n = this.id) !== null && n !== void 0 ? n : this.requestAsyncId(o, this.id, i), this;
  }, t.prototype.requestAsyncId = function(e, i, n) {
    return n === void 0 && (n = 0), Pt.setInterval(e.flush.bind(e, this), n);
  }, t.prototype.recycleAsyncId = function(e, i, n) {
    if (n === void 0 && (n = 0), n != null && this.delay === n && this.pending === !1)
      return i;
    i != null && Pt.clearInterval(i);
  }, t.prototype.execute = function(e, i) {
    if (this.closed)
      return new Error("executing a cancelled action");
    this.pending = !1;
    var n = this._execute(e, i);
    if (n)
      return n;
    this.pending === !1 && this.id != null && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
  }, t.prototype._execute = function(e, i) {
    var n = !1, s;
    try {
      this.work(e);
    } catch (o) {
      n = !0, s = o || new Error("Scheduled action threw falsy error");
    }
    if (n)
      return this.unsubscribe(), s;
  }, t.prototype.unsubscribe = function() {
    if (!this.closed) {
      var e = this, i = e.id, n = e.scheduler, s = n.actions;
      this.work = this.state = this.scheduler = null, this.pending = !1, At(s, this), i != null && (this.id = this.recycleAsyncId(n, i, null)), this.delay = null, r.prototype.unsubscribe.call(this);
    }
  }, t;
}(zi), Te = function() {
  function r(t, e) {
    e === void 0 && (e = r.now), this.schedulerActionCtor = t, this.now = e;
  }
  return r.prototype.schedule = function(t, e, i) {
    return e === void 0 && (e = 0), new this.schedulerActionCtor(this, t).schedule(i, e);
  }, r.now = er.now, r;
}(), Gi = function(r) {
  R(t, r);
  function t(e, i) {
    i === void 0 && (i = Te.now);
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
}(Te), Qi = new Gi(Ki), Wi = function(r) {
  return r && typeof r.length == "number" && typeof r != "function";
};
function Ji(r) {
  return w(r == null ? void 0 : r.then);
}
function Yi(r) {
  return w(r[Xt]);
}
function Xi(r) {
  return Symbol.asyncIterator && w(r == null ? void 0 : r[Symbol.asyncIterator]);
}
function Zi(r) {
  return new TypeError("You provided " + (r !== null && typeof r == "object" ? "an invalid object" : "'" + r + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function tn() {
  return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator;
}
var en = tn();
function rn(r) {
  return w(r == null ? void 0 : r[en]);
}
function nn(r) {
  return Ii(this, arguments, function() {
    var e, i, n, s;
    return We(this, function(o) {
      switch (o.label) {
        case 0:
          e = r.getReader(), o.label = 1;
        case 1:
          o.trys.push([1, , 9, 10]), o.label = 2;
        case 2:
          return [4, N(e.read())];
        case 3:
          return i = o.sent(), n = i.value, s = i.done, s ? [4, N(void 0)] : [3, 5];
        case 4:
          return [2, o.sent()];
        case 5:
          return [4, N(n)];
        case 6:
          return [4, o.sent()];
        case 7:
          return o.sent(), [3, 2];
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
function sn(r) {
  return w(r == null ? void 0 : r.getReader);
}
function xt(r) {
  if (r instanceof C)
    return r;
  if (r != null) {
    if (Yi(r))
      return on(r);
    if (Wi(r))
      return an(r);
    if (Ji(r))
      return cn(r);
    if (Xi(r))
      return rr(r);
    if (rn(r))
      return ln(r);
    if (sn(r))
      return un(r);
  }
  throw Zi(r);
}
function on(r) {
  return new C(function(t) {
    var e = r[Xt]();
    if (w(e.subscribe))
      return e.subscribe(t);
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function an(r) {
  return new C(function(t) {
    for (var e = 0; e < r.length && !t.closed; e++)
      t.next(r[e]);
    t.complete();
  });
}
function cn(r) {
  return new C(function(t) {
    r.then(function(e) {
      t.closed || (t.next(e), t.complete());
    }, function(e) {
      return t.error(e);
    }).then(null, Ze);
  });
}
function ln(r) {
  return new C(function(t) {
    var e, i;
    try {
      for (var n = z(r), s = n.next(); !s.done; s = n.next()) {
        var o = s.value;
        if (t.next(o), t.closed)
          return;
      }
    } catch (l) {
      e = { error: l };
    } finally {
      try {
        s && !s.done && (i = n.return) && i.call(n);
      } finally {
        if (e)
          throw e.error;
      }
    }
    t.complete();
  });
}
function rr(r) {
  return new C(function(t) {
    dn(r, t).catch(function(e) {
      return t.error(e);
    });
  });
}
function un(r) {
  return rr(nn(r));
}
function dn(r, t) {
  var e, i, n, s;
  return Oi(this, void 0, void 0, function() {
    var o, l;
    return We(this, function(a) {
      switch (a.label) {
        case 0:
          a.trys.push([0, 5, 6, 11]), e = Ui(r), a.label = 1;
        case 1:
          return [4, e.next()];
        case 2:
          if (i = a.sent(), !!i.done)
            return [3, 4];
          if (o = i.value, t.next(o), t.closed)
            return [2];
          a.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          return l = a.sent(), n = { error: l }, [3, 11];
        case 6:
          return a.trys.push([6, , 9, 10]), i && !i.done && (s = e.return) ? [4, s.call(e)] : [3, 8];
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
  var s = t.schedule(function() {
    e(), n ? r.add(this.schedule(null, i)) : this.unsubscribe();
  }, i);
  if (r.add(s), !n)
    return s;
}
function Q(r, t) {
  return Y(function(e, i) {
    var n = 0;
    e.subscribe(O(i, function(s) {
      i.next(r.call(t, s, n++));
    }));
  });
}
function pn(r, t, e, i, n, s, o, l) {
  var a = [], c = 0, d = 0, h = !1, u = function() {
    h && !a.length && !c && t.complete();
  }, f = function(g) {
    return c < i ? $(g) : a.push(g);
  }, $ = function(g) {
    s && t.next(g), c++;
    var lt = !1;
    xt(e(g, d++)).subscribe(O(t, function(I) {
      n == null || n(I), s ? f(I) : t.next(I);
    }, function() {
      lt = !0;
    }, void 0, function() {
      if (lt)
        try {
          c--;
          for (var I = function() {
            var P = a.shift();
            o ? hn(t, o, function() {
              return $(P);
            }) : $(P);
          }; a.length && c < i; )
            I();
          u();
        } catch (P) {
          t.error(P);
        }
    }));
  };
  return r.subscribe(O(t, f, function() {
    h = !0, u();
  })), function() {
    l == null || l();
  };
}
function Ct(r, t, e) {
  return e === void 0 && (e = 1 / 0), w(t) ? Ct(function(i, n) {
    return Q(function(s, o) {
      return t(i, s, n, o);
    })(xt(r(i, n)));
  }, e) : (typeof t == "number" && (e = t), Y(function(i, n) {
    return pn(i, n, r, e);
  }));
}
function ct(r, t) {
  return Y(function(e, i) {
    var n = 0;
    e.subscribe(O(i, function(s) {
      return r.call(t, s, n++) && i.next(s);
    }));
  });
}
function ir(r, t) {
  return t === void 0 && (t = Qi), Y(function(e, i) {
    var n = null, s = null, o = null, l = function() {
      if (n) {
        n.unsubscribe(), n = null;
        var c = s;
        s = null, i.next(c);
      }
    };
    function a() {
      var c = o + r, d = t.now();
      if (d < c) {
        n = this.schedule(void 0, c - d), i.add(n);
        return;
      }
      l();
    }
    e.subscribe(O(i, function(c) {
      s = c, o = t.now(), n || (n = t.schedule(a, r), i.add(n));
    }, function() {
      l(), i.complete();
    }, void 0, function() {
      s = n = null;
    }));
  });
}
function fn(r) {
  return Y(function(t, e) {
    xt(r).subscribe(O(e, function() {
      return e.complete();
    }, Vt)), !e.closed && t.subscribe(e);
  });
}
function v(r, t, e) {
  var i = w(r) || t || e ? { next: r, error: t, complete: e } : r;
  return i ? Y(function(n, s) {
    var o;
    (o = i.subscribe) === null || o === void 0 || o.call(i);
    var l = !0;
    n.subscribe(O(s, function(a) {
      var c;
      (c = i.next) === null || c === void 0 || c.call(i, a), s.next(a);
    }, function() {
      var a;
      l = !1, (a = i.complete) === null || a === void 0 || a.call(i), s.complete();
    }, function(a) {
      var c;
      l = !1, (c = i.error) === null || c === void 0 || c.call(i, a), s.error(a);
    }, function() {
      var a, c;
      l && ((a = i.unsubscribe) === null || a === void 0 || a.call(i)), (c = i.finalize) === null || c === void 0 || c.call(i);
    }));
  }) : tr;
}
function vn(r, t) {
  t === void 0 && (t = {});
  var e = t.selector, i = Ti(t, ["selector"]);
  return new C(function(n) {
    var s = new AbortController(), o = s.signal, l = !0, a = i.signal;
    if (a)
      if (a.aborted)
        s.abort();
      else {
        var c = function() {
          o.aborted || s.abort();
        };
        a.addEventListener("abort", c), n.add(function() {
          return a.removeEventListener("abort", c);
        });
      }
    var d = Et(Et({}, i), { signal: o }), h = function(u) {
      l = !1, n.error(u);
    };
    return fetch(r, d).then(function(u) {
      e ? xt(e(u)).subscribe(O(n, void 0, function() {
        l = !1, n.complete();
      }, h)) : (l = !1, n.next(u), n.complete());
    }).catch(h), function() {
      l && s.abort();
    };
  });
}
const mn = {
  baseUrl: "https://kana.develop.cecosesola.imolko.net/graphql"
};
class gn {
  constructor() {
    this.listProduct = new k([]), this.dolarValue = new k(1), this.divisa = 1, this.getListProductFromKana$().pipe(v((t) => this.listProduct.next(t))).subscribe(), this.getDolarValue$().pipe(v((t) => this.dolarValue.next(t))).subscribe();
  }
  getQuery(t) {
    const e = mn.baseUrl, n = {
      ...{
        operationName: null,
        variables: {}
      },
      query: t
    }, s = {
      method: "POST",
      body: JSON.stringify(n),
      headers: new Headers({ "content-type": "application/json" })
    };
    return vn(e, s).pipe(
      Ct((l) => l.json())
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
      Q(
        ({
          data: {
            currentPriceList: {
              products: { edges: n }
            }
          }
        }) => n.map(
          ({
            node: {
              product: { pricePublished: s, ...o }
            }
          }) => ({
            ...o,
            price: parseFloat(
              ((s == null ? void 0 : s.priceBase.amount) * this.divisa).toFixed(2)
            )
          })
        )
      )
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
      Q(
        ({
          data: {
            currentPriceList: {
              officialRate: { forSales: i }
            }
          }
        }) => i[1].value
      ),
      v((i) => this.divisa = i)
    );
  }
}
const nr = new gn();
class yn {
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
    this.kanaSrv = nr, this.listProduct = [], this.limit = 0, this.paginationProducts$ = new k(this.listProduct), this.kanaSrv.listProduct.pipe(
      v((t) => this.listProduct = t),
      v(() => this.limit = this.listProduct.length),
      v(() => this.pagination(18))
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
const Z = new yn();
class _n {
  constructor() {
    this.localStorageSrv = xi, this.productsMediator = Z, this.products = this.localStorageSrv.get() || [], this.currentList = [], this.currentList$ = new k(this.currentList), this.counter = new k(this.products.length), this.ammount = new k(0), this.productsMediator.paginationProducts$.pipe(
      ct((t) => t.length > 0),
      Q(() => this.products.map((t) => this.productConstructed(t))),
      v((t) => console.log(t)),
      v((t) => this.currentList = t),
      v((t) => this.currentList$.next(t)),
      v(() => this.calculateTotal())
    ).subscribe(), this.calculateTotal();
  }
  productConstructed(t) {
    const e = this.productsMediator.getProductById(t.id);
    return e.quantity = t.quantity, e;
  }
  generateNewListProduct(t, e) {
  }
  process(t) {
    t.quantity > 0 && this.addProduct(t), t.quantity === 0 && this.removeProduct(t), this.counter.next(this.currentList.length), this.calculateTotal(), this.currentList$.next(this.currentList), this.localStorageSrv.save(this.currentList);
  }
  addProduct(t) {
    const e = this.currentList.find((i) => i.id === t.id);
    e || this.currentList.push(t), e && this.modifyProductQuantity(t);
  }
  removeProduct(t) {
    this.currentList = this.currentList.filter((e) => e.id !== t.id);
  }
  modifyProductQuantity(t) {
    this.currentList.forEach((e) => {
      e.id === t.id && (e.quantity = t.quantity);
    });
  }
  calculateTotal() {
    let t = 0;
    this.currentList.forEach((e) => t += e.price * e.quantity), this.ammount.next(t.toFixed(2));
  }
  cleanProduct(t) {
    this.removeProduct(t), this.counter.next(this.currentList.length), this.calculateTotal(), this.currentList$.next(this.currentList), this.localStorageSrv.save(this.currentList);
  }
  clean() {
    this.currentList = [], this.ammount.next(0), this.counter.next(0), this.currentList$.next(this.currentList), this.localStorageSrv.save(this.currentList);
  }
  verifyDoExist(t) {
    const e = this.currentList.find((i) => t.id === i.id);
    return e ? e.quantity : 0;
  }
  getShareUrl() {
    let t = "";
    return this.currentList.forEach((e) => t += `${e.id}=${e.quantity}-`), t.slice(0, -1);
  }
}
const x = new _n();
class sr extends m {
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
    return p`
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
_(sr, "properties", {});
customElements.define("shoppingcart-component", sr);
class bn extends m {
  constructor() {
    super();
    _(this, "showIconClear", !1);
    this.filter$ = new X("").pipe(
      ir(300),
      Q(() => this.input.value),
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
    return p`
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
            
              ${this.showIconClear ? p`
                 <i 
               class="material-icons"
               class="icon-clear"
               @click=${this.clearInput}
               >
               cancel
               </i>
                ` : p`
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
customElements.define("searchbox-component", bn);
class wn extends m {
  constructor() {
    super(), this.menuList = [
      { title: "Inicio", route: "browse" },
      { title: "Favoritos", route: "favorites" }
    ];
  }
  render() {
    return p`
        <div class="navbar-menu-container">
            ${this.menuList.map((t) => p`
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
customElements.define("navbar-menu-component", wn);
class $n {
  constructor() {
    this.currentPosition = new k();
  }
}
const or = new $n(), ar = [
  { name: "Alimentos basicos", icon: "\u{1F37D}\uFE0F", route: "alimentos-basicos" },
  { name: "Frutas y verduras", icon: "\u{1F955}", route: "frutas-y-verduras" },
  { name: "Bebidas y lacteos", icon: "\u2615", route: "bebidas-y-lacteos" },
  { name: "Salsas y aderezos", icon: "\u{1F957}", route: "salsas-y-aderezos" },
  { name: "Detergentes", icon: "\u{1F9FC}", route: "detergentes" },
  { name: "Cereales", icon: "\u{1F33D}", route: "cereales" },
  { name: "Dulces y snacks", icon: "\u{1F36A}", route: "dulces-y-snacks" }
];
class cr extends m {
  constructor() {
    super(), this.categoriesSrv = or, this.categoriesList = ar, this.selectTitle = this.selectTitleDefault = "Selecciona una Categor\xEDa", this.active = !1;
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
    return p`
      <div
        class='icon-categories-container ${this.active ? "active" : ""}'
        @click=${this.activeToggle}
      >

        <div class='select-btn'>
          <div class=''>${this.selectTitle}</div>
          <i class='material-icons'>expand_more</i>
        </div>

        <ul class='options'>
          ${this.categoriesList.map((t) => p`
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
_(cr, "properties", {});
customElements.define("select-categories", cr);
class lr extends m {
  constructor() {
    super();
  }
  render() {
    return p`
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
_(lr, "properties", {
  category: { type: Object }
});
customElements.define("category-component", lr);
class Sn extends m {
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
    return p`
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
customElements.define("mobile-menu", Sn);
class ur extends m {
  constructor() {
    super(), this.counter = 0;
  }
  render() {
    return p`
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
_(ur, "properties", {
  counter: { type: Number }
});
customElements.define("mobile-menu-shopping", ur);
class En {
  constructor() {
    _(this, "newFavorite$", new X());
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
    const i = e.filter((s) => s.id !== t.id), n = JSON.stringify(i);
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
const W = new En();
class An extends m {
  constructor() {
    super(), this.productsMediator = Z, this.favoriteSrv = W, this.shoppingCartSrv = x, this.listProduct = [], this.limit = 0, this.loader = !1;
  }
  render() {
    return p`
      <div class="container-home">
      ${this.loader ? p`
          <div class="container-cards">
            ${this.listProduct.map((t) => (t.style = this.favoriteSrv.verifyProduct(t.id), p`
                <product-card
                  counter=${this.getQuantity(t)}
                  @quantityChange=${this.productToShoppingCart}
                  .product=${t}
                  @productFavorite=${this.addProductToFavorites}
                >
                </product-card>
              `))}
          </div>` : p`<loader-component></loader-component>`}
      
      ${this.loader && this.listProduct.length < this.limit ? p`
          <div class="container-button">
            <button
              class="${this.activeButton ? "active" : ""}"
              @click="${this.incrementProducts}"
            >
              Ver más
            </button>
          </div>` : p``}
      </div>
      <footer-component></footer-component>
    `;
  }
  firstUpdated() {
    this.productsMediator.paginationProducts$.pipe(
      ct((e) => e.length > 0),
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
customElements.define("home-browse", An);
class dr extends m {
  constructor() {
    super(), this.favoriteSrv = W, this.shoppingCartSrv = x, this.counter = 0, this.active = !1;
  }
  render() {
    return p`
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
    return p`
      <div class="card-product-button-container">
        ${t ? p`
              <button 
                class="addButton" 
                @click=${this.increment}
              >
                Agregar
              </button>
            ` : p`
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
    return p`
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
class Pn extends m {
  constructor() {
    super(), this.productsMediator = Z, this.favoriteSrv = W, this.shoppingCartSrv = x, this.listProduct = [], this.params = "", this.loader = !1;
  }
  render() {
    return p`
    <div class="content">
      ${this.loader ? p`
          <div class="container-cards-filtered">
            ${this.listProduct.length > 0 ? p`
                ${this.listProduct.map((t) => (t.style = this.favoriteSrv.verifyProduct(t.id), p`
                    <product-card
                      counter=${this.getQuantity(t)}
                      @quantityChange=${this.productToShoppingCart}
                      .product=${t}
                      @productFavorite=${this.addProductToFavorites}
                    >
                    </product-card>
                  `))}` : p`<div class="message">No hay productos que coincidan con tu búsqueda: <b>(${this.params})</b></div>`}  
          </div>` : p`
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
      ct((n) => n.length > 0),
      Q(() => this.productsMediator.filterForName(e)),
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
customElements.define("view-filtered", Pn);
class Kt extends m {
  constructor() {
    super();
  }
  render() {
    return p`
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
_(Kt, "styles", Cr`
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
    `), _(Kt, "properties", {});
customElements.define("page-not-found", Kt);
class fr extends m {
  constructor() {
    super(), this.shoppingCartSrv = x, this.kanaSrv = nr, this.productsMediator = Z, this.list = [], this.loader = !1, this.ammount = 0, this.dolarValue = 0, this.divisaValue = 0, this.shareUrl = "", this.componentDestroyed$ = new X();
  }
  firstUpdated() {
    this.shoppingCartSrv.currentList$.pipe(
      fn(this.componentDestroyed$),
      v((t) => this.list = t),
      Ct(() => this.shoppingCartSrv.ammount),
      v((t) => this.ammount = t),
      Ct(() => this.kanaSrv.dolarValue),
      v((t) => this.divisaValue = t),
      v((t) => t > 1 ? this.calculatePricesToUSD(t) : ""),
      v(() => this.requestUpdate())
    ).subscribe(), this.productsMediator.paginationProducts$.pipe(
      ct((t) => t.length > 0),
      v(() => this.loader = !0),
      v(() => this.requestUpdate())
    ).subscribe();
  }
  render() {
    return p`
      <div class="shopping-cart-header">
        <i class="material-icons" @click=${this.goBack}>arrow_back</i>
        <span>Mi Carrito</span>
      </div>
      ${this.loader ? p`
          <div class='shopping-cart-container'>
        
            <div class='shopping-cart-detail'>
              ${this.list.length > 0 ? this.list.map((t) => p`
                    <shopping-cart-detail 
                      .product=${this.getProduct(t)}
                      divisaValue=${this.divisaValue}
                      @removeProduct=${this.removeProduct}
                      @quantityChange=${this.productToShoppingCart}
                    >
                    </shopping-cart-detail>`) : p`<h1 class="shopping-cart-empty">No hay productos en el carrito aún.</h1>`}
              ${this.list.length > 0 ? p`<a @click='${this.cleanList}'>Limpiar Lista</a>` : p``}
            </div>

            <div class='shopping-cart-summary'>
              <shopping-cart-summary 
                dolarValue=${this.dolarValue}
                ammount=${this.ammount}
              ></shopping-cart-summary>
              ${this.list.length > 0 ? p`
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
                ` : p``}
            </div>

          </div>
        ` : p`<loader-component></loader-component>`}
      <footer-component></footer-component>
    `;
  }
  getProduct(t) {
    const e = this.productsMediator.getProductById(t.id);
    return e.quantity = t.quantity, e;
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
    return p`
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
    return p`
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
    super(), this.productsMediator = Z, this.list = [], this.totalList = 0, this.params = [], this.loader = !1, this.componentDestroyed$ = new X(), this.productsMediator.paginationProducts$.pipe(
      ct((e) => e.length > 0),
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
    return p`
      <div class="share-component-container">
        <div class="share-header">
          <i class="material-icons" @click=${this.goBack}>arrow_back</i>
          <span>Lista Compartida</span>
        </div>

        ${this.loader ? p`
            <div class="separator">
              <share-summary ammount=${this.totalList}></share-summary>

              <div class="shared-container">
                <div class="shared-elements">
                  ${this.list.map((t) => p`
                      <share-detail 
                        .product=${t}
                      ></share-detail>
                    `)}
                </div>
              </div>

            </div>` : p`<loader-component></loader-component>`}
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
    return p`
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
    return p`
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
    super(), this.favoriteSrv = W, this.favoriteList = this.favoriteSrv.getFavorites(), this.shoppingCartSrv = x;
  }
  render() {
    return p`
      <div class="favorite-container">
        
        <div class="options">
          <i class="material-icons" @click=${this.goBack}>arrow_back</i>
          <span>Mis Favoritos</span>
        </div>

        <div class="products">
          ${this.favoriteList.map((t) => (t.style = this.favoriteSrv.verifyProduct(t.id), p` <product-card
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
    let i = W.getFavorites();
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
class Rn extends m {
  constructor() {
    super(), this.productsMediator = Z, this.categoriesSrv = or, this.shoppingCartSrv = x, this.favoriteSrv = W, this.productList = [], this.categoriesList = ar;
  }
  async onBeforeEnter(t) {
    const e = t.params.name.replace(/-/g, " ");
    this.productList = this.productsMediator.getProductsForCategory(e), this.categoriesSrv.currentPosition.next(e);
  }
  async onBeforeLeave() {
    this.categoriesSrv.currentPosition.next();
  }
  render() {
    return p`
      <div class="categories-container">

        <div class='categories-body'>
          <categories-list .categoriesList=${this.categoriesList}></categories-list>

          <div class="products">
            ${this.productList.length > 0 ? p`
                ${this.productList.map((t) => (t.style = this.favoriteSrv.verifyProduct(t.id), p`
                    <product-card
                      counter=${this.getQuantity(t)}
                      .product="${t}"
                      @quantityChange=${this.productToShoppingCart}
                      @productFavorite=${this.addProductToFavorites}
                    ></product-card>
                  `))}` : p`<div>No hay productos en esta categoría aún</div>`}
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
customElements.define("categories-browse", Rn);
class br extends m {
  constructor() {
    super();
  }
  render() {
    return p`
      <div class="categories-list-container">
        <h1>Categorías</h1>
        <ul>
          ${this.categoriesList.map((t) => p`
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
class xn extends m {
  constructor() {
    super();
  }
  render() {
    return p`
      <div class="footer-container ">

        <div class="group-one">
          <div class="box" id="box-img">
            <!-- logo 1 de cecosesola -->

            <figure>
              <a href="https://cecosesola.org/" target="_blank">
                <img
                  class="logo-cecosesola"
                  src="https://i.ibb.co/4SwQST6/Logo-Cecosesola-RLH-White.png"
                  alt="logo de cecosesola"
                />
              </a>
            </figure>

          </div>
          <div class="box">
            <!-- logo 2 de cecosesola -->
            <figure>
            <img
                  class="logo-cecosesola-two"
                  src="https://i.ibb.co/2PPBhg8/Logo-White-PNG.png"
                  alt="logo de cecosesola"
                />
            </figure>
            
            
          </div>

          <div class="red-social">
            <h6 class="red-social-title" id="red-social-title">
              Redes Sociales
            </h6>
            <div class="red-social-icons">
              <div class="red-social-icons--container">
                <a
                  id="social-icons"
                  href="https://www.facebook.com/RedCecosesola/"
                  target="_blank"
                  class="fa fa-facebook fa-2x"
                ></a>
                <a
                  id="social-icons"
                  href="https://twitter.com/redcecosesola"
                  target="_blank"
                  class="fa-brands fa-x-twitter fa-2x"
                ><svg xmlns="http://www.w3.org/2000/svg" height="0.75em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#564a00}</style><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg></a>
                <a
                  id="social-icons"
                  href="https://www.instagram.com/redcecosesola/"
                  target="_blank"
                  class="fa fa-instagram fa-2x"   
                ></a>
                <!-- YOUTUBE -->
                <a
                  id="social-icons"
                  href="https://www.youtube.com/channel/UC4Z6igtx966wHbfeumY9UwA"
                  target="_blank"
                  class="fa fa-youtube fa-2x"
                ></a>
                <!-- TELEGRAM -->
                <a
                  id="social-icons"
                  href="https://t.me/RedCecosesola"
                  target="_blank"
                  class="fa fa-telegram fa-2x"
                ></a>      
                 <!-- TIKTOK -->
                <a
                  id="social-icons"
                  href="https://www.tiktok.com/@redcecosesola"
                  target="_blank"
                  class="fa fa-tiktok fa-2x"
                ><svg xmlns="http://www.w3.org/2000/svg" height="0.75em" viewBox="0 0 448 512"><style>svg{fill:#564a00}</style><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg></a>
              </div>
              <h6 class="red-social-title" id="red-social-title">
              Encuéntranos como @RedCecosesola
            </h6>
            

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
customElements.define("footer-component", xn);
class Ln extends m {
  constructor() {
    super();
  }
  render() {
    return p`
      <div class='container-loader'>
        <div class='loader'></div>
      </div>
    `;
  }
  createRenderRoot() {
    return this;
  }
}
customElements.define("loader-component", Ln);
