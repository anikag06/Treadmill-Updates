import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@/shared/auth/auth.service';
import { LOGGED_IN_PATH, INELIGIBLE_FOR_TRIAL } from '@/app.constants';
import { LocalStorageService } from '@/shared/localstorage.service';
import { ShowLoginSignupDialogService } from '@/pre-login/shared/show-login-signup-dialog.service';
import { MatSignupDialogComponent } from '@/pre-login/signup/mat-signup-dialog/mat-signup-dialog.component';

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
  @ViewChild('loginForm', { static: false }) loginForm!: NgForm;

  constructor(
    public dialogRef: MatDialogRef<MatLoginDialogComponent>,
    private authService: AuthService,
    private router: Router,
    private showLoginSignupService: ShowLoginSignupDialogService,
  ) {}

  ngOnInit() {
    this.loginAfterSignup = this.showLoginSignupService.loginAfterSignup();
  }

  onSubmit() {
    localStorage.clear();
    this.showForm = false;
    this.loginAfterSignup = false;
    this.authService
      .getUserDetails(this.loginForm.value)
      .then((data: any) => {
        console.log('login data', data);
        this.authService.isUserExcluded = data.data.is_excluded;
        if (data.data.is_excluded) {
          this.dialogRef.close();
          this.router.navigate([INELIGIBLE_FOR_TRIAL]);
        } else {
          this.authService.setLoginData(data);
          this.dialogRef.close();
          this.router.navigate([LOGGED_IN_PATH]);
        }
      })
      .catch((error: any) => {
        this.errorStatus = true;
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
        this.showForm = true;
        this.errorStatus = false;
      });
  }

  onCloseClick(): void {
    this.errorStatus = false;
    this.dialogRef.close();
  }

  onJoinTheStudyClicked() {
    this.dialogRef.close();
    this.showLoginSignupService.joinStudyClicked(MatSignupDialogComponent);
  }
}
