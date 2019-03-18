import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as localforage from 'localforage';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

import { TOKEN, DEFAULT_PATH, TOKEN_REFRESH_PATH, LOGIN_PATH } from '@/app.constants';
import { User } from '../user.model';
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


  async getUserDetails(data: any) {
    await localforage.clear();
    localStorage.clear();
    return this.http.post(environment.API_ENDPOINT + LOGIN_PATH, data).toPromise();
  }

  isLoggedIn(): boolean {
    const jwtToken = localStorage.getItem(TOKEN);
    if (jwtToken) {
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(jwtToken);
      if (!isExpired) {
        return true;
      }
    }
    return false;
  }


  async isLoggedInAsync(): Promise<User | boolean> {
    try {
      const data = await localforage.getItem(TOKEN);
      if (data) {
        const helper = new JwtHelperService();
        const isExpired = helper.isTokenExpired((<string>data));
        const userData = helper.decodeToken(<string>data);
        const user = new User(+userData.user_id, userData.username, userData.email);
        if (!isExpired) {
          return user;
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  async logout() {
    localStorage.clear();
    await localforage.clear();
    this.router.navigate([DEFAULT_PATH]);
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
                if (error.status >= 400 && error.status < 500 ) {
                  this.router.navigate([DEFAULT_PATH]);
                  localforage.setItem(TOKEN, null);
                }
              }
            );
        }
      });
  }
}
