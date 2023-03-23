import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Input() isList!: string;
  @Input() isResult!: string;
  @Output() removeLoading = new EventEmitter();
  user!: User;
  showEachResultCardOnClick = false;
  showResultComponent = false;
  resultsArray = <any>[];

  constructor(
    private quesService: QuestionnaireService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
  }

  resultEachCardClick() {
    this.showEachResultCardOnClick = !this.showEachResultCardOnClick;
  }
  getBackgroundColor(category: string) {
    if (category === 'Anxiety problems') {
      return '#DFB264';
    } else if (category === 'Mood problems') {
      return '#90AAF2';
    } else if (category === 'Eating probelms') {
      return '#C091CB';
    } else if (category === 'Substance abuse problems') {
      return '#FFA3A3';
    } else if (category === 'General mental health problems') {
      return '#73C0D8';
    } else if (category === 'Sleep problems') {
      return '#D89E74';
    }
  }
  imageLoaded () {
    this.removeLoading.emit();
  }

}

