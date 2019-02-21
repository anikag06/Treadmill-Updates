import { Component, OnInit } from '@angular/core';

import { ShowLoginDialogService } from './shared/show-login-dialog.service';
import { A2HSService } from '@/shared/a2hs.service';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';

@Component({
  selector: 'app-pre-login',
  templateUrl: './pre-login.component.html',
  styleUrls: ['./pre-login.component.scss'],
  providers: [MatContactUsDialogService]
})
export class PreLoginComponent implements OnInit {

  private emailid!: string;
  private message!: string;

  constructor(
    private showLoginDialogService: ShowLoginDialogService,
    private a2hsService: A2HSService
  ) { }

  ngOnInit() {
    this.a2hsService.setDeferredPrompt();
  }

  onLoginClicked() {
    this.showLoginDialogService.broadcastLoginClicked();
  }

}
