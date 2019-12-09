import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Response } from './input/response';
import { GadResponse } from './input/gad_response';
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

  post_phq(response: Response) {
    console.log('data sent', response);
    this.http.post(
      environment.API_ENDPOINT + '/api/v1/questionnaire/phq-user-response/',
      response
      ).subscribe(responseData => {
        console.log(responseData);
      });
  }
  post_gad(response: GadResponse) {
    return this.http.post(
      environment.API_ENDPOINT + '/api/v1/questionnaire/gad-user-response/',
      response
      );
    }

}
