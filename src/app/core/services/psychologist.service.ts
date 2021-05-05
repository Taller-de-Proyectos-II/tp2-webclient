import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ExperienceDTO } from '../models/experienceDTO.model';
import { PsychologistDTO } from '../models/psychologistDTO.model';

@Injectable({
  providedIn: 'root',
})
export class PsychologistService {
  psychologist: PsychologistDTO = null;
  experience: ExperienceDTO = null;

  constructor(private http: HttpClient) {
  }

  register(psychologistDTO) {
    return this.http.post(
      `https://app-tp2-api.herokuapp.com/psychologist/`,
      psychologistDTO
    );
  }

  update(psychologistDTO) {
    return this.http.put(
      `https://app-tp2-api.herokuapp.com/psychologist/`,
      psychologistDTO
    );
  }

  listByDni(dni) {
    return this.http.get(
      `https://app-tp2-api.herokuapp.com/psychologist/?dni=${dni}`
    );
  }

  listExperienceByDni(dni) {
    return this.http.get(
      `https://app-tp2-api.herokuapp.com/psychologist/experience/?dni=${dni}`
    );
  }

  setPsychologist(psychologist: PsychologistDTO) {
    this.psychologist = psychologist;
  }

  getPsychologist() {
    return this.psychologist;
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
