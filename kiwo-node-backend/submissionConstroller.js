const express = require("express");
const multer = require("multer");
const router = express.Router();
const Submission = require("./submission");
const ExcelGenerator = require("./excelGenerator");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

      const filePath =
        "/Users/renatairinyi/Documents/GitHub/PrivateProject---KiWo/submissions.xlsx";
      const imagesFolder =
        "/Users/renatairinyi/Documents/GitHub/PrivateProject---KiWo/unterschriften";

      await ExcelGenerator.generateExcelFile(
        allSubmissions,
        filePath,
        imagesFolder
      );

      res.json({ message: "Form submitted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

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
