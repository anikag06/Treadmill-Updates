import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserComment } from '../comment/user-comment.model';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NetstedCommentService {

  constructor(
    private http: HttpClient
  ) { }


  getNestedComments(comment: UserComment, pageNo: number) {
    return this.http.get(environment.API_ENDPOINT + '/api/v1/support-group/nested-comment-listing/' + comment.id + '/?page=' + pageNo);
  }

  postNestedComments(data: any) {
    return this.http.post(environment.API_ENDPOINT + '/api/v1/support-group/nested-comment-create/', data);
  }
}
