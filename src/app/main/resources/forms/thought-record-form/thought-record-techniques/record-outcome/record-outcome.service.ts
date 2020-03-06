import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RECDORD_OUTCOME_API } from '@/app.constants';

@Injectable({
  providedIn: 'root',
})
export class RecordOutcomeService {
  constructor(private http: HttpClient) {}

  getOutcome(id: number) {
    return this.http.get(
      environment.API_ENDPOINT + RECDORD_OUTCOME_API + id + '/',
      {
        observe: 'response',
      },
    );
  }

  postOutcome(outcome: any) {
    return this.http.post<any>(
      environment.API_ENDPOINT + RECDORD_OUTCOME_API,
      outcome,
      {
        observe: 'response',
      },
    );
  }

  putOutCome(outcome: any, id: number) {
    return this.http.put<any>(
      environment.API_ENDPOINT + RECDORD_OUTCOME_API + id + '/',
      outcome,
      {
        observe: 'response',
      },
    );
  }
}
