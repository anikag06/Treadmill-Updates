import { Component, Input, OnInit } from '@angular/core';
import { QuestionnaireItem } from '@/shared/questionnaire/shared/questionnaire.model';
import { UsefulListItem } from '@/main/extra-resources/shared/usefulList.model';
import { QuestionnaireService } from '@/shared/questionnaire/questionnaire.service';
import { User } from '@/shared/user.model';
import { AuthService } from '@/shared/auth/auth.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {
  @Input() questionnaireItem!: QuestionnaireItem;
  @Input() usefulListItem!: UsefulListItem;
  @Input() isResult!: string;
  user!: User;
  showResultComponent = false;
  resultsArray = [];
  constructor(
    private quesService: QuestionnaireService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
    this.quesService
      .getResultHistory(this.user.username)
      .subscribe((data: any) => {
        data.response.results.forEach((element: any) => {});
      });
  }

  viewResultClick() {
    this.showResultComponent = !this.showResultComponent;
  }
}
