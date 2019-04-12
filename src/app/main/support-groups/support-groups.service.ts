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

  constructor(
    private http: HttpClient
  ) { }

  getPosts(page: number = 1, tags: string | null) {
    let params = new HttpParams().set('page', page.toString());
    if (tags != null) {
      params = params.append('tags', tags);
    }
    return this.http.get(environment.API_ENDPOINT + '/api/v1/support-group/post-listing/', { params: params});
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


  async deletePost(data: any) {
    const xhr = new XMLHttpRequest();
    const token = await this.tokenGetter()
    xhr.open('DELETE', environment.API_ENDPOINT + '/api/v1/support-group/post/');
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.send(JSON.stringify(data));
    return xhr;
  }

  editPost(data: any) {
    return this.http.put(environment.API_ENDPOINT + '/api/v1/support-group/post/', data)
  }
}
