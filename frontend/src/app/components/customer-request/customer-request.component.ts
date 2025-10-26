import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DriverRequestService } from '../../services/driver-request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DriverRequest } from '../../models/driver-request.model';

@Component({
  selector: 'app-customer-request',
  templateUrl: './customer-request.component.html',
  styleUrls: ['./customer-request.component.css']
})
export class CustomerRequestComponent implements OnInit {
  requestForm!: FormGroup;
  userId: number | null = null;
  driverId: number | null = null;
  successMessage: string = '';
  isEditMode: boolean = false;
  requestId: number | null = null;
  todayDate: string = ''; //check

  constructor(
    private readonly fb: FormBuilder,
    private readonly driverRequestService: DriverRequestService,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    
 const today = new Date();
 this.todayDate = today.toISOString().substring(0, 10); // Format: YYYY-MM-DD


    this.authService.userId$.subscribe(id => this.userId = id);
    this.driverId = Number(this.route.snapshot.queryParamMap.get('driverId'));
    this.requestId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.requestId;

    this.initForm();
    

    if (this.isEditMode && this.requestId) {
      this.loadRequestData(this.requestId);
    }
  }

  initForm(): void {
    this.requestForm = this.fb.group({
      pickupLocation: ['', Validators.required],
      dropLocation: ['', Validators.required],
      tripDate: ['', Validators.required],
      timeSlot: ['', Validators.required],
      estimatedDuration: ['', Validators.required],
      comments: ['']
    });
  }

  loadRequestData(id: number): void {
    this.driverRequestService.getDriverRequestById(id).subscribe({
      next: (data) => {
        this.requestForm.patchValue({
          pickupLocation: data.pickupLocation,
          dropLocation: data.dropLocation,
          tripDate: new Date(data.tripDate).toISOString().substring(0, 10),
          timeSlot: data.timeSlot?.substring(0, 5),
          estimatedDuration: data.estimatedDuration,
          comments: data.comments
        });
  
        // Extract IDs from nested objects
        this.driverId = data.driver?.driverId ?? null;
        this.userId = data.user?.userId ?? null;
  
        this.isEditMode = true;
      },
      error: () => {
        this.successMessage = 'Failed to load request data.';
      }
    });
  }

  submitRequest(): void {
    if (!this.userId || !this.driverId || this.requestForm.invalid) return;

    const request: DriverRequest = {
      userId: this.userId,
      driverId: this.driverId,
      requestDate: new Date(),
      status: 'Pending',
      tripDate: new Date(this.requestForm.value.tripDate),
      timeSlot: this.requestForm.value.timeSlot + ':00',
      pickupLocation: this.requestForm.value.pickupLocation,
      dropLocation: this.requestForm.value.dropLocation,
      estimatedDuration: this.requestForm.value.estimatedDuration,
      comments: this.requestForm.value.comments,
      paymentAmount: undefined,
      actualDropTime: undefined,
      actualDuration: undefined,
      actualDropDate: undefined
    };

    if (this.isEditMode && this.requestId) {
      this.driverRequestService.updateDriverRequest(this.requestId, request).subscribe({
        next: () => {
          this.successMessage = 'Request Updated Successfully!';
          this.router.navigate(['/customer/viewrequest']);
        },
        error: (err) => {
          console.error('Update error:', err);
          this.successMessage = 'Failed to update request.';
        }
      });
    } else {
      this.driverRequestService.addDriverRequest(request).subscribe({
        next: () => {
          this.successMessage = 'Request Submitted Successfully!';
          this.router.navigate(['/customer/viewrequest']);
        },
        error: (err) => {
          console.error('Submit error:', err);
          this.successMessage = 'Failed to submit request.';
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/customer/viewdriver']);
  }

  confirmPopup(): void {
    this.router.navigate(['/customer/viewrequest']);
  }

}