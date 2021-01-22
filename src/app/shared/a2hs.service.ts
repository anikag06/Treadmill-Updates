import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class A2HSService {
  private deferredPrompt!: any;

  setDeferredPrompt() {
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
    });
  }

  getDeferredPrompt(): Observable<any> {
    return of(this.deferredPrompt);
  }
}
