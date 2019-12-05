import { Component, OnInit } from '@angular/core';
import { IdcGameService } from './idc-game.service';

@Component({
  selector: 'app-identify-cognitive-distortion',
  templateUrl: './identify-cognitive-distortion.component.html',
  styleUrls: ['./identify-cognitive-distortion.component.scss']
})
export class IdentifyCognitiveDistortionComponent implements OnInit {

  playing = false;
  constructor(private gameService: IdcGameService) { }

  ngOnInit() {
    this.gameService.startPlayingIdc.subscribe( () => {
      this.startPlaying();
    });
  }

  startPlaying() {
    this.playing = true;
  }


}
