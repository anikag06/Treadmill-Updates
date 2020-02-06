import {Injectable} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {IDENTIFY_THINKING_ERRORS_API, IDENTIFY_THINKING_ERRORS_GET_API,} from '@/app.constants';

@Injectable({
  providedIn: 'root',
})
export class IdentifyThinkingService {
  constructor(private http: HttpClient) {}

  getThinkingErrors() {
    return this.http.get(
      environment.API_ENDPOINT + IDENTIFY_THINKING_ERRORS_GET_API,
    );
  }

  postThinkingErrors(data: any, id: number) {
    return this.http.post<any>(
      environment.API_ENDPOINT + IDENTIFY_THINKING_ERRORS_API + id + '/',
      data,
      {
        observe: 'response',
      },
    );
  }

  getSelectedThinkingErrors(id: number) {
    return this.http.get(
      environment.API_ENDPOINT + IDENTIFY_THINKING_ERRORS_API + id + '/',
      {
        observe: 'response',
      },
    );
  }
}
