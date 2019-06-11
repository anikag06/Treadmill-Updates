import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
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
  @Output() testOut = new EventEmitter<string>();

  problemStatement = '';

  constructor(
    private problemService: ProblemSolvingWorksheetsService
  ) { }

  ngOnInit() {
    if (this.problem) {
      this.problemStatement = this.problem.problem;
    }
  }

  onProblemSubmit() {
    if (this.problem && Object.entries(this.problem).length > 0) {
      this.problem.problem = this.problemStatement;
      this.problemService.putProblem({id: this.problem.id, problem: this.problemStatement, bestsolution: null, taskorigin: 0})
        .subscribe(
          () => {},
          (error) => {
            console.error(error);
          }
        );
    } else if (this.problemStatement.trim().length > 0) {
      this.problemService.postProblem(this.problemStatement)
        .subscribe(
          () => {},
          (error) => {
            console.error(error);
          }
        );
    }
  }

  onFocusOut(event: any) {
    if (!((<Element>event.relatedTarget) && (<Element>event.relatedTarget).classList.contains('continue-btn'))) {
      this.onProblemSubmit();
    }
  }
}
