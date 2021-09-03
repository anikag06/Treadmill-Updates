import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {QuestionnaireItem} from '@/shared/questionnaire/shared/questionnaire.model';


@Injectable({
  providedIn: 'root',
})
export class QuestionnaireContainerService{
  sendQuestionnaireItem =  new EventEmitter<any>();
  questionnaireItemInPage!: QuestionnaireItem;
  questionnaireItemClickBehavior: BehaviorSubject<
    QuestionnaireItem
    > = new BehaviorSubject<QuestionnaireItem>(this.questionnaireItemInPage);
  questionnaireItemClickedEvent = this.questionnaireItemClickBehavior.asObservable();
  constructor() {
  }
}
