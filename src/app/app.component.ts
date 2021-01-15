import { Component } from '@angular/core';
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
export class AppComponent {
  constructor(private titleService: Title, private a2HSService: A2HSService) {
    this.titleService.setTitle(TREADWILL);
    this.a2HSService.setDeferredPrompt();
  }

  getRouteData(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
