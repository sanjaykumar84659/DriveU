import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomernavComponent } from './customernav.component';

describe('CustomernavComponent', () => {
  let component: CustomernavComponent;
  let fixture: ComponentFixture<CustomernavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomernavComponent]
    });
    fixture = TestBed.createComponent(CustomernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
