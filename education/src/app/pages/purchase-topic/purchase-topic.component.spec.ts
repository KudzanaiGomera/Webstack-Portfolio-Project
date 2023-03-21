import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseTopicComponent } from './purchase-topic.component';

describe('PurchaseTopicComponent', () => {
  let component: PurchaseTopicComponent;
  let fixture: ComponentFixture<PurchaseTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseTopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
