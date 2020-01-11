import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss'],
})
export class FormCardComponent implements OnInit {
  @Input() header!: string;
  @Output() showNegative = new EventEmitter();
  @Output() onShowSlider = new EventEmitter();
  @Output() onShowTechniques = new EventEmitter();

  @ViewChild('problemTextArea', { static: false }) element!: ElementRef;
  submitted = false;
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}
  onEditSituationClick() {
    this.submitted = false;
    this.element.nativeElement.focus();
  }

  onProblemSubmit() {
    this.submitted = true;
    this.showNegative.emit(true);
    this.onShowSlider.emit(true);
    this.onShowTechniques.emit(true);
  }
}
