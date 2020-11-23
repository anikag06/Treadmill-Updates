import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { IdcGameService } from '../idc-game.service';
import { IdcInfoComponent } from '../idc-info/idc-info.component';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { GamesFeedbackService } from '../../games-feedback/games-feedback.service';
import {GamesFeedbackComponent} from "@/main/games/games-list/common-game/games-feedback/games-feedback.component";

@Component({
  selector: 'app-idc-main',
  templateUrl: './idc-main.component.html',
  styleUrls: ['./idc-main.component.scss'],
})
export class IdcMainComponent implements OnInit {
  feedbackSub: any;
  constructor(
    private gameService: IdcGameService,
    private elementRef: ElementRef,
    private gamesFeedbackService: GamesFeedbackService,
    private dialogBoxService: DialogBoxService,

  ) {}

  @Input() blurred!: boolean;
  ngOnInit() {
    this.gameService.getGameData();
    // this.gameService.initUserData();
    this.feedbackSub = this.gamesFeedbackService.idcfeedback.subscribe(() => {
      this.openFeedback();
      console.log('GAME FEEDBACK');
    });
  }
  openFeedback() {
    this.dialogBoxService.setDialogChild(GamesFeedbackComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
  }
}
