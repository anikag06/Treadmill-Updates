import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Worry } from './worry.model';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { WorryFormComponent } from './worry-form/worry-form.component';
import { FormSliderComponent } from '../shared/form-slider/form-slider.component';
import { Subscription } from 'rxjs';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { GeneralErrorService } from '@/main/shared/general-error.service';
import { FormBuilder, FormControl, FormArray } from '@angular/forms';
import { map } from 'rxjs/operators';
import { WorryProductivelyService } from '@/main/resources/forms/worry-productively-form/worry-productively.service';
import { WORRY_PRODUCTIVELY } from '@/app.constants';
import { TechniquesComponent } from './techniques/techniques.component';
import { WORRY_PRODUCTIVELY_QUOTES, WORRY_PRODUCTIVELY_MESSAGE, WORRY_PRODUCTIVELY_NGT_MESSAGE } from './worry-productively-message';

@Component({
  selector: 'app-worry-productively-form',
  templateUrl: './worry-productively.component.html',
  styleUrls: ['./worry-productively.component.scss'],
  //   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorryProductivelyComponent implements OnInit, OnDestroy {
  user!: User;
  worry!: Worry;
  type = WORRY_PRODUCTIVELY;
  reset = false;
  page = 1;
  worryEditMode = false;
  characteristicCheck = false;
  subscriptions: Subscription[] = [];
  buttonClick = false;
  originalWorryClick = false;
  originalWorryContinue = false;
  checkBoxContinue = false;
  characteristicCount = 0;
  data = [{ value: '', is_checked: false }];
  useless_characteristic: string[] = [];
  useless_characteristics = '';
  sliderResponseFinal!: string[] | undefined;
  @ViewChild('autosize', { static: false }) autosize!: CdkTextareaAutosize;
  @ViewChild(WorryFormComponent, { static: false })
  worryStatementForm!: WorryFormComponent;
  @ViewChild(FormSliderComponent, { static: false })
  sliderRating!: FormSliderComponent;
  @ViewChild(TechniquesComponent, { static: false })
  technique!: TechniquesComponent;
  worrySliderQuestion = 'How bothered are you by your worry?';
  wSliderMinRangeText = 'Not at all';
  wSliderMaxRangeText = 'Very Strongly';
  quote !: string;;
  quotedBy !: string;
  finalRating !: number;
  initialRating !: number;
  showMessage !: boolean;
  formComplete !: boolean;
  // message!: FormMessage;
  uselessCharacteristicsForm = this.fb.group({
    characteristics: this.fb.array([]),
  });

  constructor(
    private worryService: WorryProductivelyService,
    private authService: AuthService,
    private errorService: GeneralErrorService,
    private fb: FormBuilder,
    // private formService: FormService,
  ) { }

  ngOnInit() {
    this.subscriptions[
      this.subscriptions.length
    ] = this.worryService.worryBehaviour.subscribe((worry: any) => {
      if (Object.entries(worry).length > 0) {
        this.worrySelected(worry);
      }
    }, this.errorService.errorResponse('Something went wrong'));
    const user = this.authService.isLoggedIn();
    if (user && user.is_active) {
      this.user = <User>user;
    }

    this.worryService.getUselessCharacteristics().subscribe((data: any) => {
      data.map((uselessChar: any) => {
        this.data.push({ value: uselessChar, is_checked: false });
      });
    });
    this.data.shift();
  }
  ngOnChanges() { }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
  worrySelected(worry: Worry) {
    this.onAddNewForm();
    console.log(worry.worry + "value " + worry.worry_rating_initial);
    this.initialRating = parseInt(worry.worry_rating_initial);
    this.worry = worry;
    this.worryEditMode = false;
    if (this.worry) {
      this.worryService
        .getCharacteristics(this.worry.id)
        .subscribe((resp: any) => {
          if (resp.body.data) {
            this.uselessCharacteristicsForm.setControl(
              'characteristics',
              this.fb.array(resp.body.data),
            );
            if (this.worry.worry_rating_initial != null) {
              this.buttonClick = true;
            }
            resp.body.data.forEach((data: any) => {
              // const obj = this.data.find((x , i) => {
              //   if (x.value === data) {
              //     this.data[i].is_checked = true;
              //     this.characteristicCount += 1;
              //     return true;
              //   }
              // });
              for (var i = 0; i < this.data.length; i++) {
                if (this.data[i].value === data) {
                  this.data[i].is_checked = true;
                  this.characteristicCheck = true;
                }
              }
            });
          }
        });
    }
    if (this.worry) {
      this.worryService.getFinalSlider(this.worry.id).subscribe((resp: any) => {
        if (resp) {
          this.sliderResponseFinal = resp.body.worry_rating_final;
          this.originalWorryClick = true;
        }

      });
    }
  }
  onEditWorryClick() {
    this.onWorryClick();
    console.log(this.worryEditMode);
    if (this.worryStatementForm) {
      this.worryStatementForm.editWorryText();
    }
  }
  onWorryClick() {
    if (this.worry) {
      this.worryEditMode = true;
    }

  }

  onAddNewForm() {
    delete this.worry;
    this.reset = !this.reset;
    this.uselessCharacteristicsForm = this.fb.group({
      characteristics: this.fb.array([]),
    });
    for (var i = 0; i < this.data.length; i++) {
      this.data[i].is_checked = false;
    }
    this.sliderResponseFinal = undefined;
    this.buttonClick = false;
    this.characteristicCheck = false;
    this.originalWorryClick = false;
    this.originalWorryContinue = false;
    this.showMessage = false;
    // this.technique.resetTechniques();
  }
  deleteWorry() {
    this.buttonClick = false;
    this.characteristicCheck = false;
    this.originalWorryClick = false;
  }
  continueAfterSlider(selected: any) {
    this.buttonClick = selected;
  }
  updateValueChange(event: any, index: number) {
    this.checkBoxContinue = true;
    const characteristics = (<FormArray>(
      this.uselessCharacteristicsForm.get('characteristics')
    )) as FormArray;
    if (event.checked) {
      characteristics.push(new FormControl(event.source.value));
      this.characteristicCount += 1;
    } else {
      const i = characteristics.controls.findIndex(
        x => x.value === event.source.value,
      );
      characteristics.removeAt(i);
      this.characteristicCount -= 1;
    }
  }

  OnCharacteristicCheck() {
    this.checkBoxContinue = false;
    this.characteristicCheck = true;
    // this.techniquesCall.emit(this.characteristicCheck);
    this.useless_characteristics = this.useless_characteristic.join(',');
    if (this.worry) {
      const object = {
        useless_characteristics: this.uselessCharacteristicsForm.value[
          'characteristics'
        ],
      };
      this.worryService
        .postUselessCharacteristics(object, this.worry.id)
        .subscribe((resp: any) => {
          const status = resp.ok;
          if (status) {
            console.log('The request has been submited');
          }
        });
    }
  }
  showOriginalWorry(event: any) {
    this.originalWorryContinue = event;
  }
  onOriginalWorry() {
    this.originalWorryClick = true;
  }
  OnFinalSliderClick() {
    if (this.sliderResponseFinal == undefined && this.worry) {
      const object = {
        worry_id: this.worry.id,
        worry_rating_final: this.sliderRating.rating,
      };
      this.finalRating = this.sliderRating.rating;
      this.worryService.postFinalSlider(object).subscribe((resp: any) => {
        const status = resp.ok;
        if (status) {
          console.log('The request has been submited');
        }
        this.sliderResponseFinal = resp.body.worry_rating_final;
      });
    } else if (this.sliderResponseFinal != undefined && this.worry) {
      const object = {
        worry_id: this.worry.id,
        worry_rating_final: this.sliderRating.rating,
      };
      this.finalRating = this.sliderRating.rating;
      this.worryService
        .putFinalSlider(object, this.worry.id)
        .subscribe((resp: any) => {
          const status = resp.ok;
          if (status) {
            console.log('The request has been submited');
          }
        });
    }
    this.formComplete = true;
    // this.onShowMessage();
  }
  // onShowMessage() {
  //   if (this.initialRating > 0 && this.finalRating > 0 && this.formComplete) {
  //     const index = this.formService.getRandomInt(WORRY_PRODUCTIVELY_QUOTES.length);
  //     this.quote = WORRY_PRODUCTIVELY_QUOTES[index].quote;
  //     this.quotedBy = WORRY_PRODUCTIVELY_QUOTES[index].by;
  //     this.showMessage = true;
  //     if (this.finalRating < this.initialRating) {
  //       this.message = new FormMessage(
  //         WELL_DONE_IMG,
  //         'Well Done',
  //         WORRY_PRODUCTIVELY_MESSAGE[
  //           this.formService.getRandomInt(WORRY_PRODUCTIVELY_MESSAGE.length)
  //         ],
  //       );
  //     } else {
  //       this.message = new FormMessage(
  //         THINKING_IMG,
  //         '',
  //         WORRY_PRODUCTIVELY_NGT_MESSAGE[
  //           this.formService.getRandomInt(WORRY_PRODUCTIVELY_NGT_MESSAGE.length)
  //         ],
  //       );
  //     }
  //   }
  // }
}
