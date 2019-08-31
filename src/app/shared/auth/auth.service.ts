import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

import { TOKEN,
  DEFAULT_PATH,
  TOKEN_REFRESH_PATH,
  LOGIN_PATH, SIGNUP_PATH,
  USERAVATAR,
  ISADMIN,
  ISACTIVE
} from '@/app.constants';
import { User } from '@/shared/user.model';
import { Observable } from 'rxjs';
export interface Token {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user!: User;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  setLoginData(data: any) {
    try {
      window.localStorage.setItem(TOKEN, data.data.token);
      window.localStorage.setItem(ISADMIN, data.data.is_admin);
      window.localStorage.setItem(USERAVATAR, data.data.avatar);
      window.localStorage.setItem(ISACTIVE, data.data.is_active);
    } catch (e) {
      window.sessionStorage.setItem(TOKEN, data.data.token);
      window.sessionStorage.setItem(ISADMIN, data.data.is_admin);
      window.sessionStorage.setItem(USERAVATAR, data.data.avatar);
      window.sessionStorage.setItem(ISACTIVE, data.data.is_active);
    }
    this.getUserFromToken(data.data.token, data.data.avatar, data.data.is_admin, data.data.is_active);
  }


  async getUserDetails(data: any) {
    window.localStorage.clear();
    window.sessionStorage.clear();
    return this.http.post(environment.API_ENDPOINT + LOGIN_PATH, data).toPromise();
  }

  signupData (userSignupData: any): Observable<any> {
    return this.http.post(environment.API_ENDPOINT + SIGNUP_PATH, userSignupData);
  }


  isLoggedIn() {
    if (this.user) {
      return this.user;
    } else {
      let data!: string | null;
      let avatar!: string | null;
      let isAdmin = false;
      let isActive = false;
      try {
        data = window.localStorage.getItem(TOKEN);
        avatar = window.localStorage.getItem(USERAVATAR);
        isAdmin = (window.localStorage.getItem(ISADMIN) == 'true');
        isActive = (window.localStorage.getItem(ISACTIVE) == 'true');
      } catch (e) {
        data = window.sessionStorage.getItem(TOKEN);
        avatar = window.sessionStorage.getItem(USERAVATAR);
        isAdmin = (window.sessionStorage.getItem(ISADMIN) == 'true');
        isActive = (window.sessionStorage.getItem(ISACTIVE) == 'true');
      }
      if (data && avatar && isActive) {
        return this.getUserFromToken(data, avatar, isAdmin, isActive);
      }
    }
  }

  getUserFromToken(data: any, avatar: string, isAdmin: boolean, isActive: boolean) {
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired((<string>data));
    const userData = helper.decodeToken(<string>data);
    const user = new User(+userData.user_id, userData.username, userData.email, avatar, isAdmin, isActive);
    if (isExpired === false) {
      this.user = user;
      return user;
    }
  }

  async logout() {
    delete this.user;
    localStorage.clear();
    this.router.navigate([DEFAULT_PATH]);
  }

  refresh() {
    const token = this.getToken();
    if (token != null) {
      this.http.post<Token>(environment.API_ENDPOINT + TOKEN_REFRESH_PATH, { 'token': token })
        .subscribe(
          (data) => {
            localStorage.setItem(TOKEN, data.token);
          },
          (error: HttpErrorResponse) => {
            if (error.status >= 400 && error.status < 500) {
              this.router.navigate([DEFAULT_PATH]);
              window.localStorage.removeItem(TOKEN);
              window.localStorage.removeItem(USERAVATAR);
              window.localStorage.removeItem(ISADMIN);
              window.localStorage.removeItem(ISACTIVE);

              window.sessionStorage.removeItem(TOKEN);
              window.sessionStorage.removeItem(USERAVATAR);
              window.sessionStorage.removeItem(ISADMIN);
              window.sessionStorage.removeItem(ISACTIVE);
            }
          }
        );
    }
  }

  getToken() {
    return window.localStorage.getItem(TOKEN) || window.sessionStorage.getItem(TOKEN);
  }
}
