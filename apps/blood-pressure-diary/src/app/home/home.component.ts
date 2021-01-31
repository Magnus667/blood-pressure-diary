import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../app.service';

@Component({
  selector: 'blood-pressure-diary-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  LoginControls: FormGroup = new FormGroup({
    Login: new FormControl('', [ Validators.required]),
    Password: new FormControl('', [ Validators.required])
  });

  LogoutControls: FormGroup = new FormGroup({});

  hide = true;

  constructor(public readonly appService: AppService, private readonly snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  async login(){
    const raw = this.LoginControls.getRawValue();
    try{
      await this.appService.login(raw.Login, raw.Password);
      this.snackBar.open(`Anmeldung erfolgreich`, ``, {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-primary']
      });
    }catch(error){
      this.snackBar.open(`Anmeldung fehlgeschlagen`, ``, {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    }
  }

  async logout(){
    this.appService.logout();

    this.snackBar.open(`Abgemeldet`, ``, {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }
}
