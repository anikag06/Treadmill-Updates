import { Component, OnInit, Input, AfterContentInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { UserNestedComment } from './nested-comment.model';
import { NetstedCommentService } from './netsted-comment.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';

@Component({
  selector: 'app-nested-comment',
  templateUrl: './nested-comment.component.html',
  styleUrls: ['./nested-comment.component.scss']
})
export class NestedCommentComponent implements OnInit, AfterContentInit {

  @Input() userNestedComment!: UserNestedComment;
  @Output() deleteEmitter = new EventEmitter<UserNestedComment>()
  @ViewChild('replyForm') replyForm = NgForm;
  body = '';
  editMode = false;
  user!: User | undefined;
  submitting = false;

  constructor(
    private ncService: NetstedCommentService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.user = this.authService.isLoggedIn();
  }

  /**
   * Lifecycle hook initialize body to comments body
   */
  ngAfterContentInit() {
    this.body = this.userNestedComment.body;
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
      this.ncService.editNestedComment(this.userNestedComment.id, this.body)
        .subscribe(
          (data: any) => {
            this.editMode = false;
            this.userNestedComment.body = this.body;
            this.submitting = false;
          },
          (error: HttpErrorResponse) => {
            console.log(error);
            this.submitting = false;
          }
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

  onDelete() {
    if (confirm('Are you sure to delete this comment ?')) {
      this.deleteEmitter.emit(this.userNestedComment)
    }
  }
}
