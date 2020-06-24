import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {INELIGIBLE_FOR_TRIAL, REGISTRATION_PATH} from "@/app.constants";
import {TempLandingPageDataService} from "@/temp-landing-page/temp-landing-page-data.service";
import {MatContactUsDialogService} from "@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service";

@Component({
  selector: 'app-temp-landing-page',
  templateUrl: './temp-landing-page.component.html',
  styleUrls: ['./temp-landing-page.component.scss']
})
export class TempLandingPageComponent implements OnInit {

  emailForm = new FormGroup({
    email: new FormControl(''),
  });
  showErrorMessage = false;
  showSucessMessage = false;
  btnColor = false;
  errorMessage = 'Please give us your valid email id. We won\'t spam you. Promise!';
  successMessage1 = 'Thank you for subscribing :grinning:!';
  successMessage2 = 'We\'ll be in touch.';
  constructor(
    private router: Router,
    private tempDataService: TempLandingPageDataService,
    private showContactUsService: MatContactUsDialogService,
  ) { }

  ngOnInit() {
  }

  emailSubmit() {
    if (this.emailForm.valid) {
      this.btnColor = true;
      this.tempDataService
        .storeEmailID(this.emailForm.value.email)
        .subscribe(
          (res_data: any) => {
            console.log('RESPONSE', res_data);
            if (res_data.id >= 0) {
             this.showSucessMessage = true;
            }
          },
          err => {
            console.log(err);
            this.showErrorMessage = true;
          },
        );
    }
  }

  onAboutUsClick() {
    this.router.navigate(['trial/about-us']);
  }

  onFAQClick() {
    this.router.navigate(['trial/faqs']);
  }

  onContactUsClick() {
    this.showContactUsService.contactUsClicked();
  }

  onPrivacyPolicyClick() {
    this.router.navigate(['trial/privacy-policy']);
  }


  onTermsConditions() {
    this.router.navigate(['trial/terms-and-conditions']);
  }

}
