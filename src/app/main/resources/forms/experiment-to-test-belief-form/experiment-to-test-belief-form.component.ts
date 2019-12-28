import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { EXPERIMENT_TO_TEST_BELIEF_FORM_NAME } from '@/app.constants';
import { Belief } from './ettbf-belief/belief.model';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { GeneralErrorService } from '@/main/shared/general-error.service';
import { ExperimentToTestBeliefService } from '@/main/resources/forms/experiment-to-test-belief-form/experiment-to-test-belief.service';
import { EttbfBeliefComponent } from './ettbf-belief/ettbf-belief.component';
import { EttbfOutcomeComponent } from '@/main/resources/forms/experiment-to-test-belief-form/ettbf-outcome/ettbf-outcome.component';
import { Outcome } from '@/main/resources/forms/experiment-to-test-belief-form/ettbf-outcome/outcome.model';

@Component({
  selector: 'app-experiment-to-test-belief-form',
  templateUrl: './experiment-to-test-belief-form.component.html',
  styleUrls: ['./experiment-to-test-belief-form.component.scss'],
})
export class ExperimentToTestBeliefFormComponent implements OnInit {
  formName = EXPERIMENT_TO_TEST_BELIEF_FORM_NAME;
  belief!: Belief;
  outcome!: Outcome;
  subscriptions: Subscription[] = [];
  beliefEditMode = false;
  outcomeEditMode = false;

  @ViewChild(EttbfBeliefComponent, { static: false })
  beliefStatementForm!: EttbfBeliefComponent;
  @ViewChild(EttbfOutcomeComponent, { static: false })
  outcomeStatementForm!: EttbfOutcomeComponent;

  constructor(
    private ettbfBeleifService: ExperimentToTestBeliefService,
    private authService: AuthService,
    private errorService: GeneralErrorService,
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  onEditBeliefClick() {
    this.onBeliefClick();
    if (this.beliefStatementForm) {
      this.beliefStatementForm.editBeliefText();
    }
  }

  beliefSelected(belief: Belief) {
    this.belief = belief;
    this.beliefEditMode = false;
  }

  onBeliefClick() {
    if (this.belief) {
      this.beliefEditMode = true;
    }
  }

  onEditOutcomeClick() {
    this.onOutcomeClick();
    if (this.outcomeStatementForm) {
      this.outcomeStatementForm.editOutcomeText();
    }
  }

  outcomeSelected(outcome: Outcome) {
    this.outcome = outcome;
    this.outcomeEditMode = false;
  }

  onOutcomeClick() {
    if (this.outcome) {
      this.outcomeEditMode = true;
    }
  }
}
