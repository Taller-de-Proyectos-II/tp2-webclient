import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkExperienceService {
  constructor(private http: HttpClient) {}

  create(workExperienceDTO) {
    return this.http.post(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/psychologist/workExperience/`,
      workExperienceDTO
    );
  }

  update(workExperienceDTO) {
    return this.http.put(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/psychologist/workExperience/`,
      workExperienceDTO
    );
  }

  delete(idWorkExperience) {
    return this.http.delete(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/psychologist/workExperience/?idWorkExperience=${idWorkExperience}`
    );
  }
}
