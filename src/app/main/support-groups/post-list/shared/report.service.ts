import {EventEmitter, Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {
  COMMENT_COMPLAINT,
  COMMENT_THANK,
  NESTED_COMMENT_COMPLAINT,
  NESTED_COMMENT_THANK,
  POST_COMPLAINT,
  POST_THANK
} from '@/app.constants';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  thanked = new EventEmitter<any>();
  constructor(private http: HttpClient) { }



  post_complaint(id: number, reason: string, is_suicidal: boolean) {
    const complaint_data = { post_id: id, reason: reason, is_suicidal: is_suicidal};
    console.log('post complaint', complaint_data);
    return this.http.post(
      environment.API_ENDPOINT + POST_COMPLAINT,
      complaint_data
    );
  }
  nested_comment_complaint(id: number, reason: string, is_suicidal: boolean) {
    const complaint_data = { post_id: id, reason: reason, is_suicidal: is_suicidal};
    console.log('nested_comment complaint', complaint_data);
    return this.http.post(
      environment.API_ENDPOINT + NESTED_COMMENT_COMPLAINT,
      complaint_data
    );
  }
  comment_complaint(id: number, reason: string, is_suicidal: boolean) {
    const complaint_data = { post_id: id, reason: reason, is_suicidal: is_suicidal};
    console.log('comment complaint', complaint_data);
    return this.http.post(
      environment.API_ENDPOINT + COMMENT_COMPLAINT,
      complaint_data
    );
  }

  post_thank_you( id: number, type: string) {
    const thank_data = { post_id: id };
    console.log('POST', thank_data);
    return this.http.post(
        environment.API_ENDPOINT + POST_THANK,
        thank_data,
      );
  }
  nested_comment_thank_you( id: number ) {
    const data = { nested_comment_id: id };
    console.log('nested_comment', data);
    return this.http.post(
      environment.API_ENDPOINT + NESTED_COMMENT_THANK,
      data
    );
  }
  comment_thank_you( id: number, is_thanked: number ) {
    const data = { comment_id: id , is_thanked: is_thanked};
    console.log('comment' , data);
    return this.http.post(
      environment.API_ENDPOINT + COMMENT_THANK,
     data
    );
  }


}
