import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { IntroductionService } from '../introduction.service';
import {COMPLETED, INTRODUCTION_SCORE, LOCKED, TREADWILL} from '@/app.constants';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { FlowService } from '@/main/flow/flow.service';
import { NavbarGoToService } from '@/main/shared/navbar/navbar-go-to.service';
import { FlowStepNavigationService } from '@/main/shared/flow-step-navigation.service';
import { StepCompleteData } from '@/main/resources/shared/completion-data.model';
import { CommonService } from '@/shared/common.service';
import { User } from '@/shared/user.model';
import { AuthService } from '@/shared/auth/auth.service';
import {Title} from "@angular/platform-browser";

export interface ThoughtSet {
  negativeThought: string;
  balancedThought: string;
}

@Component({
  selector: 'app-introduction3',
  templateUrl: './introduction3.component.html',
  styleUrls: ['./introduction3.component.scss'],
})
export class Introduction3Component implements OnInit, OnDestroy {
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
  negativeThoughts = [
    "I'm no good",
    'Nobody cares about me',
    "I'm a failure",
    'My future is bleak',
  ];
  balancedThoughts = [
    "I'm reasonably good",
    'There are some people who genuinely care about me',
    "I'm not a total failure. I'm reasonably successful",
    'I have plenty of things to look forward to',
  ];
  selectedThought!: string;
  balancedThought!: string;
  thoughtSave!: boolean;
  showloading = false;
  showSave!: boolean;

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
          this.selectedThought = data.data.selectedThought;
          if (data.data.selectedThought) {
            this.showSave = false;
            this.onThoughtChanged();
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

  onThoughtChange() {
    this.showSave = true;
    this.onThoughtChanged();
  }
  onThoughtChanged() {
    this.balancedThought = this.balancedThoughts[
      this.negativeThoughts.indexOf(this.selectedThought)
    ];
    if (this.showSave) {
      this.thoughtSave = true;
    }
  }
  thoughtSaveFocusOut() {
    const data = {
      selectedThought: this.selectedThought,
    };
    this.introductionService
      .storeIntroductionData(this.stepGroupSequence, data)
      .subscribe(_data => {
        console.log('success');
        this.thoughtSave = false;
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
