import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver } from 'src/app/models/driver.model';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-driver-management',
  templateUrl: './driver-management.component.html',
  styleUrls: ['./driver-management.component.css']
})
export class DriverManagementComponent implements OnInit {
  driverForm!: FormGroup;
  isEditMode = false;
  driverId!: number;
  imagePreview: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly driverService: DriverService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.driverForm = this.fb.group({
      driverName: ['', Validators.required],
      licenseNumber: ['', Validators.required],
      experienceYears: ['', [Validators.required, Validators.min(0)]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      vehicleType: ['', Validators.required],
      hourlyRate: ['', [Validators.required, Validators.min(0)]],
      address: ['', Validators.required],
      availabilityStatus: ['active', Validators.required],
      image: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.driverId = +id;
        this.loadDriverData(this.driverId);
      }
    });
  }

  loadDriverData(id: number): void {
    this.driverService.getDriverById(id).subscribe(driver => {
      this.driverForm.patchValue(driver);
      this.imagePreview = driver.image; // Optional: show existing image
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        this.imagePreview = base64String;
        this.driverForm.patchValue({ image: base64String });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.driverForm.invalid) {
      this.driverForm.markAllAsTouched();
      return;
    }

    const driverData: Driver = this.driverForm.value;

    if (this.isEditMode) {
      this.driverService.updateDriver(this.driverId, driverData).subscribe(() => {
        alert('Driver Updated Successfully!');
        this.router.navigate(['/admin/viewdriver']);
      });
    } else {
      this.driverService.addDriver(driverData).subscribe(() => {
        alert('Driver Added Successfully!');
        this.driverForm.reset();
        this.imagePreview = null;
        this.router.navigate(['/admin/viewdriver']);
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/admin/viewdriver']);
  }
}