import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ProsCons } from '../../../pros-cons.model';
import { ProblemSolvingWorksheetsService } from '@/main/resources/forms/problem-solving-worksheets/problem-solving-worksheets.service';
import { GeneralErrorService } from '@/main/shared/general-error.service';
import { SanitizationService } from '@/main/shared/sanitization.service';

@Component({
  selector: 'app-procon-item',
  templateUrl: './procon-item.component.html',
  styleUrls: ['./procon-item.component.scss'],
})
export class ProconItemComponent implements OnInit {
  @Input() procon!: ProsCons;
  @Output() proconDelete = new EventEmitter<ProsCons>();
  hideRemove = true;
  @ViewChild('editableDiv', { static: false }) proCondiv!: ElementRef;

  constructor(
    private problemService: ProblemSolvingWorksheetsService,
    private errorService: GeneralErrorService,
    private sanitizer: SanitizationService,
  ) {}

  ngOnInit() {}

  removeProcon() {
    if (confirm('Are you sure to remove this?')) {
      this.proconDelete.emit(this.procon);
    }
  }

  onFocus() {
    this.hideRemove = false;
  }

  onFocusOut(event: any) {
    event.preventDefault();
    if (event.keyCode === 13) {
      this.saveProConData(event);
      this.proCondiv.nativeElement.blur();
    } else if (
      event.relatedTarget === null ||
      (<Element>event.relatedTarget).nextSibling !== <Element>event.target
    ) {
      this.saveProConData(event);
    }
  }

  saveProConData(event: any) {
    const text = this.sanitizer.changeExtraCharacters(event);
    this.procon.body = text;
    this.hideRemove = true;
    this.problemService
      .putProsCons(this.procon.id, this.procon.body)
      .subscribe((data: any) => {},
      this.errorService.errorResponse('Cannot update that'));
  }
}
