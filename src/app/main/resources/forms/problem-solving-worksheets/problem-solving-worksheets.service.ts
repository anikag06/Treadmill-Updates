import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ProsCons } from './pros-cons.model';
import { environment } from 'environments/environment';
import { Problem } from './problem.model';
import { SanitizationService } from '@/main/shared/sanitization.service';
import {
  PSF_BEST_SOLUTION_URL,
  PSF_PRO_CON_URL,
  PSF_PROBLEM_URL,
  PSF_RESULT_URL,
  PSF_SOLUTION_URL,
} from '@/app.constants';
import { GeneralErrorService } from '@/main/shared/general-error.service';

@Injectable({
  providedIn: 'root',
})
export class ProblemSolvingWorksheetsService {
  problems: Problem[] = [];
  moreProblems = true;
  page = 1;
  problemBehaviour = new BehaviorSubject({});
  problemsBehaviour = new BehaviorSubject(this.problems);

  constructor(
    private http: HttpClient,
    private sanitizer: SanitizationService,
    private errorService: GeneralErrorService,
  ) {}

  getProblems() {
    if (this.moreProblems) {
      const params = new HttpParams().set('page', this.page.toString());
      return this.http
        .get<Problem[]>(environment.API_ENDPOINT + PSF_PROBLEM_URL, {
          params: params,
        })
        .subscribe(
          (data: any) => {
            const problems = <Problem[]>data.results;
            if (this.page === 1) {
              this.problems = [];
            }
            this.problems.push(...problems);
            this.problemsBehaviour.next(this.problems);
            if (data.next) {
              this.moreProblems = true;
              this.page += 1;
              this.getProblems();
            } else {
              this.moreProblems = false;
            }
          },
          (error: HttpErrorResponse) => {
            console.error(error);
          },
        );
    }
  }

  deleteProblem(problem_id: number) {
    return this.http.delete(
      environment.API_ENDPOINT + PSF_PROBLEM_URL + problem_id + '/',
      {
        observe: 'response',
      },
    );
  }

  postProblem(problem: string) {
    return this.http.post(
      environment.API_ENDPOINT + PSF_PROBLEM_URL,
      { problem: problem },
      {
        observe: 'response',
      },
    );
    // .pipe(
    //   // map((data: any) => {
    //   //   this.problems.push(<Problem>data.data);
    //   //   this.problemBehaviour.next(<Problem>data.data);
    //   //   console.log(this.problemBehaviour);
    //   //   return data.data;
    //   ),
    // );
  }

  putProblem(problem: any, id: number) {
    return this.http.put(
      environment.API_ENDPOINT + PSF_PROBLEM_URL + id + '/',
      {
        problem: problem.problem,
        id: problem.id,
      },
      {
        observe: 'response',
      },
    );
    // .pipe(
    //   map((data: any) => {
    //     this.problems = this.problems.map(prob => {
    //       if (problem.id === prob.id) {
    //         return data.data;
    //       } else {
    //         return prob;
    //       }
    //     });
    //     this.problemsBehaviour.next(this.problems);
    //     this.problemBehaviour.next(<Problem>data.data);
    //     return data.data;
    //   }),
    // );
  }

  addProblem(problem: Problem) {
    this.problems.push(problem);
    this.problemBehaviour.next(problem);
    this.problemsBehaviour.next(this.problems);
  }

  updateProblem(problemData: Problem) {
    const problem = this.problems.find((t: Problem) => t.id === problemData.id);
    if (problem) {
      this.problems[this.problems.indexOf(problem)] = problemData;
      this.problemBehaviour.next(<Problem>problem);
      this.problemsBehaviour.next(this.problems);
    }
  }

  deleteSolution(solutionId: number) {
    return this.http.delete(
      environment.API_ENDPOINT +
        PSF_SOLUTION_URL +
        'delete/' +
        solutionId +
        '/',
    );
  }

  putSolution(problem_id: number, solutionId: number, solution: string) {
    solution = this.sanitizer.stripTags(solution);

    return this.http
      .put(environment.API_ENDPOINT + PSF_SOLUTION_URL + problem_id + '/', {
        solution: solution,
        solution_id: solutionId,
      })
      .pipe(catchError(this.errorService.handleError));
  }

  getBestSolution(problemId: number) {
    return this.http
      .get(environment.API_ENDPOINT + PSF_BEST_SOLUTION_URL + problemId + '/')
      .pipe(catchError(this.errorService.handleError));
  }

  putBestSolution(solutionId: number, problemId: number) {
    return this.http
      .put(environment.API_ENDPOINT + PSF_BEST_SOLUTION_URL + problemId + '/', {
        solution_id: solutionId,
        problem_id: problemId,
      })
      .pipe(catchError(this.errorService.handleError));
  }

  postBestSolution(solutionId: number, problemId: number) {
    return this.http
      .post(
        environment.API_ENDPOINT + PSF_BEST_SOLUTION_URL + problemId + '/',
        {
          solution_id: solutionId,
          problem_id: problemId,
        },
      )
      .pipe(catchError(this.errorService.handleError));
  }

  getSolutions(problem: number) {
    return this.http
      .get<Problem[]>(
        environment.API_ENDPOINT + PSF_SOLUTION_URL + problem + '/',
        {
          observe: 'response',
        },
      )
      .pipe(catchError(this.errorService.handleError));
  }

  // Some Issues with the backend we need to send a form
  postSolution(solution: string, problemId: number) {
    return this.http.post(
      environment.API_ENDPOINT + PSF_SOLUTION_URL + problemId + '/',
      {
        solution: solution,
      },
    );
  }

  getProsCons(problem_id: number) {
    // const params = new HttpParams().set('solution_id', solution_id.toString());
    return this.http
      .get(environment.API_ENDPOINT + PSF_PRO_CON_URL + problem_id + '/')
      .pipe(catchError(this.errorService.handleError));
  }

  postProsCons(proCon: ProsCons, solutionId: number) {
    return this.http.post(
      environment.API_ENDPOINT + PSF_PRO_CON_URL + solutionId + '/',
      {
        body: proCon.body,
        is_pros: proCon.is_pros,
      },
      {},
    );
  }

  deleteProsCons(proConId: number) {
    return this.http.delete(
      environment.API_ENDPOINT + PSF_PRO_CON_URL + 'delete/' + proConId + '/',
    );
  }

  putProsCons(procon: ProsCons, solution_id: number) {
    procon.body = this.sanitizer.stripTags(procon.body);

    return this.http
      .post(environment.API_ENDPOINT + PSF_PRO_CON_URL + solution_id + '/', {
        body: procon.body,
        is_pros: procon.is_pros,
        pro_con_id: procon.id,
      })
      .pipe(catchError(this.errorService.handleError));
  }

  getResult(solution_id: number) {
    return this.http.get(
      environment.API_ENDPOINT + PSF_RESULT_URL + solution_id + '/',
    );
  }

  postResult(solution_id: number, resultObject: any) {
    return this.http.post(
      environment.API_ENDPOINT + PSF_RESULT_URL,
      resultObject,
    );
  }

  putResult(solution_id: number, resultObject: any) {
    return this.http.put(
      environment.API_ENDPOINT + PSF_RESULT_URL + solution_id + '/',
      resultObject,
    );
  }

  removeProblem(problem: Problem) {
    const beliefIndex = this.problems.indexOf(problem);
    this.problems.splice(beliefIndex, 1);
    this.problemsBehaviour.next(this.problems);
  }
}
