const e=document.querySelector("#my-form");let t=document.getElementById("name"),n=document.getElementById("email"),o=document.getElementById("message");const r=document.getElementById("status");!function(){function a(e){e.preventDefault();var a=e.target,i=function(e){var t,n=e.elements,o=Object.keys(n).filter((function(e){return"honeypot"!==n[e].name||(t=n[e].value,!1)})).map((function(e){return void 0!==n[e].name?n[e].name:n[e].length>0?n[e].item(0).name:"file"==n[e].type?n[e].item(0):void 0})).filter((function(e,t,n){return n.indexOf(e)==t&&e})),r={};return o.forEach((function(e){var t=n[e];if(r[e]=t.value,t.length){for(var o=[],a=0;a<t.length;a++){var i=t.item(a);(i.checked||i.selected)&&o.push(i.value)}r[e]=o.join(", ")}})),r.formDataNameOrder=JSON.stringify(o),r.formGoogleSheetName=e.dataset.sheet||"responses",r.formGoogleSendEmail=e.dataset.email||"",{data:r,honeypot:t}}(a),u=i.data;if(r.innerHTML="Vielen Dank für deine Nachricht. Wir werden dich in Kürze kontaktieren!",t.value="",n.value="",o.value="",i.honeypot)return r.innerHTML="Oops! Es gab ein Problem beim Absenden deines Formulars. Bitte versuche es erneut!",!1;!function(e){for(var t=e.querySelectorAll("button"),n=0;n<t.length;n++)t[n].disabled=!0}(a);var d=a.action,l=new XMLHttpRequest;l.open("POST",d),l.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),l.onreadystatechange=function(){if(4===l.readyState&&200===l.status){a.reset();var e=a.querySelector(".form-elements");e&&(e.style.display="none");var t=a.querySelector(".thankyou_message");t&&(t.style.display="block")}};var s=Object.keys(u).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(u[e])})).join("&");l.send(s)}document.addEventListener("DOMContentLoaded",(function(){e.addEventListener("submit",a,!1)}),!1)}();
//# sourceMappingURL=index.7a901315.js.map
