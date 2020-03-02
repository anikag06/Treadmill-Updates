import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Worry } from '../worry.model';
import { WorryProductivelyService } from '../worry-productively.service';
import { FormSliderComponent } from '../../shared/form-slider/form-slider.component';

@Component({
  selector: 'app-worry-form',
  templateUrl: './worry-form.component.html',
  styleUrls: ['./worry-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorryFormComponent implements OnInit {
  @Input() worry!: Worry;
  @Output() testOut = new EventEmitter<boolean>();
  @ViewChild('worryTextArea', { static: false }) worryTextArea!: ElementRef;
  @ViewChild(FormSliderComponent, { static: false })
  sliderRating!: FormSliderComponent;
  constructor(private worryService: WorryProductivelyService) {}
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
      // console.log('slider value is' + this.sliderRating.rating);
    }
  }
  ngOnChanges(){
    this.resetForm();
    if (this.worry) {
      this.worryStatement = this.worry.worry;
      this.value = this.worry.worry_rating_initial;
      this.clickbutton = true;
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
    this.clickbutton = true;
    if (this.worry.worry_rating_initial != null) {
      this.value = this.worry.worry_rating_initial;
    }
  }
  resetForm(){
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
          (data: any) => {},
          error => {
            console.error(error);
          },
        );
    } else if (
      this.worryStatement.trim().length > 0 &&
      this.worryResponse == undefined
    ) {
      this.worryService.postWorry(this.worryStatement).subscribe(
        (data: any) => {
          console.log(data);
          this.worryResponse = data.body;
        },
        error => {
          console.error(error);
        },
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
