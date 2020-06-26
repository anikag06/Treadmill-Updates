import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {FORGOT_PASSWORD_PATH, FORGOT_USERNAME_PATH} from '@/app.constants';

@Injectable({
  providedIn: 'root'
})

export class MatLoginDialogService {
  constructor(
    private http: HttpClient
  ) {}

  forgotUsernameRequest(email_id: string) {
    return this.http.get(environment.API_ENDPOINT + FORGOT_USERNAME_PATH + email_id );
  }

  forgotPasswordRequest(email_id: string) {
    return this.http.get(environment.API_ENDPOINT + FORGOT_PASSWORD_PATH + email_id );
  }
}
