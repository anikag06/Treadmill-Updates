import { Injectable, EventEmitter } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MIPlayService {
  constructor() {}

  startPlaying = new EventEmitter<any>();
  levelUpdate = new EventEmitter<any>();
  startNext = new EventEmitter<any>();
  setLevel = new EventEmitter<any>();
}
