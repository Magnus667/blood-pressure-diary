import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS,  MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter'
import { BloodPressureDateCreaeDto } from '../dto/blood-pressure-date.create.dto';
import { Moment } from 'moment';
import * as moment from 'moment';
import { DataService } from '../data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'blood-pressure-diary-blood-pressure-input',
  templateUrl: './blood-pressure-input.component.html',
  styleUrls: ['./blood-pressure-input.component.scss'],
  providers: [
    DatePipe,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class BloodPressureInputComponent implements OnInit {

  constructor(private readonly datePipe: DatePipe, private readonly dateAdapter: DateAdapter<any>, private readonly dataService: DataService, private snackBar: MatSnackBar) {}

  DateControl = new FormControl('', [ Validators.required]);
  TimeControl = new FormControl('', [ Validators.required]);

  public DataValueControl = new FormGroup({
    Systolic: new FormControl('', [ Validators.required ]),
    Diastolic: new FormControl('', [ Validators.required]),
    Pulse: new FormControl('', [ Validators.required]),
    Date: this.DateControl,
    Time: this.TimeControl
  });

  public Message: string = '';


  ngOnInit(): void {
    this.dateAdapter.setLocale('de');

    this.reset();
  }

  reset() {
    const now = new Date();

    this.DataValueControl.patchValue({ Date: moment(now), Time: this.datePipe.transform(now, "HH:mm", undefined, "de") });
  }

  submit() {
    if(this.DataValueControl.valid){
      const raw = this.DataValueControl.getRawValue();
      let date: Date = (<Moment>raw.Date).toDate();
      const hours = (<string>raw.Time).split(":")[0];
      const minutes = (<string>raw.Time).split(":")[1];
      date.setHours(+hours);
      date.setMinutes(+minutes);
      date.setSeconds(0);
  
      const dto = new BloodPressureDateCreaeDto(raw.Systolic, raw.Diastolic, raw.Pulse, date);

      this.dataService.saveData(dto).subscribe(result => {
        this.snackBar.open(`Gespeichert`, ``, {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
      });
    } else {
      this.Message = "Bitte alle Felder korrekt eingeben."
    }
  }
}