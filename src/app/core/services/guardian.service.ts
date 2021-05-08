import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GuardianService {
  constructor(private http: HttpClient) {}

  findByDni(dni) {
    return this.http.get(
      environment.api + `/guardian/listByPatientDni/?dni=${dni}`
    );
  }
}
