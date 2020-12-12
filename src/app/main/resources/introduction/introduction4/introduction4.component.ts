import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { IntroductionService } from '../introduction.service';
import {
  COMPLETED,
  INTRODUCTION_SCORE,
  LOCKED,
  TREADWILL,
} from '@/app.constants';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { FlowService } from '@/main/flow/flow.service';
import { NavbarGoToService } from '@/main/shared/navbar/navbar-go-to.service';
import { FlowStepNavigationService } from '@/main/shared/flow-step-navigation.service';
import { StepCompleteData } from '@/main/resources/shared/completion-data.model';
import { CommonService } from '@/shared/common.service';
import { User } from '@/shared/user.model';
import { AuthService } from '@/shared/auth/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-introduction4',
  templateUrl: './introduction4.component.html',
  styleUrls: ['./introduction4.component.scss'],
})
export class Introduction4Component implements OnInit, OnDestroy {
  user!: User;
  stepGroupSequence!: number;
  dataLoaded = false;
  locked = true;
  introductionDataSubscription!: Subscription;
  currentStepId!: number;
  completionData: StepCompleteData = new StepCompleteData(0, 0);
  time_spent: any;
  next_step_id!: number;
  navbarTitle!: string;
  step_stepGroupSequence!: number;
  stepSequence!: number;
  stepName!: string;
  showNextStep = false;
  negativeBeliefs = ['I am incompetent', 'I am unlovable', 'I am worthless'];
  balancedBeliefs = [
    'I am reasonably competent. Of course, I am not excellent at everything I do. But, I can manage most things reasonably well.',
    'I am reasonably lovable. Of course, not everyone loves me. Not everyone even likes me. But there are some people who do like me and a few who actually love me.',
    'I am not worthless. I am valuable to my family.',
  ];
  selectedBelief!: string;
  balancedBelief!: string;
  beliefSave!: boolean;
  showSave!: boolean;
  showloading = false;

  constructor(
    private introductionService: IntroductionService,
    private activatedRoute: ActivatedRoute,
    private stepDataService: StepsDataService,
    private flowService: FlowService,
    private flowStepService: FlowStepNavigationService,
    private goToService: NavbarGoToService,
    private commonService: CommonService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
    this.activatedRoute.url.subscribe(data => {
      this.stepGroupSequence = +data[0].path;
    });

    this.introductionDataSubscription = this.introductionService
      .getIntroductionData(this.stepGroupSequence)
      .subscribe(data => {
        if (data.user_step_status !== LOCKED) {
          this.locked = false;
          this.selectedBelief = data.data.selectedBelief;
          if (data.data.selectedBelief) {
            this.showSave = false;
            this.onBeliefChanged();
          }
        } else {
          this.locked = true;
        }
        if (data.user_step_status === COMPLETED) {
          this.showNextStep = true;
        }
        this.dataLoaded = true;
        this.currentStepId = data.current_step_id;
        this.stepDataService
          .getStepData(this.currentStepId)
          .subscribe((step_data: any) => {
            console.log('step data is:', step_data);
            this.next_step_id = step_data.data.next_step_id;
            console.log('next step', this.next_step_id); // for navbar title
            this.step_stepGroupSequence =
              step_data.data.step_group_sequence + 1;
            this.stepSequence = step_data.data.sequence + 1;
            this.stepName = step_data.data.name;
            this.navbarTitle =
              this.step_stepGroupSequence.toString() +
              '.' +
              this.stepSequence.toString() +
              ' ' +
              this.stepName;
            console.log('STEP DETAIL:', this.navbarTitle);
            this.flowService.stepDetail.emit(this.navbarTitle);
          });
      });
  }

  ngOnDestroy() {
    this.introductionDataSubscription.unsubscribe();
  }

  onBeliefChange() {
    this.showSave = true;
    this.onBeliefChanged();
  }

  onBeliefChanged() {
    this.balancedBelief = this.balancedBeliefs[
      this.negativeBeliefs.indexOf(this.selectedBelief)
    ];
    if (this.showSave) {
      this.beliefSave = true;
    }
  }
  beliefSaveFocusOut() {
    const data = {
      selectedBelief: this.selectedBelief,
    };
    this.introductionService
      .storeIntroductionData(this.stepGroupSequence, data)
      .subscribe(_data => {
        console.log('success');
        this.beliefSave = false;
      });
  }
  onCompleted() {
    this.showloading = true;
    this.time_spent = 100;
    this.completionData.time_spent = this.time_spent;
    this.completionData.step_id = this.currentStepId;
    this.stepDataService
      .storeCompletionData(this.completionData)
      .subscribe(data => {
        this.showloading = false;
        this.showNextStep = true;
        this.commonService.updateScore(INTRODUCTION_SCORE);
      });
  }
  onNextStep() {
    console.log('Next step clicked');
    this.goToService.clickFlow.emit();
  }
}
