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
  SIGNUP_PATH,
  USERAVATAR,
  ISADMIN,
  ISACTIVE,
  INELIGIBLE_FOR_TRIAL,
  IS_EXP,
} from '@/app.constants';
import { User } from '@/shared/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
export interface Token {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user!: User;
  online = new BehaviorSubject<boolean>(true);
  navbarTitle!: string;

  isUserExcluded = false; // to check whether the user is excluded for the study or not

  constructor(private http: HttpClient, private router: Router) { }

  setLoginData(data: any) {
    try {
      window.localStorage.setItem(TOKEN, data.data.token);
      window.localStorage.setItem(ISADMIN, data.data.is_admin);
      window.localStorage.setItem(USERAVATAR, data.data.avatar);
      window.localStorage.setItem(ISACTIVE, data.data.is_active);
      window.localStorage.setItem(IS_EXP, data.data.is_exp);
    } catch (e) {
      window.sessionStorage.setItem(TOKEN, data.data.token);
      window.sessionStorage.setItem(ISADMIN, data.data.is_admin);
      window.sessionStorage.setItem(USERAVATAR, data.data.avatar);
      window.sessionStorage.setItem(ISACTIVE, data.data.is_active);
      window.sessionStorage.setItem(IS_EXP, data.data.is_exp);
    }
    this.getUserFromToken(
      data.data.token,
      data.data.avatar,
      data.data.is_admin,
      data.data.is_active,
      data.data.is_exp,
    );
  }

  async getUserDetails(data: any) {
    window.localStorage.clear();
    window.sessionStorage.clear();
    return this.http
      .post(environment.API_ENDPOINT + LOGIN_PATH, data)
      .toPromise();
  }

  signupData(userSignupData: any): Observable<any> {
    return this.http.post(
      environment.API_ENDPOINT + SIGNUP_PATH,
      userSignupData,
    );
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
      try {
        data = window.localStorage.getItem(TOKEN);
        avatar = window.localStorage.getItem(USERAVATAR);
        isAdmin = window.localStorage.getItem(ISADMIN) === 'true';
        isActive = window.localStorage.getItem(ISACTIVE) === 'true';
        isExp = window.localStorage.getItem(IS_EXP) === 'true';
      } catch (e) {
        data = window.sessionStorage.getItem(TOKEN);
        avatar = window.sessionStorage.getItem(USERAVATAR);
        isAdmin = window.sessionStorage.getItem(ISADMIN) === 'true';
        isActive = window.sessionStorage.getItem(ISACTIVE) === 'true';
        isExp = window.sessionStorage.getItem(IS_EXP) === 'true';
      }
      if (data && avatar && isActive) {
        return this.getUserFromToken(data, avatar, isAdmin, isActive, isExp);
      }
    }
  }

  getUserFromToken(
    data: any,
    avatar: string,
    isAdmin: boolean,
    isActive: boolean,
    isExp: boolean,
  ) {
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(<string>data);
    const userData = helper.decodeToken(<string>data);
    const user = new User(
      +userData.user_id,
      userData.username,
      userData.email,
      avatar,
      isAdmin,
      isActive,
      isExp,
    );
    if (isExpired === false) {
      this.user = user;
      return user;
    }
  }

  async logout(showDefaultPage: boolean) {
    console.log('log out', showDefaultPage);
    delete this.user;
    localStorage.clear();
    if (showDefaultPage) {
      console.log('navigate to:', DEFAULT_PATH);
      this.router.navigate([DEFAULT_PATH]);
    } else {
      console.log('navigate to;', INELIGIBLE_FOR_TRIAL);
      this.router.navigate([INELIGIBLE_FOR_TRIAL]);
    }
  }

  refresh() {
    const token = this.getToken();
    if (token != null) {
      this.http
        .post<Token>(environment.API_ENDPOINT + TOKEN_REFRESH_PATH, {
          token: token,
        })
        .subscribe(
          data => {
            localStorage.setItem(TOKEN, data.token);
          },
          (error: HttpErrorResponse) => {
            if (error.status >= 400 && error.status < 500) {
              this.router.navigate([DEFAULT_PATH]);
              window.localStorage.removeItem(TOKEN);
              window.localStorage.removeItem(USERAVATAR);
              window.localStorage.removeItem(ISADMIN);
              window.localStorage.removeItem(ISACTIVE);
              window.localStorage.removeItem(IS_EXP);

              window.sessionStorage.removeItem(TOKEN);
              window.sessionStorage.removeItem(USERAVATAR);
              window.sessionStorage.removeItem(ISADMIN);
              window.sessionStorage.removeItem(ISACTIVE);
              window.sessionStorage.removeItem(IS_EXP);
            } else if (error.status === 0) {
              this.updateOnline();
            } else {
              this.online.next(true);
            }
          },
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
}
