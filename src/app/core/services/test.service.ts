import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  listTests(patientDni) {
    return this.http.get(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/test/listByPatientDni/?patientDni=${patientDni}`
    );
  }

  createTest(patientDni, idQuestionType) {
    return this.http.post(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/test/`,
      { patientDni: patientDni, idQuestionType: idQuestionType }
    );
  }

  deleteTest(idTest) {
    return this.http.delete(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/test/?idTest=${idTest}`
    );
  }
}
