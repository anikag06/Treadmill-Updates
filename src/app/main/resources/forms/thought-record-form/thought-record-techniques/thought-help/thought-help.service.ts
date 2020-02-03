import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ThoughtHelpService {
  constructor(private http: HttpClient) {}

  getThoughtHelp(id: number) {
    return this.http.get(
      environment.API_ENDPOINT +
        '/api/v1/worksheets/thought-record/does-it-help/' +
        id +
        '/',
      {
        observe: 'response',
      },
    );
  }

  postThoughtHelp(thoughtHelp: any) {
    return this.http.post<any>(
      environment.API_ENDPOINT +
        '/api/v1/worksheets/thought-record/does-it-help/',
      thoughtHelp,
      {
        observe: 'response',
      },
    );
  }

  putThoughtHelp(thoughtHelp: any, id: number) {
    return this.http.put<any>(
      environment.API_ENDPOINT +
        '/api/v1/worksheets/thought-record/does-it-help/' +
        id +
        '/',
      thoughtHelp,
      {
        observe: 'response',
      },
    );
  }
}
