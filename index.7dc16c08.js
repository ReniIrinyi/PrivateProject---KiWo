const e=document.getElementById("my-form");e.addEventListener("submit",(async function(t){t.preventDefault();const n=document.getElementById("status"),o=new FormData(t.target);fetch(t.target.action,{method:e.method,body:o,headers:{Accept:"application/json"}}).then((t=>{n.innerHTML="Vielen Dank für Ihre Nachricht. Wir werden Sie in Kürze kontaktieren!",e.reset()})).catch((e=>{n.innerHTML="Oops! Es gab ein Problem beim Absenden Ihres Formulars. Bitte versuchen Sie es erneut! "}))})),document.querySelector(".nav-items").addEventListener("click",(function(e){if(e.preventDefault(),e.target.classList.contains("slide-out")){const t=e.target.getAttribute("href");document.querySelector(t).scrollIntoView({behavior:"smooth"})}}));const t=document.querySelector(".navigation__container"),n=document.querySelector("#home"),o=t.getBoundingClientRect().height;new IntersectionObserver((function(e){document.querySelector(".document--container").style.paddingTop="0";const[n]=e;n.isIntersecting?(t.classList.remove("sticky"),document.querySelector(".document--container").style.paddingTop="0"):(t.classList.add("sticky"),document.querySelector(".document--container").style.paddingTop=`${o}px`)}),{root:null,threshold:.6,rootMargin:`-${o}px`}).observe(n);const c=document.querySelectorAll(".section"),r=new IntersectionObserver((function(e,t){const[n]=e;n.isIntersecting&&(n.target.classList.remove("section--hidden"),t.unobserve(n.target))}),{root:null,threshold:.15});c.forEach((e=>{r.observe(e),e.classList.add("section--hidden")}));const s=document.querySelector(".backgroundVideoDay"),i=document.querySelector(".backgroundVideoNight"),d=document.querySelector(".toggle--checkbox"),a=document.querySelector(".document--container");d.addEventListener("click",(function(){setTimeout((()=>{(!0===d.checked||!1===d.checked)&&(s.classList.toggle("hiddenClass"),i.classList.toggle("hiddenClass"),a.classList.toggle("dark-theme"))}),"300")}));const l=document.querySelector(".slider-dots"),u=document.querySelectorAll(".components");u.forEach(((e,t)=>e.style.transform=`translateX(${100*t}%)`));u.forEach(((e,t)=>{l.insertAdjacentHTML("beforeend",`<button class="slider-dot" data-slide="${t}"></button>`)}));const m=function(e){document.querySelectorAll(".slider-dot").forEach((e=>e.classList.remove("slider-dot__active"))),document.querySelector(`.slider-dot[data-slide="${e}"]`).classList.add("slider-dot__active")};m(0);let h=0;const g=u.length,y=function(e){u.forEach(((t,n)=>t.style.transform=`translateX(${110*(n-e)}%)`))};y(0);const f=function(){h===g-1?h=0:h++,y(h),m(h)},v=function(){h>0?h--:h=g-1,y(h),m(h)},L=document.querySelector(".slider-btn--right"),b=document.querySelector(".slider-btn--left");L.addEventListener("click",f),b.addEventListener("click",v),document.addEventListener("keydown",(function(e){"ArrowRight"===e.key?f():"ArrowLeft"===e.key&&v()})),l.addEventListener("click",(function(e){if(e.target.classList.contains("slider-dot")){const t=e.target.dataset.slide;y(t),m(t)}}));
//# sourceMappingURL=index.7dc16c08.js.map
