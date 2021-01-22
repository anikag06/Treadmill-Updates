import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Belief } from '@/main/resources/forms/belief-change/belief.model';
import { BELIEF_FORM_API } from '@/app.constants';

@Injectable({
  providedIn: 'root',
})
export class BeliefChangeService {
  beliefs: Belief[] = [];
  belief!: Belief;
  // beliefBehaviour = new BehaviorSubject({});
  beliefsBehaviour = new BehaviorSubject<Belief[]>(this.beliefs);
  beliefBehaviour = new BehaviorSubject<Belief>(this.belief);

  page = 1;
  nextPage = true;

  constructor(private http: HttpClient) {}

  getBeliefs() {
    if (this.nextPage) {
      const params = new HttpParams().set('page', this.page.toString());
      this.http
        .get<Belief[]>(environment.API_ENDPOINT + BELIEF_FORM_API, {
          params: params,
        })
        .subscribe((data: any) => {
          this.beliefs.push(...data.results);
          this.beliefsBehaviour.next(this.beliefs);
          if (data.next) {
            this.page += 1;
            this.nextPage = true;
            this.getBeliefs();
          } else {
            this.nextPage = false;
          }
        });
    }
  }

  deleteBelief(id: number) {
    return this.http.delete(
      environment.API_ENDPOINT + BELIEF_FORM_API + id + '/',
      {
        observe: 'response',
      },
    );
  }
  addBelief(belief: Belief) {
    this.beliefs.push(belief);
    this.beliefBehaviour.next(belief);
    this.beliefsBehaviour.next(this.beliefs);
  }

  updateBelief(beliefData: any) {
    const belief = this.beliefs.find((t: Belief) => t.id === beliefData.id);
    if (belief) {
      this.beliefs[this.beliefs.indexOf(belief)] = beliefData;
      this.beliefsBehaviour.next(this.beliefs);
    }
  }

  removeBelief(belief: Belief) {
    const beliefIndex = this.beliefs.indexOf(belief);
    this.beliefs.splice(beliefIndex, 1);
    this.beliefsBehaviour.next(this.beliefs);
  }

  postBelief(data: any) {
    return this.http.post<any>(
      environment.API_ENDPOINT + BELIEF_FORM_API,
      data,
      {
        observe: 'response',
      },
    );
  }

  putBelief(data: any, id: any) {
    return this.http.put<any>(
      environment.API_ENDPOINT + BELIEF_FORM_API + id + '/',
      data,
      {
        observe: 'response',
      },
    );
  }
}
