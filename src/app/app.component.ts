import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { AuthService } from './shared/auth/auth.service';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
  RouterOutlet,
} from '@angular/router';
import { slideInAnimation } from './shared/main.animations';
import { Title } from '@angular/platform-browser';
import { A2HSService } from '@/shared/a2hs.service';
import { AppUpdateService } from '@/app-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  loading = false;
  isUpdating = false;

  constructor(
    private auth: AuthService,
    private titleService: Title,
    private a2HSService: A2HSService,
    private updateService: AppUpdateService,
    private router: Router
  ) {
    this.titleService.setTitle('TreadWill');
    this.a2HSService.setDeferredPrompt();
    this.updateService.checkForUpdates();
    router.events.subscribe((event: any) => {
      this.isUpdating = window.localStorage.getItem('UPDATE') === 'update';
      this.navigationInterceptor(event);
    });
  }

  ngOnInit() {
    this.subscription = interval(60000).subscribe((val) => {
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

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
      window.localStorage.setItem('UPDATE', 'updated');
      this.isUpdating = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }
}
