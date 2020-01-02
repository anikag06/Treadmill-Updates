import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { Belief } from './belief.model';
import { ExperimentToTestBeliefService } from '../experiment-to-test-belief.service';
import {
  ETTBF_RATING_QUESTION,
  ETTBF_MIN_RATING_TEXT,
  ETTBF_MAX_RATING_TEXT,
} from '@/app.constants';
import { FormSliderComponent } from '@/main/resources/forms/shared/form-slider/form-slider.component';

@Component({
  selector: 'app-ettbf-belief',
  templateUrl: './ettbf-belief.component.html',
  styleUrls: ['./ettbf-belief.component.scss'],
})
export class EttbfBeliefComponent implements OnInit {
  @Input() belief!: Belief;
  @ViewChild('beliefTextArea', { static: false }) beliefTextArea!: ElementRef;
  beliefStatement = '';
  @ViewChild(FormSliderComponent, { static: false })
  initialSlider!: FormSliderComponent;
  ratingQuestion = ETTBF_RATING_QUESTION;
  minRatingText = ETTBF_MIN_RATING_TEXT;
  maxRatingText = ETTBF_MAX_RATING_TEXT;

  constructor(private ettbfBeliefService: ExperimentToTestBeliefService) {}

  ngOnInit() {}

  editBeliefText() {
    this.beliefTextArea.nativeElement.focus();
  }

  onBeliefSubmit() {
    if (this.belief) {
      this.belief.belief = this.beliefStatement;
      this.ettbfBeliefService
        .putBelief({
          id: this.belief.id,
          belief: this.belief.belief,
        })
        .subscribe(
          (data: Belief) => {
            this.belief = data;
          },
          error => {
            console.error(error);
          },
        );
    } else {
      if (this.beliefStatement.trim().length > 0) {
        this.ettbfBeliefService.postBelief(this.beliefStatement).subscribe(
          (data: Belief) => {
            this.belief = data;
          },
          error => {
            console.error(error);
          },
        );
      }
    }
  }

  onBeliefRatingBeforeSubmit() {
    if (this.belief) {
      this.belief.belief_rating_before = this.initialSlider.rating;
      this.ettbfBeliefService
        .putBelief({
          id: this.belief.id,
          belief: this.belief.belief,
          belief_rating_before: this.belief.belief_rating_before,
        })
        .subscribe(
          (data: Belief) => {
            this.belief = data;
          },
          error => {
            console.error(error);
          },
        );
    }
  }

  onFocusOut(event: any) {
    if (
      !(
        <Element>event.relatedTarget &&
        (<Element>event.relatedTarget).classList.contains('continue-btn')
      )
    ) {
      this.onBeliefSubmit();
    }
  }
}
