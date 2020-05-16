import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuesUserResponseArray } from './input/response';
import { environment } from 'environments/environment';
import { USER_PHQ_DATA, USER_GAD_DATA, USER_SIQ_DATA } from '@/app.constants';

@Injectable()
export class QuizService {
  questionnaireActive = false;
  questionnaire_name!: string;
  disableLinks = new EventEmitter();
  enableLinks = new EventEmitter();

  constructor(private http: HttpClient) {}

  get(url: string) {
    return this.http.get(url);
  }

  post_phq(response: QuesUserResponseArray) {
    console.log('phq data sent', response);
    return this.http.post(environment.API_ENDPOINT + USER_PHQ_DATA, response);
  }

  post_gad(response: QuesUserResponseArray) {
    console.log('send gad data', response);
    return this.http.post(environment.API_ENDPOINT + USER_GAD_DATA, response);
  }

  post_siq(response: QuesUserResponseArray) {
    console.log('post siq', response);
    return this.http.post(environment.API_ENDPOINT + USER_SIQ_DATA, response);
  }
}
