import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  formTitle = new EventEmitter<any>();
  formName = '';
  getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
