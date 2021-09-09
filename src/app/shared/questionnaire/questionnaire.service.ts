import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  QUESTIONNAIRE_EMAIL_RESULT,
  QUESTIONNAIRE_LIST,
  QUESTIONNAIRE_RESULT_HISTORY,
  QUESTIONNAIRE_SUBMIT,
} from '@/app.constants';
import { BehaviorSubject } from 'rxjs';
import { QuestionnaireItem } from '@/shared/questionnaire/shared/questionnaire.model';
import { Result } from '@/shared/questionnaire/shared/result.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  resultData!: Result;
  sendResultBehavior: BehaviorSubject<any> = new BehaviorSubject<any>(
    this.resultData
  );
  sendResultEvent = this.sendResultBehavior.asObservable();
  constructor(private http: HttpClient) {}

  getQuestionnaires() {
    return this.http.get(environment.API_ENDPOINT + QUESTIONNAIRE_LIST);
  }

  getAQuestionnaire(Qid: number) {
    return this.http.get(environment.API_ENDPOINT + QUESTIONNAIRE_LIST + Qid);
  }

  postChoicesGetResults(
    questionnaire_id: number,
    username: string,
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
}
