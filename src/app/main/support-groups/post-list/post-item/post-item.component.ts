import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnDestroy,
  AfterViewInit,
  AfterContentInit,
  Output,
  EventEmitter,
  DoCheck,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import { Tag } from '@/main/shared/tag.model';
import { NgForm } from '@angular/forms';
import { SupportGroupItem } from '../../support-group-item.model';
import { CommentService } from '@/main/support-groups/post-list/post-item/comment/comment.service';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { UserComment } from './comment/user-comment.model';
import { Subscription } from 'rxjs';
import { ApiResponse } from '@/main/shared/apiResponse.model';
import { SanitizationService } from '../../../shared/sanitization.service';
import { AngularEditorConfig } from '@arkaghosh024/angular-editor';
import { SupportGroupsService } from '../../support-groups.service';
import { ThumbsService } from '../../thumbs.service';
import { GeneralErrorService } from '@/main/shared/general-error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserProfile } from '../../../shared/user-profile/UserProfile.model';
import { UserProfileService } from '../../../shared/user-profile/user-profile.service';
import {
  COMMON_EDITOR_CONFIG,
  SUPPORT_GROUP_COMMENT_SCORE,
  SUPPORT_GROUP_GETTING_UP_VOTE_SCORE,
  SUPPORT_GROUP_UP_DOWN_VOTE_SCORE,
} from '@/app.constants';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { ThankComponent } from '../shared/thank/thank.component';
import { ReportProblemComponent } from '../shared/report-problem/report-problem.component';
import { MatDialog } from '@angular/material/dialog';
import { ReportService } from '@/main/support-groups/post-list/shared/report.service';
import { CongratsDialogComponent } from '@/main/resources/shared/congrats-dialog/congrats-dialog.component';
import { CommonService } from '@/shared/common.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostItemComponent
  implements OnInit, DoCheck, OnDestroy, AfterContentInit, AfterViewInit {
  @Input() supportGroupItem!: SupportGroupItem;
  @Input() newPost!: boolean;
  @Input() srcWidth!: number;
  @ViewChild('mainComment', { static: true }) commentForm!: NgForm;
  @ViewChild('htmlDiv', { static: true }) htmlDiv!: ElementRef;
  @Output() deleteEvent = new EventEmitter<SupportGroupItem>();
  @Output() editEvent = new EventEmitter<SupportGroupItem>();
  @Output() tagClick = new EventEmitter<string>();
  // @ViewChild('el', { static: true }) el!: ElementRef;
  upVoteFirstClick = false;
  downVoteFirstClick = false;
  // thumbsUpClicked = false;
  tags: Tag[] = []; // Holds all the tags
  user!: User; // Current User
  commentsPage = 1; // Holds the pagination for comments
  moreComments = false; // If there are any more comments
  initial = true; // Initial state of comment
  comments: UserComment[] = []; // All comments
  postCommentSubscription!: Subscription; // Subscription for posting comments
  getCommentsSubscription!: Subscription; // Subscription for get comments
  minBodyLength = 300; // Minimmum body length for text wrapping
  showFullContent = false; // Wheter to show full body or not
  body = ''; // Holds html value for the post body
  disabledValue = false; // Comment posting
  thumbsUp = '';
  thumbsDown = '';
  commentNos = 1;
  showProfile = false;
  userProfile = new UserProfile('Name', '', 0, 0, 0, 0, [], [], []);
  thanked = false;
  userProfileData = new UserProfile('Name', '', 0, 0, 0, 0);

  editorConfig: AngularEditorConfig = {
    ...COMMON_EDITOR_CONFIG,
    placeholder: 'Enter text here ...',
    showToolbar: false,
    height: 'auto',
    minHeight: '52px',
    maxHeight: '520px',
    width: 'auto',
    minWidth: '0',
  };

  /*
   * Injects CommnetService, AuthService and SanitizationService
   */
  constructor(
    private sgService: SupportGroupsService,
    private commentService: CommentService,
    private authService: AuthService,
    private sanititzationService: SanitizationService,
    private thumbsService: ThumbsService,
    private errorService: GeneralErrorService,
    private changeDetector: ChangeDetectorRef,
    private userProfileService: UserProfileService,
    public dialog: MatDialog,
    private reportService: ReportService,
    private commonService: CommonService,
  ) {}

  /*
   * Angular Lifecycle hookup this is hack to check for updated content
   */
  ngDoCheck(): void {
    if (
      this.newPost ||
      this.plainBodyLength() < this.minBodyLength ||
      this.showFullContent
    ) {
      this.body = this.supportGroupItem.body;
      this.htmlDiv.nativeElement.style.display = 'block';
    } else {
      this.body = this.slicedBody();
      this.htmlDiv.nativeElement.style.display = 'inline';
    }
    this.thumbsUp = this.thumbsService.thumbsUpSrc(this.supportGroupItem);
    this.thumbsDown = this.thumbsService.thumbsDownSrc(this.supportGroupItem);
    this.changeDetector.detectChanges();
  }

  /**
   * Gets the loggedIn user
   */
  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
    // this.userProfileService.getUserProfile(this.user.username).subscribe(profile => {
    //   this.userProfileData = new UserProfile(
    //     profile.username,
    //     profile.user_avatar,
    //     profile.score,
    //     profile.no_of_bronze_badges,
    //     profile.no_of_silver_badges,
    //     profile.no_of_gold_badges);
    // });
    this.reportService.thanked.subscribe((value: number) => {
      if (this.supportGroupItem.id === value) {
        this.supportGroupItem.is_thanked = 1;
      }
    });
  }

  /**
   * If the post is a new post expand its body by default
   */
  ngAfterContentInit(): void {
    setTimeout(() => {
      if (this.newPost || this.plainBodyLength() < this.minBodyLength) {
        this.body = this.supportGroupItem.body;
        this.htmlDiv.nativeElement.style.display = 'block';
      } else {
        this.body = this.slicedBody();
        this.htmlDiv.nativeElement.style.display = 'inline';
      }
      try {
        this.changeDetector.detectChanges();
      } catch (ViewDestroyedError) {}
    });
  }

  /**
   * Lifecycle hook fetch all of the comments
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this.fetchComments();
      try {
        this.changeDetector.detectChanges();
      } catch (ViewDestroyedError) {}
    });
  }

  /**
   * Lifecycle hook to unsubscribe from subscriptions
   */
  ngOnDestroy() {
    if (this.postCommentSubscription) {
      this.postCommentSubscription.unsubscribe();
    }
    if (this.getCommentsSubscription) {
      this.getCommentsSubscription.unsubscribe();
    }
  }

  /**
   * Action to be performed when form submit
   */
  onSubmit() {
    if (
      this.commentForm.valid &&
      this.sanititzationService.stripTags(this.commentForm.value['name'])
        .length > 0
    ) {
      this.disabledValue = true;
      const comment = {
        post_id: this.supportGroupItem.id,
        body: this.commentForm.value['name'],
      };
      this.postCommentSubscription = this.commentService
        .postComment(comment)
        .subscribe(
          (commentResponse: any) => {
            const persistedComment = new UserComment(
              commentResponse.data.comment_id,
              {
                username: this.user.username,
              },
              comment.body,
              0,
              0,
              new Date().toISOString(),
              0,
            );
            const updatedComment = new UserComment(
              persistedComment.id,
              {
                username: persistedComment.user.username,
                avatar: this.sgService.userProfileData.user_avatar,
                score: this.sgService.userProfileData.score,
                no_of_gold_badges: this.sgService.userProfileData
                  .no_of_gold_badges,
                no_of_bronze_badges: this.sgService.userProfileData
                  .no_of_bronze_badges,
                no_of_silver_badges: this.sgService.userProfileData
                  .no_of_silver_badges,
              },
              persistedComment.body,
              persistedComment.up_votes,
              persistedComment.nested_comment_count,
              persistedComment.created_at,
              persistedComment.is_voted,
            );
            this.supportGroupItem.comments_count += 1;
            this.commentForm.reset();
            this.initial = false;
            this.disabledValue = false;
            this.editorConfig.showToolbar = false;
            this.comments.push(updatedComment);
            this.commentNos = this.comments.length;
            this.changeDetector.detectChanges();
            // if (this.thumbsService.isClicked) {
            // this.postOldScore = +this.userProfileService.getScoreValue();
            this.commonService.updateScore(SUPPORT_GROUP_COMMENT_SCORE);
            // }
          },
          (error: HttpErrorResponse) => {
            this.errorService.openErrorDialog(
              error.statusText + ' ' + 'Could not submit post',
            );
          },
        );
    }
  }

  /**
   * To fetch comments on posts
   */
  fetchComments() {
    if (this.supportGroupItem) {
      this.getCommentsSubscription = this.commentService
        .getMainComments(this.supportGroupItem, this.commentsPage)
        .subscribe(data => {
          const apiResponse = <ApiResponse>data;
          if (apiResponse.next) {
            this.commentsPage += 1;
            this.moreComments = true;
          } else {
            this.moreComments = false;
          }
          if (apiResponse.results.length > 0) {
            this.comments.push(...(<UserComment[]>apiResponse.results));
            if (this.initial === false) {
              this.commentNos = this.comments.length;
            }
          }
        }, this.errorService.errorResponse('Cannot fetch comments'));
    }
  }

  /**
   * Fetch new comments or show existing hidden comments
   */
  fetchOrShowComments() {
    if (this.initial) {
      this.initial = false;
      this.commentNos = this.comments.length;
    } else if (this.moreComments) {
      this.fetchComments();
    }
    this.changeDetector.detectChanges();
  }

  /**
   * Whether to show more button
   */
  showLoadMore() {
    return (this.initial && this.comments.length > 1) || this.moreComments;
  }

  /**
   * Initial State (Deprecated)
   */
  makeInitial() {
    this.initial = true;
  }

  /**
   * Whether to show less comments or not (Deprecated)
   */
  showLessComments() {
    return this.initial === false && this.comments.length > 1;
  }

  /**
   * Show Full body
   */
  toggleShow() {
    this.showFullContent = true;
    this.body = this.supportGroupItem.body;
    this.htmlDiv.nativeElement.style.display = 'block';
  }

  /**
   * Show sliced body
   */
  slicedBody() {
    return this.sanititzationService.stripTags(
      this.supportGroupItem.body.slice(0, this.minBodyLength) + '...',
    );
  }

  /**
   * On Delete emit the item so that it can be removed form the list
   */
  onDelete() {
    if (confirm('Are you sure to delete this post ?')) {
      this.deleteEvent.emit(this.supportGroupItem);
    }
  }

  /**
   * When clicked on Edit emit the supportgroup so that it can be picked up create post component
   */
  onEdit() {
    this.editEvent.emit(this.supportGroupItem);
    this.showFullContent = false;
    this.toggleShow();
  }

  /**
   * If the post is made by the same user
   */
  ownPost() {
    return this.user.username === this.supportGroupItem.user.username;
  }

  /**
   * Show toolbar on focus
   */
  onFocus(event: FocusEvent) {
    this.editorConfig.showToolbar = true;
  }

  /**
   * Minimize the toolbar and comment button on focus out
   * @param event
   */
  onFocusOut(event: FocusEvent) {
    const el = <Element>event.relatedTarget;
    if (el == null) {
      this.editorConfig.showToolbar = false;
    } else if (el.matches('button.comment-btn.mat-raised-button')) {
      this.onSubmit();
      this.editorConfig.showToolbar = false;
    } else if (
      el.innerHTML !== 'Comment' &&
      !el.matches('button.angular-editor-button')
    ) {
    }
  }

  /**
   * Calculate the length of the body
   */
  plainBodyLength(): number {
    return this.sanititzationService.stripTags(this.supportGroupItem.body)
      .length;
  }

  /**
   * Delete Users comment
   * @param userComment
   */
  onCommentDelete(userComment: UserComment) {
    this.supportGroupItem.comments_count -= 1;
    this.comments = this.comments.filter(uc => uc.id !== userComment.id);
    try {
      this.changeDetector.detectChanges();
    } catch (ViewDestroyedError) {}
  }

  /**
   * Upvote
   */
  onThumbsUp() {
    if (!this.ownPost()) {
      const preVote = this.supportGroupItem.is_voted;
      const preUpVote = this.supportGroupItem.up_votes;
      if (this.supportGroupItem.is_voted === 1) {
        this.supportGroupItem.up_votes -= 1;
        this.supportGroupItem.is_voted = 0;
      } else {
        this.supportGroupItem.up_votes += 1;
        this.supportGroupItem.is_voted = 1;
      }
      this.sgService
        .postUpVote({
          post_id: this.supportGroupItem.id,
          vote: this.supportGroupItem.is_voted,
        })
        .subscribe(
          () => {
            if (
              !this.upVoteFirstClick &&
              !this.downVoteFirstClick &&
              this.supportGroupItem.is_voted !== -1
            ) {
              this.upVoteFirstClick = true;
              this.commonService.updateScore(SUPPORT_GROUP_UP_DOWN_VOTE_SCORE);
              this.commonService.postScoreForOther(
                SUPPORT_GROUP_GETTING_UP_VOTE_SCORE,
                this.supportGroupItem.user.username,
              );
            }
          },
          () => {
            this.errorService.openErrorDialog('Cannot upvote');
            this.supportGroupItem.is_voted = preVote;
            this.supportGroupItem.up_votes = preUpVote;
          },
        );
    } else {
      this.thumbsService.openSnackBar("You can't vote on your own post", 'Ok');
    }
  }

  /**
   * DownVote
   */
  onThumbsDown() {
    if (!this.ownPost()) {
      if (this.supportGroupItem.is_voted === 1) {
        this.supportGroupItem.up_votes -= 1;
        this.supportGroupItem.is_voted = -1;
      } else if (this.supportGroupItem.is_voted === 0) {
        this.supportGroupItem.is_voted = -1;
      } else {
        this.supportGroupItem.is_voted = 0;
      }
      this.sgService
        .postUpVote({
          post_id: this.supportGroupItem.id,
          vote: this.supportGroupItem.is_voted,
        })
        .subscribe(() => {
          if (
            !this.downVoteFirstClick &&
            !this.upVoteFirstClick &&
            this.supportGroupItem.is_voted !== -1
          ) {
            this.downVoteFirstClick = true;
            this.commonService.updateScore(SUPPORT_GROUP_UP_DOWN_VOTE_SCORE);
          }
        }, this.errorService.errorResponse('Cannot downvote'));
    } else {
      this.thumbsService.openSnackBar("You can't vote on your own post", 'Ok');
    }
  }

  onThankYou() {
    this.openThankDialog();
    // this.supportGroupItem.is_thanked = 1;
  }

  onReportSuicide() {
    this.reportSuicide();
  }

  onReportProblem() {
    this.reportProblem();
  }
  onTagClick(tag: Tag) {
    this.tagClick.emit(tag.name);
  }

  onShowProfile(username: string) {
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
  openThankDialog() {
    if (this.srcWidth <= 576) {
      this.dialog.open(ThankComponent, {
        maxWidth: '90vw',
        height: '287px',
        width: '320px',
        data: {
          id: this.supportGroupItem.id,
          username: this.supportGroupItem.user.username,
          type: 'post',
        },
        autoFocus: false,
      });
    } else {
      this.dialog.open(ThankComponent, {
        height: '320px',
        width: '440px',
        data: {
          id: this.supportGroupItem.id,
          username: this.supportGroupItem.user.username,
          type: 'post',
        },
        autoFocus: false,
      });
    }
  }
  reportSuicide() {
    if (this.srcWidth <= 576) {
      this.dialog.open(ReportProblemComponent, {
        height: '287px',
        width: '320px',
        maxWidth: '90vw',
        data: {
          id: this.supportGroupItem.id,
          problem: false,
          suicide: true,
          type: 'post',
        },
        autoFocus: false,
      });
    } else {
      this.dialog.open(ReportProblemComponent, {
        height: '320px',
        width: '440px',
        data: {
          id: this.supportGroupItem.id,
          problem: false,
          suicide: true,
          type: 'post',
        },
        autoFocus: false,
      });
    }
  }
  reportProblem() {
    if (this.srcWidth <= 576) {
      this.dialog.open(ReportProblemComponent, {
        height: '287px',
        width: '320px',
        maxWidth: '90vw',
        data: {
          id: this.supportGroupItem.id,
          problem: true,
          suicide: false,
          type: 'post',
        },
        autoFocus: false,
      });
    } else {
      this.dialog.open(ReportProblemComponent, {
        height: '320px',
        width: '440px',
        data: {
          id: this.supportGroupItem.id,
          problem: true,
          suicide: false,
          type: 'post',
        },
        autoFocus: false,
      });
    }
  }
}
