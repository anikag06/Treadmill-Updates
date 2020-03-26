import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  disableLinks = new EventEmitter();
  enableLinks = new EventEmitter();

  constructor(private http: HttpClient) {}

  getSurveyData(): Observable<any> {
    return this.http.get(
      environment.API_ENDPOINT + '/api/v1/survey/get-questions-options/',
    );
  }

  storeUserResponse(data: any): Observable<any> {
    return this.http.post(
      environment.API_ENDPOINT + '/api/v1/survey/save-survey-response/',
      data,
    );
  }
}
