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
// import { ProblemFormComponent } from '../problem-solving-worksheets/problem-form/problem-form.component';
import { WorryFormComponent } from './worry-form/worry-form.component';
import { FormSliderComponent } from '../shared/form-slider/form-slider.component';
import { Subscription } from 'rxjs';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { GeneralErrorService } from '@/main/shared/general-error.service';
import { ProblemSolvingWorksheetsService } from '../problem-solving-worksheets/problem-solving-worksheets.service';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { MatCheckbox } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';
import { TechniquesComponent } from './techniques/techniques.component';

@Component({
  selector: 'app-worryProd-form',
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
  buttonClick: boolean;
  buttonclick: boolean;
  form: any;
  controlNames: string[];
  selectedNames$ = [{}];
  worrySliderQuestion = ' How bothered are you by your worry?';
  wSliderMinRangeText = 'Not at all';
  wSliderMaxRangeText = 'Very Strongly';

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
  // @ViewChild('Checkbox') private Checkbox: MatCheckbox;

  constructor(
    // private http: HttpClient
    private problemService: ProblemSolvingWorksheetsService,
    private authService: AuthService,
    private errorService: GeneralErrorService,
    private fb: FormBuilder,
  ) {
    this.buttonClick = false;
    this.buttonclick = false;
    this.form = this.fb.group({
      'Future "what if..."': false,
      "Keeping seeking reassurance from others that everything is going to be okay but reassurance doesn't help.": false,
      'Worried about worst going to happen': false,
      Guilty: false,
      Jealous: false,
      Hopeless: false,
      Worthless: false,
      Lonely: false,
      Frustated: false,
      Embarrassed: false,
    });
    this.controlNames = Object.keys(this.form.controls).map(_ => _);
    // this.selectedNames$ = this.form.valueChanges.pipe(map(v => Object.keys(v).filter(k => v[k])));
    console.log(this.selectedNames$);
  }

  ngOnInit() {
    this.subscriptions[
      this.subscriptions.length
    ] = this.problemService.problemBehaviour.subscribe((problem: any) => {
      if (Object.entries(problem).length > 0) {
        this.worrySelected(problem);
      }
    }, this.errorService.errorResponse('Something went wrong'));
    const user = this.authService.isLoggedIn();
    if (user && user.is_active) {
      this.user = <User>user;
    }
  }

  // getProblems() {
  //   const params = new HttpParams().set('page', this.page.toString());
  //   return this.http.get<Problem[]>(environment.API_ENDPOINT + '/api/v1/worksheets/problem-solving/problems/', { params: params })
  //     .subscribe(
  //       (data: any) => {
  //         const problems = <Problem[]>data.results;
  //         if (this.page === 1) {
  //           this.problems = [];
  //         }
  //         this.problems.push(...problems);
  //         console.log('Problem :'+ this.problems);
  //       },
  //       (error: HttpErrorResponse) => {
  //         console.error(error);
  //       }
  //     );
  //   }
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

  continuetoSlider(selected: any) {
    this.buttonClick = selected;
    console.log(this.buttonClick);
  }
  continuetoCharacteristics() {
    this.buttonclick = true;
    console.log(this.buttonclick);
  }
  userresponse = false;
  OnCharacteristicCheck() {
    this.userresponse = true;
    console.log('selected values' + this.selectedNames$);
    // console.log(val2);
    // this.userresponse = this.userresponse.push(.checked);
  }
}
