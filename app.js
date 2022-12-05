//Email

var form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      status.innerHTML =
        "Vielen Dank für Ihre Nachricht. Wir werden Sie in Kürze kontaktieren!";
      form.reset();
    })
    .catch((error) => {
      status.innerHTML =
        "Oops! Es gab ein Problem beim Absenden Ihres Formulars. Bitte versuchen Sie es erneut! ";
    });
}
form.addEventListener("submit", handleSubmit);

//Page Navigation
document.querySelector(".nav-items").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("slide-out")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Sticky Nav
const navigation = document.querySelector(".navigation__container");
const home = document.querySelector("#home");
const navHeight = navigation.getBoundingClientRect().height;
console.log(navHeight);
const callback = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    navigation.classList.add("sticky");
    document.querySelector(
      ".document--container"
    ).style.paddingTop = `${navHeight}px`;
  } else {
    navigation.classList.remove("sticky");
    document.querySelector(".document--container").style.paddingTop = `0`;
  }
};

const observer = new IntersectionObserver(callback, {
  root: null,
  threshold: 0.2,
  rootMargin: `-${navHeight}px`,
});
observer.observe(home);

//Reveling Sections
const allSections = document.querySelectorAll(".section");
console.log(allSections);
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//Day/Night Switcher
const backgroundVideoDay = document.querySelector(".backgroundVideoDay");
const backgroundVideoNight = document.querySelector(".backgroundVideoNight");
const toggleCheckbox = document.querySelector(".toggle--checkbox");
const documentContainer = document.querySelector(".document--container");
const aboutus = document.querySelector(".about-us");
const infos = document.querySelector(".infos");
const contact = document.querySelector(".contact");
const footer = document.querySelector(".footer");
const social1 = document.querySelector(".bi-house-fill");
const social2 = document.querySelector(".bi-house-fill-1");
const social3 = document.querySelector(".bi-facebook");
const bannerBtn = document.querySelector(".banner-btn--2");

toggleCheckbox.addEventListener("click", function () {
  setTimeout(() => {
    if (toggleCheckbox.checked == true) {
      backgroundVideoDay.classList.toggle("hiddenClass");
      backgroundVideoNight.classList.toggle("hiddenClass");
      documentContainer.classList.toggle("dark-theme");
      aboutus.classList.toggle("dark-theme");
      social1.classList.toggle("dark-theme--fill");
      social2.classList.toggle("dark-theme--fill");
      social3.classList.toggle("dark-theme--fill");
      infos.classList.toggle("dark-theme");
      contact.classList.toggle("dark-theme--highlighted");
      footer.classList.toggle("dark-theme--grey2");
      navbar.classList.toggle("dark-theme--grey");
      bannerBtn.classList.toggle("dark-theme--highlighted");
      menu.classList.toggle("dark-theme--greyDarker");
    } else if (toggleCheckbox.checked == false) {
      documentContainer.classList.toggle("dark-theme");
      backgroundVideoDay.classList.toggle("hiddenClass");
      backgroundVideoNight.classList.toggle("hiddenClass");
      aboutus.classList.toggle("dark-theme");
      social1.classList.toggle("dark-theme--fill");
      social2.classList.toggle("dark-theme--fill");
      social3.classList.toggle("dark-theme--fill");
      infos.classList.toggle("dark-theme");
      contact.classList.toggle("dark-theme--highlighted");
      footer.classList.toggle("dark-theme--grey2");
      navbar.classList.toggle("dark-theme--grey");
      bannerBtn.classList.toggle("dark-theme--highlighted");
      menu.classList.toggle("dark-theme--greyDarker");
    }
  }, "300");
});

