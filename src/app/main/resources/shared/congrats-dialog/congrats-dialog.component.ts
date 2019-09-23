import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { LOCKED, SLIDE, CONVERSATION_GROUP, GAME, FORM, SUPPORT_GROUP } from '@/app.constants';
import { Step } from '/Users/darshittalavia/ng-treadwill-fe/src/app/main/resources/conversation-group/conversation-group-input/step.model';
import { FlowStepNavigationService } from '@/main/shared/flow-step-navigation.service';


@Component({
  selector: 'app-congrats-dialog',
  templateUrl: './congrats-dialog.component.html',
  styleUrls: ['./congrats-dialog.component.scss']
})
export class CongratsDialogComponent implements OnInit {

  nextStepData!: Step;

  constructor(
    public dialogRef: MatDialogRef<CongratsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private flowStepService: FlowStepNavigationService
  ) {  dialogRef.disableClose = true; }

  ngOnInit() {
    if (window.matchMedia('(max-width: 770px)').matches) {
      this.dialogRef.updateSize('80%', '65%');
    }
    this.nextStepData = this.data.nextStepData;
    console.log('from dialog', this.nextStepData);
  }

  onNextClicked() {
    const next_step_url = this.flowStepService.goToFlowNextStep(this.nextStepData);
    this.closeDialog();
    console.log(next_step_url);
    this.router.navigate([next_step_url]);
  }

  goToDashboard() {
    this.closeDialog();
    this.router.navigate(['/']);
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
