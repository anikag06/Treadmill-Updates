import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