//Slider
const dots = document.querySelector(".slider-dots");
const sliderCompontents = document.querySelectorAll(".components");
sliderCompontents.forEach(
  (slide, i) => (slide.style.transform = `translateX(${100 * i}%)`)
);
const createDots = function () {
  sliderCompontents.forEach((s, i) => {
    dots.insertAdjacentHTML(
      "beforeend",
      `<button class="slider-dots--dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

const activateDots = function (slide) {
  document
    .querySelectorAll(".slider-dots--dot")
    .forEach((dot) => dot.classList.remove("slider-dots--dot__active"));
  document
    .querySelector(`.slider-dots--dot[data-slide="${slide}"]`)
    .classList.add("slider-dots--dot__active");
};

activateDots(0);

let currentSlide = 0;
const maxSlide = sliderCompontents.length;

const goToSlide = function (slide) {
  sliderCompontents.forEach(
    (s, i) => (s.style.transform = `translateX(${110 * (i - slide)}%)`)
  );
};
goToSlide(0);
const nextSlide = function () {
  currentSlide === maxSlide - 1 ? (currentSlide = 0) : currentSlide++;

  goToSlide(currentSlide);
  activateDots(currentSlide);
};
const prevSlide = function () {
  if (currentSlide > 0) currentSlide--;
  else currentSlide = maxSlide - 1;
  goToSlide(currentSlide);
  activateDots(currentSlide);
};
const btnRight = document.querySelector(".slider-btn--right");
const btnLeft = document.querySelector(".slider-btn--left");
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    nextSlide();
  } else if (e.key === "ArrowLeft") {
    prevSlide();
  }
});

dots.addEventListener("click", function (e) {
  if (e.target.classList.contains("slider-dots--dot")) {
    console.log("dot");
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDots(slide);
  }
});

//   // Cookie Message
//   // Copy/pasted from https://alex-d.github.io/Cookies-EU-banner/
//   // jshint ignore:line
//   function (root, factory, undefined) {
//     "use strict";
//     if (typeof define === "function" && define.amd) {
//       define([], factory);
//     } else if (typeof exports === "object") {
//       module.exports = factory();
//     } else {
//       // root is window
//       root.CookiesEuBanner = factory();
//     }
//   }
// (window, function () {
//   "use strict";

//   var CookiesEuBanner,
//     document = window.document;

//   CookiesEuBanner = function (
//     launchFunction,
//     waitAccept,
//     useLocalStorage,
//     undefined
//   ) {
//     if (!(this instanceof CookiesEuBanner)) {
//       return new CookiesEuBanner(launchFunction);
//     }

//     this.cookieTimeout = 31104000000; // 12 months in milliseconds
//     this.bots = /bot|crawler|spider|crawling/i;
//     this.cookieName = "hasConsent";
//     this.trackingCookiesNames = [
//       "__utma",
//       "__utmb",
//       "__utmc",
//       "__utmt",
//       "__utmv",
//       "__utmz",
//       "_ga",
//       "_gat",
//       "_gid",
//     ];
//     this.launchFunction = launchFunction;
//     this.waitAccept = waitAccept || false;
//     this.useLocalStorage = useLocalStorage || false;
//     this.init();
//   };

//   CookiesEuBanner.prototype = {
//     init: function () {
//       // Detect if the visitor is a bot or not
//       // Prevent for search engine take the cookie alert message as main content of the page
//       var isBot = this.bots.test(navigator.userAgent);

//       // Check if DoNotTrack is activated
//       var dnt =
//         navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack;
//       var isToTrack =
//         dnt !== null && dnt !== undefined
//           ? dnt && dnt !== "yes" && dnt !== 1 && dnt !== "1"
//           : true;

//       // Do nothing if it is a bot
//       // If DoNotTrack is activated, do nothing too
//       if (isBot || !isToTrack || this.hasConsent() === false) {
//         this.removeBanner(0);
//         return false;
//       }

//       // User has already consent to use cookies to tracking
//       if (this.hasConsent() === true) {
//         // Launch user custom function
//         this.launchFunction();
//         return true;
//       }

//       // If it's not a bot, no DoNotTrack and not already accept, so show banner
//       this.showBanner();

//       if (!this.waitAccept) {
//         // Accept cookies by default for the next page
//         this.setConsent(true);
//       }
//     },

//     /*
//      * Show banner at the top of the page
//      */
//     showBanner: function () {
//       var _this = this,
//         getElementById = document.getElementById.bind(document),
//         banner = getElementById("cookies-eu-banner"),
//         rejectButton = getElementById("cookies-eu-reject"),
//         acceptButton = getElementById("cookies-eu-accept"),
//         moreLink = getElementById("cookies-eu-more"),
//         waitRemove =
//           banner.dataset.waitRemove === undefined
//             ? 0
//             : parseInt(banner.dataset.waitRemove),
//         // Variables for minification optimization
//         addClickListener = this.addClickListener,
//         removeBanner = _this.removeBanner.bind(_this, waitRemove);

//       banner.style.display = "block";

//       if (moreLink) {
//         addClickListener(moreLink, function () {
//           _this.deleteCookie(_this.cookieName);
//         });
//       }

//       if (acceptButton) {
//         addClickListener(acceptButton, function () {
//           removeBanner();
//           _this.setConsent(true);
//           _this.launchFunction();
//         });
//       }

//       if (rejectButton) {
//         addClickListener(rejectButton, function () {
//           removeBanner();
//           _this.setConsent(false);

//           // Delete existing tracking cookies
//           _this.trackingCookiesNames.map(_this.deleteCookie);
//         });
//       }
//     },

//     /*
//      * Set consent cookie or localStorage
//      */
//     setConsent: function (consent) {
//       if (this.useLocalStorage) {
//         return localStorage.setItem(this.cookieName, consent);
//       }

//       this.setCookie(this.cookieName, consent);
//     },

//     /*
//      * Check if user already consent
//      */
//     hasConsent: function () {
//       var cookieName = this.cookieName;
//       var isCookieSetTo = function (value) {
//         return (
//           document.cookie.indexOf(cookieName + "=" + value) > -1 ||
//           localStorage.getItem(cookieName) === value
//         );
//       };

//       if (isCookieSetTo("true")) {
//         return true;
//       } else if (isCookieSetTo("false")) {
//         return false;
//       }

//       return null;
//     },

//     /*
//      * Create/update cookie
//      */
//     setCookie: function (name, value) {
//       var date = new Date();
//       date.setTime(date.getTime() + this.cookieTimeout);

//       document.cookie =
//         name + "=" + value + ";expires=" + date.toGMTString() + ";path=/";
//     },

//     /*
//      * Delete cookie by changing expire
//      */
//     deleteCookie: function (name) {
//       var hostname = document.location.hostname.replace(/^www\./, ""),
//         commonSuffix = "; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/";

//       document.cookie = name + "=; domain=." + hostname + commonSuffix;
//       document.cookie = name + "=" + commonSuffix;
//     },

//     addClickListener: function (DOMElement, callback) {
//       if (DOMElement.attachEvent) {
//         // For IE 8 and earlier versions
//         return DOMElement.attachEvent("onclick", callback);
//       }

//       // For all major browsers, except IE 8 and earlier
//       DOMElement.addEventListener("click", callback);
//     },

//     /*
//      * Delays removal of banner allowing developers
//      * to specify their own transition effects
//      */
//     removeBanner: function (wait) {
//       var banner = document.getElementById("cookies-eu-banner");
//       banner.classList.add("before-remove");
//       setTimeout(function () {
//         if (banner && banner.parentNode) {
//           banner.parentNode.removeChild(banner);
//         }
//       }, wait);
//     },
//   };

//   return CookiesEuBanner;
// });

// var cookiesBanner = new CookiesEuBanner(function () {
//   // document.getElementById("cookies-eu-banner").classList.add("hide-it");
// }, true);

// cookiesBanner.addClickListener(
//   document.getElementById("custom-reset"),
//   function () {
//     cookiesBanner.deleteCookie(cookiesBanner.cookieName);
//   }
// );
