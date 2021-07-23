import {Component, OnInit} from "@angular/core";
import {QuestionnaireService} from "@/shared/questionnaire/questionnaire.service";
import {QuestionnaireItem} from "@/shared/questionnaire/shared/questionnaire.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-questionnaire-container',
  templateUrl: './questionnaire-container.component.html',
  styleUrls: ['./questionnaire-container.component.scss'],
})

export class QuestionnaireContainerComponent implements OnInit{
  questionnaireItems: QuestionnaireItem[] = [];
  countQuestionnaireItem = 0;
  constructor(
    private questionnaireService: QuestionnaireService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.questionnaireService
      .getQuestionnaires()
      .subscribe((questionnaire_data: any) => {
        questionnaire_data.results.forEach((element:any) => {
          this.questionnaireItems.push(<QuestionnaireItem>element);
          this.countQuestionnaireItem = this.countQuestionnaireItem + 1;
          console.log('title', element);

        });
      });
  }
  questionnaireItemClick(questionnaireItemBeingClicked: QuestionnaireItem) {
    this.router.navigate(['questionnaireItem/', questionnaireItemBeingClicked.id], {
      relativeTo: this.route,
      state: { questionnaireData: questionnaireItemBeingClicked },
    });

    // this.extraResourcesService.questionnaireItemClickBehavior.next(
    //   questionnaireItemBeingClicked,
    // );
    // console.log('data click', questionnaireItemBeingClicked);
    // this.extraResourcesService.sendQuestionnaireItem.emit(questionnaireItemBeingClicked);

  }
}
