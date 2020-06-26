import { Component, OnInit } from '@angular/core';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';

@Component({
  selector: 'app-about-us-page',
  templateUrl: './about-us-page.component.html',
  styleUrls: ['./about-us-page.component.scss'],
})
export class AboutUsPageComponent implements OnInit {
  termsConditionsLink = '../terms-and-conditions';
  privacyPolicyLink = '../privacy-policy';
  faqLink = '../privacy-policy';
  showRegistrationContent = false;

  constructor(private showContactUsService: MatContactUsDialogService) {}

  ngOnInit() {
    // const smallDevice = window.matchMedia('(max-width: 767px)').matches;
    // console.log(smallDevice);
    // if (smallDevice) {
    this.showRegistrationContent = true;
    // }
  }

  contactUsClicked() {
    this.showContactUsService.contactUsClicked();
  }
}
