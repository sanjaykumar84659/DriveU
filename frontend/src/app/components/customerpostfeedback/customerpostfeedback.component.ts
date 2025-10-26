import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-customerpostfeedback',
  templateUrl: './customerpostfeedback.component.html',
  styleUrls: ['./customerpostfeedback.component.css']
})

export class CustomerpostfeedbackComponent implements OnInit {
  feedbackText: string = '';
  category: string = '';
  rating: number | null = null;
  submitted: boolean = false;
  errorMessage: string = '';
  driverId:number | null = null;

  constructor(private readonly feedbackService: FeedbackService,private readonly router:Router,private readonly route:ActivatedRoute) {}
  ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.driverId = +params['driverId'] || null;
  });

  }

submitFeedback(): void {
  if (!this.feedbackText || !this.category || !this.rating) {
    this.errorMessage = 'All fields are required.';
    return;
  }

  const feedback: Feedback = {
    feedbackText: this.feedbackText,
    category: this.category,
    rating: this.rating,
    date: new Date(),
    user: {
      userId: Number(localStorage.getItem('user_id') || 0)
    },
    driver: this.driverId ? { driverId: this.driverId } : undefined  };

  this.feedbackService.sendFeedback(feedback).subscribe({
    next: () => {
      this.submitted = true;
      this.errorMessage = '';
      this.feedbackText = '';
      this.category = '';
      this.rating = null;

      setTimeout(() => {
        this.router.navigate(['/customer/feedback']);
      }, 2000);
    },
    error: () => {
      this.errorMessage = 'Failed to submit feedback. Please try again.';
    }
  });
}


  skip(): void {
    this.router.navigate(['/customer/feedback']);
  }
}