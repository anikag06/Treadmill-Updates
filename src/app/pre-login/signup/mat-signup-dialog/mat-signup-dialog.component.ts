import { 
  Component,
  OnInit,
  ViewChild,
  Inject,
  Output,
  EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '@/shared/auth/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {SignupData} from '@/pre-login/signup/signup-data.interface';
import { ShowLoginSignupDialogService } from '@/pre-login/shared/show-login-signup-dialog.service';

@Component({
  selector: 'app-mat-signup-dialog',
  templateUrl: './mat-signup-dialog.component.html',
  styleUrls: ['./mat-signup-dialog.component.scss']

})

export class MatSignupDialogComponent implements OnInit {
  @Output() signupDone = false;
  hide = true;
  formInvalid = false;
  showSignupForm = true;
  passwordMatch = false;
  termsConditionChecked = true;
  password!: any;
  passwordConfirm!: any;
  usernameError!: string;
  passwordError!: string;
  registered = false;
  passwordMatchError!: string;
  errorStatus = false;
  @ViewChild('signupForm', { static: false }) signupForm !: NgForm;

  constructor(
    private showLoginSignupDialogService: ShowLoginSignupDialogService,
    private http: HttpClient,
    public signupDialogRef: MatDialogRef<MatSignupDialogComponent>,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: SignupData,
  ) { }

  ngOnInit() {

  }
  onSignupSubmit() {
    this.getVariablesUsed();
    this.matchPasswords();
    if (this.passwordMatch && this.termsConditionChecked) {
      this.authService.signupData(this.data)
      .subscribe(
        res => this.onSignupDone(),
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
    this.data.username = this.signupForm.value.username;
    this.data.password = this.signupForm.value.password;
    this.data.email = this.data.username + '@123.com';
    this.data.terms_and_conditions = '1';
    this.data.user_timezone = 'Asia/Kolkata';
    this.data.exp_or_control = '1';
    this.termsConditionChecked = this.signupForm.value.terms_conditions;
  }
  matchPasswords() {
    this.passwordMatch = false;
    this.password = this.signupForm.value.password;
    this.passwordConfirm = this.signupForm.value.passwordConfirm ;
    if (this.password && this.passwordConfirm && this.password === this.passwordConfirm) {
      this.passwordMatch = true;
    } else {
      this.passwordMatchError = 'Enter same passwords!';
    }
  }
  onTermsConClick() {
   // console.log('open terms and conditions');
  }

  onSignupDone() {
    this.errorStatus = false;
    this.registered = true;
    this.signupForm.reset();
    this.hide = true;
    this.formInvalid = false;
    this.showSignupForm = true;
    this.passwordMatch = false;
    this.signupDialogRef.close();
    this.showLoginSignupDialogService.signupDone();

  }
  onSignupCloseClick() {
    this.signupDialogRef.close();
  }
}
