import { Component, OnInit, ElementRef } from '@angular/core';
import { ExecControlHelpService } from './exec-control-help.service';
// import { GamePlayService } from '@/main/games/shared/game-play.service';
declare var closeECGame: any;
@Component({
  selector: 'app-exec-control-instructions',
  templateUrl: './exec-control-instructions.component.html',
  styleUrls: ['./exec-control-instructions.component.scss'],
})
export class ExecControlInstructionsComponent implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private ecGameHelpService: ExecControlHelpService,
  ) {}

  ngOnInit() {}

  ecGameStart() {
    closeECGame();
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    this.ecGameHelpService.startECGame();
  }
}
