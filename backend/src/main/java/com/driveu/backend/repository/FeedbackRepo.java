package com.driveu.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.driveu.backend.model.Feedback;


@Repository
public interface FeedbackRepo extends JpaRepository<Feedback,Long>{

     // Custom method to find feedbacks by user ID
     List<Feedback> findByUserUserId(Long userId);

}