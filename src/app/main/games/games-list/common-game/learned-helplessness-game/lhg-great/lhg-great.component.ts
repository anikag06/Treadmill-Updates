import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-lhg-great',
  templateUrl: './lhg-great.component.html',
  styleUrls: ['./lhg-great.component.scss']
})
export class LhgGreatComponent implements OnInit {

  constructor(private elementRef: ElementRef,) { }

  ngOnInit() {
  }
  onShowSummary() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    const showSummary = document.getElementById('explanation-row');
    const colorReverseGame = document.getElementById('color-reverse-game');
    if (showSummary && colorReverseGame) {
      showSummary.classList.remove('d-none');
      colorReverseGame.classList.add('d-none');
    }}

}
