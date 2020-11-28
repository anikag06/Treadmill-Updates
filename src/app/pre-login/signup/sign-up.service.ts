import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import {
  GET_SIGNUP_MAIL,
  SIGN_UP_PATH,
  USERNAME_AVAILABLE,
  VERIFY_PARTICIPANT,
} from '@/app.constants';
import { SignUpData } from '@/pre-login/signup/signup-data.interface';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Cache-Control':
        'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
    }),
  };
  isParticipantValid(uniqueLink: string): Observable<any> {
    return this.http.get(
      environment.API_ENDPOINT + VERIFY_PARTICIPANT + uniqueLink + '/',
      this.httpOptions,
    );
  }

  signUpData(userSignUpData: SignUpData): Observable<any> {
    return this.http.post(
      environment.API_ENDPOINT + SIGN_UP_PATH,
      userSignUpData,
    );
  }

  getSignupMail(email: string): Observable<any> {
    const sendData = { email_id: email };
    console.log('sign up email', sendData);
    return this.http.post(environment.API_ENDPOINT + GET_SIGNUP_MAIL, sendData);
  }

  usernameAvailabilityCheck(username: string) {
    return this.http.get(
      environment.API_ENDPOINT + USERNAME_AVAILABLE + username,
    );
  }
}
