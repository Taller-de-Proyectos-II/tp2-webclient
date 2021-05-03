import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ConferenceService {
  constructor(private http: HttpClient) {}

  create(courseDTO) {
    return this.http.post(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/psychologist/conferences/`,
      courseDTO
    );
  }

  update(courseDTO) {
    return this.http.put(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/psychologist/conferences/`,
      courseDTO
    );
  }

  delete(idConference) {
    return this.http.delete(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/psychologist/conferences/?idConference=${idConference}`
    );
  }
}
