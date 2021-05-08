import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  listTests(patientDni) {
    return this.http.get(
      environment.api + `/test/listByPatientDni/?patientDni=${patientDni}`
    );
  }

  listTestsByTestType(patientDni, testType) {
    return this.http.get(
      environment.api +
        `/test/listByPatientDniAndTestType/?patientDni=${patientDni}&testType=${testType}`
    );
  }

  createTest(patientDni, idQuestionType) {
    return this.http.post(environment.api + `/test/`, {
      patientDni: patientDni,
      idQuestionType: idQuestionType,
    });
  }

  deleteTest(idTest) {
    return this.http.delete(environment.api + `/test/?idTest=${idTest}`);
  }
}
