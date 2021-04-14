import { Component, OnInit, Renderer2 } from '@angular/core';
import { GamesService } from '@/main/shared/games.service';
import { Game } from '@/main/shared/game.model';
import { Observable } from 'rxjs';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { GamePlayService } from '@/main/games/shared/game-play.service';
import {GamesBar} from "@/main/shared/games-bar.model";
import {GamesProgressBarService} from "@/main/games/shared/games-progress-bar.service";

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
})
export class GamesListComponent implements OnInit {
  games$!: Observable<Game[]>;
  gamesBarData!: any;
  progressData = false;

  constructor(private gamesService: GamesService,
              private gamesProgressBarService: GamesProgressBarService,
              ) {}

  ngOnInit() {
    this.games$ = this.gamesService.getGames();
    this.gamesProgressBarService
      .getGamesProgressInfo()
      .subscribe((object: any) => {
        this.gamesBarData = object;
        this.progressData = true;
      });
  }

  getBackgroundImg() {
    return 'url(\"assets/games/executive-control-game/png/background_images/mountains.png\")';
  }
}
