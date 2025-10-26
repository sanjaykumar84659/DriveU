import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerviewdriverComponent } from './customerviewdriver.component';

describe('CustomerviewdriverComponent', () => {
  let component: CustomerviewdriverComponent;
  let fixture: ComponentFixture<CustomerviewdriverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerviewdriverComponent]
    });
    fixture = TestBed.createComponent(CustomerviewdriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
