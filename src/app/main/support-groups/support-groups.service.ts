import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { SupportGroupItem } from './support-group-item.model';
import { BehaviorSubject } from 'rxjs';
import * as localforage from 'localforage';
import { TOKEN } from '@/app.constants';


@Injectable({
  providedIn: 'root'
})
export class SupportGroupsService {

  supportGroupItem$ = new BehaviorSubject({} as SupportGroupItem);
  supportGroupItemUpdated$ = new BehaviorSubject({} as SupportGroupItem);


  constructor(
    private http: HttpClient
  ) { }

  getPosts(page: number = 1, tags: string | string[] | null) {
    let params = new HttpParams().set('page', page.toString());
    if (tags != null) {
     if (typeof(tags) === 'string') {
        params = params.append('tags', tags);
     } else {
      const tagsStr = tags.join(',');
      params = params.append('tags', tagsStr);
     }
    }
    return this.http.get(environment.API_ENDPOINT + '/api/v1/support-group/posts/', { params: params});
  }

  createPost(data: any) {
    return this.http.post(environment.API_ENDPOINT + '/api/v1/support-group/post/', data);
  }

  sendPost(post: SupportGroupItem) {
    this.supportGroupItem$.next(post);
  }

  tokenGetter(): Promise<string> {
    return localforage.getItem(TOKEN);
  }


  deletePost(data: any) {
    return this.http.delete(environment.API_ENDPOINT + '/api/v1/support-group/post/' + data.post_id + '/');
  }

  editPost(data: any) {
    return this.http.put(environment.API_ENDPOINT + '/api/v1/support-group/post/' + data.id + '/', data);
  }

  sendUpdated(data: any) {
    this.supportGroupItemUpdated$.next(data);
  }

  postUpVote(data: any) {
    return this.http.post(environment.API_ENDPOINT + '/api/v1/support-group/post-vote/', data);
  }
}
