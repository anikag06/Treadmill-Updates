import {Component, Input, OnInit} from '@angular/core';
import {QuestionnaireItem} from '@/shared/questionnaire/shared/questionnaire.model';
import {UsefulListItem} from '@/main/extra-resources/shared/usefulList.model';
import {QuizService} from '@/shared/questionnaire-deprecated/questionnaire-deprecated.service';
import {environment} from '../../../../environments/environment';
import {GET_PHQ_QUESTIONS} from '@/app.constants';
import {Quiz} from '@/shared/questionnaire-deprecated/input/quiz';
import {element} from 'protractor';
import {Options} from '@/shared/questionnaire/shared/options.model';

@Component({
  selector: 'app-questionnaire-item',
  templateUrl: './questionnaire-item.component.html',
  styleUrls: ['./questionnaire-item.component.scss'],
})

export class QuestionnaireItemComponent implements OnInit {
  @Input() questionnaireItem!: QuestionnaireItem; // questionnaire model
  @Input() optionsItem!: Options;
  @Input() usefulItem!: UsefulListItem;
  total_questions!: number;
  title!: string;
  questionnaireI: Quiz = new Quiz(null); // need to change the data type once the api is made to questionnaire model
  questionCount = 1;
  ques!: string;
  quesIndex = 0;
  options!: any;
  introPage = true;
  optionType!: string;
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
  ) {
  }

  ngOnInit() {
    this.quizService.get(environment.API_ENDPOINT + GET_PHQ_QUESTIONS).subscribe((res: any) => {
      this.questionnaireI = new Quiz(res);
      this.total_questions = this.questionnaireI.count;
      this.ques = this.questionnaireI.questions[0].name;
      this.options = this.questionnaireI.questions[0].id;
      this.optionType = this.tempOptionsScore[0].tempOptionType;
      console.log(this.total_questions);
      console.log(this.options);
      console.log(this.tempOptionsScore[0].options[0].score );
       this.tempOptionsScore[0].options.forEach((data: any) => {
         this.scoreArray.push(data.name);
        console.log('data', data.id, this.scoreArray);
       });
    });
  }
  showTestPage() {
    this.introPage = false;
  }

  backArrowClick() {
    this.questionCount -= 1;
    this.quesIndex -= 1;
    this.ques = this.questionnaireI.questions[this.quesIndex].name;
    this.optionType = this.tempOptionsScore[this.quesIndex].tempOptionType;
  }

  forwardArrowClick() {
    this.questionCount += 1;
    this.quesIndex += 1;
    this.ques = this.questionnaireI.questions[this.quesIndex].name;
    this.optionType = this.tempOptionsScore[this.quesIndex].tempOptionType;
  }

  optionClick(id: number) {
    console.log('clicked', id);
  }
}
