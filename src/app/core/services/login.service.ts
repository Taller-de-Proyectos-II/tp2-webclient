import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  dni: String = '';
  password: String = '';
  constructor(private http: HttpClient) {}

  login(userLoginDTO) {
    return this.http.post(environment.api + `/login/loginPsychologist/`, userLoginDTO);
  }

  loginAdmin(userLoginDTO) {
    return this.http.post(environment.api + `/login/loginAdmin/`, userLoginDTO);
  }

  createPsychologist(psychologistDTO) {
    return this.http.post(
      environment.api + `/login/createPsychologist/`,
      psychologistDTO
    );
  }

  restorePasswordPsychologist(emailDTO) {
    return this.http.post(
      environment.api + `/login/restorePasswordPsychologist/`,
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
