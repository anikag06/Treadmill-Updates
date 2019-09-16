import { Injectable, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CongratsDialogComponent } from './congrats-dialog/congrats-dialog.component';
import { LOCKED, SLIDE, CONVERSATION_GROUP, GAME, FORM, SUPPORT_GROUP } from '@/app.constants';
import { Step } from '@/main/conversation-group/conversation-group-input/step.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { FlowStepNavigationService } from '@/main/shared/flow-step-navigation.service';

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
  openCongratsDialog(step_id: number, isLastStep: boolean) {
    this.isLocked = false;
    this.flowNavService.getNextStepData(step_id)
      .subscribe( (next_step_data) => {
        console.log(next_step_data);
        if (next_step_data.data.status === LOCKED) {
          this.isLocked = true;
        }
        this.nextStepData = next_step_data.data;
        const dialogRef = this.dialog.open(CongratsDialogComponent, {
          width: '50%',
          height: '65%',
          data: {
            isLocked: this.isLocked,
            lastStep: isLastStep,
            nextStepData: this.nextStepData,
          }
        });
      });
  }


}
