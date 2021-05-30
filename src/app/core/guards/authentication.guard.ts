import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { JWTService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router, private jwtService: JWTService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let token = this.jwtService.getToken();

    if (!token) {
      sessionStorage.clear();
      this.router.navigateByUrl('');
      return false;
    } else {
      if (!this.jwtService.isTokenExpired(token)) {
        return true;
      } else {
        sessionStorage.clear();
        this.router.navigateByUrl('');
        return false;
      }
    }
  }
}
