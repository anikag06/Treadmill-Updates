import { Component, OnInit } from '@angular/core';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent implements OnInit {
  faqLink = '../faqs';
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
