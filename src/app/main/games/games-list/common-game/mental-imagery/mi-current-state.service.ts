import { Injectable } from '@angular/core';
import { Level } from './level.model';
import { MIUser } from './mi-user.model';
import { Scenario } from './scenario.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { MIPlayService } from './mi-play.service';
import { MIG_SITUATIONS_DATA, MIG_USER_DATA, MIG_STORE_USER_DATA } from '@/app.constants';

@Injectable({
  providedIn: 'root'
})
export class MICurrentStateService {


  user = new MIUser('sourav', 0, [], null);
  currentLevel!: Level;
  nextLevel!: Level;
  levelList: Level[] = [];
  currentScenario!: Scenario;
  previousText = '';
  count = 0;

  extraContent = '';
  notificationHeader = '';
  notificationBody = '';

  continuePlaying = false;
  retry = false;
  disabled = false;
  blank = '';
  scenario!: Scenario;
  lastOrder!: number;
  time!: any;
  startTime!: any;
  numCorrectAnswers!: number;

  BRONZE_CONSTANT!: any;
  SILVER_CONSTANT!: any;
  GOLD_CONSTANT!: any;
  showTutorial!: boolean;

  constructor(
    private http: HttpClient,
    private miPlayService: MIPlayService
    ) {
    }



  initLevelsList() {
    this.fetchSituationData(this.user.level).subscribe((data: any) => {
      this.setLevelList(data);
      this.lastOrder = data.results[0].last_order;
      this.user.level = data.results[0].order;
      this.miPlayService.setLevel.emit();
    });
  }

  updateLevelsList() {
    this.fetchSituationData(this.user.level).subscribe((data: any) => {
      this.setLevelList(data);
    });
  }

  setLevelList(levelData: any) {
    for (let i = 0; i < levelData.results.length; i++) {
        this.levelList.push(new Level(levelData.results[i].order, levelData.results[i].title, levelData.results[i].sentence_list));
      }
  }

  setInitialOrder() {
    this.fetchUserData().subscribe((data: any) => {
      console.log(data);
      this.user.level = data.last_completed_order;
      this.user.points = [data.total_score];
      this.numCorrectAnswers = data.no_of_correct_answers;
      this.BRONZE_CONSTANT = data.BRONZE_CONSTANT;
      this.SILVER_CONSTANT = data.SILVER_CONSTANT;
      this.GOLD_CONSTANT = data.GOLD_CONSTANT;
      this.showTutorial = data.show_tutorial;
      this.miPlayService.startNext.emit();
    });
  }

  fetchSituationData(lastPlayedOrder: number) {
    return this.http.get(environment.API_ENDPOINT + MIG_SITUATIONS_DATA + lastPlayedOrder + '/');
  }

  fetchUserData() {
    return this.http.get(environment.API_ENDPOINT + MIG_USER_DATA);
  }

  saveUserData(data: any) {
    return this.http.post(environment.API_ENDPOINT + MIG_STORE_USER_DATA, data);
  }

  levelUpdate() {
    if (this.user.level === this.lastOrder) {
      this.user.level = 1;
    } else {
      this.user.level += 1;
    }
  }

  getCurrentLevel() {
    for (let i = 0 ; i < this.levelList.length; i++) {
      if (this.user.level === this.levelList[i].order) {
        this.currentLevel =  this.levelList[i];
      }
    }
    return this.currentLevel;
  }

  getNextLevel() {
    for (let i = 0 ; i < this.levelList.length; i++) {
      if (this.user.level === this.levelList[i].order) {
        this.nextLevel =  this.levelList[i + 1];
      }
    }
    return this.nextLevel;
  }

  convertScenario(scenario1: any, scenario2: any) {
    this.time = new Date();
    this.startTime = this.time.toJSON();
    return new Scenario(scenario1.text_before_dash, scenario1.text_after_dash, scenario2, scenario1.wrong_text, scenario1.correct_text, scenario1.id);
  }


  updateScenario() {

    if (this.currentScenario && this.currentScenario.scenarioNextIndex) {
      const nextIndex = this.currentScenario.scenarioNextIndex;
      if (nextIndex < (this.currentLevel.scenario.length - 1)) { // if not last scenario
        this.currentScenario = this.convertScenario(this.currentLevel.scenario[nextIndex], nextIndex + 1);
      } else {
        this.currentScenario = this.convertScenario(this.currentLevel.scenario[nextIndex], null);
      }
    } else {
      this.currentScenario = this.convertScenario(this.currentLevel.scenario[0], 1);
      // return this.currentScenario;
    }
  }

  getScenario() {
    if (this.count === 0) {
      this.currentScenario = this.convertScenario(this.currentLevel.scenario[0], 1);
    }
  }

  resetScenario() {
    this.currentScenario = this.convertScenario(this.currentLevel.scenario[0], 1);
    //return this.currentScenario;
  }

  numOfScenarios() {
    return this.currentLevel.scenario.length;
  }

}
