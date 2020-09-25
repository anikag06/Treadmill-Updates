import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CongratsDialogComponent } from './congrats-dialog/congrats-dialog.component';
import { LOCKED } from '@/app.constants';
import { HttpClient } from '@angular/common/http';
import { FlowStepNavigationService } from '@/main/shared/flow-step-navigation.service';
import { Step } from '@/main/flow/step-group/step/step.model';

@Injectable({
  providedIn: 'root',
})
export class CommonDialogsService {
  // @Input() step!: Step;
  isLocked = false;
  nextStepData!: Step;
  badgeData!: any;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private flowNavService: FlowStepNavigationService,
  ) {}
  openCongratsDialog(
    curr_id: number,
    isLastStep: boolean,
    isLastModule: boolean,
  ) {
    this.isLocked = false;
    if (isLastStep) {
      this.flowNavService.isNextModuleLocked(curr_id).subscribe(data => {
        console.log('Next module locked', data, curr_id);
        this.nextStepData = data.data;
        this.isLocked = !data.data.next_step_group_unlocked;
        this.openDialog(true, isLastModule);
      });
    } else if (isLastModule) {
      this.openDialog(false, isLastModule);
    }
  }

  openDialog(isLastStep: boolean, isLastModule: boolean) {
    const dialogRef = this.dialog.open(CongratsDialogComponent, {
      maxWidth: '90vw',
      // width: '44%',
      height: '48%',
      panelClass: 'slide-video',
      data: {
        isLocked: this.isLocked,
        isLastStep: isLastStep,
        nextStepData: this.nextStepData,
        badgeData: this.badgeData,
        isLastModule: isLastModule,
      },
      autoFocus: false,
    });
  }

  updateBadgeInfo(badgeData: any) {
    console.log(badgeData);
    this.badgeData = badgeData[0];
  }
}
