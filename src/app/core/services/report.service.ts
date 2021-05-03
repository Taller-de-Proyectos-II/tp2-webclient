import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  listAll(patientDni) {
    return this.http.get(
      `https://app-tp2-api.herokuapp.com//report/listByPatientDni/?patientDni=${patientDni}`
    );
  }

  create(reportDTO) {
    return this.http.post(
      `https://app-tp2-api.herokuapp.com//report/`,
      reportDTO
    );
  }

  update(reportDTO) {
    return this.http.put(
      `https://app-tp2-api.herokuapp.com//report/`,
      reportDTO
    );
  }

  delete(idReport) {
    return this.http.delete(
      `https://app-tp2-api.herokuapp.com//report/?idReport=${idReport}`
    );
  }
}
