import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerviewfeedbackComponent } from './customerviewfeedback.component';

describe('CustomerviewfeedbackComponent', () => {
  let component: CustomerviewfeedbackComponent;
  let fixture: ComponentFixture<CustomerviewfeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerviewfeedbackComponent]
    });
    fixture = TestBed.createComponent(CustomerviewfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
