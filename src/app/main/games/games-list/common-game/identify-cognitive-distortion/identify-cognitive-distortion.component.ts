import { Component, OnInit, ViewChild } from '@angular/core';
import { IdcGameService } from './idc-game.service';
import { IdcScoreComponent } from './idc-score/idc-score.component';

@Component({
  selector: 'app-identify-cognitive-distortion',
  templateUrl: './identify-cognitive-distortion.component.html',
  styleUrls: ['./identify-cognitive-distortion.component.scss']
})
export class IdentifyCognitiveDistortionComponent implements OnInit {

  @ViewChild(IdcScoreComponent, {static: false}) idcScoreComponent!: IdcScoreComponent;

  constructor(private gameService: IdcGameService) { }


  ngOnInit() {
    this.gameService.startPlayingIdc.subscribe( () => {
      this.startPlaying();
    });
  }

 
  playing = false;


  startPlaying() {
    this.playing = true;
  }

  replayIDCGame() {
    this.gameService.getUserData();
    this.gameService.optionStatus = '';
  }

  pauseIDCGame() {
    this.idcScoreComponent.onPause();
  }

  resumeIDCGame() {
    this.idcScoreComponent.startTimer();
  }

}
