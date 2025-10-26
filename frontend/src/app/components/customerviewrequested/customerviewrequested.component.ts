import { Component, OnInit } from '@angular/core';
import { DriverRequestService } from '../../services/driver-request.service';
import { AuthService } from '../../services/auth.service';
import { DriverRequest } from '../../models/driver-request.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-view-request',
  templateUrl: './customerviewrequested.component.html',
  styleUrls: ['./customerviewrequested.component.css']
})
export class CustomerviewrequestedComponent implements OnInit {
  requests: DriverRequest[] = [];
  userId: number | null = null;
  errorMessage: string = '';
  searchTerm: string = '';

  showPaymentPopup = false;
  selectedRequest: DriverRequest | null = null;

  constructor(
    private readonly driverRequestService: DriverRequestService,
    private readonly authService: AuthService,
    private readonly router:Router
  ) {}

  ngOnInit(): void {
    this.authService.userId$.subscribe({
      next: (id) => {
        this.userId = id;
        if (this.userId !== null) {
          this.loadRequests();
        }
      },
      error: () => {
        this.errorMessage = 'Failed to get user ID.';
      }
    });
  }

  loadRequests(): void {
    this.driverRequestService.getDriverRequestsByUserId(this.userId!).subscribe({
      next: (data) => {
        this.requests = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load requests.';
      }
    });
  }
  
editRequest(requestId: number): void {
  this.router.navigate(['/customer/customerrequest', requestId]);
}

deleteRequest(requestId: number): void {
  if (confirm('Are you sure you want to delete this request?')) {
    this.driverRequestService.deleteDriverRequest(requestId).subscribe({
      next: () => {
        this.requests = this.requests.filter(r => r.driverRequestId !== requestId);
      },
      error: () => {
        this.errorMessage = 'Failed to delete request.';
      }
    });
  }
}



  filteredRequests(): DriverRequest[] {
    return this.requests.filter(request =>
      request.pickupLocation?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      request.dropLocation?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  endTrip(request: DriverRequest): void {
  const updatedRequest = { ...request, status: 'Trip End' };

  this.driverRequestService.updateDriverRequest(request.driverRequestId!, updatedRequest).subscribe({
    next: () => {
      alert('Trip ended successfully!');
      this.loadRequests();
    },
    error: (err) => {
      console.error('Trip end error:', err);
      alert('Failed to end trip.');
    }
  });
}

  

  feedBack(request: DriverRequest): void {
    this.selectedRequest = request;
    this.showPaymentPopup = true;
  }

  closePopup(): void {
    this.showPaymentPopup = false;
    this.selectedRequest = null;
  }

  writeReview(request: DriverRequest): void {
    this.router.navigate(['/customer/postfeedback'], {
      queryParams: { 
        requestId: request.driverRequestId,
        driverId: request.driver!.driverId
      }
    });
  }
}