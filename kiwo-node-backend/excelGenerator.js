const ExcelJS = require("exceljs");
const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");

async function processSubmissions(submissions, columnIndex, workbook, sheet) {
  for (const submission of submissions) {
    const dataRow = sheet.addRow([
      submission.id,
      submission.betreff,
      submission.vorname,
      submission.nachname,
      submission.geburtsdatum,
      submission.klasse,
      submission.anschrift,
      submission.wohnort,
      submission.email,
      submission.telefon,
      submission.nachricht,
      getSelectedDays(submission),
      submission.fahrdienst,
      submission.zvieri,
      submission.fotoserlaubnis,
      submission.verbindlich,
      "", //placeholder for img
    ]);
    if (submission.signatureImage) {
      try {
        console.log("Adding image to Excel...");

        addImageToCell(
          dataRow,
          submission.signatureImage,
          columnIndex,
          workbook,
          sheet
        );
      } catch (error) {
        console.error("Error adding image to Excel:", error);
      }
    } else {
      console.log("Invalid image data for submission:", submission.id);
    }
  }
}

async function generateExcelFile(submissions, filePath, imagesFolder) {
  const columnIndex = 17;
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Anmeldungen");
  const imagePaths = [];
  for (const submission of submissions) {
    if (submission.signatureImage) {
      const imageName = `signature_${submission.id}.png`;
      const imagePath = path.join(imagesFolder, imageName);

      try {
        const base64ImageData = Buffer.from(
          submission.signatureImage,
          "base64"
        ).toString("base64");
        const imageBuffer = Buffer.from(base64ImageData, "base64");
        console.log(imageBuffer);
        await fs.writeFile(imagePath, imageBuffer);
        imagePaths.push(imagePath);
      } catch (error) {
        console.error("Error saving image:", error);
      }
    }
  }

  addTimeStamp(sheet, "Last Updated: " + getCurrentTimestamp());

  // Create headers
  const headerRow = sheet.addRow([
    "Anmeldung-Nr",
    "Betreff",
    "Vorname",
    "Nachname",
    "Geburtsdatum",
    "Klasse",
    "Anschrift",
    "Wohnort",
    "Email",
    "Telefon",
    "Nachricht",
    "An folgenden Tagen kann ich helfen:",
    "Fahrdienst",
    "Zvieri",
    "Veroeffentlichung des Fotos",
    "Verbindlich angemeldet",
    "Unterschrift",
  ]);

  headerRow.eachCell((cell) => {
    cell.font = { bold: true };
  });

  await processSubmissions(submissions, columnIndex, workbook, sheet);

  for (let i = 1; i <= headerRow.cellCount; i++) {
    sheet.getColumn(i).width = 15; // Adjust column width
  }
  for (let i = 0; i < imagePaths.length; i++) {
    const imgPath = imagePaths[i];
    const dataRow = sheet.getRow(i + 2); // +2 because of header row
    addImageToCell(dataRow, imgPath, columnIndex, workbook);
  }
  // Write the workbook to the file
  try {
    await workbook.xlsx.writeFile(filePath);
    console.log("Excel file generated successfully.");
  } catch (error) {
    console.error("Error generating Excel file:", error);
  }
}

function addImageToCell(row, imageBuffer, columnIndex, workbook, sheet) {
  const image = workbook.addImage({
    buffer: imageBuffer,
    extension: "png",
  });

  const cell = row.getCell(columnIndex);
  cell.alignment = { vertical: "middle", horizontal: "center" };
  cell.value = {
    richText: [
      {
        text: "Unterschrift",
        font: { size: 12, bold: true },
      },
    ],
    hyperlink: "placeholder",
    hyperlinkTooltip: "Click to view image",
  };
  workbook.addImage(image, {
    tl: { col: columnIndex, row: row.number },
    br: { col: columnIndex + 1, row: row.number + 1 },
    editAs: "oneCell",
  });
}

function getSelectedDays(submission) {
  const selectedDays = [];

  if (submission.montag) {
    selectedDays.push("Montag");
  }
  if (submission.dienstag) {
    selectedDays.push("Dienstag");
  }
  if (submission.mittwoch) {
    selectedDays.push("Mittwoch");
  }
  if (submission.donnerstag) {
    selectedDays.push("Donnerstag");
  }
  if (submission.freitag) {
    selectedDays.push("Freitag");
  }

  return selectedDays.join(", ");
}

function addTimeStamp(sheet, text) {
  const footer = sheet.addRow([text]);
}

function getCurrentTimestamp() {
  return new Date().toISOString();
}

module.exports = {
  generateExcelFile,
};
