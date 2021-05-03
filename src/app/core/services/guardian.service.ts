import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class GuardianService {

  constructor(private http: HttpClient) {}

  findByDni(dni) {
    return this.http.get(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/guardian/listByPatientDni/?dni=${dni}`
    );
  }

}
