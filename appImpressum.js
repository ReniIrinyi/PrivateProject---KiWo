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
