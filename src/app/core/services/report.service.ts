import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  listAll(patientDni) {
    return this.http.get(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/report/listByPatientDni/?patientDni=${patientDni}`
    );
  }

  create(reportDTO) {
    return this.http.post(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/report/`,
      reportDTO
    );
  }

  update(reportDTO) {
    return this.http.put(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/report/`,
      reportDTO
    );
  }

  delete(idReport) {
    return this.http.delete(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/report/?idReport=${idReport}`
    );
  }
}
