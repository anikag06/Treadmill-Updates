import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollingService {

  scrollingBehaviour = new BehaviorSubject<number>(0);

  constructor() { }


  scrolling(number: number) {
    this.scrollingBehaviour.next(number);
  }
}
