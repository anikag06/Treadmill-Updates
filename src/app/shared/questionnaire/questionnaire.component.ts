import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionnaireItem} from '@/shared/questionnaire/shared/questionnaire.model';
import {UsefulListItem} from '@/main/extra-resources/shared/usefulList.model';
import {QuestionModel} from '@/shared/questionnaire/shared/question.model';
import {Options} from '@/shared/questionnaire/shared/options.model';
import {BehaviorSubject} from 'rxjs';
import {QuestionnaireService} from '@/shared/questionnaire/questionnaire.service';
import {User} from '@/shared/user.model';
import {AuthService} from '@/shared/auth/auth.service';

import {
  useAnimation,
  trigger,
  transition,
  animate,
  style,
  state,
} from '@angular/animations';
import { DataService } from './data.service';
import { FlowService } from '@/main/flow/flow.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TrialAuthService } from '@/trial-registration/shared/trial-auth.service';
import { RegistrationQuestionnaireScore } from '@/trial-registration/registration-step-three/resgistration-step-three-response.model';
import { RegistrationDataService } from '@/trial-registration/shared/registration-data.service';
import { QuestionnaireResponse } from './input/questionnaire-response.model';
import {
  INELIGIBLE_FOR_TRIAL,
  REGISTRATION_PATH,
  GET_PHQ_QUESTIONS,
  GET_GAD_QUESTIONS,
  GET_SIQ_QUESTIONS,
  GAD7,
  SIQ,
  PHQ9,
  DEFAULT_PATH,
  AIIMS_REGISTRATION_PATH,
  OPEN_REGISTRATION_PATH,
  STUDENT_GROUP_REGISTRATION_PATH,
  LIFE_GROUP_REGISTRATION_PATH,
  LEARN_GROUP_REGISTRATION_PATH, WORK_GROUP_REGISTRATION_PATH,
} from '@/app.constants';
import { AuthService } from '../auth/auth.service';
import {
  incrementAnimation,
  decrementAnimation,
  enterAnimation,
  enterSubmitAnimation,
} from '../animations';
import { TimerService } from '../timer.service';
import { Location } from '@angular/common';
import { ConclusionService } from '@/main/resources/conclusion/conclusion.service';
import {TrialAiimsRegistrationService} from '@/trial-aiims-registration/trial-aiims-registration.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {
  @Input() questionnaireItem!: QuestionnaireItem;
  @Input() usefulListItem!: UsefulListItem;
  @Input() questionnaireResult!: any;
  @Input() questionnaireRefList!: any;
  @Input() isList!: string;
  @Input() isResult!: string;
  @Output() removeLoading = new EventEmitter();
  user!: User;
  showEachResultCardOnClick = false;
  showResultComponent = false;
  resultsArray = <any>[];

  constructor(
    private quesService: QuestionnaireService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
  }

  resultEachCardClick() {
    this.showEachResultCardOnClick = !this.showEachResultCardOnClick;
  }
  getBackgroundColor(category: string) {
    if (category === 'Anxiety problems') {
      return '#DFB264';
    } else if (category === 'Mood problems') {
      return '#90AAF2';
    } else if (category === 'Eating probelms') {
      return '#C091CB';
    } else if (category === 'Substance abuse problems') {
      return '#FFA3A3';
    } else if (category === 'General mental health problems') {
      return '#73C0D8';
    } else if (category === 'Sleep problems') {
      return '#D89E74';
    }
  }
  imageLoaded () {
    this.removeLoading.emit();
  }

  // tick() {
  //   const now = new Date();
  //   const diff = now.getTime() - this.startTime.getTime();
  //   this.question_no >= 0
  //     ? (this.seconds = diff - this.sum)
  //     : (this.seconds = diff);
  //   this.seconds = this.seconds;
  //   this.sum = diff;
  //   return this.seconds;
  // }

  IsDisabled() {
    this.visible = false;
    setTimeout(() => {
      this.visible = true;
    }, 1000);
  }
  Disabled_afterclick() {
    this.visible = false;
    setTimeout(() => {
      this.visible = true;
    }, 500);
  }

  onselect0() {
    this.Disabled_afterclick();
    this.score[this.question_no] = 0;
    this.disabled.option_3[this.question_no] = false;
    this.disabled.option_1[this.question_no] = false;
    this.disabled.option_2[this.question_no] = false;
    this.disabled.option_0[this.question_no] = false;
    this.see0 = false;
    this.see1 = false;
    this.see2 = false;
    this.see3 = false;
    this.disabled.option_0[this.question_no] = true;
    this.see0 = this.disabled.option_0[this.question_no];
    // tslint:disable-next-line:max-line-length
    this.time[this.question_no] > 0
      ? (this.time[this.question_no] =
          this.time[this.question_no] +
          this.timerService.showTime(
            this.question_no,
            this.startTime,
            this.first_click,
          ))
      : (this.time[this.question_no] = this.timerService.showTime(
          this.question_no,
          this.startTime,
          this.first_click,
        ));
    this.first_click = false;
    setTimeout(() => {
      this.IsDisabled();
      this.answered[this.question_no] = true;
      this.question_no === this.total_question
        ? (this.submit = true)
        : (this.submit = false);
      this.question_no < this.total_question
        ? (this.question_no = this.question_no + 1)
        : (this.question_no = this.question_no);
      this.pager.index < this.pager.count
        ? (this.pager.index = this.pager.index + 1)
        : (this.pager.index = this.pager.count);
      this.ques = this.quiz.questions[this.question_no].name;
      this.back = true;
      this.see0 = this.disabled.option_0[this.question_no];
      this.see1 = this.disabled.option_1[this.question_no];
      this.see2 = this.disabled.option_2[this.question_no];
      this.see3 = this.disabled.option_3[this.question_no];
      return this.ques;
    }, this.buttonTimeout);
  }

  onselect1() {
    this.Disabled_afterclick();
    this.score[this.question_no] = 1;
    this.disabled.option_0[this.question_no] = false;
    this.disabled.option_3[this.question_no] = false;
    this.disabled.option_2[this.question_no] = false;
    this.disabled.option_1[this.question_no] = false;
    this.see0 = false;
    this.see1 = false;
    this.see2 = false;
    this.see3 = false;
    this.disabled.option_1[this.question_no] = true;
    this.see1 = this.disabled.option_1[this.question_no];
    // tslint:disable-next-line:max-line-length
    this.time[this.question_no] > 0
      ? (this.time[this.question_no] =
          this.time[this.question_no] +
          this.timerService.showTime(
            this.question_no,
            this.startTime,
            this.first_click,
          ))
      : (this.time[this.question_no] = this.timerService.showTime(
          this.question_no,
          this.startTime,
          this.first_click,
        ));
    this.first_click = false;
    setTimeout(() => {
      this.IsDisabled();
      this.answered[this.question_no] = true;
      this.question_no === this.total_question
        ? (this.submit = true)
        : (this.submit = false);
      this.question_no < this.total_question
        ? (this.question_no = this.question_no + 1)
        : (this.question_no = this.question_no);
      this.pager.index < this.pager.count
        ? (this.pager.index = this.pager.index + 1)
        : (this.pager.index = this.pager.count);
      this.ques = this.quiz.questions[this.question_no].name;
      this.back = true;
      this.see0 = this.disabled.option_0[this.question_no];
      this.see1 = this.disabled.option_1[this.question_no];
      this.see2 = this.disabled.option_2[this.question_no];
      this.see3 = this.disabled.option_3[this.question_no];
      return this.ques;
    }, this.buttonTimeout);
  }

  onselect2() {
    this.Disabled_afterclick();
    this.score[this.question_no] = 2;
    this.disabled.option_0[this.question_no] = false;
    this.disabled.option_1[this.question_no] = false;
    this.disabled.option_3[this.question_no] = false;
    this.disabled.option_2[this.question_no] = false;
    this.see0 = false;
    this.see1 = false;
    this.see2 = false;
    this.see3 = false;
    this.disabled.option_2[this.question_no] = true;
    this.see2 = this.disabled.option_2[this.question_no];
    // tslint:disable-next-line:max-line-length
    this.time[this.question_no] > 0
      ? (this.time[this.question_no] =
          this.time[this.question_no] +
          this.timerService.showTime(
            this.question_no,
            this.startTime,
            this.first_click,
          ))
      : (this.time[this.question_no] = this.timerService.showTime(
          this.question_no,
          this.startTime,
          this.first_click,
        ));
    this.first_click = false;
    setTimeout(() => {
      this.IsDisabled();
      this.answered[this.question_no] = true;
      this.question_no === this.total_question
        ? (this.submit = true)
        : (this.submit = false);
      this.question_no < this.total_question
        ? (this.question_no = this.question_no + 1)
        : (this.question_no = this.question_no);
      this.pager.index < this.pager.count
        ? (this.pager.index = this.pager.index + 1)
        : (this.pager.index = this.pager.count);
      this.ques = this.quiz.questions[this.question_no].name;
      this.back = true;
      this.see0 = this.disabled.option_0[this.question_no];
      this.see1 = this.disabled.option_1[this.question_no];
      this.see2 = this.disabled.option_2[this.question_no];
      this.see3 = this.disabled.option_3[this.question_no];
      return this.ques;
    }, this.buttonTimeout);
  }

  onselect3() {
    this.Disabled_afterclick();
    this.score[this.question_no] = 3;
    this.disabled.option_0[this.question_no] = false;
    this.disabled.option_1[this.question_no] = false;
    this.disabled.option_2[this.question_no] = false;
    this.disabled.option_3[this.question_no] = false;
    this.see0 = false;
    this.see1 = false;
    this.see2 = false;
    this.see3 = false;
    this.disabled.option_3[this.question_no] = true;
    this.see3 = this.disabled.option_3[this.question_no];
    // tslint:disable-next-line:max-line-length
    this.time[this.question_no] > 0
      ? (this.time[this.question_no] =
          this.time[this.question_no] +
          this.timerService.showTime(
            this.question_no,
            this.startTime,
            this.first_click,
          ))
      : (this.time[this.question_no] = this.timerService.showTime(
          this.question_no,
          this.startTime,
          this.first_click,
        ));
    this.first_click = false;
    setTimeout(() => {
      this.IsDisabled();
      this.answered[this.question_no] = true;
      this.question_no === this.total_question
        ? (this.submit = true)
        : (this.submit = false);
      this.question_no < this.total_question
        ? (this.question_no = this.question_no + 1)
        : (this.question_no = this.question_no);
      this.pager.index < this.pager.count
        ? (this.pager.index = this.pager.index + 1)
        : (this.pager.index = this.pager.count);
      this.ques = this.quiz.questions[this.question_no].name;
      this.back = true;
      this.see0 = this.disabled.option_0[this.question_no];
      this.see1 = this.disabled.option_1[this.question_no];
      this.see2 = this.disabled.option_2[this.question_no];
      this.see3 = this.disabled.option_3[this.question_no];
      return this.ques;
    }, this.buttonTimeout);
  }

  display_front() {
    if (this.question_no < this.total_question) {
      return this.answered[this.question_no];
    } else {
      return false;
    }
  }

  onback() {
    if (this.submit === false) {
      // tslint:disable-next-line:max-line-length
      this.time[this.question_no] > 0
        ? (this.time[this.question_no] =
            this.time[this.question_no] +
            this.timerService.showTime(
              this.question_no,
              this.startTime,
              this.first_click,
            ))
        : (this.time[this.question_no] = this.timerService.showTime(
            this.question_no,
            this.startTime,
            this.first_click,
          ));
      this.question_no > 0
        ? (this.question_no = this.question_no - 1)
        : (this.question_no = this.question_no);
      this.pager.index > 1
        ? (this.pager.index = this.pager.index - 1)
        : (this.pager.index = this.pager.index);
    } else {
      this.submit = false;
      this.question_no = this.total_question;
      this.pager.index = this.pager.count;
    }
    this.question_no > 0 ? (this.back = true) : (this.back = false);
    this.ques = this.quiz.questions[this.question_no].name;
    this.see0 = this.disabled.option_0[this.question_no];
    this.see1 = this.disabled.option_1[this.question_no];
    this.see2 = this.disabled.option_2[this.question_no];
    this.see3 = this.disabled.option_3[this.question_no];
  }

  onfront() {
    // tslint:disable-next-line:max-line-length
    this.time[this.question_no] > 0
      ? (this.time[this.question_no] =
          this.time[this.question_no] +
          this.timerService.showTime(
            this.question_no,
            this.startTime,
            this.first_click,
          ))
      : (this.time[this.question_no] = this.timerService.showTime(
          this.question_no,
          this.startTime,
          this.first_click,
        ));
    this.question_no === this.total_question
      ? (this.submit = true)
      : (this.submit = false);
    this.question_no < this.total_question
      ? (this.question_no = this.question_no + 1)
      : (this.question_no = this.total_question);
    this.pager.index < this.pager.count
      ? (this.pager.index = this.pager.index + 1)
      : (this.pager.index = this.pager.count);
    this.ques = this.quiz.questions[this.question_no].name;
    this.question_no > 0 ? (this.back = true) : (this.back = false);
    this.back = true;
    // tslint:disable-next-line:max-line-length
    this.time[this.question_no] > 0
      ? (this.time[this.question_no] =
          this.time[this.question_no] +
          this.timerService.showTime(
            this.question_no,
            this.startTime,
            this.first_click,
          ))
      : (this.time[this.question_no] = this.timerService.showTime(
          this.question_no,
          this.startTime,
          this.first_click,
        ));
    this.see0 = this.disabled.option_0[this.question_no];
    this.see1 = this.disabled.option_1[this.question_no];
    this.see2 = this.disabled.option_2[this.question_no];
    this.see3 = this.disabled.option_3[this.question_no];
  }

  onsubmit() {
    // tslint:disable-next-line: prefer-const
    let questionnaireResponse: any;
    const phq_response = new QuesUserResponseArray(questionnaireResponse);
    const gad_response = new QuesUserResponseArray(questionnaireResponse);
    const siq_response = new QuesUserResponseArray(questionnaireResponse);

    const date = new Date();
    this.endDate = date.getDate();
    this.endMonth = date.getUTCMonth();
    this.endyear = date.getUTCFullYear();
    this.display_questionnaire = false;
    // this.index < 1 ? this.display_gad_start = true : this.display_gad_start = false;
    this.index === 1 ? (this.routing = true) : (this.routing = false);
    this.dataService.setOption(this.routing);
    if (this.index === 0) {
      // index =0 is for phq-9
      this.savePHQNineData(phq_response);
    }
    if (this.index === 1) {
      // index = 1 is for gad-7
      this.saveGADData(gad_response);
    }
    if (this.index === 2) {
      // index = 2 is for siq
      this.saveSIQData(siq_response);
    }
  }

  savePHQNineData(phq_response: QuesUserResponseArray) {
    this.submitting = true;
    for (let i = 0; i < 9; i++) {
      const ques_response = new QuestionnaireResponse(
        this.score[i],
        i + 1,
        this.time[i],
      );
      phq_response.user_response.push(ques_response);
    }

    if (this.fromFlow === true) {
      this.quizService.post_phq(phq_response).subscribe((res_data: any) => {
        this.phqNextStep(
          res_data.data.excluded,
          res_data.data.next_questionnaire,
          true,
        );
      });
    } else if (this.fromFlow === false && this.fromTrialRegistration === true) {
      const registration_phq = new RegistrationQuestionnaireScore(
        0,
        phq_response.user_response,
      );
      registration_phq.participant_id = this.registrationDataService.participationID;
      this.aiimsUser =  this.aiimsRegistrationDataService.aiimsUser;
      if (!this.aiimsUser) {
        this.registrationDataService
          .savePHQData(registration_phq)
          .subscribe((res_data: any) => {
            this.phqNextStep(
              res_data.data.excluded,
              res_data.data.next_questionnaire,
              false,
            );
          });
      } else {
        // FOR AIIMS USER
        registration_phq.participant_id = this.aiimsRegistrationDataService.participationID;
        this.aiimsRegistrationDataService
          .saveAiimsPHQData(registration_phq)
          .subscribe((res_data: any) => {
            this.phqNextStep(
              res_data.data.excluded,
              res_data.data.next_questionnaire,
              false,
            );
          });
      }
    }
  }
  phqNextStep(excluded: boolean, questionnaireName: string, user: boolean) {
    if (excluded) {
      this.quizService.questionnaireActive = false;
      this.trialAuthService.activateChild(true);
      this.routing = true;
      this.dataService.setOption(this.routing);
      if (user) {
        this.authService.logout(false);
        this.authService.isUserExcluded = true;
      } else {
        this.moveToThankYouPage();
      }
    } else {
      this.submitting = false;
      if (questionnaireName === SIQ) {
        this.display_siq_start = true;
      } else if (questionnaireName === GAD7) {
        this.display_gad_start = true;
      }
    }
  }

  saveGADData(gad_response: QuesUserResponseArray) {
    this.submitting = true;
    for (let i = 0; i < 7; i++) {
      const ques_response = new QuestionnaireResponse(
        this.score[i],
        i + 1,
        this.time[i],
      );
      gad_response.user_response.push(ques_response);
    }
    this.quizService.questionnaireActive = false;
    if (this.fromFlow === true) {
      this.quizService.questionnaire_active.emit(false);
      this.quizService.post_gad(gad_response).subscribe((data: any) => {
        this.submitting = false;
        if (data.data.excluded) {
          this.trialAuthService.activateChild(true);
          this.authService.logout(false);
          this.authService.isUserExcluded = true;
        } else if (this.quizService.followupActive) {
          this.router.navigate(['/']);
        }
      });
    } else if (this.fromFlow === false && this.fromTrialRegistration === true) {
      const registration_gad = new RegistrationQuestionnaireScore(
        0,
        gad_response.user_response,
      );
      registration_gad.participant_id = this.registrationDataService.participationID;
      this.iswaitList = this.registrationDataService.isWaitList;
      this.aiimsUser =  this.aiimsRegistrationDataService.aiimsUser;
      if (!this.aiimsUser) {
        this.registrationDataService
          .saveGADData(registration_gad)
          .subscribe((res_data: any) => {
            this.submitting = false;
            const userEligible = !res_data.data.excluded;
            this.registrationDataService.participationID =
              res_data.data.participant_id;
            if (userEligible && !this.iswaitList) {
              this.trialAuthService.activateChild(true);
              const stepNumber = res_data.data.next_step;
                const navigation_step = REGISTRATION_PATH + '/step-' + stepNumber;
                this.router.navigate([navigation_step]);
            } else if (userEligible && this.iswaitList) {
              this.quizService.questionnaire_active.emit(false);
            } else {
              this.moveToThankYouPage();
            }
          });
      } else {
        // FOR AIIMS USER
        registration_gad.participant_id = this.aiimsRegistrationDataService.participationID;
        this.aiimsRegistrationDataService
          .saveAiimsGADData(registration_gad)
          .subscribe((res_data: any) => {
            // for aiims registration
            this.submitting = false;
            const userEligible = !res_data.data.excluded;
            this.registrationDataService.participationID =
              res_data.data.participant_id;
            this.aiimsRegistrationDataService.participationID =
              res_data.data.participant_id;
            this.aiimsRegistrationDataService.category =
              res_data.data.category;
            if(this.aiimsRegistrationDataService.category == 1) {
              this.registration_path = AIIMS_REGISTRATION_PATH;
            } else if (this.aiimsRegistrationDataService.category == 2) {
              this.registration_path = OPEN_REGISTRATION_PATH;
            } else if (this.aiimsRegistrationDataService.category == 3) {
              this.registration_path = STUDENT_GROUP_REGISTRATION_PATH;
            } else if (this.aiimsRegistrationDataService.category == 4) {
              this.registration_path = LIFE_GROUP_REGISTRATION_PATH;
            } else if (this.aiimsRegistrationDataService.category == 5) {
              this.registration_path = LEARN_GROUP_REGISTRATION_PATH;
            } else if (this.aiimsRegistrationDataService.category == 6) {
              this.registration_path = WORK_GROUP_REGISTRATION_PATH;
            }
            if (userEligible && !this.iswaitList) {
              this.trialAuthService.activateChild(true);
              const stepNumber = res_data.data.next_step;
              const navigation_step = this.registration_path  + 'r/step-' + stepNumber;
                this.router.navigate([navigation_step]);
              }
          });
      }
    }
  }

  saveSIQData(siq_response: QuesUserResponseArray) {
    this.submitting = true;
    for (let i = 0; i < 10; i++) {
      const ques_response = new QuestionnaireResponse(
        this.score[i],
        i + 1,
        this.time[i],
      );
      siq_response.user_response.push(ques_response);
    }

    if (this.fromFlow === true) {
      this.quizService.post_siq(siq_response).subscribe((res_data: any) => {
        this.siqNextStep(
          res_data.data.excluded,
          res_data.data.next_questionnaire,
          true,
        );
      });
    } else if (this.fromFlow === false && this.fromTrialRegistration === true) {
      const registration_siq = new RegistrationQuestionnaireScore(
        0,
        siq_response.user_response,
      );
      registration_siq.participant_id = this.registrationDataService.participationID;
      this.aiimsUser =  this.aiimsRegistrationDataService.aiimsUser;
      if (!this.aiimsUser) {
        this.registrationDataService
          .saveSIQData(registration_siq)
          .subscribe((res_data: any) => {
            this.siqNextStep(
              res_data.data.excluded,
              res_data.data.next_questionnaire,
              false,
            );
          });
      } else {
        // FOR AIIMS USER
        registration_siq.participant_id = this.aiimsRegistrationDataService.participationID;
        this.aiimsRegistrationDataService
          .saveAiimsSIQData(registration_siq)
          .subscribe((res_data: any) => {
            this.siqNextStep(
              res_data.data.excluded,
              res_data.data.next_questionnaire,
              false,
            );
          });
      }
    }
  }
  siqNextStep(excluded: boolean, questionnaireName: string, user: boolean) {
    if (excluded) {
      this.quizService.questionnaireActive = false;
      this.routing = true;
      this.dataService.setOption(this.routing);
      this.trialAuthService.activateChild(true);
      if (user) {
        this.authService.logout(false);
        this.authService.isUserExcluded = true;
      } else {
        this.moveToThankYouPage();
      }
    } else {
      this.submitting = false;
      if (questionnaireName === GAD7) {
        this.display_gad_start = true;
      }
    }
  }

  moveToThankYouPage() {
    // this.trialAuthService.activateChild(true);
    this.router.navigate([INELIGIBLE_FOR_TRIAL]);
  }

  reset(no_questions: number) {
    this.question_no = 0;
    let i = no_questions;
    this.time = [];
    this.score = [];
    this.disabled = {
      option_0: [],
      option_1: [],
      option_2: [],
      option_3: [],
    };
    this.answered = [];
    while (i > 0) {
      this.time.push(0);
      this.score.push(0);
      this.disabled.option_0.push(false);
      this.disabled.option_1.push(false);
      this.disabled.option_2.push(false);
      this.disabled.option_3.push(false);
      this.answered.push(false);
      i--;
    }
    this.sum = 0;
    this.see0 = false;
    this.see1 = false;
    this.see2 = false;
    this.see3 = false;
  }
}

