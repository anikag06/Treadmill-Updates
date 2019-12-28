import { Component, OnInit, ElementRef } from '@angular/core';
import { IdcGameService } from '../idc-game.service';

@Component({
  selector: 'app-idc-instructions',
  templateUrl: './idc-instructions.component.html',
  styleUrls: ['./idc-instructions.component.scss'],
})
export class IdcInstructionsComponent implements OnInit {
  constructor(
    private gameService: IdcGameService,
    private elementRef: ElementRef,
  ) {}

  ngOnInit() {}
  onStart() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    this.gameService.startPlayingIdc.emit();
  }
}
