import { Component, OnInit, Input } from '@angular/core';
import { Game } from '@/main/shared/game.model';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameItemComponent implements OnInit {

  @Input() game!: Game;

  constructor() { }

  ngOnInit() {
  }

}
