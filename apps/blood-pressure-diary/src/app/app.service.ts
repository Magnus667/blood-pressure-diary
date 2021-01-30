import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { IUser } from './interfaces/user.interface';

interface LoginResult {
  id: number,
  name: string,
  username: string,
  access_token: string
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private user: IUser;
  public set User(value: IUser){ this.user = value; this.User$.next(this.user); }
  public get User(){ return this.user; }

  public User$: Subject<IUser> = new Subject<IUser>();

  constructor(private readonly router: Router, private readonly http: HttpClient) {
    const token = localStorage.getItem('session');
    if(!token){ 
      this.router.navigate(['home']);
    } else {
      this.getUser();
    }
  }

  public async login(username: string, password: string): Promise<any>{
    return this.http.post<LoginResult>(`${environment.apiUrl}/auth/login`, { username: username, password: password }).pipe(tap(user => {
      localStorage.setItem('session', user.access_token)
      const { access_token: token, ...reduced } = user;
      this.User = reduced;

    })).toPromise();
  }

  public async logout(){
    localStorage.removeItem('session')
    this.User = null;
  }

  public async getUser(){
    this.http.get(`${environment.apiUrl}/auth/login`).subscribe((user: IUser) => {
      this.User = user;
    }, error => {
      // TODO: Errorhandling (e.g. token is expired)
    })
  }
}
