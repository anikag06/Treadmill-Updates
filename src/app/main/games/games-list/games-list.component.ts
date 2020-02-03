import { Component, OnInit, Renderer2 } from '@angular/core';
import { GamesService } from '@/main/shared/games.service';
import { Game } from '@/main/shared/game.model';
import { Observable } from 'rxjs';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { GamePlayService } from '@/main/games/shared/game-play.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
})
export class GamesListComponent implements OnInit {
  games$!: Observable<Game[]>;

  constructor(private gamesService: GamesService) {}

  ngOnInit() {
    this.games$ = this.gamesService.getGames();
  }

  getBackgroundImg() {
    return 'url(\"assets/games/executive-control-game/png/background_images/mountains.png\")';
  }
}
