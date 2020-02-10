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
  ) {}

  header = 'Negative Belief or Rule';
  title = 'What is the belief or rule that you would like to change?';
  showBeliefLink = false;
  @Input() belief!: Belief;
  @Output() updateBelief = new EventEmitter();
  showContiue = false;
  // sliderHeader = 'On a scale of 1-10, how strongly do you belief this?';
  minRating = 'Not at all';
  maxRating = 'Very Strongly';
  scaleBelief = 'On a scale of 1-10, how strongly do you belief this?';
  beliefRatingInitial!: number;
  showSliderButton = false;
  @Output() onShowTechniques = new EventEmitter();
  @Output() initialRatingChange = new EventEmitter();
  negativeBeliefForm = this.formBuilder.group({
    belief: new FormControl('', [Validators.required]),
  });
  showSlider = false;
  @Input() reset!: boolean;

  ngOnInit() {}

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
      if (result && result.data) {
        this.negativeBeliefForm.controls['belief'].setValue(
          result.data.selectedBelief,
        );
        this.showBeliefLink = true;
        this.showContiue = true;
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
      this.initialRatingChange.emit(this.beliefRatingInitial);
    } else {
      delete this.beliefRatingInitial;
    }
  }

  onShowContinue() {
    this.showContiue = true;
  }

  resetBelief() {
    this.negativeBeliefForm = this.formBuilder.group({
      belief: new FormControl('', [Validators.required]),
    });
    delete this.beliefRatingInitial;
    this.showSlider = false;
    this.showBeliefLink = false;
  }

  onBeliefSubmit() {
    const object = {
      belief: this.negativeBeliefForm.value['belief'],
    };
    this.beliefChangeService.postBelief(object).subscribe((resp: any) => {
      if (resp.ok) {
        this.showSlider = true;
        this.showContiue = false;
        this.showBeliefLink = true;
        this.beliefHandler(resp.body, 'create');
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
            this.updateBelief.emit(resp.body);
            this.initialRatingChange.emit(this.beliefRatingInitial);
            this.beliefHandler(resp.body, '');
          }
        });
    }
  }

  beliefHandler(data: any, action: string) {
    if (action === 'create') {
      this.belief = new Belief(
        data.id,
        data.belief,
        data.belief_rating_initial,
      );
      this.beliefChangeService.addBelief(this.belief);

      // this.showNegative.emit(true);
      // this.hideNextStep = true;
    } else {
      const belief = this.beliefChangeService.beliefs.find(
        (t: Belief) => t.id === +data.id,
      );
      if (belief) {
        this.belief = <Belief>data;
        this.beliefChangeService.updateBelief(this.belief);
      }
    }
  }
}
