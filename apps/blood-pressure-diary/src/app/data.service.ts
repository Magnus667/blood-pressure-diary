import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medication, Medicine } from '@blood-pressure-diary/api-interfaces';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { BloodPressure } from './blood-pressure-list/blood-pressure-list.component';
import { BloodPressureDateCreateDto } from './dto/blood-pressure-date.create.dto';
import { MedicationCreateDto } from './dto/medication.create.dto';
import { PageRequest } from './util/paginated-datasource';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private readonly http: HttpClient) {}

  public getData(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/blood-pressure-data`);
  }

  public saveData(data: BloodPressureDateCreateDto): Observable<any> {
    if (data.Id > 0) {
      return this.http.put(
        `${environment.apiUrl}/blood-pressure-data/${data.Id}`,
        data
      );
    } else {
      return this.http.post(`${environment.apiUrl}/blood-pressure-data`, data);
    }
  }

  public deleteData(id: number): Observable<BloodPressure> {
    return this.http.delete<BloodPressure>(
      `${environment.apiUrl}/blood-pressure-data/${id}`
    );
  }

  public getPage(
    request: PageRequest<BloodPressure>,
    query: Partial<BloodPressure>
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('pageNumber', `${request.page}`);
    params = params.append('pageSize', `${request.size}`);
    params = params.append('sortOrder', `${request.sort.order}`);
    params = params.append('sortProperty', `${request.sort.property}`);

    // Currently there is no option for filtering
    // It might be useful to implement some filters like Systolic > 90 and so on
    // params = params.append('Systolic', '');
    // params = params.append('Diastolic', '0');
    // params = params.append('Pulse', '0');
    // params = params.append('Date', '0');

    return this.http.get(`${environment.apiUrl}/blood-pressure-data/page`, {
      params,
    });
  }

  public getMedicine(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(`${environment.apiUrl}/medicine`);
  }

  public saveMedication(medication: MedicationCreateDto): Observable<any> {
    if (medication.Id > 0) {
      console.log('put medication');
      return this.http.put(
        `${environment.apiUrl}/medication/${medication.Id}`,
        medication
      );
    } else {
      console.log('post medication');
      return this.http.post(`${environment.apiUrl}/medication`, medication);
    }
  }

  public getMedicationPage(
    request: PageRequest<Medication>,
    query: Partial<Medication>
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('pageNumber', `${request.page}`);
    params = params.append('pageSize', `${request.size}`);
    params = params.append('sortOrder', `${request.sort.order}`);
    params = params.append('sortProperty', `${request.sort.property}`);

    // Currently there is no option for filtering
    // It might be useful to implement some filters like Systolic > 90 and so on
    // params = params.append('Systolic', '');
    // params = params.append('Diastolic', '0');
    // params = params.append('Pulse', '0');
    // params = params.append('Date', '0');

    return this.http.get(`${environment.apiUrl}/medication/page`, {
      params,
    });
  }

  public deleteMedication(id: number): Observable<Medication> {
    return this.http.delete<Medication>(
      `${environment.apiUrl}/medication/${id}`
    );
  }
}
