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
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "@/shared/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  thanked = new EventEmitter<any>();
  replythanked = new EventEmitter<any>();
  commentthanked = new EventEmitter<any>();
  constructor(private http: HttpClient,
              private authService: AuthService) { }

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: 'Bearer ' + this.authService.getToken(),
  //   }),
  // };

  post_complaint(data: any) {
    return this.http.post(
      environment.API_ENDPOINT + POST_COMPLAINT, data
    );
  }
  nested_comment_complaint(data: any) {
    return this.http.post(
      environment.API_ENDPOINT + NESTED_COMMENT_COMPLAINT, data
    );
  }
  comment_complaint(data: any) {
    return this.http.post(
      environment.API_ENDPOINT + COMMENT_COMPLAINT, data
    );
  }

  postThankYou(id: number) {
    return this.http.post(
        environment.API_ENDPOINT + POST_THANK,
      {post_id: id},
      );
  }
  nestedCommentThankYou( id: number ) {
    return this.http.post(
      environment.API_ENDPOINT + NESTED_COMMENT_THANK,
      {nested_comment_id: id},
    );
  }
  commentThankYou( id: number) {
       return this.http.post(
      environment.API_ENDPOINT + COMMENT_THANK,
         {comment_id: id},
       );
  }
}
