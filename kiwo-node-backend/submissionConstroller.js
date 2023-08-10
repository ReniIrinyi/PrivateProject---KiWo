const express = require("express");
const router = express.Router();
const db = require("./db"); // Import your MySQL database connection
const ExcelGenerator = require("./excelGenerator");

router.post("/submit", async (req, res) => {
  try {
    const submissionData = req.body;
    // Assuming you have a SQL query for inserting data
    const insertQuery = `
      INSERT INTO form_submission (
        betreff, vorname, nachname, geburtsdatum, klasse, anschrift,
        wohnort, email, telefon, nachricht, montag, dienstag,
        mittwoch, donnerstag, freitag, fahrdienst, zvieri,
        fotoserlaubnis, verbindlich, signatureImage
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      submissionData.betreff,
      submissionData.vorname,
      submissionData.nachname,
      submissionData.geburtsdatum,
      submissionData.klasse,
      submissionData.anschrift,
      submissionData.wohnort,
      submissionData.email,
      submissionData.telefon,
      submissionData.nachricht,
      submissionData.montag,
      submissionData.dienstag,
      submissionData.mittwoch,
      submissionData.donnerstag,
      submissionData.freitag,
      submissionData.fahrdienst,
      submissionData.zvieri,
      submissionData.fotoserlaubnis,
      submissionData.verbindlich,
      submissionData.signatureImage,
    ];
    db.query(insertQuery, values, async (err, result) => {
      if (err) {
        console.log(submissionData);
        console.error("Error inserting data:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

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
});

// Implement a function to retrieve all submissions from the database
async function retrieveAllSubmissions() {
  return new Promise((resolve, reject) => {
    // Replace with your SQL query to retrieve all submissions
    const selectQuery = "SELECT * FROM form_submission";
    db.query(selectQuery, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
}

module.exports = router;
