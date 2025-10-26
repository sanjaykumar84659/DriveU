import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Endpoints that should NOT receive the Authorization header.
   * Keep these relative to your backend apiUrl for easy matching below.
   * 
   */

  
  constructor(private router: Router) {}

  private readonly skipPaths = ['/api/login', '/api/register'];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('auth_token');

    // Only attach token for calls going to your backend API
    const isApiCall = req.url.startsWith(environment.apiUrl);

    // And skip login/register by exact prefix matching
    const isSkip = this.skipPaths.some(p => req.url.startsWith(environment.apiUrl + p));

    if (token && isApiCall && !isSkip) {
      req= req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
      
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {

          this.router.navigate(['/error', error.status], {
            queryParams: { message: error.error }
          });
          return throwError(() => error);
        })
      );
    
  }
}

/** Provider to register the interceptor */
export const AUTH_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};