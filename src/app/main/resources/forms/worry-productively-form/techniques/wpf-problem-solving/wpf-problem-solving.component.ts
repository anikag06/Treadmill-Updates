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
  @Input() worry!: Worry;
  @Output() summaryProbSolvingEvent = new EventEmitter<string>();
  @ViewChild('panel4', { static: false }) panel4!: any;
  @Output() techniqueExpanded = new EventEmitter();
  @Output() techniqueCollapsed = new EventEmitter();
  @Input() summaryIndex!: number;
  radioResponse = '';
  imageDisplay = false;
  // choices = ['Yes', 'No'];
  summaryText!: string;
  responseData = '';
  problemSolving: string[] = [];
  canDoAnything!: number;
  problemSolvingForm = this.fb.group({
    problemSolvingStatement: new FormControl(''),
    choices: new FormControl(''),
  });
  noSelectedSummary =
    "No, sometimes we can't control everything in our lives and " +
    'we need to accept things the way they are by changing our attitude we ' +
    'can gradually overcome the problem.';
  continueButton = false;
  constructor(
    private fb: FormBuilder,
    private worryService: WorryProductivelyService,
  ) {}

  ngOnInit() {}
  ngOnChanges() {
    this.resetForm();
    // this.summaryProbSolvingEvent.emit(this.summaryText);
    if (this.worry) {
      this.worryService
        .getProblemSolving(this.worry.id)
        .subscribe((resp: any) => {
          if (resp.body) {
            if (resp.body.can_do_anything) {
              this.problemSolvingForm.controls['choices'].setValue(true);
              this.summaryText = resp.body.problem_statement;
              this.panelCollapse();
              this.summaryProbSolvingEvent.emit(this.summaryText);
            } else if (!resp.body.can_do_anything) {
              this.problemSolvingForm.controls['choices'].setValue(false);
              this.summaryText = this.noSelectedSummary;
              this.panelCollapse();
            }
            this.problemSolvingForm.controls[
              'problemSolvingStatement'
            ].setValue(resp.body.problem_statement);
            this.problemSolving.push(resp.body.problem_statement);
          }
        });
    }
  }
  resetForm() {
    this.problemSolvingForm = this.fb.group({
      problemSolvingStatement: new FormControl(''),
      choices: new FormControl(''),
    });
    this.summaryText = '';
    // this.summaryProbSolvingEvent.emit(this.summaryText);
  }

  continueSummary() {
    this.imageDisplay = true;
    this.continueButton = false;
    if (this.problemSolvingForm.value['choices'] === true) {
      this.summaryText = this.problemSolvingForm.value[
        'problemSolvingStatement'
      ];
      this.canDoAnything = 1;
    } else if (this.problemSolvingForm.value['choices'] === false) {
      this.canDoAnything = 0;
      this.summaryText = this.noSelectedSummary;
    }

    if (this.responseData.length === 0 && this.problemSolving.length === 0) {
      const object = {
        worry_id: this.worry.id,
        can_do_anything: this.canDoAnything,
        problem_statement: this.summaryText,
      };
      this.worryService.postProblemSolving(object).subscribe((resp: any) => {
        const status = resp.ok;
        if (status) {
        }
        this.responseData = resp.body.problem_statement;
      });
    } else if (
      this.responseData.length > 0 ||
      this.problemSolving.length !== 0
    ) {
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
          }
        });
    }
  }
  showSummary() {
    // this.summaryProbSolvingEvent.emit(this.summaryText);
    this.panel4.expanded = false;
  }

  falseResponse() {
    this.continueSummary();
    this.panel4.expanded = false;
  }
  onFocus() {
    this.continueButton = true;
  }

  panelCollapse() {
    const object = {
      index: this.summaryIndex,
      summary: this.summaryText ? this.summaryText : '',
    };
    this.techniqueCollapsed.emit(object);
  }
}
