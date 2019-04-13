import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as localforage from 'localforage';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

import { TOKEN, DEFAULT_PATH, TOKEN_REFRESH_PATH, LOGIN_PATH, USERAVATAR } from '@/app.constants';
import { User } from '../user.model';
import { LocalStorageService } from '../localstorage.service';
export interface Token {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) { }


  async getUserDetails(data: any) {
    await localforage.clear();
    localStorage.clear();
    return this.http.post(environment.API_ENDPOINT + LOGIN_PATH, data).toPromise();
  }


  isLoggedIn() {
    const data = localStorage.getItem(TOKEN);
    const avatar = localStorage.getItem(USERAVATAR);
    if (data && avatar) {
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired((<string>data));
      const userData = helper.decodeToken(<string>data);
      const user = new User(+userData.user_id, userData.username, userData.email, avatar);
      if (isExpired === false) {
        return user;
      }
    }
   }

    async logout() {
      localStorage.clear();
      await localforage.clear();
      this.router.navigate([DEFAULT_PATH]);
    }

    refresh() {
      const token = localStorage.getItem(TOKEN);
      if (token != null) {
        this.http.post<Token>(environment.API_ENDPOINT + TOKEN_REFRESH_PATH, { 'token': token })
          .subscribe(
            (data) => {
              localStorage.setItem(TOKEN, data.token);
            },
            (error: HttpErrorResponse) => {
              if (error.status >= 400 && error.status < 500) {
                this.router.navigate([DEFAULT_PATH]);
                localforage.setItem(TOKEN, null);
              }
            }
        );
      }
    }
  }
