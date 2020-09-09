import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { IntroductionService } from '../introduction.service';
import {COMPLETED, INTRODUCTION_SCORE, LOCKED} from '@/app.constants';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { FlowService } from '@/main/flow/flow.service';
import { NavbarGoToService } from '@/main/shared/navbar/navbar-go-to.service';
import { StepCompleteData } from '@/main/resources/shared/completion-data.model';
import { FlowStepNavigationService } from '@/main/shared/flow-step-navigation.service';
import {CommonService} from '@/shared/common.service';
import {UserProfileService} from '@/main/shared/user-profile/user-profile.service';
import {User} from '@/shared/user.model';
import {AuthService} from '@/shared/auth/auth.service';

@Component({
  selector: 'app-introduction2',
  templateUrl: './introduction2.component.html',
  styleUrls: ['./introduction2.component.scss'],
})
export class Introduction2Component implements OnInit, OnDestroy {
  user!: User;
  stepGroupSequence!: number;
  enjoyable!: string;
  mastery!: string;
  miserable!: string;
  dataLoaded = false;
  locked = true;
  introductionDataSubscription!: Subscription;
  completionData: StepCompleteData = new StepCompleteData(0, 0);
  time_spent: any;
  next_step_id!: number;
  currentStepId!: number;
  navbarTitle!: string;
  step_stepGroupSequence!: number;
  stepSequence!: number;
  stepName!: string;
  showNextStep = false;
  enjoyableSave!: boolean;
  miserableSave!: boolean;
  masterySave!: boolean;
  showloading = false;

  data = {
    enjoyable: this.enjoyable,
    mastery: this.mastery,
    miserable: this.miserable,
  };

  constructor(
    private introductionService: IntroductionService,
    private activatedRoute: ActivatedRoute,
    private stepDataService: StepsDataService,
    private flowService: FlowService,
    private flowStepService: FlowStepNavigationService,
    private goToService: NavbarGoToService,
    private commonService: CommonService,
    private userProfileService: UserProfileService,
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
        console.log('Data is:', data);
        if (data.user_step_status !== LOCKED) {
          this.enjoyable = data.data.enjoyable;
          this.mastery = data.data.mastery;
          this.miserable = data.data.miserable;
          this.locked = false;
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
            console.log('next step', this.next_step_id);
            // for navbar title
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
  onenjoyableSave() {
    this.enjoyableSave = true;
  }
  onmasterySave() {
    this.masterySave = true;
  }
  onmiserableSave() {
    this.miserableSave = true;
  }

  onenjoyableFocusOut() {
    this.data.enjoyable = this.enjoyable;
    this.introductionService
      .storeIntroductionData(this.stepGroupSequence, this.data)
      .subscribe(data => {
        console.log(data, this.data, 'success');
        this.enjoyableSave = false;
      });
  }
  onmiserableFocusOut() {
    this.data.miserable = this.miserable;
    this.introductionService
      .storeIntroductionData(this.stepGroupSequence, this.data)
      .subscribe(data => {
        console.log(data, this.data, 'success');
        this.miserableSave = false;
      });
  }
  onmasteryFocusOut() {
    this.data.mastery = this.mastery;
    this.introductionService
      .storeIntroductionData(this.stepGroupSequence, this.data)
      .subscribe(data => {
        console.log(data, this.data, 'success');
        this.masterySave = false;
      });
  }
}
