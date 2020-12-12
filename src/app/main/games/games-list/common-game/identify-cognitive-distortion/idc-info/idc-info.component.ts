import { Component, OnInit, ElementRef } from '@angular/core';
import { IdcGameService } from '@/main/games/games-list/common-game/identify-cognitive-distortion/idc-game.service';

@Component({
  selector: 'app-idc-info',
  templateUrl: './idc-info.component.html',
  styleUrls: ['./idc-info.component.scss'],
})
export class IdcInfoComponent implements OnInit {
  constructor(
    private element: ElementRef,
    private gameService: IdcGameService,
  ) {}

  ngOnInit() {}

  closePopup() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
    this.gameService.resumeGame.emit();
    this.gameService.infoOpen = false;
  }
}
