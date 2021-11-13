import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { Moment } from 'moment';
import * as moment from 'moment';
import { DataService } from '../data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Medicine } from '@blood-pressure-diary/api-interfaces';
import { MedicationCreateDto } from '../dto/medication.create.dto';

@Component({
  selector: 'blood-pressure-diary-medication-input',
  templateUrl: './medication-input.component.html',
  styleUrls: ['./medication-input.component.scss'],
  providers: [
    DatePipe,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class MedicationInputComponent implements OnInit {
  public medicine$: Observable<Medicine[]>;
  public selectedMedicine: Medicine;

  constructor(
    private readonly datePipe: DatePipe,
    private readonly dateAdapter: DateAdapter<any>,
    private readonly dataService: DataService,
    private snackBar: MatSnackBar
  ) {}

  public DataValueControl = new FormGroup({
    MedicineId: new FormControl('', [Validators.required]),
    Dosage: new FormControl('', [Validators.required]),
    Date: new FormControl('', [Validators.required]),
    Time: new FormControl('', [Validators.required]),
  });

  public Message: string = '';

  ngOnInit(): void {
    this.dateAdapter.setLocale('de');

    this.medicine$ = this.dataService.getMedicine();
    // this.dataService.getMedicine().subscribe(
    //   (medicine) => {
    //     console.log(`medicine`, medicine);
    //   },
    //   (error) => [console.error(`Error while fetching medicine`, error)]
    // );

    this.reset();
  }

  reset() {
    const now = new Date();

    this.DataValueControl.patchValue({
      Date: moment(now),
      Time: this.datePipe.transform(now, 'HH:mm', undefined, 'de'),
    });
  }

  submit() {
    if (this.DataValueControl.valid) {
      const raw = this.DataValueControl.getRawValue();
      let date: Date = (<Moment>raw.Date).toDate();
      const hours = (<string>raw.Time).split(':')[0];
      const minutes = (<string>raw.Time).split(':')[1];
      date.setHours(+hours);
      date.setMinutes(+minutes);
      date.setSeconds(0);
      const dto = new MedicationCreateDto(raw.MedicineId, raw.Dosage, date);
      this.dataService.saveMedication(dto).subscribe((result) => {
        this.snackBar.open(`Gespeichert`, ``, {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-primary'],
        });
      });
    } else {
      this.Message = 'Bitte alle Felder korrekt eingeben.';
    }
  }
}
