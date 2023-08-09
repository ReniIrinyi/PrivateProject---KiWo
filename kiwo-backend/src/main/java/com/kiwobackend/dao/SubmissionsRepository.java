package com.kiwobackend.dao;

import com.kiwobackend.entity.Submissions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
@Repository
public interface SubmissionsRepository extends JpaRepository<Submissions, Long> {
}
