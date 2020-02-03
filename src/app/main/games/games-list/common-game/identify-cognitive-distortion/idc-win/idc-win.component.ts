import { Component, OnInit, ElementRef } from '@angular/core';
import { IdcGameService } from '../idc-game.service';

@Component({
  selector: 'app-idc-win',
  templateUrl: './idc-win.component.html',
  styleUrls: ['./idc-win.component.scss'],
})
export class IdcWinComponent implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private gameService: IdcGameService,
  ) {}

  ngOnInit() {}
  onStartNext() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    this.gameService.serviceCall();
    this.gameService.optionStatusCount = 0;
  }
}
