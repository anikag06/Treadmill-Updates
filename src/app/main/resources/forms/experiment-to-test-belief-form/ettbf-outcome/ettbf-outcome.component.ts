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
  @Input() belief!: Belief;
  @ViewChild('outcomeTextArea', { static: false }) outcomeTextArea!: ElementRef;
  @ViewChild('learningTextArea', { static: false })
  learningTextArea!: ElementRef;
  @ViewChild('realisticBeliefTextArea', { static: false })
  realisticBeliefTextArea!: ElementRef;
  outcomeStatement = '';
  learningStatement = '';
  realisticBeliefStatement = '';
  @ViewChild(FormSliderComponent, { static: false })
  finalSlider!: FormSliderComponent;
  ratingQuestion = ETTBF_RATING_QUESTION;
  minRatingText = ETTBF_MIN_RATING_TEXT;
  maxRatingText = ETTBF_MAX_RATING_TEXT;
  bothRatingsExist = false;
  beliefDecreased!: boolean;
  outcomeText = false;
  learningText = false;
  outcomeResponse !: undefined;
  outcome_belief_id !: number;
  value = 1;
  constructor(private ettbfBeliefService: ExperimentToTestBeliefService) {}

  ngOnInit() {
    this.ettbfBeliefService.beliefObservable$.subscribe((data: any) => {
      this.belief = data;
    });
  }
  ngOnChanges(){
    this.resetForm();
    if(this.belief){
      this.outcome_belief_id = this.belief.id;
    }
    console.log(this.outcome);
    if(this.outcome){
      this.outcomeStatement = this.outcome.outcome;
      this.learningStatement = this.outcome.learning;
      this.value = this.outcome.belief_rating_after;
      this.realisticBeliefStatement = this.outcome.realistic_belief;
    }

  }
  ngOnDestroy() {
    this.ettbfBeliefService.beliefObservable$.unsubscribe();
  }

  editOutcomeText() {
    this.outcomeTextArea.nativeElement.focus();
  }
  resetForm(){
    this.outcomeStatement ='';
    this.learningStatement = '';
    this.value =1;
    this.realisticBeliefStatement='';
  }
  onOutcomeSubmit() {
    if (this.outcome && Object.entries(this.outcome).length > 0) {

      this.outcome.belief_id = this.outcome_belief_id;
      this.outcome.outcome = this.outcomeStatement;
      this.outcome.learning = this.learningStatement;
      this.outcome.belief_rating_after = this.finalSlider.rating;
      this.outcome.realistic_belief = this.realisticBeliefStatement;
      this.ettbfBeliefService
        .putOutcome({
          id: this.outcome.id,
          belief_id: this.outcome.belief_id,
          outcome: this.outcome.outcome,
          learning: this.outcome.learning,
          belief_rating_after: this.outcome.belief_rating_after,
          realistic_belief: this.outcome.realistic_belief,
        })
        .subscribe(
          (data: any) => {
            this.outcome = data;
            // this.outcomeResponse = data.body;
            console.log('The put request has been submitted');
          },
          error => {
            console.error(error);
          },
        );
    } else {
      if (this.outcomeStatement.trim().length > 0 && this.outcomeResponse == undefined) {
        this.ettbfBeliefService
          .postOutcome(this.belief.id, this.outcomeStatement)
          .subscribe(
            (data: any) => {
              this.outcome = data;
              this.outcomeResponse = data.outcome;
              console.log('The post request has been submitted');
            },
            error => {
              console.error(error);
            },
          );
      }
    }
  }
 
  onLearningSubmit() {
    this.onOutcomeSubmit();
  }

  onBeliefRatingAfterSubmit() {
    if (this.outcome) {
      this.outcome.belief_rating_after = this.finalSlider.rating;
      this.bothRatingsExist = true;
      this.compareRating();
      this.onOutcomeSubmit();
    }
  }

  onRealisticBeliefSubmit() {
    this.onOutcomeSubmit();
  }

  compareRating() {
    if (this.outcome.belief_rating_after && this.belief.belief_rating_before) {
      this.beliefDecreased =
        this.outcome.belief_rating_after < this.belief.belief_rating_before;
    }
  }
  onFocusOutcome(){
    this.outcomeText = true;
  }
  onFocusLearning(){
    this.learningText = true;
  }
}
