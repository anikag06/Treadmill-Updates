import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrialAuthService } from '../shared/trial-auth.service';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';

@Component({
  selector: 'app-registration-step-one',
  templateUrl: './registration-step-one.component.html',
  styleUrls: ['./registration-step-one.component.scss']
})
export class RegistrationStepOneComponent implements OnInit {

  @ViewChild('stepOneDiv', {static: false}) stepOneDiv!: ElementRef;
  
  stepNo = 1;
  faqLink = "../faqs";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: TrialAuthService,
    private showContactUsService: MatContactUsDialogService
  ) { }

  ngOnInit() {
  }

  emailSubmit() {
    console.log('on form submit');
    this.authService.activateChild(true);
    this.router.navigate(['step-2'], {relativeTo: this.route} );
  }

  contactUsClicked() {
    this.showContactUsService.contactUsClicked();
  }

  topJoinClicked() {

    this.stepOneDiv.nativeElement.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }
}
