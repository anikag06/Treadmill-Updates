import { Component, OnInit } from '@angular/core';
import { GamesService } from '@/main/shared/games.service';
import { Game } from '@/main/shared/game.model';
import { Observable } from 'rxjs';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {

  games$!: Observable<Game[]>;

  constructor(
    private gamesService: GamesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.games$ = this.gamesService.getGames();
  }

  onGameClick(game: Game) {
    if (game.name === 'Interpretation Bias Game') {
      this.router.navigate(['interpretationbias'], {relativeTo: this.route} );
    }
  }

}
