import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { slideInAnimation } from './shared/main.animations';
import { Title } from '@angular/platform-browser';
import { A2HSService } from '@/shared/a2hs.service';
import { IS_VISITED, LOGGED_IN_PATH, TREADWILL } from '@/app.constants';
import { AuthService } from '@/shared/auth/auth.service';
import { CommonService } from '@/shared/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent {
  constructor(
    private titleService: Title,
    private a2HSService: A2HSService,
    private router: Router,
    private authService: AuthService,
    private commonService: CommonService
  ) {
    this.titleService.setTitle(TREADWILL);
    this.a2HSService.setDeferredPrompt();
    const user = this.authService.isLoggedIn();
    const url = window.location.href;

    if (user && user.is_active && !url.includes('main')) {
      this.router.navigate([LOGGED_IN_PATH]);
    }
  }

  ngOnInit() {
    if (
      !this.commonService.isChromeBrowser() &&
      sessionStorage.getItem(IS_VISITED) === null
    ) {
      this.commonService.showBrowserChangeDialog();
      sessionStorage.setItem(IS_VISITED, 'true');
    }
  }

  getRouteData(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
