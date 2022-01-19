import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { QuestionnaireService } from '@/shared/questionnaire/questionnaire.service';
import { QuestionnaireItem } from '@/shared/questionnaire/shared/questionnaire.model';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionnaireContainerService } from '@/shared/questionnaire-container/questionnaire-container.service';
import { Subscription } from 'rxjs';
import {CATEGORY_LIST} from '@/app.constants';

@Component({
  selector: 'app-questionnaire-container',
  templateUrl: './questionnaire-container.component.html',
  styleUrls: ['./questionnaire-container.component.scss'],
})
export class QuestionnaireContainerComponent implements OnInit {
  questionnaireItems: QuestionnaireItem[] = [];
  countQuestionnaireItem = 0;
  loggedIn = false;
  sub!: Subscription;
  loaded = false;
  registered_user = true;
  categoryList = CATEGORY_LIST;
  @Output() questionnaireItemClicked = new EventEmitter();
  constructor(
    private questionnaireService: QuestionnaireService,
    private router: Router,
    private route: ActivatedRoute,
    private questionnaireContainerService: QuestionnaireContainerService
  ) {}

  ngOnInit() {
    this.questionnaireService
      .getQuestionnaires()
      .subscribe((questionnaire_data: any) => {
        questionnaire_data.results.forEach((element: any) => {
          if (element.level !== 2) {
            this.questionnaireItems.push(<QuestionnaireItem>element);
            this.countQuestionnaireItem = this.countQuestionnaireItem + 1;
          }
        });
      });

    this.sub = this.route.data.subscribe(
      (v) => (this.registered_user = v.registered_user)
    );
  }
  questionnaireItemClick(questionnaireItemBeingClicked: QuestionnaireItem) {
    if (!this.registered_user) {
    this.router.navigate(
      ['questionnaireItem/', questionnaireItemBeingClicked.id],
      {
        // relativeTo: this.route,
        state: { questionnaireData: questionnaireItemBeingClicked },
      }
    );
    } else {
      this.questionnaireItemClicked.emit(questionnaireItemBeingClicked);
    }

    this.questionnaireContainerService.questionnaireItemClickBehavior.next(
      questionnaireItemBeingClicked
    );
    console.log('data click', questionnaireItemBeingClicked);
    this.questionnaireContainerService.sendQuestionnaireItem.emit(
      questionnaireItemBeingClicked
    );
  }

  removeLoading() {
    this.loaded = true;
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
