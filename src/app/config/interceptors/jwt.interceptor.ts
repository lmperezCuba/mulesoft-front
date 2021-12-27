import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Fake JWT verify');
    const accessToken = localStorage.getItem('jwt'); // get fake accessToken 
     const isLoggedIn = accessToken !== null
    if (isLoggedIn) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`, // Bearer is included
        },
      })
    }
    return next.handle(request);
  }
}
