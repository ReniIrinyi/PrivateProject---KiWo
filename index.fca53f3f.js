function e(e, t, r, o) {
  Object.defineProperty(e, t, {
    get: r,
    set: o,
    enumerable: !0,
    configurable: !0,
  });
}
function t(e) {
  return e && e.__esModule ? e.default : e;
}
var r =
    "undefined" != typeof globalThis
      ? globalThis
      : "undefined" != typeof self
      ? self
      : "undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : {},
  o = {},
  n = {},
  i = r.parcelRequire054b;
null == i &&
  (((i = function (e) {
    if (e in o) return o[e].exports;
    if (e in n) {
      var t = n[e];
      delete n[e];
      var r = { id: e, exports: {} };
      return (o[e] = r), t.call(r.exports, r, r.exports), r.exports;
    }
    var i = new Error("Cannot find module '" + e + "'");
    throw ((i.code = "MODULE_NOT_FOUND"), i);
  }).register = function (e, t) {
    n[e] = t;
  }),
  (r.parcelRequire054b = i)),
  i.register("27Lyk", function (t, r) {
    var o, n;
    e(
      t.exports,
      "register",
      () => o,
      (e) => (o = e)
    ),
      e(
        t.exports,
        "resolve",
        () => n,
        (e) => (n = e)
      );
    var i = {};
    (o = function (e) {
      for (var t = Object.keys(e), r = 0; r < t.length; r++) i[t[r]] = e[t[r]];
    }),
      (n = function (e) {
        var t = i[e];
        if (null == t) throw new Error("Could not resolve bundle with id " + e);
        return t;
      });
  }),
  i("27Lyk").register(
    JSON.parse(
      '{"jRPZQ":"index.fca53f3f.js","4Ap8j":"kiwo202301.1c483b34.jpg","8re6S":"kiwo202302.350aaa1d.jpg","iKasx":"kiwo202303.89f32eea.jpg","13RGA":"kiwo202304.3801c5bc.jpg","ez9Cx":"kiwo202305.a897fe79.jpg","3RtyZ":"kiwo202306.1e2a205c.jpg","50y1d":"kiwo202307.a4617c97.jpg","8lmO5":"kiwo202308.e48b571c.jpg","3j2zi":"kiwo202309.9954946c.jpg","aesPw":"kiwo202310.4e250ace.jpg","fBO3H":"kiwo202311.8bcfd0c3.jpg","eSH2q":"kiwo202312.34bf5119.jpg","iwNEI":"kiwo202313.a72006d9.jpg","hU2hg":"kiwo202314.7e10434f.jpg","aDnHA":"kiwo202315.38cc4723.jpg","2tlBw":"kiwo202316.f20ad552.jpg","i1kOY":"kiwo202317.4fad396b.jpg","EiaL2":"kiwo202318.c67fb499.jpg","4XEFA":"kiwo202319.ce1134f5.jpg","1sR8K":"kiwo202320.c0f33874.jpg","2wRUU":"kiwo202321.a32dc5a1.jpg","e4h9X":"kiwo202322.92b3fdc9.jpg","jHMvQ":"kiwo202323.c784bf0e.jpg","lglzz":"kiwo202324.d190546e.jpg"}'
    )
  );
var a;
a = new URL(i("27Lyk").resolve("4Ap8j"), import.meta.url).toString();
var s;
s = new URL(i("27Lyk").resolve("8re6S"), import.meta.url).toString();
var c;
c = new URL(i("27Lyk").resolve("iKasx"), import.meta.url).toString();
var l;
l = new URL(i("27Lyk").resolve("13RGA"), import.meta.url).toString();
var d;
d = new URL(i("27Lyk").resolve("ez9Cx"), import.meta.url).toString();
var u;
u = new URL(i("27Lyk").resolve("3RtyZ"), import.meta.url).toString();
var m;
m = new URL(i("27Lyk").resolve("50y1d"), import.meta.url).toString();
var g;
g = new URL(i("27Lyk").resolve("8lmO5"), import.meta.url).toString();
var v;
v = new URL(i("27Lyk").resolve("3j2zi"), import.meta.url).toString();
var f;
f = new URL(i("27Lyk").resolve("aesPw"), import.meta.url).toString();
var p;
p = new URL(i("27Lyk").resolve("fBO3H"), import.meta.url).toString();
var w;
w = new URL(i("27Lyk").resolve("eSH2q"), import.meta.url).toString();
var L;
L = new URL(i("27Lyk").resolve("iwNEI"), import.meta.url).toString();
var S;
S = new URL(i("27Lyk").resolve("hU2hg"), import.meta.url).toString();
var k;
k = new URL(i("27Lyk").resolve("aDnHA"), import.meta.url).toString();
var y;
y = new URL(i("27Lyk").resolve("2tlBw"), import.meta.url).toString();
var b;
b = new URL(i("27Lyk").resolve("i1kOY"), import.meta.url).toString();
var R;
R = new URL(i("27Lyk").resolve("EiaL2"), import.meta.url).toString();
var _;
_ = new URL(i("27Lyk").resolve("4XEFA"), import.meta.url).toString();
var H;
H = new URL(i("27Lyk").resolve("1sR8K"), import.meta.url).toString();
var A;
A = new URL(i("27Lyk").resolve("2wRUU"), import.meta.url).toString();
var E;
E = new URL(i("27Lyk").resolve("e4h9X"), import.meta.url).toString();
var h;
h = new URL(i("27Lyk").resolve("jHMvQ"), import.meta.url).toString();
var j;
(j = new URL(i("27Lyk").resolve("lglzz"), import.meta.url).toString()),
  document.querySelector(".nav-items").addEventListener("click", function (e) {
    if ((e.preventDefault(), e.target.classList.contains("slide-out"))) {
      const t = e.target.getAttribute("href");
      document.querySelector(t).scrollIntoView({ behavior: "smooth" });
    }
  });
