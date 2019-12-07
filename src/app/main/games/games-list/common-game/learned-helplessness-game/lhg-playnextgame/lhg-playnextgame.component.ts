import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { LhgInstructionsComponent } from '../lhg-instructions/lhg-instructions.component';

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
    this.openInstructionsPopup();
    
  }
  openInstructionsPopup() {
    this.dialogBoxService.setDialogChild(LhgInstructionsComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
  }

}
