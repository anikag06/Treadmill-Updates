import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '@/shared/auth/auth.service';
import {
  LOGGED_IN_PATH,
  INELIGIBLE_FOR_TRIAL,
  LANDING_RESET_PASSWORD_PATH,
  IS_VISITED,
  USER_EXCLUDED,
} from '@/app.constants';
import { LocalStorageService } from '@/shared/localstorage.service';
import { ShowLoginSignupDialogService } from '@/pre-login/shared/show-login-signup-dialog.service';
import { MatLoginDialogService } from '@/pre-login/login/mat-login-dialog/mat-login-dialog.service';

@Component({
  selector: 'app-mat-login-dialog',
  templateUrl: './mat-login-dialog.component.html',
  styleUrls: ['./mat-login-dialog.component.scss'],
})
export class MatLoginDialogComponent implements OnInit {
  hide = true;
  formInvalid = false;
  showForm = true;
  errorStatus = false;
  loginAfterSignup = false;
  errorMessage!: string;
  recoverUsernameShow = false;
  recoverPasswordShow = false;
  recoverUsernameMsgShow = false; // can show next dialog box or not
  recoverPasswordMsgShow = false; // next dialog message
  usernameErrorMsg = '';
  showUsernameLoading = false; // submit of recover username load
  recoverUsernameStatus = true;
  usernameErrorMsgShow!: boolean;
  passwordErrorMsg = '';
  showPasswordLoading = false;
  passwordErrorMsgShow!: boolean;
  recoverPasswordStatus = true;

  emailForm = new FormGroup({
    email: new FormControl(''),
  });

  @ViewChild('loginForm', { static: false }) loginForm!: NgForm;
  @ViewChild('recoverPassword', { static: false }) recoverPassword!: NgForm;
  @ViewChild('email', { static: false }) email!: ElementRef;
  @ViewChild('passwordEmail', { static: false }) passwordEmail!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<MatLoginDialogComponent>,
    private authService: AuthService,
    private router: Router,
    private showLoginSignupService: ShowLoginSignupDialogService,
    private matLoginDialogService: MatLoginDialogService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loginAfterSignup = this.showLoginSignupService.loginAfterSignup();
    if (this.router.url === LANDING_RESET_PASSWORD_PATH) {
      this.recoverPasswordShow = true;
    }
  }

  onSubmit() {
    localStorage.clear();
    this.showForm = false;
    this.loginAfterSignup = false;
    this.authService
      .getUserDetails(this.loginForm.value)
      .then((data: any) => {
        this.authService.isUserExcluded = data.data.is_excluded;
        if (data.data.is_excluded) {
          localStorage.setItem(USER_EXCLUDED, 'true');
          this.router.navigateByUrl(INELIGIBLE_FOR_TRIAL).then(() => {
            this.dialogRef.close();
          });
        } else {
          this.authService.setLoginData(data);
          this.router.navigateByUrl(LOGGED_IN_PATH).then(() => {
            this.dialogRef.close();
            sessionStorage.setItem(IS_VISITED, 'true');
          });
        }
      })
      .catch((error: any) => {
        this.errorStatus = true;
        this.showForm = true;
        if (error.error.message.username) {
          this.errorMessage = error.error.message.username;
        } else if (error.error.message.password) {
          this.errorMessage = error.error.message.password;
        } else {
          this.errorMessage = error.error.message;
        }
        if (error.status === 400) {
          // this.loginForm.reset();
          // this.showForm = true;
          this.formInvalid = true;
        }
      })
      .finally(() => {
        // this.showForm = true;
        this.errorStatus = false;
      });
  }

  onCloseClick(): void {
    this.errorStatus = false;
    this.dialogRef.close();
  }

  onJoinTheStudyClicked() {
    this.dialogRef.close();
    this.showLoginSignupService.joinStudyClicked();
  }

  forgotUsernameClicked() {
    this.recoverUsernameShow = true;
  }

  forgotPasswordClicked() {
    this.recoverPasswordShow = true;
  }

  recoverUsernameEmailSubmit() {
    this.showUsernameLoading = true;
    this.matLoginDialogService
      .forgotUsernameRequest(this.email.nativeElement.value)
      .subscribe(
        (data: any) => {
          this.recoverUsernameMsgShow = true;
          this.showUsernameLoading = false;
        },
        error => {
          this.usernameErrorMsg = error.error.message;
          this.showUsernameLoading = false;
          this.recoverUsernameStatus = false;
          this.usernameErrorMsgShow = true;
        },
      );
  }

  usernameInput() {
    this.recoverUsernameStatus = true;
    this.usernameErrorMsgShow = false;
  }

  recoverPasswordEmailSubmit() {
    this.showPasswordLoading = true;
    this.matLoginDialogService
      .forgotPasswordRequest(this.passwordEmail.nativeElement.value)
      .subscribe(
        (data: any) => {
          this.recoverPasswordMsgShow = true;
          this.showPasswordLoading = false;
        },
        error => {
          this.passwordErrorMsg = error.error.email;
          this.showPasswordLoading = false;
          this.passwordErrorMsgShow = true;
          this.recoverPasswordStatus = false;
        },
      );
  }

  passwordInput() {
    this.passwordErrorMsgShow = false;
    this.recoverPasswordStatus = true;
  }
}
