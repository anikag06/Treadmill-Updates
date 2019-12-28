import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';

import { Solution } from '../solution.model';
import { ProblemSolvingWorksheetsService } from '../problem-solving-worksheets.service';
import {SanitizationService} from '@/main/shared/sanitization.service';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss']
})
export class SolutionsComponent implements OnInit {

  @Input() solutions!: Solution[];
  @Output() solutionDelete = new EventEmitter<Solution>();
  @Output() solutionEdit = new EventEmitter<Solution>();
  @ViewChildren('lastSolution') lastSolutionDiv!: QueryList<any>;

  constructor(
    private problemService: ProblemSolvingWorksheetsService,
    private sanitizer: SanitizationService,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.lastSolutionDiv.forEach(div => console.log(div));
  }

  onEditTextClicked() {
    if (this.lastSolutionDiv) {
      this.lastSolutionDiv.last.nativeElement.focus();
    }
  }
  onSolutionRemove(solution: Solution) {
    if (confirm('Are you sure to delete this solution')) {
      this.solutionDelete.emit(solution);
    }
  }

  onFocusOut(event: FocusEvent, solution: Solution) {
    if ((<Element>event.target).innerHTML) {
      solution.solution = this.sanitizer.changeExtraCharacters(event);
      (<Element>event.target).innerHTML = solution.solution;
      this.solutionEdit.emit(solution);
    }
  }

}
