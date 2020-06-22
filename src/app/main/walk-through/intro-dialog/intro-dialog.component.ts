import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {IntroService} from "@/main/walk-through/intro.service";


@Component({
  selector: 'app-intro-dialog',
  templateUrl: './intro-dialog.component.html',
  styleUrls: ['./intro-dialog.component.scss'],
})
export class IntroDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<IntroDialogComponent>,
  ) {}

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close();
  }
}
