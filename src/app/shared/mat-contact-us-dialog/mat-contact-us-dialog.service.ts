import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { LoggerService } from '@/shared/logger.service';
import { DialogSize } from '@/shared/dialog-size.service';
import { MatContactUsDialogComponent } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.component';

@Injectable()
export class MatContactUsDialogService {
    private emailid!: string;
    private message!: string;

    constructor(
        private dialog: MatDialog,
        private overlay: Overlay,
        private logger: LoggerService,
        private dialogSize: DialogSize,
    ){}

    contactUsClicked() {
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