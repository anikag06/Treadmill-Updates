import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ibg-science',
  templateUrl: './ibg-science.component.html',
  styleUrls: ['./ibg-science.component.scss']
})
export class IbgScienceComponent implements OnInit {

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
