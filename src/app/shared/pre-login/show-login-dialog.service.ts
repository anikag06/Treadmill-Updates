import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowLoginDialogService {

  private loginClickBroadcast = new Subject<void>();

  loginClickBroadcastObservable$ = this.loginClickBroadcast.asObservable();

  constructor() { }

  broadcastLoginClicked() {
    this.loginClickBroadcast.next();
  }
}
