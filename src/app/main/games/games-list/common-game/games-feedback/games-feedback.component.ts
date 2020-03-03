import { Component, OnInit, ElementRef } from '@angular/core';
import { GamesFeedbackService } from './games-feedback.service';
import { GameFeedback } from './game-feedback.model';
import { GamePlayService } from '@/main/games/shared/game-play.service';

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
  game!: string;
  feedback!: GameFeedback;
  ask_feedback!: boolean;
  thank_text = false;

  constructor(
    private el: ElementRef,
    private gamesFeedbackService: GamesFeedbackService,
    private gamePlayService: GamePlayService,
  ) { }

  ngOnInit() {
    this.game = this.gamePlayService.gameName;
    this.ask_feedback = this.gamesFeedbackService.ask_feedback;
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
    this.thank_text = true;
    this.giveFeedback = false;
    this.feedback_text = text;
    this.feedback = { game: this.game, feedback: this.ask_feedback, feedback_text: this.feedback_text };
    this.gamesFeedbackService.sendFeedback(this.feedback).subscribe();
    setTimeout(() => {
      this.onClose();
    }, 2000);
  }

  onCancel() {
    this.thank_text = true;
    this.giveFeedback = false;
    setTimeout(() => {
      this.onClose();
    }, 2000);
  }

  onClose() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.el.nativeElement.dispatchEvent(domEvent);
    this.gamesFeedbackService.feedback.emit();
  }
}
