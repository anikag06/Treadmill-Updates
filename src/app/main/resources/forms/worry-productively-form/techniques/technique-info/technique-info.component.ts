import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-technique-info',
  templateUrl: './technique-info.component.html',
  styleUrls: ['./technique-info.component.scss'],
})
export class TechniqueInfoComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {}
  BackToForm() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
  }
}
