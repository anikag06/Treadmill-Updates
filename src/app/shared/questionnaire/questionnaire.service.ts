import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { QuesUserResponseArray, SIQResponseData } from './input/response';
import { environment } from 'environments/environment';
import { USER_PHQ_DATA, USER_GAD_DATA, USER_SIQ_DATA } from '@/app.constants';


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
    this.http.post( environment.API_ENDPOINT + USER_PHQ_DATA, response)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  post_gad(response: QuesUserResponseArray) {
    console.log('send gad data', response);
    return this.http.post(environment.API_ENDPOINT + USER_GAD_DATA, response);
  }

  post_siq(response: SIQResponseData) {
    console.log('post siq', response);
    return this.http.post(environment.API_ENDPOINT + USER_SIQ_DATA, response);
  }
}
