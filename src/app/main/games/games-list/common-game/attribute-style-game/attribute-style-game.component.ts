import { Component, HostListener, OnInit } from '@angular/core';
import { LoadFilesService } from '@/main/games/shared/load-files.service';
import { GamesAuthService } from '@/main/games/shared/games-auth.service';
import { GamePlayService } from '@/main/games/shared/game-play.service';
import {map, switchMap} from "rxjs/operators";
import {FlowService} from "@/main/flow/flow.service";
import {ActivatedRoute} from "@angular/router";
import {StepsDataService} from "@/main/resources/shared/steps-data.service";

declare var ASGAnswer: any;

@Component({
  selector: 'app-attribute-style-game',
  templateUrl: './attribute-style-game.component.html',
  styleUrls: ['./attribute-style-game.component.scss'],
})
export class AttributeStyleGameComponent implements OnInit {

  navbarTitle!: string;
  stepGroupSequence!: number;
  stepSequence!: number;
  stepName!: string;
  constructor(
    private loadFileService: LoadFilesService,
    private gamesAuthService: GamesAuthService,
    private gamePlayService: GamePlayService,
    private flowService: FlowService,
    private activatedRoute: ActivatedRoute,
    private stepDataService: StepsDataService,
  ) {}

  ngOnInit() {
    this.loadFileService
      .loadExternalScript('./assets/games/Attribution-style-game/src/app.js')
      .then(() => {})
      .catch(() => {});
    this.activatedRoute.params
      .pipe(
        map(v => v.id),
        switchMap(id =>  this.stepDataService
          .getStepData(id)),
      )
      .subscribe(
        (res: any) => {
          const step = res.data;
          console.log('RESPONSE', res.data, step.status);
          // for navbar title
          this.stepGroupSequence = step.step_group_sequence + 1;
          this.stepSequence = step.sequence + 1;
          this.stepName = step.name;
          this.navbarTitle =
            this.stepGroupSequence.toString() +
            '.' +
            this.stepSequence.toString() +
            ' ' +
            this.stepName;
          console.log('STEP DETAIL:', this.navbarTitle);
          this.flowService.stepDetail.emit(this.navbarTitle);
        } );

    /* this.gamesAuthService.atGetAnswers().subscribe(
      e => {
        ASGAnswer = e;
        console.log(ASGAnswer);
      }
    );*/
  }

  @HostListener('window:ASGPostIndividualLevelPerformance')
  postIndividualLevelPerformance() {
    console.log('works1');
    this.gamePlayService.postIndividualLevelASG();
  }

  @HostListener('window:ASGPostLevelTwoPerformance')
  postLevelTwoPerformance() {
    console.log('works2');
    this.gamePlayService.postIndividualLevelASG();
  }

  @HostListener('window:ASGpostUserAnswer')
  ASGpostUserAnswer() {
    console.log('works2');
    this.gamePlayService.postUserAnswer();
  }

  @HostListener('window:ASGpostUserExplanation')
  ASGpostUserExplanation() {
    console.log('works2');
    this.gamePlayService.postUserExplanation();
  }
}
