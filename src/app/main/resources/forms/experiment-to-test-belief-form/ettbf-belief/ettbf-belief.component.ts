import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { Belief } from './belief.model';
import { ExperimentToTestBeliefService } from '../experiment-to-test-belief.service';

@Component({
  selector: 'app-ettbf-belief',
  templateUrl: './ettbf-belief.component.html',
  styleUrls: ['./ettbf-belief.component.scss'],
})
export class EttbfBeliefComponent implements OnInit {
  @Input() belief!: Belief;
  @ViewChild('beliefTextArea', { static: false }) beliefTextArea!: ElementRef;
  beliefStatement = '';
  initialBeliefRating!: number;

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
          (data: any) => {
            this.belief = <Belief>data;
          },
          error => {
            console.error(error);
          },
        );
    } else {
      if (this.beliefStatement.trim().length > 0) {
        this.ettbfBeliefService.postBelief(this.beliefStatement).subscribe(
          (data: any) => {
            this.belief = <Belief>data;
          },
          error => {
            console.error(error);
          },
        );
      }
    }
  }

  onBeliefRatingSubmit() {
    if (this.belief) {
      this.belief.beliefRating = this.initialBeliefRating;
      this.ettbfBeliefService
        .putBelief({
          id: this.belief.id,
          belief: this.belief.belief,
          beliefRating: this.belief.beliefRating,
        })
        .subscribe(
          (data: any) => {
            this.belief = <Belief>data;
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
