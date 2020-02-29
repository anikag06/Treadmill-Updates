import { Component, OnInit, Input } from '@angular/core';
import { ProsCons } from '../pros-cons.model';
import { Solution } from '../solution.model';
import { ProblemSolvingWorksheetsService } from '../problem-solving-worksheets.service';
import { GeneralErrorService } from '@/main/shared/general-error.service';

@Component({
  selector: 'app-pros-cons-container',
  templateUrl: './pros-cons-container.component.html',
  styleUrls: ['./pros-cons-container.component.scss'],
})
export class ProsConsContainerComponent implements OnInit {
  @Input() solution!: Solution;
  pros: ProsCons[] = [];
  cons: ProsCons[] = [];
  constructor(
    private problemService: ProblemSolvingWorksheetsService,
    private errorService: GeneralErrorService,
  ) {}

  ngOnInit() {
    this.problemService.getProsCons(this.solution.id).subscribe((data: any) => {
      data.data.forEach((pc: any) => {
        if (pc.is_pros) {
          this.pros.push(pc);
        } else {
          this.cons.push(pc);
        }
      });
    }, this.errorService.errorResponse('Cannot fetch Pros and cons'));
  }
}
