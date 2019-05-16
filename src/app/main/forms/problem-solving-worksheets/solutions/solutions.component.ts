import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Solution } from '../solution.model';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.scss']
})
export class SolutionsComponent implements OnInit {

  @Input() solutions!: Solution[];
  @Output() solutionDelete = new EventEmitter<Solution>();
  @Output() solutionEdit = new EventEmitter<Solution>();
  constructor() { }

  ngOnInit() {
  }

  onSolutionRemove(solution: Solution) {
    if (confirm('Are you sure to delete this solution')) {
      this.solutionDelete.emit(solution);
    }
  }

  onFocusOut(event: FocusEvent, solution: Solution) {
    solution.solution = (<Element>event.target).innerHTML.trim();
    this.solutionEdit.emit(solution);
  }

}
