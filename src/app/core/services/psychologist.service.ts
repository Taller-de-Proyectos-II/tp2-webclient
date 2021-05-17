import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ExperienceDTO } from '../models/experienceDTO.model';


@Injectable({
  providedIn: 'root',
})
export class PsychologistService {
  experience: ExperienceDTO = null;

  constructor(private http: HttpClient) {}

  register(psychologistDTO) {
    return this.http.post(environment.api + `/psychologist/`, psychologistDTO);
  }

  update(psychologistDTO) {
    return this.http.put(environment.api + `/psychologist/`, psychologistDTO);
  }

  updatePassword(changePasswordDTO) {
    return this.http.put(
      environment.api + `/psychologist/updatePassword/`,
      changePasswordDTO
    );
  }

  listByDni(dni) {
    return this.http.get(environment.api + `/psychologist/?dni=${dni}`);
  }

  listExperienceByDni(dni) {
    return this.http.get(
      environment.api + `/psychologist/experience/?dni=${dni}`
    );
  }

  getExperience() {
    return this.experience;
  }

  setExperience(experience) {
    this.experience = experience;
  }

  setConferences(conferences) {
    this.experience.conferences = conferences;
  }

  setStudies(studies) {
    this.experience.studies = studies;
  }

  setWorkExperiences(workExperiences) {
    this.experience.workExperiences = workExperiences;
  }

  setCourses(courses) {
    this.experience.courses = courses;
  }
}
