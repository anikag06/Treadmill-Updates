import {
  Component,
  OnInit,
  Input,
  AfterContentInit,
  ViewChild,
  Output,
  EventEmitter,
  DoCheck,
  ChangeDetectorRef,
} from '@angular/core';
import { UserNestedComment } from './nested-comment.model';
import { NetstedCommentService } from './netsted-comment.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { ThumbsService } from '@/main/support-groups/thumbs.service';
import { GeneralErrorService } from '@/main/shared/general-error.service';
import { UserProfile } from '@/main/shared/user-profile/UserProfile.model';
import { UserProfileService } from '@/main/shared/user-profile/user-profile.service';
import { ThankComponent } from '@/main/support-groups/post-list/shared/thank/thank.component';
import { ReportProblemComponent } from '@/main/support-groups/post-list/shared/report-problem/report-problem.component';
import { MatDialog } from '@angular/material/dialog';
import { ReportService } from '@/main/support-groups/post-list/shared/report.service';
import { CommonService } from '@/shared/common.service';
import {
  SUPPORT_GROUP_COMMENT_SCORE,
  SUPPORT_GROUP_GETTING_UP_VOTE_SCORE,
  SUPPORT_GROUP_UP_DOWN_VOTE_SCORE,
} from '@/app.constants';

