import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionTypeService {
  constructor(private http: HttpClient) {}

  listQuestionTypes() {
    return this.http.get(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/questionType/listAll/`
    );
  }
}
