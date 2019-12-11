import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { EMAIL_REGISTRATION } from '@/app.constants';

@Injectable({
  providedIn: 'root'
})
export class RegistrationDataService {

  constructor(
    private http: HttpClient,
  ) { }

  putEmailID(emailID: any) {
    console.log('sending email', emailID);
    console.log('api url', environment.API_ENDPOINT + EMAIL_REGISTRATION);
    return this.http.put(environment.API_ENDPOINT + EMAIL_REGISTRATION, emailID);
  }
}
