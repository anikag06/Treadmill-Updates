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
  constructor(
    private quesService: QuestionnaireService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
  }

  resultEachCardClick() {
    this.showEachResultCardOnClick = !this.showEachResultCardOnClick;
  }
}
