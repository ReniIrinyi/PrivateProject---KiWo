package com.kiwobackend.util;

import com.kiwobackend.entity.Submission;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class ExcelGenerator {
    public static void generateExcelFile(List<Submission> submissions, String filePath) throws IOException {
        String timestamp = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());


        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Anmeldungen");

        // Create headers
        Row headerRow = sheet.createRow(0);
        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);

        headerRow.createCell(0).setCellValue("Anmeldung-Nr");
        headerRow.createCell(1).setCellValue("Betreff");
        headerRow.createCell(2).setCellValue("Vorname");
        headerRow.createCell(3).setCellValue("Nachname");
        headerRow.createCell(4).setCellValue("Geburtsdatum");
        headerRow.createCell(5).setCellValue("Klasse");
        headerRow.createCell(6).setCellValue("Anschrift");
        headerRow.createCell(7).setCellValue("Wohnort");
        headerRow.createCell(8).setCellValue("Email");
        headerRow.createCell(9).setCellValue("Telefon");
        headerRow.createCell(10).setCellValue("Nachricht");

        Cell daysHeaderCell = headerRow.createCell(11);
        daysHeaderCell.setCellValue("An folgenden Tagen kann ich helfen: ");
        CellStyle daysHeaderStyle = workbook.createCellStyle();
        Font daysHeaderFont = workbook.createFont();
        daysHeaderFont.setBold(true);
        daysHeaderStyle.setFont(daysHeaderFont);
        daysHeaderCell.setCellStyle(daysHeaderStyle);

        headerRow.createCell(12).setCellValue("Fahrdienst");
        headerRow.createCell(13).setCellValue("Zvieri");
        headerRow.createCell(14).setCellValue("Veroeffentlichung des Fotos");
        headerRow.createCell(15).setCellValue("Verbindlich angemeldet");
        headerRow.createCell(16).setCellValue("Unterschrift");

        addFooter(sheet, "Last Updated: " + getCurrentTimestamp());

        // Populate data
        for (int i = 0; i < submissions.size(); i++) {
            Submission submission = submissions.get(i);
            Row dataRow = sheet.createRow(i + 1);

            dataRow.createCell(0).setCellValue(submission.getId());
            dataRow.createCell(1).setCellValue(submission.getBetreff());
            dataRow.createCell(2).setCellValue(submission.getVorname());
            dataRow.createCell(3).setCellValue(submission.getNachname());
            dataRow.createCell(4).setCellValue(submission.getGeburtsdatum());
            dataRow.createCell(5).setCellValue(submission.getKlasse());
            dataRow.createCell(6).setCellValue(submission.getAnschrift());
            dataRow.createCell(7).setCellValue(submission.getWohnort());
            dataRow.createCell(8).setCellValue(submission.getEmail());
            dataRow.createCell(9).setCellValue(submission.getTelefon());
            dataRow.createCell(10).setCellValue(submission.getNachricht());
            dataRow.createCell(11).setCellValue(getSelectedDays(submission));
            dataRow.createCell(12).setCellValue(submission.getFahrdienst());
            dataRow.createCell(13).setCellValue(submission.getZvieri());
            dataRow.createCell(14).setCellValue(submission.getFotoserlaubnis());
            dataRow.createCell(15).setCellValue(submission.getVerbindlich());

            Cell headerCell = headerRow.createCell(16);
            headerCell.setCellValue("Unterschrift");
            addImageToCell(dataRow, submission.getSignatureImage(), 20);
        }

        // Write the workbook to the file
        try (FileOutputStream fileOut = new FileOutputStream(filePath)) {
            workbook.write(fileOut);
        }

        workbook.close();
    }

    private static void addImageToCell(Row row, byte[] imageBytes, int columnIndex) {
        Drawing<?> drawing = row.getSheet().createDrawingPatriarch();
        CreationHelper helper = row.getSheet().getWorkbook().getCreationHelper();

        ClientAnchor anchor = helper.createClientAnchor();
        anchor.setCol1(columnIndex);
        anchor.setRow1(row.getRowNum());

        Picture picture = drawing.createPicture(anchor, row.getSheet().getWorkbook().addPicture(imageBytes, Workbook.PICTURE_TYPE_PNG));
        picture.resize();
    }
    private static String getSelectedDays(Submission submission) {
        StringBuilder daysBuilder = new StringBuilder();
        if (submission.isMontag()) {
            daysBuilder.append("Montag, ");
        }
        if (submission.isDienstag()) {
            daysBuilder.append("Dienstag, ");
        }
        if (submission.isMittwoch()) {
            daysBuilder.append("Mittwoch, ");
        }
        if (submission.isDonnerstag()) {
            daysBuilder.append("Donnerstag, ");
        }
        if (submission.isFreitag()) {
            daysBuilder.append("Freitag, ");
        }
        if (!daysBuilder.isEmpty()) {
            daysBuilder.delete(daysBuilder.length() - 2, daysBuilder.length()); // Remove the last comma and space
        }
        return daysBuilder.toString();
    }
    private static void addFooter(Sheet sheet, String footerText) {
        Footer footer = sheet.getFooter();
        footer.setLeft(footerText);
        footer.setCenter("");
        footer.setRight("");
    }
    private static String getCurrentTimestamp() {
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
    }
}
