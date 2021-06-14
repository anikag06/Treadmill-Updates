import { Component, OnInit } from '@angular/core';
import { TrialAuthService } from '../shared/trial-auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { INELIGIBLE_FOR_TRIAL, REGISTRATION_PATH } from '@/app.constants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationStepTwoForm } from './step-two-form-data.model';
import { RegistrationDataService } from '../shared/registration-data.service';
import { QuizService } from '@/shared/questionnaire-deprecated/questionnaire-deprecated.service';

@Component({
  selector: 'app-registration-step-two',
  templateUrl: './registration-step-two.component.html',
  styleUrls: ['./registration-step-two.component.scss'],
})
export class RegistrationStepTwoComponent implements OnInit {
  stepNo = 2;
  userEligible = false;

  stepTwoForm = new FormGroup({
    age: new FormControl(null, [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    education: new FormControl(null, [Validators.required]),
    profession: new FormControl(null, [Validators.required]),
    browser: new FormControl(null, [Validators.required]),
    country: new FormControl(null, [Validators.required]),
    timezone: new FormControl(null, [Validators.required]),
    knowEnglish: new FormControl(null, [Validators.required]),
    internetEnabled: new FormControl(null, [Validators.required]),
    psychiatricHelp: new FormControl(null, [Validators.required]),
    haveUsedEarlier: new FormControl(null, [Validators.required]),
    haveDisorder: new FormControl(null, [Validators.required]),
    traumaticEvent: new FormControl(null, [Validators.required]),
    infoSource: new FormControl(null, [Validators.required]),
    helpReason: new FormControl(null, [Validators.required]),
    programPlan: new FormControl(null, [Validators.required]),
    otherReasonTextBox: new FormControl(null),
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

  participationID!: number;
  starting_time!: any;
  completion_time!: any;
  country_data!: any;
  timezone_data!: any;
  otherOptionSelected = false;
  showErrorMsg = false;
  placeholder_tz!: any;
  showLoading = false;
  showPage = false;

  constructor(
    private authService: TrialAuthService,
    private router: Router,
    private registrationDataService: RegistrationDataService,
    private questionnaireService: QuizService,
  ) {}

  ngOnInit() {
    const smallDevice = window.matchMedia('(max-width: 767px)').matches;
    if (smallDevice) {
      this.showPage = true;
    }
    const dateNow = new Date();
    const dateTime = dateNow.toJSON();
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
      this.stepTwoFormData.country = this.stepTwoForm.value.country;
      this.stepTwoFormData.english = this.stepTwoForm.value.knowEnglish;
      this.stepTwoFormData.tech_access = this.stepTwoForm.value.internetEnabled;
      this.stepTwoFormData.secondary_help = this.stepTwoForm.value.psychiatricHelp;
      this.stepTwoFormData.have_used_earlier = this.stepTwoForm.value.haveUsedEarlier;
      this.stepTwoFormData.psychosis_or_bipolar = this.stepTwoForm.value.haveDisorder;
      this.stepTwoFormData.traumatic_event = this.stepTwoForm.value.traumaticEvent;
      this.stepTwoFormData.source_of_information = this.stepTwoForm.value.infoSource;
      this.stepTwoFormData.joining_for_help = this.stepTwoForm.value.helpReason;
      this.stepTwoFormData.plans_to_complete = this.stepTwoForm.value.programPlan;
      this.stepTwoFormData.time_zone = this.stepTwoForm.value.timezone;
      this.stepTwoFormData.started_at = this.starting_time;
      this.stepTwoFormData.completed_at = this.completion_time;
      this.stepTwoFormData.source_of_information_other = this.stepTwoForm.value.otherReasonTextBox;

      this.registrationDataService
        .saveStepTwoForm(this.stepTwoFormData)
        .subscribe((res_data: any) => {
          this.showLoading = false;
          this.userEligible = !res_data.excluded;
          this.registrationDataService.participationID =
            res_data.participant_id;
          if (this.userEligible) {
            this.authService.activateChild(true);
            const stepNumber = res_data.next_step;
            const navigation_step = REGISTRATION_PATH + '/step-' + stepNumber;
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
}
