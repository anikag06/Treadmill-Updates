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
  Renderer2
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
import { SanitizationService } from '../../sanitization.service';
import { AngularEditorConfig } from '@xw19/angular-editor';
import { SupportGroupsService } from '../../support-groups.service';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '@/shared/error-dialog/error-dialog.component';
import { ThumbsService } from '../../thumbs.service';
import { ViewEncapsulation } from '@angular/compiler/src/core';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnInit, DoCheck, OnDestroy, AfterContentInit, AfterViewInit {

  @Input() supportGroupItem!: SupportGroupItem;
  @Input() newPost!: boolean;
  @ViewChild('mainComment') commentForm!: NgForm;
  @ViewChild('htmlDiv') htmlDiv!: ElementRef;
  @Output() deleteEvent = new EventEmitter<SupportGroupItem>();
  @Output() editEvent = new EventEmitter<SupportGroupItem>();

  tags: Tag[] = [];                                                           // Holds all the tags
  user!: User;                                                                // Current User
  commentsPage = 1;                                                           // Holds the pagination for comments
  moreComments = false;                                                       // If there are any more comments
  initial = true;                                                             // Initial state of comment
  comments: UserComment[] = [];                                               // All comments
  postCommentSubscription!: Subscription;                                     // Subscription for posting comments
  getCommentsSubscription!: Subscription;                                     // Subscription for get comments
  minBodyLength = 300;                                                        // Minimmum body length for text wrapping
  showFullContent = false;                                                    // Wheter to show full body or not
  body = '';                                                                  // Holds html value for the post body
  disabledValue = false;                                                    // Comment posting
  thumbsUp = '';
  thumbsDown = '';
  toggler!: ElementRef;
  commentNos = 1;


  editorConfig: AngularEditorConfig = {                                       // Angular Editor Config
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '52px',
    maxHeight: '520px',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: false,
    placeholder: 'Comment...',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'lato',
    defaultFontSize: '14',
    fonts: [],
    uploadUrl: '',
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
    private dialog: MatDialog,
  ) { }

  /*
  * Angular Lifecycle hookup this is hack to check for updated content
  */
  ngDoCheck(): void {
    if (this.newPost || this.plainBodyLength() < this.minBodyLength || this.showFullContent) {
      this.body = this.supportGroupItem.body;
      this.htmlDiv.nativeElement.style.display = 'block';
    } else {
      this.body = this.slicedBody();
      this.htmlDiv.nativeElement.style.display = 'inline';
    }
    this.thumbsUp = this.thumbsService.thumbsUpSrc(this.supportGroupItem);
    this.thumbsDown = this.thumbsService.thumbsDownSrc(this.supportGroupItem);
  }

  /**
   * Gets the loggedIn user
   */
  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
  }


  /**
   * If the post is a new post expand its body by default
   */
  ngAfterContentInit(): void {
    if (this.newPost || this.plainBodyLength() < this.minBodyLength) {
      this.body = this.supportGroupItem.body;
      this.htmlDiv.nativeElement.style.display = 'block';
    } else {
      this.body = this.slicedBody();
      this.htmlDiv.nativeElement.style.display = 'inline';
    }
  }

  /**
   * Lifecycle hook fetch all of the comments
   */
  ngAfterViewInit() {
    this.fetchComments();
  }

  /**
   * Lifecycle hook to unsubscribe from subscriptions
   */
  ngOnDestroy() {
    if (this.postCommentSubscription) {
      this.postCommentSubscription.unsubscribe();
    }
    this.getCommentsSubscription.unsubscribe();
  }

  /**
   * Action to be performed when form submit
   */
  onSubmit() {
    if (this.commentForm.valid && this.sanititzationService.stripTags(this.commentForm.value['name']).length > 0) {
      this.disabledValue = true;
      const comment = { post: this.supportGroupItem.id, body: this.commentForm.value['name'] };
      this.postCommentSubscription = this.commentService.postComment(comment)
        .subscribe(
          (data) => {
            const commentResponse = <{ status: boolean, message: string, data: { comment_id: number } }>data;
            const persistedComment = new UserComment(
              commentResponse.data.comment_id,
              { username: this.user.username, avatar: this.user.avatar },
              comment.body, 0, 0, new Date().toISOString(), -1);
            this.supportGroupItem.comments_count += 1;
            this.commentForm.reset();
            this.initial = false;
            this.disabledValue = false;
            this.editorConfig.showToolbar = false;
            this.comments.push(persistedComment);
          }
        );
    }
  }

  /**
   * To fetch comments on posts
   */
  fetchComments() {
    if (this.supportGroupItem) {
      this.getCommentsSubscription = this.commentService.getMainComments(this.supportGroupItem, this.commentsPage)
        .subscribe(
          (data) => {
            const apiResponse = <ApiResponse>data;
            if (apiResponse.next) {
              this.commentsPage += 1;
              this.moreComments = true;
            } else {
              this.moreComments = false;
            }
            if (apiResponse.results.length > 0) {
              this.comments.push(...<UserComment[]>apiResponse.results);
              if (this.initial === false) {
                this.commentNos = this.comments.length;
              }
            }
          }
        );
    }
  }


  fetchOrShowComments() {
    if (this.initial) {
      this.initial = false;
      this.commentNos = this.comments.length;
    } else if (this.moreComments) {
      this.fetchComments();
    }
  }

  showLoadMore() {
    return (this.initial && this.comments.length > 1) || this.moreComments;
  }

  makeInitial() {
    this.initial = true;
  }

  showLessComments() {
    return this.initial === false && this.comments.length > 1;
  }

  toggleShow() {
    this.showFullContent = true;
    this.body = this.supportGroupItem.body;
    this.htmlDiv.nativeElement.style.display = 'block';
  }

  slicedBody() {
    return this.sanititzationService.stripTags((this.supportGroupItem.body.slice(0, this.minBodyLength) + '...'));
  }

  onDelete() {
    if (confirm('Are you sure to delete this post ?')) {
      this.deleteEvent.emit(this.supportGroupItem);
    }
  }

  onEdit() {
    this.editEvent.emit(this.supportGroupItem);
    this.showFullContent = false;
    this.toggleShow();
  }

  ownPost() {
    return this.user.username === this.supportGroupItem.user.username;
  }

  onFocus() {
    this.editorConfig.showToolbar = true;
  }

  onFocusOut(event: FocusEvent) {
    const el = <Element>event.relatedTarget;
    if (el == null || el.innerHTML !== 'Comment') {
      this.editorConfig.showToolbar = false;
    }
  }

  plainBodyLength(): number {
    return this.sanititzationService.stripTags(this.supportGroupItem.body).length;
  }

  /**
   * Delete Users comment
   * @param userComment
   */
  onCommentDelete(userComment: UserComment) {
    this.supportGroupItem.comments_count -= 1;
    this.comments = this.comments.filter(uc => uc.id !== userComment.id);
  }

  /**
   * Upvote
   */
  onThumbsUp() {
    const preVote = this.supportGroupItem.is_voted;
    const preUpVote = this.supportGroupItem.up_votes;
    if (this.supportGroupItem.is_voted === 1) {
      this.supportGroupItem.up_votes -= 1;
      this.supportGroupItem.is_voted = -1;
    } else {
      this.supportGroupItem.up_votes += 1;
      this.supportGroupItem.is_voted = 1;
    }
    this.sgService.postUpVote({ post_id: this.supportGroupItem.id, vote: 1 })
      .subscribe(
        () => { },
        () => {
          this.dialog.open(ErrorDialogComponent, {
            width: '300px',
            data: 'Couldn\'t perform the action'
          });
          this.supportGroupItem.is_voted = preVote;
          this.supportGroupItem.up_votes = preUpVote;
        }
      );
  }

  /**
   * DownVote
   */
  onThumbsDown() {
    if (this.supportGroupItem.is_voted === 1) {
      this.supportGroupItem.up_votes -= 1;
      this.supportGroupItem.is_voted = 0;
    } else if (this.supportGroupItem.is_voted === 0) {
      this.supportGroupItem.is_voted = -1;
    } else {
      this.supportGroupItem.is_voted = 0;
    }
    this.sgService.postUpVote({ post_id: this.supportGroupItem.id, vote: 0 })
      .subscribe(
        () => { },
        () => {
          this.dialog.open(ErrorDialogComponent, {
            width: '300px',
            data: 'Couldn\'t perform the action'
          });
        }
      );
  }
}
