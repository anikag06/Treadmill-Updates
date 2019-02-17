import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';

import { MatContactUsDialogComponent } from '@/shared/pre-login/mat-contact-us-dialog/mat-contact-us-dialog.component';
import { LoggerService } from '@/shared/logger.service';
import { ShowLoginDialogService } from '@/shared/pre-login/show-login-dialog.service';
import { DialogSize } from '@/shared/dialog-size.service';
import { A2HSService } from '@/shared/a2hs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private emailid!: string;
  private message!: string;

  constructor(
    private dialog: MatDialog,
    private overlay: Overlay,
    private logger: LoggerService,
    private showLoginDialogService: ShowLoginDialogService,
    private dialogSize: DialogSize,
    private a2hsService: A2HSService
  ) { }

  ngOnInit() {
    this.a2hsService.setDeferredPrompt();
  }

  onLoginClicked() {
    this.showLoginDialogService.broadcastLoginClicked();
  }

  onContactUsClicked() {
    const scrollStrategy = this.overlay.scrollStrategies.reposition();    

    const contactUsDialogRef = this.dialog.open(MatContactUsDialogComponent, {
      data: {emailid: this.emailid, message: this.message},
      minWidth: this.dialogSize.width,
      minHeight: this.dialogSize.height,
      disableClose: true,
      hasBackdrop: true,
      panelClass: 'contact-us-dialog',
      scrollStrategy
    });

    contactUsDialogRef.afterClosed().subscribe((result: string) => {
      this.logger.log('Contact Us data: ', result);
    });
  }
}
