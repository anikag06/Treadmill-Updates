import {
  Component,
  OnInit,
  SimpleChanges,
  Input,
  OnDestroy,
} from '@angular/core';
import { FlowService } from './flow.service';
import { StepGroup } from './step-group/step-group.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss'],
})
export class FlowComponent implements OnInit, OnDestroy {
  @Input() navBar!: any;
  stepGroups: StepGroup[] = [];
  flowSubscription!: Subscription;
  dataloaded = false;

  constructor(private flowService: FlowService) {}

  ngOnInit() {
    console.log(this.navBar);
    this.dataloaded = false;
    this.flowService.loadBehaviour.subscribe(data => this.loadData());
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
    this.flowSubscription = this.flowService
      .getFlow()
      .subscribe((data: any) => {
        console.log('response', data);
        this.stepGroups = data.step_groups;
        this.dataloaded = true;
      });
  }
}
