import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProsCons } from '../../../pros-cons.model';
import {ProblemSolvingWorksheetsService} from '@/main/forms/problem-solving-worksheets/problem-solving-worksheets.service';
import {GeneralErrorService} from '@/main/shared/general-error.service';

@Component({
  selector: 'app-procon-item',
  templateUrl: './procon-item.component.html',
  styleUrls: ['./procon-item.component.scss']
})
export class ProconItemComponent implements OnInit {

  @Input() procon!: ProsCons;
  @Output() proconDelete = new EventEmitter<ProsCons>();
  hideRemove = true;

  constructor(
    private problemService: ProblemSolvingWorksheetsService,
    private errorService: GeneralErrorService
  ) { }

  ngOnInit() {
  }

  removeProcon() {
    if (confirm('Are you sure to remove this?')) {
      this.proconDelete.emit(this.procon);
    }
  }

  onFocus() {
    this.hideRemove = false;
  }

  onFocusOut(event: any) {
    if (event.relatedTarget === null || (<Element>event.relatedTarget).nextSibling !== <Element>event.target) {
      this.procon.body = (<Element>event.target).innerHTML;
      this.hideRemove = true;
      this.problemService.putProsCons(this.procon.id, this.procon.body)
        .subscribe(
          (data: any) => {},
          this.errorService.errorResponse('Cannot update that')
        );
    }
  }

}
