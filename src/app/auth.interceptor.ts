import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpParams, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {Observable, take} from 'rxjs';
import {AuthentificationService} from "./login-form/service/authentification.service";
import {switchMap} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService : AuthentificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return this.authService.currentUser$.pipe(
      take(1),
      switchMap(currentUser => {
        if (currentUser && currentUser.id) {
          const clonedRequest = request.clone({
            params: new HttpParams().set('access_token', currentUser.id),
          });
          console.log(clonedRequest)
          return next.handle(clonedRequest);
        }

        return next.handle(request);
      })
    );
  }
}


export const AuthentificationInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  };
