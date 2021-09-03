import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionnaireItem} from '@/shared/questionnaire/shared/questionnaire.model';
import {UsefulListItem} from '@/main/extra-resources/shared/usefulList.model';
import {QuizService} from '@/shared/questionnaire-deprecated/questionnaire-deprecated.service';
import {environment} from '../../../../environments/environment';
import {CHOICES_GROUP, GET_PHQ_QUESTIONS} from '@/app.constants';
import {Quiz} from '@/shared/questionnaire-deprecated/input/quiz';
import {element} from 'protractor';
import {Options} from '@/shared/questionnaire/shared/options.model';
import {QuestionnaireService} from "@/shared/questionnaire/questionnaire.service";
import {Result} from "@/shared/questionnaire/shared/result.model";
import {ExtraResourcesService} from "@/main/extra-resources/extra-resources.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {QuestionModel} from "@/shared/questionnaire/shared/question.model";
import {AuthService} from "@/shared/auth/auth.service";
import {User} from "@/shared/user.model";

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
  tempOptionsScore = [{
    id: 1,
    tempOptionType: 'radio',
    questions: 'how are you',
    options: [{
      id: 1,
      name: 'never',
      score: 0,
    },
      {
        id: 2,
        name: 'rarely',
        score: 1,
      },
      {
        id: 3,
        name: 'sometimes',
        score: 2,
      },
      {
        id: 4,
        name: 'Always',
        score: 3,
      }],
  },
    {
      id: 2,
      questions: 'what is it?',
      tempOptionType: 'slider',
      options: [{
        id: 1,
        name: 'never',
        score: 0,
      },
        {
          id: 2,
          name: 'rarely',
          score: 1,
        },
        {
          id: 3,
          name: 'always',
          score: 2, }
        ]
    }
  ];
  scoreArray: Options[] = [];



  constructor(
    private quizService: QuizService,
    private questionnaireService: QuestionnaireService,
    private extraResourcesService: ExtraResourcesService,
    private activateRoutes: ActivatedRoute,
    private router: Router,
    private authService: AuthService,


  )
  // {
  //   // tslint:disable-next-line:no-non-null-assertion
  //   this.questionnaireItem = this.router.getCurrentNavigation()!.extras.state!.questionnaireData;
  // }
  {if (this.router.getCurrentNavigation()!.extras.state !== undefined) {
  // tslint:disable-next-line:no-non-null-assertion
  this.questionnaireItem = this.router.getCurrentNavigation()!.extras.state!.questionnaireData;
} else {
  this.router.navigate(['/main/extra-resources']).then((r) => {});
}}

  ngOnInit() {
     this.user = <User>this.authService.isLoggedIn();
    console.log('questionnaire new', this.questionnaireItem);
     this.questionnaireItem.questions.forEach((element: any) => {
       this.questionsArray.push(<QuestionModel>element);

      console.log('questions', element);


     })
     this.total_questions = this.questionnaireItem.questions.length;
     this.ques = this.questionsArray[0].question;
     console.log('length', this.questionsArray[0].options);
     this.questionsArray[this.quesIndex].options.forEach((e: any) => {
       this.optionsArray.push(<Options>e);
       console.log('options array', e.option_text);
     });


    this.choicesArrayGroup = window.localStorage.getItem(CHOICES_GROUP) ? // this line before the ? is not compulsory to put. If any error, try checking with this, or else remove
      JSON.parse(window.localStorage.getItem(CHOICES_GROUP) || '[]') : [];
    console.log('choices array group at start', this.choicesArrayGroup);
    // this.activateRoutes.params.subscribe(data => {
    //   this.questionnaireIdToSend = data.id;
    // });
    // this.questionnaireService.getAQuestionnaire(this.questionnaireIdToSend).subscribe(data => {
    //   this.questionnaireItem = <QuestionnaireItem>data;
    //     // data.forEach((element:any) => {
    //     //   this.questionsArray.push(<Question>element);
    //     //   });
    //    // console.log('questionsArray', this.questionsArray);
    //     console.log('from url', this.questionnaireItem);
    // });
    //
    // // this.extraResourcesService.sendQuestionnaireItem.subscribe((data: any) => {
    // //   this.qItem = <QuestionnaireItem>data;
    // //   this.testShow = this.qItem.title;
    // //
    // //   console.log('data1', this.testShow);
    // //   console.log('instr', this.qItem.instructions);
    // //   console.log('title', this.qItem);
    // // });
    // console.log('show item', this.questionnaireItem);
    // this.questionnaireService
    //   .getQuestionnaires()
    //   .subscribe((questionnaire_data: any) => {
    //     questionnaire_data.results.forEach((element: any) => {  //looping through all details of questionnaire
    //       element.questions.forEach((e: any) => {               //looping through questions
    //         this.questionsArray.push(<Question>e);
    //         console.log('each question looping', e);
    //       })
    //       console.log('question array', this.questionsArray);
    //       this.total_questions = element.questions.length;
    //       console.log('total questions in the array', this.tempNum);
    //     });
    //     this.ques = this.questionsArray[0].name;
    //
    //     console.log('total questions', this.questionsArray[0].name);
    //   } );


    // this.quizService.get(environment.API_ENDPOINT + GET_PHQ_QUESTIONS).subscribe((res: any) => {
    //   this.questionnaireI = new Quiz(res);
    //   this.total_questions = this.questionnaireI.count;
    //   this.ques = this.questionnaireI.questions[0].name;
    //   this.options = this.questionnaireI.questions[0].id;
    //   this.optionType = this.tempOptionsScore[0].tempOptionType;
    //   console.log(this.total_questions);
    //   console.log(this.options);
    //   console.log(this.tempOptionsScore[0].options[0].score );
    //    this.tempOptionsScore[0].options.forEach((data: any) => {
    //      this.scoreArray.push(data.name);
    //     console.log('data', data.id, this.scoreArray);
    //    });
    // });
    // this.questionnaireI.push(<QuestionnaireModel>data)
    // this.eachQuestionItem.push(<Question>this.questionnaireI.questions)
    // this.quesIndex = this.

  }
  showTestPage() {
    this.introPage = false;
    this.resultPage = false;
  }

  backArrowClick() {
    this.questionCount -= 1;
    this.quesIndex -= 1;
    this.ques = this.questionsArray[this.quesIndex].question; // need to change based on the api // can make quesIndex as quesCount because the id might differ, but that wont be equal to the position in the array
    // this.optionType = this.tempOptionsScore[this.quesIndex].tempOptionType; // need to change based on the api
    //accessing options: this.questionnaireI.ques[this.quesCount].options[this.ID].option_text;
    // this.quesId = this.questionnaireI[this.quesCount].id;
    //this.quesOrder = this.questionnaireI[this.quesCount].order;
    this.optionsArray = this.questionsArray[this.quesIndex].options;
  }

  forwardArrowClick() {
    // not sure if this will work
    if(this.questionCount+1 > this.total_questions) {
      this.submitPage = true;
    }

    this.questionCount += 1;
    this.quesIndex += 1;
    this.ques = this.questionsArray[this.quesIndex].question; // need to change based on the api
    //this.optionType = this.tempOptionsScore[this.quesIndex].tempOptionType; // need to change based on the api
    this.optionsArray = this.questionsArray[this.quesIndex].options;
    console.log('forward option', this.optionsArray);

  }

  optionClick(quesIdToSend: number, quesOrderToSend: number, optionIdToSend: number, countOfQuestions: number) {
    console.log('clicked', quesIdToSend);
    console.log('count of questions on option click', countOfQuestions);
    this.choicesArray = {};
     this.choicesArray["question_id"] = quesIdToSend; // how will the option id be called?
     this.choicesArray["question_order"] = quesOrderToSend; //how will the order for the questionnaire be called?
     this.choicesArray["option_id"] = optionIdToSend; // how will question id be called?
     this.choicesArrayGroup[countOfQuestions - 1] = this.choicesArray;
     console.log('choices group array after option click', this.choicesArrayGroup);
    window.localStorage.setItem(CHOICES_GROUP, JSON.stringify(this.choicesArrayGroup));

    if(countOfQuestions <= this.total_questions) {
      this.forwardArrowClick();
    }
  }

  submitTestClick(groupOfChoiceArray: []) {
    console.log('result page submit');
    //console.log('choice array group after submitting', groupOfChoiceArray);
    //console.log('username', this.user.username, 'id', this.questionnaireItem.id, 'order', this.questionnaireItem.order );
    // this.resultData = 'result';

    if(this.user.username !== 'null') {
      const ipNull = null;
      console.log('result page submit');
      this.questionnaireService.postChoicesGetResults(this.questionnaireItem.id, this.user.username, ipNull, this.questionnaireItem.order, groupOfChoiceArray)
        .subscribe((data: any) => {
          console.log('after submit data', data);
          this.submitPage = false;
          this.resultPage = true;
          this.questionnaireService.passResultData(data);
        });
    } else {
      console.log('result page submit');
      this.questionnaireService
        .postChoicesGetResults(this.questionnaireItem.id, this.user.username, this.ip_add, this.questionnaireItem.order, groupOfChoiceArray)
        .subscribe((data: any) => {
          console.log('after submit data');
          this.submitPage = false;
          this.resultPage = true;
          this.questionnaireService.passResultData(data);
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
