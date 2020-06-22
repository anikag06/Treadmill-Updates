import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-temp-landing-page',
  templateUrl: './temp-landing-page.component.html',
  styleUrls: ['./temp-landing-page.component.scss']
})
export class TempLandingPageComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onAboutUsClick() {
    this.router.navigate(['trial/about-us']);
  }

  onFAQClick() {
    this.router.navigate(['trial/faqs']);
  }

  onContactUsClick() {
    // this.showContactUsService.contactUsClicked();
  }

  onPrivacyPolicyClick() {
    this.router.navigate(['trial/privacy-policy']);
  }


  onTermsConditions() {
    this.router.navigate(['trial/terms-and-conditions']);
  }

}
