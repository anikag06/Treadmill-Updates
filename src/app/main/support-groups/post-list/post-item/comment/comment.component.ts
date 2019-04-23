import { Component, OnInit, Input, AfterContentInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { UserComment } from './user-comment.model';
import { UserNestedComment } from '../nested-comment/nested-comment.model';
import { NetstedCommentService } from '../nested-comment/netsted-comment.service';
import { ApiResponse } from '@/main/shared/apiResponse.model';
import { NgForm } from '@angular/forms';
import { PostResponse } from '@/shared/post-response.model';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { AngularEditorConfig } from '@xw19/angular-editor';
import { CommentService } from './comment.service';
import { SanitizationService } from '@/main/support-groups/sanitization.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ErrorDialogComponent } from '@/shared/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, AfterContentInit, OnDestroy {

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

  @Output() deleteEmitter = new EventEmitter<UserComment>();
  @Input() comment!: UserComment;
  @ViewChild('replyForm') replyForm!: NgForm;
  @ViewChild('editForm') editForm!: NgForm;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '52px',
    maxHeight: '520px',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'lato',
    defaultFontSize: '14',
    fonts: [],
    uploadUrl: '',
  };

  constructor(
    private commentService: CommentService,
    private ncService: NetstedCommentService,
    private authService: AuthService,
    private sanitzer: SanitizationService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
  }
  ngAfterContentInit() {
    if (this.comment && this.comment.nested_comment_count > this.nestedComments.length) {
      this.moreComments = true;
    }

    if (this.comment) {
      this.editorBody = this.comment.body;
    }
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
      this.nestedCommentSubscription = this.ncService.getNestedComments(this.comment, this.page)
        .subscribe(
          (data) => {
            const response = <ApiResponse>data;
            if (response.next) {
              this.moreComments = true;
              this.page += 1;
            } else {
              this.moreComments = false;
            }
            this.nestedComments.push(...<UserNestedComment[]>response.results);
          }
        );
    }
  }

  showNestedComment() {
    this.hide = false;
    this.fetchNestedComment();
  }

  showLessNestedComment() {
    this.hide = true;
  }

  submitReply() {
    if (this.replyForm.valid) {
      const data = { comment: this.comment.id, body: this.replyForm.value['body']};
      this.ncService.postNestedComments(data)
        .subscribe(
          (resp) => {
            this.replyForm.reset();
            this.comment.nested_comment_count += 1;
            const postResponse = <PostResponse>resp;
            const persistedNestedcomment = new UserNestedComment(postResponse.data.id, data.body, 0, this.user.username);
            this.nestedComments.push(persistedNestedcomment);
            this.showNestedComment();
          }
        );
    }
  }

  onEdit() {
    this.editMode = true;
  }

  onSubmit() {
    if (this.editForm.valid && this.sanitzer.stripTags(this.editorBody).length > 0) {
      const updatedCommentBody = this.sanitzer.sanitizeHtml(this.editorBody);
      this.editSubscription = this.commentService.updateComment(this.comment.id, updatedCommentBody)
        .subscribe(
          (data) => {
            this.comment.body = this.editorBody;
            this.editMode = false;
          },
          (error: HttpErrorResponse) => {
            this.errors = [];
            this.errors.push({ name: 'comment', value: error.message});
          }
        );
    } else {
      this.errors = [];
      this.errors.push({ name: 'comment', value: 'the comment is missing'});
    }
  }

  onDelete() {
    if (confirm('Are you sure to delete this comment')) {
      this.commentService.deleteComment(this.comment.id)
        .subscribe(
          () => {
            this.deleteEmitter.emit(this.comment);
          },
          (error: HttpErrorResponse) => {
            console.log(error.message);
          }
        );
    }
  }

  onCancel() {
    if (confirm('Are you sure to close editor ?')) {
      this.editMode = false;
    }
  }

  onNestedCommentDelete(userNestedComment: UserNestedComment) {
    this.ncService.deleteNestedComment(userNestedComment.id)
      .subscribe(
        () => {
          UserNestedComment.prototype.up_votes = 10;
          this.nestedComments = this.nestedComments.filter(nc => nc.id !== userNestedComment.id);
        }
      )
  }

  /**
   * Upvote
   */
  onThumbsUp() {
    const preVote = this.comment.is_voted;
    const preUpVote = this.comment.up_votes;
    if (this.comment.is_voted === 1) {
      this.comment.up_votes -= 1;
      this.comment.is_voted = -1;
    } else {
      this.comment.up_votes += 1;
      this.comment.is_voted = 1;
    }
    this.commentService.voteComment({ comment_id: this.comment.id, vote: 1 })
      .subscribe(
        () => {},
        () => {
          this.dialog.open(ErrorDialogComponent, {
            width: '300px',
            data: 'Couldn\'t perform the action'
          });
          this.comment.is_voted = preVote;
          this.comment.up_votes = preUpVote;
        }
      );
  }

  onThumbsDown() {
    if (this.comment.is_voted === 1) {
      this.comment.up_votes -= 1;
      this.comment.is_voted = 0;
    } else if (this.comment.is_voted === 0) {
      this.comment.is_voted = -1;
    } else {
      this.comment.is_voted = 0;
    }
    this.commentService.voteComment({ comment_id: this.comment.id, vote: 0 })
      .subscribe(
        () => {},
        () => {
          this.dialog.open(ErrorDialogComponent, {
            width: '300px',
            data: 'Couldn\'t perform the action'
          });
        }
      );
  }

}
