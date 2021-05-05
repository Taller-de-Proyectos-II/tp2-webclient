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
      `https://app-tp2-api.herokuapp.com/login/`,
      userLoginDTO
    );
  }

  restorePasswordPsychologist(emailDTO) {
    return this.http.post(
      `https://app-tp2-api.herokuapp.com/login/restorePasswordPsychologist/`,
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
