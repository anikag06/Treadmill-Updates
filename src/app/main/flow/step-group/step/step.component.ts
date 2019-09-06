import { Component, OnInit, Input } from '@angular/core';
import { Step } from './step.model';
import { StepGroup } from '../step-group.model';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  @Input() step!: Step;
  @Input() stepGroup!: StepGroup;

  constructor() { }

  ngOnInit() {
  }

  nextLink() {
    if (this.step.step_data.type === 'Slide') {
      return `/resources/slides/${this.step.id}/`
    }
    return "/"
  }

}
