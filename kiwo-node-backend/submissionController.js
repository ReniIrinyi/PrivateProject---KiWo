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
const crypto = require("crypto");
const { Sequelize } = require("sequelize");

//production ? use DB-PROD properties for dbConfig : use DB-DEV
const production = config.production === "true";
const url = production ? config.PRODOrigin : config.DEVOrigin;
const filePath = production
  ? config.PRODTabelleFilePath
  : config.DEVTabelleFilePath;
const imagesFolder = production
  ? config.PRODPicFilePath
  : config.DEVPicFilePath;

// Generate Token
function generateToken(length) {
  return crypto.randomBytes(length).toString("hex");
}
// send confirmation email
async function sendConfirmationEmail(email, token, submissionData) {
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: 465,
    secure: true,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
  const dataSummary = `
  Name des Kindes: ${submissionData.kind}
  Vorname: ${submissionData.vorname}
  Nachname: ${submissionData.nachname}
  Geburtsdatum: ${submissionData.geburtsdatum}
  Klasse: ${submissionData.klasse}
  Anschrift: ${submissionData.anschrift}
  Wohnort: ${submissionData.wohnort}
  Email: ${submissionData.email}
  Telefon: ${submissionData.telefon}
  Nachricht: ${submissionData.nachricht}
  Ich kann an einem oder mehreren Nachmittagen mithelfen:
  Montag: ${submissionData.montag ? "Ja" : "Nein"}
  Dienstag: ${submissionData.dienstag ? "Ja" : "Nein"}
  Mittwoch: ${submissionData.mittwoch ? "Ja" : "Nein"}
  Donnerstag: ${submissionData.donnerstag ? "Ja" : "Nein"}
  Freitag: ${submissionData.freitag ? "Ja" : "Nein"}
  Wir benötigen Fahrdienst: ${submissionData.fahrdienst}
  Wir sind mit der Veröffentlichung von Fotos unseres Kindes einverstanden: ${
    submissionData.fotoserlaubnis
  }
  Ich bestätige die Richtigkeit der Angaben: ${
    submissionData.verbindlich ? "Ja" : "Nein"
  }
  `;
  const confirmationUrl = `http://localhost:4200/confirm/${token}`;
  const emailMessage = `Eine Anmeldung wurde mit den folgenden Daten durchgeführt:
  ${dataSummary}
  Bitte bestätige deine E-Mail-Adresse und damit die Anmeldung, indem du auf den folgenden Link klickst: ${confirmationUrl}`;

  console.log(emailMessage);
  await transporter.sendMail({
    from: "anmeldung@kiwo-uerkental.ch",
    to: email,
    subject: "E-Mail Bestätigung und Anmeldedaten",
    text: emailMessage,
  });
}

router.post(
  "/submit",
  upload.single("signatureImageFile"),
  async (req, res) => {
    try {
      const submissionData = req.body;
      const imageBuffer = req.file.buffer;
      const token = generateToken(20);
      const expiresAt = new Date(Date.now() + 3600000);

      //Validate form-data
      const birthdate = submissionData.geburtsdatum
        ? new Date(submissionData.geburtsdatum)
        : null;

      const formattedBirthdate = birthdate
        ? birthdate.toISOString().slice(0, 10)
        : null;

      let submission = await Submission.findOne({
        where: {
          email: submissionData.email,
          kind: submissionData.kind,
          vorname: submissionData.vorname,
          nachname: submissionData.nachname,
        },
      });

      if (submission) {
        await Submission.update(
          {
            kind: submissionData.kind,
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
            tokenExpiresAt: expiresAt,
            emailConfirmed: false,
            token: token,
          },
          {
            where: {
              id: submission.id,
            },
          }
        );
      } else {
        // Create a new Submission record
        await Submission.create({
          kind: submissionData.kind,
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
          tokenExpiresAt: expiresAt,
          emailConfirmed: false,
          token: token,
        });
      }

      console.log(submissionData);
      await sendConfirmationEmail(submissionData.email, token, submissionData);
      res.json({
        message: "Bitte schaue dein Postfach und bestätige deine Anmeldung.",
      });

      const allSubmissions = await retrieveAllSubmissions();

      await ExcelGenerator.generateExcelFile(
        allSubmissions,
        filePath,
        imagesFolder
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get("/confirm/:token", async (req, res) => {
  const { token } = req.params;
  const submission = await Submission.findOne({
    where: { token, tokenExpiresAt: { [Sequelize.Op.gt]: new Date() } },
  });

  if (submission) {
    await submission.update({
      emailConfirmed: true,
      token: null,
      tokenExpiresAt: null,
    });

    const allSubmissions = await retrieveAllConfirmedSubmissions();
    await ExcelGenerator.generateExcelFile(
      allSubmissions,
      filePath,
      imagesFolder
    );

    sendNotificationEmail(submission);

    res.status(200).json({ message: "E-Mail erfolgreich bestätigt." });
  } else {
    res.status(400).send("Ungültiges oder abgelaufenes Token.");
  }
});

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
  
  Betreff: 'neue Anmeldung'
  Name des Kindes: ${submissionData.kind}
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

async function retrieveAllConfirmedSubmissions() {
  try {
    const submissions = await Submission.findAll({
      where: { emailConfirmed: true },
    });
    return submissions;
  } catch (error) {
    console.error("Error retrieving submissions: ", error);
    throw error; // Vagy kezelheted a hibát megfelelően
  }
}

module.exports = router;
