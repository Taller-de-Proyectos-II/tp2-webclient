import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private http: HttpClient) {}

  listImportantAlerts(patientDni) {
    return this.http.get(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/alerts/listImportantByPatientDni/?patientDni=${patientDni}`
    );
  }
}