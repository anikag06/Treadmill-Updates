import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegistrationStepFourForm } from './step-four-consent.model';
import { RegistrationDataService } from '../shared/registration-data.service';
import { TrialAuthService } from '../shared/trial-auth.service';
import { Router } from '@angular/router';
import { INELIGIBLE_FOR_TRIAL, REGISTRATION_PATH } from '@/app.constants';
import { CommonDialogComponent } from '@/shared/common-dialog/common-dialog.component';
import { FcmService } from '@/shared/fcm.service';
import { A2HSService } from '@/shared/a2hs.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';

@Component({
  selector: 'app-registration-step-four',
  templateUrl: './registration-step-four.component.html',
  styleUrls: ['./registration-step-four.component.scss'],
})
export class RegistrationStepFourComponent implements OnInit {
  stepNo = 4;
  userEligible = false;
  allowSubmit = false;
  showLoading = false;
  userDeclined = false;

  consentForm = new FormGroup({
    readInfo: new FormControl(),
    voluntaryInfo: new FormControl(),
    confidentialInfo: new FormControl(),
    dataPublicationInfo: new FormControl(),
    informationLeakage: new FormControl(),
    notificationsInfo: new FormControl(),
    homeScreenInfo: new FormControl({
      value: null,
      disabled: !this.allowSubmit,
    }),
  });

  stepFourFormData = new RegistrationStepFourForm(
    0,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  );

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
  constructor(
    private registrationDataService: RegistrationDataService,
    private authService: TrialAuthService,
    private router: Router,
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
      this.activateSubmitButton();
    });
  }

  step4DataSubmit() {
    // used for e2e testing
    this.registrationDataService
      .getSignupLinkForTesting(this.registrationDataService.trial_email)
      .subscribe((data: any) => {
        this.registrationDataService.signup_link = data.unique_link;
      });
    // till here
    if (this.consentForm.valid) {
      this.showLoading = true;
      const dateNow = new Date();
      const dateTime = dateNow.toJSON();
      this.completion_time = dateTime.replace('Z', '').replace('T', ' ');

      this.stepFourFormData.participant_id = this.registrationDataService.participationID;
      this.stepFourFormData.read_information_consent = this.consentForm.value.readInfo;
      this.stepFourFormData.voluntary_involvement_consent = this.consentForm.value.voluntaryInfo;
      this.stepFourFormData.information_confidential_consent = this.consentForm.value.confidentialInfo;
      this.stepFourFormData.information_publication_consent = this.consentForm.value.dataPublicationInfo;
      this.stepFourFormData.information_leakage_consent = this.consentForm.value.informationLeakage;
      this.stepFourFormData.started_at = this.starting_time;
      this.stepFourFormData.completed_at = this.completion_time;

      this.registrationDataService
        .saveConsentData(this.stepFourFormData)
        .subscribe((res_data: any) => {
          this.showLoading = false;
          this.userEligible = !res_data.excluded;
          this.registrationDataService.participationID =
            res_data.participant_id;
          if (this.userEligible) {
            this.authService.activateChild(true);
            const stepNumber = res_data.next_step;
            const navigation_step = REGISTRATION_PATH + '/step-' + stepNumber;
            this.router.navigate([navigation_step]);
            this.dialogRef.componentInstance.data = { loading: false };
          } else {
            this.router.navigate([INELIGIBLE_FOR_TRIAL]);
          }
        });
    }
  }

  notificationsPermission() {
    this.updatingPermissions = true;
    // this.notificationsAllowed = 0;
    if (this.consentForm.value.notificationsInfo) {
      this.fcmService.participantRequestPermission(this.participationID);
      this.userDeclined = false;
    } else {
      this.updatingPermissions = false;
      this.userDeclined = true;
    }
    this.activateSubmitButton();
  }

  homeScreenPermission() {
    this.addingToHomescreen = true;
    if (this.consentForm.value.homeScreenInfo) {
      this.a2hsService.getDeferredPrompt().subscribe(deferredPrompt => {
        this.addingToHomescreen = false;
        if (!deferredPrompt) {
          return;
        }
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            this.stepFourFormData.agreement_consent = 1;
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
    } else {
      this.addingToHomescreen = false;
    }
  }

  activateSubmitButton() {
    if (
      this.consentForm.value.readInfo &&
      this.consentForm.value.voluntaryInfo &&
      this.consentForm.value.confidentialInfo &&
      this.consentForm.value.dataPublicationInfo &&
      this.consentForm.value.informationLeakage &&
      this.notificationsAllowed
    ) {
      this.allowSubmit = true;
      this.consentForm.controls['homeScreenInfo'].enable();
    } else {
      this.consentForm.controls['homeScreenInfo'].disable();
    }
    this.changeDetector.detectChanges();
  }

  onContactUsClicked() {
    this.showContactUsService.contactUsClicked();
  }
}
