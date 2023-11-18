import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    // private securityService: OidcSecurityService,
    private messageService: MessageService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === HttpStatusCode.Unauthorized) {
          this.router.navigate(['login'], {
            queryParams: {
              redirectUrl: this.router.url.split('redirectUrl')[0],
            },
            replaceUrl: true,
          });
        }
        if ((err.status === HttpStatusCode.BadRequest || err.status === HttpStatusCode.NotFound) && err.error) {
          if (err.error.messages && Array.isArray(err.error.messages) && err.error.messages.length > 0) {
            err.error.messages.forEach((m: string | null) => {
              this.messageService.add({
                severity: 'error',
                summary: m ?? '',
              });
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: err.error.error_description ?? err.error,
            });
          }
        }
        if (err.status === HttpStatusCode.InternalServerError) {
          this.messageService.add({
            severity: 'error',
            summary: 'เกิดข้อผิดพลาด',
          });
        }
        return throwError(() => err.error);
      })
    );
  }
}
