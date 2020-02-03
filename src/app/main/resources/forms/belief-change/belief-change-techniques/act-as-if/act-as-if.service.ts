import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ActAsIfService {
  constructor(private http: HttpClient) {}

  getAdvantages(id: number) {
    return this.http.get(
      environment.API_ENDPOINT +
        '/api/v1/worksheets/belief-change/acting-as-if/advantages/' +
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
        '/api/v1/worksheets/belief-change/acting-as-if/' +
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
        '/api/v1/worksheets/belief-change/acting-as-if/advantages/' +
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
        '/api/v1/worksheets/belief-change/acting-as-if/advantage/delete/' +
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
        '/api/v1/worksheets/belief-change/acting-as-if/',
      act,
      {
        observe: 'response',
      },
    );
  }

  putActAsIf(act: any, id: number) {
    return this.http.put<any>(
      environment.API_ENDPOINT +
        '/api/v1/worksheets/belief-change/acting-as-if/' +
        id +
        '/',
      act,
      {
        observe: 'response',
      },
    );
  }
}
