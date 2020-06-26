import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { INELIGIBLE_FOR_TRIAL, REGISTRATION_PATH } from '@/app.constants';
import { TempLandingPageDataService } from '@/temp-landing-page/temp-landing-page-data.service';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';

@Component({
  selector: 'app-temp-landing-page',
  templateUrl: './temp-landing-page.component.html',
  styleUrls: ['./temp-landing-page.component.scss'],
})
export class TempLandingPageComponent implements OnInit {
  emailForm = new FormGroup({
    email: new FormControl(''),
  });
  showErrorMessage = false;
  showSucessMessage = false;
  showLoading = false;
  errorMessage =
    "Please give us your valid email id. We won't spam you. Promise!";
  successMessage2 = "We'll be in touch.";
  constructor(
    private router: Router,
    private tempDataService: TempLandingPageDataService,
    private showContactUsService: MatContactUsDialogService,
  ) {}

  ngOnInit() {}

  emailSubmit() {
    if (this.emailForm.valid) {
      this.showLoading = true;
      this.tempDataService.storeEmailID(this.emailForm.value.email).subscribe(
        (res_data: any) => {
          console.log('RESPONSE', res_data);
          if (res_data.id >= 0) {
            this.showSucessMessage = true;
            this.showLoading = false;
          }
        },
        err => {
          console.log(err);
          this.showErrorMessage = true;
          this.showLoading = false;
        },
      );
    } else {
      this.showErrorMessage = true;
    }
  }

  onFAQClick() {
    this.router.navigate(['trial/faqs']);
  }

  onContactUsClick() {
    this.showContactUsService.contactUsClicked();
  }
}
