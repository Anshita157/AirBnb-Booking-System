import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          if (error.status === 0) {
            errorMessage = 'Unable to connect to the server. Please check your internet connection.';
          } else if (error.status === 400) {
            errorMessage = error.error?.message || 'Bad Request';
          } else if (error.status === 401) {
            errorMessage = 'Unauthorized. Please login again.';
          } else if (error.status === 403) {
            errorMessage = 'Forbidden. You do not have permission to access this resource.';
          } else if (error.status === 404) {
            errorMessage = 'Resource not found.';
          } else if (error.status === 500) {
            errorMessage = 'Internal Server Error. Please try again later.';
          } else if (error.status === 503) {
            errorMessage = 'Service Unavailable. Please try again later.';
          } else {
            errorMessage = error.error?.message || `Error: ${error.statusText}`;
          }
        }

        if (error.status !== 401 && error.status !== 403) {
          this.toastr.error(errorMessage, 'Error');
        }

        return throwError(() => ({
          status: error.status,
          message: errorMessage,
          error: error.error,
        }));
      })
    );
  }
}
