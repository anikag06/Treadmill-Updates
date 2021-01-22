import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Worry } from '../worry.model';
import { WorryProductivelyService } from '../worry-productively.service';
import { FormSliderComponent } from '../../shared/form-slider/form-slider.component';
import { CommonService } from '@/shared/common.service';
import { FORM_START_SCORE } from '@/app.constants';
import { User } from '@/shared/user.model';
import { AuthService } from '@/shared/auth/auth.service';
@Component({
  selector: 'app-worry-form',
  templateUrl: './worry-form.component.html',
  styleUrls: ['./worry-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorryFormComponent implements OnInit {
  user!: User;
  scoreUpdate = false;
  @Input() worry!: Worry;
  @Output() testOut = new EventEmitter<boolean>();
  @Output() updateWorry = new EventEmitter();
  @ViewChild('worryTextArea', { static: false }) worryTextArea!: ElementRef;
  @ViewChild(FormSliderComponent, { static: false })
  sliderRating!: FormSliderComponent;
  constructor(
    private worryService: WorryProductivelyService,
    private commonService: CommonService,
    private authService: AuthService
  ) {}
  worryStatement = '';
  value = 1;
  worrySliderQuestion = 'How bothered are you by your worry?';
  wSliderMinRangeText = 'Not at all';
  wSliderMaxRangeText = 'Very Strongly';
  continueText = false;
  continueButton = false;
  clickbutton = false;
  showSliderCont = false;
  public sliderEmit = false;
  worryResponse!: undefined;
  ngOnInit() {
    if (this.worry) {
      this.worryStatement = this.worry.worry;
    }
    this.user = <User>this.authService.isLoggedIn();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.resetForm();
    if (this.worry) {
      this.worryStatement = this.worry.worry;
      this.clickbutton = true;
    }
    if (this.worry.worry_rating_initial) {
      this.scoreUpdate = true;
      this.value = this.worry.worry_rating_initial;
    }
  }
  ngAfterViewInit() {
    if (this.worry && this.worryTextArea) {
      setTimeout(() => {
        this.editWorryText();
      }, 100);
    }
  }
  editWorryText() {
    this.worryTextArea.nativeElement.focus();
    this.continueText = true;
  }
  resetForm() {
    this.worryStatement = '';
    this.value = 1;
    this.clickbutton = false;
  }
  onWorrySubmit() {
    this.clickbutton = true;
    if (this.worry && Object.entries(this.worry).length > 0) {
      this.worry.worry = this.worryStatement;
      this.worry.worry_rating_initial = this.sliderRating.rating;
      this.worryService
        .putWorry({
          id: this.worry.id,
          worry: this.worry.worry,
          worry_rating_initial: this.worry.worry_rating_initial,
        })
        .subscribe(
          (data: any) => {
            this.updateWorry.emit(data);
            if (!this.scoreUpdate) {
              this.scoreUpdate = true;
              if (this.user.is_exp) {
                this.commonService.updateScore(FORM_START_SCORE);
              }
            }
          },
          (error) => {
            console.error(error);
          }
        );
    } else if (
      this.worryStatement.trim().length > 0 &&
      this.worryResponse === undefined
    ) {
      this.worryService.postWorry(this.worryStatement).subscribe(
        (data: any) => {
          console.log(data);
          const worry = new Worry(
            data.id,
            data.worry,
            data.worry_rating_initial,
            data.taskorigin,
            data.show_follow_up_dot
          );
          this.worry = worry;
          this.updateWorry.emit(worry);
          this.worryResponse = data;
        },
        (error) => {
          console.error(error);
        }
      );
    }
    this.continueText = false;
    this.continueButton = false;
  }
  continuetoCharacteristics() {
    this.sliderEmit = true;
    this.showSliderCont = false;
    this.testOut.emit(this.sliderEmit);
    this.onWorrySubmit();
  }
  showSliderContinue() {
    this.showSliderCont = true;
  }
  onFocusOut(event: any) {
    if (
      !(
        <Element>event.relatedTarget &&
        (<Element>event.relatedTarget).classList.contains('continue-btn')
      )
    ) {
      this.continueText = false;
      this.continueButton = false;
    }
  }
  onFocus() {
    this.continueButton = true;
  }
}
