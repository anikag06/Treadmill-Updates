import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as localforage from 'localforage';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

import { TOKEN, DEFAULT_PATH, TOKEN_REFRESH_PATH, LOGIN_PATH } from '@/app.constants';
export interface Token {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  getUserDetails(data: any) {
    return this.http.post(environment.API_ENDPOINT + LOGIN_PATH, data);
  }

  isLoggedIn(): boolean {
    const jwtToken = localStorage.getItem(TOKEN)
    if (jwtToken) {
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(jwtToken);
      if (!isExpired) {
        return true;
      }
    }
    return false;
  }


  async isLoggedInAsync() {
    try {
      const data = await localforage.getItem(TOKEN);
      if (data) {
        const helper = new JwtHelperService();
        const isExpired = helper.isTokenExpired((<string>data));
        if (!isExpired) {
          return true;
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  logout() {
    return localforage.clear()
      .finally(() => {
        this.router.navigate([DEFAULT_PATH]);
      });
  }

  refresh() {
    localforage.getItem(TOKEN)
      .then((token) => {
        if (token != null) {
          this.http.post<Token>(environment.API_ENDPOINT + TOKEN_REFRESH_PATH, { 'token': token })
            .subscribe(
              (data) => {
                localforage.setItem(TOKEN, data.token);
              },
              (error: HttpErrorResponse) => {
                this.router.navigate([DEFAULT_PATH]);
                localforage.setItem(TOKEN, null);
              }
            );
        }
      });
  }
}
