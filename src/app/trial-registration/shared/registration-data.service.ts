import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import {
  EMAIL_REGISTRATION,
  REGISTRATION_STEP_TWO,
  REGISTRATION_PHQ_RESPONSE,
  REGISTRATION_GAD_RESPONSE,
  REGISTRATION_CONSENT,
  REGISTRATION_SIQ_RESPONSE,
  AIIMS_REGISTRATION_PHQ_RESPONSE,
  GET_COUNTRY_LIST,
  GET_TIMEZONE,
  GET_PARTICIPANT_COUNT,
  AIIMS_EMAIL_REGISTRATION,
  AIIMS_REGISTRATION_STEP_TWO,
  REGISTRATION_CONSENT_AIIMS,
  AIIMS_REGISTRATION_GAD_RESPONSE,
  AIIMS_REGISTRATION_SIQ_RESPONSE,
} from '@/app.constants';
import { RegistrationStepTwoForm } from '../registration-step-two/step-two-form-data.model';
import { RegistrationQuestionnaireScore } from '../registration-step-three/resgistration-step-three-response.model';
import { RegistrationStepFourForm } from '../registration-step-four/step-four-consent.model';

@Injectable({
  providedIn: 'root',
})
export class RegistrationDataService {
  participationID!: number;
  isWaitList!: boolean;
  aiimsUser!: boolean;

  constructor(private http: HttpClient) {}

  storeEmailID(emailID: any) {
    const sendData = { email: emailID };
    return this.http.post(
      environment.API_ENDPOINT + EMAIL_REGISTRATION,
      sendData,
    );
  }
  storeAiimsEmailID(emailID: any) {
    const sendData = { email: emailID };
    return this.http.post(
      environment.API_ENDPOINT + AIIMS_EMAIL_REGISTRATION,
      sendData,
    );
  }

  storeEncryptedEmailID(encrypted_email: any) {
    const sendData = { encrypted_email: encrypted_email };
    return this.http.post(
      environment.API_ENDPOINT + EMAIL_REGISTRATION,
      sendData,
    );
  }

  saveStepTwoForm(stepTwoData: RegistrationStepTwoForm) {
    return this.http.put(
      environment.API_ENDPOINT + REGISTRATION_STEP_TWO,
      stepTwoData,
    );
  }

  saveStepTwoAIIMSForm(stepTwoData: RegistrationStepTwoForm) {
    return this.http.put(
      environment.API_ENDPOINT + AIIMS_REGISTRATION_STEP_TWO,
      stepTwoData,
    );
  }

  savePHQData(phqResponse: RegistrationQuestionnaireScore) {
    return this.http.post(
      environment.API_ENDPOINT + REGISTRATION_PHQ_RESPONSE,
      phqResponse,
    );
  }
  saveAiimsPHQData(phqResponse: RegistrationQuestionnaireScore) {
    console.log('aiims user phq');
    return this.http.post(
      environment.API_ENDPOINT + AIIMS_REGISTRATION_PHQ_RESPONSE,
      phqResponse,
    );
  }

  saveSIQData(siqResponse: RegistrationQuestionnaireScore) {
    return this.http.post(
      environment.API_ENDPOINT + REGISTRATION_SIQ_RESPONSE,
      siqResponse,
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
  saveGADData(gadResponse: RegistrationQuestionnaireScore) {
    return this.http.post(
      environment.API_ENDPOINT + REGISTRATION_GAD_RESPONSE,
      gadResponse,
    );
  }

  saveConsentData(consentFormData: RegistrationStepFourForm) {
    return this.http.put(
      environment.API_ENDPOINT + REGISTRATION_CONSENT,
      consentFormData,
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
  getNumParticpantsLeft() {
    return this.http.get(environment.API_ENDPOINT + GET_PARTICIPANT_COUNT);
  }
}
