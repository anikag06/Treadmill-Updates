import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { IntroductionService } from '../introduction.service';
import { LOCKED } from '@/app.constants';
import {StepsDataService} from "@/main/resources/shared/steps-data.service";
import {FlowService} from "@/main/flow/flow.service";

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
  navbarTitle!: string;
  stepSequence!: number;
  stepName!: string;
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

  constructor(
    private introductionService: IntroductionService,
    private activatedRoute: ActivatedRoute,
    private stepDataService: StepsDataService,
    private flowService: FlowService,
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
          this.onThoughtChanged();
        } else {
          this.locked = true;
        }
        this.dataLoaded = true;
        this.currentStepId = data.data.id;
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
          });
      });
  }

  ngOnDestroy() {
    this.introductionDataSubscription.unsubscribe();
  }

  onThoughtChanged() {
    this.balancedThought = this.balancedThoughts[
      this.negativeThoughts.indexOf(this.selectedThought)
    ];
  }

  saveData() {
    let data = {
      selectedThought: this.selectedThought,
    };
    this.introductionService
      .storeIntroductionData(this.stepGroupSequence, data)
      .subscribe(data => {
        console.log('success');
      });
  }
}
