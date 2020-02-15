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
  value = 1;
  beliefResponse !: undefined;
  ratingQuestion = ETTBF_RATING_QUESTION;
  minRatingText = ETTBF_MIN_RATING_TEXT;
  maxRatingText = ETTBF_MAX_RATING_TEXT;

  constructor(private ettbfBeliefService: ExperimentToTestBeliefService) {}

  ngOnInit() {}
  ngOnChanges(){
    this.beliefStatement = this.belief.belief;
    this.value = this.belief.belief_rating_before;
  }
  editBeliefText() {
    this.beliefTextArea.nativeElement.focus();
    if (this.belief.belief_rating_before != null) {
      this.value = this.belief.belief_rating_before;
    }
  }

  onBeliefSubmit() {
    if (this.belief) {
      this.belief.belief = this.beliefStatement;
      this.belief.belief_rating_before = this.initialSlider.rating;
      this.ettbfBeliefService
        .putBelief({
          id: this.belief.id,
          belief: this.belief.belief,
          belief_rating_before:this.belief.belief_rating_before,
        })
        .subscribe(
          (data: any) => {
            this.belief = data.body;
            console.log('the put request has been submitted');
          },
          error => {
            console.error(error);
          },
        );
    } else {
      if (this.beliefStatement.trim().length > 0 && this.beliefResponse == undefined) {
        this.ettbfBeliefService.postBelief(this.beliefStatement).subscribe(
          (data: any) => {
            this.belief = data;
            this.beliefResponse = data.body;
            console.log('the post request has been submitted');
          },
          error => {
            console.error(error);
          },
        );
      }
    }
  }

  onBeliefRatingBeforeSubmit() {
    this.onBeliefSubmit();
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
