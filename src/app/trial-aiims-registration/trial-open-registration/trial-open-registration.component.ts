import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {TrialAuthService} from '@/trial-registration/shared/trial-auth.service';
import {MatContactUsDialogService} from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';
import {TrialAiimsRegistrationService} from '@/trial-aiims-registration/trial-aiims-registration.service';
import {QuizService} from '@/shared/questionnaire-deprecated/questionnaire-deprecated.service';
import {A2HSService} from '@/shared/a2hs.service';
import {
  AIIMS_REGISTRATION_PATH, GAD7, LEARN_GROUP_REGISTRATION_PATH, LIFE_GROUP_REGISTRATION_PATH,
  OPEN_GROUP,
  OPEN_REGISTRATION_PATH,
  REGISTRATION_PATH, SIQ,
  STUDENT_GROUP_REGISTRATION_PATH, WORK_GROUP_REGISTRATION_PATH
} from '@/app.constants';
import {QuestionnaireContainerService} from '@/shared/questionnaire-container/questionnaire-container.service';
import {CommonService} from '@/shared/common.service';

@Component({
  selector: 'app-trial-open-registration',
  templateUrl: './trial-open-registration.component.html',
  styleUrls: ['./trial-open-registration.component.scss']
})
export class TrialOpenRegistrationComponent implements OnInit {
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
  registration_path!: string;
  page_category =  OPEN_GROUP;
  openPage = true; // openPage is availaible on screens sizes desktop and mobile
  chrome_user = false; // for testing
  openPagePrefencesSet = false;
  gmailService = ['gmail', 'gial', 'gmial', 'gmal', 'gmil'];


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
    private aiimsRegistrationDataService: TrialAiimsRegistrationService,
    private questionnaireService: QuizService,
    private a2hsService: A2HSService,
    private commonService: CommonService,

  ) {}

  ngOnInit() {
    const smallDevice = window.matchMedia('(max-width: 767px)').matches;
    if (smallDevice || this.openPage) {
      this.showRegistrationContent = true;
    }

    // IF IT IS NOT CHROME USER BUT USING OPEN LINK
    this.chrome_user  = this.commonService.isChromeBrowser(); // check what it returns
    console.log('CHROME USER', this.chrome_user);
    if (!this.chrome_user && this.openPage) {
      this.openPagePrefencesSet = true;
    }

  }

  emailSubmit() {
    localStorage.clear();
    console.log('email form', this.emailForm);
    let gmail_id = false;
    if (this.emailForm.value.email) {
      const email_array = this.emailForm.value.email.split('@');
      console.log('as', email_array[1]);
      for (let i = 0; i < this.gmailService.length; i++) {
        console.log('as', i, this.gmailService[i]);

        if (email_array[1].includes(this.gmailService[i])) {
          gmail_id = true;
          console.log('as123', gmail_id);
          break;
        }
      }
      if (gmail_id) {
        this.emailForm.value.email = email_array[0] + '@gmail.com';
        console.log('as1', this.emailForm.value.email);

      }
    }
    if (this.emailForm.valid) {
      console.log('as2', this.emailForm.value.email);

      this.showLoading = true;
      // check if modern email service provider
      if (this.checkEmailService(this.emailForm.value.email)) {
        this.aiimsRegistrationDataService
          .storeOpenEmailID(this.emailForm.value.email, this.page_category)
          .subscribe(
            (res_data: any) => {
              this.showLoading = false;
              this.aiimsRegistrationDataService.participationID =
                res_data.data.participant_id;
              this.aiimsRegistrationDataService.category =
                res_data.data.category;
              if (this.aiimsRegistrationDataService.category === 1) {
                this.registration_path = AIIMS_REGISTRATION_PATH;
                } else if (this.aiimsRegistrationDataService.category === 2) {
                  this.registration_path = OPEN_REGISTRATION_PATH;
                } else if (this.aiimsRegistrationDataService.category === 3) {
                  this.registration_path = STUDENT_GROUP_REGISTRATION_PATH;
                } else if (this.aiimsRegistrationDataService.category === 4) {
                  this.registration_path = LIFE_GROUP_REGISTRATION_PATH;
                } else if (this.aiimsRegistrationDataService.category === 5) {
                  this.registration_path = LEARN_GROUP_REGISTRATION_PATH;
                } else if (this.aiimsRegistrationDataService.category === 6) {
                  this.registration_path = WORK_GROUP_REGISTRATION_PATH;
                }
              this.userEligible = !res_data.data.excluded;
              if (this.userEligible) {
                this.authService.activateChild(true);
                const stepNumber = res_data.data.next_step;
                const navigation_step =
                  this.registration_path  + 'r/step-' + stepNumber;

                if (stepNumber === 3) {
                  if (res_data.data.next_questionnaire === SIQ) {
                    this.questionnaireService.questionnaire_name = GAD7;
                  } else {
                    this.questionnaireService.questionnaire_name =
                      res_data.data.next_questionnaire;
                  }
                  this.router.navigate([navigation_step]);
                } else {
                  this.router.navigate([navigation_step]);
                }
              } else {
                // this.authService.activateChild(true);
                // this.router.navigate([INELIGIBLE_FOR_TRIAL]);
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
    this.emailServicePresent = true;
    return this.emailServicePresent;
  }

  onFAQClick() {
    this.router.navigate(['open/r/info'],
    {queryParams: {
      type: 'faq'}
    });
  }

  onContactUsClick() {
    this.showContactUsService.contactUsClicked();
  }

  onPrivacyPolicyClick() {
    this.router.navigate(['open/r/info'],
      {queryParams: {
      type: 'pp'}
  });
  }

  onTermsConditions() {
    this.router.navigate(['open/r/info'],
      {queryParams: {
          type: 'tc'}
      });
  }
  onLogoClick() {
    this.router.navigate([OPEN_REGISTRATION_PATH]);
    }

}

