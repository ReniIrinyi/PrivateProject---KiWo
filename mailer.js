require(dotenv).config();
const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
  host: "srv19.tophost.ch",
  port: 993,
  secure: true,
});
require("dotenv").config();
const express = require("express");
const nodeMail = require("nodemailer");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

async function mainMail(name, email, subject, message) {
  const transporter = await nodeMail.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.PASSWORD,
    },
  });
  const mailOption = {
    from: process.env.GMAIL_USER,
    to: process.env.EMAIL,
    subject: subject,
    html: `You got a message from 
    Email : ${email}
    Name: ${name}
    Message: ${message}`,
  };
  try {
    await transporter.sendMail(mailOption);
    return Promise.resolve("Message Sent Successfully!");
  } catch (error) {
    return Promise.reject(error);
  }
}

app.get("/", (req, res) => {
  res.render(index.html);
});

app.get("/contact", (req, res) => {
  res.render(index.html);
});
const yoursubject = "neue Anmeldung";
app.post("/contact", async (req, res, next) => {
  const { name, email, message } = req.body;
  try {
    await mainMail(name, email, yoursubject, message);

    res.send("Message Successfully Sent!");
  } catch (error) {
    res.send("Message Could not be Sent");
  }
});

app.listen(3000, () => console.log("Server is running!"));
