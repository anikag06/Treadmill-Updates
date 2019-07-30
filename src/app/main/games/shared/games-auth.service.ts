import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import {TOKEN,
  ECG_DISCIMINATION_TASK,
  ECG_FLANKER_TASK,
        ECG_GAME_DATA,
        ECG_USER_DATA} from '@/app.constants';

@Injectable({
  providedIn: 'root'
})
export class GamesAuthService {

  constructor(private http: HttpClient) { }


  ecGameGetUserData() {
    const loginToken = localStorage.getItem(TOKEN);
    if (loginToken != null) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + loginToken
        })
      };
      return this.http.get(environment.API_ENDPOINT + ECG_USER_DATA);
    } else {
      return this.http.get(environment.API_ENDPOINT + ECG_USER_DATA);
    }
  }
}
