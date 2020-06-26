import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-support-group-intro',
  templateUrl: './support-group-intro.component.html',
  styleUrls: ['./support-group-intro.component.scss'],
})
export class SupportGroupIntroComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<SupportGroupIntroComponent>) {}

  ngOnInit() {}

  startIntro() {
    this.dialogRef.close();
  }
}
