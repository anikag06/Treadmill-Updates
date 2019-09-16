import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {Response} from './conversations/response/response.model';
import { environment } from 'environments/environment';



@Injectable()
export class ConversationsService {
  f!: {
    time_taken_to_complete_in_seconds: number,
    speed_run: boolean,
    completion_datetime: any
  };

  constructor(private http: HttpClient) { }

  getConversationGroup(id: number) {
    return this.http.get(environment.API_ENDPOINT + '/api/v1/flow/steps/' + id + '/');
  }

  get(url: string) {
    return this.http.get(url);
  }

  post_response(response: Response) {
    this.http.post(
      environment.API_ENDPOINT + '/api/v1/conversation/response/',
      response
      ).subscribe(responseData => {
      });
  }

  create_history (conversation: number) {
      const object = {
          conversation_id : conversation
      };
    this.http.post(
      environment.API_ENDPOINT + '/api/v1/conversation/history/',
        object
      ).subscribe(responseData => {
      });
  }

  completed (time_taken_to_complete_in_seconds: number, history_id: number, speed_run: boolean, completion: boolean) {
      if (completion === true) {
        const completion_datetime = new Date();
         const f = {
           completion_datetime,
           time_taken_to_complete_in_seconds,
           speed_run,
         };
         this.http.put(
          environment.API_ENDPOINT + '/api/v1/conversation/history/' + history_id + '/',
          f
         ).subscribe(responseData => {
          console.log(responseData);
         });
      } else {
        const f = {
          time_taken_to_complete_in_seconds,
          speed_run,
        };
        console.log(time_taken_to_complete_in_seconds);
        this.http.put(
          environment.API_ENDPOINT + '/api/v1/conversation/history/' + history_id + '/',
         f
        ).subscribe(responseData => {
          console.log(responseData);
        });
      }


  }
}
