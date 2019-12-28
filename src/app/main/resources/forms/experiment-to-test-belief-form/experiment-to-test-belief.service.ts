import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { SanitizationService } from '@/main/shared/sanitization.service';
import { Belief } from '@/main/resources/forms/experiment-to-test-belief-form/ettbf-belief/belief.model';
import { Outcome } from '@/main/resources/forms/experiment-to-test-belief-form/ettbf-outcome/outcome.model';
import { environment } from '@/../environments/environment';
import { ETTBF_BELIEF_URL, ETTBF_OUTCOME_URL } from '@/app.constants';

@Injectable({
  providedIn: 'root',
})
export class ExperimentToTestBeliefService {
  beliefObservable$ = new BehaviorSubject({});

  constructor(
    private http: HttpClient,
    private sanitizer: SanitizationService,
  ) {}

  getBelief() {
    return this.http
      .get<Belief>(environment.API_ENDPOINT + ETTBF_BELIEF_URL + '1/')
      .subscribe((data: any) => {
        console.log('ETTBF data: ', data);
      });
  }

  postBelief(belief: string) {
    return this.http
      .post(environment.API_ENDPOINT + ETTBF_BELIEF_URL, { belief: belief })
      .pipe(
        map((data: any) => {
          this.beliefObservable$.next(<Belief>data);
          return data;
        }),
      );
  }

  putBelief(belief: Belief) {
    return this.http
      .put(environment.API_ENDPOINT + ETTBF_BELIEF_URL + belief.id + '/', {
        id: belief.id,
        belief: belief.belief,
        belief_rating_before: belief.beliefRating,
      })
      .pipe(
        map((data: any) => {
          this.beliefObservable$.next(<Belief>data);
          return data;
        }),
      );
  }

  postOutcome(belief_id: number, outcome: string) {
    return this.http
      .post(environment.API_ENDPOINT + ETTBF_OUTCOME_URL, {
        belief_id: belief_id,
        outcome: outcome,
      })
      .pipe(
        map((data: any) => {
          return data;
        }),
      );
  }

  putOutcome(outcome: Outcome) {
    return this.http
      .put(environment.API_ENDPOINT + ETTBF_OUTCOME_URL + outcome.id + '/', {
        id: outcome.id,
        belief_id: outcome.belief_id,
        outcome: outcome.outcome,
        learning: outcome.learning,
        belief_rating_after: outcome.beliefRating,
      })
      .pipe(
        map((data: any) => {
          return data;
        }),
      );
  }
}
