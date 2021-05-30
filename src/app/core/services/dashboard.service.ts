import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  listDashboard(patientDni, startDate, endDate) {
    return this.http.get(
      environment.api +
        `/dashboard/?endDate=${endDate}&patientDni=${patientDni}&startDate=${startDate}`
    );
  }

  listManifestations(patientDni, startDate, endDate) {
    return this.http.get(
      environment.api +
        `/dashboard/listManifestations/?endDate=${endDate}&patientDni=${patientDni}&startDate=${startDate}`
    );
  }

  listAlerts(patientDni, startDate, endDate) {
    return this.http.get(
      environment.api +
        `/dashboard/listAlerts/?endDate=${endDate}&patientDni=${patientDni}&startDate=${startDate}`
    );
  }

  listDashboardAllPatients(psychologistDni, startDate, endDate) {
    return this.http.get(
      environment.api +
        `/dashboard/listDashboardAllPatients/?endDate=${endDate}&psychologistDni=${psychologistDni}&startDate=${startDate}`
    );
  }

  listManifestationsAllPatients(psychologistDni, startDate, endDate) {
    return this.http.get(
      environment.api +
        `/dashboard/listManifestationsAllPatients/?endDate=${endDate}&psychologistDni=${psychologistDni}&startDate=${startDate}`
    );
  }

  listAlertsAllPatients(psychologistDni, startDate, endDate) {
    return this.http.get(
      environment.api +
        `/dashboard/listAlertsAllPatients/?endDate=${endDate}&psychologistDni=${psychologistDni}&startDate=${startDate}`
    );
  }
}
