import { Component, OnInit } from '@angular/core';
import { MatLoginDialogComponent } from '@/pre-login/login/mat-login-dialog/mat-login-dialog.component';
import { ShowLoginSignupDialogService } from '@/pre-login/shared/show-login-signup-dialog.service';
import {NavigationEnd, Router, RouterState, RouterStateSnapshot, RoutesRecognized} from '@angular/router';
import {filter, pairwise} from 'rxjs/operators';
import {QuestionnaireContainerService} from '@/shared/questionnaire-container/questionnaire-container.service';

@Component({
  selector: 'app-custom-nav',
  templateUrl: './custom-nav.component.html',
  styleUrls: ['./custom-nav.component.scss'],
})
export class CustomNavComponent implements OnInit {


  path!: string;
  constructor(
    private showLoginSignupDialogService: ShowLoginSignupDialogService,
    private router: Router,
    private questionnaireContainerService: QuestionnaireContainerService

  ) { }


  ngOnInit() {
    this.path = this.questionnaireContainerService.loadingPath;
    if (!this.path) {
      this.path = '/landing';
    }
  }

  onLoginClicked() {
    this.showLoginSignupDialogService.broadcastLoginClicked(
      MatLoginDialogComponent
    );
  }
}
