import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GIPHY_URL, UNSPLASH_URL } from '@/app.constants';
import { fromEvent, merge, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  // private url = 'https://api.unsplash.com'; // URL to web API
  // private applicationId =
  //   '9bd2732a096202a8c7f9b6f95ef06838580ddd34e7c73fb8234546019379c041';

  constructor(private http: HttpClient) {}

  postPreviousChat() {
    return this.http.post(
      environment.API_ENDPOINT + '/api/v1/chat/resume-chat/',
      {},
    );
  }

  getPhoto(id: string) {
    return this.http.get<any>(
      UNSPLASH_URL + '/photos/' + id + '/?client_id=' + environment.CLIENT_KEY,
      {
        observe: 'response',
      },
    );
  }

  getRandomPhoto(cid: string) {
    const p = new HttpParams().set('collections', cid);

    return this.http.get<any>(
      UNSPLASH_URL + '/photos/random/' + '?client_id=' + environment.CLIENT_KEY,
      {
        params: p,
        observe: 'response',
      },
    );
  }
  getGIF(gid: string) {
    const p = new HttpParams().set('api_key', environment.GIPHY_API_KEY);

    return this.http.get<any>(GIPHY_URL + gid, {
      params: p,
      observe: 'response',
    });
  }

  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }),
    );
  }
}
