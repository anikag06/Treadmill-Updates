import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-lhg-science',
  templateUrl: './lhg-science.component.html',
  styleUrls: ['./lhg-science.component.scss']
})
export class LhgScienceComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
  }

  onclose() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
  }
}
