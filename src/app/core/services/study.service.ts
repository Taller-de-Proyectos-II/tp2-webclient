import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudyService {
  constructor(private http: HttpClient) {}

  create(studyDTO) {
    return this.http.post(
      `https://app-tp2-api.herokuapp.com/psychologist/studies/`,
      studyDTO
    );
  }

  update(studyDTO) {
    return this.http.put(
      `https://app-tp2-api.herokuapp.com/psychologist/studies/`,
      studyDTO
    );
  }

  delete(idStudy) {
    return this.http.delete(
      `https://app-tp2-api.herokuapp.com/psychologist/studies/?idStudy=${idStudy}`
    );
  }
}
