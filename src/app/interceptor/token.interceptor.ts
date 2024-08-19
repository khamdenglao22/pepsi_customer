import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private snackbar: MatSnackBar, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    // const lang = localStorage.getItem('lang') || 'lo';
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token,
          // AcceptLanguage: lang,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // console.log(error);
        let msg = error.error.message || 'something went wrong';
        if (error.status == 403) {
          this.snackbar.open(msg, '', {
            duration: 3000,
          });
        } else if (error.status == 401) {
          this.router.navigate(['/login']);
        }
        return throwError({ msg });
      })
    );
  }
}
