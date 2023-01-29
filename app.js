// //Email
// const form = document.getElementById("my-form");
// async function handleSubmit(event) {
//   event.preventDefault();
//   const status = document.getElementById("status");
//   const data = new FormData(event.target);
//   fetch(event.target.action, {
//     method: form.method,
//     body: data,
//     headers: {
//       Accept: "application/json",
//     },
//   })
//     .then((response) => {
//       status.innerHTML =
//         "Vielen Dank für Ihre Nachricht. Wir werden Sie in Kürze kontaktieren!";
//       form.reset();
//     })
//     .catch((error) => {
//       status.innerHTML =
//         "Oops! Es gab ein Problem beim Absenden Ihres Formulars. Bitte versuchen Sie es erneut! ";
//     });
// }
// form.addEventListener("submit", handleSubmit);
//Helper-contact
const $37af372d132f8db6$var$helperContact = document.querySelector(".contact-helper");
document.querySelector(".contact-helper--button").addEventListener("click", function(e) {
    e.preventDefault();
    $37af372d132f8db6$var$helperContact.classList.toggle("hidden");
});
//Page Navigation
document.querySelector(".nav-items").addEventListener("click", function(e) {
    e.preventDefault();
    if (e.target.classList.contains("slide-out")) {
        const id = e.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({
            behavior: "smooth"
        });
    }
});
// Sticky Nav
const $37af372d132f8db6$var$navbar = document.querySelector(".navbar");
const $37af372d132f8db6$var$navigation = document.querySelector(".navigation__container");
const $37af372d132f8db6$var$home = document.querySelector("#home");
const $37af372d132f8db6$var$doc = document.querySelector("body");
const $37af372d132f8db6$var$navHeight = $37af372d132f8db6$var$navbar.getBoundingClientRect().height;
const $37af372d132f8db6$var$callback = function(entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) $37af372d132f8db6$var$navigation.classList.add("sticky");
    else $37af372d132f8db6$var$navigation.classList.remove("sticky");
};
const $37af372d132f8db6$var$observer = new IntersectionObserver($37af372d132f8db6$var$callback, {
    root: null,
    threshold: 0.05,
    rootMargin: `-${$37af372d132f8db6$var$navHeight}px`
});
$37af372d132f8db6$var$observer.observe($37af372d132f8db6$var$home);
//Reveling Sections
const $37af372d132f8db6$var$allSections = document.querySelectorAll(".section");
// console.log(allSections);
const $37af372d132f8db6$var$revealSection = function(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
};
const $37af372d132f8db6$var$sectionObserver = new IntersectionObserver($37af372d132f8db6$var$revealSection, {
    root: null,
    threshold: 0.2
});
$37af372d132f8db6$var$allSections.forEach((section)=>{
    $37af372d132f8db6$var$sectionObserver.observe(section);
    section.classList.add("section--hidden");
});
//Day/Night Switcher
const $37af372d132f8db6$var$backgroundVideoDay = document.querySelector(".backgroundVideoDay");
const $37af372d132f8db6$var$backgroundVideoNight = document.querySelector(".backgroundVideoNight");
const $37af372d132f8db6$var$toggleCheckbox = document.querySelector(".toggle--checkbox");
const $37af372d132f8db6$var$documentContainer = document.querySelector(".document--container");
$37af372d132f8db6$var$toggleCheckbox.addEventListener("click", function() {
    setTimeout(()=>{
        if ($37af372d132f8db6$var$toggleCheckbox.checked === true) {
            $37af372d132f8db6$var$backgroundVideoDay.classList.toggle("hiddenClass");
            $37af372d132f8db6$var$backgroundVideoNight.classList.toggle("hiddenClass");
            $37af372d132f8db6$var$documentContainer.classList.toggle("dark-theme");
        } else if ($37af372d132f8db6$var$toggleCheckbox.checked === false) {
            $37af372d132f8db6$var$backgroundVideoDay.classList.toggle("hiddenClass");
            $37af372d132f8db6$var$backgroundVideoNight.classList.toggle("hiddenClass");
            $37af372d132f8db6$var$documentContainer.classList.toggle("dark-theme");
        }
    }, "300");
});
//Slider
const $37af372d132f8db6$var$dots = document.querySelector(".slider-dots");
const $37af372d132f8db6$var$sliderCompontents = document.querySelectorAll(".component-content");
$37af372d132f8db6$var$sliderCompontents.forEach((slide, i)=>slide.style.transform = `translateX(${100 * i}%)`);
const $37af372d132f8db6$var$createDots = function() {
    $37af372d132f8db6$var$sliderCompontents.forEach((s, i)=>{
        $37af372d132f8db6$var$dots.insertAdjacentHTML("beforeend", `<button class="slider-dot" data-slide="${i}"></button>`);
    });
};
$37af372d132f8db6$var$createDots();
const $37af372d132f8db6$var$activateDots = function(slide) {
    document.querySelectorAll(".slider-dot").forEach((dot)=>dot.classList.remove("slider-dot__active"));
    document.querySelector(`.slider-dot[data-slide="${slide}"]`).classList.add("slider-dot__active");
};
$37af372d132f8db6$var$activateDots(0);
let $37af372d132f8db6$var$currentSlide = 0;
const $37af372d132f8db6$var$maxSlide = $37af372d132f8db6$var$sliderCompontents.length;
const $37af372d132f8db6$var$goToSlide = function(slide) {
    $37af372d132f8db6$var$sliderCompontents.forEach((s, i)=>s.style.transform = `translateX(${110 * (i - slide)}%)`);
};
$37af372d132f8db6$var$goToSlide(0);
const $37af372d132f8db6$var$nextSlide = function() {
    $37af372d132f8db6$var$currentSlide === $37af372d132f8db6$var$maxSlide - 1 ? $37af372d132f8db6$var$currentSlide = 0 : $37af372d132f8db6$var$currentSlide++;
    $37af372d132f8db6$var$goToSlide($37af372d132f8db6$var$currentSlide);
    $37af372d132f8db6$var$activateDots($37af372d132f8db6$var$currentSlide);
};
const $37af372d132f8db6$var$prevSlide = function() {
    if ($37af372d132f8db6$var$currentSlide > 0) $37af372d132f8db6$var$currentSlide--;
    else $37af372d132f8db6$var$currentSlide = $37af372d132f8db6$var$maxSlide - 1;
    $37af372d132f8db6$var$goToSlide($37af372d132f8db6$var$currentSlide);
    $37af372d132f8db6$var$activateDots($37af372d132f8db6$var$currentSlide);
};
const $37af372d132f8db6$var$btnRight = document.querySelector(".slider-btn--right");
const $37af372d132f8db6$var$btnLeft = document.querySelector(".slider-btn--left");
$37af372d132f8db6$var$btnRight.addEventListener("click", $37af372d132f8db6$var$nextSlide);
$37af372d132f8db6$var$btnLeft.addEventListener("click", $37af372d132f8db6$var$prevSlide);
document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowRight") $37af372d132f8db6$var$nextSlide();
    else if (e.key === "ArrowLeft") $37af372d132f8db6$var$prevSlide();
});
$37af372d132f8db6$var$dots.addEventListener("click", function(e) {
    if (e.target.classList.contains("slider-dot")) {
        // console.log("dot");
        const slide = e.target.dataset.slide;
        $37af372d132f8db6$var$goToSlide(slide);
        $37af372d132f8db6$var$activateDots(slide);
    }
});
//Gallery
const $37af372d132f8db6$var$mainView = document.getElementById("main-view");
const $37af372d132f8db6$var$caption = document.getElementById("caption");
const $37af372d132f8db6$var$info = document.getElementById("info");
const $37af372d132f8db6$var$thumbnails = document.getElementById("thumbnails");
let $37af372d132f8db6$var$images = [
    {
        src: "source/gallery/img9.jpg",
        caption: "",
        info: ""
    },
    {
        src: "source/gallery/Kiwo20221.jpg",
        caption: "",
        info: ""
    },
    {
        src: "source/gallery/Kiwo20224.jpg",
        caption: "",
        info: ""
    },
    {
        src: "source/gallery/Kiwo20222.jpg",
        caption: "",
        info: ""
    },
    {
        src: "source/gallery/Kiwo20223.jpg",
        caption: "",
        info: ""
    },
    {
        src: "source/gallery/img8.jpg",
        caption: "",
        info: ""
    },
    {
        src: "source/gallery/Kiwo20226.jpg",
        caption: "",
        info: ""
    }
];
for(let i = 0; i < $37af372d132f8db6$var$images.length; i++){
    let image = $37af372d132f8db6$var$images[i];
    let img = document.createElement("img");
    img.src = $37af372d132f8db6$var$images[i].src;
    img.setAttribute("width", "170px");
    img.setAttribute("height", "170px");
    img.setAttribute("data-index", i);
    img.setAttribute("alt", "img" + i);
    img.addEventListener("click", $37af372d132f8db6$var$changeImage);
    $37af372d132f8db6$var$thumbnails.appendChild(img);
}
function $37af372d132f8db6$var$initGallery() {
    $37af372d132f8db6$var$loadImage(0);
}
function $37af372d132f8db6$var$slideImage() {
    let currentIndex = parseInt($37af372d132f8db6$var$mainView.getAttribute("data-index"));
    currentIndex = currentIndex + 1 == $37af372d132f8db6$var$images.length ? 1 : currentIndex + 1;
    $37af372d132f8db6$var$loadImage(currentIndex);
    setTimeout($37af372d132f8db6$var$slideImage, 3000);
}
function $37af372d132f8db6$var$changeImage(event) {
    let target = event.currentTarget;
    let index = target.getAttribute("data-index");
    $37af372d132f8db6$var$loadImage(index);
}
function $37af372d132f8db6$var$loadImage(index) {
    let image = $37af372d132f8db6$var$images[index];
    $37af372d132f8db6$var$mainView.src = image.src;
    $37af372d132f8db6$var$mainView.setAttribute("width", "1000px");
    $37af372d132f8db6$var$mainView.setAttribute("height", "1000px");
    $37af372d132f8db6$var$mainView.setAttribute("data-index", index);
    $37af372d132f8db6$var$mainView.setAttribute("id", "image-" + index);
    $37af372d132f8db6$var$mainView.setAttribute("alt", "img" + index);
    $37af372d132f8db6$var$mainView.style.opacity = 1;
    $37af372d132f8db6$var$caption.textContent = image.caption;
    $37af372d132f8db6$var$info.textContent = image.info;
}
function $37af372d132f8db6$var$fullScreenImage() {
    $37af372d132f8db6$var$toggleFullscreen($37af372d132f8db6$var$mainView);
}
function $37af372d132f8db6$var$toggleFullscreen(el) {
    if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
    } else {
        if (document.documentElement.requestFullscreen) el.requestFullscreen();
        else if (document.documentElement.mozRequestFullScreen) el.mozRequestFullScreen();
        else if (document.documentElement.webkitRequestFullscreen) el.webkitRequestFullscreen();
        else if (document.documentElement.msRequestFullscreen) el.msRequestFullscreen();
    }
}
$37af372d132f8db6$var$initGallery();
setTimeout($37af372d132f8db6$var$slideImage, 15000);


//# sourceMappingURL=app.js.map
