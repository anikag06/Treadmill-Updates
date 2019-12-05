import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-idc-win',
  templateUrl: './idc-win.component.html',
  styleUrls: ['./idc-win.component.scss']
})
export class IdcWinComponent implements OnInit {

  constructor( private elementRef: ElementRef) { }

  ngOnInit() {
  }
  onStartNext() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
  }


}
