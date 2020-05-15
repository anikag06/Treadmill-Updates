import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { IntroductionService } from '../introduction.service';
import { LOCKED } from '@/app.constants';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { FlowService } from '@/main/flow/flow.service';

@Component({
  selector: 'app-introduction5',
  templateUrl: './introduction5.component.html',
  styleUrls: ['./introduction5.component.scss'],
})
export class Introduction5Component implements OnInit, OnDestroy {
  stepGroupSequence!: number;
  dataLoaded = false;
  locked = true;
  introductionDataSubscription!: Subscription;
  worryThought = '';
  hours!: string;
  difficult!: string;
  selectedTechniques!: string[];
  help!: string;
  currentStepId!: number;
  navbarTitle!: string;
  stepSequence!: number;
  stepName!: string;
  wastedHours = [
    '1 hours',
    '2 hours',
    '3 hours',
    '4 hours',
    '5 hours',
    'More than 5 hours',
    'More than 10 hours',
  ];
  techniques = [
    'I tell myself not to worry',
    'I tell myself everything will be just fine',
    'I keep asking for reassurance from others',
    'I criticize myself for worrying and promise myself that I try to force myself to not worry',
    'I try to suppress the feeling of distress and anxiety associated to my worry',
  ];

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
          this.locked = false;
          this.worryThought = data.data.worryThought;
          this.hours = data.data.hours;
          this.difficult = data.data.difficult;
          this.selectedTechniques = data.data.selectedTechniques;
          this.help = data.data.help;
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
    const data = {
      worryThought: this.worryThought,
      hours: this.hours,
      difficult: this.difficult,
      selectedTechniques: this.selectedTechniques,
      help: this.help,
    };
    this.introductionService
      .storeIntroductionData(this.stepGroupSequence, data)
      .subscribe(() => {
        console.log('success');
      });
  }
}
