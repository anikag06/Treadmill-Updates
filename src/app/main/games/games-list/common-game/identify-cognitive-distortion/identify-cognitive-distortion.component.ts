import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IdcGameService } from './idc-game.service';
import { IdcScoreComponent } from './idc-score/idc-score.component';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { IdcInfoComponent } from './idc-info/idc-info.component';

@Component({
  selector: 'app-identify-cognitive-distortion',
  templateUrl: './identify-cognitive-distortion.component.html',
  styleUrls: ['./identify-cognitive-distortion.component.scss']
})
export class IdentifyCognitiveDistortionComponent implements OnInit {

  @ViewChild(IdcScoreComponent, {static: false}) idcScoreComponent!: IdcScoreComponent;
  @ViewChild('infoElement', { static: false }) element!: ElementRef;



  constructor(private gameService: IdcGameService,
              private dialogBoxService: DialogBoxService) { }


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
    this.removeBlurrBackground();
  }

  pauseIDCGame() {
    this.idcScoreComponent.onPause();
    this.blurrBackground();
  }

  resumeIDCGame() {
    this.idcScoreComponent.startTimer();
    this.removeBlurrBackground();
  }

  blurrBackground() {
    const custom_container = document.getElementById('blurrContainer');
    if (custom_container) {
      custom_container.classList.add('blurrContainer');
    }
  }

  removeBlurrBackground() {
    const custom_container = document.getElementById('blurrContainer');
    if (custom_container) {
      custom_container.classList.remove('blurrContainer');
    }
  }
  openInfoPopup() {
    this.dialogBoxService.setDialogChild(IdcInfoComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
  }


}
