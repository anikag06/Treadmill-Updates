import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { THOUGHT_HELP_API } from '@/app.constants';

@Injectable({
  providedIn: 'root',
})
export class ThoughtHelpService {
  constructor(private http: HttpClient) {}

  getThoughtHelp(id: number) {
    return this.http.get(
      environment.API_ENDPOINT + THOUGHT_HELP_API + id + '/',
      {
        observe: 'response',
      },
    );
  }

  postThoughtHelp(thoughtHelp: any) {
    return this.http.post<any>(
      environment.API_ENDPOINT + THOUGHT_HELP_API,
      thoughtHelp,
      {
        observe: 'response',
      },
    );
  }

  putThoughtHelp(thoughtHelp: any, id: number) {
    return this.http.put<any>(
      environment.API_ENDPOINT + THOUGHT_HELP_API + id + '/',
      thoughtHelp,
      {
        observe: 'response',
      },
    );
  }
}
