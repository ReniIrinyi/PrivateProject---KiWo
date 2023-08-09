package com.kiwobackend.controller;

import com.kiwobackend.dao.SubmissionsRepository;
import com.kiwobackend.entity.Submissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
public class SubmissionsController {
    @Autowired
    private SubmissionsRepository submissionRepository;

    @PostMapping("/submit")
    public ResponseEntity<String> submitForm(@RequestBody Submissions submissions) {
        // Save the form data to the database
        submissionRepository.save(submissions);
        return ResponseEntity.ok("Form submitted successfully.");
    }
}
