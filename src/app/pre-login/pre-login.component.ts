import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ShowLoginSignupDialogService } from '@/pre-login/shared/show-login-signup-dialog.service';
import { A2HSService } from '@/shared/a2hs.service';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';
import { AuthService } from '@/shared/auth/auth.service';
import {
  LOGGED_IN_PATH,
  DEFAULT_PATH,
  LANDING_RESET_PASSWORD_PATH,
  LOGIN_AFTER_RESET,
} from '@/app.constants';

import { MatLoginDialogComponent } from '@/pre-login/login/mat-login-dialog/mat-login-dialog.component';
import {QuestionnaireService} from "@/shared/questionnaire/questionnaire.service";
import {QuestionnaireItem} from "@/shared/questionnaire/shared/questionnaire.model";

@Component({
  selector: 'app-pre-login',
  templateUrl: './pre-login.component.html',
  styleUrls: ['./pre-login.component.scss'],
  providers: [MatContactUsDialogService],
})
export class PreLoginComponent implements OnInit {
  loggedIn = false;
  url!: string;
  questionnaireItemsPL: QuestionnaireItem[] = [];
  countQuestionnaireItemPL = 0;

  constructor(
    private showLoginSignupDialogService: ShowLoginSignupDialogService,
    private showContactUsService: MatContactUsDialogService,
    private a2hsService: A2HSService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private questionnaireService: QuestionnaireService,
  ) {}

  ngOnInit() {
    const user = this.authService.isLoggedIn();
    if (user && user.is_active) {
      this.router.navigate([LOGGED_IN_PATH]);
    } else {
      this.router.navigate([DEFAULT_PATH]);
    }

    if (this.router.url === LANDING_RESET_PASSWORD_PATH) {
      this.onLoginClicked();
    }

    if (this.router.url === LOGIN_AFTER_RESET) {
      this.onLoginClicked();
    }

    this.questionnaireService
      .getQuestionnaires()
      .subscribe((questionnaire_data: any) => {
        questionnaire_data.results.forEach((element:any) => {
          this.questionnaireItemsPL.push(<QuestionnaireItem>element);
          this.countQuestionnaireItemPL = this.countQuestionnaireItemPL + 1;
          console.log('title', element.title);

        });
      });
  }

  onLoginClicked() {
    this.showLoginSignupDialogService.broadcastLoginClicked(
      MatLoginDialogComponent,
    );
  }

  onContactUsClicked() {
    this.showContactUsService.contactUsClicked();
  }

  onJoinTheStudyClicked() {
    this.showLoginSignupDialogService.joinStudyClicked();
  }

  onPreLoginQuestionnaireShow() {

  }

  onWorkWithUsClicked() {
    const url =
      'https://docs.google.com/forms/d/e/1FAIpQLSfVDBSuxgghsD2SX4VWkOA2AHCotfhkOx0Qbhrci9PRLh-IPg/viewform?usp=send_form';
    window.open(url, '_blank');
  }

  onPrivacyPolicyClick() {
    this.router.navigate(['trial/privacy-policy']);
  }

  onTermsConditions() {
    this.router.navigate(['trial/terms-and-conditions']);
  }

  questionnaireClicked(){
    this.router.navigate(['questionnaireItem/' ]);
  }
}
