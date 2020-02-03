import {Component, OnInit} from '@angular/core';
import {BELIEF_CHANGE, BELIEF_CHANGE_FORM_NAME, THINKING_IMG, WELL_DONE_IMG,} from '@/app.constants';
import {FormMessage} from '@/main/resources/forms/shared/form-message/form-message.model';
import {Belief} from '@/main/resources/forms/belief-change/belief.model';

// export interface Belief {
//   id: string;
//   belief: string;
// }

@Component({
  selector: 'app-belief-change',
  templateUrl: './belief-change.component.html',
  styleUrls: ['./belief-change.component.scss'],
})
export class BeliefChangeComponent implements OnInit {
  constructor() {}

  formName = BELIEF_CHANGE_FORM_NAME;
  belief!: Belief | undefined;
  reset = false;
  type = BELIEF_CHANGE;
  showSlider = false;
  showTechniques = false;
  initialRating = 0;
  finalRating = 0;
  showMessage!: boolean;
  message!: FormMessage;
  showFinalBelief = false;
  formComplete = false;
  text =
    'If you have this negative thought again, remind yourself this realistic thought.';
  quote =
    'the happiness of your life depends upon the quality of your thoughts.';
  quotedBy = 'Marcus Aurelius';
  ngOnInit() {}

  onAddNewForm() {
    this.belief = undefined;
    this.reset = !this.reset;
    delete this.finalRating;
    delete this.initialRating;
    delete this.formComplete;
    this.showTechniques = false;
    this.showFinalBelief = false;
    this.showMessage = false;
  }

  beliefSelected(belief: Belief) {
    this.belief = belief;
  }

  updateBelief(belief: Belief) {
    this.belief = belief;
  }
  onShowSlider() {
    this.showSlider = true;
  }

  onShowTechniques() {
    this.showTechniques = true;
  }
  onShowFinalBelief() {
    this.showFinalBelief = true;
  }

  onInitialRatingChange(value: number) {
    this.initialRating = value;
    this.onShowMessage();
  }

  onFinalRatingChange(value: number) {
    this.finalRating = value;
    this.onShowMessage();
  }

  finalFormComplete(value: number) {
    this.finalRating = value;
    this.formComplete = true;
    this.onShowMessage();
  }
  onShowMessage() {
    if (this.initialRating > 0 && this.finalRating > 0 && this.formComplete) {
      this.showMessage = true;
      if (this.finalRating < this.initialRating) {
        this.message = new FormMessage(WELL_DONE_IMG, 'Well Done', this.text);
      } else {
        this.message = new FormMessage(THINKING_IMG, '', this.text);
      }
    }
  }
}
