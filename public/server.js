const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 8080;
app.use(express.static("dist"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

/// DONT WORK ??
app.post("/", (req, res) => {
  console.log(req.body); //Dont work
  const transporter = nodemailer.createTransport({
    service: "*****",
    auth: {
      user: "*****",
      pass: "*****",
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: "anmeldung@kiwo-uerkental.ch",
    subject: `Nachricht von ${req.body.email}: Neue Anmeldung`,
    text: req.body.message,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("email send");
      res.send("sucess");
    }
  });
});

app.listen(PORT, () => {
  console.log("server running");
});
