package com.kiwobackend.service;

import com.kiwobackend.dao.SubmissionRepo;
import com.kiwobackend.entity.Submission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubmissionService {

    @Autowired
    private SubmissionRepo submissionRepo;

    public List<Submission> getAllSubmissions() {
        return submissionRepo.findAll();
    }
}