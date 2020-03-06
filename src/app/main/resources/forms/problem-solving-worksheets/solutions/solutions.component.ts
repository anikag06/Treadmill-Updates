import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { Solution } from '../solution.model';
import { ProblemSolvingWorksheetsService } from '../problem-solving-worksheets.service';
import { SanitizationService } from '@/main/shared/sanitization.service';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss'],
})
export class SolutionsComponent implements OnInit {
  @Input() solutions!: Solution[];
  @Output() solutionDelete = new EventEmitter<Solution>();
  @Output() solutionEdit = new EventEmitter<Solution>();
  @ViewChildren('lastSolution') lastSolutionDiv!: QueryList<any>;
  showDeleteIcon: boolean[] = [];

  constructor(
    private problemService: ProblemSolvingWorksheetsService,
    private sanitizer: SanitizationService,
  ) {}

  ngOnInit() {
    if (this.solutions) {
      this.showDeleteIcon = Array.apply(null, Array(3)).map(
        Boolean.prototype.valueOf,
        false,
      );
    }
  }

  ngOnChanges() {
    if (this.solutions) {
      this.showDeleteIcon = [];
      this.showDeleteIcon = Array.apply(null, Array(3)).map(
        Boolean.prototype.valueOf,
        false,
      );
    }
  }

  ngAfterViewInit() {
    // this.lastSolutionDiv.forEach(div => console.log(div));
  }

  onEditTextClicked() {
    if (this.lastSolutionDiv) {
      this.lastSolutionDiv.last.nativeElement.focus();
    }
  }
  onSolutionRemove(index: number, solution: Solution) {
    this.solutionDelete.emit(solution);
    this.showDeleteIcon.splice(index, 1);
  }

  onFocusOut(event: FocusEvent, solution: Solution, index: number) {
    if ((<Element>event.target).innerHTML) {
      solution.solution = this.sanitizer.changeExtraCharacters(event);
      (<Element>event.target).innerHTML = solution.solution;
      this.solutionEdit.emit(solution);
    }
  }

  onFocus(index: number) {
    this.showDeleteIcon[index] = true;
  }

  onClickOutside(event: Object, index: number) {
    if (event && (<any>event)['value'] === true) {
      this.showDeleteIcon[index] = false;
    }
  }
}
