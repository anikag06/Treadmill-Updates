import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  AfterContentChecked,
} from '@angular/core';
import { Worry } from '../../worry.model';
import { FormSliderComponent } from '../../../shared/form-slider/form-slider.component';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { WorryProductivelyService } from '@/main/resources/forms/worry-productively-form/worry-productively.service';
import { TechniquesInfoComponent } from '@/main/resources/forms/shared/techniques-info/techniques-info.component';
import { MatDialog } from '@angular/material';
import { THINIKING_ERROR_DATA } from '@/main/resources/forms/shared/techniques-info/thinking-error-technique.data';

@Component({
  selector: 'app-evaluate-worry',
  templateUrl: './evaluate-worry.component.html',
  styleUrls: ['./evaluate-worry.component.scss'],
})
export class EvaluateWorryComponent implements OnInit, AfterContentChecked {
  @Input() worry!: Worry;
  @Output() valueUpdate = new EventEmitter();
  @Output() summaryEvaluateEvent = new EventEmitter<string>();
  @Output() techniqueExpanded = new EventEmitter();
  @Output() techniqueCollapsed = new EventEmitter();
  @Input() summaryIndex!: number;
  @ViewChild(FormSliderComponent, { static: false })
  sliderRating!: FormSliderComponent;
  @ViewChild('panel1', { static: false }) panel1!: any;
  buttonClick = false;
  sliderSubmit = false;
  continueText = false;
  evidencesubmitted = false;
  checksubmitted = false;
  checkBoxContinue = false;
  evidenceContinue = false;
  sliderContinue = false;
  showTrashIcon: boolean[] = [];
  // evidences!: FormArray;
  evaluateSliderQuestion =
    'Based on these, how likely is the outcome that you are worried about?';
  evaSliderMinRangeText = 'Low';
  evaSliderMaxRangeText = 'High';
  info_heading = 'Type of Thinking Errors';

  summaryText = '';
  evaluateForm = this.fb.group({
    thinking_errors: this.fb.array([]),
    evidences: this.fb.array([]),
  });
  data = [{ value: '', is_checked: false }];
  errorCount = 0;
  thinkingError: string[] = [];
  sliderResponse!: number;
  thinkingErrors = '';

