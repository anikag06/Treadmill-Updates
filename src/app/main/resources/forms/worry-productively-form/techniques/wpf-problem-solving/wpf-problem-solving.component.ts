import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { Worry } from '../../worry.model';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { WorryProductivelyService } from '../../worry-productively.service';
@Component({
  selector: 'app-wpf-problem-solving',
  templateUrl: './wpf-problem-solving.component.html',
  styleUrls: ['./wpf-problem-solving.component.scss'],
})
export class WpfProblemSolvingComponent implements OnInit {
  @Input() canISolve = false;
  @Input() worry!: Worry;
  @Output() summaryProbSolvingEvent = new EventEmitter<boolean>();
  radioResponse = '';
  imageDisplay = false;
  // choices = ['Yes', 'No'];
  summary = false;
  summaryText = '';
  responseData = '';
  problemSolving: string[] = [];
  problemSolvingForm = this.fb.group({
    problemSolvingStatement: new FormControl('', Validators.required),
    choices: new FormControl(),
  });
  continueButton = false;
  constructor(
    private fb: FormBuilder,
    private worryService: WorryProductivelyService,
  ) {}

  ngOnInit() {}
  ngOnChanges() {
    if (this.worry) {
      this.worryService
        .getProblemSolving(this.worry.id)
        .subscribe((resp: any) => {
          console.log('problem solving' + resp);
          if (resp.body) {
            if (resp.body.can_do_anything) {
              this.problemSolvingForm.controls['choices'].setValue('1');
            } else if (!resp.body.can_do_anything) {
              this.problemSolvingForm.controls['choices'].setValue('0');
            }
            this.problemSolvingForm.controls[
              'problemSolvingStatement'
            ].setValue(resp.body.problem_statement);
            this.problemSolving.push(resp);
          }
        });
    }
  }
  // worrySelected(worry: Worry) {
  //   this.worry = worry
  //   if(this.worry){
  //     this.worryService.getProblemSolving(this.worry.id).subscribe(
  //       (resp : any) => {
  //         console.log('problem solving'+resp);
  //         if(resp.body.length !== 0){

  //           this.problemSolving.push(resp);
  //         }
  //       }
  //     );
  //   }
  // }
  canDoAnything!: number;
  // setResponse(){
  //   this.radioResponse = this.problemSolvingForm.value['choices'];
  //   console.log(this.radioResponse);
  // }
  continueSummary() {
    this.imageDisplay = true;
    this.continueButton = false;
    if (this.problemSolvingForm.value['choices'] == '1') {
      this.summaryText = this.problemSolvingForm.value[
        'problemSolvingStatement'
      ];
      this.canDoAnything = 1;
    } else if (this.problemSolvingForm.value['choices'] == '0') {
      this.canDoAnything = 0;
      this.summaryText = '';
    }

    if (this.responseData.length == 0 && this.problemSolving.length == 0) {
      const object = {
        worry_id: this.worry.id,
        can_do_anything: this.canDoAnything,
        problem_statement: this.summaryText,
      };
      this.worryService.postProblemSolving(object).subscribe((resp: any) => {
        const status = resp.ok;
        if (status) {
          console.log('The request has been submited');
        }
        console.log(resp.body);
        this.responseData = resp.body.problem_statement;
      });
    } else if (this.responseData.length > 0) {
      const object = {
        worry_id: this.worry.id,
        can_do_anything: this.canDoAnything,
        problem_statement: this.summaryText,
      };
      this.worryService
        .putProblemSolving(object, this.worry.id)
        .subscribe((resp: any) => {
          const status = resp.ok;
          if (status) {
            console.log('The request has been submited');
          }
        });
    }
  }
  showSummary() {
    this.summary = true;
    this.summaryProbSolvingEvent.emit(this.summary);
  }

  falseResponse() {
    this.continueSummary();
  }
  onFocus() {
    this.continueButton = true;
  }
}
