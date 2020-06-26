import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { SupportGroupItem } from './support-group-item.model';
import { BehaviorSubject } from 'rxjs';
import * as localforage from 'localforage';
import { PERSONLISE_POST, TOKEN } from '@/app.constants';
import { UserProfile } from '../shared/user-profile/UserProfile.model';

@Injectable({
  providedIn: 'root',
})
export class SupportGroupsService {
  supportGroupItem$ = new BehaviorSubject({} as SupportGroupItem);
  supportGroupItemUpdated$ = new BehaviorSubject({} as SupportGroupItem);
  userProfileData = new UserProfile('Name', '', 0, 0, 0, 0);

  constructor(private http: HttpClient) {}

  getPosts(page: number = 1, tags: string[] | null, search: string) {
    let params = new HttpParams().set('page', page.toString());
    if (tags != null && tags.length > 0) {
      params = params.append('tags', tags.join(','));
    }
    if (search.trim().length > 0) {
      params = params.append('search', search);
    }
    return this.http.get(
      environment.API_ENDPOINT + '/api/v1/support-group/posts/',
      { params: params },
    );
  }

  createPost(data: any) {
    return this.http.post(
      environment.API_ENDPOINT + '/api/v1/support-group/post/',
      data,
    );
  }

  sendPost(post: SupportGroupItem) {
    this.supportGroupItem$.next(post);
  }

  tokenGetter(): Promise<string> {
    return localforage.getItem(TOKEN);
  }

  deletePost(data: any) {
    return this.http.delete(
      environment.API_ENDPOINT +
        '/api/v1/support-group/post/' +
        data.post_id +
        '/',
    );
  }

  editPost(data: any) {
    return this.http.put(
      environment.API_ENDPOINT + '/api/v1/support-group/post/' + data.id + '/',
      data,
    );
  }

  getPost(id: number) {
    return this.http.get(
      environment.API_ENDPOINT + '/api/v1/support-group/post/' + id + '/',
    );
  }

  sendUpdated(data: any) {
    this.supportGroupItemUpdated$.next(data);
  }

  postUpVote(data: any) {
    return this.http.post(
      environment.API_ENDPOINT + '/api/v1/support-group/post-vote/',
      data,
    );
  }

  getSuggestedPosts() {
    return this.http.get(
      environment.API_ENDPOINT + '/api/v1/support-group/suggested-posts/',
    );
  }

  personalizePost(tagsId: number[]) {
    const tags = {
      tags: tagsId,
    };
    return this.http.post(environment.API_ENDPOINT + PERSONLISE_POST, tags);
  }
}
