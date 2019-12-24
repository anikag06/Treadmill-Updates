import { Component, OnInit,OnDestroy, Input, EventEmitter, Output, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
// import { Problem } from '../problem-solving-worksheets/problem.model';
import { Worry } from './worry.model';
// import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { environment } from 'environments/environment';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
// import { ProblemFormComponent } from '../problem-solving-worksheets/problem-form/problem-form.component';
import { WorryFormComponent } from './worry-form/worry-form.component';
import { SliderComponent } from './Slidder/Slidder.component';
import { Subscription } from 'rxjs';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { GeneralErrorService } from '@/main/shared/general-error.service';
import { ProblemSolvingWorksheetsService } from '../problem-solving-worksheets/problem-solving-worksheets.service';
@Component({
    selector: 'app-worryProd-form',
    templateUrl: './worry-productively.component.html',
    styleUrls: ['./worry-productively.component.scss'],
 //   changeDetection: ChangeDetectionStrategy.OnPush,
  })

  export class WorryProductivelyComponent implements OnInit, OnDestroy{ 
    
    // private problems: Problem[] = [];
    user!: User;
    problem!: Worry;    
    page = 1;
    problemEditMode = false;
    subscriptions: Subscription[] = [];
    public buttonClick : boolean;
    
    @ViewChild('autosize', { static: false }) autosize!: CdkTextareaAutosize;
    @ViewChild(WorryFormComponent, { static: false }) problemStatementForm!: WorryFormComponent;
  
  constructor(
    // private http: HttpClient
    private problemService: ProblemSolvingWorksheetsService,
    private authService: AuthService,
    private errorService: GeneralErrorService,
  ){
    this.buttonClick = false;
  }
  
  ngOnInit(){
    this.subscriptions[this.subscriptions.length] = this.problemService.problemBehaviour
    .subscribe(
    (problem: any) => {
        if (Object.entries(problem).length > 0) {
              this.problemSelected(problem);
          }
        },
         this.errorService.errorResponse('Something went wrong')
        );
    const user = this.authService.isLoggedIn();
    if (user && user.is_active) {
       this.user = <User>user;
      }
  }
    
  // getProblems() {
  //   const params = new HttpParams().set('page', this.page.toString());
  //   return this.http.get<Problem[]>(environment.API_ENDPOINT + '/api/v1/worksheets/problem-solving/problems/', { params: params })
  //     .subscribe(
  //       (data: any) => {
  //         const problems = <Problem[]>data.results;
  //         if (this.page === 1) {
  //           this.problems = [];
  //         }
  //         this.problems.push(...problems);
  //         console.log('Problem :'+ this.problems); 
  //       },
  //       (error: HttpErrorResponse) => {
  //         console.error(error);
  //       }
  //     );
  //   } 
  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
    problemSelected(problem: Worry) {
      this.problem = problem;
      this.problemEditMode = false;
    }  
    onEditProblemClick() {
      this.onProblemClick();
      console.log(this.problemEditMode);
      if (this.problemStatementForm) {
        this.problemStatementForm.editProblemText();
      }
    }
    onProblemClick() {
      if (this.problem) {
        this.problemEditMode = true;
      }
      // this.OnSliderClick();
    }
    
    OnSliderClick(selected :any){
      console.log(this.problemEditMode);
      this.buttonClick=selected;
    }
  }