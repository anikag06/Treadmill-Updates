import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { SupportGroupItem } from './support-group-item.model';
import { BehaviorSubject } from 'rxjs';


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
      console.log(params.toString())
    }
    return this.http.get(environment.API_ENDPOINT + '/api/v1/support-group/post-listing/', { params: params});
  }

  createPost(data: any) {
    return this.http.post(environment.API_ENDPOINT + '/api/v1/support-group/post/', data);
  }

  sendPost(post: SupportGroupItem) {
    this.supportGroupItem$.next(post);
  }
}
