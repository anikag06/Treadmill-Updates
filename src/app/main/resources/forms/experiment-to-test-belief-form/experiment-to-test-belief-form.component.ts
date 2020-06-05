import {
  Component,
  OnInit,
  ViewChild,
  Output,
  AfterViewInit,
  Input,
} from '@angular/core';
import { Subscription } from 'rxjs';

import {
  EXPERIMENT_TO_TEST_BELIEF_FORM_NAME,
  TEST_BELIEF,
  TEST_BELIEF_ORIGIN,
  THINKING_IMG,
  WELL_DONE_IMG,
} from '@/app.constants';
import { Belief } from './ettbf-belief/belief.model';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { GeneralErrorService } from '@/main/shared/general-error.service';
import { ExperimentToTestBeliefService } from '@/main/resources/forms/experiment-to-test-belief-form/experiment-to-test-belief.service';
import { EttbfBeliefComponent } from './ettbf-belief/ettbf-belief.component';
import { EttbfOutcomeComponent } from '@/main/resources/forms/experiment-to-test-belief-form/ettbf-outcome/ettbf-outcome.component';
import { Outcome } from '@/main/resources/forms/experiment-to-test-belief-form/ettbf-outcome/outcome.model';
import { UserTask } from '../shared/tasks/user-task.model';
import { FormMessage } from '../shared/form-message/form-message.model';
import { FormService } from '../form.service';
import {
  EXPERIMENT_TO_TEST_BELIEF_QUOTES,
  EXPERIMENT_TO_TEST_BELIEF_MESSAGE,
  EXPERIMENT_TO_TEST_BELIEF_NGT_MESSAGE,
} from './experiment-to-test-belief-message';
import { WORRY_PRODUCTIVELY_QUOTES } from '../worry-productively-form/worry-productively-message';
import * as moment from 'moment';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {map, switchMap} from "rxjs/operators";
import {FlowService} from "@/main/flow/flow.service";
import {ActivatedRoute} from "@angular/router";
import {StepsDataService} from "@/main/resources/shared/steps-data.service";

@Component({
  selector: 'app-experiment-to-test-belief-form',
  templateUrl: './experiment-to-test-belief-form.component.html',
  styleUrls: ['./experiment-to-test-belief-form.component.scss'],
})
export class ExperimentToTestBeliefFormComponent implements OnInit {
  @Input() fromSlide!: boolean;
  @Input() fromConv!: boolean;

  formName = EXPERIMENT_TO_TEST_BELIEF_FORM_NAME;
  user!: User;
  belief!: Belief;
  outcome!: Outcome;
  task!: UserTask;
  taskObject!: any;
  quote!: string;
  quotedBy!: string;
  message!: FormMessage;
  finalRating!: number;
  initialRating!: number;
  showMessage!: boolean;
  formComplete!: boolean;
  disableEmergency!: boolean;
  type = TEST_BELIEF;
  subscriptions: Subscription[] = [];
  beliefEditMode = false;
  outcomeEditMode = false;
  taskContinue = false;
  taskEmitted = false;
  notification = false;
  taskHeading = 'How can you test if this belief is true?';
  showFollowUp = false;
  navbarTitle!: string;
  stepGroupSequence!: number;
  stepSequence!: number;
  stepName!: string;
  @ViewChild(EttbfBeliefComponent, { static: false })
  beliefStatementForm!: EttbfBeliefComponent;
  @ViewChild(EttbfOutcomeComponent, { static: false })
  outcomeStatementForm!: EttbfOutcomeComponent;
  expectedOutComeForm = this.formBuilder.group({
    expected_outcome: new FormControl('', [Validators.required]),
  });

  constructor(
    private ettbfBeliefService: ExperimentToTestBeliefService,
    private authService: AuthService,
    private errorService: GeneralErrorService,
    private formService: FormService,
    private formBuilder: FormBuilder,
    private flowService: FlowService,
    private activatedRoute: ActivatedRoute,
    private stepDataService: StepsDataService,
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        map(v => v.id),
        switchMap(id =>  this.stepDataService
          .getStepData(id)),
      )
      .subscribe(
        (res: any) => {
          const step = res.data;
          console.log('RESPONSE', res.data, step.status);
          // for navbar title
          this.stepGroupSequence = step.step_group_sequence + 1;
          this.stepSequence = step.sequence + 1;
          this.stepName = step.name;
          this.navbarTitle =
            this.stepGroupSequence.toString() +
            '.' +
            this.stepSequence.toString() +
            ' ' +
            this.stepName;
          console.log('STEP DETAIL:', this.navbarTitle);
          this.flowService.stepDetail.emit(this.navbarTitle);
        } );
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
  // ngAfterViewInit(){
  //   console.log(this.outcomeStatementForm);
  //   this.outcomeStatementForm.taskLoaded;

