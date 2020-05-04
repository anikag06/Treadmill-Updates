import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import {
  TOKEN,
  IBG_SENTENCE,
  IBG_SCORE_INFO,
  IBG_USER_RESPONSE,
  ECG_DISCRIMINATION_TASK,
  ECG_FLANKER_TASK,
  ECG_GAME_DATA,
  ECG_USER_DATA,
  LHG_COLOR_REVERSE_USER_ATTEMPT,
  LHG_POST_COLOR_REVERSE,
  LHG_GET_COLOR_REVERSE,
  LHG_USER_LEVEL,
  LHG_UNSOLVABLE_TASK2_LEVELS,
  LHG_UNSOLVABLE_TASK3_LEVELS,
  LHG_UNSOLVABLE_TASK1_LEVEL1,
  LHG_UNSOLVABLE_TASK1_LEVEL2,
  LHG_UNSOLVABLE_TASK2_LEVEL1,
  LHG_UNSOLVABLE_TASK2_LEVEL2,
  LHG_UNSOLVABLE_TASK3_LEVEL2,
  LHG_UNSOLVABLE_TASK3_LEVEL1,
  FFG_GET_FRIENDLY_IMAGES,
  FFG_GET_HOSTILE_IMAGES,
  FFG_USER_DATA,
  FFG_PERFORMANCE,
  FFG_TOTAL_PERFORMANCE,
  FFG_MUSIC,
  LHG_USER_OVERALL_DATA,
} from '@/app.constants';
import {
  ECGameData,
  ECGameFlankerTask,
  ECGameDiscriminationTask,
  ECGameUserData,
  LHGameColorReverseData,
  LHGameUserLevel,
  LHGamePerformance,
  FFGameUserData,
  FFGamePerformance,
  ASGLevelPerformance,
} from './game-play.model';

@Injectable({
  providedIn: 'root',
})
export class GamesAuthService {
  NEXT_PAGE = '?page=';
  PAGE_SIZE = '&page_size=';
  ECG_DAYS = '?days=7';
  FFG_GRID_ROW = '?grid_row=';
  FFG_DEVICE = '&device_type=';
  ASGAnswerID!: any;
  ASGAnswerIdPost = [];
  ASGi = 0;

  constructor(private http: HttpClient) {}

  // for interpretation bias game
  ibGameGetSentencesInfo(pageUrl: number, pageSize: number): Observable<any> {
    pageUrl = pageUrl + 1;
    return this.http.get(
      environment.API_ENDPOINT +
        IBG_SENTENCE +
        this.NEXT_PAGE +
        pageUrl +
        this.PAGE_SIZE +
        pageSize,
    );
  }

  ibGameGetScoresInfo(): Observable<any> {
    return this.http.get(environment.API_ENDPOINT + IBG_SCORE_INFO);
  }

  ibGameStoreUserScoreInfo(saveData: any): Observable<any> {
    return this.http.put(environment.API_ENDPOINT + IBG_SCORE_INFO, saveData);
  }

  ibGameStoreUserResponseInfo(saveResponseData: any): Observable<any> {
    return this.http.post(
      environment.API_ENDPOINT + IBG_USER_RESPONSE,
      saveResponseData,
    );
  }
  // for Attribute style game
  atGetAnswers(): Observable<any> {
    return this.http.get(
      environment.API_ENDPOINT +
        '/api/v1/games/attribution-style/asgame-answers-list/',
    );
  }
  atGetQuestions(): Observable<any> {
    return this.http.get(
      environment.API_ENDPOINT +
        '/api/v1/games/attribution-style/asgame-questions-list/',
    );
  }
  atGetExplanations(): Observable<any> {
    return this.http.get(
      environment.API_ENDPOINT +
        '/api/v1/games/attribution-style/asgame-explanations-list/',
    );
  }
  atGetUserPerformance(): Observable<any> {
    return this.http.get(
      environment.API_ENDPOINT +
        '/api/v1/games/attribution-style/user-performance-asgame/',
    );
  }
  // tslint:disable-next-line:max-line-length
  atPostIndividualLevelPerformance(
    game_instance_id: number,
    level_id: number,
    total_balloons: number,
    balloons_burst: number,
    total_arrows_fired: number,
  ) {
    const f = {
      balloons_burst,
      game_instance_id,
      level_id,
      total_arrows_fired,
      total_balloons,
    };
    return this.http
      .post(
        environment.API_ENDPOINT +
          '/api/v1/games/attribution-style/user-level-performance-asgame/',
        f,
      )
      .subscribe(resp => console.log(resp));
  }

