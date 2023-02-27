import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { ContactUsData } from '@/shared/mat-contact-us-dialog/contact-us-data.interface';
import { ContactUsDataService } from './contact-us-data.service';
import {Router} from '@angular/router';

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
  action = 'Ok';
  messageText = '';
  showError = false;
  showLoading = false;
  // emailid = this.contactUsForm.value.emailid;
  // message = this.contactUsForm.value.message;

  constructor(
    private contactUsService: ContactUsDataService,
    public dialogRef: MatDialogRef<MatContactUsDialogComponent>,
    private snackBar: MatSnackBar,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: ContactUsData,
  ) {}

  openPage = false;
  ngOnInit() {
    // this.onChanges();
    if (this.router.url.includes('open') || this.router.url.includes('aiims532')) {
      this.openPage = true;
      // console.log('open')
    }

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
    this.showLoading = true;
    if (!this.openPage) {
      if (this.contactUsForm.valid) {
        this.data.email = this.contactUsForm.value.emailid;
        this.data.message = this.contactUsForm.value.message;
        this.contactUsService.saveContactUsData(this.data).subscribe(
          (data: any) => {
            this.onCloseClick();
            this.showLoading = false;
            this.snackBar.open(this.msgReceived, this.action, {
              duration: 4000,
            });
          },
          err => {
            this.showLoading = false;
            this.contactUsForm.controls.emailid.setErrors({invalid: true});
            this.showError = true;
          },
        );
      } else {
        this.showError = true;
        this.showLoading = false;
      }
    } else  {
      if (this.contactUsForm.valid) {
        this.data.email = this.contactUsForm.value.emailid;
        this.data.message = this.contactUsForm.value.message;
        this.contactUsService.saveAiimsContactUsData(this.data).subscribe(
          (data: any) => {
            this.onCloseClick();
            this.showLoading = false;
            this.snackBar.open(this.msgReceived, this.action, {
              duration: 4000,
            });
          },
          err => {
            this.showLoading = false;
            this.contactUsForm.controls.emailid.setErrors({invalid: true});
            this.showError = true;
          },
        );
      } else {
        this.showError = true;
        this.showLoading = false;
      }
    }
  }
}
