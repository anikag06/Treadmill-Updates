import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ffg-science',
  templateUrl: './ffg-science.component.html',
  styleUrls: ['./ffg-science.component.scss'],
})
export class FfgScienceComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  onClose() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
  }
}