  atPostuserAnswer(
    game_instance_id: number,
    answer_id: number,
    time_taken_to_answer: number,
  ) {
    const f = {
      game_instance_id,
      answer_id,
      time_taken_to_answer,
    };
    return this.http
      .post(
        environment.API_ENDPOINT +
          '/api/v1/games/attribution-style/user-answer-asgame/',
        f,
      )
      .subscribe(resp => {
        console.log(resp);
        this.ASGAnswerID = resp;
        console.log(this.ASGAnswerID.id);
        // @ts-ignore
        this.ASGAnswerIdPost.push(this.ASGAnswerID.id);
      });
  }

  atPostuserExplanation(
    explanation_id: number,
    answer_1_id: number,
    answer_2_id: number,
  ) {
    // @ts-ignore
    answer_2_id = this.ASGAnswerIdPost.pop();
    // @ts-ignore
    answer_1_id = this.ASGAnswerIdPost.pop();
    console.log(this.ASGAnswerIdPost);
    const f = {
      answer_1_id,
      answer_2_id,
      explanation_id,
    };
    console.log(f);

    return this.http
      .post(
        environment.API_ENDPOINT +
          '/api/v1/games/attribution-style/user-explanation-asgame/',
        f,
      )
      .subscribe(resp => console.log(resp));
    this.ASGi = this.ASGi + 2;
  }

  atPutUserPerformance(gameInstance: number, endTime: string) {
    const completed = true;
    const f = {
      completed,
      endTime,
      gameInstance
    };
    return this.http
      .put(
        environment.API_ENDPOINT +
        'api/v1/games/attribution-style/user-performance-asgame/',
        f,
      )
      .subscribe(resp => console.log(resp));
  }

  // for executive control game

  ecGameGetTaskInfo(): Observable<any> {
    return this.http.get(environment.API_ENDPOINT + ECG_FLANKER_TASK);
  }

  ecGameGetFlankerTaskInfo(): Observable<any> {
    return this.http.get(
      environment.API_ENDPOINT + ECG_FLANKER_TASK + this.ECG_DAYS,
    );
  }

  ecGameGetUserData(): Observable<any> {
    return this.http.get(environment.API_ENDPOINT + ECG_USER_DATA);
  }

  ecGameUpdateUserData(ec_game_user_data: ECGameUserData) {
    return this.http.put(
      environment.API_ENDPOINT + ECG_USER_DATA,
      ec_game_user_data,
    );
  }

  ecGameStoreGameInfo(game_data: ECGameData) {
    return this.http.put(environment.API_ENDPOINT + ECG_GAME_DATA, game_data);
  }

  ecGameGetGameInfo(): Observable<any> {
    return this.http.get(environment.API_ENDPOINT + ECG_GAME_DATA);
  }

  ecGameStoreFlankerData(flanker_task_data: ECGameFlankerTask) {
    return this.http.post(
      environment.API_ENDPOINT + ECG_FLANKER_TASK,
      flanker_task_data,
    );
  }

  ecGameStoreDiscriminationTaskData(
    discrimination_task: ECGameDiscriminationTask,
  ) {
    return this.http.post(
      environment.API_ENDPOINT + ECG_DISCRIMINATION_TASK,
      discrimination_task,
    );
  }

  // for learned helplessness game

  lhGameStoreColorReverse(color_reverse_data: LHGameColorReverseData) {
    return this.http.post(
      environment.API_ENDPOINT + LHG_POST_COLOR_REVERSE,
      color_reverse_data,
    );
  }

  lhGameGetColorReverseData(): Observable<any> {
    return this.http.get(environment.API_ENDPOINT + LHG_GET_COLOR_REVERSE);
  }

