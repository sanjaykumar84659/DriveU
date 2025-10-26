import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminviewrequestsComponent } from './adminviewrequests.component';

describe('AdminviewrequestsComponent', () => {
  let component: AdminviewrequestsComponent;
  let fixture: ComponentFixture<AdminviewrequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminviewrequestsComponent]
    });
    fixture = TestBed.createComponent(AdminviewrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
