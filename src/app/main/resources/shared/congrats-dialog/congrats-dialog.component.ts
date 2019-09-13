import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-congrats-dialog',
  templateUrl: './congrats-dialog.component.html',
  styleUrls: ['./congrats-dialog.component.scss']
})
export class CongratsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CongratsDialogComponent>,
  ) { }

  ngOnInit() {
    if (window.matchMedia('(max-width: 770px)').matches) {
      this.dialogRef.updateSize('80%', '65%');
    }
  }

}
