import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegistrationStepFourForm } from './step-four-consent.model';
import { RegistrationDataService } from '../shared/registration-data.service';
import { TrialAuthService } from '../shared/trial-auth.service';
import { Router } from '@angular/router';
import { INELIGIBLE_FOR_TRIAL, REGISTRATION_PATH } from '@/app.constants';
import { FcmService } from '@/shared/fcm.service';
import { A2HSService } from '@/shared/a2hs.service';

@Component({
  selector: 'app-registration-step-four',
  templateUrl: './registration-step-four.component.html',
  styleUrls: ['./registration-step-four.component.scss'],
})
export class RegistrationStepFourComponent implements OnInit {
  stepNo = 4;
  userEligible = false;
  allowSubmit = false;
  signup_link!: string;

  consentForm = new FormGroup({
    readInfo: new FormControl(),
    voluntaryInfo: new FormControl(),
    confidentialInfo: new FormControl(),
    dataPublicationInfo: new FormControl(),
    informationLeakage: new FormControl(),
    agreementInfo: new FormControl(),
    homeScreenInfo: new FormControl(),
    notificationsInfo: new FormControl(),
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
    null,
    null,
  );

  participationID!: number;
  starting_time!: any;
  completion_time!: any;

  constructor(
    private registrationDataService: RegistrationDataService,
    private authService: TrialAuthService,
    private router: Router,
    private fcmService: FcmService,
    private a2hsService: A2HSService,
  ) {}

  ngOnInit() {
    const dateNow = new Date();
    const dateTime = dateNow.toJSON();
    this.starting_time = dateTime.replace('Z', '').replace('T', ' ');
    console.log(this.starting_time);
    this.participationID = this.registrationDataService.participationID;
    this.fcmService.permit.subscribe(permit => {
      this.consentForm.value.notificationsInfo = permit ? 1 : 0;
      this.activateSubmitButton();
    });
  }

  step4DataSubmit() {
    console.log(this.consentForm.value);
    // used for e2e testing
    this.registrationDataService
      .getSignupLinkForTesting(this.registrationDataService.trial_email)
      .subscribe((data: any) => {
        console.log('SIGN UP LINK', data);
        this.registrationDataService.signup_link = data.unique_link;
      });
    // till here
    if (this.consentForm.valid) {
      console.log('form is valid');
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
      this.stepFourFormData.agreement_consent = this.consentForm.value.agreementInfo;
      this.stepFourFormData.add_to_home_screen_consent = this.consentForm.value.homeScreenInfo;
      this.stepFourFormData.notifications_consent = this.consentForm.value.notificationsInfo;
      this.stepFourFormData.started_at = this.starting_time;
      this.stepFourFormData.completed_at = this.completion_time;

      this.registrationDataService
        .saveConsentData(this.stepFourFormData)
        .subscribe((res_data: any) => {
          console.log(res_data);
          this.userEligible = !res_data.excluded;
          this.registrationDataService.participationID =
            res_data.participant_id;
          if (this.userEligible) {
            this.authService.activateChild(true);
            const stepNumber = res_data.next_step;
            const navigation_step = REGISTRATION_PATH + '/step-' + stepNumber;
            this.router.navigate([navigation_step]);
          } else {
            // this.authService.activateChild(true);
            this.router.navigate([INELIGIBLE_FOR_TRIAL]);
          }
        });
    }
  }

  notificationsPermission() {
    if (this.consentForm.value.notificationsInfo) {
      this.fcmService.participantRequestPermission(this.participationID);
    }
  }

  homeScreenPermission() {
    if (this.consentForm.value.homeScreenInfo) {
      this.a2hsService.getDeferredPrompt().subscribe(deferredPrompt => {
        if (!deferredPrompt) {
          console.log('deferredPrompt null');
          return;
        }
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            // no matter the outcome, the prompt cannot be reused ON MOBILE
            // for 3 months or until browser cache is cleared?
          } else {
            let deferredPromptRejected = true;
          }
        });
      });
    }
  }

  activateSubmitButton() {
    if (
      this.consentForm.value.readInfo &&
      this.consentForm.value.voluntaryInfo &&
      this.consentForm.value.confidentialInfo &&
      this.consentForm.value.dataPublicationInfo &&
      this.consentForm.value.informationLeakage &&
      this.consentForm.value.agreementInfo &&
      this.consentForm.value.homeScreenInfo &&
      this.consentForm.value.notificationsInfo
    ) {
      this.allowSubmit = true;
    }
  }
}
