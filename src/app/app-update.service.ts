import { ApplicationRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppUpdateService {
  showGIF = false;
  constructor(
    private http: HttpClient,
    private update: SwUpdate,
    private appRef: ApplicationRef
  ) {
    if (this.update.isEnabled) {
      this.appRef.isStable.subscribe((isStable) => {
        if (isStable) {
          const timeInterval = interval(3 * 60 * 60 * 1000);

          timeInterval.subscribe(() => {
            this.update.checkForUpdate().then(() => console.log('checked'));
            console.log('update checked');
          });
        }
      });
    }
  }
  checkForUpdates() {
    this.update.available.subscribe((event) => {
      this.update.activateUpdate().then(() => {
        window.localStorage.setItem('UPDATE', 'update');
        window.location.reload();
      });
    });
  }

  setShowGIF(value: boolean) {
    this.showGIF = value;
  }

  getShowGIF() {
    return this.showGIF;
  }
}
