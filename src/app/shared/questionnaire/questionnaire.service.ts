import {Injectable, EventEmitter, Output} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  QUESTIONNAIRE_LIST,
  QUESTIONNAIRE_RESULT_HISTORY,
  QUESTIONNAIRE_SUBMIT,
  TODOQUESTIONNAIRE_LIST,
  QUESTIONNAIRE_EMAIL_RESULT,
} from '@/app.constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuestionnaireItem } from '@/shared/questionnaire/shared/questionnaire.model';
import { Result } from '@/shared/questionnaire/shared/result.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  resultData!: Result;
  sendResultBehavior: BehaviorSubject<any> = new BehaviorSubject<any>(
    this.resultData
  );
 openListPage = new EventEmitter();
  sendResultEvent = this.sendResultBehavior.asObservable();
  constructor(private http: HttpClient) {}

  getQuestionnaires() {
    return this.http.get(environment.API_ENDPOINT + QUESTIONNAIRE_LIST);
  }

  getTodoQuestionnaires(username: string) {
    return this.http.get(environment.API_ENDPOINT + TODOQUESTIONNAIRE_LIST + username + '/');
  }

  getAQuestionnaire(Qid: number) {
    return this.http.get(environment.API_ENDPOINT + QUESTIONNAIRE_LIST + Qid);
  }

  postChoicesGetResults(
    questionnaire_id: number,
    username: any,
    ip_address: any,
    questionnaire_order: number,
    choices: []
  ) {
    console.log('from service api', QUESTIONNAIRE_SUBMIT);
    return this.http.post(environment.API_ENDPOINT + QUESTIONNAIRE_SUBMIT, {
      questionnaire_id: questionnaire_id,
      username: username,
      ip_address: ip_address,
      order: questionnaire_order,
      answers: choices,
    });
  }

  getResultHistory(username: string) {
    return this.http.get(
      environment.API_ENDPOINT + QUESTIONNAIRE_RESULT_HISTORY + username + '/'
    );
  }

  passResultData(data: any) {
    this.sendResultBehavior.next(data);
  }

  postEmailResult(
    emailId: string,
    html: string,
    qname: string,
    username: string
  ) {
    return this.http.post(
      environment.API_ENDPOINT + QUESTIONNAIRE_EMAIL_RESULT,
      {
        emailId: emailId,
        html: html,
        qname: qname,
        username: username,
      },
      {
        observe: 'response',
      }
    );
  }

  getPdf(html: string, qname: string) {
    const options = {
      params: new HttpParams({}),
      responseType: 'blob' as 'json',
    };

    // @ts-ignore
    return this.http
      .post(
        environment.API_ENDPOINT + '/multi-questionnaire/send-pdf/',
        {
          html: html,
          qname: qname,
        },
        options
      )
      .pipe(map((response: any) => response as Blob));
  }
}
