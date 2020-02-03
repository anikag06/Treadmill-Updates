import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecordOutcomeService {
  constructor(private http: HttpClient) {}

  getOutcome(id: number) {
    return this.http.get(
      environment.API_ENDPOINT +
        '/api/v1/worksheets/thought-record/worst-outcome/' +
        id +
        '/',
      {
        observe: 'response',
      },
    );
  }

  postOutcome(outcome: any) {
    return this.http.post<any>(
      environment.API_ENDPOINT +
        '/api/v1/worksheets/thought-record/worst-outcome/',
      outcome,
      {
        observe: 'response',
      },
    );
  }

  putOutCome(outcome: any, id: number) {
    return this.http.put<any>(
      environment.API_ENDPOINT +
        '/api/v1/worksheets/thought-record/worst-outcome/' +
        id +
        '/',
      outcome,
      {
        observe: 'response',
      },
    );
  }
}
