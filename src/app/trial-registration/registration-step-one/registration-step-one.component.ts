import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrialAuthService } from '../shared/trial-auth.service';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';
import { INELIGIBLE_FOR_TRIAL, REGISTRATION_PATH } from '@/app.constants';
import { FormGroup, FormControl } from '@angular/forms';
import { RegistrationDataService } from '../shared/registration-data.service';
import { QuizService } from '@/shared/questionnaire-deprecated/questionnaire-deprecated.service';
import { A2HSService } from '@/shared/a2hs.service';
import { FcmService } from '@/shared/fcm.service';

@Component({
  selector: 'app-registration-step-one',
  templateUrl: './registration-step-one.component.html',
  styleUrls: ['./registration-step-one.component.scss'],
})
export class RegistrationStepOneComponent implements OnInit {
  @ViewChild('stepOneDiv', { static: false }) stepOneDiv!: ElementRef;

  stepNo = 1;
  faqLink = '../faqs';
  touchDevice = false;
  showRegistrationContent = false;
  userEligible = false;
  showLoading = false;
  showErrorMessage = false;
  emailServiceErrorMessage = false;
  emailServices = [
    'gmail.com',
    'outlook.com',
    'yahoo.com',
    'aol.com',
    'hotmail.com',
    'rediffmail.com',
  ];
  emailServicePresent = false;
  remainingParticipants = 2000;

  emailForm = new FormGroup({
    email: new FormControl(''),
  });

  @HostListener('touchstart')
  onTouchEvent() {
    this.touchDevice = true;
  }

  constructor(
    private router: Router,
    private authService: TrialAuthService,
    private showContactUsService: MatContactUsDialogService,
    private registrationDataService: RegistrationDataService,
    private questionnaireService: QuizService,
    private a2hsService: A2HSService,
  ) {}

  ngOnInit() {
    // this.a2hsService.setDeferredPrompt();
    const smallDevice = window.matchMedia('(max-width: 767px)').matches;
    if (smallDevice) {
      this.showRegistrationContent = true;
    }
    this.registrationDataService
      .getNumParticpantsLeft()
      .subscribe((data: any) => {
        if (data) {
          this.remainingParticipants = data.data.no_participant_left;
        }
      });
  }

  emailSubmit() {
    localStorage.clear();
    if (this.emailForm.valid) {
      this.showLoading = true;
      // check if modern email service provider
      if (this.checkEmailService(this.emailForm.value.email)) {
        this.registrationDataService
          .storeEmailID(this.emailForm.value.email)
          .subscribe(
            (res_data: any) => {
              this.showLoading = false;
              this.registrationDataService.participationID =
                res_data.data.participant_id;
              this.userEligible = !res_data.data.excluded;
              if (this.userEligible) {
                this.authService.activateChild(true);
                const stepNumber = res_data.data.next_step;
                const navigation_step =
                  REGISTRATION_PATH + '/step-' + stepNumber;

                if (stepNumber === 3) {
                  this.questionnaireService.questionnaire_name =
                    res_data.data.next_questionnaire;
                  this.router.navigate([navigation_step]);
                } else {
                  this.router.navigate([navigation_step]);
                }
              } else {
                // this.authService.activateChild(true);
                this.router.navigate([INELIGIBLE_FOR_TRIAL]);
              }
            },
            err => {
              this.showLoading = false;
              if (err.error.message === 'Invalid email-id') {
                this.showErrorMessage = true;
              }
            },
          );
      } else {
        this.showLoading = false;
        this.emailServiceErrorMessage = true;
      }
    } else {
      this.showErrorMessage = true;
    }
  }

  contactUsClicked() {
    this.showContactUsService.contactUsClicked();
  }

  topJoinClicked() {
    this.stepOneDiv.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }
  // check if modern email service provider
  checkEmailService(email: string) {
    for (let i = 0; i < this.emailServices.length; i++) {
      if (email.includes(this.emailServices[i])) {
        this.emailServicePresent = true;
        break;
      }
    }
    return this.emailServicePresent;
  }
}
