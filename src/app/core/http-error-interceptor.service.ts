import { Injectable } from '@angular/core';
import { 
  HttpEvent, 
  HttpInterceptor, 
  HttpHandler, 
  HttpRequest, 
  HttpErrorResponse 
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: any) => {
        console.error('HTTP Error:', error);

        let errorMessage = 'Ett oväntat fel uppstod';

        if (error instanceof HttpErrorResponse) {
          // Handle HTTP errors (client-side or server-side)
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Klientfel: ${error.error.message}`;
          } else {
            // Server-side error
            const statusText = error.statusText || 'Okänt serverfel';
            errorMessage = `Serverfel: ${error.status} - ${statusText}`;
          }
        } else if (error instanceof Error) {
          // Handle generic JavaScript errors
          errorMessage = `Ett oväntat fel uppstod: ${error.message}`;
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}