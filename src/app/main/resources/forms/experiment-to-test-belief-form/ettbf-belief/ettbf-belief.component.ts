import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Belief } from './belief.model';
import { ExperimentToTestBeliefService } from '../experiment-to-test-belief.service';
import {
  ETTBF_RATING_QUESTION,
  ETTBF_MIN_RATING_TEXT,
  ETTBF_MAX_RATING_TEXT,
} from '@/app.constants';
import { FormSliderComponent } from '@/main/resources/forms/shared/form-slider/form-slider.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ettbf-belief',
  templateUrl: './ettbf-belief.component.html',
  styleUrls: ['./ettbf-belief.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EttbfBeliefComponent implements OnInit {
  @Input() belief!: Belief;
  @Output() beliefClicked = new EventEmitter<boolean>();
  @ViewChild('beliefTextArea', { static: false }) beliefTextArea!: ElementRef;
  @ViewChild(FormSliderComponent, { static: false })
  initialSlider!: FormSliderComponent;
  beliefStatement = '';
  value = 1;
  beliefResponse!: undefined;
  beliefContinue = false;
  showSlider = false;
  sliderContinue = false;
  ratingQuestion = ETTBF_RATING_QUESTION;
  minRatingText = ETTBF_MIN_RATING_TEXT;
  maxRatingText = ETTBF_MAX_RATING_TEXT;

  constructor(private ettbfBeliefService: ExperimentToTestBeliefService) {}

  ngOnInit() {
    if (this.belief) {
      this.beliefStatement = this.belief.belief;
    }
  }
  ngOnChanges() {
    this.resetForm();
    this.beliefStatement = this.belief.belief;
    this.value = this.belief.belief_rating_before;
    if (this.belief) {
      this.showSlider = true;
    }
  }
  editBeliefText() {
    this.beliefTextArea.nativeElement.focus();
    if (this.belief.belief_rating_before != null) {
      this.value = this.belief.belief_rating_before;
    }
  }

  onBeliefSubmit() {
    this.showSlider = true;
    if (this.belief && Object.entries(this.belief).length > 0) {
      this.belief.belief = this.beliefStatement;
      this.belief.belief_rating_before = this.initialSlider.rating;
      this.ettbfBeliefService
        .putBelief({
          id: this.belief.id,
          belief: this.belief.belief,
          belief_rating_before: this.belief.belief_rating_before,
        })
        .subscribe(
          (data: any) => {
            this.belief = data.body;
            console.log('the put request has been submitted');
            this.beliefClicked.emit(this.showSlider);
          },
          error => {
            console.error(error);
          },
        );
    } else {
      if (
        this.beliefStatement.trim().length > 0 &&
        this.beliefResponse === undefined
      ) {
        this.ettbfBeliefService.postBelief(this.beliefStatement).subscribe(
          (data: any) => {
            this.belief = data;
            this.beliefResponse = data;
            console.log('the post request has been submitted');
            // this.beliefClicked.emit(this.beliefContinue);
          },
          error => {
            console.error(error);
          },
        );
      }
    }
    this.beliefContinue = false;
  }
  onBeliefRatingBeforeSubmit() {
    this.onBeliefSubmit();
    this.sliderContinue = false;
  }
  showSliderCont() {
    this.sliderContinue = true;
  }
  resetForm() {
    this.beliefStatement = '';
    this.value = 1;
    this.showSlider = false;
  }
  onFocus() {
    this.beliefContinue = true;
  }
  // onFocusOut(event: any) {
  //   if (
  //     !(
  //       <Element>event.relatedTarget &&
  //       (<Element>event.relatedTarget).classList.contains('continue-btn')
  //     )
  //   ) {
  //     // this.onBeliefSubmit();
  //   }
  // }
}
