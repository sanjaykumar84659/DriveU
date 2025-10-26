package com.driveu.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.driveu.backend.model.Feedback;
import com.driveu.backend.repository.FeedbackRepo;


@Service
public class FeedbackServiceImpl implements FeedbackService{

    @Autowired
    private FeedbackRepo feedbackRepository;


    // Create a new feedback entry
    @Override
    public Feedback createFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
        
    }

    // Retrieve feedback by ID
    @Override
    public Feedback getFeedbackById(Long feedbackId) {
        return feedbackRepository.findById(feedbackId).orElse(null);
    }

    // Retrieve all feedbacks
    @Override
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    // Delete feedback by ID
    @Override
    public Feedback deleteFeedback(Long feedbackId) {
        Feedback feedback = getFeedbackById(feedbackId);
        if (feedback != null) {
            feedbackRepository.deleteById(feedbackId);
        }
        return feedback;
    }

    // Retrieve feedbacks by user ID
    @Override
    public List<Feedback> getFeedbacksByUserId(Long userId) {
        return feedbackRepository.findByUserUserId(userId);
    }
}
