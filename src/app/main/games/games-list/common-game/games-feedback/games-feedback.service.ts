import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { GAMES_FEEDBACK_DATA } from '@/app.constants';


@Injectable({
  providedIn: 'root'
})
export class GamesFeedbackService {

  ask_feedback!: boolean;
  feedback = new EventEmitter<any>();
  constructor(private http: HttpClient) { }

  sendFeedback(data: any) {
    console.log('feedback data', data);
    return this.http.post(environment.API_ENDPOINT + GAMES_FEEDBACK_DATA, data);
  }
}
