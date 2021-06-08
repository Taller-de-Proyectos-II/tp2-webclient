import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DefaultAdminService {

  constructor(private http: HttpClient) { }

  createQuestionTypes() {
    return this.http.get(environment.api + `/questionType/createDefault/`);
  }

  createQuestions() {
    return this.http.get(environment.api + `/question/createDefault/`);
  }

  createSymptoms() {
    return this.http.get(environment.api + `/symptoms/createDefault/`);
  }

  createSchedules() {
    return this.http.get(environment.api + `/schedule/createDefault/`);
  }
}
