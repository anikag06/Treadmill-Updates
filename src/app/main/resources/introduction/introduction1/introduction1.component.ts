import {Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { IntroductionService } from '../introduction.service';
import {COMPLETED, LOCKED} from '@/app.constants';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { FlowService } from '@/main/flow/flow.service';
import {NavbarGoToService} from "@/main/shared/navbar/navbar-go-to.service";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {StepCompleteData} from "@/main/resources/shared/completion-data.model";
import {FlowStepNavigationService} from "@/main/shared/flow-step-navigation.service";

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
  completionData: StepCompleteData = new StepCompleteData(0, 0);
  time_spent: any;
  currentStepId!: number;
  navbarTitle!: string;
  stepSequence!: number;
  stepName!: string;
  showNextStep = false;
  situationSave = false;
  behaviorSave = false;
  thoughtSave = false;
  feelingSave = false;
  next_step_id!: number;

  constructor(
    private introductionService: IntroductionService,
    private activatedRoute: ActivatedRoute,
    private stepDataService: StepsDataService,
    private flowService: FlowService,
    private flowStepService: FlowStepNavigationService,
    private goToService: NavbarGoToService,
  ) {}

  @ViewChild('autosize', { static: false }) autosize!: CdkTextareaAutosize;
  data = {
    situation: this.situation,
    feeling: this.feeling,
    behavior: this.behavior,
    thought: this.thought,
  };

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

  onCompleted() {
    this.showNextStep = true;
    this.time_spent = 100;
    this.completionData.time_spent = this.time_spent;
    this.completionData.step_id = this.currentStepId;
    this.stepDataService
      .storeCompletionData(this.completionData)
      .subscribe(data => {});
    // TO CHECK MARKDONE REQUEST IS FAILING
    this.flowStepService
      .getNextStepData(this.next_step_id)
      .subscribe(next_step => {
        this.flowStepService.virtualStepMarkDone(
          next_step.data,
          this.time_spent,
        );
      });
  }
  onNextStep() {
    console.log('Next step clicked');
    this.goToService.clickFlow.emit();
  }
  onthoughtSave() {
    this.thoughtSave = true;
  }
  onbehaviorSave() {
    this.behaviorSave = true;
  }
  onfeelingSave() {
    this.feelingSave = true;
  }
  onsituationSave() {
    this.situationSave = true;
  }
  onthoughtFocusOut() {
    this.data.thought = this.thought;
    this.introductionService
      .storeIntroductionData(this.stepGroupSequence, this.data)
      .subscribe(data => {
        console.log( data, this.data, 'success');
        this.thoughtSave = false;
      });
  }
  onfeelingFocusOut() {
    this.data.feeling = this.feeling;
    this.introductionService
      .storeIntroductionData(this.stepGroupSequence, this.data)
      .subscribe(data => {
        console.log( data, this.data, 'success');
        this.feelingSave = false;
      });
  }
  onsituationFocusOut() {
    this.data.situation = this.situation;
    this.introductionService
      .storeIntroductionData(this.stepGroupSequence, this.data)
      .subscribe(data => {
        console.log( data, this.data, 'success');
        this.situationSave = false;
      });
  }
  onbehaviorFocusOut() {
    this.data.behavior = this.behavior;
    this.introductionService
      .storeIntroductionData(this.stepGroupSequence, this.data)
      .subscribe(data => {
        console.log( data, this.data, 'success');
        this.behaviorSave = false;
      });
  }
}
