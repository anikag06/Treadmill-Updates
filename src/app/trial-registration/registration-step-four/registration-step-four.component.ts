import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegistrationStepFourForm } from './step-four-consent.model';
import { RegistrationDataService } from '../shared/registration-data.service';
import { TrialAuthService } from '../shared/trial-auth.service';
import { Router } from '@angular/router';
import { INELIGIBLE_FOR_TRIAL, REGISTRATION_PATH } from '@/app.constants';

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
    agreementInfo: new FormControl(),
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

  participationID!: number;
  starting_time!: any;
  completion_time!: any;

  constructor(
    private registrationDataService: RegistrationDataService,
    private authService: TrialAuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    const dateNow = new Date();
    const dateTime = dateNow.toJSON();
    this.starting_time = dateTime.replace('Z', '').replace('T', ' ');
    console.log(this.starting_time);
    this.participationID = this.registrationDataService.participationID;
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
      this.showLoading = true;
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
          } else {
            // this.authService.activateChild(true);
            this.router.navigate([INELIGIBLE_FOR_TRIAL]);
          }
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
      this.consentForm.value.agreementInfo
    ) {
      this.allowSubmit = true;
    }
  }
}
