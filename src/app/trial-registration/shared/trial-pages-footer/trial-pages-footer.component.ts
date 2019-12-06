import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';

@Component({
  selector: 'app-trial-pages-footer',
  templateUrl: './trial-pages-footer.component.html',
  styleUrls: ['./trial-pages-footer.component.scss']
})
export class TrialPagesFooterComponent implements OnInit {

  constructor(
    private router: Router,
    private showContactUsService: MatContactUsDialogService
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
    this.showContactUsService.contactUsClicked();
  }

  onPrivacyPolicyClick() {
    this.router.navigate(['trial/privacy-policy']);
  }

  onTermsConditions() {
    this.router.navigate(['trial/terms-and-conditions']);
  }
}
