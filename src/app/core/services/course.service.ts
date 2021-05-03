import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PsychologistDTO } from '../models/psychologistDTO.model';
import { ExperienceDTO } from '../models/experienceDTO.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  create(courseDTO) {
    return this.http.post(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/psychologist/courses/`,
      courseDTO
    );
  }

  update(courseDTO) {
    return this.http.put(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/psychologist/courses/`,
      courseDTO
    );
  }

  delete(idCourse) {
    return this.http.delete(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/psychologist/courses/?idCourse=${idCourse}`
    );
  }
}
