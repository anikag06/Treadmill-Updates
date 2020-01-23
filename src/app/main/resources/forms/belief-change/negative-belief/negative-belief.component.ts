import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges,} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {CommonBeliefComponent} from '@/main/resources/forms/belief-change/negative-belief/common-belief/common-belief.component';
import {Belief} from '@/main/resources/forms/belief-change/belief.model';
import {BeliefChangeService} from '@/main/resources/forms/belief-change/belief-change.service';

@Component({
  selector: 'app-negative-belief',
  templateUrl: './negative-belief.component.html',
  styleUrls: ['./negative-belief.component.scss'],
})
export class NegativeBeliefComponent implements OnInit {
  constructor(
      private formBuilder: FormBuilder,
      private dialog: MatDialog,
      private beliefChangeService: BeliefChangeService,
  ) {
  }

  header = 'Negative Belief or Rule';
  title = 'What is the belief or rule that you would like to change?';
  showBeliefLink = false;
  @Input() belief!: Belief;
  showContiue = false;
  // sliderHeader = 'On a scale of 1-10, how strongly do you belief this?';
  minRating = 'Not at all';
  maxRating = 'Very Strongly';
  scaleBelief = 'On a scale of 1-10, how strongly do you belief this?';
  beliefRatingInitial!: number;
  showSliderButton = false;
  @Output() onShowTechniques = new EventEmitter();
  negativeBeliefForm = this.formBuilder.group({
    belief: new FormControl('', [Validators.required]),
  });
  showSlider = false;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
        this.belief &&
        changes.belief &&
        changes.belief.previousValue !== changes.belief.currentValue
    ) {
      this.initializeBelief();
    }
    if (changes.reset) {
      this.resetBelief();
    }
  }

  onSelectCommonBelief() {
    const dialogRef = this.dialog.open(CommonBeliefComponent, {
      panelClass: 'common-belief-dialog-container',
      maxWidth: '100vw',
      autoFocus: false,
    });
    this.onDialogRefClosed(dialogRef);
  }

  onDialogRefClosed(dialogRef: any) {
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.data) {
        this.negativeBeliefForm.controls['belief'].setValue(
            result.data.selectedBelief,
        );
        this.showBeliefLink = true;
        // this.showSlider = true;
      }
    });
  }

  initializeBelief() {
    this.negativeBeliefForm.controls['belief'].setValue(this.belief.belief);
    this.showSlider = true;
    this.showContiue = false;
    this.showBeliefLink = true;
    if (this.belief.belief_rating_initial) {
      this.beliefRatingInitial = this.belief.belief_rating_initial;
      this.onShowTechniques.emit();
    }
  }

  onShowContinue() {
    this.showContiue = true;
  }

  resetBelief() {
    this.negativeBeliefForm.controls['belief'].setValue('');
  }

  onBeliefSubmit() {
    const object = {
      belief: this.negativeBeliefForm.value['belief'],
    };
    this.beliefChangeService.postBelief(object).subscribe((resp: any) => {
      if (resp.ok) {
        this.showSlider = true;
        this.showContiue = false;
      }
    });
  }

  getRating(value: any) {
    this.beliefRatingInitial = value;
    this.showSliderButton = true;
  }

  onNegativeMantraSubmit() {
    if (this.beliefRatingInitial) {
      const object = {
        belief: this.belief.belief,
        belief_rating_initial: this.beliefRatingInitial,
      };
      this.beliefChangeService
          .putBelief(object, this.belief.id)
          .subscribe((resp: any) => {
            if (resp.ok) {
              this.showSliderButton = false;
              this.onShowTechniques.emit();
            }
          });
    }
  }
}
