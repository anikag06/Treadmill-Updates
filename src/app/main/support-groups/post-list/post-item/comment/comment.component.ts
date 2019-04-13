import { Component, OnInit, Input, AfterContentInit, ViewChild } from '@angular/core';
import { UserComment } from './user-comment.model';
import { UserNestedComment } from '../nested-comment/nested-comment.model';
import { NetstedCommentService } from '../nested-comment/netsted-comment.service';
import { ApiResponse } from '@/main/shared/apiResponse.model';
import { NgForm } from '@angular/forms';
import { PostResponse } from '@/shared/post-response.model';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, AfterContentInit {

  nestedComments: UserNestedComment[] = [];
  hide = true;
  moreComments = false;
  toggleReply = false;
  page = 1;
  user!: User;

  @Input() comment!: UserComment;
  @ViewChild('replyForm') replyForm!: NgForm;

  constructor(
    private ncService: NetstedCommentService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
  }
  ngAfterContentInit() {
    if (this.comment && this.comment.nested_comment_count > this.nestedComments.length) {
      this.moreComments = true;
    }
  }

  fetchNestedComment() {
    if (this.comment && this.moreComments) {
      this.ncService.getNestedComments(this.comment, this.page)
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

}
