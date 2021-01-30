import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { BloodPressureDateCreaeDto } from './dto/blood-pressure-date.create.dto';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private readonly http: HttpClient) { }

  public getData(): Observable<any>{
    return this.http.get(`${environment.apiUrl}/blood-pressure-data`);
  }

  public saveData(data: BloodPressureDateCreaeDto): Observable<any>{
    console.log(`saving`)
    if(data.Id > 0){
      // TODO: put value
    } else {
      console.log(`posting`)
      return this.http.post(`${environment.apiUrl}/blood-pressure-data`, data);
    }
  }
}
