import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { ContactUsData } from '@/shared/mat-contact-us-dialog/contact-us-data.interface';
import { ContactUsDataService } from './contact-us-data.service';

@Component({
  selector: 'app-mat-contact-us-dialog',
  templateUrl: './mat-contact-us-dialog.component.html',
  styleUrls: ['./mat-contact-us-dialog.component.scss'],
})
export class MatContactUsDialogComponent implements OnInit {
  contactUsForm = new FormGroup({
    emailid: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required]),
  });

  msgReceived = 'We have received your message';
  action = 'Received';
  messageText = '';
  showError = false;
  // emailid = this.contactUsForm.value.emailid;
  // message = this.contactUsForm.value.message;

  constructor(
    private contactUsService: ContactUsDataService,
    public dialogRef: MatDialogRef<MatContactUsDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: ContactUsData,
  ) {}

  ngOnInit() {
    // this.onChanges();
  }

  onChanges() {
    // this.emailid.valueChanges.subscribe((value: any) => {
    //   this.data.emailid = value;
    // });
    // this.message.valueChanges.subscribe((value: any) => {
    //   this.data.message = value;
    // });
  }

  onCloseClick() {
    this.dialogRef.close();
  }

  submitData() {
    console.log(this.data, 'form group', this.contactUsForm);
    if (this.contactUsForm.valid) {
      this.data.email = this.contactUsForm.value.emailid;
      this.data.message = this.contactUsForm.value.message;
      console.log(this.data);
      this.contactUsService
        .saveContactUsData(this.data)
        .subscribe((data: any) => {
          console.log(data);
          this.onCloseClick();
          this.snackBar.open(this.msgReceived, this.action, {
            duration: 4000,
          });
        },
      err => {
        console.log('error', err);
        this.contactUsForm.controls.emailid.setErrors({ invalid: true });
        this.showError = true;
      },
        );
    } else {
      this.showError = true;
    }
  }
}
