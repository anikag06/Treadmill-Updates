import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class A2HSService {
  private deferredPrompt!: any;

  setDeferredPrompt() {
    console.log('set prompt');
    window.addEventListener('beforeinstallprompt',(e : Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
      console.log('Intercepting the app install banner prompt');
    });
  }

  getDeferredPrompt(): Observable<any> {
    console.log(this.deferredPrompt);
    return of(this.deferredPrompt);
  }
}
