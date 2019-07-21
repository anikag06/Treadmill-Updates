import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(
    private http: HttpClient
  ) { }


  postPreviousChat() {
    return this.http.post(environment.API_ENDPOINT + '/api/v1/chat/resume-chat/', {})
  }
}
