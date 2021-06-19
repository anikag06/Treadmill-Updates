import {Component, Input, OnInit} from '@angular/core';
import {QuestionnaireItem} from '@/shared/questionnaire/shared/questionnaire.model';
import {UsefulListItem} from '@/main/extra-resources/shared/usefulList.model';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})

export class QuestionnaireComponent implements OnInit {
  @Input() questionnaireItem!: QuestionnaireItem;
  @Input() usefulListItem!: UsefulListItem;

  constructor() {
  }

  ngOnInit() {
    console.log('title', this.questionnaireItem.title);
  }
}


