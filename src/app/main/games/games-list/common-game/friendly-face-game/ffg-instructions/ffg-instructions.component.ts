import { Component, OnInit, ElementRef } from '@angular/core';
import { FfgHelpService } from '../ffg-help.service';
declare var ffg_music_notes_array: any;
declare var ffg_loaded_friendly_images: any;
declare var ffg_loaded_hostile_images: any;

@Component({
  selector: 'app-ffg-instructions',
  templateUrl: './ffg-instructions.component.html',
  styleUrls: ['./ffg-instructions.component.scss'],
})
export class FfgInstructionsComponent implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private ffghelpService: FfgHelpService,
  ) {}

  ngOnInit() {}
  onStart() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    if (
      document.readyState !== 'complete' ||
      ffg_music_notes_array.length === 0 ||
      ffg_loaded_friendly_images.length === 0 ||
      ffg_loaded_hostile_images.length === 0
    ) {
      this.ffghelpService.showLoadingBar();
    }
  }
}
