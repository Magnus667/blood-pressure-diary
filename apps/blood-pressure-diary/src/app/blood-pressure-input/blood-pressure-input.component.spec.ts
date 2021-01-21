import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodPressureInputComponent } from './blood-pressure-input.component';

describe('BloodPressureInputComponent', () => {
  let component: BloodPressureInputComponent;
  let fixture: ComponentFixture<BloodPressureInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodPressureInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodPressureInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
