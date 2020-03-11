import { Component, OnInit, ElementRef } from '@angular/core';
import { GamesFeedbackService } from './games-feedback.service';
import { GameFeedback } from './game-feedback.model';
import { GamePlayService } from '@/main/games/shared/game-play.service';
import { LEARNED_HELPLESSNESS_GAME } from '@/app.constants';

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
  feedbackStatus!: boolean;
  thank_text = false;
  lhGameHome!: boolean;
  lhGamePlayAgain!: boolean;
  gameName!: string;

  constructor(
    private el: ElementRef,
    private gamesFeedbackService: GamesFeedbackService,
    private gamePlayService: GamePlayService,
  ) { }

  ngOnInit() {
    this.game = this.gamePlayService.gameSlug;
    this.gameName = this.gamePlayService.gameName;
    console.log(this.gameName);
    if (this.gameName === LEARNED_HELPLESSNESS_GAME) {
      console.log('TRUE');
      this.lhGameHome = this.gamePlayService.lhGameHome;
      this.lhGamePlayAgain = this.gamePlayService.lhGamePlayAgain;
    }
  }

  onLikeBtnClick() {
    if (this.disliked) {
      this.disliked = false;
    }
    this.liked = true;
    this.feedbackStatus = true;
    this.giveFeedback = true;
  }

  onDislikeBtnClick() {
    if (this.liked) {
      this.liked = false;
    }
    this.disliked = true;
    this.feedbackStatus = false;
    this.giveFeedback = true;
  }

  onSubmitCommentClicked(text: string) {
    this.thank_text = true;
    this.giveFeedback = false;
    this.feedback_text = text;
    this.feedback = { game: this.game, feedback: this.feedbackStatus, feedback_text: this.feedback_text };
    this.gamesFeedbackService.sendFeedback(this.feedback).subscribe();
    setTimeout(() => {
      this.onClose();
    }, 1000);
  }

  onCancel() {
    this.thank_text = true;
    this.giveFeedback = false;
    setTimeout(() => {
      this.onClose();
    }, 1000);
  }

  onClose() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.el.nativeElement.dispatchEvent(domEvent);
    this.gamesFeedbackService.feedback.emit();
  }
}
