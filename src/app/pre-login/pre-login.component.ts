import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShowLoginSignupDialogService } from '@/pre-login/shared/show-login-signup-dialog.service';
import { A2HSService } from '@/shared/a2hs.service';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';
import { AuthService } from '@/shared/auth/auth.service';
import { LOGGED_IN_PATH, DEFAULT_PATH } from '@/app.constants';

import { MatLoginDialogComponent } from '@/pre-login/login/mat-login-dialog/mat-login-dialog.component';

@Component({
  selector: 'app-pre-login',
  templateUrl: './pre-login.component.html',
  styleUrls: ['./pre-login.component.scss'],
  providers: [MatContactUsDialogService]
})
export class PreLoginComponent implements OnInit {

  loggedIn = false;

  constructor(
    private showLoginSignupDialogService: ShowLoginSignupDialogService,
    private showContactUsService: MatContactUsDialogService,
    private a2hsService: A2HSService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.a2hsService.setDeferredPrompt();
    const user = this.authService.isLoggedIn();
    if (user && user.is_active) {
      this.router.navigate([LOGGED_IN_PATH]);
    } else {
      this.router.navigate([DEFAULT_PATH]);
    }
  }

  onLoginClicked() {
    this.showLoginSignupDialogService.broadcastLoginClicked(MatLoginDialogComponent);
  }


  onContactUsClicked() {
    this.showContactUsService.contactUsClicked();
  }

  onTrialReg() {
    this.router.navigate(['trial/trial-registration']);
  }
}
