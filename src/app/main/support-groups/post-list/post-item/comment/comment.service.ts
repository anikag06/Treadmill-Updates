import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.prod';
import { SupportGroupItem } from '@/main/support-groups/support-group-item.model';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient
  ) { }


  postComment(data: any) {
    return this.http.post(environment.API_ENDPOINT + '/api/v1/support-group/post-comment-create/', data);
  }

  getMainComments(post: SupportGroupItem, page = 1 ) {
    return this.http.get(environment.API_ENDPOINT + '/api/v1/support-group/post-comment-listing/' + post.id + '/?page=' + page)
  }
}
