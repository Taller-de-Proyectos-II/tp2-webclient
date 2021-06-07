import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');
    let request = req;

    if (
      token &&
      req.url.search('https://newsapi.ai/api/') === -1 &&
      req.url.search('https://www.youtube.com') === -1 &&
      req.url.search('https://app-tp2-api.herokuapp.com/login/') === -1 &&
      request.url.search(
        'https://app-tp2-api.herokuapp.com/psychologist/image/'
      ) === -1 &&
      request.url.search(
        'https://app-tp2-api.herokuapp.com/guardian/image/'
      ) === -1 &&
      request.url.search('https://app-tp2-api.herokuapp.com/patient/image/') ===
        -1
    ) {
      request = req.clone({
        setHeaders: {
          Authorization: token,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (
          (err.status === 403 || err.status === 404) &&
          request.url.search(
            'https://app-tp2-api.herokuapp.com/psychologist/image/'
          ) === -1 &&
          request.url.search(
            'https://app-tp2-api.herokuapp.com/guardian/image/'
          ) === -1 &&
          request.url.search(
            'https://app-tp2-api.herokuapp.com/patient/image/'
          ) === -1
        ) {
          this.router.navigate(['/']);
        }

        return throwError(err);
      })
    );
  }
}
