import { Component, OnInit, ElementRef } from '@angular/core';

declare var startIBGame: any;

@Component({
  selector: 'app-ib-game-instructions',
  templateUrl: './ib-game-instructions.component.html',
  styleUrls: ['./ib-game-instructions.component.scss'],
})
export class IbGameInstructionsComponent implements OnInit {
  game_element!: any;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  onPlayClicked() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    startIBGame();
  }
}
