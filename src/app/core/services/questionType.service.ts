import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionTypeService {
  constructor(private http: HttpClient) {}

  listQuestionTypes() {
    return this.http.get(environment.api + `/questionType/listAll/`);
  }
}
