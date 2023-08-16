const express = require("express");
const multer = require("multer");
const router = express.Router();
const Submission = require("./submission");
const ExcelGenerator = require("./excelGenerator");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const nodemailer = require("nodemailer");
const fs = require("fs");
const properties = require("properties-parser");
const config = properties.read("./app.properties");

const filePath =
  "/Users/renatairinyi/Documents/GitHub/PrivateProject---KiWo/submissions.xlsx";
const imagesFolder =
  "/Users/renatairinyi/Documents/GitHub/PrivateProject---KiWo/unterschriften";
router.post(
  "/submit",
  upload.single("signatureImageFile"),
  async (req, res) => {
    try {
      const submissionData = req.body;
      const imageBuffer = req.file.buffer;
      //Validate form-data
      const birthdate = submissionData.geburtsdatum
        ? new Date(submissionData.geburtsdatum)
        : null;

      const formattedBirthdate = birthdate
        ? birthdate.toISOString().slice(0, 10)
        : null;

      // Create a new Submission record
      await Submission.create({
        betreff: submissionData.betreff,
        vorname: submissionData.vorname,
        nachname: submissionData.nachname,
        geburtsdatum: formattedBirthdate || null,
        klasse: submissionData.klasse,
        anschrift: submissionData.anschrift,
        wohnort: submissionData.wohnort,
        email: submissionData.email,
        telefon: submissionData.telefon,
        nachricht: submissionData.nachricht,
        montag: submissionData.montag,
        dienstag: submissionData.dienstag,
        mittwoch: submissionData.mittwoch,
        donnerstag: submissionData.donnerstag,
        freitag: submissionData.freitag,
        fahrdienst: submissionData.fahrdienst,
        zvieri: submissionData.zvieri,
        fotoserlaubnis: submissionData.fotoserlaubnis,
        verbindlich: submissionData.verbindlich,
        signatureImage: imageBuffer,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const allSubmissions = await retrieveAllSubmissions();

      await ExcelGenerator.generateExcelFile(
        allSubmissions,
        filePath,
        imagesFolder
      );

      sendNotificationEmail(submissionData);
      res.json({ message: "Form submitted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

function sendNotificationEmail(submissionData) {
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: 465,
    secure: true,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    // debug: true,
    // logger: true,
  });

  const emailMessage = `
  Neue Anmeldung erhalten von ${submissionData.vorname}:
  
  Betreff: ${submissionData.betreff}
  Vorname: ${submissionData.vorname}
  Nachname: ${submissionData.nachname}

  Email: ${submissionData.email}
  Telefon: ${submissionData.telefon}

  Nachricht: 
  ${submissionData.nachricht}`;

  const mailOptions = {
    from: submissionData.email,
    to: "anmeldung@kiwo-uerkental.ch",
    subject: "Neue Anmeldung",
    text: emailMessage,
    attachments: [
      {
        filename: "submissions.xlsx",
        content: fs.createReadStream(filePath),
      },
    ],
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending notification email:", error);
    } else {
      console.log("Notification email sent:", info.response);
    }
  });
}
// Implement a function to retrieve all submissions from the database
async function retrieveAllSubmissions() {
  return new Promise((resolve, reject) => {
    Submission.findAll()
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = router;
