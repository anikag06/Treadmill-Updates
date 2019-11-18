import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-mig-science',
  templateUrl: './mig-science.component.html',
  styleUrls: ['./mig-science.component.scss']
})
export class MigScienceComponent implements OnInit {

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
