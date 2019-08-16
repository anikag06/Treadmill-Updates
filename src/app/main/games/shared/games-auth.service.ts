import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import {TOKEN,
  ECG_DISCIMINATION_TASK,
  ECG_FLANKER_TASK,
        ECG_GAME_DATA,
        ECG_USER_DATA} from '@/app.constants';
import { ECGameData, ECGameFlankerTask, ECGameDiscriminationTask, ECGameUserData } from './game-play.model';

@Injectable({
  providedIn: 'root'
})
export class GamesAuthService {

  constructor(private http: HttpClient) { }
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

}
