import {Component, Input, OnInit} from '@angular/core';
import {QuestionnaireItem} from '@/shared/questionnaire/shared/questionnaire.model';
import {UsefulListItem} from '@/main/extra-resources/shared/usefulList.model';
import {QuestionModel} from '@/shared/questionnaire/shared/question.model';
import {Options} from '@/shared/questionnaire/shared/options.model';
import {BehaviorSubject} from 'rxjs';
import {QuestionnaireService} from '@/shared/questionnaire/questionnaire.service';
import {User} from '@/shared/user.model';
import {AuthService} from '@/shared/auth/auth.service';

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

  @Input() isResult!: string;
  user!: User;
  showEachResultCardOnClick = false;
  showResultComponent = false;
  resultsArray = <any>[];
  // testOptions: Options = {id: 1, order: 1, option_text: 'yes', option_type: 'radio', score: '0'};
  // testQuestion: QuestionModel = {id: 1, question: 'WHat is your name?', order: 1, level: 1, option: this.testOptions};
  // testQ:QuestionnaireItem = {title: 'phq', subtitle: 'THis is for depression', id: 1, order: 1, category: 'Mood disorder', instructions: 'please read the questions carefully before answering',
  // question: this.testQuestion};



  constructor(
    private quesService: QuestionnaireService,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
    console.log('title', this.questionnaireResult);
    console.log('ref', this.questionnaireRefList);
    console.log(this.questionnaireItem);


    // console.log('title', this.questionnaireItem);
    // this.quesService
    //   .getResultHistory(this.user.username)
    //   .subscribe((data: any) => {
    //     console.log('history data', data);
    //     console.log('history data response', data.response.results);
    //     // this.resultsArray.push(data.response.results[]);
    //      data.response.results.forEach((element: any) => {
    //        // this.resultsArray.push(<any>element);
    //     //   console.log('testArray', this.testArray);
    //      });
    //   });
  }

  // viewResultClick(){
  //   console.log('view result clicked');
  //   this.showResultComponent = !this.showResultComponent;
  // }
  toArray(user_result: any) {
    return Object.keys(user_result).map(key => user_result[key]);
  }

  resultEachCardClick() {
    this.showEachResultCardOnClick = !this.showEachResultCardOnClick;

  }


}


