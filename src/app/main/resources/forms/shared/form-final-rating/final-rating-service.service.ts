import {Injectable} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FINAL_RATING_BELIEF, FINAL_RATING_THOUGHT, REALISTIC_BELIEF, REALISTIC_THOUGHT,} from '@/app.constants';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

export interface IFinalRatingServices {
  getFinalRating(id: number): any;
  postFinalRating(id: number, finalrating: number): any;
  putFinalRating(id: number, finalRating: any): any;
  getRealistic(id: number): any;
  putRealistic(id: number, realistic: string): any;
  postRealistic(id: number, realistic: string): any;
}
export function handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(`Backend returned code ${error.status}, `);
  }
  // return an observable with a user-facing error message
  return throwError('Something bad happened; please try again later.');
}

@Injectable({
  providedIn: 'root',
})
export class NegativeBeliefFinalService implements IFinalRatingServices {
  constructor(private http: HttpClient) {}

  postFinalRating(id: number, finalRating: number) {
    const object = {
      belief_id: id,
      belief_rating_final: finalRating,
    };
    return this.http
      .post<any>(environment.API_ENDPOINT + FINAL_RATING_BELIEF, object, {
        observe: 'response',
      })
      .pipe(catchError(handleError));
  }

  putFinalRating(id: number, finalRating: number) {
    const object = {
      belief_id: id,
      belief_rating_final: finalRating,
    };
    return this.http
      .put<any>(
        environment.API_ENDPOINT + FINAL_RATING_BELIEF + id + '/',
        object,
        {
          observe: 'response',
        },
      )
      .pipe(catchError(handleError));
  }

  getFinalRating(id: number) {
    return this.http
      .get(environment.API_ENDPOINT + FINAL_RATING_BELIEF + id + '/')
      .pipe(
        map((data: any) => {
          const object = {
            final_rating: data.belief_rating_final,
          };
          return object;
        }),
        catchError(handleError),
      );
  }

  getRealistic(id: number) {
    return this.http
      .get(environment.API_ENDPOINT + REALISTIC_BELIEF + id + '/')
      .pipe(
        map((data: any) => {
          const object = {
            realistic: data.realistic_belief,
          };
          return object;
        }),
        catchError(handleError),
      );
  }

  postRealistic(id: number, realistic: string) {
    const object = {
      belief_id: id,
      realistic_belief: realistic,
    };
    return this.http
      .post<any>(environment.API_ENDPOINT + REALISTIC_BELIEF, object, {
        observe: 'response',
      })
      .pipe(catchError(handleError));
  }

  putRealistic(id: number, realistic: string) {
    const object = {
      belief_id: id,
      realistic_belief: realistic,
    };
    return this.http
      .put<any>(
        environment.API_ENDPOINT + REALISTIC_BELIEF + id + '/',
        object,
        {
          observe: 'response',
        },
      )
      .pipe(catchError(handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class ThoughtRecordFinalService implements IFinalRatingServices {
  constructor(private http: HttpClient) {}

  postFinalRating(id: number, finalRating: number) {
    const object = {
      situation_id: id,
      thought_rating_final: finalRating,
    };
    return this.http
      .post<any>(environment.API_ENDPOINT + FINAL_RATING_THOUGHT, object, {
        observe: 'response',
      })
      .pipe(catchError(handleError));
  }

  putFinalRating(id: number, finalRating: number) {
    const object = {
      situation_id: id,
      thought_rating_final: finalRating,
    };
    return this.http
      .put<any>(
        environment.API_ENDPOINT + FINAL_RATING_THOUGHT + id + '/',
        object,
        {
          observe: 'response',
        },
      )
      .pipe(catchError(handleError));
  }

  getFinalRating(id: number) {
    return this.http
      .get<any>(environment.API_ENDPOINT + FINAL_RATING_THOUGHT + id + '/')
      .pipe(
        map((data: any) => {
          const object = {
            final_rating: data.thought_rating_final,
          };
          return object;
        }),
        catchError(handleError),
      );
  }

  getRealistic(id: number) {
    return this.http
      .get<any>(environment.API_ENDPOINT + REALISTIC_THOUGHT + id + '/')
      .pipe(
        map((data: any) => {
          const object = {
            realistic: data.realistic_thought,
          };
          return object;
        }),
        catchError(handleError),
      );
  }

  postRealistic(id: number, realThought: string) {
    const object = {
      situation_id: id,
      realistic_thought: realThought,
    };
    return this.http
      .post<any>(environment.API_ENDPOINT + REALISTIC_THOUGHT, object, {
        observe: 'response',
      })
      .pipe(catchError(handleError));
  }

  putRealistic(id: number, realThought: string) {
    const object = {
      situation_id: id,
      realistic_thought: realThought,
    };
    return this.http
      .put<any>(
        environment.API_ENDPOINT + REALISTIC_THOUGHT + id + '/',
        realThought,
        {
          observe: 'response',
        },
      )
      .pipe(catchError(handleError));
  }
}
