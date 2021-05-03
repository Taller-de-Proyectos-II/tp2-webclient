import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ConferenceService {
  constructor(private http: HttpClient) {}

  create(courseDTO) {
    return this.http.post(
      `https://app-tp2-api.herokuapp.com//psychologist/conferences/`,
      courseDTO
    );
  }

  update(courseDTO) {
    return this.http.put(
      `https://app-tp2-api.herokuapp.com//psychologist/conferences/`,
      courseDTO
    );
  }

  delete(idConference) {
    return this.http.delete(
      `https://app-tp2-api.herokuapp.com//psychologist/conferences/?idConference=${idConference}`
    );
  }
}
