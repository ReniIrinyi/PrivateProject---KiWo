const ExcelJS = require("exceljs");
const fs = require("fs").promises;
const path = require("path");

async function processSubmissions(
  submissions,
  columnIndex,
  workbook,
  sheet,
  imagesFolder
) {
  const imagePaths = [];

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
      submission.verbindlich ? "Ja" : "Nein",
      "", // Placeholder for img
    ]);

    if (submission.signatureImage) {
      try {
        const imageName = `signature_${submission.id}.png`;
        const imagePath = path.join(imagesFolder, imageName);
        await fs.writeFile(imagePath, submission.signatureImage);
        imagePaths.push(imagePath);
        //BUG in addImageToCell
        addImageToCell(dataRow, imagePath, columnIndex, workbook, sheet);
      } catch (error) {
        console.error("Error saving image:", error);
      }
    }
  }
}

async function addImageToCell(
  dataRow,
  imagePath,
  columnIndex,
  workbook,
  sheet
) {
  try {
    const imageBuffer = await fs.readFile(imagePath);
    workbook.addImage({
      buffer: imageBuffer,
      extension: "png",
      tl: { col: columnIndex, row: dataRow.number },
      br: { col: columnIndex + 1, row: dataRow.number + 1 },
      editAs: "oneCell",
    });

    const cell = dataRow.getCell(columnIndex);
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.value = {
      richText: [
        {
          text: "Unterschrift",
          font: { size: 12, bold: true },
        },
      ],
      hyperlink: imagePath,
      hyperlinkTooltip: "Click to view image",
    };
  } catch (error) {
    console.error("Error adding image to cell:", error);
    return;
  }
}

function getCurrentTimestamp() {
  return new Date().toISOString();
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
  const footerRow = sheet.addRow([text]);
  const cell = footerRow.getCell(1);
  cell.alignment = { vertical: "middle", horizontal: "center" };
  cell.font = { italic: true };
}

async function generateExcelFile(submissions, filePath, imagesFolder) {
  const columnIndex = 17;
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Anmeldungen");

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

  headerRow.font = { bold: true };

  await processSubmissions(
    submissions,
    columnIndex,
    workbook,
    sheet,
    imagesFolder
  );

  for (let i = 1; i <= headerRow.cellCount; i++) {
    sheet.getColumn(i).width = 15; // Adjust column width
  }

  // Write the workbook to the file
  try {
    await workbook.xlsx.writeFile(filePath);

    console.log("Excel file generated successfully.");
  } catch (error) {
    console.error("Error generating Excel file:", error);
  }
}

module.exports = {
  generateExcelFile,
};
