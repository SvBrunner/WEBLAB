// src/app/auth/auth.interceptor.ts
import {inject} from '@angular/core';
import {
  HttpEvent, HttpRequest, HttpHandlerFn, HttpInterceptorFn, HttpErrorResponse
} from '@angular/common/http';
import {Observable, catchError, throwError} from 'rxjs';
import {AuthService} from './services/auth.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const auth = inject(AuthService);

  const token = auth.token;
  const authReq = token
    ? req.clone({
      setHeaders: {Authorization: `Bearer ${token}`},
      withCredentials: req.withCredentials // or true if you always need cookies
    })
    : req;

  return next(authReq).pipe(
    catchError((err: unknown) => {
      // refresh left out per your note
      if (err instanceof HttpErrorResponse) {
        // handle/log if you want
      }
      return throwError(() => err);
    })
  );
};
