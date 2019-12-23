import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { EXPERIMENT_TO_TEST_BELIEF_FORM_NAME } from '@/app.constants';
import { Belief } from './belief.model';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { GeneralErrorService } from '@/main/shared/general-error.service';
import { EttbfBeliefComponent } from './ettbf-belief/ettbf-belief.component';

@Component({
  selector: 'app-experiment-to-test-belief-form',
  templateUrl: './experiment-to-test-belief-form.component.html',
  styleUrls: ['./experiment-to-test-belief-form.component.scss']
})
export class ExperimentToTestBeliefFormComponent implements OnInit {
  
  formName = EXPERIMENT_TO_TEST_BELIEF_FORM_NAME;
  belief!: Belief;
  subscriptions: Subscription[] = [];
  beliefEditMode = false;

  @ViewChild(EttbfBeliefComponent, {static: false}) beliefStatementForm!: EttbfBeliefComponent;

  constructor(
    private authService: AuthService,
    private errorService: GeneralErrorService,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  onEditBeliefClick() {
    this.onBeliefClick();
    if(this.beliefStatementForm) {
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

}
