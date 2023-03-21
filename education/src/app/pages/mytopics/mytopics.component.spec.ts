import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MytopicsComponent } from './mytopics.component';

describe('MytopicsComponent', () => {
  let component: MytopicsComponent;
  let fixture: ComponentFixture<MytopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MytopicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MytopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
