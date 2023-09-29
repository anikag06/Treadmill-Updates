import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpService } from './sign-up.service';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { SignUpData } from '@/pre-login/signup/signup-data.interface';
import { ShowLoginSignupDialogService } from '@/pre-login/shared/show-login-signup-dialog.service';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';

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
  data!: SignUpData;
  showLoading = false;
  emailExistMessage = false;
  emailError!: string;
  emailSentMessage = false;
  showEmailError = false;
  showEmailMessage = false;
  @ViewChild('signupForm', { static: false }) signupForm!: NgForm;
  emailForm = new FormGroup({
    email: new FormControl(''),
  });
  openPage = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private signUpService: SignUpService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    if (this.router.url.includes('open')) {
      this.openPage = true;
      console.log(this.openPage, 'open link');
    }
    const smallDevice = window.matchMedia('(max-width: 767px)').matches;
    if (smallDevice || this.openPage) {
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
  }

  onSignUpSubmit() {
    this.showLoading = true;
    this.getVariablesUsed();
    this.matchPasswords();
    this.signUpService.signUpData(this.data).subscribe(
      res => {
        this.onSignUpDone();
        this.showLoading = false;
      },
      err => {
        this.showLoading = false;
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
    };
    this.data.username = this.signupForm.value.username;
    this.data.password = this.signupForm.value.password;
    this.data.email = this.encrypted_email;
    this.data.terms_and_conditions = '1';
    this.termsConditionChecked = this.signupForm.value.terms_and_conditions;
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
    this.termsConditionChecked = this.signupForm.value.terms_and_conditions;
    this.activateSubmitButton();
  }
  onTermsConClick() {}

  onSignUpDone() {
    this.errorStatus = false;
    this.registered = true;
    this.hide = true;
    this.formInvalid = false;
    this.showSignUpForm = true;
    this.passwordMatch = false;
    this.showSignUpCompletedMessage = true;
  }

  activateSubmitButton() {
    if (this.openPage) {
      this.signupForm.value.terms_and_conditions = 1;
    }
    this.allowSubmit =
      this.signupForm.value.username &&
      this.isUsernameAvailable &&
      this.passwordMatch &&
      this.signupForm.value.terms_and_conditions;
    this.changeDetector.detectChanges();
  }

  checkUsernameAvailability() {
    if (this.checkForWhiteSpace(this.signupForm.value.username)) {
      this.signupForm.controls.username.setErrors({ invalid: true });
      this.usernameError = 'Username should not contain any space';
      this.isUsernameAvailable = false;
      this.activateSubmitButton();
    } else {
      this.signUpService
        .usernameAvailabilityCheck(this.signupForm.value.username)
        .subscribe((data: any) => {
          this.usernameAvailableMessage = data.message;
          this.isUsernameAvailable = data.data;
          if (!this.isUsernameAvailable) {
            this.signupForm.controls.username.setErrors({ unavailable: true });
          }
          this.activateSubmitButton();
        });
    }
  }

  checkForWhiteSpace(username: string) {
    return username.indexOf(' ') >= 0;
  }
}
