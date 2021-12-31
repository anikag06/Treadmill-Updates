import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { UsefulListItem } from '@/main/extra-resources/shared/usefulList.model';
import { QuizService } from '@/shared/questionnaire-deprecated/questionnaire-deprecated.service';
import {CHOICES_GROUP, FEAR_QUESTIONNAIRE} from '@/app.constants';
import { Quiz } from '@/shared/questionnaire-deprecated/input/quiz';
import { Options } from '@/shared/questionnaire/shared/options.model';
import { QuestionnaireService } from '@/shared/questionnaire/questionnaire.service';
import { Result } from '@/shared/questionnaire/shared/result.model';
import { ExtraResourcesService } from '@/main/extra-resources/extra-resources.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionModel } from '@/shared/questionnaire/shared/question.model';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { MatSliderChange } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import {QuestionnaireItem} from '@/shared/questionnaire/shared/questionnaire.model';


@Component({
  selector: 'app-questionnaire-item',
  templateUrl: './questionnaire-item.component.html',
  styleUrls: ['./questionnaire-item.component.scss'],
})
export class QuestionnaireItemComponent implements OnInit {
  @Input() optionsItem!: Options;
  @Input() usefulItem!: UsefulListItem;
  @Output() quesItemToQues = new EventEmitter<String>();
  // var ipNull = null;
  ip_add = null;
  user!: User;
  resultData!: string;
  testShow!: string;
  questionnaireIdToSend!: number;
  // questionnaireItem!: any;
  questionnaireItem: QuestionnaireItem = new QuestionnaireItem('', '', 0, '', '', 0, [], '');
  oldQuestionnaireItem: QuestionnaireItem = new QuestionnaireItem('', '', 0, '', '', 0, [], '');

  resultItem: Result[] = [];
  questionsArray: QuestionModel[] = [];

  optionsArray: Options[] = [];
  total_questions!: number;
  // title!: string;
  questionnaireI: Quiz = new Quiz(null);
  questionCount = 1;
  ques = '';
  quesIndex = 0;
  options!: any;
  introPage = true;
  resultPage = false;
  submitPage = false;
  choicesArray: any = {};
  choicesArrayGroup: any = [];
  optionType!: string;
  tempNum!: number;
  scoreArray: Options[] = [];
  questionnaireName = '';
  showSlider = false;
  sliderId!: number;
  value = 4;
  nextBtn = false;
  textInput!: string;
  selectedIndex = 100;
  sub!: Subscription;
  showBackground = false;
  registered_user = true;
  showLoading = false;
  textboxOption = false;

  constructor(
    private quizService: QuizService,
    private questionnaireService: QuestionnaireService,
    private extraResourcesService: ExtraResourcesService,
    private activateRoutes: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private element: ElementRef,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    // tslint:disable-next-line:no-non-null-assertion
    if (this.router.getCurrentNavigation() !== null) {
      console.log('not null', this.router.getCurrentNavigation())
      if (this.router.getCurrentNavigation()!.extras.state !== undefined) {
        // tslint:disable-next-line:no-non-null-assertion
        console.log('extras.state', this.router.getCurrentNavigation());
        this.questionnaireItem = this.router.getCurrentNavigation()!.extras.state!.questionnaireData;
        this.oldQuestionnaireItem = JSON.parse(
          <string>window.localStorage.getItem('quesData'));
        if (this.oldQuestionnaireItem) {
          console.log('SAME QUESTIONNAIRE', this.oldQuestionnaireItem.id);
          if (this.oldQuestionnaireItem.id !== this.questionnaireItem.id) {
            this.removeLocalData();
          }
        }

        window.localStorage.setItem('quesData', JSON.stringify(this.questionnaireItem));
        this.initializeData();
      } else {
        this.questionnaireItem = JSON.parse(
          <string>window.localStorage.getItem('quesData')
        );
        // tslint:disable-next-line:radix
        this.quesIndex = parseInt(<string>localStorage.getItem('qIndex'));
        if (this.quesIndex > 1) {
          this.showTestPage();
          this.questionCount = this.quesIndex + 1;
        } else {
          this.quesIndex = 0;
        }
        console.log('local storage', this.questionnaireItem, this.quesIndex );
        this.initializeData();
      }
    }
    // else {
    //   this.initializeData();
    // }
    this.sub = this.route.data.subscribe(
      (v) => (this.registered_user = v.registered_user)
    );
  }

