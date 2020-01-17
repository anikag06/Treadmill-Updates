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
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { MatCheckbox } from '@angular/material';
import { FormBuilder, FormControl, FormArray } from '@angular/forms';
import { map } from 'rxjs/operators';
import { TechniquesComponent } from './techniques/techniques.component';
import { WorryProductivelyService } from '@/main/resources/forms/worry-productively-form/worry-productively.service';

@Component({
  selector: 'app-worry-productively-form',
  templateUrl: './worry-productively.component.html',
  styleUrls: ['./worry-productively.component.scss'],
  //   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorryProductivelyComponent implements OnInit, OnDestroy {
  // private problems: Problem[] = [];
  user!: User;
  worry!: Worry;
  page = 1;
  worryEditMode = false;
  subscriptions: Subscription[] = [];
  buttonClick = false;
  characteristicCount = 0;
  form: any;
  controlNames: string[];
  data = [{ value: '', is_checked: false }];
  useless_characteristic: string[] = [];
  useless_characteristics = '';
  // items = [
  // 'Future \"what if...\"',
  // 'Keeping seeking reassurance from others that everything is going to be okay but reassurance doesn\'t help.',
  // 'Worried about worst going to happen',
  // 'Guilty',
  // 'Jealous',
  // 'Hopeless',
  // 'Worthless',
  // 'Lonely',
  // 'Frusutated',
  // 'Embarrassed'
  // ];

  @ViewChild('autosize', { static: false }) autosize!: CdkTextareaAutosize;
  @ViewChild(WorryFormComponent, { static: false })
  worryStatementForm!: WorryFormComponent;
  worrySliderQuestion = 'How bothered are you by your worry?';
  wSliderMinRangeText = 'Not at all';
  wSliderMaxRangeText = 'Very Strongly';
  uselessCharacteristicsForm = this.fb.group({
    characteristics: this.fb.array([]),
  });


  constructor(
    // private http: HttpClient
    private worryService: WorryProductivelyService,
    private authService: AuthService,
    private errorService: GeneralErrorService,
    private fb: FormBuilder,
  ) {

    this.form = this.fb.group({
      'Future "what if..."': false,
      'Keeping seeking reassurance from others that everything is going to be okay but reassurance doesn\'t help.': false,
      'Worried about worst going to happen': false,
      'Guilty': false,
      'Jealous': false,
      'Hopeless': false,
      'Worthless': false,
      'Lonely': false,
      'Frustated': false,
      'Embarrassed': false,
    });
    this.controlNames = Object.keys(this.form.controls).map(_ => _);
    // this.selectedNames$ = this.form.valueChanges.pipe(map(v => Object.keys(v).filter(k => v[k])));
    // console.log(this.selectedNames$);
  }

  ngOnInit() {
    // let datacheckbox !: [{ value: string, is_checked: boolean }];
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
    this.worryService.getUselessCharacteristics()
      .subscribe((data: any) => {
        data.map((uselessChar: any) => {
          (this.data.push({ value: uselessChar, is_checked: false }));
          console.log(this.data + 'and data' + uselessChar);
        });
      });
    this.data.shift();
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
  worrySelected(worry: Worry) {
    this.worry = worry;
    this.worryEditMode = false;
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

  continueAfterSlider(selected: any) {
    this.buttonClick = selected;
  }
  updateValueChange(event: any, index: number) {
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
    console.log(this.data);
    this.useless_characteristics = this.useless_characteristic.join(',');
    const object = {
      thinking_errors: this.uselessCharacteristicsForm.value['characteristics'],
    };
    console.log(object);
    // this.identifyThinkingService
    //   .postThinkingErrors(object, this.worry.id)
    //   .subscribe((resp: any) => {
    //     const status = resp.ok;
    //     if (status) {
    //       this.submitted = true;
    //     }
    //   });
  }
}
