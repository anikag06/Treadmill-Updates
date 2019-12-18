import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { LhgInstructionsComponent } from '../lhg-instructions/lhg-instructions.component';
declare var lhg_show_instructions: boolean;
declare var lhg_second_time: boolean;


@Component({
  selector: 'app-lhg-playnextgame',
  templateUrl: './lhg-playnextgame.component.html',
  styleUrls: ['./lhg-playnextgame.component.scss']
})
export class LhgPlaynextgameComponent implements OnInit {

  @ViewChild('playBtn', { static: false }) element!: ElementRef;

  constructor(private elementRef: ElementRef,
    private dialogBoxService: DialogBoxService) { }

  ngOnInit() {
  }
  onPlay() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);

    if (lhg_show_instructions && !lhg_second_time) {
      this.openInstructionsPopup();
    }
    const game2_start = document.getElementById('frog-game-row');
    if(game2_start) {
      game2_start.focus();
    }
    const game3_start = document.getElementById('box-up-game-row');
    if(game3_start) {
      game3_start.focus();
    }
  }

  openInstructionsPopup() {
    this.dialogBoxService.setDialogChild(LhgInstructionsComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
  }

}
