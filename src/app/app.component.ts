import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { AuthService } from './shared/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  subscription!: Subscription;

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.subscription = interval(10000)
      .subscribe((val) => { this.auth.refresh(); });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
