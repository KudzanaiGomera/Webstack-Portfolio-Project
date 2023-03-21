import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminManagementComponent } from './subadmin-management.component';

describe('SubadminManagementComponent', () => {
  let component: SubadminManagementComponent;
  let fixture: ComponentFixture<SubadminManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubadminManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
