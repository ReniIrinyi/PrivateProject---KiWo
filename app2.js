const imgs = document.querySelectorAll(".gallerie--img");
console.log(imgs);
imgs.forEach((e) =>
  e.addEventListener("click", function (e) {
    imgs.forEach((e) => e.classList.remove("fadein"));
    e.target.classList.add("fadein");
  })
);
