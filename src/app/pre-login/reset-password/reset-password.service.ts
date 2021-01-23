import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RESET_LINK_VALIDITY_SET_NEW_PASSWORD } from '@/app.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  constructor(private http: HttpClient) {}

  linkValidityCheck(uniqueCode: string) {
    return this.http.get(
      environment.API_ENDPOINT +
        RESET_LINK_VALIDITY_SET_NEW_PASSWORD +
        uniqueCode,
    );
  }

  resetPasswordSubmitted(new_password: any, uniqueLink: string) {
    return this.http.post(
      environment.API_ENDPOINT +
        RESET_LINK_VALIDITY_SET_NEW_PASSWORD +
        uniqueLink,
      {
        new_password: new_password,
      },
    );
  }
}
