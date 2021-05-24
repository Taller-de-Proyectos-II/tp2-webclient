import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  listAll(patientDni) {
    return this.http.get(
      environment.api + `/report/listByPatientDni/?patientDni=${patientDni}`
    );
  }

  listAllByType(patientDni, type) {
    return this.http.get(
      environment.api +
        `/report/listByPatientDniAndType/?patientDni=${patientDni}&type=${type}`
    );
  }

  create(reportDTO) {
    return this.http.post(environment.api + `/report/`, reportDTO);
  }

  update(reportDTO) {
    return this.http.put(environment.api + `/report/`, reportDTO);
  }

  delete(idReport) {
    return this.http.delete(environment.api + `/report/?idReport=${idReport}`);
  }

  export(idReport): Observable<Blob> {
    return this.http.get(
      environment.api + `/report/export/?idReport=${idReport}`,
      { responseType: 'blob' }
    );
  }
}
