import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { IntroductionService } from '../introduction.service';
import { LOCKED } from '@/app.constants';
import {StepsDataService} from "@/main/resources/shared/steps-data.service";
import {FlowService} from "@/main/flow/flow.service";

@Component({
  selector: 'app-introduction2',
  templateUrl: './introduction2.component.html',
  styleUrls: ['./introduction2.component.scss'],
})
export class Introduction2Component implements OnInit, OnDestroy {
  stepGroupSequence!: number;
  enjoyable!: string;
  mastery!: string;
  miserable!: string;
  dataLoaded: boolean = false;
  locked: boolean = true;
  introductionDataSubscription!: Subscription;
  currentStepId!: number;
  navbarTitle!: string;
  stepSequence!: number;
  stepName!: string;

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
        if (data.user_step_status != LOCKED) {
          this.enjoyable = data.enjoyable;
          this.mastery = data.mastery;
          this.miserable = data.miserable;
          this.locked = false;
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

  saveData() {
    let data = {
      enjoyable: this.enjoyable,
      mastery: this.mastery,
      miserable: this.miserable,
    };
    this.introductionService
      .storeIntroductionData(this.stepGroupSequence, data)
      .subscribe(data => {
        console.log('success');
      });
  }
}
