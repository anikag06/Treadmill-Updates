import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShowLoginDialogService } from './shared/show-login-dialog.service';
import { A2HSService } from '@/shared/a2hs.service';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';
import { AuthService } from '@/shared/auth/auth.service';
import { LOGGED_IN_PATH } from '@/app.constants';

@Component({
  selector: 'app-pre-login',
  templateUrl: './pre-login.component.html',
  styleUrls: ['./pre-login.component.scss'],
  providers: [MatContactUsDialogService]
})
export class PreLoginComponent implements OnInit {

  loggedIn = false;

  constructor(
    private showLoginDialogService: ShowLoginDialogService,
    private showContactUsService: MatContactUsDialogService,
    private a2hsService: A2HSService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.a2hsService.setDeferredPrompt();
    console.log(this.authService.isLoggedIn())
    if (this.authService.isLoggedIn()) {
      this.router.navigate([LOGGED_IN_PATH]);
    }
  }

  onLoginClicked() {
    this.showLoginDialogService.broadcastLoginClicked();
  }

  onContactUsClicked() {
    this.showContactUsService.contactUsClicked();
  }
}
