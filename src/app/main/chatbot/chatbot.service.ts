import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  constructor(private http: HttpClient) {}
  nowdateTime = Date.now();

  postPreviousChat(currentDateTime: any) {
    const dateTime = moment.utc(currentDateTime).format('DD/MM/YY+HH:mm:ss');
    return this.http.post(
      environment.CHATBOT_API +
        '/api/v1/chat/resume-chat/' +
        '?page=1&' +
        'date_time=' +
        dateTime,
      {},
    );
  }

  loadPreviousChat(page: number, currentDateTime: any) {
    const dateTime = moment.utc(currentDateTime).format('DD/MM/YY+HH:mm:ss');
    console.log('page no ' + page);
    return this.http.post(
      environment.CHATBOT_API +
        '/api/v1/chat/resume-chat/' +
        '?page=' +
        page +
        '&date_time=' +
        dateTime,
      {},
    );
  }
}
