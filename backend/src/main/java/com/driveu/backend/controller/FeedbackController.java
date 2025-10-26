package com.driveu.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.driveu.backend.model.Feedback;
import com.driveu.backend.service.FeedbackService;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback) {
    try {
        Feedback savedFeedback = feedbackService.createFeedback(feedback);
        return ResponseEntity.status(201).body(savedFeedback);
    } catch (Exception e) {
        return ResponseEntity.status(400).build();
    }
}


    @GetMapping("/{feedbackId}")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long feedbackId) {
        Feedback feedback = feedbackService.getFeedbackById(feedbackId);
        if (feedback != null) {
            return ResponseEntity.ok(feedback);
        } else {
            return ResponseEntity.noContent().build();
        }
    }


    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
        List<Feedback> feedbackList = feedbackService.getAllFeedbacks();
        return ResponseEntity.ok(feedbackList);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Feedback>> getFeedbacksByUserId(@PathVariable Long userId) {
        List<Feedback> feedbackList = feedbackService.getFeedbacksByUserId(userId);
        return ResponseEntity.ok(feedbackList);
    }

    @DeleteMapping("/{feedbackId}")
    public ResponseEntity<Feedback> deleteFeedback(@PathVariable Long feedbackId) {
        Feedback deletedFeedback = feedbackService.deleteFeedback(feedbackId);
        if (deletedFeedback != null) {
            return ResponseEntity.ok(deletedFeedback);
        } else {
            return ResponseEntity.status(404).build();
        }
    }
}
