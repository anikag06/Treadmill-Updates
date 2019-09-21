import { Component, OnInit, Input } from '@angular/core';
import { StepGroup } from './step-group.model';
import { Step } from './step/step.model';
import { COMPLETED } from '@/app.constants';

@Component({
  selector: 'app-step-group',
  templateUrl: './step-group.component.html',
  styleUrls: ['./step-group.component.scss']
})
export class StepGroupComponent implements OnInit {

  @Input() stepGroup!: StepGroup;

  isExpanded = true;

  constructor() { }

  ngOnInit() {
    this.isExpanded = true;
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

}
