import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEftComponent } from './verify-eft.component';

describe('VerifyEftComponent', () => {
  let component: VerifyEftComponent;
  let fixture: ComponentFixture<VerifyEftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyEftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
