import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FlowService } from './flow.service';
import { StepGroup } from './step-group/step-group.model';
import { Subscription } from 'rxjs';
import { MOBILE_WIDTH } from '@/app.constants';
import { MatDialog } from '@angular/material/dialog';
import { IntroService } from '@/main/walk-through/intro.service';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';
import { QuizService } from '@/shared/questionnaire/questionnaire.service';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss'],
})
export class FlowComponent implements OnInit, OnDestroy {
  @Input() navBar!: any;
  stepGroups: StepGroup[] = [];
  flowSubscription!: Subscription;
  introSubscription!: Subscription;
  dataloaded = false;
  showOverlay = false;
  gotoSubscription!: Subscription;
  introExit = false;
  @Input() fromGoto!: boolean;
  showQuestionnaire = false;

  constructor(
    private flowService: FlowService,
    private dialog: MatDialog,
    private introService: IntroService,
    private quizService: QuizService,
  ) {}

  ngOnInit() {
    console.log(this.navBar);
    this.dataloaded = false;
    // this.flowService.loadBehaviour.subscribe((data) => this.loadData());
    this.loadData();
    if (window.innerWidth < MOBILE_WIDTH) {
      this.introSubscription = this.introService.overlayBehaviour.subscribe(
        showOverlay => {
          this.showOverlay = showOverlay;
        },
      );
    }
    this.gotoSubscription = this.introService.gotoBehaviour.subscribe(
      (value: boolean) => {
        this.introExit = value;
      },
    );
  }

  ngOnDestroy(): void {
    if (this.flowSubscription) {
      this.flowSubscription.unsubscribe();
    }
    if (this.introSubscription) {
      this.introSubscription.unsubscribe();
    }
    if (isNotNullOrUndefined(this.gotoSubscription)) {
      this.gotoSubscription.unsubscribe();
    }
  }

  loadData() {
    if (this.flowSubscription) {
      this.flowSubscription.unsubscribe();
    }
    this.flowSubscription = this.flowService
      .getFlow()
      .subscribe((data: any) => {
        console.log('response', data);
        if (data.step_groups) {
          this.stepGroups = data.step_groups;
          this.flowService.setFirstStepCompleted(
            this.stepGroups[0].steps[0].status,
          );
          this.dataloaded = true;
          setTimeout(() => {
            if (!this.fromGoto) {
              this.flowService.triggerLoad();
            }
          }, 2000);
        } else {
          //show follow up questionnaire
          this.showQuestionnaire = true;
          this.flowService.showFollowUp.emit();
          this.quizService.questionnaire_name = data.data.questionnaire_to_show;
        }
      });
  }
}
