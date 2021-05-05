import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private http: HttpClient) {}

  listImportantAlerts(patientDni) {
    return this.http.get(
      `https://app-tp2-api.herokuapp.com/alerts/listImportantByPatientDni/?patientDni=${patientDni}`
    );
  }
}