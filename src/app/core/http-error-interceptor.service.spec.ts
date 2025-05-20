// src/app/core/http-error-interceptor.service.ts

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Logga felet (eller visa ett toast/snackbar etc.)
        console.error('HTTP Error:', error);

        let errorMessage = 'Ett oväntat fel uppstod';

        if (error.error instanceof ErrorEvent) {
          // Klient-side fel
          errorMessage = `Klientfel: ${error.error.message}`;
        } else {
          // Server-side fel
          errorMessage = `Serverfel: ${error.status} - ${error.message}`;
        }

        // Här kan du även navigera eller visa notifieringar
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
