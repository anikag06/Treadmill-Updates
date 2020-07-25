import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {EMAIL_REGISTRATION, GET_LINK_DATA} from '@/app.constants';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WaitlistService {

  constructor(private http: HttpClient) { }
  participationID!: number;

  getLinkData(unique_code: string) {
    return this.http.get(
      environment.API_ENDPOINT + GET_LINK_DATA + unique_code,
    );
  }
}
