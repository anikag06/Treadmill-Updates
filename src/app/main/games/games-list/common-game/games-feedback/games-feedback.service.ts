import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesFeedbackService {

  feedback = new EventEmitter<any>();
  constructor() { }
}
