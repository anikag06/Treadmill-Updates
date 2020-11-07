import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FfgHelpService {
  updateBadges = new EventEmitter();
  bronzeNumber!: any;
  silverNumber!: any;
  goldNumber!: any;
  bronzeValue!: any;
  silverValue!: any;
  goldValue!: any;
  show_tutorial = false;
  sendScoreFfg = 0;

  constructor() {}

  showLoadingBar() {
    console.log('Show loading bar');
    const domEvent = new CustomEvent('loadingBarEvent', { bubbles: true });
    window.dispatchEvent(domEvent);
  }
}
