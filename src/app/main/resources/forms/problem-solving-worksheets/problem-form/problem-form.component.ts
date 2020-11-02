import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Problem } from '../problem.model';
import { ProblemSolvingWorksheetsService } from '../problem-solving-worksheets.service';

@Component({
  selector: 'app-problem-form',
  templateUrl: './problem-form.component.html',
  styleUrls: ['./problem-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProblemFormComponent implements OnInit {
  @Input() problem!: Problem;
  @Output() addProblem = new EventEmitter();
  @Output() updateProblem = new EventEmitter();
  showLoading = false;
  // TODO: Remove if code is not breaking due to this
  // @Output() testOut = new EventEmitter<string>();

  @ViewChild('problemTextArea', { static: false }) problemTextArea!: ElementRef;
  problemStatement = '';

  constructor(private problemService: ProblemSolvingWorksheetsService) {}

  ngOnInit() {
    if (this.problem) {
      this.problemStatement = this.problem.problem;
    }
  }
  // ngAfterViewInit() {
  //   if (this.problem && this.problemTextArea) {
  //     setTimeout(() => {
  //       this.editProblemText();
  //     }, 100);
  //   }
  // }

  editProblemText() {
    this.problemTextArea.nativeElement.focus();
  }
  onProblemSubmit() {
    if (this.problem && Object.entries(this.problem).length > 0) {
      this.problem.problem = this.problemStatement;
      this.problemService
        .putProblem(
          {
            problem: this.problemStatement,
          },
          this.problem.id
        )
        .subscribe(
          (resp: any) => {
            this.problemHandler(resp.body, '');
            this.updateProblem.emit(this.problem);
          },
          (error: any) => {
            console.error(error);
          }
        );
    } else if (this.problemStatement.trim().length > 0) {
      this.showLoading = true;
      this.problemService.postProblem(this.problemStatement).subscribe(
        (resp: any) => {
          console.log(resp);
          this.problemHandler(resp.body, 'create');
          this.addProblem.emit(resp.body);
          this.showLoading = false;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  problemHandler(data: any, action: string) {
    if (action === 'create') {
      const newProblem = new Problem(
        data.id,
        data.problem,
        null,
        data.taskorigin
      );
      this.problemService.addProblem(newProblem);

      // this.showNegative.emit(true);
      // this.hideNextStep = true;
    } else {
      const problemEdit = this.problemService.problems.find(
        (t: Problem) => t.id === +data.id
      );
      if (problemEdit) {
        this.problem = <Problem>data;
        this.problemService.updateProblem(this.problem);
      }
    }
  }

  onFocusOut(event: any) {
    if (
      !(
        <Element>event.relatedTarget &&
        (<Element>event.relatedTarget).classList.contains('continue-btn')
      )
    ) {
      this.onProblemSubmit();
    }
  }
}
