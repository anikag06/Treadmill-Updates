import { Component, OnInit } from '@angular/core';
import { A2HSService } from '@/shared/a2hs.service';
import { FcmService } from '@/shared/fcm.service';
import { RegistrationDataService } from '@/trial-registration/shared/registration-data.service';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';
import { SignUpService } from '@/pre-login/signup/sign-up.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AIIMS_REGISTRATION_PATH} from '@/app.constants';

@Component({
  selector: 'app-step-last-page',
  templateUrl: './step-last-page.component.html',
  styleUrls: ['./step-last-page.component.scss'],
})
export class StepLastPageComponent implements OnInit {
  constructor(
    private registrationDataService: RegistrationDataService,
    private showContactUsService: MatContactUsDialogService,
    private signUpService: SignUpService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}
  participationID!: number;
  msgReceived = 'Email sent.';
  action = 'Ok';
  aiimsUser = false;

  ngOnInit() {
    this.participationID = this.registrationDataService.participationID;
    if (this.router.url.includes(AIIMS_REGISTRATION_PATH)) {
      this.aiimsUser = true;
    }
  }
  contactUsClicked() {
    this.showContactUsService.contactUsClicked();
  }
  resendEmail() {
    if (!this.aiimsUser) {
      this.signUpService
        .resendSignupLink(this.participationID)
        .subscribe(response => {
          this.snackBar.open(this.msgReceived, this.action, {
            duration: 4000,
          });
        });
    } else {
      this.signUpService
        .resendSignupLinkAiims(this.participationID)
        .subscribe(response => {
          this.snackBar.open(this.msgReceived, this.action, {
            duration: 4000,
          });
        });
    }
  }
}

