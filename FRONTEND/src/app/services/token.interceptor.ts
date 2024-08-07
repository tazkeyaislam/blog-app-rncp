import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    //Retrieves the token from localStorage.
    const token = localStorage.getItem('token');

    //If a token exists, clones the request and sets the Authorization header with the token
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err.url);

          //if the status code is 401 (Unauthorized) or 403 (Forbidden)
          if (err.status === 401 || err.status === 403) {
            // if (this.router.url === '/') {
            // }
            // else {
            localStorage.clear();
            this.router.navigate(['/']);
            // }
          }
        }
        return throwError(err);
      })
    )
  }
}
