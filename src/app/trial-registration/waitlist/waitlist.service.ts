import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { EMAIL_REGISTRATION, GET_LINK_DATA } from '@/app.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WaitlistService {
  constructor(private http: HttpClient) {}
  participationID!: number;

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Cache-Control':
        'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
    }),
  };
  getLinkData(unique_code: string) {
    return this.http.get(
      environment.API_ENDPOINT + GET_LINK_DATA + unique_code,
      this.httpOptions,
    );
  }
}
