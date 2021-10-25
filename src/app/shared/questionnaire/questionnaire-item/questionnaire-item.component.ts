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
  questionnaireItem!: any;
  resultItem: Result[] = [];
  questionsArray: QuestionModel[] = [];
  optionsArray: Options[] = [];
  total_questions!: number;
  // title!: string;
  questionnaireI: Quiz = new Quiz(null); // need to change the data type once the api is made to questionnaire model
  questionCount = 1;
  ques!: string;
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
    if (this.router.getCurrentNavigation()!.extras.state !== undefined) {
      // tslint:disable-next-line:no-non-null-assertion
      this.questionnaireItem = this.router.getCurrentNavigation()!.extras.state!.questionnaireData;
      localStorage.setItem('quesData', JSON.stringify(this.questionnaireItem));
    } else {
      this.questionnaireItem = JSON.parse(
        <string>localStorage.getItem('quesData')
      );
      // tslint:disable-next-line:radix
      this.quesIndex = parseInt(<string>localStorage.getItem('qIndex'));
      if (this.quesIndex > 1) {
        this.showTestPage();
        this.questionCount = this.quesIndex + 1;
      }
    }
    this.initializeData();
  }

  initializeData() {
    this.user = <User>this.authService.isLoggedIn();
    if (this.questionnaireItem) {
      this.questionnaireItem.questions.forEach((element: any) => {
        this.questionsArray.push(<QuestionModel>element);
      });
      this.total_questions = this.questionnaireItem.questions.length;
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
    } else {
      if (this.user) {
        this.router.navigate(['/main/extra-resources']);
      } else {
        this.router.navigate(['questionnaires']);
      }
    }
  }
  ngOnInit() {
    this.getIPAddress();
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
    this.ques = this.questionsArray[this.quesIndex].question; // need to change based on the api // can make quesIndex as quesCount because the id might differ, but that wont be equal to the position in the array

    this.optionsArray = this.questionsArray[this.quesIndex].options;
  }

  forwardArrowClick() {
    this.value = 4;
    this.nextBtn = false;
    if (this.questionCount + 1 > this.total_questions) {
      this.submitPage = true;
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
    this.choicesArray['question_id'] = quesIdToSend; // how will the option id be called?
    this.choicesArray['question_order'] = quesOrderToSend; //how will the order for the questionnaire be called?
    this.choicesArray['option_id'] = optionIdToSend; // how will question id be called?
    // this.choicesArray['selectedIndex'] = index;
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
        .subscribe((data: any) => {
          this.submitPage = false;
          this.resultPage = true;
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
