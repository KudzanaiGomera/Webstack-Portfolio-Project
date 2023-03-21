import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingEftComponent } from './booking-eft.component';

describe('BookingEftComponent', () => {
  let component: BookingEftComponent;
  let fixture: ComponentFixture<BookingEftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingEftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingEftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
