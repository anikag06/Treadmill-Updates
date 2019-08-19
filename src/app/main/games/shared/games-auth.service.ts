import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import {TOKEN,
  ECG_DISCIMINATION_TASK, ECG_FLANKER_TASK, ECG_GAME_DATA, ECG_USER_DATA,
  LHG_COLOR_REVERSE_USER_ATTEMPT, LHG_POST_COLOR_REVERSE, LHG_GET_COLOR_REVERSE,
  LHG_USER_LEVEL, LHG_UNSOLVABLE_TASK2_LEVELS, LHG_UNSOLVABLE_TASK3_LEVELS,
  LHG_UNSOLVABLE_TASK1_LEVEL1, LHG_UNSOLVABLE_TASK1_LEVEL2} from '@/app.constants';
import { ECGameData, ECGameFlankerTask, ECGameDiscriminationTask, ECGameUserData,
  LHGameColorReverseData, LHGameUserLevel, LHGamePerformance, } from './game-play.model';

@Injectable({
  providedIn: 'root'
})
export class GamesAuthService {

  constructor(private http: HttpClient) { }
  // for executive control game
  ECG_DAYS = '?days=7';

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
  lhGameGetColorReverseData(): Observable<any> {
    return this.http.get(environment.API_ENDPOINT + LHG_GET_COLOR_REVERSE);
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
  lhGameUpdateTask1Level1(task1Level1Data: any) {
    console.log(task1Level1Data);
    return this.http.post(environment.API_ENDPOINT + LHG_UNSOLVABLE_TASK1_LEVEL1, task1Level1Data);
  }
  lhGameUpdateTask1Level2(task1Level2Data: any) {
    return this.http.post(environment.API_ENDPOINT + LHG_UNSOLVABLE_TASK1_LEVEL2, task1Level2Data);
  }
}
