import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Solution } from '../solution.model';
import { ProblemSolvingWorksheetsService } from '../problem-solving-worksheets.service';
import { Result } from './result.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit, OnChanges {
  @Input() solution!: Solution;
  result!: Result;
  resultBody = '';
  constructor(private problemService: ProblemSolvingWorksheetsService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.solution) {
      this.problemService.getResult(this.solution.id).subscribe(
        (data: any) => {
          console.log(data.results);
          if (data.results.length > 0) {
            this.result = new Result(+data.results[0].id, data.results[0].body);
            this.resultBody = data.results[0].body;
          } else {
            delete this.result;
            this.resultBody = '';
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        },
      );
    }
  }

  onResultSubmit() {
    console.log(this.result);
    if (this.result) {
      this.problemService
        .putResult(this.solution.id, this.resultBody, this.result.id)
        .subscribe(
          (data: any) => {},
          error => console.log(error),
        );
    } else {
      this.problemService
        .postResult(this.solution.id, this.resultBody)
        .subscribe(
          (data: any) => {
            this.result = new Result(+data.data.result_id, this.resultBody);
          },
          error => console.log(error),
        );
    }
  }
}
