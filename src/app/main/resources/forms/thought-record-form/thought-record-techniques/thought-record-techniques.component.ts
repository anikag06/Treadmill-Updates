import {AfterViewInit, Component, ElementRef, Input, OnInit,} from '@angular/core';
import {MatDialog} from '@angular/material';
import {TECHNIQUE_DATA} from '../../shared/techniques-info/thought-record-techniques.data';
import {TechniquesInfoComponent} from '../../shared/techniques-info/techniques-info.component';
import {Thought} from '@/main/resources/forms/thought-record-form/thoughtRecord.model';
import {ThoughtRecordService} from '@/main/resources/forms/thought-record-form/thought-record.service';

@Component({
    selector: 'app-thought-record-techniques',
    templateUrl: './thought-record-techniques.component.html',
    styleUrls: ['./thought-record-techniques.component.scss'],
})
export class ThoughtRecordTechniquesComponent implements OnInit, AfterViewInit {
    constructor(
        public dialog: MatDialog,
        public element: ElementRef,
        public thoughtRecordService: ThoughtRecordService,
    ) {
    }

  @Input() thought!: Thought;

    header =
        'Select the technique that you would like to use to evaluate the negative thought';
    info = 'Use some of these techniques to evaluate thoughts.';

    ngOnInit() {
    }

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
            techniquesInfo: TECHNIQUE_DATA,
        },
    });
  }
}
