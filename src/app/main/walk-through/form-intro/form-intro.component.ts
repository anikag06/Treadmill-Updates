import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-intro',
  templateUrl: './form-intro.component.html',
  styleUrls: ['./form-intro.component.scss'],
})
export class FormIntroComponent implements OnInit {
  btnTxt!: string;
  constructor(
    private dialogRef: MatDialogRef<FormIntroComponent>,
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
