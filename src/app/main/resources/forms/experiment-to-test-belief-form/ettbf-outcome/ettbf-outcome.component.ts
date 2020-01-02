import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Outcome } from '@/main/resources/forms/experiment-to-test-belief-form/ettbf-outcome/outcome.model';
import { ExperimentToTestBeliefService } from '@/main/resources/forms/experiment-to-test-belief-form/experiment-to-test-belief.service';
import { Belief } from '@/main/resources/forms/experiment-to-test-belief-form/ettbf-belief/belief.model';
import { FormSliderComponent } from '@/main/resources/forms/shared/form-slider/form-slider.component';
import {
  ETTBF_MAX_RATING_TEXT,
  ETTBF_MIN_RATING_TEXT,
  ETTBF_RATING_QUESTION,
} from '@/app.constants';

@Component({
  selector: 'app-ettbf-outcome',
  templateUrl: './ettbf-outcome.component.html',
  styleUrls: ['./ettbf-outcome.component.scss'],
})
export class EttbfOutcomeComponent implements OnInit, OnDestroy {
  @Input() outcome!: Outcome;
  @ViewChild('outcomeTextArea', { static: false }) outcomeTextArea!: ElementRef;
  @ViewChild('learningTextArea', { static: false })
  learningTextArea!: ElementRef;
  @ViewChild('realisticBeliefTextArea', { static: false })
  realisticBeliefTextArea!: ElementRef;
  outcomeStatement = '';
  learningStatement = '';
  realisticBeliefStatement = '';
  belief!: Belief;
  @ViewChild(FormSliderComponent, { static: false })
  finalSlider!: FormSliderComponent;
  ratingQuestion = ETTBF_RATING_QUESTION;
  minRatingText = ETTBF_MIN_RATING_TEXT;
  maxRatingText = ETTBF_MAX_RATING_TEXT;
  bothRatingsExist = false;
  beliefDecreased!: boolean;

  constructor(private ettbfBeliefService: ExperimentToTestBeliefService) {}

  ngOnInit() {
    this.ettbfBeliefService.beliefObservable$.subscribe((data: any) => {
      this.belief = data;
    });
  }

  ngOnDestroy() {
    this.ettbfBeliefService.beliefObservable$.unsubscribe();
  }

  editOutcomeText() {
    this.outcomeTextArea.nativeElement.focus();
  }

  onOutcomeSubmit() {
    if (this.outcome) {
      this.outcome.outcome = this.outcomeStatement;
      this.ettbfBeliefService
        .putOutcome({
          id: this.outcome.id,
          belief_id: this.outcome.belief_id,
          outcome: this.outcome.outcome,
        })
        .subscribe(
          (data: Outcome) => {
            this.outcome = data;
          },
          error => {
            console.error(error);
          },
        );
    } else {
      if (this.outcomeStatement.trim().length > 0) {
        this.ettbfBeliefService
          .postOutcome(this.belief.id, this.outcomeStatement)
          .subscribe(
            (data: Outcome) => {
              this.outcome = data;
            },
            error => {
              console.error(error);
            },
          );
      }
    }
  }

  onLearningSubmit() {
    if (this.outcome) {
      this.outcome.learning = this.learningStatement;
      this.ettbfBeliefService
        .putOutcome({
          id: this.outcome.id,
          belief_id: this.outcome.belief_id,
          outcome: this.outcome.outcome,
          learning: this.outcome.learning,
        })
        .subscribe(
          (data: Outcome) => {
            this.outcome = data;
          },
          error => {
            console.error(error);
          },
        );
    }
  }

  onBeliefRatingAfterSubmit() {
    if (this.outcome) {
      this.outcome.belief_rating_after = this.finalSlider.rating;
      this.bothRatingsExist = true;
      this.compareRating();
      this.ettbfBeliefService
        .putOutcome({
          id: this.outcome.id,
          belief_id: this.outcome.belief_id,
          outcome: this.outcome.outcome,
          belief_rating_after: this.outcome.belief_rating_after,
        })
        .subscribe(
          (data: Outcome) => {
            this.outcome = data;
          },
          error => {
            console.error(error);
          },
        );
    }
  }

  onRealisticBeliefSubmit() {
    if (this.outcome) {
      this.outcome.realistic_belief = this.realisticBeliefStatement;
      this.ettbfBeliefService
        .putOutcome({
          id: this.outcome.id,
          belief_id: this.outcome.belief_id,
          outcome: this.outcome.outcome,
          realistic_belief: this.outcome.realistic_belief,
        })
        .subscribe(
          (data: Outcome) => {
            this.outcome = data;
          },
          error => {
            console.error(error);
          },
        );
    }
  }

  compareRating() {
    if (this.outcome.belief_rating_after && this.belief.belief_rating_before) {
      this.beliefDecreased =
        this.outcome.belief_rating_after < this.belief.belief_rating_before;
    }
  }
}
