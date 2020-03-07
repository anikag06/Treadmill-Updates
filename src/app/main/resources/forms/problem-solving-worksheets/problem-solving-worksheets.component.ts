import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProblemSolvingWorksheetsService } from './problem-solving-worksheets.service';
import { Subscription } from 'rxjs';
import { Problem } from './problem.model';
import { Solution } from './solution.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { GeneralErrorService } from '@/main/shared/general-error.service';
import {
  PROBLEM_SOLVING_FORM_NAME,
  PSF_PROBLEM,
  PSF_PROBLEM_SOLVING,
} from '@/app.constants';
import { UserTask } from '@/main/resources/forms/shared/tasks/user-task.model';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ProblemFormComponent } from './problem-form/problem-form.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { FormService } from '@/main/resources/forms/form.service';
import { PROBLEM_SOLVING_QUOTES } from '@/main/resources/forms/problem-solving-worksheets/problem-solving-message';
import { TasksService } from '@/main/resources/forms/shared/tasks/tasks.service';
import { TechniquesInfoComponent } from '@/main/resources/forms/shared/techniques-info/techniques-info.component';
import { THINIKING_ERROR_DATA } from '@/main/resources/forms/shared/techniques-info/thinking-error-technique.data';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-problem-solving-worksheets',
  templateUrl: './problem-solving-worksheets.component.html',
  styleUrls: ['./problem-solving-worksheets.component.scss'],
})
export class ProblemSolvingWorksheetsComponent implements OnInit, OnDestroy {
  user!: User;
  problem!: Problem;
  solutions: Solution[] = [];
  solutionsSaved = false;
  prosconsSaved = false;
  // bestSolution!: Solution;
  showResult = false;
  showSolutionsForm = false;
  type = PSF_PROBLEM_SOLVING;
  heading = 'How will you implement this solution? ';
  subscriptions: Subscription[] = [];
  problemEditMode = false;
  formName = PROBLEM_SOLVING_FORM_NAME;
  task!: UserTask;
  problemObject!: any;
  quote!: string;
  quotedBy!: string;
  showMessage!: boolean;
  showTask!: boolean;
  @ViewChild('solutionForm', { static: false }) solutionForm!: NgForm;
  @ViewChild('solutionTextArea', { static: false })
  solutionTextArea!: ElementRef;
  @ViewChild('autosize', { static: false }) autosize!: CdkTextareaAutosize;
  @ViewChild(ProblemFormComponent, { static: false })
  problemStatementForm!: ProblemFormComponent;
  @ViewChild(SolutionsComponent, { static: false })
  solutionsForm!: SolutionsComponent;
  saveSolutionBtn!: boolean;
  showProConBtn!: boolean;
  showFollowUp = false;
  showSolutionContBtn = false;
  // menuOpen = false;
  @Input() fromSlide!: boolean;
  bestSolution!: any;
  constructor(
    private problemService: ProblemSolvingWorksheetsService,
    private authService: AuthService,
    private errorService: GeneralErrorService,
    private formService: FormService,
    private taskService: TasksService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    // this.subscriptions[
    //   this.subscriptions.length
    // ] = this.problemService.problemBehaviour.subscribe((problem: any) => {
    //   if (Object.entries(problem).length > 0) {
    //     this.problemSelected(problem);
    //   }
    // }, this.errorService.errorResponse('Something went wrong'));
    // const user = this.authService.isLoggedIn();
    // if (user && user.is_active) {
    //   this.user = <User>user;
    // }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  problemSelected(problem: Problem) {
    this.problem = problem;
    this.problemObject = {
      id: this.problem.id,
      origin_name: PSF_PROBLEM,
      taskorigin: this.problem.taskorigin,
    };
    this.prosconsSaved = false;
    this.solutionsSaved = false;
    this.problemEditMode = false;
    // delete this.task;
    this.showTask = false;
    this.showResult = false;
    this.fetchSolutions();

    this.fetchTask();
  }

  updateProblem(problem: Problem) {
    this.problemEditMode = false;
  }

  fetchBestSolution() {
    this.problemService
      .getBestSolution(this.problem.id)
      .subscribe((resp: any) => {
        this.problem.bestsolution = resp.solution_id;
        if (this.problem.bestsolution) {
          const bestSolution = this.solutions.find(
            sol => sol.id === this.problem.bestsolution.solution_id,
          );
        }
      });
  }

  getBestSolutionText(solution_id: number) {
    const bestSolution = this.solutions.find(sol => sol.id === solution_id);
    if (bestSolution) {
      return bestSolution.solution;
    }
  }

  fetchTask() {
    if (this.problem.taskorigin) {
      this.taskService
        .getTask(this.problem.taskorigin.task_id)
        .subscribe((resp: any) => {
          if (resp.data) {
            this.task = resp.data;
            this.showTask = true;
            this.prosconsSaved = true;
            this.showResult = true;
          }
        });
    } else {
      delete this.task;
    }
  }

