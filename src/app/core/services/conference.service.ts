import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConferenceService {
  constructor(private http: HttpClient) {}

  create(courseDTO) {
    return this.http.post(
      environment.api + `/psychologist/conferences/`,
      courseDTO
    );
  }

  update(courseDTO) {
    return this.http.put(
      environment.api + `/psychologist/conferences/`,
      courseDTO
    );
  }

  delete(idConference) {
    return this.http.delete(
      environment.api +
        `/psychologist/conferences/?idConference=${idConference}`
    );
  }
}
