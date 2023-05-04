import img1 from "./source/gallery/kiwo202301.jpg";
import img2 from "./source/gallery/kiwo202302.jpg";
import img3 from "./source/gallery/kiwo202303.jpg";
import img4 from "./source/gallery/kiwo202304.jpg";
import img5 from "./source/gallery/kiwo202305.jpg";
import img6 from "./source/gallery/kiwo202306.jpg";
import img8 from "./source/gallery/kiwo202308.jpg";
import img9 from "./source/gallery/kiwo202309.jpg";
import img10 from "./source/gallery/kiwo202310.jpg";
import img12 from "./source/gallery/kiwo202312.jpg";
import img13 from "./source/gallery/kiwo202313.jpg";
import img14 from "./source/gallery/kiwo202314.jpg";
import img15 from "./source/gallery/kiwo202315.jpg";
import img16 from "./source/gallery/kiwo202316.jpg";
import img17 from "./source/gallery/kiwo202317.jpg";
import img18 from "./source/gallery/kiwo202318.jpg";
import img19 from "./source/gallery/kiwo202319.jpg";
import img20 from "./source/gallery/kiwo202320.jpg";
import img21 from "./source/gallery/kiwo202321.jpg";
import img22 from "./source/gallery/kiwo202322.jpg";
import img23 from "./source/gallery/kiwo202323.jpg";
import img24 from "./source/gallery/kiwo202324.jpg";

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
    home.classList.add("plusmargin");
    home.classList.remove("nomargin");
    document.querySelector("bg-video").classList.remove("minusmargin");
  } else {
    navigation.classList.remove("sticky");
    home.classList.remove("plusmargin");
    home.classList.add("nomargin");
  }
};

const observer = new IntersectionObserver(callback, {
  root: null,
  threshold: 0.01,
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
  },
  {
    src: img2,
  },
  {
    src: img3,
  },
  {
    src: img4,
  },
  {
    src: img5,
  },
  {
    src: img6,
  },
  {
    src: img8,
  },
  {
    src: img9,
  },
  {
    src: img10,
  },
  {
    src: img12,
  },
  {
    src: img13,
  },
  {
    src: img14,
  },
  {
    src: img15,
  },
  {
    src: img16,
  },
  {
    src: img17,
  },
  {
    src: img18,
  },
  {
    src: img19,
  },
  {
    src: img20,
  },
  {
    src: img21,
  },
  {
    src: img22,
  },
  {
    src: img23,
  },
  {
    src: img24,
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
