import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  listTests(patientDni) {
    return this.http.get(
      `https://app-tp2-api.herokuapp.com/test/listByPatientDni/?patientDni=${patientDni}`
    );
  }

  createTest(patientDni) {
    return this.http.post(
      `https://app-tp2-api.herokuapp.com/test/`,
      { patientDni: patientDni }
    );
  }

  deleteTest(idTest) {
    return this.http.delete(
      `https://app-tp2-api.herokuapp.com/test/?idTest=${idTest}`
    );
  }
}
