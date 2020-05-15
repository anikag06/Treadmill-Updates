import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { IntroductionService } from '../introduction.service';
import { LOCKED } from '@/app.constants';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { FlowService } from '@/main/flow/flow.service';

@Component({
  selector: 'app-introduction1',
  templateUrl: './introduction1.component.html',
  styleUrls: ['./introduction1.component.scss'],
})
export class Introduction1Component implements OnInit, OnDestroy {
  stepGroupSequence!: number;
  situation!: string;
  feeling!: string;
  behavior!: string;
  thought!: string;
  dataLoaded = false;
  locked = true;
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
        console.log('DATA', data);
        if (data.user_step_status !== LOCKED) {
          this.situation = data.data.situation;
          this.feeling = data.data.feeling;
          this.behavior = data.data.behavior;
          this.thought = data.data.thought;
          this.locked = false;
        } else {
          this.locked = true;
        }
        this.dataLoaded = true;
        this.currentStepId = data.current_step_id;
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
    this.saveData();
  }

  saveData() {
    const data = {
      situation: this.situation,
      feeling: this.feeling,
      behavior: this.behavior,
      thought: this.thought,
    };
    this.introductionService
      .storeIntroductionData(this.stepGroupSequence, data)
      .subscribe(_data => {
        console.log('success');
      });
  }
}
