import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreSubjectsComponent } from './more-subjects.component';

describe('MoreSubjectsComponent', () => {
  let component: MoreSubjectsComponent;
  let fixture: ComponentFixture<MoreSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreSubjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
