function e(e, t, r, n) {
  Object.defineProperty(e, t, {
    get: r,
    set: n,
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
  n = {},
  o = {},
  i = r.parcelRequire054b;
null == i &&
  (((i = function (e) {
    if (e in n) return n[e].exports;
    if (e in o) {
      var t = o[e];
      delete o[e];
      var r = { id: e, exports: {} };
      return (n[e] = r), t.call(r.exports, r, r.exports), r.exports;
    }
    var i = new Error("Cannot find module '" + e + "'");
    throw ((i.code = "MODULE_NOT_FOUND"), i);
  }).register = function (e, t) {
    o[e] = t;
  }),
  (r.parcelRequire054b = i)),
  i.register("27Lyk", function (t, r) {
    var n, o;
    e(
      t.exports,
      "register",
      () => n,
      (e) => (n = e)
    ),
      e(
        t.exports,
        "resolve",
        () => o,
        (e) => (o = e)
      );
    var i = {};
    (n = function (e) {
      for (var t = Object.keys(e), r = 0; r < t.length; r++) i[t[r]] = e[t[r]];
    }),
      (o = function (e) {
        var t = i[e];
        if (null == t) throw new Error("Could not resolve bundle with id " + e);
        return t;
      });
  }),
  i("27Lyk").register(
    JSON.parse(
      '{"jRPZQ":"index.31093a8c.js","8d1gI":"Kiwo20220.55ba3a32.jpg","2C7eA":"Kiwo20221.ec3f02b7.jpg","8dAHn":"Kiwo20222.2f2e23de.jpg","1kIMb":"Kiwo20223.cca56516.jpg","2epBN":"Kiwo20224.5070887d.jpg","7dXIt":"Kiwo20225.54c05cc9.jpg","4ys2E":"Kiwo20226.f73745b1.jpg","1A7JF":"Kiwo20227.e0520350.jpg","8O2T8":"Kiwo20228.cad7e341.jpg","iKTDw":"img7.dc270d50.jpg","4ZzP6":"img2.7bf8ba6b.jpg","lNR7Z":"img6.f9f70f09.jpg","hRiSC":"img8.0c45716f.jpg"}'
    )
  );
var c;
c = new URL(i("27Lyk").resolve("8d1gI"), import.meta.url).toString();
var s;
s = new URL(i("27Lyk").resolve("2C7eA"), import.meta.url).toString();
var a;
a = new URL(i("27Lyk").resolve("8dAHn"), import.meta.url).toString();
var l;
l = new URL(i("27Lyk").resolve("1kIMb"), import.meta.url).toString();
var d;
d = new URL(i("27Lyk").resolve("2epBN"), import.meta.url).toString();
var u;
u = new URL(i("27Lyk").resolve("7dXIt"), import.meta.url).toString();
var f;
f = new URL(i("27Lyk").resolve("4ys2E"), import.meta.url).toString();
var m;
m = new URL(i("27Lyk").resolve("1A7JF"), import.meta.url).toString();
var g;
g = new URL(i("27Lyk").resolve("8O2T8"), import.meta.url).toString();
var p;
p = new URL(i("27Lyk").resolve("iKTDw"), import.meta.url).toString();
new URL(i("27Lyk").resolve("4ZzP6"), import.meta.url).toString();
new URL(i("27Lyk").resolve("lNR7Z"), import.meta.url).toString();
var v;
(v = new URL(i("27Lyk").resolve("hRiSC"), import.meta.url).toString()),
  document.querySelector(".nav-items").addEventListener("click", function (e) {
    if ((e.preventDefault(), e.target.classList.contains("slide-out"))) {
      const t = e.target.getAttribute("href");
      document.querySelector(t).scrollIntoView({ behavior: "smooth" });
    }
  });
const y = document.querySelectorAll(".nav-item"),
  b = document.querySelector(".menuIcon");
y.forEach((e) =>
  e.addEventListener("click", function () {
    1 == b.checked ? (b.checked = !1) : 0 == b.checked && (b.checked = !0);
  })
);
const L = document.querySelector("nav"),
  S = document.querySelector(".navigation__container"),
  w = document.querySelector("#home"),
  h = (document.querySelector("body"), L.getBoundingClientRect().height);
new IntersectionObserver(
  function (e) {
    const [t] = e;
    t.isIntersecting
      ? (S.classList.remove("sticky"),
        w.classList.remove("plusmargin"),
        w.classList.add("nomargin"))
      : (S.classList.add("sticky"),
        w.classList.add("plusmargin"),
        w.classList.remove("nomargin"),
        document.querySelector("bg-video").classList.remove("minusmargin"));
  },
  { root: null, threshold: 0.01, rootMargin: `-${h}px` }
).observe(w);
const A = document.querySelector(".slider-dots"),
  _ = document.querySelectorAll(".component-content");
_.forEach((e, t) => (e.style.transform = `translateX(${100 * t}%)`));
_.forEach((e, t) => {
  A.insertAdjacentHTML(
    "beforeend",
    `<button class="slider-dot" id="button--${t}" aria-label="slider-buttons" data-slide="${t}"></button>`
  );
});
const E = function (e) {
  document
    .querySelectorAll(".slider-dot")
    .forEach((e) => e.classList.remove("slider-dot__active")),
    document
      .querySelector(`.slider-dot[data-slide="${e}"]`)
      .classList.add("slider-dot__active");
};
E(0);
let R = 0;
const k = _.length,
  H = function (e) {
    _.forEach((t, r) => (t.style.transform = `translateX(${110 * (r - e)}%)`));
  };
H(0);
const x = function () {
    R === k - 1 ? (R = 0) : R++, H(R), E(R);
  },
  j = function () {
    R > 0 ? R-- : (R = k - 1), H(R), E(R);
  },
  q = document.querySelector(".slider-btn--right"),
  F = document.querySelector(".slider-btn--left");
q.addEventListener("click", x),
  F.addEventListener("click", j),
  document.addEventListener("keydown", function (e) {
    "ArrowRight" === e.key ? x() : "ArrowLeft" === e.key && j();
  }),
  A.addEventListener("click", function (e) {
    if (e.target.classList.contains("slider-dot")) {
      const t = e.target.dataset.slide;
      H(t), E(t);
    }
  });
const I = document.getElementById("main-view"),
  U = document.getElementById("caption"),
  K = document.getElementById("info"),
  T = document.getElementById("thumbnails");
let C = [
  { src: t(c), caption: "", info: "" },
  { src: t(s), caption: "", info: "" },
  { src: t(a), caption: "", info: "" },
  { src: t(l), caption: "", info: "" },
  { src: t(d), caption: "", info: "" },
  { src: t(u), caption: "", info: "" },
  { src: t(f), caption: "", info: "" },
  { src: t(m), caption: "", info: "" },
  { src: t(g), caption: "", info: "" },
  { src: t(p), caption: "", info: "" },
  { src: t(v), caption: "", info: "" },
];
for (let e = 1; e < C.length; e++) {
  C[e];
  let t = document.createElement("img");
  (t.src = C[e].src),
    t.setAttribute("width", "170px"),
    t.setAttribute("height", "170px"),
    t.setAttribute("data-index", e),
    t.setAttribute("alt", "img" + e),
    t.addEventListener("click", O),
    T.appendChild(t);
}
function O(e) {
  B(e.currentTarget.getAttribute("data-index"));
}
function B(e) {
  let t = C[e];
  (I.src = t.src),
    I.setAttribute("width", "1000px"),
    I.setAttribute("height", "1000px"),
    I.setAttribute("data-index", e),
    I.setAttribute("id", "image-" + e),
    I.setAttribute("alt", "img" + e),
    (I.style.opacity = 1),
    (U.textContent = t.caption),
    (K.textContent = t.info);
}
B(0),
  setTimeout(function e() {
    let t = parseInt(I.getAttribute("data-index"));
    (t = t + 1 == C.length ? 1 : t + 1), B(t), setTimeout(e, 8e3);
  }, 8e3);
//# sourceMappingURL=index.31093a8c.js.map
