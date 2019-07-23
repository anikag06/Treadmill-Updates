import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Quiz } from './input/quiz';
import { Response } from './input/response';
import { GadResponse } from './input/gad_response';
import { QuizService } from './questionnaire.service';

// tslint:disable-next-line:max-line-length
import { DataService } from '/Users/darshittalavia/Desktop/TreadWill-ng-treadwill-fe-85ffa82d1922/src/app/main/dashboard/questionnaire/data.service';
import { User } from '@/shared/user.model';
import { trigger, transition, animate, style, state } from '@angular/animations';

@Component({
  animations: [
    trigger('in', [
      transition(':decrement',
        // tslint:disable-next-line:max-line-length
        [style({ opacity: 0, transform: 'translateX(-26%)' }), animate('200ms ease-in-out', style({ opacity: 1, transform: 'translateX(0%)' }))]),
      transition(':increment',
        // tslint:disable-next-line:max-line-length
        [style({ opacity: 0, transform: 'translateX(26%)' }), animate('200ms ease-in-out', style({ opacity: 1, transform: 'translateX(0%)' }))]),
    ]),
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(50%)' }),
        animate('1000ms ease-in-out', style({ opacity: 1, transform: 'translateX(0%)' }))
      ])
    ]),
    trigger('submit_animation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 1, transform: 'translateX(50%)' }),
        animate('200ms ease-in-out', style({ opacity: 1, transform: 'translateX(0%)' }))
      ])
    ])
  ],
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
  providers: [QuizService]
})
export class QuestionnaireComponent implements OnInit {
  user!: User;
  quizes: any = [];
  quiz: Quiz = new Quiz(null);
  question_no = 0;
  total_question!: number;
  ques!: string;
  time = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  seconds!: any;
  pager = {
    count: 1,
    index: 1
  };
  endDate!: any;
  endMonth!: any;
  endyear!: any;
  startTime!: Date;
  sum = 0;
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
  // tslint:disable-next-line:max-line-length
  api = ['http://172.26.90.49:9000/api/v1/questionnaire/phq-nine-questions-list/', 'http://172.26.90.49:9000/api/v1/questionnaire/gad-questions-list/'];
  index = 0;
  display_gad_start = false;
  display_questionnaire = false;
  display_phq_start = true;
  routing!: boolean;
  visible!: boolean;
  id!: any;
  isLag!: boolean;

  // tslint:disable-next-line:max-line-length
  constructor(private quizService: QuizService,
              private changeRef: ChangeDetectorRef,
              private dataService: DataService) { }

  ngOnInit() {
    this.loadQuiz();
  }


