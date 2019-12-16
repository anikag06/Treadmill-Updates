import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { QuesUserResponseArray } from './input/response';
import { environment } from 'environments/environment';


@Injectable()
export class QuizService {

  questionnaireActive = false;

  constructor(
    private http: HttpClient,
  ) { }

  get(url: string) {
    return this.http.get(url);
  }

  post_phq(response: QuesUserResponseArray) {
    console.log('phq data sent', response);
    this.http.post(
      environment.API_ENDPOINT + '/api/v1/questionnaire/phq-user-response/',
      response
      ).subscribe(responseData => {
        console.log(responseData);
      });
  }
  post_gad(response: QuesUserResponseArray) {
    console.log('send gad data', response);
    return this.http.post(
      environment.API_ENDPOINT + '/api/v1/questionnaire/gad-user-response/',
      response
      );
    }

}
