import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrialAuthService } from '../shared/trial-auth.service';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';
import { INELIGIBLE_FOR_TRIAL } from '@/app.constants';

@Component({
  selector: 'app-registration-step-one',
  templateUrl: './registration-step-one.component.html',
  styleUrls: ['./registration-step-one.component.scss']
})
export class RegistrationStepOneComponent implements OnInit {

  @ViewChild('stepOneDiv', {static: false}) stepOneDiv!: ElementRef;

  stepNo = 1;
  faqLink = '../faqs';
  touchDevice = false;
  showRegistrationContent = false;
  userEligible = false;

  @HostListener('touchstart')
  onTouchEvent() {
    this.touchDevice = true;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: TrialAuthService,
    private showContactUsService: MatContactUsDialogService
  ) { }

  ngOnInit() {
    const smallDevice = window.matchMedia('(max-width: 767px)').matches;
    console.log(smallDevice);
    console.log('touchDevice', this.touchDevice);
    if (smallDevice) {
      this.showRegistrationContent = true;
    }
  }

  emailSubmit() {
    console.log('on form submit');

    // get data from backend
    this.userEligible = true;

    if (this.userEligible) {
      this.authService.activateChild(true);
      this.router.navigate(['step-2'], {relativeTo: this.route} );
    } else {
      this.authService.activateChild(true);
      this.router.navigate([INELIGIBLE_FOR_TRIAL]);
    }
  }

  contactUsClicked() {
    this.showContactUsService.contactUsClicked();
  }

  topJoinClicked() {

    this.stepOneDiv.nativeElement.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
  }
}
