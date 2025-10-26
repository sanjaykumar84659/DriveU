import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerviewrequestedComponent } from './customerviewrequested.component';

describe('CustomerviewrequestedComponent', () => {
  let component: CustomerviewrequestedComponent;
  let fixture: ComponentFixture<CustomerviewrequestedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerviewrequestedComponent]
    });
    fixture = TestBed.createComponent(CustomerviewrequestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
