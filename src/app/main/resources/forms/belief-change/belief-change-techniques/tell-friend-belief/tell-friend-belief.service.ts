import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TellFriendBeliefService {
  constructor(private http: HttpClient) {}

  getTellFriendBelief(id: number) {
    return this.http.get(
      environment.API_ENDPOINT +
        '/api/v1/worksheets/belief-change/tell-a-friend/' +
        id +
        '/',
      {
        observe: 'response',
      },
    );
  }

  postTellFriendBelief(tellFriend: any) {
    return this.http.post<any>(
      environment.API_ENDPOINT +
        '/api/v1/worksheets/belief-change/tell-a-friend/',
      tellFriend,
      {
        observe: 'response',
      },
    );
  }

  putTellFriendBelief(tellFriend: any, id: number) {
    return this.http.put<any>(
      environment.API_ENDPOINT +
        '/api/v1/worksheets/belief-change/tell-a-friend/' +
        id +
        '/',
      tellFriend,
      {
        observe: 'response',
      },
    );
  }
}
