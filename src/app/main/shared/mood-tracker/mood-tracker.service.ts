import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FEELING_LIST_API } from '@/app.constants';
import {AuthService} from '@/shared/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MoodTrackerService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getFeelingsList() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    };
    return this.http
      .get(environment.API_ENDPOINT + FEELING_LIST_API, httpOptions)
      .toPromise();
  }
}
