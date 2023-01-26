import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegistrationStepTwoForm} from '@/trial-registration/registration-step-two/step-two-form-data.model';
import {TrialAuthService} from '@/trial-registration/shared/trial-auth.service';
import {Router} from '@angular/router';
import {RegistrationDataService} from '@/trial-registration/shared/registration-data.service';
import {QuizService} from '@/shared/questionnaire/questionnaire.service';
import {INELIGIBLE_FOR_TRIAL, REGISTRATION_PATH} from '@/app.constants';
import {RegistrationStepFourForm} from '@/trial-registration/registration-step-four/step-four-consent.model';
import {MatDialog, MatDialogRef} from '@angular/material';
import {CommonDialogComponent} from '@/shared/common-dialog/common-dialog.component';
import {FcmService} from '@/shared/fcm.service';
import {A2HSService} from '@/shared/a2hs.service';
import {MatContactUsDialogService} from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';

@Component({
  selector: 'app-aiims-registration-step-two',
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
    // browser: new FormControl(null, [Validators.required]),
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
  // stepFourFormData = new RegistrationStepFourForm(
  //   0,
  //   1,
  //   1,
  //   1,
  //   1,
  //   1,
  //   1,
  //   null,
  //   null,
  // );


  participationID = 0;
  starting_time!: any;
  completion_time!: any;
  showPage = false;
  notificationCheckboxText =
    'Notifications are an essential part of this program. Please accept to allow notifications.';
  a2hsCheckboxText =
    'For the purpose of this study, it is required that you add TreadWill to your home screen. Please accept to add TreadWill to your home screen. <b>By adding TreadWill, you also agree to Sign Up for TreadWill.</b>';
  allowedToHomeScreen = 0;
  notificationsAllowed!: number;
  addingToHomescreen = false;
  updatingPermissions = false;
  dialogRef!: MatDialogRef<CommonDialogComponent>;
  errorMessage = 'Oops! You blocked notifications from TreadWill.';
  notificationHelp =
    'No problem, you can still allow notifications. See under the heading <b>Allow or block notifications from some sites</b> in ';
  notificationLink =
    'https://support.google.com/chrome/answer/3220216?co=GENIE.Platform%3DAndroid&hl=en&oco=1';
  showHelp = false;
  country_data!: any;
  timezone_data!: any;
  otherOptionSelected = false;
  showErrorMsg = false;
  placeholder_tz!: any;

  constructor(
    private authService: TrialAuthService,
    private router: Router,
    private registrationDataService: RegistrationDataService,
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
    const notificationStatus = Notification.permission;
    if (notificationStatus === 'denied') {
      this.errorMessage =
        'It looks like you have blocked notifications in your browser.';
      this.notificationHelp =
        'See how to allow notifications.See under the heading <b>Allow or block notifications from all sites</b> in ';
    }
    const dateNow = new Date();
    const dateTime = dateNow.toJSON();
    this.starting_time = dateTime.replace('Z', '').replace('T', ' ');

    this.participationID = this.registrationDataService.participationID;
    this.fcmService.permit.subscribe(permit => {
      this.notificationsAllowed = permit ? 1 : 0;
      this.consentForm.controls['notificationsInfo'].setValue(
        this.notificationsAllowed,
      );
      this.updatingPermissions = false;
      this.showHelp = this.notificationsAllowed === 0;
      this.changeDetector.detectChanges();
    });
    this.starting_time = dateTime.replace('Z', '').replace('T', ' ');
    this.placeholder_tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.registrationDataService.getCountryList().subscribe((data: any) => {
      this.country_data = data;
    });
    this.registrationDataService.getTimeZoneData().subscribe((data: any) => {
      this.timezone_data = data;
    });
    this.participationID = this.registrationDataService.participationID;
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
      console.log('TIME ZONE', this.stepTwoForm.value.timezone);
      this.stepTwoFormData.time_zone = 'Asia/Calcutta';
      this.stepTwoFormData.started_at = this.starting_time;
      this.stepTwoFormData.completed_at = this.completion_time;
      // this.stepTwoFormData.source_of_information_other = this.stepTwoForm.value.otherReasonTextBox;
      this.registrationDataService
        .saveStepTwoAIIMSForm(this.stepTwoFormData)
        .subscribe((res_data: any) => {
          console.log('AIIMS RESPONSE DATA STEP 2', res_data);
          this.showLoading = false;
          this.userEligible = !res_data.excluded;
          this.registrationDataService.participationID =
            res_data.participant_id;
          if (this.userEligible) {
            this.authService.activateChild(true);

            const stepNumber = res_data.next_step;
            const navigation_step = REGISTRATION_PATH + '/aiims' + '/step-' + stepNumber;
            if (stepNumber === 3) {
              this.questionnaireService.questionnaire_name =
                res_data.next_questionnaire;
              this.router.navigate([navigation_step]);
            } else {
              this.router.navigate([navigation_step]);
            }
          } else {
            this.router.navigate([INELIGIBLE_FOR_TRIAL]);
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
