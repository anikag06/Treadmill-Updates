import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Belief } from './belief.model';
import { ExperimentToTestBeliefService } from '../experiment-to-test-belief.service';
import {
  ETTBF_RATING_QUESTION,
  ETTBF_MIN_RATING_TEXT,
  ETTBF_MAX_RATING_TEXT,
  FORM_START_SCORE,
} from '@/app.constants';
import { FormSliderComponent } from '@/main/resources/forms/shared/form-slider/form-slider.component';
import { FormGroup } from '@angular/forms';
import { CommonService } from '@/shared/common.service';
import { UserProfileService } from '@/main/shared/user-profile/user-profile.service';
import { User } from '@/shared/user.model';
import { AuthService } from '@/shared/auth/auth.service';

@Component({
  selector: 'app-ettbf-belief',
  templateUrl: './ettbf-belief.component.html',
  styleUrls: ['./ettbf-belief.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EttbfBeliefComponent implements OnInit {
  scoreUpdate = false;
  user!: User;
  @Input() belief!: Belief;
  @Output() beliefClicked = new EventEmitter<boolean>();
  @ViewChild('beliefTextArea', { static: false }) beliefTextArea!: ElementRef;
  @ViewChild(FormSliderComponent, { static: false })
  initialSlider!: FormSliderComponent;
  beliefStatement = '';
  value = 1;
  beliefResponse!: undefined;
  beliefContinue = false;
  showSlider = false;
  sliderContinue = false;
  ratingQuestion = ETTBF_RATING_QUESTION;
  minRatingText = ETTBF_MIN_RATING_TEXT;
  maxRatingText = ETTBF_MAX_RATING_TEXT;
  showSpinner = false;

  constructor(
    private ettbfBeliefService: ExperimentToTestBeliefService,
    private commonService: CommonService,
    private userProfileService: UserProfileService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    if (this.belief) {
      this.beliefStatement = this.belief.belief;
    }
    this.user = <User>this.authService.isLoggedIn();
  }
  ngOnChanges() {
    this.resetForm();
    this.beliefStatement = this.belief.belief;
    this.value = this.belief.belief_rating_before;
    if (this.belief) {
      this.showSlider = true;
    }
    if (this.value) {
      this.beliefClicked.emit(this.showSlider);
    }
  }
  editBeliefText() {
    this.beliefTextArea.nativeElement.focus();
    if (this.belief.belief_rating_before != null) {
      this.value = this.belief.belief_rating_before;
    }
  }

  onBeliefSubmit() {
    this.showSlider = true;
    if (this.belief && Object.entries(this.belief).length > 0) {
      if (!this.belief.belief_rating_before) {
        this.showSpinner = true;
      }
      this.belief.belief = this.beliefStatement;
      this.belief.belief_rating_before = this.initialSlider.rating;
      this.ettbfBeliefService
        .putBelief({
          id: this.belief.id,
          belief: this.belief.belief,
          belief_rating_before: this.belief.belief_rating_before,
        })
        .subscribe(
          (data: any) => {
            this.belief = data.body;
            this.beliefClicked.emit(this.showSlider);
            this.showSpinner = false;
            this.sliderContinue = false;
            if (!this.scoreUpdate) {
              this.scoreUpdate = true;
              if (this.user.is_exp) {
                this.commonService.updateScore(FORM_START_SCORE);
              }
            }
          },
          error => {
            console.error(error);
          },
        );
    } else {
      if (
        this.beliefStatement.trim().length > 0 &&
        this.beliefResponse === undefined
      ) {
        this.ettbfBeliefService.postBelief(this.beliefStatement).subscribe(
          (data: any) => {
            this.belief = data;
            this.beliefResponse = data;
            if (this.user.is_exp) {
              this.commonService.updateScore(FORM_START_SCORE);
            }
            // this.beliefClicked.emit(this.beliefContinue);
          },
          error => {
            console.error(error);
          },
        );
      }
    }
    this.beliefContinue = false;
  }
  onBeliefRatingBeforeSubmit() {
    this.onBeliefSubmit();
  }
  showSliderCont() {
    this.sliderContinue = true;
  }
  resetForm() {
    this.beliefStatement = '';
    this.value = 1;
    this.showSlider = false;
  }
  onFocus() {
    this.beliefContinue = true;
  }
  // onFocusOut(event: any) {
  //   if (
  //     !(
  //       <Element>event.relatedTarget &&
  //       (<Element>event.relatedTarget).classList.contains('continue-btn')
  //     )
  //   ) {
  //     // this.onBeliefSubmit();
  //   }
  // }
}
