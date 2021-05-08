import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudyService {
  constructor(private http: HttpClient) {}

  create(studyDTO) {
    return this.http.post(environment.api + `/psychologist/studies/`, studyDTO);
  }

  update(studyDTO) {
    return this.http.put(environment.api + `/psychologist/studies/`, studyDTO);
  }

  delete(idStudy) {
    return this.http.delete(
      environment.api + `/psychologist/studies/?idStudy=${idStudy}`
    );
  }
}
