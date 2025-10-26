import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../services/driver.service';
import { DriverRequestService } from '../../services/driver-request.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Driver } from '../../models/driver.model';

@Component({
  selector: 'app-customerviewdriver',
  templateUrl: './customerviewdriver.component.html',
  styleUrls: ['./customerviewdriver.component.css']
})
export class CustomerviewdriverComponent implements OnInit {
  drivers: Driver[] = [];
  requestedDriverIds: number[] = [];
  userId: number | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private readonly driverService: DriverService,
    private readonly driverRequestService: DriverRequestService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.authService.userId$.subscribe(id => {
      this.userId = id;
      this.loadDrivers();
    });
  }

  loadDrivers(): void {
    this.driverService.getAllDrivers().subscribe({
      next: (data) => {
        this.drivers = data;
        this.checkRequestedDrivers();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load drivers.';
        this.isLoading = false;
      }
    });
  }

  checkRequestedDrivers(): void {
    if (this.userId !== null) {
      this.drivers.forEach(driver => {
        this.driverRequestService.checkDriverRequestExists(this.userId!, driver.driverId!).subscribe({
          next: (exists) => {
            if (exists) {
              this.requestedDriverIds.push(driver.driverId!);
            }
          },
          error: (err) => {
            console.error(`Error checking request for driver ${driver.driverId}:`, err);
          }
        });
      });
    }
  }

  isDriverRequested(driverId: number): boolean {
    return this.requestedDriverIds.includes(driverId);
  }

  canRequest(driver: Driver): boolean {
    return driver.availabilityStatus?.toLowerCase() === 'active' && !this.isDriverRequested(driver.driverId!);
  }

  requestDriver(driver: Driver): void {
    if (this.userId === null || !driver.driverId) return;

    this.driverRequestService.checkDriverRequestExists(this.userId, driver.driverId).subscribe({
      next: (exists) => {
        if (exists) {
          this.errorMessage = 'You have already requested this driver.';
          return;
        }

        this.router.navigate(['/customer/customerrequest'], {
          queryParams: { driverId: driver.driverId }
        });
      },
      error: (err) => {
        console.error('Error checking existing request:', err);
        this.errorMessage = 'Something went wrong. Please try again.';
      }
    });
  }
}