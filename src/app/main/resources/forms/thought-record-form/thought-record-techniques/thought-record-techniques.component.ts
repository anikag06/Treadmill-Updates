import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TechniquesInfoComponent } from './techniques-info/techniques-info.component';

@Component({
  selector: 'app-thought-record-techniques',
  templateUrl: './thought-record-techniques.component.html',
  styleUrls: ['./thought-record-techniques.component.scss'],
})
export class ThoughtRecordTechniquesComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  header =
    'Select the technique that you would like to use to evaluate the negative thought';
  info = 'You can evaluate your thought with multiple techniques';

  ngOnInit() {}

  onShowInfo() {
    const dialogRef = this.dialog.open(TechniquesInfoComponent, {
      panelClass: 'technique-info-dialog-container',
      autoFocus: false,
    });
  }
}
