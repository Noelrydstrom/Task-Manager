import { TestBed } from '@angular/core/testing';
import { HttpErrorInterceptor } from './http-error-interceptor.service';
import { 
  HttpClient, 
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { throwError } from 'rxjs';

describe('HttpErrorInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let interceptor: HttpErrorInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true
        },
        HttpErrorInterceptor
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(HttpErrorInterceptor);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should handle client-side errors', (done) => {
    const consoleSpy = spyOn(console, 'error');
    
    httpClient.get('/test').subscribe({
      error: (err) => {
        expect(consoleSpy).toHaveBeenCalledWith('HTTP Error:', jasmine.any(HttpErrorResponse));
        expect(err.message).toBe('Klientfel: Failed to fetch');
        done();
      }
    });

    const req = httpTestingController.expectOne('/test');
    req.error(new ErrorEvent('Network error', { message: 'Failed to fetch' }));
  });

  it('should handle server-side errors', (done) => {
    const consoleSpy = spyOn(console, 'error');
    
    httpClient.get('/api/test').subscribe({
      error: (err) => {
        expect(consoleSpy).toHaveBeenCalledWith('HTTP Error:', jasmine.any(HttpErrorResponse));
        expect(err.message).toBe('Serverfel: 500 - Server Error');
        done();
      }
    });

    const req = httpTestingController.expectOne('/api/test');
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });

  it('should pass through successful requests', (done) => {
    httpClient.get('/api/success').subscribe({
      next: () => {
        expect(true).toBe(true); // Verify we reach here
        done();
      },
      error: () => fail('Should not throw error')
    });

    const req = httpTestingController.expectOne('/api/success');
    req.flush({ success: true });
  });

  it('should handle generic errors', (done) => {
    const consoleSpy = spyOn(console, 'error');
    
    // Create a mock handler that throws a generic error
    const mockHandler: HttpHandler = {
      handle: () => throwError(() => new Error('Generic error'))
    };

    const request = new HttpRequest('GET', '/api/generic-error');
    interceptor.intercept(request, mockHandler).subscribe({
      error: (err) => {
        expect(consoleSpy).toHaveBeenCalledWith('HTTP Error:', jasmine.any(Error));
        expect(err.message).toBe('Ett oväntat fel uppstod: Generic error');
        done();
      }
    });
  });
});