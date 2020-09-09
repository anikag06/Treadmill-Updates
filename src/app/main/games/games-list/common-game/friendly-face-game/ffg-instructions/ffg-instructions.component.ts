import { Component, OnInit, ElementRef } from '@angular/core';
import { FfgHelpService } from '../ffg-help.service';
declare var ffg_music_notes_array: any;
declare var ffg_loaded_friendly_images: any;
declare var ffg_loaded_hostile_images: any;
declare var ffGResumeGame: any;
declare var ffGameSongCounter: any;
declare var ffGameStart: any;

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
    const domEvent = new CustomEvent('removeOverlayEvent', {bubbles: true});
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    if (this.ffghelpService.show_tutorial) {
      const tid = setInterval(() => {
        if (
          document.readyState !== 'complete' ||
          ffg_music_notes_array.length === 0 ||
          ffg_loaded_friendly_images.length === 0 ||
          ffg_loaded_hostile_images.length === 0 ||
          ffGameSongCounter !== 0
        ) {
          console.log('checking if statement', ffg_music_notes_array.length);
          return;
        }
        clearInterval(tid);
        // function to be called when document is ready
        console.log('calling ffgame start');
        ffGameStart();
      }, 1000);
        this.ffghelpService.showLoadingBar();
        this.ffghelpService.show_tutorial = false;
    } else {
      ffGResumeGame();
    }
  }
}
