import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { IntroductionService } from '../introduction.service';
import { COMPLETED, LOCKED } from '@/app.constants';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { FlowService } from '@/main/flow/flow.service';
import { NavbarGoToService } from '@/main/shared/navbar/navbar-go-to.service';
import { FlowStepNavigationService } from '@/main/shared/flow-step-navigation.service';
import { StepCompleteData } from '@/main/resources/shared/completion-data.model';

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
    'Negative thought 1',
    'Negative thought 2',
    'Negative thought 3',
    'Negative thought 4',
    'Negative thought 5',
  ];
  balancedThoughts = [
    'Balanced thought 1',
    'Balanced thought 2',
    'Balanced thought 3',
    'Balanced thought 4',
    'Balanced thought 5',
  ];
  selectedThought!: string;
  balancedThought!: string;
  thoughtSave!: boolean;
  showSave!: boolean;

  constructor(
    private introductionService: IntroductionService,
    private activatedRoute: ActivatedRoute,
    private stepDataService: StepsDataService,
    private flowService: FlowService,
    private flowStepService: FlowStepNavigationService,
    private goToService: NavbarGoToService,
  ) {}

  ngOnInit() {
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

  onThoughtChanged() {
    console.log('thought save', this.thoughtSave);

    this.balancedThought = this.balancedThoughts[
      this.negativeThoughts.indexOf(this.selectedThought)
    ];
    this.thoughtSave = true;
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
    this.showNextStep = true;
    this.time_spent = 100;
    this.completionData.time_spent = this.time_spent;
    this.completionData.step_id = this.currentStepId;
    this.stepDataService
      .storeCompletionData(this.completionData)
      .subscribe(data => {});
  }
  onNextStep() {
    console.log('Next step clicked');
    this.goToService.clickFlow.emit();
  }
}
