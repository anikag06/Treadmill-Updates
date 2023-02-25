import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

import {
  AIIMS_EMAIL_REGISTRATION,
  AIIMS_REGISTRATION_GAD_RESPONSE,
  AIIMS_REGISTRATION_PHQ_RESPONSE,
  AIIMS_REGISTRATION_SIQ_RESPONSE,
  AIIMS_REGISTRATION_STEP_TWO,
  GET_COUNTRY_LIST,
  GET_PARTICIPANT_COUNT,
  GET_TIMEZONE, OPEN_EMAIL_REGISTRATION,
  REGISTRATION_CONSENT_AIIMS,
} from '@/app.constants';
import {RegistrationStepTwoForm} from '@/trial-registration/registration-step-two/step-two-form-data.model';
import {RegistrationQuestionnaireScore} from '@/trial-registration/registration-step-three/resgistration-step-three-response.model';

@Injectable({
  providedIn: 'root'
})
export class TrialAiimsRegistrationService {

  constructor(private http: HttpClient) { }

  participationID!: number;
  aiimsUser!: boolean;
  category!: number;


  storeAiimsEmailID(emailID: any) {
    const sendData = { email: emailID };
    return this.http.post(
      environment.API_ENDPOINT + AIIMS_EMAIL_REGISTRATION,
      sendData,
    );
  }

  storeOpenEmailID(emailID: any) {
    const sendData = { email: emailID };
    return this.http.post(
      environment.API_ENDPOINT + OPEN_EMAIL_REGISTRATION,
      sendData,
    );
  }

  saveStepTwoAIIMSForm(stepTwoData: RegistrationStepTwoForm) {
    return this.http.put(
      environment.API_ENDPOINT + AIIMS_REGISTRATION_STEP_TWO,
      stepTwoData,
    );
  }

  saveAiimsPHQData(phqResponse: RegistrationQuestionnaireScore) {
    return this.http.post(
      environment.API_ENDPOINT + AIIMS_REGISTRATION_PHQ_RESPONSE,
      phqResponse,
    );
  }

  saveAiimsSIQData(siqResponse: RegistrationQuestionnaireScore) {
    return this.http.post(
      environment.API_ENDPOINT + AIIMS_REGISTRATION_SIQ_RESPONSE,
      siqResponse,
    );
  }

  saveAiimsGADData(gadResponse: RegistrationQuestionnaireScore) {
    return this.http.post(
      environment.API_ENDPOINT + AIIMS_REGISTRATION_GAD_RESPONSE,
      gadResponse,
    );
  }

  saveConsentDataAiims(consentFormData: any) {
    return this.http.put(
      environment.API_ENDPOINT + REGISTRATION_CONSENT_AIIMS,
      consentFormData,
    );
  }
  getCountryList() {
    return this.http.get(environment.API_ENDPOINT + GET_COUNTRY_LIST);
  }

  getTimeZoneData() {
    return this.http.get(environment.API_ENDPOINT + GET_TIMEZONE);
  }

}
