import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Worry } from '../../worry.model';
import { FormSliderComponent } from '../../../shared/form-slider/form-slider.component';
import { FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { WorryProductivelyService } from '@/main/resources/forms/worry-productively-form/worry-productively.service';
@Component({
  selector: 'app-evaluate-worry',
  templateUrl: './evaluate-worry.component.html',
  styleUrls: ['./evaluate-worry.component.scss'],
})
export class EvaluateWorryComponent implements OnInit {
  @Input() EvaluatedClicked = false;
  @Output() summaryEvaluateEvent = new EventEmitter<boolean>();
  // @ViewChild(WorryFormComponent, { static: false })
  // evaluateStatementForm!: WorryFormComponent;

  // item = [
  //   'Emotional Reasoning',
  //   'All or None Thinking ',
  //   'Angry',
  //   'Guilty',
  //   'Jealous',
  //   'Hopeless',
  //   'Worthless',
  //   'Lonely',
  //   'Frustated',
  //   'Embarrassed',
  // ];
  worry!: Worry;  
  buttonClick = false;
  summary = false;
  sliderSubmit = false;
  continueText = false;
  evidencesubmitted = false;
  evaluateSliderQuestion = 'Guess Probability';
  evaSliderMinRangeText = 'Low';
  evaSliderMaxRangeText = 'High';
  summaryText = '';
  evaluateForm = this.fb.group({
    thinking_errors : this.fb.array([]),
    evaluateStatement: new FormControl('', Validators.required),
  });
  data = [{ value: '', is_checked: false }];
  errorCount = 0;
  thinkingError: string[] = [];
  thinkingErrors = '';
  
  constructor(
    private fb: FormBuilder,
    private worryService: WorryProductivelyService,
  ) {}

  ngOnInit() {
    this.worryService.getUselessCharacteristics().subscribe((data: any) => {
      data.map((uselessChar: any) => {
        this.data.push({ value: uselessChar, is_checked: false });
        console.log(this.data + 'and data' + uselessChar);
      });
    });
    this.data.shift();
  }
  ngOnChanges() {
    if (this.worry) {
      this.worryService
        .getThinkingErrors(this.worry.id)
        .subscribe((resp: any) => {
          if (resp.body.data) {
            resp.body.data.forEach((data: any) => {
              // @ts-ignore
              const obj = this.data.find((x, i) => {
                if (x.value === data) {
                  this.data[i].is_checked = true;
                  this.errorCount += 1;
                  return true;
                }
              });
            });
          }
        });
    }
  }
  onEvaluateSubmit() {
    this.summaryText = this.evaluateForm.value['evaluateStatement'];
    this.buttonClick = true;
    console.log(this.buttonClick);
  }
  checksubmitted = false;
  CheckSubmit() {
    this.checksubmitted = true;
    console.log(this.data);
    this.thinkingErrors = this.thinkingError.join(',');
    const object = {
      thinking_errors: this.evaluateForm.value['thinking_errors'],
    };
    console.log(object);
    this.worryService
      .postThinkingErrors(object, this.worry.id)
      .subscribe((resp: any) => {
        const status = resp.ok;
        if (status) {
          console.log('The request has been submited');
        }
      });
  }
  updateValueChange(event: any, index: number) {
    const thinking_errors = (<FormArray>(
      this.evaluateForm.get('thinking_errors')
    )) as FormArray;
    if (event.checked) {
      thinking_errors.push(new FormControl(event.source.value));
      this.errorCount += 1;
    } else {
      const i = thinking_errors.controls.findIndex(
        x => x.value === event.source.value,
      );
      thinking_errors.removeAt(i);
      this.errorCount -= 1;
    }
  }

  EvidenceSubmit() {
    this.evidencesubmitted = true;
  }
  onSliderSubmit() {
    this.sliderSubmit = true;
  }
  doneSummary() {
    this.summary = true;
    this.summaryEvaluateEvent.emit(this.summary);
  }
  setSummary() {
    this.summary = false;
  }
  onFocusOut(event: any) {
    if (
      !(
        <Element>event.relatedTarget &&
        (<Element>event.relatedTarget).classList.contains('continue-btn')
      )
    ) {
      this.continueText = false;
    }
  }
  
    
  
}