@Component({
  selector: 'app-nested-comment',
  templateUrl: './nested-comment.component.html',
  styleUrls: ['./nested-comment.component.scss'],
})
export class NestedCommentComponent
  implements OnInit, AfterContentInit, DoCheck {
  @Input() userNestedComment!: UserNestedComment;
  @Input() srcWidth!: number;
  @Output() deleteEmitter = new EventEmitter<UserNestedComment>();
  @ViewChild('replyForm', { static: false }) replyForm = NgForm;
  upVoteFirstClick = false;
  downVoteFirstClick = false;
  body = '';
  editMode = false;
  user!: User;
  submitting = false;
  thumbsUp = '';
  thumbsDown = '';
  showProfile = false;
  userProfile = new UserProfile('Name', '', 0, 0, 0, 0, [], [], []);

  constructor(
    private ncService: NetstedCommentService,
    private authService: AuthService,
    private thumbsService: ThumbsService,
    private errorService: GeneralErrorService,
    private changeDetector: ChangeDetectorRef,
    private userProfileService: UserProfileService,
    public dialog: MatDialog,
    private reportService: ReportService,
    private commonService: CommonService,
  ) {}

  /**
   * Lifecycle hook on init
   */
  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
    this.reportService.replythanked.subscribe((value: number) => {
      if (this.userNestedComment.id === value) {
        this.userNestedComment.is_thanked = 1;
      }
    });
  }

  /**
   * Lifecycle hook initialize body to comments body
   */
  ngAfterContentInit() {
    this.body = this.userNestedComment.body;
  }

  ngDoCheck() {
    if (this.userNestedComment) {
      this.thumbsUp = this.thumbsService.thumbsUpSrc(this.userNestedComment);
      this.thumbsDown = this.thumbsService.thumbsDownSrc(
        this.userNestedComment,
      );
    }
    this.changeDetector.detectChanges();
  }

  /**
   * On Edit button clicked
   */
  onEdit() {
    this.editMode = true;
  }

  /**
   * On Form Submit
   */
  submitReply() {
    if (this.body.trim().length > 0) {
      this.submitting = true;
      this.ncService
        .editNestedComment(this.userNestedComment.id, this.body)
        .subscribe(
          (data: any) => {
            this.editMode = false;
            this.userNestedComment = {
              ...this.userNestedComment,
              body: this.body,
            };
            this.submitting = false;
            this.changeDetector.detectChanges();
            this.commonService.updateScore(SUPPORT_GROUP_COMMENT_SCORE);
          },
          (error: HttpErrorResponse) => {
            this.errorService.openErrorDialog('Cannot add reply');
            this.submitting = false;
          },
        );
    }
  }

  /**
   * When editing cancel
   */
  onCancel() {
    if (confirm('Are you sure to cancel ?')) {
      this.editMode = false;
    }
  }

  /**
   * On Delete
   */
  onDelete() {
    if (confirm('Are you sure to delete this comment ?')) {
      this.deleteEmitter.emit(this.userNestedComment);
    }
  }

  /**
   * Upvote
   */
  onThumbsUp() {
    if (!this.ownComment()) {
      const preVote = this.userNestedComment.is_voted;
      const preUpVote = this.userNestedComment.up_votes;
      if (this.userNestedComment.is_voted === 1) {
        this.userNestedComment.up_votes -= 1;
        this.userNestedComment.is_voted = 0;
      } else {
        this.userNestedComment.up_votes += 1;
        this.userNestedComment.is_voted = 1;
      }
      this.ncService
        .voteComment({
          nested_comment_id: this.userNestedComment.id,
          vote: this.userNestedComment.is_voted,
        })
        .subscribe(
          () => {
            if (
              !this.upVoteFirstClick &&
              !this.downVoteFirstClick &&
              this.userNestedComment.is_voted !== -1
            ) {
              this.upVoteFirstClick = true;
              this.commonService.updateScore(SUPPORT_GROUP_UP_DOWN_VOTE_SCORE);
              this.commonService.postScoreForOther(
                SUPPORT_GROUP_GETTING_UP_VOTE_SCORE,
                this.userNestedComment.user.username,
              );
            }
          },
          () => {
            this.errorService.openErrorDialog('Cannot Upvote');
            this.userNestedComment.is_voted = preVote;
            this.userNestedComment.up_votes = preUpVote;
          },
        );
    } else {
      this.thumbsService.openSnackBar("You can't vote on your own reply", 'Ok');
    }
  }

  /**
   * DownVote
   */
  onThumbsDown() {
    if (!this.ownComment()) {
      if (this.userNestedComment.is_voted === 1) {
        this.userNestedComment.up_votes -= 1;
        this.userNestedComment.is_voted = -1;
      } else if (this.userNestedComment.is_voted === 0) {
        this.userNestedComment.is_voted = -1;
      } else {
        this.userNestedComment.is_voted = 0;
      }
      this.ncService
        .voteComment({
          nested_comment_id: this.userNestedComment.id,
          vote: this.userNestedComment.is_voted,
        })
        .subscribe(
          () => {
            if (
              !this.downVoteFirstClick &&
              !this.upVoteFirstClick &&
              this.userNestedComment.is_voted !== -1
            ) {
              this.downVoteFirstClick = true;
              this.commonService.updateScore(SUPPORT_GROUP_UP_DOWN_VOTE_SCORE);
            }
          },
          () => {
            this.errorService.openErrorDialog('Cannot down vote');
          },
        );
    } else {
      this.thumbsService.openSnackBar("You can't vote on your own reply", 'Ok');
    }
  }

  onNestedCommentShowProfile(username: string) {
    this.userProfileService.getUserProfile(username).subscribe(profile => {
      this.userProfile = new UserProfile(
        profile.username,
        profile.user_avatar,
        profile.score,
        profile.no_of_bronze_badges,
        profile.no_of_silver_badges,
        profile.no_of_gold_badges,
        profile.badge_list_bronze,
        profile.badge_list_silver,
        profile.badge_list_gold,
      );
    });
    this.showProfile = !this.showProfile;
  }

  /**
   * If the comment is made by the same user
   */
  ownComment() {
    return this.user.username === this.userNestedComment.user.username;
  }

  onClickOutside(event: Object) {
    if (event && (<any>event)['value'] === true) {
      this.showProfile = false;
    }
  }
  onThankYou() {
    this.openThankDialog();
  }

  onReportSuicide() {
    this.reportSuicide();
  }

  onReportProblem() {
    this.reportProblem();
  }
  openThankDialog() {
    if (this.srcWidth <= 576) {
      this.dialog.open(ThankComponent, {
        maxWidth: '90vw',
        height: '287px',
        width: '320px',
        data: {
          id: this.userNestedComment.id,
          username: this.userNestedComment.user.username,
          type: 'nestedcomment',
        },
        autoFocus: false,
      });
    } else {
      this.dialog.open(ThankComponent, {
        height: '320px',
        width: '440px',
        data: {
          id: this.userNestedComment.id,
          username: this.userNestedComment.user.username,
          type: 'nestedcomment',
        },
        autoFocus: false,
      });
    }
  }
  reportSuicide() {
    if (this.srcWidth <= 576) {
      this.dialog.open(ReportProblemComponent, {
        maxWidth: '90vw',
        height: '287px',
        width: '320px',
        data: {
          id: this.userNestedComment.id,
          problem: false,
          suicide: true,
          type: 'nestedcomment',
        },
        autoFocus: false,
      });
    } else {
      this.dialog.open(ReportProblemComponent, {
        height: '320px',
        width: '440px',
        data: {
          id: this.userNestedComment.id,
          problem: false,
          suicide: true,
          type: 'nestedcomment',
        },
        autoFocus: false,
      });
    }
  }
  reportProblem() {
    if (this.srcWidth <= 576) {
      this.dialog.open(ReportProblemComponent, {
        maxWidth: '90vw',
        height: '287px',
        width: '320px',
        data: {
          id: this.userNestedComment.id,
          problem: true,
          suicide: false,
          type: 'nestedcomment',
        },
        autoFocus: false,
      });
    } else {
      this.dialog.open(ReportProblemComponent, {
        height: '320px',
        width: '440px',
        data: {
          id: this.userNestedComment.id,
          problem: true,
          suicide: false,
          type: 'nestedcomment',
        },
        autoFocus: false,
      });
    }
  }
}
