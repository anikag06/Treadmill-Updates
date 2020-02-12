import {Injectable} from '@angular/core';
import {IFormTechniqueServices} from '@/main/resources/forms/shared/form-technique/IFormTechniqueServices';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {catchError, map} from 'rxjs/operators';

import {ALTERNATE_EXPLANATION_API, BELIEF_TELL_FRIEND_API, THOUGHT_TELL_FRIEND_API,} from '@/app.constants';
import {GeneralErrorService} from '@/main/shared/general-error.service';

@Injectable({
  providedIn: 'root',
})
export class TRFTellFriendService implements IFormTechniqueServices {
  constructor(
    private http: HttpClient,
    private errorService: GeneralErrorService,
  ) {}

  getData(id: number): any {
    return this.http
      .get(environment.API_ENDPOINT + THOUGHT_TELL_FRIEND_API + id + '/')
      .pipe(
        map((data: any) => {
          const object = {
            text: data.tell_a_friend,
          };
          return object;
        }),
        catchError(this.errorService.handleError),
      );
  }

  postData(id: number, data: string): any {
    const object = {
      situation_id: id,
      tell_a_friend: data,
    };
    return this.http
      .post<any>(environment.API_ENDPOINT + THOUGHT_TELL_FRIEND_API, object, {
        observe: 'response',
      })
      .pipe(catchError(this.errorService.handleError));
  }

  putData(id: number, data: string): any {
    const object = {
      situation_id: id,
      tell_a_friend: data,
    };
    return this.http
      .put<any>(
        environment.API_ENDPOINT + THOUGHT_TELL_FRIEND_API + id + '/',
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
export class BeliefTellFriendService implements IFormTechniqueServices {
  constructor(
    private http: HttpClient,
    private errorService: GeneralErrorService,
  ) {}

  getData(id: number): any {
    return this.http
      .get(environment.API_ENDPOINT + BELIEF_TELL_FRIEND_API + id + '/')
      .pipe(
        map((data: any) => {
          const object = {
            text: data.tell_a_friend,
          };
          return object;
        }),
        catchError(this.errorService.handleError),
      );
  }

  postData(id: number, data: string): any {
    const object = {
      belief_id: id,
      tell_a_friend: data,
    };
    return this.http
      .post<any>(environment.API_ENDPOINT + BELIEF_TELL_FRIEND_API, object, {
        observe: 'response',
      })
      .pipe(catchError(this.errorService.handleError));
  }

  putData(id: number, data: string): any {
    const object = {
      belief_id: id,
      tell_a_friend: data,
    };
    return this.http.put<any>(
      environment.API_ENDPOINT + BELIEF_TELL_FRIEND_API + id + '/',
      object,
      {
        observe: 'response',
      },
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class AlternateExplanationService implements IFormTechniqueServices {
  constructor(
    private http: HttpClient,
    private errorService: GeneralErrorService,
  ) {}

  getData(id: number): any {
    return this.http
      .get(environment.API_ENDPOINT + ALTERNATE_EXPLANATION_API + id + '/')
      .pipe(
        map((data: any) => {
          const object = {
            text: data.explanation,
          };
          return object;
        }),
        catchError(this.errorService.handleError),
      );
  }

  postData(id: number, data: string): any {
    const object = {
      situation_id: id,
      explanation: data,
    };
    return this.http
      .post<any>(environment.API_ENDPOINT + ALTERNATE_EXPLANATION_API, object, {
        observe: 'response',
      })
      .pipe(catchError(this.errorService.handleError));
  }

  putData(id: number, data: string): any {
    const object = {
      situation_id: id,
      explanation: data,
    };

    return this.http
      .put<any>(
        environment.API_ENDPOINT + ALTERNATE_EXPLANATION_API + id + '/',
        object,
        {
          observe: 'response',
        },
      )
      .pipe(catchError(this.errorService.handleError));
  }
}