  loadQuiz() {
    this.quizService.get(this.api[this.index])
      .subscribe((res: any) => {
        this.quiz = new Quiz(res);
        this.pager.count = this.quiz.questions.length;
        this.total_question = this.pager.count - 1;
        this.pager.index = 1;
        this.ques = this.quiz.questions[0].name;
        this.back = false;
        this.routing = false;
        this.dataService.setOption(this.routing);
      });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  display() {
    if (this.display_phq_start === true) {
      this.display_phq_start = false;
      this.IsDisabled();
      this.index = 0;
      this.startTime = new Date();
      this.display_questionnaire = true;
    }
    if (this.display_gad_start === true) {
      this.display_gad_start = false;
      this.index = 1;
      this.loadQuiz();
      this.question_no = 0;
      this.submit = false;
      this.startTime = new Date();
      this.display_questionnaire = true;
      this.reset();
    }
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime());
    this.question_no >= 0 ? this.seconds = diff - this.sum : this.seconds = diff;
    this.seconds = this.seconds;
    this.sum = diff;
    return this.seconds;
  }

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
    this.time[this.question_no] > 0 ? this.time[this.question_no] = this.time[this.question_no] + this.tick() : this.time[this.question_no] = this.tick();
    setTimeout(() => {
      this.IsDisabled();
      this.answered[this.question_no] = true;
      this.question_no === this.total_question ? this.submit = true : this.submit = false;
      this.question_no < this.total_question ? this.question_no = this.question_no + 1 : this.question_no = this.question_no;
      this.pager.index < this.pager.count ? this.pager.index = this.pager.index + 1 : this.pager.index = this.pager.count;
      this.ques = this.quiz.questions[this.question_no].name;
      this.back = true;
      this.see0 = this.disabled.option_0[this.question_no];
      this.see1 = this.disabled.option_1[this.question_no];
      this.see2 = this.disabled.option_2[this.question_no];
      this.see3 = this.disabled.option_3[this.question_no];
      return this.ques;
    }, 500);
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
    this.time[this.question_no] > 0 ? this.time[this.question_no] = this.time[this.question_no] + this.tick() : this.time[this.question_no] = this.tick();
    setTimeout(() => {
      this.IsDisabled();
      this.answered[this.question_no] = true;
      this.question_no === this.total_question ? this.submit = true : this.submit = false;
      this.question_no < this.total_question ? this.question_no = this.question_no + 1 : this.question_no = this.question_no;
      this.pager.index < this.pager.count ? this.pager.index = this.pager.index + 1 : this.pager.index = this.pager.count;
      this.ques = this.quiz.questions[this.question_no].name;
      this.back = true;
      this.see0 = this.disabled.option_0[this.question_no];
      this.see1 = this.disabled.option_1[this.question_no];
      this.see2 = this.disabled.option_2[this.question_no];
      this.see3 = this.disabled.option_3[this.question_no];
      return this.ques;
    }, 500);
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
    this.time[this.question_no] > 0 ? this.time[this.question_no] = this.time[this.question_no] + this.tick() : this.time[this.question_no] = this.tick();
    setTimeout(() => {
      this.IsDisabled();
      this.answered[this.question_no] = true;
      this.question_no === this.total_question ? this.submit = true : this.submit = false;
      this.question_no < this.total_question ? this.question_no = this.question_no + 1 : this.question_no = this.question_no;
      this.pager.index < this.pager.count ? this.pager.index = this.pager.index + 1 : this.pager.index = this.pager.count;
      this.ques = this.quiz.questions[this.question_no].name;
      this.back = true;
      this.see0 = this.disabled.option_0[this.question_no];
      this.see1 = this.disabled.option_1[this.question_no];
      this.see2 = this.disabled.option_2[this.question_no];
      this.see3 = this.disabled.option_3[this.question_no];
      return this.ques;
    }, 500);
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
    this.time[this.question_no] > 0 ? this.time[this.question_no] = this.time[this.question_no] + this.tick() : this.time[this.question_no] = this.tick();
    setTimeout(() => {
      this.IsDisabled();
      this.answered[this.question_no] = true;
      this.question_no === this.total_question ? this.submit = true : this.submit = false;
      this.question_no < this.total_question ? this.question_no = this.question_no + 1 : this.question_no = this.question_no;
      this.pager.index < this.pager.count ? this.pager.index = this.pager.index + 1 : this.pager.index = this.pager.count;
      this.ques = this.quiz.questions[this.question_no].name;
      this.back = true;
      this.see0 = this.disabled.option_0[this.question_no];
      this.see1 = this.disabled.option_1[this.question_no];
      this.see2 = this.disabled.option_2[this.question_no];
      this.see3 = this.disabled.option_3[this.question_no];
      return this.ques;
    }, 500);
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
      this.time[this.question_no] > 0 ? this.time[this.question_no] = this.time[this.question_no] + this.tick() : this.time[this.question_no] = this.tick();
      this.question_no > 0 ? this.question_no = this.question_no - 1 : this.question_no = this.question_no;
      this.pager.index > 1 ? this.pager.index = this.pager.index - 1 : this.pager.index = this.pager.index;
    } else {
      this.submit = false;
      this.question_no = this.total_question;
      this.pager.index = this.pager.count;
    }
    this.question_no > 0 ? this.back = true : this.back = false;
    this.ques = this.quiz.questions[this.question_no].name;
    this.see0 = this.disabled.option_0[this.question_no];
    this.see1 = this.disabled.option_1[this.question_no];
    this.see2 = this.disabled.option_2[this.question_no];
    this.see3 = this.disabled.option_3[this.question_no];
  }

  onfront() {
    // tslint:disable-next-line:max-line-length
    this.time[this.question_no] > 0 ? this.time[this.question_no] = this.time[this.question_no] + this.tick() : this.time[this.question_no] = this.tick();
    this.question_no === this.total_question ? this.submit = true : this.submit = false;
    this.question_no < this.total_question ? this.question_no = this.question_no + 1 : this.question_no = this.total_question;
    this.pager.index < this.pager.count ? this.pager.index = this.pager.index + 1 : this.pager.index = this.pager.count;
    this.ques = this.quiz.questions[this.question_no].name;
    this.question_no > 0 ? this.back = true : this.back = false;
    this.back = true;
    // tslint:disable-next-line:max-line-length
    this.time[this.question_no] > 0 ? this.time[this.question_no] = this.time[this.question_no] + this.tick() : this.time[this.question_no] = this.tick();
    this.see0 = this.disabled.option_0[this.question_no];
    this.see1 = this.disabled.option_1[this.question_no];
    this.see2 = this.disabled.option_2[this.question_no];
    this.see3 = this.disabled.option_3[this.question_no];
  }

  onsubmit() {
    const response = new Response;
    const gad_response = new GadResponse;
    const date = new Date;
    this.endDate = date.getDate();
    this.endMonth = date.getUTCMonth();
    this.endyear = date.getUTCFullYear();
    this.display_questionnaire = false;
    this.index < 1 ? this.display_gad_start = true : this.display_gad_start = false;
    this.index === 1 ? this.routing = true : this.routing = false;
    this.dataService.setOption(this.routing);
    // this.time.forEach((q: any) => {
    //   response.user_response[q].time_taken_to_complete = this.time[q];
    //   response.user_response[q].answer = this.score[q];
    //   response.user_response[q].question = this.pager.index;
    // });
    if (this.time.length === 9) {
      console.log('phq');
      for (let i = 0; i < 9; i++) {
      response.user_response[i].time_taken_to_complete = this.time[i];
      response.user_response[i].answer = this.score[i];
      response.user_response[i].question = i + 1;
      }
    this.quizService.post_phq(response);
    }
    if (this.time.length === 7) {
      console.log('gad');
      for (let i = 0; i < 7; i++) {
        gad_response.user_response[i].time_taken_to_complete = this.time[i];
        gad_response.user_response[i].answer = this.score[i];
        gad_response.user_response[i].question = i + 1;
        }
      this.quizService.post_gad(gad_response);
    }

  }

  reset() {
    this.question_no = 0;
    this.time = [0, 0, 0, 0, 0, 0, 0];
    this.score = [0, 0, 0, 0, 0, 0, 0];
    this.disabled = {
      option_0: [false, false, false, false, false, false, false],
      option_1: [false, false, false, false, false, false, false],
      option_2: [false, false, false, false, false, false, false],
      option_3: [false, false, false, false, false, false, false],
    };
    this.answered = [false, false, false, false, false, false, false];
    this.sum = 0;
    this.see0 = false;
    this.see1 = false;
    this.see2 = false;
    this.see3 = false;
  }






}
