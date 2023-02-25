import {Component, Input, OnInit} from '@angular/core';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent implements OnInit {
  faqLink = '../faqs';
  showRegistrationContent = false;
  @Input() openPage!: boolean;

  constructor(private showContactUsService: MatContactUsDialogService) {}

  ngOnInit() {
    this.showRegistrationContent = true;
  }

  contactUsClicked() {
    this.showContactUsService.contactUsClicked();
  }
}
