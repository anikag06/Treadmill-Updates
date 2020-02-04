import {Injectable} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ACT_AS_IF_ADVANTAGE_DELETE_URL, ACT_AS_IF_ADVANTAGE_URL, ACT_AS_IF_URL} from '@/app.constants';

@Injectable({
  providedIn: 'root',
})
export class ActAsIfService {
  constructor(private http: HttpClient) {}

  getAdvantages(id: number) {
    return this.http.get(
      environment.API_ENDPOINT +
        ACT_AS_IF_ADVANTAGE_URL +
        id +
        '/',
      {
        observe: 'response',
      },
    );
  }

  getActingAsIf(id: number) {
    return this.http.get(
      environment.API_ENDPOINT +
        ACT_AS_IF_URL +
        id +
        '/',
      {
        observe: 'response',
      },
    );
  }

  postAdvantages(data: any, id: number) {
    return this.http.post<any>(
      environment.API_ENDPOINT +
        ACT_AS_IF_ADVANTAGE_URL +
        id +
        '/',
      data,
      {
        observe: 'response',
      },
    );
  }

  deleteAdvantage(id: number) {
    return this.http.delete<any>(
      environment.API_ENDPOINT +
        ACT_AS_IF_ADVANTAGE_DELETE_URL +
        id +
        '/',
      {
        observe: 'response',
      },
    );
  }

  postActAsIf(act: any) {
    return this.http.post<any>(
      environment.API_ENDPOINT +
        ACT_AS_IF_URL,
      act,
      {
        observe: 'response',
      },
    );
  }

  putActAsIf(act: any, id: number) {
    return this.http.put<any>(
      environment.API_ENDPOINT +
        ACT_AS_IF_URL +
        id +
        '/',
      act,
      {
        observe: 'response',
      },
    );
  }
}
