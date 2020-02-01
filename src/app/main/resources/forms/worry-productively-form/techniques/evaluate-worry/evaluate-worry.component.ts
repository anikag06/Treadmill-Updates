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

@Component({
  selector: 'app-evaluate-worry',
  templateUrl: './evaluate-worry.component.html',
  styleUrls: ['./evaluate-worry.component.scss'],
})
export class EvaluateWorryComponent implements OnInit, AfterContentChecked {
  @Input() EvaluatedClicked = false;
  // @Input() summary = false;
  @Input() worry!: Worry;
  @Output() valueUpdate = new EventEmitter();
  @Output() summaryEvaluateEvent = new EventEmitter<boolean>();
  @ViewChild(FormSliderComponent, { static: false })
  sliderRating!: FormSliderComponent;
  buttonClick = false;
  summary = false;
  sliderSubmit = false;
  continueText = false;
  evidencesubmitted = false;
  checksubmitted = false;
  showTrashIcon: boolean[] = [];
  // evidences!: FormArray;
  evaluateSliderQuestion = 'Guess Probability';
  evaSliderMinRangeText = 'Low';
  evaSliderMaxRangeText = 'High';
  summaryText = '';
  evaluateForm = this.fb.group({
    thinking_errors: this.fb.array([]),
    evidences: this.fb.array([]),
  });
  data = [{ value: '', is_checked: false }];
  errorCount = 0;
  thinkingError: string[] = [];
  thinkingErrors = '';

  constructor(
    private fb: FormBuilder,
    private worryService: WorryProductivelyService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.worryService.thinkingErrors().subscribe((data: any) => {
      data.map((uselessChar: any) => {
        this.data.push({ value: uselessChar, is_checked: false });
        //console.log(this.data + 'and data' + uselessChar);
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

    const formArray = this.getEvidence;
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
          // this.setSummary.emit();
          this.summaryText = resp.body.data.evidences[0].evidence;
        } else {
          formArray.push(this.createItem());
        }
      });
    } else {
      formArray.push(this.createItem());
      console.log('form array is :' + formArray);
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
    console.log(this.buttonClick);
    // if(this.evaluate && this.evaluate.id){
    //  for(var i=0;i<Object.entries(this.evaluate).length;i++){
    //     const object = {
    //       id : this.evaluate.id,
    //       evidences :  this.evaluateForm.controls['evidences'].value
    //     }
    //     this.worryService.putEvidences(object,this.worry.id).subscribe(
    //       (resp : any) => {
    //         const status = resp.ok;
    //         if (status) {
    //           console.log('The request has been submited');
    //         }
    //     });
    //   }
    // } else {
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
    console.log(this.sliderRating.rating);
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
  }

  doneSummary() {
    this.summary = true;
    this.summaryEvaluateEvent.emit(this.summary);
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
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
}
