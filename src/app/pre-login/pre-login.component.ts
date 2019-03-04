import { Component, OnInit } from '@angular/core';

import { ShowLoginDialogService } from './shared/show-login-dialog.service';
import { A2HSService } from '@/shared/a2hs.service';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';
import { AuthService } from '@/shared/auth/auth.service';

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
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.a2hsService.setDeferredPrompt();
  }

  ngDoCheck(): void {
    this.loggedIn = this.authService.isLoggedIn();
    console.log(this.loggedIn);
  }

  onLoginClicked() {
    this.showLoginDialogService.broadcastLoginClicked();
  }

  onContactUsClicked() {
    this.showContactUsService.contactUsClicked();
  }
}