const U = document.querySelectorAll(".nav-item"),
  F = document.querySelector(".menuIcon");
U.forEach((e) =>
  e.addEventListener("click", function () {
    1 == F.checked ? (F.checked = !1) : 0 == F.checked && (F.checked = !0);
  })
);
const x = document.querySelector("nav"),
  q = document.querySelector(".navigation__container"),
  O = document.querySelector("#home"),
  I = (document.querySelector("body"), x.getBoundingClientRect().height);
new IntersectionObserver(
  function (e) {
    const [t] = e;
    t.isIntersecting
      ? (q.classList.remove("sticky"),
        O.classList.remove("plusmargin"),
        O.classList.add("nomargin"))
      : (q.classList.add("sticky"),
        O.classList.add("plusmargin"),
        O.classList.remove("nomargin"),
        document.querySelector("bg-video").classList.remove("minusmargin"));
  },
  { root: null, threshold: 0.01, rootMargin: `-${I}px` }
).observe(O);
const B = document.querySelector(".slider-dots"),
  z = document.querySelectorAll(".component-content");
z.forEach((e, t) => (e.style.transform = `translateX(${100 * t}%)`));
z.forEach((e, t) => {
  B.insertAdjacentHTML(
    "beforeend",
    `<button class="slider-dot" id="button--${t}" aria-label="slider-buttons" data-slide="${t}"></button>`
  );
});
const C = function (e) {
  document
    .querySelectorAll(".slider-dot")
    .forEach((e) => e.classList.remove("slider-dot__active")),
    document
      .querySelector(`.slider-dot[data-slide="${e}"]`)
      .classList.add("slider-dot__active");
};
C(0);
let T = 0;
const M = z.length,
  X = function (e) {
    z.forEach((t, r) => (t.style.transform = `translateX(${110 * (r - e)}%)`));
  };
X(0);
const $ = function () {
    T === M - 1 ? (T = 0) : T++, X(T), C(T);
  },
  D = function () {
    T > 0 ? T-- : (T = M - 1), X(T), C(T);
  },
  N = document.querySelector(".slider-btn--right"),
  K = document.querySelector(".slider-btn--left");
N.addEventListener("click", $),
  K.addEventListener("click", D),
  document.addEventListener("keydown", function (e) {
    "ArrowRight" === e.key ? $() : "ArrowLeft" === e.key && D();
  }),
  B.addEventListener("click", function (e) {
    if (e.target.classList.contains("slider-dot")) {
      const t = e.target.dataset.slide;
      X(t), C(t);
    }
  });
const P = document.getElementById("main-view"),
  Q = document.getElementById("caption"),
  Z = document.getElementById("info"),
  G = document.getElementById("thumbnails");
let Y = [
  { src: t(a) },
  { src: t(s) },
  { src: t(c) },
  { src: t(l) },
  { src: t(d) },
  { src: t(u) },
  { src: t(m) },
  { src: t(g) },
  { src: t(v) },
  { src: t(f) },
  { src: t(p) },
  { src: t(w) },
  { src: t(L) },
  { src: t(S) },
  { src: t(p) },
  { src: t(k) },
  { src: t(y) },
  { src: t(b) },
  { src: t(R) },
  { src: t(_) },
  { src: t(H) },
  { src: t(A) },
  { src: t(E) },
  { src: t(h) },
  { src: t(j) },
];
for (let e = 1; e < Y.length; e++) {
  Y[e];
  let t = document.createElement("img");
  (t.src = Y[e].src),
    t.setAttribute("width", "170px"),
    t.setAttribute("height", "170px"),
    t.setAttribute("data-index", e),
    t.setAttribute("alt", "img" + e),
    t.addEventListener("click", J),
    G.appendChild(t);
}
function J(e) {
  V(e.currentTarget.getAttribute("data-index"));
}
function V(e) {
  let t = Y[e];
  (P.src = t.src),
    P.setAttribute("width", "1000px"),
    P.setAttribute("height", "1000px"),
    P.setAttribute("data-index", e),
    P.setAttribute("id", "image-" + e),
    P.setAttribute("alt", "img" + e),
    (P.style.opacity = 1),
    (Q.textContent = t.caption),
    (Z.textContent = t.info);
}
V(0),
  setTimeout(function e() {
    let t = parseInt(P.getAttribute("data-index"));
    (t = t + 1 == Y.length ? 1 : t + 1), V(t), setTimeout(e, 8e3);
  }, 8e3);
//# sourceMappingURL=index.fca53f3f.js.map
