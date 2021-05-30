import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class JWTService {
  constructor() {
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  removeToken() {
    sessionStorage.removeItem('token');
  }

  isTokenExpired(token) {
    const jwtHelperService = new JwtHelperService();
    return jwtHelperService.isTokenExpired(token);
  }
}