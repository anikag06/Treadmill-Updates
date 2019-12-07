import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-lhg-instructions',
  templateUrl: './lhg-instructions.component.html',
  styleUrls: ['./lhg-instructions.component.scss']
})
export class LhgInstructionsComponent implements OnInit {

  colorReverseGame!: boolean;
  game1!: boolean;
  game2!: boolean;
  game3!: boolean;

  constructor(private elementRef: ElementRef,) { }

  ngOnInit() {
  }

  

  onPlay() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    
  }
}
