import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class A2HSService {
  private deferredPrompt!: any;

  setDeferredPrompt() {
    console.log('set prompt');
    window.addEventListener('beforeinstallprompt', e => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
      console.log('Intercepting the app install banner prompt');

      // Wait for the user to respond to the prompt
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
      });
    });
  }

  getDeferredPrompt(): Observable<any> {
    console.log(this.deferredPrompt);
    return of(this.deferredPrompt);
  }
}
