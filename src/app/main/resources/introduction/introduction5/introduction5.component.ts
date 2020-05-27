import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { IntroductionService } from '../introduction.service';
import { COMPLETED, LOCKED } from '@/app.constants';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { FlowService } from '@/main/flow/flow.service';
import { FlowStepNavigationService } from '@/main/shared/flow-step-navigation.service';
import { NavbarGoToService } from '@/main/shared/navbar/navbar-go-to.service';
import { StepCompleteData } from '@/main/resources/shared/completion-data.model';

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
  completionData: StepCompleteData = new StepCompleteData(0, 0);
  time_spent: any;
  showNextStep = false;
  next_step_id!: number;
  navbarTitle!: string;
  step_stepGroupSequence!: number;
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
  data = {
    worryThought: this.worryThought,
    hours: this.hours,
    difficult: this.difficult,
    selectedTechniques: this.selectedTechniques,
    help: this.help,
  };
  worrySave!: boolean;
  hourSave!: boolean;
  difficultSave!: boolean;
  techniqueSave!: boolean;
  helpSave!: boolean;
  showloading = false;


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
          this.worryThought = data.data.worryThought;
          this.hours = data.data.hours;
          this.difficult = data.data.difficult;
          this.selectedTechniques = data.data.selectedTechniques;
          this.help = data.data.help;
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
            this.step_stepGroupSequence = step_data.data.step_group_sequence + 1;
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
      });
  }
  onNextStep() {
    console.log('Next step clicked');
    this.goToService.clickFlow.emit();
  }
  worrySaveFocusOut() {
    this.data.worryThought = this.worryThought;
    this.introductionService
      .storeIntroductionData(this.stepGroupSequence, this.data)
      .subscribe(_data => {
        console.log('success');
        this.worrySave = false;
      });
  }
  hourSaveFocusOut() {
    this.data.hours = this.hours;
    this.introductionService
      .storeIntroductionData(this.stepGroupSequence, this.data)
      .subscribe(_data => {
        console.log('success');
        this.hourSave = false;
      });
  }
  difficultSaveFocusOut() {
    this.data.difficult = this.difficult;
    this.introductionService
      .storeIntroductionData(this.stepGroupSequence, this.data)
      .subscribe(_data => {
        console.log('success');
        this.difficultSave = false;
      });
  }
  techniqueSaveFocusOut() {
    this.data.selectedTechniques = this.selectedTechniques;
    this.introductionService
      .storeIntroductionData(this.stepGroupSequence, this.data)
      .subscribe(_data => {
        console.log('success');
        this.techniqueSave = false;
      });
  }
  helpSaveFocusOut() {
    this.data.help = this.help;
    this.introductionService
      .storeIntroductionData(this.stepGroupSequence, this.data)
      .subscribe(_data => {
        console.log('success');
        this.helpSave = false;
      });
  }
}
