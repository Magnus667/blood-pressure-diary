import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationInputComponent } from './medication-input.component';

describe('MedicationInputComponent', () => {
  let component: MedicationInputComponent;
  let fixture: ComponentFixture<MedicationInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicationInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
