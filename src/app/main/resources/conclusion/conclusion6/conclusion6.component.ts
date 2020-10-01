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
  LOCKED,
  LOGGED_IN_PATH,
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

@Component({
  selector: 'app-conclusion6',
  templateUrl: './conclusion6.component.html',
  styleUrls: ['./conclusion6.component.scss'],
})
export class Conclusion6Component implements OnInit, OnDestroy {
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

  @ViewChild('target', { static: false }) target!: ElementRef;

  constructor(
    private conclusionService: ConclusionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private stepDataService: StepsDataService,
    private commonDialogService: CommonDialogsService,
    private quizService: QuizService,
    private flowService: FlowService,
    private goToService: NavbarGoToService,
  ) {}

  ngOnInit() {
    this.activatedRoute.url.subscribe(data => {
      this.stepGroupSequence = +data[0].path;
      this.stepDataService
        .getBadgeInfo(this.stepGroupSequence)
        .subscribe((badge_data: any) => {
          console.log(badge_data);
          this.commonDialogService.updateBadgeInfo(badge_data.results);
        });
    });

    this.conclusionDataSubscription = this.conclusionService
      .getConclusionData(this.stepGroupSequence)
      .subscribe(data => {
        console.log('CONCLUSION DATA', data);
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
            console.log('step data is:', step_data);
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
            console.log('STEP DETAIL:', this.navbarTitle);
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
    this.quizService.questionnaire_active.subscribe((value: boolean) => {
      console.log(
        'EVENT EMITTED',
        value,
        this.navbarTitle,
        'Title',
        this.flowService.navbarTitle,
      );
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
      console.log('show dashboard');
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
        console.log(data);
      });
    this.commonDialogService.openCongratsDialog(
      this.currentStepId,
      false,
      true,
    );
  }

  onNextStep() {
    console.log('Next step clicked');
    this.goToService.clickFlow.emit();
  }
  scrollDown() {
    setTimeout(() => {
      this.target.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
}
