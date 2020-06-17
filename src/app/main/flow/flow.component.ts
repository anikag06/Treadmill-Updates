import {Component, Input, OnDestroy, OnInit,} from '@angular/core';
import {FlowService} from './flow.service';
import {StepGroup} from './step-group/step-group.model';
import {Subscription} from 'rxjs';
import {MOBILE_WIDTH} from '@/app.constants';
import {MatDialog} from '@angular/material/dialog';
import {IntroService} from "@/main/walk-through/intro.service";

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss'],
})
export class FlowComponent implements OnInit, OnDestroy {
  @Input() navBar!: any;
  stepGroups: StepGroup[] = [];
  flowSubscription!: Subscription;
  introSubscription! : Subscription
  dataloaded = false;
  showOverlay = false;

  constructor(private flowService: FlowService, private dialog: MatDialog,private introService : IntroService) {}

  ngOnInit() {
    console.log(this.navBar);
    this.dataloaded = false;
    this.flowService.loadBehaviour.subscribe((data) => this.loadData());
    if (window.innerWidth < MOBILE_WIDTH) {
      this.introSubscription = this.introService.overlayBehaviour.subscribe(
        (showOverlay) => {
          this.showOverlay = showOverlay;
        },
      );
    }
    console.log(this.showOverlay);
  }


  ngOnDestroy(): void {
    if (this.flowSubscription) {
      this.flowSubscription.unsubscribe();
    }
    if(this.introSubscription){
      this.introSubscription.unsubscribe();
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
        this.flowService.setFirstStepCompleted(this.stepGroups[0].steps[0].status);
        this.dataloaded = true;
      });
  }


}
