import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpService } from './sign-up.service';
import { NgForm } from '@angular/forms';
import { SignUpData } from '@/pre-login/signup/signup-data.interface';
import { ShowLoginSignupDialogService } from '@/pre-login/shared/show-login-signup-dialog.service';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';
import { MatLoginDialogComponent } from '@/pre-login/login/mat-login-dialog/mat-login-dialog.component';
import { MatRadioGroup } from '@angular/material';
import { FcmService } from '@/shared/fcm.service';
import { A2HSService } from '@/shared/a2hs.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MatContactUsDialogService],
})
export class SignUpComponent implements OnInit {
  isVisible = true;

  @Output() signupDone = false;
  hide = true;
  formInvalid = false;
  participantValid = false;
  participantId!: number;
  showSignUpForm = false;
  userExists = false;
  username!: string;
  encrypted_email!: string;
  passwordMatch = false;
  termsConditionChecked = true;
  allowed_to_home_screen = 1;
  notifications_allowed = 1;
  allowSubmit = false;
  password!: any;
  passwordConfirm!: any;
  usernameError!: string;
  passwordError!: string;
  registered = false;
  passwordMatchError!: string;
  errorStatus = false;
  data!: SignUpData;
  @ViewChild('signupForm', { static: false }) signupForm!: NgForm;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private signUpService: SignUpService,
    private showLoginSignupDialogService: ShowLoginSignupDialogService,
    private fcmService: FcmService,
    private a2hsService: A2HSService,
  ) {}

  ngOnInit() {
    this.signUpService
      .isParticipantValid(this.activatedRoute.snapshot.params['unique-code'])
      .subscribe(data => {
        this.showSignUpForm = true;
        this.participantValid = data.data.valid;
        this.participantId = data.data.participant_id;
        this.userExists = data.data.user_exists;
        this.username = data.data.username;
        this.encrypted_email = data.data.email_id;
      });
    this.fcmService.permit.subscribe(permit => {
      this.notifications_allowed = permit ? 1 : 0;
      this.activateSubmitButton();
    });
  }

  onSignUpSubmit() {
    this.getVariablesUsed();
    this.matchPasswords();
    if (this.passwordMatch && this.termsConditionChecked) {
      this.signUpService.signUpData(this.data).subscribe(
        res => this.onSignUpDone(),
        err => {
          this.errorStatus = true;
          if (err.error.message.username) {
            this.usernameError = err.error.message.username;
          }
          if (err.error.message.password) {
            this.passwordError = err.error.message.password;
          }
        },
      );
    }
  }

  getVariablesUsed() {
    this.usernameError = '';
    this.passwordError = '';
    this.passwordMatchError = '';
    this.registered = false;
    this.passwordMatch = false;
    this.data = {
      username: 'test',
      password: 'test',
      email: 'test',
      terms_and_conditions: 'test',
    };
    this.data.username = this.signupForm.value.username;
    this.data.password = this.signupForm.value.password;
    this.data.email = this.encrypted_email;
    this.data.terms_and_conditions = '1';
    this.termsConditionChecked = this.signupForm.value.terms_conditions;
  }

  matchPasswords() {
    this.passwordMatch = false;
    this.password = this.signupForm.value.password;
    this.passwordConfirm = this.signupForm.value.passwordConfirm;
    if (
      this.password &&
      this.passwordConfirm &&
      this.password === this.passwordConfirm
    ) {
      this.passwordMatch = true;
    } else {
      this.passwordMatchError = 'Enter same passwords!';
    }
  }

  onTermsConClick() {
    console.log(
      `Open terms and conditions in a new tab but don't take the user there.`,
    );
  }

  onSignUpDone() {
    this.errorStatus = false;
    this.registered = true;
    this.hide = true;
    this.formInvalid = false;
    this.showSignUpForm = true;
    this.passwordMatch = false;
    this.showLoginSignupDialogService.broadcastLoginClicked(
      MatLoginDialogComponent,
    );
  }

  notificationsPermission() {
    if (this.notifications_allowed) {
      this.fcmService.participantRequestPermission(this.participantId);
    }
  }

  homeScreenPermission() {
    if (this.allowed_to_home_screen) {
      this.a2hsService.getDeferredPrompt().subscribe(deferredPrompt => {
        if (!deferredPrompt) {
          console.log('deferredPrompt null');
          return;
        }
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            // no matter the outcome, the prompt cannot be reused ON MOBILE
            // for 3 months or until browser cache is cleared?
          } else {
            const deferredPromptRejected = true;
          }
        });
      });
    }
  }

  activateSubmitButton() {
    if (
      this.termsConditionChecked &&
      this.allowed_to_home_screen &&
      this.notifications_allowed
    ) {
      this.allowSubmit = true;
    }
  }
}
