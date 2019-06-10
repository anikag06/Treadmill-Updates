import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Problem } from '@/main/custom-forms/forms/problem-solving-worksheets/problem.model';
import { ProblemSolvingWorksheetsService } from '@/main/custom-forms/forms/problem-solving-worksheets/problem-solving-worksheets.service';

@Component({
  selector: 'app-forms-sidebar',
  templateUrl: './forms-sidebar.component.html',
  styleUrls: ['./forms-sidebar.component.scss']
})
export class FormsSidebarComponent implements OnInit {

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
    this.newForm.emit();
  }

}
