import { Component, OnInit } from '@angular/core';
import { DriverRequest } from 'src/app/models/driver-request.model';
import { DriverRequestService } from 'src/app/services/driver-request.service';
import { DriverService } from 'src/app/services/driver.service';
import { Driver } from 'src/app/models/driver.model';

// Canonical stages for progression
type CanonicalStage = 'Pending' | 'Approved' | 'Trip End' | 'Closed';
// With Rejected included for normalization/guarding logic
type StageWithRejected = CanonicalStage | 'Rejected';

@Component({
  selector: 'app-adminviewrequests',
  templateUrl: './adminviewrequests.component.html',
  styleUrls: ['./adminviewrequests.component.css']
})
export class AdminviewrequestsComponent implements OnInit {
  // Data & UI state
  requests: DriverRequest[] = [];
  filteredRequests: DriverRequest[] = [];

  searchTerm: string = '';       
  statusFilter: string = '';     

  selectedRequest: DriverRequest | null = null;
  selectedDriver: Driver | null = null;

  showDriverModal: boolean = false;
  showStageModal: boolean = false;

  // Optional UX for Driver modal
  driverLoading: boolean = false;
  driverError: string = '';

  // Stage order
  readonly STAGES: CanonicalStage[] = ['Pending', 'Approved', 'Trip End', 'Closed'];

