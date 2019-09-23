import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CongratsDialogComponent } from './congrats-dialog/congrats-dialog.component';
import { LOCKED } from '@/app.constants';
import { HttpClient } from '@angular/common/http';
import { FlowStepNavigationService } from '@/main/shared/flow-step-navigation.service';
import { Step } from '@/main/flow/step-group/step/step.model';

@Injectable({
  providedIn: 'root'
})
export class CommonDialogsService {
  // @Input() step!: Step;
  isLocked = false;
  nextStepData!: Step;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private flowNavService: FlowStepNavigationService,
  ) { }
  openCongratsDialog(curr_id: number, step_id: number, isLastStep: boolean, time_spent: any) {
    this.isLocked = false;
    if (isLastStep) {
      this.flowNavService.isNextModuleLocked(curr_id)
        .subscribe(
          (data) => {
            this.nextStepData = data.data;
            this.isLocked = !data.data.next_step_group_unlocked;
            this.openDialog(true, time_spent);
          }
        );
    } else {
      this.flowNavService.getNextStepData(step_id)
      .subscribe( (next_step_data) => {
        if (next_step_data.data.status === LOCKED) {
          this.isLocked = true;
        }
        this.nextStepData = next_step_data.data;
        this.openDialog(false, time_spent);
      });
    }
  }

  openDialog(isLastStep: boolean, time_spent: any) {
    const dialogRef = this.dialog.open(CongratsDialogComponent, {
      width: '50%',
      height: '65%',
      data: {
        isLocked: this.isLocked,
        isLastStep: isLastStep,
        nextStepData: this.nextStepData,
        time_spent: time_spent
      },
      autoFocus: false
    });
  }

}