  // }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
  onAddNewForm() {
    delete this.belief;
    delete this.outcome;
    delete this.task;
    this.taskContinue = false;
    this.taskEmitted = false;
    this.formComplete = false;
    this.showMessage = false;
    this.notification = false;
    this.initialRating = 0;
    this.finalRating = 0;
  }
  onEditBeliefClick() {
    this.onBeliefClick();
    if (this.beliefStatementForm) {
      this.beliefStatementForm.editBeliefText();
    }
  }

  beliefSelected(belief: Belief) {
    this.onAddNewForm();
    this.belief = belief;
    this.initialRating = belief.belief_rating_before;
    this.beliefEditMode = false;
    if (this.belief.taskorigin) {
      this.ettbfBeliefService
        .getTasks(this.belief.taskorigin.task_id)
        .subscribe((resp: any) => {
          this.task = resp.body.data;
          this.taskContinue = true;
          this.taskEmitted = true;
          this.notification = true;
          this.getEndDate();
          this.onDisableEmergency();
          if (this.outcomeStatementForm) {
            this.outcomeStatementForm.taskLoaded(this.task);
          }
        });
    }
    this.taskObject = {
      id: this.belief.id,
      origin_name: TEST_BELIEF_ORIGIN,
      taskorigin: this.belief.taskorigin,
    };
    if (this.belief) {
      this.ettbfBeliefService
        .getOutcome(this.belief.id)
        .subscribe((outcome: any) => {
          this.outcome = outcome.body;
          this.taskEmitted = true;
          this.finalRating = outcome.body.belief_rating_after;
          if (this.finalRating) {
            this.formComplete = true;
            this.onShowMessage();
          }
        });
    }
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
  LoadTasks(data: any) {
    this.taskContinue = data;
  }
  // outcomeSelected(outcome: Outcome) {
  //   this.outcome = outcome;
  //   this.outcomeEditMode = false;
  // }
  taskLoaded(data: any) {
    if (data) {
      this.taskEmitted = true;
      this.task = data;
      this.getEndDate();
      this.onDisableEmergency();
      this.notification = true;
      // if (this.outcomeStatementForm){
      //     this.outcomeStatementForm.taskLoaded(data);
      //   }
    }
  }
  getEndDate() {
    if (this.task) {
      return moment(this.task.end_at).format('DD-MMM');
    }
  }
  onDisableEmergency() {
    const date = this.task.end_at + ' ' + this.task.time;
    this.disableEmergency =
      moment().format('YYYY-MM-DD HH:mm') <
      moment
        .utc(date)
        .local()
        .format('YYYY-MM-DD HH:mm');
  }
  onOutcomeClick() {
    if (this.outcome) {
      this.outcomeEditMode = true;
    }
  }
  finalSliderEmit(data: any) {
    this.finalRating = data;
    this.showMessage = true;
    if (data && this.outcome) {
      this.formComplete = true;
      this.onShowMessage();
    }
  }
  onShowMessage() {
    if (this.initialRating > 0 && this.finalRating > 0 && this.formComplete) {
      const index = this.formService.getRandomInt(
        EXPERIMENT_TO_TEST_BELIEF_QUOTES.length,
      );
      this.quote = WORRY_PRODUCTIVELY_QUOTES[index].quote;
      this.quotedBy = WORRY_PRODUCTIVELY_QUOTES[index].by;
      this.showMessage = true;
      if (this.finalRating < this.initialRating) {
        this.message = new FormMessage(
          WELL_DONE_IMG,
          'Well Done',
          EXPERIMENT_TO_TEST_BELIEF_MESSAGE[
            this.formService.getRandomInt(
              EXPERIMENT_TO_TEST_BELIEF_MESSAGE.length,
            )
          ],
        );
      } else {
        this.message = new FormMessage(
          THINKING_IMG,
          '',
          EXPERIMENT_TO_TEST_BELIEF_NGT_MESSAGE[
            this.formService.getRandomInt(
              EXPERIMENT_TO_TEST_BELIEF_NGT_MESSAGE.length,
            )
          ],
        );
      }
    }
  }

  onShowFollowUp(value: boolean) {
    this.showFollowUp = value;
  }
}
