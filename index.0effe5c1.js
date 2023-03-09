document.querySelector(".nav-items").addEventListener("click",(function(e){if(e.preventDefault(),e.target.classList.contains("slide-out")){const t=e.target.getAttribute("href");document.querySelector(t).scrollIntoView({behavior:"smooth"})}}));const e=document.querySelector(".navbar"),t=document.querySelector(".navigation__container"),o=document.querySelector("#home"),n=(document.querySelector("body"),e.getBoundingClientRect().height);new IntersectionObserver((function(e){const[o]=e;o.isIntersecting?t.classList.remove("sticky"):t.classList.add("sticky")}),{root:null,threshold:.05,rootMargin:`-${n}px`}).observe(o);const c=document.querySelectorAll(".section"),r=new IntersectionObserver((function(e,t){const[o]=e;o.isIntersecting&&(o.target.classList.remove("section--hidden"),t.unobserve(o.target))}),{root:null,threshold:.2});c.forEach((e=>{r.observe(e),e.classList.add("section--hidden")}));const i=document.querySelector(".backgroundVideoDay"),s=document.querySelector(".backgroundVideoNight"),l=document.querySelector(".toggle--checkbox"),a=document.querySelector(".document--container");l.addEventListener("click",(function(){setTimeout((()=>{(!0===l.checked||!1===l.checked)&&(i.classList.toggle("hiddenClass"),s.classList.toggle("hiddenClass"),a.classList.toggle("dark-theme"))}),"300")}));const d=document.querySelector(".slider-dots"),u=document.querySelectorAll(".component-content");u.forEach(((e,t)=>e.style.transform=`translateX(${100*t}%)`));u.forEach(((e,t)=>{d.insertAdjacentHTML("beforeend",`<button class="slider-dot" data-slide="${t}"></button>`)}));const g=function(e){document.querySelectorAll(".slider-dot").forEach((e=>e.classList.remove("slider-dot__active"))),document.querySelector(`.slider-dot[data-slide="${e}"]`).classList.add("slider-dot__active")};g(0);let m=0;const y=u.length,f=function(e){u.forEach(((t,o)=>t.style.transform=`translateX(${110*(o-e)}%)`))};f(0);const h=function(){m===y-1?m=0:m++,f(m),g(m)},p=function(){m>0?m--:m=y-1,f(m),g(m)},b=document.querySelector(".slider-btn--right"),v=document.querySelector(".slider-btn--left");b.addEventListener("click",h),v.addEventListener("click",p),document.addEventListener("keydown",(function(e){"ArrowRight"===e.key?h():"ArrowLeft"===e.key&&p()})),d.addEventListener("click",(function(e){if(e.target.classList.contains("slider-dot")){const t=e.target.dataset.slide;f(t),g(t)}}));const L=document.getElementById("main-view"),w=document.getElementById("caption"),A=document.getElementById("info"),k=document.getElementById("thumbnails");let q=[{src:"source/gallery/Kiwo20220.jpg",caption:"",info:""},{src:"source/gallery/Kiwo20221.jpg",caption:"",info:""},{src:"source/gallery/Kiwo20225.jpg",caption:"",info:""},{src:"source/gallery/Kiwo20224.jpg",caption:"",info:""},{src:"source/gallery/Kiwo20222.jpg",caption:"",info:""},{src:"source/gallery/Kiwo20223.jpg",caption:"",info:""},{src:"source/gallery/img8.jpg",caption:"",info:""},{src:"source/gallery/Kiwo20226.jpg",caption:"",info:""},{src:"source/gallery/Kiwo20227.jpg ",caption:"",info:""},{src:"source/gallery/Kiwo20228.jpg",caption:"",info:""}];for(let e=1;e<q.length;e++){q[e];let t=document.createElement("img");t.src=q[e].src,t.setAttribute("width","170px"),t.setAttribute("height","170px"),t.setAttribute("data-index",e),t.setAttribute("alt","img"+e),t.addEventListener("click",E),k.appendChild(t)}function E(e){S(e.currentTarget.getAttribute("data-index"))}function S(e){let t=q[e];L.src=t.src,L.setAttribute("width","1000px"),L.setAttribute("height","1000px"),L.setAttribute("data-index",e),L.setAttribute("id","image-"+e),L.setAttribute("alt","img"+e),L.style.opacity=1,w.textContent=t.caption,A.textContent=t.info}S(0),setTimeout((function e(){let t=parseInt(L.getAttribute("data-index"));t=t+1==q.length?1:t+1,S(t),setTimeout(e,8e3)}),8e3);
//# sourceMappingURL=index.0effe5c1.js.map
