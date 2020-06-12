/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function t(t, e, i, s) {
  for (var n, o = arguments.length, r = o < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s, a = t.length - 1; a >= 0; a--)(n = t[a]) && (r = (o < 3 ? n(r) : o > 3 ? n(e, i, r) : n(e, i)) || r);
  return o > 3 && r && Object.defineProperty(e, i, r), r
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
}
const e = "undefined" != typeof window && null != window.customElements && void 0 !== window.customElements.polyfillWrapFlushCallback,
  i = (t, e, i = null) => {
    for (; e !== i;) {
      const i = e.nextSibling;
      t.removeChild(e), e = i
    }
  },
  s = `{{lit-${String(Math.random()).slice(2)}}}`,
  n = `\x3c!--${s}--\x3e`,
  o = new RegExp(`${s}|${n}`);
class r {
  constructor(t, e) {
    this.parts = [], this.element = e;
    const i = [],
      n = [],
      r = document.createTreeWalker(e.content, 133, null, !1);
    let c = 0,
      d = -1,
      p = 0;
    const {
      strings: u,
      values: {
        length: g
      }
    } = t;
    for (; p < g;) {
      const t = r.nextNode();
      if (null !== t) {
        if (d++, 1 === t.nodeType) {
          if (t.hasAttributes()) {
            const e = t.attributes,
              {
                length: i
              } = e;
            let s = 0;
            for (let t = 0; t < i; t++) a(e[t].name, "$lit$") && s++;
            for (; s-- > 0;) {
              const e = u[p],
                i = l.exec(e)[2],
                s = i.toLowerCase() + "$lit$",
                n = t.getAttribute(s);
              t.removeAttribute(s);
              const r = n.split(o);
              this.parts.push({
                type: "attribute",
                index: d,
                name: i,
                strings: r
              }), p += r.length - 1
            }
          }
          "TEMPLATE" === t.tagName && (n.push(t), r.currentNode = t.content)
        } else if (3 === t.nodeType) {
          const e = t.data;
          if (e.indexOf(s) >= 0) {
            const s = t.parentNode,
              n = e.split(o),
              r = n.length - 1;
            for (let e = 0; e < r; e++) {
              let i, o = n[e];
              if ("" === o) i = h();
              else {
                const t = l.exec(o);
                null !== t && a(t[2], "$lit$") && (o = o.slice(0, t.index) + t[1] + t[2].slice(0, -"$lit$".length) + t[3]), i = document.createTextNode(o)
              }
              s.insertBefore(i, t), this.parts.push({
                type: "node",
                index: ++d
              })
            }
            "" === n[r] ? (s.insertBefore(h(), t), i.push(t)) : t.data = n[r], p += r
          }
        } else if (8 === t.nodeType)
          if (t.data === s) {
            const e = t.parentNode;
            null !== t.previousSibling && d !== c || (d++, e.insertBefore(h(), t)), c = d, this.parts.push({
              type: "node",
              index: d
            }), null === t.nextSibling ? t.data = "" : (i.push(t), d--), p++
          } else {
            let e = -1;
            for (; - 1 !== (e = t.data.indexOf(s, e + 1));) this.parts.push({
              type: "node",
              index: -1
            }), p++
          }
      } else r.currentNode = n.pop()
    }
    for (const t of i) t.parentNode.removeChild(t)
  }
}
const a = (t, e) => {
    const i = t.length - e.length;
    return i >= 0 && t.slice(i) === e
  },
  c = t => -1 !== t.index,
  h = () => document.createComment(""),
  l = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

function d(t, e) {
  const {
    element: {
      content: i
    },
    parts: s
  } = t, n = document.createTreeWalker(i, 133, null, !1);
  let o = u(s),
    r = s[o],
    a = -1,
    c = 0;
  const h = [];
  let l = null;
  for (; n.nextNode();) {
    a++;
    const t = n.currentNode;
    for (t.previousSibling === l && (l = null), e.has(t) && (h.push(t), null === l && (l = t)), null !== l && c++; void 0 !== r && r.index === a;) r.index = null !== l ? -1 : r.index - c, o = u(s, o), r = s[o]
  }
  h.forEach(t => t.parentNode.removeChild(t))
}
const p = t => {
    let e = 11 === t.nodeType ? 0 : 1;
    const i = document.createTreeWalker(t, 133, null, !1);
    for (; i.nextNode();) e++;
    return e
  },
  u = (t, e = -1) => {
    for (let i = e + 1; i < t.length; i++) {
      const e = t[i];
      if (c(e)) return i
    }
    return -1
  };
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const g = new WeakMap,
  m = t => "function" == typeof t && g.has(t),
  f = {},
  v = {};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class y {
  constructor(t, e, i) {
    this.t = [], this.template = t, this.processor = e, this.options = i
  }
  update(t) {
    let e = 0;
    for (const i of this.t) void 0 !== i && i.setValue(t[e]), e++;
    for (const t of this.t) void 0 !== t && t.commit()
  }
  _clone() {
    const t = e ? this.template.element.content.cloneNode(!0) : document.importNode(this.template.element.content, !0),
      i = [],
      s = this.template.parts,
      n = document.createTreeWalker(t, 133, null, !1);
    let o, r = 0,
      a = 0,
      h = n.nextNode();
    for (; r < s.length;)
      if (o = s[r], c(o)) {
        for (; a < o.index;) a++, "TEMPLATE" === h.nodeName && (i.push(h), n.currentNode = h.content), null === (h = n.nextNode()) && (n.currentNode = i.pop(), h = n.nextNode());
        if ("node" === o.type) {
          const t = this.processor.handleTextExpression(this.options);
          t.insertAfterNode(h.previousSibling), this.t.push(t)
        } else this.t.push(...this.processor.handleAttributeExpressions(h, o.name, o.strings, this.options));
        r++
      } else this.t.push(void 0), r++;
    return e && (document.adoptNode(t), customElements.upgrade(t)), t
  }
}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const x = ` ${s} `;
class b {
  constructor(t, e, i, s) {
    this.strings = t, this.values = e, this.type = i, this.processor = s
  }
  getHTML() {
    const t = this.strings.length - 1;
    let e = "",
      i = !1;
    for (let o = 0; o < t; o++) {
      const t = this.strings[o],
        r = t.lastIndexOf("\x3c!--");
      i = (r > -1 || i) && -1 === t.indexOf("--\x3e", r + 1);
      const a = l.exec(t);
      e += null === a ? t + (i ? x : n) : t.substr(0, a.index) + a[1] + a[2] + "$lit$" + a[3] + s
    }
    return e += this.strings[t], e
  }
  getTemplateElement() {
    const t = document.createElement("template");
    return t.innerHTML = this.getHTML(), t
  }
}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const w = t => null === t || !("object" == typeof t || "function" == typeof t),
  _ = t => Array.isArray(t) || !(!t || !t[Symbol.iterator]);
