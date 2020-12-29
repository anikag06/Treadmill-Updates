import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthService } from '@/shared/auth/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LOGIN_PATH, TOKEN, TOKEN_REFRESH_PATH } from '@/app.constants';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  isRefreshing = false;
  refreshTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Cache-Control':
          'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        Authorization: 'Bearer ' + token,
        url: this.router.url,
      },
      withCredentials: true,
    });
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // sending request to server and checking for error with status 401 unauthorized
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(
      <string>this.authService.getToken()
    );

    if (request.url.includes(TOKEN_REFRESH_PATH)) {
      return next.handle(request).pipe(
        catchError((error) => {
          this.authService.logout(true);
          return throwError(error.message);
        })
      );
    }

    if (isExpired) {
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        // @ts-ignore
        this.refreshTokenSubject.next(null);
        return this.http
          .get(environment.API_ENDPOINT + TOKEN_REFRESH_PATH, {
            headers: {
              'Cache-Control':
                'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
            },
            withCredentials: true,
          })
          .pipe(
            switchMap((tokenData: any) => {
              window.localStorage.setItem(TOKEN, tokenData.data.access);
              this.isRefreshing = false;
              this.refreshTokenSubject.next(tokenData.data.access);
              return next.handle(this.addToken(request, tokenData.data.access));
            })
          );
      } else {
        return this.refreshTokenSubject.pipe(
          filter((result: string) => result !== null),
          take(1),
          switchMap((res) => {
            return next.handle(this.addToken(request, res));
          })
        );
      }
    } else {
      return next.handle(this.addToken(request, this.authService.getToken()));
    }
  }
}
