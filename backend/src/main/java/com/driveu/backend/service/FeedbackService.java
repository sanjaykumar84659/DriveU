package com.driveu.backend.service;


import java.util.List;

import com.driveu.backend.model.Feedback;


public interface FeedbackService {

      Feedback createFeedback(Feedback feedback);

      Feedback getFeedbackById(Long feedbackId);
  
      List<Feedback> getAllFeedbacks();

      Feedback deleteFeedback(Long feedbackId);
 
      List<Feedback> getFeedbacksByUserId(Long userId);

}
