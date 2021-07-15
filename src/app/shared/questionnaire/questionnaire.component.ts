import {Component, Input, OnInit} from '@angular/core';
import {QuestionnaireItem} from '@/shared/questionnaire/shared/questionnaire.model';
import {UsefulListItem} from '@/main/extra-resources/shared/usefulList.model';
import {QuestionModel} from "@/shared/questionnaire/shared/question.model";
import {Options} from "@/shared/questionnaire/shared/options.model";

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})

export class QuestionnaireComponent implements OnInit {
  @Input() questionnaireItem!: QuestionnaireItem;
  @Input() usefulListItem!: UsefulListItem;
  @Input() isResult!: string;
  // testOptions: Options = {id: 1, order: 1, option_text: 'yes', option_type: 'radio', score: '0'};
  // testQuestion: QuestionModel = {id: 1, question: 'WHat is your name?', order: 1, level: 1, option: this.testOptions};
  // testQ:QuestionnaireItem = {title: 'phq', subtitle: 'THis is for depression', id: 1, order: 1, category: 'Mood disorder', instructions: 'please read the questions carefully before answering',
  // question: this.testQuestion};

  constructor() {
  }

  ngOnInit() {
    console.log('title', this.questionnaireItem);
  }


}


