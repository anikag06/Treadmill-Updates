import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ContactUsData } from '@/shared/pre-login/mat-contact-us-dialog/contact-us-data.interface';

@Component({
  selector: 'app-mat-contact-us-dialog',
  templateUrl: './mat-contact-us-dialog.component.html',
  styleUrls: ['./mat-contact-us-dialog.component.scss']
})
export class MatContactUsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MatContactUsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContactUsData
  ) { }

  ngOnInit() {
  }

  onCloseClick() {
    this.dialogRef.close();
  }
}
