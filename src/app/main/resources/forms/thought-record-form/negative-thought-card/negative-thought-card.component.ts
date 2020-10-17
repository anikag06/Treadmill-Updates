import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Thought } from '@/main/resources/forms/thought-record-form/thoughtRecord.model';
import { ThoughtRecordService } from '@/main/resources/forms/thought-record-form/thought-record.service';
import { UserProfileService } from '@/main/shared/user-profile/user-profile.service';
import { CommonService } from '@/shared/common.service';
import { FORM_START_SCORE } from '@/app.constants';
import { User } from '@/shared/user.model';
import { AuthService } from '@/shared/auth/auth.service';

@Component({
  selector: 'app-negative-thought-card',
  templateUrl: './negative-thought-card.component.html',
  styleUrls: ['./negative-thought-card.component.scss'],
})
export class NegativeThoughtCardComponent implements OnInit {
  @Input() header!: string;
  @Input() reset!: boolean;
  user!: User;
  scoreUpdate = false;
  submitted = false;
  minRating = 'Not At All';
  maxRating = 'Very Strongly';
  negativeMoodRating!: number;
  @Input() thought!: Thought;
  @ViewChild('thoughtTextArea', { static: false }) element!: ElementRef;
  @Output() onShowSelectMood = new EventEmitter();
  showSlider = false;
  editMode = false;
  @Output() initialRatingChange = new EventEmitter();
  thoughtRecordForm = this.fb.group({
    thought: new FormControl('', [Validators.required]),
  });

  scaleThought =
    'On a scale of 1-10 how strongly do you believe the thought to be true?';
  showContinueButton = false;
  showSliderButton = false;

  constructor(
    private fb: FormBuilder,
    private thoughtRecordService: ThoughtRecordService,
    private commonService: CommonService,
    private userProfileService: UserProfileService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
    // console.log(this.thought);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.thought && this.reset) {
      this.thoughtRecordService
        .getThought(this.thought.id)
        .subscribe((resp: any) => {
          if (resp.ok) {
            this.initializeThought(resp);
          }
        });
    }
    if (this.reset) {
      this.resetForm();
    }
  }

  onEditSituationClick() {
    // this.submitted = false;
    this.element.nativeElement.focus();
    this.onShowContinueButton();
  }

  getRating(value: any) {
    this.negativeMoodRating = value;
    this.showSliderButton = true;
  }

  initializeThought(resp: any) {
    this.thoughtRecordForm.controls['thought'].setValue(resp.body.thought);
    this.showSlider = true;
    if (resp.body.thought_rating_initial) {
      this.negativeMoodRating = resp.body.thought_rating_initial;
      // this.showSliderButton = true;
      this.initialRatingChange.emit(this.negativeMoodRating);
      this.onShowSelectMood.emit(true);
    }
  }

  onThoughtSubmit() {
    const object = {
      situation_id: this.thought.id,
      thought: this.thoughtRecordForm.value['thought'],
    };
    if (this.negativeMoodRating > 0) {
      this.onThoughtRatingSubmit();
    } else {
      this.thoughtRecordService.postThought(object).subscribe((resp: any) => {
        const status = resp.ok;
        if (status) {
          this.showContinueButton = false;
          this.showSlider = true;
          if (!this.scoreUpdate) {
            this.scoreUpdate = true;
            if (this.user.is_exp) {
              this.commonService.updateScore(FORM_START_SCORE);
            }
          }
          // this.onShowSelectMood.emit();
        }
      });
    }
  }

  onThoughtRatingSubmit() {
    const object = {
      situation_id: this.thought.id,
      thought: this.thoughtRecordForm.value['thought'],
      thought_rating_initial: this.negativeMoodRating,
    };

    this.thoughtRecordService
      .putThoughtRating(object, this.thought.id)
      .subscribe((resp: any) => {
        const status = resp.ok;
        if (status) {
          this.onShowSelectMood.emit(true);
          this.showContinueButton = false;
          this.showSliderButton = false;
          this.initialRatingChange.emit(this.negativeMoodRating);
          if (!this.scoreUpdate) {
            this.scoreUpdate = true;
            if (this.user.is_exp) {
              this.commonService.updateScore(FORM_START_SCORE);
            }
          }
        }
      });
  }

  onShowContinueButton() {
    this.showContinueButton = true;
  }

  updateThought() {
    if (this.thought) {
      this.onThoughtRatingSubmit();
    }
  }

  resetForm() {
    this.thoughtRecordForm = this.fb.group({
      thought: new FormControl('', [Validators.required]),
    });
    this.showSlider = false;
    this.onShowSelectMood.emit(false);
  }
}
