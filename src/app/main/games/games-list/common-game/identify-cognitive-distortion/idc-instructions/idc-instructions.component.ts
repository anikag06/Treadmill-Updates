import { Component, OnInit, ElementRef } from '@angular/core';
import { IdcGameService } from '../idc-game.service';
import { LoadingBarService } from '@/main/games/shared/loading-bar.service';

@Component({
  selector: 'app-idc-instructions',
  templateUrl: './idc-instructions.component.html',
  styleUrls: ['./idc-instructions.component.scss'],
})
export class IdcInstructionsComponent implements OnInit {
  constructor(
    private gameService: IdcGameService,
    private elementRef: ElementRef,
    private loadingBarService: LoadingBarService,
  ) {}

  ngOnInit() {}
  onStart() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    this.loadingBarService.showLoadingBar();
    this.gameService.startPlayingIdc.emit();
  }
}
