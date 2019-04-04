import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../shared/apiResponse.model';
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

  getPosts() {
    return this.http.get(environment.API_ENDPOINT + '/api/v1/support-group/post-listing/')
      .pipe(
        map(data => {
          const response = <ApiResponse>data;
          return response.results.map((sgItem) => <SupportGroupItem>sgItem);
        })
      );
  }

  createPost(data: any) {
    return this.http.post(environment.API_ENDPOINT + '/api/v1/support-group/post/', data);
  }

  sendPost(post: SupportGroupItem) {
    this.supportGroupItem$.next(post);
  }
}
