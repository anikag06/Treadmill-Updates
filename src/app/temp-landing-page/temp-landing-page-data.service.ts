import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {EMAIL_REGISTRATION} from '@/app.constants';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TempLandingPageDataService {

  constructor(private http: HttpClient) { }

  storeEmailID(emailID: any) {
    console.log('sending email', emailID);
    const sendData = { email: emailID };
    return this.http.post(
      environment.API_ENDPOINT +  '/api/v1/trial-iitk/subscribe/',
      sendData,
    );
  }
}
