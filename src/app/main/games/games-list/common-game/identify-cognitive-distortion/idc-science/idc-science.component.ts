import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-idc-science',
  templateUrl: './idc-science.component.html',
  styleUrls: ['./idc-science.component.scss'],
})
export class IdcScienceComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  onClose() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
  }
}
