import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingBarService {
  constructor() {}

  showLoadingBar() {
    console.log('Show loading bar');
    const domEvent = new CustomEvent('loadingBarEvent', { bubbles: true });
    window.dispatchEvent(domEvent);
  }
}