  initializeData() {
    this.user = <User>this.authService.isLoggedIn();
    console.log('initialize data', this.questionnaireItem);
    if (this.questionnaireItem) {
      console.log('IF QUESTIONNAIRE ITEM', this.questionnaireItem);
      this.questionnaireItem.questions.forEach((element: any) => {
        this.questionsArray.push(<QuestionModel>element);
        // console.log('title', this.questionnaireItem.title,  this.questionsArray);

      });
      this.total_questions = this.questionnaireItem.questions.length;
      console.log('QUESTION ARRAY', this.quesIndex);
      this.ques = this.questionsArray[this.quesIndex].question;
      this.choicesArrayGroup = window.localStorage.getItem(CHOICES_GROUP) // this line before the ? is not compulsory to put.
        ? // If any error, try checking with this, or else remove
          JSON.parse(window.localStorage.getItem(CHOICES_GROUP) || '[]')
        : [];
      // tslint:disable-next-line:prefer-const
      let choices: number[] = [];
      if (this.choicesArrayGroup.length > 0) {
        this.choicesArrayGroup.map((c: any) => {
          choices.push(c.option_id);
        });
      }
      for (let i = 0; i < this.questionsArray.length; i++) {
        this.questionsArray[i].options.map((e: Options) => {
          if (choices.length > 0 && choices.includes(e.id)) {
            e.selected = true;
          } else {
            e.selected = false;
          }
        });
      }
      // }
      this.questionsArray[this.quesIndex].options.forEach((e: any) => {
        this.optionsArray.push(<Options>e);
      });
      console.log('initialize data Questionnaire data', this.questionnaireItem);
    } else {
      console.log('no QUESTIONNAIRE ITEM');
      if (this.user) {
        console.log('user', this.resultPage, this.introPage);
        this.router.navigate(['/']);
        // this.router.navigate(['/main/extra-resources']);
      } else {
        console.log('not user');
        this.router.navigate(['questionnaires']);
      }
    }
  }
  ngOnInit() {
    this.getIPAddress();
  }
  ngAfterViewInit() {
    this.questionnaireName = this.questionnaireItem.title;
  }


  ngDoCheck() {
  if (this.questionnaireName === FEAR_QUESTIONNAIRE) {
    this.sliderId = this.optionsArray[this.value].id;
    console.log('slider id', this.sliderId);
  }
  }
  showTestPage() {
    this.introPage = false;
    this.resultPage = false;
    localStorage.setItem('testOngoing', 'yes');
  }

  backArrowClick() {
    this.questionCount -= 1;
    this.quesIndex -= 1;
    // tslint:disable-next-line:max-line-length
    this.ques = this.questionsArray[this.quesIndex].question;
    this.optionsArray = this.questionsArray[this.quesIndex].options;
  }

  forwardArrowClick() {
    console.log('CHOICES ARRAY length', this.choicesArrayGroup.length);
    this.value = 4;
    this.nextBtn = false;
    if (this.questionCount + 1 > this.total_questions) {
      if (this.choicesArrayGroup.length >= this.total_questions) {
        this.submitPage = true;
      }
    } else {
      this.questionCount += 1;
      this.quesIndex += 1;
      localStorage.setItem('qIndex', String(this.quesIndex));
      // localStorage.setItem('options', JSON.stringify(this.optionsArray));

      this.ques = this.questionsArray[this.quesIndex].question; // need to change based on the api
      this.optionsArray = this.questionsArray[this.quesIndex].options;
    }
    this.checkOptionType();
  }

