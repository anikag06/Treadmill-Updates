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
  outcomeStatement = '';
  learningStatement = '';
  belief!: Belief;

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
          (data: any) => {
            this.outcome = <Outcome>data;
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
            data => {
              this.outcome = <Outcome>data;
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
          (data: any) => {
            this.outcome = <Outcome>data;
          },
          error => {
            console.error(error);
          },
        );
    }
  }
}
