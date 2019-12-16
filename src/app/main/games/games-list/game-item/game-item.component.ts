import { Component, OnInit, Input } from '@angular/core';
import { Game } from '@/main/shared/game.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameItemComponent implements OnInit {
  gameStarted = false;
  @Input() game!: Game;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  onGameClick(game: Game) {
    this.gameStarted = true;
    this.router.navigate([game.slug], {relativeTo: this.route} );
  }
}
