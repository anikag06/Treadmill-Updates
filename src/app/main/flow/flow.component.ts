import { Component, OnInit, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { FlowService } from './flow.service';
import { StepGroup } from './step-group/step-group.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss']
})
export class FlowComponent implements OnInit, OnDestroy {

  stepGroups: StepGroup[] = [];
  flowSubscription!: Subscription;
  dataloaded = false;

  constructor(
    private flowService: FlowService
  ) { }

  ngOnInit() {
    this.dataloaded = false;
    this.flowService.loadBehaviour
      .subscribe(
        data => this.loadData()
      );
  }

  ngOnDestroy(): void {
    if (this.flowSubscription) {
      this.flowSubscription.unsubscribe();
    }
  }

  loadData() {
    if (this.flowSubscription) {
      this.flowSubscription.unsubscribe();
    }
    this.flowSubscription = this.flowService.getFlow()
      .subscribe(
        (data: any) => {
          this.stepGroups = data.step_groups;
          this.dataloaded = true;
        }
      );
  }

}
