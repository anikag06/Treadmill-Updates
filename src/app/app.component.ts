import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { AuthService } from './shared/auth/auth.service';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './shared/main.animations';
import { Title } from '@angular/platform-browser';
import { A2HSService } from '@/shared/a2hs.service';
import { TREADWILL } from '@/app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  REFRESH_INTERVAL = 600000;

  constructor(
    private auth: AuthService,
    private titleService: Title,
    private a2HSService: A2HSService
  ) {
    this.titleService.setTitle(TREADWILL);
    this.a2HSService.setDeferredPrompt();
  }

  ngOnInit() {
    this.subscription = interval(this.REFRESH_INTERVAL).subscribe((val) => {
      this.auth.refresh();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getRouteData(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
