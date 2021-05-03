import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudyService {
  constructor(private http: HttpClient) {}

  create(studyDTO) {
    return this.http.post(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/psychologist/studies/`,
      studyDTO
    );
  }

  update(studyDTO) {
    return this.http.put(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/psychologist/studies/`,
      studyDTO
    );
  }

  delete(idStudy) {
    return this.http.delete(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/psychologist/studies/?idStudy=${idStudy}`
    );
  }
}
