import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { QuestionnaireItem } from '@/shared/questionnaire/shared/questionnaire.model';
import { UsefulListItem } from '@/main/extra-resources/shared/usefulList.model';
import { QuizService } from '@/shared/questionnaire-deprecated/questionnaire-deprecated.service';
import { CHOICES_GROUP } from '@/app.constants';
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


@Component({
  selector: 'app-questionnaire-item',
  templateUrl: './questionnaire-item.component.html',
  styleUrls: ['./questionnaire-item.component.scss'],
})
export class QuestionnaireItemComponent implements OnInit {
  // @Input() questionnaireItem!: QuestionnaireItem; // questionnaire model
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
  value = 0;
  textInput!: string;
  selectedIndex = 100;

  constructor(
    private quizService: QuizService,
    private questionnaireService: QuestionnaireService,
    private extraResourcesService: ExtraResourcesService,
    private activateRoutes: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private element: ElementRef
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
        // this.ques = this.questionsArray[this.quesIndex].question; // need to change based on the api
        // this.optionsArray = this.questionsArray[this.quesIndex].options;
      }
    }
    this.initializeData();
  }

  initializeData() {
    this.user = <User>this.authService.isLoggedIn();
    this.questionnaireItem.questions.forEach((element: any) => {
      this.questionsArray.push(<QuestionModel>element);
    });
    this.total_questions = this.questionnaireItem.questions.length;
    this.ques = this.questionsArray[this.quesIndex].question;
    this.questionsArray[this.quesIndex].options.forEach((e: any) => {
      this.optionsArray.push(<Options>e);
    });
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

    // if (
    //   localStorage.getItem('testOngoing') !== undefined &&
    //   localStorage.getItem('testOngoing') === 'yes'
    // ) {
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
  }
  ngOnInit() {
  }

  ngDoCheck() {
    this.sliderId = this.optionsArray[this.value].id;
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
    this.value = 0;
    if (this.questionCount + 1 > this.total_questions) {
      this.submitPage = true;
    } else {
      this.questionCount += 1;
      this.quesIndex += 1;
      localStorage.setItem('qIndex', String(this.quesIndex));
      // localStorage.setItem('options', JSON.stringify(this.optionsArray));

      this.ques = this.questionsArray[this.quesIndex].question; // need to change based on the api
      this.optionsArray = this.questionsArray[this.quesIndex].options;
      if (this.optionsArray.find(option => option.option_type === 'Text')) {
        // this.sliderId = this.optionsArray[this.value].id
        this.showSlider = false;
        console.log('TEXTBOX VISBLE');
      } else {
        this.showSlider = true;
        console.log('SLIDER VISBLE');
      }
    }
  }

  optionClick(
    quesIdToSend: number,
    quesOrderToSend: number,
    optionIdToSend: number,
    countOfQuestions: number,
    option: Options
  ) {
    console.log('id', this.sliderId);
    console.log('id:', quesIdToSend, 'order:', quesOrderToSend, 'option id:', optionIdToSend);
    this.choicesArray = {};
    this.optionsArray.map((e: Options) => {
      e.selected = false;
    });
    option.selected = true;
    this.choicesArray['question_id'] = quesIdToSend; // how will the option id be called?
    this.choicesArray['question_order'] = quesOrderToSend; //how will the order for the questionnaire be called?
    this.choicesArray['option_id'] = optionIdToSend; // how will question id be called?
    // this.choicesArray['selectedIndex'] = index;
    this.choicesArrayGroup[countOfQuestions - 1] = this.choicesArray;
    window.localStorage.setItem(
      CHOICES_GROUP,
      JSON.stringify(this.choicesArrayGroup)
    );

    if (countOfQuestions <= this.total_questions) {
      this.forwardArrowClick();
    }
  }

  submitTestClick(groupOfChoiceArray: []) {
    if (this.user.username !== null) {
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
          this.user.username,
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
  }
  removeLocalData() {
    localStorage.removeItem('qIndex');
    localStorage.removeItem('quesData');
    localStorage.removeItem(CHOICES_GROUP);
    localStorage.removeItem('testOngoing');
    localStorage.removeItem('options');
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
    this.choicesArray['text_input'] = this.textInput;
  }
  onInputChange(event: MatSliderChange) {
  console.log('event', event);
  }
}
