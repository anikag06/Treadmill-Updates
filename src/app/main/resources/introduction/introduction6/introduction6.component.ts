import { Component, OnInit } from '@angular/core';
import { IntroductionService } from '@/main/resources/introduction/introduction.service';
import { ActivatedRoute } from '@angular/router';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { FlowService } from '@/main/flow/flow.service';
import { LOCKED } from '@/app.constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-introduction6',
  templateUrl: './introduction6.component.html',
  styleUrls: ['./introduction6.component.scss'],
})
export class Introduction6Component implements OnInit {
  stepGroupSequence!: number;
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
        if (data.user_step_status !== LOCKED) {
          this.locked = false;
        } else {
          this.locked = true;
        }
        this.dataLoaded = true;
        this.currentStepId = data.data.id;
        this.stepDataService
          .getStepData(this.currentStepId)
          .subscribe((step_data: any) => {
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
            this.flowService.stepDetail.emit(this.navbarTitle);
          });
      });
  }
}
