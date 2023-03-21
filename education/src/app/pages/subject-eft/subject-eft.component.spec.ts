import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectEftComponent } from './subject-eft.component';

describe('SubjectEftComponent', () => {
  let component: SubjectEftComponent;
  let fixture: ComponentFixture<SubjectEftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectEftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectEftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
