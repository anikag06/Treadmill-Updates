import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { of, BehaviorSubject } from 'rxjs';
import { ProsCons } from './pros-cons.model';
import { environment } from 'environments/environment';
import { Problem } from './problem.model';
import { map } from 'rxjs/operators';
import { SanitizationService } from '@/main/support-groups/sanitization.service';

@Injectable({
  providedIn: 'root'
})
export class ProblemSolvingWorksheetsService {

  private problems: Problem[] = [];
  moreProblems = true;
  problemBehaviour = new BehaviorSubject({});
  problemsBehaviour = new BehaviorSubject(this.problems);



  constructor(
    private http: HttpClient,
    private sanitizer: SanitizationService,
  ) { }

  getProblems(page: number) {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<Problem[]>(environment.API_ENDPOINT + '/api/v1/worksheets/problem-solving/problems/', { params: params })
      .subscribe(
        (data: any) => {
          const problems = <Problem[]>data.results;
          if (data.next) {
            this.moreProblems = true;
          } else {
            this.moreProblems = false;
          }
          this.problems.push(...problems);
          this.problemsBehaviour.next(this.problems);
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        }
      );
  }

  postProblem(problem: string) {
    return this
      .http
      .post(environment.API_ENDPOINT +
        '/api/v1/worksheets/problem-solving/problems/',
        { problem: problem })
      .pipe(
        map((data: any) => {
          this.problems.push(<Problem>data.data);
          this.problemBehaviour.next(<Problem>data.data);
          return data.data;
        })
      );
  }

  putProblem(problem: Problem) {
    return this.http
      .put(environment.API_ENDPOINT +
        '/api/v1/worksheets/problem-solving/problems/' +
        problem.id + '/', { problem: problem.problem, id: problem.id })
      .pipe(
        map((data: any) => {
          this.problems = this.problems.map((prob) => {
            if (problem.id === prob.id) {
              return data.data;
            } else {
              return prob;
            }
          });
          this.problemsBehaviour.next(this.problems);
          this.problemBehaviour.next(<Problem>data.data);
          return data.data;
        })
      );
  }

  deleteSolution(solutionId: number) {
    return this.http.delete(environment.API_ENDPOINT + '/api/v1/worksheets/problem-solving/solutions/?solution_id=' + solutionId);
  }

  putSolution(solutionId: number, solution: string) {
    console.log('sol ', solution)
    solution = this.sanitizer.stripTags(solution);
    const params = new HttpParams()
      .set('solution_id', solutionId.toString())
      .set('solution', solution);
    return this.http
      .put(environment.API_ENDPOINT +
        '/api/v1/worksheets/problem-solving/solutions/',
        params,
        {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        });
  }

  putBestSolution(solutionId: number, problemId: number) {
    return this.http.put(environment.API_ENDPOINT +
      '/api/v1/worksheets/problem-solving/best-solution/', { solution_id: solutionId, problem_id: problemId});
  }

  getSolutions(problem: number) {
    const params = new HttpParams().set('problem_id', problem.toString());
    return this.http.get<Problem[]>(environment.API_ENDPOINT + '/api/v1/worksheets/problem-solving/solutions/', { params: params });
  }

  // Some Issues with the backend we need to send a form
  postSolution(solution: string, problemId: number) {
    const params = new HttpParams()
      .set('problem_id', problemId.toString())
      .set('solution', solution);
      return this.http
      .post(environment.API_ENDPOINT +
        '/api/v1/worksheets/problem-solving/solutions/',
        params,
        {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        });
  }

  getProsCons(solution_id: number) {
    const params = new HttpParams().set('solution_id', solution_id.toString());
    return this.http.get(environment.API_ENDPOINT + '/api/v1/worksheets/problem-solving/pros-cons/', { params: params});
  }

  postProsCons(proCon: ProsCons, solutionId: number) {
    let params = new HttpParams()
      .set('solution_id', solutionId.toString());
      if (proCon.is_pros) {
        params = params.set('pros', proCon.body);
      } else {
        params = params.set('cons', proCon.body);
      }
    return this.http
      .post(environment.API_ENDPOINT +
        '/api/v1/worksheets/problem-solving/pros-cons/',
        params,
        {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        });
  }

  deleteProsCons(proConId: number) {
    return this.http.delete(environment.API_ENDPOINT + '/api/v1/worksheets/problem-solving/pros-cons/?pros_cons_id=' + proConId);
  }

  putProsCons(proconId: number, body: string) {
    body = this.sanitizer.stripTags(body);
    const params = new HttpParams()
      .set('pros_cons_id', proconId.toString())
      .set('body', body);
    return this.http
      .put(environment.API_ENDPOINT +
        '/api/v1/worksheets/problem-solving/pros-cons/',
        params,
        {
          headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        });
  }

  postTask(task: any) {
    return this.http.post(environment.API_ENDPOINT + '/api/v1/worksheets/problem-solving/tasks/', task);
  }

  putTask(task: any) {
    return this.http.put(environment.API_ENDPOINT + '/api/v1/worksheets/problem-solving/tasks/' + task.id + '/', task);
  }

  getTask(problem_id: number) {
    return this.http.get(environment.API_ENDPOINT + '/api/v1/worksheets/problem-solving/tasks/?problem_id=' + problem_id);
  }

  getResult(solution_id: number) {
    return this.http.get(environment.API_ENDPOINT + '/api/v1/worksheets/problem-solving/results/?solution_id=' + solution_id);
  }

  postResult(solution_id: number, body: string) {
    return this.http
      .post(environment.API_ENDPOINT + '/api/v1/worksheets/problem-solving/results/', { solution_id: solution_id, body: body });
  }

  putResult(solution_id: number, body: string, result_id: number) {
    return this.http
      .put(environment.API_ENDPOINT +
        '/api/v1/worksheets/problem-solving/results/' +
        result_id +
        '/', { solution_id: solution_id, body: body });
  }

  deleteSubTask(task_id: number, subtask_id: number) {
    return this.http
      .delete(environment.API_ENDPOINT +
        '/api/v1/worksheets/problem-solving/tasks/' +
        task_id + '/delete_sub_task/?subtask_id=' + subtask_id);
  }

  deleteTaskDay(task_id: number, day: string) {
    return this.http
      .delete(environment.API_ENDPOINT +
        '/api/v1/worksheets/problem-solving/tasks/' +
        task_id + '/delete_task_days/?day=' + day);
  }
}
