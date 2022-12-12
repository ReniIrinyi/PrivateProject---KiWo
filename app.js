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
const navigation = document.querySelector(".navigation__container");
const home = document.querySelector("#home");
const navHeight = navigation.getBoundingClientRect().height;
// console.log(navHeight);
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
// console.log(allSections);
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
const sliderCompontents = document.querySelectorAll(".components");
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
