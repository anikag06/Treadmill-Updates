import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.scss'],
})
export class UserFeedbackComponent implements OnInit {
  @Input() disliked!: boolean;
  @Input() liked!: boolean;
  @Input() lastStepCompleted!: boolean;
  @Input() isLastStep!: boolean;
  @Input() showNextStepBtn!: boolean;
  @Input() showloading!: boolean;

  @Output() completedEvent: EventEmitter<any> = new EventEmitter();
  @Output() nextStepEvent: EventEmitter<any> = new EventEmitter();
  @Output() scrollEvent: EventEmitter<any> = new EventEmitter();
  @Output() storeFeedbackEvent: EventEmitter<any> = new EventEmitter();
  @Output() submitCommentEvent: EventEmitter<any> = new EventEmitter();

  showFeedBackBox = false;
  final_feedback!: any;
  feedback_text!: string;

  constructor(private router: Router) {}

  ngOnInit() {}

  onDislikeBtnClick() {
    this.scrollPageToBottom();
    this.showFeedBackBox = true;
    if (this.disliked) {
      this.final_feedback = 0; // changing from dislike to no like/dislike state
    } else if (this.liked) {
      this.final_feedback = -1; // changing from like to dislike state
    } else {
      this.final_feedback = -1; // changing from no like/dislike state to dislike
    }
    this.disliked = !this.disliked;
    this.liked = false;
    this.storeFeedBackData();
  }
  onLikeBtnClick() {
    this.scrollPageToBottom();
    this.showFeedBackBox = true;
    if (this.liked) {
      this.final_feedback = 0; // changing from like to no like/dislike state
    } else if (this.disliked) {
      this.final_feedback = 1; // changing from dislike to no like state
    } else {
      this.final_feedback = 1; // changing from no like/dislike state to like
    }
    this.liked = !this.liked;
    this.disliked = false;
    this.storeFeedBackData();
  }
  scrollPageToBottom() {
    this.scrollEvent.emit();
  }

  storeFeedBackData() {
    this.storeFeedbackEvent.emit();
  }

  onCompleteClicked() {
    this.completedEvent.emit();
  }

  onNextStepClicked() {
    this.nextStepEvent.emit();
  }

  onDashboardClicked() {
    this.router.navigate(['/']);
  }
  onSubmitCommentClicked(comment: string) {
    this.showFeedBackBox = false;
    this.feedback_text = comment;
    this.submitCommentEvent.emit();
  }
}
