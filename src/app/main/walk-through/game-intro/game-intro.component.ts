import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-game-intro',
  templateUrl: './game-intro.component.html',
  styleUrls: ['./game-intro.component.scss'],
})
export class GameIntroComponent implements OnInit {
  btnTxt!: string;
  constructor(
    private dialogRef: MatDialogRef<GameIntroComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    if (this.data) {
      this.btnTxt = this.data.buttonText;
    }
  }

  startIntro() {
    this.dialogRef.close();
  }
}
