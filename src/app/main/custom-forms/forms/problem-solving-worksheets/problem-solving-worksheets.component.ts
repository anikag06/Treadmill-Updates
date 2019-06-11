import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { ProblemSolvingWorksheetsService } from './problem-solving-worksheets.service';
import { Subscription } from 'rxjs';
import { Problem } from './problem.model';
import { Solution } from './solution.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { ContainerRefDirective } from './container-ref.directive';
import { ProblemFormComponent } from './problem-form/problem-form.component';
import { GeneralErrorService } from '@/main/shared/general-error.service';
import { PROBLEM_SOLVING} from '@/app.constants';
import {UserTask} from '@/main/custom-forms/forms/shared/tasks/user-task.model';

@Component({
  selector: 'app-problem-solving-worksheets',
  templateUrl: './problem-solving-worksheets.component.html',
  styleUrls: ['./problem-solving-worksheets.component.scss']
})
export class ProblemSolvingWorksheetsComponent implements OnInit, OnDestroy {

  user!: User;
  problem!: Problem;
  solutions: Solution[] = [];
  solutionsSaved = false;
  prosconsSaved = false;
  bestSolution!: Solution;
  showResult = false;
  showSolutionsForm = false;
  type = PROBLEM_SOLVING;
  subscriptions: Subscription[] = [];
  @ViewChild('solutionForm') solutionForm!: NgForm;
  @ViewChild(ContainerRefDirective) problemContainer!: ContainerRefDirective;

  constructor(
    private problemService: ProblemSolvingWorksheetsService,
    private authService: AuthService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private errorService: GeneralErrorService,
  ) { }

  ngOnInit() {
    this.subscriptions[this.subscriptions.length] = this.problemService.problemBehaviour
      .subscribe(
        (problem: any) => {
          if (Object.entries(problem).length > 0) {
            this.problemSelected(problem);
          }
        },
        this.errorService.errorResponse('Something went wrong')
      );
    this.renderProblemForm();
    const user = this.authService.isLoggedIn();
    if (user && user.is_active) {
      this.user = <User>user;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  problemSelected(problem: Problem) {
    this.problem = problem;
    this.renderProblem();
    this.fetchSolutions();
  }

  fetchSolutions() {
    this.problemService.getSolutions(this.problem.id)
      .subscribe(
        (data: any) => {
                  this.solutions = data.message;
                  if (this.problem.bestsolution) {
                    const bestSolution = this.solutions.find(sol => sol.id === this.problem.bestsolution.solution_id);
                      if (bestSolution) {
                        this.bestSolution = bestSolution;
                        this.prosconsSaved = true;
                      }
                  }
                },
        this.errorService.errorResponse('Something went wrong')
      );
  }

  onAddNewForm() {
    this.solutions = [];
    delete this.bestSolution;
    delete this.problem;
    this.renderProblemForm();
  }

  onCheckBoxChange(solution: Solution, event: Event) {
    delete this.bestSolution;
    this.solutions.map(sol => {
      if (sol.id === solution.id) {
        sol.best_solution = true;
        this.bestSolution = solution;
      } else {
        sol.best_solution = false;
      }
    });
    if (this.bestSolution) {
      this.problemService.putBestSolution(this.bestSolution.id, this.problem.id)
        .subscribe(
          () => {},
          this.errorService.errorResponse('Cannot select the best solution')
        );
    }
  }

  selectBestSolution() {
    const solution = this.solutions.find(sol => sol.best_solution);
    if (solution && solution.best_solution) {
      this.bestSolution = solution;
    }
  }

  onSolutionSubmit() {
    if (this.solutionForm.value['solution'] && this.solutionForm.value['solution'].trim().length > 0) {
      this.problemService.postSolution(this.solutionForm.value['solution'], this.problem.id)
        .subscribe(
          (resp: any) => {
            const solution = new Solution(+resp.data.solution_id, this.problem.id, resp.data.solution, false, 0);
            this.solutions.push(solution);
            this.showSolutionsForm = false;
            this.solutionForm.reset();
          },
          this.errorService.errorResponse('Something went wrong')
        );
    } else {
      this.solutionForm.reset();
      this.showSolutionsForm = false;
    }
  }

  onSolutionEdit(solution: Solution) {
    this.problemService.putSolution(solution.id, solution.solution)
      .subscribe(
        (data: any) => {},
        this.errorService.errorResponse('Something went wrong')
      );
  }

  onSolutionRemove(solution: Solution) {
    this.problemService.deleteSolution(solution.id)
      .subscribe(
        (data: any) => {
          this.solutions = this.solutions.filter(solu => solu !== solution);
        },
        this.errorService.errorResponse('Something went wrong')
      );
  }

  onNextStep() {
    this.showResult = true;
  }


  onSolutionSaved() {
    this.solutionsSaved = true;
  }

  onProsConsSaved() {
    this.prosconsSaved = true;
  }

  deleteBestSolution() {
    delete this.bestSolution;
  }

  renderProblemForm() {
    const viewContainerRef = this.problemContainer.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.element.nativeElement.innerHTML = '';
    const componentRef = viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(ProblemFormComponent));
    if (this.problem) {
      (<ProblemFormComponent>componentRef.instance).problem = this.problem;
    }
  }

  renderProblem() {
    const viewContainerRef = this.problemContainer.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.element.nativeElement.innerHTML = this.problem.problem;
  }

  onProblemClick() {
    if (this.problem) {
      this.renderProblemForm();
    }
  }

  onSolutionFocusOut() {
    this.onSolutionSubmit();
  }

  onTaskLoad(task: UserTask) {
    setTimeout(() => {
      this.showResult = !!task;
    }, 1);
  }

  renderResult(): Boolean {
    return this.solutions && this.bestSolution && this.showResult;
  }
}
