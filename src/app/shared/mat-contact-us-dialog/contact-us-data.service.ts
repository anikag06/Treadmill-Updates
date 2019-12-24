import { Injectable } from '@angular/core';
import { ContactUsData } from './contact-us-data.interface';
import { environment } from 'environments/environment';
import { CONTACT_US_DATA } from '@/app.constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactUsDataService {

  constructor(
    private http: HttpClient,
  ) { }


  saveContactUsData(contactUsData: ContactUsData) {
    console.log('data saved is', contactUsData);
    return this.http.post(environment.API_ENDPOINT + CONTACT_US_DATA, contactUsData);
  }
}
