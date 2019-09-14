import { Component, OnInit, Input } from '@angular/core';
import { Step } from './step.model';
import { StepGroup } from '../step-group.model';
import { SLIDE, CONVERSATION_GROUP, GAME, FORM, LOCKED, SUPPORT_GROUP } from '@/app.constants';
import { FlowStepNavigationService } from '@/main/shared/flow-step-navigation.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  @Input() step!: Step;
  @Input() stepGroup!: StepGroup;

  constructor(
    private flowStepNavService: FlowStepNavigationService
  ) { }

  ngOnInit() {
  }

  nextLink() {

    return this.flowStepNavService.goToFlowNextStep(this.step);

  }

}
