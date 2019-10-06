import { Component, OnInit, Input } from '@angular/core';
import { StepGroup } from './step-group.model';
import { Step } from './step/step.model';
import { COMPLETED, ACTIVE, UNLOCKED } from '@/app.constants';

@Component({
  selector: 'app-step-group',
  templateUrl: './step-group.component.html',
  styleUrls: ['./step-group.component.scss']
})
export class StepGroupComponent implements OnInit {

  @Input() stepGroup!: StepGroup;

  isExpanded = false;
  showLessSteps = true;
  defaultSteps: StepGroup = {id: 0, sequence: 0, name: '', status: UNLOCKED, steps: []};
  NO_OF_STEPS_SHOWN = 3;        // number of steps shown by default
  isShowAllBtn = true;
  firstStepOfModule!: boolean;
  lastStepOfModule = false;

  constructor() { }

  ngOnInit() {
    this.initialiseDefaultSteps();
    this.getDefaultStepsShown();
  }
  panelOpened() {
    this.isExpanded = true;
  }

  initialiseDefaultSteps() {
    this.defaultSteps.id = this.stepGroup.id;
    this.defaultSteps.name = this.stepGroup.name;
    this.defaultSteps.sequence = this.stepGroup.sequence;
    this.defaultSteps.status = this.defaultSteps.status;
  }

  getDefaultStepsShown() {
    const no_steps = this.stepGroup.steps.length;
    this.defaultSteps.steps = [];
    if ( no_steps <= this.NO_OF_STEPS_SHOWN) {
      this.NO_OF_STEPS_SHOWN = no_steps;
      this.isShowAllBtn = false;
      this.lastStepOfModule = true;
    }
    if (this.stepGroup.status === ACTIVE) {
      this.isExpanded = true;
      for (let i = 0; i < no_steps; i++) {
        let j = 0;
        if (this.stepGroup.steps[i].status === ACTIVE) {
          if (i === 0) {    // if first element
            j = i;
            this.firstStepOfModule = true;
          } else if (i > 0 && i < no_steps - 1) {
              j = i - 1;
              this.firstStepOfModule = false;
          } else if (i === no_steps - 1 ) {     // if last element
              j = i - 2;
              this.firstStepOfModule = false;
          }
          for (let k = 0; k < this.NO_OF_STEPS_SHOWN; k++) {
            this.defaultSteps.steps.push(this.stepGroup.steps[j]);
            j++;
          }
          console.log(j);
          if (j === no_steps) {
            this.lastStepOfModule = true;
          }
        }
      }
    } else {      // if module is not active then shown first three steps by default
      for ( let i = 0; i < this.NO_OF_STEPS_SHOWN; i++) {
        this.defaultSteps.steps.push(this.stepGroup.steps[i]);
        this.firstStepOfModule = true;
      }
    }
  }

  percentageComplete() {
    const steps = this.stepGroup.steps;
    const completed = steps.filter((step: Step) => step.status === COMPLETED).length;
    return completed / steps.length * 100;
  }


  dashOffset() {
    const totalDashOffset = 126;
    const percentDashOffset = totalDashOffset * this.percentageComplete() / 100 || 0;
    return totalDashOffset - percentDashOffset;
  }

  collapseClick() {
    this.showLessSteps = true;
  }

  showAllClick() {
    this.showLessSteps = false;
  }

}
