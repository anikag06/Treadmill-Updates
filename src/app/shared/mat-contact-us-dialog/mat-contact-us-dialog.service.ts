import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';

import { DialogSize } from '@/shared/dialog-size.service';
import { MatContactUsDialogComponent } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.component';
import { environment } from 'environments/environment';
import { CONTACT_US_DATA } from '@/app.constants';
import { HttpClient } from '@angular/common/http';
import { ContactUsData } from './contact-us-data.interface';

@Injectable()
export class MatContactUsDialogService {
  private emailid!: string;
  private message!: string;

  constructor(
    private dialog: MatDialog,
    private overlay: Overlay,
    private dialogSize: DialogSize,
  ) {}

  contactUsClicked() {
    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    const contactUsDialogRef = this.dialog.open(MatContactUsDialogComponent, {
      data: { emailid: this.emailid, message: this.message },
      minWidth: this.dialogSize.width,
      minHeight: this.dialogSize.height,
      disableClose: true,
      hasBackdrop: true,
      panelClass: 'contact-us-dialog',
      scrollStrategy,
    });

    contactUsDialogRef.afterClosed().subscribe((result: string) => {
      
    });
  }
}
