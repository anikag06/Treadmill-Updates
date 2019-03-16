import { Component, OnInit } from '@angular/core';
import { GamesService } from '@/main/shared/games.service';
import { Game } from '@/main/shared/game.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {

  games$!: Observable<Game[]>;

  constructor(
    private gamesService: GamesService
  ) { }

  ngOnInit() {
    this.games$ = this.gamesService.getGames();
  }

  onGameClick(game: Game) {
    alert("naviaget to game " + game.name);
  }

}
