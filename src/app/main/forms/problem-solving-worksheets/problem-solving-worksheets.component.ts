import { Component, OnInit, ViewChild } from '@angular/core';
import { ProblemSolvingWorksheetsService } from './problem-solving-worksheets.service';
import { Observable } from 'rxjs';
import { Problem } from './problem.model';
import { Solution } from './solution.model';
import { ProsCons } from './pros-cons.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';

@Component({
  selector: 'app-problem-solving-worksheets',
  templateUrl: './problem-solving-worksheets.component.html',
  styleUrls: ['./problem-solving-worksheets.component.scss']
})
export class ProblemSolvingWorksheetsComponent implements OnInit {

  user!: User;
  problems$!: Observable<Problem[]>;
  problem!: Problem;
  solutions: Solution[] = [];
  bestSolution!: Solution | undefined;
  showResult = false;
  showSolutionsForm = false;
  @ViewChild('problemForm') problemForm!: NgForm;
  @ViewChild('solutionForm') solutionForm!: NgForm;

  constructor(
    private problemService: ProblemSolvingWorksheetsService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.problems$ = this.problemService.getProblems();
    const user = this.authService.isLoggedIn();
    if (user && user.is_active) {
      this.user = <User>user;
    }
  }

  problemClicked(problem: Problem) {
    this.problem = problem;
    this.fetchSolutions();
  }

  fetchSolutions() {
    this.problemService.getSolutions(this.problem.id)
      .subscribe(
        (solutions: Solution[]) => {
          this.solutions = solutions;
          this.getProsCons();
          this.selectBestSolution();
        }
      );
  }

  getProsCons() {
    this.solutions.forEach(sol => {
      this.problemService.getProsCons(sol.id)
        .subscribe(
          (proscons: ProsCons[]) => {
            sol.pros = proscons.filter(pc => pc.is_pros);
            sol.cons = proscons.filter(pc => !pc.is_pros);
          }
        );
    });
  }

  onAddNewForm() {
    this.solutions = [];
    delete this.bestSolution;
    delete this.problem;
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

  onProblemSubmit() {
    const problem = new Problem(Math.ceil(Math.random() * 100), this.problemForm.value['problem'], this.user.user_id );
    this.problem = problem;
    this.problemService.postProblem(this.problem)
      .subscribe(       //TODO
        () => {
          this.problemForm.reset();
        },
        () => {}
      );
  }

  onSolutionSubmit() {
    const solution = new Solution(
      this.solutions.length + 5,
      this.problem.id,
      this.solutionForm.value['solution'],
      false,
      this.solutions.length + 1);
      this.problemService.postSolution(solution)
        .subscribe(       //TODO
          () => {
            this.showSolutionsForm = false;
            this.solutionForm.reset();
            this.solutions.push(solution);
          },
          () => {}
        );
  }

  onSolutionRemove(solution: Solution) {
    this.solutions = this.solutions.filter(sol => solution.id !== sol.id);
      this.problemService.removeSolution(solution)
        .subscribe(
          () => {},
          () => {},
        );
  }

  onNextStep() {
    this.showResult = true;
    console.log(this.showResult)
  }

  onProConAdd(procon: ProsCons, solution: Solution) {
    const solu = this.solutions.find(sol => solution.id === sol.id);
    if (solu && procon.is_pros) {
      solu.pros.push(procon);
    } else if (solu) {
      solu.cons.push(procon);
    }
    this.problemService.updateSolution(solu);
  }
}
