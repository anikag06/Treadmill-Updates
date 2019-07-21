import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { SupportGroupItem } from '@/main/support-groups/support-group-item.model';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Posting or creating a new comment
   * @param data
   */
  postComment(data: any) {
    return this.http.post(environment.API_ENDPOINT + '/api/v1/support-group/comment/', data);
  }

  /**
   * Getting main Commnets
   * @param sgi
   * @param page
   */
  getMainComments(sgi: SupportGroupItem, page = 1 ) {
    return this.http.get(environment.API_ENDPOINT + '/api/v1/support-group/comments/' + sgi.id + '/?page=' + page);
  }

  /**
   * Update Comment
   * @param comment_id
   * @param body
   */
  updateComment(comment_id: number, body: string) {
    return this.http.put(environment.API_ENDPOINT + '/api/v1/support-group/comment/' + comment_id + '/', { body: body });
  }

  /**
   * Delete a comment
   * @param comment_id
   */
  deleteComment(comment_id: number) {
    return this.http.delete(environment.API_ENDPOINT + '/api/v1/support-group/comment/' +  comment_id + '/');
  }

  /**
   * Posting a vote
   * @param data
   */
  voteComment(data: any) {
    return this.http.post(environment.API_ENDPOINT + '/api/v1/support-group/comment-vote/', data);
  }
}
