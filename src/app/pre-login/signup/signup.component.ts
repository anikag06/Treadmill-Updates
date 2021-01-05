import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpService } from './sign-up.service';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { SignUpData } from '@/pre-login/signup/signup-data.interface';
import { ShowLoginSignupDialogService } from '@/pre-login/shared/show-login-signup-dialog.service';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';
import { FcmService } from '@/shared/fcm.service';
import { A2HSService } from '@/shared/a2hs.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CommonDialogComponent } from '@/shared/common-dialog/common-dialog.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MatContactUsDialogService],
})
export class SignUpComponent implements OnInit {
  isVisible = true;
  showSignUpPage = false;
  showSignUpCompletedMessage = false;

  @Output() signupDone = false;
  hide = true;
  formInvalid = false;
  participantValid = false;
  participantId!: number;
  showSignUpForm = false;
  userExists = false;
  isUsernameAvailable = false;
  usernameAvailableMessage!: string;
  username!: string;
  encrypted_email!: string;
  passwordMatch = false;
  termsConditionChecked = false;
  allowedToHomeScreen = 0;
  notificationsAllowed = 0;
  allowSubmit = false;
  password!: any;
  passwordConfirm!: any;
  usernameError!: string;
  passwordError = 'Password must be at least 6 characters long';
  registered = false;
  passwordMatchError!: string;
  errorStatus = false;
  errorMessage!: string;
  signupFailMessage =
    'Oops! Sign up failed. Please contact us at treadwill@treadwill.org ';
  updatingPermissions = false;
  addingToHomescreen = false;
  data!: SignUpData;
  showLoading = false;
  emailExistMessage = false;
  emailError!: string;
  emailSentMessage = false;
  showEmailError = false;
  showEmailMessage = false;
  @ViewChild('signupForm', { static: false }) signupForm!: NgForm;
  dialogRef!: MatDialogRef<CommonDialogComponent>;
  notificationCheckboxText =
    'Notifications are an essential part of this program. Please accept to allow notifications.';
  a2hsCheckboxText =
    'For the purpose of this study, it is required that you add TreadWill to your home screen. Please accept to add TreadWill to your home screen. <b>By adding TreadWill, you also agree to Sign Up for TreadWill.</b>';

  emailForm = new FormGroup({
    email: new FormControl(''),
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private signUpService: SignUpService,
    private showLoginSignupDialogService: ShowLoginSignupDialogService,
    private fcmService: FcmService,
    private a2hsService: A2HSService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    const smallDevice = window.matchMedia('(max-width: 767px)').matches;
    if (smallDevice) {
      this.showSignUpPage = true;
    }
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
      this.notificationsAllowed = permit ? 1 : 0;
      if (this.notificationsAllowed) {
        this.updatingPermissions = false;
      }
      this.activateSubmitButton();
    });
  }

  onSignUpSubmit() {
    this.showLoading = true;
    this.getVariablesUsed();
    this.matchPasswords();
    this.signUpService.signUpData(this.data).subscribe(
      res => {
        this.onSignUpDone(), (this.showLoading = false);
        this.dialogRef.componentInstance.data = { loading: false };
      },
      err => {
        this.showLoading = false;
        this.dialogRef.close();
        this.errorStatus = true;
        this.errorMessage = err.error.message;
        if (err.error.message.username) {
          this.signupForm.controls.username.setErrors({ invalid: true });
          this.usernameError = err.error.message.username;
        }
        if (err.error.message.password) {
          this.signupForm.controls.password.setErrors({ invalid: true });
        }
      },
    );
  }

  emailSubmit() {
    this.showLoading = true;
    this.signUpService.getSignupMail(this.emailForm.value.email).subscribe(
      response => {
        this.showLoading = false;
        if (response.user_exists) {
          this.userExists = true;
          this.username = response.username;
        } else if (response.email_sent) {
          this.showEmailMessage = true;
          this.emailSentMessage = true;
        } else if (!response.email_exist) {
          this.showEmailMessage = true;
          this.emailExistMessage = true;
        }
      },
      error => {
        this.showLoading = false;
        this.showEmailError = true;
        this.emailError = error;
      },
    );
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
      add_to_home_screen_consent: 'test',
      notifications_consent: 'test',
    };
    this.data.username = this.signupForm.value.username;
    this.data.password = this.signupForm.value.password;
    this.data.email = this.encrypted_email;
    this.data.terms_and_conditions = '1';
    this.data.add_to_home_screen_consent = '1';
    this.data.notifications_consent = '1';
    this.termsConditionChecked = this.signupForm.value.terms_conditions;
  }

  matchPasswords() {
    this.passwordMatch = false;
    this.password = this.signupForm.value.password;
    this.passwordConfirm = this.signupForm.value.passwordConfirm;
    if (this.password && this.passwordConfirm) {
      if (
        this.password &&
        this.passwordConfirm &&
        this.password === this.passwordConfirm
      ) {
        this.passwordMatch = true;
        this.signupForm.controls.passwordConfirm.setErrors({ invalid: null });
        this.signupForm.controls.passwordConfirm.updateValueAndValidity();
      } else {
        this.signupForm.controls.passwordConfirm.setErrors({ invalid: true });
        this.passwordMatchError = 'Enter same passwords!';
        // this.passwordMatch = false;
      }
    }
    this.activateSubmitButton();
  }

  termsConditionClicked() {
    this.termsConditionChecked = this.signupForm.value.terms_conditions;
    this.activateSubmitButton();
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
    this.showSignUpCompletedMessage = true;
  }

  notificationsPermission() {
    this.updatingPermissions = true;

    this.notificationsAllowed = 0;
    if (this.signupForm.value.notificationsInfo) {
      this.fcmService.participantRequestPermission(this.participantId);
    } else {
      this.updatingPermissions = false;
    }
    this.activateSubmitButton();
  }

  homeScreenPermission() {
    this.addingToHomescreen = true;
    if (this.signupForm.value.homeScreenInfo) {
      this.a2hsService.getDeferredPrompt().subscribe(deferredPrompt => {
        this.addingToHomescreen = false;
        if (!deferredPrompt) {
          console.log('deferredPrompt null');
          return;
        }
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            this.allowedToHomeScreen = 1;
            this.dialogRef = this.dialog.open(CommonDialogComponent, {
              data: {
                loading: true,
              },
              disableClose: true,
              minWidth: '90vw',
              autoFocus: false,
            });
            this.onSignUpSubmit();
            // no matter the outcome, the prompt cannot be reused ON MOBILE
            // for 3 months or until browser cache is cleared?
          } else {
            const deferredPromptRejected = true;
          }
        });
      });
    } else {
      this.addingToHomescreen = false;
    }
  }

  activateSubmitButton() {
    console.log('getting called');
    this.allowSubmit = !!(
      this.signupForm.value.username &&
      this.isUsernameAvailable &&
      this.passwordMatch &&
      this.signupForm.value.terms_conditions &&
      this.notificationsAllowed
    );
  }

  checkUsernameAvailability() {
    console.log('username: ', this.signupForm.value.username);
    this.signUpService
      .usernameAvailabilityCheck(this.signupForm.value.username)
      .subscribe((data: any) => {
        console.log('data: ', data);
        this.usernameAvailableMessage = data.message;
        this.isUsernameAvailable = data.data;
        if (!this.isUsernameAvailable) {
          this.signupForm.controls.username.setErrors({ unavailable: true });
        }
        this.activateSubmitButton();
      });
  }
}
