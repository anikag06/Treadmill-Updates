import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Problem } from '../problem.model';
import { ProblemSolvingWorksheetsService } from '../problem-solving-worksheets.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {

  @Output() problemEmitter = new EventEmitter<Problem>();
  @Output() newForm = new EventEmitter<void>();
  problems: Problem[] = [];
  problemPage = 1;
  subscriptions: Subscription[] = [];

  constructor(
    private problemService: ProblemSolvingWorksheetsService
  ) { }

  ngOnInit() {
    this.subscriptions[this.subscriptions.length] = this.problemService.getProblems(this.problemPage);
    this.subscriptions[this.subscriptions.length] = this.problemService.problemsBehaviour
      .subscribe(
        (problems: Problem[]) => {
          this.problems = problems;
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        }
      );
  }

  problemClicked(problem: Problem) {
    this.problemEmitter.emit(problem);
  }

  onAddNewForm() {
    this.newForm.emit()
  }

}
