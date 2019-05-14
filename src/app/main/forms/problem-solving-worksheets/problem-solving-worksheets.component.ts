import { Component, OnInit } from '@angular/core';
import { ProblemSolvingWorksheetsService } from './problem-solving-worksheets.service';
import { Observable } from 'rxjs';
import { Problem } from './problem.model';
import { Solution } from './solution.model';
import { ProsCons } from './pros-cons.model';

@Component({
  selector: 'app-problem-solving-worksheets',
  templateUrl: './problem-solving-worksheets.component.html',
  styleUrls: ['./problem-solving-worksheets.component.scss']
})
export class ProblemSolvingWorksheetsComponent implements OnInit {

  problems$!: Observable<Problem[]>;
  problem!: Problem;
  solutions!: Solution[];
  bestSolution!: Solution | undefined;

  constructor(
    private problemService: ProblemSolvingWorksheetsService
  ) { }

  ngOnInit() {
    this.problems$ = this.problemService.getProblems();
  }

  problemClicked(problem: Problem) {
    this.problem = problem;
    //How to fix this;
    this.problemService.getSolutions(this.problem.id)
      .subscribe(
        (solutions: Solution[]) => {
          this.solutions = solutions;
          this.getProsCons();
        }
      );
  }

  getProsCons() {
    this.solutions.forEach(sol => {
      this.problemService.getProsCons(sol.id)
        .subscribe(
          (proscons: ProsCons[]) => sol.prosCons = proscons
        );
    });
  }

  onAddNewForm() {
    alert('Yet to be implemented');
  }

  onCheckBoxChange(solution: Solution, event: Event) {
    this.solutions.map(sol => {
      if (sol.id === solution.id) {
        sol.best_solution = true;
      } else {
        sol.best_solution = false;
      }
    });
  }
  
  selectBestSolution() {
    this.bestSolution = this.solutions.find(solution => solution.best_solution);
  }
}
