import { Component, OnInit } from '@angular/core';
import { FlowService } from './flow.service';
import { StepGroup } from './step-group/step-group.model';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements OnInit {

  stepGroups: StepGroup[] = [];

  constructor(
    private flowService: FlowService
  ) { }

  ngOnInit() {
    this.flowService.getFlow()
      .subscribe(
        (data: any) => {
          this.stepGroups = data.step_groups;
        }
      );
  }

}
