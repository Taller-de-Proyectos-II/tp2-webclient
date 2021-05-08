import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  create(courseDTO) {
    return this.http.post(
      environment.api + `/psychologist/courses/`,
      courseDTO
    );
  }

  update(courseDTO) {
    return this.http.put(environment.api + `/psychologist/courses/`, courseDTO);
  }

  delete(idCourse) {
    return this.http.delete(
      environment.api + `/psychologist/courses/?idCourse=${idCourse}`
    );
  }
}
