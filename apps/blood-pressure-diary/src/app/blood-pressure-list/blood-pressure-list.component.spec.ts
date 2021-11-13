import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodPressureListComponent } from './blood-pressure-list.component';

describe('BloodPressureListComponent', () => {
  let component: BloodPressureListComponent;
  let fixture: ComponentFixture<BloodPressureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodPressureListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodPressureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
