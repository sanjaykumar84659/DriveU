import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Driver } from 'src/app/models/driver.model';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { DriverService } from 'src/app/services/driver.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-customer-view-feedback',
  templateUrl: './customerviewfeedback.component.html',
  styleUrls: ['./customerviewfeedback.component.css']
})
export class CustomerviewfeedbackComponent implements OnInit {
  feedbackList: Feedback[] = [];
  selectedDriver: Driver | null = null;
  showDriverPopup = false;
  showDeleteConfirm = false;
  feedbackToDelete: number | null = null;
  userId: number | null = null;

  constructor(
    private readonly feedbackService: FeedbackService,
    private readonly driverService: DriverService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.authService.userId$.subscribe(id => {
      this.userId = id;
      if (id !== null) {
        this.loadFeedbacks(id);
      }
    });
  }

  loadFeedbacks(userId: number): void {
    this.feedbackService.getAllFeedbacksByUserId(userId).subscribe(feedbacks => {
      this.feedbackList = feedbacks;
    });
  }

  viewDriverInfo(driverId?: number): void {
    if(!driverId) return;
    this.driverService.getDriverById(driverId).subscribe(driver => {
      this.selectedDriver = driver;
      this.showDriverPopup = true;
    });
  }

  closeDriverPopup(): void {
    this.showDriverPopup = false;
    this.selectedDriver = null;
  }

  confirmDelete(feedbackId: number): void {

    this.feedbackToDelete = feedbackId;
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.feedbackToDelete = null;
    this.showDeleteConfirm = false;
  }

  deleteFeedback(): void {
    if (this.feedbackToDelete !== null) {
      this.feedbackService.deleteFeedback(this.feedbackToDelete).subscribe(() => {
        this.feedbackList = this.feedbackList.filter(f => f.feedbackId !== this.feedbackToDelete);
        this.feedbackToDelete = null;
        this.showDeleteConfirm = false;
      });
    }
  }

}