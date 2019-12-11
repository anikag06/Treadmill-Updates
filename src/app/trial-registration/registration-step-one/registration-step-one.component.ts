import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrialAuthService } from '../shared/trial-auth.service';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';
import { INELIGIBLE_FOR_TRIAL } from '@/app.constants';
import { FormGroup, FormControl } from '@angular/forms';
import { RegistrationDataService } from '../shared/registration-data.service';

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

  emailForm = new FormGroup({
    email: new FormControl(''),
  });

  @HostListener('touchstart')
  onTouchEvent() {
    this.touchDevice = true;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: TrialAuthService,
    private showContactUsService: MatContactUsDialogService,
    private registrationDataService: RegistrationDataService,
  ) { }

  ngOnInit() {
    const smallDevice = window.matchMedia('(max-width: 767px)').matches;
    console.log(smallDevice);
    if (smallDevice) {
      this.showRegistrationContent = true;
    }
  }

  emailSubmit() {
    console.log('on form submit');
    console.log(this.emailForm.value);
    console.log('is form valid', this.emailForm.valid);
    // get data from backend
    this.userEligible = true;
    if (this.userEligible) {
      this.authService.activateChild(true);
      console.log('navigate');
      this.router.navigate(['step-2'], {relativeTo: this.route} );
    } else {
      this.authService.activateChild(true);
      this.router.navigate([INELIGIBLE_FOR_TRIAL]);
    }
    if (this.emailForm.valid) {
      this.registrationDataService.putEmailID(this.emailForm.value.email)
        .subscribe( (res_data: any) => {
          console.log(res_data);
        },
        (err) => {
          console.log(err);
        }
        );
    }

  }

  contactUsClicked() {
    this.showContactUsService.contactUsClicked();
  }

  topJoinClicked() {

    this.stepOneDiv.nativeElement.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
  }
}
