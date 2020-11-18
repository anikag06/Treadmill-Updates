import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { FlowStepNavigationService } from '@/main/shared/flow-step-navigation.service';
import { FlowService } from '@/main/flow/flow.service';
import { NavbarGoToService } from '@/main/shared/navbar/navbar-go-to.service';

@Component({
  selector: 'app-congrats-dialog',
  templateUrl: './congrats-dialog.component.html',
  styleUrls: ['./congrats-dialog.component.scss'],
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
  showNextStepBtn = false;

  constructor(
    public dialogRef: MatDialogRef<CongratsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private flowStepService: FlowStepNavigationService,
    private flowService: FlowService,
    private goToService: NavbarGoToService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.nextStepData = this.data.nextStepData;
    if (this.data.isLastStep) {
      this.navigate_to = 'Go to dashboard';
      this.badge_img_src = this.data.badgeData.image;
      console.log('badge details', this.data);
      this.showBadge = true;
      this.badgeName = this.data.badgeData.name;
      this.badgeInfo = this.data.badgeData.description;
      if (!this.data.isLocked) {
        this.unLockTime = this.nextStepData.next_step_group_unlock_time;
        const convertedDateString = this.unLockTime.toLocaleString();
        this.unLockTime = new Date(convertedDateString);
        console.log('UNLOCK TIME', this.nextStepData);
      }
    } else if (this.data.isLastModule) {
      this.navigate_to = 'Next step';
      this.badge_img_src = this.data.badgeData.image;
      console.log('badge details', this.data);
      this.showBadge = true;
      this.badgeName = this.data.badgeData.name;
      this.badgeInfo = this.data.badgeData.description;
      this.showNextStepBtn = true;
    }
    this.flowService.showDashboardButton.emit();
  }

  goToDashboard() {
    if (this.data.isLastStep) {
      if (this.data.fromIntro) {
        this.flowService.stepCompleted = true;
        this.flowService.introduceBehaviour.next(false);
        this.flowService.triggerLoad();
        this.closeDialog();
      } else {
        this.closeDialog();
        this.router.navigate(['/']);
      }
    } else if (this.data.isLastModule) {
      this.closeDialog();
    }
  }
  closeDialog() {
    this.dialogRef.close();
    if (this.data.isLastModule) {
      this.goToService.clickFlow.emit();
    }
  }
}
