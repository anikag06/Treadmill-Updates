import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ecg-science',
  templateUrl: './ecg-science.component.html',
  styleUrls: ['./ecg-science.component.scss'],
})
export class EcgScienceComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  onclose() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
  }
}
