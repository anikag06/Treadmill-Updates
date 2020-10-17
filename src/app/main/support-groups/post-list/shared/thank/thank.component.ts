import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Optional,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReportService } from '@/main/support-groups/post-list/shared/report.service';
import { CommonService } from '@/shared/common.service';
import { UserProfileService } from '@/main/shared/user-profile/user-profile.service';
import { SUPPORT_GROUP_THANKING_SCORE } from '@/app.constants';
import { User } from '@/shared/user.model';
import { AuthService } from '@/shared/auth/auth.service';

@Component({
  selector: 'app-thank',
  templateUrl: './thank.component.html',
  styleUrls: ['./thank.component.scss'],
})
export class ThankComponent implements OnInit {
  user!: User;
  id!: number;
  thanked!: boolean;
  username!: string;
  type!: string;
  status = false;
  postType!: string;
  showLoading!: boolean;
  message!: string;

  constructor(
    public dialogRef: MatDialogRef<ThankComponent>,
    private reportService: ReportService,
    private changeDetector: ChangeDetectorRef,
    private commonService: CommonService,
    private userProfileService: UserProfileService,
    private authService: AuthService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if (data) {
      this.id = data.id;
      this.username = data.username;
      this.type = data.type;
    }
  }

  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
    this.postType = this.type;
    if (this.type === 'nestedcomment') {
      this.postType = 'reply';
    } else {
      this.postType = this.type;
    }
  }

  close() {
    this.dialogRef.close();
  }
  thank() {
    this.showLoading = true;
    if (this.type === 'post') {
      this.reportService.postThankYou(this.id).subscribe(
        () => {
          this.reportService.thanked.emit(this.id);
          this.showSucess();
          this.commonService.updateScore(SUPPORT_GROUP_THANKING_SCORE);
        },
        error => {
          this.showError();
        },
      );
    } else if (this.type === 'comment') {
      this.reportService.commentThankYou(this.id).subscribe(
        () => {
          this.reportService.commentthanked.emit(this.id);
          this.showSucess();
          this.commonService.updateScore(SUPPORT_GROUP_THANKING_SCORE);
        },
        error => {
          this.showError();
        },
      );
    } else if (this.type === 'nestedcomment') {
      this.reportService.nestedCommentThankYou(this.id).subscribe(
        () => {
          this.reportService.replythanked.emit(this.id);
          this.showSucess();
          this.commonService.updateScore(SUPPORT_GROUP_THANKING_SCORE);
        },
        error => {
          this.showError();
        },
      );
    }
  }

  showSucess() {
    this.showLoading = false;
    this.status = true;
    console.log('sucess sending thank');
    this.message =
      "We've thanked " +
      this.username +
      ' for you. You just made ' +
      this.username +
      "'s day.";
  }

  showError() {
    this.showLoading = false;
    this.status = true;
    this.message =
      "That's embarrassing... we couldn't send the message. Will you please try again later?";
  }
}
