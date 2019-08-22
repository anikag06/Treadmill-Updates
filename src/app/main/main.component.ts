import { Component, OnInit, ViewChild, OnChanges, DoCheck } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { Router, NavigationStart } from '@angular/router';
import { DEFAULT_PATH } from '@/app.constants';
import { MatDrawer } from '@angular/material';
import { DataService } from './dashboard/questionnaire/data.service';
import {FcmService} from '@/main/fcm.service';
// tslint:disable-next-line:max-line-length


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnChanges, DoCheck {


  user!: User;
  routing!: boolean;


  @ViewChild('drawer', {static : true}) drawer!: MatDrawer;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small])
    .pipe(
      map(result => result.matches)
    );
    isExpanded = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private dataService: DataService,
    private fcmService: FcmService,
  ) {}

  ngOnChanges() {
  }


  ngOnInit() {
    const user = this.authService.isLoggedIn();
    if (user && user.is_active) {
      this.user = <User>user;
    } else {
      this.router.navigate([DEFAULT_PATH]);
    }

    this.fcmService.requestPermission();
  }

  ngDoCheck() {
    this.routing = this.dataService.getOption();
    const user = this.authService.isLoggedIn();
    if (user && user.is_active) {
      this.user = <User>user;
      if (this.routing === false) {
        this.goToQuestionnaire(this.router);
      }
    }
    if (this.routing === false) {
      this.router.events
      .pipe(
        filter(e => e instanceof NavigationStart)
      ).subscribe((e: any) => {
        this.goToQuestionnaire(e);
      });
    }
  }

  onLinkClick(event: Event) {
    if (window.innerWidth < 960) {
      this.drawer.toggle();
    }
  }

  goToQuestionnaire(e: any) {
    if (e.url !== '/questionnaire' && this.user) {
      this.router.navigate(['/questionnaire']);
    }
  }
}
