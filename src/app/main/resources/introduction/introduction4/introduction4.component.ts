import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { IntroductionService } from '../introduction.service';
import { LOCKED } from '@/app.constants';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { FlowService } from '@/main/flow/flow.service';

@Component({
  selector: 'app-introduction4',
  templateUrl: './introduction4.component.html',
  styleUrls: ['./introduction4.component.scss'],
})
export class Introduction4Component implements OnInit, OnDestroy {
  stepGroupSequence!: number;
  dataLoaded = false;
  locked = true;
  introductionDataSubscription!: Subscription;
  currentStepId!: number;
  navbarTitle!: string;
  stepSequence!: number;
  stepName!: string;
  negativeBeliefs = ['I am incompetent', 'I am unlovable', 'I am worthless'];
  balancedBeliefs = [
    'I am reasonably competent. Of course, I am not excellent at everything I do. But, I can manage most things reasonably well.',
    'I am reasonably lovable. Of course, not everyone loves me. Not everyone even likes me. But there are some people who do like me and a few who actually love me.',
    'I am not worthless. I am valuable to my family.',
  ];
  selectedBelief!: string;
  balancedBelief!: string;

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
          this.selectedBelief = data.data.selectedBelief;
          this.onBeliefChanged();
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

  onBeliefChanged() {
    this.balancedBelief = this.balancedBeliefs[
      this.negativeBeliefs.indexOf(this.selectedBelief)
    ];
  }

  saveData() {
    const data = {
      selectedBelief: this.selectedBelief,
    };
    this.introductionService
      .storeIntroductionData(this.stepGroupSequence, data)
      .subscribe(_data => {
        console.log('success');
      });
  }
}
