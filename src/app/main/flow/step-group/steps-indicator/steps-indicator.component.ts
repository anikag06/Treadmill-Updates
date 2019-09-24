import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../step/step.model';
import { StepGroup } from '../step-group.model';
import { UNLOCKED } from '@/app.constants';

@Component({
  selector: 'app-steps-indicator',
  templateUrl: './steps-indicator.component.html',
  styleUrls: ['./steps-indicator.component.scss']
})
export class StepsIndicatorComponent implements OnInit {

  imageMap = new Map([
    ['locked', 'assets/flow/locked.svg'],
    ['active', 'assets/flow/unlocked.gif'],
    ['completed', 'assets/flow/completed.svg'],
  ]);

  // @Input() stepGroup!: StepGroup;
  @Input() stepGroupSteps!: any;
  @Input() showLessSteps!: any;
  @Input() firstStepOfModule!: any;

  constructor() { }

  ngOnInit() {
    console.log(this.stepGroupSteps);
    console.log('first of module', this.firstStepOfModule);
  }

  getStatusImage(step: Step) {
    if (step.virtual_step && step.status === UNLOCKED) {
      return this.imageMap.get('locked');
    }
    return this.imageMap.get(step.status.toLowerCase());
  }

}
