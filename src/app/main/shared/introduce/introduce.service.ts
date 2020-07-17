import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IntroduceService {
  closeBehaviour = new BehaviorSubject(false);

  constructor() {}

  closeIntroduction() {
    this.closeBehaviour.next(true);
  }
}
