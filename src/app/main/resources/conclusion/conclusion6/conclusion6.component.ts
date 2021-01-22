import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  COMMITMENT_OPTIONS,
  COMPLETED,
  CONCLUSION_SCORE,
  LOCKED,
  LOGGED_IN_PATH,
  TREADWILL,
} from '@/app.constants';
import { Subscription } from 'rxjs';
import { StepCompleteData } from '@/main/resources/shared/completion-data.model';
import { ConclusionService } from '@/main/resources/conclusion/conclusion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { CommonDialogsService } from '@/main/resources/shared/common-dialogs.service';
import { QuizService } from '@/shared/questionnaire/questionnaire.service';
import { FlowService } from '@/main/flow/flow.service';
import { NavbarGoToService } from '@/main/shared/navbar/navbar-go-to.service';
import { CommonService } from '@/shared/common.service';
import { UserProfileService } from '@/main/shared/user-profile/user-profile.service';
import { User } from '@/shared/user.model';
import { AuthService } from '@/shared/auth/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-conclusion6',
  templateUrl: './conclusion6.component.html',
  styleUrls: ['./conclusion6.component.scss'],
})
export class Conclusion6Component implements OnInit, OnDestroy {
  user!: User;
  stepGroupSequence!: number;
  dataLoaded = false;
  locked = false;
  stepCompleted = false;
  conclusionDataSubscription!: Subscription;

  moduleName!: string;
  nextModuleName!: string;
  currentStepId!: number;
  nextStepId!: number;
  completionData: StepCompleteData = new StepCompleteData(0, 0);
  timeSpent!: number;
  showQuestionnaire!: boolean;
  navbarTitle!: string;
  stepSequence!: number;
  stepName!: string;
  moodEvaluate!: boolean;
  showLoading = false;

  @ViewChild('target1', { static: false }) target1!: ElementRef;
  @ViewChild('target2', { static: false }) target2!: ElementRef;

  constructor(
    private conclusionService: ConclusionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private stepDataService: StepsDataService,
    private commonDialogService: CommonDialogsService,
    private quizService: QuizService,
    private flowService: FlowService,
    private goToService: NavbarGoToService,
    private commonService: CommonService,
    private userProfileService: UserProfileService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
    this.activatedRoute.url.subscribe(data => {
      this.stepGroupSequence = +data[0].path;
      this.stepDataService
        .getBadgeInfo(this.stepGroupSequence)
        .subscribe((badge_data: any) => {
          this.commonDialogService.updateBadgeInfo(badge_data.results);
        });
    });

    this.conclusionDataSubscription = this.conclusionService
      .getConclusionData(this.stepGroupSequence)
      .subscribe(data => {
        if (data.user_step_status !== LOCKED) {
          this.moduleName = data.module_name;
          this.nextModuleName = data.next_module_name;
          this.currentStepId = data.current_step_id;
          this.nextStepId = data.next_step_id;
          this.locked = false;
          if (data.user_step_status === COMPLETED) {
            this.stepCompleted = true;
          }
        } else {
          this.locked = true;
        }
        this.stepDataService
          .getStepData(this.currentStepId)
          .subscribe((step_data: any) => {
            // for navbar title
            this.stepGroupSequence = step_data.data.step_group_sequence + 1;
            this.stepSequence = step_data.data.sequence + 1;
            this.stepName = step_data.data.name;
            this.navbarTitle =
              this.stepGroupSequence.toString() +
              '.' +
              this.stepSequence.toString() +
              ' ' +
              this.stepName;
            this.flowService.stepDetail.emit(this.navbarTitle);
            this.flowService.navbarTitle = this.navbarTitle;

            this.dataLoaded = true;
            if (step_data.data.next_questionnaire) {
              this.quizService.questionnaire_name =
                step_data.data.next_questionnaire;
              this.moodEvaluate = true;
            } else {
              this.moodEvaluate = false;
            }
          });
      });
    this.scrollup();
    this.quizService.questionnaire_active.subscribe((value: boolean) => {
      if (!value) {
        // this.quizService.questionnaireActive = false;
        this.moodEvaluate = false;
        this.showQuestionnaire = false;
        this.navbarTitle = this.flowService.navbarTitle;
        this.flowService.stepDetail.emit(this.navbarTitle);
        this.scrollDown();
      } else {
        this.showQuestionnaire = true;
        this.navbarTitle = 'Mood test';
        this.flowService.stepDetail.emit(this.navbarTitle);
      }
    });
    this.flowService.showDashboardButton.subscribe(() => {
      this.stepCompleted = true;
      this.showLoading = false;
    });
  }

  ngOnDestroy() {
    this.conclusionDataSubscription.unsubscribe();
  }

  onCompleted() {
    this.showLoading = true;
    this.timeSpent = 200;
    this.completionData.time_spent = this.timeSpent;
    this.completionData.step_id = this.currentStepId;
    this.stepDataService
      .storeCompletionData(this.completionData)
      .subscribe(data => {
        this.commonService.updateScore(CONCLUSION_SCORE);
      });
    this.commonDialogService.openCongratsDialog(
      this.currentStepId,
      false,
      true,
    );
  }

  onNextStep() {
    this.goToService.clickFlow.emit();
  }
  scrollDown() {
    setTimeout(() => {
      this.target2.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
  scrollup() {
    setTimeout(() => {
      this.target1.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
}
