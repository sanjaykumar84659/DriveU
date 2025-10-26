import { TestBed } from '@angular/core/testing';

import { DriverRequestService } from './driver-request.service';

describe('DriverRequestService', () => {
  let service: DriverRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
