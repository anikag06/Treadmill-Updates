import { Component, OnInit, Renderer2 } from '@angular/core';
import { GamesService } from '@/main/shared/games.service';
import { Game } from '@/main/shared/game.model';
import { Observable } from 'rxjs';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { GamePlayService } from '@/main/games/shared/game-play.service';
declare var game_paused: any;

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {
  gameStarted = false;
  games$!: Observable<Game[]>;
  game_div!: HTMLElement;

  constructor(
    private gamePlayService: GamePlayService,
    private gamesService: GamesService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    this.games$ = this.gamesService.getGames();
    this.game_div = document.getElementById('game_div') as HTMLElement;
    console.log(game_paused);
  }

  onGameClick(game: Game) {
    this.gameStarted = true;
    // this.gameName = game.name;
    // this.renderer.setStyle(this.game_div, 'background-image', this.getBackgroundImg());
    // this.renderer.setStyle(this.game_div, 'background-repeat', 'no-repeat');
    // this.renderer.setStyle(this.game_div, 'background-color', '#a2e2ec');
    // if (game.name === 'Interpretation Bias Game') {
    //   this.router.navigate(['interpretationbias'], {relativeTo: this.route} );
    // }
    // if (game.name === 'Executive Control Game') {
    this.router.navigate([game.slug], {relativeTo: this.route} );
    // }
  }
  getBackgroundImg() {
    return  'url(\"assets/games/executive-control-game/png/background_images/mountains.png\")';
  }
}
