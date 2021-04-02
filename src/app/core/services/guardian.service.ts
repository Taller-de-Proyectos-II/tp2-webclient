import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class GuardianService {

  constructor(private http: HttpClient) {}

  findByDni(dni) {
    return this.http.get(
      `https://app-tp2-api.herokuapp.com/guardian/listByPatientDni/?dni=${dni}`
    );
  }

}
