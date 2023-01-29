const contactForm = document.querySelector("#my-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let subject = "neue Anmeldung";
  let message = document.getElementById("message");
  
  console.log("submitted");
  //formData works fine
  let formData = "";
      formData += 'name=' + name.value;
      formData += '&email=' + email.value;
	  formData += '&message=' + message.value;
	  formData += '&subject=' + subject;
/*
	formData.append('name', name.value);
	formData.append('email', email.value);
	formData.append('subject', subject);
	formData.append('message', message.value);
	*/

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/mailer.php", true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  xhr.onload = function () {
    console.log(this.responseText);
/*
    if (xhr.responseText == "sucess") {
      alert("Email sent");
      name.value = "";
      email.value = "";
      message.value = "";
    } else {
      console.log("Something went wrong");
    }
*/
  }; //ERROR  mailer.js:29          POST http://localhost:8080/ net::ERR_EMPTY_RESPONSE
  xhr.send(formData);
});
