import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProofEvidences } from '@/main/resources/forms/shared/proof-evidences/IProofEvidences';
import { environment } from '../../../../../../environments/environment';
import { catchError, map } from 'rxjs/operators';

import {
  BELIEF_PROOF_EVIDENCES_API,
  THOUGHT_PROOF_EVIDENCES_API,
} from '@/app.constants';
import { GeneralErrorService } from '@/main/shared/general-error.service';

@Injectable({
  providedIn: 'root',
})
export class TRFProofService implements IProofEvidences {
  constructor(
    private http: HttpClient,
    private errorService: GeneralErrorService,
  ) {}

  getEvidences(id: number, type: string): any {
    return this.http
      .get(
        environment.API_ENDPOINT +
          THOUGHT_PROOF_EVIDENCES_API +
          type +
          '/' +
          id +
          '/',
      )
      .pipe(
        map((resp: any) => {
          const object = {
            evidences: resp.data.evidences,
          };
          return object;
        }),
        catchError(this.errorService.handleError),
      );
  }

  postEvidences(id: number, type: string, data: any): any {
    return this.http
      .post<any>(
        environment.API_ENDPOINT +
          THOUGHT_PROOF_EVIDENCES_API +
          type +
          '/' +
          id +
          '/',
        data,
        {
          observe: 'response',
        },
      )
      .pipe(catchError(this.errorService.handleError));
  }

  deleteEvidence(id: number, type: string): any {
    return this.http
      .delete<any>(
        environment.API_ENDPOINT +
          THOUGHT_PROOF_EVIDENCES_API +
          type +
          '/delete/' +
          id +
          '/',
        {
          observe: 'response',
        },
      )
      .pipe(catchError(this.errorService.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class BeliefProofService implements IProofEvidences {
  constructor(
    private http: HttpClient,
    private errorService: GeneralErrorService,
  ) {}

  getEvidences(id: number, type: string): any {
    return this.http
      .get(
        environment.API_ENDPOINT +
          BELIEF_PROOF_EVIDENCES_API +
          type +
          '/' +
          id +
          '/',
      )
      .pipe(
        map((resp: any) => {
          const object = {
            evidences: resp.data.evidences,
          };
          return object;
        }),

        catchError(this.errorService.handleError),
      );
  }

  postEvidences(id: number, type: string, data: any): any {
    return this.http
      .post<any>(
        environment.API_ENDPOINT +
          BELIEF_PROOF_EVIDENCES_API +
          type +
          '/' +
          id +
          '/',
        data,
        {
          observe: 'response',
        },
      )
      .pipe(catchError(this.errorService.handleError));
  }

  deleteEvidence(id: number, type: string): any {
    return this.http
      .delete<any>(
        environment.API_ENDPOINT +
          BELIEF_PROOF_EVIDENCES_API +
          type +
          '/delete/' +
          id +
          '/',
        {
          observe: 'response',
        },
      )
      .pipe(catchError(this.errorService.handleError));
  }
}
