import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Game } from '@/main/shared/game.model';
import {
  ATTRIBUTE_STYLE_GAME,
  EXECUTIVE_CONTROL_GAME,
  FRIENDLY_FACE_GAME,
  IDENTIFY_COGNITIVE_DISTORTION_GAME,
  INTERPRETATION_BIAS_GAME,
  LEARNED_HELPLESSNESS_GAME,
  MENTAL_IMAGERY_GAME,
} from '@/app.constants';
import { GamePlayService } from '@/main/games/shared/game-play.service';
import { GamesService } from '@/main/shared/games.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { MIPlayService } from '@/main/games/games-list/common-game/mental-imagery/mi-play.service';
import { IdcGameService } from '@/main/games/games-list/common-game/identify-cognitive-distortion/idc-game.service';
import { Subscription } from 'rxjs';
declare var ffg_music_notes_array: any;
declare var ffg_loaded_friendly_images: any;
declare var ffg_loaded_hostile_images: any;
declare var sentence_array: any;
declare var lhGameLevelStrings: any;

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
})
export class LoadingBarComponent implements OnInit {
  loadingBarValue!: number;
  loadingInterval: any;
  subscriptionRouter!: Subscription;
  game!: Game;
  gameName!: string;

  constructor(
    private gamePlayService: GamePlayService,
    private gamesService: GamesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loadingInterval = setInterval(() => {
      this.updateLoadingbar();
    }, 100);
  }

  updateLoadingbar() {
    console.log(document.readyState, this.gamePlayService.gameName, this.gamePlayService.lhGameInstrnRead);
    if (document.readyState === 'loading') {
      this.loadingBarValue = 50;
    } else if (document.readyState === 'interactive') {
      this.loadingBarValue = 75;
    } else if (document.readyState === 'complete') {
      this.loadingBarValue = 95;
      if (this.gamePlayService.gameName === FRIENDLY_FACE_GAME) {
        if (
          ffg_music_notes_array.length !== 0 &&
          ffg_loaded_friendly_images.length !== 0 &&
          ffg_loaded_hostile_images.length !== 0
        ) {
          this.completeLoading();
        }
      } else if (this.gamePlayService.gameName === INTERPRETATION_BIAS_GAME) {
        if (sentence_array.length !== 0) {
          this.completeLoading();
        }
      } else if (this.gamePlayService.gameName === LEARNED_HELPLESSNESS_GAME) {
        if ( lhGameLevelStrings.length !== 0) {
          this.completeLoading();
        }
      }
    }
  }
  completeLoading() {
    this.loadingBarValue = 100;
    clearInterval(this.loadingInterval);
    setTimeout(() => {
      const domEvent = new CustomEvent('removeloadingBarEvent', {
        bubbles: true,
      });
      window.dispatchEvent(domEvent);
    }, 1000);

  }
}
