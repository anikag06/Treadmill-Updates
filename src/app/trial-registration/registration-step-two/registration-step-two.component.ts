import { Component, OnInit } from '@angular/core';
import { TrialAuthService } from '../shared/trial-auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { INELIGIBLE_FOR_TRIAL, REGISTRATION_PATH } from '@/app.constants';
import { FormGroup, FormControl } from '@angular/forms';
import { RegistrationStepTwoForm } from './step-two-form-data.model';
import { RegistrationDataService } from '../shared/registration-data.service';
import { QuizService } from '@/shared/questionnaire/questionnaire.service';

@Component({
  selector: 'app-registration-step-two',
  templateUrl: './registration-step-two.component.html',
  styleUrls: ['./registration-step-two.component.scss']
})
export class RegistrationStepTwoComponent implements OnInit {

  stepNo = 2;
  userEligible = false;

  stepTwoForm = new FormGroup({
    age: new FormControl(20),
    gender: new FormControl(''),
    education: new FormControl(1),
    profession: new FormControl(1),
    country: new FormControl(1),
    knowEnglish: new FormControl(1),
    internetEnabled: new FormControl(1),
    psychiatricHelp: new FormControl(''),
    haveDisorder: new FormControl(1),
    traumaticEvent: new FormControl(1),
    infoSource: new FormControl(1),
    helpReason: new FormControl(1),
    programPlan: new FormControl(1),
    otherReasonTextBox: new FormControl(null),
  });

  stepTwoFormData = new RegistrationStepTwoForm(
      52, 0, null , 0, 1, 1, true, true, 'other', false,
      false, 0, false, 0, null, null, null
  );

  participationID!: number;
  starting_time!: any;
  completion_time!: any;
  otherOptionSelected = false;

  constructor(
    private authService: TrialAuthService,
    private router: Router,
    private registrationDataService: RegistrationDataService,
    private questionnaireService: QuizService,
  ) { }

  ngOnInit() {
    const dateNow = new Date();
    const dateTime = dateNow.toJSON();
    this.starting_time = dateTime.replace('Z', '').replace('T', ' ');
    console.log(this.starting_time);
    this.participationID = this.registrationDataService.participationID;
  }

  stepDataSubmit() {
    console.log('this.step form valid', this.stepTwoForm.valid);
    console.log(this.stepTwoForm.value);
    if (this.stepTwoForm.valid) {
      const dateNow = new Date();
      const dateTime = dateNow.toJSON();
      this.completion_time = dateTime.replace('Z', '').replace('T', ' ');
      console.log(this.completion_time);

      this.stepTwoFormData.participant_id = this.participationID;
      this.stepTwoFormData.age = this.stepTwoForm.value.age;
      this.stepTwoFormData.gender = this.stepTwoForm.value.gender;
      this.stepTwoFormData.education = this.stepTwoForm.value.education;
      this.stepTwoFormData.occupation = this.stepTwoForm.value.profession;
      this.stepTwoFormData.country = this.stepTwoForm.value.country;
      this.stepTwoFormData.english = this.stepTwoForm.value.knowEnglish;
      this.stepTwoFormData.tech_access = this.stepTwoForm.value.internetEnabled;
      this.stepTwoFormData.secondary_help = this.stepTwoForm.value.psychiatricHelp;
      this.stepTwoFormData.psychosis_or_bipolar = this.stepTwoForm.value.haveDisorder;
      this.stepTwoFormData.traumatic_event = this.stepTwoForm.value.traumaticEvent;
      this.stepTwoFormData.source_of_information = this.stepTwoForm.value.infoSource;
      this.stepTwoFormData.joining_for_help = this.stepTwoForm.value.helpReason;
      this.stepTwoFormData.plans_to_complete = this.stepTwoForm.value.programPlan;
      this.stepTwoFormData.started_at = this.starting_time;
      this.stepTwoFormData.completed_at = this.completion_time;

      this.stepTwoFormData.source_of_information_other = this.stepTwoForm.value.otherReasonTextBox;

      this.registrationDataService.saveStepTwoForm(this.stepTwoFormData)
        .subscribe( (res_data: any) => {
          console.log(res_data);
          this.userEligible = !res_data.excluded;
          this.registrationDataService.participationID = res_data.participant_id;
          if (this.userEligible) {
            this.authService.activateChild(true);
            const stepNumber = res_data.next_step;
            const navigation_step = REGISTRATION_PATH + '/step-' + stepNumber;
            if (stepNumber === 3) {
              this.questionnaireService.questinnaire_name = res_data.next_questionnaire;
              this.router.navigate([navigation_step]);
            } else {
              this.router.navigate([navigation_step]);
            }
          } else {
            // this.authService.activateChild(true);
            this.router.navigate([INELIGIBLE_FOR_TRIAL]);
          }
        });
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
