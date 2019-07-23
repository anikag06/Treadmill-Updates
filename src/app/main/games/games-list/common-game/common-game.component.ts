import { Component, OnInit, Input } from '@angular/core';
import { GamePlayService } from '../../shared/game-play.service';
import { GamesService } from '@/main/shared/games.service';
import { Router, ActivatedRoute, RouterEvent, NavigationStart } from '@angular/router';
import { Game } from '@/main/shared/game.model';
import { map, switchMap, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

declare let $: any;

@Component({
  selector: 'app-common-game',
  templateUrl: './common-game.component.html',
  styleUrls: ['./common-game.component.scss']
})
export class CommonGameComponent implements OnInit {

  game!: Game;
  gameName!: string;
  firstPageElement!: HTMLElement;
  pauseBtnElement!: HTMLElement;

  showSecondPlayBtn = true;
  isExecutiveControl = false;
  isInterpretationBias = false;
  isSampleGame = false;
  showHintBtn = false;
  isSoundOn = true;
  showSideButtons = false;

  currLocation: any;

  subscriptionRouter!: Subscription;

  constructor(private gamePlayService: GamePlayService,
    private gamesService: GamesService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) {   }

  ngOnInit() {
    this.subscriptionRouter = this.route.params
      .pipe(
        map(v => v.name),
        switchMap(name => this.gamePlayService.getGameInfo(name))
      )
      .subscribe(
        (game) =>  {
          this.game = <Game>game;
          this.gameName = this.game.name;
          if (this.gameName === 'Executive Control Game') {
            this.isExecutiveControl = true;
          }
          if (this.gameName === 'Interpretation Bias Game') {
            this.isInterpretationBias = true;
            this.showHintBtn = true;
          }
          if (this.gameName === 'Sample Game') {
            this.isSampleGame = true;
          }
          console.log(this.gameName, this.isExecutiveControl);
          this.firstPageElement = document.getElementById('firstpage-btns') as HTMLElement;
          this.pauseBtnElement = document.getElementById('pause-common-div') as HTMLElement;
        },
        (error) => {
          this.router.navigate(['games']);
        }
      );
  }

  onPlayClick() {
    this.showSideButtons = false;
    this.firstPageElement.classList.add('d-none');
    this.pauseBtnElement.classList.remove('d-none');
    if (this.gameName === 'Interpretation Bias Game') {
      this.gamePlayService.playIBGame();
    }
    if (this.gameName === 'Executive Control Game') {
      this.showSecondPlayBtn = false;
      this.gamePlayService.playExecControlGame();
    }
  }

  onHelpClick() {
    this.showSideButtons = false;
    this.firstPageElement.classList.add('d-none');
    this.pauseBtnElement.classList.remove('d-none');
    if (this.gameName === 'Executive Control Game') {
      this.showSecondPlayBtn = false;
      this.gamePlayService.helpExecControlGame();
    }
    if (this.gameName === 'Interpretation Bias Game') {
      this.gamePlayService.helpIBGame();
    }
  }
  onHomeClick() {
    this.showSideButtons = false;
    window.location.reload();
    // $( '#game_div' ).load(window.location.href + ' #game_div' );
  }

  onExitClick() {
    this.router.navigate(['/games']);
  }

  onPauseClick() {
    this.showSideButtons = true;
    this.pauseBtnElement.classList.add('d-none');
    if (this.gameName === 'Interpretation Bias Game') {
      this.gamePlayService.pauseIBGame();
    }
    if (this.gameName === 'Executive Control Game') {
      this.gamePlayService.pauseExecControlGame();
    }
  }

  onResumeClick() {
    console.log('resume clicked');
    this.showSideButtons = false;
    this.pauseBtnElement.classList.remove('d-none');
    if (this.gameName === 'Executive Control Game') {
      this.gamePlayService.resumeExecControlGame();
    }
    if (this.gameName === 'Interpretation Bias Game') {
      this.gamePlayService.resumeIBGame();
    }
  }

  onRestartClick() {
    this.showSideButtons = false;
    this.pauseBtnElement.classList.remove('d-none');
    if (this.gameName === 'Executive Control Game') {
      this.gamePlayService.restartExecControlGame();
    }
    if (this.gameName === 'Interpretation Bias Game') {
      this.gamePlayService.playIBGame();                      // same function for start and restart the game
    }
  }

  onSoundClick() {
    this.isSoundOn = !this.isSoundOn;
    if (this.gameName === 'Executive Control Game') {
      this.gamePlayService.soundExecControlGame();
    }
  }

}
