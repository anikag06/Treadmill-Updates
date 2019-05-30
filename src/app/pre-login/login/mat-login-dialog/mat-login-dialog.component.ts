import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@/shared/auth/auth.service';
import { TOKEN, USERAVATAR, ISADMIN, ISACTIVE, LOGGED_IN_PATH } from '@/app.constants';
import { LocalStorageService } from '@/shared/localstorage.service';
import { ShowLoginSignupDialogService } from '@/pre-login/shared/show-login-signup-dialog.service';
import { MatSignupDialogComponent } from '@/pre-login/signup/mat-signup-dialog/mat-signup-dialog.component';

@Component({
  selector: 'app-mat-login-dialog',
  templateUrl: './mat-login-dialog.component.html',
  styleUrls: ['./mat-login-dialog.component.scss']
})
export class MatLoginDialogComponent implements OnInit {
  hide = true;
  formInvalid = false;
  showForm = true;
  errorStatus = false;
  loginAfterSignup = false;
  errorMessage!: string;
  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(
    public dialogRef: MatDialogRef<MatLoginDialogComponent>,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private showLoginSignupService: ShowLoginSignupDialogService,
  ) { }

  ngOnInit() {
    this.loginAfterSignup = this.showLoginSignupService.loginAfterSignup();
  }

  onSubmit() {
    localStorage.clear();
    this.showForm = false;
    this.loginAfterSignup = false;
    this.authService.getUserDetails(this.loginForm.value)
      .then(
        (data: any) => {
          this.errorStatus = false;
          this.localStorageService.setItem(TOKEN, data.data.token);
          this.localStorageService.setItem(ISADMIN, data.data.is_admin);
          this.localStorageService.setItem(USERAVATAR, data.data.avatar);
          this.localStorageService.setItem(ISACTIVE, data.data.is_active);
          this.dialogRef.close();
          this.router.navigate([LOGGED_IN_PATH]);
        }
      ).catch(
        (error: any) => {
          this.errorStatus = true;
          if (error.error.message.username) {
            this.errorMessage = error.error.message.username;
          } else if (error.error.message.password) {
              this.errorMessage = error.error.message.password;
          } else {
            this.errorMessage = error.error.message;
          }
          if (error.status === 400 ) {
            // this.loginForm.reset();
            // this.showForm = true;
            this.formInvalid = true;
          }
        }
      ).finally(() => {
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
