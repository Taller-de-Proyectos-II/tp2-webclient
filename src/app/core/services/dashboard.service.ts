import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  listDashboard(patientDni, startDate, endDate) {
    return this.http.get(
      `https://app-tp2-api.herokuapp.com/dashboard/?endDate=${endDate}&patientDni=${patientDni}&startDate=${startDate}`
    );
  }
}