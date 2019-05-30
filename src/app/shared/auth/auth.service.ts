import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as localforage from 'localforage';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

import { TOKEN,
  DEFAULT_PATH,
  TOKEN_REFRESH_PATH,
  LOGIN_PATH, SIGNUP_PATH,
  USERAVATAR,
  ISADMIN,
  ISACTIVE,
  GAD_SEVEN_SCORE,
  PHQ_NINE_SCORE } from '@/app.constants';
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


  async getUserDetails(data: any) {
    await localforage.clear();
    localStorage.clear();
    return this.http.post(environment.API_ENDPOINT + LOGIN_PATH, data).toPromise();
  }
  signupData (userSignupData: any): Observable<any> {
    return this.http.post(environment.API_ENDPOINT + SIGNUP_PATH, userSignupData);
  }
  // function for getting the questionnaire scores of the user
  getPhqScores(): Observable<any>  {
    const loginToken = localStorage.getItem(TOKEN);
    if (loginToken != null) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + loginToken
        })
      };
      return this.http.get(environment.API_ENDPOINT + PHQ_NINE_SCORE, httpOptions);
    } else {
      return this.http.get(environment.API_ENDPOINT + PHQ_NINE_SCORE);
    }

  }
  getGadScores(): Observable<any>  {
    const loginToken = localStorage.getItem(TOKEN);
    if (loginToken != null) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + loginToken
        })
      };
      return this.http.get(environment.API_ENDPOINT + GAD_SEVEN_SCORE, httpOptions);
    } else {
      return this.http.get(environment.API_ENDPOINT + GAD_SEVEN_SCORE);
    }

  }

  isLoggedIn() {
    if (this.user) {
      return this.user;
    } else {
      const data = localStorage.getItem(TOKEN);
      const avatar = localStorage.getItem(USERAVATAR);
      const isAdmin = (localStorage.getItem(ISADMIN) == 'true');
      const isActive = (localStorage.getItem(ISACTIVE) == 'true');
      if (data && avatar && isActive) {
        const helper = new JwtHelperService();
        const isExpired = helper.isTokenExpired((<string>data));
        const userData = helper.decodeToken(<string>data);
        const user = new User(+userData.user_id, userData.username, userData.email, avatar, isAdmin, isActive);
        if (isExpired === false) {
          this.user = user;
          return user;
        }
      }
    }
  }

  async logout() {
    delete this.user;
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
              localStorage.removeItem(TOKEN);
              localStorage.removeItem(USERAVATAR);
              localStorage.removeItem(ISADMIN);
              localStorage.removeItem(ISACTIVE);
            }
          }
        );
    }
  }
}
