import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

import { ContactUsData } from '@/shared/pre-login/mat-contact-us-dialog/contact-us-data.interface';

@Component({
  selector: 'app-mat-contact-us-dialog',
  templateUrl: './mat-contact-us-dialog.component.html',
  styleUrls: ['./mat-contact-us-dialog.component.scss']
})
export class MatContactUsDialogComponent implements OnInit {
  emailid =  new FormControl('', [Validators.required, Validators.email]);
  message = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<MatContactUsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContactUsData,
  ) { }

  ngOnInit() {
    this.onChanges();
  }

  onChanges() {
    this.emailid.valueChanges.subscribe((value) => {
      this.data.emailid = value;
    });

    this.message.valueChanges.subscribe((value) => {
      this.data.message = value;
    });
  }

  onCloseClick() {
    this.dialogRef.close();
  }
}
