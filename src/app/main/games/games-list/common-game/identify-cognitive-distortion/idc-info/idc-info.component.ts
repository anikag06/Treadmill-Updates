import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-idc-info',
  templateUrl: './idc-info.component.html',
  styleUrls: ['./idc-info.component.scss'],
})
export class IdcInfoComponent implements OnInit {
  constructor(private element: ElementRef) {}

  ngOnInit() {}

  closePopup() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
  }
}
