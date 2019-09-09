import { Component, OnInit, Input } from '@angular/core';
import { Step } from './step.model';
import { StepGroup } from '../step-group.model';
import { SLIDE } from '@/app.constants';

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
    if (this.step.data_type === SLIDE) {
      return `/resources/slides/${this.step.id}/`;
    }
    return '/';
  }

}
