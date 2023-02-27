import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegistrationStepTwoForm} from '@/trial-registration/registration-step-two/step-two-form-data.model';
import {TrialAuthService} from '@/trial-registration/shared/trial-auth.service';
import {Router} from '@angular/router';
import {RegistrationDataService} from '@/trial-registration/shared/registration-data.service';
import {QuizService} from '@/shared/questionnaire/questionnaire.service';
import {AIIMS_REGISTRATION_PATH, INELIGIBLE_FOR_TRIAL, OPEN_REGISTRATION_PATH, REGISTRATION_PATH} from '@/app.constants';
import {RegistrationStepFourForm} from '@/trial-registration/registration-step-four/step-four-consent.model';
import {MatDialog, MatDialogRef} from '@angular/material';
import {CommonDialogComponent} from '@/shared/common-dialog/common-dialog.component';
import {FcmService} from '@/shared/fcm.service';
import {A2HSService} from '@/shared/a2hs.service';
import {MatContactUsDialogService} from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';
import {TrialAiimsRegistrationService} from '@/trial-aiims-registration/trial-aiims-registration.service';

@Component({
  selector: 'app-trial-aiims-registration-step-two',
  templateUrl: './aiims-registration-step-two.component.html',
  styleUrls: ['./aiims-registration-step-two.component.scss']
})
export class AiimsRegistrationStepTwoComponent implements OnInit {

  stepNo = 2;
  userEligible = false;
  // stepNo = 4;
  // userEligible = false;
  allowSubmit = false;
  showLoading = false;
  userDeclined = false;
  registration_path!: string;

  consentForm = new FormGroup({
    notificationsInfo: new FormControl(),
    homeScreenInfo: new FormControl({
      value: null,
      disabled: !this.allowSubmit,
    }),
  });


  stepTwoForm = new FormGroup({
    age: new FormControl(null, [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    education: new FormControl(null, [Validators.required]),
    profession: new FormControl(null, [Validators.required]),
    browser: new FormControl(null, [Validators.required]),
    // country: new FormControl(null, [Validators.required]),
    // timezone: new FormControl(null, [Validators.required]),
    // knowEnglish: new FormControl(null, [Validators.required]),
    // internetEnabled: new FormControl(null, [Validators.required]),
    // psychiatricHelp: new FormControl(null, [Validators.required]),
    // haveUsedEarlier: new FormControl(null, [Validators.required]),
    // haveDisorder: new FormControl(null, [Validators.required]),
    // traumaticEvent: new FormControl(null, [Validators.required]),
    // infoSource: new FormControl(null, [Validators.required]),
    // helpReason: new FormControl(null, [Validators.required]),
    // programPlan: new FormControl(null, [Validators.required]),
    // otherReasonTextBox: new FormControl(null),
  });

  stepTwoFormData = new RegistrationStepTwoForm(
    52,
    0,
    null,
    0,
    1,
    1,
    1,
    true,
    true,
    'other',
    false,
    false,
    false,
    0,
    false,
    0,
    null,
    null,
    null,
    null,
  );


  participationID = 0;
  starting_time!: any;
  completion_time!: any;
  showPage = false;

  country_data!: any;
  timezone_data!: any;
  otherOptionSelected = false;
  showErrorMsg = false;
  placeholder_tz!: any;

  constructor(
    private authService: TrialAuthService,
    private router: Router,
    private registrationDataService: RegistrationDataService,
    private aiimsRegistrationDataService: TrialAiimsRegistrationService,
    private questionnaireService: QuizService,
    private fcmService: FcmService,
    private a2hsService: A2HSService,
    private dialog: MatDialog,
    private changeDetector: ChangeDetectorRef,
    private showContactUsService: MatContactUsDialogService,
  ) {}

  ngOnInit() {
    const smallDevice = window.matchMedia('(max-width: 767px)').matches;
    if (smallDevice) {
      this.showPage = true;
    }

    const dateNow = new Date();
    const dateTime = dateNow.toJSON();
    this.starting_time = dateTime.replace('Z', '').replace('T', ' ');

    this.participationID = this.aiimsRegistrationDataService.participationID;
    this.starting_time = dateTime.replace('Z', '').replace('T', ' ');
    this.placeholder_tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.aiimsRegistrationDataService.getCountryList().subscribe((data: any) => {
      this.country_data = data;
    });
    this.aiimsRegistrationDataService.getTimeZoneData().subscribe((data: any) => {
      this.timezone_data = data;
    });
  }

  stepDataSubmit() {
    if (this.stepTwoForm.valid) {
      this.showLoading = true;
      this.showErrorMsg = false;
      const dateNow = new Date();
      const dateTime = dateNow.toJSON();
      this.completion_time = dateTime.replace('Z', '').replace('T', ' ');

      this.stepTwoFormData.participant_id = this.participationID;
      this.stepTwoFormData.age = this.stepTwoForm.value.age;
      this.stepTwoFormData.gender = this.stepTwoForm.value.gender;
      this.stepTwoFormData.education = this.stepTwoForm.value.education;
      this.stepTwoFormData.occupation = this.stepTwoForm.value.profession;
      this.stepTwoFormData.browser = this.stepTwoForm.value.browser;
      // this.stepTwoFormData.country = this.stepTwoForm.value.country;
      this.stepTwoFormData.country = 1;
      this.stepTwoFormData.time_zone = 'Asia/Calcutta';
      this.stepTwoFormData.started_at = this.starting_time;
      this.stepTwoFormData.completed_at = this.completion_time;
      // this.stepTwoFormData.source_of_information_other = this.stepTwoForm.value.otherReasonTextBox;
      this.aiimsRegistrationDataService
        .saveStepTwoAIIMSForm(this.stepTwoFormData)
        .subscribe((res_data: any) => {
          this.showLoading = false;
          this.userEligible = !res_data.excluded;
          // console.log('res data', res_data);
          // this.registrationDataService.participationID =
          //   res_data.participant_id;
          this.aiimsRegistrationDataService.participationID =
            res_data.participant_id;
          this.aiimsRegistrationDataService.category =
            res_data.category;
          if(this.aiimsRegistrationDataService.category == 1) {
            // console.log('aiims path');
            this.registration_path = AIIMS_REGISTRATION_PATH;
          } else {
            this.registration_path = OPEN_REGISTRATION_PATH;
          }
          if (this.userEligible) {
            this.authService.activateChild(true);
            const stepNumber = res_data.next_step;
            const navigation_step = this.registration_path + 'r/step-' + stepNumber;
              if (stepNumber === 3) {
                this.questionnaireService.questionnaire_name =
                  res_data.next_questionnaire;
                this.router.navigate([navigation_step]);
              } else {
                this.router.navigate([navigation_step]);
              }
          } else {
            // this.router.navigate([INELIGIBLE_FOR_TRIAL]);
          }
        });
    } else {
      this.showLoading = false;
      this.showErrorMsg = true;
    }
  }

  showTextBox(value: any) {
    if (value === 10) {
      this.otherOptionSelected = true;
    } else {
      this.otherOptionSelected = false;
    }
  }

  onContactUsClicked() {
    this.showContactUsService.contactUsClicked();
  }
}
