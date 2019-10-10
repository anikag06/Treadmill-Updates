import { Component, OnInit } from '@angular/core';
import { GamePlayService } from '@/main/games/shared/game-play.service';

@Component({
  selector: 'app-ib-game-instructions',
  templateUrl: './ib-game-instructions.component.html',
  styleUrls: ['./ib-game-instructions.component.scss']
})
export class IbGameInstructionsComponent implements OnInit {

  constructor(
    private gamePlayService: GamePlayService,
  ) { }

  ngOnInit() {
  }

  onPlayClicked() {
    this.gamePlayService.playIBGame();
  }
}
