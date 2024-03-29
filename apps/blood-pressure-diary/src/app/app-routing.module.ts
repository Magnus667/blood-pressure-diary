import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BloodPressureInputComponent } from './blood-pressure-input/blood-pressure-input.component';
import { BloodPressureListComponent } from './blood-pressure-list/blood-pressure-list.component';
import { InputComponent } from './input/input.component';
import { DataListComponent } from './data-list/data-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'input',
    component: InputComponent
  },
  {
    path: 'data-list',
    component: DataListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
