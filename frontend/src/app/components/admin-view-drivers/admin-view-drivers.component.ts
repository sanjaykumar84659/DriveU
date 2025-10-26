import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/driver.model';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-admin-view-drivers',
  templateUrl: './admin-view-drivers.component.html',
  styleUrls: ['./admin-view-drivers.component.css']
})
export class AdminViewDriversComponent implements OnInit {
  drivers: Driver[] = [];
  filteredDrivers: Driver[] = [];
  searchTerm: string = '';
  statusFilter: string = '';
  editDriverId: number | null = null;

  constructor(private readonly driverService: DriverService) {}

  ngOnInit(): void {
    this.loadDrivers();
  }

  showStatus: boolean = false;
selectedDriver: Driver | null = null;

toggleStatusDropdown(driver: Driver): void {
  if (this.selectedDriver?.driverId === driver.driverId) {
    this.showStatus = !this.showStatus;
  } else {
    this.selectedDriver = driver;
    this.showStatus = true;
  }
}

changeStatus(driver: Driver): void {
  if (driver.driverId) {
    this.driverService.updateDriver(driver.driverId, driver).subscribe(() => {
      this.showStatus = false;
      this.selectedDriver = null;
      this.loadDrivers(); // Refresh list
    });
  }
}
  loadDrivers(): void {
    this.driverService.getAllDrivers().subscribe((data) => {
      this.drivers = data;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredDrivers = this.drivers.filter(driver => {
      const matchesSearch = driver.driverName.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.statusFilter
        ? driver.availabilityStatus.toLowerCase().replace(/\s+/g, '-') === this.statusFilter
        : true;
      return matchesSearch && matchesStatus;
    });
  }
  
  startEdit(driver: Driver): void {
    this.editDriverId = driver.driverId ?? null;
  }

  cancelEdit(): void {
    this.editDriverId = null;
  }

  saveEdit(driver: Driver): void {
    if (driver.driverId) {
      this.driverService.updateDriver(driver.driverId, driver).subscribe(() => {
        this.editDriverId = null;
        this.loadDrivers();
      });
    }
  }

  confirmDelete(driverId: number): void {
    if (confirm('Are you sure you want to delete this driver?')) {
      this.driverService.deleteDriver(driverId).subscribe(() => {
        this.loadDrivers();
      });
    }
  }
}