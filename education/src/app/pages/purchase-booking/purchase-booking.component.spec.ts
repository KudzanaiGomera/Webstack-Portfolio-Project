import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseBookingComponent } from './purchase-booking.component';

describe('PurchaseBookingComponent', () => {
  let component: PurchaseBookingComponent;
  let fixture: ComponentFixture<PurchaseBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
