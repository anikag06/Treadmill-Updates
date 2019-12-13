import { Component, OnInit, ElementRef } from '@angular/core';
declare var ffgtimeCount:any;

@Component({
  selector: 'app-ffg-instructions',
  templateUrl: './ffg-instructions.component.html',
  styleUrls: ['./ffg-instructions.component.scss']
})
export class FfgInstructionsComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    
  }
  onStart() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    ffgtimeCount();
  }

}