class S {
  constructor(t, e, i) {
    this.dirty = !0, this.element = t, this.name = e, this.strings = i, this.parts = [];
    for (let t = 0; t < i.length - 1; t++) this.parts[t] = this._createPart()
  }
  _createPart() {
    return new k(this)
  }
  _getValue() {
    const t = this.strings,
      e = t.length - 1;
    let i = "";
    for (let s = 0; s < e; s++) {
      i += t[s];
      const e = this.parts[s];
      if (void 0 !== e) {
        const t = e.value;
        if (w(t) || !_(t)) i += "string" == typeof t ? t : String(t);
        else
          for (const e of t) i += "string" == typeof e ? e : String(e)
      }
    }
    return i += t[e], i
  }
  commit() {
    this.dirty && (this.dirty = !1, this.element.setAttribute(this.name, this._getValue()))
  }
}
class k {
  constructor(t) {
    this.value = void 0, this.committer = t
  }
  setValue(t) {
    t === f || w(t) && t === this.value || (this.value = t, m(t) || (this.committer.dirty = !0))
  }
  commit() {
    for (; m(this.value);) {
      const t = this.value;
      this.value = f, t(this)
    }
    this.value !== f && this.committer.commit()
  }
}
class $ {
  constructor(t) {
    this.value = void 0, this.i = void 0, this.options = t
  }
  appendInto(t) {
    this.startNode = t.appendChild(h()), this.endNode = t.appendChild(h())
  }
  insertAfterNode(t) {
    this.startNode = t, this.endNode = t.nextSibling
  }
  appendIntoPart(t) {
    t.s(this.startNode = h()), t.s(this.endNode = h())
  }
  insertAfterPart(t) {
    t.s(this.startNode = h()), this.endNode = t.endNode, t.endNode = this.startNode
  }
  setValue(t) {
    this.i = t
  }
  commit() {
    if (null === this.startNode.parentNode) return;
    for (; m(this.i);) {
      const t = this.i;
      this.i = f, t(this)
    }
    const t = this.i;
    t !== f && (w(t) ? t !== this.value && this.o(t) : t instanceof b ? this.h(t) : t instanceof Node ? this.l(t) : _(t) ? this.p(t) : t === v ? (this.value = v, this.clear()) : this.o(t))
  }
  s(t) {
    this.endNode.parentNode.insertBefore(t, this.endNode)
  }
  l(t) {
    this.value !== t && (this.clear(), this.s(t), this.value = t)
  }
  o(t) {
    const e = this.startNode.nextSibling,
      i = "string" == typeof (t = null == t ? "" : t) ? t : String(t);
    e === this.endNode.previousSibling && 3 === e.nodeType ? e.data = i : this.l(document.createTextNode(i)), this.value = t
  }
  h(t) {
    const e = this.options.templateFactory(t);
    if (this.value instanceof y && this.value.template === e) this.value.update(t.values);
    else {
      const i = new y(e, t.processor, this.options),
        s = i._clone();
      i.update(t.values), this.l(s), this.value = i
    }
  }
  p(t) {
    Array.isArray(this.value) || (this.value = [], this.clear());
    const e = this.value;
    let i, s = 0;
    for (const n of t) i = e[s], void 0 === i && (i = new $(this.options), e.push(i), 0 === s ? i.appendIntoPart(this) : i.insertAfterPart(e[s - 1])), i.setValue(n), i.commit(), s++;
    s < e.length && (e.length = s, this.clear(i && i.endNode))
  }
  clear(t = this.startNode) {
    i(this.startNode.parentNode, t.nextSibling, this.endNode)
  }
}
class A {
  constructor(t, e, i) {
    if (this.value = void 0, this.i = void 0, 2 !== i.length || "" !== i[0] || "" !== i[1]) throw new Error("Boolean attributes can only contain a single expression");
    this.element = t, this.name = e, this.strings = i
  }
  setValue(t) {
    this.i = t
  }
  commit() {
    for (; m(this.i);) {
      const t = this.i;
      this.i = f, t(this)
    }
    if (this.i === f) return;
    const t = !!this.i;
    this.value !== t && (t ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name), this.value = t), this.i = f
  }
}
class C extends S {
  constructor(t, e, i) {
    super(t, e, i), this.single = 2 === i.length && "" === i[0] && "" === i[1]
  }
  _createPart() {
    return new E(this)
  }
  _getValue() {
    return this.single ? this.parts[0].value : super._getValue()
  }
  commit() {
    this.dirty && (this.dirty = !1, this.element[this.name] = this._getValue())
  }
}
class E extends k {}
let P = !1;
(() => {
  try {
    const t = {
      get capture() {
        return P = !0, !1
      }
    };
    window.addEventListener("test", t, t), window.removeEventListener("test", t, t)
  } catch (t) {}
})();
class M {
  constructor(t, e, i) {
    this.value = void 0, this.i = void 0, this.element = t, this.eventName = e, this.eventContext = i, this.u = t => this.handleEvent(t)
  }
  setValue(t) {
    this.i = t
  }
  commit() {
    for (; m(this.i);) {
      const t = this.i;
      this.i = f, t(this)
    }
    if (this.i === f) return;
    const t = this.i,
      e = this.value,
      i = null == t || null != e && (t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive),
      s = null != t && (null == e || i);
    i && this.element.removeEventListener(this.eventName, this.u, this.g), s && (this.g = D(t), this.element.addEventListener(this.eventName, this.u, this.g)), this.value = t, this.i = f
  }
  handleEvent(t) {
    "function" == typeof this.value ? this.value.call(this.eventContext || this.element, t) : this.value.handleEvent(t)
  }
}
const D = t => t && (P ? {
  capture: t.capture,
  passive: t.passive,
  once: t.once
} : t.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
;

function O(t) {
  let e = j.get(t.type);
  void 0 === e && (e = {
    stringsArray: new WeakMap,
    keyString: new Map
  }, j.set(t.type, e));
  let i = e.stringsArray.get(t.strings);
  if (void 0 !== i) return i;
  const n = t.strings.join(s);
  return i = e.keyString.get(n), void 0 === i && (i = new r(t, t.getTemplateElement()), e.keyString.set(n, i)), e.stringsArray.set(t.strings, i), i
}
const j = new Map,
  N = new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const T = new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class {
  handleAttributeExpressions(t, e, i, s) {
    const n = e[0];
    if ("." === n) {
      return new C(t, e.slice(1), i).parts
    }
    if ("@" === n) return [new M(t, e.slice(1), s.eventContext)];
    if ("?" === n) return [new A(t, e.slice(1), i)];
    return new S(t, e, i).parts
  }
  handleTextExpression(t) {
    return new $(t)
  }
};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
"undefined" != typeof window && (window.litHtmlVersions || (window.litHtmlVersions = [])).push("1.2.1");
const U = (t, ...e) => new b(t, e, "html", T)
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  ,
  z = (t, e) => `${t}--${e}`;
let F = !0;
void 0 === window.ShadyCSS ? F = !1 : void 0 === window.ShadyCSS.prepareTemplateDom && (console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."), F = !1);
const L = t => e => {
    const i = z(e.type, t);
    let n = j.get(i);
    void 0 === n && (n = {
      stringsArray: new WeakMap,
      keyString: new Map
    }, j.set(i, n));
    let o = n.stringsArray.get(e.strings);
    if (void 0 !== o) return o;
    const a = e.strings.join(s);
    if (o = n.keyString.get(a), void 0 === o) {
      const i = e.getTemplateElement();
      F && window.ShadyCSS.prepareTemplateDom(i, t), o = new r(e, i), n.keyString.set(a, o)
    }
    return n.stringsArray.set(e.strings, o), o
  },
  B = ["html", "svg"],
  I = new Set,
  H = (t, e, i) => {
    I.add(t);
    const s = i ? i.element : document.createElement("template"),
      n = e.querySelectorAll("style"),
      {
        length: o
      } = n;
    if (0 === o) return void window.ShadyCSS.prepareTemplateStyles(s, t);
    const r = document.createElement("style");
    for (let t = 0; t < o; t++) {
      const e = n[t];
      e.parentNode.removeChild(e), r.textContent += e.textContent
    }(t => {
      B.forEach(e => {
        const i = j.get(z(e, t));
        void 0 !== i && i.keyString.forEach(t => {
          const {
            element: {
              content: e
            }
          } = t, i = new Set;
          Array.from(e.querySelectorAll("style")).forEach(t => {
            i.add(t)
          }), d(t, i)
        })
      })
    })(t);
    const a = s.content;
    i ? function (t, e, i = null) {
      const {
        element: {
          content: s
        },
        parts: n
      } = t;
      if (null == i) return void s.appendChild(e);
      const o = document.createTreeWalker(s, 133, null, !1);
      let r = u(n),
        a = 0,
        c = -1;
      for (; o.nextNode();) {
        c++;
        for (o.currentNode === i && (a = p(e), i.parentNode.insertBefore(e, i)); - 1 !== r && n[r].index === c;) {
          if (a > 0) {
            for (; - 1 !== r;) n[r].index += a, r = u(n, r);
            return
          }
          r = u(n, r)
        }
      }
    }(i, r, a.firstChild) : a.insertBefore(r, a.firstChild), window.ShadyCSS.prepareTemplateStyles(s, t);
    const c = a.querySelector("style");
    if (window.ShadyCSS.nativeShadow && null !== c) e.insertBefore(c.cloneNode(!0), e.firstChild);
    else if (i) {
      a.insertBefore(r, a.firstChild);
      const t = new Set;
      t.add(r), d(i, t)
    }
  };
window.JSCompiler_renameProperty = (t, e) => t;
const R = {
    toAttribute(t, e) {
      switch (e) {
        case Boolean:
          return t ? "" : null;
        case Object:
        case Array:
          return null == t ? t : JSON.stringify(t)
      }
      return t
    },
    fromAttribute(t, e) {
      switch (e) {
        case Boolean:
          return null !== t;
        case Number:
          return null === t ? null : Number(t);
        case Object:
        case Array:
          return JSON.parse(t)
      }
      return t
    }
  },
  q = (t, e) => e !== t && (e == e || t == t),
  V = {
    attribute: !0,
    type: String,
    converter: R,
    reflect: !1,
    hasChanged: q
  };
class J extends HTMLElement {
  constructor() {
    super(), this._updateState = 0, this._instanceProperties = void 0, this._updatePromise = new Promise(t => this._enableUpdatingResolver = t), this._changedProperties = new Map, this._reflectingProperties = void 0, this.initialize()
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this._classProperties.forEach((e, i) => {
      const s = this._attributeNameForProperty(i, e);
      void 0 !== s && (this._attributeToPropertyMap.set(s, i), t.push(s))
    }), t
  }
  static _ensureClassProperties() {
    if (!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties", this))) {
      this._classProperties = new Map;
      const t = Object.getPrototypeOf(this)._classProperties;
      void 0 !== t && t.forEach((t, e) => this._classProperties.set(e, t))
    }
  }
  static createProperty(t, e = V) {
    if (this._ensureClassProperties(), this._classProperties.set(t, e), e.noAccessor || this.prototype.hasOwnProperty(t)) return;
    const i = "symbol" == typeof t ? Symbol() : "__" + t,
      s = this.getPropertyDescriptor(t, i, e);
    void 0 !== s && Object.defineProperty(this.prototype, t, s)
  }
  static getPropertyDescriptor(t, e, i) {
    return {
      get() {
        return this[e]
      },
      set(i) {
        const s = this[t];
        this[e] = i, this._requestUpdate(t, s)
      },
      configurable: !0,
      enumerable: !0
    }
  }
  static getPropertyOptions(t) {
    return this._classProperties && this._classProperties.get(t) || V
  }
  static finalize() {
    const t = Object.getPrototypeOf(this);
    if (t.hasOwnProperty("finalized") || t.finalize(), this.finalized = !0, this._ensureClassProperties(), this._attributeToPropertyMap = new Map, this.hasOwnProperty(JSCompiler_renameProperty("properties", this))) {
      const t = this.properties,
        e = [...Object.getOwnPropertyNames(t), ..."function" == typeof Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t) : []];
      for (const i of e) this.createProperty(i, t[i])
    }
  }
  static _attributeNameForProperty(t, e) {
    const i = e.attribute;
    return !1 === i ? void 0 : "string" == typeof i ? i : "string" == typeof t ? t.toLowerCase() : void 0
  }
  static _valueHasChanged(t, e, i = q) {
    return i(t, e)
  }
  static _propertyValueFromAttribute(t, e) {
    const i = e.type,
      s = e.converter || R,
      n = "function" == typeof s ? s : s.fromAttribute;
    return n ? n(t, i) : t
  }
  static _propertyValueToAttribute(t, e) {
    if (void 0 === e.reflect) return;
    const i = e.type,
      s = e.converter;
    return (s && s.toAttribute || R.toAttribute)(t, i)
  }
  initialize() {
    this._saveInstanceProperties(), this._requestUpdate()
  }
  _saveInstanceProperties() {
    this.constructor._classProperties.forEach((t, e) => {
      if (this.hasOwnProperty(e)) {
        const t = this[e];
        delete this[e], this._instanceProperties || (this._instanceProperties = new Map), this._instanceProperties.set(e, t)
      }
    })
  }
  _applyInstanceProperties() {
    this._instanceProperties.forEach((t, e) => this[e] = t), this._instanceProperties = void 0
  }
  connectedCallback() {
    this.enableUpdating()
  }
  enableUpdating() {
    void 0 !== this._enableUpdatingResolver && (this._enableUpdatingResolver(), this._enableUpdatingResolver = void 0)
  }
  disconnectedCallback() {}
  attributeChangedCallback(t, e, i) {
    e !== i && this._attributeToProperty(t, i)
  }
  _propertyToAttribute(t, e, i = V) {
    const s = this.constructor,
      n = s._attributeNameForProperty(t, i);
    if (void 0 !== n) {
      const t = s._propertyValueToAttribute(e, i);
      if (void 0 === t) return;
      this._updateState = 8 | this._updateState, null == t ? this.removeAttribute(n) : this.setAttribute(n, t), this._updateState = -9 & this._updateState
    }
  }
  _attributeToProperty(t, e) {
    if (8 & this._updateState) return;
    const i = this.constructor,
      s = i._attributeToPropertyMap.get(t);
    if (void 0 !== s) {
      const t = i.getPropertyOptions(s);
      this._updateState = 16 | this._updateState, this[s] = i._propertyValueFromAttribute(e, t), this._updateState = -17 & this._updateState
    }
  }
  _requestUpdate(t, e) {
    let i = !0;
    if (void 0 !== t) {
      const s = this.constructor,
        n = s.getPropertyOptions(t);
      s._valueHasChanged(this[t], e, n.hasChanged) ? (this._changedProperties.has(t) || this._changedProperties.set(t, e), !0 !== n.reflect || 16 & this._updateState || (void 0 === this._reflectingProperties && (this._reflectingProperties = new Map), this._reflectingProperties.set(t, n))) : i = !1
    }!this._hasRequestedUpdate && i && (this._updatePromise = this._enqueueUpdate())
  }
  requestUpdate(t, e) {
    return this._requestUpdate(t, e), this.updateComplete
  }
  async _enqueueUpdate() {
    this._updateState = 4 | this._updateState;
    try {
      await this._updatePromise
    } catch (t) {}
    const t = this.performUpdate();
    return null != t && await t, !this._hasRequestedUpdate
  }
  get _hasRequestedUpdate() {
    return 4 & this._updateState
  }
  get hasUpdated() {
    return 1 & this._updateState
  }
  performUpdate() {
    this._instanceProperties && this._applyInstanceProperties();
    let t = !1;
    const e = this._changedProperties;
    try {
      t = this.shouldUpdate(e), t ? this.update(e) : this._markUpdated()
    } catch (e) {
      throw t = !1, this._markUpdated(), e
    }
    t && (1 & this._updateState || (this._updateState = 1 | this._updateState, this.firstUpdated(e)), this.updated(e))
  }
  _markUpdated() {
    this._changedProperties = new Map, this._updateState = -5 & this._updateState
  }
  get updateComplete() {
    return this._getUpdateComplete()
  }
  _getUpdateComplete() {
    return this._updatePromise
  }
  shouldUpdate(t) {
    return !0
  }
  update(t) {
    void 0 !== this._reflectingProperties && this._reflectingProperties.size > 0 && (this._reflectingProperties.forEach((t, e) => this._propertyToAttribute(e, this[e], t)), this._reflectingProperties = void 0), this._markUpdated()
  }
  updated(t) {}
  firstUpdated(t) {}
}
J.finalized = !0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const G = t => e => "function" == typeof e ? ((t, e) => (window.customElements.define(t, e), e))(t, e) : ((t, e) => {
    const {
      kind: i,
      elements: s
    } = e;
    return {
      kind: i,
      elements: s,
      finisher(e) {
        window.customElements.define(t, e)
      }
    }
  })(t, e),
  W = (t, e) => "method" === e.kind && e.descriptor && !("value" in e.descriptor) ? Object.assign(Object.assign({}, e), {
    finisher(i) {
      i.createProperty(e.key, t)
    }
  }) : {
    kind: "field",
    key: Symbol(),
    placement: "own",
    descriptor: {},
    initializer() {
      "function" == typeof e.initializer && (this[e.key] = e.initializer.call(this))
    },
    finisher(i) {
      i.createProperty(e.key, t)
    }
  };

function Y(t) {
  return (e, i) => void 0 !== i ? ((t, e, i) => {
    e.constructor.createProperty(i, t)
  })(t, e, i) : W(t, e)
}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const K = "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
  Q = Symbol();
class X {
  constructor(t, e) {
    if (e !== Q) throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t
  }
  get styleSheet() {
    return void 0 === this._styleSheet && (K ? (this._styleSheet = new CSSStyleSheet, this._styleSheet.replaceSync(this.cssText)) : this._styleSheet = null), this._styleSheet
  }
  toString() {
    return this.cssText
  }
}
const Z = (t, ...e) => {
  const i = e.reduce((e, i, s) => e + (t => {
    if (t instanceof X) return t.cssText;
    if ("number" == typeof t) return t;
    throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)
  })(i) + t[s + 1], t[0]);
  return new X(i, Q)
};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions || (window.litElementVersions = [])).push("2.3.1");
const tt = {};
class et extends J {
  static getStyles() {
    return this.styles
  }
  static _getUniqueStyles() {
    if (this.hasOwnProperty(JSCompiler_renameProperty("_styles", this))) return;
    const t = this.getStyles();
    if (void 0 === t) this._styles = [];
    else if (Array.isArray(t)) {
      const e = (t, i) => t.reduceRight((t, i) => Array.isArray(i) ? e(i, t) : (t.add(i), t), i),
        i = e(t, new Set),
        s = [];
      i.forEach(t => s.unshift(t)), this._styles = s
    } else this._styles = [t]
  }
  initialize() {
    super.initialize(), this.constructor._getUniqueStyles(), this.renderRoot = this.createRenderRoot(), window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot && this.adoptStyles()
  }
  createRenderRoot() {
    return this.attachShadow({
      mode: "open"
    })
  }
  adoptStyles() {
    const t = this.constructor._styles;
    0 !== t.length && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow ? K ? this.renderRoot.adoptedStyleSheets = t.map(t => t.styleSheet) : this._needsShimAdoptedStyleSheets = !0 : window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t => t.cssText), this.localName))
  }
  connectedCallback() {
    super.connectedCallback(), this.hasUpdated && void 0 !== window.ShadyCSS && window.ShadyCSS.styleElement(this)
  }
  update(t) {
    const e = this.render();
    super.update(t), e !== tt && this.constructor.render(e, this.renderRoot, {
      scopeName: this.localName,
      eventContext: this
    }), this._needsShimAdoptedStyleSheets && (this._needsShimAdoptedStyleSheets = !1, this.constructor._styles.forEach(t => {
      const e = document.createElement("style");
      e.textContent = t.cssText, this.renderRoot.appendChild(e)
    }))
  }
  render() {
    return tt
  }
}
et.finalized = !0, et.render = (t, e, s) => {
  if (!s || "object" != typeof s || !s.scopeName) throw new Error("The `scopeName` option is required.");
  const n = s.scopeName,
    o = N.has(e),
    r = F && 11 === e.nodeType && !!e.host,
    a = r && !I.has(n),
    c = a ? document.createDocumentFragment() : e;
  if (((t, e, s) => {
      let n = N.get(e);
      void 0 === n && (i(e, e.firstChild), N.set(e, n = new $(Object.assign({
        templateFactory: O
      }, s))), n.appendInto(e)), n.setValue(t), n.commit()
    })(t, c, Object.assign({
      templateFactory: L(n)
    }, s)), a) {
    const t = N.get(c);
    N.delete(c);
    const s = t.value instanceof y ? t.value.template : void 0;
    H(n, c, s), i(e, e.firstChild), e.appendChild(c), N.set(e, t)
  }!o && r && window.ShadyCSS.styleElement(e.host)
};
(() => {
  let e = class extends et {
    constructor() {
      super(), this.host = "", this.path = "", this.headers = {}, this.body = "", this.params = "", this.method = ""
    }
    connectedCallback() {
      super.connectedCallback(), this._generateRequest()
    }
    _generateRequest() {
      const t = new AbortController,
        e = t.signal,
        i = `${this.host}${this.path}${this.params}`,
        s = {
          method: this.method,
          headers: this.headers,
          signal: e
        };
      ["GET", "HEAD", "CONNECT", "OPTIONS", "TRACE"].includes(this.method) || (s.body = JSON.stringify(this.body)), fetch(i, s).then(e => {
        if (e.ok) return e.json();
        throw t.abort(), new Error(`${e.statusText}, status: ${e.status}`)
      }).then(t => {
        this.requestSuccess(t)
      }).catch(e => {
        t.abort(), this.requestError(e)
      })
    }
    requestSuccess(t) {
      this.dispatchEvent(new CustomEvent("request-success", {
        bubbles: !0,
        composed: !0,
        detail: {
          data: t
        }
      }))
    }
    requestError(t) {
      this.dispatchEvent(new CustomEvent("request-error", {
        bubbles: !0,
        composed: !0,
        detail: {
          error: t
        }
      }))
    }
  };
  t([Y({
    type: String
  })], e.prototype, "host", void 0), t([Y({
    type: String
  })], e.prototype, "path", void 0), t([Y({
    type: Object
  })], e.prototype, "headers", void 0), t([Y({
    type: String
  })], e.prototype, "body", void 0), t([Y({
    type: String
  })], e.prototype, "params", void 0), t([Y({
    type: String
  })], e.prototype, "method", void 0), e = t([G("data-provider-controller")], e)
})(), (() => {
  let e = class extends et {
    constructor() {
      super(), this.host = "", this.path = "", this.headers = {}, this.body = "", this.params = "", this.method = ""
    }
    render() {
      return U `
      <data-provider-controller
        .host="${this.host}"
        .path="${this.path}"
        .headers="${this.headers}"
        .body="${this.body}"
        .params="${this.params}"
        .method="${this.method}"
        @request-success="${this.onRequestSuccess}"
        @request-error="${this.onRequestError}"
      >
      </data-provider-controller>
    `
    }
    onRequestSuccess(t) {
      const e = t.detail.data.map(t => ({
        id: t.char_id,
        name: t.name,
        image: t.img,
        nickname: t.nickname,
        birthday: t.birthday,
        status: t.status,
        occupation: t.occupation,
        playedBy: t.portrayed,
        sessions: t.appearance
      }));
      this.returnedDataEvent(e)
    }
    returnedDataEvent(t) {
      this.dispatchEvent(new CustomEvent("returned-data", {
        detail: {
          data: t
        },
        bubbles: !0,
        composed: !0
      }))
    }
    onRequestError(t) {
      this.dispatchEvent(new CustomEvent("returned-data-error", {
        detail: {
          error: t.detail.error
        },
        bubbles: !0,
        composed: !0
      }))
    }
  };
  t([Y({
    type: String
  })], e.prototype, "host", void 0), t([Y({
    type: String
  })], e.prototype, "path", void 0), t([Y({
    type: Object
  })], e.prototype, "headers", void 0), t([Y({
    type: String
  })], e.prototype, "body", void 0), t([Y({
    type: String
  })], e.prototype, "params", void 0), t([Y({
    type: String
  })], e.prototype, "method", void 0), e = t([G("data-manager-controller")], e)
})(), (() => {
  let e = class extends et {
    constructor() {
      super(), this.host = "https://www.breakingbadapi.com/api/", this.path = "characters", this.params = "", this.headers = {}, this.body = "", this.method = "GET"
    }
    render() {
      return U `
      <data-manager-controller
        .host="${this.host}"
        .path="${this.path}"
        .headers="${this.headers}"
        .body="${this.body}"
        .params="${this.params}"
        .method="${this.method}"
        @returned-data="${this.dataReturned}"
        @returned-data-error="${this.dataReturnedError}"
      >
      </data-manager-controller>
    `
    }
    dataReturned(t) {
      this.dispatchEvent(new CustomEvent("data", {
        detail: {
          data: t.detail.data
        },
        bubbles: !0,
        composed: !0
      }))
    }
    dataReturnedError(t) {
      this.dispatchEvent(new CustomEvent("data-error", {
        detail: {
          data: t.detail.error
        },
        bubbles: !0,
        composed: !0
      }))
    }
  };
  t([Y({
    type: String
  })], e.prototype, "host", void 0), t([Y({
    type: String
  })], e.prototype, "path", void 0), t([Y({
    type: Object
  })], e.prototype, "headers", void 0), t([Y({
    type: String
  })], e.prototype, "body", void 0), t([Y({
    type: String
  })], e.prototype, "params", void 0), t([Y({
    type: String
  })], e.prototype, "method", void 0), e = t([G("manager-controller")], e)
})(), (() => {
  let e = class extends et {
    constructor() {
      super(...arguments), this.cardProfile = "", this.cardStatus = !1, this._cardActive = ""
    }
    render() {
      return U `
      <div
        class="container__card"
        ?active="${this.isActiveContainerCard(this.cardStatus)}"
      >
        <div class="container__image-block">
          <div
            class="card__detail-icon"
            @click="${t=>this.cardActionOpen(t.target.dataset.id)}"
            data-id="${this.cardprofileData.id}"
          >
            <img
              src="assets/icons/open-info.png"
              class="card-open-info"
              data-id="${this.cardprofileData.id}"
              alt="open-card"
            />
          </div>
          <div
            class="image-block"
            style="background-image: url('${this.cardprofileData.image}');"
          >
            <div class="image-block__name">
              <div class="name__text">
                ${this.cardprofileData.name}
              </div>
              <div class="nickname__text">
                ${this.cardprofileData.nickname}
              </div>
            </div>
          </div>
          <div class="container__detail-block">
            <div
              class="detail-block"
              ?active="${this.isActiveContainerCard(this.cardStatus)}"
            >
              <div
                class="detail-block__icon"
                @click="${this.cardActionClose}"
                data-id="${this.cardprofileData.id}"
              >
                <img
                  src="assets/icons/close-info.png"
                  class="card-icon-detail__close"
                  style="filter: invert(1)"
                  data-id="${this.cardprofileData.id}"
                  alt="close-card"
                />
              </div>
              <div class="detail-info">
                <div class="detailed-info">
                  <p class="info-category">Name</p>
                  <p class="info-result">${this.cardprofileData.name}</p>
                </div>
                <div class="detailed-info">
                  <p class="info-category">Nickname</p>
                  <p class="info-result">${this.cardprofileData.nickname}</p>
                </div>
                <div class="detailed-info">
                  <p class="info-category">Birthday</p>
                  <p class="info-result">${this.cardprofileData.birthday}</p>
                </div>
                <div class="detailed-info">
                  <p class="info-category">Status</p>
                  <p class="info-result">${this.cardprofileData.status}</p>
                </div>
                <div class="detailed-info">
                  <p class="info-category">Occupation</p>
                  <p class="info-result">${this.cardprofileData.occupation}</p>
                </div>
                <div class="detailed-info">
                  <p class="info-category">Played By</p>
                  <p class="info-result">${this.cardprofileData.playedBy}</p>
                </div>
                <div class="detailed-info">
                  <p class="info-category">Sessions</p>
                  <p class="info-result">${this.cardprofileData.sessions}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
    }
    set cardActive(t) {
      const e = this._cardActive;
      this._cardActive = t, this.requestUpdate("cardActive", e), e !== t && (this.cardActiveEvent(), this.checkActiveCard(this.cardActive))
    }
    get cardActive() {
      return this._cardActive
    }
    cardActionOpen(t) {
      this.cardActive = t
    }
    cardActionClose() {
      this.cardStatus = !this.cardStatus, this.cardActive = ""
    }
    isActiveContainerCard(t) {
      return !!t
    }
    checkActiveCard(t) {
      parseInt(this.cardprofileData.id) === parseInt(t) ? this.cardStatus = !0 : this.cardStatus = !1
    }
    cardActiveEvent() {
      this.dispatchEvent(new CustomEvent("card-active", {
        detail: {
          data: this.cardActive
        },
        bubbles: !0,
        composed: !0
      }))
    }
  };
  e.styles = Z `
    :host {
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    .container__card {
      position: relative;
      width: 280px;
      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2),
        0 6px 25px 0 rgba(0, 0, 0, 0.19);
      transform: rotateY(0deg);
      transition: transform 0.5s;
    }

    .container__card[active] {
      transform: rotateY(180deg);
      transition: transform 0.5s;
    }

    .container__card[active] .card__detail-icon {
      display: none;
    }

    .card__detail-icon {
      position: absolute;
      right: 0;
      padding: 15px;
      transition: filter 0.3s;
    }

    .card__detail-icon:hover {
      cursor: pointer;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -webkit-filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 1));
      filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 1));
      transition: filter 0.3s;
    }

    .card-open-info {
      width: 25px;
      height: 20px;
      -webkit-filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.8))
        invert(1);
      filter: drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.8)) invert(1);
    }

    .image-block {
      z-index: 0;
      height: 400px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      background-size: cover;
    }

    .image-block__name {
      background-color: black;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 15px 0px;
      font-size: 0.9em;
      text-align: center;
      color: white;
    }

    .name__text {
      font-size: 18px;
      font-weight: 700;
      padding: 0 0 4px 0;
    }

    .nickname__text {
      font-size: 14px;
      font-weight: 400;
    }

    .detail-block__icon {
      position: absolute;
      right: 0;
      color: red;
      padding: 10px;
      font-size: 30px;
    }

    .detail-block__icon:hover {
      cursor: pointer;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    .detail-block {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 400px;
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      transform: rotateY(180deg);
    }

    .detail-block[active] {
      display: block;
    }

    .detail-info {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 0 20px;
    }

    .detailed-info {
      margin-bottom: 10px;
    }

    .detailed-info:last-child {
      margin-bottom: 0px;
    }

    .detailed-info .info-category {
      font-weight: 300;
      font-size: 14px;
      padding-bottom: 2px;
    }

    .card-icon-detail__close {
      width: 20px;
      height: 20px;
      padding: 0 7px 0 0;
    }

    .detailed-info .info-result {
      font-weight: 700;
      font-size: 16px;
    }

    .detail-info p {
      margin-block-start: 0em;
      margin-block-end: 0em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    }
  `, t([Y({
    type: Object
  })], e.prototype, "cardprofileData", void 0), t([Y({
    type: String
  })], e.prototype, "cardProfile", void 0), t([Y({
    type: Boolean
  })], e.prototype, "cardStatus", void 0), t([Y({
    type: String
  })], e.prototype, "_cardActive", void 0), t([Y({
    type: String
  })], e.prototype, "cardActive", null), e = t([G("card-profile")], e)
})(), (() => {
  let e = class extends et {
    constructor() {
      super(...arguments), this.isEmpty = !1, this.firstTime = !0, this.cardActive = "", this._cardlistData = []
    }
    set cardlistData(t) {
      const e = this._cardlistData;
      this._cardlistData = void 0 === t ? [] : t, this.requestUpdate("cardlistData", e), e !== t && this.methodIsEmpty()
    }
    get cardlistData() {
      return this._cardlistData
    }
    render() {
      return U `${this.generateCardListHTML()}`
    }
    generateCardListHTML() {
      return U `
      <div class="container__card-list" @card-active="${this.updateCardActive}">
        ${this.cardlistData.length>0?this.generateCardProfileHTML():U``}
      </div>
    `
    }
    generateCardProfileHTML() {
      return this.cardlistData.map(t => U `
          <card-profile
            .cardprofileData="${t}"
            .cardActive="${this.cardActive}"
          ></card-profile>
        `)
    }
    methodIsEmpty() {
      this.firstTime ? this.firstTime = !1 : (this.cardActive = "", 0 === this.cardlistData.length ? this.isEmpty = !0 : this.isEmpty = !1)
    }
    updateCardActive(t) {
      this.cardActive = t.detail.data
    }
  };
  e.styles = Z `
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      margin: 0 50px;
    }

    .container__card-list {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      grid-gap: 30px;
      justify-items: center;
      margin: 30px 0px 50px 0px;
    }

    .card-list-empty {
      color: white;
      font-size: 22px;
      margin: 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  `, t([Y({
    type: Boolean
  })], e.prototype, "isEmpty", void 0), t([Y({
    type: Boolean
  })], e.prototype, "firstTime", void 0), t([Y({
    type: String
  })], e.prototype, "cardActive", void 0), t([Y({
    type: Array
  })], e.prototype, "_cardlistData", void 0), t([Y({
    type: Array
  })], e.prototype, "cardlistData", null), e = t([G("card-list")], e)
})(), (() => {
  let e = class extends et {
    render() {
      return U `
      <div class="header_container">
        <img src="assets/images/breaking-bad-logo.svg" />
      </div>
    `
    }
  };
  e.styles = Z `
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    .header_container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .header_container img {
      width: 20%;
      min-width: 160px;
      margin: 20px 0px 10px 0px;
    }
  `, e = t([G("header-component")], e)
})(), (() => {
  let e = class extends et {
    render() {
      return U `
    <div class="footer_container">
      <p class="api-author">API Rest of <a href="https://breakingbadapi.com/" target="_blank">API Breaking Bad</a> - All trademarks are the property of their respective owners</a></p>
      <p class="author">Developed and designed by <a href="http://www.mrcodedev.com" target="_blank">MrCodeDev</a></p>
      <p class="repositories"><a href="https://gitlab.com/mrcodedev/breaking-litelement" target="_blank"><img
            src="assets/icons/gitlab.svg" class="gitlab" alt="GitLab Logo"></a>
            <a href="https://github.com/mrcodedev/breaking-bad-litelement" target="_blank"><img src="assets/icons/github.png" class="github" alt="GitHub Logo"></a>
      </p>
    </div>
    `
    }
  };
  e.styles = Z `
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    .footer_container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      margin: 0px 25px;
      border-top: 1px solid #255303;
      padding: 20px 20px 5px 20px;
    }

    .author,
    .api-author {
      font-size: 12px;
      text-align: center;
    }

    a {
      color: white;
    }

    p {
      margin-block-start: 0em;
      margin-block-end: 0em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    }

    .repositories {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .repositories img {
      padding: 4px;
    }

    .gitlab {
      margin-top: 2px;
      width: 35x;
      height: 35px;
    }

    .github {
      width: 22px;
      height: 22px;
    }
  `, e = t([G("footer-component")], e)
})(), (() => {
  let e = class extends et {
    constructor() {
      super(), this._pageLimit = 10, this.numberElements = 0, this.activePageIndex = 0, this.numberPages = [], this._paginationData = [], this.dataPage = []
    }
    set pageLimit(t) {
      void 0 !== t && t > 0 && (this._pageLimit = t);
      const e = this._pageLimit;
      this.requestUpdate("pageLimit", e)
    }
    get pageLimit() {
      return this._pageLimit
    }
    set paginationData(t) {
      const e = this._paginationData;
      this._paginationData = t, this.requestUpdate("paginationData", e), e !== t && void 0 !== this.paginationData && this._updateDataPages()
    }
    get paginationData() {
      return this._paginationData
    }
    render() {
      return U `
      <div id="pagination" class="container-pagination">
        ${this.generatePreviousActionHTML()} ${this.generateLinkPagesHTML()}
        ${this.generateNextActionHTML()}
      </div>
    `
    }
    generatePreviousActionHTML() {
      return U `<a
      id="previous"
      @click="${this.previousPage}"
      >&laquo;</a
    >`
    }
    generateNextActionHTML() {
      return U `<a
      id="next"
      @click="${this.nextPage}"
      >&raquo;</a
    >`
    }
    generateLinkPagesHTML() {
      return this.numberPages.map(t => U `<a
          id="${t.id}"
          ?active="${this.isActive(t.active)}"
          @click="${()=>this.changeActivePage(t)}"
          >${t.page}</a
        >`)
    }
    generatePageIndexes() {
      let t = this.numberElements / this.pageLimit;
      t = t % 1 == 0 ? t : Math.floor(t) + 1;
      const e = Array.from({
        length: t
      }, (t, e) => ({
        id: e,
        page: e + 1,
        active: this.activePageIndex === e
      }));
      this.numberPages = e, this.pageEvent()
    }
    changeActivePage(t) {
      t.page - 1 !== this.activePageIndex && (this.activePageIndex = t.id, this._updateDataPages("change-active-page"))
    }
    previousPage() {
      this.activePageIndex >= 1 && (this.activePageIndex = this.activePageIndex - 1, this._updateDataPages("previous-page"))
    }
    nextPage() {
      this.activePageIndex < this.numberPages.length - 1 && (this.activePageIndex = ++this.activePageIndex, this._updateDataPages("next-page"))
    }
    isActive(t) {
      return !!t
    }
    _updateDataPages(t) {
      let e, i;
      this.numberElements = this.paginationData.length, this.dataPage = [], "change-active-page" !== t && "previous-page" !== t && "next-page" !== t && (this.activePageIndex = 0), this.numberElements > this.pageLimit ? (e = this.pageLimit * this.activePageIndex, i = e + (this.pageLimit - 1)) : (e = 0, i = this.numberElements - 1);
      for (let t = e; t <= i && (t < this.numberElements || this.pageLimit > this.numberElements); t++) this.dataPage.push(this.paginationData[t]);
      this.generatePageIndexes()
    }
    pageEvent() {
      this.dispatchEvent(new CustomEvent("data-page", {
        detail: {
          data: this.dataPage
        },
        bubbles: !0,
        composed: !0
      }))
    }
  };
  e.styles = Z `
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    .container-pagination {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin: 25px 10px 20px 10px;
      flex-wrap: wrap;
    }

    a {
      font-size: 16px;
      color: white;
      padding: 12px 20px;
      border: 1px solid #093009;
      text-decoration: none;
      background-color: #032202;
      margin: 2px;
      cursor: pointer;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    .container-pagination a[active] {
      color: white;
      background: #29773e;
    }

    .container-pagination a:hover {
      background: #1f6032;
      transition: all 0.5s ease;
    }
  `, t([Y({
    type: Number
  })], e.prototype, "_pageLimit", void 0), t([Y({
    type: Number
  })], e.prototype, "pageLimit", null), t([Y({
    type: Number
  })], e.prototype, "numberElements", void 0), t([Y({
    type: Number
  })], e.prototype, "activePageIndex", void 0), t([Y({
    type: Array
  })], e.prototype, "numberPages", void 0), t([Y({
    type: Array
  })], e.prototype, "_paginationData", void 0), t([Y({
    type: Array
  })], e.prototype, "paginationData", null), t([Y({
    type: Array
  })], e.prototype, "dataPage", void 0), e = t([G("pagination-component")], e)
})(), (() => {
  let e = class extends et {
    constructor() {
      super(), this.searchData = [], this.valueToSearch = "", this.filteredData = []
    }
    render() {
      return U `
      <div class="container-search">
        <input
          type="text"
          placeholder="Search..."
          name="search"
          @input="${t=>this._assignAndSearch(t.target.value)}"
        />
        <div type="submit">
          <img
            src="assets/icons/search-icon.png"
            class="search-icon"
            alt="search-icon"
          />
        </div>
      </div>
    `
    }
    _assignAndSearch(t) {
      this.valueToSearch = t, this._searchFilter()
    }
    _searchFilter() {
      this.filteredData = this.searchData.filter(t => t.name.toLowerCase().includes(this.valueToSearch.toLocaleLowerCase()) || t.nickname.toLowerCase().includes(this.valueToSearch.toLocaleLowerCase()) || t.playedBy.toLowerCase().includes(this.valueToSearch.toLocaleLowerCase()) || t.status.toLowerCase().includes(this.valueToSearch.toLocaleLowerCase())), this.searchEvent()
    }
    searchEvent() {
      this.dispatchEvent(new CustomEvent("data-search", {
        detail: {
          data: this.filteredData
        },
        bubbles: !0,
        composed: !0
      }))
    }
  };
  e.styles = Z `
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    .container-search {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin: 20px 25px;
    }

    .container-search input[type='text'] {
      width: 100%;
      max-width: 500px;
      height: 30px;
      padding: 6px 6px 6px 12px;
      font-size: 17px;
      border: none;
      outline: none;
    }

    .container-search div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 42px;
      padding: 0px 10px 0 2px;
      background: white;
      font-size: 17px;
      border: none;
    }

    .search-icon {
      width: 20px;
      height: 20px;
      opacity: 0.3;
      transition: all 0.5s ease;
    }

    .container-search:hover .search-icon {
      opacity: 0.5;
      transition: all 0.5s ease;
    }
  `, t([Y({
    type: Array
  })], e.prototype, "searchData", void 0), t([Y({
    type: String
  })], e.prototype, "valueToSearch", void 0), t([Y({
    type: Array
  })], e.prototype, "filteredData", void 0), e = t([G("search-component")], e)
})(), (() => {
  let e = class extends et {
    constructor() {
      super(...arguments), this.stateSpinner = !1
    }
    render() {
      return this.stateSpinner ? U `<p>something</p>` : U `<p>something else</p>`, U `
      ${this.stateSpinner?U` <div class="container__spinner">
            <div class="spinner__icon">
              <img
                src="assets/images/spinner.png"
                alt="Heisenberg Spinner"
              />
            </div>
          </div>`:U``}
    `
    }
  };
  e.styles = Z `
    :host {
      display: block;
    }

    .container__spinner {
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 100;
    }

    .spinner__icon {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .spinner__icon img {
      width: 12%;
      max-width: 150px;
      min-width: 100px;
      animation: spin 2s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  `, t([Y({
    type: Boolean
  })], e.prototype, "stateSpinner", void 0), e = t([G("spinner-component")], e)
})();
let it = (() => {
  let e = class extends et {
    constructor() {
      super(), this.data = [], this.dataFiltered = [], this.dataPage = [], this.showSpinner = !0, this.dataEventStatus = !1, this.errorEventStatus = !1, this.errorMessage = ""
    }
    render() {
      return U `
      <spinner-component
        .stateSpinner="${this.showSpinner}"
      ></spinner-component>
      <header-component></header-component>
      <manager-controller
        @data="${this.updateData}"
        @data-error="${this.errorData}"
      ></manager-controller>

      ${this.errorEventStatus?this.generateHTMLError():this.generateHTMLData()}

      <footer-component></footer-component>
    `
    }
    generateHTMLData() {
      return U `
      <search-component
        .searchData="${this.data}"
        @data-search="${this.dataSearch}"
      ></search-component>
      <pagination-component
        .paginationData="${this.dataFiltered}"
        pageLimit="10"
        @data-page="${this._dataPage}"
      ></pagination-component>
      <card-list .cardlistData="${this.dataPage}"></card-list>
    `
    }
    generateHTMLError() {
      return U ` <div class="container-error">
      <p class="text-message">Lo sentimos, hemos encontrado un error</p>
      <p class="emoticon">:(</p>
      <p class="text-error">Error - ${this.errorMessage}</p>
    </div>`
    }
    updateData(t) {
      this.dataEventStatus = !0, this.data = t.detail.data, this.dataFiltered = t.detail.data
    }
    dataSearch(t) {
      this.dataFiltered = t.detail.data
    }
    _dataPage(t) {
      this.dataPage = t.detail.data, t.detail.data.length > 0 && (this.showSpinner = !1)
    }
    errorData(t) {
      this.errorEventStatus = !0, this.errorMessage = t.detail.data, this.showSpinner = !1
    }
  };
  return e.styles = Z `
    :host {
      display: block;
    }

    p {
      display: block;
      margin-block-start: 0em;
      margin-block-end: 0em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    }

    .container-error {
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 40px 20px;
      text-align: center;
    }

    .emoticon {
      margin: 30px 20px;
      font-size: 72px;
      font-weight: bold;
    }

    .text-message,
    .text-error {
      font-size: 20px;
    }
  `, t([Y({
    type: Array
  })], e.prototype, "data", void 0), t([Y({
    type: Array
  })], e.prototype, "dataFiltered", void 0), t([Y({
    type: Array
  })], e.prototype, "dataPage", void 0), t([Y({
    type: Boolean
  })], e.prototype, "showSpinner", void 0), t([Y({
    type: Boolean
  })], e.prototype, "dataEventStatus", void 0), t([Y({
    type: Boolean
  })], e.prototype, "errorEventStatus", void 0), t([Y({
    type: String
  })], e.prototype, "errorMessage", void 0), e = t([G("app-component")], e), e
})();
export {
  it as AppComponent
};