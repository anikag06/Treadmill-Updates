import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {QUESTIONNAIRE_LIST} from "@/app.constants";

@Injectable({
  providedIn: 'root',
})

export class QuestionnaireService {

  constructor(private http: HttpClient) {}

  getQuestionnaires(){
    return this.http.get(
      environment.API_ENDPOINT + QUESTIONNAIRE_LIST
    );
  }

  postChoicesGetResults() {
    // return this.http.post
  }
}
