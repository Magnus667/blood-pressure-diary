import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(public readonly appService: AppService) { }

  ngOnInit(): void {
  }

  async login(){
    const raw = this.LoginControls.getRawValue();
    try{
      await this.appService.login(raw.Login, raw.Password);
      console.log(`Succeeded in component`)
    }catch(error){
      // TODO
      console.log(`Failed in compnent with`, error);
    }
  }

  async logout(){
    this.appService.logout();
  }
}
