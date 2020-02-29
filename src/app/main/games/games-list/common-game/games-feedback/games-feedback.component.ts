import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-games-feedback',
  templateUrl: './games-feedback.component.html',
  styleUrls: ['./games-feedback.component.scss']
})
export class GamesFeedbackComponent implements OnInit {


  liked = false;
  disliked = false;
  giveFeedback = false;
  feedback_text!: string;

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
  }

  onLikeBtnClick() {
    if (this.disliked) {
      this.disliked = false;
    }
    this.liked = true;
    this.giveFeedback = true;
  }

  onDislikeBtnClick() {
    if (this.liked) {
      this.liked = false;
    }
    this.disliked = true;
    this.giveFeedback = true;
  }

  onSubmitCommentClicked(text: string) {
    this.giveFeedback = false;
    this.feedback_text = text;
  }

  onCancel() {
    this.giveFeedback = false;
  }

  onClose() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.el.nativeElement.dispatchEvent(domEvent);
  }
}
