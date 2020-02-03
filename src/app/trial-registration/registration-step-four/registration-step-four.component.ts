import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegistrationStepFourForm } from './step-four-consent.model';
import { RegistrationDataService } from '../shared/registration-data.service';
import { TrialAuthService } from '../shared/trial-auth.service';
import { Router } from '@angular/router';
import { REGISTRATION_PATH, INELIGIBLE_FOR_TRIAL } from '@/app.constants';
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
    this.a2hsService.setDeferredPrompt();
  }

  step4DataSubmit() {
    console.log(this.consentForm.value);
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
      this.stepFourFormData.started_at = this.starting_time;
      this.stepFourFormData.completed_at = this.completion_time;

      if (!this.fcmService.permit) {
        this.consentForm.value.notificationsInfo = 0;
        console.log(this.fcmService.permit);
      }
      this.stepFourFormData.notifications_consent = this.consentForm.value.notificationsInfo;

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
      console.log('participant ID: ', this.participationID);
      this.fcmService.participantRequestPermission(this.participationID);
      if (!this.fcmService.permit) {
        this.consentForm.value.notificationsInfo = 0;
        console.log(this.fcmService.permit);
      }
    }
  }

  homeScreenPermission() {
    if (this.consentForm.value.homeScreenInfo) {
      console.log('accepted');
      // this.a2hsService.getDeferredPrompt().subscribe((deferredPrompt) => {
      //     deferredPrompt.prompt();
      //   });
    }
  }
}
