import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuestionnaireItem } from '@/shared/questionnaire/shared/questionnaire.model';
import { UsefulListItem } from '@/main/extra-resources/shared/usefulList.model';
import { QuizService } from '@/shared/questionnaire-deprecated/questionnaire-deprecated.service';
import { environment } from '../../../../environments/environment';
import { CHOICES_GROUP, GET_PHQ_QUESTIONS } from '@/app.constants';
import { Quiz } from '@/shared/questionnaire-deprecated/input/quiz';
import { element } from 'protractor';
import { Options } from '@/shared/questionnaire/shared/options.model';
import { QuestionnaireService } from '@/shared/questionnaire/questionnaire.service';
import { Result } from '@/shared/questionnaire/shared/result.model';
import { ExtraResourcesService } from '@/main/extra-resources/extra-resources.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuestionModel } from '@/shared/questionnaire/shared/question.model';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';

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
  questionnaireItem!: QuestionnaireItem;
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
  tempOptions = ['never', 'rarely', 'sometimes']; // temporary for coding purpose, once api is made, this will be removed
  scoreArray: Options[] = [];
  questionnaireName = '';

  constructor(
    private quizService: QuizService,
    private questionnaireService: QuestionnaireService,
    private extraResourcesService: ExtraResourcesService,
    private activateRoutes: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // tslint:disable-next-line:no-non-null-assertion
    if (this.router.getCurrentNavigation()!.extras.state !== undefined) {
      // tslint:disable-next-line:no-non-null-assertion
      this.questionnaireItem = this.router.getCurrentNavigation()!.extras.state!.questionnaireData;
    } else {
      this.router.navigate(['/main/extra-resources']).then((r) => {});
    }
  }

  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
    this.questionnaireItem.questions.forEach((element: any) => {
      this.questionsArray.push(<QuestionModel>element);
    });
    this.total_questions = this.questionnaireItem.questions.length;
    this.ques = this.questionsArray[0].question;
    this.questionsArray[this.quesIndex].options.forEach((e: any) => {
      this.optionsArray.push(<Options>e);
    });

    this.choicesArrayGroup = window.localStorage.getItem(CHOICES_GROUP) // this line before the ? is not compulsory to put. If any error, try checking with this, or else remove
      ? JSON.parse(window.localStorage.getItem(CHOICES_GROUP) || '[]')
      : [];
  }
  showTestPage() {
    this.introPage = false;
    this.resultPage = false;
  }

  backArrowClick() {
    this.questionCount -= 1;
    this.quesIndex -= 1;
    this.ques = this.questionsArray[this.quesIndex].question; // need to change based on the api // can make quesIndex as quesCount because the id might differ, but that wont be equal to the position in the array

    this.optionsArray = this.questionsArray[this.quesIndex].options;
  }

  forwardArrowClick() {
    if (this.questionCount + 1 > this.total_questions) {
      this.submitPage = true;
    } else {
      this.questionCount += 1;
      this.quesIndex += 1;
      this.ques = this.questionsArray[this.quesIndex].question; // need to change based on the api
      this.optionsArray = this.questionsArray[this.quesIndex].options;
    }
  }

  optionClick(
    quesIdToSend: number,
    quesOrderToSend: number,
    optionIdToSend: number,
    countOfQuestions: number
  ) {
    this.choicesArray = {};
    this.choicesArray['question_id'] = quesIdToSend; // how will the option id be called?
    this.choicesArray['question_order'] = quesOrderToSend; //how will the order for the questionnaire be called?
    this.choicesArray['option_id'] = optionIdToSend; // how will question id be called?
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
        });
    }

    // send the array of scores stored at ls to choice api
    // maybe have to create a separate function to send text
    //this.submitPage = false;
    //this.resultPage = true;
    //this.questionnaireService.postChoicesGetResults(array to send)
    // .subscribe((data) => {
    // data.data.forEach((element: any) => {
    // this.resultItem.push(<Result>element);
    // )
  }
}
