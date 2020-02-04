import {Injectable} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {IDENTIFY_THINKING_ERRORS_GET_URL, IDENTIFY_THINKING_ERRORS_URL,} from '@/app.constants';

@Injectable({
  providedIn: 'root',
})
export class IdentifyThinkingService {
  constructor(private http: HttpClient) {}

  getThinkingErrors() {
    return this.http.get(
      environment.API_ENDPOINT + IDENTIFY_THINKING_ERRORS_GET_URL,
    );
  }

  postThinkingErrors(data: any, id: number) {
    return this.http.post<any>(
      environment.API_ENDPOINT + IDENTIFY_THINKING_ERRORS_URL + id + '/',
      data,
      {
        observe: 'response',
      },
    );
  }

  getSelectedThinkingErrors(id: number) {
    return this.http.get(
      environment.API_ENDPOINT + IDENTIFY_THINKING_ERRORS_URL + id + '/',
      {
        observe: 'response',
      },
    );
  }
}
