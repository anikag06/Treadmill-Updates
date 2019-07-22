import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Response } from './input/response';
import { GadResponse } from './input/gad_response';


@Injectable()
export class QuizService {

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(url);
  }

  post_phq(response: Response) {
    this.http.post(
      'http://172.26.90.49:9000/api/v1/questionnaire/phq-user-response/',
      response
      ).subscribe(responseData => {
        console.log(responseData);
      });
  }
  post_gad(response: GadResponse) {
    this.http.post(
      'http://172.26.90.49:9000/api/v1/questionnaire/gad-user-response/',
      response
      ).subscribe(responseData => {
        console.log(responseData);
      });
    }

}
