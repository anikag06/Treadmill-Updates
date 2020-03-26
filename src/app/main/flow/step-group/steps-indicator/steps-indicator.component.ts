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
    ['locked', 'assets/flow/not completed.png'],
    ['active', 'assets/flow/unlocked.gif'],
    ['completed', 'assets/flow/Completed.png'],
  ]);

  @Input() step!: Step;
  @Input() stepGroup!: StepGroup;
  // @Input() stepGroup!: StepGroup;
  @Input() first!: boolean;
  @Input() last!: boolean;
  @Input() stepGroupSteps!: any;
  @Input() showLessSteps!: any;
  @Input() firstStepOfModule!: any;
  @Input() lastStepOfModule!: any;

  constructor() { }

  ngOnInit() {
    console.log(this.lastStepOfModule);
  }

  getStatusImage(step: Step) {
    if (step.virtual_step && step.status === UNLOCKED) {
      return this.imageMap.get('locked');
    }
    return this.imageMap.get(step.status.toLowerCase());
  }

}
