import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

import {
  TOKEN,
  DEFAULT_PATH,
  TOKEN_REFRESH_PATH,
  LOGIN_PATH,
  USERAVATAR,
  ISADMIN,
  ISACTIVE,
  INELIGIBLE_FOR_TRIAL,
  IS_EXP,
  ISLOGGEDIN,
  LOGGED_IN_PATH,
  USERNAME,
} from '@/app.constants';
import { User } from '@/shared/user.model';
import { BehaviorSubject } from 'rxjs';
export interface Token {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: User;
  online = new BehaviorSubject<boolean>(true);
  navbarTitle!: string;

  isUserExcluded = false; // to check whether the user is excluded for the study or not

  constructor(private http: HttpClient, private router: Router) {
    this.logoutCheck();
  }

  setLoginData(data: any) {
    try {
      window.localStorage.setItem(ISLOGGEDIN, 'true');
      window.localStorage.setItem(TOKEN, data.data.access_token);
      window.localStorage.setItem(ISADMIN, data.data.is_admin);
      window.localStorage.setItem(USERAVATAR, data.data.avatar);
      window.localStorage.setItem(ISACTIVE, data.data.is_active);
      window.localStorage.setItem(IS_EXP, data.data.is_exp);
      window.localStorage.setItem(USERNAME, data.data.username);
    } catch (e) {
      window.sessionStorage.setItem(ISLOGGEDIN, 'true');
      window.sessionStorage.setItem(TOKEN, data.data.access_token);
      window.sessionStorage.setItem(ISADMIN, data.data.is_admin);
      window.sessionStorage.setItem(USERAVATAR, data.data.avatar);
      window.sessionStorage.setItem(ISACTIVE, data.data.is_active);
      window.sessionStorage.setItem(IS_EXP, data.data.is_exp);
      window.sessionStorage.setItem(USERNAME, data.data.username);
    }
    this.getUserFromToken(
      data.data.access_token,
      data.data.avatar,
      data.data.is_admin,
      data.data.is_active,
      data.data.is_exp,
      data.data.username
    );
  }

  async getUserDetails(data: any) {
    window.localStorage.clear();
    window.sessionStorage.clear();
    return this.http
      .post(environment.API_ENDPOINT + LOGIN_PATH, data, {
        withCredentials: true,
      })
      .toPromise();
  }

  isLoggedIn() {
    if (this.user) {
      return this.user;
    } else {
      let data!: string | null;
      let avatar!: string | null;
      let isAdmin = false;
      let isActive = false;
      let isExp = false;
      let username: string | null;
      try {
        data = window.localStorage.getItem(TOKEN);
        avatar = window.localStorage.getItem(USERAVATAR);
        isAdmin = window.localStorage.getItem(ISADMIN) === 'true';
        isActive = window.localStorage.getItem(ISACTIVE) === 'true';
        isExp = window.localStorage.getItem(IS_EXP) === 'true';
        username = window.localStorage.getItem(USERNAME);
      } catch (e) {
        data = window.sessionStorage.getItem(TOKEN);
        avatar = window.sessionStorage.getItem(USERAVATAR);
        isAdmin = window.sessionStorage.getItem(ISADMIN) === 'true';
        isActive = window.sessionStorage.getItem(ISACTIVE) === 'true';
        isExp = window.sessionStorage.getItem(IS_EXP) === 'true';
        username = window.sessionStorage.getItem(USERNAME);
      }
      if (data && avatar && isActive && username) {
        return this.getUserFromToken(
          data,
          avatar,
          isAdmin,
          isActive,
          isExp,
          username
        );
      }
    }
  }

  getUserFromToken(
    data: any,
    avatar: string,
    isAdmin: boolean,
    isActive: boolean,
    isExp: boolean,
    username: string
  ) {
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(<string>data);
    const userData = helper.decodeToken(<string>data);
    const user = new User(
      +userData.user_id,
      username,
      avatar,
      isAdmin,
      isActive,
      isExp
    );
    if (!isExpired) {
      this.user = user;
      return user;
    }
  }

  async logout(showDefaultPage: boolean) {
    console.log('log out', showDefaultPage);
    delete this.user;
    localStorage.clear();
    if (showDefaultPage) {
      this.router.navigate([DEFAULT_PATH]);
    } else {
      this.router.navigate([INELIGIBLE_FOR_TRIAL]);
    }
  }

  refresh() {
    const accessToken = this.getToken();
    if (accessToken !== null) {
      this.http
        .get(environment.API_ENDPOINT + TOKEN_REFRESH_PATH, {
          withCredentials: true,
        })
        .subscribe(
          (data: any) => {
            window.localStorage.setItem(TOKEN, data.data.access);
          },
          (error: HttpErrorResponse) => {
            if (error.status >= 400 && error.status < 500) {
              this.router.navigate([DEFAULT_PATH]);
              window.localStorage.removeItem(TOKEN);
              window.localStorage.removeItem(ISLOGGEDIN);
              window.localStorage.removeItem(USERAVATAR);
              window.localStorage.removeItem(ISADMIN);
              window.localStorage.removeItem(ISACTIVE);
              window.localStorage.removeItem(IS_EXP);

              window.sessionStorage.removeItem(TOKEN);
              window.sessionStorage.removeItem(ISLOGGEDIN);
              window.sessionStorage.removeItem(USERAVATAR);
              window.sessionStorage.removeItem(ISADMIN);
              window.sessionStorage.removeItem(ISACTIVE);
              window.sessionStorage.removeItem(IS_EXP);
            } else if (error.status === 0) {
              this.updateOnline();
            } else {
              this.online.next(true);
            }
          }
        );
    }
  }

  getToken() {
    return (
      window.localStorage.getItem(TOKEN) || window.sessionStorage.getItem(TOKEN)
    );
  }

  updateOnline() {
    this.online.next(false);
    // console.log(this.online);
  }

  returnOnline() {
    return this.online;
  }

  private logoutCheck() {
    window.addEventListener(
      'storage',
      (event) => {
        if (
          event.storageArea === localStorage &&
          event.storageArea.games === undefined
        ) {
          const isLoggedIn = window.localStorage.getItem(ISLOGGEDIN);
          if (
            isLoggedIn === null ||
            isLoggedIn === undefined ||
            isLoggedIn === 'false'
          ) {
            window.location.href = DEFAULT_PATH;
          } else {
            window.location.href = LOGGED_IN_PATH;
          }
        }
      },
      false
    );
  }
}
