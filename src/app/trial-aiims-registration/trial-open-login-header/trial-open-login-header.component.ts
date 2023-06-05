import {Component, HostListener, OnInit} from '@angular/core';
import {
  LEARN_GROUP_REGISTRATION_PATH,
  LIFE_GROUP_REGISTRATION_PATH,
  OPEN_REGISTRATION_PATH, STUDENT_GROUP_REGISTRATION_PATH,
  WORK_GROUP_REGISTRATION_PATH
} from '@/app.constants';
import {MatLoginDialogComponent} from '@/pre-login/login/mat-login-dialog/mat-login-dialog.component';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {TrialAuthService} from '@/trial-registration/shared/trial-auth.service';
import {MatContactUsDialogService} from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';
import {TrialAiimsRegistrationService} from '@/trial-aiims-registration/trial-aiims-registration.service';
import {QuizService} from '@/shared/questionnaire-deprecated/questionnaire-deprecated.service';
import {A2HSService} from '@/shared/a2hs.service';
import {ShowLoginSignupDialogService} from '@/pre-login/shared/show-login-signup-dialog.service';
import {QuestionnaireContainerService} from '@/shared/questionnaire-container/questionnaire-container.service';

@Component({
  selector: 'app-trial-open-login-header',
  templateUrl: './trial-open-login-header.component.html',
  styleUrls: ['./trial-open-login-header.component.scss']
})
export class TrialOpenLoginHeaderComponent implements OnInit {
  showRegistrationContent!: boolean;
   touchDevice!: boolean;
  urlLink!: string;


  @HostListener('touchstart')
  onTouchEvent() {
    this.touchDevice = true;
  }

  constructor(
    private router: Router,
    private authService: TrialAuthService,
    private showContactUsService: MatContactUsDialogService,
    private aiimsRegistrationDataService: TrialAiimsRegistrationService,
    private questionnaireService: QuizService,
    private a2hsService: A2HSService,
    private showLoginSignupDialogService: ShowLoginSignupDialogService,
    private questionnaireContainerService: QuestionnaireContainerService,
  ) {}

  ngOnInit() {
    // this.a2hsService.setDeferredPrompt();
    if (this.router.url.includes('open')) {
      this.urlLink = 'open';
    } else  if (this.router.url.includes('learn')) {
      this.urlLink = 'learn';
    } else  if (this.router.url.includes('student')) {
      this.urlLink = 'student';
    } else  if (this.router.url.includes('work')) {
      this.urlLink = 'work';
    } else  if (this.router.url.includes('life')) {
      this.urlLink = 'life';
    }
    this.questionnaireContainerService.loadingPath = '/' + this.urlLink;
    const smallDevice = window.matchMedia('(max-width: 767px)').matches;
    if (smallDevice) {
      this.showRegistrationContent = true;
    }
  }

  // onLogoClick() {
  //   this.router.navigate([LEARN_GROUP_REGISTRATION_PATH]);
  // }
  onLoginClicked() {
    this.showLoginSignupDialogService.broadcastLoginClicked(
      MatLoginDialogComponent
    );
  }
  questionnaireClicked() {
    this.router.navigate(['questionnaires']);
  }
  onPrivacyPolicyClick() {
    this.router.navigate(['open/r/info'],
      {queryParams: {
          type: 'pp'}
      });
  }

  onTermsConditions() {
    this.router.navigate(['open/r/info'],
      {queryParams: {
          type: 'tc'}
      });
  }

}
