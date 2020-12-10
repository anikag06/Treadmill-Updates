import { Component, Input, OnInit } from '@angular/core';
import {
  BELIEF_CHANGE,
  BELIEF_CHANGE_FORM_NAME,
  THINKING_IMG, TREADWILL,
  WELL_DONE_IMG,
} from '@/app.constants';
import { FormMessage } from '@/main/resources/forms/shared/form-message/form-message.model';
import { Belief } from '@/main/resources/forms/belief-change/belief.model';
import { FormService } from '@/main/resources/forms/form.service';
import {
  BELEIF_CHANGE_QUOTES,
  BELIEF_CHANGE_NEGATIVE_MSG,
  BELIEF_CHANGE_POSITIVE_MSG,
} from '@/main/resources/forms/belief-change/belief-change-message';
import { map, switchMap } from 'rxjs/operators';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { FlowService } from '@/main/flow/flow.service';
import { ActivatedRoute } from '@angular/router';
import { BeliefChangeService } from '@/main/resources/forms/belief-change/belief-change.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-belief-change',
  templateUrl: './belief-change.component.html',
  styleUrls: ['./belief-change.component.scss'],
})
export class BeliefChangeComponent implements OnInit {
  @Input() fromSlide!: boolean;
  @Input() fromConv!: boolean;
  constructor(
    private formService: FormService,
    private activatedRoute: ActivatedRoute,
    private stepDataService: StepsDataService,
    private flowService: FlowService,
    private beliefService: BeliefChangeService,
  ) {}

  formName = BELIEF_CHANGE_FORM_NAME;
  belief!: Belief | undefined;
  reset = false;

  type = BELIEF_CHANGE;
  showSlider = false;
  showTechniques = false;
  initialRating = 0;
  finalRating = 0;
  showMessage!: boolean;
  message!: FormMessage;
  showFinalBelief = false;
  finalRatignHeader = 'On a scale of 1-10, how strongly do you believe this?';
  formComplete = false;
  text =
    'If you have this negative thought again, remind yourself this realistic thought.';
  quote =
    'the happiness of your life depends upon the quality of your thoughts.';
  quotedBy = 'Marcus Aurelius';
  reviewTitle = 'Original Belief';
  realisticQues =
    'Great! What would be a more <strong>realistic belief?</strong>';
  beliefObject!: any;
  navbarTitle!: string;
  stepGroupSequence!: number;
  stepSequence!: number;
  stepName!: string;
  step_id!: number;
  showLoading = true;
  ngOnInit() {
    this.activatedRoute.params.subscribe(v => {
      this.step_id = v.step_id;
      console.log('step id', this.step_id);
    });
    if (this.step_id) {
      this.stepDataService.getStepData(this.step_id).subscribe((res: any) => {
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
      });
    }
    if (!this.fromSlide && !this.fromConv) {
      this.formService.formName = this.formName;
      this.formService.formTitle.emit();
    }
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== null) {
      this.loadBeliefByID(parseInt(id));
    }
    setTimeout(() => {
      this.showLoading = false;
    }, 1000);
  }

  loadBeliefByID(id: any) {
    this.beliefService.getBeliefs();
    this.beliefService.beliefsBehaviour.subscribe((data: any) => {
      if (data.length > 0) {
        const belief = data.find((x: any) => x.id === id);
        if (belief !== undefined) {
          this.belief = belief;
        }
      }
    });
  }

  onAddNewForm() {
    this.belief = undefined;
    // this.reset = true;
    this.resetForm();
  }

  beliefSelected(belief: Belief) {
    this.belief = belief;
    this.reset = true;
    this.resetForm();
    this.beliefObject = {
      id: this.belief.id,
      text: this.belief.belief,
    };
  }

  updateBelief(belief: Belief) {
    this.belief = belief;
    this.reset = false;
    this.beliefObject = {
      id: this.belief.id,
      text: this.belief.belief,
    };
  }
  onShowSlider() {
    this.showSlider = true;
  }

  onShowTechniques() {
    this.showTechniques = true;
  }
  onShowFinalBelief() {
    this.showFinalBelief = true;
  }

  onInitialRatingChange(value: number) {
    this.initialRating = value;
    this.onShowMessage();
  }

  onFinalRatingChange(value: number) {
    this.finalRating = value;
    this.onShowMessage();
  }

  finalFormComplete(value: number) {
    this.finalRating = value;
    this.formComplete = true;
    this.onShowMessage();
  }
  onShowMessage() {
    if (this.initialRating > 0 && this.finalRating > 0 && this.formComplete) {
      const index = this.formService.getRandomInt(BELEIF_CHANGE_QUOTES.length);
      this.quote = BELEIF_CHANGE_QUOTES[index].quote;
      this.quotedBy = BELEIF_CHANGE_QUOTES[index].by;
      this.showMessage = true;
      if (this.finalRating < this.initialRating) {
        this.message = new FormMessage(
          WELL_DONE_IMG,
          'Well Done',
          BELIEF_CHANGE_POSITIVE_MSG[
            this.formService.getRandomInt(BELIEF_CHANGE_POSITIVE_MSG.length)
          ],
        );
      } else {
        this.message = new FormMessage(
          THINKING_IMG,
          '',
          BELIEF_CHANGE_NEGATIVE_MSG[
            this.formService.getRandomInt(BELIEF_CHANGE_NEGATIVE_MSG.length)
          ],
        );
      }
    }
  }

  resetForm() {
    delete this.finalRating;
    delete this.initialRating;
    delete this.formComplete;
    this.showTechniques = false;
    this.showFinalBelief = false;
    this.showMessage = false;
  }
}
