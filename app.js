import img1 from "./source/gallery/Kiwo20220.jpg";
import img2 from "./source/gallery/Kiwo20221.jpg";
import img3 from "./source/gallery/Kiwo20222.jpg";
import img4 from "./source/gallery/Kiwo20223.jpg";
import img5 from "./source/gallery/Kiwo20224.jpg";
import img6 from "./source/gallery/Kiwo20225.jpg";
import img7 from "./source/gallery/Kiwo20226.jpg";
import img8 from "./source/gallery/Kiwo20227.jpg";
import img9 from "./source/gallery/Kiwo20228.jpg";
import img10 from "./source/gallery/img7.jpg";
import img11 from "./source/gallery/img2.jpg";
import img12 from "./source/gallery/img6.jpg";
import img13 from "./source/gallery/img8.jpg";

//Page Navigation
document.querySelector(".nav-items").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("slide-out")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//Sidebar
const navitems = document.querySelectorAll(".nav-item");
const menuicon = document.querySelector(".menuIcon");

function setNavIcon() {
  if (menuicon.checked == true) {
    menuicon.checked = false;
  } else if (menuicon.checked == false) {
    menuicon.checked = true;
  }
}

navitems.forEach((e) =>
  e.addEventListener("click", function () {
    setNavIcon();
  })
);

//Sticky Nav
const navbar = document.querySelector("nav");
const navigation = document.querySelector(".navigation__container");
const home = document.querySelector("#home");
const doc = document.querySelector("body");
const navHeight = navbar.getBoundingClientRect().height;
const callback = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    navigation.classList.add("sticky");
  } else {
    navigation.classList.remove("sticky");
  }
};

const observer = new IntersectionObserver(callback, {
  root: null,
  threshold: 0.05,
  rootMargin: `-${navHeight}px`,
});
observer.observe(home);

//Slider
const dots = document.querySelector(".slider-dots");
const sliderCompontents = document.querySelectorAll(".component-content");
sliderCompontents.forEach(
  (slide, i) => (slide.style.transform = `translateX(${100 * i}%)`)
);
const createDots = function () {
  sliderCompontents.forEach((s, i) => {
    dots.insertAdjacentHTML(
      "beforeend",
      `<button class="slider-dot" id="button--${i}" aria-label="slider-buttons" data-slide="${i}"></button>`
    );
  });
};
createDots();

const activateDots = function (slide) {
  document
    .querySelectorAll(".slider-dot")
    .forEach((dot) => dot.classList.remove("slider-dot__active"));
  document
    .querySelector(`.slider-dot[data-slide="${slide}"]`)
    .classList.add("slider-dot__active");
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
  if (e.target.classList.contains("slider-dot")) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDots(slide);
  }
});

//Gallery
const mainView = document.getElementById("main-view");
const caption = document.getElementById("caption");
const info = document.getElementById("info");
const thumbnails = document.getElementById("thumbnails");

let images = [
  {
    src: img1,
    caption: "",
    info: "",
  },
  {
    src: img2,
    caption: "",
    info: "",
  },
  {
    src: img3,
    caption: "",
    info: "",
  },
  {
    src: img4,
    caption: "",
    info: "",
  },
  {
    src: img5,
    caption: "",
    info: "",
  },
  {
    src: img6,
    caption: "",
    info: "",
  },
  {
    src: img7,
    caption: "",
    info: "",
  },
  {
    src: img8,
    caption: "",
    info: "",
  },
  {
    src: img9,
    caption: "",
    info: "",
  },
  {
    src: img10,
    caption: "",
    info: "",
  },

  {
    src: img13,
    caption: "",
    info: "",
  },
];

for (let i = 1; i < images.length; i++) {
  let image = images[i];
  let img = document.createElement("img");
  img.src = images[i].src;
  img.setAttribute("width", 170 + "px");
  img.setAttribute("height", 170 + "px");
  img.setAttribute("data-index", i);
  img.setAttribute("alt", "img" + i);
  img.addEventListener("click", changeImage);
  thumbnails.appendChild(img);
}

function initGallery() {
  loadImage(0);
}

function slideImage() {
  let currentIndex = parseInt(mainView.getAttribute("data-index"));
  currentIndex = currentIndex + 1 == images.length ? 1 : currentIndex + 1;
  loadImage(currentIndex);
  setTimeout(slideImage, 8000);
}

function changeImage(event) {
  let target = event.currentTarget;
  let index = target.getAttribute("data-index");
  loadImage(index);
}

function loadImage(index) {
  let image = images[index];
  mainView.src = image.src;
  mainView.setAttribute("width", 1000 + "px");
  mainView.setAttribute("height", 1000 + "px");
  mainView.setAttribute("data-index", index);
  mainView.setAttribute("id", "image-" + index);
  mainView.setAttribute("alt", "img" + index);
  mainView.style.opacity = 1;
  caption.textContent = image.caption;
  info.textContent = image.info;
}

function fullScreenImage() {
  toggleFullscreen(mainView);
}

function toggleFullscreen(el) {
  if (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  ) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  } else {
    if (document.documentElement.requestFullscreen) {
      el.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      el.msRequestFullscreen();
    }
  }
}

initGallery();
setTimeout(slideImage, 8000);
