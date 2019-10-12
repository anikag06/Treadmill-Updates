import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IbTrainingDataService {

  constructor() { }

  private ibgScoreData = new Subject<any>();
  ibgScoreDataObservable = this.ibgScoreData.asObservable();

  callStoreDataMethod(value: any) {
    this.ibgScoreData.next(value);
  }
}
