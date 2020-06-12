import {Component, Input, OnDestroy, OnInit,} from '@angular/core';
import {FlowService} from './flow.service';
import {StepGroup} from './step-group/step-group.model';
import {Subscription} from 'rxjs';
import {MOBILE_WIDTH} from '@/app.constants';
import {MatDialog} from '@angular/material/dialog';

import {IntroDialogComponent} from '@/main/walk-through /intro-dialog/intro-dialog.component';

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


  constructor(private flowService: FlowService, private dialog: MatDialog) {}

  ngOnInit() {
    console.log(this.navBar);
    this.dataloaded = false;
    this.flowService.loadBehaviour.subscribe((data) => this.loadData());
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