  constructor(
    private fb: FormBuilder,
    private worryService: WorryProductivelyService,
    private changeDetector: ChangeDetectorRef,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    // this.worryService.thinkingErrors().subscribe((data: any) => {
    //   data.map((uselessChar: any) => {
    //     this.data.push({ value: uselessChar, is_checked: false });
    //   });
    // });
    // this.data.shift();
  }
  ngOnChanges() {
    this.resetForm();
    console.log(this.sliderRating);
    const formArray = this.getEvidence;
    if (this.data[0].value === '') {
      this.worryService.thinkingErrors().subscribe((data: any) => {
        data.map((uselessChar: any) => {
          this.data.push({ value: uselessChar, is_checked: false });
        });
      });
      this.data.shift();
    }
    if (this.worry) {
      this.worryService
        .getThinkingErrors(this.worry.id)
        .subscribe((resp: any) => {
          if (resp.body.data) {
            this.evaluateForm.setControl(
              'thinking_errors',
              this.fb.array(resp.body.data),
            );
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

    if (this.worry) {
      this.worryService.getEvidences(this.worry.id).subscribe((resp: any) => {
        if (resp.body.data.evidences.length !== 0) {
          for (let i = 0; i < resp.body.data.evidences.length; i++) {
            formArray.push(
              this.createEditItem(
                resp.body.data.evidences[i].id,
                resp.body.data.evidences[i].evidence,
              ),
            );
          }
          this.checksubmitted = true;
          this.sliderSubmit = true;
          this.buttonClick = true;
          if (resp.body.data.evidences[0].evidence.length > 0) {
            this.summaryText = resp.body.data.evidences[0].evidence;
            this.panelCollapse();
          }

          // this.summaryEvaluateEvent.emit(this.summaryText);
        } else {
          formArray.push(this.createItem());
        }
      });
    } else {
      formArray.push(this.createItem());
      console.log('form array is :' + formArray);
    }
    if (this.worry) {
      this.worryService
        .getProbablityRating(this.worry.id)
        .subscribe((resp: any) => {
          if (resp) {
            console.log(
              'final slider data is :' + resp.body.probability_rating,
            );
            if (resp.body.probability_rating == null) {
              this.sliderResponse = 1;
            } else {
              this.sliderResponse = resp.body.probability_rating;
            }
          }
        });
    }
  }
  get getEvidence() {
    return this.evaluateForm.get('evidences') as FormArray;
  }
  worrySelected(worry: Worry) {
    this.worry = worry;
  }
  onEvaluateSubmit() {
    // this.summaryText = this.evaluateForm.value['evaluateStatement'];
    this.buttonClick = true;
    this.evidenceContinue = false;

    console.log(this.buttonClick);
    const object = {
      evidences: this.evaluateForm.controls['evidences'].value,
    };
    this.summaryText = object.evidences[0].evidence;
    this.worryService
      .postEvidences(object, this.worry.id)
      .subscribe((resp: any) => {
        const status = resp.ok;
        if (status) {
          console.log('The request has been submited');
        }
      });
    // }
  }
  CheckSubmit() {
    console.log(' button' + this.buttonClick + 'and ' + this.checksubmitted);
    this.checkBoxContinue = false;
    this.checksubmitted = true;
    console.log(this.data);
    this.thinkingErrors = this.thinkingError.join(',');
    const object = {
      thinking_errors: this.evaluateForm.value['thinking_errors'],
    };
    console.log(object);
    if (this.worry) {
      this.worryService
        .postThinkingErrors(object, this.worry.id)
        .subscribe((resp: any) => {
          const status = resp.ok;
          if (status) {
            console.log('The request has been submited');
          }
        });
    }
  }

  updateValueChange(event: any, index: number) {
    this.checkBoxContinue = true;
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
    this.sliderContinue = false;
    console.log(this.sliderRating.rating);
    // if (this.sliderRating == undefined) {
    const object = {
      worry_id: this.worry.id,
      probability_rating: this.sliderRating.rating,
    };
    this.worryService
      .putProbabilityRating(object, this.worry.id)
      .subscribe((resp: any) => {
        const status = resp.ok;
        if (status) {
          console.log('The request has been submited');
        }
      });
    // }
  }
  resetForm() {
    this.evaluateForm = this.fb.group({
      thinking_errors: this.fb.array([]),
      evidences: this.fb.array([]),
    });
    for (let i = 0; i < this.data.length; i++) {
      this.data[i].is_checked = false;
    }
    this.summaryText = '';
    this.checksubmitted = false;
    this.buttonClick = false;
    this.sliderSubmit = false;
  }
  showSliderContinue() {
    this.sliderContinue = true;
  }
  doneSummary() {
    this.panel1.expanded = false;
  }

  createItem(name = '') {
    return this.fb.group({
      evidence: name,
    });
  }

  createEditItem(id = 0, name = '') {
    return this.fb.group({
      id: id,
      evidence: name,
    });
  }

  markForDeletion(evidence: any, index: number) {
    console.log(evidence.value.id);

    const FormArray = this.getEvidence;
    if (evidence.value.id) {
      this.worryService
        .deleteEvidence(evidence.value.id)
        .subscribe((resp: any) => {
          const status = resp.ok;
          if (status) {
            console.log('deleted');
          }
        });
    }

    FormArray.removeAt(index);
    this.showTrashIcon.splice(index, 1);
    this.changeDetector.detectChanges();
  }

  addField() {
    const FormArray = this.getEvidence;
    FormArray.push(this.createItem());
    this.showTrashIcon.push(false);
    this.changeDetector.detectChanges();
  }

  onClickOutside(event: Object, index: number) {
    if (event && (<any>event)['value'] === true) {
      this.showTrashIcon[index] = false;
    }
  }

  onShowTrashIcon(index: number) {
    this.showTrashIcon[index] = !this.showTrashIcon[index];
    this.evidenceContinue = true;
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  onShowInfo($event: Event) {
    $event.stopPropagation();
    const dialogRef = this.dialog.open(TechniquesInfoComponent, {
      panelClass: 'technique-info-dialog-container',
      autoFocus: false,
      data: {
        techniquesInfo: THINIKING_ERROR_DATA,
        about: this.info_heading,
      },
    });
  }

  panelCollapse() {
    const object = {
      index: this.summaryIndex,
      summary: this.summaryText ? this.summaryText : '',
    };
    this.techniqueCollapsed.emit(object);
  }
}
