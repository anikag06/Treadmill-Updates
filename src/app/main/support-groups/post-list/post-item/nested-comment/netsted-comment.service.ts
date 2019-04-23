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
    return this.http.get(environment.API_ENDPOINT + '/api/v1/support-group/nested-comments/' + comment.id + '/?page=' + pageNo);
  }

  postNestedComments(data: any) {
    return this.http.post(environment.API_ENDPOINT + '/api/v1/support-group/nested-comment/', data);
  }

  /**
   * Update comment
   * @param comment_id
   * @param body
   */
  editNestedComment(comment_id: number, body: string) {
    return this.http.put(environment.API_ENDPOINT + '/api/v1/support-group/nested-comment/' + comment_id + '/', { body: body });
  }

  /**
   * Delete comment
   * @param comment_id
   */
  deleteNestedComment(comment_id: number) {
    return this.http.delete(environment.API_ENDPOINT + '/api/v1/support-group/nested-comment/' + comment_id + '/');
  }

  /**
   * Posting a vote
   * @param data
   */
  voteComment(data: any) {
    return this.http.post(environment.API_ENDPOINT + '/api/v1/support-group/nested-comment-vote/', data);
  }
}
