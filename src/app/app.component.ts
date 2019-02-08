import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';

import { MatContactUsDialogComponent } from '@/shared/pre-login/mat-contact-us-dialog/mat-contact-us-dialog.component';
import { LoggerService } from '@/shared/logger.service';
import { ShowLoginDialogService } from '@/shared/pre-login/show-login-dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private emailid!: string;
  private message!: string;
  private innerWidth!: number;
  private innerHeight!: number;

  constructor(
    private dialog: MatDialog,
    private overlay: Overlay,
    private logger: LoggerService,
    private showLoginDialogService: ShowLoginDialogService
  ) { }

  ngOnInit() {
    // repeated code, optimize this
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }
  
  onLoginClicked() {
    this.showLoginDialogService.broadcastLoginClicked();
  }

  onContactUsClicked() {
    this.logger.log("calling contact us dialog");

    // repeated code, optimize this
    const scrollStrategy = this.overlay.scrollStrategies.reposition();    
    
    // repeated code, optimize this
    const contactUsDialogRef = this.dialog.open(MatContactUsDialogComponent, {
      data: {emailid: this.emailid, message: this.message},
      minWidth: this.innerWidth/3,
      minHeight: this.innerHeight*(2/3),
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
