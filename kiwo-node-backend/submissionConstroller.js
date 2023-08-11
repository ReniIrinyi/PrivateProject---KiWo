const express = require("express");
const db = require("./db"); // Import your MySQL database connection
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
      console.log(imageBuffer);
      console.log("submissionsData: " + submissionData.betreff);

      //Validate form-data
      const birthdate = submissionData.geburtsdatum
        ? new Date(submissionData.geburtsdatum)
        : null;
      const formattedBirthdate = birthdate
        ? birthdate.toISOString().slice(0, 10)
        : null;

      const insertQuery = `
      INSERT INTO form_submissions (
        betreff, vorname, nachname, geburtsdatum, klasse, anschrift,
        wohnort, email, telefon, nachricht, montag, dienstag,
        mittwoch, donnerstag, freitag, fahrdienst, zvieri,
        fotoserlaubnis, verbindlich, signatureImage, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
      const values = [
        submissionData.betreff,
        submissionData.vorname,
        submissionData.nachname,
        formattedBirthdate || null,
        submissionData.klasse,
        submissionData.anschrift,
        submissionData.wohnort,
        submissionData.email,
        submissionData.telefon,
        submissionData.nachricht,
        submissionData.montag ? 1 : 0,
        submissionData.dienstag ? 1 : 0,
        submissionData.mittwoch ? 1 : 0,
        submissionData.donnerstag ? 1 : 0,
        submissionData.freitag ? 1 : 0,
        submissionData.fahrdienst ? 1 : 0,
        submissionData.zvieri ? 1 : 0,
        submissionData.fotoserlaubnis ? 1 : 0,
        submissionData.verbindlich ? 1 : 0,
        imageBuffer,
        new Date(), // createdAt value
        new Date(), // updatedAt value
      ];

      db.query(insertQuery, values, async (err, result) => {
        console.log(submissionData);
        console.log(imageBuffer);
        if (err) {
          console.error("Error inserting data:", err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        // Create a new Submission record
        await Submission.create({
          ...submissionData,
          signatureImage: imageBuffer,
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
      });
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
