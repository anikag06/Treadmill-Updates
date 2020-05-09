import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { FlowStepNavigationService } from '@/main/shared/flow-step-navigation.service';


@Component({
  selector: 'app-congrats-dialog',
  templateUrl: './congrats-dialog.component.html',
  styleUrls: ['./congrats-dialog.component.scss']
})
export class CongratsDialogComponent implements OnInit {

  nextStepData!: any;
  unLockTime!: any;
  badge_img_src = '../../../../../assets/shared/thumb.svg';
  img_src = '../../../../../assets/modules/sparkle_background.png';
  showBadge = false;
  badgeName!: string;
  badgeInfo!: string;
  navigate_to!: any;

  constructor(
    public dialogRef: MatDialogRef<CongratsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private flowStepService: FlowStepNavigationService
  ) {  dialogRef.disableClose = true; }

  ngOnInit() {
    this.navigate_to = 'Go to dashboard';
    if (window.matchMedia('(max-width: 770px)').matches) {
      this.dialogRef.updateSize('80%', '65%');
    }
    this.nextStepData = this.data.nextStepData;
    if (this.data.isLastStep) {
      this.badge_img_src = this.data.badgeData.image;
      console.log('badge details', this.data);
      this.showBadge = true;
      this.badgeName = this.data.badgeData.name;
      this.badgeInfo = this.data.badgeData.description;
      if (this.data.isLocked) {
        this.unLockTime = this.nextStepData.next_step_group_unlock_time;
        const convertedDateString = this.unLockTime.toLocaleString();
        this.unLockTime = new Date(convertedDateString);
        console.log('UNLOCK TIME', this.nextStepData);
      }
    }
  }

  onNextClicked() {
    const next_step_url = this.flowStepService.goToFlowNextStep(this.nextStepData);
    this.flowStepService.virtualStepMarkDone(this.nextStepData, this.data.time_spent);
    this.closeDialog();
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
