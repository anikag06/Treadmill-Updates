import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SanitizationService } from '@/main/shared/sanitization.service';
import { Belief } from '@/main/resources/forms/experiment-to-test-belief-form/ettbf-belief/belief.model';
import { Outcome } from '@/main/resources/forms/experiment-to-test-belief-form/ettbf-outcome/outcome.model';
import { environment } from '@/../environments/environment';
import { ETTBF_BELIEF_URL, ETTBF_OUTCOME_URL, GET_TASKS } from '@/app.constants';

@Injectable({
  providedIn: 'root',
})
export class ExperimentToTestBeliefService {
  
  private beliefs : Belief[]=[]; 
  beliefObservable$ = new BehaviorSubject({});
  beliefbehaviours = new BehaviorSubject(this.beliefs);
  morebeliefs = true;
  page = 1;
  constructor(
    private http: HttpClient,
    private sanitizer: SanitizationService,
  ) {}

  getBelief() {
    return this.http
      .get<Belief[]>(environment.API_ENDPOINT + ETTBF_BELIEF_URL )
      .subscribe((data: any) => {
        console.log('ETTBF data: ', data);
        const beliefs = <Belief[]>data.results;
        this.beliefs.push(...beliefs);
        this.beliefbehaviours.next(this.beliefs);
        if (data.next) {
          this.morebeliefs = true;
          this.page += 1;
          // this.getBelief();
        } else {
          this.morebeliefs = false;
        }
      },
        (error: HttpErrorResponse) => {
          console.error(error);
        },
      );
  }

  postBelief(belief: string) {
    return this.http
      .post(environment.API_ENDPOINT + ETTBF_BELIEF_URL, { belief: belief })
      .pipe(
        map((data: any) => {
          this.beliefs.push(<Belief>data)
          this.beliefObservable$.next(<Belief>data);
          return <Belief>data;
        }),
      );
  }

  putBelief(belief: Belief) {
    return this.http
      .put(environment.API_ENDPOINT + ETTBF_BELIEF_URL + belief.id + '/', {
        id: belief.id,
        belief: belief.belief,
        belief_rating_before: belief.belief_rating_before,
      })
      .pipe(
        map((data: any) => {
          this.beliefs = this.beliefs.map(btest => {
            if (belief.id === btest.id) {
              return data;
            } else {
              return btest;
            }
          });
          this.beliefbehaviours.next(this.beliefs);
          this.beliefObservable$.next(<Belief>data);
          return <Belief>data;
        }),
      );
  }
  deleteBelief(id: number): Observable<HttpResponse<any>>{
    return this.http.delete(
      environment.API_ENDPOINT + ETTBF_BELIEF_URL + id + '/',
      {
        observe: 'response',
      },
    );
  }
  getTasks(id : number){
    return this.http.get(environment.API_ENDPOINT + GET_TASKS + id + '/' ,{
      observe: 'response',
    })
  }
  postOutcome(belief_id: number, outcome: string) {
    return this.http
      .post(environment.API_ENDPOINT + ETTBF_OUTCOME_URL, {
        belief_id: belief_id,
        outcome: outcome,
      })
      .pipe(
        map((data: any) => {
          return <Outcome>data;
        }),
      );
  }

  putOutcome(outcome: Outcome) {
    
    return this.http
      .put(environment.API_ENDPOINT + ETTBF_OUTCOME_URL + outcome.belief_id + '/', {
        id: outcome.id,
        belief_id: outcome.belief_id,
        outcome: outcome.outcome,
        learning: outcome.learning,
        belief_rating_after: outcome.belief_rating_after,
        realistic_belief: outcome.realistic_belief,
      })
      .pipe(
        map((data: any) => {
          return <Outcome>data;
        }),
      );
  }
  getOutcome(id: number){
    return this.http.get(
      environment.API_ENDPOINT + ETTBF_OUTCOME_URL + id + '/',
      {
        observe: 'response',
      },
    );
  }
  addSituation(belief: Belief) {
    this.beliefs.push(belief);
    this.beliefObservable$.next(belief);
    this.beliefbehaviours.next(this.beliefs);
  }

  updateSituation(data: any) {
    const belief = this.beliefs.find((t: Belief) => t.id === data.id);
    if (belief) {
      this.beliefs[this.beliefs.indexOf(belief)] = data;
      this.beliefbehaviours.next(this.beliefs);
    }
  }
  removeSituation(beliefForm : Belief){
    const BeliefFormIndex = this.beliefs.indexOf(beliefForm);
    this.beliefs.splice(BeliefFormIndex, 1);
    this.beliefbehaviours.next(this.beliefs);
  }
}
