import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarGoToService {
  clickFlow = new EventEmitter<any>();
  settingsPageShowEvent = new EventEmitter<any>();
  settingsPageTitle =  new EventEmitter<any>();
  nextControlContentLoad = new EventEmitter<any>();
  constructor() {}
}
