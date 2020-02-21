import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProsCons} from '../pros-cons.model';
import {ProblemSolvingWorksheetsService} from '../problem-solving-worksheets.service';
import {GeneralErrorService} from '@/main/shared/general-error.service';
import {Problem} from '@/main/resources/forms/problem-solving-worksheets/problem.model';

@Component({
  selector: 'app-pros-cons-container',
  templateUrl: './pros-cons-container.component.html',
  styleUrls: ['./pros-cons-container.component.scss'],
})
export class ProsConsContainerComponent implements OnInit {
  @Input() solution!: Problem;
  @Output() proConsSaved = new EventEmitter();
  pros: ProsCons[] = [];
  cons: ProsCons[] = [];
  constructor(
    private problemService: ProblemSolvingWorksheetsService,
    private errorService: GeneralErrorService,
  ) {}

  ngOnInit() {
    this.problemService.getProsCons(this.solution.id).subscribe((resp: any) => {
      // console.log(data);
      this.pros = resp.data.pros;
      // console.log(this.pros);
      this.cons = resp.data.cons;
      if (this.cons.length > 0 || this.pros.length > 0) {
        console.log(this.pros, this.cons);
        this.onProConSave();
      }
    }, this.errorService.errorResponse('Cannot fetch Pros and cons'));
  }

  onProConSave() {
    this.proConsSaved.emit();
  }
}
