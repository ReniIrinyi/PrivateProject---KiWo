const contactForm = document.querySelector("#my-form");
let name = document.getElementById("name");
let subject = "neue Anmeldung";
let message = document.getElementById("message");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submitted");
  //formData works fine
  let formData = {
    name: name.value,
    email: email.value,
    subject,
    message: message.value,
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onload = function () {
    console.log(xhr.responseText);
    if (xhr.responseText == "sucess") {
      alert("Email sent");
      name.value = "";
      email.value = "";
      message.value = "";
    } else {
      console.log("Something went wrong");
    }
  }; //ERROR  mailer.js:29          POST http://localhost:8080/ net::ERR_EMPTY_RESPONSE
  xhr.send(JSON.stringify(formData));
});
