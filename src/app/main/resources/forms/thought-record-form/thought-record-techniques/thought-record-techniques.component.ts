import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output,} from '@angular/core';
import {MatDialog} from '@angular/material';
import {TRF_TECHNIQUES_DATA} from '../../shared/techniques-info/thought-record-techniques.data';
import {TechniquesInfoComponent} from '../../shared/techniques-info/techniques-info.component';
import {Thought} from '@/main/resources/forms/thought-record-form/thoughtRecord.model';

@Component({
  selector: 'app-thought-record-techniques',
  templateUrl: './thought-record-techniques.component.html',
  styleUrls: ['./thought-record-techniques.component.scss'],
})
export class ThoughtRecordTechniquesComponent implements OnInit, AfterViewInit {
  constructor(public dialog: MatDialog, public element: ElementRef) {}

  @Input() thought!: Thought;
  @Output() showFinalThought = new EventEmitter();
  header =
    'Select the technique that you would like to use to evaluate the negative thought';
  info = 'Use some of these techniques to evaluate thoughts.';
  favorTitle = 'What are the evidences supporting this negative thought?';
  againstTitle = 'What are the evidences against this negative thought?';
  proofHdrColor = '#FFFCE3';
  explnHdrColor = '#FEC1C1';
  tellHdrColor = '#FFF3E9';
  explnTechnique = 'Is this the only explanation?';
  explnQuestion = 'Can there be another explanation for this situation?';
  tellTechnique = 'What would I tell a friend?';
  tellQuestion =
    'What would I tell a close friend or relative if they were having this thought?';
  info_heading = 'About Techniques';
  @Input() reset!: boolean;

  ngOnInit() {}

  ngAfterViewInit() {
    const panel = this.element.nativeElement.querySelectorAll(
      '.mat-expansion-panel',
    );
    const panelBody = this.element.nativeElement.querySelectorAll(
      '.mat-expansion-panel-body',
    );
    for (let i = 0; i < panelBody.length; i++) {
      panel[i].setAttribute('style', 'box-shadow: 0px 1px 3px #00000024;');
    }
    for (let i = 0; i < panelBody.length; i++) {
      panelBody[i].setAttribute(
        'style',
        'padding-left:16px;padding-right:16px',
      );
    }
  }

  triggerShowFinalThought() {
    this.showFinalThought.emit();
  }

  onShowInfo() {
    const dialogRef = this.dialog.open(TechniquesInfoComponent, {
      panelClass: 'technique-info-dialog-container',
      autoFocus: false,
      data: {
        techniquesInfo: TRF_TECHNIQUES_DATA,
        about: this.info_heading,
      },
    });
  }
}
