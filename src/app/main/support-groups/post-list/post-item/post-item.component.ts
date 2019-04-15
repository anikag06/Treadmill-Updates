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
    DoCheck
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

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements  OnInit, DoCheck, OnDestroy,  AfterContentInit, AfterViewInit {

  @Input() supportGroupItem!: SupportGroupItem;
  @Input() newPost!: boolean;
  @ViewChild('mainComment') commentForm!: NgForm;
  @Output() deleteEvent = new EventEmitter<SupportGroupItem>();
  @Output() editEvent = new EventEmitter<SupportGroupItem>();

  tags: Tag[] = [];
  user!: User;
  commentsPage = 1;
  moreComments = false;
  initial = true;
  firstComment!: UserComment;
  comments: UserComment[] = [];
  postCommentSubscription!: Subscription;
  getCommentsSubscription!: Subscription;
  showFullContent = false;
  body = '';

  constructor(
    private commentService: CommentService,
    private authService: AuthService,
    private sanititzationService: SanitizationService
  ) { }

  ngDoCheck(): void {
    if ( this.showFullContent ) {
      this.body = this.supportGroupItem.body;
    } else  {
      this.body = this.slicedBody();
    }
  }

  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
  }

  ngAfterContentInit(): void {
    if (this.newPost) {
      this.body = this.supportGroupItem.body;
    } else {
      this.body = this.slicedBody();
    }
  }

  ngAfterViewInit() {
    this.fetchComments();
  }

  ngOnDestroy() {
    if (this.postCommentSubscription) {
      this.postCommentSubscription.unsubscribe();
    }
    this.getCommentsSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.commentForm.valid) {
      const comment = { post: this.supportGroupItem.id, body: this.commentForm.value['name'] };
      this.postCommentSubscription = this.commentService.postComment(comment)
        .subscribe(
          (data) => {
            const commentResponse = <{ status: boolean, message: string, data: { comment_id: number }}>data;
            const persistedComment = new UserComment(
                                        commentResponse.data.comment_id,
                                        { username: this.user.username, avatar: this.user.avatar },
                                        comment.body, 0, 0, new Date().toISOString());
            this.commentForm.reset();
            this.initial = false;
            this.comments.push(persistedComment);
          }
        );
    }
  }

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
                                            }
                                          }
                                        );
    }
  }


  fetchOrShowComments() {
    if (this.initial) {
      this.initial = false;
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
    this.showFullContent = !this.showFullContent;
    if ( this.showFullContent ) {
      this.body = this.supportGroupItem.body;
    } else  {
      this.body = this.slicedBody();
    }
  }

  slicedBody() {
    return this.sanititzationService.stripTags((this.supportGroupItem.body.slice(0, 250) + '...'));
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
}
