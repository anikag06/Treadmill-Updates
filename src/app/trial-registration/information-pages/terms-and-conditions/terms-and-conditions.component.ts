import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent implements OnInit {
  faqLink = '../faqs';
  privacyPolicyLink = '../privacy-policy';

  constructor(
    private router: Router,
    private showContactUsService: MatContactUsDialogService,
  ) {}

  ngOnInit() {}

  contactUsClicked() {
    this.showContactUsService.contactUsClicked();
  }
}
