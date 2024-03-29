import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BloodPressureInputComponent } from './blood-pressure-input/blood-pressure-input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

import localeDE from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {
  BloodPressureDiaryDeleteDialogComponent,
  BloodPressureListComponent,
} from './blood-pressure-list/blood-pressure-list.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { MedicationInputComponent } from './medication-input/medication-input.component';
import { InputComponent } from './input/input.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MedicationDeleteDialogComponent, MedicationListComponent } from './medication-list/medication-list.component';
import { DataListComponent } from './data-list/data-list.component';

registerLocaleData(localeDE);

@NgModule({
  declarations: [
    AppComponent,
    BloodPressureInputComponent,
    HomeComponent,
    BloodPressureListComponent,
    BloodPressureDiaryDeleteDialogComponent,
    MedicationInputComponent,
    InputComponent,
    MedicationListComponent,
    MedicationDeleteDialogComponent,
    DataListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