  lhGameGetUnsolvableTask2Data(): Observable<any> {
    return this.http.get(
      environment.API_ENDPOINT + LHG_UNSOLVABLE_TASK2_LEVELS,
    );
  }

  lhGameGetUnsolvableTask3Data(): Observable<any> {
    return this.http.get(
      environment.API_ENDPOINT + LHG_UNSOLVABLE_TASK3_LEVELS,
    );
  }

  lhGameGetUserLevel(): Observable<any> {
    return this.http.get(environment.API_ENDPOINT + LHG_USER_LEVEL);
  }

  lhGameUpdateUserLevel(lhGameUserLevel: LHGameUserLevel) {
    return this.http.put(
      environment.API_ENDPOINT + LHG_USER_LEVEL,
      lhGameUserLevel,
    );
  }

  lhGameUpdateTask1Data(task1Data: any, firstLevel: boolean) {
    if (firstLevel) {
      return this.http.post(
        environment.API_ENDPOINT + LHG_UNSOLVABLE_TASK1_LEVEL1,
        task1Data,
      );
    } else {
      return this.http.post(
        environment.API_ENDPOINT + LHG_UNSOLVABLE_TASK1_LEVEL2,
        task1Data,
      );
    }
  }

  lhGameUpdateTask2Data(task2Data: any, firstLevel: boolean) {
    if (firstLevel) {
      return this.http.post(
        environment.API_ENDPOINT + LHG_UNSOLVABLE_TASK2_LEVEL1,
        task2Data,
      );
    } else {
      return this.http.post(
        environment.API_ENDPOINT + LHG_UNSOLVABLE_TASK2_LEVEL2,
        task2Data,
      );
    }
  }

  lhGameUpdateTask3Data(task3Data: any, firstLevel: boolean) {
    if (firstLevel) {
      return this.http.post(
        environment.API_ENDPOINT + LHG_UNSOLVABLE_TASK3_LEVEL1,
        task3Data,
      );
    } else {
      return this.http.post(
        environment.API_ENDPOINT + LHG_UNSOLVABLE_TASK3_LEVEL2,
        task3Data,
      );
    }
  }

  lhGameUpdateOverallData(user_overall_data: any) {
    return this.http.put(
      environment.API_ENDPOINT + LHG_USER_OVERALL_DATA,
      user_overall_data,
    );
  }

  lhGameGetOverallData(): Observable<any> {
    return this.http.get(environment.API_ENDPOINT + LHG_USER_OVERALL_DATA);
  }

  // for the friendly face game
  ffGameGetFriendlyImages(
    pageNumber: number,
    pageSize: number,
  ): Observable<any> {
    return this.http.get(
      environment.API_ENDPOINT +
        FFG_GET_FRIENDLY_IMAGES +
        this.NEXT_PAGE +
        pageNumber +
        this.PAGE_SIZE +
        pageSize,
    );
  }
  ffGameGetHostileImages(
    pageNumber: number,
    pageSize: number,
  ): Observable<any> {
    return this.http.get(
      environment.API_ENDPOINT +
        FFG_GET_HOSTILE_IMAGES +
        this.NEXT_PAGE +
        pageNumber +
        this.PAGE_SIZE +
        pageSize,
    );
  }

  ffGameGetUserInfo(): Observable<any> {
    return this.http.get(environment.API_ENDPOINT + FFG_USER_DATA);
  }
  ffGameStoreUserInfo(userData: FFGameUserData) {
    return this.http.put(environment.API_ENDPOINT + FFG_USER_DATA, userData);
  }

  ffGameStorePerformance(performanceData: FFGamePerformance) {
    return this.http.put(
      environment.API_ENDPOINT + FFG_PERFORMANCE,
      performanceData,
    );
  }
  ffGameUpdatePerformance(performanceData: FFGamePerformance) {
    return this.http.post(
      environment.API_ENDPOINT + FFG_PERFORMANCE,
      performanceData,
    );
  }

  ffGameGetMusicInfo(songOrder: number): Observable<any> {
    return this.http.get(
      environment.API_ENDPOINT + FFG_MUSIC + songOrder + '/',
    );
  }
}
