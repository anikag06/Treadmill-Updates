import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-asg-science',
  templateUrl: './asg-science.component.html',
  styleUrls: ['./asg-science.component.scss'],
})
export class AsgScienceComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}

  onClose() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
  }
}
