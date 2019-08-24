import { Component, OnInit } from '@angular/core';
import { GamePlayService } from '@/main/games/shared/game-play.service';

@Component({
  selector: 'app-friendly-face-game',
  templateUrl: './friendly-face-game.component.html',
  styleUrls: ['./friendly-face-game.component.scss']
})
export class FriendlyFaceGameComponent implements OnInit {

  constructor(
    private gamePlayService: GamePlayService
  ) { }

  ngOnInit() {
    this.loadImages();
  }

  loadImages() {
    console.log('loadImages');
    this.gamePlayService.ffGameGetImages(1);
  }
}
