document.querySelector(".nav-items").addEventListener("click",(function(e){if(e.preventDefault(),e.target.classList.contains("slide-out")){const t=e.target.getAttribute("href");document.querySelector(t).scrollIntoView({behavior:"smooth"})}}));const e=document.querySelectorAll(".nav-item"),t=document.querySelector(".menuIcon");e.forEach((e=>e.addEventListener("click",(function(){1==t.checked?t.checked=!1:0==t.checked&&(t.checked=!0)}))));const c=document.querySelector("nav"),n=document.querySelector(".navigation__container"),o=document.querySelector("#home"),r=(document.querySelector("body"),c.getBoundingClientRect().height);new IntersectionObserver((function(e){const[t]=e;t.isIntersecting?n.classList.remove("sticky"):n.classList.add("sticky")}),{root:null,threshold:.05,rootMargin:`-${r}px`}).observe(o);
//# sourceMappingURL=impressum.27a8183a.js.map