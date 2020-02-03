import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Belief } from '@/main/resources/forms/belief-change/belief.model';
import { BeliefChangeService } from '@/main/resources/forms/belief-change/belief-change.service';

@Component({
  selector: 'app-negative-belief-final',
  templateUrl: './negative-belief-final.component.html',
  styleUrls: ['./negative-belief-final.component.scss'],
})
export class NegativeBeliefFinalComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private beliefChangeService: BeliefChangeService,
  ) {}

  header = 'On a scale of 1-10, how strongly do you believe this?';
  minRating = 'Not at all';
  maxRating = 'Very Strongly';
  beliefRatingFinal!: number;
  finalQues = 'Great! What would be a more realistic belief?';
  showRealistic = false;
  showContinue = false;
  @Input() belief!: Belief;
  @Output() finalRatingChange = new EventEmitter();
  @Output() formComplete = new EventEmitter();
  showQuote = false;
  editRealistic = false;
  editSlider = false;
  showRealisticDiv = false;
  negativeBeliefFinalForm = this.formBuilder.group({
    realistic_belief: new FormControl('', [Validators.required]),
  });

  ngOnInit() {}

  ngOnChanges() {
    if (this.belief) {
      this.beliefChangeService
        .getFinalRating(this.belief.id)
        .subscribe(resp => {
          if (resp.body.belief_rating_final) {
            this.beliefRatingFinal = resp.body.belief_rating_final;
            this.finalRatingChange.emit(this.beliefRatingFinal);
            this.showContinue = false;
            this.editSlider = true;
            // this.showRealistic = true;
            this.showRealisticDiv = true;
          }
        });
      this.beliefChangeService
        .getRealisticBelief(this.belief.id)
        .subscribe(resp => {
          if (resp.ok) {
            this.negativeBeliefFinalForm.controls['realistic_belief'].setValue(
              resp.body.realistic_belief,
            );
            this.showRealistic = false;
            this.editRealistic = true;
            this.formComplete.emit(this.beliefRatingFinal);
          }
        });
    }
  }

  getRating(value: any) {
    this.beliefRatingFinal = value;
    this.showContinue = true;
  }

  onFinalRatingSubmit() {
    // this.beliefChangeService.getBeliefBehavior().subscribe((belief: any) => {
    //   this.belief = belief;
    // });

    const object = {
      belief_id: this.belief.id,
      belief_rating_final: this.beliefRatingFinal,
    };
    if (this.editSlider && this.belief) {
      this.beliefChangeService
        .putFinalRating(object, this.belief.id)
        .subscribe(resp => {
          if (resp.ok) {
            this.showContinue = false;
            this.finalRatingChange.emit(this.beliefRatingFinal);
          }
        });
    } else {
      this.beliefChangeService.postFinalBeliefRating(object).subscribe(resp => {
        if (resp.ok) {
          this.showContinue = false;
          this.showRealistic = false;
          this.showRealisticDiv = true;
          this.editSlider = true;
          this.finalRatingChange.emit(this.beliefRatingFinal);
        }
      });
    }
    // if (!this.showContinue && !this.showRealistic) {
    //   this.showQuote = true;
    // }
  }

  onRealisticBeliefSubmit() {
    // this.beliefChangeService.getBeliefBehavior().subscribe((belief: any) => {
    //   this.belief = belief;
    // });
    const object = {
      belief_id: this.belief.id,
      realistic_belief: this.negativeBeliefFinalForm.value['realistic_belief'],
    };
    if (this.editRealistic && this.belief) {
      this.beliefChangeService
        .putRealisticBelief(object, this.belief.id)
        .subscribe(resp => {
          if (resp.ok) {
            this.formComplete.emit(this.beliefRatingFinal);
            this.showRealistic = false;
          }
        });
    } else {
      this.beliefChangeService.postRealisticBelief(object).subscribe(resp => {
        if (resp.ok) {
          this.formComplete.emit(this.beliefRatingFinal);
          this.showRealistic = false;
        }
      });
    }
  }

  showRealisticBtn() {
    this.showRealistic = true;
  }
}
