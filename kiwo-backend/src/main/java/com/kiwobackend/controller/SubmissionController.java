package com.kiwobackend.controller;

import com.kiwobackend.dao.SubmissionRepo;
import com.kiwobackend.entity.Submission;
import com.kiwobackend.service.EmailService;
import com.kiwobackend.util.ExcelGenerator;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SubmissionController {
    private ExcelGenerator ExcelGenerator;
    @Autowired
    private SubmissionRepo submissionRepo;
    @Autowired
    private EmailService emailService;

  @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/submit")
    public ResponseEntity<String> submitForm(
            @ModelAttribute("submission") Submission submission) throws MessagingException, IOException {

        MultipartFile signatureImage = submission.getSignatureImageFile();
        if (signatureImage != null && !signatureImage.isEmpty()) {
            byte[] signatureImageBytes = signatureImage.getBytes();
            submission.setSignatureImage(signatureImageBytes);
        }

        submissionRepo.save(submission);

        List<Submission> allSubmissions = submissionRepo.findAll();
       // emailService.sendEmailWithSubmissionData(allSubmissions);
        String filePath = "/Users/renatairinyi/Documents/GitHub/PrivateProject---KiWo/submissions.xlsx";
        ExcelGenerator.generateExcelFile(allSubmissions, filePath);

        String responseMessage = "Form submitted successfully.";
        return ResponseEntity.ok("{\"message\": \"" + responseMessage + "\"}");
    }
}




  /*  @PostMapping("/submit")
    public ResponseEntity<String> submitForm(@RequestParam("signatureImage") MultipartFile signatureImage,
                                             @ModelAttribute("submission") Submission submission) throws MessagingException, IOException {
       if (signatureImage.isEmpty()) {
           return ResponseEntity.badRequest().body("Signature image is required.");
        }
        // Convert MultipartFile to byte array
        byte[] signatureImageBytes = signatureImage.getBytes();
        submission.setSignatureImage(signatureImageBytes);
        // Save the form data to the database
        submissionRepo.save(submission);

        // Send email with submission data
        List<Submission> allSubmissions = submissionRepo.findAll();
        emailService.sendEmailWithSubmissionData(allSubmissions);

        String responseMessage = "Form submitted successfully.";
        return ResponseEntity.ok("{\"message\": \"" + responseMessage + "\"}");
    }
    */