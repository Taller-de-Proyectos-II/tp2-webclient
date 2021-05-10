import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private http: HttpClient) {}

  listAlerts(patientDni) {
    return this.http.get(
      environment.api +
        `/alerts/listByPatientDni/?patientDni=${patientDni}`
    );
  }
}
