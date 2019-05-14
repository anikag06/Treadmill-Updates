import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { Solution } from './solution.model';
import { ProsCons } from './pros-cons.model';

@Injectable({
  providedIn: 'root'
})
export class ProblemSolvingWorksheetsService {

  private solutions = [
    <Solution>{id: 1, problem_id: 1, solution: 'Ask seniors for help', best_solution: true, rank: 1},
    <Solution>{id: 2, problem_id: 1, solution: 'Ask professor for help', best_solution: false, rank: 2},
    <Solution>{id: 3, problem_id: 2, solution: 'Call Neighbours', best_solution: false, rank: 1},
    <Solution>{id: 4, problem_id: 2, solution: 'Call police', best_solution: false, rank: 2},
  ];

  private problems = [
    {id: 1, problem: 'Not able to find internship', user_id: 1},
    {id: 2, problem: 'Not able to connect to family', user_id: 1}
  ];

  problemsBehaviour = new BehaviorSubject(this.problems);



  constructor(
    private http: HttpClient
  ) { }

  getProblems() {
    return this.problemsBehaviour.asObservable();
  }

  postProblem(data: any) {
    this.problemsBehaviour.next([...this.problems, data]);
    return of({success: '200'});
  }

  removeSolution(data: any) {
    this.solutions = this.solutions.filter(solution => solution.id !== data.id);
    return of({success: '200'});
  }

  getSolutions(problem_id: number) {
    return of(
      this.solutions.filter(solution => solution.problem_id === problem_id)
    );
  }

  postSolution(data: any) {
    this.solutions = [...this.solutions, data];
    return of({success: '200'});
  }

  getProsCons(solution_id: number) {
    const prosCons = [
      <ProsCons>{id: 1, solution_id: 1, body: 'Seniors will be happy to help', is_pros: true},
      <ProsCons>{id: 2, solution_id: 1, body: 'You are asking a favour', is_pros: false},
      <ProsCons>{id: 3, solution_id: 2, body: 'Professor will definately help', is_pros: true},
      <ProsCons>{id: 4, solution_id: 2, body: 'Work may be not as exciting', is_pros: false},
      <ProsCons>{id: 5, solution_id: 3, body: 'Neighbours can check your house', is_pros: true},
      <ProsCons>{id: 6, solution_id: 3, body: 'They may get disturbed', is_pros: false},
      <ProsCons>{id: 7, solution_id: 4, body: 'Police is the best help any one can get', is_pros: true},
      <ProsCons>{id: 8, solution_id: 4, body: 'It will be a big mess', is_pros: false},
      <ProsCons>{id: 1, solution_id: 1, body: 'Seniors will be happy to help', is_pros: true},
      <ProsCons>{id: 2, solution_id: 1, body: 'You are asking a favour', is_pros: true},
    ];

    return of(
      prosCons.filter(procon => procon.solution_id === solution_id)
    );
  }
}
