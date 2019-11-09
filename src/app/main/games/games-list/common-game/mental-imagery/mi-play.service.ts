import { Injectable, EventEmitter } from '@angular/core';


@Injectable({providedIn: 'root'})
export class MIPlayService {
  constructor() {
  }

  startPlaying = new EventEmitter<any>();

  }