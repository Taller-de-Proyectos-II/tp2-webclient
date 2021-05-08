import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkExperienceService {
  constructor(private http: HttpClient) {}

  create(workExperienceDTO) {
    return this.http.post(
      environment.api + `/psychologist/workExperience/`,
      workExperienceDTO
    );
  }

  update(workExperienceDTO) {
    return this.http.put(
      environment.api + `/psychologist/workExperience/`,
      workExperienceDTO
    );
  }

  delete(idWorkExperience) {
    return this.http.delete(
      environment.api +
        `/psychologist/workExperience/?idWorkExperience=${idWorkExperience}`
    );
  }
}
