import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { LoggerService } from '@/shared/logger.service';
import { Overlay } from '@angular/cdk/overlay';
import { DialogSize } from '@/shared/dialog-size.service';
import { MatLoginDialogComponent } from '../login/mat-login-dialog/mat-login-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ShowLoginDialogService {
  private username!: string;
  private password!: string;

  constructor(
    private dialog: MatDialog,
    private logger: LoggerService,
    private overlay: Overlay,
    private dialogSize: DialogSize,
  ) { }

  broadcastLoginClicked() {
    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    const loginDialogRef = this.dialog.open(MatLoginDialogComponent, {
      data: {username: this.username, password: this.password},
      minWidth: this.dialogSize.width,
      minHeight: this.dialogSize.height,
      disableClose: true,
      hasBackdrop: true,
      panelClass: 'login-dialog',
      scrollStrategy
    });

    loginDialogRef.afterClosed().subscribe((result: string) => {
      this.logger.log('Login data: ', result);
    });
  }
}
