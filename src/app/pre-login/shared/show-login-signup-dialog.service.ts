import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { LoggerService } from '@/shared/logger.service';
import { Overlay } from '@angular/cdk/overlay';
import { DialogSize } from '@/shared/dialog-size.service';
@Injectable({
  providedIn: 'root'
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
    private logger: LoggerService,
    private overlay: Overlay,
    private dialogSize: DialogSize,
  ) { }

  broadcastLoginClicked( loginDialog: any ) {
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    this.getLoginDialog = loginDialog;
    const loginDialogRef = this.dialog.open(loginDialog, {
      minWidth: this.dialogSize.width,
      minHeight: this.dialogSize.height,
      disableClose: true,
      hasBackdrop: true,
      panelClass: 'login-dialog',
      scrollStrategy
    });
  }

  joinStudyClicked(signupDialog: any) {
    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    const signupDialogRef = this.dialog.open(signupDialog, {
      data: {
        username: this.signupUsername,
        email: this.email,
        password: this.signupPassword,
        terms_and_conditions: this.terms_and_conditions,
        user_timezone: this.user_timezone,
        exp_or_control: this.exp_or_control
      },
      minWidth: this.dialogSize.width,
      minHeight: this.dialogSize.height,
      disableClose: true,
      hasBackdrop: true,
      panelClass: 'signup-dialog',
      scrollStrategy
    });
  }
  joinStudyClickedBeforeLogin(signupDialog: any, loginDialog: any){
    this.getLoginDialog = loginDialog;
    this.joinStudyClicked(signupDialog);
  }
  signupDone() {
   // console.log('singup done');
    this.signupSuccess = true;
    this.broadcastLoginClicked(this.getLoginDialog);
  }
  loginAfterSignup() {
    return this.signupSuccess;
  }

}
