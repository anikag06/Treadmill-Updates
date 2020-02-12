import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {FINAL_RATING_BELIEF_API, FINAL_RATING_THOUGHT_API, REALISTIC_BELIEF_API, REALISTIC_THOUGHT_API,} from '@/app.constants';
import {catchError, map} from 'rxjs/operators';
import {IFinalRatingServices} from '@/main/resources/forms/shared/form-final-rating/IFinalRatingServices';
import {GeneralErrorService} from '@/main/shared/general-error.service';


@Injectable({
  providedIn: 'root',
})
export class NegativeBeliefFinalService implements IFinalRatingServices {
  constructor(private http: HttpClient,
              private errorService: GeneralErrorService, ) {}

  postFinalRating(id: number, finalRating: number) {
    const object = {
      belief_id: id,
      belief_rating_final: finalRating,
    };
    return this.http
      .post<any>(environment.API_ENDPOINT + FINAL_RATING_BELIEF_API, object, {
        observe: 'response',
      })
      .pipe(catchError(this.errorService.handleError));
  }

  putFinalRating(id: number, finalRating: number) {
    const object = {
      belief_id: id,
      belief_rating_final: finalRating,
    };
    return this.http
      .put<any>(
        environment.API_ENDPOINT + FINAL_RATING_BELIEF_API + id + '/',
        object,
        {
          observe: 'response',
        },
      )
      .pipe(catchError(this.errorService.handleError));
  }

  getFinalRating(id: number) {
    return this.http
      .get(environment.API_ENDPOINT + FINAL_RATING_BELIEF_API + id + '/')
      .pipe(
        map((data: any) => {
          const object = {
            final_rating: data.belief_rating_final,
          };
          return object;
        }),
        catchError(this.errorService.handleError),
      );
  }

  getRealistic(id: number) {
    return this.http
      .get(environment.API_ENDPOINT + REALISTIC_BELIEF_API + id + '/')
      .pipe(
        map((data: any) => {
          const object = {
            realistic: data.realistic_belief,
          };
          return object;
        }),
        catchError(this.errorService.handleError),
      );
  }

  postRealistic(id: number, realistic: string) {
    const object = {
      belief_id: id,
      realistic_belief: realistic,
    };
    return this.http
      .post<any>(environment.API_ENDPOINT + REALISTIC_BELIEF_API, object, {
        observe: 'response',
      })
      .pipe(catchError(this.errorService.handleError));
  }

  putRealistic(id: number, realistic: string) {
    const object = {
      belief_id: id,
      realistic_belief: realistic,
    };
    return this.http
      .put<any>(
        environment.API_ENDPOINT + REALISTIC_BELIEF_API + id + '/',
        object,
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
export class ThoughtRecordFinalService implements IFinalRatingServices {
  constructor(private http: HttpClient,
              private errorService: GeneralErrorService) {}

  postFinalRating(id: number, finalRating: number) {
    const object = {
      situation_id: id,
      thought_rating_final: finalRating,
    };
    return this.http
      .post<any>(environment.API_ENDPOINT + FINAL_RATING_THOUGHT_API, object, {
        observe: 'response',
      })
      .pipe(catchError(this.errorService.handleError));
  }

  putFinalRating(id: number, finalRating: number) {
    const object = {
      situation_id: id,
      thought_rating_final: finalRating,
    };
    return this.http
      .put<any>(
        environment.API_ENDPOINT + FINAL_RATING_THOUGHT_API + id + '/',
        object,
        {
          observe: 'response',
        },
      )
      .pipe(catchError(this.errorService.handleError));
  }

  getFinalRating(id: number) {
    return this.http
      .get<any>(environment.API_ENDPOINT + FINAL_RATING_THOUGHT_API + id + '/')
      .pipe(
        map((data: any) => {
          const object = {
            final_rating: data.thought_rating_final,
          };
          return object;
        }),
        catchError(this.errorService.handleError),
      );
  }

  getRealistic(id: number) {
    return this.http
      .get<any>(environment.API_ENDPOINT + REALISTIC_THOUGHT_API + id + '/')
      .pipe(
        map((data: any) => {
          const object = {
            realistic: data.realistic_thought,
          };
          return object;
        }),
        catchError(this.errorService.handleError),
      );
  }

  postRealistic(id: number, realThought: string) {
    const object = {
      situation_id: id,
      realistic_thought: realThought,
    };
    return this.http
      .post<any>(environment.API_ENDPOINT + REALISTIC_THOUGHT_API, object, {
        observe: 'response',
      })
      .pipe(catchError(this.errorService.handleError));
  }

  putRealistic(id: number, realThought: string) {
    const object = {
      situation_id: id,
      realistic_thought: realThought,
    };
    return this.http
      .put<any>(
        environment.API_ENDPOINT + REALISTIC_THOUGHT_API + id + '/',
        realThought,
        {
          observe: 'response',
        },
      )
      .pipe(catchError(this.errorService.handleError));
  }
}
