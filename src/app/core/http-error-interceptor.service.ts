// src/app/core/http-error-interceptor.service.ts
//FEL HANTERING

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        
        console.error('HTTP Error:', error);

        let errorMessage = 'Ett oväntat fel uppstod';

        if (error.error instanceof ErrorEvent) {
          
          errorMessage = `Klientfel: ${error.error.message}`;
        } else {
          
          errorMessage = `Serverfel: ${error.status} - ${error.message}`;
        }

        
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
