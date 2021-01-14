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
  FORM_START_SCORE,
  PROBLEM_SOLVING_FORM_NAME,
  PSF_PROBLEM,
  PSF_PROBLEM_SOLVING,
  TREADWILL,
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
import { map, switchMap } from 'rxjs/operators';
import { FlowService } from '@/main/flow/flow.service';
import { ActivatedRoute } from '@angular/router';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { ProsConsInfoComponent } from '@/main/resources/forms/problem-solving-worksheets/pros-cons-container/pros-cons/pros-cons-info/pros-cons-info.component';
import { CommonService } from '@/shared/common.service';
import { UserProfileService } from '@/main/shared/user-profile/user-profile.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-problem-solving-worksheets',
  templateUrl: './problem-solving-worksheets.component.html',
  styleUrls: ['./problem-solving-worksheets.component.scss'],
})
export class ProblemSolvingWorksheetsComponent implements OnInit, OnDestroy {
  user!: User;
  scoreUpdate = false;
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
  navbarTitle!: string;
  stepGroupSequence!: number;
  stepSequence!: number;
  stepName!: string;
  step_id!: number;
  showLoading = true;
  showLoadingSpinner = false;
  showProsConsSpinner = false;
  // menuOpen = false;
  @Input() fromSlide!: boolean;
  @Input() fromConv!: boolean;
  bestSolution!: any;
  constructor(
    private problemService: ProblemSolvingWorksheetsService,
    private authService: AuthService,
    private errorService: GeneralErrorService,
    private formService: FormService,
    private taskService: TasksService,
    public dialog: MatDialog,
    private flowService: FlowService,
    private activatedRoute: ActivatedRoute,
    private stepDataService: StepsDataService,
    private commonService: CommonService,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
    this.activatedRoute.params.subscribe((v) => {
      this.step_id = v.step_id;
      console.log('step id', this.step_id);
    });
    if (this.step_id !== null) {
      this.stepDataService.getStepData(this.step_id).subscribe((res: any) => {
        const step = res.data;
        console.log('RESPONSE', res.data, step.status);
        // for navbar title
        this.stepGroupSequence = step.step_group_sequence + 1;
        this.stepSequence = step.sequence + 1;
        this.stepName = step.name;
        this.navbarTitle =
          this.stepGroupSequence.toString() +
          '.' +
          this.stepSequence.toString() +
          ' ' +
          this.stepName;
        console.log('STEP DETAIL:', this.navbarTitle);
        this.flowService.stepDetail.emit(this.navbarTitle);
      });
    }
    if (!this.fromSlide && !this.fromConv) {
      this.formService.formName = this.formName;
      this.formService.formTitle.emit();
    }
    const user = this.authService.isLoggedIn();
    if (user && user.is_active) {
      this.user = <User>user;
    }
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== null) {
      this.loadProblemByID(parseInt(id));
    }
    setTimeout(() => {
      this.showLoading = false;
    }, 1000);
  }

  loadProblemByID(id: any) {
    this.problemService.getProblems();
    this.problemService.problemsBehaviour.subscribe((data: any) => {
      if (data.length > 0) {
        const problem = data.find((x: any) => x.id === id);
        if (problem !== undefined) {
          this.problem = problem;
          this.problemSelected(problem);
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
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
            (sol) => sol.id === this.problem.bestsolution.solution_id
          );
        }
      });
  }

  getBestSolutionText(solution_id: number) {
    const bestSolution = this.solutions.find((sol) => sol.id === solution_id);
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
      if (this.solutions.length > 0) {
        this.solutionsSaved = true;
        this.fetchBestSolution();
      }
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

  onCheckBoxChange(solution: Solution) {
    if (this.problem.bestsolution) {
      this.problemService
        .putBestSolution(this.problem.bestsolution, this.problem.id)
        .subscribe(() => {},
        this.errorService.errorResponse('Cannot select the best solution'));
    } else {
      this.problem.bestsolution = solution.id;
      this.problemService
        .postBestSolution(solution.id, this.problem.id)
        .subscribe(() => {},
        this.errorService.errorResponse('Cannot select the best solution'));
    }
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
            0
          );
          this.solutions.push(solution);
          this.showSolutionsForm = false;
          this.saveSolutionBtn = false;
          this.solutionForm.reset();
          if (!this.scoreUpdate) {
            this.scoreUpdate = true;
            if (this.user.is_exp) {
              this.commonService.updateScore(FORM_START_SCORE);
            }
          }
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
      this.solutions = this.solutions.filter((solu) => solu !== solution);
      if (this.solutions.length === 0) {
        this.solutionsSaved = false;
      }
    }, this.errorService.errorResponse('Something went wrong'));
  }

  onNextStep() {
    this.showResult = true;
  }

  onSolutionSaved() {
    this.showLoadingSpinner = true;
    this.solutionsSaved = true;
    setTimeout(() => {
      this.showLoadingSpinner = false;
    }, 500);
  }

  onShowSolutionContinue() {
    this.showSolutionContBtn = true;
  }
  showSolutionForm() {
    setTimeout(() => {
      this.showSolutionsForm = !this.showSolutionsForm;
    }, 1000);
  }

  onProsConsSaved() {
    this.showProsConsSpinner = true;
    setTimeout(() => {
      this.prosconsSaved = true;
      this.showProsConsSpinner = false;
    }, 500);
  }

  deleteBestSolution() {
    this.showTask = false;
  }
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
  }

  renderResult(): Boolean {
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
    const dialogRef = this.dialog.open(ProsConsInfoComponent, {
      panelClass: 'proscons-info-dialog-container',
      autoFocus: false,
    });
  }
}
