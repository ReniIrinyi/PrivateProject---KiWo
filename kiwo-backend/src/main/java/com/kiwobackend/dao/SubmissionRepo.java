package com.kiwobackend.dao;

import com.kiwobackend.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubmissionRepo extends JpaRepository<Submission, Long> {
}
