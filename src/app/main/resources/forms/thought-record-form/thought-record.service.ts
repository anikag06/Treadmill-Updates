import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {Thought} from '@/main/resources/forms/thought-record-form/thoughtRecord.model';
import {SHOW_FULL_FORM_API, THOUGHT_RECORD_API, THOUGHT_RECORD_BEHAVIOR_API, THOUGHT_RECORD_FEELING_API, THOUGHT_RECORD_SITUATION_API,} from '@/app.constants';

@Injectable({
  providedIn: 'root',
})
export class ThoughtRecordService {
  thoughts: Thought[] = [];
  thought!: Thought;
  thoughtsBehaviour = new BehaviorSubject<Thought[]>(this.thoughts);
  thoughtBehaviour = new BehaviorSubject<Thought>(this.thought);
  page = 1;
  nextPage = true;

  constructor(private http: HttpClient) {}

  getThoughts() {
    if (this.nextPage) {
      this.http
        .get<Thought[]>(environment.API_ENDPOINT + THOUGHT_RECORD_SITUATION_API)
        .subscribe((data: any) => {
          // if (this.page === 1) {
          //   this.thoughts = [];
          // }

          this.thoughts.push(...data.results);
          this.thoughtsBehaviour.next(this.thoughts);
          if (data.next) {
            this.page += 1;
            this.nextPage = true;
            setTimeout(() => {
              this.getThoughts();
            }, 10);
          } else {
            this.nextPage = false;
          }
        });
    }
  }

  addSituation(thought: Thought) {
    this.thoughts.push(thought);
    this.thoughtBehaviour.next(thought);
    this.thoughtsBehaviour.next(this.thoughts);
  }

  updateSituation(situation: any) {
    const thought = this.thoughts.find((t: Thought) => t.id === situation.id);
    if (thought) {
      this.thoughts[this.thoughts.indexOf(thought)] = situation;
      this.thoughtsBehaviour.next(this.thoughts);
    }
  }

  removeSituation(situation: Thought) {
    const situationIndex = this.thoughts.indexOf(situation);
    this.thoughts.splice(situationIndex, 1);
    this.thoughtsBehaviour.next(this.thoughts);
  }

  postSituation(data: any) {
    return this.http.post<any>(
      environment.API_ENDPOINT + THOUGHT_RECORD_SITUATION_API,
      data,
      {
        observe: 'response',
      },
    );
  }

  putSituation(data: any, id: any) {
    return this.http.put<any>(
      environment.API_ENDPOINT + THOUGHT_RECORD_SITUATION_API + id + '/',
      data,
      {
        observe: 'response',
      },
    );
  }

  deleteSituation(id: any): Observable<HttpResponse<any>> {
    return this.http.delete(
      environment.API_ENDPOINT + THOUGHT_RECORD_SITUATION_API + id + '/',
      {
        observe: 'response',
      },
    );
  }

  postThought(data: any) {
    return this.http.post<any>(
      environment.API_ENDPOINT + THOUGHT_RECORD_API,
      data,
      {
        observe: 'response',
      },
    );
  }

  getThoughtBehavior() {
    return this.thoughtBehaviour.asObservable();
  }

  getThought(id: number) {
    return this.http.get<any>(
      environment.API_ENDPOINT + THOUGHT_RECORD_API + id + '/',
      {
        observe: 'response',
      },
    );
  }

  putThoughtRating(data: any, id: number) {
    return this.http.put<any>(
      environment.API_ENDPOINT + THOUGHT_RECORD_API + id + '/',
      data,
      {
        observe: 'response',
      },
    );
  }

  putBehavior(data: any, id: number) {
    return this.http.put<any>(
      environment.API_ENDPOINT + THOUGHT_RECORD_BEHAVIOR_API + id + '/',
      data,
      {
        observe: 'response',
      },
    );
  }

  postBehavior(data: any) {
    return this.http.post<any>(
      environment.API_ENDPOINT + THOUGHT_RECORD_BEHAVIOR_API,
      data,
      {
        observe: 'response',
      },
    );
  }

  getBehavior(id: number) {
    return this.http.get<any>(
      environment.API_ENDPOINT + THOUGHT_RECORD_BEHAVIOR_API + id + '/',
      {
        observe: 'response',
      },
    );
  }

  getFeelings(id: number) {
    return this.http.get<any>(
      environment.API_ENDPOINT + THOUGHT_RECORD_FEELING_API + id + '/',
      {
        observe: 'response',
      },
    );
  }

  postFeelings(data: any, id: number) {
    console.log(data);
    return this.http.post<any>(
      environment.API_ENDPOINT + THOUGHT_RECORD_FEELING_API + id + '/',
      data,
      {
        observe: 'response',
      },
    );
  }
  getShowFullForm() {
    return this.http.get<any>(environment.API_ENDPOINT + SHOW_FULL_FORM_API, {
      observe: 'response',
    });
  }
}
