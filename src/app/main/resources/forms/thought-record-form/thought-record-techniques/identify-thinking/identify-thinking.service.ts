import {Injectable} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IdentifyThinkingService {
  constructor(private http: HttpClient) {
  }

  getThinkingErrors() {
    return this.http.get(
        environment.API_ENDPOINT +
        '/api/v1/worksheets/thought-record/get-thinking-errors/',
    );
  }

  postThinkingErrors(data: any, id: number) {
    return this.http.post<any>(
        environment.API_ENDPOINT +
        '/api/v1/worksheets/thought-record/thinking-errors/' +
        id +
        '/',
        data,
        {
          observe: 'response',
        },
    );
  }

  getSelectedThinkingErrors(id: number) {
    return this.http.get(
        environment.API_ENDPOINT +
        '/api/v1/worksheets/thought-record/thinking-errors/' +
        id +
        '/',
        {
          observe: 'response',
        },
    );
  }
}
