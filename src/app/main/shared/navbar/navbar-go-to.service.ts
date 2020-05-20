import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarGoToService {

  clickFlow = new EventEmitter<any>();
  constructor() { }
}
