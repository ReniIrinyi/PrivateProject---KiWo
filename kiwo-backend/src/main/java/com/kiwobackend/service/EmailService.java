package com.kiwobackend.service;

import com.kiwobackend.entity.Submission;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.List;

@Service
public class EmailService {

    @Value("${email.from}")
    private String from;

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmailWithSubmissionData(List<Submission> submissions) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(from);
        helper.setTo("recipient@example.com");
        helper.setSubject("Form Submission Data");
        helper.setText(formatSubmissionData(submissions), true); // Set true for HTML content

        // Attach the image as an attachment
        for (Submission submission : submissions) {
            byte[] imageBytes = submission.getSignatureImage();
            InputStream imageStream = new ByteArrayInputStream(imageBytes);
            InputStreamResource inputStreamResource = new InputStreamResource(imageStream);

            helper.addAttachment("signature" + submission.getId() + ".png", inputStreamResource, "image/png");
        }

        mailSender.send(message);
    }

    private String formatSubmissionData(List<Submission> submissions) {
        // Format the submission data as needed for the email body
        StringBuilder sb = new StringBuilder();
        for (Submission submission : submissions) {
            sb.append("Neue Anmeldung");
            sb.append("Anmeldung-Nr: ").append(submission.getId()).append("<br>");
            sb.append("Betreff: ").append(submission.getBetreff()).append("<br>");
            sb.append("Vorname: ").append(submission.getVorname()).append("<br>");
            sb.append("Nachname: ").append(submission.getNachname()).append("<br>");
            sb.append("Geburtsdatum: ").append(submission.getGeburtsdatum()).append("<br>");
            sb.append("Klasse: ").append(submission.getKlasse()).append("<br>");
            sb.append("Anschrift: ").append(submission.getAnschrift()).append("<br>");
            sb.append("Wohnort: ").append(submission.getWohnort()).append("<br>");
            sb.append("Email: ").append(submission.getEmail()).append("<br>");
            sb.append("Telefon: ").append(submission.getTelefon()).append("<br>");
            sb.append("<hr>");
            sb.append("Nachricht: ").append(submission.getNachricht()).append("<br>");
            sb.append("<hr>");
            sb.append("Folgende Tage kann ich helfen: ");
            if (submission.isMontag()) {
                sb.append("Montag, ");
            }
            if (submission.isDienstag()) {
                sb.append("Dienstag, ");
            }
            if (submission.isMittwoch()) {
                sb.append("Mittwoch, ");
            }
            if (submission.isDonnerstag()) {
                sb.append("Donnerstag, ");
            }
            if (submission.isFreitag()) {
                sb.append("Freitag, ");
            }
            sb.delete(sb.length() - 2, sb.length()); // Remove the last comma and space
            sb.append("<br>");

            sb.append("<br><br>");
            sb.append("Fahrdienst: ");
            sb.append(submission.getFahrdienst().equals("Ja") ? "Ich möchte Fahrdienst, " : "Kein Fahrdienst, ");
            sb.append("Zvieri: ");
            sb.append(submission.getZvieri().equals("Ja") ? "Ich bringe etwas zum Zvieri mit." : "Kein Zvieri.");
            sb.append("<br>");
            sb.append("Veroeffentlichung des Fotos: ");
            sb.append(submission.getFotoserlaubnis().equals("Ja") ? "Ich bin mit der Veröffentlichung des Fotos einverstanden." : "Ich bin mit der Veröffentlichung der Fotos NICHT einverstanden.");
            sb.append("<br>");
            sb.append("Verbindlich angemeldet: ");
            sb.append(submission.getVerbindlich().equals("Ja") ? "Ich melde mich verbindlich an." : "Nicht verbindlich angemeldet.");
            sb.append("<br>");
            sb.append("<br><br>");
        }
        System.out.println(sb);
        return sb.toString();
    }

}
