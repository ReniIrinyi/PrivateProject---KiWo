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

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Anmeldungen");

        addTimeStamp(sheet, "Last Updated: " + getCurrentTimestamp());

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


            dataRow.setHeight((short) -1);
            float existingHeight = dataRow.getHeightInPoints();
            float newHeight = existingHeight * 2; // Double the height
            dataRow.setHeightInPoints(newHeight);
            Cell headerCell = headerRow.createCell(16);
            headerCell.setCellValue("Unterschrift"+" ".repeat(15));
            addImageToCell(sheet, dataRow, submission.getSignatureImage(), 16);

        }
        for (int i = 0; i < headerRow.getLastCellNum(); i++) {
            sheet.autoSizeColumn(i);
        }


        // Write the workbook to the file
        try (FileOutputStream fileOut = new FileOutputStream(filePath)) {
            workbook.write(fileOut);
        }

        workbook.close();
    }

    private static void addImageToCell(Sheet sheet, Row row, byte[] imageBytes, int columnIndex) {
        Drawing<?> drawing = row.getSheet().createDrawingPatriarch();
        CreationHelper helper = row.getSheet().getWorkbook().getCreationHelper();

        ClientAnchor anchor = helper.createClientAnchor();
        anchor.setCol1(columnIndex);
        anchor.setRow1(row.getRowNum());

        int pictureIndex = row.getSheet().getWorkbook().addPicture(imageBytes, Workbook.PICTURE_TYPE_PNG);
        Picture picture = drawing.createPicture(anchor, pictureIndex);

        int imageWidth = (int) picture.getImageDimension().getWidth();
        int imageHeight = (int) picture.getImageDimension().getHeight();

        double cellWidth = sheet.getColumnWidthInPixels(columnIndex);
        double cellHeight = row.getHeightInPoints();

        double widthScaleFactor = cellWidth / imageWidth;
        double heightScaleFactor = cellHeight / imageHeight;
        double scaleFactor = Math.min(widthScaleFactor, heightScaleFactor);

        picture.resize(.8,scaleFactor);
        // Move the top-left corner of the image within the cell
        anchor.setDx1(0);
        anchor.setDy1(0);
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
    private static void addTimeStamp(Sheet sheet, String text) {
        Row footer = sheet.createRow(0);
        footer.createCell(0).setCellValue(text);
    }
    private static String getCurrentTimestamp() {
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
    }
}
