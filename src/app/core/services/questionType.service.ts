import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionTypeService {
  constructor(private http: HttpClient) {}

  listQuestionTypes() {
    return this.http.get(
      `https://app-tp2-api.herokuapp.com/questionType/listAll/`
    );
  }
}
