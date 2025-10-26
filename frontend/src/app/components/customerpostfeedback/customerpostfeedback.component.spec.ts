import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerpostfeedbackComponent } from './customerpostfeedback.component';

describe('CustomerpostfeedbackComponent', () => {
  let component: CustomerpostfeedbackComponent;
  let fixture: ComponentFixture<CustomerpostfeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerpostfeedbackComponent]
    });
    fixture = TestBed.createComponent(CustomerpostfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
