import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  dni: String = '';
  password: String = '';
  constructor(private http: HttpClient) {}

  login(userLoginDTO) {
    return this.http.post(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/login/`,
      userLoginDTO
    );
  }

  restorePasswordPsychologist(emailDTO) {
    return this.http.post(
      `http://tp2-api.us-east-1.elasticbeanstalk.com/login/restorePasswordPsychologist/`,
      emailDTO
    );
  }

  setDni(dni: String) {
    this.dni = dni;
  }

  setPassword(password: String) {
    this.password = password;
  }

  getDni() {
    return this.dni;
  }

  getPassword() {
    return this.password;
  }
}
