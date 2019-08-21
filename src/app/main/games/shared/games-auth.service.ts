import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import {TOKEN,
  IBG_SENTENCE, IBG_SCOREINFO, IBG_USER_RESPONSE,
  ECG_DISCIMINATION_TASK, ECG_FLANKER_TASK, ECG_GAME_DATA, ECG_USER_DATA,
  LHG_COLOR_REVERSE_USER_ATTEMPT, LHG_POST_COLOR_REVERSE, LHG_GET_COLOR_REVERSE,
  LHG_USER_LEVEL, LHG_UNSOLVABLE_TASK2_LEVELS, LHG_UNSOLVABLE_TASK3_LEVELS,
  LHG_UNSOLVABLE_TASK1_LEVEL1, LHG_UNSOLVABLE_TASK1_LEVEL2,
  LHG_UNSOLVABLE_TASK2_LEVEL1, LHG_UNSOLVABLE_TASK2_LEVEL2,
  LHG_UNSOLVABLE_TASK3_LEVEL2, LHG_UNSOLVABLE_TASK3_LEVEL1} from '@/app.constants';
import { ECGameData, ECGameFlankerTask, ECGameDiscriminationTask, ECGameUserData,
  LHGameColorReverseData, LHGameUserLevel, LHGamePerformance, } from './game-play.model';

@Injectable({
  providedIn: 'root'
})
export class GamesAuthService {

  NEXT_PAGE = '?page=';
  ECG_DAYS = '?days=7';

  constructor(private http: HttpClient) { }

  // for interpretation bias game
  ibGameGetSentencesInfo(SENTENCE_URL: string, firstTime: boolean, pageUrl: number): Observable<any>  {
    if (firstTime) {
      if (pageUrl === 0) {
        return this.http.get( SENTENCE_URL);
      } else {
         pageUrl = pageUrl + 1;
         return this.http.get(environment.API_ENDPOINT + IBG_SENTENCE + this.NEXT_PAGE + pageUrl);
      }
    } else {
        return this.http.get( SENTENCE_URL );
    }
  }

  ibGameGetScoresInfo(): Observable<any>  {
    return this.http.get(environment.API_ENDPOINT + IBG_SCOREINFO);
  }

  ibGameStoreUserScoreInfo(saveData: any): Observable<any> {
    return this.http.put(environment.API_ENDPOINT + IBG_SCOREINFO, saveData);
  }

  ibGameStoreUserResponseInfo(saveResponseData: any): Observable<any> {
    return this.http.post(environment.API_ENDPOINT + IBG_USER_RESPONSE, saveResponseData);
  }

  // for executive control game

  ecGameGetTaskInfo(): Observable<any> {
    return this.http.get(environment.API_ENDPOINT + ECG_FLANKER_TASK);
  }

  ecGameGetFlankerTaskInfo(): Observable<any> {
    return this.http.get(environment.API_ENDPOINT + ECG_FLANKER_TASK + this.ECG_DAYS);
  }

  ecGameGetUserData(): Observable<any> {
    return this.http.get(environment.API_ENDPOINT + ECG_USER_DATA);
  }

  ecGameUpdateUserData(ec_game_user_data: ECGameUserData) {
    return this.http.put(environment.API_ENDPOINT + ECG_USER_DATA, ec_game_user_data );
  }

  ecGameStoreGameInfo(game_data: ECGameData) {
    return this.http.post(environment.API_ENDPOINT + ECG_GAME_DATA, game_data);
  }

  ecGameGetGameInfo(): Observable<any> {
    return this.http.get(environment.API_ENDPOINT + ECG_GAME_DATA);
  }

  ecGameStoreFlankerData(flanker_task_data: ECGameFlankerTask) {
    return this.http.post(environment.API_ENDPOINT + ECG_FLANKER_TASK, flanker_task_data);
  }

  ecGameStoreDiscriminationTaskData(discrimination_task: ECGameDiscriminationTask) {
    return this.http.post(environment.API_ENDPOINT + ECG_DISCIMINATION_TASK, discrimination_task);
  }

  // for learned helplessness game

  lhGameStoreColorReverse(color_reverse_data: LHGameColorReverseData) {
    return this.http.post(environment.API_ENDPOINT + LHG_POST_COLOR_REVERSE, color_reverse_data);
  }

  lhGameGetColorReverseData(pageNumber: number): Observable<any> {
    return this.http.get(environment.API_ENDPOINT + LHG_GET_COLOR_REVERSE + this.NEXT_PAGE + pageNumber);
  }

  lhGameGetUnsolvableTask2Data(): Observable<any> {
    return this.http.get(environment.API_ENDPOINT + LHG_UNSOLVABLE_TASK2_LEVELS);
  }

  lhGameGetUnsolvableTask3Data(): Observable<any> {
    return this.http.get(environment.API_ENDPOINT + LHG_UNSOLVABLE_TASK3_LEVELS);
  }

  lhGameGetUserLevel(): Observable<any> {
    return this.http.get(environment.API_ENDPOINT + LHG_USER_LEVEL);
  }

  lhGameUpdateUserLevel(lhGameUserLevel: LHGameUserLevel) {
    return this.http.put(environment.API_ENDPOINT + LHG_USER_LEVEL, lhGameUserLevel);
  }

  lhGameUpdateTask1Data(task1Data: any, firstLevel: boolean) {
    if (firstLevel === true) {
      return this.http.post(environment.API_ENDPOINT + LHG_UNSOLVABLE_TASK1_LEVEL1, task1Data);
    } else {
      return this.http.post(environment.API_ENDPOINT + LHG_UNSOLVABLE_TASK1_LEVEL2, task1Data);
    }
  }

  lhGameUpdateTask2Data(task2Data: any, firstLevel: boolean) {
    if (firstLevel === true) {
      return this.http.post(environment.API_ENDPOINT + LHG_UNSOLVABLE_TASK2_LEVEL1, task2Data);
    } else {
      return this.http.post(environment.API_ENDPOINT + LHG_UNSOLVABLE_TASK2_LEVEL2, task2Data);
    }
  }

  lhGameUpdateTask3Data(task3Data: any, firstLevel: boolean) {
    if (firstLevel === true) {
      return this.http.post(environment.API_ENDPOINT + LHG_UNSOLVABLE_TASK3_LEVEL1, task3Data);
    } else {
      return this.http.post(environment.API_ENDPOINT + LHG_UNSOLVABLE_TASK3_LEVEL2, task3Data);
    }
  }


}
