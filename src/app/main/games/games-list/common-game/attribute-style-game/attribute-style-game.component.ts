import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { LoadFilesService } from '@/main/games/shared/load-files.service';
import { GamesAuthService } from '@/main/games/shared/games-auth.service';
import { GamePlayService } from '@/main/games/shared/game-play.service';
import {GamesFeedbackComponent} from '@/main/games/games-list/common-game/games-feedback/games-feedback.component';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { ActivatedRoute, Router } from '@angular/router';


declare var ASGAnswer: any;

@Component({
  selector: 'app-attribute-style-game',
  templateUrl: './attribute-style-game.component.html',
  styleUrls: ['./attribute-style-game.component.scss'],
})
export class AttributeStyleGameComponent implements OnInit {
  constructor(
    private loadFileService: LoadFilesService,
    private gamesAuthService: GamesAuthService,
    private gamePlayService: GamePlayService,
    private dialogBoxService: DialogBoxService,
    private router: Router,
  ) {}
  @ViewChild('newElement', { static: false }) element!: ElementRef;


  ngOnInit() {
    this.loadFileService
      .loadExternalScript('./assets/games/Attribution-style-game/src/app.js')
      .then(() => {})
      .catch(() => {});
    this.gamePlayService.ASGUserData();

    /* this.gamesAuthService.atGetAnswers().subscribe(
      e => {
        ASGAnswer = e;
        console.log(ASGAnswer);
      }
    );*/
  }




  @HostListener('window:ASGPostIndividualLevelPerformance')
  postIndividualLevelPerformance() {
    console.log('works1');
    this.gamePlayService.postIndividualLevelASG();
  }

  @HostListener('window:ASGPostLevelTwoPerformance')
  postLevelTwoPerformance() {
    console.log('works2');
    this.gamePlayService.postIndividualLevelASG();
  }

  @HostListener('window:ASGpostUserAnswer')
  ASGpostUserAnswer() {
    console.log('works2');
    this.gamePlayService.postUserAnswer();
  }

  @HostListener('window:ASGpostUserExplanation')
  ASGpostUserExplanation() {
    console.log('works2');
    this.gamePlayService.postUserExplanation();
  }

  @HostListener('window:Feedback')
  openFeedbackPopup() {
      this.dialogBoxService.setDialogChild(GamesFeedbackComponent);
      const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
      this.element.nativeElement.dispatchEvent(domEvent);
  }

  @HostListener('window:ASGPut')
  ASGPutRequest() {
    this.gamePlayService.putUserPerformance();
  }

  @HostListener('window:GoHome')
  ASGgoHome() {
    console.log('gohome');
    this.router.navigate(['/']);
  }

}
