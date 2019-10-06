import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { HTML_PAGE } from '@/app.constants';
import { StepsDataService } from '../shared/steps-data.service';
import { StepCompleteData } from '../shared/completion-data.model';
import { CommonDialogsService } from '../shared/common-dialogs.service';

@Component({
  selector: 'app-conclusion-page',
  templateUrl: './conclusion-page.component.html',
  styleUrls: ['./conclusion-page.component.scss']
})
export class ConclusionPageComponent implements OnInit {

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private stepData: StepsDataService,
    private commonDialogService: CommonDialogsService,
    private stepDataService: StepsDataService,
  ) { }

  pageNotAvailable = false;
  stepCompleted = false;
  isLastStep = true;
  timeSpent!: number;
  current_step_id!: number;
  next_step_id!: number;
  completionData: StepCompleteData = new StepCompleteData(0, 0);

  ngOnInit() {
    console.log('in conclusion page');
    this.activateRoute.params
      .pipe(
        map(v => v.id),
        switchMap(id =>  this.stepData.getStepData(parseInt(id, 10)))
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          if (['COMPLETED', 'WORKING', 'ACTIVE', 'UNLOCKED'].includes(data.data.status) && data.data.data_type === HTML_PAGE ) {
            this.current_step_id = data.data.id;
            this.next_step_id = data.data.next_step_id;
            if (data.data.status === 'COMPLETED') {
              this.stepCompleted = true;
            }
          } else {
            this.pageNotAvailable = true;
          }
          if (data.data.is_last_step && data.data.hook[0] === 'SHOW-BADGE') {
            console.log(data.data.step_group_sequence);
            this.stepDataService.getBadgeInfo(data.data.step_group_sequence)
              .subscribe( (badge_data: any) => {
                console.log(badge_data);
                this.commonDialogService.updateBadgeInfo(badge_data.results);
              });
          }
        });
  }

  onCompleted() {
    this.stepCompleted = true;
    this.timeSpent = 100;
    this.completionData.time_spent = this.timeSpent;
    this.completionData.step_id = this.current_step_id;
    this.stepData.storeCompletionData(this.completionData)
      .subscribe( (data) => {
        console.log(data);
      });
    this.commonDialogService.openCongratsDialog(this.current_step_id, this.next_step_id, this.isLastStep, this.timeSpent);
  }

  onDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
