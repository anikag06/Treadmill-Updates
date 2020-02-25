import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { SIGN_UP_PATH, VERIFY_PARTICIPANT } from '@/app.constants';
import { SignUpData } from '@/pre-login/signup/signup-data.interface';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(private http: HttpClient) {}

  isParticipantValid(uniqueLink: string): Observable<any> {
    return this.http.get(
      environment.API_ENDPOINT + VERIFY_PARTICIPANT + uniqueLink + '/',
    );
  }

  signUpData(userSignUpData: SignUpData): Observable<any> {
    return this.http.post(
      environment.API_ENDPOINT + SIGN_UP_PATH,
      userSignUpData,
    );
  }
}
