import { Component, OnInit, Input, ViewChild, OnDestroy, AfterViewInit, AfterContentInit } from '@angular/core';
import { Tag } from '@/main/shared/tag.model';
import { NgForm } from '@angular/forms';
import { SupportGroupItem } from '../../support-group-item.model';
import { CommentService } from '@/main/support-groups/post-list/post-item/comment/comment.service';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { UserComment } from './comment/user-comment.model';
import { Subscription } from 'rxjs';
import { ApiResponse } from '@/main/shared/apiResponse.model';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {

  @Input() supportGroupItem!: SupportGroupItem;
  @Input() newPost!: boolean;
  @ViewChild('mainComment') commentForm!: NgForm;
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
  ) { }

  ngOnInit() {
    this.authService.isLoggedIn()
      .then((data) => {
        if (data) {
          this.user = <User>data;
        }
      });
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
                                        { username: this.user.username, avatar: null },
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
    if (this.showFullContent) {
      this.body = this.supportGroupItem.body;
    } else  {
      this.body = this.slicedBody();
    }
  }

  slicedBody() {
    return this.supportGroupItem.body.slice(0, 250) + '...';
  }
}
