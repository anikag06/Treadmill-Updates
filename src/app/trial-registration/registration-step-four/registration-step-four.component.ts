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
    null
  );

  participationID!: number;
  starting_time!: any;
  completion_time!: any;
  showPage = false;
  notificationCheckboxText =
    'Notifications are an essential part of this program. Please accept to allow notifications.';
  a2hsCheckboxText =
    'For the purpose of this study, it is required that you add TreadWill to your home screen. Please accept to add TreadWill to your home screen. <b>By adding TreadWill, you also agree to Sign Up for TreadWill.</b>';
  allowedToHomeScreen = 0;
  notificationsAllowed = 0;
  addingToHomescreen = false;
  updatingPermissions = false;
  dialogRef!: MatDialogRef<CommonDialogComponent>;

  constructor(
    private registrationDataService: RegistrationDataService,
    private authService: TrialAuthService,
    private router: Router,
    private fcmService: FcmService,
    private a2hsService: A2HSService,
    private dialog: MatDialog,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const smallDevice = window.matchMedia('(max-width: 767px)').matches;
    if (smallDevice) {
      this.showPage = true;
    }
    const dateNow = new Date();
    const dateTime = dateNow.toJSON();
    this.starting_time = dateTime.replace('Z', '').replace('T', ' ');
    this.participationID = this.registrationDataService.participationID;
    this.fcmService.permit.subscribe((permit) => {
      console.log('inside subscription');
      this.notificationsAllowed = permit ? 1 : 0;
      this.updatingPermissions = false;
      this.changeDetector.detectChanges();
      this.activateSubmitButton();
    });
  }

  step4DataSubmit() {
    console.log(this.consentForm.value);
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
      console.log(this.completion_time);

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

    this.notificationsAllowed = 0;
    if (this.consentForm.value.notificationsInfo) {
      this.fcmService.participantRequestPermission(this.participationID);
    } else {
      this.updatingPermissions = false;
    }
    this.activateSubmitButton();
  }

  homeScreenPermission() {
    this.addingToHomescreen = true;
    if (this.consentForm.value.homeScreenInfo) {
      this.a2hsService.getDeferredPrompt().subscribe((deferredPrompt) => {
        this.addingToHomescreen = false;
        if (!deferredPrompt) {
          console.log('deferredPrompt null');
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
      console.log('calling activate submit button');
      this.allowSubmit = true;
      this.consentForm.controls['homeScreenInfo'].enable();
    } else {
      this.consentForm.controls['homeScreenInfo'].disable();
    }
    this.changeDetector.detectChanges();
  }
}
