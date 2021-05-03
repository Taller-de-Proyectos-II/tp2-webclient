import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkExperienceService {
  constructor(private http: HttpClient) {}

  create(workExperienceDTO) {
    return this.http.post(
      `https://app-tp2-api.herokuapp.com//psychologist/workExperience/`,
      workExperienceDTO
    );
  }

  update(workExperienceDTO) {
    return this.http.put(
      `https://app-tp2-api.herokuapp.com//psychologist/workExperience/`,
      workExperienceDTO
    );
  }

  delete(idWorkExperience) {
    return this.http.delete(
      `https://app-tp2-api.herokuapp.com//psychologist/workExperience/?idWorkExperience=${idWorkExperience}`
    );
  }
}
