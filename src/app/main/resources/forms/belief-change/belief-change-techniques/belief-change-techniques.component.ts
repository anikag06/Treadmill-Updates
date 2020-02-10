import {Component, ElementRef, EventEmitter, Input, OnInit, Output,} from '@angular/core';
import {TechniquesInfoComponent} from '@/main/resources/forms/shared/techniques-info/techniques-info.component';
import {TRF_TECHNIQUES_DATA} from '@/main/resources/forms/shared/techniques-info/thought-record-techniques.data';
import {MatDialog} from '@angular/material';
import {Belief} from '@/main/resources/forms/belief-change/belief.model';

@Component({
  selector: 'app-belief-change-techniques',
  templateUrl: './belief-change-techniques.component.html',
  styleUrls: ['./belief-change-techniques.component.scss'],
})
export class BeliefChangeTechniquesComponent implements OnInit {
  constructor(public dialog: MatDialog, private element: ElementRef) {}

  header =
    'Select a technique that you would like to use to modify your belief?';
  info = 'Use some of these techniques to modify beliefs.';
  @Input() belief!: Belief;
  @Output() showFinalBelief = new EventEmitter();
  // bg_color = '#FFFCE3';
  favorTitle = 'What are the evidences supporting this belief?';
  againstTitle = 'What are the evidences against this belief?';
  tellTechnique = 'What would I tell a friend?';
  tellQuestion =
    'What would I tell a close friend or relative if they were having this belief?';
  tellHdrColor = '#FFF3E9';

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

  onShowInfo() {
    const dialogRef = this.dialog.open(TechniquesInfoComponent, {
      panelClass: 'technique-info-dialog-container',
      autoFocus: false,
      data: {
        techniquesInfo: TRF_TECHNIQUES_DATA,
      },
    });
  }

  triggerShowFinalBelief() {
    this.showFinalBelief.emit();
  }
}
