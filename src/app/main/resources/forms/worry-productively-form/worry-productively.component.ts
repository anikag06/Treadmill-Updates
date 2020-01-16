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
import { FormBuilder } from '@angular/forms';
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
  // buttonclick: boolean;
  form: any;
  controlNames: string[];
  selectedNames$ = [{}];

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
  // @ViewChild('Checkbox') private Checkbox: MatCheckbox;

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
    console.log(this.selectedNames$);
  }

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
    // this.OnSliderClick();
  }

  continueAfterSlider(selected: any) {
    this.buttonClick = selected;
    console.log(this.buttonClick);
  }
  // continuetoCharacteristics() {
  //   this.buttonclick = true;
  //   console.log(this.buttonclick);
  // }
  userresponse = false;
  OnCharacteristicCheck() {
    this.userresponse = true;
    console.log('selected values' + this.selectedNames$);
    // console.log(val2);
    // this.userresponse = this.userresponse.push(.checked);
  }
}