  fetchSolutions() {
    this.problemService.getSolutions(this.problem.id).subscribe((resp: any) => {
      this.solutions = resp.body.data.solutions;
      // console.log(this.solutions);
      if (this.solutions.length > 0) {
        this.solutionsSaved = true;
        this.fetchBestSolution();
      }
      // if (this.problem.bestsolution) {
      //   const bestSolution = this.solutions.find(
      //     sol => sol.id === this.problem.bestsolution.solution_id,
      //   );
      //   if (bestSolution) {
      //     this.bestSolution = bestSolution;
      //     this.prosconsSaved = true;
      //   }
      // }
    }, this.errorService.errorResponse('Something went wrong'));
  }

  onAddNewForm() {
    this.solutions = [];
    delete this.solutionsSaved;
    // delete this.bestSolution;
    delete this.showResult;
    delete this.problem;
    delete this.task;
    this.prosconsSaved = false;
  }

  onCheckBoxChange(solution: Solution, event: Event) {
    // delete this.bestSolution;
    // this.solutions.map(sol => {
    //   if (sol.id === solution.id) {
    //     sol.best_solution = true;
    //     this.problem.bestsolution = solution.id;
    //   } else {
    //     sol.best_solution = false;
    //   }
    // });
    if (this.problem.bestsolution) {
      this.problem.bestsolution = solution.id;
      // if (this.bestSolution) {
      this.problemService
        .putBestSolution(this.problem.bestsolution, this.problem.id)
        .subscribe(() => {},
        this.errorService.errorResponse('Cannot select the best solution'));
    } else {
      this.problemService
        .postBestSolution(solution.id, this.problem.id)
        .subscribe(() => {
          this.problem.bestsolution = solution.id;
        }, this.errorService.errorResponse('Cannot select the best solution'));
    }

    // }
  }

  selectBestSolution() {
    if (this.problem.bestsolution) {
      this.showTask = true;
    }
  }

  onSolutionSubmit() {
    if (
      this.solutionForm.value['solution'] &&
      this.solutionForm.value['solution'].trim().length > 0
    ) {
      this.problemService
        .postSolution(this.solutionForm.value['solution'], this.problem.id)
        .subscribe((resp: any) => {
          const lastIndex = resp.data.solutions.length - 1;
          const solution = new Solution(
            +resp.data.solutions[lastIndex].id,
            this.problem.id,
            resp.data.solutions[lastIndex].solution,
            false,
            0,
          );
          this.solutions.push(solution);
          this.showSolutionsForm = false;
          this.saveSolutionBtn = false;
          this.solutionForm.reset();
        }, this.errorService.errorResponse('Something went wrong'));
    } else {
      this.solutionForm.reset();
      this.showSolutionsForm = false;
    }
  }

  onEditSolutionClick() {
    if (this.solutionTextArea) {
      this.solutionTextArea.nativeElement.focus();
    } else {
      this.solutionsForm.onEditTextClicked();
    }
  }
  onEditProblemClick() {
    this.onProblemClick();
    if (this.problemStatementForm) {
      this.problemStatementForm.editProblemText();
    }
  }

  onSolutionEdit(solution: Solution) {
    this.problemService
      .putSolution(this.problem.id, solution.id, solution.solution)
      .subscribe((data: any) => {},
      this.errorService.errorResponse('Something went wrong'));
  }

  onSolutionRemove(solution: Solution) {
    this.problemService.deleteSolution(solution.id).subscribe((data: any) => {
      this.solutions = this.solutions.filter(solu => solu !== solution);
      if (this.solutions.length === 0) {
        this.solutionsSaved = false;
      }
    }, this.errorService.errorResponse('Something went wrong'));
  }

  onNextStep() {
    this.showResult = true;
  }

  onSolutionSaved() {
    this.solutionsSaved = true;
  }

  onShowSolutionContinue() {
    this.showSolutionContBtn = true;
  }
  // onShowBestSolution(value: boolean) {
  //   this.showProConBtn = value;
  // }

  onProsConsSaved() {
    this.prosconsSaved = true;
  }

  deleteBestSolution() {
    // delete this.bestSolution;
    this.showTask = false;
  }

  // getBestSolution(solution_id: number) {
  //   this.solutions.find();
  // }

  onProblemClick() {
    if (this.problem) {
      this.problemEditMode = true;
    }
  }

  onShowSaveSolution() {
    this.saveSolutionBtn = true;
  }

  onSolutionFocusOut() {
    this.showSolutionContBtn = false;
    this.onSolutionSubmit();
  }

  onTaskLoad(task: UserTask) {
    console.log('task loaded');
    this.showResult = !!task;
    console.log(task);
    this.task = task;
    // console.log(this.task);
  }

  renderResult(): Boolean {
    // this.showMessage = true;
    // this.onShowMessage();
    return (
      this.solutions.length > 0 &&
      this.showTask &&
      this.showResult &&
      this.prosconsSaved
    );
  }

  onShowMessage() {
    const index = this.formService.getRandomInt(PROBLEM_SOLVING_QUOTES.length);
    this.quote = PROBLEM_SOLVING_QUOTES[index].quote;
    this.quotedBy = PROBLEM_SOLVING_QUOTES[index].by;
  }

  onShowFollowUp(value: boolean) {
    this.showFollowUp = value;
  }

  onShowInfo() {
    const dialogRef = this.dialog.open(TechniquesInfoComponent, {
      panelClass: 'technique-info-dialog-container',
      autoFocus: false,
      data: {
        techniquesInfo: THINIKING_ERROR_DATA,
        about: 'Pros and Cons Example',
      },
    });
  }
}
