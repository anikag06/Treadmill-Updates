import { Component, OnInit, ElementRef } from '@angular/core';
import { FfgHelpService } from '../ffg-help.service';
// declare var ffgtimeCount:any;

@Component({
  selector: 'app-ffg-instructions',
  templateUrl: './ffg-instructions.component.html',
  styleUrls: ['./ffg-instructions.component.scss']
})
export class FfgInstructionsComponent implements OnInit {

  constructor(private elementRef: ElementRef,
              private ffghelpService:FfgHelpService,) { }

  ngOnInit() {
    
  }
  onStart() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    // ffgtimeCount();
    if (document.readyState !== 'complete') {
      this.ffghelpService.showLoadingBar();
    }
  }

}
