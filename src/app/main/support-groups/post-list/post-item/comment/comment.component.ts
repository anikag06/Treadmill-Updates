import {
  Component,
  OnInit,
  Input,
  AfterContentInit,
  ViewChild,
  OnDestroy,
  Output,
  EventEmitter,
  DoCheck,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { UserComment } from './user-comment.model';
import { UserNestedComment } from '../nested-comment/nested-comment.model';
import { NetstedCommentService } from '../nested-comment/netsted-comment.service';
import { ApiResponse } from '@/main/shared/apiResponse.model';
import { NgForm } from '@angular/forms';
import { PostResponse } from '@/shared/post-response.model';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { AngularEditorConfig } from '@arkaghosh024/angular-editor';
import { CommentService } from './comment.service';
import { SanitizationService } from '@/main/shared/sanitization.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ThumbsService } from '@/main/support-groups/thumbs.service';
import { GeneralErrorService } from '@/main/shared/general-error.service';
import { UserProfile } from '@/main/shared/user-profile/UserProfile.model';
import { UserProfileService } from '@/main/shared/user-profile/user-profile.service';
import { SupportGroupsService } from '@/main/support-groups/support-groups.service';
import {
  COMMON_EDITOR_CONFIG,
  SUPPORT_GROUP_COMMENT_SCORE,
  SUPPORT_GROUP_GETTING_UP_VOTE_SCORE,
  SUPPORT_GROUP_UP_DOWN_VOTE_SCORE,
} from '@/app.constants';
import { ThankComponent } from '@/main/support-groups/post-list/shared/thank/thank.component';
import { ReportProblemComponent } from '@/main/support-groups/post-list/shared/report-problem/report-problem.component';
import { MatDialog } from '@angular/material/dialog';
import { ReportService } from '@/main/support-groups/post-list/shared/report.service';
import { CommonService } from '@/shared/common.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent
  implements OnInit, AfterContentInit, OnDestroy, DoCheck {
  upVoteFirstClick = false;
  downVoteFirstClick = false;
  nestedComments: UserNestedComment[] = [];
  hide = true;
  moreComments = false;
  toggleReply = false;
  page = 1;
  user!: User;
  editMode = false;
  disabledValue = false;
  editorBody = '';
  errors: any = [];
  editSubscription!: Subscription;
  nestedCommentSubscription!: Subscription;
  thumbsUp = '';
  thumbsDown = '';
  partialBodyLength = 200;
  partialBody = false;
  commentBody = '';
  showProfile = false;
  userProfile = new UserProfile('Name', '', 0, 0, 0, 0, [], [], []);
  firstClick = true;

  @Output() deleteEmitter = new EventEmitter<UserComment>();
  @Input() comment!: UserComment;
  @Input() srcWidth!: number;
  @ViewChild('replyForm', { static: false }) replyForm!: NgForm;
  @ViewChild('editForm', { static: false }) editForm!: NgForm;
  @ViewChild('replyText', { static: false }) replyText!: ElementRef;

  editorConfig: AngularEditorConfig = {
    ...COMMON_EDITOR_CONFIG,
    placeholder: 'Enter text here ...',
    showToolbar: true,
    height: 'auto',
    minHeight: '52px',
    maxHeight: '520px',
    width: 'auto',
    minWidth: '0',
  };

  constructor(
    private commentService: CommentService,
    private ncService: NetstedCommentService,
    private authService: AuthService,
    private sanitizer: SanitizationService,
    private thumbsService: ThumbsService,
    private errorService: GeneralErrorService,
    private changeDetector: ChangeDetectorRef,
    private userProfileService: UserProfileService,
    private sgService: SupportGroupsService,
    public dialog: MatDialog,
    private reportService: ReportService,
    private commonService: CommonService,
  ) {}

  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
    this.reportService.commentthanked.subscribe((value: number) => {
      if (this.comment.id === value) {
        this.comment.is_thanked = 1;
      }
    });
  }

  ngDoCheck() {
    this.thumbsUp = this.thumbsService.thumbsUpSrc(this.comment);
    this.thumbsDown = this.thumbsService.thumbsDownSrc(this.comment);
    if (this.replyText) {
      this.replyText.nativeElement.focus();
    }
    this.changeDetector.detectChanges();
  }

  ngAfterContentInit() {
    setTimeout(() => {
      if (
        this.comment &&
        this.comment.nested_comment_count > this.nestedComments.length
      ) {
        this.moreComments = true;
      }

      if (this.comment) {
        this.editorBody = this.comment.body;
        if (this.plainBodyLength() > this.partialBodyLength) {
          this.commentBody =
            this.sanitizer
              .stripTags(this.comment.body)
              .slice(0, this.partialBodyLength) + ' ...';
          this.partialBody = true;
        } else {
          this.commentBody = this.comment.body;
        }
      }
      try {
        this.changeDetector.detectChanges();
      } catch (ViewDestroyedError) {}
    });
  }

  ngOnDestroy() {
    if (this.editSubscription) {
      this.editSubscription.unsubscribe();
    }
    if (this.nestedCommentSubscription) {
      this.nestedCommentSubscription.unsubscribe();
    }
  }

  fetchNestedComment() {
    if (this.comment && this.moreComments) {
      this.nestedCommentSubscription = this.ncService
        .getNestedComments(this.comment, this.page)
        .subscribe(data => {
          const response = <ApiResponse>data;
          if (response.next) {
            this.moreComments = true;
            this.page += 1;
          } else {
            this.moreComments = false;
          }
          this.nestedComments.push(...(<UserNestedComment[]>response.results));
          this.changeDetector.detectChanges();
        }, this.errorService.errorResponse('Cannot fetch nested comments'));
    }
  }

  showNestedComment() {
    if (this.firstClick) {
      this.hide = false;
      this.fetchNestedComment();
      this.firstClick = false;
    }
  }

  showLessNestedComment() {
    this.hide = true;
  }

  submitReply() {
    if (this.replyForm.valid) {
      const data = {
        comment: this.comment.id,
        body: this.replyForm.value['body'],
      };
      this.ncService.postNestedComments(data).subscribe(resp => {
        this.replyForm.reset();
        this.comment.nested_comment_count += 1;
        const postResponse = <PostResponse>resp;
        const persistedNestedcomment = new UserNestedComment(
          postResponse.data.id,
          data.body,
          0,
          this.user,
          0,
          new Date().toISOString(),
        );
        const updatedNestedComment = new UserNestedComment(
          persistedNestedcomment.id,
          persistedNestedcomment.body,
          persistedNestedcomment.up_votes,
          {
            username: persistedNestedcomment.user.username,
            avatar: this.sgService.userProfileData.user_avatar,
            score: this.sgService.userProfileData.score,
            no_of_gold_badges: this.sgService.userProfileData.no_of_gold_badges,
            no_of_bronze_badges: this.sgService.userProfileData
              .no_of_bronze_badges,
            no_of_silver_badges: this.sgService.userProfileData
              .no_of_silver_badges,
          },
          persistedNestedcomment.is_voted,
          persistedNestedcomment.created_at,
          persistedNestedcomment.is_thanked,
        );
        this.nestedComments.push(updatedNestedComment);
        this.toggleReply = false;
        this.showNestedComment();
        this.changeDetector.detectChanges();
        this.commonService.updateScore(SUPPORT_GROUP_COMMENT_SCORE);
      });
    }
  }

  onEdit() {
    this.editMode = true;
    this.toggleReply = false;
  }

  onSubmit() {
    if (
      this.editForm.valid &&
      this.sanitizer.stripTags(this.editorBody).length > 0
    ) {
      const updatedCommentBody = this.sanitizer.sanitizeHtml(this.editorBody);
      this.editSubscription = this.commentService
        .updateComment(this.comment.id, updatedCommentBody)
        .subscribe(
          data => {
            this.comment.body = updatedCommentBody;
            this.comment = { ...this.comment };
            this.editMode = false;
            this.commentBody = updatedCommentBody;
            this.changeDetector.detectChanges();
          },
          (error: HttpErrorResponse) => {
            this.errors = [];
            this.errors.push({ name: 'comment', value: error.message });
          },
        );
    } else {
      this.errors = [];
      this.errors.push({ name: 'comment', value: 'the comment is missing' });
    }
  }

  onDelete() {
    if (confirm('Sure you want to delete this comment?')) {
      this.commentService.deleteComment(this.comment.id).subscribe(() => {
        this.deleteEmitter.emit(this.comment);
      }, this.errorService.errorResponse('Cannot Delete'));
    }
  }

  onCancel() {
    if (confirm('Sure you want to close the editor?')) {
      this.editMode = false;
    }
  }

  onNestedCommentDelete(userNestedComment: UserNestedComment) {
    this.ncService.deleteNestedComment(userNestedComment.id).subscribe(() => {
      UserNestedComment.prototype.up_votes = 10;
      this.nestedComments = this.nestedComments.filter(
        nc => nc.id !== userNestedComment.id,
      );
      this.changeDetector.detectChanges();
    }, this.errorService.errorResponse('Cannot delete'));
  }

  /**
   * Upvote
   */
  onThumbsUp() {
    if (!this.ownComment()) {
      const preVote = this.comment.is_voted;
      const preUpVote = this.comment.up_votes;
      if (this.comment.is_voted === 1) {
        this.comment.up_votes -= 1;
        this.comment.is_voted = 0;
      } else {
        this.comment.up_votes += 1;
        this.comment.is_voted = 1;
      }
      this.commentService
        .voteComment({
          comment_id: this.comment.id,
          vote: this.comment.is_voted,
        })
        .subscribe(
          () => {
            if (!this.upVoteFirstClick && this.comment.is_voted === 1) {
              this.upVoteFirstClick = true;
              this.commonService.updateScore(SUPPORT_GROUP_UP_DOWN_VOTE_SCORE);
              this.commonService
                .postScoreForOther(
                  SUPPORT_GROUP_GETTING_UP_VOTE_SCORE,
                  this.comment.user.username,
                )
                .subscribe(() => {});
            }
          },
          () => {
            this.comment.is_voted = preVote;
            this.comment.up_votes = preUpVote;
          },
        );
    } else {
      this.thumbsService.openSnackBar(
        "You can't vote on your own comment",
        'Ok',
      );
    }
  }

  onThumbsDown() {
    if (!this.ownComment()) {
      if (this.comment.is_voted === 1) {
        this.comment.up_votes -= 1;
        this.comment.is_voted = -1;
      } else if (this.comment.is_voted === 0) {
        this.comment.is_voted = -1;
      } else {
        this.comment.is_voted = 0;
      }
      this.commentService
        .voteComment({
          comment_id: this.comment.id,
          vote: this.comment.is_voted,
        })
        .subscribe(() => {
          if (
            !this.downVoteFirstClick &&
            !this.upVoteFirstClick &&
            this.comment.is_voted !== -1
          ) {
            this.downVoteFirstClick = true;
            this.commonService.updateScore(SUPPORT_GROUP_UP_DOWN_VOTE_SCORE);
          }
        }, this.errorService.errorResponse('Cannot down vote'));
    } else {
      this.thumbsService.openSnackBar(
        "You can't vote on your own comment",
        'Ok',
      );
    }
  }

  onReplyClick() {
    this.toggleReply = !this.toggleReply;
    this.editMode = false;
  }

  plainBodyLength() {
    return this.sanitizer.stripTags(this.comment.body).length;
  }

  toggleToFullBody() {
    this.commentBody = this.comment.body;
    this.partialBody = false;
  }
  /**
   * If the comment is made by the same user
   */
  ownComment() {
    // checking for case-insensitive string comparison
    return (
      this.user.username.localeCompare(this.comment.user.username, undefined, {
        sensitivity: 'base',
      }) === 0
    );
  }

  onCommentShowProfile(username: string) {
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
          id: this.comment.id,
          username: this.comment.user.username,
          type: 'comment',
        },
        autoFocus: false,
      });
    } else {
      this.dialog.open(ThankComponent, {
        height: '320px',
        width: '440px',
        data: {
          id: this.comment.id,
          username: this.comment.user.username,
          type: 'comment',
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
          id: this.comment.id,
          problem: false,
          suicide: true,
          type: 'comment',
        },
        autoFocus: false,
      });
    } else {
      this.dialog.open(ReportProblemComponent, {
        height: '320px',
        width: '440px',
        data: {
          id: this.comment.id,
          problem: false,
          suicide: true,
          type: 'comment',
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
          id: this.comment.id,
          problem: true,
          suicide: false,
          type: 'comment',
        },
        autoFocus: false,
      });
    } else {
      this.dialog.open(ReportProblemComponent, {
        height: '320px',
        width: '440px',
        data: {
          id: this.comment.id,
          problem: true,
          suicide: false,
          type: 'comment',
        },
        autoFocus: false,
      });
    }
  }
}
