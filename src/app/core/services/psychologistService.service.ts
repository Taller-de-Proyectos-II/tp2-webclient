import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PsychologistDTO } from '../models/psychologistDTO.model';

@Injectable({
  providedIn: 'root',
})
export class PsychologistService {
  psychologist: PsychologistDTO = null;
  constructor(private http: HttpClient) {}

  register(psychologistDTO) {
    return this.http.post(
      `https://app-tp2-api.herokuapp.com/psychologist/`,
      psychologistDTO
    );
  }

  listByDni(dni) {
    return this.http.get(
      `https://app-tp2-api.herokuapp.com/psychologist/?dni=${dni}`
    );
  }

  setPsychologist(psychologist: PsychologistDTO) {
    this.psychologist = psychologist;
  }

  getPsychologist() {
    return this.psychologist;
  }
}
