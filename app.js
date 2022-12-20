//Email
const form = document.getElementById("my-form");
async function handleSubmit(event) {
  event.preventDefault();
  const status = document.getElementById("status");
  const data = new FormData(event.target);
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
const navbar = document.querySelector(".navbar");
const navigation = document.querySelector(".navigation__container");
const home = document.querySelector("#home");
const doc = document.querySelector("body");
const navHeight = navbar.getBoundingClientRect().height;
const callback = function (entries) {
  const [entry] = entries;
  doc.style.marginTop = `0px `;
  if (!entry.isIntersecting) {
    navigation.classList.add("sticky");
    doc.style.marginTop = `${navHeight}px `;
  } else {
    navigation.classList.remove("sticky");
    doc.style.marginTop = `0px `;
  }
};

const observer = new IntersectionObserver(callback, {
  root: null,
  threshold: 0.1,
  rootMargin: `-${navHeight}px`,
});
observer.observe(home);

//Reveling Sections
const allSections = document.querySelectorAll(".section");
// console.log(allSections);
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.3,
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

toggleCheckbox.addEventListener("click", function () {
  setTimeout(() => {
    if (toggleCheckbox.checked === true) {
      backgroundVideoDay.classList.toggle("hiddenClass");
      backgroundVideoNight.classList.toggle("hiddenClass");
      documentContainer.classList.toggle("dark-theme");
    } else if (toggleCheckbox.checked === false) {
      backgroundVideoDay.classList.toggle("hiddenClass");
      backgroundVideoNight.classList.toggle("hiddenClass");
      documentContainer.classList.toggle("dark-theme");
    }
  }, "300");
});

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
      `<button class="slider-dot" data-slide="${i}"></button>`
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
    // console.log("dot");
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
    src: "source/gallery/img9.jpg",
    caption: "",
    info: "",
  },
  {
    src: "source/gallery/Kiwo20221.jpg",
    caption: "",
    info: "",
  },
  {
    src: "source/gallery/Kiwo20224.jpg",
    caption: "",
    info: "",
  },
  {
    src: "source/gallery/Kiwo20222.jpg",
    caption: "",
    info: "",
  },
  {
    src: "source/gallery/Kiwo20223.jpg",
    caption: "",
    info: "",
  },
  {
    src: "source/gallery/img8.jpg",
    caption: "",
    info: "",
  },
  {
    src: "source/gallery/Kiwo20226.jpg",
    caption: "",
    info: "",
  },
];

for (let i = 0; i < images.length; i++) {
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
  setTimeout(slideImage, 3000);
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
setTimeout(slideImage, 15000);
