import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegistrationStepFourForm } from './step-four-consent.model';
import { RegistrationDataService } from '../shared/registration-data.service';

@Component({
  selector: 'app-registration-step-four',
  templateUrl: './registration-step-four.component.html',
  styleUrls: ['./registration-step-four.component.scss']
})
export class RegistrationStepFourComponent implements OnInit {

  stepNo = 4;

  consentForm = new FormGroup({
    readInfo: new FormControl(),
    voluntaryInfo: new FormControl(),
    confidentialInfo: new FormControl(),
    dataPubicationInfo: new FormControl(),
    informationLeakage: new FormControl(),
    agreementInfo: new FormControl(),
    homeScreenInfo: new FormControl(),
    notificationsInfo: new FormControl(),

  });

  stepFourFormData = new RegistrationStepFourForm(
    0, 0, null , null, null, null, null, null, null, null, null,
);

  participationID!: number;
  starting_time!: any;
  completion_time!: any;


  constructor(
    private dataService: RegistrationDataService,
  ) { }

  ngOnInit() {
    const dateNow = new Date();
    const dateTime = dateNow.toJSON();
    this.starting_time = dateTime.replace('Z', '').replace('T', ' ');
    console.log(this.starting_time);
  }

  step4DataSubmit() {
    console.log(this.consentForm.value);
    if (this.consentForm.valid) {
      console.log('form is valid');
      const dateNow = new Date();
      const dateTime = dateNow.toJSON();
      this.completion_time = dateTime.replace('Z', '').replace('T', ' ');
      console.log(this.completion_time);

      this.stepFourFormData.participant_id = this.dataService.participationID;
      this.stepFourFormData.read_information_consent = this.consentForm.value.readInfo;
      this.stepFourFormData.voluntary_involvement_consent = this.consentForm.value.voluntaryInfo;
      this.stepFourFormData.information_confidential_consent = this.consentForm.value.confidentialInfo;
      this.stepFourFormData.information_publication_consent = this.consentForm.value.dataPubicationInfo;
      this.stepFourFormData.information_leakage_consent = this.consentForm.value.informationLeakage;
      this.stepFourFormData.agreement_consent = this.consentForm.value.agreementInfo;
      this.stepFourFormData.add_to_home_screen_consent = this.consentForm.value.homeScreenInfo;
      this.stepFourFormData.notifications_consent = this.consentForm.value.notificationsInfo;
      this.stepFourFormData.started_at = this.starting_time;
      this.stepFourFormData.completed_at = this.completion_time;

      this.dataService.saveConsentData(this.stepFourFormData)
        .subscribe( (res_data: any) => {
          console.log(res_data);

          // navigate to next step if eligible for the study


        });
    }
  }
}