  optionClick(
    quesIdToSend: number,
    quesOrderToSend: number,
    optionIdToSend: number,
    countOfQuestions: number,
    option: Options
  ) {
    this.choicesArray = {};
    this.optionsArray.map((e: Options) => {
      e.selected = false;
    });
    option.selected = true;
    this.choicesArray['question_id'] = quesIdToSend;
    this.choicesArray['question_order'] = quesOrderToSend;
    this.choicesArray['option_id'] = optionIdToSend;
    // this.choicesArray['selectedIndex'] = index;
    // check if this question id already in list
    for (let i = 0 ; i < this.choicesArrayGroup.length; i++ ) {
      if (this.choicesArrayGroup[i].question_id === this.choicesArray['question_id']) {
       this.choicesArrayGroup.splice(i, 1)
        console.log('array', this.choicesArrayGroup[i]);
      }
    }
    this.choicesArrayGroup.push(this.choicesArray);
    window.localStorage.setItem(
      CHOICES_GROUP,
      JSON.stringify(this.choicesArrayGroup)
    );
    console.log('CHOICES ARRAY ON OPTION CLICK', this.choicesArrayGroup);
    if (countOfQuestions <= this.total_questions) {
      this.forwardArrowClick();
    }
  }

  submitTestClick(groupOfChoiceArray: []) {
    this.showLoading = true;
    if (this.user !== undefined) {
      const ipNull = null;
      this.questionnaireService
        .postChoicesGetResults(
          this.questionnaireItem.id,
          this.user.username,
          ipNull,
          this.questionnaireItem.order,
          groupOfChoiceArray
        )
        .subscribe((data: any) => {console.log('Data', data);
          this.submitPage = false;
          this.resultPage = true;
          this.showLoading = false;
          this.questionnaireService.passResultData(data);
          this.extraResourcesService.triggerTodoQuestionnaires();
        });
      this.removeLocalData();
    } else {
      this.questionnaireService
        .postChoicesGetResults(
          this.questionnaireItem.id,
          null,
          this.ip_add,
          this.questionnaireItem.order,
          groupOfChoiceArray
        )
        .subscribe((data: any) => {
          this.submitPage = false;
          this.resultPage = true;
          this.showLoading = false;
          this.questionnaireService.passResultData(data);
          this.extraResourcesService.triggerTodoQuestionnaires();
          this.removeLocalData();
        });
    }
    if (this.showSlider) {
      this.showSlider = false;
    }
  }
  removeLocalData() {
    localStorage.removeItem('qIndex');
    localStorage.removeItem('quesData');
    localStorage.removeItem(CHOICES_GROUP);
    localStorage.removeItem('testOngoing');
    localStorage.removeItem('options');
  }

  getIPAddress() {
    this.http.get('http://api.ipify.org/?format=json').subscribe((res: any) => {
      this.ip_add = res.ip;
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  splitOption(option: any) {
   let substrings = option.split('-');
   return substrings;
  }

  showSliders( quesIdToSend: number,
               quesOrderToSend: number,
               optionIdToSend: number,
               countOfQuestions: number,
                ) {
    this.showSlider = true;
    console.log('id:', quesIdToSend, 'order:', quesOrderToSend, 'option id:', optionIdToSend, 'text input :', this.textInput);
    this.choicesArray = {};
    this.choicesArray['question_id'] = quesIdToSend;
    this.choicesArray['question_order'] = quesOrderToSend;
    this.choicesArray['option_id'] = optionIdToSend;
    this.choicesArray['option_text'] = this.textInput;
    this.choicesArrayGroup.push(this.choicesArray);
    console.log('CHOICES ARRAY', this.choicesArrayGroup);
  }
  onInputChange(event: MatSliderChange) {
    this.nextBtn = true;
  console.log('event', event);
  }

  checkOptionType() {
    if (this.optionsArray.find(option => option.option_type === 'Text')) {
      this.textboxOption = true;
      this.showSlider = false;
    } else if (this.optionsArray.find(option => option.option_type === 'Slider')) {
      this.showSlider = true;
      this.textboxOption = false;
    }
  }
}
