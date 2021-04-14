import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ShowLoginSignupDialogService } from '@/pre-login/shared/show-login-signup-dialog.service';
import { A2HSService } from '@/shared/a2hs.service';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';
import { AuthService } from '@/shared/auth/auth.service';
import {
  DEFAULT_PATH,
  IS_VISITED,
  LANDING_RESET_PASSWORD_PATH,
  LOGGED_IN_PATH,
  LOGIN_AFTER_RESET,
} from '@/app.constants';

import { MatLoginDialogComponent } from '@/pre-login/login/mat-login-dialog/mat-login-dialog.component';
import { MatDialog } from '@angular/material';
import { ChangeBrowserDialogComponent } from '@/shared/change-browser-dialog/change-browser-dialog.component';
import { CommonService } from '@/shared/common.service';

@Component({
  selector: 'app-pre-login',
  templateUrl: './pre-login.component.html',
  styleUrls: ['./pre-login.component.scss'],
  providers: [MatContactUsDialogService],
})
export class PreLoginComponent implements OnInit {
  loggedIn = false;
  url!: string;

  constructor(
    private showLoginSignupDialogService: ShowLoginSignupDialogService,
    private showContactUsService: MatContactUsDialogService,
    private a2hsService: A2HSService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
  ) {}

  ngOnInit() {
    const user = this.authService.isLoggedIn();
    if (user && user.is_active) {
      // this.router.navigate([LOGGED_IN_PATH]);
    } else {
      this.router.navigate([DEFAULT_PATH]);
      if (
        !this.commonService.isChromeBrowser() &&
        sessionStorage.getItem(IS_VISITED) === null
      ) {
        this.commonService.showBrowserChangeDialog();
        sessionStorage.setItem(IS_VISITED, 'true');
      }
    }

    if (this.router.url === LANDING_RESET_PASSWORD_PATH) {
      this.onLoginClicked();
    }

    if (this.router.url === LOGIN_AFTER_RESET) {
      this.onLoginClicked();
    }
  }

  onLoginClicked() {
    this.showLoginSignupDialogService.broadcastLoginClicked(
      MatLoginDialogComponent,
    );
  }

  onContactUsClicked() {
    this.showContactUsService.contactUsClicked();
  }

  onJoinTheStudyClicked() {
    this.showLoginSignupDialogService.joinStudyClicked();
  }

  onWorkWithUsClicked() {
    const url =
      'https://docs.google.com/forms/d/e/1FAIpQLSfVDBSuxgghsD2SX4VWkOA2AHCotfhkOx0Qbhrci9PRLh-IPg/viewform?usp=send_form';
    window.open(url, '_blank');
  }

  onPrivacyPolicyClick() {
    this.router.navigate(['trial/privacy-policy']);
  }

  onTermsConditions() {
    this.router.navigate(['trial/terms-and-conditions']);
  }
}