  constructor(
    private readonly requestService: DriverRequestService,
    private readonly driverService: DriverService
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  // ------------ Data loading & filtering ------------

  loadRequests(): void {
    this.requestService.getAllDriverRequests().subscribe((data) => {
      this.requests = data ?? [];
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const term = this.searchTerm.trim();
    const statusFilterNorm = this.statusFilter ? this.normalizeStatus(this.statusFilter) : '';

    this.filteredRequests = this.requests.filter((req) => {
      // Search by Driver ID (nested safe)
      const driverId = this.getDriverId(req);
      const matchesSearch = term ? String(driverId ?? '').includes(term) : true;

      // Filter by status (normalized; case/space-insensitive)
      const matchesStatus = statusFilterNorm
        ? this.normalizeStatus(req.status) === statusFilterNorm
        : true;

      return matchesSearch && matchesStatus;
    });
  }

  // ------------ Driver Modal ------------

  showDriverDetails(request: DriverRequest): void {
    // Open the modal immediately for feedback
    this.showDriverModal = true;
    this.selectedDriver = null;
    this.driverLoading = true;
    this.driverError = '';

    // Your data sample shows driver is nested at request.driver.driverId
    const id = this.getDriverId(request);

    if (!id) {
      // No driver assigned yet—show a friendly message
      console.warn('No driverId found on the request:', request);
      this.driverLoading = false;
      this.driverError = 'No driver assigned to this request yet.';
      return;
    }

    const driverId = +id;
    this.driverService.getDriverById(driverId).subscribe({
      next: (driver) => {
        this.selectedDriver = driver;
        this.driverLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch driver', err);
        this.selectedDriver = null;
        this.driverLoading = false;
        this.driverError = 'Could not load driver details. Please try again.';
      }
    });
  }

  closeDriverModal(): void {
    this.showDriverModal = false;
    this.selectedDriver = null;
    this.driverLoading = false;
    this.driverError = '';
  }

  // ------------ Stage Modal ------------

  showStage(request: DriverRequest): void {
    // Clone & normalize status to avoid template brittleness
    const norm = this.normalizeStatus(request.status);
    this.selectedRequest = { ...request, status: norm } as DriverRequest;
    this.showStageModal = true;
  }

  closeStageModal(): void {
    this.showStageModal = false;
    this.selectedRequest = null;
  }

  // Helpers for Stage UI (active/done/disabled)
  private normalizeStatus(s: string | null | undefined): StageWithRejected {
    const v = (s || '').trim().toLowerCase();
    if (v === 'pending') return 'Pending';
    if (v === 'approved') return 'Approved';
    if (v === 'trip end' || v === 'trip_end' || v === 'tripend') return 'Trip End';
    if (v === 'closed' || v === 'close') return 'Closed';
    if (v === 'rejected') return 'Rejected';
    return 'Pending';
  }

  private rank(stage: CanonicalStage): number {
    return this.STAGES.indexOf(stage);
  }

  get currentStage(): CanonicalStage {
    const raw = this.normalizeStatus(this.selectedRequest?.status);
    // If rejected, keep visuals at Pending and disable actions
    let stage: string = raw;
    if (raw === 'Rejected') {
      stage = 'Pending';
    }
    return stage as CanonicalStage;

  }

  get currentStageIndex(): number {
    return this.rank(this.currentStage);
  }

  isStageActive(stage: CanonicalStage): boolean {
    return this.currentStage === stage;
  }

  isStageDone(stage: CanonicalStage): boolean {
    return this.currentStageIndex >= this.rank(stage);
  }

  isStageDoneByIndex(targetIndex: number): boolean {
    return this.currentStageIndex >= targetIndex;
  }

  canClick(stage: CanonicalStage): boolean {
    if (!this.selectedRequest) return false;
    const raw = this.normalizeStatus(this.selectedRequest.status);
    if (raw === 'Rejected' || raw === 'Closed') return false;

    const target = this.rank(stage);
    const curr = this.currentStageIndex;

    // Allow no-op (current) and the immediate next forward step only
    return target === curr || target === curr + 1;
  }

  setStage(stage: CanonicalStage): void {
    if (!this.selectedRequest) return;

    const curr = this.currentStageIndex;
    const target = this.rank(stage);

    // Prevent backward moves or skipping multiple steps
    if (target < curr || target > curr + 1) return;

    // Prevent changes from final or rejected
    const raw = this.normalizeStatus(this.selectedRequest.status);
    if (raw === 'Closed' || raw === 'Rejected') return;

    // No change?
    if (this.selectedRequest.status === stage) return;

    const updated: DriverRequest = { ...this.selectedRequest, status: stage };
    this.requestService.updateDriverRequest(updated.driverRequestId!, updated).subscribe({
      next: () => {
        this.selectedRequest = updated; // keep modal in sync
        this.loadRequests();            // refresh table
      },
      error: (err) => {
        console.error('Failed to update stage', err);
        // Optionally surface a toast/snackbar
      }
    });
  }

  // ------------ Table actions (kept in sync with Stage modal) ------------

  approveRequest(request: DriverRequest): void {
    const updated = { ...request, status: 'Approved' as const };
    this.requestService.updateDriverRequest(request.driverRequestId!, updated).subscribe(() => {
      this.patchSelectedIfSame(updated);
      this.loadRequests();
    });
  }

  rejectRequest(request: DriverRequest): void {
    const updated = { ...request, status: 'Rejected' as const };
    this.requestService.updateDriverRequest(request.driverRequestId!, updated).subscribe(() => {
      this.patchSelectedIfSame(updated);
      this.loadRequests();
    });
  }

  closeRequest(request: DriverRequest): void {
    const updated = { ...request, status: 'Closed' as const };
    this.requestService.updateDriverRequest(request.driverRequestId!, updated).subscribe(() => {
      this.patchSelectedIfSame(updated);
      this.loadRequests();
    });
  }

  private patchSelectedIfSame(updated: DriverRequest) {
    if (this.selectedRequest && this.selectedRequest.driverRequestId === updated.driverRequestId) {
      this.selectedRequest = { ...this.selectedRequest, status: this.normalizeStatus(updated.status) } as DriverRequest;
    }
  }

  private getDriverId(req: any): number | null {
    const candidates = [
      req?.driverId,                    
      req?.assignedDriverId,
      req?.driver?.driverId,            
      req?.driver?.id,
      req?.assignedDriver?.driverId,
      req?.assignedDriver?.id
    ];
    const found = candidates.find(v => v !== undefined && v !== null && v !== '');
    return found !== undefined ? +found : null;
  }
}