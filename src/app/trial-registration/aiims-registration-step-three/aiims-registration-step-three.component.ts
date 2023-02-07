import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AIIMS_REGISTRATION_PATH, INELIGIBLE_FOR_TRIAL, REGISTRATION_PATH} from '@/app.constants';
import {CommonDialogComponent} from '@/shared/common-dialog/common-dialog.component';
import {TrialAuthService} from '@/trial-registration/shared/trial-auth.service';
import {Router} from '@angular/router';
import {RegistrationDataService} from '@/trial-registration/shared/registration-data.service';
import {QuizService} from '@/shared/questionnaire/questionnaire.service';
import {FcmService} from '@/shared/fcm.service';
import {A2HSService} from '@/shared/a2hs.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {MatContactUsDialogService} from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegistrationStepTwoForm} from '@/trial-registration/registration-step-two/step-two-form-data.model';

@Component({
  selector: 'app-aiims-registration-step-three',
  templateUrl: './aiims-registration-step-three.component.html',
  styleUrls: ['./aiims-registration-step-three.component.scss']
})
export class AiimsRegistrationStepThreeComponent implements OnInit {

  stepNo = 3;
  showPage = false;
  userEligible = false;
  // stepNo = 4;
  // userEligible = false;
  allowSubmit = false;
  showLoading = false;
  userDeclined = false;
  aiimsUser = false;

  consentForm = new FormGroup({
    notificationsInfo: new FormControl(),
    homeScreenInfo: new FormControl({
      value: null,
      disabled: !this.allowSubmit,
    }),
  });

  stepFourFormData = {participant_id: 0, started_at: 0, completed_at: 1};

  participationID = 0;
  starting_time!: any;
  completion_time!: any;
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
  showPrompt = false;


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
    this.registrationDataService.aiimsUser = true;
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

  consentSubmit($event: any) {
    console.log('questionnaireSubmitEmitter TRIGGERED', event);
    this.notificationsPermission();
  }

  step4DataSubmit() {

    console.log('SUBMIT DATA');
    // if (this.consentForm.valid) {
    this.showLoading = true;
    const dateNow = new Date();
    const dateTime = dateNow.toJSON();
    this.completion_time = dateTime.replace('Z', '').replace('T', ' ');

    this.stepFourFormData.participant_id = this.registrationDataService.participationID;
    this.stepFourFormData.started_at = this.starting_time;
    this.stepFourFormData.completed_at = this.completion_time;

    console.log('consent submited', this.stepFourFormData);
    this.registrationDataService
      .saveConsentDataAiims(this.stepFourFormData)
      .subscribe((res_data: any) => {
        console.log('consent submited');
        this.showLoading = false;
        this.userEligible = !res_data.excluded;
        this.registrationDataService.participationID =
          res_data.participant_id;
        if (this.userEligible) {
          this.authService.activateChild(true);
          const stepNumber = res_data.next_step;
          // const navigation_step = AIIMS_REGISTRATION_PATH + '/step-' + stepNumber;
          const navigation_step = AIIMS_REGISTRATION_PATH + '/step-' + 4;
          this.router.navigate([navigation_step]);
          this.dialogRef.componentInstance.data = { loading: false };
        } else {
          this.router.navigate([INELIGIBLE_FOR_TRIAL]);
        }
      });
    // }
  }

  notificationsPermission() {
    console.log('notification permission');
    this.updatingPermissions = true;
    // this.notificationsAllowed = 0;
    // if (this.consentForm.value.notificationsInfo) {
    this.fcmService.participantRequestPermission(this.participationID);
    this.userDeclined = false;
    // } else {
    //   this.updatingPermissions = false;
    //   this.userDeclined = true;
    // }
    // this.activateSubmitButton();
    this.homeScreenPermission();
  }

  homeScreenPermission() {
    this.showPrompt = true;
    console.log('homescreen permission');
    this.addingToHomescreen = true;
    // if (this.consentForm.value.homeScreenInfo) {
    this.a2hsService.getDeferredPrompt().subscribe(deferredPrompt => {
      console.log('ADD TO HOME SCREEN', deferredPrompt);
      this.addingToHomescreen = false;
      if (!deferredPrompt) {
        return;
      }
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        console.log('ADD TO HOME SCREEN', choiceResult);

        if (choiceResult.outcome === 'accepted') {
      // this.stepFourFormData.agreement_consent = 1;
      this.allowedToHomeScreen = 1;
      this.dialogRef = this.dialog.open(CommonDialogComponent, {
        data: {
          loading: true,
        },
        disableClose: true,
        minWidth: '90vw',
        autoFocus: false,
      });
      this.step4DataSubmit();
      // no matter the outcome, the prompt cannot be reused ON MOBILE
      // for 3 months or until browser cache is cleared?
      } else {
        const deferredPromptRejected = true;
      }
      });
    });
    // } else {
    //   this.addingToHomescreen = false;
    // }
  }

  activateSubmitButton() {
    if (
      this.notificationsAllowed
    ) {
      this.allowSubmit = true;
      this.consentForm.controls['homeScreenInfo'].enable();
    } else {
      this.consentForm.controls['homeScreenInfo'].disable();
    }
    this.changeDetector.detectChanges();
  }


}
