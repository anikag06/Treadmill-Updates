import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../step/step.model';
import { StepGroup } from '../step-group.model';

@Component({
  selector: 'app-steps-indicator',
  templateUrl: './steps-indicator.component.html',
  styleUrls: ['./steps-indicator.component.scss']
})
export class StepsIndicatorComponent implements OnInit {

  imageMap = new Map([
    ['locked', 'assets/flow/locked.svg'],
    ['unlocked', 'assets/flow/unlocked.gif'],
    ['completed', 'assets/flow/completed.svg'],
  ]);

  @Input() stepGroup!: StepGroup;

  constructor() { }

  ngOnInit() {
  }

  getStatusImage(step: Step) {
    return this.imageMap.get(step.status.toLowerCase());
  }

}
