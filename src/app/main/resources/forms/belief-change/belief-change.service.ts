import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Belief} from '@/main/resources/forms/belief-change/belief.model';

@Injectable({
  providedIn: 'root',
})
export class BeliefChangeService {
  beliefs: Belief[] = [];
  belief!: Belief;
  // thoughtBehaviour = new BehaviorSubject({});
  beliefsBehaviour = new BehaviorSubject<Belief[]>(this.beliefs);
  beliefBehaviour = new BehaviorSubject<Belief>(this.belief);

  page = 1;
  nextPage = true;

  constructor(private http: HttpClient) {
  }

  getBeliefs() {
    if (this.nextPage) {
      this.http
          .get<Belief[]>(
              environment.API_ENDPOINT + '/api/v1/worksheets/belief-change/belief/',
          )
          .subscribe((data: any) => {
            // if (this.page === 1) {
            //   this.thoughts = [];
            // }

            this.beliefs.push(...data.results);
            this.beliefsBehaviour.next(this.beliefs);
            if (data.next) {
              this.page += 1;
              this.nextPage = true;
              setTimeout(() => {
                this.getBeliefs();
              }, 10);
            } else {
              this.nextPage = false;
            }
          });
    }
  }

  postBelief(data: any) {
    return this.http.post<any>(
        environment.API_ENDPOINT + '/api/v1/worksheets/belief-change/belief/',
        data,
        {
          observe: 'response',
        },
    );
  }

  putBelief(data: any, id: any) {
    return this.http.put<any>(
        environment.API_ENDPOINT +
        '/api/v1/worksheets/belief-change/belief/' +
        id +
        '/',
        data,
        {
          observe: 'response',
        },
    );
  }

  postFinalBeliefRating(finalRating: any) {
    return this.http.post<any>(
        environment.API_ENDPOINT +
        '/api/v1/worksheets/belief-change/final-rating/',
        finalRating,
        {
          observe: 'response',
        },
    );
  }

  putFinalRating(finalBelief: any, id: number) {
    return this.http.put<any>(
        environment.API_ENDPOINT +
        '/api/v1/worksheets/belief-change/final-rating/' +
        id +
        '/',
        finalBelief,
        {
          observe: 'response',
        },
    );
  }

  getFinalRating(id: number) {
    return this.http.get<any>(
        environment.API_ENDPOINT +
        '/api/v1/worksheets/belief-change/final-rating/' +
        id +
        '/',

        {
          observe: 'response',
        },
    );
  }

  getRealisticBelief(id: number) {
    return this.http.get<any>(
        environment.API_ENDPOINT +
        '/api/v1/worksheets/belief-change/realistic-belief/' +
        id +
        '/',

        {
          observe: 'response',
        },
    );
  }

  postRealisticBelief(realBelief: any) {
    return this.http.post<any>(
        environment.API_ENDPOINT +
        '/api/v1/worksheets/belief-change/realistic-belief/',
        realBelief,
        {
          observe: 'response',
        },
    );
  }

  putRealisticBelief(realBelief: any, id: number) {
    return this.http.put<any>(
        environment.API_ENDPOINT +
        '/api/v1/worksheets/belief-change/realistic-belief/' +
        id +
        '/',
        realBelief,
        {
          observe: 'response',
        },
    );
  }
}
