import { Component, OnInit, ElementRef } from '@angular/core';
import { GamePlayService } from '@/main/games/shared/game-play.service';
import { LhgInstructionsComponent } from '../lhg-instructions/lhg-instructions.component';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';

@Component({
  selector: 'app-lhg-howtoplay',
  templateUrl: './lhg-howtoplay.component.html',
  styleUrls: ['./lhg-howtoplay.component.scss'],
})
export class LhgHowtoplayComponent implements OnInit {
  viewSummary!: boolean;

  constructor(
    private elementRef: ElementRef,
    private gamePlayService: GamePlayService,
    private dialogBoxService: DialogBoxService,
  ) {}

  ngOnInit() {
    this.viewSummary = this.gamePlayService.lhgShowSummary;
  }

  onStart() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    this.removeCoverImage();
    this.openInstructionsPopup();
  }

  openInstructionsPopup() {
    this.dialogBoxService.setDialogChild(LhgInstructionsComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
  }
  onShowSummary() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    const showSummary = document.getElementById('explanation-row');
    const colorReverseGame = document.getElementById('color-reverse-game');
    this.removeCoverImage();
    if (showSummary && colorReverseGame) {
      showSummary.classList.remove('d-none');
      colorReverseGame.classList.add('d-none');
    }
  }

  removeCoverImage() {
    const removeImage = document.getElementById('lhg-cover');
    if (removeImage) {
      removeImage.classList.add('d-none');
    }
  }
}
