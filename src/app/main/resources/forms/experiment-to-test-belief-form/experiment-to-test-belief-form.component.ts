import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { EXPERIMENT_TO_TEST_BELIEF_FORM_NAME, TEST_BELIEF } from '@/app.constants';
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
  user!: User;
  belief!: Belief;
  outcome!: Outcome;
  type = TEST_BELIEF;
  subscriptions: Subscription[] = [];
  beliefEditMode = false;
  outcomeEditMode = false;
  taskContinue = false;
  taskEmitted = false;
  taskHeading ='How can you test if this belief is true?';
  @ViewChild(EttbfBeliefComponent, { static: false })
  beliefStatementForm!: EttbfBeliefComponent;
  @ViewChild(EttbfOutcomeComponent, { static: false })
  outcomeStatementForm!: EttbfOutcomeComponent;

  constructor(
    private ettbfBeliefService: ExperimentToTestBeliefService,
    private authService: AuthService,
    private errorService: GeneralErrorService,
  ) {}

  ngOnInit() {
    this.subscriptions[
      this.subscriptions.length
    ] = this.ettbfBeliefService.beliefObservable$.subscribe((belief: any) => {
      if (Object.entries(belief).length > 0) {
        this.beliefSelected(belief);
      }
    }, this.errorService.errorResponse('Something went wrong'));
    const user = this.authService.isLoggedIn();
    if (user && user.is_active) {
      this.user = <User>user;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
  onAddNewForm(){
    delete this.belief;
    delete this.outcome;
    this.taskContinue = false;
    this.taskEmitted = false;
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
    this.taskContinue = true;
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
  taskLoaded(data : any){
    this.taskEmitted = data;
  }
  onOutcomeClick() {
    if (this.outcome) {
      this.outcomeEditMode = true;
    }
  }
}
