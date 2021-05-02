import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { DialogSize } from '@/shared/dialog-size.service';
import { Router } from '@angular/router';
import { REGISTRATION_PATH } from '@/app.constants';

@Injectable({
  providedIn: 'root',
})
export class ShowLoginSignupDialogService {
  private signupUsername!: string;
  private signupPassword!: string;
  private email!: string;
  private terms_and_conditions!: string;
  private user_timezone!: string;
  private exp_or_control!: string;

  private username!: string;
  private password!: string;

  getLoginDialog: any;
  signupSuccess = false;

  constructor(
    private dialog: MatDialog,
    private overlay: Overlay,
    private dialogSize: DialogSize,
    private router: Router,
  ) {}

  broadcastLoginClicked(loginDialog: any) {
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    this.getLoginDialog = loginDialog;
    const loginDialogRef = this.dialog.open(loginDialog, {
      minHeight: this.dialogSize.height,
      maxWidth: '100vw',
      disableClose: true,
      hasBackdrop: true,
      panelClass: 'login-dialog',
      scrollStrategy,
    });
  }

  joinStudyClicked() {
    this.router.navigate([REGISTRATION_PATH]);
  }

  signupDone() {
    this.signupSuccess = true;
    this.broadcastLoginClicked(this.getLoginDialog);
  }

  loginAfterSignup() {
    return this.signupSuccess;
  }
}
