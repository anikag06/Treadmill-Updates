import { Component, OnInit, Input } from '@angular/core';
import { Quiz } from './input/quiz';
import { QuesUserResponseArray } from './input/response';
import { QuizService } from './questionnaire.service';
import { environment } from 'environments/environment';

// tslint:disable-next-line:max-line-length
// import { User } from '@/shared/user.model';
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
// import { StepGroup } from '@/main/flow/step-group/step-group.model';
// import { ACTIVE, QUESTIONNAIRE, } from '@/app.constants';
import { Router, ActivatedRoute } from '@angular/router';
// import { Step } from '@/main/flow/step-group/step/step.model';
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
} from '@/app.constants';
import { AuthService } from '../auth/auth.service';
import {
  incrementAnimation,
  decrementAnimation,
  enterAnimation,
  enterSubmitAnimation,
} from '../animations';
import { TimerService } from '../timer.service';
import {Location} from "@angular/common";
import {ConclusionService} from "@/main/resources/conclusion/conclusion.service";

@Component({
  animations: [
    trigger('in', [
      transition(
        ':decrement',
        // tslint:disable-next-line:max-line-length
        [
          // style({ opacity: 0, transform: 'translateX(-26%)' }),
          // animate(
          //   '200ms ease-in-out',
          //   style({ opacity: 1, transform: 'translateX(0%)' }),
          // ),
          useAnimation(decrementAnimation),
        ],
      ),
      transition(
        ':increment',
        // tslint:disable-next-line:max-line-length
        [
          // style({ opacity: 0, transform: 'translateX(26%)' }),
          // animate(
          //   '200ms ease-in-out',
          //   style({ opacity: 1, transform: 'translateX(0%)' }),
          // ),
          useAnimation(incrementAnimation),
        ],
      ),
    ]),
    trigger('simpleFadeAnimation', [
      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        // style({ opacity: 0, transform: 'translateX(50%)' }),
        // animate(
        //   '1000ms ease-in-out',
        //   style({ opacity: 1, transform: 'translateX(0%)' }),
        // ),
        useAnimation(enterAnimation),
      ]),
    ]),
    trigger('submit_animation', [
      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        // style({ opacity: 1, transform: 'translateX(50%)' }),
        // animate(
        //   '200ms ease-in-out',
        //   style({ opacity: 1, transform: 'translateX(0%)' }),
        // ),
        useAnimation(enterSubmitAnimation),
      ]),
    ]),
  ],
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {
  @Input() fromFlow!: boolean;
  @Input() fromTrialRegistration!: boolean;
  @Input() stepId!: number;

  quiz: Quiz = new Quiz(null);
  question_no = 0;
  total_question!: number;
  ques!: string;
  time = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  seconds!: any;
  pager = {
    count: 1,
    index: 1,
  };
  endDate!: any;
  endMonth!: any;
  endyear!: any;
  startTime!: Date;
  sum = 0;
  first_click!: boolean;
  answered = [false, false, false, false, false, false, false, false, false];
  back!: boolean;
  check!: any;
  score = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  submit = false;
  disabled = {
    option_0: [false, false, false, false, false, false, false, false, false],
    option_1: [false, false, false, false, false, false, false, false, false],
    option_2: [false, false, false, false, false, false, false, false, false],
    option_3: [false, false, false, false, false, false, false, false, false],
  };

  see0!: boolean;
  see1!: boolean;
  see2!: boolean;
  see3!: boolean;
  data = 'Please complete the questionnaire before leaving the page.';

  api = [
    environment.API_ENDPOINT + GET_PHQ_QUESTIONS,
    environment.API_ENDPOINT + GET_GAD_QUESTIONS,
    environment.API_ENDPOINT + GET_SIQ_QUESTIONS,
  ];
  index = 0; // index =0 is for phq-9, 1 for gad-7 and 2 for siq
  display_gad_start = false;
  display_questionnaire = false;
  display_phq_start = false;
  display_siq_start = false;

  is_siq_ques = false;
  siq_term_id!: number;

  routing!: boolean;
  visible!: boolean;
  id!: any;
  isLag!: boolean;
  // Timeout for each button
  buttonTimeout = 0;
  // step!: Step;
  // If questionnaire is loading
  loading = true;

  // tslint:disable-next-line:max-line-length
  constructor(
    private quizService: QuizService,
    private flowService: FlowService,
    private router: Router,
    private dataService: DataService,
    private trialAuthService: TrialAuthService,
    private registrationDataService: RegistrationDataService,
    private authService: AuthService,
    private timerService: TimerService,
    private location: Location,
    private conclusionService: ConclusionService,
  ) {}

  ngOnInit() {
    console.log(this.quizService.questinnaire_name);
    if (this.quizService.questinnaire_name === PHQ9) {
      this.index = 0;
      this.display_phq_start = true;
      this.loadQuiz();
    } else if (this.quizService.questinnaire_name === GAD7) {
      this.index = 1;
      this.display_gad_start = true;
      this.loadQuiz();
    } else if (this.quizService.questinnaire_name === SIQ) {
      this.index = 2;
      this.display_siq_start = true;
      this.loadQuiz();
    } else {
      this.router.navigate([DEFAULT_PATH]);
    }
  }

  loadQuiz() {
    this.quizService.disableLinks.emit(this.data);
    console.log('load quiz', this.api[this.index]);
    this.quizService.get(this.api[this.index]).subscribe((res: any) => {
      console.log(res);
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;
      this.total_question = this.pager.count - 1;
      this.pager.index = 1;
      this.ques = this.quiz.questions[0].name;
      this.back = false;
      this.routing = false;
      this.dataService.setOption(this.routing);
      this.loading = false;
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
    this.quizService.enableLinks.emit();
  }

  display() {
    console.log('click on display');
    this.first_click = true;
    if (this.display_phq_start === true) {
      this.display_phq_start = false;
      this.is_siq_ques = false;
      this.IsDisabled();
      this.index = 0;
      this.startTime = new Date();
      this.display_questionnaire = true;
    } else if (this.display_gad_start === true) {
      this.display_gad_start = false;
      this.is_siq_ques = false;
      this.index = 1;
      this.loadQuiz();
      this.question_no = 0;
      this.submit = false;
      this.startTime = new Date();
      this.display_questionnaire = true;
      this.reset(7);
    } else if (this.display_siq_start === true) {
      this.display_siq_start = false;
      this.is_siq_ques = true;
      this.index = 2;
      this.loadQuiz();
      this.question_no = 0;
      this.submit = false;
      this.startTime = new Date();
      this.display_questionnaire = true;
      this.reset(10);
    }
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
      console.log('phq_response', phq_response);
      this.savePHQNineData(phq_response);
    }
    if (this.index === 1) {
      // index = 1 is for gad-7
      console.log('gad');
      this.saveGADData(gad_response);
    }
    if (this.index === 2) {
      // index = 2 is for siq
      this.saveSIQData(siq_response);
    }
  }

  savePHQNineData(phq_response: QuesUserResponseArray) {
    for (let i = 0; i < 9; i++) {
      const ques_response = new QuestionnaireResponse(
        this.score[i],
        i + 1,
        this.time[i],
      );
      phq_response.user_response.push(ques_response);
    }
    console.log('response', phq_response);

    if (this.fromFlow === true) {
      this.quizService.post_phq(phq_response).subscribe((res_data: any) => {
        console.log('phq -9 res data', res_data);
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

      this.registrationDataService
        .savePHQData(registration_phq)
        .subscribe((res_data: any) => {
          console.log(res_data);
          this.phqNextStep(
            res_data.data.excluded,
            res_data.data.next_questionnaire,
            false,
          );
        });
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
      if (questionnaireName === SIQ) {
        console.log('show the siq ');
        this.display_siq_start = true;
      } else if (questionnaireName === GAD7) {
        this.display_gad_start = true;
      }
    }
  }

  saveGADData(gad_response: QuesUserResponseArray) {
    for (let i = 0; i < 7; i++) {
      const ques_response = new QuestionnaireResponse(
        this.score[i],
        i + 1,
        this.time[i],
      );
      gad_response.user_response.push(ques_response);
    }
    console.log('after updating gad', gad_response);
    this.quizService.questionnaireActive = false;
    if (this.fromFlow === true) {
      this.quizService.post_gad(gad_response).subscribe((data: any) => {
        console.log(data);
        // TODO: Darshit needs to add timer service here
        if (data.data.excluded) {
          this.trialAuthService.activateChild(true);
          this.authService.logout(false);
          this.authService.isUserExcluded = true;
        } else {
          this.flowService.markDone(this.stepId, 1003).subscribe(
            (resp: any) => {
              console.log(data);
            },
            error => console.log(error),
          );
          // this.router.navigate(['/']);
          // this.location.back();
        }
      });
    } else if (this.fromFlow === false && this.fromTrialRegistration === true) {
      const registration_gad = new RegistrationQuestionnaireScore(
        0,
        gad_response.user_response,
      );
      registration_gad.participant_id = this.registrationDataService.participationID;

      this.registrationDataService
        .saveGADData(registration_gad)
        .subscribe((res_data: any) => {
          console.log('gad response data', res_data);
          const userEligible = !res_data.data.excluded;
          this.registrationDataService.participationID =
            res_data.data.participant_id;
          if (userEligible) {
            this.trialAuthService.activateChild(true);
            const stepNumber = res_data.data.next_step;
            const navigation_step = REGISTRATION_PATH + '/step-' + stepNumber;
            this.router.navigate([navigation_step]);
          } else {
            this.moveToThankYouPage();
          }
        });
    }
  }

  saveSIQData(siq_response: QuesUserResponseArray) {
    for (let i = 0; i < 10; i++) {
      const ques_response = new QuestionnaireResponse(
        this.score[i],
        i + 1,
        this.time[i],
      );
      siq_response.user_response.push(ques_response);
      console.log(siq_response);
    }

    if (this.fromFlow === true) {
      this.quizService.post_siq(siq_response).subscribe((res_data: any) => {
        console.log('res data of siq', res_data);
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

      this.registrationDataService
        .saveSIQData(registration_siq)
        .subscribe((res_data: any) => {
          console.log(res_data);
          this.siqNextStep(
            res_data.data.excluded,
            res_data.data.next_questionnaire,
            false,
          );
        });
    }
  }
  siqNextStep(excluded: boolean, questionnaireName: string, user: boolean) {
    if (excluded) {
      this.quizService.questionnaireActive = false;
      this.routing = true;
      this.dataService.setOption(this.routing);
      this.trialAuthService.activateChild(true);
      console.log('if excluded', excluded, user);
      if (user) {
        this.authService.logout(false);
        this.authService.isUserExcluded = true;
      } else {
        this.moveToThankYouPage();
      }
    } else {
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
